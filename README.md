# mittsmasa

## blog の VRT

`blog VRT` ジョブ（`.github/workflows/blog-vrt.yml`）は、storybook-addon-vrt で `blog/packages/ui` のストーリーを撮り、基準画像と比べます。

基準画像（`blog/packages/ui/.vrt/expected`）には、このジョブのコンテナで撮った画像だけを置きます。macOS と Linux では書体の描画が違うため、手元で撮った画像はコミットしません。

### 基準画像を作る、更新する

1. ストーリーを足すか見た目を変えると、ジョブが added / changed で落ちます。artifact `vrt-report` に `.vrt` が上がり、PR のコメントにも結果が出ます
2. `gh run download <run-id> -n vrt-report -D <dir>` で artifact を取ってきます
3. `blog/packages/ui` で `pnpm exec svrt approve --actual-dir <dir>/actual` を実行します
4. `.vrt/expected` をコミットして push します
