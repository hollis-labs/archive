import { useEffect as i } from "react";
import { z as p } from "./index-pZCaaM9p.js";
function l({ config: r }) {
  const { props: a } = r, {
    title: t,
    description: o,
    variant: s = "default",
    duration: e = 5e3
  } = a, n = p();
  return i(() => {
    const c = {
      default: "info",
      destructive: "error",
      success: "success",
      warning: "warning"
    }[s] || "info";
    n.addToast({
      type: c,
      title: t,
      description: o,
      duration: e
    });
  }, [t, o, s, e, n]), null;
}
export {
  l as ToastComponent
};
