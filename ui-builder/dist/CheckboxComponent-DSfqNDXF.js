import { j as c, c as h, L as b } from "./badge-DBvLZUPk.js";
import { C as k } from "./checkbox-918erH_7.js";
function g({ config: l }) {
  const { props: v = {}, actions: e } = l, {
    label: m,
    checked: w,
    defaultChecked: f,
    disabled: p = !1,
    required: s = !1,
    name: d,
    value: i,
    className: x
  } = v, y = (n) => {
    if (e != null && e.change) {
      const { type: t, event: a, command: o, payload: u } = e.change;
      t === "emit" && a ? window.dispatchEvent(new CustomEvent(a, {
        detail: { ...u, checked: n, name: d, value: i }
      })) : t === "command" && o && window.dispatchEvent(new CustomEvent("command:execute", {
        detail: { command: o, payload: { ...u, checked: n, name: d, value: i } }
      }));
    }
  }, C = () => {
    if (e != null && e.focus) {
      const { type: n, event: t, command: a, payload: o } = e.focus;
      n === "emit" && t ? window.dispatchEvent(new CustomEvent(t, { detail: { ...o, name: d } })) : n === "command" && a && window.dispatchEvent(new CustomEvent("command:execute", {
        detail: { command: a, payload: { ...o, name: d } }
      }));
    }
  }, E = () => {
    if (e != null && e.blur) {
      const { type: n, event: t, command: a, payload: o } = e.blur;
      n === "emit" && t ? window.dispatchEvent(new CustomEvent(t, { detail: { ...o, name: d } })) : n === "command" && a && window.dispatchEvent(new CustomEvent("command:execute", {
        detail: { command: a, payload: { ...o, name: d } }
      }));
    }
  }, r = `checkbox-${l.id}`;
  return /* @__PURE__ */ c.jsxs("div", { className: h("flex items-center space-x-2", x), children: [
    /* @__PURE__ */ c.jsx(
      k,
      {
        id: r,
        checked: w,
        defaultChecked: f,
        disabled: p,
        required: s,
        name: d,
        value: i,
        onCheckedChange: y,
        onFocus: C,
        onBlur: E,
        "aria-required": s
      }
    ),
    m && /* @__PURE__ */ c.jsxs(
      b,
      {
        htmlFor: r,
        className: h(
          "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
          p && "opacity-50 cursor-not-allowed"
        ),
        children: [
          m,
          s && /* @__PURE__ */ c.jsx("span", { className: "text-destructive ml-1", children: "*" })
        ]
      }
    )
  ] });
}
export {
  g as CheckboxComponent
};
