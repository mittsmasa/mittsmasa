export type Frontmatter = {
  /** `key: value` の行から読んだ値。キーも値も前後の空白を除いてある */
  fields: Record<string, string>;
  /** frontmatter を除いた本文 */
  body: string;
};

const DELIMITER = "---";

/**
 * Markdown の先頭にある frontmatter を読み取る。
 *
 * 扱うのは `---` で挟まれた `key: value` の行だけで、YAML の入れ子や配列は読まない。
 * 先頭が `---` でなければ、frontmatter なしとして全体を本文にする。
 *
 * @throws 閉じの `---` が無いとき、`key: value` の形でない行があるとき
 */
export function parseFrontmatter(source: string): Frontmatter {
  const lines = source.split(/\r?\n/);
  if (lines[0] !== DELIMITER) {
    return { fields: {}, body: source };
  }

  const end = lines.indexOf(DELIMITER, 1);
  if (end === -1) {
    throw new Error("frontmatter の閉じの --- がありません");
  }

  const fields: Record<string, string> = {};
  for (const line of lines.slice(1, end)) {
    if (line.trim() === "") continue;
    const separator = line.indexOf(":");
    if (separator === -1) {
      throw new Error(`frontmatter の行が key: value の形ではありません: ${line}`);
    }
    fields[line.slice(0, separator).trim()] = line.slice(separator + 1).trim();
  }

  return { fields, body: lines.slice(end + 1).join("\n") };
}
