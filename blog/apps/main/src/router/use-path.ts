import {
  addTransitionType,
  type RefObject,
  useEffect,
  useEffectEvent,
  useLayoutEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import { transitionTypeOf, UA_VISUAL_TRANSITION_TYPE } from "./transition-type.ts";

export type RouterState = {
  path: string;
  pending: boolean;
  navigationCount: number;
};

type PendingNavigation = RefObject<(() => void) | null>;

function canReplace(event: NavigateEvent): boolean {
  return (
    event.canIntercept && !event.hashChange && event.downloadRequest === null && !event.formData
  );
}

function finish(pendingNavigation: PendingNavigation): void {
  pendingNavigation.current?.();
  pendingNavigation.current = null;
}

function useFinishNavigationBeforeViewTransitionStarts(
  pendingNavigation: PendingNavigation,
  committedLocation: unknown,
): void {
  useLayoutEffect(() => {
    finish(pendingNavigation);
  }, [pendingNavigation, committedLocation]);
}

function useFinishNavigationOnUnmount(pendingNavigation: PendingNavigation): void {
  useLayoutEffect(() => () => finish(pendingNavigation), [pendingNavigation]);
}

export function usePath(
  initialPath: string,
  canHandle: (path: string) => boolean,
  onNavigate: () => void,
): RouterState {
  const [location, setLocation] = useState({ path: initialPath, navigationCount: 0 });
  const [pending, startTransition] = useTransition();
  const pendingNavigation = useRef<(() => void) | null>(null);
  const canHandlePath = useEffectEvent(canHandle);
  const prepareNavigation = useEffectEvent(onNavigate);

  useEffect(() => {
    if (!("navigation" in window)) return;

    const onNavigateEvent = (event: NavigateEvent) => {
      if (!canReplace(event)) return;
      const { pathname } = new URL(event.destination.url);
      if (!event.destination.sameDocument && !canHandlePath(pathname)) return;
      const transitionType = transitionTypeOf({
        navigationType: event.navigationType,
        fromIndex: window.navigation.currentEntry?.index ?? -1,
        toIndex: event.destination.index,
      });
      const { hasUAVisualTransition } = event;
      event.intercept({
        handler: () =>
          new Promise<void>((resolve) => {
            finish(pendingNavigation);
            pendingNavigation.current = resolve;
            prepareNavigation();
            startTransition(() => {
              addTransitionType(transitionType);
              if (hasUAVisualTransition) addTransitionType(UA_VISUAL_TRANSITION_TYPE);
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
  }, [startTransition]);

  useFinishNavigationBeforeViewTransitionStarts(pendingNavigation, location);
  useFinishNavigationOnUnmount(pendingNavigation);

  return { path: location.path, pending, navigationCount: location.navigationCount };
}
