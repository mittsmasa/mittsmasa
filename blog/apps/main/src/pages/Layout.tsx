import { SiteHeader } from "@blog/ui";
import type { ReactNode } from "react";
import { postListPath, topPath } from "../paths.ts";
import { SITE_NAME } from "./site.ts";

type Props = {
  /** ヘッダーに「一覧」のリンクを出すか。一覧ページ自身では出さない */
  listLink: boolean;
  children: ReactNode;
};

export function Layout({ listLink, children }: Props) {
  return (
    <>
      <SiteHeader
        siteName={SITE_NAME}
        homeHref={topPath}
        listHref={listLink ? postListPath : undefined}
      />
      {children}
    </>
  );
}
