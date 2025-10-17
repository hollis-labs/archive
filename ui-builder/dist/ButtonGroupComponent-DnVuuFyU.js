import { r as w, j as s, c as d, R as x } from "./badge-DBvLZUPk.js";
import { I as E } from "./lucide-react-CpYArdkX.js";
function y({ config: m }) {
  const { props: r, actions: a } = m, {
    buttons: c = [],
    value: i,
    className: u
  } = r || {}, [p, h] = w.useState(i), v = (e) => {
    if (h(e), a != null && a.change) {
      const { type: n, command: t, event: o, payload: f } = a.change, l = { ...f, value: e };
      n === "command" && t ? window.dispatchEvent(new CustomEvent("command:execute", { detail: { command: t, payload: l } })) : n === "emit" && o && window.dispatchEvent(new CustomEvent(o, { detail: l }));
    }
  };
  return /* @__PURE__ */ s.jsx("div", { className: d("inline-flex rounded-md shadow-sm", u), role: "group", children: c.map((e, n) => {
    const t = e.icon ? E[e.icon] : null, o = p === e.value;
    return /* @__PURE__ */ s.jsxs(
      x,
      {
        type: "button",
        variant: o ? "default" : "outline",
        onClick: () => v(e.value),
        className: d(
          "rounded-none",
          n === 0 && "rounded-l-md",
          n === c.length - 1 && "rounded-r-md",
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
  y as ButtonGroupComponent
};
