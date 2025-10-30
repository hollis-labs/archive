import { j as ne, c as _, J as fn, G as ln, at as hn, b4 as Ue, B as mn } from "./index-CwxzwhG1.js";
import * as Ve from "react";
import h, { createContext as yn, useContext as gn, useCallback as $, useRef as pe, useLayoutEffect as wn, useState as qe, useEffect as bn, useMemo as Ee } from "react";
const dt = 6048e5, Mn = 864e5, Ke = Symbol.for("constructDateFrom");
function B(t, e) {
  return typeof t == "function" ? t(e) : t && typeof t == "object" && Ke in t ? t[Ke](e) : t instanceof Date ? new t.constructor(e) : new Date(e);
}
function T(t, e) {
  return B(e || t, t);
}
function ft(t, e, n) {
  const r = T(t, n == null ? void 0 : n.in);
  return isNaN(e) ? B(t, NaN) : (e && r.setDate(r.getDate() + e), r);
}
function lt(t, e, n) {
  const r = T(t, n == null ? void 0 : n.in);
  if (isNaN(e)) return B(t, NaN);
  if (!e)
    return r;
  const a = r.getDate(), o = B(t, r.getTime());
  o.setMonth(r.getMonth() + e + 1, 0);
  const i = o.getDate();
  return a >= i ? o : (r.setFullYear(
    o.getFullYear(),
    o.getMonth(),
    a
  ), r);
}
let kn = {};
function be() {
  return kn;
}
function ue(t, e) {
  var s, c, u, l;
  const n = be(), r = (e == null ? void 0 : e.weekStartsOn) ?? ((c = (s = e == null ? void 0 : e.locale) == null ? void 0 : s.options) == null ? void 0 : c.weekStartsOn) ?? n.weekStartsOn ?? ((l = (u = n.locale) == null ? void 0 : u.options) == null ? void 0 : l.weekStartsOn) ?? 0, a = T(t, e == null ? void 0 : e.in), o = a.getDay(), i = (o < r ? 7 : 0) + o - r;
  return a.setDate(a.getDate() - i), a.setHours(0, 0, 0, 0), a;
}
function ge(t, e) {
  return ue(t, { ...e, weekStartsOn: 1 });
}
function ht(t, e) {
  const n = T(t, e == null ? void 0 : e.in), r = n.getFullYear(), a = B(n, 0);
  a.setFullYear(r + 1, 0, 4), a.setHours(0, 0, 0, 0);
  const o = ge(a), i = B(n, 0);
  i.setFullYear(r, 0, 4), i.setHours(0, 0, 0, 0);
  const s = ge(i);
  return n.getTime() >= o.getTime() ? r + 1 : n.getTime() >= s.getTime() ? r : r - 1;
}
function Je(t) {
  const e = T(t), n = new Date(
    Date.UTC(
      e.getFullYear(),
      e.getMonth(),
      e.getDate(),
      e.getHours(),
      e.getMinutes(),
      e.getSeconds(),
      e.getMilliseconds()
    )
  );
  return n.setUTCFullYear(e.getFullYear()), +t - +n;
}
function de(t, ...e) {
  const n = B.bind(
    null,
    e.find((r) => typeof r == "object")
  );
  return e.map(n);
}
function we(t, e) {
  const n = T(t, e == null ? void 0 : e.in);
  return n.setHours(0, 0, 0, 0), n;
}
function mt(t, e, n) {
  const [r, a] = de(
    n == null ? void 0 : n.in,
    t,
    e
  ), o = we(r), i = we(a), s = +o - Je(o), c = +i - Je(i);
  return Math.round((s - c) / Mn);
}
function vn(t, e) {
  const n = ht(t, e), r = B(t, 0);
  return r.setFullYear(n, 0, 4), r.setHours(0, 0, 0, 0), ge(r);
}
function Dn(t, e, n) {
  return ft(t, e * 7, n);
}
function On(t, e, n) {
  return lt(t, e * 12, n);
}
function Wn(t, e) {
  let n, r = e == null ? void 0 : e.in;
  return t.forEach((a) => {
    !r && typeof a == "object" && (r = B.bind(null, a));
    const o = T(a, r);
    (!n || n < o || isNaN(+o)) && (n = o);
  }), B(r, n || NaN);
}
function pn(t, e) {
  let n, r = e == null ? void 0 : e.in;
  return t.forEach((a) => {
    !r && typeof a == "object" && (r = B.bind(null, a));
    const o = T(a, r);
    (!n || n > o || isNaN(+o)) && (n = o);
  }), B(r, n || NaN);
}
function Sn(t, e, n) {
  const [r, a] = de(
    n == null ? void 0 : n.in,
    t,
    e
  );
  return +we(r) == +we(a);
}
function yt(t) {
  return t instanceof Date || typeof t == "object" && Object.prototype.toString.call(t) === "[object Date]";
}
function Nn(t) {
  return !(!yt(t) && typeof t != "number" || isNaN(+T(t)));
}
function Cn(t, e, n) {
  const [r, a] = de(
    n == null ? void 0 : n.in,
    t,
    e
  ), o = r.getFullYear() - a.getFullYear(), i = r.getMonth() - a.getMonth();
  return o * 12 + i;
}
function xn(t, e) {
  const n = T(t, e == null ? void 0 : e.in), r = n.getMonth();
  return n.setFullYear(n.getFullYear(), r + 1, 0), n.setHours(23, 59, 59, 999), n;
}
function gt(t, e) {
  const [n, r] = de(t, e.start, e.end);
  return { start: n, end: r };
}
function _n(t, e) {
  const { start: n, end: r } = gt(e == null ? void 0 : e.in, t);
  let a = +n > +r;
  const o = a ? +n : +r, i = a ? r : n;
  i.setHours(0, 0, 0, 0), i.setDate(1);
  let s = 1;
  const c = [];
  for (; +i <= o; )
    c.push(B(n, i)), i.setMonth(i.getMonth() + s);
  return a ? c.reverse() : c;
}
function Yn(t, e) {
  const n = T(t, e == null ? void 0 : e.in);
  return n.setDate(1), n.setHours(0, 0, 0, 0), n;
}
function Tn(t, e) {
  const n = T(t, e == null ? void 0 : e.in), r = n.getFullYear();
  return n.setFullYear(r + 1, 0, 0), n.setHours(23, 59, 59, 999), n;
}
function wt(t, e) {
  const n = T(t, e == null ? void 0 : e.in);
  return n.setFullYear(n.getFullYear(), 0, 1), n.setHours(0, 0, 0, 0), n;
}
function En(t, e) {
  const { start: n, end: r } = gt(e == null ? void 0 : e.in, t);
  let a = +n > +r;
  const o = a ? +n : +r, i = a ? r : n;
  i.setHours(0, 0, 0, 0), i.setMonth(0, 1);
  let s = 1;
  const c = [];
  for (; +i <= o; )
    c.push(B(n, i)), i.setFullYear(i.getFullYear() + s);
  return a ? c.reverse() : c;
}
function bt(t, e) {
  var s, c, u, l;
  const n = be(), r = (e == null ? void 0 : e.weekStartsOn) ?? ((c = (s = e == null ? void 0 : e.locale) == null ? void 0 : s.options) == null ? void 0 : c.weekStartsOn) ?? n.weekStartsOn ?? ((l = (u = n.locale) == null ? void 0 : u.options) == null ? void 0 : l.weekStartsOn) ?? 0, a = T(t, e == null ? void 0 : e.in), o = a.getDay(), i = (o < r ? -7 : 0) + 6 - (o - r);
  return a.setDate(a.getDate() + i), a.setHours(23, 59, 59, 999), a;
}
function Pn(t, e) {
  return bt(t, { ...e, weekStartsOn: 1 });
}
const Fn = {
  lessThanXSeconds: {
    one: "less than a second",
    other: "less than {{count}} seconds"
  },
  xSeconds: {
    one: "1 second",
    other: "{{count}} seconds"
  },
  halfAMinute: "half a minute",
  lessThanXMinutes: {
    one: "less than a minute",
    other: "less than {{count}} minutes"
  },
  xMinutes: {
    one: "1 minute",
    other: "{{count}} minutes"
  },
  aboutXHours: {
    one: "about 1 hour",
    other: "about {{count}} hours"
  },
  xHours: {
    one: "1 hour",
    other: "{{count}} hours"
  },
  xDays: {
    one: "1 day",
    other: "{{count}} days"
  },
  aboutXWeeks: {
    one: "about 1 week",
    other: "about {{count}} weeks"
  },
  xWeeks: {
    one: "1 week",
    other: "{{count}} weeks"
  },
  aboutXMonths: {
    one: "about 1 month",
    other: "about {{count}} months"
  },
  xMonths: {
    one: "1 month",
    other: "{{count}} months"
  },
  aboutXYears: {
    one: "about 1 year",
    other: "about {{count}} years"
  },
  xYears: {
    one: "1 year",
    other: "{{count}} years"
  },
  overXYears: {
    one: "over 1 year",
    other: "over {{count}} years"
  },
  almostXYears: {
    one: "almost 1 year",
    other: "almost {{count}} years"
  }
}, Bn = (t, e, n) => {
  let r;
  const a = Fn[t];
  return typeof a == "string" ? r = a : e === 1 ? r = a.one : r = a.other.replace("{{count}}", e.toString()), n != null && n.addSuffix ? n.comparison && n.comparison > 0 ? "in " + r : r + " ago" : r;
};
function Pe(t) {
  return (e = {}) => {
    const n = e.width ? String(e.width) : t.defaultWidth;
    return t.formats[n] || t.formats[t.defaultWidth];
  };
}
const In = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy"
}, Hn = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
}, qn = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
}, An = {
  date: Pe({
    formats: In,
    defaultWidth: "full"
  }),
  time: Pe({
    formats: Hn,
    defaultWidth: "full"
  }),
  dateTime: Pe({
    formats: qn,
    defaultWidth: "full"
  })
}, jn = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P"
}, zn = (t, e, n, r) => jn[t];
function he(t) {
  return (e, n) => {
    const r = n != null && n.context ? String(n.context) : "standalone";
    let a;
    if (r === "formatting" && t.formattingValues) {
      const i = t.defaultFormattingWidth || t.defaultWidth, s = n != null && n.width ? String(n.width) : i;
      a = t.formattingValues[s] || t.formattingValues[i];
    } else {
      const i = t.defaultWidth, s = n != null && n.width ? String(n.width) : t.defaultWidth;
      a = t.values[s] || t.values[i];
    }
    const o = t.argumentCallback ? t.argumentCallback(e) : e;
    return a[o];
  };
}
const Rn = {
  narrow: ["B", "A"],
  abbreviated: ["BC", "AD"],
  wide: ["Before Christ", "Anno Domini"]
}, $n = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
}, Gn = {
  narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
  abbreviated: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ],
  wide: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ]
}, Zn = {
  narrow: ["S", "M", "T", "W", "T", "F", "S"],
  short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  wide: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ]
}, Qn = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  }
}, Xn = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  }
}, Ln = (t, e) => {
  const n = Number(t), r = n % 100;
  if (r > 20 || r < 10)
    switch (r % 10) {
      case 1:
        return n + "st";
      case 2:
        return n + "nd";
      case 3:
        return n + "rd";
    }
  return n + "th";
}, Un = {
  ordinalNumber: Ln,
  era: he({
    values: Rn,
    defaultWidth: "wide"
  }),
  quarter: he({
    values: $n,
    defaultWidth: "wide",
    argumentCallback: (t) => t - 1
  }),
  month: he({
    values: Gn,
    defaultWidth: "wide"
  }),
  day: he({
    values: Zn,
    defaultWidth: "wide"
  }),
  dayPeriod: he({
    values: Qn,
    defaultWidth: "wide",
    formattingValues: Xn,
    defaultFormattingWidth: "wide"
  })
};
function me(t) {
  return (e, n = {}) => {
    const r = n.width, a = r && t.matchPatterns[r] || t.matchPatterns[t.defaultMatchWidth], o = e.match(a);
    if (!o)
      return null;
    const i = o[0], s = r && t.parsePatterns[r] || t.parsePatterns[t.defaultParseWidth], c = Array.isArray(s) ? Kn(s, (d) => d.test(i)) : (
      // [TODO] -- I challenge you to fix the type
      Vn(s, (d) => d.test(i))
    );
    let u;
    u = t.valueCallback ? t.valueCallback(c) : c, u = n.valueCallback ? (
      // [TODO] -- I challenge you to fix the type
      n.valueCallback(u)
    ) : u;
    const l = e.slice(i.length);
    return { value: u, rest: l };
  };
}
function Vn(t, e) {
  for (const n in t)
    if (Object.prototype.hasOwnProperty.call(t, n) && e(t[n]))
      return n;
}
function Kn(t, e) {
  for (let n = 0; n < t.length; n++)
    if (e(t[n]))
      return n;
}
function Jn(t) {
  return (e, n = {}) => {
    const r = e.match(t.matchPattern);
    if (!r) return null;
    const a = r[0], o = e.match(t.parsePattern);
    if (!o) return null;
    let i = t.valueCallback ? t.valueCallback(o[0]) : o[0];
    i = n.valueCallback ? n.valueCallback(i) : i;
    const s = e.slice(a.length);
    return { value: i, rest: s };
  };
}
const er = /^(\d+)(th|st|nd|rd)?/i, tr = /\d+/i, nr = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
}, rr = {
  any: [/^b/i, /^(a|c)/i]
}, ar = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
}, or = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, sr = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
}, ir = {
  narrow: [
    /^j/i,
    /^f/i,
    /^m/i,
    /^a/i,
    /^m/i,
    /^j/i,
    /^j/i,
    /^a/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i
  ],
  any: [
    /^ja/i,
    /^f/i,
    /^mar/i,
    /^ap/i,
    /^may/i,
    /^jun/i,
    /^jul/i,
    /^au/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i
  ]
}, cr = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
}, ur = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
}, dr = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
}, fr = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^mi/i,
    noon: /^no/i,
    morning: /morning/i,
    afternoon: /afternoon/i,
    evening: /evening/i,
    night: /night/i
  }
}, lr = {
  ordinalNumber: Jn({
    matchPattern: er,
    parsePattern: tr,
    valueCallback: (t) => parseInt(t, 10)
  }),
  era: me({
    matchPatterns: nr,
    defaultMatchWidth: "wide",
    parsePatterns: rr,
    defaultParseWidth: "any"
  }),
  quarter: me({
    matchPatterns: ar,
    defaultMatchWidth: "wide",
    parsePatterns: or,
    defaultParseWidth: "any",
    valueCallback: (t) => t + 1
  }),
  month: me({
    matchPatterns: sr,
    defaultMatchWidth: "wide",
    parsePatterns: ir,
    defaultParseWidth: "any"
  }),
  day: me({
    matchPatterns: cr,
    defaultMatchWidth: "wide",
    parsePatterns: ur,
    defaultParseWidth: "any"
  }),
  dayPeriod: me({
    matchPatterns: dr,
    defaultMatchWidth: "any",
    parsePatterns: fr,
    defaultParseWidth: "any"
  })
}, je = {
  code: "en-US",
  formatDistance: Bn,
  formatLong: An,
  formatRelative: zn,
  localize: Un,
  match: lr,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
function hr(t, e) {
  const n = T(t, e == null ? void 0 : e.in);
  return mt(n, wt(n)) + 1;
}
function Mt(t, e) {
  const n = T(t, e == null ? void 0 : e.in), r = +ge(n) - +vn(n);
  return Math.round(r / dt) + 1;
}
function kt(t, e) {
  var l, d, m, w;
  const n = T(t, e == null ? void 0 : e.in), r = n.getFullYear(), a = be(), o = (e == null ? void 0 : e.firstWeekContainsDate) ?? ((d = (l = e == null ? void 0 : e.locale) == null ? void 0 : l.options) == null ? void 0 : d.firstWeekContainsDate) ?? a.firstWeekContainsDate ?? ((w = (m = a.locale) == null ? void 0 : m.options) == null ? void 0 : w.firstWeekContainsDate) ?? 1, i = B((e == null ? void 0 : e.in) || t, 0);
  i.setFullYear(r + 1, 0, o), i.setHours(0, 0, 0, 0);
  const s = ue(i, e), c = B((e == null ? void 0 : e.in) || t, 0);
  c.setFullYear(r, 0, o), c.setHours(0, 0, 0, 0);
  const u = ue(c, e);
  return +n >= +s ? r + 1 : +n >= +u ? r : r - 1;
}
function mr(t, e) {
  var s, c, u, l;
  const n = be(), r = (e == null ? void 0 : e.firstWeekContainsDate) ?? ((c = (s = e == null ? void 0 : e.locale) == null ? void 0 : s.options) == null ? void 0 : c.firstWeekContainsDate) ?? n.firstWeekContainsDate ?? ((l = (u = n.locale) == null ? void 0 : u.options) == null ? void 0 : l.firstWeekContainsDate) ?? 1, a = kt(t, e), o = B((e == null ? void 0 : e.in) || t, 0);
  return o.setFullYear(a, 0, r), o.setHours(0, 0, 0, 0), ue(o, e);
}
function vt(t, e) {
  const n = T(t, e == null ? void 0 : e.in), r = +ue(n, e) - +mr(n, e);
  return Math.round(r / dt) + 1;
}
function Y(t, e) {
  const n = t < 0 ? "-" : "", r = Math.abs(t).toString().padStart(e, "0");
  return n + r;
}
const te = {
  // Year
  y(t, e) {
    const n = t.getFullYear(), r = n > 0 ? n : 1 - n;
    return Y(e === "yy" ? r % 100 : r, e.length);
  },
  // Month
  M(t, e) {
    const n = t.getMonth();
    return e === "M" ? String(n + 1) : Y(n + 1, 2);
  },
  // Day of the month
  d(t, e) {
    return Y(t.getDate(), e.length);
  },
  // AM or PM
  a(t, e) {
    const n = t.getHours() / 12 >= 1 ? "pm" : "am";
    switch (e) {
      case "a":
      case "aa":
        return n.toUpperCase();
      case "aaa":
        return n;
      case "aaaaa":
        return n[0];
      case "aaaa":
      default:
        return n === "am" ? "a.m." : "p.m.";
    }
  },
  // Hour [1-12]
  h(t, e) {
    return Y(t.getHours() % 12 || 12, e.length);
  },
  // Hour [0-23]
  H(t, e) {
    return Y(t.getHours(), e.length);
  },
  // Minute
  m(t, e) {
    return Y(t.getMinutes(), e.length);
  },
  // Second
  s(t, e) {
    return Y(t.getSeconds(), e.length);
  },
  // Fraction of second
  S(t, e) {
    const n = e.length, r = t.getMilliseconds(), a = Math.trunc(
      r * Math.pow(10, n - 3)
    );
    return Y(a, e.length);
  }
}, ce = {
  midnight: "midnight",
  noon: "noon",
  morning: "morning",
  afternoon: "afternoon",
  evening: "evening",
  night: "night"
}, et = {
  // Era
  G: function(t, e, n) {
    const r = t.getFullYear() > 0 ? 1 : 0;
    switch (e) {
      // AD, BC
      case "G":
      case "GG":
      case "GGG":
        return n.era(r, { width: "abbreviated" });
      // A, B
      case "GGGGG":
        return n.era(r, { width: "narrow" });
      // Anno Domini, Before Christ
      case "GGGG":
      default:
        return n.era(r, { width: "wide" });
    }
  },
  // Year
  y: function(t, e, n) {
    if (e === "yo") {
      const r = t.getFullYear(), a = r > 0 ? r : 1 - r;
      return n.ordinalNumber(a, { unit: "year" });
    }
    return te.y(t, e);
  },
  // Local week-numbering year
  Y: function(t, e, n, r) {
    const a = kt(t, r), o = a > 0 ? a : 1 - a;
    if (e === "YY") {
      const i = o % 100;
      return Y(i, 2);
    }
    return e === "Yo" ? n.ordinalNumber(o, { unit: "year" }) : Y(o, e.length);
  },
  // ISO week-numbering year
  R: function(t, e) {
    const n = ht(t);
    return Y(n, e.length);
  },
  // Extended year. This is a single number designating the year of this calendar system.
  // The main difference between `y` and `u` localizers are B.C. years:
  // | Year | `y` | `u` |
  // |------|-----|-----|
  // | AC 1 |   1 |   1 |
  // | BC 1 |   1 |   0 |
  // | BC 2 |   2 |  -1 |
  // Also `yy` always returns the last two digits of a year,
  // while `uu` pads single digit years to 2 characters and returns other years unchanged.
  u: function(t, e) {
    const n = t.getFullYear();
    return Y(n, e.length);
  },
  // Quarter
  Q: function(t, e, n) {
    const r = Math.ceil((t.getMonth() + 1) / 3);
    switch (e) {
      // 1, 2, 3, 4
      case "Q":
        return String(r);
      // 01, 02, 03, 04
      case "QQ":
        return Y(r, 2);
      // 1st, 2nd, 3rd, 4th
      case "Qo":
        return n.ordinalNumber(r, { unit: "quarter" });
      // Q1, Q2, Q3, Q4
      case "QQQ":
        return n.quarter(r, {
          width: "abbreviated",
          context: "formatting"
        });
      // 1, 2, 3, 4 (narrow quarter; could be not numerical)
      case "QQQQQ":
        return n.quarter(r, {
          width: "narrow",
          context: "formatting"
        });
      // 1st quarter, 2nd quarter, ...
      case "QQQQ":
      default:
        return n.quarter(r, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Stand-alone quarter
  q: function(t, e, n) {
    const r = Math.ceil((t.getMonth() + 1) / 3);
    switch (e) {
      // 1, 2, 3, 4
      case "q":
        return String(r);
      // 01, 02, 03, 04
      case "qq":
        return Y(r, 2);
      // 1st, 2nd, 3rd, 4th
      case "qo":
        return n.ordinalNumber(r, { unit: "quarter" });
      // Q1, Q2, Q3, Q4
      case "qqq":
        return n.quarter(r, {
          width: "abbreviated",
          context: "standalone"
        });
      // 1, 2, 3, 4 (narrow quarter; could be not numerical)
      case "qqqqq":
        return n.quarter(r, {
          width: "narrow",
          context: "standalone"
        });
      // 1st quarter, 2nd quarter, ...
      case "qqqq":
      default:
        return n.quarter(r, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  // Month
  M: function(t, e, n) {
    const r = t.getMonth();
    switch (e) {
      case "M":
      case "MM":
        return te.M(t, e);
      // 1st, 2nd, ..., 12th
      case "Mo":
        return n.ordinalNumber(r + 1, { unit: "month" });
      // Jan, Feb, ..., Dec
      case "MMM":
        return n.month(r, {
          width: "abbreviated",
          context: "formatting"
        });
      // J, F, ..., D
      case "MMMMM":
        return n.month(r, {
          width: "narrow",
          context: "formatting"
        });
      // January, February, ..., December
      case "MMMM":
      default:
        return n.month(r, { width: "wide", context: "formatting" });
    }
  },
  // Stand-alone month
  L: function(t, e, n) {
    const r = t.getMonth();
    switch (e) {
      // 1, 2, ..., 12
      case "L":
        return String(r + 1);
      // 01, 02, ..., 12
      case "LL":
        return Y(r + 1, 2);
      // 1st, 2nd, ..., 12th
      case "Lo":
        return n.ordinalNumber(r + 1, { unit: "month" });
      // Jan, Feb, ..., Dec
      case "LLL":
        return n.month(r, {
          width: "abbreviated",
          context: "standalone"
        });
      // J, F, ..., D
      case "LLLLL":
        return n.month(r, {
          width: "narrow",
          context: "standalone"
        });
      // January, February, ..., December
      case "LLLL":
      default:
        return n.month(r, { width: "wide", context: "standalone" });
    }
  },
  // Local week of year
  w: function(t, e, n, r) {
    const a = vt(t, r);
    return e === "wo" ? n.ordinalNumber(a, { unit: "week" }) : Y(a, e.length);
  },
  // ISO week of year
  I: function(t, e, n) {
    const r = Mt(t);
    return e === "Io" ? n.ordinalNumber(r, { unit: "week" }) : Y(r, e.length);
  },
  // Day of the month
  d: function(t, e, n) {
    return e === "do" ? n.ordinalNumber(t.getDate(), { unit: "date" }) : te.d(t, e);
  },
  // Day of year
  D: function(t, e, n) {
    const r = hr(t);
    return e === "Do" ? n.ordinalNumber(r, { unit: "dayOfYear" }) : Y(r, e.length);
  },
  // Day of week
  E: function(t, e, n) {
    const r = t.getDay();
    switch (e) {
      // Tue
      case "E":
      case "EE":
      case "EEE":
        return n.day(r, {
          width: "abbreviated",
          context: "formatting"
        });
      // T
      case "EEEEE":
        return n.day(r, {
          width: "narrow",
          context: "formatting"
        });
      // Tu
      case "EEEEEE":
        return n.day(r, {
          width: "short",
          context: "formatting"
        });
      // Tuesday
      case "EEEE":
      default:
        return n.day(r, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Local day of week
  e: function(t, e, n, r) {
    const a = t.getDay(), o = (a - r.weekStartsOn + 8) % 7 || 7;
    switch (e) {
      // Numerical value (Nth day of week with current locale or weekStartsOn)
      case "e":
        return String(o);
      // Padded numerical value
      case "ee":
        return Y(o, 2);
      // 1st, 2nd, ..., 7th
      case "eo":
        return n.ordinalNumber(o, { unit: "day" });
      case "eee":
        return n.day(a, {
          width: "abbreviated",
          context: "formatting"
        });
      // T
      case "eeeee":
        return n.day(a, {
          width: "narrow",
          context: "formatting"
        });
      // Tu
      case "eeeeee":
        return n.day(a, {
          width: "short",
          context: "formatting"
        });
      // Tuesday
      case "eeee":
      default:
        return n.day(a, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Stand-alone local day of week
  c: function(t, e, n, r) {
    const a = t.getDay(), o = (a - r.weekStartsOn + 8) % 7 || 7;
    switch (e) {
      // Numerical value (same as in `e`)
      case "c":
        return String(o);
      // Padded numerical value
      case "cc":
        return Y(o, e.length);
      // 1st, 2nd, ..., 7th
      case "co":
        return n.ordinalNumber(o, { unit: "day" });
      case "ccc":
        return n.day(a, {
          width: "abbreviated",
          context: "standalone"
        });
      // T
      case "ccccc":
        return n.day(a, {
          width: "narrow",
          context: "standalone"
        });
      // Tu
      case "cccccc":
        return n.day(a, {
          width: "short",
          context: "standalone"
        });
      // Tuesday
      case "cccc":
      default:
        return n.day(a, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  // ISO day of week
  i: function(t, e, n) {
    const r = t.getDay(), a = r === 0 ? 7 : r;
    switch (e) {
      // 2
      case "i":
        return String(a);
      // 02
      case "ii":
        return Y(a, e.length);
      // 2nd
      case "io":
        return n.ordinalNumber(a, { unit: "day" });
      // Tue
      case "iii":
        return n.day(r, {
          width: "abbreviated",
          context: "formatting"
        });
      // T
      case "iiiii":
        return n.day(r, {
          width: "narrow",
          context: "formatting"
        });
      // Tu
      case "iiiiii":
        return n.day(r, {
          width: "short",
          context: "formatting"
        });
      // Tuesday
      case "iiii":
      default:
        return n.day(r, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // AM or PM
  a: function(t, e, n) {
    const a = t.getHours() / 12 >= 1 ? "pm" : "am";
    switch (e) {
      case "a":
      case "aa":
        return n.dayPeriod(a, {
          width: "abbreviated",
          context: "formatting"
        });
      case "aaa":
        return n.dayPeriod(a, {
          width: "abbreviated",
          context: "formatting"
        }).toLowerCase();
      case "aaaaa":
        return n.dayPeriod(a, {
          width: "narrow",
          context: "formatting"
        });
      case "aaaa":
      default:
        return n.dayPeriod(a, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // AM, PM, midnight, noon
  b: function(t, e, n) {
    const r = t.getHours();
    let a;
    switch (r === 12 ? a = ce.noon : r === 0 ? a = ce.midnight : a = r / 12 >= 1 ? "pm" : "am", e) {
      case "b":
      case "bb":
        return n.dayPeriod(a, {
          width: "abbreviated",
          context: "formatting"
        });
      case "bbb":
        return n.dayPeriod(a, {
          width: "abbreviated",
          context: "formatting"
        }).toLowerCase();
      case "bbbbb":
        return n.dayPeriod(a, {
          width: "narrow",
          context: "formatting"
        });
      case "bbbb":
      default:
        return n.dayPeriod(a, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // in the morning, in the afternoon, in the evening, at night
  B: function(t, e, n) {
    const r = t.getHours();
    let a;
    switch (r >= 17 ? a = ce.evening : r >= 12 ? a = ce.afternoon : r >= 4 ? a = ce.morning : a = ce.night, e) {
      case "B":
      case "BB":
      case "BBB":
        return n.dayPeriod(a, {
          width: "abbreviated",
          context: "formatting"
        });
      case "BBBBB":
        return n.dayPeriod(a, {
          width: "narrow",
          context: "formatting"
        });
      case "BBBB":
      default:
        return n.dayPeriod(a, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Hour [1-12]
  h: function(t, e, n) {
    if (e === "ho") {
      let r = t.getHours() % 12;
      return r === 0 && (r = 12), n.ordinalNumber(r, { unit: "hour" });
    }
    return te.h(t, e);
  },
  // Hour [0-23]
  H: function(t, e, n) {
    return e === "Ho" ? n.ordinalNumber(t.getHours(), { unit: "hour" }) : te.H(t, e);
  },
  // Hour [0-11]
  K: function(t, e, n) {
    const r = t.getHours() % 12;
    return e === "Ko" ? n.ordinalNumber(r, { unit: "hour" }) : Y(r, e.length);
  },
  // Hour [1-24]
  k: function(t, e, n) {
    let r = t.getHours();
    return r === 0 && (r = 24), e === "ko" ? n.ordinalNumber(r, { unit: "hour" }) : Y(r, e.length);
  },
  // Minute
  m: function(t, e, n) {
    return e === "mo" ? n.ordinalNumber(t.getMinutes(), { unit: "minute" }) : te.m(t, e);
  },
  // Second
  s: function(t, e, n) {
    return e === "so" ? n.ordinalNumber(t.getSeconds(), { unit: "second" }) : te.s(t, e);
  },
  // Fraction of second
  S: function(t, e) {
    return te.S(t, e);
  },
  // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
  X: function(t, e, n) {
    const r = t.getTimezoneOffset();
    if (r === 0)
      return "Z";
    switch (e) {
      // Hours and optional minutes
      case "X":
        return nt(r);
      // Hours, minutes and optional seconds without `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XX`
      case "XXXX":
      case "XX":
        return re(r);
      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XXX`
      case "XXXXX":
      case "XXX":
      // Hours and minutes with `:` delimiter
      default:
        return re(r, ":");
    }
  },
  // Timezone (ISO-8601. If offset is 0, output is `'+00:00'` or equivalent)
  x: function(t, e, n) {
    const r = t.getTimezoneOffset();
    switch (e) {
      // Hours and optional minutes
      case "x":
        return nt(r);
      // Hours, minutes and optional seconds without `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xx`
      case "xxxx":
      case "xx":
        return re(r);
      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xxx`
      case "xxxxx":
      case "xxx":
      // Hours and minutes with `:` delimiter
      default:
        return re(r, ":");
    }
  },
  // Timezone (GMT)
  O: function(t, e, n) {
    const r = t.getTimezoneOffset();
    switch (e) {
      // Short
      case "O":
      case "OO":
      case "OOO":
        return "GMT" + tt(r, ":");
      // Long
      case "OOOO":
      default:
        return "GMT" + re(r, ":");
    }
  },
  // Timezone (specific non-location)
  z: function(t, e, n) {
    const r = t.getTimezoneOffset();
    switch (e) {
      // Short
      case "z":
      case "zz":
      case "zzz":
        return "GMT" + tt(r, ":");
      // Long
      case "zzzz":
      default:
        return "GMT" + re(r, ":");
    }
  },
  // Seconds timestamp
  t: function(t, e, n) {
    const r = Math.trunc(+t / 1e3);
    return Y(r, e.length);
  },
  // Milliseconds timestamp
  T: function(t, e, n) {
    return Y(+t, e.length);
  }
};
function tt(t, e = "") {
  const n = t > 0 ? "-" : "+", r = Math.abs(t), a = Math.trunc(r / 60), o = r % 60;
  return o === 0 ? n + String(a) : n + String(a) + e + Y(o, 2);
}
function nt(t, e) {
  return t % 60 === 0 ? (t > 0 ? "-" : "+") + Y(Math.abs(t) / 60, 2) : re(t, e);
}
function re(t, e = "") {
  const n = t > 0 ? "-" : "+", r = Math.abs(t), a = Y(Math.trunc(r / 60), 2), o = Y(r % 60, 2);
  return n + a + e + o;
}
const rt = (t, e) => {
  switch (t) {
    case "P":
      return e.date({ width: "short" });
    case "PP":
      return e.date({ width: "medium" });
    case "PPP":
      return e.date({ width: "long" });
    case "PPPP":
    default:
      return e.date({ width: "full" });
  }
}, Dt = (t, e) => {
  switch (t) {
    case "p":
      return e.time({ width: "short" });
    case "pp":
      return e.time({ width: "medium" });
    case "ppp":
      return e.time({ width: "long" });
    case "pppp":
    default:
      return e.time({ width: "full" });
  }
}, yr = (t, e) => {
  const n = t.match(/(P+)(p+)?/) || [], r = n[1], a = n[2];
  if (!a)
    return rt(t, e);
  let o;
  switch (r) {
    case "P":
      o = e.dateTime({ width: "short" });
      break;
    case "PP":
      o = e.dateTime({ width: "medium" });
      break;
    case "PPP":
      o = e.dateTime({ width: "long" });
      break;
    case "PPPP":
    default:
      o = e.dateTime({ width: "full" });
      break;
  }
  return o.replace("{{date}}", rt(r, e)).replace("{{time}}", Dt(a, e));
}, gr = {
  p: Dt,
  P: yr
}, wr = /^D+$/, br = /^Y+$/, Mr = ["D", "DD", "YY", "YYYY"];
function kr(t) {
  return wr.test(t);
}
function vr(t) {
  return br.test(t);
}
function Dr(t, e, n) {
  const r = Or(t, e, n);
  if (console.warn(r), Mr.includes(t)) throw new RangeError(r);
}
function Or(t, e, n) {
  const r = t[0] === "Y" ? "years" : "days of the month";
  return `Use \`${t.toLowerCase()}\` instead of \`${t}\` (in \`${e}\`) for formatting ${r} to the input \`${n}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}
const Wr = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, pr = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, Sr = /^'([^]*?)'?$/, Nr = /''/g, Cr = /[a-zA-Z]/;
function xr(t, e, n) {
  var l, d, m, w, D, p, k, b;
  const r = be(), a = (n == null ? void 0 : n.locale) ?? r.locale ?? je, o = (n == null ? void 0 : n.firstWeekContainsDate) ?? ((d = (l = n == null ? void 0 : n.locale) == null ? void 0 : l.options) == null ? void 0 : d.firstWeekContainsDate) ?? r.firstWeekContainsDate ?? ((w = (m = r.locale) == null ? void 0 : m.options) == null ? void 0 : w.firstWeekContainsDate) ?? 1, i = (n == null ? void 0 : n.weekStartsOn) ?? ((p = (D = n == null ? void 0 : n.locale) == null ? void 0 : D.options) == null ? void 0 : p.weekStartsOn) ?? r.weekStartsOn ?? ((b = (k = r.locale) == null ? void 0 : k.options) == null ? void 0 : b.weekStartsOn) ?? 0, s = T(t, n == null ? void 0 : n.in);
  if (!Nn(s))
    throw new RangeError("Invalid time value");
  let c = e.match(pr).map((M) => {
    const y = M[0];
    if (y === "p" || y === "P") {
      const N = gr[y];
      return N(M, a.formatLong);
    }
    return M;
  }).join("").match(Wr).map((M) => {
    if (M === "''")
      return { isToken: !1, value: "'" };
    const y = M[0];
    if (y === "'")
      return { isToken: !1, value: _r(M) };
    if (et[y])
      return { isToken: !0, value: M };
    if (y.match(Cr))
      throw new RangeError(
        "Format string contains an unescaped latin alphabet character `" + y + "`"
      );
    return { isToken: !1, value: M };
  });
  a.localize.preprocessor && (c = a.localize.preprocessor(s, c));
  const u = {
    firstWeekContainsDate: o,
    weekStartsOn: i,
    locale: a
  };
  return c.map((M) => {
    if (!M.isToken) return M.value;
    const y = M.value;
    (!(n != null && n.useAdditionalWeekYearTokens) && vr(y) || !(n != null && n.useAdditionalDayOfYearTokens) && kr(y)) && Dr(y, e, String(t));
    const N = et[y[0]];
    return N(s, y, a.localize, u);
  }).join("");
}
function _r(t) {
  const e = t.match(Sr);
  return e ? e[1].replace(Nr, "'") : t;
}
function Yr(t, e) {
  const n = T(t, e == null ? void 0 : e.in), r = n.getFullYear(), a = n.getMonth(), o = B(n, 0);
  return o.setFullYear(r, a + 1, 0), o.setHours(0, 0, 0, 0), o.getDate();
}
function Tr(t, e) {
  return T(t, e == null ? void 0 : e.in).getMonth();
}
function Er(t, e) {
  return T(t, e == null ? void 0 : e.in).getFullYear();
}
function Pr(t, e) {
  return +T(t) > +T(e);
}
function Fr(t, e) {
  return +T(t) < +T(e);
}
function Br(t, e, n) {
  const [r, a] = de(
    n == null ? void 0 : n.in,
    t,
    e
  );
  return r.getFullYear() === a.getFullYear() && r.getMonth() === a.getMonth();
}
function Ir(t, e, n) {
  const [r, a] = de(
    n == null ? void 0 : n.in,
    t,
    e
  );
  return r.getFullYear() === a.getFullYear();
}
function Hr(t, e, n) {
  const r = T(t, n == null ? void 0 : n.in), a = r.getFullYear(), o = r.getDate(), i = B(t, 0);
  i.setFullYear(a, e, 15), i.setHours(0, 0, 0, 0);
  const s = Yr(i);
  return r.setMonth(e, Math.min(o, s)), r;
}
function qr(t, e, n) {
  const r = T(t, n == null ? void 0 : n.in);
  return isNaN(+r) ? B(t, NaN) : (r.setFullYear(e), r);
}
function Ar(t, e, n = "long") {
  return new Intl.DateTimeFormat("en-US", {
    // Enforces engine to render the time. Without the option JavaScriptCore omits it.
    hour: "numeric",
    timeZone: t,
    timeZoneName: n
  }).format(e).split(/\s/g).slice(2).join(" ");
}
const Fe = {}, ye = {};
function ae(t, e) {
  try {
    const r = (Fe[t] || (Fe[t] = new Intl.DateTimeFormat("en-US", {
      timeZone: t,
      timeZoneName: "longOffset"
    }).format))(e).split("GMT")[1];
    return r in ye ? ye[r] : at(r, r.split(":"));
  } catch {
    if (t in ye) return ye[t];
    const n = t == null ? void 0 : t.match(jr);
    return n ? at(t, n.slice(1)) : NaN;
  }
}
const jr = /([+-]\d\d):?(\d\d)?/;
function at(t, e) {
  const n = +(e[0] || 0), r = +(e[1] || 0), a = +(e[2] || 0) / 60;
  return ye[t] = n * 60 + r > 0 ? n * 60 + r + a : n * 60 - r - a;
}
class U extends Date {
  //#region static
  constructor(...e) {
    super(), e.length > 1 && typeof e[e.length - 1] == "string" && (this.timeZone = e.pop()), this.internal = /* @__PURE__ */ new Date(), isNaN(ae(this.timeZone, this)) ? this.setTime(NaN) : e.length ? typeof e[0] == "number" && (e.length === 1 || e.length === 2 && typeof e[1] != "number") ? this.setTime(e[0]) : typeof e[0] == "string" ? this.setTime(+new Date(e[0])) : e[0] instanceof Date ? this.setTime(+e[0]) : (this.setTime(+new Date(...e)), Ot(this), Ae(this)) : this.setTime(Date.now());
  }
  static tz(e, ...n) {
    return n.length ? new U(...n, e) : new U(Date.now(), e);
  }
  //#endregion
  //#region time zone
  withTimeZone(e) {
    return new U(+this, e);
  }
  getTimezoneOffset() {
    const e = -ae(this.timeZone, this);
    return e > 0 ? Math.floor(e) : Math.ceil(e);
  }
  //#endregion
  //#region time
  setTime(e) {
    return Date.prototype.setTime.apply(this, arguments), Ae(this), +this;
  }
  //#endregion
  //#region date-fns integration
  [Symbol.for("constructDateFrom")](e) {
    return new U(+new Date(e), this.timeZone);
  }
  //#endregion
}
const ot = /^(get|set)(?!UTC)/;
Object.getOwnPropertyNames(Date.prototype).forEach((t) => {
  if (!ot.test(t)) return;
  const e = t.replace(ot, "$1UTC");
  U.prototype[e] && (t.startsWith("get") ? U.prototype[t] = function() {
    return this.internal[e]();
  } : (U.prototype[t] = function() {
    return Date.prototype[e].apply(this.internal, arguments), zr(this), +this;
  }, U.prototype[e] = function() {
    return Date.prototype[e].apply(this, arguments), Ae(this), +this;
  }));
});
function Ae(t) {
  t.internal.setTime(+t), t.internal.setUTCSeconds(t.internal.getUTCSeconds() - Math.round(-ae(t.timeZone, t) * 60));
}
function zr(t) {
  Date.prototype.setFullYear.call(t, t.internal.getUTCFullYear(), t.internal.getUTCMonth(), t.internal.getUTCDate()), Date.prototype.setHours.call(t, t.internal.getUTCHours(), t.internal.getUTCMinutes(), t.internal.getUTCSeconds(), t.internal.getUTCMilliseconds()), Ot(t);
}
function Ot(t) {
  const e = ae(t.timeZone, t), n = e > 0 ? Math.floor(e) : Math.ceil(e), r = /* @__PURE__ */ new Date(+t);
  r.setUTCHours(r.getUTCHours() - 1);
  const a = -(/* @__PURE__ */ new Date(+t)).getTimezoneOffset(), o = -(/* @__PURE__ */ new Date(+r)).getTimezoneOffset(), i = a - o, s = Date.prototype.getHours.apply(t) !== t.internal.getUTCHours();
  i && s && t.internal.setUTCMinutes(t.internal.getUTCMinutes() + i);
  const c = a - n;
  c && Date.prototype.setUTCMinutes.call(t, Date.prototype.getUTCMinutes.call(t) + c);
  const u = /* @__PURE__ */ new Date(+t);
  u.setUTCSeconds(0);
  const l = a > 0 ? u.getSeconds() : (u.getSeconds() - 60) % 60, d = Math.round(-(ae(t.timeZone, t) * 60)) % 60;
  (d || l) && (t.internal.setUTCSeconds(t.internal.getUTCSeconds() + d), Date.prototype.setUTCSeconds.call(t, Date.prototype.getUTCSeconds.call(t) + d + l));
  const m = ae(t.timeZone, t), w = m > 0 ? Math.floor(m) : Math.ceil(m), p = -(/* @__PURE__ */ new Date(+t)).getTimezoneOffset() - w, k = w !== n, b = p - c;
  if (k && b) {
    Date.prototype.setUTCMinutes.call(t, Date.prototype.getUTCMinutes.call(t) + b);
    const M = ae(t.timeZone, t), y = M > 0 ? Math.floor(M) : Math.ceil(M), N = w - y;
    N && (t.internal.setUTCMinutes(t.internal.getUTCMinutes() + N), Date.prototype.setUTCMinutes.call(t, Date.prototype.getUTCMinutes.call(t) + N));
  }
}
class H extends U {
  //#region static
  static tz(e, ...n) {
    return n.length ? new H(...n, e) : new H(Date.now(), e);
  }
  //#endregion
  //#region representation
  toISOString() {
    const [e, n, r] = this.tzComponents(), a = `${e}${n}:${r}`;
    return this.internal.toISOString().slice(0, -1) + a;
  }
  toString() {
    return `${this.toDateString()} ${this.toTimeString()}`;
  }
  toDateString() {
    const [e, n, r, a] = this.internal.toUTCString().split(" ");
    return `${e == null ? void 0 : e.slice(0, -1)} ${r} ${n} ${a}`;
  }
  toTimeString() {
    const e = this.internal.toUTCString().split(" ")[4], [n, r, a] = this.tzComponents();
    return `${e} GMT${n}${r}${a} (${Ar(this.timeZone, this)})`;
  }
  toLocaleString(e, n) {
    return Date.prototype.toLocaleString.call(this, e, {
      ...n,
      timeZone: (n == null ? void 0 : n.timeZone) || this.timeZone
    });
  }
  toLocaleDateString(e, n) {
    return Date.prototype.toLocaleDateString.call(this, e, {
      ...n,
      timeZone: (n == null ? void 0 : n.timeZone) || this.timeZone
    });
  }
  toLocaleTimeString(e, n) {
    return Date.prototype.toLocaleTimeString.call(this, e, {
      ...n,
      timeZone: (n == null ? void 0 : n.timeZone) || this.timeZone
    });
  }
  //#endregion
  //#region private
  tzComponents() {
    const e = this.getTimezoneOffset(), n = e > 0 ? "-" : "+", r = String(Math.floor(Math.abs(e) / 60)).padStart(2, "0"), a = String(Math.abs(e) % 60).padStart(2, "0");
    return [n, r, a];
  }
  //#endregion
  withTimeZone(e) {
    return new H(+this, e);
  }
  //#region date-fns integration
  [Symbol.for("constructDateFrom")](e) {
    return new H(+new Date(e), this.timeZone);
  }
  //#endregion
}
const st = 5, Rr = 4;
function $r(t, e) {
  const n = e.startOfMonth(t), r = n.getDay() > 0 ? n.getDay() : 7, a = e.addDays(t, -r + 1), o = e.addDays(a, st * 7 - 1);
  return e.getMonth(t) === e.getMonth(o) ? st : Rr;
}
function Wt(t, e) {
  const n = e.startOfMonth(t), r = n.getDay();
  return r === 1 ? n : r === 0 ? e.addDays(n, -6) : e.addDays(n, -1 * (r - 1));
}
function Gr(t, e) {
  const n = Wt(t, e), r = $r(t, e);
  return e.addDays(n, r * 7 - 1);
}
class R {
  /**
   * Creates an instance of `DateLib`.
   *
   * @param options Configuration options for the date library.
   * @param overrides Custom overrides for the date library functions.
   */
  constructor(e, n) {
    this.Date = Date, this.today = () => {
      var r;
      return (r = this.overrides) != null && r.today ? this.overrides.today() : this.options.timeZone ? H.tz(this.options.timeZone) : new this.Date();
    }, this.newDate = (r, a, o) => {
      var i;
      return (i = this.overrides) != null && i.newDate ? this.overrides.newDate(r, a, o) : this.options.timeZone ? new H(r, a, o, this.options.timeZone) : new Date(r, a, o);
    }, this.addDays = (r, a) => {
      var o;
      return (o = this.overrides) != null && o.addDays ? this.overrides.addDays(r, a) : ft(r, a);
    }, this.addMonths = (r, a) => {
      var o;
      return (o = this.overrides) != null && o.addMonths ? this.overrides.addMonths(r, a) : lt(r, a);
    }, this.addWeeks = (r, a) => {
      var o;
      return (o = this.overrides) != null && o.addWeeks ? this.overrides.addWeeks(r, a) : Dn(r, a);
    }, this.addYears = (r, a) => {
      var o;
      return (o = this.overrides) != null && o.addYears ? this.overrides.addYears(r, a) : On(r, a);
    }, this.differenceInCalendarDays = (r, a) => {
      var o;
      return (o = this.overrides) != null && o.differenceInCalendarDays ? this.overrides.differenceInCalendarDays(r, a) : mt(r, a);
    }, this.differenceInCalendarMonths = (r, a) => {
      var o;
      return (o = this.overrides) != null && o.differenceInCalendarMonths ? this.overrides.differenceInCalendarMonths(r, a) : Cn(r, a);
    }, this.eachMonthOfInterval = (r) => {
      var a;
      return (a = this.overrides) != null && a.eachMonthOfInterval ? this.overrides.eachMonthOfInterval(r) : _n(r);
    }, this.eachYearOfInterval = (r) => {
      var s;
      const a = (s = this.overrides) != null && s.eachYearOfInterval ? this.overrides.eachYearOfInterval(r) : En(r), o = new Set(a.map((c) => this.getYear(c)));
      if (o.size === a.length)
        return a;
      const i = [];
      return o.forEach((c) => {
        i.push(new Date(c, 0, 1));
      }), i;
    }, this.endOfBroadcastWeek = (r) => {
      var a;
      return (a = this.overrides) != null && a.endOfBroadcastWeek ? this.overrides.endOfBroadcastWeek(r) : Gr(r, this);
    }, this.endOfISOWeek = (r) => {
      var a;
      return (a = this.overrides) != null && a.endOfISOWeek ? this.overrides.endOfISOWeek(r) : Pn(r);
    }, this.endOfMonth = (r) => {
      var a;
      return (a = this.overrides) != null && a.endOfMonth ? this.overrides.endOfMonth(r) : xn(r);
    }, this.endOfWeek = (r, a) => {
      var o;
      return (o = this.overrides) != null && o.endOfWeek ? this.overrides.endOfWeek(r, a) : bt(r, this.options);
    }, this.endOfYear = (r) => {
      var a;
      return (a = this.overrides) != null && a.endOfYear ? this.overrides.endOfYear(r) : Tn(r);
    }, this.format = (r, a, o) => {
      var s;
      const i = (s = this.overrides) != null && s.format ? this.overrides.format(r, a, this.options) : xr(r, a, this.options);
      return this.options.numerals && this.options.numerals !== "latn" ? this.replaceDigits(i) : i;
    }, this.getISOWeek = (r) => {
      var a;
      return (a = this.overrides) != null && a.getISOWeek ? this.overrides.getISOWeek(r) : Mt(r);
    }, this.getMonth = (r, a) => {
      var o;
      return (o = this.overrides) != null && o.getMonth ? this.overrides.getMonth(r, this.options) : Tr(r, this.options);
    }, this.getYear = (r, a) => {
      var o;
      return (o = this.overrides) != null && o.getYear ? this.overrides.getYear(r, this.options) : Er(r, this.options);
    }, this.getWeek = (r, a) => {
      var o;
      return (o = this.overrides) != null && o.getWeek ? this.overrides.getWeek(r, this.options) : vt(r, this.options);
    }, this.isAfter = (r, a) => {
      var o;
      return (o = this.overrides) != null && o.isAfter ? this.overrides.isAfter(r, a) : Pr(r, a);
    }, this.isBefore = (r, a) => {
      var o;
      return (o = this.overrides) != null && o.isBefore ? this.overrides.isBefore(r, a) : Fr(r, a);
    }, this.isDate = (r) => {
      var a;
      return (a = this.overrides) != null && a.isDate ? this.overrides.isDate(r) : yt(r);
    }, this.isSameDay = (r, a) => {
      var o;
      return (o = this.overrides) != null && o.isSameDay ? this.overrides.isSameDay(r, a) : Sn(r, a);
    }, this.isSameMonth = (r, a) => {
      var o;
      return (o = this.overrides) != null && o.isSameMonth ? this.overrides.isSameMonth(r, a) : Br(r, a);
    }, this.isSameYear = (r, a) => {
      var o;
      return (o = this.overrides) != null && o.isSameYear ? this.overrides.isSameYear(r, a) : Ir(r, a);
    }, this.max = (r) => {
      var a;
      return (a = this.overrides) != null && a.max ? this.overrides.max(r) : Wn(r);
    }, this.min = (r) => {
      var a;
      return (a = this.overrides) != null && a.min ? this.overrides.min(r) : pn(r);
    }, this.setMonth = (r, a) => {
      var o;
      return (o = this.overrides) != null && o.setMonth ? this.overrides.setMonth(r, a) : Hr(r, a);
    }, this.setYear = (r, a) => {
      var o;
      return (o = this.overrides) != null && o.setYear ? this.overrides.setYear(r, a) : qr(r, a);
    }, this.startOfBroadcastWeek = (r, a) => {
      var o;
      return (o = this.overrides) != null && o.startOfBroadcastWeek ? this.overrides.startOfBroadcastWeek(r, this) : Wt(r, this);
    }, this.startOfDay = (r) => {
      var a;
      return (a = this.overrides) != null && a.startOfDay ? this.overrides.startOfDay(r) : we(r);
    }, this.startOfISOWeek = (r) => {
      var a;
      return (a = this.overrides) != null && a.startOfISOWeek ? this.overrides.startOfISOWeek(r) : ge(r);
    }, this.startOfMonth = (r) => {
      var a;
      return (a = this.overrides) != null && a.startOfMonth ? this.overrides.startOfMonth(r) : Yn(r);
    }, this.startOfWeek = (r, a) => {
      var o;
      return (o = this.overrides) != null && o.startOfWeek ? this.overrides.startOfWeek(r, this.options) : ue(r, this.options);
    }, this.startOfYear = (r) => {
      var a;
      return (a = this.overrides) != null && a.startOfYear ? this.overrides.startOfYear(r) : wt(r);
    }, this.options = { locale: je, ...e }, this.overrides = n;
  }
  /**
   * Generates a mapping of Arabic digits (0-9) to the target numbering system
   * digits.
   *
   * @since 9.5.0
   * @returns A record mapping Arabic digits to the target numerals.
   */
  getDigitMap() {
    const { numerals: e = "latn" } = this.options, n = new Intl.NumberFormat("en-US", {
      numberingSystem: e
    }), r = {};
    for (let a = 0; a < 10; a++)
      r[a.toString()] = n.format(a);
    return r;
  }
  /**
   * Replaces Arabic digits in a string with the target numbering system digits.
   *
   * @since 9.5.0
   * @param input The string containing Arabic digits.
   * @returns The string with digits replaced.
   */
  replaceDigits(e) {
    const n = this.getDigitMap();
    return e.replace(/\d/g, (r) => n[r] || r);
  }
  /**
   * Formats a number using the configured numbering system.
   *
   * @since 9.5.0
   * @param value The number to format.
   * @returns The formatted number as a string.
   */
  formatNumber(e) {
    return this.replaceDigits(e.toString());
  }
  /**
   * Returns the preferred ordering for month and year labels for the current
   * locale.
   */
  getMonthYearOrder() {
    var n;
    const e = (n = this.options.locale) == null ? void 0 : n.code;
    return e && R.yearFirstLocales.has(e) ? "year-first" : "month-first";
  }
  /**
   * Formats the month/year pair respecting locale conventions.
   *
   * @since 9.11.0
   */
  formatMonthYear(e) {
    const { locale: n, timeZone: r, numerals: a } = this.options, o = n == null ? void 0 : n.code;
    if (o && R.yearFirstLocales.has(o))
      try {
        return new Intl.DateTimeFormat(o, {
          month: "long",
          year: "numeric",
          timeZone: r,
          numberingSystem: a
        }).format(e);
      } catch {
      }
    const i = this.getMonthYearOrder() === "year-first" ? "y LLLL" : "LLLL y";
    return this.format(e, i);
  }
}
R.yearFirstLocales = /* @__PURE__ */ new Set([
  "eu",
  "hu",
  "ja",
  "ja-Hira",
  "ja-JP",
  "ko",
  "ko-KR",
  "lt",
  "lt-LT",
  "lv",
  "lv-LV",
  "mn",
  "mn-MN",
  "zh",
  "zh-CN",
  "zh-HK",
  "zh-TW"
]);
const V = new R();
class pt {
  constructor(e, n, r = V) {
    this.date = e, this.displayMonth = n, this.outside = !!(n && !r.isSameMonth(e, n)), this.dateLib = r;
  }
  /**
   * Checks if this day is equal to another `CalendarDay`, considering both the
   * date and the displayed month.
   *
   * @param day The `CalendarDay` to compare with.
   * @returns `true` if the days are equal, otherwise `false`.
   */
  isEqualTo(e) {
    return this.dateLib.isSameDay(e.date, this.date) && this.dateLib.isSameMonth(e.displayMonth, this.displayMonth);
  }
}
class Zr {
  constructor(e, n) {
    this.date = e, this.weeks = n;
  }
}
class Qr {
  constructor(e, n) {
    this.days = n, this.weekNumber = e;
  }
}
function Xr(t) {
  return h.createElement("button", { ...t });
}
function Lr(t) {
  return h.createElement("span", { ...t });
}
function Ur(t) {
  const { size: e = 24, orientation: n = "left", className: r } = t;
  return (
    // biome-ignore lint/a11y/noSvgWithoutTitle: handled by the parent component
    h.createElement(
      "svg",
      { className: r, width: e, height: e, viewBox: "0 0 24 24" },
      n === "up" && h.createElement("polygon", { points: "6.77 17 12.5 11.43 18.24 17 20 15.28 12.5 8 5 15.28" }),
      n === "down" && h.createElement("polygon", { points: "6.77 8 12.5 13.57 18.24 8 20 9.72 12.5 17 5 9.72" }),
      n === "left" && h.createElement("polygon", { points: "16 18.112 9.81111111 12 16 5.87733333 14.0888889 4 6 12 14.0888889 20" }),
      n === "right" && h.createElement("polygon", { points: "8 18.112 14.18888889 12 8 5.87733333 9.91111111 4 18 12 9.91111111 20" })
    )
  );
}
function Vr(t) {
  const { day: e, modifiers: n, ...r } = t;
  return h.createElement("td", { ...r });
}
function Kr(t) {
  const { day: e, modifiers: n, ...r } = t, a = h.useRef(null);
  return h.useEffect(() => {
    var o;
    n.focused && ((o = a.current) == null || o.focus());
  }, [n.focused]), h.createElement("button", { ref: a, ...r });
}
var g;
(function(t) {
  t.Root = "root", t.Chevron = "chevron", t.Day = "day", t.DayButton = "day_button", t.CaptionLabel = "caption_label", t.Dropdowns = "dropdowns", t.Dropdown = "dropdown", t.DropdownRoot = "dropdown_root", t.Footer = "footer", t.MonthGrid = "month_grid", t.MonthCaption = "month_caption", t.MonthsDropdown = "months_dropdown", t.Month = "month", t.Months = "months", t.Nav = "nav", t.NextMonthButton = "button_next", t.PreviousMonthButton = "button_previous", t.Week = "week", t.Weeks = "weeks", t.Weekday = "weekday", t.Weekdays = "weekdays", t.WeekNumber = "week_number", t.WeekNumberHeader = "week_number_header", t.YearsDropdown = "years_dropdown";
})(g || (g = {}));
var F;
(function(t) {
  t.disabled = "disabled", t.hidden = "hidden", t.outside = "outside", t.focused = "focused", t.today = "today";
})(F || (F = {}));
var X;
(function(t) {
  t.range_end = "range_end", t.range_middle = "range_middle", t.range_start = "range_start", t.selected = "selected";
})(X || (X = {}));
var z;
(function(t) {
  t.weeks_before_enter = "weeks_before_enter", t.weeks_before_exit = "weeks_before_exit", t.weeks_after_enter = "weeks_after_enter", t.weeks_after_exit = "weeks_after_exit", t.caption_after_enter = "caption_after_enter", t.caption_after_exit = "caption_after_exit", t.caption_before_enter = "caption_before_enter", t.caption_before_exit = "caption_before_exit";
})(z || (z = {}));
function Jr(t) {
  const { options: e, className: n, components: r, classNames: a, ...o } = t, i = [a[g.Dropdown], n].join(" "), s = e == null ? void 0 : e.find(({ value: c }) => c === o.value);
  return h.createElement(
    "span",
    { "data-disabled": o.disabled, className: a[g.DropdownRoot] },
    h.createElement(r.Select, { className: i, ...o }, e == null ? void 0 : e.map(({ value: c, label: u, disabled: l }) => h.createElement(r.Option, { key: c, value: c, disabled: l }, u))),
    h.createElement(
      "span",
      { className: a[g.CaptionLabel], "aria-hidden": !0 },
      s == null ? void 0 : s.label,
      h.createElement(r.Chevron, { orientation: "down", size: 18, className: a[g.Chevron] })
    )
  );
}
function ea(t) {
  return h.createElement("div", { ...t });
}
function ta(t) {
  return h.createElement("div", { ...t });
}
function na(t) {
  const { calendarMonth: e, displayIndex: n, ...r } = t;
  return h.createElement("div", { ...r }, t.children);
}
function ra(t) {
  const { calendarMonth: e, displayIndex: n, ...r } = t;
  return h.createElement("div", { ...r });
}
function aa(t) {
  return h.createElement("table", { ...t });
}
function oa(t) {
  return h.createElement("div", { ...t });
}
const St = yn(void 0);
function Me() {
  const t = gn(St);
  if (t === void 0)
    throw new Error("useDayPicker() must be used within a custom component.");
  return t;
}
function sa(t) {
  const { components: e } = Me();
  return h.createElement(e.Dropdown, { ...t });
}
function ia(t) {
  const { onPreviousClick: e, onNextClick: n, previousMonth: r, nextMonth: a, ...o } = t, { components: i, classNames: s, labels: { labelPrevious: c, labelNext: u } } = Me(), l = $((m) => {
    a && (n == null || n(m));
  }, [a, n]), d = $((m) => {
    r && (e == null || e(m));
  }, [r, e]);
  return h.createElement(
    "nav",
    { ...o },
    h.createElement(
      i.PreviousMonthButton,
      { type: "button", className: s[g.PreviousMonthButton], tabIndex: r ? void 0 : -1, "aria-disabled": r ? void 0 : !0, "aria-label": c(r), onClick: d },
      h.createElement(i.Chevron, { disabled: r ? void 0 : !0, className: s[g.Chevron], orientation: "left" })
    ),
    h.createElement(
      i.NextMonthButton,
      { type: "button", className: s[g.NextMonthButton], tabIndex: a ? void 0 : -1, "aria-disabled": a ? void 0 : !0, "aria-label": u(a), onClick: l },
      h.createElement(i.Chevron, { disabled: a ? void 0 : !0, orientation: "right", className: s[g.Chevron] })
    )
  );
}
function ca(t) {
  const { components: e } = Me();
  return h.createElement(e.Button, { ...t });
}
function ua(t) {
  return h.createElement("option", { ...t });
}
function da(t) {
  const { components: e } = Me();
  return h.createElement(e.Button, { ...t });
}
function fa(t) {
  const { rootRef: e, ...n } = t;
  return h.createElement("div", { ...n, ref: e });
}
function la(t) {
  return h.createElement("select", { ...t });
}
function ha(t) {
  const { week: e, ...n } = t;
  return h.createElement("tr", { ...n });
}
function ma(t) {
  return h.createElement("th", { ...t });
}
function ya(t) {
  return h.createElement(
    "thead",
    { "aria-hidden": !0 },
    h.createElement("tr", { ...t })
  );
}
function ga(t) {
  const { week: e, ...n } = t;
  return h.createElement("th", { ...n });
}
function wa(t) {
  return h.createElement("th", { ...t });
}
function ba(t) {
  return h.createElement("tbody", { ...t });
}
function Ma(t) {
  const { components: e } = Me();
  return h.createElement(e.Dropdown, { ...t });
}
const ka = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Button: Xr,
  CaptionLabel: Lr,
  Chevron: Ur,
  Day: Vr,
  DayButton: Kr,
  Dropdown: Jr,
  DropdownNav: ea,
  Footer: ta,
  Month: na,
  MonthCaption: ra,
  MonthGrid: aa,
  Months: oa,
  MonthsDropdown: sa,
  Nav: ia,
  NextMonthButton: ca,
  Option: ua,
  PreviousMonthButton: da,
  Root: fa,
  Select: la,
  Week: ha,
  WeekNumber: ga,
  WeekNumberHeader: wa,
  Weekday: ma,
  Weekdays: ya,
  Weeks: ba,
  YearsDropdown: Ma
}, Symbol.toStringTag, { value: "Module" }));
function J(t, e, n = !1, r = V) {
  let { from: a, to: o } = t;
  const { differenceInCalendarDays: i, isSameDay: s } = r;
  return a && o ? (i(o, a) < 0 && ([a, o] = [o, a]), i(e, a) >= (n ? 1 : 0) && i(o, e) >= (n ? 1 : 0)) : !n && o ? s(o, e) : !n && a ? s(a, e) : !1;
}
function Nt(t) {
  return !!(t && typeof t == "object" && "before" in t && "after" in t);
}
function ze(t) {
  return !!(t && typeof t == "object" && "from" in t);
}
function Ct(t) {
  return !!(t && typeof t == "object" && "after" in t);
}
function xt(t) {
  return !!(t && typeof t == "object" && "before" in t);
}
function _t(t) {
  return !!(t && typeof t == "object" && "dayOfWeek" in t);
}
function Yt(t, e) {
  return Array.isArray(t) && t.every(e.isDate);
}
function ee(t, e, n = V) {
  const r = Array.isArray(e) ? e : [e], { isSameDay: a, differenceInCalendarDays: o, isAfter: i } = n;
  return r.some((s) => {
    if (typeof s == "boolean")
      return s;
    if (n.isDate(s))
      return a(t, s);
    if (Yt(s, n))
      return s.includes(t);
    if (ze(s))
      return J(s, t, !1, n);
    if (_t(s))
      return Array.isArray(s.dayOfWeek) ? s.dayOfWeek.includes(t.getDay()) : s.dayOfWeek === t.getDay();
    if (Nt(s)) {
      const c = o(s.before, t), u = o(s.after, t), l = c > 0, d = u < 0;
      return i(s.before, s.after) ? d && l : l || d;
    }
    return Ct(s) ? o(t, s.after) > 0 : xt(s) ? o(s.before, t) > 0 : typeof s == "function" ? s(t) : !1;
  });
}
function va(t, e, n, r, a) {
  const { disabled: o, hidden: i, modifiers: s, showOutsideDays: c, broadcastCalendar: u, today: l } = e, { isSameDay: d, isSameMonth: m, startOfMonth: w, isBefore: D, endOfMonth: p, isAfter: k } = a, b = n && w(n), M = r && p(r), y = {
    [F.focused]: [],
    [F.outside]: [],
    [F.disabled]: [],
    [F.hidden]: [],
    [F.today]: []
  }, N = {};
  for (const f of t) {
    const { date: W, displayMonth: O } = f, x = !!(O && !m(W, O)), I = !!(b && D(W, b)), q = !!(M && k(W, M)), A = !!(o && ee(W, o, a)), G = !!(i && ee(W, i, a)) || I || q || // Broadcast calendar will show outside days as default
    !u && !c && x || u && c === !1 && x, oe = d(W, l ?? a.today());
    x && y.outside.push(f), A && y.disabled.push(f), G && y.hidden.push(f), oe && y.today.push(f), s && Object.keys(s).forEach((se) => {
      const ie = s == null ? void 0 : s[se];
      ie && ee(W, ie, a) && (N[se] ? N[se].push(f) : N[se] = [f]);
    });
  }
  return (f) => {
    const W = {
      [F.focused]: !1,
      [F.disabled]: !1,
      [F.hidden]: !1,
      [F.outside]: !1,
      [F.today]: !1
    }, O = {};
    for (const x in y) {
      const I = y[x];
      W[x] = I.some((q) => q === f);
    }
    for (const x in N)
      O[x] = N[x].some((I) => I === f);
    return {
      ...W,
      // custom modifiers should override all the previous ones
      ...O
    };
  };
}
function Da(t, e, n = {}) {
  return Object.entries(t).filter(([, a]) => a === !0).reduce((a, [o]) => (n[o] ? a.push(n[o]) : e[F[o]] ? a.push(e[F[o]]) : e[X[o]] && a.push(e[X[o]]), a), [e[g.Day]]);
}
function Oa(t) {
  return {
    ...ka,
    ...t
  };
}
function Wa(t) {
  const e = {
    "data-mode": t.mode ?? void 0,
    "data-required": "required" in t ? t.required : void 0,
    "data-multiple-months": t.numberOfMonths && t.numberOfMonths > 1 || void 0,
    "data-week-numbers": t.showWeekNumber || void 0,
    "data-broadcast-calendar": t.broadcastCalendar || void 0,
    "data-nav-layout": t.navLayout || void 0
  };
  return Object.entries(t).forEach(([n, r]) => {
    n.startsWith("data-") && (e[n] = r);
  }), e;
}
function Re() {
  const t = {};
  for (const e in g)
    t[g[e]] = `rdp-${g[e]}`;
  for (const e in F)
    t[F[e]] = `rdp-${F[e]}`;
  for (const e in X)
    t[X[e]] = `rdp-${X[e]}`;
  for (const e in z)
    t[z[e]] = `rdp-${z[e]}`;
  return t;
}
function Tt(t, e, n) {
  return (n ?? new R(e)).formatMonthYear(t);
}
const pa = Tt;
function Sa(t, e, n) {
  return (n ?? new R(e)).format(t, "d");
}
function Na(t, e = V) {
  return e.format(t, "LLLL");
}
function Ca(t, e, n) {
  return (n ?? new R(e)).format(t, "cccccc");
}
function xa(t, e = V) {
  return t < 10 ? e.formatNumber(`0${t.toLocaleString()}`) : e.formatNumber(`${t.toLocaleString()}`);
}
function _a() {
  return "";
}
function Et(t, e = V) {
  return e.format(t, "yyyy");
}
const Ya = Et, Ta = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  formatCaption: Tt,
  formatDay: Sa,
  formatMonthCaption: pa,
  formatMonthDropdown: Na,
  formatWeekNumber: xa,
  formatWeekNumberHeader: _a,
  formatWeekdayName: Ca,
  formatYearCaption: Ya,
  formatYearDropdown: Et
}, Symbol.toStringTag, { value: "Module" }));
function Ea(t) {
  return t != null && t.formatMonthCaption && !t.formatCaption && (t.formatCaption = t.formatMonthCaption), t != null && t.formatYearCaption && !t.formatYearDropdown && (t.formatYearDropdown = t.formatYearCaption), {
    ...Ta,
    ...t
  };
}
function Pa(t, e, n, r, a) {
  const { startOfMonth: o, startOfYear: i, endOfYear: s, eachMonthOfInterval: c, getMonth: u } = a;
  return c({
    start: i(t),
    end: s(t)
  }).map((m) => {
    const w = r.formatMonthDropdown(m, a), D = u(m), p = e && m < o(e) || n && m > o(n) || !1;
    return { value: D, label: w, disabled: p };
  });
}
function Fa(t, e = {}, n = {}) {
  let r = { ...e == null ? void 0 : e[g.Day] };
  return Object.entries(t).filter(([, a]) => a === !0).forEach(([a]) => {
    r = {
      ...r,
      ...n == null ? void 0 : n[a]
    };
  }), r;
}
function Ba(t, e, n) {
  const r = t.today(), a = e ? t.startOfISOWeek(r) : t.startOfWeek(r), o = [];
  for (let i = 0; i < 7; i++) {
    const s = t.addDays(a, i);
    o.push(s);
  }
  return o;
}
function Ia(t, e, n, r, a = !1) {
  if (!t || !e)
    return;
  const { startOfYear: o, endOfYear: i, eachYearOfInterval: s, getYear: c } = r, u = o(t), l = i(e), d = s({ start: u, end: l });
  return a && d.reverse(), d.map((m) => {
    const w = n.formatYearDropdown(m, r);
    return {
      value: c(m),
      label: w,
      disabled: !1
    };
  });
}
function Pt(t, e, n, r) {
  let a = (r ?? new R(n)).format(t, "PPPP");
  return e.today && (a = `Today, ${a}`), e.selected && (a = `${a}, selected`), a;
}
const Ha = Pt;
function Ft(t, e, n) {
  return (n ?? new R(e)).formatMonthYear(t);
}
const qa = Ft;
function Aa(t, e, n, r) {
  let a = (r ?? new R(n)).format(t, "PPPP");
  return e != null && e.today && (a = `Today, ${a}`), a;
}
function ja(t) {
  return "Choose the Month";
}
function za() {
  return "";
}
function Ra(t) {
  return "Go to the Next Month";
}
function $a(t) {
  return "Go to the Previous Month";
}
function Ga(t, e, n) {
  return (n ?? new R(e)).format(t, "cccc");
}
function Za(t, e) {
  return `Week ${t}`;
}
function Qa(t) {
  return "Week Number";
}
function Xa(t) {
  return "Choose the Year";
}
const La = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  labelCaption: qa,
  labelDay: Ha,
  labelDayButton: Pt,
  labelGrid: Ft,
  labelGridcell: Aa,
  labelMonthDropdown: ja,
  labelNav: za,
  labelNext: Ra,
  labelPrevious: $a,
  labelWeekNumber: Za,
  labelWeekNumberHeader: Qa,
  labelWeekday: Ga,
  labelYearDropdown: Xa
}, Symbol.toStringTag, { value: "Module" })), ke = (t) => t instanceof HTMLElement ? t : null, Be = (t) => [
  ...t.querySelectorAll("[data-animated-month]") ?? []
], Ua = (t) => ke(t.querySelector("[data-animated-month]")), Ie = (t) => ke(t.querySelector("[data-animated-caption]")), He = (t) => ke(t.querySelector("[data-animated-weeks]")), Va = (t) => ke(t.querySelector("[data-animated-nav]")), Ka = (t) => ke(t.querySelector("[data-animated-weekdays]"));
function Ja(t, e, { classNames: n, months: r, focused: a, dateLib: o }) {
  const i = pe(null), s = pe(r), c = pe(!1);
  wn(() => {
    const u = s.current;
    if (s.current = r, !e || !t.current || // safety check because the ref can be set to anything by consumers
    !(t.current instanceof HTMLElement) || // validation required for the animation to work as expected
    r.length === 0 || u.length === 0 || r.length !== u.length)
      return;
    const l = o.isSameMonth(r[0].date, u[0].date), d = o.isAfter(r[0].date, u[0].date), m = d ? n[z.caption_after_enter] : n[z.caption_before_enter], w = d ? n[z.weeks_after_enter] : n[z.weeks_before_enter], D = i.current, p = t.current.cloneNode(!0);
    if (p instanceof HTMLElement ? (Be(p).forEach((y) => {
      if (!(y instanceof HTMLElement))
        return;
      const N = Ua(y);
      N && y.contains(N) && y.removeChild(N);
      const f = Ie(y);
      f && f.classList.remove(m);
      const W = He(y);
      W && W.classList.remove(w);
    }), i.current = p) : i.current = null, c.current || l || // skip animation if a day is focused because it can cause issues to the animation and is better for a11y
    a)
      return;
    const k = D instanceof HTMLElement ? Be(D) : [], b = Be(t.current);
    if (b != null && b.every((M) => M instanceof HTMLElement) && k && k.every((M) => M instanceof HTMLElement)) {
      c.current = !0, t.current.style.isolation = "isolate";
      const M = Va(t.current);
      M && (M.style.zIndex = "1"), b.forEach((y, N) => {
        const f = k[N];
        if (!f)
          return;
        y.style.position = "relative", y.style.overflow = "hidden";
        const W = Ie(y);
        W && W.classList.add(m);
        const O = He(y);
        O && O.classList.add(w);
        const x = () => {
          c.current = !1, t.current && (t.current.style.isolation = ""), M && (M.style.zIndex = ""), W && W.classList.remove(m), O && O.classList.remove(w), y.style.position = "", y.style.overflow = "", y.contains(f) && y.removeChild(f);
        };
        f.style.pointerEvents = "none", f.style.position = "absolute", f.style.overflow = "hidden", f.setAttribute("aria-hidden", "true");
        const I = Ka(f);
        I && (I.style.opacity = "0");
        const q = Ie(f);
        q && (q.classList.add(d ? n[z.caption_before_exit] : n[z.caption_after_exit]), q.addEventListener("animationend", x));
        const A = He(f);
        A && A.classList.add(d ? n[z.weeks_before_exit] : n[z.weeks_after_exit]), y.insertBefore(f, y.firstChild);
      });
    }
  });
}
function eo(t, e, n, r) {
  const a = t[0], o = t[t.length - 1], { ISOWeek: i, fixedWeeks: s, broadcastCalendar: c } = n ?? {}, { addDays: u, differenceInCalendarDays: l, differenceInCalendarMonths: d, endOfBroadcastWeek: m, endOfISOWeek: w, endOfMonth: D, endOfWeek: p, isAfter: k, startOfBroadcastWeek: b, startOfISOWeek: M, startOfWeek: y } = r, N = c ? b(a, r) : i ? M(a) : y(a), f = c ? m(o) : i ? w(D(o)) : p(D(o)), W = l(f, N), O = d(o, a) + 1, x = [];
  for (let A = 0; A <= W; A++) {
    const G = u(N, A);
    if (e && k(G, e))
      break;
    x.push(G);
  }
  const q = (c ? 35 : 42) * O;
  if (s && x.length < q) {
    const A = q - x.length;
    for (let G = 0; G < A; G++) {
      const oe = u(x[x.length - 1], 1);
      x.push(oe);
    }
  }
  return x;
}
function to(t) {
  const e = [];
  return t.reduce((n, r) => {
    const a = r.weeks.reduce((o, i) => o.concat(i.days.slice()), e.slice());
    return n.concat(a.slice());
  }, e.slice());
}
function no(t, e, n, r) {
  const { numberOfMonths: a = 1 } = n, o = [];
  for (let i = 0; i < a; i++) {
    const s = r.addMonths(t, i);
    if (e && s > e)
      break;
    o.push(s);
  }
  return o;
}
function it(t, e, n, r) {
  const { month: a, defaultMonth: o, today: i = r.today(), numberOfMonths: s = 1 } = t;
  let c = a || o || i;
  const { differenceInCalendarMonths: u, addMonths: l, startOfMonth: d } = r;
  if (n && u(n, c) < s - 1) {
    const m = -1 * (s - 1);
    c = l(n, m);
  }
  return e && u(c, e) < 0 && (c = e), d(c);
}
function ro(t, e, n, r) {
  const { addDays: a, endOfBroadcastWeek: o, endOfISOWeek: i, endOfMonth: s, endOfWeek: c, getISOWeek: u, getWeek: l, startOfBroadcastWeek: d, startOfISOWeek: m, startOfWeek: w } = r, D = t.reduce((p, k) => {
    const b = n.broadcastCalendar ? d(k, r) : n.ISOWeek ? m(k) : w(k), M = n.broadcastCalendar ? o(k) : n.ISOWeek ? i(s(k)) : c(s(k)), y = e.filter((O) => O >= b && O <= M), N = n.broadcastCalendar ? 35 : 42;
    if (n.fixedWeeks && y.length < N) {
      const O = e.filter((x) => {
        const I = N - y.length;
        return x > M && x <= a(M, I);
      });
      y.push(...O);
    }
    const f = y.reduce((O, x) => {
      const I = n.ISOWeek ? u(x) : l(x), q = O.find((G) => G.weekNumber === I), A = new pt(x, k, r);
      return q ? q.days.push(A) : O.push(new Qr(I, [A])), O;
    }, []), W = new Zr(k, f);
    return p.push(W), p;
  }, []);
  return n.reverseMonths ? D.reverse() : D;
}
function ao(t, e) {
  let { startMonth: n, endMonth: r } = t;
  const { startOfYear: a, startOfDay: o, startOfMonth: i, endOfMonth: s, addYears: c, endOfYear: u, newDate: l, today: d } = e, { fromYear: m, toYear: w, fromMonth: D, toMonth: p } = t;
  !n && D && (n = D), !n && m && (n = e.newDate(m, 0, 1)), !r && p && (r = p), !r && w && (r = l(w, 11, 31));
  const k = t.captionLayout === "dropdown" || t.captionLayout === "dropdown-years";
  return n ? n = i(n) : m ? n = l(m, 0, 1) : !n && k && (n = a(c(t.today ?? d(), -100))), r ? r = s(r) : w ? r = l(w, 11, 31) : !r && k && (r = u(t.today ?? d())), [
    n && o(n),
    r && o(r)
  ];
}
function oo(t, e, n, r) {
  if (n.disableNavigation)
    return;
  const { pagedNavigation: a, numberOfMonths: o = 1 } = n, { startOfMonth: i, addMonths: s, differenceInCalendarMonths: c } = r, u = a ? o : 1, l = i(t);
  if (!e)
    return s(l, u);
  if (!(c(e, t) < o))
    return s(l, u);
}
function so(t, e, n, r) {
  if (n.disableNavigation)
    return;
  const { pagedNavigation: a, numberOfMonths: o } = n, { startOfMonth: i, addMonths: s, differenceInCalendarMonths: c } = r, u = a ? o ?? 1 : 1, l = i(t);
  if (!e)
    return s(l, -u);
  if (!(c(l, e) <= 0))
    return s(l, -u);
}
function io(t) {
  const e = [];
  return t.reduce((n, r) => n.concat(r.weeks.slice()), e.slice());
}
function Se(t, e) {
  const [n, r] = qe(t);
  return [e === void 0 ? n : e, r];
}
function co(t, e) {
  const [n, r] = ao(t, e), { startOfMonth: a, endOfMonth: o } = e, i = it(t, n, r, e), [s, c] = Se(
    i,
    // initialMonth is always computed from props.month if provided
    t.month ? i : void 0
  );
  bn(() => {
    const W = it(t, n, r, e);
    c(W);
  }, [t.timeZone]);
  const u = no(s, r, t, e), l = eo(u, t.endMonth ? o(t.endMonth) : void 0, t, e), d = ro(u, l, t, e), m = io(d), w = to(d), D = so(s, n, t, e), p = oo(s, r, t, e), { disableNavigation: k, onMonthChange: b } = t, M = (W) => m.some((O) => O.days.some((x) => x.isEqualTo(W))), y = (W) => {
    if (k)
      return;
    let O = a(W);
    n && O < a(n) && (O = a(n)), r && O > a(r) && (O = a(r)), c(O), b == null || b(O);
  };
  return {
    months: d,
    weeks: m,
    days: w,
    navStart: n,
    navEnd: r,
    previousMonth: D,
    nextMonth: p,
    goToMonth: y,
    goToDay: (W) => {
      M(W) || y(W.date);
    }
  };
}
var L;
(function(t) {
  t[t.Today = 0] = "Today", t[t.Selected = 1] = "Selected", t[t.LastFocused = 2] = "LastFocused", t[t.FocusedModifier = 3] = "FocusedModifier";
})(L || (L = {}));
function ct(t) {
  return !t[F.disabled] && !t[F.hidden] && !t[F.outside];
}
function uo(t, e, n, r) {
  let a, o = -1;
  for (const i of t) {
    const s = e(i);
    ct(s) && (s[F.focused] && o < L.FocusedModifier ? (a = i, o = L.FocusedModifier) : r != null && r.isEqualTo(i) && o < L.LastFocused ? (a = i, o = L.LastFocused) : n(i.date) && o < L.Selected ? (a = i, o = L.Selected) : s[F.today] && o < L.Today && (a = i, o = L.Today));
  }
  return a || (a = t.find((i) => ct(e(i)))), a;
}
function fo(t, e, n, r, a, o, i) {
  const { ISOWeek: s, broadcastCalendar: c } = o, { addDays: u, addMonths: l, addWeeks: d, addYears: m, endOfBroadcastWeek: w, endOfISOWeek: D, endOfWeek: p, max: k, min: b, startOfBroadcastWeek: M, startOfISOWeek: y, startOfWeek: N } = i;
  let W = {
    day: u,
    week: d,
    month: l,
    year: m,
    startOfWeek: (O) => c ? M(O, i) : s ? y(O) : N(O),
    endOfWeek: (O) => c ? w(O) : s ? D(O) : p(O)
  }[t](n, e === "after" ? 1 : -1);
  return e === "before" && r ? W = k([r, W]) : e === "after" && a && (W = b([a, W])), W;
}
function Bt(t, e, n, r, a, o, i, s = 0) {
  if (s > 365)
    return;
  const c = fo(t, e, n.date, r, a, o, i), u = !!(o.disabled && ee(c, o.disabled, i)), l = !!(o.hidden && ee(c, o.hidden, i)), d = c, m = new pt(c, d, i);
  return !u && !l ? m : Bt(t, e, m, r, a, o, i, s + 1);
}
function lo(t, e, n, r, a) {
  const { autoFocus: o } = t, [i, s] = qe(), c = uo(e.days, n, r || (() => !1), i), [u, l] = qe(o ? c : void 0);
  return {
    isFocusTarget: (p) => !!(c != null && c.isEqualTo(p)),
    setFocused: l,
    focused: u,
    blur: () => {
      s(u), l(void 0);
    },
    moveFocus: (p, k) => {
      if (!u)
        return;
      const b = Bt(p, k, u, e.navStart, e.navEnd, t, a);
      b && (t.disableNavigation && !e.days.some((y) => y.isEqualTo(b)) || (e.goToDay(b), l(b)));
    }
  };
}
function ho(t, e) {
  const { selected: n, required: r, onSelect: a } = t, [o, i] = Se(n, a ? n : void 0), s = a ? n : o, { isSameDay: c } = e, u = (w) => (s == null ? void 0 : s.some((D) => c(D, w))) ?? !1, { min: l, max: d } = t;
  return {
    selected: s,
    select: (w, D, p) => {
      let k = [...s ?? []];
      if (u(w)) {
        if ((s == null ? void 0 : s.length) === l || r && (s == null ? void 0 : s.length) === 1)
          return;
        k = s == null ? void 0 : s.filter((b) => !c(b, w));
      } else
        (s == null ? void 0 : s.length) === d ? k = [w] : k = [...k, w];
      return a || i(k), a == null || a(k, w, D, p), k;
    },
    isSelected: u
  };
}
function mo(t, e, n = 0, r = 0, a = !1, o = V) {
  const { from: i, to: s } = e || {}, { isSameDay: c, isAfter: u, isBefore: l } = o;
  let d;
  if (!i && !s)
    d = { from: t, to: n > 0 ? void 0 : t };
  else if (i && !s)
    c(i, t) ? n === 0 ? d = { from: i, to: t } : a ? d = { from: i, to: void 0 } : d = void 0 : l(t, i) ? d = { from: t, to: i } : d = { from: i, to: t };
  else if (i && s)
    if (c(i, t) && c(s, t))
      a ? d = { from: i, to: s } : d = void 0;
    else if (c(i, t))
      d = { from: i, to: n > 0 ? void 0 : t };
    else if (c(s, t))
      d = { from: t, to: n > 0 ? void 0 : t };
    else if (l(t, i))
      d = { from: t, to: s };
    else if (u(t, i))
      d = { from: i, to: t };
    else if (u(t, s))
      d = { from: i, to: t };
    else
      throw new Error("Invalid range");
  if (d != null && d.from && (d != null && d.to)) {
    const m = o.differenceInCalendarDays(d.to, d.from);
    r > 0 && m > r ? d = { from: t, to: void 0 } : n > 1 && m < n && (d = { from: t, to: void 0 });
  }
  return d;
}
function yo(t, e, n = V) {
  const r = Array.isArray(e) ? e : [e];
  let a = t.from;
  const o = n.differenceInCalendarDays(t.to, t.from), i = Math.min(o, 6);
  for (let s = 0; s <= i; s++) {
    if (r.includes(a.getDay()))
      return !0;
    a = n.addDays(a, 1);
  }
  return !1;
}
function ut(t, e, n = V) {
  return J(t, e.from, !1, n) || J(t, e.to, !1, n) || J(e, t.from, !1, n) || J(e, t.to, !1, n);
}
function go(t, e, n = V) {
  const r = Array.isArray(e) ? e : [e];
  if (r.filter((s) => typeof s != "function").some((s) => typeof s == "boolean" ? s : n.isDate(s) ? J(t, s, !1, n) : Yt(s, n) ? s.some((c) => J(t, c, !1, n)) : ze(s) ? s.from && s.to ? ut(t, { from: s.from, to: s.to }, n) : !1 : _t(s) ? yo(t, s.dayOfWeek, n) : Nt(s) ? n.isAfter(s.before, s.after) ? ut(t, {
    from: n.addDays(s.after, 1),
    to: n.addDays(s.before, -1)
  }, n) : ee(t.from, s, n) || ee(t.to, s, n) : Ct(s) || xt(s) ? ee(t.from, s, n) || ee(t.to, s, n) : !1))
    return !0;
  const i = r.filter((s) => typeof s == "function");
  if (i.length) {
    let s = t.from;
    const c = n.differenceInCalendarDays(t.to, t.from);
    for (let u = 0; u <= c; u++) {
      if (i.some((l) => l(s)))
        return !0;
      s = n.addDays(s, 1);
    }
  }
  return !1;
}
function wo(t, e) {
  const { disabled: n, excludeDisabled: r, selected: a, required: o, onSelect: i } = t, [s, c] = Se(a, i ? a : void 0), u = i ? a : s;
  return {
    selected: u,
    select: (m, w, D) => {
      const { min: p, max: k } = t, b = m ? mo(m, u, p, k, o, e) : void 0;
      return r && n && (b != null && b.from) && b.to && go({ from: b.from, to: b.to }, n, e) && (b.from = m, b.to = void 0), i || c(b), i == null || i(b, m, w, D), b;
    },
    isSelected: (m) => u && J(u, m, !1, e)
  };
}
function bo(t, e) {
  const { selected: n, required: r, onSelect: a } = t, [o, i] = Se(n, a ? n : void 0), s = a ? n : o, { isSameDay: c } = e;
  return {
    selected: s,
    select: (d, m, w) => {
      let D = d;
      return !r && s && s && c(d, s) && (D = void 0), a || i(D), a == null || a(D, d, m, w), D;
    },
    isSelected: (d) => s ? c(s, d) : !1
  };
}
function Mo(t, e) {
  const n = bo(t, e), r = ho(t, e), a = wo(t, e);
  switch (t.mode) {
    case "single":
      return n;
    case "multiple":
      return r;
    case "range":
      return a;
    default:
      return;
  }
}
function ko(t) {
  var Le;
  let e = t;
  e.timeZone && (e = {
    ...t
  }, e.today && (e.today = new H(e.today, e.timeZone)), e.month && (e.month = new H(e.month, e.timeZone)), e.defaultMonth && (e.defaultMonth = new H(e.defaultMonth, e.timeZone)), e.startMonth && (e.startMonth = new H(e.startMonth, e.timeZone)), e.endMonth && (e.endMonth = new H(e.endMonth, e.timeZone)), e.mode === "single" && e.selected ? e.selected = new H(e.selected, e.timeZone) : e.mode === "multiple" && e.selected ? e.selected = (Le = e.selected) == null ? void 0 : Le.map((S) => new H(S, e.timeZone)) : e.mode === "range" && e.selected && (e.selected = {
    from: e.selected.from ? new H(e.selected.from, e.timeZone) : void 0,
    to: e.selected.to ? new H(e.selected.to, e.timeZone) : void 0
  }));
  const { components: n, formatters: r, labels: a, dateLib: o, locale: i, classNames: s } = Ee(() => {
    const S = { ...je, ...e.locale };
    return {
      dateLib: new R({
        locale: S,
        weekStartsOn: e.broadcastCalendar ? 1 : e.weekStartsOn,
        firstWeekContainsDate: e.firstWeekContainsDate,
        useAdditionalWeekYearTokens: e.useAdditionalWeekYearTokens,
        useAdditionalDayOfYearTokens: e.useAdditionalDayOfYearTokens,
        timeZone: e.timeZone,
        numerals: e.numerals
      }, e.dateLib),
      components: Oa(e.components),
      formatters: Ea(e.formatters),
      labels: { ...La, ...e.labels },
      locale: S,
      classNames: { ...Re(), ...e.classNames }
    };
  }, [
    e.locale,
    e.broadcastCalendar,
    e.weekStartsOn,
    e.firstWeekContainsDate,
    e.useAdditionalWeekYearTokens,
    e.useAdditionalDayOfYearTokens,
    e.timeZone,
    e.numerals,
    e.dateLib,
    e.components,
    e.formatters,
    e.labels,
    e.classNames
  ]), { captionLayout: c, mode: u, navLayout: l, numberOfMonths: d = 1, onDayBlur: m, onDayClick: w, onDayFocus: D, onDayKeyDown: p, onDayMouseEnter: k, onDayMouseLeave: b, onNextClick: M, onPrevClick: y, showWeekNumber: N, styles: f } = e, { formatCaption: W, formatDay: O, formatMonthDropdown: x, formatWeekNumber: I, formatWeekNumberHeader: q, formatWeekdayName: A, formatYearDropdown: G } = r, oe = co(e, o), { days: se, months: ie, navStart: ve, navEnd: Ne, previousMonth: Z, nextMonth: Q, goToMonth: K } = oe, Ce = va(se, e, ve, Ne, o), { isSelected: fe, select: le, selected: De } = Mo(e, o) ?? {}, { blur: $e, focused: Oe, isFocusTarget: It, moveFocus: Ge, setFocused: We } = lo(e, oe, Ce, fe ?? (() => !1), o), { labelDayButton: Ht, labelGridcell: qt, labelGrid: At, labelMonthDropdown: jt, labelNav: Ze, labelPrevious: zt, labelNext: Rt, labelWeekday: $t, labelWeekNumber: Gt, labelWeekNumberHeader: Zt, labelYearDropdown: Qt } = a, Xt = Ee(() => Ba(o, e.ISOWeek), [o, e.ISOWeek]), Qe = u !== void 0 || w !== void 0, xe = $(() => {
    Z && (K(Z), y == null || y(Z));
  }, [Z, K, y]), _e = $(() => {
    Q && (K(Q), M == null || M(Q));
  }, [K, Q, M]), Lt = $((S, P) => (v) => {
    v.preventDefault(), v.stopPropagation(), We(S), le == null || le(S.date, P, v), w == null || w(S.date, P, v);
  }, [le, w, We]), Ut = $((S, P) => (v) => {
    We(S), D == null || D(S.date, P, v);
  }, [D, We]), Vt = $((S, P) => (v) => {
    $e(), m == null || m(S.date, P, v);
  }, [$e, m]), Kt = $((S, P) => (v) => {
    const E = {
      ArrowLeft: [
        v.shiftKey ? "month" : "day",
        e.dir === "rtl" ? "after" : "before"
      ],
      ArrowRight: [
        v.shiftKey ? "month" : "day",
        e.dir === "rtl" ? "before" : "after"
      ],
      ArrowDown: [v.shiftKey ? "year" : "week", "after"],
      ArrowUp: [v.shiftKey ? "year" : "week", "before"],
      PageUp: [v.shiftKey ? "year" : "month", "before"],
      PageDown: [v.shiftKey ? "year" : "month", "after"],
      Home: ["startOfWeek", "before"],
      End: ["endOfWeek", "after"]
    };
    if (E[v.key]) {
      v.preventDefault(), v.stopPropagation();
      const [j, C] = E[v.key];
      Ge(j, C);
    }
    p == null || p(S.date, P, v);
  }, [Ge, p, e.dir]), Jt = $((S, P) => (v) => {
    k == null || k(S.date, P, v);
  }, [k]), en = $((S, P) => (v) => {
    b == null || b(S.date, P, v);
  }, [b]), tn = $((S) => (P) => {
    const v = Number(P.target.value), E = o.setMonth(o.startOfMonth(S), v);
    K(E);
  }, [o, K]), nn = $((S) => (P) => {
    const v = Number(P.target.value), E = o.setYear(o.startOfMonth(S), v);
    K(E);
  }, [o, K]), { className: rn, style: an } = Ee(() => ({
    className: [s[g.Root], e.className].filter(Boolean).join(" "),
    style: { ...f == null ? void 0 : f[g.Root], ...e.style }
  }), [s, e.className, e.style, f]), on = Wa(e), Xe = pe(null);
  Ja(Xe, !!e.animate, {
    classNames: s,
    months: ie,
    focused: Oe,
    dateLib: o
  });
  const sn = {
    dayPickerProps: e,
    selected: De,
    select: le,
    isSelected: fe,
    months: ie,
    nextMonth: Q,
    previousMonth: Z,
    goToMonth: K,
    getModifiers: Ce,
    components: n,
    classNames: s,
    styles: f,
    labels: a,
    formatters: r
  };
  return h.createElement(
    St.Provider,
    { value: sn },
    h.createElement(
      n.Root,
      { rootRef: e.animate ? Xe : void 0, className: rn, style: an, dir: e.dir, id: e.id, lang: e.lang, nonce: e.nonce, title: e.title, role: e.role, "aria-label": e["aria-label"], "aria-labelledby": e["aria-labelledby"], ...on },
      h.createElement(
        n.Months,
        { className: s[g.Months], style: f == null ? void 0 : f[g.Months] },
        !e.hideNavigation && !l && h.createElement(n.Nav, { "data-animated-nav": e.animate ? "true" : void 0, className: s[g.Nav], style: f == null ? void 0 : f[g.Nav], "aria-label": Ze(), onPreviousClick: xe, onNextClick: _e, previousMonth: Z, nextMonth: Q }),
        ie.map((S, P) => h.createElement(
          n.Month,
          {
            "data-animated-month": e.animate ? "true" : void 0,
            className: s[g.Month],
            style: f == null ? void 0 : f[g.Month],
            // biome-ignore lint/suspicious/noArrayIndexKey: breaks animation
            key: P,
            displayIndex: P,
            calendarMonth: S
          },
          l === "around" && !e.hideNavigation && P === 0 && h.createElement(
            n.PreviousMonthButton,
            { type: "button", className: s[g.PreviousMonthButton], tabIndex: Z ? void 0 : -1, "aria-disabled": Z ? void 0 : !0, "aria-label": zt(Z), onClick: xe, "data-animated-button": e.animate ? "true" : void 0 },
            h.createElement(n.Chevron, { disabled: Z ? void 0 : !0, className: s[g.Chevron], orientation: e.dir === "rtl" ? "right" : "left" })
          ),
          h.createElement(n.MonthCaption, { "data-animated-caption": e.animate ? "true" : void 0, className: s[g.MonthCaption], style: f == null ? void 0 : f[g.MonthCaption], calendarMonth: S, displayIndex: P }, c != null && c.startsWith("dropdown") ? h.createElement(
            n.DropdownNav,
            { className: s[g.Dropdowns], style: f == null ? void 0 : f[g.Dropdowns] },
            (() => {
              const v = c === "dropdown" || c === "dropdown-months" ? h.createElement(n.MonthsDropdown, { key: "month", className: s[g.MonthsDropdown], "aria-label": jt(), classNames: s, components: n, disabled: !!e.disableNavigation, onChange: tn(S.date), options: Pa(S.date, ve, Ne, r, o), style: f == null ? void 0 : f[g.Dropdown], value: o.getMonth(S.date) }) : h.createElement("span", { key: "month" }, x(S.date, o)), E = c === "dropdown" || c === "dropdown-years" ? h.createElement(n.YearsDropdown, { key: "year", className: s[g.YearsDropdown], "aria-label": Qt(o.options), classNames: s, components: n, disabled: !!e.disableNavigation, onChange: nn(S.date), options: Ia(ve, Ne, r, o, !!e.reverseYears), style: f == null ? void 0 : f[g.Dropdown], value: o.getYear(S.date) }) : h.createElement("span", { key: "year" }, G(S.date, o));
              return o.getMonthYearOrder() === "year-first" ? [E, v] : [v, E];
            })(),
            h.createElement("span", { role: "status", "aria-live": "polite", style: {
              border: 0,
              clip: "rect(0 0 0 0)",
              height: "1px",
              margin: "-1px",
              overflow: "hidden",
              padding: 0,
              position: "absolute",
              width: "1px",
              whiteSpace: "nowrap",
              wordWrap: "normal"
            } }, W(S.date, o.options, o))
          ) : (
            // biome-ignore lint/a11y/useSemanticElements: breaking change
            h.createElement(n.CaptionLabel, { className: s[g.CaptionLabel], role: "status", "aria-live": "polite" }, W(S.date, o.options, o))
          )),
          l === "around" && !e.hideNavigation && P === d - 1 && h.createElement(
            n.NextMonthButton,
            { type: "button", className: s[g.NextMonthButton], tabIndex: Q ? void 0 : -1, "aria-disabled": Q ? void 0 : !0, "aria-label": Rt(Q), onClick: _e, "data-animated-button": e.animate ? "true" : void 0 },
            h.createElement(n.Chevron, { disabled: Q ? void 0 : !0, className: s[g.Chevron], orientation: e.dir === "rtl" ? "left" : "right" })
          ),
          P === d - 1 && l === "after" && !e.hideNavigation && h.createElement(n.Nav, { "data-animated-nav": e.animate ? "true" : void 0, className: s[g.Nav], style: f == null ? void 0 : f[g.Nav], "aria-label": Ze(), onPreviousClick: xe, onNextClick: _e, previousMonth: Z, nextMonth: Q }),
          h.createElement(
            n.MonthGrid,
            { role: "grid", "aria-multiselectable": u === "multiple" || u === "range", "aria-label": At(S.date, o.options, o) || void 0, className: s[g.MonthGrid], style: f == null ? void 0 : f[g.MonthGrid] },
            !e.hideWeekdays && h.createElement(
              n.Weekdays,
              { "data-animated-weekdays": e.animate ? "true" : void 0, className: s[g.Weekdays], style: f == null ? void 0 : f[g.Weekdays] },
              N && h.createElement(n.WeekNumberHeader, { "aria-label": Zt(o.options), className: s[g.WeekNumberHeader], style: f == null ? void 0 : f[g.WeekNumberHeader], scope: "col" }, q()),
              Xt.map((v) => h.createElement(n.Weekday, { "aria-label": $t(v, o.options, o), className: s[g.Weekday], key: String(v), style: f == null ? void 0 : f[g.Weekday], scope: "col" }, A(v, o.options, o)))
            ),
            h.createElement(n.Weeks, { "data-animated-weeks": e.animate ? "true" : void 0, className: s[g.Weeks], style: f == null ? void 0 : f[g.Weeks] }, S.weeks.map((v) => h.createElement(
              n.Week,
              { className: s[g.Week], key: v.weekNumber, style: f == null ? void 0 : f[g.Week], week: v },
              N && // biome-ignore lint/a11y/useSemanticElements: react component
              h.createElement(n.WeekNumber, { week: v, style: f == null ? void 0 : f[g.WeekNumber], "aria-label": Gt(v.weekNumber, {
                locale: i
              }), className: s[g.WeekNumber], scope: "row", role: "rowheader" }, I(v.weekNumber, o)),
              v.days.map((E) => {
                const { date: j } = E, C = Ce(E);
                if (C[F.focused] = !C.hidden && !!(Oe != null && Oe.isEqualTo(E)), C[X.selected] = (fe == null ? void 0 : fe(j)) || C.selected, ze(De)) {
                  const { from: Ye, to: Te } = De;
                  C[X.range_start] = !!(Ye && Te && o.isSameDay(j, Ye)), C[X.range_end] = !!(Ye && Te && o.isSameDay(j, Te)), C[X.range_middle] = J(De, j, !0, o);
                }
                const cn = Fa(C, f, e.modifiersStyles), un = Da(C, s, e.modifiersClassNames), dn = !Qe && !C.hidden ? qt(j, C, o.options, o) : void 0;
                return (
                  // biome-ignore lint/a11y/useSemanticElements: react component
                  h.createElement(n.Day, { key: `${o.format(j, "yyyy-MM-dd")}_${o.format(E.displayMonth, "yyyy-MM")}`, day: E, modifiers: C, className: un.join(" "), style: cn, role: "gridcell", "aria-selected": C.selected || void 0, "aria-label": dn, "data-day": o.format(j, "yyyy-MM-dd"), "data-month": E.outside ? o.format(j, "yyyy-MM") : void 0, "data-selected": C.selected || void 0, "data-disabled": C.disabled || void 0, "data-hidden": C.hidden || void 0, "data-outside": E.outside || void 0, "data-focused": C.focused || void 0, "data-today": C.today || void 0 }, !C.hidden && Qe ? h.createElement(n.DayButton, { className: s[g.DayButton], style: f == null ? void 0 : f[g.DayButton], type: "button", day: E, modifiers: C, disabled: C.disabled || void 0, tabIndex: It(E) ? 0 : -1, "aria-label": Ht(j, C, o.options, o), onClick: Lt(E, C), onBlur: Vt(E, C), onFocus: Ut(E, C), onKeyDown: Kt(E, C), onMouseEnter: Jt(E, C), onMouseLeave: en(E, C) }, O(j, o.options, o)) : !C.hidden && O(E.date, o.options, o))
                );
              })
            )))
          )
        ))
      ),
      e.footer && // biome-ignore lint/a11y/useSemanticElements: react component
      h.createElement(n.Footer, { className: s[g.Footer], style: f == null ? void 0 : f[g.Footer], role: "status", "aria-live": "polite" }, e.footer)
    )
  );
}
function Wo({
  className: t,
  classNames: e,
  showOutsideDays: n = !0,
  captionLayout: r = "label",
  buttonVariant: a = "ghost",
  formatters: o,
  components: i,
  ...s
}) {
  const c = Re();
  return /* @__PURE__ */ ne.jsx(
    ko,
    {
      showOutsideDays: n,
      className: _(
        "bg-background group/calendar p-3 [--cell-size:2rem] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent",
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        t
      ),
      captionLayout: r,
      formatters: {
        formatMonthDropdown: (u) => u.toLocaleString("default", { month: "short" }),
        ...o
      },
      classNames: {
        root: _("w-fit", c.root),
        months: _(
          "relative flex flex-col gap-4 md:flex-row",
          c.months
        ),
        month: _("flex w-full flex-col gap-4", c.month),
        nav: _(
          "absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1",
          c.nav
        ),
        button_previous: _(
          Ue({ variant: a }),
          "h-[--cell-size] w-[--cell-size] select-none p-0 aria-disabled:opacity-50",
          c.button_previous
        ),
        button_next: _(
          Ue({ variant: a }),
          "h-[--cell-size] w-[--cell-size] select-none p-0 aria-disabled:opacity-50",
          c.button_next
        ),
        month_caption: _(
          "flex h-[--cell-size] w-full items-center justify-center px-[--cell-size]",
          c.month_caption
        ),
        dropdowns: _(
          "flex h-[--cell-size] w-full items-center justify-center gap-1.5 text-sm font-medium",
          c.dropdowns
        ),
        dropdown_root: _(
          "has-focus:border-ring border-input shadow-xs has-focus:ring-ring/50 has-focus:ring-[3px] relative rounded-md border",
          c.dropdown_root
        ),
        dropdown: _(
          "bg-popover absolute inset-0 opacity-0",
          c.dropdown
        ),
        caption_label: _(
          "select-none font-medium",
          r === "label" ? "text-sm" : "[&>svg]:text-muted-foreground flex h-8 items-center gap-1 rounded-md pl-2 pr-1 text-sm [&>svg]:size-3.5",
          c.caption_label
        ),
        table: "w-full border-collapse",
        weekdays: _("flex", c.weekdays),
        weekday: _(
          "text-muted-foreground flex-1 select-none rounded-md text-[0.8rem] font-normal",
          c.weekday
        ),
        week: _("mt-2 flex w-full", c.week),
        week_number_header: _(
          "w-[--cell-size] select-none",
          c.week_number_header
        ),
        week_number: _(
          "text-muted-foreground select-none text-[0.8rem]",
          c.week_number
        ),
        day: _(
          "group/day relative aspect-square h-full w-full select-none p-0 text-center [&:first-child[data-selected=true]_button]:rounded-l-md [&:last-child[data-selected=true]_button]:rounded-r-md",
          c.day
        ),
        range_start: _(
          "bg-accent rounded-l-md",
          c.range_start
        ),
        range_middle: _("rounded-none", c.range_middle),
        range_end: _("bg-accent rounded-r-md", c.range_end),
        today: _(
          "bg-accent text-accent-foreground rounded-md data-[selected=true]:rounded-none",
          c.today
        ),
        outside: _(
          "text-muted-foreground aria-selected:text-muted-foreground",
          c.outside
        ),
        disabled: _(
          "text-muted-foreground opacity-50",
          c.disabled
        ),
        hidden: _("invisible", c.hidden),
        ...e
      },
      components: {
        Root: ({ className: u, rootRef: l, ...d }) => /* @__PURE__ */ ne.jsx(
          "div",
          {
            "data-slot": "calendar",
            ref: l,
            className: _(u),
            ...d
          }
        ),
        Chevron: ({ className: u, orientation: l, ...d }) => l === "left" ? /* @__PURE__ */ ne.jsx(fn, { className: _("size-4", u), ...d }) : l === "right" ? /* @__PURE__ */ ne.jsx(
          ln,
          {
            className: _("size-4", u),
            ...d
          }
        ) : /* @__PURE__ */ ne.jsx(hn, { className: _("size-4", u), ...d }),
        DayButton: vo,
        WeekNumber: ({ children: u, ...l }) => /* @__PURE__ */ ne.jsx("td", { ...l, children: /* @__PURE__ */ ne.jsx("div", { className: "flex size-[--cell-size] items-center justify-center text-center", children: u }) }),
        ...i
      },
      ...s
    }
  );
}
function vo({
  className: t,
  day: e,
  modifiers: n,
  ...r
}) {
  const a = Re(), o = Ve.useRef(null);
  return Ve.useEffect(() => {
    var i;
    n.focused && ((i = o.current) == null || i.focus());
  }, [n.focused]), /* @__PURE__ */ ne.jsx(
    mn,
    {
      ref: o,
      variant: "ghost",
      size: "icon",
      "data-day": e.date.toLocaleDateString(),
      "data-selected-single": n.selected && !n.range_start && !n.range_end && !n.range_middle,
      "data-range-start": n.range_start,
      "data-range-end": n.range_end,
      "data-range-middle": n.range_middle,
      className: _(
        "data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground data-[range-middle=true]:bg-accent data-[range-middle=true]:text-accent-foreground data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-ring/50 flex aspect-square h-auto w-full min-w-[--cell-size] flex-col gap-1 font-normal leading-none data-[range-end=true]:rounded-md data-[range-middle=true]:rounded-none data-[range-start=true]:rounded-md group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-[3px] [&>span]:text-xs [&>span]:opacity-70",
        a.day,
        t
      ),
      ...r
    }
  );
}
export {
  Wo as C,
  xr as f
};
