import { j as e, c as m, F as x, D as p } from "./index-BxMkEt18.js";
function f({ config: i }) {
  const { props: a, children: s } = i, {
    icon: t,
    title: c,
    description: l,
    action: n,
    className: r
  } = a;
  return /* @__PURE__ */ e.jsx(
    "div",
    {
      className: m(
        "flex flex-col items-center justify-center p-8 text-center",
        "min-h-[400px] w-full",
        r
      ),
      role: "status",
      "aria-live": "polite",
      children: /* @__PURE__ */ e.jsxs("div", { className: "flex flex-col items-center gap-4 max-w-md", children: [
        /* @__PURE__ */ e.jsx("div", { className: "rounded-full bg-muted p-4", "aria-hidden": "true", children: t ? /* @__PURE__ */ e.jsx("span", { className: "text-4xl", children: t }) : /* @__PURE__ */ e.jsx(x, { className: "h-10 w-10 text-muted-foreground" }) }),
        /* @__PURE__ */ e.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ e.jsx("h3", { className: "text-lg font-semibold text-foreground", children: c }),
          l && /* @__PURE__ */ e.jsx("p", { className: "text-sm text-muted-foreground", children: l })
        ] }),
        n && /* @__PURE__ */ e.jsx("div", { className: "mt-2", children: /* @__PURE__ */ e.jsx(p, { config: n }) }),
        s && s.length > 0 && /* @__PURE__ */ e.jsx("div", { className: "mt-4 w-full", children: s.map((d, o) => /* @__PURE__ */ e.jsx("div", {}, d.id || o)) })
      ] })
    }
  );
}
export {
  f as EmptyComponent
};
