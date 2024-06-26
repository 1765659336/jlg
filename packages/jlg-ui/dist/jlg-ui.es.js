import { getCurrentScope as Wo, onScopeDispose as zo, unref as i, watch as B, defineComponent as O, openBlock as P, createElementBlock as F, createElementVNode as G, warn as Jo, getCurrentInstance as Ve, inject as K, ref as $, computed as b, onMounted as be, shallowRef as qo, onBeforeUnmount as me, onBeforeMount as Zo, provide as U, mergeProps as ge, renderSlot as R, normalizeClass as z, normalizeStyle as Et, withDirectives as Ct, cloneVNode as Go, Fragment as lt, Text as Qo, Comment as Yo, createVNode as te, createBlock as X, withCtx as H, createCommentVNode as fe, nextTick as gn, toRef as je, Teleport as Xo, Transition as Xn, vShow as Dt, readonly as er, onDeactivated as tr, toDisplayString as he, toHandlers as nr, withKeys as or, withModifiers as eo, createTextVNode as Ot, useSlots as Mt, resolveComponent as rr, renderList as De, useAttrs as to, createSlots as no } from "vue";
const pe = (e, t, { checkForDefaultPrevented: n = !0 } = {}) => (o) => {
  const s = e == null ? void 0 : e(o);
  if (n === !1 || !s)
    return t == null ? void 0 : t(o);
};
var yn;
const se = typeof window < "u", sr = (e) => typeof e == "string", oo = () => {
}, ar = se && ((yn = window == null ? void 0 : window.navigator) == null ? void 0 : yn.userAgent) && /iP(ad|hone|od)/.test(window.navigator.userAgent);
function ro(e) {
  return typeof e == "function" ? e() : i(e);
}
function ir(e) {
  return e;
}
function so(e) {
  return Wo() ? (zo(e), !0) : !1;
}
function Oe(e) {
  var t;
  const n = ro(e);
  return (t = n == null ? void 0 : n.$el) != null ? t : n;
}
const ao = se ? window : void 0;
function St(...e) {
  let t, n, r, o;
  if (sr(e[0]) || Array.isArray(e[0]) ? ([n, r, o] = e, t = ao) : [t, n, r, o] = e, !t)
    return oo;
  Array.isArray(n) || (n = [n]), Array.isArray(r) || (r = [r]);
  const s = [], a = () => {
    s.forEach((v) => v()), s.length = 0;
  }, l = (v, m, y, h) => (v.addEventListener(m, y, h), () => v.removeEventListener(m, y, h)), c = B(() => [Oe(t), ro(o)], ([v, m]) => {
    a(), v && s.push(...n.flatMap((y) => r.map((h) => l(v, y, h, m))));
  }, { immediate: !0, flush: "post" }), u = () => {
    c(), a();
  };
  return so(u), u;
}
let hn = !1;
function lr(e, t, n = {}) {
  const { window: r = ao, ignore: o = [], capture: s = !0, detectIframe: a = !1 } = n;
  if (!r)
    return;
  ar && !hn && (hn = !0, Array.from(r.document.body.children).forEach((y) => y.addEventListener("click", oo)));
  let l = !0;
  const c = (y) => o.some((h) => {
    if (typeof h == "string")
      return Array.from(r.document.querySelectorAll(h)).some((f) => f === y.target || y.composedPath().includes(f));
    {
      const f = Oe(h);
      return f && (y.target === f || y.composedPath().includes(f));
    }
  }), v = [
    St(r, "click", (y) => {
      const h = Oe(e);
      if (!(!h || h === y.target || y.composedPath().includes(h))) {
        if (y.detail === 0 && (l = !c(y)), !l) {
          l = !0;
          return;
        }
        t(y);
      }
    }, { passive: !0, capture: s }),
    St(r, "pointerdown", (y) => {
      const h = Oe(e);
      h && (l = !y.composedPath().includes(h) && !c(y));
    }, { passive: !0 }),
    a && St(r, "blur", (y) => {
      var h;
      const f = Oe(e);
      ((h = r.document.activeElement) == null ? void 0 : h.tagName) === "IFRAME" && !(f != null && f.contains(r.document.activeElement)) && t(y);
    })
  ].filter(Boolean);
  return () => v.forEach((y) => y());
}
const bn = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, _n = "__vueuse_ssr_handlers__";
bn[_n] = bn[_n] || {};
var wn;
(function(e) {
  e.UP = "UP", e.RIGHT = "RIGHT", e.DOWN = "DOWN", e.LEFT = "LEFT", e.NONE = "NONE";
})(wn || (wn = {}));
var cr = Object.defineProperty, En = Object.getOwnPropertySymbols, ur = Object.prototype.hasOwnProperty, dr = Object.prototype.propertyIsEnumerable, Cn = (e, t, n) => t in e ? cr(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, pr = (e, t) => {
  for (var n in t || (t = {}))
    ur.call(t, n) && Cn(e, n, t[n]);
  if (En)
    for (var n of En(t))
      dr.call(t, n) && Cn(e, n, t[n]);
  return e;
};
const fr = {
  easeInSine: [0.12, 0, 0.39, 0],
  easeOutSine: [0.61, 1, 0.88, 1],
  easeInOutSine: [0.37, 0, 0.63, 1],
  easeInQuad: [0.11, 0, 0.5, 0],
  easeOutQuad: [0.5, 1, 0.89, 1],
  easeInOutQuad: [0.45, 0, 0.55, 1],
  easeInCubic: [0.32, 0, 0.67, 0],
  easeOutCubic: [0.33, 1, 0.68, 1],
  easeInOutCubic: [0.65, 0, 0.35, 1],
  easeInQuart: [0.5, 0, 0.75, 0],
  easeOutQuart: [0.25, 1, 0.5, 1],
  easeInOutQuart: [0.76, 0, 0.24, 1],
  easeInQuint: [0.64, 0, 0.78, 0],
  easeOutQuint: [0.22, 1, 0.36, 1],
  easeInOutQuint: [0.83, 0, 0.17, 1],
  easeInExpo: [0.7, 0, 0.84, 0],
  easeOutExpo: [0.16, 1, 0.3, 1],
  easeInOutExpo: [0.87, 0, 0.13, 1],
  easeInCirc: [0.55, 0, 1, 0.45],
  easeOutCirc: [0, 0.55, 0.45, 1],
  easeInOutCirc: [0.85, 0, 0.15, 1],
  easeInBack: [0.36, 0, 0.66, -0.56],
  easeOutBack: [0.34, 1.56, 0.64, 1],
  easeInOutBack: [0.68, -0.6, 0.32, 1.6]
};
pr({
  linear: ir
}, fr);
/**
* @vue/shared v3.4.27
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
process.env.NODE_ENV !== "production" && Object.freeze({});
process.env.NODE_ENV !== "production" && Object.freeze([]);
const ht = () => {
}, vr = Object.prototype.hasOwnProperty, On = (e, t) => vr.call(e, t), io = Array.isArray, ot = (e) => typeof e == "function", qe = (e) => typeof e == "string", Kt = (e) => e !== null && typeof e == "object";
var mr = Array.isArray;
const gr = mr;
function Tn() {
  if (!arguments.length)
    return [];
  var e = arguments[0];
  return gr(e) ? e : [e];
}
function Bt(e) {
  for (var t = -1, n = e == null ? 0 : e.length, r = {}; ++t < n; ) {
    var o = e[t];
    r[o[0]] = o[1];
  }
  return r;
}
function Ht(e) {
  return e == null;
}
function yr(e) {
  return e === void 0;
}
const hr = (e) => e === void 0, Vt = (e) => typeof e == "boolean", $e = (e) => typeof e == "number", bt = (e) => typeof Element > "u" ? !1 : e instanceof Element, br = (e) => qe(e) ? !Number.isNaN(Number(e)) : !1;
class _r extends Error {
  constructor(t) {
    super(t), this.name = "ElementPlusError";
  }
}
function Ue(e, t) {
  if (process.env.NODE_ENV !== "production") {
    const n = qe(e) ? new _r(`[${e}] ${t}`) : e;
    console.warn(n);
  }
}
const wr = "utils/dom/style";
function lo(e, t = "px") {
  if (!e)
    return "";
  if ($e(e) || br(e))
    return `${e}${t}`;
  if (qe(e))
    return e;
  Ue(wr, "binding value must be a string or number");
}
/*! Element Plus Icons Vue v2.3.1 */
var Er = /* @__PURE__ */ O({
  name: "ArrowRight",
  __name: "arrow-right",
  setup(e) {
    return (t, n) => (P(), F("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      G("path", {
        fill: "currentColor",
        d: "M340.864 149.312a30.592 30.592 0 0 0 0 42.752L652.736 512 340.864 831.872a30.592 30.592 0 0 0 0 42.752 29.12 29.12 0 0 0 41.728 0L714.24 534.336a32 32 0 0 0 0-44.672L382.592 149.376a29.12 29.12 0 0 0-41.728 0z"
      })
    ]));
  }
}), Cr = Er, Or = /* @__PURE__ */ O({
  name: "CaretRight",
  __name: "caret-right",
  setup(e) {
    return (t, n) => (P(), F("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      G("path", {
        fill: "currentColor",
        d: "M384 192v640l384-320.064z"
      })
    ]));
  }
}), Tr = Or;
const co = "__epPropKey", A = (e) => e, Ir = (e) => Kt(e) && !!e[co], Ut = (e, t) => {
  if (!Kt(e) || Ir(e))
    return e;
  const { values: n, required: r, default: o, type: s, validator: a } = e, c = {
    type: s,
    required: !!r,
    validator: n || a ? (u) => {
      let v = !1, m = [];
      if (n && (m = Array.from(n), On(e, "default") && m.push(o), v || (v = m.includes(u))), a && (v || (v = a(u))), !v && m.length > 0) {
        const y = [...new Set(m)].map((h) => JSON.stringify(h)).join(", ");
        Jo(`Invalid prop: validation failed${t ? ` for prop "${t}"` : ""}. Expected one of [${y}], got value ${JSON.stringify(u)}.`);
      }
      return v;
    } : void 0,
    [co]: !0
  };
  return On(e, "default") && (c.default = o), c;
}, W = (e) => Bt(Object.entries(e).map(([t, n]) => [
  t,
  Ut(n, t)
])), Pr = A([
  String,
  Object,
  Function
]), Ze = (e, t) => {
  if (e.install = (n) => {
    for (const r of [e, ...Object.values(t ?? {})])
      n.component(r.name, r);
  }, t)
    for (const [n, r] of Object.entries(t))
      e[n] = r;
  return e;
}, xr = (e, t) => (e.install = (n) => {
  n.directive(t, e);
}, e), $r = (e) => (e.install = ht, e), _t = {
  tab: "Tab",
  enter: "Enter",
  space: "Space",
  left: "ArrowLeft",
  up: "ArrowUp",
  right: "ArrowRight",
  down: "ArrowDown",
  esc: "Escape",
  delete: "Delete",
  backspace: "Backspace",
  numpadEnter: "NumpadEnter",
  pageUp: "PageUp",
  pageDown: "PageDown",
  home: "Home",
  end: "End"
}, uo = "update:modelValue", po = "change", Sr = (e) => e, At = "el", Ar = "is-", Ce = (e, t, n, r, o) => {
  let s = `${e}-${t}`;
  return n && (s += `-${n}`), r && (s += `__${r}`), o && (s += `--${o}`), s;
}, Nr = Symbol("namespaceContextKey"), Wt = (e) => {
  const t = e || (Ve() ? K(Nr, $(At)) : $(At));
  return b(() => i(t) || At);
}, ae = (e, t) => {
  const n = Wt(t);
  return {
    namespace: n,
    b: (d = "") => Ce(n.value, e, d, "", ""),
    e: (d) => d ? Ce(n.value, e, "", d, "") : "",
    m: (d) => d ? Ce(n.value, e, "", "", d) : "",
    be: (d, g) => d && g ? Ce(n.value, e, d, g, "") : "",
    em: (d, g) => d && g ? Ce(n.value, e, "", d, g) : "",
    bm: (d, g) => d && g ? Ce(n.value, e, d, "", g) : "",
    bem: (d, g, p) => d && g && p ? Ce(n.value, e, d, g, p) : "",
    is: (d, ...g) => {
      const p = g.length >= 1 ? g[0] : !0;
      return d && p ? `${Ar}${d}` : "";
    },
    cssVar: (d) => {
      const g = {};
      for (const p in d)
        d[p] && (g[`--${n.value}-${p}`] = d[p]);
      return g;
    },
    cssVarName: (d) => `--${n.value}-${d}`,
    cssVarBlock: (d) => {
      const g = {};
      for (const p in d)
        d[p] && (g[`--${n.value}-${e}-${p}`] = d[p]);
      return g;
    },
    cssVarBlockName: (d) => `--${n.value}-${e}-${d}`
  };
}, Rr = Ut({
  type: A(Boolean),
  default: null
}), Fr = Ut({
  type: A(Function)
}), fo = (e) => {
  const t = `update:${e}`, n = `onUpdate:${e}`, r = [t], o = {
    [e]: Rr,
    [n]: Fr
  };
  return {
    useModelToggle: ({
      indicator: a,
      toggleReason: l,
      shouldHideWhenRouteChanges: c,
      shouldProceed: u,
      onShow: v,
      onHide: m
    }) => {
      const y = Ve(), { emit: h } = y, f = y.props, d = b(() => ot(f[n])), g = b(() => f[e] === null), p = (C) => {
        a.value !== !0 && (a.value = !0, l && (l.value = C), ot(v) && v(C));
      }, _ = (C) => {
        a.value !== !1 && (a.value = !1, l && (l.value = C), ot(m) && m(C));
      }, T = (C) => {
        if (f.disabled === !0 || ot(u) && !u())
          return;
        const x = d.value && se;
        x && h(t, !0), (g.value || !x) && p(C);
      }, w = (C) => {
        if (f.disabled === !0 || !se)
          return;
        const x = d.value && se;
        x && h(t, !1), (g.value || !x) && _(C);
      }, I = (C) => {
        Vt(C) && (f.disabled && C ? d.value && h(t, !1) : a.value !== C && (C ? p() : _()));
      }, S = () => {
        a.value ? w() : T();
      };
      return B(() => f[e], I), c && y.appContext.config.globalProperties.$route !== void 0 && B(() => ({
        ...y.proxy.$route
      }), () => {
        c.value && a.value && w();
      }), be(() => {
        I(f[e]);
      }), {
        hide: w,
        show: T,
        toggle: S,
        hasUpdateHandler: d
      };
    },
    useModelToggleProps: o,
    useModelToggleEmits: r
  };
};
fo("modelValue");
var Q = "top", oe = "bottom", re = "right", Y = "left", zt = "auto", Ge = [Q, oe, re, Y], Se = "start", We = "end", kr = "clippingParents", vo = "viewport", Le = "popper", Br = "reference", In = Ge.reduce(function(e, t) {
  return e.concat([t + "-" + Se, t + "-" + We]);
}, []), Jt = [].concat(Ge, [zt]).reduce(function(e, t) {
  return e.concat([t, t + "-" + Se, t + "-" + We]);
}, []), Lr = "beforeRead", jr = "read", Dr = "afterRead", Mr = "beforeMain", Kr = "main", Hr = "afterMain", Vr = "beforeWrite", Ur = "write", Wr = "afterWrite", zr = [Lr, jr, Dr, Mr, Kr, Hr, Vr, Ur, Wr];
function ue(e) {
  return e ? (e.nodeName || "").toLowerCase() : null;
}
function ie(e) {
  if (e == null)
    return window;
  if (e.toString() !== "[object Window]") {
    var t = e.ownerDocument;
    return t && t.defaultView || window;
  }
  return e;
}
function Ae(e) {
  var t = ie(e).Element;
  return e instanceof t || e instanceof Element;
}
function ne(e) {
  var t = ie(e).HTMLElement;
  return e instanceof t || e instanceof HTMLElement;
}
function qt(e) {
  if (typeof ShadowRoot > "u")
    return !1;
  var t = ie(e).ShadowRoot;
  return e instanceof t || e instanceof ShadowRoot;
}
function Jr(e) {
  var t = e.state;
  Object.keys(t.elements).forEach(function(n) {
    var r = t.styles[n] || {}, o = t.attributes[n] || {}, s = t.elements[n];
    !ne(s) || !ue(s) || (Object.assign(s.style, r), Object.keys(o).forEach(function(a) {
      var l = o[a];
      l === !1 ? s.removeAttribute(a) : s.setAttribute(a, l === !0 ? "" : l);
    }));
  });
}
function qr(e) {
  var t = e.state, n = { popper: { position: t.options.strategy, left: "0", top: "0", margin: "0" }, arrow: { position: "absolute" }, reference: {} };
  return Object.assign(t.elements.popper.style, n.popper), t.styles = n, t.elements.arrow && Object.assign(t.elements.arrow.style, n.arrow), function() {
    Object.keys(t.elements).forEach(function(r) {
      var o = t.elements[r], s = t.attributes[r] || {}, a = Object.keys(t.styles.hasOwnProperty(r) ? t.styles[r] : n[r]), l = a.reduce(function(c, u) {
        return c[u] = "", c;
      }, {});
      !ne(o) || !ue(o) || (Object.assign(o.style, l), Object.keys(s).forEach(function(c) {
        o.removeAttribute(c);
      }));
    });
  };
}
var mo = { name: "applyStyles", enabled: !0, phase: "write", fn: Jr, effect: qr, requires: ["computeStyles"] };
function ce(e) {
  return e.split("-")[0];
}
var Te = Math.max, wt = Math.min, Ne = Math.round;
function Re(e, t) {
  t === void 0 && (t = !1);
  var n = e.getBoundingClientRect(), r = 1, o = 1;
  if (ne(e) && t) {
    var s = e.offsetHeight, a = e.offsetWidth;
    a > 0 && (r = Ne(n.width) / a || 1), s > 0 && (o = Ne(n.height) / s || 1);
  }
  return { width: n.width / r, height: n.height / o, top: n.top / o, right: n.right / r, bottom: n.bottom / o, left: n.left / r, x: n.left / r, y: n.top / o };
}
function Zt(e) {
  var t = Re(e), n = e.offsetWidth, r = e.offsetHeight;
  return Math.abs(t.width - n) <= 1 && (n = t.width), Math.abs(t.height - r) <= 1 && (r = t.height), { x: e.offsetLeft, y: e.offsetTop, width: n, height: r };
}
function go(e, t) {
  var n = t.getRootNode && t.getRootNode();
  if (e.contains(t))
    return !0;
  if (n && qt(n)) {
    var r = t;
    do {
      if (r && e.isSameNode(r))
        return !0;
      r = r.parentNode || r.host;
    } while (r);
  }
  return !1;
}
function ve(e) {
  return ie(e).getComputedStyle(e);
}
function Zr(e) {
  return ["table", "td", "th"].indexOf(ue(e)) >= 0;
}
function _e(e) {
  return ((Ae(e) ? e.ownerDocument : e.document) || window.document).documentElement;
}
function Tt(e) {
  return ue(e) === "html" ? e : e.assignedSlot || e.parentNode || (qt(e) ? e.host : null) || _e(e);
}
function Pn(e) {
  return !ne(e) || ve(e).position === "fixed" ? null : e.offsetParent;
}
function Gr(e) {
  var t = navigator.userAgent.toLowerCase().indexOf("firefox") !== -1, n = navigator.userAgent.indexOf("Trident") !== -1;
  if (n && ne(e)) {
    var r = ve(e);
    if (r.position === "fixed")
      return null;
  }
  var o = Tt(e);
  for (qt(o) && (o = o.host); ne(o) && ["html", "body"].indexOf(ue(o)) < 0; ) {
    var s = ve(o);
    if (s.transform !== "none" || s.perspective !== "none" || s.contain === "paint" || ["transform", "perspective"].indexOf(s.willChange) !== -1 || t && s.willChange === "filter" || t && s.filter && s.filter !== "none")
      return o;
    o = o.parentNode;
  }
  return null;
}
function Qe(e) {
  for (var t = ie(e), n = Pn(e); n && Zr(n) && ve(n).position === "static"; )
    n = Pn(n);
  return n && (ue(n) === "html" || ue(n) === "body" && ve(n).position === "static") ? t : n || Gr(e) || t;
}
function Gt(e) {
  return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y";
}
function Me(e, t, n) {
  return Te(e, wt(t, n));
}
function Qr(e, t, n) {
  var r = Me(e, t, n);
  return r > n ? n : r;
}
function yo() {
  return { top: 0, right: 0, bottom: 0, left: 0 };
}
function ho(e) {
  return Object.assign({}, yo(), e);
}
function bo(e, t) {
  return t.reduce(function(n, r) {
    return n[r] = e, n;
  }, {});
}
var Yr = function(e, t) {
  return e = typeof e == "function" ? e(Object.assign({}, t.rects, { placement: t.placement })) : e, ho(typeof e != "number" ? e : bo(e, Ge));
};
function Xr(e) {
  var t, n = e.state, r = e.name, o = e.options, s = n.elements.arrow, a = n.modifiersData.popperOffsets, l = ce(n.placement), c = Gt(l), u = [Y, re].indexOf(l) >= 0, v = u ? "height" : "width";
  if (!(!s || !a)) {
    var m = Yr(o.padding, n), y = Zt(s), h = c === "y" ? Q : Y, f = c === "y" ? oe : re, d = n.rects.reference[v] + n.rects.reference[c] - a[c] - n.rects.popper[v], g = a[c] - n.rects.reference[c], p = Qe(s), _ = p ? c === "y" ? p.clientHeight || 0 : p.clientWidth || 0 : 0, T = d / 2 - g / 2, w = m[h], I = _ - y[v] - m[f], S = _ / 2 - y[v] / 2 + T, C = Me(w, S, I), x = c;
    n.modifiersData[r] = (t = {}, t[x] = C, t.centerOffset = C - S, t);
  }
}
function es(e) {
  var t = e.state, n = e.options, r = n.element, o = r === void 0 ? "[data-popper-arrow]" : r;
  o != null && (typeof o == "string" && (o = t.elements.popper.querySelector(o), !o) || !go(t.elements.popper, o) || (t.elements.arrow = o));
}
var ts = { name: "arrow", enabled: !0, phase: "main", fn: Xr, effect: es, requires: ["popperOffsets"], requiresIfExists: ["preventOverflow"] };
function Fe(e) {
  return e.split("-")[1];
}
var ns = { top: "auto", right: "auto", bottom: "auto", left: "auto" };
function os(e) {
  var t = e.x, n = e.y, r = window, o = r.devicePixelRatio || 1;
  return { x: Ne(t * o) / o || 0, y: Ne(n * o) / o || 0 };
}
function xn(e) {
  var t, n = e.popper, r = e.popperRect, o = e.placement, s = e.variation, a = e.offsets, l = e.position, c = e.gpuAcceleration, u = e.adaptive, v = e.roundOffsets, m = e.isFixed, y = a.x, h = y === void 0 ? 0 : y, f = a.y, d = f === void 0 ? 0 : f, g = typeof v == "function" ? v({ x: h, y: d }) : { x: h, y: d };
  h = g.x, d = g.y;
  var p = a.hasOwnProperty("x"), _ = a.hasOwnProperty("y"), T = Y, w = Q, I = window;
  if (u) {
    var S = Qe(n), C = "clientHeight", x = "clientWidth";
    if (S === ie(n) && (S = _e(n), ve(S).position !== "static" && l === "absolute" && (C = "scrollHeight", x = "scrollWidth")), S = S, o === Q || (o === Y || o === re) && s === We) {
      w = oe;
      var L = m && S === I && I.visualViewport ? I.visualViewport.height : S[C];
      d -= L - r.height, d *= c ? 1 : -1;
    }
    if (o === Y || (o === Q || o === oe) && s === We) {
      T = re;
      var N = m && S === I && I.visualViewport ? I.visualViewport.width : S[x];
      h -= N - r.width, h *= c ? 1 : -1;
    }
  }
  var j = Object.assign({ position: l }, u && ns), k = v === !0 ? os({ x: h, y: d }) : { x: h, y: d };
  if (h = k.x, d = k.y, c) {
    var D;
    return Object.assign({}, j, (D = {}, D[w] = _ ? "0" : "", D[T] = p ? "0" : "", D.transform = (I.devicePixelRatio || 1) <= 1 ? "translate(" + h + "px, " + d + "px)" : "translate3d(" + h + "px, " + d + "px, 0)", D));
  }
  return Object.assign({}, j, (t = {}, t[w] = _ ? d + "px" : "", t[T] = p ? h + "px" : "", t.transform = "", t));
}
function rs(e) {
  var t = e.state, n = e.options, r = n.gpuAcceleration, o = r === void 0 ? !0 : r, s = n.adaptive, a = s === void 0 ? !0 : s, l = n.roundOffsets, c = l === void 0 ? !0 : l, u = { placement: ce(t.placement), variation: Fe(t.placement), popper: t.elements.popper, popperRect: t.rects.popper, gpuAcceleration: o, isFixed: t.options.strategy === "fixed" };
  t.modifiersData.popperOffsets != null && (t.styles.popper = Object.assign({}, t.styles.popper, xn(Object.assign({}, u, { offsets: t.modifiersData.popperOffsets, position: t.options.strategy, adaptive: a, roundOffsets: c })))), t.modifiersData.arrow != null && (t.styles.arrow = Object.assign({}, t.styles.arrow, xn(Object.assign({}, u, { offsets: t.modifiersData.arrow, position: "absolute", adaptive: !1, roundOffsets: c })))), t.attributes.popper = Object.assign({}, t.attributes.popper, { "data-popper-placement": t.placement });
}
var _o = { name: "computeStyles", enabled: !0, phase: "beforeWrite", fn: rs, data: {} }, rt = { passive: !0 };
function ss(e) {
  var t = e.state, n = e.instance, r = e.options, o = r.scroll, s = o === void 0 ? !0 : o, a = r.resize, l = a === void 0 ? !0 : a, c = ie(t.elements.popper), u = [].concat(t.scrollParents.reference, t.scrollParents.popper);
  return s && u.forEach(function(v) {
    v.addEventListener("scroll", n.update, rt);
  }), l && c.addEventListener("resize", n.update, rt), function() {
    s && u.forEach(function(v) {
      v.removeEventListener("scroll", n.update, rt);
    }), l && c.removeEventListener("resize", n.update, rt);
  };
}
var wo = { name: "eventListeners", enabled: !0, phase: "write", fn: function() {
}, effect: ss, data: {} }, as = { left: "right", right: "left", bottom: "top", top: "bottom" };
function ct(e) {
  return e.replace(/left|right|bottom|top/g, function(t) {
    return as[t];
  });
}
var is = { start: "end", end: "start" };
function $n(e) {
  return e.replace(/start|end/g, function(t) {
    return is[t];
  });
}
function Qt(e) {
  var t = ie(e), n = t.pageXOffset, r = t.pageYOffset;
  return { scrollLeft: n, scrollTop: r };
}
function Yt(e) {
  return Re(_e(e)).left + Qt(e).scrollLeft;
}
function ls(e) {
  var t = ie(e), n = _e(e), r = t.visualViewport, o = n.clientWidth, s = n.clientHeight, a = 0, l = 0;
  return r && (o = r.width, s = r.height, /^((?!chrome|android).)*safari/i.test(navigator.userAgent) || (a = r.offsetLeft, l = r.offsetTop)), { width: o, height: s, x: a + Yt(e), y: l };
}
function cs(e) {
  var t, n = _e(e), r = Qt(e), o = (t = e.ownerDocument) == null ? void 0 : t.body, s = Te(n.scrollWidth, n.clientWidth, o ? o.scrollWidth : 0, o ? o.clientWidth : 0), a = Te(n.scrollHeight, n.clientHeight, o ? o.scrollHeight : 0, o ? o.clientHeight : 0), l = -r.scrollLeft + Yt(e), c = -r.scrollTop;
  return ve(o || n).direction === "rtl" && (l += Te(n.clientWidth, o ? o.clientWidth : 0) - s), { width: s, height: a, x: l, y: c };
}
function Xt(e) {
  var t = ve(e), n = t.overflow, r = t.overflowX, o = t.overflowY;
  return /auto|scroll|overlay|hidden/.test(n + o + r);
}
function Eo(e) {
  return ["html", "body", "#document"].indexOf(ue(e)) >= 0 ? e.ownerDocument.body : ne(e) && Xt(e) ? e : Eo(Tt(e));
}
function Ke(e, t) {
  var n;
  t === void 0 && (t = []);
  var r = Eo(e), o = r === ((n = e.ownerDocument) == null ? void 0 : n.body), s = ie(r), a = o ? [s].concat(s.visualViewport || [], Xt(r) ? r : []) : r, l = t.concat(a);
  return o ? l : l.concat(Ke(Tt(a)));
}
function Lt(e) {
  return Object.assign({}, e, { left: e.x, top: e.y, right: e.x + e.width, bottom: e.y + e.height });
}
function us(e) {
  var t = Re(e);
  return t.top = t.top + e.clientTop, t.left = t.left + e.clientLeft, t.bottom = t.top + e.clientHeight, t.right = t.left + e.clientWidth, t.width = e.clientWidth, t.height = e.clientHeight, t.x = t.left, t.y = t.top, t;
}
function Sn(e, t) {
  return t === vo ? Lt(ls(e)) : Ae(t) ? us(t) : Lt(cs(_e(e)));
}
function ds(e) {
  var t = Ke(Tt(e)), n = ["absolute", "fixed"].indexOf(ve(e).position) >= 0, r = n && ne(e) ? Qe(e) : e;
  return Ae(r) ? t.filter(function(o) {
    return Ae(o) && go(o, r) && ue(o) !== "body";
  }) : [];
}
function ps(e, t, n) {
  var r = t === "clippingParents" ? ds(e) : [].concat(t), o = [].concat(r, [n]), s = o[0], a = o.reduce(function(l, c) {
    var u = Sn(e, c);
    return l.top = Te(u.top, l.top), l.right = wt(u.right, l.right), l.bottom = wt(u.bottom, l.bottom), l.left = Te(u.left, l.left), l;
  }, Sn(e, s));
  return a.width = a.right - a.left, a.height = a.bottom - a.top, a.x = a.left, a.y = a.top, a;
}
function Co(e) {
  var t = e.reference, n = e.element, r = e.placement, o = r ? ce(r) : null, s = r ? Fe(r) : null, a = t.x + t.width / 2 - n.width / 2, l = t.y + t.height / 2 - n.height / 2, c;
  switch (o) {
    case Q:
      c = { x: a, y: t.y - n.height };
      break;
    case oe:
      c = { x: a, y: t.y + t.height };
      break;
    case re:
      c = { x: t.x + t.width, y: l };
      break;
    case Y:
      c = { x: t.x - n.width, y: l };
      break;
    default:
      c = { x: t.x, y: t.y };
  }
  var u = o ? Gt(o) : null;
  if (u != null) {
    var v = u === "y" ? "height" : "width";
    switch (s) {
      case Se:
        c[u] = c[u] - (t[v] / 2 - n[v] / 2);
        break;
      case We:
        c[u] = c[u] + (t[v] / 2 - n[v] / 2);
        break;
    }
  }
  return c;
}
function ze(e, t) {
  t === void 0 && (t = {});
  var n = t, r = n.placement, o = r === void 0 ? e.placement : r, s = n.boundary, a = s === void 0 ? kr : s, l = n.rootBoundary, c = l === void 0 ? vo : l, u = n.elementContext, v = u === void 0 ? Le : u, m = n.altBoundary, y = m === void 0 ? !1 : m, h = n.padding, f = h === void 0 ? 0 : h, d = ho(typeof f != "number" ? f : bo(f, Ge)), g = v === Le ? Br : Le, p = e.rects.popper, _ = e.elements[y ? g : v], T = ps(Ae(_) ? _ : _.contextElement || _e(e.elements.popper), a, c), w = Re(e.elements.reference), I = Co({ reference: w, element: p, strategy: "absolute", placement: o }), S = Lt(Object.assign({}, p, I)), C = v === Le ? S : w, x = { top: T.top - C.top + d.top, bottom: C.bottom - T.bottom + d.bottom, left: T.left - C.left + d.left, right: C.right - T.right + d.right }, L = e.modifiersData.offset;
  if (v === Le && L) {
    var N = L[o];
    Object.keys(x).forEach(function(j) {
      var k = [re, oe].indexOf(j) >= 0 ? 1 : -1, D = [Q, oe].indexOf(j) >= 0 ? "y" : "x";
      x[j] += N[D] * k;
    });
  }
  return x;
}
function fs(e, t) {
  t === void 0 && (t = {});
  var n = t, r = n.placement, o = n.boundary, s = n.rootBoundary, a = n.padding, l = n.flipVariations, c = n.allowedAutoPlacements, u = c === void 0 ? Jt : c, v = Fe(r), m = v ? l ? In : In.filter(function(f) {
    return Fe(f) === v;
  }) : Ge, y = m.filter(function(f) {
    return u.indexOf(f) >= 0;
  });
  y.length === 0 && (y = m);
  var h = y.reduce(function(f, d) {
    return f[d] = ze(e, { placement: d, boundary: o, rootBoundary: s, padding: a })[ce(d)], f;
  }, {});
  return Object.keys(h).sort(function(f, d) {
    return h[f] - h[d];
  });
}
function vs(e) {
  if (ce(e) === zt)
    return [];
  var t = ct(e);
  return [$n(e), t, $n(t)];
}
function ms(e) {
  var t = e.state, n = e.options, r = e.name;
  if (!t.modifiersData[r]._skip) {
    for (var o = n.mainAxis, s = o === void 0 ? !0 : o, a = n.altAxis, l = a === void 0 ? !0 : a, c = n.fallbackPlacements, u = n.padding, v = n.boundary, m = n.rootBoundary, y = n.altBoundary, h = n.flipVariations, f = h === void 0 ? !0 : h, d = n.allowedAutoPlacements, g = t.options.placement, p = ce(g), _ = p === g, T = c || (_ || !f ? [ct(g)] : vs(g)), w = [g].concat(T).reduce(function(we, de) {
      return we.concat(ce(de) === zt ? fs(t, { placement: de, boundary: v, rootBoundary: m, padding: u, flipVariations: f, allowedAutoPlacements: d }) : de);
    }, []), I = t.rects.reference, S = t.rects.popper, C = /* @__PURE__ */ new Map(), x = !0, L = w[0], N = 0; N < w.length; N++) {
      var j = w[N], k = ce(j), D = Fe(j) === Se, q = [Q, oe].indexOf(k) >= 0, V = q ? "width" : "height", M = ze(t, { placement: j, boundary: v, rootBoundary: m, altBoundary: y, padding: u }), E = q ? D ? re : Y : D ? oe : Q;
      I[V] > S[V] && (E = ct(E));
      var Z = ct(E), le = [];
      if (s && le.push(M[k] <= 0), l && le.push(M[E] <= 0, M[Z] <= 0), le.every(function(we) {
        return we;
      })) {
        L = j, x = !1;
        break;
      }
      C.set(j, le);
    }
    if (x)
      for (var Xe = f ? 3 : 1, Pt = function(we) {
        var de = w.find(function(tt) {
          var Be = C.get(tt);
          if (Be)
            return Be.slice(0, we).every(function(Ie) {
              return Ie;
            });
        });
        if (de)
          return L = de, "break";
      }, ke = Xe; ke > 0; ke--) {
        var et = Pt(ke);
        if (et === "break")
          break;
      }
    t.placement !== L && (t.modifiersData[r]._skip = !0, t.placement = L, t.reset = !0);
  }
}
var gs = { name: "flip", enabled: !0, phase: "main", fn: ms, requiresIfExists: ["offset"], data: { _skip: !1 } };
function An(e, t, n) {
  return n === void 0 && (n = { x: 0, y: 0 }), { top: e.top - t.height - n.y, right: e.right - t.width + n.x, bottom: e.bottom - t.height + n.y, left: e.left - t.width - n.x };
}
function Nn(e) {
  return [Q, re, oe, Y].some(function(t) {
    return e[t] >= 0;
  });
}
function ys(e) {
  var t = e.state, n = e.name, r = t.rects.reference, o = t.rects.popper, s = t.modifiersData.preventOverflow, a = ze(t, { elementContext: "reference" }), l = ze(t, { altBoundary: !0 }), c = An(a, r), u = An(l, o, s), v = Nn(c), m = Nn(u);
  t.modifiersData[n] = { referenceClippingOffsets: c, popperEscapeOffsets: u, isReferenceHidden: v, hasPopperEscaped: m }, t.attributes.popper = Object.assign({}, t.attributes.popper, { "data-popper-reference-hidden": v, "data-popper-escaped": m });
}
var hs = { name: "hide", enabled: !0, phase: "main", requiresIfExists: ["preventOverflow"], fn: ys };
function bs(e, t, n) {
  var r = ce(e), o = [Y, Q].indexOf(r) >= 0 ? -1 : 1, s = typeof n == "function" ? n(Object.assign({}, t, { placement: e })) : n, a = s[0], l = s[1];
  return a = a || 0, l = (l || 0) * o, [Y, re].indexOf(r) >= 0 ? { x: l, y: a } : { x: a, y: l };
}
function _s(e) {
  var t = e.state, n = e.options, r = e.name, o = n.offset, s = o === void 0 ? [0, 0] : o, a = Jt.reduce(function(v, m) {
    return v[m] = bs(m, t.rects, s), v;
  }, {}), l = a[t.placement], c = l.x, u = l.y;
  t.modifiersData.popperOffsets != null && (t.modifiersData.popperOffsets.x += c, t.modifiersData.popperOffsets.y += u), t.modifiersData[r] = a;
}
var ws = { name: "offset", enabled: !0, phase: "main", requires: ["popperOffsets"], fn: _s };
function Es(e) {
  var t = e.state, n = e.name;
  t.modifiersData[n] = Co({ reference: t.rects.reference, element: t.rects.popper, strategy: "absolute", placement: t.placement });
}
var Oo = { name: "popperOffsets", enabled: !0, phase: "read", fn: Es, data: {} };
function Cs(e) {
  return e === "x" ? "y" : "x";
}
function Os(e) {
  var t = e.state, n = e.options, r = e.name, o = n.mainAxis, s = o === void 0 ? !0 : o, a = n.altAxis, l = a === void 0 ? !1 : a, c = n.boundary, u = n.rootBoundary, v = n.altBoundary, m = n.padding, y = n.tether, h = y === void 0 ? !0 : y, f = n.tetherOffset, d = f === void 0 ? 0 : f, g = ze(t, { boundary: c, rootBoundary: u, padding: m, altBoundary: v }), p = ce(t.placement), _ = Fe(t.placement), T = !_, w = Gt(p), I = Cs(w), S = t.modifiersData.popperOffsets, C = t.rects.reference, x = t.rects.popper, L = typeof d == "function" ? d(Object.assign({}, t.rects, { placement: t.placement })) : d, N = typeof L == "number" ? { mainAxis: L, altAxis: L } : Object.assign({ mainAxis: 0, altAxis: 0 }, L), j = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null, k = { x: 0, y: 0 };
  if (S) {
    if (s) {
      var D, q = w === "y" ? Q : Y, V = w === "y" ? oe : re, M = w === "y" ? "height" : "width", E = S[w], Z = E + g[q], le = E - g[V], Xe = h ? -x[M] / 2 : 0, Pt = _ === Se ? C[M] : x[M], ke = _ === Se ? -x[M] : -C[M], et = t.elements.arrow, we = h && et ? Zt(et) : { width: 0, height: 0 }, de = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : yo(), tt = de[q], Be = de[V], Ie = Me(0, C[M], we[M]), jo = T ? C[M] / 2 - Xe - Ie - tt - N.mainAxis : Pt - Ie - tt - N.mainAxis, Do = T ? -C[M] / 2 + Xe + Ie + Be + N.mainAxis : ke + Ie + Be + N.mainAxis, xt = t.elements.arrow && Qe(t.elements.arrow), Mo = xt ? w === "y" ? xt.clientTop || 0 : xt.clientLeft || 0 : 0, an = (D = j == null ? void 0 : j[w]) != null ? D : 0, Ko = E + jo - an - Mo, Ho = E + Do - an, ln = Me(h ? wt(Z, Ko) : Z, E, h ? Te(le, Ho) : le);
      S[w] = ln, k[w] = ln - E;
    }
    if (l) {
      var cn, Vo = w === "x" ? Q : Y, Uo = w === "x" ? oe : re, Ee = S[I], nt = I === "y" ? "height" : "width", un = Ee + g[Vo], dn = Ee - g[Uo], $t = [Q, Y].indexOf(p) !== -1, pn = (cn = j == null ? void 0 : j[I]) != null ? cn : 0, fn = $t ? un : Ee - C[nt] - x[nt] - pn + N.altAxis, vn = $t ? Ee + C[nt] + x[nt] - pn - N.altAxis : dn, mn = h && $t ? Qr(fn, Ee, vn) : Me(h ? fn : un, Ee, h ? vn : dn);
      S[I] = mn, k[I] = mn - Ee;
    }
    t.modifiersData[r] = k;
  }
}
var Ts = { name: "preventOverflow", enabled: !0, phase: "main", fn: Os, requiresIfExists: ["offset"] };
function Is(e) {
  return { scrollLeft: e.scrollLeft, scrollTop: e.scrollTop };
}
function Ps(e) {
  return e === ie(e) || !ne(e) ? Qt(e) : Is(e);
}
function xs(e) {
  var t = e.getBoundingClientRect(), n = Ne(t.width) / e.offsetWidth || 1, r = Ne(t.height) / e.offsetHeight || 1;
  return n !== 1 || r !== 1;
}
function $s(e, t, n) {
  n === void 0 && (n = !1);
  var r = ne(t), o = ne(t) && xs(t), s = _e(t), a = Re(e, o), l = { scrollLeft: 0, scrollTop: 0 }, c = { x: 0, y: 0 };
  return (r || !r && !n) && ((ue(t) !== "body" || Xt(s)) && (l = Ps(t)), ne(t) ? (c = Re(t, !0), c.x += t.clientLeft, c.y += t.clientTop) : s && (c.x = Yt(s))), { x: a.left + l.scrollLeft - c.x, y: a.top + l.scrollTop - c.y, width: a.width, height: a.height };
}
function Ss(e) {
  var t = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Set(), r = [];
  e.forEach(function(s) {
    t.set(s.name, s);
  });
  function o(s) {
    n.add(s.name);
    var a = [].concat(s.requires || [], s.requiresIfExists || []);
    a.forEach(function(l) {
      if (!n.has(l)) {
        var c = t.get(l);
        c && o(c);
      }
    }), r.push(s);
  }
  return e.forEach(function(s) {
    n.has(s.name) || o(s);
  }), r;
}
function As(e) {
  var t = Ss(e);
  return zr.reduce(function(n, r) {
    return n.concat(t.filter(function(o) {
      return o.phase === r;
    }));
  }, []);
}
function Ns(e) {
  var t;
  return function() {
    return t || (t = new Promise(function(n) {
      Promise.resolve().then(function() {
        t = void 0, n(e());
      });
    })), t;
  };
}
function Rs(e) {
  var t = e.reduce(function(n, r) {
    var o = n[r.name];
    return n[r.name] = o ? Object.assign({}, o, r, { options: Object.assign({}, o.options, r.options), data: Object.assign({}, o.data, r.data) }) : r, n;
  }, {});
  return Object.keys(t).map(function(n) {
    return t[n];
  });
}
var Rn = { placement: "bottom", modifiers: [], strategy: "absolute" };
function Fn() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
    t[n] = arguments[n];
  return !t.some(function(r) {
    return !(r && typeof r.getBoundingClientRect == "function");
  });
}
function en(e) {
  e === void 0 && (e = {});
  var t = e, n = t.defaultModifiers, r = n === void 0 ? [] : n, o = t.defaultOptions, s = o === void 0 ? Rn : o;
  return function(a, l, c) {
    c === void 0 && (c = s);
    var u = { placement: "bottom", orderedModifiers: [], options: Object.assign({}, Rn, s), modifiersData: {}, elements: { reference: a, popper: l }, attributes: {}, styles: {} }, v = [], m = !1, y = { state: u, setOptions: function(d) {
      var g = typeof d == "function" ? d(u.options) : d;
      f(), u.options = Object.assign({}, s, u.options, g), u.scrollParents = { reference: Ae(a) ? Ke(a) : a.contextElement ? Ke(a.contextElement) : [], popper: Ke(l) };
      var p = As(Rs([].concat(r, u.options.modifiers)));
      return u.orderedModifiers = p.filter(function(_) {
        return _.enabled;
      }), h(), y.update();
    }, forceUpdate: function() {
      if (!m) {
        var d = u.elements, g = d.reference, p = d.popper;
        if (Fn(g, p)) {
          u.rects = { reference: $s(g, Qe(p), u.options.strategy === "fixed"), popper: Zt(p) }, u.reset = !1, u.placement = u.options.placement, u.orderedModifiers.forEach(function(x) {
            return u.modifiersData[x.name] = Object.assign({}, x.data);
          });
          for (var _ = 0; _ < u.orderedModifiers.length; _++) {
            if (u.reset === !0) {
              u.reset = !1, _ = -1;
              continue;
            }
            var T = u.orderedModifiers[_], w = T.fn, I = T.options, S = I === void 0 ? {} : I, C = T.name;
            typeof w == "function" && (u = w({ state: u, options: S, name: C, instance: y }) || u);
          }
        }
      }
    }, update: Ns(function() {
      return new Promise(function(d) {
        y.forceUpdate(), d(u);
      });
    }), destroy: function() {
      f(), m = !0;
    } };
    if (!Fn(a, l))
      return y;
    y.setOptions(c).then(function(d) {
      !m && c.onFirstUpdate && c.onFirstUpdate(d);
    });
    function h() {
      u.orderedModifiers.forEach(function(d) {
        var g = d.name, p = d.options, _ = p === void 0 ? {} : p, T = d.effect;
        if (typeof T == "function") {
          var w = T({ state: u, name: g, instance: y, options: _ }), I = function() {
          };
          v.push(w || I);
        }
      });
    }
    function f() {
      v.forEach(function(d) {
        return d();
      }), v = [];
    }
    return y;
  };
}
en();
var Fs = [wo, Oo, _o, mo];
en({ defaultModifiers: Fs });
var ks = [wo, Oo, _o, mo, ws, gs, Ts, ts, hs], Bs = en({ defaultModifiers: ks });
const Ls = (e, t, n = {}) => {
  const r = {
    name: "updateState",
    enabled: !0,
    phase: "write",
    fn: ({ state: c }) => {
      const u = js(c);
      Object.assign(a.value, u);
    },
    requires: ["computeStyles"]
  }, o = b(() => {
    const { onFirstUpdate: c, placement: u, strategy: v, modifiers: m } = i(n);
    return {
      onFirstUpdate: c,
      placement: u || "bottom",
      strategy: v || "absolute",
      modifiers: [
        ...m || [],
        r,
        { name: "applyStyles", enabled: !1 }
      ]
    };
  }), s = qo(), a = $({
    styles: {
      popper: {
        position: i(o).strategy,
        left: "0",
        top: "0"
      },
      arrow: {
        position: "absolute"
      }
    },
    attributes: {}
  }), l = () => {
    s.value && (s.value.destroy(), s.value = void 0);
  };
  return B(o, (c) => {
    const u = i(s);
    u && u.setOptions(c);
  }, {
    deep: !0
  }), B([e, t], ([c, u]) => {
    l(), !(!c || !u) && (s.value = Bs(c, u, i(o)));
  }), me(() => {
    l();
  }), {
    state: b(() => {
      var c;
      return { ...((c = i(s)) == null ? void 0 : c.state) || {} };
    }),
    styles: b(() => i(a).styles),
    attributes: b(() => i(a).attributes),
    update: () => {
      var c;
      return (c = i(s)) == null ? void 0 : c.update();
    },
    forceUpdate: () => {
      var c;
      return (c = i(s)) == null ? void 0 : c.forceUpdate();
    },
    instanceRef: b(() => i(s))
  };
};
function js(e) {
  const t = Object.keys(e.elements), n = Bt(t.map((o) => [o, e.styles[o] || {}])), r = Bt(t.map((o) => [o, e.attributes[o]]));
  return {
    styles: n,
    attributes: r
  };
}
function kn() {
  let e;
  const t = (r, o) => {
    n(), e = window.setTimeout(r, o);
  }, n = () => window.clearTimeout(e);
  return so(() => n()), {
    registerTimeout: t,
    cancelTimeout: n
  };
}
const jt = {
  prefix: Math.floor(Math.random() * 1e4),
  current: 0
}, Ds = Symbol("elIdInjection"), tn = () => Ve() ? K(Ds, jt) : jt, Ms = (e) => {
  const t = tn();
  !se && t === jt && Ue("IdInjection", `Looks like you are using server rendering, you must provide a id provider to ensure the hydration process to be succeed
usage: app.provide(ID_INJECTION_KEY, {
  prefix: number,
  current: number,
})`);
  const n = Wt();
  return b(() => i(e) || `${n.value}-id-${t.prefix}-${t.current++}`);
};
let xe = [];
const Bn = (e) => {
  const t = e;
  t.key === _t.esc && xe.forEach((n) => n(t));
}, Ks = (e) => {
  be(() => {
    xe.length === 0 && document.addEventListener("keydown", Bn), se && xe.push(e);
  }), me(() => {
    xe = xe.filter((t) => t !== e), xe.length === 0 && se && document.removeEventListener("keydown", Bn);
  });
};
let Ln;
const To = () => {
  const e = Wt(), t = tn(), n = b(() => `${e.value}-popper-container-${t.prefix}`), r = b(() => `#${n.value}`);
  return {
    id: n,
    selector: r
  };
}, Hs = (e) => {
  const t = document.createElement("div");
  return t.id = e, document.body.appendChild(t), t;
}, Vs = () => {
  const { id: e, selector: t } = To();
  return Zo(() => {
    se && (process.env.NODE_ENV === "test" || !Ln && !document.body.querySelector(t.value)) && (Ln = Hs(e.value));
  }), {
    id: e,
    selector: t
  };
}, Us = W({
  showAfter: {
    type: Number,
    default: 0
  },
  hideAfter: {
    type: Number,
    default: 200
  },
  autoClose: {
    type: Number,
    default: 0
  }
}), Ws = ({
  showAfter: e,
  hideAfter: t,
  autoClose: n,
  open: r,
  close: o
}) => {
  const { registerTimeout: s } = kn(), {
    registerTimeout: a,
    cancelTimeout: l
  } = kn();
  return {
    onOpen: (v) => {
      s(() => {
        r(v);
        const m = i(n);
        $e(m) && m > 0 && a(() => {
          o(v);
        }, m);
      }, i(e));
    },
    onClose: (v) => {
      l(), s(() => {
        o(v);
      }, i(t));
    }
  };
}, Io = Symbol("elForwardRef"), zs = (e) => {
  U(Io, {
    setForwardRef: (n) => {
      e.value = n;
    }
  });
}, Js = (e) => ({
  mounted(t) {
    e(t);
  },
  updated(t) {
    e(t);
  },
  unmounted() {
    e(null);
  }
}), jn = {
  current: 0
}, Dn = $(0), qs = 2e3, Mn = Symbol("elZIndexContextKey"), Zs = Symbol("zIndexContextKey"), Gs = (e) => {
  const t = Ve() ? K(Mn, jn) : jn, n = e || (Ve() ? K(Zs, void 0) : void 0), r = b(() => {
    const a = i(n);
    return $e(a) ? a : qs;
  }), o = b(() => r.value + Dn.value), s = () => (t.current++, Dn.value = t.current, o.value);
  return !se && !K(Mn) && Ue("ZIndexInjection", `Looks like you are using server rendering, you must provide a z-index provider to ensure the hydration process to be succeed
usage: app.provide(ZINDEX_INJECTION_KEY, { current: 0 })`), {
    initialZIndex: r,
    currentZIndex: o,
    nextZIndex: s
  };
};
var J = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [r, o] of t)
    n[r] = o;
  return n;
};
const Qs = W({
  size: {
    type: A([Number, String])
  },
  color: {
    type: String
  }
}), Ys = O({
  name: "ElIcon",
  inheritAttrs: !1
}), Xs = /* @__PURE__ */ O({
  ...Ys,
  props: Qs,
  setup(e) {
    const t = e, n = ae("icon"), r = b(() => {
      const { size: o, color: s } = t;
      return !o && !s ? {} : {
        fontSize: hr(o) ? void 0 : lo(o),
        "--color": s
      };
    });
    return (o, s) => (P(), F("i", ge({
      class: i(n).b(),
      style: i(r)
    }, o.$attrs), [
      R(o.$slots, "default")
    ], 16));
  }
});
var ea = /* @__PURE__ */ J(Xs, [["__file", "icon.vue"]]);
const Po = Ze(ea), Kn = Symbol("formItemContextKey"), nn = Symbol("popper"), xo = Symbol("popperContent"), ta = [
  "dialog",
  "grid",
  "group",
  "listbox",
  "menu",
  "navigation",
  "tooltip",
  "tree"
], $o = W({
  role: {
    type: String,
    values: ta,
    default: "tooltip"
  }
}), na = O({
  name: "ElPopper",
  inheritAttrs: !1
}), oa = /* @__PURE__ */ O({
  ...na,
  props: $o,
  setup(e, { expose: t }) {
    const n = e, r = $(), o = $(), s = $(), a = $(), l = b(() => n.role), c = {
      triggerRef: r,
      popperInstanceRef: o,
      contentRef: s,
      referenceRef: a,
      role: l
    };
    return t(c), U(nn, c), (u, v) => R(u.$slots, "default");
  }
});
var ra = /* @__PURE__ */ J(oa, [["__file", "popper.vue"]]);
const So = W({
  arrowOffset: {
    type: Number,
    default: 5
  }
}), sa = O({
  name: "ElPopperArrow",
  inheritAttrs: !1
}), aa = /* @__PURE__ */ O({
  ...sa,
  props: So,
  setup(e, { expose: t }) {
    const n = e, r = ae("popper"), { arrowOffset: o, arrowRef: s, arrowStyle: a } = K(xo, void 0);
    return B(() => n.arrowOffset, (l) => {
      o.value = l;
    }), me(() => {
      s.value = void 0;
    }), t({
      arrowRef: s
    }), (l, c) => (P(), F("span", {
      ref_key: "arrowRef",
      ref: s,
      class: z(i(r).e("arrow")),
      style: Et(i(a)),
      "data-popper-arrow": ""
    }, null, 6));
  }
});
var ia = /* @__PURE__ */ J(aa, [["__file", "arrow.vue"]]);
const Nt = "ElOnlyChild", la = O({
  name: Nt,
  setup(e, {
    slots: t,
    attrs: n
  }) {
    var r;
    const o = K(Io), s = Js((r = o == null ? void 0 : o.setForwardRef) != null ? r : ht);
    return () => {
      var a;
      const l = (a = t.default) == null ? void 0 : a.call(t, n);
      if (!l)
        return null;
      if (l.length > 1)
        return Ue(Nt, "requires exact only one valid child."), null;
      const c = Ao(l);
      return c ? Ct(Go(c, n), [[s]]) : (Ue(Nt, "no valid child node found"), null);
    };
  }
});
function Ao(e) {
  if (!e)
    return null;
  const t = e;
  for (const n of t) {
    if (Kt(n))
      switch (n.type) {
        case Yo:
          continue;
        case Qo:
        case "svg":
          return Hn(n);
        case lt:
          return Ao(n.children);
        default:
          return n;
      }
    return Hn(n);
  }
  return null;
}
function Hn(e) {
  const t = ae("only-child");
  return te("span", {
    class: t.e("content")
  }, [e]);
}
const No = W({
  virtualRef: {
    type: A(Object)
  },
  virtualTriggering: Boolean,
  onMouseenter: {
    type: A(Function)
  },
  onMouseleave: {
    type: A(Function)
  },
  onClick: {
    type: A(Function)
  },
  onKeydown: {
    type: A(Function)
  },
  onFocus: {
    type: A(Function)
  },
  onBlur: {
    type: A(Function)
  },
  onContextmenu: {
    type: A(Function)
  },
  id: String,
  open: Boolean
}), ca = O({
  name: "ElPopperTrigger",
  inheritAttrs: !1
}), ua = /* @__PURE__ */ O({
  ...ca,
  props: No,
  setup(e, { expose: t }) {
    const n = e, { role: r, triggerRef: o } = K(nn, void 0);
    zs(o);
    const s = b(() => l.value ? n.id : void 0), a = b(() => {
      if (r && r.value === "tooltip")
        return n.open && n.id ? n.id : void 0;
    }), l = b(() => {
      if (r && r.value !== "tooltip")
        return r.value;
    }), c = b(() => l.value ? `${n.open}` : void 0);
    let u;
    return be(() => {
      B(() => n.virtualRef, (v) => {
        v && (o.value = Oe(v));
      }, {
        immediate: !0
      }), B(o, (v, m) => {
        u == null || u(), u = void 0, bt(v) && ([
          "onMouseenter",
          "onMouseleave",
          "onClick",
          "onKeydown",
          "onFocus",
          "onBlur",
          "onContextmenu"
        ].forEach((y) => {
          var h;
          const f = n[y];
          f && (v.addEventListener(y.slice(2).toLowerCase(), f), (h = m == null ? void 0 : m.removeEventListener) == null || h.call(m, y.slice(2).toLowerCase(), f));
        }), u = B([s, a, l, c], (y) => {
          [
            "aria-controls",
            "aria-describedby",
            "aria-haspopup",
            "aria-expanded"
          ].forEach((h, f) => {
            Ht(y[f]) ? v.removeAttribute(h) : v.setAttribute(h, y[f]);
          });
        }, { immediate: !0 })), bt(m) && [
          "aria-controls",
          "aria-describedby",
          "aria-haspopup",
          "aria-expanded"
        ].forEach((y) => m.removeAttribute(y));
      }, {
        immediate: !0
      });
    }), me(() => {
      u == null || u(), u = void 0;
    }), t({
      triggerRef: o
    }), (v, m) => v.virtualTriggering ? fe("v-if", !0) : (P(), X(i(la), ge({ key: 0 }, v.$attrs, {
      "aria-controls": i(s),
      "aria-describedby": i(a),
      "aria-expanded": i(c),
      "aria-haspopup": i(l)
    }), {
      default: H(() => [
        R(v.$slots, "default")
      ]),
      _: 3
    }, 16, ["aria-controls", "aria-describedby", "aria-expanded", "aria-haspopup"]));
  }
});
var da = /* @__PURE__ */ J(ua, [["__file", "trigger.vue"]]);
const Rt = "focus-trap.focus-after-trapped", Ft = "focus-trap.focus-after-released", pa = "focus-trap.focusout-prevented", Vn = {
  cancelable: !0,
  bubbles: !1
}, fa = {
  cancelable: !0,
  bubbles: !1
}, Un = "focusAfterTrapped", Wn = "focusAfterReleased", va = Symbol("elFocusTrap"), on = $(), It = $(0), rn = $(0);
let st = 0;
const Ro = (e) => {
  const t = [], n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (r) => {
      const o = r.tagName === "INPUT" && r.type === "hidden";
      return r.disabled || r.hidden || o ? NodeFilter.FILTER_SKIP : r.tabIndex >= 0 || r === document.activeElement ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  for (; n.nextNode(); )
    t.push(n.currentNode);
  return t;
}, zn = (e, t) => {
  for (const n of e)
    if (!ma(n, t))
      return n;
}, ma = (e, t) => {
  if (process.env.NODE_ENV === "test")
    return !1;
  if (getComputedStyle(e).visibility === "hidden")
    return !0;
  for (; e; ) {
    if (t && e === t)
      return !1;
    if (getComputedStyle(e).display === "none")
      return !0;
    e = e.parentElement;
  }
  return !1;
}, ga = (e) => {
  const t = Ro(e), n = zn(t, e), r = zn(t.reverse(), e);
  return [n, r];
}, ya = (e) => e instanceof HTMLInputElement && "select" in e, ye = (e, t) => {
  if (e && e.focus) {
    const n = document.activeElement;
    e.focus({ preventScroll: !0 }), rn.value = window.performance.now(), e !== n && ya(e) && t && e.select();
  }
};
function Jn(e, t) {
  const n = [...e], r = e.indexOf(t);
  return r !== -1 && n.splice(r, 1), n;
}
const ha = () => {
  let e = [];
  return {
    push: (r) => {
      const o = e[0];
      o && r !== o && o.pause(), e = Jn(e, r), e.unshift(r);
    },
    remove: (r) => {
      var o, s;
      e = Jn(e, r), (s = (o = e[0]) == null ? void 0 : o.resume) == null || s.call(o);
    }
  };
}, ba = (e, t = !1) => {
  const n = document.activeElement;
  for (const r of e)
    if (ye(r, t), document.activeElement !== n)
      return;
}, qn = ha(), _a = () => It.value > rn.value, at = () => {
  on.value = "pointer", It.value = window.performance.now();
}, Zn = () => {
  on.value = "keyboard", It.value = window.performance.now();
}, wa = () => (be(() => {
  st === 0 && (document.addEventListener("mousedown", at), document.addEventListener("touchstart", at), document.addEventListener("keydown", Zn)), st++;
}), me(() => {
  st--, st <= 0 && (document.removeEventListener("mousedown", at), document.removeEventListener("touchstart", at), document.removeEventListener("keydown", Zn));
}), {
  focusReason: on,
  lastUserFocusTimestamp: It,
  lastAutomatedFocusTimestamp: rn
}), it = (e) => new CustomEvent(pa, {
  ...fa,
  detail: e
}), Ea = O({
  name: "ElFocusTrap",
  inheritAttrs: !1,
  props: {
    loop: Boolean,
    trapped: Boolean,
    focusTrapEl: Object,
    focusStartEl: {
      type: [Object, String],
      default: "first"
    }
  },
  emits: [
    Un,
    Wn,
    "focusin",
    "focusout",
    "focusout-prevented",
    "release-requested"
  ],
  setup(e, { emit: t }) {
    const n = $();
    let r, o;
    const { focusReason: s } = wa();
    Ks((f) => {
      e.trapped && !a.paused && t("release-requested", f);
    });
    const a = {
      paused: !1,
      pause() {
        this.paused = !0;
      },
      resume() {
        this.paused = !1;
      }
    }, l = (f) => {
      if (!e.loop && !e.trapped || a.paused)
        return;
      const { key: d, altKey: g, ctrlKey: p, metaKey: _, currentTarget: T, shiftKey: w } = f, { loop: I } = e, S = d === _t.tab && !g && !p && !_, C = document.activeElement;
      if (S && C) {
        const x = T, [L, N] = ga(x);
        if (L && N) {
          if (!w && C === N) {
            const k = it({
              focusReason: s.value
            });
            t("focusout-prevented", k), k.defaultPrevented || (f.preventDefault(), I && ye(L, !0));
          } else if (w && [L, x].includes(C)) {
            const k = it({
              focusReason: s.value
            });
            t("focusout-prevented", k), k.defaultPrevented || (f.preventDefault(), I && ye(N, !0));
          }
        } else if (C === x) {
          const k = it({
            focusReason: s.value
          });
          t("focusout-prevented", k), k.defaultPrevented || f.preventDefault();
        }
      }
    };
    U(va, {
      focusTrapRef: n,
      onKeydown: l
    }), B(() => e.focusTrapEl, (f) => {
      f && (n.value = f);
    }, { immediate: !0 }), B([n], ([f], [d]) => {
      f && (f.addEventListener("keydown", l), f.addEventListener("focusin", v), f.addEventListener("focusout", m)), d && (d.removeEventListener("keydown", l), d.removeEventListener("focusin", v), d.removeEventListener("focusout", m));
    });
    const c = (f) => {
      t(Un, f);
    }, u = (f) => t(Wn, f), v = (f) => {
      const d = i(n);
      if (!d)
        return;
      const g = f.target, p = f.relatedTarget, _ = g && d.contains(g);
      e.trapped || p && d.contains(p) || (r = p), _ && t("focusin", f), !a.paused && e.trapped && (_ ? o = g : ye(o, !0));
    }, m = (f) => {
      const d = i(n);
      if (!(a.paused || !d))
        if (e.trapped) {
          const g = f.relatedTarget;
          !Ht(g) && !d.contains(g) && setTimeout(() => {
            if (!a.paused && e.trapped) {
              const p = it({
                focusReason: s.value
              });
              t("focusout-prevented", p), p.defaultPrevented || ye(o, !0);
            }
          }, 0);
        } else {
          const g = f.target;
          g && d.contains(g) || t("focusout", f);
        }
    };
    async function y() {
      await gn();
      const f = i(n);
      if (f) {
        qn.push(a);
        const d = f.contains(document.activeElement) ? r : document.activeElement;
        if (r = d, !f.contains(d)) {
          const p = new Event(Rt, Vn);
          f.addEventListener(Rt, c), f.dispatchEvent(p), p.defaultPrevented || gn(() => {
            let _ = e.focusStartEl;
            qe(_) || (ye(_), document.activeElement !== _ && (_ = "first")), _ === "first" && ba(Ro(f), !0), (document.activeElement === d || _ === "container") && ye(f);
          });
        }
      }
    }
    function h() {
      const f = i(n);
      if (f) {
        f.removeEventListener(Rt, c);
        const d = new CustomEvent(Ft, {
          ...Vn,
          detail: {
            focusReason: s.value
          }
        });
        f.addEventListener(Ft, u), f.dispatchEvent(d), !d.defaultPrevented && (s.value == "keyboard" || !_a() || f.contains(document.activeElement)) && ye(r ?? document.body), f.removeEventListener(Ft, u), qn.remove(a);
      }
    }
    return be(() => {
      e.trapped && y(), B(() => e.trapped, (f) => {
        f ? y() : h();
      });
    }), me(() => {
      e.trapped && h();
    }), {
      onKeydown: l
    };
  }
});
function Ca(e, t, n, r, o, s) {
  return R(e.$slots, "default", { handleKeydown: e.onKeydown });
}
var Oa = /* @__PURE__ */ J(Ea, [["render", Ca], ["__file", "focus-trap.vue"]]);
const Ta = ["fixed", "absolute"], Ia = W({
  boundariesPadding: {
    type: Number,
    default: 0
  },
  fallbackPlacements: {
    type: A(Array),
    default: void 0
  },
  gpuAcceleration: {
    type: Boolean,
    default: !0
  },
  offset: {
    type: Number,
    default: 12
  },
  placement: {
    type: String,
    values: Jt,
    default: "bottom"
  },
  popperOptions: {
    type: A(Object),
    default: () => ({})
  },
  strategy: {
    type: String,
    values: Ta,
    default: "absolute"
  }
}), Fo = W({
  ...Ia,
  id: String,
  style: {
    type: A([String, Array, Object])
  },
  className: {
    type: A([String, Array, Object])
  },
  effect: {
    type: String,
    default: "dark"
  },
  visible: Boolean,
  enterable: {
    type: Boolean,
    default: !0
  },
  pure: Boolean,
  focusOnShow: {
    type: Boolean,
    default: !1
  },
  trapping: {
    type: Boolean,
    default: !1
  },
  popperClass: {
    type: A([String, Array, Object])
  },
  popperStyle: {
    type: A([String, Array, Object])
  },
  referenceEl: {
    type: A(Object)
  },
  triggerTargetEl: {
    type: A(Object)
  },
  stopPopperMouseEvent: {
    type: Boolean,
    default: !0
  },
  ariaLabel: {
    type: String,
    default: void 0
  },
  virtualTriggering: Boolean,
  zIndex: Number
}), Pa = {
  mouseenter: (e) => e instanceof MouseEvent,
  mouseleave: (e) => e instanceof MouseEvent,
  focus: () => !0,
  blur: () => !0,
  close: () => !0
}, xa = (e, t = []) => {
  const { placement: n, strategy: r, popperOptions: o } = e, s = {
    placement: n,
    strategy: r,
    ...o,
    modifiers: [...Sa(e), ...t]
  };
  return Aa(s, o == null ? void 0 : o.modifiers), s;
}, $a = (e) => {
  if (se)
    return Oe(e);
};
function Sa(e) {
  const { offset: t, gpuAcceleration: n, fallbackPlacements: r } = e;
  return [
    {
      name: "offset",
      options: {
        offset: [0, t ?? 12]
      }
    },
    {
      name: "preventOverflow",
      options: {
        padding: {
          top: 2,
          bottom: 2,
          left: 5,
          right: 5
        }
      }
    },
    {
      name: "flip",
      options: {
        padding: 5,
        fallbackPlacements: r
      }
    },
    {
      name: "computeStyles",
      options: {
        gpuAcceleration: n
      }
    }
  ];
}
function Aa(e, t) {
  t && (e.modifiers = [...e.modifiers, ...t ?? []]);
}
const Na = 0, Ra = (e) => {
  const { popperInstanceRef: t, contentRef: n, triggerRef: r, role: o } = K(nn, void 0), s = $(), a = $(), l = b(() => ({
    name: "eventListeners",
    enabled: !!e.visible
  })), c = b(() => {
    var p;
    const _ = i(s), T = (p = i(a)) != null ? p : Na;
    return {
      name: "arrow",
      enabled: !yr(_),
      options: {
        element: _,
        padding: T
      }
    };
  }), u = b(() => ({
    onFirstUpdate: () => {
      f();
    },
    ...xa(e, [
      i(c),
      i(l)
    ])
  })), v = b(() => $a(e.referenceEl) || i(r)), { attributes: m, state: y, styles: h, update: f, forceUpdate: d, instanceRef: g } = Ls(v, n, u);
  return B(g, (p) => t.value = p), be(() => {
    B(() => {
      var p;
      return (p = i(v)) == null ? void 0 : p.getBoundingClientRect();
    }, () => {
      f();
    });
  }), {
    attributes: m,
    arrowRef: s,
    contentRef: n,
    instanceRef: g,
    state: y,
    styles: h,
    role: o,
    forceUpdate: d,
    update: f
  };
}, Fa = (e, {
  attributes: t,
  styles: n,
  role: r
}) => {
  const { nextZIndex: o } = Gs(), s = ae("popper"), a = b(() => i(t).popper), l = $($e(e.zIndex) ? e.zIndex : o()), c = b(() => [
    s.b(),
    s.is("pure", e.pure),
    s.is(e.effect),
    e.popperClass
  ]), u = b(() => [
    { zIndex: i(l) },
    i(n).popper,
    e.popperStyle || {}
  ]), v = b(() => r.value === "dialog" ? "false" : void 0), m = b(() => i(n).arrow || {});
  return {
    ariaModal: v,
    arrowStyle: m,
    contentAttrs: a,
    contentClass: c,
    contentStyle: u,
    contentZIndex: l,
    updateZIndex: () => {
      l.value = $e(e.zIndex) ? e.zIndex : o();
    }
  };
}, ka = (e, t) => {
  const n = $(!1), r = $();
  return {
    focusStartRef: r,
    trapped: n,
    onFocusAfterReleased: (u) => {
      var v;
      ((v = u.detail) == null ? void 0 : v.focusReason) !== "pointer" && (r.value = "first", t("blur"));
    },
    onFocusAfterTrapped: () => {
      t("focus");
    },
    onFocusInTrap: (u) => {
      e.visible && !n.value && (u.target && (r.value = u.target), n.value = !0);
    },
    onFocusoutPrevented: (u) => {
      e.trapping || (u.detail.focusReason === "pointer" && u.preventDefault(), n.value = !1);
    },
    onReleaseRequested: () => {
      n.value = !1, t("close");
    }
  };
}, Ba = O({
  name: "ElPopperContent"
}), La = /* @__PURE__ */ O({
  ...Ba,
  props: Fo,
  emits: Pa,
  setup(e, { expose: t, emit: n }) {
    const r = e, {
      focusStartRef: o,
      trapped: s,
      onFocusAfterReleased: a,
      onFocusAfterTrapped: l,
      onFocusInTrap: c,
      onFocusoutPrevented: u,
      onReleaseRequested: v
    } = ka(r, n), { attributes: m, arrowRef: y, contentRef: h, styles: f, instanceRef: d, role: g, update: p } = Ra(r), {
      ariaModal: _,
      arrowStyle: T,
      contentAttrs: w,
      contentClass: I,
      contentStyle: S,
      updateZIndex: C
    } = Fa(r, {
      styles: f,
      attributes: m,
      role: g
    }), x = K(Kn, void 0), L = $();
    U(xo, {
      arrowStyle: T,
      arrowRef: y,
      arrowOffset: L
    }), x && (x.addInputId || x.removeInputId) && U(Kn, {
      ...x,
      addInputId: ht,
      removeInputId: ht
    });
    let N;
    const j = (D = !0) => {
      p(), D && C();
    }, k = () => {
      j(!1), r.visible && r.focusOnShow ? s.value = !0 : r.visible === !1 && (s.value = !1);
    };
    return be(() => {
      B(() => r.triggerTargetEl, (D, q) => {
        N == null || N(), N = void 0;
        const V = i(D || h.value), M = i(q || h.value);
        bt(V) && (N = B([g, () => r.ariaLabel, _, () => r.id], (E) => {
          ["role", "aria-label", "aria-modal", "id"].forEach((Z, le) => {
            Ht(E[le]) ? V.removeAttribute(Z) : V.setAttribute(Z, E[le]);
          });
        }, { immediate: !0 })), M !== V && bt(M) && ["role", "aria-label", "aria-modal", "id"].forEach((E) => {
          M.removeAttribute(E);
        });
      }, { immediate: !0 }), B(() => r.visible, k, { immediate: !0 });
    }), me(() => {
      N == null || N(), N = void 0;
    }), t({
      popperContentRef: h,
      popperInstanceRef: d,
      updatePopper: j,
      contentStyle: S
    }), (D, q) => (P(), F("div", ge({
      ref_key: "contentRef",
      ref: h
    }, i(w), {
      style: i(S),
      class: i(I),
      tabindex: "-1",
      onMouseenter: q[0] || (q[0] = (V) => D.$emit("mouseenter", V)),
      onMouseleave: q[1] || (q[1] = (V) => D.$emit("mouseleave", V))
    }), [
      te(i(Oa), {
        trapped: i(s),
        "trap-on-focus-in": !0,
        "focus-trap-el": i(h),
        "focus-start-el": i(o),
        onFocusAfterTrapped: i(l),
        onFocusAfterReleased: i(a),
        onFocusin: i(c),
        onFocusoutPrevented: i(u),
        onReleaseRequested: i(v)
      }, {
        default: H(() => [
          R(D.$slots, "default")
        ]),
        _: 3
      }, 8, ["trapped", "focus-trap-el", "focus-start-el", "onFocusAfterTrapped", "onFocusAfterReleased", "onFocusin", "onFocusoutPrevented", "onReleaseRequested"])
    ], 16));
  }
});
var ja = /* @__PURE__ */ J(La, [["__file", "content.vue"]]);
const Da = Ze(ra), sn = Symbol("elTooltip"), ee = W({
  ...Us,
  ...Fo,
  appendTo: {
    type: A([String, Object])
  },
  content: {
    type: String,
    default: ""
  },
  rawContent: {
    type: Boolean,
    default: !1
  },
  persistent: Boolean,
  ariaLabel: String,
  visible: {
    type: A(Boolean),
    default: null
  },
  transition: String,
  teleported: {
    type: Boolean,
    default: !0
  },
  disabled: Boolean
}), Je = W({
  ...No,
  disabled: Boolean,
  trigger: {
    type: A([String, Array]),
    default: "hover"
  },
  triggerKeys: {
    type: A(Array),
    default: () => [_t.enter, _t.space]
  }
}), {
  useModelToggleProps: Ma,
  useModelToggleEmits: Ka,
  useModelToggle: Ha
} = fo("visible"), Va = W({
  ...$o,
  ...Ma,
  ...ee,
  ...Je,
  ...So,
  showArrow: {
    type: Boolean,
    default: !0
  }
}), Ua = [
  ...Ka,
  "before-show",
  "before-hide",
  "show",
  "hide",
  "open",
  "close"
], Wa = (e, t) => io(e) ? e.includes(t) : e === t, Pe = (e, t, n) => (r) => {
  Wa(i(e), t) && n(r);
}, za = O({
  name: "ElTooltipTrigger"
}), Ja = /* @__PURE__ */ O({
  ...za,
  props: Je,
  setup(e, { expose: t }) {
    const n = e, r = ae("tooltip"), { controlled: o, id: s, open: a, onOpen: l, onClose: c, onToggle: u } = K(sn, void 0), v = $(null), m = () => {
      if (i(o) || n.disabled)
        return !0;
    }, y = je(n, "trigger"), h = pe(m, Pe(y, "hover", l)), f = pe(m, Pe(y, "hover", c)), d = pe(m, Pe(y, "click", (w) => {
      w.button === 0 && u(w);
    })), g = pe(m, Pe(y, "focus", l)), p = pe(m, Pe(y, "focus", c)), _ = pe(m, Pe(y, "contextmenu", (w) => {
      w.preventDefault(), u(w);
    })), T = pe(m, (w) => {
      const { code: I } = w;
      n.triggerKeys.includes(I) && (w.preventDefault(), u(w));
    });
    return t({
      triggerRef: v
    }), (w, I) => (P(), X(i(da), {
      id: i(s),
      "virtual-ref": w.virtualRef,
      open: i(a),
      "virtual-triggering": w.virtualTriggering,
      class: z(i(r).e("trigger")),
      onBlur: i(p),
      onClick: i(d),
      onContextmenu: i(_),
      onFocus: i(g),
      onMouseenter: i(h),
      onMouseleave: i(f),
      onKeydown: i(T)
    }, {
      default: H(() => [
        R(w.$slots, "default")
      ]),
      _: 3
    }, 8, ["id", "virtual-ref", "open", "virtual-triggering", "class", "onBlur", "onClick", "onContextmenu", "onFocus", "onMouseenter", "onMouseleave", "onKeydown"]));
  }
});
var qa = /* @__PURE__ */ J(Ja, [["__file", "trigger.vue"]]);
const Za = O({
  name: "ElTooltipContent",
  inheritAttrs: !1
}), Ga = /* @__PURE__ */ O({
  ...Za,
  props: ee,
  setup(e, { expose: t }) {
    const n = e, { selector: r } = To(), o = ae("tooltip"), s = $(null), a = $(!1), {
      controlled: l,
      id: c,
      open: u,
      trigger: v,
      onClose: m,
      onOpen: y,
      onShow: h,
      onHide: f,
      onBeforeShow: d,
      onBeforeHide: g
    } = K(sn, void 0), p = b(() => n.transition || `${o.namespace.value}-fade-in-linear`), _ = b(() => process.env.NODE_ENV === "test" ? !0 : n.persistent);
    me(() => {
      a.value = !0;
    });
    const T = b(() => i(_) ? !0 : i(u)), w = b(() => n.disabled ? !1 : i(u)), I = b(() => n.appendTo || r.value), S = b(() => {
      var E;
      return (E = n.style) != null ? E : {};
    }), C = b(() => !i(u)), x = () => {
      f();
    }, L = () => {
      if (i(l))
        return !0;
    }, N = pe(L, () => {
      n.enterable && i(v) === "hover" && y();
    }), j = pe(L, () => {
      i(v) === "hover" && m();
    }), k = () => {
      var E, Z;
      (Z = (E = s.value) == null ? void 0 : E.updatePopper) == null || Z.call(E), d == null || d();
    }, D = () => {
      g == null || g();
    }, q = () => {
      h(), M = lr(b(() => {
        var E;
        return (E = s.value) == null ? void 0 : E.popperContentRef;
      }), () => {
        if (i(l))
          return;
        i(v) !== "hover" && m();
      });
    }, V = () => {
      n.virtualTriggering || m();
    };
    let M;
    return B(() => i(u), (E) => {
      E || M == null || M();
    }, {
      flush: "post"
    }), B(() => n.content, () => {
      var E, Z;
      (Z = (E = s.value) == null ? void 0 : E.updatePopper) == null || Z.call(E);
    }), t({
      contentRef: s
    }), (E, Z) => (P(), X(Xo, {
      disabled: !E.teleported,
      to: i(I)
    }, [
      te(Xn, {
        name: i(p),
        onAfterLeave: x,
        onBeforeEnter: k,
        onAfterEnter: q,
        onBeforeLeave: D
      }, {
        default: H(() => [
          i(T) ? Ct((P(), X(i(ja), ge({
            key: 0,
            id: i(c),
            ref_key: "contentRef",
            ref: s
          }, E.$attrs, {
            "aria-label": E.ariaLabel,
            "aria-hidden": i(C),
            "boundaries-padding": E.boundariesPadding,
            "fallback-placements": E.fallbackPlacements,
            "gpu-acceleration": E.gpuAcceleration,
            offset: E.offset,
            placement: E.placement,
            "popper-options": E.popperOptions,
            strategy: E.strategy,
            effect: E.effect,
            enterable: E.enterable,
            pure: E.pure,
            "popper-class": E.popperClass,
            "popper-style": [E.popperStyle, i(S)],
            "reference-el": E.referenceEl,
            "trigger-target-el": E.triggerTargetEl,
            visible: i(w),
            "z-index": E.zIndex,
            onMouseenter: i(N),
            onMouseleave: i(j),
            onBlur: V,
            onClose: i(m)
          }), {
            default: H(() => [
              a.value ? fe("v-if", !0) : R(E.$slots, "default", { key: 0 })
            ]),
            _: 3
          }, 16, ["id", "aria-label", "aria-hidden", "boundaries-padding", "fallback-placements", "gpu-acceleration", "offset", "placement", "popper-options", "strategy", "effect", "enterable", "pure", "popper-class", "popper-style", "reference-el", "trigger-target-el", "visible", "z-index", "onMouseenter", "onMouseleave", "onClose"])), [
            [Dt, i(w)]
          ]) : fe("v-if", !0)
        ]),
        _: 3
      }, 8, ["name"])
    ], 8, ["disabled", "to"]));
  }
});
var Qa = /* @__PURE__ */ J(Ga, [["__file", "content.vue"]]);
const Ya = ["innerHTML"], Xa = { key: 1 }, ei = O({
  name: "ElTooltip"
}), ti = /* @__PURE__ */ O({
  ...ei,
  props: Va,
  emits: Ua,
  setup(e, { expose: t, emit: n }) {
    const r = e;
    Vs();
    const o = Ms(), s = $(), a = $(), l = () => {
      var p;
      const _ = i(s);
      _ && ((p = _.popperInstanceRef) == null || p.update());
    }, c = $(!1), u = $(), { show: v, hide: m, hasUpdateHandler: y } = Ha({
      indicator: c,
      toggleReason: u
    }), { onOpen: h, onClose: f } = Ws({
      showAfter: je(r, "showAfter"),
      hideAfter: je(r, "hideAfter"),
      autoClose: je(r, "autoClose"),
      open: v,
      close: m
    }), d = b(() => Vt(r.visible) && !y.value);
    U(sn, {
      controlled: d,
      id: o,
      open: er(c),
      trigger: je(r, "trigger"),
      onOpen: (p) => {
        h(p);
      },
      onClose: (p) => {
        f(p);
      },
      onToggle: (p) => {
        i(c) ? f(p) : h(p);
      },
      onShow: () => {
        n("show", u.value);
      },
      onHide: () => {
        n("hide", u.value);
      },
      onBeforeShow: () => {
        n("before-show", u.value);
      },
      onBeforeHide: () => {
        n("before-hide", u.value);
      },
      updatePopper: l
    }), B(() => r.disabled, (p) => {
      p && c.value && (c.value = !1);
    });
    const g = (p) => {
      var _, T;
      const w = (T = (_ = a.value) == null ? void 0 : _.contentRef) == null ? void 0 : T.popperContentRef, I = (p == null ? void 0 : p.relatedTarget) || document.activeElement;
      return w && w.contains(I);
    };
    return tr(() => c.value && m()), t({
      popperRef: s,
      contentRef: a,
      isFocusInsideContent: g,
      updatePopper: l,
      onOpen: h,
      onClose: f,
      hide: m
    }), (p, _) => (P(), X(i(Da), {
      ref_key: "popperRef",
      ref: s,
      role: p.role
    }, {
      default: H(() => [
        te(qa, {
          disabled: p.disabled,
          trigger: p.trigger,
          "trigger-keys": p.triggerKeys,
          "virtual-ref": p.virtualRef,
          "virtual-triggering": p.virtualTriggering
        }, {
          default: H(() => [
            p.$slots.default ? R(p.$slots, "default", { key: 0 }) : fe("v-if", !0)
          ]),
          _: 3
        }, 8, ["disabled", "trigger", "trigger-keys", "virtual-ref", "virtual-triggering"]),
        te(Qa, {
          ref_key: "contentRef",
          ref: a,
          "aria-label": p.ariaLabel,
          "boundaries-padding": p.boundariesPadding,
          content: p.content,
          disabled: p.disabled,
          effect: p.effect,
          enterable: p.enterable,
          "fallback-placements": p.fallbackPlacements,
          "hide-after": p.hideAfter,
          "gpu-acceleration": p.gpuAcceleration,
          offset: p.offset,
          persistent: p.persistent,
          "popper-class": p.popperClass,
          "popper-style": p.popperStyle,
          placement: p.placement,
          "popper-options": p.popperOptions,
          pure: p.pure,
          "raw-content": p.rawContent,
          "reference-el": p.referenceEl,
          "trigger-target-el": p.triggerTargetEl,
          "show-after": p.showAfter,
          strategy: p.strategy,
          teleported: p.teleported,
          transition: p.transition,
          "virtual-triggering": p.virtualTriggering,
          "z-index": p.zIndex,
          "append-to": p.appendTo
        }, {
          default: H(() => [
            R(p.$slots, "content", {}, () => [
              p.rawContent ? (P(), F("span", {
                key: 0,
                innerHTML: p.content
              }, null, 8, Ya)) : (P(), F("span", Xa, he(p.content), 1))
            ]),
            p.showArrow ? (P(), X(i(ia), {
              key: 0,
              "arrow-offset": p.arrowOffset
            }, null, 8, ["arrow-offset"])) : fe("v-if", !0)
          ]),
          _: 3
        }, 8, ["aria-label", "boundaries-padding", "content", "disabled", "effect", "enterable", "fallback-placements", "hide-after", "gpu-acceleration", "offset", "persistent", "popper-class", "popper-style", "placement", "popper-options", "pure", "raw-content", "reference-el", "trigger-target-el", "show-after", "strategy", "teleported", "transition", "virtual-triggering", "z-index", "append-to"])
      ]),
      _: 3
    }, 8, ["role"]));
  }
});
var ni = /* @__PURE__ */ J(ti, [["__file", "tooltip.vue"]]);
const oi = Ze(ni), Gn = (e) => $e(e) || qe(e) || io(e), ri = W({
  accordion: Boolean,
  modelValue: {
    type: A([Array, String, Number]),
    default: () => Sr([])
  }
}), si = {
  [uo]: Gn,
  [po]: Gn
}, ko = Symbol("collapseContextKey"), ai = (e, t) => {
  const n = $(Tn(e.modelValue)), r = (s) => {
    n.value = s;
    const a = e.accordion ? n.value[0] : n.value;
    t(uo, a), t(po, a);
  }, o = (s) => {
    if (e.accordion)
      r([n.value[0] === s ? "" : s]);
    else {
      const a = [...n.value], l = a.indexOf(s);
      l > -1 ? a.splice(l, 1) : a.push(s), r(a);
    }
  };
  return B(() => e.modelValue, () => n.value = Tn(e.modelValue), { deep: !0 }), U(ko, {
    activeNames: n,
    handleItemClick: o
  }), {
    activeNames: n,
    setActiveNames: r
  };
}, ii = () => {
  const e = ae("collapse");
  return {
    rootKls: b(() => e.b())
  };
}, li = O({
  name: "ElCollapse"
}), ci = /* @__PURE__ */ O({
  ...li,
  props: ri,
  emits: si,
  setup(e, { expose: t, emit: n }) {
    const r = e, { activeNames: o, setActiveNames: s } = ai(r, n), { rootKls: a } = ii();
    return t({
      activeNames: o,
      setActiveNames: s
    }), (l, c) => (P(), F("div", {
      class: z(i(a))
    }, [
      R(l.$slots, "default")
    ], 2));
  }
});
var ui = /* @__PURE__ */ J(ci, [["__file", "collapse.vue"]]);
const di = O({
  name: "ElCollapseTransition"
}), pi = /* @__PURE__ */ O({
  ...di,
  setup(e) {
    const t = ae("collapse-transition"), n = (o) => {
      o.style.maxHeight = "", o.style.overflow = o.dataset.oldOverflow, o.style.paddingTop = o.dataset.oldPaddingTop, o.style.paddingBottom = o.dataset.oldPaddingBottom;
    }, r = {
      beforeEnter(o) {
        o.dataset || (o.dataset = {}), o.dataset.oldPaddingTop = o.style.paddingTop, o.dataset.oldPaddingBottom = o.style.paddingBottom, o.style.height && (o.dataset.elExistsHeight = o.style.height), o.style.maxHeight = 0, o.style.paddingTop = 0, o.style.paddingBottom = 0;
      },
      enter(o) {
        requestAnimationFrame(() => {
          o.dataset.oldOverflow = o.style.overflow, o.dataset.elExistsHeight ? o.style.maxHeight = o.dataset.elExistsHeight : o.scrollHeight !== 0 ? o.style.maxHeight = `${o.scrollHeight}px` : o.style.maxHeight = 0, o.style.paddingTop = o.dataset.oldPaddingTop, o.style.paddingBottom = o.dataset.oldPaddingBottom, o.style.overflow = "hidden";
        });
      },
      afterEnter(o) {
        o.style.maxHeight = "", o.style.overflow = o.dataset.oldOverflow;
      },
      enterCancelled(o) {
        n(o);
      },
      beforeLeave(o) {
        o.dataset || (o.dataset = {}), o.dataset.oldPaddingTop = o.style.paddingTop, o.dataset.oldPaddingBottom = o.style.paddingBottom, o.dataset.oldOverflow = o.style.overflow, o.style.maxHeight = `${o.scrollHeight}px`, o.style.overflow = "hidden";
      },
      leave(o) {
        o.scrollHeight !== 0 && (o.style.maxHeight = 0, o.style.paddingTop = 0, o.style.paddingBottom = 0);
      },
      afterLeave(o) {
        n(o);
      },
      leaveCancelled(o) {
        n(o);
      }
    };
    return (o, s) => (P(), X(Xn, ge({
      name: i(t).b()
    }, nr(r)), {
      default: H(() => [
        R(o.$slots, "default")
      ]),
      _: 3
    }, 16, ["name"]));
  }
});
var ut = /* @__PURE__ */ J(pi, [["__file", "collapse-transition.vue"]]);
ut.install = (e) => {
  e.component(ut.name, ut);
};
const fi = ut, vi = W({
  title: {
    type: String,
    default: ""
  },
  name: {
    type: A([String, Number]),
    default: void 0
  },
  disabled: Boolean
}), mi = (e) => {
  const t = K(ko), { namespace: n } = ae("collapse"), r = $(!1), o = $(!1), s = tn(), a = b(() => s.current++), l = b(() => {
    var y;
    return (y = e.name) != null ? y : `${n.value}-id-${s.prefix}-${i(a)}`;
  }), c = b(() => t == null ? void 0 : t.activeNames.value.includes(i(l)));
  return {
    focusing: r,
    id: a,
    isActive: c,
    handleFocus: () => {
      setTimeout(() => {
        o.value ? o.value = !1 : r.value = !0;
      }, 50);
    },
    handleHeaderClick: () => {
      e.disabled || (t == null || t.handleItemClick(i(l)), r.value = !1, o.value = !0);
    },
    handleEnterClick: () => {
      t == null || t.handleItemClick(i(l));
    }
  };
}, gi = (e, { focusing: t, isActive: n, id: r }) => {
  const o = ae("collapse"), s = b(() => [
    o.b("item"),
    o.is("active", i(n)),
    o.is("disabled", e.disabled)
  ]), a = b(() => [
    o.be("item", "header"),
    o.is("active", i(n)),
    { focusing: i(t) && !e.disabled }
  ]), l = b(() => [
    o.be("item", "arrow"),
    o.is("active", i(n))
  ]), c = b(() => o.be("item", "wrap")), u = b(() => o.be("item", "content")), v = b(() => o.b(`content-${i(r)}`)), m = b(() => o.b(`head-${i(r)}`));
  return {
    arrowKls: l,
    headKls: a,
    rootKls: s,
    itemWrapperKls: c,
    itemContentKls: u,
    scopedContentId: v,
    scopedHeadId: m
  };
}, yi = ["id", "aria-expanded", "aria-controls", "aria-describedby", "tabindex"], hi = ["id", "aria-hidden", "aria-labelledby"], bi = O({
  name: "ElCollapseItem"
}), _i = /* @__PURE__ */ O({
  ...bi,
  props: vi,
  setup(e, { expose: t }) {
    const n = e, {
      focusing: r,
      id: o,
      isActive: s,
      handleFocus: a,
      handleHeaderClick: l,
      handleEnterClick: c
    } = mi(n), {
      arrowKls: u,
      headKls: v,
      rootKls: m,
      itemWrapperKls: y,
      itemContentKls: h,
      scopedContentId: f,
      scopedHeadId: d
    } = gi(n, { focusing: r, isActive: s, id: o });
    return t({
      isActive: s
    }), (g, p) => (P(), F("div", {
      class: z(i(m))
    }, [
      G("button", {
        id: i(d),
        class: z(i(v)),
        "aria-expanded": i(s),
        "aria-controls": i(f),
        "aria-describedby": i(f),
        tabindex: g.disabled ? -1 : 0,
        type: "button",
        onClick: p[0] || (p[0] = (..._) => i(l) && i(l)(..._)),
        onKeydown: p[1] || (p[1] = or(eo((..._) => i(c) && i(c)(..._), ["stop", "prevent"]), ["space", "enter"])),
        onFocus: p[2] || (p[2] = (..._) => i(a) && i(a)(..._)),
        onBlur: p[3] || (p[3] = (_) => r.value = !1)
      }, [
        R(g.$slots, "title", {}, () => [
          Ot(he(g.title), 1)
        ]),
        te(i(Po), {
          class: z(i(u))
        }, {
          default: H(() => [
            te(i(Cr))
          ]),
          _: 1
        }, 8, ["class"])
      ], 42, yi),
      te(i(fi), null, {
        default: H(() => [
          Ct(G("div", {
            id: i(f),
            role: "region",
            class: z(i(y)),
            "aria-hidden": !i(s),
            "aria-labelledby": i(d)
          }, [
            G("div", {
              class: z(i(h))
            }, [
              R(g.$slots, "default")
            ], 2)
          ], 10, hi), [
            [Dt, i(s)]
          ])
        ]),
        _: 3
      })
    ], 2));
  }
});
var Bo = /* @__PURE__ */ J(_i, [["__file", "collapse-item.vue"]]);
const wi = Ze(ui, {
  CollapseItem: Bo
}), Ei = $r(Bo), Ci = /* @__PURE__ */ O({
  inheritAttrs: !1
});
function Oi(e, t, n, r, o, s) {
  return R(e.$slots, "default");
}
var Ti = /* @__PURE__ */ J(Ci, [["render", Oi], ["__file", "collection.vue"]]);
const Ii = /* @__PURE__ */ O({
  name: "ElCollectionItem",
  inheritAttrs: !1
});
function Pi(e, t, n, r, o, s) {
  return R(e.$slots, "default");
}
var xi = /* @__PURE__ */ J(Ii, [["render", Pi], ["__file", "collection-item.vue"]]);
const $i = "data-el-collection-item", Si = (e) => {
  const t = `El${e}Collection`, n = `${t}Item`, r = Symbol(t), o = Symbol(n), s = {
    ...Ti,
    name: t,
    setup() {
      const l = $(null), c = /* @__PURE__ */ new Map();
      U(r, {
        itemMap: c,
        getItems: () => {
          const v = i(l);
          if (!v)
            return [];
          const m = Array.from(v.querySelectorAll(`[${$i}]`));
          return [...c.values()].sort((h, f) => m.indexOf(h.ref) - m.indexOf(f.ref));
        },
        collectionRef: l
      });
    }
  }, a = {
    ...xi,
    name: n,
    setup(l, { attrs: c }) {
      const u = $(null), v = K(r, void 0);
      U(o, {
        collectionItemRef: u
      }), be(() => {
        const m = i(u);
        m && v.itemMap.set(m, {
          ref: m,
          ...c
        });
      }), me(() => {
        const m = i(u);
        v.itemMap.delete(m);
      });
    }
  };
  return {
    COLLECTION_INJECTION_KEY: r,
    COLLECTION_ITEM_INJECTION_KEY: o,
    ElCollection: s,
    ElCollectionItem: a
  };
}, kt = W({
  trigger: Je.trigger,
  effect: {
    ...ee.effect,
    default: "light"
  },
  type: {
    type: A(String)
  },
  placement: {
    type: A(String),
    default: "bottom"
  },
  popperOptions: {
    type: A(Object),
    default: () => ({})
  },
  id: String,
  size: {
    type: String,
    default: ""
  },
  splitButton: Boolean,
  hideOnClick: {
    type: Boolean,
    default: !0
  },
  loop: {
    type: Boolean,
    default: !0
  },
  showTimeout: {
    type: Number,
    default: 150
  },
  hideTimeout: {
    type: Number,
    default: 150
  },
  tabindex: {
    type: A([Number, String]),
    default: 0
  },
  maxHeight: {
    type: A([Number, String]),
    default: ""
  },
  popperClass: {
    type: String,
    default: ""
  },
  disabled: {
    type: Boolean,
    default: !1
  },
  role: {
    type: String,
    default: "menu"
  },
  buttonProps: {
    type: A(Object)
  },
  teleported: ee.teleported
});
W({
  command: {
    type: [Object, String, Number],
    default: () => ({})
  },
  disabled: Boolean,
  divided: Boolean,
  textValue: String,
  icon: {
    type: Pr
  }
});
W({
  onKeydown: { type: A(Function) }
});
Si("Dropdown");
const Ai = W({
  trigger: Je.trigger,
  placement: kt.placement,
  disabled: Je.disabled,
  visible: ee.visible,
  transition: ee.transition,
  popperOptions: kt.popperOptions,
  tabindex: kt.tabindex,
  content: ee.content,
  popperStyle: ee.popperStyle,
  popperClass: ee.popperClass,
  enterable: {
    ...ee.enterable,
    default: !0
  },
  effect: {
    ...ee.effect,
    default: "light"
  },
  teleported: ee.teleported,
  title: String,
  width: {
    type: [String, Number],
    default: 150
  },
  offset: {
    type: Number,
    default: void 0
  },
  showAfter: {
    type: Number,
    default: 0
  },
  hideAfter: {
    type: Number,
    default: 200
  },
  autoClose: {
    type: Number,
    default: 0
  },
  showArrow: {
    type: Boolean,
    default: !0
  },
  persistent: {
    type: Boolean,
    default: !0
  },
  "onUpdate:visible": {
    type: Function
  }
}), Ni = {
  "update:visible": (e) => Vt(e),
  "before-enter": () => !0,
  "before-leave": () => !0,
  "after-enter": () => !0,
  "after-leave": () => !0
}, Ri = "onUpdate:visible", Fi = O({
  name: "ElPopover"
}), ki = /* @__PURE__ */ O({
  ...Fi,
  props: Ai,
  emits: Ni,
  setup(e, { expose: t, emit: n }) {
    const r = e, o = b(() => r[Ri]), s = ae("popover"), a = $(), l = b(() => {
      var g;
      return (g = i(a)) == null ? void 0 : g.popperRef;
    }), c = b(() => [
      {
        width: lo(r.width)
      },
      r.popperStyle
    ]), u = b(() => [s.b(), r.popperClass, { [s.m("plain")]: !!r.content }]), v = b(() => r.transition === `${s.namespace.value}-fade-in-linear`), m = () => {
      var g;
      (g = a.value) == null || g.hide();
    }, y = () => {
      n("before-enter");
    }, h = () => {
      n("before-leave");
    }, f = () => {
      n("after-enter");
    }, d = () => {
      n("update:visible", !1), n("after-leave");
    };
    return t({
      popperRef: l,
      hide: m
    }), (g, p) => (P(), X(i(oi), ge({
      ref_key: "tooltipRef",
      ref: a
    }, g.$attrs, {
      trigger: g.trigger,
      placement: g.placement,
      disabled: g.disabled,
      visible: g.visible,
      transition: g.transition,
      "popper-options": g.popperOptions,
      tabindex: g.tabindex,
      content: g.content,
      offset: g.offset,
      "show-after": g.showAfter,
      "hide-after": g.hideAfter,
      "auto-close": g.autoClose,
      "show-arrow": g.showArrow,
      "aria-label": g.title,
      effect: g.effect,
      enterable: g.enterable,
      "popper-class": i(u),
      "popper-style": i(c),
      teleported: g.teleported,
      persistent: g.persistent,
      "gpu-acceleration": i(v),
      "onUpdate:visible": i(o),
      onBeforeShow: y,
      onBeforeHide: h,
      onShow: f,
      onHide: d
    }), {
      content: H(() => [
        g.title ? (P(), F("div", {
          key: 0,
          class: z(i(s).e("title")),
          role: "title"
        }, he(g.title), 3)) : fe("v-if", !0),
        R(g.$slots, "default", {}, () => [
          Ot(he(g.content), 1)
        ])
      ]),
      default: H(() => [
        g.$slots.reference ? R(g.$slots, "reference", { key: 0 }) : fe("v-if", !0)
      ]),
      _: 3
    }, 16, ["trigger", "placement", "disabled", "visible", "transition", "popper-options", "tabindex", "content", "offset", "show-after", "hide-after", "auto-close", "show-arrow", "aria-label", "effect", "enterable", "popper-class", "popper-style", "teleported", "persistent", "gpu-acceleration", "onUpdate:visible"]));
  }
});
var Bi = /* @__PURE__ */ J(ki, [["__file", "popover.vue"]]);
const Qn = (e, t) => {
  const n = t.arg || t.value, r = n == null ? void 0 : n.popperRef;
  r && (r.triggerRef = e);
};
var Li = {
  mounted(e, t) {
    Qn(e, t);
  },
  updated(e, t) {
    Qn(e, t);
  }
};
const ji = "popover", Di = xr(Li, ji), Mi = Ze(Bi, {
  directive: Di
});
const Ki = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "16",
  height: "16",
  class: "icon",
  viewBox: "0 0 1024 1024"
}, Hi = /* @__PURE__ */ G("path", {
  fill: "#D7D7D7",
  d: "M459.015 850.31a110.07 110.07 0 0 1 105.978 0L786.78 971.75a7.68 7.68 0 0 0 5.12.87c5.273-.921 9.727-7.474 8.498-15.103l-41.982-257.983a116.94 116.94 0 0 1 31.487-100.449L968.99 416.157a13.82 13.82 0 0 0 3.583-7.782c1.127-7.628-3.43-13.976-8.703-14.796l-247.744-37.988a112.63 112.63 0 0 1-84.424-63.587L520.605 57.521a11.47 11.47 0 0 0-4.966-5.376c-4.25-2.202-9.472-.358-12.185 5.376l-111.15 234.483a112.63 112.63 0 0 1-84.475 63.587L60.086 393.58a9.16 9.16 0 0 0-5.223 2.919 14.847 14.847 0 0 0 .154 19.66l179.088 182.876c25.804 26.367 37.425 63.792 31.486 100.45L223.61 957.516c-.512 3.175 0 6.451 1.382 9.216 2.816 5.58 7.987 7.27 12.236 4.966l221.787-121.44zm-197.212 166.391c-29.95 16.383-66.915 4.25-82.581-27.032a66.45 66.45 0 0 1-6.144-40.343l41.982-258.034a65.74 65.74 0 0 0-17.56-56.42L18.461 451.944a65.993 65.993 0 0 1-1.024-90.414c9.37-9.983 21.657-16.537 34.866-18.533l247.794-38.04a61.44 61.44 0 0 0 45.924-34.865l111.15-234.484c15-31.64 51.76-44.593 81.966-28.926 12.032 6.195 21.76 16.383 27.647 28.926l111.2 234.484a61.44 61.44 0 0 0 45.924 34.865l247.795 38.04c33.38 5.12 56.522 37.578 51.607 72.546-1.946 13.823-8.192 26.623-17.766 36.401L826.51 634.872c-14.336 14.694-20.94 35.787-17.561 56.47l41.982 257.984c5.631 34.814-16.742 67.785-50.071 73.724a58.88 58.88 0 0 1-38.654-6.4L540.367 895.21a58.88 58.88 0 0 0-56.778 0l-221.786 121.44z"
}, null, -1), Vi = [
  Hi
];
function Ui(e, t) {
  return P(), F("svg", Ki, [...Vi]);
}
const Wi = { render: Ui }, zi = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "16",
  height: "16",
  class: "icon",
  viewBox: "0 0 1024 1024"
}, Ji = /* @__PURE__ */ G("path", {
  fill: "#FFEABB",
  d: "M851.349 383.512c43.677 6.347 61.117 60.021 29.512 90.828l-126.42 123.229a53.25 53.25 0 0 0-15.315 47.133l29.844 174.002c7.461 43.5-38.197 76.673-77.263 56.135l-156.263-82.152a53.25 53.25 0 0 0-49.559 0l-156.263 82.152c-39.066 20.538-84.724-12.635-77.263-56.135l29.844-174.002z"
}, null, -1), qi = /* @__PURE__ */ G("path", {
  fill: "#F9C73D",
  d: "M716.565 911.044c-13.231.001-26.527-3.19-38.817-9.652L521.484 819.24a23.24 23.24 0 0 0-21.638 0l-156.264 82.152c-28.255 14.854-61.848 12.426-87.673-6.336-25.824-18.763-38.515-49.963-33.119-81.424l29.843-174.002a23.25 23.25 0 0 0-6.686-20.579l-126.42-123.229c-22.858-22.281-30.93-54.98-21.066-85.339s35.615-52.069 67.204-56.659l174.708-25.387a23.25 23.25 0 0 0 17.506-12.719l78.131-158.312C450.138 128.783 478.747 111 510.665 111c.002 0-.001 0 0 0 31.92 0 60.526 17.782 74.653 46.406l78.132 158.312a23.25 23.25 0 0 0 17.505 12.719l174.709 25.387c31.589 4.59 57.339 26.301 67.203 56.659s1.792 63.059-21.065 85.339l-126.42 123.229a23.25 23.25 0 0 0-6.687 20.578l29.844 174.003c5.396 31.461-7.294 62.661-33.119 81.424-14.591 10.6-31.667 15.987-48.855 15.988M510.666 171c-4.346 0-15.076 1.263-20.85 12.96l-78.132 158.312a83.23 83.23 0 0 1-62.682 45.542L174.295 413.2c-12.909 1.876-17.426 11.691-18.769 15.824s-3.458 14.728 5.883 23.833l126.419 123.229a83.23 83.23 0 0 1 23.942 73.688l-29.843 174.001c-2.205 12.856 5.734 20.186 9.249 22.74 3.516 2.555 12.939 7.838 24.485 1.77l156.264-82.152a83.23 83.23 0 0 1 77.479 0l156.263 82.152c11.548 6.071 20.97.785 24.485-1.77s11.454-9.884 9.249-22.74l-29.844-174.002a83.24 83.24 0 0 1 23.942-73.687l126.42-123.229c9.341-9.105 7.226-19.7 5.883-23.833s-5.859-13.948-18.769-15.824l-174.708-25.387a83.24 83.24 0 0 1-62.682-45.541L531.514 183.96c-5.773-11.697-16.503-12.96-20.848-12.96"
}, null, -1), Zi = [
  Ji,
  qi
];
function Gi(e, t) {
  return P(), F("svg", zi, [...Zi]);
}
const Qi = { render: Gi }, Yi = O({
  name: "ShowCollect"
}), Xi = /* @__PURE__ */ O({
  ...Yi,
  props: {
    isCollect: { type: Boolean },
    isShow: { type: Boolean }
  },
  setup(e) {
    const t = e;
    return (n, r) => Ct((P(), F("div", null, [
      t.isCollect ? (P(), X(i(Qi), { key: 0 })) : (P(), X(i(Wi), { key: 1 }))
    ], 512)), [
      [Dt, t.isCollect || t.isShow]
    ]);
  }
}), el = { class: "jlg-menu" }, tl = {
  key: 0,
  class: "jlg-menu-logo"
}, nl = { class: "jlg-menu-first-level-menu-icon" }, ol = { class: "jlg-menu-first-level-menu-text" }, rl = { class: "second-level-menu-title" }, sl = ["onMouseenter", "onMouseleave", "onClick"], al = { class: "show-collect" }, il = O({
  name: "JlgMenu"
}), ll = /* @__PURE__ */ O({
  ...il,
  props: {
    menuData: {},
    collectMenuKeys: {},
    menuDataRecord: {},
    defaultActive: {},
    elPopoverProps: {}
  },
  emits: ["collectClick", "threeLevelMenuClick"],
  setup(e, { emit: t }) {
    const n = e, r = t, o = Mt(), s = $(), a = b(() => ({
      title: "title",
      iconClass: "iconClass",
      key: "key",
      children: "children",
      ...n.menuDataRecord ?? {}
    }));
    function l(c) {
      return c.map((u) => ({
        ...u,
        _isShowCollect: !1,
        children: l(u[a.value.children] ?? [])
      }));
    }
    return B(
      () => n.menuData,
      (c) => {
        s.value = l(c);
      },
      {
        deep: !0,
        immediate: !0
      }
    ), (c, u) => {
      const v = rr("dir"), m = Mi;
      return P(), F("div", el, [
        i(o).logo ? (P(), F("div", tl, [
          R(c.$slots, "logo", {}, void 0, !0)
        ])) : fe("", !0),
        G("div", null, [
          (P(!0), F(lt, null, De(i(s), (y) => (P(), X(m, ge({
            key: y[i(a).key],
            placement: "right",
            width: 400,
            trigger: "click",
            teleported: !1
          }, n.elPopoverProps), {
            reference: H(() => {
              var h;
              return [
                G("div", {
                  class: z([
                    "jlg-menu-first-level-menu",
                    ((h = n.defaultActive) == null ? void 0 : h[0]) === y[i(a).key] ? "jlg-menu-first-level-menu-selected" : "jlg-menu-first-level-menu-no-selected"
                  ])
                }, [
                  G("div", nl, [
                    R(c.$slots, "first-menu-icon" + y[i(a).key], {}, () => [
                      y[i(a).iconClass] ? (P(), F("i", {
                        key: 0,
                        class: z(y[i(a).iconClass])
                      }, null, 2)) : fe("", !0)
                    ], !0)
                  ]),
                  G("p", ol, he(y[i(a).title]), 1)
                ], 2)
              ];
            }),
            default: H(() => [
              te(v, { class: "jlg-menu-popover" }, {
                default: H(() => [
                  (P(!0), F(lt, null, De(y[i(a).children], (h) => {
                    var f;
                    return P(), F("div", {
                      key: h[i(a).key],
                      class: z([
                        "second-level-menu",
                        ((f = n.defaultActive) == null ? void 0 : f[1]) === h[i(a).key] ? "jlg-menu-second-level-menu-selected" : "jlg-menu-second-level-menu-no-selected"
                      ])
                    }, [
                      G("div", rl, he(h[i(a).title]), 1),
                      (P(!0), F(lt, null, De(h[i(a).children], (d) => {
                        var g;
                        return P(), F("div", {
                          key: d[i(a).key],
                          class: z([
                            "three-level-menu-title",
                            ((g = n.defaultActive) == null ? void 0 : g[2]) === d[i(a).key] ? "jlg-menu-three-level-menu-selected" : "jlg-menu-three-level-menu-no-selected"
                          ]),
                          onMouseenter: (p) => d._isShowCollect = !0,
                          onMouseleave: (p) => d._isShowCollect = !1,
                          onClick: (p) => r("threeLevelMenuClick", d, [y, h, d])
                        }, [
                          Ot(he(d[i(a).title]) + " ", 1),
                          G("div", al, [
                            te(Xi, {
                              "is-collect": n.collectMenuKeys.some((p) => p === d[i(a).key]),
                              "is-show": d._isShowCollect,
                              onClick: eo((p) => r("collectClick", d, [y, h, d]), ["stop"])
                            }, null, 8, ["is-collect", "is-show", "onClick"])
                          ])
                        ], 42, sl);
                      }), 128))
                    ], 2);
                  }), 128))
                ]),
                _: 2
              }, 1024)
            ]),
            _: 2
          }, 1040))), 128))
        ])
      ]);
    };
  }
});
const Ye = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [r, o] of t)
    n[r] = o;
  return n;
}, dt = /* @__PURE__ */ Ye(ll, [["__scopeId", "data-v-60256795"]]);
dt.install = (e) => {
  e.component(dt.name, dt);
};
const cl = O({
  name: "JlgGridLayout"
}), pt = /* @__PURE__ */ O({
  ...cl,
  props: {
    padding: { default: "0px" },
    flow: {},
    rows: {},
    columns: {},
    gap: { default: "0px" },
    width: { default: "100%" },
    height: { default: "auto" },
    inline: { type: Boolean, default: !1 },
    border: { type: Boolean, default: !1 }
  },
  setup(e) {
    const t = e;
    U("grid-layout-props", t);
    const n = (a, l) => Array.from({ length: l }, () => a).join(" "), r = b(() => n("1fr", t.columns)), o = b(() => n("1fr", t.rows)), s = b(() => ({
      width: t.width,
      height: t.height,
      padding: t.padding,
      display: t.inline ? "inline-grid" : "grid",
      "grid-template-columns": r.value,
      "grid-template-rows": o.value,
      "grid-auto-flow": t.flow,
      gap: t.gap
    }));
    return (a, l) => (P(), F("div", {
      class: "grid-layout",
      style: Et(i(s))
    }, [
      R(a.$slots, "default")
    ], 4));
  }
});
pt.install = (e) => {
  e.component(pt.name, pt);
};
const ul = O({
  name: "JlgGridCell"
}), dl = /* @__PURE__ */ O({
  ...ul,
  props: {
    top: { default: 0 },
    height: { default: 0 },
    width: { default: 0 },
    left: { default: 0 },
    center: { type: Boolean, default: !1 }
  },
  setup(e) {
    const t = e, n = K("grid-layout-props"), r = b(() => ({
      "grid-column": t.left && t.width ? t.left + "/ span " + t.width : "span " + t.width,
      "grid-row": t.top && t.height ? t.top + "/ span " + t.height : "span " + t.height,
      border: n.border ? "1px solid #ccc" : ""
    }));
    return (o, s) => (P(), F("div", {
      class: z(["grid-cell", t.center ? "grid-cell-center" : ""]),
      style: Et(i(r))
    }, [
      R(o.$slots, "default", {}, void 0, !0)
    ], 6));
  }
});
const ft = /* @__PURE__ */ Ye(dl, [["__scopeId", "data-v-14088da3"]]);
ft.install = (e) => {
  e.component(ft.name, ft);
};
const pl = O({
  name: "JlgCollapse"
}), fl = /* @__PURE__ */ O({
  ...pl,
  props: {
    accordion: { type: Boolean, default: !1 },
    modelValue: {},
    border: { type: Boolean, default: !0 }
  },
  setup(e, { expose: t }) {
    const n = e, r = to(), o = Mt(), s = b(() => ({
      ...n,
      ...r
    })), a = $(null), l = "_" + Date.now();
    U("collapseKey", l);
    const c = (m) => {
      var y;
      (y = document.querySelector("#" + l + m)) == null || y.scrollIntoView({
        behavior: "smooth"
      });
    }, u = /* @__PURE__ */ new Set();
    return U("addCollapseItem", (m) => {
      u.add(m);
    }), U("collapseBorder", s.value.border), t({
      _ref: a,
      jumpAnchor: c,
      collapseItems: b(() => Array.from(u))
    }), (m, y) => {
      const h = wi;
      return P(), X(h, ge({
        ref_key: "_ref",
        ref: a
      }, i(s), {
        class: i(s).border ? "" : "is-disable-border"
      }), no({ _: 2 }, [
        De(i(o), (f, d) => ({
          name: d,
          fn: H(() => [
            R(m.$slots, d, {}, void 0, !0)
          ])
        }))
      ]), 1040, ["class"]);
    };
  }
});
const vt = /* @__PURE__ */ Ye(fl, [["__scopeId", "data-v-3c3e6cbc"]]);
vt.install = (e) => {
  e.component(vt.name, vt);
};
const vl = O({
  name: "JlgCollapseItem"
}), ml = /* @__PURE__ */ O({
  ...vl,
  props: {
    title: {},
    name: {},
    disabled: { type: Boolean, default: !1 }
  },
  setup(e, { expose: t }) {
    const n = e, r = to(), o = Mt(), s = b(() => Object.keys(o).filter((m) => m !== "title")), a = $(null), l = b(() => ({
      ...n,
      ...r
    })), c = K("collapseKey"), u = K("addCollapseItem"), v = K("collapseBorder");
    return B(
      () => l.value,
      (m) => {
        m && u(m);
      },
      {
        immediate: !0,
        deep: !0
      }
    ), t({
      _ref: a
    }), (m, y) => {
      const h = Po, f = Ei;
      return P(), X(f, ge({
        id: i(c) + i(l).name,
        ref_key: "_ref",
        ref: a
      }, i(l), {
        class: i(v) ? "" : "is-disable-item-border"
      }), no({
        title: H(() => {
          var d;
          return [
            R(m.$slots, "title", { _ref: i(a) }, () => [
              Ot(he(i(l).title), 1)
            ], !0),
            te(h, {
              class: z(["el-collapse-item__arrow", (d = i(a)) != null && d.isActive ? "is-active" : "", "customize"])
            }, {
              default: H(() => [
                te(i(Tr))
              ]),
              _: 1
            }, 8, ["class"])
          ];
        }),
        _: 2
      }, [
        De(i(s), (d) => ({
          name: d,
          fn: H(() => [
            R(m.$slots, d, {}, void 0, !0)
          ])
        }))
      ]), 1040, ["id", "class"]);
    };
  }
});
const mt = /* @__PURE__ */ Ye(ml, [["__scopeId", "data-v-e2999e52"]]);
mt.install = (e) => {
  e.component(mt.name, mt);
};
const gl = { class: "jlg-flex-layout" }, yl = O({
  name: "JlgFlexLayout"
}), hl = /* @__PURE__ */ O({
  ...yl,
  props: {
    col: {},
    gap: { default: "0px" }
  },
  setup(e) {
    U("flexLayoutProps", e);
    const n = $({});
    return U("flexCellProps", n), U("flexLayoutCollectFlexCellPropsFn", (o) => {
      n.value[o.uid] = {
        uid: o.uid,
        ...o.props
      };
    }), (o, s) => (P(), F("div", gl, [
      R(o.$slots, "default", {}, void 0, !0)
    ]));
  }
});
const gt = /* @__PURE__ */ Ye(hl, [["__scopeId", "data-v-dd4f84ce"]]);
gt.install = (e) => {
  e.component(gt.name, gt);
};
var He = /* @__PURE__ */ ((e) => (e.头部 = "first", e.尾部 = "last", e.中间 = "not", e))(He || {});
const Yn = (e, t) => {
  const n = [];
  let r = {}, o = 0;
  return Object.entries(e).forEach(([s, a]) => {
    o + a.col <= t ? (r[s] = a, o += a.col) : (n.push(Object.assign({}, r)), r = { [s]: a }, o = a.col);
  }), Object.keys(r).length > 0 && n.push(r), n.map((s) => Object.values(s));
}, bl = (e, t) => {
  for (let n = 0; n < e.length; n++) {
    const r = e[n];
    if (r.length > 0) {
      if (r[0].uid === t)
        return { type: He.头部, length: r.length };
      if (r[r.length - 1].uid === t)
        return { type: He.尾部, length: r.length };
    }
  }
  return { type: He.中间, length: 0 };
}, _l = (e, t) => {
  for (let n = 0; n < e.length; n++) {
    const r = e[n];
    for (let o = 0; o < r.length; o++)
      if (r[o].uid === t)
        return r.length;
  }
  return 0;
}, wl = O({
  name: "JlgFlexCell"
}), yt = /* @__PURE__ */ O({
  ...wl,
  props: {
    col: {}
  },
  setup(e) {
    const t = e, n = K("flexLayoutProps"), r = K("flexLayoutCollectFlexCellPropsFn"), o = K("flexCellProps"), s = String((/* @__PURE__ */ new Date()).getTime()), a = b(() => {
      const u = t.col / n.col * 100 + "%", v = parseFloat(n.gap) * (c.value - 1) / c.value, m = `calc(${u} - ${v}${n.gap.replace(/\d+/g, "")})`, { type: y, length: h } = l.value, f = y === He.尾部 || h === 1 ? "0px" : `calc(${n.gap})`;
      return { width: m, marginRight: f };
    }), l = b(() => bl(Yn(o.value, n.col), s)), c = b(() => _l(Yn(o.value, n.col), s));
    return B(
      t,
      (u) => {
        u && r({
          uid: s,
          props: {
            ...u,
            uid: s
          }
        });
      },
      {
        immediate: !0,
        deep: !0
      }
    ), (u, v) => (P(), F("div", {
      class: "jlg-flex-cell",
      style: Et(i(a))
    }, [
      R(u.$slots, "default")
    ], 4));
  }
});
yt.install = (e) => {
  e.component(yt.name, yt);
};
const El = [dt, pt, ft, vt, mt, gt, yt], Lo = function(e) {
  El.forEach((t) => {
    t.name && e.component(t.name, t);
  });
};
typeof window < "u" && window.Vue && (window.JlgUi = { install: Lo });
const Ol = { install: Lo };
export {
  He as E_Cell_Position,
  vt as JlgCollapse,
  mt as JlgCollapseItem,
  yt as JlgFlexCell,
  gt as JlgFlexLayout,
  ft as JlgGridCell,
  pt as JlgGridLayout,
  dt as JlgMenu,
  Ol as default
};
