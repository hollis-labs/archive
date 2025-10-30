import { j as e, $ as D, a0 as E, r as m, a1 as y, c as N, a2 as F, a3 as z, a4 as O, a5 as R } from "./index-BnHp2Mvr.js";
import r, { useState as T } from "react";
const _ = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  full: "max-w-full"
};
function $({ config: p }) {
  const { props: x, actions: n } = p, {
    title: g,
    description: d,
    trigger: c,
    content: h = [],
    footer: l = [],
    size: w = "lg",
    defaultOpen: f = !1,
    className: u
  } = x || {}, [v, j] = T(f), C = (a) => {
    if (j(a), a && (n != null && n.open)) {
      const { type: t, command: s, event: o, payload: i } = n.open;
      t === "command" && s ? window.dispatchEvent(new CustomEvent("command:execute", { detail: { command: s, payload: i } })) : t === "emit" && o && window.dispatchEvent(new CustomEvent(o, { detail: i }));
    } else if (!a && (n != null && n.close)) {
      const { type: t, command: s, event: o, payload: i } = n.close;
      t === "command" && s ? window.dispatchEvent(new CustomEvent("command:execute", { detail: { command: s, payload: i } })) : t === "emit" && o && window.dispatchEvent(new CustomEvent(o, { detail: i }));
    }
  };
  return /* @__PURE__ */ e.jsxs(D, { open: v, onOpenChange: C, children: [
    c && /* @__PURE__ */ e.jsx(E, { asChild: !0, children: m(c) }),
    /* @__PURE__ */ e.jsxs(y, { className: N(_[w], u), children: [
      /* @__PURE__ */ e.jsxs(F, { children: [
        /* @__PURE__ */ e.jsx(z, { children: g }),
        d && /* @__PURE__ */ e.jsx(O, { children: d })
      ] }),
      /* @__PURE__ */ e.jsx("div", { className: "space-y-4", children: h.map((a) => /* @__PURE__ */ e.jsx(r.Fragment, { children: m(a) }, a.id)) }),
      l && l.length > 0 && /* @__PURE__ */ e.jsx(R, { children: l.map((a) => /* @__PURE__ */ e.jsx(r.Fragment, { children: m(a) }, a.id)) })
    ] })
  ] });
}
export {
  $ as DialogComponent
};
