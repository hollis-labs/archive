import { j as n, c as b, _ as g } from "./index-BBlDfRZw.js";
import E, { useState as S, useEffect as i } from "react";
import { C as k, a as N, b as O, c as T, d as I, e as L, f as _, g as D, h as F } from "./command-BSBBkFHn.js";
function A({ config: p }) {
  const { props: u, actions: t } = p, {
    placeholder: h = "Type a command or search...",
    emptyText: f = "No results found.",
    groups: j,
    open: s,
    defaultOpen: d = !1,
    showShortcut: x = !0,
    className: C
  } = u, [v, c] = S(d);
  i(() => {
    s !== void 0 && c(s);
  }, [s]), i(() => {
    const o = (e) => {
      e.key === "k" && (e.metaKey || e.ctrlKey) && (e.preventDefault(), c((a) => !a));
    };
    return document.addEventListener("keydown", o), () => document.removeEventListener("keydown", o);
  }, []);
  const y = (o) => {
    if (t != null && t.onSelect) {
      const e = t.onSelect;
      switch (e.type) {
        case "command":
          e.command && console.log("Execute command:", e.command, { value: o });
          break;
        case "navigate":
          e.url && (window.location.href = e.url);
          break;
        case "emit":
          e.event && window.dispatchEvent(new CustomEvent(e.event, { detail: e.payload }));
          break;
        case "http":
          e.url && fetch(e.url, {
            method: e.method || "GET",
            headers: { "Content-Type": "application/json", Accept: "application/json" },
            body: e.payload ? JSON.stringify(e.payload) : void 0
          });
          break;
      }
    }
    c(!1);
  }, r = () => /* @__PURE__ */ n.jsxs(n.Fragment, { children: [
    /* @__PURE__ */ n.jsx(O, { placeholder: h }),
    /* @__PURE__ */ n.jsxs(T, { children: [
      /* @__PURE__ */ n.jsx(I, { children: f }),
      j.map((o, e) => /* @__PURE__ */ n.jsxs(E.Fragment, { children: [
        e > 0 && /* @__PURE__ */ n.jsx(L, {}),
        /* @__PURE__ */ n.jsx(_, { heading: o.heading, children: o.items.map((a, w) => {
          const l = a.icon ? g[a.icon] : null, m = a.value || a.label;
          return /* @__PURE__ */ n.jsxs(
            D,
            {
              value: m,
              disabled: a.disabled,
              onSelect: () => y(m),
              children: [
                l && /* @__PURE__ */ n.jsx(l, { className: "mr-2 h-4 w-4" }),
                /* @__PURE__ */ n.jsx("span", { children: a.label }),
                x && a.shortcut && /* @__PURE__ */ n.jsx(F, { children: a.shortcut })
              ]
            },
            w
          );
        }) })
      ] }, e))
    ] })
  ] });
  return s !== void 0 || d ? /* @__PURE__ */ n.jsx(k, { open: v, onOpenChange: c, children: /* @__PURE__ */ n.jsx(r, {}) }) : /* @__PURE__ */ n.jsx(N, { className: b("rounded-lg border shadow-md", C), children: /* @__PURE__ */ n.jsx(r, {}) });
}
export {
  A as CommandComponent
};
