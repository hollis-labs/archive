import { r as p, V as S, j as a, R as k, c as u, a3 as E } from "./badge-DBvLZUPk.js";
import { I as h } from "./lucide-react-CpYArdkX.js";
import { a as I, b as P, c as T, d as V, f as O, g as R } from "./command-CQbc6_vV.js";
import { P as A, a as B, b as D } from "./popover-B7Y5l707.js";
import { C as G } from "./chevrons-up-down-qz2MCZHA.js";
function F({ config: x }) {
  const { props: f, actions: t } = x, {
    placeholder: v = "Select option...",
    emptyText: j = "No option found.",
    searchPlaceholder: b = "Search...",
    options: r,
    value: c,
    defaultValue: C = "",
    searchable: w = !0,
    disabled: y = !1,
    className: g
  } = f, [i, m] = p.useState(!1), [l, d] = p.useState(c || C);
  S.useEffect(() => {
    c !== void 0 && d(c);
  }, [c]);
  const N = (e) => {
    const n = e === l ? "" : e;
    if (d(n), m(!1), t != null && t.onChange) {
      const s = t.onChange;
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
  }, o = r.find((e) => e.value === l);
  return /* @__PURE__ */ a.jsxs(A, { open: i, onOpenChange: m, children: [
    /* @__PURE__ */ a.jsx(B, { asChild: !0, children: /* @__PURE__ */ a.jsxs(
      k,
      {
        variant: "outline",
        role: "combobox",
        "aria-expanded": i,
        disabled: y,
        className: u("w-[200px] justify-between", g),
        children: [
          /* @__PURE__ */ a.jsxs("span", { className: "flex items-center gap-2 truncate", children: [
            (o == null ? void 0 : o.icon) && (() => {
              const e = h[o.icon];
              return e ? /* @__PURE__ */ a.jsx(e, { className: "h-4 w-4 shrink-0" }) : null;
            })(),
            o ? o.label : v
          ] }),
          /* @__PURE__ */ a.jsx(G, { className: "ml-2 h-4 w-4 shrink-0 opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ a.jsx(D, { className: "w-[200px] p-0", children: /* @__PURE__ */ a.jsxs(I, { children: [
      w && /* @__PURE__ */ a.jsx(P, { placeholder: b }),
      /* @__PURE__ */ a.jsxs(T, { children: [
        /* @__PURE__ */ a.jsx(V, { children: j }),
        /* @__PURE__ */ a.jsx(O, { children: r.map((e) => {
          const n = e.icon ? h[e.icon] : null;
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
                    className: u(
                      "mr-2 h-4 w-4",
                      l === e.value ? "opacity-100" : "opacity-0"
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
  F as ComboboxComponent
};
