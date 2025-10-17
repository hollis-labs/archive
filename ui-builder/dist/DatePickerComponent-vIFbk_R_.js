import { r as j, j as e, R as P, c as g } from "./badge-DBvLZUPk.js";
import { f as C, C as w } from "./calendar-dCXib1Ci.js";
import { P as E, a as y, b as N } from "./popover-B7Y5l707.js";
import { C as S } from "./calendar-C9Gsg-dr.js";
function D({ config: d }) {
  const { props: m, actions: t } = d, {
    value: s,
    placeholder: p = "Pick a date",
    format: u = "PPP",
    disabled: n = !1,
    className: f
  } = m || {}, [a, h] = j.useState(
    s ? new Date(s) : void 0
  ), x = (o) => {
    if (h(o), t != null && t.change && o) {
      const { type: r, command: l, event: i, payload: v } = t.change, c = { ...v, value: o.toISOString() };
      r === "command" && l ? window.dispatchEvent(new CustomEvent("command:execute", { detail: { command: l, payload: c } })) : r === "emit" && i && window.dispatchEvent(new CustomEvent(i, { detail: c }));
    }
  };
  return /* @__PURE__ */ e.jsxs(E, { children: [
    /* @__PURE__ */ e.jsx(y, { asChild: !0, children: /* @__PURE__ */ e.jsxs(
      P,
      {
        variant: "outline",
        className: g(
          "w-full justify-start text-left font-normal",
          !a && "text-muted-foreground",
          f
        ),
        disabled: n,
        children: [
          /* @__PURE__ */ e.jsx(S, { className: "mr-2 h-4 w-4" }),
          a ? C(a, u) : /* @__PURE__ */ e.jsx("span", { children: p })
        ]
      }
    ) }),
    /* @__PURE__ */ e.jsx(N, { className: "w-auto p-0", align: "start", children: /* @__PURE__ */ e.jsx(
      w,
      {
        mode: "single",
        selected: a,
        onSelect: x,
        disabled: n
      }
    ) })
  ] });
}
export {
  D as DatePickerComponent
};
