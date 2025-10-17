import { r as s, j as t, w as X, y as w, v as M, $ as v, P as q, a4 as J, c as l, a3 as Q } from "./badge-DBvLZUPk.js";
import { c as h, S as V, a as Y, P as Z, C as ee, I as oe, b as re, d as ne, R as ae, L as te, e as se, f as de, A as pe, g as ie, h as ce, G as ue, i as le } from "./index-BhCGDJyJ.js";
import { C as me } from "./chevron-right-BL2YneJZ.js";
import { C as fe } from "./circle-Be6zXIJA.js";
var g = "DropdownMenu", [we] = X(
  g,
  [h]
), i = h(), [ge, D] = we(g), b = (e) => {
  const {
    __scopeDropdownMenu: o,
    children: r,
    dir: n,
    open: a,
    defaultOpen: p,
    onOpenChange: u,
    modal: d = !0
  } = e, c = i(o), x = s.useRef(null), [m, f] = M({
    prop: a,
    defaultProp: p ?? !1,
    onChange: u,
    caller: g
  });
  return /* @__PURE__ */ t.jsx(
    ge,
    {
      scope: o,
      triggerId: v(),
      triggerRef: x,
      contentId: v(),
      open: m,
      onOpenChange: f,
      onOpenToggle: s.useCallback(() => f((W) => !W), [f]),
      modal: d,
      children: /* @__PURE__ */ t.jsx(de, { ...c, open: m, onOpenChange: f, dir: n, modal: d, children: r })
    }
  );
};
b.displayName = g;
var N = "DropdownMenuTrigger", y = s.forwardRef(
  (e, o) => {
    const { __scopeDropdownMenu: r, disabled: n = !1, ...a } = e, p = D(N, r), u = i(r);
    return /* @__PURE__ */ t.jsx(pe, { asChild: !0, ...u, children: /* @__PURE__ */ t.jsx(
      q.button,
      {
        type: "button",
        id: p.triggerId,
        "aria-haspopup": "menu",
        "aria-expanded": p.open,
        "aria-controls": p.open ? p.contentId : void 0,
        "data-state": p.open ? "open" : "closed",
        "data-disabled": n ? "" : void 0,
        disabled: n,
        ...a,
        ref: J(o, p.triggerRef),
        onPointerDown: w(e.onPointerDown, (d) => {
          !n && d.button === 0 && d.ctrlKey === !1 && (p.onOpenToggle(), p.open || d.preventDefault());
        }),
        onKeyDown: w(e.onKeyDown, (d) => {
          n || (["Enter", " "].includes(d.key) && p.onOpenToggle(), d.key === "ArrowDown" && p.onOpenChange(!0), ["Enter", " ", "ArrowDown"].includes(d.key) && d.preventDefault());
        })
      }
    ) });
  }
);
y.displayName = N;
var xe = "DropdownMenuPortal", R = (e) => {
  const { __scopeDropdownMenu: o, ...r } = e, n = i(o);
  return /* @__PURE__ */ t.jsx(Z, { ...n, ...r });
};
R.displayName = xe;
var _ = "DropdownMenuContent", I = s.forwardRef(
  (e, o) => {
    const { __scopeDropdownMenu: r, ...n } = e, a = D(_, r), p = i(r), u = s.useRef(!1);
    return /* @__PURE__ */ t.jsx(
      ee,
      {
        id: a.contentId,
        "aria-labelledby": a.triggerId,
        ...p,
        ...n,
        ref: o,
        onCloseAutoFocus: w(e.onCloseAutoFocus, (d) => {
          var c;
          u.current || (c = a.triggerRef.current) == null || c.focus(), u.current = !1, d.preventDefault();
        }),
        onInteractOutside: w(e.onInteractOutside, (d) => {
          const c = d.detail.originalEvent, x = c.button === 0 && c.ctrlKey === !0, m = c.button === 2 || x;
          (!a.modal || m) && (u.current = !0);
        }),
        style: {
          ...e.style,
          "--radix-dropdown-menu-content-transform-origin": "var(--radix-popper-transform-origin)",
          "--radix-dropdown-menu-content-available-width": "var(--radix-popper-available-width)",
          "--radix-dropdown-menu-content-available-height": "var(--radix-popper-available-height)",
          "--radix-dropdown-menu-trigger-width": "var(--radix-popper-anchor-width)",
          "--radix-dropdown-menu-trigger-height": "var(--radix-popper-anchor-height)"
        }
      }
    );
  }
);
I.displayName = _;
var ve = "DropdownMenuGroup", Me = s.forwardRef(
  (e, o) => {
    const { __scopeDropdownMenu: r, ...n } = e, a = i(r);
    return /* @__PURE__ */ t.jsx(ue, { ...a, ...n, ref: o });
  }
);
Me.displayName = ve;
var he = "DropdownMenuLabel", S = s.forwardRef(
  (e, o) => {
    const { __scopeDropdownMenu: r, ...n } = e, a = i(r);
    return /* @__PURE__ */ t.jsx(te, { ...a, ...n, ref: o });
  }
);
S.displayName = he;
var De = "DropdownMenuItem", C = s.forwardRef(
  (e, o) => {
    const { __scopeDropdownMenu: r, ...n } = e, a = i(r);
    return /* @__PURE__ */ t.jsx(oe, { ...a, ...n, ref: o });
  }
);
C.displayName = De;
var be = "DropdownMenuCheckboxItem", j = s.forwardRef((e, o) => {
  const { __scopeDropdownMenu: r, ...n } = e, a = i(r);
  return /* @__PURE__ */ t.jsx(re, { ...a, ...n, ref: o });
});
j.displayName = be;
var Ne = "DropdownMenuRadioGroup", E = s.forwardRef((e, o) => {
  const { __scopeDropdownMenu: r, ...n } = e, a = i(r);
  return /* @__PURE__ */ t.jsx(ie, { ...a, ...n, ref: o });
});
E.displayName = Ne;
var ye = "DropdownMenuRadioItem", P = s.forwardRef((e, o) => {
  const { __scopeDropdownMenu: r, ...n } = e, a = i(r);
  return /* @__PURE__ */ t.jsx(ae, { ...a, ...n, ref: o });
});
P.displayName = ye;
var Re = "DropdownMenuItemIndicator", A = s.forwardRef((e, o) => {
  const { __scopeDropdownMenu: r, ...n } = e, a = i(r);
  return /* @__PURE__ */ t.jsx(ne, { ...a, ...n, ref: o });
});
A.displayName = Re;
var _e = "DropdownMenuSeparator", O = s.forwardRef((e, o) => {
  const { __scopeDropdownMenu: r, ...n } = e, a = i(r);
  return /* @__PURE__ */ t.jsx(se, { ...a, ...n, ref: o });
});
O.displayName = _e;
var Ie = "DropdownMenuArrow", Se = s.forwardRef(
  (e, o) => {
    const { __scopeDropdownMenu: r, ...n } = e, a = i(r);
    return /* @__PURE__ */ t.jsx(le, { ...a, ...n, ref: o });
  }
);
Se.displayName = Ie;
var Ce = (e) => {
  const { __scopeDropdownMenu: o, children: r, open: n, onOpenChange: a, defaultOpen: p } = e, u = i(o), [d, c] = M({
    prop: n,
    defaultProp: p ?? !1,
    onChange: a,
    caller: "DropdownMenuSub"
  });
  return /* @__PURE__ */ t.jsx(ce, { ...u, open: d, onOpenChange: c, children: r });
}, je = "DropdownMenuSubTrigger", T = s.forwardRef((e, o) => {
  const { __scopeDropdownMenu: r, ...n } = e, a = i(r);
  return /* @__PURE__ */ t.jsx(V, { ...a, ...n, ref: o });
});
T.displayName = je;
var Ee = "DropdownMenuSubContent", k = s.forwardRef((e, o) => {
  const { __scopeDropdownMenu: r, ...n } = e, a = i(r);
  return /* @__PURE__ */ t.jsx(
    Y,
    {
      ...a,
      ...n,
      ref: o,
      style: {
        ...e.style,
        "--radix-dropdown-menu-content-transform-origin": "var(--radix-popper-transform-origin)",
        "--radix-dropdown-menu-content-available-width": "var(--radix-popper-available-width)",
        "--radix-dropdown-menu-content-available-height": "var(--radix-popper-available-height)",
        "--radix-dropdown-menu-trigger-width": "var(--radix-popper-anchor-width)",
        "--radix-dropdown-menu-trigger-height": "var(--radix-popper-anchor-height)"
      }
    }
  );
});
k.displayName = Ee;
var Pe = b, Ae = y, Oe = R, G = I, $ = S, L = C, z = j, Te = E, K = P, U = A, B = O, ke = Ce, F = T, H = k;
const Qe = Pe, Ve = Ae, Ye = ke, Ze = Te, Ge = s.forwardRef(({ className: e, inset: o, children: r, ...n }, a) => /* @__PURE__ */ t.jsxs(
  F,
  {
    ref: a,
    className: l(
      "flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      o && "pl-8",
      e
    ),
    ...n,
    children: [
      r,
      /* @__PURE__ */ t.jsx(me, { className: "ml-auto" })
    ]
  }
));
Ge.displayName = F.displayName;
const $e = s.forwardRef(({ className: e, ...o }, r) => /* @__PURE__ */ t.jsx(
  H,
  {
    ref: r,
    className: l(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-dropdown-menu-content-transform-origin]",
      e
    ),
    ...o
  }
));
$e.displayName = H.displayName;
const Le = s.forwardRef(({ className: e, sideOffset: o = 4, ...r }, n) => /* @__PURE__ */ t.jsx(Oe, { children: /* @__PURE__ */ t.jsx(
  G,
  {
    ref: n,
    sideOffset: o,
    className: l(
      "z-50 max-h-[var(--radix-dropdown-menu-content-available-height)] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
      "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-dropdown-menu-content-transform-origin]",
      e
    ),
    ...r
  }
) }));
Le.displayName = G.displayName;
const ze = s.forwardRef(({ className: e, inset: o, ...r }, n) => /* @__PURE__ */ t.jsx(
  L,
  {
    ref: n,
    className: l(
      "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0",
      o && "pl-8",
      e
    ),
    ...r
  }
));
ze.displayName = L.displayName;
const Ke = s.forwardRef(({ className: e, children: o, checked: r, ...n }, a) => /* @__PURE__ */ t.jsxs(
  z,
  {
    ref: a,
    className: l(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      e
    ),
    checked: r,
    ...n,
    children: [
      /* @__PURE__ */ t.jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ t.jsx(U, { children: /* @__PURE__ */ t.jsx(Q, { className: "h-4 w-4" }) }) }),
      o
    ]
  }
));
Ke.displayName = z.displayName;
const Ue = s.forwardRef(({ className: e, children: o, ...r }, n) => /* @__PURE__ */ t.jsxs(
  K,
  {
    ref: n,
    className: l(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      e
    ),
    ...r,
    children: [
      /* @__PURE__ */ t.jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ t.jsx(U, { children: /* @__PURE__ */ t.jsx(fe, { className: "h-2 w-2 fill-current" }) }) }),
      o
    ]
  }
));
Ue.displayName = K.displayName;
const Be = s.forwardRef(({ className: e, inset: o, ...r }, n) => /* @__PURE__ */ t.jsx(
  $,
  {
    ref: n,
    className: l(
      "px-2 py-1.5 text-sm font-semibold",
      o && "pl-8",
      e
    ),
    ...r
  }
));
Be.displayName = $.displayName;
const Fe = s.forwardRef(({ className: e, ...o }, r) => /* @__PURE__ */ t.jsx(
  B,
  {
    ref: r,
    className: l("-mx-1 my-1 h-px bg-muted", e),
    ...o
  }
));
Fe.displayName = B.displayName;
const He = ({
  className: e,
  ...o
}) => /* @__PURE__ */ t.jsx(
  "span",
  {
    className: l("ml-auto text-xs tracking-widest opacity-60", e),
    ...o
  }
);
He.displayName = "DropdownMenuShortcut";
export {
  Qe as D,
  Ve as a,
  Le as b,
  ze as c,
  Ze as d,
  Fe as e,
  Be as f,
  Ye as g,
  Ge as h,
  $e as i,
  Ke as j,
  He as k,
  Ue as l
};
