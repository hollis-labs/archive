import { j as e, c as n } from "./index-BYboRAHg.js";
import * as f from "react";
const i = f.forwardRef(
  ({ className: r, value: l = 0, ...t }, a) => /* @__PURE__ */ e.jsx(
    "div",
    {
      ref: a,
      className: n(
        "relative h-2 w-full overflow-hidden rounded-full bg-secondary",
        r
      ),
      ...t,
      children: /* @__PURE__ */ e.jsx(
        "div",
        {
          className: "h-full w-full flex-1 bg-primary transition-all",
          style: { transform: `translateX(-${100 - (l || 0)}%)` }
        }
      )
    }
  )
);
i.displayName = "Progress";
function x({ config: r }) {
  const { props: l } = r, {
    value: t = 0,
    showLabel: a = !1,
    variant: o = "default",
    size: d = "default",
    className: c
  } = l, s = Math.min(Math.max(t, 0), 100), m = {
    default: "[&>div]:bg-primary",
    success: "[&>div]:bg-green-600",
    error: "[&>div]:bg-destructive",
    warning: "[&>div]:bg-yellow-500"
  }, u = {
    sm: "h-1",
    default: "h-2",
    lg: "h-3"
  };
  return /* @__PURE__ */ e.jsxs("div", { className: "w-full space-y-2", children: [
    /* @__PURE__ */ e.jsx(
      i,
      {
        value: s,
        className: n(
          u[d],
          m[o],
          c
        ),
        "aria-valuenow": s,
        "aria-valuemin": 0,
        "aria-valuemax": 100,
        "aria-label": a ? `Progress: ${s}%` : "Progress"
      }
    ),
    a && /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between text-xs text-muted-foreground", children: [
      /* @__PURE__ */ e.jsxs("span", { children: [
        s,
        "%"
      ] }),
      s === 100 && /* @__PURE__ */ e.jsx("span", { className: "text-green-600 font-medium", children: "Complete" })
    ] })
  ] });
}
export {
  x as ProgressComponent
};
