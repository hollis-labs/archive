import { j as e, c as d, b6 as B, b7 as F, V as G, b2 as P, b3 as U, b4 as L, Y as q, _ as I, $ as V, a0 as Y } from "./index-BYboRAHg.js";
import * as m from "react";
import { useState as i, useCallback as z, useEffect as H } from "react";
import { s as J } from "./SlotBinder-5DL05RAv.js";
const _ = m.forwardRef(({ className: a, ...s }, l) => /* @__PURE__ */ e.jsx("div", { className: "relative w-full overflow-auto", children: /* @__PURE__ */ e.jsx(
  "table",
  {
    ref: l,
    className: d("w-full caption-bottom text-sm", a),
    ...s
  }
) }));
_.displayName = "Table";
const $ = m.forwardRef(({ className: a, ...s }, l) => /* @__PURE__ */ e.jsx("thead", { ref: l, className: d("[&_tr]:border-b", a), ...s }));
$.displayName = "TableHeader";
const M = m.forwardRef(({ className: a, ...s }, l) => /* @__PURE__ */ e.jsx(
  "tbody",
  {
    ref: l,
    className: d("[&_tr:last-child]:border-0", a),
    ...s
  }
));
M.displayName = "TableBody";
const K = m.forwardRef(({ className: a, ...s }, l) => /* @__PURE__ */ e.jsx(
  "tfoot",
  {
    ref: l,
    className: d(
      "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
      a
    ),
    ...s
  }
));
K.displayName = "TableFooter";
const u = m.forwardRef(({ className: a, ...s }, l) => /* @__PURE__ */ e.jsx(
  "tr",
  {
    ref: l,
    className: d(
      "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
      a
    ),
    ...s
  }
));
u.displayName = "TableRow";
const O = m.forwardRef(({ className: a, ...s }, l) => /* @__PURE__ */ e.jsx(
  "th",
  {
    ref: l,
    className: d(
      "h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      a
    ),
    ...s
  }
));
O.displayName = "TableHead";
const g = m.forwardRef(({ className: a, ...s }, l) => /* @__PURE__ */ e.jsx(
  "td",
  {
    ref: l,
    className: d(
      "p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      a
    ),
    ...s
  }
));
g.displayName = "TableCell";
const Q = m.forwardRef(({ className: a, ...s }, l) => /* @__PURE__ */ e.jsx(
  "caption",
  {
    ref: l,
    className: d("mt-4 text-sm text-muted-foreground", a),
    ...s
  }
));
Q.displayName = "TableCaption";
async function W(a) {
  const s = await fetch(a, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    }
  });
  if (!s.ok)
    throw new Error(`API GET failed: ${s.statusText}`);
  return s.json();
}
function X(a) {
  const [s, l] = i([]), [D, N] = i(void 0), [p, T] = i(!1), [k, S] = i(null), [f, x] = i(!1), { dataSource: A, filters: C, search: b, sort: j, pagination: y, autoFetch: w } = a, h = z(async (n) => {
    T(!0), S(null);
    const t = {
      dataSource: (n == null ? void 0 : n.dataSource) ?? A,
      filters: (n == null ? void 0 : n.filters) ?? C,
      search: (n == null ? void 0 : n.search) ?? b,
      sort: (n == null ? void 0 : n.sort) ?? j,
      pagination: (n == null ? void 0 : n.pagination) ?? y
    };
    try {
      const r = new URLSearchParams();
      t.search && r.append("search", t.search), t.filters && Object.entries(t.filters).forEach(([c, R]) => {
        r.append(`filters[${c}]`, String(R));
      }), t.sort && (r.append("sort[field]", t.sort.field), r.append("sort[direction]", t.sort.direction)), t.pagination && (r.append("page", String(t.pagination.page)), r.append("per_page", String(t.pagination.perPage)));
      const o = await W(
        `/api/ui/datasources/${t.dataSource}?${r.toString()}`
      );
      l(o.data), N(o.meta);
    } catch (r) {
      S(r instanceof Error ? r : new Error("Unknown error"));
    } finally {
      T(!1);
    }
  }, [A, C, b, j, y]);
  return H(() => {
    w !== !1 && !f && (h(), x(!0));
  }, [w, f, h]), {
    data: s,
    meta: D,
    loading: p,
    error: k,
    refetch: async () => {
      await h();
    },
    fetch: h
  };
}
function ea({ config: a }) {
  var y, w, h, E, n;
  const [s, l] = i(""), [D, N] = i(!1), [p, T] = i(null), { data: k, loading: S, error: f, fetch: x } = X({
    dataSource: a.dataSource || "",
    search: s,
    autoFetch: !0
  }), { execute: A } = B();
  H(() => {
    const t = J.subscribe(a.id, (r) => {
      r.search !== void 0 ? (l(r.search), x({ search: r.search })) : r.refresh && x({});
    });
    return () => {
      t();
    };
  }, [a.id, x]);
  const C = async (t) => {
    a.rowAction && (a.rowAction.type === "modal" ? (T(t), N(!0)) : await A(a.rowAction, { row: t }));
  }, b = F.get("button.icon"), j = F.get("detail");
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsxs("div", { className: "space-y-4", children: [
      a.toolbar && a.toolbar.length > 0 && /* @__PURE__ */ e.jsx("div", { className: "flex justify-end gap-2", children: a.toolbar.map((t) => b ? /* @__PURE__ */ e.jsx(b, { config: t }, t.id) : null) }),
      /* @__PURE__ */ e.jsx("div", { className: "border rounded-lg min-h-[24rem]", children: /* @__PURE__ */ e.jsxs(_, { children: [
        /* @__PURE__ */ e.jsx($, { children: /* @__PURE__ */ e.jsx(u, { children: (y = a.columns) == null ? void 0 : y.map((t) => /* @__PURE__ */ e.jsx(O, { children: t.label }, t.key)) }) }),
        /* @__PURE__ */ e.jsx(M, { children: S ? Array.from({ length: 10 }).map((t, r) => {
          var o;
          return /* @__PURE__ */ e.jsx(u, { children: (o = a.columns) == null ? void 0 : o.map((c) => /* @__PURE__ */ e.jsx(g, { children: /* @__PURE__ */ e.jsx(G, { className: "h-4 w-full" }) }, c.key)) }, `skeleton-${r}`);
        }) : f ? /* @__PURE__ */ e.jsx(u, { children: /* @__PURE__ */ e.jsxs(g, { colSpan: ((w = a.columns) == null ? void 0 : w.length) || 1, className: "text-center text-destructive h-64", children: [
          "Error: ",
          f.message
        ] }) }) : k.length === 0 ? /* @__PURE__ */ e.jsx(u, { children: /* @__PURE__ */ e.jsx(g, { colSpan: ((h = a.columns) == null ? void 0 : h.length) || 1, className: "text-center text-muted-foreground h-64", children: "No data available" }) }) : k.map((t, r) => {
          var o;
          return /* @__PURE__ */ e.jsx(
            u,
            {
              onClick: () => C(t),
              className: a.rowAction ? "cursor-pointer hover:bg-muted/50" : "",
              children: (o = a.columns) == null ? void 0 : o.map((c) => {
                var R;
                return /* @__PURE__ */ e.jsx(g, { children: c.key === "avatar_url" ? /* @__PURE__ */ e.jsxs(P, { className: "h-8 w-8", children: [
                  /* @__PURE__ */ e.jsx(U, { src: t[c.key], alt: t.name }),
                  /* @__PURE__ */ e.jsx(L, { children: (R = t.name) == null ? void 0 : R.substring(0, 2).toUpperCase() })
                ] }) : t[c.key] }, c.key);
              })
            },
            t.id || r
          );
        }) })
      ] }) })
    ] }),
    ((E = a.rowAction) == null ? void 0 : E.type) === "modal" && j && /* @__PURE__ */ e.jsx(q, { open: D, onOpenChange: N, children: /* @__PURE__ */ e.jsxs(I, { className: "sm:max-w-2xl max-h-[80vh] overflow-y-auto", children: [
      /* @__PURE__ */ e.jsx(V, { children: /* @__PURE__ */ e.jsx(Y, { children: a.rowAction.title || "Details" }) }),
      /* @__PURE__ */ e.jsx(
        j,
        {
          config: {
            id: "detail-modal",
            type: "detail",
            url: (n = a.rowAction.url) == null ? void 0 : n.replace("{{row.id}}", p == null ? void 0 : p.id),
            fields: a.rowAction.fields
          },
          data: p
        }
      )
    ] }) })
  ] });
}
export {
  ea as TableComponent
};
