import { j as h, c as y } from "./index-fBjbTDu8.js";
import { useState as C } from "react";
import { C as x } from "./calendar-B-mayIRY.js";
function j({ config: l }) {
  const { props: c, actions: t } = l, {
    value: a,
    mode: n = "single",
    className: d
  } = c || {}, [u, p] = C(() => {
    if (a) {
      if (n === "single") return new Date(a);
      if (n === "multiple") return a.map((e) => new Date(e));
    }
  }), f = (e) => {
    if (p(e), t != null && t.change) {
      const { type: i, command: r, event: s, payload: v } = t.change;
      let o;
      e instanceof Date ? o = e.toISOString() : Array.isArray(e) && (o = e.map((g) => g.toISOString()));
      const m = { ...v, value: o };
      i === "command" && r ? window.dispatchEvent(new CustomEvent("command:execute", { detail: { command: r, payload: m } })) : i === "emit" && s && window.dispatchEvent(new CustomEvent(s, { detail: m }));
    }
  };
  return /* @__PURE__ */ h.jsx(
    x,
    {
      mode: n,
      selected: u,
      onSelect: f,
      className: y("rounded-md border", d)
    }
  );
}
export {
  j as CalendarComponent
};
