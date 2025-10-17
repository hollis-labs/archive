import { j as o, O as b, c as w } from "./badge-DBvLZUPk.js";
import { D as x, a as j, b as D, d as M, e as v, f as y, g, h as S, i as C, j as I, k as i, l as m, c as k } from "./dropdown-menu-BON8n5bi.js";
import { I as E } from "./lucide-react-CpYArdkX.js";
function p(e) {
  if (!e) return;
  const { type: r, command: s, url: n, event: a, payload: t, method: l } = e;
  r === "command" && s ? window.dispatchEvent(new CustomEvent("command:execute", { detail: { command: s, payload: t } })) : r === "navigate" && n ? window.location.href = n : r === "emit" && a ? window.dispatchEvent(new CustomEvent(a, { detail: t })) : r === "http" && n && fetch(n, {
    method: l || "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(t)
  }).catch(console.error);
}
function c(e) {
  if (!e) return null;
  const r = E[e];
  return r ? /* @__PURE__ */ o.jsx(r, { className: "h-4 w-4" }) : null;
}
function h(e, r) {
  const s = `menu-item-${r}`;
  return e.type === "separator" ? /* @__PURE__ */ o.jsx(v, {}, s) : e.type === "label" ? /* @__PURE__ */ o.jsx(y, { children: e.label }, s) : e.type === "submenu" && e.items ? /* @__PURE__ */ o.jsxs(g, { children: [
    /* @__PURE__ */ o.jsxs(S, { disabled: e.disabled, children: [
      c(e.icon),
      e.label
    ] }),
    /* @__PURE__ */ o.jsx(C, { children: e.items.map((n, a) => h(n, a)) })
  ] }, s) : e.type === "checkbox" ? /* @__PURE__ */ o.jsxs(
    I,
    {
      checked: e.checked,
      disabled: e.disabled,
      onSelect: (n) => {
        n.preventDefault(), p(e.action);
      },
      children: [
        c(e.icon),
        e.label,
        e.shortcut && /* @__PURE__ */ o.jsx(i, { children: e.shortcut })
      ]
    },
    s
  ) : e.type === "radio" ? /* @__PURE__ */ o.jsxs(
    m,
    {
      value: e.value || e.label || "",
      disabled: e.disabled,
      onSelect: (n) => {
        n.preventDefault(), p(e.action);
      },
      children: [
        c(e.icon),
        e.label,
        e.shortcut && /* @__PURE__ */ o.jsx(i, { children: e.shortcut })
      ]
    },
    s
  ) : /* @__PURE__ */ o.jsxs(
    k,
    {
      disabled: e.disabled,
      onSelect: (n) => {
        n.preventDefault(), p(e.action);
      },
      children: [
        c(e.icon),
        e.label,
        e.shortcut && /* @__PURE__ */ o.jsx(i, { children: e.shortcut })
      ]
    },
    s
  );
}
function O({ config: e }) {
  const { props: r } = e, { trigger: s, items: n, align: a = "center", side: t = "bottom", className: l } = r, f = n.some((d) => d.type === "radio");
  return /* @__PURE__ */ o.jsxs(x, { children: [
    /* @__PURE__ */ o.jsx(j, { asChild: !0, children: b(s) }),
    /* @__PURE__ */ o.jsx(D, { align: a, side: t, className: w(l), children: f ? /* @__PURE__ */ o.jsx(M, { children: n.map((d, u) => h(d, u)) }) : n.map((d, u) => h(d, u)) })
  ] });
}
export {
  O as DropdownMenuComponent
};
