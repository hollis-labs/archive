import { U as p, r as i } from "./badge-DBvLZUPk.js";
function d({ config: a }) {
  const { props: r } = a, {
    title: t,
    description: s,
    variant: o = "default",
    duration: e = 5e3
  } = r, n = p();
  return i.useEffect(() => {
    const c = {
      default: "info",
      destructive: "error",
      success: "success",
      warning: "warning"
    }[o] || "info";
    n.addToast({
      type: c,
      title: t,
      description: s,
      duration: e
    });
  }, [t, s, o, e, n]), null;
}
export {
  d as ToastComponent
};
