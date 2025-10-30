import { j as K, r as Ee } from "./index-BnHp2Mvr.js";
import I from "react";
var ye = (e) => e.type === "checkbox", ae = (e) => e instanceof Date, M = (e) => e == null;
const st = (e) => typeof e == "object";
var C = (e) => !M(e) && !Array.isArray(e) && st(e) && !ae(e), Ft = (e) => C(e) && e.target ? ye(e.target) ? e.target.checked : e.target.value : e, Vt = (e) => e.substring(0, e.search(/\.\d+(\.|$)/)) || e, xt = (e, s) => e.has(Vt(s)), At = (e) => {
  const s = e.constructor && e.constructor.prototype;
  return C(s) && s.hasOwnProperty("isPrototypeOf");
}, Oe = typeof window < "u" && typeof window.HTMLElement < "u" && typeof document < "u";
function T(e) {
  let s;
  const r = Array.isArray(e), a = typeof FileList < "u" ? e instanceof FileList : !1;
  if (e instanceof Date)
    s = new Date(e);
  else if (!(Oe && (e instanceof Blob || a)) && (r || C(e)))
    if (s = r ? [] : Object.create(Object.getPrototypeOf(e)), !r && !At(e))
      s = e;
    else
      for (const o in e)
        e.hasOwnProperty(o) && (s[o] = T(e[o]));
  else
    return e;
  return s;
}
var _e = (e) => /^\w*$/.test(e), k = (e) => e === void 0, Te = (e) => Array.isArray(e) ? e.filter(Boolean) : [], Le = (e) => Te(e.replace(/["|']|\]/g, "").split(/\.|\[/)), h = (e, s, r) => {
  if (!s || !C(e))
    return r;
  const a = (_e(s) ? [s] : Le(s)).reduce((o, l) => M(o) ? o : o[l], e);
  return k(a) || a === e ? k(e[s]) ? r : e[s] : a;
}, Z = (e) => typeof e == "boolean", D = (e, s, r) => {
  let a = -1;
  const o = _e(s) ? [s] : Le(s), l = o.length, f = l - 1;
  for (; ++a < l; ) {
    const y = o[a];
    let L = r;
    if (a !== f) {
      const q = e[y];
      L = C(q) || Array.isArray(q) ? q : isNaN(+o[a + 1]) ? {} : [];
    }
    if (y === "__proto__" || y === "constructor" || y === "prototype")
      return;
    e[y] = L, e = e[y];
  }
};
const $e = {
  BLUR: "blur",
  FOCUS_OUT: "focusout"
}, z = {
  onBlur: "onBlur",
  onChange: "onChange",
  onSubmit: "onSubmit",
  onTouched: "onTouched",
  all: "all"
}, ee = {
  max: "max",
  min: "min",
  maxLength: "maxLength",
  minLength: "minLength",
  pattern: "pattern",
  required: "required",
  validate: "validate"
}, wt = I.createContext(null);
wt.displayName = "HookFormContext";
var Dt = (e, s, r, a = !0) => {
  const o = {
    defaultValues: s._defaultValues
  };
  for (const l in e)
    Object.defineProperty(o, l, {
      get: () => {
        const f = l;
        return s._proxyFormState[f] !== z.all && (s._proxyFormState[f] = !a || z.all), e[f];
      }
    });
  return o;
};
const Et = typeof window < "u" ? I.useLayoutEffect : I.useEffect;
var j = (e) => typeof e == "string", kt = (e, s, r, a, o) => j(e) ? (a && s.watch.add(e), h(r, e, o)) : Array.isArray(e) ? e.map((l) => (a && s.watch.add(l), h(r, l))) : (a && (s.watchAll = !0), r), Se = (e) => M(e) || !st(e);
function se(e, s, r = /* @__PURE__ */ new WeakSet()) {
  if (Se(e) || Se(s))
    return e === s;
  if (ae(e) && ae(s))
    return e.getTime() === s.getTime();
  const a = Object.keys(e), o = Object.keys(s);
  if (a.length !== o.length)
    return !1;
  if (r.has(e) || r.has(s))
    return !0;
  r.add(e), r.add(s);
  for (const l of a) {
    const f = e[l];
    if (!o.includes(l))
      return !1;
    if (l !== "ref") {
      const y = s[l];
      if (ae(f) && ae(y) || C(f) && C(y) || Array.isArray(f) && Array.isArray(y) ? !se(f, y, r) : f !== y)
        return !1;
    }
  }
  return !0;
}
var St = (e, s, r, a, o) => s ? {
  ...r[e],
  types: {
    ...r[e] && r[e].types ? r[e].types : {},
    [a]: o || !0
  }
} : {}, fe = (e) => Array.isArray(e) ? e : [e], Ke = () => {
  let e = [];
  return {
    get observers() {
      return e;
    },
    next: (o) => {
      for (const l of e)
        l.next && l.next(o);
    },
    subscribe: (o) => (e.push(o), {
      unsubscribe: () => {
        e = e.filter((l) => l !== o);
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
      const o = e[a], l = s[a];
      if (o && C(o) && l) {
        const f = it(o, l);
        C(f) && (r[a] = f);
      } else e[a] && (r[a] = l);
    }
  return r;
}
var U = (e) => C(e) && !Object.keys(e).length, pe = (e) => e.type === "file", J = (e) => typeof e == "function", me = (e) => {
  if (!Oe)
    return !1;
  const s = e ? e.ownerDocument : 0;
  return e instanceof (s && s.defaultView ? s.defaultView.HTMLElement : HTMLElement);
}, at = (e) => e.type === "select-multiple", Re = (e) => e.type === "radio", Ct = (e) => Re(e) || ye(e), ke = (e) => me(e) && e.isConnected;
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
  const r = Array.isArray(s) ? s : _e(s) ? [s] : Le(s), a = r.length === 1 ? e : Ot(e, r), o = r.length - 1, l = r[o];
  return a && delete a[l], o !== 0 && (C(a) && U(a) || Array.isArray(a) && Tt(a)) && S(e, r.slice(0, -1)), e;
}
var Lt = (e) => {
  for (const s in e)
    if (J(e[s]))
      return !0;
  return !1;
};
function nt(e) {
  return Array.isArray(e) || C(e) && !Lt(e);
}
function Ce(e, s = {}) {
  for (const r in e)
    nt(e[r]) ? (s[r] = Array.isArray(e[r]) ? [] : {}, Ce(e[r], s[r])) : k(e[r]) || (s[r] = !0);
  return s;
}
function oe(e, s, r) {
  r || (r = Ce(s));
  for (const a in e)
    nt(e[a]) ? k(s) || Se(r[a]) ? r[a] = Ce(e[a], Array.isArray(e[a]) ? [] : {}) : oe(e[a], M(s) ? {} : s[a], r[a]) : r[a] = !se(e[a], s[a]);
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
}, ot = (e, { valueAsNumber: s, valueAsDate: r, setValueAs: a }) => k(e) ? e : s ? e === "" ? NaN : e && +e : r && j(e) ? new Date(e) : a ? a(e) : e;
const Ye = {
  isValid: !1,
  value: null
};
var ut = (e) => Array.isArray(e) ? e.reduce((s, r) => r && r.checked && !r.disabled ? {
  isValid: !0,
  value: r.value
} : s, Ye) : Ye;
function Qe(e) {
  const s = e.ref;
  return pe(s) ? s.files : Re(s) ? ut(e.refs).value : at(s) ? [...s.selectedOptions].map(({ value: r }) => r) : ye(s) ? lt(e.refs).value : ot(k(s.value) ? e.ref.value : s.value, e);
}
var pt = (e, s, r, a) => {
  const o = {};
  for (const l of e) {
    const f = h(s, l);
    f && D(o, l, f._f);
  }
  return {
    criteriaMode: r,
    names: [...e],
    fields: o,
    shouldUseNativeValidation: a
  };
}, be = (e) => e instanceof RegExp, de = (e) => k(e) ? e : be(e) ? e.source : C(e) ? be(e.value) ? e.value.source : e.value : e, Xe = (e) => ({
  isOnSubmit: !e || e === z.onSubmit,
  isOnBlur: e === z.onBlur,
  isOnChange: e === z.onChange,
  isOnAll: e === z.all,
  isOnTouch: e === z.onTouched
});
const Ze = "AsyncFunction";
var Rt = (e) => !!e && !!e.validate && !!(J(e.validate) && e.validate.constructor.name === Ze || C(e.validate) && Object.values(e.validate).find((s) => s.constructor.name === Ze)), Nt = (e) => e.mount && (e.required || e.min || e.max || e.maxLength || e.minLength || e.pattern || e.validate), Ge = (e, s, r) => !r && (s.watchAll || s.watch.has(e) || [...s.watch].some((a) => e.startsWith(a) && /^\.\w+/.test(e.slice(a.length))));
const ce = (e, s, r, a) => {
  for (const o of r || Object.keys(e)) {
    const l = h(e, o);
    if (l) {
      const { _f: f, ...y } = l;
      if (f) {
        if (f.refs && f.refs[0] && s(f.refs[0], o) && !a)
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
  const o = r.split(".");
  for (; o.length; ) {
    const l = o.join("."), f = h(s, l), y = h(e, l);
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
    o.pop();
  }
  return {
    name: r
  };
}
var Ut = (e, s, r, a) => {
  r(e);
  const { name: o, ...l } = e;
  return U(l) || Object.keys(l).length >= Object.keys(s).length || Object.keys(l).find((f) => s[f] === (!a || z.all));
}, Mt = (e, s, r) => !e || !s || e === s || fe(e).some((a) => a && (r ? a === s : a.startsWith(s) || s.startsWith(a))), Bt = (e, s, r, a, o) => o.isOnAll ? !1 : !r && o.isOnTouch ? !(s || e) : (r ? a.isOnBlur : o.isOnBlur) ? !e : (r ? a.isOnChange : o.isOnChange) ? e : !0, Pt = (e, s) => !Te(h(e, s)).length && S(e, s), It = (e, s, r) => {
  const a = fe(h(e, r));
  return D(a, "root", s[r]), D(e, r, a), e;
};
function tt(e, s, r = "validate") {
  if (j(e) || Array.isArray(e) && e.every(j) || Z(e) && !e)
    return {
      type: r,
      message: j(e) ? e : "",
      ref: s
    };
}
var le = (e) => C(e) && !be(e) ? e : {
  value: e,
  message: ""
}, rt = async (e, s, r, a, o, l) => {
  const { ref: f, refs: y, required: L, maxLength: q, minLength: x, min: V, max: v, pattern: W, validate: B, name: A, valueAsNumber: R, mount: G } = e._f, m = h(r, A);
  if (!G || s.has(A))
    return {};
  const P = y ? y[0] : f, Y = (b) => {
    o && P.reportValidity && (P.setCustomValidity(Z(b) ? "" : b || ""), P.reportValidity());
  }, O = {}, he = Re(f), te = ye(f), Fe = he || te, $ = (R || pe(f)) && k(f.value) && k(m) || me(f) && f.value === "" || m === "" || Array.isArray(m) && !m.length, ie = St.bind(null, A, a, O), Q = (b, F, E, p = ee.maxLength, N = ee.minLength) => {
    const X = b ? F : E;
    O[A] = {
      type: b ? p : N,
      message: X,
      ref: f,
      ...ie(b ? p : N, X)
    };
  };
  if (l ? !Array.isArray(m) || !m.length : L && (!Fe && ($ || M(m)) || Z(m) && !m || te && !lt(y).isValid || he && !ut(y).isValid)) {
    const { value: b, message: F } = j(L) ? { value: !!L, message: L } : le(L);
    if (b && (O[A] = {
      type: ee.required,
      message: F,
      ref: P,
      ...ie(ee.required, F)
    }, !a))
      return Y(F), O;
  }
  if (!$ && (!M(V) || !M(v))) {
    let b, F;
    const E = le(v), p = le(V);
    if (!M(m) && !isNaN(m)) {
      const N = f.valueAsNumber || m && +m;
      M(E.value) || (b = N > E.value), M(p.value) || (F = N < p.value);
    } else {
      const N = f.valueAsDate || new Date(m), X = (ge) => /* @__PURE__ */ new Date((/* @__PURE__ */ new Date()).toDateString() + " " + ge), ue = f.type == "time", ne = f.type == "week";
      j(E.value) && m && (b = ue ? X(m) > X(E.value) : ne ? m > E.value : N > new Date(E.value)), j(p.value) && m && (F = ue ? X(m) < X(p.value) : ne ? m < p.value : N < new Date(p.value));
    }
    if ((b || F) && (Q(!!b, E.message, p.message, ee.max, ee.min), !a))
      return Y(O[A].message), O;
  }
  if ((q || x) && !$ && (j(m) || l && Array.isArray(m))) {
    const b = le(q), F = le(x), E = !M(b.value) && m.length > +b.value, p = !M(F.value) && m.length < +F.value;
    if ((E || p) && (Q(E, b.message, F.message), !a))
      return Y(O[A].message), O;
  }
  if (W && !$ && j(m)) {
    const { value: b, message: F } = le(W);
    if (be(b) && !m.match(b) && (O[A] = {
      type: ee.pattern,
      message: F,
      ref: f,
      ...ie(ee.pattern, F)
    }, !a))
      return Y(F), O;
  }
  if (B) {
    if (J(B)) {
      const b = await B(m, r), F = tt(b, P);
      if (F && (O[A] = {
        ...F,
        ...ie(ee.validate, F.message)
      }, !a))
        return Y(F.message), O;
    } else if (C(B)) {
      let b = {};
      for (const F in B) {
        if (!U(b) && !a)
          break;
        const E = tt(await B[F](m, r), P, F);
        E && (b = {
          ...E,
          ...ie(F, E.message)
        }, Y(E.message), a && (O[A] = b));
      }
      if (!U(b) && (O[A] = {
        ref: P,
        ...b
      }, !a))
        return O;
    }
  }
  return Y(!0), O;
};
const jt = {
  mode: z.onSubmit,
  reValidateMode: z.onChange,
  shouldFocusError: !0
};
function qt(e = {}) {
  let s = {
    ...jt,
    ...e
  }, r = {
    submitCount: 0,
    isDirty: !1,
    isReady: !1,
    isLoading: J(s.defaultValues),
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
  }, a = {}, o = C(s.defaultValues) || C(s.values) ? T(s.defaultValues || s.values) || {} : {}, l = s.shouldUnregister ? {} : T(o), f = {
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
  const x = {
    isDirty: !1,
    dirtyFields: !1,
    validatingFields: !1,
    touchedFields: !1,
    isValidating: !1,
    isValid: !1,
    errors: !1
  };
  let V = {
    ...x
  };
  const v = {
    array: Ke(),
    state: Ke()
  }, W = s.criteriaMode === z.all, B = (t) => (i) => {
    clearTimeout(q), q = setTimeout(t, i);
  }, A = async (t) => {
    if (!s.disabled && (x.isValid || V.isValid || t)) {
      const i = s.resolver ? U((await te()).errors) : await $(a, !0);
      i !== r.isValid && v.state.next({
        isValid: i
      });
    }
  }, R = (t, i) => {
    !s.disabled && (x.isValidating || x.validatingFields || V.isValidating || V.validatingFields) && ((t || Array.from(y.mount)).forEach((n) => {
      n && (i ? D(r.validatingFields, n, i) : S(r.validatingFields, n));
    }), v.state.next({
      validatingFields: r.validatingFields,
      isValidating: !U(r.validatingFields)
    }));
  }, G = (t, i = [], n, c, d = !0, u = !0) => {
    if (c && n && !s.disabled) {
      if (f.action = !0, u && Array.isArray(h(a, t))) {
        const g = n(h(a, t), c.argA, c.argB);
        d && D(a, t, g);
      }
      if (u && Array.isArray(h(r.errors, t))) {
        const g = n(h(r.errors, t), c.argA, c.argB);
        d && D(r.errors, t, g), Pt(r.errors, t);
      }
      if ((x.touchedFields || V.touchedFields) && u && Array.isArray(h(r.touchedFields, t))) {
        const g = n(h(r.touchedFields, t), c.argA, c.argB);
        d && D(r.touchedFields, t, g);
      }
      (x.dirtyFields || V.dirtyFields) && (r.dirtyFields = oe(o, l)), v.state.next({
        name: t,
        isDirty: Q(t, i),
        dirtyFields: r.dirtyFields,
        errors: r.errors,
        isValid: r.isValid
      });
    } else
      D(l, t, i);
  }, m = (t, i) => {
    D(r.errors, t, i), v.state.next({
      errors: r.errors
    });
  }, P = (t) => {
    r.errors = t, v.state.next({
      errors: r.errors,
      isValid: !1
    });
  }, Y = (t, i, n, c) => {
    const d = h(a, t);
    if (d) {
      const u = h(l, t, k(n) ? h(o, t) : n);
      k(u) || c && c.defaultChecked || i ? D(l, t, i ? u : Qe(d._f)) : E(t, u), f.mount && A();
    }
  }, O = (t, i, n, c, d) => {
    let u = !1, g = !1;
    const _ = {
      name: t
    };
    if (!s.disabled) {
      if (!n || c) {
        (x.isDirty || V.isDirty) && (g = r.isDirty, r.isDirty = _.isDirty = Q(), u = g !== _.isDirty);
        const w = se(h(o, t), i);
        g = !!h(r.dirtyFields, t), w ? S(r.dirtyFields, t) : D(r.dirtyFields, t, !0), _.dirtyFields = r.dirtyFields, u = u || (x.dirtyFields || V.dirtyFields) && g !== !w;
      }
      if (n) {
        const w = h(r.touchedFields, t);
        w || (D(r.touchedFields, t, n), _.touchedFields = r.touchedFields, u = u || (x.touchedFields || V.touchedFields) && w !== n);
      }
      u && d && v.state.next(_);
    }
    return u ? _ : {};
  }, he = (t, i, n, c) => {
    const d = h(r.errors, t), u = (x.isValid || V.isValid) && Z(i) && r.isValid !== i;
    if (s.delayError && n ? (L = B(() => m(t, n)), L(s.delayError)) : (clearTimeout(q), L = null, n ? D(r.errors, t, n) : S(r.errors, t)), (n ? !se(d, n) : d) || !U(c) || u) {
      const g = {
        ...c,
        ...u && Z(i) ? { isValid: i } : {},
        errors: r.errors,
        name: t
      };
      r = {
        ...r,
        ...g
      }, v.state.next(g);
    }
  }, te = async (t) => {
    R(t, !0);
    const i = await s.resolver(l, s.context, pt(t || y.mount, a, s.criteriaMode, s.shouldUseNativeValidation));
    return R(t), i;
  }, Fe = async (t) => {
    const { errors: i } = await te(t);
    if (t)
      for (const n of t) {
        const c = h(i, n);
        c ? D(r.errors, n, c) : S(r.errors, n);
      }
    else
      r.errors = i;
    return i;
  }, $ = async (t, i, n = {
    valid: !0
  }) => {
    for (const c in t) {
      const d = t[c];
      if (d) {
        const { _f: u, ...g } = d;
        if (u) {
          const _ = y.array.has(u.name), w = d._f && Rt(d._f);
          w && x.validatingFields && R([u.name], !0);
          const H = await rt(d, y.disabled, l, W, s.shouldUseNativeValidation && !i, _);
          if (w && x.validatingFields && R([u.name]), H[u.name] && (n.valid = !1, i))
            break;
          !i && (h(H, u.name) ? _ ? It(r.errors, H, u.name) : D(r.errors, u.name, H[u.name]) : S(r.errors, u.name));
        }
        !U(g) && await $(g, i, n);
      }
    }
    return n.valid;
  }, ie = () => {
    for (const t of y.unMount) {
      const i = h(a, t);
      i && (i._f.refs ? i._f.refs.every((n) => !ke(n)) : !ke(i._f.ref)) && Ve(t);
    }
    y.unMount = /* @__PURE__ */ new Set();
  }, Q = (t, i) => !s.disabled && (t && i && D(l, t, i), !se(ge(), o)), b = (t, i, n) => kt(t, y, {
    ...f.mount ? l : k(i) ? o : j(t) ? { [t]: i } : i
  }, n, i), F = (t) => Te(h(f.mount ? l : o, t, s.shouldUnregister ? h(o, t, []) : [])), E = (t, i, n = {}) => {
    const c = h(a, t);
    let d = i;
    if (c) {
      const u = c._f;
      u && (!u.disabled && D(l, t, ot(i, u)), d = me(u.ref) && M(i) ? "" : i, at(u.ref) ? [...u.ref.options].forEach((g) => g.selected = d.includes(g.value)) : u.refs ? ye(u.ref) ? u.refs.forEach((g) => {
        (!g.defaultChecked || !g.disabled) && (Array.isArray(d) ? g.checked = !!d.find((_) => _ === g.value) : g.checked = d === g.value || !!d);
      }) : u.refs.forEach((g) => g.checked = g.value === d) : pe(u.ref) ? u.ref.value = "" : (u.ref.value = d, u.ref.type || v.state.next({
        name: t,
        values: T(l)
      })));
    }
    (n.shouldDirty || n.shouldTouch) && O(t, d, n.shouldTouch, n.shouldDirty, !0), n.shouldValidate && ne(t);
  }, p = (t, i, n) => {
    for (const c in i) {
      if (!i.hasOwnProperty(c))
        return;
      const d = i[c], u = t + "." + c, g = h(a, u);
      (y.array.has(t) || C(d) || g && !g._f) && !ae(d) ? p(u, d, n) : E(u, d, n);
    }
  }, N = (t, i, n = {}) => {
    const c = h(a, t), d = y.array.has(t), u = T(i);
    D(l, t, u), d ? (v.array.next({
      name: t,
      values: T(l)
    }), (x.isDirty || x.dirtyFields || V.isDirty || V.dirtyFields) && n.shouldDirty && v.state.next({
      name: t,
      dirtyFields: oe(o, l),
      isDirty: Q(t, u)
    })) : c && !c._f && !M(u) ? p(t, u, n) : E(t, u, n), Ge(t, y) && v.state.next({ ...r, name: t }), v.state.next({
      name: f.mount ? t : void 0,
      values: T(l)
    });
  }, X = async (t) => {
    f.mount = !0;
    const i = t.target;
    let n = i.name, c = !0;
    const d = h(a, n), u = (w) => {
      c = Number.isNaN(w) || ae(w) && isNaN(w.getTime()) || se(w, h(l, n, w));
    }, g = Xe(s.mode), _ = Xe(s.reValidateMode);
    if (d) {
      let w, H;
      const ve = i.type ? Qe(d._f) : Ft(t), re = t.type === $e.BLUR || t.type === $e.FOCUS_OUT, mt = !Nt(d._f) && !s.resolver && !h(r.errors, n) && !d._f.deps || Bt(re, h(r.touchedFields, n), r.isSubmitted, _, g), we = Ge(n, y, re);
      D(l, n, ve), re ? (!i || !i.readOnly) && (d._f.onBlur && d._f.onBlur(t), L && L(0)) : d._f.onChange && d._f.onChange(t);
      const De = O(n, ve, re), bt = !U(De) || we;
      if (!re && v.state.next({
        name: n,
        type: t.type,
        values: T(l)
      }), mt)
        return (x.isValid || V.isValid) && (s.mode === "onBlur" ? re && A() : re || A()), bt && v.state.next({ name: n, ...we ? {} : De });
      if (!re && we && v.state.next({ ...r }), s.resolver) {
        const { errors: We } = await te([n]);
        if (u(ve), c) {
          const _t = et(r.errors, a, n), He = et(We, a, _t.name || n);
          w = He.error, n = He.name, H = U(We);
        }
      } else
        R([n], !0), w = (await rt(d, y.disabled, l, W, s.shouldUseNativeValidation))[n], R([n]), u(ve), c && (w ? H = !1 : (x.isValid || V.isValid) && (H = await $(a, !0)));
      c && (d._f.deps && (!Array.isArray(d._f.deps) || d._f.deps.length > 0) && ne(d._f.deps), he(n, H, w, De));
    }
  }, ue = (t, i) => {
    if (h(r.errors, i) && t.focus)
      return t.focus(), 1;
  }, ne = async (t, i = {}) => {
    let n, c;
    const d = fe(t);
    if (s.resolver) {
      const u = await Fe(k(t) ? t : d);
      n = U(u), c = t ? !d.some((g) => h(u, g)) : n;
    } else t ? (c = (await Promise.all(d.map(async (u) => {
      const g = h(a, u);
      return await $(g && g._f ? { [u]: g } : g);
    }))).every(Boolean), !(!c && !r.isValid) && A()) : c = n = await $(a);
    return v.state.next({
      ...!j(t) || (x.isValid || V.isValid) && n !== r.isValid ? {} : { name: t },
      ...s.resolver || !t ? { isValid: n } : {},
      errors: r.errors
    }), i.shouldFocus && !c && ce(a, ue, t ? d : y.mount), c;
  }, ge = (t, i) => {
    let n = {
      ...f.mount ? l : o
    };
    return i && (n = it(i.dirtyFields ? r.dirtyFields : r.touchedFields, n)), k(t) ? n : j(t) ? h(n, t) : t.map((c) => h(n, c));
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
  }, Ue = (t, i, n) => {
    const c = (h(a, t, { _f: {} })._f || {}).ref, d = h(r.errors, t) || {}, { ref: u, message: g, type: _, ...w } = d;
    D(r.errors, t, {
      ...w,
      ...i,
      ref: c
    }), v.state.next({
      name: t,
      errors: r.errors,
      isValid: !1
    }), n && n.shouldFocus && c && c.focus && c.focus();
  }, ft = (t, i) => J(t) ? v.state.subscribe({
    next: (n) => "values" in n && t(b(void 0, i), n)
  }) : b(t, i, !0), Me = (t) => v.state.subscribe({
    next: (i) => {
      Mt(t.name, i.name, t.exact) && Ut(i, t.formState || x, vt, t.reRenderRoot) && t.callback({
        values: { ...l },
        ...r,
        ...i,
        defaultValues: o
      });
    }
  }).unsubscribe, ct = (t) => (f.mount = !0, V = {
    ...V,
    ...t.formState
  }, Me({
    ...t,
    formState: V
  })), Ve = (t, i = {}) => {
    for (const n of t ? fe(t) : y.mount)
      y.mount.delete(n), y.array.delete(n), i.keepValue || (S(a, n), S(l, n)), !i.keepError && S(r.errors, n), !i.keepDirty && S(r.dirtyFields, n), !i.keepTouched && S(r.touchedFields, n), !i.keepIsValidating && S(r.validatingFields, n), !s.shouldUnregister && !i.keepDefaultValue && S(o, n);
    v.state.next({
      values: T(l)
    }), v.state.next({
      ...r,
      ...i.keepDirty ? { isDirty: Q() } : {}
    }), !i.keepIsValid && A();
  }, Be = ({ disabled: t, name: i }) => {
    (Z(t) && f.mount || t || y.disabled.has(i)) && (t ? y.disabled.add(i) : y.disabled.delete(i));
  }, xe = (t, i = {}) => {
    let n = h(a, t);
    const c = Z(i.disabled) || Z(s.disabled);
    return D(a, t, {
      ...n || {},
      _f: {
        ...n && n._f ? n._f : { ref: { name: t } },
        name: t,
        mount: !0,
        ...i
      }
    }), y.mount.add(t), n ? Be({
      disabled: Z(i.disabled) ? i.disabled : s.disabled,
      name: t
    }) : Y(t, !0, i.value), {
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
      onChange: X,
      onBlur: X,
      ref: (d) => {
        if (d) {
          xe(t, i), n = h(a, t);
          const u = k(d.value) && d.querySelectorAll && d.querySelectorAll("input,select,textarea")[0] || d, g = Ct(u), _ = n._f.refs || [];
          if (g ? _.find((w) => w === u) : u === n._f.ref)
            return;
          D(a, t, {
            _f: {
              ...n._f,
              ...g ? {
                refs: [
                  ..._.filter(ke),
                  u,
                  ...Array.isArray(h(o, t)) ? [{}] : []
                ],
                ref: { type: u.type, name: t }
              } : { ref: u }
            }
          }), Y(t, !1, void 0, u);
        } else
          n = h(a, t, {}), n._f && (n._f.mount = !1), (s.shouldUnregister || i.shouldUnregister) && !(xt(y.array, t) && f.action) && y.unMount.add(t);
      }
    };
  }, Ae = () => s.shouldFocusError && ce(a, ue, y.mount), yt = (t) => {
    Z(t) && (v.state.next({ disabled: t }), ce(a, (i, n) => {
      const c = h(a, n);
      c && (i.disabled = c._f.disabled || t, Array.isArray(c._f.refs) && c._f.refs.forEach((d) => {
        d.disabled = c._f.disabled || t;
      }));
    }, 0, !1));
  }, Pe = (t, i) => async (n) => {
    let c;
    n && (n.preventDefault && n.preventDefault(), n.persist && n.persist());
    let d = T(l);
    if (v.state.next({
      isSubmitting: !0
    }), s.resolver) {
      const { errors: u, values: g } = await te();
      r.errors = u, d = T(g);
    } else
      await $(a);
    if (y.disabled.size)
      for (const u of y.disabled)
        S(d, u);
    if (S(r.errors, "root"), U(r.errors)) {
      v.state.next({
        errors: {}
      });
      try {
        await t(d, n);
      } catch (u) {
        c = u;
      }
    } else
      i && await i({ ...r.errors }, n), Ae(), setTimeout(Ae);
    if (v.state.next({
      isSubmitted: !0,
      isSubmitting: !1,
      isSubmitSuccessful: U(r.errors) && !c,
      submitCount: r.submitCount + 1,
      errors: r.errors
    }), c)
      throw c;
  }, ht = (t, i = {}) => {
    h(a, t) && (k(i.defaultValue) ? N(t, T(h(o, t))) : (N(t, i.defaultValue), D(o, t, T(i.defaultValue))), i.keepTouched || S(r.touchedFields, t), i.keepDirty || (S(r.dirtyFields, t), r.isDirty = i.defaultValue ? Q(t, T(h(o, t))) : Q()), i.keepError || (S(r.errors, t), x.isValid && A()), v.state.next({ ...r }));
  }, Ie = (t, i = {}) => {
    const n = t ? T(t) : o, c = T(n), d = U(t), u = d ? o : c;
    if (i.keepDefaultValues || (o = n), !i.keepValues) {
      if (i.keepDirtyValues) {
        const g = /* @__PURE__ */ new Set([
          ...y.mount,
          ...Object.keys(oe(o, l))
        ]);
        for (const _ of Array.from(g))
          h(r.dirtyFields, _) ? D(u, _, h(l, _)) : N(_, h(u, _));
      } else {
        if (Oe && k(t))
          for (const g of y.mount) {
            const _ = h(a, g);
            if (_ && _._f) {
              const w = Array.isArray(_._f.refs) ? _._f.refs[0] : _._f.ref;
              if (me(w)) {
                const H = w.closest("form");
                if (H) {
                  H.reset();
                  break;
                }
              }
            }
          }
        if (i.keepFieldsRef)
          for (const g of y.mount)
            N(g, h(u, g));
        else
          a = {};
      }
      l = s.shouldUnregister ? i.keepDefaultValues ? T(o) : {} : T(u), v.array.next({
        values: { ...u }
      }), v.state.next({
        values: { ...u }
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
    }, f.mount = !x.isValid || !!i.keepIsValid || !!i.keepDirtyValues, f.watch = !!s.shouldUnregister, v.state.next({
      submitCount: i.keepSubmitCount ? r.submitCount : 0,
      isDirty: d ? !1 : i.keepDirty ? r.isDirty : !!(i.keepDefaultValues && !se(t, o)),
      isSubmitted: i.keepIsSubmitted ? r.isSubmitted : !1,
      dirtyFields: d ? {} : i.keepDirtyValues ? i.keepDefaultValues && l ? oe(o, l) : r.dirtyFields : i.keepDefaultValues && t ? oe(o, t) : i.keepDirty ? r.dirtyFields : {},
      touchedFields: i.keepTouched ? r.touchedFields : {},
      errors: i.keepErrors ? r.errors : {},
      isSubmitSuccessful: i.keepIsSubmitSuccessful ? r.isSubmitSuccessful : !1,
      isSubmitting: !1,
      defaultValues: o
    });
  }, je = (t, i) => Ie(J(t) ? t(l) : t, i), gt = (t, i = {}) => {
    const n = h(a, t), c = n && n._f;
    if (c) {
      const d = c.refs ? c.refs[0] : c.ref;
      d.focus && (d.focus(), i.shouldSelect && J(d.select) && d.select());
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
      handleSubmit: Pe,
      setError: Ue,
      _subscribe: Me,
      _runSchema: te,
      _focusError: Ae,
      _getWatch: b,
      _getDirty: Q,
      _setValid: A,
      _setFieldArray: G,
      _setDisabledField: Be,
      _setErrors: P,
      _getFieldArray: F,
      _reset: Ie,
      _resetDefaultValues: () => J(s.defaultValues) && s.defaultValues().then((t) => {
        je(t, s.resetOptions), v.state.next({
          isLoading: !1
        });
      }),
      _removeUnmounted: ie,
      _disableForm: yt,
      _subjects: v,
      _proxyFormState: x,
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
        return o;
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
    trigger: ne,
    register: xe,
    handleSubmit: Pe,
    watch: ft,
    setValue: N,
    getValues: ge,
    reset: je,
    resetField: ht,
    clearErrors: dt,
    unregister: Ve,
    setError: Ue,
    setFocus: gt,
    getFieldState: Ne
  };
  return {
    ...qe,
    formControl: qe
  };
}
function Wt(e = {}) {
  const s = I.useRef(void 0), r = I.useRef(void 0), [a, o] = I.useState({
    isDirty: !1,
    isValidating: !1,
    isLoading: J(e.defaultValues),
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
    defaultValues: J(e.defaultValues) ? void 0 : e.defaultValues
  });
  if (!s.current)
    if (e.formControl)
      s.current = {
        ...e.formControl,
        formState: a
      }, e.defaultValues && !J(e.defaultValues) && e.formControl.reset(e.defaultValues, e.resetOptions);
    else {
      const { formControl: f, ...y } = qt(e);
      s.current = {
        ...y,
        formState: a
      };
    }
  const l = s.current.control;
  return l._options = e, Et(() => {
    const f = l._subscribe({
      formState: l._proxyFormState,
      callback: () => o({ ...l._formState }),
      reRenderRoot: !0
    });
    return o((y) => ({
      ...y,
      isReady: !0
    })), l._formState.isReady = !0, f;
  }, [l]), I.useEffect(() => l._disableForm(e.disabled), [l, e.disabled]), I.useEffect(() => {
    e.mode && (l._options.mode = e.mode), e.reValidateMode && (l._options.reValidateMode = e.reValidateMode);
  }, [l, e.mode, e.reValidateMode]), I.useEffect(() => {
    e.errors && (l._setErrors(e.errors), l._focusError());
  }, [l, e.errors]), I.useEffect(() => {
    e.shouldUnregister && l._subjects.state.next({
      values: l._getWatch()
    });
  }, [l, e.shouldUnregister]), I.useEffect(() => {
    if (l._proxyFormState.isDirty) {
      const f = l._getDirty();
      f !== a.isDirty && l._subjects.state.next({
        isDirty: f
      });
    }
  }, [l, a.isDirty]), I.useEffect(() => {
    e.values && !se(e.values, r.current) ? (l._reset(e.values, {
      keepFieldsRef: !0,
      ...l._options.resetOptions
    }), r.current = e.values, o((f) => ({ ...f }))) : l._resetDefaultValues();
  }, [l, e.values]), I.useEffect(() => {
    l._state.mount || (l._setValid(), l._state.mount = !0), l._state.watch && (l._state.watch = !1, l._subjects.state.next({ ...l._formState })), l._removeUnmounted();
  }), s.current.formState = Dt(a, l), s.current;
}
function zt({ config: e }) {
  const { props: s, actions: r } = e, {
    fields: a = [],
    customComponents: o = [],
    submitButton: l,
    onSubmit: f,
    className: y
  } = s || {};
  console.log("FormComponent: customComponents:", o), console.log("FormComponent: customComponents.length:", o == null ? void 0 : o.length);
  const {
    handleSubmit: L,
    formState: { errors: q }
  } = Wt(), x = (V) => {
    if (r != null && r.submit || f) {
      const v = (r == null ? void 0 : r.submit) || f, { type: W, command: B, event: A, url: R, method: G, payload: m } = v, P = { ...m, ...V };
      W === "command" && B ? window.dispatchEvent(new CustomEvent("command:execute", { detail: { command: B, payload: P } })) : W === "emit" && A ? window.dispatchEvent(new CustomEvent(A, { detail: P })) : W === "http" && R && fetch(R, {
        method: G || "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(P)
      }).catch(console.error);
    }
  };
  return /* @__PURE__ */ K.jsxs("form", { onSubmit: L(x), className: y, id: e.id, children: [
    /* @__PURE__ */ K.jsxs("div", { className: "space-y-4", children: [
      a.map((V) => {
        const { name: v, label: W, field: B, validation: A, helperText: R } = V, G = q[v];
        return /* @__PURE__ */ K.jsxs("div", { className: "space-y-2", children: [
          W && /* @__PURE__ */ K.jsxs("label", { htmlFor: v, className: "text-sm font-medium", children: [
            W,
            (A == null ? void 0 : A.required) && /* @__PURE__ */ K.jsx("span", { className: "text-destructive ml-1", children: "*" })
          ] }),
          /* @__PURE__ */ K.jsx("div", { children: Ee(B) }),
          G && /* @__PURE__ */ K.jsx("p", { className: "text-sm text-destructive", children: G.message }),
          R && !G && /* @__PURE__ */ K.jsx("p", { className: "text-sm text-muted-foreground", children: R })
        ] }, v);
      }),
      o && o.length > 0 && /* @__PURE__ */ K.jsx("div", { className: "space-y-4 mt-6", children: o.map((V, v) => /* @__PURE__ */ K.jsx("div", { children: Ee(V) }, V.id || `custom-${v}`)) })
    ] }),
    l && /* @__PURE__ */ K.jsx("div", { className: "mt-6", children: Ee(l) })
  ] });
}
export {
  zt as FormComponent
};
