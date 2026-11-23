# mittsmasa

## blog の VRT

`blog VRT` ジョブ（`.github/workflows/blog-vrt.yml`）は、storybook-addon-vrt で `blog/packages/ui` のストーリーを PR の base と head で撮り比べます。

基準画像はコミットしません。同じジョブの同じコンテナで base を撮り、その画像を head の `.vrt/expected` に置いてから head を撮って比べます。macOS と Linux では書体の描画が違うため、比較はこのコンテナの中だけで行います。

見た目の差分（changed / added / removed）があっても、ジョブは落ちません。差分は PR のコメントと、artifact `vrt-report` の `report.html` で確かめます。ジョブが落ちるのは、head でストーリーのテストが落ちたときだけです。
