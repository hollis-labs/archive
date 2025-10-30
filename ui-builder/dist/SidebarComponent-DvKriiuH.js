import { j as a, c as d, N as $, O as P, Q as S, U as V, B as q, V as F, W as U, Y, Z as C, G as Q, _ as X } from "./index-CwxzwhG1.js";
import * as s from "react";
import Z, { useState as J, useEffect as ee } from "react";
const y = 768;
function ae() {
  const [t, e] = J(!1);
  return ee(() => {
    const r = window.matchMedia(`(max-width: ${y - 1}px)`), i = () => {
      e(window.innerWidth < y);
    };
    return r.addEventListener("change", i), e(window.innerWidth < y), () => r.removeEventListener("change", i);
  }, []), t;
}
const te = "sidebar:state", re = 3600 * 24 * 7, se = "16rem", k = "18rem", ne = "3rem", ie = "b", z = s.createContext(null);
function I() {
  const t = s.useContext(z);
  if (!t)
    throw new Error("useSidebar must be used within a SidebarProvider.");
  return t;
}
const B = s.forwardRef(
  ({
    defaultOpen: t = !0,
    open: e,
    onOpenChange: r,
    className: i,
    style: o,
    children: c,
    ...p
  }, g) => {
    const f = ae(), [m, h] = s.useState(!1), [N, j] = s.useState(t), n = e ?? N, u = s.useCallback(
      (b) => {
        const x = typeof b == "function" ? b(n) : b;
        r ? r(x) : j(x), document.cookie = `${te}=${x}; path=/; max-age=${re}`;
      },
      [r, n]
    ), l = s.useCallback(() => f ? h((b) => !b) : u((b) => !b), [f, u, h]);
    s.useEffect(() => {
      const b = (x) => {
        x.key === ie && (x.metaKey || x.ctrlKey) && (x.preventDefault(), l());
      };
      return window.addEventListener("keydown", b), () => window.removeEventListener("keydown", b);
    }, [l]);
    const v = n ? "expanded" : "collapsed", w = s.useMemo(
      () => ({
        state: v,
        open: n,
        setOpen: u,
        isMobile: f,
        openMobile: m,
        setOpenMobile: h,
        toggleSidebar: l
      }),
      [v, n, u, f, m, h, l]
    );
    return /* @__PURE__ */ a.jsx(z.Provider, { value: w, children: /* @__PURE__ */ a.jsx(
      "div",
      {
        style: {
          "--sidebar-width": se,
          "--sidebar-width-icon": ne,
          "--sidebar-width-mobile": k,
          ...o
        },
        className: d(
          "group/sidebar-wrapper flex min-h-svh w-full has-[[data-variant=inset]]:bg-sidebar",
          i
        ),
        ref: g,
        ...p,
        children: c
      }
    ) });
  }
);
B.displayName = "SidebarProvider";
const A = s.forwardRef(
  ({
    side: t = "left",
    variant: e = "sidebar",
    collapsible: r = "offcanvas",
    className: i,
    children: o,
    ...c
  }, p) => {
    const { isMobile: g, state: f, openMobile: m, setOpenMobile: h } = I();
    return r === "none" ? /* @__PURE__ */ a.jsx(
      "div",
      {
        className: d(
          "flex h-full w-[--sidebar-width] flex-col bg-sidebar text-sidebar-foreground",
          i
        ),
        ref: p,
        ...c,
        children: o
      }
    ) : g ? /* @__PURE__ */ a.jsx($, { open: m, onOpenChange: h, ...c, children: /* @__PURE__ */ a.jsx(
      P,
      {
        "data-sidebar": "sidebar",
        "data-mobile": "true",
        className: "w-[--sidebar-width-mobile] bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden",
        style: {
          "--sidebar-width": k
        },
        side: t,
        children: /* @__PURE__ */ a.jsx("div", { className: "flex h-full w-full flex-col", children: o })
      }
    ) }) : /* @__PURE__ */ a.jsxs(
      "div",
      {
        ref: p,
        className: "group peer hidden md:block text-sidebar-foreground",
        "data-state": f,
        "data-collapsible": f === "collapsed" ? r : "",
        "data-variant": e,
        "data-side": t,
        children: [
          /* @__PURE__ */ a.jsx(
            "div",
            {
              className: d(
                "duration-200 relative h-svh w-[--sidebar-width] bg-transparent transition-[width] ease-linear",
                "group-data-[collapsible=offcanvas]:w-0",
                "group-data-[side=right]:rotate-180",
                e === "floating" || e === "inset" ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]" : "group-data-[collapsible=icon]:w-[--sidebar-width-icon]"
              )
            }
          ),
          /* @__PURE__ */ a.jsx(
            "div",
            {
              className: d(
                "duration-200 fixed inset-y-0 z-10 hidden h-svh w-[--sidebar-width] transition-[left,right,width] ease-linear md:flex",
                t === "left" ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]" : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
                // Adjust the padding for floating and inset variants.
                e === "floating" || e === "inset" ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]" : "group-data-[collapsible=icon]:w-[--sidebar-width-icon] group-data-[side=left]:border-r group-data-[side=right]:border-l",
                i
              ),
              ...c,
              children: /* @__PURE__ */ a.jsx(
                "div",
                {
                  "data-sidebar": "sidebar",
                  className: "flex h-full w-full flex-col bg-sidebar group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:border-sidebar-border group-data-[variant=floating]:shadow",
                  children: o
                }
              )
            }
          )
        ]
      }
    );
  }
);
A.displayName = "Sidebar";
const de = s.forwardRef(({ className: t, onClick: e, ...r }, i) => {
  const { toggleSidebar: o } = I();
  return /* @__PURE__ */ a.jsxs(
    q,
    {
      ref: i,
      "data-sidebar": "trigger",
      variant: "ghost",
      size: "icon",
      className: d("h-7 w-7", t),
      onClick: (c) => {
        e == null || e(c), o();
      },
      ...r,
      children: [
        /* @__PURE__ */ a.jsx(F, {}),
        /* @__PURE__ */ a.jsx("span", { className: "sr-only", children: "Toggle Sidebar" })
      ]
    }
  );
});
de.displayName = "SidebarTrigger";
const oe = s.forwardRef(({ className: t, ...e }, r) => {
  const { toggleSidebar: i } = I();
  return /* @__PURE__ */ a.jsx(
    "button",
    {
      ref: r,
      "data-sidebar": "rail",
      "aria-label": "Toggle Sidebar",
      tabIndex: -1,
      onClick: i,
      title: "Toggle Sidebar",
      className: d(
        "absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] after:-translate-x-1/2 after:bg-sidebar-border after:opacity-0 after:transition-opacity after:duration-300 hover:after:opacity-100 group-data-[side=left]:-right-4 group-data-[side=right]:left-0 sm:flex",
        "[[data-side=left]_&]:cursor-w-resize [[data-side=right]_&]:cursor-e-resize",
        "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize",
        t
      ),
      ...e
    }
  );
});
oe.displayName = "SidebarRail";
const le = s.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ a.jsx(
  "main",
  {
    ref: r,
    className: d(
      "relative flex min-h-svh flex-1 flex-col bg-background",
      "peer-data-[variant=inset]:min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:ml-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow",
      t
    ),
    ...e
  }
));
le.displayName = "SidebarInset";
const ce = s.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ a.jsx(
  U,
  {
    ref: r,
    "data-sidebar": "input",
    className: d(
      "h-8 w-full bg-background shadow-none focus-visible:ring-2 focus-visible:ring-sidebar-ring",
      t
    ),
    ...e
  }
));
ce.displayName = "SidebarInput";
const ue = s.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ a.jsx(
  "div",
  {
    ref: r,
    "data-sidebar": "header",
    className: d("flex flex-col gap-2 p-2", t),
    ...e
  }
));
ue.displayName = "SidebarHeader";
const be = s.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ a.jsx(
  "div",
  {
    ref: r,
    "data-sidebar": "footer",
    className: d("flex flex-col gap-2 p-2", t),
    ...e
  }
));
be.displayName = "SidebarFooter";
const fe = s.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ a.jsx(
  Y,
  {
    ref: r,
    "data-sidebar": "separator",
    className: d("mx-2 w-auto bg-sidebar-border", t),
    ...e
  }
));
fe.displayName = "SidebarSeparator";
const O = s.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ a.jsx(
  "div",
  {
    ref: r,
    "data-sidebar": "content",
    className: d(
      "flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
      t
    ),
    ...e
  }
));
O.displayName = "SidebarContent";
const M = s.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ a.jsx(
  "div",
  {
    ref: r,
    "data-sidebar": "group",
    className: d("relative flex w-full min-w-0 flex-col p-2", t),
    ...e
  }
));
M.displayName = "SidebarGroup";
const D = s.forwardRef(({ className: t, asChild: e = !1, ...r }, i) => {
  const o = e ? S : "div";
  return /* @__PURE__ */ a.jsx(
    o,
    {
      ref: i,
      "data-sidebar": "group-label",
      className: d(
        "duration-200 flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-sidebar-foreground/70 outline-none ring-sidebar-ring transition-[margin,opa] ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0",
        t
      ),
      ...r
    }
  );
});
D.displayName = "SidebarGroupLabel";
const pe = s.forwardRef(({ className: t, asChild: e = !1, ...r }, i) => {
  const o = e ? S : "button";
  return /* @__PURE__ */ a.jsx(
    o,
    {
      ref: i,
      "data-sidebar": "group-action",
      className: d(
        "absolute right-3 top-3.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "after:absolute after:-inset-2 after:md:hidden",
        "group-data-[collapsible=icon]:hidden",
        t
      ),
      ...r
    }
  );
});
pe.displayName = "SidebarGroupAction";
const R = s.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ a.jsx(
  "div",
  {
    ref: r,
    "data-sidebar": "group-content",
    className: d("w-full text-sm", t),
    ...e
  }
));
R.displayName = "SidebarGroupContent";
const _ = s.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ a.jsx(
  "ul",
  {
    ref: r,
    "data-sidebar": "menu",
    className: d("flex w-full min-w-0 flex-col gap-1", t),
    ...e
  }
));
_.displayName = "SidebarMenu";
const T = s.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ a.jsx(
  "li",
  {
    ref: r,
    "data-sidebar": "menu-item",
    className: d("group/menu-item relative", t),
    ...e
  }
));
T.displayName = "SidebarMenuItem";
const me = V(
  "peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-2 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        outline: "bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]"
      },
      size: {
        default: "h-8 text-sm",
        sm: "h-7 text-xs",
        lg: "h-12 text-sm group-data-[collapsible=icon]:!p-0"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
), G = s.forwardRef(
  ({
    asChild: t = !1,
    isActive: e = !1,
    variant: r = "default",
    size: i = "default",
    tooltip: o,
    className: c,
    ...p
  }, g) => {
    const f = t ? S : "button", m = /* @__PURE__ */ a.jsx(
      f,
      {
        ref: g,
        "data-sidebar": "menu-button",
        "data-size": i,
        "data-active": e,
        className: d(me({ variant: r, size: i }), c),
        ...p
      }
    );
    return o && typeof o == "string" && (o = {
      children: o
    }), m;
  }
);
G.displayName = "SidebarMenuButton";
const ge = s.forwardRef(({ className: t, asChild: e = !1, showOnHover: r = !1, ...i }, o) => {
  const c = e ? S : "button";
  return /* @__PURE__ */ a.jsx(
    c,
    {
      ref: o,
      "data-sidebar": "menu-action",
      className: d(
        "absolute right-1 top-1.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 peer-hover/menu-button:text-sidebar-accent-foreground [&>svg]:size-4 [&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "after:absolute after:-inset-2 after:md:hidden",
        "peer-data-[size=sm]/menu-button:top-1",
        "peer-data-[size=default]/menu-button:top-1.5",
        "peer-data-[size=lg]/menu-button:top-2.5",
        "group-data-[collapsible=icon]:hidden",
        r && "group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 peer-data-[active=true]/menu-button:text-sidebar-accent-foreground md:opacity-0",
        t
      ),
      ...i
    }
  );
});
ge.displayName = "SidebarMenuAction";
const L = s.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ a.jsx(
  "div",
  {
    ref: r,
    "data-sidebar": "menu-badge",
    className: d(
      "absolute right-1 flex h-5 min-w-5 items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums text-sidebar-foreground select-none pointer-events-none",
      "peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[active=true]/menu-button:text-sidebar-accent-foreground",
      "peer-data-[size=sm]/menu-button:top-1",
      "peer-data-[size=default]/menu-button:top-1.5",
      "peer-data-[size=lg]/menu-button:top-2.5",
      "group-data-[collapsible=icon]:hidden",
      t
    ),
    ...e
  }
));
L.displayName = "SidebarMenuBadge";
const he = s.forwardRef(({ className: t, showIcon: e = !1, ...r }, i) => {
  const o = s.useMemo(() => `${Math.floor(Math.random() * 40) + 50}%`, []);
  return /* @__PURE__ */ a.jsxs(
    "div",
    {
      ref: i,
      "data-sidebar": "menu-skeleton",
      className: d("rounded-md h-8 flex gap-2 px-2 items-center", t),
      ...r,
      children: [
        e && /* @__PURE__ */ a.jsx(C, { className: "size-4 rounded-md", "data-sidebar": "menu-skeleton-icon" }),
        /* @__PURE__ */ a.jsx(
          C,
          {
            className: "h-4 flex-1 max-w-[--skeleton-width]",
            "data-sidebar": "menu-skeleton-text",
            style: {
              "--skeleton-width": o
            }
          }
        )
      ]
    }
  );
});
he.displayName = "SidebarMenuSkeleton";
const K = s.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ a.jsx(
  "ul",
  {
    ref: r,
    "data-sidebar": "menu-sub",
    className: d(
      "mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l border-sidebar-border px-2.5 py-0.5",
      "group-data-[collapsible=icon]:hidden",
      t
    ),
    ...e
  }
));
K.displayName = "SidebarMenuSub";
const H = s.forwardRef(({ ...t }, e) => /* @__PURE__ */ a.jsx("li", { ref: e, ...t }));
H.displayName = "SidebarMenuSubItem";
const W = s.forwardRef(({ asChild: t = !1, size: e = "md", isActive: r, className: i, ...o }, c) => {
  const p = t ? S : "a";
  return /* @__PURE__ */ a.jsx(
    p,
    {
      ref: c,
      "data-sidebar": "menu-sub-button",
      "data-size": e,
      "data-active": r,
      className: d(
        "flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 text-sidebar-foreground outline-none ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-sidebar-foreground/50",
        "data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground",
        e === "sm" && "text-xs",
        e === "md" && "text-sm",
        "group-data-[collapsible=icon]:hidden",
        i
      ),
      ...o
    }
  );
});
W.displayName = "SidebarMenuSubButton";
function E(t) {
  if (!t) return null;
  const e = X[t];
  return e ? /* @__PURE__ */ a.jsx(e, { className: "h-4 w-4" }) : null;
}
function we({ config: t }) {
  const { props: e } = t, {
    collapsible: r = !0,
    defaultOpen: i = !0,
    side: o = "left",
    variant: c = "sidebar",
    items: p = [],
    groups: g = [],
    className: f
  } = e, [m, h] = Z.useState(/* @__PURE__ */ new Set()), N = (n) => {
    h((u) => {
      const l = new Set(u);
      return l.has(n) ? l.delete(n) : l.add(n), l;
    });
  }, j = (n, u) => {
    const l = n.children && n.children.length > 0, v = m.has(n.label);
    return /* @__PURE__ */ a.jsxs(T, { children: [
      /* @__PURE__ */ a.jsx(
        G,
        {
          asChild: !l,
          isActive: n.active,
          onClick: l ? () => N(n.label) : void 0,
          children: l ? /* @__PURE__ */ a.jsxs("div", { className: "flex items-center justify-between w-full", children: [
            /* @__PURE__ */ a.jsxs("div", { className: "flex items-center gap-2", children: [
              E(n.icon),
              /* @__PURE__ */ a.jsx("span", { children: n.label })
            ] }),
            /* @__PURE__ */ a.jsx(
              Q,
              {
                className: d(
                  "h-4 w-4 transition-transform",
                  v && "rotate-90"
                )
              }
            )
          ] }) : /* @__PURE__ */ a.jsxs("a", { href: n.href || "#", children: [
            E(n.icon),
            /* @__PURE__ */ a.jsx("span", { children: n.label }),
            n.badge && /* @__PURE__ */ a.jsx(L, { children: n.badge })
          ] })
        }
      ),
      l && v && /* @__PURE__ */ a.jsx(K, { children: n.children.map((w, b) => /* @__PURE__ */ a.jsx(H, { children: /* @__PURE__ */ a.jsx(W, { asChild: !0, isActive: w.active, children: /* @__PURE__ */ a.jsx("a", { href: w.href || "#", children: /* @__PURE__ */ a.jsx("span", { children: w.label }) }) }) }, b)) })
    ] }, u);
  };
  return /* @__PURE__ */ a.jsx(B, { defaultOpen: i, children: /* @__PURE__ */ a.jsx(
    A,
    {
      side: o,
      variant: c,
      collapsible: r ? "icon" : "none",
      className: d(f),
      children: /* @__PURE__ */ a.jsx(O, { children: g.length > 0 ? g.map((n, u) => /* @__PURE__ */ a.jsxs(M, { children: [
        n.label && /* @__PURE__ */ a.jsx(D, { children: n.label }),
        /* @__PURE__ */ a.jsx(R, { children: /* @__PURE__ */ a.jsx(_, { children: n.items.map((l, v) => j(l, v)) }) })
      ] }, u)) : /* @__PURE__ */ a.jsx(M, { children: /* @__PURE__ */ a.jsx(R, { children: /* @__PURE__ */ a.jsx(_, { children: p.map((n, u) => j(n, u)) }) }) }) })
    }
  ) });
}
export {
  we as SidebarComponent
};
