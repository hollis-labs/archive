import { j as u, d as J, a6 as H, E as Q, b as Z, a7 as ee, e as S, a8 as te, P as oe, f as g, g as G, a9 as re, af as ne, ag as se, ai as ae, aj as ie, ah as le, c as F, r as I } from "./index-DYB5mfQF.js";
import * as s from "react";
var [_] = J("Tooltip", [
  H
]), D = H(), $ = "TooltipProvider", ce = 700, O = "tooltip.open", [ue, A] = _($), B = (t) => {
  const {
    __scopeTooltip: o,
    delayDuration: e = ce,
    skipDelayDuration: r = 300,
    disableHoverableContent: n = !1,
    children: i
  } = t, l = s.useRef(!0), p = s.useRef(!1), a = s.useRef(0);
  return s.useEffect(() => {
    const f = a.current;
    return () => window.clearTimeout(f);
  }, []), /* @__PURE__ */ u.jsx(
    ue,
    {
      scope: o,
      isOpenDelayedRef: l,
      delayDuration: e,
      onOpen: s.useCallback(() => {
        window.clearTimeout(a.current), l.current = !1;
      }, []),
      onClose: s.useCallback(() => {
        window.clearTimeout(a.current), a.current = window.setTimeout(
          () => l.current = !0,
          r
        );
      }, [r]),
      isPointerInTransitRef: p,
      onPointerInTransitChange: s.useCallback((f) => {
        p.current = f;
      }, []),
      disableHoverableContent: n,
      children: i
    }
  );
};
B.displayName = $;
var R = "Tooltip", [de, j] = _(R), q = (t) => {
  const {
    __scopeTooltip: o,
    children: e,
    open: r,
    defaultOpen: n,
    onOpenChange: i,
    disableHoverableContent: l,
    delayDuration: p
  } = t, a = A(R, t.__scopeTooltip), f = D(o), [c, h] = s.useState(null), v = Q(), d = s.useRef(0), x = l ?? a.disableHoverableContent, T = p ?? a.delayDuration, m = s.useRef(!1), [C, y] = Z({
    prop: r,
    defaultProp: n ?? !1,
    onChange: (M) => {
      M ? (a.onOpen(), document.dispatchEvent(new CustomEvent(O))) : a.onClose(), i == null || i(M);
    },
    caller: R
  }), w = s.useMemo(() => C ? m.current ? "delayed-open" : "instant-open" : "closed", [C]), P = s.useCallback(() => {
    window.clearTimeout(d.current), d.current = 0, m.current = !1, y(!0);
  }, [y]), E = s.useCallback(() => {
    window.clearTimeout(d.current), d.current = 0, y(!1);
  }, [y]), N = s.useCallback(() => {
    window.clearTimeout(d.current), d.current = window.setTimeout(() => {
      m.current = !0, y(!0), d.current = 0;
    }, T);
  }, [T, y]);
  return s.useEffect(() => () => {
    d.current && (window.clearTimeout(d.current), d.current = 0);
  }, []), /* @__PURE__ */ u.jsx(ee, { ...f, children: /* @__PURE__ */ u.jsx(
    de,
    {
      scope: o,
      contentId: v,
      open: C,
      stateAttribute: w,
      trigger: c,
      onTriggerChange: h,
      onTriggerEnter: s.useCallback(() => {
        a.isOpenDelayedRef.current ? N() : P();
      }, [a.isOpenDelayedRef, N, P]),
      onTriggerLeave: s.useCallback(() => {
        x ? E() : (window.clearTimeout(d.current), d.current = 0);
      }, [E, x]),
      onOpen: P,
      onClose: E,
      disableHoverableContent: x,
      children: e
    }
  ) });
};
q.displayName = R;
var L = "TooltipTrigger", z = s.forwardRef(
  (t, o) => {
    const { __scopeTooltip: e, ...r } = t, n = j(L, e), i = A(L, e), l = D(e), p = s.useRef(null), a = S(o, p, n.onTriggerChange), f = s.useRef(!1), c = s.useRef(!1), h = s.useCallback(() => f.current = !1, []);
    return s.useEffect(() => () => document.removeEventListener("pointerup", h), [h]), /* @__PURE__ */ u.jsx(te, { asChild: !0, ...l, children: /* @__PURE__ */ u.jsx(
      oe.button,
      {
        "aria-describedby": n.open ? n.contentId : void 0,
        "data-state": n.stateAttribute,
        ...r,
        ref: a,
        onPointerMove: g(t.onPointerMove, (v) => {
          v.pointerType !== "touch" && !c.current && !i.isPointerInTransitRef.current && (n.onTriggerEnter(), c.current = !0);
        }),
        onPointerLeave: g(t.onPointerLeave, () => {
          n.onTriggerLeave(), c.current = !1;
        }),
        onPointerDown: g(t.onPointerDown, () => {
          n.open && n.onClose(), f.current = !0, document.addEventListener("pointerup", h, { once: !0 });
        }),
        onFocus: g(t.onFocus, () => {
          f.current || n.onOpen();
        }),
        onBlur: g(t.onBlur, n.onClose),
        onClick: g(t.onClick, n.onClose)
      }
    ) });
  }
);
z.displayName = L;
var k = "TooltipPortal", [pe, fe] = _(k, {
  forceMount: void 0
}), U = (t) => {
  const { __scopeTooltip: o, forceMount: e, children: r, container: n } = t, i = j(k, o);
  return /* @__PURE__ */ u.jsx(pe, { scope: o, forceMount: e, children: /* @__PURE__ */ u.jsx(G, { present: e || i.open, children: /* @__PURE__ */ u.jsx(re, { asChild: !0, container: n, children: r }) }) });
};
U.displayName = k;
var b = "TooltipContent", V = s.forwardRef(
  (t, o) => {
    const e = fe(b, t.__scopeTooltip), { forceMount: r = e.forceMount, side: n = "top", ...i } = t, l = j(b, t.__scopeTooltip);
    return /* @__PURE__ */ u.jsx(G, { present: r || l.open, children: l.disableHoverableContent ? /* @__PURE__ */ u.jsx(Y, { side: n, ...i, ref: o }) : /* @__PURE__ */ u.jsx(he, { side: n, ...i, ref: o }) });
  }
), he = s.forwardRef((t, o) => {
  const e = j(b, t.__scopeTooltip), r = A(b, t.__scopeTooltip), n = s.useRef(null), i = S(o, n), [l, p] = s.useState(null), { trigger: a, onClose: f } = e, c = n.current, { onPointerInTransitChange: h } = r, v = s.useCallback(() => {
    p(null), h(!1);
  }, [h]), d = s.useCallback(
    (x, T) => {
      const m = x.currentTarget, C = { x: x.clientX, y: x.clientY }, y = ye(C, m.getBoundingClientRect()), w = Ce(C, y), P = ge(T.getBoundingClientRect()), E = we([...w, ...P]);
      p(E), h(!0);
    },
    [h]
  );
  return s.useEffect(() => () => v(), [v]), s.useEffect(() => {
    if (a && c) {
      const x = (m) => d(m, c), T = (m) => d(m, a);
      return a.addEventListener("pointerleave", x), c.addEventListener("pointerleave", T), () => {
        a.removeEventListener("pointerleave", x), c.removeEventListener("pointerleave", T);
      };
    }
  }, [a, c, d, v]), s.useEffect(() => {
    if (l) {
      const x = (T) => {
        const m = T.target, C = { x: T.clientX, y: T.clientY }, y = (a == null ? void 0 : a.contains(m)) || (c == null ? void 0 : c.contains(m)), w = !be(C, l);
        y ? v() : w && (v(), f());
      };
      return document.addEventListener("pointermove", x), () => document.removeEventListener("pointermove", x);
    }
  }, [a, c, l, f, v]), /* @__PURE__ */ u.jsx(Y, { ...t, ref: i });
}), [ve, xe] = _(R, { isInside: !1 }), me = ae("TooltipContent"), Y = s.forwardRef(
  (t, o) => {
    const {
      __scopeTooltip: e,
      children: r,
      "aria-label": n,
      onEscapeKeyDown: i,
      onPointerDownOutside: l,
      ...p
    } = t, a = j(b, e), f = D(e), { onClose: c } = a;
    return s.useEffect(() => (document.addEventListener(O, c), () => document.removeEventListener(O, c)), [c]), s.useEffect(() => {
      if (a.trigger) {
        const h = (v) => {
          const d = v.target;
          d != null && d.contains(a.trigger) && c();
        };
        return window.addEventListener("scroll", h, { capture: !0 }), () => window.removeEventListener("scroll", h, { capture: !0 });
      }
    }, [a.trigger, c]), /* @__PURE__ */ u.jsx(
      ne,
      {
        asChild: !0,
        disableOutsidePointerEvents: !1,
        onEscapeKeyDown: i,
        onPointerDownOutside: l,
        onFocusOutside: (h) => h.preventDefault(),
        onDismiss: c,
        children: /* @__PURE__ */ u.jsxs(
          se,
          {
            "data-state": a.stateAttribute,
            ...f,
            ...p,
            ref: o,
            style: {
              ...p.style,
              "--radix-tooltip-content-transform-origin": "var(--radix-popper-transform-origin)",
              "--radix-tooltip-content-available-width": "var(--radix-popper-available-width)",
              "--radix-tooltip-content-available-height": "var(--radix-popper-available-height)",
              "--radix-tooltip-trigger-width": "var(--radix-popper-anchor-width)",
              "--radix-tooltip-trigger-height": "var(--radix-popper-anchor-height)"
            },
            children: [
              /* @__PURE__ */ u.jsx(me, { children: r }),
              /* @__PURE__ */ u.jsx(ve, { scope: e, isInside: !0, children: /* @__PURE__ */ u.jsx(ie, { id: a.contentId, role: "tooltip", children: n || r }) })
            ]
          }
        )
      }
    );
  }
);
V.displayName = b;
var X = "TooltipArrow", Te = s.forwardRef(
  (t, o) => {
    const { __scopeTooltip: e, ...r } = t, n = D(e);
    return xe(
      X,
      e
    ).isInside ? null : /* @__PURE__ */ u.jsx(le, { ...n, ...r, ref: o });
  }
);
Te.displayName = X;
function ye(t, o) {
  const e = Math.abs(o.top - t.y), r = Math.abs(o.bottom - t.y), n = Math.abs(o.right - t.x), i = Math.abs(o.left - t.x);
  switch (Math.min(e, r, n, i)) {
    case i:
      return "left";
    case n:
      return "right";
    case e:
      return "top";
    case r:
      return "bottom";
    default:
      throw new Error("unreachable");
  }
}
function Ce(t, o, e = 5) {
  const r = [];
  switch (o) {
    case "top":
      r.push(
        { x: t.x - e, y: t.y + e },
        { x: t.x + e, y: t.y + e }
      );
      break;
    case "bottom":
      r.push(
        { x: t.x - e, y: t.y - e },
        { x: t.x + e, y: t.y - e }
      );
      break;
    case "left":
      r.push(
        { x: t.x + e, y: t.y - e },
        { x: t.x + e, y: t.y + e }
      );
      break;
    case "right":
      r.push(
        { x: t.x - e, y: t.y - e },
        { x: t.x - e, y: t.y + e }
      );
      break;
  }
  return r;
}
function ge(t) {
  const { top: o, right: e, bottom: r, left: n } = t;
  return [
    { x: n, y: o },
    { x: e, y: o },
    { x: e, y: r },
    { x: n, y: r }
  ];
}
function be(t, o) {
  const { x: e, y: r } = t;
  let n = !1;
  for (let i = 0, l = o.length - 1; i < o.length; l = i++) {
    const p = o[i], a = o[l], f = p.x, c = p.y, h = a.x, v = a.y;
    c > r != v > r && e < (h - f) * (r - c) / (v - c) + f && (n = !n);
  }
  return n;
}
function we(t) {
  const o = t.slice();
  return o.sort((e, r) => e.x < r.x ? -1 : e.x > r.x ? 1 : e.y < r.y ? -1 : e.y > r.y ? 1 : 0), Pe(o);
}
function Pe(t) {
  if (t.length <= 1) return t.slice();
  const o = [];
  for (let r = 0; r < t.length; r++) {
    const n = t[r];
    for (; o.length >= 2; ) {
      const i = o[o.length - 1], l = o[o.length - 2];
      if ((i.x - l.x) * (n.y - l.y) >= (i.y - l.y) * (n.x - l.x)) o.pop();
      else break;
    }
    o.push(n);
  }
  o.pop();
  const e = [];
  for (let r = t.length - 1; r >= 0; r--) {
    const n = t[r];
    for (; e.length >= 2; ) {
      const i = e[e.length - 1], l = e[e.length - 2];
      if ((i.x - l.x) * (n.y - l.y) >= (i.y - l.y) * (n.x - l.x)) e.pop();
      else break;
    }
    e.push(n);
  }
  return e.pop(), o.length === 1 && e.length === 1 && o[0].x === e[0].x && o[0].y === e[0].y ? o : o.concat(e);
}
var Ee = B, Re = q, je = z, _e = U, K = V;
const De = Ee, Oe = Re, Le = je, W = s.forwardRef(({ className: t, sideOffset: o = 4, ...e }, r) => /* @__PURE__ */ u.jsx(_e, { children: /* @__PURE__ */ u.jsx(
  K,
  {
    ref: r,
    sideOffset: o,
    className: F(
      "z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-tooltip-content-transform-origin]",
      t
    ),
    ...e
  }
) }));
W.displayName = K.displayName;
function ke({ config: t }) {
  const { props: o, children: e } = t, {
    content: r,
    side: n = "top",
    delay: i = 0,
    className: l
  } = o || {}, p = typeof r == "string" ? r : I(r), a = e && e.length > 0 ? e[0] : null;
  return a ? /* @__PURE__ */ u.jsx(De, { delayDuration: i, children: /* @__PURE__ */ u.jsxs(Oe, { children: [
    /* @__PURE__ */ u.jsx(Le, { asChild: !0, children: I(a) }),
    /* @__PURE__ */ u.jsx(W, { side: n, className: F(l), children: p })
  ] }) }) : (console.warn("TooltipComponent requires a child component"), null);
}
export {
  ke as TooltipComponent
};
