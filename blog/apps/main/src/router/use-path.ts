import {
  addTransitionType,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import { transitionTypeOf } from "./transition-type.ts";

export type RouterState = {
  path: string;
  pending: boolean;
  navigationCount: number;
};

function canReplace(event: NavigateEvent): boolean {
  return (
    event.canIntercept && !event.hashChange && event.downloadRequest === null && !event.formData
  );
}

export function usePath(
  initialPath: string,
  canHandle: (path: string) => boolean,
  onNavigate: () => void,
): RouterState {
  const [location, setLocation] = useState({ path: initialPath, navigationCount: 0 });
  const [pending, startTransition] = useTransition();
  const finishNavigation = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (!("navigation" in window)) return;

    const onNavigateEvent = (event: NavigateEvent) => {
      if (!canReplace(event)) return;
      const { pathname } = new URL(event.destination.url);
      if (!event.destination.sameDocument && !canHandle(pathname)) return;
      const transitionType = transitionTypeOf({
        navigationType: event.navigationType,
        fromIndex: window.navigation.currentEntry?.index ?? -1,
        toIndex: event.destination.index,
      });
      event.intercept({
        handler: () =>
          new Promise<void>((resolve) => {
            finishNavigation.current?.();
            finishNavigation.current = resolve;
            onNavigate();
            startTransition(() => {
              addTransitionType(transitionType);
              setLocation((current) => ({
                path: pathname,
                navigationCount: current.navigationCount + 1,
              }));
            });
          }),
      });
    };

    window.navigation.addEventListener("navigate", onNavigateEvent);
    return () => {
      window.navigation.removeEventListener("navigate", onNavigateEvent);
    };
  }, [canHandle, onNavigate, startTransition]);

  useLayoutEffect(() => {
    finishNavigation.current?.();
    finishNavigation.current = null;
  }, [location]);

  useLayoutEffect(
    () => () => {
      finishNavigation.current?.();
      finishNavigation.current = null;
    },
    [],
  );

  return { path: location.path, pending, navigationCount: location.navigationCount };
}
