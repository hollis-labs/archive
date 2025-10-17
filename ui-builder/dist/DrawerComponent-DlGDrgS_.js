import { j as e, r, c as E } from "./index-BvjF5Aq2.js";
import l, { useState as S } from "react";
import { S as y, b as N, a as F, c as b, d as D, e as O, f as R } from "./sheet-PdzujRcx.js";
function k({ config: p }) {
  const { props: h, actions: n } = p, {
    title: f,
    description: c,
    trigger: m,
    content: x = [],
    footer: d = [],
    direction: u = "bottom",
    defaultOpen: v = !1,
    className: w
  } = h || {}, [j, C] = S(v), g = (t) => {
    if (C(t), t && (n != null && n.open)) {
      const { type: s, command: a, event: o, payload: i } = n.open;
      s === "command" && a ? window.dispatchEvent(new CustomEvent("command:execute", { detail: { command: a, payload: i } })) : s === "emit" && o && window.dispatchEvent(new CustomEvent(o, { detail: i }));
    } else if (!t && (n != null && n.close)) {
      const { type: s, command: a, event: o, payload: i } = n.close;
      s === "command" && a ? window.dispatchEvent(new CustomEvent("command:execute", { detail: { command: a, payload: i } })) : s === "emit" && o && window.dispatchEvent(new CustomEvent(o, { detail: i }));
    }
  };
  return /* @__PURE__ */ e.jsxs(y, { open: j, onOpenChange: g, children: [
    m && /* @__PURE__ */ e.jsx(N, { asChild: !0, children: r(m) }),
    /* @__PURE__ */ e.jsxs(F, { side: u, className: E("h-auto", w), children: [
      /* @__PURE__ */ e.jsxs(b, { children: [
        /* @__PURE__ */ e.jsx(D, { children: f }),
        c && /* @__PURE__ */ e.jsx(O, { children: c })
      ] }),
      /* @__PURE__ */ e.jsx("div", { className: "space-y-4 py-4", children: x.map((t) => /* @__PURE__ */ e.jsx(l.Fragment, { children: r(t) }, t.id)) }),
      d && d.length > 0 && /* @__PURE__ */ e.jsx(R, { children: d.map((t) => /* @__PURE__ */ e.jsx(l.Fragment, { children: r(t) }, t.id)) })
    ] })
  ] });
}
export {
  k as DrawerComponent
};
