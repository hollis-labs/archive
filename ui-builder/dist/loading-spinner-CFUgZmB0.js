import { j as s, c as e } from "./badge-DBvLZUPk.js";
const t = ({
  size: r = "md",
  className: a
}) => {
  const n = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8"
  };
  return /* @__PURE__ */ s.jsx(
    "div",
    {
      className: e(
        "animate-spin rounded-full border-2 border-current border-t-transparent",
        n[r],
        a
      ),
      role: "status",
      "aria-label": "Loading",
      children: /* @__PURE__ */ s.jsx("span", { className: "sr-only", children: "Loading..." })
    }
  );
};
export {
  t as L
};
