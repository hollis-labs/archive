import { r as i, j as t, c as l, Q as w, R as b, X as j } from "./badge-DBvLZUPk.js";
import { C as N, T as y, a as A, I as k } from "./triangle-alert-CVEXX4qe.js";
const C = w(
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
), u = i.forwardRef(({ className: s, variant: a, ...e }, r) => /* @__PURE__ */ t.jsx(
  "div",
  {
    ref: r,
    role: "alert",
    className: l(C({ variant: a }), s),
    ...e
  }
));
u.displayName = "Alert";
const v = i.forwardRef(({ className: s, ...a }, e) => /* @__PURE__ */ t.jsx(
  "h5",
  {
    ref: e,
    className: l("mb-1 font-medium leading-none tracking-tight", s),
    ...a
  }
));
v.displayName = "AlertTitle";
const g = i.forwardRef(({ className: s, ...a }, e) => /* @__PURE__ */ t.jsx(
  "div",
  {
    ref: e,
    className: l("text-sm [&_p]:leading-relaxed", s),
    ...a
  }
));
g.displayName = "AlertDescription";
const R = {
  default: k,
  destructive: A,
  warning: y,
  success: N
};
function T({ config: s }) {
  const { props: a } = s, {
    variant: e = "default",
    title: r,
    description: x,
    icon: n,
    dismissible: c = !1,
    className: f
  } = a, [m, p] = i.useState(!1);
  if (m) return null;
  const o = n ? null : R[e], h = {
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
      variant: h[e],
      className: l(
        e === "warning" && d.warning,
        e === "success" && d.success,
        c && "pr-12",
        f
      ),
      role: "alert",
      "aria-live": e === "destructive" ? "assertive" : "polite",
      children: [
        o && /* @__PURE__ */ t.jsx(o, { className: "h-4 w-4", "aria-hidden": "true" }),
        n && /* @__PURE__ */ t.jsx("span", { className: "text-xl", "aria-hidden": "true", children: n }),
        r && /* @__PURE__ */ t.jsx(v, { children: r }),
        /* @__PURE__ */ t.jsx(g, { children: x }),
        c && /* @__PURE__ */ t.jsx(
          b,
          {
            variant: "ghost",
            size: "icon",
            className: "absolute right-2 top-2 h-6 w-6 opacity-70 hover:opacity-100",
            onClick: () => p(!0),
            "aria-label": "Dismiss alert",
            children: /* @__PURE__ */ t.jsx(j, { className: "h-4 w-4" })
          }
        )
      ]
    }
  );
}
export {
  T as AlertComponent
};
