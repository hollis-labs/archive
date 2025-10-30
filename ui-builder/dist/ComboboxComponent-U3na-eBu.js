import { j as a, B as k, c as p, W as u, aw as S, ax as E } from "./index-DipMs7ol.js";
import P, { useState as h } from "react";
import { a as I, b as T, c as O, d as V, f as B, g as R } from "./command-ClXnHYO7.js";
import { P as _, a as A, b as D } from "./popover-eb_ON6lp.js";
function W({ config: x }) {
  const { props: f, actions: l } = x, {
    placeholder: v = "Select option...",
    emptyText: j = "No option found.",
    searchPlaceholder: b = "Search...",
    options: r,
    value: t,
    defaultValue: C = "",
    searchable: w = !0,
    disabled: y = !1,
    className: g
  } = f, [i, m] = h(!1), [c, d] = h(t || C);
  P.useEffect(() => {
    t !== void 0 && d(t);
  }, [t]);
  const N = (e) => {
    const n = e === c ? "" : e;
    if (d(n), m(!1), l != null && l.onChange) {
      const s = l.onChange;
      switch (s.type) {
        case "command":
          s.command && console.log("Execute command:", s.command, { value: n });
          break;
        case "navigate":
          s.url && (window.location.href = s.url);
          break;
        case "emit":
          s.event && window.dispatchEvent(
            new CustomEvent(s.event, {
              detail: { ...s.payload, value: n }
            })
          );
          break;
        case "http":
          s.url && fetch(s.url, {
            method: s.method || "POST",
            headers: { "Content-Type": "application/json", Accept: "application/json" },
            body: JSON.stringify({ ...s.payload, value: n })
          });
          break;
      }
    }
  }, o = r.find((e) => e.value === c);
  return /* @__PURE__ */ a.jsxs(_, { open: i, onOpenChange: m, children: [
    /* @__PURE__ */ a.jsx(A, { asChild: !0, children: /* @__PURE__ */ a.jsxs(
      k,
      {
        variant: "outline",
        role: "combobox",
        "aria-expanded": i,
        disabled: y,
        className: p("w-[200px] justify-between", g),
        children: [
          /* @__PURE__ */ a.jsxs("span", { className: "flex items-center gap-2 truncate", children: [
            (o == null ? void 0 : o.icon) && (() => {
              const e = u[o.icon];
              return e ? /* @__PURE__ */ a.jsx(e, { className: "h-4 w-4 shrink-0" }) : null;
            })(),
            o ? o.label : v
          ] }),
          /* @__PURE__ */ a.jsx(S, { className: "ml-2 h-4 w-4 shrink-0 opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ a.jsx(D, { className: "w-[200px] p-0", children: /* @__PURE__ */ a.jsxs(I, { children: [
      w && /* @__PURE__ */ a.jsx(T, { placeholder: b }),
      /* @__PURE__ */ a.jsxs(O, { children: [
        /* @__PURE__ */ a.jsx(V, { children: j }),
        /* @__PURE__ */ a.jsx(B, { children: r.map((e) => {
          const n = e.icon ? u[e.icon] : null;
          return /* @__PURE__ */ a.jsxs(
            R,
            {
              value: e.value,
              disabled: e.disabled,
              onSelect: N,
              children: [
                /* @__PURE__ */ a.jsx(
                  E,
                  {
                    className: p(
                      "mr-2 h-4 w-4",
                      c === e.value ? "opacity-100" : "opacity-0"
                    )
                  }
                ),
                n && /* @__PURE__ */ a.jsx(n, { className: "mr-2 h-4 w-4" }),
                e.label
              ]
            },
            e.value
          );
        }) })
      ] })
    ] }) })
  ] });
}
export {
  W as ComboboxComponent
};
