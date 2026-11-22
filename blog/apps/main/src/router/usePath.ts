import { startTransition, useEffect, useRef, useState } from "react";

/** ページ内の処理に置き換えてよい遷移か */
function canReplace(event: NavigateEvent): boolean {
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
 * @param canHandle このアプリで描画できる pathname か。`false` を返した遷移は受け取らず、
 *   ブラウザの通常の読み込みに任せる。同じ文書の履歴への移動（戻る、進む）は、読み込みが
 *   起きないので `false` でも受け取る。描画のたびに参照が変わらない関数を渡す
 */
export function usePath(initialPath: string, canHandle: (path: string) => boolean): string {
  // path が同じでも遷移ごとに effect を走らせるため、オブジェクトで持つ
  const [location, setLocation] = useState({ path: initialPath });
  const finishNavigation = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (!("navigation" in window)) return;

    const onNavigate = (event: NavigateEvent) => {
      if (!canReplace(event)) return;
      const { pathname } = new URL(event.destination.url);
      // 同じ文書の履歴への移動は、受け取らないと URL だけが変わり、画面が前のまま残る
      if (!event.destination.sameDocument && !canHandle(pathname)) return;
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
  }, [canHandle]);

  useEffect(() => {
    finishNavigation.current?.();
    finishNavigation.current = null;
  }, [location]);

  return location.path;
}
