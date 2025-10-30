import { j as s, r as h } from "./index-DAEtv2Sl.js";
function E({ config: f }) {
  const { props: b, actions: r } = f, {
    fields: g = [],
    customComponents: n = [],
    submitButton: x,
    onSubmit: j,
    className: F
  } = b || {};
  console.log("FormComponent: customComponents:", n), console.log("FormComponent: customComponents.length:", n == null ? void 0 : n.length);
  const w = (m) => {
    m.preventDefault();
    const a = m.currentTarget, c = new FormData(a), o = {};
    if (c.forEach((t, e) => {
      if (e.endsWith("[]")) {
        const i = e.slice(0, -2);
        o[i] || (o[i] = []), o[i].push(t);
      } else
        t === "on" || t === "true" ? o[e] = !0 : t === "false" ? o[e] = !1 : o[e] = t;
    }), console.log("FormComponent: Form submitted with data:", o), r != null && r.submit || j) {
      const t = (r == null ? void 0 : r.submit) || j, { type: e, command: i, event: C, url: u, method: N, payload: v } = t, d = { ...v, ...o };
      console.log("FormComponent: Submitting to:", u, "with data:", d), e === "command" && i ? window.dispatchEvent(new CustomEvent("command:execute", { detail: { command: i, payload: d } })) : e === "emit" && C ? window.dispatchEvent(new CustomEvent(C, { detail: d })) : e === "http" && u && fetch(u, {
        method: N || "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(d)
      }).then(async (l) => {
        const p = await l.json();
        return console.log("FormComponent: Response status:", l.status), console.log("FormComponent: Response data:", p), !l.ok && p.errors && console.error("FormComponent: Validation errors:", p.errors), p;
      }).catch((l) => {
        console.error("FormComponent: Request failed:", l);
      });
    }
  };
  return /* @__PURE__ */ s.jsxs("form", { onSubmit: w, className: F, id: f.id, children: [
    /* @__PURE__ */ s.jsxs("div", { className: "space-y-4", children: [
      g.map((m) => {
        const { name: a, label: c, field: o, validation: t, helperText: e } = m;
        return /* @__PURE__ */ s.jsxs("div", { className: "space-y-2", children: [
          c && /* @__PURE__ */ s.jsxs("label", { htmlFor: a, className: "text-sm font-medium", children: [
            c,
            (t == null ? void 0 : t.required) && /* @__PURE__ */ s.jsx("span", { className: "text-destructive ml-1", children: "*" })
          ] }),
          /* @__PURE__ */ s.jsx("div", { children: h(o) }),
          e && /* @__PURE__ */ s.jsx("p", { className: "text-sm text-muted-foreground", children: e })
        ] }, a);
      }),
      n && n.length > 0 && /* @__PURE__ */ s.jsx("div", { className: "space-y-4 mt-6", children: n.map((m, a) => /* @__PURE__ */ s.jsx("div", { children: h(m) }, m.id || `custom-${a}`)) })
    ] }),
    x && /* @__PURE__ */ s.jsx("div", { className: "mt-6", children: h(x) })
  ] });
}
export {
  E as FormComponent
};
