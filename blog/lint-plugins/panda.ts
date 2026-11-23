import { definePlugin, defineRule, type ESTree } from "vite-plus/lint/plugins";

const ESCAPE_HATCHES = [
  { pattern: /^\[[\s\S]*\]$/, name: "[...] の任意の値" },
  { pattern: /!(important)?$/, name: "末尾の ! / !important" },
  { pattern: /^[A-Za-z][\w-]*\.[\w.-]+\/.+$/, name: "token/... の透明度指定" },
];

function enclosingValuePosition(node: ESTree.Node): ESTree.Node {
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

function isStyleValue(node: ESTree.Node): boolean {
  const position = enclosingValuePosition(node);
  const parent = position.parent;
  return (
    (parent?.type === "Property" && parent.value === position) || parent?.type === "ArrayExpression"
  );
}

const noEscapeHatch = defineRule({
  meta: {
    type: "problem",
    messages: {
      escapeHatch:
        "css() に {{name}} は書けません。semantic token か textStyle を使ってください: {{value}}",
    },
  },
  create(context) {
    function check(node: ESTree.Node, value: string) {
      if (!isStyleValue(node)) return;
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
