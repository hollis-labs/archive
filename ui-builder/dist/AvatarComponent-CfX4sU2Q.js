import { j as a, A as m, c as i, b as x, d as h } from "./badge-DBvLZUPk.js";
function A({ config: t }) {
  const { props: r = {} } = t, { src: s, alt: c, fallback: l, size: e = "md", className: n } = r, o = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
    xl: "h-16 w-16"
  };
  return /* @__PURE__ */ a.jsxs(m, { className: i(o[e], n), children: [
    s && /* @__PURE__ */ a.jsx(x, { src: s, alt: c || "Avatar" }),
    /* @__PURE__ */ a.jsx(h, { children: l || "?" })
  ] });
}
export {
  A as AvatarComponent
};
