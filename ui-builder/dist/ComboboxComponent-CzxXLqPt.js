import { j as a, B as k, c as p, _ as u, az as S, aA as E } from "./index-BtLd6ySb.js";
import P, { useState as h } from "react";
import { a as I, b as T, c as O, d as V, f as _, g as A } from "./command-B20WQXVD.js";
import { P as B, a as R, b as z } from "./popover-D680Ov6q.js";
function U({ config: f }) {
  const { props: x, actions: l } = f, {
    placeholder: v = "Select option...",
    emptyText: j = "No option found.",
    searchPlaceholder: b = "Search...",
    options: r,
    value: t,
    defaultValue: C = "",
    searchable: w = !0,
    disabled: y = !1,
    className: g
  } = x, [i, m] = h(!1), [c, d] = h(t || C);
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
  return /* @__PURE__ */ a.jsxs(B, { open: i, onOpenChange: m, children: [
    /* @__PURE__ */ a.jsx(R, { asChild: !0, children: /* @__PURE__ */ a.jsxs(
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
    /* @__PURE__ */ a.jsx(z, { className: "w-[200px] p-0", children: /* @__PURE__ */ a.jsxs(I, { children: [
      w && /* @__PURE__ */ a.jsx(T, { placeholder: b }),
      /* @__PURE__ */ a.jsxs(O, { children: [
        /* @__PURE__ */ a.jsx(V, { children: j }),
        /* @__PURE__ */ a.jsx(_, { children: r.map((e) => {
          const n = e.icon ? u[e.icon] : null;
          return /* @__PURE__ */ a.jsxs(
            A,
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
  U as ComboboxComponent
};
