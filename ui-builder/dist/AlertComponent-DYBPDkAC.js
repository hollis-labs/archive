import { j as e, A as p, s as g, t as h, v, w as f, c as w, x as j, y, B as A, X as C } from "./index-BtLd6ySb.js";
import { useState as N } from "react";
const b = {
  default: f,
  destructive: v,
  warning: h,
  success: g
};
function D({ config: n }) {
  const { props: c } = n, {
    variant: s = "default",
    title: a,
    description: o,
    icon: t,
    dismissible: r = !1,
    className: d
  } = c, [u, x] = N(!1);
  if (u) return null;
  const i = t ? null : b[s], m = {
    default: "default",
    destructive: "destructive",
    warning: "default",
    success: "default"
  }, l = {
    warning: "border-yellow-500/50 text-yellow-900 dark:text-yellow-400 [&>svg]:text-yellow-600",
    success: "border-green-500/50 text-green-900 dark:text-green-400 [&>svg]:text-green-600"
  };
  return /* @__PURE__ */ e.jsxs(
    p,
    {
      variant: m[s],
      className: w(
        s === "warning" && l.warning,
        s === "success" && l.success,
        r && "pr-12",
        d
      ),
      role: "alert",
      "aria-live": s === "destructive" ? "assertive" : "polite",
      children: [
        i && /* @__PURE__ */ e.jsx(i, { className: "h-4 w-4", "aria-hidden": "true" }),
        t && /* @__PURE__ */ e.jsx("span", { className: "text-xl", "aria-hidden": "true", children: t }),
        a && /* @__PURE__ */ e.jsx(j, { children: a }),
        /* @__PURE__ */ e.jsx(y, { children: o }),
        r && /* @__PURE__ */ e.jsx(
          A,
          {
            variant: "ghost",
            size: "icon",
            className: "absolute right-2 top-2 h-6 w-6 opacity-70 hover:opacity-100",
            onClick: () => x(!0),
            "aria-label": "Dismiss alert",
            children: /* @__PURE__ */ e.jsx(C, { className: "h-4 w-4" })
          }
        )
      ]
    }
  );
}
export {
  D as AlertComponent
};
