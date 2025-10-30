import { j as q, c as me } from "./index-CwxzwhG1.js";
import * as t from "react";
import { useState as je } from "react";
var Re = Object.defineProperty, Te = Object.defineProperties, De = Object.getOwnPropertyDescriptors, K = Object.getOwnPropertySymbols, ve = Object.prototype.hasOwnProperty, he = Object.prototype.propertyIsEnumerable, fe = (a, l, r) => l in a ? Re(a, l, { enumerable: !0, configurable: !0, writable: !0, value: r }) : a[l] = r, Ae = (a, l) => {
  for (var r in l || (l = {})) ve.call(l, r) && fe(a, r, l[r]);
  if (K) for (var r of K(l)) he.call(l, r) && fe(a, r, l[r]);
  return a;
}, Oe = (a, l) => Te(a, De(l)), We = (a, l) => {
  var r = {};
  for (var u in a) ve.call(a, u) && l.indexOf(u) < 0 && (r[u] = a[u]);
  if (a != null && K) for (var u of K(a)) l.indexOf(u) < 0 && he.call(a, u) && (r[u] = a[u]);
  return r;
};
function Be(a) {
  let l = setTimeout(a, 0), r = setTimeout(a, 10), u = setTimeout(a, 50);
  return [l, r, u];
}
function Ie(a) {
  let l = t.useRef();
  return t.useEffect(() => {
    l.current = a;
  }), l.current;
}
var _e = 18, ge = 40, Fe = `${ge}px`, Ne = ["[data-lastpass-icon-root]", "com-1password-button", "[data-dashlanecreated]", '[style$="2147483647 !important;"]'].join(",");
function He({ containerRef: a, inputRef: l, pushPasswordManagerStrategy: r, isFocused: u }) {
  let [C, p] = t.useState(!1), [D, P] = t.useState(!1), [h, f] = t.useState(!1), y = t.useMemo(() => r === "none" ? !1 : (r === "increase-width" || r === "experimental-no-flickering") && C && D, [C, D, r]), M = t.useCallback(() => {
    let m = a.current, w = l.current;
    if (!m || !w || h || r === "none") return;
    let E = m, k = E.getBoundingClientRect().left + E.offsetWidth, _ = E.getBoundingClientRect().top + E.offsetHeight / 2, i = k - _e, H = _;
    document.querySelectorAll(Ne).length === 0 && document.elementFromPoint(i, H) === m || (p(!0), f(!0));
  }, [a, l, h, r]);
  return t.useEffect(() => {
    let m = a.current;
    if (!m || r === "none") return;
    function w() {
      let k = window.innerWidth - m.getBoundingClientRect().right;
      P(k >= ge);
    }
    w();
    let E = setInterval(w, 1e3);
    return () => {
      clearInterval(E);
    };
  }, [a, r]), t.useEffect(() => {
    let m = u || document.activeElement === l.current;
    if (r === "none" || !m) return;
    let w = setTimeout(M, 0), E = setTimeout(M, 2e3), k = setTimeout(M, 5e3), _ = setTimeout(() => {
      f(!0);
    }, 6e3);
    return () => {
      clearTimeout(w), clearTimeout(E), clearTimeout(k), clearTimeout(_);
    };
  }, [l, u, r, M]), { hasPWMBadge: C, willPushPWMBadge: y, PWM_BADGE_SPACE_WIDTH: Fe };
}
var Le = t.createContext({}), be = t.forwardRef((a, l) => {
  var r = a, { value: u, onChange: C, maxLength: p, textAlign: D = "left", pattern: P, placeholder: h, inputMode: f = "numeric", onComplete: y, pushPasswordManagerStrategy: M = "increase-width", pasteTransformer: m, containerClassName: w, noScriptCSSFallback: E = $e, render: k, children: _ } = r, i = We(r, ["value", "onChange", "maxLength", "textAlign", "pattern", "placeholder", "inputMode", "onComplete", "pushPasswordManagerStrategy", "pasteTransformer", "containerClassName", "noScriptCSSFallback", "render", "children"]), H, te, ne, re, ae;
  let [we, Ee] = t.useState(typeof i.defaultValue == "string" ? i.defaultValue : ""), s = u ?? we, A = Ie(s), L = t.useCallback((e) => {
    C == null || C(e), Ee(e);
  }, [C]), x = t.useMemo(() => P ? typeof P == "string" ? new RegExp(P) : P : null, [P]), c = t.useRef(null), Q = t.useRef(null), U = t.useRef({ value: s, onChange: L, isIOS: typeof window < "u" && ((te = (H = window == null ? void 0 : window.CSS) == null ? void 0 : H.supports) == null ? void 0 : te.call(H, "-webkit-touch-callout", "none")) }), Z = t.useRef({ prev: [(ne = c.current) == null ? void 0 : ne.selectionStart, (re = c.current) == null ? void 0 : re.selectionEnd, (ae = c.current) == null ? void 0 : ae.selectionDirection] });
  t.useImperativeHandle(l, () => c.current, []), t.useEffect(() => {
    let e = c.current, n = Q.current;
    if (!e || !n) return;
    U.current.value !== e.value && U.current.onChange(e.value), Z.current.prev = [e.selectionStart, e.selectionEnd, e.selectionDirection];
    function d() {
      if (document.activeElement !== e) {
        G(null), z(null);
        return;
      }
      let o = e.selectionStart, v = e.selectionEnd, J = e.selectionDirection, S = e.maxLength, W = e.value, j = Z.current.prev, R = -1, T = -1, B;
      if (W.length !== 0 && o !== null && v !== null) {
        let Pe = o === v, Me = o === W.length && W.length < S;
        if (Pe && !Me) {
          let I = o;
          if (I === 0) R = 0, T = 1, B = "forward";
          else if (I === S) R = I - 1, T = I, B = "backward";
          else if (S > 1 && W.length > 1) {
            let ee = 0;
            if (j[0] !== null && j[1] !== null) {
              B = I < j[1] ? "backward" : "forward";
              let ke = j[0] === j[1] && j[0] < S;
              B === "backward" && !ke && (ee = -1);
            }
            R = ee + I, T = ee + I + 1;
          }
        }
        R !== -1 && T !== -1 && R !== T && c.current.setSelectionRange(R, T, B);
      }
      let pe = R !== -1 ? R : o, de = T !== -1 ? T : v, Ce = B ?? J;
      G(pe), z(de), Z.current.prev = [pe, de, Ce];
    }
    if (document.addEventListener("selectionchange", d, { capture: !0 }), d(), document.activeElement === e && X(!0), !document.getElementById("input-otp-style")) {
      let o = document.createElement("style");
      if (o.id = "input-otp-style", document.head.appendChild(o), o.sheet) {
        let v = "background: transparent !important; color: transparent !important; border-color: transparent !important; opacity: 0 !important; box-shadow: none !important; -webkit-box-shadow: none !important; -webkit-text-fill-color: transparent !important;";
        V(o.sheet, "[data-input-otp]::selection { background: transparent !important; color: transparent !important; }"), V(o.sheet, `[data-input-otp]:autofill { ${v} }`), V(o.sheet, `[data-input-otp]:-webkit-autofill { ${v} }`), V(o.sheet, "@supports (-webkit-touch-callout: none) { [data-input-otp] { letter-spacing: -.6em !important; font-weight: 100 !important; font-stretch: ultra-condensed; font-optical-sizing: none !important; left: -1px !important; right: 1px !important; } }"), V(o.sheet, "[data-input-otp] + * { pointer-events: all !important; }");
      }
    }
    let g = () => {
      n && n.style.setProperty("--root-height", `${e.clientHeight}px`);
    };
    g();
    let b = new ResizeObserver(g);
    return b.observe(e), () => {
      document.removeEventListener("selectionchange", d, { capture: !0 }), b.disconnect();
    };
  }, []);
  let [le, oe] = t.useState(!1), [$, X] = t.useState(!1), [O, G] = t.useState(null), [F, z] = t.useState(null);
  t.useEffect(() => {
    Be(() => {
      var e, n, d, g;
      (e = c.current) == null || e.dispatchEvent(new Event("input"));
      let b = (n = c.current) == null ? void 0 : n.selectionStart, o = (d = c.current) == null ? void 0 : d.selectionEnd, v = (g = c.current) == null ? void 0 : g.selectionDirection;
      b !== null && o !== null && (G(b), z(o), Z.current.prev = [b, o, v]);
    });
  }, [s, $]), t.useEffect(() => {
    A !== void 0 && s !== A && A.length < p && s.length === p && (y == null || y(s));
  }, [p, y, A, s]);
  let N = He({ containerRef: Q, inputRef: c, pushPasswordManagerStrategy: M, isFocused: $ }), ie = t.useCallback((e) => {
    let n = e.currentTarget.value.slice(0, p);
    if (n.length > 0 && x && !x.test(n)) {
      e.preventDefault();
      return;
    }
    typeof A == "string" && n.length < A.length && document.dispatchEvent(new Event("selectionchange")), L(n);
  }, [p, L, A, x]), ue = t.useCallback(() => {
    var e;
    if (c.current) {
      let n = Math.min(c.current.value.length, p - 1), d = c.current.value.length;
      (e = c.current) == null || e.setSelectionRange(n, d), G(n), z(d);
    }
    X(!0);
  }, [p]), se = t.useCallback((e) => {
    var n, d;
    let g = c.current;
    if (!m && (!U.current.isIOS || !e.clipboardData || !g)) return;
    let b = e.clipboardData.getData("text/plain"), o = m ? m(b) : b;
    e.preventDefault();
    let v = (n = c.current) == null ? void 0 : n.selectionStart, J = (d = c.current) == null ? void 0 : d.selectionEnd, S = (v !== J ? s.slice(0, v) + o + s.slice(J) : s.slice(0, v) + o + s.slice(v)).slice(0, p);
    if (S.length > 0 && x && !x.test(S)) return;
    g.value = S, L(S);
    let W = Math.min(S.length, p - 1), j = S.length;
    g.setSelectionRange(W, j), G(W), z(j);
  }, [p, L, x, s]), Se = t.useMemo(() => ({ position: "relative", cursor: i.disabled ? "default" : "text", userSelect: "none", WebkitUserSelect: "none", pointerEvents: "none" }), [i.disabled]), ce = t.useMemo(() => ({ position: "absolute", inset: 0, width: N.willPushPWMBadge ? `calc(100% + ${N.PWM_BADGE_SPACE_WIDTH})` : "100%", clipPath: N.willPushPWMBadge ? `inset(0 ${N.PWM_BADGE_SPACE_WIDTH} 0 0)` : void 0, height: "100%", display: "flex", textAlign: D, opacity: "1", color: "transparent", pointerEvents: "all", background: "transparent", caretColor: "transparent", border: "0 solid transparent", outline: "0 solid transparent", boxShadow: "none", lineHeight: "1", letterSpacing: "-.5em", fontSize: "var(--root-height)", fontFamily: "monospace", fontVariantNumeric: "tabular-nums" }), [N.PWM_BADGE_SPACE_WIDTH, N.willPushPWMBadge, D]), ye = t.useMemo(() => t.createElement("input", Oe(Ae({ autoComplete: i.autoComplete || "one-time-code" }, i), { "data-input-otp": !0, "data-input-otp-placeholder-shown": s.length === 0 || void 0, "data-input-otp-mss": O, "data-input-otp-mse": F, inputMode: f, pattern: x == null ? void 0 : x.source, "aria-placeholder": h, style: ce, maxLength: p, value: s, ref: c, onPaste: (e) => {
    var n;
    se(e), (n = i.onPaste) == null || n.call(i, e);
  }, onChange: ie, onMouseOver: (e) => {
    var n;
    oe(!0), (n = i.onMouseOver) == null || n.call(i, e);
  }, onMouseLeave: (e) => {
    var n;
    oe(!1), (n = i.onMouseLeave) == null || n.call(i, e);
  }, onFocus: (e) => {
    var n;
    ue(), (n = i.onFocus) == null || n.call(i, e);
  }, onBlur: (e) => {
    var n;
    X(!1), (n = i.onBlur) == null || n.call(i, e);
  } })), [ie, ue, se, f, ce, p, F, O, i, x == null ? void 0 : x.source, s]), Y = t.useMemo(() => ({ slots: Array.from({ length: p }).map((e, n) => {
    var d;
    let g = $ && O !== null && F !== null && (O === F && n === O || n >= O && n < F), b = s[n] !== void 0 ? s[n] : null, o = s[0] !== void 0 ? null : (d = h == null ? void 0 : h[n]) != null ? d : null;
    return { char: b, placeholderChar: o, isActive: g, hasFakeCaret: g && b === null };
  }), isFocused: $, isHovering: !i.disabled && le }), [$, le, p, F, O, i.disabled, s]), xe = t.useMemo(() => k ? k(Y) : t.createElement(Le.Provider, { value: Y }, _), [_, Y, k]);
  return t.createElement(t.Fragment, null, E !== null && t.createElement("noscript", null, t.createElement("style", null, E)), t.createElement("div", { ref: Q, "data-input-otp-container": !0, style: Se, className: w }, xe, t.createElement("div", { style: { position: "absolute", inset: 0, pointerEvents: "none" } }, ye)));
});
be.displayName = "Input";
function V(a, l) {
  try {
    a.insertRule(l);
  } catch {
    console.error("input-otp could not insert CSS rule:", l);
  }
}
var $e = `
[data-input-otp] {
  --nojs-bg: white !important;
  --nojs-fg: black !important;

  background-color: var(--nojs-bg) !important;
  color: var(--nojs-fg) !important;
  caret-color: var(--nojs-fg) !important;
  letter-spacing: .25em !important;
  text-align: center !important;
  border: 1px solid var(--nojs-fg) !important;
  border-radius: 4px !important;
  width: 100% !important;
}
@media (prefers-color-scheme: dark) {
  [data-input-otp] {
    --nojs-bg: black !important;
    --nojs-fg: white !important;
  }
}`;
function qe({ config: a }) {
  const { props: l, actions: r } = a, {
    length: u = 6,
    className: C
  } = l || {}, [p, D] = je(""), P = (h) => {
    if (D(h), h.length === u && (r != null && r.complete)) {
      const { type: f, command: y, event: M, payload: m } = r.complete, w = { ...m, value: h };
      f === "command" && y ? window.dispatchEvent(new CustomEvent("command:execute", { detail: { command: y, payload: w } })) : f === "emit" && M && window.dispatchEvent(new CustomEvent(M, { detail: w }));
    }
  };
  return /* @__PURE__ */ q.jsx(
    be,
    {
      value: p,
      onChange: P,
      maxLength: u,
      render: ({ slots: h }) => /* @__PURE__ */ q.jsx("div", { className: me("flex gap-2", C), children: h.map((f, y) => /* @__PURE__ */ q.jsxs(
        "div",
        {
          className: me(
            "relative flex h-14 w-12 items-center justify-center border-y border-r border-input text-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md",
            f.isActive && "z-10 ring-2 ring-ring ring-offset-background",
            f.char && "bg-accent"
          ),
          children: [
            f.char,
            f.hasFakeCaret && /* @__PURE__ */ q.jsx("div", { className: "pointer-events-none absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ q.jsx("div", { className: "h-4 w-px animate-caret-blink bg-foreground duration-1000" }) })
          ]
        },
        y
      )) })
    }
  );
}
export {
  qe as InputOTPComponent
};
