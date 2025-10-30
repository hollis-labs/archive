import { j as t, d as $, a as I, I as B, b as _, u as O, R as L, P, c as N, _ as U } from "./index-DAEtv2Sl.js";
import * as x from "react";
import i, { useState as q } from "react";
import { a as H, t as J } from "./toggle-RKXm9LyS.js";
var v = "ToggleGroup", [R] = $(v, [
  I
]), w = I(), h = i.forwardRef((e, a) => {
  const { type: o, ...r } = e;
  if (o === "single") {
    const s = r;
    return /* @__PURE__ */ t.jsx(K, { ...s, ref: a });
  }
  if (o === "multiple") {
    const s = r;
    return /* @__PURE__ */ t.jsx(Q, { ...s, ref: a });
  }
  throw new Error(`Missing prop \`type\` expected on \`${v}\``);
});
h.displayName = v;
var [b, V] = R(v), K = i.forwardRef((e, a) => {
  const {
    value: o,
    defaultValue: r,
    onValueChange: s = () => {
    },
    ...l
  } = e, [n, u] = _({
    prop: o,
    defaultProp: r ?? "",
    onChange: s,
    caller: v
  });
  return /* @__PURE__ */ t.jsx(
    b,
    {
      scope: e.__scopeToggleGroup,
      type: "single",
      value: i.useMemo(() => n ? [n] : [], [n]),
      onItemActivate: u,
      onItemDeactivate: i.useCallback(() => u(""), [u]),
      children: /* @__PURE__ */ t.jsx(E, { ...l, ref: a })
    }
  );
}), Q = i.forwardRef((e, a) => {
  const {
    value: o,
    defaultValue: r,
    onValueChange: s = () => {
    },
    ...l
  } = e, [n, u] = _({
    prop: o,
    defaultProp: r ?? [],
    onChange: s,
    caller: v
  }), p = i.useCallback(
    (g) => u((d = []) => [...d, g]),
    [u]
  ), m = i.useCallback(
    (g) => u((d = []) => d.filter((c) => c !== g)),
    [u]
  );
  return /* @__PURE__ */ t.jsx(
    b,
    {
      scope: e.__scopeToggleGroup,
      type: "multiple",
      value: n,
      onItemActivate: p,
      onItemDeactivate: m,
      children: /* @__PURE__ */ t.jsx(E, { ...l, ref: a })
    }
  );
});
h.displayName = v;
var [W, X] = R(v), E = i.forwardRef(
  (e, a) => {
    const {
      __scopeToggleGroup: o,
      disabled: r = !1,
      rovingFocus: s = !0,
      orientation: l,
      dir: n,
      loop: u = !0,
      ...p
    } = e, m = w(o), g = O(n), d = { role: "group", dir: g, ...p };
    return /* @__PURE__ */ t.jsx(W, { scope: o, rovingFocus: s, disabled: r, children: s ? /* @__PURE__ */ t.jsx(
      L,
      {
        asChild: !0,
        ...m,
        orientation: l,
        dir: g,
        loop: u,
        children: /* @__PURE__ */ t.jsx(P.div, { ...d, ref: a })
      }
    ) : /* @__PURE__ */ t.jsx(P.div, { ...d, ref: a }) });
  }
), G = "ToggleGroupItem", S = i.forwardRef(
  (e, a) => {
    const o = V(G, e.__scopeToggleGroup), r = X(G, e.__scopeToggleGroup), s = w(e.__scopeToggleGroup), l = o.value.includes(e.value), n = r.disabled || e.disabled, u = { ...e, pressed: l, disabled: n }, p = i.useRef(null);
    return r.rovingFocus ? /* @__PURE__ */ t.jsx(
      B,
      {
        asChild: !0,
        ...s,
        focusable: !n,
        active: l,
        ref: p,
        children: /* @__PURE__ */ t.jsx(y, { ...u, ref: a })
      }
    ) : /* @__PURE__ */ t.jsx(y, { ...u, ref: a });
  }
);
S.displayName = G;
var y = i.forwardRef(
  (e, a) => {
    const { __scopeToggleGroup: o, value: r, ...s } = e, l = V(G, o), n = { role: "radio", "aria-checked": e.pressed, "aria-pressed": void 0 }, u = l.type === "single" ? n : void 0;
    return /* @__PURE__ */ t.jsx(
      H,
      {
        ...u,
        ...s,
        ref: a,
        onPressedChange: (p) => {
          p ? l.onItemActivate(r) : l.onItemDeactivate(r);
        }
      }
    );
  }
), M = h, A = S;
const F = x.createContext({
  size: "default",
  variant: "default"
}), D = x.forwardRef(({ className: e, variant: a, size: o, children: r, ...s }, l) => /* @__PURE__ */ t.jsx(
  M,
  {
    ref: l,
    className: N("flex items-center justify-center gap-1", e),
    ...s,
    children: /* @__PURE__ */ t.jsx(F.Provider, { value: { variant: a, size: o }, children: r })
  }
));
D.displayName = M.displayName;
const k = x.forwardRef(({ className: e, children: a, variant: o, size: r, ...s }, l) => {
  const n = x.useContext(F);
  return /* @__PURE__ */ t.jsx(
    A,
    {
      ref: l,
      className: N(
        J({
          variant: n.variant || o,
          size: n.size || r
        }),
        e
      ),
      ...s,
      children: a
    }
  );
});
k.displayName = A.displayName;
function oe({ config: e }) {
  const { props: a, actions: o } = e, {
    type: r = "single",
    items: s = [],
    value: l,
    variant: n = "default",
    size: u = "default",
    className: p
  } = a || {}, [m, g] = q(l), d = (c) => {
    if (g(c), o != null && o.change) {
      const { type: f, command: T, event: C, payload: z } = o.change, j = { ...z, value: c };
      f === "command" && T ? window.dispatchEvent(new CustomEvent("command:execute", { detail: { command: T, payload: j } })) : f === "emit" && C && window.dispatchEvent(new CustomEvent(C, { detail: j }));
    }
  };
  return /* @__PURE__ */ t.jsx(
    D,
    {
      type: r,
      value: m,
      onValueChange: d,
      variant: n,
      size: u,
      className: p,
      children: s.map((c) => {
        const f = c.icon ? U[c.icon] : null;
        return /* @__PURE__ */ t.jsxs(k, { value: c.value, children: [
          f && /* @__PURE__ */ t.jsx(f, { className: "h-4 w-4" }),
          c.label && /* @__PURE__ */ t.jsx("span", { className: c.icon ? "ml-2" : "", children: c.label })
        ] }, c.value);
      })
    }
  );
}
export {
  oe as ToggleGroupComponent
};
