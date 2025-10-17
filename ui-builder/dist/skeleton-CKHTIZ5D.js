import { c as m, j as t } from "./badge-DBvLZUPk.js";
function x({
  className: d,
  width: a,
  height: l,
  variant: r = "rectangular",
  lines: s = 1,
  animate: o = !0,
  ...u
}) {
  const c = m(
    "bg-neutral-200 dark:bg-neutral-800",
    o && "animate-pulse",
    r === "text" && "h-4 rounded",
    r === "circular" && "rounded-full",
    r === "rectangular" && "rounded-md",
    d
  ), e = { ...u.style };
  return a && (e.width = a), l && (e.height = l), s > 1 ? /* @__PURE__ */ t.jsx("div", { className: "space-y-2", children: Array.from({ length: s }).map((i, n) => /* @__PURE__ */ t.jsx(
    "div",
    {
      className: c,
      style: {
        ...e,
        width: n === s - 1 ? "75%" : e.width || "100%"
        // Last line shorter
      }
    },
    n
  )) }) : /* @__PURE__ */ t.jsx("div", { className: c, style: e, ...u });
}
export {
  x as S
};
