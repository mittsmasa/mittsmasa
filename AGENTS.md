# AGENTS.md

## コードコメントを書かない

このリポジトリでは、コードにコメントを書かないでください。対象は TS / TSX / JS / MJS / CSS と、YAML などの設定ファイルです。JSDoc と JSX の `{/* */}` も含みます。

意図は、名前、型、テスト、コミットメッセージ、PR の説明に書いてください。コメントは実装と一緒に更新されず、古い説明が残りやすいためです。

例外は 2 つです。

- oxlint の抑制コメント（`oxlint-disable`、`oxlint-disable-next-line`、`oxlint-disable-line`、`oxlint-enable`）。ルールを抑制するしかない場面に限り、理由はコミットメッセージに書きます
- GitHub Actions の `uses: owner/action@<sha> # vX.Y.Z` の版注記。Renovate が digest を更新するときに読みます

blog/ 配下の JS / TS は、`vp check` の lint（`blog/lint-plugins/no-comments.ts`）がコメントを error にします。YAML は lint の対象外なので、この規約だけで守ります。
