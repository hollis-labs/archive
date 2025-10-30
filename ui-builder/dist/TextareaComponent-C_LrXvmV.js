import { j as g, T as x, c as C } from "./index-pZCaaM9p.js";
function N({ config: m }) {
  const { props: u = {}, actions: e } = m, {
    placeholder: c,
    value: i,
    defaultValue: v,
    disabled: r = !1,
    readonly: p = !1,
    required: s = !1,
    rows: w = 3,
    name: d,
    className: f
  } = u, h = (a) => {
    if (e != null && e.change) {
      const { type: t, event: n, command: o, payload: l } = e.change;
      t === "emit" && n ? window.dispatchEvent(new CustomEvent(n, {
        detail: { ...l, value: a.target.value, name: d }
      })) : t === "command" && o && window.dispatchEvent(new CustomEvent("command:execute", {
        detail: { command: o, payload: { ...l, value: a.target.value, name: d } }
      }));
    }
  }, y = (a) => {
    if (e != null && e.blur) {
      const { type: t, event: n, command: o, payload: l } = e.blur;
      t === "emit" && n ? window.dispatchEvent(new CustomEvent(n, {
        detail: { ...l, value: a.target.value, name: d }
      })) : t === "command" && o && window.dispatchEvent(new CustomEvent("command:execute", {
        detail: { command: o, payload: { ...l, value: a.target.value, name: d } }
      }));
    }
  }, E = (a) => {
    if (e != null && e.focus) {
      const { type: t, event: n, command: o, payload: l } = e.focus;
      t === "emit" && n ? window.dispatchEvent(new CustomEvent(n, {
        detail: { ...l, value: a.target.value, name: d }
      })) : t === "command" && o && window.dispatchEvent(new CustomEvent("command:execute", {
        detail: { command: o, payload: { ...l, value: a.target.value, name: d } }
      }));
    }
  };
  return /* @__PURE__ */ g.jsx(
    x,
    {
      placeholder: c,
      value: i,
      defaultValue: v,
      disabled: r,
      readOnly: p,
      required: s,
      rows: w,
      name: d,
      onChange: h,
      onBlur: y,
      onFocus: E,
      className: C(f),
      "aria-required": s
    }
  );
}
export {
  N as TextareaComponent
};
