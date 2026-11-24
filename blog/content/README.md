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
node apps/main/scripts/upload-image.ts <slug> path/to/image.png
```

## 初回の準備

一度だけ行います。

1. Cloudflare にログインします: `cd blog/apps/main && vp exec wrangler login`
2. バケットを作ります: `vp exec wrangler r2 bucket create mittsmasa-blog-images`
3. Zed のキーにタスクを割り当てます。`~/.config/zed/keymap.json` に足します

```json
{
  "context": "Workspace",
  "bindings": {
    "cmd-alt-i": ["task::Spawn", { "task_name": "ブログ: 画像をアップロード" }]
  }
}
```

## R2 の利用料を無料枠に収める

R2 の無料枠は、月にストレージ 10 GB、Class A 操作 100 万回、Class B 操作 1000 万回です。画像の読み出し（`GetObject`）は Class B に数えられます（[R2 Pricing](https://developers.cloudflare.com/r2/pricing/)）。

### 超えたら止まる上限は無い

R2 には、利用額が上限を超えたら止める設定がありません。Cloudflare の spending limit が止められるのは Workers と Durable Objects だけで、R2 は対象外と明記されています（[Spend management](https://developers.cloudflare.com/billing/manage/spend-management/)）。R2 の Pricing と Limits のページにも、上限の設定は見つかりませんでした（[Limits](https://developers.cloudflare.com/r2/platform/limits/)）。

そのため、読み出しを減らす仕組みと、超えそうなときに気づく通知の 2 つで備えます。

### Worker のキャッシュで読み出しを減らす

Worker は、一度 R2 から返した画像を Cache API に置き、次からはキャッシュから返します。画像のキーは中身のハッシュなので、同じキーの中身は変わりません。キャッシュのキーからはクエリ文字列を外しています。`?v=1` のようなクエリを付けて R2 を何度も読ませることはできません。

キャッシュはデータセンターごとで、ほかのデータセンターには複製されません（[Cache API](https://developers.cloudflare.com/workers/runtime-apis/cache/)）。データセンターごとの初回だけ R2 を読みます。

このページは custom domain で Cache API が動くと書いていますが、`*.workers.dev` については何も書いていません。workers.dev だけで配信している今、キャッシュが効いているかは未確認です。デプロイ後に、R2 の Class B 操作の回数が、同じ画像を何度も開いても増え続けないことをダッシュボードで確かめてください。

### 請求額の通知（Budget alert）を設定する

アカウント全体の従量課金の額が、決めた金額を超えたらメールで知らせる設定です。R2 の利用額もこの合計に入ります。通知するだけで、利用は止まりません（[Budget alerts](https://developers.cloudflare.com/billing/manage/budget-alerts/)）。Pay-as-you-go のアカウントだけで使えます。

1. Cloudflare のダッシュボードで「Manage Account」→「Billing」→「Billable Usage」を開きます
2. 「Create budget alert」を選びます
3. 金額を 1 ドルにして保存します。無料枠を少しでも超えたら届きます

### 製品ごとの使用量の通知（Usage Based Billing）

製品と指標を選び、使用量がしきい値を超えたら知らせる通知もあります（[Usage based billing](https://developers.cloudflare.com/billing/understand/usage-based-billing/)、[Available notifications](https://developers.cloudflare.com/notifications/notification-available/)）。ただし Professional プラン以上が対象で、ドキュメントの例は Argo と Load Balancing だけです。R2 のストレージや Class A / Class B を選べるかは、ドキュメントでは確かめられませんでした。ダッシュボードの「Notifications」で通知を作るときの製品一覧に R2 があれば、Class B 操作 1000 万回の手前（たとえば 800 万回）で設定します。
