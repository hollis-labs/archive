import { j as e, c as d } from "./badge-DBvLZUPk.js";
import { ButtonComponent as x } from "./ButtonComponent-BuodL-bW.js";
import { F as p } from "./file-question-mark-lfXeE_hZ.js";
function j({ config: n }) {
  const { props: r, children: s } = n, {
    icon: t,
    title: a,
    description: l,
    action: i,
    className: c
  } = r;
  return /* @__PURE__ */ e.jsx(
    "div",
    {
      className: d(
        "flex flex-col items-center justify-center p-8 text-center",
        "min-h-[400px] w-full",
        c
      ),
      role: "status",
      "aria-live": "polite",
      children: /* @__PURE__ */ e.jsxs("div", { className: "flex flex-col items-center gap-4 max-w-md", children: [
        /* @__PURE__ */ e.jsx("div", { className: "rounded-full bg-muted p-4", "aria-hidden": "true", children: t ? /* @__PURE__ */ e.jsx("span", { className: "text-4xl", children: t }) : /* @__PURE__ */ e.jsx(p, { className: "h-10 w-10 text-muted-foreground" }) }),
        /* @__PURE__ */ e.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ e.jsx("h3", { className: "text-lg font-semibold text-foreground", children: a }),
          l && /* @__PURE__ */ e.jsx("p", { className: "text-sm text-muted-foreground", children: l })
        ] }),
        i && /* @__PURE__ */ e.jsx("div", { className: "mt-2", children: /* @__PURE__ */ e.jsx(x, { config: i }) }),
        s && s.length > 0 && /* @__PURE__ */ e.jsx("div", { className: "mt-4 w-full", children: s.map((o, m) => /* @__PURE__ */ e.jsx("div", {}, o.id || m)) })
      ] })
    }
  );
}
export {
  j as EmptyComponent
};
