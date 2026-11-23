export type Frontmatter = {
  fields: Record<string, string>;
  body: string;
};

const DELIMITER = "---";

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
