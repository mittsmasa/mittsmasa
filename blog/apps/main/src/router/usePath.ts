import { startTransition, useEffect, useRef, useState } from "react";

/** ページ内の処理に置き換えてよい遷移か */
function canHandle(event: NavigateEvent): boolean {
  return (
    event.canIntercept && !event.hashChange && event.downloadRequest === null && !event.formData
  );
}

/**
 * 現在の URL の pathname を返す。
 *
 * ブラウザでは Navigation API の遷移を受け取り、transition の中で値を更新する。
 * Navigation API が無い環境（サーバー、非対応のブラウザ）では `initialPath` のまま変わらない。
 *
 * @param initialPath 最初の描画に使う pathname。サーバーとブラウザで同じ値を渡す
 */
export function usePath(initialPath: string): string {
  // path が同じでも遷移ごとに effect を走らせるため、オブジェクトで持つ
  const [location, setLocation] = useState({ path: initialPath });
  const finishNavigation = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (!("navigation" in window)) return;

    const onNavigate = (event: NavigateEvent) => {
      if (!canHandle(event)) return;
      const { pathname } = new URL(event.destination.url);
      event.intercept({
        // 描画が画面に反映されてから解決する。ブラウザはその後にスクロールとフォーカスを直す
        handler: () =>
          new Promise<void>((resolve) => {
            finishNavigation.current?.();
            finishNavigation.current = resolve;
            startTransition(() => {
              setLocation({ path: pathname });
            });
          }),
      });
    };

    window.navigation.addEventListener("navigate", onNavigate);
    return () => {
      window.navigation.removeEventListener("navigate", onNavigate);
    };
  }, []);

  useEffect(() => {
    finishNavigation.current?.();
    finishNavigation.current = null;
  }, [location]);

  return location.path;
}
