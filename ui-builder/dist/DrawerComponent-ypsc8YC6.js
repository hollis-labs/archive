import { j as e, K as E, ah as S, r as c, M as y, c as N, ai as F, aj as D, ak as O, al as R } from "./index-CCDmHyX2.js";
import l, { useState as T } from "react";
function k({ config: p }) {
  const { props: h, actions: n } = p, {
    title: x,
    description: r,
    trigger: m,
    content: u = [],
    footer: d = [],
    direction: f = "bottom",
    defaultOpen: j = !1,
    className: v
  } = h || {}, [w, C] = T(j), g = (t) => {
    if (C(t), t && (n != null && n.open)) {
      const { type: a, command: s, event: o, payload: i } = n.open;
      a === "command" && s ? window.dispatchEvent(new CustomEvent("command:execute", { detail: { command: s, payload: i } })) : a === "emit" && o && window.dispatchEvent(new CustomEvent(o, { detail: i }));
    } else if (!t && (n != null && n.close)) {
      const { type: a, command: s, event: o, payload: i } = n.close;
      a === "command" && s ? window.dispatchEvent(new CustomEvent("command:execute", { detail: { command: s, payload: i } })) : a === "emit" && o && window.dispatchEvent(new CustomEvent(o, { detail: i }));
    }
  };
  return /* @__PURE__ */ e.jsxs(E, { open: w, onOpenChange: g, children: [
    m && /* @__PURE__ */ e.jsx(S, { asChild: !0, children: c(m) }),
    /* @__PURE__ */ e.jsxs(y, { side: f, className: N("h-auto", v), children: [
      /* @__PURE__ */ e.jsxs(F, { children: [
        /* @__PURE__ */ e.jsx(D, { children: x }),
        r && /* @__PURE__ */ e.jsx(O, { children: r })
      ] }),
      /* @__PURE__ */ e.jsx("div", { className: "space-y-4 py-4", children: u.map((t) => /* @__PURE__ */ e.jsx(l.Fragment, { children: c(t) }, t.id)) }),
      d && d.length > 0 && /* @__PURE__ */ e.jsx(R, { children: d.map((t) => /* @__PURE__ */ e.jsx(l.Fragment, { children: c(t) }, t.id)) })
    ] })
  ] });
}
export {
  k as DrawerComponent
};
