import { r as I, V as K, j as c, R as z, a1 as at, _ as re, c as Pe, H as ye, J as Ie, K as De, M as Ee, N as je, D as Ae, e as Le, f as He, g as Ge, L as ut, T as gt, I as dt, a2 as Ne, A as ct, b as ft, d as pt, B as mt } from "./badge-DBvLZUPk.js";
import { C as ze } from "./checkbox-918erH_7.js";
import { D as ht, a as St, b as Ct, c as wt } from "./dropdown-menu-BON8n5bi.js";
import { C as Rt } from "./chevrons-up-down-qz2MCZHA.js";
import { E as vt } from "./ellipsis-Csj557td.js";
/**
   * table-core
   *
   * Copyright (c) TanStack
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   */
function O(e, o) {
  return typeof e == "function" ? e(o) : e;
}
function E(e, o) {
  return (t) => {
    o.setState((n) => ({
      ...n,
      [e]: O(t, n[e])
    }));
  };
}
function Z(e) {
  return e instanceof Function;
}
function xt(e) {
  return Array.isArray(e) && e.every((o) => typeof o == "number");
}
function Ft(e, o) {
  const t = [], n = (r) => {
    r.forEach((i) => {
      t.push(i);
      const l = o(i);
      l != null && l.length && n(l);
    });
  };
  return n(e), t;
}
function w(e, o, t) {
  let n = [], r;
  return (i) => {
    let l;
    t.key && t.debug && (l = Date.now());
    const a = e(i);
    if (!(a.length !== n.length || a.some((f, h) => n[h] !== f)))
      return r;
    n = a;
    let g;
    if (t.key && t.debug && (g = Date.now()), r = o(...a), t == null || t.onChange == null || t.onChange(r), t.key && t.debug && t != null && t.debug()) {
      const f = Math.round((Date.now() - l) * 100) / 100, h = Math.round((Date.now() - g) * 100) / 100, d = h / 16, s = (p, m) => {
        for (p = String(p); p.length < m; )
          p = " " + p;
        return p;
      };
      console.info(`%c⏱ ${s(h, 5)} /${s(f, 5)} ms`, `
            font-size: .6rem;
            font-weight: bold;
            color: hsl(${Math.max(0, Math.min(120 - 120 * d, 120))}deg 100% 31%);`, t == null ? void 0 : t.key);
    }
    return r;
  };
}
function R(e, o, t, n) {
  return {
    debug: () => {
      var r;
      return (r = e == null ? void 0 : e.debugAll) != null ? r : e[o];
    },
    key: process.env.NODE_ENV === "development" && t,
    onChange: n
  };
}
function _t(e, o, t, n) {
  const r = () => {
    var l;
    return (l = i.getValue()) != null ? l : e.options.renderFallbackValue;
  }, i = {
    id: `${o.id}_${t.id}`,
    row: o,
    column: t,
    getValue: () => o.getValue(n),
    renderValue: r,
    getContext: w(() => [e, t, o, i], (l, a, u, g) => ({
      table: l,
      column: a,
      row: u,
      cell: g,
      getValue: g.getValue,
      renderValue: g.renderValue
    }), R(e.options, "debugCells", "cell.getContext"))
  };
  return e._features.forEach((l) => {
    l.createCell == null || l.createCell(i, t, o, e);
  }, {}), i;
}
function $t(e, o, t, n) {
  var r, i;
  const a = {
    ...e._getDefaultColumnDef(),
    ...o
  }, u = a.accessorKey;
  let g = (r = (i = a.id) != null ? i : u ? typeof String.prototype.replaceAll == "function" ? u.replaceAll(".", "_") : u.replace(/\./g, "_") : void 0) != null ? r : typeof a.header == "string" ? a.header : void 0, f;
  if (a.accessorFn ? f = a.accessorFn : u && (u.includes(".") ? f = (d) => {
    let s = d;
    for (const m of u.split(".")) {
      var p;
      s = (p = s) == null ? void 0 : p[m], process.env.NODE_ENV !== "production" && s === void 0 && console.warn(`"${m}" in deeply nested key "${u}" returned undefined.`);
    }
    return s;
  } : f = (d) => d[a.accessorKey]), !g)
    throw process.env.NODE_ENV !== "production" ? new Error(a.accessorFn ? "Columns require an id when using an accessorFn" : "Columns require an id when using a non-string header") : new Error();
  let h = {
    id: `${String(g)}`,
    accessorFn: f,
    parent: n,
    depth: t,
    columnDef: a,
    columns: [],
    getFlatColumns: w(() => [!0], () => {
      var d;
      return [h, ...(d = h.columns) == null ? void 0 : d.flatMap((s) => s.getFlatColumns())];
    }, R(e.options, "debugColumns", "column.getFlatColumns")),
    getLeafColumns: w(() => [e._getOrderColumnsFn()], (d) => {
      var s;
      if ((s = h.columns) != null && s.length) {
        let p = h.columns.flatMap((m) => m.getLeafColumns());
        return d(p);
      }
      return [h];
    }, R(e.options, "debugColumns", "column.getLeafColumns"))
  };
  for (const d of e._features)
    d.createColumn == null || d.createColumn(h, e);
  return h;
}
const P = "debugHeaders";
function Oe(e, o, t) {
  var n;
  let i = {
    id: (n = t.id) != null ? n : o.id,
    column: o,
    index: t.index,
    isPlaceholder: !!t.isPlaceholder,
    placeholderId: t.placeholderId,
    depth: t.depth,
    subHeaders: [],
    colSpan: 0,
    rowSpan: 0,
    headerGroup: null,
    getLeafHeaders: () => {
      const l = [], a = (u) => {
        u.subHeaders && u.subHeaders.length && u.subHeaders.map(a), l.push(u);
      };
      return a(i), l;
    },
    getContext: () => ({
      table: e,
      header: i,
      column: o
    })
  };
  return e._features.forEach((l) => {
    l.createHeader == null || l.createHeader(i, e);
  }), i;
}
const Vt = {
  createTable: (e) => {
    e.getHeaderGroups = w(() => [e.getAllColumns(), e.getVisibleLeafColumns(), e.getState().columnPinning.left, e.getState().columnPinning.right], (o, t, n, r) => {
      var i, l;
      const a = (i = n == null ? void 0 : n.map((h) => t.find((d) => d.id === h)).filter(Boolean)) != null ? i : [], u = (l = r == null ? void 0 : r.map((h) => t.find((d) => d.id === h)).filter(Boolean)) != null ? l : [], g = t.filter((h) => !(n != null && n.includes(h.id)) && !(r != null && r.includes(h.id)));
      return J(o, [...a, ...g, ...u], e);
    }, R(e.options, P, "getHeaderGroups")), e.getCenterHeaderGroups = w(() => [e.getAllColumns(), e.getVisibleLeafColumns(), e.getState().columnPinning.left, e.getState().columnPinning.right], (o, t, n, r) => (t = t.filter((i) => !(n != null && n.includes(i.id)) && !(r != null && r.includes(i.id))), J(o, t, e, "center")), R(e.options, P, "getCenterHeaderGroups")), e.getLeftHeaderGroups = w(() => [e.getAllColumns(), e.getVisibleLeafColumns(), e.getState().columnPinning.left], (o, t, n) => {
      var r;
      const i = (r = n == null ? void 0 : n.map((l) => t.find((a) => a.id === l)).filter(Boolean)) != null ? r : [];
      return J(o, i, e, "left");
    }, R(e.options, P, "getLeftHeaderGroups")), e.getRightHeaderGroups = w(() => [e.getAllColumns(), e.getVisibleLeafColumns(), e.getState().columnPinning.right], (o, t, n) => {
      var r;
      const i = (r = n == null ? void 0 : n.map((l) => t.find((a) => a.id === l)).filter(Boolean)) != null ? r : [];
      return J(o, i, e, "right");
    }, R(e.options, P, "getRightHeaderGroups")), e.getFooterGroups = w(() => [e.getHeaderGroups()], (o) => [...o].reverse(), R(e.options, P, "getFooterGroups")), e.getLeftFooterGroups = w(() => [e.getLeftHeaderGroups()], (o) => [...o].reverse(), R(e.options, P, "getLeftFooterGroups")), e.getCenterFooterGroups = w(() => [e.getCenterHeaderGroups()], (o) => [...o].reverse(), R(e.options, P, "getCenterFooterGroups")), e.getRightFooterGroups = w(() => [e.getRightHeaderGroups()], (o) => [...o].reverse(), R(e.options, P, "getRightFooterGroups")), e.getFlatHeaders = w(() => [e.getHeaderGroups()], (o) => o.map((t) => t.headers).flat(), R(e.options, P, "getFlatHeaders")), e.getLeftFlatHeaders = w(() => [e.getLeftHeaderGroups()], (o) => o.map((t) => t.headers).flat(), R(e.options, P, "getLeftFlatHeaders")), e.getCenterFlatHeaders = w(() => [e.getCenterHeaderGroups()], (o) => o.map((t) => t.headers).flat(), R(e.options, P, "getCenterFlatHeaders")), e.getRightFlatHeaders = w(() => [e.getRightHeaderGroups()], (o) => o.map((t) => t.headers).flat(), R(e.options, P, "getRightFlatHeaders")), e.getCenterLeafHeaders = w(() => [e.getCenterFlatHeaders()], (o) => o.filter((t) => {
      var n;
      return !((n = t.subHeaders) != null && n.length);
    }), R(e.options, P, "getCenterLeafHeaders")), e.getLeftLeafHeaders = w(() => [e.getLeftFlatHeaders()], (o) => o.filter((t) => {
      var n;
      return !((n = t.subHeaders) != null && n.length);
    }), R(e.options, P, "getLeftLeafHeaders")), e.getRightLeafHeaders = w(() => [e.getRightFlatHeaders()], (o) => o.filter((t) => {
      var n;
      return !((n = t.subHeaders) != null && n.length);
    }), R(e.options, P, "getRightLeafHeaders")), e.getLeafHeaders = w(() => [e.getLeftHeaderGroups(), e.getCenterHeaderGroups(), e.getRightHeaderGroups()], (o, t, n) => {
      var r, i, l, a, u, g;
      return [...(r = (i = o[0]) == null ? void 0 : i.headers) != null ? r : [], ...(l = (a = t[0]) == null ? void 0 : a.headers) != null ? l : [], ...(u = (g = n[0]) == null ? void 0 : g.headers) != null ? u : []].map((f) => f.getLeafHeaders()).flat();
    }, R(e.options, P, "getLeafHeaders"));
  }
};
function J(e, o, t, n) {
  var r, i;
  let l = 0;
  const a = function(d, s) {
    s === void 0 && (s = 1), l = Math.max(l, s), d.filter((p) => p.getIsVisible()).forEach((p) => {
      var m;
      (m = p.columns) != null && m.length && a(p.columns, s + 1);
    }, 0);
  };
  a(e);
  let u = [];
  const g = (d, s) => {
    const p = {
      depth: s,
      id: [n, `${s}`].filter(Boolean).join("_"),
      headers: []
    }, m = [];
    d.forEach((v) => {
      const x = [...m].reverse()[0], _ = v.column.depth === p.depth;
      let V, j = !1;
      if (_ && v.column.parent ? V = v.column.parent : (V = v.column, j = !0), x && (x == null ? void 0 : x.column) === V)
        x.subHeaders.push(v);
      else {
        const y = Oe(t, V, {
          id: [n, s, V.id, v == null ? void 0 : v.id].filter(Boolean).join("_"),
          isPlaceholder: j,
          placeholderId: j ? `${m.filter((N) => N.column === V).length}` : void 0,
          depth: s,
          index: m.length
        });
        y.subHeaders.push(v), m.push(y);
      }
      p.headers.push(v), v.headerGroup = p;
    }), u.push(p), s > 0 && g(m, s - 1);
  }, f = o.map((d, s) => Oe(t, d, {
    depth: l,
    index: s
  }));
  g(f, l - 1), u.reverse();
  const h = (d) => d.filter((p) => p.column.getIsVisible()).map((p) => {
    let m = 0, v = 0, x = [0];
    p.subHeaders && p.subHeaders.length ? (x = [], h(p.subHeaders).forEach((V) => {
      let {
        colSpan: j,
        rowSpan: y
      } = V;
      m += j, x.push(y);
    })) : m = 1;
    const _ = Math.min(...x);
    return v = v + _, p.colSpan = m, p.rowSpan = v, {
      colSpan: m,
      rowSpan: v
    };
  });
  return h((r = (i = u[0]) == null ? void 0 : i.headers) != null ? r : []), u;
}
const Se = (e, o, t, n, r, i, l) => {
  let a = {
    id: o,
    index: n,
    original: t,
    depth: r,
    parentId: l,
    _valuesCache: {},
    _uniqueValuesCache: {},
    getValue: (u) => {
      if (a._valuesCache.hasOwnProperty(u))
        return a._valuesCache[u];
      const g = e.getColumn(u);
      if (g != null && g.accessorFn)
        return a._valuesCache[u] = g.accessorFn(a.original, n), a._valuesCache[u];
    },
    getUniqueValues: (u) => {
      if (a._uniqueValuesCache.hasOwnProperty(u))
        return a._uniqueValuesCache[u];
      const g = e.getColumn(u);
      if (g != null && g.accessorFn)
        return g.columnDef.getUniqueValues ? (a._uniqueValuesCache[u] = g.columnDef.getUniqueValues(a.original, n), a._uniqueValuesCache[u]) : (a._uniqueValuesCache[u] = [a.getValue(u)], a._uniqueValuesCache[u]);
    },
    renderValue: (u) => {
      var g;
      return (g = a.getValue(u)) != null ? g : e.options.renderFallbackValue;
    },
    subRows: [],
    getLeafRows: () => Ft(a.subRows, (u) => u.subRows),
    getParentRow: () => a.parentId ? e.getRow(a.parentId, !0) : void 0,
    getParentRows: () => {
      let u = [], g = a;
      for (; ; ) {
        const f = g.getParentRow();
        if (!f) break;
        u.push(f), g = f;
      }
      return u.reverse();
    },
    getAllCells: w(() => [e.getAllLeafColumns()], (u) => u.map((g) => _t(e, a, g, g.id)), R(e.options, "debugRows", "getAllCells")),
    _getAllCellsByColumnId: w(() => [a.getAllCells()], (u) => u.reduce((g, f) => (g[f.column.id] = f, g), {}), R(e.options, "debugRows", "getAllCellsByColumnId"))
  };
  for (let u = 0; u < e._features.length; u++) {
    const g = e._features[u];
    g == null || g.createRow == null || g.createRow(a, e);
  }
  return a;
}, Mt = {
  createColumn: (e, o) => {
    e._getFacetedRowModel = o.options.getFacetedRowModel && o.options.getFacetedRowModel(o, e.id), e.getFacetedRowModel = () => e._getFacetedRowModel ? e._getFacetedRowModel() : o.getPreFilteredRowModel(), e._getFacetedUniqueValues = o.options.getFacetedUniqueValues && o.options.getFacetedUniqueValues(o, e.id), e.getFacetedUniqueValues = () => e._getFacetedUniqueValues ? e._getFacetedUniqueValues() : /* @__PURE__ */ new Map(), e._getFacetedMinMaxValues = o.options.getFacetedMinMaxValues && o.options.getFacetedMinMaxValues(o, e.id), e.getFacetedMinMaxValues = () => {
      if (e._getFacetedMinMaxValues)
        return e._getFacetedMinMaxValues();
    };
  }
}, Be = (e, o, t) => {
  var n, r;
  const i = t == null || (n = t.toString()) == null ? void 0 : n.toLowerCase();
  return !!(!((r = e.getValue(o)) == null || (r = r.toString()) == null || (r = r.toLowerCase()) == null) && r.includes(i));
};
Be.autoRemove = (e) => L(e);
const qe = (e, o, t) => {
  var n;
  return !!(!((n = e.getValue(o)) == null || (n = n.toString()) == null) && n.includes(t));
};
qe.autoRemove = (e) => L(e);
const Ue = (e, o, t) => {
  var n;
  return ((n = e.getValue(o)) == null || (n = n.toString()) == null ? void 0 : n.toLowerCase()) === (t == null ? void 0 : t.toLowerCase());
};
Ue.autoRemove = (e) => L(e);
const be = (e, o, t) => {
  var n;
  return (n = e.getValue(o)) == null ? void 0 : n.includes(t);
};
be.autoRemove = (e) => L(e);
const Xe = (e, o, t) => !t.some((n) => {
  var r;
  return !((r = e.getValue(o)) != null && r.includes(n));
});
Xe.autoRemove = (e) => L(e) || !(e != null && e.length);
const Ke = (e, o, t) => t.some((n) => {
  var r;
  return (r = e.getValue(o)) == null ? void 0 : r.includes(n);
});
Ke.autoRemove = (e) => L(e) || !(e != null && e.length);
const Je = (e, o, t) => e.getValue(o) === t;
Je.autoRemove = (e) => L(e);
const Qe = (e, o, t) => e.getValue(o) == t;
Qe.autoRemove = (e) => L(e);
const Ce = (e, o, t) => {
  let [n, r] = t;
  const i = e.getValue(o);
  return i >= n && i <= r;
};
Ce.resolveFilterValue = (e) => {
  let [o, t] = e, n = typeof o != "number" ? parseFloat(o) : o, r = typeof t != "number" ? parseFloat(t) : t, i = o === null || Number.isNaN(n) ? -1 / 0 : n, l = t === null || Number.isNaN(r) ? 1 / 0 : r;
  if (i > l) {
    const a = i;
    i = l, l = a;
  }
  return [i, l];
};
Ce.autoRemove = (e) => L(e) || L(e[0]) && L(e[1]);
const G = {
  includesString: Be,
  includesStringSensitive: qe,
  equalsString: Ue,
  arrIncludes: be,
  arrIncludesAll: Xe,
  arrIncludesSome: Ke,
  equals: Je,
  weakEquals: Qe,
  inNumberRange: Ce
};
function L(e) {
  return e == null || e === "";
}
const Pt = {
  getDefaultColumnDef: () => ({
    filterFn: "auto"
  }),
  getInitialState: (e) => ({
    columnFilters: [],
    ...e
  }),
  getDefaultOptions: (e) => ({
    onColumnFiltersChange: E("columnFilters", e),
    filterFromLeafRows: !1,
    maxLeafRowFilterDepth: 100
  }),
  createColumn: (e, o) => {
    e.getAutoFilterFn = () => {
      const t = o.getCoreRowModel().flatRows[0], n = t == null ? void 0 : t.getValue(e.id);
      return typeof n == "string" ? G.includesString : typeof n == "number" ? G.inNumberRange : typeof n == "boolean" || n !== null && typeof n == "object" ? G.equals : Array.isArray(n) ? G.arrIncludes : G.weakEquals;
    }, e.getFilterFn = () => {
      var t, n;
      return Z(e.columnDef.filterFn) ? e.columnDef.filterFn : e.columnDef.filterFn === "auto" ? e.getAutoFilterFn() : (
        // @ts-ignore
        (t = (n = o.options.filterFns) == null ? void 0 : n[e.columnDef.filterFn]) != null ? t : G[e.columnDef.filterFn]
      );
    }, e.getCanFilter = () => {
      var t, n, r;
      return ((t = e.columnDef.enableColumnFilter) != null ? t : !0) && ((n = o.options.enableColumnFilters) != null ? n : !0) && ((r = o.options.enableFilters) != null ? r : !0) && !!e.accessorFn;
    }, e.getIsFiltered = () => e.getFilterIndex() > -1, e.getFilterValue = () => {
      var t;
      return (t = o.getState().columnFilters) == null || (t = t.find((n) => n.id === e.id)) == null ? void 0 : t.value;
    }, e.getFilterIndex = () => {
      var t, n;
      return (t = (n = o.getState().columnFilters) == null ? void 0 : n.findIndex((r) => r.id === e.id)) != null ? t : -1;
    }, e.setFilterValue = (t) => {
      o.setColumnFilters((n) => {
        const r = e.getFilterFn(), i = n == null ? void 0 : n.find((f) => f.id === e.id), l = O(t, i ? i.value : void 0);
        if (Te(r, l, e)) {
          var a;
          return (a = n == null ? void 0 : n.filter((f) => f.id !== e.id)) != null ? a : [];
        }
        const u = {
          id: e.id,
          value: l
        };
        if (i) {
          var g;
          return (g = n == null ? void 0 : n.map((f) => f.id === e.id ? u : f)) != null ? g : [];
        }
        return n != null && n.length ? [...n, u] : [u];
      });
    };
  },
  createRow: (e, o) => {
    e.columnFilters = {}, e.columnFiltersMeta = {};
  },
  createTable: (e) => {
    e.setColumnFilters = (o) => {
      const t = e.getAllLeafColumns(), n = (r) => {
        var i;
        return (i = O(o, r)) == null ? void 0 : i.filter((l) => {
          const a = t.find((u) => u.id === l.id);
          if (a) {
            const u = a.getFilterFn();
            if (Te(u, l.value, a))
              return !1;
          }
          return !0;
        });
      };
      e.options.onColumnFiltersChange == null || e.options.onColumnFiltersChange(n);
    }, e.resetColumnFilters = (o) => {
      var t, n;
      e.setColumnFilters(o ? [] : (t = (n = e.initialState) == null ? void 0 : n.columnFilters) != null ? t : []);
    }, e.getPreFilteredRowModel = () => e.getCoreRowModel(), e.getFilteredRowModel = () => (!e._getFilteredRowModel && e.options.getFilteredRowModel && (e._getFilteredRowModel = e.options.getFilteredRowModel(e)), e.options.manualFiltering || !e._getFilteredRowModel ? e.getPreFilteredRowModel() : e._getFilteredRowModel());
  }
};
function Te(e, o, t) {
  return (e && e.autoRemove ? e.autoRemove(o, t) : !1) || typeof o > "u" || typeof o == "string" && !o;
}
const yt = (e, o, t) => t.reduce((n, r) => {
  const i = r.getValue(e);
  return n + (typeof i == "number" ? i : 0);
}, 0), It = (e, o, t) => {
  let n;
  return t.forEach((r) => {
    const i = r.getValue(e);
    i != null && (n > i || n === void 0 && i >= i) && (n = i);
  }), n;
}, Dt = (e, o, t) => {
  let n;
  return t.forEach((r) => {
    const i = r.getValue(e);
    i != null && (n < i || n === void 0 && i >= i) && (n = i);
  }), n;
}, Et = (e, o, t) => {
  let n, r;
  return t.forEach((i) => {
    const l = i.getValue(e);
    l != null && (n === void 0 ? l >= l && (n = r = l) : (n > l && (n = l), r < l && (r = l)));
  }), [n, r];
}, jt = (e, o) => {
  let t = 0, n = 0;
  if (o.forEach((r) => {
    let i = r.getValue(e);
    i != null && (i = +i) >= i && (++t, n += i);
  }), t) return n / t;
}, At = (e, o) => {
  if (!o.length)
    return;
  const t = o.map((i) => i.getValue(e));
  if (!xt(t))
    return;
  if (t.length === 1)
    return t[0];
  const n = Math.floor(t.length / 2), r = t.sort((i, l) => i - l);
  return t.length % 2 !== 0 ? r[n] : (r[n - 1] + r[n]) / 2;
}, Lt = (e, o) => Array.from(new Set(o.map((t) => t.getValue(e))).values()), Ht = (e, o) => new Set(o.map((t) => t.getValue(e))).size, Gt = (e, o) => o.length, ie = {
  sum: yt,
  min: It,
  max: Dt,
  extent: Et,
  mean: jt,
  median: At,
  unique: Lt,
  uniqueCount: Ht,
  count: Gt
}, Nt = {
  getDefaultColumnDef: () => ({
    aggregatedCell: (e) => {
      var o, t;
      return (o = (t = e.getValue()) == null || t.toString == null ? void 0 : t.toString()) != null ? o : null;
    },
    aggregationFn: "auto"
  }),
  getInitialState: (e) => ({
    grouping: [],
    ...e
  }),
  getDefaultOptions: (e) => ({
    onGroupingChange: E("grouping", e),
    groupedColumnMode: "reorder"
  }),
  createColumn: (e, o) => {
    e.toggleGrouping = () => {
      o.setGrouping((t) => t != null && t.includes(e.id) ? t.filter((n) => n !== e.id) : [...t ?? [], e.id]);
    }, e.getCanGroup = () => {
      var t, n;
      return ((t = e.columnDef.enableGrouping) != null ? t : !0) && ((n = o.options.enableGrouping) != null ? n : !0) && (!!e.accessorFn || !!e.columnDef.getGroupingValue);
    }, e.getIsGrouped = () => {
      var t;
      return (t = o.getState().grouping) == null ? void 0 : t.includes(e.id);
    }, e.getGroupedIndex = () => {
      var t;
      return (t = o.getState().grouping) == null ? void 0 : t.indexOf(e.id);
    }, e.getToggleGroupingHandler = () => {
      const t = e.getCanGroup();
      return () => {
        t && e.toggleGrouping();
      };
    }, e.getAutoAggregationFn = () => {
      const t = o.getCoreRowModel().flatRows[0], n = t == null ? void 0 : t.getValue(e.id);
      if (typeof n == "number")
        return ie.sum;
      if (Object.prototype.toString.call(n) === "[object Date]")
        return ie.extent;
    }, e.getAggregationFn = () => {
      var t, n;
      if (!e)
        throw new Error();
      return Z(e.columnDef.aggregationFn) ? e.columnDef.aggregationFn : e.columnDef.aggregationFn === "auto" ? e.getAutoAggregationFn() : (t = (n = o.options.aggregationFns) == null ? void 0 : n[e.columnDef.aggregationFn]) != null ? t : ie[e.columnDef.aggregationFn];
    };
  },
  createTable: (e) => {
    e.setGrouping = (o) => e.options.onGroupingChange == null ? void 0 : e.options.onGroupingChange(o), e.resetGrouping = (o) => {
      var t, n;
      e.setGrouping(o ? [] : (t = (n = e.initialState) == null ? void 0 : n.grouping) != null ? t : []);
    }, e.getPreGroupedRowModel = () => e.getFilteredRowModel(), e.getGroupedRowModel = () => (!e._getGroupedRowModel && e.options.getGroupedRowModel && (e._getGroupedRowModel = e.options.getGroupedRowModel(e)), e.options.manualGrouping || !e._getGroupedRowModel ? e.getPreGroupedRowModel() : e._getGroupedRowModel());
  },
  createRow: (e, o) => {
    e.getIsGrouped = () => !!e.groupingColumnId, e.getGroupingValue = (t) => {
      if (e._groupingValuesCache.hasOwnProperty(t))
        return e._groupingValuesCache[t];
      const n = o.getColumn(t);
      return n != null && n.columnDef.getGroupingValue ? (e._groupingValuesCache[t] = n.columnDef.getGroupingValue(e.original), e._groupingValuesCache[t]) : e.getValue(t);
    }, e._groupingValuesCache = {};
  },
  createCell: (e, o, t, n) => {
    e.getIsGrouped = () => o.getIsGrouped() && o.id === t.groupingColumnId, e.getIsPlaceholder = () => !e.getIsGrouped() && o.getIsGrouped(), e.getIsAggregated = () => {
      var r;
      return !e.getIsGrouped() && !e.getIsPlaceholder() && !!((r = t.subRows) != null && r.length);
    };
  }
};
function zt(e, o, t) {
  if (!(o != null && o.length) || !t)
    return e;
  const n = e.filter((i) => !o.includes(i.id));
  return t === "remove" ? n : [...o.map((i) => e.find((l) => l.id === i)).filter(Boolean), ...n];
}
const Ot = {
  getInitialState: (e) => ({
    columnOrder: [],
    ...e
  }),
  getDefaultOptions: (e) => ({
    onColumnOrderChange: E("columnOrder", e)
  }),
  createColumn: (e, o) => {
    e.getIndex = w((t) => [q(o, t)], (t) => t.findIndex((n) => n.id === e.id), R(o.options, "debugColumns", "getIndex")), e.getIsFirstColumn = (t) => {
      var n;
      return ((n = q(o, t)[0]) == null ? void 0 : n.id) === e.id;
    }, e.getIsLastColumn = (t) => {
      var n;
      const r = q(o, t);
      return ((n = r[r.length - 1]) == null ? void 0 : n.id) === e.id;
    };
  },
  createTable: (e) => {
    e.setColumnOrder = (o) => e.options.onColumnOrderChange == null ? void 0 : e.options.onColumnOrderChange(o), e.resetColumnOrder = (o) => {
      var t;
      e.setColumnOrder(o ? [] : (t = e.initialState.columnOrder) != null ? t : []);
    }, e._getOrderColumnsFn = w(() => [e.getState().columnOrder, e.getState().grouping, e.options.groupedColumnMode], (o, t, n) => (r) => {
      let i = [];
      if (!(o != null && o.length))
        i = r;
      else {
        const l = [...o], a = [...r];
        for (; a.length && l.length; ) {
          const u = l.shift(), g = a.findIndex((f) => f.id === u);
          g > -1 && i.push(a.splice(g, 1)[0]);
        }
        i = [...i, ...a];
      }
      return zt(i, t, n);
    }, R(e.options, "debugTable", "_getOrderColumnsFn"));
  }
}, le = () => ({
  left: [],
  right: []
}), Tt = {
  getInitialState: (e) => ({
    columnPinning: le(),
    ...e
  }),
  getDefaultOptions: (e) => ({
    onColumnPinningChange: E("columnPinning", e)
  }),
  createColumn: (e, o) => {
    e.pin = (t) => {
      const n = e.getLeafColumns().map((r) => r.id).filter(Boolean);
      o.setColumnPinning((r) => {
        var i, l;
        if (t === "right") {
          var a, u;
          return {
            left: ((a = r == null ? void 0 : r.left) != null ? a : []).filter((h) => !(n != null && n.includes(h))),
            right: [...((u = r == null ? void 0 : r.right) != null ? u : []).filter((h) => !(n != null && n.includes(h))), ...n]
          };
        }
        if (t === "left") {
          var g, f;
          return {
            left: [...((g = r == null ? void 0 : r.left) != null ? g : []).filter((h) => !(n != null && n.includes(h))), ...n],
            right: ((f = r == null ? void 0 : r.right) != null ? f : []).filter((h) => !(n != null && n.includes(h)))
          };
        }
        return {
          left: ((i = r == null ? void 0 : r.left) != null ? i : []).filter((h) => !(n != null && n.includes(h))),
          right: ((l = r == null ? void 0 : r.right) != null ? l : []).filter((h) => !(n != null && n.includes(h)))
        };
      });
    }, e.getCanPin = () => e.getLeafColumns().some((n) => {
      var r, i, l;
      return ((r = n.columnDef.enablePinning) != null ? r : !0) && ((i = (l = o.options.enableColumnPinning) != null ? l : o.options.enablePinning) != null ? i : !0);
    }), e.getIsPinned = () => {
      const t = e.getLeafColumns().map((a) => a.id), {
        left: n,
        right: r
      } = o.getState().columnPinning, i = t.some((a) => n == null ? void 0 : n.includes(a)), l = t.some((a) => r == null ? void 0 : r.includes(a));
      return i ? "left" : l ? "right" : !1;
    }, e.getPinnedIndex = () => {
      var t, n;
      const r = e.getIsPinned();
      return r ? (t = (n = o.getState().columnPinning) == null || (n = n[r]) == null ? void 0 : n.indexOf(e.id)) != null ? t : -1 : 0;
    };
  },
  createRow: (e, o) => {
    e.getCenterVisibleCells = w(() => [e._getAllVisibleCells(), o.getState().columnPinning.left, o.getState().columnPinning.right], (t, n, r) => {
      const i = [...n ?? [], ...r ?? []];
      return t.filter((l) => !i.includes(l.column.id));
    }, R(o.options, "debugRows", "getCenterVisibleCells")), e.getLeftVisibleCells = w(() => [e._getAllVisibleCells(), o.getState().columnPinning.left], (t, n) => (n ?? []).map((i) => t.find((l) => l.column.id === i)).filter(Boolean).map((i) => ({
      ...i,
      position: "left"
    })), R(o.options, "debugRows", "getLeftVisibleCells")), e.getRightVisibleCells = w(() => [e._getAllVisibleCells(), o.getState().columnPinning.right], (t, n) => (n ?? []).map((i) => t.find((l) => l.column.id === i)).filter(Boolean).map((i) => ({
      ...i,
      position: "right"
    })), R(o.options, "debugRows", "getRightVisibleCells"));
  },
  createTable: (e) => {
    e.setColumnPinning = (o) => e.options.onColumnPinningChange == null ? void 0 : e.options.onColumnPinningChange(o), e.resetColumnPinning = (o) => {
      var t, n;
      return e.setColumnPinning(o ? le() : (t = (n = e.initialState) == null ? void 0 : n.columnPinning) != null ? t : le());
    }, e.getIsSomeColumnsPinned = (o) => {
      var t;
      const n = e.getState().columnPinning;
      if (!o) {
        var r, i;
        return !!((r = n.left) != null && r.length || (i = n.right) != null && i.length);
      }
      return !!((t = n[o]) != null && t.length);
    }, e.getLeftLeafColumns = w(() => [e.getAllLeafColumns(), e.getState().columnPinning.left], (o, t) => (t ?? []).map((n) => o.find((r) => r.id === n)).filter(Boolean), R(e.options, "debugColumns", "getLeftLeafColumns")), e.getRightLeafColumns = w(() => [e.getAllLeafColumns(), e.getState().columnPinning.right], (o, t) => (t ?? []).map((n) => o.find((r) => r.id === n)).filter(Boolean), R(e.options, "debugColumns", "getRightLeafColumns")), e.getCenterLeafColumns = w(() => [e.getAllLeafColumns(), e.getState().columnPinning.left, e.getState().columnPinning.right], (o, t, n) => {
      const r = [...t ?? [], ...n ?? []];
      return o.filter((i) => !r.includes(i.id));
    }, R(e.options, "debugColumns", "getCenterLeafColumns"));
  }
};
function kt(e) {
  return e || (typeof document < "u" ? document : null);
}
const Q = {
  size: 150,
  minSize: 20,
  maxSize: Number.MAX_SAFE_INTEGER
}, se = () => ({
  startOffset: null,
  startSize: null,
  deltaOffset: null,
  deltaPercentage: null,
  isResizingColumn: !1,
  columnSizingStart: []
}), Bt = {
  getDefaultColumnDef: () => Q,
  getInitialState: (e) => ({
    columnSizing: {},
    columnSizingInfo: se(),
    ...e
  }),
  getDefaultOptions: (e) => ({
    columnResizeMode: "onEnd",
    columnResizeDirection: "ltr",
    onColumnSizingChange: E("columnSizing", e),
    onColumnSizingInfoChange: E("columnSizingInfo", e)
  }),
  createColumn: (e, o) => {
    e.getSize = () => {
      var t, n, r;
      const i = o.getState().columnSizing[e.id];
      return Math.min(Math.max((t = e.columnDef.minSize) != null ? t : Q.minSize, (n = i ?? e.columnDef.size) != null ? n : Q.size), (r = e.columnDef.maxSize) != null ? r : Q.maxSize);
    }, e.getStart = w((t) => [t, q(o, t), o.getState().columnSizing], (t, n) => n.slice(0, e.getIndex(t)).reduce((r, i) => r + i.getSize(), 0), R(o.options, "debugColumns", "getStart")), e.getAfter = w((t) => [t, q(o, t), o.getState().columnSizing], (t, n) => n.slice(e.getIndex(t) + 1).reduce((r, i) => r + i.getSize(), 0), R(o.options, "debugColumns", "getAfter")), e.resetSize = () => {
      o.setColumnSizing((t) => {
        let {
          [e.id]: n,
          ...r
        } = t;
        return r;
      });
    }, e.getCanResize = () => {
      var t, n;
      return ((t = e.columnDef.enableResizing) != null ? t : !0) && ((n = o.options.enableColumnResizing) != null ? n : !0);
    }, e.getIsResizing = () => o.getState().columnSizingInfo.isResizingColumn === e.id;
  },
  createHeader: (e, o) => {
    e.getSize = () => {
      let t = 0;
      const n = (r) => {
        if (r.subHeaders.length)
          r.subHeaders.forEach(n);
        else {
          var i;
          t += (i = r.column.getSize()) != null ? i : 0;
        }
      };
      return n(e), t;
    }, e.getStart = () => {
      if (e.index > 0) {
        const t = e.headerGroup.headers[e.index - 1];
        return t.getStart() + t.getSize();
      }
      return 0;
    }, e.getResizeHandler = (t) => {
      const n = o.getColumn(e.column.id), r = n == null ? void 0 : n.getCanResize();
      return (i) => {
        if (!n || !r || (i.persist == null || i.persist(), ae(i) && i.touches && i.touches.length > 1))
          return;
        const l = e.getSize(), a = e ? e.getLeafHeaders().map((x) => [x.column.id, x.column.getSize()]) : [[n.id, n.getSize()]], u = ae(i) ? Math.round(i.touches[0].clientX) : i.clientX, g = {}, f = (x, _) => {
          typeof _ == "number" && (o.setColumnSizingInfo((V) => {
            var j, y;
            const N = o.options.columnResizeDirection === "rtl" ? -1 : 1, U = (_ - ((j = V == null ? void 0 : V.startOffset) != null ? j : 0)) * N, b = Math.max(U / ((y = V == null ? void 0 : V.startSize) != null ? y : 0), -0.999999);
            return V.columnSizingStart.forEach((ee) => {
              let [k, M] = ee;
              g[k] = Math.round(Math.max(M + M * b, 0) * 100) / 100;
            }), {
              ...V,
              deltaOffset: U,
              deltaPercentage: b
            };
          }), (o.options.columnResizeMode === "onChange" || x === "end") && o.setColumnSizing((V) => ({
            ...V,
            ...g
          })));
        }, h = (x) => f("move", x), d = (x) => {
          f("end", x), o.setColumnSizingInfo((_) => ({
            ..._,
            isResizingColumn: !1,
            startOffset: null,
            startSize: null,
            deltaOffset: null,
            deltaPercentage: null,
            columnSizingStart: []
          }));
        }, s = kt(t), p = {
          moveHandler: (x) => h(x.clientX),
          upHandler: (x) => {
            s == null || s.removeEventListener("mousemove", p.moveHandler), s == null || s.removeEventListener("mouseup", p.upHandler), d(x.clientX);
          }
        }, m = {
          moveHandler: (x) => (x.cancelable && (x.preventDefault(), x.stopPropagation()), h(x.touches[0].clientX), !1),
          upHandler: (x) => {
            var _;
            s == null || s.removeEventListener("touchmove", m.moveHandler), s == null || s.removeEventListener("touchend", m.upHandler), x.cancelable && (x.preventDefault(), x.stopPropagation()), d((_ = x.touches[0]) == null ? void 0 : _.clientX);
          }
        }, v = qt() ? {
          passive: !1
        } : !1;
        ae(i) ? (s == null || s.addEventListener("touchmove", m.moveHandler, v), s == null || s.addEventListener("touchend", m.upHandler, v)) : (s == null || s.addEventListener("mousemove", p.moveHandler, v), s == null || s.addEventListener("mouseup", p.upHandler, v)), o.setColumnSizingInfo((x) => ({
          ...x,
          startOffset: u,
          startSize: l,
          deltaOffset: 0,
          deltaPercentage: 0,
          columnSizingStart: a,
          isResizingColumn: n.id
        }));
      };
    };
  },
  createTable: (e) => {
    e.setColumnSizing = (o) => e.options.onColumnSizingChange == null ? void 0 : e.options.onColumnSizingChange(o), e.setColumnSizingInfo = (o) => e.options.onColumnSizingInfoChange == null ? void 0 : e.options.onColumnSizingInfoChange(o), e.resetColumnSizing = (o) => {
      var t;
      e.setColumnSizing(o ? {} : (t = e.initialState.columnSizing) != null ? t : {});
    }, e.resetHeaderSizeInfo = (o) => {
      var t;
      e.setColumnSizingInfo(o ? se() : (t = e.initialState.columnSizingInfo) != null ? t : se());
    }, e.getTotalSize = () => {
      var o, t;
      return (o = (t = e.getHeaderGroups()[0]) == null ? void 0 : t.headers.reduce((n, r) => n + r.getSize(), 0)) != null ? o : 0;
    }, e.getLeftTotalSize = () => {
      var o, t;
      return (o = (t = e.getLeftHeaderGroups()[0]) == null ? void 0 : t.headers.reduce((n, r) => n + r.getSize(), 0)) != null ? o : 0;
    }, e.getCenterTotalSize = () => {
      var o, t;
      return (o = (t = e.getCenterHeaderGroups()[0]) == null ? void 0 : t.headers.reduce((n, r) => n + r.getSize(), 0)) != null ? o : 0;
    }, e.getRightTotalSize = () => {
      var o, t;
      return (o = (t = e.getRightHeaderGroups()[0]) == null ? void 0 : t.headers.reduce((n, r) => n + r.getSize(), 0)) != null ? o : 0;
    };
  }
};
let W = null;
function qt() {
  if (typeof W == "boolean") return W;
  let e = !1;
  try {
    const o = {
      get passive() {
        return e = !0, !1;
      }
    }, t = () => {
    };
    window.addEventListener("test", t, o), window.removeEventListener("test", t);
  } catch {
    e = !1;
  }
  return W = e, W;
}
function ae(e) {
  return e.type === "touchstart";
}
const Ut = {
  getInitialState: (e) => ({
    columnVisibility: {},
    ...e
  }),
  getDefaultOptions: (e) => ({
    onColumnVisibilityChange: E("columnVisibility", e)
  }),
  createColumn: (e, o) => {
    e.toggleVisibility = (t) => {
      e.getCanHide() && o.setColumnVisibility((n) => ({
        ...n,
        [e.id]: t ?? !e.getIsVisible()
      }));
    }, e.getIsVisible = () => {
      var t, n;
      const r = e.columns;
      return (t = r.length ? r.some((i) => i.getIsVisible()) : (n = o.getState().columnVisibility) == null ? void 0 : n[e.id]) != null ? t : !0;
    }, e.getCanHide = () => {
      var t, n;
      return ((t = e.columnDef.enableHiding) != null ? t : !0) && ((n = o.options.enableHiding) != null ? n : !0);
    }, e.getToggleVisibilityHandler = () => (t) => {
      e.toggleVisibility == null || e.toggleVisibility(t.target.checked);
    };
  },
  createRow: (e, o) => {
    e._getAllVisibleCells = w(() => [e.getAllCells(), o.getState().columnVisibility], (t) => t.filter((n) => n.column.getIsVisible()), R(o.options, "debugRows", "_getAllVisibleCells")), e.getVisibleCells = w(() => [e.getLeftVisibleCells(), e.getCenterVisibleCells(), e.getRightVisibleCells()], (t, n, r) => [...t, ...n, ...r], R(o.options, "debugRows", "getVisibleCells"));
  },
  createTable: (e) => {
    const o = (t, n) => w(() => [n(), n().filter((r) => r.getIsVisible()).map((r) => r.id).join("_")], (r) => r.filter((i) => i.getIsVisible == null ? void 0 : i.getIsVisible()), R(e.options, "debugColumns", t));
    e.getVisibleFlatColumns = o("getVisibleFlatColumns", () => e.getAllFlatColumns()), e.getVisibleLeafColumns = o("getVisibleLeafColumns", () => e.getAllLeafColumns()), e.getLeftVisibleLeafColumns = o("getLeftVisibleLeafColumns", () => e.getLeftLeafColumns()), e.getRightVisibleLeafColumns = o("getRightVisibleLeafColumns", () => e.getRightLeafColumns()), e.getCenterVisibleLeafColumns = o("getCenterVisibleLeafColumns", () => e.getCenterLeafColumns()), e.setColumnVisibility = (t) => e.options.onColumnVisibilityChange == null ? void 0 : e.options.onColumnVisibilityChange(t), e.resetColumnVisibility = (t) => {
      var n;
      e.setColumnVisibility(t ? {} : (n = e.initialState.columnVisibility) != null ? n : {});
    }, e.toggleAllColumnsVisible = (t) => {
      var n;
      t = (n = t) != null ? n : !e.getIsAllColumnsVisible(), e.setColumnVisibility(e.getAllLeafColumns().reduce((r, i) => ({
        ...r,
        [i.id]: t || !(i.getCanHide != null && i.getCanHide())
      }), {}));
    }, e.getIsAllColumnsVisible = () => !e.getAllLeafColumns().some((t) => !(t.getIsVisible != null && t.getIsVisible())), e.getIsSomeColumnsVisible = () => e.getAllLeafColumns().some((t) => t.getIsVisible == null ? void 0 : t.getIsVisible()), e.getToggleAllColumnsVisibilityHandler = () => (t) => {
      var n;
      e.toggleAllColumnsVisible((n = t.target) == null ? void 0 : n.checked);
    };
  }
};
function q(e, o) {
  return o ? o === "center" ? e.getCenterVisibleLeafColumns() : o === "left" ? e.getLeftVisibleLeafColumns() : e.getRightVisibleLeafColumns() : e.getVisibleLeafColumns();
}
const bt = {
  createTable: (e) => {
    e._getGlobalFacetedRowModel = e.options.getFacetedRowModel && e.options.getFacetedRowModel(e, "__global__"), e.getGlobalFacetedRowModel = () => e.options.manualFiltering || !e._getGlobalFacetedRowModel ? e.getPreFilteredRowModel() : e._getGlobalFacetedRowModel(), e._getGlobalFacetedUniqueValues = e.options.getFacetedUniqueValues && e.options.getFacetedUniqueValues(e, "__global__"), e.getGlobalFacetedUniqueValues = () => e._getGlobalFacetedUniqueValues ? e._getGlobalFacetedUniqueValues() : /* @__PURE__ */ new Map(), e._getGlobalFacetedMinMaxValues = e.options.getFacetedMinMaxValues && e.options.getFacetedMinMaxValues(e, "__global__"), e.getGlobalFacetedMinMaxValues = () => {
      if (e._getGlobalFacetedMinMaxValues)
        return e._getGlobalFacetedMinMaxValues();
    };
  }
}, Xt = {
  getInitialState: (e) => ({
    globalFilter: void 0,
    ...e
  }),
  getDefaultOptions: (e) => ({
    onGlobalFilterChange: E("globalFilter", e),
    globalFilterFn: "auto",
    getColumnCanGlobalFilter: (o) => {
      var t;
      const n = (t = e.getCoreRowModel().flatRows[0]) == null || (t = t._getAllCellsByColumnId()[o.id]) == null ? void 0 : t.getValue();
      return typeof n == "string" || typeof n == "number";
    }
  }),
  createColumn: (e, o) => {
    e.getCanGlobalFilter = () => {
      var t, n, r, i;
      return ((t = e.columnDef.enableGlobalFilter) != null ? t : !0) && ((n = o.options.enableGlobalFilter) != null ? n : !0) && ((r = o.options.enableFilters) != null ? r : !0) && ((i = o.options.getColumnCanGlobalFilter == null ? void 0 : o.options.getColumnCanGlobalFilter(e)) != null ? i : !0) && !!e.accessorFn;
    };
  },
  createTable: (e) => {
    e.getGlobalAutoFilterFn = () => G.includesString, e.getGlobalFilterFn = () => {
      var o, t;
      const {
        globalFilterFn: n
      } = e.options;
      return Z(n) ? n : n === "auto" ? e.getGlobalAutoFilterFn() : (o = (t = e.options.filterFns) == null ? void 0 : t[n]) != null ? o : G[n];
    }, e.setGlobalFilter = (o) => {
      e.options.onGlobalFilterChange == null || e.options.onGlobalFilterChange(o);
    }, e.resetGlobalFilter = (o) => {
      e.setGlobalFilter(o ? void 0 : e.initialState.globalFilter);
    };
  }
}, Kt = {
  getInitialState: (e) => ({
    expanded: {},
    ...e
  }),
  getDefaultOptions: (e) => ({
    onExpandedChange: E("expanded", e),
    paginateExpandedRows: !0
  }),
  createTable: (e) => {
    let o = !1, t = !1;
    e._autoResetExpanded = () => {
      var n, r;
      if (!o) {
        e._queue(() => {
          o = !0;
        });
        return;
      }
      if ((n = (r = e.options.autoResetAll) != null ? r : e.options.autoResetExpanded) != null ? n : !e.options.manualExpanding) {
        if (t) return;
        t = !0, e._queue(() => {
          e.resetExpanded(), t = !1;
        });
      }
    }, e.setExpanded = (n) => e.options.onExpandedChange == null ? void 0 : e.options.onExpandedChange(n), e.toggleAllRowsExpanded = (n) => {
      n ?? !e.getIsAllRowsExpanded() ? e.setExpanded(!0) : e.setExpanded({});
    }, e.resetExpanded = (n) => {
      var r, i;
      e.setExpanded(n ? {} : (r = (i = e.initialState) == null ? void 0 : i.expanded) != null ? r : {});
    }, e.getCanSomeRowsExpand = () => e.getPrePaginationRowModel().flatRows.some((n) => n.getCanExpand()), e.getToggleAllRowsExpandedHandler = () => (n) => {
      n.persist == null || n.persist(), e.toggleAllRowsExpanded();
    }, e.getIsSomeRowsExpanded = () => {
      const n = e.getState().expanded;
      return n === !0 || Object.values(n).some(Boolean);
    }, e.getIsAllRowsExpanded = () => {
      const n = e.getState().expanded;
      return typeof n == "boolean" ? n === !0 : !(!Object.keys(n).length || e.getRowModel().flatRows.some((r) => !r.getIsExpanded()));
    }, e.getExpandedDepth = () => {
      let n = 0;
      return (e.getState().expanded === !0 ? Object.keys(e.getRowModel().rowsById) : Object.keys(e.getState().expanded)).forEach((i) => {
        const l = i.split(".");
        n = Math.max(n, l.length);
      }), n;
    }, e.getPreExpandedRowModel = () => e.getSortedRowModel(), e.getExpandedRowModel = () => (!e._getExpandedRowModel && e.options.getExpandedRowModel && (e._getExpandedRowModel = e.options.getExpandedRowModel(e)), e.options.manualExpanding || !e._getExpandedRowModel ? e.getPreExpandedRowModel() : e._getExpandedRowModel());
  },
  createRow: (e, o) => {
    e.toggleExpanded = (t) => {
      o.setExpanded((n) => {
        var r;
        const i = n === !0 ? !0 : !!(n != null && n[e.id]);
        let l = {};
        if (n === !0 ? Object.keys(o.getRowModel().rowsById).forEach((a) => {
          l[a] = !0;
        }) : l = n, t = (r = t) != null ? r : !i, !i && t)
          return {
            ...l,
            [e.id]: !0
          };
        if (i && !t) {
          const {
            [e.id]: a,
            ...u
          } = l;
          return u;
        }
        return n;
      });
    }, e.getIsExpanded = () => {
      var t;
      const n = o.getState().expanded;
      return !!((t = o.options.getIsRowExpanded == null ? void 0 : o.options.getIsRowExpanded(e)) != null ? t : n === !0 || n != null && n[e.id]);
    }, e.getCanExpand = () => {
      var t, n, r;
      return (t = o.options.getRowCanExpand == null ? void 0 : o.options.getRowCanExpand(e)) != null ? t : ((n = o.options.enableExpanding) != null ? n : !0) && !!((r = e.subRows) != null && r.length);
    }, e.getIsAllParentsExpanded = () => {
      let t = !0, n = e;
      for (; t && n.parentId; )
        n = o.getRow(n.parentId, !0), t = n.getIsExpanded();
      return t;
    }, e.getToggleExpandedHandler = () => {
      const t = e.getCanExpand();
      return () => {
        t && e.toggleExpanded();
      };
    };
  }
}, ce = 0, fe = 10, ue = () => ({
  pageIndex: ce,
  pageSize: fe
}), Jt = {
  getInitialState: (e) => ({
    ...e,
    pagination: {
      ...ue(),
      ...e == null ? void 0 : e.pagination
    }
  }),
  getDefaultOptions: (e) => ({
    onPaginationChange: E("pagination", e)
  }),
  createTable: (e) => {
    let o = !1, t = !1;
    e._autoResetPageIndex = () => {
      var n, r;
      if (!o) {
        e._queue(() => {
          o = !0;
        });
        return;
      }
      if ((n = (r = e.options.autoResetAll) != null ? r : e.options.autoResetPageIndex) != null ? n : !e.options.manualPagination) {
        if (t) return;
        t = !0, e._queue(() => {
          e.resetPageIndex(), t = !1;
        });
      }
    }, e.setPagination = (n) => {
      const r = (i) => O(n, i);
      return e.options.onPaginationChange == null ? void 0 : e.options.onPaginationChange(r);
    }, e.resetPagination = (n) => {
      var r;
      e.setPagination(n ? ue() : (r = e.initialState.pagination) != null ? r : ue());
    }, e.setPageIndex = (n) => {
      e.setPagination((r) => {
        let i = O(n, r.pageIndex);
        const l = typeof e.options.pageCount > "u" || e.options.pageCount === -1 ? Number.MAX_SAFE_INTEGER : e.options.pageCount - 1;
        return i = Math.max(0, Math.min(i, l)), {
          ...r,
          pageIndex: i
        };
      });
    }, e.resetPageIndex = (n) => {
      var r, i;
      e.setPageIndex(n ? ce : (r = (i = e.initialState) == null || (i = i.pagination) == null ? void 0 : i.pageIndex) != null ? r : ce);
    }, e.resetPageSize = (n) => {
      var r, i;
      e.setPageSize(n ? fe : (r = (i = e.initialState) == null || (i = i.pagination) == null ? void 0 : i.pageSize) != null ? r : fe);
    }, e.setPageSize = (n) => {
      e.setPagination((r) => {
        const i = Math.max(1, O(n, r.pageSize)), l = r.pageSize * r.pageIndex, a = Math.floor(l / i);
        return {
          ...r,
          pageIndex: a,
          pageSize: i
        };
      });
    }, e.setPageCount = (n) => e.setPagination((r) => {
      var i;
      let l = O(n, (i = e.options.pageCount) != null ? i : -1);
      return typeof l == "number" && (l = Math.max(-1, l)), {
        ...r,
        pageCount: l
      };
    }), e.getPageOptions = w(() => [e.getPageCount()], (n) => {
      let r = [];
      return n && n > 0 && (r = [...new Array(n)].fill(null).map((i, l) => l)), r;
    }, R(e.options, "debugTable", "getPageOptions")), e.getCanPreviousPage = () => e.getState().pagination.pageIndex > 0, e.getCanNextPage = () => {
      const {
        pageIndex: n
      } = e.getState().pagination, r = e.getPageCount();
      return r === -1 ? !0 : r === 0 ? !1 : n < r - 1;
    }, e.previousPage = () => e.setPageIndex((n) => n - 1), e.nextPage = () => e.setPageIndex((n) => n + 1), e.firstPage = () => e.setPageIndex(0), e.lastPage = () => e.setPageIndex(e.getPageCount() - 1), e.getPrePaginationRowModel = () => e.getExpandedRowModel(), e.getPaginationRowModel = () => (!e._getPaginationRowModel && e.options.getPaginationRowModel && (e._getPaginationRowModel = e.options.getPaginationRowModel(e)), e.options.manualPagination || !e._getPaginationRowModel ? e.getPrePaginationRowModel() : e._getPaginationRowModel()), e.getPageCount = () => {
      var n;
      return (n = e.options.pageCount) != null ? n : Math.ceil(e.getRowCount() / e.getState().pagination.pageSize);
    }, e.getRowCount = () => {
      var n;
      return (n = e.options.rowCount) != null ? n : e.getPrePaginationRowModel().rows.length;
    };
  }
}, ge = () => ({
  top: [],
  bottom: []
}), Qt = {
  getInitialState: (e) => ({
    rowPinning: ge(),
    ...e
  }),
  getDefaultOptions: (e) => ({
    onRowPinningChange: E("rowPinning", e)
  }),
  createRow: (e, o) => {
    e.pin = (t, n, r) => {
      const i = n ? e.getLeafRows().map((u) => {
        let {
          id: g
        } = u;
        return g;
      }) : [], l = r ? e.getParentRows().map((u) => {
        let {
          id: g
        } = u;
        return g;
      }) : [], a = /* @__PURE__ */ new Set([...l, e.id, ...i]);
      o.setRowPinning((u) => {
        var g, f;
        if (t === "bottom") {
          var h, d;
          return {
            top: ((h = u == null ? void 0 : u.top) != null ? h : []).filter((m) => !(a != null && a.has(m))),
            bottom: [...((d = u == null ? void 0 : u.bottom) != null ? d : []).filter((m) => !(a != null && a.has(m))), ...Array.from(a)]
          };
        }
        if (t === "top") {
          var s, p;
          return {
            top: [...((s = u == null ? void 0 : u.top) != null ? s : []).filter((m) => !(a != null && a.has(m))), ...Array.from(a)],
            bottom: ((p = u == null ? void 0 : u.bottom) != null ? p : []).filter((m) => !(a != null && a.has(m)))
          };
        }
        return {
          top: ((g = u == null ? void 0 : u.top) != null ? g : []).filter((m) => !(a != null && a.has(m))),
          bottom: ((f = u == null ? void 0 : u.bottom) != null ? f : []).filter((m) => !(a != null && a.has(m)))
        };
      });
    }, e.getCanPin = () => {
      var t;
      const {
        enableRowPinning: n,
        enablePinning: r
      } = o.options;
      return typeof n == "function" ? n(e) : (t = n ?? r) != null ? t : !0;
    }, e.getIsPinned = () => {
      const t = [e.id], {
        top: n,
        bottom: r
      } = o.getState().rowPinning, i = t.some((a) => n == null ? void 0 : n.includes(a)), l = t.some((a) => r == null ? void 0 : r.includes(a));
      return i ? "top" : l ? "bottom" : !1;
    }, e.getPinnedIndex = () => {
      var t, n;
      const r = e.getIsPinned();
      if (!r) return -1;
      const i = (t = r === "top" ? o.getTopRows() : o.getBottomRows()) == null ? void 0 : t.map((l) => {
        let {
          id: a
        } = l;
        return a;
      });
      return (n = i == null ? void 0 : i.indexOf(e.id)) != null ? n : -1;
    };
  },
  createTable: (e) => {
    e.setRowPinning = (o) => e.options.onRowPinningChange == null ? void 0 : e.options.onRowPinningChange(o), e.resetRowPinning = (o) => {
      var t, n;
      return e.setRowPinning(o ? ge() : (t = (n = e.initialState) == null ? void 0 : n.rowPinning) != null ? t : ge());
    }, e.getIsSomeRowsPinned = (o) => {
      var t;
      const n = e.getState().rowPinning;
      if (!o) {
        var r, i;
        return !!((r = n.top) != null && r.length || (i = n.bottom) != null && i.length);
      }
      return !!((t = n[o]) != null && t.length);
    }, e._getPinnedRows = (o, t, n) => {
      var r;
      return ((r = e.options.keepPinnedRows) == null || r ? (
        //get all rows that are pinned even if they would not be otherwise visible
        //account for expanded parent rows, but not pagination or filtering
        (t ?? []).map((l) => {
          const a = e.getRow(l, !0);
          return a.getIsAllParentsExpanded() ? a : null;
        })
      ) : (
        //else get only visible rows that are pinned
        (t ?? []).map((l) => o.find((a) => a.id === l))
      )).filter(Boolean).map((l) => ({
        ...l,
        position: n
      }));
    }, e.getTopRows = w(() => [e.getRowModel().rows, e.getState().rowPinning.top], (o, t) => e._getPinnedRows(o, t, "top"), R(e.options, "debugRows", "getTopRows")), e.getBottomRows = w(() => [e.getRowModel().rows, e.getState().rowPinning.bottom], (o, t) => e._getPinnedRows(o, t, "bottom"), R(e.options, "debugRows", "getBottomRows")), e.getCenterRows = w(() => [e.getRowModel().rows, e.getState().rowPinning.top, e.getState().rowPinning.bottom], (o, t, n) => {
      const r = /* @__PURE__ */ new Set([...t ?? [], ...n ?? []]);
      return o.filter((i) => !r.has(i.id));
    }, R(e.options, "debugRows", "getCenterRows"));
  }
}, Wt = {
  getInitialState: (e) => ({
    rowSelection: {},
    ...e
  }),
  getDefaultOptions: (e) => ({
    onRowSelectionChange: E("rowSelection", e),
    enableRowSelection: !0,
    enableMultiRowSelection: !0,
    enableSubRowSelection: !0
    // enableGroupingRowSelection: false,
    // isAdditiveSelectEvent: (e: unknown) => !!e.metaKey,
    // isInclusiveSelectEvent: (e: unknown) => !!e.shiftKey,
  }),
  createTable: (e) => {
    e.setRowSelection = (o) => e.options.onRowSelectionChange == null ? void 0 : e.options.onRowSelectionChange(o), e.resetRowSelection = (o) => {
      var t;
      return e.setRowSelection(o ? {} : (t = e.initialState.rowSelection) != null ? t : {});
    }, e.toggleAllRowsSelected = (o) => {
      e.setRowSelection((t) => {
        o = typeof o < "u" ? o : !e.getIsAllRowsSelected();
        const n = {
          ...t
        }, r = e.getPreGroupedRowModel().flatRows;
        return o ? r.forEach((i) => {
          i.getCanSelect() && (n[i.id] = !0);
        }) : r.forEach((i) => {
          delete n[i.id];
        }), n;
      });
    }, e.toggleAllPageRowsSelected = (o) => e.setRowSelection((t) => {
      const n = typeof o < "u" ? o : !e.getIsAllPageRowsSelected(), r = {
        ...t
      };
      return e.getRowModel().rows.forEach((i) => {
        pe(r, i.id, n, !0, e);
      }), r;
    }), e.getPreSelectedRowModel = () => e.getCoreRowModel(), e.getSelectedRowModel = w(() => [e.getState().rowSelection, e.getCoreRowModel()], (o, t) => Object.keys(o).length ? de(e, t) : {
      rows: [],
      flatRows: [],
      rowsById: {}
    }, R(e.options, "debugTable", "getSelectedRowModel")), e.getFilteredSelectedRowModel = w(() => [e.getState().rowSelection, e.getFilteredRowModel()], (o, t) => Object.keys(o).length ? de(e, t) : {
      rows: [],
      flatRows: [],
      rowsById: {}
    }, R(e.options, "debugTable", "getFilteredSelectedRowModel")), e.getGroupedSelectedRowModel = w(() => [e.getState().rowSelection, e.getSortedRowModel()], (o, t) => Object.keys(o).length ? de(e, t) : {
      rows: [],
      flatRows: [],
      rowsById: {}
    }, R(e.options, "debugTable", "getGroupedSelectedRowModel")), e.getIsAllRowsSelected = () => {
      const o = e.getFilteredRowModel().flatRows, {
        rowSelection: t
      } = e.getState();
      let n = !!(o.length && Object.keys(t).length);
      return n && o.some((r) => r.getCanSelect() && !t[r.id]) && (n = !1), n;
    }, e.getIsAllPageRowsSelected = () => {
      const o = e.getPaginationRowModel().flatRows.filter((r) => r.getCanSelect()), {
        rowSelection: t
      } = e.getState();
      let n = !!o.length;
      return n && o.some((r) => !t[r.id]) && (n = !1), n;
    }, e.getIsSomeRowsSelected = () => {
      var o;
      const t = Object.keys((o = e.getState().rowSelection) != null ? o : {}).length;
      return t > 0 && t < e.getFilteredRowModel().flatRows.length;
    }, e.getIsSomePageRowsSelected = () => {
      const o = e.getPaginationRowModel().flatRows;
      return e.getIsAllPageRowsSelected() ? !1 : o.filter((t) => t.getCanSelect()).some((t) => t.getIsSelected() || t.getIsSomeSelected());
    }, e.getToggleAllRowsSelectedHandler = () => (o) => {
      e.toggleAllRowsSelected(o.target.checked);
    }, e.getToggleAllPageRowsSelectedHandler = () => (o) => {
      e.toggleAllPageRowsSelected(o.target.checked);
    };
  },
  createRow: (e, o) => {
    e.toggleSelected = (t, n) => {
      const r = e.getIsSelected();
      o.setRowSelection((i) => {
        var l;
        if (t = typeof t < "u" ? t : !r, e.getCanSelect() && r === t)
          return i;
        const a = {
          ...i
        };
        return pe(a, e.id, t, (l = n == null ? void 0 : n.selectChildren) != null ? l : !0, o), a;
      });
    }, e.getIsSelected = () => {
      const {
        rowSelection: t
      } = o.getState();
      return we(e, t);
    }, e.getIsSomeSelected = () => {
      const {
        rowSelection: t
      } = o.getState();
      return me(e, t) === "some";
    }, e.getIsAllSubRowsSelected = () => {
      const {
        rowSelection: t
      } = o.getState();
      return me(e, t) === "all";
    }, e.getCanSelect = () => {
      var t;
      return typeof o.options.enableRowSelection == "function" ? o.options.enableRowSelection(e) : (t = o.options.enableRowSelection) != null ? t : !0;
    }, e.getCanSelectSubRows = () => {
      var t;
      return typeof o.options.enableSubRowSelection == "function" ? o.options.enableSubRowSelection(e) : (t = o.options.enableSubRowSelection) != null ? t : !0;
    }, e.getCanMultiSelect = () => {
      var t;
      return typeof o.options.enableMultiRowSelection == "function" ? o.options.enableMultiRowSelection(e) : (t = o.options.enableMultiRowSelection) != null ? t : !0;
    }, e.getToggleSelectedHandler = () => {
      const t = e.getCanSelect();
      return (n) => {
        var r;
        t && e.toggleSelected((r = n.target) == null ? void 0 : r.checked);
      };
    };
  }
}, pe = (e, o, t, n, r) => {
  var i;
  const l = r.getRow(o, !0);
  t ? (l.getCanMultiSelect() || Object.keys(e).forEach((a) => delete e[a]), l.getCanSelect() && (e[o] = !0)) : delete e[o], n && (i = l.subRows) != null && i.length && l.getCanSelectSubRows() && l.subRows.forEach((a) => pe(e, a.id, t, n, r));
};
function de(e, o) {
  const t = e.getState().rowSelection, n = [], r = {}, i = function(l, a) {
    return l.map((u) => {
      var g;
      const f = we(u, t);
      if (f && (n.push(u), r[u.id] = u), (g = u.subRows) != null && g.length && (u = {
        ...u,
        subRows: i(u.subRows)
      }), f)
        return u;
    }).filter(Boolean);
  };
  return {
    rows: i(o.rows),
    flatRows: n,
    rowsById: r
  };
}
function we(e, o) {
  var t;
  return (t = o[e.id]) != null ? t : !1;
}
function me(e, o, t) {
  var n;
  if (!((n = e.subRows) != null && n.length)) return !1;
  let r = !0, i = !1;
  return e.subRows.forEach((l) => {
    if (!(i && !r) && (l.getCanSelect() && (we(l, o) ? i = !0 : r = !1), l.subRows && l.subRows.length)) {
      const a = me(l, o);
      a === "all" ? i = !0 : (a === "some" && (i = !0), r = !1);
    }
  }), r ? "all" : i ? "some" : !1;
}
const he = /([0-9]+)/gm, Yt = (e, o, t) => We(T(e.getValue(t)).toLowerCase(), T(o.getValue(t)).toLowerCase()), Zt = (e, o, t) => We(T(e.getValue(t)), T(o.getValue(t))), en = (e, o, t) => Re(T(e.getValue(t)).toLowerCase(), T(o.getValue(t)).toLowerCase()), tn = (e, o, t) => Re(T(e.getValue(t)), T(o.getValue(t))), nn = (e, o, t) => {
  const n = e.getValue(t), r = o.getValue(t);
  return n > r ? 1 : n < r ? -1 : 0;
}, on = (e, o, t) => Re(e.getValue(t), o.getValue(t));
function Re(e, o) {
  return e === o ? 0 : e > o ? 1 : -1;
}
function T(e) {
  return typeof e == "number" ? isNaN(e) || e === 1 / 0 || e === -1 / 0 ? "" : String(e) : typeof e == "string" ? e : "";
}
function We(e, o) {
  const t = e.split(he).filter(Boolean), n = o.split(he).filter(Boolean);
  for (; t.length && n.length; ) {
    const r = t.shift(), i = n.shift(), l = parseInt(r, 10), a = parseInt(i, 10), u = [l, a].sort();
    if (isNaN(u[0])) {
      if (r > i)
        return 1;
      if (i > r)
        return -1;
      continue;
    }
    if (isNaN(u[1]))
      return isNaN(l) ? -1 : 1;
    if (l > a)
      return 1;
    if (a > l)
      return -1;
  }
  return t.length - n.length;
}
const B = {
  alphanumeric: Yt,
  alphanumericCaseSensitive: Zt,
  text: en,
  textCaseSensitive: tn,
  datetime: nn,
  basic: on
}, rn = {
  getInitialState: (e) => ({
    sorting: [],
    ...e
  }),
  getDefaultColumnDef: () => ({
    sortingFn: "auto",
    sortUndefined: 1
  }),
  getDefaultOptions: (e) => ({
    onSortingChange: E("sorting", e),
    isMultiSortEvent: (o) => o.shiftKey
  }),
  createColumn: (e, o) => {
    e.getAutoSortingFn = () => {
      const t = o.getFilteredRowModel().flatRows.slice(10);
      let n = !1;
      for (const r of t) {
        const i = r == null ? void 0 : r.getValue(e.id);
        if (Object.prototype.toString.call(i) === "[object Date]")
          return B.datetime;
        if (typeof i == "string" && (n = !0, i.split(he).length > 1))
          return B.alphanumeric;
      }
      return n ? B.text : B.basic;
    }, e.getAutoSortDir = () => {
      const t = o.getFilteredRowModel().flatRows[0];
      return typeof (t == null ? void 0 : t.getValue(e.id)) == "string" ? "asc" : "desc";
    }, e.getSortingFn = () => {
      var t, n;
      if (!e)
        throw new Error();
      return Z(e.columnDef.sortingFn) ? e.columnDef.sortingFn : e.columnDef.sortingFn === "auto" ? e.getAutoSortingFn() : (t = (n = o.options.sortingFns) == null ? void 0 : n[e.columnDef.sortingFn]) != null ? t : B[e.columnDef.sortingFn];
    }, e.toggleSorting = (t, n) => {
      const r = e.getNextSortingOrder(), i = typeof t < "u" && t !== null;
      o.setSorting((l) => {
        const a = l == null ? void 0 : l.find((s) => s.id === e.id), u = l == null ? void 0 : l.findIndex((s) => s.id === e.id);
        let g = [], f, h = i ? t : r === "desc";
        if (l != null && l.length && e.getCanMultiSort() && n ? a ? f = "toggle" : f = "add" : l != null && l.length && u !== l.length - 1 ? f = "replace" : a ? f = "toggle" : f = "replace", f === "toggle" && (i || r || (f = "remove")), f === "add") {
          var d;
          g = [...l, {
            id: e.id,
            desc: h
          }], g.splice(0, g.length - ((d = o.options.maxMultiSortColCount) != null ? d : Number.MAX_SAFE_INTEGER));
        } else f === "toggle" ? g = l.map((s) => s.id === e.id ? {
          ...s,
          desc: h
        } : s) : f === "remove" ? g = l.filter((s) => s.id !== e.id) : g = [{
          id: e.id,
          desc: h
        }];
        return g;
      });
    }, e.getFirstSortDir = () => {
      var t, n;
      return ((t = (n = e.columnDef.sortDescFirst) != null ? n : o.options.sortDescFirst) != null ? t : e.getAutoSortDir() === "desc") ? "desc" : "asc";
    }, e.getNextSortingOrder = (t) => {
      var n, r;
      const i = e.getFirstSortDir(), l = e.getIsSorted();
      return l ? l !== i && ((n = o.options.enableSortingRemoval) == null || n) && // If enableSortRemove, enable in general
      (!(t && (r = o.options.enableMultiRemove) != null) || r) ? !1 : l === "desc" ? "asc" : "desc" : i;
    }, e.getCanSort = () => {
      var t, n;
      return ((t = e.columnDef.enableSorting) != null ? t : !0) && ((n = o.options.enableSorting) != null ? n : !0) && !!e.accessorFn;
    }, e.getCanMultiSort = () => {
      var t, n;
      return (t = (n = e.columnDef.enableMultiSort) != null ? n : o.options.enableMultiSort) != null ? t : !!e.accessorFn;
    }, e.getIsSorted = () => {
      var t;
      const n = (t = o.getState().sorting) == null ? void 0 : t.find((r) => r.id === e.id);
      return n ? n.desc ? "desc" : "asc" : !1;
    }, e.getSortIndex = () => {
      var t, n;
      return (t = (n = o.getState().sorting) == null ? void 0 : n.findIndex((r) => r.id === e.id)) != null ? t : -1;
    }, e.clearSorting = () => {
      o.setSorting((t) => t != null && t.length ? t.filter((n) => n.id !== e.id) : []);
    }, e.getToggleSortingHandler = () => {
      const t = e.getCanSort();
      return (n) => {
        t && (n.persist == null || n.persist(), e.toggleSorting == null || e.toggleSorting(void 0, e.getCanMultiSort() ? o.options.isMultiSortEvent == null ? void 0 : o.options.isMultiSortEvent(n) : !1));
      };
    };
  },
  createTable: (e) => {
    e.setSorting = (o) => e.options.onSortingChange == null ? void 0 : e.options.onSortingChange(o), e.resetSorting = (o) => {
      var t, n;
      e.setSorting(o ? [] : (t = (n = e.initialState) == null ? void 0 : n.sorting) != null ? t : []);
    }, e.getPreSortedRowModel = () => e.getGroupedRowModel(), e.getSortedRowModel = () => (!e._getSortedRowModel && e.options.getSortedRowModel && (e._getSortedRowModel = e.options.getSortedRowModel(e)), e.options.manualSorting || !e._getSortedRowModel ? e.getPreSortedRowModel() : e._getSortedRowModel());
  }
}, ln = [
  Vt,
  Ut,
  Ot,
  Tt,
  Mt,
  Pt,
  bt,
  //depends on ColumnFaceting
  Xt,
  //depends on ColumnFiltering
  rn,
  Nt,
  //depends on RowSorting
  Kt,
  Jt,
  Qt,
  Wt,
  Bt
];
function sn(e) {
  var o, t;
  process.env.NODE_ENV !== "production" && (e.debugAll || e.debugTable) && console.info("Creating Table Instance...");
  const n = [...ln, ...(o = e._features) != null ? o : []];
  let r = {
    _features: n
  };
  const i = r._features.reduce((d, s) => Object.assign(d, s.getDefaultOptions == null ? void 0 : s.getDefaultOptions(r)), {}), l = (d) => r.options.mergeOptions ? r.options.mergeOptions(i, d) : {
    ...i,
    ...d
  };
  let u = {
    ...{},
    ...(t = e.initialState) != null ? t : {}
  };
  r._features.forEach((d) => {
    var s;
    u = (s = d.getInitialState == null ? void 0 : d.getInitialState(u)) != null ? s : u;
  });
  const g = [];
  let f = !1;
  const h = {
    _features: n,
    options: {
      ...i,
      ...e
    },
    initialState: u,
    _queue: (d) => {
      g.push(d), f || (f = !0, Promise.resolve().then(() => {
        for (; g.length; )
          g.shift()();
        f = !1;
      }).catch((s) => setTimeout(() => {
        throw s;
      })));
    },
    reset: () => {
      r.setState(r.initialState);
    },
    setOptions: (d) => {
      const s = O(d, r.options);
      r.options = l(s);
    },
    getState: () => r.options.state,
    setState: (d) => {
      r.options.onStateChange == null || r.options.onStateChange(d);
    },
    _getRowId: (d, s, p) => {
      var m;
      return (m = r.options.getRowId == null ? void 0 : r.options.getRowId(d, s, p)) != null ? m : `${p ? [p.id, s].join(".") : s}`;
    },
    getCoreRowModel: () => (r._getCoreRowModel || (r._getCoreRowModel = r.options.getCoreRowModel(r)), r._getCoreRowModel()),
    // The final calls start at the bottom of the model,
    // expanded rows, which then work their way up
    getRowModel: () => r.getPaginationRowModel(),
    //in next version, we should just pass in the row model as the optional 2nd arg
    getRow: (d, s) => {
      let p = (s ? r.getPrePaginationRowModel() : r.getRowModel()).rowsById[d];
      if (!p && (p = r.getCoreRowModel().rowsById[d], !p))
        throw process.env.NODE_ENV !== "production" ? new Error(`getRow could not find row with ID: ${d}`) : new Error();
      return p;
    },
    _getDefaultColumnDef: w(() => [r.options.defaultColumn], (d) => {
      var s;
      return d = (s = d) != null ? s : {}, {
        header: (p) => {
          const m = p.header.column.columnDef;
          return m.accessorKey ? m.accessorKey : m.accessorFn ? m.id : null;
        },
        // footer: props => props.header.column.id,
        cell: (p) => {
          var m, v;
          return (m = (v = p.renderValue()) == null || v.toString == null ? void 0 : v.toString()) != null ? m : null;
        },
        ...r._features.reduce((p, m) => Object.assign(p, m.getDefaultColumnDef == null ? void 0 : m.getDefaultColumnDef()), {}),
        ...d
      };
    }, R(e, "debugColumns", "_getDefaultColumnDef")),
    _getColumnDefs: () => r.options.columns,
    getAllColumns: w(() => [r._getColumnDefs()], (d) => {
      const s = function(p, m, v) {
        return v === void 0 && (v = 0), p.map((x) => {
          const _ = $t(r, x, v, m), V = x;
          return _.columns = V.columns ? s(V.columns, _, v + 1) : [], _;
        });
      };
      return s(d);
    }, R(e, "debugColumns", "getAllColumns")),
    getAllFlatColumns: w(() => [r.getAllColumns()], (d) => d.flatMap((s) => s.getFlatColumns()), R(e, "debugColumns", "getAllFlatColumns")),
    _getAllFlatColumnsById: w(() => [r.getAllFlatColumns()], (d) => d.reduce((s, p) => (s[p.id] = p, s), {}), R(e, "debugColumns", "getAllFlatColumnsById")),
    getAllLeafColumns: w(() => [r.getAllColumns(), r._getOrderColumnsFn()], (d, s) => {
      let p = d.flatMap((m) => m.getLeafColumns());
      return s(p);
    }, R(e, "debugColumns", "getAllLeafColumns")),
    getColumn: (d) => {
      const s = r._getAllFlatColumnsById()[d];
      return process.env.NODE_ENV !== "production" && !s && console.error(`[Table] Column with id '${d}' does not exist.`), s;
    }
  };
  Object.assign(r, h);
  for (let d = 0; d < r._features.length; d++) {
    const s = r._features[d];
    s == null || s.createTable == null || s.createTable(r);
  }
  return r;
}
function an() {
  return (e) => w(() => [e.options.data], (o) => {
    const t = {
      rows: [],
      flatRows: [],
      rowsById: {}
    }, n = function(r, i, l) {
      i === void 0 && (i = 0);
      const a = [];
      for (let g = 0; g < r.length; g++) {
        const f = Se(e, e._getRowId(r[g], g, l), r[g], g, i, void 0, l == null ? void 0 : l.id);
        if (t.flatRows.push(f), t.rowsById[f.id] = f, a.push(f), e.options.getSubRows) {
          var u;
          f.originalSubRows = e.options.getSubRows(r[g], g), (u = f.originalSubRows) != null && u.length && (f.subRows = n(f.originalSubRows, i + 1, f));
        }
      }
      return a;
    };
    return t.rows = n(o), t;
  }, R(e.options, "debugTable", "getRowModel", () => e._autoResetPageIndex()));
}
function un(e) {
  const o = [], t = (n) => {
    var r;
    o.push(n), (r = n.subRows) != null && r.length && n.getIsExpanded() && n.subRows.forEach(t);
  };
  return e.rows.forEach(t), {
    rows: o,
    flatRows: e.flatRows,
    rowsById: e.rowsById
  };
}
function gn(e, o, t) {
  return t.options.filterFromLeafRows ? dn(e, o, t) : cn(e, o, t);
}
function dn(e, o, t) {
  var n;
  const r = [], i = {}, l = (n = t.options.maxLeafRowFilterDepth) != null ? n : 100, a = function(u, g) {
    g === void 0 && (g = 0);
    const f = [];
    for (let d = 0; d < u.length; d++) {
      var h;
      let s = u[d];
      const p = Se(t, s.id, s.original, s.index, s.depth, void 0, s.parentId);
      if (p.columnFilters = s.columnFilters, (h = s.subRows) != null && h.length && g < l) {
        if (p.subRows = a(s.subRows, g + 1), s = p, o(s) && !p.subRows.length) {
          f.push(s), i[s.id] = s, r.push(s);
          continue;
        }
        if (o(s) || p.subRows.length) {
          f.push(s), i[s.id] = s, r.push(s);
          continue;
        }
      } else
        s = p, o(s) && (f.push(s), i[s.id] = s, r.push(s));
    }
    return f;
  };
  return {
    rows: a(e),
    flatRows: r,
    rowsById: i
  };
}
function cn(e, o, t) {
  var n;
  const r = [], i = {}, l = (n = t.options.maxLeafRowFilterDepth) != null ? n : 100, a = function(u, g) {
    g === void 0 && (g = 0);
    const f = [];
    for (let d = 0; d < u.length; d++) {
      let s = u[d];
      if (o(s)) {
        var h;
        if ((h = s.subRows) != null && h.length && g < l) {
          const m = Se(t, s.id, s.original, s.index, s.depth, void 0, s.parentId);
          m.subRows = a(s.subRows, g + 1), s = m;
        }
        f.push(s), r.push(s), i[s.id] = s;
      }
    }
    return f;
  };
  return {
    rows: a(e),
    flatRows: r,
    rowsById: i
  };
}
function fn() {
  return (e) => w(() => [e.getPreFilteredRowModel(), e.getState().columnFilters, e.getState().globalFilter], (o, t, n) => {
    if (!o.rows.length || !(t != null && t.length) && !n) {
      for (let d = 0; d < o.flatRows.length; d++)
        o.flatRows[d].columnFilters = {}, o.flatRows[d].columnFiltersMeta = {};
      return o;
    }
    const r = [], i = [];
    (t ?? []).forEach((d) => {
      var s;
      const p = e.getColumn(d.id);
      if (!p)
        return;
      const m = p.getFilterFn();
      if (!m) {
        process.env.NODE_ENV !== "production" && console.warn(`Could not find a valid 'column.filterFn' for column with the ID: ${p.id}.`);
        return;
      }
      r.push({
        id: d.id,
        filterFn: m,
        resolvedValue: (s = m.resolveFilterValue == null ? void 0 : m.resolveFilterValue(d.value)) != null ? s : d.value
      });
    });
    const l = (t ?? []).map((d) => d.id), a = e.getGlobalFilterFn(), u = e.getAllLeafColumns().filter((d) => d.getCanGlobalFilter());
    n && a && u.length && (l.push("__global__"), u.forEach((d) => {
      var s;
      i.push({
        id: d.id,
        filterFn: a,
        resolvedValue: (s = a.resolveFilterValue == null ? void 0 : a.resolveFilterValue(n)) != null ? s : n
      });
    }));
    let g, f;
    for (let d = 0; d < o.flatRows.length; d++) {
      const s = o.flatRows[d];
      if (s.columnFilters = {}, r.length)
        for (let p = 0; p < r.length; p++) {
          g = r[p];
          const m = g.id;
          s.columnFilters[m] = g.filterFn(s, m, g.resolvedValue, (v) => {
            s.columnFiltersMeta[m] = v;
          });
        }
      if (i.length) {
        for (let p = 0; p < i.length; p++) {
          f = i[p];
          const m = f.id;
          if (f.filterFn(s, m, f.resolvedValue, (v) => {
            s.columnFiltersMeta[m] = v;
          })) {
            s.columnFilters.__global__ = !0;
            break;
          }
        }
        s.columnFilters.__global__ !== !0 && (s.columnFilters.__global__ = !1);
      }
    }
    const h = (d) => {
      for (let s = 0; s < l.length; s++)
        if (d.columnFilters[l[s]] === !1)
          return !1;
      return !0;
    };
    return gn(o.rows, h, e);
  }, R(e.options, "debugTable", "getFilteredRowModel", () => e._autoResetPageIndex()));
}
function pn(e) {
  return (o) => w(() => [o.getState().pagination, o.getPrePaginationRowModel(), o.options.paginateExpandedRows ? void 0 : o.getState().expanded], (t, n) => {
    if (!n.rows.length)
      return n;
    const {
      pageSize: r,
      pageIndex: i
    } = t;
    let {
      rows: l,
      flatRows: a,
      rowsById: u
    } = n;
    const g = r * i, f = g + r;
    l = l.slice(g, f);
    let h;
    o.options.paginateExpandedRows ? h = {
      rows: l,
      flatRows: a,
      rowsById: u
    } : h = un({
      rows: l,
      flatRows: a,
      rowsById: u
    }), h.flatRows = [];
    const d = (s) => {
      h.flatRows.push(s), s.subRows.length && s.subRows.forEach(d);
    };
    return h.rows.forEach(d), h;
  }, R(o.options, "debugTable", "getPaginationRowModel"));
}
function mn() {
  return (e) => w(() => [e.getState().sorting, e.getPreSortedRowModel()], (o, t) => {
    if (!t.rows.length || !(o != null && o.length))
      return t;
    const n = e.getState().sorting, r = [], i = n.filter((u) => {
      var g;
      return (g = e.getColumn(u.id)) == null ? void 0 : g.getCanSort();
    }), l = {};
    i.forEach((u) => {
      const g = e.getColumn(u.id);
      g && (l[u.id] = {
        sortUndefined: g.columnDef.sortUndefined,
        invertSorting: g.columnDef.invertSorting,
        sortingFn: g.getSortingFn()
      });
    });
    const a = (u) => {
      const g = u.map((f) => ({
        ...f
      }));
      return g.sort((f, h) => {
        for (let s = 0; s < i.length; s += 1) {
          var d;
          const p = i[s], m = l[p.id], v = m.sortUndefined, x = (d = p == null ? void 0 : p.desc) != null ? d : !1;
          let _ = 0;
          if (v) {
            const V = f.getValue(p.id), j = h.getValue(p.id), y = V === void 0, N = j === void 0;
            if (y || N) {
              if (v === "first") return y ? -1 : 1;
              if (v === "last") return y ? 1 : -1;
              _ = y && N ? 0 : y ? v : -v;
            }
          }
          if (_ === 0 && (_ = m.sortingFn(f, h, p.id)), _ !== 0)
            return x && (_ *= -1), m.invertSorting && (_ *= -1), _;
        }
        return f.index - h.index;
      }), g.forEach((f) => {
        var h;
        r.push(f), (h = f.subRows) != null && h.length && (f.subRows = a(f.subRows));
      }), g;
    };
    return {
      rows: a(t.rows),
      flatRows: r,
      rowsById: t.rowsById
    };
  }, R(e.options, "debugTable", "getSortedRowModel", () => e._autoResetPageIndex()));
}
/**
   * react-table
   *
   * Copyright (c) TanStack
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   */
function ke(e, o) {
  return e ? hn(e) ? /* @__PURE__ */ I.createElement(e, o) : e : null;
}
function hn(e) {
  return Sn(e) || typeof e == "function" || Cn(e);
}
function Sn(e) {
  return typeof e == "function" && (() => {
    const o = Object.getPrototypeOf(e);
    return o.prototype && o.prototype.isReactComponent;
  })();
}
function Cn(e) {
  return typeof e == "object" && typeof e.$$typeof == "symbol" && ["react.memo", "react.forward_ref"].includes(e.$$typeof.description);
}
function wn(e) {
  const o = {
    state: {},
    // Dummy state
    onStateChange: () => {
    },
    // noop
    renderFallbackValue: null,
    ...e
  }, [t] = I.useState(() => ({
    current: sn(o)
  })), [n, r] = I.useState(() => t.current.initialState);
  return t.current.setOptions((i) => ({
    ...i,
    ...e,
    state: {
      ...n,
      ...e.state
    },
    // Similarly, we'll maintain both our internal state and any user-provided
    // state.
    onStateChange: (l) => {
      r(l), e.onStateChange == null || e.onStateChange(l);
    }
  })), t.current;
}
function Y(e, o) {
  const { type: t, command: n, url: r, event: i, payload: l, params: a } = e, u = { ...a, ...l, ...o };
  t === "command" && n ? (console.log("Executing command:", n, "with payload:", u), window.dispatchEvent(new CustomEvent("command:execute", { detail: { command: n, payload: u } }))) : t === "navigate" && r ? window.location.href = r : t === "emit" && i ? window.dispatchEvent(new CustomEvent(i, { detail: u })) : t === "http" && r && fetch(r, {
    method: e.method || "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(u)
  }).catch(console.error);
}
function Rn(e, o) {
  var t;
  if (e == null) return "—";
  switch (o) {
    case "badge":
      return /* @__PURE__ */ c.jsx(mt, { variant: e.variant || "default", children: e.text || e });
    case "avatar":
      return /* @__PURE__ */ c.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ c.jsxs(ct, { className: "h-8 w-8", children: [
          /* @__PURE__ */ c.jsx(ft, { src: e.src, alt: e.alt || "" }),
          /* @__PURE__ */ c.jsx(pt, { children: e.fallback || ((t = e.alt) == null ? void 0 : t[0]) || "?" })
        ] }),
        e.label && /* @__PURE__ */ c.jsx("span", { children: e.label })
      ] });
    case "text":
    default:
      return /* @__PURE__ */ c.jsx("span", { children: String(e) });
  }
}
function Vn({ config: e }) {
  var Ve, Me;
  const { props: o } = e, {
    columns: t,
    data: n,
    dataSource: r,
    toolbar: i,
    rowAction: l,
    pagination: a = { enabled: !1, pageSize: 10 },
    selection: u = { enabled: !1, type: "multiple" },
    actions: g,
    loading: f = !1,
    emptyText: h = "No data available",
    className: d
  } = o, [s, p] = I.useState([]), [m, v] = I.useState(f), [x, _] = I.useState(null), [V, j] = K.useState([]), [y, N] = K.useState([]), [U, b] = K.useState({}), [ee, k] = I.useState(!1), [M, Ye] = I.useState(null), [ve, xe] = I.useState(!1), [te, Ze] = I.useState(""), [et, ne] = I.useState(!1), [oe, Fe] = I.useState(null), [tt, _e] = I.useState(!1);
  I.useEffect(() => {
    if (r && !n) {
      v(!0);
      const S = new URLSearchParams();
      te && S.append("search", te), fetch(`/api/ui/datasources/${r}?${S}`).then((C) => C.json()).then((C) => {
        p(C.data || []), v(!1);
      }).catch((C) => {
        _(C.message), v(!1);
      });
    }
  }, [r, n, te]), I.useEffect(() => {
    const S = (C) => {
      C.detail.target === e.id && Ze(C.detail.search);
    };
    return window.addEventListener("component:search", S), () => window.removeEventListener("component:search", S);
  }, [e.id]);
  const $e = n || s, nt = K.useMemo(() => {
    const S = [];
    return u.enabled && S.push({
      id: "select",
      header: ({ table: C }) => u.type === "multiple" ? /* @__PURE__ */ c.jsx(
        ze,
        {
          checked: C.getIsAllPageRowsSelected(),
          onCheckedChange: (F) => C.toggleAllPageRowsSelected(!!F),
          "aria-label": "Select all"
        }
      ) : null,
      cell: ({ row: C }) => /* @__PURE__ */ c.jsx(
        ze,
        {
          checked: C.getIsSelected(),
          onCheckedChange: (F) => C.toggleSelected(!!F),
          "aria-label": "Select row"
        }
      ),
      enableSorting: !1,
      enableHiding: !1,
      size: 40
    }), t.forEach((C) => {
      S.push({
        accessorKey: C.key,
        header: ({ column: F }) => C.sortable ? /* @__PURE__ */ c.jsxs(
          z,
          {
            variant: "ghost",
            size: "sm",
            className: "-ml-3 h-8 data-[state=open]:bg-accent",
            onClick: () => F.toggleSorting(F.getIsSorted() === "asc"),
            children: [
              C.label,
              F.getIsSorted() === "asc" && /* @__PURE__ */ c.jsx(at, { className: "ml-2 h-4 w-4" }),
              F.getIsSorted() === "desc" && /* @__PURE__ */ c.jsx(re, { className: "ml-2 h-4 w-4" }),
              !F.getIsSorted() && /* @__PURE__ */ c.jsx(Rt, { className: "ml-2 h-4 w-4 opacity-50" })
            ]
          }
        ) : /* @__PURE__ */ c.jsx("span", { className: "font-medium", children: C.label }),
        cell: ({ row: F }) => {
          const $ = F.getValue(C.key);
          return /* @__PURE__ */ c.jsx("div", { style: { textAlign: C.align || "left" }, children: Rn($, C.render) });
        },
        enableSorting: C.sortable !== !1,
        size: C.width ? parseInt(C.width) : void 0
      });
    }), g != null && g.rowActions && g.rowActions.length > 0 && S.push({
      id: "actions",
      header: () => /* @__PURE__ */ c.jsx("span", { className: "sr-only", children: "Actions" }),
      cell: ({ row: C }) => /* @__PURE__ */ c.jsxs(ht, { children: [
        /* @__PURE__ */ c.jsx(St, { asChild: !0, children: /* @__PURE__ */ c.jsxs(z, { variant: "ghost", className: "h-8 w-8 p-0", children: [
          /* @__PURE__ */ c.jsx("span", { className: "sr-only", children: "Open menu" }),
          /* @__PURE__ */ c.jsx(vt, { className: "h-4 w-4" })
        ] }) }),
        /* @__PURE__ */ c.jsx(Ct, { align: "end", children: g.rowActions.map((F, $) => {
          var H;
          return /* @__PURE__ */ c.jsx(
            wt,
            {
              onClick: () => {
                var A;
                (A = F.actions) != null && A.click && Y(F.actions.click, C.original);
              },
              children: ((H = F.props) == null ? void 0 : H.label) || `Action ${$ + 1}`
            },
            $
          );
        }) })
      ] }),
      enableSorting: !1,
      size: 60
    }), S;
  }, [t, u, g]), D = wn({
    data: $e,
    columns: nt,
    getCoreRowModel: an(),
    getSortedRowModel: mn(),
    getFilteredRowModel: fn(),
    getPaginationRowModel: a.enabled ? pn() : void 0,
    onSortingChange: j,
    onColumnFiltersChange: N,
    onRowSelectionChange: b,
    state: {
      sorting: V,
      columnFilters: y,
      rowSelection: U
    },
    initialState: {
      pagination: a.enabled ? {
        pageSize: a.pageSize
      } : void 0
    }
  });
  if (m)
    return /* @__PURE__ */ c.jsx("div", { className: "w-full h-64 flex items-center justify-center", children: /* @__PURE__ */ c.jsx("div", { className: "text-muted-foreground", children: "Loading..." }) });
  if (x)
    return /* @__PURE__ */ c.jsx("div", { className: "w-full h-64 flex items-center justify-center border rounded-lg", children: /* @__PURE__ */ c.jsxs("div", { className: "text-destructive", children: [
      "Error: ",
      x
    ] }) });
  if (!$e.length)
    return /* @__PURE__ */ c.jsx("div", { className: "w-full h-64 flex items-center justify-center border rounded-lg", children: /* @__PURE__ */ c.jsx("div", { className: "text-center", children: /* @__PURE__ */ c.jsx("p", { className: "text-muted-foreground", children: h }) }) });
  const ot = async (S) => {
    if (S.preventDefault(), console.log("DataTable: handleFormSubmit called", { formModalConfig: M }), !M) return;
    xe(!0);
    const C = new FormData(S.currentTarget), F = Object.fromEntries(C.entries());
    console.log("DataTable: Form data collected", { data: F, submitUrl: M.submitUrl });
    try {
      console.log("DataTable: About to fetch", { url: M.submitUrl, method: M.submitMethod || "POST" });
      const $ = await fetch(M.submitUrl, {
        method: M.submitMethod || "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(F)
      });
      if (console.log("DataTable: Response received", { status: $.status, ok: $.ok }), $.ok) {
        if (k(!1), M.refreshTarget && r) {
          const A = await (await fetch(`/api/ui/datasources/${r}`)).json();
          p(A.data || []);
        }
      } else {
        const H = await $.json().catch(() => ({}));
        console.error("DataTable: Submit failed", { status: $.status, errorData: H }), alert("Failed to submit form");
      }
    } catch ($) {
      console.error("DataTable: Error submitting form", $), alert("Error submitting form");
    } finally {
      xe(!1);
    }
  }, rt = (S) => {
    var F;
    const C = (F = S.actions) == null ? void 0 : F.click;
    C && (C.type === "modal" && C.modal === "form" ? (Ye(C), k(!0)) : Y(C));
  }, it = (S) => {
    var C;
    return S.type === "button.icon" ? /* @__PURE__ */ c.jsx(
      z,
      {
        variant: "default",
        size: "sm",
        onClick: () => rt(S),
        children: ((C = S.props) == null ? void 0 : C.label) || "Action"
      },
      S.id
    ) : null;
  };
  return /* @__PURE__ */ c.jsxs("div", { className: Pe("space-y-4", d), children: [
    i && i.length > 0 && /* @__PURE__ */ c.jsx("div", { className: "flex justify-end gap-2", children: i.map((S) => it(S)) }),
    /* @__PURE__ */ c.jsx("div", { className: "rounded-md border", children: /* @__PURE__ */ c.jsx("div", { className: "relative w-full overflow-auto", children: /* @__PURE__ */ c.jsxs("table", { className: "w-full caption-bottom text-sm", children: [
      /* @__PURE__ */ c.jsx("thead", { className: "[&_tr]:border-b", children: D.getHeaderGroups().map((S) => /* @__PURE__ */ c.jsx("tr", { className: "border-b transition-colors hover:bg-muted/50", children: S.headers.map((C) => /* @__PURE__ */ c.jsx(
        "th",
        {
          className: "h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
          children: C.isPlaceholder ? null : ke(C.column.columnDef.header, C.getContext())
        },
        C.id
      )) }, S.id)) }),
      /* @__PURE__ */ c.jsx("tbody", { className: "[&_tr:last-child]:border-0", children: D.getRowModel().rows.map((S) => /* @__PURE__ */ c.jsx(
        "tr",
        {
          className: Pe(
            "border-b transition-colors hover:bg-muted/50",
            (l || (g == null ? void 0 : g.rowClick)) && "cursor-pointer",
            S.getIsSelected() && "bg-muted"
          ),
          onClick: async (C) => {
            const F = l || (g == null ? void 0 : g.rowClick);
            if (F && !C.target.closest("button, input"))
              if (F.type === "modal") {
                _e(!0), ne(!0);
                try {
                  const $ = F.url.replace("{{row.id}}", S.original.id);
                  console.log("Fetching details from:", $);
                  const A = await (await fetch($)).json();
                  console.log("Detail response:", A), Fe(A.data || A);
                } catch ($) {
                  console.error("Failed to load details:", $), Fe(null);
                } finally {
                  _e(!1);
                }
              } else if (F.type === "command") {
                const $ = { ...F };
                if ($.params) {
                  const H = {};
                  for (const [A, X] of Object.entries($.params))
                    typeof X == "string" && X.includes("{{") ? H[A] = X.replace(/\{\{row\.([^}]+)\}\}/g, (lt, st) => S.original[st] || lt) : H[A] = X;
                  $.params = H;
                }
                Y($, S.original);
              } else
                Y(F, S.original);
          },
          children: S.getVisibleCells().map((C) => /* @__PURE__ */ c.jsx("td", { className: "p-4 align-middle [&:has([role=checkbox])]:pr-0", children: ke(C.column.columnDef.cell, C.getContext()) }, C.id))
        },
        S.id
      )) })
    ] }) }) }),
    a.enabled && /* @__PURE__ */ c.jsxs("div", { className: "flex items-center justify-between px-2", children: [
      /* @__PURE__ */ c.jsx("div", { className: "flex-1 text-sm text-muted-foreground", children: u.enabled && D.getFilteredSelectedRowModel().rows.length > 0 && /* @__PURE__ */ c.jsxs("span", { children: [
        D.getFilteredSelectedRowModel().rows.length,
        " of",
        " ",
        D.getFilteredRowModel().rows.length,
        " row(s) selected."
      ] }) }),
      /* @__PURE__ */ c.jsxs("div", { className: "flex items-center space-x-6 lg:space-x-8", children: [
        /* @__PURE__ */ c.jsxs("div", { className: "flex items-center space-x-2", children: [
          /* @__PURE__ */ c.jsx("p", { className: "text-sm font-medium", children: "Rows per page" }),
          /* @__PURE__ */ c.jsxs(
            ye,
            {
              value: `${D.getState().pagination.pageSize}`,
              onValueChange: (S) => {
                D.setPageSize(Number(S));
              },
              children: [
                /* @__PURE__ */ c.jsx(Ie, { className: "h-8 w-[70px]", children: /* @__PURE__ */ c.jsx(De, { placeholder: D.getState().pagination.pageSize }) }),
                /* @__PURE__ */ c.jsx(Ee, { side: "top", children: [10, 20, 30, 40, 50].map((S) => /* @__PURE__ */ c.jsx(je, { value: `${S}`, children: S }, S)) })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ c.jsxs("div", { className: "flex w-[100px] items-center justify-center text-sm font-medium", children: [
          "Page ",
          D.getState().pagination.pageIndex + 1,
          " of ",
          D.getPageCount()
        ] }),
        /* @__PURE__ */ c.jsxs("div", { className: "flex items-center space-x-2", children: [
          /* @__PURE__ */ c.jsxs(
            z,
            {
              variant: "outline",
              className: "h-8 w-8 p-0",
              onClick: () => D.previousPage(),
              disabled: !D.getCanPreviousPage(),
              children: [
                /* @__PURE__ */ c.jsx("span", { className: "sr-only", children: "Go to previous page" }),
                /* @__PURE__ */ c.jsx(re, { className: "h-4 w-4 rotate-90" })
              ]
            }
          ),
          /* @__PURE__ */ c.jsxs(
            z,
            {
              variant: "outline",
              className: "h-8 w-8 p-0",
              onClick: () => D.nextPage(),
              disabled: !D.getCanNextPage(),
              children: [
                /* @__PURE__ */ c.jsx("span", { className: "sr-only", children: "Go to next page" }),
                /* @__PURE__ */ c.jsx(re, { className: "h-4 w-4 -rotate-90" })
              ]
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ c.jsx(Ae, { open: ee, onOpenChange: k, children: /* @__PURE__ */ c.jsx(Le, { className: "max-w-2xl", children: /* @__PURE__ */ c.jsxs("form", { onSubmit: ot, children: [
      /* @__PURE__ */ c.jsx(He, { children: /* @__PURE__ */ c.jsx(Ge, { children: (M == null ? void 0 : M.title) || "Form" }) }),
      /* @__PURE__ */ c.jsx("div", { className: "space-y-4 py-4", children: (Ve = M == null ? void 0 : M.fields) == null ? void 0 : Ve.map((S) => {
        var C;
        return /* @__PURE__ */ c.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ c.jsxs(ut, { htmlFor: S.name, children: [
            S.label,
            S.required && /* @__PURE__ */ c.jsx("span", { className: "text-destructive ml-1", children: "*" })
          ] }),
          S.type === "textarea" ? /* @__PURE__ */ c.jsx(
            gt,
            {
              id: S.name,
              name: S.name,
              placeholder: S.placeholder,
              required: S.required
            }
          ) : S.type === "select" ? /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
            /* @__PURE__ */ c.jsxs(ye, { name: S.name, onValueChange: (F) => {
              const $ = document.querySelector(`input[name="${S.name}"]`);
              $ && ($.value = F);
            }, children: [
              /* @__PURE__ */ c.jsx(Ie, { children: /* @__PURE__ */ c.jsx(De, { placeholder: S.placeholder }) }),
              /* @__PURE__ */ c.jsx(Ee, { children: (C = S.options) == null ? void 0 : C.map((F) => /* @__PURE__ */ c.jsx(je, { value: F.value, children: F.label }, F.value)) })
            ] }),
            /* @__PURE__ */ c.jsx("input", { type: "hidden", name: S.name, required: S.required })
          ] }) : /* @__PURE__ */ c.jsx(
            dt,
            {
              id: S.name,
              name: S.name,
              type: S.type,
              placeholder: S.placeholder,
              required: S.required,
              accept: S.accept
            }
          )
        ] }, S.name);
      }) }),
      /* @__PURE__ */ c.jsxs(Ne, { children: [
        /* @__PURE__ */ c.jsx(z, { variant: "outline", type: "button", onClick: () => k(!1), children: "Cancel" }),
        /* @__PURE__ */ c.jsx(z, { type: "submit", disabled: ve, children: ve ? "Submitting..." : (M == null ? void 0 : M.submitLabel) || "Submit" })
      ] })
    ] }) }) }),
    /* @__PURE__ */ c.jsx(Ae, { open: et, onOpenChange: ne, children: /* @__PURE__ */ c.jsxs(Le, { className: "max-w-2xl", children: [
      /* @__PURE__ */ c.jsx(He, { children: /* @__PURE__ */ c.jsx(Ge, { children: (l == null ? void 0 : l.title) || "Details" }) }),
      /* @__PURE__ */ c.jsx("div", { className: "space-y-4 py-4", children: tt ? /* @__PURE__ */ c.jsx("div", { className: "flex items-center justify-center p-8", children: /* @__PURE__ */ c.jsx("div", { className: "text-muted-foreground", children: "Loading..." }) }) : oe ? /* @__PURE__ */ c.jsx("div", { className: "space-y-3", children: (Me = l == null ? void 0 : l.fields) == null ? void 0 : Me.map((S) => /* @__PURE__ */ c.jsxs("div", { className: "grid grid-cols-3 gap-4", children: [
        /* @__PURE__ */ c.jsxs("div", { className: "font-medium text-muted-foreground", children: [
          S.label,
          ":"
        ] }),
        /* @__PURE__ */ c.jsx("div", { className: "col-span-2", children: S.type === "date" ? new Date(oe[S.key]).toLocaleString() : oe[S.key] || "—" })
      ] }, S.key)) }) : /* @__PURE__ */ c.jsx("div", { className: "text-center text-muted-foreground", children: "No data available" }) }),
      /* @__PURE__ */ c.jsx(Ne, { children: /* @__PURE__ */ c.jsx(z, { variant: "outline", onClick: () => ne(!1), children: "Close" }) })
    ] }) })
  ] });
}
export {
  Vn as DataTableComponent
};
