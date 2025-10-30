import { b as u, j as n, P as g, f as v, c as f, U as b } from "./index-CwxzwhG1.js";
import * as p from "react";
var o = "Toggle", i = p.forwardRef((e, t) => {
  const { pressed: a, defaultPressed: s, onPressedChange: d, ...l } = e, [r, c] = u({
    prop: a,
    onChange: d,
    defaultProp: s ?? !1,
    caller: o
  });
  return /* @__PURE__ */ n.jsx(
    g.button,
    {
      type: "button",
      "aria-pressed": r,
      "data-state": r ? "on" : "off",
      "data-disabled": e.disabled ? "" : void 0,
      ...l,
      ref: t,
      onClick: v(e.onClick, () => {
        e.disabled || c(!r);
      })
    }
  );
});
i.displayName = o;
var m = i;
const x = b(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium hover:bg-muted hover:text-muted-foreground disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none transition-[color,box-shadow] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive whitespace-nowrap",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline: "border border-input bg-transparent shadow-xs hover:bg-accent hover:text-accent-foreground"
      },
      size: {
        default: "h-9 px-2 min-w-9",
        sm: "h-8 px-1.5 min-w-8",
        lg: "h-10 px-2.5 min-w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function w({
  className: e,
  variant: t,
  size: a,
  ...s
}) {
  return /* @__PURE__ */ n.jsx(
    m,
    {
      "data-slot": "toggle",
      className: f(x({ variant: t, size: a, className: e })),
      ...s
    }
  );
}
export {
  w as T,
  i as a,
  x as t
};
