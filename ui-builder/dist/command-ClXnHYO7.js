import { A as L, P as j, ar as Se, as as Ie, at as Re, au as Ne, ap as V, j as S, Y as je, _ as Ae, c as $, av as _e } from "./index-DipMs7ol.js";
import * as l from "react";
var fe = 1, Me = 0.9, $e = 0.8, De = 0.17, ee = 0.1, te = 0.999, Fe = 0.9999, Ke = 0.99, Le = /[\\\/_+.#"@\[\(\{&]/, Pe = /[\\\/_+.#"@\[\(\{&]/g, qe = /[\s-]/, ge = /[\s-]/g;
function ne(e, n, r, m, u, d, c) {
  if (d === n.length) return u === e.length ? fe : Ke;
  var f = `${u},${d}`;
  if (c[f] !== void 0) return c[f];
  for (var b = m.charAt(d), o = r.indexOf(b, u), v = 0, g, I, w, R; o >= 0; ) g = ne(e, n, r, m, o + 1, d + 1, c), g > v && (o === u ? g *= fe : Le.test(e.charAt(o - 1)) ? (g *= $e, w = e.slice(u, o - 1).match(Pe), w && u > 0 && (g *= Math.pow(te, w.length))) : qe.test(e.charAt(o - 1)) ? (g *= Me, R = e.slice(u, o - 1).match(ge), R && u > 0 && (g *= Math.pow(te, R.length))) : (g *= De, u > 0 && (g *= Math.pow(te, o - u))), e.charAt(o) !== n.charAt(d) && (g *= Fe)), (g < ee && r.charAt(o - 1) === m.charAt(d + 1) || m.charAt(d + 1) === m.charAt(d) && r.charAt(o - 1) !== m.charAt(d)) && (I = ne(e, n, r, m, o + 1, d + 2, c), I * ee > g && (g = I * ee)), g > v && (v = g), o = r.indexOf(b, o + 1);
  return c[f] = v, v;
}
function pe(e) {
  return e.toLowerCase().replace(ge, " ");
}
function Ve(e, n, r) {
  return e = r && r.length > 0 ? `${e + " " + r.join(" ")}` : e, ne(e, n, pe(e), pe(n), 0, 0, {});
}
var q = '[cmdk-group=""]', re = '[cmdk-group-items=""]', Oe = '[cmdk-group-heading=""]', he = '[cmdk-item=""]', ve = `${he}:not([aria-disabled="true"])`, le = "cmdk-item-select", F = "data-value", ze = (e, n, r) => Ve(e, n, r), be = l.createContext(void 0), O = () => l.useContext(be), xe = l.createContext(void 0), ae = () => l.useContext(xe), ye = l.createContext(void 0), we = l.forwardRef((e, n) => {
  let r = K(() => {
    var t, i;
    return { search: "", value: (i = (t = e.value) != null ? t : e.defaultValue) != null ? i : "", selectedItemId: void 0, filtered: { count: 0, items: /* @__PURE__ */ new Map(), groups: /* @__PURE__ */ new Set() } };
  }), m = K(() => /* @__PURE__ */ new Set()), u = K(() => /* @__PURE__ */ new Map()), d = K(() => /* @__PURE__ */ new Map()), c = K(() => /* @__PURE__ */ new Set()), f = ke(e), { label: b, children: o, value: v, onValueChange: g, filter: I, shouldFilter: w, loop: R, disablePointerSelection: U = !1, vimBindings: A = !0, ...z } = e, H = L(), ue = L(), T = L(), _ = l.useRef(null), x = Ze();
  M(() => {
    if (v !== void 0) {
      let t = v.trim();
      r.current.value = t, k.emit();
    }
  }, [v]), M(() => {
    x(6, ie);
  }, []);
  let k = l.useMemo(() => ({ subscribe: (t) => (c.current.add(t), () => c.current.delete(t)), snapshot: () => r.current, setState: (t, i, s) => {
    var a, p, h, C;
    if (!Object.is(r.current[t], i)) {
      if (r.current[t] = i, t === "search") X(), Y(), x(1, J);
      else if (t === "value") {
        if (document.activeElement.hasAttribute("cmdk-input") || document.activeElement.hasAttribute("cmdk-root")) {
          let y = document.getElementById(T);
          y ? y.focus() : (a = document.getElementById(H)) == null || a.focus();
        }
        if (x(7, () => {
          var y;
          r.current.selectedItemId = (y = D()) == null ? void 0 : y.id, k.emit();
        }), s || x(5, ie), ((p = f.current) == null ? void 0 : p.value) !== void 0) {
          let y = i ?? "";
          (C = (h = f.current).onValueChange) == null || C.call(h, y);
          return;
        }
      }
      k.emit();
    }
  }, emit: () => {
    c.current.forEach((t) => t());
  } }), []), W = l.useMemo(() => ({ value: (t, i, s) => {
    var a;
    i !== ((a = d.current.get(t)) == null ? void 0 : a.value) && (d.current.set(t, { value: i, keywords: s }), r.current.filtered.items.set(t, oe(i, s)), x(2, () => {
      Y(), k.emit();
    }));
  }, item: (t, i) => (m.current.add(t), i && (u.current.has(i) ? u.current.get(i).add(t) : u.current.set(i, /* @__PURE__ */ new Set([t]))), x(3, () => {
    X(), Y(), r.current.value || J(), k.emit();
  }), () => {
    d.current.delete(t), m.current.delete(t), r.current.filtered.items.delete(t);
    let s = D();
    x(4, () => {
      X(), (s == null ? void 0 : s.getAttribute("id")) === t && J(), k.emit();
    });
  }), group: (t) => (u.current.has(t) || u.current.set(t, /* @__PURE__ */ new Set()), () => {
    d.current.delete(t), u.current.delete(t);
  }), filter: () => f.current.shouldFilter, label: b || e["aria-label"], getDisablePointerSelection: () => f.current.disablePointerSelection, listId: H, inputId: T, labelId: ue, listInnerRef: _ }), []);
  function oe(t, i) {
    var s, a;
    let p = (a = (s = f.current) == null ? void 0 : s.filter) != null ? a : ze;
    return t ? p(t, r.current.search, i) : 0;
  }
  function Y() {
    if (!r.current.search || f.current.shouldFilter === !1) return;
    let t = r.current.filtered.items, i = [];
    r.current.filtered.groups.forEach((a) => {
      let p = u.current.get(a), h = 0;
      p.forEach((C) => {
        let y = t.get(C);
        h = Math.max(y, h);
      }), i.push([a, h]);
    });
    let s = _.current;
    P().sort((a, p) => {
      var h, C;
      let y = a.getAttribute("id"), B = p.getAttribute("id");
      return ((h = t.get(B)) != null ? h : 0) - ((C = t.get(y)) != null ? C : 0);
    }).forEach((a) => {
      let p = a.closest(re);
      p ? p.appendChild(a.parentElement === p ? a : a.closest(`${re} > *`)) : s.appendChild(a.parentElement === s ? a : a.closest(`${re} > *`));
    }), i.sort((a, p) => p[1] - a[1]).forEach((a) => {
      var p;
      let h = (p = _.current) == null ? void 0 : p.querySelector(`${q}[${F}="${encodeURIComponent(a[0])}"]`);
      h == null || h.parentElement.appendChild(h);
    });
  }
  function J() {
    let t = P().find((s) => s.getAttribute("aria-disabled") !== "true"), i = t == null ? void 0 : t.getAttribute(F);
    k.setState("value", i || void 0);
  }
  function X() {
    var t, i, s, a;
    if (!r.current.search || f.current.shouldFilter === !1) {
      r.current.filtered.count = m.current.size;
      return;
    }
    r.current.filtered.groups = /* @__PURE__ */ new Set();
    let p = 0;
    for (let h of m.current) {
      let C = (i = (t = d.current.get(h)) == null ? void 0 : t.value) != null ? i : "", y = (a = (s = d.current.get(h)) == null ? void 0 : s.keywords) != null ? a : [], B = oe(C, y);
      r.current.filtered.items.set(h, B), B > 0 && p++;
    }
    for (let [h, C] of u.current) for (let y of C) if (r.current.filtered.items.get(y) > 0) {
      r.current.filtered.groups.add(h);
      break;
    }
    r.current.filtered.count = p;
  }
  function ie() {
    var t, i, s;
    let a = D();
    a && (((t = a.parentElement) == null ? void 0 : t.firstChild) === a && ((s = (i = a.closest(q)) == null ? void 0 : i.querySelector(Oe)) == null || s.scrollIntoView({ block: "nearest" })), a.scrollIntoView({ block: "nearest" }));
  }
  function D() {
    var t;
    return (t = _.current) == null ? void 0 : t.querySelector(`${he}[aria-selected="true"]`);
  }
  function P() {
    var t;
    return Array.from(((t = _.current) == null ? void 0 : t.querySelectorAll(ve)) || []);
  }
  function Q(t) {
    let i = P()[t];
    i && k.setState("value", i.getAttribute(F));
  }
  function Z(t) {
    var i;
    let s = D(), a = P(), p = a.findIndex((C) => C === s), h = a[p + t];
    (i = f.current) != null && i.loop && (h = p + t < 0 ? a[a.length - 1] : p + t === a.length ? a[0] : a[p + t]), h && k.setState("value", h.getAttribute(F));
  }
  function de(t) {
    let i = D(), s = i == null ? void 0 : i.closest(q), a;
    for (; s && !a; ) s = t > 0 ? Xe(s, q) : Qe(s, q), a = s == null ? void 0 : s.querySelector(ve);
    a ? k.setState("value", a.getAttribute(F)) : Z(t);
  }
  let ce = () => Q(P().length - 1), se = (t) => {
    t.preventDefault(), t.metaKey ? ce() : t.altKey ? de(1) : Z(1);
  }, me = (t) => {
    t.preventDefault(), t.metaKey ? Q(0) : t.altKey ? de(-1) : Z(-1);
  };
  return l.createElement(j.div, { ref: n, tabIndex: -1, ...z, "cmdk-root": "", onKeyDown: (t) => {
    var i;
    (i = z.onKeyDown) == null || i.call(z, t);
    let s = t.nativeEvent.isComposing || t.keyCode === 229;
    if (!(t.defaultPrevented || s)) switch (t.key) {
      case "n":
      case "j": {
        A && t.ctrlKey && se(t);
        break;
      }
      case "ArrowDown": {
        se(t);
        break;
      }
      case "p":
      case "k": {
        A && t.ctrlKey && me(t);
        break;
      }
      case "ArrowUp": {
        me(t);
        break;
      }
      case "Home": {
        t.preventDefault(), Q(0);
        break;
      }
      case "End": {
        t.preventDefault(), ce();
        break;
      }
      case "Enter": {
        t.preventDefault();
        let a = D();
        if (a) {
          let p = new Event(le);
          a.dispatchEvent(p);
        }
      }
    }
  } }, l.createElement("label", { "cmdk-label": "", htmlFor: W.inputId, id: W.labelId, style: tt }, b), G(e, (t) => l.createElement(xe.Provider, { value: k }, l.createElement(be.Provider, { value: W }, t))));
}), Be = l.forwardRef((e, n) => {
  var r, m;
  let u = L(), d = l.useRef(null), c = l.useContext(ye), f = O(), b = ke(e), o = (m = (r = b.current) == null ? void 0 : r.forceMount) != null ? m : c == null ? void 0 : c.forceMount;
  M(() => {
    if (!o) return f.item(u, c == null ? void 0 : c.id);
  }, [o]);
  let v = Ee(u, d, [e.value, e.children, d], e.keywords), g = ae(), I = N((x) => x.value && x.value === v.current), w = N((x) => o || f.filter() === !1 ? !0 : x.search ? x.filtered.items.get(u) > 0 : !0);
  l.useEffect(() => {
    let x = d.current;
    if (!(!x || e.disabled)) return x.addEventListener(le, R), () => x.removeEventListener(le, R);
  }, [w, e.onSelect, e.disabled]);
  function R() {
    var x, k;
    U(), (k = (x = b.current).onSelect) == null || k.call(x, v.current);
  }
  function U() {
    g.setState("value", v.current, !0);
  }
  if (!w) return null;
  let { disabled: A, value: z, onSelect: H, forceMount: ue, keywords: T, ..._ } = e;
  return l.createElement(j.div, { ref: V(d, n), ..._, id: u, "cmdk-item": "", role: "option", "aria-disabled": !!A, "aria-selected": !!I, "data-disabled": !!A, "data-selected": !!I, onPointerMove: A || f.getDisablePointerSelection() ? void 0 : U, onClick: A ? void 0 : R }, e.children);
}), Ge = l.forwardRef((e, n) => {
  let { heading: r, children: m, forceMount: u, ...d } = e, c = L(), f = l.useRef(null), b = l.useRef(null), o = L(), v = O(), g = N((w) => u || v.filter() === !1 ? !0 : w.search ? w.filtered.groups.has(c) : !0);
  M(() => v.group(c), []), Ee(c, f, [e.value, e.heading, b]);
  let I = l.useMemo(() => ({ id: c, forceMount: u }), [u]);
  return l.createElement(j.div, { ref: V(f, n), ...d, "cmdk-group": "", role: "presentation", hidden: g ? void 0 : !0 }, r && l.createElement("div", { ref: b, "cmdk-group-heading": "", "aria-hidden": !0, id: o }, r), G(e, (w) => l.createElement("div", { "cmdk-group-items": "", role: "group", "aria-labelledby": r ? o : void 0 }, l.createElement(ye.Provider, { value: I }, w))));
}), Ue = l.forwardRef((e, n) => {
  let { alwaysRender: r, ...m } = e, u = l.useRef(null), d = N((c) => !c.search);
  return !r && !d ? null : l.createElement(j.div, { ref: V(u, n), ...m, "cmdk-separator": "", role: "separator" });
}), He = l.forwardRef((e, n) => {
  let { onValueChange: r, ...m } = e, u = e.value != null, d = ae(), c = N((o) => o.search), f = N((o) => o.selectedItemId), b = O();
  return l.useEffect(() => {
    e.value != null && d.setState("search", e.value);
  }, [e.value]), l.createElement(j.input, { ref: n, ...m, "cmdk-input": "", autoComplete: "off", autoCorrect: "off", spellCheck: !1, "aria-autocomplete": "list", role: "combobox", "aria-expanded": !0, "aria-controls": b.listId, "aria-labelledby": b.labelId, "aria-activedescendant": f, id: b.inputId, type: "text", value: u ? e.value : c, onChange: (o) => {
    u || d.setState("search", o.target.value), r == null || r(o.target.value);
  } });
}), Te = l.forwardRef((e, n) => {
  let { children: r, label: m = "Suggestions", ...u } = e, d = l.useRef(null), c = l.useRef(null), f = N((o) => o.selectedItemId), b = O();
  return l.useEffect(() => {
    if (c.current && d.current) {
      let o = c.current, v = d.current, g, I = new ResizeObserver(() => {
        g = requestAnimationFrame(() => {
          let w = o.offsetHeight;
          v.style.setProperty("--cmdk-list-height", w.toFixed(1) + "px");
        });
      });
      return I.observe(o), () => {
        cancelAnimationFrame(g), I.unobserve(o);
      };
    }
  }, []), l.createElement(j.div, { ref: V(d, n), ...u, "cmdk-list": "", role: "listbox", tabIndex: -1, "aria-activedescendant": f, "aria-label": m, id: b.listId }, G(e, (o) => l.createElement("div", { ref: V(c, b.listInnerRef), "cmdk-list-sizer": "" }, o)));
}), We = l.forwardRef((e, n) => {
  let { open: r, onOpenChange: m, overlayClassName: u, contentClassName: d, container: c, ...f } = e;
  return l.createElement(Se, { open: r, onOpenChange: m }, l.createElement(Ie, { container: c }, l.createElement(Re, { "cmdk-overlay": "", className: u }), l.createElement(Ne, { "aria-label": e.label, "cmdk-dialog": "", className: d }, l.createElement(we, { ref: n, ...f }))));
}), Ye = l.forwardRef((e, n) => N((r) => r.filtered.count === 0) ? l.createElement(j.div, { ref: n, ...e, "cmdk-empty": "", role: "presentation" }) : null), Je = l.forwardRef((e, n) => {
  let { progress: r, children: m, label: u = "Loading...", ...d } = e;
  return l.createElement(j.div, { ref: n, ...d, "cmdk-loading": "", role: "progressbar", "aria-valuenow": r, "aria-valuemin": 0, "aria-valuemax": 100, "aria-label": u }, G(e, (c) => l.createElement("div", { "aria-hidden": !0 }, c)));
}), E = Object.assign(we, { List: Te, Item: Be, Input: He, Group: Ge, Separator: Ue, Dialog: We, Empty: Ye, Loading: Je });
function Xe(e, n) {
  let r = e.nextElementSibling;
  for (; r; ) {
    if (r.matches(n)) return r;
    r = r.nextElementSibling;
  }
}
function Qe(e, n) {
  let r = e.previousElementSibling;
  for (; r; ) {
    if (r.matches(n)) return r;
    r = r.previousElementSibling;
  }
}
function ke(e) {
  let n = l.useRef(e);
  return M(() => {
    n.current = e;
  }), n;
}
var M = typeof window > "u" ? l.useEffect : l.useLayoutEffect;
function K(e) {
  let n = l.useRef();
  return n.current === void 0 && (n.current = e()), n;
}
function N(e) {
  let n = ae(), r = () => e(n.snapshot());
  return l.useSyncExternalStore(n.subscribe, r, r);
}
function Ee(e, n, r, m = []) {
  let u = l.useRef(), d = O();
  return M(() => {
    var c;
    let f = (() => {
      var o;
      for (let v of r) {
        if (typeof v == "string") return v.trim();
        if (typeof v == "object" && "current" in v) return v.current ? (o = v.current.textContent) == null ? void 0 : o.trim() : u.current;
      }
    })(), b = m.map((o) => o.trim());
    d.value(e, f, b), (c = n.current) == null || c.setAttribute(F, f), u.current = f;
  }), u;
}
var Ze = () => {
  let [e, n] = l.useState(), r = K(() => /* @__PURE__ */ new Map());
  return M(() => {
    r.current.forEach((m) => m()), r.current = /* @__PURE__ */ new Map();
  }, [e]), (m, u) => {
    r.current.set(m, u), n({});
  };
};
function et(e) {
  let n = e.type;
  return typeof n == "function" ? n(e.props) : "render" in n ? n.render(e.props) : e;
}
function G({ asChild: e, children: n }, r) {
  return e && l.isValidElement(n) ? l.cloneElement(et(n), { ref: n.ref }, r(n.props.children)) : r(n);
}
var tt = { position: "absolute", width: "1px", height: "1px", padding: "0", margin: "-1px", overflow: "hidden", clip: "rect(0, 0, 0, 0)", whiteSpace: "nowrap", borderWidth: "0" };
const Ce = l.forwardRef(({ className: e, ...n }, r) => /* @__PURE__ */ S.jsx(
  E,
  {
    ref: r,
    className: $(
      "flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",
      e
    ),
    ...n
  }
));
Ce.displayName = E.displayName;
const ct = ({ children: e, ...n }) => /* @__PURE__ */ S.jsx(je, { ...n, children: /* @__PURE__ */ S.jsx(Ae, { className: "overflow-hidden p-0", children: /* @__PURE__ */ S.jsx(Ce, { className: "[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5", children: e }) }) }), rt = l.forwardRef(({ className: e, ...n }, r) => /* @__PURE__ */ S.jsxs("div", { className: "flex items-center border-b px-3", "cmdk-input-wrapper": "", children: [
  /* @__PURE__ */ S.jsx(_e, { className: "mr-2 h-4 w-4 shrink-0 opacity-50" }),
  /* @__PURE__ */ S.jsx(
    E.Input,
    {
      ref: r,
      className: $(
        "flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
        e
      ),
      ...n
    }
  )
] }));
rt.displayName = E.Input.displayName;
const nt = l.forwardRef(({ className: e, ...n }, r) => /* @__PURE__ */ S.jsx(
  E.List,
  {
    ref: r,
    className: $("max-h-[300px] overflow-y-auto overflow-x-hidden", e),
    ...n
  }
));
nt.displayName = E.List.displayName;
const lt = l.forwardRef((e, n) => /* @__PURE__ */ S.jsx(
  E.Empty,
  {
    ref: n,
    className: "py-6 text-center text-sm",
    ...e
  }
));
lt.displayName = E.Empty.displayName;
const at = l.forwardRef(({ className: e, ...n }, r) => /* @__PURE__ */ S.jsx(
  E.Group,
  {
    ref: r,
    className: $(
      "overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
      e
    ),
    ...n
  }
));
at.displayName = E.Group.displayName;
const ut = l.forwardRef(({ className: e, ...n }, r) => /* @__PURE__ */ S.jsx(
  E.Separator,
  {
    ref: r,
    className: $("-mx-1 h-px bg-border", e),
    ...n
  }
));
ut.displayName = E.Separator.displayName;
const ot = l.forwardRef(({ className: e, ...n }, r) => /* @__PURE__ */ S.jsx(
  E.Item,
  {
    ref: r,
    className: $(
      "relative flex cursor-default gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      e
    ),
    ...n
  }
));
ot.displayName = E.Item.displayName;
const it = ({
  className: e,
  ...n
}) => /* @__PURE__ */ S.jsx(
  "span",
  {
    className: $(
      "ml-auto text-xs tracking-widest text-muted-foreground",
      e
    ),
    ...n
  }
);
it.displayName = "CommandShortcut";
export {
  ct as C,
  Ce as a,
  rt as b,
  nt as c,
  lt as d,
  ut as e,
  at as f,
  ot as g,
  it as h
};
