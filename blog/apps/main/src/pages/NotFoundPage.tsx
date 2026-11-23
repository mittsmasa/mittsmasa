import { PageMain, PageTitle, TextLink } from "@blog/ui";
import { topPath } from "../paths.ts";
import { SITE_NAME } from "./site.ts";

export function NotFoundPage() {
  return (
    <>
      <title>{`ページが見つかりません | ${SITE_NAME}`}</title>
      <PageMain>
        <PageTitle>ページが見つかりません</PageTitle>
        <TextLink href={topPath}>トップへ</TextLink>
      </PageMain>
    </>
  );
}
