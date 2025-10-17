import { r, j as n, c as b, V as E } from "./badge-DBvLZUPk.js";
import { C as g, a as S, b as k, c as N, d as O, e as I, f as T, g as L, h as D } from "./command-CQbc6_vV.js";
import { I as F } from "./lucide-react-CpYArdkX.js";
function V({ config: p }) {
  const { props: u, actions: s } = p, {
    placeholder: h = "Type a command or search...",
    emptyText: f = "No results found.",
    groups: x,
    open: t,
    defaultOpen: d = !1,
    showShortcut: j = !0,
    className: C
  } = u, [v, c] = r.useState(d);
  r.useEffect(() => {
    t !== void 0 && c(t);
  }, [t]), r.useEffect(() => {
    const o = (e) => {
      e.key === "k" && (e.metaKey || e.ctrlKey) && (e.preventDefault(), c((a) => !a));
    };
    return document.addEventListener("keydown", o), () => document.removeEventListener("keydown", o);
  }, []);
  const y = (o) => {
    if (s != null && s.onSelect) {
      const e = s.onSelect;
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
  }, l = () => /* @__PURE__ */ n.jsxs(n.Fragment, { children: [
    /* @__PURE__ */ n.jsx(k, { placeholder: h }),
    /* @__PURE__ */ n.jsxs(N, { children: [
      /* @__PURE__ */ n.jsx(O, { children: f }),
      x.map((o, e) => /* @__PURE__ */ n.jsxs(E.Fragment, { children: [
        e > 0 && /* @__PURE__ */ n.jsx(I, {}),
        /* @__PURE__ */ n.jsx(T, { heading: o.heading, children: o.items.map((a, w) => {
          const m = a.icon ? F[a.icon] : null, i = a.value || a.label;
          return /* @__PURE__ */ n.jsxs(
            L,
            {
              value: i,
              disabled: a.disabled,
              onSelect: () => y(i),
              children: [
                m && /* @__PURE__ */ n.jsx(m, { className: "mr-2 h-4 w-4" }),
                /* @__PURE__ */ n.jsx("span", { children: a.label }),
                j && a.shortcut && /* @__PURE__ */ n.jsx(D, { children: a.shortcut })
              ]
            },
            w
          );
        }) })
      ] }, e))
    ] })
  ] });
  return t !== void 0 || d ? /* @__PURE__ */ n.jsx(g, { open: v, onOpenChange: c, children: /* @__PURE__ */ n.jsx(l, {}) }) : /* @__PURE__ */ n.jsx(S, { className: b("rounded-lg border shadow-md", C), children: /* @__PURE__ */ n.jsx(l, {}) });
}
export {
  V as CommandComponent
};
