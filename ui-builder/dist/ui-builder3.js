var d = Object.defineProperty;
var g = (s, e, t) => e in s ? d(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[e] = t;
var i = (s, e, t) => g(s, typeof e != "symbol" ? e + "" : e, t);
import { a as n, h as c, l as u, m as h, n as p, o as f, p as C, q as w, i as D, j as $, k as v } from "./badge-DBvLZUPk.js";
import { RowsLayout as E } from "./RowsLayout-02e6S2At.js";
import { ColumnsLayout as N } from "./ColumnsLayout-DHi6wAky.js";
import { DataTableComponent as m } from "./DataTableComponent-CwkXBjlF.js";
import { SearchBarComponent as b } from "./SearchBarComponent-vd8iQiyu.js";
function x() {
  n.register("rows", E), n.register("columns", N), n.register("table", m), n.register("data-table", m), n.register("search.bar", b), n.register("button.icon", c);
}
class A {
  constructor() {
    i(this, "handlers", /* @__PURE__ */ new Map());
    this.setupDefaultHandlers(), this.listen();
  }
  setupDefaultHandlers() {
    this.register("/orch-agent", (e) => {
      console.log("Opening agent details for:", e.name), alert(`Agent Details:

Name: ${e.name}
ID: ${e.id}
Status: ${e.status}
Designation: ${e.designation}`);
    }), this.register("/orch-agent-new", () => {
      console.log("Opening new agent form"), alert("New Agent form would open here");
    }), this.register("/model-details", (e) => {
      console.log("Opening model details for:", e.name), alert(`Model Details:

Name: ${e.name}
ID: ${e.id}
Provider: ${e.provider}`);
    });
  }
  register(e, t) {
    this.handlers.set(e, t);
  }
  listen() {
    window.addEventListener("command:execute", ((e) => {
      const { command: t, payload: r } = e.detail;
      console.log("CommandHandler received:", t, r);
      const a = this.handlers.get(t);
      a ? a(r) : console.warn(`No handler registered for command: ${t}`);
    }));
  }
}
const H = new A(), o = document.getElementById("root");
if (!o)
  throw new Error("Root element not found");
const I = o.dataset.pageKey || "", l = o.dataset.isAuthenticated === "true", L = o.dataset.hasUsers === "true", O = l && o.dataset.user ? JSON.parse(o.dataset.user) : null;
console.log("Command handler initialized:", H);
x();
u();
h();
p();
f();
C();
w();
const R = D.createRoot(o);
R.render(
  /* @__PURE__ */ $.jsx(
    v,
    {
      pageKey: I,
      isAuthenticated: l,
      hasUsers: L,
      user: O
    }
  )
);
