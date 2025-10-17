import { j as e, c } from "./badge-DBvLZUPk.js";
function p({ config: s }) {
  const { props: t } = s, { keys: o, className: r } = t;
  return /* @__PURE__ */ e.jsx(
    "kbd",
    {
      className: c(
        "pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100",
        r
      ),
      children: o.map((a, n) => /* @__PURE__ */ e.jsxs("span", { className: "inline-flex items-center gap-1", children: [
        n > 0 && /* @__PURE__ */ e.jsx("span", { className: "text-xs", children: "+" }),
        /* @__PURE__ */ e.jsx("span", { children: a })
      ] }, n))
    }
  );
}
export {
  p as KbdComponent
};
