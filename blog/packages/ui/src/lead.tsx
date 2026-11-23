import type { ReactNode } from "react";
import { css } from "../styled-system/css";

type Props = {
  children: ReactNode;
};

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
