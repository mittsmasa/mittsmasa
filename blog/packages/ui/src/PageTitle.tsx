import type { ReactNode } from "react";
import { css } from "../styled-system/css";

type Props = {
  children: ReactNode;
};

/** ページの題（h1） */
export function PageTitle({ children }: Props) {
  return (
    <h1
      className={css({
        margin: 0,
        fontSize: { base: "24px", md: "30px" },
        lineHeight: { base: "34px", md: "44px" },
        fontWeight: 500,
      })}
    >
      {children}
    </h1>
  );
}
