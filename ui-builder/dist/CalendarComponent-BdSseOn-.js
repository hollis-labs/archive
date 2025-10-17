import { r as h, j as x, c as y } from "./badge-DBvLZUPk.js";
import { C } from "./calendar-dCXib1Ci.js";
function S({ config: c }) {
  const { props: l, actions: t } = c, {
    value: a,
    mode: n = "single",
    className: d
  } = l || {}, [u, p] = h.useState(() => {
    if (a) {
      if (n === "single") return new Date(a);
      if (n === "multiple") return a.map((e) => new Date(e));
    }
  }), f = (e) => {
    if (p(e), t != null && t.change) {
      const { type: r, command: s, event: i, payload: v } = t.change;
      let o;
      e instanceof Date ? o = e.toISOString() : Array.isArray(e) && (o = e.map((g) => g.toISOString()));
      const m = { ...v, value: o };
      r === "command" && s ? window.dispatchEvent(new CustomEvent("command:execute", { detail: { command: s, payload: m } })) : r === "emit" && i && window.dispatchEvent(new CustomEvent(i, { detail: m }));
    }
  };
  return /* @__PURE__ */ x.jsx(
    C,
    {
      mode: n,
      selected: u,
      onSelect: f,
      className: y("rounded-md border", d)
    }
  );
}
export {
  S as CalendarComponent
};
