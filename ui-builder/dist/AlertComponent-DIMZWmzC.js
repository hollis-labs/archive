import { j as t, c as i, s as h, t as b, v as j, w as N, x as y, B as A, X as k } from "./index-BvjF5Aq2.js";
import * as n from "react";
import { useState as C } from "react";
const R = h(
  "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive: "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
), u = n.forwardRef(({ className: s, variant: a, ...e }, r) => /* @__PURE__ */ t.jsx(
  "div",
  {
    ref: r,
    role: "alert",
    className: i(R({ variant: a }), s),
    ...e
  }
));
u.displayName = "Alert";
const v = n.forwardRef(({ className: s, ...a }, e) => /* @__PURE__ */ t.jsx(
  "h5",
  {
    ref: e,
    className: i("mb-1 font-medium leading-none tracking-tight", s),
    ...a
  }
));
v.displayName = "AlertTitle";
const g = n.forwardRef(({ className: s, ...a }, e) => /* @__PURE__ */ t.jsx(
  "div",
  {
    ref: e,
    className: i("text-sm [&_p]:leading-relaxed", s),
    ...a
  }
));
g.displayName = "AlertDescription";
const D = {
  default: y,
  destructive: N,
  warning: j,
  success: b
};
function T({ config: s }) {
  const { props: a } = s, {
    variant: e = "default",
    title: r,
    description: m,
    icon: l,
    dismissible: c = !1,
    className: x
  } = a, [f, p] = C(!1);
  if (f) return null;
  const o = l ? null : D[e], w = {
    default: "default",
    destructive: "destructive",
    warning: "default",
    success: "default"
  }, d = {
    warning: "border-yellow-500/50 text-yellow-900 dark:text-yellow-400 [&>svg]:text-yellow-600",
    success: "border-green-500/50 text-green-900 dark:text-green-400 [&>svg]:text-green-600"
  };
  return /* @__PURE__ */ t.jsxs(
    u,
    {
      variant: w[e],
      className: i(
        e === "warning" && d.warning,
        e === "success" && d.success,
        c && "pr-12",
        x
      ),
      role: "alert",
      "aria-live": e === "destructive" ? "assertive" : "polite",
      children: [
        o && /* @__PURE__ */ t.jsx(o, { className: "h-4 w-4", "aria-hidden": "true" }),
        l && /* @__PURE__ */ t.jsx("span", { className: "text-xl", "aria-hidden": "true", children: l }),
        r && /* @__PURE__ */ t.jsx(v, { children: r }),
        /* @__PURE__ */ t.jsx(g, { children: m }),
        c && /* @__PURE__ */ t.jsx(
          A,
          {
            variant: "ghost",
            size: "icon",
            className: "absolute right-2 top-2 h-6 w-6 opacity-70 hover:opacity-100",
            onClick: () => p(!0),
            "aria-label": "Dismiss alert",
            children: /* @__PURE__ */ t.jsx(k, { className: "h-4 w-4" })
          }
        )
      ]
    }
  );
}
export {
  T as AlertComponent
};
