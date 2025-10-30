import { a as I, u as $, b as z, j as r, d as P, R as H, P as b, e as N, I as W, f as C, g as X, h as Y, i as J, c as x, k as Q, L as Z } from "./index-CZksa3Z0.js";
import * as p from "react";
var g = "Radio", [ee, _] = P(g), [oe, ae] = ee(g), G = p.forwardRef(
  (t, i) => {
    const {
      __scopeRadio: e,
      name: m,
      checked: a = !1,
      required: d,
      disabled: c,
      value: f = "on",
      onCheck: n,
      form: R,
      ...h
    } = t, [v, w] = p.useState(null), l = N(i, (u) => w(u)), o = p.useRef(!1), s = v ? R || !!v.closest("form") : !0;
    return /* @__PURE__ */ r.jsxs(oe, { scope: e, checked: a, disabled: c, children: [
      /* @__PURE__ */ r.jsx(
        b.button,
        {
          type: "button",
          role: "radio",
          "aria-checked": a,
          "data-state": D(a),
          "data-disabled": c ? "" : void 0,
          disabled: c,
          value: f,
          ...h,
          ref: l,
          onClick: C(t.onClick, (u) => {
            a || n == null || n(), s && (o.current = u.isPropagationStopped(), o.current || u.stopPropagation());
          })
        }
      ),
      s && /* @__PURE__ */ r.jsx(
        A,
        {
          control: v,
          bubbles: !o.current,
          name: m,
          value: f,
          checked: a,
          required: d,
          disabled: c,
          form: R,
          style: { transform: "translateX(-100%)" }
        }
      )
    ] });
  }
);
G.displayName = g;
var k = "RadioIndicator", S = p.forwardRef(
  (t, i) => {
    const { __scopeRadio: e, forceMount: m, ...a } = t, d = ae(k, e);
    return /* @__PURE__ */ r.jsx(X, { present: m || d.checked, children: /* @__PURE__ */ r.jsx(
      b.span,
      {
        "data-state": D(d.checked),
        "data-disabled": d.disabled ? "" : void 0,
        ...a,
        ref: i
      }
    ) });
  }
);
S.displayName = k;
var te = "RadioBubbleInput", A = p.forwardRef(
  ({
    __scopeRadio: t,
    control: i,
    checked: e,
    bubbles: m = !0,
    ...a
  }, d) => {
    const c = p.useRef(null), f = N(c, d), n = Y(e), R = J(i);
    return p.useEffect(() => {
      const h = c.current;
      if (!h) return;
      const v = window.HTMLInputElement.prototype, l = Object.getOwnPropertyDescriptor(
        v,
        "checked"
      ).set;
      if (n !== e && l) {
        const o = new Event("click", { bubbles: m });
        l.call(h, e), h.dispatchEvent(o);
      }
    }, [n, e, m]), /* @__PURE__ */ r.jsx(
      b.input,
      {
        type: "radio",
        "aria-hidden": !0,
        defaultChecked: e,
        ...a,
        tabIndex: -1,
        ref: f,
        style: {
          ...a.style,
          ...R,
          position: "absolute",
          pointerEvents: "none",
          opacity: 0,
          margin: 0
        }
      }
    );
  }
);
A.displayName = te;
function D(t) {
  return t ? "checked" : "unchecked";
}
var re = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"], E = "RadioGroup", [ne] = P(E, [
  I,
  _
]), F = I(), L = _(), [se, ie] = ne(E), M = p.forwardRef(
  (t, i) => {
    const {
      __scopeRadioGroup: e,
      name: m,
      defaultValue: a,
      value: d,
      required: c = !1,
      disabled: f = !1,
      orientation: n,
      dir: R,
      loop: h = !0,
      onValueChange: v,
      ...w
    } = t, l = F(e), o = $(R), [s, u] = z({
      prop: d,
      defaultProp: a ?? null,
      onChange: v,
      caller: E
    });
    return /* @__PURE__ */ r.jsx(
      se,
      {
        scope: e,
        name: m,
        required: c,
        disabled: f,
        value: s,
        onValueChange: u,
        children: /* @__PURE__ */ r.jsx(
          H,
          {
            asChild: !0,
            ...l,
            orientation: n,
            dir: o,
            loop: h,
            children: /* @__PURE__ */ r.jsx(
              b.div,
              {
                role: "radiogroup",
                "aria-required": c,
                "aria-orientation": n,
                "data-disabled": f ? "" : void 0,
                dir: o,
                ...w,
                ref: i
              }
            )
          }
        )
      }
    );
  }
);
M.displayName = E;
var q = "RadioGroupItem", B = p.forwardRef(
  (t, i) => {
    const { __scopeRadioGroup: e, disabled: m, ...a } = t, d = ie(q, e), c = d.disabled || m, f = F(e), n = L(e), R = p.useRef(null), h = N(i, R), v = d.value === a.value, w = p.useRef(!1);
    return p.useEffect(() => {
      const l = (s) => {
        re.includes(s.key) && (w.current = !0);
      }, o = () => w.current = !1;
      return document.addEventListener("keydown", l), document.addEventListener("keyup", o), () => {
        document.removeEventListener("keydown", l), document.removeEventListener("keyup", o);
      };
    }, []), /* @__PURE__ */ r.jsx(
      W,
      {
        asChild: !0,
        ...f,
        focusable: !c,
        active: v,
        children: /* @__PURE__ */ r.jsx(
          G,
          {
            disabled: c,
            required: d.required,
            checked: v,
            ...n,
            ...a,
            name: d.name,
            ref: h,
            onCheck: () => d.onValueChange(a.value),
            onKeyDown: C((l) => {
              l.key === "Enter" && l.preventDefault();
            }),
            onFocus: C(a.onFocus, () => {
              var l;
              w.current && ((l = R.current) == null || l.click());
            })
          }
        )
      }
    );
  }
);
B.displayName = q;
var de = "RadioGroupIndicator", O = p.forwardRef(
  (t, i) => {
    const { __scopeRadioGroup: e, ...m } = t, a = L(e);
    return /* @__PURE__ */ r.jsx(S, { ...a, ...m, ref: i });
  }
);
O.displayName = de;
var T = M, V = B, ce = O;
const K = p.forwardRef(({ className: t, ...i }, e) => /* @__PURE__ */ r.jsx(
  T,
  {
    className: x("grid gap-2", t),
    ...i,
    ref: e
  }
));
K.displayName = T.displayName;
const U = p.forwardRef(({ className: t, ...i }, e) => /* @__PURE__ */ r.jsx(
  V,
  {
    ref: e,
    className: x(
      "aspect-square h-4 w-4 rounded-full border border-primary text-primary shadow focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
      t
    ),
    ...i,
    children: /* @__PURE__ */ r.jsx(ce, { className: "flex items-center justify-center", children: /* @__PURE__ */ r.jsx(Q, { className: "h-2.5 w-2.5 fill-current text-current" }) })
  }
));
U.displayName = V.displayName;
function ue({ config: t }) {
  const { props: i, actions: e } = t, {
    options: m = [],
    value: a,
    defaultValue: d,
    disabled: c = !1,
    required: f = !1,
    name: n,
    orientation: R = "vertical",
    className: h
  } = i || {}, v = (o) => {
    if (e != null && e.change) {
      const { type: s, event: u, command: y, payload: j } = e.change;
      s === "emit" && u ? window.dispatchEvent(new CustomEvent(u, {
        detail: { ...j, value: o, name: n }
      })) : s === "command" && y && window.dispatchEvent(new CustomEvent("command:execute", {
        detail: { command: y, payload: { ...j, value: o, name: n } }
      }));
    }
  }, w = () => {
    if (e != null && e.focus) {
      const { type: o, event: s, command: u, payload: y } = e.focus;
      o === "emit" && s ? window.dispatchEvent(new CustomEvent(s, { detail: { ...y, name: n } })) : o === "command" && u && window.dispatchEvent(new CustomEvent("command:execute", {
        detail: { command: u, payload: { ...y, name: n } }
      }));
    }
  }, l = () => {
    if (e != null && e.blur) {
      const { type: o, event: s, command: u, payload: y } = e.blur;
      o === "emit" && s ? window.dispatchEvent(new CustomEvent(s, { detail: { ...y, name: n } })) : o === "command" && u && window.dispatchEvent(new CustomEvent("command:execute", {
        detail: { command: u, payload: { ...y, name: n } }
      }));
    }
  };
  return /* @__PURE__ */ r.jsx(
    K,
    {
      value: a,
      defaultValue: d,
      disabled: c,
      required: f,
      name: n,
      onValueChange: v,
      onFocus: w,
      onBlur: l,
      className: x(
        R === "horizontal" && "flex flex-row space-x-4",
        h
      ),
      "aria-required": f,
      children: m.map((o) => {
        const s = `${t.id}-${o.value}`;
        return /* @__PURE__ */ r.jsxs("div", { className: "flex items-center space-x-2", children: [
          /* @__PURE__ */ r.jsx(
            U,
            {
              value: o.value,
              id: s,
              disabled: c || o.disabled
            }
          ),
          /* @__PURE__ */ r.jsx(
            Z,
            {
              htmlFor: s,
              className: x(
                "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                (c || o.disabled) && "opacity-50 cursor-not-allowed"
              ),
              children: o.label
            }
          )
        ] }, o.value);
      })
    }
  );
}
export {
  ue as RadioGroupComponent
};
