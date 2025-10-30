import { j as s, c as d, _ as w, B as x } from "./index-DAEtv2Sl.js";
import { useState as g } from "react";
function E({ config: m }) {
  const { props: i, actions: a } = m, {
    buttons: l = [],
    value: r,
    className: u
  } = i || {}, [p, h] = g(r), v = (e) => {
    if (h(e), a != null && a.change) {
      const { type: n, command: t, event: o, payload: f } = a.change, c = { ...f, value: e };
      n === "command" && t ? window.dispatchEvent(new CustomEvent("command:execute", { detail: { command: t, payload: c } })) : n === "emit" && o && window.dispatchEvent(new CustomEvent(o, { detail: c }));
    }
  };
  return /* @__PURE__ */ s.jsx("div", { className: d("inline-flex rounded-md shadow-sm", u), role: "group", children: l.map((e, n) => {
    const t = e.icon ? w[e.icon] : null, o = p === e.value;
    return /* @__PURE__ */ s.jsxs(
      x,
      {
        type: "button",
        variant: o ? "default" : "outline",
        onClick: () => v(e.value),
        className: d(
          "rounded-none",
          n === 0 && "rounded-l-md",
          n === l.length - 1 && "rounded-r-md",
          n !== 0 && "-ml-px"
        ),
        children: [
          t && /* @__PURE__ */ s.jsx(t, { className: "h-4 w-4 mr-2" }),
          e.label
        ]
      },
      e.value
    );
  }) });
}
export {
  E as ButtonGroupComponent
};
