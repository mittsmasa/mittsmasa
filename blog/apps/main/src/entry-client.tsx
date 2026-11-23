import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import "@blog/ui/styles.css";
import { App } from "./app.tsx";

const root = document.getElementById("root");
if (!root) {
  throw new Error("#root がありません");
}

const app = (
  <StrictMode>
    <App path={window.location.pathname} />
  </StrictMode>
);

if (root.firstElementChild) {
  hydrateRoot(root, app);
} else {
  createRoot(root).render(app);
}
