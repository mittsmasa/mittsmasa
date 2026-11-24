# 記事の書き方

## 記事を置く場所

- 公開する記事は `posts/<slug>.md` に置きます。slug がそのまま URL の `/posts/<slug>/` になります
- slug は英小文字と数字とハイフンだけにします。画像のアップロードもこの形の slug しか受けません
- 書きかけの記事は `drafts/` に置きます。サイトには出ません
- 一覧に出る抜粋は、本文の最初の段落から作られます

frontmatter は `title` と `date`（`YYYY-MM-DD`）の 2 つです。どちらかが欠けるとビルドが止まります。

```md
---
title: 記事のタイトル
date: 2026-11-23
---

最初の段落が抜粋になります。
```

## 画像を載せる

画像は git に入れず、Cloudflare R2 のバケット `mittsmasa-blog-images` に置きます。ブログの Worker が `/images/<slug>/<hash>.<ext>` で配ります。`<hash>` は画像の中身の SHA-256 の先頭 12 桁です。

上げられる形式は png / jpg / jpeg / gif / webp です。SVG は同じオリジンでスクリプトが動きうるため受けません。

### Zed から上げる

1. Finder で画像ファイルをコピーするか、スクリーンショットをクリップボードに撮ります（`cmd-ctrl-shift-4`）
2. 記事の Markdown を開いたまま、タスク「ブログ: 画像をアップロード」を実行します
3. `![](/images/<slug>/<hash>.png)` がクリップボードに入るので、本文に貼ります
4. `![]` の中に alt（画像の説明）を書きます

タスクは開いているファイル名を slug として使います。記事の Markdown を開いた状態で実行してください。

### ターミナルから上げる

`blog/` で次を実行します。ファイルを省くとクリップボードから取ります。

```sh
fnox -P blog-images --no-defaults exec -- node apps/main/scripts/upload-image.ts <slug> path/to/image.png
```

`fnox exec` が keychain から Cloudflare の API トークンを読み、wrangler に環境変数で渡します。準備は「初回の準備」を見てください。

## 初回の準備

一度だけ行います。手元には R2 だけを触れる API トークンを置き、`wrangler login` は使いません。`wrangler login` の既定スコープでは本番の Worker `mittsmasa-blog` も deploy できてしまい、CI の `environment: production` の承認を通らずに公開できるためです。

1. Cloudflare のダッシュボードの「API トークン」で、カスタムトークンを作ります
   - 権限: アカウント / Workers R2 ストレージ / 編集（Workers R2 Storage: Edit）。ほかの権限は付けません
   - アカウントリソース: このブログのアカウントだけ
   - バケット単位の「Object Read & Write」は S3 互換 API 専用で、wrangler が使う Cloudflare REST API では通りません。そのためアカウント単位の R2 の権限にしています
2. トークンとアカウント ID を、fnox のプロファイル `blog-images` に keychain で登録します。値はプロンプトで入れます

   ```sh
   fnox -P blog-images set --global --provider keychain CLOUDFLARE_API_TOKEN
   fnox -P blog-images set --global --provider keychain CLOUDFLARE_ACCOUNT_ID
   ```

   プロファイルを分けるのは、`fnox exec -- pnpm install` などほかのコマンドにトークンを渡さないためです

3. 以前に `wrangler login` していたら、手元の OAuth トークンを消します: `cd blog/apps/main && vp exec wrangler logout`
4. バケットを作ります: `cd blog/apps/main && fnox -P blog-images --no-defaults exec -- vp exec wrangler r2 bucket create mittsmasa-blog-images`
5. Zed のキーにタスクを割り当てます。`~/.config/zed/keymap.json` に足します

```json
{
  "context": "Workspace",
  "bindings": {
    "cmd-alt-i": ["task::Spawn", { "task_name": "ブログ: 画像をアップロード" }]
  }
}
```

## Cloudflare に課金されないようにする

Workers を無料プランのまま使い、R2 の保存量を 10 GB 未満に保てば、課金は起きない見込みです。超えたら止まる上限は Cloudflare に無いので、仕組みと運用で無料枠に収めます。

### 課金を止める設定が無い理由

Cloudflare の spending limit（利用額の上限）は、Workers と Durable Objects だけが対象です。R2 は対象外と明記されています。上限は 0 ドルにできず、請求額の上限を保証しないとも書かれています（[Spend management](https://developers.cloudflare.com/billing/manage/spend-management/)）。R2 の Pricing のページにも、無料枠を超えたら止まるという記述はありません（[R2 Pricing](https://developers.cloudflare.com/r2/pricing/)）。

### 無料枠に収まる理由

課金されうるのは R2 だけです。Workers の無料プランは、超えても課金されず、エラーを返します。

- Workers: 無料プランの上限は 1 日 10 万リクエストです。超えると課金ではなく Error 1027 を返します（[Limits](https://developers.cloudflare.com/workers/platform/limits/)）
- 静的アセット: 記事や CSS へのリクエストは無料で、回数の上限もありません（[Pricing](https://developers.cloudflare.com/workers/platform/pricing/)）
- R2 の読み出し: 無料枠は月 1000 万回です（Class B 操作）。画像は Worker を通してしか読まず、1 リクエストで 1 回しか読みません。Workers の上限から、読み出しは多くても月 310 万回（10 万回 × 31 日）です
- R2 の書き込み: 無料枠は月 100 万回です（Class A 操作）。書き込むのは画像のアップロードだけです
- R2 の保存量: 無料枠は 10 GB です。読み出しと違って Worker では抑えられないので、上げる画像の量で管理します

Worker は、一度 R2 から返した画像を Cache API に置き、次からはキャッシュから返します。読み出しはさらに減ります。キャッシュのキーからはクエリ文字列を外しているので、`?v=1` のようなクエリを付けて R2 を何度も読ませることはできません。一方、存在しないパスは 404 をキャッシュしないので、毎回 R2 を読みます。それでも 1 リクエストで 1 回なので、月 310 万回の上限は変わりません。キャッシュはデータセンターごとで、データセンターごとの初回は R2 を読みます（[Cache API](https://developers.cloudflare.com/workers/runtime-apis/cache/)）。

### この見込みが崩れる条件

次の 3 つのどれかに当たると、R2 の無料枠を超える可能性があります。ダッシュボードで確かめてください。画面の項目名は、ドキュメントでは確かめていません。

1. Workers を有料プランにした。1 日 10 万リクエストの上限が外れ、R2 の読み出しも上限が無くなります。Workers のプランが無料プランのままか確かめます
2. バケットを r2.dev や custom domain で公開した。Worker を通らずに R2 を読めるようになります。R2 のバケット `mittsmasa-blog-images` の設定で、公開がオフか確かめます
3. 保存量が 10 GB に近づいた。R2 のバケットの概要で保存量を見ます

`*.workers.dev` で Cache API が効くかは、ドキュメントに書かれておらず未確認です。効かなくても、上の 310 万回の上限は変わりません。

### 超えたときに気づく通知（Budget alert）

念のため、請求額の通知を設定します。アカウント全体の従量課金の額が、決めた金額を超えたらメールが届きます。R2 の利用額もこの合計に入ります。利用は止まりません（[Budget alerts](https://developers.cloudflare.com/billing/manage/budget-alerts/)）。Pay-as-you-go のアカウントだけで使えます。

1. Cloudflare のダッシュボードで「Manage Account」→「Billing」→「Billable Usage」を開きます
2. 「Create budget alert」を選びます
3. 金額を 1 ドルにして保存します。少しでも課金されたら届きます
