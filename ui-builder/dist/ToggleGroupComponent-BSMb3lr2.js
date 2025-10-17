import { V as i, j as t, w as $, v as y, t as B, P, r as x, c as _ } from "./badge-DBvLZUPk.js";
import { c as N, I as O, R as L } from "./index-jhnCDxae.js";
import { a as U, t as q } from "./toggle-DwznC1fQ.js";
import { I as H } from "./lucide-react-CpYArdkX.js";
var v = "ToggleGroup", [w] = $(v, [
  N
]), R = N(), h = i.forwardRef((e, a) => {
  const { type: o, ...r } = e;
  if (o === "single") {
    const s = r;
    return /* @__PURE__ */ t.jsx(J, { ...s, ref: a });
  }
  if (o === "multiple") {
    const s = r;
    return /* @__PURE__ */ t.jsx(K, { ...s, ref: a });
  }
  throw new Error(`Missing prop \`type\` expected on \`${v}\``);
});
h.displayName = v;
var [V, b] = w(v), J = i.forwardRef((e, a) => {
  const {
    value: o,
    defaultValue: r,
    onValueChange: s = () => {
    },
    ...l
  } = e, [n, c] = y({
    prop: o,
    defaultProp: r ?? "",
    onChange: s,
    caller: v
  });
  return /* @__PURE__ */ t.jsx(
    V,
    {
      scope: e.__scopeToggleGroup,
      type: "single",
      value: i.useMemo(() => n ? [n] : [], [n]),
      onItemActivate: c,
      onItemDeactivate: i.useCallback(() => c(""), [c]),
      children: /* @__PURE__ */ t.jsx(E, { ...l, ref: a })
    }
  );
}), K = i.forwardRef((e, a) => {
  const {
    value: o,
    defaultValue: r,
    onValueChange: s = () => {
    },
    ...l
  } = e, [n, c] = y({
    prop: o,
    defaultProp: r ?? [],
    onChange: s,
    caller: v
  }), p = i.useCallback(
    (g) => c((d = []) => [...d, g]),
    [c]
  ), m = i.useCallback(
    (g) => c((d = []) => d.filter((u) => u !== g)),
    [c]
  );
  return /* @__PURE__ */ t.jsx(
    V,
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
var [Q, W] = w(v), E = i.forwardRef(
  (e, a) => {
    const {
      __scopeToggleGroup: o,
      disabled: r = !1,
      rovingFocus: s = !0,
      orientation: l,
      dir: n,
      loop: c = !0,
      ...p
    } = e, m = R(o), g = B(n), d = { role: "group", dir: g, ...p };
    return /* @__PURE__ */ t.jsx(Q, { scope: o, rovingFocus: s, disabled: r, children: s ? /* @__PURE__ */ t.jsx(
      L,
      {
        asChild: !0,
        ...m,
        orientation: l,
        dir: g,
        loop: c,
        children: /* @__PURE__ */ t.jsx(P.div, { ...d, ref: a })
      }
    ) : /* @__PURE__ */ t.jsx(P.div, { ...d, ref: a }) });
  }
), G = "ToggleGroupItem", S = i.forwardRef(
  (e, a) => {
    const o = b(G, e.__scopeToggleGroup), r = W(G, e.__scopeToggleGroup), s = R(e.__scopeToggleGroup), l = o.value.includes(e.value), n = r.disabled || e.disabled, c = { ...e, pressed: l, disabled: n }, p = i.useRef(null);
    return r.rovingFocus ? /* @__PURE__ */ t.jsx(
      O,
      {
        asChild: !0,
        ...s,
        focusable: !n,
        active: l,
        ref: p,
        children: /* @__PURE__ */ t.jsx(I, { ...c, ref: a })
      }
    ) : /* @__PURE__ */ t.jsx(I, { ...c, ref: a });
  }
);
S.displayName = G;
var I = i.forwardRef(
  (e, a) => {
    const { __scopeToggleGroup: o, value: r, ...s } = e, l = b(G, o), n = { role: "radio", "aria-checked": e.pressed, "aria-pressed": void 0 }, c = l.type === "single" ? n : void 0;
    return /* @__PURE__ */ t.jsx(
      U,
      {
        ...c,
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
    className: _("flex items-center justify-center gap-1", e),
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
      className: _(
        q({
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
    size: c = "default",
    className: p
  } = a || {}, [m, g] = x.useState(l), d = (u) => {
    if (g(u), o != null && o.change) {
      const { type: f, command: T, event: C, payload: z } = o.change, j = { ...z, value: u };
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
      size: c,
      className: p,
      children: s.map((u) => {
        const f = u.icon ? H[u.icon] : null;
        return /* @__PURE__ */ t.jsxs(k, { value: u.value, children: [
          f && /* @__PURE__ */ t.jsx(f, { className: "h-4 w-4" }),
          u.label && /* @__PURE__ */ t.jsx("span", { className: u.icon ? "ml-2" : "", children: u.label })
        ] }, u.value);
      })
    }
  );
}
export {
  oe as ToggleGroupComponent
};
