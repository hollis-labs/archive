import { j as s, S as x, n as C, c as g, o as j, p as S, q as b } from "./index-BnHp2Mvr.js";
function T({ config: i }) {
  const { props: m, actions: a } = i, {
    options: u = [],
    placeholder: p,
    value: v,
    defaultValue: r,
    disabled: h = !1,
    required: c = !1,
    name: d,
    className: f
  } = m || {}, w = (e) => {
    if (a != null && a.change) {
      const { type: n, event: t, command: l, payload: o } = a.change;
      n === "emit" && t ? window.dispatchEvent(new CustomEvent(t, {
        detail: { ...o, value: e, name: d }
      })) : n === "command" && l && window.dispatchEvent(new CustomEvent("command:execute", {
        detail: { command: l, payload: { ...o, value: e, name: d } }
      }));
    }
  }, E = () => {
    if (a != null && a.focus) {
      const { type: e, event: n, command: t, payload: l } = a.focus;
      e === "emit" && n ? window.dispatchEvent(new CustomEvent(n, { detail: { ...l, name: d } })) : e === "command" && t && window.dispatchEvent(new CustomEvent("command:execute", {
        detail: { command: t, payload: { ...l, name: d } }
      }));
    }
  }, y = () => {
    if (a != null && a.blur) {
      const { type: e, event: n, command: t, payload: l } = a.blur;
      e === "emit" && n ? window.dispatchEvent(new CustomEvent(n, { detail: { ...l, name: d } })) : e === "command" && t && window.dispatchEvent(new CustomEvent("command:execute", {
        detail: { command: t, payload: { ...l, name: d } }
      }));
    }
  };
  return /* @__PURE__ */ s.jsxs(
    x,
    {
      value: v,
      defaultValue: r,
      disabled: h,
      required: c,
      name: d,
      onValueChange: w,
      onOpenChange: (e) => {
        e ? E() : y();
      },
      children: [
        /* @__PURE__ */ s.jsx(C, { className: g(f), "aria-required": c, children: /* @__PURE__ */ s.jsx(j, { placeholder: p }) }),
        /* @__PURE__ */ s.jsx(S, { children: u.map((e) => /* @__PURE__ */ s.jsx(
          b,
          {
            value: e.value,
            disabled: e.disabled,
            children: e.label
          },
          e.value
        )) })
      ]
    }
  );
}
export {
  T as SelectComponent
};
