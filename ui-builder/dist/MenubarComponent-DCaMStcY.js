import { E as S, d as Se, aO as Ce, j as t, aP as Ie, aR as _e, u as Ae, a as G, b as $, l as Ee, R as Pe, P as K, e as Te, I as Oe, aQ as ke, f as M, aS as De, aT as Ge, aU as $e, aV as Ke, aW as Fe, aX as Le, aY as Be, aZ as Ue, a_ as Ve, a$ as ze, b0 as He, b1 as We, b2 as Xe, c as g, G as Ye, aA as Je, k as Qe, _ as Ze } from "./index-BxMkEt18.js";
import * as s from "react";
var N = "Menubar", [I, qe, ea] = Ee(N), [F] = Se(N, [
  ea,
  G
]), f = Ce(), L = G(), [aa, P] = F(N), B = s.forwardRef(
  (e, r) => {
    const {
      __scopeMenubar: a,
      value: n,
      onValueChange: o,
      defaultValue: l,
      loop: d = !0,
      dir: u,
      ...c
    } = e, m = Ae(u), i = L(a), [v, b] = $({
      prop: n,
      onChange: o,
      defaultProp: l ?? "",
      caller: N
    }), [h, p] = s.useState(null);
    return /* @__PURE__ */ t.jsx(
      aa,
      {
        scope: a,
        value: v,
        onMenuOpen: s.useCallback(
          (x) => {
            b(x), p(x);
          },
          [b]
        ),
        onMenuClose: s.useCallback(() => b(""), [b]),
        onMenuToggle: s.useCallback(
          (x) => {
            b((O) => O ? "" : x), p(x);
          },
          [b]
        ),
        dir: m,
        loop: d,
        children: /* @__PURE__ */ t.jsx(I.Provider, { scope: a, children: /* @__PURE__ */ t.jsx(I.Slot, { scope: a, children: /* @__PURE__ */ t.jsx(
          Pe,
          {
            asChild: !0,
            ...i,
            orientation: "horizontal",
            loop: d,
            dir: m,
            currentTabStopId: h,
            onCurrentTabStopIdChange: p,
            children: /* @__PURE__ */ t.jsx(K.div, { role: "menubar", ...c, ref: r })
          }
        ) }) })
      }
    );
  }
);
B.displayName = N;
var T = "MenubarMenu", [ra, U] = F(T), V = (e) => {
  const { __scopeMenubar: r, value: a, ...n } = e, o = S(), l = a || o || "LEGACY_REACT_AUTO_VALUE", d = P(T, r), u = f(r), c = s.useRef(null), m = s.useRef(!1), i = d.value === l;
  return s.useEffect(() => {
    i || (m.current = !1);
  }, [i]), /* @__PURE__ */ t.jsx(
    ra,
    {
      scope: r,
      value: l,
      triggerId: S(),
      triggerRef: c,
      contentId: S(),
      wasKeyboardTriggerOpenRef: m,
      children: /* @__PURE__ */ t.jsx(
        Ie,
        {
          ...u,
          open: i,
          onOpenChange: (v) => {
            v || d.onMenuClose();
          },
          modal: !1,
          dir: d.dir,
          ...n
        }
      )
    }
  );
};
V.displayName = T;
var _ = "MenubarTrigger", z = s.forwardRef(
  (e, r) => {
    const { __scopeMenubar: a, disabled: n = !1, ...o } = e, l = L(a), d = f(a), u = P(_, a), c = U(_, a), m = s.useRef(null), i = Te(r, m, c.triggerRef), [v, b] = s.useState(!1), h = u.value === c.value;
    return /* @__PURE__ */ t.jsx(I.ItemSlot, { scope: a, value: c.value, disabled: n, children: /* @__PURE__ */ t.jsx(
      Oe,
      {
        asChild: !0,
        ...l,
        focusable: !n,
        tabStopId: c.value,
        children: /* @__PURE__ */ t.jsx(ke, { asChild: !0, ...d, children: /* @__PURE__ */ t.jsx(
          K.button,
          {
            type: "button",
            role: "menuitem",
            id: c.triggerId,
            "aria-haspopup": "menu",
            "aria-expanded": h,
            "aria-controls": h ? c.contentId : void 0,
            "data-highlighted": v ? "" : void 0,
            "data-state": h ? "open" : "closed",
            "data-disabled": n ? "" : void 0,
            disabled: n,
            ...o,
            ref: i,
            onPointerDown: M(e.onPointerDown, (p) => {
              !n && p.button === 0 && p.ctrlKey === !1 && (u.onMenuOpen(c.value), h || p.preventDefault());
            }),
            onPointerEnter: M(e.onPointerEnter, () => {
              var x;
              !!u.value && !h && (u.onMenuOpen(c.value), (x = m.current) == null || x.focus());
            }),
            onKeyDown: M(e.onKeyDown, (p) => {
              n || (["Enter", " "].includes(p.key) && u.onMenuToggle(c.value), p.key === "ArrowDown" && u.onMenuOpen(c.value), ["Enter", " ", "ArrowDown"].includes(p.key) && (c.wasKeyboardTriggerOpenRef.current = !0, p.preventDefault()));
            }),
            onFocus: M(e.onFocus, () => b(!0)),
            onBlur: M(e.onBlur, () => b(!1))
          }
        ) })
      }
    ) });
  }
);
z.displayName = _;
var na = "MenubarPortal", H = (e) => {
  const { __scopeMenubar: r, ...a } = e, n = f(r);
  return /* @__PURE__ */ t.jsx(De, { ...n, ...a });
};
H.displayName = na;
var A = "MenubarContent", W = s.forwardRef(
  (e, r) => {
    const { __scopeMenubar: a, align: n = "start", ...o } = e, l = f(a), d = P(A, a), u = U(A, a), c = qe(a), m = s.useRef(!1);
    return /* @__PURE__ */ t.jsx(
      Ge,
      {
        id: u.contentId,
        "aria-labelledby": u.triggerId,
        "data-radix-menubar-content": "",
        ...l,
        ...o,
        ref: r,
        align: n,
        onCloseAutoFocus: M(e.onCloseAutoFocus, (i) => {
          var b;
          !!!d.value && !m.current && ((b = u.triggerRef.current) == null || b.focus()), m.current = !1, i.preventDefault();
        }),
        onFocusOutside: M(e.onFocusOutside, (i) => {
          const v = i.target;
          c().some((h) => {
            var p;
            return (p = h.ref.current) == null ? void 0 : p.contains(v);
          }) && i.preventDefault();
        }),
        onInteractOutside: M(e.onInteractOutside, () => {
          m.current = !0;
        }),
        onEntryFocus: (i) => {
          u.wasKeyboardTriggerOpenRef.current || i.preventDefault();
        },
        onKeyDown: M(
          e.onKeyDown,
          (i) => {
            if (["ArrowRight", "ArrowLeft"].includes(i.key)) {
              const v = i.target, b = v.hasAttribute("data-radix-menubar-subtrigger"), h = v.closest("[data-radix-menubar-content]") !== i.currentTarget, x = (d.dir === "rtl" ? "ArrowRight" : "ArrowLeft") === i.key;
              if (!x && b || h && x) return;
              let y = c().filter((j) => !j.disabled).map((j) => j.value);
              x && y.reverse();
              const k = y.indexOf(u.value);
              y = d.loop ? ga(y, k + 1) : y.slice(k + 1);
              const [D] = y;
              D && d.onMenuOpen(D);
            }
          },
          { checkForDefaultPrevented: !1 }
        ),
        style: {
          ...e.style,
          "--radix-menubar-content-transform-origin": "var(--radix-popper-transform-origin)",
          "--radix-menubar-content-available-width": "var(--radix-popper-available-width)",
          "--radix-menubar-content-available-height": "var(--radix-popper-available-height)",
          "--radix-menubar-trigger-width": "var(--radix-popper-anchor-width)",
          "--radix-menubar-trigger-height": "var(--radix-popper-anchor-height)"
        }
      }
    );
  }
);
W.displayName = A;
var ta = "MenubarGroup", oa = s.forwardRef(
  (e, r) => {
    const { __scopeMenubar: a, ...n } = e, o = f(a);
    return /* @__PURE__ */ t.jsx(We, { ...o, ...n, ref: r });
  }
);
oa.displayName = ta;
var sa = "MenubarLabel", X = s.forwardRef(
  (e, r) => {
    const { __scopeMenubar: a, ...n } = e, o = f(a);
    return /* @__PURE__ */ t.jsx(Fe, { ...o, ...n, ref: r });
  }
);
X.displayName = sa;
var ua = "MenubarItem", Y = s.forwardRef(
  (e, r) => {
    const { __scopeMenubar: a, ...n } = e, o = f(a);
    return /* @__PURE__ */ t.jsx(He, { ...o, ...n, ref: r });
  }
);
Y.displayName = ua;
var ca = "MenubarCheckboxItem", J = s.forwardRef(
  (e, r) => {
    const { __scopeMenubar: a, ...n } = e, o = f(a);
    return /* @__PURE__ */ t.jsx(Ue, { ...o, ...n, ref: r });
  }
);
J.displayName = ca;
var da = "MenubarRadioGroup", Q = s.forwardRef(
  (e, r) => {
    const { __scopeMenubar: a, ...n } = e, o = f(a);
    return /* @__PURE__ */ t.jsx(_e, { ...o, ...n, ref: r });
  }
);
Q.displayName = da;
var ia = "MenubarRadioItem", Z = s.forwardRef(
  (e, r) => {
    const { __scopeMenubar: a, ...n } = e, o = f(a);
    return /* @__PURE__ */ t.jsx(ze, { ...o, ...n, ref: r });
  }
);
Z.displayName = ia;
var la = "MenubarItemIndicator", q = s.forwardRef((e, r) => {
  const { __scopeMenubar: a, ...n } = e, o = f(a);
  return /* @__PURE__ */ t.jsx(Ve, { ...o, ...n, ref: r });
});
q.displayName = la;
var pa = "MenubarSeparator", ee = s.forwardRef(
  (e, r) => {
    const { __scopeMenubar: a, ...n } = e, o = f(a);
    return /* @__PURE__ */ t.jsx(Ke, { ...o, ...n, ref: r });
  }
);
ee.displayName = pa;
var fa = "MenubarArrow", ba = s.forwardRef(
  (e, r) => {
    const { __scopeMenubar: a, ...n } = e, o = f(a);
    return /* @__PURE__ */ t.jsx(Xe, { ...o, ...n, ref: r });
  }
);
ba.displayName = fa;
var ae = "MenubarSub", re = (e) => {
  const { __scopeMenubar: r, children: a, open: n, onOpenChange: o, defaultOpen: l } = e, d = f(r), [u, c] = $({
    prop: n,
    defaultProp: l ?? !1,
    onChange: o,
    caller: ae
  });
  return /* @__PURE__ */ t.jsx($e, { ...d, open: u, onOpenChange: c, children: a });
};
re.displayName = ae;
var ma = "MenubarSubTrigger", ne = s.forwardRef(
  (e, r) => {
    const { __scopeMenubar: a, ...n } = e, o = f(a);
    return /* @__PURE__ */ t.jsx(
      Le,
      {
        "data-radix-menubar-subtrigger": "",
        ...o,
        ...n,
        ref: r
      }
    );
  }
);
ne.displayName = ma;
var xa = "MenubarSubContent", te = s.forwardRef(
  (e, r) => {
    const { __scopeMenubar: a, ...n } = e, o = f(a);
    return /* @__PURE__ */ t.jsx(
      Be,
      {
        ...o,
        "data-radix-menubar-content": "",
        ...n,
        ref: r,
        style: {
          ...e.style,
          "--radix-menubar-content-transform-origin": "var(--radix-popper-transform-origin)",
          "--radix-menubar-content-available-width": "var(--radix-popper-available-width)",
          "--radix-menubar-content-available-height": "var(--radix-popper-available-height)",
          "--radix-menubar-trigger-width": "var(--radix-popper-anchor-width)",
          "--radix-menubar-trigger-height": "var(--radix-popper-anchor-height)"
        }
      }
    );
  }
);
te.displayName = xa;
function ga(e, r) {
  return e.map((a, n) => e[(r + n) % e.length]);
}
var oe = B, va = V, se = z, ha = H, ue = W, ce = X, de = Y, ie = J, Ma = Q, le = Z, pe = q, fe = ee, ya = re, be = ne, me = te;
const Na = va, wa = ya, Ra = Ma, xe = s.forwardRef(({ className: e, ...r }, a) => /* @__PURE__ */ t.jsx(
  oe,
  {
    ref: a,
    className: g(
      "flex h-8 items-center space-x-1 rounded-sm border bg-background p-1",
      e
    ),
    ...r
  }
));
xe.displayName = oe.displayName;
const ge = s.forwardRef(({ className: e, ...r }, a) => /* @__PURE__ */ t.jsx(
  se,
  {
    ref: a,
    className: g(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1 text-sm font-medium outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
      e
    ),
    ...r
  }
));
ge.displayName = se.displayName;
const ve = s.forwardRef(({ className: e, inset: r, children: a, ...n }, o) => /* @__PURE__ */ t.jsxs(
  be,
  {
    ref: o,
    className: g(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
      r && "pl-8",
      e
    ),
    ...n,
    children: [
      a,
      /* @__PURE__ */ t.jsx(Ye, { className: "ml-auto h-4 w-4" })
    ]
  }
));
ve.displayName = be.displayName;
const he = s.forwardRef(({ className: e, ...r }, a) => /* @__PURE__ */ t.jsx(
  me,
  {
    ref: a,
    className: g(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      e
    ),
    ...r
  }
));
he.displayName = me.displayName;
const Me = s.forwardRef(({ className: e, align: r = "start", alignOffset: a = -4, sideOffset: n = 8, ...o }, l) => /* @__PURE__ */ t.jsx(ha, { children: /* @__PURE__ */ t.jsx(
  ue,
  {
    ref: l,
    align: r,
    alignOffset: a,
    sideOffset: n,
    className: g(
      "z-50 min-w-[12rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      e
    ),
    ...o
  }
) }));
Me.displayName = ue.displayName;
const ye = s.forwardRef(({ className: e, inset: r, ...a }, n) => /* @__PURE__ */ t.jsx(
  de,
  {
    ref: n,
    className: g(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      r && "pl-8",
      e
    ),
    ...a
  }
));
ye.displayName = de.displayName;
const Ne = s.forwardRef(({ className: e, children: r, checked: a, ...n }, o) => /* @__PURE__ */ t.jsxs(
  ie,
  {
    ref: o,
    className: g(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      e
    ),
    checked: a,
    ...n,
    children: [
      /* @__PURE__ */ t.jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ t.jsx(pe, { children: /* @__PURE__ */ t.jsx(Je, { className: "h-4 w-4" }) }) }),
      r
    ]
  }
));
Ne.displayName = ie.displayName;
const we = s.forwardRef(({ className: e, children: r, ...a }, n) => /* @__PURE__ */ t.jsxs(
  le,
  {
    ref: n,
    className: g(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      e
    ),
    ...a,
    children: [
      /* @__PURE__ */ t.jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ t.jsx(pe, { children: /* @__PURE__ */ t.jsx(Qe, { className: "h-2 w-2 fill-current" }) }) }),
      r
    ]
  }
));
we.displayName = le.displayName;
const Re = s.forwardRef(({ className: e, inset: r, ...a }, n) => /* @__PURE__ */ t.jsx(
  ce,
  {
    ref: n,
    className: g(
      "px-2 py-1.5 text-sm font-semibold",
      r && "pl-8",
      e
    ),
    ...a
  }
));
Re.displayName = ce.displayName;
const je = s.forwardRef(({ className: e, ...r }, a) => /* @__PURE__ */ t.jsx(
  fe,
  {
    ref: a,
    className: g("-mx-1 my-1 h-px bg-muted", e),
    ...r
  }
));
je.displayName = fe.displayName;
const R = ({
  className: e,
  ...r
}) => /* @__PURE__ */ t.jsx(
  "span",
  {
    className: g(
      "ml-auto text-xs tracking-widest text-muted-foreground",
      e
    ),
    ...r
  }
);
R.displayName = "MenubarShortcut";
function C(e) {
  if (!e) return;
  const { type: r, command: a, url: n, event: o, payload: l, method: d } = e;
  r === "command" && a ? window.dispatchEvent(new CustomEvent("command:execute", { detail: { command: a, payload: l } })) : r === "navigate" && n ? window.location.href = n : r === "emit" && o ? window.dispatchEvent(new CustomEvent(o, { detail: l })) : r === "http" && n && fetch(n, {
    method: d || "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(l)
  }).catch(console.error);
}
function w(e) {
  if (!e) return null;
  const r = Ze[e];
  return r ? /* @__PURE__ */ t.jsx(r, { className: "h-4 w-4" }) : null;
}
function E(e, r) {
  const a = `menubar-item-${r}`;
  return e.type === "separator" ? /* @__PURE__ */ t.jsx(je, {}, a) : e.type === "label" ? /* @__PURE__ */ t.jsx(Re, { children: e.label }, a) : e.type === "submenu" && e.items ? /* @__PURE__ */ t.jsxs(wa, { children: [
    /* @__PURE__ */ t.jsxs(ve, { disabled: e.disabled, children: [
      w(e.icon),
      e.label
    ] }),
    /* @__PURE__ */ t.jsx(he, { children: e.items.map((n, o) => E(n, o)) })
  ] }, a) : e.type === "checkbox" ? /* @__PURE__ */ t.jsxs(
    Ne,
    {
      checked: e.checked,
      disabled: e.disabled,
      onSelect: (n) => {
        n.preventDefault(), C(e.action);
      },
      children: [
        w(e.icon),
        e.label,
        e.shortcut && /* @__PURE__ */ t.jsx(R, { children: e.shortcut })
      ]
    },
    a
  ) : e.type === "radio" ? /* @__PURE__ */ t.jsxs(
    we,
    {
      value: e.value || e.label || "",
      disabled: e.disabled,
      onSelect: (n) => {
        n.preventDefault(), C(e.action);
      },
      children: [
        w(e.icon),
        e.label,
        e.shortcut && /* @__PURE__ */ t.jsx(R, { children: e.shortcut })
      ]
    },
    a
  ) : /* @__PURE__ */ t.jsxs(
    ye,
    {
      disabled: e.disabled,
      onSelect: (n) => {
        n.preventDefault(), C(e.action);
      },
      children: [
        w(e.icon),
        e.label,
        e.shortcut && /* @__PURE__ */ t.jsx(R, { children: e.shortcut })
      ]
    },
    a
  );
}
function Ca({ config: e }) {
  const { props: r } = e, { menus: a, className: n } = r;
  return /* @__PURE__ */ t.jsx(xe, { className: g(n), children: a.map((o, l) => {
    const d = o.items.some((u) => u.type === "radio");
    return /* @__PURE__ */ t.jsxs(Na, { children: [
      /* @__PURE__ */ t.jsx(ge, { children: o.label }),
      /* @__PURE__ */ t.jsx(Me, { children: d ? /* @__PURE__ */ t.jsx(Ra, { children: o.items.map((u, c) => E(u, c)) }) : o.items.map((u, c) => E(u, c)) })
    ] }, `menu-${l}`);
  }) });
}
export {
  Ca as MenubarComponent
};
