import { U as p, V as x, j as a, W as h, Y as d, c as o, Z as u, X as g, s as y, _ as n, $ as r, a0 as l } from "./index-BvjF5Aq2.js";
import * as i from "react";
const T = p, k = x, b = h, c = i.forwardRef(({ className: e, ...t }, s) => /* @__PURE__ */ a.jsx(
  l,
  {
    className: o(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      e
    ),
    ...t,
    ref: s
  }
));
c.displayName = l.displayName;
const N = y(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right: "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
      }
    },
    defaultVariants: {
      side: "right"
    }
  }
), j = i.forwardRef(({ side: e = "right", className: t, children: s, ...m }, f) => /* @__PURE__ */ a.jsxs(b, { children: [
  /* @__PURE__ */ a.jsx(c, {}),
  /* @__PURE__ */ a.jsxs(
    d,
    {
      ref: f,
      className: o(N({ side: e }), t),
      ...m,
      children: [
        /* @__PURE__ */ a.jsxs(u, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary", children: [
          /* @__PURE__ */ a.jsx(g, { className: "h-4 w-4" }),
          /* @__PURE__ */ a.jsx("span", { className: "sr-only", children: "Close" })
        ] }),
        s
      ]
    }
  )
] }));
j.displayName = d.displayName;
const S = ({
  className: e,
  ...t
}) => /* @__PURE__ */ a.jsx(
  "div",
  {
    className: o(
      "flex flex-col space-y-2 text-center sm:text-left",
      e
    ),
    ...t
  }
);
S.displayName = "SheetHeader";
const w = ({
  className: e,
  ...t
}) => /* @__PURE__ */ a.jsx(
  "div",
  {
    className: o(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      e
    ),
    ...t
  }
);
w.displayName = "SheetFooter";
const v = i.forwardRef(({ className: e, ...t }, s) => /* @__PURE__ */ a.jsx(
  n,
  {
    ref: s,
    className: o("text-lg font-semibold text-foreground", e),
    ...t
  }
));
v.displayName = n.displayName;
const R = i.forwardRef(({ className: e, ...t }, s) => /* @__PURE__ */ a.jsx(
  r,
  {
    ref: s,
    className: o("text-sm text-muted-foreground", e),
    ...t
  }
));
R.displayName = r.displayName;
export {
  T as S,
  j as a,
  k as b,
  S as c,
  v as d,
  R as e,
  w as f
};
