import { aC as $i, aD as ye, r as F, aE as ae, V as S, j as oe, c as mp } from "./badge-DBvLZUPk.js";
var No, gp;
function He() {
  if (gp) return No;
  gp = 1;
  var e = Array.isArray;
  return No = e, No;
}
var qo, bp;
function S0() {
  if (bp) return qo;
  bp = 1;
  var e = typeof $i == "object" && $i && $i.Object === Object && $i;
  return qo = e, qo;
}
var Lo, xp;
function wt() {
  if (xp) return Lo;
  xp = 1;
  var e = S0(), t = typeof self == "object" && self && self.Object === Object && self, r = e || t || Function("return this")();
  return Lo = r, Lo;
}
var Bo, wp;
function xi() {
  if (wp) return Bo;
  wp = 1;
  var e = wt(), t = e.Symbol;
  return Bo = t, Bo;
}
var Fo, Op;
function JO() {
  if (Op) return Fo;
  Op = 1;
  var e = xi(), t = Object.prototype, r = t.hasOwnProperty, n = t.toString, i = e ? e.toStringTag : void 0;
  function a(o) {
    var u = r.call(o, i), c = o[i];
    try {
      o[i] = void 0;
      var s = !0;
    } catch {
    }
    var f = n.call(o);
    return s && (u ? o[i] = c : delete o[i]), f;
  }
  return Fo = a, Fo;
}
var zo, _p;
function QO() {
  if (_p) return zo;
  _p = 1;
  var e = Object.prototype, t = e.toString;
  function r(n) {
    return t.call(n);
  }
  return zo = r, zo;
}
var Wo, Ap;
function Rt() {
  if (Ap) return Wo;
  Ap = 1;
  var e = xi(), t = JO(), r = QO(), n = "[object Null]", i = "[object Undefined]", a = e ? e.toStringTag : void 0;
  function o(u) {
    return u == null ? u === void 0 ? i : n : a && a in Object(u) ? t(u) : r(u);
  }
  return Wo = o, Wo;
}
var Uo, Sp;
function kt() {
  if (Sp) return Uo;
  Sp = 1;
  function e(t) {
    return t != null && typeof t == "object";
  }
  return Uo = e, Uo;
}
var Ko, Pp;
function pn() {
  if (Pp) return Ko;
  Pp = 1;
  var e = Rt(), t = kt(), r = "[object Symbol]";
  function n(i) {
    return typeof i == "symbol" || t(i) && e(i) == r;
  }
  return Ko = n, Ko;
}
var Ho, Ep;
function ld() {
  if (Ep) return Ho;
  Ep = 1;
  var e = He(), t = pn(), r = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, n = /^\w*$/;
  function i(a, o) {
    if (e(a))
      return !1;
    var u = typeof a;
    return u == "number" || u == "symbol" || u == "boolean" || a == null || t(a) ? !0 : n.test(a) || !r.test(a) || o != null && a in Object(o);
  }
  return Ho = i, Ho;
}
var Go, Tp;
function Gt() {
  if (Tp) return Go;
  Tp = 1;
  function e(t) {
    var r = typeof t;
    return t != null && (r == "object" || r == "function");
  }
  return Go = e, Go;
}
var Vo, jp;
function fd() {
  if (jp) return Vo;
  jp = 1;
  var e = Rt(), t = Gt(), r = "[object AsyncFunction]", n = "[object Function]", i = "[object GeneratorFunction]", a = "[object Proxy]";
  function o(u) {
    if (!t(u))
      return !1;
    var c = e(u);
    return c == n || c == i || c == r || c == a;
  }
  return Vo = o, Vo;
}
var Yo, $p;
function e_() {
  if ($p) return Yo;
  $p = 1;
  var e = wt(), t = e["__core-js_shared__"];
  return Yo = t, Yo;
}
var Xo, Cp;
function t_() {
  if (Cp) return Xo;
  Cp = 1;
  var e = e_(), t = (function() {
    var n = /[^.]+$/.exec(e && e.keys && e.keys.IE_PROTO || "");
    return n ? "Symbol(src)_1." + n : "";
  })();
  function r(n) {
    return !!t && t in n;
  }
  return Xo = r, Xo;
}
var Zo, Mp;
function P0() {
  if (Mp) return Zo;
  Mp = 1;
  var e = Function.prototype, t = e.toString;
  function r(n) {
    if (n != null) {
      try {
        return t.call(n);
      } catch {
      }
      try {
        return n + "";
      } catch {
      }
    }
    return "";
  }
  return Zo = r, Zo;
}
var Jo, Ip;
function r_() {
  if (Ip) return Jo;
  Ip = 1;
  var e = fd(), t = t_(), r = Gt(), n = P0(), i = /[\\^$.*+?()[\]{}|]/g, a = /^\[object .+?Constructor\]$/, o = Function.prototype, u = Object.prototype, c = o.toString, s = u.hasOwnProperty, f = RegExp(
    "^" + c.call(s).replace(i, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  );
  function l(d) {
    if (!r(d) || t(d))
      return !1;
    var h = e(d) ? f : a;
    return h.test(n(d));
  }
  return Jo = l, Jo;
}
var Qo, Rp;
function n_() {
  if (Rp) return Qo;
  Rp = 1;
  function e(t, r) {
    return t == null ? void 0 : t[r];
  }
  return Qo = e, Qo;
}
var eu, kp;
function xr() {
  if (kp) return eu;
  kp = 1;
  var e = r_(), t = n_();
  function r(n, i) {
    var a = t(n, i);
    return e(a) ? a : void 0;
  }
  return eu = r, eu;
}
var tu, Dp;
function Za() {
  if (Dp) return tu;
  Dp = 1;
  var e = xr(), t = e(Object, "create");
  return tu = t, tu;
}
var ru, Np;
function i_() {
  if (Np) return ru;
  Np = 1;
  var e = Za();
  function t() {
    this.__data__ = e ? e(null) : {}, this.size = 0;
  }
  return ru = t, ru;
}
var nu, qp;
function a_() {
  if (qp) return nu;
  qp = 1;
  function e(t) {
    var r = this.has(t) && delete this.__data__[t];
    return this.size -= r ? 1 : 0, r;
  }
  return nu = e, nu;
}
var iu, Lp;
function o_() {
  if (Lp) return iu;
  Lp = 1;
  var e = Za(), t = "__lodash_hash_undefined__", r = Object.prototype, n = r.hasOwnProperty;
  function i(a) {
    var o = this.__data__;
    if (e) {
      var u = o[a];
      return u === t ? void 0 : u;
    }
    return n.call(o, a) ? o[a] : void 0;
  }
  return iu = i, iu;
}
var au, Bp;
function u_() {
  if (Bp) return au;
  Bp = 1;
  var e = Za(), t = Object.prototype, r = t.hasOwnProperty;
  function n(i) {
    var a = this.__data__;
    return e ? a[i] !== void 0 : r.call(a, i);
  }
  return au = n, au;
}
var ou, Fp;
function c_() {
  if (Fp) return ou;
  Fp = 1;
  var e = Za(), t = "__lodash_hash_undefined__";
  function r(n, i) {
    var a = this.__data__;
    return this.size += this.has(n) ? 0 : 1, a[n] = e && i === void 0 ? t : i, this;
  }
  return ou = r, ou;
}
var uu, zp;
function s_() {
  if (zp) return uu;
  zp = 1;
  var e = i_(), t = a_(), r = o_(), n = u_(), i = c_();
  function a(o) {
    var u = -1, c = o == null ? 0 : o.length;
    for (this.clear(); ++u < c; ) {
      var s = o[u];
      this.set(s[0], s[1]);
    }
  }
  return a.prototype.clear = e, a.prototype.delete = t, a.prototype.get = r, a.prototype.has = n, a.prototype.set = i, uu = a, uu;
}
var cu, Wp;
function l_() {
  if (Wp) return cu;
  Wp = 1;
  function e() {
    this.__data__ = [], this.size = 0;
  }
  return cu = e, cu;
}
var su, Up;
function dd() {
  if (Up) return su;
  Up = 1;
  function e(t, r) {
    return t === r || t !== t && r !== r;
  }
  return su = e, su;
}
var lu, Kp;
function Ja() {
  if (Kp) return lu;
  Kp = 1;
  var e = dd();
  function t(r, n) {
    for (var i = r.length; i--; )
      if (e(r[i][0], n))
        return i;
    return -1;
  }
  return lu = t, lu;
}
var fu, Hp;
function f_() {
  if (Hp) return fu;
  Hp = 1;
  var e = Ja(), t = Array.prototype, r = t.splice;
  function n(i) {
    var a = this.__data__, o = e(a, i);
    if (o < 0)
      return !1;
    var u = a.length - 1;
    return o == u ? a.pop() : r.call(a, o, 1), --this.size, !0;
  }
  return fu = n, fu;
}
var du, Gp;
function d_() {
  if (Gp) return du;
  Gp = 1;
  var e = Ja();
  function t(r) {
    var n = this.__data__, i = e(n, r);
    return i < 0 ? void 0 : n[i][1];
  }
  return du = t, du;
}
var pu, Vp;
function p_() {
  if (Vp) return pu;
  Vp = 1;
  var e = Ja();
  function t(r) {
    return e(this.__data__, r) > -1;
  }
  return pu = t, pu;
}
var hu, Yp;
function h_() {
  if (Yp) return hu;
  Yp = 1;
  var e = Ja();
  function t(r, n) {
    var i = this.__data__, a = e(i, r);
    return a < 0 ? (++this.size, i.push([r, n])) : i[a][1] = n, this;
  }
  return hu = t, hu;
}
var vu, Xp;
function Qa() {
  if (Xp) return vu;
  Xp = 1;
  var e = l_(), t = f_(), r = d_(), n = p_(), i = h_();
  function a(o) {
    var u = -1, c = o == null ? 0 : o.length;
    for (this.clear(); ++u < c; ) {
      var s = o[u];
      this.set(s[0], s[1]);
    }
  }
  return a.prototype.clear = e, a.prototype.delete = t, a.prototype.get = r, a.prototype.has = n, a.prototype.set = i, vu = a, vu;
}
var yu, Zp;
function pd() {
  if (Zp) return yu;
  Zp = 1;
  var e = xr(), t = wt(), r = e(t, "Map");
  return yu = r, yu;
}
var mu, Jp;
function v_() {
  if (Jp) return mu;
  Jp = 1;
  var e = s_(), t = Qa(), r = pd();
  function n() {
    this.size = 0, this.__data__ = {
      hash: new e(),
      map: new (r || t)(),
      string: new e()
    };
  }
  return mu = n, mu;
}
var gu, Qp;
function y_() {
  if (Qp) return gu;
  Qp = 1;
  function e(t) {
    var r = typeof t;
    return r == "string" || r == "number" || r == "symbol" || r == "boolean" ? t !== "__proto__" : t === null;
  }
  return gu = e, gu;
}
var bu, eh;
function eo() {
  if (eh) return bu;
  eh = 1;
  var e = y_();
  function t(r, n) {
    var i = r.__data__;
    return e(n) ? i[typeof n == "string" ? "string" : "hash"] : i.map;
  }
  return bu = t, bu;
}
var xu, th;
function m_() {
  if (th) return xu;
  th = 1;
  var e = eo();
  function t(r) {
    var n = e(this, r).delete(r);
    return this.size -= n ? 1 : 0, n;
  }
  return xu = t, xu;
}
var wu, rh;
function g_() {
  if (rh) return wu;
  rh = 1;
  var e = eo();
  function t(r) {
    return e(this, r).get(r);
  }
  return wu = t, wu;
}
var Ou, nh;
function b_() {
  if (nh) return Ou;
  nh = 1;
  var e = eo();
  function t(r) {
    return e(this, r).has(r);
  }
  return Ou = t, Ou;
}
var _u, ih;
function x_() {
  if (ih) return _u;
  ih = 1;
  var e = eo();
  function t(r, n) {
    var i = e(this, r), a = i.size;
    return i.set(r, n), this.size += i.size == a ? 0 : 1, this;
  }
  return _u = t, _u;
}
var Au, ah;
function hd() {
  if (ah) return Au;
  ah = 1;
  var e = v_(), t = m_(), r = g_(), n = b_(), i = x_();
  function a(o) {
    var u = -1, c = o == null ? 0 : o.length;
    for (this.clear(); ++u < c; ) {
      var s = o[u];
      this.set(s[0], s[1]);
    }
  }
  return a.prototype.clear = e, a.prototype.delete = t, a.prototype.get = r, a.prototype.has = n, a.prototype.set = i, Au = a, Au;
}
var Su, oh;
function E0() {
  if (oh) return Su;
  oh = 1;
  var e = hd(), t = "Expected a function";
  function r(n, i) {
    if (typeof n != "function" || i != null && typeof i != "function")
      throw new TypeError(t);
    var a = function() {
      var o = arguments, u = i ? i.apply(this, o) : o[0], c = a.cache;
      if (c.has(u))
        return c.get(u);
      var s = n.apply(this, o);
      return a.cache = c.set(u, s) || c, s;
    };
    return a.cache = new (r.Cache || e)(), a;
  }
  return r.Cache = e, Su = r, Su;
}
var Pu, uh;
function w_() {
  if (uh) return Pu;
  uh = 1;
  var e = E0(), t = 500;
  function r(n) {
    var i = e(n, function(o) {
      return a.size === t && a.clear(), o;
    }), a = i.cache;
    return i;
  }
  return Pu = r, Pu;
}
var Eu, ch;
function O_() {
  if (ch) return Eu;
  ch = 1;
  var e = w_(), t = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, r = /\\(\\)?/g, n = e(function(i) {
    var a = [];
    return i.charCodeAt(0) === 46 && a.push(""), i.replace(t, function(o, u, c, s) {
      a.push(c ? s.replace(r, "$1") : u || o);
    }), a;
  });
  return Eu = n, Eu;
}
var Tu, sh;
function vd() {
  if (sh) return Tu;
  sh = 1;
  function e(t, r) {
    for (var n = -1, i = t == null ? 0 : t.length, a = Array(i); ++n < i; )
      a[n] = r(t[n], n, t);
    return a;
  }
  return Tu = e, Tu;
}
var ju, lh;
function __() {
  if (lh) return ju;
  lh = 1;
  var e = xi(), t = vd(), r = He(), n = pn(), i = e ? e.prototype : void 0, a = i ? i.toString : void 0;
  function o(u) {
    if (typeof u == "string")
      return u;
    if (r(u))
      return t(u, o) + "";
    if (n(u))
      return a ? a.call(u) : "";
    var c = u + "";
    return c == "0" && 1 / u == -1 / 0 ? "-0" : c;
  }
  return ju = o, ju;
}
var $u, fh;
function T0() {
  if (fh) return $u;
  fh = 1;
  var e = __();
  function t(r) {
    return r == null ? "" : e(r);
  }
  return $u = t, $u;
}
var Cu, dh;
function j0() {
  if (dh) return Cu;
  dh = 1;
  var e = He(), t = ld(), r = O_(), n = T0();
  function i(a, o) {
    return e(a) ? a : t(a, o) ? [a] : r(n(a));
  }
  return Cu = i, Cu;
}
var Mu, ph;
function to() {
  if (ph) return Mu;
  ph = 1;
  var e = pn();
  function t(r) {
    if (typeof r == "string" || e(r))
      return r;
    var n = r + "";
    return n == "0" && 1 / r == -1 / 0 ? "-0" : n;
  }
  return Mu = t, Mu;
}
var Iu, hh;
function yd() {
  if (hh) return Iu;
  hh = 1;
  var e = j0(), t = to();
  function r(n, i) {
    i = e(i, n);
    for (var a = 0, o = i.length; n != null && a < o; )
      n = n[t(i[a++])];
    return a && a == o ? n : void 0;
  }
  return Iu = r, Iu;
}
var Ru, vh;
function $0() {
  if (vh) return Ru;
  vh = 1;
  var e = yd();
  function t(r, n, i) {
    var a = r == null ? void 0 : e(r, n);
    return a === void 0 ? i : a;
  }
  return Ru = t, Ru;
}
var A_ = $0();
const Je = /* @__PURE__ */ ye(A_);
var ku, yh;
function S_() {
  if (yh) return ku;
  yh = 1;
  function e(t) {
    return t == null;
  }
  return ku = e, ku;
}
var P_ = S_();
const ie = /* @__PURE__ */ ye(P_);
var Du, mh;
function E_() {
  if (mh) return Du;
  mh = 1;
  var e = Rt(), t = He(), r = kt(), n = "[object String]";
  function i(a) {
    return typeof a == "string" || !t(a) && r(a) && e(a) == n;
  }
  return Du = i, Du;
}
var T_ = E_();
const hr = /* @__PURE__ */ ye(T_);
var j_ = fd();
const te = /* @__PURE__ */ ye(j_);
var $_ = Gt();
const hn = /* @__PURE__ */ ye($_);
var Ci = { exports: {} }, le = {};
/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var gh;
function C_() {
  if (gh) return le;
  gh = 1;
  var e = Symbol.for("react.element"), t = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), n = Symbol.for("react.strict_mode"), i = Symbol.for("react.profiler"), a = Symbol.for("react.provider"), o = Symbol.for("react.context"), u = Symbol.for("react.server_context"), c = Symbol.for("react.forward_ref"), s = Symbol.for("react.suspense"), f = Symbol.for("react.suspense_list"), l = Symbol.for("react.memo"), d = Symbol.for("react.lazy"), h = Symbol.for("react.offscreen"), m;
  m = Symbol.for("react.module.reference");
  function v(p) {
    if (typeof p == "object" && p !== null) {
      var g = p.$$typeof;
      switch (g) {
        case e:
          switch (p = p.type, p) {
            case r:
            case i:
            case n:
            case s:
            case f:
              return p;
            default:
              switch (p = p && p.$$typeof, p) {
                case u:
                case o:
                case c:
                case d:
                case l:
                case a:
                  return p;
                default:
                  return g;
              }
          }
        case t:
          return g;
      }
    }
  }
  return le.ContextConsumer = o, le.ContextProvider = a, le.Element = e, le.ForwardRef = c, le.Fragment = r, le.Lazy = d, le.Memo = l, le.Portal = t, le.Profiler = i, le.StrictMode = n, le.Suspense = s, le.SuspenseList = f, le.isAsyncMode = function() {
    return !1;
  }, le.isConcurrentMode = function() {
    return !1;
  }, le.isContextConsumer = function(p) {
    return v(p) === o;
  }, le.isContextProvider = function(p) {
    return v(p) === a;
  }, le.isElement = function(p) {
    return typeof p == "object" && p !== null && p.$$typeof === e;
  }, le.isForwardRef = function(p) {
    return v(p) === c;
  }, le.isFragment = function(p) {
    return v(p) === r;
  }, le.isLazy = function(p) {
    return v(p) === d;
  }, le.isMemo = function(p) {
    return v(p) === l;
  }, le.isPortal = function(p) {
    return v(p) === t;
  }, le.isProfiler = function(p) {
    return v(p) === i;
  }, le.isStrictMode = function(p) {
    return v(p) === n;
  }, le.isSuspense = function(p) {
    return v(p) === s;
  }, le.isSuspenseList = function(p) {
    return v(p) === f;
  }, le.isValidElementType = function(p) {
    return typeof p == "string" || typeof p == "function" || p === r || p === i || p === n || p === s || p === f || p === h || typeof p == "object" && p !== null && (p.$$typeof === d || p.$$typeof === l || p.$$typeof === a || p.$$typeof === o || p.$$typeof === c || p.$$typeof === m || p.getModuleId !== void 0);
  }, le.typeOf = v, le;
}
var fe = {};
/**
 * @license React
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var bh;
function M_() {
  return bh || (bh = 1, process.env.NODE_ENV !== "production" && (function() {
    var e = Symbol.for("react.element"), t = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), n = Symbol.for("react.strict_mode"), i = Symbol.for("react.profiler"), a = Symbol.for("react.provider"), o = Symbol.for("react.context"), u = Symbol.for("react.server_context"), c = Symbol.for("react.forward_ref"), s = Symbol.for("react.suspense"), f = Symbol.for("react.suspense_list"), l = Symbol.for("react.memo"), d = Symbol.for("react.lazy"), h = Symbol.for("react.offscreen"), m = !1, v = !1, p = !1, g = !1, x = !1, w;
    w = Symbol.for("react.module.reference");
    function O(U) {
      return !!(typeof U == "string" || typeof U == "function" || U === r || U === i || x || U === n || U === s || U === f || g || U === h || m || v || p || typeof U == "object" && U !== null && (U.$$typeof === d || U.$$typeof === l || U.$$typeof === a || U.$$typeof === o || U.$$typeof === c || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      U.$$typeof === w || U.getModuleId !== void 0));
    }
    function y(U) {
      if (typeof U == "object" && U !== null) {
        var ge = U.$$typeof;
        switch (ge) {
          case e:
            var _e = U.type;
            switch (_e) {
              case r:
              case i:
              case n:
              case s:
              case f:
                return _e;
              default:
                var Ne = _e && _e.$$typeof;
                switch (Ne) {
                  case u:
                  case o:
                  case c:
                  case d:
                  case l:
                  case a:
                    return Ne;
                  default:
                    return ge;
                }
            }
          case t:
            return ge;
        }
      }
    }
    var b = o, _ = a, A = e, E = c, C = r, P = d, T = l, $ = t, R = i, I = n, k = s, q = f, W = !1, K = !1;
    function M(U) {
      return W || (W = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function N(U) {
      return K || (K = !0, console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function L(U) {
      return y(U) === o;
    }
    function H(U) {
      return y(U) === a;
    }
    function V(U) {
      return typeof U == "object" && U !== null && U.$$typeof === e;
    }
    function J(U) {
      return y(U) === c;
    }
    function Q(U) {
      return y(U) === r;
    }
    function ne(U) {
      return y(U) === d;
    }
    function re(U) {
      return y(U) === l;
    }
    function B(U) {
      return y(U) === t;
    }
    function G(U) {
      return y(U) === i;
    }
    function Z(U) {
      return y(U) === n;
    }
    function j(U) {
      return y(U) === s;
    }
    function ce(U) {
      return y(U) === f;
    }
    fe.ContextConsumer = b, fe.ContextProvider = _, fe.Element = A, fe.ForwardRef = E, fe.Fragment = C, fe.Lazy = P, fe.Memo = T, fe.Portal = $, fe.Profiler = R, fe.StrictMode = I, fe.Suspense = k, fe.SuspenseList = q, fe.isAsyncMode = M, fe.isConcurrentMode = N, fe.isContextConsumer = L, fe.isContextProvider = H, fe.isElement = V, fe.isForwardRef = J, fe.isFragment = Q, fe.isLazy = ne, fe.isMemo = re, fe.isPortal = B, fe.isProfiler = G, fe.isStrictMode = Z, fe.isSuspense = j, fe.isSuspenseList = ce, fe.isValidElementType = O, fe.typeOf = y;
  })()), fe;
}
var xh;
function I_() {
  return xh || (xh = 1, process.env.NODE_ENV === "production" ? Ci.exports = C_() : Ci.exports = M_()), Ci.exports;
}
var R_ = I_(), Nu, wh;
function C0() {
  if (wh) return Nu;
  wh = 1;
  var e = Rt(), t = kt(), r = "[object Number]";
  function n(i) {
    return typeof i == "number" || t(i) && e(i) == r;
  }
  return Nu = n, Nu;
}
var qu, Oh;
function k_() {
  if (Oh) return qu;
  Oh = 1;
  var e = C0();
  function t(r) {
    return e(r) && r != +r;
  }
  return qu = t, qu;
}
var D_ = k_();
const vn = /* @__PURE__ */ ye(D_);
var N_ = C0();
const q_ = /* @__PURE__ */ ye(N_);
var Fe = function(t) {
  return t === 0 ? 0 : t > 0 ? 1 : -1;
}, or = function(t) {
  return hr(t) && t.indexOf("%") === t.length - 1;
}, z = function(t) {
  return q_(t) && !vn(t);
}, L_ = function(t) {
  return ie(t);
}, Me = function(t) {
  return z(t) || hr(t);
}, B_ = 0, wr = function(t) {
  var r = ++B_;
  return "".concat(t || "").concat(r);
}, ze = function(t, r) {
  var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0, i = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1;
  if (!z(t) && !hr(t))
    return n;
  var a;
  if (or(t)) {
    var o = t.indexOf("%");
    a = r * parseFloat(t.slice(0, o)) / 100;
  } else
    a = +t;
  return vn(a) && (a = n), i && a > r && (a = r), a;
}, Ft = function(t) {
  if (!t)
    return null;
  var r = Object.keys(t);
  return r && r.length ? t[r[0]] : null;
}, F_ = function(t) {
  if (!Array.isArray(t))
    return !1;
  for (var r = t.length, n = {}, i = 0; i < r; i++)
    if (!n[t[i]])
      n[t[i]] = !0;
    else
      return !0;
  return !1;
}, Ce = function(t, r) {
  return z(t) && z(r) ? function(n) {
    return t + n * (r - t);
  } : function() {
    return r;
  };
};
function Xi(e, t, r) {
  return !e || !e.length ? null : e.find(function(n) {
    return n && (typeof t == "function" ? t(n) : Je(n, t)) === r;
  });
}
var z_ = function(t, r) {
  return z(t) && z(r) ? t - r : hr(t) && hr(r) ? t.localeCompare(r) : t instanceof Date && r instanceof Date ? t.getTime() - r.getTime() : String(t).localeCompare(String(r));
};
function Dr(e, t) {
  for (var r in e)
    if ({}.hasOwnProperty.call(e, r) && (!{}.hasOwnProperty.call(t, r) || e[r] !== t[r]))
      return !1;
  for (var n in t)
    if ({}.hasOwnProperty.call(t, n) && !{}.hasOwnProperty.call(e, n))
      return !1;
  return !0;
}
function Fl(e) {
  "@babel/helpers - typeof";
  return Fl = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Fl(e);
}
var W_ = ["viewBox", "children"], U_ = [
  "aria-activedescendant",
  "aria-atomic",
  "aria-autocomplete",
  "aria-busy",
  "aria-checked",
  "aria-colcount",
  "aria-colindex",
  "aria-colspan",
  "aria-controls",
  "aria-current",
  "aria-describedby",
  "aria-details",
  "aria-disabled",
  "aria-errormessage",
  "aria-expanded",
  "aria-flowto",
  "aria-haspopup",
  "aria-hidden",
  "aria-invalid",
  "aria-keyshortcuts",
  "aria-label",
  "aria-labelledby",
  "aria-level",
  "aria-live",
  "aria-modal",
  "aria-multiline",
  "aria-multiselectable",
  "aria-orientation",
  "aria-owns",
  "aria-placeholder",
  "aria-posinset",
  "aria-pressed",
  "aria-readonly",
  "aria-relevant",
  "aria-required",
  "aria-roledescription",
  "aria-rowcount",
  "aria-rowindex",
  "aria-rowspan",
  "aria-selected",
  "aria-setsize",
  "aria-sort",
  "aria-valuemax",
  "aria-valuemin",
  "aria-valuenow",
  "aria-valuetext",
  "className",
  "color",
  "height",
  "id",
  "lang",
  "max",
  "media",
  "method",
  "min",
  "name",
  "style",
  /*
   * removed 'type' SVGElementPropKey because we do not currently use any SVG elements
   * that can use it and it conflicts with the recharts prop 'type'
   * https://github.com/recharts/recharts/pull/3327
   * https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/type
   */
  // 'type',
  "target",
  "width",
  "role",
  "tabIndex",
  "accentHeight",
  "accumulate",
  "additive",
  "alignmentBaseline",
  "allowReorder",
  "alphabetic",
  "amplitude",
  "arabicForm",
  "ascent",
  "attributeName",
  "attributeType",
  "autoReverse",
  "azimuth",
  "baseFrequency",
  "baselineShift",
  "baseProfile",
  "bbox",
  "begin",
  "bias",
  "by",
  "calcMode",
  "capHeight",
  "clip",
  "clipPath",
  "clipPathUnits",
  "clipRule",
  "colorInterpolation",
  "colorInterpolationFilters",
  "colorProfile",
  "colorRendering",
  "contentScriptType",
  "contentStyleType",
  "cursor",
  "cx",
  "cy",
  "d",
  "decelerate",
  "descent",
  "diffuseConstant",
  "direction",
  "display",
  "divisor",
  "dominantBaseline",
  "dur",
  "dx",
  "dy",
  "edgeMode",
  "elevation",
  "enableBackground",
  "end",
  "exponent",
  "externalResourcesRequired",
  "fill",
  "fillOpacity",
  "fillRule",
  "filter",
  "filterRes",
  "filterUnits",
  "floodColor",
  "floodOpacity",
  "focusable",
  "fontFamily",
  "fontSize",
  "fontSizeAdjust",
  "fontStretch",
  "fontStyle",
  "fontVariant",
  "fontWeight",
  "format",
  "from",
  "fx",
  "fy",
  "g1",
  "g2",
  "glyphName",
  "glyphOrientationHorizontal",
  "glyphOrientationVertical",
  "glyphRef",
  "gradientTransform",
  "gradientUnits",
  "hanging",
  "horizAdvX",
  "horizOriginX",
  "href",
  "ideographic",
  "imageRendering",
  "in2",
  "in",
  "intercept",
  "k1",
  "k2",
  "k3",
  "k4",
  "k",
  "kernelMatrix",
  "kernelUnitLength",
  "kerning",
  "keyPoints",
  "keySplines",
  "keyTimes",
  "lengthAdjust",
  "letterSpacing",
  "lightingColor",
  "limitingConeAngle",
  "local",
  "markerEnd",
  "markerHeight",
  "markerMid",
  "markerStart",
  "markerUnits",
  "markerWidth",
  "mask",
  "maskContentUnits",
  "maskUnits",
  "mathematical",
  "mode",
  "numOctaves",
  "offset",
  "opacity",
  "operator",
  "order",
  "orient",
  "orientation",
  "origin",
  "overflow",
  "overlinePosition",
  "overlineThickness",
  "paintOrder",
  "panose1",
  "pathLength",
  "patternContentUnits",
  "patternTransform",
  "patternUnits",
  "pointerEvents",
  "pointsAtX",
  "pointsAtY",
  "pointsAtZ",
  "preserveAlpha",
  "preserveAspectRatio",
  "primitiveUnits",
  "r",
  "radius",
  "refX",
  "refY",
  "renderingIntent",
  "repeatCount",
  "repeatDur",
  "requiredExtensions",
  "requiredFeatures",
  "restart",
  "result",
  "rotate",
  "rx",
  "ry",
  "seed",
  "shapeRendering",
  "slope",
  "spacing",
  "specularConstant",
  "specularExponent",
  "speed",
  "spreadMethod",
  "startOffset",
  "stdDeviation",
  "stemh",
  "stemv",
  "stitchTiles",
  "stopColor",
  "stopOpacity",
  "strikethroughPosition",
  "strikethroughThickness",
  "string",
  "stroke",
  "strokeDasharray",
  "strokeDashoffset",
  "strokeLinecap",
  "strokeLinejoin",
  "strokeMiterlimit",
  "strokeOpacity",
  "strokeWidth",
  "surfaceScale",
  "systemLanguage",
  "tableValues",
  "targetX",
  "targetY",
  "textAnchor",
  "textDecoration",
  "textLength",
  "textRendering",
  "to",
  "transform",
  "u1",
  "u2",
  "underlinePosition",
  "underlineThickness",
  "unicode",
  "unicodeBidi",
  "unicodeRange",
  "unitsPerEm",
  "vAlphabetic",
  "values",
  "vectorEffect",
  "version",
  "vertAdvY",
  "vertOriginX",
  "vertOriginY",
  "vHanging",
  "vIdeographic",
  "viewTarget",
  "visibility",
  "vMathematical",
  "widths",
  "wordSpacing",
  "writingMode",
  "x1",
  "x2",
  "x",
  "xChannelSelector",
  "xHeight",
  "xlinkActuate",
  "xlinkArcrole",
  "xlinkHref",
  "xlinkRole",
  "xlinkShow",
  "xlinkTitle",
  "xlinkType",
  "xmlBase",
  "xmlLang",
  "xmlns",
  "xmlnsXlink",
  "xmlSpace",
  "y1",
  "y2",
  "y",
  "yChannelSelector",
  "z",
  "zoomAndPan",
  "ref",
  "key",
  "angle"
], _h = ["points", "pathLength"], Lu = {
  svg: W_,
  polygon: _h,
  polyline: _h
}, md = ["dangerouslySetInnerHTML", "onCopy", "onCopyCapture", "onCut", "onCutCapture", "onPaste", "onPasteCapture", "onCompositionEnd", "onCompositionEndCapture", "onCompositionStart", "onCompositionStartCapture", "onCompositionUpdate", "onCompositionUpdateCapture", "onFocus", "onFocusCapture", "onBlur", "onBlurCapture", "onChange", "onChangeCapture", "onBeforeInput", "onBeforeInputCapture", "onInput", "onInputCapture", "onReset", "onResetCapture", "onSubmit", "onSubmitCapture", "onInvalid", "onInvalidCapture", "onLoad", "onLoadCapture", "onError", "onErrorCapture", "onKeyDown", "onKeyDownCapture", "onKeyPress", "onKeyPressCapture", "onKeyUp", "onKeyUpCapture", "onAbort", "onAbortCapture", "onCanPlay", "onCanPlayCapture", "onCanPlayThrough", "onCanPlayThroughCapture", "onDurationChange", "onDurationChangeCapture", "onEmptied", "onEmptiedCapture", "onEncrypted", "onEncryptedCapture", "onEnded", "onEndedCapture", "onLoadedData", "onLoadedDataCapture", "onLoadedMetadata", "onLoadedMetadataCapture", "onLoadStart", "onLoadStartCapture", "onPause", "onPauseCapture", "onPlay", "onPlayCapture", "onPlaying", "onPlayingCapture", "onProgress", "onProgressCapture", "onRateChange", "onRateChangeCapture", "onSeeked", "onSeekedCapture", "onSeeking", "onSeekingCapture", "onStalled", "onStalledCapture", "onSuspend", "onSuspendCapture", "onTimeUpdate", "onTimeUpdateCapture", "onVolumeChange", "onVolumeChangeCapture", "onWaiting", "onWaitingCapture", "onAuxClick", "onAuxClickCapture", "onClick", "onClickCapture", "onContextMenu", "onContextMenuCapture", "onDoubleClick", "onDoubleClickCapture", "onDrag", "onDragCapture", "onDragEnd", "onDragEndCapture", "onDragEnter", "onDragEnterCapture", "onDragExit", "onDragExitCapture", "onDragLeave", "onDragLeaveCapture", "onDragOver", "onDragOverCapture", "onDragStart", "onDragStartCapture", "onDrop", "onDropCapture", "onMouseDown", "onMouseDownCapture", "onMouseEnter", "onMouseLeave", "onMouseMove", "onMouseMoveCapture", "onMouseOut", "onMouseOutCapture", "onMouseOver", "onMouseOverCapture", "onMouseUp", "onMouseUpCapture", "onSelect", "onSelectCapture", "onTouchCancel", "onTouchCancelCapture", "onTouchEnd", "onTouchEndCapture", "onTouchMove", "onTouchMoveCapture", "onTouchStart", "onTouchStartCapture", "onPointerDown", "onPointerDownCapture", "onPointerMove", "onPointerMoveCapture", "onPointerUp", "onPointerUpCapture", "onPointerCancel", "onPointerCancelCapture", "onPointerEnter", "onPointerEnterCapture", "onPointerLeave", "onPointerLeaveCapture", "onPointerOver", "onPointerOverCapture", "onPointerOut", "onPointerOutCapture", "onGotPointerCapture", "onGotPointerCaptureCapture", "onLostPointerCapture", "onLostPointerCaptureCapture", "onScroll", "onScrollCapture", "onWheel", "onWheelCapture", "onAnimationStart", "onAnimationStartCapture", "onAnimationEnd", "onAnimationEndCapture", "onAnimationIteration", "onAnimationIterationCapture", "onTransitionEnd", "onTransitionEndCapture"], Zi = function(t, r) {
  if (!t || typeof t == "function" || typeof t == "boolean")
    return null;
  var n = t;
  if (/* @__PURE__ */ F.isValidElement(t) && (n = t.props), !hn(n))
    return null;
  var i = {};
  return Object.keys(n).forEach(function(a) {
    md.includes(a) && (i[a] = r || function(o) {
      return n[a](n, o);
    });
  }), i;
}, K_ = function(t, r, n) {
  return function(i) {
    return t(r, n, i), null;
  };
}, vr = function(t, r, n) {
  if (!hn(t) || Fl(t) !== "object")
    return null;
  var i = null;
  return Object.keys(t).forEach(function(a) {
    var o = t[a];
    md.includes(a) && typeof o == "function" && (i || (i = {}), i[a] = K_(o, r, n));
  }), i;
}, H_ = ["children"], G_ = ["children"];
function Ah(e, t) {
  if (e == null) return {};
  var r = V_(e, t), n, i;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (i = 0; i < a.length; i++)
      n = a[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function V_(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
function zl(e) {
  "@babel/helpers - typeof";
  return zl = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, zl(e);
}
var Sh = {
  click: "onClick",
  mousedown: "onMouseDown",
  mouseup: "onMouseUp",
  mouseover: "onMouseOver",
  mousemove: "onMouseMove",
  mouseout: "onMouseOut",
  mouseenter: "onMouseEnter",
  mouseleave: "onMouseLeave",
  touchcancel: "onTouchCancel",
  touchend: "onTouchEnd",
  touchmove: "onTouchMove",
  touchstart: "onTouchStart",
  contextmenu: "onContextMenu",
  dblclick: "onDoubleClick"
}, jt = function(t) {
  return typeof t == "string" ? t : t ? t.displayName || t.name || "Component" : "";
}, Ph = null, Bu = null, gd = function e(t) {
  if (t === Ph && Array.isArray(Bu))
    return Bu;
  var r = [];
  return F.Children.forEach(t, function(n) {
    ie(n) || (R_.isFragment(n) ? r = r.concat(e(n.props.children)) : r.push(n));
  }), Bu = r, Ph = t, r;
};
function Qe(e, t) {
  var r = [], n = [];
  return Array.isArray(t) ? n = t.map(function(i) {
    return jt(i);
  }) : n = [jt(t)], gd(e).forEach(function(i) {
    var a = Je(i, "type.displayName") || Je(i, "type.name");
    n.indexOf(a) !== -1 && r.push(i);
  }), r;
}
function Ye(e, t) {
  var r = Qe(e, t);
  return r && r[0];
}
var Eh = function(t) {
  if (!t || !t.props)
    return !1;
  var r = t.props, n = r.width, i = r.height;
  return !(!z(n) || n <= 0 || !z(i) || i <= 0);
}, Y_ = ["a", "altGlyph", "altGlyphDef", "altGlyphItem", "animate", "animateColor", "animateMotion", "animateTransform", "circle", "clipPath", "color-profile", "cursor", "defs", "desc", "ellipse", "feBlend", "feColormatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence", "filter", "font", "font-face", "font-face-format", "font-face-name", "font-face-url", "foreignObject", "g", "glyph", "glyphRef", "hkern", "image", "line", "lineGradient", "marker", "mask", "metadata", "missing-glyph", "mpath", "path", "pattern", "polygon", "polyline", "radialGradient", "rect", "script", "set", "stop", "style", "svg", "switch", "symbol", "text", "textPath", "title", "tref", "tspan", "use", "view", "vkern"], X_ = function(t) {
  return t && t.type && hr(t.type) && Y_.indexOf(t.type) >= 0;
}, M0 = function(t) {
  return t && zl(t) === "object" && "clipDot" in t;
}, Z_ = function(t, r, n, i) {
  var a, o = (a = Lu == null ? void 0 : Lu[i]) !== null && a !== void 0 ? a : [];
  return r.startsWith("data-") || !te(t) && (i && o.includes(r) || U_.includes(r)) || n && md.includes(r);
}, X = function(t, r, n) {
  if (!t || typeof t == "function" || typeof t == "boolean")
    return null;
  var i = t;
  if (/* @__PURE__ */ F.isValidElement(t) && (i = t.props), !hn(i))
    return null;
  var a = {};
  return Object.keys(i).forEach(function(o) {
    var u;
    Z_((u = i) === null || u === void 0 ? void 0 : u[o], o, r, n) && (a[o] = i[o]);
  }), a;
}, Wl = function e(t, r) {
  if (t === r)
    return !0;
  var n = F.Children.count(t);
  if (n !== F.Children.count(r))
    return !1;
  if (n === 0)
    return !0;
  if (n === 1)
    return Th(Array.isArray(t) ? t[0] : t, Array.isArray(r) ? r[0] : r);
  for (var i = 0; i < n; i++) {
    var a = t[i], o = r[i];
    if (Array.isArray(a) || Array.isArray(o)) {
      if (!e(a, o))
        return !1;
    } else if (!Th(a, o))
      return !1;
  }
  return !0;
}, Th = function(t, r) {
  if (ie(t) && ie(r))
    return !0;
  if (!ie(t) && !ie(r)) {
    var n = t.props || {}, i = n.children, a = Ah(n, H_), o = r.props || {}, u = o.children, c = Ah(o, G_);
    return i && u ? Dr(a, c) && Wl(i, u) : !i && !u ? Dr(a, c) : !1;
  }
  return !1;
}, jh = function(t, r) {
  var n = [], i = {};
  return gd(t).forEach(function(a, o) {
    if (X_(a))
      n.push(a);
    else if (a) {
      var u = jt(a.type), c = r[u] || {}, s = c.handler, f = c.once;
      if (s && (!f || !i[u])) {
        var l = s(a, u, o);
        n.push(l), i[u] = !0;
      }
    }
  }), n;
}, J_ = function(t) {
  var r = t && t.type;
  return r && Sh[r] ? Sh[r] : null;
}, Q_ = function(t, r) {
  return gd(r).indexOf(t);
}, e1 = ["children", "width", "height", "viewBox", "className", "style", "title", "desc"];
function Ul() {
  return Ul = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Ul.apply(this, arguments);
}
function t1(e, t) {
  if (e == null) return {};
  var r = r1(e, t), n, i;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (i = 0; i < a.length; i++)
      n = a[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function r1(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
function Kl(e) {
  var t = e.children, r = e.width, n = e.height, i = e.viewBox, a = e.className, o = e.style, u = e.title, c = e.desc, s = t1(e, e1), f = i || {
    width: r,
    height: n,
    x: 0,
    y: 0
  }, l = ae("recharts-surface", a);
  return /* @__PURE__ */ S.createElement("svg", Ul({}, X(s, !0, "svg"), {
    className: l,
    width: r,
    height: n,
    style: o,
    viewBox: "".concat(f.x, " ").concat(f.y, " ").concat(f.width, " ").concat(f.height)
  }), /* @__PURE__ */ S.createElement("title", null, u), /* @__PURE__ */ S.createElement("desc", null, c), t);
}
var n1 = ["children", "className"];
function Hl() {
  return Hl = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Hl.apply(this, arguments);
}
function i1(e, t) {
  if (e == null) return {};
  var r = a1(e, t), n, i;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (i = 0; i < a.length; i++)
      n = a[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function a1(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
var ue = /* @__PURE__ */ S.forwardRef(function(e, t) {
  var r = e.children, n = e.className, i = i1(e, n1), a = ae("recharts-layer", n);
  return /* @__PURE__ */ S.createElement("g", Hl({
    className: a
  }, X(i, !0), {
    ref: t
  }), r);
}), o1 = process.env.NODE_ENV !== "production", ft = function(t, r) {
  for (var n = arguments.length, i = new Array(n > 2 ? n - 2 : 0), a = 2; a < n; a++)
    i[a - 2] = arguments[a];
  if (o1 && typeof console < "u" && console.warn && (r === void 0 && console.warn("LogUtils requires an error message argument"), !t))
    if (r === void 0)
      console.warn("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");
    else {
      var o = 0;
      console.warn(r.replace(/%s/g, function() {
        return i[o++];
      }));
    }
}, Fu, $h;
function u1() {
  if ($h) return Fu;
  $h = 1;
  function e(t, r, n) {
    var i = -1, a = t.length;
    r < 0 && (r = -r > a ? 0 : a + r), n = n > a ? a : n, n < 0 && (n += a), a = r > n ? 0 : n - r >>> 0, r >>>= 0;
    for (var o = Array(a); ++i < a; )
      o[i] = t[i + r];
    return o;
  }
  return Fu = e, Fu;
}
var zu, Ch;
function c1() {
  if (Ch) return zu;
  Ch = 1;
  var e = u1();
  function t(r, n, i) {
    var a = r.length;
    return i = i === void 0 ? a : i, !n && i >= a ? r : e(r, n, i);
  }
  return zu = t, zu;
}
var Wu, Mh;
function I0() {
  if (Mh) return Wu;
  Mh = 1;
  var e = "\\ud800-\\udfff", t = "\\u0300-\\u036f", r = "\\ufe20-\\ufe2f", n = "\\u20d0-\\u20ff", i = t + r + n, a = "\\ufe0e\\ufe0f", o = "\\u200d", u = RegExp("[" + o + e + i + a + "]");
  function c(s) {
    return u.test(s);
  }
  return Wu = c, Wu;
}
var Uu, Ih;
function s1() {
  if (Ih) return Uu;
  Ih = 1;
  function e(t) {
    return t.split("");
  }
  return Uu = e, Uu;
}
var Ku, Rh;
function l1() {
  if (Rh) return Ku;
  Rh = 1;
  var e = "\\ud800-\\udfff", t = "\\u0300-\\u036f", r = "\\ufe20-\\ufe2f", n = "\\u20d0-\\u20ff", i = t + r + n, a = "\\ufe0e\\ufe0f", o = "[" + e + "]", u = "[" + i + "]", c = "\\ud83c[\\udffb-\\udfff]", s = "(?:" + u + "|" + c + ")", f = "[^" + e + "]", l = "(?:\\ud83c[\\udde6-\\uddff]){2}", d = "[\\ud800-\\udbff][\\udc00-\\udfff]", h = "\\u200d", m = s + "?", v = "[" + a + "]?", p = "(?:" + h + "(?:" + [f, l, d].join("|") + ")" + v + m + ")*", g = v + m + p, x = "(?:" + [f + u + "?", u, l, d, o].join("|") + ")", w = RegExp(c + "(?=" + c + ")|" + x + g, "g");
  function O(y) {
    return y.match(w) || [];
  }
  return Ku = O, Ku;
}
var Hu, kh;
function f1() {
  if (kh) return Hu;
  kh = 1;
  var e = s1(), t = I0(), r = l1();
  function n(i) {
    return t(i) ? r(i) : e(i);
  }
  return Hu = n, Hu;
}
var Gu, Dh;
function d1() {
  if (Dh) return Gu;
  Dh = 1;
  var e = c1(), t = I0(), r = f1(), n = T0();
  function i(a) {
    return function(o) {
      o = n(o);
      var u = t(o) ? r(o) : void 0, c = u ? u[0] : o.charAt(0), s = u ? e(u, 1).join("") : o.slice(1);
      return c[a]() + s;
    };
  }
  return Gu = i, Gu;
}
var Vu, Nh;
function p1() {
  if (Nh) return Vu;
  Nh = 1;
  var e = d1(), t = e("toUpperCase");
  return Vu = t, Vu;
}
var h1 = p1();
const ro = /* @__PURE__ */ ye(h1);
function xe(e) {
  return function() {
    return e;
  };
}
const R0 = Math.cos, Ji = Math.sin, pt = Math.sqrt, Qi = Math.PI, no = 2 * Qi, Gl = Math.PI, Vl = 2 * Gl, nr = 1e-6, v1 = Vl - nr;
function k0(e) {
  this._ += e[0];
  for (let t = 1, r = e.length; t < r; ++t)
    this._ += arguments[t] + e[t];
}
function y1(e) {
  let t = Math.floor(e);
  if (!(t >= 0)) throw new Error(`invalid digits: ${e}`);
  if (t > 15) return k0;
  const r = 10 ** t;
  return function(n) {
    this._ += n[0];
    for (let i = 1, a = n.length; i < a; ++i)
      this._ += Math.round(arguments[i] * r) / r + n[i];
  };
}
class m1 {
  constructor(t) {
    this._x0 = this._y0 = // start of current subpath
    this._x1 = this._y1 = null, this._ = "", this._append = t == null ? k0 : y1(t);
  }
  moveTo(t, r) {
    this._append`M${this._x0 = this._x1 = +t},${this._y0 = this._y1 = +r}`;
  }
  closePath() {
    this._x1 !== null && (this._x1 = this._x0, this._y1 = this._y0, this._append`Z`);
  }
  lineTo(t, r) {
    this._append`L${this._x1 = +t},${this._y1 = +r}`;
  }
  quadraticCurveTo(t, r, n, i) {
    this._append`Q${+t},${+r},${this._x1 = +n},${this._y1 = +i}`;
  }
  bezierCurveTo(t, r, n, i, a, o) {
    this._append`C${+t},${+r},${+n},${+i},${this._x1 = +a},${this._y1 = +o}`;
  }
  arcTo(t, r, n, i, a) {
    if (t = +t, r = +r, n = +n, i = +i, a = +a, a < 0) throw new Error(`negative radius: ${a}`);
    let o = this._x1, u = this._y1, c = n - t, s = i - r, f = o - t, l = u - r, d = f * f + l * l;
    if (this._x1 === null)
      this._append`M${this._x1 = t},${this._y1 = r}`;
    else if (d > nr) if (!(Math.abs(l * c - s * f) > nr) || !a)
      this._append`L${this._x1 = t},${this._y1 = r}`;
    else {
      let h = n - o, m = i - u, v = c * c + s * s, p = h * h + m * m, g = Math.sqrt(v), x = Math.sqrt(d), w = a * Math.tan((Gl - Math.acos((v + d - p) / (2 * g * x))) / 2), O = w / x, y = w / g;
      Math.abs(O - 1) > nr && this._append`L${t + O * f},${r + O * l}`, this._append`A${a},${a},0,0,${+(l * h > f * m)},${this._x1 = t + y * c},${this._y1 = r + y * s}`;
    }
  }
  arc(t, r, n, i, a, o) {
    if (t = +t, r = +r, n = +n, o = !!o, n < 0) throw new Error(`negative radius: ${n}`);
    let u = n * Math.cos(i), c = n * Math.sin(i), s = t + u, f = r + c, l = 1 ^ o, d = o ? i - a : a - i;
    this._x1 === null ? this._append`M${s},${f}` : (Math.abs(this._x1 - s) > nr || Math.abs(this._y1 - f) > nr) && this._append`L${s},${f}`, n && (d < 0 && (d = d % Vl + Vl), d > v1 ? this._append`A${n},${n},0,1,${l},${t - u},${r - c}A${n},${n},0,1,${l},${this._x1 = s},${this._y1 = f}` : d > nr && this._append`A${n},${n},0,${+(d >= Gl)},${l},${this._x1 = t + n * Math.cos(a)},${this._y1 = r + n * Math.sin(a)}`);
  }
  rect(t, r, n, i) {
    this._append`M${this._x0 = this._x1 = +t},${this._y0 = this._y1 = +r}h${n = +n}v${+i}h${-n}Z`;
  }
  toString() {
    return this._;
  }
}
function bd(e) {
  let t = 3;
  return e.digits = function(r) {
    if (!arguments.length) return t;
    if (r == null)
      t = null;
    else {
      const n = Math.floor(r);
      if (!(n >= 0)) throw new RangeError(`invalid digits: ${r}`);
      t = n;
    }
    return e;
  }, () => new m1(t);
}
function xd(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function D0(e) {
  this._context = e;
}
D0.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line;
  },
  point: function(e, t) {
    switch (e = +e, t = +t, this._point) {
      case 0:
        this._point = 1, this._line ? this._context.lineTo(e, t) : this._context.moveTo(e, t);
        break;
      case 1:
        this._point = 2;
      // falls through
      default:
        this._context.lineTo(e, t);
        break;
    }
  }
};
function io(e) {
  return new D0(e);
}
function N0(e) {
  return e[0];
}
function q0(e) {
  return e[1];
}
function L0(e, t) {
  var r = xe(!0), n = null, i = io, a = null, o = bd(u);
  e = typeof e == "function" ? e : e === void 0 ? N0 : xe(e), t = typeof t == "function" ? t : t === void 0 ? q0 : xe(t);
  function u(c) {
    var s, f = (c = xd(c)).length, l, d = !1, h;
    for (n == null && (a = i(h = o())), s = 0; s <= f; ++s)
      !(s < f && r(l = c[s], s, c)) === d && ((d = !d) ? a.lineStart() : a.lineEnd()), d && a.point(+e(l, s, c), +t(l, s, c));
    if (h) return a = null, h + "" || null;
  }
  return u.x = function(c) {
    return arguments.length ? (e = typeof c == "function" ? c : xe(+c), u) : e;
  }, u.y = function(c) {
    return arguments.length ? (t = typeof c == "function" ? c : xe(+c), u) : t;
  }, u.defined = function(c) {
    return arguments.length ? (r = typeof c == "function" ? c : xe(!!c), u) : r;
  }, u.curve = function(c) {
    return arguments.length ? (i = c, n != null && (a = i(n)), u) : i;
  }, u.context = function(c) {
    return arguments.length ? (c == null ? n = a = null : a = i(n = c), u) : n;
  }, u;
}
function Mi(e, t, r) {
  var n = null, i = xe(!0), a = null, o = io, u = null, c = bd(s);
  e = typeof e == "function" ? e : e === void 0 ? N0 : xe(+e), t = typeof t == "function" ? t : xe(t === void 0 ? 0 : +t), r = typeof r == "function" ? r : r === void 0 ? q0 : xe(+r);
  function s(l) {
    var d, h, m, v = (l = xd(l)).length, p, g = !1, x, w = new Array(v), O = new Array(v);
    for (a == null && (u = o(x = c())), d = 0; d <= v; ++d) {
      if (!(d < v && i(p = l[d], d, l)) === g)
        if (g = !g)
          h = d, u.areaStart(), u.lineStart();
        else {
          for (u.lineEnd(), u.lineStart(), m = d - 1; m >= h; --m)
            u.point(w[m], O[m]);
          u.lineEnd(), u.areaEnd();
        }
      g && (w[d] = +e(p, d, l), O[d] = +t(p, d, l), u.point(n ? +n(p, d, l) : w[d], r ? +r(p, d, l) : O[d]));
    }
    if (x) return u = null, x + "" || null;
  }
  function f() {
    return L0().defined(i).curve(o).context(a);
  }
  return s.x = function(l) {
    return arguments.length ? (e = typeof l == "function" ? l : xe(+l), n = null, s) : e;
  }, s.x0 = function(l) {
    return arguments.length ? (e = typeof l == "function" ? l : xe(+l), s) : e;
  }, s.x1 = function(l) {
    return arguments.length ? (n = l == null ? null : typeof l == "function" ? l : xe(+l), s) : n;
  }, s.y = function(l) {
    return arguments.length ? (t = typeof l == "function" ? l : xe(+l), r = null, s) : t;
  }, s.y0 = function(l) {
    return arguments.length ? (t = typeof l == "function" ? l : xe(+l), s) : t;
  }, s.y1 = function(l) {
    return arguments.length ? (r = l == null ? null : typeof l == "function" ? l : xe(+l), s) : r;
  }, s.lineX0 = s.lineY0 = function() {
    return f().x(e).y(t);
  }, s.lineY1 = function() {
    return f().x(e).y(r);
  }, s.lineX1 = function() {
    return f().x(n).y(t);
  }, s.defined = function(l) {
    return arguments.length ? (i = typeof l == "function" ? l : xe(!!l), s) : i;
  }, s.curve = function(l) {
    return arguments.length ? (o = l, a != null && (u = o(a)), s) : o;
  }, s.context = function(l) {
    return arguments.length ? (l == null ? a = u = null : u = o(a = l), s) : a;
  }, s;
}
class B0 {
  constructor(t, r) {
    this._context = t, this._x = r;
  }
  areaStart() {
    this._line = 0;
  }
  areaEnd() {
    this._line = NaN;
  }
  lineStart() {
    this._point = 0;
  }
  lineEnd() {
    (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line;
  }
  point(t, r) {
    switch (t = +t, r = +r, this._point) {
      case 0: {
        this._point = 1, this._line ? this._context.lineTo(t, r) : this._context.moveTo(t, r);
        break;
      }
      case 1:
        this._point = 2;
      // falls through
      default: {
        this._x ? this._context.bezierCurveTo(this._x0 = (this._x0 + t) / 2, this._y0, this._x0, r, t, r) : this._context.bezierCurveTo(this._x0, this._y0 = (this._y0 + r) / 2, t, this._y0, t, r);
        break;
      }
    }
    this._x0 = t, this._y0 = r;
  }
}
function g1(e) {
  return new B0(e, !0);
}
function b1(e) {
  return new B0(e, !1);
}
const wd = {
  draw(e, t) {
    const r = pt(t / Qi);
    e.moveTo(r, 0), e.arc(0, 0, r, 0, no);
  }
}, x1 = {
  draw(e, t) {
    const r = pt(t / 5) / 2;
    e.moveTo(-3 * r, -r), e.lineTo(-r, -r), e.lineTo(-r, -3 * r), e.lineTo(r, -3 * r), e.lineTo(r, -r), e.lineTo(3 * r, -r), e.lineTo(3 * r, r), e.lineTo(r, r), e.lineTo(r, 3 * r), e.lineTo(-r, 3 * r), e.lineTo(-r, r), e.lineTo(-3 * r, r), e.closePath();
  }
}, F0 = pt(1 / 3), w1 = F0 * 2, O1 = {
  draw(e, t) {
    const r = pt(t / w1), n = r * F0;
    e.moveTo(0, -r), e.lineTo(n, 0), e.lineTo(0, r), e.lineTo(-n, 0), e.closePath();
  }
}, _1 = {
  draw(e, t) {
    const r = pt(t), n = -r / 2;
    e.rect(n, n, r, r);
  }
}, A1 = 0.8908130915292852, z0 = Ji(Qi / 10) / Ji(7 * Qi / 10), S1 = Ji(no / 10) * z0, P1 = -R0(no / 10) * z0, E1 = {
  draw(e, t) {
    const r = pt(t * A1), n = S1 * r, i = P1 * r;
    e.moveTo(0, -r), e.lineTo(n, i);
    for (let a = 1; a < 5; ++a) {
      const o = no * a / 5, u = R0(o), c = Ji(o);
      e.lineTo(c * r, -u * r), e.lineTo(u * n - c * i, c * n + u * i);
    }
    e.closePath();
  }
}, Yu = pt(3), T1 = {
  draw(e, t) {
    const r = -pt(t / (Yu * 3));
    e.moveTo(0, r * 2), e.lineTo(-Yu * r, -r), e.lineTo(Yu * r, -r), e.closePath();
  }
}, et = -0.5, tt = pt(3) / 2, Yl = 1 / pt(12), j1 = (Yl / 2 + 1) * 3, $1 = {
  draw(e, t) {
    const r = pt(t / j1), n = r / 2, i = r * Yl, a = n, o = r * Yl + r, u = -a, c = o;
    e.moveTo(n, i), e.lineTo(a, o), e.lineTo(u, c), e.lineTo(et * n - tt * i, tt * n + et * i), e.lineTo(et * a - tt * o, tt * a + et * o), e.lineTo(et * u - tt * c, tt * u + et * c), e.lineTo(et * n + tt * i, et * i - tt * n), e.lineTo(et * a + tt * o, et * o - tt * a), e.lineTo(et * u + tt * c, et * c - tt * u), e.closePath();
  }
};
function C1(e, t) {
  let r = null, n = bd(i);
  e = typeof e == "function" ? e : xe(e || wd), t = typeof t == "function" ? t : xe(t === void 0 ? 64 : +t);
  function i() {
    let a;
    if (r || (r = a = n()), e.apply(this, arguments).draw(r, +t.apply(this, arguments)), a) return r = null, a + "" || null;
  }
  return i.type = function(a) {
    return arguments.length ? (e = typeof a == "function" ? a : xe(a), i) : e;
  }, i.size = function(a) {
    return arguments.length ? (t = typeof a == "function" ? a : xe(+a), i) : t;
  }, i.context = function(a) {
    return arguments.length ? (r = a ?? null, i) : r;
  }, i;
}
function ea() {
}
function ta(e, t, r) {
  e._context.bezierCurveTo(
    (2 * e._x0 + e._x1) / 3,
    (2 * e._y0 + e._y1) / 3,
    (e._x0 + 2 * e._x1) / 3,
    (e._y0 + 2 * e._y1) / 3,
    (e._x0 + 4 * e._x1 + t) / 6,
    (e._y0 + 4 * e._y1 + r) / 6
  );
}
function W0(e) {
  this._context = e;
}
W0.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._y0 = this._y1 = NaN, this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 3:
        ta(this, this._x1, this._y1);
      // falls through
      case 2:
        this._context.lineTo(this._x1, this._y1);
        break;
    }
    (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line;
  },
  point: function(e, t) {
    switch (e = +e, t = +t, this._point) {
      case 0:
        this._point = 1, this._line ? this._context.lineTo(e, t) : this._context.moveTo(e, t);
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3, this._context.lineTo((5 * this._x0 + this._x1) / 6, (5 * this._y0 + this._y1) / 6);
      // falls through
      default:
        ta(this, e, t);
        break;
    }
    this._x0 = this._x1, this._x1 = e, this._y0 = this._y1, this._y1 = t;
  }
};
function M1(e) {
  return new W0(e);
}
function U0(e) {
  this._context = e;
}
U0.prototype = {
  areaStart: ea,
  areaEnd: ea,
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = NaN, this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 1: {
        this._context.moveTo(this._x2, this._y2), this._context.closePath();
        break;
      }
      case 2: {
        this._context.moveTo((this._x2 + 2 * this._x3) / 3, (this._y2 + 2 * this._y3) / 3), this._context.lineTo((this._x3 + 2 * this._x2) / 3, (this._y3 + 2 * this._y2) / 3), this._context.closePath();
        break;
      }
      case 3: {
        this.point(this._x2, this._y2), this.point(this._x3, this._y3), this.point(this._x4, this._y4);
        break;
      }
    }
  },
  point: function(e, t) {
    switch (e = +e, t = +t, this._point) {
      case 0:
        this._point = 1, this._x2 = e, this._y2 = t;
        break;
      case 1:
        this._point = 2, this._x3 = e, this._y3 = t;
        break;
      case 2:
        this._point = 3, this._x4 = e, this._y4 = t, this._context.moveTo((this._x0 + 4 * this._x1 + e) / 6, (this._y0 + 4 * this._y1 + t) / 6);
        break;
      default:
        ta(this, e, t);
        break;
    }
    this._x0 = this._x1, this._x1 = e, this._y0 = this._y1, this._y1 = t;
  }
};
function I1(e) {
  return new U0(e);
}
function K0(e) {
  this._context = e;
}
K0.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._y0 = this._y1 = NaN, this._point = 0;
  },
  lineEnd: function() {
    (this._line || this._line !== 0 && this._point === 3) && this._context.closePath(), this._line = 1 - this._line;
  },
  point: function(e, t) {
    switch (e = +e, t = +t, this._point) {
      case 0:
        this._point = 1;
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3;
        var r = (this._x0 + 4 * this._x1 + e) / 6, n = (this._y0 + 4 * this._y1 + t) / 6;
        this._line ? this._context.lineTo(r, n) : this._context.moveTo(r, n);
        break;
      case 3:
        this._point = 4;
      // falls through
      default:
        ta(this, e, t);
        break;
    }
    this._x0 = this._x1, this._x1 = e, this._y0 = this._y1, this._y1 = t;
  }
};
function R1(e) {
  return new K0(e);
}
function H0(e) {
  this._context = e;
}
H0.prototype = {
  areaStart: ea,
  areaEnd: ea,
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    this._point && this._context.closePath();
  },
  point: function(e, t) {
    e = +e, t = +t, this._point ? this._context.lineTo(e, t) : (this._point = 1, this._context.moveTo(e, t));
  }
};
function k1(e) {
  return new H0(e);
}
function qh(e) {
  return e < 0 ? -1 : 1;
}
function Lh(e, t, r) {
  var n = e._x1 - e._x0, i = t - e._x1, a = (e._y1 - e._y0) / (n || i < 0 && -0), o = (r - e._y1) / (i || n < 0 && -0), u = (a * i + o * n) / (n + i);
  return (qh(a) + qh(o)) * Math.min(Math.abs(a), Math.abs(o), 0.5 * Math.abs(u)) || 0;
}
function Bh(e, t) {
  var r = e._x1 - e._x0;
  return r ? (3 * (e._y1 - e._y0) / r - t) / 2 : t;
}
function Xu(e, t, r) {
  var n = e._x0, i = e._y0, a = e._x1, o = e._y1, u = (a - n) / 3;
  e._context.bezierCurveTo(n + u, i + u * t, a - u, o - u * r, a, o);
}
function ra(e) {
  this._context = e;
}
ra.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._y0 = this._y1 = this._t0 = NaN, this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 2:
        this._context.lineTo(this._x1, this._y1);
        break;
      case 3:
        Xu(this, this._t0, Bh(this, this._t0));
        break;
    }
    (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line;
  },
  point: function(e, t) {
    var r = NaN;
    if (e = +e, t = +t, !(e === this._x1 && t === this._y1)) {
      switch (this._point) {
        case 0:
          this._point = 1, this._line ? this._context.lineTo(e, t) : this._context.moveTo(e, t);
          break;
        case 1:
          this._point = 2;
          break;
        case 2:
          this._point = 3, Xu(this, Bh(this, r = Lh(this, e, t)), r);
          break;
        default:
          Xu(this, this._t0, r = Lh(this, e, t));
          break;
      }
      this._x0 = this._x1, this._x1 = e, this._y0 = this._y1, this._y1 = t, this._t0 = r;
    }
  }
};
function G0(e) {
  this._context = new V0(e);
}
(G0.prototype = Object.create(ra.prototype)).point = function(e, t) {
  ra.prototype.point.call(this, t, e);
};
function V0(e) {
  this._context = e;
}
V0.prototype = {
  moveTo: function(e, t) {
    this._context.moveTo(t, e);
  },
  closePath: function() {
    this._context.closePath();
  },
  lineTo: function(e, t) {
    this._context.lineTo(t, e);
  },
  bezierCurveTo: function(e, t, r, n, i, a) {
    this._context.bezierCurveTo(t, e, n, r, a, i);
  }
};
function D1(e) {
  return new ra(e);
}
function N1(e) {
  return new G0(e);
}
function Y0(e) {
  this._context = e;
}
Y0.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x = [], this._y = [];
  },
  lineEnd: function() {
    var e = this._x, t = this._y, r = e.length;
    if (r)
      if (this._line ? this._context.lineTo(e[0], t[0]) : this._context.moveTo(e[0], t[0]), r === 2)
        this._context.lineTo(e[1], t[1]);
      else
        for (var n = Fh(e), i = Fh(t), a = 0, o = 1; o < r; ++a, ++o)
          this._context.bezierCurveTo(n[0][a], i[0][a], n[1][a], i[1][a], e[o], t[o]);
    (this._line || this._line !== 0 && r === 1) && this._context.closePath(), this._line = 1 - this._line, this._x = this._y = null;
  },
  point: function(e, t) {
    this._x.push(+e), this._y.push(+t);
  }
};
function Fh(e) {
  var t, r = e.length - 1, n, i = new Array(r), a = new Array(r), o = new Array(r);
  for (i[0] = 0, a[0] = 2, o[0] = e[0] + 2 * e[1], t = 1; t < r - 1; ++t) i[t] = 1, a[t] = 4, o[t] = 4 * e[t] + 2 * e[t + 1];
  for (i[r - 1] = 2, a[r - 1] = 7, o[r - 1] = 8 * e[r - 1] + e[r], t = 1; t < r; ++t) n = i[t] / a[t - 1], a[t] -= n, o[t] -= n * o[t - 1];
  for (i[r - 1] = o[r - 1] / a[r - 1], t = r - 2; t >= 0; --t) i[t] = (o[t] - i[t + 1]) / a[t];
  for (a[r - 1] = (e[r] + i[r - 1]) / 2, t = 0; t < r - 1; ++t) a[t] = 2 * e[t + 1] - i[t + 1];
  return [i, a];
}
function q1(e) {
  return new Y0(e);
}
function ao(e, t) {
  this._context = e, this._t = t;
}
ao.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x = this._y = NaN, this._point = 0;
  },
  lineEnd: function() {
    0 < this._t && this._t < 1 && this._point === 2 && this._context.lineTo(this._x, this._y), (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line >= 0 && (this._t = 1 - this._t, this._line = 1 - this._line);
  },
  point: function(e, t) {
    switch (e = +e, t = +t, this._point) {
      case 0:
        this._point = 1, this._line ? this._context.lineTo(e, t) : this._context.moveTo(e, t);
        break;
      case 1:
        this._point = 2;
      // falls through
      default: {
        if (this._t <= 0)
          this._context.lineTo(this._x, t), this._context.lineTo(e, t);
        else {
          var r = this._x * (1 - this._t) + e * this._t;
          this._context.lineTo(r, this._y), this._context.lineTo(r, t);
        }
        break;
      }
    }
    this._x = e, this._y = t;
  }
};
function L1(e) {
  return new ao(e, 0.5);
}
function B1(e) {
  return new ao(e, 0);
}
function F1(e) {
  return new ao(e, 1);
}
function Lr(e, t) {
  if ((o = e.length) > 1)
    for (var r = 1, n, i, a = e[t[0]], o, u = a.length; r < o; ++r)
      for (i = a, a = e[t[r]], n = 0; n < u; ++n)
        a[n][1] += a[n][0] = isNaN(i[n][1]) ? i[n][0] : i[n][1];
}
function Xl(e) {
  for (var t = e.length, r = new Array(t); --t >= 0; ) r[t] = t;
  return r;
}
function z1(e, t) {
  return e[t];
}
function W1(e) {
  const t = [];
  return t.key = e, t;
}
function U1() {
  var e = xe([]), t = Xl, r = Lr, n = z1;
  function i(a) {
    var o = Array.from(e.apply(this, arguments), W1), u, c = o.length, s = -1, f;
    for (const l of a)
      for (u = 0, ++s; u < c; ++u)
        (o[u][s] = [0, +n(l, o[u].key, s, a)]).data = l;
    for (u = 0, f = xd(t(o)); u < c; ++u)
      o[f[u]].index = u;
    return r(o, f), o;
  }
  return i.keys = function(a) {
    return arguments.length ? (e = typeof a == "function" ? a : xe(Array.from(a)), i) : e;
  }, i.value = function(a) {
    return arguments.length ? (n = typeof a == "function" ? a : xe(+a), i) : n;
  }, i.order = function(a) {
    return arguments.length ? (t = a == null ? Xl : typeof a == "function" ? a : xe(Array.from(a)), i) : t;
  }, i.offset = function(a) {
    return arguments.length ? (r = a ?? Lr, i) : r;
  }, i;
}
function K1(e, t) {
  if ((n = e.length) > 0) {
    for (var r, n, i = 0, a = e[0].length, o; i < a; ++i) {
      for (o = r = 0; r < n; ++r) o += e[r][i][1] || 0;
      if (o) for (r = 0; r < n; ++r) e[r][i][1] /= o;
    }
    Lr(e, t);
  }
}
function H1(e, t) {
  if ((i = e.length) > 0) {
    for (var r = 0, n = e[t[0]], i, a = n.length; r < a; ++r) {
      for (var o = 0, u = 0; o < i; ++o) u += e[o][r][1] || 0;
      n[r][1] += n[r][0] = -u / 2;
    }
    Lr(e, t);
  }
}
function G1(e, t) {
  if (!(!((o = e.length) > 0) || !((a = (i = e[t[0]]).length) > 0))) {
    for (var r = 0, n = 1, i, a, o; n < a; ++n) {
      for (var u = 0, c = 0, s = 0; u < o; ++u) {
        for (var f = e[t[u]], l = f[n][1] || 0, d = f[n - 1][1] || 0, h = (l - d) / 2, m = 0; m < u; ++m) {
          var v = e[t[m]], p = v[n][1] || 0, g = v[n - 1][1] || 0;
          h += p - g;
        }
        c += l, s += h * l;
      }
      i[n - 1][1] += i[n - 1][0] = r, c && (r -= s / c);
    }
    i[n - 1][1] += i[n - 1][0] = r, Lr(e, t);
  }
}
function Bn(e) {
  "@babel/helpers - typeof";
  return Bn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Bn(e);
}
var V1 = ["type", "size", "sizeType"];
function Zl() {
  return Zl = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Zl.apply(this, arguments);
}
function zh(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Wh(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? zh(Object(r), !0).forEach(function(n) {
      Y1(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : zh(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function Y1(e, t, r) {
  return t = X1(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function X1(e) {
  var t = Z1(e, "string");
  return Bn(t) == "symbol" ? t : t + "";
}
function Z1(e, t) {
  if (Bn(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Bn(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function J1(e, t) {
  if (e == null) return {};
  var r = Q1(e, t), n, i;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (i = 0; i < a.length; i++)
      n = a[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function Q1(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
var X0 = {
  symbolCircle: wd,
  symbolCross: x1,
  symbolDiamond: O1,
  symbolSquare: _1,
  symbolStar: E1,
  symbolTriangle: T1,
  symbolWye: $1
}, eA = Math.PI / 180, tA = function(t) {
  var r = "symbol".concat(ro(t));
  return X0[r] || wd;
}, rA = function(t, r, n) {
  if (r === "area")
    return t;
  switch (n) {
    case "cross":
      return 5 * t * t / 9;
    case "diamond":
      return 0.5 * t * t / Math.sqrt(3);
    case "square":
      return t * t;
    case "star": {
      var i = 18 * eA;
      return 1.25 * t * t * (Math.tan(i) - Math.tan(i * 2) * Math.pow(Math.tan(i), 2));
    }
    case "triangle":
      return Math.sqrt(3) * t * t / 4;
    case "wye":
      return (21 - 10 * Math.sqrt(3)) * t * t / 8;
    default:
      return Math.PI * t * t / 4;
  }
}, nA = function(t, r) {
  X0["symbol".concat(ro(t))] = r;
}, Od = function(t) {
  var r = t.type, n = r === void 0 ? "circle" : r, i = t.size, a = i === void 0 ? 64 : i, o = t.sizeType, u = o === void 0 ? "area" : o, c = J1(t, V1), s = Wh(Wh({}, c), {}, {
    type: n,
    size: a,
    sizeType: u
  }), f = function() {
    var p = tA(n), g = C1().type(p).size(rA(a, u, n));
    return g();
  }, l = s.className, d = s.cx, h = s.cy, m = X(s, !0);
  return d === +d && h === +h && a === +a ? /* @__PURE__ */ S.createElement("path", Zl({}, m, {
    className: ae("recharts-symbols", l),
    transform: "translate(".concat(d, ", ").concat(h, ")"),
    d: f()
  })) : null;
};
Od.registerSymbol = nA;
function Br(e) {
  "@babel/helpers - typeof";
  return Br = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Br(e);
}
function Jl() {
  return Jl = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Jl.apply(this, arguments);
}
function Uh(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function iA(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Uh(Object(r), !0).forEach(function(n) {
      Fn(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Uh(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function aA(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function oA(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, J0(n.key), n);
  }
}
function uA(e, t, r) {
  return t && oA(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function cA(e, t, r) {
  return t = na(t), sA(e, Z0() ? Reflect.construct(t, r || [], na(e).constructor) : t.apply(e, r));
}
function sA(e, t) {
  if (t && (Br(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return lA(e);
}
function lA(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function Z0() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (Z0 = function() {
    return !!e;
  })();
}
function na(e) {
  return na = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, na(e);
}
function fA(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Ql(e, t);
}
function Ql(e, t) {
  return Ql = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n;
  }, Ql(e, t);
}
function Fn(e, t, r) {
  return t = J0(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function J0(e) {
  var t = dA(e, "string");
  return Br(t) == "symbol" ? t : t + "";
}
function dA(e, t) {
  if (Br(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Br(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var rt = 32, _d = /* @__PURE__ */ (function(e) {
  function t() {
    return aA(this, t), cA(this, t, arguments);
  }
  return fA(t, e), uA(t, [{
    key: "renderIcon",
    value: (
      /**
       * Render the path of icon
       * @param {Object} data Data of each legend item
       * @return {String} Path element
       */
      function(n) {
        var i = this.props.inactiveColor, a = rt / 2, o = rt / 6, u = rt / 3, c = n.inactive ? i : n.color;
        if (n.type === "plainline")
          return /* @__PURE__ */ S.createElement("line", {
            strokeWidth: 4,
            fill: "none",
            stroke: c,
            strokeDasharray: n.payload.strokeDasharray,
            x1: 0,
            y1: a,
            x2: rt,
            y2: a,
            className: "recharts-legend-icon"
          });
        if (n.type === "line")
          return /* @__PURE__ */ S.createElement("path", {
            strokeWidth: 4,
            fill: "none",
            stroke: c,
            d: "M0,".concat(a, "h").concat(u, `
            A`).concat(o, ",").concat(o, ",0,1,1,").concat(2 * u, ",").concat(a, `
            H`).concat(rt, "M").concat(2 * u, ",").concat(a, `
            A`).concat(o, ",").concat(o, ",0,1,1,").concat(u, ",").concat(a),
            className: "recharts-legend-icon"
          });
        if (n.type === "rect")
          return /* @__PURE__ */ S.createElement("path", {
            stroke: "none",
            fill: c,
            d: "M0,".concat(rt / 8, "h").concat(rt, "v").concat(rt * 3 / 4, "h").concat(-rt, "z"),
            className: "recharts-legend-icon"
          });
        if (/* @__PURE__ */ S.isValidElement(n.legendIcon)) {
          var s = iA({}, n);
          return delete s.legendIcon, /* @__PURE__ */ S.cloneElement(n.legendIcon, s);
        }
        return /* @__PURE__ */ S.createElement(Od, {
          fill: c,
          cx: a,
          cy: a,
          size: rt,
          sizeType: "diameter",
          type: n.type
        });
      }
    )
    /**
     * Draw items of legend
     * @return {ReactElement} Items
     */
  }, {
    key: "renderItems",
    value: function() {
      var n = this, i = this.props, a = i.payload, o = i.iconSize, u = i.layout, c = i.formatter, s = i.inactiveColor, f = {
        x: 0,
        y: 0,
        width: rt,
        height: rt
      }, l = {
        display: u === "horizontal" ? "inline-block" : "block",
        marginRight: 10
      }, d = {
        display: "inline-block",
        verticalAlign: "middle",
        marginRight: 4
      };
      return a.map(function(h, m) {
        var v = h.formatter || c, p = ae(Fn(Fn({
          "recharts-legend-item": !0
        }, "legend-item-".concat(m), !0), "inactive", h.inactive));
        if (h.type === "none")
          return null;
        var g = te(h.value) ? null : h.value;
        ft(
          !te(h.value),
          `The name property is also required when using a function for the dataKey of a chart's cartesian components. Ex: <Bar name="Name of my Data"/>`
          // eslint-disable-line max-len
        );
        var x = h.inactive ? s : h.color;
        return /* @__PURE__ */ S.createElement("li", Jl({
          className: p,
          style: l,
          key: "legend-item-".concat(m)
        }, vr(n.props, h, m)), /* @__PURE__ */ S.createElement(Kl, {
          width: o,
          height: o,
          viewBox: f,
          style: d
        }, n.renderIcon(h)), /* @__PURE__ */ S.createElement("span", {
          className: "recharts-legend-item-text",
          style: {
            color: x
          }
        }, v ? v(g, h, m) : g));
      });
    }
  }, {
    key: "render",
    value: function() {
      var n = this.props, i = n.payload, a = n.layout, o = n.align;
      if (!i || !i.length)
        return null;
      var u = {
        padding: 0,
        margin: 0,
        textAlign: a === "horizontal" ? o : "left"
      };
      return /* @__PURE__ */ S.createElement("ul", {
        className: "recharts-default-legend",
        style: u
      }, this.renderItems());
    }
  }]);
})(F.PureComponent);
Fn(_d, "displayName", "Legend");
Fn(_d, "defaultProps", {
  iconSize: 14,
  layout: "horizontal",
  align: "center",
  verticalAlign: "middle",
  inactiveColor: "#ccc"
});
var Zu, Kh;
function pA() {
  if (Kh) return Zu;
  Kh = 1;
  var e = Qa();
  function t() {
    this.__data__ = new e(), this.size = 0;
  }
  return Zu = t, Zu;
}
var Ju, Hh;
function hA() {
  if (Hh) return Ju;
  Hh = 1;
  function e(t) {
    var r = this.__data__, n = r.delete(t);
    return this.size = r.size, n;
  }
  return Ju = e, Ju;
}
var Qu, Gh;
function vA() {
  if (Gh) return Qu;
  Gh = 1;
  function e(t) {
    return this.__data__.get(t);
  }
  return Qu = e, Qu;
}
var ec, Vh;
function yA() {
  if (Vh) return ec;
  Vh = 1;
  function e(t) {
    return this.__data__.has(t);
  }
  return ec = e, ec;
}
var tc, Yh;
function mA() {
  if (Yh) return tc;
  Yh = 1;
  var e = Qa(), t = pd(), r = hd(), n = 200;
  function i(a, o) {
    var u = this.__data__;
    if (u instanceof e) {
      var c = u.__data__;
      if (!t || c.length < n - 1)
        return c.push([a, o]), this.size = ++u.size, this;
      u = this.__data__ = new r(c);
    }
    return u.set(a, o), this.size = u.size, this;
  }
  return tc = i, tc;
}
var rc, Xh;
function Q0() {
  if (Xh) return rc;
  Xh = 1;
  var e = Qa(), t = pA(), r = hA(), n = vA(), i = yA(), a = mA();
  function o(u) {
    var c = this.__data__ = new e(u);
    this.size = c.size;
  }
  return o.prototype.clear = t, o.prototype.delete = r, o.prototype.get = n, o.prototype.has = i, o.prototype.set = a, rc = o, rc;
}
var nc, Zh;
function gA() {
  if (Zh) return nc;
  Zh = 1;
  var e = "__lodash_hash_undefined__";
  function t(r) {
    return this.__data__.set(r, e), this;
  }
  return nc = t, nc;
}
var ic, Jh;
function bA() {
  if (Jh) return ic;
  Jh = 1;
  function e(t) {
    return this.__data__.has(t);
  }
  return ic = e, ic;
}
var ac, Qh;
function ex() {
  if (Qh) return ac;
  Qh = 1;
  var e = hd(), t = gA(), r = bA();
  function n(i) {
    var a = -1, o = i == null ? 0 : i.length;
    for (this.__data__ = new e(); ++a < o; )
      this.add(i[a]);
  }
  return n.prototype.add = n.prototype.push = t, n.prototype.has = r, ac = n, ac;
}
var oc, ev;
function tx() {
  if (ev) return oc;
  ev = 1;
  function e(t, r) {
    for (var n = -1, i = t == null ? 0 : t.length; ++n < i; )
      if (r(t[n], n, t))
        return !0;
    return !1;
  }
  return oc = e, oc;
}
var uc, tv;
function rx() {
  if (tv) return uc;
  tv = 1;
  function e(t, r) {
    return t.has(r);
  }
  return uc = e, uc;
}
var cc, rv;
function nx() {
  if (rv) return cc;
  rv = 1;
  var e = ex(), t = tx(), r = rx(), n = 1, i = 2;
  function a(o, u, c, s, f, l) {
    var d = c & n, h = o.length, m = u.length;
    if (h != m && !(d && m > h))
      return !1;
    var v = l.get(o), p = l.get(u);
    if (v && p)
      return v == u && p == o;
    var g = -1, x = !0, w = c & i ? new e() : void 0;
    for (l.set(o, u), l.set(u, o); ++g < h; ) {
      var O = o[g], y = u[g];
      if (s)
        var b = d ? s(y, O, g, u, o, l) : s(O, y, g, o, u, l);
      if (b !== void 0) {
        if (b)
          continue;
        x = !1;
        break;
      }
      if (w) {
        if (!t(u, function(_, A) {
          if (!r(w, A) && (O === _ || f(O, _, c, s, l)))
            return w.push(A);
        })) {
          x = !1;
          break;
        }
      } else if (!(O === y || f(O, y, c, s, l))) {
        x = !1;
        break;
      }
    }
    return l.delete(o), l.delete(u), x;
  }
  return cc = a, cc;
}
var sc, nv;
function xA() {
  if (nv) return sc;
  nv = 1;
  var e = wt(), t = e.Uint8Array;
  return sc = t, sc;
}
var lc, iv;
function wA() {
  if (iv) return lc;
  iv = 1;
  function e(t) {
    var r = -1, n = Array(t.size);
    return t.forEach(function(i, a) {
      n[++r] = [a, i];
    }), n;
  }
  return lc = e, lc;
}
var fc, av;
function Ad() {
  if (av) return fc;
  av = 1;
  function e(t) {
    var r = -1, n = Array(t.size);
    return t.forEach(function(i) {
      n[++r] = i;
    }), n;
  }
  return fc = e, fc;
}
var dc, ov;
function OA() {
  if (ov) return dc;
  ov = 1;
  var e = xi(), t = xA(), r = dd(), n = nx(), i = wA(), a = Ad(), o = 1, u = 2, c = "[object Boolean]", s = "[object Date]", f = "[object Error]", l = "[object Map]", d = "[object Number]", h = "[object RegExp]", m = "[object Set]", v = "[object String]", p = "[object Symbol]", g = "[object ArrayBuffer]", x = "[object DataView]", w = e ? e.prototype : void 0, O = w ? w.valueOf : void 0;
  function y(b, _, A, E, C, P, T) {
    switch (A) {
      case x:
        if (b.byteLength != _.byteLength || b.byteOffset != _.byteOffset)
          return !1;
        b = b.buffer, _ = _.buffer;
      case g:
        return !(b.byteLength != _.byteLength || !P(new t(b), new t(_)));
      case c:
      case s:
      case d:
        return r(+b, +_);
      case f:
        return b.name == _.name && b.message == _.message;
      case h:
      case v:
        return b == _ + "";
      case l:
        var $ = i;
      case m:
        var R = E & o;
        if ($ || ($ = a), b.size != _.size && !R)
          return !1;
        var I = T.get(b);
        if (I)
          return I == _;
        E |= u, T.set(b, _);
        var k = n($(b), $(_), E, C, P, T);
        return T.delete(b), k;
      case p:
        if (O)
          return O.call(b) == O.call(_);
    }
    return !1;
  }
  return dc = y, dc;
}
var pc, uv;
function ix() {
  if (uv) return pc;
  uv = 1;
  function e(t, r) {
    for (var n = -1, i = r.length, a = t.length; ++n < i; )
      t[a + n] = r[n];
    return t;
  }
  return pc = e, pc;
}
var hc, cv;
function _A() {
  if (cv) return hc;
  cv = 1;
  var e = ix(), t = He();
  function r(n, i, a) {
    var o = i(n);
    return t(n) ? o : e(o, a(n));
  }
  return hc = r, hc;
}
var vc, sv;
function AA() {
  if (sv) return vc;
  sv = 1;
  function e(t, r) {
    for (var n = -1, i = t == null ? 0 : t.length, a = 0, o = []; ++n < i; ) {
      var u = t[n];
      r(u, n, t) && (o[a++] = u);
    }
    return o;
  }
  return vc = e, vc;
}
var yc, lv;
function SA() {
  if (lv) return yc;
  lv = 1;
  function e() {
    return [];
  }
  return yc = e, yc;
}
var mc, fv;
function PA() {
  if (fv) return mc;
  fv = 1;
  var e = AA(), t = SA(), r = Object.prototype, n = r.propertyIsEnumerable, i = Object.getOwnPropertySymbols, a = i ? function(o) {
    return o == null ? [] : (o = Object(o), e(i(o), function(u) {
      return n.call(o, u);
    }));
  } : t;
  return mc = a, mc;
}
var gc, dv;
function EA() {
  if (dv) return gc;
  dv = 1;
  function e(t, r) {
    for (var n = -1, i = Array(t); ++n < t; )
      i[n] = r(n);
    return i;
  }
  return gc = e, gc;
}
var bc, pv;
function TA() {
  if (pv) return bc;
  pv = 1;
  var e = Rt(), t = kt(), r = "[object Arguments]";
  function n(i) {
    return t(i) && e(i) == r;
  }
  return bc = n, bc;
}
var xc, hv;
function Sd() {
  if (hv) return xc;
  hv = 1;
  var e = TA(), t = kt(), r = Object.prototype, n = r.hasOwnProperty, i = r.propertyIsEnumerable, a = e(/* @__PURE__ */ (function() {
    return arguments;
  })()) ? e : function(o) {
    return t(o) && n.call(o, "callee") && !i.call(o, "callee");
  };
  return xc = a, xc;
}
var $n = { exports: {} }, wc, vv;
function jA() {
  if (vv) return wc;
  vv = 1;
  function e() {
    return !1;
  }
  return wc = e, wc;
}
$n.exports;
var yv;
function ax() {
  return yv || (yv = 1, (function(e, t) {
    var r = wt(), n = jA(), i = t && !t.nodeType && t, a = i && !0 && e && !e.nodeType && e, o = a && a.exports === i, u = o ? r.Buffer : void 0, c = u ? u.isBuffer : void 0, s = c || n;
    e.exports = s;
  })($n, $n.exports)), $n.exports;
}
var Oc, mv;
function Pd() {
  if (mv) return Oc;
  mv = 1;
  var e = 9007199254740991, t = /^(?:0|[1-9]\d*)$/;
  function r(n, i) {
    var a = typeof n;
    return i = i ?? e, !!i && (a == "number" || a != "symbol" && t.test(n)) && n > -1 && n % 1 == 0 && n < i;
  }
  return Oc = r, Oc;
}
var _c, gv;
function Ed() {
  if (gv) return _c;
  gv = 1;
  var e = 9007199254740991;
  function t(r) {
    return typeof r == "number" && r > -1 && r % 1 == 0 && r <= e;
  }
  return _c = t, _c;
}
var Ac, bv;
function $A() {
  if (bv) return Ac;
  bv = 1;
  var e = Rt(), t = Ed(), r = kt(), n = "[object Arguments]", i = "[object Array]", a = "[object Boolean]", o = "[object Date]", u = "[object Error]", c = "[object Function]", s = "[object Map]", f = "[object Number]", l = "[object Object]", d = "[object RegExp]", h = "[object Set]", m = "[object String]", v = "[object WeakMap]", p = "[object ArrayBuffer]", g = "[object DataView]", x = "[object Float32Array]", w = "[object Float64Array]", O = "[object Int8Array]", y = "[object Int16Array]", b = "[object Int32Array]", _ = "[object Uint8Array]", A = "[object Uint8ClampedArray]", E = "[object Uint16Array]", C = "[object Uint32Array]", P = {};
  P[x] = P[w] = P[O] = P[y] = P[b] = P[_] = P[A] = P[E] = P[C] = !0, P[n] = P[i] = P[p] = P[a] = P[g] = P[o] = P[u] = P[c] = P[s] = P[f] = P[l] = P[d] = P[h] = P[m] = P[v] = !1;
  function T($) {
    return r($) && t($.length) && !!P[e($)];
  }
  return Ac = T, Ac;
}
var Sc, xv;
function ox() {
  if (xv) return Sc;
  xv = 1;
  function e(t) {
    return function(r) {
      return t(r);
    };
  }
  return Sc = e, Sc;
}
var Cn = { exports: {} };
Cn.exports;
var wv;
function CA() {
  return wv || (wv = 1, (function(e, t) {
    var r = S0(), n = t && !t.nodeType && t, i = n && !0 && e && !e.nodeType && e, a = i && i.exports === n, o = a && r.process, u = (function() {
      try {
        var c = i && i.require && i.require("util").types;
        return c || o && o.binding && o.binding("util");
      } catch {
      }
    })();
    e.exports = u;
  })(Cn, Cn.exports)), Cn.exports;
}
var Pc, Ov;
function ux() {
  if (Ov) return Pc;
  Ov = 1;
  var e = $A(), t = ox(), r = CA(), n = r && r.isTypedArray, i = n ? t(n) : e;
  return Pc = i, Pc;
}
var Ec, _v;
function MA() {
  if (_v) return Ec;
  _v = 1;
  var e = EA(), t = Sd(), r = He(), n = ax(), i = Pd(), a = ux(), o = Object.prototype, u = o.hasOwnProperty;
  function c(s, f) {
    var l = r(s), d = !l && t(s), h = !l && !d && n(s), m = !l && !d && !h && a(s), v = l || d || h || m, p = v ? e(s.length, String) : [], g = p.length;
    for (var x in s)
      (f || u.call(s, x)) && !(v && // Safari 9 has enumerable `arguments.length` in strict mode.
      (x == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
      h && (x == "offset" || x == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
      m && (x == "buffer" || x == "byteLength" || x == "byteOffset") || // Skip index properties.
      i(x, g))) && p.push(x);
    return p;
  }
  return Ec = c, Ec;
}
var Tc, Av;
function IA() {
  if (Av) return Tc;
  Av = 1;
  var e = Object.prototype;
  function t(r) {
    var n = r && r.constructor, i = typeof n == "function" && n.prototype || e;
    return r === i;
  }
  return Tc = t, Tc;
}
var jc, Sv;
function cx() {
  if (Sv) return jc;
  Sv = 1;
  function e(t, r) {
    return function(n) {
      return t(r(n));
    };
  }
  return jc = e, jc;
}
var $c, Pv;
function RA() {
  if (Pv) return $c;
  Pv = 1;
  var e = cx(), t = e(Object.keys, Object);
  return $c = t, $c;
}
var Cc, Ev;
function kA() {
  if (Ev) return Cc;
  Ev = 1;
  var e = IA(), t = RA(), r = Object.prototype, n = r.hasOwnProperty;
  function i(a) {
    if (!e(a))
      return t(a);
    var o = [];
    for (var u in Object(a))
      n.call(a, u) && u != "constructor" && o.push(u);
    return o;
  }
  return Cc = i, Cc;
}
var Mc, Tv;
function wi() {
  if (Tv) return Mc;
  Tv = 1;
  var e = fd(), t = Ed();
  function r(n) {
    return n != null && t(n.length) && !e(n);
  }
  return Mc = r, Mc;
}
var Ic, jv;
function oo() {
  if (jv) return Ic;
  jv = 1;
  var e = MA(), t = kA(), r = wi();
  function n(i) {
    return r(i) ? e(i) : t(i);
  }
  return Ic = n, Ic;
}
var Rc, $v;
function DA() {
  if ($v) return Rc;
  $v = 1;
  var e = _A(), t = PA(), r = oo();
  function n(i) {
    return e(i, r, t);
  }
  return Rc = n, Rc;
}
var kc, Cv;
function NA() {
  if (Cv) return kc;
  Cv = 1;
  var e = DA(), t = 1, r = Object.prototype, n = r.hasOwnProperty;
  function i(a, o, u, c, s, f) {
    var l = u & t, d = e(a), h = d.length, m = e(o), v = m.length;
    if (h != v && !l)
      return !1;
    for (var p = h; p--; ) {
      var g = d[p];
      if (!(l ? g in o : n.call(o, g)))
        return !1;
    }
    var x = f.get(a), w = f.get(o);
    if (x && w)
      return x == o && w == a;
    var O = !0;
    f.set(a, o), f.set(o, a);
    for (var y = l; ++p < h; ) {
      g = d[p];
      var b = a[g], _ = o[g];
      if (c)
        var A = l ? c(_, b, g, o, a, f) : c(b, _, g, a, o, f);
      if (!(A === void 0 ? b === _ || s(b, _, u, c, f) : A)) {
        O = !1;
        break;
      }
      y || (y = g == "constructor");
    }
    if (O && !y) {
      var E = a.constructor, C = o.constructor;
      E != C && "constructor" in a && "constructor" in o && !(typeof E == "function" && E instanceof E && typeof C == "function" && C instanceof C) && (O = !1);
    }
    return f.delete(a), f.delete(o), O;
  }
  return kc = i, kc;
}
var Dc, Mv;
function qA() {
  if (Mv) return Dc;
  Mv = 1;
  var e = xr(), t = wt(), r = e(t, "DataView");
  return Dc = r, Dc;
}
var Nc, Iv;
function LA() {
  if (Iv) return Nc;
  Iv = 1;
  var e = xr(), t = wt(), r = e(t, "Promise");
  return Nc = r, Nc;
}
var qc, Rv;
function sx() {
  if (Rv) return qc;
  Rv = 1;
  var e = xr(), t = wt(), r = e(t, "Set");
  return qc = r, qc;
}
var Lc, kv;
function BA() {
  if (kv) return Lc;
  kv = 1;
  var e = xr(), t = wt(), r = e(t, "WeakMap");
  return Lc = r, Lc;
}
var Bc, Dv;
function FA() {
  if (Dv) return Bc;
  Dv = 1;
  var e = qA(), t = pd(), r = LA(), n = sx(), i = BA(), a = Rt(), o = P0(), u = "[object Map]", c = "[object Object]", s = "[object Promise]", f = "[object Set]", l = "[object WeakMap]", d = "[object DataView]", h = o(e), m = o(t), v = o(r), p = o(n), g = o(i), x = a;
  return (e && x(new e(new ArrayBuffer(1))) != d || t && x(new t()) != u || r && x(r.resolve()) != s || n && x(new n()) != f || i && x(new i()) != l) && (x = function(w) {
    var O = a(w), y = O == c ? w.constructor : void 0, b = y ? o(y) : "";
    if (b)
      switch (b) {
        case h:
          return d;
        case m:
          return u;
        case v:
          return s;
        case p:
          return f;
        case g:
          return l;
      }
    return O;
  }), Bc = x, Bc;
}
var Fc, Nv;
function zA() {
  if (Nv) return Fc;
  Nv = 1;
  var e = Q0(), t = nx(), r = OA(), n = NA(), i = FA(), a = He(), o = ax(), u = ux(), c = 1, s = "[object Arguments]", f = "[object Array]", l = "[object Object]", d = Object.prototype, h = d.hasOwnProperty;
  function m(v, p, g, x, w, O) {
    var y = a(v), b = a(p), _ = y ? f : i(v), A = b ? f : i(p);
    _ = _ == s ? l : _, A = A == s ? l : A;
    var E = _ == l, C = A == l, P = _ == A;
    if (P && o(v)) {
      if (!o(p))
        return !1;
      y = !0, E = !1;
    }
    if (P && !E)
      return O || (O = new e()), y || u(v) ? t(v, p, g, x, w, O) : r(v, p, _, g, x, w, O);
    if (!(g & c)) {
      var T = E && h.call(v, "__wrapped__"), $ = C && h.call(p, "__wrapped__");
      if (T || $) {
        var R = T ? v.value() : v, I = $ ? p.value() : p;
        return O || (O = new e()), w(R, I, g, x, O);
      }
    }
    return P ? (O || (O = new e()), n(v, p, g, x, w, O)) : !1;
  }
  return Fc = m, Fc;
}
var zc, qv;
function Td() {
  if (qv) return zc;
  qv = 1;
  var e = zA(), t = kt();
  function r(n, i, a, o, u) {
    return n === i ? !0 : n == null || i == null || !t(n) && !t(i) ? n !== n && i !== i : e(n, i, a, o, r, u);
  }
  return zc = r, zc;
}
var Wc, Lv;
function WA() {
  if (Lv) return Wc;
  Lv = 1;
  var e = Q0(), t = Td(), r = 1, n = 2;
  function i(a, o, u, c) {
    var s = u.length, f = s, l = !c;
    if (a == null)
      return !f;
    for (a = Object(a); s--; ) {
      var d = u[s];
      if (l && d[2] ? d[1] !== a[d[0]] : !(d[0] in a))
        return !1;
    }
    for (; ++s < f; ) {
      d = u[s];
      var h = d[0], m = a[h], v = d[1];
      if (l && d[2]) {
        if (m === void 0 && !(h in a))
          return !1;
      } else {
        var p = new e();
        if (c)
          var g = c(m, v, h, a, o, p);
        if (!(g === void 0 ? t(v, m, r | n, c, p) : g))
          return !1;
      }
    }
    return !0;
  }
  return Wc = i, Wc;
}
var Uc, Bv;
function lx() {
  if (Bv) return Uc;
  Bv = 1;
  var e = Gt();
  function t(r) {
    return r === r && !e(r);
  }
  return Uc = t, Uc;
}
var Kc, Fv;
function UA() {
  if (Fv) return Kc;
  Fv = 1;
  var e = lx(), t = oo();
  function r(n) {
    for (var i = t(n), a = i.length; a--; ) {
      var o = i[a], u = n[o];
      i[a] = [o, u, e(u)];
    }
    return i;
  }
  return Kc = r, Kc;
}
var Hc, zv;
function fx() {
  if (zv) return Hc;
  zv = 1;
  function e(t, r) {
    return function(n) {
      return n == null ? !1 : n[t] === r && (r !== void 0 || t in Object(n));
    };
  }
  return Hc = e, Hc;
}
var Gc, Wv;
function KA() {
  if (Wv) return Gc;
  Wv = 1;
  var e = WA(), t = UA(), r = fx();
  function n(i) {
    var a = t(i);
    return a.length == 1 && a[0][2] ? r(a[0][0], a[0][1]) : function(o) {
      return o === i || e(o, i, a);
    };
  }
  return Gc = n, Gc;
}
var Vc, Uv;
function HA() {
  if (Uv) return Vc;
  Uv = 1;
  function e(t, r) {
    return t != null && r in Object(t);
  }
  return Vc = e, Vc;
}
var Yc, Kv;
function GA() {
  if (Kv) return Yc;
  Kv = 1;
  var e = j0(), t = Sd(), r = He(), n = Pd(), i = Ed(), a = to();
  function o(u, c, s) {
    c = e(c, u);
    for (var f = -1, l = c.length, d = !1; ++f < l; ) {
      var h = a(c[f]);
      if (!(d = u != null && s(u, h)))
        break;
      u = u[h];
    }
    return d || ++f != l ? d : (l = u == null ? 0 : u.length, !!l && i(l) && n(h, l) && (r(u) || t(u)));
  }
  return Yc = o, Yc;
}
var Xc, Hv;
function VA() {
  if (Hv) return Xc;
  Hv = 1;
  var e = HA(), t = GA();
  function r(n, i) {
    return n != null && t(n, i, e);
  }
  return Xc = r, Xc;
}
var Zc, Gv;
function YA() {
  if (Gv) return Zc;
  Gv = 1;
  var e = Td(), t = $0(), r = VA(), n = ld(), i = lx(), a = fx(), o = to(), u = 1, c = 2;
  function s(f, l) {
    return n(f) && i(l) ? a(o(f), l) : function(d) {
      var h = t(d, f);
      return h === void 0 && h === l ? r(d, f) : e(l, h, u | c);
    };
  }
  return Zc = s, Zc;
}
var Jc, Vv;
function yn() {
  if (Vv) return Jc;
  Vv = 1;
  function e(t) {
    return t;
  }
  return Jc = e, Jc;
}
var Qc, Yv;
function XA() {
  if (Yv) return Qc;
  Yv = 1;
  function e(t) {
    return function(r) {
      return r == null ? void 0 : r[t];
    };
  }
  return Qc = e, Qc;
}
var es, Xv;
function ZA() {
  if (Xv) return es;
  Xv = 1;
  var e = yd();
  function t(r) {
    return function(n) {
      return e(n, r);
    };
  }
  return es = t, es;
}
var ts, Zv;
function JA() {
  if (Zv) return ts;
  Zv = 1;
  var e = XA(), t = ZA(), r = ld(), n = to();
  function i(a) {
    return r(a) ? e(n(a)) : t(a);
  }
  return ts = i, ts;
}
var rs, Jv;
function Ot() {
  if (Jv) return rs;
  Jv = 1;
  var e = KA(), t = YA(), r = yn(), n = He(), i = JA();
  function a(o) {
    return typeof o == "function" ? o : o == null ? r : typeof o == "object" ? n(o) ? t(o[0], o[1]) : e(o) : i(o);
  }
  return rs = a, rs;
}
var ns, Qv;
function dx() {
  if (Qv) return ns;
  Qv = 1;
  function e(t, r, n, i) {
    for (var a = t.length, o = n + (i ? 1 : -1); i ? o-- : ++o < a; )
      if (r(t[o], o, t))
        return o;
    return -1;
  }
  return ns = e, ns;
}
var is, ey;
function QA() {
  if (ey) return is;
  ey = 1;
  function e(t) {
    return t !== t;
  }
  return is = e, is;
}
var as, ty;
function eS() {
  if (ty) return as;
  ty = 1;
  function e(t, r, n) {
    for (var i = n - 1, a = t.length; ++i < a; )
      if (t[i] === r)
        return i;
    return -1;
  }
  return as = e, as;
}
var os, ry;
function tS() {
  if (ry) return os;
  ry = 1;
  var e = dx(), t = QA(), r = eS();
  function n(i, a, o) {
    return a === a ? r(i, a, o) : e(i, t, o);
  }
  return os = n, os;
}
var us, ny;
function rS() {
  if (ny) return us;
  ny = 1;
  var e = tS();
  function t(r, n) {
    var i = r == null ? 0 : r.length;
    return !!i && e(r, n, 0) > -1;
  }
  return us = t, us;
}
var cs, iy;
function nS() {
  if (iy) return cs;
  iy = 1;
  function e(t, r, n) {
    for (var i = -1, a = t == null ? 0 : t.length; ++i < a; )
      if (n(r, t[i]))
        return !0;
    return !1;
  }
  return cs = e, cs;
}
var ss, ay;
function iS() {
  if (ay) return ss;
  ay = 1;
  function e() {
  }
  return ss = e, ss;
}
var ls, oy;
function aS() {
  if (oy) return ls;
  oy = 1;
  var e = sx(), t = iS(), r = Ad(), n = 1 / 0, i = e && 1 / r(new e([, -0]))[1] == n ? function(a) {
    return new e(a);
  } : t;
  return ls = i, ls;
}
var fs, uy;
function oS() {
  if (uy) return fs;
  uy = 1;
  var e = ex(), t = rS(), r = nS(), n = rx(), i = aS(), a = Ad(), o = 200;
  function u(c, s, f) {
    var l = -1, d = t, h = c.length, m = !0, v = [], p = v;
    if (f)
      m = !1, d = r;
    else if (h >= o) {
      var g = s ? null : i(c);
      if (g)
        return a(g);
      m = !1, d = n, p = new e();
    } else
      p = s ? [] : v;
    e:
      for (; ++l < h; ) {
        var x = c[l], w = s ? s(x) : x;
        if (x = f || x !== 0 ? x : 0, m && w === w) {
          for (var O = p.length; O--; )
            if (p[O] === w)
              continue e;
          s && p.push(w), v.push(x);
        } else d(p, w, f) || (p !== v && p.push(w), v.push(x));
      }
    return v;
  }
  return fs = u, fs;
}
var ds, cy;
function uS() {
  if (cy) return ds;
  cy = 1;
  var e = Ot(), t = oS();
  function r(n, i) {
    return n && n.length ? t(n, e(i, 2)) : [];
  }
  return ds = r, ds;
}
var cS = uS();
const sy = /* @__PURE__ */ ye(cS);
function px(e, t, r) {
  return t === !0 ? sy(e, r) : te(t) ? sy(e, t) : e;
}
function Fr(e) {
  "@babel/helpers - typeof";
  return Fr = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Fr(e);
}
var sS = ["ref"];
function ly(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function At(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? ly(Object(r), !0).forEach(function(n) {
      uo(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : ly(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function lS(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function fy(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, vx(n.key), n);
  }
}
function fS(e, t, r) {
  return t && fy(e.prototype, t), r && fy(e, r), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function dS(e, t, r) {
  return t = ia(t), pS(e, hx() ? Reflect.construct(t, r || [], ia(e).constructor) : t.apply(e, r));
}
function pS(e, t) {
  if (t && (Fr(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return hS(e);
}
function hS(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function hx() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (hx = function() {
    return !!e;
  })();
}
function ia(e) {
  return ia = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, ia(e);
}
function vS(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && ef(e, t);
}
function ef(e, t) {
  return ef = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n;
  }, ef(e, t);
}
function uo(e, t, r) {
  return t = vx(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function vx(e) {
  var t = yS(e, "string");
  return Fr(t) == "symbol" ? t : t + "";
}
function yS(e, t) {
  if (Fr(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Fr(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
function mS(e, t) {
  if (e == null) return {};
  var r = gS(e, t), n, i;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (i = 0; i < a.length; i++)
      n = a[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function gS(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
function bS(e) {
  return e.value;
}
function xS(e, t) {
  if (/* @__PURE__ */ S.isValidElement(e))
    return /* @__PURE__ */ S.cloneElement(e, t);
  if (typeof e == "function")
    return /* @__PURE__ */ S.createElement(e, t);
  t.ref;
  var r = mS(t, sS);
  return /* @__PURE__ */ S.createElement(_d, r);
}
var dy = 1, ht = /* @__PURE__ */ (function(e) {
  function t() {
    var r;
    lS(this, t);
    for (var n = arguments.length, i = new Array(n), a = 0; a < n; a++)
      i[a] = arguments[a];
    return r = dS(this, t, [].concat(i)), uo(r, "lastBoundingBox", {
      width: -1,
      height: -1
    }), r;
  }
  return vS(t, e), fS(t, [{
    key: "componentDidMount",
    value: function() {
      this.updateBBox();
    }
  }, {
    key: "componentDidUpdate",
    value: function() {
      this.updateBBox();
    }
  }, {
    key: "getBBox",
    value: function() {
      if (this.wrapperNode && this.wrapperNode.getBoundingClientRect) {
        var n = this.wrapperNode.getBoundingClientRect();
        return n.height = this.wrapperNode.offsetHeight, n.width = this.wrapperNode.offsetWidth, n;
      }
      return null;
    }
  }, {
    key: "updateBBox",
    value: function() {
      var n = this.props.onBBoxUpdate, i = this.getBBox();
      i ? (Math.abs(i.width - this.lastBoundingBox.width) > dy || Math.abs(i.height - this.lastBoundingBox.height) > dy) && (this.lastBoundingBox.width = i.width, this.lastBoundingBox.height = i.height, n && n(i)) : (this.lastBoundingBox.width !== -1 || this.lastBoundingBox.height !== -1) && (this.lastBoundingBox.width = -1, this.lastBoundingBox.height = -1, n && n(null));
    }
  }, {
    key: "getBBoxSnapshot",
    value: function() {
      return this.lastBoundingBox.width >= 0 && this.lastBoundingBox.height >= 0 ? At({}, this.lastBoundingBox) : {
        width: 0,
        height: 0
      };
    }
  }, {
    key: "getDefaultPosition",
    value: function(n) {
      var i = this.props, a = i.layout, o = i.align, u = i.verticalAlign, c = i.margin, s = i.chartWidth, f = i.chartHeight, l, d;
      if (!n || (n.left === void 0 || n.left === null) && (n.right === void 0 || n.right === null))
        if (o === "center" && a === "vertical") {
          var h = this.getBBoxSnapshot();
          l = {
            left: ((s || 0) - h.width) / 2
          };
        } else
          l = o === "right" ? {
            right: c && c.right || 0
          } : {
            left: c && c.left || 0
          };
      if (!n || (n.top === void 0 || n.top === null) && (n.bottom === void 0 || n.bottom === null))
        if (u === "middle") {
          var m = this.getBBoxSnapshot();
          d = {
            top: ((f || 0) - m.height) / 2
          };
        } else
          d = u === "bottom" ? {
            bottom: c && c.bottom || 0
          } : {
            top: c && c.top || 0
          };
      return At(At({}, l), d);
    }
  }, {
    key: "render",
    value: function() {
      var n = this, i = this.props, a = i.content, o = i.width, u = i.height, c = i.wrapperStyle, s = i.payloadUniqBy, f = i.payload, l = At(At({
        position: "absolute",
        width: o || "auto",
        height: u || "auto"
      }, this.getDefaultPosition(c)), c);
      return /* @__PURE__ */ S.createElement("div", {
        className: "recharts-legend-wrapper",
        style: l,
        ref: function(h) {
          n.wrapperNode = h;
        }
      }, xS(a, At(At({}, this.props), {}, {
        payload: px(f, s, bS)
      })));
    }
  }], [{
    key: "getWithHeight",
    value: function(n, i) {
      var a = At(At({}, this.defaultProps), n.props), o = a.layout;
      return o === "vertical" && z(n.props.height) ? {
        height: n.props.height
      } : o === "horizontal" ? {
        width: n.props.width || i
      } : null;
    }
  }]);
})(F.PureComponent);
uo(ht, "displayName", "Legend");
uo(ht, "defaultProps", {
  iconSize: 14,
  layout: "horizontal",
  align: "center",
  verticalAlign: "bottom"
});
var ps, py;
function wS() {
  if (py) return ps;
  py = 1;
  var e = xi(), t = Sd(), r = He(), n = e ? e.isConcatSpreadable : void 0;
  function i(a) {
    return r(a) || t(a) || !!(n && a && a[n]);
  }
  return ps = i, ps;
}
var hs, hy;
function yx() {
  if (hy) return hs;
  hy = 1;
  var e = ix(), t = wS();
  function r(n, i, a, o, u) {
    var c = -1, s = n.length;
    for (a || (a = t), u || (u = []); ++c < s; ) {
      var f = n[c];
      i > 0 && a(f) ? i > 1 ? r(f, i - 1, a, o, u) : e(u, f) : o || (u[u.length] = f);
    }
    return u;
  }
  return hs = r, hs;
}
var vs, vy;
function OS() {
  if (vy) return vs;
  vy = 1;
  function e(t) {
    return function(r, n, i) {
      for (var a = -1, o = Object(r), u = i(r), c = u.length; c--; ) {
        var s = u[t ? c : ++a];
        if (n(o[s], s, o) === !1)
          break;
      }
      return r;
    };
  }
  return vs = e, vs;
}
var ys, yy;
function _S() {
  if (yy) return ys;
  yy = 1;
  var e = OS(), t = e();
  return ys = t, ys;
}
var ms, my;
function mx() {
  if (my) return ms;
  my = 1;
  var e = _S(), t = oo();
  function r(n, i) {
    return n && e(n, i, t);
  }
  return ms = r, ms;
}
var gs, gy;
function AS() {
  if (gy) return gs;
  gy = 1;
  var e = wi();
  function t(r, n) {
    return function(i, a) {
      if (i == null)
        return i;
      if (!e(i))
        return r(i, a);
      for (var o = i.length, u = n ? o : -1, c = Object(i); (n ? u-- : ++u < o) && a(c[u], u, c) !== !1; )
        ;
      return i;
    };
  }
  return gs = t, gs;
}
var bs, by;
function jd() {
  if (by) return bs;
  by = 1;
  var e = mx(), t = AS(), r = t(e);
  return bs = r, bs;
}
var xs, xy;
function gx() {
  if (xy) return xs;
  xy = 1;
  var e = jd(), t = wi();
  function r(n, i) {
    var a = -1, o = t(n) ? Array(n.length) : [];
    return e(n, function(u, c, s) {
      o[++a] = i(u, c, s);
    }), o;
  }
  return xs = r, xs;
}
var ws, wy;
function SS() {
  if (wy) return ws;
  wy = 1;
  function e(t, r) {
    var n = t.length;
    for (t.sort(r); n--; )
      t[n] = t[n].value;
    return t;
  }
  return ws = e, ws;
}
var Os, Oy;
function PS() {
  if (Oy) return Os;
  Oy = 1;
  var e = pn();
  function t(r, n) {
    if (r !== n) {
      var i = r !== void 0, a = r === null, o = r === r, u = e(r), c = n !== void 0, s = n === null, f = n === n, l = e(n);
      if (!s && !l && !u && r > n || u && c && f && !s && !l || a && c && f || !i && f || !o)
        return 1;
      if (!a && !u && !l && r < n || l && i && o && !a && !u || s && i && o || !c && o || !f)
        return -1;
    }
    return 0;
  }
  return Os = t, Os;
}
var _s, _y;
function ES() {
  if (_y) return _s;
  _y = 1;
  var e = PS();
  function t(r, n, i) {
    for (var a = -1, o = r.criteria, u = n.criteria, c = o.length, s = i.length; ++a < c; ) {
      var f = e(o[a], u[a]);
      if (f) {
        if (a >= s)
          return f;
        var l = i[a];
        return f * (l == "desc" ? -1 : 1);
      }
    }
    return r.index - n.index;
  }
  return _s = t, _s;
}
var As, Ay;
function TS() {
  if (Ay) return As;
  Ay = 1;
  var e = vd(), t = yd(), r = Ot(), n = gx(), i = SS(), a = ox(), o = ES(), u = yn(), c = He();
  function s(f, l, d) {
    l.length ? l = e(l, function(v) {
      return c(v) ? function(p) {
        return t(p, v.length === 1 ? v[0] : v);
      } : v;
    }) : l = [u];
    var h = -1;
    l = e(l, a(r));
    var m = n(f, function(v, p, g) {
      var x = e(l, function(w) {
        return w(v);
      });
      return { criteria: x, index: ++h, value: v };
    });
    return i(m, function(v, p) {
      return o(v, p, d);
    });
  }
  return As = s, As;
}
var Ss, Sy;
function jS() {
  if (Sy) return Ss;
  Sy = 1;
  function e(t, r, n) {
    switch (n.length) {
      case 0:
        return t.call(r);
      case 1:
        return t.call(r, n[0]);
      case 2:
        return t.call(r, n[0], n[1]);
      case 3:
        return t.call(r, n[0], n[1], n[2]);
    }
    return t.apply(r, n);
  }
  return Ss = e, Ss;
}
var Ps, Py;
function $S() {
  if (Py) return Ps;
  Py = 1;
  var e = jS(), t = Math.max;
  function r(n, i, a) {
    return i = t(i === void 0 ? n.length - 1 : i, 0), function() {
      for (var o = arguments, u = -1, c = t(o.length - i, 0), s = Array(c); ++u < c; )
        s[u] = o[i + u];
      u = -1;
      for (var f = Array(i + 1); ++u < i; )
        f[u] = o[u];
      return f[i] = a(s), e(n, this, f);
    };
  }
  return Ps = r, Ps;
}
var Es, Ey;
function CS() {
  if (Ey) return Es;
  Ey = 1;
  function e(t) {
    return function() {
      return t;
    };
  }
  return Es = e, Es;
}
var Ts, Ty;
function bx() {
  if (Ty) return Ts;
  Ty = 1;
  var e = xr(), t = (function() {
    try {
      var r = e(Object, "defineProperty");
      return r({}, "", {}), r;
    } catch {
    }
  })();
  return Ts = t, Ts;
}
var js, jy;
function MS() {
  if (jy) return js;
  jy = 1;
  var e = CS(), t = bx(), r = yn(), n = t ? function(i, a) {
    return t(i, "toString", {
      configurable: !0,
      enumerable: !1,
      value: e(a),
      writable: !0
    });
  } : r;
  return js = n, js;
}
var $s, $y;
function IS() {
  if ($y) return $s;
  $y = 1;
  var e = 800, t = 16, r = Date.now;
  function n(i) {
    var a = 0, o = 0;
    return function() {
      var u = r(), c = t - (u - o);
      if (o = u, c > 0) {
        if (++a >= e)
          return arguments[0];
      } else
        a = 0;
      return i.apply(void 0, arguments);
    };
  }
  return $s = n, $s;
}
var Cs, Cy;
function RS() {
  if (Cy) return Cs;
  Cy = 1;
  var e = MS(), t = IS(), r = t(e);
  return Cs = r, Cs;
}
var Ms, My;
function kS() {
  if (My) return Ms;
  My = 1;
  var e = yn(), t = $S(), r = RS();
  function n(i, a) {
    return r(t(i, a, e), i + "");
  }
  return Ms = n, Ms;
}
var Is, Iy;
function co() {
  if (Iy) return Is;
  Iy = 1;
  var e = dd(), t = wi(), r = Pd(), n = Gt();
  function i(a, o, u) {
    if (!n(u))
      return !1;
    var c = typeof o;
    return (c == "number" ? t(u) && r(o, u.length) : c == "string" && o in u) ? e(u[o], a) : !1;
  }
  return Is = i, Is;
}
var Rs, Ry;
function DS() {
  if (Ry) return Rs;
  Ry = 1;
  var e = yx(), t = TS(), r = kS(), n = co(), i = r(function(a, o) {
    if (a == null)
      return [];
    var u = o.length;
    return u > 1 && n(a, o[0], o[1]) ? o = [] : u > 2 && n(o[0], o[1], o[2]) && (o = [o[0]]), t(a, e(o, 1), []);
  });
  return Rs = i, Rs;
}
var NS = DS();
const $d = /* @__PURE__ */ ye(NS);
function zn(e) {
  "@babel/helpers - typeof";
  return zn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, zn(e);
}
function tf() {
  return tf = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, tf.apply(this, arguments);
}
function qS(e, t) {
  return zS(e) || FS(e, t) || BS(e, t) || LS();
}
function LS() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function BS(e, t) {
  if (e) {
    if (typeof e == "string") return ky(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return ky(e, t);
  }
}
function ky(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function FS(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, i, a, o, u = [], c = !0, s = !1;
    try {
      if (a = (r = r.call(e)).next, t !== 0) for (; !(c = (n = a.call(r)).done) && (u.push(n.value), u.length !== t); c = !0) ;
    } catch (f) {
      s = !0, i = f;
    } finally {
      try {
        if (!c && r.return != null && (o = r.return(), Object(o) !== o)) return;
      } finally {
        if (s) throw i;
      }
    }
    return u;
  }
}
function zS(e) {
  if (Array.isArray(e)) return e;
}
function Dy(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function ks(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Dy(Object(r), !0).forEach(function(n) {
      WS(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Dy(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function WS(e, t, r) {
  return t = US(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function US(e) {
  var t = KS(e, "string");
  return zn(t) == "symbol" ? t : t + "";
}
function KS(e, t) {
  if (zn(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (zn(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function HS(e) {
  return Array.isArray(e) && Me(e[0]) && Me(e[1]) ? e.join(" ~ ") : e;
}
var GS = function(t) {
  var r = t.separator, n = r === void 0 ? " : " : r, i = t.contentStyle, a = i === void 0 ? {} : i, o = t.itemStyle, u = o === void 0 ? {} : o, c = t.labelStyle, s = c === void 0 ? {} : c, f = t.payload, l = t.formatter, d = t.itemSorter, h = t.wrapperClassName, m = t.labelClassName, v = t.label, p = t.labelFormatter, g = t.accessibilityLayer, x = g === void 0 ? !1 : g, w = function() {
    if (f && f.length) {
      var T = {
        padding: 0,
        margin: 0
      }, $ = (d ? $d(f, d) : f).map(function(R, I) {
        if (R.type === "none")
          return null;
        var k = ks({
          display: "block",
          paddingTop: 4,
          paddingBottom: 4,
          color: R.color || "#000"
        }, u), q = R.formatter || l || HS, W = R.value, K = R.name, M = W, N = K;
        if (q && M != null && N != null) {
          var L = q(W, K, R, I, f);
          if (Array.isArray(L)) {
            var H = qS(L, 2);
            M = H[0], N = H[1];
          } else
            M = L;
        }
        return (
          // eslint-disable-next-line react/no-array-index-key
          /* @__PURE__ */ S.createElement("li", {
            className: "recharts-tooltip-item",
            key: "tooltip-item-".concat(I),
            style: k
          }, Me(N) ? /* @__PURE__ */ S.createElement("span", {
            className: "recharts-tooltip-item-name"
          }, N) : null, Me(N) ? /* @__PURE__ */ S.createElement("span", {
            className: "recharts-tooltip-item-separator"
          }, n) : null, /* @__PURE__ */ S.createElement("span", {
            className: "recharts-tooltip-item-value"
          }, M), /* @__PURE__ */ S.createElement("span", {
            className: "recharts-tooltip-item-unit"
          }, R.unit || ""))
        );
      });
      return /* @__PURE__ */ S.createElement("ul", {
        className: "recharts-tooltip-item-list",
        style: T
      }, $);
    }
    return null;
  }, O = ks({
    margin: 0,
    padding: 10,
    backgroundColor: "#fff",
    border: "1px solid #ccc",
    whiteSpace: "nowrap"
  }, a), y = ks({
    margin: 0
  }, s), b = !ie(v), _ = b ? v : "", A = ae("recharts-default-tooltip", h), E = ae("recharts-tooltip-label", m);
  b && p && f !== void 0 && f !== null && (_ = p(v, f));
  var C = x ? {
    role: "status",
    "aria-live": "assertive"
  } : {};
  return /* @__PURE__ */ S.createElement("div", tf({
    className: A,
    style: O
  }, C), /* @__PURE__ */ S.createElement("p", {
    className: E,
    style: y
  }, /* @__PURE__ */ S.isValidElement(_) ? _ : "".concat(_)), w());
};
function Wn(e) {
  "@babel/helpers - typeof";
  return Wn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Wn(e);
}
function Ii(e, t, r) {
  return t = VS(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function VS(e) {
  var t = YS(e, "string");
  return Wn(t) == "symbol" ? t : t + "";
}
function YS(e, t) {
  if (Wn(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Wn(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var wn = "recharts-tooltip-wrapper", XS = {
  visibility: "hidden"
};
function ZS(e) {
  var t = e.coordinate, r = e.translateX, n = e.translateY;
  return ae(wn, Ii(Ii(Ii(Ii({}, "".concat(wn, "-right"), z(r) && t && z(t.x) && r >= t.x), "".concat(wn, "-left"), z(r) && t && z(t.x) && r < t.x), "".concat(wn, "-bottom"), z(n) && t && z(t.y) && n >= t.y), "".concat(wn, "-top"), z(n) && t && z(t.y) && n < t.y));
}
function Ny(e) {
  var t = e.allowEscapeViewBox, r = e.coordinate, n = e.key, i = e.offsetTopLeft, a = e.position, o = e.reverseDirection, u = e.tooltipDimension, c = e.viewBox, s = e.viewBoxDimension;
  if (a && z(a[n]))
    return a[n];
  var f = r[n] - u - i, l = r[n] + i;
  if (t[n])
    return o[n] ? f : l;
  if (o[n]) {
    var d = f, h = c[n];
    return d < h ? Math.max(l, c[n]) : Math.max(f, c[n]);
  }
  var m = l + u, v = c[n] + s;
  return m > v ? Math.max(f, c[n]) : Math.max(l, c[n]);
}
function JS(e) {
  var t = e.translateX, r = e.translateY, n = e.useTranslate3d;
  return {
    transform: n ? "translate3d(".concat(t, "px, ").concat(r, "px, 0)") : "translate(".concat(t, "px, ").concat(r, "px)")
  };
}
function QS(e) {
  var t = e.allowEscapeViewBox, r = e.coordinate, n = e.offsetTopLeft, i = e.position, a = e.reverseDirection, o = e.tooltipBox, u = e.useTranslate3d, c = e.viewBox, s, f, l;
  return o.height > 0 && o.width > 0 && r ? (f = Ny({
    allowEscapeViewBox: t,
    coordinate: r,
    key: "x",
    offsetTopLeft: n,
    position: i,
    reverseDirection: a,
    tooltipDimension: o.width,
    viewBox: c,
    viewBoxDimension: c.width
  }), l = Ny({
    allowEscapeViewBox: t,
    coordinate: r,
    key: "y",
    offsetTopLeft: n,
    position: i,
    reverseDirection: a,
    tooltipDimension: o.height,
    viewBox: c,
    viewBoxDimension: c.height
  }), s = JS({
    translateX: f,
    translateY: l,
    useTranslate3d: u
  })) : s = XS, {
    cssProperties: s,
    cssClasses: ZS({
      translateX: f,
      translateY: l,
      coordinate: r
    })
  };
}
function zr(e) {
  "@babel/helpers - typeof";
  return zr = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, zr(e);
}
function qy(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Ly(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? qy(Object(r), !0).forEach(function(n) {
      nf(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : qy(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function eP(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function tP(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, wx(n.key), n);
  }
}
function rP(e, t, r) {
  return t && tP(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function nP(e, t, r) {
  return t = aa(t), iP(e, xx() ? Reflect.construct(t, r || [], aa(e).constructor) : t.apply(e, r));
}
function iP(e, t) {
  if (t && (zr(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return aP(e);
}
function aP(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function xx() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (xx = function() {
    return !!e;
  })();
}
function aa(e) {
  return aa = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, aa(e);
}
function oP(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && rf(e, t);
}
function rf(e, t) {
  return rf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n;
  }, rf(e, t);
}
function nf(e, t, r) {
  return t = wx(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function wx(e) {
  var t = uP(e, "string");
  return zr(t) == "symbol" ? t : t + "";
}
function uP(e, t) {
  if (zr(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (zr(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var By = 1, cP = /* @__PURE__ */ (function(e) {
  function t() {
    var r;
    eP(this, t);
    for (var n = arguments.length, i = new Array(n), a = 0; a < n; a++)
      i[a] = arguments[a];
    return r = nP(this, t, [].concat(i)), nf(r, "state", {
      dismissed: !1,
      dismissedAtCoordinate: {
        x: 0,
        y: 0
      },
      lastBoundingBox: {
        width: -1,
        height: -1
      }
    }), nf(r, "handleKeyDown", function(o) {
      if (o.key === "Escape") {
        var u, c, s, f;
        r.setState({
          dismissed: !0,
          dismissedAtCoordinate: {
            x: (u = (c = r.props.coordinate) === null || c === void 0 ? void 0 : c.x) !== null && u !== void 0 ? u : 0,
            y: (s = (f = r.props.coordinate) === null || f === void 0 ? void 0 : f.y) !== null && s !== void 0 ? s : 0
          }
        });
      }
    }), r;
  }
  return oP(t, e), rP(t, [{
    key: "updateBBox",
    value: function() {
      if (this.wrapperNode && this.wrapperNode.getBoundingClientRect) {
        var n = this.wrapperNode.getBoundingClientRect();
        (Math.abs(n.width - this.state.lastBoundingBox.width) > By || Math.abs(n.height - this.state.lastBoundingBox.height) > By) && this.setState({
          lastBoundingBox: {
            width: n.width,
            height: n.height
          }
        });
      } else (this.state.lastBoundingBox.width !== -1 || this.state.lastBoundingBox.height !== -1) && this.setState({
        lastBoundingBox: {
          width: -1,
          height: -1
        }
      });
    }
  }, {
    key: "componentDidMount",
    value: function() {
      document.addEventListener("keydown", this.handleKeyDown), this.updateBBox();
    }
  }, {
    key: "componentWillUnmount",
    value: function() {
      document.removeEventListener("keydown", this.handleKeyDown);
    }
  }, {
    key: "componentDidUpdate",
    value: function() {
      var n, i;
      this.props.active && this.updateBBox(), this.state.dismissed && (((n = this.props.coordinate) === null || n === void 0 ? void 0 : n.x) !== this.state.dismissedAtCoordinate.x || ((i = this.props.coordinate) === null || i === void 0 ? void 0 : i.y) !== this.state.dismissedAtCoordinate.y) && (this.state.dismissed = !1);
    }
  }, {
    key: "render",
    value: function() {
      var n = this, i = this.props, a = i.active, o = i.allowEscapeViewBox, u = i.animationDuration, c = i.animationEasing, s = i.children, f = i.coordinate, l = i.hasPayload, d = i.isAnimationActive, h = i.offset, m = i.position, v = i.reverseDirection, p = i.useTranslate3d, g = i.viewBox, x = i.wrapperStyle, w = QS({
        allowEscapeViewBox: o,
        coordinate: f,
        offsetTopLeft: h,
        position: m,
        reverseDirection: v,
        tooltipBox: this.state.lastBoundingBox,
        useTranslate3d: p,
        viewBox: g
      }), O = w.cssClasses, y = w.cssProperties, b = Ly(Ly({
        transition: d && a ? "transform ".concat(u, "ms ").concat(c) : void 0
      }, y), {}, {
        pointerEvents: "none",
        visibility: !this.state.dismissed && a && l ? "visible" : "hidden",
        position: "absolute",
        top: 0,
        left: 0
      }, x);
      return (
        // This element allow listening to the `Escape` key.
        // See https://github.com/recharts/recharts/pull/2925
        /* @__PURE__ */ S.createElement("div", {
          tabIndex: -1,
          className: O,
          style: b,
          ref: function(A) {
            n.wrapperNode = A;
          }
        }, s)
      );
    }
  }]);
})(F.PureComponent), sP = function() {
  return !(typeof window < "u" && window.document && window.document.createElement && window.setTimeout);
}, Vt = {
  isSsr: sP()
};
function Wr(e) {
  "@babel/helpers - typeof";
  return Wr = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Wr(e);
}
function Fy(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function zy(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Fy(Object(r), !0).forEach(function(n) {
      Cd(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Fy(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function lP(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function fP(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, _x(n.key), n);
  }
}
function dP(e, t, r) {
  return t && fP(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function pP(e, t, r) {
  return t = oa(t), hP(e, Ox() ? Reflect.construct(t, r || [], oa(e).constructor) : t.apply(e, r));
}
function hP(e, t) {
  if (t && (Wr(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return vP(e);
}
function vP(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function Ox() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (Ox = function() {
    return !!e;
  })();
}
function oa(e) {
  return oa = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, oa(e);
}
function yP(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && af(e, t);
}
function af(e, t) {
  return af = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n;
  }, af(e, t);
}
function Cd(e, t, r) {
  return t = _x(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function _x(e) {
  var t = mP(e, "string");
  return Wr(t) == "symbol" ? t : t + "";
}
function mP(e, t) {
  if (Wr(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Wr(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
function gP(e) {
  return e.dataKey;
}
function bP(e, t) {
  return /* @__PURE__ */ S.isValidElement(e) ? /* @__PURE__ */ S.cloneElement(e, t) : typeof e == "function" ? /* @__PURE__ */ S.createElement(e, t) : /* @__PURE__ */ S.createElement(GS, t);
}
var Xe = /* @__PURE__ */ (function(e) {
  function t() {
    return lP(this, t), pP(this, t, arguments);
  }
  return yP(t, e), dP(t, [{
    key: "render",
    value: function() {
      var n = this, i = this.props, a = i.active, o = i.allowEscapeViewBox, u = i.animationDuration, c = i.animationEasing, s = i.content, f = i.coordinate, l = i.filterNull, d = i.isAnimationActive, h = i.offset, m = i.payload, v = i.payloadUniqBy, p = i.position, g = i.reverseDirection, x = i.useTranslate3d, w = i.viewBox, O = i.wrapperStyle, y = m ?? [];
      l && y.length && (y = px(m.filter(function(_) {
        return _.value != null && (_.hide !== !0 || n.props.includeHidden);
      }), v, gP));
      var b = y.length > 0;
      return /* @__PURE__ */ S.createElement(cP, {
        allowEscapeViewBox: o,
        animationDuration: u,
        animationEasing: c,
        isAnimationActive: d,
        active: a,
        coordinate: f,
        hasPayload: b,
        offset: h,
        position: p,
        reverseDirection: g,
        useTranslate3d: x,
        viewBox: w,
        wrapperStyle: O
      }, bP(s, zy(zy({}, this.props), {}, {
        payload: y
      })));
    }
  }]);
})(F.PureComponent);
Cd(Xe, "displayName", "Tooltip");
Cd(Xe, "defaultProps", {
  accessibilityLayer: !1,
  allowEscapeViewBox: {
    x: !1,
    y: !1
  },
  animationDuration: 400,
  animationEasing: "ease",
  contentStyle: {},
  coordinate: {
    x: 0,
    y: 0
  },
  cursor: !0,
  cursorStyle: {},
  filterNull: !0,
  isAnimationActive: !Vt.isSsr,
  itemStyle: {},
  labelStyle: {},
  offset: 10,
  reverseDirection: {
    x: !1,
    y: !1
  },
  separator: " : ",
  trigger: "hover",
  useTranslate3d: !1,
  viewBox: {
    x: 0,
    y: 0,
    height: 0,
    width: 0
  },
  wrapperStyle: {}
});
var Ds, Wy;
function xP() {
  if (Wy) return Ds;
  Wy = 1;
  var e = wt(), t = function() {
    return e.Date.now();
  };
  return Ds = t, Ds;
}
var Ns, Uy;
function wP() {
  if (Uy) return Ns;
  Uy = 1;
  var e = /\s/;
  function t(r) {
    for (var n = r.length; n-- && e.test(r.charAt(n)); )
      ;
    return n;
  }
  return Ns = t, Ns;
}
var qs, Ky;
function OP() {
  if (Ky) return qs;
  Ky = 1;
  var e = wP(), t = /^\s+/;
  function r(n) {
    return n && n.slice(0, e(n) + 1).replace(t, "");
  }
  return qs = r, qs;
}
var Ls, Hy;
function Ax() {
  if (Hy) return Ls;
  Hy = 1;
  var e = OP(), t = Gt(), r = pn(), n = NaN, i = /^[-+]0x[0-9a-f]+$/i, a = /^0b[01]+$/i, o = /^0o[0-7]+$/i, u = parseInt;
  function c(s) {
    if (typeof s == "number")
      return s;
    if (r(s))
      return n;
    if (t(s)) {
      var f = typeof s.valueOf == "function" ? s.valueOf() : s;
      s = t(f) ? f + "" : f;
    }
    if (typeof s != "string")
      return s === 0 ? s : +s;
    s = e(s);
    var l = a.test(s);
    return l || o.test(s) ? u(s.slice(2), l ? 2 : 8) : i.test(s) ? n : +s;
  }
  return Ls = c, Ls;
}
var Bs, Gy;
function _P() {
  if (Gy) return Bs;
  Gy = 1;
  var e = Gt(), t = xP(), r = Ax(), n = "Expected a function", i = Math.max, a = Math.min;
  function o(u, c, s) {
    var f, l, d, h, m, v, p = 0, g = !1, x = !1, w = !0;
    if (typeof u != "function")
      throw new TypeError(n);
    c = r(c) || 0, e(s) && (g = !!s.leading, x = "maxWait" in s, d = x ? i(r(s.maxWait) || 0, c) : d, w = "trailing" in s ? !!s.trailing : w);
    function O($) {
      var R = f, I = l;
      return f = l = void 0, p = $, h = u.apply(I, R), h;
    }
    function y($) {
      return p = $, m = setTimeout(A, c), g ? O($) : h;
    }
    function b($) {
      var R = $ - v, I = $ - p, k = c - R;
      return x ? a(k, d - I) : k;
    }
    function _($) {
      var R = $ - v, I = $ - p;
      return v === void 0 || R >= c || R < 0 || x && I >= d;
    }
    function A() {
      var $ = t();
      if (_($))
        return E($);
      m = setTimeout(A, b($));
    }
    function E($) {
      return m = void 0, w && f ? O($) : (f = l = void 0, h);
    }
    function C() {
      m !== void 0 && clearTimeout(m), p = 0, f = v = l = m = void 0;
    }
    function P() {
      return m === void 0 ? h : E(t());
    }
    function T() {
      var $ = t(), R = _($);
      if (f = arguments, l = this, v = $, R) {
        if (m === void 0)
          return y(v);
        if (x)
          return clearTimeout(m), m = setTimeout(A, c), O(v);
      }
      return m === void 0 && (m = setTimeout(A, c)), h;
    }
    return T.cancel = C, T.flush = P, T;
  }
  return Bs = o, Bs;
}
var Fs, Vy;
function AP() {
  if (Vy) return Fs;
  Vy = 1;
  var e = _P(), t = Gt(), r = "Expected a function";
  function n(i, a, o) {
    var u = !0, c = !0;
    if (typeof i != "function")
      throw new TypeError(r);
    return t(o) && (u = "leading" in o ? !!o.leading : u, c = "trailing" in o ? !!o.trailing : c), e(i, a, {
      leading: u,
      maxWait: a,
      trailing: c
    });
  }
  return Fs = n, Fs;
}
var SP = AP();
const Sx = /* @__PURE__ */ ye(SP);
function Un(e) {
  "@babel/helpers - typeof";
  return Un = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Un(e);
}
function Yy(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Ri(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Yy(Object(r), !0).forEach(function(n) {
      PP(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Yy(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function PP(e, t, r) {
  return t = EP(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function EP(e) {
  var t = TP(e, "string");
  return Un(t) == "symbol" ? t : t + "";
}
function TP(e, t) {
  if (Un(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Un(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function jP(e, t) {
  return IP(e) || MP(e, t) || CP(e, t) || $P();
}
function $P() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function CP(e, t) {
  if (e) {
    if (typeof e == "string") return Xy(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Xy(e, t);
  }
}
function Xy(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function MP(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, i, a, o, u = [], c = !0, s = !1;
    try {
      if (a = (r = r.call(e)).next, t !== 0) for (; !(c = (n = a.call(r)).done) && (u.push(n.value), u.length !== t); c = !0) ;
    } catch (f) {
      s = !0, i = f;
    } finally {
      try {
        if (!c && r.return != null && (o = r.return(), Object(o) !== o)) return;
      } finally {
        if (s) throw i;
      }
    }
    return u;
  }
}
function IP(e) {
  if (Array.isArray(e)) return e;
}
var ki = /* @__PURE__ */ F.forwardRef(function(e, t) {
  var r = e.aspect, n = e.initialDimension, i = n === void 0 ? {
    width: -1,
    height: -1
  } : n, a = e.width, o = a === void 0 ? "100%" : a, u = e.height, c = u === void 0 ? "100%" : u, s = e.minWidth, f = s === void 0 ? 0 : s, l = e.minHeight, d = e.maxHeight, h = e.children, m = e.debounce, v = m === void 0 ? 0 : m, p = e.id, g = e.className, x = e.onResize, w = e.style, O = w === void 0 ? {} : w, y = F.useRef(null), b = F.useRef();
  b.current = x, F.useImperativeHandle(t, function() {
    return Object.defineProperty(y.current, "current", {
      get: function() {
        return console.warn("The usage of ref.current.current is deprecated and will no longer be supported."), y.current;
      },
      configurable: !0
    });
  });
  var _ = F.useState({
    containerWidth: i.width,
    containerHeight: i.height
  }), A = jP(_, 2), E = A[0], C = A[1], P = F.useCallback(function($, R) {
    C(function(I) {
      var k = Math.round($), q = Math.round(R);
      return I.containerWidth === k && I.containerHeight === q ? I : {
        containerWidth: k,
        containerHeight: q
      };
    });
  }, []);
  F.useEffect(function() {
    var $ = function(K) {
      var M, N = K[0].contentRect, L = N.width, H = N.height;
      P(L, H), (M = b.current) === null || M === void 0 || M.call(b, L, H);
    };
    v > 0 && ($ = Sx($, v, {
      trailing: !0,
      leading: !1
    }));
    var R = new ResizeObserver($), I = y.current.getBoundingClientRect(), k = I.width, q = I.height;
    return P(k, q), R.observe(y.current), function() {
      R.disconnect();
    };
  }, [P, v]);
  var T = F.useMemo(function() {
    var $ = E.containerWidth, R = E.containerHeight;
    if ($ < 0 || R < 0)
      return null;
    ft(or(o) || or(c), `The width(%s) and height(%s) are both fixed numbers,
       maybe you don't need to use a ResponsiveContainer.`, o, c), ft(!r || r > 0, "The aspect(%s) must be greater than zero.", r);
    var I = or(o) ? $ : o, k = or(c) ? R : c;
    r && r > 0 && (I ? k = I / r : k && (I = k * r), d && k > d && (k = d)), ft(I > 0 || k > 0, `The width(%s) and height(%s) of chart should be greater than 0,
       please check the style of container, or the props width(%s) and height(%s),
       or add a minWidth(%s) or minHeight(%s) or use aspect(%s) to control the
       height and width.`, I, k, o, c, f, l, r);
    var q = !Array.isArray(h) && jt(h.type).endsWith("Chart");
    return S.Children.map(h, function(W) {
      return /* @__PURE__ */ S.isValidElement(W) ? /* @__PURE__ */ F.cloneElement(W, Ri({
        width: I,
        height: k
      }, q ? {
        style: Ri({
          height: "100%",
          width: "100%",
          maxHeight: k,
          maxWidth: I
        }, W.props.style)
      } : {})) : W;
    });
  }, [r, h, c, d, l, f, E, o]);
  return /* @__PURE__ */ S.createElement("div", {
    id: p ? "".concat(p) : void 0,
    className: ae("recharts-responsive-container", g),
    style: Ri(Ri({}, O), {}, {
      width: o,
      height: c,
      minWidth: f,
      minHeight: l,
      maxHeight: d
    }),
    ref: y
  }, T);
}), so = function(t) {
  return null;
};
so.displayName = "Cell";
function Kn(e) {
  "@babel/helpers - typeof";
  return Kn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Kn(e);
}
function Zy(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function of(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Zy(Object(r), !0).forEach(function(n) {
      RP(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Zy(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function RP(e, t, r) {
  return t = kP(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function kP(e) {
  var t = DP(e, "string");
  return Kn(t) == "symbol" ? t : t + "";
}
function DP(e, t) {
  if (Kn(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Kn(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var Er = {
  widthCache: {},
  cacheCount: 0
}, NP = 2e3, qP = {
  position: "absolute",
  top: "-20000px",
  left: 0,
  padding: 0,
  margin: 0,
  border: "none",
  whiteSpace: "pre"
}, Jy = "recharts_measurement_span";
function LP(e) {
  var t = of({}, e);
  return Object.keys(t).forEach(function(r) {
    t[r] || delete t[r];
  }), t;
}
var In = function(t) {
  var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  if (t == null || Vt.isSsr)
    return {
      width: 0,
      height: 0
    };
  var n = LP(r), i = JSON.stringify({
    text: t,
    copyStyle: n
  });
  if (Er.widthCache[i])
    return Er.widthCache[i];
  try {
    var a = document.getElementById(Jy);
    a || (a = document.createElement("span"), a.setAttribute("id", Jy), a.setAttribute("aria-hidden", "true"), document.body.appendChild(a));
    var o = of(of({}, qP), n);
    Object.assign(a.style, o), a.textContent = "".concat(t);
    var u = a.getBoundingClientRect(), c = {
      width: u.width,
      height: u.height
    };
    return Er.widthCache[i] = c, ++Er.cacheCount > NP && (Er.cacheCount = 0, Er.widthCache = {}), c;
  } catch {
    return {
      width: 0,
      height: 0
    };
  }
}, BP = function(t) {
  return {
    top: t.top + window.scrollY - document.documentElement.clientTop,
    left: t.left + window.scrollX - document.documentElement.clientLeft
  };
};
function Hn(e) {
  "@babel/helpers - typeof";
  return Hn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Hn(e);
}
function ua(e, t) {
  return UP(e) || WP(e, t) || zP(e, t) || FP();
}
function FP() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function zP(e, t) {
  if (e) {
    if (typeof e == "string") return Qy(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Qy(e, t);
  }
}
function Qy(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function WP(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, i, a, o, u = [], c = !0, s = !1;
    try {
      if (a = (r = r.call(e)).next, t === 0) {
        if (Object(r) !== r) return;
        c = !1;
      } else for (; !(c = (n = a.call(r)).done) && (u.push(n.value), u.length !== t); c = !0) ;
    } catch (f) {
      s = !0, i = f;
    } finally {
      try {
        if (!c && r.return != null && (o = r.return(), Object(o) !== o)) return;
      } finally {
        if (s) throw i;
      }
    }
    return u;
  }
}
function UP(e) {
  if (Array.isArray(e)) return e;
}
function KP(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function em(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, GP(n.key), n);
  }
}
function HP(e, t, r) {
  return t && em(e.prototype, t), r && em(e, r), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function GP(e) {
  var t = VP(e, "string");
  return Hn(t) == "symbol" ? t : t + "";
}
function VP(e, t) {
  if (Hn(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Hn(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var tm = /(-?\d+(?:\.\d+)?[a-zA-Z%]*)([*/])(-?\d+(?:\.\d+)?[a-zA-Z%]*)/, rm = /(-?\d+(?:\.\d+)?[a-zA-Z%]*)([+-])(-?\d+(?:\.\d+)?[a-zA-Z%]*)/, YP = /^px|cm|vh|vw|em|rem|%|mm|in|pt|pc|ex|ch|vmin|vmax|Q$/, XP = /(-?\d+(?:\.\d+)?)([a-zA-Z%]+)?/, Px = {
  cm: 96 / 2.54,
  mm: 96 / 25.4,
  pt: 96 / 72,
  pc: 96 / 6,
  in: 96,
  Q: 96 / (2.54 * 40),
  px: 1
}, ZP = Object.keys(Px), Cr = "NaN";
function JP(e, t) {
  return e * Px[t];
}
var Di = /* @__PURE__ */ (function() {
  function e(t, r) {
    KP(this, e), this.num = t, this.unit = r, this.num = t, this.unit = r, Number.isNaN(t) && (this.unit = ""), r !== "" && !YP.test(r) && (this.num = NaN, this.unit = ""), ZP.includes(r) && (this.num = JP(t, r), this.unit = "px");
  }
  return HP(e, [{
    key: "add",
    value: function(r) {
      return this.unit !== r.unit ? new e(NaN, "") : new e(this.num + r.num, this.unit);
    }
  }, {
    key: "subtract",
    value: function(r) {
      return this.unit !== r.unit ? new e(NaN, "") : new e(this.num - r.num, this.unit);
    }
  }, {
    key: "multiply",
    value: function(r) {
      return this.unit !== "" && r.unit !== "" && this.unit !== r.unit ? new e(NaN, "") : new e(this.num * r.num, this.unit || r.unit);
    }
  }, {
    key: "divide",
    value: function(r) {
      return this.unit !== "" && r.unit !== "" && this.unit !== r.unit ? new e(NaN, "") : new e(this.num / r.num, this.unit || r.unit);
    }
  }, {
    key: "toString",
    value: function() {
      return "".concat(this.num).concat(this.unit);
    }
  }, {
    key: "isNaN",
    value: function() {
      return Number.isNaN(this.num);
    }
  }], [{
    key: "parse",
    value: function(r) {
      var n, i = (n = XP.exec(r)) !== null && n !== void 0 ? n : [], a = ua(i, 3), o = a[1], u = a[2];
      return new e(parseFloat(o), u ?? "");
    }
  }]);
})();
function Ex(e) {
  if (e.includes(Cr))
    return Cr;
  for (var t = e; t.includes("*") || t.includes("/"); ) {
    var r, n = (r = tm.exec(t)) !== null && r !== void 0 ? r : [], i = ua(n, 4), a = i[1], o = i[2], u = i[3], c = Di.parse(a ?? ""), s = Di.parse(u ?? ""), f = o === "*" ? c.multiply(s) : c.divide(s);
    if (f.isNaN())
      return Cr;
    t = t.replace(tm, f.toString());
  }
  for (; t.includes("+") || /.-\d+(?:\.\d+)?/.test(t); ) {
    var l, d = (l = rm.exec(t)) !== null && l !== void 0 ? l : [], h = ua(d, 4), m = h[1], v = h[2], p = h[3], g = Di.parse(m ?? ""), x = Di.parse(p ?? ""), w = v === "+" ? g.add(x) : g.subtract(x);
    if (w.isNaN())
      return Cr;
    t = t.replace(rm, w.toString());
  }
  return t;
}
var nm = /\(([^()]*)\)/;
function QP(e) {
  for (var t = e; t.includes("("); ) {
    var r = nm.exec(t), n = ua(r, 2), i = n[1];
    t = t.replace(nm, Ex(i));
  }
  return t;
}
function eE(e) {
  var t = e.replace(/\s+/g, "");
  return t = QP(t), t = Ex(t), t;
}
function tE(e) {
  try {
    return eE(e);
  } catch {
    return Cr;
  }
}
function zs(e) {
  var t = tE(e.slice(5, -1));
  return t === Cr ? "" : t;
}
var rE = ["x", "y", "lineHeight", "capHeight", "scaleToFit", "textAnchor", "verticalAnchor", "fill"], nE = ["dx", "dy", "angle", "className", "breakAll"];
function uf() {
  return uf = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, uf.apply(this, arguments);
}
function im(e, t) {
  if (e == null) return {};
  var r = iE(e, t), n, i;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (i = 0; i < a.length; i++)
      n = a[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function iE(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
function am(e, t) {
  return cE(e) || uE(e, t) || oE(e, t) || aE();
}
function aE() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function oE(e, t) {
  if (e) {
    if (typeof e == "string") return om(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return om(e, t);
  }
}
function om(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function uE(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, i, a, o, u = [], c = !0, s = !1;
    try {
      if (a = (r = r.call(e)).next, t === 0) {
        if (Object(r) !== r) return;
        c = !1;
      } else for (; !(c = (n = a.call(r)).done) && (u.push(n.value), u.length !== t); c = !0) ;
    } catch (f) {
      s = !0, i = f;
    } finally {
      try {
        if (!c && r.return != null && (o = r.return(), Object(o) !== o)) return;
      } finally {
        if (s) throw i;
      }
    }
    return u;
  }
}
function cE(e) {
  if (Array.isArray(e)) return e;
}
var Tx = /[ \f\n\r\t\v\u2028\u2029]+/, jx = function(t) {
  var r = t.children, n = t.breakAll, i = t.style;
  try {
    var a = [];
    ie(r) || (n ? a = r.toString().split("") : a = r.toString().split(Tx));
    var o = a.map(function(c) {
      return {
        word: c,
        width: In(c, i).width
      };
    }), u = n ? 0 : In(" ", i).width;
    return {
      wordsWithComputedWidth: o,
      spaceWidth: u
    };
  } catch {
    return null;
  }
}, sE = function(t, r, n, i, a) {
  var o = t.maxLines, u = t.children, c = t.style, s = t.breakAll, f = z(o), l = u, d = function() {
    var I = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
    return I.reduce(function(k, q) {
      var W = q.word, K = q.width, M = k[k.length - 1];
      if (M && (i == null || a || M.width + K + n < Number(i)))
        M.words.push(W), M.width += K + n;
      else {
        var N = {
          words: [W],
          width: K
        };
        k.push(N);
      }
      return k;
    }, []);
  }, h = d(r), m = function(I) {
    return I.reduce(function(k, q) {
      return k.width > q.width ? k : q;
    });
  };
  if (!f)
    return h;
  for (var v = "…", p = function(I) {
    var k = l.slice(0, I), q = jx({
      breakAll: s,
      style: c,
      children: k + v
    }).wordsWithComputedWidth, W = d(q), K = W.length > o || m(W).width > Number(i);
    return [K, W];
  }, g = 0, x = l.length - 1, w = 0, O; g <= x && w <= l.length - 1; ) {
    var y = Math.floor((g + x) / 2), b = y - 1, _ = p(b), A = am(_, 2), E = A[0], C = A[1], P = p(y), T = am(P, 1), $ = T[0];
    if (!E && !$ && (g = y + 1), E && $ && (x = y - 1), !E && $) {
      O = C;
      break;
    }
    w++;
  }
  return O || h;
}, um = function(t) {
  var r = ie(t) ? [] : t.toString().split(Tx);
  return [{
    words: r
  }];
}, lE = function(t) {
  var r = t.width, n = t.scaleToFit, i = t.children, a = t.style, o = t.breakAll, u = t.maxLines;
  if ((r || n) && !Vt.isSsr) {
    var c, s, f = jx({
      breakAll: o,
      children: i,
      style: a
    });
    if (f) {
      var l = f.wordsWithComputedWidth, d = f.spaceWidth;
      c = l, s = d;
    } else
      return um(i);
    return sE({
      breakAll: o,
      children: i,
      maxLines: u,
      style: a
    }, c, s, r, n);
  }
  return um(i);
}, cm = "#808080", yr = function(t) {
  var r = t.x, n = r === void 0 ? 0 : r, i = t.y, a = i === void 0 ? 0 : i, o = t.lineHeight, u = o === void 0 ? "1em" : o, c = t.capHeight, s = c === void 0 ? "0.71em" : c, f = t.scaleToFit, l = f === void 0 ? !1 : f, d = t.textAnchor, h = d === void 0 ? "start" : d, m = t.verticalAnchor, v = m === void 0 ? "end" : m, p = t.fill, g = p === void 0 ? cm : p, x = im(t, rE), w = F.useMemo(function() {
    return lE({
      breakAll: x.breakAll,
      children: x.children,
      maxLines: x.maxLines,
      scaleToFit: l,
      style: x.style,
      width: x.width
    });
  }, [x.breakAll, x.children, x.maxLines, l, x.style, x.width]), O = x.dx, y = x.dy, b = x.angle, _ = x.className, A = x.breakAll, E = im(x, nE);
  if (!Me(n) || !Me(a))
    return null;
  var C = n + (z(O) ? O : 0), P = a + (z(y) ? y : 0), T;
  switch (v) {
    case "start":
      T = zs("calc(".concat(s, ")"));
      break;
    case "middle":
      T = zs("calc(".concat((w.length - 1) / 2, " * -").concat(u, " + (").concat(s, " / 2))"));
      break;
    default:
      T = zs("calc(".concat(w.length - 1, " * -").concat(u, ")"));
      break;
  }
  var $ = [];
  if (l) {
    var R = w[0].width, I = x.width;
    $.push("scale(".concat((z(I) ? I / R : 1) / R, ")"));
  }
  return b && $.push("rotate(".concat(b, ", ").concat(C, ", ").concat(P, ")")), $.length && (E.transform = $.join(" ")), /* @__PURE__ */ S.createElement("text", uf({}, X(E, !0), {
    x: C,
    y: P,
    className: ae("recharts-text", _),
    textAnchor: h,
    fill: g.includes("url") ? cm : g
  }), w.map(function(k, q) {
    var W = k.words.join(A ? "" : " ");
    return (
      // duplicate words will cause duplicate keys
      // eslint-disable-next-line react/no-array-index-key
      /* @__PURE__ */ S.createElement("tspan", {
        x: C,
        dy: q === 0 ? T : u,
        key: "".concat(W, "-").concat(q)
      }, W)
    );
  }));
};
function Ut(e, t) {
  return e == null || t == null ? NaN : e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function fE(e, t) {
  return e == null || t == null ? NaN : t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function Md(e) {
  let t, r, n;
  e.length !== 2 ? (t = Ut, r = (u, c) => Ut(e(u), c), n = (u, c) => e(u) - c) : (t = e === Ut || e === fE ? e : dE, r = e, n = e);
  function i(u, c, s = 0, f = u.length) {
    if (s < f) {
      if (t(c, c) !== 0) return f;
      do {
        const l = s + f >>> 1;
        r(u[l], c) < 0 ? s = l + 1 : f = l;
      } while (s < f);
    }
    return s;
  }
  function a(u, c, s = 0, f = u.length) {
    if (s < f) {
      if (t(c, c) !== 0) return f;
      do {
        const l = s + f >>> 1;
        r(u[l], c) <= 0 ? s = l + 1 : f = l;
      } while (s < f);
    }
    return s;
  }
  function o(u, c, s = 0, f = u.length) {
    const l = i(u, c, s, f - 1);
    return l > s && n(u[l - 1], c) > -n(u[l], c) ? l - 1 : l;
  }
  return { left: i, center: o, right: a };
}
function dE() {
  return 0;
}
function $x(e) {
  return e === null ? NaN : +e;
}
function* pE(e, t) {
  for (let r of e)
    r != null && (r = +r) >= r && (yield r);
}
const hE = Md(Ut), Oi = hE.right;
Md($x).center;
class sm extends Map {
  constructor(t, r = mE) {
    if (super(), Object.defineProperties(this, { _intern: { value: /* @__PURE__ */ new Map() }, _key: { value: r } }), t != null) for (const [n, i] of t) this.set(n, i);
  }
  get(t) {
    return super.get(lm(this, t));
  }
  has(t) {
    return super.has(lm(this, t));
  }
  set(t, r) {
    return super.set(vE(this, t), r);
  }
  delete(t) {
    return super.delete(yE(this, t));
  }
}
function lm({ _intern: e, _key: t }, r) {
  const n = t(r);
  return e.has(n) ? e.get(n) : r;
}
function vE({ _intern: e, _key: t }, r) {
  const n = t(r);
  return e.has(n) ? e.get(n) : (e.set(n, r), r);
}
function yE({ _intern: e, _key: t }, r) {
  const n = t(r);
  return e.has(n) && (r = e.get(n), e.delete(n)), r;
}
function mE(e) {
  return e !== null && typeof e == "object" ? e.valueOf() : e;
}
function gE(e = Ut) {
  if (e === Ut) return Cx;
  if (typeof e != "function") throw new TypeError("compare is not a function");
  return (t, r) => {
    const n = e(t, r);
    return n || n === 0 ? n : (e(r, r) === 0) - (e(t, t) === 0);
  };
}
function Cx(e, t) {
  return (e == null || !(e >= e)) - (t == null || !(t >= t)) || (e < t ? -1 : e > t ? 1 : 0);
}
const bE = Math.sqrt(50), xE = Math.sqrt(10), wE = Math.sqrt(2);
function ca(e, t, r) {
  const n = (t - e) / Math.max(0, r), i = Math.floor(Math.log10(n)), a = n / Math.pow(10, i), o = a >= bE ? 10 : a >= xE ? 5 : a >= wE ? 2 : 1;
  let u, c, s;
  return i < 0 ? (s = Math.pow(10, -i) / o, u = Math.round(e * s), c = Math.round(t * s), u / s < e && ++u, c / s > t && --c, s = -s) : (s = Math.pow(10, i) * o, u = Math.round(e / s), c = Math.round(t / s), u * s < e && ++u, c * s > t && --c), c < u && 0.5 <= r && r < 2 ? ca(e, t, r * 2) : [u, c, s];
}
function cf(e, t, r) {
  if (t = +t, e = +e, r = +r, !(r > 0)) return [];
  if (e === t) return [e];
  const n = t < e, [i, a, o] = n ? ca(t, e, r) : ca(e, t, r);
  if (!(a >= i)) return [];
  const u = a - i + 1, c = new Array(u);
  if (n)
    if (o < 0) for (let s = 0; s < u; ++s) c[s] = (a - s) / -o;
    else for (let s = 0; s < u; ++s) c[s] = (a - s) * o;
  else if (o < 0) for (let s = 0; s < u; ++s) c[s] = (i + s) / -o;
  else for (let s = 0; s < u; ++s) c[s] = (i + s) * o;
  return c;
}
function sf(e, t, r) {
  return t = +t, e = +e, r = +r, ca(e, t, r)[2];
}
function lf(e, t, r) {
  t = +t, e = +e, r = +r;
  const n = t < e, i = n ? sf(t, e, r) : sf(e, t, r);
  return (n ? -1 : 1) * (i < 0 ? 1 / -i : i);
}
function fm(e, t) {
  let r;
  for (const n of e)
    n != null && (r < n || r === void 0 && n >= n) && (r = n);
  return r;
}
function dm(e, t) {
  let r;
  for (const n of e)
    n != null && (r > n || r === void 0 && n >= n) && (r = n);
  return r;
}
function Mx(e, t, r = 0, n = 1 / 0, i) {
  if (t = Math.floor(t), r = Math.floor(Math.max(0, r)), n = Math.floor(Math.min(e.length - 1, n)), !(r <= t && t <= n)) return e;
  for (i = i === void 0 ? Cx : gE(i); n > r; ) {
    if (n - r > 600) {
      const c = n - r + 1, s = t - r + 1, f = Math.log(c), l = 0.5 * Math.exp(2 * f / 3), d = 0.5 * Math.sqrt(f * l * (c - l) / c) * (s - c / 2 < 0 ? -1 : 1), h = Math.max(r, Math.floor(t - s * l / c + d)), m = Math.min(n, Math.floor(t + (c - s) * l / c + d));
      Mx(e, t, h, m, i);
    }
    const a = e[t];
    let o = r, u = n;
    for (On(e, r, t), i(e[n], a) > 0 && On(e, r, n); o < u; ) {
      for (On(e, o, u), ++o, --u; i(e[o], a) < 0; ) ++o;
      for (; i(e[u], a) > 0; ) --u;
    }
    i(e[r], a) === 0 ? On(e, r, u) : (++u, On(e, u, n)), u <= t && (r = u + 1), t <= u && (n = u - 1);
  }
  return e;
}
function On(e, t, r) {
  const n = e[t];
  e[t] = e[r], e[r] = n;
}
function OE(e, t, r) {
  if (e = Float64Array.from(pE(e)), !(!(n = e.length) || isNaN(t = +t))) {
    if (t <= 0 || n < 2) return dm(e);
    if (t >= 1) return fm(e);
    var n, i = (n - 1) * t, a = Math.floor(i), o = fm(Mx(e, a).subarray(0, a + 1)), u = dm(e.subarray(a + 1));
    return o + (u - o) * (i - a);
  }
}
function _E(e, t, r = $x) {
  if (!(!(n = e.length) || isNaN(t = +t))) {
    if (t <= 0 || n < 2) return +r(e[0], 0, e);
    if (t >= 1) return +r(e[n - 1], n - 1, e);
    var n, i = (n - 1) * t, a = Math.floor(i), o = +r(e[a], a, e), u = +r(e[a + 1], a + 1, e);
    return o + (u - o) * (i - a);
  }
}
function AE(e, t, r) {
  e = +e, t = +t, r = (i = arguments.length) < 2 ? (t = e, e = 0, 1) : i < 3 ? 1 : +r;
  for (var n = -1, i = Math.max(0, Math.ceil((t - e) / r)) | 0, a = new Array(i); ++n < i; )
    a[n] = e + n * r;
  return a;
}
function ot(e, t) {
  switch (arguments.length) {
    case 0:
      break;
    case 1:
      this.range(e);
      break;
    default:
      this.range(t).domain(e);
      break;
  }
  return this;
}
function Dt(e, t) {
  switch (arguments.length) {
    case 0:
      break;
    case 1: {
      typeof e == "function" ? this.interpolator(e) : this.range(e);
      break;
    }
    default: {
      this.domain(e), typeof t == "function" ? this.interpolator(t) : this.range(t);
      break;
    }
  }
  return this;
}
const ff = Symbol("implicit");
function Id() {
  var e = new sm(), t = [], r = [], n = ff;
  function i(a) {
    let o = e.get(a);
    if (o === void 0) {
      if (n !== ff) return n;
      e.set(a, o = t.push(a) - 1);
    }
    return r[o % r.length];
  }
  return i.domain = function(a) {
    if (!arguments.length) return t.slice();
    t = [], e = new sm();
    for (const o of a)
      e.has(o) || e.set(o, t.push(o) - 1);
    return i;
  }, i.range = function(a) {
    return arguments.length ? (r = Array.from(a), i) : r.slice();
  }, i.unknown = function(a) {
    return arguments.length ? (n = a, i) : n;
  }, i.copy = function() {
    return Id(t, r).unknown(n);
  }, ot.apply(i, arguments), i;
}
function Gn() {
  var e = Id().unknown(void 0), t = e.domain, r = e.range, n = 0, i = 1, a, o, u = !1, c = 0, s = 0, f = 0.5;
  delete e.unknown;
  function l() {
    var d = t().length, h = i < n, m = h ? i : n, v = h ? n : i;
    a = (v - m) / Math.max(1, d - c + s * 2), u && (a = Math.floor(a)), m += (v - m - a * (d - c)) * f, o = a * (1 - c), u && (m = Math.round(m), o = Math.round(o));
    var p = AE(d).map(function(g) {
      return m + a * g;
    });
    return r(h ? p.reverse() : p);
  }
  return e.domain = function(d) {
    return arguments.length ? (t(d), l()) : t();
  }, e.range = function(d) {
    return arguments.length ? ([n, i] = d, n = +n, i = +i, l()) : [n, i];
  }, e.rangeRound = function(d) {
    return [n, i] = d, n = +n, i = +i, u = !0, l();
  }, e.bandwidth = function() {
    return o;
  }, e.step = function() {
    return a;
  }, e.round = function(d) {
    return arguments.length ? (u = !!d, l()) : u;
  }, e.padding = function(d) {
    return arguments.length ? (c = Math.min(1, s = +d), l()) : c;
  }, e.paddingInner = function(d) {
    return arguments.length ? (c = Math.min(1, d), l()) : c;
  }, e.paddingOuter = function(d) {
    return arguments.length ? (s = +d, l()) : s;
  }, e.align = function(d) {
    return arguments.length ? (f = Math.max(0, Math.min(1, d)), l()) : f;
  }, e.copy = function() {
    return Gn(t(), [n, i]).round(u).paddingInner(c).paddingOuter(s).align(f);
  }, ot.apply(l(), arguments);
}
function Ix(e) {
  var t = e.copy;
  return e.padding = e.paddingOuter, delete e.paddingInner, delete e.paddingOuter, e.copy = function() {
    return Ix(t());
  }, e;
}
function Rn() {
  return Ix(Gn.apply(null, arguments).paddingInner(1));
}
function Rd(e, t, r) {
  e.prototype = t.prototype = r, r.constructor = e;
}
function Rx(e, t) {
  var r = Object.create(e.prototype);
  for (var n in t) r[n] = t[n];
  return r;
}
function _i() {
}
var Vn = 0.7, sa = 1 / Vn, Nr = "\\s*([+-]?\\d+)\\s*", Yn = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", mt = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", SE = /^#([0-9a-f]{3,8})$/, PE = new RegExp(`^rgb\\(${Nr},${Nr},${Nr}\\)$`), EE = new RegExp(`^rgb\\(${mt},${mt},${mt}\\)$`), TE = new RegExp(`^rgba\\(${Nr},${Nr},${Nr},${Yn}\\)$`), jE = new RegExp(`^rgba\\(${mt},${mt},${mt},${Yn}\\)$`), $E = new RegExp(`^hsl\\(${Yn},${mt},${mt}\\)$`), CE = new RegExp(`^hsla\\(${Yn},${mt},${mt},${Yn}\\)$`), pm = {
  aliceblue: 15792383,
  antiquewhite: 16444375,
  aqua: 65535,
  aquamarine: 8388564,
  azure: 15794175,
  beige: 16119260,
  bisque: 16770244,
  black: 0,
  blanchedalmond: 16772045,
  blue: 255,
  blueviolet: 9055202,
  brown: 10824234,
  burlywood: 14596231,
  cadetblue: 6266528,
  chartreuse: 8388352,
  chocolate: 13789470,
  coral: 16744272,
  cornflowerblue: 6591981,
  cornsilk: 16775388,
  crimson: 14423100,
  cyan: 65535,
  darkblue: 139,
  darkcyan: 35723,
  darkgoldenrod: 12092939,
  darkgray: 11119017,
  darkgreen: 25600,
  darkgrey: 11119017,
  darkkhaki: 12433259,
  darkmagenta: 9109643,
  darkolivegreen: 5597999,
  darkorange: 16747520,
  darkorchid: 10040012,
  darkred: 9109504,
  darksalmon: 15308410,
  darkseagreen: 9419919,
  darkslateblue: 4734347,
  darkslategray: 3100495,
  darkslategrey: 3100495,
  darkturquoise: 52945,
  darkviolet: 9699539,
  deeppink: 16716947,
  deepskyblue: 49151,
  dimgray: 6908265,
  dimgrey: 6908265,
  dodgerblue: 2003199,
  firebrick: 11674146,
  floralwhite: 16775920,
  forestgreen: 2263842,
  fuchsia: 16711935,
  gainsboro: 14474460,
  ghostwhite: 16316671,
  gold: 16766720,
  goldenrod: 14329120,
  gray: 8421504,
  green: 32768,
  greenyellow: 11403055,
  grey: 8421504,
  honeydew: 15794160,
  hotpink: 16738740,
  indianred: 13458524,
  indigo: 4915330,
  ivory: 16777200,
  khaki: 15787660,
  lavender: 15132410,
  lavenderblush: 16773365,
  lawngreen: 8190976,
  lemonchiffon: 16775885,
  lightblue: 11393254,
  lightcoral: 15761536,
  lightcyan: 14745599,
  lightgoldenrodyellow: 16448210,
  lightgray: 13882323,
  lightgreen: 9498256,
  lightgrey: 13882323,
  lightpink: 16758465,
  lightsalmon: 16752762,
  lightseagreen: 2142890,
  lightskyblue: 8900346,
  lightslategray: 7833753,
  lightslategrey: 7833753,
  lightsteelblue: 11584734,
  lightyellow: 16777184,
  lime: 65280,
  limegreen: 3329330,
  linen: 16445670,
  magenta: 16711935,
  maroon: 8388608,
  mediumaquamarine: 6737322,
  mediumblue: 205,
  mediumorchid: 12211667,
  mediumpurple: 9662683,
  mediumseagreen: 3978097,
  mediumslateblue: 8087790,
  mediumspringgreen: 64154,
  mediumturquoise: 4772300,
  mediumvioletred: 13047173,
  midnightblue: 1644912,
  mintcream: 16121850,
  mistyrose: 16770273,
  moccasin: 16770229,
  navajowhite: 16768685,
  navy: 128,
  oldlace: 16643558,
  olive: 8421376,
  olivedrab: 7048739,
  orange: 16753920,
  orangered: 16729344,
  orchid: 14315734,
  palegoldenrod: 15657130,
  palegreen: 10025880,
  paleturquoise: 11529966,
  palevioletred: 14381203,
  papayawhip: 16773077,
  peachpuff: 16767673,
  peru: 13468991,
  pink: 16761035,
  plum: 14524637,
  powderblue: 11591910,
  purple: 8388736,
  rebeccapurple: 6697881,
  red: 16711680,
  rosybrown: 12357519,
  royalblue: 4286945,
  saddlebrown: 9127187,
  salmon: 16416882,
  sandybrown: 16032864,
  seagreen: 3050327,
  seashell: 16774638,
  sienna: 10506797,
  silver: 12632256,
  skyblue: 8900331,
  slateblue: 6970061,
  slategray: 7372944,
  slategrey: 7372944,
  snow: 16775930,
  springgreen: 65407,
  steelblue: 4620980,
  tan: 13808780,
  teal: 32896,
  thistle: 14204888,
  tomato: 16737095,
  turquoise: 4251856,
  violet: 15631086,
  wheat: 16113331,
  white: 16777215,
  whitesmoke: 16119285,
  yellow: 16776960,
  yellowgreen: 10145074
};
Rd(_i, Xn, {
  copy(e) {
    return Object.assign(new this.constructor(), this, e);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: hm,
  // Deprecated! Use color.formatHex.
  formatHex: hm,
  formatHex8: ME,
  formatHsl: IE,
  formatRgb: vm,
  toString: vm
});
function hm() {
  return this.rgb().formatHex();
}
function ME() {
  return this.rgb().formatHex8();
}
function IE() {
  return kx(this).formatHsl();
}
function vm() {
  return this.rgb().formatRgb();
}
function Xn(e) {
  var t, r;
  return e = (e + "").trim().toLowerCase(), (t = SE.exec(e)) ? (r = t[1].length, t = parseInt(t[1], 16), r === 6 ? ym(t) : r === 3 ? new Ue(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, (t & 15) << 4 | t & 15, 1) : r === 8 ? Ni(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (t & 255) / 255) : r === 4 ? Ni(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, ((t & 15) << 4 | t & 15) / 255) : null) : (t = PE.exec(e)) ? new Ue(t[1], t[2], t[3], 1) : (t = EE.exec(e)) ? new Ue(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, 1) : (t = TE.exec(e)) ? Ni(t[1], t[2], t[3], t[4]) : (t = jE.exec(e)) ? Ni(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, t[4]) : (t = $E.exec(e)) ? bm(t[1], t[2] / 100, t[3] / 100, 1) : (t = CE.exec(e)) ? bm(t[1], t[2] / 100, t[3] / 100, t[4]) : pm.hasOwnProperty(e) ? ym(pm[e]) : e === "transparent" ? new Ue(NaN, NaN, NaN, 0) : null;
}
function ym(e) {
  return new Ue(e >> 16 & 255, e >> 8 & 255, e & 255, 1);
}
function Ni(e, t, r, n) {
  return n <= 0 && (e = t = r = NaN), new Ue(e, t, r, n);
}
function RE(e) {
  return e instanceof _i || (e = Xn(e)), e ? (e = e.rgb(), new Ue(e.r, e.g, e.b, e.opacity)) : new Ue();
}
function df(e, t, r, n) {
  return arguments.length === 1 ? RE(e) : new Ue(e, t, r, n ?? 1);
}
function Ue(e, t, r, n) {
  this.r = +e, this.g = +t, this.b = +r, this.opacity = +n;
}
Rd(Ue, df, Rx(_i, {
  brighter(e) {
    return e = e == null ? sa : Math.pow(sa, e), new Ue(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? Vn : Math.pow(Vn, e), new Ue(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new Ue(fr(this.r), fr(this.g), fr(this.b), la(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: mm,
  // Deprecated! Use color.formatHex.
  formatHex: mm,
  formatHex8: kE,
  formatRgb: gm,
  toString: gm
}));
function mm() {
  return `#${ur(this.r)}${ur(this.g)}${ur(this.b)}`;
}
function kE() {
  return `#${ur(this.r)}${ur(this.g)}${ur(this.b)}${ur((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function gm() {
  const e = la(this.opacity);
  return `${e === 1 ? "rgb(" : "rgba("}${fr(this.r)}, ${fr(this.g)}, ${fr(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function la(e) {
  return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function fr(e) {
  return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function ur(e) {
  return e = fr(e), (e < 16 ? "0" : "") + e.toString(16);
}
function bm(e, t, r, n) {
  return n <= 0 ? e = t = r = NaN : r <= 0 || r >= 1 ? e = t = NaN : t <= 0 && (e = NaN), new lt(e, t, r, n);
}
function kx(e) {
  if (e instanceof lt) return new lt(e.h, e.s, e.l, e.opacity);
  if (e instanceof _i || (e = Xn(e)), !e) return new lt();
  if (e instanceof lt) return e;
  e = e.rgb();
  var t = e.r / 255, r = e.g / 255, n = e.b / 255, i = Math.min(t, r, n), a = Math.max(t, r, n), o = NaN, u = a - i, c = (a + i) / 2;
  return u ? (t === a ? o = (r - n) / u + (r < n) * 6 : r === a ? o = (n - t) / u + 2 : o = (t - r) / u + 4, u /= c < 0.5 ? a + i : 2 - a - i, o *= 60) : u = c > 0 && c < 1 ? 0 : o, new lt(o, u, c, e.opacity);
}
function DE(e, t, r, n) {
  return arguments.length === 1 ? kx(e) : new lt(e, t, r, n ?? 1);
}
function lt(e, t, r, n) {
  this.h = +e, this.s = +t, this.l = +r, this.opacity = +n;
}
Rd(lt, DE, Rx(_i, {
  brighter(e) {
    return e = e == null ? sa : Math.pow(sa, e), new lt(this.h, this.s, this.l * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? Vn : Math.pow(Vn, e), new lt(this.h, this.s, this.l * e, this.opacity);
  },
  rgb() {
    var e = this.h % 360 + (this.h < 0) * 360, t = isNaN(e) || isNaN(this.s) ? 0 : this.s, r = this.l, n = r + (r < 0.5 ? r : 1 - r) * t, i = 2 * r - n;
    return new Ue(
      Ws(e >= 240 ? e - 240 : e + 120, i, n),
      Ws(e, i, n),
      Ws(e < 120 ? e + 240 : e - 120, i, n),
      this.opacity
    );
  },
  clamp() {
    return new lt(xm(this.h), qi(this.s), qi(this.l), la(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const e = la(this.opacity);
    return `${e === 1 ? "hsl(" : "hsla("}${xm(this.h)}, ${qi(this.s) * 100}%, ${qi(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
  }
}));
function xm(e) {
  return e = (e || 0) % 360, e < 0 ? e + 360 : e;
}
function qi(e) {
  return Math.max(0, Math.min(1, e || 0));
}
function Ws(e, t, r) {
  return (e < 60 ? t + (r - t) * e / 60 : e < 180 ? r : e < 240 ? t + (r - t) * (240 - e) / 60 : t) * 255;
}
const kd = (e) => () => e;
function NE(e, t) {
  return function(r) {
    return e + r * t;
  };
}
function qE(e, t, r) {
  return e = Math.pow(e, r), t = Math.pow(t, r) - e, r = 1 / r, function(n) {
    return Math.pow(e + n * t, r);
  };
}
function LE(e) {
  return (e = +e) == 1 ? Dx : function(t, r) {
    return r - t ? qE(t, r, e) : kd(isNaN(t) ? r : t);
  };
}
function Dx(e, t) {
  var r = t - e;
  return r ? NE(e, r) : kd(isNaN(e) ? t : e);
}
const wm = (function e(t) {
  var r = LE(t);
  function n(i, a) {
    var o = r((i = df(i)).r, (a = df(a)).r), u = r(i.g, a.g), c = r(i.b, a.b), s = Dx(i.opacity, a.opacity);
    return function(f) {
      return i.r = o(f), i.g = u(f), i.b = c(f), i.opacity = s(f), i + "";
    };
  }
  return n.gamma = e, n;
})(1);
function BE(e, t) {
  t || (t = []);
  var r = e ? Math.min(t.length, e.length) : 0, n = t.slice(), i;
  return function(a) {
    for (i = 0; i < r; ++i) n[i] = e[i] * (1 - a) + t[i] * a;
    return n;
  };
}
function FE(e) {
  return ArrayBuffer.isView(e) && !(e instanceof DataView);
}
function zE(e, t) {
  var r = t ? t.length : 0, n = e ? Math.min(r, e.length) : 0, i = new Array(n), a = new Array(r), o;
  for (o = 0; o < n; ++o) i[o] = mn(e[o], t[o]);
  for (; o < r; ++o) a[o] = t[o];
  return function(u) {
    for (o = 0; o < n; ++o) a[o] = i[o](u);
    return a;
  };
}
function WE(e, t) {
  var r = /* @__PURE__ */ new Date();
  return e = +e, t = +t, function(n) {
    return r.setTime(e * (1 - n) + t * n), r;
  };
}
function fa(e, t) {
  return e = +e, t = +t, function(r) {
    return e * (1 - r) + t * r;
  };
}
function UE(e, t) {
  var r = {}, n = {}, i;
  (e === null || typeof e != "object") && (e = {}), (t === null || typeof t != "object") && (t = {});
  for (i in t)
    i in e ? r[i] = mn(e[i], t[i]) : n[i] = t[i];
  return function(a) {
    for (i in r) n[i] = r[i](a);
    return n;
  };
}
var pf = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, Us = new RegExp(pf.source, "g");
function KE(e) {
  return function() {
    return e;
  };
}
function HE(e) {
  return function(t) {
    return e(t) + "";
  };
}
function GE(e, t) {
  var r = pf.lastIndex = Us.lastIndex = 0, n, i, a, o = -1, u = [], c = [];
  for (e = e + "", t = t + ""; (n = pf.exec(e)) && (i = Us.exec(t)); )
    (a = i.index) > r && (a = t.slice(r, a), u[o] ? u[o] += a : u[++o] = a), (n = n[0]) === (i = i[0]) ? u[o] ? u[o] += i : u[++o] = i : (u[++o] = null, c.push({ i: o, x: fa(n, i) })), r = Us.lastIndex;
  return r < t.length && (a = t.slice(r), u[o] ? u[o] += a : u[++o] = a), u.length < 2 ? c[0] ? HE(c[0].x) : KE(t) : (t = c.length, function(s) {
    for (var f = 0, l; f < t; ++f) u[(l = c[f]).i] = l.x(s);
    return u.join("");
  });
}
function mn(e, t) {
  var r = typeof t, n;
  return t == null || r === "boolean" ? kd(t) : (r === "number" ? fa : r === "string" ? (n = Xn(t)) ? (t = n, wm) : GE : t instanceof Xn ? wm : t instanceof Date ? WE : FE(t) ? BE : Array.isArray(t) ? zE : typeof t.valueOf != "function" && typeof t.toString != "function" || isNaN(t) ? UE : fa)(e, t);
}
function Dd(e, t) {
  return e = +e, t = +t, function(r) {
    return Math.round(e * (1 - r) + t * r);
  };
}
function VE(e, t) {
  t === void 0 && (t = e, e = mn);
  for (var r = 0, n = t.length - 1, i = t[0], a = new Array(n < 0 ? 0 : n); r < n; ) a[r] = e(i, i = t[++r]);
  return function(o) {
    var u = Math.max(0, Math.min(n - 1, Math.floor(o *= n)));
    return a[u](o - u);
  };
}
function YE(e) {
  return function() {
    return e;
  };
}
function da(e) {
  return +e;
}
var Om = [0, 1];
function We(e) {
  return e;
}
function hf(e, t) {
  return (t -= e = +e) ? function(r) {
    return (r - e) / t;
  } : YE(isNaN(t) ? NaN : 0.5);
}
function XE(e, t) {
  var r;
  return e > t && (r = e, e = t, t = r), function(n) {
    return Math.max(e, Math.min(t, n));
  };
}
function ZE(e, t, r) {
  var n = e[0], i = e[1], a = t[0], o = t[1];
  return i < n ? (n = hf(i, n), a = r(o, a)) : (n = hf(n, i), a = r(a, o)), function(u) {
    return a(n(u));
  };
}
function JE(e, t, r) {
  var n = Math.min(e.length, t.length) - 1, i = new Array(n), a = new Array(n), o = -1;
  for (e[n] < e[0] && (e = e.slice().reverse(), t = t.slice().reverse()); ++o < n; )
    i[o] = hf(e[o], e[o + 1]), a[o] = r(t[o], t[o + 1]);
  return function(u) {
    var c = Oi(e, u, 1, n) - 1;
    return a[c](i[c](u));
  };
}
function Ai(e, t) {
  return t.domain(e.domain()).range(e.range()).interpolate(e.interpolate()).clamp(e.clamp()).unknown(e.unknown());
}
function lo() {
  var e = Om, t = Om, r = mn, n, i, a, o = We, u, c, s;
  function f() {
    var d = Math.min(e.length, t.length);
    return o !== We && (o = XE(e[0], e[d - 1])), u = d > 2 ? JE : ZE, c = s = null, l;
  }
  function l(d) {
    return d == null || isNaN(d = +d) ? a : (c || (c = u(e.map(n), t, r)))(n(o(d)));
  }
  return l.invert = function(d) {
    return o(i((s || (s = u(t, e.map(n), fa)))(d)));
  }, l.domain = function(d) {
    return arguments.length ? (e = Array.from(d, da), f()) : e.slice();
  }, l.range = function(d) {
    return arguments.length ? (t = Array.from(d), f()) : t.slice();
  }, l.rangeRound = function(d) {
    return t = Array.from(d), r = Dd, f();
  }, l.clamp = function(d) {
    return arguments.length ? (o = d ? !0 : We, f()) : o !== We;
  }, l.interpolate = function(d) {
    return arguments.length ? (r = d, f()) : r;
  }, l.unknown = function(d) {
    return arguments.length ? (a = d, l) : a;
  }, function(d, h) {
    return n = d, i = h, f();
  };
}
function Nd() {
  return lo()(We, We);
}
function QE(e) {
  return Math.abs(e = Math.round(e)) >= 1e21 ? e.toLocaleString("en").replace(/,/g, "") : e.toString(10);
}
function pa(e, t) {
  if ((r = (e = t ? e.toExponential(t - 1) : e.toExponential()).indexOf("e")) < 0) return null;
  var r, n = e.slice(0, r);
  return [
    n.length > 1 ? n[0] + n.slice(2) : n,
    +e.slice(r + 1)
  ];
}
function Ur(e) {
  return e = pa(Math.abs(e)), e ? e[1] : NaN;
}
function eT(e, t) {
  return function(r, n) {
    for (var i = r.length, a = [], o = 0, u = e[0], c = 0; i > 0 && u > 0 && (c + u + 1 > n && (u = Math.max(1, n - c)), a.push(r.substring(i -= u, i + u)), !((c += u + 1) > n)); )
      u = e[o = (o + 1) % e.length];
    return a.reverse().join(t);
  };
}
function tT(e) {
  return function(t) {
    return t.replace(/[0-9]/g, function(r) {
      return e[+r];
    });
  };
}
var rT = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
function Zn(e) {
  if (!(t = rT.exec(e))) throw new Error("invalid format: " + e);
  var t;
  return new qd({
    fill: t[1],
    align: t[2],
    sign: t[3],
    symbol: t[4],
    zero: t[5],
    width: t[6],
    comma: t[7],
    precision: t[8] && t[8].slice(1),
    trim: t[9],
    type: t[10]
  });
}
Zn.prototype = qd.prototype;
function qd(e) {
  this.fill = e.fill === void 0 ? " " : e.fill + "", this.align = e.align === void 0 ? ">" : e.align + "", this.sign = e.sign === void 0 ? "-" : e.sign + "", this.symbol = e.symbol === void 0 ? "" : e.symbol + "", this.zero = !!e.zero, this.width = e.width === void 0 ? void 0 : +e.width, this.comma = !!e.comma, this.precision = e.precision === void 0 ? void 0 : +e.precision, this.trim = !!e.trim, this.type = e.type === void 0 ? "" : e.type + "";
}
qd.prototype.toString = function() {
  return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === void 0 ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision === void 0 ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type;
};
function nT(e) {
  e: for (var t = e.length, r = 1, n = -1, i; r < t; ++r)
    switch (e[r]) {
      case ".":
        n = i = r;
        break;
      case "0":
        n === 0 && (n = r), i = r;
        break;
      default:
        if (!+e[r]) break e;
        n > 0 && (n = 0);
        break;
    }
  return n > 0 ? e.slice(0, n) + e.slice(i + 1) : e;
}
var Nx;
function iT(e, t) {
  var r = pa(e, t);
  if (!r) return e + "";
  var n = r[0], i = r[1], a = i - (Nx = Math.max(-8, Math.min(8, Math.floor(i / 3))) * 3) + 1, o = n.length;
  return a === o ? n : a > o ? n + new Array(a - o + 1).join("0") : a > 0 ? n.slice(0, a) + "." + n.slice(a) : "0." + new Array(1 - a).join("0") + pa(e, Math.max(0, t + a - 1))[0];
}
function _m(e, t) {
  var r = pa(e, t);
  if (!r) return e + "";
  var n = r[0], i = r[1];
  return i < 0 ? "0." + new Array(-i).join("0") + n : n.length > i + 1 ? n.slice(0, i + 1) + "." + n.slice(i + 1) : n + new Array(i - n.length + 2).join("0");
}
const Am = {
  "%": (e, t) => (e * 100).toFixed(t),
  b: (e) => Math.round(e).toString(2),
  c: (e) => e + "",
  d: QE,
  e: (e, t) => e.toExponential(t),
  f: (e, t) => e.toFixed(t),
  g: (e, t) => e.toPrecision(t),
  o: (e) => Math.round(e).toString(8),
  p: (e, t) => _m(e * 100, t),
  r: _m,
  s: iT,
  X: (e) => Math.round(e).toString(16).toUpperCase(),
  x: (e) => Math.round(e).toString(16)
};
function Sm(e) {
  return e;
}
var Pm = Array.prototype.map, Em = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];
function aT(e) {
  var t = e.grouping === void 0 || e.thousands === void 0 ? Sm : eT(Pm.call(e.grouping, Number), e.thousands + ""), r = e.currency === void 0 ? "" : e.currency[0] + "", n = e.currency === void 0 ? "" : e.currency[1] + "", i = e.decimal === void 0 ? "." : e.decimal + "", a = e.numerals === void 0 ? Sm : tT(Pm.call(e.numerals, String)), o = e.percent === void 0 ? "%" : e.percent + "", u = e.minus === void 0 ? "−" : e.minus + "", c = e.nan === void 0 ? "NaN" : e.nan + "";
  function s(l) {
    l = Zn(l);
    var d = l.fill, h = l.align, m = l.sign, v = l.symbol, p = l.zero, g = l.width, x = l.comma, w = l.precision, O = l.trim, y = l.type;
    y === "n" ? (x = !0, y = "g") : Am[y] || (w === void 0 && (w = 12), O = !0, y = "g"), (p || d === "0" && h === "=") && (p = !0, d = "0", h = "=");
    var b = v === "$" ? r : v === "#" && /[boxX]/.test(y) ? "0" + y.toLowerCase() : "", _ = v === "$" ? n : /[%p]/.test(y) ? o : "", A = Am[y], E = /[defgprs%]/.test(y);
    w = w === void 0 ? 6 : /[gprs]/.test(y) ? Math.max(1, Math.min(21, w)) : Math.max(0, Math.min(20, w));
    function C(P) {
      var T = b, $ = _, R, I, k;
      if (y === "c")
        $ = A(P) + $, P = "";
      else {
        P = +P;
        var q = P < 0 || 1 / P < 0;
        if (P = isNaN(P) ? c : A(Math.abs(P), w), O && (P = nT(P)), q && +P == 0 && m !== "+" && (q = !1), T = (q ? m === "(" ? m : u : m === "-" || m === "(" ? "" : m) + T, $ = (y === "s" ? Em[8 + Nx / 3] : "") + $ + (q && m === "(" ? ")" : ""), E) {
          for (R = -1, I = P.length; ++R < I; )
            if (k = P.charCodeAt(R), 48 > k || k > 57) {
              $ = (k === 46 ? i + P.slice(R + 1) : P.slice(R)) + $, P = P.slice(0, R);
              break;
            }
        }
      }
      x && !p && (P = t(P, 1 / 0));
      var W = T.length + P.length + $.length, K = W < g ? new Array(g - W + 1).join(d) : "";
      switch (x && p && (P = t(K + P, K.length ? g - $.length : 1 / 0), K = ""), h) {
        case "<":
          P = T + P + $ + K;
          break;
        case "=":
          P = T + K + P + $;
          break;
        case "^":
          P = K.slice(0, W = K.length >> 1) + T + P + $ + K.slice(W);
          break;
        default:
          P = K + T + P + $;
          break;
      }
      return a(P);
    }
    return C.toString = function() {
      return l + "";
    }, C;
  }
  function f(l, d) {
    var h = s((l = Zn(l), l.type = "f", l)), m = Math.max(-8, Math.min(8, Math.floor(Ur(d) / 3))) * 3, v = Math.pow(10, -m), p = Em[8 + m / 3];
    return function(g) {
      return h(v * g) + p;
    };
  }
  return {
    format: s,
    formatPrefix: f
  };
}
var Li, Ld, qx;
oT({
  thousands: ",",
  grouping: [3],
  currency: ["$", ""]
});
function oT(e) {
  return Li = aT(e), Ld = Li.format, qx = Li.formatPrefix, Li;
}
function uT(e) {
  return Math.max(0, -Ur(Math.abs(e)));
}
function cT(e, t) {
  return Math.max(0, Math.max(-8, Math.min(8, Math.floor(Ur(t) / 3))) * 3 - Ur(Math.abs(e)));
}
function sT(e, t) {
  return e = Math.abs(e), t = Math.abs(t) - e, Math.max(0, Ur(t) - Ur(e)) + 1;
}
function Lx(e, t, r, n) {
  var i = lf(e, t, r), a;
  switch (n = Zn(n ?? ",f"), n.type) {
    case "s": {
      var o = Math.max(Math.abs(e), Math.abs(t));
      return n.precision == null && !isNaN(a = cT(i, o)) && (n.precision = a), qx(n, o);
    }
    case "":
    case "e":
    case "g":
    case "p":
    case "r": {
      n.precision == null && !isNaN(a = sT(i, Math.max(Math.abs(e), Math.abs(t)))) && (n.precision = a - (n.type === "e"));
      break;
    }
    case "f":
    case "%": {
      n.precision == null && !isNaN(a = uT(i)) && (n.precision = a - (n.type === "%") * 2);
      break;
    }
  }
  return Ld(n);
}
function Yt(e) {
  var t = e.domain;
  return e.ticks = function(r) {
    var n = t();
    return cf(n[0], n[n.length - 1], r ?? 10);
  }, e.tickFormat = function(r, n) {
    var i = t();
    return Lx(i[0], i[i.length - 1], r ?? 10, n);
  }, e.nice = function(r) {
    r == null && (r = 10);
    var n = t(), i = 0, a = n.length - 1, o = n[i], u = n[a], c, s, f = 10;
    for (u < o && (s = o, o = u, u = s, s = i, i = a, a = s); f-- > 0; ) {
      if (s = sf(o, u, r), s === c)
        return n[i] = o, n[a] = u, t(n);
      if (s > 0)
        o = Math.floor(o / s) * s, u = Math.ceil(u / s) * s;
      else if (s < 0)
        o = Math.ceil(o * s) / s, u = Math.floor(u * s) / s;
      else
        break;
      c = s;
    }
    return e;
  }, e;
}
function ha() {
  var e = Nd();
  return e.copy = function() {
    return Ai(e, ha());
  }, ot.apply(e, arguments), Yt(e);
}
function Bx(e) {
  var t;
  function r(n) {
    return n == null || isNaN(n = +n) ? t : n;
  }
  return r.invert = r, r.domain = r.range = function(n) {
    return arguments.length ? (e = Array.from(n, da), r) : e.slice();
  }, r.unknown = function(n) {
    return arguments.length ? (t = n, r) : t;
  }, r.copy = function() {
    return Bx(e).unknown(t);
  }, e = arguments.length ? Array.from(e, da) : [0, 1], Yt(r);
}
function Fx(e, t) {
  e = e.slice();
  var r = 0, n = e.length - 1, i = e[r], a = e[n], o;
  return a < i && (o = r, r = n, n = o, o = i, i = a, a = o), e[r] = t.floor(i), e[n] = t.ceil(a), e;
}
function Tm(e) {
  return Math.log(e);
}
function jm(e) {
  return Math.exp(e);
}
function lT(e) {
  return -Math.log(-e);
}
function fT(e) {
  return -Math.exp(-e);
}
function dT(e) {
  return isFinite(e) ? +("1e" + e) : e < 0 ? 0 : e;
}
function pT(e) {
  return e === 10 ? dT : e === Math.E ? Math.exp : (t) => Math.pow(e, t);
}
function hT(e) {
  return e === Math.E ? Math.log : e === 10 && Math.log10 || e === 2 && Math.log2 || (e = Math.log(e), (t) => Math.log(t) / e);
}
function $m(e) {
  return (t, r) => -e(-t, r);
}
function Bd(e) {
  const t = e(Tm, jm), r = t.domain;
  let n = 10, i, a;
  function o() {
    return i = hT(n), a = pT(n), r()[0] < 0 ? (i = $m(i), a = $m(a), e(lT, fT)) : e(Tm, jm), t;
  }
  return t.base = function(u) {
    return arguments.length ? (n = +u, o()) : n;
  }, t.domain = function(u) {
    return arguments.length ? (r(u), o()) : r();
  }, t.ticks = (u) => {
    const c = r();
    let s = c[0], f = c[c.length - 1];
    const l = f < s;
    l && ([s, f] = [f, s]);
    let d = i(s), h = i(f), m, v;
    const p = u == null ? 10 : +u;
    let g = [];
    if (!(n % 1) && h - d < p) {
      if (d = Math.floor(d), h = Math.ceil(h), s > 0) {
        for (; d <= h; ++d)
          for (m = 1; m < n; ++m)
            if (v = d < 0 ? m / a(-d) : m * a(d), !(v < s)) {
              if (v > f) break;
              g.push(v);
            }
      } else for (; d <= h; ++d)
        for (m = n - 1; m >= 1; --m)
          if (v = d > 0 ? m / a(-d) : m * a(d), !(v < s)) {
            if (v > f) break;
            g.push(v);
          }
      g.length * 2 < p && (g = cf(s, f, p));
    } else
      g = cf(d, h, Math.min(h - d, p)).map(a);
    return l ? g.reverse() : g;
  }, t.tickFormat = (u, c) => {
    if (u == null && (u = 10), c == null && (c = n === 10 ? "s" : ","), typeof c != "function" && (!(n % 1) && (c = Zn(c)).precision == null && (c.trim = !0), c = Ld(c)), u === 1 / 0) return c;
    const s = Math.max(1, n * u / t.ticks().length);
    return (f) => {
      let l = f / a(Math.round(i(f)));
      return l * n < n - 0.5 && (l *= n), l <= s ? c(f) : "";
    };
  }, t.nice = () => r(Fx(r(), {
    floor: (u) => a(Math.floor(i(u))),
    ceil: (u) => a(Math.ceil(i(u)))
  })), t;
}
function zx() {
  const e = Bd(lo()).domain([1, 10]);
  return e.copy = () => Ai(e, zx()).base(e.base()), ot.apply(e, arguments), e;
}
function Cm(e) {
  return function(t) {
    return Math.sign(t) * Math.log1p(Math.abs(t / e));
  };
}
function Mm(e) {
  return function(t) {
    return Math.sign(t) * Math.expm1(Math.abs(t)) * e;
  };
}
function Fd(e) {
  var t = 1, r = e(Cm(t), Mm(t));
  return r.constant = function(n) {
    return arguments.length ? e(Cm(t = +n), Mm(t)) : t;
  }, Yt(r);
}
function Wx() {
  var e = Fd(lo());
  return e.copy = function() {
    return Ai(e, Wx()).constant(e.constant());
  }, ot.apply(e, arguments);
}
function Im(e) {
  return function(t) {
    return t < 0 ? -Math.pow(-t, e) : Math.pow(t, e);
  };
}
function vT(e) {
  return e < 0 ? -Math.sqrt(-e) : Math.sqrt(e);
}
function yT(e) {
  return e < 0 ? -e * e : e * e;
}
function zd(e) {
  var t = e(We, We), r = 1;
  function n() {
    return r === 1 ? e(We, We) : r === 0.5 ? e(vT, yT) : e(Im(r), Im(1 / r));
  }
  return t.exponent = function(i) {
    return arguments.length ? (r = +i, n()) : r;
  }, Yt(t);
}
function Wd() {
  var e = zd(lo());
  return e.copy = function() {
    return Ai(e, Wd()).exponent(e.exponent());
  }, ot.apply(e, arguments), e;
}
function mT() {
  return Wd.apply(null, arguments).exponent(0.5);
}
function Rm(e) {
  return Math.sign(e) * e * e;
}
function gT(e) {
  return Math.sign(e) * Math.sqrt(Math.abs(e));
}
function Ux() {
  var e = Nd(), t = [0, 1], r = !1, n;
  function i(a) {
    var o = gT(e(a));
    return isNaN(o) ? n : r ? Math.round(o) : o;
  }
  return i.invert = function(a) {
    return e.invert(Rm(a));
  }, i.domain = function(a) {
    return arguments.length ? (e.domain(a), i) : e.domain();
  }, i.range = function(a) {
    return arguments.length ? (e.range((t = Array.from(a, da)).map(Rm)), i) : t.slice();
  }, i.rangeRound = function(a) {
    return i.range(a).round(!0);
  }, i.round = function(a) {
    return arguments.length ? (r = !!a, i) : r;
  }, i.clamp = function(a) {
    return arguments.length ? (e.clamp(a), i) : e.clamp();
  }, i.unknown = function(a) {
    return arguments.length ? (n = a, i) : n;
  }, i.copy = function() {
    return Ux(e.domain(), t).round(r).clamp(e.clamp()).unknown(n);
  }, ot.apply(i, arguments), Yt(i);
}
function Kx() {
  var e = [], t = [], r = [], n;
  function i() {
    var o = 0, u = Math.max(1, t.length);
    for (r = new Array(u - 1); ++o < u; ) r[o - 1] = _E(e, o / u);
    return a;
  }
  function a(o) {
    return o == null || isNaN(o = +o) ? n : t[Oi(r, o)];
  }
  return a.invertExtent = function(o) {
    var u = t.indexOf(o);
    return u < 0 ? [NaN, NaN] : [
      u > 0 ? r[u - 1] : e[0],
      u < r.length ? r[u] : e[e.length - 1]
    ];
  }, a.domain = function(o) {
    if (!arguments.length) return e.slice();
    e = [];
    for (let u of o) u != null && !isNaN(u = +u) && e.push(u);
    return e.sort(Ut), i();
  }, a.range = function(o) {
    return arguments.length ? (t = Array.from(o), i()) : t.slice();
  }, a.unknown = function(o) {
    return arguments.length ? (n = o, a) : n;
  }, a.quantiles = function() {
    return r.slice();
  }, a.copy = function() {
    return Kx().domain(e).range(t).unknown(n);
  }, ot.apply(a, arguments);
}
function Hx() {
  var e = 0, t = 1, r = 1, n = [0.5], i = [0, 1], a;
  function o(c) {
    return c != null && c <= c ? i[Oi(n, c, 0, r)] : a;
  }
  function u() {
    var c = -1;
    for (n = new Array(r); ++c < r; ) n[c] = ((c + 1) * t - (c - r) * e) / (r + 1);
    return o;
  }
  return o.domain = function(c) {
    return arguments.length ? ([e, t] = c, e = +e, t = +t, u()) : [e, t];
  }, o.range = function(c) {
    return arguments.length ? (r = (i = Array.from(c)).length - 1, u()) : i.slice();
  }, o.invertExtent = function(c) {
    var s = i.indexOf(c);
    return s < 0 ? [NaN, NaN] : s < 1 ? [e, n[0]] : s >= r ? [n[r - 1], t] : [n[s - 1], n[s]];
  }, o.unknown = function(c) {
    return arguments.length && (a = c), o;
  }, o.thresholds = function() {
    return n.slice();
  }, o.copy = function() {
    return Hx().domain([e, t]).range(i).unknown(a);
  }, ot.apply(Yt(o), arguments);
}
function Gx() {
  var e = [0.5], t = [0, 1], r, n = 1;
  function i(a) {
    return a != null && a <= a ? t[Oi(e, a, 0, n)] : r;
  }
  return i.domain = function(a) {
    return arguments.length ? (e = Array.from(a), n = Math.min(e.length, t.length - 1), i) : e.slice();
  }, i.range = function(a) {
    return arguments.length ? (t = Array.from(a), n = Math.min(e.length, t.length - 1), i) : t.slice();
  }, i.invertExtent = function(a) {
    var o = t.indexOf(a);
    return [e[o - 1], e[o]];
  }, i.unknown = function(a) {
    return arguments.length ? (r = a, i) : r;
  }, i.copy = function() {
    return Gx().domain(e).range(t).unknown(r);
  }, ot.apply(i, arguments);
}
const Ks = /* @__PURE__ */ new Date(), Hs = /* @__PURE__ */ new Date();
function Ie(e, t, r, n) {
  function i(a) {
    return e(a = arguments.length === 0 ? /* @__PURE__ */ new Date() : /* @__PURE__ */ new Date(+a)), a;
  }
  return i.floor = (a) => (e(a = /* @__PURE__ */ new Date(+a)), a), i.ceil = (a) => (e(a = new Date(a - 1)), t(a, 1), e(a), a), i.round = (a) => {
    const o = i(a), u = i.ceil(a);
    return a - o < u - a ? o : u;
  }, i.offset = (a, o) => (t(a = /* @__PURE__ */ new Date(+a), o == null ? 1 : Math.floor(o)), a), i.range = (a, o, u) => {
    const c = [];
    if (a = i.ceil(a), u = u == null ? 1 : Math.floor(u), !(a < o) || !(u > 0)) return c;
    let s;
    do
      c.push(s = /* @__PURE__ */ new Date(+a)), t(a, u), e(a);
    while (s < a && a < o);
    return c;
  }, i.filter = (a) => Ie((o) => {
    if (o >= o) for (; e(o), !a(o); ) o.setTime(o - 1);
  }, (o, u) => {
    if (o >= o)
      if (u < 0) for (; ++u <= 0; )
        for (; t(o, -1), !a(o); )
          ;
      else for (; --u >= 0; )
        for (; t(o, 1), !a(o); )
          ;
  }), r && (i.count = (a, o) => (Ks.setTime(+a), Hs.setTime(+o), e(Ks), e(Hs), Math.floor(r(Ks, Hs))), i.every = (a) => (a = Math.floor(a), !isFinite(a) || !(a > 0) ? null : a > 1 ? i.filter(n ? (o) => n(o) % a === 0 : (o) => i.count(0, o) % a === 0) : i)), i;
}
const va = Ie(() => {
}, (e, t) => {
  e.setTime(+e + t);
}, (e, t) => t - e);
va.every = (e) => (e = Math.floor(e), !isFinite(e) || !(e > 0) ? null : e > 1 ? Ie((t) => {
  t.setTime(Math.floor(t / e) * e);
}, (t, r) => {
  t.setTime(+t + r * e);
}, (t, r) => (r - t) / e) : va);
va.range;
const Pt = 1e3, it = Pt * 60, Et = it * 60, Ct = Et * 24, Ud = Ct * 7, km = Ct * 30, Gs = Ct * 365, cr = Ie((e) => {
  e.setTime(e - e.getMilliseconds());
}, (e, t) => {
  e.setTime(+e + t * Pt);
}, (e, t) => (t - e) / Pt, (e) => e.getUTCSeconds());
cr.range;
const Kd = Ie((e) => {
  e.setTime(e - e.getMilliseconds() - e.getSeconds() * Pt);
}, (e, t) => {
  e.setTime(+e + t * it);
}, (e, t) => (t - e) / it, (e) => e.getMinutes());
Kd.range;
const Hd = Ie((e) => {
  e.setUTCSeconds(0, 0);
}, (e, t) => {
  e.setTime(+e + t * it);
}, (e, t) => (t - e) / it, (e) => e.getUTCMinutes());
Hd.range;
const Gd = Ie((e) => {
  e.setTime(e - e.getMilliseconds() - e.getSeconds() * Pt - e.getMinutes() * it);
}, (e, t) => {
  e.setTime(+e + t * Et);
}, (e, t) => (t - e) / Et, (e) => e.getHours());
Gd.range;
const Vd = Ie((e) => {
  e.setUTCMinutes(0, 0, 0);
}, (e, t) => {
  e.setTime(+e + t * Et);
}, (e, t) => (t - e) / Et, (e) => e.getUTCHours());
Vd.range;
const Si = Ie(
  (e) => e.setHours(0, 0, 0, 0),
  (e, t) => e.setDate(e.getDate() + t),
  (e, t) => (t - e - (t.getTimezoneOffset() - e.getTimezoneOffset()) * it) / Ct,
  (e) => e.getDate() - 1
);
Si.range;
const fo = Ie((e) => {
  e.setUTCHours(0, 0, 0, 0);
}, (e, t) => {
  e.setUTCDate(e.getUTCDate() + t);
}, (e, t) => (t - e) / Ct, (e) => e.getUTCDate() - 1);
fo.range;
const Vx = Ie((e) => {
  e.setUTCHours(0, 0, 0, 0);
}, (e, t) => {
  e.setUTCDate(e.getUTCDate() + t);
}, (e, t) => (t - e) / Ct, (e) => Math.floor(e / Ct));
Vx.range;
function Or(e) {
  return Ie((t) => {
    t.setDate(t.getDate() - (t.getDay() + 7 - e) % 7), t.setHours(0, 0, 0, 0);
  }, (t, r) => {
    t.setDate(t.getDate() + r * 7);
  }, (t, r) => (r - t - (r.getTimezoneOffset() - t.getTimezoneOffset()) * it) / Ud);
}
const po = Or(0), ya = Or(1), bT = Or(2), xT = Or(3), Kr = Or(4), wT = Or(5), OT = Or(6);
po.range;
ya.range;
bT.range;
xT.range;
Kr.range;
wT.range;
OT.range;
function _r(e) {
  return Ie((t) => {
    t.setUTCDate(t.getUTCDate() - (t.getUTCDay() + 7 - e) % 7), t.setUTCHours(0, 0, 0, 0);
  }, (t, r) => {
    t.setUTCDate(t.getUTCDate() + r * 7);
  }, (t, r) => (r - t) / Ud);
}
const ho = _r(0), ma = _r(1), _T = _r(2), AT = _r(3), Hr = _r(4), ST = _r(5), PT = _r(6);
ho.range;
ma.range;
_T.range;
AT.range;
Hr.range;
ST.range;
PT.range;
const Yd = Ie((e) => {
  e.setDate(1), e.setHours(0, 0, 0, 0);
}, (e, t) => {
  e.setMonth(e.getMonth() + t);
}, (e, t) => t.getMonth() - e.getMonth() + (t.getFullYear() - e.getFullYear()) * 12, (e) => e.getMonth());
Yd.range;
const Xd = Ie((e) => {
  e.setUTCDate(1), e.setUTCHours(0, 0, 0, 0);
}, (e, t) => {
  e.setUTCMonth(e.getUTCMonth() + t);
}, (e, t) => t.getUTCMonth() - e.getUTCMonth() + (t.getUTCFullYear() - e.getUTCFullYear()) * 12, (e) => e.getUTCMonth());
Xd.range;
const Mt = Ie((e) => {
  e.setMonth(0, 1), e.setHours(0, 0, 0, 0);
}, (e, t) => {
  e.setFullYear(e.getFullYear() + t);
}, (e, t) => t.getFullYear() - e.getFullYear(), (e) => e.getFullYear());
Mt.every = (e) => !isFinite(e = Math.floor(e)) || !(e > 0) ? null : Ie((t) => {
  t.setFullYear(Math.floor(t.getFullYear() / e) * e), t.setMonth(0, 1), t.setHours(0, 0, 0, 0);
}, (t, r) => {
  t.setFullYear(t.getFullYear() + r * e);
});
Mt.range;
const It = Ie((e) => {
  e.setUTCMonth(0, 1), e.setUTCHours(0, 0, 0, 0);
}, (e, t) => {
  e.setUTCFullYear(e.getUTCFullYear() + t);
}, (e, t) => t.getUTCFullYear() - e.getUTCFullYear(), (e) => e.getUTCFullYear());
It.every = (e) => !isFinite(e = Math.floor(e)) || !(e > 0) ? null : Ie((t) => {
  t.setUTCFullYear(Math.floor(t.getUTCFullYear() / e) * e), t.setUTCMonth(0, 1), t.setUTCHours(0, 0, 0, 0);
}, (t, r) => {
  t.setUTCFullYear(t.getUTCFullYear() + r * e);
});
It.range;
function Yx(e, t, r, n, i, a) {
  const o = [
    [cr, 1, Pt],
    [cr, 5, 5 * Pt],
    [cr, 15, 15 * Pt],
    [cr, 30, 30 * Pt],
    [a, 1, it],
    [a, 5, 5 * it],
    [a, 15, 15 * it],
    [a, 30, 30 * it],
    [i, 1, Et],
    [i, 3, 3 * Et],
    [i, 6, 6 * Et],
    [i, 12, 12 * Et],
    [n, 1, Ct],
    [n, 2, 2 * Ct],
    [r, 1, Ud],
    [t, 1, km],
    [t, 3, 3 * km],
    [e, 1, Gs]
  ];
  function u(s, f, l) {
    const d = f < s;
    d && ([s, f] = [f, s]);
    const h = l && typeof l.range == "function" ? l : c(s, f, l), m = h ? h.range(s, +f + 1) : [];
    return d ? m.reverse() : m;
  }
  function c(s, f, l) {
    const d = Math.abs(f - s) / l, h = Md(([, , p]) => p).right(o, d);
    if (h === o.length) return e.every(lf(s / Gs, f / Gs, l));
    if (h === 0) return va.every(Math.max(lf(s, f, l), 1));
    const [m, v] = o[d / o[h - 1][2] < o[h][2] / d ? h - 1 : h];
    return m.every(v);
  }
  return [u, c];
}
const [ET, TT] = Yx(It, Xd, ho, Vx, Vd, Hd), [jT, $T] = Yx(Mt, Yd, po, Si, Gd, Kd);
function Vs(e) {
  if (0 <= e.y && e.y < 100) {
    var t = new Date(-1, e.m, e.d, e.H, e.M, e.S, e.L);
    return t.setFullYear(e.y), t;
  }
  return new Date(e.y, e.m, e.d, e.H, e.M, e.S, e.L);
}
function Ys(e) {
  if (0 <= e.y && e.y < 100) {
    var t = new Date(Date.UTC(-1, e.m, e.d, e.H, e.M, e.S, e.L));
    return t.setUTCFullYear(e.y), t;
  }
  return new Date(Date.UTC(e.y, e.m, e.d, e.H, e.M, e.S, e.L));
}
function _n(e, t, r) {
  return { y: e, m: t, d: r, H: 0, M: 0, S: 0, L: 0 };
}
function CT(e) {
  var t = e.dateTime, r = e.date, n = e.time, i = e.periods, a = e.days, o = e.shortDays, u = e.months, c = e.shortMonths, s = An(i), f = Sn(i), l = An(a), d = Sn(a), h = An(o), m = Sn(o), v = An(u), p = Sn(u), g = An(c), x = Sn(c), w = {
    a: q,
    A: W,
    b: K,
    B: M,
    c: null,
    d: Fm,
    e: Fm,
    f: ej,
    g: lj,
    G: dj,
    H: ZT,
    I: JT,
    j: QT,
    L: Xx,
    m: tj,
    M: rj,
    p: N,
    q: L,
    Q: Um,
    s: Km,
    S: nj,
    u: ij,
    U: aj,
    V: oj,
    w: uj,
    W: cj,
    x: null,
    X: null,
    y: sj,
    Y: fj,
    Z: pj,
    "%": Wm
  }, O = {
    a: H,
    A: V,
    b: J,
    B: Q,
    c: null,
    d: zm,
    e: zm,
    f: mj,
    g: Ej,
    G: jj,
    H: hj,
    I: vj,
    j: yj,
    L: Jx,
    m: gj,
    M: bj,
    p: ne,
    q: re,
    Q: Um,
    s: Km,
    S: xj,
    u: wj,
    U: Oj,
    V: _j,
    w: Aj,
    W: Sj,
    x: null,
    X: null,
    y: Pj,
    Y: Tj,
    Z: $j,
    "%": Wm
  }, y = {
    a: C,
    A: P,
    b: T,
    B: $,
    c: R,
    d: Lm,
    e: Lm,
    f: GT,
    g: qm,
    G: Nm,
    H: Bm,
    I: Bm,
    j: WT,
    L: HT,
    m: zT,
    M: UT,
    p: E,
    q: FT,
    Q: YT,
    s: XT,
    S: KT,
    u: DT,
    U: NT,
    V: qT,
    w: kT,
    W: LT,
    x: I,
    X: k,
    y: qm,
    Y: Nm,
    Z: BT,
    "%": VT
  };
  w.x = b(r, w), w.X = b(n, w), w.c = b(t, w), O.x = b(r, O), O.X = b(n, O), O.c = b(t, O);
  function b(B, G) {
    return function(Z) {
      var j = [], ce = -1, U = 0, ge = B.length, _e, Ne, qt;
      for (Z instanceof Date || (Z = /* @__PURE__ */ new Date(+Z)); ++ce < ge; )
        B.charCodeAt(ce) === 37 && (j.push(B.slice(U, ce)), (Ne = Dm[_e = B.charAt(++ce)]) != null ? _e = B.charAt(++ce) : Ne = _e === "e" ? " " : "0", (qt = G[_e]) && (_e = qt(Z, Ne)), j.push(_e), U = ce + 1);
      return j.push(B.slice(U, ce)), j.join("");
    };
  }
  function _(B, G) {
    return function(Z) {
      var j = _n(1900, void 0, 1), ce = A(j, B, Z += "", 0), U, ge;
      if (ce != Z.length) return null;
      if ("Q" in j) return new Date(j.Q);
      if ("s" in j) return new Date(j.s * 1e3 + ("L" in j ? j.L : 0));
      if (G && !("Z" in j) && (j.Z = 0), "p" in j && (j.H = j.H % 12 + j.p * 12), j.m === void 0 && (j.m = "q" in j ? j.q : 0), "V" in j) {
        if (j.V < 1 || j.V > 53) return null;
        "w" in j || (j.w = 1), "Z" in j ? (U = Ys(_n(j.y, 0, 1)), ge = U.getUTCDay(), U = ge > 4 || ge === 0 ? ma.ceil(U) : ma(U), U = fo.offset(U, (j.V - 1) * 7), j.y = U.getUTCFullYear(), j.m = U.getUTCMonth(), j.d = U.getUTCDate() + (j.w + 6) % 7) : (U = Vs(_n(j.y, 0, 1)), ge = U.getDay(), U = ge > 4 || ge === 0 ? ya.ceil(U) : ya(U), U = Si.offset(U, (j.V - 1) * 7), j.y = U.getFullYear(), j.m = U.getMonth(), j.d = U.getDate() + (j.w + 6) % 7);
      } else ("W" in j || "U" in j) && ("w" in j || (j.w = "u" in j ? j.u % 7 : "W" in j ? 1 : 0), ge = "Z" in j ? Ys(_n(j.y, 0, 1)).getUTCDay() : Vs(_n(j.y, 0, 1)).getDay(), j.m = 0, j.d = "W" in j ? (j.w + 6) % 7 + j.W * 7 - (ge + 5) % 7 : j.w + j.U * 7 - (ge + 6) % 7);
      return "Z" in j ? (j.H += j.Z / 100 | 0, j.M += j.Z % 100, Ys(j)) : Vs(j);
    };
  }
  function A(B, G, Z, j) {
    for (var ce = 0, U = G.length, ge = Z.length, _e, Ne; ce < U; ) {
      if (j >= ge) return -1;
      if (_e = G.charCodeAt(ce++), _e === 37) {
        if (_e = G.charAt(ce++), Ne = y[_e in Dm ? G.charAt(ce++) : _e], !Ne || (j = Ne(B, Z, j)) < 0) return -1;
      } else if (_e != Z.charCodeAt(j++))
        return -1;
    }
    return j;
  }
  function E(B, G, Z) {
    var j = s.exec(G.slice(Z));
    return j ? (B.p = f.get(j[0].toLowerCase()), Z + j[0].length) : -1;
  }
  function C(B, G, Z) {
    var j = h.exec(G.slice(Z));
    return j ? (B.w = m.get(j[0].toLowerCase()), Z + j[0].length) : -1;
  }
  function P(B, G, Z) {
    var j = l.exec(G.slice(Z));
    return j ? (B.w = d.get(j[0].toLowerCase()), Z + j[0].length) : -1;
  }
  function T(B, G, Z) {
    var j = g.exec(G.slice(Z));
    return j ? (B.m = x.get(j[0].toLowerCase()), Z + j[0].length) : -1;
  }
  function $(B, G, Z) {
    var j = v.exec(G.slice(Z));
    return j ? (B.m = p.get(j[0].toLowerCase()), Z + j[0].length) : -1;
  }
  function R(B, G, Z) {
    return A(B, t, G, Z);
  }
  function I(B, G, Z) {
    return A(B, r, G, Z);
  }
  function k(B, G, Z) {
    return A(B, n, G, Z);
  }
  function q(B) {
    return o[B.getDay()];
  }
  function W(B) {
    return a[B.getDay()];
  }
  function K(B) {
    return c[B.getMonth()];
  }
  function M(B) {
    return u[B.getMonth()];
  }
  function N(B) {
    return i[+(B.getHours() >= 12)];
  }
  function L(B) {
    return 1 + ~~(B.getMonth() / 3);
  }
  function H(B) {
    return o[B.getUTCDay()];
  }
  function V(B) {
    return a[B.getUTCDay()];
  }
  function J(B) {
    return c[B.getUTCMonth()];
  }
  function Q(B) {
    return u[B.getUTCMonth()];
  }
  function ne(B) {
    return i[+(B.getUTCHours() >= 12)];
  }
  function re(B) {
    return 1 + ~~(B.getUTCMonth() / 3);
  }
  return {
    format: function(B) {
      var G = b(B += "", w);
      return G.toString = function() {
        return B;
      }, G;
    },
    parse: function(B) {
      var G = _(B += "", !1);
      return G.toString = function() {
        return B;
      }, G;
    },
    utcFormat: function(B) {
      var G = b(B += "", O);
      return G.toString = function() {
        return B;
      }, G;
    },
    utcParse: function(B) {
      var G = _(B += "", !0);
      return G.toString = function() {
        return B;
      }, G;
    }
  };
}
var Dm = { "-": "", _: " ", 0: "0" }, De = /^\s*\d+/, MT = /^%/, IT = /[\\^$*+?|[\]().{}]/g;
function se(e, t, r) {
  var n = e < 0 ? "-" : "", i = (n ? -e : e) + "", a = i.length;
  return n + (a < r ? new Array(r - a + 1).join(t) + i : i);
}
function RT(e) {
  return e.replace(IT, "\\$&");
}
function An(e) {
  return new RegExp("^(?:" + e.map(RT).join("|") + ")", "i");
}
function Sn(e) {
  return new Map(e.map((t, r) => [t.toLowerCase(), r]));
}
function kT(e, t, r) {
  var n = De.exec(t.slice(r, r + 1));
  return n ? (e.w = +n[0], r + n[0].length) : -1;
}
function DT(e, t, r) {
  var n = De.exec(t.slice(r, r + 1));
  return n ? (e.u = +n[0], r + n[0].length) : -1;
}
function NT(e, t, r) {
  var n = De.exec(t.slice(r, r + 2));
  return n ? (e.U = +n[0], r + n[0].length) : -1;
}
function qT(e, t, r) {
  var n = De.exec(t.slice(r, r + 2));
  return n ? (e.V = +n[0], r + n[0].length) : -1;
}
function LT(e, t, r) {
  var n = De.exec(t.slice(r, r + 2));
  return n ? (e.W = +n[0], r + n[0].length) : -1;
}
function Nm(e, t, r) {
  var n = De.exec(t.slice(r, r + 4));
  return n ? (e.y = +n[0], r + n[0].length) : -1;
}
function qm(e, t, r) {
  var n = De.exec(t.slice(r, r + 2));
  return n ? (e.y = +n[0] + (+n[0] > 68 ? 1900 : 2e3), r + n[0].length) : -1;
}
function BT(e, t, r) {
  var n = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(t.slice(r, r + 6));
  return n ? (e.Z = n[1] ? 0 : -(n[2] + (n[3] || "00")), r + n[0].length) : -1;
}
function FT(e, t, r) {
  var n = De.exec(t.slice(r, r + 1));
  return n ? (e.q = n[0] * 3 - 3, r + n[0].length) : -1;
}
function zT(e, t, r) {
  var n = De.exec(t.slice(r, r + 2));
  return n ? (e.m = n[0] - 1, r + n[0].length) : -1;
}
function Lm(e, t, r) {
  var n = De.exec(t.slice(r, r + 2));
  return n ? (e.d = +n[0], r + n[0].length) : -1;
}
function WT(e, t, r) {
  var n = De.exec(t.slice(r, r + 3));
  return n ? (e.m = 0, e.d = +n[0], r + n[0].length) : -1;
}
function Bm(e, t, r) {
  var n = De.exec(t.slice(r, r + 2));
  return n ? (e.H = +n[0], r + n[0].length) : -1;
}
function UT(e, t, r) {
  var n = De.exec(t.slice(r, r + 2));
  return n ? (e.M = +n[0], r + n[0].length) : -1;
}
function KT(e, t, r) {
  var n = De.exec(t.slice(r, r + 2));
  return n ? (e.S = +n[0], r + n[0].length) : -1;
}
function HT(e, t, r) {
  var n = De.exec(t.slice(r, r + 3));
  return n ? (e.L = +n[0], r + n[0].length) : -1;
}
function GT(e, t, r) {
  var n = De.exec(t.slice(r, r + 6));
  return n ? (e.L = Math.floor(n[0] / 1e3), r + n[0].length) : -1;
}
function VT(e, t, r) {
  var n = MT.exec(t.slice(r, r + 1));
  return n ? r + n[0].length : -1;
}
function YT(e, t, r) {
  var n = De.exec(t.slice(r));
  return n ? (e.Q = +n[0], r + n[0].length) : -1;
}
function XT(e, t, r) {
  var n = De.exec(t.slice(r));
  return n ? (e.s = +n[0], r + n[0].length) : -1;
}
function Fm(e, t) {
  return se(e.getDate(), t, 2);
}
function ZT(e, t) {
  return se(e.getHours(), t, 2);
}
function JT(e, t) {
  return se(e.getHours() % 12 || 12, t, 2);
}
function QT(e, t) {
  return se(1 + Si.count(Mt(e), e), t, 3);
}
function Xx(e, t) {
  return se(e.getMilliseconds(), t, 3);
}
function ej(e, t) {
  return Xx(e, t) + "000";
}
function tj(e, t) {
  return se(e.getMonth() + 1, t, 2);
}
function rj(e, t) {
  return se(e.getMinutes(), t, 2);
}
function nj(e, t) {
  return se(e.getSeconds(), t, 2);
}
function ij(e) {
  var t = e.getDay();
  return t === 0 ? 7 : t;
}
function aj(e, t) {
  return se(po.count(Mt(e) - 1, e), t, 2);
}
function Zx(e) {
  var t = e.getDay();
  return t >= 4 || t === 0 ? Kr(e) : Kr.ceil(e);
}
function oj(e, t) {
  return e = Zx(e), se(Kr.count(Mt(e), e) + (Mt(e).getDay() === 4), t, 2);
}
function uj(e) {
  return e.getDay();
}
function cj(e, t) {
  return se(ya.count(Mt(e) - 1, e), t, 2);
}
function sj(e, t) {
  return se(e.getFullYear() % 100, t, 2);
}
function lj(e, t) {
  return e = Zx(e), se(e.getFullYear() % 100, t, 2);
}
function fj(e, t) {
  return se(e.getFullYear() % 1e4, t, 4);
}
function dj(e, t) {
  var r = e.getDay();
  return e = r >= 4 || r === 0 ? Kr(e) : Kr.ceil(e), se(e.getFullYear() % 1e4, t, 4);
}
function pj(e) {
  var t = e.getTimezoneOffset();
  return (t > 0 ? "-" : (t *= -1, "+")) + se(t / 60 | 0, "0", 2) + se(t % 60, "0", 2);
}
function zm(e, t) {
  return se(e.getUTCDate(), t, 2);
}
function hj(e, t) {
  return se(e.getUTCHours(), t, 2);
}
function vj(e, t) {
  return se(e.getUTCHours() % 12 || 12, t, 2);
}
function yj(e, t) {
  return se(1 + fo.count(It(e), e), t, 3);
}
function Jx(e, t) {
  return se(e.getUTCMilliseconds(), t, 3);
}
function mj(e, t) {
  return Jx(e, t) + "000";
}
function gj(e, t) {
  return se(e.getUTCMonth() + 1, t, 2);
}
function bj(e, t) {
  return se(e.getUTCMinutes(), t, 2);
}
function xj(e, t) {
  return se(e.getUTCSeconds(), t, 2);
}
function wj(e) {
  var t = e.getUTCDay();
  return t === 0 ? 7 : t;
}
function Oj(e, t) {
  return se(ho.count(It(e) - 1, e), t, 2);
}
function Qx(e) {
  var t = e.getUTCDay();
  return t >= 4 || t === 0 ? Hr(e) : Hr.ceil(e);
}
function _j(e, t) {
  return e = Qx(e), se(Hr.count(It(e), e) + (It(e).getUTCDay() === 4), t, 2);
}
function Aj(e) {
  return e.getUTCDay();
}
function Sj(e, t) {
  return se(ma.count(It(e) - 1, e), t, 2);
}
function Pj(e, t) {
  return se(e.getUTCFullYear() % 100, t, 2);
}
function Ej(e, t) {
  return e = Qx(e), se(e.getUTCFullYear() % 100, t, 2);
}
function Tj(e, t) {
  return se(e.getUTCFullYear() % 1e4, t, 4);
}
function jj(e, t) {
  var r = e.getUTCDay();
  return e = r >= 4 || r === 0 ? Hr(e) : Hr.ceil(e), se(e.getUTCFullYear() % 1e4, t, 4);
}
function $j() {
  return "+0000";
}
function Wm() {
  return "%";
}
function Um(e) {
  return +e;
}
function Km(e) {
  return Math.floor(+e / 1e3);
}
var Tr, ew, tw;
Cj({
  dateTime: "%x, %X",
  date: "%-m/%-d/%Y",
  time: "%-I:%M:%S %p",
  periods: ["AM", "PM"],
  days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
});
function Cj(e) {
  return Tr = CT(e), ew = Tr.format, Tr.parse, tw = Tr.utcFormat, Tr.utcParse, Tr;
}
function Mj(e) {
  return new Date(e);
}
function Ij(e) {
  return e instanceof Date ? +e : +/* @__PURE__ */ new Date(+e);
}
function Zd(e, t, r, n, i, a, o, u, c, s) {
  var f = Nd(), l = f.invert, d = f.domain, h = s(".%L"), m = s(":%S"), v = s("%I:%M"), p = s("%I %p"), g = s("%a %d"), x = s("%b %d"), w = s("%B"), O = s("%Y");
  function y(b) {
    return (c(b) < b ? h : u(b) < b ? m : o(b) < b ? v : a(b) < b ? p : n(b) < b ? i(b) < b ? g : x : r(b) < b ? w : O)(b);
  }
  return f.invert = function(b) {
    return new Date(l(b));
  }, f.domain = function(b) {
    return arguments.length ? d(Array.from(b, Ij)) : d().map(Mj);
  }, f.ticks = function(b) {
    var _ = d();
    return e(_[0], _[_.length - 1], b ?? 10);
  }, f.tickFormat = function(b, _) {
    return _ == null ? y : s(_);
  }, f.nice = function(b) {
    var _ = d();
    return (!b || typeof b.range != "function") && (b = t(_[0], _[_.length - 1], b ?? 10)), b ? d(Fx(_, b)) : f;
  }, f.copy = function() {
    return Ai(f, Zd(e, t, r, n, i, a, o, u, c, s));
  }, f;
}
function Rj() {
  return ot.apply(Zd(jT, $T, Mt, Yd, po, Si, Gd, Kd, cr, ew).domain([new Date(2e3, 0, 1), new Date(2e3, 0, 2)]), arguments);
}
function kj() {
  return ot.apply(Zd(ET, TT, It, Xd, ho, fo, Vd, Hd, cr, tw).domain([Date.UTC(2e3, 0, 1), Date.UTC(2e3, 0, 2)]), arguments);
}
function vo() {
  var e = 0, t = 1, r, n, i, a, o = We, u = !1, c;
  function s(l) {
    return l == null || isNaN(l = +l) ? c : o(i === 0 ? 0.5 : (l = (a(l) - r) * i, u ? Math.max(0, Math.min(1, l)) : l));
  }
  s.domain = function(l) {
    return arguments.length ? ([e, t] = l, r = a(e = +e), n = a(t = +t), i = r === n ? 0 : 1 / (n - r), s) : [e, t];
  }, s.clamp = function(l) {
    return arguments.length ? (u = !!l, s) : u;
  }, s.interpolator = function(l) {
    return arguments.length ? (o = l, s) : o;
  };
  function f(l) {
    return function(d) {
      var h, m;
      return arguments.length ? ([h, m] = d, o = l(h, m), s) : [o(0), o(1)];
    };
  }
  return s.range = f(mn), s.rangeRound = f(Dd), s.unknown = function(l) {
    return arguments.length ? (c = l, s) : c;
  }, function(l) {
    return a = l, r = l(e), n = l(t), i = r === n ? 0 : 1 / (n - r), s;
  };
}
function Xt(e, t) {
  return t.domain(e.domain()).interpolator(e.interpolator()).clamp(e.clamp()).unknown(e.unknown());
}
function rw() {
  var e = Yt(vo()(We));
  return e.copy = function() {
    return Xt(e, rw());
  }, Dt.apply(e, arguments);
}
function nw() {
  var e = Bd(vo()).domain([1, 10]);
  return e.copy = function() {
    return Xt(e, nw()).base(e.base());
  }, Dt.apply(e, arguments);
}
function iw() {
  var e = Fd(vo());
  return e.copy = function() {
    return Xt(e, iw()).constant(e.constant());
  }, Dt.apply(e, arguments);
}
function Jd() {
  var e = zd(vo());
  return e.copy = function() {
    return Xt(e, Jd()).exponent(e.exponent());
  }, Dt.apply(e, arguments);
}
function Dj() {
  return Jd.apply(null, arguments).exponent(0.5);
}
function aw() {
  var e = [], t = We;
  function r(n) {
    if (n != null && !isNaN(n = +n)) return t((Oi(e, n, 1) - 1) / (e.length - 1));
  }
  return r.domain = function(n) {
    if (!arguments.length) return e.slice();
    e = [];
    for (let i of n) i != null && !isNaN(i = +i) && e.push(i);
    return e.sort(Ut), r;
  }, r.interpolator = function(n) {
    return arguments.length ? (t = n, r) : t;
  }, r.range = function() {
    return e.map((n, i) => t(i / (e.length - 1)));
  }, r.quantiles = function(n) {
    return Array.from({ length: n + 1 }, (i, a) => OE(e, a / n));
  }, r.copy = function() {
    return aw(t).domain(e);
  }, Dt.apply(r, arguments);
}
function yo() {
  var e = 0, t = 0.5, r = 1, n = 1, i, a, o, u, c, s = We, f, l = !1, d;
  function h(v) {
    return isNaN(v = +v) ? d : (v = 0.5 + ((v = +f(v)) - a) * (n * v < n * a ? u : c), s(l ? Math.max(0, Math.min(1, v)) : v));
  }
  h.domain = function(v) {
    return arguments.length ? ([e, t, r] = v, i = f(e = +e), a = f(t = +t), o = f(r = +r), u = i === a ? 0 : 0.5 / (a - i), c = a === o ? 0 : 0.5 / (o - a), n = a < i ? -1 : 1, h) : [e, t, r];
  }, h.clamp = function(v) {
    return arguments.length ? (l = !!v, h) : l;
  }, h.interpolator = function(v) {
    return arguments.length ? (s = v, h) : s;
  };
  function m(v) {
    return function(p) {
      var g, x, w;
      return arguments.length ? ([g, x, w] = p, s = VE(v, [g, x, w]), h) : [s(0), s(0.5), s(1)];
    };
  }
  return h.range = m(mn), h.rangeRound = m(Dd), h.unknown = function(v) {
    return arguments.length ? (d = v, h) : d;
  }, function(v) {
    return f = v, i = v(e), a = v(t), o = v(r), u = i === a ? 0 : 0.5 / (a - i), c = a === o ? 0 : 0.5 / (o - a), n = a < i ? -1 : 1, h;
  };
}
function ow() {
  var e = Yt(yo()(We));
  return e.copy = function() {
    return Xt(e, ow());
  }, Dt.apply(e, arguments);
}
function uw() {
  var e = Bd(yo()).domain([0.1, 1, 10]);
  return e.copy = function() {
    return Xt(e, uw()).base(e.base());
  }, Dt.apply(e, arguments);
}
function cw() {
  var e = Fd(yo());
  return e.copy = function() {
    return Xt(e, cw()).constant(e.constant());
  }, Dt.apply(e, arguments);
}
function Qd() {
  var e = zd(yo());
  return e.copy = function() {
    return Xt(e, Qd()).exponent(e.exponent());
  }, Dt.apply(e, arguments);
}
function Nj() {
  return Qd.apply(null, arguments).exponent(0.5);
}
const Hm = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  scaleBand: Gn,
  scaleDiverging: ow,
  scaleDivergingLog: uw,
  scaleDivergingPow: Qd,
  scaleDivergingSqrt: Nj,
  scaleDivergingSymlog: cw,
  scaleIdentity: Bx,
  scaleImplicit: ff,
  scaleLinear: ha,
  scaleLog: zx,
  scaleOrdinal: Id,
  scalePoint: Rn,
  scalePow: Wd,
  scaleQuantile: Kx,
  scaleQuantize: Hx,
  scaleRadial: Ux,
  scaleSequential: rw,
  scaleSequentialLog: nw,
  scaleSequentialPow: Jd,
  scaleSequentialQuantile: aw,
  scaleSequentialSqrt: Dj,
  scaleSequentialSymlog: iw,
  scaleSqrt: mT,
  scaleSymlog: Wx,
  scaleThreshold: Gx,
  scaleTime: Rj,
  scaleUtc: kj,
  tickFormat: Lx
}, Symbol.toStringTag, { value: "Module" }));
var Xs, Gm;
function mo() {
  if (Gm) return Xs;
  Gm = 1;
  var e = pn();
  function t(r, n, i) {
    for (var a = -1, o = r.length; ++a < o; ) {
      var u = r[a], c = n(u);
      if (c != null && (s === void 0 ? c === c && !e(c) : i(c, s)))
        var s = c, f = u;
    }
    return f;
  }
  return Xs = t, Xs;
}
var Zs, Vm;
function sw() {
  if (Vm) return Zs;
  Vm = 1;
  function e(t, r) {
    return t > r;
  }
  return Zs = e, Zs;
}
var Js, Ym;
function qj() {
  if (Ym) return Js;
  Ym = 1;
  var e = mo(), t = sw(), r = yn();
  function n(i) {
    return i && i.length ? e(i, r, t) : void 0;
  }
  return Js = n, Js;
}
var Lj = qj();
const zt = /* @__PURE__ */ ye(Lj);
var Qs, Xm;
function lw() {
  if (Xm) return Qs;
  Xm = 1;
  function e(t, r) {
    return t < r;
  }
  return Qs = e, Qs;
}
var el, Zm;
function Bj() {
  if (Zm) return el;
  Zm = 1;
  var e = mo(), t = lw(), r = yn();
  function n(i) {
    return i && i.length ? e(i, r, t) : void 0;
  }
  return el = n, el;
}
var Fj = Bj();
const go = /* @__PURE__ */ ye(Fj);
var tl, Jm;
function zj() {
  if (Jm) return tl;
  Jm = 1;
  var e = vd(), t = Ot(), r = gx(), n = He();
  function i(a, o) {
    var u = n(a) ? e : r;
    return u(a, t(o, 3));
  }
  return tl = i, tl;
}
var rl, Qm;
function Wj() {
  if (Qm) return rl;
  Qm = 1;
  var e = yx(), t = zj();
  function r(n, i) {
    return e(t(n, i), 1);
  }
  return rl = r, rl;
}
var Uj = Wj();
const Kj = /* @__PURE__ */ ye(Uj);
var nl, eg;
function Hj() {
  if (eg) return nl;
  eg = 1;
  var e = Td();
  function t(r, n) {
    return e(r, n);
  }
  return nl = t, nl;
}
var Gj = Hj();
const mr = /* @__PURE__ */ ye(Gj);
var gn = 1e9, Vj = {
  // These values must be integers within the stated ranges (inclusive).
  // Most of these values can be changed during run-time using `Decimal.config`.
  // The maximum number of significant digits of the result of a calculation or base conversion.
  // E.g. `Decimal.config({ precision: 20 });`
  precision: 20,
  // 1 to MAX_DIGITS
  // The rounding mode used by default by `toInteger`, `toDecimalPlaces`, `toExponential`,
  // `toFixed`, `toPrecision` and `toSignificantDigits`.
  //
  // ROUND_UP         0 Away from zero.
  // ROUND_DOWN       1 Towards zero.
  // ROUND_CEIL       2 Towards +Infinity.
  // ROUND_FLOOR      3 Towards -Infinity.
  // ROUND_HALF_UP    4 Towards nearest neighbour. If equidistant, up.
  // ROUND_HALF_DOWN  5 Towards nearest neighbour. If equidistant, down.
  // ROUND_HALF_EVEN  6 Towards nearest neighbour. If equidistant, towards even neighbour.
  // ROUND_HALF_CEIL  7 Towards nearest neighbour. If equidistant, towards +Infinity.
  // ROUND_HALF_FLOOR 8 Towards nearest neighbour. If equidistant, towards -Infinity.
  //
  // E.g.
  // `Decimal.rounding = 4;`
  // `Decimal.rounding = Decimal.ROUND_HALF_UP;`
  rounding: 4,
  // 0 to 8
  // The exponent value at and beneath which `toString` returns exponential notation.
  // JavaScript numbers: -7
  toExpNeg: -7,
  // 0 to -MAX_E
  // The exponent value at and above which `toString` returns exponential notation.
  // JavaScript numbers: 21
  toExpPos: 21,
  // 0 to MAX_E
  // The natural logarithm of 10.
  // 115 digits
  LN10: "2.302585092994045684017991454684364207601101488628772976033327900967572609677352480235997205089598298341967784042286"
}, tp, Ae = !0, at = "[DecimalError] ", dr = at + "Invalid argument: ", ep = at + "Exponent out of range: ", bn = Math.floor, ir = Math.pow, Yj = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i, Ze, Re = 1e7, Oe = 7, fw = 9007199254740991, ga = bn(fw / Oe), Y = {};
Y.absoluteValue = Y.abs = function() {
  var e = new this.constructor(this);
  return e.s && (e.s = 1), e;
};
Y.comparedTo = Y.cmp = function(e) {
  var t, r, n, i, a = this;
  if (e = new a.constructor(e), a.s !== e.s) return a.s || -e.s;
  if (a.e !== e.e) return a.e > e.e ^ a.s < 0 ? 1 : -1;
  for (n = a.d.length, i = e.d.length, t = 0, r = n < i ? n : i; t < r; ++t)
    if (a.d[t] !== e.d[t]) return a.d[t] > e.d[t] ^ a.s < 0 ? 1 : -1;
  return n === i ? 0 : n > i ^ a.s < 0 ? 1 : -1;
};
Y.decimalPlaces = Y.dp = function() {
  var e = this, t = e.d.length - 1, r = (t - e.e) * Oe;
  if (t = e.d[t], t) for (; t % 10 == 0; t /= 10) r--;
  return r < 0 ? 0 : r;
};
Y.dividedBy = Y.div = function(e) {
  return $t(this, new this.constructor(e));
};
Y.dividedToIntegerBy = Y.idiv = function(e) {
  var t = this, r = t.constructor;
  return me($t(t, new r(e), 0, 1), r.precision);
};
Y.equals = Y.eq = function(e) {
  return !this.cmp(e);
};
Y.exponent = function() {
  return Te(this);
};
Y.greaterThan = Y.gt = function(e) {
  return this.cmp(e) > 0;
};
Y.greaterThanOrEqualTo = Y.gte = function(e) {
  return this.cmp(e) >= 0;
};
Y.isInteger = Y.isint = function() {
  return this.e > this.d.length - 2;
};
Y.isNegative = Y.isneg = function() {
  return this.s < 0;
};
Y.isPositive = Y.ispos = function() {
  return this.s > 0;
};
Y.isZero = function() {
  return this.s === 0;
};
Y.lessThan = Y.lt = function(e) {
  return this.cmp(e) < 0;
};
Y.lessThanOrEqualTo = Y.lte = function(e) {
  return this.cmp(e) < 1;
};
Y.logarithm = Y.log = function(e) {
  var t, r = this, n = r.constructor, i = n.precision, a = i + 5;
  if (e === void 0)
    e = new n(10);
  else if (e = new n(e), e.s < 1 || e.eq(Ze)) throw Error(at + "NaN");
  if (r.s < 1) throw Error(at + (r.s ? "NaN" : "-Infinity"));
  return r.eq(Ze) ? new n(0) : (Ae = !1, t = $t(Jn(r, a), Jn(e, a), a), Ae = !0, me(t, i));
};
Y.minus = Y.sub = function(e) {
  var t = this;
  return e = new t.constructor(e), t.s == e.s ? hw(t, e) : dw(t, (e.s = -e.s, e));
};
Y.modulo = Y.mod = function(e) {
  var t, r = this, n = r.constructor, i = n.precision;
  if (e = new n(e), !e.s) throw Error(at + "NaN");
  return r.s ? (Ae = !1, t = $t(r, e, 0, 1).times(e), Ae = !0, r.minus(t)) : me(new n(r), i);
};
Y.naturalExponential = Y.exp = function() {
  return pw(this);
};
Y.naturalLogarithm = Y.ln = function() {
  return Jn(this);
};
Y.negated = Y.neg = function() {
  var e = new this.constructor(this);
  return e.s = -e.s || 0, e;
};
Y.plus = Y.add = function(e) {
  var t = this;
  return e = new t.constructor(e), t.s == e.s ? dw(t, e) : hw(t, (e.s = -e.s, e));
};
Y.precision = Y.sd = function(e) {
  var t, r, n, i = this;
  if (e !== void 0 && e !== !!e && e !== 1 && e !== 0) throw Error(dr + e);
  if (t = Te(i) + 1, n = i.d.length - 1, r = n * Oe + 1, n = i.d[n], n) {
    for (; n % 10 == 0; n /= 10) r--;
    for (n = i.d[0]; n >= 10; n /= 10) r++;
  }
  return e && t > r ? t : r;
};
Y.squareRoot = Y.sqrt = function() {
  var e, t, r, n, i, a, o, u = this, c = u.constructor;
  if (u.s < 1) {
    if (!u.s) return new c(0);
    throw Error(at + "NaN");
  }
  for (e = Te(u), Ae = !1, i = Math.sqrt(+u), i == 0 || i == 1 / 0 ? (t = vt(u.d), (t.length + e) % 2 == 0 && (t += "0"), i = Math.sqrt(t), e = bn((e + 1) / 2) - (e < 0 || e % 2), i == 1 / 0 ? t = "5e" + e : (t = i.toExponential(), t = t.slice(0, t.indexOf("e") + 1) + e), n = new c(t)) : n = new c(i.toString()), r = c.precision, i = o = r + 3; ; )
    if (a = n, n = a.plus($t(u, a, o + 2)).times(0.5), vt(a.d).slice(0, o) === (t = vt(n.d)).slice(0, o)) {
      if (t = t.slice(o - 3, o + 1), i == o && t == "4999") {
        if (me(a, r + 1, 0), a.times(a).eq(u)) {
          n = a;
          break;
        }
      } else if (t != "9999")
        break;
      o += 4;
    }
  return Ae = !0, me(n, r);
};
Y.times = Y.mul = function(e) {
  var t, r, n, i, a, o, u, c, s, f = this, l = f.constructor, d = f.d, h = (e = new l(e)).d;
  if (!f.s || !e.s) return new l(0);
  for (e.s *= f.s, r = f.e + e.e, c = d.length, s = h.length, c < s && (a = d, d = h, h = a, o = c, c = s, s = o), a = [], o = c + s, n = o; n--; ) a.push(0);
  for (n = s; --n >= 0; ) {
    for (t = 0, i = c + n; i > n; )
      u = a[i] + h[n] * d[i - n - 1] + t, a[i--] = u % Re | 0, t = u / Re | 0;
    a[i] = (a[i] + t) % Re | 0;
  }
  for (; !a[--o]; ) a.pop();
  return t ? ++r : a.shift(), e.d = a, e.e = r, Ae ? me(e, l.precision) : e;
};
Y.toDecimalPlaces = Y.todp = function(e, t) {
  var r = this, n = r.constructor;
  return r = new n(r), e === void 0 ? r : (xt(e, 0, gn), t === void 0 ? t = n.rounding : xt(t, 0, 8), me(r, e + Te(r) + 1, t));
};
Y.toExponential = function(e, t) {
  var r, n = this, i = n.constructor;
  return e === void 0 ? r = gr(n, !0) : (xt(e, 0, gn), t === void 0 ? t = i.rounding : xt(t, 0, 8), n = me(new i(n), e + 1, t), r = gr(n, !0, e + 1)), r;
};
Y.toFixed = function(e, t) {
  var r, n, i = this, a = i.constructor;
  return e === void 0 ? gr(i) : (xt(e, 0, gn), t === void 0 ? t = a.rounding : xt(t, 0, 8), n = me(new a(i), e + Te(i) + 1, t), r = gr(n.abs(), !1, e + Te(n) + 1), i.isneg() && !i.isZero() ? "-" + r : r);
};
Y.toInteger = Y.toint = function() {
  var e = this, t = e.constructor;
  return me(new t(e), Te(e) + 1, t.rounding);
};
Y.toNumber = function() {
  return +this;
};
Y.toPower = Y.pow = function(e) {
  var t, r, n, i, a, o, u = this, c = u.constructor, s = 12, f = +(e = new c(e));
  if (!e.s) return new c(Ze);
  if (u = new c(u), !u.s) {
    if (e.s < 1) throw Error(at + "Infinity");
    return u;
  }
  if (u.eq(Ze)) return u;
  if (n = c.precision, e.eq(Ze)) return me(u, n);
  if (t = e.e, r = e.d.length - 1, o = t >= r, a = u.s, o) {
    if ((r = f < 0 ? -f : f) <= fw) {
      for (i = new c(Ze), t = Math.ceil(n / Oe + 4), Ae = !1; r % 2 && (i = i.times(u), rg(i.d, t)), r = bn(r / 2), r !== 0; )
        u = u.times(u), rg(u.d, t);
      return Ae = !0, e.s < 0 ? new c(Ze).div(i) : me(i, n);
    }
  } else if (a < 0) throw Error(at + "NaN");
  return a = a < 0 && e.d[Math.max(t, r)] & 1 ? -1 : 1, u.s = 1, Ae = !1, i = e.times(Jn(u, n + s)), Ae = !0, i = pw(i), i.s = a, i;
};
Y.toPrecision = function(e, t) {
  var r, n, i = this, a = i.constructor;
  return e === void 0 ? (r = Te(i), n = gr(i, r <= a.toExpNeg || r >= a.toExpPos)) : (xt(e, 1, gn), t === void 0 ? t = a.rounding : xt(t, 0, 8), i = me(new a(i), e, t), r = Te(i), n = gr(i, e <= r || r <= a.toExpNeg, e)), n;
};
Y.toSignificantDigits = Y.tosd = function(e, t) {
  var r = this, n = r.constructor;
  return e === void 0 ? (e = n.precision, t = n.rounding) : (xt(e, 1, gn), t === void 0 ? t = n.rounding : xt(t, 0, 8)), me(new n(r), e, t);
};
Y.toString = Y.valueOf = Y.val = Y.toJSON = Y[Symbol.for("nodejs.util.inspect.custom")] = function() {
  var e = this, t = Te(e), r = e.constructor;
  return gr(e, t <= r.toExpNeg || t >= r.toExpPos);
};
function dw(e, t) {
  var r, n, i, a, o, u, c, s, f = e.constructor, l = f.precision;
  if (!e.s || !t.s)
    return t.s || (t = new f(e)), Ae ? me(t, l) : t;
  if (c = e.d, s = t.d, o = e.e, i = t.e, c = c.slice(), a = o - i, a) {
    for (a < 0 ? (n = c, a = -a, u = s.length) : (n = s, i = o, u = c.length), o = Math.ceil(l / Oe), u = o > u ? o + 1 : u + 1, a > u && (a = u, n.length = 1), n.reverse(); a--; ) n.push(0);
    n.reverse();
  }
  for (u = c.length, a = s.length, u - a < 0 && (a = u, n = s, s = c, c = n), r = 0; a; )
    r = (c[--a] = c[a] + s[a] + r) / Re | 0, c[a] %= Re;
  for (r && (c.unshift(r), ++i), u = c.length; c[--u] == 0; ) c.pop();
  return t.d = c, t.e = i, Ae ? me(t, l) : t;
}
function xt(e, t, r) {
  if (e !== ~~e || e < t || e > r)
    throw Error(dr + e);
}
function vt(e) {
  var t, r, n, i = e.length - 1, a = "", o = e[0];
  if (i > 0) {
    for (a += o, t = 1; t < i; t++)
      n = e[t] + "", r = Oe - n.length, r && (a += Bt(r)), a += n;
    o = e[t], n = o + "", r = Oe - n.length, r && (a += Bt(r));
  } else if (o === 0)
    return "0";
  for (; o % 10 === 0; ) o /= 10;
  return a + o;
}
var $t = /* @__PURE__ */ (function() {
  function e(n, i) {
    var a, o = 0, u = n.length;
    for (n = n.slice(); u--; )
      a = n[u] * i + o, n[u] = a % Re | 0, o = a / Re | 0;
    return o && n.unshift(o), n;
  }
  function t(n, i, a, o) {
    var u, c;
    if (a != o)
      c = a > o ? 1 : -1;
    else
      for (u = c = 0; u < a; u++)
        if (n[u] != i[u]) {
          c = n[u] > i[u] ? 1 : -1;
          break;
        }
    return c;
  }
  function r(n, i, a) {
    for (var o = 0; a--; )
      n[a] -= o, o = n[a] < i[a] ? 1 : 0, n[a] = o * Re + n[a] - i[a];
    for (; !n[0] && n.length > 1; ) n.shift();
  }
  return function(n, i, a, o) {
    var u, c, s, f, l, d, h, m, v, p, g, x, w, O, y, b, _, A, E = n.constructor, C = n.s == i.s ? 1 : -1, P = n.d, T = i.d;
    if (!n.s) return new E(n);
    if (!i.s) throw Error(at + "Division by zero");
    for (c = n.e - i.e, _ = T.length, y = P.length, h = new E(C), m = h.d = [], s = 0; T[s] == (P[s] || 0); ) ++s;
    if (T[s] > (P[s] || 0) && --c, a == null ? x = a = E.precision : o ? x = a + (Te(n) - Te(i)) + 1 : x = a, x < 0) return new E(0);
    if (x = x / Oe + 2 | 0, s = 0, _ == 1)
      for (f = 0, T = T[0], x++; (s < y || f) && x--; s++)
        w = f * Re + (P[s] || 0), m[s] = w / T | 0, f = w % T | 0;
    else {
      for (f = Re / (T[0] + 1) | 0, f > 1 && (T = e(T, f), P = e(P, f), _ = T.length, y = P.length), O = _, v = P.slice(0, _), p = v.length; p < _; ) v[p++] = 0;
      A = T.slice(), A.unshift(0), b = T[0], T[1] >= Re / 2 && ++b;
      do
        f = 0, u = t(T, v, _, p), u < 0 ? (g = v[0], _ != p && (g = g * Re + (v[1] || 0)), f = g / b | 0, f > 1 ? (f >= Re && (f = Re - 1), l = e(T, f), d = l.length, p = v.length, u = t(l, v, d, p), u == 1 && (f--, r(l, _ < d ? A : T, d))) : (f == 0 && (u = f = 1), l = T.slice()), d = l.length, d < p && l.unshift(0), r(v, l, p), u == -1 && (p = v.length, u = t(T, v, _, p), u < 1 && (f++, r(v, _ < p ? A : T, p))), p = v.length) : u === 0 && (f++, v = [0]), m[s++] = f, u && v[0] ? v[p++] = P[O] || 0 : (v = [P[O]], p = 1);
      while ((O++ < y || v[0] !== void 0) && x--);
    }
    return m[0] || m.shift(), h.e = c, me(h, o ? a + Te(h) + 1 : a);
  };
})();
function pw(e, t) {
  var r, n, i, a, o, u, c = 0, s = 0, f = e.constructor, l = f.precision;
  if (Te(e) > 16) throw Error(ep + Te(e));
  if (!e.s) return new f(Ze);
  for (Ae = !1, u = l, o = new f(0.03125); e.abs().gte(0.1); )
    e = e.times(o), s += 5;
  for (n = Math.log(ir(2, s)) / Math.LN10 * 2 + 5 | 0, u += n, r = i = a = new f(Ze), f.precision = u; ; ) {
    if (i = me(i.times(e), u), r = r.times(++c), o = a.plus($t(i, r, u)), vt(o.d).slice(0, u) === vt(a.d).slice(0, u)) {
      for (; s--; ) a = me(a.times(a), u);
      return f.precision = l, t == null ? (Ae = !0, me(a, l)) : a;
    }
    a = o;
  }
}
function Te(e) {
  for (var t = e.e * Oe, r = e.d[0]; r >= 10; r /= 10) t++;
  return t;
}
function il(e, t, r) {
  if (t > e.LN10.sd())
    throw Ae = !0, r && (e.precision = r), Error(at + "LN10 precision limit exceeded");
  return me(new e(e.LN10), t);
}
function Bt(e) {
  for (var t = ""; e--; ) t += "0";
  return t;
}
function Jn(e, t) {
  var r, n, i, a, o, u, c, s, f, l = 1, d = 10, h = e, m = h.d, v = h.constructor, p = v.precision;
  if (h.s < 1) throw Error(at + (h.s ? "NaN" : "-Infinity"));
  if (h.eq(Ze)) return new v(0);
  if (t == null ? (Ae = !1, s = p) : s = t, h.eq(10))
    return t == null && (Ae = !0), il(v, s);
  if (s += d, v.precision = s, r = vt(m), n = r.charAt(0), a = Te(h), Math.abs(a) < 15e14) {
    for (; n < 7 && n != 1 || n == 1 && r.charAt(1) > 3; )
      h = h.times(e), r = vt(h.d), n = r.charAt(0), l++;
    a = Te(h), n > 1 ? (h = new v("0." + r), a++) : h = new v(n + "." + r.slice(1));
  } else
    return c = il(v, s + 2, p).times(a + ""), h = Jn(new v(n + "." + r.slice(1)), s - d).plus(c), v.precision = p, t == null ? (Ae = !0, me(h, p)) : h;
  for (u = o = h = $t(h.minus(Ze), h.plus(Ze), s), f = me(h.times(h), s), i = 3; ; ) {
    if (o = me(o.times(f), s), c = u.plus($t(o, new v(i), s)), vt(c.d).slice(0, s) === vt(u.d).slice(0, s))
      return u = u.times(2), a !== 0 && (u = u.plus(il(v, s + 2, p).times(a + ""))), u = $t(u, new v(l), s), v.precision = p, t == null ? (Ae = !0, me(u, p)) : u;
    u = c, i += 2;
  }
}
function tg(e, t) {
  var r, n, i;
  for ((r = t.indexOf(".")) > -1 && (t = t.replace(".", "")), (n = t.search(/e/i)) > 0 ? (r < 0 && (r = n), r += +t.slice(n + 1), t = t.substring(0, n)) : r < 0 && (r = t.length), n = 0; t.charCodeAt(n) === 48; ) ++n;
  for (i = t.length; t.charCodeAt(i - 1) === 48; ) --i;
  if (t = t.slice(n, i), t) {
    if (i -= n, r = r - n - 1, e.e = bn(r / Oe), e.d = [], n = (r + 1) % Oe, r < 0 && (n += Oe), n < i) {
      for (n && e.d.push(+t.slice(0, n)), i -= Oe; n < i; ) e.d.push(+t.slice(n, n += Oe));
      t = t.slice(n), n = Oe - t.length;
    } else
      n -= i;
    for (; n--; ) t += "0";
    if (e.d.push(+t), Ae && (e.e > ga || e.e < -ga)) throw Error(ep + r);
  } else
    e.s = 0, e.e = 0, e.d = [0];
  return e;
}
function me(e, t, r) {
  var n, i, a, o, u, c, s, f, l = e.d;
  for (o = 1, a = l[0]; a >= 10; a /= 10) o++;
  if (n = t - o, n < 0)
    n += Oe, i = t, s = l[f = 0];
  else {
    if (f = Math.ceil((n + 1) / Oe), a = l.length, f >= a) return e;
    for (s = a = l[f], o = 1; a >= 10; a /= 10) o++;
    n %= Oe, i = n - Oe + o;
  }
  if (r !== void 0 && (a = ir(10, o - i - 1), u = s / a % 10 | 0, c = t < 0 || l[f + 1] !== void 0 || s % a, c = r < 4 ? (u || c) && (r == 0 || r == (e.s < 0 ? 3 : 2)) : u > 5 || u == 5 && (r == 4 || c || r == 6 && // Check whether the digit to the left of the rounding digit is odd.
  (n > 0 ? i > 0 ? s / ir(10, o - i) : 0 : l[f - 1]) % 10 & 1 || r == (e.s < 0 ? 8 : 7))), t < 1 || !l[0])
    return c ? (a = Te(e), l.length = 1, t = t - a - 1, l[0] = ir(10, (Oe - t % Oe) % Oe), e.e = bn(-t / Oe) || 0) : (l.length = 1, l[0] = e.e = e.s = 0), e;
  if (n == 0 ? (l.length = f, a = 1, f--) : (l.length = f + 1, a = ir(10, Oe - n), l[f] = i > 0 ? (s / ir(10, o - i) % ir(10, i) | 0) * a : 0), c)
    for (; ; )
      if (f == 0) {
        (l[0] += a) == Re && (l[0] = 1, ++e.e);
        break;
      } else {
        if (l[f] += a, l[f] != Re) break;
        l[f--] = 0, a = 1;
      }
  for (n = l.length; l[--n] === 0; ) l.pop();
  if (Ae && (e.e > ga || e.e < -ga))
    throw Error(ep + Te(e));
  return e;
}
function hw(e, t) {
  var r, n, i, a, o, u, c, s, f, l, d = e.constructor, h = d.precision;
  if (!e.s || !t.s)
    return t.s ? t.s = -t.s : t = new d(e), Ae ? me(t, h) : t;
  if (c = e.d, l = t.d, n = t.e, s = e.e, c = c.slice(), o = s - n, o) {
    for (f = o < 0, f ? (r = c, o = -o, u = l.length) : (r = l, n = s, u = c.length), i = Math.max(Math.ceil(h / Oe), u) + 2, o > i && (o = i, r.length = 1), r.reverse(), i = o; i--; ) r.push(0);
    r.reverse();
  } else {
    for (i = c.length, u = l.length, f = i < u, f && (u = i), i = 0; i < u; i++)
      if (c[i] != l[i]) {
        f = c[i] < l[i];
        break;
      }
    o = 0;
  }
  for (f && (r = c, c = l, l = r, t.s = -t.s), u = c.length, i = l.length - u; i > 0; --i) c[u++] = 0;
  for (i = l.length; i > o; ) {
    if (c[--i] < l[i]) {
      for (a = i; a && c[--a] === 0; ) c[a] = Re - 1;
      --c[a], c[i] += Re;
    }
    c[i] -= l[i];
  }
  for (; c[--u] === 0; ) c.pop();
  for (; c[0] === 0; c.shift()) --n;
  return c[0] ? (t.d = c, t.e = n, Ae ? me(t, h) : t) : new d(0);
}
function gr(e, t, r) {
  var n, i = Te(e), a = vt(e.d), o = a.length;
  return t ? (r && (n = r - o) > 0 ? a = a.charAt(0) + "." + a.slice(1) + Bt(n) : o > 1 && (a = a.charAt(0) + "." + a.slice(1)), a = a + (i < 0 ? "e" : "e+") + i) : i < 0 ? (a = "0." + Bt(-i - 1) + a, r && (n = r - o) > 0 && (a += Bt(n))) : i >= o ? (a += Bt(i + 1 - o), r && (n = r - i - 1) > 0 && (a = a + "." + Bt(n))) : ((n = i + 1) < o && (a = a.slice(0, n) + "." + a.slice(n)), r && (n = r - o) > 0 && (i + 1 === o && (a += "."), a += Bt(n))), e.s < 0 ? "-" + a : a;
}
function rg(e, t) {
  if (e.length > t)
    return e.length = t, !0;
}
function vw(e) {
  var t, r, n;
  function i(a) {
    var o = this;
    if (!(o instanceof i)) return new i(a);
    if (o.constructor = i, a instanceof i) {
      o.s = a.s, o.e = a.e, o.d = (a = a.d) ? a.slice() : a;
      return;
    }
    if (typeof a == "number") {
      if (a * 0 !== 0)
        throw Error(dr + a);
      if (a > 0)
        o.s = 1;
      else if (a < 0)
        a = -a, o.s = -1;
      else {
        o.s = 0, o.e = 0, o.d = [0];
        return;
      }
      if (a === ~~a && a < 1e7) {
        o.e = 0, o.d = [a];
        return;
      }
      return tg(o, a.toString());
    } else if (typeof a != "string")
      throw Error(dr + a);
    if (a.charCodeAt(0) === 45 ? (a = a.slice(1), o.s = -1) : o.s = 1, Yj.test(a)) tg(o, a);
    else throw Error(dr + a);
  }
  if (i.prototype = Y, i.ROUND_UP = 0, i.ROUND_DOWN = 1, i.ROUND_CEIL = 2, i.ROUND_FLOOR = 3, i.ROUND_HALF_UP = 4, i.ROUND_HALF_DOWN = 5, i.ROUND_HALF_EVEN = 6, i.ROUND_HALF_CEIL = 7, i.ROUND_HALF_FLOOR = 8, i.clone = vw, i.config = i.set = Xj, e === void 0 && (e = {}), e)
    for (n = ["precision", "rounding", "toExpNeg", "toExpPos", "LN10"], t = 0; t < n.length; ) e.hasOwnProperty(r = n[t++]) || (e[r] = this[r]);
  return i.config(e), i;
}
function Xj(e) {
  if (!e || typeof e != "object")
    throw Error(at + "Object expected");
  var t, r, n, i = [
    "precision",
    1,
    gn,
    "rounding",
    0,
    8,
    "toExpNeg",
    -1 / 0,
    0,
    "toExpPos",
    0,
    1 / 0
  ];
  for (t = 0; t < i.length; t += 3)
    if ((n = e[r = i[t]]) !== void 0)
      if (bn(n) === n && n >= i[t + 1] && n <= i[t + 2]) this[r] = n;
      else throw Error(dr + r + ": " + n);
  if ((n = e[r = "LN10"]) !== void 0)
    if (n == Math.LN10) this[r] = new this(n);
    else throw Error(dr + r + ": " + n);
  return this;
}
var tp = vw(Vj);
Ze = new tp(1);
const ve = tp;
function Zj(e) {
  return t$(e) || e$(e) || Qj(e) || Jj();
}
function Jj() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Qj(e, t) {
  if (e) {
    if (typeof e == "string") return vf(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return vf(e, t);
  }
}
function e$(e) {
  if (typeof Symbol < "u" && Symbol.iterator in Object(e)) return Array.from(e);
}
function t$(e) {
  if (Array.isArray(e)) return vf(e);
}
function vf(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++)
    n[r] = e[r];
  return n;
}
var r$ = function(t) {
  return t;
}, yw = {}, mw = function(t) {
  return t === yw;
}, ng = function(t) {
  return function r() {
    return arguments.length === 0 || arguments.length === 1 && mw(arguments.length <= 0 ? void 0 : arguments[0]) ? r : t.apply(void 0, arguments);
  };
}, n$ = function e(t, r) {
  return t === 1 ? r : ng(function() {
    for (var n = arguments.length, i = new Array(n), a = 0; a < n; a++)
      i[a] = arguments[a];
    var o = i.filter(function(u) {
      return u !== yw;
    }).length;
    return o >= t ? r.apply(void 0, i) : e(t - o, ng(function() {
      for (var u = arguments.length, c = new Array(u), s = 0; s < u; s++)
        c[s] = arguments[s];
      var f = i.map(function(l) {
        return mw(l) ? c.shift() : l;
      });
      return r.apply(void 0, Zj(f).concat(c));
    }));
  });
}, bo = function(t) {
  return n$(t.length, t);
}, yf = function(t, r) {
  for (var n = [], i = t; i < r; ++i)
    n[i - t] = i;
  return n;
}, i$ = bo(function(e, t) {
  return Array.isArray(t) ? t.map(e) : Object.keys(t).map(function(r) {
    return t[r];
  }).map(e);
}), a$ = function() {
  for (var t = arguments.length, r = new Array(t), n = 0; n < t; n++)
    r[n] = arguments[n];
  if (!r.length)
    return r$;
  var i = r.reverse(), a = i[0], o = i.slice(1);
  return function() {
    return o.reduce(function(u, c) {
      return c(u);
    }, a.apply(void 0, arguments));
  };
}, mf = function(t) {
  return Array.isArray(t) ? t.reverse() : t.split("").reverse.join("");
}, gw = function(t) {
  var r = null, n = null;
  return function() {
    for (var i = arguments.length, a = new Array(i), o = 0; o < i; o++)
      a[o] = arguments[o];
    return r && a.every(function(u, c) {
      return u === r[c];
    }) || (r = a, n = t.apply(void 0, a)), n;
  };
};
function o$(e) {
  var t;
  return e === 0 ? t = 1 : t = Math.floor(new ve(e).abs().log(10).toNumber()) + 1, t;
}
function u$(e, t, r) {
  for (var n = new ve(e), i = 0, a = []; n.lt(t) && i < 1e5; )
    a.push(n.toNumber()), n = n.add(r), i++;
  return a;
}
var c$ = bo(function(e, t, r) {
  var n = +e, i = +t;
  return n + r * (i - n);
}), s$ = bo(function(e, t, r) {
  var n = t - +e;
  return n = n || 1 / 0, (r - e) / n;
}), l$ = bo(function(e, t, r) {
  var n = t - +e;
  return n = n || 1 / 0, Math.max(0, Math.min(1, (r - e) / n));
});
const xo = {
  rangeStep: u$,
  getDigitCount: o$,
  interpolateNumber: c$,
  uninterpolateNumber: s$,
  uninterpolateTruncation: l$
};
function gf(e) {
  return p$(e) || d$(e) || bw(e) || f$();
}
function f$() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function d$(e) {
  if (typeof Symbol < "u" && Symbol.iterator in Object(e)) return Array.from(e);
}
function p$(e) {
  if (Array.isArray(e)) return bf(e);
}
function Qn(e, t) {
  return y$(e) || v$(e, t) || bw(e, t) || h$();
}
function h$() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function bw(e, t) {
  if (e) {
    if (typeof e == "string") return bf(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return bf(e, t);
  }
}
function bf(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++)
    n[r] = e[r];
  return n;
}
function v$(e, t) {
  if (!(typeof Symbol > "u" || !(Symbol.iterator in Object(e)))) {
    var r = [], n = !0, i = !1, a = void 0;
    try {
      for (var o = e[Symbol.iterator](), u; !(n = (u = o.next()).done) && (r.push(u.value), !(t && r.length === t)); n = !0)
        ;
    } catch (c) {
      i = !0, a = c;
    } finally {
      try {
        !n && o.return != null && o.return();
      } finally {
        if (i) throw a;
      }
    }
    return r;
  }
}
function y$(e) {
  if (Array.isArray(e)) return e;
}
function xw(e) {
  var t = Qn(e, 2), r = t[0], n = t[1], i = r, a = n;
  return r > n && (i = n, a = r), [i, a];
}
function ww(e, t, r) {
  if (e.lte(0))
    return new ve(0);
  var n = xo.getDigitCount(e.toNumber()), i = new ve(10).pow(n), a = e.div(i), o = n !== 1 ? 0.05 : 0.1, u = new ve(Math.ceil(a.div(o).toNumber())).add(r).mul(o), c = u.mul(i);
  return t ? c : new ve(Math.ceil(c));
}
function m$(e, t, r) {
  var n = 1, i = new ve(e);
  if (!i.isint() && r) {
    var a = Math.abs(e);
    a < 1 ? (n = new ve(10).pow(xo.getDigitCount(e) - 1), i = new ve(Math.floor(i.div(n).toNumber())).mul(n)) : a > 1 && (i = new ve(Math.floor(e)));
  } else e === 0 ? i = new ve(Math.floor((t - 1) / 2)) : r || (i = new ve(Math.floor(e)));
  var o = Math.floor((t - 1) / 2), u = a$(i$(function(c) {
    return i.add(new ve(c - o).mul(n)).toNumber();
  }), yf);
  return u(0, t);
}
function Ow(e, t, r, n) {
  var i = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : 0;
  if (!Number.isFinite((t - e) / (r - 1)))
    return {
      step: new ve(0),
      tickMin: new ve(0),
      tickMax: new ve(0)
    };
  var a = ww(new ve(t).sub(e).div(r - 1), n, i), o;
  e <= 0 && t >= 0 ? o = new ve(0) : (o = new ve(e).add(t).div(2), o = o.sub(new ve(o).mod(a)));
  var u = Math.ceil(o.sub(e).div(a).toNumber()), c = Math.ceil(new ve(t).sub(o).div(a).toNumber()), s = u + c + 1;
  return s > r ? Ow(e, t, r, n, i + 1) : (s < r && (c = t > 0 ? c + (r - s) : c, u = t > 0 ? u : u + (r - s)), {
    step: a,
    tickMin: o.sub(new ve(u).mul(a)),
    tickMax: o.add(new ve(c).mul(a))
  });
}
function g$(e) {
  var t = Qn(e, 2), r = t[0], n = t[1], i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 6, a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0, o = Math.max(i, 2), u = xw([r, n]), c = Qn(u, 2), s = c[0], f = c[1];
  if (s === -1 / 0 || f === 1 / 0) {
    var l = f === 1 / 0 ? [s].concat(gf(yf(0, i - 1).map(function() {
      return 1 / 0;
    }))) : [].concat(gf(yf(0, i - 1).map(function() {
      return -1 / 0;
    })), [f]);
    return r > n ? mf(l) : l;
  }
  if (s === f)
    return m$(s, i, a);
  var d = Ow(s, f, o, a), h = d.step, m = d.tickMin, v = d.tickMax, p = xo.rangeStep(m, v.add(new ve(0.1).mul(h)), h);
  return r > n ? mf(p) : p;
}
function b$(e, t) {
  var r = Qn(e, 2), n = r[0], i = r[1], a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0, o = xw([n, i]), u = Qn(o, 2), c = u[0], s = u[1];
  if (c === -1 / 0 || s === 1 / 0)
    return [n, i];
  if (c === s)
    return [c];
  var f = Math.max(t, 2), l = ww(new ve(s).sub(c).div(f - 1), a, 0), d = [].concat(gf(xo.rangeStep(new ve(c), new ve(s).sub(new ve(0.99).mul(l)), l)), [s]);
  return n > i ? mf(d) : d;
}
var x$ = gw(g$), w$ = gw(b$), O$ = process.env.NODE_ENV === "production", al = "Invariant failed";
function Ke(e, t) {
  if (O$)
    throw new Error(al);
  var r = typeof t == "function" ? t() : t, n = r ? "".concat(al, ": ").concat(r) : al;
  throw new Error(n);
}
var _$ = ["offset", "layout", "width", "dataKey", "data", "dataPointFormatter", "xAxis", "yAxis"];
function Gr(e) {
  "@babel/helpers - typeof";
  return Gr = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Gr(e);
}
function ba() {
  return ba = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, ba.apply(this, arguments);
}
function A$(e, t) {
  return T$(e) || E$(e, t) || P$(e, t) || S$();
}
function S$() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function P$(e, t) {
  if (e) {
    if (typeof e == "string") return ig(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return ig(e, t);
  }
}
function ig(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function E$(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, i, a, o, u = [], c = !0, s = !1;
    try {
      if (a = (r = r.call(e)).next, t !== 0) for (; !(c = (n = a.call(r)).done) && (u.push(n.value), u.length !== t); c = !0) ;
    } catch (f) {
      s = !0, i = f;
    } finally {
      try {
        if (!c && r.return != null && (o = r.return(), Object(o) !== o)) return;
      } finally {
        if (s) throw i;
      }
    }
    return u;
  }
}
function T$(e) {
  if (Array.isArray(e)) return e;
}
function j$(e, t) {
  if (e == null) return {};
  var r = $$(e, t), n, i;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (i = 0; i < a.length; i++)
      n = a[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function $$(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
function C$(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function M$(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, Sw(n.key), n);
  }
}
function I$(e, t, r) {
  return t && M$(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function R$(e, t, r) {
  return t = xa(t), k$(e, _w() ? Reflect.construct(t, r || [], xa(e).constructor) : t.apply(e, r));
}
function k$(e, t) {
  if (t && (Gr(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return D$(e);
}
function D$(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function _w() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (_w = function() {
    return !!e;
  })();
}
function xa(e) {
  return xa = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, xa(e);
}
function N$(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && xf(e, t);
}
function xf(e, t) {
  return xf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n;
  }, xf(e, t);
}
function Aw(e, t, r) {
  return t = Sw(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function Sw(e) {
  var t = q$(e, "string");
  return Gr(t) == "symbol" ? t : t + "";
}
function q$(e, t) {
  if (Gr(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Gr(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var Pi = /* @__PURE__ */ (function(e) {
  function t() {
    return C$(this, t), R$(this, t, arguments);
  }
  return N$(t, e), I$(t, [{
    key: "render",
    value: function() {
      var n = this.props, i = n.offset, a = n.layout, o = n.width, u = n.dataKey, c = n.data, s = n.dataPointFormatter, f = n.xAxis, l = n.yAxis, d = j$(n, _$), h = X(d, !1);
      this.props.direction === "x" && f.type !== "number" && (process.env.NODE_ENV !== "production" ? Ke(!1, 'ErrorBar requires Axis type property to be "number".') : Ke());
      var m = c.map(function(v) {
        var p = s(v, u), g = p.x, x = p.y, w = p.value, O = p.errorVal;
        if (!O)
          return null;
        var y = [], b, _;
        if (Array.isArray(O)) {
          var A = A$(O, 2);
          b = A[0], _ = A[1];
        } else
          b = _ = O;
        if (a === "vertical") {
          var E = f.scale, C = x + i, P = C + o, T = C - o, $ = E(w - b), R = E(w + _);
          y.push({
            x1: R,
            y1: P,
            x2: R,
            y2: T
          }), y.push({
            x1: $,
            y1: C,
            x2: R,
            y2: C
          }), y.push({
            x1: $,
            y1: P,
            x2: $,
            y2: T
          });
        } else if (a === "horizontal") {
          var I = l.scale, k = g + i, q = k - o, W = k + o, K = I(w - b), M = I(w + _);
          y.push({
            x1: q,
            y1: M,
            x2: W,
            y2: M
          }), y.push({
            x1: k,
            y1: K,
            x2: k,
            y2: M
          }), y.push({
            x1: q,
            y1: K,
            x2: W,
            y2: K
          });
        }
        return /* @__PURE__ */ S.createElement(ue, ba({
          className: "recharts-errorBar",
          key: "bar-".concat(y.map(function(N) {
            return "".concat(N.x1, "-").concat(N.x2, "-").concat(N.y1, "-").concat(N.y2);
          }))
        }, h), y.map(function(N) {
          return /* @__PURE__ */ S.createElement("line", ba({}, N, {
            key: "line-".concat(N.x1, "-").concat(N.x2, "-").concat(N.y1, "-").concat(N.y2)
          }));
        }));
      });
      return /* @__PURE__ */ S.createElement(ue, {
        className: "recharts-errorBars"
      }, m);
    }
  }]);
})(S.Component);
Aw(Pi, "defaultProps", {
  stroke: "black",
  strokeWidth: 1.5,
  width: 5,
  offset: 0,
  layout: "horizontal"
});
Aw(Pi, "displayName", "ErrorBar");
function ei(e) {
  "@babel/helpers - typeof";
  return ei = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, ei(e);
}
function ag(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function er(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? ag(Object(r), !0).forEach(function(n) {
      L$(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : ag(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function L$(e, t, r) {
  return t = B$(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function B$(e) {
  var t = F$(e, "string");
  return ei(t) == "symbol" ? t : t + "";
}
function F$(e, t) {
  if (ei(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (ei(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var Pw = function(t) {
  var r = t.children, n = t.formattedGraphicalItems, i = t.legendWidth, a = t.legendContent, o = Ye(r, ht);
  if (!o)
    return null;
  var u = ht.defaultProps, c = u !== void 0 ? er(er({}, u), o.props) : {}, s;
  return o.props && o.props.payload ? s = o.props && o.props.payload : a === "children" ? s = (n || []).reduce(function(f, l) {
    var d = l.item, h = l.props, m = h.sectors || h.data || [];
    return f.concat(m.map(function(v) {
      return {
        type: o.props.iconType || d.props.legendType,
        value: v.name,
        color: v.fill,
        payload: v
      };
    }));
  }, []) : s = (n || []).map(function(f) {
    var l = f.item, d = l.type.defaultProps, h = d !== void 0 ? er(er({}, d), l.props) : {}, m = h.dataKey, v = h.name, p = h.legendType, g = h.hide;
    return {
      inactive: g,
      dataKey: m,
      type: c.iconType || p || "square",
      color: rp(l),
      value: v || m,
      // @ts-expect-error property strokeDasharray is required in Payload but optional in props
      payload: h
    };
  }), er(er(er({}, c), ht.getWithHeight(o, i)), {}, {
    payload: s,
    item: o
  });
};
function ti(e) {
  "@babel/helpers - typeof";
  return ti = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, ti(e);
}
function og(e) {
  return K$(e) || U$(e) || W$(e) || z$();
}
function z$() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function W$(e, t) {
  if (e) {
    if (typeof e == "string") return wf(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return wf(e, t);
  }
}
function U$(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function K$(e) {
  if (Array.isArray(e)) return wf(e);
}
function wf(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function ug(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Se(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? ug(Object(r), !0).forEach(function(n) {
      qr(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : ug(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function qr(e, t, r) {
  return t = H$(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function H$(e) {
  var t = G$(e, "string");
  return ti(t) == "symbol" ? t : t + "";
}
function G$(e, t) {
  if (ti(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (ti(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Pe(e, t, r) {
  return ie(e) || ie(t) ? r : Me(t) ? Je(e, t, r) : te(t) ? t(e) : r;
}
function kn(e, t, r, n) {
  var i = Kj(e, function(u) {
    return Pe(u, t);
  });
  if (r === "number") {
    var a = i.filter(function(u) {
      return z(u) || parseFloat(u);
    });
    return a.length ? [go(a), zt(a)] : [1 / 0, -1 / 0];
  }
  var o = n ? i.filter(function(u) {
    return !ie(u);
  }) : i;
  return o.map(function(u) {
    return Me(u) || u instanceof Date ? u : "";
  });
}
var V$ = function(t) {
  var r, n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [], i = arguments.length > 2 ? arguments[2] : void 0, a = arguments.length > 3 ? arguments[3] : void 0, o = -1, u = (r = n == null ? void 0 : n.length) !== null && r !== void 0 ? r : 0;
  if (u <= 1)
    return 0;
  if (a && a.axisType === "angleAxis" && Math.abs(Math.abs(a.range[1] - a.range[0]) - 360) <= 1e-6)
    for (var c = a.range, s = 0; s < u; s++) {
      var f = s > 0 ? i[s - 1].coordinate : i[u - 1].coordinate, l = i[s].coordinate, d = s >= u - 1 ? i[0].coordinate : i[s + 1].coordinate, h = void 0;
      if (Fe(l - f) !== Fe(d - l)) {
        var m = [];
        if (Fe(d - l) === Fe(c[1] - c[0])) {
          h = d;
          var v = l + c[1] - c[0];
          m[0] = Math.min(v, (v + f) / 2), m[1] = Math.max(v, (v + f) / 2);
        } else {
          h = f;
          var p = d + c[1] - c[0];
          m[0] = Math.min(l, (p + l) / 2), m[1] = Math.max(l, (p + l) / 2);
        }
        var g = [Math.min(l, (h + l) / 2), Math.max(l, (h + l) / 2)];
        if (t > g[0] && t <= g[1] || t >= m[0] && t <= m[1]) {
          o = i[s].index;
          break;
        }
      } else {
        var x = Math.min(f, d), w = Math.max(f, d);
        if (t > (x + l) / 2 && t <= (w + l) / 2) {
          o = i[s].index;
          break;
        }
      }
    }
  else
    for (var O = 0; O < u; O++)
      if (O === 0 && t <= (n[O].coordinate + n[O + 1].coordinate) / 2 || O > 0 && O < u - 1 && t > (n[O].coordinate + n[O - 1].coordinate) / 2 && t <= (n[O].coordinate + n[O + 1].coordinate) / 2 || O === u - 1 && t > (n[O].coordinate + n[O - 1].coordinate) / 2) {
        o = n[O].index;
        break;
      }
  return o;
}, rp = function(t) {
  var r, n = t, i = n.type.displayName, a = (r = t.type) !== null && r !== void 0 && r.defaultProps ? Se(Se({}, t.type.defaultProps), t.props) : t.props, o = a.stroke, u = a.fill, c;
  switch (i) {
    case "Line":
      c = o;
      break;
    case "Area":
    case "Radar":
      c = o && o !== "none" ? o : u;
      break;
    default:
      c = u;
      break;
  }
  return c;
}, Y$ = function(t) {
  var r = t.barSize, n = t.totalSize, i = t.stackGroups, a = i === void 0 ? {} : i;
  if (!a)
    return {};
  for (var o = {}, u = Object.keys(a), c = 0, s = u.length; c < s; c++)
    for (var f = a[u[c]].stackGroups, l = Object.keys(f), d = 0, h = l.length; d < h; d++) {
      var m = f[l[d]], v = m.items, p = m.cateAxisId, g = v.filter(function(_) {
        return jt(_.type).indexOf("Bar") >= 0;
      });
      if (g && g.length) {
        var x = g[0].type.defaultProps, w = x !== void 0 ? Se(Se({}, x), g[0].props) : g[0].props, O = w.barSize, y = w[p];
        o[y] || (o[y] = []);
        var b = ie(O) ? r : O;
        o[y].push({
          item: g[0],
          stackList: g.slice(1),
          barSize: ie(b) ? void 0 : ze(b, n, 0)
        });
      }
    }
  return o;
}, X$ = function(t) {
  var r = t.barGap, n = t.barCategoryGap, i = t.bandSize, a = t.sizeList, o = a === void 0 ? [] : a, u = t.maxBarSize, c = o.length;
  if (c < 1) return null;
  var s = ze(r, i, 0, !0), f, l = [];
  if (o[0].barSize === +o[0].barSize) {
    var d = !1, h = i / c, m = o.reduce(function(O, y) {
      return O + y.barSize || 0;
    }, 0);
    m += (c - 1) * s, m >= i && (m -= (c - 1) * s, s = 0), m >= i && h > 0 && (d = !0, h *= 0.9, m = c * h);
    var v = (i - m) / 2 >> 0, p = {
      offset: v - s,
      size: 0
    };
    f = o.reduce(function(O, y) {
      var b = {
        item: y.item,
        position: {
          offset: p.offset + p.size + s,
          // @ts-expect-error the type check above does not check for type number explicitly
          size: d ? h : y.barSize
        }
      }, _ = [].concat(og(O), [b]);
      return p = _[_.length - 1].position, y.stackList && y.stackList.length && y.stackList.forEach(function(A) {
        _.push({
          item: A,
          position: p
        });
      }), _;
    }, l);
  } else {
    var g = ze(n, i, 0, !0);
    i - 2 * g - (c - 1) * s <= 0 && (s = 0);
    var x = (i - 2 * g - (c - 1) * s) / c;
    x > 1 && (x >>= 0);
    var w = u === +u ? Math.min(x, u) : x;
    f = o.reduce(function(O, y, b) {
      var _ = [].concat(og(O), [{
        item: y.item,
        position: {
          offset: g + (x + s) * b + (x - w) / 2,
          size: w
        }
      }]);
      return y.stackList && y.stackList.length && y.stackList.forEach(function(A) {
        _.push({
          item: A,
          position: _[_.length - 1].position
        });
      }), _;
    }, l);
  }
  return f;
}, Z$ = function(t, r, n, i) {
  var a = n.children, o = n.width, u = n.margin, c = o - (u.left || 0) - (u.right || 0), s = Pw({
    children: a,
    legendWidth: c
  });
  if (s) {
    var f = i || {}, l = f.width, d = f.height, h = s.align, m = s.verticalAlign, v = s.layout;
    if ((v === "vertical" || v === "horizontal" && m === "middle") && h !== "center" && z(t[h]))
      return Se(Se({}, t), {}, qr({}, h, t[h] + (l || 0)));
    if ((v === "horizontal" || v === "vertical" && h === "center") && m !== "middle" && z(t[m]))
      return Se(Se({}, t), {}, qr({}, m, t[m] + (d || 0)));
  }
  return t;
}, J$ = function(t, r, n) {
  return ie(r) ? !0 : t === "horizontal" ? r === "yAxis" : t === "vertical" || n === "x" ? r === "xAxis" : n === "y" ? r === "yAxis" : !0;
}, Ew = function(t, r, n, i, a) {
  var o = r.props.children, u = Qe(o, Pi).filter(function(s) {
    return J$(i, a, s.props.direction);
  });
  if (u && u.length) {
    var c = u.map(function(s) {
      return s.props.dataKey;
    });
    return t.reduce(function(s, f) {
      var l = Pe(f, n);
      if (ie(l)) return s;
      var d = Array.isArray(l) ? [go(l), zt(l)] : [l, l], h = c.reduce(function(m, v) {
        var p = Pe(f, v, 0), g = d[0] - Math.abs(Array.isArray(p) ? p[0] : p), x = d[1] + Math.abs(Array.isArray(p) ? p[1] : p);
        return [Math.min(g, m[0]), Math.max(x, m[1])];
      }, [1 / 0, -1 / 0]);
      return [Math.min(h[0], s[0]), Math.max(h[1], s[1])];
    }, [1 / 0, -1 / 0]);
  }
  return null;
}, Q$ = function(t, r, n, i, a) {
  var o = r.map(function(u) {
    return Ew(t, u, n, a, i);
  }).filter(function(u) {
    return !ie(u);
  });
  return o && o.length ? o.reduce(function(u, c) {
    return [Math.min(u[0], c[0]), Math.max(u[1], c[1])];
  }, [1 / 0, -1 / 0]) : null;
}, Tw = function(t, r, n, i, a) {
  var o = r.map(function(c) {
    var s = c.props.dataKey;
    return n === "number" && s && Ew(t, c, s, i) || kn(t, s, n, a);
  });
  if (n === "number")
    return o.reduce(
      // @ts-expect-error if (type === number) means that the domain is numerical type
      // - but this link is missing in the type definition
      function(c, s) {
        return [Math.min(c[0], s[0]), Math.max(c[1], s[1])];
      },
      [1 / 0, -1 / 0]
    );
  var u = {};
  return o.reduce(function(c, s) {
    for (var f = 0, l = s.length; f < l; f++)
      u[s[f]] || (u[s[f]] = !0, c.push(s[f]));
    return c;
  }, []);
}, jw = function(t, r) {
  return t === "horizontal" && r === "xAxis" || t === "vertical" && r === "yAxis" || t === "centric" && r === "angleAxis" || t === "radial" && r === "radiusAxis";
}, $w = function(t, r, n, i) {
  if (i)
    return t.map(function(c) {
      return c.coordinate;
    });
  var a, o, u = t.map(function(c) {
    return c.coordinate === r && (a = !0), c.coordinate === n && (o = !0), c.coordinate;
  });
  return a || u.push(r), o || u.push(n), u;
}, Tt = function(t, r, n) {
  if (!t) return null;
  var i = t.scale, a = t.duplicateDomain, o = t.type, u = t.range, c = t.realScaleType === "scaleBand" ? i.bandwidth() / 2 : 2, s = (r || n) && o === "category" && i.bandwidth ? i.bandwidth() / c : 0;
  if (s = t.axisType === "angleAxis" && (u == null ? void 0 : u.length) >= 2 ? Fe(u[0] - u[1]) * 2 * s : s, r && (t.ticks || t.niceTicks)) {
    var f = (t.ticks || t.niceTicks).map(function(l) {
      var d = a ? a.indexOf(l) : l;
      return {
        // If the scaleContent is not a number, the coordinate will be NaN.
        // That could be the case for example with a PointScale and a string as domain.
        coordinate: i(d) + s,
        value: l,
        offset: s
      };
    });
    return f.filter(function(l) {
      return !vn(l.coordinate);
    });
  }
  return t.isCategorical && t.categoricalDomain ? t.categoricalDomain.map(function(l, d) {
    return {
      coordinate: i(l) + s,
      value: l,
      index: d,
      offset: s
    };
  }) : i.ticks && !n ? i.ticks(t.tickCount).map(function(l) {
    return {
      coordinate: i(l) + s,
      value: l,
      offset: s
    };
  }) : i.domain().map(function(l, d) {
    return {
      coordinate: i(l) + s,
      value: a ? a[l] : l,
      index: d,
      offset: s
    };
  });
}, ol = /* @__PURE__ */ new WeakMap(), Bi = function(t, r) {
  if (typeof r != "function")
    return t;
  ol.has(t) || ol.set(t, /* @__PURE__ */ new WeakMap());
  var n = ol.get(t);
  if (n.has(r))
    return n.get(r);
  var i = function() {
    t.apply(void 0, arguments), r.apply(void 0, arguments);
  };
  return n.set(r, i), i;
}, Cw = function(t, r, n) {
  var i = t.scale, a = t.type, o = t.layout, u = t.axisType;
  if (i === "auto")
    return o === "radial" && u === "radiusAxis" ? {
      scale: Gn(),
      realScaleType: "band"
    } : o === "radial" && u === "angleAxis" ? {
      scale: ha(),
      realScaleType: "linear"
    } : a === "category" && r && (r.indexOf("LineChart") >= 0 || r.indexOf("AreaChart") >= 0 || r.indexOf("ComposedChart") >= 0 && !n) ? {
      scale: Rn(),
      realScaleType: "point"
    } : a === "category" ? {
      scale: Gn(),
      realScaleType: "band"
    } : {
      scale: ha(),
      realScaleType: "linear"
    };
  if (hr(i)) {
    var c = "scale".concat(ro(i));
    return {
      scale: (Hm[c] || Rn)(),
      realScaleType: Hm[c] ? c : "point"
    };
  }
  return te(i) ? {
    scale: i
  } : {
    scale: Rn(),
    realScaleType: "point"
  };
}, cg = 1e-4, Mw = function(t) {
  var r = t.domain();
  if (!(!r || r.length <= 2)) {
    var n = r.length, i = t.range(), a = Math.min(i[0], i[1]) - cg, o = Math.max(i[0], i[1]) + cg, u = t(r[0]), c = t(r[n - 1]);
    (u < a || u > o || c < a || c > o) && t.domain([r[0], r[n - 1]]);
  }
}, eC = function(t, r) {
  if (!t)
    return null;
  for (var n = 0, i = t.length; n < i; n++)
    if (t[n].item === r)
      return t[n].position;
  return null;
}, tC = function(t, r) {
  if (!r || r.length !== 2 || !z(r[0]) || !z(r[1]))
    return t;
  var n = Math.min(r[0], r[1]), i = Math.max(r[0], r[1]), a = [t[0], t[1]];
  return (!z(t[0]) || t[0] < n) && (a[0] = n), (!z(t[1]) || t[1] > i) && (a[1] = i), a[0] > i && (a[0] = i), a[1] < n && (a[1] = n), a;
}, rC = function(t) {
  var r = t.length;
  if (!(r <= 0))
    for (var n = 0, i = t[0].length; n < i; ++n)
      for (var a = 0, o = 0, u = 0; u < r; ++u) {
        var c = vn(t[u][n][1]) ? t[u][n][0] : t[u][n][1];
        c >= 0 ? (t[u][n][0] = a, t[u][n][1] = a + c, a = t[u][n][1]) : (t[u][n][0] = o, t[u][n][1] = o + c, o = t[u][n][1]);
      }
}, nC = function(t) {
  var r = t.length;
  if (!(r <= 0))
    for (var n = 0, i = t[0].length; n < i; ++n)
      for (var a = 0, o = 0; o < r; ++o) {
        var u = vn(t[o][n][1]) ? t[o][n][0] : t[o][n][1];
        u >= 0 ? (t[o][n][0] = a, t[o][n][1] = a + u, a = t[o][n][1]) : (t[o][n][0] = 0, t[o][n][1] = 0);
      }
}, iC = {
  sign: rC,
  // @ts-expect-error definitelytyped types are incorrect
  expand: K1,
  // @ts-expect-error definitelytyped types are incorrect
  none: Lr,
  // @ts-expect-error definitelytyped types are incorrect
  silhouette: H1,
  // @ts-expect-error definitelytyped types are incorrect
  wiggle: G1,
  positive: nC
}, aC = function(t, r, n) {
  var i = r.map(function(u) {
    return u.props.dataKey;
  }), a = iC[n], o = U1().keys(i).value(function(u, c) {
    return +Pe(u, c, 0);
  }).order(Xl).offset(a);
  return o(t);
}, oC = function(t, r, n, i, a, o) {
  if (!t)
    return null;
  var u = o ? r.reverse() : r, c = {}, s = u.reduce(function(l, d) {
    var h, m = (h = d.type) !== null && h !== void 0 && h.defaultProps ? Se(Se({}, d.type.defaultProps), d.props) : d.props, v = m.stackId, p = m.hide;
    if (p)
      return l;
    var g = m[n], x = l[g] || {
      hasStack: !1,
      stackGroups: {}
    };
    if (Me(v)) {
      var w = x.stackGroups[v] || {
        numericAxisId: n,
        cateAxisId: i,
        items: []
      };
      w.items.push(d), x.hasStack = !0, x.stackGroups[v] = w;
    } else
      x.stackGroups[wr("_stackId_")] = {
        numericAxisId: n,
        cateAxisId: i,
        items: [d]
      };
    return Se(Se({}, l), {}, qr({}, g, x));
  }, c), f = {};
  return Object.keys(s).reduce(function(l, d) {
    var h = s[d];
    if (h.hasStack) {
      var m = {};
      h.stackGroups = Object.keys(h.stackGroups).reduce(function(v, p) {
        var g = h.stackGroups[p];
        return Se(Se({}, v), {}, qr({}, p, {
          numericAxisId: n,
          cateAxisId: i,
          items: g.items,
          stackedData: aC(t, g.items, a)
        }));
      }, m);
    }
    return Se(Se({}, l), {}, qr({}, d, h));
  }, f);
}, Iw = function(t, r) {
  var n = r.realScaleType, i = r.type, a = r.tickCount, o = r.originalDomain, u = r.allowDecimals, c = n || r.scale;
  if (c !== "auto" && c !== "linear")
    return null;
  if (a && i === "number" && o && (o[0] === "auto" || o[1] === "auto")) {
    var s = t.domain();
    if (!s.length)
      return null;
    var f = x$(s, a, u);
    return t.domain([go(f), zt(f)]), {
      niceTicks: f
    };
  }
  if (a && i === "number") {
    var l = t.domain(), d = w$(l, a, u);
    return {
      niceTicks: d
    };
  }
  return null;
};
function wa(e) {
  var t = e.axis, r = e.ticks, n = e.bandSize, i = e.entry, a = e.index, o = e.dataKey;
  if (t.type === "category") {
    if (!t.allowDuplicatedCategory && t.dataKey && !ie(i[t.dataKey])) {
      var u = Xi(r, "value", i[t.dataKey]);
      if (u)
        return u.coordinate + n / 2;
    }
    return r[a] ? r[a].coordinate + n / 2 : null;
  }
  var c = Pe(i, ie(o) ? t.dataKey : o);
  return ie(c) ? null : t.scale(c);
}
var sg = function(t) {
  var r = t.axis, n = t.ticks, i = t.offset, a = t.bandSize, o = t.entry, u = t.index;
  if (r.type === "category")
    return n[u] ? n[u].coordinate + i : null;
  var c = Pe(o, r.dataKey, r.domain[u]);
  return ie(c) ? null : r.scale(c) - a / 2 + i;
}, uC = function(t) {
  var r = t.numericAxis, n = r.scale.domain();
  if (r.type === "number") {
    var i = Math.min(n[0], n[1]), a = Math.max(n[0], n[1]);
    return i <= 0 && a >= 0 ? 0 : a < 0 ? a : i;
  }
  return n[0];
}, cC = function(t, r) {
  var n, i = (n = t.type) !== null && n !== void 0 && n.defaultProps ? Se(Se({}, t.type.defaultProps), t.props) : t.props, a = i.stackId;
  if (Me(a)) {
    var o = r[a];
    if (o) {
      var u = o.items.indexOf(t);
      return u >= 0 ? o.stackedData[u] : null;
    }
  }
  return null;
}, sC = function(t) {
  return t.reduce(function(r, n) {
    return [go(n.concat([r[0]]).filter(z)), zt(n.concat([r[1]]).filter(z))];
  }, [1 / 0, -1 / 0]);
}, Rw = function(t, r, n) {
  return Object.keys(t).reduce(function(i, a) {
    var o = t[a], u = o.stackedData, c = u.reduce(function(s, f) {
      var l = sC(f.slice(r, n + 1));
      return [Math.min(s[0], l[0]), Math.max(s[1], l[1])];
    }, [1 / 0, -1 / 0]);
    return [Math.min(c[0], i[0]), Math.max(c[1], i[1])];
  }, [1 / 0, -1 / 0]).map(function(i) {
    return i === 1 / 0 || i === -1 / 0 ? 0 : i;
  });
}, lg = /^dataMin[\s]*-[\s]*([0-9]+([.]{1}[0-9]+){0,1})$/, fg = /^dataMax[\s]*\+[\s]*([0-9]+([.]{1}[0-9]+){0,1})$/, Of = function(t, r, n) {
  if (te(t))
    return t(r, n);
  if (!Array.isArray(t))
    return r;
  var i = [];
  if (z(t[0]))
    i[0] = n ? t[0] : Math.min(t[0], r[0]);
  else if (lg.test(t[0])) {
    var a = +lg.exec(t[0])[1];
    i[0] = r[0] - a;
  } else te(t[0]) ? i[0] = t[0](r[0]) : i[0] = r[0];
  if (z(t[1]))
    i[1] = n ? t[1] : Math.max(t[1], r[1]);
  else if (fg.test(t[1])) {
    var o = +fg.exec(t[1])[1];
    i[1] = r[1] + o;
  } else te(t[1]) ? i[1] = t[1](r[1]) : i[1] = r[1];
  return i;
}, Oa = function(t, r, n) {
  if (t && t.scale && t.scale.bandwidth) {
    var i = t.scale.bandwidth();
    if (!n || i > 0)
      return i;
  }
  if (t && r && r.length >= 2) {
    for (var a = $d(r, function(l) {
      return l.coordinate;
    }), o = 1 / 0, u = 1, c = a.length; u < c; u++) {
      var s = a[u], f = a[u - 1];
      o = Math.min((s.coordinate || 0) - (f.coordinate || 0), o);
    }
    return o === 1 / 0 ? 0 : o;
  }
  return n ? void 0 : 0;
}, dg = function(t, r, n) {
  return !t || !t.length || mr(t, Je(n, "type.defaultProps.domain")) ? r : t;
}, kw = function(t, r) {
  var n = t.type.defaultProps ? Se(Se({}, t.type.defaultProps), t.props) : t.props, i = n.dataKey, a = n.name, o = n.unit, u = n.formatter, c = n.tooltipType, s = n.chartType, f = n.hide;
  return Se(Se({}, X(t, !1)), {}, {
    dataKey: i,
    unit: o,
    formatter: u,
    name: a || i,
    color: rp(t),
    value: Pe(r, i),
    type: c,
    payload: r,
    chartType: s,
    hide: f
  });
};
function ri(e) {
  "@babel/helpers - typeof";
  return ri = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, ri(e);
}
function pg(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function St(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? pg(Object(r), !0).forEach(function(n) {
      Dw(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : pg(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function Dw(e, t, r) {
  return t = lC(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function lC(e) {
  var t = fC(e, "string");
  return ri(t) == "symbol" ? t : t + "";
}
function fC(e, t) {
  if (ri(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (ri(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function dC(e, t) {
  return yC(e) || vC(e, t) || hC(e, t) || pC();
}
function pC() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function hC(e, t) {
  if (e) {
    if (typeof e == "string") return hg(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return hg(e, t);
  }
}
function hg(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function vC(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, i, a, o, u = [], c = !0, s = !1;
    try {
      if (a = (r = r.call(e)).next, t !== 0) for (; !(c = (n = a.call(r)).done) && (u.push(n.value), u.length !== t); c = !0) ;
    } catch (f) {
      s = !0, i = f;
    } finally {
      try {
        if (!c && r.return != null && (o = r.return(), Object(o) !== o)) return;
      } finally {
        if (s) throw i;
      }
    }
    return u;
  }
}
function yC(e) {
  if (Array.isArray(e)) return e;
}
var _a = Math.PI / 180, mC = function(t) {
  return t * 180 / Math.PI;
}, we = function(t, r, n, i) {
  return {
    x: t + Math.cos(-_a * i) * n,
    y: r + Math.sin(-_a * i) * n
  };
}, Nw = function(t, r) {
  var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
  return Math.min(Math.abs(t - (n.left || 0) - (n.right || 0)), Math.abs(r - (n.top || 0) - (n.bottom || 0))) / 2;
}, gC = function(t, r, n, i, a) {
  var o = t.width, u = t.height, c = t.startAngle, s = t.endAngle, f = ze(t.cx, o, o / 2), l = ze(t.cy, u, u / 2), d = Nw(o, u, n), h = ze(t.innerRadius, d, 0), m = ze(t.outerRadius, d, d * 0.8), v = Object.keys(r);
  return v.reduce(function(p, g) {
    var x = r[g], w = x.domain, O = x.reversed, y;
    if (ie(x.range))
      i === "angleAxis" ? y = [c, s] : i === "radiusAxis" && (y = [h, m]), O && (y = [y[1], y[0]]);
    else {
      y = x.range;
      var b = y, _ = dC(b, 2);
      c = _[0], s = _[1];
    }
    var A = Cw(x, a), E = A.realScaleType, C = A.scale;
    C.domain(w).range(y), Mw(C);
    var P = Iw(C, St(St({}, x), {}, {
      realScaleType: E
    })), T = St(St(St({}, x), P), {}, {
      range: y,
      radius: m,
      realScaleType: E,
      scale: C,
      cx: f,
      cy: l,
      innerRadius: h,
      outerRadius: m,
      startAngle: c,
      endAngle: s
    });
    return St(St({}, p), {}, Dw({}, g, T));
  }, {});
}, bC = function(t, r) {
  var n = t.x, i = t.y, a = r.x, o = r.y;
  return Math.sqrt(Math.pow(n - a, 2) + Math.pow(i - o, 2));
}, xC = function(t, r) {
  var n = t.x, i = t.y, a = r.cx, o = r.cy, u = bC({
    x: n,
    y: i
  }, {
    x: a,
    y: o
  });
  if (u <= 0)
    return {
      radius: u
    };
  var c = (n - a) / u, s = Math.acos(c);
  return i > o && (s = 2 * Math.PI - s), {
    radius: u,
    angle: mC(s),
    angleInRadian: s
  };
}, wC = function(t) {
  var r = t.startAngle, n = t.endAngle, i = Math.floor(r / 360), a = Math.floor(n / 360), o = Math.min(i, a);
  return {
    startAngle: r - o * 360,
    endAngle: n - o * 360
  };
}, OC = function(t, r) {
  var n = r.startAngle, i = r.endAngle, a = Math.floor(n / 360), o = Math.floor(i / 360), u = Math.min(a, o);
  return t + u * 360;
}, vg = function(t, r) {
  var n = t.x, i = t.y, a = xC({
    x: n,
    y: i
  }, r), o = a.radius, u = a.angle, c = r.innerRadius, s = r.outerRadius;
  if (o < c || o > s)
    return !1;
  if (o === 0)
    return !0;
  var f = wC(r), l = f.startAngle, d = f.endAngle, h = u, m;
  if (l <= d) {
    for (; h > d; )
      h -= 360;
    for (; h < l; )
      h += 360;
    m = h >= l && h <= d;
  } else {
    for (; h > l; )
      h -= 360;
    for (; h < d; )
      h += 360;
    m = h >= d && h <= l;
  }
  return m ? St(St({}, r), {}, {
    radius: o,
    angle: OC(h, r)
  }) : null;
}, qw = function(t) {
  return !/* @__PURE__ */ F.isValidElement(t) && !te(t) && typeof t != "boolean" ? t.className : "";
};
function ni(e) {
  "@babel/helpers - typeof";
  return ni = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, ni(e);
}
var _C = ["offset"];
function AC(e) {
  return TC(e) || EC(e) || PC(e) || SC();
}
function SC() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function PC(e, t) {
  if (e) {
    if (typeof e == "string") return _f(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return _f(e, t);
  }
}
function EC(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function TC(e) {
  if (Array.isArray(e)) return _f(e);
}
function _f(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function jC(e, t) {
  if (e == null) return {};
  var r = $C(e, t), n, i;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (i = 0; i < a.length; i++)
      n = a[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function $C(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
function yg(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function $e(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? yg(Object(r), !0).forEach(function(n) {
      CC(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : yg(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function CC(e, t, r) {
  return t = MC(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function MC(e) {
  var t = IC(e, "string");
  return ni(t) == "symbol" ? t : t + "";
}
function IC(e, t) {
  if (ni(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (ni(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function ii() {
  return ii = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, ii.apply(this, arguments);
}
var RC = function(t) {
  var r = t.value, n = t.formatter, i = ie(t.children) ? r : t.children;
  return te(n) ? n(i) : i;
}, kC = function(t, r) {
  var n = Fe(r - t), i = Math.min(Math.abs(r - t), 360);
  return n * i;
}, DC = function(t, r, n) {
  var i = t.position, a = t.viewBox, o = t.offset, u = t.className, c = a, s = c.cx, f = c.cy, l = c.innerRadius, d = c.outerRadius, h = c.startAngle, m = c.endAngle, v = c.clockWise, p = (l + d) / 2, g = kC(h, m), x = g >= 0 ? 1 : -1, w, O;
  i === "insideStart" ? (w = h + x * o, O = v) : i === "insideEnd" ? (w = m - x * o, O = !v) : i === "end" && (w = m + x * o, O = v), O = g <= 0 ? O : !O;
  var y = we(s, f, p, w), b = we(s, f, p, w + (O ? 1 : -1) * 359), _ = "M".concat(y.x, ",").concat(y.y, `
    A`).concat(p, ",").concat(p, ",0,1,").concat(O ? 0 : 1, `,
    `).concat(b.x, ",").concat(b.y), A = ie(t.id) ? wr("recharts-radial-line-") : t.id;
  return /* @__PURE__ */ S.createElement("text", ii({}, n, {
    dominantBaseline: "central",
    className: ae("recharts-radial-bar-label", u)
  }), /* @__PURE__ */ S.createElement("defs", null, /* @__PURE__ */ S.createElement("path", {
    id: A,
    d: _
  })), /* @__PURE__ */ S.createElement("textPath", {
    xlinkHref: "#".concat(A)
  }, r));
}, NC = function(t) {
  var r = t.viewBox, n = t.offset, i = t.position, a = r, o = a.cx, u = a.cy, c = a.innerRadius, s = a.outerRadius, f = a.startAngle, l = a.endAngle, d = (f + l) / 2;
  if (i === "outside") {
    var h = we(o, u, s + n, d), m = h.x, v = h.y;
    return {
      x: m,
      y: v,
      textAnchor: m >= o ? "start" : "end",
      verticalAnchor: "middle"
    };
  }
  if (i === "center")
    return {
      x: o,
      y: u,
      textAnchor: "middle",
      verticalAnchor: "middle"
    };
  if (i === "centerTop")
    return {
      x: o,
      y: u,
      textAnchor: "middle",
      verticalAnchor: "start"
    };
  if (i === "centerBottom")
    return {
      x: o,
      y: u,
      textAnchor: "middle",
      verticalAnchor: "end"
    };
  var p = (c + s) / 2, g = we(o, u, p, d), x = g.x, w = g.y;
  return {
    x,
    y: w,
    textAnchor: "middle",
    verticalAnchor: "middle"
  };
}, qC = function(t) {
  var r = t.viewBox, n = t.parentViewBox, i = t.offset, a = t.position, o = r, u = o.x, c = o.y, s = o.width, f = o.height, l = f >= 0 ? 1 : -1, d = l * i, h = l > 0 ? "end" : "start", m = l > 0 ? "start" : "end", v = s >= 0 ? 1 : -1, p = v * i, g = v > 0 ? "end" : "start", x = v > 0 ? "start" : "end";
  if (a === "top") {
    var w = {
      x: u + s / 2,
      y: c - l * i,
      textAnchor: "middle",
      verticalAnchor: h
    };
    return $e($e({}, w), n ? {
      height: Math.max(c - n.y, 0),
      width: s
    } : {});
  }
  if (a === "bottom") {
    var O = {
      x: u + s / 2,
      y: c + f + d,
      textAnchor: "middle",
      verticalAnchor: m
    };
    return $e($e({}, O), n ? {
      height: Math.max(n.y + n.height - (c + f), 0),
      width: s
    } : {});
  }
  if (a === "left") {
    var y = {
      x: u - p,
      y: c + f / 2,
      textAnchor: g,
      verticalAnchor: "middle"
    };
    return $e($e({}, y), n ? {
      width: Math.max(y.x - n.x, 0),
      height: f
    } : {});
  }
  if (a === "right") {
    var b = {
      x: u + s + p,
      y: c + f / 2,
      textAnchor: x,
      verticalAnchor: "middle"
    };
    return $e($e({}, b), n ? {
      width: Math.max(n.x + n.width - b.x, 0),
      height: f
    } : {});
  }
  var _ = n ? {
    width: s,
    height: f
  } : {};
  return a === "insideLeft" ? $e({
    x: u + p,
    y: c + f / 2,
    textAnchor: x,
    verticalAnchor: "middle"
  }, _) : a === "insideRight" ? $e({
    x: u + s - p,
    y: c + f / 2,
    textAnchor: g,
    verticalAnchor: "middle"
  }, _) : a === "insideTop" ? $e({
    x: u + s / 2,
    y: c + d,
    textAnchor: "middle",
    verticalAnchor: m
  }, _) : a === "insideBottom" ? $e({
    x: u + s / 2,
    y: c + f - d,
    textAnchor: "middle",
    verticalAnchor: h
  }, _) : a === "insideTopLeft" ? $e({
    x: u + p,
    y: c + d,
    textAnchor: x,
    verticalAnchor: m
  }, _) : a === "insideTopRight" ? $e({
    x: u + s - p,
    y: c + d,
    textAnchor: g,
    verticalAnchor: m
  }, _) : a === "insideBottomLeft" ? $e({
    x: u + p,
    y: c + f - d,
    textAnchor: x,
    verticalAnchor: h
  }, _) : a === "insideBottomRight" ? $e({
    x: u + s - p,
    y: c + f - d,
    textAnchor: g,
    verticalAnchor: h
  }, _) : hn(a) && (z(a.x) || or(a.x)) && (z(a.y) || or(a.y)) ? $e({
    x: u + ze(a.x, s),
    y: c + ze(a.y, f),
    textAnchor: "end",
    verticalAnchor: "end"
  }, _) : $e({
    x: u + s / 2,
    y: c + f / 2,
    textAnchor: "middle",
    verticalAnchor: "middle"
  }, _);
}, LC = function(t) {
  return "cx" in t && z(t.cx);
};
function ke(e) {
  var t = e.offset, r = t === void 0 ? 5 : t, n = jC(e, _C), i = $e({
    offset: r
  }, n), a = i.viewBox, o = i.position, u = i.value, c = i.children, s = i.content, f = i.className, l = f === void 0 ? "" : f, d = i.textBreakAll;
  if (!a || ie(u) && ie(c) && !/* @__PURE__ */ F.isValidElement(s) && !te(s))
    return null;
  if (/* @__PURE__ */ F.isValidElement(s))
    return /* @__PURE__ */ F.cloneElement(s, i);
  var h;
  if (te(s)) {
    if (h = /* @__PURE__ */ F.createElement(s, i), /* @__PURE__ */ F.isValidElement(h))
      return h;
  } else
    h = RC(i);
  var m = LC(a), v = X(i, !0);
  if (m && (o === "insideStart" || o === "insideEnd" || o === "end"))
    return DC(i, h, v);
  var p = m ? NC(i) : qC(i);
  return /* @__PURE__ */ S.createElement(yr, ii({
    className: ae("recharts-label", l)
  }, v, p, {
    breakAll: d
  }), h);
}
ke.displayName = "Label";
var Lw = function(t) {
  var r = t.cx, n = t.cy, i = t.angle, a = t.startAngle, o = t.endAngle, u = t.r, c = t.radius, s = t.innerRadius, f = t.outerRadius, l = t.x, d = t.y, h = t.top, m = t.left, v = t.width, p = t.height, g = t.clockWise, x = t.labelViewBox;
  if (x)
    return x;
  if (z(v) && z(p)) {
    if (z(l) && z(d))
      return {
        x: l,
        y: d,
        width: v,
        height: p
      };
    if (z(h) && z(m))
      return {
        x: h,
        y: m,
        width: v,
        height: p
      };
  }
  return z(l) && z(d) ? {
    x: l,
    y: d,
    width: 0,
    height: 0
  } : z(r) && z(n) ? {
    cx: r,
    cy: n,
    startAngle: a || i || 0,
    endAngle: o || i || 0,
    innerRadius: s || 0,
    outerRadius: f || c || u || 0,
    clockWise: g
  } : t.viewBox ? t.viewBox : {};
}, BC = function(t, r) {
  return t ? t === !0 ? /* @__PURE__ */ S.createElement(ke, {
    key: "label-implicit",
    viewBox: r
  }) : Me(t) ? /* @__PURE__ */ S.createElement(ke, {
    key: "label-implicit",
    viewBox: r,
    value: t
  }) : /* @__PURE__ */ F.isValidElement(t) ? t.type === ke ? /* @__PURE__ */ F.cloneElement(t, {
    key: "label-implicit",
    viewBox: r
  }) : /* @__PURE__ */ S.createElement(ke, {
    key: "label-implicit",
    content: t,
    viewBox: r
  }) : te(t) ? /* @__PURE__ */ S.createElement(ke, {
    key: "label-implicit",
    content: t,
    viewBox: r
  }) : hn(t) ? /* @__PURE__ */ S.createElement(ke, ii({
    viewBox: r
  }, t, {
    key: "label-implicit"
  })) : null : null;
}, FC = function(t, r) {
  var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0;
  if (!t || !t.children && n && !t.label)
    return null;
  var i = t.children, a = Lw(t), o = Qe(i, ke).map(function(c, s) {
    return /* @__PURE__ */ F.cloneElement(c, {
      viewBox: r || a,
      // eslint-disable-next-line react/no-array-index-key
      key: "label-".concat(s)
    });
  });
  if (!n)
    return o;
  var u = BC(t.label, r || a);
  return [u].concat(AC(o));
};
ke.parseViewBox = Lw;
ke.renderCallByParent = FC;
var ul, mg;
function zC() {
  if (mg) return ul;
  mg = 1;
  function e(t) {
    var r = t == null ? 0 : t.length;
    return r ? t[r - 1] : void 0;
  }
  return ul = e, ul;
}
var WC = zC();
const UC = /* @__PURE__ */ ye(WC);
function ai(e) {
  "@babel/helpers - typeof";
  return ai = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, ai(e);
}
var KC = ["valueAccessor"], HC = ["data", "dataKey", "clockWise", "id", "textBreakAll"];
function GC(e) {
  return ZC(e) || XC(e) || YC(e) || VC();
}
function VC() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function YC(e, t) {
  if (e) {
    if (typeof e == "string") return Af(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Af(e, t);
  }
}
function XC(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function ZC(e) {
  if (Array.isArray(e)) return Af(e);
}
function Af(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function Aa() {
  return Aa = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Aa.apply(this, arguments);
}
function gg(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function bg(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? gg(Object(r), !0).forEach(function(n) {
      JC(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : gg(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function JC(e, t, r) {
  return t = QC(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function QC(e) {
  var t = eM(e, "string");
  return ai(t) == "symbol" ? t : t + "";
}
function eM(e, t) {
  if (ai(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (ai(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function xg(e, t) {
  if (e == null) return {};
  var r = tM(e, t), n, i;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (i = 0; i < a.length; i++)
      n = a[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function tM(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
var rM = function(t) {
  return Array.isArray(t.value) ? UC(t.value) : t.value;
};
function gt(e) {
  var t = e.valueAccessor, r = t === void 0 ? rM : t, n = xg(e, KC), i = n.data, a = n.dataKey, o = n.clockWise, u = n.id, c = n.textBreakAll, s = xg(n, HC);
  return !i || !i.length ? null : /* @__PURE__ */ S.createElement(ue, {
    className: "recharts-label-list"
  }, i.map(function(f, l) {
    var d = ie(a) ? r(f, l) : Pe(f && f.payload, a), h = ie(u) ? {} : {
      id: "".concat(u, "-").concat(l)
    };
    return /* @__PURE__ */ S.createElement(ke, Aa({}, X(f, !0), s, h, {
      parentViewBox: f.parentViewBox,
      value: d,
      textBreakAll: c,
      viewBox: ke.parseViewBox(ie(o) ? f : bg(bg({}, f), {}, {
        clockWise: o
      })),
      key: "label-".concat(l),
      index: l
    }));
  }));
}
gt.displayName = "LabelList";
function nM(e, t) {
  return e ? e === !0 ? /* @__PURE__ */ S.createElement(gt, {
    key: "labelList-implicit",
    data: t
  }) : /* @__PURE__ */ S.isValidElement(e) || te(e) ? /* @__PURE__ */ S.createElement(gt, {
    key: "labelList-implicit",
    data: t,
    content: e
  }) : hn(e) ? /* @__PURE__ */ S.createElement(gt, Aa({
    data: t
  }, e, {
    key: "labelList-implicit"
  })) : null : null;
}
function iM(e, t) {
  var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0;
  if (!e || !e.children && r && !e.label)
    return null;
  var n = e.children, i = Qe(n, gt).map(function(o, u) {
    return /* @__PURE__ */ F.cloneElement(o, {
      data: t,
      // eslint-disable-next-line react/no-array-index-key
      key: "labelList-".concat(u)
    });
  });
  if (!r)
    return i;
  var a = nM(e.label, t);
  return [a].concat(GC(i));
}
gt.renderCallByParent = iM;
function oi(e) {
  "@babel/helpers - typeof";
  return oi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, oi(e);
}
function Sf() {
  return Sf = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Sf.apply(this, arguments);
}
function wg(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Og(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? wg(Object(r), !0).forEach(function(n) {
      aM(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : wg(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function aM(e, t, r) {
  return t = oM(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function oM(e) {
  var t = uM(e, "string");
  return oi(t) == "symbol" ? t : t + "";
}
function uM(e, t) {
  if (oi(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (oi(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var cM = function(t, r) {
  var n = Fe(r - t), i = Math.min(Math.abs(r - t), 359.999);
  return n * i;
}, Fi = function(t) {
  var r = t.cx, n = t.cy, i = t.radius, a = t.angle, o = t.sign, u = t.isExternal, c = t.cornerRadius, s = t.cornerIsExternal, f = c * (u ? 1 : -1) + i, l = Math.asin(c / f) / _a, d = s ? a : a + o * l, h = we(r, n, f, d), m = we(r, n, i, d), v = s ? a - o * l : a, p = we(r, n, f * Math.cos(l * _a), v);
  return {
    center: h,
    circleTangency: m,
    lineTangency: p,
    theta: l
  };
}, Bw = function(t) {
  var r = t.cx, n = t.cy, i = t.innerRadius, a = t.outerRadius, o = t.startAngle, u = t.endAngle, c = cM(o, u), s = o + c, f = we(r, n, a, o), l = we(r, n, a, s), d = "M ".concat(f.x, ",").concat(f.y, `
    A `).concat(a, ",").concat(a, `,0,
    `).concat(+(Math.abs(c) > 180), ",").concat(+(o > s), `,
    `).concat(l.x, ",").concat(l.y, `
  `);
  if (i > 0) {
    var h = we(r, n, i, o), m = we(r, n, i, s);
    d += "L ".concat(m.x, ",").concat(m.y, `
            A `).concat(i, ",").concat(i, `,0,
            `).concat(+(Math.abs(c) > 180), ",").concat(+(o <= s), `,
            `).concat(h.x, ",").concat(h.y, " Z");
  } else
    d += "L ".concat(r, ",").concat(n, " Z");
  return d;
}, sM = function(t) {
  var r = t.cx, n = t.cy, i = t.innerRadius, a = t.outerRadius, o = t.cornerRadius, u = t.forceCornerRadius, c = t.cornerIsExternal, s = t.startAngle, f = t.endAngle, l = Fe(f - s), d = Fi({
    cx: r,
    cy: n,
    radius: a,
    angle: s,
    sign: l,
    cornerRadius: o,
    cornerIsExternal: c
  }), h = d.circleTangency, m = d.lineTangency, v = d.theta, p = Fi({
    cx: r,
    cy: n,
    radius: a,
    angle: f,
    sign: -l,
    cornerRadius: o,
    cornerIsExternal: c
  }), g = p.circleTangency, x = p.lineTangency, w = p.theta, O = c ? Math.abs(s - f) : Math.abs(s - f) - v - w;
  if (O < 0)
    return u ? "M ".concat(m.x, ",").concat(m.y, `
        a`).concat(o, ",").concat(o, ",0,0,1,").concat(o * 2, `,0
        a`).concat(o, ",").concat(o, ",0,0,1,").concat(-o * 2, `,0
      `) : Bw({
      cx: r,
      cy: n,
      innerRadius: i,
      outerRadius: a,
      startAngle: s,
      endAngle: f
    });
  var y = "M ".concat(m.x, ",").concat(m.y, `
    A`).concat(o, ",").concat(o, ",0,0,").concat(+(l < 0), ",").concat(h.x, ",").concat(h.y, `
    A`).concat(a, ",").concat(a, ",0,").concat(+(O > 180), ",").concat(+(l < 0), ",").concat(g.x, ",").concat(g.y, `
    A`).concat(o, ",").concat(o, ",0,0,").concat(+(l < 0), ",").concat(x.x, ",").concat(x.y, `
  `);
  if (i > 0) {
    var b = Fi({
      cx: r,
      cy: n,
      radius: i,
      angle: s,
      sign: l,
      isExternal: !0,
      cornerRadius: o,
      cornerIsExternal: c
    }), _ = b.circleTangency, A = b.lineTangency, E = b.theta, C = Fi({
      cx: r,
      cy: n,
      radius: i,
      angle: f,
      sign: -l,
      isExternal: !0,
      cornerRadius: o,
      cornerIsExternal: c
    }), P = C.circleTangency, T = C.lineTangency, $ = C.theta, R = c ? Math.abs(s - f) : Math.abs(s - f) - E - $;
    if (R < 0 && o === 0)
      return "".concat(y, "L").concat(r, ",").concat(n, "Z");
    y += "L".concat(T.x, ",").concat(T.y, `
      A`).concat(o, ",").concat(o, ",0,0,").concat(+(l < 0), ",").concat(P.x, ",").concat(P.y, `
      A`).concat(i, ",").concat(i, ",0,").concat(+(R > 180), ",").concat(+(l > 0), ",").concat(_.x, ",").concat(_.y, `
      A`).concat(o, ",").concat(o, ",0,0,").concat(+(l < 0), ",").concat(A.x, ",").concat(A.y, "Z");
  } else
    y += "L".concat(r, ",").concat(n, "Z");
  return y;
}, lM = {
  cx: 0,
  cy: 0,
  innerRadius: 0,
  outerRadius: 0,
  startAngle: 0,
  endAngle: 0,
  cornerRadius: 0,
  forceCornerRadius: !1,
  cornerIsExternal: !1
}, Fw = function(t) {
  var r = Og(Og({}, lM), t), n = r.cx, i = r.cy, a = r.innerRadius, o = r.outerRadius, u = r.cornerRadius, c = r.forceCornerRadius, s = r.cornerIsExternal, f = r.startAngle, l = r.endAngle, d = r.className;
  if (o < a || f === l)
    return null;
  var h = ae("recharts-sector", d), m = o - a, v = ze(u, m, 0, !0), p;
  return v > 0 && Math.abs(f - l) < 360 ? p = sM({
    cx: n,
    cy: i,
    innerRadius: a,
    outerRadius: o,
    cornerRadius: Math.min(v, m / 2),
    forceCornerRadius: c,
    cornerIsExternal: s,
    startAngle: f,
    endAngle: l
  }) : p = Bw({
    cx: n,
    cy: i,
    innerRadius: a,
    outerRadius: o,
    startAngle: f,
    endAngle: l
  }), /* @__PURE__ */ S.createElement("path", Sf({}, X(r, !0), {
    className: h,
    d: p,
    role: "img"
  }));
};
function ui(e) {
  "@babel/helpers - typeof";
  return ui = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, ui(e);
}
function Pf() {
  return Pf = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Pf.apply(this, arguments);
}
function _g(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Ag(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? _g(Object(r), !0).forEach(function(n) {
      fM(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : _g(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function fM(e, t, r) {
  return t = dM(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function dM(e) {
  var t = pM(e, "string");
  return ui(t) == "symbol" ? t : t + "";
}
function pM(e, t) {
  if (ui(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (ui(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var Sg = {
  curveBasisClosed: I1,
  curveBasisOpen: R1,
  curveBasis: M1,
  curveBumpX: g1,
  curveBumpY: b1,
  curveLinearClosed: k1,
  curveLinear: io,
  curveMonotoneX: D1,
  curveMonotoneY: N1,
  curveNatural: q1,
  curveStep: L1,
  curveStepAfter: F1,
  curveStepBefore: B1
}, zi = function(t) {
  return t.x === +t.x && t.y === +t.y;
}, Pn = function(t) {
  return t.x;
}, En = function(t) {
  return t.y;
}, hM = function(t, r) {
  if (te(t))
    return t;
  var n = "curve".concat(ro(t));
  return (n === "curveMonotone" || n === "curveBump") && r ? Sg["".concat(n).concat(r === "vertical" ? "Y" : "X")] : Sg[n] || io;
}, vM = function(t) {
  var r = t.type, n = r === void 0 ? "linear" : r, i = t.points, a = i === void 0 ? [] : i, o = t.baseLine, u = t.layout, c = t.connectNulls, s = c === void 0 ? !1 : c, f = hM(n, u), l = s ? a.filter(function(v) {
    return zi(v);
  }) : a, d;
  if (Array.isArray(o)) {
    var h = s ? o.filter(function(v) {
      return zi(v);
    }) : o, m = l.map(function(v, p) {
      return Ag(Ag({}, v), {}, {
        base: h[p]
      });
    });
    return u === "vertical" ? d = Mi().y(En).x1(Pn).x0(function(v) {
      return v.base.x;
    }) : d = Mi().x(Pn).y1(En).y0(function(v) {
      return v.base.y;
    }), d.defined(zi).curve(f), d(m);
  }
  return u === "vertical" && z(o) ? d = Mi().y(En).x1(Pn).x0(o) : z(o) ? d = Mi().x(Pn).y1(En).y0(o) : d = L0().x(Pn).y(En), d.defined(zi).curve(f), d(l);
}, pr = function(t) {
  var r = t.className, n = t.points, i = t.path, a = t.pathRef;
  if ((!n || !n.length) && !i)
    return null;
  var o = n && n.length ? vM(t) : i;
  return /* @__PURE__ */ F.createElement("path", Pf({}, X(t, !1), Zi(t), {
    className: ae("recharts-curve", r),
    d: o,
    ref: a
  }));
}, Wi = { exports: {} }, Ui = { exports: {} }, de = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Pg;
function yM() {
  if (Pg) return de;
  Pg = 1;
  var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, r = e ? Symbol.for("react.portal") : 60106, n = e ? Symbol.for("react.fragment") : 60107, i = e ? Symbol.for("react.strict_mode") : 60108, a = e ? Symbol.for("react.profiler") : 60114, o = e ? Symbol.for("react.provider") : 60109, u = e ? Symbol.for("react.context") : 60110, c = e ? Symbol.for("react.async_mode") : 60111, s = e ? Symbol.for("react.concurrent_mode") : 60111, f = e ? Symbol.for("react.forward_ref") : 60112, l = e ? Symbol.for("react.suspense") : 60113, d = e ? Symbol.for("react.suspense_list") : 60120, h = e ? Symbol.for("react.memo") : 60115, m = e ? Symbol.for("react.lazy") : 60116, v = e ? Symbol.for("react.block") : 60121, p = e ? Symbol.for("react.fundamental") : 60117, g = e ? Symbol.for("react.responder") : 60118, x = e ? Symbol.for("react.scope") : 60119;
  function w(y) {
    if (typeof y == "object" && y !== null) {
      var b = y.$$typeof;
      switch (b) {
        case t:
          switch (y = y.type, y) {
            case c:
            case s:
            case n:
            case a:
            case i:
            case l:
              return y;
            default:
              switch (y = y && y.$$typeof, y) {
                case u:
                case f:
                case m:
                case h:
                case o:
                  return y;
                default:
                  return b;
              }
          }
        case r:
          return b;
      }
    }
  }
  function O(y) {
    return w(y) === s;
  }
  return de.AsyncMode = c, de.ConcurrentMode = s, de.ContextConsumer = u, de.ContextProvider = o, de.Element = t, de.ForwardRef = f, de.Fragment = n, de.Lazy = m, de.Memo = h, de.Portal = r, de.Profiler = a, de.StrictMode = i, de.Suspense = l, de.isAsyncMode = function(y) {
    return O(y) || w(y) === c;
  }, de.isConcurrentMode = O, de.isContextConsumer = function(y) {
    return w(y) === u;
  }, de.isContextProvider = function(y) {
    return w(y) === o;
  }, de.isElement = function(y) {
    return typeof y == "object" && y !== null && y.$$typeof === t;
  }, de.isForwardRef = function(y) {
    return w(y) === f;
  }, de.isFragment = function(y) {
    return w(y) === n;
  }, de.isLazy = function(y) {
    return w(y) === m;
  }, de.isMemo = function(y) {
    return w(y) === h;
  }, de.isPortal = function(y) {
    return w(y) === r;
  }, de.isProfiler = function(y) {
    return w(y) === a;
  }, de.isStrictMode = function(y) {
    return w(y) === i;
  }, de.isSuspense = function(y) {
    return w(y) === l;
  }, de.isValidElementType = function(y) {
    return typeof y == "string" || typeof y == "function" || y === n || y === s || y === a || y === i || y === l || y === d || typeof y == "object" && y !== null && (y.$$typeof === m || y.$$typeof === h || y.$$typeof === o || y.$$typeof === u || y.$$typeof === f || y.$$typeof === p || y.$$typeof === g || y.$$typeof === x || y.$$typeof === v);
  }, de.typeOf = w, de;
}
var pe = {};
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Eg;
function mM() {
  return Eg || (Eg = 1, process.env.NODE_ENV !== "production" && (function() {
    var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, r = e ? Symbol.for("react.portal") : 60106, n = e ? Symbol.for("react.fragment") : 60107, i = e ? Symbol.for("react.strict_mode") : 60108, a = e ? Symbol.for("react.profiler") : 60114, o = e ? Symbol.for("react.provider") : 60109, u = e ? Symbol.for("react.context") : 60110, c = e ? Symbol.for("react.async_mode") : 60111, s = e ? Symbol.for("react.concurrent_mode") : 60111, f = e ? Symbol.for("react.forward_ref") : 60112, l = e ? Symbol.for("react.suspense") : 60113, d = e ? Symbol.for("react.suspense_list") : 60120, h = e ? Symbol.for("react.memo") : 60115, m = e ? Symbol.for("react.lazy") : 60116, v = e ? Symbol.for("react.block") : 60121, p = e ? Symbol.for("react.fundamental") : 60117, g = e ? Symbol.for("react.responder") : 60118, x = e ? Symbol.for("react.scope") : 60119;
    function w(j) {
      return typeof j == "string" || typeof j == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      j === n || j === s || j === a || j === i || j === l || j === d || typeof j == "object" && j !== null && (j.$$typeof === m || j.$$typeof === h || j.$$typeof === o || j.$$typeof === u || j.$$typeof === f || j.$$typeof === p || j.$$typeof === g || j.$$typeof === x || j.$$typeof === v);
    }
    function O(j) {
      if (typeof j == "object" && j !== null) {
        var ce = j.$$typeof;
        switch (ce) {
          case t:
            var U = j.type;
            switch (U) {
              case c:
              case s:
              case n:
              case a:
              case i:
              case l:
                return U;
              default:
                var ge = U && U.$$typeof;
                switch (ge) {
                  case u:
                  case f:
                  case m:
                  case h:
                  case o:
                    return ge;
                  default:
                    return ce;
                }
            }
          case r:
            return ce;
        }
      }
    }
    var y = c, b = s, _ = u, A = o, E = t, C = f, P = n, T = m, $ = h, R = r, I = a, k = i, q = l, W = !1;
    function K(j) {
      return W || (W = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), M(j) || O(j) === c;
    }
    function M(j) {
      return O(j) === s;
    }
    function N(j) {
      return O(j) === u;
    }
    function L(j) {
      return O(j) === o;
    }
    function H(j) {
      return typeof j == "object" && j !== null && j.$$typeof === t;
    }
    function V(j) {
      return O(j) === f;
    }
    function J(j) {
      return O(j) === n;
    }
    function Q(j) {
      return O(j) === m;
    }
    function ne(j) {
      return O(j) === h;
    }
    function re(j) {
      return O(j) === r;
    }
    function B(j) {
      return O(j) === a;
    }
    function G(j) {
      return O(j) === i;
    }
    function Z(j) {
      return O(j) === l;
    }
    pe.AsyncMode = y, pe.ConcurrentMode = b, pe.ContextConsumer = _, pe.ContextProvider = A, pe.Element = E, pe.ForwardRef = C, pe.Fragment = P, pe.Lazy = T, pe.Memo = $, pe.Portal = R, pe.Profiler = I, pe.StrictMode = k, pe.Suspense = q, pe.isAsyncMode = K, pe.isConcurrentMode = M, pe.isContextConsumer = N, pe.isContextProvider = L, pe.isElement = H, pe.isForwardRef = V, pe.isFragment = J, pe.isLazy = Q, pe.isMemo = ne, pe.isPortal = re, pe.isProfiler = B, pe.isStrictMode = G, pe.isSuspense = Z, pe.isValidElementType = w, pe.typeOf = O;
  })()), pe;
}
var Tg;
function zw() {
  return Tg || (Tg = 1, process.env.NODE_ENV === "production" ? Ui.exports = yM() : Ui.exports = mM()), Ui.exports;
}
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var cl, jg;
function gM() {
  if (jg) return cl;
  jg = 1;
  var e = Object.getOwnPropertySymbols, t = Object.prototype.hasOwnProperty, r = Object.prototype.propertyIsEnumerable;
  function n(a) {
    if (a == null)
      throw new TypeError("Object.assign cannot be called with null or undefined");
    return Object(a);
  }
  function i() {
    try {
      if (!Object.assign)
        return !1;
      var a = new String("abc");
      if (a[5] = "de", Object.getOwnPropertyNames(a)[0] === "5")
        return !1;
      for (var o = {}, u = 0; u < 10; u++)
        o["_" + String.fromCharCode(u)] = u;
      var c = Object.getOwnPropertyNames(o).map(function(f) {
        return o[f];
      });
      if (c.join("") !== "0123456789")
        return !1;
      var s = {};
      return "abcdefghijklmnopqrst".split("").forEach(function(f) {
        s[f] = f;
      }), Object.keys(Object.assign({}, s)).join("") === "abcdefghijklmnopqrst";
    } catch {
      return !1;
    }
  }
  return cl = i() ? Object.assign : function(a, o) {
    for (var u, c = n(a), s, f = 1; f < arguments.length; f++) {
      u = Object(arguments[f]);
      for (var l in u)
        t.call(u, l) && (c[l] = u[l]);
      if (e) {
        s = e(u);
        for (var d = 0; d < s.length; d++)
          r.call(u, s[d]) && (c[s[d]] = u[s[d]]);
      }
    }
    return c;
  }, cl;
}
var sl, $g;
function np() {
  if ($g) return sl;
  $g = 1;
  var e = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return sl = e, sl;
}
var ll, Cg;
function Ww() {
  return Cg || (Cg = 1, ll = Function.call.bind(Object.prototype.hasOwnProperty)), ll;
}
var fl, Mg;
function bM() {
  if (Mg) return fl;
  Mg = 1;
  var e = function() {
  };
  if (process.env.NODE_ENV !== "production") {
    var t = /* @__PURE__ */ np(), r = {}, n = /* @__PURE__ */ Ww();
    e = function(a) {
      var o = "Warning: " + a;
      typeof console < "u" && console.error(o);
      try {
        throw new Error(o);
      } catch {
      }
    };
  }
  function i(a, o, u, c, s) {
    if (process.env.NODE_ENV !== "production") {
      for (var f in a)
        if (n(a, f)) {
          var l;
          try {
            if (typeof a[f] != "function") {
              var d = Error(
                (c || "React class") + ": " + u + " type `" + f + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof a[f] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`."
              );
              throw d.name = "Invariant Violation", d;
            }
            l = a[f](o, f, c, u, null, t);
          } catch (m) {
            l = m;
          }
          if (l && !(l instanceof Error) && e(
            (c || "React class") + ": type specification of " + u + " `" + f + "` is invalid; the type checker function must return `null` or an `Error` but returned a " + typeof l + ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."
          ), l instanceof Error && !(l.message in r)) {
            r[l.message] = !0;
            var h = s ? s() : "";
            e(
              "Failed " + u + " type: " + l.message + (h ?? "")
            );
          }
        }
    }
  }
  return i.resetWarningCache = function() {
    process.env.NODE_ENV !== "production" && (r = {});
  }, fl = i, fl;
}
var dl, Ig;
function xM() {
  if (Ig) return dl;
  Ig = 1;
  var e = zw(), t = gM(), r = /* @__PURE__ */ np(), n = /* @__PURE__ */ Ww(), i = /* @__PURE__ */ bM(), a = function() {
  };
  process.env.NODE_ENV !== "production" && (a = function(u) {
    var c = "Warning: " + u;
    typeof console < "u" && console.error(c);
    try {
      throw new Error(c);
    } catch {
    }
  });
  function o() {
    return null;
  }
  return dl = function(u, c) {
    var s = typeof Symbol == "function" && Symbol.iterator, f = "@@iterator";
    function l(M) {
      var N = M && (s && M[s] || M[f]);
      if (typeof N == "function")
        return N;
    }
    var d = "<<anonymous>>", h = {
      array: g("array"),
      bigint: g("bigint"),
      bool: g("boolean"),
      func: g("function"),
      number: g("number"),
      object: g("object"),
      string: g("string"),
      symbol: g("symbol"),
      any: x(),
      arrayOf: w,
      element: O(),
      elementType: y(),
      instanceOf: b,
      node: C(),
      objectOf: A,
      oneOf: _,
      oneOfType: E,
      shape: T,
      exact: $
    };
    function m(M, N) {
      return M === N ? M !== 0 || 1 / M === 1 / N : M !== M && N !== N;
    }
    function v(M, N) {
      this.message = M, this.data = N && typeof N == "object" ? N : {}, this.stack = "";
    }
    v.prototype = Error.prototype;
    function p(M) {
      if (process.env.NODE_ENV !== "production")
        var N = {}, L = 0;
      function H(J, Q, ne, re, B, G, Z) {
        if (re = re || d, G = G || ne, Z !== r) {
          if (c) {
            var j = new Error(
              "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types"
            );
            throw j.name = "Invariant Violation", j;
          } else if (process.env.NODE_ENV !== "production" && typeof console < "u") {
            var ce = re + ":" + ne;
            !N[ce] && // Avoid spamming the console because they are often not actionable except for lib authors
            L < 3 && (a(
              "You are manually calling a React.PropTypes validation function for the `" + G + "` prop on `" + re + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."
            ), N[ce] = !0, L++);
          }
        }
        return Q[ne] == null ? J ? Q[ne] === null ? new v("The " + B + " `" + G + "` is marked as required " + ("in `" + re + "`, but its value is `null`.")) : new v("The " + B + " `" + G + "` is marked as required in " + ("`" + re + "`, but its value is `undefined`.")) : null : M(Q, ne, re, B, G);
      }
      var V = H.bind(null, !1);
      return V.isRequired = H.bind(null, !0), V;
    }
    function g(M) {
      function N(L, H, V, J, Q, ne) {
        var re = L[H], B = k(re);
        if (B !== M) {
          var G = q(re);
          return new v(
            "Invalid " + J + " `" + Q + "` of type " + ("`" + G + "` supplied to `" + V + "`, expected ") + ("`" + M + "`."),
            { expectedType: M }
          );
        }
        return null;
      }
      return p(N);
    }
    function x() {
      return p(o);
    }
    function w(M) {
      function N(L, H, V, J, Q) {
        if (typeof M != "function")
          return new v("Property `" + Q + "` of component `" + V + "` has invalid PropType notation inside arrayOf.");
        var ne = L[H];
        if (!Array.isArray(ne)) {
          var re = k(ne);
          return new v("Invalid " + J + " `" + Q + "` of type " + ("`" + re + "` supplied to `" + V + "`, expected an array."));
        }
        for (var B = 0; B < ne.length; B++) {
          var G = M(ne, B, V, J, Q + "[" + B + "]", r);
          if (G instanceof Error)
            return G;
        }
        return null;
      }
      return p(N);
    }
    function O() {
      function M(N, L, H, V, J) {
        var Q = N[L];
        if (!u(Q)) {
          var ne = k(Q);
          return new v("Invalid " + V + " `" + J + "` of type " + ("`" + ne + "` supplied to `" + H + "`, expected a single ReactElement."));
        }
        return null;
      }
      return p(M);
    }
    function y() {
      function M(N, L, H, V, J) {
        var Q = N[L];
        if (!e.isValidElementType(Q)) {
          var ne = k(Q);
          return new v("Invalid " + V + " `" + J + "` of type " + ("`" + ne + "` supplied to `" + H + "`, expected a single ReactElement type."));
        }
        return null;
      }
      return p(M);
    }
    function b(M) {
      function N(L, H, V, J, Q) {
        if (!(L[H] instanceof M)) {
          var ne = M.name || d, re = K(L[H]);
          return new v("Invalid " + J + " `" + Q + "` of type " + ("`" + re + "` supplied to `" + V + "`, expected ") + ("instance of `" + ne + "`."));
        }
        return null;
      }
      return p(N);
    }
    function _(M) {
      if (!Array.isArray(M))
        return process.env.NODE_ENV !== "production" && (arguments.length > 1 ? a(
          "Invalid arguments supplied to oneOf, expected an array, got " + arguments.length + " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."
        ) : a("Invalid argument supplied to oneOf, expected an array.")), o;
      function N(L, H, V, J, Q) {
        for (var ne = L[H], re = 0; re < M.length; re++)
          if (m(ne, M[re]))
            return null;
        var B = JSON.stringify(M, function(Z, j) {
          var ce = q(j);
          return ce === "symbol" ? String(j) : j;
        });
        return new v("Invalid " + J + " `" + Q + "` of value `" + String(ne) + "` " + ("supplied to `" + V + "`, expected one of " + B + "."));
      }
      return p(N);
    }
    function A(M) {
      function N(L, H, V, J, Q) {
        if (typeof M != "function")
          return new v("Property `" + Q + "` of component `" + V + "` has invalid PropType notation inside objectOf.");
        var ne = L[H], re = k(ne);
        if (re !== "object")
          return new v("Invalid " + J + " `" + Q + "` of type " + ("`" + re + "` supplied to `" + V + "`, expected an object."));
        for (var B in ne)
          if (n(ne, B)) {
            var G = M(ne, B, V, J, Q + "." + B, r);
            if (G instanceof Error)
              return G;
          }
        return null;
      }
      return p(N);
    }
    function E(M) {
      if (!Array.isArray(M))
        return process.env.NODE_ENV !== "production" && a("Invalid argument supplied to oneOfType, expected an instance of array."), o;
      for (var N = 0; N < M.length; N++) {
        var L = M[N];
        if (typeof L != "function")
          return a(
            "Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + W(L) + " at index " + N + "."
          ), o;
      }
      function H(V, J, Q, ne, re) {
        for (var B = [], G = 0; G < M.length; G++) {
          var Z = M[G], j = Z(V, J, Q, ne, re, r);
          if (j == null)
            return null;
          j.data && n(j.data, "expectedType") && B.push(j.data.expectedType);
        }
        var ce = B.length > 0 ? ", expected one of type [" + B.join(", ") + "]" : "";
        return new v("Invalid " + ne + " `" + re + "` supplied to " + ("`" + Q + "`" + ce + "."));
      }
      return p(H);
    }
    function C() {
      function M(N, L, H, V, J) {
        return R(N[L]) ? null : new v("Invalid " + V + " `" + J + "` supplied to " + ("`" + H + "`, expected a ReactNode."));
      }
      return p(M);
    }
    function P(M, N, L, H, V) {
      return new v(
        (M || "React class") + ": " + N + " type `" + L + "." + H + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + V + "`."
      );
    }
    function T(M) {
      function N(L, H, V, J, Q) {
        var ne = L[H], re = k(ne);
        if (re !== "object")
          return new v("Invalid " + J + " `" + Q + "` of type `" + re + "` " + ("supplied to `" + V + "`, expected `object`."));
        for (var B in M) {
          var G = M[B];
          if (typeof G != "function")
            return P(V, J, Q, B, q(G));
          var Z = G(ne, B, V, J, Q + "." + B, r);
          if (Z)
            return Z;
        }
        return null;
      }
      return p(N);
    }
    function $(M) {
      function N(L, H, V, J, Q) {
        var ne = L[H], re = k(ne);
        if (re !== "object")
          return new v("Invalid " + J + " `" + Q + "` of type `" + re + "` " + ("supplied to `" + V + "`, expected `object`."));
        var B = t({}, L[H], M);
        for (var G in B) {
          var Z = M[G];
          if (n(M, G) && typeof Z != "function")
            return P(V, J, Q, G, q(Z));
          if (!Z)
            return new v(
              "Invalid " + J + " `" + Q + "` key `" + G + "` supplied to `" + V + "`.\nBad object: " + JSON.stringify(L[H], null, "  ") + `
Valid keys: ` + JSON.stringify(Object.keys(M), null, "  ")
            );
          var j = Z(ne, G, V, J, Q + "." + G, r);
          if (j)
            return j;
        }
        return null;
      }
      return p(N);
    }
    function R(M) {
      switch (typeof M) {
        case "number":
        case "string":
        case "undefined":
          return !0;
        case "boolean":
          return !M;
        case "object":
          if (Array.isArray(M))
            return M.every(R);
          if (M === null || u(M))
            return !0;
          var N = l(M);
          if (N) {
            var L = N.call(M), H;
            if (N !== M.entries) {
              for (; !(H = L.next()).done; )
                if (!R(H.value))
                  return !1;
            } else
              for (; !(H = L.next()).done; ) {
                var V = H.value;
                if (V && !R(V[1]))
                  return !1;
              }
          } else
            return !1;
          return !0;
        default:
          return !1;
      }
    }
    function I(M, N) {
      return M === "symbol" ? !0 : N ? N["@@toStringTag"] === "Symbol" || typeof Symbol == "function" && N instanceof Symbol : !1;
    }
    function k(M) {
      var N = typeof M;
      return Array.isArray(M) ? "array" : M instanceof RegExp ? "object" : I(N, M) ? "symbol" : N;
    }
    function q(M) {
      if (typeof M > "u" || M === null)
        return "" + M;
      var N = k(M);
      if (N === "object") {
        if (M instanceof Date)
          return "date";
        if (M instanceof RegExp)
          return "regexp";
      }
      return N;
    }
    function W(M) {
      var N = q(M);
      switch (N) {
        case "array":
        case "object":
          return "an " + N;
        case "boolean":
        case "date":
        case "regexp":
          return "a " + N;
        default:
          return N;
      }
    }
    function K(M) {
      return !M.constructor || !M.constructor.name ? d : M.constructor.name;
    }
    return h.checkPropTypes = i, h.resetWarningCache = i.resetWarningCache, h.PropTypes = h, h;
  }, dl;
}
var pl, Rg;
function wM() {
  if (Rg) return pl;
  Rg = 1;
  var e = /* @__PURE__ */ np();
  function t() {
  }
  function r() {
  }
  return r.resetWarningCache = t, pl = function() {
    function n(o, u, c, s, f, l) {
      if (l !== e) {
        var d = new Error(
          "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types"
        );
        throw d.name = "Invariant Violation", d;
      }
    }
    n.isRequired = n;
    function i() {
      return n;
    }
    var a = {
      array: n,
      bigint: n,
      bool: n,
      func: n,
      number: n,
      object: n,
      string: n,
      symbol: n,
      any: n,
      arrayOf: i,
      element: n,
      elementType: n,
      instanceOf: i,
      node: n,
      objectOf: i,
      oneOf: i,
      oneOfType: i,
      shape: i,
      exact: i,
      checkPropTypes: r,
      resetWarningCache: t
    };
    return a.PropTypes = a, a;
  }, pl;
}
var kg;
function OM() {
  if (kg) return Wi.exports;
  if (kg = 1, process.env.NODE_ENV !== "production") {
    var e = zw(), t = !0;
    Wi.exports = /* @__PURE__ */ xM()(e.isElement, t);
  } else
    Wi.exports = /* @__PURE__ */ wM()();
  return Wi.exports;
}
var _M = /* @__PURE__ */ OM();
const he = /* @__PURE__ */ ye(_M);
var AM = Object.getOwnPropertyNames, SM = Object.getOwnPropertySymbols, PM = Object.prototype.hasOwnProperty;
function Dg(e, t) {
  return function(n, i, a) {
    return e(n, i, a) && t(n, i, a);
  };
}
function Ki(e) {
  return function(r, n, i) {
    if (!r || !n || typeof r != "object" || typeof n != "object")
      return e(r, n, i);
    var a = i.cache, o = a.get(r), u = a.get(n);
    if (o && u)
      return o === n && u === r;
    a.set(r, n), a.set(n, r);
    var c = e(r, n, i);
    return a.delete(r), a.delete(n), c;
  };
}
function EM(e) {
  return e != null ? e[Symbol.toStringTag] : void 0;
}
function Ng(e) {
  return AM(e).concat(SM(e));
}
var TM = Object.hasOwn || (function(e, t) {
  return PM.call(e, t);
});
function Ar(e, t) {
  return e === t || !e && !t && e !== e && t !== t;
}
var jM = "__v", $M = "__o", CM = "_owner", qg = Object.getOwnPropertyDescriptor, Lg = Object.keys;
function MM(e, t, r) {
  var n = e.length;
  if (t.length !== n)
    return !1;
  for (; n-- > 0; )
    if (!r.equals(e[n], t[n], n, n, e, t, r))
      return !1;
  return !0;
}
function IM(e, t) {
  return Ar(e.getTime(), t.getTime());
}
function RM(e, t) {
  return e.name === t.name && e.message === t.message && e.cause === t.cause && e.stack === t.stack;
}
function kM(e, t) {
  return e === t;
}
function Bg(e, t, r) {
  var n = e.size;
  if (n !== t.size)
    return !1;
  if (!n)
    return !0;
  for (var i = new Array(n), a = e.entries(), o, u, c = 0; (o = a.next()) && !o.done; ) {
    for (var s = t.entries(), f = !1, l = 0; (u = s.next()) && !u.done; ) {
      if (i[l]) {
        l++;
        continue;
      }
      var d = o.value, h = u.value;
      if (r.equals(d[0], h[0], c, l, e, t, r) && r.equals(d[1], h[1], d[0], h[0], e, t, r)) {
        f = i[l] = !0;
        break;
      }
      l++;
    }
    if (!f)
      return !1;
    c++;
  }
  return !0;
}
var DM = Ar;
function NM(e, t, r) {
  var n = Lg(e), i = n.length;
  if (Lg(t).length !== i)
    return !1;
  for (; i-- > 0; )
    if (!Uw(e, t, r, n[i]))
      return !1;
  return !0;
}
function Tn(e, t, r) {
  var n = Ng(e), i = n.length;
  if (Ng(t).length !== i)
    return !1;
  for (var a, o, u; i-- > 0; )
    if (a = n[i], !Uw(e, t, r, a) || (o = qg(e, a), u = qg(t, a), (o || u) && (!o || !u || o.configurable !== u.configurable || o.enumerable !== u.enumerable || o.writable !== u.writable)))
      return !1;
  return !0;
}
function qM(e, t) {
  return Ar(e.valueOf(), t.valueOf());
}
function LM(e, t) {
  return e.source === t.source && e.flags === t.flags;
}
function Fg(e, t, r) {
  var n = e.size;
  if (n !== t.size)
    return !1;
  if (!n)
    return !0;
  for (var i = new Array(n), a = e.values(), o, u; (o = a.next()) && !o.done; ) {
    for (var c = t.values(), s = !1, f = 0; (u = c.next()) && !u.done; ) {
      if (!i[f] && r.equals(o.value, u.value, o.value, u.value, e, t, r)) {
        s = i[f] = !0;
        break;
      }
      f++;
    }
    if (!s)
      return !1;
  }
  return !0;
}
function BM(e, t) {
  var r = e.length;
  if (t.length !== r)
    return !1;
  for (; r-- > 0; )
    if (e[r] !== t[r])
      return !1;
  return !0;
}
function FM(e, t) {
  return e.hostname === t.hostname && e.pathname === t.pathname && e.protocol === t.protocol && e.port === t.port && e.hash === t.hash && e.username === t.username && e.password === t.password;
}
function Uw(e, t, r, n) {
  return (n === CM || n === $M || n === jM) && (e.$$typeof || t.$$typeof) ? !0 : TM(t, n) && r.equals(e[n], t[n], n, n, e, t, r);
}
var zM = "[object Arguments]", WM = "[object Boolean]", UM = "[object Date]", KM = "[object Error]", HM = "[object Map]", GM = "[object Number]", VM = "[object Object]", YM = "[object RegExp]", XM = "[object Set]", ZM = "[object String]", JM = "[object URL]", QM = Array.isArray, zg = typeof ArrayBuffer == "function" && ArrayBuffer.isView ? ArrayBuffer.isView : null, Wg = Object.assign, eI = Object.prototype.toString.call.bind(Object.prototype.toString);
function tI(e) {
  var t = e.areArraysEqual, r = e.areDatesEqual, n = e.areErrorsEqual, i = e.areFunctionsEqual, a = e.areMapsEqual, o = e.areNumbersEqual, u = e.areObjectsEqual, c = e.arePrimitiveWrappersEqual, s = e.areRegExpsEqual, f = e.areSetsEqual, l = e.areTypedArraysEqual, d = e.areUrlsEqual, h = e.unknownTagComparators;
  return function(v, p, g) {
    if (v === p)
      return !0;
    if (v == null || p == null)
      return !1;
    var x = typeof v;
    if (x !== typeof p)
      return !1;
    if (x !== "object")
      return x === "number" ? o(v, p, g) : x === "function" ? i(v, p, g) : !1;
    var w = v.constructor;
    if (w !== p.constructor)
      return !1;
    if (w === Object)
      return u(v, p, g);
    if (QM(v))
      return t(v, p, g);
    if (zg != null && zg(v))
      return l(v, p, g);
    if (w === Date)
      return r(v, p, g);
    if (w === RegExp)
      return s(v, p, g);
    if (w === Map)
      return a(v, p, g);
    if (w === Set)
      return f(v, p, g);
    var O = eI(v);
    if (O === UM)
      return r(v, p, g);
    if (O === YM)
      return s(v, p, g);
    if (O === HM)
      return a(v, p, g);
    if (O === XM)
      return f(v, p, g);
    if (O === VM)
      return typeof v.then != "function" && typeof p.then != "function" && u(v, p, g);
    if (O === JM)
      return d(v, p, g);
    if (O === KM)
      return n(v, p, g);
    if (O === zM)
      return u(v, p, g);
    if (O === WM || O === GM || O === ZM)
      return c(v, p, g);
    if (h) {
      var y = h[O];
      if (!y) {
        var b = EM(v);
        b && (y = h[b]);
      }
      if (y)
        return y(v, p, g);
    }
    return !1;
  };
}
function rI(e) {
  var t = e.circular, r = e.createCustomConfig, n = e.strict, i = {
    areArraysEqual: n ? Tn : MM,
    areDatesEqual: IM,
    areErrorsEqual: RM,
    areFunctionsEqual: kM,
    areMapsEqual: n ? Dg(Bg, Tn) : Bg,
    areNumbersEqual: DM,
    areObjectsEqual: n ? Tn : NM,
    arePrimitiveWrappersEqual: qM,
    areRegExpsEqual: LM,
    areSetsEqual: n ? Dg(Fg, Tn) : Fg,
    areTypedArraysEqual: n ? Tn : BM,
    areUrlsEqual: FM,
    unknownTagComparators: void 0
  };
  if (r && (i = Wg({}, i, r(i))), t) {
    var a = Ki(i.areArraysEqual), o = Ki(i.areMapsEqual), u = Ki(i.areObjectsEqual), c = Ki(i.areSetsEqual);
    i = Wg({}, i, {
      areArraysEqual: a,
      areMapsEqual: o,
      areObjectsEqual: u,
      areSetsEqual: c
    });
  }
  return i;
}
function nI(e) {
  return function(t, r, n, i, a, o, u) {
    return e(t, r, u);
  };
}
function iI(e) {
  var t = e.circular, r = e.comparator, n = e.createState, i = e.equals, a = e.strict;
  if (n)
    return function(c, s) {
      var f = n(), l = f.cache, d = l === void 0 ? t ? /* @__PURE__ */ new WeakMap() : void 0 : l, h = f.meta;
      return r(c, s, {
        cache: d,
        equals: i,
        meta: h,
        strict: a
      });
    };
  if (t)
    return function(c, s) {
      return r(c, s, {
        cache: /* @__PURE__ */ new WeakMap(),
        equals: i,
        meta: void 0,
        strict: a
      });
    };
  var o = {
    cache: void 0,
    equals: i,
    meta: void 0,
    strict: a
  };
  return function(c, s) {
    return r(c, s, o);
  };
}
var aI = Zt();
Zt({ strict: !0 });
Zt({ circular: !0 });
Zt({
  circular: !0,
  strict: !0
});
Zt({
  createInternalComparator: function() {
    return Ar;
  }
});
Zt({
  strict: !0,
  createInternalComparator: function() {
    return Ar;
  }
});
Zt({
  circular: !0,
  createInternalComparator: function() {
    return Ar;
  }
});
Zt({
  circular: !0,
  createInternalComparator: function() {
    return Ar;
  },
  strict: !0
});
function Zt(e) {
  e === void 0 && (e = {});
  var t = e.circular, r = t === void 0 ? !1 : t, n = e.createInternalComparator, i = e.createState, a = e.strict, o = a === void 0 ? !1 : a, u = rI(e), c = tI(u), s = n ? n(c) : nI(c);
  return iI({ circular: r, comparator: c, createState: i, equals: s, strict: o });
}
function oI(e) {
  typeof requestAnimationFrame < "u" && requestAnimationFrame(e);
}
function Ug(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, r = -1, n = function i(a) {
    r < 0 && (r = a), a - r > t ? (e(a), r = -1) : oI(i);
  };
  requestAnimationFrame(n);
}
function Ef(e) {
  "@babel/helpers - typeof";
  return Ef = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Ef(e);
}
function uI(e) {
  return fI(e) || lI(e) || sI(e) || cI();
}
function cI() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function sI(e, t) {
  if (e) {
    if (typeof e == "string") return Kg(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Kg(e, t);
  }
}
function Kg(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function lI(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function fI(e) {
  if (Array.isArray(e)) return e;
}
function dI() {
  var e = {}, t = function() {
    return null;
  }, r = !1, n = function i(a) {
    if (!r) {
      if (Array.isArray(a)) {
        if (!a.length)
          return;
        var o = a, u = uI(o), c = u[0], s = u.slice(1);
        if (typeof c == "number") {
          Ug(i.bind(null, s), c);
          return;
        }
        i(c), Ug(i.bind(null, s));
        return;
      }
      Ef(a) === "object" && (e = a, t(e)), typeof a == "function" && a();
    }
  };
  return {
    stop: function() {
      r = !0;
    },
    start: function(a) {
      r = !1, n(a);
    },
    subscribe: function(a) {
      return t = a, function() {
        t = function() {
          return null;
        };
      };
    }
  };
}
function ci(e) {
  "@babel/helpers - typeof";
  return ci = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, ci(e);
}
function Hg(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Gg(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Hg(Object(r), !0).forEach(function(n) {
      Kw(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Hg(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function Kw(e, t, r) {
  return t = pI(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function pI(e) {
  var t = hI(e, "string");
  return ci(t) === "symbol" ? t : String(t);
}
function hI(e, t) {
  if (ci(e) !== "object" || e === null) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (ci(n) !== "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var vI = function(t, r) {
  return [Object.keys(t), Object.keys(r)].reduce(function(n, i) {
    return n.filter(function(a) {
      return i.includes(a);
    });
  });
}, yI = function(t) {
  return t;
}, mI = function(t) {
  return t.replace(/([A-Z])/g, function(r) {
    return "-".concat(r.toLowerCase());
  });
}, Dn = function(t, r) {
  return Object.keys(r).reduce(function(n, i) {
    return Gg(Gg({}, n), {}, Kw({}, i, t(i, r[i])));
  }, {});
}, Vg = function(t, r, n) {
  return t.map(function(i) {
    return "".concat(mI(i), " ").concat(r, "ms ").concat(n);
  }).join(",");
}, gI = process.env.NODE_ENV !== "production", Sa = function(t, r, n, i, a, o, u, c) {
  if (gI && typeof console < "u" && console.warn && (r === void 0 && console.warn("LogUtils requires an error message argument"), !t))
    if (r === void 0)
      console.warn("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");
    else {
      var s = [n, i, a, o, u, c], f = 0;
      console.warn(r.replace(/%s/g, function() {
        return s[f++];
      }));
    }
};
function bI(e, t) {
  return OI(e) || wI(e, t) || Hw(e, t) || xI();
}
function xI() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function wI(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, i, a, o, u = [], c = !0, s = !1;
    try {
      if (a = (r = r.call(e)).next, t !== 0) for (; !(c = (n = a.call(r)).done) && (u.push(n.value), u.length !== t); c = !0) ;
    } catch (f) {
      s = !0, i = f;
    } finally {
      try {
        if (!c && r.return != null && (o = r.return(), Object(o) !== o)) return;
      } finally {
        if (s) throw i;
      }
    }
    return u;
  }
}
function OI(e) {
  if (Array.isArray(e)) return e;
}
function _I(e) {
  return PI(e) || SI(e) || Hw(e) || AI();
}
function AI() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Hw(e, t) {
  if (e) {
    if (typeof e == "string") return Tf(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Tf(e, t);
  }
}
function SI(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function PI(e) {
  if (Array.isArray(e)) return Tf(e);
}
function Tf(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
var Pa = 1e-4, Gw = function(t, r) {
  return [0, 3 * t, 3 * r - 6 * t, 3 * t - 3 * r + 1];
}, Vw = function(t, r) {
  return t.map(function(n, i) {
    return n * Math.pow(r, i);
  }).reduce(function(n, i) {
    return n + i;
  });
}, Yg = function(t, r) {
  return function(n) {
    var i = Gw(t, r);
    return Vw(i, n);
  };
}, EI = function(t, r) {
  return function(n) {
    var i = Gw(t, r), a = [].concat(_I(i.map(function(o, u) {
      return o * u;
    }).slice(1)), [0]);
    return Vw(a, n);
  };
}, Xg = function() {
  for (var t = arguments.length, r = new Array(t), n = 0; n < t; n++)
    r[n] = arguments[n];
  var i = r[0], a = r[1], o = r[2], u = r[3];
  if (r.length === 1)
    switch (r[0]) {
      case "linear":
        i = 0, a = 0, o = 1, u = 1;
        break;
      case "ease":
        i = 0.25, a = 0.1, o = 0.25, u = 1;
        break;
      case "ease-in":
        i = 0.42, a = 0, o = 1, u = 1;
        break;
      case "ease-out":
        i = 0.42, a = 0, o = 0.58, u = 1;
        break;
      case "ease-in-out":
        i = 0, a = 0, o = 0.58, u = 1;
        break;
      default: {
        var c = r[0].split("(");
        if (c[0] === "cubic-bezier" && c[1].split(")")[0].split(",").length === 4) {
          var s = c[1].split(")")[0].split(",").map(function(p) {
            return parseFloat(p);
          }), f = bI(s, 4);
          i = f[0], a = f[1], o = f[2], u = f[3];
        } else
          Sa(!1, "[configBezier]: arguments should be one of oneOf 'linear', 'ease', 'ease-in', 'ease-out', 'ease-in-out','cubic-bezier(x1,y1,x2,y2)', instead received %s", r);
      }
    }
  Sa([i, o, a, u].every(function(p) {
    return typeof p == "number" && p >= 0 && p <= 1;
  }), "[configBezier]: arguments should be x1, y1, x2, y2 of [0, 1] instead received %s", r);
  var l = Yg(i, o), d = Yg(a, u), h = EI(i, o), m = function(g) {
    return g > 1 ? 1 : g < 0 ? 0 : g;
  }, v = function(g) {
    for (var x = g > 1 ? 1 : g, w = x, O = 0; O < 8; ++O) {
      var y = l(w) - x, b = h(w);
      if (Math.abs(y - x) < Pa || b < Pa)
        return d(w);
      w = m(w - y / b);
    }
    return d(w);
  };
  return v.isStepper = !1, v;
}, TI = function() {
  var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, r = t.stiff, n = r === void 0 ? 100 : r, i = t.damping, a = i === void 0 ? 8 : i, o = t.dt, u = o === void 0 ? 17 : o, c = function(f, l, d) {
    var h = -(f - l) * n, m = d * a, v = d + (h - m) * u / 1e3, p = d * u / 1e3 + f;
    return Math.abs(p - l) < Pa && Math.abs(v) < Pa ? [l, 0] : [p, v];
  };
  return c.isStepper = !0, c.dt = u, c;
}, jI = function() {
  for (var t = arguments.length, r = new Array(t), n = 0; n < t; n++)
    r[n] = arguments[n];
  var i = r[0];
  if (typeof i == "string")
    switch (i) {
      case "ease":
      case "ease-in-out":
      case "ease-out":
      case "ease-in":
      case "linear":
        return Xg(i);
      case "spring":
        return TI();
      default:
        if (i.split("(")[0] === "cubic-bezier")
          return Xg(i);
        Sa(!1, "[configEasing]: first argument should be one of 'ease', 'ease-in', 'ease-out', 'ease-in-out','cubic-bezier(x1,y1,x2,y2)', 'linear' and 'spring', instead  received %s", r);
    }
  return typeof i == "function" ? i : (Sa(!1, "[configEasing]: first argument type should be function or string, instead received %s", r), null);
};
function si(e) {
  "@babel/helpers - typeof";
  return si = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, si(e);
}
function Zg(e) {
  return MI(e) || CI(e) || Yw(e) || $I();
}
function $I() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function CI(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function MI(e) {
  if (Array.isArray(e)) return $f(e);
}
function Jg(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function qe(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Jg(Object(r), !0).forEach(function(n) {
      jf(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Jg(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function jf(e, t, r) {
  return t = II(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function II(e) {
  var t = RI(e, "string");
  return si(t) === "symbol" ? t : String(t);
}
function RI(e, t) {
  if (si(e) !== "object" || e === null) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (si(n) !== "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function kI(e, t) {
  return qI(e) || NI(e, t) || Yw(e, t) || DI();
}
function DI() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Yw(e, t) {
  if (e) {
    if (typeof e == "string") return $f(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return $f(e, t);
  }
}
function $f(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function NI(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, i, a, o, u = [], c = !0, s = !1;
    try {
      if (a = (r = r.call(e)).next, t !== 0) for (; !(c = (n = a.call(r)).done) && (u.push(n.value), u.length !== t); c = !0) ;
    } catch (f) {
      s = !0, i = f;
    } finally {
      try {
        if (!c && r.return != null && (o = r.return(), Object(o) !== o)) return;
      } finally {
        if (s) throw i;
      }
    }
    return u;
  }
}
function qI(e) {
  if (Array.isArray(e)) return e;
}
var Ea = function(t, r, n) {
  return t + (r - t) * n;
}, Cf = function(t) {
  var r = t.from, n = t.to;
  return r !== n;
}, LI = function e(t, r, n) {
  var i = Dn(function(a, o) {
    if (Cf(o)) {
      var u = t(o.from, o.to, o.velocity), c = kI(u, 2), s = c[0], f = c[1];
      return qe(qe({}, o), {}, {
        from: s,
        velocity: f
      });
    }
    return o;
  }, r);
  return n < 1 ? Dn(function(a, o) {
    return Cf(o) ? qe(qe({}, o), {}, {
      velocity: Ea(o.velocity, i[a].velocity, n),
      from: Ea(o.from, i[a].from, n)
    }) : o;
  }, r) : e(t, i, n - 1);
};
const BI = (function(e, t, r, n, i) {
  var a = vI(e, t), o = a.reduce(function(p, g) {
    return qe(qe({}, p), {}, jf({}, g, [e[g], t[g]]));
  }, {}), u = a.reduce(function(p, g) {
    return qe(qe({}, p), {}, jf({}, g, {
      from: e[g],
      velocity: 0,
      to: t[g]
    }));
  }, {}), c = -1, s, f, l = function() {
    return null;
  }, d = function() {
    return Dn(function(g, x) {
      return x.from;
    }, u);
  }, h = function() {
    return !Object.values(u).filter(Cf).length;
  }, m = function(g) {
    s || (s = g);
    var x = g - s, w = x / r.dt;
    u = LI(r, u, w), i(qe(qe(qe({}, e), t), d())), s = g, h() || (c = requestAnimationFrame(l));
  }, v = function(g) {
    f || (f = g);
    var x = (g - f) / n, w = Dn(function(y, b) {
      return Ea.apply(void 0, Zg(b).concat([r(x)]));
    }, o);
    if (i(qe(qe(qe({}, e), t), w)), x < 1)
      c = requestAnimationFrame(l);
    else {
      var O = Dn(function(y, b) {
        return Ea.apply(void 0, Zg(b).concat([r(1)]));
      }, o);
      i(qe(qe(qe({}, e), t), O));
    }
  };
  return l = r.isStepper ? m : v, function() {
    return requestAnimationFrame(l), function() {
      cancelAnimationFrame(c);
    };
  };
});
function Vr(e) {
  "@babel/helpers - typeof";
  return Vr = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Vr(e);
}
var FI = ["children", "begin", "duration", "attributeName", "easing", "isActive", "steps", "from", "to", "canBegin", "onAnimationEnd", "shouldReAnimate", "onAnimationReStart"];
function zI(e, t) {
  if (e == null) return {};
  var r = WI(e, t), n, i;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (i = 0; i < a.length; i++)
      n = a[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function WI(e, t) {
  if (e == null) return {};
  var r = {}, n = Object.keys(e), i, a;
  for (a = 0; a < n.length; a++)
    i = n[a], !(t.indexOf(i) >= 0) && (r[i] = e[i]);
  return r;
}
function hl(e) {
  return GI(e) || HI(e) || KI(e) || UI();
}
function UI() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function KI(e, t) {
  if (e) {
    if (typeof e == "string") return Mf(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Mf(e, t);
  }
}
function HI(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function GI(e) {
  if (Array.isArray(e)) return Mf(e);
}
function Mf(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function Qg(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function ut(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Qg(Object(r), !0).forEach(function(n) {
      Mn(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Qg(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function Mn(e, t, r) {
  return t = Xw(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function VI(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function YI(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, Xw(n.key), n);
  }
}
function XI(e, t, r) {
  return t && YI(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function Xw(e) {
  var t = ZI(e, "string");
  return Vr(t) === "symbol" ? t : String(t);
}
function ZI(e, t) {
  if (Vr(e) !== "object" || e === null) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Vr(n) !== "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function JI(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && If(e, t);
}
function If(e, t) {
  return If = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n;
  }, If(e, t);
}
function QI(e) {
  var t = eR();
  return function() {
    var n = Ta(e), i;
    if (t) {
      var a = Ta(this).constructor;
      i = Reflect.construct(n, arguments, a);
    } else
      i = n.apply(this, arguments);
    return Rf(this, i);
  };
}
function Rf(e, t) {
  if (t && (Vr(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return kf(e);
}
function kf(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function eR() {
  if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham) return !1;
  if (typeof Proxy == "function") return !0;
  try {
    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    })), !0;
  } catch {
    return !1;
  }
}
function Ta(e) {
  return Ta = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, Ta(e);
}
var dt = /* @__PURE__ */ (function(e) {
  JI(r, e);
  var t = QI(r);
  function r(n, i) {
    var a;
    VI(this, r), a = t.call(this, n, i);
    var o = a.props, u = o.isActive, c = o.attributeName, s = o.from, f = o.to, l = o.steps, d = o.children, h = o.duration;
    if (a.handleStyleChange = a.handleStyleChange.bind(kf(a)), a.changeStyle = a.changeStyle.bind(kf(a)), !u || h <= 0)
      return a.state = {
        style: {}
      }, typeof d == "function" && (a.state = {
        style: f
      }), Rf(a);
    if (l && l.length)
      a.state = {
        style: l[0].style
      };
    else if (s) {
      if (typeof d == "function")
        return a.state = {
          style: s
        }, Rf(a);
      a.state = {
        style: c ? Mn({}, c, s) : s
      };
    } else
      a.state = {
        style: {}
      };
    return a;
  }
  return XI(r, [{
    key: "componentDidMount",
    value: function() {
      var i = this.props, a = i.isActive, o = i.canBegin;
      this.mounted = !0, !(!a || !o) && this.runAnimation(this.props);
    }
  }, {
    key: "componentDidUpdate",
    value: function(i) {
      var a = this.props, o = a.isActive, u = a.canBegin, c = a.attributeName, s = a.shouldReAnimate, f = a.to, l = a.from, d = this.state.style;
      if (u) {
        if (!o) {
          var h = {
            style: c ? Mn({}, c, f) : f
          };
          this.state && d && (c && d[c] !== f || !c && d !== f) && this.setState(h);
          return;
        }
        if (!(aI(i.to, f) && i.canBegin && i.isActive)) {
          var m = !i.canBegin || !i.isActive;
          this.manager && this.manager.stop(), this.stopJSAnimation && this.stopJSAnimation();
          var v = m || s ? l : i.to;
          if (this.state && d) {
            var p = {
              style: c ? Mn({}, c, v) : v
            };
            (c && d[c] !== v || !c && d !== v) && this.setState(p);
          }
          this.runAnimation(ut(ut({}, this.props), {}, {
            from: v,
            begin: 0
          }));
        }
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function() {
      this.mounted = !1;
      var i = this.props.onAnimationEnd;
      this.unSubscribe && this.unSubscribe(), this.manager && (this.manager.stop(), this.manager = null), this.stopJSAnimation && this.stopJSAnimation(), i && i();
    }
  }, {
    key: "handleStyleChange",
    value: function(i) {
      this.changeStyle(i);
    }
  }, {
    key: "changeStyle",
    value: function(i) {
      this.mounted && this.setState({
        style: i
      });
    }
  }, {
    key: "runJSAnimation",
    value: function(i) {
      var a = this, o = i.from, u = i.to, c = i.duration, s = i.easing, f = i.begin, l = i.onAnimationEnd, d = i.onAnimationStart, h = BI(o, u, jI(s), c, this.changeStyle), m = function() {
        a.stopJSAnimation = h();
      };
      this.manager.start([d, f, m, c, l]);
    }
  }, {
    key: "runStepAnimation",
    value: function(i) {
      var a = this, o = i.steps, u = i.begin, c = i.onAnimationStart, s = o[0], f = s.style, l = s.duration, d = l === void 0 ? 0 : l, h = function(v, p, g) {
        if (g === 0)
          return v;
        var x = p.duration, w = p.easing, O = w === void 0 ? "ease" : w, y = p.style, b = p.properties, _ = p.onAnimationEnd, A = g > 0 ? o[g - 1] : p, E = b || Object.keys(y);
        if (typeof O == "function" || O === "spring")
          return [].concat(hl(v), [a.runJSAnimation.bind(a, {
            from: A.style,
            to: y,
            duration: x,
            easing: O
          }), x]);
        var C = Vg(E, x, O), P = ut(ut(ut({}, A.style), y), {}, {
          transition: C
        });
        return [].concat(hl(v), [P, x, _]).filter(yI);
      };
      return this.manager.start([c].concat(hl(o.reduce(h, [f, Math.max(d, u)])), [i.onAnimationEnd]));
    }
  }, {
    key: "runAnimation",
    value: function(i) {
      this.manager || (this.manager = dI());
      var a = i.begin, o = i.duration, u = i.attributeName, c = i.to, s = i.easing, f = i.onAnimationStart, l = i.onAnimationEnd, d = i.steps, h = i.children, m = this.manager;
      if (this.unSubscribe = m.subscribe(this.handleStyleChange), typeof s == "function" || typeof h == "function" || s === "spring") {
        this.runJSAnimation(i);
        return;
      }
      if (d.length > 1) {
        this.runStepAnimation(i);
        return;
      }
      var v = u ? Mn({}, u, c) : c, p = Vg(Object.keys(v), o, s);
      m.start([f, a, ut(ut({}, v), {}, {
        transition: p
      }), o, l]);
    }
  }, {
    key: "render",
    value: function() {
      var i = this.props, a = i.children;
      i.begin;
      var o = i.duration;
      i.attributeName, i.easing;
      var u = i.isActive;
      i.steps, i.from, i.to, i.canBegin, i.onAnimationEnd, i.shouldReAnimate, i.onAnimationReStart;
      var c = zI(i, FI), s = F.Children.count(a), f = this.state.style;
      if (typeof a == "function")
        return a(f);
      if (!u || s === 0 || o <= 0)
        return a;
      var l = function(h) {
        var m = h.props, v = m.style, p = v === void 0 ? {} : v, g = m.className, x = /* @__PURE__ */ F.cloneElement(h, ut(ut({}, c), {}, {
          style: ut(ut({}, p), f),
          className: g
        }));
        return x;
      };
      return s === 1 ? l(F.Children.only(a)) : /* @__PURE__ */ S.createElement("div", null, F.Children.map(a, function(d) {
        return l(d);
      }));
    }
  }]), r;
})(F.PureComponent);
dt.displayName = "Animate";
dt.defaultProps = {
  begin: 0,
  duration: 1e3,
  from: "",
  to: "",
  attributeName: "",
  easing: "ease",
  isActive: !0,
  canBegin: !0,
  steps: [],
  onAnimationEnd: function() {
  },
  onAnimationStart: function() {
  }
};
dt.propTypes = {
  from: he.oneOfType([he.object, he.string]),
  to: he.oneOfType([he.object, he.string]),
  attributeName: he.string,
  // animation duration
  duration: he.number,
  begin: he.number,
  easing: he.oneOfType([he.string, he.func]),
  steps: he.arrayOf(he.shape({
    duration: he.number.isRequired,
    style: he.object.isRequired,
    easing: he.oneOfType([he.oneOf(["ease", "ease-in", "ease-out", "ease-in-out", "linear"]), he.func]),
    // transition css properties(dash case), optional
    properties: he.arrayOf("string"),
    onAnimationEnd: he.func
  })),
  children: he.oneOfType([he.node, he.func]),
  isActive: he.bool,
  canBegin: he.bool,
  onAnimationEnd: he.func,
  // decide if it should reanimate with initial from style when props change
  shouldReAnimate: he.bool,
  onAnimationStart: he.func,
  onAnimationReStart: he.func
};
function li(e) {
  "@babel/helpers - typeof";
  return li = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, li(e);
}
function ja() {
  return ja = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, ja.apply(this, arguments);
}
function tR(e, t) {
  return aR(e) || iR(e, t) || nR(e, t) || rR();
}
function rR() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function nR(e, t) {
  if (e) {
    if (typeof e == "string") return eb(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return eb(e, t);
  }
}
function eb(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function iR(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, i, a, o, u = [], c = !0, s = !1;
    try {
      if (a = (r = r.call(e)).next, t !== 0) for (; !(c = (n = a.call(r)).done) && (u.push(n.value), u.length !== t); c = !0) ;
    } catch (f) {
      s = !0, i = f;
    } finally {
      try {
        if (!c && r.return != null && (o = r.return(), Object(o) !== o)) return;
      } finally {
        if (s) throw i;
      }
    }
    return u;
  }
}
function aR(e) {
  if (Array.isArray(e)) return e;
}
function tb(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function rb(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? tb(Object(r), !0).forEach(function(n) {
      oR(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : tb(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function oR(e, t, r) {
  return t = uR(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function uR(e) {
  var t = cR(e, "string");
  return li(t) == "symbol" ? t : t + "";
}
function cR(e, t) {
  if (li(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (li(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var nb = function(t, r, n, i, a) {
  var o = Math.min(Math.abs(n) / 2, Math.abs(i) / 2), u = i >= 0 ? 1 : -1, c = n >= 0 ? 1 : -1, s = i >= 0 && n >= 0 || i < 0 && n < 0 ? 1 : 0, f;
  if (o > 0 && a instanceof Array) {
    for (var l = [0, 0, 0, 0], d = 0, h = 4; d < h; d++)
      l[d] = a[d] > o ? o : a[d];
    f = "M".concat(t, ",").concat(r + u * l[0]), l[0] > 0 && (f += "A ".concat(l[0], ",").concat(l[0], ",0,0,").concat(s, ",").concat(t + c * l[0], ",").concat(r)), f += "L ".concat(t + n - c * l[1], ",").concat(r), l[1] > 0 && (f += "A ".concat(l[1], ",").concat(l[1], ",0,0,").concat(s, `,
        `).concat(t + n, ",").concat(r + u * l[1])), f += "L ".concat(t + n, ",").concat(r + i - u * l[2]), l[2] > 0 && (f += "A ".concat(l[2], ",").concat(l[2], ",0,0,").concat(s, `,
        `).concat(t + n - c * l[2], ",").concat(r + i)), f += "L ".concat(t + c * l[3], ",").concat(r + i), l[3] > 0 && (f += "A ".concat(l[3], ",").concat(l[3], ",0,0,").concat(s, `,
        `).concat(t, ",").concat(r + i - u * l[3])), f += "Z";
  } else if (o > 0 && a === +a && a > 0) {
    var m = Math.min(o, a);
    f = "M ".concat(t, ",").concat(r + u * m, `
            A `).concat(m, ",").concat(m, ",0,0,").concat(s, ",").concat(t + c * m, ",").concat(r, `
            L `).concat(t + n - c * m, ",").concat(r, `
            A `).concat(m, ",").concat(m, ",0,0,").concat(s, ",").concat(t + n, ",").concat(r + u * m, `
            L `).concat(t + n, ",").concat(r + i - u * m, `
            A `).concat(m, ",").concat(m, ",0,0,").concat(s, ",").concat(t + n - c * m, ",").concat(r + i, `
            L `).concat(t + c * m, ",").concat(r + i, `
            A `).concat(m, ",").concat(m, ",0,0,").concat(s, ",").concat(t, ",").concat(r + i - u * m, " Z");
  } else
    f = "M ".concat(t, ",").concat(r, " h ").concat(n, " v ").concat(i, " h ").concat(-n, " Z");
  return f;
}, sR = function(t, r) {
  if (!t || !r)
    return !1;
  var n = t.x, i = t.y, a = r.x, o = r.y, u = r.width, c = r.height;
  if (Math.abs(u) > 0 && Math.abs(c) > 0) {
    var s = Math.min(a, a + u), f = Math.max(a, a + u), l = Math.min(o, o + c), d = Math.max(o, o + c);
    return n >= s && n <= f && i >= l && i <= d;
  }
  return !1;
}, lR = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  // The radius of border
  // The radius of four corners when radius is a number
  // The radius of left-top, right-top, right-bottom, left-bottom when radius is an array
  radius: 0,
  isAnimationActive: !1,
  isUpdateAnimationActive: !1,
  animationBegin: 0,
  animationDuration: 1500,
  animationEasing: "ease"
}, ip = function(t) {
  var r = rb(rb({}, lR), t), n = F.useRef(), i = F.useState(-1), a = tR(i, 2), o = a[0], u = a[1];
  F.useEffect(function() {
    if (n.current && n.current.getTotalLength)
      try {
        var O = n.current.getTotalLength();
        O && u(O);
      } catch {
      }
  }, []);
  var c = r.x, s = r.y, f = r.width, l = r.height, d = r.radius, h = r.className, m = r.animationEasing, v = r.animationDuration, p = r.animationBegin, g = r.isAnimationActive, x = r.isUpdateAnimationActive;
  if (c !== +c || s !== +s || f !== +f || l !== +l || f === 0 || l === 0)
    return null;
  var w = ae("recharts-rectangle", h);
  return x ? /* @__PURE__ */ S.createElement(dt, {
    canBegin: o > 0,
    from: {
      width: f,
      height: l,
      x: c,
      y: s
    },
    to: {
      width: f,
      height: l,
      x: c,
      y: s
    },
    duration: v,
    animationEasing: m,
    isActive: x
  }, function(O) {
    var y = O.width, b = O.height, _ = O.x, A = O.y;
    return /* @__PURE__ */ S.createElement(dt, {
      canBegin: o > 0,
      from: "0px ".concat(o === -1 ? 1 : o, "px"),
      to: "".concat(o, "px 0px"),
      attributeName: "strokeDasharray",
      begin: p,
      duration: v,
      isActive: g,
      easing: m
    }, /* @__PURE__ */ S.createElement("path", ja({}, X(r, !0), {
      className: w,
      d: nb(_, A, y, b, d),
      ref: n
    })));
  }) : /* @__PURE__ */ S.createElement("path", ja({}, X(r, !0), {
    className: w,
    d: nb(c, s, f, l, d)
  }));
}, fR = ["points", "className", "baseLinePoints", "connectNulls"];
function Mr() {
  return Mr = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Mr.apply(this, arguments);
}
function dR(e, t) {
  if (e == null) return {};
  var r = pR(e, t), n, i;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (i = 0; i < a.length; i++)
      n = a[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function pR(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
function ib(e) {
  return mR(e) || yR(e) || vR(e) || hR();
}
function hR() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function vR(e, t) {
  if (e) {
    if (typeof e == "string") return Df(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Df(e, t);
  }
}
function yR(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function mR(e) {
  if (Array.isArray(e)) return Df(e);
}
function Df(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
var ab = function(t) {
  return t && t.x === +t.x && t.y === +t.y;
}, gR = function() {
  var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], r = [[]];
  return t.forEach(function(n) {
    ab(n) ? r[r.length - 1].push(n) : r[r.length - 1].length > 0 && r.push([]);
  }), ab(t[0]) && r[r.length - 1].push(t[0]), r[r.length - 1].length <= 0 && (r = r.slice(0, -1)), r;
}, Nn = function(t, r) {
  var n = gR(t);
  r && (n = [n.reduce(function(a, o) {
    return [].concat(ib(a), ib(o));
  }, [])]);
  var i = n.map(function(a) {
    return a.reduce(function(o, u, c) {
      return "".concat(o).concat(c === 0 ? "M" : "L").concat(u.x, ",").concat(u.y);
    }, "");
  }).join("");
  return n.length === 1 ? "".concat(i, "Z") : i;
}, bR = function(t, r, n) {
  var i = Nn(t, n);
  return "".concat(i.slice(-1) === "Z" ? i.slice(0, -1) : i, "L").concat(Nn(r.reverse(), n).slice(1));
}, xR = function(t) {
  var r = t.points, n = t.className, i = t.baseLinePoints, a = t.connectNulls, o = dR(t, fR);
  if (!r || !r.length)
    return null;
  var u = ae("recharts-polygon", n);
  if (i && i.length) {
    var c = o.stroke && o.stroke !== "none", s = bR(r, i, a);
    return /* @__PURE__ */ S.createElement("g", {
      className: u
    }, /* @__PURE__ */ S.createElement("path", Mr({}, X(o, !0), {
      fill: s.slice(-1) === "Z" ? o.fill : "none",
      stroke: "none",
      d: s
    })), c ? /* @__PURE__ */ S.createElement("path", Mr({}, X(o, !0), {
      fill: "none",
      d: Nn(r, a)
    })) : null, c ? /* @__PURE__ */ S.createElement("path", Mr({}, X(o, !0), {
      fill: "none",
      d: Nn(i, a)
    })) : null);
  }
  var f = Nn(r, a);
  return /* @__PURE__ */ S.createElement("path", Mr({}, X(o, !0), {
    fill: f.slice(-1) === "Z" ? o.fill : "none",
    className: u,
    d: f
  }));
};
function Nf() {
  return Nf = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Nf.apply(this, arguments);
}
var Ei = function(t) {
  var r = t.cx, n = t.cy, i = t.r, a = t.className, o = ae("recharts-dot", a);
  return r === +r && n === +n && i === +i ? /* @__PURE__ */ F.createElement("circle", Nf({}, X(t, !1), Zi(t), {
    className: o,
    cx: r,
    cy: n,
    r: i
  })) : null;
};
function fi(e) {
  "@babel/helpers - typeof";
  return fi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, fi(e);
}
var wR = ["x", "y", "top", "left", "width", "height", "className"];
function qf() {
  return qf = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, qf.apply(this, arguments);
}
function ob(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function OR(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? ob(Object(r), !0).forEach(function(n) {
      _R(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : ob(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function _R(e, t, r) {
  return t = AR(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function AR(e) {
  var t = SR(e, "string");
  return fi(t) == "symbol" ? t : t + "";
}
function SR(e, t) {
  if (fi(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (fi(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function PR(e, t) {
  if (e == null) return {};
  var r = ER(e, t), n, i;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (i = 0; i < a.length; i++)
      n = a[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function ER(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
var TR = function(t, r, n, i, a, o) {
  return "M".concat(t, ",").concat(a, "v").concat(i, "M").concat(o, ",").concat(r, "h").concat(n);
}, jR = function(t) {
  var r = t.x, n = r === void 0 ? 0 : r, i = t.y, a = i === void 0 ? 0 : i, o = t.top, u = o === void 0 ? 0 : o, c = t.left, s = c === void 0 ? 0 : c, f = t.width, l = f === void 0 ? 0 : f, d = t.height, h = d === void 0 ? 0 : d, m = t.className, v = PR(t, wR), p = OR({
    x: n,
    y: a,
    top: u,
    left: s,
    width: l,
    height: h
  }, v);
  return !z(n) || !z(a) || !z(l) || !z(h) || !z(u) || !z(s) ? null : /* @__PURE__ */ S.createElement("path", qf({}, X(p, !0), {
    className: ae("recharts-cross", m),
    d: TR(n, a, l, h, u, s)
  }));
}, vl, ub;
function $R() {
  if (ub) return vl;
  ub = 1;
  var e = mo(), t = sw(), r = Ot();
  function n(i, a) {
    return i && i.length ? e(i, r(a, 2), t) : void 0;
  }
  return vl = n, vl;
}
var CR = $R();
const MR = /* @__PURE__ */ ye(CR);
var yl, cb;
function IR() {
  if (cb) return yl;
  cb = 1;
  var e = mo(), t = Ot(), r = lw();
  function n(i, a) {
    return i && i.length ? e(i, t(a, 2), r) : void 0;
  }
  return yl = n, yl;
}
var RR = IR();
const kR = /* @__PURE__ */ ye(RR);
var DR = ["cx", "cy", "angle", "ticks", "axisLine"], NR = ["ticks", "tick", "angle", "tickFormatter", "stroke"];
function Yr(e) {
  "@babel/helpers - typeof";
  return Yr = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Yr(e);
}
function qn() {
  return qn = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, qn.apply(this, arguments);
}
function sb(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function tr(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? sb(Object(r), !0).forEach(function(n) {
      wo(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : sb(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function lb(e, t) {
  if (e == null) return {};
  var r = qR(e, t), n, i;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (i = 0; i < a.length; i++)
      n = a[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function qR(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
function LR(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function fb(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, Jw(n.key), n);
  }
}
function BR(e, t, r) {
  return t && fb(e.prototype, t), r && fb(e, r), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function FR(e, t, r) {
  return t = $a(t), zR(e, Zw() ? Reflect.construct(t, r || [], $a(e).constructor) : t.apply(e, r));
}
function zR(e, t) {
  if (t && (Yr(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return WR(e);
}
function WR(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function Zw() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (Zw = function() {
    return !!e;
  })();
}
function $a(e) {
  return $a = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, $a(e);
}
function UR(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Lf(e, t);
}
function Lf(e, t) {
  return Lf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n;
  }, Lf(e, t);
}
function wo(e, t, r) {
  return t = Jw(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function Jw(e) {
  var t = KR(e, "string");
  return Yr(t) == "symbol" ? t : t + "";
}
function KR(e, t) {
  if (Yr(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Yr(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var Oo = /* @__PURE__ */ (function(e) {
  function t() {
    return LR(this, t), FR(this, t, arguments);
  }
  return UR(t, e), BR(t, [{
    key: "getTickValueCoord",
    value: (
      /**
       * Calculate the coordinate of tick
       * @param  {Number} coordinate The radius of tick
       * @return {Object} (x, y)
       */
      function(n) {
        var i = n.coordinate, a = this.props, o = a.angle, u = a.cx, c = a.cy;
        return we(u, c, i, o);
      }
    )
  }, {
    key: "getTickTextAnchor",
    value: function() {
      var n = this.props.orientation, i;
      switch (n) {
        case "left":
          i = "end";
          break;
        case "right":
          i = "start";
          break;
        default:
          i = "middle";
          break;
      }
      return i;
    }
  }, {
    key: "getViewBox",
    value: function() {
      var n = this.props, i = n.cx, a = n.cy, o = n.angle, u = n.ticks, c = MR(u, function(f) {
        return f.coordinate || 0;
      }), s = kR(u, function(f) {
        return f.coordinate || 0;
      });
      return {
        cx: i,
        cy: a,
        startAngle: o,
        endAngle: o,
        innerRadius: s.coordinate || 0,
        outerRadius: c.coordinate || 0
      };
    }
  }, {
    key: "renderAxisLine",
    value: function() {
      var n = this.props, i = n.cx, a = n.cy, o = n.angle, u = n.ticks, c = n.axisLine, s = lb(n, DR), f = u.reduce(function(m, v) {
        return [Math.min(m[0], v.coordinate), Math.max(m[1], v.coordinate)];
      }, [1 / 0, -1 / 0]), l = we(i, a, f[0], o), d = we(i, a, f[1], o), h = tr(tr(tr({}, X(s, !1)), {}, {
        fill: "none"
      }, X(c, !1)), {}, {
        x1: l.x,
        y1: l.y,
        x2: d.x,
        y2: d.y
      });
      return /* @__PURE__ */ S.createElement("line", qn({
        className: "recharts-polar-radius-axis-line"
      }, h));
    }
  }, {
    key: "renderTicks",
    value: function() {
      var n = this, i = this.props, a = i.ticks, o = i.tick, u = i.angle, c = i.tickFormatter, s = i.stroke, f = lb(i, NR), l = this.getTickTextAnchor(), d = X(f, !1), h = X(o, !1), m = a.map(function(v, p) {
        var g = n.getTickValueCoord(v), x = tr(tr(tr(tr({
          textAnchor: l,
          transform: "rotate(".concat(90 - u, ", ").concat(g.x, ", ").concat(g.y, ")")
        }, d), {}, {
          stroke: "none",
          fill: s
        }, h), {}, {
          index: p
        }, g), {}, {
          payload: v
        });
        return /* @__PURE__ */ S.createElement(ue, qn({
          className: ae("recharts-polar-radius-axis-tick", qw(o)),
          key: "tick-".concat(v.coordinate)
        }, vr(n.props, v, p)), t.renderTickItem(o, x, c ? c(v.value, p) : v.value));
      });
      return /* @__PURE__ */ S.createElement(ue, {
        className: "recharts-polar-radius-axis-ticks"
      }, m);
    }
  }, {
    key: "render",
    value: function() {
      var n = this.props, i = n.ticks, a = n.axisLine, o = n.tick;
      return !i || !i.length ? null : /* @__PURE__ */ S.createElement(ue, {
        className: ae("recharts-polar-radius-axis", this.props.className)
      }, a && this.renderAxisLine(), o && this.renderTicks(), ke.renderCallByParent(this.props, this.getViewBox()));
    }
  }], [{
    key: "renderTickItem",
    value: function(n, i, a) {
      var o;
      return /* @__PURE__ */ S.isValidElement(n) ? o = /* @__PURE__ */ S.cloneElement(n, i) : te(n) ? o = n(i) : o = /* @__PURE__ */ S.createElement(yr, qn({}, i, {
        className: "recharts-polar-radius-axis-tick-value"
      }), a), o;
    }
  }]);
})(F.PureComponent);
wo(Oo, "displayName", "PolarRadiusAxis");
wo(Oo, "axisType", "radiusAxis");
wo(Oo, "defaultProps", {
  type: "number",
  radiusAxisId: 0,
  cx: 0,
  cy: 0,
  angle: 0,
  orientation: "right",
  stroke: "#ccc",
  axisLine: !0,
  tick: !0,
  tickCount: 5,
  allowDataOverflow: !1,
  scale: "auto",
  allowDuplicatedCategory: !0
});
function Xr(e) {
  "@babel/helpers - typeof";
  return Xr = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Xr(e);
}
function ar() {
  return ar = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, ar.apply(this, arguments);
}
function db(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function rr(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? db(Object(r), !0).forEach(function(n) {
      _o(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : db(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function HR(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function pb(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, eO(n.key), n);
  }
}
function GR(e, t, r) {
  return t && pb(e.prototype, t), r && pb(e, r), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function VR(e, t, r) {
  return t = Ca(t), YR(e, Qw() ? Reflect.construct(t, r || [], Ca(e).constructor) : t.apply(e, r));
}
function YR(e, t) {
  if (t && (Xr(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return XR(e);
}
function XR(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function Qw() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (Qw = function() {
    return !!e;
  })();
}
function Ca(e) {
  return Ca = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, Ca(e);
}
function ZR(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Bf(e, t);
}
function Bf(e, t) {
  return Bf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n;
  }, Bf(e, t);
}
function _o(e, t, r) {
  return t = eO(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function eO(e) {
  var t = JR(e, "string");
  return Xr(t) == "symbol" ? t : t + "";
}
function JR(e, t) {
  if (Xr(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Xr(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var QR = Math.PI / 180, hb = 1e-5, Ao = /* @__PURE__ */ (function(e) {
  function t() {
    return HR(this, t), VR(this, t, arguments);
  }
  return ZR(t, e), GR(t, [{
    key: "getTickLineCoord",
    value: (
      /**
       * Calculate the coordinate of line endpoint
       * @param  {Object} data The Data if ticks
       * @return {Object} (x0, y0): The start point of text,
       *                  (x1, y1): The end point close to text,
       *                  (x2, y2): The end point close to axis
       */
      function(n) {
        var i = this.props, a = i.cx, o = i.cy, u = i.radius, c = i.orientation, s = i.tickSize, f = s || 8, l = we(a, o, u, n.coordinate), d = we(a, o, u + (c === "inner" ? -1 : 1) * f, n.coordinate);
        return {
          x1: l.x,
          y1: l.y,
          x2: d.x,
          y2: d.y
        };
      }
    )
    /**
     * Get the text-anchor of each tick
     * @param  {Object} data Data of ticks
     * @return {String} text-anchor
     */
  }, {
    key: "getTickTextAnchor",
    value: function(n) {
      var i = this.props.orientation, a = Math.cos(-n.coordinate * QR), o;
      return a > hb ? o = i === "outer" ? "start" : "end" : a < -hb ? o = i === "outer" ? "end" : "start" : o = "middle", o;
    }
  }, {
    key: "renderAxisLine",
    value: function() {
      var n = this.props, i = n.cx, a = n.cy, o = n.radius, u = n.axisLine, c = n.axisLineType, s = rr(rr({}, X(this.props, !1)), {}, {
        fill: "none"
      }, X(u, !1));
      if (c === "circle")
        return /* @__PURE__ */ S.createElement(Ei, ar({
          className: "recharts-polar-angle-axis-line"
        }, s, {
          cx: i,
          cy: a,
          r: o
        }));
      var f = this.props.ticks, l = f.map(function(d) {
        return we(i, a, o, d.coordinate);
      });
      return /* @__PURE__ */ S.createElement(xR, ar({
        className: "recharts-polar-angle-axis-line"
      }, s, {
        points: l
      }));
    }
  }, {
    key: "renderTicks",
    value: function() {
      var n = this, i = this.props, a = i.ticks, o = i.tick, u = i.tickLine, c = i.tickFormatter, s = i.stroke, f = X(this.props, !1), l = X(o, !1), d = rr(rr({}, f), {}, {
        fill: "none"
      }, X(u, !1)), h = a.map(function(m, v) {
        var p = n.getTickLineCoord(m), g = n.getTickTextAnchor(m), x = rr(rr(rr({
          textAnchor: g
        }, f), {}, {
          stroke: "none",
          fill: s
        }, l), {}, {
          index: v,
          payload: m,
          x: p.x2,
          y: p.y2
        });
        return /* @__PURE__ */ S.createElement(ue, ar({
          className: ae("recharts-polar-angle-axis-tick", qw(o)),
          key: "tick-".concat(m.coordinate)
        }, vr(n.props, m, v)), u && /* @__PURE__ */ S.createElement("line", ar({
          className: "recharts-polar-angle-axis-tick-line"
        }, d, p)), o && t.renderTickItem(o, x, c ? c(m.value, v) : m.value));
      });
      return /* @__PURE__ */ S.createElement(ue, {
        className: "recharts-polar-angle-axis-ticks"
      }, h);
    }
  }, {
    key: "render",
    value: function() {
      var n = this.props, i = n.ticks, a = n.radius, o = n.axisLine;
      return a <= 0 || !i || !i.length ? null : /* @__PURE__ */ S.createElement(ue, {
        className: ae("recharts-polar-angle-axis", this.props.className)
      }, o && this.renderAxisLine(), this.renderTicks());
    }
  }], [{
    key: "renderTickItem",
    value: function(n, i, a) {
      var o;
      return /* @__PURE__ */ S.isValidElement(n) ? o = /* @__PURE__ */ S.cloneElement(n, i) : te(n) ? o = n(i) : o = /* @__PURE__ */ S.createElement(yr, ar({}, i, {
        className: "recharts-polar-angle-axis-tick-value"
      }), a), o;
    }
  }]);
})(F.PureComponent);
_o(Ao, "displayName", "PolarAngleAxis");
_o(Ao, "axisType", "angleAxis");
_o(Ao, "defaultProps", {
  type: "category",
  angleAxisId: 0,
  scale: "auto",
  cx: 0,
  cy: 0,
  orientation: "outer",
  axisLine: !0,
  tickLine: !0,
  tickSize: 8,
  tick: !0,
  hide: !1,
  allowDuplicatedCategory: !0
});
var ml, vb;
function ek() {
  if (vb) return ml;
  vb = 1;
  var e = cx(), t = e(Object.getPrototypeOf, Object);
  return ml = t, ml;
}
var gl, yb;
function tk() {
  if (yb) return gl;
  yb = 1;
  var e = Rt(), t = ek(), r = kt(), n = "[object Object]", i = Function.prototype, a = Object.prototype, o = i.toString, u = a.hasOwnProperty, c = o.call(Object);
  function s(f) {
    if (!r(f) || e(f) != n)
      return !1;
    var l = t(f);
    if (l === null)
      return !0;
    var d = u.call(l, "constructor") && l.constructor;
    return typeof d == "function" && d instanceof d && o.call(d) == c;
  }
  return gl = s, gl;
}
var rk = tk();
const nk = /* @__PURE__ */ ye(rk);
var bl, mb;
function ik() {
  if (mb) return bl;
  mb = 1;
  var e = Rt(), t = kt(), r = "[object Boolean]";
  function n(i) {
    return i === !0 || i === !1 || t(i) && e(i) == r;
  }
  return bl = n, bl;
}
var ak = ik();
const ok = /* @__PURE__ */ ye(ak);
function di(e) {
  "@babel/helpers - typeof";
  return di = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, di(e);
}
function Ma() {
  return Ma = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Ma.apply(this, arguments);
}
function uk(e, t) {
  return fk(e) || lk(e, t) || sk(e, t) || ck();
}
function ck() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function sk(e, t) {
  if (e) {
    if (typeof e == "string") return gb(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return gb(e, t);
  }
}
function gb(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function lk(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, i, a, o, u = [], c = !0, s = !1;
    try {
      if (a = (r = r.call(e)).next, t !== 0) for (; !(c = (n = a.call(r)).done) && (u.push(n.value), u.length !== t); c = !0) ;
    } catch (f) {
      s = !0, i = f;
    } finally {
      try {
        if (!c && r.return != null && (o = r.return(), Object(o) !== o)) return;
      } finally {
        if (s) throw i;
      }
    }
    return u;
  }
}
function fk(e) {
  if (Array.isArray(e)) return e;
}
function bb(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function xb(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? bb(Object(r), !0).forEach(function(n) {
      dk(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : bb(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function dk(e, t, r) {
  return t = pk(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function pk(e) {
  var t = hk(e, "string");
  return di(t) == "symbol" ? t : t + "";
}
function hk(e, t) {
  if (di(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (di(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var wb = function(t, r, n, i, a) {
  var o = n - i, u;
  return u = "M ".concat(t, ",").concat(r), u += "L ".concat(t + n, ",").concat(r), u += "L ".concat(t + n - o / 2, ",").concat(r + a), u += "L ".concat(t + n - o / 2 - i, ",").concat(r + a), u += "L ".concat(t, ",").concat(r, " Z"), u;
}, vk = {
  x: 0,
  y: 0,
  upperWidth: 0,
  lowerWidth: 0,
  height: 0,
  isUpdateAnimationActive: !1,
  animationBegin: 0,
  animationDuration: 1500,
  animationEasing: "ease"
}, yk = function(t) {
  var r = xb(xb({}, vk), t), n = F.useRef(), i = F.useState(-1), a = uk(i, 2), o = a[0], u = a[1];
  F.useEffect(function() {
    if (n.current && n.current.getTotalLength)
      try {
        var w = n.current.getTotalLength();
        w && u(w);
      } catch {
      }
  }, []);
  var c = r.x, s = r.y, f = r.upperWidth, l = r.lowerWidth, d = r.height, h = r.className, m = r.animationEasing, v = r.animationDuration, p = r.animationBegin, g = r.isUpdateAnimationActive;
  if (c !== +c || s !== +s || f !== +f || l !== +l || d !== +d || f === 0 && l === 0 || d === 0)
    return null;
  var x = ae("recharts-trapezoid", h);
  return g ? /* @__PURE__ */ S.createElement(dt, {
    canBegin: o > 0,
    from: {
      upperWidth: 0,
      lowerWidth: 0,
      height: d,
      x: c,
      y: s
    },
    to: {
      upperWidth: f,
      lowerWidth: l,
      height: d,
      x: c,
      y: s
    },
    duration: v,
    animationEasing: m,
    isActive: g
  }, function(w) {
    var O = w.upperWidth, y = w.lowerWidth, b = w.height, _ = w.x, A = w.y;
    return /* @__PURE__ */ S.createElement(dt, {
      canBegin: o > 0,
      from: "0px ".concat(o === -1 ? 1 : o, "px"),
      to: "".concat(o, "px 0px"),
      attributeName: "strokeDasharray",
      begin: p,
      duration: v,
      easing: m
    }, /* @__PURE__ */ S.createElement("path", Ma({}, X(r, !0), {
      className: x,
      d: wb(_, A, O, y, b),
      ref: n
    })));
  }) : /* @__PURE__ */ S.createElement("g", null, /* @__PURE__ */ S.createElement("path", Ma({}, X(r, !0), {
    className: x,
    d: wb(c, s, f, l, d)
  })));
}, mk = ["option", "shapeType", "propTransformer", "activeClassName", "isActive"];
function pi(e) {
  "@babel/helpers - typeof";
  return pi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, pi(e);
}
function gk(e, t) {
  if (e == null) return {};
  var r = bk(e, t), n, i;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (i = 0; i < a.length; i++)
      n = a[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function bk(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
function Ob(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Ia(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Ob(Object(r), !0).forEach(function(n) {
      xk(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Ob(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function xk(e, t, r) {
  return t = wk(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function wk(e) {
  var t = Ok(e, "string");
  return pi(t) == "symbol" ? t : t + "";
}
function Ok(e, t) {
  if (pi(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (pi(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function _k(e, t) {
  return Ia(Ia({}, t), e);
}
function Ak(e, t) {
  return e === "symbols";
}
function _b(e) {
  var t = e.shapeType, r = e.elementProps;
  switch (t) {
    case "rectangle":
      return /* @__PURE__ */ S.createElement(ip, r);
    case "trapezoid":
      return /* @__PURE__ */ S.createElement(yk, r);
    case "sector":
      return /* @__PURE__ */ S.createElement(Fw, r);
    case "symbols":
      if (Ak(t))
        return /* @__PURE__ */ S.createElement(Od, r);
      break;
    default:
      return null;
  }
}
function Sk(e) {
  return /* @__PURE__ */ F.isValidElement(e) ? e.props : e;
}
function tO(e) {
  var t = e.option, r = e.shapeType, n = e.propTransformer, i = n === void 0 ? _k : n, a = e.activeClassName, o = a === void 0 ? "recharts-active-shape" : a, u = e.isActive, c = gk(e, mk), s;
  if (/* @__PURE__ */ F.isValidElement(t))
    s = /* @__PURE__ */ F.cloneElement(t, Ia(Ia({}, c), Sk(t)));
  else if (te(t))
    s = t(c);
  else if (nk(t) && !ok(t)) {
    var f = i(t, c);
    s = /* @__PURE__ */ S.createElement(_b, {
      shapeType: r,
      elementProps: f
    });
  } else {
    var l = c;
    s = /* @__PURE__ */ S.createElement(_b, {
      shapeType: r,
      elementProps: l
    });
  }
  return u ? /* @__PURE__ */ S.createElement(ue, {
    className: o
  }, s) : s;
}
function So(e, t) {
  return t != null && "trapezoids" in e.props;
}
function Po(e, t) {
  return t != null && "sectors" in e.props;
}
function hi(e, t) {
  return t != null && "points" in e.props;
}
function Pk(e, t) {
  var r, n, i = e.x === (t == null || (r = t.labelViewBox) === null || r === void 0 ? void 0 : r.x) || e.x === t.x, a = e.y === (t == null || (n = t.labelViewBox) === null || n === void 0 ? void 0 : n.y) || e.y === t.y;
  return i && a;
}
function Ek(e, t) {
  var r = e.endAngle === t.endAngle, n = e.startAngle === t.startAngle;
  return r && n;
}
function Tk(e, t) {
  var r = e.x === t.x, n = e.y === t.y, i = e.z === t.z;
  return r && n && i;
}
function jk(e, t) {
  var r;
  return So(e, t) ? r = Pk : Po(e, t) ? r = Ek : hi(e, t) && (r = Tk), r;
}
function $k(e, t) {
  var r;
  return So(e, t) ? r = "trapezoids" : Po(e, t) ? r = "sectors" : hi(e, t) && (r = "points"), r;
}
function Ck(e, t) {
  if (So(e, t)) {
    var r;
    return (r = t.tooltipPayload) === null || r === void 0 || (r = r[0]) === null || r === void 0 || (r = r.payload) === null || r === void 0 ? void 0 : r.payload;
  }
  if (Po(e, t)) {
    var n;
    return (n = t.tooltipPayload) === null || n === void 0 || (n = n[0]) === null || n === void 0 || (n = n.payload) === null || n === void 0 ? void 0 : n.payload;
  }
  return hi(e, t) ? t.payload : {};
}
function Mk(e) {
  var t = e.activeTooltipItem, r = e.graphicalItem, n = e.itemData, i = $k(r, t), a = Ck(r, t), o = n.filter(function(c, s) {
    var f = mr(a, c), l = r.props[i].filter(function(m) {
      var v = jk(r, t);
      return v(m, t);
    }), d = r.props[i].indexOf(l[l.length - 1]), h = s === d;
    return f && h;
  }), u = n.indexOf(o[o.length - 1]);
  return u;
}
var Vi;
function Zr(e) {
  "@babel/helpers - typeof";
  return Zr = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Zr(e);
}
function Ir() {
  return Ir = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Ir.apply(this, arguments);
}
function Ab(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function be(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Ab(Object(r), !0).forEach(function(n) {
      nt(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Ab(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function Ik(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function Sb(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, nO(n.key), n);
  }
}
function Rk(e, t, r) {
  return t && Sb(e.prototype, t), r && Sb(e, r), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function kk(e, t, r) {
  return t = Ra(t), Dk(e, rO() ? Reflect.construct(t, r || [], Ra(e).constructor) : t.apply(e, r));
}
function Dk(e, t) {
  if (t && (Zr(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return Nk(e);
}
function Nk(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function rO() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (rO = function() {
    return !!e;
  })();
}
function Ra(e) {
  return Ra = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, Ra(e);
}
function qk(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Ff(e, t);
}
function Ff(e, t) {
  return Ff = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n;
  }, Ff(e, t);
}
function nt(e, t, r) {
  return t = nO(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function nO(e) {
  var t = Lk(e, "string");
  return Zr(t) == "symbol" ? t : t + "";
}
function Lk(e, t) {
  if (Zr(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Zr(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var Nt = /* @__PURE__ */ (function(e) {
  function t(r) {
    var n;
    return Ik(this, t), n = kk(this, t, [r]), nt(n, "pieRef", null), nt(n, "sectorRefs", []), nt(n, "id", wr("recharts-pie-")), nt(n, "handleAnimationEnd", function() {
      var i = n.props.onAnimationEnd;
      n.setState({
        isAnimationFinished: !0
      }), te(i) && i();
    }), nt(n, "handleAnimationStart", function() {
      var i = n.props.onAnimationStart;
      n.setState({
        isAnimationFinished: !1
      }), te(i) && i();
    }), n.state = {
      isAnimationFinished: !r.isAnimationActive,
      prevIsAnimationActive: r.isAnimationActive,
      prevAnimationId: r.animationId,
      sectorToFocus: 0
    }, n;
  }
  return qk(t, e), Rk(t, [{
    key: "isActiveIndex",
    value: function(n) {
      var i = this.props.activeIndex;
      return Array.isArray(i) ? i.indexOf(n) !== -1 : n === i;
    }
  }, {
    key: "hasActiveIndex",
    value: function() {
      var n = this.props.activeIndex;
      return Array.isArray(n) ? n.length !== 0 : n || n === 0;
    }
  }, {
    key: "renderLabels",
    value: function(n) {
      var i = this.props.isAnimationActive;
      if (i && !this.state.isAnimationFinished)
        return null;
      var a = this.props, o = a.label, u = a.labelLine, c = a.dataKey, s = a.valueKey, f = X(this.props, !1), l = X(o, !1), d = X(u, !1), h = o && o.offsetRadius || 20, m = n.map(function(v, p) {
        var g = (v.startAngle + v.endAngle) / 2, x = we(v.cx, v.cy, v.outerRadius + h, g), w = be(be(be(be({}, f), v), {}, {
          stroke: "none"
        }, l), {}, {
          index: p,
          textAnchor: t.getTextAnchor(x.x, v.cx)
        }, x), O = be(be(be(be({}, f), v), {}, {
          fill: "none",
          stroke: v.fill
        }, d), {}, {
          index: p,
          points: [we(v.cx, v.cy, v.outerRadius, g), x]
        }), y = c;
        return ie(c) && ie(s) ? y = "value" : ie(c) && (y = s), // eslint-disable-next-line react/no-array-index-key
        /* @__PURE__ */ S.createElement(ue, {
          key: "label-".concat(v.startAngle, "-").concat(v.endAngle, "-").concat(v.midAngle, "-").concat(p)
        }, u && t.renderLabelLineItem(u, O, "line"), t.renderLabelItem(o, w, Pe(v, y)));
      });
      return /* @__PURE__ */ S.createElement(ue, {
        className: "recharts-pie-labels"
      }, m);
    }
  }, {
    key: "renderSectorsStatically",
    value: function(n) {
      var i = this, a = this.props, o = a.activeShape, u = a.blendStroke, c = a.inactiveShape;
      return n.map(function(s, f) {
        if ((s == null ? void 0 : s.startAngle) === 0 && (s == null ? void 0 : s.endAngle) === 0 && n.length !== 1) return null;
        var l = i.isActiveIndex(f), d = c && i.hasActiveIndex() ? c : null, h = l ? o : d, m = be(be({}, s), {}, {
          stroke: u ? s.fill : s.stroke,
          tabIndex: -1
        });
        return /* @__PURE__ */ S.createElement(ue, Ir({
          ref: function(p) {
            p && !i.sectorRefs.includes(p) && i.sectorRefs.push(p);
          },
          tabIndex: -1,
          className: "recharts-pie-sector"
        }, vr(i.props, s, f), {
          // eslint-disable-next-line react/no-array-index-key
          key: "sector-".concat(s == null ? void 0 : s.startAngle, "-").concat(s == null ? void 0 : s.endAngle, "-").concat(s.midAngle, "-").concat(f)
        }), /* @__PURE__ */ S.createElement(tO, Ir({
          option: h,
          isActive: l,
          shapeType: "sector"
        }, m)));
      });
    }
  }, {
    key: "renderSectorsWithAnimation",
    value: function() {
      var n = this, i = this.props, a = i.sectors, o = i.isAnimationActive, u = i.animationBegin, c = i.animationDuration, s = i.animationEasing, f = i.animationId, l = this.state, d = l.prevSectors, h = l.prevIsAnimationActive;
      return /* @__PURE__ */ S.createElement(dt, {
        begin: u,
        duration: c,
        isActive: o,
        easing: s,
        from: {
          t: 0
        },
        to: {
          t: 1
        },
        key: "pie-".concat(f, "-").concat(h),
        onAnimationStart: this.handleAnimationStart,
        onAnimationEnd: this.handleAnimationEnd
      }, function(m) {
        var v = m.t, p = [], g = a && a[0], x = g.startAngle;
        return a.forEach(function(w, O) {
          var y = d && d[O], b = O > 0 ? Je(w, "paddingAngle", 0) : 0;
          if (y) {
            var _ = Ce(y.endAngle - y.startAngle, w.endAngle - w.startAngle), A = be(be({}, w), {}, {
              startAngle: x + b,
              endAngle: x + _(v) + b
            });
            p.push(A), x = A.endAngle;
          } else {
            var E = w.endAngle, C = w.startAngle, P = Ce(0, E - C), T = P(v), $ = be(be({}, w), {}, {
              startAngle: x + b,
              endAngle: x + T + b
            });
            p.push($), x = $.endAngle;
          }
        }), /* @__PURE__ */ S.createElement(ue, null, n.renderSectorsStatically(p));
      });
    }
  }, {
    key: "attachKeyboardHandlers",
    value: function(n) {
      var i = this;
      n.onkeydown = function(a) {
        if (!a.altKey)
          switch (a.key) {
            case "ArrowLeft": {
              var o = ++i.state.sectorToFocus % i.sectorRefs.length;
              i.sectorRefs[o].focus(), i.setState({
                sectorToFocus: o
              });
              break;
            }
            case "ArrowRight": {
              var u = --i.state.sectorToFocus < 0 ? i.sectorRefs.length - 1 : i.state.sectorToFocus % i.sectorRefs.length;
              i.sectorRefs[u].focus(), i.setState({
                sectorToFocus: u
              });
              break;
            }
            case "Escape": {
              i.sectorRefs[i.state.sectorToFocus].blur(), i.setState({
                sectorToFocus: 0
              });
              break;
            }
          }
      };
    }
  }, {
    key: "renderSectors",
    value: function() {
      var n = this.props, i = n.sectors, a = n.isAnimationActive, o = this.state.prevSectors;
      return a && i && i.length && (!o || !mr(o, i)) ? this.renderSectorsWithAnimation() : this.renderSectorsStatically(i);
    }
  }, {
    key: "componentDidMount",
    value: function() {
      this.pieRef && this.attachKeyboardHandlers(this.pieRef);
    }
  }, {
    key: "render",
    value: function() {
      var n = this, i = this.props, a = i.hide, o = i.sectors, u = i.className, c = i.label, s = i.cx, f = i.cy, l = i.innerRadius, d = i.outerRadius, h = i.isAnimationActive, m = this.state.isAnimationFinished;
      if (a || !o || !o.length || !z(s) || !z(f) || !z(l) || !z(d))
        return null;
      var v = ae("recharts-pie", u);
      return /* @__PURE__ */ S.createElement(ue, {
        tabIndex: this.props.rootTabIndex,
        className: v,
        ref: function(g) {
          n.pieRef = g;
        }
      }, this.renderSectors(), c && this.renderLabels(o), ke.renderCallByParent(this.props, null, !1), (!h || m) && gt.renderCallByParent(this.props, o, !1));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function(n, i) {
      return i.prevIsAnimationActive !== n.isAnimationActive ? {
        prevIsAnimationActive: n.isAnimationActive,
        prevAnimationId: n.animationId,
        curSectors: n.sectors,
        prevSectors: [],
        isAnimationFinished: !0
      } : n.isAnimationActive && n.animationId !== i.prevAnimationId ? {
        prevAnimationId: n.animationId,
        curSectors: n.sectors,
        prevSectors: i.curSectors,
        isAnimationFinished: !0
      } : n.sectors !== i.curSectors ? {
        curSectors: n.sectors,
        isAnimationFinished: !0
      } : null;
    }
  }, {
    key: "getTextAnchor",
    value: function(n, i) {
      return n > i ? "start" : n < i ? "end" : "middle";
    }
  }, {
    key: "renderLabelLineItem",
    value: function(n, i, a) {
      if (/* @__PURE__ */ S.isValidElement(n))
        return /* @__PURE__ */ S.cloneElement(n, i);
      if (te(n))
        return n(i);
      var o = ae("recharts-pie-label-line", typeof n != "boolean" ? n.className : "");
      return /* @__PURE__ */ S.createElement(pr, Ir({}, i, {
        key: a,
        type: "linear",
        className: o
      }));
    }
  }, {
    key: "renderLabelItem",
    value: function(n, i, a) {
      if (/* @__PURE__ */ S.isValidElement(n))
        return /* @__PURE__ */ S.cloneElement(n, i);
      var o = a;
      if (te(n) && (o = n(i), /* @__PURE__ */ S.isValidElement(o)))
        return o;
      var u = ae("recharts-pie-label-text", typeof n != "boolean" && !te(n) ? n.className : "");
      return /* @__PURE__ */ S.createElement(yr, Ir({}, i, {
        alignmentBaseline: "middle",
        className: u
      }), o);
    }
  }]);
})(F.PureComponent);
Vi = Nt;
nt(Nt, "displayName", "Pie");
nt(Nt, "defaultProps", {
  stroke: "#fff",
  fill: "#808080",
  legendType: "rect",
  cx: "50%",
  cy: "50%",
  startAngle: 0,
  endAngle: 360,
  innerRadius: 0,
  outerRadius: "80%",
  paddingAngle: 0,
  labelLine: !0,
  hide: !1,
  minAngle: 0,
  isAnimationActive: !Vt.isSsr,
  animationBegin: 400,
  animationDuration: 1500,
  animationEasing: "ease",
  nameKey: "name",
  blendStroke: !1,
  rootTabIndex: 0
});
nt(Nt, "parseDeltaAngle", function(e, t) {
  var r = Fe(t - e), n = Math.min(Math.abs(t - e), 360);
  return r * n;
});
nt(Nt, "getRealPieData", function(e) {
  var t = e.data, r = e.children, n = X(e, !1), i = Qe(r, so);
  return t && t.length ? t.map(function(a, o) {
    return be(be(be({
      payload: a
    }, n), a), i && i[o] && i[o].props);
  }) : i && i.length ? i.map(function(a) {
    return be(be({}, n), a.props);
  }) : [];
});
nt(Nt, "parseCoordinateOfPie", function(e, t) {
  var r = t.top, n = t.left, i = t.width, a = t.height, o = Nw(i, a), u = n + ze(e.cx, i, i / 2), c = r + ze(e.cy, a, a / 2), s = ze(e.innerRadius, o, 0), f = ze(e.outerRadius, o, o * 0.8), l = e.maxRadius || Math.sqrt(i * i + a * a) / 2;
  return {
    cx: u,
    cy: c,
    innerRadius: s,
    outerRadius: f,
    maxRadius: l
  };
});
nt(Nt, "getComposedData", function(e) {
  var t = e.item, r = e.offset, n = t.type.defaultProps !== void 0 ? be(be({}, t.type.defaultProps), t.props) : t.props, i = Vi.getRealPieData(n);
  if (!i || !i.length)
    return null;
  var a = n.cornerRadius, o = n.startAngle, u = n.endAngle, c = n.paddingAngle, s = n.dataKey, f = n.nameKey, l = n.valueKey, d = n.tooltipType, h = Math.abs(n.minAngle), m = Vi.parseCoordinateOfPie(n, r), v = Vi.parseDeltaAngle(o, u), p = Math.abs(v), g = s;
  ie(s) && ie(l) ? (ft(!1, `Use "dataKey" to specify the value of pie,
      the props "valueKey" will be deprecated in 1.1.0`), g = "value") : ie(s) && (ft(!1, `Use "dataKey" to specify the value of pie,
      the props "valueKey" will be deprecated in 1.1.0`), g = l);
  var x = i.filter(function(A) {
    return Pe(A, g, 0) !== 0;
  }).length, w = (p >= 360 ? x : x - 1) * c, O = p - x * h - w, y = i.reduce(function(A, E) {
    var C = Pe(E, g, 0);
    return A + (z(C) ? C : 0);
  }, 0), b;
  if (y > 0) {
    var _;
    b = i.map(function(A, E) {
      var C = Pe(A, g, 0), P = Pe(A, f, E), T = (z(C) ? C : 0) / y, $;
      E ? $ = _.endAngle + Fe(v) * c * (C !== 0 ? 1 : 0) : $ = o;
      var R = $ + Fe(v) * ((C !== 0 ? h : 0) + T * O), I = ($ + R) / 2, k = (m.innerRadius + m.outerRadius) / 2, q = [{
        name: P,
        value: C,
        payload: A,
        dataKey: g,
        type: d
      }], W = we(m.cx, m.cy, k, I);
      return _ = be(be(be({
        percent: T,
        cornerRadius: a,
        name: P,
        tooltipPayload: q,
        midAngle: I,
        middleRadius: k,
        tooltipPosition: W
      }, A), m), {}, {
        value: Pe(A, g),
        startAngle: $,
        endAngle: R,
        payload: A,
        paddingAngle: Fe(v) * c
      }), _;
    });
  }
  return be(be({}, m), {}, {
    sectors: b,
    data: i
  });
});
var xl, Pb;
function Bk() {
  if (Pb) return xl;
  Pb = 1;
  var e = Math.ceil, t = Math.max;
  function r(n, i, a, o) {
    for (var u = -1, c = t(e((i - n) / (a || 1)), 0), s = Array(c); c--; )
      s[o ? c : ++u] = n, n += a;
    return s;
  }
  return xl = r, xl;
}
var wl, Eb;
function iO() {
  if (Eb) return wl;
  Eb = 1;
  var e = Ax(), t = 1 / 0, r = 17976931348623157e292;
  function n(i) {
    if (!i)
      return i === 0 ? i : 0;
    if (i = e(i), i === t || i === -t) {
      var a = i < 0 ? -1 : 1;
      return a * r;
    }
    return i === i ? i : 0;
  }
  return wl = n, wl;
}
var Ol, Tb;
function Fk() {
  if (Tb) return Ol;
  Tb = 1;
  var e = Bk(), t = co(), r = iO();
  function n(i) {
    return function(a, o, u) {
      return u && typeof u != "number" && t(a, o, u) && (o = u = void 0), a = r(a), o === void 0 ? (o = a, a = 0) : o = r(o), u = u === void 0 ? a < o ? 1 : -1 : r(u), e(a, o, u, i);
    };
  }
  return Ol = n, Ol;
}
var _l, jb;
function zk() {
  if (jb) return _l;
  jb = 1;
  var e = Fk(), t = e();
  return _l = t, _l;
}
var Wk = zk();
const ka = /* @__PURE__ */ ye(Wk);
function vi(e) {
  "@babel/helpers - typeof";
  return vi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, vi(e);
}
function $b(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Cb(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? $b(Object(r), !0).forEach(function(n) {
      aO(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : $b(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function aO(e, t, r) {
  return t = Uk(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function Uk(e) {
  var t = Kk(e, "string");
  return vi(t) == "symbol" ? t : t + "";
}
function Kk(e, t) {
  if (vi(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (vi(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var Hk = ["Webkit", "Moz", "O", "ms"], Gk = function(t, r) {
  var n = t.replace(/(\w)/, function(a) {
    return a.toUpperCase();
  }), i = Hk.reduce(function(a, o) {
    return Cb(Cb({}, a), {}, aO({}, o + n, r));
  }, {});
  return i[t] = r, i;
};
function Jr(e) {
  "@babel/helpers - typeof";
  return Jr = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Jr(e);
}
function Da() {
  return Da = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Da.apply(this, arguments);
}
function Mb(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Al(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Mb(Object(r), !0).forEach(function(n) {
      Ve(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Mb(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function Vk(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function Ib(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, uO(n.key), n);
  }
}
function Yk(e, t, r) {
  return t && Ib(e.prototype, t), r && Ib(e, r), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function Xk(e, t, r) {
  return t = Na(t), Zk(e, oO() ? Reflect.construct(t, r || [], Na(e).constructor) : t.apply(e, r));
}
function Zk(e, t) {
  if (t && (Jr(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return Jk(e);
}
function Jk(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function oO() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (oO = function() {
    return !!e;
  })();
}
function Na(e) {
  return Na = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, Na(e);
}
function Qk(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && zf(e, t);
}
function zf(e, t) {
  return zf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n;
  }, zf(e, t);
}
function Ve(e, t, r) {
  return t = uO(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function uO(e) {
  var t = eD(e, "string");
  return Jr(t) == "symbol" ? t : t + "";
}
function eD(e, t) {
  if (Jr(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Jr(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var tD = function(t) {
  var r = t.data, n = t.startIndex, i = t.endIndex, a = t.x, o = t.width, u = t.travellerWidth;
  if (!r || !r.length)
    return {};
  var c = r.length, s = Rn().domain(ka(0, c)).range([a, a + o - u]), f = s.domain().map(function(l) {
    return s(l);
  });
  return {
    isTextActive: !1,
    isSlideMoving: !1,
    isTravellerMoving: !1,
    isTravellerFocused: !1,
    startX: s(n),
    endX: s(i),
    scale: s,
    scaleValues: f
  };
}, Rb = function(t) {
  return t.changedTouches && !!t.changedTouches.length;
}, Qr = /* @__PURE__ */ (function(e) {
  function t(r) {
    var n;
    return Vk(this, t), n = Xk(this, t, [r]), Ve(n, "handleDrag", function(i) {
      n.leaveTimer && (clearTimeout(n.leaveTimer), n.leaveTimer = null), n.state.isTravellerMoving ? n.handleTravellerMove(i) : n.state.isSlideMoving && n.handleSlideDrag(i);
    }), Ve(n, "handleTouchMove", function(i) {
      i.changedTouches != null && i.changedTouches.length > 0 && n.handleDrag(i.changedTouches[0]);
    }), Ve(n, "handleDragEnd", function() {
      n.setState({
        isTravellerMoving: !1,
        isSlideMoving: !1
      }, function() {
        var i = n.props, a = i.endIndex, o = i.onDragEnd, u = i.startIndex;
        o == null || o({
          endIndex: a,
          startIndex: u
        });
      }), n.detachDragEndListener();
    }), Ve(n, "handleLeaveWrapper", function() {
      (n.state.isTravellerMoving || n.state.isSlideMoving) && (n.leaveTimer = window.setTimeout(n.handleDragEnd, n.props.leaveTimeOut));
    }), Ve(n, "handleEnterSlideOrTraveller", function() {
      n.setState({
        isTextActive: !0
      });
    }), Ve(n, "handleLeaveSlideOrTraveller", function() {
      n.setState({
        isTextActive: !1
      });
    }), Ve(n, "handleSlideDragStart", function(i) {
      var a = Rb(i) ? i.changedTouches[0] : i;
      n.setState({
        isTravellerMoving: !1,
        isSlideMoving: !0,
        slideMoveStartX: a.pageX
      }), n.attachDragEndListener();
    }), n.travellerDragStartHandlers = {
      startX: n.handleTravellerDragStart.bind(n, "startX"),
      endX: n.handleTravellerDragStart.bind(n, "endX")
    }, n.state = {}, n;
  }
  return Qk(t, e), Yk(t, [{
    key: "componentWillUnmount",
    value: function() {
      this.leaveTimer && (clearTimeout(this.leaveTimer), this.leaveTimer = null), this.detachDragEndListener();
    }
  }, {
    key: "getIndex",
    value: function(n) {
      var i = n.startX, a = n.endX, o = this.state.scaleValues, u = this.props, c = u.gap, s = u.data, f = s.length - 1, l = Math.min(i, a), d = Math.max(i, a), h = t.getIndexInRange(o, l), m = t.getIndexInRange(o, d);
      return {
        startIndex: h - h % c,
        endIndex: m === f ? f : m - m % c
      };
    }
  }, {
    key: "getTextOfTick",
    value: function(n) {
      var i = this.props, a = i.data, o = i.tickFormatter, u = i.dataKey, c = Pe(a[n], u, n);
      return te(o) ? o(c, n) : c;
    }
  }, {
    key: "attachDragEndListener",
    value: function() {
      window.addEventListener("mouseup", this.handleDragEnd, !0), window.addEventListener("touchend", this.handleDragEnd, !0), window.addEventListener("mousemove", this.handleDrag, !0);
    }
  }, {
    key: "detachDragEndListener",
    value: function() {
      window.removeEventListener("mouseup", this.handleDragEnd, !0), window.removeEventListener("touchend", this.handleDragEnd, !0), window.removeEventListener("mousemove", this.handleDrag, !0);
    }
  }, {
    key: "handleSlideDrag",
    value: function(n) {
      var i = this.state, a = i.slideMoveStartX, o = i.startX, u = i.endX, c = this.props, s = c.x, f = c.width, l = c.travellerWidth, d = c.startIndex, h = c.endIndex, m = c.onChange, v = n.pageX - a;
      v > 0 ? v = Math.min(v, s + f - l - u, s + f - l - o) : v < 0 && (v = Math.max(v, s - o, s - u));
      var p = this.getIndex({
        startX: o + v,
        endX: u + v
      });
      (p.startIndex !== d || p.endIndex !== h) && m && m(p), this.setState({
        startX: o + v,
        endX: u + v,
        slideMoveStartX: n.pageX
      });
    }
  }, {
    key: "handleTravellerDragStart",
    value: function(n, i) {
      var a = Rb(i) ? i.changedTouches[0] : i;
      this.setState({
        isSlideMoving: !1,
        isTravellerMoving: !0,
        movingTravellerId: n,
        brushMoveStartX: a.pageX
      }), this.attachDragEndListener();
    }
  }, {
    key: "handleTravellerMove",
    value: function(n) {
      var i = this.state, a = i.brushMoveStartX, o = i.movingTravellerId, u = i.endX, c = i.startX, s = this.state[o], f = this.props, l = f.x, d = f.width, h = f.travellerWidth, m = f.onChange, v = f.gap, p = f.data, g = {
        startX: this.state.startX,
        endX: this.state.endX
      }, x = n.pageX - a;
      x > 0 ? x = Math.min(x, l + d - h - s) : x < 0 && (x = Math.max(x, l - s)), g[o] = s + x;
      var w = this.getIndex(g), O = w.startIndex, y = w.endIndex, b = function() {
        var A = p.length - 1;
        return o === "startX" && (u > c ? O % v === 0 : y % v === 0) || u < c && y === A || o === "endX" && (u > c ? y % v === 0 : O % v === 0) || u > c && y === A;
      };
      this.setState(Ve(Ve({}, o, s + x), "brushMoveStartX", n.pageX), function() {
        m && b() && m(w);
      });
    }
  }, {
    key: "handleTravellerMoveKeyboard",
    value: function(n, i) {
      var a = this, o = this.state, u = o.scaleValues, c = o.startX, s = o.endX, f = this.state[i], l = u.indexOf(f);
      if (l !== -1) {
        var d = l + n;
        if (!(d === -1 || d >= u.length)) {
          var h = u[d];
          i === "startX" && h >= s || i === "endX" && h <= c || this.setState(Ve({}, i, h), function() {
            a.props.onChange(a.getIndex({
              startX: a.state.startX,
              endX: a.state.endX
            }));
          });
        }
      }
    }
  }, {
    key: "renderBackground",
    value: function() {
      var n = this.props, i = n.x, a = n.y, o = n.width, u = n.height, c = n.fill, s = n.stroke;
      return /* @__PURE__ */ S.createElement("rect", {
        stroke: s,
        fill: c,
        x: i,
        y: a,
        width: o,
        height: u
      });
    }
  }, {
    key: "renderPanorama",
    value: function() {
      var n = this.props, i = n.x, a = n.y, o = n.width, u = n.height, c = n.data, s = n.children, f = n.padding, l = F.Children.only(s);
      return l ? /* @__PURE__ */ S.cloneElement(l, {
        x: i,
        y: a,
        width: o,
        height: u,
        margin: f,
        compact: !0,
        data: c
      }) : null;
    }
  }, {
    key: "renderTravellerLayer",
    value: function(n, i) {
      var a, o, u = this, c = this.props, s = c.y, f = c.travellerWidth, l = c.height, d = c.traveller, h = c.ariaLabel, m = c.data, v = c.startIndex, p = c.endIndex, g = Math.max(n, this.props.x), x = Al(Al({}, X(this.props, !1)), {}, {
        x: g,
        y: s,
        width: f,
        height: l
      }), w = h || "Min value: ".concat((a = m[v]) === null || a === void 0 ? void 0 : a.name, ", Max value: ").concat((o = m[p]) === null || o === void 0 ? void 0 : o.name);
      return /* @__PURE__ */ S.createElement(ue, {
        tabIndex: 0,
        role: "slider",
        "aria-label": w,
        "aria-valuenow": n,
        className: "recharts-brush-traveller",
        onMouseEnter: this.handleEnterSlideOrTraveller,
        onMouseLeave: this.handleLeaveSlideOrTraveller,
        onMouseDown: this.travellerDragStartHandlers[i],
        onTouchStart: this.travellerDragStartHandlers[i],
        onKeyDown: function(y) {
          ["ArrowLeft", "ArrowRight"].includes(y.key) && (y.preventDefault(), y.stopPropagation(), u.handleTravellerMoveKeyboard(y.key === "ArrowRight" ? 1 : -1, i));
        },
        onFocus: function() {
          u.setState({
            isTravellerFocused: !0
          });
        },
        onBlur: function() {
          u.setState({
            isTravellerFocused: !1
          });
        },
        style: {
          cursor: "col-resize"
        }
      }, t.renderTraveller(d, x));
    }
  }, {
    key: "renderSlide",
    value: function(n, i) {
      var a = this.props, o = a.y, u = a.height, c = a.stroke, s = a.travellerWidth, f = Math.min(n, i) + s, l = Math.max(Math.abs(i - n) - s, 0);
      return /* @__PURE__ */ S.createElement("rect", {
        className: "recharts-brush-slide",
        onMouseEnter: this.handleEnterSlideOrTraveller,
        onMouseLeave: this.handleLeaveSlideOrTraveller,
        onMouseDown: this.handleSlideDragStart,
        onTouchStart: this.handleSlideDragStart,
        style: {
          cursor: "move"
        },
        stroke: "none",
        fill: c,
        fillOpacity: 0.2,
        x: f,
        y: o,
        width: l,
        height: u
      });
    }
  }, {
    key: "renderText",
    value: function() {
      var n = this.props, i = n.startIndex, a = n.endIndex, o = n.y, u = n.height, c = n.travellerWidth, s = n.stroke, f = this.state, l = f.startX, d = f.endX, h = 5, m = {
        pointerEvents: "none",
        fill: s
      };
      return /* @__PURE__ */ S.createElement(ue, {
        className: "recharts-brush-texts"
      }, /* @__PURE__ */ S.createElement(yr, Da({
        textAnchor: "end",
        verticalAnchor: "middle",
        x: Math.min(l, d) - h,
        y: o + u / 2
      }, m), this.getTextOfTick(i)), /* @__PURE__ */ S.createElement(yr, Da({
        textAnchor: "start",
        verticalAnchor: "middle",
        x: Math.max(l, d) + c + h,
        y: o + u / 2
      }, m), this.getTextOfTick(a)));
    }
  }, {
    key: "render",
    value: function() {
      var n = this.props, i = n.data, a = n.className, o = n.children, u = n.x, c = n.y, s = n.width, f = n.height, l = n.alwaysShowText, d = this.state, h = d.startX, m = d.endX, v = d.isTextActive, p = d.isSlideMoving, g = d.isTravellerMoving, x = d.isTravellerFocused;
      if (!i || !i.length || !z(u) || !z(c) || !z(s) || !z(f) || s <= 0 || f <= 0)
        return null;
      var w = ae("recharts-brush", a), O = S.Children.count(o) === 1, y = Gk("userSelect", "none");
      return /* @__PURE__ */ S.createElement(ue, {
        className: w,
        onMouseLeave: this.handleLeaveWrapper,
        onTouchMove: this.handleTouchMove,
        style: y
      }, this.renderBackground(), O && this.renderPanorama(), this.renderSlide(h, m), this.renderTravellerLayer(h, "startX"), this.renderTravellerLayer(m, "endX"), (v || p || g || x || l) && this.renderText());
    }
  }], [{
    key: "renderDefaultTraveller",
    value: function(n) {
      var i = n.x, a = n.y, o = n.width, u = n.height, c = n.stroke, s = Math.floor(a + u / 2) - 1;
      return /* @__PURE__ */ S.createElement(S.Fragment, null, /* @__PURE__ */ S.createElement("rect", {
        x: i,
        y: a,
        width: o,
        height: u,
        fill: c,
        stroke: "none"
      }), /* @__PURE__ */ S.createElement("line", {
        x1: i + 1,
        y1: s,
        x2: i + o - 1,
        y2: s,
        fill: "none",
        stroke: "#fff"
      }), /* @__PURE__ */ S.createElement("line", {
        x1: i + 1,
        y1: s + 2,
        x2: i + o - 1,
        y2: s + 2,
        fill: "none",
        stroke: "#fff"
      }));
    }
  }, {
    key: "renderTraveller",
    value: function(n, i) {
      var a;
      return /* @__PURE__ */ S.isValidElement(n) ? a = /* @__PURE__ */ S.cloneElement(n, i) : te(n) ? a = n(i) : a = t.renderDefaultTraveller(i), a;
    }
  }, {
    key: "getDerivedStateFromProps",
    value: function(n, i) {
      var a = n.data, o = n.width, u = n.x, c = n.travellerWidth, s = n.updateId, f = n.startIndex, l = n.endIndex;
      if (a !== i.prevData || s !== i.prevUpdateId)
        return Al({
          prevData: a,
          prevTravellerWidth: c,
          prevUpdateId: s,
          prevX: u,
          prevWidth: o
        }, a && a.length ? tD({
          data: a,
          width: o,
          x: u,
          travellerWidth: c,
          startIndex: f,
          endIndex: l
        }) : {
          scale: null,
          scaleValues: null
        });
      if (i.scale && (o !== i.prevWidth || u !== i.prevX || c !== i.prevTravellerWidth)) {
        i.scale.range([u, u + o - c]);
        var d = i.scale.domain().map(function(h) {
          return i.scale(h);
        });
        return {
          prevData: a,
          prevTravellerWidth: c,
          prevUpdateId: s,
          prevX: u,
          prevWidth: o,
          startX: i.scale(n.startIndex),
          endX: i.scale(n.endIndex),
          scaleValues: d
        };
      }
      return null;
    }
  }, {
    key: "getIndexInRange",
    value: function(n, i) {
      for (var a = n.length, o = 0, u = a - 1; u - o > 1; ) {
        var c = Math.floor((o + u) / 2);
        n[c] > i ? u = c : o = c;
      }
      return i >= n[u] ? u : o;
    }
  }]);
})(F.PureComponent);
Ve(Qr, "displayName", "Brush");
Ve(Qr, "defaultProps", {
  height: 40,
  travellerWidth: 5,
  gap: 1,
  fill: "#fff",
  stroke: "#666",
  padding: {
    top: 1,
    right: 1,
    bottom: 1,
    left: 1
  },
  leaveTimeOut: 1e3,
  alwaysShowText: !1
});
var Sl, kb;
function rD() {
  if (kb) return Sl;
  kb = 1;
  var e = jd();
  function t(r, n) {
    var i;
    return e(r, function(a, o, u) {
      return i = n(a, o, u), !i;
    }), !!i;
  }
  return Sl = t, Sl;
}
var Pl, Db;
function nD() {
  if (Db) return Pl;
  Db = 1;
  var e = tx(), t = Ot(), r = rD(), n = He(), i = co();
  function a(o, u, c) {
    var s = n(o) ? e : r;
    return c && i(o, u, c) && (u = void 0), s(o, t(u, 3));
  }
  return Pl = a, Pl;
}
var iD = nD();
const aD = /* @__PURE__ */ ye(iD);
var bt = function(t, r) {
  var n = t.alwaysShow, i = t.ifOverflow;
  return n && (i = "extendDomain"), i === r;
}, El, Nb;
function oD() {
  if (Nb) return El;
  Nb = 1;
  var e = bx();
  function t(r, n, i) {
    n == "__proto__" && e ? e(r, n, {
      configurable: !0,
      enumerable: !0,
      value: i,
      writable: !0
    }) : r[n] = i;
  }
  return El = t, El;
}
var Tl, qb;
function uD() {
  if (qb) return Tl;
  qb = 1;
  var e = oD(), t = mx(), r = Ot();
  function n(i, a) {
    var o = {};
    return a = r(a, 3), t(i, function(u, c, s) {
      e(o, c, a(u, c, s));
    }), o;
  }
  return Tl = n, Tl;
}
var cD = uD();
const sD = /* @__PURE__ */ ye(cD);
var jl, Lb;
function lD() {
  if (Lb) return jl;
  Lb = 1;
  function e(t, r) {
    for (var n = -1, i = t == null ? 0 : t.length; ++n < i; )
      if (!r(t[n], n, t))
        return !1;
    return !0;
  }
  return jl = e, jl;
}
var $l, Bb;
function fD() {
  if (Bb) return $l;
  Bb = 1;
  var e = jd();
  function t(r, n) {
    var i = !0;
    return e(r, function(a, o, u) {
      return i = !!n(a, o, u), i;
    }), i;
  }
  return $l = t, $l;
}
var Cl, Fb;
function dD() {
  if (Fb) return Cl;
  Fb = 1;
  var e = lD(), t = fD(), r = Ot(), n = He(), i = co();
  function a(o, u, c) {
    var s = n(o) ? e : t;
    return c && i(o, u, c) && (u = void 0), s(o, r(u, 3));
  }
  return Cl = a, Cl;
}
var pD = dD();
const cO = /* @__PURE__ */ ye(pD);
var hD = ["x", "y"];
function en(e) {
  "@babel/helpers - typeof";
  return en = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, en(e);
}
function Wf() {
  return Wf = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Wf.apply(this, arguments);
}
function zb(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function jn(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? zb(Object(r), !0).forEach(function(n) {
      vD(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : zb(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function vD(e, t, r) {
  return t = yD(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function yD(e) {
  var t = mD(e, "string");
  return en(t) == "symbol" ? t : t + "";
}
function mD(e, t) {
  if (en(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (en(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function gD(e, t) {
  if (e == null) return {};
  var r = bD(e, t), n, i;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (i = 0; i < a.length; i++)
      n = a[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function bD(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
function xD(e, t) {
  var r = e.x, n = e.y, i = gD(e, hD), a = "".concat(r), o = parseInt(a, 10), u = "".concat(n), c = parseInt(u, 10), s = "".concat(t.height || i.height), f = parseInt(s, 10), l = "".concat(t.width || i.width), d = parseInt(l, 10);
  return jn(jn(jn(jn(jn({}, t), i), o ? {
    x: o
  } : {}), c ? {
    y: c
  } : {}), {}, {
    height: f,
    width: d,
    name: t.name,
    radius: t.radius
  });
}
function Wb(e) {
  return /* @__PURE__ */ S.createElement(tO, Wf({
    shapeType: "rectangle",
    propTransformer: xD,
    activeClassName: "recharts-active-bar"
  }, e));
}
var wD = function(t) {
  var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
  return function(n, i) {
    if (typeof t == "number") return t;
    var a = z(n) || L_(n);
    return a ? t(n, i) : (a || (process.env.NODE_ENV !== "production" ? Ke(!1, "minPointSize callback function received a value with type of ".concat(en(n), ". Currently only numbers or null/undefined are supported.")) : Ke()), r);
  };
}, OD = ["value", "background"], sO;
function tn(e) {
  "@babel/helpers - typeof";
  return tn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, tn(e);
}
function _D(e, t) {
  if (e == null) return {};
  var r = AD(e, t), n, i;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (i = 0; i < a.length; i++)
      n = a[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function AD(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
function qa() {
  return qa = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, qa.apply(this, arguments);
}
function Ub(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Ee(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Ub(Object(r), !0).forEach(function(n) {
      Wt(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Ub(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function SD(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function Kb(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, fO(n.key), n);
  }
}
function PD(e, t, r) {
  return t && Kb(e.prototype, t), r && Kb(e, r), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function ED(e, t, r) {
  return t = La(t), TD(e, lO() ? Reflect.construct(t, r || [], La(e).constructor) : t.apply(e, r));
}
function TD(e, t) {
  if (t && (tn(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return jD(e);
}
function jD(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function lO() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (lO = function() {
    return !!e;
  })();
}
function La(e) {
  return La = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, La(e);
}
function $D(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Uf(e, t);
}
function Uf(e, t) {
  return Uf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n;
  }, Uf(e, t);
}
function Wt(e, t, r) {
  return t = fO(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function fO(e) {
  var t = CD(e, "string");
  return tn(t) == "symbol" ? t : t + "";
}
function CD(e, t) {
  if (tn(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (tn(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var Sr = /* @__PURE__ */ (function(e) {
  function t() {
    var r;
    SD(this, t);
    for (var n = arguments.length, i = new Array(n), a = 0; a < n; a++)
      i[a] = arguments[a];
    return r = ED(this, t, [].concat(i)), Wt(r, "state", {
      isAnimationFinished: !1
    }), Wt(r, "id", wr("recharts-bar-")), Wt(r, "handleAnimationEnd", function() {
      var o = r.props.onAnimationEnd;
      r.setState({
        isAnimationFinished: !0
      }), o && o();
    }), Wt(r, "handleAnimationStart", function() {
      var o = r.props.onAnimationStart;
      r.setState({
        isAnimationFinished: !1
      }), o && o();
    }), r;
  }
  return $D(t, e), PD(t, [{
    key: "renderRectanglesStatically",
    value: function(n) {
      var i = this, a = this.props, o = a.shape, u = a.dataKey, c = a.activeIndex, s = a.activeBar, f = X(this.props, !1);
      return n && n.map(function(l, d) {
        var h = d === c, m = h ? s : o, v = Ee(Ee(Ee({}, f), l), {}, {
          isActive: h,
          option: m,
          index: d,
          dataKey: u,
          onAnimationStart: i.handleAnimationStart,
          onAnimationEnd: i.handleAnimationEnd
        });
        return /* @__PURE__ */ S.createElement(ue, qa({
          className: "recharts-bar-rectangle"
        }, vr(i.props, l, d), {
          // https://github.com/recharts/recharts/issues/5415
          // eslint-disable-next-line react/no-array-index-key
          key: "rectangle-".concat(l == null ? void 0 : l.x, "-").concat(l == null ? void 0 : l.y, "-").concat(l == null ? void 0 : l.value, "-").concat(d)
        }), /* @__PURE__ */ S.createElement(Wb, v));
      });
    }
  }, {
    key: "renderRectanglesWithAnimation",
    value: function() {
      var n = this, i = this.props, a = i.data, o = i.layout, u = i.isAnimationActive, c = i.animationBegin, s = i.animationDuration, f = i.animationEasing, l = i.animationId, d = this.state.prevData;
      return /* @__PURE__ */ S.createElement(dt, {
        begin: c,
        duration: s,
        isActive: u,
        easing: f,
        from: {
          t: 0
        },
        to: {
          t: 1
        },
        key: "bar-".concat(l),
        onAnimationEnd: this.handleAnimationEnd,
        onAnimationStart: this.handleAnimationStart
      }, function(h) {
        var m = h.t, v = a.map(function(p, g) {
          var x = d && d[g];
          if (x) {
            var w = Ce(x.x, p.x), O = Ce(x.y, p.y), y = Ce(x.width, p.width), b = Ce(x.height, p.height);
            return Ee(Ee({}, p), {}, {
              x: w(m),
              y: O(m),
              width: y(m),
              height: b(m)
            });
          }
          if (o === "horizontal") {
            var _ = Ce(0, p.height), A = _(m);
            return Ee(Ee({}, p), {}, {
              y: p.y + p.height - A,
              height: A
            });
          }
          var E = Ce(0, p.width), C = E(m);
          return Ee(Ee({}, p), {}, {
            width: C
          });
        });
        return /* @__PURE__ */ S.createElement(ue, null, n.renderRectanglesStatically(v));
      });
    }
  }, {
    key: "renderRectangles",
    value: function() {
      var n = this.props, i = n.data, a = n.isAnimationActive, o = this.state.prevData;
      return a && i && i.length && (!o || !mr(o, i)) ? this.renderRectanglesWithAnimation() : this.renderRectanglesStatically(i);
    }
  }, {
    key: "renderBackground",
    value: function() {
      var n = this, i = this.props, a = i.data, o = i.dataKey, u = i.activeIndex, c = X(this.props.background, !1);
      return a.map(function(s, f) {
        s.value;
        var l = s.background, d = _D(s, OD);
        if (!l)
          return null;
        var h = Ee(Ee(Ee(Ee(Ee({}, d), {}, {
          fill: "#eee"
        }, l), c), vr(n.props, s, f)), {}, {
          onAnimationStart: n.handleAnimationStart,
          onAnimationEnd: n.handleAnimationEnd,
          dataKey: o,
          index: f,
          className: "recharts-bar-background-rectangle"
        });
        return /* @__PURE__ */ S.createElement(Wb, qa({
          key: "background-bar-".concat(f),
          option: n.props.background,
          isActive: f === u
        }, h));
      });
    }
  }, {
    key: "renderErrorBar",
    value: function(n, i) {
      if (this.props.isAnimationActive && !this.state.isAnimationFinished)
        return null;
      var a = this.props, o = a.data, u = a.xAxis, c = a.yAxis, s = a.layout, f = a.children, l = Qe(f, Pi);
      if (!l)
        return null;
      var d = s === "vertical" ? o[0].height / 2 : o[0].width / 2, h = function(p, g) {
        var x = Array.isArray(p.value) ? p.value[1] : p.value;
        return {
          x: p.x,
          y: p.y,
          value: x,
          errorVal: Pe(p, g)
        };
      }, m = {
        clipPath: n ? "url(#clipPath-".concat(i, ")") : null
      };
      return /* @__PURE__ */ S.createElement(ue, m, l.map(function(v) {
        return /* @__PURE__ */ S.cloneElement(v, {
          key: "error-bar-".concat(i, "-").concat(v.props.dataKey),
          data: o,
          xAxis: u,
          yAxis: c,
          layout: s,
          offset: d,
          dataPointFormatter: h
        });
      }));
    }
  }, {
    key: "render",
    value: function() {
      var n = this.props, i = n.hide, a = n.data, o = n.className, u = n.xAxis, c = n.yAxis, s = n.left, f = n.top, l = n.width, d = n.height, h = n.isAnimationActive, m = n.background, v = n.id;
      if (i || !a || !a.length)
        return null;
      var p = this.state.isAnimationFinished, g = ae("recharts-bar", o), x = u && u.allowDataOverflow, w = c && c.allowDataOverflow, O = x || w, y = ie(v) ? this.id : v;
      return /* @__PURE__ */ S.createElement(ue, {
        className: g
      }, x || w ? /* @__PURE__ */ S.createElement("defs", null, /* @__PURE__ */ S.createElement("clipPath", {
        id: "clipPath-".concat(y)
      }, /* @__PURE__ */ S.createElement("rect", {
        x: x ? s : s - l / 2,
        y: w ? f : f - d / 2,
        width: x ? l : l * 2,
        height: w ? d : d * 2
      }))) : null, /* @__PURE__ */ S.createElement(ue, {
        className: "recharts-bar-rectangles",
        clipPath: O ? "url(#clipPath-".concat(y, ")") : null
      }, m ? this.renderBackground() : null, this.renderRectangles()), this.renderErrorBar(O, y), (!h || p) && gt.renderCallByParent(this.props, a));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function(n, i) {
      return n.animationId !== i.prevAnimationId ? {
        prevAnimationId: n.animationId,
        curData: n.data,
        prevData: i.curData
      } : n.data !== i.curData ? {
        curData: n.data
      } : null;
    }
  }]);
})(F.PureComponent);
sO = Sr;
Wt(Sr, "displayName", "Bar");
Wt(Sr, "defaultProps", {
  xAxisId: 0,
  yAxisId: 0,
  legendType: "rect",
  minPointSize: 0,
  hide: !1,
  data: [],
  layout: "vertical",
  activeBar: !1,
  isAnimationActive: !Vt.isSsr,
  animationBegin: 0,
  animationDuration: 400,
  animationEasing: "ease"
});
Wt(Sr, "getComposedData", function(e) {
  var t = e.props, r = e.item, n = e.barPosition, i = e.bandSize, a = e.xAxis, o = e.yAxis, u = e.xAxisTicks, c = e.yAxisTicks, s = e.stackedData, f = e.dataStartIndex, l = e.displayedData, d = e.offset, h = eC(n, r);
  if (!h)
    return null;
  var m = t.layout, v = r.type.defaultProps, p = v !== void 0 ? Ee(Ee({}, v), r.props) : r.props, g = p.dataKey, x = p.children, w = p.minPointSize, O = m === "horizontal" ? o : a, y = s ? O.scale.domain() : null, b = uC({
    numericAxis: O
  }), _ = Qe(x, so), A = l.map(function(E, C) {
    var P, T, $, R, I, k;
    s ? P = tC(s[f + C], y) : (P = Pe(E, g), Array.isArray(P) || (P = [b, P]));
    var q = wD(w, sO.defaultProps.minPointSize)(P[1], C);
    if (m === "horizontal") {
      var W, K = [o.scale(P[0]), o.scale(P[1])], M = K[0], N = K[1];
      T = sg({
        axis: a,
        ticks: u,
        bandSize: i,
        offset: h.offset,
        entry: E,
        index: C
      }), $ = (W = N ?? M) !== null && W !== void 0 ? W : void 0, R = h.size;
      var L = M - N;
      if (I = Number.isNaN(L) ? 0 : L, k = {
        x: T,
        y: o.y,
        width: R,
        height: o.height
      }, Math.abs(q) > 0 && Math.abs(I) < Math.abs(q)) {
        var H = Fe(I || q) * (Math.abs(q) - Math.abs(I));
        $ -= H, I += H;
      }
    } else {
      var V = [a.scale(P[0]), a.scale(P[1])], J = V[0], Q = V[1];
      if (T = J, $ = sg({
        axis: o,
        ticks: c,
        bandSize: i,
        offset: h.offset,
        entry: E,
        index: C
      }), R = Q - J, I = h.size, k = {
        x: a.x,
        y: $,
        width: a.width,
        height: I
      }, Math.abs(q) > 0 && Math.abs(R) < Math.abs(q)) {
        var ne = Fe(R || q) * (Math.abs(q) - Math.abs(R));
        R += ne;
      }
    }
    return Ee(Ee(Ee({}, E), {}, {
      x: T,
      y: $,
      width: R,
      height: I,
      value: s ? P : P[1],
      payload: E,
      background: k
    }, _ && _[C] && _[C].props), {}, {
      tooltipPayload: [kw(r, E)],
      tooltipPosition: {
        x: T + R / 2,
        y: $ + I / 2
      }
    });
  });
  return Ee({
    data: A,
    layout: m
  }, d);
});
function yi(e) {
  "@babel/helpers - typeof";
  return yi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, yi(e);
}
function MD(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function Hb(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, dO(n.key), n);
  }
}
function ID(e, t, r) {
  return t && Hb(e.prototype, t), r && Hb(e, r), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function Gb(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function ct(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Gb(Object(r), !0).forEach(function(n) {
      Eo(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Gb(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function Eo(e, t, r) {
  return t = dO(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function dO(e) {
  var t = RD(e, "string");
  return yi(t) == "symbol" ? t : t + "";
}
function RD(e, t) {
  if (yi(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (yi(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var ap = function(t, r, n, i, a) {
  var o = t.width, u = t.height, c = t.layout, s = t.children, f = Object.keys(r), l = {
    left: n.left,
    leftMirror: n.left,
    right: o - n.right,
    rightMirror: o - n.right,
    top: n.top,
    topMirror: n.top,
    bottom: u - n.bottom,
    bottomMirror: u - n.bottom
  }, d = !!Ye(s, Sr);
  return f.reduce(function(h, m) {
    var v = r[m], p = v.orientation, g = v.domain, x = v.padding, w = x === void 0 ? {} : x, O = v.mirror, y = v.reversed, b = "".concat(p).concat(O ? "Mirror" : ""), _, A, E, C, P;
    if (v.type === "number" && (v.padding === "gap" || v.padding === "no-gap")) {
      var T = g[1] - g[0], $ = 1 / 0, R = v.categoricalDomain.sort(z_);
      if (R.forEach(function(V, J) {
        J > 0 && ($ = Math.min((V || 0) - (R[J - 1] || 0), $));
      }), Number.isFinite($)) {
        var I = $ / T, k = v.layout === "vertical" ? n.height : n.width;
        if (v.padding === "gap" && (_ = I * k / 2), v.padding === "no-gap") {
          var q = ze(t.barCategoryGap, I * k), W = I * k / 2;
          _ = W - q - (W - q) / k * q;
        }
      }
    }
    i === "xAxis" ? A = [n.left + (w.left || 0) + (_ || 0), n.left + n.width - (w.right || 0) - (_ || 0)] : i === "yAxis" ? A = c === "horizontal" ? [n.top + n.height - (w.bottom || 0), n.top + (w.top || 0)] : [n.top + (w.top || 0) + (_ || 0), n.top + n.height - (w.bottom || 0) - (_ || 0)] : A = v.range, y && (A = [A[1], A[0]]);
    var K = Cw(v, a, d), M = K.scale, N = K.realScaleType;
    M.domain(g).range(A), Mw(M);
    var L = Iw(M, ct(ct({}, v), {}, {
      realScaleType: N
    }));
    i === "xAxis" ? (P = p === "top" && !O || p === "bottom" && O, E = n.left, C = l[b] - P * v.height) : i === "yAxis" && (P = p === "left" && !O || p === "right" && O, E = l[b] - P * v.width, C = n.top);
    var H = ct(ct(ct({}, v), L), {}, {
      realScaleType: N,
      x: E,
      y: C,
      scale: M,
      width: i === "xAxis" ? n.width : v.width,
      height: i === "yAxis" ? n.height : v.height
    });
    return H.bandSize = Oa(H, L), !v.hide && i === "xAxis" ? l[b] += (P ? -1 : 1) * H.height : v.hide || (l[b] += (P ? -1 : 1) * H.width), ct(ct({}, h), {}, Eo({}, m, H));
  }, {});
}, pO = function(t, r) {
  var n = t.x, i = t.y, a = r.x, o = r.y;
  return {
    x: Math.min(n, a),
    y: Math.min(i, o),
    width: Math.abs(a - n),
    height: Math.abs(o - i)
  };
}, kD = function(t) {
  var r = t.x1, n = t.y1, i = t.x2, a = t.y2;
  return pO({
    x: r,
    y: n
  }, {
    x: i,
    y: a
  });
}, hO = /* @__PURE__ */ (function() {
  function e(t) {
    MD(this, e), this.scale = t;
  }
  return ID(e, [{
    key: "domain",
    get: function() {
      return this.scale.domain;
    }
  }, {
    key: "range",
    get: function() {
      return this.scale.range;
    }
  }, {
    key: "rangeMin",
    get: function() {
      return this.range()[0];
    }
  }, {
    key: "rangeMax",
    get: function() {
      return this.range()[1];
    }
  }, {
    key: "bandwidth",
    get: function() {
      return this.scale.bandwidth;
    }
  }, {
    key: "apply",
    value: function(r) {
      var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, i = n.bandAware, a = n.position;
      if (r !== void 0) {
        if (a)
          switch (a) {
            case "start":
              return this.scale(r);
            case "middle": {
              var o = this.bandwidth ? this.bandwidth() / 2 : 0;
              return this.scale(r) + o;
            }
            case "end": {
              var u = this.bandwidth ? this.bandwidth() : 0;
              return this.scale(r) + u;
            }
            default:
              return this.scale(r);
          }
        if (i) {
          var c = this.bandwidth ? this.bandwidth() / 2 : 0;
          return this.scale(r) + c;
        }
        return this.scale(r);
      }
    }
  }, {
    key: "isInRange",
    value: function(r) {
      var n = this.range(), i = n[0], a = n[n.length - 1];
      return i <= a ? r >= i && r <= a : r >= a && r <= i;
    }
  }], [{
    key: "create",
    value: function(r) {
      return new e(r);
    }
  }]);
})();
Eo(hO, "EPS", 1e-4);
var op = function(t) {
  var r = Object.keys(t).reduce(function(n, i) {
    return ct(ct({}, n), {}, Eo({}, i, hO.create(t[i])));
  }, {});
  return ct(ct({}, r), {}, {
    apply: function(i) {
      var a = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, o = a.bandAware, u = a.position;
      return sD(i, function(c, s) {
        return r[s].apply(c, {
          bandAware: o,
          position: u
        });
      });
    },
    isInRange: function(i) {
      return cO(i, function(a, o) {
        return r[o].isInRange(a);
      });
    }
  });
};
function DD(e) {
  return (e % 180 + 180) % 180;
}
var ND = function(t) {
  var r = t.width, n = t.height, i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, a = DD(i), o = a * Math.PI / 180, u = Math.atan(n / r), c = o > u && o < Math.PI - u ? n / Math.sin(o) : r / Math.cos(o);
  return Math.abs(c);
}, Ml, Vb;
function qD() {
  if (Vb) return Ml;
  Vb = 1;
  var e = Ot(), t = wi(), r = oo();
  function n(i) {
    return function(a, o, u) {
      var c = Object(a);
      if (!t(a)) {
        var s = e(o, 3);
        a = r(a), o = function(l) {
          return s(c[l], l, c);
        };
      }
      var f = i(a, o, u);
      return f > -1 ? c[s ? a[f] : f] : void 0;
    };
  }
  return Ml = n, Ml;
}
var Il, Yb;
function LD() {
  if (Yb) return Il;
  Yb = 1;
  var e = iO();
  function t(r) {
    var n = e(r), i = n % 1;
    return n === n ? i ? n - i : n : 0;
  }
  return Il = t, Il;
}
var Rl, Xb;
function BD() {
  if (Xb) return Rl;
  Xb = 1;
  var e = dx(), t = Ot(), r = LD(), n = Math.max;
  function i(a, o, u) {
    var c = a == null ? 0 : a.length;
    if (!c)
      return -1;
    var s = u == null ? 0 : r(u);
    return s < 0 && (s = n(c + s, 0)), e(a, t(o, 3), s);
  }
  return Rl = i, Rl;
}
var kl, Zb;
function FD() {
  if (Zb) return kl;
  Zb = 1;
  var e = qD(), t = BD(), r = e(t);
  return kl = r, kl;
}
var zD = FD();
const WD = /* @__PURE__ */ ye(zD);
var UD = E0();
const KD = /* @__PURE__ */ ye(UD);
var HD = KD(function(e) {
  return {
    x: e.left,
    y: e.top,
    width: e.width,
    height: e.height
  };
}, function(e) {
  return ["l", e.left, "t", e.top, "w", e.width, "h", e.height].join("");
});
function Ba(e) {
  "@babel/helpers - typeof";
  return Ba = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Ba(e);
}
var up = /* @__PURE__ */ F.createContext(void 0), cp = /* @__PURE__ */ F.createContext(void 0), vO = /* @__PURE__ */ F.createContext(void 0), yO = /* @__PURE__ */ F.createContext({}), mO = /* @__PURE__ */ F.createContext(void 0), gO = /* @__PURE__ */ F.createContext(0), bO = /* @__PURE__ */ F.createContext(0), Jb = function(t) {
  var r = t.state, n = r.xAxisMap, i = r.yAxisMap, a = r.offset, o = t.clipPathId, u = t.children, c = t.width, s = t.height, f = HD(a);
  return /* @__PURE__ */ S.createElement(up.Provider, {
    value: n
  }, /* @__PURE__ */ S.createElement(cp.Provider, {
    value: i
  }, /* @__PURE__ */ S.createElement(yO.Provider, {
    value: a
  }, /* @__PURE__ */ S.createElement(vO.Provider, {
    value: f
  }, /* @__PURE__ */ S.createElement(mO.Provider, {
    value: o
  }, /* @__PURE__ */ S.createElement(gO.Provider, {
    value: s
  }, /* @__PURE__ */ S.createElement(bO.Provider, {
    value: c
  }, u)))))));
}, GD = function() {
  return F.useContext(mO);
};
function xO(e) {
  var t = Object.keys(e);
  return t.length === 0 ? "There are no available ids." : "Available ids are: ".concat(t, ".");
}
var wO = function(t) {
  var r = F.useContext(up);
  r == null && (process.env.NODE_ENV !== "production" ? Ke(!1, "Could not find Recharts context; are you sure this is rendered inside a Recharts wrapper component?") : Ke());
  var n = r[t];
  return n == null && (process.env.NODE_ENV !== "production" ? Ke(!1, 'Could not find xAxis by id "'.concat(t, '" [').concat(Ba(t), "]. ").concat(xO(r))) : Ke()), n;
}, VD = function() {
  var t = F.useContext(up);
  return Ft(t);
}, YD = function() {
  var t = F.useContext(cp), r = WD(t, function(n) {
    return cO(n.domain, Number.isFinite);
  });
  return r || Ft(t);
}, OO = function(t) {
  var r = F.useContext(cp);
  r == null && (process.env.NODE_ENV !== "production" ? Ke(!1, "Could not find Recharts context; are you sure this is rendered inside a Recharts wrapper component?") : Ke());
  var n = r[t];
  return n == null && (process.env.NODE_ENV !== "production" ? Ke(!1, 'Could not find yAxis by id "'.concat(t, '" [').concat(Ba(t), "]. ").concat(xO(r))) : Ke()), n;
}, XD = function() {
  var t = F.useContext(vO);
  return t;
}, ZD = function() {
  return F.useContext(yO);
}, sp = function() {
  return F.useContext(bO);
}, lp = function() {
  return F.useContext(gO);
};
function rn(e) {
  "@babel/helpers - typeof";
  return rn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, rn(e);
}
function JD(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function QD(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, AO(n.key), n);
  }
}
function eN(e, t, r) {
  return t && QD(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function tN(e, t, r) {
  return t = Fa(t), rN(e, _O() ? Reflect.construct(t, r || [], Fa(e).constructor) : t.apply(e, r));
}
function rN(e, t) {
  if (t && (rn(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return nN(e);
}
function nN(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function _O() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (_O = function() {
    return !!e;
  })();
}
function Fa(e) {
  return Fa = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, Fa(e);
}
function iN(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Kf(e, t);
}
function Kf(e, t) {
  return Kf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n;
  }, Kf(e, t);
}
function Qb(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function e0(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Qb(Object(r), !0).forEach(function(n) {
      fp(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Qb(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function fp(e, t, r) {
  return t = AO(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function AO(e) {
  var t = aN(e, "string");
  return rn(t) == "symbol" ? t : t + "";
}
function aN(e, t) {
  if (rn(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (rn(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
function oN(e, t) {
  return lN(e) || sN(e, t) || cN(e, t) || uN();
}
function uN() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function cN(e, t) {
  if (e) {
    if (typeof e == "string") return t0(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return t0(e, t);
  }
}
function t0(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function sN(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, i, a, o, u = [], c = !0, s = !1;
    try {
      if (a = (r = r.call(e)).next, t !== 0) for (; !(c = (n = a.call(r)).done) && (u.push(n.value), u.length !== t); c = !0) ;
    } catch (f) {
      s = !0, i = f;
    } finally {
      try {
        if (!c && r.return != null && (o = r.return(), Object(o) !== o)) return;
      } finally {
        if (s) throw i;
      }
    }
    return u;
  }
}
function lN(e) {
  if (Array.isArray(e)) return e;
}
function Hf() {
  return Hf = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Hf.apply(this, arguments);
}
var fN = function(t, r) {
  var n;
  return /* @__PURE__ */ S.isValidElement(t) ? n = /* @__PURE__ */ S.cloneElement(t, r) : te(t) ? n = t(r) : n = /* @__PURE__ */ S.createElement("line", Hf({}, r, {
    className: "recharts-reference-line-line"
  })), n;
}, dN = function(t, r, n, i, a, o, u, c, s) {
  var f = a.x, l = a.y, d = a.width, h = a.height;
  if (n) {
    var m = s.y, v = t.y.apply(m, {
      position: o
    });
    if (bt(s, "discard") && !t.y.isInRange(v))
      return null;
    var p = [{
      x: f + d,
      y: v
    }, {
      x: f,
      y: v
    }];
    return c === "left" ? p.reverse() : p;
  }
  if (r) {
    var g = s.x, x = t.x.apply(g, {
      position: o
    });
    if (bt(s, "discard") && !t.x.isInRange(x))
      return null;
    var w = [{
      x,
      y: l + h
    }, {
      x,
      y: l
    }];
    return u === "top" ? w.reverse() : w;
  }
  if (i) {
    var O = s.segment, y = O.map(function(b) {
      return t.apply(b, {
        position: o
      });
    });
    return bt(s, "discard") && aD(y, function(b) {
      return !t.isInRange(b);
    }) ? null : y;
  }
  return null;
};
function pN(e) {
  var t = e.x, r = e.y, n = e.segment, i = e.xAxisId, a = e.yAxisId, o = e.shape, u = e.className, c = e.alwaysShow, s = GD(), f = wO(i), l = OO(a), d = XD();
  if (!s || !d)
    return null;
  ft(c === void 0, 'The alwaysShow prop is deprecated. Please use ifOverflow="extendDomain" instead.');
  var h = op({
    x: f.scale,
    y: l.scale
  }), m = Me(t), v = Me(r), p = n && n.length === 2, g = dN(h, m, v, p, d, e.position, f.orientation, l.orientation, e);
  if (!g)
    return null;
  var x = oN(g, 2), w = x[0], O = w.x, y = w.y, b = x[1], _ = b.x, A = b.y, E = bt(e, "hidden") ? "url(#".concat(s, ")") : void 0, C = e0(e0({
    clipPath: E
  }, X(e, !0)), {}, {
    x1: O,
    y1: y,
    x2: _,
    y2: A
  });
  return /* @__PURE__ */ S.createElement(ue, {
    className: ae("recharts-reference-line", u)
  }, fN(o, C), ke.renderCallByParent(e, kD({
    x1: O,
    y1: y,
    x2: _,
    y2: A
  })));
}
var dp = /* @__PURE__ */ (function(e) {
  function t() {
    return JD(this, t), tN(this, t, arguments);
  }
  return iN(t, e), eN(t, [{
    key: "render",
    value: function() {
      return /* @__PURE__ */ S.createElement(pN, this.props);
    }
  }]);
})(S.Component);
fp(dp, "displayName", "ReferenceLine");
fp(dp, "defaultProps", {
  isFront: !1,
  ifOverflow: "discard",
  xAxisId: 0,
  yAxisId: 0,
  fill: "none",
  stroke: "#ccc",
  fillOpacity: 1,
  strokeWidth: 1,
  position: "middle"
});
function Gf() {
  return Gf = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Gf.apply(this, arguments);
}
function nn(e) {
  "@babel/helpers - typeof";
  return nn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, nn(e);
}
function r0(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function n0(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? r0(Object(r), !0).forEach(function(n) {
      To(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : r0(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function hN(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function vN(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, PO(n.key), n);
  }
}
function yN(e, t, r) {
  return t && vN(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function mN(e, t, r) {
  return t = za(t), gN(e, SO() ? Reflect.construct(t, r || [], za(e).constructor) : t.apply(e, r));
}
function gN(e, t) {
  if (t && (nn(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return bN(e);
}
function bN(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function SO() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (SO = function() {
    return !!e;
  })();
}
function za(e) {
  return za = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, za(e);
}
function xN(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Vf(e, t);
}
function Vf(e, t) {
  return Vf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n;
  }, Vf(e, t);
}
function To(e, t, r) {
  return t = PO(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function PO(e) {
  var t = wN(e, "string");
  return nn(t) == "symbol" ? t : t + "";
}
function wN(e, t) {
  if (nn(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (nn(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var ON = function(t) {
  var r = t.x, n = t.y, i = t.xAxis, a = t.yAxis, o = op({
    x: i.scale,
    y: a.scale
  }), u = o.apply({
    x: r,
    y: n
  }, {
    bandAware: !0
  });
  return bt(t, "discard") && !o.isInRange(u) ? null : u;
}, jo = /* @__PURE__ */ (function(e) {
  function t() {
    return hN(this, t), mN(this, t, arguments);
  }
  return xN(t, e), yN(t, [{
    key: "render",
    value: function() {
      var n = this.props, i = n.x, a = n.y, o = n.r, u = n.alwaysShow, c = n.clipPathId, s = Me(i), f = Me(a);
      if (ft(u === void 0, 'The alwaysShow prop is deprecated. Please use ifOverflow="extendDomain" instead.'), !s || !f)
        return null;
      var l = ON(this.props);
      if (!l)
        return null;
      var d = l.x, h = l.y, m = this.props, v = m.shape, p = m.className, g = bt(this.props, "hidden") ? "url(#".concat(c, ")") : void 0, x = n0(n0({
        clipPath: g
      }, X(this.props, !0)), {}, {
        cx: d,
        cy: h
      });
      return /* @__PURE__ */ S.createElement(ue, {
        className: ae("recharts-reference-dot", p)
      }, t.renderDot(v, x), ke.renderCallByParent(this.props, {
        x: d - o,
        y: h - o,
        width: 2 * o,
        height: 2 * o
      }));
    }
  }]);
})(S.Component);
To(jo, "displayName", "ReferenceDot");
To(jo, "defaultProps", {
  isFront: !1,
  ifOverflow: "discard",
  xAxisId: 0,
  yAxisId: 0,
  r: 10,
  fill: "#fff",
  stroke: "#ccc",
  fillOpacity: 1,
  strokeWidth: 1
});
To(jo, "renderDot", function(e, t) {
  var r;
  return /* @__PURE__ */ S.isValidElement(e) ? r = /* @__PURE__ */ S.cloneElement(e, t) : te(e) ? r = e(t) : r = /* @__PURE__ */ S.createElement(Ei, Gf({}, t, {
    cx: t.cx,
    cy: t.cy,
    className: "recharts-reference-dot-dot"
  })), r;
});
function Yf() {
  return Yf = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Yf.apply(this, arguments);
}
function an(e) {
  "@babel/helpers - typeof";
  return an = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, an(e);
}
function i0(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function a0(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? i0(Object(r), !0).forEach(function(n) {
      $o(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : i0(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function _N(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function AN(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, TO(n.key), n);
  }
}
function SN(e, t, r) {
  return t && AN(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function PN(e, t, r) {
  return t = Wa(t), EN(e, EO() ? Reflect.construct(t, r || [], Wa(e).constructor) : t.apply(e, r));
}
function EN(e, t) {
  if (t && (an(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return TN(e);
}
function TN(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function EO() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (EO = function() {
    return !!e;
  })();
}
function Wa(e) {
  return Wa = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, Wa(e);
}
function jN(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Xf(e, t);
}
function Xf(e, t) {
  return Xf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n;
  }, Xf(e, t);
}
function $o(e, t, r) {
  return t = TO(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function TO(e) {
  var t = $N(e, "string");
  return an(t) == "symbol" ? t : t + "";
}
function $N(e, t) {
  if (an(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (an(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var CN = function(t, r, n, i, a) {
  var o = a.x1, u = a.x2, c = a.y1, s = a.y2, f = a.xAxis, l = a.yAxis;
  if (!f || !l) return null;
  var d = op({
    x: f.scale,
    y: l.scale
  }), h = {
    x: t ? d.x.apply(o, {
      position: "start"
    }) : d.x.rangeMin,
    y: n ? d.y.apply(c, {
      position: "start"
    }) : d.y.rangeMin
  }, m = {
    x: r ? d.x.apply(u, {
      position: "end"
    }) : d.x.rangeMax,
    y: i ? d.y.apply(s, {
      position: "end"
    }) : d.y.rangeMax
  };
  return bt(a, "discard") && (!d.isInRange(h) || !d.isInRange(m)) ? null : pO(h, m);
}, Co = /* @__PURE__ */ (function(e) {
  function t() {
    return _N(this, t), PN(this, t, arguments);
  }
  return jN(t, e), SN(t, [{
    key: "render",
    value: function() {
      var n = this.props, i = n.x1, a = n.x2, o = n.y1, u = n.y2, c = n.className, s = n.alwaysShow, f = n.clipPathId;
      ft(s === void 0, 'The alwaysShow prop is deprecated. Please use ifOverflow="extendDomain" instead.');
      var l = Me(i), d = Me(a), h = Me(o), m = Me(u), v = this.props.shape;
      if (!l && !d && !h && !m && !v)
        return null;
      var p = CN(l, d, h, m, this.props);
      if (!p && !v)
        return null;
      var g = bt(this.props, "hidden") ? "url(#".concat(f, ")") : void 0;
      return /* @__PURE__ */ S.createElement(ue, {
        className: ae("recharts-reference-area", c)
      }, t.renderRect(v, a0(a0({
        clipPath: g
      }, X(this.props, !0)), p)), ke.renderCallByParent(this.props, p));
    }
  }]);
})(S.Component);
$o(Co, "displayName", "ReferenceArea");
$o(Co, "defaultProps", {
  isFront: !1,
  ifOverflow: "discard",
  xAxisId: 0,
  yAxisId: 0,
  r: 10,
  fill: "#ccc",
  fillOpacity: 0.5,
  stroke: "none",
  strokeWidth: 1
});
$o(Co, "renderRect", function(e, t) {
  var r;
  return /* @__PURE__ */ S.isValidElement(e) ? r = /* @__PURE__ */ S.cloneElement(e, t) : te(e) ? r = e(t) : r = /* @__PURE__ */ S.createElement(ip, Yf({}, t, {
    className: "recharts-reference-area-rect"
  })), r;
});
function jO(e, t, r) {
  if (t < 1)
    return [];
  if (t === 1 && r === void 0)
    return e;
  for (var n = [], i = 0; i < e.length; i += t)
    n.push(e[i]);
  return n;
}
function MN(e, t, r) {
  var n = {
    width: e.width + t.width,
    height: e.height + t.height
  };
  return ND(n, r);
}
function IN(e, t, r) {
  var n = r === "width", i = e.x, a = e.y, o = e.width, u = e.height;
  return t === 1 ? {
    start: n ? i : a,
    end: n ? i + o : a + u
  } : {
    start: n ? i + o : a + u,
    end: n ? i : a
  };
}
function Ua(e, t, r, n, i) {
  if (e * t < e * n || e * t > e * i)
    return !1;
  var a = r();
  return e * (t - e * a / 2 - n) >= 0 && e * (t + e * a / 2 - i) <= 0;
}
function RN(e, t) {
  return jO(e, t + 1);
}
function kN(e, t, r, n, i) {
  for (var a = (n || []).slice(), o = t.start, u = t.end, c = 0, s = 1, f = o, l = function() {
    var m = n == null ? void 0 : n[c];
    if (m === void 0)
      return {
        v: jO(n, s)
      };
    var v = c, p, g = function() {
      return p === void 0 && (p = r(m, v)), p;
    }, x = m.coordinate, w = c === 0 || Ua(e, x, g, f, u);
    w || (c = 0, f = o, s += 1), w && (f = x + e * (g() / 2 + i), c += s);
  }, d; s <= a.length; )
    if (d = l(), d) return d.v;
  return [];
}
function mi(e) {
  "@babel/helpers - typeof";
  return mi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, mi(e);
}
function o0(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Le(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? o0(Object(r), !0).forEach(function(n) {
      DN(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : o0(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function DN(e, t, r) {
  return t = NN(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function NN(e) {
  var t = qN(e, "string");
  return mi(t) == "symbol" ? t : t + "";
}
function qN(e, t) {
  if (mi(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (mi(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function LN(e, t, r, n, i) {
  for (var a = (n || []).slice(), o = a.length, u = t.start, c = t.end, s = function(d) {
    var h = a[d], m, v = function() {
      return m === void 0 && (m = r(h, d)), m;
    };
    if (d === o - 1) {
      var p = e * (h.coordinate + e * v() / 2 - c);
      a[d] = h = Le(Le({}, h), {}, {
        tickCoord: p > 0 ? h.coordinate - p * e : h.coordinate
      });
    } else
      a[d] = h = Le(Le({}, h), {}, {
        tickCoord: h.coordinate
      });
    var g = Ua(e, h.tickCoord, v, u, c);
    g && (c = h.tickCoord - e * (v() / 2 + i), a[d] = Le(Le({}, h), {}, {
      isShow: !0
    }));
  }, f = o - 1; f >= 0; f--)
    s(f);
  return a;
}
function BN(e, t, r, n, i, a) {
  var o = (n || []).slice(), u = o.length, c = t.start, s = t.end;
  if (a) {
    var f = n[u - 1], l = r(f, u - 1), d = e * (f.coordinate + e * l / 2 - s);
    o[u - 1] = f = Le(Le({}, f), {}, {
      tickCoord: d > 0 ? f.coordinate - d * e : f.coordinate
    });
    var h = Ua(e, f.tickCoord, function() {
      return l;
    }, c, s);
    h && (s = f.tickCoord - e * (l / 2 + i), o[u - 1] = Le(Le({}, f), {}, {
      isShow: !0
    }));
  }
  for (var m = a ? u - 1 : u, v = function(x) {
    var w = o[x], O, y = function() {
      return O === void 0 && (O = r(w, x)), O;
    };
    if (x === 0) {
      var b = e * (w.coordinate - e * y() / 2 - c);
      o[x] = w = Le(Le({}, w), {}, {
        tickCoord: b < 0 ? w.coordinate - b * e : w.coordinate
      });
    } else
      o[x] = w = Le(Le({}, w), {}, {
        tickCoord: w.coordinate
      });
    var _ = Ua(e, w.tickCoord, y, c, s);
    _ && (c = w.tickCoord + e * (y() / 2 + i), o[x] = Le(Le({}, w), {}, {
      isShow: !0
    }));
  }, p = 0; p < m; p++)
    v(p);
  return o;
}
function pp(e, t, r) {
  var n = e.tick, i = e.ticks, a = e.viewBox, o = e.minTickGap, u = e.orientation, c = e.interval, s = e.tickFormatter, f = e.unit, l = e.angle;
  if (!i || !i.length || !n)
    return [];
  if (z(c) || Vt.isSsr)
    return RN(i, typeof c == "number" && z(c) ? c : 0);
  var d = [], h = u === "top" || u === "bottom" ? "width" : "height", m = f && h === "width" ? In(f, {
    fontSize: t,
    letterSpacing: r
  }) : {
    width: 0,
    height: 0
  }, v = function(w, O) {
    var y = te(s) ? s(w.value, O) : w.value;
    return h === "width" ? MN(In(y, {
      fontSize: t,
      letterSpacing: r
    }), m, l) : In(y, {
      fontSize: t,
      letterSpacing: r
    })[h];
  }, p = i.length >= 2 ? Fe(i[1].coordinate - i[0].coordinate) : 1, g = IN(a, p, h);
  return c === "equidistantPreserveStart" ? kN(p, g, v, i, o) : (c === "preserveStart" || c === "preserveStartEnd" ? d = BN(p, g, v, i, o, c === "preserveStartEnd") : d = LN(p, g, v, i, o), d.filter(function(x) {
    return x.isShow;
  }));
}
var FN = ["viewBox"], zN = ["viewBox"], WN = ["ticks"];
function on(e) {
  "@babel/helpers - typeof";
  return on = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, on(e);
}
function Rr() {
  return Rr = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Rr.apply(this, arguments);
}
function u0(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function je(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? u0(Object(r), !0).forEach(function(n) {
      hp(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : u0(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function Dl(e, t) {
  if (e == null) return {};
  var r = UN(e, t), n, i;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (i = 0; i < a.length; i++)
      n = a[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function UN(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
function KN(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function c0(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, CO(n.key), n);
  }
}
function HN(e, t, r) {
  return t && c0(e.prototype, t), r && c0(e, r), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function GN(e, t, r) {
  return t = Ka(t), VN(e, $O() ? Reflect.construct(t, r || [], Ka(e).constructor) : t.apply(e, r));
}
function VN(e, t) {
  if (t && (on(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return YN(e);
}
function YN(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function $O() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return ($O = function() {
    return !!e;
  })();
}
function Ka(e) {
  return Ka = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, Ka(e);
}
function XN(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Zf(e, t);
}
function Zf(e, t) {
  return Zf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n;
  }, Zf(e, t);
}
function hp(e, t, r) {
  return t = CO(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function CO(e) {
  var t = ZN(e, "string");
  return on(t) == "symbol" ? t : t + "";
}
function ZN(e, t) {
  if (on(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (on(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var xn = /* @__PURE__ */ (function(e) {
  function t(r) {
    var n;
    return KN(this, t), n = GN(this, t, [r]), n.state = {
      fontSize: "",
      letterSpacing: ""
    }, n;
  }
  return XN(t, e), HN(t, [{
    key: "shouldComponentUpdate",
    value: function(n, i) {
      var a = n.viewBox, o = Dl(n, FN), u = this.props, c = u.viewBox, s = Dl(u, zN);
      return !Dr(a, c) || !Dr(o, s) || !Dr(i, this.state);
    }
  }, {
    key: "componentDidMount",
    value: function() {
      var n = this.layerReference;
      if (n) {
        var i = n.getElementsByClassName("recharts-cartesian-axis-tick-value")[0];
        i && this.setState({
          fontSize: window.getComputedStyle(i).fontSize,
          letterSpacing: window.getComputedStyle(i).letterSpacing
        });
      }
    }
    /**
     * Calculate the coordinates of endpoints in ticks
     * @param  {Object} data The data of a simple tick
     * @return {Object} (x1, y1): The coordinate of endpoint close to tick text
     *  (x2, y2): The coordinate of endpoint close to axis
     */
  }, {
    key: "getTickLineCoord",
    value: function(n) {
      var i = this.props, a = i.x, o = i.y, u = i.width, c = i.height, s = i.orientation, f = i.tickSize, l = i.mirror, d = i.tickMargin, h, m, v, p, g, x, w = l ? -1 : 1, O = n.tickSize || f, y = z(n.tickCoord) ? n.tickCoord : n.coordinate;
      switch (s) {
        case "top":
          h = m = n.coordinate, p = o + +!l * c, v = p - w * O, x = v - w * d, g = y;
          break;
        case "left":
          v = p = n.coordinate, m = a + +!l * u, h = m - w * O, g = h - w * d, x = y;
          break;
        case "right":
          v = p = n.coordinate, m = a + +l * u, h = m + w * O, g = h + w * d, x = y;
          break;
        default:
          h = m = n.coordinate, p = o + +l * c, v = p + w * O, x = v + w * d, g = y;
          break;
      }
      return {
        line: {
          x1: h,
          y1: v,
          x2: m,
          y2: p
        },
        tick: {
          x: g,
          y: x
        }
      };
    }
  }, {
    key: "getTickTextAnchor",
    value: function() {
      var n = this.props, i = n.orientation, a = n.mirror, o;
      switch (i) {
        case "left":
          o = a ? "start" : "end";
          break;
        case "right":
          o = a ? "end" : "start";
          break;
        default:
          o = "middle";
          break;
      }
      return o;
    }
  }, {
    key: "getTickVerticalAnchor",
    value: function() {
      var n = this.props, i = n.orientation, a = n.mirror, o = "end";
      switch (i) {
        case "left":
        case "right":
          o = "middle";
          break;
        case "top":
          o = a ? "start" : "end";
          break;
        default:
          o = a ? "end" : "start";
          break;
      }
      return o;
    }
  }, {
    key: "renderAxisLine",
    value: function() {
      var n = this.props, i = n.x, a = n.y, o = n.width, u = n.height, c = n.orientation, s = n.mirror, f = n.axisLine, l = je(je(je({}, X(this.props, !1)), X(f, !1)), {}, {
        fill: "none"
      });
      if (c === "top" || c === "bottom") {
        var d = +(c === "top" && !s || c === "bottom" && s);
        l = je(je({}, l), {}, {
          x1: i,
          y1: a + d * u,
          x2: i + o,
          y2: a + d * u
        });
      } else {
        var h = +(c === "left" && !s || c === "right" && s);
        l = je(je({}, l), {}, {
          x1: i + h * o,
          y1: a,
          x2: i + h * o,
          y2: a + u
        });
      }
      return /* @__PURE__ */ S.createElement("line", Rr({}, l, {
        className: ae("recharts-cartesian-axis-line", Je(f, "className"))
      }));
    }
  }, {
    key: "renderTicks",
    value: (
      /**
       * render the ticks
       * @param {Array} ticks The ticks to actually render (overrides what was passed in props)
       * @param {string} fontSize Fontsize to consider for tick spacing
       * @param {string} letterSpacing Letterspacing to consider for tick spacing
       * @return {ReactComponent} renderedTicks
       */
      function(n, i, a) {
        var o = this, u = this.props, c = u.tickLine, s = u.stroke, f = u.tick, l = u.tickFormatter, d = u.unit, h = pp(je(je({}, this.props), {}, {
          ticks: n
        }), i, a), m = this.getTickTextAnchor(), v = this.getTickVerticalAnchor(), p = X(this.props, !1), g = X(f, !1), x = je(je({}, p), {}, {
          fill: "none"
        }, X(c, !1)), w = h.map(function(O, y) {
          var b = o.getTickLineCoord(O), _ = b.line, A = b.tick, E = je(je(je(je({
            textAnchor: m,
            verticalAnchor: v
          }, p), {}, {
            stroke: "none",
            fill: s
          }, g), A), {}, {
            index: y,
            payload: O,
            visibleTicksCount: h.length,
            tickFormatter: l
          });
          return /* @__PURE__ */ S.createElement(ue, Rr({
            className: "recharts-cartesian-axis-tick",
            key: "tick-".concat(O.value, "-").concat(O.coordinate, "-").concat(O.tickCoord)
          }, vr(o.props, O, y)), c && /* @__PURE__ */ S.createElement("line", Rr({}, x, _, {
            className: ae("recharts-cartesian-axis-tick-line", Je(c, "className"))
          })), f && t.renderTickItem(f, E, "".concat(te(l) ? l(O.value, y) : O.value).concat(d || "")));
        });
        return /* @__PURE__ */ S.createElement("g", {
          className: "recharts-cartesian-axis-ticks"
        }, w);
      }
    )
  }, {
    key: "render",
    value: function() {
      var n = this, i = this.props, a = i.axisLine, o = i.width, u = i.height, c = i.ticksGenerator, s = i.className, f = i.hide;
      if (f)
        return null;
      var l = this.props, d = l.ticks, h = Dl(l, WN), m = d;
      return te(c) && (m = d && d.length > 0 ? c(this.props) : c(h)), o <= 0 || u <= 0 || !m || !m.length ? null : /* @__PURE__ */ S.createElement(ue, {
        className: ae("recharts-cartesian-axis", s),
        ref: function(p) {
          n.layerReference = p;
        }
      }, a && this.renderAxisLine(), this.renderTicks(m, this.state.fontSize, this.state.letterSpacing), ke.renderCallByParent(this.props));
    }
  }], [{
    key: "renderTickItem",
    value: function(n, i, a) {
      var o, u = ae(i.className, "recharts-cartesian-axis-tick-value");
      return /* @__PURE__ */ S.isValidElement(n) ? o = /* @__PURE__ */ S.cloneElement(n, je(je({}, i), {}, {
        className: u
      })) : te(n) ? o = n(je(je({}, i), {}, {
        className: u
      })) : o = /* @__PURE__ */ S.createElement(yr, Rr({}, i, {
        className: "recharts-cartesian-axis-tick-value"
      }), a), o;
    }
  }]);
})(F.Component);
hp(xn, "displayName", "CartesianAxis");
hp(xn, "defaultProps", {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  viewBox: {
    x: 0,
    y: 0,
    width: 0,
    height: 0
  },
  // The orientation of axis
  orientation: "bottom",
  // The ticks
  ticks: [],
  stroke: "#666",
  tickLine: !0,
  axisLine: !0,
  tick: !0,
  mirror: !1,
  minTickGap: 5,
  // The width or height of tick
  tickSize: 6,
  tickMargin: 2,
  interval: "preserveEnd"
});
var JN = ["x1", "y1", "x2", "y2", "key"], QN = ["offset"];
function br(e) {
  "@babel/helpers - typeof";
  return br = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, br(e);
}
function s0(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Be(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? s0(Object(r), !0).forEach(function(n) {
      e2(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : s0(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function e2(e, t, r) {
  return t = t2(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function t2(e) {
  var t = r2(e, "string");
  return br(t) == "symbol" ? t : t + "";
}
function r2(e, t) {
  if (br(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (br(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function sr() {
  return sr = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, sr.apply(this, arguments);
}
function l0(e, t) {
  if (e == null) return {};
  var r = n2(e, t), n, i;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (i = 0; i < a.length; i++)
      n = a[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function n2(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
var i2 = function(t) {
  var r = t.fill;
  if (!r || r === "none")
    return null;
  var n = t.fillOpacity, i = t.x, a = t.y, o = t.width, u = t.height, c = t.ry;
  return /* @__PURE__ */ S.createElement("rect", {
    x: i,
    y: a,
    ry: c,
    width: o,
    height: u,
    stroke: "none",
    fill: r,
    fillOpacity: n,
    className: "recharts-cartesian-grid-bg"
  });
};
function MO(e, t) {
  var r;
  if (/* @__PURE__ */ S.isValidElement(e))
    r = /* @__PURE__ */ S.cloneElement(e, t);
  else if (te(e))
    r = e(t);
  else {
    var n = t.x1, i = t.y1, a = t.x2, o = t.y2, u = t.key, c = l0(t, JN), s = X(c, !1);
    s.offset;
    var f = l0(s, QN);
    r = /* @__PURE__ */ S.createElement("line", sr({}, f, {
      x1: n,
      y1: i,
      x2: a,
      y2: o,
      fill: "none",
      key: u
    }));
  }
  return r;
}
function a2(e) {
  var t = e.x, r = e.width, n = e.horizontal, i = n === void 0 ? !0 : n, a = e.horizontalPoints;
  if (!i || !a || !a.length)
    return null;
  var o = a.map(function(u, c) {
    var s = Be(Be({}, e), {}, {
      x1: t,
      y1: u,
      x2: t + r,
      y2: u,
      key: "line-".concat(c),
      index: c
    });
    return MO(i, s);
  });
  return /* @__PURE__ */ S.createElement("g", {
    className: "recharts-cartesian-grid-horizontal"
  }, o);
}
function o2(e) {
  var t = e.y, r = e.height, n = e.vertical, i = n === void 0 ? !0 : n, a = e.verticalPoints;
  if (!i || !a || !a.length)
    return null;
  var o = a.map(function(u, c) {
    var s = Be(Be({}, e), {}, {
      x1: u,
      y1: t,
      x2: u,
      y2: t + r,
      key: "line-".concat(c),
      index: c
    });
    return MO(i, s);
  });
  return /* @__PURE__ */ S.createElement("g", {
    className: "recharts-cartesian-grid-vertical"
  }, o);
}
function u2(e) {
  var t = e.horizontalFill, r = e.fillOpacity, n = e.x, i = e.y, a = e.width, o = e.height, u = e.horizontalPoints, c = e.horizontal, s = c === void 0 ? !0 : c;
  if (!s || !t || !t.length)
    return null;
  var f = u.map(function(d) {
    return Math.round(d + i - i);
  }).sort(function(d, h) {
    return d - h;
  });
  i !== f[0] && f.unshift(0);
  var l = f.map(function(d, h) {
    var m = !f[h + 1], v = m ? i + o - d : f[h + 1] - d;
    if (v <= 0)
      return null;
    var p = h % t.length;
    return /* @__PURE__ */ S.createElement("rect", {
      key: "react-".concat(h),
      y: d,
      x: n,
      height: v,
      width: a,
      stroke: "none",
      fill: t[p],
      fillOpacity: r,
      className: "recharts-cartesian-grid-bg"
    });
  });
  return /* @__PURE__ */ S.createElement("g", {
    className: "recharts-cartesian-gridstripes-horizontal"
  }, l);
}
function c2(e) {
  var t = e.vertical, r = t === void 0 ? !0 : t, n = e.verticalFill, i = e.fillOpacity, a = e.x, o = e.y, u = e.width, c = e.height, s = e.verticalPoints;
  if (!r || !n || !n.length)
    return null;
  var f = s.map(function(d) {
    return Math.round(d + a - a);
  }).sort(function(d, h) {
    return d - h;
  });
  a !== f[0] && f.unshift(0);
  var l = f.map(function(d, h) {
    var m = !f[h + 1], v = m ? a + u - d : f[h + 1] - d;
    if (v <= 0)
      return null;
    var p = h % n.length;
    return /* @__PURE__ */ S.createElement("rect", {
      key: "react-".concat(h),
      x: d,
      y: o,
      width: v,
      height: c,
      stroke: "none",
      fill: n[p],
      fillOpacity: i,
      className: "recharts-cartesian-grid-bg"
    });
  });
  return /* @__PURE__ */ S.createElement("g", {
    className: "recharts-cartesian-gridstripes-vertical"
  }, l);
}
var s2 = function(t, r) {
  var n = t.xAxis, i = t.width, a = t.height, o = t.offset;
  return $w(pp(Be(Be(Be({}, xn.defaultProps), n), {}, {
    ticks: Tt(n, !0),
    viewBox: {
      x: 0,
      y: 0,
      width: i,
      height: a
    }
  })), o.left, o.left + o.width, r);
}, l2 = function(t, r) {
  var n = t.yAxis, i = t.width, a = t.height, o = t.offset;
  return $w(pp(Be(Be(Be({}, xn.defaultProps), n), {}, {
    ticks: Tt(n, !0),
    viewBox: {
      x: 0,
      y: 0,
      width: i,
      height: a
    }
  })), o.top, o.top + o.height, r);
}, jr = {
  horizontal: !0,
  vertical: !0,
  stroke: "#ccc",
  fill: "none",
  // The fill of colors of grid lines
  verticalFill: [],
  horizontalFill: []
};
function Yi(e) {
  var t, r, n, i, a, o, u = sp(), c = lp(), s = ZD(), f = Be(Be({}, e), {}, {
    stroke: (t = e.stroke) !== null && t !== void 0 ? t : jr.stroke,
    fill: (r = e.fill) !== null && r !== void 0 ? r : jr.fill,
    horizontal: (n = e.horizontal) !== null && n !== void 0 ? n : jr.horizontal,
    horizontalFill: (i = e.horizontalFill) !== null && i !== void 0 ? i : jr.horizontalFill,
    vertical: (a = e.vertical) !== null && a !== void 0 ? a : jr.vertical,
    verticalFill: (o = e.verticalFill) !== null && o !== void 0 ? o : jr.verticalFill,
    x: z(e.x) ? e.x : s.left,
    y: z(e.y) ? e.y : s.top,
    width: z(e.width) ? e.width : s.width,
    height: z(e.height) ? e.height : s.height
  }), l = f.x, d = f.y, h = f.width, m = f.height, v = f.syncWithTicks, p = f.horizontalValues, g = f.verticalValues, x = VD(), w = YD();
  if (!z(h) || h <= 0 || !z(m) || m <= 0 || !z(l) || l !== +l || !z(d) || d !== +d)
    return null;
  var O = f.verticalCoordinatesGenerator || s2, y = f.horizontalCoordinatesGenerator || l2, b = f.horizontalPoints, _ = f.verticalPoints;
  if ((!b || !b.length) && te(y)) {
    var A = p && p.length, E = y({
      yAxis: w ? Be(Be({}, w), {}, {
        ticks: A ? p : w.ticks
      }) : void 0,
      width: u,
      height: c,
      offset: s
    }, A ? !0 : v);
    ft(Array.isArray(E), "horizontalCoordinatesGenerator should return Array but instead it returned [".concat(br(E), "]")), Array.isArray(E) && (b = E);
  }
  if ((!_ || !_.length) && te(O)) {
    var C = g && g.length, P = O({
      xAxis: x ? Be(Be({}, x), {}, {
        ticks: C ? g : x.ticks
      }) : void 0,
      width: u,
      height: c,
      offset: s
    }, C ? !0 : v);
    ft(Array.isArray(P), "verticalCoordinatesGenerator should return Array but instead it returned [".concat(br(P), "]")), Array.isArray(P) && (_ = P);
  }
  return /* @__PURE__ */ S.createElement("g", {
    className: "recharts-cartesian-grid"
  }, /* @__PURE__ */ S.createElement(i2, {
    fill: f.fill,
    fillOpacity: f.fillOpacity,
    x: f.x,
    y: f.y,
    width: f.width,
    height: f.height,
    ry: f.ry
  }), /* @__PURE__ */ S.createElement(a2, sr({}, f, {
    offset: s,
    horizontalPoints: b,
    xAxis: x,
    yAxis: w
  })), /* @__PURE__ */ S.createElement(o2, sr({}, f, {
    offset: s,
    verticalPoints: _,
    xAxis: x,
    yAxis: w
  })), /* @__PURE__ */ S.createElement(u2, sr({}, f, {
    horizontalPoints: b
  })), /* @__PURE__ */ S.createElement(c2, sr({}, f, {
    verticalPoints: _
  })));
}
Yi.displayName = "CartesianGrid";
var f2 = ["type", "layout", "connectNulls", "ref"], d2 = ["key"];
function un(e) {
  "@babel/helpers - typeof";
  return un = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, un(e);
}
function f0(e, t) {
  if (e == null) return {};
  var r = p2(e, t), n, i;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (i = 0; i < a.length; i++)
      n = a[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function p2(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
function Ln() {
  return Ln = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Ln.apply(this, arguments);
}
function d0(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Ge(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? d0(Object(r), !0).forEach(function(n) {
      st(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : d0(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function $r(e) {
  return m2(e) || y2(e) || v2(e) || h2();
}
function h2() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function v2(e, t) {
  if (e) {
    if (typeof e == "string") return Jf(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Jf(e, t);
  }
}
function y2(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function m2(e) {
  if (Array.isArray(e)) return Jf(e);
}
function Jf(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function g2(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function p0(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, RO(n.key), n);
  }
}
function b2(e, t, r) {
  return t && p0(e.prototype, t), r && p0(e, r), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function x2(e, t, r) {
  return t = Ha(t), w2(e, IO() ? Reflect.construct(t, r || [], Ha(e).constructor) : t.apply(e, r));
}
function w2(e, t) {
  if (t && (un(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return O2(e);
}
function O2(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function IO() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (IO = function() {
    return !!e;
  })();
}
function Ha(e) {
  return Ha = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, Ha(e);
}
function _2(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Qf(e, t);
}
function Qf(e, t) {
  return Qf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n;
  }, Qf(e, t);
}
function st(e, t, r) {
  return t = RO(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function RO(e) {
  var t = A2(e, "string");
  return un(t) == "symbol" ? t : t + "";
}
function A2(e, t) {
  if (un(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (un(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var Ti = /* @__PURE__ */ (function(e) {
  function t() {
    var r;
    g2(this, t);
    for (var n = arguments.length, i = new Array(n), a = 0; a < n; a++)
      i[a] = arguments[a];
    return r = x2(this, t, [].concat(i)), st(r, "state", {
      isAnimationFinished: !0,
      totalLength: 0
    }), st(r, "generateSimpleStrokeDasharray", function(o, u) {
      return "".concat(u, "px ").concat(o - u, "px");
    }), st(r, "getStrokeDasharray", function(o, u, c) {
      var s = c.reduce(function(g, x) {
        return g + x;
      });
      if (!s)
        return r.generateSimpleStrokeDasharray(u, o);
      for (var f = Math.floor(o / s), l = o % s, d = u - o, h = [], m = 0, v = 0; m < c.length; v += c[m], ++m)
        if (v + c[m] > l) {
          h = [].concat($r(c.slice(0, m)), [l - v]);
          break;
        }
      var p = h.length % 2 === 0 ? [0, d] : [d];
      return [].concat($r(t.repeat(c, f)), $r(h), p).map(function(g) {
        return "".concat(g, "px");
      }).join(", ");
    }), st(r, "id", wr("recharts-line-")), st(r, "pathRef", function(o) {
      r.mainCurve = o;
    }), st(r, "handleAnimationEnd", function() {
      r.setState({
        isAnimationFinished: !0
      }), r.props.onAnimationEnd && r.props.onAnimationEnd();
    }), st(r, "handleAnimationStart", function() {
      r.setState({
        isAnimationFinished: !1
      }), r.props.onAnimationStart && r.props.onAnimationStart();
    }), r;
  }
  return _2(t, e), b2(t, [{
    key: "componentDidMount",
    value: function() {
      if (this.props.isAnimationActive) {
        var n = this.getTotalLength();
        this.setState({
          totalLength: n
        });
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function() {
      if (this.props.isAnimationActive) {
        var n = this.getTotalLength();
        n !== this.state.totalLength && this.setState({
          totalLength: n
        });
      }
    }
  }, {
    key: "getTotalLength",
    value: function() {
      var n = this.mainCurve;
      try {
        return n && n.getTotalLength && n.getTotalLength() || 0;
      } catch {
        return 0;
      }
    }
  }, {
    key: "renderErrorBar",
    value: function(n, i) {
      if (this.props.isAnimationActive && !this.state.isAnimationFinished)
        return null;
      var a = this.props, o = a.points, u = a.xAxis, c = a.yAxis, s = a.layout, f = a.children, l = Qe(f, Pi);
      if (!l)
        return null;
      var d = function(v, p) {
        return {
          x: v.x,
          y: v.y,
          value: v.value,
          errorVal: Pe(v.payload, p)
        };
      }, h = {
        clipPath: n ? "url(#clipPath-".concat(i, ")") : null
      };
      return /* @__PURE__ */ S.createElement(ue, h, l.map(function(m) {
        return /* @__PURE__ */ S.cloneElement(m, {
          key: "bar-".concat(m.props.dataKey),
          data: o,
          xAxis: u,
          yAxis: c,
          layout: s,
          dataPointFormatter: d
        });
      }));
    }
  }, {
    key: "renderDots",
    value: function(n, i, a) {
      var o = this.props.isAnimationActive;
      if (o && !this.state.isAnimationFinished)
        return null;
      var u = this.props, c = u.dot, s = u.points, f = u.dataKey, l = X(this.props, !1), d = X(c, !0), h = s.map(function(v, p) {
        var g = Ge(Ge(Ge({
          key: "dot-".concat(p),
          r: 3
        }, l), d), {}, {
          index: p,
          cx: v.x,
          cy: v.y,
          value: v.value,
          dataKey: f,
          payload: v.payload,
          points: s
        });
        return t.renderDotItem(c, g);
      }), m = {
        clipPath: n ? "url(#clipPath-".concat(i ? "" : "dots-").concat(a, ")") : null
      };
      return /* @__PURE__ */ S.createElement(ue, Ln({
        className: "recharts-line-dots",
        key: "dots"
      }, m), h);
    }
  }, {
    key: "renderCurveStatically",
    value: function(n, i, a, o) {
      var u = this.props, c = u.type, s = u.layout, f = u.connectNulls;
      u.ref;
      var l = f0(u, f2), d = Ge(Ge(Ge({}, X(l, !0)), {}, {
        fill: "none",
        className: "recharts-line-curve",
        clipPath: i ? "url(#clipPath-".concat(a, ")") : null,
        points: n
      }, o), {}, {
        type: c,
        layout: s,
        connectNulls: f
      });
      return /* @__PURE__ */ S.createElement(pr, Ln({}, d, {
        pathRef: this.pathRef
      }));
    }
  }, {
    key: "renderCurveWithAnimation",
    value: function(n, i) {
      var a = this, o = this.props, u = o.points, c = o.strokeDasharray, s = o.isAnimationActive, f = o.animationBegin, l = o.animationDuration, d = o.animationEasing, h = o.animationId, m = o.animateNewValues, v = o.width, p = o.height, g = this.state, x = g.prevPoints, w = g.totalLength;
      return /* @__PURE__ */ S.createElement(dt, {
        begin: f,
        duration: l,
        isActive: s,
        easing: d,
        from: {
          t: 0
        },
        to: {
          t: 1
        },
        key: "line-".concat(h),
        onAnimationEnd: this.handleAnimationEnd,
        onAnimationStart: this.handleAnimationStart
      }, function(O) {
        var y = O.t;
        if (x) {
          var b = x.length / u.length, _ = u.map(function(T, $) {
            var R = Math.floor($ * b);
            if (x[R]) {
              var I = x[R], k = Ce(I.x, T.x), q = Ce(I.y, T.y);
              return Ge(Ge({}, T), {}, {
                x: k(y),
                y: q(y)
              });
            }
            if (m) {
              var W = Ce(v * 2, T.x), K = Ce(p / 2, T.y);
              return Ge(Ge({}, T), {}, {
                x: W(y),
                y: K(y)
              });
            }
            return Ge(Ge({}, T), {}, {
              x: T.x,
              y: T.y
            });
          });
          return a.renderCurveStatically(_, n, i);
        }
        var A = Ce(0, w), E = A(y), C;
        if (c) {
          var P = "".concat(c).split(/[,\s]+/gim).map(function(T) {
            return parseFloat(T);
          });
          C = a.getStrokeDasharray(E, w, P);
        } else
          C = a.generateSimpleStrokeDasharray(w, E);
        return a.renderCurveStatically(u, n, i, {
          strokeDasharray: C
        });
      });
    }
  }, {
    key: "renderCurve",
    value: function(n, i) {
      var a = this.props, o = a.points, u = a.isAnimationActive, c = this.state, s = c.prevPoints, f = c.totalLength;
      return u && o && o.length && (!s && f > 0 || !mr(s, o)) ? this.renderCurveWithAnimation(n, i) : this.renderCurveStatically(o, n, i);
    }
  }, {
    key: "render",
    value: function() {
      var n, i = this.props, a = i.hide, o = i.dot, u = i.points, c = i.className, s = i.xAxis, f = i.yAxis, l = i.top, d = i.left, h = i.width, m = i.height, v = i.isAnimationActive, p = i.id;
      if (a || !u || !u.length)
        return null;
      var g = this.state.isAnimationFinished, x = u.length === 1, w = ae("recharts-line", c), O = s && s.allowDataOverflow, y = f && f.allowDataOverflow, b = O || y, _ = ie(p) ? this.id : p, A = (n = X(o, !1)) !== null && n !== void 0 ? n : {
        r: 3,
        strokeWidth: 2
      }, E = A.r, C = E === void 0 ? 3 : E, P = A.strokeWidth, T = P === void 0 ? 2 : P, $ = M0(o) ? o : {}, R = $.clipDot, I = R === void 0 ? !0 : R, k = C * 2 + T;
      return /* @__PURE__ */ S.createElement(ue, {
        className: w
      }, O || y ? /* @__PURE__ */ S.createElement("defs", null, /* @__PURE__ */ S.createElement("clipPath", {
        id: "clipPath-".concat(_)
      }, /* @__PURE__ */ S.createElement("rect", {
        x: O ? d : d - h / 2,
        y: y ? l : l - m / 2,
        width: O ? h : h * 2,
        height: y ? m : m * 2
      })), !I && /* @__PURE__ */ S.createElement("clipPath", {
        id: "clipPath-dots-".concat(_)
      }, /* @__PURE__ */ S.createElement("rect", {
        x: d - k / 2,
        y: l - k / 2,
        width: h + k,
        height: m + k
      }))) : null, !x && this.renderCurve(b, _), this.renderErrorBar(b, _), (x || o) && this.renderDots(b, I, _), (!v || g) && gt.renderCallByParent(this.props, u));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function(n, i) {
      return n.animationId !== i.prevAnimationId ? {
        prevAnimationId: n.animationId,
        curPoints: n.points,
        prevPoints: i.curPoints
      } : n.points !== i.curPoints ? {
        curPoints: n.points
      } : null;
    }
  }, {
    key: "repeat",
    value: function(n, i) {
      for (var a = n.length % 2 !== 0 ? [].concat($r(n), [0]) : n, o = [], u = 0; u < i; ++u)
        o = [].concat($r(o), $r(a));
      return o;
    }
  }, {
    key: "renderDotItem",
    value: function(n, i) {
      var a;
      if (/* @__PURE__ */ S.isValidElement(n))
        a = /* @__PURE__ */ S.cloneElement(n, i);
      else if (te(n))
        a = n(i);
      else {
        var o = i.key, u = f0(i, d2), c = ae("recharts-line-dot", typeof n != "boolean" ? n.className : "");
        a = /* @__PURE__ */ S.createElement(Ei, Ln({
          key: o
        }, u, {
          className: c
        }));
      }
      return a;
    }
  }]);
})(F.PureComponent);
st(Ti, "displayName", "Line");
st(Ti, "defaultProps", {
  xAxisId: 0,
  yAxisId: 0,
  connectNulls: !1,
  activeDot: !0,
  dot: !0,
  legendType: "line",
  stroke: "#3182bd",
  strokeWidth: 1,
  fill: "#fff",
  points: [],
  isAnimationActive: !Vt.isSsr,
  animateNewValues: !0,
  animationBegin: 0,
  animationDuration: 1500,
  animationEasing: "ease",
  hide: !1,
  label: !1
});
st(Ti, "getComposedData", function(e) {
  var t = e.props, r = e.xAxis, n = e.yAxis, i = e.xAxisTicks, a = e.yAxisTicks, o = e.dataKey, u = e.bandSize, c = e.displayedData, s = e.offset, f = t.layout, l = c.map(function(d, h) {
    var m = Pe(d, o);
    return f === "horizontal" ? {
      x: wa({
        axis: r,
        ticks: i,
        bandSize: u,
        entry: d,
        index: h
      }),
      y: ie(m) ? null : n.scale(m),
      value: m,
      payload: d
    } : {
      x: ie(m) ? null : r.scale(m),
      y: wa({
        axis: n,
        ticks: a,
        bandSize: u,
        entry: d,
        index: h
      }),
      value: m,
      payload: d
    };
  });
  return Ge({
    points: l,
    layout: f
  }, s);
});
var S2 = ["layout", "type", "stroke", "connectNulls", "isRange", "ref"], P2 = ["key"], kO;
function cn(e) {
  "@babel/helpers - typeof";
  return cn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, cn(e);
}
function DO(e, t) {
  if (e == null) return {};
  var r = E2(e, t), n, i;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (i = 0; i < a.length; i++)
      n = a[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function E2(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
function lr() {
  return lr = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, lr.apply(this, arguments);
}
function h0(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Lt(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? h0(Object(r), !0).forEach(function(n) {
      yt(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : h0(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function T2(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function v0(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, qO(n.key), n);
  }
}
function j2(e, t, r) {
  return t && v0(e.prototype, t), r && v0(e, r), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function $2(e, t, r) {
  return t = Ga(t), C2(e, NO() ? Reflect.construct(t, r || [], Ga(e).constructor) : t.apply(e, r));
}
function C2(e, t) {
  if (t && (cn(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return M2(e);
}
function M2(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function NO() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (NO = function() {
    return !!e;
  })();
}
function Ga(e) {
  return Ga = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, Ga(e);
}
function I2(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && ed(e, t);
}
function ed(e, t) {
  return ed = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n;
  }, ed(e, t);
}
function yt(e, t, r) {
  return t = qO(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function qO(e) {
  var t = R2(e, "string");
  return cn(t) == "symbol" ? t : t + "";
}
function R2(e, t) {
  if (cn(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (cn(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var Jt = /* @__PURE__ */ (function(e) {
  function t() {
    var r;
    T2(this, t);
    for (var n = arguments.length, i = new Array(n), a = 0; a < n; a++)
      i[a] = arguments[a];
    return r = $2(this, t, [].concat(i)), yt(r, "state", {
      isAnimationFinished: !0
    }), yt(r, "id", wr("recharts-area-")), yt(r, "handleAnimationEnd", function() {
      var o = r.props.onAnimationEnd;
      r.setState({
        isAnimationFinished: !0
      }), te(o) && o();
    }), yt(r, "handleAnimationStart", function() {
      var o = r.props.onAnimationStart;
      r.setState({
        isAnimationFinished: !1
      }), te(o) && o();
    }), r;
  }
  return I2(t, e), j2(t, [{
    key: "renderDots",
    value: function(n, i, a) {
      var o = this.props.isAnimationActive, u = this.state.isAnimationFinished;
      if (o && !u)
        return null;
      var c = this.props, s = c.dot, f = c.points, l = c.dataKey, d = X(this.props, !1), h = X(s, !0), m = f.map(function(p, g) {
        var x = Lt(Lt(Lt({
          key: "dot-".concat(g),
          r: 3
        }, d), h), {}, {
          index: g,
          cx: p.x,
          cy: p.y,
          dataKey: l,
          value: p.value,
          payload: p.payload,
          points: f
        });
        return t.renderDotItem(s, x);
      }), v = {
        clipPath: n ? "url(#clipPath-".concat(i ? "" : "dots-").concat(a, ")") : null
      };
      return /* @__PURE__ */ S.createElement(ue, lr({
        className: "recharts-area-dots"
      }, v), m);
    }
  }, {
    key: "renderHorizontalRect",
    value: function(n) {
      var i = this.props, a = i.baseLine, o = i.points, u = i.strokeWidth, c = o[0].x, s = o[o.length - 1].x, f = n * Math.abs(c - s), l = zt(o.map(function(d) {
        return d.y || 0;
      }));
      return z(a) && typeof a == "number" ? l = Math.max(a, l) : a && Array.isArray(a) && a.length && (l = Math.max(zt(a.map(function(d) {
        return d.y || 0;
      })), l)), z(l) ? /* @__PURE__ */ S.createElement("rect", {
        x: c < s ? c : c - f,
        y: 0,
        width: f,
        height: Math.floor(l + (u ? parseInt("".concat(u), 10) : 1))
      }) : null;
    }
  }, {
    key: "renderVerticalRect",
    value: function(n) {
      var i = this.props, a = i.baseLine, o = i.points, u = i.strokeWidth, c = o[0].y, s = o[o.length - 1].y, f = n * Math.abs(c - s), l = zt(o.map(function(d) {
        return d.x || 0;
      }));
      return z(a) && typeof a == "number" ? l = Math.max(a, l) : a && Array.isArray(a) && a.length && (l = Math.max(zt(a.map(function(d) {
        return d.x || 0;
      })), l)), z(l) ? /* @__PURE__ */ S.createElement("rect", {
        x: 0,
        y: c < s ? c : c - f,
        width: l + (u ? parseInt("".concat(u), 10) : 1),
        height: Math.floor(f)
      }) : null;
    }
  }, {
    key: "renderClipRect",
    value: function(n) {
      var i = this.props.layout;
      return i === "vertical" ? this.renderVerticalRect(n) : this.renderHorizontalRect(n);
    }
  }, {
    key: "renderAreaStatically",
    value: function(n, i, a, o) {
      var u = this.props, c = u.layout, s = u.type, f = u.stroke, l = u.connectNulls, d = u.isRange;
      u.ref;
      var h = DO(u, S2);
      return /* @__PURE__ */ S.createElement(ue, {
        clipPath: a ? "url(#clipPath-".concat(o, ")") : null
      }, /* @__PURE__ */ S.createElement(pr, lr({}, X(h, !0), {
        points: n,
        connectNulls: l,
        type: s,
        baseLine: i,
        layout: c,
        stroke: "none",
        className: "recharts-area-area"
      })), f !== "none" && /* @__PURE__ */ S.createElement(pr, lr({}, X(this.props, !1), {
        className: "recharts-area-curve",
        layout: c,
        type: s,
        connectNulls: l,
        fill: "none",
        points: n
      })), f !== "none" && d && /* @__PURE__ */ S.createElement(pr, lr({}, X(this.props, !1), {
        className: "recharts-area-curve",
        layout: c,
        type: s,
        connectNulls: l,
        fill: "none",
        points: i
      })));
    }
  }, {
    key: "renderAreaWithAnimation",
    value: function(n, i) {
      var a = this, o = this.props, u = o.points, c = o.baseLine, s = o.isAnimationActive, f = o.animationBegin, l = o.animationDuration, d = o.animationEasing, h = o.animationId, m = this.state, v = m.prevPoints, p = m.prevBaseLine;
      return /* @__PURE__ */ S.createElement(dt, {
        begin: f,
        duration: l,
        isActive: s,
        easing: d,
        from: {
          t: 0
        },
        to: {
          t: 1
        },
        key: "area-".concat(h),
        onAnimationEnd: this.handleAnimationEnd,
        onAnimationStart: this.handleAnimationStart
      }, function(g) {
        var x = g.t;
        if (v) {
          var w = v.length / u.length, O = u.map(function(A, E) {
            var C = Math.floor(E * w);
            if (v[C]) {
              var P = v[C], T = Ce(P.x, A.x), $ = Ce(P.y, A.y);
              return Lt(Lt({}, A), {}, {
                x: T(x),
                y: $(x)
              });
            }
            return A;
          }), y;
          if (z(c) && typeof c == "number") {
            var b = Ce(p, c);
            y = b(x);
          } else if (ie(c) || vn(c)) {
            var _ = Ce(p, 0);
            y = _(x);
          } else
            y = c.map(function(A, E) {
              var C = Math.floor(E * w);
              if (p[C]) {
                var P = p[C], T = Ce(P.x, A.x), $ = Ce(P.y, A.y);
                return Lt(Lt({}, A), {}, {
                  x: T(x),
                  y: $(x)
                });
              }
              return A;
            });
          return a.renderAreaStatically(O, y, n, i);
        }
        return /* @__PURE__ */ S.createElement(ue, null, /* @__PURE__ */ S.createElement("defs", null, /* @__PURE__ */ S.createElement("clipPath", {
          id: "animationClipPath-".concat(i)
        }, a.renderClipRect(x))), /* @__PURE__ */ S.createElement(ue, {
          clipPath: "url(#animationClipPath-".concat(i, ")")
        }, a.renderAreaStatically(u, c, n, i)));
      });
    }
  }, {
    key: "renderArea",
    value: function(n, i) {
      var a = this.props, o = a.points, u = a.baseLine, c = a.isAnimationActive, s = this.state, f = s.prevPoints, l = s.prevBaseLine, d = s.totalLength;
      return c && o && o.length && (!f && d > 0 || !mr(f, o) || !mr(l, u)) ? this.renderAreaWithAnimation(n, i) : this.renderAreaStatically(o, u, n, i);
    }
  }, {
    key: "render",
    value: function() {
      var n, i = this.props, a = i.hide, o = i.dot, u = i.points, c = i.className, s = i.top, f = i.left, l = i.xAxis, d = i.yAxis, h = i.width, m = i.height, v = i.isAnimationActive, p = i.id;
      if (a || !u || !u.length)
        return null;
      var g = this.state.isAnimationFinished, x = u.length === 1, w = ae("recharts-area", c), O = l && l.allowDataOverflow, y = d && d.allowDataOverflow, b = O || y, _ = ie(p) ? this.id : p, A = (n = X(o, !1)) !== null && n !== void 0 ? n : {
        r: 3,
        strokeWidth: 2
      }, E = A.r, C = E === void 0 ? 3 : E, P = A.strokeWidth, T = P === void 0 ? 2 : P, $ = M0(o) ? o : {}, R = $.clipDot, I = R === void 0 ? !0 : R, k = C * 2 + T;
      return /* @__PURE__ */ S.createElement(ue, {
        className: w
      }, O || y ? /* @__PURE__ */ S.createElement("defs", null, /* @__PURE__ */ S.createElement("clipPath", {
        id: "clipPath-".concat(_)
      }, /* @__PURE__ */ S.createElement("rect", {
        x: O ? f : f - h / 2,
        y: y ? s : s - m / 2,
        width: O ? h : h * 2,
        height: y ? m : m * 2
      })), !I && /* @__PURE__ */ S.createElement("clipPath", {
        id: "clipPath-dots-".concat(_)
      }, /* @__PURE__ */ S.createElement("rect", {
        x: f - k / 2,
        y: s - k / 2,
        width: h + k,
        height: m + k
      }))) : null, x ? null : this.renderArea(b, _), (o || x) && this.renderDots(b, I, _), (!v || g) && gt.renderCallByParent(this.props, u));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function(n, i) {
      return n.animationId !== i.prevAnimationId ? {
        prevAnimationId: n.animationId,
        curPoints: n.points,
        curBaseLine: n.baseLine,
        prevPoints: i.curPoints,
        prevBaseLine: i.curBaseLine
      } : n.points !== i.curPoints || n.baseLine !== i.curBaseLine ? {
        curPoints: n.points,
        curBaseLine: n.baseLine
      } : null;
    }
  }]);
})(F.PureComponent);
kO = Jt;
yt(Jt, "displayName", "Area");
yt(Jt, "defaultProps", {
  stroke: "#3182bd",
  fill: "#3182bd",
  fillOpacity: 0.6,
  xAxisId: 0,
  yAxisId: 0,
  legendType: "line",
  connectNulls: !1,
  // points of area
  points: [],
  dot: !1,
  activeDot: !0,
  hide: !1,
  isAnimationActive: !Vt.isSsr,
  animationBegin: 0,
  animationDuration: 1500,
  animationEasing: "ease"
});
yt(Jt, "getBaseValue", function(e, t, r, n) {
  var i = e.layout, a = e.baseValue, o = t.props.baseValue, u = o ?? a;
  if (z(u) && typeof u == "number")
    return u;
  var c = i === "horizontal" ? n : r, s = c.scale.domain();
  if (c.type === "number") {
    var f = Math.max(s[0], s[1]), l = Math.min(s[0], s[1]);
    return u === "dataMin" ? l : u === "dataMax" || f < 0 ? f : Math.max(Math.min(s[0], s[1]), 0);
  }
  return u === "dataMin" ? s[0] : u === "dataMax" ? s[1] : s[0];
});
yt(Jt, "getComposedData", function(e) {
  var t = e.props, r = e.item, n = e.xAxis, i = e.yAxis, a = e.xAxisTicks, o = e.yAxisTicks, u = e.bandSize, c = e.dataKey, s = e.stackedData, f = e.dataStartIndex, l = e.displayedData, d = e.offset, h = t.layout, m = s && s.length, v = kO.getBaseValue(t, r, n, i), p = h === "horizontal", g = !1, x = l.map(function(O, y) {
    var b;
    m ? b = s[f + y] : (b = Pe(O, c), Array.isArray(b) ? g = !0 : b = [v, b]);
    var _ = b[1] == null || m && Pe(O, c) == null;
    return p ? {
      x: wa({
        axis: n,
        ticks: a,
        bandSize: u,
        entry: O,
        index: y
      }),
      y: _ ? null : i.scale(b[1]),
      value: b,
      payload: O
    } : {
      x: _ ? null : n.scale(b[1]),
      y: wa({
        axis: i,
        ticks: o,
        bandSize: u,
        entry: O,
        index: y
      }),
      value: b,
      payload: O
    };
  }), w;
  return m || g ? w = x.map(function(O) {
    var y = Array.isArray(O.value) ? O.value[0] : null;
    return p ? {
      x: O.x,
      y: y != null && O.y != null ? i.scale(y) : null
    } : {
      x: y != null ? n.scale(y) : null,
      y: O.y
    };
  }) : w = p ? i.scale(v) : n.scale(v), Lt({
    points: x,
    baseLine: w,
    layout: h,
    isRange: g
  }, d);
});
yt(Jt, "renderDotItem", function(e, t) {
  var r;
  if (/* @__PURE__ */ S.isValidElement(e))
    r = /* @__PURE__ */ S.cloneElement(e, t);
  else if (te(e))
    r = e(t);
  else {
    var n = ae("recharts-area-dot", typeof e != "boolean" ? e.className : ""), i = t.key, a = DO(t, P2);
    r = /* @__PURE__ */ S.createElement(Ei, lr({}, a, {
      key: i,
      className: n
    }));
  }
  return r;
});
function sn(e) {
  "@babel/helpers - typeof";
  return sn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, sn(e);
}
function k2(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function D2(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, FO(n.key), n);
  }
}
function N2(e, t, r) {
  return t && D2(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function q2(e, t, r) {
  return t = Va(t), L2(e, LO() ? Reflect.construct(t, r || [], Va(e).constructor) : t.apply(e, r));
}
function L2(e, t) {
  if (t && (sn(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return B2(e);
}
function B2(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function LO() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (LO = function() {
    return !!e;
  })();
}
function Va(e) {
  return Va = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, Va(e);
}
function F2(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && td(e, t);
}
function td(e, t) {
  return td = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n;
  }, td(e, t);
}
function BO(e, t, r) {
  return t = FO(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function FO(e) {
  var t = z2(e, "string");
  return sn(t) == "symbol" ? t : t + "";
}
function z2(e, t) {
  if (sn(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (sn(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
function rd() {
  return rd = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, rd.apply(this, arguments);
}
function W2(e) {
  var t = e.xAxisId, r = sp(), n = lp(), i = wO(t);
  return i == null ? null : (
    // @ts-expect-error the axisOptions type is not exactly what CartesianAxis is expecting.
    /* @__PURE__ */ F.createElement(xn, rd({}, i, {
      className: ae("recharts-".concat(i.axisType, " ").concat(i.axisType), i.className),
      viewBox: {
        x: 0,
        y: 0,
        width: r,
        height: n
      },
      ticksGenerator: function(o) {
        return Tt(o, !0);
      }
    }))
  );
}
var Kt = /* @__PURE__ */ (function(e) {
  function t() {
    return k2(this, t), q2(this, t, arguments);
  }
  return F2(t, e), N2(t, [{
    key: "render",
    value: function() {
      return /* @__PURE__ */ F.createElement(W2, this.props);
    }
  }]);
})(F.Component);
BO(Kt, "displayName", "XAxis");
BO(Kt, "defaultProps", {
  allowDecimals: !0,
  hide: !1,
  orientation: "bottom",
  width: 0,
  height: 30,
  mirror: !1,
  xAxisId: 0,
  tickCount: 5,
  type: "category",
  padding: {
    left: 0,
    right: 0
  },
  allowDataOverflow: !1,
  scale: "auto",
  reversed: !1,
  allowDuplicatedCategory: !0
});
function ln(e) {
  "@babel/helpers - typeof";
  return ln = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, ln(e);
}
function U2(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function K2(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, UO(n.key), n);
  }
}
function H2(e, t, r) {
  return t && K2(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function G2(e, t, r) {
  return t = Ya(t), V2(e, zO() ? Reflect.construct(t, r || [], Ya(e).constructor) : t.apply(e, r));
}
function V2(e, t) {
  if (t && (ln(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return Y2(e);
}
function Y2(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function zO() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (zO = function() {
    return !!e;
  })();
}
function Ya(e) {
  return Ya = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, Ya(e);
}
function X2(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && nd(e, t);
}
function nd(e, t) {
  return nd = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n;
  }, nd(e, t);
}
function WO(e, t, r) {
  return t = UO(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function UO(e) {
  var t = Z2(e, "string");
  return ln(t) == "symbol" ? t : t + "";
}
function Z2(e, t) {
  if (ln(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (ln(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
function id() {
  return id = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, id.apply(this, arguments);
}
var J2 = function(t) {
  var r = t.yAxisId, n = sp(), i = lp(), a = OO(r);
  return a == null ? null : (
    // @ts-expect-error the axisOptions type is not exactly what CartesianAxis is expecting.
    /* @__PURE__ */ F.createElement(xn, id({}, a, {
      className: ae("recharts-".concat(a.axisType, " ").concat(a.axisType), a.className),
      viewBox: {
        x: 0,
        y: 0,
        width: n,
        height: i
      },
      ticksGenerator: function(u) {
        return Tt(u, !0);
      }
    }))
  );
}, Ht = /* @__PURE__ */ (function(e) {
  function t() {
    return U2(this, t), G2(this, t, arguments);
  }
  return X2(t, e), H2(t, [{
    key: "render",
    value: function() {
      return /* @__PURE__ */ F.createElement(J2, this.props);
    }
  }]);
})(F.Component);
WO(Ht, "displayName", "YAxis");
WO(Ht, "defaultProps", {
  allowDuplicatedCategory: !0,
  allowDecimals: !0,
  hide: !1,
  orientation: "left",
  width: 60,
  height: 0,
  mirror: !1,
  yAxisId: 0,
  tickCount: 5,
  type: "number",
  padding: {
    top: 0,
    bottom: 0
  },
  allowDataOverflow: !1,
  scale: "auto",
  reversed: !1
});
function y0(e) {
  return rq(e) || tq(e) || eq(e) || Q2();
}
function Q2() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function eq(e, t) {
  if (e) {
    if (typeof e == "string") return ad(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return ad(e, t);
  }
}
function tq(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function rq(e) {
  if (Array.isArray(e)) return ad(e);
}
function ad(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
var od = function(t, r, n, i, a) {
  var o = Qe(t, dp), u = Qe(t, jo), c = [].concat(y0(o), y0(u)), s = Qe(t, Co), f = "".concat(i, "Id"), l = i[0], d = r;
  if (c.length && (d = c.reduce(function(v, p) {
    if (p.props[f] === n && bt(p.props, "extendDomain") && z(p.props[l])) {
      var g = p.props[l];
      return [Math.min(v[0], g), Math.max(v[1], g)];
    }
    return v;
  }, d)), s.length) {
    var h = "".concat(l, "1"), m = "".concat(l, "2");
    d = s.reduce(function(v, p) {
      if (p.props[f] === n && bt(p.props, "extendDomain") && z(p.props[h]) && z(p.props[m])) {
        var g = p.props[h], x = p.props[m];
        return [Math.min(v[0], g, x), Math.max(v[1], g, x)];
      }
      return v;
    }, d);
  }
  return a && a.length && (d = a.reduce(function(v, p) {
    return z(p) ? [Math.min(v[0], p), Math.max(v[1], p)] : v;
  }, d)), d;
}, Nl = { exports: {} }, m0;
function nq() {
  return m0 || (m0 = 1, (function(e) {
    var t = Object.prototype.hasOwnProperty, r = "~";
    function n() {
    }
    Object.create && (n.prototype = /* @__PURE__ */ Object.create(null), new n().__proto__ || (r = !1));
    function i(c, s, f) {
      this.fn = c, this.context = s, this.once = f || !1;
    }
    function a(c, s, f, l, d) {
      if (typeof f != "function")
        throw new TypeError("The listener must be a function");
      var h = new i(f, l || c, d), m = r ? r + s : s;
      return c._events[m] ? c._events[m].fn ? c._events[m] = [c._events[m], h] : c._events[m].push(h) : (c._events[m] = h, c._eventsCount++), c;
    }
    function o(c, s) {
      --c._eventsCount === 0 ? c._events = new n() : delete c._events[s];
    }
    function u() {
      this._events = new n(), this._eventsCount = 0;
    }
    u.prototype.eventNames = function() {
      var s = [], f, l;
      if (this._eventsCount === 0) return s;
      for (l in f = this._events)
        t.call(f, l) && s.push(r ? l.slice(1) : l);
      return Object.getOwnPropertySymbols ? s.concat(Object.getOwnPropertySymbols(f)) : s;
    }, u.prototype.listeners = function(s) {
      var f = r ? r + s : s, l = this._events[f];
      if (!l) return [];
      if (l.fn) return [l.fn];
      for (var d = 0, h = l.length, m = new Array(h); d < h; d++)
        m[d] = l[d].fn;
      return m;
    }, u.prototype.listenerCount = function(s) {
      var f = r ? r + s : s, l = this._events[f];
      return l ? l.fn ? 1 : l.length : 0;
    }, u.prototype.emit = function(s, f, l, d, h, m) {
      var v = r ? r + s : s;
      if (!this._events[v]) return !1;
      var p = this._events[v], g = arguments.length, x, w;
      if (p.fn) {
        switch (p.once && this.removeListener(s, p.fn, void 0, !0), g) {
          case 1:
            return p.fn.call(p.context), !0;
          case 2:
            return p.fn.call(p.context, f), !0;
          case 3:
            return p.fn.call(p.context, f, l), !0;
          case 4:
            return p.fn.call(p.context, f, l, d), !0;
          case 5:
            return p.fn.call(p.context, f, l, d, h), !0;
          case 6:
            return p.fn.call(p.context, f, l, d, h, m), !0;
        }
        for (w = 1, x = new Array(g - 1); w < g; w++)
          x[w - 1] = arguments[w];
        p.fn.apply(p.context, x);
      } else {
        var O = p.length, y;
        for (w = 0; w < O; w++)
          switch (p[w].once && this.removeListener(s, p[w].fn, void 0, !0), g) {
            case 1:
              p[w].fn.call(p[w].context);
              break;
            case 2:
              p[w].fn.call(p[w].context, f);
              break;
            case 3:
              p[w].fn.call(p[w].context, f, l);
              break;
            case 4:
              p[w].fn.call(p[w].context, f, l, d);
              break;
            default:
              if (!x) for (y = 1, x = new Array(g - 1); y < g; y++)
                x[y - 1] = arguments[y];
              p[w].fn.apply(p[w].context, x);
          }
      }
      return !0;
    }, u.prototype.on = function(s, f, l) {
      return a(this, s, f, l, !1);
    }, u.prototype.once = function(s, f, l) {
      return a(this, s, f, l, !0);
    }, u.prototype.removeListener = function(s, f, l, d) {
      var h = r ? r + s : s;
      if (!this._events[h]) return this;
      if (!f)
        return o(this, h), this;
      var m = this._events[h];
      if (m.fn)
        m.fn === f && (!d || m.once) && (!l || m.context === l) && o(this, h);
      else {
        for (var v = 0, p = [], g = m.length; v < g; v++)
          (m[v].fn !== f || d && !m[v].once || l && m[v].context !== l) && p.push(m[v]);
        p.length ? this._events[h] = p.length === 1 ? p[0] : p : o(this, h);
      }
      return this;
    }, u.prototype.removeAllListeners = function(s) {
      var f;
      return s ? (f = r ? r + s : s, this._events[f] && o(this, f)) : (this._events = new n(), this._eventsCount = 0), this;
    }, u.prototype.off = u.prototype.removeListener, u.prototype.addListener = u.prototype.on, u.prefixed = r, u.EventEmitter = u, e.exports = u;
  })(Nl)), Nl.exports;
}
var iq = nq();
const aq = /* @__PURE__ */ ye(iq);
var ql = new aq(), Ll = "recharts.syncMouseEvents";
function gi(e) {
  "@babel/helpers - typeof";
  return gi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, gi(e);
}
function oq(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function uq(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, KO(n.key), n);
  }
}
function cq(e, t, r) {
  return t && uq(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function Bl(e, t, r) {
  return t = KO(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function KO(e) {
  var t = sq(e, "string");
  return gi(t) == "symbol" ? t : t + "";
}
function sq(e, t) {
  if (gi(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (gi(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var lq = /* @__PURE__ */ (function() {
  function e() {
    oq(this, e), Bl(this, "activeIndex", 0), Bl(this, "coordinateList", []), Bl(this, "layout", "horizontal");
  }
  return cq(e, [{
    key: "setDetails",
    value: function(r) {
      var n, i = r.coordinateList, a = i === void 0 ? null : i, o = r.container, u = o === void 0 ? null : o, c = r.layout, s = c === void 0 ? null : c, f = r.offset, l = f === void 0 ? null : f, d = r.mouseHandlerCallback, h = d === void 0 ? null : d;
      this.coordinateList = (n = a ?? this.coordinateList) !== null && n !== void 0 ? n : [], this.container = u ?? this.container, this.layout = s ?? this.layout, this.offset = l ?? this.offset, this.mouseHandlerCallback = h ?? this.mouseHandlerCallback, this.activeIndex = Math.min(Math.max(this.activeIndex, 0), this.coordinateList.length - 1);
    }
  }, {
    key: "focus",
    value: function() {
      this.spoofMouse();
    }
  }, {
    key: "keyboardEvent",
    value: function(r) {
      if (this.coordinateList.length !== 0)
        switch (r.key) {
          case "ArrowRight": {
            if (this.layout !== "horizontal")
              return;
            this.activeIndex = Math.min(this.activeIndex + 1, this.coordinateList.length - 1), this.spoofMouse();
            break;
          }
          case "ArrowLeft": {
            if (this.layout !== "horizontal")
              return;
            this.activeIndex = Math.max(this.activeIndex - 1, 0), this.spoofMouse();
            break;
          }
        }
    }
  }, {
    key: "setIndex",
    value: function(r) {
      this.activeIndex = r;
    }
  }, {
    key: "spoofMouse",
    value: function() {
      var r, n;
      if (this.layout === "horizontal" && this.coordinateList.length !== 0) {
        var i = this.container.getBoundingClientRect(), a = i.x, o = i.y, u = i.height, c = this.coordinateList[this.activeIndex].coordinate, s = ((r = window) === null || r === void 0 ? void 0 : r.scrollX) || 0, f = ((n = window) === null || n === void 0 ? void 0 : n.scrollY) || 0, l = a + c + s, d = o + this.offset.top + u / 2 + f;
        this.mouseHandlerCallback({
          pageX: l,
          pageY: d
        });
      }
    }
  }]);
})();
function fq(e, t, r) {
  if (r === "number" && t === !0 && Array.isArray(e)) {
    var n = e == null ? void 0 : e[0], i = e == null ? void 0 : e[1];
    if (n && i && z(n) && z(i))
      return !0;
  }
  return !1;
}
function dq(e, t, r, n) {
  var i = n / 2;
  return {
    stroke: "none",
    fill: "#ccc",
    x: e === "horizontal" ? t.x - i : r.left + 0.5,
    y: e === "horizontal" ? r.top + 0.5 : t.y - i,
    width: e === "horizontal" ? n : r.width - 1,
    height: e === "horizontal" ? r.height - 1 : n
  };
}
function HO(e) {
  var t = e.cx, r = e.cy, n = e.radius, i = e.startAngle, a = e.endAngle, o = we(t, r, n, i), u = we(t, r, n, a);
  return {
    points: [o, u],
    cx: t,
    cy: r,
    radius: n,
    startAngle: i,
    endAngle: a
  };
}
function pq(e, t, r) {
  var n, i, a, o;
  if (e === "horizontal")
    n = t.x, a = n, i = r.top, o = r.top + r.height;
  else if (e === "vertical")
    i = t.y, o = i, n = r.left, a = r.left + r.width;
  else if (t.cx != null && t.cy != null)
    if (e === "centric") {
      var u = t.cx, c = t.cy, s = t.innerRadius, f = t.outerRadius, l = t.angle, d = we(u, c, s, l), h = we(u, c, f, l);
      n = d.x, i = d.y, a = h.x, o = h.y;
    } else
      return HO(t);
  return [{
    x: n,
    y: i
  }, {
    x: a,
    y: o
  }];
}
function bi(e) {
  "@babel/helpers - typeof";
  return bi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, bi(e);
}
function g0(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Hi(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? g0(Object(r), !0).forEach(function(n) {
      hq(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : g0(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function hq(e, t, r) {
  return t = vq(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function vq(e) {
  var t = yq(e, "string");
  return bi(t) == "symbol" ? t : t + "";
}
function yq(e, t) {
  if (bi(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (bi(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function mq(e) {
  var t, r, n = e.element, i = e.tooltipEventType, a = e.isActive, o = e.activeCoordinate, u = e.activePayload, c = e.offset, s = e.activeTooltipIndex, f = e.tooltipAxisBandSize, l = e.layout, d = e.chartName, h = (t = n.props.cursor) !== null && t !== void 0 ? t : (r = n.type.defaultProps) === null || r === void 0 ? void 0 : r.cursor;
  if (!n || !h || !a || !o || d !== "ScatterChart" && i !== "axis")
    return null;
  var m, v = pr;
  if (d === "ScatterChart")
    m = o, v = jR;
  else if (d === "BarChart")
    m = dq(l, o, c, f), v = ip;
  else if (l === "radial") {
    var p = HO(o), g = p.cx, x = p.cy, w = p.radius, O = p.startAngle, y = p.endAngle;
    m = {
      cx: g,
      cy: x,
      startAngle: O,
      endAngle: y,
      innerRadius: w,
      outerRadius: w
    }, v = Fw;
  } else
    m = {
      points: pq(l, o, c)
    }, v = pr;
  var b = Hi(Hi(Hi(Hi({
    stroke: "#ccc",
    pointerEvents: "none"
  }, c), m), X(h, !1)), {}, {
    payload: u,
    payloadIndex: s,
    className: ae("recharts-tooltip-cursor", h.className)
  });
  return /* @__PURE__ */ F.isValidElement(h) ? /* @__PURE__ */ F.cloneElement(h, b) : /* @__PURE__ */ F.createElement(v, b);
}
var gq = ["item"], bq = ["children", "className", "width", "height", "style", "compact", "title", "desc"];
function fn(e) {
  "@babel/helpers - typeof";
  return fn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, fn(e);
}
function kr() {
  return kr = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, kr.apply(this, arguments);
}
function b0(e, t) {
  return Oq(e) || wq(e, t) || VO(e, t) || xq();
}
function xq() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function wq(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, i, a, o, u = [], c = !0, s = !1;
    try {
      if (a = (r = r.call(e)).next, t !== 0) for (; !(c = (n = a.call(r)).done) && (u.push(n.value), u.length !== t); c = !0) ;
    } catch (f) {
      s = !0, i = f;
    } finally {
      try {
        if (!c && r.return != null && (o = r.return(), Object(o) !== o)) return;
      } finally {
        if (s) throw i;
      }
    }
    return u;
  }
}
function Oq(e) {
  if (Array.isArray(e)) return e;
}
function x0(e, t) {
  if (e == null) return {};
  var r = _q(e, t), n, i;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (i = 0; i < a.length; i++)
      n = a[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function _q(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
function Aq(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function Sq(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, YO(n.key), n);
  }
}
function Pq(e, t, r) {
  return t && Sq(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function Eq(e, t, r) {
  return t = Xa(t), Tq(e, GO() ? Reflect.construct(t, r || [], Xa(e).constructor) : t.apply(e, r));
}
function Tq(e, t) {
  if (t && (fn(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return jq(e);
}
function jq(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function GO() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (GO = function() {
    return !!e;
  })();
}
function Xa(e) {
  return Xa = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, Xa(e);
}
function $q(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && ud(e, t);
}
function ud(e, t) {
  return ud = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n;
  }, ud(e, t);
}
function dn(e) {
  return Iq(e) || Mq(e) || VO(e) || Cq();
}
function Cq() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function VO(e, t) {
  if (e) {
    if (typeof e == "string") return cd(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return cd(e, t);
  }
}
function Mq(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function Iq(e) {
  if (Array.isArray(e)) return cd(e);
}
function cd(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function w0(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function D(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? w0(Object(r), !0).forEach(function(n) {
      ee(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : w0(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function ee(e, t, r) {
  return t = YO(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function YO(e) {
  var t = Rq(e, "string");
  return fn(t) == "symbol" ? t : t + "";
}
function Rq(e, t) {
  if (fn(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (fn(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var kq = {
  xAxis: ["bottom", "top"],
  yAxis: ["left", "right"]
}, Dq = {
  width: "100%",
  height: "100%"
}, XO = {
  x: 0,
  y: 0
};
function Gi(e) {
  return e;
}
var Nq = function(t, r) {
  return r === "horizontal" ? t.x : r === "vertical" ? t.y : r === "centric" ? t.angle : t.radius;
}, qq = function(t, r, n, i) {
  var a = r.find(function(f) {
    return f && f.index === n;
  });
  if (a) {
    if (t === "horizontal")
      return {
        x: a.coordinate,
        y: i.y
      };
    if (t === "vertical")
      return {
        x: i.x,
        y: a.coordinate
      };
    if (t === "centric") {
      var o = a.coordinate, u = i.radius;
      return D(D(D({}, i), we(i.cx, i.cy, u, o)), {}, {
        angle: o,
        radius: u
      });
    }
    var c = a.coordinate, s = i.angle;
    return D(D(D({}, i), we(i.cx, i.cy, c, s)), {}, {
      angle: s,
      radius: c
    });
  }
  return XO;
}, Mo = function(t, r) {
  var n = r.graphicalItems, i = r.dataStartIndex, a = r.dataEndIndex, o = (n ?? []).reduce(function(u, c) {
    var s = c.props.data;
    return s && s.length ? [].concat(dn(u), dn(s)) : u;
  }, []);
  return o.length > 0 ? o : t && t.length && z(i) && z(a) ? t.slice(i, a + 1) : [];
};
function ZO(e) {
  return e === "number" ? [0, "auto"] : void 0;
}
var sd = function(t, r, n, i) {
  var a = t.graphicalItems, o = t.tooltipAxis, u = Mo(r, t);
  return n < 0 || !a || !a.length || n >= u.length ? null : a.reduce(function(c, s) {
    var f, l = (f = s.props.data) !== null && f !== void 0 ? f : r;
    l && t.dataStartIndex + t.dataEndIndex !== 0 && // https://github.com/recharts/recharts/issues/4717
    // The data is sliced only when the active index is within the start/end index range.
    t.dataEndIndex - t.dataStartIndex >= n && (l = l.slice(t.dataStartIndex, t.dataEndIndex + 1));
    var d;
    if (o.dataKey && !o.allowDuplicatedCategory) {
      var h = l === void 0 ? u : l;
      d = Xi(h, o.dataKey, i);
    } else
      d = l && l[n] || u[n];
    return d ? [].concat(dn(c), [kw(s, d)]) : c;
  }, []);
}, O0 = function(t, r, n, i) {
  var a = i || {
    x: t.chartX,
    y: t.chartY
  }, o = Nq(a, n), u = t.orderedTooltipTicks, c = t.tooltipAxis, s = t.tooltipTicks, f = V$(o, u, s, c);
  if (f >= 0 && s) {
    var l = s[f] && s[f].value, d = sd(t, r, f, l), h = qq(n, u, f, a);
    return {
      activeTooltipIndex: f,
      activeLabel: l,
      activePayload: d,
      activeCoordinate: h
    };
  }
  return null;
}, Lq = function(t, r) {
  var n = r.axes, i = r.graphicalItems, a = r.axisType, o = r.axisIdKey, u = r.stackGroups, c = r.dataStartIndex, s = r.dataEndIndex, f = t.layout, l = t.children, d = t.stackOffset, h = jw(f, a);
  return n.reduce(function(m, v) {
    var p, g = v.type.defaultProps !== void 0 ? D(D({}, v.type.defaultProps), v.props) : v.props, x = g.type, w = g.dataKey, O = g.allowDataOverflow, y = g.allowDuplicatedCategory, b = g.scale, _ = g.ticks, A = g.includeHidden, E = g[o];
    if (m[E])
      return m;
    var C = Mo(t.data, {
      graphicalItems: i.filter(function(L) {
        var H, V = o in L.props ? L.props[o] : (H = L.type.defaultProps) === null || H === void 0 ? void 0 : H[o];
        return V === E;
      }),
      dataStartIndex: c,
      dataEndIndex: s
    }), P = C.length, T, $, R;
    fq(g.domain, O, x) && (T = Of(g.domain, null, O), h && (x === "number" || b !== "auto") && (R = kn(C, w, "category")));
    var I = ZO(x);
    if (!T || T.length === 0) {
      var k, q = (k = g.domain) !== null && k !== void 0 ? k : I;
      if (w) {
        if (T = kn(C, w, x), x === "category" && h) {
          var W = F_(T);
          y && W ? ($ = T, T = ka(0, P)) : y || (T = dg(q, T, v).reduce(function(L, H) {
            return L.indexOf(H) >= 0 ? L : [].concat(dn(L), [H]);
          }, []));
        } else if (x === "category")
          y ? T = T.filter(function(L) {
            return L !== "" && !ie(L);
          }) : T = dg(q, T, v).reduce(function(L, H) {
            return L.indexOf(H) >= 0 || H === "" || ie(H) ? L : [].concat(dn(L), [H]);
          }, []);
        else if (x === "number") {
          var K = Q$(C, i.filter(function(L) {
            var H, V, J = o in L.props ? L.props[o] : (H = L.type.defaultProps) === null || H === void 0 ? void 0 : H[o], Q = "hide" in L.props ? L.props.hide : (V = L.type.defaultProps) === null || V === void 0 ? void 0 : V.hide;
            return J === E && (A || !Q);
          }), w, a, f);
          K && (T = K);
        }
        h && (x === "number" || b !== "auto") && (R = kn(C, w, "category"));
      } else h ? T = ka(0, P) : u && u[E] && u[E].hasStack && x === "number" ? T = d === "expand" ? [0, 1] : Rw(u[E].stackGroups, c, s) : T = Tw(C, i.filter(function(L) {
        var H = o in L.props ? L.props[o] : L.type.defaultProps[o], V = "hide" in L.props ? L.props.hide : L.type.defaultProps.hide;
        return H === E && (A || !V);
      }), x, f, !0);
      if (x === "number")
        T = od(l, T, E, a, _), q && (T = Of(q, T, O));
      else if (x === "category" && q) {
        var M = q, N = T.every(function(L) {
          return M.indexOf(L) >= 0;
        });
        N && (T = M);
      }
    }
    return D(D({}, m), {}, ee({}, E, D(D({}, g), {}, {
      axisType: a,
      domain: T,
      categoricalDomain: R,
      duplicateDomain: $,
      originalDomain: (p = g.domain) !== null && p !== void 0 ? p : I,
      isCategorical: h,
      layout: f
    })));
  }, {});
}, Bq = function(t, r) {
  var n = r.graphicalItems, i = r.Axis, a = r.axisType, o = r.axisIdKey, u = r.stackGroups, c = r.dataStartIndex, s = r.dataEndIndex, f = t.layout, l = t.children, d = Mo(t.data, {
    graphicalItems: n,
    dataStartIndex: c,
    dataEndIndex: s
  }), h = d.length, m = jw(f, a), v = -1;
  return n.reduce(function(p, g) {
    var x = g.type.defaultProps !== void 0 ? D(D({}, g.type.defaultProps), g.props) : g.props, w = x[o], O = ZO("number");
    if (!p[w]) {
      v++;
      var y;
      return m ? y = ka(0, h) : u && u[w] && u[w].hasStack ? (y = Rw(u[w].stackGroups, c, s), y = od(l, y, w, a)) : (y = Of(O, Tw(d, n.filter(function(b) {
        var _, A, E = o in b.props ? b.props[o] : (_ = b.type.defaultProps) === null || _ === void 0 ? void 0 : _[o], C = "hide" in b.props ? b.props.hide : (A = b.type.defaultProps) === null || A === void 0 ? void 0 : A.hide;
        return E === w && !C;
      }), "number", f), i.defaultProps.allowDataOverflow), y = od(l, y, w, a)), D(D({}, p), {}, ee({}, w, D(D({
        axisType: a
      }, i.defaultProps), {}, {
        hide: !0,
        orientation: Je(kq, "".concat(a, ".").concat(v % 2), null),
        domain: y,
        originalDomain: O,
        isCategorical: m,
        layout: f
        // specify scale when no Axis
        // scale: isCategorical ? 'band' : 'linear',
      })));
    }
    return p;
  }, {});
}, Fq = function(t, r) {
  var n = r.axisType, i = n === void 0 ? "xAxis" : n, a = r.AxisComp, o = r.graphicalItems, u = r.stackGroups, c = r.dataStartIndex, s = r.dataEndIndex, f = t.children, l = "".concat(i, "Id"), d = Qe(f, a), h = {};
  return d && d.length ? h = Lq(t, {
    axes: d,
    graphicalItems: o,
    axisType: i,
    axisIdKey: l,
    stackGroups: u,
    dataStartIndex: c,
    dataEndIndex: s
  }) : o && o.length && (h = Bq(t, {
    Axis: a,
    graphicalItems: o,
    axisType: i,
    axisIdKey: l,
    stackGroups: u,
    dataStartIndex: c,
    dataEndIndex: s
  })), h;
}, zq = function(t) {
  var r = Ft(t), n = Tt(r, !1, !0);
  return {
    tooltipTicks: n,
    orderedTooltipTicks: $d(n, function(i) {
      return i.coordinate;
    }),
    tooltipAxis: r,
    tooltipAxisBandSize: Oa(r, n)
  };
}, _0 = function(t) {
  var r = t.children, n = t.defaultShowTooltip, i = Ye(r, Qr), a = 0, o = 0;
  return t.data && t.data.length !== 0 && (o = t.data.length - 1), i && i.props && (i.props.startIndex >= 0 && (a = i.props.startIndex), i.props.endIndex >= 0 && (o = i.props.endIndex)), {
    chartX: 0,
    chartY: 0,
    dataStartIndex: a,
    dataEndIndex: o,
    activeTooltipIndex: -1,
    isTooltipActive: !!n
  };
}, Wq = function(t) {
  return !t || !t.length ? !1 : t.some(function(r) {
    var n = jt(r && r.type);
    return n && n.indexOf("Bar") >= 0;
  });
}, A0 = function(t) {
  return t === "horizontal" ? {
    numericAxisName: "yAxis",
    cateAxisName: "xAxis"
  } : t === "vertical" ? {
    numericAxisName: "xAxis",
    cateAxisName: "yAxis"
  } : t === "centric" ? {
    numericAxisName: "radiusAxis",
    cateAxisName: "angleAxis"
  } : {
    numericAxisName: "angleAxis",
    cateAxisName: "radiusAxis"
  };
}, Uq = function(t, r) {
  var n = t.props, i = t.graphicalItems, a = t.xAxisMap, o = a === void 0 ? {} : a, u = t.yAxisMap, c = u === void 0 ? {} : u, s = n.width, f = n.height, l = n.children, d = n.margin || {}, h = Ye(l, Qr), m = Ye(l, ht), v = Object.keys(c).reduce(function(y, b) {
    var _ = c[b], A = _.orientation;
    return !_.mirror && !_.hide ? D(D({}, y), {}, ee({}, A, y[A] + _.width)) : y;
  }, {
    left: d.left || 0,
    right: d.right || 0
  }), p = Object.keys(o).reduce(function(y, b) {
    var _ = o[b], A = _.orientation;
    return !_.mirror && !_.hide ? D(D({}, y), {}, ee({}, A, Je(y, "".concat(A)) + _.height)) : y;
  }, {
    top: d.top || 0,
    bottom: d.bottom || 0
  }), g = D(D({}, p), v), x = g.bottom;
  h && (g.bottom += h.props.height || Qr.defaultProps.height), m && r && (g = Z$(g, i, n, r));
  var w = s - g.left - g.right, O = f - g.top - g.bottom;
  return D(D({
    brushBottom: x
  }, g), {}, {
    // never return negative values for height and width
    width: Math.max(w, 0),
    height: Math.max(O, 0)
  });
}, Kq = function(t, r) {
  if (r === "xAxis")
    return t[r].width;
  if (r === "yAxis")
    return t[r].height;
}, Io = function(t) {
  var r = t.chartName, n = t.GraphicalChild, i = t.defaultTooltipEventType, a = i === void 0 ? "axis" : i, o = t.validateTooltipEventTypes, u = o === void 0 ? ["axis"] : o, c = t.axisComponents, s = t.legendContent, f = t.formatAxisMap, l = t.defaultProps, d = function(g, x) {
    var w = x.graphicalItems, O = x.stackGroups, y = x.offset, b = x.updateId, _ = x.dataStartIndex, A = x.dataEndIndex, E = g.barSize, C = g.layout, P = g.barGap, T = g.barCategoryGap, $ = g.maxBarSize, R = A0(C), I = R.numericAxisName, k = R.cateAxisName, q = Wq(w), W = [];
    return w.forEach(function(K, M) {
      var N = Mo(g.data, {
        graphicalItems: [K],
        dataStartIndex: _,
        dataEndIndex: A
      }), L = K.type.defaultProps !== void 0 ? D(D({}, K.type.defaultProps), K.props) : K.props, H = L.dataKey, V = L.maxBarSize, J = L["".concat(I, "Id")], Q = L["".concat(k, "Id")], ne = {}, re = c.reduce(function(Qt, _t) {
        var Ro, ko, Do = x["".concat(_t.axisType, "Map")], vp = L["".concat(_t.axisType, "Id")];
        Do && Do[vp] || _t.axisType === "zAxis" || (process.env.NODE_ENV !== "production" ? Ke(!1, "Specifying a(n) ".concat(_t.axisType, "Id requires a corresponding ").concat(
          _t.axisType,
          "Id on the targeted graphical component "
        ).concat((Ro = K == null || (ko = K.type) === null || ko === void 0 ? void 0 : ko.displayName) !== null && Ro !== void 0 ? Ro : "")) : Ke());
        var yp = Do[vp];
        return D(D({}, Qt), {}, ee(ee({}, _t.axisType, yp), "".concat(_t.axisType, "Ticks"), Tt(yp)));
      }, ne), B = re[k], G = re["".concat(k, "Ticks")], Z = O && O[J] && O[J].hasStack && cC(K, O[J].stackGroups), j = jt(K.type).indexOf("Bar") >= 0, ce = Oa(B, G), U = [], ge = q && Y$({
        barSize: E,
        stackGroups: O,
        totalSize: Kq(re, k)
      });
      if (j) {
        var _e, Ne, qt = ie(V) ? $ : V, Pr = (_e = (Ne = Oa(B, G, !0)) !== null && Ne !== void 0 ? Ne : qt) !== null && _e !== void 0 ? _e : 0;
        U = X$({
          barGap: P,
          barCategoryGap: T,
          bandSize: Pr !== ce ? Pr : ce,
          sizeList: ge[Q],
          maxBarSize: qt
        }), Pr !== ce && (U = U.map(function(Qt) {
          return D(D({}, Qt), {}, {
            position: D(D({}, Qt.position), {}, {
              offset: Qt.position.offset - Pr / 2
            })
          });
        }));
      }
      var ji = K && K.type && K.type.getComposedData;
      ji && W.push({
        props: D(D({}, ji(D(D({}, re), {}, {
          displayedData: N,
          props: g,
          dataKey: H,
          item: K,
          bandSize: ce,
          barPosition: U,
          offset: y,
          stackedData: Z,
          layout: C,
          dataStartIndex: _,
          dataEndIndex: A
        }))), {}, ee(ee(ee({
          key: K.key || "item-".concat(M)
        }, I, re[I]), k, re[k]), "animationId", b)),
        childIndex: Q_(K, g.children),
        item: K
      });
    }), W;
  }, h = function(g, x) {
    var w = g.props, O = g.dataStartIndex, y = g.dataEndIndex, b = g.updateId;
    if (!Eh({
      props: w
    }))
      return null;
    var _ = w.children, A = w.layout, E = w.stackOffset, C = w.data, P = w.reverseStackOrder, T = A0(A), $ = T.numericAxisName, R = T.cateAxisName, I = Qe(_, n), k = oC(C, I, "".concat($, "Id"), "".concat(R, "Id"), E, P), q = c.reduce(function(L, H) {
      var V = "".concat(H.axisType, "Map");
      return D(D({}, L), {}, ee({}, V, Fq(w, D(D({}, H), {}, {
        graphicalItems: I,
        stackGroups: H.axisType === $ && k,
        dataStartIndex: O,
        dataEndIndex: y
      }))));
    }, {}), W = Uq(D(D({}, q), {}, {
      props: w,
      graphicalItems: I
    }), x == null ? void 0 : x.legendBBox);
    Object.keys(q).forEach(function(L) {
      q[L] = f(w, q[L], W, L.replace("Map", ""), r);
    });
    var K = q["".concat(R, "Map")], M = zq(K), N = d(w, D(D({}, q), {}, {
      dataStartIndex: O,
      dataEndIndex: y,
      updateId: b,
      graphicalItems: I,
      stackGroups: k,
      offset: W
    }));
    return D(D({
      formattedGraphicalItems: N,
      graphicalItems: I,
      offset: W,
      stackGroups: k
    }, M), q);
  }, m = /* @__PURE__ */ (function(p) {
    function g(x) {
      var w, O, y;
      return Aq(this, g), y = Eq(this, g, [x]), ee(y, "eventEmitterSymbol", Symbol("rechartsEventEmitter")), ee(y, "accessibilityManager", new lq()), ee(y, "handleLegendBBoxUpdate", function(b) {
        if (b) {
          var _ = y.state, A = _.dataStartIndex, E = _.dataEndIndex, C = _.updateId;
          y.setState(D({
            legendBBox: b
          }, h({
            props: y.props,
            dataStartIndex: A,
            dataEndIndex: E,
            updateId: C
          }, D(D({}, y.state), {}, {
            legendBBox: b
          }))));
        }
      }), ee(y, "handleReceiveSyncEvent", function(b, _, A) {
        if (y.props.syncId === b) {
          if (A === y.eventEmitterSymbol && typeof y.props.syncMethod != "function")
            return;
          y.applySyncEvent(_);
        }
      }), ee(y, "handleBrushChange", function(b) {
        var _ = b.startIndex, A = b.endIndex;
        if (_ !== y.state.dataStartIndex || A !== y.state.dataEndIndex) {
          var E = y.state.updateId;
          y.setState(function() {
            return D({
              dataStartIndex: _,
              dataEndIndex: A
            }, h({
              props: y.props,
              dataStartIndex: _,
              dataEndIndex: A,
              updateId: E
            }, y.state));
          }), y.triggerSyncEvent({
            dataStartIndex: _,
            dataEndIndex: A
          });
        }
      }), ee(y, "handleMouseEnter", function(b) {
        var _ = y.getMouseInfo(b);
        if (_) {
          var A = D(D({}, _), {}, {
            isTooltipActive: !0
          });
          y.setState(A), y.triggerSyncEvent(A);
          var E = y.props.onMouseEnter;
          te(E) && E(A, b);
        }
      }), ee(y, "triggeredAfterMouseMove", function(b) {
        var _ = y.getMouseInfo(b), A = _ ? D(D({}, _), {}, {
          isTooltipActive: !0
        }) : {
          isTooltipActive: !1
        };
        y.setState(A), y.triggerSyncEvent(A);
        var E = y.props.onMouseMove;
        te(E) && E(A, b);
      }), ee(y, "handleItemMouseEnter", function(b) {
        y.setState(function() {
          return {
            isTooltipActive: !0,
            activeItem: b,
            activePayload: b.tooltipPayload,
            activeCoordinate: b.tooltipPosition || {
              x: b.cx,
              y: b.cy
            }
          };
        });
      }), ee(y, "handleItemMouseLeave", function() {
        y.setState(function() {
          return {
            isTooltipActive: !1
          };
        });
      }), ee(y, "handleMouseMove", function(b) {
        b.persist(), y.throttleTriggeredAfterMouseMove(b);
      }), ee(y, "handleMouseLeave", function(b) {
        y.throttleTriggeredAfterMouseMove.cancel();
        var _ = {
          isTooltipActive: !1
        };
        y.setState(_), y.triggerSyncEvent(_);
        var A = y.props.onMouseLeave;
        te(A) && A(_, b);
      }), ee(y, "handleOuterEvent", function(b) {
        var _ = J_(b), A = Je(y.props, "".concat(_));
        if (_ && te(A)) {
          var E, C;
          /.*touch.*/i.test(_) ? C = y.getMouseInfo(b.changedTouches[0]) : C = y.getMouseInfo(b), A((E = C) !== null && E !== void 0 ? E : {}, b);
        }
      }), ee(y, "handleClick", function(b) {
        var _ = y.getMouseInfo(b);
        if (_) {
          var A = D(D({}, _), {}, {
            isTooltipActive: !0
          });
          y.setState(A), y.triggerSyncEvent(A);
          var E = y.props.onClick;
          te(E) && E(A, b);
        }
      }), ee(y, "handleMouseDown", function(b) {
        var _ = y.props.onMouseDown;
        if (te(_)) {
          var A = y.getMouseInfo(b);
          _(A, b);
        }
      }), ee(y, "handleMouseUp", function(b) {
        var _ = y.props.onMouseUp;
        if (te(_)) {
          var A = y.getMouseInfo(b);
          _(A, b);
        }
      }), ee(y, "handleTouchMove", function(b) {
        b.changedTouches != null && b.changedTouches.length > 0 && y.throttleTriggeredAfterMouseMove(b.changedTouches[0]);
      }), ee(y, "handleTouchStart", function(b) {
        b.changedTouches != null && b.changedTouches.length > 0 && y.handleMouseDown(b.changedTouches[0]);
      }), ee(y, "handleTouchEnd", function(b) {
        b.changedTouches != null && b.changedTouches.length > 0 && y.handleMouseUp(b.changedTouches[0]);
      }), ee(y, "handleDoubleClick", function(b) {
        var _ = y.props.onDoubleClick;
        if (te(_)) {
          var A = y.getMouseInfo(b);
          _(A, b);
        }
      }), ee(y, "handleContextMenu", function(b) {
        var _ = y.props.onContextMenu;
        if (te(_)) {
          var A = y.getMouseInfo(b);
          _(A, b);
        }
      }), ee(y, "triggerSyncEvent", function(b) {
        y.props.syncId !== void 0 && ql.emit(Ll, y.props.syncId, b, y.eventEmitterSymbol);
      }), ee(y, "applySyncEvent", function(b) {
        var _ = y.props, A = _.layout, E = _.syncMethod, C = y.state.updateId, P = b.dataStartIndex, T = b.dataEndIndex;
        if (b.dataStartIndex !== void 0 || b.dataEndIndex !== void 0)
          y.setState(D({
            dataStartIndex: P,
            dataEndIndex: T
          }, h({
            props: y.props,
            dataStartIndex: P,
            dataEndIndex: T,
            updateId: C
          }, y.state)));
        else if (b.activeTooltipIndex !== void 0) {
          var $ = b.chartX, R = b.chartY, I = b.activeTooltipIndex, k = y.state, q = k.offset, W = k.tooltipTicks;
          if (!q)
            return;
          if (typeof E == "function")
            I = E(W, b);
          else if (E === "value") {
            I = -1;
            for (var K = 0; K < W.length; K++)
              if (W[K].value === b.activeLabel) {
                I = K;
                break;
              }
          }
          var M = D(D({}, q), {}, {
            x: q.left,
            y: q.top
          }), N = Math.min($, M.x + M.width), L = Math.min(R, M.y + M.height), H = W[I] && W[I].value, V = sd(y.state, y.props.data, I), J = W[I] ? {
            x: A === "horizontal" ? W[I].coordinate : N,
            y: A === "horizontal" ? L : W[I].coordinate
          } : XO;
          y.setState(D(D({}, b), {}, {
            activeLabel: H,
            activeCoordinate: J,
            activePayload: V,
            activeTooltipIndex: I
          }));
        } else
          y.setState(b);
      }), ee(y, "renderCursor", function(b) {
        var _, A = y.state, E = A.isTooltipActive, C = A.activeCoordinate, P = A.activePayload, T = A.offset, $ = A.activeTooltipIndex, R = A.tooltipAxisBandSize, I = y.getTooltipEventType(), k = (_ = b.props.active) !== null && _ !== void 0 ? _ : E, q = y.props.layout, W = b.key || "_recharts-cursor";
        return /* @__PURE__ */ S.createElement(mq, {
          key: W,
          activeCoordinate: C,
          activePayload: P,
          activeTooltipIndex: $,
          chartName: r,
          element: b,
          isActive: k,
          layout: q,
          offset: T,
          tooltipAxisBandSize: R,
          tooltipEventType: I
        });
      }), ee(y, "renderPolarAxis", function(b, _, A) {
        var E = Je(b, "type.axisType"), C = Je(y.state, "".concat(E, "Map")), P = b.type.defaultProps, T = P !== void 0 ? D(D({}, P), b.props) : b.props, $ = C && C[T["".concat(E, "Id")]];
        return /* @__PURE__ */ F.cloneElement(b, D(D({}, $), {}, {
          className: ae(E, $.className),
          key: b.key || "".concat(_, "-").concat(A),
          ticks: Tt($, !0)
        }));
      }), ee(y, "renderPolarGrid", function(b) {
        var _ = b.props, A = _.radialLines, E = _.polarAngles, C = _.polarRadius, P = y.state, T = P.radiusAxisMap, $ = P.angleAxisMap, R = Ft(T), I = Ft($), k = I.cx, q = I.cy, W = I.innerRadius, K = I.outerRadius;
        return /* @__PURE__ */ F.cloneElement(b, {
          polarAngles: Array.isArray(E) ? E : Tt(I, !0).map(function(M) {
            return M.coordinate;
          }),
          polarRadius: Array.isArray(C) ? C : Tt(R, !0).map(function(M) {
            return M.coordinate;
          }),
          cx: k,
          cy: q,
          innerRadius: W,
          outerRadius: K,
          key: b.key || "polar-grid",
          radialLines: A
        });
      }), ee(y, "renderLegend", function() {
        var b = y.state.formattedGraphicalItems, _ = y.props, A = _.children, E = _.width, C = _.height, P = y.props.margin || {}, T = E - (P.left || 0) - (P.right || 0), $ = Pw({
          children: A,
          formattedGraphicalItems: b,
          legendWidth: T,
          legendContent: s
        });
        if (!$)
          return null;
        var R = $.item, I = x0($, gq);
        return /* @__PURE__ */ F.cloneElement(R, D(D({}, I), {}, {
          chartWidth: E,
          chartHeight: C,
          margin: P,
          onBBoxUpdate: y.handleLegendBBoxUpdate
        }));
      }), ee(y, "renderTooltip", function() {
        var b, _ = y.props, A = _.children, E = _.accessibilityLayer, C = Ye(A, Xe);
        if (!C)
          return null;
        var P = y.state, T = P.isTooltipActive, $ = P.activeCoordinate, R = P.activePayload, I = P.activeLabel, k = P.offset, q = (b = C.props.active) !== null && b !== void 0 ? b : T;
        return /* @__PURE__ */ F.cloneElement(C, {
          viewBox: D(D({}, k), {}, {
            x: k.left,
            y: k.top
          }),
          active: q,
          label: I,
          payload: q ? R : [],
          coordinate: $,
          accessibilityLayer: E
        });
      }), ee(y, "renderBrush", function(b) {
        var _ = y.props, A = _.margin, E = _.data, C = y.state, P = C.offset, T = C.dataStartIndex, $ = C.dataEndIndex, R = C.updateId;
        return /* @__PURE__ */ F.cloneElement(b, {
          key: b.key || "_recharts-brush",
          onChange: Bi(y.handleBrushChange, b.props.onChange),
          data: E,
          x: z(b.props.x) ? b.props.x : P.left,
          y: z(b.props.y) ? b.props.y : P.top + P.height + P.brushBottom - (A.bottom || 0),
          width: z(b.props.width) ? b.props.width : P.width,
          startIndex: T,
          endIndex: $,
          updateId: "brush-".concat(R)
        });
      }), ee(y, "renderReferenceElement", function(b, _, A) {
        if (!b)
          return null;
        var E = y, C = E.clipPathId, P = y.state, T = P.xAxisMap, $ = P.yAxisMap, R = P.offset, I = b.type.defaultProps || {}, k = b.props, q = k.xAxisId, W = q === void 0 ? I.xAxisId : q, K = k.yAxisId, M = K === void 0 ? I.yAxisId : K;
        return /* @__PURE__ */ F.cloneElement(b, {
          key: b.key || "".concat(_, "-").concat(A),
          xAxis: T[W],
          yAxis: $[M],
          viewBox: {
            x: R.left,
            y: R.top,
            width: R.width,
            height: R.height
          },
          clipPathId: C
        });
      }), ee(y, "renderActivePoints", function(b) {
        var _ = b.item, A = b.activePoint, E = b.basePoint, C = b.childIndex, P = b.isRange, T = [], $ = _.props.key, R = _.item.type.defaultProps !== void 0 ? D(D({}, _.item.type.defaultProps), _.item.props) : _.item.props, I = R.activeDot, k = R.dataKey, q = D(D({
          index: C,
          dataKey: k,
          cx: A.x,
          cy: A.y,
          r: 4,
          fill: rp(_.item),
          strokeWidth: 2,
          stroke: "#fff",
          payload: A.payload,
          value: A.value
        }, X(I, !1)), Zi(I));
        return T.push(g.renderActiveDot(I, q, "".concat($, "-activePoint-").concat(C))), E ? T.push(g.renderActiveDot(I, D(D({}, q), {}, {
          cx: E.x,
          cy: E.y
        }), "".concat($, "-basePoint-").concat(C))) : P && T.push(null), T;
      }), ee(y, "renderGraphicChild", function(b, _, A) {
        var E = y.filterFormatItem(b, _, A);
        if (!E)
          return null;
        var C = y.getTooltipEventType(), P = y.state, T = P.isTooltipActive, $ = P.tooltipAxis, R = P.activeTooltipIndex, I = P.activeLabel, k = y.props.children, q = Ye(k, Xe), W = E.props, K = W.points, M = W.isRange, N = W.baseLine, L = E.item.type.defaultProps !== void 0 ? D(D({}, E.item.type.defaultProps), E.item.props) : E.item.props, H = L.activeDot, V = L.hide, J = L.activeBar, Q = L.activeShape, ne = !!(!V && T && q && (H || J || Q)), re = {};
        C !== "axis" && q && q.props.trigger === "click" ? re = {
          onClick: Bi(y.handleItemMouseEnter, b.props.onClick)
        } : C !== "axis" && (re = {
          onMouseLeave: Bi(y.handleItemMouseLeave, b.props.onMouseLeave),
          onMouseEnter: Bi(y.handleItemMouseEnter, b.props.onMouseEnter)
        });
        var B = /* @__PURE__ */ F.cloneElement(b, D(D({}, E.props), re));
        function G(_t) {
          return typeof $.dataKey == "function" ? $.dataKey(_t.payload) : null;
        }
        if (ne)
          if (R >= 0) {
            var Z, j;
            if ($.dataKey && !$.allowDuplicatedCategory) {
              var ce = typeof $.dataKey == "function" ? G : "payload.".concat($.dataKey.toString());
              Z = Xi(K, ce, I), j = M && N && Xi(N, ce, I);
            } else
              Z = K == null ? void 0 : K[R], j = M && N && N[R];
            if (Q || J) {
              var U = b.props.activeIndex !== void 0 ? b.props.activeIndex : R;
              return [/* @__PURE__ */ F.cloneElement(b, D(D(D({}, E.props), re), {}, {
                activeIndex: U
              })), null, null];
            }
            if (!ie(Z))
              return [B].concat(dn(y.renderActivePoints({
                item: E,
                activePoint: Z,
                basePoint: j,
                childIndex: R,
                isRange: M
              })));
          } else {
            var ge, _e = (ge = y.getItemByXY(y.state.activeCoordinate)) !== null && ge !== void 0 ? ge : {
              graphicalItem: B
            }, Ne = _e.graphicalItem, qt = Ne.item, Pr = qt === void 0 ? b : qt, ji = Ne.childIndex, Qt = D(D(D({}, E.props), re), {}, {
              activeIndex: ji
            });
            return [/* @__PURE__ */ F.cloneElement(Pr, Qt), null, null];
          }
        return M ? [B, null, null] : [B, null];
      }), ee(y, "renderCustomized", function(b, _, A) {
        return /* @__PURE__ */ F.cloneElement(b, D(D({
          key: "recharts-customized-".concat(A)
        }, y.props), y.state));
      }), ee(y, "renderMap", {
        CartesianGrid: {
          handler: Gi,
          once: !0
        },
        ReferenceArea: {
          handler: y.renderReferenceElement
        },
        ReferenceLine: {
          handler: Gi
        },
        ReferenceDot: {
          handler: y.renderReferenceElement
        },
        XAxis: {
          handler: Gi
        },
        YAxis: {
          handler: Gi
        },
        Brush: {
          handler: y.renderBrush,
          once: !0
        },
        Bar: {
          handler: y.renderGraphicChild
        },
        Line: {
          handler: y.renderGraphicChild
        },
        Area: {
          handler: y.renderGraphicChild
        },
        Radar: {
          handler: y.renderGraphicChild
        },
        RadialBar: {
          handler: y.renderGraphicChild
        },
        Scatter: {
          handler: y.renderGraphicChild
        },
        Pie: {
          handler: y.renderGraphicChild
        },
        Funnel: {
          handler: y.renderGraphicChild
        },
        Tooltip: {
          handler: y.renderCursor,
          once: !0
        },
        PolarGrid: {
          handler: y.renderPolarGrid,
          once: !0
        },
        PolarAngleAxis: {
          handler: y.renderPolarAxis
        },
        PolarRadiusAxis: {
          handler: y.renderPolarAxis
        },
        Customized: {
          handler: y.renderCustomized
        }
      }), y.clipPathId = "".concat((w = x.id) !== null && w !== void 0 ? w : wr("recharts"), "-clip"), y.throttleTriggeredAfterMouseMove = Sx(y.triggeredAfterMouseMove, (O = x.throttleDelay) !== null && O !== void 0 ? O : 1e3 / 60), y.state = {}, y;
    }
    return $q(g, p), Pq(g, [{
      key: "componentDidMount",
      value: function() {
        var w, O;
        this.addListener(), this.accessibilityManager.setDetails({
          container: this.container,
          offset: {
            left: (w = this.props.margin.left) !== null && w !== void 0 ? w : 0,
            top: (O = this.props.margin.top) !== null && O !== void 0 ? O : 0
          },
          coordinateList: this.state.tooltipTicks,
          mouseHandlerCallback: this.triggeredAfterMouseMove,
          layout: this.props.layout
        }), this.displayDefaultTooltip();
      }
    }, {
      key: "displayDefaultTooltip",
      value: function() {
        var w = this.props, O = w.children, y = w.data, b = w.height, _ = w.layout, A = Ye(O, Xe);
        if (A) {
          var E = A.props.defaultIndex;
          if (!(typeof E != "number" || E < 0 || E > this.state.tooltipTicks.length - 1)) {
            var C = this.state.tooltipTicks[E] && this.state.tooltipTicks[E].value, P = sd(this.state, y, E, C), T = this.state.tooltipTicks[E].coordinate, $ = (this.state.offset.top + b) / 2, R = _ === "horizontal", I = R ? {
              x: T,
              y: $
            } : {
              y: T,
              x: $
            }, k = this.state.formattedGraphicalItems.find(function(W) {
              var K = W.item;
              return K.type.name === "Scatter";
            });
            k && (I = D(D({}, I), k.props.points[E].tooltipPosition), P = k.props.points[E].tooltipPayload);
            var q = {
              activeTooltipIndex: E,
              isTooltipActive: !0,
              activeLabel: C,
              activePayload: P,
              activeCoordinate: I
            };
            this.setState(q), this.renderCursor(A), this.accessibilityManager.setIndex(E);
          }
        }
      }
    }, {
      key: "getSnapshotBeforeUpdate",
      value: function(w, O) {
        if (!this.props.accessibilityLayer)
          return null;
        if (this.state.tooltipTicks !== O.tooltipTicks && this.accessibilityManager.setDetails({
          coordinateList: this.state.tooltipTicks
        }), this.props.layout !== w.layout && this.accessibilityManager.setDetails({
          layout: this.props.layout
        }), this.props.margin !== w.margin) {
          var y, b;
          this.accessibilityManager.setDetails({
            offset: {
              left: (y = this.props.margin.left) !== null && y !== void 0 ? y : 0,
              top: (b = this.props.margin.top) !== null && b !== void 0 ? b : 0
            }
          });
        }
        return null;
      }
    }, {
      key: "componentDidUpdate",
      value: function(w) {
        Wl([Ye(w.children, Xe)], [Ye(this.props.children, Xe)]) || this.displayDefaultTooltip();
      }
    }, {
      key: "componentWillUnmount",
      value: function() {
        this.removeListener(), this.throttleTriggeredAfterMouseMove.cancel();
      }
    }, {
      key: "getTooltipEventType",
      value: function() {
        var w = Ye(this.props.children, Xe);
        if (w && typeof w.props.shared == "boolean") {
          var O = w.props.shared ? "axis" : "item";
          return u.indexOf(O) >= 0 ? O : a;
        }
        return a;
      }
      /**
       * Get the information of mouse in chart, return null when the mouse is not in the chart
       * @param  {MousePointer} event    The event object
       * @return {Object}          Mouse data
       */
    }, {
      key: "getMouseInfo",
      value: function(w) {
        if (!this.container)
          return null;
        var O = this.container, y = O.getBoundingClientRect(), b = BP(y), _ = {
          chartX: Math.round(w.pageX - b.left),
          chartY: Math.round(w.pageY - b.top)
        }, A = y.width / O.offsetWidth || 1, E = this.inRange(_.chartX, _.chartY, A);
        if (!E)
          return null;
        var C = this.state, P = C.xAxisMap, T = C.yAxisMap, $ = this.getTooltipEventType(), R = O0(this.state, this.props.data, this.props.layout, E);
        if ($ !== "axis" && P && T) {
          var I = Ft(P).scale, k = Ft(T).scale, q = I && I.invert ? I.invert(_.chartX) : null, W = k && k.invert ? k.invert(_.chartY) : null;
          return D(D({}, _), {}, {
            xValue: q,
            yValue: W
          }, R);
        }
        return R ? D(D({}, _), R) : null;
      }
    }, {
      key: "inRange",
      value: function(w, O) {
        var y = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1, b = this.props.layout, _ = w / y, A = O / y;
        if (b === "horizontal" || b === "vertical") {
          var E = this.state.offset, C = _ >= E.left && _ <= E.left + E.width && A >= E.top && A <= E.top + E.height;
          return C ? {
            x: _,
            y: A
          } : null;
        }
        var P = this.state, T = P.angleAxisMap, $ = P.radiusAxisMap;
        if (T && $) {
          var R = Ft(T);
          return vg({
            x: _,
            y: A
          }, R);
        }
        return null;
      }
    }, {
      key: "parseEventsOfWrapper",
      value: function() {
        var w = this.props.children, O = this.getTooltipEventType(), y = Ye(w, Xe), b = {};
        y && O === "axis" && (y.props.trigger === "click" ? b = {
          onClick: this.handleClick
        } : b = {
          onMouseEnter: this.handleMouseEnter,
          onDoubleClick: this.handleDoubleClick,
          onMouseMove: this.handleMouseMove,
          onMouseLeave: this.handleMouseLeave,
          onTouchMove: this.handleTouchMove,
          onTouchStart: this.handleTouchStart,
          onTouchEnd: this.handleTouchEnd,
          onContextMenu: this.handleContextMenu
        });
        var _ = Zi(this.props, this.handleOuterEvent);
        return D(D({}, _), b);
      }
    }, {
      key: "addListener",
      value: function() {
        ql.on(Ll, this.handleReceiveSyncEvent);
      }
    }, {
      key: "removeListener",
      value: function() {
        ql.removeListener(Ll, this.handleReceiveSyncEvent);
      }
    }, {
      key: "filterFormatItem",
      value: function(w, O, y) {
        for (var b = this.state.formattedGraphicalItems, _ = 0, A = b.length; _ < A; _++) {
          var E = b[_];
          if (E.item === w || E.props.key === w.key || O === jt(E.item.type) && y === E.childIndex)
            return E;
        }
        return null;
      }
    }, {
      key: "renderClipPath",
      value: function() {
        var w = this.clipPathId, O = this.state.offset, y = O.left, b = O.top, _ = O.height, A = O.width;
        return /* @__PURE__ */ S.createElement("defs", null, /* @__PURE__ */ S.createElement("clipPath", {
          id: w
        }, /* @__PURE__ */ S.createElement("rect", {
          x: y,
          y: b,
          height: _,
          width: A
        })));
      }
    }, {
      key: "getXScales",
      value: function() {
        var w = this.state.xAxisMap;
        return w ? Object.entries(w).reduce(function(O, y) {
          var b = b0(y, 2), _ = b[0], A = b[1];
          return D(D({}, O), {}, ee({}, _, A.scale));
        }, {}) : null;
      }
    }, {
      key: "getYScales",
      value: function() {
        var w = this.state.yAxisMap;
        return w ? Object.entries(w).reduce(function(O, y) {
          var b = b0(y, 2), _ = b[0], A = b[1];
          return D(D({}, O), {}, ee({}, _, A.scale));
        }, {}) : null;
      }
    }, {
      key: "getXScaleByAxisId",
      value: function(w) {
        var O;
        return (O = this.state.xAxisMap) === null || O === void 0 || (O = O[w]) === null || O === void 0 ? void 0 : O.scale;
      }
    }, {
      key: "getYScaleByAxisId",
      value: function(w) {
        var O;
        return (O = this.state.yAxisMap) === null || O === void 0 || (O = O[w]) === null || O === void 0 ? void 0 : O.scale;
      }
    }, {
      key: "getItemByXY",
      value: function(w) {
        var O = this.state, y = O.formattedGraphicalItems, b = O.activeItem;
        if (y && y.length)
          for (var _ = 0, A = y.length; _ < A; _++) {
            var E = y[_], C = E.props, P = E.item, T = P.type.defaultProps !== void 0 ? D(D({}, P.type.defaultProps), P.props) : P.props, $ = jt(P.type);
            if ($ === "Bar") {
              var R = (C.data || []).find(function(W) {
                return sR(w, W);
              });
              if (R)
                return {
                  graphicalItem: E,
                  payload: R
                };
            } else if ($ === "RadialBar") {
              var I = (C.data || []).find(function(W) {
                return vg(w, W);
              });
              if (I)
                return {
                  graphicalItem: E,
                  payload: I
                };
            } else if (So(E, b) || Po(E, b) || hi(E, b)) {
              var k = Mk({
                graphicalItem: E,
                activeTooltipItem: b,
                itemData: T.data
              }), q = T.activeIndex === void 0 ? k : T.activeIndex;
              return {
                graphicalItem: D(D({}, E), {}, {
                  childIndex: q
                }),
                payload: hi(E, b) ? T.data[k] : E.props.data[k]
              };
            }
          }
        return null;
      }
    }, {
      key: "render",
      value: function() {
        var w = this;
        if (!Eh(this))
          return null;
        var O = this.props, y = O.children, b = O.className, _ = O.width, A = O.height, E = O.style, C = O.compact, P = O.title, T = O.desc, $ = x0(O, bq), R = X($, !1);
        if (C)
          return /* @__PURE__ */ S.createElement(Jb, {
            state: this.state,
            width: this.props.width,
            height: this.props.height,
            clipPathId: this.clipPathId
          }, /* @__PURE__ */ S.createElement(Kl, kr({}, R, {
            width: _,
            height: A,
            title: P,
            desc: T
          }), this.renderClipPath(), jh(y, this.renderMap)));
        if (this.props.accessibilityLayer) {
          var I, k;
          R.tabIndex = (I = this.props.tabIndex) !== null && I !== void 0 ? I : 0, R.role = (k = this.props.role) !== null && k !== void 0 ? k : "application", R.onKeyDown = function(W) {
            w.accessibilityManager.keyboardEvent(W);
          }, R.onFocus = function() {
            w.accessibilityManager.focus();
          };
        }
        var q = this.parseEventsOfWrapper();
        return /* @__PURE__ */ S.createElement(Jb, {
          state: this.state,
          width: this.props.width,
          height: this.props.height,
          clipPathId: this.clipPathId
        }, /* @__PURE__ */ S.createElement("div", kr({
          className: ae("recharts-wrapper", b),
          style: D({
            position: "relative",
            cursor: "default",
            width: _,
            height: A
          }, E)
        }, q, {
          ref: function(K) {
            w.container = K;
          }
        }), /* @__PURE__ */ S.createElement(Kl, kr({}, R, {
          width: _,
          height: A,
          title: P,
          desc: T,
          style: Dq
        }), this.renderClipPath(), jh(y, this.renderMap)), this.renderLegend(), this.renderTooltip()));
      }
    }]);
  })(F.Component);
  ee(m, "displayName", r), ee(m, "defaultProps", D({
    layout: "horizontal",
    stackOffset: "none",
    barCategoryGap: "10%",
    barGap: 4,
    margin: {
      top: 5,
      right: 5,
      bottom: 5,
      left: 5
    },
    reverseStackOrder: !1,
    syncMethod: "index"
  }, l)), ee(m, "getDerivedStateFromProps", function(p, g) {
    var x = p.dataKey, w = p.data, O = p.children, y = p.width, b = p.height, _ = p.layout, A = p.stackOffset, E = p.margin, C = g.dataStartIndex, P = g.dataEndIndex;
    if (g.updateId === void 0) {
      var T = _0(p);
      return D(D(D({}, T), {}, {
        updateId: 0
      }, h(D(D({
        props: p
      }, T), {}, {
        updateId: 0
      }), g)), {}, {
        prevDataKey: x,
        prevData: w,
        prevWidth: y,
        prevHeight: b,
        prevLayout: _,
        prevStackOffset: A,
        prevMargin: E,
        prevChildren: O
      });
    }
    if (x !== g.prevDataKey || w !== g.prevData || y !== g.prevWidth || b !== g.prevHeight || _ !== g.prevLayout || A !== g.prevStackOffset || !Dr(E, g.prevMargin)) {
      var $ = _0(p), R = {
        // (chartX, chartY) are (0,0) in default state, but we want to keep the last mouse position to avoid
        // any flickering
        chartX: g.chartX,
        chartY: g.chartY,
        // The tooltip should stay active when it was active in the previous render. If this is not
        // the case, the tooltip disappears and immediately re-appears, causing a flickering effect
        isTooltipActive: g.isTooltipActive
      }, I = D(D({}, O0(g, w, _)), {}, {
        updateId: g.updateId + 1
      }), k = D(D(D({}, $), R), I);
      return D(D(D({}, k), h(D({
        props: p
      }, k), g)), {}, {
        prevDataKey: x,
        prevData: w,
        prevWidth: y,
        prevHeight: b,
        prevLayout: _,
        prevStackOffset: A,
        prevMargin: E,
        prevChildren: O
      });
    }
    if (!Wl(O, g.prevChildren)) {
      var q, W, K, M, N = Ye(O, Qr), L = N && (q = (W = N.props) === null || W === void 0 ? void 0 : W.startIndex) !== null && q !== void 0 ? q : C, H = N && (K = (M = N.props) === null || M === void 0 ? void 0 : M.endIndex) !== null && K !== void 0 ? K : P, V = L !== C || H !== P, J = !ie(w), Q = J && !V ? g.updateId : g.updateId + 1;
      return D(D({
        updateId: Q
      }, h(D(D({
        props: p
      }, g), {}, {
        updateId: Q,
        dataStartIndex: L,
        dataEndIndex: H
      }), g)), {}, {
        prevChildren: O,
        dataStartIndex: L,
        dataEndIndex: H
      });
    }
    return null;
  }), ee(m, "renderActiveDot", function(p, g, x) {
    var w;
    return /* @__PURE__ */ F.isValidElement(p) ? w = /* @__PURE__ */ F.cloneElement(p, g) : te(p) ? w = p(g) : w = /* @__PURE__ */ S.createElement(Ei, g), /* @__PURE__ */ S.createElement(ue, {
      className: "recharts-active-dot",
      key: x
    }, w);
  });
  var v = /* @__PURE__ */ F.forwardRef(function(g, x) {
    return /* @__PURE__ */ S.createElement(m, kr({}, g, {
      ref: x
    }));
  });
  return v.displayName = m.displayName, v;
}, Hq = Io({
  chartName: "LineChart",
  GraphicalChild: Ti,
  axisComponents: [{
    axisType: "xAxis",
    AxisComp: Kt
  }, {
    axisType: "yAxis",
    AxisComp: Ht
  }],
  formatAxisMap: ap
}), Gq = Io({
  chartName: "BarChart",
  GraphicalChild: Sr,
  defaultTooltipEventType: "axis",
  validateTooltipEventTypes: ["axis", "item"],
  axisComponents: [{
    axisType: "xAxis",
    AxisComp: Kt
  }, {
    axisType: "yAxis",
    AxisComp: Ht
  }],
  formatAxisMap: ap
}), Vq = Io({
  chartName: "PieChart",
  GraphicalChild: Nt,
  validateTooltipEventTypes: ["item"],
  defaultTooltipEventType: "item",
  legendContent: "children",
  axisComponents: [{
    axisType: "angleAxis",
    AxisComp: Ao
  }, {
    axisType: "radiusAxis",
    AxisComp: Oo
  }],
  formatAxisMap: gC,
  defaultProps: {
    layout: "centric",
    startAngle: 0,
    endAngle: 360,
    cx: "50%",
    cy: "50%",
    innerRadius: 0,
    outerRadius: "80%"
  }
}), Yq = Io({
  chartName: "AreaChart",
  GraphicalChild: Jt,
  axisComponents: [{
    axisType: "xAxis",
    AxisComp: Kt
  }, {
    axisType: "yAxis",
    AxisComp: Ht
  }],
  formatAxisMap: ap
});
const Xq = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))"
];
function Jq({ config: e }) {
  const { props: t } = e, {
    chartType: r,
    data: n = [],
    title: i,
    legend: a = !0,
    colors: o = Xq,
    height: u = 350,
    xAxisKey: c = "label",
    yAxisKey: s = "value",
    showGrid: f = !0,
    showTooltip: l = !0,
    className: d
  } = t;
  if (!n.length)
    return /* @__PURE__ */ oe.jsx("div", { className: mp("w-full flex items-center justify-center border rounded-lg", d), style: { height: u }, children: /* @__PURE__ */ oe.jsx("div", { className: "text-center text-muted-foreground", children: /* @__PURE__ */ oe.jsx("p", { children: "No data available" }) }) });
  const h = () => {
    switch (r) {
      case "bar":
        return /* @__PURE__ */ oe.jsx(ki, { width: "100%", height: u, children: /* @__PURE__ */ oe.jsxs(Gq, { data: n, children: [
          f && /* @__PURE__ */ oe.jsx(Yi, { strokeDasharray: "3 3", className: "stroke-muted" }),
          /* @__PURE__ */ oe.jsx(Kt, { dataKey: c, className: "text-xs" }),
          /* @__PURE__ */ oe.jsx(Ht, { className: "text-xs" }),
          l && /* @__PURE__ */ oe.jsx(Xe, { contentStyle: { background: "hsl(var(--background))", border: "1px solid hsl(var(--border))" } }),
          a && /* @__PURE__ */ oe.jsx(ht, {}),
          /* @__PURE__ */ oe.jsx(Sr, { dataKey: s, fill: o[0], radius: [4, 4, 0, 0] })
        ] }) });
      case "line":
        return /* @__PURE__ */ oe.jsx(ki, { width: "100%", height: u, children: /* @__PURE__ */ oe.jsxs(Hq, { data: n, children: [
          f && /* @__PURE__ */ oe.jsx(Yi, { strokeDasharray: "3 3", className: "stroke-muted" }),
          /* @__PURE__ */ oe.jsx(Kt, { dataKey: c, className: "text-xs" }),
          /* @__PURE__ */ oe.jsx(Ht, { className: "text-xs" }),
          l && /* @__PURE__ */ oe.jsx(Xe, { contentStyle: { background: "hsl(var(--background))", border: "1px solid hsl(var(--border))" } }),
          a && /* @__PURE__ */ oe.jsx(ht, {}),
          /* @__PURE__ */ oe.jsx(Ti, { type: "monotone", dataKey: s, stroke: o[0], strokeWidth: 2, dot: { r: 4 } })
        ] }) });
      case "area":
        return /* @__PURE__ */ oe.jsx(ki, { width: "100%", height: u, children: /* @__PURE__ */ oe.jsxs(Yq, { data: n, children: [
          f && /* @__PURE__ */ oe.jsx(Yi, { strokeDasharray: "3 3", className: "stroke-muted" }),
          /* @__PURE__ */ oe.jsx(Kt, { dataKey: c, className: "text-xs" }),
          /* @__PURE__ */ oe.jsx(Ht, { className: "text-xs" }),
          l && /* @__PURE__ */ oe.jsx(Xe, { contentStyle: { background: "hsl(var(--background))", border: "1px solid hsl(var(--border))" } }),
          a && /* @__PURE__ */ oe.jsx(ht, {}),
          /* @__PURE__ */ oe.jsx(Jt, { type: "monotone", dataKey: s, stroke: o[0], fill: o[0], fillOpacity: 0.3 })
        ] }) });
      case "pie":
      case "donut":
        return /* @__PURE__ */ oe.jsx(ki, { width: "100%", height: u, children: /* @__PURE__ */ oe.jsxs(Vq, { children: [
          l && /* @__PURE__ */ oe.jsx(Xe, { contentStyle: { background: "hsl(var(--background))", border: "1px solid hsl(var(--border))" } }),
          a && /* @__PURE__ */ oe.jsx(ht, {}),
          /* @__PURE__ */ oe.jsx(
            Nt,
            {
              data: n,
              dataKey: s,
              nameKey: c,
              cx: "50%",
              cy: "50%",
              innerRadius: r === "donut" ? "60%" : 0,
              outerRadius: "80%",
              fill: o[0],
              label: !0,
              children: n.map((m, v) => /* @__PURE__ */ oe.jsx(so, { fill: o[v % o.length] }, `cell-${v}`))
            }
          )
        ] }) });
      default:
        return /* @__PURE__ */ oe.jsx("div", { className: "w-full flex items-center justify-center", style: { height: u }, children: /* @__PURE__ */ oe.jsxs("p", { className: "text-muted-foreground", children: [
          "Unsupported chart type: ",
          r
        ] }) });
    }
  };
  return /* @__PURE__ */ oe.jsxs("div", { className: mp("space-y-4", d), children: [
    i && /* @__PURE__ */ oe.jsx("h3", { className: "text-lg font-semibold", children: i }),
    /* @__PURE__ */ oe.jsx("div", { className: "w-full", children: h() })
  ] });
}
export {
  Jq as ChartComponent
};
