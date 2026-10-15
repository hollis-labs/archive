import { j as s, r as f } from "./index-BBlDfRZw.js";
function A({ config: x }) {
  const { props: w, actions: m } = x, {
    fields: g = [],
    customComponents: r = [],
    submitButton: j,
    onSubmit: C,
    className: F
  } = w || {};
  console.log("FormComponent: customComponents:", r), console.log("FormComponent: customComponents.length:", r == null ? void 0 : r.length);
  const E = (a) => {
    a.preventDefault();
    const i = a.currentTarget, d = new FormData(i), o = {};
    if (d.forEach((t, e) => {
      if (e.endsWith("[]")) {
        const l = e.slice(0, -2);
        o[l] || (o[l] = []), o[l].push(t);
      } else
        t === "on" || t === "true" ? o[e] = !0 : t === "false" ? o[e] = !1 : o[e] = t;
    }), console.log("FormComponent: Form submitted with data:", o), m != null && m.submit || C) {
      const t = (m == null ? void 0 : m.submit) || C, { type: e, command: l, event: b, url: u, method: y, payload: N } = t, p = { ...N, ...o };
      console.log("FormComponent: Submitting to:", u, "with data:", p), e === "command" && l ? window.dispatchEvent(new CustomEvent("command:execute", { detail: { command: l, payload: p } })) : e === "emit" && b ? window.dispatchEvent(new CustomEvent(b, { detail: p })) : e === "http" && u && fetch(u, {
        method: y || "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(p)
      }).then(async (c) => {
        const n = await c.json();
        if (console.log("FormComponent: Response status:", c.status), console.log("FormComponent: Response data:", n), c.ok)
          alert(`✓ ${n.message || "Form submitted successfully!"}`), i.reset(), window.dispatchEvent(new CustomEvent("form:success", { detail: n }));
        else if (n.errors) {
          console.error("FormComponent: Validation errors:", n.errors);
          const v = Object.entries(n.errors).map(([$, h]) => `• ${$}: ${Array.isArray(h) ? h.join(", ") : h}`).join(`
`);
          alert(`Validation Errors:

${v}`);
        } else
          alert(`Error: ${n.error || n.message || "Submission failed"}`);
        return n;
      }).catch((c) => {
        console.error("FormComponent: Request failed:", c), alert(`Network Error: ${c.message}`);
      });
    }
  };
  return /* @__PURE__ */ s.jsxs("form", { onSubmit: E, className: F, id: x.id, children: [
    /* @__PURE__ */ s.jsxs("div", { className: "space-y-4", children: [
      g.map((a) => {
        const { name: i, label: d, field: o, validation: t, helperText: e } = a;
        return /* @__PURE__ */ s.jsxs("div", { className: "space-y-2", children: [
          d && /* @__PURE__ */ s.jsxs("label", { htmlFor: i, className: "text-sm font-medium", children: [
            d,
            (t == null ? void 0 : t.required) && /* @__PURE__ */ s.jsx("span", { className: "text-destructive ml-1", children: "*" })
          ] }),
          /* @__PURE__ */ s.jsx("div", { children: f(o) }),
          e && /* @__PURE__ */ s.jsx("p", { className: "text-sm text-muted-foreground", children: e })
        ] }, i);
      }),
      r && r.length > 0 && /* @__PURE__ */ s.jsx("div", { className: "space-y-4 mt-6", children: r.map((a, i) => /* @__PURE__ */ s.jsx("div", { children: f(a) }, a.id || `custom-${i}`)) })
    ] }),
    j && /* @__PURE__ */ s.jsx("div", { className: "mt-6", children: f(j) })
  ] });
}
export {
  A as FormComponent
};
