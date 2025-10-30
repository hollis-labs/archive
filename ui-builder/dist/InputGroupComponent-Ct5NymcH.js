import { j as e, c as r, r as n } from "./index-BtLd6ySb.js";
function m({ config: i }) {
  const { props: o } = i, {
    prefix: s,
    suffix: t,
    input: a,
    className: l
  } = o || {};
  return /* @__PURE__ */ e.jsxs("div", { className: r("relative flex items-center", l), children: [
    s && /* @__PURE__ */ e.jsx("div", { className: "absolute left-3 flex items-center pointer-events-none text-muted-foreground", children: typeof s == "string" ? /* @__PURE__ */ e.jsx("span", { className: "text-sm", children: s }) : n(s) }),
    /* @__PURE__ */ e.jsx("div", { className: r("flex-1", s && "pl-10", t && "pr-10"), children: n(a) }),
    t && /* @__PURE__ */ e.jsx("div", { className: "absolute right-3 flex items-center", children: typeof t == "string" ? /* @__PURE__ */ e.jsx("span", { className: "text-sm text-muted-foreground", children: t }) : n(t) })
  ] });
}
export {
  m as InputGroupComponent
};
