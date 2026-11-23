import { definePlugin, defineRule } from "vite-plus/lint/plugins";

const allowed = /^\s*oxlint-(disable|enable)(-next-line|-line)?(\s|$)/;

const noComments = defineRule({
  meta: {
    type: "suggestion",
    messages: {
      noComments: "コメントは書かない。意図は名前、型、テスト、コミットメッセージで伝える",
    },
  },
  create(context) {
    return {
      Program() {
        for (const comment of context.sourceCode.getAllComments()) {
          if (allowed.test(comment.value)) continue;
          context.report({ loc: comment.loc, messageId: "noComments" });
        }
      },
    };
  },
});

export default definePlugin({
  meta: { name: "blog" },
  rules: { "no-comments": noComments },
});
