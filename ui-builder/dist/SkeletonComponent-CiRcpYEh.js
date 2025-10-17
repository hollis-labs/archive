import { j as m, c } from "./badge-DBvLZUPk.js";
import { S as p } from "./skeleton-CKHTIZ5D.js";
function x({ config: t }) {
  const { props: e = {} } = t, {
    variant: n = "rectangular",
    width: o,
    height: s,
    lines: a = 1,
    animate: r = !0,
    className: i
  } = e;
  return /* @__PURE__ */ m.jsx(
    p,
    {
      variant: n,
      width: o,
      height: s,
      lines: a,
      animate: r,
      className: c(i)
    }
  );
}
export {
  x as SkeletonComponent
};
