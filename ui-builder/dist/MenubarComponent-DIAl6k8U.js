import { r as s, $ as S, w as Se, j as t, t as Ce, v as G, F as Ie, P as $, x as _e, y as M, c as g, a3 as Ae } from "./badge-DBvLZUPk.js";
import { c as Ee, f as Pe, g as Te, A as Oe, P as ke, C as De, h as Ge, e as $e, L as Fe, S as Ke, a as Le, b as Be, d as Ue, R as ze, I as Ve, G as He, i as Je } from "./index-BhCGDJyJ.js";
import { c as F, R as We, I as Xe } from "./index-jhnCDxae.js";
import { C as Ye } from "./chevron-right-BL2YneJZ.js";
import { C as qe } from "./circle-Be6zXIJA.js";
import { I as Qe } from "./lucide-react-CpYArdkX.js";
var N = "Menubar", [I, Ze, ea] = Ie(N), [K] = Se(N, [
  ea,
  F
]), f = Ee(), L = F(), [aa, P] = K(N), B = s.forwardRef(
  (e, r) => {
    const {
      __scopeMenubar: a,
      value: n,
      onValueChange: o,
      defaultValue: l,
      loop: i = !0,
      dir: c,
      ...u
    } = e, m = Ce(c), d = L(a), [v, b] = G({
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
        loop: i,
        children: /* @__PURE__ */ t.jsx(I.Provider, { scope: a, children: /* @__PURE__ */ t.jsx(I.Slot, { scope: a, children: /* @__PURE__ */ t.jsx(
          We,
          {
            asChild: !0,
            ...d,
            orientation: "horizontal",
            loop: i,
            dir: m,
            currentTabStopId: h,
            onCurrentTabStopIdChange: p,
            children: /* @__PURE__ */ t.jsx($.div, { role: "menubar", ...u, ref: r })
          }
        ) }) })
      }
    );
  }
);
B.displayName = N;
var T = "MenubarMenu", [ra, U] = K(T), z = (e) => {
  const { __scopeMenubar: r, value: a, ...n } = e, o = S(), l = a || o || "LEGACY_REACT_AUTO_VALUE", i = P(T, r), c = f(r), u = s.useRef(null), m = s.useRef(!1), d = i.value === l;
  return s.useEffect(() => {
    d || (m.current = !1);
  }, [d]), /* @__PURE__ */ t.jsx(
    ra,
    {
      scope: r,
      value: l,
      triggerId: S(),
      triggerRef: u,
      contentId: S(),
      wasKeyboardTriggerOpenRef: m,
      children: /* @__PURE__ */ t.jsx(
        Pe,
        {
          ...c,
          open: d,
          onOpenChange: (v) => {
            v || i.onMenuClose();
          },
          modal: !1,
          dir: i.dir,
          ...n
        }
      )
    }
  );
};
z.displayName = T;
var _ = "MenubarTrigger", V = s.forwardRef(
  (e, r) => {
    const { __scopeMenubar: a, disabled: n = !1, ...o } = e, l = L(a), i = f(a), c = P(_, a), u = U(_, a), m = s.useRef(null), d = _e(r, m, u.triggerRef), [v, b] = s.useState(!1), h = c.value === u.value;
    return /* @__PURE__ */ t.jsx(I.ItemSlot, { scope: a, value: u.value, disabled: n, children: /* @__PURE__ */ t.jsx(
      Xe,
      {
        asChild: !0,
        ...l,
        focusable: !n,
        tabStopId: u.value,
        children: /* @__PURE__ */ t.jsx(Oe, { asChild: !0, ...i, children: /* @__PURE__ */ t.jsx(
          $.button,
          {
            type: "button",
            role: "menuitem",
            id: u.triggerId,
            "aria-haspopup": "menu",
            "aria-expanded": h,
            "aria-controls": h ? u.contentId : void 0,
            "data-highlighted": v ? "" : void 0,
            "data-state": h ? "open" : "closed",
            "data-disabled": n ? "" : void 0,
            disabled: n,
            ...o,
            ref: d,
            onPointerDown: M(e.onPointerDown, (p) => {
              !n && p.button === 0 && p.ctrlKey === !1 && (c.onMenuOpen(u.value), h || p.preventDefault());
            }),
            onPointerEnter: M(e.onPointerEnter, () => {
              var x;
              !!c.value && !h && (c.onMenuOpen(u.value), (x = m.current) == null || x.focus());
            }),
            onKeyDown: M(e.onKeyDown, (p) => {
              n || (["Enter", " "].includes(p.key) && c.onMenuToggle(u.value), p.key === "ArrowDown" && c.onMenuOpen(u.value), ["Enter", " ", "ArrowDown"].includes(p.key) && (u.wasKeyboardTriggerOpenRef.current = !0, p.preventDefault()));
            }),
            onFocus: M(e.onFocus, () => b(!0)),
            onBlur: M(e.onBlur, () => b(!1))
          }
        ) })
      }
    ) });
  }
);
V.displayName = _;
var na = "MenubarPortal", H = (e) => {
  const { __scopeMenubar: r, ...a } = e, n = f(r);
  return /* @__PURE__ */ t.jsx(ke, { ...n, ...a });
};
H.displayName = na;
var A = "MenubarContent", J = s.forwardRef(
  (e, r) => {
    const { __scopeMenubar: a, align: n = "start", ...o } = e, l = f(a), i = P(A, a), c = U(A, a), u = Ze(a), m = s.useRef(!1);
    return /* @__PURE__ */ t.jsx(
      De,
      {
        id: c.contentId,
        "aria-labelledby": c.triggerId,
        "data-radix-menubar-content": "",
        ...l,
        ...o,
        ref: r,
        align: n,
        onCloseAutoFocus: M(e.onCloseAutoFocus, (d) => {
          var b;
          !!!i.value && !m.current && ((b = c.triggerRef.current) == null || b.focus()), m.current = !1, d.preventDefault();
        }),
        onFocusOutside: M(e.onFocusOutside, (d) => {
          const v = d.target;
          u().some((h) => {
            var p;
            return (p = h.ref.current) == null ? void 0 : p.contains(v);
          }) && d.preventDefault();
        }),
        onInteractOutside: M(e.onInteractOutside, () => {
          m.current = !0;
        }),
        onEntryFocus: (d) => {
          c.wasKeyboardTriggerOpenRef.current || d.preventDefault();
        },
        onKeyDown: M(
          e.onKeyDown,
          (d) => {
            if (["ArrowRight", "ArrowLeft"].includes(d.key)) {
              const v = d.target, b = v.hasAttribute("data-radix-menubar-subtrigger"), h = v.closest("[data-radix-menubar-content]") !== d.currentTarget, x = (i.dir === "rtl" ? "ArrowRight" : "ArrowLeft") === d.key;
              if (!x && b || h && x) return;
              let y = u().filter((j) => !j.disabled).map((j) => j.value);
              x && y.reverse();
              const k = y.indexOf(c.value);
              y = i.loop ? ga(y, k + 1) : y.slice(k + 1);
              const [D] = y;
              D && i.onMenuOpen(D);
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
J.displayName = A;
var ta = "MenubarGroup", oa = s.forwardRef(
  (e, r) => {
    const { __scopeMenubar: a, ...n } = e, o = f(a);
    return /* @__PURE__ */ t.jsx(He, { ...o, ...n, ref: r });
  }
);
oa.displayName = ta;
var sa = "MenubarLabel", W = s.forwardRef(
  (e, r) => {
    const { __scopeMenubar: a, ...n } = e, o = f(a);
    return /* @__PURE__ */ t.jsx(Fe, { ...o, ...n, ref: r });
  }
);
W.displayName = sa;
var ca = "MenubarItem", X = s.forwardRef(
  (e, r) => {
    const { __scopeMenubar: a, ...n } = e, o = f(a);
    return /* @__PURE__ */ t.jsx(Ve, { ...o, ...n, ref: r });
  }
);
X.displayName = ca;
var ua = "MenubarCheckboxItem", Y = s.forwardRef(
  (e, r) => {
    const { __scopeMenubar: a, ...n } = e, o = f(a);
    return /* @__PURE__ */ t.jsx(Be, { ...o, ...n, ref: r });
  }
);
Y.displayName = ua;
var ia = "MenubarRadioGroup", q = s.forwardRef(
  (e, r) => {
    const { __scopeMenubar: a, ...n } = e, o = f(a);
    return /* @__PURE__ */ t.jsx(Te, { ...o, ...n, ref: r });
  }
);
q.displayName = ia;
var da = "MenubarRadioItem", Q = s.forwardRef(
  (e, r) => {
    const { __scopeMenubar: a, ...n } = e, o = f(a);
    return /* @__PURE__ */ t.jsx(ze, { ...o, ...n, ref: r });
  }
);
Q.displayName = da;
var la = "MenubarItemIndicator", Z = s.forwardRef((e, r) => {
  const { __scopeMenubar: a, ...n } = e, o = f(a);
  return /* @__PURE__ */ t.jsx(Ue, { ...o, ...n, ref: r });
});
Z.displayName = la;
var pa = "MenubarSeparator", ee = s.forwardRef(
  (e, r) => {
    const { __scopeMenubar: a, ...n } = e, o = f(a);
    return /* @__PURE__ */ t.jsx($e, { ...o, ...n, ref: r });
  }
);
ee.displayName = pa;
var fa = "MenubarArrow", ba = s.forwardRef(
  (e, r) => {
    const { __scopeMenubar: a, ...n } = e, o = f(a);
    return /* @__PURE__ */ t.jsx(Je, { ...o, ...n, ref: r });
  }
);
ba.displayName = fa;
var ae = "MenubarSub", re = (e) => {
  const { __scopeMenubar: r, children: a, open: n, onOpenChange: o, defaultOpen: l } = e, i = f(r), [c, u] = G({
    prop: n,
    defaultProp: l ?? !1,
    onChange: o,
    caller: ae
  });
  return /* @__PURE__ */ t.jsx(Ge, { ...i, open: c, onOpenChange: u, children: a });
};
re.displayName = ae;
var ma = "MenubarSubTrigger", ne = s.forwardRef(
  (e, r) => {
    const { __scopeMenubar: a, ...n } = e, o = f(a);
    return /* @__PURE__ */ t.jsx(
      Ke,
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
      Le,
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
var oe = B, va = z, se = V, ha = H, ce = J, ue = W, ie = X, de = Y, Ma = q, le = Q, pe = Z, fe = ee, ya = re, be = ne, me = te;
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
  ce,
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
Me.displayName = ce.displayName;
const ye = s.forwardRef(({ className: e, inset: r, ...a }, n) => /* @__PURE__ */ t.jsx(
  ie,
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
ye.displayName = ie.displayName;
const Ne = s.forwardRef(({ className: e, children: r, checked: a, ...n }, o) => /* @__PURE__ */ t.jsxs(
  de,
  {
    ref: o,
    className: g(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      e
    ),
    checked: a,
    ...n,
    children: [
      /* @__PURE__ */ t.jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ t.jsx(pe, { children: /* @__PURE__ */ t.jsx(Ae, { className: "h-4 w-4" }) }) }),
      r
    ]
  }
));
Ne.displayName = de.displayName;
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
      /* @__PURE__ */ t.jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ t.jsx(pe, { children: /* @__PURE__ */ t.jsx(qe, { className: "h-2 w-2 fill-current" }) }) }),
      r
    ]
  }
));
we.displayName = le.displayName;
const Re = s.forwardRef(({ className: e, inset: r, ...a }, n) => /* @__PURE__ */ t.jsx(
  ue,
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
Re.displayName = ue.displayName;
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
  const { type: r, command: a, url: n, event: o, payload: l, method: i } = e;
  r === "command" && a ? window.dispatchEvent(new CustomEvent("command:execute", { detail: { command: a, payload: l } })) : r === "navigate" && n ? window.location.href = n : r === "emit" && o ? window.dispatchEvent(new CustomEvent(o, { detail: l })) : r === "http" && n && fetch(n, {
    method: i || "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(l)
  }).catch(console.error);
}
function w(e) {
  if (!e) return null;
  const r = Qe[e];
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
function Pa({ config: e }) {
  const { props: r } = e, { menus: a, className: n } = r;
  return /* @__PURE__ */ t.jsx(xe, { className: g(n), children: a.map((o, l) => {
    const i = o.items.some((c) => c.type === "radio");
    return /* @__PURE__ */ t.jsxs(Na, { children: [
      /* @__PURE__ */ t.jsx(ge, { children: o.label }),
      /* @__PURE__ */ t.jsx(Me, { children: i ? /* @__PURE__ */ t.jsx(Ra, { children: o.items.map((c, u) => E(c, u)) }) : o.items.map((c, u) => E(c, u)) })
    ] }, `menu-${l}`);
  }) });
}
export {
  Pa as MenubarComponent
};
