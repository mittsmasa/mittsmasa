import { useEffect, useState } from "react";

/**
 * `value` が true になってから `delayMs` たつまでは false を返す。false にはすぐ戻る。
 *
 * すぐ終わる処理で、読み込み中の表示が一瞬だけ出るのを防ぐために使う。
 *
 * @param value 遅らせたい真偽値
 * @param delayMs true を返すまでに待つ時間（ミリ秒）
 */
export function useDelayed(value: boolean, delayMs: number): boolean {
  const [elapsed, setElapsed] = useState(false);

  useEffect(() => {
    if (!value) return;
    const timer = setTimeout(() => {
      setElapsed(true);
    }, delayMs);
    return () => {
      clearTimeout(timer);
      setElapsed(false);
    };
  }, [value, delayMs]);

  return value && elapsed;
}
