import { j as e, K as E, ah as S, r as c, M as y, c as N, ai as F, aj as O, ak as R, al as T } from "./index-BYboRAHg.js";
import l, { useState as _ } from "react";
function H({ config: h }) {
  const { props: p, actions: n } = h, {
    title: x,
    description: r,
    side: f = "right",
    trigger: m,
    content: j = [],
    footer: d = [],
    defaultOpen: u = !1,
    className: v
  } = p || {}, [w, g] = _(u), C = (t) => {
    if (g(t), t && (n != null && n.open)) {
      const { type: s, command: a, event: o, payload: i } = n.open;
      s === "command" && a ? window.dispatchEvent(new CustomEvent("command:execute", { detail: { command: a, payload: i } })) : s === "emit" && o && window.dispatchEvent(new CustomEvent(o, { detail: i }));
    } else if (!t && (n != null && n.close)) {
      const { type: s, command: a, event: o, payload: i } = n.close;
      s === "command" && a ? window.dispatchEvent(new CustomEvent("command:execute", { detail: { command: a, payload: i } })) : s === "emit" && o && window.dispatchEvent(new CustomEvent(o, { detail: i }));
    }
  };
  return /* @__PURE__ */ e.jsxs(E, { open: w, onOpenChange: C, children: [
    m && /* @__PURE__ */ e.jsx(S, { asChild: !0, children: c(m) }),
    /* @__PURE__ */ e.jsxs(y, { side: f, className: N(v), children: [
      /* @__PURE__ */ e.jsxs(F, { children: [
        /* @__PURE__ */ e.jsx(O, { children: x }),
        r && /* @__PURE__ */ e.jsx(R, { children: r })
      ] }),
      /* @__PURE__ */ e.jsx("div", { className: "space-y-4 py-4", children: j.map((t) => /* @__PURE__ */ e.jsx(l.Fragment, { children: c(t) }, t.id)) }),
      d && d.length > 0 && /* @__PURE__ */ e.jsx(T, { children: d.map((t) => /* @__PURE__ */ e.jsx(l.Fragment, { children: c(t) }, t.id)) })
    ] })
  ] });
}
export {
  H as SheetComponent
};
