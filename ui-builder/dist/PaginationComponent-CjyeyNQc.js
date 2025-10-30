import { j as t, c as v, B as l, H as g, J as j, K as b, G as C, M as N } from "./index-BtLd6ySb.js";
function E({ config: d }) {
  const { props: m } = d, {
    currentPage: i,
    totalPages: a,
    onPageChange: r,
    showFirstLast: u = !0,
    showPrevNext: h = !0,
    maxVisible: c = 7,
    className: f
  } = m, n = (e) => {
    e < 1 || e > a || e === i || r && r.type === "emit" && window.dispatchEvent(new CustomEvent(r.event, {
      detail: { page: e, ...r.payload }
    }));
  }, x = (() => {
    const e = [];
    if (a <= c) {
      for (let s = 1; s <= a; s++)
        e.push(s);
      return e;
    }
    const o = i > 3, p = i < a - 2;
    if (!o && p) {
      for (let s = 1; s <= Math.min(c - 2, a); s++)
        e.push(s);
      e.push("ellipsis"), e.push(a);
    } else if (o && !p) {
      e.push(1), e.push("ellipsis");
      for (let s = a - (c - 3); s <= a; s++)
        e.push(s);
    } else {
      e.push(1), e.push("ellipsis");
      for (let s = i - 1; s <= i + 1; s++)
        e.push(s);
      e.push("ellipsis"), e.push(a);
    }
    return e;
  })();
  return /* @__PURE__ */ t.jsxs(
    "nav",
    {
      role: "navigation",
      "aria-label": "Pagination",
      className: v("flex items-center justify-center gap-1", f),
      children: [
        u && /* @__PURE__ */ t.jsx(
          l,
          {
            variant: "outline",
            size: "icon",
            onClick: () => n(1),
            disabled: i === 1,
            "aria-label": "First page",
            children: /* @__PURE__ */ t.jsx(g, { className: "h-4 w-4" })
          }
        ),
        h && /* @__PURE__ */ t.jsx(
          l,
          {
            variant: "outline",
            size: "icon",
            onClick: () => n(i - 1),
            disabled: i === 1,
            "aria-label": "Previous page",
            children: /* @__PURE__ */ t.jsx(j, { className: "h-4 w-4" })
          }
        ),
        x.map((e, o) => e === "ellipsis" ? /* @__PURE__ */ t.jsx(
          "div",
          {
            className: "flex h-9 w-9 items-center justify-center",
            children: /* @__PURE__ */ t.jsx(b, { className: "h-4 w-4 text-muted-foreground" })
          },
          `ellipsis-${o}`
        ) : /* @__PURE__ */ t.jsx(
          l,
          {
            variant: i === e ? "default" : "outline",
            size: "icon",
            onClick: () => n(e),
            "aria-label": `Page ${e}`,
            "aria-current": i === e ? "page" : void 0,
            children: e
          },
          e
        )),
        h && /* @__PURE__ */ t.jsx(
          l,
          {
            variant: "outline",
            size: "icon",
            onClick: () => n(i + 1),
            disabled: i === a,
            "aria-label": "Next page",
            children: /* @__PURE__ */ t.jsx(C, { className: "h-4 w-4" })
          }
        ),
        u && /* @__PURE__ */ t.jsx(
          l,
          {
            variant: "outline",
            size: "icon",
            onClick: () => n(a),
            disabled: i === a,
            "aria-label": "Last page",
            children: /* @__PURE__ */ t.jsx(N, { className: "h-4 w-4" })
          }
        )
      ]
    }
  );
}
export {
  E as PaginationComponent
};
