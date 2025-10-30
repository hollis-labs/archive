import { j as o, ay as c, W as l } from "./index-BnHp2Mvr.js";
import { useState as n, useEffect as u } from "react";
import { s as m } from "./SlotBinder-5DL05RAv.js";
function d(e, t) {
  const [s, r] = n(e);
  return u(() => {
    const a = setTimeout(() => {
      r(e);
    }, t);
    return () => {
      clearTimeout(a);
    };
  }, [e, t]), s;
}
function f({ config: e }) {
  const [t, s] = n(""), r = d(t, 300);
  return u(() => {
    e.result && m.update(e.result, { search: r });
  }, [r, e.result]), /* @__PURE__ */ o.jsxs("div", { className: "relative", children: [
    /* @__PURE__ */ o.jsx(c, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
    /* @__PURE__ */ o.jsx(
      l,
      {
        type: "text",
        placeholder: "Search...",
        value: t,
        onChange: (a) => s(a.target.value),
        className: "pl-10"
      }
    )
  ] });
}
export {
  f as SearchBarComponent
};
