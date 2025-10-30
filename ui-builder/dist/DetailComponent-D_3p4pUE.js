import { j as e, Z as l, b5 as f, b6 as N, b7 as v, b8 as c } from "./index-CwxzwhG1.js";
import { useState as d, useEffect as w } from "react";
function b({ config: r, data: n }) {
  var x;
  const [s, p] = d(n), [u, i] = d(!n), [o, m] = d(null);
  w(() => {
    !n && r.dataSource && r.id && h();
  }, [r.dataSource, r.id, n]);
  const h = async () => {
    if (r.url) {
      i(!0), m(null);
      try {
        const a = await window.fetch(r.url);
        if (!a.ok)
          throw new Error(`Failed to load data: ${a.statusText}`);
        const t = await a.json();
        t.data || console.warn("API response not wrapped. Expected { data: ... } format"), p(t.data || t);
      } catch (a) {
        m(a instanceof Error ? a : new Error("Failed to load data"));
      } finally {
        i(!1);
      }
    }
  };
  if (u)
    return /* @__PURE__ */ e.jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "flex items-start gap-4", children: [
        /* @__PURE__ */ e.jsx(l, { className: "h-20 w-20 rounded-full" }),
        /* @__PURE__ */ e.jsxs("div", { className: "flex-1 space-y-2", children: [
          /* @__PURE__ */ e.jsx(l, { className: "h-8 w-48" }),
          /* @__PURE__ */ e.jsx(l, { className: "h-4 w-32" })
        ] })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ e.jsx(l, { className: "h-4 w-full" }),
        /* @__PURE__ */ e.jsx(l, { className: "h-4 w-full" }),
        /* @__PURE__ */ e.jsx(l, { className: "h-4 w-3/4" })
      ] })
    ] });
  if (o)
    return /* @__PURE__ */ e.jsxs("div", { className: "p-4 text-center text-destructive", children: [
      "Error: ",
      o.message
    ] });
  if (!s)
    return /* @__PURE__ */ e.jsx("div", { className: "p-4 text-center text-muted-foreground", children: "No data available" });
  const j = r.fields || [];
  return /* @__PURE__ */ e.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ e.jsxs("div", { className: "flex items-start gap-4", children: [
      /* @__PURE__ */ e.jsxs(f, { className: "h-20 w-20", children: [
        /* @__PURE__ */ e.jsx(N, { src: s.avatar_url || s.avatar_path, alt: s.name }),
        /* @__PURE__ */ e.jsx(v, { children: (x = s.name) == null ? void 0 : x.substring(0, 2).toUpperCase() })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ e.jsx("h2", { className: "text-2xl font-bold", children: s.name }),
        /* @__PURE__ */ e.jsxs("div", { className: "flex items-center gap-2 mt-1", children: [
          s.designation && /* @__PURE__ */ e.jsx(c, { variant: "secondary", children: s.designation }),
          s.status && /* @__PURE__ */ e.jsx(c, { variant: s.status === "active" ? "default" : "outline", children: s.status })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ e.jsx("div", { className: "space-y-4", children: j.map((a) => {
      const t = s[a.key];
      return !t && a.key !== "persona" ? null : /* @__PURE__ */ e.jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ e.jsx("dt", { className: "text-sm font-medium text-muted-foreground", children: a.label }),
        /* @__PURE__ */ e.jsx("dd", { className: "text-sm", children: a.type === "date" && t ? new Date(t).toLocaleDateString() : a.type === "badge" && t ? /* @__PURE__ */ e.jsx(c, { children: t }) : a.type === "text" && t ? /* @__PURE__ */ e.jsx("p", { className: "whitespace-pre-wrap", children: t }) : t || "—" })
      ] }, a.key);
    }) }),
    s.agent_profile && /* @__PURE__ */ e.jsxs("div", { className: "pt-4 border-t", children: [
      /* @__PURE__ */ e.jsx("h3", { className: "text-sm font-medium mb-2", children: "Agent Profile" }),
      /* @__PURE__ */ e.jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ e.jsx("p", { className: "text-sm font-medium", children: s.agent_profile.name }),
        s.agent_profile.description && /* @__PURE__ */ e.jsx("p", { className: "text-sm text-muted-foreground", children: s.agent_profile.description })
      ] })
    ] })
  ] });
}
export {
  b as DetailComponent
};
