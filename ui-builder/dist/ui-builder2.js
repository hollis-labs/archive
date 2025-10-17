import { r as n, j as e, c as f, u as P, s as B, a as T, A as F, b as H, d as I, D as $, e as G, f as K, g as q, S as V, I as z, B as R, h as J, i as Q, k as W } from "./badge-DBvLZUPk.js";
import { S as g } from "./skeleton-CKHTIZ5D.js";
import { T as X } from "./index-BklgHJRJ.js";
const L = n.forwardRef(({ className: a, ...s }, t) => /* @__PURE__ */ e.jsx("div", { className: "relative w-full overflow-auto", children: /* @__PURE__ */ e.jsx(
  "table",
  {
    ref: t,
    className: f("w-full caption-bottom text-sm", a),
    ...s
  }
) }));
L.displayName = "Table";
const M = n.forwardRef(({ className: a, ...s }, t) => /* @__PURE__ */ e.jsx("thead", { ref: t, className: f("[&_tr]:border-b", a), ...s }));
M.displayName = "TableHeader";
const O = n.forwardRef(({ className: a, ...s }, t) => /* @__PURE__ */ e.jsx(
  "tbody",
  {
    ref: t,
    className: f("[&_tr:last-child]:border-0", a),
    ...s
  }
));
O.displayName = "TableBody";
const Y = n.forwardRef(({ className: a, ...s }, t) => /* @__PURE__ */ e.jsx(
  "tfoot",
  {
    ref: t,
    className: f(
      "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
      a
    ),
    ...s
  }
));
Y.displayName = "TableFooter";
const S = n.forwardRef(({ className: a, ...s }, t) => /* @__PURE__ */ e.jsx(
  "tr",
  {
    ref: t,
    className: f(
      "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
      a
    ),
    ...s
  }
));
S.displayName = "TableRow";
const U = n.forwardRef(({ className: a, ...s }, t) => /* @__PURE__ */ e.jsx(
  "th",
  {
    ref: t,
    className: f(
      "h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      a
    ),
    ...s
  }
));
U.displayName = "TableHead";
const A = n.forwardRef(({ className: a, ...s }, t) => /* @__PURE__ */ e.jsx(
  "td",
  {
    ref: t,
    className: f(
      "p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      a
    ),
    ...s
  }
));
A.displayName = "TableCell";
const Z = n.forwardRef(({ className: a, ...s }, t) => /* @__PURE__ */ e.jsx(
  "caption",
  {
    ref: t,
    className: f("mt-4 text-sm text-muted-foreground", a),
    ...s
  }
));
Z.displayName = "TableCaption";
async function ee(a) {
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
function ae(a) {
  const [s, t] = n.useState([]), [i, u] = n.useState(void 0), [m, j] = n.useState(!1), [b, w] = n.useState(null), [N, h] = n.useState(!1), { dataSource: l, filters: d, search: k, sort: E, pagination: v, autoFetch: C } = a, y = n.useCallback(async (c) => {
    j(!0), w(null);
    const r = {
      dataSource: (c == null ? void 0 : c.dataSource) ?? l,
      filters: (c == null ? void 0 : c.filters) ?? d,
      search: (c == null ? void 0 : c.search) ?? k,
      sort: (c == null ? void 0 : c.sort) ?? E,
      pagination: (c == null ? void 0 : c.pagination) ?? v
    };
    try {
      const o = new URLSearchParams();
      r.search && o.append("search", r.search), r.filters && Object.entries(r.filters).forEach(([x, D]) => {
        o.append(`filters[${x}]`, String(D));
      }), r.sort && (o.append("sort[field]", r.sort.field), o.append("sort[direction]", r.sort.direction)), r.pagination && (o.append("page", String(r.pagination.page)), o.append("per_page", String(r.pagination.perPage)));
      const p = await ee(
        `/api/ui/datasources/${r.dataSource}?${o.toString()}`
      );
      t(p.data), u(p.meta);
    } catch (o) {
      w(o instanceof Error ? o : new Error("Unknown error"));
    } finally {
      j(!1);
    }
  }, [l, d, k, E, v]);
  return n.useEffect(() => {
    C !== !1 && !N && (y(), h(!0));
  }, [C, N, y]), {
    data: s,
    meta: i,
    loading: m,
    error: b,
    refetch: async () => {
      await y();
    },
    fetch: y
  };
}
function te({ config: a }) {
  var v, C, y, _, c;
  const [s, t] = n.useState(""), [i, u] = n.useState(!1), [m, j] = n.useState(null), { data: b, loading: w, error: N, fetch: h } = ae({
    dataSource: a.dataSource || "",
    search: s,
    autoFetch: !0
  }), { execute: l } = P();
  n.useEffect(() => {
    const r = B.subscribe(a.id, (o) => {
      o.search !== void 0 ? (t(o.search), h({ search: o.search })) : o.refresh && h({});
    });
    return () => {
      r();
    };
  }, [a.id, h]);
  const d = async (r) => {
    a.rowAction && (a.rowAction.type === "modal" ? (j(r), u(!0)) : await l(a.rowAction, { row: r }));
  }, k = T.get("button.icon"), E = T.get("detail");
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsxs("div", { className: "space-y-4", children: [
      a.toolbar && a.toolbar.length > 0 && /* @__PURE__ */ e.jsx("div", { className: "flex justify-end gap-2", children: a.toolbar.map((r) => k ? /* @__PURE__ */ e.jsx(k, { config: r }, r.id) : null) }),
      /* @__PURE__ */ e.jsx("div", { className: "border rounded-lg min-h-[24rem]", children: /* @__PURE__ */ e.jsxs(L, { children: [
        /* @__PURE__ */ e.jsx(M, { children: /* @__PURE__ */ e.jsx(S, { children: (v = a.columns) == null ? void 0 : v.map((r) => /* @__PURE__ */ e.jsx(U, { children: r.label }, r.key)) }) }),
        /* @__PURE__ */ e.jsx(O, { children: w ? Array.from({ length: 10 }).map((r, o) => {
          var p;
          return /* @__PURE__ */ e.jsx(S, { children: (p = a.columns) == null ? void 0 : p.map((x) => /* @__PURE__ */ e.jsx(A, { children: /* @__PURE__ */ e.jsx(g, { className: "h-4 w-full" }) }, x.key)) }, `skeleton-${o}`);
        }) : N ? /* @__PURE__ */ e.jsx(S, { children: /* @__PURE__ */ e.jsxs(A, { colSpan: ((C = a.columns) == null ? void 0 : C.length) || 1, className: "text-center text-destructive h-64", children: [
          "Error: ",
          N.message
        ] }) }) : b.length === 0 ? /* @__PURE__ */ e.jsx(S, { children: /* @__PURE__ */ e.jsx(A, { colSpan: ((y = a.columns) == null ? void 0 : y.length) || 1, className: "text-center text-muted-foreground h-64", children: "No data available" }) }) : b.map((r, o) => {
          var p;
          return /* @__PURE__ */ e.jsx(
            S,
            {
              onClick: () => d(r),
              className: a.rowAction ? "cursor-pointer hover:bg-muted/50" : "",
              children: (p = a.columns) == null ? void 0 : p.map((x) => {
                var D;
                return /* @__PURE__ */ e.jsx(A, { children: x.key === "avatar_url" ? /* @__PURE__ */ e.jsxs(F, { className: "h-8 w-8", children: [
                  /* @__PURE__ */ e.jsx(H, { src: r[x.key], alt: r.name }),
                  /* @__PURE__ */ e.jsx(I, { children: (D = r.name) == null ? void 0 : D.substring(0, 2).toUpperCase() })
                ] }) : r[x.key] }, x.key);
              })
            },
            r.id || o
          );
        }) })
      ] }) })
    ] }),
    ((_ = a.rowAction) == null ? void 0 : _.type) === "modal" && E && /* @__PURE__ */ e.jsx($, { open: i, onOpenChange: u, children: /* @__PURE__ */ e.jsxs(G, { className: "sm:max-w-2xl max-h-[80vh] overflow-y-auto", children: [
      /* @__PURE__ */ e.jsx(K, { children: /* @__PURE__ */ e.jsx(q, { children: a.rowAction.title || "Details" }) }),
      /* @__PURE__ */ e.jsx(
        E,
        {
          config: {
            id: "detail-modal",
            type: "detail",
            url: (c = a.rowAction.url) == null ? void 0 : c.replace("{{row.id}}", m == null ? void 0 : m.id),
            fields: a.rowAction.fields
          },
          data: m
        }
      )
    ] }) })
  ] });
}
function se(a, s) {
  const [t, i] = n.useState(a);
  return n.useEffect(() => {
    const u = setTimeout(() => {
      i(a);
    }, s);
    return () => {
      clearTimeout(u);
    };
  }, [a, s]), t;
}
function re({ config: a }) {
  const [s, t] = n.useState(""), i = se(s, 300);
  return n.useEffect(() => {
    a.result && B.update(a.result, { search: i });
  }, [i, a.result]), /* @__PURE__ */ e.jsxs("div", { className: "relative", children: [
    /* @__PURE__ */ e.jsx(V, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
    /* @__PURE__ */ e.jsx(
      z,
      {
        type: "text",
        placeholder: "Search...",
        value: s,
        onChange: (u) => t(u.target.value),
        className: "pl-10"
      }
    )
  ] });
}
function ne({ config: a, data: s }) {
  var h;
  const [t, i] = n.useState(s), [u, m] = n.useState(!s), [j, b] = n.useState(null);
  n.useEffect(() => {
    !s && a.dataSource && a.id && w();
  }, [a.dataSource, a.id, s]);
  const w = async () => {
    if (a.url) {
      m(!0), b(null);
      try {
        const l = await window.fetch(a.url);
        if (!l.ok)
          throw new Error(`Failed to load data: ${l.statusText}`);
        const d = await l.json();
        d.data || console.warn("API response not wrapped. Expected { data: ... } format"), i(d.data || d);
      } catch (l) {
        b(l instanceof Error ? l : new Error("Failed to load data"));
      } finally {
        m(!1);
      }
    }
  };
  if (u)
    return /* @__PURE__ */ e.jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "flex items-start gap-4", children: [
        /* @__PURE__ */ e.jsx(g, { className: "h-20 w-20 rounded-full" }),
        /* @__PURE__ */ e.jsxs("div", { className: "flex-1 space-y-2", children: [
          /* @__PURE__ */ e.jsx(g, { className: "h-8 w-48" }),
          /* @__PURE__ */ e.jsx(g, { className: "h-4 w-32" })
        ] })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ e.jsx(g, { className: "h-4 w-full" }),
        /* @__PURE__ */ e.jsx(g, { className: "h-4 w-full" }),
        /* @__PURE__ */ e.jsx(g, { className: "h-4 w-3/4" })
      ] })
    ] });
  if (j)
    return /* @__PURE__ */ e.jsxs("div", { className: "p-4 text-center text-destructive", children: [
      "Error: ",
      j.message
    ] });
  if (!t)
    return /* @__PURE__ */ e.jsx("div", { className: "p-4 text-center text-muted-foreground", children: "No data available" });
  const N = a.fields || [];
  return /* @__PURE__ */ e.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ e.jsxs("div", { className: "flex items-start gap-4", children: [
      /* @__PURE__ */ e.jsxs(F, { className: "h-20 w-20", children: [
        /* @__PURE__ */ e.jsx(H, { src: t.avatar_url || t.avatar_path, alt: t.name }),
        /* @__PURE__ */ e.jsx(I, { children: (h = t.name) == null ? void 0 : h.substring(0, 2).toUpperCase() })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ e.jsx("h2", { className: "text-2xl font-bold", children: t.name }),
        /* @__PURE__ */ e.jsxs("div", { className: "flex items-center gap-2 mt-1", children: [
          t.designation && /* @__PURE__ */ e.jsx(R, { variant: "secondary", children: t.designation }),
          t.status && /* @__PURE__ */ e.jsx(R, { variant: t.status === "active" ? "default" : "outline", children: t.status })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ e.jsx("div", { className: "space-y-4", children: N.map((l) => {
      const d = t[l.key];
      return !d && l.key !== "persona" ? null : /* @__PURE__ */ e.jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ e.jsx("dt", { className: "text-sm font-medium text-muted-foreground", children: l.label }),
        /* @__PURE__ */ e.jsx("dd", { className: "text-sm", children: l.type === "date" && d ? new Date(d).toLocaleDateString() : l.type === "badge" && d ? /* @__PURE__ */ e.jsx(R, { children: d }) : l.type === "text" && d ? /* @__PURE__ */ e.jsx("p", { className: "whitespace-pre-wrap", children: d }) : d || "—" })
      ] }, l.key);
    }) }),
    t.agent_profile && /* @__PURE__ */ e.jsxs("div", { className: "pt-4 border-t", children: [
      /* @__PURE__ */ e.jsx("h3", { className: "text-sm font-medium mb-2", children: "Agent Profile" }),
      /* @__PURE__ */ e.jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ e.jsx("p", { className: "text-sm font-medium", children: t.agent_profile.name }),
        t.agent_profile.description && /* @__PURE__ */ e.jsx("p", { className: "text-sm text-muted-foreground", children: t.agent_profile.description })
      ] })
    ] })
  ] });
}
function le() {
  T.register("table", te), T.register("search.bar", re), T.register("button.icon", J), T.register("detail", ne);
}
le();
document.addEventListener("DOMContentLoaded", () => {
  const a = window.__BOOT__, s = document.getElementById("UI-Builder-root");
  if (!a || !s) {
    console.warn("UI-Builder boot data or root element not found");
    return;
  }
  if (!a.isAuthenticated) {
    console.warn("User not authenticated"), s.innerHTML = '<div class="p-4 text-red-500">Authentication required</div>';
    return;
  }
  const t = s.dataset.pageKey || a.pageKey;
  if (!t) {
    console.error("No page key provided"), s.innerHTML = '<div class="p-4 text-red-500">No page key specified</div>';
    return;
  }
  Q.createRoot(s).render(
    /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
      /* @__PURE__ */ e.jsx(W, { pageKey: t }),
      /* @__PURE__ */ e.jsx(X, {})
    ] })
  );
});
