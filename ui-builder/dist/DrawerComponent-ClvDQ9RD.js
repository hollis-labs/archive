import { r as g, j as e, O as c, c as S, V as l } from "./badge-DBvLZUPk.js";
import { S as y, b as N, a as F, c as O, d as b, e as D, f as R } from "./sheet-Bgwaf8A5.js";
function V({ config: p }) {
  const { props: h, actions: n } = p, {
    title: x,
    description: r,
    trigger: m,
    content: f = [],
    footer: d = [],
    direction: u = "bottom",
    defaultOpen: v = !1,
    className: w
  } = h || {}, [j, C] = g.useState(v), E = (t) => {
    if (C(t), t && (n != null && n.open)) {
      const { type: s, command: a, event: o, payload: i } = n.open;
      s === "command" && a ? window.dispatchEvent(new CustomEvent("command:execute", { detail: { command: a, payload: i } })) : s === "emit" && o && window.dispatchEvent(new CustomEvent(o, { detail: i }));
    } else if (!t && (n != null && n.close)) {
      const { type: s, command: a, event: o, payload: i } = n.close;
      s === "command" && a ? window.dispatchEvent(new CustomEvent("command:execute", { detail: { command: a, payload: i } })) : s === "emit" && o && window.dispatchEvent(new CustomEvent(o, { detail: i }));
    }
  };
  return /* @__PURE__ */ e.jsxs(y, { open: j, onOpenChange: E, children: [
    m && /* @__PURE__ */ e.jsx(N, { asChild: !0, children: c(m) }),
    /* @__PURE__ */ e.jsxs(F, { side: u, className: S("h-auto", w), children: [
      /* @__PURE__ */ e.jsxs(O, { children: [
        /* @__PURE__ */ e.jsx(b, { children: x }),
        r && /* @__PURE__ */ e.jsx(D, { children: r })
      ] }),
      /* @__PURE__ */ e.jsx("div", { className: "space-y-4 py-4", children: f.map((t) => /* @__PURE__ */ e.jsx(l.Fragment, { children: c(t) }, t.id)) }),
      d && d.length > 0 && /* @__PURE__ */ e.jsx(R, { children: d.map((t) => /* @__PURE__ */ e.jsx(l.Fragment, { children: c(t) }, t.id)) })
    ] })
  ] });
}
export {
  V as DrawerComponent
};
