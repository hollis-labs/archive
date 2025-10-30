import { j as e, N as E, ak as S, r as c, O as y, c as N, al as F, am as O, an as R, ao as T } from "./index-DYB5mfQF.js";
import l, { useState as _ } from "react";
function H({ config: p }) {
  const { props: h, actions: n } = p, {
    title: x,
    description: m,
    side: f = "right",
    trigger: r,
    content: u = [],
    footer: d = [],
    defaultOpen: v = !1,
    className: j
  } = h || {}, [w, g] = _(v), C = (t) => {
    if (g(t), t && (n != null && n.open)) {
      const { type: s, command: a, event: o, payload: i } = n.open;
      s === "command" && a ? window.dispatchEvent(new CustomEvent("command:execute", { detail: { command: a, payload: i } })) : s === "emit" && o && window.dispatchEvent(new CustomEvent(o, { detail: i }));
    } else if (!t && (n != null && n.close)) {
      const { type: s, command: a, event: o, payload: i } = n.close;
      s === "command" && a ? window.dispatchEvent(new CustomEvent("command:execute", { detail: { command: a, payload: i } })) : s === "emit" && o && window.dispatchEvent(new CustomEvent(o, { detail: i }));
    }
  };
  return /* @__PURE__ */ e.jsxs(E, { open: w, onOpenChange: C, children: [
    r && /* @__PURE__ */ e.jsx(S, { asChild: !0, children: c(r) }),
    /* @__PURE__ */ e.jsxs(y, { side: f, className: N(j), children: [
      /* @__PURE__ */ e.jsxs(F, { children: [
        /* @__PURE__ */ e.jsx(O, { children: x }),
        m && /* @__PURE__ */ e.jsx(R, { children: m })
      ] }),
      /* @__PURE__ */ e.jsx("div", { className: "space-y-4 py-4", children: u.map((t) => /* @__PURE__ */ e.jsx(l.Fragment, { children: c(t) }, t.id)) }),
      d && d.length > 0 && /* @__PURE__ */ e.jsx(T, { children: d.map((t) => /* @__PURE__ */ e.jsx(l.Fragment, { children: c(t) }, t.id)) })
    ] })
  ] });
}
export {
  H as SheetComponent
};
