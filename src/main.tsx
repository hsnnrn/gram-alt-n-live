import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
import "./index.css";
import { injectTrackingTags } from "./lib/injectTracking";

function scheduleNonCriticalWork(fn: () => void) {
  if (typeof window === "undefined") {
    fn();
    return;
  }
  const w = window as Window & { requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number };
  if (typeof w.requestIdleCallback === "function") {
    w.requestIdleCallback(() => fn(), { timeout: 4000 });
  } else {
    window.setTimeout(fn, 1);
  }
}

scheduleNonCriticalWork(() => injectTrackingTags());

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
);
