import { aO as w, aq as se, j as a, d as ce, aP as de, aQ as ie, P as ue, f as C, aR as le, aS as xe, aT as pe, b as fe, aU as me, aV as he, aW as Ce, aX as ve, aY as Me, aZ as ge, a_ as be, a$ as Ne, b0 as ye, b1 as we, b2 as Re, c as p, G as je, aA as _e, k as Se, r as Pe, _ as Ie } from "./index-fsMg7Z1a.js";
import * as s from "react";
var y = "ContextMenu", [Ee] = ce(y, [
  w
]), i = w(), [Ae, R] = Ee(y), j = (e) => {
  const { __scopeContextMenu: t, children: o, onOpenChange: n, dir: r, modal: u = !0 } = e, [c, d] = s.useState(!1), x = i(t), m = se(n), l = s.useCallback(
    (h) => {
      d(h), m(h);
    },
    [m]
  );
  return /* @__PURE__ */ a.jsx(
    Ae,
    {
      scope: t,
      open: c,
      onOpenChange: l,
      modal: u,
      children: /* @__PURE__ */ a.jsx(
        de,
        {
          ...x,
          dir: r,
          open: c,
          onOpenChange: l,
          modal: u,
          children: o
        }
      )
    }
  );
};
j.displayName = y;
var _ = "ContextMenuTrigger", S = s.forwardRef(
  (e, t) => {
    const { __scopeContextMenu: o, disabled: n = !1, ...r } = e, u = R(_, o), c = i(o), d = s.useRef({ x: 0, y: 0 }), x = s.useRef({
      getBoundingClientRect: () => DOMRect.fromRect({ width: 0, height: 0, ...d.current })
    }), m = s.useRef(0), l = s.useCallback(
      () => window.clearTimeout(m.current),
      []
    ), h = (f) => {
      d.current = { x: f.clientX, y: f.clientY }, u.onOpenChange(!0);
    };
    return s.useEffect(() => l, [l]), s.useEffect(() => void (n && l()), [n, l]), /* @__PURE__ */ a.jsxs(a.Fragment, { children: [
      /* @__PURE__ */ a.jsx(ie, { ...c, virtualRef: x }),
      /* @__PURE__ */ a.jsx(
        ue.span,
        {
          "data-state": u.open ? "open" : "closed",
          "data-disabled": n ? "" : void 0,
          ...r,
          ref: t,
          style: { WebkitTouchCallout: "none", ...e.style },
          onContextMenu: n ? e.onContextMenu : C(e.onContextMenu, (f) => {
            l(), h(f), f.preventDefault();
          }),
          onPointerDown: n ? e.onPointerDown : C(
            e.onPointerDown,
            v((f) => {
              l(), m.current = window.setTimeout(() => h(f), 700);
            })
          ),
          onPointerMove: n ? e.onPointerMove : C(e.onPointerMove, v(l)),
          onPointerCancel: n ? e.onPointerCancel : C(e.onPointerCancel, v(l)),
          onPointerUp: n ? e.onPointerUp : C(e.onPointerUp, v(l))
        }
      )
    ] });
  }
);
S.displayName = _;
var Oe = "ContextMenuPortal", P = (e) => {
  const { __scopeContextMenu: t, ...o } = e, n = i(t);
  return /* @__PURE__ */ a.jsx(xe, { ...n, ...o });
};
P.displayName = Oe;
var I = "ContextMenuContent", E = s.forwardRef(
  (e, t) => {
    const { __scopeContextMenu: o, ...n } = e, r = R(I, o), u = i(o), c = s.useRef(!1);
    return /* @__PURE__ */ a.jsx(
      pe,
      {
        ...u,
        ...n,
        ref: t,
        side: "right",
        sideOffset: 2,
        align: "start",
        onCloseAutoFocus: (d) => {
          var x;
          (x = e.onCloseAutoFocus) == null || x.call(e, d), !d.defaultPrevented && c.current && d.preventDefault(), c.current = !1;
        },
        onInteractOutside: (d) => {
          var x;
          (x = e.onInteractOutside) == null || x.call(e, d), !d.defaultPrevented && !r.modal && (c.current = !0);
        },
        style: {
          ...e.style,
          "--radix-context-menu-content-transform-origin": "var(--radix-popper-transform-origin)",
          "--radix-context-menu-content-available-width": "var(--radix-popper-available-width)",
          "--radix-context-menu-content-available-height": "var(--radix-popper-available-height)",
          "--radix-context-menu-trigger-width": "var(--radix-popper-anchor-width)",
          "--radix-context-menu-trigger-height": "var(--radix-popper-anchor-height)"
        }
      }
    );
  }
);
E.displayName = I;
var Te = "ContextMenuGroup", ke = s.forwardRef(
  (e, t) => {
    const { __scopeContextMenu: o, ...n } = e, r = i(o);
    return /* @__PURE__ */ a.jsx(we, { ...r, ...n, ref: t });
  }
);
ke.displayName = Te;
var Ge = "ContextMenuLabel", A = s.forwardRef(
  (e, t) => {
    const { __scopeContextMenu: o, ...n } = e, r = i(o);
    return /* @__PURE__ */ a.jsx(Ce, { ...r, ...n, ref: t });
  }
);
A.displayName = Ge;
var $e = "ContextMenuItem", O = s.forwardRef(
  (e, t) => {
    const { __scopeContextMenu: o, ...n } = e, r = i(o);
    return /* @__PURE__ */ a.jsx(ye, { ...r, ...n, ref: t });
  }
);
O.displayName = $e;
var De = "ContextMenuCheckboxItem", T = s.forwardRef((e, t) => {
  const { __scopeContextMenu: o, ...n } = e, r = i(o);
  return /* @__PURE__ */ a.jsx(ge, { ...r, ...n, ref: t });
});
T.displayName = De;
var Ue = "ContextMenuRadioGroup", k = s.forwardRef((e, t) => {
  const { __scopeContextMenu: o, ...n } = e, r = i(o);
  return /* @__PURE__ */ a.jsx(le, { ...r, ...n, ref: t });
});
k.displayName = Ue;
var Le = "ContextMenuRadioItem", G = s.forwardRef((e, t) => {
  const { __scopeContextMenu: o, ...n } = e, r = i(o);
  return /* @__PURE__ */ a.jsx(Ne, { ...r, ...n, ref: t });
});
G.displayName = Le;
var ze = "ContextMenuItemIndicator", $ = s.forwardRef((e, t) => {
  const { __scopeContextMenu: o, ...n } = e, r = i(o);
  return /* @__PURE__ */ a.jsx(be, { ...r, ...n, ref: t });
});
$.displayName = ze;
var Be = "ContextMenuSeparator", D = s.forwardRef((e, t) => {
  const { __scopeContextMenu: o, ...n } = e, r = i(o);
  return /* @__PURE__ */ a.jsx(he, { ...r, ...n, ref: t });
});
D.displayName = Be;
var Xe = "ContextMenuArrow", Fe = s.forwardRef(
  (e, t) => {
    const { __scopeContextMenu: o, ...n } = e, r = i(o);
    return /* @__PURE__ */ a.jsx(Re, { ...r, ...n, ref: t });
  }
);
Fe.displayName = Xe;
var U = "ContextMenuSub", L = (e) => {
  const { __scopeContextMenu: t, children: o, onOpenChange: n, open: r, defaultOpen: u } = e, c = i(t), [d, x] = fe({
    prop: r,
    defaultProp: u ?? !1,
    onChange: n,
    caller: U
  });
  return /* @__PURE__ */ a.jsx(me, { ...c, open: d, onOpenChange: x, children: o });
};
L.displayName = U;
var We = "ContextMenuSubTrigger", z = s.forwardRef((e, t) => {
  const { __scopeContextMenu: o, ...n } = e, r = i(o);
  return /* @__PURE__ */ a.jsx(ve, { ...r, ...n, ref: t });
});
z.displayName = We;
var He = "ContextMenuSubContent", B = s.forwardRef((e, t) => {
  const { __scopeContextMenu: o, ...n } = e, r = i(o);
  return /* @__PURE__ */ a.jsx(
    Me,
    {
      ...r,
      ...n,
      ref: t,
      style: {
        ...e.style,
        "--radix-context-menu-content-transform-origin": "var(--radix-popper-transform-origin)",
        "--radix-context-menu-content-available-width": "var(--radix-popper-available-width)",
        "--radix-context-menu-content-available-height": "var(--radix-popper-available-height)",
        "--radix-context-menu-trigger-width": "var(--radix-popper-anchor-width)",
        "--radix-context-menu-trigger-height": "var(--radix-popper-anchor-height)"
      }
    }
  );
});
B.displayName = He;
function v(e) {
  return (t) => t.pointerType !== "mouse" ? e(t) : void 0;
}
var Ye = j, qe = S, Je = P, X = E, F = A, W = O, H = T, Ke = k, Y = G, q = $, J = D, Qe = L, K = z, Q = B;
const Ve = Ye, Ze = qe, et = Qe, tt = Ke, V = s.forwardRef(({ className: e, inset: t, children: o, ...n }, r) => /* @__PURE__ */ a.jsxs(
  K,
  {
    ref: r,
    className: p(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
      t && "pl-8",
      e
    ),
    ...n,
    children: [
      o,
      /* @__PURE__ */ a.jsx(je, { className: "ml-auto h-4 w-4" })
    ]
  }
));
V.displayName = K.displayName;
const Z = s.forwardRef(({ className: e, ...t }, o) => /* @__PURE__ */ a.jsx(
  Q,
  {
    ref: o,
    className: p(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-context-menu-content-transform-origin]",
      e
    ),
    ...t
  }
));
Z.displayName = Q.displayName;
const ee = s.forwardRef(({ className: e, ...t }, o) => /* @__PURE__ */ a.jsx(Je, { children: /* @__PURE__ */ a.jsx(
  X,
  {
    ref: o,
    className: p(
      "z-50 max-h-[--radix-context-menu-content-available-height] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-context-menu-content-transform-origin]",
      e
    ),
    ...t
  }
) }));
ee.displayName = X.displayName;
const te = s.forwardRef(({ className: e, inset: t, ...o }, n) => /* @__PURE__ */ a.jsx(
  W,
  {
    ref: n,
    className: p(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      t && "pl-8",
      e
    ),
    ...o
  }
));
te.displayName = W.displayName;
const ne = s.forwardRef(({ className: e, children: t, checked: o, ...n }, r) => /* @__PURE__ */ a.jsxs(
  H,
  {
    ref: r,
    className: p(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      e
    ),
    checked: o,
    ...n,
    children: [
      /* @__PURE__ */ a.jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ a.jsx(q, { children: /* @__PURE__ */ a.jsx(_e, { className: "h-4 w-4" }) }) }),
      t
    ]
  }
));
ne.displayName = H.displayName;
const oe = s.forwardRef(({ className: e, children: t, ...o }, n) => /* @__PURE__ */ a.jsxs(
  Y,
  {
    ref: n,
    className: p(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      e
    ),
    ...o,
    children: [
      /* @__PURE__ */ a.jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ a.jsx(q, { children: /* @__PURE__ */ a.jsx(Se, { className: "h-4 w-4 fill-current" }) }) }),
      t
    ]
  }
));
oe.displayName = Y.displayName;
const ae = s.forwardRef(({ className: e, inset: t, ...o }, n) => /* @__PURE__ */ a.jsx(
  F,
  {
    ref: n,
    className: p(
      "px-2 py-1.5 text-sm font-semibold text-foreground",
      t && "pl-8",
      e
    ),
    ...o
  }
));
ae.displayName = F.displayName;
const re = s.forwardRef(({ className: e, ...t }, o) => /* @__PURE__ */ a.jsx(
  J,
  {
    ref: o,
    className: p("-mx-1 my-1 h-px bg-border", e),
    ...t
  }
));
re.displayName = J.displayName;
const g = ({
  className: e,
  ...t
}) => /* @__PURE__ */ a.jsx(
  "span",
  {
    className: p(
      "ml-auto text-xs tracking-widest text-muted-foreground",
      e
    ),
    ...t
  }
);
g.displayName = "ContextMenuShortcut";
function b(e) {
  if (!e) return;
  const { type: t, command: o, url: n, event: r, payload: u, method: c } = e;
  t === "command" && o ? window.dispatchEvent(new CustomEvent("command:execute", { detail: { command: o, payload: u } })) : t === "navigate" && n ? window.location.href = n : t === "emit" && r ? window.dispatchEvent(new CustomEvent(r, { detail: u })) : t === "http" && n && fetch(n, {
    method: c || "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(u)
  }).catch(console.error);
}
function M(e) {
  if (!e) return null;
  const t = Ie[e];
  return t ? /* @__PURE__ */ a.jsx(t, { className: "h-4 w-4" }) : null;
}
function N(e, t) {
  const o = `context-menu-item-${t}`;
  return e.type === "separator" ? /* @__PURE__ */ a.jsx(re, {}, o) : e.type === "label" ? /* @__PURE__ */ a.jsx(ae, { children: e.label }, o) : e.type === "submenu" && e.items ? /* @__PURE__ */ a.jsxs(et, { children: [
    /* @__PURE__ */ a.jsxs(V, { disabled: e.disabled, children: [
      M(e.icon),
      e.label
    ] }),
    /* @__PURE__ */ a.jsx(Z, { children: e.items.map((n, r) => N(n, r)) })
  ] }, o) : e.type === "checkbox" ? /* @__PURE__ */ a.jsxs(
    ne,
    {
      checked: e.checked,
      disabled: e.disabled,
      onSelect: (n) => {
        n.preventDefault(), b(e.action);
      },
      children: [
        M(e.icon),
        e.label,
        e.shortcut && /* @__PURE__ */ a.jsx(g, { children: e.shortcut })
      ]
    },
    o
  ) : e.type === "radio" ? /* @__PURE__ */ a.jsxs(
    oe,
    {
      value: e.value || e.label || "",
      disabled: e.disabled,
      onSelect: (n) => {
        n.preventDefault(), b(e.action);
      },
      children: [
        M(e.icon),
        e.label,
        e.shortcut && /* @__PURE__ */ a.jsx(g, { children: e.shortcut })
      ]
    },
    o
  ) : /* @__PURE__ */ a.jsxs(
    te,
    {
      disabled: e.disabled,
      onSelect: (n) => {
        n.preventDefault(), b(e.action);
      },
      children: [
        M(e.icon),
        e.label,
        e.shortcut && /* @__PURE__ */ a.jsx(g, { children: e.shortcut })
      ]
    },
    o
  );
}
function ot({ config: e }) {
  const { props: t, children: o = [] } = e, { items: n, className: r } = t, u = n.some((c) => c.type === "radio");
  return /* @__PURE__ */ a.jsxs(Ve, { children: [
    /* @__PURE__ */ a.jsx(Ze, { asChild: !0, children: /* @__PURE__ */ a.jsx("div", { children: o.map((c) => Pe(c)) }) }),
    /* @__PURE__ */ a.jsx(ee, { className: p(r), children: u ? /* @__PURE__ */ a.jsx(tt, { children: n.map((c, d) => N(c, d)) }) : n.map((c, d) => N(c, d)) })
  ] });
}
export {
  ot as ContextMenuComponent
};
