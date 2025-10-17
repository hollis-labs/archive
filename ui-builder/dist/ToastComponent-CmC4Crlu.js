import { useState as l, useCallback as s, useEffect as T } from "react";
let y = 0;
const m = () => {
  const [d, a] = l([]), n = s((t) => {
    const o = `toast-${++y}`, r = {
      ...t,
      id: o,
      duration: t.duration ?? 5e3
    };
    return a((f) => [...f, r]), r.duration > 0 && setTimeout(() => {
      e(o);
    }, r.duration), o;
  }, []), e = s((t) => {
    a((o) => o.filter((r) => r.id !== t));
  }, []), c = s((t, o) => n({ type: "success", title: t, description: o }), [n]), u = s((t, o) => n({ type: "error", title: t, description: o, duration: 7e3 }), [n]), i = s((t, o) => n({ type: "warning", title: t, description: o }), [n]), p = s((t, o) => n({ type: "info", title: t, description: o }), [n]);
  return {
    toasts: d,
    addToast: n,
    removeToast: e,
    success: c,
    error: u,
    warning: i,
    info: p
  };
};
function g({ config: d }) {
  const { props: a } = d, {
    title: n,
    description: e,
    variant: c = "default",
    duration: u = 5e3
  } = a, i = m();
  return T(() => {
    const t = {
      default: "info",
      destructive: "error",
      success: "success",
      warning: "warning"
    }[c] || "info";
    i.addToast({
      type: t,
      title: n,
      description: e,
      duration: u
    });
  }, [n, e, c, u, i]), null;
}
export {
  g as ToastComponent
};
