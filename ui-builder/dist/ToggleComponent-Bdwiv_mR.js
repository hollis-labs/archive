import { r as E, j as n } from "./badge-DBvLZUPk.js";
import { T as j } from "./toggle-DwznC1fQ.js";
import { I as C } from "./lucide-react-CpYArdkX.js";
function N({ config: r }) {
  const { props: m, actions: e } = r, {
    pressed: p = !1,
    label: a,
    icon: s,
    variant: f = "default",
    size: h = "default",
    disabled: u = !1
  } = m || {}, [g, x] = E.useState(p), v = (o) => {
    if (x(o), e != null && e.change) {
      const { type: d, command: c, event: l, payload: w } = e.change, i = { ...w, pressed: o };
      d === "command" && c ? window.dispatchEvent(new CustomEvent("command:execute", { detail: { command: c, payload: i } })) : d === "emit" && l && window.dispatchEvent(new CustomEvent(l, { detail: i }));
    }
  }, t = s ? C[s] : null;
  return /* @__PURE__ */ n.jsxs(
    j,
    {
      pressed: g,
      onPressedChange: v,
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
  N as ToggleComponent
};
