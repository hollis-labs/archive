import { j as e, Q as g, c as w, a_ as N, a$ as b, b0 as k, b1 as C, r as y } from "./index-BvjF5Aq2.js";
function I({ config: h }) {
  const { props: v, actions: s } = h, {
    title: t,
    description: c,
    icon: i,
    avatar: a,
    badge: r,
    trailing: l,
    className: f
  } = v || {}, j = () => {
    if (s != null && s.click) {
      const { type: n, command: m, event: x, url: p, payload: u } = s.click;
      n === "command" && m ? window.dispatchEvent(new CustomEvent("command:execute", { detail: { command: m, payload: u } })) : n === "emit" && x ? window.dispatchEvent(new CustomEvent(x, { detail: u })) : n === "navigate" && p && (window.location.href = p);
    }
  }, d = i ? g[i] : null, o = !!(s != null && s.click);
  return /* @__PURE__ */ e.jsxs(
    "div",
    {
      className: w(
        "flex items-center gap-3 px-4 py-3 rounded-md transition-colors",
        o && "cursor-pointer hover:bg-accent",
        f
      ),
      onClick: o ? j : void 0,
      children: [
        a && /* @__PURE__ */ e.jsxs(N, { className: "h-10 w-10", children: [
          /* @__PURE__ */ e.jsx(b, { src: a, alt: t }),
          /* @__PURE__ */ e.jsx(k, { children: t.substring(0, 2).toUpperCase() })
        ] }),
        d && !a && /* @__PURE__ */ e.jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-md bg-muted", children: /* @__PURE__ */ e.jsx(d, { className: "h-5 w-5 text-muted-foreground" }) }),
        /* @__PURE__ */ e.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ e.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ e.jsx("p", { className: "text-sm font-medium leading-none truncate", children: t }),
            r && /* @__PURE__ */ e.jsx(C, { variant: "secondary", className: "text-xs", children: r })
          ] }),
          c && /* @__PURE__ */ e.jsx("p", { className: "text-sm text-muted-foreground mt-1 truncate", children: c })
        ] }),
        l && /* @__PURE__ */ e.jsx("div", { className: "flex-shrink-0", children: y(l) })
      ]
    }
  );
}
export {
  I as ItemComponent
};
