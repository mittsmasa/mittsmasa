import type { ReactNode } from "react";
import { css } from "../styled-system/css";

type Props = {
  href: string;
  children: ReactNode;
};

/** 下線つきの小さいリンク。タップできる高さを 44px とる */
export function TextLink({ href, children }: Props) {
  return (
    <a
      href={href}
      className={css({
        display: "flex",
        alignItems: "center",
        alignSelf: "flex-start",
        height: "tapTarget",
        textStyle: "smallLink",
      })}
    >
      {children}
    </a>
  );
}
