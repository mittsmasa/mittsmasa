import type { ReactNode } from "react";
import { postListPath } from "../paths.ts";
import { SITE_NAME } from "./site.ts";

type Props = {
  children: ReactNode;
};

export function Layout({ children }: Props) {
  return (
    <>
      <header>
        <a href={postListPath}>{SITE_NAME}</a>
      </header>
      <main>{children}</main>
    </>
  );
}
