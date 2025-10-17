import { j as o, ay as f, az as w, r as x, aA as j, c as D, aB as M, aC as y, aD as v, aE as C, aF as S, aG as g, aH as I, aI as p, aJ as E, aK as k, W as m } from "./index-CCDmHyX2.js";
function i(e) {
  if (!e) return;
  const { type: r, command: a, url: n, event: s, payload: t, method: l } = e;
  r === "command" && a ? window.dispatchEvent(new CustomEvent("command:execute", { detail: { command: a, payload: t } })) : r === "navigate" && n ? window.location.href = n : r === "emit" && s ? window.dispatchEvent(new CustomEvent(s, { detail: t })) : r === "http" && n && fetch(n, {
    method: l || "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(t)
  }).catch(console.error);
}
function c(e) {
  if (!e) return null;
  const r = m[e];
  return r ? /* @__PURE__ */ o.jsx(r, { className: "h-4 w-4" }) : null;
}
function h(e, r) {
  const a = `menu-item-${r}`;
  return e.type === "separator" ? /* @__PURE__ */ o.jsx(y, {}, a) : e.type === "label" ? /* @__PURE__ */ o.jsx(v, { children: e.label }, a) : e.type === "submenu" && e.items ? /* @__PURE__ */ o.jsxs(C, { children: [
    /* @__PURE__ */ o.jsxs(S, { disabled: e.disabled, children: [
      c(e.icon),
      e.label
    ] }),
    /* @__PURE__ */ o.jsx(g, { children: e.items.map((n, s) => h(n, s)) })
  ] }, a) : e.type === "checkbox" ? /* @__PURE__ */ o.jsxs(
    I,
    {
      checked: e.checked,
      disabled: e.disabled,
      onSelect: (n) => {
        n.preventDefault(), i(e.action);
      },
      children: [
        c(e.icon),
        e.label,
        e.shortcut && /* @__PURE__ */ o.jsx(p, { children: e.shortcut })
      ]
    },
    a
  ) : e.type === "radio" ? /* @__PURE__ */ o.jsxs(
    E,
    {
      value: e.value || e.label || "",
      disabled: e.disabled,
      onSelect: (n) => {
        n.preventDefault(), i(e.action);
      },
      children: [
        c(e.icon),
        e.label,
        e.shortcut && /* @__PURE__ */ o.jsx(p, { children: e.shortcut })
      ]
    },
    a
  ) : /* @__PURE__ */ o.jsxs(
    k,
    {
      disabled: e.disabled,
      onSelect: (n) => {
        n.preventDefault(), i(e.action);
      },
      children: [
        c(e.icon),
        e.label,
        e.shortcut && /* @__PURE__ */ o.jsx(p, { children: e.shortcut })
      ]
    },
    a
  );
}
function R({ config: e }) {
  const { props: r } = e, { trigger: a, items: n, align: s = "center", side: t = "bottom", className: l } = r, b = n.some((d) => d.type === "radio");
  return /* @__PURE__ */ o.jsxs(f, { children: [
    /* @__PURE__ */ o.jsx(w, { asChild: !0, children: x(a) }),
    /* @__PURE__ */ o.jsx(j, { align: s, side: t, className: D(l), children: b ? /* @__PURE__ */ o.jsx(M, { children: n.map((d, u) => h(d, u)) }) : n.map((d, u) => h(d, u)) })
  ] });
}
export {
  R as DropdownMenuComponent
};
