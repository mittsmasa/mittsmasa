import type { ReactNode } from "react";
import { css } from "../styled-system/css";

type Props = {
  children: ReactNode;
};

/** ページの最初に置く紹介文 */
export function Lead({ children }: Props) {
  return (
    <p
      className={css({
        margin: 0,
        fontSize: { base: "14px", md: "15px" },
        lineHeight: "26px",
        color: "fgSub",
      })}
    >
      {children}
    </p>
  );
}
