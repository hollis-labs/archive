var r = Object.defineProperty;
var h = (i, s, t) => s in i ? r(i, s, { enumerable: !0, configurable: !0, writable: !0, value: t }) : i[s] = t;
var a = (i, s, t) => h(i, typeof s != "symbol" ? s + "" : s, t);
const e = class e {
  constructor() {
    a(this, "slots", /* @__PURE__ */ new Map());
  }
  static getInstance() {
    return e.instance || (e.instance = new e()), e.instance;
  }
  subscribe(s, t) {
    this.slots.has(s) || this.slots.set(s, []);
    const n = this.slots.get(s);
    return n.push(t), () => {
      const c = n.indexOf(t);
      c > -1 && n.splice(c, 1);
    };
  }
  update(s, t) {
    const n = typeof s == "string" ? s : s.target, c = this.slots.get(n);
    if (!c || c.length === 0) {
      console.warn(`No subscribers for slot: ${n}`);
      return;
    }
    c.forEach((l) => l(t));
  }
  clear(s) {
    this.slots.delete(s);
  }
  clearAll() {
    this.slots.clear();
  }
};
a(e, "instance");
let o = e;
const g = o.getInstance();
export {
  g as s
};
