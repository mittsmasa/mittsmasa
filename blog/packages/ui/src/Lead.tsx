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
        margin: "none",
        textStyle: "lead",
        color: "fg.sub",
      })}
    >
      {children}
    </p>
  );
}
