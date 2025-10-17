import { r as C, j as m, O as c, c as E, V as g } from "./badge-DBvLZUPk.js";
import { P as j, a as y, b as N } from "./popover-B7Y5l707.js";
function b({ config: d }) {
  const { props: i, actions: e } = d, {
    trigger: r,
    content: p = [],
    side: l = "bottom",
    align: v = "center",
    defaultOpen: h = !1,
    className: u
  } = i || {}, [w, f] = C.useState(h), x = (n) => {
    if (f(n), n && (e != null && e.open)) {
      const { type: t, command: o, event: a, payload: s } = e.open;
      t === "command" && o ? window.dispatchEvent(new CustomEvent("command:execute", { detail: { command: o, payload: s } })) : t === "emit" && a && window.dispatchEvent(new CustomEvent(a, { detail: s }));
    } else if (!n && (e != null && e.close)) {
      const { type: t, command: o, event: a, payload: s } = e.close;
      t === "command" && o ? window.dispatchEvent(new CustomEvent("command:execute", { detail: { command: o, payload: s } })) : t === "emit" && a && window.dispatchEvent(new CustomEvent(a, { detail: s }));
    }
  };
  return /* @__PURE__ */ m.jsxs(j, { open: w, onOpenChange: x, children: [
    /* @__PURE__ */ m.jsx(y, { asChild: !0, children: c(r) }),
    /* @__PURE__ */ m.jsx(N, { side: l, align: v, className: E(u), children: /* @__PURE__ */ m.jsx("div", { className: "space-y-3", children: p.map((n) => /* @__PURE__ */ m.jsx(g.Fragment, { children: c(n) }, n.id)) }) })
  ] });
}
export {
  b as PopoverComponent
};
