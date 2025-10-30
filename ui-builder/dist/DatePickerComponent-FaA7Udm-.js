import { j as e, B as j, c as P, b3 as g } from "./index-BnHp2Mvr.js";
import { useState as w } from "react";
import { f as C, C as y } from "./calendar-S6a9lyZC.js";
import { P as E, a as N, b as S } from "./popover-CQeE3aL_.js";
function F({ config: d }) {
  const { props: m, actions: t } = d, {
    value: s,
    placeholder: p = "Pick a date",
    format: u = "PPP",
    disabled: n = !1,
    className: f
  } = m || {}, [a, h] = w(
    s ? new Date(s) : void 0
  ), v = (o) => {
    if (h(o), t != null && t.change && o) {
      const { type: r, command: l, event: i, payload: x } = t.change, c = { ...x, value: o.toISOString() };
      r === "command" && l ? window.dispatchEvent(new CustomEvent("command:execute", { detail: { command: l, payload: c } })) : r === "emit" && i && window.dispatchEvent(new CustomEvent(i, { detail: c }));
    }
  };
  return /* @__PURE__ */ e.jsxs(E, { children: [
    /* @__PURE__ */ e.jsx(N, { asChild: !0, children: /* @__PURE__ */ e.jsxs(
      j,
      {
        variant: "outline",
        className: P(
          "w-full justify-start text-left font-normal",
          !a && "text-muted-foreground",
          f
        ),
        disabled: n,
        children: [
          /* @__PURE__ */ e.jsx(g, { className: "mr-2 h-4 w-4" }),
          a ? C(a, u) : /* @__PURE__ */ e.jsx("span", { children: p })
        ]
      }
    ) }),
    /* @__PURE__ */ e.jsx(S, { className: "w-auto p-0", align: "start", children: /* @__PURE__ */ e.jsx(
      y,
      {
        mode: "single",
        selected: a,
        onSelect: v,
        disabled: n
      }
    ) })
  ] });
}
export {
  F as DatePickerComponent
};
