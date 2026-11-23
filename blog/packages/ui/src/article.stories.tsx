import type { Meta, StoryObj } from "@storybook/react-vite";
import { Article } from "./article.tsx";

const html = `
<p>長く使っていたブログの仕組みを、Vite と React で作り直しました。記事は <strong>Markdown のまま</strong>で、ページはビルドのときに HTML に書き出します。</p>
<h2>作り直した理由</h2>
<p>前の仕組みは、ビルドに 1 分かかっていました。<a href="https://example.com/">計測の記録</a>も残してあります。</p>
<ul>
<li>記事を書く場所と、見た目を決める場所を分けたかった</li>
<li>ページの遷移を軽くしたかった</li>
</ul>
<h3>ルーター</h3>
<p>ルーターは自作で、<code>matchRoute</code> という小さな関数がパスを照合します。</p>
<pre><code>export function matchRoute(path: string) {
  return routes.find((route) =&gt; route.pattern.test(path));
}
</code></pre>
<blockquote><p>小さく作って、要るものだけ足す。</p></blockquote>
<ol>
<li>記事を書く</li>
<li>ビルドする</li>
</ol>
`;

const meta = {
  component: Article,
  args: { date: "2026-11-18", title: "ブログを作り直しました", html },
} satisfies Meta<typeof Article>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const DefaultPc: Story = {
  globals: { viewport: { value: "pc", isRotated: false } },
};
