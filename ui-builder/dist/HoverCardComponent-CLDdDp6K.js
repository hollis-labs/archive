import { a3 as H, b as k, j as i, d as M, a4 as I, a5 as U, P as W, f as l, g as $, e as z, ac as B, ad as G, ae as K, c as y, r as T } from "./index-DipMs7ol.js";
import * as n from "react";
import V from "react";
var S, b = "HoverCard", [N] = M(b, [
  H
]), w = H(), [q, E] = N(b), O = (e) => {
  const {
    __scopeHoverCard: o,
    children: r,
    open: s,
    defaultOpen: a,
    onOpenChange: d,
    openDelay: u = 700,
    closeDelay: p = 300
  } = e, c = w(o), f = n.useRef(0), v = n.useRef(0), m = n.useRef(!1), C = n.useRef(!1), [h, t] = k({
    prop: s,
    defaultProp: a ?? !1,
    onChange: d,
    caller: b
  }), x = n.useCallback(() => {
    clearTimeout(v.current), f.current = window.setTimeout(() => t(!0), u);
  }, [u, t]), g = n.useCallback(() => {
    clearTimeout(f.current), !m.current && !C.current && (v.current = window.setTimeout(() => t(!1), p));
  }, [p, t]), F = n.useCallback(() => t(!1), [t]);
  return n.useEffect(() => () => {
    clearTimeout(f.current), clearTimeout(v.current);
  }, []), /* @__PURE__ */ i.jsx(
    q,
    {
      scope: o,
      open: h,
      onOpenChange: t,
      onOpen: x,
      onClose: g,
      onDismiss: F,
      hasSelectionRef: m,
      isPointerDownOnContentRef: C,
      children: /* @__PURE__ */ i.jsx(I, { ...c, children: r })
    }
  );
};
O.displayName = b;
var _ = "HoverCardTrigger", D = n.forwardRef(
  (e, o) => {
    const { __scopeHoverCard: r, ...s } = e, a = E(_, r), d = w(r);
    return /* @__PURE__ */ i.jsx(U, { asChild: !0, ...d, children: /* @__PURE__ */ i.jsx(
      W.a,
      {
        "data-state": a.open ? "open" : "closed",
        ...s,
        ref: o,
        onPointerEnter: l(e.onPointerEnter, P(a.onOpen)),
        onPointerLeave: l(e.onPointerLeave, P(a.onClose)),
        onFocus: l(e.onFocus, a.onOpen),
        onBlur: l(e.onBlur, a.onClose),
        onTouchStart: l(e.onTouchStart, (u) => u.preventDefault())
      }
    ) });
  }
);
D.displayName = _;
var J = "HoverCardPortal", [ie, Q] = N(J, {
  forceMount: void 0
}), R = "HoverCardContent", j = n.forwardRef(
  (e, o) => {
    const r = Q(R, e.__scopeHoverCard), { forceMount: s = r.forceMount, ...a } = e, d = E(R, e.__scopeHoverCard);
    return /* @__PURE__ */ i.jsx($, { present: s || d.open, children: /* @__PURE__ */ i.jsx(
      X,
      {
        "data-state": d.open ? "open" : "closed",
        ...a,
        onPointerEnter: l(e.onPointerEnter, P(d.onOpen)),
        onPointerLeave: l(e.onPointerLeave, P(d.onClose)),
        ref: o
      }
    ) });
  }
);
j.displayName = R;
var X = n.forwardRef((e, o) => {
  const {
    __scopeHoverCard: r,
    onEscapeKeyDown: s,
    onPointerDownOutside: a,
    onFocusOutside: d,
    onInteractOutside: u,
    ...p
  } = e, c = E(R, r), f = w(r), v = n.useRef(null), m = z(o, v), [C, h] = n.useState(!1);
  return n.useEffect(() => {
    if (C) {
      const t = document.body;
      return S = t.style.userSelect || t.style.webkitUserSelect, t.style.userSelect = "none", t.style.webkitUserSelect = "none", () => {
        t.style.userSelect = S, t.style.webkitUserSelect = S;
      };
    }
  }, [C]), n.useEffect(() => {
    if (v.current) {
      const t = () => {
        h(!1), c.isPointerDownOnContentRef.current = !1, setTimeout(() => {
          var g;
          ((g = document.getSelection()) == null ? void 0 : g.toString()) !== "" && (c.hasSelectionRef.current = !0);
        });
      };
      return document.addEventListener("pointerup", t), () => {
        document.removeEventListener("pointerup", t), c.hasSelectionRef.current = !1, c.isPointerDownOnContentRef.current = !1;
      };
    }
  }, [c.isPointerDownOnContentRef, c.hasSelectionRef]), n.useEffect(() => {
    v.current && ee(v.current).forEach((x) => x.setAttribute("tabindex", "-1"));
  }), /* @__PURE__ */ i.jsx(
    B,
    {
      asChild: !0,
      disableOutsidePointerEvents: !1,
      onInteractOutside: u,
      onEscapeKeyDown: s,
      onPointerDownOutside: a,
      onFocusOutside: l(d, (t) => {
        t.preventDefault();
      }),
      onDismiss: c.onDismiss,
      children: /* @__PURE__ */ i.jsx(
        G,
        {
          ...f,
          ...p,
          onPointerDown: l(p.onPointerDown, (t) => {
            t.currentTarget.contains(t.target) && h(!0), c.hasSelectionRef.current = !1, c.isPointerDownOnContentRef.current = !0;
          }),
          ref: m,
          style: {
            ...p.style,
            userSelect: C ? "text" : void 0,
            // Safari requires prefix
            WebkitUserSelect: C ? "text" : void 0,
            "--radix-hover-card-content-transform-origin": "var(--radix-popper-transform-origin)",
            "--radix-hover-card-content-available-width": "var(--radix-popper-available-width)",
            "--radix-hover-card-content-available-height": "var(--radix-popper-available-height)",
            "--radix-hover-card-trigger-width": "var(--radix-popper-anchor-width)",
            "--radix-hover-card-trigger-height": "var(--radix-popper-anchor-height)"
          }
        }
      )
    }
  );
}), Y = "HoverCardArrow", Z = n.forwardRef(
  (e, o) => {
    const { __scopeHoverCard: r, ...s } = e, a = w(r);
    return /* @__PURE__ */ i.jsx(K, { ...a, ...s, ref: o });
  }
);
Z.displayName = Y;
function P(e) {
  return (o) => o.pointerType === "touch" ? void 0 : e();
}
function ee(e) {
  const o = [], r = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (s) => s.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP
  });
  for (; r.nextNode(); ) o.push(r.currentNode);
  return o;
}
var te = O, oe = D, A = j;
const re = te, ne = oe, L = n.forwardRef(({ className: e, align: o = "center", sideOffset: r = 4, ...s }, a) => /* @__PURE__ */ i.jsx(
  A,
  {
    ref: a,
    align: o,
    sideOffset: r,
    className: y(
      "z-50 w-64 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-hover-card-content-transform-origin]",
      e
    ),
    ...s
  }
));
L.displayName = A.displayName;
function ce({ config: e }) {
  const { props: o } = e, {
    trigger: r,
    content: s,
    openDelay: a = 200,
    closeDelay: d = 300,
    side: u = "bottom",
    align: p = "center",
    className: c
  } = o;
  return /* @__PURE__ */ i.jsxs(re, { openDelay: a, closeDelay: d, children: [
    /* @__PURE__ */ i.jsx(ne, { asChild: !0, children: T(r) }),
    /* @__PURE__ */ i.jsx(L, { side: u, align: p, className: y(c), children: s.map((f) => /* @__PURE__ */ i.jsx(V.Fragment, { children: T(f) }, f.id)) })
  ] });
}
export {
  ce as HoverCardComponent
};
