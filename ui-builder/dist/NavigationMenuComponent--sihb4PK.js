import { r as s, $ as oe, j as n, w as Ae, P as I, y as E, ag as Z, x as O, t as Le, v as ae, F as re, aB as Ke, z as K, W as S, C as Ve, ad as ze, Y as z, a4 as $e, a0 as Ge, Q as Ue, c as P, _ as Be, V as He, O as We } from "./badge-DBvLZUPk.js";
import { I as Ye } from "./lucide-react-CpYArdkX.js";
var k = "NavigationMenu", [W, ie, qe] = re(k), [$, Qe, Xe] = re(k), [Y] = Ae(
  k,
  [qe, Xe]
), [Je, T] = Y(k), [Ze, et] = Y(k), se = s.forwardRef(
  (e, t) => {
    const {
      __scopeNavigationMenu: o,
      value: i,
      onValueChange: r,
      defaultValue: a,
      delayDuration: c = 200,
      skipDelayDuration: l = 300,
      orientation: u = "horizontal",
      dir: w,
      ...d
    } = e, [g, M] = s.useState(null), R = O(t, (x) => M(x)), h = Le(w), p = s.useRef(0), N = s.useRef(0), y = s.useRef(0), [j, v] = s.useState(!0), [m, f] = ae({
      prop: i,
      onChange: (x) => {
        const D = x !== "", V = l > 0;
        D ? (window.clearTimeout(y.current), V && v(!1)) : (window.clearTimeout(y.current), y.current = window.setTimeout(
          () => v(!0),
          l
        )), r == null || r(x);
      },
      defaultProp: a ?? "",
      caller: k
    }), C = s.useCallback(() => {
      window.clearTimeout(N.current), N.current = window.setTimeout(() => f(""), 150);
    }, [f]), b = s.useCallback(
      (x) => {
        window.clearTimeout(N.current), f(x);
      },
      [f]
    ), _ = s.useCallback(
      (x) => {
        m === x ? window.clearTimeout(N.current) : p.current = window.setTimeout(() => {
          window.clearTimeout(N.current), f(x);
        }, c);
      },
      [m, f, c]
    );
    return s.useEffect(() => () => {
      window.clearTimeout(p.current), window.clearTimeout(N.current), window.clearTimeout(y.current);
    }, []), /* @__PURE__ */ n.jsx(
      ce,
      {
        scope: o,
        isRootMenu: !0,
        value: m,
        dir: h,
        orientation: u,
        rootNavigationMenu: g,
        onTriggerEnter: (x) => {
          window.clearTimeout(p.current), j ? _(x) : b(x);
        },
        onTriggerLeave: () => {
          window.clearTimeout(p.current), C();
        },
        onContentEnter: () => window.clearTimeout(N.current),
        onContentLeave: C,
        onItemSelect: (x) => {
          f((D) => D === x ? "" : x);
        },
        onItemDismiss: () => f(""),
        children: /* @__PURE__ */ n.jsx(
          I.nav,
          {
            "aria-label": "Main",
            "data-orientation": u,
            dir: h,
            ...d,
            ref: R
          }
        )
      }
    );
  }
);
se.displayName = k;
var G = "NavigationMenuSub", tt = s.forwardRef(
  (e, t) => {
    const {
      __scopeNavigationMenu: o,
      value: i,
      onValueChange: r,
      defaultValue: a,
      orientation: c = "horizontal",
      ...l
    } = e, u = T(G, o), [w, d] = ae({
      prop: i,
      onChange: r,
      defaultProp: a ?? "",
      caller: G
    });
    return /* @__PURE__ */ n.jsx(
      ce,
      {
        scope: o,
        isRootMenu: !1,
        value: w,
        dir: u.dir,
        orientation: c,
        rootNavigationMenu: u.rootNavigationMenu,
        onTriggerEnter: (g) => d(g),
        onItemSelect: (g) => d(g),
        onItemDismiss: () => d(""),
        children: /* @__PURE__ */ n.jsx(I.div, { "data-orientation": c, ...l, ref: t })
      }
    );
  }
);
tt.displayName = G;
var ce = (e) => {
  const {
    scope: t,
    isRootMenu: o,
    rootNavigationMenu: i,
    dir: r,
    orientation: a,
    children: c,
    value: l,
    onItemSelect: u,
    onItemDismiss: w,
    onTriggerEnter: d,
    onTriggerLeave: g,
    onContentEnter: M,
    onContentLeave: R
  } = e, [h, p] = s.useState(null), [N, y] = s.useState(/* @__PURE__ */ new Map()), [j, v] = s.useState(null);
  return /* @__PURE__ */ n.jsx(
    Je,
    {
      scope: t,
      isRootMenu: o,
      rootNavigationMenu: i,
      value: l,
      previousValue: Ve(l),
      baseId: oe(),
      dir: r,
      orientation: a,
      viewport: h,
      onViewportChange: p,
      indicatorTrack: j,
      onIndicatorTrackChange: v,
      onTriggerEnter: S(d),
      onTriggerLeave: S(g),
      onContentEnter: S(M),
      onContentLeave: S(R),
      onItemSelect: S(u),
      onItemDismiss: S(w),
      onViewportContentChange: s.useCallback((m, f) => {
        y((C) => (C.set(m, f), new Map(C)));
      }, []),
      onViewportContentRemove: s.useCallback((m) => {
        y((f) => f.has(m) ? (f.delete(m), new Map(f)) : f);
      }, []),
      children: /* @__PURE__ */ n.jsx(W.Provider, { scope: t, children: /* @__PURE__ */ n.jsx(Ze, { scope: t, items: N, children: c }) })
    }
  );
}, ue = "NavigationMenuList", le = s.forwardRef(
  (e, t) => {
    const { __scopeNavigationMenu: o, ...i } = e, r = T(ue, o), a = /* @__PURE__ */ n.jsx(I.ul, { "data-orientation": r.orientation, ...i, ref: t });
    return /* @__PURE__ */ n.jsx(I.div, { style: { position: "relative" }, ref: r.onIndicatorTrackChange, children: /* @__PURE__ */ n.jsx(W.Slot, { scope: o, children: r.isRootMenu ? /* @__PURE__ */ n.jsx(Ne, { asChild: !0, children: a }) : a }) });
  }
);
le.displayName = ue;
var de = "NavigationMenuItem", [nt, fe] = Y(de), ve = s.forwardRef(
  (e, t) => {
    const { __scopeNavigationMenu: o, value: i, ...r } = e, a = oe(), c = i || a || "LEGACY_REACT_AUTO_VALUE", l = s.useRef(null), u = s.useRef(null), w = s.useRef(null), d = s.useRef(() => {
    }), g = s.useRef(!1), M = s.useCallback((h = "start") => {
      if (l.current) {
        d.current();
        const p = B(l.current);
        p.length && X(h === "start" ? p : p.reverse());
      }
    }, []), R = s.useCallback(() => {
      if (l.current) {
        const h = B(l.current);
        h.length && (d.current = ut(h));
      }
    }, []);
    return /* @__PURE__ */ n.jsx(
      nt,
      {
        scope: o,
        value: c,
        triggerRef: u,
        contentRef: l,
        focusProxyRef: w,
        wasEscapeCloseRef: g,
        onEntryKeyDown: M,
        onFocusProxyEnter: M,
        onRootContentClose: R,
        onContentFocusOutside: R,
        children: /* @__PURE__ */ n.jsx(I.li, { ...r, ref: t })
      }
    );
  }
);
ve.displayName = de;
var U = "NavigationMenuTrigger", me = s.forwardRef((e, t) => {
  const { __scopeNavigationMenu: o, disabled: i, ...r } = e, a = T(U, e.__scopeNavigationMenu), c = fe(U, e.__scopeNavigationMenu), l = s.useRef(null), u = O(l, c.triggerRef, t), w = Me(a.baseId, c.value), d = Re(a.baseId, c.value), g = s.useRef(!1), M = s.useRef(!1), R = c.value === a.value;
  return /* @__PURE__ */ n.jsxs(n.Fragment, { children: [
    /* @__PURE__ */ n.jsx(W.ItemSlot, { scope: o, value: c.value, children: /* @__PURE__ */ n.jsx(Ce, { asChild: !0, children: /* @__PURE__ */ n.jsx(
      I.button,
      {
        id: w,
        disabled: i,
        "data-disabled": i ? "" : void 0,
        "data-state": J(R),
        "aria-expanded": R,
        "aria-controls": d,
        ...r,
        ref: u,
        onPointerEnter: E(e.onPointerEnter, () => {
          M.current = !1, c.wasEscapeCloseRef.current = !1;
        }),
        onPointerMove: E(
          e.onPointerMove,
          L(() => {
            i || M.current || c.wasEscapeCloseRef.current || g.current || (a.onTriggerEnter(c.value), g.current = !0);
          })
        ),
        onPointerLeave: E(
          e.onPointerLeave,
          L(() => {
            i || (a.onTriggerLeave(), g.current = !1);
          })
        ),
        onClick: E(e.onClick, () => {
          a.onItemSelect(c.value), M.current = R;
        }),
        onKeyDown: E(e.onKeyDown, (h) => {
          const N = { horizontal: "ArrowDown", vertical: a.dir === "rtl" ? "ArrowLeft" : "ArrowRight" }[a.orientation];
          R && h.key === N && (c.onEntryKeyDown(), h.preventDefault());
        })
      }
    ) }) }),
    R && /* @__PURE__ */ n.jsxs(n.Fragment, { children: [
      /* @__PURE__ */ n.jsx(
        Ke,
        {
          "aria-hidden": !0,
          tabIndex: 0,
          ref: c.focusProxyRef,
          onFocus: (h) => {
            const p = c.contentRef.current, N = h.relatedTarget, y = N === l.current, j = p == null ? void 0 : p.contains(N);
            (y || !j) && c.onFocusProxyEnter(y ? "start" : "end");
          }
        }
      ),
      a.viewport && /* @__PURE__ */ n.jsx("span", { "aria-owns": d })
    ] })
  ] });
});
me.displayName = U;
var ot = "NavigationMenuLink", ee = "navigationMenu.linkSelect", ge = s.forwardRef(
  (e, t) => {
    const { __scopeNavigationMenu: o, active: i, onSelect: r, ...a } = e;
    return /* @__PURE__ */ n.jsx(Ce, { asChild: !0, children: /* @__PURE__ */ n.jsx(
      I.a,
      {
        "data-active": i ? "" : void 0,
        "aria-current": i ? "page" : void 0,
        ...a,
        ref: t,
        onClick: E(
          e.onClick,
          (c) => {
            const l = c.target, u = new CustomEvent(ee, {
              bubbles: !0,
              cancelable: !0
            });
            if (l.addEventListener(ee, (w) => r == null ? void 0 : r(w), { once: !0 }), Z(l, u), !u.defaultPrevented && !c.metaKey) {
              const w = new CustomEvent(A, {
                bubbles: !0,
                cancelable: !0
              });
              Z(l, w);
            }
          },
          { checkForDefaultPrevented: !1 }
        )
      }
    ) });
  }
);
ge.displayName = ot;
var q = "NavigationMenuIndicator", pe = s.forwardRef((e, t) => {
  const { forceMount: o, ...i } = e, r = T(q, e.__scopeNavigationMenu), a = !!r.value;
  return r.indicatorTrack ? Ge.createPortal(
    /* @__PURE__ */ n.jsx(K, { present: o || a, children: /* @__PURE__ */ n.jsx(at, { ...i, ref: t }) }),
    r.indicatorTrack
  ) : null;
});
pe.displayName = q;
var at = s.forwardRef((e, t) => {
  const { __scopeNavigationMenu: o, ...i } = e, r = T(q, o), a = ie(o), [c, l] = s.useState(
    null
  ), [u, w] = s.useState(null), d = r.orientation === "horizontal", g = !!r.value;
  s.useEffect(() => {
    var p;
    const h = (p = a().find((N) => N.value === r.value)) == null ? void 0 : p.ref.current;
    h && l(h);
  }, [a, r.value]);
  const M = () => {
    c && w({
      size: d ? c.offsetWidth : c.offsetHeight,
      offset: d ? c.offsetLeft : c.offsetTop
    });
  };
  return H(c, M), H(r.indicatorTrack, M), u ? /* @__PURE__ */ n.jsx(
    I.div,
    {
      "aria-hidden": !0,
      "data-state": g ? "visible" : "hidden",
      "data-orientation": r.orientation,
      ...i,
      ref: t,
      style: {
        position: "absolute",
        ...d ? {
          left: 0,
          width: u.size + "px",
          transform: `translateX(${u.offset}px)`
        } : {
          top: 0,
          height: u.size + "px",
          transform: `translateY(${u.offset}px)`
        },
        ...i.style
      }
    }
  ) : null;
}), F = "NavigationMenuContent", xe = s.forwardRef((e, t) => {
  const { forceMount: o, ...i } = e, r = T(F, e.__scopeNavigationMenu), a = fe(F, e.__scopeNavigationMenu), c = O(a.contentRef, t), l = a.value === r.value, u = {
    value: a.value,
    triggerRef: a.triggerRef,
    focusProxyRef: a.focusProxyRef,
    wasEscapeCloseRef: a.wasEscapeCloseRef,
    onContentFocusOutside: a.onContentFocusOutside,
    onRootContentClose: a.onRootContentClose,
    ...i
  };
  return r.viewport ? /* @__PURE__ */ n.jsx(rt, { forceMount: o, ...u, ref: c }) : /* @__PURE__ */ n.jsx(K, { present: o || l, children: /* @__PURE__ */ n.jsx(
    we,
    {
      "data-state": J(l),
      ...u,
      ref: c,
      onPointerEnter: E(e.onPointerEnter, r.onContentEnter),
      onPointerLeave: E(
        e.onPointerLeave,
        L(r.onContentLeave)
      ),
      style: {
        // Prevent interaction when animating out
        pointerEvents: !l && r.isRootMenu ? "none" : void 0,
        ...u.style
      }
    }
  ) });
});
xe.displayName = F;
var rt = s.forwardRef((e, t) => {
  const o = T(F, e.__scopeNavigationMenu), { onViewportContentChange: i, onViewportContentRemove: r } = o;
  return z(() => {
    i(e.value, {
      ref: t,
      ...e
    });
  }, [e, t, i]), z(() => () => r(e.value), [e.value, r]), null;
}), A = "navigationMenu.rootContentDismiss", we = s.forwardRef((e, t) => {
  const {
    __scopeNavigationMenu: o,
    value: i,
    triggerRef: r,
    focusProxyRef: a,
    wasEscapeCloseRef: c,
    onRootContentClose: l,
    onContentFocusOutside: u,
    ...w
  } = e, d = T(F, o), g = s.useRef(null), M = O(g, t), R = Me(d.baseId, i), h = Re(d.baseId, i), p = ie(o), N = s.useRef(null), { onItemDismiss: y } = d;
  s.useEffect(() => {
    const v = g.current;
    if (d.isRootMenu && v) {
      const m = () => {
        var f;
        y(), l(), v.contains(document.activeElement) && ((f = r.current) == null || f.focus());
      };
      return v.addEventListener(A, m), () => v.removeEventListener(A, m);
    }
  }, [d.isRootMenu, e.value, r, y, l]);
  const j = s.useMemo(() => {
    const m = p().map((D) => D.value);
    d.dir === "rtl" && m.reverse();
    const f = m.indexOf(d.value), C = m.indexOf(d.previousValue), b = i === d.value, _ = C === m.indexOf(i);
    if (!b && !_) return N.current;
    const x = (() => {
      if (f !== C) {
        if (b && C !== -1) return f > C ? "from-end" : "from-start";
        if (_ && f !== -1) return f > C ? "to-start" : "to-end";
      }
      return null;
    })();
    return N.current = x, x;
  }, [d.previousValue, d.value, d.dir, p, i]);
  return /* @__PURE__ */ n.jsx(Ne, { asChild: !0, children: /* @__PURE__ */ n.jsx(
    ze,
    {
      id: h,
      "aria-labelledby": R,
      "data-motion": j,
      "data-orientation": d.orientation,
      ...w,
      ref: M,
      disableOutsidePointerEvents: !1,
      onDismiss: () => {
        var m;
        const v = new Event(A, {
          bubbles: !0,
          cancelable: !0
        });
        (m = g.current) == null || m.dispatchEvent(v);
      },
      onFocusOutside: E(e.onFocusOutside, (v) => {
        var f;
        u();
        const m = v.target;
        (f = d.rootNavigationMenu) != null && f.contains(m) && v.preventDefault();
      }),
      onPointerDownOutside: E(e.onPointerDownOutside, (v) => {
        var b;
        const m = v.target, f = p().some((_) => {
          var x;
          return (x = _.ref.current) == null ? void 0 : x.contains(m);
        }), C = d.isRootMenu && ((b = d.viewport) == null ? void 0 : b.contains(m));
        (f || C || !d.isRootMenu) && v.preventDefault();
      }),
      onKeyDown: E(e.onKeyDown, (v) => {
        var C;
        const m = v.altKey || v.ctrlKey || v.metaKey;
        if (v.key === "Tab" && !m) {
          const b = B(v.currentTarget), _ = document.activeElement, x = b.findIndex((Oe) => Oe === _), V = v.shiftKey ? b.slice(0, x).reverse() : b.slice(x + 1, b.length);
          X(V) ? v.preventDefault() : (C = a.current) == null || C.focus();
        }
      }),
      onEscapeKeyDown: E(e.onEscapeKeyDown, (v) => {
        c.current = !0;
      })
    }
  ) });
}), Q = "NavigationMenuViewport", he = s.forwardRef((e, t) => {
  const { forceMount: o, ...i } = e, a = !!T(Q, e.__scopeNavigationMenu).value;
  return /* @__PURE__ */ n.jsx(K, { present: o || a, children: /* @__PURE__ */ n.jsx(it, { ...i, ref: t }) });
});
he.displayName = Q;
var it = s.forwardRef((e, t) => {
  const { __scopeNavigationMenu: o, children: i, ...r } = e, a = T(Q, o), c = O(t, a.onViewportChange), l = et(
    F,
    e.__scopeNavigationMenu
  ), [u, w] = s.useState(null), [d, g] = s.useState(null), M = u ? (u == null ? void 0 : u.width) + "px" : void 0, R = u ? (u == null ? void 0 : u.height) + "px" : void 0, h = !!a.value, p = h ? a.value : a.previousValue;
  return H(d, () => {
    d && w({ width: d.offsetWidth, height: d.offsetHeight });
  }), /* @__PURE__ */ n.jsx(
    I.div,
    {
      "data-state": J(h),
      "data-orientation": a.orientation,
      ...r,
      ref: c,
      style: {
        // Prevent interaction when animating out
        pointerEvents: !h && a.isRootMenu ? "none" : void 0,
        "--radix-navigation-menu-viewport-width": M,
        "--radix-navigation-menu-viewport-height": R,
        ...r.style
      },
      onPointerEnter: E(e.onPointerEnter, a.onContentEnter),
      onPointerLeave: E(e.onPointerLeave, L(a.onContentLeave)),
      children: Array.from(l.items).map(([y, { ref: j, forceMount: v, ...m }]) => {
        const f = p === y;
        return /* @__PURE__ */ n.jsx(K, { present: v || f, children: /* @__PURE__ */ n.jsx(
          we,
          {
            ...m,
            ref: $e(j, (C) => {
              f && C && g(C);
            })
          }
        ) }, y);
      })
    }
  );
}), st = "FocusGroup", Ne = s.forwardRef(
  (e, t) => {
    const { __scopeNavigationMenu: o, ...i } = e, r = T(st, o);
    return /* @__PURE__ */ n.jsx($.Provider, { scope: o, children: /* @__PURE__ */ n.jsx($.Slot, { scope: o, children: /* @__PURE__ */ n.jsx(I.div, { dir: r.dir, ...i, ref: t }) }) });
  }
), te = ["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown"], ct = "FocusGroupItem", Ce = s.forwardRef(
  (e, t) => {
    const { __scopeNavigationMenu: o, ...i } = e, r = Qe(o), a = T(ct, o);
    return /* @__PURE__ */ n.jsx($.ItemSlot, { scope: o, children: /* @__PURE__ */ n.jsx(
      I.button,
      {
        ...i,
        ref: t,
        onKeyDown: E(e.onKeyDown, (c) => {
          if (["Home", "End", ...te].includes(c.key)) {
            let u = r().map((g) => g.ref.current);
            if ([a.dir === "rtl" ? "ArrowRight" : "ArrowLeft", "ArrowUp", "End"].includes(c.key) && u.reverse(), te.includes(c.key)) {
              const g = u.indexOf(c.currentTarget);
              u = u.slice(g + 1);
            }
            setTimeout(() => X(u)), c.preventDefault();
          }
        })
      }
    ) });
  }
);
function B(e) {
  const t = [], o = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (i) => {
      const r = i.tagName === "INPUT" && i.type === "hidden";
      return i.disabled || i.hidden || r ? NodeFilter.FILTER_SKIP : i.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  for (; o.nextNode(); ) t.push(o.currentNode);
  return t;
}
function X(e) {
  const t = document.activeElement;
  return e.some((o) => o === t ? !0 : (o.focus(), document.activeElement !== t));
}
function ut(e) {
  return e.forEach((t) => {
    t.dataset.tabindex = t.getAttribute("tabindex") || "", t.setAttribute("tabindex", "-1");
  }), () => {
    e.forEach((t) => {
      const o = t.dataset.tabindex;
      t.setAttribute("tabindex", o);
    });
  };
}
function H(e, t) {
  const o = S(t);
  z(() => {
    let i = 0;
    if (e) {
      const r = new ResizeObserver(() => {
        cancelAnimationFrame(i), i = window.requestAnimationFrame(o);
      });
      return r.observe(e), () => {
        window.cancelAnimationFrame(i), r.unobserve(e);
      };
    }
  }, [e, o]);
}
function J(e) {
  return e ? "open" : "closed";
}
function Me(e, t) {
  return `${e}-trigger-${t}`;
}
function Re(e, t) {
  return `${e}-content-${t}`;
}
function L(e) {
  return (t) => t.pointerType === "mouse" ? e(t) : void 0;
}
var ye = se, Ee = le, lt = ve, be = me, dt = ge, Te = pe, Ie = xe, je = he;
const Pe = s.forwardRef(({ className: e, children: t, ...o }, i) => /* @__PURE__ */ n.jsxs(
  ye,
  {
    ref: i,
    className: P(
      "relative z-10 flex max-w-max flex-1 items-center justify-center",
      e
    ),
    ...o,
    children: [
      t,
      /* @__PURE__ */ n.jsx(Fe, {})
    ]
  }
));
Pe.displayName = ye.displayName;
const _e = s.forwardRef(({ className: e, ...t }, o) => /* @__PURE__ */ n.jsx(
  Ee,
  {
    ref: o,
    className: P(
      "group flex flex-1 list-none items-center justify-center space-x-1",
      e
    ),
    ...t
  }
));
_e.displayName = Ee.displayName;
const ft = lt, De = Ue(
  "group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=open]:text-accent-foreground data-[state=open]:bg-accent/50 data-[state=open]:hover:bg-accent data-[state=open]:focus:bg-accent"
), Se = s.forwardRef(({ className: e, children: t, ...o }, i) => /* @__PURE__ */ n.jsxs(
  be,
  {
    ref: i,
    className: P(De(), "group", e),
    ...o,
    children: [
      t,
      " ",
      /* @__PURE__ */ n.jsx(
        Be,
        {
          className: "relative top-[1px] ml-1 h-3 w-3 transition duration-300 group-data-[state=open]:rotate-180",
          "aria-hidden": "true"
        }
      )
    ]
  }
));
Se.displayName = be.displayName;
const ke = s.forwardRef(({ className: e, ...t }, o) => /* @__PURE__ */ n.jsx(
  Ie,
  {
    ref: o,
    className: P(
      "left-0 top-0 w-full data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 md:absolute md:w-auto ",
      e
    ),
    ...t
  }
));
ke.displayName = Ie.displayName;
const ne = dt, Fe = s.forwardRef(({ className: e, ...t }, o) => /* @__PURE__ */ n.jsx("div", { className: P("absolute left-0 top-full flex justify-center"), children: /* @__PURE__ */ n.jsx(
  je,
  {
    className: P(
      "origin-top-center relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 md:w-[var(--radix-navigation-menu-viewport-width)]",
      e
    ),
    ref: o,
    ...t
  }
) }));
Fe.displayName = je.displayName;
const vt = s.forwardRef(({ className: e, ...t }, o) => /* @__PURE__ */ n.jsx(
  Te,
  {
    ref: o,
    className: P(
      "top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in",
      e
    ),
    ...t,
    children: /* @__PURE__ */ n.jsx("div", { className: "relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border shadow-md" })
  }
));
vt.displayName = Te.displayName;
function pt({ config: e }) {
  const { props: t } = e, { items: o, orientation: i = "horizontal", className: r } = t;
  return /* @__PURE__ */ n.jsx(Pe, { orientation: i, className: P(r), children: /* @__PURE__ */ n.jsx(_e, { children: o.map((a, c) => /* @__PURE__ */ n.jsx(ft, { children: a.href && !a.content && !a.items ? /* @__PURE__ */ n.jsx(
    ne,
    {
      href: a.href,
      className: De(),
      children: a.label
    }
  ) : /* @__PURE__ */ n.jsxs(n.Fragment, { children: [
    /* @__PURE__ */ n.jsx(Se, { children: a.label }),
    /* @__PURE__ */ n.jsx(ke, { children: a.content ? /* @__PURE__ */ n.jsx("div", { className: "grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]", children: a.content.map((l) => /* @__PURE__ */ n.jsx(He.Fragment, { children: We(l) }, l.id)) }) : a.items ? /* @__PURE__ */ n.jsx("ul", { className: "grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]", children: a.items.map((l, u) => {
      const w = l.icon ? Ye[l.icon] : null;
      return /* @__PURE__ */ n.jsx("li", { children: /* @__PURE__ */ n.jsx(ne, { asChild: !0, children: /* @__PURE__ */ n.jsxs(
        "a",
        {
          href: l.href,
          className: P(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
          ),
          children: [
            /* @__PURE__ */ n.jsxs("div", { className: "flex items-center gap-2", children: [
              w && /* @__PURE__ */ n.jsx(w, { className: "h-4 w-4" }),
              /* @__PURE__ */ n.jsx("div", { className: "text-sm font-medium leading-none", children: l.label })
            ] }),
            l.description && /* @__PURE__ */ n.jsx("p", { className: "line-clamp-2 text-sm leading-snug text-muted-foreground", children: l.description })
          ]
        }
      ) }) }, u);
    }) }) : null })
  ] }) }, c)) }) });
}
export {
  pt as NavigationMenuComponent
};
