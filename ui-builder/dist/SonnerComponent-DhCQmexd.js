import { t as c } from "./index-BklgHJRJ.js";
import { c as d } from "./badge-DBvLZUPk.js";
function m(i) {
  const { type: t, command: e, url: o, event: n, payload: a } = i;
  t === "command" && e ? window.dispatchEvent(new CustomEvent("command:execute", { detail: { command: e, payload: a } })) : t === "navigate" && o ? window.location.href = o : t === "emit" && n ? window.dispatchEvent(new CustomEvent(n, { detail: a })) : t === "http" && o && fetch(o, {
    method: i.method || "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(a)
  }).catch(console.error);
}
function w({ config: i }) {
  const { props: t } = i, {
    message: e,
    description: o,
    action: n,
    duration: a = 4e3,
    variant: r = "default",
    className: l
  } = t;
  return (() => {
    const s = {
      description: o,
      duration: a,
      className: d(l),
      action: n ? {
        label: n.label,
        onClick: () => m(n.action)
      } : void 0
    };
    switch (r) {
      case "success":
        c.success(e, s);
        break;
      case "error":
        c.error(e, s);
        break;
      case "warning":
        c.warning(e, s);
        break;
      case "info":
        c.info(e, s);
        break;
      default:
        c(e, s);
    }
  })(), null;
}
export {
  w as SonnerComponent
};
