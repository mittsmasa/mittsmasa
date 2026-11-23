import { Component, type ReactNode } from "react";

type Props = {
  /** 子の描画が失敗したときに、子の代わりに出すもの */
  fallback: ReactNode;
  children: ReactNode;
};

type State = {
  failed: boolean;
};

/**
 * 子の描画で起きたエラーを捕まえ、`fallback` を出す。`use` に渡した Promise の失敗もここに届く。
 * 一度失敗すると `fallback` のままになる。元に戻すには、`key` を変えて作り直す。
 */
export class ErrorBoundary extends Component<Props, State> {
  override state: State = { failed: false };

  static getDerivedStateFromError(): State {
    return { failed: true };
  }

  override render(): ReactNode {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}
