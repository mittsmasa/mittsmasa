import { useSyncExternalStore } from "react";

const STORAGE_KEY = "theme";
const DARK_CLASS = "dark";

const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function isDarkMode() {
  return document.documentElement.classList.contains(DARK_CLASS);
}

export function setDarkMode(darkMode: boolean) {
  document.documentElement.classList.toggle(DARK_CLASS, darkMode);
  try {
    localStorage.setItem(STORAGE_KEY, darkMode ? "dark" : "light");
  } catch {}
  for (const listener of listeners) listener();
}

export function useDarkMode() {
  return useSyncExternalStore(subscribe, isDarkMode, () => false);
}
