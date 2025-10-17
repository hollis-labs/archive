import { r as u, j as r, S as p, I as m } from "./badge-DBvLZUPk.js";
function d({ config: e }) {
  var s, o;
  const [t, c] = u.useState(""), n = ((s = e.props) == null ? void 0 : s.placeholder) || `Search ${e.dataSource || ""}...`;
  return u.useEffect(() => {
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
    /* @__PURE__ */ r.jsx(p, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
    /* @__PURE__ */ r.jsx(
      m,
      {
        type: "search",
        placeholder: n,
        value: t,
        onChange: (a) => c(a.target.value),
        className: "pl-9"
      }
    )
  ] });
}
export {
  d as SearchBarComponent
};
