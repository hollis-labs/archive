import { r as t, j as s, c as d, V as h, O as l } from "./badge-DBvLZUPk.js";
const m = t.forwardRef(({ className: a, ...r }, e) => /* @__PURE__ */ s.jsx(
  "div",
  {
    ref: e,
    className: d(
      "border bg-card text-card-foreground shadow",
      a
    ),
    ...r
  }
));
m.displayName = "Card";
const p = t.forwardRef(({ className: a, ...r }, e) => /* @__PURE__ */ s.jsx(
  "div",
  {
    ref: e,
    className: d("flex flex-col space-y-1.5 p-6", a),
    ...r
  }
));
p.displayName = "CardHeader";
const x = t.forwardRef(({ className: a, ...r }, e) => /* @__PURE__ */ s.jsx(
  "div",
  {
    ref: e,
    className: d("font-semibold leading-none tracking-tight", a),
    ...r
  }
));
x.displayName = "CardTitle";
const f = t.forwardRef(({ className: a, ...r }, e) => /* @__PURE__ */ s.jsx(
  "div",
  {
    ref: e,
    className: d("text-sm text-muted-foreground", a),
    ...r
  }
));
f.displayName = "CardDescription";
const C = t.forwardRef(({ className: a, ...r }, e) => /* @__PURE__ */ s.jsx("div", { ref: e, className: d("p-6 pt-0", a), ...r }));
C.displayName = "CardContent";
const j = t.forwardRef(({ className: a, ...r }, e) => /* @__PURE__ */ s.jsx(
  "div",
  {
    ref: e,
    className: d("flex items-center p-6 pt-0", a),
    ...r
  }
));
j.displayName = "CardFooter";
function R({ config: a }) {
  const { props: r = {}, children: e = [] } = a, { title: o, description: n, footer: c, className: N } = r;
  return /* @__PURE__ */ s.jsxs(m, { className: d(N), children: [
    (o || n) && /* @__PURE__ */ s.jsxs(p, { children: [
      o && /* @__PURE__ */ s.jsx(x, { children: o }),
      n && /* @__PURE__ */ s.jsx(f, { children: n })
    ] }),
    e.length > 0 && /* @__PURE__ */ s.jsx(C, { children: e.map((i) => /* @__PURE__ */ s.jsx(h.Fragment, { children: l(i) }, i.id)) }),
    c && /* @__PURE__ */ s.jsx(j, { children: l(c) })
  ] });
}
export {
  R as CardComponent
};
