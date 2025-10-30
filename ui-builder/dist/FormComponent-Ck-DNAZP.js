import { j as Z, r as He } from "./index-DipMs7ol.js";
import P from "react";
var ye = (e) => e.type === "checkbox", ie = (e) => e instanceof Date, B = (e) => e == null;
const st = (e) => typeof e == "object";
var C = (e) => !B(e) && !Array.isArray(e) && st(e) && !ie(e), Ft = (e) => C(e) && e.target ? ye(e.target) ? e.target.checked : e.target.value : e, Vt = (e) => e.substring(0, e.search(/\.\d+(\.|$)/)) || e, xt = (e, s) => e.has(Vt(s)), At = (e) => {
  const s = e.constructor && e.constructor.prototype;
  return C(s) && s.hasOwnProperty("isPrototypeOf");
}, Ce = typeof window < "u" && typeof window.HTMLElement < "u" && typeof document < "u";
function T(e) {
  let s;
  const r = Array.isArray(e), a = typeof FileList < "u" ? e instanceof FileList : !1;
  if (e instanceof Date)
    s = new Date(e);
  else if (!(Ce && (e instanceof Blob || a)) && (r || C(e)))
    if (s = r ? [] : Object.create(Object.getPrototypeOf(e)), !r && !At(e))
      s = e;
    else
      for (const u in e)
        e.hasOwnProperty(u) && (s[u] = T(e[u]));
  else
    return e;
  return s;
}
var _e = (e) => /^\w*$/.test(e), k = (e) => e === void 0, Oe = (e) => Array.isArray(e) ? e.filter(Boolean) : [], Te = (e) => Oe(e.replace(/["|']|\]/g, "").split(/\.|\[/)), h = (e, s, r) => {
  if (!s || !C(e))
    return r;
  const a = (_e(s) ? [s] : Te(s)).reduce((u, l) => B(u) ? u : u[l], e);
  return k(a) || a === e ? k(e[s]) ? r : e[s] : a;
}, Q = (e) => typeof e == "boolean", D = (e, s, r) => {
  let a = -1;
  const u = _e(s) ? [s] : Te(s), l = u.length, f = l - 1;
  for (; ++a < l; ) {
    const y = u[a];
    let L = r;
    if (a !== f) {
      const q = e[y];
      L = C(q) || Array.isArray(q) ? q : isNaN(+u[a + 1]) ? {} : [];
    }
    if (y === "__proto__" || y === "constructor" || y === "prototype")
      return;
    e[y] = L, e = e[y];
  }
};
const $e = {
  BLUR: "blur",
  FOCUS_OUT: "focusout"
}, H = {
  onBlur: "onBlur",
  onChange: "onChange",
  onSubmit: "onSubmit",
  onTouched: "onTouched",
  all: "all"
}, G = {
  max: "max",
  min: "min",
  maxLength: "maxLength",
  minLength: "minLength",
  pattern: "pattern",
  required: "required",
  validate: "validate"
}, wt = P.createContext(null);
wt.displayName = "HookFormContext";
var Dt = (e, s, r, a = !0) => {
  const u = {
    defaultValues: s._defaultValues
  };
  for (const l in e)
    Object.defineProperty(u, l, {
      get: () => {
        const f = l;
        return s._proxyFormState[f] !== H.all && (s._proxyFormState[f] = !a || H.all), e[f];
      }
    });
  return u;
};
const Et = typeof window < "u" ? P.useLayoutEffect : P.useEffect;
var I = (e) => typeof e == "string", kt = (e, s, r, a, u) => I(e) ? (a && s.watch.add(e), h(r, e, u)) : Array.isArray(e) ? e.map((l) => (a && s.watch.add(l), h(r, l))) : (a && (s.watchAll = !0), r), ke = (e) => B(e) || !st(e);
function re(e, s, r = /* @__PURE__ */ new WeakSet()) {
  if (ke(e) || ke(s))
    return e === s;
  if (ie(e) && ie(s))
    return e.getTime() === s.getTime();
  const a = Object.keys(e), u = Object.keys(s);
  if (a.length !== u.length)
    return !1;
  if (r.has(e) || r.has(s))
    return !0;
  r.add(e), r.add(s);
  for (const l of a) {
    const f = e[l];
    if (!u.includes(l))
      return !1;
    if (l !== "ref") {
      const y = s[l];
      if (ie(f) && ie(y) || C(f) && C(y) || Array.isArray(f) && Array.isArray(y) ? !re(f, y, r) : f !== y)
        return !1;
    }
  }
  return !0;
}
var St = (e, s, r, a, u) => s ? {
  ...r[e],
  types: {
    ...r[e] && r[e].types ? r[e].types : {},
    [a]: u || !0
  }
} : {}, fe = (e) => Array.isArray(e) ? e : [e], Ke = () => {
  let e = [];
  return {
    get observers() {
      return e;
    },
    next: (u) => {
      for (const l of e)
        l.next && l.next(u);
    },
    subscribe: (u) => (e.push(u), {
      unsubscribe: () => {
        e = e.filter((l) => l !== u);
      }
    }),
    unsubscribe: () => {
      e = [];
    }
  };
};
function it(e, s) {
  const r = {};
  for (const a in e)
    if (e.hasOwnProperty(a)) {
      const u = e[a], l = s[a];
      if (u && C(u) && l) {
        const f = it(u, l);
        C(f) && (r[a] = f);
      } else e[a] && (r[a] = l);
    }
  return r;
}
var M = (e) => C(e) && !Object.keys(e).length, Le = (e) => e.type === "file", $ = (e) => typeof e == "function", be = (e) => {
  if (!Ce)
    return !1;
  const s = e ? e.ownerDocument : 0;
  return e instanceof (s && s.defaultView ? s.defaultView.HTMLElement : HTMLElement);
}, at = (e) => e.type === "select-multiple", Re = (e) => e.type === "radio", Ct = (e) => Re(e) || ye(e), Ee = (e) => be(e) && e.isConnected;
function Ot(e, s) {
  const r = s.slice(0, -1).length;
  let a = 0;
  for (; a < r; )
    e = k(e) ? a++ : e[s[a++]];
  return e;
}
function Tt(e) {
  for (const s in e)
    if (e.hasOwnProperty(s) && !k(e[s]))
      return !1;
  return !0;
}
function S(e, s) {
  const r = Array.isArray(s) ? s : _e(s) ? [s] : Te(s), a = r.length === 1 ? e : Ot(e, r), u = r.length - 1, l = r[u];
  return a && delete a[l], u !== 0 && (C(a) && M(a) || Array.isArray(a) && Tt(a)) && S(e, r.slice(0, -1)), e;
}
var Lt = (e) => {
  for (const s in e)
    if ($(e[s]))
      return !0;
  return !1;
};
function nt(e) {
  return Array.isArray(e) || C(e) && !Lt(e);
}
function Se(e, s = {}) {
  for (const r in e)
    nt(e[r]) ? (s[r] = Array.isArray(e[r]) ? [] : {}, Se(e[r], s[r])) : k(e[r]) || (s[r] = !0);
  return s;
}
function le(e, s, r) {
  r || (r = Se(s));
  for (const a in e)
    nt(e[a]) ? k(s) || ke(r[a]) ? r[a] = Se(e[a], Array.isArray(e[a]) ? [] : {}) : le(e[a], B(s) ? {} : s[a], r[a]) : r[a] = !re(e[a], s[a]);
  return r;
}
const ze = {
  value: !1,
  isValid: !1
}, Je = { value: !0, isValid: !0 };
var lt = (e) => {
  if (Array.isArray(e)) {
    if (e.length > 1) {
      const s = e.filter((r) => r && r.checked && !r.disabled).map((r) => r.value);
      return { value: s, isValid: !!s.length };
    }
    return e[0].checked && !e[0].disabled ? (
      // @ts-expect-error expected to work in the browser
      e[0].attributes && !k(e[0].attributes.value) ? k(e[0].value) || e[0].value === "" ? Je : { value: e[0].value, isValid: !0 } : Je
    ) : ze;
  }
  return ze;
}, ut = (e, { valueAsNumber: s, valueAsDate: r, setValueAs: a }) => k(e) ? e : s ? e === "" ? NaN : e && +e : r && I(e) ? new Date(e) : a ? a(e) : e;
const Ye = {
  isValid: !1,
  value: null
};
var ot = (e) => Array.isArray(e) ? e.reduce((s, r) => r && r.checked && !r.disabled ? {
  isValid: !0,
  value: r.value
} : s, Ye) : Ye;
function Qe(e) {
  const s = e.ref;
  return Le(s) ? s.files : Re(s) ? ot(e.refs).value : at(s) ? [...s.selectedOptions].map(({ value: r }) => r) : ye(s) ? lt(e.refs).value : ut(k(s.value) ? e.ref.value : s.value, e);
}
var Rt = (e, s, r, a) => {
  const u = {};
  for (const l of e) {
    const f = h(s, l);
    f && D(u, l, f._f);
  }
  return {
    criteriaMode: r,
    names: [...e],
    fields: u,
    shouldUseNativeValidation: a
  };
}, me = (e) => e instanceof RegExp, de = (e) => k(e) ? e : me(e) ? e.source : C(e) ? me(e.value) ? e.value.source : e.value : e, Xe = (e) => ({
  isOnSubmit: !e || e === H.onSubmit,
  isOnBlur: e === H.onBlur,
  isOnChange: e === H.onChange,
  isOnAll: e === H.all,
  isOnTouch: e === H.onTouched
});
const Ze = "AsyncFunction";
var Nt = (e) => !!e && !!e.validate && !!($(e.validate) && e.validate.constructor.name === Ze || C(e.validate) && Object.values(e.validate).find((s) => s.constructor.name === Ze)), pt = (e) => e.mount && (e.required || e.min || e.max || e.maxLength || e.minLength || e.pattern || e.validate), Ge = (e, s, r) => !r && (s.watchAll || s.watch.has(e) || [...s.watch].some((a) => e.startsWith(a) && /^\.\w+/.test(e.slice(a.length))));
const ce = (e, s, r, a) => {
  for (const u of r || Object.keys(e)) {
    const l = h(e, u);
    if (l) {
      const { _f: f, ...y } = l;
      if (f) {
        if (f.refs && f.refs[0] && s(f.refs[0], u) && !a)
          return !0;
        if (f.ref && s(f.ref, f.name) && !a)
          return !0;
        if (ce(y, s))
          break;
      } else if (C(y) && ce(y, s))
        break;
    }
  }
};
function et(e, s, r) {
  const a = h(e, r);
  if (a || _e(r))
    return {
      error: a,
      name: r
    };
  const u = r.split(".");
  for (; u.length; ) {
    const l = u.join("."), f = h(s, l), y = h(e, l);
    if (f && !Array.isArray(f) && r !== l)
      return { name: r };
    if (y && y.type)
      return {
        name: l,
        error: y
      };
    if (y && y.root && y.root.type)
      return {
        name: `${l}.root`,
        error: y.root
      };
    u.pop();
  }
  return {
    name: r
  };
}
var Ut = (e, s, r, a) => {
  r(e);
  const { name: u, ...l } = e;
  return M(l) || Object.keys(l).length >= Object.keys(s).length || Object.keys(l).find((f) => s[f] === (!a || H.all));
}, Mt = (e, s, r) => !e || !s || e === s || fe(e).some((a) => a && (r ? a === s : a.startsWith(s) || s.startsWith(a))), Bt = (e, s, r, a, u) => u.isOnAll ? !1 : !r && u.isOnTouch ? !(s || e) : (r ? a.isOnBlur : u.isOnBlur) ? !e : (r ? a.isOnChange : u.isOnChange) ? e : !0, Pt = (e, s) => !Oe(h(e, s)).length && S(e, s), It = (e, s, r) => {
  const a = fe(h(e, r));
  return D(a, "root", s[r]), D(e, r, a), e;
};
function tt(e, s, r = "validate") {
  if (I(e) || Array.isArray(e) && e.every(I) || Q(e) && !e)
    return {
      type: r,
      message: I(e) ? e : "",
      ref: s
    };
}
var ne = (e) => C(e) && !me(e) ? e : {
  value: e,
  message: ""
}, rt = async (e, s, r, a, u, l) => {
  const { ref: f, refs: y, required: L, maxLength: q, minLength: F, min: x, max: v, pattern: K, validate: R, name: w, valueAsNumber: p, mount: ue } = e._f, b = h(r, w);
  if (!ue || s.has(w))
    return {};
  const X = y ? y[0] : f, z = (m) => {
    u && X.reportValidity && (X.setCustomValidity(Q(m) ? "" : m || ""), X.reportValidity());
  }, O = {}, he = Re(f), ee = ye(f), Fe = he || ee, W = (p || Le(f)) && k(f.value) && k(b) || be(f) && f.value === "" || b === "" || Array.isArray(b) && !b.length, se = St.bind(null, w, a, O), J = (m, V, E, N = G.maxLength, U = G.minLength) => {
    const Y = m ? V : E;
    O[w] = {
      type: m ? N : U,
      message: Y,
      ref: f,
      ...se(m ? N : U, Y)
    };
  };
  if (l ? !Array.isArray(b) || !b.length : L && (!Fe && (W || B(b)) || Q(b) && !b || ee && !lt(y).isValid || he && !ot(y).isValid)) {
    const { value: m, message: V } = I(L) ? { value: !!L, message: L } : ne(L);
    if (m && (O[w] = {
      type: G.required,
      message: V,
      ref: X,
      ...se(G.required, V)
    }, !a))
      return z(V), O;
  }
  if (!W && (!B(x) || !B(v))) {
    let m, V;
    const E = ne(v), N = ne(x);
    if (!B(b) && !isNaN(b)) {
      const U = f.valueAsNumber || b && +b;
      B(E.value) || (m = U > E.value), B(N.value) || (V = U < N.value);
    } else {
      const U = f.valueAsDate || new Date(b), Y = (ge) => /* @__PURE__ */ new Date((/* @__PURE__ */ new Date()).toDateString() + " " + ge), oe = f.type == "time", ae = f.type == "week";
      I(E.value) && b && (m = oe ? Y(b) > Y(E.value) : ae ? b > E.value : U > new Date(E.value)), I(N.value) && b && (V = oe ? Y(b) < Y(N.value) : ae ? b < N.value : U < new Date(N.value));
    }
    if ((m || V) && (J(!!m, E.message, N.message, G.max, G.min), !a))
      return z(O[w].message), O;
  }
  if ((q || F) && !W && (I(b) || l && Array.isArray(b))) {
    const m = ne(q), V = ne(F), E = !B(m.value) && b.length > +m.value, N = !B(V.value) && b.length < +V.value;
    if ((E || N) && (J(E, m.message, V.message), !a))
      return z(O[w].message), O;
  }
  if (K && !W && I(b)) {
    const { value: m, message: V } = ne(K);
    if (me(m) && !b.match(m) && (O[w] = {
      type: G.pattern,
      message: V,
      ref: f,
      ...se(G.pattern, V)
    }, !a))
      return z(V), O;
  }
  if (R) {
    if ($(R)) {
      const m = await R(b, r), V = tt(m, X);
      if (V && (O[w] = {
        ...V,
        ...se(G.validate, V.message)
      }, !a))
        return z(V.message), O;
    } else if (C(R)) {
      let m = {};
      for (const V in R) {
        if (!M(m) && !a)
          break;
        const E = tt(await R[V](b, r), X, V);
        E && (m = {
          ...E,
          ...se(V, E.message)
        }, z(E.message), a && (O[w] = m));
      }
      if (!M(m) && (O[w] = {
        ref: X,
        ...m
      }, !a))
        return O;
    }
  }
  return z(!0), O;
};
const qt = {
  mode: H.onSubmit,
  reValidateMode: H.onChange,
  shouldFocusError: !0
};
function jt(e = {}) {
  let s = {
    ...qt,
    ...e
  }, r = {
    submitCount: 0,
    isDirty: !1,
    isReady: !1,
    isLoading: $(s.defaultValues),
    isValidating: !1,
    isSubmitted: !1,
    isSubmitting: !1,
    isSubmitSuccessful: !1,
    isValid: !1,
    touchedFields: {},
    dirtyFields: {},
    validatingFields: {},
    errors: s.errors || {},
    disabled: s.disabled || !1
  }, a = {}, u = C(s.defaultValues) || C(s.values) ? T(s.defaultValues || s.values) || {} : {}, l = s.shouldUnregister ? {} : T(u), f = {
    action: !1,
    mount: !1,
    watch: !1
  }, y = {
    mount: /* @__PURE__ */ new Set(),
    disabled: /* @__PURE__ */ new Set(),
    unMount: /* @__PURE__ */ new Set(),
    array: /* @__PURE__ */ new Set(),
    watch: /* @__PURE__ */ new Set()
  }, L, q = 0;
  const F = {
    isDirty: !1,
    dirtyFields: !1,
    validatingFields: !1,
    touchedFields: !1,
    isValidating: !1,
    isValid: !1,
    errors: !1
  };
  let x = {
    ...F
  };
  const v = {
    array: Ke(),
    state: Ke()
  }, K = s.criteriaMode === H.all, R = (t) => (i) => {
    clearTimeout(q), q = setTimeout(t, i);
  }, w = async (t) => {
    if (!s.disabled && (F.isValid || x.isValid || t)) {
      const i = s.resolver ? M((await ee()).errors) : await W(a, !0);
      i !== r.isValid && v.state.next({
        isValid: i
      });
    }
  }, p = (t, i) => {
    !s.disabled && (F.isValidating || F.validatingFields || x.isValidating || x.validatingFields) && ((t || Array.from(y.mount)).forEach((n) => {
      n && (i ? D(r.validatingFields, n, i) : S(r.validatingFields, n));
    }), v.state.next({
      validatingFields: r.validatingFields,
      isValidating: !M(r.validatingFields)
    }));
  }, ue = (t, i = [], n, c, d = !0, o = !0) => {
    if (c && n && !s.disabled) {
      if (f.action = !0, o && Array.isArray(h(a, t))) {
        const g = n(h(a, t), c.argA, c.argB);
        d && D(a, t, g);
      }
      if (o && Array.isArray(h(r.errors, t))) {
        const g = n(h(r.errors, t), c.argA, c.argB);
        d && D(r.errors, t, g), Pt(r.errors, t);
      }
      if ((F.touchedFields || x.touchedFields) && o && Array.isArray(h(r.touchedFields, t))) {
        const g = n(h(r.touchedFields, t), c.argA, c.argB);
        d && D(r.touchedFields, t, g);
      }
      (F.dirtyFields || x.dirtyFields) && (r.dirtyFields = le(u, l)), v.state.next({
        name: t,
        isDirty: J(t, i),
        dirtyFields: r.dirtyFields,
        errors: r.errors,
        isValid: r.isValid
      });
    } else
      D(l, t, i);
  }, b = (t, i) => {
    D(r.errors, t, i), v.state.next({
      errors: r.errors
    });
  }, X = (t) => {
    r.errors = t, v.state.next({
      errors: r.errors,
      isValid: !1
    });
  }, z = (t, i, n, c) => {
    const d = h(a, t);
    if (d) {
      const o = h(l, t, k(n) ? h(u, t) : n);
      k(o) || c && c.defaultChecked || i ? D(l, t, i ? o : Qe(d._f)) : E(t, o), f.mount && w();
    }
  }, O = (t, i, n, c, d) => {
    let o = !1, g = !1;
    const _ = {
      name: t
    };
    if (!s.disabled) {
      if (!n || c) {
        (F.isDirty || x.isDirty) && (g = r.isDirty, r.isDirty = _.isDirty = J(), o = g !== _.isDirty);
        const A = re(h(u, t), i);
        g = !!h(r.dirtyFields, t), A ? S(r.dirtyFields, t) : D(r.dirtyFields, t, !0), _.dirtyFields = r.dirtyFields, o = o || (F.dirtyFields || x.dirtyFields) && g !== !A;
      }
      if (n) {
        const A = h(r.touchedFields, t);
        A || (D(r.touchedFields, t, n), _.touchedFields = r.touchedFields, o = o || (F.touchedFields || x.touchedFields) && A !== n);
      }
      o && d && v.state.next(_);
    }
    return o ? _ : {};
  }, he = (t, i, n, c) => {
    const d = h(r.errors, t), o = (F.isValid || x.isValid) && Q(i) && r.isValid !== i;
    if (s.delayError && n ? (L = R(() => b(t, n)), L(s.delayError)) : (clearTimeout(q), L = null, n ? D(r.errors, t, n) : S(r.errors, t)), (n ? !re(d, n) : d) || !M(c) || o) {
      const g = {
        ...c,
        ...o && Q(i) ? { isValid: i } : {},
        errors: r.errors,
        name: t
      };
      r = {
        ...r,
        ...g
      }, v.state.next(g);
    }
  }, ee = async (t) => {
    p(t, !0);
    const i = await s.resolver(l, s.context, Rt(t || y.mount, a, s.criteriaMode, s.shouldUseNativeValidation));
    return p(t), i;
  }, Fe = async (t) => {
    const { errors: i } = await ee(t);
    if (t)
      for (const n of t) {
        const c = h(i, n);
        c ? D(r.errors, n, c) : S(r.errors, n);
      }
    else
      r.errors = i;
    return i;
  }, W = async (t, i, n = {
    valid: !0
  }) => {
    for (const c in t) {
      const d = t[c];
      if (d) {
        const { _f: o, ...g } = d;
        if (o) {
          const _ = y.array.has(o.name), A = d._f && Nt(d._f);
          A && F.validatingFields && p([o.name], !0);
          const j = await rt(d, y.disabled, l, K, s.shouldUseNativeValidation && !i, _);
          if (A && F.validatingFields && p([o.name]), j[o.name] && (n.valid = !1, i))
            break;
          !i && (h(j, o.name) ? _ ? It(r.errors, j, o.name) : D(r.errors, o.name, j[o.name]) : S(r.errors, o.name));
        }
        !M(g) && await W(g, i, n);
      }
    }
    return n.valid;
  }, se = () => {
    for (const t of y.unMount) {
      const i = h(a, t);
      i && (i._f.refs ? i._f.refs.every((n) => !Ee(n)) : !Ee(i._f.ref)) && Ve(t);
    }
    y.unMount = /* @__PURE__ */ new Set();
  }, J = (t, i) => !s.disabled && (t && i && D(l, t, i), !re(ge(), u)), m = (t, i, n) => kt(t, y, {
    ...f.mount ? l : k(i) ? u : I(t) ? { [t]: i } : i
  }, n, i), V = (t) => Oe(h(f.mount ? l : u, t, s.shouldUnregister ? h(u, t, []) : [])), E = (t, i, n = {}) => {
    const c = h(a, t);
    let d = i;
    if (c) {
      const o = c._f;
      o && (!o.disabled && D(l, t, ut(i, o)), d = be(o.ref) && B(i) ? "" : i, at(o.ref) ? [...o.ref.options].forEach((g) => g.selected = d.includes(g.value)) : o.refs ? ye(o.ref) ? o.refs.forEach((g) => {
        (!g.defaultChecked || !g.disabled) && (Array.isArray(d) ? g.checked = !!d.find((_) => _ === g.value) : g.checked = d === g.value || !!d);
      }) : o.refs.forEach((g) => g.checked = g.value === d) : Le(o.ref) ? o.ref.value = "" : (o.ref.value = d, o.ref.type || v.state.next({
        name: t,
        values: T(l)
      })));
    }
    (n.shouldDirty || n.shouldTouch) && O(t, d, n.shouldTouch, n.shouldDirty, !0), n.shouldValidate && ae(t);
  }, N = (t, i, n) => {
    for (const c in i) {
      if (!i.hasOwnProperty(c))
        return;
      const d = i[c], o = t + "." + c, g = h(a, o);
      (y.array.has(t) || C(d) || g && !g._f) && !ie(d) ? N(o, d, n) : E(o, d, n);
    }
  }, U = (t, i, n = {}) => {
    const c = h(a, t), d = y.array.has(t), o = T(i);
    D(l, t, o), d ? (v.array.next({
      name: t,
      values: T(l)
    }), (F.isDirty || F.dirtyFields || x.isDirty || x.dirtyFields) && n.shouldDirty && v.state.next({
      name: t,
      dirtyFields: le(u, l),
      isDirty: J(t, o)
    })) : c && !c._f && !B(o) ? N(t, o, n) : E(t, o, n), Ge(t, y) && v.state.next({ ...r, name: t }), v.state.next({
      name: f.mount ? t : void 0,
      values: T(l)
    });
  }, Y = async (t) => {
    f.mount = !0;
    const i = t.target;
    let n = i.name, c = !0;
    const d = h(a, n), o = (A) => {
      c = Number.isNaN(A) || ie(A) && isNaN(A.getTime()) || re(A, h(l, n, A));
    }, g = Xe(s.mode), _ = Xe(s.reValidateMode);
    if (d) {
      let A, j;
      const ve = i.type ? Qe(d._f) : Ft(t), te = t.type === $e.BLUR || t.type === $e.FOCUS_OUT, bt = !pt(d._f) && !s.resolver && !h(r.errors, n) && !d._f.deps || Bt(te, h(r.touchedFields, n), r.isSubmitted, _, g), we = Ge(n, y, te);
      D(l, n, ve), te ? (!i || !i.readOnly) && (d._f.onBlur && d._f.onBlur(t), L && L(0)) : d._f.onChange && d._f.onChange(t);
      const De = O(n, ve, te), mt = !M(De) || we;
      if (!te && v.state.next({
        name: n,
        type: t.type,
        values: T(l)
      }), bt)
        return (F.isValid || x.isValid) && (s.mode === "onBlur" ? te && w() : te || w()), mt && v.state.next({ name: n, ...we ? {} : De });
      if (!te && we && v.state.next({ ...r }), s.resolver) {
        const { errors: je } = await ee([n]);
        if (o(ve), c) {
          const _t = et(r.errors, a, n), We = et(je, a, _t.name || n);
          A = We.error, n = We.name, j = M(je);
        }
      } else
        p([n], !0), A = (await rt(d, y.disabled, l, K, s.shouldUseNativeValidation))[n], p([n]), o(ve), c && (A ? j = !1 : (F.isValid || x.isValid) && (j = await W(a, !0)));
      c && (d._f.deps && (!Array.isArray(d._f.deps) || d._f.deps.length > 0) && ae(d._f.deps), he(n, j, A, De));
    }
  }, oe = (t, i) => {
    if (h(r.errors, i) && t.focus)
      return t.focus(), 1;
  }, ae = async (t, i = {}) => {
    let n, c;
    const d = fe(t);
    if (s.resolver) {
      const o = await Fe(k(t) ? t : d);
      n = M(o), c = t ? !d.some((g) => h(o, g)) : n;
    } else t ? (c = (await Promise.all(d.map(async (o) => {
      const g = h(a, o);
      return await W(g && g._f ? { [o]: g } : g);
    }))).every(Boolean), !(!c && !r.isValid) && w()) : c = n = await W(a);
    return v.state.next({
      ...!I(t) || (F.isValid || x.isValid) && n !== r.isValid ? {} : { name: t },
      ...s.resolver || !t ? { isValid: n } : {},
      errors: r.errors
    }), i.shouldFocus && !c && ce(a, oe, t ? d : y.mount), c;
  }, ge = (t, i) => {
    let n = {
      ...f.mount ? l : u
    };
    return i && (n = it(i.dirtyFields ? r.dirtyFields : r.touchedFields, n)), k(t) ? n : I(t) ? h(n, t) : t.map((c) => h(n, c));
  }, Ne = (t, i) => ({
    invalid: !!h((i || r).errors, t),
    isDirty: !!h((i || r).dirtyFields, t),
    error: h((i || r).errors, t),
    isValidating: !!h(r.validatingFields, t),
    isTouched: !!h((i || r).touchedFields, t)
  }), dt = (t) => {
    t && fe(t).forEach((i) => S(r.errors, i)), v.state.next({
      errors: t ? r.errors : {}
    });
  }, pe = (t, i, n) => {
    const c = (h(a, t, { _f: {} })._f || {}).ref, d = h(r.errors, t) || {}, { ref: o, message: g, type: _, ...A } = d;
    D(r.errors, t, {
      ...A,
      ...i,
      ref: c
    }), v.state.next({
      name: t,
      errors: r.errors,
      isValid: !1
    }), n && n.shouldFocus && c && c.focus && c.focus();
  }, ft = (t, i) => $(t) ? v.state.subscribe({
    next: (n) => "values" in n && t(m(void 0, i), n)
  }) : m(t, i, !0), Ue = (t) => v.state.subscribe({
    next: (i) => {
      Mt(t.name, i.name, t.exact) && Ut(i, t.formState || F, vt, t.reRenderRoot) && t.callback({
        values: { ...l },
        ...r,
        ...i,
        defaultValues: u
      });
    }
  }).unsubscribe, ct = (t) => (f.mount = !0, x = {
    ...x,
    ...t.formState
  }, Ue({
    ...t,
    formState: x
  })), Ve = (t, i = {}) => {
    for (const n of t ? fe(t) : y.mount)
      y.mount.delete(n), y.array.delete(n), i.keepValue || (S(a, n), S(l, n)), !i.keepError && S(r.errors, n), !i.keepDirty && S(r.dirtyFields, n), !i.keepTouched && S(r.touchedFields, n), !i.keepIsValidating && S(r.validatingFields, n), !s.shouldUnregister && !i.keepDefaultValue && S(u, n);
    v.state.next({
      values: T(l)
    }), v.state.next({
      ...r,
      ...i.keepDirty ? { isDirty: J() } : {}
    }), !i.keepIsValid && w();
  }, Me = ({ disabled: t, name: i }) => {
    (Q(t) && f.mount || t || y.disabled.has(i)) && (t ? y.disabled.add(i) : y.disabled.delete(i));
  }, xe = (t, i = {}) => {
    let n = h(a, t);
    const c = Q(i.disabled) || Q(s.disabled);
    return D(a, t, {
      ...n || {},
      _f: {
        ...n && n._f ? n._f : { ref: { name: t } },
        name: t,
        mount: !0,
        ...i
      }
    }), y.mount.add(t), n ? Me({
      disabled: Q(i.disabled) ? i.disabled : s.disabled,
      name: t
    }) : z(t, !0, i.value), {
      ...c ? { disabled: i.disabled || s.disabled } : {},
      ...s.progressive ? {
        required: !!i.required,
        min: de(i.min),
        max: de(i.max),
        minLength: de(i.minLength),
        maxLength: de(i.maxLength),
        pattern: de(i.pattern)
      } : {},
      name: t,
      onChange: Y,
      onBlur: Y,
      ref: (d) => {
        if (d) {
          xe(t, i), n = h(a, t);
          const o = k(d.value) && d.querySelectorAll && d.querySelectorAll("input,select,textarea")[0] || d, g = Ct(o), _ = n._f.refs || [];
          if (g ? _.find((A) => A === o) : o === n._f.ref)
            return;
          D(a, t, {
            _f: {
              ...n._f,
              ...g ? {
                refs: [
                  ..._.filter(Ee),
                  o,
                  ...Array.isArray(h(u, t)) ? [{}] : []
                ],
                ref: { type: o.type, name: t }
              } : { ref: o }
            }
          }), z(t, !1, void 0, o);
        } else
          n = h(a, t, {}), n._f && (n._f.mount = !1), (s.shouldUnregister || i.shouldUnregister) && !(xt(y.array, t) && f.action) && y.unMount.add(t);
      }
    };
  }, Ae = () => s.shouldFocusError && ce(a, oe, y.mount), yt = (t) => {
    Q(t) && (v.state.next({ disabled: t }), ce(a, (i, n) => {
      const c = h(a, n);
      c && (i.disabled = c._f.disabled || t, Array.isArray(c._f.refs) && c._f.refs.forEach((d) => {
        d.disabled = c._f.disabled || t;
      }));
    }, 0, !1));
  }, Be = (t, i) => async (n) => {
    let c;
    n && (n.preventDefault && n.preventDefault(), n.persist && n.persist());
    let d = T(l);
    if (v.state.next({
      isSubmitting: !0
    }), s.resolver) {
      const { errors: o, values: g } = await ee();
      r.errors = o, d = T(g);
    } else
      await W(a);
    if (y.disabled.size)
      for (const o of y.disabled)
        S(d, o);
    if (S(r.errors, "root"), M(r.errors)) {
      v.state.next({
        errors: {}
      });
      try {
        await t(d, n);
      } catch (o) {
        c = o;
      }
    } else
      i && await i({ ...r.errors }, n), Ae(), setTimeout(Ae);
    if (v.state.next({
      isSubmitted: !0,
      isSubmitting: !1,
      isSubmitSuccessful: M(r.errors) && !c,
      submitCount: r.submitCount + 1,
      errors: r.errors
    }), c)
      throw c;
  }, ht = (t, i = {}) => {
    h(a, t) && (k(i.defaultValue) ? U(t, T(h(u, t))) : (U(t, i.defaultValue), D(u, t, T(i.defaultValue))), i.keepTouched || S(r.touchedFields, t), i.keepDirty || (S(r.dirtyFields, t), r.isDirty = i.defaultValue ? J(t, T(h(u, t))) : J()), i.keepError || (S(r.errors, t), F.isValid && w()), v.state.next({ ...r }));
  }, Pe = (t, i = {}) => {
    const n = t ? T(t) : u, c = T(n), d = M(t), o = d ? u : c;
    if (i.keepDefaultValues || (u = n), !i.keepValues) {
      if (i.keepDirtyValues) {
        const g = /* @__PURE__ */ new Set([
          ...y.mount,
          ...Object.keys(le(u, l))
        ]);
        for (const _ of Array.from(g))
          h(r.dirtyFields, _) ? D(o, _, h(l, _)) : U(_, h(o, _));
      } else {
        if (Ce && k(t))
          for (const g of y.mount) {
            const _ = h(a, g);
            if (_ && _._f) {
              const A = Array.isArray(_._f.refs) ? _._f.refs[0] : _._f.ref;
              if (be(A)) {
                const j = A.closest("form");
                if (j) {
                  j.reset();
                  break;
                }
              }
            }
          }
        if (i.keepFieldsRef)
          for (const g of y.mount)
            U(g, h(o, g));
        else
          a = {};
      }
      l = s.shouldUnregister ? i.keepDefaultValues ? T(u) : {} : T(o), v.array.next({
        values: { ...o }
      }), v.state.next({
        values: { ...o }
      });
    }
    y = {
      mount: i.keepDirtyValues ? y.mount : /* @__PURE__ */ new Set(),
      unMount: /* @__PURE__ */ new Set(),
      array: /* @__PURE__ */ new Set(),
      disabled: /* @__PURE__ */ new Set(),
      watch: /* @__PURE__ */ new Set(),
      watchAll: !1,
      focus: ""
    }, f.mount = !F.isValid || !!i.keepIsValid || !!i.keepDirtyValues, f.watch = !!s.shouldUnregister, v.state.next({
      submitCount: i.keepSubmitCount ? r.submitCount : 0,
      isDirty: d ? !1 : i.keepDirty ? r.isDirty : !!(i.keepDefaultValues && !re(t, u)),
      isSubmitted: i.keepIsSubmitted ? r.isSubmitted : !1,
      dirtyFields: d ? {} : i.keepDirtyValues ? i.keepDefaultValues && l ? le(u, l) : r.dirtyFields : i.keepDefaultValues && t ? le(u, t) : i.keepDirty ? r.dirtyFields : {},
      touchedFields: i.keepTouched ? r.touchedFields : {},
      errors: i.keepErrors ? r.errors : {},
      isSubmitSuccessful: i.keepIsSubmitSuccessful ? r.isSubmitSuccessful : !1,
      isSubmitting: !1,
      defaultValues: u
    });
  }, Ie = (t, i) => Pe($(t) ? t(l) : t, i), gt = (t, i = {}) => {
    const n = h(a, t), c = n && n._f;
    if (c) {
      const d = c.refs ? c.refs[0] : c.ref;
      d.focus && (d.focus(), i.shouldSelect && $(d.select) && d.select());
    }
  }, vt = (t) => {
    r = {
      ...r,
      ...t
    };
  }, qe = {
    control: {
      register: xe,
      unregister: Ve,
      getFieldState: Ne,
      handleSubmit: Be,
      setError: pe,
      _subscribe: Ue,
      _runSchema: ee,
      _focusError: Ae,
      _getWatch: m,
      _getDirty: J,
      _setValid: w,
      _setFieldArray: ue,
      _setDisabledField: Me,
      _setErrors: X,
      _getFieldArray: V,
      _reset: Pe,
      _resetDefaultValues: () => $(s.defaultValues) && s.defaultValues().then((t) => {
        Ie(t, s.resetOptions), v.state.next({
          isLoading: !1
        });
      }),
      _removeUnmounted: se,
      _disableForm: yt,
      _subjects: v,
      _proxyFormState: F,
      get _fields() {
        return a;
      },
      get _formValues() {
        return l;
      },
      get _state() {
        return f;
      },
      set _state(t) {
        f = t;
      },
      get _defaultValues() {
        return u;
      },
      get _names() {
        return y;
      },
      set _names(t) {
        y = t;
      },
      get _formState() {
        return r;
      },
      get _options() {
        return s;
      },
      set _options(t) {
        s = {
          ...s,
          ...t
        };
      }
    },
    subscribe: ct,
    trigger: ae,
    register: xe,
    handleSubmit: Be,
    watch: ft,
    setValue: U,
    getValues: ge,
    reset: Ie,
    resetField: ht,
    clearErrors: dt,
    unregister: Ve,
    setError: pe,
    setFocus: gt,
    getFieldState: Ne
  };
  return {
    ...qe,
    formControl: qe
  };
}
function Wt(e = {}) {
  const s = P.useRef(void 0), r = P.useRef(void 0), [a, u] = P.useState({
    isDirty: !1,
    isValidating: !1,
    isLoading: $(e.defaultValues),
    isSubmitted: !1,
    isSubmitting: !1,
    isSubmitSuccessful: !1,
    isValid: !1,
    submitCount: 0,
    dirtyFields: {},
    touchedFields: {},
    validatingFields: {},
    errors: e.errors || {},
    disabled: e.disabled || !1,
    isReady: !1,
    defaultValues: $(e.defaultValues) ? void 0 : e.defaultValues
  });
  if (!s.current)
    if (e.formControl)
      s.current = {
        ...e.formControl,
        formState: a
      }, e.defaultValues && !$(e.defaultValues) && e.formControl.reset(e.defaultValues, e.resetOptions);
    else {
      const { formControl: f, ...y } = jt(e);
      s.current = {
        ...y,
        formState: a
      };
    }
  const l = s.current.control;
  return l._options = e, Et(() => {
    const f = l._subscribe({
      formState: l._proxyFormState,
      callback: () => u({ ...l._formState }),
      reRenderRoot: !0
    });
    return u((y) => ({
      ...y,
      isReady: !0
    })), l._formState.isReady = !0, f;
  }, [l]), P.useEffect(() => l._disableForm(e.disabled), [l, e.disabled]), P.useEffect(() => {
    e.mode && (l._options.mode = e.mode), e.reValidateMode && (l._options.reValidateMode = e.reValidateMode);
  }, [l, e.mode, e.reValidateMode]), P.useEffect(() => {
    e.errors && (l._setErrors(e.errors), l._focusError());
  }, [l, e.errors]), P.useEffect(() => {
    e.shouldUnregister && l._subjects.state.next({
      values: l._getWatch()
    });
  }, [l, e.shouldUnregister]), P.useEffect(() => {
    if (l._proxyFormState.isDirty) {
      const f = l._getDirty();
      f !== a.isDirty && l._subjects.state.next({
        isDirty: f
      });
    }
  }, [l, a.isDirty]), P.useEffect(() => {
    e.values && !re(e.values, r.current) ? (l._reset(e.values, {
      keepFieldsRef: !0,
      ...l._options.resetOptions
    }), r.current = e.values, u((f) => ({ ...f }))) : l._resetDefaultValues();
  }, [l, e.values]), P.useEffect(() => {
    l._state.mount || (l._setValid(), l._state.mount = !0), l._state.watch && (l._state.watch = !1, l._subjects.state.next({ ...l._formState })), l._removeUnmounted();
  }), s.current.formState = Dt(a, l), s.current;
}
function zt({ config: e }) {
  const { props: s, actions: r } = e, {
    fields: a = [],
    submitButton: u,
    onSubmit: l,
    className: f
  } = s || {}, {
    handleSubmit: y,
    formState: { errors: L }
  } = Wt(), q = (F) => {
    if (r != null && r.submit || l) {
      const x = (r == null ? void 0 : r.submit) || l, { type: v, command: K, event: R, url: w, method: p, payload: ue } = x, b = { ...ue, ...F };
      v === "command" && K ? window.dispatchEvent(new CustomEvent("command:execute", { detail: { command: K, payload: b } })) : v === "emit" && R ? window.dispatchEvent(new CustomEvent(R, { detail: b })) : v === "http" && w && fetch(w, {
        method: p || "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(b)
      }).catch(console.error);
    }
  };
  return /* @__PURE__ */ Z.jsxs("form", { onSubmit: y(q), className: f, children: [
    /* @__PURE__ */ Z.jsx("div", { className: "space-y-4", children: a.map((F) => {
      const { name: x, label: v, field: K, validation: R, helperText: w } = F, p = L[x];
      return /* @__PURE__ */ Z.jsxs("div", { className: "space-y-2", children: [
        v && /* @__PURE__ */ Z.jsxs("label", { htmlFor: x, className: "text-sm font-medium", children: [
          v,
          (R == null ? void 0 : R.required) && /* @__PURE__ */ Z.jsx("span", { className: "text-destructive ml-1", children: "*" })
        ] }),
        /* @__PURE__ */ Z.jsx("div", { children: He(K) }),
        p && /* @__PURE__ */ Z.jsx("p", { className: "text-sm text-destructive", children: p.message }),
        w && !p && /* @__PURE__ */ Z.jsx("p", { className: "text-sm text-muted-foreground", children: w })
      ] }, x);
    }) }),
    u && /* @__PURE__ */ Z.jsx("div", { className: "mt-6", children: He(u) })
  ] });
}
export {
  zt as FormComponent
};
