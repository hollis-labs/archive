import { r as reactExports, j as jsxRuntimeExports, P as Primitive, c as cn, V as React, O as renderComponent } from "./badge-DBvLZUPk.js";
var NAME = "AspectRatio", AspectRatio$1 = reactExports.forwardRef(
  (t, o) => {
    const { ratio: e = 1 / 1, style: a, ...i } = t;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        style: {
          // ensures inner element is contained
          position: "relative",
          // ensures padding bottom trick maths works
          width: "100%",
          paddingBottom: `${100 / e}%`
        },
        "data-radix-aspect-ratio-wrapper": "",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.div,
          {
            ...i,
            ref: o,
            style: {
              ...a,
              // ensures children expand in ratio
              position: "absolute",
              top: 0,
              right: 0,
              bottom: 0,
              left: 0
            }
          }
        )
      }
    );
  }
);
AspectRatio$1.displayName = NAME;
var Root = AspectRatio$1;
const AspectRatio = Root;
function AspectRatioComponent({ config }) {
  const { props = {}, children = [] } = config, { ratio = "16/9", className } = props, numericRatio = typeof ratio == "string" ? ratio.includes("/") ? eval(ratio) : parseFloat(ratio) : ratio;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AspectRatio, { ratio: numericRatio, className: cn(className), children: children.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(React.Fragment, { children: renderComponent(t) }, t.id)) });
}
export {
  AspectRatioComponent
};
