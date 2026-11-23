import { RuleTester } from "vite-plus/lint/plugins-dev";
import { describe, test } from "vite-plus/test";
import plugin from "./panda.ts";

RuleTester.describe = describe;
RuleTester.it = test;

const rule = plugin.rules["no-escape-hatch"];
if (rule === undefined) throw new Error("no-escape-hatch が見つかりません");

new RuleTester().run("no-escape-hatch", rule, {
  valid: [
    'css({ color: "fg.default" })',
    'css({ "&[data-state=open]": { color: "fg.default" } })',
    'css({ gridColumn: "auto/span 2" })',
    'css({ color: flag ? "fg.default" : "fg.sub" })',
    'css({ color: "[" + x + "]" })',
    "css({ color: `[${x}]` })",
    'other({ color: "[red]" })',
  ],
  invalid: [
    { code: 'css({ fontSize: "[20px]" })', errors: 1 },
    { code: "css({ color: `[#ff0000]` })", errors: 1 },
    { code: 'css({ padding: { base: "none", md: "[3px]" } })', errors: 1 },
    { code: 'css({ _hover: { color: "[red]" } })', errors: 1 },
    { code: 'css({ margin: "none!" })', errors: 1 },
    { code: 'css({ margin: "auto!important" })', errors: 1 },
    { code: 'css({ color: "fg.default/50" })', errors: 1 },
    { code: 'css({ color: "fg.muted/[0.5]" })', errors: 1 },
    { code: 'css({ color: flag ? "fg.default" : "[red]" })', errors: 1 },
    { code: 'css({ color: flag || "fg.default!" })', errors: 1 },
  ],
});
