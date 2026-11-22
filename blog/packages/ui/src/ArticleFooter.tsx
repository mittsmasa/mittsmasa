import type { ReactNode } from "react";
import { css } from "../styled-system/css";

type Props = {
  children: ReactNode;
};

/** 記事の下に、著者、前後の記事、一覧へのリンクを縦に並べる */
export function ArticleFooter({ children }: Props) {
  return (
    <footer
      className={css({
        display: "flex",
        flexDirection: "column",
        gap: { base: "32px", md: "40px" },
        maxWidth: "content",
        marginInline: "auto",
        paddingInline: "gutter",
        paddingTop: { base: "44px", md: "64px" },
        paddingBottom: { base: "40px", md: "56px" },
      })}
    >
      {children}
    </footer>
  );
}
