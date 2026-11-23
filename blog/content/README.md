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
