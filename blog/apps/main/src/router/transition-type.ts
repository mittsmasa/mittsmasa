export type NavigationTransitionType =
  | "navigation-push"
  | "navigation-replace"
  | "navigation-reload"
  | "navigation-back"
  | "navigation-forward";

type Navigation = {
  navigationType: NavigationType;
  fromIndex: number;
  toIndex: number;
};

export function transitionTypeOf({
  navigationType,
  fromIndex,
  toIndex,
}: Navigation): NavigationTransitionType {
  if (navigationType !== "traverse") {
    return `navigation-${navigationType}`;
  }
  return toIndex < fromIndex ? "navigation-back" : "navigation-forward";
}
