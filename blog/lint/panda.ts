import { definePlugin, defineRule, type ESTree } from "vite-plus/lint/plugins";

// Panda の生成型は、strictTokens でも次の 3 つの書き方を常に通す（styled-system/types/system.d.ts の WithEscapeHatch）。
// どれも token を経ずに値を決められるので、css() の値に書けないようにする
const ESCAPE_HATCHES = [
  { pattern: /^\[[\s\S]*\]$/, name: "[...] の任意の値" },
  { pattern: /!(important)?$/, name: "末尾の ! / !important" },
  // 型は `${token}/${string}` で、/ の後ろに数字以外（[0.5] など）も通す
  { pattern: /^[A-Za-z][\w.-]*\/.+$/, name: "token/... の透明度指定" },
];

// 三項演算子や || の枝にある値も、その式全体が置かれた位置で判定する
function valuePosition(node: ESTree.Node): ESTree.Node {
  let current = node;
  while (
    current.parent?.type === "ConditionalExpression" ||
    current.parent?.type === "LogicalExpression"
  ) {
    if (current.parent.type === "ConditionalExpression" && current.parent.test === current) break;
    current = current.parent;
  }
  return current;
}

const noEscapeHatch = defineRule({
  meta: {
    messages: {
      escapeHatch:
        "css() に {{name}} は書けません。semantic token か textStyle を使ってください: {{value}}",
    },
  },
  create(context) {
    function check(node: ESTree.Node, value: string) {
      const position = valuePosition(node);
      const parent = position.parent;
      // 値の位置だけを見る。キーには条件やセレクタ（"&:hover" など）が来る
      const isValue =
        (parent?.type === "Property" && parent.value === position) ||
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
