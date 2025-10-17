import { r as D, j as e, D as E, ay as y, O as m, e as N, c as z, f as F, g as O, az as R, V as r, a2 as T } from "./badge-DBvLZUPk.js";
const H = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  full: "max-w-full"
};
function V({ config: p }) {
  const { props: x, actions: a } = p, {
    title: g,
    description: d,
    trigger: c,
    content: h = [],
    footer: l = [],
    size: w = "lg",
    defaultOpen: f = !1,
    className: u
  } = x || {}, [v, j] = D.useState(f), C = (n) => {
    if (j(n), n && (a != null && a.open)) {
      const { type: t, command: s, event: o, payload: i } = a.open;
      t === "command" && s ? window.dispatchEvent(new CustomEvent("command:execute", { detail: { command: s, payload: i } })) : t === "emit" && o && window.dispatchEvent(new CustomEvent(o, { detail: i }));
    } else if (!n && (a != null && a.close)) {
      const { type: t, command: s, event: o, payload: i } = a.close;
      t === "command" && s ? window.dispatchEvent(new CustomEvent("command:execute", { detail: { command: s, payload: i } })) : t === "emit" && o && window.dispatchEvent(new CustomEvent(o, { detail: i }));
    }
  };
  return /* @__PURE__ */ e.jsxs(E, { open: v, onOpenChange: C, children: [
    c && /* @__PURE__ */ e.jsx(y, { asChild: !0, children: m(c) }),
    /* @__PURE__ */ e.jsxs(N, { className: z(H[w], u), children: [
      /* @__PURE__ */ e.jsxs(F, { children: [
        /* @__PURE__ */ e.jsx(O, { children: g }),
        d && /* @__PURE__ */ e.jsx(R, { children: d })
      ] }),
      /* @__PURE__ */ e.jsx("div", { className: "space-y-4", children: h.map((n) => /* @__PURE__ */ e.jsx(r.Fragment, { children: m(n) }, n.id)) }),
      l && l.length > 0 && /* @__PURE__ */ e.jsx(T, { children: l.map((n) => /* @__PURE__ */ e.jsx(r.Fragment, { children: m(n) }, n.id)) })
    ] })
  ] });
}
export {
  V as DialogComponent
};
