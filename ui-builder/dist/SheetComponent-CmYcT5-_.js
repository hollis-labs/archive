import { j as e, r as c, c as S } from "./index-BvjF5Aq2.js";
import l, { useState as E } from "react";
import { S as y, b as N, a as F, c as O, d as R, e as T, f as _ } from "./sheet-PdzujRcx.js";
function k({ config: p }) {
  const { props: h, actions: n } = p, {
    title: f,
    description: r,
    side: x = "right",
    trigger: m,
    content: u = [],
    footer: d = [],
    defaultOpen: v = !1,
    className: j
  } = h || {}, [w, g] = E(v), C = (t) => {
    if (g(t), t && (n != null && n.open)) {
      const { type: s, command: a, event: o, payload: i } = n.open;
      s === "command" && a ? window.dispatchEvent(new CustomEvent("command:execute", { detail: { command: a, payload: i } })) : s === "emit" && o && window.dispatchEvent(new CustomEvent(o, { detail: i }));
    } else if (!t && (n != null && n.close)) {
      const { type: s, command: a, event: o, payload: i } = n.close;
      s === "command" && a ? window.dispatchEvent(new CustomEvent("command:execute", { detail: { command: a, payload: i } })) : s === "emit" && o && window.dispatchEvent(new CustomEvent(o, { detail: i }));
    }
  };
  return /* @__PURE__ */ e.jsxs(y, { open: w, onOpenChange: C, children: [
    m && /* @__PURE__ */ e.jsx(N, { asChild: !0, children: c(m) }),
    /* @__PURE__ */ e.jsxs(F, { side: x, className: S(j), children: [
      /* @__PURE__ */ e.jsxs(O, { children: [
        /* @__PURE__ */ e.jsx(R, { children: f }),
        r && /* @__PURE__ */ e.jsx(T, { children: r })
      ] }),
      /* @__PURE__ */ e.jsx("div", { className: "space-y-4 py-4", children: u.map((t) => /* @__PURE__ */ e.jsx(l.Fragment, { children: c(t) }, t.id)) }),
      d && d.length > 0 && /* @__PURE__ */ e.jsx(_, { children: d.map((t) => /* @__PURE__ */ e.jsx(l.Fragment, { children: c(t) }, t.id)) })
    ] })
  ] });
}
export {
  k as SheetComponent
};
