import { j as e, Y as D, Z as E, r as m, _ as y, c as N, $ as F, a0 as _, a1 as z, a2 as O } from "./index-DipMs7ol.js";
import r, { useState as R } from "react";
const T = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  full: "max-w-full"
};
function Y({ config: p }) {
  const { props: x, actions: a } = p, {
    title: g,
    description: d,
    trigger: c,
    content: h = [],
    footer: l = [],
    size: w = "lg",
    defaultOpen: f = !1,
    className: u
  } = x || {}, [v, j] = R(f), C = (n) => {
    if (j(n), n && (a != null && a.open)) {
      const { type: t, command: s, event: o, payload: i } = a.open;
      t === "command" && s ? window.dispatchEvent(new CustomEvent("command:execute", { detail: { command: s, payload: i } })) : t === "emit" && o && window.dispatchEvent(new CustomEvent(o, { detail: i }));
    } else if (!n && (a != null && a.close)) {
      const { type: t, command: s, event: o, payload: i } = a.close;
      t === "command" && s ? window.dispatchEvent(new CustomEvent("command:execute", { detail: { command: s, payload: i } })) : t === "emit" && o && window.dispatchEvent(new CustomEvent(o, { detail: i }));
    }
  };
  return /* @__PURE__ */ e.jsxs(D, { open: v, onOpenChange: C, children: [
    c && /* @__PURE__ */ e.jsx(E, { asChild: !0, children: m(c) }),
    /* @__PURE__ */ e.jsxs(y, { className: N(T[w], u), children: [
      /* @__PURE__ */ e.jsxs(F, { children: [
        /* @__PURE__ */ e.jsx(_, { children: g }),
        d && /* @__PURE__ */ e.jsx(z, { children: d })
      ] }),
      /* @__PURE__ */ e.jsx("div", { className: "space-y-4", children: h.map((n) => /* @__PURE__ */ e.jsx(r.Fragment, { children: m(n) }, n.id)) }),
      l && l.length > 0 && /* @__PURE__ */ e.jsx(O, { children: l.map((n) => /* @__PURE__ */ e.jsx(r.Fragment, { children: m(n) }, n.id)) })
    ] })
  ] });
}
export {
  Y as DialogComponent
};
