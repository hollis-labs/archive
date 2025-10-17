import { j as e, c as g, A as w, b as N, d as k, B as C, O as b } from "./badge-DBvLZUPk.js";
import { I as y } from "./lucide-react-CpYArdkX.js";
function A({ config: h }) {
  const { props: v, actions: s } = h, {
    title: t,
    description: c,
    icon: i,
    avatar: n,
    badge: r,
    trailing: l,
    className: f
  } = v || {}, j = () => {
    if (s != null && s.click) {
      const { type: a, command: m, event: x, url: p, payload: u } = s.click;
      a === "command" && m ? window.dispatchEvent(new CustomEvent("command:execute", { detail: { command: m, payload: u } })) : a === "emit" && x ? window.dispatchEvent(new CustomEvent(x, { detail: u })) : a === "navigate" && p && (window.location.href = p);
    }
  }, o = i ? y[i] : null, d = !!(s != null && s.click);
  return /* @__PURE__ */ e.jsxs(
    "div",
    {
      className: g(
        "flex items-center gap-3 px-4 py-3 rounded-md transition-colors",
        d && "cursor-pointer hover:bg-accent",
        f
      ),
      onClick: d ? j : void 0,
      children: [
        n && /* @__PURE__ */ e.jsxs(w, { className: "h-10 w-10", children: [
          /* @__PURE__ */ e.jsx(N, { src: n, alt: t }),
          /* @__PURE__ */ e.jsx(k, { children: t.substring(0, 2).toUpperCase() })
        ] }),
        o && !n && /* @__PURE__ */ e.jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-md bg-muted", children: /* @__PURE__ */ e.jsx(o, { className: "h-5 w-5 text-muted-foreground" }) }),
        /* @__PURE__ */ e.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ e.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ e.jsx("p", { className: "text-sm font-medium leading-none truncate", children: t }),
            r && /* @__PURE__ */ e.jsx(C, { variant: "secondary", className: "text-xs", children: r })
          ] }),
          c && /* @__PURE__ */ e.jsx("p", { className: "text-sm text-muted-foreground mt-1 truncate", children: c })
        ] }),
        l && /* @__PURE__ */ e.jsx("div", { className: "flex-shrink-0", children: b(l) })
      ]
    }
  );
}
export {
  A as ItemComponent
};
