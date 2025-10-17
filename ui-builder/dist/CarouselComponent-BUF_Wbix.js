import { r, j as e, c as d, O as k, R as x } from "./badge-DBvLZUPk.js";
import { C as y } from "./chevron-left-C9E9lAoK.js";
import { C as P } from "./chevron-right-BL2YneJZ.js";
function $({ config: b }) {
  const { props: p } = b, {
    items: t = [],
    autoplay: i = !1,
    interval: m = 5e3,
    loop: n = !0,
    showDots: v = !0,
    showArrows: j = !0,
    className: h
  } = p, [s, f] = r.useState(0), [u, g] = r.useState(!1), o = r.useCallback((l) => {
    f(n ? (l + t.length) % t.length : Math.max(0, Math.min(l, t.length - 1)));
  }, [t.length, n]), N = r.useCallback(() => {
    o(s - 1);
  }, [s, o]), c = r.useCallback(() => {
    o(s + 1);
  }, [s, o]);
  if (r.useEffect(() => {
    if (!i || u || t.length <= 1) return;
    const l = setInterval(() => {
      c();
    }, m);
    return () => clearInterval(l);
  }, [i, u, m, t.length, c]), !t.length)
    return /* @__PURE__ */ e.jsx("div", { className: d("w-full h-64 flex items-center justify-center border rounded-lg", h), children: /* @__PURE__ */ e.jsx("div", { className: "text-center text-muted-foreground", children: /* @__PURE__ */ e.jsx("p", { children: "No items to display" }) }) });
  const w = n || s > 0, C = n || s < t.length - 1;
  return /* @__PURE__ */ e.jsxs(
    "div",
    {
      className: d("relative w-full overflow-hidden rounded-lg", h),
      onMouseEnter: () => g(!0),
      onMouseLeave: () => g(!1),
      children: [
        /* @__PURE__ */ e.jsx("div", { className: "relative aspect-video w-full bg-muted", children: /* @__PURE__ */ e.jsx(
          "div",
          {
            className: "flex transition-transform duration-500 ease-out h-full",
            style: { transform: `translateX(-${s * 100}%)` },
            children: t.map((l, a) => /* @__PURE__ */ e.jsx("div", { className: "min-w-full h-full flex items-center justify-center p-6", children: k(l) }, `slide-${a}`))
          }
        ) }),
        j && t.length > 1 && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          /* @__PURE__ */ e.jsx(
            x,
            {
              variant: "outline",
              size: "icon",
              className: "absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm",
              onClick: N,
              disabled: !w,
              "aria-label": "Previous slide",
              children: /* @__PURE__ */ e.jsx(y, { className: "h-4 w-4" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            x,
            {
              variant: "outline",
              size: "icon",
              className: "absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm",
              onClick: c,
              disabled: !C,
              "aria-label": "Next slide",
              children: /* @__PURE__ */ e.jsx(P, { className: "h-4 w-4" })
            }
          )
        ] }),
        v && t.length > 1 && /* @__PURE__ */ e.jsx("div", { className: "absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2", children: t.map((l, a) => /* @__PURE__ */ e.jsx(
          "button",
          {
            onClick: () => o(a),
            className: d(
              "h-2 w-2 rounded-full transition-all",
              s === a ? "bg-primary w-6" : "bg-primary/30 hover:bg-primary/50"
            ),
            "aria-label": `Go to slide ${a + 1}`
          },
          `dot-${a}`
        )) }),
        i && /* @__PURE__ */ e.jsx("div", { className: "absolute top-2 right-2 text-xs text-muted-foreground bg-background/80 backdrop-blur-sm px-2 py-1 rounded", children: u ? "Paused" : "Auto" })
      ]
    }
  );
}
export {
  $ as CarouselComponent
};
