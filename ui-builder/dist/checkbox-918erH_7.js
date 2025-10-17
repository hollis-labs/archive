import { r as d, j as n, w as z, z as H, P as _, v as G, x as S, y as w, C as K, E as U, c as N, a3 as X } from "./badge-DBvLZUPk.js";
var g = "Checkbox", [$] = z(g), [J, P] = $(g);
function Q(t) {
  const {
    __scopeCheckbox: s,
    checked: r,
    children: l,
    defaultChecked: c,
    disabled: e,
    form: p,
    name: h,
    onCheckedChange: i,
    required: k,
    value: C = "on",
    // @ts-expect-error
    internal_do_not_use_render: u
  } = t, [f, v] = G({
    prop: r,
    defaultProp: c ?? !1,
    onChange: i,
    caller: g
  }), [m, x] = d.useState(null), [y, o] = d.useState(null), a = d.useRef(!1), E = m ? !!p || !!m.closest("form") : (
    // We set this to true by default so that events bubble to forms without JS (SSR)
    !0
  ), R = {
    checked: f,
    disabled: e,
    setChecked: v,
    control: m,
    setControl: x,
    name: h,
    form: p,
    value: C,
    hasConsumerStoppedPropagationRef: a,
    required: k,
    defaultChecked: b(c) ? !1 : c,
    isFormControl: E,
    bubbleInput: y,
    setBubbleInput: o
  };
  return /* @__PURE__ */ n.jsx(
    J,
    {
      scope: s,
      ...R,
      children: V(u) ? u(R) : l
    }
  );
}
var B = "CheckboxTrigger", M = d.forwardRef(
  ({ __scopeCheckbox: t, onKeyDown: s, onClick: r, ...l }, c) => {
    const {
      control: e,
      value: p,
      disabled: h,
      checked: i,
      required: k,
      setControl: C,
      setChecked: u,
      hasConsumerStoppedPropagationRef: f,
      isFormControl: v,
      bubbleInput: m
    } = P(B, t), x = S(c, C), y = d.useRef(i);
    return d.useEffect(() => {
      const o = e == null ? void 0 : e.form;
      if (o) {
        const a = () => u(y.current);
        return o.addEventListener("reset", a), () => o.removeEventListener("reset", a);
      }
    }, [e, u]), /* @__PURE__ */ n.jsx(
      _.button,
      {
        type: "button",
        role: "checkbox",
        "aria-checked": b(i) ? "mixed" : i,
        "aria-required": k,
        "data-state": F(i),
        "data-disabled": h ? "" : void 0,
        disabled: h,
        value: p,
        ...l,
        ref: x,
        onKeyDown: w(s, (o) => {
          o.key === "Enter" && o.preventDefault();
        }),
        onClick: w(r, (o) => {
          u((a) => b(a) ? !0 : !a), m && v && (f.current = o.isPropagationStopped(), f.current || o.stopPropagation());
        })
      }
    );
  }
);
M.displayName = B;
var I = d.forwardRef(
  (t, s) => {
    const {
      __scopeCheckbox: r,
      name: l,
      checked: c,
      defaultChecked: e,
      required: p,
      disabled: h,
      value: i,
      onCheckedChange: k,
      form: C,
      ...u
    } = t;
    return /* @__PURE__ */ n.jsx(
      Q,
      {
        __scopeCheckbox: r,
        checked: c,
        defaultChecked: e,
        disabled: h,
        required: p,
        onCheckedChange: k,
        name: l,
        form: C,
        value: i,
        internal_do_not_use_render: ({ isFormControl: f }) => /* @__PURE__ */ n.jsxs(n.Fragment, { children: [
          /* @__PURE__ */ n.jsx(
            M,
            {
              ...u,
              ref: s,
              __scopeCheckbox: r
            }
          ),
          f && /* @__PURE__ */ n.jsx(
            D,
            {
              __scopeCheckbox: r
            }
          )
        ] })
      }
    );
  }
);
I.displayName = g;
var T = "CheckboxIndicator", q = d.forwardRef(
  (t, s) => {
    const { __scopeCheckbox: r, forceMount: l, ...c } = t, e = P(T, r);
    return /* @__PURE__ */ n.jsx(
      H,
      {
        present: l || b(e.checked) || e.checked === !0,
        children: /* @__PURE__ */ n.jsx(
          _.span,
          {
            "data-state": F(e.checked),
            "data-disabled": e.disabled ? "" : void 0,
            ...c,
            ref: s,
            style: { pointerEvents: "none", ...t.style }
          }
        )
      }
    );
  }
);
q.displayName = T;
var A = "CheckboxBubbleInput", D = d.forwardRef(
  ({ __scopeCheckbox: t, ...s }, r) => {
    const {
      control: l,
      hasConsumerStoppedPropagationRef: c,
      checked: e,
      defaultChecked: p,
      required: h,
      disabled: i,
      name: k,
      value: C,
      form: u,
      bubbleInput: f,
      setBubbleInput: v
    } = P(A, t), m = S(r, v), x = K(e), y = U(l);
    d.useEffect(() => {
      const a = f;
      if (!a) return;
      const E = window.HTMLInputElement.prototype, j = Object.getOwnPropertyDescriptor(
        E,
        "checked"
      ).set, L = !c.current;
      if (x !== e && j) {
        const O = new Event("click", { bubbles: L });
        a.indeterminate = b(e), j.call(a, b(e) ? !1 : e), a.dispatchEvent(O);
      }
    }, [f, x, e, c]);
    const o = d.useRef(b(e) ? !1 : e);
    return /* @__PURE__ */ n.jsx(
      _.input,
      {
        type: "checkbox",
        "aria-hidden": !0,
        defaultChecked: p ?? o.current,
        required: h,
        disabled: i,
        name: k,
        value: C,
        form: u,
        ...s,
        tabIndex: -1,
        ref: m,
        style: {
          ...s.style,
          ...y,
          position: "absolute",
          pointerEvents: "none",
          opacity: 0,
          margin: 0,
          // We transform because the input is absolutely positioned but we have
          // rendered it **after** the button. This pulls it back to sit on top
          // of the button.
          transform: "translateX(-100%)"
        }
      }
    );
  }
);
D.displayName = A;
function V(t) {
  return typeof t == "function";
}
function b(t) {
  return t === "indeterminate";
}
function F(t) {
  return b(t) ? "indeterminate" : t ? "checked" : "unchecked";
}
const W = d.forwardRef(({ className: t, ...s }, r) => /* @__PURE__ */ n.jsx(
  I,
  {
    ref: r,
    className: N(
      "peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      t
    ),
    ...s,
    children: /* @__PURE__ */ n.jsx(
      q,
      {
        className: N("flex items-center justify-center text-current"),
        children: /* @__PURE__ */ n.jsx(X, { className: "h-4 w-4" })
      }
    )
  }
));
W.displayName = I.displayName;
export {
  W as C
};
