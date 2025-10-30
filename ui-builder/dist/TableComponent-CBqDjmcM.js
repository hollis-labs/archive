import { b9 as $, ba as N, j as e, bb as H, bc as M, bd as b, be as O, bf as R, bg as k, Z as G, b5 as P, b6 as U, b7 as _, $ as B, a1 as L, a2 as q, a3 as I } from "./index-fBjbTDu8.js";
import { useState as c, useCallback as Z, useEffect as F } from "react";
import { s as z } from "./SlotBinder-5DL05RAv.js";
async function J(t) {
  const o = await fetch(t, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    }
  });
  if (!o.ok)
    throw new Error(`API GET failed: ${o.statusText}`);
  return o.json();
}
function K(t) {
  const [o, C] = c([]), [D, j] = c(void 0), [h, g] = c(!1), [y, w] = c(null), [d, p] = c(!1), { dataSource: S, filters: A, search: u, sort: m, pagination: x, autoFetch: f } = t, i = Z(async (n) => {
    g(!0), w(null);
    const a = {
      dataSource: (n == null ? void 0 : n.dataSource) ?? S,
      filters: (n == null ? void 0 : n.filters) ?? A,
      search: (n == null ? void 0 : n.search) ?? u,
      sort: (n == null ? void 0 : n.sort) ?? m,
      pagination: (n == null ? void 0 : n.pagination) ?? x
    };
    try {
      const s = new URLSearchParams();
      a.search && s.append("search", a.search), a.filters && Object.entries(a.filters).forEach(([r, T]) => {
        s.append(`filters[${r}]`, String(T));
      }), a.sort && (s.append("sort[field]", a.sort.field), s.append("sort[direction]", a.sort.direction)), a.pagination && (s.append("page", String(a.pagination.page)), s.append("per_page", String(a.pagination.perPage)));
      const l = await J(
        `/api/ui/datasources/${a.dataSource}?${s.toString()}`
      );
      C(l.data), j(l.meta);
    } catch (s) {
      w(s instanceof Error ? s : new Error("Unknown error"));
    } finally {
      g(!1);
    }
  }, [S, A, u, m, x]);
  return F(() => {
    f !== !1 && !d && (i(), p(!0));
  }, [f, d, i]), {
    data: o,
    meta: D,
    loading: h,
    error: y,
    refetch: async () => {
      await i();
    },
    fetch: i
  };
}
function X({ config: t }) {
  var x, f, i, E, n;
  const [o, C] = c(""), [D, j] = c(!1), [h, g] = c(null), { data: y, loading: w, error: d, fetch: p } = K({
    dataSource: t.dataSource || "",
    search: o,
    autoFetch: !0
  }), { execute: S } = $();
  F(() => {
    const a = z.subscribe(t.id, (s) => {
      s.search !== void 0 ? (C(s.search), p({ search: s.search })) : s.refresh && p({});
    });
    return () => {
      a();
    };
  }, [t.id, p]);
  const A = async (a) => {
    t.rowAction && (t.rowAction.type === "modal" ? (g(a), j(!0)) : await S(t.rowAction, { row: a }));
  }, u = N.get("button.icon"), m = N.get("detail");
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsxs("div", { className: "space-y-4", children: [
      t.toolbar && t.toolbar.length > 0 && /* @__PURE__ */ e.jsx("div", { className: "flex justify-end gap-2", children: t.toolbar.map((a) => u ? /* @__PURE__ */ e.jsx(u, { config: a }, a.id) : null) }),
      /* @__PURE__ */ e.jsx("div", { className: "border rounded-lg min-h-[24rem]", children: /* @__PURE__ */ e.jsxs(H, { children: [
        /* @__PURE__ */ e.jsx(M, { children: /* @__PURE__ */ e.jsx(b, { children: (x = t.columns) == null ? void 0 : x.map((a) => /* @__PURE__ */ e.jsx(O, { children: a.label }, a.key)) }) }),
        /* @__PURE__ */ e.jsx(R, { children: w ? Array.from({ length: 10 }).map((a, s) => {
          var l;
          return /* @__PURE__ */ e.jsx(b, { children: (l = t.columns) == null ? void 0 : l.map((r) => /* @__PURE__ */ e.jsx(k, { children: /* @__PURE__ */ e.jsx(G, { className: "h-4 w-full" }) }, r.key)) }, `skeleton-${s}`);
        }) : d ? /* @__PURE__ */ e.jsx(b, { children: /* @__PURE__ */ e.jsxs(k, { colSpan: ((f = t.columns) == null ? void 0 : f.length) || 1, className: "text-center text-destructive h-64", children: [
          "Error: ",
          d.message
        ] }) }) : y.length === 0 ? /* @__PURE__ */ e.jsx(b, { children: /* @__PURE__ */ e.jsx(k, { colSpan: ((i = t.columns) == null ? void 0 : i.length) || 1, className: "text-center text-muted-foreground h-64", children: "No data available" }) }) : y.map((a, s) => {
          var l;
          return /* @__PURE__ */ e.jsx(
            b,
            {
              onClick: () => A(a),
              className: t.rowAction ? "cursor-pointer hover:bg-muted/50" : "",
              children: (l = t.columns) == null ? void 0 : l.map((r) => {
                var T;
                return /* @__PURE__ */ e.jsx(k, { children: r.key === "avatar_url" ? /* @__PURE__ */ e.jsxs(P, { className: "h-8 w-8", children: [
                  /* @__PURE__ */ e.jsx(U, { src: a[r.key], alt: a.name }),
                  /* @__PURE__ */ e.jsx(_, { children: (T = a.name) == null ? void 0 : T.substring(0, 2).toUpperCase() })
                ] }) : a[r.key] }, r.key);
              })
            },
            a.id || s
          );
        }) })
      ] }) })
    ] }),
    ((E = t.rowAction) == null ? void 0 : E.type) === "modal" && m && /* @__PURE__ */ e.jsx(B, { open: D, onOpenChange: j, children: /* @__PURE__ */ e.jsxs(L, { className: "sm:max-w-2xl max-h-[80vh] overflow-y-auto", children: [
      /* @__PURE__ */ e.jsx(q, { children: /* @__PURE__ */ e.jsx(I, { children: t.rowAction.title || "Details" }) }),
      /* @__PURE__ */ e.jsx(
        m,
        {
          config: {
            id: "detail-modal",
            type: "detail",
            url: (n = t.rowAction.url) == null ? void 0 : n.replace("{{row.id}}", h == null ? void 0 : h.id),
            fields: t.rowAction.fields
          },
          data: h
        }
      )
    ] }) })
  ] });
}
export {
  X as TableComponent
};
