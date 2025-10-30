import { j as e, c as m, L as x, r as p } from "./index-DAEtv2Sl.js";
function j({ config: a }) {
  const { props: n, children: t } = a, {
    label: d,
    required: o = !1,
    error: r,
    helperText: l,
    className: c
  } = n || {}, i = `field-${a.id}`, s = t == null ? void 0 : t[0];
  return /* @__PURE__ */ e.jsxs("div", { className: m("space-y-2", c), children: [
    /* @__PURE__ */ e.jsxs(
      x,
      {
        htmlFor: (s == null ? void 0 : s.id) || i,
        className: "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        children: [
          d,
          o && /* @__PURE__ */ e.jsx("span", { className: "text-destructive ml-1", children: "*" })
        ]
      }
    ),
    s && /* @__PURE__ */ e.jsx("div", { className: "relative", children: p(s) }),
    r && /* @__PURE__ */ e.jsx("p", { className: "text-sm font-medium text-destructive", role: "alert", children: r }),
    !r && l && /* @__PURE__ */ e.jsx("p", { className: "text-sm text-muted-foreground", children: l })
  ] });
}
export {
  j as FieldComponent
};
