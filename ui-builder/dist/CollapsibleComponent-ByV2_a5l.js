import { r as x, j as s, c as e, R as f, _ as h, V as j, O as u } from "./badge-DBvLZUPk.js";
import { R as b, C as g, a as N } from "./index-DQZdt-PE.js";
const O = b, R = g, w = N;
function E({ config: l }) {
  const { props: o, children: r = [] } = l, { title: i, defaultOpen: c = !1, disabled: a = !1, triggerClassName: p, contentClassName: m, className: C } = o, [n, d] = x.useState(c);
  return /* @__PURE__ */ s.jsxs(
    O,
    {
      open: n,
      onOpenChange: d,
      disabled: a,
      className: e("space-y-2", C),
      children: [
        /* @__PURE__ */ s.jsx(R, { asChild: !0, children: /* @__PURE__ */ s.jsxs(
          f,
          {
            variant: "ghost",
            size: "sm",
            className: e("flex w-full justify-between p-2", p),
            disabled: a,
            children: [
              /* @__PURE__ */ s.jsx("span", { className: "font-semibold", children: i }),
              /* @__PURE__ */ s.jsx(
                h,
                {
                  className: e(
                    "h-4 w-4 transition-transform duration-200",
                    n && "rotate-180"
                  )
                }
              )
            ]
          }
        ) }),
        /* @__PURE__ */ s.jsx(w, { className: e("space-y-2", m), children: r.map((t) => /* @__PURE__ */ s.jsx(j.Fragment, { children: u(t) }, t.id)) })
      ]
    }
  );
}
export {
  E as CollapsibleComponent
};
