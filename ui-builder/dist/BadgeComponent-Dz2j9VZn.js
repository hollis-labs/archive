import { j as u, B as d, r as l, c as f } from "./badge-DBvLZUPk.js";
import { I as a } from "./lucide-react-CpYArdkX.js";
const h = {
  sm: "text-[10px] px-1.5 py-0.5",
  md: "text-xs px-2.5 py-0.5",
  lg: "text-sm px-3 py-1"
};
function I(c) {
  const {
    text: o,
    variant: r = "default",
    size: m = "md",
    shape: i = "soft",
    iconLeft: e,
    iconRight: s,
    className: p,
    children: x
  } = c, t = e ? a[e] : null, n = s ? a[s] : null;
  return /* @__PURE__ */ u.jsxs(
    d,
    {
      variant: r,
      className: f(
        "inline-flex items-center gap-1",
        h[m],
        i === "pill" && "rounded-full",
        p
      ),
      children: [
        t ? l.createElement(t, { className: "h-3.5 w-3.5" }) : null,
        x ?? o,
        n ? l.createElement(n, { className: "h-3.5 w-3.5" }) : null
      ]
    }
  );
}
export {
  I as BadgeComponent
};
