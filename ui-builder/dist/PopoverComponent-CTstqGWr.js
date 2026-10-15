import { j as m, r as d, c as C } from "./index-BBlDfRZw.js";
import E, { useState as g } from "react";
import { P as j, a as y, b as N } from "./popover-BWU4R47a.js";
function R({ config: c }) {
  const { props: i, actions: e } = c, {
    trigger: r,
    content: p = [],
    side: l = "bottom",
    align: v = "center",
    defaultOpen: f = !1,
    className: u
  } = i || {}, [h, w] = g(f), x = (n) => {
    if (w(n), n && (e != null && e.open)) {
      const { type: t, command: o, event: a, payload: s } = e.open;
      t === "command" && o ? window.dispatchEvent(new CustomEvent("command:execute", { detail: { command: o, payload: s } })) : t === "emit" && a && window.dispatchEvent(new CustomEvent(a, { detail: s }));
    } else if (!n && (e != null && e.close)) {
      const { type: t, command: o, event: a, payload: s } = e.close;
      t === "command" && o ? window.dispatchEvent(new CustomEvent("command:execute", { detail: { command: o, payload: s } })) : t === "emit" && a && window.dispatchEvent(new CustomEvent(a, { detail: s }));
    }
  };
  return /* @__PURE__ */ m.jsxs(j, { open: h, onOpenChange: x, children: [
    /* @__PURE__ */ m.jsx(y, { asChild: !0, children: d(r) }),
    /* @__PURE__ */ m.jsx(N, { side: l, align: v, className: C(u), children: /* @__PURE__ */ m.jsx("div", { className: "space-y-3", children: p.map((n) => /* @__PURE__ */ m.jsx(E.Fragment, { children: d(n) }, n.id)) }) })
  ] });
}
export {
  R as PopoverComponent
};
