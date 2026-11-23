/**
 * ルーターが `addTransitionType` に渡す、遷移の種類。
 * `<ViewTransition>` の props や CSS の `:active-view-transition-type()` で受け取る。
 */
export type NavigationTransitionType =
  /** リンクなどで新しい履歴に進む */
  | "navigation-push"
  /** 今の履歴を置き換える */
  | "navigation-replace"
  /** 同じ履歴を読み直す */
  | "navigation-reload"
  /** 履歴を戻る */
  | "navigation-back"
  /** 履歴を進む */
  | "navigation-forward";

type Navigation = {
  /** `NavigateEvent.navigationType` */
  navigationType: NavigationType;
  /** 今の履歴の番号 */
  fromIndex: number;
  /** 行き先の履歴の番号。履歴の移動（traverse）以外では -1 になることがある */
  toIndex: number;
};

/** 遷移の種類を決める。履歴の番号を比べるのは、履歴の移動（traverse）のときだけ */
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
