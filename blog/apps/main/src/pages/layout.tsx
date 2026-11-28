import { Lead, PageMain, SiteHeader } from "@blog/ui";
import { Suspense, ViewTransition, type ReactNode } from "react";
import { topPath } from "../paths.ts";
import { setDarkMode, useDarkMode } from "./dark-mode.ts";
import { SITE_NAME } from "./site.ts";
import { useDelayed } from "./use-delayed.ts";

const PENDING_DELAY_MS = 200;

type Props = {
  pending: boolean;
  children: ReactNode;
};

export function Layout({ pending, children }: Props) {
  const showsPending = useDelayed(pending, PENDING_DELAY_MS);
  const darkMode = useDarkMode();
  return (
    <>
      <SiteHeader
        siteName={SITE_NAME}
        topHref={topPath}
        loading={showsPending}
        darkMode={darkMode}
        onDarkModeChange={setDarkMode}
      />
      <ViewTransition default="page">
        <div data-navigation-pending={pending ? "" : undefined}>
          <Suspense
            fallback={
              <PageMain>
                <Lead>読み込み中…</Lead>
              </PageMain>
            }
          >
            {children}
          </Suspense>
        </div>
      </ViewTransition>
    </>
  );
}
