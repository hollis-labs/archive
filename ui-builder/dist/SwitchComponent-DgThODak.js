import { e as E, b as M, j as r, d as q, P as S, f as F, h as H, i as L, c as k, L as A } from "./index-BtLd6ySb.js";
import * as h from "react";
var g = "Switch", [U] = q(g), [z, O] = U(g), N = h.forwardRef(
  (a, d) => {
    const {
      __scopeSwitch: e,
      name: l,
      checked: u,
      defaultChecked: v,
      required: p,
      disabled: i,
      value: t = "on",
      onCheckedChange: b,
      form: m,
      ...x
    } = a, [w, f] = h.useState(null), o = E(d, (C) => f(C)), s = h.useRef(!1), c = w ? m || !!w.closest("form") : !0, [n, y] = M({
      prop: u,
      defaultProp: v ?? !1,
      onChange: b,
      caller: g
    });
    return /* @__PURE__ */ r.jsxs(z, { scope: e, checked: n, disabled: i, children: [
      /* @__PURE__ */ r.jsx(
        S.button,
        {
          type: "button",
          role: "switch",
          "aria-checked": n,
          "aria-required": p,
          "data-state": T(n),
          "data-disabled": i ? "" : void 0,
          disabled: i,
          value: t,
          ...x,
          ref: o,
          onClick: F(a.onClick, (C) => {
            y((I) => !I), c && (s.current = C.isPropagationStopped(), s.current || C.stopPropagation());
          })
        }
      ),
      c && /* @__PURE__ */ r.jsx(
        R,
        {
          control: w,
          bubbles: !s.current,
          name: l,
          value: t,
          checked: n,
          required: p,
          disabled: i,
          form: m,
          style: { transform: "translateX(-100%)" }
        }
      )
    ] });
  }
);
N.displayName = g;
var j = "SwitchThumb", P = h.forwardRef(
  (a, d) => {
    const { __scopeSwitch: e, ...l } = a, u = O(j, e);
    return /* @__PURE__ */ r.jsx(
      S.span,
      {
        "data-state": T(u.checked),
        "data-disabled": u.disabled ? "" : void 0,
        ...l,
        ref: d
      }
    );
  }
);
P.displayName = j;
var $ = "SwitchBubbleInput", R = h.forwardRef(
  ({
    __scopeSwitch: a,
    control: d,
    checked: e,
    bubbles: l = !0,
    ...u
  }, v) => {
    const p = h.useRef(null), i = E(p, v), t = H(e), b = L(d);
    return h.useEffect(() => {
      const m = p.current;
      if (!m) return;
      const x = window.HTMLInputElement.prototype, f = Object.getOwnPropertyDescriptor(
        x,
        "checked"
      ).set;
      if (t !== e && f) {
        const o = new Event("click", { bubbles: l });
        f.call(m, e), m.dispatchEvent(o);
      }
    }, [t, e, l]), /* @__PURE__ */ r.jsx(
      "input",
      {
        type: "checkbox",
        "aria-hidden": !0,
        defaultChecked: e,
        ...u,
        tabIndex: -1,
        ref: i,
        style: {
          ...u.style,
          ...b,
          position: "absolute",
          pointerEvents: "none",
          opacity: 0,
          margin: 0
        }
      }
    );
  }
);
R.displayName = $;
function T(a) {
  return a ? "checked" : "unchecked";
}
var _ = N, D = P;
const B = h.forwardRef(({ className: a, ...d }, e) => /* @__PURE__ */ r.jsx(
  _,
  {
    className: k(
      "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
      a
    ),
    ...d,
    ref: e,
    children: /* @__PURE__ */ r.jsx(
      D,
      {
        className: k(
          "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
        )
      }
    )
  }
));
B.displayName = _.displayName;
function X({ config: a }) {
  const { props: d = {}, actions: e } = a, {
    label: l,
    checked: u,
    defaultChecked: v,
    disabled: p = !1,
    required: i = !1,
    name: t,
    className: b
  } = d, m = (o) => {
    if (e != null && e.change) {
      const { type: s, event: c, command: n, payload: y } = e.change;
      s === "emit" && c ? window.dispatchEvent(new CustomEvent(c, {
        detail: { ...y, checked: o, name: t }
      })) : s === "command" && n && window.dispatchEvent(new CustomEvent("command:execute", {
        detail: { command: n, payload: { ...y, checked: o, name: t } }
      }));
    }
  }, x = () => {
    if (e != null && e.focus) {
      const { type: o, event: s, command: c, payload: n } = e.focus;
      o === "emit" && s ? window.dispatchEvent(new CustomEvent(s, { detail: { ...n, name: t } })) : o === "command" && c && window.dispatchEvent(new CustomEvent("command:execute", {
        detail: { command: c, payload: { ...n, name: t } }
      }));
    }
  }, w = () => {
    if (e != null && e.blur) {
      const { type: o, event: s, command: c, payload: n } = e.blur;
      o === "emit" && s ? window.dispatchEvent(new CustomEvent(s, { detail: { ...n, name: t } })) : o === "command" && c && window.dispatchEvent(new CustomEvent("command:execute", {
        detail: { command: c, payload: { ...n, name: t } }
      }));
    }
  }, f = `switch-${a.id}`;
  return /* @__PURE__ */ r.jsxs("div", { className: k("flex items-center space-x-2", b), children: [
    /* @__PURE__ */ r.jsx(
      B,
      {
        id: f,
        checked: u,
        defaultChecked: v,
        disabled: p,
        required: i,
        name: t,
        onCheckedChange: m,
        onFocus: x,
        onBlur: w,
        "aria-required": i
      }
    ),
    l && /* @__PURE__ */ r.jsxs(
      A,
      {
        htmlFor: f,
        className: k(
          "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
          p && "opacity-50 cursor-not-allowed"
        ),
        children: [
          l,
          i && /* @__PURE__ */ r.jsx("span", { className: "text-destructive ml-1", children: "*" })
        ]
      }
    )
  ] });
}
export {
  X as SwitchComponent
};
