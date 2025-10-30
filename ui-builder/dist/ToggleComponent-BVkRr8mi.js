import { j as n, _ as j } from "./index-BtLd6ySb.js";
import { useState as C } from "react";
import { T as E } from "./toggle-CBdkkv0u.js";
function T({ config: m }) {
  const { props: r, actions: e } = m, {
    pressed: p = !1,
    label: a,
    icon: s,
    variant: f = "default",
    size: h = "default",
    disabled: u = !1
  } = r || {}, [g, v] = C(p), x = (o) => {
    if (v(o), e != null && e.change) {
      const { type: d, command: l, event: c, payload: w } = e.change, i = { ...w, pressed: o };
      d === "command" && l ? window.dispatchEvent(new CustomEvent("command:execute", { detail: { command: l, payload: i } })) : d === "emit" && c && window.dispatchEvent(new CustomEvent(c, { detail: i }));
    }
  }, t = s ? j[s] : null;
  return /* @__PURE__ */ n.jsxs(
    E,
    {
      pressed: g,
      onPressedChange: x,
      variant: f,
      size: h,
      disabled: u,
      children: [
        t && /* @__PURE__ */ n.jsx(t, { className: "h-4 w-4" }),
        a && /* @__PURE__ */ n.jsx("span", { className: s ? "ml-2" : "", children: a })
      ]
    }
  );
}
export {
  T as ToggleComponent
};
