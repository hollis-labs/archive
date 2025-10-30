import { j as e, c as i, G as x } from "./index-BtLd6ySb.js";
function f({ config: a }) {
  const { props: o } = a, { items: t, separator: n = "chevron", className: c } = o, l = () => n === "none" ? null : n === "slash" ? /* @__PURE__ */ e.jsx("span", { className: "mx-2 text-muted-foreground", children: "/" }) : /* @__PURE__ */ e.jsx(x, { className: "mx-2 h-4 w-4 text-muted-foreground" });
  return /* @__PURE__ */ e.jsx("nav", { "aria-label": "Breadcrumb", className: i("flex items-center text-sm", c), children: /* @__PURE__ */ e.jsx("ol", { className: "flex items-center gap-0", children: t.map((r, s) => {
    const m = s === t.length - 1, u = r.current || m;
    return /* @__PURE__ */ e.jsxs("li", { className: "flex items-center", children: [
      s > 0 && l(),
      u ? /* @__PURE__ */ e.jsx(
        "span",
        {
          className: "font-medium text-foreground",
          "aria-current": "page",
          children: r.label
        }
      ) : /* @__PURE__ */ e.jsx(
        "a",
        {
          href: r.href,
          className: "text-muted-foreground hover:text-foreground transition-colors",
          children: r.label
        }
      )
    ] }, s);
  }) }) });
}
export {
  f as BreadcrumbComponent
};
