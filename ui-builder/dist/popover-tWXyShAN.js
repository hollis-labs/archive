import { a6 as A, b as $, j as c, a7 as L, d as z, E as G, e as O, P as _, f as P, a8 as b, g as w, a9 as H, aa as K, ab as U, ac as V, ad as W, ae as Z, af as q, ag as B, ah as J, c as Q } from "./index-CwxzwhG1.js";
import * as p from "react";
var C = "Popover", [E] = z(C, [
  A
]), g = A(), [X, u] = E(C), j = (e) => {
  const {
    __scopePopover: n,
    children: t,
    open: a,
    defaultOpen: o,
    onOpenChange: r,
    modal: s = !1
  } = e, i = g(n), l = p.useRef(null), [d, h] = p.useState(!1), [m, f] = $({
    prop: a,
    defaultProp: o ?? !1,
    onChange: r,
    caller: C
  });
  return /* @__PURE__ */ c.jsx(L, { ...i, children: /* @__PURE__ */ c.jsx(
    X,
    {
      scope: n,
      contentId: G(),
      triggerRef: l,
      open: m,
      onOpenChange: f,
      onOpenToggle: p.useCallback(() => f((x) => !x), [f]),
      hasCustomAnchor: d,
      onCustomAnchorAdd: p.useCallback(() => h(!0), []),
      onCustomAnchorRemove: p.useCallback(() => h(!1), []),
      modal: s,
      children: t
    }
  ) });
};
j.displayName = C;
var N = "PopoverAnchor", Y = p.forwardRef(
  (e, n) => {
    const { __scopePopover: t, ...a } = e, o = u(N, t), r = g(t), { onCustomAnchorAdd: s, onCustomAnchorRemove: i } = o;
    return p.useEffect(() => (s(), () => i()), [s, i]), /* @__PURE__ */ c.jsx(b, { ...r, ...a, ref: n });
  }
);
Y.displayName = N;
var y = "PopoverTrigger", F = p.forwardRef(
  (e, n) => {
    const { __scopePopover: t, ...a } = e, o = u(y, t), r = g(t), s = O(n, o.triggerRef), i = /* @__PURE__ */ c.jsx(
      _.button,
      {
        type: "button",
        "aria-haspopup": "dialog",
        "aria-expanded": o.open,
        "aria-controls": o.contentId,
        "data-state": k(o.open),
        ...a,
        ref: s,
        onClick: P(e.onClick, o.onOpenToggle)
      }
    );
    return o.hasCustomAnchor ? i : /* @__PURE__ */ c.jsx(b, { asChild: !0, ...r, children: i });
  }
);
F.displayName = y;
var R = "PopoverPortal", [ee, oe] = E(R, {
  forceMount: void 0
}), S = (e) => {
  const { __scopePopover: n, forceMount: t, children: a, container: o } = e, r = u(R, n);
  return /* @__PURE__ */ c.jsx(ee, { scope: n, forceMount: t, children: /* @__PURE__ */ c.jsx(w, { present: t || r.open, children: /* @__PURE__ */ c.jsx(H, { asChild: !0, container: o, children: a }) }) });
};
S.displayName = R;
var v = "PopoverContent", D = p.forwardRef(
  (e, n) => {
    const t = oe(v, e.__scopePopover), { forceMount: a = t.forceMount, ...o } = e, r = u(v, e.__scopePopover);
    return /* @__PURE__ */ c.jsx(w, { present: a || r.open, children: r.modal ? /* @__PURE__ */ c.jsx(re, { ...o, ref: n }) : /* @__PURE__ */ c.jsx(ne, { ...o, ref: n }) });
  }
);
D.displayName = v;
var te = V("PopoverContent.RemoveScroll"), re = p.forwardRef(
  (e, n) => {
    const t = u(v, e.__scopePopover), a = p.useRef(null), o = O(n, a), r = p.useRef(!1);
    return p.useEffect(() => {
      const s = a.current;
      if (s) return K(s);
    }, []), /* @__PURE__ */ c.jsx(U, { as: te, allowPinchZoom: !0, children: /* @__PURE__ */ c.jsx(
      M,
      {
        ...e,
        ref: o,
        trapFocus: t.open,
        disableOutsidePointerEvents: !0,
        onCloseAutoFocus: P(e.onCloseAutoFocus, (s) => {
          var i;
          s.preventDefault(), r.current || (i = t.triggerRef.current) == null || i.focus();
        }),
        onPointerDownOutside: P(
          e.onPointerDownOutside,
          (s) => {
            const i = s.detail.originalEvent, l = i.button === 0 && i.ctrlKey === !0, d = i.button === 2 || l;
            r.current = d;
          },
          { checkForDefaultPrevented: !1 }
        ),
        onFocusOutside: P(
          e.onFocusOutside,
          (s) => s.preventDefault(),
          { checkForDefaultPrevented: !1 }
        )
      }
    ) });
  }
), ne = p.forwardRef(
  (e, n) => {
    const t = u(v, e.__scopePopover), a = p.useRef(!1), o = p.useRef(!1);
    return /* @__PURE__ */ c.jsx(
      M,
      {
        ...e,
        ref: n,
        trapFocus: !1,
        disableOutsidePointerEvents: !1,
        onCloseAutoFocus: (r) => {
          var s, i;
          (s = e.onCloseAutoFocus) == null || s.call(e, r), r.defaultPrevented || (a.current || (i = t.triggerRef.current) == null || i.focus(), r.preventDefault()), a.current = !1, o.current = !1;
        },
        onInteractOutside: (r) => {
          var l, d;
          (l = e.onInteractOutside) == null || l.call(e, r), r.defaultPrevented || (a.current = !0, r.detail.originalEvent.type === "pointerdown" && (o.current = !0));
          const s = r.target;
          ((d = t.triggerRef.current) == null ? void 0 : d.contains(s)) && r.preventDefault(), r.detail.originalEvent.type === "focusin" && o.current && r.preventDefault();
        }
      }
    );
  }
), M = p.forwardRef(
  (e, n) => {
    const {
      __scopePopover: t,
      trapFocus: a,
      onOpenAutoFocus: o,
      onCloseAutoFocus: r,
      disableOutsidePointerEvents: s,
      onEscapeKeyDown: i,
      onPointerDownOutside: l,
      onFocusOutside: d,
      onInteractOutside: h,
      ...m
    } = e, f = u(v, t), x = g(t);
    return W(), /* @__PURE__ */ c.jsx(
      Z,
      {
        asChild: !0,
        loop: !0,
        trapped: a,
        onMountAutoFocus: o,
        onUnmountAutoFocus: r,
        children: /* @__PURE__ */ c.jsx(
          q,
          {
            asChild: !0,
            disableOutsidePointerEvents: s,
            onInteractOutside: h,
            onEscapeKeyDown: i,
            onPointerDownOutside: l,
            onFocusOutside: d,
            onDismiss: () => f.onOpenChange(!1),
            children: /* @__PURE__ */ c.jsx(
              B,
              {
                "data-state": k(f.open),
                role: "dialog",
                id: f.contentId,
                ...x,
                ...m,
                ref: n,
                style: {
                  ...m.style,
                  "--radix-popover-content-transform-origin": "var(--radix-popper-transform-origin)",
                  "--radix-popover-content-available-width": "var(--radix-popper-available-width)",
                  "--radix-popover-content-available-height": "var(--radix-popper-available-height)",
                  "--radix-popover-trigger-width": "var(--radix-popper-anchor-width)",
                  "--radix-popover-trigger-height": "var(--radix-popper-anchor-height)"
                }
              }
            )
          }
        )
      }
    );
  }
), T = "PopoverClose", ae = p.forwardRef(
  (e, n) => {
    const { __scopePopover: t, ...a } = e, o = u(T, t);
    return /* @__PURE__ */ c.jsx(
      _.button,
      {
        type: "button",
        ...a,
        ref: n,
        onClick: P(e.onClick, () => o.onOpenChange(!1))
      }
    );
  }
);
ae.displayName = T;
var se = "PopoverArrow", ce = p.forwardRef(
  (e, n) => {
    const { __scopePopover: t, ...a } = e, o = g(t);
    return /* @__PURE__ */ c.jsx(J, { ...o, ...a, ref: n });
  }
);
ce.displayName = se;
function k(e) {
  return e ? "open" : "closed";
}
var ie = j, pe = F, le = S, I = D;
const fe = ie, ve = pe, de = p.forwardRef(({ className: e, align: n = "center", sideOffset: t = 4, ...a }, o) => /* @__PURE__ */ c.jsx(le, { children: /* @__PURE__ */ c.jsx(
  I,
  {
    ref: o,
    align: n,
    sideOffset: t,
    className: Q(
      "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-popover-content-transform-origin]",
      e
    ),
    ...a
  }
) }));
de.displayName = I.displayName;
export {
  fe as P,
  ve as a,
  de as b
};
