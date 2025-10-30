import { u as D, b as k, j as o, d as G, E as L, P as p, a as h, R as K, I as B, f as x, g as q, c as b, r as z } from "./index-CZksa3Z0.js";
import * as u from "react";
import H from "react";
var g = "Tabs", [O] = G(g, [
  h
]), N = h(), [J, T] = O(g), y = u.forwardRef(
  (e, t) => {
    const {
      __scopeTabs: n,
      value: s,
      onValueChange: r,
      defaultValue: c,
      orientation: a = "horizontal",
      dir: l,
      activationMode: v = "automatic",
      ...m
    } = e, d = D(l), [i, f] = k({
      prop: s,
      onChange: r,
      defaultProp: c ?? "",
      caller: g
    });
    return /* @__PURE__ */ o.jsx(
      J,
      {
        scope: n,
        baseId: L(),
        value: i,
        onValueChange: f,
        orientation: a,
        dir: d,
        activationMode: v,
        children: /* @__PURE__ */ o.jsx(
          p.div,
          {
            dir: d,
            "data-orientation": a,
            ...m,
            ref: t
          }
        )
      }
    );
  }
);
y.displayName = g;
var C = "TabsList", j = u.forwardRef(
  (e, t) => {
    const { __scopeTabs: n, loop: s = !0, ...r } = e, c = T(C, n), a = N(n);
    return /* @__PURE__ */ o.jsx(
      K,
      {
        asChild: !0,
        ...a,
        orientation: c.orientation,
        dir: c.dir,
        loop: s,
        children: /* @__PURE__ */ o.jsx(
          p.div,
          {
            role: "tablist",
            "aria-orientation": c.orientation,
            ...r,
            ref: t
          }
        )
      }
    );
  }
);
j.displayName = C;
var R = "TabsTrigger", I = u.forwardRef(
  (e, t) => {
    const { __scopeTabs: n, value: s, disabled: r = !1, ...c } = e, a = T(R, n), l = N(n), v = A(a.baseId, s), m = E(a.baseId, s), d = s === a.value;
    return /* @__PURE__ */ o.jsx(
      B,
      {
        asChild: !0,
        ...l,
        focusable: !r,
        active: d,
        children: /* @__PURE__ */ o.jsx(
          p.button,
          {
            type: "button",
            role: "tab",
            "aria-selected": d,
            "aria-controls": m,
            "data-state": d ? "active" : "inactive",
            "data-disabled": r ? "" : void 0,
            disabled: r,
            id: v,
            ...c,
            ref: t,
            onMouseDown: x(e.onMouseDown, (i) => {
              !r && i.button === 0 && i.ctrlKey === !1 ? a.onValueChange(s) : i.preventDefault();
            }),
            onKeyDown: x(e.onKeyDown, (i) => {
              [" ", "Enter"].includes(i.key) && a.onValueChange(s);
            }),
            onFocus: x(e.onFocus, () => {
              const i = a.activationMode !== "manual";
              !d && !r && i && a.onValueChange(s);
            })
          }
        )
      }
    );
  }
);
I.displayName = R;
var _ = "TabsContent", w = u.forwardRef(
  (e, t) => {
    const { __scopeTabs: n, value: s, forceMount: r, children: c, ...a } = e, l = T(_, n), v = A(l.baseId, s), m = E(l.baseId, s), d = s === l.value, i = u.useRef(d);
    return u.useEffect(() => {
      const f = requestAnimationFrame(() => i.current = !1);
      return () => cancelAnimationFrame(f);
    }, []), /* @__PURE__ */ o.jsx(q, { present: r || d, children: ({ present: f }) => /* @__PURE__ */ o.jsx(
      p.div,
      {
        "data-state": d ? "active" : "inactive",
        "data-orientation": l.orientation,
        role: "tabpanel",
        "aria-labelledby": v,
        hidden: !f,
        id: m,
        tabIndex: 0,
        ...a,
        ref: t,
        style: {
          ...e.style,
          animationDuration: i.current ? "0s" : void 0
        },
        children: f && c
      }
    ) });
  }
);
w.displayName = _;
function A(e, t) {
  return `${e}-trigger-${t}`;
}
function E(e, t) {
  return `${e}-content-${t}`;
}
var Q = y, P = j, F = I, M = w;
const U = Q, S = u.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ o.jsx(
  P,
  {
    ref: n,
    className: b(
      "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
      e
    ),
    ...t
  }
));
S.displayName = P.displayName;
const V = u.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ o.jsx(
  F,
  {
    ref: n,
    className: b(
      "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
      e
    ),
    ...t
  }
));
V.displayName = F.displayName;
const $ = u.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ o.jsx(
  M,
  {
    ref: n,
    className: b(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      e
    ),
    ...t
  }
));
$.displayName = M.displayName;
function Y({ config: e }) {
  const { props: t } = e, { defaultValue: n, tabs: s, className: r, listClassName: c } = t;
  return /* @__PURE__ */ o.jsxs(U, { defaultValue: n, className: b(r), children: [
    /* @__PURE__ */ o.jsx(S, { className: b(c), children: s.map((a) => /* @__PURE__ */ o.jsx(
      V,
      {
        value: a.value,
        disabled: a.disabled,
        children: a.label
      },
      a.value
    )) }),
    s.map((a) => /* @__PURE__ */ o.jsx($, { value: a.value, children: a.content.map((l) => /* @__PURE__ */ o.jsx(H.Fragment, { children: z(l) }, l.id)) }, a.value))
  ] });
}
export {
  Y as TabsComponent
};
