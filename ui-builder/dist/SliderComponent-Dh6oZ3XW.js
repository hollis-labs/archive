import { b as ue, j as l, d as fe, l as me, f as _, P as T, e as j, u as pe, m as Y, i as he, h as ge, c as $ } from "./index-fsMg7Z1a.js";
import * as f from "react";
var X = ["PageUp", "PageDown"], G = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"], W = {
  "from-left": ["Home", "PageDown", "ArrowDown", "ArrowLeft"],
  "from-right": ["Home", "PageDown", "ArrowDown", "ArrowRight"],
  "from-bottom": ["Home", "PageDown", "ArrowDown", "ArrowLeft"],
  "from-top": ["Home", "PageDown", "ArrowUp", "ArrowLeft"]
}, M = "Slider", [H, ve, Se] = me(M), [q] = fe(M, [
  Se
]), [xe, V] = q(M), J = f.forwardRef(
  (e, t) => {
    const {
      name: n,
      min: r = 0,
      max: i = 100,
      step: c = 1,
      orientation: o = "horizontal",
      disabled: s = !1,
      minStepsBetweenThumbs: d = 0,
      defaultValue: p = [r],
      value: S,
      onValueChange: a = () => {
      },
      onValueCommit: u = () => {
      },
      inverted: v = !1,
      form: x,
      ...h
    } = e, m = f.useRef(/* @__PURE__ */ new Set()), g = f.useRef(0), b = o === "horizontal" ? we : be, [w = [], N] = ue({
      prop: S,
      defaultProp: p,
      onChange: (y) => {
        var C;
        (C = [...m.current][g.current]) == null || C.focus(), a(y);
      }
    }), B = f.useRef(w);
    function K(y) {
      const R = Ce(w, y);
      I(y, R);
    }
    function le(y) {
      I(y, g.current);
    }
    function de() {
      const y = B.current[g.current];
      w[g.current] !== y && u(w);
    }
    function I(y, R, { commit: C } = { commit: !1 }) {
      const F = Me(c), k = Ne(Math.round((y - r) / c) * c + r, F), A = Y(k, [r, i]);
      N((D = []) => {
        const P = Pe(D, A, R);
        if (je(P, d * c)) {
          g.current = P.indexOf(A);
          const U = String(P) !== String(D);
          return U && C && u(P), U ? P : D;
        } else
          return D;
      });
    }
    return /* @__PURE__ */ l.jsx(
      xe,
      {
        scope: e.__scopeSlider,
        name: n,
        disabled: s,
        min: r,
        max: i,
        valueIndexToChangeRef: g,
        thumbs: m.current,
        values: w,
        orientation: o,
        form: x,
        children: /* @__PURE__ */ l.jsx(H.Provider, { scope: e.__scopeSlider, children: /* @__PURE__ */ l.jsx(H.Slot, { scope: e.__scopeSlider, children: /* @__PURE__ */ l.jsx(
          b,
          {
            "aria-disabled": s,
            "data-disabled": s ? "" : void 0,
            ...h,
            ref: t,
            onPointerDown: _(h.onPointerDown, () => {
              s || (B.current = w);
            }),
            min: r,
            max: i,
            inverted: v,
            onSlideStart: s ? void 0 : K,
            onSlideMove: s ? void 0 : le,
            onSlideEnd: s ? void 0 : de,
            onHomeKeyDown: () => !s && I(r, 0, { commit: !0 }),
            onEndKeyDown: () => !s && I(i, w.length - 1, { commit: !0 }),
            onStepKeyDown: ({ event: y, direction: R }) => {
              if (!s) {
                const k = X.includes(y.key) || y.shiftKey && G.includes(y.key) ? 10 : 1, A = g.current, D = w[A], P = c * k * R;
                I(D + P, A, { commit: !0 });
              }
            }
          }
        ) }) })
      }
    );
  }
);
J.displayName = M;
var [Q, Z] = q(M, {
  startEdge: "left",
  endEdge: "right",
  size: "width",
  direction: 1
}), we = f.forwardRef(
  (e, t) => {
    const {
      min: n,
      max: r,
      dir: i,
      inverted: c,
      onSlideStart: o,
      onSlideMove: s,
      onSlideEnd: d,
      onStepKeyDown: p,
      ...S
    } = e, [a, u] = f.useState(null), v = j(t, (b) => u(b)), x = f.useRef(void 0), h = pe(i), m = h === "ltr", g = m && !c || !m && c;
    function E(b) {
      const w = x.current || a.getBoundingClientRect(), N = [0, w.width], K = O(N, g ? [n, r] : [r, n]);
      return x.current = w, K(b - w.left);
    }
    return /* @__PURE__ */ l.jsx(
      Q,
      {
        scope: e.__scopeSlider,
        startEdge: g ? "left" : "right",
        endEdge: g ? "right" : "left",
        direction: g ? 1 : -1,
        size: "width",
        children: /* @__PURE__ */ l.jsx(
          ee,
          {
            dir: h,
            "data-orientation": "horizontal",
            ...S,
            ref: v,
            style: {
              ...S.style,
              "--radix-slider-thumb-transform": "translateX(-50%)"
            },
            onSlideStart: (b) => {
              const w = E(b.clientX);
              o == null || o(w);
            },
            onSlideMove: (b) => {
              const w = E(b.clientX);
              s == null || s(w);
            },
            onSlideEnd: () => {
              x.current = void 0, d == null || d();
            },
            onStepKeyDown: (b) => {
              const N = W[g ? "from-left" : "from-right"].includes(b.key);
              p == null || p({ event: b, direction: N ? -1 : 1 });
            }
          }
        )
      }
    );
  }
), be = f.forwardRef(
  (e, t) => {
    const {
      min: n,
      max: r,
      inverted: i,
      onSlideStart: c,
      onSlideMove: o,
      onSlideEnd: s,
      onStepKeyDown: d,
      ...p
    } = e, S = f.useRef(null), a = j(t, S), u = f.useRef(void 0), v = !i;
    function x(h) {
      const m = u.current || S.current.getBoundingClientRect(), g = [0, m.height], b = O(g, v ? [r, n] : [n, r]);
      return u.current = m, b(h - m.top);
    }
    return /* @__PURE__ */ l.jsx(
      Q,
      {
        scope: e.__scopeSlider,
        startEdge: v ? "bottom" : "top",
        endEdge: v ? "top" : "bottom",
        size: "height",
        direction: v ? 1 : -1,
        children: /* @__PURE__ */ l.jsx(
          ee,
          {
            "data-orientation": "vertical",
            ...p,
            ref: a,
            style: {
              ...p.style,
              "--radix-slider-thumb-transform": "translateY(50%)"
            },
            onSlideStart: (h) => {
              const m = x(h.clientY);
              c == null || c(m);
            },
            onSlideMove: (h) => {
              const m = x(h.clientY);
              o == null || o(m);
            },
            onSlideEnd: () => {
              u.current = void 0, s == null || s();
            },
            onStepKeyDown: (h) => {
              const g = W[v ? "from-bottom" : "from-top"].includes(h.key);
              d == null || d({ event: h, direction: g ? -1 : 1 });
            }
          }
        )
      }
    );
  }
), ee = f.forwardRef(
  (e, t) => {
    const {
      __scopeSlider: n,
      onSlideStart: r,
      onSlideMove: i,
      onSlideEnd: c,
      onHomeKeyDown: o,
      onEndKeyDown: s,
      onStepKeyDown: d,
      ...p
    } = e, S = V(M, n);
    return /* @__PURE__ */ l.jsx(
      T.span,
      {
        ...p,
        ref: t,
        onKeyDown: _(e.onKeyDown, (a) => {
          a.key === "Home" ? (o(a), a.preventDefault()) : a.key === "End" ? (s(a), a.preventDefault()) : X.concat(G).includes(a.key) && (d(a), a.preventDefault());
        }),
        onPointerDown: _(e.onPointerDown, (a) => {
          const u = a.target;
          u.setPointerCapture(a.pointerId), a.preventDefault(), S.thumbs.has(u) ? u.focus() : r(a);
        }),
        onPointerMove: _(e.onPointerMove, (a) => {
          a.target.hasPointerCapture(a.pointerId) && i(a);
        }),
        onPointerUp: _(e.onPointerUp, (a) => {
          const u = a.target;
          u.hasPointerCapture(a.pointerId) && (u.releasePointerCapture(a.pointerId), c(a));
        })
      }
    );
  }
), te = "SliderTrack", ne = f.forwardRef(
  (e, t) => {
    const { __scopeSlider: n, ...r } = e, i = V(te, n);
    return /* @__PURE__ */ l.jsx(
      T.span,
      {
        "data-disabled": i.disabled ? "" : void 0,
        "data-orientation": i.orientation,
        ...r,
        ref: t
      }
    );
  }
);
ne.displayName = te;
var z = "SliderRange", oe = f.forwardRef(
  (e, t) => {
    const { __scopeSlider: n, ...r } = e, i = V(z, n), c = Z(z, n), o = f.useRef(null), s = j(t, o), d = i.values.length, p = i.values.map(
      (u) => ie(u, i.min, i.max)
    ), S = d > 1 ? Math.min(...p) : 0, a = 100 - Math.max(...p);
    return /* @__PURE__ */ l.jsx(
      T.span,
      {
        "data-orientation": i.orientation,
        "data-disabled": i.disabled ? "" : void 0,
        ...r,
        ref: s,
        style: {
          ...e.style,
          [c.startEdge]: S + "%",
          [c.endEdge]: a + "%"
        }
      }
    );
  }
);
oe.displayName = z;
var L = "SliderThumb", re = f.forwardRef(
  (e, t) => {
    const n = ve(e.__scopeSlider), [r, i] = f.useState(null), c = j(t, (s) => i(s)), o = f.useMemo(
      () => r ? n().findIndex((s) => s.ref.current === r) : -1,
      [n, r]
    );
    return /* @__PURE__ */ l.jsx(ye, { ...e, ref: c, index: o });
  }
), ye = f.forwardRef(
  (e, t) => {
    const { __scopeSlider: n, index: r, name: i, ...c } = e, o = V(L, n), s = Z(L, n), [d, p] = f.useState(null), S = j(t, (E) => p(E)), a = d ? o.form || !!d.closest("form") : !0, u = he(d), v = o.values[r], x = v === void 0 ? 0 : ie(v, o.min, o.max), h = Ee(r, o.values.length), m = u == null ? void 0 : u[s.size], g = m ? De(m, x, s.direction) : 0;
    return f.useEffect(() => {
      if (d)
        return o.thumbs.add(d), () => {
          o.thumbs.delete(d);
        };
    }, [d, o.thumbs]), /* @__PURE__ */ l.jsxs(
      "span",
      {
        style: {
          transform: "var(--radix-slider-thumb-transform)",
          position: "absolute",
          [s.startEdge]: `calc(${x}% + ${g}px)`
        },
        children: [
          /* @__PURE__ */ l.jsx(H.ItemSlot, { scope: e.__scopeSlider, children: /* @__PURE__ */ l.jsx(
            T.span,
            {
              role: "slider",
              "aria-label": e["aria-label"] || h,
              "aria-valuemin": o.min,
              "aria-valuenow": v,
              "aria-valuemax": o.max,
              "aria-orientation": o.orientation,
              "data-orientation": o.orientation,
              "data-disabled": o.disabled ? "" : void 0,
              tabIndex: o.disabled ? void 0 : 0,
              ...c,
              ref: S,
              style: v === void 0 ? { display: "none" } : e.style,
              onFocus: _(e.onFocus, () => {
                o.valueIndexToChangeRef.current = r;
              })
            }
          ) }),
          a && /* @__PURE__ */ l.jsx(
            se,
            {
              name: i ?? (o.name ? o.name + (o.values.length > 1 ? "[]" : "") : void 0),
              form: o.form,
              value: v
            },
            r
          )
        ]
      }
    );
  }
);
re.displayName = L;
var Re = "RadioBubbleInput", se = f.forwardRef(
  ({ __scopeSlider: e, value: t, ...n }, r) => {
    const i = f.useRef(null), c = j(i, r), o = ge(t);
    return f.useEffect(() => {
      const s = i.current;
      if (!s) return;
      const d = window.HTMLInputElement.prototype, S = Object.getOwnPropertyDescriptor(d, "value").set;
      if (o !== t && S) {
        const a = new Event("input", { bubbles: !0 });
        S.call(s, t), s.dispatchEvent(a);
      }
    }, [o, t]), /* @__PURE__ */ l.jsx(
      T.input,
      {
        style: { display: "none" },
        ...n,
        ref: c,
        defaultValue: t
      }
    );
  }
);
se.displayName = Re;
function Pe(e = [], t, n) {
  const r = [...e];
  return r[n] = t, r.sort((i, c) => i - c);
}
function ie(e, t, n) {
  const c = 100 / (n - t) * (e - t);
  return Y(c, [0, 100]);
}
function Ee(e, t) {
  return t > 2 ? `Value ${e + 1} of ${t}` : t === 2 ? ["Minimum", "Maximum"][e] : void 0;
}
function Ce(e, t) {
  if (e.length === 1) return 0;
  const n = e.map((i) => Math.abs(i - t)), r = Math.min(...n);
  return n.indexOf(r);
}
function De(e, t, n) {
  const r = e / 2, c = O([0, 50], [0, r]);
  return (r - c(t) * n) * n;
}
function _e(e) {
  return e.slice(0, -1).map((t, n) => e[n + 1] - t);
}
function je(e, t) {
  if (t > 0) {
    const n = _e(e);
    return Math.min(...n) >= t;
  }
  return !0;
}
function O(e, t) {
  return (n) => {
    if (e[0] === e[1] || t[0] === t[1]) return t[0];
    const r = (t[1] - t[0]) / (e[1] - e[0]);
    return t[0] + r * (n - e[0]);
  };
}
function Me(e) {
  return (String(e).split(".")[1] || "").length;
}
function Ne(e, t) {
  const n = Math.pow(10, t);
  return Math.round(e * n) / n;
}
var ae = J, Ie = ne, Ae = oe, Te = re;
const ce = f.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l.jsxs(
  ae,
  {
    ref: n,
    className: $(
      "relative flex w-full touch-none select-none items-center",
      e
    ),
    ...t,
    children: [
      /* @__PURE__ */ l.jsx(Ie, { className: "relative h-2 w-full grow overflow-hidden rounded-full bg-secondary", children: /* @__PURE__ */ l.jsx(Ae, { className: "absolute h-full bg-primary" }) }),
      /* @__PURE__ */ l.jsx(Te, { className: "block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" })
    ]
  }
));
ce.displayName = ae.displayName;
function Be({ config: e }) {
  const { props: t = {}, actions: n } = e, {
    min: r = 0,
    max: i = 100,
    step: c = 1,
    value: o,
    defaultValue: s = [50],
    disabled: d = !1,
    name: p,
    className: S
  } = t, a = (v) => {
    if (n != null && n.change) {
      const { type: x, event: h, command: m, payload: g } = n.change;
      x === "emit" && h ? window.dispatchEvent(new CustomEvent(h, {
        detail: { ...g, value: v, name: p }
      })) : x === "command" && m && window.dispatchEvent(new CustomEvent("command:execute", {
        detail: { command: m, payload: { ...g, value: v, name: p } }
      }));
    }
  }, u = () => {
    if (n != null && n.focus) {
      const { type: v, event: x, command: h, payload: m } = n.focus;
      v === "emit" && x ? window.dispatchEvent(new CustomEvent(x, { detail: { ...m, name: p } })) : v === "command" && h && window.dispatchEvent(new CustomEvent("command:execute", {
        detail: { command: h, payload: { ...m, name: p } }
      }));
    }
  };
  return /* @__PURE__ */ l.jsxs("div", { className: $("w-full", S), children: [
    /* @__PURE__ */ l.jsx(
      ce,
      {
        min: r,
        max: i,
        step: c,
        value: o,
        defaultValue: s,
        disabled: d,
        name: p,
        onValueChange: a,
        onFocus: u,
        "aria-valuemin": r,
        "aria-valuemax": i,
        "aria-valuenow": (o == null ? void 0 : o[0]) || s[0]
      }
    ),
    /* @__PURE__ */ l.jsxs("div", { className: "flex justify-between text-xs text-muted-foreground mt-2", children: [
      /* @__PURE__ */ l.jsx("span", { children: r }),
      /* @__PURE__ */ l.jsx("span", { children: (o == null ? void 0 : o[0]) || s[0] }),
      /* @__PURE__ */ l.jsx("span", { children: i })
    ] })
  ] });
}
export {
  Be as SliderComponent
};
