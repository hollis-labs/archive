import { j as r, ar as c, M as m } from "./index-BvjF5Aq2.js";
import { useState as p, useEffect as h } from "react";
function x({ config: e }) {
  var s, o;
  const [t, u] = p(""), n = ((s = e.props) == null ? void 0 : s.placeholder) || `Search ${e.dataSource || ""}...`;
  return h(() => {
    const a = setTimeout(() => {
      var l;
      (l = e.result) != null && l.target && window.dispatchEvent(new CustomEvent("component:search", {
        detail: {
          target: e.result.target,
          search: t
        }
      }));
    }, 300);
    return () => clearTimeout(a);
  }, [t, (o = e.result) == null ? void 0 : o.target]), /* @__PURE__ */ r.jsxs("div", { className: "relative", children: [
    /* @__PURE__ */ r.jsx(c, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
    /* @__PURE__ */ r.jsx(
      m,
      {
        type: "search",
        placeholder: n,
        value: t,
        onChange: (a) => u(a.target.value),
        className: "pl-9"
      }
    )
  ] });
}
export {
  x as SearchBarComponent
};
