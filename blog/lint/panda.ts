import { definePlugin, defineRule, type ESTree } from "vite-plus/lint/plugins";

// Panda の生成型は、strictTokens でも次の 3 つの書き方を常に通す（styled-system/types/system.d.ts の WithEscapeHatch）。
// どれも token を経ずに値を決められるので、css() の値に書けないようにする
const ESCAPE_HATCHES = [
  { pattern: /^\[[\s\S]*\]$/, name: "[...] の任意の値" },
  { pattern: /!(important)?$/, name: "末尾の ! / !important" },
  { pattern: /^[A-Za-z][\w.-]*\/\d+$/, name: "token/数字 の透明度指定" },
];

const noEscapeHatch = defineRule({
  meta: {
    messages: {
      escapeHatch:
        "css() に {{name}} は書けません。semantic token か textStyle を使ってください: {{value}}",
    },
  },
  create(context) {
    function check(node: ESTree.Node, value: string) {
      const parent = node.parent;
      // 値の位置だけを見る。キーには条件やセレクタ（"&:hover" など）が来る
      const isValue =
        (parent?.type === "Property" && parent.value === node) ||
        parent?.type === "ArrayExpression";
      if (!isValue) return;
      const hit = ESCAPE_HATCHES.find(({ pattern }) => pattern.test(value));
      if (hit === undefined) return;
      context.report({ node, messageId: "escapeHatch", data: { name: hit.name, value } });
    }
    return {
      "CallExpression[callee.name='css'] Literal"(node) {
        if (node.type === "Literal" && typeof node.value === "string") check(node, node.value);
      },
      "CallExpression[callee.name='css'] TemplateLiteral"(node) {
        if (node.type !== "TemplateLiteral" || node.expressions.length > 0) return;
        check(node, node.quasis.map((quasi) => quasi.value.cooked ?? "").join(""));
      },
    };
  },
});

export default definePlugin({
  meta: { name: "panda" },
  rules: { "no-escape-hatch": noEscapeHatch },
});
