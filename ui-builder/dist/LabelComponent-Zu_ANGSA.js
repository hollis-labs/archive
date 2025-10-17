import { j as e, L as c, c as o } from "./badge-DBvLZUPk.js";
function m({ config: s }) {
  const { props: a } = s, { text: r, htmlFor: t, required: l = !1, className: n } = a;
  return /* @__PURE__ */ e.jsxs(c, { htmlFor: t, className: o(n), children: [
    r,
    l && /* @__PURE__ */ e.jsx("span", { className: "text-destructive ml-1", "aria-label": "required", children: "*" })
  ] });
}
export {
  m as LabelComponent
};
