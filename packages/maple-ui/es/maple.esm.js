import { onMounted as ht, nextTick as Ke, onActivated as Lt, computed as O, ref as k, watch as pe, isRef as yb, onBeforeUnmount as da, onDeactivated as $o, onUnmounted as _o, getCurrentInstance as Qt, inject as Zs, reactive as en, unref as Rp, provide as Js, isVNode as wb, defineComponent as ne, h as er, Comment as Lp, Fragment as Ae, createApp as kb, onBeforeMount as $b, createVNode as Z, Teleport as it, Transition as _e, withDirectives as Ue, vShow as xn, mergeProps as Ye, openBlock as g, createElementBlock as C, normalizeClass as m, createBlock as ke, resolveDynamicComponent as xt, normalizeStyle as G, resolveComponent as oe, resolveDirective as Je, createCommentVNode as q, createElementVNode as V, toDisplayString as se, withCtx as ue, renderSlot as F, renderList as Xe, useSlots as Vp, createTextVNode as De, onUpdated as nr, normalizeProps as Wt, guardReactiveProps as pa, createSlots as qt, withModifiers as Tn, vModelText as Cb, withKeys as Wu, TransitionGroup as Sb, toRefs as zb } from "vue";
function Qs(e) {
  return { all: e = e || /* @__PURE__ */ new Map(), on: function(n, t) {
    var o = e.get(n);
    o ? o.push(t) : e.set(n, [t]);
  }, off: function(n, t) {
    var o = e.get(n);
    o && (t ? o.splice(o.indexOf(t) >>> 0, 1) : e.set(n, []));
  }, emit: function(n, t) {
    var o = e.get(n);
    o && o.slice().map(function(r) {
      r(t);
    }), (o = e.get("*")) && o.slice().map(function(r) {
      r(n, t);
    });
  } };
}
const Pb = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Qs
}, Symbol.toStringTag, { value: "Module" }));
var xs = Object.defineProperty, Ob = Object.defineProperties, Eb = Object.getOwnPropertyDescriptor, Tb = Object.getOwnPropertyDescriptors, Bb = Object.getOwnPropertyNames, Ku = Object.getOwnPropertySymbols, Fp = Object.prototype.hasOwnProperty, Mb = Object.prototype.propertyIsEnumerable, qu = (e, n, t) => n in e ? xs(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t, Up = (e, n) => {
  for (var t in n || (n = {}))
    Fp.call(n, t) && qu(e, t, n[t]);
  if (Ku)
    for (var t of Ku(n))
      Mb.call(n, t) && qu(e, t, n[t]);
  return e;
}, jp = (e, n) => Ob(e, Tb(n)), Hp = (e, n) => {
  for (var t in n)
    xs(e, t, { get: n[t], enumerable: !0 });
}, Db = (e, n, t, o) => {
  if (n && typeof n == "object" || typeof n == "function")
    for (let r of Bb(n))
      !Fp.call(e, r) && r !== t && xs(e, r, { get: () => n[r], enumerable: !(o = Eb(n, r)) || o.enumerable });
  return e;
}, Yp = (e, n, t) => (Db(e, n, "default"), t), Wp = {};
Hp(Wp, {
  NOOP: () => y0,
  assert: () => xp,
  at: () => tr,
  baseRound: () => ba,
  call: () => S,
  camelize: () => va,
  cancelAnimationFrame: () => po,
  ceil: () => M0,
  chunk: () => Gb,
  clamp: () => $n,
  clampArrayRange: () => Kp,
  classes: () => nu,
  cloneDeep: () => w0,
  cloneDeepWith: () => dm,
  copyText: () => om,
  createNamespaceFn: () => ou,
  createStorage: () => ga,
  debounce: () => b0,
  delay: () => Ib,
  difference: () => xb,
  differenceWith: () => Xr,
  doubleRaf: () => bn,
  download: () => cm,
  ensurePrefix: () => s0,
  ensureSuffix: () => u0,
  find: () => _p,
  floor: () => gl,
  genNumberKey: () => Xb,
  genStringKey: () => d0,
  getAllParentScroller: () => am,
  getGlobalThis: () => or,
  getParentScroller: () => ru,
  getRect: () => nn,
  getScrollLeft: () => ar,
  getScrollTop: () => vt,
  getStyle: () => Zn,
  groupBy: () => e0,
  hasOwn: () => Xt,
  inBrowser: () => et,
  inMobile: () => Vo,
  inViewport: () => au,
  intersection: () => _b,
  intersectionWith: () => nm,
  isArray: () => je,
  isArrayBuffer: () => Lr,
  isBlob: () => Yb,
  isBoolean: () => rr,
  isDOMException: () => Ur,
  isDataView: () => Vr,
  isDate: () => Fr,
  isEmpty: () => Wn,
  isEmptyPlainObject: () => Kb,
  isEqual: () => Rb,
  isEqualWith: () => Gp,
  isError: () => Wr,
  isFile: () => Hb,
  isFunction: () => vn,
  isMap: () => jr,
  isNonEmptyArray: () => Lb,
  isNullish: () => Vb,
  isNumber: () => zn,
  isNumeric: () => ma,
  isObject: () => ft,
  isPlainObject: () => Ln,
  isPrimitive: () => Wb,
  isPromise: () => Fb,
  isRegExp: () => Yr,
  isSet: () => Hr,
  isString: () => un,
  isSymbol: () => Ub,
  isTruthy: () => jb,
  isTypedArray: () => Kr,
  isWeakMap: () => Zp,
  isWeakSet: () => Jp,
  isWindow: () => fa,
  kebabCase: () => tu,
  localStorage: () => sm,
  lowerFirst: () => p0,
  mapObject: () => i0,
  maxBy: () => S0,
  mean: () => O0,
  meanBy: () => E0,
  merge: () => k0,
  mergeWith: () => pm,
  minBy: () => z0,
  mitt: () => Qs,
  motion: () => iu,
  normalizeToArray: () => dt,
  objectToString: () => Xp,
  omit: () => r0,
  omitBy: () => a0,
  once: () => h0,
  pascalCase: () => rm,
  pick: () => t0,
  pickBy: () => o0,
  prettyJSONObject: () => im,
  preventDefault: () => Re,
  promiseWithResolvers: () => l0,
  raf: () => pt,
  randomColor: () => f0,
  randomNumber: () => qp,
  randomString: () => v0,
  removeArrayBlank: () => em,
  removeArrayEmpty: () => Qb,
  removeItem: () => Mt,
  requestAnimationFrame: () => Dt,
  round: () => B0,
  sample: () => T0,
  sessionStorage: () => lm,
  shuffle: () => Jb,
  slash: () => g0,
  sum: () => fm,
  sumBy: () => vm,
  sumHash: () => P0,
  supportTouch: () => Qp,
  throttle: () => ha,
  times: () => Ab,
  toArrayBuffer: () => $0,
  toDataURL: () => mm,
  toNumber: () => Y,
  toRawType: () => Ze,
  toText: () => C0,
  toTypeString: () => _s,
  toggleItem: () => Zb,
  tryParseJSON: () => um,
  uniq: () => vl,
  uniqBy: () => qr,
  upperFirst: () => m0,
  xor: () => n0,
  xorWith: () => tm
});
function tr(e, n) {
  if (e.length)
    return n < 0 && (n += e.length), e[n];
}
function $n(e, n, t) {
  return Math.min(t, Math.max(n, e));
}
function Kp(e, n) {
  return $n(e, 0, n.length - 1);
}
function Ib(e) {
  return new Promise((n) => {
    setTimeout(n, e);
  });
}
function qp(e = 0, n = 100) {
  return Math.floor(Math.random() * (n - e + 1)) + e;
}
function Ab(e, n) {
  return Array.from({ length: e }, (t, o) => n(o));
}
function et() {
  return typeof window < "u";
}
function or() {
  return typeof globalThis < "u" ? globalThis : et() ? window : typeof global < "u" ? global : self;
}
var { hasOwnProperty: Nb } = Object.prototype;
function Xt(e, n) {
  return Nb.call(e, n);
}
function Vo() {
  return et() && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}
function je(e) {
  return Array.isArray(e);
}
var Xp = Object.prototype.toString;
function _s(e) {
  return Xp.call(e);
}
function Ze(e) {
  return _s(e).slice(8, -1);
}
function Lr(e) {
  return Ze(e) === "ArrayBuffer";
}
function rr(e) {
  return typeof e == "boolean";
}
function Vr(e) {
  return Ze(e) === "DataView";
}
function Fr(e) {
  return Ze(e) === "Date";
}
function Ur(e) {
  return Ze(e) === "DOMException";
}
function Wn(e) {
  return e == null || e === "" || je(e) && !e.length;
}
function jr(e) {
  return Ze(e) === "Map";
}
function Ln(e) {
  return Ze(e) === "Object";
}
function Hr(e) {
  return Ze(e) === "Set";
}
function ft(e) {
  return typeof e == "object" && e !== null;
}
function Yr(e) {
  return Ze(e) === "RegExp";
}
function Wr(e) {
  return Ze(e) === "Error";
}
function Kr(e) {
  return [
    "Int8Array",
    "Uint8Array",
    "Uint8ClampedArray",
    "Int16Array",
    "Uint16Array",
    "Int32Array",
    "Uint32Array",
    "Float32Array",
    "Float64Array",
    "BigInt64Array",
    "BigUint64Array"
  ].includes(Ze(e));
}
function Gp(e, n, t) {
  const o = /* @__PURE__ */ new WeakMap(), r = /* @__PURE__ */ new WeakMap();
  function a(i, l, s, u) {
    if (t(i, l) === !0 || i === l || i !== i && l !== l)
      return !0;
    if (!ft(i) || !ft(l))
      return i === l;
    if (i.constructor !== l.constructor)
      return !1;
    if (Ze(i) === "String" && Ze(l) === "String" || Ze(i) === "Number" && Ze(l) === "Number" || Ze(i) === "Boolean" && Ze(l) === "Boolean" || Ze(i) === "BigInt" && Ze(l) === "BigInt" || Ze(i) === "Symbol" && Ze(l) === "Symbol")
      return i.valueOf() === l.valueOf();
    if (Fr(i) && Fr(l))
      return i.getTime() === l.getTime();
    if (Yr(i) && Yr(l))
      return i.source === l.source && i.flags === l.flags;
    if (Wr(i) && Wr(l))
      return i.name === l.name && i.message === l.message && i.cause === l.cause;
    if (Ur(i) && Ur(l))
      return i.name === l.name && i.message === l.message;
    if (Kr(i) && Kr(l) || Vr(i) && Vr(l)) {
      if (i.byteLength !== l.byteLength)
        return !1;
      const d = new Uint8Array(i.buffer), p = new Uint8Array(l.buffer);
      return d.every((f, h) => f === p[h]);
    }
    if (Lr(i) && Lr(l)) {
      if (i.byteLength !== l.byteLength)
        return !1;
      const d = new Uint8Array(i), p = new Uint8Array(l);
      return d.every((f, h) => f === p[h]);
    }
    if (s.get(i) === l && u.get(l) === i)
      return !0;
    if (s.set(i, l), u.set(l, i), jr(i) && jr(l) || Hr(i) && Hr(l)) {
      if (i.size !== l.size)
        return !1;
      const d = [...i], p = [...l], f = d.every((h, v) => a(h, p[v], s, u));
      return s.delete(i), u.delete(l), f;
    }
    if (je(i) && je(l)) {
      if (i.length !== l.length)
        return !1;
      const d = i.every((p, f) => a(p, l[f], s, u));
      return s.delete(i), u.delete(l), d;
    }
    if (Ln(i) && Ln(l)) {
      const d = [...Object.keys(i), ...Object.getOwnPropertySymbols(i)], p = [...Object.keys(l), ...Object.getOwnPropertySymbols(l)];
      if (d.length !== p.length)
        return !1;
      const f = d.every(
        (h) => a(i[h], l[h], s, u)
      );
      return s.delete(i), u.delete(l), f;
    }
    return !1;
  }
  return a(e, n, o, r);
}
function Rb(e, n) {
  return Gp(e, n, () => {
  });
}
function vn(e) {
  return typeof e == "function";
}
function Lb(e) {
  return je(e) && !!e.length;
}
function Vb(e) {
  return e == null;
}
function zn(e) {
  return typeof e == "number";
}
function un(e) {
  return typeof e == "string";
}
function ma(e) {
  return zn(e) || un(e) && /^[-+]?\d+$/.test(e);
}
function Fb(e) {
  return ft(e) && vn(e.then) && vn(e.catch);
}
function Ub(e) {
  return typeof e == "symbol";
}
function jb(e) {
  return !!e;
}
function Zp(e) {
  return Ze(e) === "WeakMap";
}
function Jp(e) {
  return Ze(e) === "WeakSet";
}
function fa(e) {
  return e === window;
}
function Qp() {
  return et() && "ontouchstart" in window;
}
function Hb(e) {
  return Ze(e) === "File";
}
function Yb(e) {
  return Ze(e) === "Blob";
}
function Wb(e) {
  return e == null || typeof e != "object" && typeof e != "function";
}
function Kb(e) {
  return Ln(e) && Object.keys(e).length === 0 && Object.getOwnPropertySymbols(e).length === 0;
}
function xp(e, n) {
  if (!e)
    throw new Error(n);
}
function Y(e) {
  return e == null ? 0 : un(e) ? (e = parseFloat(e), e = Number.isNaN(e) ? 0 : e, e) : rr(e) ? Number(e) : e;
}
var qb = 0;
function Xb() {
  return qb++;
}
function Gb(e, n = 1) {
  n = $n(n, 1, e.length);
  const t = [];
  let o = 0;
  for (; o < e.length; )
    t.push(e.slice(o, o + n)), o += n;
  return t;
}
function Mt(e, n) {
  if (e.length) {
    const t = e.indexOf(n);
    if (t > -1)
      return e.splice(t, 1);
  }
}
function Zb(e, n) {
  return e.includes(n) ? Mt(e, n) : e.push(n), e;
}
function vl(e) {
  return [...new Set(e)];
}
function qr(e, n) {
  return e.reduce((t, o) => (t.findIndex((a) => n(o, a)) === -1 && t.push(o), t), []);
}
function _p(e, n, t = "start") {
  let o = t === "start" ? 0 : e.length - 1;
  for (; e.length > 0 && o >= 0 && o <= e.length - 1; ) {
    if (n(e[o], o, e))
      return [e[o], o];
    t === "start" ? o++ : o--;
  }
  return [null, -1];
}
function Jb(e) {
  for (let n = e.length - 1; n > 0; n--) {
    const t = Math.floor(Math.random() * (n + 1));
    [e[n], e[t]] = [e[t], e[n]];
  }
  return e;
}
function em(e) {
  return e.filter((n) => n != null);
}
function Qb(e) {
  return e.filter((n) => n != null && n !== "");
}
function dt(e) {
  return je(e) ? e : [e];
}
function Xr(e, ...n) {
  const t = tr(n, -1), o = n.slice(0, -1).reduce((r, a) => [...r, ...a], []);
  return e.filter((r) => !o.some((a) => t(r, a)));
}
function xb(e, ...n) {
  return Xr(e, ...n, (t, o) => t === o);
}
function nm(...e) {
  const n = tr(e, -1), t = e.slice(0, -1);
  if (t.length === 0)
    return [];
  if (t.length === 1)
    return qr(t[0], n);
  function o(r, a) {
    return r.filter((i) => a.some((l) => n(i, l)));
  }
  return qr(
    t.reduce((r, a) => o(r, a)),
    n
  );
}
function _b(...e) {
  return nm(...e, (n, t) => n === t);
}
function e0(e, n) {
  return e.reduce(
    (t, o) => {
      var r;
      const a = n(o);
      return ((r = t[a]) != null ? r : t[a] = []).push(o), t;
    },
    {}
  );
}
function tm(...e) {
  const n = tr(e, -1), t = e.slice(0, -1);
  return qr(
    t.reduce((o, r) => [...Xr(o, r, n), ...Xr(r, o, n)]),
    n
  );
}
function n0(...e) {
  return tm(...e, (n, t) => n === t);
}
function t0(e, n) {
  return n.reduce(
    (t, o) => (t[o] = e[o], t),
    {}
  );
}
function o0(e, n) {
  return [...Object.keys(e), ...Object.getOwnPropertySymbols(e)].reduce((o, r) => {
    const a = e[r];
    return n(a, r) && (o[r] = a), o;
  }, {});
}
function r0(e, n) {
  return [...Object.keys(e), ...Object.getOwnPropertySymbols(e)].reduce(
    (o, r) => (n.includes(r) || (o[r] = e[r]), o),
    {}
  );
}
function a0(e, n) {
  return [...Object.keys(e), ...Object.getOwnPropertySymbols(e)].reduce((o, r) => {
    const a = e[r];
    return n(a, r) || (o[r] = a), o;
  }, {});
}
function i0(e, n) {
  return Object.entries(e).reduce(
    (t, [o, r]) => {
      const a = n(o, r);
      if (je(a)) {
        const [i, l] = a;
        t[i] = l;
      }
      return t;
    },
    {}
  );
}
function l0() {
  let e, n;
  return { promise: new Promise((o, r) => {
    e = o, n = r;
  }), resolve: e, reject: n };
}
var eu = {};
Hp(eu, {
  cancelAnimationFrame: () => po,
  classes: () => nu,
  copyText: () => om,
  createNamespaceFn: () => ou,
  createStorage: () => ga,
  doubleRaf: () => bn,
  download: () => cm,
  getAllParentScroller: () => am,
  getParentScroller: () => ru,
  getRect: () => nn,
  getScrollLeft: () => ar,
  getScrollTop: () => vt,
  getStyle: () => Zn,
  inViewport: () => au,
  localStorage: () => sm,
  mitt: () => Qs,
  motion: () => iu,
  prettyJSONObject: () => im,
  preventDefault: () => Re,
  raf: () => pt,
  requestAnimationFrame: () => Dt,
  sessionStorage: () => lm,
  tryParseJSON: () => um
});
function po(e) {
  const n = or();
  n.cancelAnimationFrame ? n.cancelAnimationFrame(e) : n.clearTimeout(e);
}
function nu(...e) {
  return e.map((n) => {
    if (je(n)) {
      const [t, o, r = null] = n;
      return t ? o : r;
    }
    return n;
  });
}
function om(e) {
  if (!e)
    return;
  const n = document.createElement("textarea");
  n.value = e, n.style.position = "fixed", n.style.opacity = "0", document.body.appendChild(n), n.select(), document.execCommand("copy"), document.body.removeChild(n);
}
function va(e) {
  return e = e.replace(/-(\w)/g, (n, t) => t.toUpperCase()), e.replace(e.charAt(0), e.charAt(0).toLowerCase());
}
function s0(e, n) {
  return e.startsWith(n) ? e : n + e;
}
function u0(e, n) {
  return e.endsWith(n) ? e : e + n;
}
var c0 = 0;
function d0() {
  return `generated-key-${c0++}`;
}
function tu(e) {
  return e.replace(/([A-Z])/g, " $1").trim().split(" ").join("-").toLowerCase();
}
function rm(e) {
  return va(e).replace(e.charAt(0), e.charAt(0).toUpperCase());
}
function p0(e) {
  return e.charAt(0).toLowerCase() + e.slice(1);
}
function m0(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function f0() {
  const e = "0123456789abcdef";
  let n = "#";
  for (let t = 0; t < 6; t++)
    n += e[Math.floor(Math.random() * 16)];
  return n;
}
function v0(e = 10) {
  let n = t();
  for (; n.length < e; )
    n += t();
  function t() {
    return Math.random().toString(36).slice(2);
  }
  return n.slice(0, e);
}
function g0(e) {
  return e.startsWith("\\\\?\\") ? e : e.replace(/\\/g, "/");
}
function ou(e) {
  return (n) => {
    const t = `${e}-${n}`, o = (r) => r ? r[0] === "$" ? r.replace("$", e) : r.startsWith("--") ? `${t}${r}` : `${t}__${r}` : t;
    return {
      name: rm(t),
      n: o,
      classes: nu
    };
  };
}
function Dt(e) {
  const n = or();
  return n.requestAnimationFrame ? n.requestAnimationFrame(e) : n.setTimeout(e);
}
function bn() {
  return new Promise((e) => {
    Dt(() => {
      Dt(e);
    });
  });
}
function Zn(e) {
  return window.getComputedStyle(e);
}
function ru(e) {
  let n = e;
  for (; n && !(!n.parentNode || (n = n.parentNode, n === document.body || n === document.documentElement)); ) {
    const t = /(scroll|auto)/, { overflowY: o, overflow: r } = Zn(n);
    if (t.test(o) || t.test(r))
      return n;
  }
  return window;
}
function am(e) {
  const n = [];
  let t = e;
  for (; !fa(t); )
    t = ru(t), n.push(t);
  return n;
}
function nn(e) {
  if (fa(e)) {
    const n = e.innerWidth, t = e.innerHeight, o = {
      x: 0,
      y: 0,
      top: 0,
      left: 0,
      right: n,
      bottom: t,
      width: n,
      height: t
    };
    return jp(Up({}, o), {
      toJSON: () => o
    });
  }
  return e.getBoundingClientRect();
}
function ar(e) {
  const n = "scrollLeft" in e ? e.scrollLeft : e.scrollX;
  return Math.max(n, 0);
}
function vt(e) {
  const n = "scrollTop" in e ? e.scrollTop : e.scrollY;
  return Math.max(n, 0);
}
function au(e) {
  const { top: n, bottom: t, left: o, right: r } = nn(e), { width: a, height: i } = nn(window), l = o <= a && r >= 0, s = n <= i && t >= 0;
  return l && s;
}
function im(e) {
  return JSON.stringify(e, null, 2);
}
function Re(e) {
  e.cancelable !== !1 && e.preventDefault();
}
function pt() {
  return new Promise((e) => {
    Dt(e);
  });
}
function ga(e) {
  return jp(Up({}, e), {
    set(n, t) {
      t != null && (un(t) || (t = JSON.stringify(t)), e.setItem(n, t));
    },
    get(n) {
      const t = e.getItem(n);
      try {
        return JSON.parse(t);
      } catch {
        return t;
      }
    },
    remove(n) {
      e.removeItem(n);
    }
  });
}
var lm = ga(or().sessionStorage), sm = ga(or().localStorage);
function um(e) {
  try {
    return JSON.parse(e);
  } catch {
    return;
  }
}
function cm(e, n = "file") {
  const t = document.createElement("a");
  t.style.display = "none", t.href = un(e) ? e : URL.createObjectURL(e), t.download = n, document.body.appendChild(t), t.click(), URL.revokeObjectURL(t.href), document.body.removeChild(t);
}
function iu(e) {
  const {
    from: n,
    to: t,
    duration: o = 300,
    frame: r = () => {
    },
    timingFunction: a = (b) => b,
    onStateChange: i = () => {
    }
  } = e;
  let l = "pending", s = n;
  const u = t - n;
  let c, d, p, f = 0;
  function h() {
    if (l === "running" || l === "finished")
      return;
    $("running");
    const b = performance.now();
    d = d ?? b, f += p != null ? b - p : 0, p = void 0, z();
    function z() {
      c = Dt(() => {
        const P = performance.now() - d - f, B = $n(P / o, 0, 1);
        if (s = u * a(B) + n, B >= 1) {
          $("finished"), r({ value: t, done: !0 });
          return;
        }
        r({ value: s, done: !1 }), z();
      });
    }
  }
  function v() {
    l === "running" && (po(c), $("paused"), p = performance.now());
  }
  function y() {
    po(c), $("pending"), s = n, c = void 0, d = void 0, p = void 0, f = 0;
  }
  function w() {
    return l;
  }
  function $(b) {
    l = b, i(b);
  }
  return {
    start: h,
    pause: v,
    reset: y,
    getState: w
  };
}
Yp(eu, Pb);
Yp(Wp, eu);
function S(e, ...n) {
  if (je(e))
    return e.map((t) => t(...n));
  if (e)
    return e(...n);
}
function h0(e) {
  let n = !1, t;
  return function(...o) {
    return n || (n = !0, t = e.apply(this, o)), t;
  };
}
function b0(e, n = 0) {
  let t;
  return function(...o) {
    t && clearTimeout(t), t = setTimeout(() => {
      e.apply(this, o);
    }, n);
  };
}
function ha(e, n = 200) {
  let t, o = 0;
  return function r(...a) {
    const i = performance.now(), l = i - o;
    o || (o = i), t && clearTimeout(t), l >= n ? (e.apply(this, a), o = i) : t = setTimeout(() => {
      r.apply(this, a);
    }, n - l);
  };
}
function y0() {
}
function dm(e, n) {
  const t = /* @__PURE__ */ new WeakMap();
  function o(i, l) {
    const s = n(i);
    if (s !== void 0)
      return s;
    if (!ft(i))
      return i;
    if (l.has(i))
      return l.get(i);
    if (Fr(i))
      return new Date(i);
    if (Yr(i))
      return new RegExp(i);
    if (jr(i)) {
      const u = /* @__PURE__ */ new Map();
      return l.set(i, u), i.forEach((c, d) => {
        u.set(o(d, l), o(c, l));
      }), u;
    }
    if (Hr(i)) {
      const u = /* @__PURE__ */ new Set();
      return l.set(i, u), i.forEach((c) => {
        u.add(o(c, l));
      }), u;
    }
    if (Ze(i) === "String" || Ze(i) === "Number" || Ze(i) === "Boolean")
      return a(i, i.valueOf());
    if (Zp(i) || Jp(i) || Wr(i) || Ur(i))
      return {};
    if (Kr(i))
      return a(i, r(i.buffer), i.byteOffset, i.length);
    if (Vr(i))
      return a(i, r(i.buffer), i.byteOffset, i.byteLength);
    if (Lr(i))
      return r(i);
    if (je(i)) {
      const u = [];
      return l.set(i, u), i.forEach((c, d) => {
        u[d] = o(c, l);
      }), u;
    }
    if (Ln(i)) {
      const u = Object.create(Reflect.getPrototypeOf(i));
      return l.set(i, u), [...Object.keys(i), ...Object.getOwnPropertySymbols(i)].forEach((d) => {
        u[d] = o(i[d], l);
      }), u;
    }
    return i;
  }
  function r(i) {
    const l = new ArrayBuffer(i.byteLength);
    return new Uint8Array(l).set(new Uint8Array(i)), l;
  }
  function a(i, ...l) {
    return new i.constructor(...l);
  }
  return o(e, t);
}
function w0(e) {
  return dm(e, () => {
  });
}
function pm(e, ...n) {
  const t = tr(n, -1), o = [e, ...n.slice(0, -1)];
  let r = o.length - 1, a = o[r];
  for (; r; )
    a = i(o[r - 1], a, t), r--;
  function i(l, s, u) {
    function c(d, p) {
      for (const f in p)
        if (Xt(p, f)) {
          const h = p[f], v = d[f], y = u(v, h, f, l, s);
          y !== void 0 ? d[f] = y : ft(h) ? ft(v) ? d[f] = c(v, h) : d[f] = c(je(h) ? [] : {}, h) : d[f] = h;
        }
      return d;
    }
    return c(l, s);
  }
  return a;
}
function k0(e, ...n) {
  return pm(e, ...n, () => {
  });
}
function $0(e) {
  return new Promise((n) => {
    const t = new FileReader();
    t.onload = () => {
      n(t.result);
    }, t.readAsArrayBuffer(e);
  });
}
function mm(e) {
  return new Promise((n) => {
    const t = new FileReader();
    t.onload = () => {
      n(t.result);
    }, t.readAsDataURL(e);
  });
}
function C0(e) {
  return new Promise((n) => {
    const t = new FileReader();
    t.onload = () => {
      n(t.result);
    }, t.readAsText(e);
  });
}
function S0(e, n) {
  if (e.length)
    return e.reduce((t, o) => n(t) > n(o) ? t : o, e[0]);
}
function z0(e, n) {
  if (e.length)
    return e.reduce((t, o) => n(t) < n(o) ? t : o, e[0]);
}
function fm(e) {
  return e.reduce((n, t) => n + t, 0);
}
function vm(e, n) {
  return e.reduce((t, o) => t + n(o), 0);
}
function P0(e) {
  function n(o, r) {
    for (let a = 0; a < r.length; a++) {
      const i = r.charCodeAt(a);
      o = (o << 5) - o + i, o |= 0;
    }
    return o < 0 ? o * -2 : o;
  }
  function t(o, r, a, i) {
    return o = n(o, a), o = n(o, _s(r)), o = n(o, typeof r), r === null ? n(o, "null") : r === void 0 ? n(o, "undefined") : ft(r) || vn(r) ? i.includes(r) ? n(o, `[Circular]${a}`) : (i.push(r), o = Object.keys(r).sort().reduce((l, s) => t(l, r[s], s, i), o), vn(r.valueOf) ? n(o, String(r.valueOf())) : o) : n(o, r.toString());
  }
  return t(0, e, "", []).toString(16).padStart(8, "0");
}
function O0(e) {
  return fm(e) / e.length;
}
function E0(e, n) {
  return vm(e, n) / e.length;
}
function T0(e) {
  if (e.length)
    return e[qp(0, e.length - 1)];
}
function B0(e, n = 0) {
  return ba(e, n, Math.round);
}
function ba(e, n = 0, t) {
  return n = $n(n, -292, 292), n ? +`${t(`${e}e${n}`)}e${-n}` : t(e);
}
function gl(e, n = 0) {
  return ba(e, n, Math.floor);
}
function M0(e, n = 0) {
  return ba(e, n, Math.ceil);
}
function Xn(e, n, t) {
  return xp(e, `Maple [${n}]: ${t}`);
}
function D0(e, n) {
  console.warn(`Maple [${e}]: ${n}`);
}
function uo(e, n) {
  console.error(`Maple [${e}]: ${n}`);
}
var I0 = (e) => e ? /^(http)|(\.*\/)/.test(e) : !1, A0 = Object.defineProperty, Gr = Object.getOwnPropertySymbols, gm = Object.prototype.hasOwnProperty, hm = Object.prototype.propertyIsEnumerable, Xu = (e, n, t) => n in e ? A0(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t, N0 = (e, n) => {
  for (var t in n || (n = {}))
    gm.call(n, t) && Xu(e, t, n[t]);
  if (Gr)
    for (var t of Gr(n))
      hm.call(n, t) && Xu(e, t, n[t]);
  return e;
}, R0 = (e, n) => {
  var t = {};
  for (var o in e)
    gm.call(e, o) && n.indexOf(o) < 0 && (t[o] = e[o]);
  if (e != null && Gr)
    for (var o of Gr(e))
      n.indexOf(o) < 0 && hm.call(e, o) && (t[o] = e[o]);
  return t;
};
function yn(e) {
  let n = !1;
  ht(() => {
    e(), Ke(() => {
      n = !0;
    });
  }), Lt(() => {
    n && e();
  });
}
function He(e, n, t, o = {}) {
  if (!et())
    return;
  const { passive: r = !1, capture: a = !1 } = o;
  let i = !1, l = !1;
  const s = (f) => vn(f) ? f() : Rp(f), u = (f) => {
    if (i || l)
      return;
    const h = s(f);
    h && (h.addEventListener(n, t, {
      passive: r,
      capture: a
    }), i = !0);
  }, c = (f) => {
    if (!i || l)
      return;
    const h = s(f);
    h && (h.removeEventListener(n, t, {
      capture: a
    }), i = !1);
  };
  let d;
  yb(e) && (d = pe(
    () => e.value,
    (f, h) => {
      c(h), u(f);
    }
  ));
  const p = () => {
    d == null || d(), c(e), l = !0;
  };
  return yn(() => {
    u(e);
  }), da(() => {
    c(e);
  }), $o(() => {
    c(e);
  }), p;
}
function bm(e, n, t) {
  if (!et())
    return;
  He(document, n, (r) => {
    const a = vn(e) ? e() : Rp(e);
    a && !a.contains(r.target) && t(r);
  });
}
function ir(e) {
  let n = !1;
  $o(() => {
    n = !0, e();
  }), _o(() => {
    n || e();
  });
}
function lu(e) {
  const n = Qt();
  return e in n.provides;
}
function wn(e) {
  if (!lu(e))
    return {
      index: null,
      parentProvider: null,
      bindParent: null
    };
  const t = Zs(e), { childInstances: o, collect: r, clear: a } = t, i = R0(t, ["childInstances", "collect", "clear"]), l = Qt();
  return {
    index: O(() => o.indexOf(l)),
    parentProvider: i,
    bindParent: (c) => {
      ht(() => {
        Ke().then(() => {
          r(l, c);
        });
      }), da(() => {
        Ke().then(() => {
          a(l, c);
        });
      });
    }
  };
}
function L0(e) {
  const n = [], t = (o) => {
    if (o != null && o.component) {
      t(o == null ? void 0 : o.component.subTree);
      return;
    }
    je(o == null ? void 0 : o.children) && o.children.forEach((r) => {
      wb(r) && (n.push(r), t(r));
    });
  };
  return t(e), n;
}
function kn(e) {
  const n = Qt(), t = en([]), o = [], r = O(() => t.length), a = () => {
    const u = L0(n.subTree);
    t.sort((c, d) => u.indexOf(c.vnode) - u.indexOf(d.vnode));
  }, i = (u, c) => {
    t.push(u), o.push(c), a();
  }, l = (u, c) => {
    Mt(t, u), Mt(o, c);
  };
  return {
    length: r,
    childProviders: o,
    bindChildren: (u) => {
      Js(e, N0({
        childInstances: t,
        collect: i,
        clear: l
      }, u));
    }
  };
}
function nt(e) {
  He(() => window, "resize", e, { passive: !0 }), He(() => window, "orientationchange", e, { passive: !0 });
}
function V0(e, n) {
  const t = k(!1);
  return pe(
    e,
    (o) => {
      n === o && (t.value = !0);
    },
    { immediate: !0 }
  ), t;
}
function F0(e, n) {
  if (e > n)
    return "horizontal";
  if (n > e)
    return "vertical";
}
function Co() {
  const e = k(0), n = k(0), t = k(0), o = k(0), r = k(0), a = k(0), i = k(0), l = k(0), s = k(0), u = k(0), c = k(), d = k(!1), p = k(!1), f = k(0), h = k(0);
  let v = null;
  const y = () => {
    e.value = 0, n.value = 0, t.value = 0, o.value = 0, r.value = 0, a.value = 0, i.value = 0, l.value = 0, s.value = 0, u.value = 0, c.value = void 0, d.value = !1, p.value = !1, f.value = 0, h.value = 0;
  };
  return {
    startX: e,
    startY: n,
    deltaX: t,
    deltaY: o,
    offsetX: r,
    offsetY: a,
    prevX: i,
    prevY: l,
    moveX: s,
    moveY: u,
    direction: c,
    touching: d,
    dragging: p,
    startTime: f,
    distance: h,
    resetTouch: y,
    startTouch: (P) => {
      y();
      const { clientX: B, clientY: I } = P.touches[0];
      e.value = B, n.value = I, i.value = B, l.value = I, d.value = !0, f.value = performance.now(), p.value = !1, v && window.cancelAnimationFrame(v);
    },
    moveTouch: (P) => {
      const { clientX: B, clientY: I } = P.touches[0];
      p.value = !0, t.value = B - e.value, o.value = I - n.value, r.value = Math.abs(t.value), a.value = Math.abs(o.value), h.value = Math.sqrt(r.value ** 2 + a.value ** 2), s.value = B - i.value, u.value = I - l.value, c.value || (c.value = F0(r.value, a.value)), i.value = B, l.value = I;
    },
    endTouch: () => {
      d.value = !1, v = window.requestAnimationFrame(() => {
        p.value = !1;
      });
    },
    isReachTop: (P) => vt(P) === 0 && o.value > 0,
    isReachBottom: (P, B = 1) => {
      const { scrollHeight: I, clientHeight: U, scrollTop: L } = P, W = Math.abs(I - L - U);
      return o.value < 0 && W <= B;
    }
  };
}
function ym() {
  const e = Qt(), n = tu(e.type.name), t = k(void 0);
  return ht(() => {
    t.value = `${n}-${e.uid}`;
  }), t;
}
function U0(e = {}) {
  const { initialWidth: n = 0, initialHeight: t = 0 } = e, o = k(n), r = k(t), a = () => {
    et() && (o.value = window.innerWidth, r.value = window.innerHeight);
  };
  return yn(a), nt(a), {
    width: o,
    height: r
  };
}
function Gn(e, n, t = {}) {
  const { passive: o = !0, eventName: r, defaultValue: a, emit: i } = t, l = r ?? `onUpdate:${n.toString()}`, s = () => {
    var d;
    return (d = e[n]) != null ? d : a;
  };
  if (!o)
    return O({
      get() {
        return s();
      },
      set(d) {
        i ? i(l, d) : S(e[l], d);
      }
    });
  const u = k(s());
  let c = !0;
  return pe(
    () => e[n],
    () => {
      c = !1, u.value = s(), Ke(() => {
        c = !0;
      });
    }
  ), pe(
    () => u.value,
    (d) => {
      c && (i ? i(l, d) : S(e[l], d));
    }
  ), u;
}
function j0(e) {
  const n = k(r(e.from)), t = k("pending");
  let o = s();
  function r(u) {
    return vn(u) ? u() : u;
  }
  function a() {
    o.reset(), n.value = r(e.from), t.value = "pending", o = s();
  }
  function i() {
    o.start();
  }
  function l() {
    o.pause();
  }
  function s() {
    return iu({
      from: r(e.from),
      to: r(e.to),
      duration: e.duration ? r(e.duration) : 300,
      timingFunction: e.timingFunction,
      onStateChange(u) {
        t.value = u;
      },
      frame({ value: u, done: c }) {
        var d;
        n.value = u, c && ((d = e.onFinished) == null || d.call(e, n.value));
      }
    });
  }
  return {
    value: n,
    state: t,
    start: i,
    pause: l,
    reset: a
  };
}
var H0 = Object.defineProperty, Y0 = Object.defineProperties, W0 = Object.getOwnPropertyDescriptors, Gu = Object.getOwnPropertySymbols, K0 = Object.prototype.hasOwnProperty, q0 = Object.prototype.propertyIsEnumerable, Zu = (e, n, t) => n in e ? H0(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t, hl = (e, n) => {
  for (var t in n || (n = {}))
    K0.call(n, t) && Zu(e, t, n[t]);
  if (Gu)
    for (var t of Gu(n))
      q0.call(n, t) && Zu(e, t, n[t]);
  return e;
}, X0 = (e, n) => Y0(e, W0(n)), Ju = (e, n, t) => new Promise((o, r) => {
  var a = (s) => {
    try {
      l(t.next(s));
    } catch (u) {
      r(u);
    }
  }, i = (s) => {
    try {
      l(t.throw(s));
    } catch (u) {
      r(u);
    }
  }, l = (s) => s.done ? o(s.value) : Promise.resolve(s.value).then(a, i);
  l((t = t.apply(e, n)).next());
});
function Le(e, n) {
  return je(n) ? n.reduce((t, o) => (t[o] = e[o], t), {}) : e[n];
}
function ae(e, n) {
  const t = n ?? e;
  return t.install = function(o) {
    const { name: r } = e;
    r && o.component(r, e);
  }, t;
}
function le(e, n) {
  e.setPropsDefaults = function(t) {
    Object.entries(t).forEach(([o, r]) => {
      const a = n[o];
      if (a != null) {
        if (Ln(a)) {
          n[o] = X0(hl({}, a), {
            default: r
          });
          return;
        }
        n[o] = {
          type: a,
          default: r
        };
      }
    });
  };
}
function G0(e) {
  const n = kb(e), t = document.createElement("div");
  return document.body.appendChild(t), {
    instance: n.mount(t),
    unmount() {
      n.unmount(), t.parentNode && document.body.removeChild(t);
    }
  };
}
function So(e, n = {}, t = {}) {
  const o = {
    setup() {
      return () => er(e, hl(hl({}, n), t));
    }
  }, { unmount: r } = G0(o);
  return { unmountInstance: r };
}
function wm(e) {
  const n = [];
  return e.forEach((t) => {
    if (t.type !== Lp) {
      if (t.type === Ae && je(t.children)) {
        t.children.forEach((o) => {
          n.push(o);
        });
        return;
      }
      n.push(t);
    }
  }), n;
}
function Qu(e) {
  return Ln(e) && vn(e.safeParseAsync);
}
function Z0(e) {
  return Ln(e) && Xt(e, "success");
}
function Un() {
  const e = k(""), n = (r, a, i) => Ju(this, null, function* () {
    const l = dt(r).filter((u) => Qu(u) || vn(u)), s = yield Promise.all(
      l.map((u) => Qu(u) ? u.safeParseAsync(a) : u(a, i))
    );
    return t(), !s.some((u) => {
      if (Z0(u)) {
        if (u.success === !1)
          return e.value = u.error.issues[0].message, !0;
      } else if (u !== !0)
        return e.value = String(u), !0;
      return !1;
    });
  }), t = () => {
    e.value = "";
  };
  return {
    errorMessage: e,
    validate: n,
    resetValidation: t,
    validateWithTrigger: (r, a, i, l, s) => Ju(this, null, function* () {
      r.includes(a) && (yield n(i, l, s)) && (e.value = "");
    })
  };
}
function J0(e) {
  He(() => window, "hashchange", e), He(() => window, "popstate", e);
}
function _t() {
  const e = k(!1);
  return Lt(() => {
    e.value = !1;
  }), $o(() => {
    e.value = !0;
  }), {
    disabled: e
  };
}
const _ = ou("mp");
function R(e) {
  return {
    type: [Function, Array],
    default: e
  };
}
function pn(e, n) {
  return e === !1 ? null : (e === !0 && n && (e = n), `mp-elevation--${e}`);
}
const lr = ne({
  props: {
    is: {
      type: [String, Object]
    },
    tag: {
      type: String,
      default: "span"
    }
  },
  setup(e) {
    return () => un(e.is) ? er(e.tag, e.is) : e.is;
  }
});
var km = {
  // Dialog
  dialogTitle: "Hint",
  dialogConfirmButtonText: "Confirm",
  dialogCancelButtonText: "Cancel",
  // ActionSheet
  actionSheetTitle: "Select One",
  // List
  listLoadingText: "Loading",
  listFinishedText: "No more",
  listErrorText: "Load fail",
  // Picker
  pickerTitle: "Pick it",
  pickerConfirmButtonText: "Confirm",
  pickerCancelButtonText: "Cancel",
  // date-picker
  datePickerMonthDict: {
    "01": {
      name: "January",
      abbr: "JAN"
    },
    "02": {
      name: "February",
      abbr: "FEB"
    },
    "03": {
      name: "March",
      abbr: "MAR"
    },
    "04": {
      name: "April",
      abbr: "APR"
    },
    "05": {
      name: "May",
      abbr: "MAY"
    },
    "06": {
      name: "June",
      abbr: "JUN"
    },
    "07": {
      name: "July",
      abbr: "JUL"
    },
    "08": {
      name: "August",
      abbr: "AUG"
    },
    "09": {
      name: "September",
      abbr: "SEP"
    },
    10: {
      name: "October",
      abbr: "OCT"
    },
    11: {
      name: "November",
      abbr: "NOV"
    },
    12: {
      name: "December",
      abbr: "DEC"
    }
  },
  datePickerWeekDict: {
    0: {
      name: "Sunday",
      abbr: "S"
    },
    1: {
      name: "Monday",
      abbr: "M"
    },
    2: {
      name: "Tuesday",
      abbr: "T"
    },
    3: {
      name: "Wednesday",
      abbr: "W"
    },
    4: {
      name: "Thursday",
      abbr: "T"
    },
    5: {
      name: "Friday",
      abbr: "F"
    },
    6: {
      name: "Saturday",
      abbr: "S"
    }
  },
  datePickerSelected: " selected",
  datePickerHint: "SELECT DATE",
  // pagination
  paginationItem: "",
  paginationPage: "page",
  paginationJump: "Go to",
  // time-picker
  timePickerHint: "SELECT TIME"
}, $m = {
  // Dialog
  dialogTitle: "اشاره",
  dialogConfirmButtonText: "تایید",
  dialogCancelButtonText: "لغو",
  // ActionSheet
  actionSheetTitle: "انتخاب یک مورد",
  // List
  listLoadingText: "در حال بارگزاری",
  listFinishedText: "مورد دیگری وجود ندارد",
  listErrorText: "بارگزاری ناموفق",
  // Picker
  pickerTitle: "انتخاب کنید",
  pickerConfirmButtonText: "تایید",
  pickerCancelButtonText: "لغو",
  // date-picker
  datePickerMonthDict: {
    "01": {
      name: "ژانویه",
      abbr: "JAN"
    },
    "02": {
      name: "فوریه",
      abbr: "FEB"
    },
    "03": {
      name: "مارس",
      abbr: "MAR"
    },
    "04": {
      name: "آوریل",
      abbr: "APR"
    },
    "05": {
      name: "مه",
      abbr: "MAY"
    },
    "06": {
      name: "ژوئن",
      abbr: "JUN"
    },
    "07": {
      name: "جولای",
      abbr: "JUL"
    },
    "08": {
      name: "آگوست",
      abbr: "AUG"
    },
    "09": {
      name: "سپتامبر",
      abbr: "SEP"
    },
    10: {
      name: "اوکتبر",
      abbr: "OCT"
    },
    11: {
      name: "نوامبر",
      abbr: "NOV"
    },
    12: {
      name: "دسامبر",
      abbr: "DEC"
    }
  },
  datePickerWeekDict: {
    0: {
      name: "یکشنبه",
      abbr: "S"
    },
    1: {
      name: "دوشنبه",
      abbr: "M"
    },
    2: {
      name: "سه‌شنبه",
      abbr: "T"
    },
    3: {
      name: "چهارشنبه",
      abbr: "W"
    },
    4: {
      name: "پنجشنبه",
      abbr: "T"
    },
    5: {
      name: "جمعه",
      abbr: "F"
    },
    6: {
      name: "شنبه",
      abbr: "S"
    }
  },
  datePickerSelected: " انتخاب شده",
  datePickerHint: "انتخاب تاریخ",
  // pagination
  paginationItem: "",
  paginationPage: "صفحه",
  paginationJump: "برو به",
  // time-picker
  timePickerHint: "انتخاب زمان"
}, Cm = {
  // Dialog
  dialogTitle: "確認",
  dialogConfirmButtonText: "確認",
  dialogCancelButtonText: "キャンセル",
  // ActionSheet
  actionSheetTitle: "いずれかを選択",
  // List
  listLoadingText: "読み込み中",
  listFinishedText: "以上です",
  listErrorText: "読み込み失敗",
  // Picker
  pickerTitle: "選択してください",
  pickerConfirmButtonText: "確認",
  pickerCancelButtonText: "キャンセル",
  // date-picker
  datePickerMonthDict: {
    "01": {
      name: "1月",
      abbr: "1月"
    },
    "02": {
      name: "2月",
      abbr: "2月"
    },
    "03": {
      name: "3月",
      abbr: "3月"
    },
    "04": {
      name: "4月",
      abbr: "4月"
    },
    "05": {
      name: "5月",
      abbr: "5月"
    },
    "06": {
      name: "6月",
      abbr: "6月"
    },
    "07": {
      name: "7月",
      abbr: "7月"
    },
    "08": {
      name: "8月",
      abbr: "8月"
    },
    "09": {
      name: "9月",
      abbr: "9月"
    },
    10: {
      name: "10月",
      abbr: "10月"
    },
    11: {
      name: "11月",
      abbr: "11月"
    },
    12: {
      name: "12月",
      abbr: "12月"
    }
  },
  datePickerWeekDict: {
    0: {
      name: "日曜日",
      abbr: "日"
    },
    1: {
      name: "月曜日",
      abbr: "月"
    },
    2: {
      name: "火曜日",
      abbr: "火"
    },
    3: {
      name: "水曜日",
      abbr: "水"
    },
    4: {
      name: "木曜日",
      abbr: "木"
    },
    5: {
      name: "金曜日",
      abbr: "金"
    },
    6: {
      name: "土曜日",
      abbr: "土"
    }
  },
  datePickerSelected: "件選択済み",
  datePickerHint: "日付を選択",
  // pagination
  paginationItem: "件",
  paginationPage: "ページ",
  paginationJump: "ジャンプ",
  // time-picker
  timePickerHint: "時間を選択"
}, su = {
  // Dialog
  dialogTitle: "提示",
  dialogConfirmButtonText: "确认",
  dialogCancelButtonText: "取消",
  // ActionSheet
  actionSheetTitle: "请选择",
  // List
  listLoadingText: "加载中",
  listFinishedText: "没有更多了",
  listErrorText: "加载失败",
  // Picker
  pickerTitle: "请选择",
  pickerConfirmButtonText: "确认",
  pickerCancelButtonText: "取消",
  // date-picker
  datePickerMonthDict: {
    "01": {
      name: "一月",
      abbr: "一月"
    },
    "02": {
      name: "二月",
      abbr: "二月"
    },
    "03": {
      name: "三月",
      abbr: "三月"
    },
    "04": {
      name: "四月",
      abbr: "四月"
    },
    "05": {
      name: "五月",
      abbr: "五月"
    },
    "06": {
      name: "六月",
      abbr: "六月"
    },
    "07": {
      name: "七月",
      abbr: "七月"
    },
    "08": {
      name: "八月",
      abbr: "八月"
    },
    "09": {
      name: "九月",
      abbr: "九月"
    },
    10: {
      name: "十月",
      abbr: "十月"
    },
    11: {
      name: "十一月",
      abbr: "十一月"
    },
    12: {
      name: "十二月",
      abbr: "十二月"
    }
  },
  datePickerWeekDict: {
    0: {
      name: "星期日",
      abbr: "日"
    },
    1: {
      name: "星期一",
      abbr: "一"
    },
    2: {
      name: "星期二",
      abbr: "二"
    },
    3: {
      name: "星期三",
      abbr: "三"
    },
    4: {
      name: "星期四",
      abbr: "四"
    },
    5: {
      name: "星期五",
      abbr: "五"
    },
    6: {
      name: "星期六",
      abbr: "六"
    }
  },
  datePickerSelected: "个被选择",
  datePickerHint: "选择日期",
  // pagination
  paginationItem: "条",
  paginationPage: "页",
  paginationJump: "前往",
  // time-picker
  timePickerHint: "选择时间"
}, uu = {
  // Dialog
  dialogTitle: "提示",
  dialogConfirmButtonText: "確認",
  dialogCancelButtonText: "取消",
  // ActionSheet
  actionSheetTitle: "請選擇",
  // List
  listLoadingText: "載入中",
  listFinishedText: "沒有更多了",
  listErrorText: "載入失敗",
  // Picker
  pickerTitle: "請選擇",
  pickerConfirmButtonText: "確認",
  pickerCancelButtonText: "取消",
  // date-picker
  datePickerMonthDict: {
    "01": {
      name: "一月",
      abbr: "一月"
    },
    "02": {
      name: "二月",
      abbr: "二月"
    },
    "03": {
      name: "三月",
      abbr: "三月"
    },
    "04": {
      name: "四月",
      abbr: "四月"
    },
    "05": {
      name: "五月",
      abbr: "五月"
    },
    "06": {
      name: "六月",
      abbr: "六月"
    },
    "07": {
      name: "七月",
      abbr: "七月"
    },
    "08": {
      name: "八月",
      abbr: "八月"
    },
    "09": {
      name: "九月",
      abbr: "九月"
    },
    10: {
      name: "十月",
      abbr: "十月"
    },
    11: {
      name: "十一月",
      abbr: "十一月"
    },
    12: {
      name: "十二月",
      abbr: "十二月"
    }
  },
  datePickerWeekDict: {
    0: {
      name: "星期日",
      abbr: "日"
    },
    1: {
      name: "星期一",
      abbr: "一"
    },
    2: {
      name: "星期二",
      abbr: "二"
    },
    3: {
      name: "星期三",
      abbr: "三"
    },
    4: {
      name: "星期四",
      abbr: "四"
    },
    5: {
      name: "星期五",
      abbr: "五"
    },
    6: {
      name: "星期六",
      abbr: "六"
    }
  },
  datePickerSelected: "個被選擇",
  datePickerHint: "選擇日期",
  // pagination
  paginationItem: "條",
  paginationPage: "頁",
  paginationJump: "前往",
  // time-picker
  timePickerHint: "選擇時間"
}, Sm = uu, Q0 = Object.defineProperty, xu = Object.getOwnPropertySymbols, x0 = Object.prototype.hasOwnProperty, _0 = Object.prototype.propertyIsEnumerable, _u = (e, n, t) => n in e ? Q0(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t, ec = (e, n) => {
  for (var t in n || (n = {}))
    x0.call(n, t) && _u(e, t, n[t]);
  if (xu)
    for (var t of xu(n))
      _0.call(n, t) && _u(e, t, n[t]);
  return e;
};
function cu() {
  const e = k({}), n = k({}), t = (i, l) => {
    l.lang = i, e.value[i] = l;
  }, o = (i) => {
    if (!e.value[i])
      return console.warn(`The ${i} does not exist. You can mount a language message using the add method`), {};
    n.value = e.value[i];
  };
  return {
    messages: e,
    currentMessage: n,
    add: t,
    use: o,
    merge: (i, l) => {
      if (!e.value[i]) {
        console.warn(`The ${i} does not exist. You can mount a language message using the add method`);
        return;
      }
      e.value[i] = ec(ec({}, e.value[i]), l), o(i);
    },
    t: (i) => {
      if (Xt(n.value, i))
        return n.value[i];
    }
  };
}
const { messages: zm, currentMessage: Pm, add: du, use: pu, merge: Om, t: ln } = cu();
du("zh-CN", su);
pu("zh-CN");
const bM = {
  zhCN: su,
  enUS: km,
  zhTW: uu,
  zhHK: Sm,
  faIR: $m,
  jaJP: Cm,
  messages: zm,
  currentMessage: Pm,
  add: du,
  use: pu,
  merge: Om,
  t: ln,
  useLocale: cu
};
var bl = {
  zhCN: su,
  enUS: km,
  zhTW: uu,
  zhHK: Sm,
  faIR: $m,
  jaJP: Cm,
  messages: zm,
  currentMessage: Pm,
  add: du,
  use: pu,
  merge: Om,
  t: ln,
  useLocale: cu
};
const yl = Symbol("LOCALE_PROVIDER_KEY");
function ey(e) {
  Js(yl, e);
}
function lt() {
  return lu(yl) ? Zs(yl) : { t: null };
}
const Em = {
  locks: {},
  zIndex: 2e3,
  enableRipple: !0
}, yM = en(Em);
var Rn = en(Em);
const { n: nc } = _("");
function Tm() {
  Object.keys(Rn.locks).length <= 0 ? document.body.classList.remove(nc("$--lock")) : document.body.classList.add(nc("$--lock"));
}
function hr(e) {
  Rn.locks[e] = 1, Tm();
}
function br(e) {
  delete Rn.locks[e], Tm();
}
function sr(e, n) {
  const { uid: t } = Qt();
  n && pe(n, (o) => {
    o === !1 ? br(t) : o === !0 && e() === !0 && hr(t);
  }), pe(e, (o) => {
    n && n() === !1 || (o === !0 ? hr(t) : br(t));
  }), $b(() => {
    n && n() === !1 || e() === !0 && hr(t);
  }), _o(() => {
    n && n() === !1 || e() === !0 && br(t);
  }), Lt(() => {
    n && n() === !1 || e() === !0 && hr(t);
  }), $o(() => {
    n && n() === !1 || e() === !0 && br(t);
  });
}
const yt = [];
function mu(e, n) {
  const { uid: t } = Qt();
  pe(e, (i) => {
    i && !a(t) ? r() : setTimeout(() => {
      Mt(yt, a(t));
    });
  }), yn(() => {
    e() && r();
  }), ir(() => {
    Mt(yt, a(t));
  });
  function o() {
    return yt.length === 0 ? !0 : (yt.sort((i, l) => i.zIndex.value - l.zIndex.value), yt[yt.length - 1].uid === t);
  }
  function r() {
    a(t) || yt.push({ uid: t, zIndex: n });
  }
  function a(i) {
    return yt.find((l) => l.uid === i);
  }
  return {
    onStackTop: o
  };
}
function ur(e, n) {
  const t = k(Rn.zIndex);
  return pe(
    e,
    (o) => {
      o && (Rn.zIndex += n, t.value = Rn.zIndex);
    },
    { immediate: !0 }
  ), { zIndex: t };
}
const zo = {
  show: Boolean,
  position: {
    type: String,
    default: "center"
  },
  transition: String,
  overlay: {
    type: Boolean,
    default: !0
  },
  overlayClass: String,
  overlayStyle: Object,
  lockScroll: {
    type: Boolean,
    default: !0
  },
  closeOnClickOverlay: {
    type: Boolean,
    default: !0
  },
  closeOnKeyEscape: {
    type: Boolean,
    default: !0
  },
  defaultStyle: {
    type: Boolean,
    default: !0
  },
  zIndex: Number,
  safeArea: Boolean,
  safeAreaTop: Boolean,
  teleport: {
    type: [String, Object, Boolean],
    default: "body"
  },
  onOpen: R(),
  onOpened: R(),
  onClose: R(),
  onClosed: R(),
  onKeyEscape: R(),
  onClickOverlay: R(),
  "onUpdate:show": R(),
  // internal for Dialog
  onRouteChange: R()
}, Bm = Symbol("POPUP_BIND_POPUP_ITEM_KEY");
function Mm() {
  const { bindParent: e, parentProvider: n, index: t } = wn(Bm);
  return {
    index: t,
    popup: n,
    bindPopup: e
  };
}
function ny() {
  const { bindChildren: e, childProviders: n, length: t } = kn(Bm);
  return {
    length: t,
    popupItems: n,
    bindPopupItems: e
  };
}
var ty = Object.defineProperty, tc = Object.getOwnPropertySymbols, oy = Object.prototype.hasOwnProperty, ry = Object.prototype.propertyIsEnumerable, oc = (e, n, t) => n in e ? ty(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t, ay = (e, n) => {
  for (var t in n || (n = {}))
    oy.call(n, t) && oc(e, t, n[t]);
  if (tc)
    for (var t of tc(n))
      ry.call(n, t) && oc(e, t, n[t]);
  return e;
};
const {
  name: iy,
  n: Hn,
  classes: al
} = _("popup");
var ya = ne({
  name: iy,
  inheritAttrs: !1,
  props: zo,
  setup(e, {
    slots: n,
    attrs: t
  }) {
    const o = V0(() => e.show, !0), {
      zIndex: r
    } = ur(() => e.show, 3), a = O(() => {
      var h;
      return (h = e.zIndex) != null ? h : r.value;
    }), {
      onStackTop: i
    } = mu(() => e.show, a), {
      disabled: l
    } = _t(), {
      bindPopupItems: s
    } = ny();
    sr(() => e.show, () => e.lockScroll), pe(() => e.show, (h) => {
      S(h ? e.onOpen : e.onClose);
    }), s({
      show: O(() => e.show)
    }), He(() => window, "keydown", f), J0(() => S(e.onRouteChange));
    function u() {
      const {
        closeOnClickOverlay: h,
        onClickOverlay: v
      } = e;
      S(v), h && S(e["onUpdate:show"], !1);
    }
    function c() {
      const {
        overlayClass: h = "",
        overlayStyle: v
      } = e;
      return Z("div", {
        class: al(Hn("overlay"), h),
        style: ay({
          zIndex: a.value - 1
        }, v),
        onClick: u
      }, null);
    }
    function d() {
      return Ue(Z("div", Ye({
        class: al(Hn("content"), Hn(`--${e.position}`), [e.defaultStyle, Hn("--content-background-color")], [e.defaultStyle, Hn("$-elevation--3")], [e.safeArea, Hn("--safe-area")], [e.safeAreaTop, Hn("--safe-area-top")]),
        style: {
          zIndex: a.value
        },
        role: "dialog",
        "aria-modal": "true"
      }, t), [o.value && S(n.default)]), [[xn, e.show]]);
    }
    function p() {
      return Z(_e, {
        name: Hn("$-fade"),
        onAfterEnter: e.onOpened,
        onAfterLeave: e.onClosed
      }, {
        default: () => [Ue(Z("div", {
          class: al(Hn("$--box"), Hn(), [!e.overlay, Hn("--pointer-events-none")]),
          style: {
            zIndex: a.value - 2
          }
        }, [e.overlay && c(), Z(_e, {
          name: e.transition || Hn(`$-pop-${e.position}`)
        }, {
          default: () => [d()]
        })]), [[xn, e.show]])]
      });
    }
    function f(h) {
      !i() || h.key !== "Escape" || !e.show || (S(e.onKeyEscape), e.closeOnKeyEscape && (Re(h), S(e["onUpdate:show"], !1)));
    }
    return () => {
      const {
        teleport: h
      } = e;
      return h ? Z(it, {
        to: h,
        disabled: l.value
      }, {
        default: () => [p()]
      }) : p();
    };
  }
});
ae(ya);
le(ya, zo);
const wM = ya;
var It = ya, ly = Object.defineProperty, sy = Object.defineProperties, uy = Object.getOwnPropertyDescriptors, rc = Object.getOwnPropertySymbols, cy = Object.prototype.hasOwnProperty, dy = Object.prototype.propertyIsEnumerable, ac = (e, n, t) => n in e ? ly(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t, Dm = (e, n) => {
  for (var t in n || (n = {}))
    cy.call(n, t) && ac(e, t, n[t]);
  if (rc)
    for (var t of rc(n))
      dy.call(n, t) && ac(e, t, n[t]);
  return e;
}, py = (e, n) => sy(e, uy(n));
const { n: Im } = _("ripple"), ic = 250;
function my(e) {
  const { zIndex: n, position: t } = Zn(e);
  e.style.overflow = "hidden", e.style.overflowX = "hidden", e.style.overflowY = "hidden", t === "static" && (e.style.position = "relative"), n === "auto" && (e.style.zIndex = "1");
}
function lc(e) {
  return "touches" in e;
}
function fy(e, n) {
  const { top: t, left: o } = nn(e), { clientWidth: r, clientHeight: a } = e, i = Math.sqrt(r ** 2 + a ** 2) / 2, l = i * 2, s = lc(n) ? n.touches[0].clientX - o : r / 2, u = lc(n) ? n.touches[0].clientY - t : a / 2, c = (r - i * 2) / 2, d = (a - i * 2) / 2, p = s - i, f = u - i;
  return { x: p, y: f, centerX: c, centerY: d, size: l };
}
function fu(e) {
  const n = this._ripple;
  if (n.removeRipple(), n.disabled || n.tasker || !Rn.enableRipple)
    return;
  const t = () => {
    n.tasker = null;
    const { x: o, y: r, centerX: a, centerY: i, size: l } = fy(this, e), s = document.createElement("div");
    s.classList.add(Im()), s.style.opacity = "0", s.style.transform = `translate(${o}px, ${r}px) scale3d(.3, .3, .3)`, s.style.width = `${l}px`, s.style.height = `${l}px`, n.color && (s.style.backgroundColor = n.color), s.dataset.createdAt = String(performance.now()), my(this), this.appendChild(s), window.setTimeout(() => {
      s.style.transform = `translate(${a}px, ${i}px) scale3d(1, 1, 1)`, s.style.opacity = ".25";
    }, 20);
  };
  n.tasker = window.setTimeout(t, 30);
}
function Zr() {
  const e = this._ripple, n = () => {
    const t = this.querySelectorAll(`.${Im()}`);
    if (!t.length)
      return;
    const o = t[t.length - 1], r = ic - performance.now() + Number(o.dataset.createdAt);
    window.setTimeout(() => {
      o.style.opacity = "0", window.setTimeout(() => {
        var a;
        return (a = o.parentNode) == null ? void 0 : a.removeChild(o);
      }, ic);
    }, r);
  };
  e.tasker ? window.setTimeout(n, 30) : n();
}
function Am() {
  if (!Qp() || !Rn.enableRipple)
    return;
  const e = this._ripple;
  e.tasker && window.clearTimeout(e.tasker), e.tasker = null;
}
let Jr = !1;
function vy(e) {
  Jr || !(e.key === " " || e.key === "Enter") || (fu.call(this, e), Jr = !0);
}
function sc() {
  Jr && (Zr.call(this), Jr = !1);
}
function gy(e, n) {
  var t;
  e._ripple = py(Dm({
    tasker: null
  }, (t = n.value) != null ? t : {}), {
    removeRipple: Zr.bind(e)
  }), e.addEventListener("touchstart", fu, { passive: !0 }), e.addEventListener("touchmove", Am, { passive: !0 }), e.addEventListener("dragstart", Zr, { passive: !0 }), e.addEventListener("keydown", vy), e.addEventListener("keyup", sc), e.addEventListener("blur", sc), document.addEventListener("touchend", e._ripple.removeRipple, { passive: !0 }), document.addEventListener("touchcancel", e._ripple.removeRipple, { passive: !0 }), document.addEventListener("dragend", e._ripple.removeRipple, { passive: !0 });
}
function hy(e) {
  e.removeEventListener("touchstart", fu), e.removeEventListener("touchmove", Am), e.removeEventListener("dragstart", Zr), !(!e._ripple || !e._ripple.removeRipple) && (document.removeEventListener("touchend", e._ripple.removeRipple), document.removeEventListener("touchcancel", e._ripple.removeRipple), document.removeEventListener("dragend", e._ripple.removeRipple));
}
function by(e, n) {
  var t, o, r, a, i, l;
  const s = {
    color: (t = n.value) == null ? void 0 : t.color,
    disabled: (o = n.value) == null ? void 0 : o.disabled
  };
  (s.color !== ((r = e._ripple) == null ? void 0 : r.color) || s.disabled !== ((a = e._ripple) == null ? void 0 : a.disabled)) && (e._ripple = Dm({
    tasker: s.disabled ? null : (i = e._ripple) == null ? void 0 : i.tasker,
    removeRipple: (l = e._ripple) == null ? void 0 : l.removeRipple
  }, s));
}
const Nm = {
  mounted: gy,
  unmounted: hy,
  updated: by,
  install(e) {
    e.directive("ripple", this);
  }
}, kM = Nm;
var an = Nm;
function Rm(e) {
  return e ? !!(e === "desktop" && Vo() || e === "mobile" && !Vo()) : !1;
}
function yy(e) {
  const n = e.getAttribute("style");
  return n ? n.split(";").filter(Boolean).reduce(
    (t, o) => {
      const [r, a] = o.split(":").map((i) => i.trim());
      return t[va(r)] = a, t;
    },
    {}
  ) : {};
}
function wy(e) {
  const { value: n } = e._hover, t = yy(e);
  Object.keys(n).forEach((o) => {
    const r = va(o);
    n[r] != null && t[r] && (e._hover.rawStyle[r] = t[r]);
  });
}
function vu(e, n) {
  Object.keys(n).forEach((t) => {
    const o = n[t];
    o != null && (e.style[t] = o);
  });
}
function ky(e) {
  Object.keys(e._hover.value).forEach((n) => {
    e._hover.value[n] != null && (e.style[n] = "");
  });
}
function Lm(e) {
  (e == null ? void 0 : e._hover) != null && (ky(e), vu(e, e._hover.rawStyle));
}
function Vm() {
  const { value: e } = this._hover;
  if (this._hover.hovering = !0, vn(e)) {
    e(this._hover.hovering);
    return;
  }
  vu(this, e);
}
function Fm() {
  if (this._hover.hovering = !1, vn(this._hover.value)) {
    this._hover.value(this._hover.hovering);
    return;
  }
  Lm(this);
}
function Um(e, n) {
  var t, o;
  const { arg: r, value: a } = n;
  Rm(r) || (e._hover = {
    value: a,
    hovering: (o = (t = e._hover) == null ? void 0 : t.hovering) != null ? o : !1,
    rawStyle: {}
  }, wy(e), e.addEventListener("mouseenter", Vm), e.addEventListener("mouseleave", Fm));
}
function jm(e, n) {
  Rm(n.arg) || (Lm(e), e.removeEventListener("mouseenter", Vm), e.removeEventListener("mouseleave", Fm));
}
function $y(e, n) {
  e._hover && jm(e, n);
}
function Cy(e, n) {
  return !vn(n.value) && e._hover.hovering;
}
function Sy(e, n) {
  Um(e, n), Cy(e, n) && vu(e, n.value);
}
const Hm = {
  mounted: Um,
  unmounted: jm,
  beforeUpdate: $y,
  updated: Sy,
  install(e) {
    e.directive("hover", this);
  }
}, $M = Hm;
var In = Hm;
const Ym = {
  hovering: Boolean,
  focusing: Boolean
}, { name: zy, n: Py, classes: Oy } = _("hover-overlay");
function Ey(e, n) {
  return g(), C(
    "div",
    {
      class: m(e.classes(e.n(), [e.hovering, e.n("--hovering")], [e.focusing && !e.inMobile(), e.n("--focusing")]))
    },
    null,
    2
    /* CLASS */
  );
}
const Wm = ne({
  name: zy,
  props: Ym,
  setup: () => ({
    n: Py,
    classes: Oy,
    inMobile: Vo
  })
});
Wm.render = Ey;
var wa = Wm;
ae(wa);
le(wa, Ym);
function _n() {
  const e = k(!1);
  return {
    hovering: e,
    handleHovering: (t) => {
      e.value = t;
    }
  };
}
const CM = wa;
var Vn = wa;
function Ty(e) {
  const { left: n } = nn(e);
  return n + (document.body.scrollLeft || document.documentElement.scrollLeft);
}
function uc(e) {
  const { top: n } = nn(e);
  return n + (document.body.scrollTop || document.documentElement.scrollTop);
}
function il(e) {
  const { transform: n } = Zn(e);
  return +n.slice(n.lastIndexOf(",") + 2, n.length - 1);
}
function At(e) {
  let n = e;
  for (; n && !(!n.parentNode || (n = n.parentNode, n === document.body || n === document.documentElement)); ) {
    const t = /(scroll|auto)/, { overflowY: o, overflow: r } = Zn(n);
    if (t.test(o) || t.test(r))
      return n;
  }
  return window;
}
function By(e) {
  const n = [];
  let t = e;
  for (; !fa(t); )
    t = At(t), n.push(t);
  return n;
}
function Km(e, n) {
  if (un(e)) {
    const t = document.querySelector(e);
    return Xn(!!t, n, "target element cannot found"), t;
  }
  return Xn(ft(e), n, 'type of prop "target" should be an element object'), e;
}
function My() {
  const { width: e, height: n } = nn(window);
  return {
    vw: e,
    vh: n,
    vMin: Math.min(e, n),
    vMax: Math.max(e, n)
  };
}
const Dy = (e) => un(e) && e.endsWith("rem"), Iy = (e) => un(e) && e.endsWith("px") || zn(e), Ay = (e) => un(e) && e.endsWith("vw"), Ny = (e) => un(e) && e.endsWith("vh"), Ry = (e) => un(e) && e.endsWith("vmin"), Ly = (e) => un(e) && e.endsWith("vmax"), tn = (e) => {
  if (ma(e))
    return Number(e);
  if (Iy(e))
    return +e.replace("px", "");
  if (!et())
    return 0;
  const { vw: n, vh: t, vMin: o, vMax: r } = My();
  if (Ay(e))
    return +e.replace("vw", "") * n / 100;
  if (Ny(e))
    return +e.replace("vh", "") * t / 100;
  if (Ry(e))
    return +e.replace("vmin", "") * o / 100;
  if (Ly(e))
    return +e.replace("vmax", "") * r / 100;
  if (Dy(e)) {
    const a = +e.replace("rem", ""), i = Zn(document.documentElement).fontSize;
    return a * parseFloat(i);
  }
  return un(e) ? Y(e) : 0;
}, Te = (e) => {
  if (e != null)
    return ma(e) ? `${e}px` : String(e);
}, On = (e, n = 1) => {
  if (e == null)
    return;
  const t = Te(e), o = t.match(/(vh|%|r?em|px|vw|vmin|vmax)$/)[0];
  return `${parseFloat(t) * n}${o}`;
};
function Fo(e, { top: n = 0, left: t = 0, duration: o = 300, animation: r }) {
  const a = Date.now(), i = vt(e), l = ar(e);
  return new Promise((s) => {
    const u = () => {
      const c = (Date.now() - a) / o;
      if (c < 1) {
        const d = i + (n - i) * r(c), p = l + (t - l) * r(c);
        e.scrollTo(p, d), requestAnimationFrame(u);
      } else
        e.scrollTo(t, n), s();
    };
    requestAnimationFrame(u);
  });
}
function qm(e) {
  return Object.entries(e ?? {}).reduce((n, [t, o]) => {
    const r = t.startsWith("--") ? t : `--${tu(t)}`;
    return n[r] = o, n;
  }, {});
}
function Qr(e) {
  return e === "start" || e === "end" ? `flex-${e}` : e;
}
function Vy(e) {
  let n = e;
  for (; n && n !== document.documentElement; ) {
    if (Zn(n).display === "none")
      return !0;
    n = n.parentNode;
  }
  return !1;
}
const cc = ["button", "input", "select", "textarea", "[tabindex]", "[href]"].map((e) => `${e}:not([disabled])`).join(", ");
function gu(e, n, t, o) {
  const r = Array.from(n.querySelectorAll(cc)).filter(
    (s) => !Vy(s)
  );
  if (!r.length)
    return;
  const a = [e, ...Array.from(e.querySelectorAll(cc))].findIndex(
    (s) => s === document.activeElement
  ) !== -1, i = Array.from(r).findIndex((s) => s === document.activeElement);
  if (t === "ArrowDown") {
    if (a && i === -1 || i === r.length - 1) {
      l(r[0]);
      return;
    }
    if (i !== -1 && i < r.length - 1) {
      l(r[i + 1]);
      return;
    }
  }
  if (t === "ArrowUp") {
    if (a && i === -1 || i === 0) {
      l(r[r.length - 1]);
      return;
    }
    i > 0 && l(r[i - 1]);
  }
  function l(s) {
    o && !o(document.activeElement, s, a) || s.focus();
  }
}
const dn = {
  name: String,
  size: [Number, String],
  color: String,
  namespace: {
    type: String,
    default: "mp-icon"
  },
  transition: {
    type: [Number, String],
    default: 0
  },
  animationClass: String,
  onClick: R()
};
var Fy = (e, n, t) => new Promise((o, r) => {
  var a = (s) => {
    try {
      l(t.next(s));
    } catch (u) {
      r(u);
    }
  }, i = (s) => {
    try {
      l(t.throw(s));
    } catch (u) {
      r(u);
    }
  }, l = (s) => s.done ? o(s.value) : Promise.resolve(s.value).then(a, i);
  l((t = t.apply(e, n)).next());
});
const { name: Uy, n: jy, classes: Hy } = _("icon");
function Yy(e, n) {
  return g(), ke(xt(e.isURL(e.name) ? "img" : "i"), {
    class: m(
      e.classes(
        e.n(),
        [e.namespace !== e.n(), e.namespace],
        `${e.namespace}--set`,
        [e.isURL(e.name), e.n("image"), `${e.namespace}-${e.nextName}`],
        [e.animateInProgress, e.animationClass == null ? e.n("--shrinking") : e.animationClass]
      )
    ),
    style: G({
      color: e.color,
      "transition-duration": `${e.toNumber(e.transition)}ms`,
      width: e.isURL(e.name) ? e.toSizeUnit(e.size) : null,
      height: e.isURL(e.name) ? e.toSizeUnit(e.size) : null,
      fontSize: e.toSizeUnit(e.size)
    }),
    src: e.isURL(e.name) ? e.nextName : null,
    onClick: e.onClick
  }, null, 8, ["class", "style", "src", "onClick"]);
}
const Xm = ne({
  name: Uy,
  props: dn,
  setup(e) {
    const n = k(""), t = k(!1);
    pe(() => e.name, o, { immediate: !0 });
    function o(r, a) {
      return Fy(this, null, function* () {
        const { transition: i } = e;
        if (a == null || Y(i) === 0) {
          n.value = r;
          return;
        }
        t.value = !0, yield Ke(), setTimeout(() => {
          a != null && (n.value = r), t.value = !1;
        }, Y(i));
      });
    }
    return {
      nextName: n,
      animateInProgress: t,
      n: jy,
      classes: Hy,
      isURL: I0,
      toNumber: Y,
      toSizeUnit: Te
    };
  }
});
Xm.render = Yy;
var ka = Xm;
ae(ka);
le(ka, dn);
const SM = ka;
var Qe = ka;
const { name: Wy, n: Ky, classes: qy } = _("action-sheet");
function Xy(e, n) {
  const t = oe("mp-icon"), o = oe("mp-hover-overlay"), r = Je("ripple"), a = Je("hover");
  return Ue((g(), C(
    "div",
    {
      class: m(e.classes(e.n("action-item"), e.className, [e.disabled, e.n("--disabled")])),
      style: G({ color: e.color })
    },
    [
      e.icon ? (g(), ke(t, {
        key: 0,
        "mp-action-sheet-cover": "",
        class: m(e.n("action-icon")),
        namespace: e.namespace,
        name: e.icon,
        size: e.iconSize
      }, null, 8, ["class", "namespace", "name", "size"])) : q("v-if", !0),
      V(
        "div",
        {
          class: m(e.n("action-name"))
        },
        se(e.name),
        3
        /* TEXT, CLASS */
      ),
      Z(o, {
        hovering: e.disabled ? !1 : e.hovering
      }, null, 8, ["hovering"])
    ],
    6
    /* CLASS, STYLE */
  )), [
    [r, { disabled: e.disabled }],
    [a, e.handleHovering, "desktop"]
  ]);
}
const Gm = ne({
  name: Wy,
  components: {
    MpHoverOverlay: Vn,
    MpIcon: Qe
  },
  directives: { Ripple: an, Hover: In },
  props: {
    name: String,
    className: String,
    disabled: Boolean,
    color: String,
    namespace: String,
    iconSize: [String, Number],
    icon: String
  },
  setup() {
    const { hovering: e, handleHovering: n } = _n();
    return {
      hovering: e,
      n: Ky,
      classes: qy,
      handleHovering: n
    };
  }
});
Gm.render = Xy;
var Gy = Gm, Zy = Object.defineProperty, dc = Object.getOwnPropertySymbols, Jy = Object.prototype.hasOwnProperty, Qy = Object.prototype.propertyIsEnumerable, pc = (e, n, t) => n in e ? Zy(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t, xy = (e, n) => {
  for (var t in n || (n = {}))
    Jy.call(n, t) && pc(e, t, n[t]);
  if (dc)
    for (var t of dc(n))
      Qy.call(n, t) && pc(e, t, n[t]);
  return e;
};
const Zm = xy({
  show: Boolean,
  title: String,
  actions: {
    type: Array,
    default: () => []
  },
  closeOnClickAction: {
    type: Boolean,
    default: !0
  },
  onSelect: R(),
  "onUpdate:show": R()
}, Le(zo, [
  "overlay",
  "overlayClass",
  "overlayStyle",
  "lockScroll",
  "closeOnClickOverlay",
  "closeOnKeyEscape",
  "safeArea",
  "teleport",
  "onOpen",
  "onClose",
  "onOpened",
  "onClosed",
  "onClickOverlay",
  // internal for function call closes the dialog
  "onRouteChange",
  "onKeyEscape"
])), { name: _y, n: e1, classes: n1 } = _("action-sheet");
function t1(e, n) {
  const t = oe("mp-action-item"), o = oe("mp-popup");
  return g(), ke(o, {
    show: e.show,
    "onUpdate:show": n[0] || (n[0] = (r) => e.show = r),
    position: "bottom",
    class: m(e.n("popup-radius")),
    overlay: e.overlay,
    "overlay-class": e.overlayClass,
    "overlay-style": e.overlayStyle,
    "lock-scroll": e.lockScroll,
    "close-on-click-overlay": e.closeOnClickOverlay,
    "close-on-key-escape": e.closeOnKeyEscape,
    teleport: e.teleport,
    "safe-area": e.safeArea,
    onOpen: e.onOpen,
    onClose: e.onClose,
    onClosed: e.onClosed,
    onOpened: e.onOpened,
    onRouteChange: e.onRouteChange,
    onKeyEscape: e.onKeyEscape
  }, {
    default: ue(() => [
      V(
        "div",
        Ye({
          class: e.classes(e.n(), e.n("$--box"))
        }, e.$attrs),
        [
          F(e.$slots, "title", {}, () => {
            var r;
            return [
              V(
                "div",
                {
                  class: m(e.n("title"))
                },
                se((r = e.title) != null ? r : (e.pt ? e.pt : e.t)("actionSheetTitle")),
                3
                /* TEXT, CLASS */
              )
            ];
          }),
          F(e.$slots, "actions", {}, () => [
            (g(!0), C(
              Ae,
              null,
              Xe(e.actions, (r) => (g(), ke(t, {
                key: r.name,
                name: r.name,
                namespace: r.namespace,
                icon: r.icon,
                "icon-size": r.iconSize,
                "class-name": r.className,
                color: r.color,
                onClick: (a) => e.handleSelect(r)
              }, null, 8, ["name", "namespace", "icon", "icon-size", "class-name", "color", "onClick"]))),
              128
              /* KEYED_FRAGMENT */
            ))
          ])
        ],
        16
        /* FULL_PROPS */
      )
    ]),
    _: 3
    /* FORWARDED */
  }, 8, ["show", "class", "overlay", "overlay-class", "overlay-style", "lock-scroll", "close-on-click-overlay", "close-on-key-escape", "teleport", "safe-area", "onOpen", "onClose", "onClosed", "onOpened", "onRouteChange", "onKeyEscape"]);
}
const Jm = ne({
  name: _y,
  directives: { Ripple: an },
  components: {
    MpPopup: It,
    MpActionItem: Gy
  },
  inheritAttrs: !1,
  props: Zm,
  setup(e) {
    const n = Gn(e, "show"), { t } = lt();
    function o(r) {
      if (r.disabled)
        return;
      const { closeOnClickAction: a, onSelect: i } = e;
      S(i, r), a && (n.value = !1);
    }
    return {
      show: n,
      pt: t,
      t: ln,
      n: e1,
      classes: n1,
      handleSelect: o
    };
  }
});
Jm.render = t1;
var cr = Jm, o1 = Object.defineProperty, mc = Object.getOwnPropertySymbols, r1 = Object.prototype.hasOwnProperty, a1 = Object.prototype.propertyIsEnumerable, fc = (e, n, t) => n in e ? o1(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t, vc = (e, n) => {
  for (var t in n || (n = {}))
    r1.call(n, t) && fc(e, t, n[t]);
  if (mc)
    for (var t of mc(n))
      a1.call(n, t) && fc(e, t, n[t]);
  return e;
};
let St, hu = {};
function i1(e = {}) {
  return vc(vc({}, hu), e);
}
function Vt(e) {
  return et() ? new Promise((n) => {
    Vt.close();
    const t = en(i1(e));
    t.teleport = "body", St = t;
    const { unmountInstance: o } = So(cr, t, {
      onSelect: (r) => {
        S(t.onSelect, r), n(r);
      },
      onClose: () => {
        S(t.onClose), n("close");
      },
      onClosed: () => {
        S(t.onClosed), o(), St === t && (St = null);
      },
      onRouteChange: () => {
        o(), St === t && (St = null);
      },
      "onUpdate:show": (r) => {
        t.show = r;
      }
    });
    t.show = !0;
  }) : Promise.resolve();
}
Vt.setDefaultOptions = function(e) {
  hu = e;
};
Vt.resetDefaultOptions = function() {
  hu = {};
};
Vt.close = function() {
  if (St != null) {
    const e = St;
    St = null, Ke().then(() => {
      e.show = !1;
    });
  }
};
Vt.Component = cr;
ae(cr);
ae(cr, Vt);
le(Vt, Zm);
const zM = cr;
var wl = Vt;
const Qm = {
  /** 类型，决定状态色与默认图标 */
  type: {
    type: String,
    default: "info"
  },
  /** 视觉变体 */
  variant: {
    type: String,
    default: "standard"
  },
  /** 自定义背景色（覆盖 type 派生背景） */
  color: String,
  /** 标题（也可用 #title 插槽） */
  title: String,
  /** 内容（也可用默认插槽） */
  message: String,
  /** 是否显示关闭按钮 */
  closable: Boolean,
  /** 是否显示左侧图标，默认 true */
  showIcon: {
    type: Boolean,
    default: !0
  },
  /** banner 模式：去除圆角与外边距，常用于页面顶部通栏 */
  banner: Boolean,
  /** 内容是否居中 */
  center: Boolean,
  /** 阴影层级 */
  elevation: {
    type: [Boolean, String, Number],
    default: !1
  },
  /** 关闭点击回调 */
  onClose: R(),
  /** 关闭动画结束后回调 */
  onAfterClose: R()
};
var l1 = Object.defineProperty, s1 = Object.defineProperties, u1 = Object.getOwnPropertyDescriptors, gc = Object.getOwnPropertySymbols, c1 = Object.prototype.hasOwnProperty, d1 = Object.prototype.propertyIsEnumerable, hc = (e, n, t) => n in e ? l1(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t, p1 = (e, n) => {
  for (var t in n || (n = {}))
    c1.call(n, t) && hc(e, t, n[t]);
  if (gc)
    for (var t of gc(n))
      d1.call(n, t) && hc(e, t, n[t]);
  return e;
}, m1 = (e, n) => s1(e, u1(n));
function f1(e, n, t, o, r, a) {
  return g(), ke(_e, {
    name: "mp-zoom-in-top",
    onAfterLeave: o.handleAfterLeave
  }, {
    default: ue(() => [
      o.visible ? (g(), C(
        "div",
        {
          key: 0,
          role: "alert",
          class: m(
            o.classes(
              o.n(),
              o.n("$--box"),
              o.n(`--${e.type}`),
              o.n(`--${e.variant}`),
              [o.hasTitle, o.n("--with-title")],
              [e.banner, o.n("--banner")],
              [e.center, o.n("--center")],
              o.formatElevation(e.elevation, 2)
            )
          ),
          style: G(o.rootStyle)
        },
        [
          o.showIconNode ? (g(), C(
            "div",
            {
              key: 0,
              class: m(o.n("icon"))
            },
            [
              F(e.$slots, "icon", {}, () => [
                Z(o.MpIcon, {
                  name: o.iconTypeMap[e.type] || "information"
                }, null, 8, ["name"])
              ])
            ],
            2
            /* CLASS */
          )) : q("v-if", !0),
          V(
            "div",
            {
              class: m(o.n("body"))
            },
            [
              o.hasTitle ? (g(), C(
                "div",
                {
                  key: 0,
                  class: m(o.n("title"))
                },
                [
                  F(e.$slots, "title", {}, () => [
                    De(
                      se(e.title),
                      1
                      /* TEXT */
                    )
                  ])
                ],
                2
                /* CLASS */
              )) : q("v-if", !0),
              V(
                "div",
                {
                  class: m(o.n("content"))
                },
                [
                  F(e.$slots, "default", {}, () => [
                    De(
                      se(e.message),
                      1
                      /* TEXT */
                    )
                  ])
                ],
                2
                /* CLASS */
              )
            ],
            2
            /* CLASS */
          ),
          e.$slots.action ? (g(), C(
            "div",
            {
              key: 1,
              class: m(o.n("action"))
            },
            [
              F(e.$slots, "action")
            ],
            2
            /* CLASS */
          )) : q("v-if", !0),
          e.closable ? (g(), C(
            "div",
            {
              key: 2,
              role: "button",
              class: m(o.n("close-icon")),
              onClick: o.handleClose
            },
            [
              F(e.$slots, "close-icon", {}, () => [
                Z(o.MpIcon, { name: "close" })
              ])
            ],
            2
            /* CLASS */
          )) : q("v-if", !0)
        ],
        6
        /* CLASS, STYLE */
      )) : q("v-if", !0)
    ]),
    _: 3
    /* FORWARDED */
  });
}
const xm = /* @__PURE__ */ ne(m1(p1({}, {
  name: _("alert").name
}), {
  __name: "Alert",
  props: Qm,
  setup(e, { expose: n }) {
    n();
    const { n: t, classes: o } = _("alert"), r = e, a = Vp(), i = {
      info: "information",
      success: "checkbox-marked-circle",
      warning: "warning",
      danger: "error"
    }, l = k(!0), s = O(() => !!(r.title || a.title)), u = O(() => !!r.showIcon), c = O(() => r.color ? { backgroundColor: r.color } : {});
    function d(h) {
      l.value = !1, S(r.onClose, h);
    }
    function p() {
      S(r.onAfterClose);
    }
    const f = { n: t, classes: o, props: r, slots: a, iconTypeMap: i, visible: l, hasTitle: s, showIconNode: u, rootStyle: c, handleClose: d, handleAfterLeave: p, get MpIcon() {
      return Qe;
    }, get formatElevation() {
      return pn;
    } };
    return Object.defineProperty(f, "__isScriptSetup", { enumerable: !1, value: !0 }), f;
  }
}));
xm.render = f1;
var $a = xm;
ae($a);
le($a, Qm);
const PM = $a;
var kl = $a;
const _m = {
  color: String,
  textColor: String,
  title: String,
  titlePosition: {
    type: String,
    default: "left"
  },
  elevation: {
    type: [Boolean, String, Number],
    default: !0
  },
  round: Boolean,
  image: String,
  imageLinearGradient: String,
  safeAreaTop: Boolean,
  border: Boolean,
  zIndex: {
    type: [Number, String],
    default: 1
  },
  fixed: Boolean,
  placeholder: Boolean
}, { name: v1, n: g1, classes: h1 } = _("app-bar");
function b1(e, n) {
  return g(), C(
    Ae,
    null,
    [
      V(
        "div",
        Ye({
          ref: "appBar",
          class: e.classes(
            e.n(),
            e.n("$--box"),
            [e.safeAreaTop, e.n("--safe-area-top")],
            [e.round, e.n("--round")],
            [e.fixed, e.n("--fixed")],
            [e.border, e.n("--border")],
            e.formatElevation(e.elevation, 3)
          ),
          style: e.rootStyles
        }, e.$attrs),
        [
          V(
            "div",
            {
              class: m(e.n("toolbar"))
            },
            [
              V(
                "div",
                {
                  class: m(e.n("left"))
                },
                [
                  F(e.$slots, "left"),
                  e.titlePosition === "left" ? (g(), C(
                    "div",
                    {
                      key: 0,
                      class: m(e.n("title")),
                      style: G({ paddingLeft: e.paddingLeft })
                    },
                    [
                      F(e.$slots, "default", {}, () => [
                        De(
                          se(e.title),
                          1
                          /* TEXT */
                        )
                      ])
                    ],
                    6
                    /* CLASS, STYLE */
                  )) : q("v-if", !0)
                ],
                2
                /* CLASS */
              ),
              e.titlePosition === "center" ? (g(), C(
                "div",
                {
                  key: 0,
                  class: m(e.n("title"))
                },
                [
                  F(e.$slots, "default", {}, () => [
                    De(
                      se(e.title),
                      1
                      /* TEXT */
                    )
                  ])
                ],
                2
                /* CLASS */
              )) : q("v-if", !0),
              V(
                "div",
                {
                  class: m(e.n("right"))
                },
                [
                  e.titlePosition === "right" ? (g(), C(
                    "div",
                    {
                      key: 0,
                      class: m(e.n("title")),
                      style: G({ paddingRight: e.paddingRight })
                    },
                    [
                      F(e.$slots, "default", {}, () => [
                        De(
                          se(e.title),
                          1
                          /* TEXT */
                        )
                      ])
                    ],
                    6
                    /* CLASS, STYLE */
                  )) : q("v-if", !0),
                  F(e.$slots, "right")
                ],
                2
                /* CLASS */
              )
            ],
            2
            /* CLASS */
          ),
          F(e.$slots, "content")
        ],
        16
        /* FULL_PROPS */
      ),
      e.fixed && e.placeholder ? (g(), C(
        "div",
        {
          key: 0,
          class: m(e.n("placeholder")),
          style: G({ height: e.placeholderHeight })
        },
        null,
        6
        /* CLASS, STYLE */
      )) : q("v-if", !0)
    ],
    64
    /* STABLE_FRAGMENT */
  );
}
const ef = ne({
  name: v1,
  props: _m,
  setup(e, { slots: n }) {
    const t = k(null), o = k(), r = k(), a = k(), i = O(() => {
      const { image: u, color: c, textColor: d, imageLinearGradient: p, zIndex: f } = e;
      return u != null ? {
        "background-image": `${p ? `linear-gradient(${p}), ` : ""}url(${u})`,
        "background-position": "center center",
        "background-size": "cover",
        "z-index": f
      } : {
        background: c,
        color: d,
        "z-index": f
      };
    });
    nt(s), yn(() => {
      l(), s();
    }), nr(l);
    function l() {
      o.value = n.left ? 0 : void 0, r.value = n.right ? 0 : void 0;
    }
    function s() {
      if (!e.fixed || !e.placeholder)
        return;
      const { height: u } = nn(t.value);
      a.value = Te(u);
    }
    return {
      rootStyles: i,
      paddingLeft: o,
      paddingRight: r,
      n: g1,
      classes: h1,
      formatElevation: pn,
      appBar: t,
      placeholderHeight: a
    };
  }
});
ef.render = b1;
var Ca = ef;
ae(Ca);
le(Ca, _m);
const OM = Ca;
var $l = Ca;
const nf = {
  errorMessage: {
    type: String,
    default: ""
  },
  extraMessage: {
    type: String,
    default: ""
  }
}, { name: y1, n: w1 } = _("form-details"), k1 = { key: 0 }, $1 = { key: 0 };
function C1(e, n) {
  return g(), ke(_e, {
    name: e.n()
  }, {
    default: ue(() => [
      e.errorMessage || e.extraMessage || e.$slots["extra-message"] ? (g(), C(
        "div",
        {
          key: 0,
          class: m(e.n())
        },
        [
          V(
            "div",
            {
              class: m(e.n("error-message"))
            },
            [
              Z(_e, {
                name: e.n("message")
              }, {
                default: ue(() => [
                  e.errorMessage ? (g(), C(
                    "div",
                    k1,
                    se(e.errorMessage),
                    1
                    /* TEXT */
                  )) : q("v-if", !0)
                ]),
                _: 1
                /* STABLE */
              }, 8, ["name"])
            ],
            2
            /* CLASS */
          ),
          V(
            "div",
            {
              class: m(e.n("extra-message"))
            },
            [
              Z(_e, {
                name: e.n("message")
              }, {
                default: ue(() => [
                  F(e.$slots, "extra-message", {}, () => [
                    e.extraMessage ? (g(), C(
                      "div",
                      $1,
                      se(e.extraMessage),
                      1
                      /* TEXT */
                    )) : q("v-if", !0)
                  ])
                ]),
                _: 3
                /* FORWARDED */
              }, 8, ["name"])
            ],
            2
            /* CLASS */
          )
        ],
        2
        /* CLASS */
      )) : q("v-if", !0)
    ]),
    _: 3
    /* FORWARDED */
  }, 8, ["name"]);
}
const tf = ne({
  name: y1,
  props: nf,
  setup: () => ({ n: w1 })
});
tf.render = C1;
var Sa = tf;
ae(Sa);
le(Sa, nf);
const EM = Sa;
var Bn = Sa, S1 = Object.defineProperty, z1 = Object.defineProperties, P1 = Object.getOwnPropertyDescriptors, bc = Object.getOwnPropertySymbols, O1 = Object.prototype.hasOwnProperty, E1 = Object.prototype.propertyIsEnumerable, yc = (e, n, t) => n in e ? S1(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t, T1 = (e, n) => {
  for (var t in n || (n = {}))
    O1.call(n, t) && yc(e, t, n[t]);
  if (bc)
    for (var t of bc(n))
      E1.call(n, t) && yc(e, t, n[t]);
  return e;
}, B1 = (e, n) => z1(e, P1(n));
const of = Symbol("FORM_BIND_FORM_ITEM_KEY");
function jn() {
  const { parentProvider: e, index: n, bindParent: t } = wn(of), o = Qt();
  return {
    index: n,
    form: e,
    bindForm: t ? (a) => {
      t(B1(T1({}, a), { instance: o }));
    } : null
  };
}
function M1() {
  const { childProviders: e, length: n, bindChildren: t } = kn(of);
  return {
    length: n,
    formItems: e,
    bindFormItems: t
  };
}
const rf = Symbol("CAROUSEL_BIND_CAROUSEL_ITEM_KEY"), af = Symbol(
  "CAROUSEL_RESIZE_DISPATCHER_BIND_CAROUSEL_RESIZE_LISTENER_KEY"
);
function D1() {
  const { childProviders: e, length: n, bindChildren: t } = kn(
    rf
  );
  return {
    length: n,
    carouselItems: e,
    bindCarouselItems: t
  };
}
function I1() {
  const { childProviders: e, bindChildren: n } = kn(
    af
  );
  return {
    carouselResizeListeners: e,
    bindCarouselResizeListeners: n
  };
}
function A1() {
  const { parentProvider: e, bindParent: n } = wn(
    af
  );
  return {
    carouselResizeDispatcher: e,
    bindCarouselResizeDispatcher: n
  };
}
const za = {
  value: {
    type: null,
    required: !0
  },
  id: {
    type: String,
    default: ""
  },
  isFocusing: Boolean,
  size: {
    type: String,
    default: "normal"
  },
  variant: {
    type: String,
    default: "standard"
  },
  placeholder: String,
  line: {
    type: Boolean,
    default: !0
  },
  hint: {
    type: Boolean,
    default: !0
  },
  hintCenter: {
    type: Boolean,
    default: !0
  },
  textColor: String,
  focusColor: String,
  blurColor: String,
  isError: Boolean,
  formDisabled: Boolean,
  disabled: Boolean,
  clearable: Boolean,
  cursor: String,
  composing: Boolean,
  onClick: R(),
  onClear: R()
};
var N1 = (e, n, t) => new Promise((o, r) => {
  var a = (s) => {
    try {
      l(t.next(s));
    } catch (u) {
      r(u);
    }
  }, i = (s) => {
    try {
      l(t.throw(s));
    } catch (u) {
      r(u);
    }
  }, l = (s) => s.done ? o(s.value) : Promise.resolve(s.value).then(a, i);
  l((t = t.apply(e, n)).next());
});
const { name: R1, n: ll, classes: L1 } = _("field-decorator"), V1 = ["for"];
function F1(e, n) {
  const t = oe("mp-icon");
  return g(), C(
    "div",
    {
      class: m(e.classes(e.n(), e.n("$--box"), e.n(`--${e.variant}`), [e.size === "small", e.n("--small")], [e.disabled, e.n("--disabled")])),
      onClick: n[0] || (n[0] = (...o) => e.handleClick && e.handleClick(...o))
    },
    [
      V(
        "div",
        {
          class: m(
            e.classes(
              e.n("controller"),
              [e.isFocusing, e.n("--focus")],
              [e.isError, e.n("--error")],
              [e.formDisabled || e.disabled, e.n("--disabled")]
            )
          ),
          style: G({
            color: e.color,
            cursor: e.cursor,
            overflow: e.isFloating ? "visible" : "hidden",
            "--mp-field-decorator-middle-offset-left": e.middleOffsetLeft,
            "--mp-field-decorator-middle-offset-width": e.middleOffsetWidth,
            "--mp-field-decorator-middle-offset-height": e.middleOffsetHeight
          })
        },
        [
          V(
            "div",
            {
              class: m(e.classes(e.n("icon"), [!e.hint, e.n("--icon-non-hint")]))
            },
            [
              F(e.$slots, "prepend-icon")
            ],
            2
            /* CLASS */
          ),
          V(
            "div",
            {
              ref: "middleEl",
              class: m(e.classes(e.n("middle"), [!e.hint, e.n("--middle-non-hint")]))
            },
            [
              F(e.$slots, "default")
            ],
            2
            /* CLASS */
          ),
          e.placeholder && e.hint ? (g(), C("label", {
            key: 0,
            class: m(
              e.classes(
                e.n("placeholder"),
                e.n("$--ellipsis"),
                [e.isFocusing, e.n("--focus")],
                [e.hintCenter, e.n("--hint-center")],
                [e.formDisabled || e.disabled, e.n("--disabled")],
                [e.isError, e.n("--error")],
                [e.transitionDisabled, e.n("--transition-disabled")],
                e.computePlaceholderState()
              )
            ),
            style: G({
              color: e.color
            }),
            for: e.id
          }, [
            V(
              "span",
              null,
              se(e.placeholder),
              1
              /* TEXT */
            )
          ], 14, V1)) : q("v-if", !0),
          V(
            "div",
            {
              class: m(e.classes(e.n("icon"), [!e.hint, e.n("--icon-non-hint")]))
            },
            [
              e.clearable && !e.isEmpty(e.value) ? F(e.$slots, "clear-icon", {
                key: 0,
                clear: e.handleClear
              }, () => [
                Z(t, {
                  class: m(e.n("clear-icon")),
                  "mp-field-decorator-cover": "",
                  name: "close-circle",
                  onClick: e.handleClear
                }, null, 8, ["class", "onClick"])
              ]) : q("v-if", !0),
              F(e.$slots, "append-icon")
            ],
            2
            /* CLASS */
          )
        ],
        6
        /* CLASS, STYLE */
      ),
      e.line ? (g(), C(
        Ae,
        { key: 0 },
        [
          e.variant === "outlined" ? (g(), C(
            "fieldset",
            {
              key: 0,
              class: m(
                e.classes(
                  e.n("line"),
                  [e.isFocusing, e.n("--line-focus")],
                  [e.isError, e.n("--line-error")],
                  [e.formDisabled || e.disabled, e.n("--line-disabled")]
                )
              ),
              style: G({ borderColor: e.color })
            },
            [
              V(
                "legend",
                {
                  class: m(e.classes(e.n("line-legend"), [e.isFloating, e.n("line-legend--hint")])),
                  style: G({ width: e.legendWidth })
                },
                [
                  e.placeholder && e.hint ? (g(), ke(it, {
                    key: 0,
                    to: "body"
                  }, [
                    V(
                      "span",
                      {
                        ref: "placeholderTextEl",
                        class: m(
                          e.classes(e.n("placeholder-text"), e.n("$--ellipsis"), [e.size === "small", e.n("placeholder-text--small")])
                        )
                      },
                      se(e.placeholder),
                      3
                      /* TEXT, CLASS */
                    )
                  ])) : q("v-if", !0)
                ],
                6
                /* CLASS, STYLE */
              )
            ],
            6
            /* CLASS, STYLE */
          )) : (g(), C(
            "div",
            {
              key: 1,
              class: m(e.classes(e.n("line"), [e.formDisabled || e.disabled, e.n("--line-disabled")], [e.isError, e.n("--line-error")])),
              style: G({ background: e.isError ? void 0 : e.blurColor })
            },
            [
              V(
                "div",
                {
                  class: m(
                    e.classes(
                      e.n("dot"),
                      [e.isFocusing, e.n("--line-focus")],
                      [e.formDisabled || e.disabled, e.n("--line-disabled")],
                      [e.isError, e.n("--line-error")]
                    )
                  ),
                  style: G({ background: e.isError ? void 0 : e.focusColor })
                },
                null,
                6
                /* CLASS, STYLE */
              )
            ],
            6
            /* CLASS, STYLE */
          ))
        ],
        64
        /* STABLE_FRAGMENT */
      )) : q("v-if", !0)
    ],
    2
    /* CLASS */
  );
}
const lf = ne({
  name: R1,
  components: { MpIcon: Qe },
  props: za,
  setup(e) {
    const n = k(null), t = k(null), o = k(""), r = k("0px"), a = k("0px"), i = k("0px"), l = k(!0), s = O(() => e.hint && (!Wn(e.value) || e.isFocusing)), { popup: u, bindPopup: c } = Mm(), { bindCarouselResizeDispatcher: d } = A1(), p = O(
      () => e.isError ? void 0 : e.isFocusing ? e.focusColor : e.blurColor
    );
    nt(y), yn(() => {
      y(), Ke().then(() => {
        l.value = !1;
      });
    }), nr(y), S(c, null), S(d, {
      onResize() {
        Ke().then(y);
      }
    }), u && pe(
      () => u.show.value,
      (w) => N1(this, null, function* () {
        w && (yield bn(), y());
      })
    );
    function f() {
      const { hint: w, value: $, composing: b } = e;
      if (!w && (!Wn($) || b))
        return ll("--placeholder-hidden");
      if (s.value)
        return ll("--placeholder-hint");
    }
    function h(w) {
      S(e.onClear, w);
    }
    function v(w) {
      S(e.onClick, w);
    }
    function y() {
      if (r.value = `${t.value.offsetLeft}px`, a.value = `${t.value.offsetWidth}px`, i.value = `${t.value.offsetHeight}px`, e.variant === "outlined" && n.value) {
        const w = Zn(n.value), $ = `var(--mp-field-decorator-outlined-${e.size}-placeholder-space)`;
        o.value = `calc(${w.width} * 0.75 + ${$} * 2)`;
      }
    }
    return {
      placeholderTextEl: n,
      middleEl: t,
      middleOffsetLeft: r,
      middleOffsetWidth: a,
      middleOffsetHeight: i,
      color: p,
      legendWidth: o,
      isFloating: s,
      transitionDisabled: l,
      resize: y,
      computePlaceholderState: f,
      n: ll,
      classes: L1,
      isEmpty: Wn,
      handleClear: h,
      handleClick: v
    };
  }
});
lf.render = F1;
var Pa = lf;
ae(Pa);
le(Pa, za);
const TM = Pa;
var Uo = Pa, U1 = Object.defineProperty, j1 = Object.defineProperties, H1 = Object.getOwnPropertyDescriptors, wc = Object.getOwnPropertySymbols, Y1 = Object.prototype.hasOwnProperty, W1 = Object.prototype.propertyIsEnumerable, kc = (e, n, t) => n in e ? U1(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t, K1 = (e, n) => {
  for (var t in n || (n = {}))
    Y1.call(n, t) && kc(e, t, n[t]);
  if (wc)
    for (var t of wc(n))
      W1.call(n, t) && kc(e, t, n[t]);
  return e;
}, q1 = (e, n) => j1(e, H1(n));
const bu = q1(K1({
  modelValue: String,
  modelModifiers: {
    type: Object,
    default: () => ({})
  },
  type: {
    type: String,
    default: "text"
  },
  textarea: Boolean,
  ariaLabel: String,
  rows: {
    type: [String, Number],
    default: 8
  },
  maxlength: [String, Number],
  readonly: Boolean,
  resize: Boolean,
  autofocus: Boolean,
  validateTrigger: {
    type: Array,
    default: () => ["onInput", "onClear"]
  },
  rules: [Array, Function, Object],
  enterkeyhint: String,
  onFocus: R(),
  onBlur: R(),
  onInput: R(),
  onChange: R(),
  onClear: R(),
  "onUpdate:modelValue": R()
}, Le(za, [
  "size",
  "variant",
  "placeholder",
  "line",
  "hint",
  "textColor",
  "focusColor",
  "blurColor",
  "disabled",
  "clearable",
  "onClick"
])), {
  // internal start
  autocomplete: String,
  isForceFocusingEffect: {
    type: Boolean,
    default: void 0
  },
  isForceErrorEffect: {
    type: Boolean,
    default: void 0
  },
  isShowFormDetails: {
    type: Boolean,
    default: !0
  }
  // internal end
}), { name: X1, n: G1, classes: Z1 } = _("input"), J1 = ["aria-label", "placeholder", "enterkeyhint"], Q1 = ["id", "aria-label", "autocomplete", "disabled", "readonly", "type", "value", "placeholder", "maxlength", "rows", "enterkeyhint", "inputmode"], x1 = ["id", "aria-label", "autocomplete", "disabled", "readonly", "type", "value", "placeholder", "maxlength", "enterkeyhint", "inputmode"];
function _1(e, n) {
  const t = oe("mp-field-decorator"), o = oe("mp-form-details");
  return g(), C(
    "div",
    {
      class: m(e.classes(e.n(), e.n("$--box"))),
      onMousedown: n[12] || (n[12] = (...r) => e.handleMousedown && e.handleMousedown(...r))
    },
    [
      Z(
        t,
        Wt(pa({
          value: e.modelValue,
          id: e.id,
          size: e.size,
          variant: e.variant,
          placeholder: e.placeholder,
          ariaLabel: e.ariaLabel,
          line: e.line,
          hint: e.hint,
          textColor: e.textColor,
          focusColor: e.focusColor,
          blurColor: e.blurColor,
          isFocusing: e.isForceFocusingEffect != null ? e.isForceFocusingEffect : e.isFocusing,
          isError: e.isForceErrorEffect != null ? e.isForceErrorEffect : !!e.errorMessage,
          formDisabled: e.formDisabled,
          disabled: e.disabled,
          clearable: e.clearable,
          cursor: e.cursor,
          composing: e.isComposing,
          hintCenter: !e.textarea,
          onClick: e.handleClick,
          onClear: e.handleClear
        })),
        qt({
          "clear-icon": ue(({ clear: r }) => [
            F(e.$slots, "clear-icon", { clear: r })
          ]),
          "append-icon": ue(() => [
            F(e.$slots, "append-icon")
          ]),
          default: ue(() => [
            e.normalizedType === "password" ? (g(), C("input", {
              key: 0,
              tabindex: "-1",
              "aria-label": e.ariaLabel,
              class: m(e.n("autocomplete")),
              placeholder: e.hint ? void 0 : e.placeholder,
              style: G({
                "--mp-input-placeholder-color": e.placeholderColor
              }),
              enterkeyhint: e.enterkeyhint
            }, null, 14, J1)) : q("v-if", !0),
            e.textarea ? (g(), C("textarea", {
              key: 1,
              id: e.id,
              ref: "el",
              "aria-label": e.ariaLabel,
              class: m(
                e.classes(
                  e.n("input"),
                  e.n("--textarea"),
                  [e.formDisabled || e.disabled, e.n("--disabled")],
                  [e.errorMessage, e.n("--error")],
                  [e.errorMessage, e.n("--caret-error")]
                )
              ),
              autocomplete: e.autocomplete ? e.autocomplete : "new-password",
              disabled: e.formDisabled || e.disabled,
              readonly: e.formReadonly || e.readonly,
              type: e.normalizedType,
              value: e.modelValue,
              placeholder: e.hint ? void 0 : e.placeholder,
              maxlength: e.maxlength,
              rows: e.rows,
              enterkeyhint: e.enterkeyhint,
              inputmode: e.type === "number" ? "decimal" : void 0,
              style: G({
                color: e.errorMessage ? void 0 : e.textColor,
                caretColor: e.errorMessage ? void 0 : e.focusColor,
                resize: e.resize ? "vertical" : "none",
                "--mp-input-placeholder-color": e.placeholderColor
              }),
              onFocus: n[0] || (n[0] = (...r) => e.handleFocus && e.handleFocus(...r)),
              onBlur: n[1] || (n[1] = (...r) => e.handleBlur && e.handleBlur(...r)),
              onInput: n[2] || (n[2] = (...r) => e.handleInput && e.handleInput(...r)),
              onChange: n[3] || (n[3] = (...r) => e.handleChange && e.handleChange(...r)),
              onCompositionstart: n[4] || (n[4] = (...r) => e.handleCompositionStart && e.handleCompositionStart(...r)),
              onCompositionend: n[5] || (n[5] = (...r) => e.handleCompositionEnd && e.handleCompositionEnd(...r))
            }, null, 46, Q1)) : (g(), C("input", {
              key: 2,
              id: e.id,
              ref: "el",
              "aria-label": e.ariaLabel,
              class: m(
                e.classes(
                  e.n("input"),
                  [e.formDisabled || e.disabled, e.n("--disabled")],
                  [e.errorMessage, e.n("--error")],
                  [e.errorMessage, e.n("--caret-error")]
                )
              ),
              autocomplete: e.autocomplete ? e.autocomplete : "new-password",
              disabled: e.formDisabled || e.disabled,
              readonly: e.formReadonly || e.readonly,
              type: e.normalizedType,
              value: e.modelValue,
              placeholder: e.hint ? void 0 : e.placeholder,
              maxlength: e.maxlength,
              enterkeyhint: e.enterkeyhint,
              inputmode: e.type === "number" ? "decimal" : void 0,
              style: G({
                color: e.errorMessage ? void 0 : e.textColor,
                caretColor: e.errorMessage ? void 0 : e.focusColor,
                "--mp-input-placeholder-color": e.placeholderColor
              }),
              onFocus: n[6] || (n[6] = (...r) => e.handleFocus && e.handleFocus(...r)),
              onBlur: n[7] || (n[7] = (...r) => e.handleBlur && e.handleBlur(...r)),
              onInput: n[8] || (n[8] = (...r) => e.handleInput && e.handleInput(...r)),
              onChange: n[9] || (n[9] = (...r) => e.handleChange && e.handleChange(...r)),
              onCompositionstart: n[10] || (n[10] = (...r) => e.handleCompositionStart && e.handleCompositionStart(...r)),
              onCompositionend: n[11] || (n[11] = (...r) => e.handleCompositionEnd && e.handleCompositionEnd(...r))
            }, null, 46, x1))
          ]),
          _: 2
          /* DYNAMIC */
        }, [
          e.$slots["prepend-icon"] ? {
            name: "prepend-icon",
            fn: ue(() => [
              F(e.$slots, "prepend-icon")
            ]),
            key: "0"
          } : void 0
        ]),
        1040
        /* FULL_PROPS, DYNAMIC_SLOTS */
      ),
      e.isShowFormDetails ? (g(), ke(o, {
        key: 0,
        "error-message": e.errorMessage,
        "extra-message": e.maxlengthText
      }, qt({
        _: 2
        /* DYNAMIC */
      }, [
        e.$slots["extra-message"] ? {
          name: "extra-message",
          fn: ue(() => [
            F(e.$slots, "extra-message")
          ]),
          key: "0"
        } : void 0
      ]), 1032, ["error-message", "extra-message"])) : q("v-if", !0)
    ],
    34
    /* CLASS, NEED_HYDRATION */
  );
}
const sf = ne({
  name: X1,
  components: {
    MpFormDetails: Bn,
    MpFieldDecorator: Uo
  },
  props: bu,
  setup(e) {
    const n = ym(), t = k(null), o = k(!1), r = k(!1), { bindForm: a, form: i } = jn(), {
      errorMessage: l,
      validateWithTrigger: s,
      validate: u,
      // expose
      resetValidation: c
    } = Un(), d = O(() => e.disabled || e.readonly ? "" : "text"), p = O(() => e.type === "number" ? "text" : e.type), f = O(() => {
      const { maxlength: X, modelValue: te } = e;
      return X ? Wn(te) ? `0 / ${X}` : `${String(te).length}/${X}` : "";
    }), h = O(() => {
      const { hint: X, blurColor: te, focusColor: he } = e;
      if (!X)
        return l.value ? "var(--mp-field-decorator-error-color)" : o.value ? he || "var(--mp-field-decorator-focus-color)" : te || "var(--mp-field-decorator-placeholder-color, var(--mp-field-decorator-blur-color))";
    });
    S(a, {
      reset: M,
      validate: j,
      resetValidation: c
    }), yn(() => {
      e.autofocus && E();
    });
    function y(X) {
      Ke(() => {
        const { validateTrigger: te, rules: he, modelValue: Ie } = e;
        s(te, X, he, Ie);
      });
    }
    function w(X) {
      o.value = !0, S(e.onFocus, X), y("onFocus");
    }
    function $(X) {
      o.value = !1, S(e.onBlur, X), y("onBlur");
    }
    function b(X) {
      const te = X.target;
      let { value: he } = te;
      e.type === "number" && (he = L(he));
      const Ie = N(he);
      return Ie === e.modelValue && (te.value = Ie), Ie;
    }
    function z() {
      r.value = !0;
    }
    function D(X) {
      r.value && (r.value = !1, X.target.dispatchEvent(new Event("input")));
    }
    function P(X) {
      if (r.value)
        return;
      const te = b(X);
      S(e["onUpdate:modelValue"], te), S(e.onInput, te, X), y("onInput");
    }
    function B(X) {
      const te = W(b(X));
      e.modelModifiers.trim && S(e["onUpdate:modelValue"], te), S(e.onChange, te, X), y("onChange");
    }
    function I() {
      const { disabled: X, readonly: te, clearable: he, onClear: Ie } = e;
      i != null && i.disabled.value || i != null && i.readonly.value || X || te || !he || (S(e["onUpdate:modelValue"], ""), S(Ie, ""), y("onClear"));
    }
    function U(X) {
      const { disabled: te, onClick: he } = e;
      i != null && i.disabled.value || te || (S(he, X), y("onClick"));
    }
    function L(X) {
      const te = X.indexOf("-"), he = X.indexOf(".");
      return te > -1 && (X = te === 0 ? "-" + X.replace(/-/g, "") : X.replace(/-/g, "")), he > -1 && (X = X.slice(0, he + 1) + X.slice(he).replace(/\./g, "")), X.replace(/[^-0-9.]/g, "");
    }
    function W(X) {
      return e.modelModifiers.trim ? X.trim() : X;
    }
    function N(X) {
      return e.maxlength ? X.slice(0, Y(e.maxlength)) : X;
    }
    function T(X) {
      const { disabled: te } = e;
      i != null && i.disabled.value || te || X.target === t.value || (E(), Re(X));
    }
    function M() {
      S(e["onUpdate:modelValue"], ""), c();
    }
    function j() {
      return u(e.rules, e.modelValue);
    }
    function E() {
      var X;
      (X = t.value) == null || X.focus();
    }
    function J() {
      t.value.blur();
    }
    return {
      el: t,
      id: n,
      isFocusing: o,
      isComposing: r,
      errorMessage: l,
      placeholderColor: h,
      normalizedType: p,
      cursor: d,
      maxlengthText: f,
      formDisabled: i == null ? void 0 : i.disabled,
      formReadonly: i == null ? void 0 : i.readonly,
      n: G1,
      classes: Z1,
      isEmpty: Wn,
      handleFocus: w,
      handleBlur: $,
      handleInput: P,
      handleChange: B,
      handleClear: I,
      handleClick: U,
      handleCompositionStart: z,
      handleCompositionEnd: D,
      handleMousedown: T,
      validate: j,
      resetValidation: c,
      reset: M,
      focus: E,
      blur: J
    };
  }
});
sf.render = _1;
var Oa = sf;
ae(Oa);
le(Oa, bu);
const BM = Oa;
var jo = Oa;
const uf = {
  modelValue: {
    type: [String, Number, Boolean, Object, Array],
    default: !1
  },
  checkedValue: {
    type: [String, Number, Boolean, Object, Array],
    default: !0
  },
  uncheckedValue: {
    type: [String, Number, Boolean, Object, Array],
    default: !1
  },
  checkedColor: String,
  uncheckedColor: String,
  disabled: Boolean,
  readonly: Boolean,
  indeterminate: Boolean,
  iconSize: [String, Number],
  ripple: {
    type: Boolean,
    default: !0
  },
  validateTrigger: {
    type: Array,
    default: () => ["onChange"]
  },
  rules: [Array, Function, Object],
  onClick: R(),
  onChange: R(),
  "onUpdate:modelValue": R(),
  "onUpdate:indeterminate": R()
}, cf = Symbol("CHECKBOX_GROUP_BIND_CHECKBOX_KEY");
function ew() {
  const { bindChildren: e, childProviders: n, length: t } = kn(
    cf
  );
  return {
    length: t,
    checkboxes: n,
    bindCheckboxes: e
  };
}
function nw() {
  const { bindParent: e, parentProvider: n, index: t } = wn(
    cf
  );
  return {
    index: t,
    checkboxGroup: n,
    bindCheckboxGroup: e
  };
}
const { name: tw, n: ow, classes: rw } = _("checkbox"), aw = ["tabindex"];
function iw(e, n) {
  const t = oe("mp-icon"), o = oe("mp-hover-overlay"), r = oe("mp-form-details"), a = Je("hover"), i = Je("ripple");
  return g(), C(
    "div",
    {
      class: m(e.n("wrap"))
    },
    [
      V(
        "div",
        {
          class: m(e.n()),
          onClick: n[3] || (n[3] = (...l) => e.handleClick && e.handleClick(...l))
        },
        [
          Ue((g(), C("div", {
            ref: "action",
            class: m(
              e.classes(
                e.n("action"),
                [e.checked || e.isIndeterminate, e.n("--checked"), e.n("--unchecked")],
                [e.errorMessage || e.checkboxGroupErrorMessage, e.n("--error")],
                [e.formDisabled || e.disabled, e.n("--disabled")]
              )
            ),
            style: G({ color: e.checked || e.isIndeterminate ? e.checkedColor : e.uncheckedColor }),
            tabindex: e.disabled || e.formDisabled ? void 0 : "0",
            onFocus: n[0] || (n[0] = (l) => e.isFocusing = !0),
            onBlur: n[1] || (n[1] = (l) => e.isFocusing = !1)
          }, [
            e.isIndeterminate ? F(e.$slots, "indeterminate-icon", { key: 0 }, () => [
              Z(t, {
                class: m(e.n("icon")),
                name: "minus-box",
                size: e.iconSize,
                "mp-checkbox-cover": ""
              }, null, 8, ["class", "size"])
            ]) : q("v-if", !0),
            e.checked && !e.isIndeterminate ? F(e.$slots, "checked-icon", { key: 1 }, () => [
              Z(t, {
                class: m(e.n("icon")),
                name: "checkbox-marked",
                size: e.iconSize,
                "mp-checkbox-cover": ""
              }, null, 8, ["class", "size"])
            ]) : q("v-if", !0),
            !e.checked && !e.isIndeterminate ? F(e.$slots, "unchecked-icon", { key: 2 }, () => [
              Z(t, {
                class: m(e.n("icon")),
                name: "checkbox-blank-outline",
                size: e.iconSize,
                "mp-checkbox-cover": ""
              }, null, 8, ["class", "size"])
            ]) : q("v-if", !0),
            Z(o, {
              hovering: !e.disabled && !e.formDisabled && e.hovering,
              focusing: !e.disabled && !e.formDisabled && e.isFocusing
            }, null, 8, ["hovering", "focusing"])
          ], 46, aw)), [
            [a, e.handleHovering, "desktop"],
            [i, { disabled: e.formReadonly || e.readonly || e.formDisabled || e.disabled || !e.ripple }]
          ]),
          e.$slots.default ? (g(), C(
            "div",
            {
              key: 0,
              class: m(
                e.classes(
                  e.n("text"),
                  [e.errorMessage || e.checkboxGroupErrorMessage, e.n("--error")],
                  [e.formDisabled || e.disabled, e.n("--disabled")]
                )
              ),
              onClick: n[2] || (n[2] = (...l) => e.handleTextClick && e.handleTextClick(...l))
            },
            [
              F(e.$slots, "default", { checked: e.checked })
            ],
            2
            /* CLASS */
          )) : q("v-if", !0)
        ],
        2
        /* CLASS */
      ),
      Z(r, { "error-message": e.errorMessage }, null, 8, ["error-message"])
    ],
    2
    /* CLASS */
  );
}
const df = ne({
  name: tw,
  directives: { Ripple: an, Hover: In },
  components: {
    MpIcon: Qe,
    MpFormDetails: Bn,
    MpHoverOverlay: Vn
  },
  props: uf,
  setup(e) {
    const n = k(null), t = k(!1), o = Gn(e, "modelValue"), r = Gn(e, "indeterminate"), a = O(() => o.value === e.checkedValue), i = O(() => e.checkedValue), { checkboxGroup: l, bindCheckboxGroup: s } = nw(), { hovering: u, handleHovering: c } = _n(), { form: d, bindForm: p } = jn(), {
      errorMessage: f,
      validateWithTrigger: h,
      validate: v,
      // expose
      resetValidation: y
    } = Un(), w = {
      checkedValue: i,
      checked: a,
      sync: P,
      validate: W,
      resetValidation: y,
      reset: B
    };
    S(s, w), S(p, w), He(() => window, "keydown", U), He(() => window, "keyup", L);
    function $(N) {
      Ke(() => {
        const { validateTrigger: T, rules: M, modelValue: j } = e;
        h(T, N, M, j);
      });
    }
    function b(N) {
      const { checkedValue: T, onChange: M } = e;
      o.value = N, S(M, o.value, r.value), $("onChange"), N === T ? l == null || l.onChecked(T) : l == null || l.onUnchecked(T);
    }
    function z(N) {
      const { disabled: T, readonly: M, checkedValue: j, uncheckedValue: E, onClick: J } = e;
      if (d != null && d.disabled.value || T || (S(J, N), d != null && d.readonly.value || M))
        return;
      if (r.value === !0) {
        r.value = !1, S(e.onChange, o.value, r.value), $("onChange");
        return;
      }
      const X = l ? l.checkedCount.value >= Number(l.max.value) : !1;
      !a.value && X || b(a.value ? E : j);
    }
    function D() {
      n.value.focus();
    }
    function P(N) {
      const { checkedValue: T, uncheckedValue: M } = e;
      o.value = N.includes(T) ? T : M;
    }
    function B() {
      o.value = e.uncheckedValue, y();
    }
    function I(N) {
      const { checkedValue: T, uncheckedValue: M } = e;
      ![T, M].includes(N) && (N = a.value ? M : T), b(N);
    }
    function U(N) {
      if (!t.value)
        return;
      const { key: T } = N;
      (T === "Enter" || T === " ") && Re(N), T === "Enter" && n.value.click();
    }
    function L(N) {
      t.value && N.key === " " && (Re(N), n.value.click());
    }
    function W() {
      return v(e.rules, e.modelValue);
    }
    return {
      action: n,
      isFocusing: t,
      isIndeterminate: r,
      checked: a,
      errorMessage: f,
      checkboxGroupErrorMessage: l == null ? void 0 : l.errorMessage,
      formDisabled: d == null ? void 0 : d.disabled,
      formReadonly: d == null ? void 0 : d.readonly,
      hovering: u,
      n: ow,
      classes: rw,
      handleHovering: c,
      handleClick: z,
      handleTextClick: D,
      toggle: I,
      reset: B,
      validate: W,
      resetValidation: y
    };
  }
});
df.render = iw;
var Ea = df;
ae(Ea);
le(Ea, uf);
const MM = Ea;
var mo = Ea;
const pf = {
  label: {},
  value: {},
  disabled: Boolean,
  ripple: {
    type: Boolean,
    default: !0
  },
  // internal start
  option: Object,
  childrenTrigger: Boolean,
  highlight: Boolean,
  onKeyArrowX: R()
  // internal end
}, mf = Symbol("MENU_SELECT_BIND_MENU_OPTION_KEY");
function lw() {
  const { length: e, childProviders: n, bindChildren: t } = kn(
    mf
  );
  return {
    length: e,
    menuOptions: n,
    bindMenuOptions: t
  };
}
function sw() {
  const { index: e, parentProvider: n, bindParent: t } = wn(
    mf
  );
  return Xn(!!t, "MenuOption", "<mp-menu-option/> must in <mp-menu-select/>"), {
    index: e,
    menuSelect: n,
    bindMenuSelect: t
  };
}
var uw = (e, n, t) => new Promise((o, r) => {
  var a = (s) => {
    try {
      l(t.next(s));
    } catch (u) {
      r(u);
    }
  }, i = (s) => {
    try {
      l(t.throw(s));
    } catch (u) {
      r(u);
    }
  }, l = (s) => s.done ? o(s.value) : Promise.resolve(s.value).then(a, i);
  l((t = t.apply(e, n)).next());
});
const { name: cw, n: dw, classes: pw } = _("menu-option"), mw = ["tabindex"];
function fw(e, n) {
  const t = oe("mp-checkbox"), o = oe("maybe-v-node"), r = oe("mp-icon"), a = oe("mp-hover-overlay"), i = Je("ripple"), l = Je("hover");
  return Ue((g(), C("div", {
    ref: "root",
    class: m(
      e.classes(
        e.n(),
        e.n("$--box"),
        e.n(`--${e.size}`),
        [e.optionSelected, e.n("--selected-color")],
        [e.disabled, e.n("--disabled")],
        [e.childrenTrigger, e.n("--children-trigger")]
      )
    ),
    tabindex: e.disabled ? void 0 : "-1",
    onClick: n[3] || (n[3] = (...s) => e.handleClick && e.handleClick(...s)),
    onFocus: n[4] || (n[4] = (s) => e.isFocusing = !0),
    onBlur: n[5] || (n[5] = (s) => e.isFocusing = !1)
  }, [
    V(
      "div",
      {
        class: m(e.classes(e.n("cover"), [e.optionSelected, e.n("--selected-background")]))
      },
      null,
      2
      /* CLASS */
    ),
    e.multiple ? (g(), ke(t, {
      key: 0,
      ref: "checkbox",
      modelValue: e.optionSelected,
      "onUpdate:modelValue": n[0] || (n[0] = (s) => e.optionSelected = s),
      indeterminate: e.optionIndeterminate,
      "onUpdate:indeterminate": n[1] || (n[1] = (s) => e.optionIndeterminate = s),
      disabled: e.disabled,
      onClick: n[2] || (n[2] = Tn(() => {
      }, ["stop"])),
      onChange: e.handleSelect
    }, null, 8, ["modelValue", "indeterminate", "disabled", "onChange"])) : q("v-if", !0),
    F(e.$slots, "default", {}, () => [
      V(
        "div",
        {
          class: m(e.classes(e.n("text")))
        },
        [
          Z(o, {
            is: e.labelVNode,
            class: m(e.n("$--ellipsis"))
          }, null, 8, ["is", "class"])
        ],
        2
        /* CLASS */
      )
    ]),
    e.childrenTrigger ? (g(), C(
      "div",
      {
        key: 1,
        class: m(e.n("arrow"))
      },
      [
        Z(r, {
          "mp-menu-option-cover": "",
          class: m(e.n("arrow-icon")),
          name: "chevron-right"
        }, null, 8, ["class"])
      ],
      2
      /* CLASS */
    )) : q("v-if", !0),
    Z(a, {
      hovering: (e.hovering || e.highlight) && !e.disabled,
      focusing: e.isFocusing && !e.disabled
    }, null, 8, ["hovering", "focusing"])
  ], 42, mw)), [
    [i, { disabled: e.disabled || !e.ripple }],
    [l, e.handleHovering, "desktop"]
  ]);
}
const ff = ne({
  name: cw,
  directives: { Ripple: an, Hover: In },
  components: {
    MpCheckbox: mo,
    MpHoverOverlay: Vn,
    MpIcon: Qe,
    MaybeVNode: lr
  },
  props: pf,
  setup(e) {
    const n = k(), t = k(), o = k(!1), r = k(!1), a = k(!1), i = O(() => r.value), l = O(() => a.value), s = O(() => e.value), u = O(() => e.disabled), c = O(() => e.ripple), { menuSelect: d, bindMenuSelect: p } = sw(), { size: f, multiple: h, onSelect: v, computeLabel: y } = d, { hovering: w, handleHovering: $ } = _n(), b = O(
      () => {
        var L;
        return vn(e.label) ? e.label(
          (L = e.option) != null ? L : {
            label: e.label,
            value: e.value,
            disabled: e.disabled,
            ripple: e.ripple
          },
          r.value
        ) : e.label;
      }
    ), z = {
      label: b,
      value: s,
      selected: i,
      disabled: u,
      ripple: c,
      indeterminate: l,
      sync: U
    };
    pe([() => e.label, () => e.value], y), p(z), He(() => window, "keydown", P), He(() => window, "keyup", B);
    function D() {
      if (!e.disabled && !(!h.value && e.childrenTrigger)) {
        if (h.value && a.value) {
          a.value = !1, r.value = !1, v(z);
          return;
        }
        h.value && !a.value && (r.value = !r.value), v(z);
      }
    }
    function P(L) {
      var W;
      !o.value && !((W = t.value) != null && W.isFocusing) || ((L.key === "ArrowRight" || L.key === "ArrowLeft") && (Re(L), S(e.onKeyArrowX, L.key)), o.value && ((L.key === " " || L.key === "Enter") && Re(L), L.key === "Enter" && n.value.click()));
    }
    function B(L) {
      o.value && L.key === " " && (Re(L), n.value.click());
    }
    function I() {
      return uw(this, null, function* () {
        yield Ke(), v(z);
      });
    }
    function U(L, W) {
      r.value = L, rr(W) && (a.value = W);
    }
    return {
      root: n,
      checkbox: t,
      optionSelected: r,
      optionIndeterminate: a,
      size: f,
      multiple: h,
      hovering: w,
      isFocusing: o,
      labelVNode: b,
      n: dw,
      classes: pw,
      handleHovering: $,
      handleClick: D,
      handleSelect: I
    };
  }
});
ff.render = fw;
var dr = ff;
ae(dr);
le(dr, pf);
const DM = dr;
var fo = dr;
const yu = {
  show: Boolean,
  disabled: Boolean,
  trigger: {
    type: String,
    default: "click"
  },
  reference: [String, Object],
  placement: {
    type: String,
    default: "cover-top-start"
  },
  strategy: {
    type: String,
    default: "absolute"
  },
  offsetX: {
    type: [Number, String],
    default: 0
  },
  offsetY: {
    type: [Number, String],
    default: 0
  },
  teleport: {
    type: [String, Object, Boolean],
    default: "body"
  },
  sameWidth: Boolean,
  elevation: {
    type: [Boolean, String, Number],
    default: !0
  },
  defaultStyle: {
    type: Boolean,
    default: !0
  },
  popoverClass: String,
  closeOnClickReference: Boolean,
  closeOnKeyEscape: {
    type: Boolean,
    default: !0
  },
  onOpen: R(),
  onOpened: R(),
  onClose: R(),
  onClosed: R(),
  onClickOutside: R(),
  "onUpdate:show": R(),
  // internal start
  cascadeOptimization: Boolean
  // internal end
};
var mt = "top", Nt = "bottom", Gt = "right", Tt = "left", wu = "auto", Ta = [mt, Nt, Gt, Tt], Ba = "start", Ho = "end", vw = "clippingParents", vf = "viewport", To = "popper", gw = "reference", $c = /* @__PURE__ */ Ta.reduce(function(e, n) {
  return e.concat([n + "-" + Ba, n + "-" + Ho]);
}, []), gf = /* @__PURE__ */ [].concat(Ta, [wu]).reduce(function(e, n) {
  return e.concat([n, n + "-" + Ba, n + "-" + Ho]);
}, []), hw = "beforeRead", bw = "read", yw = "afterRead", ww = "beforeMain", kw = "main", $w = "afterMain", Cw = "beforeWrite", Sw = "write", zw = "afterWrite", Pw = [hw, bw, yw, ww, kw, $w, Cw, Sw, zw];
function Fn(e) {
  if (e == null)
    return window;
  if (e.toString() !== "[object Window]") {
    var n = e.ownerDocument;
    return n && n.defaultView || window;
  }
  return e;
}
function ot(e) {
  return e ? (e.nodeName || "").toLowerCase() : null;
}
function gt(e) {
  return Fn(e).getComputedStyle(e);
}
function Zt(e) {
  var n = Fn(e).Element;
  return e instanceof n || e instanceof Element;
}
function Kn(e) {
  var n = Fn(e).HTMLElement;
  return e instanceof n || e instanceof HTMLElement;
}
function ku(e) {
  if (typeof ShadowRoot > "u")
    return !1;
  var n = Fn(e).ShadowRoot;
  return e instanceof n || e instanceof ShadowRoot;
}
function Ow(e) {
  return ["table", "td", "th"].indexOf(ot(e)) >= 0;
}
function Ft(e) {
  return ((Zt(e) ? e.ownerDocument : (
    // $FlowFixMe[prop-missing]
    e.document
  )) || window.document).documentElement;
}
function Ma(e) {
  return ot(e) === "html" ? e : (
    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    e.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    e.parentNode || // DOM Element detected
    (ku(e) ? e.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    Ft(e)
  );
}
function Cl() {
  var e = navigator.userAgentData;
  return e != null && e.brands && Array.isArray(e.brands) ? e.brands.map(function(n) {
    return n.brand + "/" + n.version;
  }).join(" ") : navigator.userAgent;
}
function Cc(e) {
  return !Kn(e) || // https://github.com/popperjs/popper-core/issues/837
  gt(e).position === "fixed" ? null : e.offsetParent;
}
function Ew(e) {
  var n = /firefox/i.test(Cl()), t = /Trident/i.test(Cl());
  if (t && Kn(e)) {
    var o = gt(e);
    if (o.position === "fixed")
      return null;
  }
  var r = Ma(e);
  for (ku(r) && (r = r.host); Kn(r) && ["html", "body"].indexOf(ot(r)) < 0; ) {
    var a = gt(r);
    if (a.transform !== "none" || a.perspective !== "none" || a.contain === "paint" || ["transform", "perspective"].indexOf(a.willChange) !== -1 || n && a.willChange === "filter" || n && a.filter && a.filter !== "none")
      return r;
    r = r.parentNode;
  }
  return null;
}
function $u(e) {
  for (var n = Fn(e), t = Cc(e); t && Ow(t) && gt(t).position === "static"; )
    t = Cc(t);
  return t && (ot(t) === "html" || ot(t) === "body" && gt(t).position === "static") ? n : t || Ew(e) || n;
}
function Bt(e) {
  return e.split("-")[0];
}
function Yo(e) {
  return e.split("-")[1];
}
var Io = Math.max, Sc = Math.min, vo = Math.round, Tw = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function Bw(e, n) {
  var t = e.x, o = e.y, r = n.devicePixelRatio || 1;
  return {
    x: vo(t * r) / r || 0,
    y: vo(o * r) / r || 0
  };
}
function zc(e) {
  var n, t = e.popper, o = e.popperRect, r = e.placement, a = e.variation, i = e.offsets, l = e.position, s = e.gpuAcceleration, u = e.adaptive, c = e.roundOffsets, d = e.isFixed, p = i.x, f = p === void 0 ? 0 : p, h = i.y, v = h === void 0 ? 0 : h, y = typeof c == "function" ? c({
    x: f,
    y: v
  }) : {
    x: f,
    y: v
  };
  f = y.x, v = y.y;
  var w = i.hasOwnProperty("x"), $ = i.hasOwnProperty("y"), b = Tt, z = mt, D = window;
  if (u) {
    var P = $u(t), B = "clientHeight", I = "clientWidth";
    if (P === Fn(t) && (P = Ft(t), gt(P).position !== "static" && l === "absolute" && (B = "scrollHeight", I = "scrollWidth")), P = P, r === mt || (r === Tt || r === Gt) && a === Ho) {
      z = Nt;
      var U = d && P === D && D.visualViewport ? D.visualViewport.height : (
        // $FlowFixMe[prop-missing]
        P[B]
      );
      v -= U - o.height, v *= s ? 1 : -1;
    }
    if (r === Tt || (r === mt || r === Nt) && a === Ho) {
      b = Gt;
      var L = d && P === D && D.visualViewport ? D.visualViewport.width : (
        // $FlowFixMe[prop-missing]
        P[I]
      );
      f -= L - o.width, f *= s ? 1 : -1;
    }
  }
  var W = Object.assign({
    position: l
  }, u && Tw), N = c === !0 ? Bw({
    x: f,
    y: v
  }, Fn(t)) : {
    x: f,
    y: v
  };
  if (f = N.x, v = N.y, s) {
    var T;
    return Object.assign({}, W, (T = {}, T[z] = $ ? "0" : "", T[b] = w ? "0" : "", T.transform = (D.devicePixelRatio || 1) <= 1 ? "translate(" + f + "px, " + v + "px)" : "translate3d(" + f + "px, " + v + "px, 0)", T));
  }
  return Object.assign({}, W, (n = {}, n[z] = $ ? v + "px" : "", n[b] = w ? f + "px" : "", n.transform = "", n));
}
function Mw(e) {
  var n = e.state, t = e.options, o = t.gpuAcceleration, r = o === void 0 ? !0 : o, a = t.adaptive, i = a === void 0 ? !0 : a, l = t.roundOffsets, s = l === void 0 ? !0 : l, u = {
    placement: Bt(n.placement),
    variation: Yo(n.placement),
    popper: n.elements.popper,
    popperRect: n.rects.popper,
    gpuAcceleration: r,
    isFixed: n.options.strategy === "fixed"
  };
  n.modifiersData.popperOffsets != null && (n.styles.popper = Object.assign({}, n.styles.popper, zc(Object.assign({}, u, {
    offsets: n.modifiersData.popperOffsets,
    position: n.options.strategy,
    adaptive: i,
    roundOffsets: s
  })))), n.modifiersData.arrow != null && (n.styles.arrow = Object.assign({}, n.styles.arrow, zc(Object.assign({}, u, {
    offsets: n.modifiersData.arrow,
    position: "absolute",
    adaptive: !1,
    roundOffsets: s
  })))), n.attributes.popper = Object.assign({}, n.attributes.popper, {
    "data-popper-placement": n.placement
  });
}
const hf = {
  name: "computeStyles",
  enabled: !0,
  phase: "beforeWrite",
  fn: Mw,
  data: {}
};
var Dw = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function Dr(e) {
  return e.replace(/left|right|bottom|top/g, function(n) {
    return Dw[n];
  });
}
var Iw = {
  start: "end",
  end: "start"
};
function Pc(e) {
  return e.replace(/start|end/g, function(n) {
    return Iw[n];
  });
}
function bf() {
  return !/^((?!chrome|android).)*safari/i.test(Cl());
}
function go(e, n, t) {
  n === void 0 && (n = !1), t === void 0 && (t = !1);
  var o = e.getBoundingClientRect(), r = 1, a = 1;
  n && Kn(e) && (r = e.offsetWidth > 0 && vo(o.width) / e.offsetWidth || 1, a = e.offsetHeight > 0 && vo(o.height) / e.offsetHeight || 1);
  var i = Zt(e) ? Fn(e) : window, l = i.visualViewport, s = !bf() && t, u = (o.left + (s && l ? l.offsetLeft : 0)) / r, c = (o.top + (s && l ? l.offsetTop : 0)) / a, d = o.width / r, p = o.height / a;
  return {
    width: d,
    height: p,
    top: c,
    right: u + d,
    bottom: c + p,
    left: u,
    x: u,
    y: c
  };
}
function Cu(e) {
  var n = Fn(e), t = n.pageXOffset, o = n.pageYOffset;
  return {
    scrollLeft: t,
    scrollTop: o
  };
}
function Su(e) {
  return go(Ft(e)).left + Cu(e).scrollLeft;
}
function Aw(e, n) {
  var t = Fn(e), o = Ft(e), r = t.visualViewport, a = o.clientWidth, i = o.clientHeight, l = 0, s = 0;
  if (r) {
    a = r.width, i = r.height;
    var u = bf();
    (u || !u && n === "fixed") && (l = r.offsetLeft, s = r.offsetTop);
  }
  return {
    width: a,
    height: i,
    x: l + Su(e),
    y: s
  };
}
function Nw(e) {
  var n, t = Ft(e), o = Cu(e), r = (n = e.ownerDocument) == null ? void 0 : n.body, a = Io(t.scrollWidth, t.clientWidth, r ? r.scrollWidth : 0, r ? r.clientWidth : 0), i = Io(t.scrollHeight, t.clientHeight, r ? r.scrollHeight : 0, r ? r.clientHeight : 0), l = -o.scrollLeft + Su(e), s = -o.scrollTop;
  return gt(r || t).direction === "rtl" && (l += Io(t.clientWidth, r ? r.clientWidth : 0) - a), {
    width: a,
    height: i,
    x: l,
    y: s
  };
}
function zu(e) {
  var n = gt(e), t = n.overflow, o = n.overflowX, r = n.overflowY;
  return /auto|scroll|overlay|hidden/.test(t + r + o);
}
function yf(e) {
  return ["html", "body", "#document"].indexOf(ot(e)) >= 0 ? e.ownerDocument.body : Kn(e) && zu(e) ? e : yf(Ma(e));
}
function Ao(e, n) {
  var t;
  n === void 0 && (n = []);
  var o = yf(e), r = o === ((t = e.ownerDocument) == null ? void 0 : t.body), a = Fn(o), i = r ? [a].concat(a.visualViewport || [], zu(o) ? o : []) : o, l = n.concat(i);
  return r ? l : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    l.concat(Ao(Ma(i)))
  );
}
function Rw(e, n) {
  var t = n.getRootNode && n.getRootNode();
  if (e.contains(n))
    return !0;
  if (t && ku(t)) {
    var o = n;
    do {
      if (o && e.isSameNode(o))
        return !0;
      o = o.parentNode || o.host;
    } while (o);
  }
  return !1;
}
function Sl(e) {
  return Object.assign({}, e, {
    left: e.x,
    top: e.y,
    right: e.x + e.width,
    bottom: e.y + e.height
  });
}
function Lw(e, n) {
  var t = go(e, !1, n === "fixed");
  return t.top = t.top + e.clientTop, t.left = t.left + e.clientLeft, t.bottom = t.top + e.clientHeight, t.right = t.left + e.clientWidth, t.width = e.clientWidth, t.height = e.clientHeight, t.x = t.left, t.y = t.top, t;
}
function Oc(e, n, t) {
  return n === vf ? Sl(Aw(e, t)) : Zt(n) ? Lw(n, t) : Sl(Nw(Ft(e)));
}
function Vw(e) {
  var n = Ao(Ma(e)), t = ["absolute", "fixed"].indexOf(gt(e).position) >= 0, o = t && Kn(e) ? $u(e) : e;
  return Zt(o) ? n.filter(function(r) {
    return Zt(r) && Rw(r, o) && ot(r) !== "body";
  }) : [];
}
function Fw(e, n, t, o) {
  var r = n === "clippingParents" ? Vw(e) : [].concat(n), a = [].concat(r, [t]), i = a[0], l = a.reduce(function(s, u) {
    var c = Oc(e, u, o);
    return s.top = Io(c.top, s.top), s.right = Sc(c.right, s.right), s.bottom = Sc(c.bottom, s.bottom), s.left = Io(c.left, s.left), s;
  }, Oc(e, i, o));
  return l.width = l.right - l.left, l.height = l.bottom - l.top, l.x = l.left, l.y = l.top, l;
}
function Uw(e) {
  return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y";
}
function wf(e) {
  var n = e.reference, t = e.element, o = e.placement, r = o ? Bt(o) : null, a = o ? Yo(o) : null, i = n.x + n.width / 2 - t.width / 2, l = n.y + n.height / 2 - t.height / 2, s;
  switch (r) {
    case mt:
      s = {
        x: i,
        y: n.y - t.height
      };
      break;
    case Nt:
      s = {
        x: i,
        y: n.y + n.height
      };
      break;
    case Gt:
      s = {
        x: n.x + n.width,
        y: l
      };
      break;
    case Tt:
      s = {
        x: n.x - t.width,
        y: l
      };
      break;
    default:
      s = {
        x: n.x,
        y: n.y
      };
  }
  var u = r ? Uw(r) : null;
  if (u != null) {
    var c = u === "y" ? "height" : "width";
    switch (a) {
      case Ba:
        s[u] = s[u] - (n[c] / 2 - t[c] / 2);
        break;
      case Ho:
        s[u] = s[u] + (n[c] / 2 - t[c] / 2);
        break;
    }
  }
  return s;
}
function jw() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
function Hw(e) {
  return Object.assign({}, jw(), e);
}
function Yw(e, n) {
  return n.reduce(function(t, o) {
    return t[o] = e, t;
  }, {});
}
function kf(e, n) {
  n === void 0 && (n = {});
  var t = n, o = t.placement, r = o === void 0 ? e.placement : o, a = t.strategy, i = a === void 0 ? e.strategy : a, l = t.boundary, s = l === void 0 ? vw : l, u = t.rootBoundary, c = u === void 0 ? vf : u, d = t.elementContext, p = d === void 0 ? To : d, f = t.altBoundary, h = f === void 0 ? !1 : f, v = t.padding, y = v === void 0 ? 0 : v, w = Hw(typeof y != "number" ? y : Yw(y, Ta)), $ = p === To ? gw : To, b = e.rects.popper, z = e.elements[h ? $ : p], D = Fw(Zt(z) ? z : z.contextElement || Ft(e.elements.popper), s, c, i), P = go(e.elements.reference), B = wf({
    reference: P,
    element: b,
    placement: r
  }), I = Sl(Object.assign({}, b, B)), U = p === To ? I : P, L = {
    top: D.top - U.top + w.top,
    bottom: U.bottom - D.bottom + w.bottom,
    left: D.left - U.left + w.left,
    right: U.right - D.right + w.right
  }, W = e.modifiersData.offset;
  if (p === To && W) {
    var N = W[r];
    Object.keys(L).forEach(function(T) {
      var M = [Gt, Nt].indexOf(T) >= 0 ? 1 : -1, j = [mt, Nt].indexOf(T) >= 0 ? "y" : "x";
      L[T] += N[j] * M;
    });
  }
  return L;
}
function Ww(e, n) {
  n === void 0 && (n = {});
  var t = n, o = t.placement, r = t.boundary, a = t.rootBoundary, i = t.padding, l = t.flipVariations, s = t.allowedAutoPlacements, u = s === void 0 ? gf : s, c = Yo(o), d = c ? l ? $c : $c.filter(function(h) {
    return Yo(h) === c;
  }) : Ta, p = d.filter(function(h) {
    return u.indexOf(h) >= 0;
  });
  p.length === 0 && (p = d);
  var f = p.reduce(function(h, v) {
    return h[v] = kf(e, {
      placement: v,
      boundary: r,
      rootBoundary: a,
      padding: i
    })[Bt(v)], h;
  }, {});
  return Object.keys(f).sort(function(h, v) {
    return f[h] - f[v];
  });
}
function Kw(e) {
  if (Bt(e) === wu)
    return [];
  var n = Dr(e);
  return [Pc(e), n, Pc(n)];
}
function qw(e) {
  var n = e.state, t = e.options, o = e.name;
  if (!n.modifiersData[o]._skip) {
    for (var r = t.mainAxis, a = r === void 0 ? !0 : r, i = t.altAxis, l = i === void 0 ? !0 : i, s = t.fallbackPlacements, u = t.padding, c = t.boundary, d = t.rootBoundary, p = t.altBoundary, f = t.flipVariations, h = f === void 0 ? !0 : f, v = t.allowedAutoPlacements, y = n.options.placement, w = Bt(y), $ = w === y, b = s || ($ || !h ? [Dr(y)] : Kw(y)), z = [y].concat(b).reduce(function(re, ve) {
      return re.concat(Bt(ve) === wu ? Ww(n, {
        placement: ve,
        boundary: c,
        rootBoundary: d,
        padding: u,
        flipVariations: h,
        allowedAutoPlacements: v
      }) : ve);
    }, []), D = n.rects.reference, P = n.rects.popper, B = /* @__PURE__ */ new Map(), I = !0, U = z[0], L = 0; L < z.length; L++) {
      var W = z[L], N = Bt(W), T = Yo(W) === Ba, M = [mt, Nt].indexOf(N) >= 0, j = M ? "width" : "height", E = kf(n, {
        placement: W,
        boundary: c,
        rootBoundary: d,
        altBoundary: p,
        padding: u
      }), J = M ? T ? Gt : Tt : T ? Nt : mt;
      D[j] > P[j] && (J = Dr(J));
      var X = Dr(J), te = [];
      if (a && te.push(E[N] <= 0), l && te.push(E[J] <= 0, E[X] <= 0), te.every(function(re) {
        return re;
      })) {
        U = W, I = !1;
        break;
      }
      B.set(W, te);
    }
    if (I)
      for (var he = h ? 3 : 1, Ie = function(ve) {
        var A = z.find(function(K) {
          var me = B.get(K);
          if (me)
            return me.slice(0, ve).every(function(Se) {
              return Se;
            });
        });
        if (A)
          return U = A, "break";
      }, H = he; H > 0; H--) {
        var x = Ie(H);
        if (x === "break") break;
      }
    n.placement !== U && (n.modifiersData[o]._skip = !0, n.placement = U, n.reset = !0);
  }
}
const Xw = {
  name: "flip",
  enabled: !0,
  phase: "main",
  fn: qw,
  requiresIfExists: ["offset"],
  data: {
    _skip: !1
  }
};
function Gw(e, n, t) {
  var o = Bt(e), r = [Tt, mt].indexOf(o) >= 0 ? -1 : 1, a = typeof t == "function" ? t(Object.assign({}, n, {
    placement: e
  })) : t, i = a[0], l = a[1];
  return i = i || 0, l = (l || 0) * r, [Tt, Gt].indexOf(o) >= 0 ? {
    x: l,
    y: i
  } : {
    x: i,
    y: l
  };
}
function Zw(e) {
  var n = e.state, t = e.options, o = e.name, r = t.offset, a = r === void 0 ? [0, 0] : r, i = gf.reduce(function(c, d) {
    return c[d] = Gw(d, n.rects, a), c;
  }, {}), l = i[n.placement], s = l.x, u = l.y;
  n.modifiersData.popperOffsets != null && (n.modifiersData.popperOffsets.x += s, n.modifiersData.popperOffsets.y += u), n.modifiersData[o] = i;
}
const Jw = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: Zw
};
function Qw(e) {
  return {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  };
}
function xw(e) {
  return e === Fn(e) || !Kn(e) ? Cu(e) : Qw(e);
}
function _w(e) {
  var n = e.getBoundingClientRect(), t = vo(n.width) / e.offsetWidth || 1, o = vo(n.height) / e.offsetHeight || 1;
  return t !== 1 || o !== 1;
}
function ek(e, n, t) {
  t === void 0 && (t = !1);
  var o = Kn(n), r = Kn(n) && _w(n), a = Ft(n), i = go(e, r, t), l = {
    scrollLeft: 0,
    scrollTop: 0
  }, s = {
    x: 0,
    y: 0
  };
  return (o || !o && !t) && ((ot(n) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
  zu(a)) && (l = xw(n)), Kn(n) ? (s = go(n, !0), s.x += n.clientLeft, s.y += n.clientTop) : a && (s.x = Su(a))), {
    x: i.left + l.scrollLeft - s.x,
    y: i.top + l.scrollTop - s.y,
    width: i.width,
    height: i.height
  };
}
function nk(e) {
  var n = go(e), t = e.offsetWidth, o = e.offsetHeight;
  return Math.abs(n.width - t) <= 1 && (t = n.width), Math.abs(n.height - o) <= 1 && (o = n.height), {
    x: e.offsetLeft,
    y: e.offsetTop,
    width: t,
    height: o
  };
}
function tk(e) {
  var n = /* @__PURE__ */ new Map(), t = /* @__PURE__ */ new Set(), o = [];
  e.forEach(function(a) {
    n.set(a.name, a);
  });
  function r(a) {
    t.add(a.name);
    var i = [].concat(a.requires || [], a.requiresIfExists || []);
    i.forEach(function(l) {
      if (!t.has(l)) {
        var s = n.get(l);
        s && r(s);
      }
    }), o.push(a);
  }
  return e.forEach(function(a) {
    t.has(a.name) || r(a);
  }), o;
}
function ok(e) {
  var n = tk(e);
  return Pw.reduce(function(t, o) {
    return t.concat(n.filter(function(r) {
      return r.phase === o;
    }));
  }, []);
}
function rk(e) {
  var n;
  return function() {
    return n || (n = new Promise(function(t) {
      Promise.resolve().then(function() {
        n = void 0, t(e());
      });
    })), n;
  };
}
function ak(e) {
  var n = e.reduce(function(t, o) {
    var r = t[o.name];
    return t[o.name] = r ? Object.assign({}, r, o, {
      options: Object.assign({}, r.options, o.options),
      data: Object.assign({}, r.data, o.data)
    }) : o, t;
  }, {});
  return Object.keys(n).map(function(t) {
    return n[t];
  });
}
var Ec = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function Tc() {
  for (var e = arguments.length, n = new Array(e), t = 0; t < e; t++)
    n[t] = arguments[t];
  return !n.some(function(o) {
    return !(o && typeof o.getBoundingClientRect == "function");
  });
}
function ik(e) {
  e === void 0 && (e = {});
  var n = e, t = n.defaultModifiers, o = t === void 0 ? [] : t, r = n.defaultOptions, a = r === void 0 ? Ec : r;
  return function(l, s, u) {
    u === void 0 && (u = a);
    var c = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, Ec, a),
      modifiersData: {},
      elements: {
        reference: l,
        popper: s
      },
      attributes: {},
      styles: {}
    }, d = [], p = !1, f = {
      state: c,
      setOptions: function(w) {
        var $ = typeof w == "function" ? w(c.options) : w;
        v(), c.options = Object.assign({}, a, c.options, $), c.scrollParents = {
          reference: Zt(l) ? Ao(l) : l.contextElement ? Ao(l.contextElement) : [],
          popper: Ao(s)
        };
        var b = ok(ak([].concat(o, c.options.modifiers)));
        return c.orderedModifiers = b.filter(function(z) {
          return z.enabled;
        }), h(), f.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function() {
        if (!p) {
          var w = c.elements, $ = w.reference, b = w.popper;
          if (Tc($, b)) {
            c.rects = {
              reference: ek($, $u(b), c.options.strategy === "fixed"),
              popper: nk(b)
            }, c.reset = !1, c.placement = c.options.placement, c.orderedModifiers.forEach(function(L) {
              return c.modifiersData[L.name] = Object.assign({}, L.data);
            });
            for (var z = 0; z < c.orderedModifiers.length; z++) {
              if (c.reset === !0) {
                c.reset = !1, z = -1;
                continue;
              }
              var D = c.orderedModifiers[z], P = D.fn, B = D.options, I = B === void 0 ? {} : B, U = D.name;
              typeof P == "function" && (c = P({
                state: c,
                options: I,
                name: U,
                instance: f
              }) || c);
            }
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: rk(function() {
        return new Promise(function(y) {
          f.forceUpdate(), y(c);
        });
      }),
      destroy: function() {
        v(), p = !0;
      }
    };
    if (!Tc(l, s))
      return f;
    f.setOptions(u).then(function(y) {
      !p && u.onFirstUpdate && u.onFirstUpdate(y);
    });
    function h() {
      c.orderedModifiers.forEach(function(y) {
        var w = y.name, $ = y.options, b = $ === void 0 ? {} : $, z = y.effect;
        if (typeof z == "function") {
          var D = z({
            state: c,
            name: w,
            instance: f,
            options: b
          }), P = function() {
          };
          d.push(D || P);
        }
      });
    }
    function v() {
      d.forEach(function(y) {
        return y();
      }), d = [];
    }
    return f;
  };
}
var yr = {
  passive: !0
};
function lk(e) {
  var n = e.state, t = e.instance, o = e.options, r = o.scroll, a = r === void 0 ? !0 : r, i = o.resize, l = i === void 0 ? !0 : i, s = Fn(n.elements.popper), u = [].concat(n.scrollParents.reference, n.scrollParents.popper);
  return a && u.forEach(function(c) {
    c.addEventListener("scroll", t.update, yr);
  }), l && s.addEventListener("resize", t.update, yr), function() {
    a && u.forEach(function(c) {
      c.removeEventListener("scroll", t.update, yr);
    }), l && s.removeEventListener("resize", t.update, yr);
  };
}
const sk = {
  name: "eventListeners",
  enabled: !0,
  phase: "write",
  fn: function() {
  },
  effect: lk,
  data: {}
};
function uk(e) {
  var n = e.state, t = e.name;
  n.modifiersData[t] = wf({
    reference: n.rects.reference,
    element: n.rects.popper,
    placement: n.placement
  });
}
const ck = {
  name: "popperOffsets",
  enabled: !0,
  phase: "read",
  fn: uk,
  data: {}
};
function dk(e) {
  var n = e.state;
  Object.keys(n.elements).forEach(function(t) {
    var o = n.styles[t] || {}, r = n.attributes[t] || {}, a = n.elements[t];
    !Kn(a) || !ot(a) || (Object.assign(a.style, o), Object.keys(r).forEach(function(i) {
      var l = r[i];
      l === !1 ? a.removeAttribute(i) : a.setAttribute(i, l === !0 ? "" : l);
    }));
  });
}
function pk(e) {
  var n = e.state, t = {
    popper: {
      position: n.options.strategy,
      left: "0",
      top: "0",
      margin: "0"
    },
    arrow: {
      position: "absolute"
    },
    reference: {}
  };
  return Object.assign(n.elements.popper.style, t.popper), n.styles = t, n.elements.arrow && Object.assign(n.elements.arrow.style, t.arrow), function() {
    Object.keys(n.elements).forEach(function(o) {
      var r = n.elements[o], a = n.attributes[o] || {}, i = Object.keys(n.styles.hasOwnProperty(o) ? n.styles[o] : t[o]), l = i.reduce(function(s, u) {
        return s[u] = "", s;
      }, {});
      !Kn(r) || !ot(r) || (Object.assign(r.style, l), Object.keys(a).forEach(function(s) {
        r.removeAttribute(s);
      }));
    });
  };
}
const mk = {
  name: "applyStyles",
  enabled: !0,
  phase: "write",
  fn: dk,
  effect: pk,
  requires: ["computeStyles"]
};
var fk = [sk, ck, hf, mk], vk = /* @__PURE__ */ ik({
  defaultModifiers: fk
}), gk = Object.defineProperty, hk = Object.defineProperties, bk = Object.getOwnPropertyDescriptors, Bc = Object.getOwnPropertySymbols, yk = Object.prototype.hasOwnProperty, wk = Object.prototype.propertyIsEnumerable, Mc = (e, n, t) => n in e ? gk(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t, sl = (e, n) => {
  for (var t in n || (n = {}))
    yk.call(n, t) && Mc(e, t, n[t]);
  if (Bc)
    for (var t of Bc(n))
      wk.call(n, t) && Mc(e, t, n[t]);
  return e;
}, ul = (e, n) => hk(e, bk(n)), Dc = (e, n, t) => new Promise((o, r) => {
  var a = (s) => {
    try {
      l(t.next(s));
    } catch (u) {
      r(u);
    }
  }, i = (s) => {
    try {
      l(t.throw(s));
    } catch (u) {
      r(u);
    }
  }, l = (s) => s.done ? o(s.value) : Promise.resolve(s.value).then(a, i);
  l((t = t.apply(e, n)).next());
});
function $f(e) {
  const n = k(null), t = k(null), o = k({ width: 0, height: 0 }), r = Gn(e, "show", {
    passive: !0,
    defaultValue: !1,
    emit(E, J) {
      S(J ? e.onOpen : e.onClose);
    }
  }), { zIndex: a } = ur(() => r.value, 1);
  mu(() => r.value, a);
  let i = null, l, s = !1, u = !1, c = !0;
  He(() => window, "keydown", N), pe(() => [e.offsetX, e.offsetY, e.placement, e.strategy], T), pe(() => e.disabled, j), pe(
    () => r.value,
    (E) => {
      E && T();
    }
  ), nt(T), ht(d), _o(p);
  function d() {
    const E = U();
    i = vk(E, t.value, I()), E.addEventListener("mouseenter", v), E.addEventListener("mouseleave", y), E.addEventListener("click", b), document.addEventListener("click", z);
  }
  function p() {
    const E = U();
    E && (E.removeEventListener("mouseenter", v), E.removeEventListener("mouseleave", y), E.removeEventListener("click", b)), i.destroy(), document.removeEventListener("click", z);
  }
  function f() {
    const E = U();
    if (!E)
      return;
    const { width: J, height: X } = Zn(E);
    o.value = {
      width: tn(J),
      height: tn(X)
    };
  }
  function h() {
    switch (e.placement) {
      case "top":
      case "cover-bottom":
        return "bottom";
      case "top-start":
      case "right-end":
      case "cover-bottom-start":
        return "bottom left";
      case "top-end":
      case "left-end":
      case "cover-bottom-end":
        return "bottom right";
      case "bottom":
      case "cover-top":
        return "top";
      case "bottom-start":
      case "right-start":
      case "cover-top-start":
        return "top left";
      case "bottom-end":
      case "left-start":
      case "cover-top-end":
        return "top right";
      case "left":
      case "cover-right":
        return "right";
      case "right":
      case "cover-left":
        return "left";
    }
  }
  function v() {
    e.trigger === "hover" && (u = !0, M());
  }
  function y() {
    return Dc(this, null, function* () {
      e.trigger === "hover" && (u = !1, yield bn(), !s && j());
    });
  }
  function w() {
    e.trigger === "hover" && (s = !0, e.cascadeOptimization && (c = !1));
  }
  function $() {
    return Dc(this, null, function* () {
      e.trigger === "hover" && (s = !1, yield bn(), !u && j());
    });
  }
  function b() {
    if (e.trigger === "click") {
      if (e.closeOnClickReference && r.value) {
        j();
        return;
      }
      M();
    }
  }
  function z(E) {
    const J = U();
    if (J && !J.contains(E.target)) {
      if (e.trigger !== "click")
        return;
      D(), S(e.onClickOutside, E);
    }
  }
  function D() {
    j();
  }
  function P() {
    T(), S(e.onClosed);
  }
  function B() {
    const { offsetX: E, offsetY: J, placement: X } = e;
    f();
    const te = {
      x: tn(E),
      y: tn(J)
    };
    switch (X) {
      case "cover-top":
        return {
          placement: "bottom",
          skidding: te.x,
          distance: te.y - o.value.height
        };
      case "cover-top-start":
        return {
          placement: "bottom-start",
          skidding: te.x,
          distance: te.y - o.value.height
        };
      case "cover-top-end":
        return {
          placement: "bottom-end",
          skidding: te.x,
          distance: te.y - o.value.height
        };
      case "cover-bottom":
        return {
          placement: "top",
          skidding: te.x,
          distance: -te.y - o.value.height
        };
      case "cover-bottom-start":
        return {
          placement: "top-start",
          skidding: te.x,
          distance: -te.y - o.value.height
        };
      case "cover-bottom-end":
        return {
          placement: "top-end",
          skidding: te.x,
          distance: -te.y - o.value.height
        };
      case "cover-left":
        return {
          placement: "right",
          skidding: te.y,
          distance: te.x - o.value.width
        };
      case "cover-right":
        return {
          placement: "left",
          skidding: te.y,
          distance: -te.x - o.value.width
        };
      case "left":
      case "left-start":
      case "left-end":
        return {
          placement: X,
          skidding: te.y,
          distance: -te.x
        };
      case "top":
      case "top-start":
      case "top-end":
        return {
          placement: X,
          skidding: te.x,
          distance: -te.y
        };
      case "bottom":
      case "bottom-start":
      case "bottom-end":
        return {
          placement: X,
          skidding: te.x,
          distance: te.y
        };
      case "right":
      case "right-start":
      case "right-end":
        return {
          placement: X,
          skidding: te.y,
          distance: te.x
        };
    }
  }
  function I() {
    const { placement: E, skidding: J, distance: X } = B(), te = [
      ul(sl({}, Xw), {
        enabled: r.value
      }),
      ul(sl({}, Jw), {
        options: {
          offset: [J, X]
        }
      }),
      ul(sl({}, hf), {
        options: {
          adaptive: !1,
          gpuAcceleration: !1
        },
        enabled: r.value
      }),
      {
        name: "applyTransformOrigin",
        enabled: r.value,
        phase: "beforeWrite",
        fn({ state: he }) {
          he.styles.popper.transformOrigin = h();
        }
      }
    ];
    return {
      placement: E,
      modifiers: te,
      strategy: e.strategy
    };
  }
  function U() {
    var E, J;
    const X = (E = l ?? e.reference) != null ? E : n.value;
    return un(X) ? (J = n.value) == null ? void 0 : J.querySelector(X) : X;
  }
  function L(E) {
    c = E;
  }
  function W(E) {
    p(), l = E, d();
  }
  function N(E) {
    const { closeOnKeyEscape: J = !1 } = e;
    E.key === "Escape" && J && r.value && (Re(E), j());
  }
  function T() {
    i.setOptions(I());
  }
  function M() {
    e.disabled || (r.value = !0, S(e["onUpdate:show"], !0));
  }
  function j() {
    c && (r.value = !1, S(e["onUpdate:show"], !1));
  }
  return {
    show: r,
    popover: t,
    zIndex: a,
    host: n,
    referenceSize: o,
    handlePopoverClose: D,
    handlePopoverMouseenter: w,
    handlePopoverMouseleave: $,
    handleClosed: P,
    setReference: W,
    setAllowClose: L,
    resize: T,
    open: M,
    close: j
  };
}
const { name: kk, n: $k, classes: Ck } = _("menu");
function Sk(e, n) {
  return g(), C(
    "div",
    {
      ref: "host",
      class: m(e.classes(e.n(), e.n("$--box")))
    },
    [
      F(e.$slots, "default"),
      (g(), ke(it, {
        to: e.teleport === !1 ? void 0 : e.teleport,
        disabled: e.teleportDisabled || e.teleport === !1
      }, [
        Z(_e, {
          name: e.n(),
          onAfterEnter: e.onOpened,
          onAfterLeave: e.handleClosed,
          persisted: ""
        }, {
          default: ue(() => [
            Ue(V(
              "div",
              {
                ref: "popover",
                style: G({
                  zIndex: e.zIndex,
                  width: e.sameWidth ? e.toSizeUnit(Math.ceil(e.referenceSize.width)) : void 0
                }),
                class: m(
                  e.classes(
                    e.n("menu"),
                    e.n("$--box"),
                    e.popoverClass,
                    [e.defaultStyle, e.n("--menu-background-color")],
                    [e.defaultStyle, e.formatElevation(e.elevation, 3)]
                  )
                ),
                onClick: n[0] || (n[0] = Tn(() => {
                }, ["stop"])),
                onMouseenter: n[1] || (n[1] = (...t) => e.handlePopoverMouseenter && e.handlePopoverMouseenter(...t)),
                onMouseleave: n[2] || (n[2] = (...t) => e.handlePopoverMouseleave && e.handlePopoverMouseleave(...t))
              },
              [
                F(e.$slots, "menu")
              ],
              38
              /* CLASS, STYLE, NEED_HYDRATION */
            ), [
              [xn, e.show]
            ])
          ]),
          _: 3
          /* FORWARDED */
        }, 8, ["name", "onAfterEnter", "onAfterLeave"])
      ], 8, ["to", "disabled"]))
    ],
    2
    /* CLASS */
  );
}
const Cf = ne({
  name: kk,
  props: yu,
  setup(e) {
    const { disabled: n } = _t(), {
      popover: t,
      host: o,
      referenceSize: r,
      show: a,
      zIndex: i,
      handlePopoverMouseenter: l,
      handlePopoverMouseleave: s,
      handlePopoverClose: u,
      handleClosed: c,
      setAllowClose: d,
      // expose
      open: p,
      // expose
      close: f,
      // expose
      resize: h,
      // expose
      setReference: v
    } = $f(e);
    function y() {
      d(!0);
    }
    return {
      popover: t,
      host: o,
      referenceSize: r,
      show: a,
      zIndex: i,
      teleportDisabled: n,
      allowClose: y,
      formatElevation: pn,
      toSizeUnit: Te,
      n: $k,
      classes: Ck,
      handlePopoverMouseenter: l,
      handlePopoverMouseleave: s,
      handlePopoverClose: u,
      handleClosed: c,
      resize: h,
      open: p,
      close: f,
      setReference: v
    };
  }
});
Cf.render = Sk;
var pr = Cf;
ae(pr);
le(pr, yu);
const IM = pr;
var Wo = pr;
function Sf(e) {
  const {
    multiple: n,
    modelValue: t,
    optionProviders: o,
    optionProvidersLength: r,
    optionIsIndeterminate: a
  } = e, i = k(""), l = k([]);
  pe(t, p, { deep: !0 }), pe(r, p);
  function s() {
    const f = n(), h = t();
    f && (l.value = h.map(u)), !f && !Wn(h) && (i.value = u(h)), !f && Wn(h) && (i.value = "");
  }
  function u(f) {
    var h;
    const v = o();
    let y = v.find(({ value: w }) => w.value === f);
    return y || (y = v.find(({ label: w }) => w.value === f)), (h = y == null ? void 0 : y.label.value) != null ? h : "";
  }
  function c({ value: f, label: h }) {
    var v;
    return (v = f.value) != null ? v : h.value;
  }
  function d(f) {
    const h = n(), v = o();
    return h ? v.filter(({ selected: y }) => y.value).map(c) : c(f);
  }
  function p() {
    const f = n(), h = t(), v = o();
    f ? v.forEach(
      (y) => y.sync(
        h.includes(c(y)),
        a ? a(y) : void 0
      )
    ) : v.forEach((y) => y.sync(h === c(y))), s();
  }
  return {
    label: i,
    labels: l,
    getOptionProviderKey: c,
    computeLabel: s,
    getSelectedValue: d
  };
}
var zk = Object.defineProperty, Pk = Object.defineProperties, Ok = Object.getOwnPropertyDescriptors, Ic = Object.getOwnPropertySymbols, Ek = Object.prototype.hasOwnProperty, Tk = Object.prototype.propertyIsEnumerable, Ac = (e, n, t) => n in e ? zk(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t, Bk = (e, n) => {
  for (var t in n || (n = {}))
    Ek.call(n, t) && Ac(e, t, n[t]);
  if (Ic)
    for (var t of Ic(n))
      Tk.call(n, t) && Ac(e, t, n[t]);
  return e;
}, Mk = (e, n) => Pk(e, Ok(n));
const xr = Mk(Bk({
  modelValue: {
    type: [String, Number, Boolean, Array],
    default: void 0
  },
  options: {
    type: Array,
    default: () => []
  },
  labelKey: {
    type: String,
    default: "label"
  },
  valueKey: {
    type: String,
    default: "value"
  },
  childrenKey: {
    type: String,
    default: "children"
  },
  size: {
    type: String,
    default: "normal"
  },
  multiple: Boolean,
  scrollable: Boolean,
  closeOnSelect: {
    type: Boolean,
    default: !0
  },
  "onUpdate:modelValue": R(),
  onSelect: R()
}, Le(yu, [
  "show",
  "disabled",
  "trigger",
  "reference",
  "placement",
  "strategy",
  "offsetX",
  "offsetY",
  "teleport",
  "sameWidth",
  "elevation",
  "popoverClass",
  "closeOnClickReference",
  "onOpen",
  "onOpened",
  "onClose",
  "onClosed",
  "onClickOutside",
  "onUpdate:show"
])), {
  // internal start
  onKeyEscape: R()
  // internal end
});
var Dk = Object.defineProperty, Nc = Object.getOwnPropertySymbols, Ik = Object.prototype.hasOwnProperty, Ak = Object.prototype.propertyIsEnumerable, Rc = (e, n, t) => n in e ? Dk(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t, Nk = (e, n) => {
  for (var t in n || (n = {}))
    Ik.call(n, t) && Rc(e, t, n[t]);
  if (Nc)
    for (var t of Nc(n))
      Ak.call(n, t) && Rc(e, t, n[t]);
  return e;
}, Rk = (e, n, t) => new Promise((o, r) => {
  var a = (s) => {
    try {
      l(t.next(s));
    } catch (u) {
      r(u);
    }
  }, i = (s) => {
    try {
      l(t.throw(s));
    } catch (u) {
      r(u);
    }
  }, l = (s) => s.done ? o(s.value) : Promise.resolve(s.value).then(a, i);
  l((t = t.apply(e, n)).next());
});
const { name: Lk, n: Vk } = _("menu-children"), Fk = { ref: "menuOptions" };
function Uk(e, n) {
  const t = oe("mp-menu-option"), o = oe("mp-menu-children"), r = oe("mp-menu");
  return g(), ke(r, {
    ref: "menu",
    show: e.show,
    "onUpdate:show": n[1] || (n[1] = (a) => e.show = a),
    trigger: "hover",
    placement: "right-start",
    "cascade-optimization": "",
    "mp-menu-children-cover": "",
    class: m(e.n()),
    disabled: e.disabled,
    teleport: !1,
    "close-on-click-reference": !1
  }, qt({
    default: ue(() => [
      Z(t, {
        ref: "trigger",
        "children-trigger": "",
        label: e.option[e.labelKey],
        value: e.option[e.valueKey],
        option: e.option,
        ripple: e.option.ripple,
        disabled: e.option.disabled,
        highlight: e.highlightOptions.some((a) => a.value === e.option.value),
        onKeyArrowX: e.handleArrowRight,
        onMouseenter: e.handleMouseenter
      }, null, 8, ["label", "value", "option", "ripple", "disabled", "highlight", "onKeyArrowX", "onMouseenter"])
    ]),
    _: 2
    /* DYNAMIC */
  }, [
    e.options.length ? {
      name: "menu",
      fn: ue(() => [
        V(
          "div",
          Fk,
          [
            (g(!0), C(
              Ae,
              null,
              Xe(e.options, (a) => (g(), C(
                Ae,
                {
                  key: a[e.valueKey]
                },
                [
                  a[e.childrenKey] ? (g(), ke(o, {
                    key: 0,
                    ref_for: !0,
                    ref: "menuChildren",
                    "parent-show": e.show,
                    option: a,
                    options: a[e.childrenKey],
                    "highlight-options": e.highlightOptions,
                    disabled: a.disabled,
                    onKeyArrowX: e.handleArrowLeft,
                    onKeyArrowRightOpen: (i) => e.allowChildrenClose(a),
                    onMouseenter: (i) => e.allowChildrenClose(a)
                  }, null, 8, ["parent-show", "option", "options", "highlight-options", "disabled", "onKeyArrowX", "onKeyArrowRightOpen", "onMouseenter"])) : (g(), ke(t, {
                    key: 1,
                    label: a[e.labelKey],
                    value: a[e.valueKey],
                    option: a,
                    ripple: a.ripple,
                    disabled: a.disabled,
                    onKeyArrowX: e.handleArrowLeft,
                    onMouseenter: n[0] || (n[0] = (i) => e.allowChildrenClose())
                  }, null, 8, ["label", "value", "option", "ripple", "disabled", "onKeyArrowX"]))
                ],
                64
                /* STABLE_FRAGMENT */
              ))),
              128
              /* KEYED_FRAGMENT */
            ))
          ],
          512
          /* NEED_PATCH */
        )
      ]),
      key: "0"
    } : void 0
  ]), 1032, ["show", "class", "disabled"]);
}
const zf = ne({
  name: Lk,
  components: {
    MpMenu: pr,
    MpMenuOption: dr
  },
  props: Nk({
    parentShow: Boolean,
    disabled: Boolean,
    option: {
      type: Object,
      required: !0
    },
    highlightOptions: Le(xr, "options"),
    onKeyArrowX: R(),
    onKeyArrowRightOpen: R(),
    onMouseenter: R()
  }, Le(xr, ["options", "valueKey", "labelKey", "childrenKey"])),
  setup(e) {
    const n = k(!1), t = k(), o = k(), r = k(), a = k();
    pe(
      () => e.parentShow,
      (p) => {
        p || (n.value = !1);
      },
      { immediate: !0 }
    );
    function i(p) {
      return Rk(this, null, function* () {
        var f;
        S(e.onKeyArrowX, p), p === "ArrowRight" && (S(e.onKeyArrowRightOpen), (f = t.value) == null || f.open(), yield pt(), gu(t.value.$el, r.value, "ArrowDown"));
      });
    }
    function l(p) {
      var f;
      p === "ArrowLeft" && (u(), s(), (f = o.value) == null || f.$el.focus());
    }
    function s() {
      var p;
      (p = t.value) == null || p.close();
    }
    function u() {
      var p;
      (p = t.value) == null || p.allowClose();
    }
    function c(p) {
      var f;
      (f = a.value) == null || f.forEach((h) => {
        if (h.allowClose(), p == null) {
          h.close();
          return;
        }
        h.option.value !== p.value && h.close();
      });
    }
    function d() {
      S(e.onMouseenter);
    }
    return {
      show: n,
      menu: t,
      trigger: o,
      menuOptions: r,
      menuChildren: a,
      n: Vk,
      close: s,
      handleArrowLeft: l,
      handleArrowRight: i,
      handleMouseenter: d,
      allowClose: u,
      allowChildrenClose: c
    };
  }
});
zf.render = Uk;
var jk = zf, Hk = Object.defineProperty, Yk = Object.defineProperties, Wk = Object.getOwnPropertyDescriptors, Lc = Object.getOwnPropertySymbols, Kk = Object.prototype.hasOwnProperty, qk = Object.prototype.propertyIsEnumerable, Vc = (e, n, t) => n in e ? Hk(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t, Xk = (e, n) => {
  for (var t in n || (n = {}))
    Kk.call(n, t) && Vc(e, t, n[t]);
  if (Lc)
    for (var t of Lc(n))
      qk.call(n, t) && Vc(e, t, n[t]);
  return e;
}, Gk = (e, n) => Yk(e, Wk(n));
const { name: Zk, n: Jk, classes: Qk } = _("menu-select");
function xk(e, n) {
  const t = oe("mp-menu-children"), o = oe("mp-menu-option"), r = oe("mp-menu");
  return g(), ke(r, {
    ref: "menu",
    show: e.show,
    "onUpdate:show": n[1] || (n[1] = (a) => e.show = a),
    tabindex: "-1",
    class: m(e.n()),
    disabled: e.disabled,
    trigger: e.trigger,
    reference: e.reference,
    placement: e.placement,
    strategy: e.strategy,
    "offset-x": e.offsetX,
    "offset-y": e.offsetY,
    teleport: e.teleport,
    "same-width": e.sameWidth,
    elevation: e.elevation,
    "default-style": !1,
    "popover-class": e.popoverClass,
    "close-on-click-reference": e.closeOnClickReference,
    "close-on-key-escape": !1,
    onOpen: e.onOpen,
    onOpened: e.onOpened,
    onClose: e.onClose,
    onClosed: e.onClosed,
    onClickOutside: e.onClickOutside
  }, {
    menu: ue(() => [
      V(
        "div",
        {
          ref: "menuOptionsRef",
          class: m(e.classes(e.n("menu"), e.formatElevation(e.elevation, 3), [e.scrollable, e.n("--scrollable")]))
        },
        [
          (g(!0), C(
            Ae,
            null,
            Xe(e.options, (a) => (g(), C(
              Ae,
              {
                key: a[e.valueKey]
              },
              [
                a[e.childrenKey] ? (g(), ke(t, {
                  key: 0,
                  ref_for: !0,
                  ref: "menuChildren",
                  "parent-show": e.show,
                  option: a,
                  options: a[e.childrenKey],
                  "highlight-options": e.highlightOptions,
                  disabled: a.disabled,
                  onKeyArrowRightOpen: (i) => e.allowChildrenClose(a),
                  onMouseenter: (i) => e.allowChildrenClose(a)
                }, null, 8, ["parent-show", "option", "options", "highlight-options", "disabled", "onKeyArrowRightOpen", "onMouseenter"])) : (g(), ke(o, {
                  key: 1,
                  label: a[e.labelKey],
                  value: a[e.valueKey],
                  option: a,
                  ripple: a.ripple,
                  disabled: a.disabled,
                  onMouseenter: n[0] || (n[0] = (i) => e.allowChildrenClose())
                }, null, 8, ["label", "value", "option", "ripple", "disabled"]))
              ],
              64
              /* STABLE_FRAGMENT */
            ))),
            128
            /* KEYED_FRAGMENT */
          )),
          F(e.$slots, "options")
        ],
        2
        /* CLASS */
      )
    ]),
    default: ue(() => [
      F(e.$slots, "default")
    ]),
    _: 3
    /* FORWARDED */
  }, 8, ["show", "class", "disabled", "trigger", "reference", "placement", "strategy", "offset-x", "offset-y", "teleport", "same-width", "elevation", "popover-class", "close-on-click-reference", "onOpen", "onOpened", "onClose", "onClosed", "onClickOutside"]);
}
const Pf = ne({
  name: Zk,
  components: { MpMenu: Wo, MpMenuOption: fo, MpMenuChildren: jk },
  props: xr,
  setup(e) {
    const n = Gn(e, "show"), t = k(), o = k(), r = k(), a = O(() => $(e.options)), { menuOptions: i, length: l, bindMenuOptions: s } = lw(), { computeLabel: u, getSelectedValue: c, getOptionProviderKey: d } = Sf({
      modelValue: () => e.modelValue,
      multiple: () => e.multiple,
      optionProviders: () => i,
      optionProvidersLength: () => l.value,
      optionIsIndeterminate(N) {
        var T;
        const M = h(N.value.value);
        if (!M)
          return !1;
        const j = ((T = M._children) != null ? T : []).filter((J) => !J.disabled), E = j.filter((J) => e.modelValue.includes(J.value));
        return E.length > 0 && E.length < j.length;
      }
    }), p = O(() => {
      const { multiple: N, modelValue: T } = e;
      if (N)
        return [];
      const M = a.value.find((J) => J.value === T), j = [];
      let E = M == null ? void 0 : M._parent;
      for (; E; )
        j.push(E), E = E._parent;
      return j;
    }), f = {
      size: O(() => e.size),
      multiple: O(() => e.multiple),
      computeLabel: u,
      onSelect: b
    };
    s(f), He(() => window, "keydown", D);
    function h(N) {
      return a.value.find((T) => T.value === N);
    }
    function v(N) {
      return i.find((T) => T.value.value === N);
    }
    function y(N) {
      return N[e.childrenKey];
    }
    function w(N) {
      const T = [];
      M(N);
      function M(j) {
        j.forEach((E) => {
          T.push(E);
          const J = y(E);
          J && M(J);
        });
      }
      return T;
    }
    function $(N) {
      function T(M, j) {
        return M.map((E) => {
          E = Gk(Xk({}, E), { _rawOption: E }), j && (E._parent = j);
          const J = y(E);
          if (J) {
            const X = T(J, E);
            E[e.childrenKey] = X, E._children = w(X);
          }
          return E;
        });
      }
      return w(T(N));
    }
    function b(N) {
      var T, M;
      const { multiple: j, closeOnSelect: E } = e, { value: J, label: X, selected: te, disabled: he, ripple: Ie } = N, H = h(J.value);
      if (H) {
        const ve = ((T = H._children) != null ? T : []).filter((A) => !A.disabled).map((A) => A.value);
        j && te.value && (i.forEach((A) => {
          ve.includes(A.value.value) && A.sync(!0, !1);
        }), z(H)), j && !te.value && (i.forEach((A) => {
          ve.includes(A.value.value) && A.sync(!1, !1);
        }), z(H));
      }
      const x = c(N), re = (M = H == null ? void 0 : H._rawOption) != null ? M : {
        value: J.value,
        label: X.value,
        disabled: he.value,
        ripple: Ie.value
      };
      S(e.onSelect, d(N), re), S(e["onUpdate:modelValue"], x), !j && E && (t.value.$el.focus(), U());
    }
    function z(N) {
      let T = N._parent;
      for (; T; ) {
        const M = v(T.value), j = y(T).filter((X) => !X.disabled), E = j.every((X) => !v(X.value).selected.value), J = j.every((X) => v(X.value).selected.value);
        E ? M.sync(!1, !1) : J ? M.sync(!0, !1) : M.sync(!1, !0), T = T._parent;
      }
    }
    function D(N) {
      if (e.disabled || !n.value)
        return;
      const { key: T } = N;
      if (["Escape", "ArrowDown", "ArrowUp"].includes(T) && Re(N), T === "Escape") {
        t.value.$el.focus(), U(), S(e.onKeyEscape);
        return;
      }
      (T === "ArrowDown" || T === "ArrowUp") && gu(
        t.value.$el,
        o.value,
        T,
        (M, j, E) => E ? !0 : P(M) === P(j)
      );
    }
    function P(N) {
      var T, M, j;
      if (N.classList.contains("mp-menu-option--children-trigger"))
        return (T = N.parentNode) == null ? void 0 : T.parentNode;
      if (N.classList.contains("mp-checkbox__action")) {
        const E = (j = (M = N.parentNode) == null ? void 0 : M.parentNode) == null ? void 0 : j.parentNode;
        if (E)
          return P(E);
      }
      return N.parentNode;
    }
    function B(N) {
      var T;
      (T = r.value) == null || T.forEach((M) => {
        if (M.allowClose(), N == null) {
          M.close();
          return;
        }
        M.option.value !== N.value && M.close();
      });
    }
    function I() {
      var N;
      (N = t.value) == null || N.open();
    }
    function U() {
      var N;
      (N = t.value) == null || N.close();
    }
    function L() {
      var N;
      (N = t.value) == null || N.resize();
    }
    function W(N) {
      var T;
      (T = t.value) == null || T.setReference(N);
    }
    return {
      show: n,
      menu: t,
      menuOptionsRef: o,
      menuChildren: r,
      highlightOptions: p,
      n: Jk,
      classes: Qk,
      allowChildrenClose: B,
      formatElevation: pn,
      open: I,
      close: U,
      resize: L,
      setReference: W
    };
  }
});
Pf.render = xk;
var Da = Pf;
ae(Da);
le(Da, xr);
const AM = Da;
var Ko = Da, _k = Object.defineProperty, Fc = Object.getOwnPropertySymbols, e$ = Object.prototype.hasOwnProperty, n$ = Object.prototype.propertyIsEnumerable, Uc = (e, n, t) => n in e ? _k(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t, t$ = (e, n) => {
  for (var t in n || (n = {}))
    e$.call(n, t) && Uc(e, t, n[t]);
  if (Fc)
    for (var t of Fc(n))
      n$.call(n, t) && Uc(e, t, n[t]);
  return e;
};
const Of = t$({
  modelValue: String,
  options: {
    type: Array,
    default: () => []
  },
  labelKey: {
    type: String,
    default: "label"
  },
  valueKey: {
    type: String,
    default: "value"
  },
  maxlength: [String, Number],
  readonly: Boolean,
  disabled: Boolean,
  validateTrigger: {
    type: Array,
    default: () => ["onInput", "onClear", "onChange"]
  },
  getShow: Function,
  rules: [Array, Function, Object],
  onFocus: R(),
  onBlur: R(),
  onInput: R(),
  onChange: R(),
  onClear: R(),
  onClick: R(),
  "onUpdate:modelValue": R()
}, Le(bu, [
  "size",
  "variant",
  "placeholder",
  "enterkeyhint",
  "line",
  "hint",
  "textColor",
  "focusColor",
  "blurColor",
  "clearable"
]));
var jc = (e, n, t) => new Promise((o, r) => {
  var a = (s) => {
    try {
      l(t.next(s));
    } catch (u) {
      r(u);
    }
  }, i = (s) => {
    try {
      l(t.throw(s));
    } catch (u) {
      r(u);
    }
  }, l = (s) => s.done ? o(s.value) : Promise.resolve(s.value).then(a, i);
  l((t = t.apply(e, n)).next());
});
const { name: o$, n: r$ } = _("auto-complete"), a$ = ["tabindex"];
function i$(e, n) {
  const t = oe("mp-input"), o = oe("mp-menu-option"), r = oe("mp-menu-select"), a = oe("mp-form-details");
  return g(), C("div", {
    ref: "root",
    class: m(e.n()),
    tabindex: e.disabled || e.formDisabled ? void 0 : "0",
    onFocusin: n[2] || (n[2] = (...i) => e.focus && e.focus(...i)),
    onClick: n[3] || (n[3] = (...i) => e.handleClick && e.handleClick(...i))
  }, [
    Z(r, {
      show: e.isShowMenuSelect,
      "onUpdate:show": n[1] || (n[1] = (i) => e.isShowMenuSelect = i),
      "same-width": "",
      "auto-complete-cover": "",
      scrollable: "",
      trigger: "manual",
      placement: "bottom",
      disabled: e.disabled || e.formDisabled || e.readonly || e.formReadonly,
      class: m(e.n("menu-select")),
      "popover-class": e.variant === "standard" ? e.n("--standard-menu-margin") : void 0,
      "onUpdate:modelValue": e.handleAutoComplete,
      onKeyEscape: e.handleKeyEscape
    }, {
      options: ue(() => [
        V(
          "div",
          {
            class: m(e.n("options"))
          },
          [
            (g(!0), C(
              Ae,
              null,
              Xe(e.viewOptions, (i) => (g(), ke(o, {
                key: i[e.valueKey],
                label: i[e.labelKey],
                value: i[e.valueKey],
                option: i,
                disabled: i.disabled
              }, null, 8, ["label", "value", "option", "disabled"]))),
              128
              /* KEYED_FRAGMENT */
            ))
          ],
          2
          /* CLASS */
        )
      ]),
      default: ue(() => [
        Z(t, Ye({ ref: "input" }, {
          maxlength: e.maxlength,
          enterkeyhint: e.enterkeyhint,
          placeholder: e.placeholder,
          size: e.size,
          variant: e.variant,
          line: e.line,
          hint: e.hint,
          textColor: e.textColor,
          focusColor: e.focusColor,
          blurColor: e.blurColor,
          readonly: e.readonly,
          disabled: e.disabled,
          clearable: e.clearable
        }, {
          modelValue: e.value,
          "onUpdate:modelValue": n[0] || (n[0] = (i) => e.value = i),
          autocomplete: "off",
          "is-force-focusing-effect": e.isFocusing,
          "is-force-error-effect": !!e.errorMessage,
          "is-show-form-details": !1,
          onInput: e.handleInput,
          onBlur: e.handleBlur,
          onClear: e.handleClear,
          onChange: e.handleChange
        }), qt({
          _: 2
          /* DYNAMIC */
        }, [
          e.$slots["prepend-icon"] ? {
            name: "prepend-icon",
            fn: ue(() => [
              F(e.$slots, "prepend-icon")
            ]),
            key: "0"
          } : void 0,
          e.$slots["append-icon"] ? {
            name: "append-icon",
            fn: ue(() => [
              F(e.$slots, "append-icon")
            ]),
            key: "1"
          } : void 0,
          e.$slots["clear-icon"] ? {
            name: "clear-icon",
            fn: ue(({ clear: i }) => [
              F(e.$slots, "clear-icon", { clear: i })
            ]),
            key: "2"
          } : void 0,
          e.$slots["extra-message"] ? {
            name: "extra-message",
            fn: ue(() => [
              F(e.$slots, "extra-message")
            ]),
            key: "3"
          } : void 0
        ]), 1040, ["modelValue", "is-force-focusing-effect", "is-force-error-effect", "onInput", "onBlur", "onClear", "onChange"])
      ]),
      _: 3
      /* FORWARDED */
    }, 8, ["show", "disabled", "class", "popover-class", "onUpdate:modelValue", "onKeyEscape"]),
    Z(a, {
      "error-message": e.errorMessage,
      "extra-message": e.maxlengthText
    }, null, 8, ["error-message", "extra-message"])
  ], 42, a$);
}
const Ef = ne({
  name: o$,
  components: {
    MpInput: jo,
    MpMenuSelect: Ko,
    MpMenuOption: fo,
    MpFormDetails: Bn
  },
  props: Of,
  setup(e) {
    const n = k(), t = k(), o = k(!1), r = Gn(e, "modelValue"), a = k([]), i = k(!1), l = O(() => {
      const { maxlength: j } = e;
      return j ? Wn(r.value) ? `0 / ${j}` : `${String(r.value).length}/${j}` : "";
    }), {
      errorMessage: s,
      validateWithTrigger: u,
      validate: c,
      // expose
      resetValidation: d
    } = Un(), { bindForm: p, form: f } = jn();
    let h = !1;
    const v = {
      reset: y,
      resetValidation: d,
      validate: w
    };
    bm(
      () => n.value,
      "click",
      () => {
        if (h) {
          h = !1;
          return;
        }
        b();
      }
    ), pe(() => [e.options, o.value], B), S(p, v), He(() => window, "keydown", P);
    function y() {
      S(e["onUpdate:modelValue"], ""), d();
    }
    function w() {
      return c(e.rules, e.modelValue);
    }
    function $() {
      o.value || e.disabled || f != null && f.disabled.value || (o.value = !0, t.value.focus(), S(e.onFocus), D("onFocus"));
    }
    function b() {
      o.value && (o.value = !1, i.value = !1, t.value.blur(), S(e.onBlur), D("onBlur"));
    }
    function z() {
      i.value || b();
    }
    function D(j) {
      Ke(() => {
        const { validateTrigger: E, rules: J, modelValue: X } = e;
        u(E, j, J, X);
      });
    }
    function P(j) {
      return jc(this, null, function* () {
        var E;
        if (f != null && f.disabled.value || f != null && f.readonly.value || e.disabled || e.readonly || !o.value || !i.value)
          return;
        const { key: J } = j;
        if (J === "Tab") {
          Re(j), n.value.focus(), i.value = !1;
          return;
        }
        if (!["ArrowUp", "ArrowDown", "Enter"].includes(J)) {
          t.value.focus();
          return;
        }
        J === "Enter" && (yield pt(), (E = t.value) == null || E.focus());
      });
    }
    function B() {
      o.value && (i.value = M(r.value)), i.value && (a.value = e.options);
    }
    function I(j, E) {
      B(), S(e.onInput, j, E), D("onInput");
    }
    function U() {
      h = !0, B(), S(e.onClear, r.value), D("onClear");
    }
    function L(j) {
      e.disabled || f != null && f.disabled.value || (S(e.onClick, j), D("onClick"));
    }
    function W(j) {
      S(e.onChange, j), D("onChange");
    }
    function N(j) {
      return jc(this, null, function* () {
        var E;
        e.maxlength != null && (j = j.slice(0, Y(e.maxlength))), j !== r.value && (r.value = j, S(e.onChange, j), D("onChange")), yield pt(), (E = t.value) == null || E.focus();
      });
    }
    function T() {
      t.value.focus();
    }
    function M(j) {
      return e.disabled || e.readonly || f != null && f.disabled.value || f != null && f.readonly.value ? !1 : e.options.length > 0 && (e.getShow != null ? e.getShow(j) : j.length > 0);
    }
    return {
      root: n,
      input: t,
      value: r,
      isShowMenuSelect: i,
      viewOptions: a,
      isFocusing: o,
      formDisabled: f == null ? void 0 : f.disabled,
      formReadonly: f == null ? void 0 : f.readonly,
      errorMessage: s,
      maxlengthText: l,
      n: r$,
      handleInput: I,
      handleClear: U,
      handleClick: L,
      handleChange: W,
      handleBlur: z,
      handleKeyEscape: T,
      handleAutoComplete: N,
      reset: y,
      validate: w,
      resetValidation: d,
      blur: b,
      focus: $
    };
  }
});
Ef.render = i$;
var Ia = Ef;
ae(Ia);
le(Ia, Of);
const NM = Ia;
var zl = Ia;
const Hc = (e) => un(e) ? e.startsWith("data:image") || /\.(png|jpg|gif|jpeg|svg|webp|ico)$/i.test(e) : !1, Yc = (e) => un(e) ? e.startsWith("data:video") || /\.(mp4|webm|ogg)$/.test(e) : !1, l$ = (e) => {
  const n = [];
  return {
    cache: n,
    has(t) {
      return this.cache.includes(t);
    },
    add(t) {
      this.has(t) || (this.cache.length === e && n.shift(), this.cache.push(t));
    },
    remove(t) {
      this.has(t) && Mt(this.cache, t);
    },
    clear() {
      this.cache.length = 0;
    }
  };
}, Pl = (e) => e, Wc = (e) => e ** 3, Tf = (e) => e < 0.5 ? Wc(e * 2) / 2 : 1 - Wc((1 - e) * 2) / 2, Jt = (e, n, t = "") => {
  if (e === void 0 && (e = ""), e.length >= n)
    return e;
  const o = n - e.length, r = Math.floor(o / t.length);
  return t.repeat(r) + t.slice(0, o % t.length) + e;
};
var s$ = Object.defineProperty, Kc = Object.getOwnPropertySymbols, u$ = Object.prototype.hasOwnProperty, c$ = Object.prototype.propertyIsEnumerable, qc = (e, n, t) => n in e ? s$(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t, d$ = (e, n) => {
  for (var t in n || (n = {}))
    u$.call(n, t) && qc(e, t, n[t]);
  if (Kc)
    for (var t of Kc(n))
      c$.call(n, t) && qc(e, t, n[t]);
  return e;
}, Aa = (e, n, t) => new Promise((o, r) => {
  var a = (s) => {
    try {
      l(t.next(s));
    } catch (u) {
      r(u);
    }
  }, i = (s) => {
    try {
      l(t.throw(s));
    } catch (u) {
      r(u);
    }
  }, l = (s) => s.done ? o(s.value) : Promise.resolve(s.value).then(a, i);
  l((t = t.apply(e, n)).next());
});
const p$ = "background-image", m$ = "lazy-loading", f$ = "lazy-error", Xc = "lazy-attempt", v$ = ["scroll", "wheel", "mousewheel", "resize", "animationend", "transitionend", "touchmove"], Ol = "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==", ho = [], _r = [], Bf = l$(100), mn = {
  loading: Ol,
  error: Ol,
  attempt: 3,
  throttleWait: 300,
  events: v$
};
let Pu = ha(mr, mn.throttleWait);
function Na(e, n) {
  e._lazy.arg === p$ ? e.style.backgroundImage = `url(${n})` : e.setAttribute("src", n);
}
function g$(e) {
  e._lazy.loading && Na(e, e._lazy.loading), mr();
}
function h$(e) {
  e._lazy.error && Na(e, e._lazy.error), e._lazy.state = "error", Eu(e), mr();
}
function Mf(e, n) {
  Na(e, n), e._lazy.state = "success", Eu(e), mr();
}
function b$(e) {
  var n;
  _r.includes(e) || (_r.push(e), (n = mn.events) == null || n.forEach((t) => {
    e.addEventListener(t, Pu, { passive: !0 });
  }));
}
function y$() {
  _r.forEach((e) => {
    var n;
    (n = mn.events) == null || n.forEach((t) => {
      e.removeEventListener(t, Pu);
    });
  }), _r.length = 0;
}
function w$(e, n) {
  var t, o;
  const r = {
    loading: (t = e.getAttribute(m$)) != null ? t : mn.loading,
    error: (o = e.getAttribute(f$)) != null ? o : mn.error,
    attempt: e.getAttribute(Xc) ? Number(e.getAttribute(Xc)) : mn.attempt
  };
  e._lazy = d$({
    src: n.value,
    arg: n.arg,
    currentAttempt: 0,
    state: "pending",
    attemptLock: !1
  }, r), Na(e, Ol), S(mn.filter, e._lazy);
}
function k$(e, n) {
  const t = new Image();
  t.src = n, e._lazy.preloadImage = t, t.addEventListener("load", () => {
    e._lazy.attemptLock = !1, Bf.add(n), Mf(e, n);
  }), t.addEventListener("error", () => {
    e._lazy.attemptLock = !1, e._lazy.currentAttempt >= e._lazy.attempt ? h$(e) : Df(e);
  });
}
function Df(e) {
  if (e._lazy.attemptLock)
    return;
  e._lazy.attemptLock = !0, e._lazy.currentAttempt++;
  const { src: n } = e._lazy;
  if (Bf.has(n)) {
    Mf(e, n), e._lazy.attemptLock = !1;
    return;
  }
  g$(e), k$(e, n);
}
function Ou(e) {
  return Aa(this, null, function* () {
    yield bn(), au(e) && Df(e);
  });
}
function mr() {
  ho.forEach((e) => Ou(e));
}
function $$(e) {
  return Aa(this, null, function* () {
    !ho.includes(e) && ho.push(e), By(e).forEach(b$), yield Ou(e);
  });
}
function Eu(e) {
  Mt(ho, e), ho.length === 0 && y$();
}
function C$(e, n) {
  const { src: t, arg: o } = e._lazy;
  return t !== n.value || o !== n.arg;
}
function If(e, n) {
  return Aa(this, null, function* () {
    w$(e, n), yield $$(e);
  });
}
function S$(e, n) {
  return Aa(this, null, function* () {
    if (!C$(e, n)) {
      ho.includes(e) && (yield Ou(e));
      return;
    }
    yield If(e, n);
  });
}
function z$(e = {}) {
  const { events: n, loading: t, error: o, attempt: r, throttleWait: a, filter: i } = e;
  mn.events = n ?? mn.events, mn.loading = t ?? mn.loading, mn.error = o ?? mn.error, mn.attempt = r ?? mn.attempt, mn.throttleWait = a ?? mn.throttleWait, mn.filter = i;
}
const Af = {
  mounted: If,
  unmounted: Eu,
  updated: S$,
  install(e, n) {
    z$(n), Pu = ha(mr, mn.throttleWait), e.directive("lazy", this);
  }
}, RM = Af;
var qo = Af;
const Nf = {
  round: {
    type: Boolean,
    default: !0
  },
  size: {
    type: [String, Number],
    default: "normal"
  },
  alt: String,
  color: String,
  src: String,
  fit: {
    type: String,
    default: "cover"
  },
  bordered: Boolean,
  borderColor: String,
  loading: String,
  error: String,
  lazy: Boolean,
  hoverable: Boolean,
  onClick: R(),
  onLoad: R(),
  onError: R()
}, P$ = (e) => ["mini", "small", "normal", "large"].includes(e), { name: O$, n: E$, classes: T$ } = _("avatar"), B$ = ["src", "alt", "lazy-loading", "lazy-error"], M$ = ["src", "alt"];
function D$(e, n) {
  const t = Je("lazy");
  return g(), C(
    "div",
    {
      ref: "avatarElement",
      class: m(
        e.classes(
          e.n(),
          e.n("$--box"),
          [e.isInternalSize(e.size), e.n(`--${e.size}`)],
          [e.round, e.n("--round")],
          [e.bordered, e.n("--bordered")],
          [e.hoverable, e.n("--hoverable")]
        )
      ),
      style: G({
        width: e.isInternalSize(e.size) ? void 0 : e.toSizeUnit(e.size),
        height: e.isInternalSize(e.size) ? void 0 : e.toSizeUnit(e.size),
        borderColor: e.borderColor,
        backgroundColor: e.color
      }),
      onClick: n[3] || (n[3] = (...o) => e.handleClick && e.handleClick(...o))
    },
    [
      e.src ? (g(), C(
        Ae,
        { key: 0 },
        [
          e.lazy ? Ue((g(), C("img", {
            key: 0,
            role: "img",
            class: m(e.n("image")),
            src: e.src,
            alt: e.alt,
            style: G({ objectFit: e.fit }),
            "lazy-loading": e.loading,
            "lazy-error": e.error,
            onLoad: n[0] || (n[0] = (...o) => e.handleLoad && e.handleLoad(...o))
          }, null, 46, B$)), [
            [t, e.src]
          ]) : (g(), C("img", {
            key: 1,
            role: "img",
            class: m(e.n("image")),
            src: e.src,
            alt: e.alt,
            style: G({ objectFit: e.fit }),
            onLoad: n[1] || (n[1] = (...o) => e.handleLoad && e.handleLoad(...o)),
            onError: n[2] || (n[2] = (...o) => e.handleError && e.handleError(...o))
          }, null, 46, M$))
        ],
        64
        /* STABLE_FRAGMENT */
      )) : (g(), C(
        "div",
        {
          key: 1,
          ref: "textElement",
          class: m(e.n("text")),
          style: G({ transform: `scale(${e.scale})` })
        },
        [
          F(e.$slots, "default")
        ],
        6
        /* CLASS, STYLE */
      ))
    ],
    6
    /* CLASS, STYLE */
  );
}
const Rf = ne({
  name: O$,
  directives: { Lazy: qo },
  props: Nf,
  setup(e) {
    const n = k(null), t = k(null), o = k(1);
    yn(r), nr(r);
    function r() {
      if (!n.value || !t.value) {
        o.value = 1;
        return;
      }
      const s = n.value.offsetWidth, u = t.value.offsetWidth;
      s > u ? o.value = 1 : o.value = s / u;
    }
    function a(s) {
      const u = s.currentTarget, { lazy: c, onLoad: d, onError: p } = e;
      c ? (u._lazy.state === "success" && S(d, s), u._lazy.state === "error" && S(p, s)) : S(d, s);
    }
    function i(s) {
      S(e.onError, s);
    }
    function l(s) {
      S(e.onClick, s);
    }
    return {
      avatarElement: n,
      textElement: t,
      scale: o,
      n: E$,
      classes: T$,
      isInternalSize: P$,
      toSizeUnit: Te,
      handleLoad: a,
      handleError: i,
      handleClick: l
    };
  }
});
Rf.render = D$;
var Ra = Rf;
ae(Ra);
le(Ra, Nf);
const LM = Ra;
var El = Ra;
const Lf = {
  offset: [Number, String],
  vertical: Boolean
}, { name: I$, n: A$, classes: N$ } = _("avatar-group");
function R$(e, n) {
  return g(), C(
    "div",
    {
      class: m(e.classes(e.n(), [e.vertical, e.n("--column"), e.n("--row")])),
      style: G(e.rootStyles)
    },
    [
      F(e.$slots, "default")
    ],
    6
    /* CLASS, STYLE */
  );
}
const Vf = ne({
  name: I$,
  props: Lf,
  setup(e) {
    return {
      rootStyles: O(() => e.offset == null ? {} : {
        "--mp-avatar-group-offset": Te(e.offset)
      }),
      n: A$,
      classes: N$
    };
  }
});
Vf.render = R$;
var La = Vf;
ae(La);
le(La, Lf);
const VM = La;
var Tl = La;
const ut = {
  type: {
    type: String,
    default: "circle"
  },
  radius: [String, Number],
  size: {
    type: String,
    default: "normal"
  },
  color: String,
  description: String,
  loading: Boolean
}, { name: L$, n: V$, classes: F$ } = _("loading");
function U$(e, n) {
  return g(), C(
    "div",
    {
      class: m(e.n())
    },
    [
      e.$slots.default ? (g(), C(
        "div",
        {
          key: 0,
          class: m(e.classes(e.n("content"), [e.loading, e.n("content--active")]))
        },
        [
          F(e.$slots, "default"),
          e.loading ? (g(), C(
            "div",
            {
              key: 0,
              class: m(e.n("content-mask"))
            },
            null,
            2
            /* CLASS */
          )) : q("v-if", !0)
        ],
        2
        /* CLASS */
      )) : q("v-if", !0),
      e.isShow ? (g(), C(
        "div",
        {
          key: 1,
          class: m(e.classes(e.n("$--box"), e.n("body"), [e.$slots.default, e.n("inside")]))
        },
        [
          e.type === "circle" ? (g(), C(
            "div",
            {
              key: 0,
              class: m(e.n("circle"))
            },
            [
              V(
                "span",
                {
                  class: m(e.classes(e.n("circle-block"), e.n(`circle-block--${e.size}`))),
                  style: G({
                    width: e.multiplySizeUnit(e.radius, 2),
                    height: e.multiplySizeUnit(e.radius, 2),
                    color: e.color
                  })
                },
                n[0] || (n[0] = [
                  V(
                    "svg",
                    { viewBox: "25 25 50 50" },
                    [
                      V("circle", {
                        cx: "50",
                        cy: "50",
                        r: "20",
                        fill: "none"
                      })
                    ],
                    -1
                    /* HOISTED */
                  )
                ]),
                6
                /* CLASS, STYLE */
              )
            ],
            2
            /* CLASS */
          )) : q("v-if", !0),
          (g(!0), C(
            Ae,
            null,
            Xe(e.loadingTypeDict, (t, o) => (g(), C(
              Ae,
              { key: o },
              [
                e.type === o ? (g(), C(
                  "div",
                  {
                    key: 0,
                    class: m(e.classes(e.n(o), e.n(`${o}--${e.size}`)))
                  },
                  [
                    (g(!0), C(
                      Ae,
                      null,
                      Xe(t, (r) => (g(), C(
                        "div",
                        {
                          key: r + o,
                          style: G({ backgroundColor: e.color }),
                          class: m(e.classes(e.n(`${o}-item`), e.n(`${o}-item--${e.size}`)))
                        },
                        null,
                        6
                        /* CLASS, STYLE */
                      ))),
                      128
                      /* KEYED_FRAGMENT */
                    ))
                  ],
                  2
                  /* CLASS */
                )) : q("v-if", !0)
              ],
              64
              /* STABLE_FRAGMENT */
            ))),
            128
            /* KEYED_FRAGMENT */
          )),
          e.$slots.description || e.description ? (g(), C(
            "div",
            {
              key: 1,
              class: m(e.classes(e.n("description"), e.n(`description--${e.size}`))),
              style: G({ color: e.color })
            },
            [
              F(e.$slots, "description", {}, () => [
                De(
                  se(e.description),
                  1
                  /* TEXT */
                )
              ])
            ],
            6
            /* CLASS, STYLE */
          )) : q("v-if", !0)
        ],
        2
        /* CLASS */
      )) : q("v-if", !0)
    ],
    2
    /* CLASS */
  );
}
const Ff = ne({
  name: L$,
  props: ut,
  setup(e, { slots: n }) {
    const t = O(() => S(n.default) ? e.loading : !0);
    return {
      loadingTypeDict: {
        wave: 5,
        cube: 4,
        rect: 8,
        disappear: 3
      },
      isShow: t,
      n: V$,
      classes: F$,
      multiplySizeUnit: On
    };
  }
});
Ff.render = U$;
var Va = Ff;
ae(Va);
le(Va, ut);
const FM = Va;
var bo = Va, j$ = Object.defineProperty, H$ = Object.defineProperties, Y$ = Object.getOwnPropertyDescriptors, Gc = Object.getOwnPropertySymbols, W$ = Object.prototype.hasOwnProperty, K$ = Object.prototype.propertyIsEnumerable, Zc = (e, n, t) => n in e ? j$(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t, Jc = (e, n) => {
  for (var t in n || (n = {}))
    W$.call(n, t) && Zc(e, t, n[t]);
  if (Gc)
    for (var t of Gc(n))
      K$.call(n, t) && Zc(e, t, n[t]);
  return e;
}, Qc = (e, n) => H$(e, Y$(n));
const Uf = {
  /**
   * 按钮主题色
   */
  status: String,
  /**
   * 按钮变体
   */
  variant: String,
  /**
   * 按钮尺寸
   */
  size: String,
  /**
   * 原生按钮类型：button | submit | reset
   */
  htmlType: {
    type: String,
    default: "button"
  },
  /**
   * 渲染的根标签
   */
  component: {
    type: String,
    default: "button"
  },
  /**
   * 是否为加载中状态
   */
  loading: Boolean,
  /**
   * 是否为圆角胶囊形按钮
   */
  round: Boolean,
  /**
   * 是否占满父容器宽度
   */
  block: Boolean,
  /**
   * 是否禁用，未显式设置时由父 ButtonGroup 决定
   */
  disabled: {
    type: Boolean,
    default: void 0
  },
  /**
   * 是否堆叠（图标在文字上方）
   */
  stacked: {
    type: Boolean,
    default: void 0
  },
  /**
   * 是否自动 loading（onClick 返回 Promise 时自动维持）
   */
  autoLoading: Boolean,
  /**
   * 是否仅作为图标容器（调整内边距）
   */
  iconContainer: Boolean,
  /**
   * 是否启用水波纹（移动端默认开启）
   */
  ripple: {
    type: Boolean,
    default: !0
  },
  /**
   * 是否可聚焦（移动端默认开启）
   */
  focusable: {
    type: Boolean,
    default: !0
  },
  /**
   * 自定义背景色
   */
  color: String,
  /**
   * 自定义文字色
   */
  textColor: String,
  /**
   * 海拔阴影：true 默认层级、false 关闭、0..24 数字层级
   */
  elevation: {
    type: [Boolean, Number, String],
    default: !0
  },
  /**
   * loading 指示器圆角半径
   */
  loadingRadius: [Number, String],
  /**
   * loading 指示器类型
   */
  loadingType: Le(ut, "type"),
  /**
   * loading 指示器尺寸
   */
  loadingSize: Qc(Jc({}, Le(ut, "size")), {
    default: void 0
  }),
  /**
   * loading 指示器颜色
   */
  loadingColor: Qc(Jc({}, Le(ut, "color")), {
    default: "currentColor"
  }),
  onClick: R(),
  onTouchstart: R()
}, jf = Symbol("BUTTON_GROUP_BIND_BUTTON_KEY");
function q$() {
  const { bindChildren: e, childProviders: n, length: t } = kn(jf);
  return {
    length: t,
    buttons: n,
    bindButtons: e
  };
}
function X$() {
  const { bindParent: e, parentProvider: n, index: t } = wn(jf);
  return {
    index: t,
    buttonGroup: n,
    bindButtonGroup: e
  };
}
var G$ = Object.defineProperty, Z$ = Object.defineProperties, J$ = Object.getOwnPropertyDescriptors, xc = Object.getOwnPropertySymbols, Q$ = Object.prototype.hasOwnProperty, x$ = Object.prototype.propertyIsEnumerable, _c = (e, n, t) => n in e ? G$(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t, _$ = (e, n) => {
  for (var t in n || (n = {}))
    Q$.call(n, t) && _c(e, t, n[t]);
  if (xc)
    for (var t of xc(n))
      x$.call(n, t) && _c(e, t, n[t]);
  return e;
}, eC = (e, n) => Z$(e, J$(n));
function nC(e, n, t, o, r, a) {
  return Ue((g(), ke(xt(e.component), {
    class: m(
      o.classes(
        o.n(),
        o.n("$--box"),
        o.n(`--size-${o.states.size}`),
        o.n(`--status-${o.states.status}`),
        o.n(`--variant-${o.states.variant}`),
        [e.block, `${o.n("$--flex")} ${o.n("--block")}`, o.n("$--inline-flex")],
        [o.states.variant === "default" && !o.states.iconContainer, o.states.elevation],
        [o.states.iconContainer, `${o.n("--icon-container")} ${o.n(`--icon-container-${o.states.status}`)}`],
        [e.round, o.n("--round")],
        [o.states.stacked, o.n("--stacked")],
        [e.loading || o.pending, o.n("--loading")],
        [o.states.disabled, o.n("--disabled")]
      )
    ),
    tabindex: e.focusable ? void 0 : "-1",
    style: G({
      color: o.states.textColor,
      background: o.states.color
    }),
    type: e.component === "button" ? e.htmlType : void 0,
    disabled: e.component === "button" ? o.states.disabled : void 0,
    onClick: o.handleClick,
    onTouchstart: o.handleTouchstart,
    onFocus: o.handleFocus,
    onBlur: n[0] || (n[0] = (i) => o.isFocusing = !1)
  }, {
    default: ue(() => [
      e.loading || o.pending ? (g(), ke(o.MpLoading, {
        key: 0,
        class: m(o.n("loading")),
        "mp-button-cover": "",
        color: e.loadingColor,
        type: e.loadingType,
        size: e.loadingSize || o.loadingSizeMap[o.states.size],
        radius: e.loadingRadius
      }, null, 8, ["class", "color", "type", "size", "radius"])) : q("v-if", !0),
      V(
        "div",
        {
          class: m(o.classes(o.n("content"), [e.loading || o.pending, o.n("--hidden")]))
        },
        [
          F(e.$slots, "default")
        ],
        2
        /* CLASS */
      ),
      Z(o.MpHoverOverlay, {
        hovering: o.states.disabled || e.loading || o.pending ? !1 : o.hovering,
        focusing: o.states.disabled || e.loading || o.pending ? !1 : o.isFocusing
      }, null, 8, ["hovering", "focusing"])
    ]),
    _: 3
    /* FORWARDED */
  }, 40, ["class", "tabindex", "style", "type", "disabled"])), [
    [o.vRipple, { disabled: o.states.disabled || !e.ripple || e.loading || o.pending }],
    [o.vHover, o.handleHovering, "desktop"]
  ]);
}
const Hf = /* @__PURE__ */ ne(eC(_$({}, {
  name: _("button").name
}), {
  __name: "Button",
  props: Uf,
  setup(e, { expose: n }) {
    n();
    const { n: t, classes: o } = _("button"), r = {
      xs: "mini",
      sm: "small",
      md: "normal",
      lg: "large"
    }, a = e, i = k(!1), l = k(!1), { buttonGroup: s } = X$(), { hovering: u, handleHovering: c } = _n(), d = O(() => {
      var w, $, b, z, D, P, B, I, U, L, W, N;
      if (!s)
        return {
          elevation: pn(a.elevation, 2),
          status: (w = a.status) != null ? w : "default",
          variant: ($ = a.variant) != null ? $ : "default",
          size: (b = a.size) != null ? b : "md",
          color: a.color,
          textColor: a.textColor,
          iconContainer: a.iconContainer,
          stacked: (z = a.stacked) != null ? z : !1,
          disabled: (D = a.disabled) != null ? D : !1
        };
      const { status: T, size: M, variant: j, color: E, textColor: J, disabled: X, stacked: te } = s;
      return {
        elevation: "",
        status: (P = a.status) != null ? P : T.value,
        size: (B = a.size) != null ? B : M.value,
        variant: (I = a.variant) != null ? I : j.value,
        color: (U = a.color) != null ? U : E.value,
        textColor: (L = a.textColor) != null ? L : J.value,
        iconContainer: a.iconContainer,
        stacked: (W = a.stacked) != null ? W : te.value,
        disabled: (N = a.disabled) != null ? N : X.value
      };
    });
    function p(w) {
      a.autoLoading && (l.value = !0, Promise.all(dt(w)).then(() => {
        l.value = !1;
      }).catch(() => {
        l.value = !1;
      }));
    }
    function f(w) {
      const { loading: $, onClick: b } = a;
      !b || $ || d.value.disabled || l.value || p(S(b, w));
    }
    function h(w) {
      const { loading: $, onTouchstart: b } = a;
      !b || $ || d.value.disabled || l.value || p(S(b, w));
    }
    function v() {
      a.focusable && (i.value = !0);
    }
    const y = { n: t, classes: o, loadingSizeMap: r, props: a, isFocusing: i, pending: l, buttonGroup: s, hovering: u, handleHovering: c, states: d, attemptAutoLoading: p, handleClick: f, handleTouchstart: h, handleFocus: v, get vHover() {
      return In;
    }, get MpHoverOverlay() {
      return Vn;
    }, get MpLoading() {
      return bo;
    }, get vRipple() {
      return an;
    } };
    return Object.defineProperty(y, "__isScriptSetup", { enumerable: !1, value: !0 }), y;
  }
}));
Hf.render = nC;
var Fa = Hf;
ae(Fa);
le(Fa, Uf);
const UM = Fa;
var Mn = Fa;
const Yf = {
  visibilityHeight: {
    type: [Number, String],
    default: 200
  },
  duration: {
    type: Number,
    default: 300
  },
  right: [Number, String],
  elevation: {
    type: [Boolean, Number, String],
    default: !0
  },
  bottom: [Number, String],
  target: [String, Object],
  onClick: R()
}, { name: tC, n: oC, classes: rC } = _("back-top");
function aC(e, n) {
  const t = oe("mp-icon"), o = oe("mp-button");
  return g(), ke(it, {
    to: "body",
    disabled: e.disabled
  }, [
    V(
      "div",
      Ye({
        ref: "backTopEl",
        class: e.classes(e.n(), [e.show, e.n("--active")]),
        style: {
          right: e.toSizeUnit(e.right),
          bottom: e.toSizeUnit(e.bottom)
        }
      }, e.$attrs, {
        onClick: n[0] || (n[0] = Tn((...r) => e.handleClick && e.handleClick(...r), ["stop"]))
      }),
      [
        F(e.$slots, "default", {}, () => [
          Z(o, {
            elevation: e.elevation,
            status: "primary",
            "mp-back-top-cover": ""
          }, {
            default: ue(() => [
              Z(t, { name: "chevron-up" })
            ]),
            _: 1
            /* STABLE */
          }, 8, ["elevation"])
        ])
      ],
      16
      /* FULL_PROPS */
    )
  ], 8, ["disabled"]);
}
const Wf = ne({
  name: tC,
  components: {
    MpButton: Mn,
    MpIcon: Qe
  },
  inheritAttrs: !1,
  props: Yf,
  setup(e) {
    const n = k(!1), t = k(null), o = k(!0);
    let r;
    const a = ha(() => {
      i();
    }, 200);
    ht(() => {
      s(), u(), i(), o.value = !1;
    }), Lt(u), ir(c);
    function i() {
      n.value = vt(r) >= tn(e.visibilityHeight);
    }
    function l(d) {
      S(e.onClick, d);
      const p = ar(r);
      Fo(r, {
        left: p,
        duration: e.duration,
        animation: Tf
      });
    }
    function s() {
      r = e.target ? Km(e.target, "BackTop") : At(t.value);
    }
    function u() {
      r.addEventListener("scroll", a);
    }
    function c() {
      r && r.removeEventListener("scroll", a);
    }
    return {
      disabled: o,
      show: n,
      backTopEl: t,
      toSizeUnit: Te,
      n: oC,
      classes: rC,
      handleClick: l
    };
  }
});
Wf.render = aC;
var Ua = Wf;
ae(Ua);
le(Ua, Yf);
const jM = Ua;
var Bl = Ua;
const Kf = {
  /**
   * 徽标的描述文本
   */
  description: String,
  /**
   * 显示为小红点
   */
  dot: Boolean,
  /**
   * 徽标最大显示数值，超出时显示为 `${max}+`，content 为数字时有效
   */
  max: {
    type: Number,
    default: 99
  },
  /**
   * 是否显示徽标
   */
  show: {
    type: Boolean,
    default: !0
  },
  /**
   * 徽标内容为 0 时是否显示
   */
  showZero: Boolean,
  /**
   * 横向偏移量（type=floating 时有效）
   */
  offsetX: {
    type: Number,
    default: 0
  },
  /**
   * 纵向偏移量
   */
  offsetY: {
    type: Number,
    default: 0
  },
  /**
   * 自定义背景色
   */
  color: String,
  /**
   * 徽标显示的内容
   */
  content: [Number, String],
  /**
   * 徽标显示的内容颜色
   */
  textColor: String,
  /**
   * 徽标布局类型，可选 `floating` | `inline`
   */
  type: {
    type: String,
    default: "floating"
  },
  /**
   * 徽标定位（type=floating 时有效）
   */
  position: {
    type: String,
    default: "top-right"
  },
  /**
   * 内联模式定位（type=inline 时有效）
   */
  inlinePosition: {
    type: String,
    default: "end"
  },
  /**
   * 徽标尺寸
   */
  size: {
    type: String,
    default: "md"
  },
  /**
   * 徽标状态色
   */
  status: {
    type: String,
    default: "default"
  },
  /**
   * 徽标变体
   */
  variant: {
    type: String,
    default: "default"
  }
};
var iC = Object.defineProperty, lC = Object.defineProperties, sC = Object.getOwnPropertyDescriptors, ed = Object.getOwnPropertySymbols, uC = Object.prototype.hasOwnProperty, cC = Object.prototype.propertyIsEnumerable, nd = (e, n, t) => n in e ? iC(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t, dC = (e, n) => {
  for (var t in n || (n = {}))
    uC.call(n, t) && nd(e, t, n[t]);
  if (ed)
    for (var t of ed(n))
      cC.call(n, t) && nd(e, t, n[t]);
  return e;
}, pC = (e, n) => lC(e, sC(n));
function mC(e, n, t, o, r, a) {
  return g(), C(
    "span",
    {
      class: m(o.wrapperClass)
    },
    [
      V(
        "div",
        {
          class: m(o.n("wrapper"))
        },
        [
          o.showValue ? (g(), C(
            Ae,
            { key: 0 },
            [
              o.slots.content ? (g(), C(
                "span",
                {
                  key: 0,
                  class: m(o.classes(o.n("custom-dot"), o.n("content-wrapper")))
                },
                [
                  F(e.$slots, "content")
                ],
                2
                /* CLASS */
              )) : o.dotComputed ? (g(), C(
                "span",
                {
                  key: 1,
                  class: m(o.n("content-wrapper")),
                  style: G(o.contentWrapperStyle)
                },
                [
                  V(
                    "span",
                    {
                      class: m(o.n("dot-content")),
                      style: G(o.contentStyle)
                    },
                    null,
                    6
                    /* CLASS, STYLE */
                  )
                ],
                6
                /* CLASS, STYLE */
              )) : typeof e.content < "u" ? (g(), C(
                "span",
                {
                  key: 2,
                  class: m(o.n("content-wrapper")),
                  style: G(o.contentWrapperStyle)
                },
                [
                  V(
                    "span",
                    {
                      class: m(o.n("content")),
                      style: G(o.contentStyle)
                    },
                    se(o.renderedContent),
                    7
                    /* TEXT, CLASS, STYLE */
                  )
                ],
                6
                /* CLASS, STYLE */
              )) : q("v-if", !0)
            ],
            64
            /* STABLE_FRAGMENT */
          )) : q("v-if", !0),
          o.slots.default || e.description ? (g(), C(
            "span",
            {
              key: 1,
              class: m(o.n("description-wrapper"))
            },
            [
              F(e.$slots, "default", {}, () => [
                De(
                  se(e.description),
                  1
                  /* TEXT */
                )
              ])
            ],
            2
            /* CLASS */
          )) : q("v-if", !0)
        ],
        2
        /* CLASS */
      )
    ],
    2
    /* CLASS */
  );
}
const qf = /* @__PURE__ */ ne(pC(dC({}, {
  name: _("badge").name
}), {
  __name: "Badge",
  props: Kf,
  setup(e, { expose: n }) {
    n();
    const { n: t, classes: o } = _("badge"), r = e, a = Vp(), i = O(() => !a.default && !r.description ? "inline" : r.type), l = O(() => (typeof r.content > "u", r.dot)), s = O(() => typeof r.content == "number" ? r.content : null), u = O(() => s.value !== null), c = O(() => r.show ? u.value ? r.showZero ? !0 : !!(s.value && s.value > 0) : !0 : !1), d = O(
      () => o(
        t(),
        t(`--type-${i.value}`),
        [i.value === "floating", t(`--position-${r.position}`)],
        [i.value === "inline", t(`--inline-position-${r.inlinePosition}`)],
        [l.value, t("--dot")],
        t(`--size-${r.size}`),
        t(`--status-${r.status}`),
        t(`--variant-${r.variant}`)
      )
    ), p = O(() => {
      const y = {};
      if (i.value === "floating") {
        const w = r.position;
        r.offsetX && (w === "top-left" || w === "bottom-left" ? y.marginInlineStart = `${r.offsetX}px` : y.marginInlineEnd = `${r.offsetX}px`), r.offsetY && (w === "top-left" || w === "top-right" ? y.marginBlockStart = `${r.offsetY}px` : y.marginBlockEnd = `${r.offsetY}px`);
      } else r.offsetY && (r.inlinePosition === "start" ? y.marginBlockStart = `${r.offsetY}px` : y.marginBlockEnd = `${r.offsetY}px`);
      return y;
    }), f = O(() => {
      const y = {};
      return r.color && (y.backgroundColor = r.color), r.textColor && (y.color = r.textColor), y;
    }), h = O(() => typeof r.content == "string" ? r.content : u.value && s.value && s.value > r.max ? `${r.max}+` : s.value), v = { n: t, classes: o, props: r, slots: a, computedType: i, dotComputed: l, countValue: s, hasCount: u, showValue: c, wrapperClass: d, contentWrapperStyle: p, contentStyle: f, renderedContent: h };
    return Object.defineProperty(v, "__isScriptSetup", { enumerable: !1, value: !0 }), v;
  }
}));
qf.render = mC;
var ja = qf;
ae(ja);
le(ja, Kf);
const HM = ja;
var ea = ja;
const Xf = {
  active: {
    type: [Number, String],
    default: 0
  },
  zIndex: {
    type: [Number, String],
    default: 1
  },
  fixed: Boolean,
  border: Boolean,
  variant: Boolean,
  safeArea: Boolean,
  activeColor: String,
  inactiveColor: String,
  placeholder: Boolean,
  fabProps: Object,
  onChange: R(),
  onBeforeChange: R(),
  onFabClick: R(),
  "onUpdate:active": R()
}, Gf = Symbol(
  "BOTTOM_NAVIGATION_BIND_BOTTOM_NAVIGATION_ITEM_KEY"
);
function fC() {
  const { childProviders: e, length: n, bindChildren: t } = kn(
    Gf
  );
  return {
    length: n,
    bottomNavigationItems: e,
    bindBottomNavigationItem: t
  };
}
var vC = Object.defineProperty, td = Object.getOwnPropertySymbols, gC = Object.prototype.hasOwnProperty, hC = Object.prototype.propertyIsEnumerable, od = (e, n, t) => n in e ? vC(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t, rd = (e, n) => {
  for (var t in n || (n = {}))
    gC.call(n, t) && od(e, t, n[t]);
  if (td)
    for (var t of td(n))
      hC.call(n, t) && od(e, t, n[t]);
  return e;
};
const { name: bC, n: yC, classes: wC } = _("bottom-navigation"), { n: Ha } = _("bottom-navigation-item"), ad = Ha("--mp-right-half-space"), id = Ha("--mp-left-half-space"), ld = Ha("--mp-right-space"), kC = {
  status: "primary"
};
function $C(e, n) {
  const t = oe("mp-button");
  return g(), C(
    Ae,
    null,
    [
      V(
        "div",
        Ye({
          ref: "bottomNavigationDom",
          class: e.classes(
            e.n(),
            e.n("$--box"),
            [e.fixed, e.n("--fixed")],
            [e.border, e.n("--border")],
            [e.safeArea, e.n("--safe-area")],
            [e.variant, e.n("--variant")]
          ),
          style: `z-index:${e.zIndex}`
        }, e.$attrs),
        [
          F(e.$slots, "default"),
          e.$slots.fab ? (g(), ke(t, Ye({
            key: 0,
            class: e.classes(e.n("fab"), [e.length % 2, e.n("--fab-right"), e.n("--fab-center")]),
            "mp-bottom-navigation__fab": ""
          }, e.fabProps, { onClick: e.handleFabClick }), {
            default: ue(() => [
              F(e.$slots, "fab")
            ]),
            _: 3
            /* FORWARDED */
          }, 16, ["class", "onClick"])) : q("v-if", !0)
        ],
        16
        /* FULL_PROPS */
      ),
      e.fixed && e.placeholder ? (g(), C(
        "div",
        {
          key: 0,
          class: m(e.n("placeholder")),
          style: G({ height: e.placeholderHeight })
        },
        null,
        6
        /* CLASS, STYLE */
      )) : q("v-if", !0)
    ],
    64
    /* STABLE_FRAGMENT */
  );
}
const Zf = ne({
  name: bC,
  components: { MpButton: Mn },
  props: Xf,
  setup(e, { slots: n }) {
    const t = k(null), o = O(() => e.active), r = O(() => e.activeColor), a = O(() => e.inactiveColor), i = O(() => e.variant), l = k(), s = k({}), { length: u, bottomNavigationItems: c, bindBottomNavigationItem: d } = fC();
    d({
      active: o,
      activeColor: r,
      inactiveColor: a,
      variant: i,
      onToggle: w
    }), pe(() => u.value, f), pe(
      () => e.fabProps,
      (L) => {
        s.value = rd(rd({}, kC), L);
      },
      { immediate: !0, deep: !0 }
    ), nt(U), yn(() => {
      U(), n.fab && D(u.value);
    }), nr(() => {
      z(), n.fab && D(u.value);
    });
    function f() {
      u.value === 0 || h() || v() || y();
    }
    function h() {
      return c.find(({ name: L }) => o.value === L.value);
    }
    function v() {
      return c.find(({ index: L }) => o.value === L.value);
    }
    function y() {
      zn(o.value) && (o.value < 0 ? S(e["onUpdate:active"], 0) : o.value > u.value - 1 && S(e["onUpdate:active"], u.value - 1));
    }
    function w(L) {
      o.value !== L && (e.onBeforeChange ? $(L) : b(L));
    }
    function $(L) {
      const W = dt(S(e.onBeforeChange, L));
      Promise.all(W).then((N) => {
        N.every(Boolean) && b(L);
      });
    }
    function b(L) {
      S(e["onUpdate:active"], L), S(e.onChange, L);
    }
    function z() {
      B().forEach((W) => {
        W.classList.remove(ad, id, ld);
      });
    }
    function D(L) {
      const W = B(), N = W.length, T = L % 2 === 0;
      W.forEach((M, j) => {
        P(T, M, j, N);
      });
    }
    function P(L, W, N, T) {
      const M = N === T - 1;
      if (!L && M) {
        W.classList.add(ld);
        return;
      }
      const j = N === T / 2 - 1, E = N === T / 2;
      j ? W.classList.add(ad) : E && W.classList.add(id);
    }
    function B() {
      return Array.from(t.value.querySelectorAll(`.${Ha()}`));
    }
    function I() {
      S(e.onFabClick);
    }
    function U() {
      if (!e.fixed || !e.placeholder)
        return;
      const { height: L } = nn(t.value);
      l.value = Te(L);
    }
    return {
      length: u,
      bottomNavigationDom: t,
      fabProps: s,
      placeholderHeight: l,
      n: yC,
      classes: wC,
      handleFabClick: I
    };
  }
});
Zf.render = $C;
var Ya = Zf;
ae(Ya);
le(Ya, Xf);
const YM = Ya;
var Ml = Ya;
const Jf = {
  name: String,
  label: String,
  icon: Le(dn, "name"),
  namespace: Le(dn, "namespace"),
  badge: {
    type: [Boolean, Object],
    default: !1
  },
  onClick: R()
};
function CC() {
  const { parentProvider: e, index: n, bindParent: t } = wn(
    Gf
  );
  return Xn(!!t, "BottomNavigationItem", "<mp-bottom-navigation-item/> must in <mp-bottom-navigation/>"), {
    index: n,
    bottomNavigation: e,
    bindBottomNavigation: t
  };
}
const { name: SC, n: zC, classes: PC } = _("bottom-navigation-item"), OC = {
  status: "danger",
  dot: !0
};
function EC(e, n) {
  const t = oe("mp-icon"), o = oe("mp-badge"), r = Je("ripple");
  return Ue((g(), C(
    "button",
    {
      class: m(e.classes(e.n(), e.n("$--box"), [e.variant, e.n("--variant-padding")], [e.isActive && !e.variant, e.n("--active")])),
      style: G({
        color: e.isActive ? e.activeColor : e.inactiveColor
      }),
      onClick: n[0] || (n[0] = (...a) => e.handleClick && e.handleClick(...a))
    },
    [
      V(
        "div",
        {
          class: m(
            e.classes(
              e.n("icon-container"),
              [e.variant, e.n("--variant-icon-container")],
              [e.isActive && e.variant, e.n("--variant-active")]
            )
          )
        },
        [
          e.badge ? (g(), ke(o, Ye({ key: 0 }, e.badgeProps, {
            class: e.n("badge"),
            "mp-bottom-navigation-item-cover": ""
          }), {
            default: ue(() => [
              F(e.$slots, "icon", { active: e.isActive }, () => [
                e.icon ? (g(), ke(t, {
                  key: 0,
                  name: e.icon,
                  namespace: e.namespace,
                  class: m(e.n("icon")),
                  "mp-bottom-navigation-item-cover": ""
                }, null, 8, ["name", "namespace", "class"])) : q("v-if", !0)
              ])
            ]),
            _: 3
            /* FORWARDED */
          }, 16, ["class"])) : F(e.$slots, "icon", {
            key: 1,
            active: e.isActive
          }, () => [
            e.icon ? (g(), ke(t, {
              key: 0,
              name: e.icon,
              namespace: e.namespace,
              class: m(e.n("icon")),
              "mp-bottom-navigation-item-cover": ""
            }, null, 8, ["name", "namespace", "class"])) : q("v-if", !0)
          ])
        ],
        2
        /* CLASS */
      ),
      V(
        "span",
        {
          class: m(e.n("label"))
        },
        [
          F(e.$slots, "default", {}, () => [
            De(
              se(e.label),
              1
              /* TEXT */
            )
          ])
        ],
        2
        /* CLASS */
      )
    ],
    6
    /* CLASS, STYLE */
  )), [
    [r]
  ]);
}
const Qf = ne({
  name: SC,
  components: {
    MpBadge: ea,
    MpIcon: Qe
  },
  directives: { Ripple: an },
  props: Jf,
  setup(e) {
    const n = O(() => e.name), t = O(() => [n.value, r.value].includes(l.value)), o = O(() => e.badge === !0 ? OC : e.badge), { index: r, bottomNavigation: a, bindBottomNavigation: i } = CC(), { active: l, activeColor: s, inactiveColor: u, variant: c } = a;
    i({
      name: n,
      index: r
    });
    function p() {
      var f;
      const h = (f = n.value) != null ? f : r.value;
      S(e.onClick, h), S(a.onToggle, h);
    }
    return {
      activeColor: s,
      inactiveColor: u,
      badgeProps: o,
      isActive: t,
      variant: c,
      n: zC,
      classes: PC,
      handleClick: p
    };
  }
});
Qf.render = EC;
var Wa = Qf;
ae(Wa);
le(Wa, Jf);
const WM = Wa;
var Dl = Wa;
const xf = {
  separator: {
    type: String,
    default: "/"
  }
}, _f = Symbol("BREADCRUMB_BIND_BREADCRUMB_ITEM_KEY");
function TC() {
  const { childProviders: e, bindChildren: n, length: t } = kn(
    _f
  );
  return {
    length: t,
    breadcrumbItems: e,
    bindBreadcrumbItems: n
  };
}
const { name: BC, n: MC } = _("breadcrumb");
function DC(e, n) {
  return g(), C(
    "div",
    {
      class: m(e.n()),
      role: "navigation",
      "aria-label": "Breadcrumb"
    },
    [
      F(e.$slots, "default")
    ],
    2
    /* CLASS */
  );
}
const ev = ne({
  name: BC,
  props: xf,
  setup(e) {
    const n = O(() => e.separator), { bindBreadcrumbItems: t, length: o } = TC();
    return t({
      length: o,
      separator: n
    }), { n: MC };
  }
});
ev.render = DC;
var Ka = ev;
ae(Ka);
le(Ka, xf);
const KM = Ka;
var Il = Ka;
const nv = {
  separator: String,
  onClick: R()
};
function IC() {
  const { parentProvider: e, bindParent: n, index: t } = wn(
    _f
  );
  return {
    index: t,
    breadcrumb: e,
    bindBreadcrumb: n
  };
}
const { name: AC, n: NC, classes: RC } = _("breadcrumb-item");
function LC(e, n) {
  return g(), C(
    "div",
    {
      class: m(e.n())
    },
    [
      V(
        "div",
        {
          class: m(e.classes(e.n("content"), [!e.isLast, e.n("--active")])),
          onClick: n[0] || (n[0] = (...t) => e.handleClick && e.handleClick(...t))
        },
        [
          F(e.$slots, "default")
        ],
        2
        /* CLASS */
      ),
      e.isLast ? q("v-if", !0) : F(e.$slots, "separator", { key: 0 }, () => {
        var t;
        return [
          V(
            "div",
            {
              class: m(e.n("separator")),
              "aria-hidden": "true"
            },
            se((t = e.separator) != null ? t : e.parentSeparator),
            3
            /* TEXT, CLASS */
          )
        ];
      })
    ],
    2
    /* CLASS */
  );
}
const tv = ne({
  name: AC,
  props: nv,
  setup(e) {
    const { index: n, breadcrumb: t, bindBreadcrumb: o } = IC(), r = O(() => !t || !n ? !1 : n.value === t.length.value - 1), a = O(() => t == null ? void 0 : t.separator.value);
    o == null || o(null);
    function i(l) {
      r.value || S(e.onClick, l);
    }
    return {
      n: NC,
      classes: RC,
      isLast: r,
      parentSeparator: a,
      handleClick: i
    };
  }
});
tv.render = LC;
var qa = tv;
ae(qa);
le(qa, nv);
const qM = qa;
var Al = qa;
const ov = {
  /**
   * 按钮组主题色
   */
  status: {
    type: String,
    default: "default"
  },
  /**
   * 按钮组尺寸
   */
  size: {
    type: String,
    default: "md"
  },
  /**
   * 按钮组变体
   */
  variant: {
    type: String,
    default: "default"
  },
  /**
   * 自定义背景色
   */
  color: String,
  /**
   * 自定义文字色
   */
  textColor: String,
  /**
   * 是否禁用
   */
  disabled: Boolean,
  /**
   * 是否堆叠
   */
  stacked: Boolean,
  /**
   * 是否纵向排列
   */
  vertical: Boolean,
  /**
   * 海拔阴影
   */
  elevation: {
    type: [Boolean, Number, String],
    default: !0
  }
};
var VC = Object.defineProperty, FC = Object.defineProperties, UC = Object.getOwnPropertyDescriptors, sd = Object.getOwnPropertySymbols, jC = Object.prototype.hasOwnProperty, HC = Object.prototype.propertyIsEnumerable, ud = (e, n, t) => n in e ? VC(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t, YC = (e, n) => {
  for (var t in n || (n = {}))
    jC.call(n, t) && ud(e, t, n[t]);
  if (sd)
    for (var t of sd(n))
      HC.call(n, t) && ud(e, t, n[t]);
  return e;
}, WC = (e, n) => FC(e, UC(n));
function KC(e, n, t, o, r, a) {
  return g(), C(
    "div",
    {
      class: m(
        o.classes(
          o.n(),
          o.n("$--box"),
          o.n(`--variant-${e.variant}`),
          [e.vertical, o.n("--vertical"), o.n("--horizontal")],
          [e.variant === "default", o.formatElevation(e.elevation, 2)]
        )
      )
    },
    [
      F(e.$slots, "default")
    ],
    2
    /* CLASS */
  );
}
const rv = /* @__PURE__ */ ne(WC(YC({}, {
  name: _("button-group").name
}), {
  __name: "ButtonGroup",
  props: ov,
  setup(e, { expose: n }) {
    const { n: t, classes: o } = _("button-group"), r = e, { bindButtons: a } = q$(), i = {
      elevation: O(() => r.elevation),
      status: O(() => r.status),
      size: O(() => r.size),
      variant: O(() => r.variant),
      color: O(() => r.color),
      textColor: O(() => r.textColor),
      disabled: O(() => r.disabled),
      stacked: O(() => r.stacked),
      vertical: O(() => r.vertical)
    };
    a(i), n({
      buttonGroupProvider: i
    });
    const l = { n: t, classes: o, props: r, bindButtons: a, buttonGroupProvider: i, get formatElevation() {
      return pn;
    } };
    return Object.defineProperty(l, "__isScriptSetup", { enumerable: !1, value: !0 }), l;
  }
}));
rv.render = KC;
var Xa = rv;
ae(Xa);
le(Xa, ov);
const XM = Xa;
var Nl = Xa;
const av = {
  src: String,
  fit: {
    type: String,
    default: "cover"
  },
  imageHeight: [String, Number],
  imageWidth: [String, Number],
  variant: {
    type: String,
    default: "standard"
  },
  layout: {
    type: String,
    default: "column"
  },
  floating: Boolean,
  floatingDuration: {
    type: Number,
    default: 250
  },
  alt: String,
  title: String,
  subtitle: String,
  description: String,
  elevation: {
    type: [Boolean, Number, String],
    default: !0
  },
  ripple: Boolean,
  onClick: R(),
  "onUpdate:floating": R(),
  /**
   * @deprecated use outlined variant instead
   */
  outline: Boolean
};
var qC = (e, n, t) => new Promise((o, r) => {
  var a = (s) => {
    try {
      l(t.next(s));
    } catch (u) {
      r(u);
    }
  }, i = (s) => {
    try {
      l(t.throw(s));
    } catch (u) {
      r(u);
    }
  }, l = (s) => s.done ? o(s.value) : Promise.resolve(s.value).then(a, i);
  l((t = t.apply(e, n)).next());
});
const { name: XC, n: GC, classes: ZC } = _("card"), JC = 500, QC = ["src", "alt"];
function xC(e, n) {
  const t = oe("mp-icon"), o = oe("mp-button"), r = Je("ripple");
  return Ue((g(), C(
    "div",
    {
      ref: "card",
      class: m(
        e.classes(
          e.n(),
          [e.isRow, e.n("--layout-row")],
          [e.variant === "outlined" || e.outline, e.n("--outline")],
          [e.variant === "filled", e.n("--filled")],
          [e.variant === "standard" || e.outline, e.formatElevation(e.elevation, 1)]
        )
      ),
      style: G({
        zIndex: e.floated ? e.zIndex : void 0
      }),
      onClick: n[0] || (n[0] = (...a) => e.handleClick && e.handleClick(...a))
    },
    [
      V(
        "div",
        {
          ref: "cardFloater",
          class: m(e.n("floater")),
          style: G({
            width: e.floaterWidth,
            height: e.floaterHeight,
            top: e.floaterTop,
            left: e.floaterLeft,
            overflow: e.floaterOverflow,
            position: e.floaterPosition,
            zIndex: e.floated ? e.zIndex : void 0,
            background: e.outline && !e.floated ? "transparent" : void 0,
            transition: e.floated ? `background-color ${e.floatingDuration}ms, color ${e.floatingDuration}ms, width ${e.floatingDuration}ms, height ${e.floatingDuration}ms, top ${e.floatingDuration}ms, left ${e.floatingDuration}ms` : void 0
          })
        },
        [
          F(e.$slots, "image", {}, () => [
            e.src ? (g(), C("img", {
              key: 0,
              class: m(e.n("image")),
              style: G({
                objectFit: e.fit,
                height: e.toSizeUnit(e.imageHeight),
                width: e.toSizeUnit(e.imageWidth)
              }),
              src: e.src,
              alt: e.alt
            }, null, 14, QC)) : q("v-if", !0)
          ]),
          V(
            "div",
            {
              class: m(e.n("container"))
            },
            [
              F(e.$slots, "title", {
                slotClass: e.n("title")
              }, () => [
                e.title ? (g(), C(
                  "div",
                  {
                    key: 0,
                    class: m(e.n("title"))
                  },
                  se(e.title),
                  3
                  /* TEXT, CLASS */
                )) : q("v-if", !0)
              ]),
              F(e.$slots, "subtitle", {
                slotClass: e.n("subtitle")
              }, () => [
                e.subtitle ? (g(), C(
                  "div",
                  {
                    key: 0,
                    class: m(e.n("subtitle"))
                  },
                  se(e.subtitle),
                  3
                  /* TEXT, CLASS */
                )) : q("v-if", !0)
              ]),
              e.$slots.default ? (g(), C(
                "div",
                {
                  key: 0,
                  class: m(e.n("content"))
                },
                [
                  F(e.$slots, "default")
                ],
                2
                /* CLASS */
              )) : q("v-if", !0),
              F(e.$slots, "description", {
                slotClass: e.n("description")
              }, () => [
                e.description ? (g(), C(
                  "div",
                  {
                    key: 0,
                    class: m(e.n("description"))
                  },
                  se(e.description),
                  3
                  /* TEXT, CLASS */
                )) : q("v-if", !0)
              ]),
              e.$slots.extra ? (g(), C(
                "div",
                {
                  key: 1,
                  class: m(e.n("footer"))
                },
                [
                  F(e.$slots, "extra")
                ],
                2
                /* CLASS */
              )) : q("v-if", !0),
              e.$slots["floating-content"] && !e.isRow ? (g(), C(
                "div",
                {
                  key: 2,
                  class: m(e.n("floating-content")),
                  style: G({
                    height: e.contentHeight,
                    opacity: e.opacity,
                    transition: `opacity ${e.floatingDuration * 2}ms`
                  })
                },
                [
                  F(e.$slots, "floating-content")
                ],
                6
                /* CLASS, STYLE */
              )) : q("v-if", !0)
            ],
            2
            /* CLASS */
          ),
          e.showFloatingButtons ? (g(), C(
            "div",
            {
              key: 0,
              class: m(e.classes(e.n("floating-buttons"), e.n("$--box"))),
              style: G({
                zIndex: e.zIndex,
                opacity: e.opacity,
                transition: `opacity ${e.floatingDuration * 2}ms`
              })
            },
            [
              F(e.$slots, "close-button", {}, () => [
                Z(o, {
                  "mp-card-cover": "",
                  class: m(e.classes(e.n("close-button"), e.n("$-elevation--6"))),
                  onClick: Tn(e.close, ["stop"])
                }, {
                  default: ue(() => [
                    Z(t, {
                      "mp-card-cover": "",
                      name: "window-close",
                      class: m(e.n("close-button-icon"))
                    }, null, 8, ["class"])
                  ]),
                  _: 1
                  /* STABLE */
                }, 8, ["class", "onClick"])
              ])
            ],
            6
            /* CLASS, STYLE */
          )) : q("v-if", !0)
        ],
        6
        /* CLASS, STYLE */
      ),
      V(
        "div",
        {
          class: m(e.n("holder")),
          style: G({
            width: e.holderWidth,
            height: e.holderHeight
          })
        },
        null,
        6
        /* CLASS, STYLE */
      )
    ],
    6
    /* CLASS, STYLE */
  )), [
    [r, { disabled: !e.ripple || e.floater }]
  ]);
}
const iv = ne({
  name: XC,
  directives: { Ripple: an },
  components: {
    MpIcon: Qe,
    MpButton: Mn
  },
  props: av,
  setup(e) {
    const n = k(null), t = k(null), o = k("auto"), r = k("auto"), a = k("100%"), i = k("100%"), l = k("auto"), s = k("auto"), u = k(void 0), c = k("hidden"), d = k("0px"), p = k("0"), f = O(() => e.layout === "row"), h = k(!1), v = k(!1), { zIndex: y } = ur(() => e.floating, 1);
    let w = "auto", $ = "auto", b = null;
    const z = k(null);
    sr(
      () => e.floating,
      () => !f.value
    ), pe(
      () => e.floating,
      (U) => {
        f.value || Ke(() => {
          U ? D() : P();
        });
      },
      { immediate: !0 }
    );
    function D() {
      clearTimeout(z.value), clearTimeout(b), z.value = null, z.value = setTimeout(
        () => qC(this, null, function* () {
          const { width: U, height: L, left: W, top: N } = nn(n.value);
          o.value = Te(U), r.value = Te(L), a.value = o.value, i.value = r.value, l.value = Te(N), s.value = Te(W), u.value = "fixed", w = l.value, $ = s.value, h.value = !0, yield bn(), l.value = "0", s.value = "0", a.value = "100vw", i.value = "100vh", d.value = "auto", p.value = "1", c.value = "auto", v.value = !0;
        }),
        e.ripple ? JC : 0
      );
    }
    function P() {
      clearTimeout(b), clearTimeout(z.value), z.value = null, a.value = o.value, i.value = r.value, l.value = w, s.value = $, d.value = "0px", p.value = "0", h.value = !1, b = setTimeout(() => {
        o.value = "auto", r.value = "auto", a.value = "100%", i.value = "100%", l.value = "auto", s.value = "auto", w = "auto", $ = "auto", c.value = "hidden", u.value = void 0, v.value = !1;
      }, e.floatingDuration);
    }
    function B() {
      S(e["onUpdate:floating"], !1);
    }
    function I(U) {
      S(e.onClick, U);
    }
    return {
      card: n,
      cardFloater: t,
      holderWidth: o,
      holderHeight: r,
      floater: z,
      floaterWidth: a,
      floaterHeight: i,
      floaterTop: l,
      floaterLeft: s,
      floaterPosition: u,
      floaterOverflow: c,
      contentHeight: d,
      opacity: p,
      zIndex: y,
      isRow: f,
      showFloatingButtons: h,
      floated: v,
      n: GC,
      classes: ZC,
      toSizeUnit: Te,
      close: B,
      formatElevation: pn,
      handleClick: I
    };
  }
});
iv.render = xC;
var Ga = iv;
ae(Ga);
le(Ga, av);
const GM = Ga;
var Rl = Ga;
const Tu = {
  loop: {
    type: Boolean,
    default: !0
  },
  autoplay: [String, Number, Object],
  duration: {
    type: [String, Number],
    default: 300
  },
  initialIndex: {
    type: [String, Number],
    default: 0
  },
  navigation: {
    type: [Boolean, String],
    default: !1
  },
  indicator: {
    type: Boolean,
    default: !0
  },
  indicatorColor: String,
  indicatorType: {
    type: String,
    default: "dot"
  },
  indicatorPosition: {
    type: String,
    default: "bottom"
  },
  vertical: Boolean,
  touchable: {
    type: Boolean,
    default: !0
  },
  draggable: {
    type: Boolean,
    default: !1
  },
  effect: {
    type: String,
    default: "slide"
  },
  slidesPerView: {
    type: [String, Number],
    default: 1
  },
  spaceBetween: {
    type: [String, Number],
    default: 0
  },
  centeredSlides: {
    type: Boolean,
    default: !1
  },
  height: String,
  transitionTimingFunction: {
    type: String,
    default: "cubic-bezier(0.25, 0.8, 0.5, 1)"
  },
  trigger: {
    type: String,
    default: "click"
  },
  mousewheel: {
    type: Boolean,
    default: !1
  },
  keyboard: {
    type: Boolean,
    default: !1
  },
  onChange: R()
};
var _C = Object.defineProperty, cd = Object.getOwnPropertySymbols, eS = Object.prototype.hasOwnProperty, nS = Object.prototype.propertyIsEnumerable, dd = (e, n, t) => n in e ? _C(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t, tS = (e, n) => {
  for (var t in n || (n = {}))
    eS.call(n, t) && dd(e, t, n[t]);
  if (cd)
    for (var t of cd(n))
      nS.call(n, t) && dd(e, t, n[t]);
  return e;
}, no = (e, n, t) => new Promise((o, r) => {
  var a = (s) => {
    try {
      l(t.next(s));
    } catch (u) {
      r(u);
    }
  }, i = (s) => {
    try {
      l(t.throw(s));
    } catch (u) {
      r(u);
    }
  }, l = (s) => s.done ? o(s.value) : Promise.resolve(s.value).then(a, i);
  l((t = t.apply(e, n)).next());
});
const oS = 250, pd = 20, { name: rS, n: md, classes: aS } = _("carousel"), iS = ["onClick", "onMouseenter"];
function lS(e, n) {
  const t = oe("mp-icon"), o = oe("mp-button"), r = Je("hover");
  return Ue((g(), C(
    "div",
    {
      ref: "carouselEl",
      class: m(
        e.classes(
          e.n(),
          [e.effect === "fade", e.n("--fade")],
          [e.effect === "card", e.n("--card")],
          [e.height, e.n("--custom-height")]
        )
      ),
      style: G(e.height ? { height: e.toSizeUnit(e.height) } : void 0),
      onMouseenter: n[12] || (n[12] = (...a) => e.handleMouseEnter && e.handleMouseEnter(...a)),
      onMouseleave: n[13] || (n[13] = (...a) => e.handleMouseLeave && e.handleMouseLeave(...a))
    },
    [
      q(" Track (only for slide/card effect) "),
      e.effect !== "fade" ? (g(), C(
        "div",
        {
          key: 0,
          class: m(e.classes(e.n("track"), [e.vertical, e.n("--vertical")])),
          style: G({
            width: e.vertical ? void 0 : e.toSizeUnit(e.trackSize),
            height: e.vertical ? e.toSizeUnit(e.trackSize) : void 0,
            transform: `translate${e.vertical ? "Y" : "X"}(${e.toSizeUnit(e.trackTranslate)})`,
            transitionDuration: e.lockDuration ? "0ms" : `${e.toNumber(e.duration)}ms`,
            transitionTimingFunction: e.transitionTimingFunction,
            gap: e.spaceBetween ? e.toSizeUnit(e.spaceBetween) : void 0
          }),
          onTouchstart: n[0] || (n[0] = (...a) => e.handleTouchstart && e.handleTouchstart(...a)),
          onTouchmove: n[1] || (n[1] = (...a) => e.handleTouchmove && e.handleTouchmove(...a)),
          onTouchend: n[2] || (n[2] = (...a) => e.handleTouchend && e.handleTouchend(...a)),
          onMousedown: n[3] || (n[3] = (...a) => e.handleMousedown && e.handleMousedown(...a)),
          onWheel: n[4] || (n[4] = (...a) => e.handleWheel && e.handleWheel(...a))
        },
        [
          F(e.$slots, "default")
        ],
        38
        /* CLASS, STYLE, NEED_HYDRATION */
      )) : q("v-if", !0),
      q(" Fade container "),
      e.effect === "fade" ? (g(), C(
        "div",
        {
          key: 1,
          class: m(e.n("fade-container")),
          onTouchstart: n[5] || (n[5] = (...a) => e.handleTouchstart && e.handleTouchstart(...a)),
          onTouchmove: n[6] || (n[6] = (...a) => e.handleTouchmove && e.handleTouchmove(...a)),
          onTouchend: n[7] || (n[7] = (...a) => e.handleTouchend && e.handleTouchend(...a)),
          onMousedown: n[8] || (n[8] = (...a) => e.handleMousedown && e.handleMousedown(...a)),
          onWheel: n[9] || (n[9] = (...a) => e.handleWheel && e.handleWheel(...a))
        },
        [
          F(e.$slots, "default")
        ],
        34
        /* CLASS, NEED_HYDRATION */
      )) : q("v-if", !0),
      q(" Prev Navigation "),
      e.showArrow !== "never" ? F(e.$slots, "prev", Wt(Ye({ key: 2 }, {
        index: e.index,
        length: e.length,
        prev: e.prev,
        next: e.next,
        to: e.to,
        hovering: e.hovering
      })), () => [
        Z(_e, {
          name: e.getNavigationAnimation("prev")
        }, {
          default: ue(() => [
            e.showArrow === "always" || e.hovering ? (g(), C(
              "div",
              {
                key: 0,
                class: m(e.classes(e.n("navigation"), e.n("navigation-prev"), [e.vertical, e.n("--navigation-vertical-prev")]))
              },
              [
                Z(o, {
                  "mp-carousel-cover": "",
                  disabled: !e.loop && e.index === 0,
                  class: m(e.n("navigation-prev-button")),
                  onClick: n[10] || (n[10] = (a) => e.prev())
                }, {
                  default: ue(() => [
                    Z(t, {
                      "mp-carousel-cover": "",
                      class: m(e.n("navigation-prev-button-icon")),
                      name: e.vertical ? "chevron-up" : "chevron-left"
                    }, null, 8, ["class", "name"])
                  ]),
                  _: 1
                  /* STABLE */
                }, 8, ["disabled", "class"])
              ],
              2
              /* CLASS */
            )) : q("v-if", !0)
          ]),
          _: 1
          /* STABLE */
        }, 8, ["name"])
      ]) : q("v-if", !0),
      q(" Next Navigation "),
      e.showArrow !== "never" ? F(e.$slots, "next", Wt(Ye({ key: 3 }, {
        index: e.index,
        length: e.length,
        prev: e.prev,
        next: e.next,
        to: e.to,
        hovering: e.hovering
      })), () => [
        Z(_e, {
          name: e.getNavigationAnimation("next")
        }, {
          default: ue(() => [
            e.showArrow === "always" || e.hovering ? (g(), C(
              "div",
              {
                key: 0,
                class: m(e.classes(e.n("navigation"), e.n("navigation-next"), [e.vertical, e.n("--navigation-vertical-next")]))
              },
              [
                Z(o, {
                  "mp-carousel-cover": "",
                  disabled: !e.loop && e.index === e.length - 1,
                  class: m(e.n("navigation-next-button")),
                  onClick: n[11] || (n[11] = (a) => e.next())
                }, {
                  default: ue(() => [
                    Z(t, {
                      "mp-carousel-cover": "",
                      class: m(e.n("navigation-next-button-icon")),
                      name: e.vertical ? "chevron-down" : "chevron-right"
                    }, null, 8, ["class", "name"])
                  ]),
                  _: 1
                  /* STABLE */
                }, 8, ["disabled", "class"])
              ],
              2
              /* CLASS */
            )) : q("v-if", !0)
          ]),
          _: 1
          /* STABLE */
        }, 8, ["name"])
      ]) : q("v-if", !0),
      q(" Indicator "),
      F(e.$slots, "indicator", Wt(pa({
        index: e.index,
        length: e.length,
        hovering: e.hovering,
        prev: e.prev,
        next: e.next,
        to: e.to
      })), () => [
        e.indicator && e.length ? (g(), C(
          "div",
          {
            key: 0,
            class: m(
              e.classes(
                e.n("indicators"),
                [e.vertical || e.indicatorPosition === "left" || e.indicatorPosition === "right", e.n("--indicators-vertical")],
                [e.indicatorPosition === "top", e.n("--indicators-top")],
                [e.indicatorPosition === "left", e.n("--indicators-left")],
                [e.indicatorPosition === "right", e.n("--indicators-right")],
                [e.indicatorPosition === "outer", e.n("--indicators-outer")]
              )
            )
          },
          [
            (g(!0), C(
              Ae,
              null,
              Xe(e.length, (a, i) => (g(), C("div", {
                key: a,
                class: m(
                  e.classes(
                    e.n("indicator"),
                    [e.indicatorType === "line", e.n("--indicator-line")],
                    [e.index === i, e.n("--indicator-active")],
                    [e.vertical || e.indicatorPosition === "left" || e.indicatorPosition === "right", e.n("--indicator-vertical")]
                  )
                ),
                style: G(tS({
                  background: e.indicatorColor
                }, e.indicatorType === "slider" && e.index === i ? { width: "16px" } : {})),
                onClick: (l) => e.trigger === "click" && e.to(i),
                onMouseenter: (l) => e.trigger === "hover" && e.to(i)
              }, null, 46, iS))),
              128
              /* KEYED_FRAGMENT */
            ))
          ],
          2
          /* CLASS */
        )) : q("v-if", !0)
      ])
    ],
    38
    /* CLASS, STYLE, NEED_HYDRATION */
  )), [
    [r, e.handleHovering]
  ]);
}
const lv = ne({
  name: rS,
  directives: { Hover: In },
  components: { MpButton: Mn, MpIcon: Qe },
  props: Tu,
  setup(e) {
    const n = k(null), t = k(0), o = O(() => e.vertical), r = k(0), a = k(0), i = k(!1), l = k(0), s = k(!1), u = k(!1), c = k(0), d = k(0), p = k(0), { carouselItems: f, bindCarouselItems: h, length: v } = D1(), { carouselResizeListeners: y, bindCarouselResizeListeners: w } = I1(), { popup: $, bindPopup: b } = Mm(), {
      deltaX: z,
      deltaY: D,
      moveX: P,
      moveY: B,
      offsetX: I,
      offsetY: U,
      touching: L,
      direction: W,
      startTime: N,
      startTouch: T,
      moveTouch: M,
      endTouch: j
    } = Co(), E = O(() => W.value === (e.vertical ? "vertical" : "horizontal")), J = O(() => e.navigation === !1 ? "never" : e.navigation === !0 || e.navigation === "always" ? "always" : "hover"), X = O(() => e.slidesPerView === "auto" ? "auto" : t.value / Math.max(1, Y(e.slidesPerView)));
    let te = !1, he = -1;
    h({
      size: X,
      currentIndex: l,
      vertical: o
    }), He(() => window, "keydown", Fe), S(b, null), S(w, null), pe(
      () => v.value,
      () => no(this, null, function* () {
        yield bn(), me(), qe();
      })
    ), $ && pe(
      () => $.show.value,
      (Q) => no(this, null, function* () {
        Q ? (yield bn(), qe()) : Ve();
      })
    ), Lt(qe), ir(Ve), nt(qe);
    function H(Q) {
      return f.find(({ index: fe }) => fe.value === Q);
    }
    function x() {
      if (!e.loop || v.value <= 1)
        return;
      const Q = Y(e.spaceBetween), fe = e.slidesPerView === "auto" ? t.value : X.value, Ee = v.value * (fe + Q) - Q;
      a.value >= 0 && H(v.value - 1).setTranslate(-Ee - (fe + Q)), a.value <= -(Ee - t.value + (fe + Q)) && H(0).setTranslate(Ee + (fe + Q)), a.value > -(Ee - t.value + (fe + Q)) && a.value < 0 && (H(v.value - 1).setTranslate(0), H(0).setTranslate(0));
    }
    function re(Q) {
      const fe = e.slidesPerView === "auto" ? t.value : X.value, Ee = Y(e.spaceBetween), Me = zn(Q) ? Q : Math.floor((a.value - (fe + Ee) / 2) / -(fe + Ee)), { loop: Ne } = e;
      return Me <= -1 ? Ne ? -1 : 0 : Me >= v.value ? Ne ? v.value : v.value - 1 : Me;
    }
    function ve(Q) {
      const { loop: fe } = e;
      return Q === -1 ? fe ? v.value - 1 : 0 : Q === v.value ? fe ? 0 : v.value - 1 : Q;
    }
    function A(Q) {
      return e.loop ? Q < 0 ? v.value + Q : Q >= v.value ? Q - v.value : Q : $n(Q, 0, v.value - 1);
    }
    function K() {
      return no(this, null, function* () {
        const Q = e.slidesPerView === "auto" ? t.value : X.value, fe = Y(e.spaceBetween), Ee = v.value * (Q + fe) - fe, Me = a.value >= Q + fe, Ne = a.value <= -(Ee - t.value + Q + fe), rn = 0, bt = -(Ee - t.value);
        i.value = !0, (Me || Ne) && (a.value = Ne ? rn : bt, H(0).setTranslate(0), H(v.value - 1).setTranslate(0)), yield bn(), i.value = !1;
      });
    }
    function me() {
      te || (l.value = A(Y(e.initialIndex)), te = !0);
    }
    function Se() {
      const { autoplay: Q } = e;
      !Q || v.value <= 1 || (Ve(), he = window.setTimeout(() => {
        ie(), Se();
      }, Y(Q)));
    }
    function Ve() {
      he && clearTimeout(he), he = -1;
    }
    function We() {
      const { autoplay: Q } = e;
      Q && typeof Q == "object" && Q.hoverToPause && Ve();
    }
    function on() {
      const { autoplay: Q } = e;
      Q && typeof Q == "object" && Q.hoverToPause && Se();
    }
    function gn(Q) {
      return no(this, null, function* () {
        v.value <= 1 || !e.touchable || (T(Q), Ve(), yield K(), i.value = !0);
      });
    }
    function Sn(Q) {
      const { touchable: fe } = e;
      !L.value || !fe || (M(Q), E.value && (Re(Q), a.value += o.value ? B.value : P.value, x()));
    }
    function hn() {
      if (!L.value || (j(), !E.value))
        return;
      const { onChange: Q } = e, fe = e.slidesPerView === "auto" ? t.value : X.value, Ee = Y(e.spaceBetween), Me = o.value ? D.value < 0 : z.value < 0, Ne = o.value ? U.value : I.value, bt = performance.now() - N.value <= oS && Ne >= pd ? re(Me ? l.value + 1 : l.value - 1) : re();
      i.value = !1, a.value = bt * -(fe + Ee);
      const Eo = l.value;
      l.value = ve(bt), Se(), Eo !== l.value && S(Q, l.value);
    }
    function Yt(Q) {
      if (v.value <= 1 || !e.draggable || e.touchable)
        return;
      u.value = !0, c.value = Q.clientX, d.value = Q.clientY, p.value = a.value, Ve();
      const fe = (Me) => {
        if (!u.value) return;
        const Ne = o.value ? Me.clientY - d.value : Me.clientX - c.value;
        a.value = p.value + Ne, x();
      }, Ee = () => {
        if (!u.value) return;
        u.value = !1;
        const Me = o.value ? Q.clientY - d.value : Q.clientX - c.value;
        document.removeEventListener("mousemove", fe), document.removeEventListener("mouseup", Ee);
        const Ne = e.slidesPerView === "auto" ? t.value : X.value, rn = Y(e.spaceBetween), { onChange: bt } = e, Eo = Me < 0, Yu = Math.abs(Me) >= pd ? re(Eo ? l.value + 1 : l.value - 1) : re();
        i.value = !1, a.value = Yu * -(Ne + rn);
        const bb = l.value;
        l.value = ve(Yu), Se(), bb !== l.value && S(bt, l.value);
      };
      document.addEventListener("mousemove", fe), document.addEventListener("mouseup", Ee);
    }
    function de(Q) {
      if (!e.mousewheel || v.value <= 1)
        return;
      Re(Q);
      const fe = o.value ? Q.deltaY : Q.deltaX;
      Math.abs(fe) < 10 || (fe > 0 ? ie() : $e());
    }
    function we(Q) {
      J.value === "hover" && (s.value = Q);
    }
    function Ce(Q) {
      return J.value !== "hover" ? "" : md(`--navigation${e.vertical ? "-vertical" : ""}-${Q}-animation`);
    }
    function Fe(Q) {
      if (!e.keyboard || !f.length || f.findIndex(({ isFocusing: Me }) => Me.value) === -1)
        return;
      const { key: Ee } = Q;
      Re(Q), (Ee === "ArrowLeft" || Ee === "ArrowUp") && $e(), (Ee === "ArrowRight" || Ee === "ArrowDown") && ie();
    }
    function qe() {
      if (!n.value)
        return;
      i.value = !0, t.value = e.vertical ? n.value.offsetHeight : n.value.offsetWidth;
      const Q = e.slidesPerView === "auto" ? t.value : X.value, fe = Y(e.spaceBetween);
      r.value = v.value * (Q + fe) - fe, a.value = -(l.value * (Q + fe)), f.forEach((Ee) => {
        Ee.setTranslate(0);
      }), Se(), setTimeout(() => {
        i.value = !1;
      }), y.forEach(({ onResize: Ee }) => {
        Ee();
      });
    }
    function ie(Q) {
      return no(this, null, function* () {
        if (v.value <= 1)
          return;
        me();
        const { loop: fe, onChange: Ee } = e, Me = l.value;
        l.value = A(Me + 1);
        const Ne = e.slidesPerView === "auto" ? t.value : X.value, rn = Y(e.spaceBetween);
        if ((Q == null ? void 0 : Q.event) !== !1 && S(Ee, l.value), yield K(), Me === v.value - 1 && fe) {
          H(0).setTranslate(r.value + (Ne + rn)), a.value = v.value * -(Ne + rn);
          return;
        }
        Me !== v.value - 1 && (a.value = l.value * -(Ne + rn));
      });
    }
    function $e(Q) {
      return no(this, null, function* () {
        if (v.value <= 1)
          return;
        me();
        const { loop: fe, onChange: Ee } = e, Me = l.value;
        l.value = A(Me - 1);
        const Ne = e.slidesPerView === "auto" ? t.value : X.value, rn = Y(e.spaceBetween);
        if ((Q == null ? void 0 : Q.event) !== !1 && S(Ee, l.value), yield K(), Me === 0 && fe) {
          H(v.value - 1).setTranslate(-(r.value + (Ne + rn))), a.value = Ne + rn;
          return;
        }
        Me !== 0 && (a.value = l.value * -(Ne + rn));
      });
    }
    function Oe(Q, fe) {
      if (v.value <= 1 || Q === l.value)
        return;
      Q = Q < 0 ? 0 : Q, Q = Q >= v.value ? v.value : Q;
      const Ee = Q > l.value ? ie : $e, Me = Math.abs(Q - l.value);
      Array.from({ length: Me }).forEach((Ne, rn) => {
        Ee({ event: rn === Me - 1 ? fe == null ? void 0 : fe.event : !1 });
      });
    }
    return {
      length: v,
      index: l,
      carouselEl: n,
      trackSize: r,
      trackTranslate: a,
      lockDuration: i,
      hovering: s,
      showArrow: J,
      n: md,
      toSizeUnit: Te,
      classes: aS,
      handleTouchstart: gn,
      handleTouchmove: Sn,
      handleTouchend: hn,
      handleMousedown: Yt,
      handleWheel: de,
      handleMouseEnter: We,
      handleMouseLeave: on,
      next: ie,
      prev: $e,
      to: Oe,
      resize: qe,
      toNumber: Y,
      handleHovering: we,
      getNavigationAnimation: Ce
    };
  }
});
lv.render = lS;
var Za = lv;
ae(Za);
le(Za, Tu);
const ZM = Za;
var Xo = Za;
function sS() {
  const { bindParent: e, index: n, parentProvider: t } = wn(
    rf
  );
  return Xn(!!e, "CarouselItem", "<mp-carousel-item/> must in <mp-carousel/>"), {
    index: n,
    carousel: t,
    bindCarousel: e
  };
}
const { name: uS } = _("carousel-item"), cS = ["aria-hidden"];
function dS(e, n) {
  return g(), C("div", {
    class: m(e.n()),
    style: G(e.itemStyle),
    tabindex: "-1",
    "aria-hidden": e.currentIndex !== e.index,
    onFocus: n[0] || (n[0] = (t) => e.isFocusing = !0),
    onBlur: n[1] || (n[1] = (t) => e.isFocusing = !1)
  }, [
    F(e.$slots, "default")
  ], 46, cS);
}
const sv = ne({
  name: uS,
  setup() {
    const e = k(0), n = k(!1), { carousel: t, bindCarousel: o, index: r } = sS(), { size: a, currentIndex: i, vertical: l } = t, s = O(() => {
      const d = {};
      return l.value ? d.height = Te(a.value) : d.width = Te(a.value), e.value && (d.transform = `translate${l.value ? "Y" : "X"}(${Te(e.value)})`), d;
    }), u = {
      index: r,
      isFocusing: O(() => n.value),
      setTranslate: c
    };
    o(u);
    function c(d) {
      e.value = d;
    }
    return {
      isFocusing: n,
      size: a,
      index: r,
      currentIndex: i,
      itemStyle: s
    };
  }
});
sv.render = dS;
var Bu = sv;
ae(Bu);
const JM = Bu;
var Go = Bu;
const uv = {
  title: String,
  icon: Le(dn, "name"),
  namespace: Le(dn, "namespace"),
  description: String,
  border: Boolean,
  borderOffset: [Number, String],
  iconClass: String,
  titleClass: String,
  descriptionClass: String,
  extraClass: String,
  ripple: Boolean,
  onClick: R()
}, { name: pS, n: mS, classes: fS } = _("cell");
function vS(e, n) {
  const t = oe("mp-icon"), o = Je("ripple");
  return Ue((g(), C(
    "div",
    {
      class: m(e.classes(e.n(), [e.border, e.n("--border")], [e.onClick, e.n("--cursor")])),
      style: G(e.borderOffsetStyles),
      onClick: n[0] || (n[0] = (...r) => e.handleClick && e.handleClick(...r))
    },
    [
      F(e.$slots, "icon", {}, () => [
        e.icon ? (g(), C(
          "div",
          {
            key: 0,
            class: m(e.classes(e.n("icon"), e.iconClass))
          },
          [
            Z(t, {
              name: e.icon,
              namespace: e.namespace
            }, null, 8, ["name", "namespace"])
          ],
          2
          /* CLASS */
        )) : q("v-if", !0)
      ]),
      V(
        "div",
        {
          class: m(e.n("content"))
        },
        [
          F(e.$slots, "default", {}, () => [
            e.title ? (g(), C(
              "div",
              {
                key: 0,
                class: m(e.classes(e.n("title"), e.titleClass))
              },
              se(e.title),
              3
              /* TEXT, CLASS */
            )) : q("v-if", !0)
          ]),
          F(e.$slots, "description", {}, () => [
            e.description ? (g(), C(
              "div",
              {
                key: 0,
                class: m(e.classes(e.n("description"), e.descriptionClass))
              },
              se(e.description),
              3
              /* TEXT, CLASS */
            )) : q("v-if", !0)
          ])
        ],
        2
        /* CLASS */
      ),
      e.$slots.extra ? (g(), C(
        "div",
        {
          key: 0,
          class: m(e.classes(e.n("extra"), e.extraClass))
        },
        [
          F(e.$slots, "extra")
        ],
        2
        /* CLASS */
      )) : q("v-if", !0)
    ],
    6
    /* CLASS, STYLE */
  )), [
    [o, { disabled: !e.ripple }]
  ]);
}
const cv = ne({
  name: pS,
  components: { MpIcon: Qe },
  directives: { Ripple: an },
  props: uv,
  setup(e) {
    const n = O(() => e.borderOffset == null ? {} : {
      "--mp-cell-border-left": Te(e.borderOffset),
      "--mp-cell-border-right": Te(e.borderOffset)
    });
    function t(o) {
      S(e.onClick, o);
    }
    return {
      borderOffsetStyles: n,
      n: mS,
      classes: fS,
      toSizeUnit: Te,
      handleClick: t
    };
  }
});
cv.render = vS;
var Ja = cv;
ae(Ja);
le(Ja, uv);
const QM = Ja;
var Ll = Ja;
const dv = {
  modelValue: {
    type: Array,
    default: () => []
  },
  max: [String, Number],
  options: {
    type: Array,
    default: () => []
  },
  labelKey: {
    type: String,
    default: "label"
  },
  valueKey: {
    type: String,
    default: "value"
  },
  direction: {
    type: String,
    default: "horizontal"
  },
  validateTrigger: {
    type: Array,
    default: () => ["onChange"]
  },
  rules: [Array, Function, Object],
  onChange: R(),
  "onUpdate:modelValue": R()
}, { name: gS, n: hS, classes: bS } = _("checkbox-group");
function yS(e, n) {
  const t = oe("maybe-v-node"), o = oe("mp-checkbox"), r = oe("mp-form-details");
  return g(), C(
    "div",
    {
      class: m(e.n("wrap"))
    },
    [
      V(
        "div",
        {
          class: m(e.classes(e.n(), e.n(`--${e.direction}`)))
        },
        [
          e.options.length ? (g(!0), C(
            Ae,
            { key: 0 },
            Xe(e.options, (a) => (g(), ke(o, {
              key: a[e.valueKey],
              "checked-value": a[e.valueKey],
              disabled: a.disabled
            }, {
              default: ue(({ checked: i }) => [
                Z(t, {
                  is: e.isFunction(a[e.labelKey]) ? a[e.labelKey](a, i) : a[e.labelKey]
                }, null, 8, ["is"])
              ]),
              _: 2
              /* DYNAMIC */
            }, 1032, ["checked-value", "disabled"]))),
            128
            /* KEYED_FRAGMENT */
          )) : q("v-if", !0),
          F(e.$slots, "default")
        ],
        2
        /* CLASS */
      ),
      Z(r, { "error-message": e.errorMessage }, null, 8, ["error-message"])
    ],
    2
    /* CLASS */
  );
}
const pv = ne({
  name: gS,
  components: { MpFormDetails: Bn, MpCheckbox: mo, MaybeVNode: lr },
  props: dv,
  setup(e) {
    const n = O(() => e.max), t = O(() => e.modelValue.length), { length: o, checkboxes: r, bindCheckboxes: a } = ew(), { bindForm: i } = jn(), {
      errorMessage: l,
      validateWithTrigger: s,
      validate: u,
      // expose
      resetValidation: c
    } = Un(), d = O(() => l.value), p = {
      max: n,
      checkedCount: t,
      onChecked: v,
      onUnchecked: y,
      validate: D,
      resetValidation: c,
      reset: z,
      errorMessage: d
    };
    pe(() => e.modelValue, w, { deep: !0 }), pe(() => o.value, w), a(p), S(i, p);
    function f(P) {
      Ke(() => {
        const { validateTrigger: B, rules: I, modelValue: U } = e;
        s(B, P, I, U);
      });
    }
    function h(P) {
      S(e["onUpdate:modelValue"], P), S(e.onChange, P), f("onChange");
    }
    function v(P) {
      const { modelValue: B } = e;
      B.includes(P) || h([...B, P]);
    }
    function y(P) {
      const { modelValue: B } = e;
      B.includes(P) && h(B.filter((I) => I !== P));
    }
    function w() {
      r.forEach(({ sync: P }) => P(e.modelValue));
    }
    function $() {
      const P = r.map(({ checkedValue: I }) => I.value), B = vl(P);
      return S(e["onUpdate:modelValue"], B), B;
    }
    function b() {
      const P = r.filter(({ checked: I }) => !I.value).map(({ checkedValue: I }) => I.value), B = vl(P);
      return S(e["onUpdate:modelValue"], B), B;
    }
    function z() {
      S(e["onUpdate:modelValue"], []), c();
    }
    function D() {
      return u(e.rules, e.modelValue);
    }
    return {
      errorMessage: l,
      n: hS,
      classes: bS,
      checkAll: $,
      inverseAll: b,
      reset: z,
      validate: D,
      resetValidation: c,
      isFunction: vn
    };
  }
});
pv.render = yS;
var Qa = pv;
ae(Qa);
le(Qa, dv);
const xM = Qa;
var Vl = Qa;
const mv = {
  type: {
    type: String,
    default: "default"
  },
  size: {
    type: String,
    default: "normal"
  },
  color: String,
  textColor: String,
  iconName: Le(dn, "name"),
  namespace: Le(dn, "namespace"),
  plain: Boolean,
  round: {
    type: Boolean,
    default: !0
  },
  elevation: {
    type: [Boolean, Number, String],
    default: !1
  },
  block: Boolean,
  closeable: Boolean,
  onClose: R()
}, { name: wS, n: wt, classes: kS } = _("chip");
function $S(e, n) {
  const t = oe("mp-icon");
  return g(), ke(_e, {
    name: e.n("$-fade")
  }, {
    default: ue(() => [
      V(
        "span",
        Ye({
          class: e.classes(e.n(), e.n("$--box"), e.formatElevation(e.elevation, 1), ...e.contentClass),
          style: e.chipStyle
        }, e.$attrs),
        [
          F(e.$slots, "left"),
          V(
            "span",
            {
              class: m(e.n(`text-${e.size}`))
            },
            [
              F(e.$slots, "default")
            ],
            2
            /* CLASS */
          ),
          F(e.$slots, "right"),
          e.closeable ? (g(), C(
            "span",
            {
              key: 0,
              class: m(e.n("--close")),
              onClick: n[0] || (n[0] = (...o) => e.handleClose && e.handleClose(...o))
            },
            [
              Z(t, {
                name: `${e.iconName ? e.iconName : "close-circle"}`,
                namespace: e.namespace
              }, null, 8, ["name", "namespace"])
            ],
            2
            /* CLASS */
          )) : q("v-if", !0)
        ],
        16
        /* FULL_PROPS */
      )
    ]),
    _: 3
    /* FORWARDED */
  }, 8, ["name"]);
}
const fv = ne({
  name: wS,
  components: {
    MpIcon: Qe
  },
  inheritAttrs: !1,
  props: mv,
  setup(e) {
    const n = O(() => {
      const { plain: r, textColor: a, color: i } = e;
      return r ? {
        color: a || i,
        borderColor: i
      } : {
        color: a,
        background: i
      };
    }), t = O(() => {
      const { size: r, block: a, type: i, plain: l, round: s } = e, u = wt(a ? "$--flex" : "$--inline-flex"), c = l ? `${wt("plain")} ${wt(`plain-${i}`)}` : wt(`--${i}`), d = s ? wt("--round") : null;
      return [wt(`--${r}`), u, c, d];
    });
    function o(r) {
      S(e.onClose, r);
    }
    return {
      chipStyle: n,
      contentClass: t,
      n: wt,
      classes: kS,
      formatElevation: pn,
      handleClose: o
    };
  }
});
fv.render = $S;
var xa = fv;
ae(xa);
le(xa, mv);
const _M = xa;
var na = xa;
const Fl = Symbol("HIGHLIGHTER_PROVIDER_KEY");
function CS(e) {
  Js(Fl, e);
}
function SS() {
  return lu(Fl) ? Zs(Fl) : { highlighter: null, theme: null };
}
const vv = {
  code: {
    type: String,
    default: ""
  },
  language: String,
  theme: String,
  wordWrap: Boolean,
  trim: {
    type: Boolean,
    default: !0
  }
};
var zS = (e, n, t) => new Promise((o, r) => {
  var a = (s) => {
    try {
      l(t.next(s));
    } catch (u) {
      r(u);
    }
  }, i = (s) => {
    try {
      l(t.throw(s));
    } catch (u) {
      r(u);
    }
  }, l = (s) => s.done ? o(s.value) : Promise.resolve(s.value).then(a, i);
  l((t = t.apply(e, n)).next());
});
const { name: PS, n: OS, classes: ES } = _("code"), TS = ["innerHTML"];
function BS(e, n) {
  return g(), C("div", {
    class: m(e.classes(e.n(), [e.wordWrap, e.n("--word-wrap")])),
    innerHTML: e.highlightedCode
  }, null, 10, TS);
}
const gv = ne({
  name: PS,
  props: vv,
  setup(e) {
    const { highlighter: n, theme: t } = SS(), o = k(""), r = O(() => {
      var a;
      return (a = e.theme) != null ? a : t == null ? void 0 : t.value;
    });
    return n && pe(
      () => [n.value, e.code, e.language, r.value, e.trim],
      (a) => zS(this, [a], function* ([i, l, s = "", u = "", c]) {
        i && (o.value = yield i.codeToHtml(c ? l.trim() : l, { lang: s, theme: u }));
      }),
      { immediate: !0 }
    ), {
      n: OS,
      classes: ES,
      highlightedCode: o
    };
  }
});
gv.render = BS;
var _a = gv;
ae(_a);
le(_a, vv);
const eD = _a;
var Ul = _a;
const hv = {
  span: {
    type: [String, Number],
    default: 24
  },
  offset: {
    type: [String, Number],
    default: 0
  },
  direction: {
    type: String,
    default: "row"
  },
  justify: String,
  align: String,
  xs: [Object, Number, String],
  sm: [Object, Number, String],
  md: [Object, Number, String],
  lg: [Object, Number, String],
  xl: [Object, Number, String],
  onClick: R()
}, bv = Symbol("ROW_BIND_COL_KEY");
function MS() {
  const { length: e, childProviders: n, bindChildren: t } = kn(bv);
  return {
    length: e,
    cols: n,
    bindCols: t
  };
}
function DS() {
  const { index: e, bindParent: n, parentProvider: t } = wn(bv);
  return {
    index: e,
    row: t,
    bindRow: n
  };
}
const { name: IS, n: wr, classes: AS } = _("col");
function NS(e, n) {
  return g(), C(
    "div",
    {
      class: m(
        e.classes(
          e.n(),
          e.n("$--box"),
          [e.span >= 0, e.n(`--span-${e.span}`)],
          [e.offset, e.n(`--offset-${e.offset}`)],
          ...e.getSize("xs", e.xs),
          ...e.getSize("sm", e.sm),
          ...e.getSize("md", e.md),
          ...e.getSize("lg", e.lg),
          ...e.getSize("xl", e.xl)
        )
      ),
      style: G({
        flexDirection: e.direction,
        justifyContent: e.padStartFlex(e.justify),
        alignItems: e.padStartFlex(e.align),
        paddingLeft: e.toSizeUnit(e.padding.left),
        paddingRight: e.toSizeUnit(e.padding.right),
        paddingTop: e.toSizeUnit(e.padding.top),
        paddingBottom: e.toSizeUnit(e.padding.bottom)
      }),
      onClick: n[0] || (n[0] = (...t) => e.handleClick && e.handleClick(...t))
    },
    [
      F(e.$slots, "default")
    ],
    6
    /* CLASS, STYLE */
  );
}
const yv = ne({
  name: IS,
  props: hv,
  setup(e) {
    const n = O(() => Y(e.span)), t = O(() => Y(e.offset)), o = O(() => {
      var s;
      const [u = 0, c = 0] = (s = r == null ? void 0 : r.average.value) != null ? s : [];
      return { left: c, right: c, top: u, bottom: u };
    }), { row: r, bindRow: a } = DS();
    S(a, null);
    function i(s, u) {
      const c = [];
      if (u == null)
        return c;
      if (Ln(u)) {
        const { offset: d, span: p } = u;
        return Number(p) >= 0 && c.push(wr(`--span-${s}-${p}`)), d && c.push(wr(`--offset-${s}-${d}`)), c;
      }
      return Number(u) >= 0 && c.push(wr(`--span-${s}-${u}`)), c;
    }
    function l(s) {
      S(e.onClick, s);
    }
    return {
      span: n,
      offset: t,
      padding: o,
      n: wr,
      classes: AS,
      toNumber: Y,
      toSizeUnit: Te,
      getSize: i,
      handleClick: l,
      padStartFlex: Qr
    };
  }
});
yv.render = NS;
var ei = yv;
ae(ei);
le(ei, hv);
const nD = ei;
var jl = ei;
const wv = {
  modelValue: [Array, String, Number],
  accordion: Boolean,
  offset: {
    type: Boolean,
    default: !0
  },
  divider: {
    type: Boolean,
    default: !0
  },
  elevation: {
    type: [Boolean, String, Number],
    default: !0
  },
  onChange: R(),
  "onUpdate:modelValue": R()
}, kv = Symbol("COLLAPSE_BIND_COLLAPSE_ITEM_KEY");
function RS() {
  const { childProviders: e, length: n, bindChildren: t } = kn(
    kv
  );
  return {
    length: n,
    collapseItems: e,
    bindCollapseItems: t
  };
}
const { name: LS, n: VS } = _("collapse");
function FS(e, n) {
  return g(), C(
    "div",
    {
      class: m(e.n())
    },
    [
      F(e.$slots, "default")
    ],
    2
    /* CLASS */
  );
}
const $v = ne({
  name: LS,
  props: wv,
  setup(e) {
    const n = O(() => e.offset), t = O(() => e.divider), o = O(() => e.elevation), r = O(() => e.accordion), a = O(() => dt(e.modelValue)), { length: i, collapseItems: l, bindCollapseItems: s } = RS(), u = {
      offset: n,
      divider: t,
      elevation: o,
      accordion: r,
      updateItem: c
    };
    pe(
      () => i.value,
      () => Ke().then(f)
    ), pe(
      () => e.modelValue,
      () => Ke().then(f)
    ), s(u);
    function c(v, y) {
      if (e.accordion) {
        d(y ? v : void 0);
        return;
      }
      const w = y ? [...a.value, v] : a.value.filter(($) => $ !== v);
      d(w);
    }
    function d(v) {
      S(e["onUpdate:modelValue"], v), S(e.onChange, v);
    }
    function p() {
      if (e.accordion) {
        const [w] = a.value;
        if (w == null)
          return;
        const $ = l.find(({ name: b }) => w === b.value);
        return $ ?? l.find(({ index: b, name: z }) => z.value == null && w === b.value);
      }
      const v = l.filter(
        ({ name: w }) => w.value != null && a.value.includes(w.value)
      ), y = l.filter(
        ({ index: w, name: $ }) => $.value == null && a.value.includes(w.value)
      );
      return [...v, ...y];
    }
    function f() {
      const v = em(dt(p()));
      l.forEach((y) => {
        y.init(v.includes(y));
      });
    }
    return {
      divider: t,
      n: VS,
      toggleAll: (v) => {
        if (e.accordion)
          return;
        const w = l.filter(($) => {
          var b;
          const z = (b = $.name.value) != null ? b : $.index.value, D = a.value.includes(z);
          return v.skipDisabled && $.disabled.value ? D : v.expand === "inverse" ? !D : v.expand;
        }).map(($) => {
          var b;
          return (b = $.name.value) != null ? b : $.index.value;
        });
        d(w);
      }
    };
  }
});
$v.render = FS;
var ni = $v;
ae(ni);
le(ni, wv);
const tD = ni;
var Hl = ni, fd = (e, n, t) => new Promise((o, r) => {
  var a = (s) => {
    try {
      l(t.next(s));
    } catch (u) {
      r(u);
    }
  }, i = (s) => {
    try {
      l(t.throw(s));
    } catch (u) {
      r(u);
    }
  }, l = (s) => s.done ? o(s.value) : Promise.resolve(s.value).then(a, i);
  l((t = t.apply(e, n)).next());
});
function Cv(e) {
  const { contentEl: n, showContent: t, expand: o } = e;
  let r = !0;
  pe(
    o,
    (u) => {
      Ke(() => {
        u ? a() : i();
      });
    },
    { immediate: !0 }
  );
  function a() {
    return fd(this, null, function* () {
      if (!n.value || (n.value.style.height = "", t.value = !0, yield pt(), !n.value))
        return;
      const { offsetHeight: u } = n.value;
      n.value.style.height = "0px", yield pt(), n.value && (n.value.style.height = u + "px", r && (yield bn(), r && l()));
    });
  }
  const i = () => fd(this, null, function* () {
    if (!n.value)
      return;
    const { offsetHeight: u } = n.value;
    n.value.style.height = u + "px", yield pt(), n.value.style.height = "0px";
  }), l = () => {
    o.value || (t.value = !1), n.value.style.height = "";
  };
  return {
    handleTransitionEnd: l,
    handleTransitionStart: () => {
      r = !1;
    }
  };
}
const Sv = {
  name: [String, Number],
  title: String,
  icon: {
    type: String,
    default: "chevron-down"
  },
  disabled: Boolean
};
function US() {
  const { parentProvider: e, index: n, bindParent: t } = wn(
    kv
  );
  return Xn(!!t, "Collapse", "<mp-collapse-item/> must in <mp-collapse>"), {
    index: n,
    collapse: e,
    bindCollapse: t
  };
}
const { name: jS, n: HS, classes: YS } = _("collapse-item"), WS = ["aria-expanded", "aria-disabled", "role"];
function KS(e, n) {
  const t = oe("mp-icon");
  return g(), C(
    "div",
    {
      class: m(e.classes(e.n(), [e.offset && e.isShow, e.n("--active")], [e.disabled, e.n("--disable")])),
      style: G(`--mp-collapse-divider-top: ${e.divider ? "var(--mp-collapse-border-top)" : "none"}`)
    },
    [
      V(
        "div",
        {
          class: m(e.classes(e.n("shadow"), e.formatElevation(e.elevation, 2)))
        },
        null,
        2
        /* CLASS */
      ),
      V("div", {
        class: m(e.classes(e.n("header"), [!e.disabled, e.n("header--cursor-pointer")])),
        "aria-expanded": e.isShow,
        "aria-disabled": e.disabled,
        role: e.accordion ? "tab" : "button",
        onClick: n[0] || (n[0] = (...o) => e.toggle && e.toggle(...o))
      }, [
        e.$slots.title || e.title ? (g(), C(
          "div",
          {
            key: 0,
            class: m(e.n("header-title"))
          },
          [
            F(e.$slots, "title", {}, () => [
              De(
                se(e.title),
                1
                /* TEXT */
              )
            ])
          ],
          2
          /* CLASS */
        )) : q("v-if", !0),
        V(
          "div",
          {
            class: m(e.n("header-icon"))
          },
          [
            F(e.$slots, "icon", {}, () => [
              Z(t, {
                name: e.icon,
                transition: 250,
                class: m(
                  e.classes(
                    e.n("header-icon"),
                    [e.isShow && e.icon === "chevron-down", e.n("header-open")],
                    [e.disabled, e.n("header--disable")]
                  )
                )
              }, null, 8, ["name", "class"])
            ])
          ],
          2
          /* CLASS */
        )
      ], 10, WS),
      Ue(V(
        "div",
        {
          ref: "contentEl",
          class: m(e.n("content")),
          onTransitionend: n[1] || (n[1] = (...o) => e.handleTransitionEnd && e.handleTransitionEnd(...o)),
          onTransitionstart: n[2] || (n[2] = (...o) => e.handleTransitionStart && e.handleTransitionStart(...o))
        },
        [
          V(
            "div",
            {
              class: m(e.n("content-wrap"))
            },
            [
              F(e.$slots, "default")
            ],
            2
            /* CLASS */
          )
        ],
        34
        /* CLASS, NEED_HYDRATION */
      ), [
        [xn, e.showContent]
      ])
    ],
    6
    /* CLASS, STYLE */
  );
}
const zv = ne({
  name: jS,
  components: {
    MpIcon: Qe
  },
  props: Sv,
  setup(e) {
    const n = k(!1), t = k(!1), o = k(null), r = O(() => e.name), a = O(() => e.disabled), { index: i, collapse: l, bindCollapse: s } = US(), { offset: u, divider: c, elevation: d, accordion: p, updateItem: f } = l;
    s({
      index: i,
      name: r,
      disabled: a,
      init: w
    });
    const { handleTransitionEnd: v, handleTransitionStart: y } = Cv({
      contentEl: o,
      showContent: t,
      expand: n
    });
    function w(b) {
      n.value = b;
    }
    function $() {
      var b;
      e.disabled || f((b = e.name) != null ? b : i.value, !n.value);
    }
    return {
      isShow: n,
      showContent: t,
      offset: u,
      divider: c,
      elevation: d,
      contentEl: o,
      accordion: p,
      n: HS,
      classes: YS,
      toggle: $,
      formatElevation: pn,
      handleTransitionEnd: v,
      handleTransitionStart: y
    };
  }
});
zv.render = KS;
var ti = zv;
ae(ti);
le(ti, Sv);
const oD = ti;
var Yl = ti;
const Pv = {
  expand: Boolean
}, { name: qS, n: XS } = _("collapse-transition");
function GS(e, n) {
  return Ue((g(), C(
    "div",
    {
      ref: "contentEl",
      class: m(e.n("content")),
      onTransitionend: n[0] || (n[0] = (...t) => e.handleTransitionEnd && e.handleTransitionEnd(...t)),
      onTransitionstart: n[1] || (n[1] = (...t) => e.handleTransitionStart && e.handleTransitionStart(...t))
    },
    [
      F(e.$slots, "default")
    ],
    34
    /* CLASS, NEED_HYDRATION */
  )), [
    [xn, e.showContent]
  ]);
}
const Ov = ne({
  name: qS,
  props: Pv,
  setup(e) {
    const n = k(!1), t = k(null), o = O(() => e.expand), { handleTransitionEnd: r, handleTransitionStart: a } = Cv({
      contentEl: t,
      showContent: n,
      expand: o
    });
    return {
      showContent: n,
      contentEl: t,
      n: XS,
      handleTransitionEnd: r,
      handleTransitionStart: a
    };
  }
});
Ov.render = GS;
var oi = Ov;
ae(oi);
le(oi, Pv);
const rD = oi;
var Wl = oi;
const Ev = {
  from: {
    type: [String, Number],
    default: 0
  },
  to: {
    type: [String, Number],
    default: 0
  },
  duration: {
    type: [String, Number],
    default: 2e3
  },
  precision: {
    type: [String, Number],
    default: 0
  },
  autoStart: {
    type: Boolean,
    default: !0
  },
  timingFunction: {
    type: Function
  },
  onEnd: R()
}, { name: ZS, n: JS } = _("count-to");
function QS(e, n) {
  return g(), C(
    "div",
    {
      class: m(e.n())
    },
    [
      F(e.$slots, "default", { value: e.value }, () => [
        De(
          se(e.value),
          1
          /* TEXT */
        )
      ])
    ],
    2
    /* CLASS */
  );
}
const Tv = ne({
  name: ZS,
  props: Ev,
  setup(e) {
    const {
      value: n,
      reset: t,
      // expose
      start: o,
      // expose
      pause: r
    } = j0({
      from: () => Y(e.from),
      to: () => Y(e.to),
      duration: () => Y(e.duration),
      timingFunction: e.timingFunction,
      onFinished() {
        S(e.onEnd);
      }
    }), a = O(() => gl(n.value, Y(e.precision)));
    pe(() => [e.from, e.to, e.duration], i), ht(i);
    function i() {
      t(), e.autoStart && o();
    }
    return {
      value: a,
      n: JS,
      start: o,
      pause: r,
      reset: i,
      toNumber: Y,
      floor: gl
    };
  }
});
Tv.render = QS;
var ri = Tv;
ae(ri);
le(ri, Ev);
const aD = ri;
var Kl = ri;
const Bv = {
  time: {
    type: [String, Number],
    default: 0
  },
  format: {
    type: String,
    default: "HH : mm : ss"
  },
  autoStart: {
    type: Boolean,
    default: !0
  },
  onEnd: R(),
  onChange: R()
}, { name: xS, n: _S } = _("countdown"), ql = 1e3, Xl = 60 * ql, Gl = 60 * Xl, vd = 24 * Gl;
function e6(e, n) {
  return g(), C(
    "div",
    {
      class: m(e.n())
    },
    [
      F(e.$slots, "default", Wt(pa(e.timeData)), () => [
        De(
          se(e.showTime),
          1
          /* TEXT */
        )
      ])
    ],
    2
    /* CLASS */
  );
}
const Mv = ne({
  name: xS,
  props: Bv,
  setup(e) {
    const n = k(""), t = k({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      milliseconds: 0
    });
    let o = 0, r = !1, a = 0, i = 0, l;
    pe(
      () => e.time,
      () => {
        f(), e.autoStart && d();
      }
    ), ht(() => {
      c(), e.autoStart && d();
    }), Lt(() => {
      l != null && (r = l, r === !0 && d(!0));
    }), $o(() => {
      l = r, p();
    }), _o(p);
    function s(h, v) {
      const y = Object.values(v), w = ["DD", "HH", "mm", "ss"], $ = [24, 60, 60, 1e3];
      if (w.forEach((b, z) => {
        h.includes(b) ? h = h.replace(b, Jt(`${y[z]}`, 2, "0")) : y[z + 1] += y[z] * $[z];
      }), h.includes("S")) {
        const b = Jt(`${y[y.length - 1]}`, 3, "0");
        h.includes("SSS") ? h = h.replace("SSS", b) : h.includes("SS") ? h = h.replace("SS", b.slice(0, 2)) : h = h.replace("S", b.slice(0, 1));
      }
      return h;
    }
    function u(h) {
      const v = Math.floor(h / vd), y = Math.floor(h % vd / Gl), w = Math.floor(h % Gl / Xl), $ = Math.floor(h % Xl / ql), b = Math.floor(h % ql), z = {
        days: v,
        hours: y,
        minutes: w,
        seconds: $,
        milliseconds: b
      };
      t.value = z, S(e.onChange, t.value), n.value = s(e.format, z);
    }
    function c() {
      const { time: h, onEnd: v } = e, y = performance.now();
      if (o || (o = y + Y(h)), i = o - y, i < 0 && (i = 0), u(i), i === 0) {
        S(v);
        return;
      }
      r && (a = Dt(c));
    }
    function d(h = !1) {
      r && !h || (r = !0, o = performance.now() + (i || Y(e.time)), c());
    }
    function p() {
      r = !1, po(a);
    }
    function f() {
      o = 0, r = !1, po(a), c();
    }
    return {
      showTime: n,
      timeData: t,
      n: _S,
      start: d,
      pause: p,
      reset: f
    };
  }
});
Mv.render = e6;
var ai = Mv;
ae(ai);
le(ai, Bv);
const iD = ai;
var Zl = ai;
/*!
 *  decimal.js v10.6.0
 *  An arbitrary-precision Decimal type for JavaScript.
 *  https://github.com/MikeMcl/decimal.js
 *  Copyright (c) 2025 Michael Mclaughlin <M8ch88l@gmail.com>
 *  MIT Licence
 */
var ro = 9e15, Ut = 1e9, Jl = "0123456789abcdef", ta = "2.3025850929940456840179914546843642076011014886287729760333279009675726096773524802359972050895982983419677840422862486334095254650828067566662873690987816894829072083255546808437998948262331985283935053089653777326288461633662222876982198867465436674744042432743651550489343149393914796194044002221051017141748003688084012647080685567743216228355220114804663715659121373450747856947683463616792101806445070648000277502684916746550586856935673420670581136429224554405758925724208241314695689016758940256776311356919292033376587141660230105703089634572075440370847469940168269282808481184289314848524948644871927809676271275775397027668605952496716674183485704422507197965004714951050492214776567636938662976979522110718264549734772662425709429322582798502585509785265383207606726317164309505995087807523710333101197857547331541421808427543863591778117054309827482385045648019095610299291824318237525357709750539565187697510374970888692180205189339507238539205144634197265287286965110862571492198849978748873771345686209167058", oa = "3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602491412737245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094330572703657595919530921861173819326117931051185480744623799627495673518857527248912279381830119491298336733624406566430860213949463952247371907021798609437027705392171762931767523846748184676694051320005681271452635608277857713427577896091736371787214684409012249534301465495853710507922796892589235420199561121290219608640344181598136297747713099605187072113499999983729780499510597317328160963185950244594553469083026425223082533446850352619311881710100031378387528865875332083814206171776691473035982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989380952572010654858632789", Ql = {
  // These values must be integers within the stated ranges (inclusive).
  // Most of these values can be changed at run-time using the `Decimal.config` method.
  // The maximum number of significant digits of the result of a calculation or base conversion.
  // E.g. `Decimal.config({ precision: 20 });`
  precision: 20,
  // 1 to MAX_DIGITS
  // The rounding mode used when rounding to `precision`.
  //
  // ROUND_UP         0 Away from zero.
  // ROUND_DOWN       1 Towards zero.
  // ROUND_CEIL       2 Towards +Infinity.
  // ROUND_FLOOR      3 Towards -Infinity.
  // ROUND_HALF_UP    4 Towards nearest neighbour. If equidistant, up.
  // ROUND_HALF_DOWN  5 Towards nearest neighbour. If equidistant, down.
  // ROUND_HALF_EVEN  6 Towards nearest neighbour. If equidistant, towards even neighbour.
  // ROUND_HALF_CEIL  7 Towards nearest neighbour. If equidistant, towards +Infinity.
  // ROUND_HALF_FLOOR 8 Towards nearest neighbour. If equidistant, towards -Infinity.
  //
  // E.g.
  // `Decimal.rounding = 4;`
  // `Decimal.rounding = Decimal.ROUND_HALF_UP;`
  rounding: 4,
  // 0 to 8
  // The modulo mode used when calculating the modulus: a mod n.
  // The quotient (q = a / n) is calculated according to the corresponding rounding mode.
  // The remainder (r) is calculated as: r = a - n * q.
  //
  // UP         0 The remainder is positive if the dividend is negative, else is negative.
  // DOWN       1 The remainder has the same sign as the dividend (JavaScript %).
  // FLOOR      3 The remainder has the same sign as the divisor (Python %).
  // HALF_EVEN  6 The IEEE 754 remainder function.
  // EUCLID     9 Euclidian division. q = sign(n) * floor(a / abs(n)). Always positive.
  //
  // Truncated division (1), floored division (3), the IEEE 754 remainder (6), and Euclidian
  // division (9) are commonly used for the modulus operation. The other rounding modes can also
  // be used, but they may not give useful results.
  modulo: 1,
  // 0 to 9
  // The exponent value at and beneath which `toString` returns exponential notation.
  // JavaScript numbers: -7
  toExpNeg: -7,
  // 0 to -EXP_LIMIT
  // The exponent value at and above which `toString` returns exponential notation.
  // JavaScript numbers: 21
  toExpPos: 21,
  // 0 to EXP_LIMIT
  // The minimum exponent value, beneath which underflow to zero occurs.
  // JavaScript numbers: -324  (5e-324)
  minE: -ro,
  // -1 to -EXP_LIMIT
  // The maximum exponent value, above which overflow to Infinity occurs.
  // JavaScript numbers: 308  (1.7976931348623157e+308)
  maxE: ro,
  // 1 to EXP_LIMIT
  // Whether to use cryptographically-secure random number generation, if available.
  crypto: !1
  // true/false
}, Dv, ct, Be = !0, ii = "[DecimalError] ", Rt = ii + "Invalid argument: ", Iv = ii + "Precision limit exceeded", Av = ii + "crypto unavailable", Nv = "[object Decimal]", Pn = Math.floor, fn = Math.pow, n6 = /^0b([01]+(\.[01]*)?|\.[01]+)(p[+-]?\d+)?$/i, t6 = /^0x([0-9a-f]+(\.[0-9a-f]*)?|\.[0-9a-f]+)(p[+-]?\d+)?$/i, o6 = /^0o([0-7]+(\.[0-7]*)?|\.[0-7]+)(p[+-]?\d+)?$/i, Rv = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i, Qn = 1e7, Pe = 7, r6 = 9007199254740991, a6 = ta.length - 1, xl = oa.length - 1, ee = { toStringTag: Nv };
ee.absoluteValue = ee.abs = function() {
  var e = new this.constructor(this);
  return e.s < 0 && (e.s = 1), ze(e);
};
ee.ceil = function() {
  return ze(new this.constructor(this), this.e + 1, 2);
};
ee.clampedTo = ee.clamp = function(e, n) {
  var t, o = this, r = o.constructor;
  if (e = new r(e), n = new r(n), !e.s || !n.s) return new r(NaN);
  if (e.gt(n)) throw Error(Rt + n);
  return t = o.cmp(e), t < 0 ? e : o.cmp(n) > 0 ? n : new r(o);
};
ee.comparedTo = ee.cmp = function(e) {
  var n, t, o, r, a = this, i = a.d, l = (e = new a.constructor(e)).d, s = a.s, u = e.s;
  if (!i || !l)
    return !s || !u ? NaN : s !== u ? s : i === l ? 0 : !i ^ s < 0 ? 1 : -1;
  if (!i[0] || !l[0]) return i[0] ? s : l[0] ? -u : 0;
  if (s !== u) return s;
  if (a.e !== e.e) return a.e > e.e ^ s < 0 ? 1 : -1;
  for (o = i.length, r = l.length, n = 0, t = o < r ? o : r; n < t; ++n)
    if (i[n] !== l[n]) return i[n] > l[n] ^ s < 0 ? 1 : -1;
  return o === r ? 0 : o > r ^ s < 0 ? 1 : -1;
};
ee.cosine = ee.cos = function() {
  var e, n, t = this, o = t.constructor;
  return t.d ? t.d[0] ? (e = o.precision, n = o.rounding, o.precision = e + Math.max(t.e, t.sd()) + Pe, o.rounding = 1, t = i6(o, jv(o, t)), o.precision = e, o.rounding = n, ze(ct == 2 || ct == 3 ? t.neg() : t, e, n, !0)) : new o(1) : new o(NaN);
};
ee.cubeRoot = ee.cbrt = function() {
  var e, n, t, o, r, a, i, l, s, u, c = this, d = c.constructor;
  if (!c.isFinite() || c.isZero()) return new d(c);
  for (Be = !1, a = c.s * fn(c.s * c, 1 / 3), !a || Math.abs(a) == 1 / 0 ? (t = Cn(c.d), e = c.e, (a = (e - t.length + 1) % 3) && (t += a == 1 || a == -2 ? "0" : "00"), a = fn(t, 1 / 3), e = Pn((e + 1) / 3) - (e % 3 == (e < 0 ? -1 : 2)), a == 1 / 0 ? t = "5e" + e : (t = a.toExponential(), t = t.slice(0, t.indexOf("e") + 1) + e), o = new d(t), o.s = c.s) : o = new d(a.toString()), i = (e = d.precision) + 3; ; )
    if (l = o, s = l.times(l).times(l), u = s.plus(c), o = xe(u.plus(c).times(l), u.plus(s), i + 2, 1), Cn(l.d).slice(0, i) === (t = Cn(o.d)).slice(0, i))
      if (t = t.slice(i - 3, i + 1), t == "9999" || !r && t == "4999") {
        if (!r && (ze(l, e + 1, 0), l.times(l).times(l).eq(c))) {
          o = l;
          break;
        }
        i += 4, r = 1;
      } else {
        (!+t || !+t.slice(1) && t.charAt(0) == "5") && (ze(o, e + 1, 1), n = !o.times(o).times(o).eq(c));
        break;
      }
  return Be = !0, ze(o, e, d.rounding, n);
};
ee.decimalPlaces = ee.dp = function() {
  var e, n = this.d, t = NaN;
  if (n) {
    if (e = n.length - 1, t = (e - Pn(this.e / Pe)) * Pe, e = n[e], e) for (; e % 10 == 0; e /= 10) t--;
    t < 0 && (t = 0);
  }
  return t;
};
ee.dividedBy = ee.div = function(e) {
  return xe(this, new this.constructor(e));
};
ee.dividedToIntegerBy = ee.divToInt = function(e) {
  var n = this, t = n.constructor;
  return ze(xe(n, new t(e), 0, 1, 1), t.precision, t.rounding);
};
ee.equals = ee.eq = function(e) {
  return this.cmp(e) === 0;
};
ee.floor = function() {
  return ze(new this.constructor(this), this.e + 1, 3);
};
ee.greaterThan = ee.gt = function(e) {
  return this.cmp(e) > 0;
};
ee.greaterThanOrEqualTo = ee.gte = function(e) {
  var n = this.cmp(e);
  return n == 1 || n === 0;
};
ee.hyperbolicCosine = ee.cosh = function() {
  var e, n, t, o, r, a = this, i = a.constructor, l = new i(1);
  if (!a.isFinite()) return new i(a.s ? 1 / 0 : NaN);
  if (a.isZero()) return l;
  t = i.precision, o = i.rounding, i.precision = t + Math.max(a.e, a.sd()) + 4, i.rounding = 1, r = a.d.length, r < 32 ? (e = Math.ceil(r / 3), n = (1 / si(4, e)).toString()) : (e = 16, n = "2.3283064365386962890625e-10"), a = yo(i, 1, a.times(n), new i(1), !0);
  for (var s, u = e, c = new i(8); u--; )
    s = a.times(a), a = l.minus(s.times(c.minus(s.times(c))));
  return ze(a, i.precision = t, i.rounding = o, !0);
};
ee.hyperbolicSine = ee.sinh = function() {
  var e, n, t, o, r = this, a = r.constructor;
  if (!r.isFinite() || r.isZero()) return new a(r);
  if (n = a.precision, t = a.rounding, a.precision = n + Math.max(r.e, r.sd()) + 4, a.rounding = 1, o = r.d.length, o < 3)
    r = yo(a, 2, r, r, !0);
  else {
    e = 1.4 * Math.sqrt(o), e = e > 16 ? 16 : e | 0, r = r.times(1 / si(5, e)), r = yo(a, 2, r, r, !0);
    for (var i, l = new a(5), s = new a(16), u = new a(20); e--; )
      i = r.times(r), r = r.times(l.plus(i.times(s.times(i).plus(u))));
  }
  return a.precision = n, a.rounding = t, ze(r, n, t, !0);
};
ee.hyperbolicTangent = ee.tanh = function() {
  var e, n, t = this, o = t.constructor;
  return t.isFinite() ? t.isZero() ? new o(t) : (e = o.precision, n = o.rounding, o.precision = e + 7, o.rounding = 1, xe(t.sinh(), t.cosh(), o.precision = e, o.rounding = n)) : new o(t.s);
};
ee.inverseCosine = ee.acos = function() {
  var e = this, n = e.constructor, t = e.abs().cmp(1), o = n.precision, r = n.rounding;
  return t !== -1 ? t === 0 ? e.isNeg() ? tt(n, o, r) : new n(0) : new n(NaN) : e.isZero() ? tt(n, o + 4, r).times(0.5) : (n.precision = o + 6, n.rounding = 1, e = new n(1).minus(e).div(e.plus(1)).sqrt().atan(), n.precision = o, n.rounding = r, e.times(2));
};
ee.inverseHyperbolicCosine = ee.acosh = function() {
  var e, n, t = this, o = t.constructor;
  return t.lte(1) ? new o(t.eq(1) ? 0 : NaN) : t.isFinite() ? (e = o.precision, n = o.rounding, o.precision = e + Math.max(Math.abs(t.e), t.sd()) + 4, o.rounding = 1, Be = !1, t = t.times(t).minus(1).sqrt().plus(t), Be = !0, o.precision = e, o.rounding = n, t.ln()) : new o(t);
};
ee.inverseHyperbolicSine = ee.asinh = function() {
  var e, n, t = this, o = t.constructor;
  return !t.isFinite() || t.isZero() ? new o(t) : (e = o.precision, n = o.rounding, o.precision = e + 2 * Math.max(Math.abs(t.e), t.sd()) + 6, o.rounding = 1, Be = !1, t = t.times(t).plus(1).sqrt().plus(t), Be = !0, o.precision = e, o.rounding = n, t.ln());
};
ee.inverseHyperbolicTangent = ee.atanh = function() {
  var e, n, t, o, r = this, a = r.constructor;
  return r.isFinite() ? r.e >= 0 ? new a(r.abs().eq(1) ? r.s / 0 : r.isZero() ? r : NaN) : (e = a.precision, n = a.rounding, o = r.sd(), Math.max(o, e) < 2 * -r.e - 1 ? ze(new a(r), e, n, !0) : (a.precision = t = o - r.e, r = xe(r.plus(1), new a(1).minus(r), t + e, 1), a.precision = e + 4, a.rounding = 1, r = r.ln(), a.precision = e, a.rounding = n, r.times(0.5))) : new a(NaN);
};
ee.inverseSine = ee.asin = function() {
  var e, n, t, o, r = this, a = r.constructor;
  return r.isZero() ? new a(r) : (n = r.abs().cmp(1), t = a.precision, o = a.rounding, n !== -1 ? n === 0 ? (e = tt(a, t + 4, o).times(0.5), e.s = r.s, e) : new a(NaN) : (a.precision = t + 6, a.rounding = 1, r = r.div(new a(1).minus(r.times(r)).sqrt().plus(1)).atan(), a.precision = t, a.rounding = o, r.times(2)));
};
ee.inverseTangent = ee.atan = function() {
  var e, n, t, o, r, a, i, l, s, u = this, c = u.constructor, d = c.precision, p = c.rounding;
  if (u.isFinite()) {
    if (u.isZero())
      return new c(u);
    if (u.abs().eq(1) && d + 4 <= xl)
      return i = tt(c, d + 4, p).times(0.25), i.s = u.s, i;
  } else {
    if (!u.s) return new c(NaN);
    if (d + 4 <= xl)
      return i = tt(c, d + 4, p).times(0.5), i.s = u.s, i;
  }
  for (c.precision = l = d + 10, c.rounding = 1, t = Math.min(28, l / Pe + 2 | 0), e = t; e; --e) u = u.div(u.times(u).plus(1).sqrt().plus(1));
  for (Be = !1, n = Math.ceil(l / Pe), o = 1, s = u.times(u), i = new c(u), r = u; e !== -1; )
    if (r = r.times(s), a = i.minus(r.div(o += 2)), r = r.times(s), i = a.plus(r.div(o += 2)), i.d[n] !== void 0) for (e = n; i.d[e] === a.d[e] && e--; ) ;
  return t && (i = i.times(2 << t - 1)), Be = !0, ze(i, c.precision = d, c.rounding = p, !0);
};
ee.isFinite = function() {
  return !!this.d;
};
ee.isInteger = ee.isInt = function() {
  return !!this.d && Pn(this.e / Pe) > this.d.length - 2;
};
ee.isNaN = function() {
  return !this.s;
};
ee.isNegative = ee.isNeg = function() {
  return this.s < 0;
};
ee.isPositive = ee.isPos = function() {
  return this.s > 0;
};
ee.isZero = function() {
  return !!this.d && this.d[0] === 0;
};
ee.lessThan = ee.lt = function(e) {
  return this.cmp(e) < 0;
};
ee.lessThanOrEqualTo = ee.lte = function(e) {
  return this.cmp(e) < 1;
};
ee.logarithm = ee.log = function(e) {
  var n, t, o, r, a, i, l, s, u = this, c = u.constructor, d = c.precision, p = c.rounding, f = 5;
  if (e == null)
    e = new c(10), n = !0;
  else {
    if (e = new c(e), t = e.d, e.s < 0 || !t || !t[0] || e.eq(1)) return new c(NaN);
    n = e.eq(10);
  }
  if (t = u.d, u.s < 0 || !t || !t[0] || u.eq(1))
    return new c(t && !t[0] ? -1 / 0 : u.s != 1 ? NaN : t ? 0 : 1 / 0);
  if (n)
    if (t.length > 1)
      a = !0;
    else {
      for (r = t[0]; r % 10 === 0; ) r /= 10;
      a = r !== 1;
    }
  if (Be = !1, l = d + f, i = Ot(u, l), o = n ? ra(c, l + 10) : Ot(e, l), s = xe(i, o, l, 1), Zo(s.d, r = d, p))
    do
      if (l += 10, i = Ot(u, l), o = n ? ra(c, l + 10) : Ot(e, l), s = xe(i, o, l, 1), !a) {
        +Cn(s.d).slice(r + 1, r + 15) + 1 == 1e14 && (s = ze(s, d + 1, 0));
        break;
      }
    while (Zo(s.d, r += 10, p));
  return Be = !0, ze(s, d, p);
};
ee.minus = ee.sub = function(e) {
  var n, t, o, r, a, i, l, s, u, c, d, p, f = this, h = f.constructor;
  if (e = new h(e), !f.d || !e.d)
    return !f.s || !e.s ? e = new h(NaN) : f.d ? e.s = -e.s : e = new h(e.d || f.s !== e.s ? f : NaN), e;
  if (f.s != e.s)
    return e.s = -e.s, f.plus(e);
  if (u = f.d, p = e.d, l = h.precision, s = h.rounding, !u[0] || !p[0]) {
    if (p[0]) e.s = -e.s;
    else if (u[0]) e = new h(f);
    else return new h(s === 3 ? -0 : 0);
    return Be ? ze(e, l, s) : e;
  }
  if (t = Pn(e.e / Pe), c = Pn(f.e / Pe), u = u.slice(), a = c - t, a) {
    for (d = a < 0, d ? (n = u, a = -a, i = p.length) : (n = p, t = c, i = u.length), o = Math.max(Math.ceil(l / Pe), i) + 2, a > o && (a = o, n.length = 1), n.reverse(), o = a; o--; ) n.push(0);
    n.reverse();
  } else {
    for (o = u.length, i = p.length, d = o < i, d && (i = o), o = 0; o < i; o++)
      if (u[o] != p[o]) {
        d = u[o] < p[o];
        break;
      }
    a = 0;
  }
  for (d && (n = u, u = p, p = n, e.s = -e.s), i = u.length, o = p.length - i; o > 0; --o) u[i++] = 0;
  for (o = p.length; o > a; ) {
    if (u[--o] < p[o]) {
      for (r = o; r && u[--r] === 0; ) u[r] = Qn - 1;
      --u[r], u[o] += Qn;
    }
    u[o] -= p[o];
  }
  for (; u[--i] === 0; ) u.pop();
  for (; u[0] === 0; u.shift()) --t;
  return u[0] ? (e.d = u, e.e = li(u, t), Be ? ze(e, l, s) : e) : new h(s === 3 ? -0 : 0);
};
ee.modulo = ee.mod = function(e) {
  var n, t = this, o = t.constructor;
  return e = new o(e), !t.d || !e.s || e.d && !e.d[0] ? new o(NaN) : !e.d || t.d && !t.d[0] ? ze(new o(t), o.precision, o.rounding) : (Be = !1, o.modulo == 9 ? (n = xe(t, e.abs(), 0, 3, 1), n.s *= e.s) : n = xe(t, e, 0, o.modulo, 1), n = n.times(e), Be = !0, t.minus(n));
};
ee.naturalExponential = ee.exp = function() {
  return _l(this);
};
ee.naturalLogarithm = ee.ln = function() {
  return Ot(this);
};
ee.negated = ee.neg = function() {
  var e = new this.constructor(this);
  return e.s = -e.s, ze(e);
};
ee.plus = ee.add = function(e) {
  var n, t, o, r, a, i, l, s, u, c, d = this, p = d.constructor;
  if (e = new p(e), !d.d || !e.d)
    return !d.s || !e.s ? e = new p(NaN) : d.d || (e = new p(e.d || d.s === e.s ? d : NaN)), e;
  if (d.s != e.s)
    return e.s = -e.s, d.minus(e);
  if (u = d.d, c = e.d, l = p.precision, s = p.rounding, !u[0] || !c[0])
    return c[0] || (e = new p(d)), Be ? ze(e, l, s) : e;
  if (a = Pn(d.e / Pe), o = Pn(e.e / Pe), u = u.slice(), r = a - o, r) {
    for (r < 0 ? (t = u, r = -r, i = c.length) : (t = c, o = a, i = u.length), a = Math.ceil(l / Pe), i = a > i ? a + 1 : i + 1, r > i && (r = i, t.length = 1), t.reverse(); r--; ) t.push(0);
    t.reverse();
  }
  for (i = u.length, r = c.length, i - r < 0 && (r = i, t = c, c = u, u = t), n = 0; r; )
    n = (u[--r] = u[r] + c[r] + n) / Qn | 0, u[r] %= Qn;
  for (n && (u.unshift(n), ++o), i = u.length; u[--i] == 0; ) u.pop();
  return e.d = u, e.e = li(u, o), Be ? ze(e, l, s) : e;
};
ee.precision = ee.sd = function(e) {
  var n, t = this;
  if (e !== void 0 && e !== !!e && e !== 1 && e !== 0) throw Error(Rt + e);
  return t.d ? (n = Lv(t.d), e && t.e + 1 > n && (n = t.e + 1)) : n = NaN, n;
};
ee.round = function() {
  var e = this, n = e.constructor;
  return ze(new n(e), e.e + 1, n.rounding);
};
ee.sine = ee.sin = function() {
  var e, n, t = this, o = t.constructor;
  return t.isFinite() ? t.isZero() ? new o(t) : (e = o.precision, n = o.rounding, o.precision = e + Math.max(t.e, t.sd()) + Pe, o.rounding = 1, t = s6(o, jv(o, t)), o.precision = e, o.rounding = n, ze(ct > 2 ? t.neg() : t, e, n, !0)) : new o(NaN);
};
ee.squareRoot = ee.sqrt = function() {
  var e, n, t, o, r, a, i = this, l = i.d, s = i.e, u = i.s, c = i.constructor;
  if (u !== 1 || !l || !l[0])
    return new c(!u || u < 0 && (!l || l[0]) ? NaN : l ? i : 1 / 0);
  for (Be = !1, u = Math.sqrt(+i), u == 0 || u == 1 / 0 ? (n = Cn(l), (n.length + s) % 2 == 0 && (n += "0"), u = Math.sqrt(n), s = Pn((s + 1) / 2) - (s < 0 || s % 2), u == 1 / 0 ? n = "5e" + s : (n = u.toExponential(), n = n.slice(0, n.indexOf("e") + 1) + s), o = new c(n)) : o = new c(u.toString()), t = (s = c.precision) + 3; ; )
    if (a = o, o = a.plus(xe(i, a, t + 2, 1)).times(0.5), Cn(a.d).slice(0, t) === (n = Cn(o.d)).slice(0, t))
      if (n = n.slice(t - 3, t + 1), n == "9999" || !r && n == "4999") {
        if (!r && (ze(a, s + 1, 0), a.times(a).eq(i))) {
          o = a;
          break;
        }
        t += 4, r = 1;
      } else {
        (!+n || !+n.slice(1) && n.charAt(0) == "5") && (ze(o, s + 1, 1), e = !o.times(o).eq(i));
        break;
      }
  return Be = !0, ze(o, s, c.rounding, e);
};
ee.tangent = ee.tan = function() {
  var e, n, t = this, o = t.constructor;
  return t.isFinite() ? t.isZero() ? new o(t) : (e = o.precision, n = o.rounding, o.precision = e + 10, o.rounding = 1, t = t.sin(), t.s = 1, t = xe(t, new o(1).minus(t.times(t)).sqrt(), e + 10, 0), o.precision = e, o.rounding = n, ze(ct == 2 || ct == 4 ? t.neg() : t, e, n, !0)) : new o(NaN);
};
ee.times = ee.mul = function(e) {
  var n, t, o, r, a, i, l, s, u, c = this, d = c.constructor, p = c.d, f = (e = new d(e)).d;
  if (e.s *= c.s, !p || !p[0] || !f || !f[0])
    return new d(!e.s || p && !p[0] && !f || f && !f[0] && !p ? NaN : !p || !f ? e.s / 0 : e.s * 0);
  for (t = Pn(c.e / Pe) + Pn(e.e / Pe), s = p.length, u = f.length, s < u && (a = p, p = f, f = a, i = s, s = u, u = i), a = [], i = s + u, o = i; o--; ) a.push(0);
  for (o = u; --o >= 0; ) {
    for (n = 0, r = s + o; r > o; )
      l = a[r] + f[o] * p[r - o - 1] + n, a[r--] = l % Qn | 0, n = l / Qn | 0;
    a[r] = (a[r] + n) % Qn | 0;
  }
  for (; !a[--i]; ) a.pop();
  return n ? ++t : a.shift(), e.d = a, e.e = li(a, t), Be ? ze(e, d.precision, d.rounding) : e;
};
ee.toBinary = function(e, n) {
  return Mu(this, 2, e, n);
};
ee.toDecimalPlaces = ee.toDP = function(e, n) {
  var t = this, o = t.constructor;
  return t = new o(t), e === void 0 ? t : (An(e, 0, Ut), n === void 0 ? n = o.rounding : An(n, 0, 8), ze(t, e + t.e + 1, n));
};
ee.toExponential = function(e, n) {
  var t, o = this, r = o.constructor;
  return e === void 0 ? t = rt(o, !0) : (An(e, 0, Ut), n === void 0 ? n = r.rounding : An(n, 0, 8), o = ze(new r(o), e + 1, n), t = rt(o, !0, e + 1)), o.isNeg() && !o.isZero() ? "-" + t : t;
};
ee.toFixed = function(e, n) {
  var t, o, r = this, a = r.constructor;
  return e === void 0 ? t = rt(r) : (An(e, 0, Ut), n === void 0 ? n = a.rounding : An(n, 0, 8), o = ze(new a(r), e + r.e + 1, n), t = rt(o, !1, e + o.e + 1)), r.isNeg() && !r.isZero() ? "-" + t : t;
};
ee.toFraction = function(e) {
  var n, t, o, r, a, i, l, s, u, c, d, p, f = this, h = f.d, v = f.constructor;
  if (!h) return new v(f);
  if (u = t = new v(1), o = s = new v(0), n = new v(o), a = n.e = Lv(h) - f.e - 1, i = a % Pe, n.d[0] = fn(10, i < 0 ? Pe + i : i), e == null)
    e = a > 0 ? n : u;
  else {
    if (l = new v(e), !l.isInt() || l.lt(u)) throw Error(Rt + l);
    e = l.gt(n) ? a > 0 ? n : u : l;
  }
  for (Be = !1, l = new v(Cn(h)), c = v.precision, v.precision = a = h.length * Pe * 2; d = xe(l, n, 0, 1, 1), r = t.plus(d.times(o)), r.cmp(e) != 1; )
    t = o, o = r, r = u, u = s.plus(d.times(r)), s = r, r = n, n = l.minus(d.times(r)), l = r;
  return r = xe(e.minus(t), o, 0, 1, 1), s = s.plus(r.times(u)), t = t.plus(r.times(o)), s.s = u.s = f.s, p = xe(u, o, a, 1).minus(f).abs().cmp(xe(s, t, a, 1).minus(f).abs()) < 1 ? [u, o] : [s, t], v.precision = c, Be = !0, p;
};
ee.toHexadecimal = ee.toHex = function(e, n) {
  return Mu(this, 16, e, n);
};
ee.toNearest = function(e, n) {
  var t = this, o = t.constructor;
  if (t = new o(t), e == null) {
    if (!t.d) return t;
    e = new o(1), n = o.rounding;
  } else {
    if (e = new o(e), n === void 0 ? n = o.rounding : An(n, 0, 8), !t.d) return e.s ? t : e;
    if (!e.d)
      return e.s && (e.s = t.s), e;
  }
  return e.d[0] ? (Be = !1, t = xe(t, e, 0, n, 1).times(e), Be = !0, ze(t)) : (e.s = t.s, t = e), t;
};
ee.toNumber = function() {
  return +this;
};
ee.toOctal = function(e, n) {
  return Mu(this, 8, e, n);
};
ee.toPower = ee.pow = function(e) {
  var n, t, o, r, a, i, l = this, s = l.constructor, u = +(e = new s(e));
  if (!l.d || !e.d || !l.d[0] || !e.d[0]) return new s(fn(+l, u));
  if (l = new s(l), l.eq(1)) return l;
  if (o = s.precision, a = s.rounding, e.eq(1)) return ze(l, o, a);
  if (n = Pn(e.e / Pe), n >= e.d.length - 1 && (t = u < 0 ? -u : u) <= r6)
    return r = Vv(s, l, t, o), e.s < 0 ? new s(1).div(r) : ze(r, o, a);
  if (i = l.s, i < 0) {
    if (n < e.d.length - 1) return new s(NaN);
    if (e.d[n] & 1 || (i = 1), l.e == 0 && l.d[0] == 1 && l.d.length == 1)
      return l.s = i, l;
  }
  return t = fn(+l, u), n = t == 0 || !isFinite(t) ? Pn(u * (Math.log("0." + Cn(l.d)) / Math.LN10 + l.e + 1)) : new s(t + "").e, n > s.maxE + 1 || n < s.minE - 1 ? new s(n > 0 ? i / 0 : 0) : (Be = !1, s.rounding = l.s = 1, t = Math.min(12, (n + "").length), r = _l(e.times(Ot(l, o + t)), o), r.d && (r = ze(r, o + 5, 1), Zo(r.d, o, a) && (n = o + 10, r = ze(_l(e.times(Ot(l, n + t)), n), n + 5, 1), +Cn(r.d).slice(o + 1, o + 15) + 1 == 1e14 && (r = ze(r, o + 1, 0)))), r.s = i, Be = !0, s.rounding = a, ze(r, o, a));
};
ee.toPrecision = function(e, n) {
  var t, o = this, r = o.constructor;
  return e === void 0 ? t = rt(o, o.e <= r.toExpNeg || o.e >= r.toExpPos) : (An(e, 1, Ut), n === void 0 ? n = r.rounding : An(n, 0, 8), o = ze(new r(o), e, n), t = rt(o, e <= o.e || o.e <= r.toExpNeg, e)), o.isNeg() && !o.isZero() ? "-" + t : t;
};
ee.toSignificantDigits = ee.toSD = function(e, n) {
  var t = this, o = t.constructor;
  return e === void 0 ? (e = o.precision, n = o.rounding) : (An(e, 1, Ut), n === void 0 ? n = o.rounding : An(n, 0, 8)), ze(new o(t), e, n);
};
ee.toString = function() {
  var e = this, n = e.constructor, t = rt(e, e.e <= n.toExpNeg || e.e >= n.toExpPos);
  return e.isNeg() && !e.isZero() ? "-" + t : t;
};
ee.truncated = ee.trunc = function() {
  return ze(new this.constructor(this), this.e + 1, 1);
};
ee.valueOf = ee.toJSON = function() {
  var e = this, n = e.constructor, t = rt(e, e.e <= n.toExpNeg || e.e >= n.toExpPos);
  return e.isNeg() ? "-" + t : t;
};
function Cn(e) {
  var n, t, o, r = e.length - 1, a = "", i = e[0];
  if (r > 0) {
    for (a += i, n = 1; n < r; n++)
      o = e[n] + "", t = Pe - o.length, t && (a += kt(t)), a += o;
    i = e[n], o = i + "", t = Pe - o.length, t && (a += kt(t));
  } else if (i === 0)
    return "0";
  for (; i % 10 === 0; ) i /= 10;
  return a + i;
}
function An(e, n, t) {
  if (e !== ~~e || e < n || e > t)
    throw Error(Rt + e);
}
function Zo(e, n, t, o) {
  var r, a, i, l;
  for (a = e[0]; a >= 10; a /= 10) --n;
  return --n < 0 ? (n += Pe, r = 0) : (r = Math.ceil((n + 1) / Pe), n %= Pe), a = fn(10, Pe - n), l = e[r] % a | 0, o == null ? n < 3 ? (n == 0 ? l = l / 100 | 0 : n == 1 && (l = l / 10 | 0), i = t < 4 && l == 99999 || t > 3 && l == 49999 || l == 5e4 || l == 0) : i = (t < 4 && l + 1 == a || t > 3 && l + 1 == a / 2) && (e[r + 1] / a / 100 | 0) == fn(10, n - 2) - 1 || (l == a / 2 || l == 0) && (e[r + 1] / a / 100 | 0) == 0 : n < 4 ? (n == 0 ? l = l / 1e3 | 0 : n == 1 ? l = l / 100 | 0 : n == 2 && (l = l / 10 | 0), i = (o || t < 4) && l == 9999 || !o && t > 3 && l == 4999) : i = ((o || t < 4) && l + 1 == a || !o && t > 3 && l + 1 == a / 2) && (e[r + 1] / a / 1e3 | 0) == fn(10, n - 3) - 1, i;
}
function Ir(e, n, t) {
  for (var o, r = [0], a, i = 0, l = e.length; i < l; ) {
    for (a = r.length; a--; ) r[a] *= n;
    for (r[0] += Jl.indexOf(e.charAt(i++)), o = 0; o < r.length; o++)
      r[o] > t - 1 && (r[o + 1] === void 0 && (r[o + 1] = 0), r[o + 1] += r[o] / t | 0, r[o] %= t);
  }
  return r.reverse();
}
function i6(e, n) {
  var t, o, r;
  if (n.isZero()) return n;
  o = n.d.length, o < 32 ? (t = Math.ceil(o / 3), r = (1 / si(4, t)).toString()) : (t = 16, r = "2.3283064365386962890625e-10"), e.precision += t, n = yo(e, 1, n.times(r), new e(1));
  for (var a = t; a--; ) {
    var i = n.times(n);
    n = i.times(i).minus(i).times(8).plus(1);
  }
  return e.precision -= t, n;
}
var xe = /* @__PURE__ */ function() {
  function e(o, r, a) {
    var i, l = 0, s = o.length;
    for (o = o.slice(); s--; )
      i = o[s] * r + l, o[s] = i % a | 0, l = i / a | 0;
    return l && o.unshift(l), o;
  }
  function n(o, r, a, i) {
    var l, s;
    if (a != i)
      s = a > i ? 1 : -1;
    else
      for (l = s = 0; l < a; l++)
        if (o[l] != r[l]) {
          s = o[l] > r[l] ? 1 : -1;
          break;
        }
    return s;
  }
  function t(o, r, a, i) {
    for (var l = 0; a--; )
      o[a] -= l, l = o[a] < r[a] ? 1 : 0, o[a] = l * i + o[a] - r[a];
    for (; !o[0] && o.length > 1; ) o.shift();
  }
  return function(o, r, a, i, l, s) {
    var u, c, d, p, f, h, v, y, w, $, b, z, D, P, B, I, U, L, W, N, T = o.constructor, M = o.s == r.s ? 1 : -1, j = o.d, E = r.d;
    if (!j || !j[0] || !E || !E[0])
      return new T(
        // Return NaN if either NaN, or both Infinity or 0.
        !o.s || !r.s || (j ? E && j[0] == E[0] : !E) ? NaN : (
          // Return ±0 if x is 0 or y is ±Infinity, or return ±Infinity as y is 0.
          j && j[0] == 0 || !E ? M * 0 : M / 0
        )
      );
    for (s ? (f = 1, c = o.e - r.e) : (s = Qn, f = Pe, c = Pn(o.e / f) - Pn(r.e / f)), W = E.length, U = j.length, w = new T(M), $ = w.d = [], d = 0; E[d] == (j[d] || 0); d++) ;
    if (E[d] > (j[d] || 0) && c--, a == null ? (P = a = T.precision, i = T.rounding) : l ? P = a + (o.e - r.e) + 1 : P = a, P < 0)
      $.push(1), h = !0;
    else {
      if (P = P / f + 2 | 0, d = 0, W == 1) {
        for (p = 0, E = E[0], P++; (d < U || p) && P--; d++)
          B = p * s + (j[d] || 0), $[d] = B / E | 0, p = B % E | 0;
        h = p || d < U;
      } else {
        for (p = s / (E[0] + 1) | 0, p > 1 && (E = e(E, p, s), j = e(j, p, s), W = E.length, U = j.length), I = W, b = j.slice(0, W), z = b.length; z < W; ) b[z++] = 0;
        N = E.slice(), N.unshift(0), L = E[0], E[1] >= s / 2 && ++L;
        do
          p = 0, u = n(E, b, W, z), u < 0 ? (D = b[0], W != z && (D = D * s + (b[1] || 0)), p = D / L | 0, p > 1 ? (p >= s && (p = s - 1), v = e(E, p, s), y = v.length, z = b.length, u = n(v, b, y, z), u == 1 && (p--, t(v, W < y ? N : E, y, s))) : (p == 0 && (u = p = 1), v = E.slice()), y = v.length, y < z && v.unshift(0), t(b, v, z, s), u == -1 && (z = b.length, u = n(E, b, W, z), u < 1 && (p++, t(b, W < z ? N : E, z, s))), z = b.length) : u === 0 && (p++, b = [0]), $[d++] = p, u && b[0] ? b[z++] = j[I] || 0 : (b = [j[I]], z = 1);
        while ((I++ < U || b[0] !== void 0) && P--);
        h = b[0] !== void 0;
      }
      $[0] || $.shift();
    }
    if (f == 1)
      w.e = c, Dv = h;
    else {
      for (d = 1, p = $[0]; p >= 10; p /= 10) d++;
      w.e = d + c * f - 1, ze(w, l ? a + w.e + 1 : a, i, h);
    }
    return w;
  };
}();
function ze(e, n, t, o) {
  var r, a, i, l, s, u, c, d, p, f = e.constructor;
  e: if (n != null) {
    if (d = e.d, !d) return e;
    for (r = 1, l = d[0]; l >= 10; l /= 10) r++;
    if (a = n - r, a < 0)
      a += Pe, i = n, c = d[p = 0], s = c / fn(10, r - i - 1) % 10 | 0;
    else if (p = Math.ceil((a + 1) / Pe), l = d.length, p >= l)
      if (o) {
        for (; l++ <= p; ) d.push(0);
        c = s = 0, r = 1, a %= Pe, i = a - Pe + 1;
      } else
        break e;
    else {
      for (c = l = d[p], r = 1; l >= 10; l /= 10) r++;
      a %= Pe, i = a - Pe + r, s = i < 0 ? 0 : c / fn(10, r - i - 1) % 10 | 0;
    }
    if (o = o || n < 0 || d[p + 1] !== void 0 || (i < 0 ? c : c % fn(10, r - i - 1)), u = t < 4 ? (s || o) && (t == 0 || t == (e.s < 0 ? 3 : 2)) : s > 5 || s == 5 && (t == 4 || o || t == 6 && // Check whether the digit to the left of the rounding digit is odd.
    (a > 0 ? i > 0 ? c / fn(10, r - i) : 0 : d[p - 1]) % 10 & 1 || t == (e.s < 0 ? 8 : 7)), n < 1 || !d[0])
      return d.length = 0, u ? (n -= e.e + 1, d[0] = fn(10, (Pe - n % Pe) % Pe), e.e = -n || 0) : d[0] = e.e = 0, e;
    if (a == 0 ? (d.length = p, l = 1, p--) : (d.length = p + 1, l = fn(10, Pe - a), d[p] = i > 0 ? (c / fn(10, r - i) % fn(10, i) | 0) * l : 0), u)
      for (; ; )
        if (p == 0) {
          for (a = 1, i = d[0]; i >= 10; i /= 10) a++;
          for (i = d[0] += l, l = 1; i >= 10; i /= 10) l++;
          a != l && (e.e++, d[0] == Qn && (d[0] = 1));
          break;
        } else {
          if (d[p] += l, d[p] != Qn) break;
          d[p--] = 0, l = 1;
        }
    for (a = d.length; d[--a] === 0; ) d.pop();
  }
  return Be && (e.e > f.maxE ? (e.d = null, e.e = NaN) : e.e < f.minE && (e.e = 0, e.d = [0])), e;
}
function rt(e, n, t) {
  if (!e.isFinite()) return Uv(e);
  var o, r = e.e, a = Cn(e.d), i = a.length;
  return n ? (t && (o = t - i) > 0 ? a = a.charAt(0) + "." + a.slice(1) + kt(o) : i > 1 && (a = a.charAt(0) + "." + a.slice(1)), a = a + (e.e < 0 ? "e" : "e+") + e.e) : r < 0 ? (a = "0." + kt(-r - 1) + a, t && (o = t - i) > 0 && (a += kt(o))) : r >= i ? (a += kt(r + 1 - i), t && (o = t - r - 1) > 0 && (a = a + "." + kt(o))) : ((o = r + 1) < i && (a = a.slice(0, o) + "." + a.slice(o)), t && (o = t - i) > 0 && (r + 1 === i && (a += "."), a += kt(o))), a;
}
function li(e, n) {
  var t = e[0];
  for (n *= Pe; t >= 10; t /= 10) n++;
  return n;
}
function ra(e, n, t) {
  if (n > a6)
    throw Be = !0, t && (e.precision = t), Error(Iv);
  return ze(new e(ta), n, 1, !0);
}
function tt(e, n, t) {
  if (n > xl) throw Error(Iv);
  return ze(new e(oa), n, t, !0);
}
function Lv(e) {
  var n = e.length - 1, t = n * Pe + 1;
  if (n = e[n], n) {
    for (; n % 10 == 0; n /= 10) t--;
    for (n = e[0]; n >= 10; n /= 10) t++;
  }
  return t;
}
function kt(e) {
  for (var n = ""; e--; ) n += "0";
  return n;
}
function Vv(e, n, t, o) {
  var r, a = new e(1), i = Math.ceil(o / Pe + 4);
  for (Be = !1; ; ) {
    if (t % 2 && (a = a.times(n), hd(a.d, i) && (r = !0)), t = Pn(t / 2), t === 0) {
      t = a.d.length - 1, r && a.d[t] === 0 && ++a.d[t];
      break;
    }
    n = n.times(n), hd(n.d, i);
  }
  return Be = !0, a;
}
function gd(e) {
  return e.d[e.d.length - 1] & 1;
}
function Fv(e, n, t) {
  for (var o, r, a = new e(n[0]), i = 0; ++i < n.length; ) {
    if (r = new e(n[i]), !r.s) {
      a = r;
      break;
    }
    o = a.cmp(r), (o === t || o === 0 && a.s === t) && (a = r);
  }
  return a;
}
function _l(e, n) {
  var t, o, r, a, i, l, s, u = 0, c = 0, d = 0, p = e.constructor, f = p.rounding, h = p.precision;
  if (!e.d || !e.d[0] || e.e > 17)
    return new p(e.d ? e.d[0] ? e.s < 0 ? 0 : 1 / 0 : 1 : e.s ? e.s < 0 ? 0 : e : NaN);
  for (n == null ? (Be = !1, s = h) : s = n, l = new p(0.03125); e.e > -2; )
    e = e.times(l), d += 5;
  for (o = Math.log(fn(2, d)) / Math.LN10 * 2 + 5 | 0, s += o, t = a = i = new p(1), p.precision = s; ; ) {
    if (a = ze(a.times(e), s, 1), t = t.times(++c), l = i.plus(xe(a, t, s, 1)), Cn(l.d).slice(0, s) === Cn(i.d).slice(0, s)) {
      for (r = d; r--; ) i = ze(i.times(i), s, 1);
      if (n == null)
        if (u < 3 && Zo(i.d, s - o, f, u))
          p.precision = s += 10, t = a = l = new p(1), c = 0, u++;
        else
          return ze(i, p.precision = h, f, Be = !0);
      else
        return p.precision = h, i;
    }
    i = l;
  }
}
function Ot(e, n) {
  var t, o, r, a, i, l, s, u, c, d, p, f = 1, h = 10, v = e, y = v.d, w = v.constructor, $ = w.rounding, b = w.precision;
  if (v.s < 0 || !y || !y[0] || !v.e && y[0] == 1 && y.length == 1)
    return new w(y && !y[0] ? -1 / 0 : v.s != 1 ? NaN : y ? 0 : v);
  if (n == null ? (Be = !1, c = b) : c = n, w.precision = c += h, t = Cn(y), o = t.charAt(0), Math.abs(a = v.e) < 15e14) {
    for (; o < 7 && o != 1 || o == 1 && t.charAt(1) > 3; )
      v = v.times(e), t = Cn(v.d), o = t.charAt(0), f++;
    a = v.e, o > 1 ? (v = new w("0." + t), a++) : v = new w(o + "." + t.slice(1));
  } else
    return u = ra(w, c + 2, b).times(a + ""), v = Ot(new w(o + "." + t.slice(1)), c - h).plus(u), w.precision = b, n == null ? ze(v, b, $, Be = !0) : v;
  for (d = v, s = i = v = xe(v.minus(1), v.plus(1), c, 1), p = ze(v.times(v), c, 1), r = 3; ; ) {
    if (i = ze(i.times(p), c, 1), u = s.plus(xe(i, new w(r), c, 1)), Cn(u.d).slice(0, c) === Cn(s.d).slice(0, c))
      if (s = s.times(2), a !== 0 && (s = s.plus(ra(w, c + 2, b).times(a + ""))), s = xe(s, new w(f), c, 1), n == null)
        if (Zo(s.d, c - h, $, l))
          w.precision = c += h, u = i = v = xe(d.minus(1), d.plus(1), c, 1), p = ze(v.times(v), c, 1), r = l = 1;
        else
          return ze(s, w.precision = b, $, Be = !0);
      else
        return w.precision = b, s;
    s = u, r += 2;
  }
}
function Uv(e) {
  return String(e.s * e.s / 0);
}
function Ar(e, n) {
  var t, o, r;
  for ((t = n.indexOf(".")) > -1 && (n = n.replace(".", "")), (o = n.search(/e/i)) > 0 ? (t < 0 && (t = o), t += +n.slice(o + 1), n = n.substring(0, o)) : t < 0 && (t = n.length), o = 0; n.charCodeAt(o) === 48; o++) ;
  for (r = n.length; n.charCodeAt(r - 1) === 48; --r) ;
  if (n = n.slice(o, r), n) {
    if (r -= o, e.e = t = t - o - 1, e.d = [], o = (t + 1) % Pe, t < 0 && (o += Pe), o < r) {
      for (o && e.d.push(+n.slice(0, o)), r -= Pe; o < r; ) e.d.push(+n.slice(o, o += Pe));
      n = n.slice(o), o = Pe - n.length;
    } else
      o -= r;
    for (; o--; ) n += "0";
    e.d.push(+n), Be && (e.e > e.constructor.maxE ? (e.d = null, e.e = NaN) : e.e < e.constructor.minE && (e.e = 0, e.d = [0]));
  } else
    e.e = 0, e.d = [0];
  return e;
}
function l6(e, n) {
  var t, o, r, a, i, l, s, u, c;
  if (n.indexOf("_") > -1) {
    if (n = n.replace(/(\d)_(?=\d)/g, "$1"), Rv.test(n)) return Ar(e, n);
  } else if (n === "Infinity" || n === "NaN")
    return +n || (e.s = NaN), e.e = NaN, e.d = null, e;
  if (t6.test(n))
    t = 16, n = n.toLowerCase();
  else if (n6.test(n))
    t = 2;
  else if (o6.test(n))
    t = 8;
  else
    throw Error(Rt + n);
  for (a = n.search(/p/i), a > 0 ? (s = +n.slice(a + 1), n = n.substring(2, a)) : n = n.slice(2), a = n.indexOf("."), i = a >= 0, o = e.constructor, i && (n = n.replace(".", ""), l = n.length, a = l - a, r = Vv(o, new o(t), a, a * 2)), u = Ir(n, t, Qn), c = u.length - 1, a = c; u[a] === 0; --a) u.pop();
  return a < 0 ? new o(e.s * 0) : (e.e = li(u, c), e.d = u, Be = !1, i && (e = xe(e, r, l * 4)), s && (e = e.times(Math.abs(s) < 54 ? fn(2, s) : Et.pow(2, s))), Be = !0, e);
}
function s6(e, n) {
  var t, o = n.d.length;
  if (o < 3)
    return n.isZero() ? n : yo(e, 2, n, n);
  t = 1.4 * Math.sqrt(o), t = t > 16 ? 16 : t | 0, n = n.times(1 / si(5, t)), n = yo(e, 2, n, n);
  for (var r, a = new e(5), i = new e(16), l = new e(20); t--; )
    r = n.times(n), n = n.times(a.plus(r.times(i.times(r).minus(l))));
  return n;
}
function yo(e, n, t, o, r) {
  var a, i, l, s, u = e.precision, c = Math.ceil(u / Pe);
  for (Be = !1, s = t.times(t), l = new e(o); ; ) {
    if (i = xe(l.times(s), new e(n++ * n++), u, 1), l = r ? o.plus(i) : o.minus(i), o = xe(i.times(s), new e(n++ * n++), u, 1), i = l.plus(o), i.d[c] !== void 0) {
      for (a = c; i.d[a] === l.d[a] && a--; ) ;
      if (a == -1) break;
    }
    a = l, l = o, o = i, i = a;
  }
  return Be = !0, i.d.length = c + 1, i;
}
function si(e, n) {
  for (var t = e; --n; ) t *= e;
  return t;
}
function jv(e, n) {
  var t, o = n.s < 0, r = tt(e, e.precision, 1), a = r.times(0.5);
  if (n = n.abs(), n.lte(a))
    return ct = o ? 4 : 1, n;
  if (t = n.divToInt(r), t.isZero())
    ct = o ? 3 : 2;
  else {
    if (n = n.minus(t.times(r)), n.lte(a))
      return ct = gd(t) ? o ? 2 : 3 : o ? 4 : 1, n;
    ct = gd(t) ? o ? 1 : 4 : o ? 3 : 2;
  }
  return n.minus(r).abs();
}
function Mu(e, n, t, o) {
  var r, a, i, l, s, u, c, d, p, f = e.constructor, h = t !== void 0;
  if (h ? (An(t, 1, Ut), o === void 0 ? o = f.rounding : An(o, 0, 8)) : (t = f.precision, o = f.rounding), !e.isFinite())
    c = Uv(e);
  else {
    for (c = rt(e), i = c.indexOf("."), h ? (r = 2, n == 16 ? t = t * 4 - 3 : n == 8 && (t = t * 3 - 2)) : r = n, i >= 0 && (c = c.replace(".", ""), p = new f(1), p.e = c.length - i, p.d = Ir(rt(p), 10, r), p.e = p.d.length), d = Ir(c, 10, r), a = s = d.length; d[--s] == 0; ) d.pop();
    if (!d[0])
      c = h ? "0p+0" : "0";
    else {
      if (i < 0 ? a-- : (e = new f(e), e.d = d, e.e = a, e = xe(e, p, t, o, 0, r), d = e.d, a = e.e, u = Dv), i = d[t], l = r / 2, u = u || d[t + 1] !== void 0, u = o < 4 ? (i !== void 0 || u) && (o === 0 || o === (e.s < 0 ? 3 : 2)) : i > l || i === l && (o === 4 || u || o === 6 && d[t - 1] & 1 || o === (e.s < 0 ? 8 : 7)), d.length = t, u)
        for (; ++d[--t] > r - 1; )
          d[t] = 0, t || (++a, d.unshift(1));
      for (s = d.length; !d[s - 1]; --s) ;
      for (i = 0, c = ""; i < s; i++) c += Jl.charAt(d[i]);
      if (h) {
        if (s > 1)
          if (n == 16 || n == 8) {
            for (i = n == 16 ? 4 : 3, --s; s % i; s++) c += "0";
            for (d = Ir(c, r, n), s = d.length; !d[s - 1]; --s) ;
            for (i = 1, c = "1."; i < s; i++) c += Jl.charAt(d[i]);
          } else
            c = c.charAt(0) + "." + c.slice(1);
        c = c + (a < 0 ? "p" : "p+") + a;
      } else if (a < 0) {
        for (; ++a; ) c = "0" + c;
        c = "0." + c;
      } else if (++a > s) for (a -= s; a--; ) c += "0";
      else a < s && (c = c.slice(0, a) + "." + c.slice(a));
    }
    c = (n == 16 ? "0x" : n == 2 ? "0b" : n == 8 ? "0o" : "") + c;
  }
  return e.s < 0 ? "-" + c : c;
}
function hd(e, n) {
  if (e.length > n)
    return e.length = n, !0;
}
function u6(e) {
  return new this(e).abs();
}
function c6(e) {
  return new this(e).acos();
}
function d6(e) {
  return new this(e).acosh();
}
function p6(e, n) {
  return new this(e).plus(n);
}
function m6(e) {
  return new this(e).asin();
}
function f6(e) {
  return new this(e).asinh();
}
function v6(e) {
  return new this(e).atan();
}
function g6(e) {
  return new this(e).atanh();
}
function h6(e, n) {
  e = new this(e), n = new this(n);
  var t, o = this.precision, r = this.rounding, a = o + 4;
  return !e.s || !n.s ? t = new this(NaN) : !e.d && !n.d ? (t = tt(this, a, 1).times(n.s > 0 ? 0.25 : 0.75), t.s = e.s) : !n.d || e.isZero() ? (t = n.s < 0 ? tt(this, o, r) : new this(0), t.s = e.s) : !e.d || n.isZero() ? (t = tt(this, a, 1).times(0.5), t.s = e.s) : n.s < 0 ? (this.precision = a, this.rounding = 1, t = this.atan(xe(e, n, a, 1)), n = tt(this, a, 1), this.precision = o, this.rounding = r, t = e.s < 0 ? t.minus(n) : t.plus(n)) : t = this.atan(xe(e, n, a, 1)), t;
}
function b6(e) {
  return new this(e).cbrt();
}
function y6(e) {
  return ze(e = new this(e), e.e + 1, 2);
}
function w6(e, n, t) {
  return new this(e).clamp(n, t);
}
function k6(e) {
  if (!e || typeof e != "object") throw Error(ii + "Object expected");
  var n, t, o, r = e.defaults === !0, a = [
    "precision",
    1,
    Ut,
    "rounding",
    0,
    8,
    "toExpNeg",
    -ro,
    0,
    "toExpPos",
    0,
    ro,
    "maxE",
    0,
    ro,
    "minE",
    -ro,
    0,
    "modulo",
    0,
    9
  ];
  for (n = 0; n < a.length; n += 3)
    if (t = a[n], r && (this[t] = Ql[t]), (o = e[t]) !== void 0)
      if (Pn(o) === o && o >= a[n + 1] && o <= a[n + 2]) this[t] = o;
      else throw Error(Rt + t + ": " + o);
  if (t = "crypto", r && (this[t] = Ql[t]), (o = e[t]) !== void 0)
    if (o === !0 || o === !1 || o === 0 || o === 1)
      if (o)
        if (typeof crypto < "u" && crypto && (crypto.getRandomValues || crypto.randomBytes))
          this[t] = !0;
        else
          throw Error(Av);
      else
        this[t] = !1;
    else
      throw Error(Rt + t + ": " + o);
  return this;
}
function $6(e) {
  return new this(e).cos();
}
function C6(e) {
  return new this(e).cosh();
}
function Hv(e) {
  var n, t, o;
  function r(a) {
    var i, l, s, u = this;
    if (!(u instanceof r)) return new r(a);
    if (u.constructor = r, bd(a)) {
      u.s = a.s, Be ? !a.d || a.e > r.maxE ? (u.e = NaN, u.d = null) : a.e < r.minE ? (u.e = 0, u.d = [0]) : (u.e = a.e, u.d = a.d.slice()) : (u.e = a.e, u.d = a.d ? a.d.slice() : a.d);
      return;
    }
    if (s = typeof a, s === "number") {
      if (a === 0) {
        u.s = 1 / a < 0 ? -1 : 1, u.e = 0, u.d = [0];
        return;
      }
      if (a < 0 ? (a = -a, u.s = -1) : u.s = 1, a === ~~a && a < 1e7) {
        for (i = 0, l = a; l >= 10; l /= 10) i++;
        Be ? i > r.maxE ? (u.e = NaN, u.d = null) : i < r.minE ? (u.e = 0, u.d = [0]) : (u.e = i, u.d = [a]) : (u.e = i, u.d = [a]);
        return;
      }
      if (a * 0 !== 0) {
        a || (u.s = NaN), u.e = NaN, u.d = null;
        return;
      }
      return Ar(u, a.toString());
    }
    if (s === "string")
      return (l = a.charCodeAt(0)) === 45 ? (a = a.slice(1), u.s = -1) : (l === 43 && (a = a.slice(1)), u.s = 1), Rv.test(a) ? Ar(u, a) : l6(u, a);
    if (s === "bigint")
      return a < 0 ? (a = -a, u.s = -1) : u.s = 1, Ar(u, a.toString());
    throw Error(Rt + a);
  }
  if (r.prototype = ee, r.ROUND_UP = 0, r.ROUND_DOWN = 1, r.ROUND_CEIL = 2, r.ROUND_FLOOR = 3, r.ROUND_HALF_UP = 4, r.ROUND_HALF_DOWN = 5, r.ROUND_HALF_EVEN = 6, r.ROUND_HALF_CEIL = 7, r.ROUND_HALF_FLOOR = 8, r.EUCLID = 9, r.config = r.set = k6, r.clone = Hv, r.isDecimal = bd, r.abs = u6, r.acos = c6, r.acosh = d6, r.add = p6, r.asin = m6, r.asinh = f6, r.atan = v6, r.atanh = g6, r.atan2 = h6, r.cbrt = b6, r.ceil = y6, r.clamp = w6, r.cos = $6, r.cosh = C6, r.div = S6, r.exp = z6, r.floor = P6, r.hypot = O6, r.ln = E6, r.log = T6, r.log10 = M6, r.log2 = B6, r.max = D6, r.min = I6, r.mod = A6, r.mul = N6, r.pow = R6, r.random = L6, r.round = V6, r.sign = F6, r.sin = U6, r.sinh = j6, r.sqrt = H6, r.sub = Y6, r.sum = W6, r.tan = K6, r.tanh = q6, r.trunc = X6, e === void 0 && (e = {}), e && e.defaults !== !0)
    for (o = ["precision", "rounding", "toExpNeg", "toExpPos", "maxE", "minE", "modulo", "crypto"], n = 0; n < o.length; ) e.hasOwnProperty(t = o[n++]) || (e[t] = this[t]);
  return r.config(e), r;
}
function S6(e, n) {
  return new this(e).div(n);
}
function z6(e) {
  return new this(e).exp();
}
function P6(e) {
  return ze(e = new this(e), e.e + 1, 3);
}
function O6() {
  var e, n, t = new this(0);
  for (Be = !1, e = 0; e < arguments.length; )
    if (n = new this(arguments[e++]), n.d)
      t.d && (t = t.plus(n.times(n)));
    else {
      if (n.s)
        return Be = !0, new this(1 / 0);
      t = n;
    }
  return Be = !0, t.sqrt();
}
function bd(e) {
  return e instanceof Et || e && e.toStringTag === Nv || !1;
}
function E6(e) {
  return new this(e).ln();
}
function T6(e, n) {
  return new this(e).log(n);
}
function B6(e) {
  return new this(e).log(2);
}
function M6(e) {
  return new this(e).log(10);
}
function D6() {
  return Fv(this, arguments, -1);
}
function I6() {
  return Fv(this, arguments, 1);
}
function A6(e, n) {
  return new this(e).mod(n);
}
function N6(e, n) {
  return new this(e).mul(n);
}
function R6(e, n) {
  return new this(e).pow(n);
}
function L6(e) {
  var n, t, o, r, a = 0, i = new this(1), l = [];
  if (e === void 0 ? e = this.precision : An(e, 1, Ut), o = Math.ceil(e / Pe), this.crypto)
    if (crypto.getRandomValues)
      for (n = crypto.getRandomValues(new Uint32Array(o)); a < o; )
        r = n[a], r >= 429e7 ? n[a] = crypto.getRandomValues(new Uint32Array(1))[0] : l[a++] = r % 1e7;
    else if (crypto.randomBytes) {
      for (n = crypto.randomBytes(o *= 4); a < o; )
        r = n[a] + (n[a + 1] << 8) + (n[a + 2] << 16) + ((n[a + 3] & 127) << 24), r >= 214e7 ? crypto.randomBytes(4).copy(n, a) : (l.push(r % 1e7), a += 4);
      a = o / 4;
    } else
      throw Error(Av);
  else for (; a < o; ) l[a++] = Math.random() * 1e7 | 0;
  for (o = l[--a], e %= Pe, o && e && (r = fn(10, Pe - e), l[a] = (o / r | 0) * r); l[a] === 0; a--) l.pop();
  if (a < 0)
    t = 0, l = [0];
  else {
    for (t = -1; l[0] === 0; t -= Pe) l.shift();
    for (o = 1, r = l[0]; r >= 10; r /= 10) o++;
    o < Pe && (t -= Pe - o);
  }
  return i.e = t, i.d = l, i;
}
function V6(e) {
  return ze(e = new this(e), e.e + 1, this.rounding);
}
function F6(e) {
  return e = new this(e), e.d ? e.d[0] ? e.s : 0 * e.s : e.s || NaN;
}
function U6(e) {
  return new this(e).sin();
}
function j6(e) {
  return new this(e).sinh();
}
function H6(e) {
  return new this(e).sqrt();
}
function Y6(e, n) {
  return new this(e).sub(n);
}
function W6() {
  var e = 0, n = arguments, t = new this(n[e]);
  for (Be = !1; t.s && ++e < n.length; ) t = t.plus(n[e]);
  return Be = !0, ze(t, this.precision, this.rounding);
}
function K6(e) {
  return new this(e).tan();
}
function q6(e) {
  return new this(e).tanh();
}
function X6(e) {
  return ze(e = new this(e), e.e + 1, 1);
}
ee[Symbol.for("nodejs.util.inspect.custom")] = ee.toString;
ee[Symbol.toStringTag] = "Decimal";
var Et = ee.constructor = Hv(Ql);
ta = new Et(ta);
oa = new Et(oa);
const Yv = {
  modelValue: {
    type: Number,
    default: 0
  },
  min: [String, Number],
  max: [String, Number],
  step: {
    type: [String, Number],
    default: 1
  },
  color: String,
  inputWidth: [String, Number],
  inputTextSize: [String, Number],
  buttonSize: [String, Number],
  elevation: {
    type: [Boolean, Number, String],
    default: !0
  },
  decimalLength: [String, Number],
  disabled: Boolean,
  readonly: Boolean,
  disableIncrement: Boolean,
  disableDecrement: Boolean,
  disableInput: Boolean,
  lazyChange: Boolean,
  incrementButton: {
    type: Boolean,
    default: !0
  },
  decrementButton: {
    type: Boolean,
    default: !0
  },
  press: {
    type: Boolean,
    default: !0
  },
  ripple: {
    type: Boolean,
    default: !0
  },
  validateTrigger: {
    type: Array,
    default: () => ["onInputChange", "onLazyChange", "onIncrement", "onDecrement"]
  },
  rules: [Array, Function, Object],
  onBeforeChange: R(),
  onChange: R(),
  onIncrement: R(),
  onDecrement: R(),
  "onUpdate:modelValue": R()
}, yd = 100, wd = 600, { name: G6, n: Z6, classes: J6 } = _("counter"), Q6 = ["inputmode", "readonly", "disabled"];
function x6(e, n) {
  const t = oe("mp-icon"), o = oe("mp-button"), r = oe("mp-form-details");
  return g(), C(
    "div",
    {
      class: m(e.classes(e.n(), e.n("$--box")))
    },
    [
      V(
        "div",
        Ye({
          class: e.classes(
            e.n("controller"),
            e.formatElevation(e.elevation, 2),
            [e.disabled || e.formDisabled, e.n("--disabled")],
            [e.errorMessage, e.n("--error")]
          ),
          style: { background: e.color }
        }, e.$attrs),
        [
          Z(o, {
            class: m(
              e.classes(
                e.n("decrement-button"),
                [!e.decrementButton, e.n("--hidden")],
                [e.disabled || e.formDisabled, e.n("--not-allowed")]
              )
            ),
            style: G({
              width: e.toSizeUnit(e.buttonSize),
              height: e.toSizeUnit(e.buttonSize)
            }),
            round: "",
            "mp-counter-cover": "",
            ripple: e.ripple && e.decrementButton && !e.disabled && !e.formDisabled && !e.readonly && !e.formReadonly && !e.disableDecrement && !e.isMin,
            onClick: e.decrement,
            onTouchstart: e.pressDecrement,
            onTouchend: e.releaseDecrement,
            onTouchcancel: e.releaseDecrement
          }, {
            default: ue(() => [
              Z(t, { name: "minus" })
            ]),
            _: 1
            /* STABLE */
          }, 8, ["class", "style", "ripple", "onClick", "onTouchstart", "onTouchend", "onTouchcancel"]),
          Ue(V("input", {
            "onUpdate:modelValue": n[0] || (n[0] = (a) => e.inputValue = a),
            class: m(e.classes(e.n("input"), [e.disabled || e.formDisabled, e.n("--not-allowed")])),
            style: G({
              width: e.toSizeUnit(e.inputWidth),
              fontSize: e.toSizeUnit(e.inputTextSize)
            }),
            inputmode: e.toNumber(e.decimalLength) === 0 ? "numeric" : "decimal",
            readonly: e.readonly || e.formReadonly,
            disabled: e.disabled || e.formDisabled || e.disableInput,
            onChange: n[1] || (n[1] = (...a) => e.handleChange && e.handleChange(...a))
          }, null, 46, Q6), [
            [Cb, e.inputValue]
          ]),
          Z(o, {
            class: m(
              e.classes(
                e.n("increment-button"),
                [!e.incrementButton, e.n("--hidden")],
                [e.disabled || e.formDisabled, e.n("--not-allowed")]
              )
            ),
            style: G({
              width: e.toSizeUnit(e.buttonSize),
              height: e.toSizeUnit(e.buttonSize)
            }),
            round: "",
            "mp-counter-cover": "",
            ripple: e.ripple && e.incrementButton && !e.disabled && !e.formDisabled && !e.readonly && !e.formReadonly && !e.disableIncrement && !e.isMax,
            onClick: e.increment,
            onTouchstart: e.pressIncrement,
            onTouchend: e.releaseIncrement,
            onTouchcancel: e.releaseIncrement
          }, {
            default: ue(() => [
              Z(t, { name: "plus" })
            ]),
            _: 1
            /* STABLE */
          }, 8, ["class", "style", "ripple", "onClick", "onTouchstart", "onTouchend", "onTouchcancel"])
        ],
        16
        /* FULL_PROPS */
      ),
      Z(r, { "error-message": e.errorMessage }, null, 8, ["error-message"])
    ],
    2
    /* CLASS */
  );
}
const Wv = ne({
  name: G6,
  components: {
    MpButton: Mn,
    MpIcon: Qe,
    MpFormDetails: Bn
  },
  directives: { Ripple: an },
  inheritAttrs: !1,
  props: Yv,
  setup(e) {
    const n = k(""), { bindForm: t, form: o } = jn(), {
      errorMessage: r,
      validateWithTrigger: a,
      validate: i,
      // expose
      resetValidation: l
    } = Un(), { readonly: s, disabled: u } = o ?? {}, c = O(() => {
      const { max: E, modelValue: J } = e;
      return E != null && Y(J) >= Y(E);
    }), d = O(() => {
      const { min: E, modelValue: J } = e;
      return E != null && Y(J) <= Y(E);
    });
    let p, f, h, v;
    S(t, {
      reset: b,
      validate: w,
      resetValidation: l
    }), pe(
      () => e.modelValue,
      (E) => {
        M(z(String(E))), S(e.onChange, Y(E));
      }
    ), M(z(String(e.modelValue)));
    function w() {
      return i(e.rules, e.modelValue);
    }
    function $(E) {
      Ke(() => {
        const { validateTrigger: J, rules: X, modelValue: te } = e;
        a(J, E, X, te);
      });
    }
    function b() {
      const { min: E } = e;
      S(e["onUpdate:modelValue"], E != null ? Y(E) : 0), l();
    }
    function z(E) {
      const { decimalLength: J, max: X, min: te } = e;
      let he = Y(E);
      return X != null && he > Y(X) && (he = Y(X)), te != null && he < Y(te) && (he = Y(te)), E = String(he), J != null && (E = he.toFixed(Y(J))), E;
    }
    function D(E) {
      const { lazyChange: J, onBeforeChange: X } = e, { value: te } = E.target, he = z(te);
      J ? S(X, Y(he), j) : M(he), $("onInputChange");
    }
    function P() {
      const {
        disabled: E,
        readonly: J,
        disableDecrement: X,
        decrementButton: te,
        lazyChange: he,
        step: Ie,
        modelValue: H,
        onDecrement: x,
        onBeforeChange: re
      } = e;
      if (u != null && u.value || s != null && s.value || E || J || X || !te || d.value)
        return;
      const ve = new Et(Y(H)).minus(new Et(Y(Ie))).toString(), A = z(ve), K = Y(A);
      S(x, K), he ? S(re, K, j) : (M(A), $("onDecrement"));
    }
    function B() {
      const {
        disabled: E,
        readonly: J,
        disableIncrement: X,
        incrementButton: te,
        lazyChange: he,
        step: Ie,
        modelValue: H,
        onIncrement: x,
        onBeforeChange: re
      } = e;
      if (u != null && u.value || s != null && s.value || E || J || X || !te || c.value)
        return;
      const ve = new Et(Y(H)).plus(new Et(Y(Ie))).toString(), A = z(ve), K = Y(A);
      S(x, K), he ? S(re, K, j) : (M(A), $("onIncrement"));
    }
    function I() {
      const { press: E, lazyChange: J } = e;
      !E || J || (v = window.setTimeout(() => {
        T();
      }, wd));
    }
    function U() {
      const { press: E, lazyChange: J } = e;
      !E || J || (h = window.setTimeout(() => {
        N();
      }, wd));
    }
    function L() {
      f && clearTimeout(f), v && clearTimeout(v);
    }
    function W() {
      p && clearTimeout(p), h && clearTimeout(h);
    }
    function N() {
      p = window.setTimeout(() => {
        B(), N();
      }, yd);
    }
    function T() {
      f = window.setTimeout(() => {
        P(), T();
      }, yd);
    }
    function M(E) {
      n.value = E;
      const J = Y(E);
      S(e["onUpdate:modelValue"], J);
    }
    function j(E) {
      M(z(String(E))), $("onLazyChange");
    }
    return {
      inputValue: n,
      errorMessage: r,
      formDisabled: u,
      formReadonly: s,
      isMax: c,
      isMin: d,
      n: Z6,
      classes: J6,
      formatElevation: pn,
      validate: w,
      reset: b,
      resetValidation: l,
      handleChange: D,
      decrement: P,
      increment: B,
      pressDecrement: I,
      pressIncrement: U,
      releaseDecrement: L,
      releaseIncrement: W,
      toSizeUnit: Te,
      toNumber: Y
    };
  }
});
Wv.render = x6;
var ui = Wv;
ae(ui);
le(ui, Yv);
const lD = ui;
var es = ui, Kv = 60, qv = Kv * 60, Xv = qv * 24, _6 = Xv * 7, wo = 1e3, cl = Kv * wo, kd = qv * wo, ez = Xv * wo, nz = _6 * wo, Du = "millisecond", ao = "second", io = "minute", lo = "hour", $t = "day", Nr = "week", Jn = "month", Gv = "quarter", Ct = "year", so = "date", tz = "YYYY-MM-DDTHH:mm:ssZ", $d = "Invalid Date", oz = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, rz = /\[([^\]]+)]|YYYY|YY|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g;
const az = {
  name: "en",
  weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
  months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
  ordinal: function(n) {
    var t = ["th", "st", "nd", "rd"], o = n % 100;
    return "[" + n + (t[(o - 20) % 10] || t[o] || t[0]) + "]";
  }
};
var ns = function(n, t, o) {
  var r = String(n);
  return !r || r.length >= t ? n : "" + Array(t + 1 - r.length).join(o) + n;
}, iz = function(n) {
  var t = -n.utcOffset(), o = Math.abs(t), r = Math.floor(o / 60), a = o % 60;
  return (t <= 0 ? "+" : "-") + ns(r, 2, "0") + ":" + ns(a, 2, "0");
}, lz = function e(n, t) {
  if (n.date() < t.date()) return -e(t, n);
  var o = (t.year() - n.year()) * 12 + (t.month() - n.month()), r = n.clone().add(o, Jn), a = t - r < 0, i = n.clone().add(o + (a ? -1 : 1), Jn);
  return +(-(o + (t - r) / (a ? r - i : i - r)) || 0);
}, sz = function(n) {
  return n < 0 ? Math.ceil(n) || 0 : Math.floor(n);
}, uz = function(n) {
  var t = {
    M: Jn,
    y: Ct,
    w: Nr,
    d: $t,
    D: so,
    h: lo,
    m: io,
    s: ao,
    ms: Du,
    Q: Gv
  };
  return t[n] || String(n || "").toLowerCase().replace(/s$/, "");
}, cz = function(n) {
  return n === void 0;
};
const dz = {
  s: ns,
  z: iz,
  m: lz,
  a: sz,
  p: uz,
  u: cz
};
var No = "en", Kt = {};
Kt[No] = az;
var Zv = "$isDayjsObject", Iu = function(n) {
  return n instanceof ci || !!(n && n[Zv]);
}, aa = function e(n, t, o) {
  var r;
  if (!n) return No;
  if (typeof n == "string") {
    var a = n.toLowerCase();
    Kt[a] && (r = a), t && (Kt[a] = t, r = a);
    var i = n.split("-");
    if (!r && i.length > 1)
      return e(i[0]);
  } else {
    var l = n.name;
    Kt[l] = n, r = l;
  }
  return !o && r && (No = r), r || !o && No;
}, ce = function(n, t) {
  if (Iu(n))
    return n.clone();
  var o = typeof t == "object" ? t : {};
  return o.date = n, o.args = arguments, new ci(o);
}, pz = function(n, t) {
  return ce(n, {
    locale: t.$L,
    utc: t.$u,
    x: t.$x,
    $offset: t.$offset
    // todo: refactor; do not use this.$offset in you code
  });
}, Ge = dz;
Ge.l = aa;
Ge.i = Iu;
Ge.w = pz;
var mz = function(n) {
  var t = n.date, o = n.utc;
  if (t === null) return /* @__PURE__ */ new Date(NaN);
  if (Ge.u(t)) return /* @__PURE__ */ new Date();
  if (t instanceof Date) return new Date(t);
  if (typeof t == "string" && !/Z$/i.test(t)) {
    var r = t.match(oz);
    if (r) {
      var a = r[2] - 1 || 0, i = (r[7] || "0").substring(0, 3);
      return o ? new Date(Date.UTC(r[1], a, r[3] || 1, r[4] || 0, r[5] || 0, r[6] || 0, i)) : new Date(r[1], a, r[3] || 1, r[4] || 0, r[5] || 0, r[6] || 0, i);
    }
  }
  return new Date(t);
}, ci = /* @__PURE__ */ function() {
  function e(t) {
    this.$L = aa(t.locale, null, !0), this.parse(t), this.$x = this.$x || t.x || {}, this[Zv] = !0;
  }
  var n = e.prototype;
  return n.parse = function(o) {
    this.$d = mz(o), this.init();
  }, n.init = function() {
    var o = this.$d;
    this.$y = o.getFullYear(), this.$M = o.getMonth(), this.$D = o.getDate(), this.$W = o.getDay(), this.$H = o.getHours(), this.$m = o.getMinutes(), this.$s = o.getSeconds(), this.$ms = o.getMilliseconds();
  }, n.$utils = function() {
    return Ge;
  }, n.isValid = function() {
    return this.$d.toString() !== $d;
  }, n.isSame = function(o, r) {
    var a = ce(o);
    return this.startOf(r) <= a && a <= this.endOf(r);
  }, n.isAfter = function(o, r) {
    return ce(o) < this.startOf(r);
  }, n.isBefore = function(o, r) {
    return this.endOf(r) < ce(o);
  }, n.$g = function(o, r, a) {
    return Ge.u(o) ? this[r] : this.set(a, o);
  }, n.unix = function() {
    return Math.floor(this.valueOf() / 1e3);
  }, n.valueOf = function() {
    return this.$d.getTime();
  }, n.startOf = function(o, r) {
    var a = this, i = Ge.u(r) ? !0 : r, l = Ge.p(o), s = function(w, $) {
      var b = Ge.w(a.$u ? Date.UTC(a.$y, $, w) : new Date(a.$y, $, w), a);
      return i ? b : b.endOf($t);
    }, u = function(w, $) {
      var b = [0, 0, 0, 0], z = [23, 59, 59, 999];
      return Ge.w(a.toDate()[w].apply(
        // eslint-disable-line prefer-spread
        a.toDate("s"),
        (i ? b : z).slice($)
      ), a);
    }, c = this.$W, d = this.$M, p = this.$D, f = "set" + (this.$u ? "UTC" : "");
    switch (l) {
      case Ct:
        return i ? s(1, 0) : s(31, 11);
      case Jn:
        return i ? s(1, d) : s(0, d + 1);
      case Nr: {
        var h = this.$locale().weekStart || 0, v = (c < h ? c + 7 : c) - h;
        return s(i ? p - v : p + (6 - v), d);
      }
      case $t:
      case so:
        return u(f + "Hours", 0);
      case lo:
        return u(f + "Minutes", 1);
      case io:
        return u(f + "Seconds", 2);
      case ao:
        return u(f + "Milliseconds", 3);
      default:
        return this.clone();
    }
  }, n.endOf = function(o) {
    return this.startOf(o, !1);
  }, n.$set = function(o, r) {
    var a, i = Ge.p(o), l = "set" + (this.$u ? "UTC" : ""), s = (a = {}, a[$t] = l + "Date", a[so] = l + "Date", a[Jn] = l + "Month", a[Ct] = l + "FullYear", a[lo] = l + "Hours", a[io] = l + "Minutes", a[ao] = l + "Seconds", a[Du] = l + "Milliseconds", a)[i], u = i === $t ? this.$D + (r - this.$W) : r;
    if (i === Jn || i === Ct) {
      var c = this.clone().set(so, 1);
      c.$d[s](u), c.init(), this.$d = c.set(so, Math.min(this.$D, c.daysInMonth())).$d;
    } else s && this.$d[s](u);
    return this.init(), this;
  }, n.set = function(o, r) {
    return this.clone().$set(o, r);
  }, n.get = function(o) {
    return this[Ge.p(o)]();
  }, n.add = function(o, r) {
    var a = this, i;
    o = Number(o);
    var l = Ge.p(r), s = function(p) {
      var f = ce(a);
      return Ge.w(f.date(f.date() + Math.round(p * o)), a);
    };
    if (l === Jn)
      return this.set(Jn, this.$M + o);
    if (l === Ct)
      return this.set(Ct, this.$y + o);
    if (l === $t)
      return s(1);
    if (l === Nr)
      return s(7);
    var u = (i = {}, i[io] = cl, i[lo] = kd, i[ao] = wo, i)[l] || 1, c = this.$d.getTime() + o * u;
    return Ge.w(c, this);
  }, n.subtract = function(o, r) {
    return this.add(o * -1, r);
  }, n.format = function(o) {
    var r = this, a = this.$locale();
    if (!this.isValid()) return a.invalidDate || $d;
    var i = o || tz, l = Ge.z(this), s = this.$H, u = this.$m, c = this.$M, d = a.weekdays, p = a.months, f = a.meridiem, h = function(b, z, D, P) {
      return b && (b[z] || b(r, i)) || D[z].slice(0, P);
    }, v = function(b) {
      return Ge.s(s % 12 || 12, b, "0");
    }, y = f || function($, b, z) {
      var D = $ < 12 ? "AM" : "PM";
      return z ? D.toLowerCase() : D;
    }, w = function(b) {
      switch (b) {
        case "YY":
          return String(r.$y).slice(-2);
        case "YYYY":
          return Ge.s(r.$y, 4, "0");
        case "M":
          return c + 1;
        case "MM":
          return Ge.s(c + 1, 2, "0");
        case "MMM":
          return h(a.monthsShort, c, p, 3);
        case "MMMM":
          return h(p, c);
        case "D":
          return r.$D;
        case "DD":
          return Ge.s(r.$D, 2, "0");
        case "d":
          return String(r.$W);
        case "dd":
          return h(a.weekdaysMin, r.$W, d, 2);
        case "ddd":
          return h(a.weekdaysShort, r.$W, d, 3);
        case "dddd":
          return d[r.$W];
        case "H":
          return String(s);
        case "HH":
          return Ge.s(s, 2, "0");
        case "h":
          return v(1);
        case "hh":
          return v(2);
        case "a":
          return y(s, u, !0);
        case "A":
          return y(s, u, !1);
        case "m":
          return String(u);
        case "mm":
          return Ge.s(u, 2, "0");
        case "s":
          return String(r.$s);
        case "ss":
          return Ge.s(r.$s, 2, "0");
        case "SSS":
          return Ge.s(r.$ms, 3, "0");
        case "Z":
          return l;
      }
      return null;
    };
    return i.replace(rz, function($, b) {
      return b || w($) || l.replace(":", "");
    });
  }, n.utcOffset = function() {
    return -Math.round(this.$d.getTimezoneOffset() / 15) * 15;
  }, n.diff = function(o, r, a) {
    var i = this, l = Ge.p(r), s = ce(o), u = (s.utcOffset() - this.utcOffset()) * cl, c = this - s, d = function() {
      return Ge.m(i, s);
    }, p;
    switch (l) {
      case Ct:
        p = d() / 12;
        break;
      case Jn:
        p = d();
        break;
      case Gv:
        p = d() / 3;
        break;
      case Nr:
        p = (c - u) / nz;
        break;
      case $t:
        p = (c - u) / ez;
        break;
      case lo:
        p = c / kd;
        break;
      case io:
        p = c / cl;
        break;
      case ao:
        p = c / wo;
        break;
      default:
        p = c;
        break;
    }
    return a ? p : Ge.a(p);
  }, n.daysInMonth = function() {
    return this.endOf(Jn).$D;
  }, n.$locale = function() {
    return Kt[this.$L];
  }, n.locale = function(o, r) {
    if (!o) return this.$L;
    var a = this.clone(), i = aa(o, r, !0);
    return i && (a.$L = i), a;
  }, n.clone = function() {
    return Ge.w(this.$d, this);
  }, n.toDate = function() {
    return new Date(this.valueOf());
  }, n.toJSON = function() {
    return this.isValid() ? this.toISOString() : null;
  }, n.toISOString = function() {
    return this.$d.toISOString();
  }, n.toString = function() {
    return this.$d.toUTCString();
  }, e;
}(), Jv = ci.prototype;
ce.prototype = Jv;
[["$ms", Du], ["$s", ao], ["$m", io], ["$H", lo], ["$W", $t], ["$M", Jn], ["$y", Ct], ["$D", so]].forEach(function(e) {
  Jv[e[1]] = function(n) {
    return this.$g(n, e[0], e[1]);
  };
});
ce.extend = function(e, n) {
  return e.$i || (e(n, ci, ce), e.$i = !0), ce;
};
ce.locale = aa;
ce.isDayjs = Iu;
ce.unix = function(e) {
  return ce(e * 1e3);
};
ce.en = Kt[No];
ce.Ls = Kt;
ce.p = {};
const Rr = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"], Do = ["0", "1", "2", "3", "4", "5", "6"], Qv = {
  modelValue: [String, Array],
  type: {
    type: String,
    default: "date"
  },
  hint: String,
  allowedDates: Function,
  color: String,
  titleColor: String,
  elevation: {
    type: [Boolean, Number, String],
    default: !1
  },
  buttonElevation: {
    type: [Boolean, Number, String],
    default: !0
  },
  firstDayOfWeek: {
    type: [String, Number],
    default: 0
  },
  min: String,
  max: String,
  showCurrent: {
    type: Boolean,
    default: !0
  },
  readonly: Boolean,
  multiple: Boolean,
  range: Boolean,
  touchable: {
    type: Boolean,
    default: !0
  },
  onPreview: R(),
  onChange: R(),
  "onUpdate:modelValue": R()
}, xv = function(e, n) {
  n.prototype.isSameOrAfter = function(t, o) {
    return this.isSame(t, o) || this.isAfter(t, o);
  };
}, _v = function(e, n) {
  n.prototype.isSameOrBefore = function(t, o) {
    return this.isSame(t, o) || this.isBefore(t, o);
  };
}, { n: fz } = _("date-picker-header");
function vz(e, n) {
  const t = oe("mp-icon"), o = oe("mp-button");
  return g(), C(
    "div",
    {
      class: m(e.n())
    },
    [
      Z(o, {
        class: m(e.n("arrow")),
        "mp-date-picker-header-cover": "",
        round: "",
        text: "",
        disabled: e.disabled.left,
        onClick: n[0] || (n[0] = (r) => e.checkDate("prev"))
      }, {
        default: ue(() => [
          Z(t, { name: "chevron-left" })
        ]),
        _: 1
        /* STABLE */
      }, 8, ["class", "disabled"]),
      V(
        "div",
        {
          class: m(e.n("value")),
          onClick: n[1] || (n[1] = (r) => e.$emit("check-panel"))
        },
        [
          Z(_e, {
            name: `mp-date-picker${e.reverse ? "-reverse" : ""}-translatex`
          }, {
            default: ue(() => [
              (g(), C(
                "div",
                { key: e.showDate },
                se(e.showDate),
                1
                /* TEXT */
              ))
            ]),
            _: 1
            /* STABLE */
          }, 8, ["name"])
        ],
        2
        /* CLASS */
      ),
      Z(o, {
        class: m(e.n("arrow")),
        "mp-date-picker-header-cover": "",
        round: "",
        text: "",
        disabled: e.disabled.right,
        onClick: n[2] || (n[2] = (r) => e.checkDate("next"))
      }, {
        default: ue(() => [
          Z(t, { name: "chevron-right" })
        ]),
        _: 1
        /* STABLE */
      }, 8, ["class", "disabled"])
    ],
    2
    /* CLASS */
  );
}
const eg = ne({
  name: "PanelHeader",
  components: {
    MpButton: Mn,
    MpIcon: Qe
  },
  props: {
    date: {
      type: Object,
      required: !0
    },
    type: {
      type: String,
      default: "date"
    },
    disabled: {
      type: Object,
      required: !0
    }
  },
  emits: ["check-panel", "check-date"],
  setup(e, { emit: n }) {
    const t = k(!1), o = k(0), { t: r } = lt(), a = O(() => {
      var l;
      const { date: s, type: u } = e, { previewMonth: c, previewYear: d } = s;
      if (u === "year")
        return d;
      if (u === "month")
        return Y(d) + o.value;
      const p = (l = (r || ln)("datePickerMonthDict")) == null ? void 0 : l[c].name;
      return (r || ln)("lang") === "zh-CN" ? `${d} ${p}` : `${p} ${d}`;
    }), i = (l) => {
      l === "prev" && e.disabled.left || l === "next" && e.disabled.right || (n("check-date", l), t.value = l === "prev", o.value += l === "prev" ? -1 : 1);
    };
    return pe(
      () => e.date,
      () => {
        o.value = 0;
      }
    ), {
      n: fz,
      reverse: t,
      showDate: a,
      checkDate: i
    };
  }
});
eg.render = vz;
var Au = eg, gz = Object.defineProperty, Cd = Object.getOwnPropertySymbols, hz = Object.prototype.hasOwnProperty, bz = Object.prototype.propertyIsEnumerable, Sd = (e, n, t) => n in e ? gz(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t, yz = (e, n) => {
  for (var t in n || (n = {}))
    hz.call(n, t) && Sd(e, t, n[t]);
  if (Cd)
    for (var t of Cd(n))
      bz.call(n, t) && Sd(e, t, n[t]);
  return e;
};
ce.extend(_v);
ce.extend(xv);
const { n: to, classes: wz } = _("day-picker"), { n: kr } = _("date-picker");
function kz(e, n) {
  const t = oe("panel-header"), o = oe("mp-button");
  return g(), C(
    "div",
    {
      class: m(e.n())
    },
    [
      V(
        "div",
        {
          class: m(e.n("content"))
        },
        [
          Z(t, {
            ref: "headerEl",
            type: "day",
            date: e.preview,
            disabled: e.panelBtnDisabled,
            onCheckPanel: e.clickMonth,
            onCheckDate: e.checkDate
          }, null, 8, ["date", "disabled", "onCheckPanel", "onCheckDate"]),
          Z(_e, {
            name: `${e.nDate()}${e.reverse ? "-reverse" : ""}-translatex`
          }, {
            default: ue(() => [
              (g(), C("div", { key: e.panelKey }, [
                V(
                  "ul",
                  {
                    class: m(e.n("head"))
                  },
                  [
                    (g(!0), C(
                      Ae,
                      null,
                      Xe(e.sortWeekList, (r) => (g(), C(
                        "li",
                        { key: r },
                        se(e.getDayAbbr(r)),
                        1
                        /* TEXT */
                      ))),
                      128
                      /* KEYED_FRAGMENT */
                    ))
                  ],
                  2
                  /* CLASS */
                ),
                V(
                  "ul",
                  {
                    class: m(e.n("body"))
                  },
                  [
                    (g(!0), C(
                      Ae,
                      null,
                      Xe(e.days, (r, a) => (g(), C("li", { key: a }, [
                        Z(o, Ye({
                          type: "primary",
                          "mp-day-picker-cover": "",
                          round: "",
                          ripple: !1,
                          elevation: e.componentProps.buttonElevation,
                          ref_for: !0
                        }, yz({}, e.buttonProps(r)), {
                          onClick: (i) => e.chooseDay(r, i)
                        }), {
                          default: ue(() => [
                            De(
                              se(e.filterDay(r)),
                              1
                              /* TEXT */
                            )
                          ]),
                          _: 2
                          /* DYNAMIC */
                        }, 1040, ["elevation", "onClick"])
                      ]))),
                      128
                      /* KEYED_FRAGMENT */
                    ))
                  ],
                  2
                  /* CLASS */
                )
              ]))
            ]),
            _: 1
            /* STABLE */
          }, 8, ["name"])
        ],
        2
        /* CLASS */
      )
    ],
    2
    /* CLASS */
  );
}
const ng = ne({
  name: "DayPickerPanel",
  components: {
    MpButton: Mn,
    PanelHeader: Au
  },
  props: {
    choose: {
      type: Object,
      required: !0
    },
    preview: {
      type: Object,
      required: !0
    },
    current: {
      type: String,
      required: !0
    },
    clickMonth: {
      type: Function,
      required: !0
    },
    componentProps: {
      type: Object,
      required: !0
    }
  },
  emits: ["check-preview", "choose-day"],
  setup(e, { emit: n }) {
    const [t, o, r] = e.current.split("-"), a = k([]), i = k(!1), l = k(0), s = k(null), u = en({
      left: !1,
      right: !1
    }), { t: c } = lt(), d = O(
      () => e.preview.previewYear === t && e.preview.previewMonth === o
    ), p = O(
      () => e.choose.chooseYear === e.preview.previewYear && e.choose.chooseMonth === e.preview.previewMonth
    ), f = O(() => {
      const I = Do.findIndex((U) => U === e.componentProps.firstDayOfWeek);
      return I === -1 || I === 0 ? Do : [...Do.slice(I), ...Do.slice(0, I)];
    }), h = (I) => {
      var U, L;
      return (L = (U = (c || ln)("datePickerWeekDict")) == null ? void 0 : U[I].abbr) != null ? L : "";
    }, v = (I) => I > 0 ? I : "", y = () => {
      const {
        preview: { previewMonth: I, previewYear: U }
      } = e, L = ce(`${U}-${I}`).daysInMonth(), W = ce(`${U}-${I}-01`).day(), N = f.value.findIndex((T) => T === `${W}`);
      a.value = [...Array(N).fill(-1), ...Array.from(Array(L + 1).keys())].filter((T) => T);
    }, w = () => {
      const {
        preview: { previewYear: I, previewMonth: U },
        componentProps: { max: L, min: W }
      } = e;
      if (L) {
        const N = `${I}-${Y(U) + 1}`;
        u.right = !ce(N).isSameOrBefore(ce(L), "month");
      }
      if (W) {
        const N = `${I}-${Y(U) - 1}`;
        u.left = !ce(N).isSameOrAfter(ce(W), "month");
      }
    }, $ = (I) => {
      const {
        preview: { previewYear: U, previewMonth: L },
        componentProps: { min: W, max: N }
      } = e;
      let T = !0, M = !0;
      const j = `${U}-${L}-${I}`;
      return N && (T = ce(j).isSameOrBefore(ce(N), "day")), W && (M = ce(j).isSameOrAfter(ce(W), "day")), T && M;
    }, b = (I) => {
      const {
        choose: { chooseDays: U, chooseRangeDay: L },
        componentProps: { range: W }
      } = e;
      if (W) {
        if (!L.length)
          return !1;
        const N = ce(I).isSameOrBefore(ce(L[1]), "day"), T = ce(I).isSameOrAfter(ce(L[0]), "day");
        return N && T;
      }
      return U.includes(I);
    }, z = (I) => {
      if (I < 0)
        return {
          variant: "text",
          status: "default",
          textColor: "",
          class: to("button"),
          disabled: !0
        };
      const {
        choose: { chooseDay: U },
        preview: { previewYear: L, previewMonth: W },
        componentProps: { allowedDates: N, color: T, multiple: M, range: j }
      } = e, E = `${L}-${W}-${I}`, J = () => j || M ? b(E) : Y(U) === I && p.value, te = $(I) ? N ? !N(E) : !1 : !0, he = () => te ? !0 : j || M ? !b(E) : !p.value || Y(U) !== I, Ie = () => d.value && Y(r) === I && e.componentProps.showCurrent ? (j || M || p.value) && te ? !0 : j || M ? !b(E) : p.value ? U !== r : !0 : !1, H = () => te ? "" : Ie() ? T ?? "" : J() ? "" : `${kr()}-color-cover`, x = H().startsWith(kr());
      return {
        variant: Ie() ? "outline" : he() ? "text" : "default",
        status: he() ? "default" : "primary",
        textColor: x ? "" : H(),
        [`${kr()}-color-cover`]: x,
        class: wz(to("button"), to("button--usable"), [te, to("button--disabled")]),
        disabled: te
      };
    }, D = (I) => {
      i.value = I === "prev", l.value += I === "prev" ? -1 : 1, n("check-preview", "month", I);
    }, P = (I, U) => {
      U.currentTarget.classList.contains(to("button--disabled")) || n("choose-day", I);
    }, B = (I) => {
      s.value.checkDate(I);
    };
    return yn(() => {
      y(), w();
    }), pe(
      () => e.preview,
      () => {
        y(), w();
      }
    ), pe(() => [e.componentProps.max, e.componentProps.min], w), {
      n: to,
      nDate: kr,
      days: a,
      reverse: i,
      headerEl: s,
      panelKey: l,
      sortWeekList: f,
      panelBtnDisabled: u,
      forwardRef: B,
      filterDay: v,
      getDayAbbr: h,
      checkDate: D,
      chooseDay: P,
      buttonProps: z
    };
  }
});
ng.render = kz;
var $z = ng, Cz = Object.defineProperty, zd = Object.getOwnPropertySymbols, Sz = Object.prototype.hasOwnProperty, zz = Object.prototype.propertyIsEnumerable, Pd = (e, n, t) => n in e ? Cz(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t, Pz = (e, n) => {
  for (var t in n || (n = {}))
    Sz.call(n, t) && Pd(e, t, n[t]);
  if (zd)
    for (var t of zd(n))
      zz.call(n, t) && Pd(e, t, n[t]);
  return e;
};
ce.extend(_v);
ce.extend(xv);
const { n: $r, classes: Oz } = _("month-picker"), { n: Cr } = _("date-picker");
function Ez(e, n) {
  const t = oe("panel-header"), o = oe("mp-button");
  return g(), C(
    "div",
    {
      class: m(e.n())
    },
    [
      V(
        "div",
        {
          class: m(e.n("content"))
        },
        [
          Z(t, {
            ref: "headerEl",
            type: "month",
            date: e.preview,
            disabled: e.panelBtnDisabled,
            onCheckPanel: e.clickYear,
            onCheckDate: e.checkDate
          }, null, 8, ["date", "disabled", "onCheckPanel", "onCheckDate"]),
          Z(_e, {
            name: `${e.nDate()}${e.reverse ? "-reverse" : ""}-translatex`
          }, {
            default: ue(() => [
              (g(), C("ul", { key: e.panelKey }, [
                (g(!0), C(
                  Ae,
                  null,
                  Xe(e.MONTH_LIST, (r) => (g(), C("li", { key: r }, [
                    Z(o, Ye({
                      type: "primary",
                      "mp-month-picker-cover": "",
                      ripple: !1,
                      elevation: e.componentProps.buttonElevation,
                      ref_for: !0
                    }, Pz({}, e.buttonProps(r)), {
                      onClick: (a) => e.chooseMonth(r, a)
                    }), {
                      default: ue(() => [
                        De(
                          se(e.getMonthAbbr(r)),
                          1
                          /* TEXT */
                        )
                      ]),
                      _: 2
                      /* DYNAMIC */
                    }, 1040, ["elevation", "onClick"])
                  ]))),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ]))
            ]),
            _: 1
            /* STABLE */
          }, 8, ["name"])
        ],
        2
        /* CLASS */
      )
    ],
    2
    /* CLASS */
  );
}
const tg = ne({
  name: "MonthPickerPanel",
  components: {
    MpButton: Mn,
    PanelHeader: Au
  },
  props: {
    choose: {
      type: Object,
      required: !0
    },
    preview: {
      type: Object,
      required: !0
    },
    current: {
      type: String,
      required: !0
    },
    clickYear: {
      type: Function,
      required: !0
    },
    componentProps: {
      type: Object,
      required: !0
    }
  },
  emits: ["check-preview", "choose-month"],
  setup(e, { emit: n }) {
    const [t, o] = e.current.split("-"), r = k(!1), a = k(0), i = k(null), l = en({
      left: !1,
      right: !1
    }), { t: s } = lt(), u = O(() => e.choose.chooseYear === e.preview.previewYear), c = O(() => e.preview.previewYear === t), d = ($) => {
      var b, z;
      return (z = (b = (s || ln)("datePickerMonthDict")) == null ? void 0 : b[$].abbr) != null ? z : "";
    }, p = ($) => {
      const {
        preview: { previewYear: b },
        componentProps: { min: z, max: D }
      } = e;
      let P = !0, B = !0;
      const I = `${b}-${$}`;
      return D && (P = ce(I).isSameOrBefore(ce(D), "month")), z && (B = ce(I).isSameOrAfter(ce(z), "month")), P && B;
    }, f = ($) => {
      const {
        choose: { chooseMonths: b, chooseDays: z, chooseRangeMonth: D },
        componentProps: { type: P, range: B }
      } = e;
      if (B) {
        if (!D.length)
          return !1;
        const I = ce($).isSameOrBefore(ce(D[1]), "month"), U = ce($).isSameOrAfter(ce(D[0]), "month");
        return I && U;
      }
      return P === "month" ? b.includes($) : z.some((I) => I.includes($));
    }, h = ($) => {
      const {
        choose: { chooseMonth: b },
        preview: { previewYear: z },
        componentProps: { allowedDates: D, color: P, multiple: B, range: I }
      } = e, U = `${z}-${$}`, L = () => I || B ? f(U) : b === $ && u.value, N = p($) ? D ? !D(U) : !1 : !0, T = () => N ? !0 : I || B ? !f(U) : !u.value || b !== $, M = () => c.value && o === $ && e.componentProps.showCurrent ? (I || B || u.value) && N ? !0 : I || B ? !f(U) : u.value ? b !== o : !0 : !1, j = () => N ? "" : M() ? P ?? "" : L() ? "" : `${Cr()}-color-cover`, E = j().startsWith(Cr());
      return {
        variant: M() ? "outline" : T() ? "text" : "default",
        status: T() ? "default" : "primary",
        color: T() ? "" : P,
        textColor: E ? "" : j(),
        [`${Cr()}-color-cover`]: E,
        class: Oz($r("button"), [N, $r("button--disabled")]),
        disabled: N
      };
    }, v = ($, b) => {
      b.currentTarget.classList.contains($r("button--disabled")) || n("choose-month", $);
    }, y = ($) => {
      r.value = $ === "prev", a.value += $ === "prev" ? -1 : 1, n("check-preview", "year", $);
    }, w = ($) => {
      i.value.checkDate($);
    };
    return pe(
      () => [e.preview.previewYear, e.componentProps.max, e.componentProps.min],
      ([$, b, z]) => {
        b && (l.right = !ce(`${Y($) + 1}`).isSameOrBefore(ce(b), "year")), z && (l.left = !ce(`${Y($) - 1}`).isSameOrAfter(ce(z), "year"));
      },
      { immediate: !0 }
    ), {
      n: $r,
      nDate: Cr,
      t: ln,
      MONTH_LIST: Rr,
      headerEl: i,
      reverse: r,
      panelKey: a,
      panelBtnDisabled: l,
      forwardRef: w,
      buttonProps: h,
      getMonthAbbr: d,
      chooseMonth: v,
      checkDate: y
    };
  }
});
tg.render = Ez;
var Tz = tg;
const Ro = {
  offsetTop: {
    type: [String, Number],
    default: 0
  },
  zIndex: {
    type: [String, Number],
    default: 10
  },
  cssMode: Boolean,
  disabled: Boolean,
  onScroll: R()
};
var Od = (e, n, t) => new Promise((o, r) => {
  var a = (s) => {
    try {
      l(t.next(s));
    } catch (u) {
      r(u);
    }
  }, i = (s) => {
    try {
      l(t.throw(s));
    } catch (u) {
      r(u);
    }
  }, l = (s) => s.done ? o(s.value) : Promise.resolve(s.value).then(a, i);
  l((t = t.apply(e, n)).next());
});
const { name: Bz, n: Mz, classes: Dz } = _("sticky");
function Iz(e, n) {
  return g(), C(
    "div",
    {
      ref: "stickyEl",
      class: m(e.classes(e.n(), [e.enableCSSMode, e.n("--css-mode")])),
      style: G({
        zIndex: e.toNumber(e.zIndex),
        top: e.enableCSSMode ? `${e.offsetTop}px` : void 0,
        width: e.enableFixedMode ? e.fixedWidth : void 0,
        height: e.enableFixedMode ? e.fixedHeight : void 0
      })
    },
    [
      V(
        "div",
        {
          ref: "wrapperEl",
          class: m(e.n("wrapper")),
          style: G({
            zIndex: e.toNumber(e.zIndex),
            position: e.enableFixedMode ? "fixed" : void 0,
            width: e.enableFixedMode ? e.fixedWrapperWidth : void 0,
            height: e.enableFixedMode ? e.fixedWrapperHeight : void 0,
            left: e.enableFixedMode ? e.fixedLeft : void 0,
            top: e.enableFixedMode ? e.fixedTop : void 0
          })
        },
        [
          F(e.$slots, "default")
        ],
        6
        /* CLASS, STYLE */
      )
    ],
    6
    /* CLASS, STYLE */
  );
}
const og = ne({
  name: Bz,
  props: Ro,
  setup(e) {
    const n = k(null), t = k(null), o = k(!1), r = k("0px"), a = k("0px"), i = k("auto"), l = k("auto"), s = k("auto"), u = k("auto"), c = O(() => !e.disabled && e.cssMode), d = O(() => !e.disabled && !e.cssMode && o.value), p = O(() => tn(e.offsetTop));
    let f;
    pe(() => e.disabled, $), yn(() => Od(this, null, function* () {
      yield bn(), v(), y();
    })), ir(w), nt($), He(() => window, "scroll", y);
    function h() {
      const { cssMode: b, disabled: z } = e;
      if (z)
        return;
      let D = 0;
      if (f && f !== window) {
        const { top: W } = nn(f);
        D = W;
      }
      const P = t.value, B = n.value, { top: I, left: U } = nn(B), L = I - D;
      return L <= p.value ? (b || (i.value = `${B.offsetWidth}px`, l.value = `${B.offsetHeight}px`, r.value = `${D + p.value}px`, a.value = `${U}px`, s.value = `${P.offsetWidth}px`, u.value = `${P.offsetHeight}px`, o.value = !0), {
        offsetTop: p.value,
        isFixed: !0
      }) : (o.value = !1, {
        offsetTop: L,
        isFixed: !1
      });
    }
    function v() {
      f = At(n.value), f !== window && f.addEventListener("scroll", y);
    }
    function y() {
      const b = h();
      b && S(e.onScroll, b.offsetTop, b.isFixed);
    }
    function w() {
      !f || f === window || f.removeEventListener("scroll", y);
    }
    function $() {
      return Od(this, null, function* () {
        o.value = !1, yield pt(), h();
      });
    }
    return {
      stickyEl: n,
      wrapperEl: t,
      isFixed: o,
      offsetTop: p,
      fixedTop: r,
      fixedLeft: a,
      fixedWidth: i,
      fixedHeight: l,
      fixedWrapperWidth: s,
      fixedWrapperHeight: u,
      enableCSSMode: c,
      enableFixedMode: d,
      n: Mz,
      classes: Dz,
      resize: $,
      toNumber: Y
    };
  }
});
og.render = Iz;
var di = og;
ae(di);
le(di, Ro);
const sD = di;
var ko = di, Az = Object.defineProperty, Ed = Object.getOwnPropertySymbols, Nz = Object.prototype.hasOwnProperty, Rz = Object.prototype.propertyIsEnumerable, Td = (e, n, t) => n in e ? Az(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t, Lz = (e, n) => {
  for (var t in n || (n = {}))
    Nz.call(n, t) && Td(e, t, n[t]);
  if (Ed)
    for (var t of Ed(n))
      Rz.call(n, t) && Td(e, t, n[t]);
  return e;
};
const { n: Sr, classes: Bd } = _("year-picker"), { n: zr } = _("date-picker");
function Vz(e, n) {
  const t = oe("panel-header"), o = oe("mp-sticky"), r = oe("mp-button");
  return g(), C("div", null, [
    Z(o, { "css-mode": "" }, {
      default: ue(() => [
        Z(t, {
          ref: "headerEl",
          type: "year",
          date: {
            previewYear: `${e.yearList[0]} ~ ${e.yearList[e.yearList.length - 1]}`
          },
          disabled: e.panelBtnDisabled,
          onCheckDate: e.checkDate
        }, null, 8, ["date", "disabled", "onCheckDate"])
      ]),
      _: 1
      /* STABLE */
    }),
    Z(_e, {
      name: `${e.nDate()}${e.reverse ? "-reverse" : ""}-translatex`
    }, {
      default: ue(() => [
        (g(), C(
          "ul",
          {
            ref: "panel",
            key: e.panelKey,
            class: m(e.n())
          },
          [
            (g(!0), C(
              Ae,
              null,
              Xe(e.yearList, (a) => (g(), C("li", { key: a }, [
                Z(r, Ye({
                  type: "primary",
                  "mp-year-picker-cover": "",
                  ripple: !1,
                  elevation: e.componentProps.buttonElevation,
                  ref_for: !0
                }, Lz({}, e.buttonProps(`${a}`)), {
                  onClick: (i) => e.chooseYear(a, i)
                }), {
                  default: ue(() => [
                    De(
                      se(a),
                      1
                      /* TEXT */
                    )
                  ]),
                  _: 2
                  /* DYNAMIC */
                }, 1040, ["elevation", "onClick"])
              ]))),
              128
              /* KEYED_FRAGMENT */
            ))
          ],
          2
          /* CLASS */
        ))
      ]),
      _: 1
      /* STABLE */
    }, 8, ["name"])
  ]);
}
const rg = ne({
  name: "YearPickerPanel",
  components: {
    MpButton: Mn,
    MpSticky: ko,
    PanelHeader: Au
  },
  props: {
    choose: {
      type: Object,
      required: !0
    },
    current: {
      type: String,
      required: !0
    },
    preview: {
      type: String
    },
    componentProps: {
      type: Object,
      required: !0
    }
  },
  emits: ["choose-year"],
  setup(e, { emit: n }) {
    const [t] = e.current.split("-"), o = k(), r = k(null), a = k(!1), i = k(0), l = k(0), s = en({
      left: !1,
      right: !1
    }), u = O(() => {
      if (!e.preview)
        return [];
      const w = Math.floor(Y(e.preview) / 100 + l.value) * 100;
      return Array.from(Array(100), ($, b) => Math.max(0, w) + b);
    }), c = (w) => {
      const {
        choose: { chooseMonths: $, chooseDays: b, chooseYears: z, chooseRangeYear: D },
        componentProps: { type: P, range: B }
      } = e;
      if (B) {
        if (!D.length)
          return !1;
        const I = ce(w).isSameOrBefore(ce(D[1]), "year"), U = ce(w).isSameOrAfter(ce(D[0]), "year");
        return I && U;
      }
      return P === "year" ? z.includes(w) : P === "month" ? $.some((I) => I.includes(w)) : b.some((I) => I.includes(w));
    }, d = (w) => {
      const {
        componentProps: { min: $, max: b }
      } = e, z = b ? ce(w).isSameOrBefore(ce(b), "year") : !0, D = $ ? ce(w).isSameOrAfter(ce($), "year") : !0;
      return z && D;
    }, p = (w) => {
      const {
        choose: { chooseYear: $ },
        componentProps: { allowedDates: b, color: z, multiple: D, range: P }
      } = e, B = () => P || D ? c(w) : $ === w, U = d(w) ? b ? !b(w) : !1 : !0, L = () => U ? !0 : P || D ? !c(w) : $ !== w, W = () => t === w && e.componentProps.showCurrent ? (P || D) && U ? !0 : P || D ? !c(w) : $ !== t : !1, N = () => U ? "" : W() ? z ?? "" : B() ? "" : `${zr()}-color-cover`, T = N().startsWith(zr());
      return {
        variant: W() ? "outline" : L() ? "text" : "default",
        status: L() ? "default" : "primary",
        color: L() ? "" : z,
        textColor: T ? "" : N(),
        [`${zr()}-color-cover`]: T,
        class: Bd(Sr("button"), [U, Sr("button--disabled")]),
        disabled: U
      };
    }, f = (w, $) => {
      $.currentTarget.classList.contains(Sr("button--disabled")) || n("choose-year", w);
    }, h = () => {
      var w;
      const $ = (w = o.value.querySelector(".mp-button--status-primary")) != null ? w : o.value.querySelector(".mp-button--variant-outline");
      $ == null || $.scrollIntoView({
        block: "center"
      });
    }, v = (w) => {
      const $ = w === "prev";
      a.value = $, i.value += $ ? -1 : 1, l.value += $ ? -1 : 1;
    }, y = (w) => {
      r.value.checkDate(w);
    };
    return yn(h), pe(
      () => e.preview,
      () => {
        l.value = 0;
      }
    ), pe(
      () => [u.value, e.componentProps.max, e.componentProps.min],
      (w) => {
        const [$, b, z] = w;
        b && (s.right = !ce(`${Y($[$.length - 1])}`).isSameOrBefore(ce(b), "year")), z && (s.left = !ce(`${Y($[0])}`).isSameOrAfter(ce(z), "year")), Y($[0] <= 0) && (s.left = !1);
      },
      {
        immediate: !0
      }
    ), {
      n: Sr,
      classes: Bd,
      buttonProps: p,
      panel: o,
      headerEl: r,
      yearList: u,
      reverse: a,
      panelKey: i,
      panelBtnDisabled: s,
      nDate: zr,
      checkDate: v,
      chooseYear: f,
      forwardRef: y,
      toNumber: Y
    };
  }
});
rg.render = Vz;
var Fz = rg, Uz = (e, n, t) => new Promise((o, r) => {
  var a = (s) => {
    try {
      l(t.next(s));
    } catch (u) {
      r(u);
    }
  }, i = (s) => {
    try {
      l(t.throw(s));
    } catch (u) {
      r(u);
    }
  }, l = (s) => s.done ? o(s.value) : Promise.resolve(s.value).then(a, i);
  l((t = t.apply(e, n)).next());
});
const { name: jz, n: Hz, classes: Yz } = _("date-picker");
function Wz(e, n) {
  var t;
  const o = oe("year-picker-panel"), r = oe("month-picker-panel"), a = oe("day-picker-panel");
  return g(), C(
    "div",
    {
      class: m(e.classes(e.n(), e.formatElevation(e.elevation, 2)))
    },
    [
      V(
        "div",
        {
          class: m(e.n("title")),
          style: G({ background: e.titleColor || e.color })
        },
        [
          V(
            "div",
            {
              class: m(e.n("title-select"))
            },
            [
              V(
                "div",
                {
                  class: m(e.n("title-hint"))
                },
                se((t = e.hint) != null ? t : (e.pt ? e.pt : e.t)("datePickerHint")),
                3
                /* TEXT, CLASS */
              ),
              e.type !== "year" ? (g(), C(
                "div",
                {
                  key: 0,
                  class: m(e.classes(e.n("title-year"), [e.isYearPanel, e.n("title-year--active")])),
                  onClick: n[0] || (n[0] = (i) => e.clickEl("year"))
                },
                [
                  F(e.$slots, "year", { year: e.chooseYear }, () => [
                    De(
                      se(e.chooseYear),
                      1
                      /* TEXT */
                    )
                  ])
                ],
                2
                /* CLASS */
              )) : q("v-if", !0)
            ],
            2
            /* CLASS */
          ),
          V(
            "div",
            {
              class: m(
                e.classes(
                  e.n("title-date"),
                  [!e.isYearPanel || e.type === "year", e.n("title-date--active")],
                  [e.range, e.n("title-date--range")]
                )
              ),
              onClick: n[1] || (n[1] = (i) => e.clickEl("date"))
            },
            [
              Z(_e, {
                name: e.multiple ? "" : `${e.n()}${e.reverse ? "-reverse" : ""}-translatey`
              }, {
                default: ue(() => [
                  e.type === "year" ? (g(), C("div", {
                    key: `${e.chooseYear}`
                  }, [
                    e.range ? F(e.$slots, "range", {
                      key: 0,
                      choose: e.getChoose.chooseRangeYear
                    }, () => [
                      De(
                        se(e.getYearTitle),
                        1
                        /* TEXT */
                      )
                    ]) : e.multiple ? F(e.$slots, "multiple", {
                      key: 1,
                      choose: e.getChoose.chooseYears
                    }, () => [
                      De(
                        se(e.getYearTitle),
                        1
                        /* TEXT */
                      )
                    ]) : F(e.$slots, "year", {
                      key: 2,
                      year: e.chooseYear
                    }, () => [
                      De(
                        se(e.getYearTitle),
                        1
                        /* TEXT */
                      )
                    ])
                  ])) : e.type === "month" ? (g(), C("div", {
                    key: `${e.chooseYear}${e.chooseMonth}`
                  }, [
                    e.range ? F(e.$slots, "range", {
                      key: 0,
                      choose: e.getChoose.chooseRangeMonth
                    }, () => [
                      De(
                        se(e.getMonthTitle),
                        1
                        /* TEXT */
                      )
                    ]) : e.multiple ? F(e.$slots, "multiple", {
                      key: 1,
                      choose: e.getChoose.chooseMonths
                    }, () => [
                      De(
                        se(e.getMonthTitle),
                        1
                        /* TEXT */
                      )
                    ]) : F(e.$slots, "month", {
                      key: 2,
                      month: e.chooseMonth,
                      year: e.chooseYear
                    }, () => [
                      De(
                        se(e.getMonthTitle),
                        1
                        /* TEXT */
                      )
                    ])
                  ])) : (g(), C("div", {
                    key: `${e.chooseYear}${e.chooseMonth}${e.chooseDay}`
                  }, [
                    e.range ? F(e.$slots, "range", {
                      key: 0,
                      choose: e.formatRange
                    }, () => [
                      De(
                        se(e.getDateTitle),
                        1
                        /* TEXT */
                      )
                    ]) : e.multiple ? F(e.$slots, "multiple", {
                      key: 1,
                      choose: e.getChoose.chooseDays
                    }, () => [
                      De(
                        se(e.getDateTitle),
                        1
                        /* TEXT */
                      )
                    ]) : F(e.$slots, "date", Wt(Ye({ key: 2 }, e.slotProps)), () => [
                      De(
                        se(e.getDateTitle),
                        1
                        /* TEXT */
                      )
                    ])
                  ]))
                ]),
                _: 3
                /* FORWARDED */
              }, 8, ["name"])
            ],
            2
            /* CLASS */
          )
        ],
        6
        /* CLASS, STYLE */
      ),
      V(
        "div",
        {
          class: m(e.n("body")),
          onTouchstart: n[2] || (n[2] = (...i) => e.handleTouchstart && e.handleTouchstart(...i)),
          onTouchmove: n[3] || (n[3] = (...i) => e.handleTouchmove && e.handleTouchmove(...i)),
          onTouchend: n[4] || (n[4] = (...i) => e.handleTouchend && e.handleTouchend(...i))
        },
        [
          Z(_e, {
            name: `${e.n()}-panel-fade`
          }, {
            default: ue(() => [
              e.getPanelType === "year" ? (g(), ke(o, {
                key: 0,
                ref: "yearPanelEl",
                choose: e.getChoose,
                current: e.currentDate,
                "component-props": e.componentProps,
                preview: e.previewYear,
                onChooseYear: e.getChooseYear
              }, null, 8, ["choose", "current", "component-props", "preview", "onChooseYear"])) : e.getPanelType === "month" ? (g(), ke(r, {
                key: 1,
                ref: "monthPanelEl",
                current: e.currentDate,
                choose: e.getChoose,
                preview: e.getPreview,
                "click-year": () => e.clickEl("year"),
                "component-props": e.componentProps,
                onChooseMonth: e.getChooseMonth,
                onCheckPreview: e.checkPreview
              }, null, 8, ["current", "choose", "preview", "click-year", "component-props", "onChooseMonth", "onCheckPreview"])) : e.getPanelType === "date" ? (g(), ke(a, {
                key: 2,
                ref: "dayPanelEl",
                current: e.currentDate,
                choose: e.getChoose,
                preview: e.getPreview,
                "component-props": e.componentProps,
                "click-month": () => e.clickEl("month"),
                onChooseDay: e.getChooseDay,
                onCheckPreview: e.checkPreview
              }, null, 8, ["current", "choose", "preview", "component-props", "click-month", "onChooseDay", "onCheckPreview"])) : q("v-if", !0)
            ]),
            _: 1
            /* STABLE */
          }, 8, ["name"])
        ],
        34
        /* CLASS, NEED_HYDRATION */
      ),
      e.$slots.actions ? (g(), C(
        "div",
        {
          key: 0,
          class: m(e.n("actions"))
        },
        [
          F(e.$slots, "actions")
        ],
        2
        /* CLASS */
      )) : q("v-if", !0)
    ],
    2
    /* CLASS */
  );
}
const ag = ne({
  name: jz,
  components: {
    MonthPickerPanel: Tz,
    YearPickerPanel: Fz,
    DayPickerPanel: $z
  },
  props: Qv,
  setup(e) {
    const { t: n } = lt(), t = ce().format("YYYY-MM-D"), [o, r] = t.split("-"), a = Rr.find((ie) => ie === r), i = k(!1), l = k(!1), s = k(!0), u = k(), c = k(), d = k(), p = k(a), f = k(o), h = k(!1), v = k([]), y = k([]), w = k([]), $ = k([]), b = k([]), z = k([]), D = k(null), P = k(null), B = k(null), I = O(() => ({
      allowedDates: e.allowedDates,
      type: e.type,
      color: e.color,
      firstDayOfWeek: e.firstDayOfWeek,
      min: e.min,
      max: e.max,
      showCurrent: e.showCurrent,
      multiple: e.multiple,
      range: e.range,
      buttonElevation: e.buttonElevation
    })), U = O(() => ({
      chooseMonth: u.value,
      chooseYear: c.value,
      chooseDay: d.value,
      chooseYears: v.value,
      chooseMonths: y.value,
      chooseDays: w.value,
      chooseRangeYear: $.value,
      chooseRangeMonth: b.value,
      chooseRangeDay: z.value
    })), L = O(() => ({
      previewMonth: p.value,
      previewYear: f.value
    })), W = O(() => {
      var ie;
      const { multiple: $e, range: Oe } = e;
      return Oe ? $.value.length ? `${$.value[0]} ~ ${$.value[1]}` : "" : $e ? `${v.value.length}${(n || ln)("datePickerSelected")}` : (ie = c.value) != null ? ie : "";
    }), N = O(() => {
      var ie, $e;
      const { multiple: Oe, range: Q } = e;
      if (Q)
        return b.value.length ? `${b.value[0]} ~ ${b.value[1]}` : "";
      let fe = "";
      return u.value && (fe = ($e = (ie = (n || ln)("datePickerMonthDict")) == null ? void 0 : ie[u.value].name) != null ? $e : ""), Oe ? `${y.value.length}${(n || ln)("datePickerSelected")}` : fe;
    }), T = O(() => {
      var ie, $e, Oe, Q;
      const { multiple: fe, range: Ee } = e;
      if (Ee) {
        const eo = z.value.map((Hu) => ce(Hu).format("YYYY-MM-DD"));
        return eo.length ? `${eo[0]} ~ ${eo[1]}` : "";
      }
      if (fe)
        return `${w.value.length}${(n || ln)("datePickerSelected")}`;
      if (!c.value || !u.value || !d.value)
        return "";
      const Me = ce(`${c.value}-${u.value}-${d.value}`).day(), Ne = Do.find((eo) => eo === `${Me}`), rn = ($e = (ie = (n || ln)("datePickerWeekDict")) == null ? void 0 : ie[Ne].name) != null ? $e : "", bt = (Q = (Oe = (n || ln)("datePickerMonthDict")) == null ? void 0 : Oe[u.value].name) != null ? Q : "", Eo = Jt(d.value, 2, "0");
      return (n || ln)("lang") === "zh-CN" ? `${u.value}-${Eo} ${rn.slice(0, 3)}` : `${rn.slice(0, 3)}, ${bt.slice(0, 3)} ${d.value}`;
    }), M = O(() => e.type === "year" || i.value ? "year" : e.type === "month" || l.value ? "month" : e.type === "date" ? "date" : ""), j = O(() => !e.touchable || !M.value), E = O(() => {
      var ie, $e;
      const Oe = ce(`${c.value}-${u.value}-${d.value}`).day(), Q = d.value ? Jt(d.value, 2, "0") : "";
      return {
        week: `${Oe}`,
        year: (ie = c.value) != null ? ie : "",
        month: ($e = u.value) != null ? $e : "",
        date: Q
      };
    }), J = O(
      () => U.value.chooseRangeDay.map((ie) => ce(ie).format("YYYY-MM-DD"))
    ), X = O(() => c.value === f.value), te = O(() => u.value === p.value);
    let he = 0, Ie = 0, H = "", x;
    pe(
      () => e.modelValue,
      (ie) => {
        if (!(!Yt() || de(ie)))
          if (e.range) {
            if (!je(ie))
              return;
            s.value = ie.length !== 1, we(ie, e.type);
          } else if (e.multiple) {
            if (!je(ie))
              return;
            Ce(ie, e.type);
          } else
            Fe(ie);
      },
      { immediate: !0 }
    ), pe(M, qe);
    function re(ie) {
      ie === "year" ? i.value = !0 : ie === "month" ? l.value = !0 : (i.value = !1, l.value = !1);
    }
    function ve(ie) {
      if (j.value)
        return;
      const { clientX: $e, clientY: Oe } = ie.touches[0];
      he = $e, Ie = Oe;
    }
    function A(ie, $e) {
      return ie >= $e && ie > 20 ? "x" : "y";
    }
    function K(ie) {
      if (j.value)
        return;
      const { clientX: $e, clientY: Oe } = ie.touches[0], Q = $e - he, fe = Oe - Ie;
      x = A(Math.abs(Q), Math.abs(fe)), H = Q > 0 ? "prev" : "next";
    }
    function me() {
      return Uz(this, null, function* () {
        if (j.value || x !== "x")
          return;
        const ie = M.value === "year" ? D : M.value === "month" ? P : B;
        yield bn(), ie.value.forwardRef(H), qe();
      });
    }
    function Se(ie, $e) {
      const Oe = $e === "year" ? $ : $e === "month" ? b : z;
      if (Oe.value = s.value ? [ie, ie] : [Oe.value[0], ie], s.value = !s.value, s.value) {
        const fe = ce(Oe.value[0]).isAfter(Oe.value[1]) ? [Oe.value[1], Oe.value[0]] : [...Oe.value];
        S(e["onUpdate:modelValue"], fe), S(e.onChange, fe);
      }
    }
    function Ve(ie, $e) {
      const Oe = $e === "year" ? v : $e === "month" ? y : w, Q = $e === "year" ? "YYYY" : $e === "month" ? "YYYY-MM" : "YYYY-MM-DD", fe = Oe.value.map((Me) => ce(Me).format(Q)), Ee = fe.findIndex((Me) => Me === ie);
      Ee === -1 ? fe.push(ie) : fe.splice(Ee, 1), S(e["onUpdate:modelValue"], fe), S(e.onChange, fe);
    }
    function We(ie, $e) {
      return !c.value || !u.value ? !1 : X.value ? ie === "year" ? $e < Y(c.value) : ie === "month" ? $e < u.value : te.value ? $e < Y(d.value) : u.value > p.value : c.value > f.value;
    }
    function on(ie) {
      const { readonly: $e, range: Oe, multiple: Q, onChange: fe, "onUpdate:modelValue": Ee } = e;
      if (ie < 0 || $e)
        return;
      h.value = We("day", ie);
      const Me = `${f.value}-${p.value}-${ie}`, Ne = ce(Me).format("YYYY-MM-DD");
      Oe ? Se(Ne, "day") : Q ? Ve(Ne, "day") : (S(Ee, Ne), S(fe, Ne));
    }
    function gn(ie) {
      const { type: $e, readonly: Oe, range: Q, multiple: fe, onChange: Ee, onPreview: Me, "onUpdate:modelValue": Ne } = e;
      if (h.value = We("month", ie), $e === "month" && !Oe) {
        const rn = `${f.value}-${ie}`;
        Q ? Se(rn, "month") : fe ? Ve(rn, "month") : (S(Ne, rn), S(Ee, rn));
      } else
        p.value = ie, S(
          Me,
          Y(f.value),
          Y(p.value),
          $e === "date" ? Y(d.value) : void 0
        );
      l.value = !1;
    }
    function Sn(ie) {
      const { type: $e, readonly: Oe, range: Q, multiple: fe, onChange: Ee, onPreview: Me, "onUpdate:modelValue": Ne } = e;
      h.value = We("year", ie), $e === "year" && !Oe ? Q ? Se(`${ie}`, "year") : fe ? Ve(`${ie}`, "year") : (S(Ne, `${ie}`), S(Ee, `${ie}`)) : (f.value = `${ie}`, S(
        Me,
        Y(f.value),
        Y(p.value),
        $e === "date" ? Y(d.value) : void 0
      )), i.value = !1;
    }
    function hn(ie, $e) {
      const Oe = $e === "prev" ? -1 : 1;
      if (ie === "year")
        f.value = `${Y(f.value) + Oe}`;
      else {
        let Q = Y(p.value) + Oe;
        Q < 1 && (f.value = `${Y(f.value) - 1}`, Q = 12), Q > 12 && (f.value = `${Y(f.value) + 1}`, Q = 1), p.value = Rr.find((fe) => Y(fe) === Q);
      }
      S(
        e.onPreview,
        Y(f.value),
        Y(p.value),
        e.type === "date" ? Y(d.value) : void 0
      );
    }
    function Yt() {
      return (e.multiple || e.range) && !je(e.modelValue) ? (uo("DatePicker", 'type of prop "modelValue" should be an Array'), !1) : !e.multiple && !e.range && je(e.modelValue) ? (uo("DatePicker", 'type of prop "modelValue" should be a String'), !1) : !0;
    }
    function de(ie) {
      return je(ie) ? !1 : ie === "Invalid Date" ? (uo("DatePicker", '"modelValue" is an Invalid Date'), !0) : !1;
    }
    function we(ie, $e) {
      const Oe = $e === "year" ? $ : $e === "month" ? b : z, Q = $e === "year" ? "YYYY" : $e === "month" ? "YYYY-MM" : "YYYY-MM-D", fe = ie.map((Ne) => ce(Ne).format(Q)).slice(0, 2);
      if (Oe.value.some((Ne) => de(Ne)))
        return;
      Oe.value = fe;
      const Me = ce(Oe.value[0]).isAfter(Oe.value[1]);
      Oe.value.length === 2 && Me && (Oe.value = [Oe.value[1], Oe.value[0]]);
    }
    function Ce(ie, $e) {
      const Oe = $e === "year" ? v : $e === "month" ? y : w, Q = $e === "year" ? "YYYY" : $e === "month" ? "YYYY-MM" : "YYYY-MM-D", fe = Array.from(new Set(ie.map((Ee) => ce(Ee).format(Q))));
      Oe.value = fe.filter((Ee) => Ee !== "Invalid Date");
    }
    function Fe(ie) {
      const Oe = (ie ? ce(ie) : ce()).format("YYYY-MM-D");
      if (de(Oe))
        return;
      const [Q, fe, Ee] = Oe.split("-"), Me = Rr.find((Ne) => Ne === fe);
      u.value = Me, c.value = Q, d.value = Ee, p.value = Me, f.value = Q;
    }
    function qe() {
      Ie = 0, he = 0, H = "", x = void 0;
    }
    return {
      yearPanelEl: D,
      monthPanelEl: P,
      dayPanelEl: B,
      reverse: h,
      currentDate: t,
      chooseMonth: u,
      chooseYear: c,
      chooseDay: d,
      previewYear: f,
      isYearPanel: i,
      isMonthPanel: l,
      getMonthTitle: N,
      getDateTitle: T,
      getYearTitle: W,
      getPanelType: M,
      getChoose: U,
      getPreview: L,
      componentProps: I,
      slotProps: E,
      formatRange: J,
      pt: n,
      t: ln,
      n: Hz,
      classes: Yz,
      clickEl: re,
      handleTouchstart: ve,
      handleTouchmove: K,
      handleTouchend: me,
      getChooseDay: on,
      getChooseMonth: gn,
      getChooseYear: Sn,
      checkPreview: hn,
      formatElevation: pn
    };
  }
});
ag.render = Wz;
var pi = ag;
ae(pi);
le(pi, Qv);
const uD = pi;
var ts = pi, Kz = Object.defineProperty, Md = Object.getOwnPropertySymbols, qz = Object.prototype.hasOwnProperty, Xz = Object.prototype.propertyIsEnumerable, Dd = (e, n, t) => n in e ? Kz(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t, Gz = (e, n) => {
  for (var t in n || (n = {}))
    qz.call(n, t) && Dd(e, t, n[t]);
  if (Md)
    for (var t of Md(n))
      Xz.call(n, t) && Dd(e, t, n[t]);
  return e;
};
const ig = Gz({
  show: Boolean,
  width: [Number, String],
  title: String,
  message: String,
  messageAlign: {
    type: String,
    default: "left"
  },
  confirmButton: {
    type: Boolean,
    default: !0
  },
  cancelButton: {
    type: Boolean,
    default: !0
  },
  confirmButtonText: String,
  cancelButtonText: String,
  confirmButtonTextColor: String,
  cancelButtonTextColor: String,
  confirmButtonColor: String,
  cancelButtonColor: String,
  dialogClass: String,
  dialogStyle: Object,
  onBeforeClose: R(),
  onConfirm: R(),
  onCancel: R(),
  "onUpdate:show": R()
}, Le(zo, [
  "overlay",
  "overlayClass",
  "overlayStyle",
  "lockScroll",
  "closeOnClickOverlay",
  "closeOnKeyEscape",
  "teleport",
  "onOpen",
  "onClose",
  "onOpened",
  "onClosed",
  "onClickOverlay",
  "onKeyEscape",
  // internal for function call closes the dialog
  "onRouteChange"
]));
var Zz = Object.defineProperty, Id = Object.getOwnPropertySymbols, Jz = Object.prototype.hasOwnProperty, Qz = Object.prototype.propertyIsEnumerable, Ad = (e, n, t) => n in e ? Zz(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t, xz = (e, n) => {
  for (var t in n || (n = {}))
    Jz.call(n, t) && Ad(e, t, n[t]);
  if (Id)
    for (var t of Id(n))
      Qz.call(n, t) && Ad(e, t, n[t]);
  return e;
};
const { name: _z, n: eP, classes: nP } = _("dialog");
function tP(e, n) {
  const t = oe("mp-button"), o = oe("mp-popup");
  return g(), ke(o, {
    class: m(e.n("popup")),
    "mp-dialog-cover": "",
    show: e.popupShow,
    overlay: e.overlay,
    "overlay-class": e.overlayClass,
    "overlay-style": e.overlayStyle,
    "lock-scroll": e.lockScroll,
    "close-on-click-overlay": e.popupCloseOnClickOverlay,
    "close-on-key-escape": !1,
    teleport: e.teleport,
    onOpen: e.onOpen,
    onClose: e.onClose,
    onClosed: e.onClosed,
    onOpened: e.onOpened,
    onKeyEscape: e.handleKeyEscape,
    onRouteChange: e.onRouteChange,
    onClickOverlay: e.handleClickOverlay
  }, {
    default: ue(() => [
      V(
        "div",
        Ye({
          class: e.classes(e.n("$--box"), e.n(), e.dialogClass),
          style: xz({ width: e.toSizeUnit(e.width) }, e.dialogStyle)
        }, e.$attrs),
        [
          V(
            "div",
            {
              class: m(e.n("title"))
            },
            [
              F(e.$slots, "title", {}, () => {
                var r;
                return [
                  De(
                    se((r = e.title) != null ? r : (e.pt ? e.pt : e.t)("dialogTitle")),
                    1
                    /* TEXT */
                  )
                ];
              })
            ],
            2
            /* CLASS */
          ),
          V(
            "div",
            {
              class: m(e.n("message")),
              style: G({ textAlign: e.messageAlign })
            },
            [
              F(e.$slots, "default", {}, () => [
                De(
                  se(e.message),
                  1
                  /* TEXT */
                )
              ])
            ],
            6
            /* CLASS, STYLE */
          ),
          F(e.$slots, "actions", {
            slotClass: e.n("actions"),
            cancel: e.cancel,
            confirm: e.confirm
          }, () => [
            V(
              "div",
              {
                class: m(e.n("actions"))
              },
              [
                e.cancelButton ? (g(), ke(t, {
                  key: 0,
                  class: m(e.classes(e.n("button"), e.n("cancel-button"))),
                  "mp-dialog-cover": "",
                  text: "",
                  "text-color": e.cancelButtonTextColor,
                  color: e.cancelButtonColor,
                  onClick: e.cancel
                }, {
                  default: ue(() => {
                    var r;
                    return [
                      De(
                        se((r = e.cancelButtonText) != null ? r : (e.pt ? e.pt : e.t)("dialogCancelButtonText")),
                        1
                        /* TEXT */
                      )
                    ];
                  }),
                  _: 1
                  /* STABLE */
                }, 8, ["class", "text-color", "color", "onClick"])) : q("v-if", !0),
                e.confirmButton ? (g(), ke(t, {
                  key: 1,
                  class: m(e.classes(e.n("button"), e.n("confirm-button"))),
                  "mp-dialog-cover": "",
                  text: "",
                  "text-color": e.confirmButtonTextColor,
                  color: e.confirmButtonColor,
                  onClick: e.confirm
                }, {
                  default: ue(() => {
                    var r;
                    return [
                      De(
                        se((r = e.confirmButtonText) != null ? r : (e.pt ? e.pt : e.t)("dialogConfirmButtonText")),
                        1
                        /* TEXT */
                      )
                    ];
                  }),
                  _: 1
                  /* STABLE */
                }, 8, ["class", "text-color", "color", "onClick"])) : q("v-if", !0)
              ],
              2
              /* CLASS */
            )
          ])
        ],
        16
        /* FULL_PROPS */
      )
    ]),
    _: 3
    /* FORWARDED */
  }, 8, ["class", "show", "overlay", "overlay-class", "overlay-style", "lock-scroll", "close-on-click-overlay", "teleport", "onOpen", "onClose", "onClosed", "onOpened", "onKeyEscape", "onRouteChange", "onClickOverlay"]);
}
const lg = ne({
  name: _z,
  components: {
    MpPopup: It,
    MpButton: Mn
  },
  inheritAttrs: !1,
  props: ig,
  setup(e) {
    const n = k(!1), t = k(!1), { t: o } = lt();
    pe(
      () => e.show,
      (u) => {
        n.value = u;
      },
      { immediate: !0 }
    ), pe(
      () => e.closeOnClickOverlay,
      (u) => {
        if (e.onBeforeClose != null) {
          t.value = !1;
          return;
        }
        t.value = u;
      },
      { immediate: !0 }
    );
    function r() {
      return S(e["onUpdate:show"], !1);
    }
    function a() {
      const { closeOnClickOverlay: u, onClickOverlay: c, onBeforeClose: d } = e;
      if (S(c), !!u) {
        if (d != null) {
          S(d, "close", r);
          return;
        }
        S(e["onUpdate:show"], !1);
      }
    }
    function i() {
      const { onBeforeClose: u, onConfirm: c } = e;
      if (S(c), u != null) {
        S(u, "confirm", r);
        return;
      }
      S(e["onUpdate:show"], !1);
    }
    function l() {
      const { onBeforeClose: u, onCancel: c } = e;
      if (S(c), u != null) {
        S(u, "cancel", r);
        return;
      }
      S(e["onUpdate:show"], !1);
    }
    function s() {
      S(e.onKeyEscape), e.closeOnKeyEscape && l();
    }
    return {
      popupShow: n,
      popupCloseOnClickOverlay: t,
      pt: o,
      t: ln,
      n: eP,
      classes: nP,
      handleClickOverlay: a,
      confirm: i,
      cancel: l,
      toSizeUnit: Te,
      handleKeyEscape: s
    };
  }
});
lg.render = tP;
var fr = lg, oP = Object.defineProperty, rP = Object.defineProperties, aP = Object.getOwnPropertyDescriptors, Nd = Object.getOwnPropertySymbols, iP = Object.prototype.hasOwnProperty, lP = Object.prototype.propertyIsEnumerable, Rd = (e, n, t) => n in e ? oP(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t, dl = (e, n) => {
  for (var t in n || (n = {}))
    iP.call(n, t) && Rd(e, t, n[t]);
  if (Nd)
    for (var t of Nd(n))
      lP.call(n, t) && Rd(e, t, n[t]);
  return e;
}, sP = (e, n) => rP(e, aP(n));
let zt, ia = {};
function uP(e = {}) {
  return un(e) ? sP(dl({}, ia), { message: e }) : dl(dl({}, ia), e);
}
function jt(e) {
  return et() ? new Promise((n) => {
    jt.close();
    const t = uP(e), o = en(t);
    o.teleport = "body", zt = o;
    const { unmountInstance: r } = So(fr, o, {
      onConfirm: () => {
        S(o.onConfirm), n("confirm");
      },
      onCancel: () => {
        S(o.onCancel), n("cancel");
      },
      onClose: () => {
        S(o.onClose), n("close");
      },
      onClosed: () => {
        S(o.onClosed), r(), zt === o && (zt = null);
      },
      onRouteChange: () => {
        r(), zt === o && (zt = null);
      },
      "onUpdate:show": (a) => {
        o.show = a;
      }
    });
    o.show = !0;
  }) : Promise.resolve();
}
jt.setDefaultOptions = function(e) {
  ia = e;
};
jt.resetDefaultOptions = function() {
  ia = {};
};
jt.close = function() {
  if (zt != null) {
    const e = zt;
    zt = null, Ke().then(() => {
      e.show = !1;
    });
  }
};
jt.Component = fr;
ae(fr);
ae(fr, jt);
le(jt, ig);
const cD = fr;
var os = jt;
const sg = {
  inset: {
    type: [Boolean, Number, String],
    default: !1
  },
  vertical: Boolean,
  description: String,
  margin: String,
  dashed: Boolean,
  hairline: Boolean
}, { name: cP, n: dP, classes: pP } = _("divider");
function mP(e, n) {
  return g(), C(
    "div",
    {
      class: m(
        e.classes(
          e.n(),
          e.n("$--box"),
          [e.vertical, e.n("--vertical")],
          [e.withText, e.n("--with-text")],
          [e.withPresetInset, e.n("--inset")],
          [e.dashed, e.n("--dashed")],
          [e.hairline, e.n("--hairline")]
        )
      ),
      style: G(e.style),
      role: "separator"
    },
    [
      e.vertical ? q("v-if", !0) : F(e.$slots, "default", { key: 0 }, () => [
        e.description ? (g(), C(
          "span",
          {
            key: 0,
            class: m(e.n("text"))
          },
          se(e.description),
          3
          /* TEXT, CLASS */
        )) : q("v-if", !0)
      ])
    ],
    6
    /* CLASS, STYLE */
  );
}
const ug = ne({
  name: cP,
  props: sg,
  setup(e, { slots: n }) {
    const t = k(!1), o = O(() => {
      const { vertical: i, inset: l } = e;
      return !i && l === !0;
    }), r = O(() => {
      const { inset: i, vertical: l, margin: s } = e;
      if (rr(i) || l)
        return { margin: s };
      const u = Y(i), c = Math.abs(u) + (i + "").replace(u + "", "");
      return {
        margin: s,
        width: `calc(100% - ${Te(c)})`,
        left: u > 0 ? Te(c) : Te(0)
      };
    });
    yn(a), nr(a);
    function a() {
      const { description: i, vertical: l } = e;
      t.value = (n.default || i != null) && !l;
    }
    return {
      n: dP,
      classes: pP,
      withText: t,
      style: r,
      withPresetInset: o
    };
  }
});
ug.render = mP;
var mi = ug;
ae(mi);
le(mi, sg);
const dD = mi;
var rs = mi;
const cg = {
  direction: {
    type: String,
    default: "xy"
  },
  attraction: String,
  disabled: Boolean,
  boundary: {
    type: Object,
    default: () => ({
      top: 0,
      bottom: 0,
      left: 0,
      right: 0
    })
  },
  zIndex: {
    type: [Number, String],
    default: 90
  },
  teleport: {
    type: [String, Object, Boolean],
    default: "body"
  },
  onClick: R()
};
var fP = Object.defineProperty, vP = Object.defineProperties, gP = Object.getOwnPropertyDescriptors, Ld = Object.getOwnPropertySymbols, hP = Object.prototype.hasOwnProperty, bP = Object.prototype.propertyIsEnumerable, Vd = (e, n, t) => n in e ? fP(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t, Fd = (e, n) => {
  for (var t in n || (n = {}))
    hP.call(n, t) && Vd(e, t, n[t]);
  if (Ld)
    for (var t of Ld(n))
      bP.call(n, t) && Vd(e, t, n[t]);
  return e;
}, Ud = (e, n) => vP(e, gP(n));
const { name: yP, n: wP, classes: kP } = _("drag");
function $P(e, n) {
  return g(), ke(it, {
    to: e.teleport === !1 ? void 0 : e.teleport,
    disabled: e.teleportDisabled || e.teleport === !1
  }, [
    V(
      "div",
      Ye({
        ref: "drag",
        class: e.classes(e.n(), e.n("$--box"), [e.enableTransition, e.n("--transition")]),
        style: {
          "z-index": e.zIndex
        }
      }, e.getAttrs(), {
        onTouchstart: n[0] || (n[0] = (...t) => e.handleTouchstart && e.handleTouchstart(...t)),
        onTouchmove: n[1] || (n[1] = (...t) => e.handleTouchmove && e.handleTouchmove(...t)),
        onTouchend: n[2] || (n[2] = (...t) => e.handleTouchend && e.handleTouchend(...t)),
        onTouchcancel: n[3] || (n[3] = (...t) => e.handleTouchend && e.handleTouchend(...t)),
        onClick: n[4] || (n[4] = (...t) => e.handleClick && e.handleClick(...t))
      }),
      [
        F(e.$slots, "default")
      ],
      16
      /* FULL_PROPS */
    )
  ], 8, ["to", "disabled"]);
}
const dg = ne({
  name: yP,
  inheritAttrs: !1,
  props: cg,
  setup(e, { attrs: n }) {
    const t = k(null), o = k(0), r = k(0), a = k(!1), i = k(!1), { touching: l, dragging: s, moveX: u, moveY: c, startTouch: d, moveTouch: p, endTouch: f, resetTouch: h } = Co(), { disabled: v } = _t(), y = en({
      top: 0,
      bottom: 0,
      left: 0,
      right: 0
    });
    pe(() => e.boundary, L), nt(N), yn(() => {
      L(), N();
    });
    function w(M) {
      e.disabled || (d(M), D());
    }
    function $(M) {
      !l.value || e.disabled || (p(M), Re(M), i.value = !1, a.value = !0, e.direction.includes("x") && (o.value += u.value), e.direction.includes("y") && (r.value += c.value), U());
    }
    function b() {
      e.disabled || (f(), i.value = !0, I());
    }
    function z(M) {
      s.value || S(e.onClick, M);
    }
    function D() {
      const { left: M, top: j } = P();
      o.value = M, r.value = j;
    }
    function P() {
      const M = nn(t.value), j = nn(window), E = M.top - j.top, J = j.bottom - M.bottom, X = M.left - j.left, te = j.right - M.right, { width: he, height: Ie } = M, { width: H, height: x } = j;
      return {
        top: E,
        bottom: J,
        left: X,
        right: te,
        width: he,
        height: Ie,
        halfWidth: he / 2,
        halfHeight: Ie / 2,
        windowWidth: H,
        windowHeight: x
      };
    }
    function B() {
      const M = P(), j = y.left, E = M.windowWidth - y.right - M.width, J = y.top, X = M.windowHeight - y.bottom - M.height;
      return {
        minX: j,
        minY: J,
        // fallback the drag element overflows boundary
        maxX: j < E ? E : j,
        maxY: J < X ? X : J
      };
    }
    function I() {
      if (e.attraction == null)
        return;
      const { halfWidth: M, halfHeight: j, top: E, bottom: J, left: X, right: te } = P(), { minX: he, minY: Ie, maxX: H, maxY: x } = B(), re = X + M - y.left, ve = te + M - y.right, A = E + j - y.top, K = J + j - y.bottom, me = re <= ve, Se = A <= K;
      e.attraction.includes("x") && (o.value = me ? he : H), e.attraction.includes("y") && (r.value = Se ? Ie : x);
    }
    function U() {
      const { minX: M, minY: j, maxX: E, maxY: J } = B();
      o.value = $n(o.value, M, E), r.value = $n(r.value, j, J);
    }
    function L() {
      const { top: M = 0, bottom: j = 0, left: E = 0, right: J = 0 } = e.boundary;
      y.top = tn(M), y.bottom = tn(j), y.left = tn(E), y.right = tn(J);
    }
    function W() {
      var M;
      const j = (M = n.style) != null ? M : {};
      return Ud(Fd({}, n), {
        style: Ud(Fd({}, j), {
          // when the drag element is dragged for the first time, the inset should be cleared to avoid affecting translateX and translateY.
          top: a.value ? 0 : j.top,
          left: a.value ? 0 : j.left,
          right: a.value ? "auto" : j.right,
          bottom: a.value ? "auto" : j.bottom,
          transform: a.value ? `translate(${o.value}px, ${r.value}px)` : j.transform
        })
      });
    }
    function N() {
      a.value && (D(), U());
    }
    function T() {
      h(), i.value = !1, a.value = !1, o.value = 0, r.value = 0;
    }
    return {
      drag: t,
      x: o,
      y: r,
      enableTransition: i,
      dragging: s,
      teleportDisabled: v,
      n: wP,
      classes: kP,
      getAttrs: W,
      handleTouchstart: w,
      handleTouchmove: $,
      handleTouchend: b,
      handleClick: z,
      resize: N,
      reset: T
    };
  }
});
dg.render = $P;
var fi = dg;
ae(fi);
le(fi, cg);
const pD = fi;
var la = fi;
const pg = {
  type: {
    type: String,
    default: "default"
  },
  color: String,
  textColor: String,
  content: String,
  show: Boolean,
  disabled: Boolean,
  trigger: {
    type: String,
    default: "hover"
  },
  reference: [String, Object],
  placement: {
    type: String,
    default: "bottom"
  },
  strategy: {
    type: String,
    default: "absolute"
  },
  offsetX: {
    type: [Number, String],
    default: 0
  },
  offsetY: {
    type: [Number, String],
    default: 0
  },
  teleport: {
    type: [String, Object, Boolean],
    default: "body"
  },
  sameWidth: Boolean,
  closeOnClickReference: Boolean,
  closeOnKeyEscape: {
    type: Boolean,
    default: !0
  },
  onOpen: R(),
  onOpened: R(),
  onClose: R(),
  onClosed: R(),
  onClickOutside: R(),
  "onUpdate:show": R()
}, { name: CP, n: SP, classes: zP } = _("tooltip");
function PP(e, n) {
  return g(), C(
    "div",
    {
      ref: "host",
      class: m(e.classes(e.n(), e.n("$--box")))
    },
    [
      F(e.$slots, "default"),
      (g(), ke(it, {
        to: e.teleport === !1 ? void 0 : e.teleport,
        disabled: e.teleportDisabled || e.teleport === !1
      }, [
        Z(_e, {
          name: e.n(),
          onAfterEnter: e.onOpened,
          onAfterLeave: e.handleClosed,
          persisted: ""
        }, {
          default: ue(() => [
            Ue(V(
              "div",
              {
                ref: "popover",
                class: m(e.classes(e.n("tooltip"), e.n("$--box"))),
                style: G({ zIndex: e.zIndex }),
                onClick: n[0] || (n[0] = Tn(() => {
                }, ["stop"])),
                onMouseenter: n[1] || (n[1] = (...t) => e.handlePopoverMouseenter && e.handlePopoverMouseenter(...t)),
                onMouseleave: n[2] || (n[2] = (...t) => e.handlePopoverMouseleave && e.handlePopoverMouseleave(...t))
              },
              [
                V(
                  "div",
                  {
                    style: G({
                      background: e.color,
                      color: e.textColor,
                      width: e.sameWidth ? e.toSizeUnit(Math.ceil(e.referenceSize.width)) : void 0
                    }),
                    class: m(e.classes(e.n("content-container"), e.n(`--${e.type}`))),
                    role: "tooltip"
                  },
                  [
                    F(e.$slots, "content", {}, () => [
                      De(
                        se(e.content),
                        1
                        /* TEXT */
                      )
                    ])
                  ],
                  6
                  /* CLASS, STYLE */
                )
              ],
              38
              /* CLASS, STYLE, NEED_HYDRATION */
            ), [
              [xn, e.show]
            ])
          ]),
          _: 3
          /* FORWARDED */
        }, 8, ["name", "onAfterEnter", "onAfterLeave"])
      ], 8, ["to", "disabled"]))
    ],
    2
    /* CLASS */
  );
}
const mg = ne({
  name: CP,
  props: pg,
  setup(e) {
    const { disabled: n } = _t(), {
      popover: t,
      host: o,
      referenceSize: r,
      show: a,
      zIndex: i,
      handlePopoverMouseenter: l,
      handlePopoverMouseleave: s,
      handlePopoverClose: u,
      handleClosed: c,
      // expose
      open: d,
      // expose
      close: p,
      // expose
      resize: f,
      // expose
      setReference: h
    } = $f(e);
    return {
      popover: t,
      host: o,
      referenceSize: r,
      show: a,
      zIndex: i,
      teleportDisabled: n,
      toSizeUnit: Te,
      n: SP,
      classes: zP,
      handlePopoverClose: u,
      handlePopoverMouseenter: l,
      handlePopoverMouseleave: s,
      handleClosed: c,
      resize: f,
      open: d,
      close: p,
      setReference: h
    };
  }
});
mg.render = PP;
var vi = mg;
ae(vi);
le(vi, pg);
const mD = vi;
var sa = vi;
const fg = {
  expand: Boolean,
  expandTrigger: String,
  lineClamp: [Number, String],
  tooltip: {
    type: [Object, Boolean],
    default: !0
  },
  "onUpdate:expand": R()
};
var OP = Object.defineProperty, jd = Object.getOwnPropertySymbols, EP = Object.prototype.hasOwnProperty, TP = Object.prototype.propertyIsEnumerable, Hd = (e, n, t) => n in e ? OP(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t, BP = (e, n) => {
  for (var t in n || (n = {}))
    EP.call(n, t) && Hd(e, t, n[t]);
  if (jd)
    for (var t of jd(n))
      TP.call(n, t) && Hd(e, t, n[t]);
  return e;
};
const { name: MP, n: DP, classes: IP } = _("ellipsis"), AP = { key: 0 };
function NP(e, n) {
  const t = oe("mp-tooltip");
  return g(), ke(t, Ye({
    class: e.classes(e.n(), [e.lineClamp, e.n("--clamp"), e.n("--line")], [e.expandTrigger, e.n("--cursor")], [e.expanding, e.n("--expand")]),
    "mp-ellipsis-cover": "",
    style: e.rootStyles
  }, e.tooltipProps, { onClick: e.handleClick }), {
    content: ue(() => [
      F(e.$slots, "tooltip-content", {}, () => {
        var o;
        return [
          (o = e.tooltipProps) != null && o.content ? (g(), C(
            "span",
            AP,
            se(e.tooltipProps.content),
            1
            /* TEXT */
          )) : F(e.$slots, "default", { key: 1 })
        ];
      })
    ]),
    default: ue(() => [
      V("span", null, [
        F(e.$slots, "default")
      ])
    ]),
    _: 3
    /* FORWARDED */
  }, 16, ["class", "style", "onClick"]);
}
const vg = ne({
  name: MP,
  components: { MpTooltip: sa },
  props: fg,
  setup(e) {
    const n = Gn(e, "expand"), t = O(() => e.lineClamp ? { "-webkit-line-clamp": e.lineClamp } : {}), o = O(() => e.tooltip === !1 ? {
      disabled: !0
    } : e.tooltip === !0 ? {
      sameWidth: !0
    } : BP({ sameWidth: !0 }, e.tooltip));
    function r() {
      e.expandTrigger && (n.value = !n.value);
    }
    return {
      tooltipProps: o,
      expanding: n,
      rootStyles: t,
      n: DP,
      classes: IP,
      handleClick: r
    };
  }
});
vg.render = NP;
var gi = vg;
ae(gi);
le(gi, fg);
const fD = gi;
var as = gi;
const gg = {
  /** 空状态描述文字 */
  description: {
    type: String,
    default: ""
  },
  /** 空状态图片/图标尺寸，可选值为 `xs` `sm` `md` `lg` `xl`，或具体数值 */
  imageSize: {
    type: [String, Number],
    default: "md"
  },
  /** 自定义图片 URL，会覆盖默认图标 */
  imageSrc: {
    type: String
  },
  /** 是否显示图标 */
  showIcon: {
    type: Boolean,
    default: !0
  },
  /** 是否显示描述 */
  showDescription: {
    type: Boolean,
    default: !0
  },
  /** 点击操作回调 */
  onClick: R()
}, { name: RP, n: LP, classes: VP } = _("empty"), Yd = {
  xs: "80px",
  sm: "100px",
  md: "120px",
  lg: "140px",
  xl: "160px"
}, FP = ["src", "alt"], UP = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 48 48",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
};
function jP(e, n) {
  return g(), C(
    "div",
    Ye({
      class: e.classes(e.n(), e.n("$--box"))
    }, e.$attrs, {
      onClick: n[0] || (n[0] = Tn((...t) => e.handleClick && e.handleClick(...t), ["stop"]))
    }),
    [
      e.showIcon ? (g(), C(
        "div",
        {
          key: 0,
          class: m(e.n("image")),
          style: G(e.imageStyle)
        },
        [
          F(e.$slots, "image", {}, () => [
            e.imageSrc ? (g(), C("img", {
              key: 0,
              src: e.imageSrc,
              alt: e.description
            }, null, 8, FP)) : (g(), C("svg", UP, n[1] || (n[1] = [
              V(
                "path",
                { d: "M24 5v6m7 1 4-4m-18 4-4-4m28.5 22H28s-1 3-4 3-4-3-4-3H6.5M40 41H8a2 2 0 0 1-2-2v-8.46a2 2 0 0 1 .272-1.007l6.15-10.54A2 2 0 0 1 14.148 18H33.85a2 2 0 0 1 1.728.992l6.149 10.541A2 2 0 0 1 42 30.541V39a2 2 0 0 1-2 2Z" },
                null,
                -1
                /* HOISTED */
              )
            ])))
          ])
        ],
        6
        /* CLASS, STYLE */
      )) : q("v-if", !0),
      e.showDescription && (e.description || e.$slots.default) ? (g(), C(
        "div",
        {
          key: 1,
          class: m(e.n("description"))
        },
        [
          F(e.$slots, "default", {}, () => [
            De(
              se(e.description),
              1
              /* TEXT */
            )
          ])
        ],
        2
        /* CLASS */
      )) : q("v-if", !0),
      e.$slots.extra ? (g(), C(
        "div",
        {
          key: 2,
          class: m(e.n("extra"))
        },
        [
          F(e.$slots, "extra")
        ],
        2
        /* CLASS */
      )) : q("v-if", !0)
    ],
    16
    /* FULL_PROPS */
  );
}
const hg = ne({
  name: RP,
  props: gg,
  setup(e) {
    return {
      imageStyle: O(() => {
        const { imageSize: o } = e;
        if (o in Yd) {
          const a = Yd[o];
          return { width: a, height: a };
        }
        const r = zn(o) ? `${o}px` : o;
        return { width: r, height: r };
      }),
      handleClick: (o) => {
        var r;
        (r = e.onClick) == null || r.call(e, o);
      },
      n: LP,
      classes: VP
    };
  }
});
hg.render = jP;
var hi = hg;
ae(hi);
le(hi, gg);
const vD = hi;
var is = hi;
const bg = {
  active: Boolean,
  show: {
    type: Boolean,
    default: !0
  },
  drag: {
    type: [Object, Boolean],
    default: !1
  },
  type: {
    type: String,
    default: "primary"
  },
  position: {
    type: String,
    default: "right-bottom"
  },
  direction: {
    type: String,
    default: "top"
  },
  trigger: {
    type: String,
    default: "click"
  },
  disabled: Boolean,
  color: String,
  inactiveIcon: {
    type: String,
    default: "plus"
  },
  activeIcon: {
    type: String,
    default: "window-close"
  },
  inactiveIconSize: Le(dn, "size"),
  activeIconSize: Le(dn, "size"),
  inactiveIconNamespace: Le(dn, "namespace"),
  activeIconNamespace: Le(dn, "namespace"),
  fixed: {
    type: Boolean,
    default: !0
  },
  zIndex: {
    type: [Number, String],
    default: 90
  },
  top: [Number, String],
  bottom: [Number, String],
  left: [Number, String],
  right: [Number, String],
  elevation: {
    type: [Boolean, Number, String],
    default: !0
  },
  safeArea: Boolean,
  teleport: {
    type: [String, Object, Boolean],
    default: "body"
  },
  onClick: R(),
  onOpen: R(),
  onOpened: R(),
  onClose: R(),
  onClosed: R(),
  "onUpdate:active": R()
}, {
  name: HP,
  classes: pl,
  n: Nn
} = _("fab");
var bi = ne({
  name: HP,
  inheritAttrs: !1,
  props: bg,
  setup(e, {
    slots: n,
    attrs: t
  }) {
    const o = Gn(e, "active"), r = k(null), a = k(null);
    pe(() => e.trigger, () => {
      o.value = !1;
    }), pe(() => e.disabled, () => {
      o.value = !1;
    }), pe(() => [e.position, e.fixed, e.top, e.bottom, e.left, e.right], () => {
      var c;
      (c = a.value) == null || c.reset();
    }), bm(r, "click", s);
    function i(c, d, p) {
      if (c.stopPropagation(), !(e.trigger !== "click" || e.disabled)) {
        if (p === 0) {
          S(e.onClick, o.value, c);
          return;
        }
        o.value = d, S(e.onClick, o.value, c), S(o.value ? e.onOpen : e.onClose);
      }
    }
    function l(c, d) {
      e.trigger !== "hover" || e.disabled || d === 0 || (o.value = c, S(o.value ? e.onOpen : e.onClose));
    }
    function s() {
      e.trigger !== "click" || e.disabled || o.value !== !1 && (o.value = !1, S(e.onClose));
    }
    function u() {
      return n.trigger ? e.show ? n.trigger({
        active: o.value
      }) : null : Ue(Z(Mn, {
        "mp-fab-cover": !0,
        class: Nn("trigger"),
        type: e.type,
        color: e.color,
        disabled: e.disabled,
        elevation: e.elevation,
        iconContainer: !0
      }, {
        default: () => [Z(Qe, {
          "mp-fab-cover": !0,
          class: pl([o.value, Nn("trigger-active-icon"), Nn("trigger-inactive-icon")]),
          name: o.value ? e.activeIcon : e.inactiveIcon,
          size: o.value ? e.activeIconSize : e.inactiveIconSize,
          namespace: o.value ? e.activeIconNamespace : e.inactiveIconNamespace,
          transition: 200,
          animationClass: Nn("--trigger-icon-animation")
        }, null)]
      }), [[xn, e.show]]);
    }
    return () => {
      var c;
      const d = wm((c = S(n.default)) != null ? c : []), p = rr(e.drag) ? {} : e.drag;
      return Z(la, Ye({
        ref: a,
        class: pl(Nn(`--position-${e.position}`), [!e.fixed, Nn("--absolute")]),
        style: {
          top: Te(e.top),
          bottom: Te(e.bottom),
          left: Te(e.left),
          right: Te(e.right)
        },
        zIndex: e.zIndex,
        teleport: e.teleport,
        disabled: e.disabled || !e.drag || !e.fixed,
        direction: p.direction,
        attraction: p.attraction,
        boundary: p.boundary,
        onClick: (f) => i(f, !o.value, d.length)
      }, t), {
        default: () => [Z("div", {
          class: pl(Nn(), Nn(`--direction-${e.direction}`), [e.safeArea, Nn("--safe-area")]),
          ref: r,
          onMouseleave: () => l(!1, d.length),
          onMouseenter: () => l(!0, d.length)
        }, [Z(_e, {
          name: Nn("--active-transition")
        }, {
          default: () => [u()]
        }), Z(_e, {
          name: Nn(`--actions-transition-${e.direction}`),
          onAfterEnter: e.onOpened,
          onAfterLeave: e.onClosed
        }, {
          default: () => [Ue(Z("div", {
            class: Nn("actions"),
            onClick: (f) => f.stopPropagation()
          }, [d.map((f) => {
            var h;
            return Z("div", {
              class: Nn("action"),
              key: (h = f.key) != null ? h : void 0
            }, [f]);
          })]), [[xn, e.show && o.value && d.length]])]
        })])]
      });
    };
  }
});
ae(bi);
le(bi, bg);
const gD = bi;
var ls = bi;
const yg = {
  anchor: Number,
  anchors: Array,
  contentDraggable: {
    type: Boolean,
    default: !0
  },
  duration: {
    type: [Number, String],
    default: 300
  },
  elevation: {
    type: [Boolean, Number, String],
    default: !0
  },
  teleport: {
    type: [String, Object, Boolean],
    default: "body"
  },
  safeArea: Boolean,
  "onUpdate:anchor": R(),
  onAnchorChange: R()
}, { name: YP, n: WP, classes: KP } = _("floating-panel"), Wd = 100, Kd = 0.2;
function qP(e, n) {
  return g(), ke(it, {
    to: e.teleport === !1 ? void 0 : e.teleport,
    disabled: e.teleportDisabled || e.teleport === !1
  }, [
    V(
      "div",
      {
        class: m(e.classes(e.n(), [e.safeArea, e.n("--safe-area")], e.formatElevation(e.elevation, 3))),
        style: G({
          height: `${e.toSizeUnit(e.maxAnchor)}`,
          transform: `translateY(calc(100% - ${e.toSizeUnit(e.visibleHeight)}))`,
          transition: e.touching ? "none" : `transform ${e.toNumber(
            e.duration
          )}ms var(--mp-floating-panel-transition-timing-function), background-color 0.25s`
        }),
        onTouchstart: n[0] || (n[0] = (...t) => e.handleTouchstart && e.handleTouchstart(...t)),
        onTouchmove: n[1] || (n[1] = (...t) => e.handleTouchmove && e.handleTouchmove(...t)),
        onTouchend: n[2] || (n[2] = (...t) => e.handleTouchend && e.handleTouchend(...t)),
        onTouchcancel: n[3] || (n[3] = (...t) => e.handleTouchend && e.handleTouchend(...t))
      },
      [
        F(e.$slots, "header", {}, () => [
          V(
            "div",
            {
              class: m(e.n("header"))
            },
            [
              V(
                "div",
                {
                  class: m(e.n("header-toolbar"))
                },
                null,
                2
                /* CLASS */
              )
            ],
            2
            /* CLASS */
          )
        ]),
        V(
          "div",
          {
            ref: "contentRef",
            class: m(e.n("content"))
          },
          [
            F(e.$slots, "default")
          ],
          2
          /* CLASS */
        )
      ],
      38
      /* CLASS, STYLE, NEED_HYDRATION */
    )
  ], 8, ["to", "disabled"]);
}
const wg = ne({
  name: YP,
  props: yg,
  setup(e) {
    const n = k(0), t = k(null), { height: o } = U0(), r = O(() => o.value * 0.6), a = Gn(e, "anchor", { defaultValue: Wd }), i = O(() => {
      const U = [Wd, r.value], { anchors: L } = e;
      return Wn(L) ? U : L;
    }), l = O(() => Math.min(...i.value)), s = O(() => Math.max(...i.value)), { disabled: u } = _t(), { deltaY: c, touching: d, startTouch: p, moveTouch: f, endTouch: h, isReachTop: v, isReachBottom: y } = Co();
    let w;
    sr(() => d.value), pe(() => a.value, $, { immediate: !0 }), pe(
      () => i.value,
      () => {
        $(a.value);
      },
      { immediate: !0 }
    );
    function $(U) {
      P(U ?? l.value);
    }
    function b(U) {
      p(U), w = n.value;
    }
    function z(U) {
      var L;
      f(U);
      const W = U.target, N = t.value === W || ((L = t.value) == null ? void 0 : L.contains(W));
      if (N && !e.contentDraggable)
        return;
      if (N && e.contentDraggable && n.value >= s.value && !v(t.value)) {
        y(t.value) && Re(U);
        return;
      }
      const T = w - c.value;
      P(B(T)), Re(U);
    }
    function D() {
      h();
      const U = a.value;
      P(n.value), a.value = n.value, a.value !== U && S(e.onAnchorChange, n.value);
    }
    function P(U) {
      n.value = d.value ? U : I(U);
    }
    function B(U) {
      if (U > s.value) {
        const L = U - s.value;
        return s.value + L * Kd;
      }
      if (U < l.value) {
        const L = l.value - U;
        return l.value - L * Kd;
      }
      return U;
    }
    function I(U) {
      if (i.value.includes(U))
        return U;
      let L = 1 / 0, W = 0;
      return i.value.forEach((N) => {
        const T = Math.abs(N - U);
        T < L && (L = T, W = N);
      }), W;
    }
    return {
      contentRef: t,
      teleportDisabled: u,
      touching: d,
      minAnchor: l,
      maxAnchor: s,
      visibleHeight: n,
      n: WP,
      classes: KP,
      toSizeUnit: Te,
      toNumber: Y,
      formatElevation: pn,
      handleTouchstart: b,
      handleTouchmove: z,
      handleTouchend: D
    };
  }
});
wg.render = qP;
var yi = wg;
ae(yi);
le(yi, yg);
const hD = yi;
var ss = yi;
const kg = {
  disabled: Boolean,
  readonly: Boolean,
  scrollToError: String,
  scrollToErrorOffsetY: {
    type: [String, Number],
    default: 0
  },
  onSubmit: R(),
  onReset: R()
};
var qd = (e, n, t) => new Promise((o, r) => {
  var a = (s) => {
    try {
      l(t.next(s));
    } catch (u) {
      r(u);
    }
  }, i = (s) => {
    try {
      l(t.throw(s));
    } catch (u) {
      r(u);
    }
  }, l = (s) => s.done ? o(s.value) : Promise.resolve(s.value).then(a, i);
  l((t = t.apply(e, n)).next());
});
const { name: XP, n: GP } = _("form");
function ZP(e, n) {
  return g(), C(
    "form",
    {
      class: m(e.n()),
      onSubmit: n[0] || (n[0] = (...t) => e.handleSubmit && e.handleSubmit(...t)),
      onReset: n[1] || (n[1] = (...t) => e.handleReset && e.handleReset(...t))
    },
    [
      F(e.$slots, "default")
    ],
    34
    /* CLASS, NEED_HYDRATION */
  );
}
const $g = ne({
  name: XP,
  props: kg,
  setup(e) {
    const n = O(() => e.disabled), t = O(() => e.readonly), { formItems: o, bindFormItems: r } = M1();
    r({
      disabled: n,
      readonly: t
    });
    function i(p) {
      setTimeout(() => {
        const f = At(p), h = f === window ? 0 : uc(f), v = uc(p) - h - tn(e.scrollToErrorOffsetY);
        Fo(f, {
          top: v,
          animation: Pl
        });
      }, 300);
    }
    function l(p) {
      return qd(this, null, function* () {
        Re(p);
        const f = yield u();
        S(e.onSubmit, f);
      });
    }
    function s(p) {
      Re(p), c(), S(e.onReset);
    }
    function u() {
      return qd(this, null, function* () {
        var p;
        const f = yield Promise.all(o.map(({ validate: h }) => h()));
        if (e.scrollToError) {
          const [, h] = _p(f, (y) => y === !1, e.scrollToError), v = h > -1;
          if (v) {
            const y = (p = o[h].instance.proxy) == null ? void 0 : p.$el;
            i(y);
          }
          return !v;
        }
        return f.every((h) => h === !0);
      });
    }
    function c() {
      return o.forEach(({ reset: p }) => p());
    }
    function d() {
      return o.forEach(({ resetValidation: p }) => p());
    }
    return {
      n: GP,
      handleSubmit: l,
      handleReset: s,
      validate: u,
      reset: c,
      resetValidation: d
    };
  }
});
$g.render = ZP;
var Po = $g;
Po.useValidation = Un;
Po.useForm = jn;
ae(Po);
le(Po, kg);
const bD = Po;
var us = Po;
const Cg = {
  highlighter: Object,
  theme: String,
  tag: {
    type: String,
    default: "div"
  }
}, { name: JP, n: QP } = _("highlighter-provider"), xP = ne({
  name: JP,
  props: Cg,
  setup(e, { slots: n }) {
    const t = O(() => e.highlighter), o = O(() => e.theme);
    return CS({ highlighter: t, theme: o }), () => er(
      e.tag,
      {
        class: QP()
      },
      S(n.default)
    );
  }
});
var wi = xP;
ae(wi);
le(wi, Cg);
const yD = wi;
var cs = wi;
const Sg = {
  src: String,
  fit: {
    type: String,
    default: "fill"
  },
  position: {
    type: String,
    default: "50% 50%"
  },
  alt: String,
  title: String,
  referrerpolicy: String,
  width: [String, Number],
  height: [String, Number],
  radius: {
    type: [String, Number],
    default: 0
  },
  loading: String,
  error: String,
  lazy: Boolean,
  ripple: Boolean,
  block: {
    type: Boolean,
    default: !0
  },
  onClick: R(),
  onLoad: R(),
  onError: R()
}, { name: _P, n: e4, classes: n4 } = _("image"), t4 = ["alt", "title", "referrerpolicy", "lazy-loading", "lazy-error"], o4 = ["alt", "title", "referrerpolicy", "src"];
function r4(e, n) {
  var t;
  const o = Je("lazy"), r = Je("ripple");
  return Ue((g(), C(
    "div",
    {
      class: m(e.classes(e.n(), e.n("$--box"), [!e.block, e.n("$--inline-block")])),
      style: G({
        width: e.toSizeUnit(e.width),
        height: e.toSizeUnit(e.height),
        borderRadius: e.toSizeUnit(e.radius)
      })
    },
    [
      e.lazy && !e.showErrorSlot ? Ue((g(), C("img", {
        key: 0,
        role: "img",
        class: m(e.n("image")),
        alt: e.alt,
        title: e.title,
        referrerpolicy: e.referrerpolicy,
        "lazy-loading": e.loading,
        "lazy-error": e.error,
        style: G({ objectFit: e.fit, objectPosition: e.position }),
        onLoad: n[0] || (n[0] = (...a) => e.handleLoad && e.handleLoad(...a)),
        onClick: n[1] || (n[1] = (...a) => e.handleClick && e.handleClick(...a))
      }, null, 46, t4)), [
        [o, (t = e.src) != null ? t : ""]
      ]) : q("v-if", !0),
      !e.lazy && !e.showErrorSlot ? (g(), C("img", {
        key: 1,
        role: "img",
        class: m(e.n("image")),
        alt: e.alt,
        title: e.title,
        referrerpolicy: e.referrerpolicy,
        style: G({ objectFit: e.fit, objectPosition: e.position }),
        src: e.src,
        onLoad: n[2] || (n[2] = (...a) => e.handleLoad && e.handleLoad(...a)),
        onError: n[3] || (n[3] = (...a) => e.handleError && e.handleError(...a)),
        onClick: n[4] || (n[4] = (...a) => e.handleClick && e.handleClick(...a))
      }, null, 46, o4)) : q("v-if", !0),
      e.showErrorSlot ? F(e.$slots, "error", { key: 2 }) : q("v-if", !0)
    ],
    6
    /* CLASS, STYLE */
  )), [
    [r, { disabled: !e.ripple }]
  ]);
}
const zg = ne({
  name: _P,
  directives: {
    Lazy: qo,
    Ripple: an
  },
  props: Sg,
  setup(e, { slots: n }) {
    const t = k(!1);
    pe(
      () => e.src,
      () => {
        t.value = !1;
      }
    );
    function o(i) {
      t.value = !!n.error, S(e.onError, i);
    }
    function r(i) {
      const l = i.currentTarget;
      if (e.lazy) {
        if (l._lazy.state === "success") {
          S(e.onLoad, i);
          return;
        }
        l._lazy.state === "error" && o(i);
      } else
        S(e.onLoad, i);
    }
    function a(i) {
      S(e.onClick, i);
    }
    return {
      showErrorSlot: t,
      n: e4,
      classes: n4,
      toSizeUnit: Te,
      handleLoad: r,
      handleError: o,
      handleClick: a
    };
  }
});
zg.render = r4;
var ki = zg;
ae(ki);
le(ki, Sg);
const wD = ki;
var ds = ki, a4 = Object.defineProperty, Xd = Object.getOwnPropertySymbols, i4 = Object.prototype.hasOwnProperty, l4 = Object.prototype.propertyIsEnumerable, Gd = (e, n, t) => n in e ? a4(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t, Zd = (e, n) => {
  for (var t in n || (n = {}))
    i4.call(n, t) && Gd(e, t, n[t]);
  if (Xd)
    for (var t of Xd(n))
      l4.call(n, t) && Gd(e, t, n[t]);
  return e;
};
const Pg = Zd(Zd({
  show: Boolean,
  imagePreventDefault: Boolean,
  images: {
    type: Array,
    default: () => []
  },
  initialIndex: {
    type: [String, Number],
    default: 0
  },
  zoom: {
    type: [String, Number],
    default: 2
  },
  closeable: Boolean,
  "onUpdate:show": R(),
  onLongPress: R()
}, Le(Tu, ["loop", "indicator", "onChange"])), Le(zo, [
  "lockScroll",
  "teleport",
  "closeOnKeyEscape",
  "onOpen",
  "onClose",
  "onOpened",
  "onClosed",
  "onKeyEscape",
  // internal for function call closes the dialog
  "onRouteChange"
])), { name: s4, n: Jd, classes: u4 } = _("image-preview"), ml = 12, Qd = 200, c4 = 350, xd = 200, d4 = 500, Pr = 1, p4 = ["onTouchstart"], m4 = ["src", "alt"];
function f4(e, n) {
  const t = oe("mp-carousel-item"), o = oe("mp-carousel"), r = oe("mp-icon"), a = oe("mp-popup");
  return g(), ke(a, {
    show: e.show,
    "onUpdate:show": n[3] || (n[3] = (i) => e.show = i),
    "mp-image-preview-cover": "",
    class: m(e.n("popup")),
    transition: e.n("$-fade"),
    overlay: !1,
    "close-on-click-overlay": !1,
    "close-on-key-escape": e.closeOnKeyEscape,
    "lock-scroll": e.lockScroll,
    teleport: e.teleport,
    onOpen: e.onOpen,
    onClose: e.onClose,
    onClosed: e.onClosed,
    onOpened: e.onOpened,
    onKeyEscape: e.onKeyEscape,
    onRouteChange: e.onRouteChange
  }, {
    default: ue(() => [
      Z(o, Ye({
        ref: "carouselRef",
        class: e.n("swipe"),
        "mp-image-preview-cover": "",
        touchable: e.canSwipe,
        indicator: e.indicator && e.images.length > 1,
        "initial-index": e.toNumber(e.initialIndex),
        loop: e.loop
      }, e.$attrs, { onChange: e.onChange }), {
        default: ue(() => [
          (g(!0), C(
            Ae,
            null,
            Xe(e.images, (i, l) => (g(), ke(t, {
              key: i,
              class: m(e.n("swipe-item")),
              "mp-image-preview-cover": ""
            }, {
              default: ue(() => [
                V("div", {
                  class: m(e.n("zoom-container")),
                  style: G({
                    transform: `scale(${e.scale}) translate(${e.translateX}px, ${e.translateY}px)`,
                    transitionTimingFunction: e.transitionTimingFunction,
                    transitionDuration: e.transitionDuration
                  }),
                  onTouchstart: (s) => e.handleTouchstart(s, l),
                  onTouchmove: n[0] || (n[0] = (...s) => e.handleTouchmove && e.handleTouchmove(...s)),
                  onTouchend: n[1] || (n[1] = (...s) => e.handleTouchend && e.handleTouchend(...s)),
                  onTouchcancel: n[2] || (n[2] = (...s) => e.handleTouchcancel && e.handleTouchcancel(...s))
                }, [
                  V("img", {
                    role: "img",
                    class: m(e.classes(e.n("image"), [e.isPreventDefault, e.n("--prevent")])),
                    src: i,
                    alt: i
                  }, null, 10, m4)
                ], 46, p4)
              ]),
              _: 2
              /* DYNAMIC */
            }, 1032, ["class"]))),
            128
            /* KEYED_FRAGMENT */
          ))
        ]),
        indicator: ue(({ index: i, length: l }) => [
          F(e.$slots, "indicator", {
            index: i,
            length: l
          }, () => [
            e.indicator && e.images.length > 1 ? (g(), C(
              "div",
              {
                key: 0,
                class: m(e.n("indicators"))
              },
              se(i + 1) + " / " + se(l),
              3
              /* TEXT, CLASS */
            )) : q("v-if", !0)
          ])
        ]),
        _: 3
        /* FORWARDED */
      }, 16, ["class", "touchable", "indicator", "initial-index", "loop", "onChange"]),
      F(e.$slots, "close-icon", {}, () => [
        e.closeable ? (g(), ke(r, {
          key: 0,
          class: m(e.n("close-icon")),
          name: "close-circle",
          "mp-image-preview-cover": "",
          onClick: e.close
        }, null, 8, ["class", "onClick"])) : q("v-if", !0)
      ]),
      e.$slots.extra ? (g(), C(
        "div",
        {
          key: 0,
          class: m(e.n("extra"))
        },
        [
          F(e.$slots, "extra")
        ],
        2
        /* CLASS */
      )) : q("v-if", !0)
    ]),
    _: 3
    /* FORWARDED */
  }, 8, ["show", "class", "transition", "close-on-key-escape", "lock-scroll", "teleport", "onOpen", "onClose", "onClosed", "onOpened", "onKeyEscape", "onRouteChange"]);
}
const Og = ne({
  name: s4,
  components: {
    MpCarousel: Xo,
    MpCarouselItem: Go,
    MpPopup: It,
    MpIcon: Qe
  },
  inheritAttrs: !1,
  props: Pg,
  setup(e) {
    const n = Gn(e, "show"), t = k(1), o = k(0), r = k(0), a = k(), i = k(), l = k(!0), s = k(null), { moveX: u, moveY: c, distance: d, startTime: p, startTouch: f, moveTouch: h, endTouch: v } = Co(), y = O(() => {
      const { imagePreventDefault: H, show: x } = e;
      return x && H;
    });
    let w = null, $ = null, b = !1;
    const z = {
      start: null,
      prev: null
    };
    He(() => document, "contextmenu", J);
    function D(H) {
      t.value = Y(H), l.value = !1, z.prev = null, window.setTimeout(() => {
        a.value = "linear", i.value = "0s";
      }, xd);
    }
    function P() {
      t.value = 1, o.value = 0, r.value = 0, l.value = !0, z.prev = null, a.value = void 0, i.value = void 0;
    }
    function B(H) {
      return z.prev ? d.value <= ml && performance.now() - p.value <= Qd && z.prev === H : !1;
    }
    function I(H) {
      return !H || !z.start || !z.prev ? !1 : d.value <= ml && performance.now() - p.value < c4 && (H === z.start || H.parentNode === z.start);
    }
    function U() {
      v(), window.clearTimeout($), b = !1, z.start = null;
    }
    function L(H) {
      if (v(), window.clearTimeout($), b) {
        b = !1;
        return;
      }
      const x = I(H.target);
      w = window.setTimeout(() => {
        x && E(), z.start = null;
      }, Qd);
    }
    function W(H, x) {
      window.clearTimeout(w), window.clearTimeout($);
      const re = H.currentTarget;
      if (z.start = re, $ = window.setTimeout(() => {
        b = !0, S(e.onLongPress, x);
      }, d4), B(re)) {
        t.value > Pr ? P() : D(e.zoom);
        return;
      }
      f(H), z.prev = re;
    }
    function N(H) {
      const { offsetWidth: x, offsetHeight: re } = H, { naturalWidth: ve, naturalHeight: A } = H.querySelector(`.${Jd("image")}`);
      return {
        width: x,
        height: re,
        imageRadio: A / ve,
        rootRadio: re / x,
        zoom: Y(e.zoom)
      };
    }
    function T(H) {
      const { zoom: x, imageRadio: re, rootRadio: ve, width: A, height: K } = N(H);
      if (!re)
        return 0;
      const me = re > ve ? K / re : A;
      return Math.max(0, (x * me - A) / 2) / x;
    }
    function M(H) {
      const { zoom: x, imageRadio: re, rootRadio: ve, width: A, height: K } = N(H);
      if (!re)
        return 0;
      const me = re > ve ? K : A * re;
      return Math.max(0, (x * me - K) / 2) / x;
    }
    function j(H) {
      if (!z.prev)
        return;
      h(H);
      const x = H.currentTarget;
      if (d.value > ml && window.clearTimeout($), t.value > Pr) {
        const re = T(x), ve = M(x);
        o.value = $n(o.value + u.value, -re, re), r.value = $n(r.value + c.value, -ve, ve);
      }
      z.prev = x;
    }
    function E() {
      if (t.value > Pr) {
        P(), setTimeout(() => S(e["onUpdate:show"], !1), xd);
        return;
      }
      S(e["onUpdate:show"], !1);
    }
    function J(H) {
      y.value && Re(H);
    }
    function X(H) {
      var x;
      (x = s.value) == null || x.prev(H);
    }
    function te(H) {
      var x;
      (x = s.value) == null || x.next(H);
    }
    function he(H, x) {
      var re;
      (re = s.value) == null || re.to(H, x);
    }
    function Ie(H) {
      H <= Pr ? P() : D(H);
    }
    return {
      carouselRef: s,
      isPreventDefault: y,
      show: n,
      scale: t,
      translateX: o,
      translateY: r,
      canSwipe: l,
      transitionTimingFunction: a,
      transitionDuration: i,
      n: Jd,
      classes: u4,
      toNumber: Y,
      handleTouchstart: W,
      handleTouchmove: j,
      handleTouchend: L,
      handleTouchcancel: U,
      close: E,
      prev: X,
      next: te,
      to: he,
      zoom: Ie
    };
  }
});
Og.render = f4;
var vr = Og, v4 = Object.defineProperty, g4 = Object.defineProperties, h4 = Object.getOwnPropertyDescriptors, _d = Object.getOwnPropertySymbols, b4 = Object.prototype.hasOwnProperty, y4 = Object.prototype.propertyIsEnumerable, ep = (e, n, t) => n in e ? v4(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t, Or = (e, n) => {
  for (var t in n || (n = {}))
    b4.call(n, t) && ep(e, t, n[t]);
  if (_d)
    for (var t of _d(n))
      y4.call(n, t) && ep(e, t, n[t]);
  return e;
}, np = (e, n) => g4(e, h4(n));
let Pt, Lo = {};
function w4(e = {}) {
  return un(e) ? np(Or({}, Lo), { images: [e] }) : je(e) ? np(Or({}, Lo), { images: e }) : Or(Or({}, Lo), e);
}
function Ht(e) {
  if (!et())
    return;
  Ht.close();
  const n = w4(e), t = en(n);
  t.teleport = "body", Pt = t;
  const { unmountInstance: o } = So(vr, t, {
    onClose: () => S(t.onClose),
    onClosed: () => {
      S(t.onClosed), o(), Pt === t && (Pt = null);
    },
    onRouteChange: () => {
      o(), Pt === t && (Pt = null);
    },
    "onUpdate:show": (r) => {
      t.show = r;
    }
  });
  t.show = !0;
}
Ht.close = () => {
  if (Pt != null) {
    const e = Pt;
    Pt = null, Ke().then(() => {
      e.show = !1;
    });
  }
};
Ht.setDefaultOptions = (e) => {
  Lo = e;
};
Ht.resetDefaultOptions = () => {
  Lo = {};
};
Ht.Component = vr;
ae(vr);
ae(vr, Ht);
le(Ht, Pg);
const kD = vr;
var Jo = Ht;
const Eg = {
  index: [Number, String]
}, Tg = Symbol("INDEX_BAR_BIND_INDEX_ANCHOR_KEY");
function k4() {
  const { bindChildren: e, length: n, childProviders: t } = kn(
    Tg
  );
  return {
    length: n,
    indexAnchors: t,
    bindIndexAnchors: e
  };
}
function $4() {
  const { parentProvider: e, index: n, bindParent: t } = wn(
    Tg
  );
  return Xn(!!t, "IndexAnchor", 'You should use this component in "IndexBar"'), {
    index: n,
    indexBar: e,
    bindIndexBar: t
  };
}
const { name: C4, n: S4, classes: z4 } = _("index-anchor");
function P4(e, n) {
  return g(), ke(xt(e.sticky ? e.n("$-sticky") : e.Transition), {
    ref: "anchorEl",
    "offset-top": e.sticky ? e.stickyOffsetTop : null,
    "z-index": e.sticky ? e.zIndex : null,
    disabled: e.disabled && !e.cssMode,
    "css-mode": e.cssMode
  }, {
    default: ue(() => [
      V(
        "div",
        Ye({
          class: e.n()
        }, e.$attrs),
        [
          F(e.$slots, "default", {}, () => [
            De(
              se(e.name),
              1
              /* TEXT */
            )
          ])
        ],
        16
        /* FULL_PROPS */
      )
    ]),
    _: 3
    /* FORWARDED */
  }, 8, ["offset-top", "z-index", "disabled", "css-mode"]);
}
const Bg = ne({
  name: C4,
  components: { MpSticky: ko },
  inheritAttrs: !1,
  props: Eg,
  setup(e) {
    const n = k(!1), t = O(() => e.index), o = k(null), { index: r, indexBar: a, bindIndexBar: i } = $4(), { active: l, sticky: s, cssMode: u, stickyOffsetTop: c, zIndex: d } = a;
    i({
      index: r,
      name: t,
      setDisabled: h,
      getOffsetTop: f
    });
    function f() {
      return o.value ? o.value.$el ? o.value.$el.offsetTop : o.value.offsetTop : 0;
    }
    function h(v) {
      n.value = v;
    }
    return {
      n: S4,
      classes: z4,
      name: t,
      anchorEl: o,
      active: l,
      sticky: s,
      zIndex: d,
      disabled: n,
      cssMode: u,
      stickyOffsetTop: c,
      Transition: _e
    };
  }
});
Bg.render = P4;
var $i = Bg;
ae($i);
le($i, Eg);
const $D = $i;
var ps = $i;
const Mg = {
  sticky: {
    type: Boolean,
    default: !0
  },
  stickyOffsetTop: {
    type: [String, Number],
    default: 0
  },
  stickyCssMode: Boolean,
  hideList: Boolean,
  zIndex: {
    type: [Number, String],
    default: 1
  },
  highlightColor: String,
  duration: {
    type: [Number, String],
    default: 0
  },
  onClick: R(),
  onChange: R()
};
var tp = (e, n, t) => new Promise((o, r) => {
  var a = (s) => {
    try {
      l(t.next(s));
    } catch (u) {
      r(u);
    }
  }, i = (s) => {
    try {
      l(t.throw(s));
    } catch (u) {
      r(u);
    }
  }, l = (s) => s.done ? o(s.value) : Promise.resolve(s.value).then(a, i);
  l((t = t.apply(e, n)).next());
});
const { name: O4, n: E4, classes: T4 } = _("index-bar"), B4 = ["onClick"];
function M4(e, n) {
  return g(), C(
    "div",
    {
      ref: "barEl",
      class: m(e.n())
    },
    [
      F(e.$slots, "default"),
      V(
        "ul",
        {
          class: m(e.n("anchor-list")),
          style: G({ zIndex: e.toNumber(e.zIndex) + 2, display: e.hideList ? "none" : "block" })
        },
        [
          (g(!0), C(
            Ae,
            null,
            Xe(e.anchorNameList, (t) => (g(), C("li", {
              key: t,
              class: m(e.classes(e.n("anchor-item"), [e.active === t, e.n("anchor-item--active")])),
              style: G({ color: e.active === t && e.highlightColor ? e.highlightColor : void 0 }),
              onClick: (o) => e.anchorClick({ anchorName: t, manualCall: !0 })
            }, [
              F(e.$slots, "anchor-name", { anchorName: t }, () => [
                De(
                  se(t),
                  1
                  /* TEXT */
                )
              ])
            ], 14, B4))),
            128
            /* KEYED_FRAGMENT */
          ))
        ],
        6
        /* CLASS, STYLE */
      )
    ],
    2
    /* CLASS */
  );
}
const Dg = ne({
  name: O4,
  props: Mg,
  setup(e) {
    const n = k(""), t = k(null), o = k([]), r = k(), a = O(() => e.sticky), i = O(() => e.stickyCssMode), l = O(() => tn(e.stickyOffsetTop)), s = O(() => e.zIndex), { length: u, indexAnchors: c, bindIndexAnchors: d } = k4();
    let p = null, f = !1;
    const h = {
      active: r,
      sticky: a,
      cssMode: i,
      stickyOffsetTop: l,
      zIndex: s
    };
    pe(
      () => u.value,
      () => tp(this, null, function* () {
        yield bn(), o.value = c.filter(({ name: P }) => P.value != null).map(({ name: P }) => P.value);
      })
    ), yn(b), da(z), $o(() => {
      f = !0, z();
    }), Lt(() => {
      !f || r.value === void 0 || ($({
        anchorName: r.value,
        options: { event: !1 }
      }), f = !1);
    }), d(h);
    function v(P, B) {
      const I = Ln(P) ? P.name.value : P;
      I === r.value || I === void 0 || (r.value = I, (B == null ? void 0 : B.event) !== !1 && S(e.onChange, I));
    }
    function y() {
      const { top: P } = nn(p), { top: B } = nn(t.value);
      return vt(p) - P + B;
    }
    function w() {
      const P = vt(p), B = p === window ? document.body.scrollHeight : p.scrollHeight, I = y();
      c.forEach((U, L) => {
        const W = U.getOffsetTop(), N = P - W + l.value - I, T = L === c.length - 1 ? B : c[L + 1].getOffsetTop() - U.getOffsetTop();
        U.setDisabled(!0), N >= 0 && N < T && n.value === "" && (U.setDisabled(!1), v(U));
      });
    }
    function $(P) {
      return tp(this, arguments, function* ({ anchorName: B, manualCall: I = !1, options: U }) {
        if (I && S(e.onClick, B), B === r.value && !f)
          return;
        const L = c.find(({ name: j }) => B === j.value);
        if (!L)
          return;
        const W = y(), T = L.getOffsetTop() - l.value + W, M = ar(p);
        n.value = B, v(B, U), yield Fo(p, {
          left: M,
          top: T,
          animation: Tf,
          duration: Y(e.duration)
        }), yield bn(), n.value = "";
      });
    }
    function b() {
      p = At(t.value), p.addEventListener("scroll", w);
    }
    function z() {
      p && p.removeEventListener("scroll", w);
    }
    function D(P, B) {
      Dt(() => $({ anchorName: P, options: B }));
    }
    return {
      barEl: t,
      active: r,
      zIndex: s,
      anchorNameList: o,
      n: E4,
      classes: T4,
      toNumber: Y,
      scrollTo: D,
      anchorClick: $
    };
  }
});
Dg.render = M4;
var Ci = Dg;
ae(Ci);
le(Ci, Mg);
const CD = Ci;
var ms = Ci;
const Ig = {
  type: {
    type: String,
    default: "default"
  },
  href: String,
  target: String,
  rel: String,
  to: [String, Object],
  replace: Boolean,
  underline: {
    type: String,
    default: "always"
  },
  disabled: Boolean,
  textSize: [String, Number],
  textColor: String,
  onClick: R()
}, { name: D4, n: I4, classes: A4 } = _("link");
function N4(e, n) {
  return g(), ke(xt(e.tag), Ye(e.linkProps, {
    class: e.classes(
      e.n(),
      e.n("$--box"),
      e.n("$--inline-flex"),
      e.n(`--${e.type}`),
      [e.underline !== "none", e.n(`--underline-${e.underline}`)],
      [e.disabled, e.n("--disabled")],
      [e.isFocusing && !e.inMobile(), e.n("--focusing")]
    ),
    style: {
      color: e.textColor,
      fontSize: e.toSizeUnit(e.textSize)
    },
    onClick: e.handleClick,
    onFocus: n[0] || (n[0] = (t) => e.isFocusing = !0),
    onBlur: n[1] || (n[1] = (t) => e.isFocusing = !1)
  }), {
    default: ue(() => [
      F(e.$slots, "default")
    ]),
    _: 3
    /* FORWARDED */
  }, 16, ["class", "style", "onClick"]);
}
const Ag = ne({
  name: D4,
  props: Ig,
  setup(e) {
    const n = k(!1), t = O(() => {
      const { disabled: a, href: i, to: l } = e;
      return a ? "span" : i ? "a" : l ? "router-link" : "a";
    }), o = O(() => {
      const { disabled: a, href: i, target: l, to: s, replace: u, rel: c } = e;
      return a ? {} : i ? { href: i, target: l, rel: c } : s ? { to: s, target: l, replace: u } : {};
    });
    function r(a) {
      e.disabled || S(e.onClick, a);
    }
    return {
      tag: t,
      linkProps: o,
      isFocusing: n,
      inMobile: Vo,
      n: I4,
      classes: A4,
      handleClick: r,
      toSizeUnit: Te
    };
  }
});
Ag.render = N4;
var Si = Ag;
ae(Si);
le(Si, Ig);
const SD = Si;
var fs = Si;
const Ng = {
  loading: Boolean,
  immediateCheck: {
    type: Boolean,
    default: !0
  },
  finished: Boolean,
  error: Boolean,
  offset: {
    type: [String, Number],
    default: 0
  },
  loadingText: String,
  finishedText: String,
  errorText: String,
  onLoad: R(),
  "onUpdate:loading": R(),
  "onUpdate:error": R()
}, Rg = Symbol("TABS_ITEMS_BIND_TAB_ITEM_KEY");
function R4() {
  const { bindChildren: e, childProviders: n, length: t } = kn(
    Rg
  );
  return {
    length: t,
    tabItemList: n,
    bindTabItem: e
  };
}
const Lg = Symbol("TAB_ITEM_BIND_LIST_KEY");
function L4() {
  const { parentProvider: e, bindParent: n, index: t } = wn(
    Rg
  );
  return Xn(!!n, "TabItem", "<mp-tab-item/> must in <mp-tabs-items/>"), {
    index: t,
    tabsItems: e,
    bindTabsItems: n
  };
}
function V4() {
  const { childProviders: e, bindChildren: n, length: t } = kn(Lg);
  return {
    length: t,
    lists: e,
    bindLists: n
  };
}
function F4() {
  const { parentProvider: e, bindParent: n, index: t } = wn(Lg);
  return {
    index: t,
    tabItem: e,
    bindTabItem: n
  };
}
var U4 = (e, n, t) => new Promise((o, r) => {
  var a = (s) => {
    try {
      l(t.next(s));
    } catch (u) {
      r(u);
    }
  }, i = (s) => {
    try {
      l(t.throw(s));
    } catch (u) {
      r(u);
    }
  }, l = (s) => s.done ? o(s.value) : Promise.resolve(s.value).then(a, i);
  l((t = t.apply(e, n)).next());
});
const { name: j4, n: H4, classes: Y4 } = _("list");
function W4(e, n) {
  const t = oe("mp-loading"), o = Je("ripple");
  return g(), C(
    "div",
    {
      ref: "listEl",
      class: m(e.classes(e.n(), e.n("$--box")))
    },
    [
      F(e.$slots, "default"),
      e.loading ? F(e.$slots, "loading", { key: 0 }, () => {
        var r;
        return [
          V(
            "div",
            {
              class: m(e.n("loading"))
            },
            [
              V(
                "div",
                {
                  class: m(e.n("loading-text"))
                },
                se((r = e.loadingText) != null ? r : (e.pt ? e.pt : e.t)("listLoadingText")),
                3
                /* TEXT, CLASS */
              ),
              Z(t, {
                size: "mini",
                radius: 10
              })
            ],
            2
            /* CLASS */
          )
        ];
      }) : q("v-if", !0),
      e.finished ? F(e.$slots, "finished", { key: 1 }, () => {
        var r;
        return [
          V(
            "div",
            {
              class: m(e.n("finished"))
            },
            se((r = e.finishedText) != null ? r : (e.pt ? e.pt : e.t)("listFinishedText")),
            3
            /* TEXT, CLASS */
          )
        ];
      }) : q("v-if", !0),
      e.error ? F(e.$slots, "error", { key: 2 }, () => {
        var r;
        return [
          Ue((g(), C(
            "div",
            {
              class: m(e.n("error")),
              onClick: n[0] || (n[0] = (...a) => e.load && e.load(...a))
            },
            [
              De(
                se((r = e.errorText) != null ? r : (e.pt ? e.pt : e.t)("listErrorText")),
                1
                /* TEXT */
              )
            ],
            2
            /* CLASS */
          )), [
            [o]
          ])
        ];
      }) : q("v-if", !0),
      V(
        "div",
        {
          ref: "detectorEl",
          class: m(e.n("detector"))
        },
        null,
        2
        /* CLASS */
      )
    ],
    2
    /* CLASS */
  );
}
const Vg = ne({
  name: j4,
  directives: { Ripple: an },
  components: { MpLoading: bo },
  props: Ng,
  setup(e) {
    const n = k(null), t = k(null), { tabItem: o, bindTabItem: r } = F4(), { t: a } = lt();
    let i;
    S(r, {}), o && pe(() => o.current.value, c), pe(() => [e.loading, e.error, e.finished], c), yn(() => {
      i = At(n.value), i.addEventListener("scroll", c), e.immediateCheck && c();
    }), ir(u);
    function l() {
      S(e["onUpdate:error"], !1), S(e["onUpdate:loading"], !0), S(e.onLoad);
    }
    function s() {
      const { bottom: d } = nn(i), { bottom: p } = nn(t.value);
      return Math.floor(p) - tn(e.offset) <= d;
    }
    function u() {
      i && i.removeEventListener("scroll", c);
    }
    function c() {
      return U4(this, null, function* () {
        yield Ke(), !(e.loading || e.finished || e.error || (o == null ? void 0 : o.current.value) === !1 || !s()) && l();
      });
    }
    return {
      listEl: n,
      detectorEl: t,
      pt: a,
      t: ln,
      isNumber: zn,
      load: l,
      check: c,
      n: H4,
      classes: Y4
    };
  }
});
Vg.render = W4;
var zi = Vg;
ae(zi);
le(zi, Ng);
const zD = zi;
var vs = zi;
const K4 = {
  value: {
    type: Number,
    default: 0
  },
  opacity: {
    type: Number,
    default: 0
  },
  error: Boolean,
  color: String,
  errorColor: String,
  height: [Number, String],
  top: [Number, String],
  transitionDuration: Number
}, {
  name: q4,
  classes: X4,
  n: op
} = _("loading-bar");
var G4 = ne({
  name: q4,
  props: K4,
  setup(e) {
    return () => Z("div", {
      class: X4(op(), [e.error, op("--error")]),
      style: {
        zIndex: Rn.zIndex + 10,
        width: `${e.value}%`,
        opacity: e.opacity,
        height: Te(e.height),
        backgroundColor: e.error ? e.errorColor : e.color,
        top: Te(e.top),
        transitionDuration: e.transitionDuration == null ? void 0 : `${e.transitionDuration}ms`
      }
    }, null);
  }
});
const Nu = 200;
let Fg, Ug, jg, Hg, Pi, rp, Yg = {};
const Z4 = {
  value: 0,
  opacity: 0,
  error: !1
}, sn = en(Z4);
function J4(e) {
  Object.assign(sn, e), Yg = e;
}
const Q4 = () => {
  Object.keys(Yg).forEach((e) => {
    sn[e] !== void 0 && (sn[e] = void 0);
  });
}, Wg = () => {
  rp || (rp = !0, So(G4, sn));
}, Ru = () => {
  Fg = window.setTimeout(() => {
    sn.transitionDuration = void 0, !(sn.value >= 95) && (sn.value += sn.value < 70 ? Math.round(5 * Math.random()) : Math.random(), Ru());
  }, 200);
}, Lu = () => {
  window.clearTimeout(Fg), window.clearTimeout(Pi), window.clearTimeout(jg), window.clearTimeout(Ug), window.clearTimeout(Hg);
}, Kg = () => {
  Lu(), sn.value = 100, Pi = window.setTimeout(() => {
    sn.opacity = 0, Hg = window.setTimeout(() => {
      sn.error = !1;
    }, 250);
  }, Nu + 100);
}, x4 = () => {
  Lu(), sn.error = !1, sn.value = 0, sn.transitionDuration = 0, Wg(), Pi = window.setTimeout(() => {
    sn.opacity = 1;
  }, Nu), Ru();
}, _4 = () => {
  var e;
  jg = window.setTimeout(Kg, (e = sn.finishDelay) != null ? e : 0);
}, eO = () => {
  Lu(), sn.error = !0, sn.value === 100 && (sn.value = 0, sn.transitionDuration = 0), Wg(), Pi = window.setTimeout(() => {
    sn.opacity = 1;
  }, Nu), Ru(), Ug = window.setTimeout(Kg, 300);
}, qg = {
  start: x4,
  finish: _4,
  error: eO,
  setDefaultOptions: J4,
  resetDefaultOptions: Q4
}, PD = qg;
var gs = qg;
const Xg = {
  tag: {
    type: String,
    default: "div"
  },
  locale: {
    type: String,
    default: "zh-CN"
  },
  messages: {
    type: Object
  }
};
var nO = Object.defineProperty, tO = Object.defineProperties, oO = Object.getOwnPropertyDescriptors, ap = Object.getOwnPropertySymbols, rO = Object.prototype.hasOwnProperty, aO = Object.prototype.propertyIsEnumerable, ip = (e, n, t) => n in e ? nO(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t, iO = (e, n) => {
  for (var t in n || (n = {}))
    rO.call(n, t) && ip(e, t, n[t]);
  if (ap)
    for (var t of ap(n))
      aO.call(n, t) && ip(e, t, n[t]);
  return e;
}, lO = (e, n) => tO(e, oO(n));
const { name: sO, n: uO } = _("locale-provider"), cO = ne({
  name: sO,
  props: Xg,
  setup(e, { slots: n }) {
    const t = O(
      () => {
        var r;
        return Object.entries((r = e.messages) != null ? r : {}).reduce(
          (a, [i, l]) => (a[i] = lO(iO({}, l), {
            lang: i
          }), a),
          {}
        );
      }
    );
    ey({
      t: o
    });
    function o(r) {
      if (Xt(t.value, e.locale) && Xt(t.value[e.locale], r))
        return t.value[e.locale][r];
    }
    return () => er(
      e.tag,
      {
        class: uO()
      },
      S(n.default)
    );
  }
});
var Oi = cO;
ae(Oi);
le(Oi, Xg);
const OD = Oi;
var hs = Oi;
const Gg = {
  label: {},
  value: {},
  disabled: Boolean,
  ripple: {
    type: Boolean,
    default: !0
  },
  // internal
  option: Object
}, Zg = Symbol("SELECT_BIND_OPTION_KEY");
function dO() {
  const { length: e, childProviders: n, bindChildren: t } = kn(Zg);
  return {
    length: e,
    options: n,
    bindOptions: t
  };
}
function pO() {
  const { index: e, parentProvider: n, bindParent: t } = wn(Zg);
  return Xn(!!t, "Option", "<mp-option/> must in <mp-select/>"), {
    index: e,
    select: n,
    bindSelect: t
  };
}
const { name: mO, n: fO, classes: vO } = _("option"), gO = ["tabindex"];
function hO(e, n) {
  const t = oe("mp-checkbox"), o = oe("maybe-v-node"), r = oe("mp-hover-overlay"), a = Je("ripple"), i = Je("hover");
  return Ue((g(), C("div", {
    ref: "root",
    class: m(e.classes(e.n(), e.n("$--box"), [e.optionSelected, e.n("--selected-color")], [e.disabled, e.n("--disabled")])),
    style: G({
      color: e.optionSelected ? e.focusColor : void 0
    }),
    tabindex: e.disabled ? void 0 : "-1",
    onFocus: n[2] || (n[2] = (l) => e.isFocusing = !0),
    onBlur: n[3] || (n[3] = (l) => e.isFocusing = !1),
    onClick: n[4] || (n[4] = (...l) => e.handleClick && e.handleClick(...l))
  }, [
    V(
      "div",
      {
        class: m(e.classes(e.n("cover"), [e.optionSelected, e.n("--selected-background")])),
        style: G({
          background: e.optionSelected ? e.focusColor : void 0
        })
      },
      null,
      6
      /* CLASS, STYLE */
    ),
    e.multiple ? (g(), ke(t, {
      key: 0,
      ref: "checkbox",
      modelValue: e.optionSelected,
      "onUpdate:modelValue": n[0] || (n[0] = (l) => e.optionSelected = l),
      "checked-color": e.focusColor,
      disabled: e.disabled,
      onClick: n[1] || (n[1] = Tn(() => {
      }, ["stop"])),
      onChange: e.handleSelect
    }, null, 8, ["modelValue", "checked-color", "disabled", "onChange"])) : q("v-if", !0),
    F(e.$slots, "default", { selected: e.optionSelected }, () => [
      V(
        "div",
        {
          class: m(e.classes(e.n("text"), e.n("$--ellipsis")))
        },
        [
          Z(o, { is: e.labelVNode }, null, 8, ["is"])
        ],
        2
        /* CLASS */
      )
    ]),
    Z(r, {
      hovering: e.hovering && !e.disabled,
      focusing: e.isFocusing && !e.disabled
    }, null, 8, ["hovering", "focusing"])
  ], 46, gO)), [
    [a, { disabled: e.disabled || !e.ripple }],
    [i, e.handleHovering, "desktop"]
  ]);
}
const Jg = ne({
  name: mO,
  directives: { Ripple: an, Hover: In },
  components: {
    MpCheckbox: mo,
    MpHoverOverlay: Vn,
    MaybeVNode: lr
  },
  props: Gg,
  setup(e) {
    const n = k(), t = k(!1), o = k(!1), r = O(() => o.value), a = O(() => e.value), i = O(() => e.disabled), l = O(() => e.ripple), { select: s, bindSelect: u } = pO(), { multiple: c, focusColor: d, onSelect: p, computeLabel: f } = s, { hovering: h, handleHovering: v } = _n(), y = O(
      () => {
        var B;
        return vn(e.label) ? e.label(
          (B = e.option) != null ? B : {
            label: e.label,
            value: e.value,
            disabled: e.disabled
          },
          o.value
        ) : e.label;
      }
    ), w = {
      label: y,
      value: a,
      disabled: i,
      ripple: l,
      selected: r,
      sync: P
    };
    pe([() => e.label, () => e.value], f), u(w), He(() => window, "keydown", b), He(() => window, "keyup", z);
    function $() {
      e.disabled || D();
    }
    function b(B) {
      t.value && ((B.key === " " || B.key === "Enter") && Re(B), B.key === "Enter" && n.value.click());
    }
    function z(B) {
      t.value && B.key === " " && (Re(B), n.value.click());
    }
    function D() {
      c.value && (o.value = !o.value), p(w);
    }
    function P(B) {
      o.value = B;
    }
    return {
      root: n,
      optionSelected: o,
      multiple: c,
      focusColor: d,
      hovering: h,
      isFocusing: t,
      labelVNode: y,
      n: fO,
      classes: vO,
      handleHovering: v,
      handleClick: $,
      handleSelect: D
    };
  }
});
Jg.render = hO;
var Ei = Jg;
ae(Ei);
le(Ei, Gg);
const ED = Ei;
var ua = Ei;
const Qg = {
  show: Boolean,
  lockScroll: {
    type: Boolean,
    default: !0
  },
  teleport: [String, Object, Boolean],
  closeOnKeyEscape: {
    type: Boolean,
    default: !0
  },
  onClick: R(),
  onKeyEscape: R(),
  "onUpdate:show": R()
}, {
  name: bO,
  n: Er
} = _("overlay");
var Ti = ne({
  name: bO,
  inheritAttrs: !1,
  props: Qg,
  setup(e, {
    slots: n,
    attrs: t
  }) {
    const {
      zIndex: o
    } = ur(() => e.show, 3), {
      onStackTop: r
    } = mu(() => e.show, o), {
      disabled: a
    } = _t();
    sr(() => e.show, () => e.lockScroll), He(() => window, "keydown", i);
    function i(c) {
      !r() || c.key !== "Escape" || !e.show || (S(e.onKeyEscape), e.closeOnKeyEscape && (Re(c), S(e["onUpdate:show"], !1)));
    }
    function l() {
      S(e.onClick), S(e["onUpdate:show"], !1);
    }
    function s() {
      return Z("div", Ye({
        class: Er(),
        style: {
          zIndex: o.value - 2
        }
      }, t), [Z("div", {
        class: Er("overlay"),
        style: {
          zIndex: o.value - 1
        },
        onClick: l
      }, null), Z("div", {
        class: Er("content"),
        style: {
          zIndex: o.value
        }
      }, [S(n.default)])]);
    }
    function u() {
      return Z(_e, {
        name: Er("--fade")
      }, {
        default: () => [e.show && s()]
      });
    }
    return () => {
      const {
        teleport: c
      } = e;
      return c ? Z(it, {
        to: c,
        disabled: a.value
      }, {
        default: () => [u()]
      }) : u();
    };
  }
});
ae(Ti);
le(Ti, Qg);
const TD = Ti;
var bs = Ti;
const xg = {
  current: [Number, String],
  size: {
    type: [Number, String],
    default: 10
  },
  total: {
    type: [Number, String],
    default: 0
  },
  elevation: {
    type: [Boolean, Number, String],
    default: !0
  },
  maxPagerCount: {
    type: Number,
    default: 3
  },
  disabled: Boolean,
  simple: {
    type: Boolean,
    default: !0
  },
  showSizeChanger: {
    type: Boolean,
    default: !0
  },
  showQuickJumper: Boolean,
  sizeOption: {
    type: Array,
    default: () => [10, 20, 50, 100]
  },
  showTotal: Function,
  onChange: R(),
  "onUpdate:current": R(),
  "onUpdate:size": R()
}, { name: yO, n: wO, classes: kO } = _("pagination"), $O = ["item-mode", "onClick"];
function CO(e, n) {
  const t = oe("mp-icon"), o = oe("mp-input"), r = oe("mp-menu-option"), a = oe("mp-menu-select"), i = Je("ripple");
  return g(), C(
    "ul",
    {
      class: m(e.n())
    },
    [
      Ue((g(), C(
        "li",
        {
          class: m(
            e.classes(
              e.n("item"),
              e.n("prev"),
              [e.current <= 1 || e.disabled, e.n("item--disabled")],
              [e.simple, e.n("item--simple"), e.formatElevation(e.elevation, 2)]
            )
          ),
          onClick: n[0] || (n[0] = (l) => e.clickItem("prev"))
        },
        [
          F(e.$slots, "prev", {}, () => [
            Z(t, { name: "chevron-left" })
          ])
        ],
        2
        /* CLASS */
      )), [
        [i, { disabled: e.current <= 1 || e.disabled }]
      ]),
      e.simple ? (g(), C(
        "li",
        {
          key: 0,
          class: m(e.classes(e.n("simple"), [e.disabled, e.n("item--disabled")]))
        },
        [
          Z(o, {
            modelValue: e.simpleCurrentValue,
            "onUpdate:modelValue": n[1] || (n[1] = (l) => e.simpleCurrentValue = l),
            "mp-pagination-cover": "",
            variant: "standard",
            hint: !1,
            disabled: e.disabled,
            onBlur: n[2] || (n[2] = (l) => e.setPage("simple", e.simpleCurrentValue, l)),
            onKeydown: n[3] || (n[3] = Wu((l) => e.setPage("simple", e.simpleCurrentValue, l), ["enter"]))
          }, null, 8, ["modelValue", "disabled"]),
          V("span", null, [
            De(
              " / " + se(e.pageCount) + " ",
              1
              /* TEXT */
            ),
            V(
              "div",
              {
                class: m(e.n("simple-line"))
              },
              null,
              2
              /* CLASS */
            )
          ])
        ],
        2
        /* CLASS */
      )) : (g(!0), C(
        Ae,
        { key: 1 },
        Xe(e.pageList, (l, s) => Ue((g(), C("li", {
          key: s,
          "item-mode": e.getMode(l, s),
          class: m(
            e.classes(
              e.n("item"),
              e.formatElevation(e.elevation, 2),
              [l === e.current && !e.disabled, e.n("item--active")],
              [e.isHideEllipsis(l, s), e.n("item--hide")],
              [e.disabled, e.n("item--disabled")],
              [l === e.current && e.disabled, e.n("item--disabled--active")]
            )
          ),
          onClick: (u) => e.clickItem(l, s)
        }, [
          De(
            se(l),
            1
            /* TEXT */
          )
        ], 10, $O)), [
          [i, { disabled: e.disabled }]
        ])),
        128
        /* KEYED_FRAGMENT */
      )),
      Ue((g(), C(
        "li",
        {
          class: m(
            e.classes(
              e.n("item"),
              e.n("next"),
              [e.current >= e.pageCount || e.disabled, e.n("item--disabled")],
              [e.simple, e.n("item--simple"), e.formatElevation(e.elevation, 2)]
            )
          ),
          onClick: n[4] || (n[4] = (l) => e.clickItem("next"))
        },
        [
          F(e.$slots, "next", {}, () => [
            Z(t, { name: "chevron-right" })
          ])
        ],
        2
        /* CLASS */
      )), [
        [i, { disabled: e.current >= e.pageCount || e.disabled }]
      ]),
      e.showSizeChanger ? (g(), ke(a, {
        key: 2,
        modelValue: e.size,
        "onUpdate:modelValue": n[5] || (n[5] = (l) => e.size = l),
        placement: "cover-top",
        disabled: e.disabled
      }, {
        options: ue(() => [
          (g(!0), C(
            Ae,
            null,
            Xe(e.sizeOption, (l, s) => (g(), ke(r, {
              key: s,
              value: l,
              onClick: e.clickSize
            }, {
              default: ue(() => [
                De(
                  se(l) + se((e.pt ? e.pt : e.t)("paginationItem")) + " / " + se((e.pt ? e.pt : e.t)("paginationPage")),
                  1
                  /* TEXT */
                )
              ]),
              _: 2
              /* DYNAMIC */
            }, 1032, ["value", "onClick"]))),
            128
            /* KEYED_FRAGMENT */
          ))
        ]),
        default: ue(() => [
          V(
            "li",
            {
              class: m(e.classes(e.n("size"), [e.disabled, e.n("item--disabled")]))
            },
            [
              V(
                "div",
                {
                  class: m(e.classes(e.n("size--open"), [e.current <= 1 || e.disabled, e.n("size--open--disabled")]))
                },
                [
                  V(
                    "span",
                    null,
                    se(e.size) + se((e.pt ? e.pt : e.t)("paginationItem")) + " / " + se((e.pt ? e.pt : e.t)("paginationPage")),
                    1
                    /* TEXT */
                  ),
                  Z(t, {
                    class: m(e.n("size--open-icon")),
                    "mp-pagination-cover": "",
                    name: "menu-down"
                  }, null, 8, ["class"])
                ],
                2
                /* CLASS */
              )
            ],
            2
            /* CLASS */
          )
        ]),
        _: 1
        /* STABLE */
      }, 8, ["modelValue", "disabled"])) : q("v-if", !0),
      e.showQuickJumper && !e.simple ? (g(), C(
        "li",
        {
          key: 3,
          class: m(e.classes(e.n("quickly"), [e.disabled, e.n("item--disabled")]))
        },
        [
          De(
            se((e.pt ? e.pt : e.t)("paginationJump")) + " ",
            1
            /* TEXT */
          ),
          Z(o, {
            modelValue: e.quickJumperValue,
            "onUpdate:modelValue": n[6] || (n[6] = (l) => e.quickJumperValue = l),
            disabled: e.disabled,
            hint: !1,
            variant: "standard",
            "mp-pagination-cover": "",
            onBlur: n[7] || (n[7] = (l) => e.setPage("quick", e.quickJumperValue, l)),
            onKeydown: n[8] || (n[8] = Wu((l) => e.setPage("quick", e.quickJumperValue, l), ["enter"]))
          }, null, 8, ["modelValue", "disabled"])
        ],
        2
        /* CLASS */
      )) : q("v-if", !0),
      e.totalText ? (g(), C(
        "li",
        {
          key: 4,
          class: m(e.classes(e.n("total"), [e.disabled, e.n("item--disabled")]))
        },
        se(e.totalText),
        3
        /* TEXT, CLASS */
      )) : q("v-if", !0)
    ],
    2
    /* CLASS */
  );
}
const _g = ne({
  name: yO,
  components: {
    MpMenuSelect: Ko,
    MpMenuOption: fo,
    MpIcon: Qe,
    MpInput: jo
  },
  directives: { Ripple: an },
  props: xg,
  setup(e) {
    const n = k(""), t = k("1"), o = k(!1), r = k(!1), a = k(Y(e.current) || 1), i = k(Y(e.size) || 10), l = k([]), s = O(() => Math.ceil(e.maxPagerCount / 2)), u = O(() => Math.ceil(Y(e.total) / Y(i.value))), c = O(() => {
      const b = i.value * (a.value - 1) + 1, z = Math.min(i.value * a.value, Y(e.total));
      return [b, z];
    }), d = O(() => e.showTotal ? e.showTotal(Y(e.total), c.value) : ""), { t: p } = lt();
    pe([() => e.current, () => e.size], ([b, z]) => {
      a.value = Y(b) || 1, i.value = Y(z || 10);
    }), pe(
      [a, i, u],
      ([b, z, D], [P, B]) => {
        let I = [];
        const { maxPagerCount: U, total: L, onChange: W } = e, N = Math.ceil(Y(L) / Y(B)), T = D - (U - s.value) - 1;
        if (t.value = `${b}`, D - 2 > U) {
          if (P === void 0 || D !== N)
            for (let M = 2; M < U + 2; M++)
              I.push(M);
          if (b <= U && b < T) {
            I = [];
            for (let M = 1; M < U + 1; M++)
              I.push(M + 1);
            o.value = !0, r.value = !1;
          }
          if (b > U && b < T) {
            I = [];
            for (let M = 1; M < U + 1; M++)
              I.push(b + M - s.value);
            o.value = b === 2 && U === 1, r.value = !1;
          }
          if (b >= T) {
            I = [];
            for (let M = 1; M < U + 1; M++)
              I.push(D - (U - M) - 1);
            o.value = !1, r.value = !0;
          }
          I = [1, "...", ...I, "...", D];
        } else
          for (let M = 1; M <= D; M++)
            I.push(M);
        l.value = I, P != null && D > 0 && S(W, b, z), S(e["onUpdate:current"], b), S(e["onUpdate:size"], z);
      },
      {
        immediate: !0
      }
    );
    function f(b, z) {
      return zn(b) ? !1 : z === 1 ? o.value : r.value;
    }
    function h(b, z) {
      return zn(b) ? "basic" : z === 1 ? "head" : "tail";
    }
    function v(b, z) {
      if (!(b === a.value || e.disabled)) {
        if (b === "...") {
          a.value = z === 1 ? Math.max(a.value - e.maxPagerCount, 1) : Math.min(a.value + e.maxPagerCount, u.value);
          return;
        }
        if (b === "prev") {
          a.value = w(a.value - 1);
          return;
        }
        if (b === "next") {
          a.value = w(a.value + 1);
          return;
        }
        zn(b) && (a.value = b);
      }
    }
    function y() {
      const b = w(a.value);
      t.value = String(b), a.value = b;
    }
    function w(b) {
      return b > u.value ? u.value : b < 1 ? 1 : b;
    }
    function $(b, z, D) {
      D.target.blur();
      const P = w(Y(z));
      t.value = String(P), a.value = P, b === "quick" && (n.value = "");
    }
    return {
      current: a,
      size: i,
      pageCount: u,
      pageList: l,
      quickJumperValue: n,
      simpleCurrentValue: t,
      totalText: d,
      pt: p,
      t: ln,
      n: wO,
      classes: kO,
      getMode: h,
      isHideEllipsis: f,
      clickItem: v,
      clickSize: y,
      setPage: $,
      toNumber: Y,
      formatElevation: pn
    };
  }
});
_g.render = CO;
var Bi = _g;
ae(Bi);
le(Bi, xg);
const BD = Bi;
var ys = Bi;
const eh = {
  elevation: {
    type: [Boolean, Number, String],
    default: !1
  },
  ripple: Boolean,
  radius: [Number, String],
  width: [Number, String],
  height: [Number, String],
  round: Boolean,
  inline: Boolean,
  onClick: R()
}, { name: SO, n: zO, classes: PO } = _("paper");
function OO(e, n) {
  const t = Je("ripple");
  return Ue((g(), C(
    "div",
    {
      class: m(
        e.classes(
          e.n(),
          e.n("$--box"),
          e.formatElevation(e.elevation, 2),
          [e.onClick, e.n("--cursor")],
          [e.round, e.n("--round")],
          [e.inline, e.n("$--inline-flex")]
        )
      ),
      style: G({
        width: e.toSizeUnit(e.width),
        height: e.toSizeUnit(e.height),
        "border-radius": e.toSizeUnit(e.radius)
      }),
      onClick: n[0] || (n[0] = (...o) => e.handleClick && e.handleClick(...o))
    },
    [
      F(e.$slots, "default")
    ],
    6
    /* CLASS, STYLE */
  )), [
    [t, { disabled: !e.ripple }]
  ]);
}
const nh = ne({
  name: SO,
  directives: { Ripple: an },
  props: eh,
  setup(e) {
    function n(t) {
      S(e.onClick, t);
    }
    return {
      n: zO,
      classes: PO,
      formatElevation: pn,
      toSizeUnit: Te,
      handleClick: n
    };
  }
});
nh.render = OO;
var Mi = nh;
ae(Mi);
le(Mi, eh);
const MD = Mi;
var ws = Mi, EO = Object.defineProperty, lp = Object.getOwnPropertySymbols, TO = Object.prototype.hasOwnProperty, BO = Object.prototype.propertyIsEnumerable, sp = (e, n, t) => n in e ? EO(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t, MO = (e, n) => {
  for (var t in n || (n = {}))
    TO.call(n, t) && sp(e, t, n[t]);
  if (lp)
    for (var t of lp(n))
      BO.call(n, t) && sp(e, t, n[t]);
  return e;
};
const th = MO({
  modelValue: {
    type: Array,
    default: () => []
  },
  columns: {
    type: Array,
    default: () => []
  },
  title: String,
  textKey: {
    type: String,
    default: "text"
  },
  valueKey: {
    type: String,
    default: "value"
  },
  childrenKey: {
    type: String,
    default: "children"
  },
  toolbar: {
    type: Boolean,
    default: !0
  },
  cascade: Boolean,
  optionHeight: {
    type: [Number, String],
    default: 44
  },
  optionCount: {
    type: [Number, String],
    default: 6
  },
  columnsCount: [String, Number],
  confirmButtonText: String,
  cancelButtonText: String,
  confirmButtonTextColor: String,
  cancelButtonTextColor: String,
  // dynamic internal
  dynamic: Boolean,
  onChange: R(),
  onConfirm: R(),
  onCancel: R(),
  "onUpdate:modelValue": R()
}, Le(zo, [
  "show",
  "onUpdate:show",
  "closeOnClickOverlay",
  "closeOnKeyEscape",
  "teleport",
  "safeArea",
  "onOpen",
  "onClose",
  "onOpened",
  "onClosed",
  "onClickOverlay",
  "onRouteChange",
  "onKeyEscape"
])), { name: DO, n: IO, classes: AO } = _("picker"), up = 300, NO = 15, cp = 200, RO = 1e3;
let dp = 0;
const LO = ["onTouchstartPassive", "onTouchmove", "onTouchend"], VO = ["onTransitionend"], FO = ["onClick"];
function UO(e, n) {
  const t = oe("mp-button");
  return g(), ke(
    xt(e.dynamic ? e.n("$-popup") : e.Transition),
    Ye(
      e.dynamic ? {
        onOpen: e.onOpen,
        onOpened: e.onOpened,
        onClose: e.onClose,
        onClosed: e.onClosed,
        onClickOverlay: e.onClickOverlay,
        onRouteChange: e.onRouteChange,
        onKeyEscape: e.onKeyEscape,
        closeOnClickOverlay: e.closeOnClickOverlay,
        closeOnKeyEscape: e.closeOnKeyEscape,
        teleport: e.teleport,
        show: e.show,
        safeArea: e.safeArea,
        "onUpdate:show": e.handlePopupUpdateShow,
        position: "bottom",
        class: e.n("popup")
      } : null,
      { "mp-picker-cover": "" }
    ),
    {
      default: ue(() => [
        V(
          "div",
          Ye({
            class: e.n()
          }, e.$attrs),
          [
            e.toolbar ? (g(), C(
              "div",
              {
                key: 0,
                class: m(e.n("toolbar"))
              },
              [
                F(e.$slots, "cancel", {}, () => [
                  Z(t, {
                    class: m(e.n("cancel-button")),
                    "mp-picker-cover": "",
                    text: "",
                    "text-color": e.cancelButtonTextColor,
                    onClick: e.cancel
                  }, {
                    default: ue(() => {
                      var o;
                      return [
                        De(
                          se((o = e.cancelButtonText) != null ? o : (e.pt ? e.pt : e.t)("pickerCancelButtonText")),
                          1
                          /* TEXT */
                        )
                      ];
                    }),
                    _: 1
                    /* STABLE */
                  }, 8, ["class", "text-color", "onClick"])
                ]),
                F(e.$slots, "title", {}, () => {
                  var o;
                  return [
                    V(
                      "div",
                      {
                        class: m(e.n("title"))
                      },
                      se((o = e.title) != null ? o : (e.pt ? e.pt : e.t)("pickerTitle")),
                      3
                      /* TEXT, CLASS */
                    )
                  ];
                }),
                F(e.$slots, "confirm", {}, () => [
                  Z(t, {
                    class: m(e.n("confirm-button")),
                    text: "",
                    "mp-picker-cover": "",
                    "text-color": e.confirmButtonTextColor,
                    onClick: e.confirm
                  }, {
                    default: ue(() => {
                      var o;
                      return [
                        De(
                          se((o = e.confirmButtonText) != null ? o : (e.pt ? e.pt : e.t)("pickerConfirmButtonText")),
                          1
                          /* TEXT */
                        )
                      ];
                    }),
                    _: 1
                    /* STABLE */
                  }, 8, ["class", "text-color", "onClick"])
                ])
              ],
              2
              /* CLASS */
            )) : q("v-if", !0),
            V(
              "div",
              {
                class: m(e.n("columns")),
                style: G({ height: `${e.columnHeight}px` })
              },
              [
                (g(!0), C(
                  Ae,
                  null,
                  Xe(e.scrollColumns, (o) => (g(), C("div", {
                    key: o.id,
                    class: m(e.n("column")),
                    onTouchstartPassive: (r) => e.handleTouchstart(r, o),
                    onTouchmove: Tn((r) => e.handleTouchmove(r, o), ["prevent"]),
                    onTouchend: (r) => e.handleTouchend(o)
                  }, [
                    V("div", {
                      ref_for: !0,
                      ref: (r) => e.setScrollEl(r, o),
                      class: m(e.n("scroller")),
                      style: G({
                        transform: `translateY(${o.translate}px)`,
                        transitionDuration: `${o.duration}ms`,
                        transitionProperty: o.duration ? "transform" : "none"
                      }),
                      onTransitionend: (r) => e.handleTransitionend(o)
                    }, [
                      (g(!0), C(
                        Ae,
                        null,
                        Xe(o.column, (r, a) => (g(), C("div", {
                          key: e.getValue(r),
                          class: m(e.classes(e.n("option"), r.className)),
                          style: G({ height: `${e.optionHeight}px` }),
                          onClick: (i) => e.handleClick(o, a)
                        }, [
                          V(
                            "div",
                            {
                              class: m(e.classes(e.n("text"), r.textClassName))
                            },
                            se(r[e.getOptionKey("text")]),
                            3
                            /* TEXT, CLASS */
                          )
                        ], 14, FO))),
                        128
                        /* KEYED_FRAGMENT */
                      ))
                    ], 46, VO)
                  ], 42, LO))),
                  128
                  /* KEYED_FRAGMENT */
                )),
                V(
                  "div",
                  {
                    class: m(e.n("picked")),
                    style: G({
                      top: `${e.center}px`,
                      height: `${e.optionHeight}px`
                    })
                  },
                  null,
                  6
                  /* CLASS, STYLE */
                ),
                V(
                  "div",
                  {
                    class: m(e.n("mask")),
                    style: G({ backgroundSize: `100% ${(e.columnHeight - e.optionHeight) / 2}px` })
                  },
                  null,
                  6
                  /* CLASS, STYLE */
                )
              ],
              6
              /* CLASS, STYLE */
            )
          ],
          16
          /* FULL_PROPS */
        )
      ]),
      _: 3
      /* FORWARDED */
    },
    16
    /* FULL_PROPS */
  );
}
const oh = ne({
  name: DO,
  components: {
    MpButton: Mn,
    MpPopup: It
  },
  inheritAttrs: !1,
  props: th,
  setup(e) {
    const n = Gn(e, "modelValue"), t = k([]), o = O(() => Y(e.columnsCount)), r = O(() => tn(e.optionHeight)), a = O(() => tn(e.optionCount)), i = O(() => a.value * r.value / 2 - r.value / 2), l = O(() => a.value * r.value), { prevY: s, moveY: u, dragging: c, startTouch: d, moveTouch: p, endTouch: f } = Co(), { t: h } = lt();
    let v = [];
    B(), pe(() => e.columns, B, { deep: !0 }), pe(() => n.value, B);
    function y(A) {
      return {
        text: e.textKey,
        value: e.valueKey,
        children: e.childrenKey
      }[A];
    }
    function w(A) {
      var K;
      return (K = A[y("value")]) != null ? K : A[y("text")];
    }
    function $(A) {
      v = [...A];
    }
    function b(A) {
      return (e.columnsCount != null ? A.slice(0, o.value) : A).map((me, Se) => {
        const Ve = {
          id: dp++,
          prevY: 0,
          momentumPrevY: 0,
          touching: !1,
          translate: i.value,
          index: 0,
          duration: 0,
          momentumTime: 0,
          column: me,
          scrollEl: null,
          scrolling: !1
        }, We = n.value[Se], on = Ve.column.findIndex((gn) => We === w(gn));
        return Ve.index = on === -1 ? 0 : on, M(Ve), Ve;
      });
    }
    function z(A) {
      const K = [];
      return D(K, A), K;
    }
    function D(A, K, me = !0, Se = 1) {
      var Ve;
      if (K.length && (e.columnsCount == null || Se <= o.value)) {
        const We = {
          id: dp++,
          prevY: 0,
          momentumPrevY: 0,
          touching: !1,
          translate: i.value,
          index: 0,
          duration: 0,
          momentumTime: 0,
          column: K,
          scrollEl: null,
          scrolling: !1
        };
        if (A.push(We), me) {
          const on = n.value[A.length - 1], gn = K.findIndex((Sn) => on === w(Sn));
          We.index = gn === -1 ? 0 : gn;
        }
        M(We), D(
          A,
          (Ve = We.column[We.index][y("children")]) != null ? Ve : [],
          me,
          Se + 1
        );
      }
    }
    function P(A) {
      var K;
      t.value.splice(t.value.indexOf(A) + 1), D(
        t.value,
        (K = A.column[A.index][y("children")]) != null ? K : [],
        !1,
        t.value.length + 1
      );
    }
    function B() {
      t.value = e.cascade ? z(e.columns) : b(e.columns);
      const { indexes: A } = T();
      $(A);
    }
    function I(A, K) {
      K.scrollEl = A;
    }
    function U(A) {
      S(e["onUpdate:show"], A);
    }
    function L(A) {
      const K = i.value - A.column.length * r.value, me = r.value + i.value;
      A.translate = $n(A.translate, K, me);
    }
    function W(A, K) {
      const me = Math.round((i.value - K) / r.value);
      return Kp(me, A.column);
    }
    function N(A) {
      return A.translate = i.value - A.index * r.value, A.translate;
    }
    function T() {
      const A = [], K = [], me = [];
      return t.value.forEach(({ column: Se, index: Ve }) => {
        const We = Se[Ve];
        A.push(w(We)), K.push(Ve), me.push(We);
      }), {
        values: A,
        indexes: K,
        options: me
      };
    }
    function M(A, K = 0) {
      N(A), A.duration = K;
    }
    function j(A, K, me) {
      A.translate += Math.abs(K / me) / 3e-3 * (K < 0 ? -1 : 1);
    }
    function E(A, K) {
      c.value || (A.index = K, M(A, cp));
    }
    function J(A, K) {
      K.touching = !0, K.translate = il(K.scrollEl), d(A);
    }
    function X(A, K) {
      if (!K.touching)
        return;
      p(A), K.scrolling = !1, K.duration = 0, K.prevY = s.value, K.translate += u.value, L(K);
      const me = performance.now();
      me - K.momentumTime > up && (K.momentumTime = me, K.momentumPrevY = K.translate);
    }
    function te(A) {
      f(), A.touching = !1, A.prevY = 0;
      const K = A.translate - A.momentumPrevY, me = performance.now() - A.momentumTime, Se = Math.abs(K) >= NO && me <= up, Ve = A.translate;
      Se && j(A, K, me), A.index = W(A, A.translate), M(A, Se ? RO : cp), A.scrolling = A.translate !== Ve, A.scrolling || H(A);
    }
    function he(A) {
      A.scrolling = !1, H(A);
    }
    function Ie() {
      const { indexes: A } = T();
      return A.every((K, me) => K === v[me]);
    }
    function H(A) {
      const { onChange: K, cascade: me } = e;
      if (Ie())
        return;
      me && P(A);
      const Se = t.value.some((Sn) => Sn.scrolling), Ve = t.value.some((Sn) => Sn.touching);
      if (Se || Ve)
        return;
      const { values: We, indexes: on, options: gn } = T();
      $(on), S(K, We, on, gn), n.value = We;
    }
    function x() {
      if (e.cascade) {
        const A = t.value.find((K) => K.scrolling);
        A && (A.index = W(A, il(A.scrollEl)), A.scrolling = !1, M(A), P(A));
      } else
        t.value.forEach((A) => {
          A.index = W(A, il(A.scrollEl)), M(A);
        });
    }
    function re() {
      x();
      const { values: A, indexes: K, options: me } = T();
      $(K), S(e.onConfirm, A, K, me);
    }
    function ve() {
      x();
      const { values: A, indexes: K, options: me } = T();
      $(K), S(e.onCancel, A, K, me);
    }
    return {
      optionHeight: r,
      optionCount: a,
      scrollColumns: t,
      columnHeight: l,
      center: i,
      Transition: _e,
      pt: h,
      t: ln,
      n: IO,
      classes: AO,
      setScrollEl: I,
      getOptionKey: y,
      getValue: w,
      handlePopupUpdateShow: U,
      handleTouchstart: J,
      handleTouchmove: X,
      handleTouchend: te,
      handleTransitionend: he,
      confirm: re,
      cancel: ve,
      handleClick: E
    };
  }
});
oh.render = UO;
var gr = oh;
let co;
function Oo(e) {
  return new Promise((n) => {
    Oo.close();
    const t = je(e) ? { columns: e } : e, o = en(t);
    o.dynamic = !0, o.teleport = "body", co = o;
    function r() {
      co === o && (co = null);
    }
    const { unmountInstance: a } = So(gr, o, {
      onConfirm: (i, l, s) => {
        S(o.onConfirm, i, l, s), n({
          state: "confirm",
          values: i,
          indexes: l,
          options: s
        }), o.show = !1, r();
      },
      onCancel: (i, l, s) => {
        S(o.onCancel, i, l, s), n({
          state: "cancel",
          values: i,
          indexes: l,
          options: s
        }), o.show = !1, r();
      },
      onClose: () => {
        S(o.onClose), n({
          state: "close"
        }), r();
      },
      onClosed: () => {
        S(o.onClosed), a(), r();
      },
      onRouteChange: () => {
        a(), r();
      },
      "onUpdate:show": (i) => {
        o.show = i;
      }
    });
    o.show = !0;
  });
}
Oo.close = function() {
  if (co == null)
    return;
  const e = co;
  co = null, Ke().then(() => {
    e.show = !1;
  });
};
Oo.Component = gr;
ae(gr);
ae(gr, Oo);
le(Oo, th);
const DD = gr;
var ks = Oo;
const rh = {
  mode: {
    type: String,
    default: "linear"
  },
  lineWidth: {
    type: [Number, String],
    default: 4
  },
  color: [String, Object],
  trackColor: String,
  value: {
    type: [Number, String],
    default: 0
  },
  label: Boolean,
  labelClass: String,
  size: {
    type: [Number, String],
    default: 40
  },
  rotate: {
    type: Number,
    default: 0
  },
  track: {
    type: Boolean,
    default: !0
  },
  indeterminate: Boolean,
  type: {
    type: String,
    default: "primary"
  }
}, oo = 100, Tr = 0, st = 20, pp = 2 * Math.PI * st, { name: jO, n: HO, classes: YO } = _("progress"), WO = ["aria-valuenow"], KO = ["viewBox"], qO = { key: 0 }, XO = ["id"], GO = ["offset", "stop-color"], ZO = ["d", "stroke-width", "stroke-dasharray"], JO = ["d", "stroke-width", "stroke-dasharray", "stroke-dashoffset"];
function QO(e, n) {
  return g(), C("div", {
    class: m(e.n()),
    role: "progressbar",
    "aria-valuemin": "0",
    "aria-valuemax": "100",
    "aria-valuenow": e.indeterminate ? void 0 : e.mode === "linear" ? e.linearProps.value : e.circleProps.value
  }, [
    e.mode === "linear" ? (g(), C(
      "div",
      {
        key: 0,
        class: m(e.n("linear"))
      },
      [
        V(
          "div",
          {
            class: m(e.classes(e.n("linear-block"), [e.track, e.n("linear-background")])),
            style: G({ height: e.toSizeUnit(e.lineWidth), background: e.trackColor })
          },
          [
            e.indeterminate ? (g(), C(
              "div",
              {
                key: 0,
                class: m(e.n("linear-indeterminate"))
              },
              [
                V(
                  "div",
                  {
                    class: m(e.classes(e.n(`linear--${e.type}`))),
                    style: G({ background: e.progressColor })
                  },
                  null,
                  6
                  /* CLASS, STYLE */
                ),
                V(
                  "div",
                  {
                    class: m(e.classes(e.n(`linear--${e.type}`))),
                    style: G({ background: e.progressColor })
                  },
                  null,
                  6
                  /* CLASS, STYLE */
                )
              ],
              2
              /* CLASS */
            )) : (g(), C(
              "div",
              {
                key: 1,
                class: m(e.classes(e.n("linear-certain"), e.n(`linear--${e.type}`))),
                style: G({ background: e.progressColor, width: e.linearProps.width })
              },
              null,
              6
              /* CLASS, STYLE */
            ))
          ],
          6
          /* CLASS, STYLE */
        ),
        e.label ? (g(), C(
          "div",
          {
            key: 0,
            class: m(e.classes(e.n("linear-label"), [e.labelClass, e.labelClass]))
          },
          [
            F(e.$slots, "default", {}, () => [
              De(
                se(e.linearProps.roundValue),
                1
                /* TEXT */
              )
            ])
          ],
          2
          /* CLASS */
        )) : q("v-if", !0)
      ],
      2
      /* CLASS */
    )) : q("v-if", !0),
    e.mode === "circle" ? (g(), C(
      "div",
      {
        key: 1,
        class: m(e.classes(e.n("circle"), [e.indeterminate, e.n("circle-indeterminate")])),
        style: G({ width: e.toSizeUnit(e.size), height: e.toSizeUnit(e.size) })
      },
      [
        (g(), C("svg", {
          class: m(e.n("circle-svg")),
          viewBox: e.circleProps.viewBox
        }, [
          e.isPlainObject(e.color) ? (g(), C("defs", qO, [
            V("linearGradient", {
              id: e.id,
              x1: "100%",
              y1: "0%",
              x2: "0%",
              y2: "0%"
            }, [
              (g(!0), C(
                Ae,
                null,
                Xe(e.linearGradientProgress, (t, o) => (g(), C("stop", {
                  key: o,
                  offset: t,
                  "stop-color": e.color[t]
                }, null, 8, GO))),
                128
                /* KEYED_FRAGMENT */
              ))
            ], 8, XO)
          ])) : q("v-if", !0),
          e.track ? (g(), C("path", {
            key: 1,
            class: m(e.n("circle-background")),
            d: e.circleProps.path,
            fill: "transparent",
            "stroke-width": e.circleProps.strokeWidth,
            "stroke-dasharray": e.CIRCUMFERENCE,
            style: G({
              stroke: e.trackColor
            })
          }, null, 14, ZO)) : q("v-if", !0),
          V("path", {
            class: m(e.classes(e.n("circle-certain"), e.n(`circle--${e.type}`), [e.indeterminate, e.n("circle-overlay")])),
            d: e.circleProps.path,
            fill: "transparent",
            "stroke-width": e.circleProps.strokeWidth,
            "stroke-dasharray": e.CIRCUMFERENCE,
            "stroke-dashoffset": e.circleProps.strokeOffset,
            style: G({
              stroke: e.progressColor,
              transform: `rotateZ(${e.rotate}deg)`,
              transformOrigin: "50% 50%"
            })
          }, null, 14, JO)
        ], 10, KO)),
        e.label ? (g(), C(
          "div",
          {
            key: 0,
            class: m(e.classes(e.n("circle-label"), e.labelClass))
          },
          [
            F(e.$slots, "default", {}, () => [
              De(
                se(e.circleProps.roundValue),
                1
                /* TEXT */
              )
            ])
          ],
          2
          /* CLASS */
        )) : q("v-if", !0)
      ],
      6
      /* CLASS, STYLE */
    )) : q("v-if", !0)
  ], 10, WO);
}
const ah = ne({
  name: jO,
  props: rh,
  setup(e) {
    const n = ym(), t = O(() => {
      const i = Y(e.value), l = $n(i, Tr, oo), s = $n(Math.round(i), Tr, oo);
      return {
        width: `${l}%`,
        roundValue: `${s}%`,
        value: l
      };
    }), o = O(() => {
      const { size: i, lineWidth: l, value: s } = e, u = st / (1 - tn(l) / tn(i)) * 2, c = `0 0 ${u} ${u}`, d = $n(Math.round(Y(s)), Tr, oo), p = `${(oo - d) / oo * pp}`, f = tn(l) / tn(i) * u, h = 0, v = -st, y = 0, w = -2 * st, $ = `M ${u / 2} ${u / 2} m ${h} ${v} a ${st} ${st} 
        0 1 1 ${y} ${-w} a ${st} ${st} 0 1 1 ${-y} ${w}`;
      return {
        strokeWidth: f,
        viewBox: c,
        strokeOffset: p,
        roundValue: `${d}%`,
        path: $,
        value: $n(Y(s), Tr, oo)
      };
    }), r = O(() => Ln(e.color) ? `url(#${n.value})` : e.color), a = O(
      () => Object.keys(e.color).sort((i, l) => parseFloat(i) - parseFloat(l))
    );
    return {
      id: n,
      linearProps: t,
      CIRCUMFERENCE: pp,
      RADIUS: st,
      circleProps: o,
      progressColor: r,
      linearGradientProgress: a,
      n: HO,
      classes: YO,
      toSizeUnit: Te,
      isPlainObject: Ln
    };
  }
});
ah.render = QO;
var Di = ah;
ae(Di);
le(Di, rh);
const ID = Di;
var $s = Di;
const ih = {
  modelValue: Boolean,
  disabled: Boolean,
  animationDuration: {
    type: [Number, String],
    default: 300
  },
  successDuration: {
    type: [Number, String],
    default: 2e3
  },
  bgColor: String,
  successBgColor: String,
  color: String,
  successColor: String,
  target: [String, Object],
  onRefresh: R(),
  "onUpdate:modelValue": R()
};
var xO = (e, n, t) => new Promise((o, r) => {
  var a = (s) => {
    try {
      l(t.next(s));
    } catch (u) {
      r(u);
    }
  }, i = (s) => {
    try {
      l(t.throw(s));
    } catch (u) {
      r(u);
    }
  }, l = (s) => s.done ? o(s.value) : Promise.resolve(s.value).then(a, i);
  l((t = t.apply(e, n)).next());
});
const { name: _O, n: mp, classes: e2 } = _("pull-refresh"), fp = 150;
function n2(e, n) {
  const t = oe("mp-icon");
  return g(), C(
    "div",
    {
      ref: "freshNode",
      class: m(e.n()),
      onTouchstart: n[0] || (n[0] = (...o) => e.handleTouchstart && e.handleTouchstart(...o)),
      onTouchend: n[1] || (n[1] = (...o) => e.handleTouchend && e.handleTouchend(...o)),
      onTouchcancel: n[2] || (n[2] = (...o) => e.handleTouchend && e.handleTouchend(...o))
    },
    [
      V(
        "div",
        {
          ref: "controlNode",
          class: m(e.classes(e.n("control"), e.n("$-elevation--2"), [e.isSuccess, e.n("control-success")])),
          style: G(e.controlStyle)
        },
        [
          Z(t, {
            name: e.iconName,
            transition: e.ICON_TRANSITION,
            class: m(e.classes(e.n("icon"), [e.refreshStatus === "loading", e.n("animation")])),
            "mp-pull-refresh-cover": ""
          }, null, 8, ["name", "transition", "class"])
        ],
        6
        /* CLASS, STYLE */
      ),
      F(e.$slots, "default")
    ],
    34
    /* CLASS, NEED_HYDRATION */
  );
}
const lh = ne({
  name: _O,
  components: { MpIcon: Qe },
  props: ih,
  setup(e) {
    const n = k(0), t = k(null), o = k(null), r = k(0), a = k("-125%"), i = k("arrow-down"), l = k("default"), s = k(!1), u = O(() => Math.abs(2 * n.value)), c = O(() => l.value === "success"), d = O(
      () => l.value !== "loading" && l.value !== "success" && !e.disabled
    ), p = O(() => ({
      transform: `translate3d(0px, ${un(a.value) ? a.value : `${a.value}px`}, 0px) translate(-50%, 0)`,
      transition: s.value ? `transform ${e.animationDuration}ms` : void 0,
      background: c.value ? e.successBgColor : e.bgColor,
      color: c.value ? e.successColor : e.color
    })), { startTouch: f, moveTouch: h, endTouch: v, isReachTop: y } = Co();
    let w, $;
    pe(
      () => e.modelValue,
      (L) => {
        L === !1 && (s.value = !0, l.value = "success", i.value = "checkbox-marked-circle", setTimeout(() => {
          a.value = n.value, U();
        }, Y(e.successDuration)));
      }
    ), yn(I), He(t, "touchmove", P);
    function b(L) {
      if (i.value !== L)
        return i.value = L, new Promise((W) => {
          window.setTimeout(W, fp);
        });
    }
    function z(L) {
      ("classList" in w ? w : document.body).classList[L](`${mp()}--lock`);
    }
    function D(L) {
      if (f(L), n.value === 0) {
        const { width: W } = nn(o.value);
        n.value = -(W + W * 0.25);
      }
      $ = At(L.target);
    }
    function P(L) {
      if (h(L), !d.value || !$ || $ !== w && vt($) > 0 || vt(w) > 0)
        return;
      y(w) && Re(L), l.value !== "pulling" && (l.value = "pulling", r.value = L.touches[0].clientY), y(w) && zn(a.value) && a.value > n.value && z("add");
      const N = (L.touches[0].clientY - r.value) / 2 + n.value;
      a.value = N >= u.value ? u.value : N, b(a.value >= u.value * 0.2 ? "refresh" : "arrow-down");
    }
    function B() {
      return xO(this, null, function* () {
        v(), d.value && (s.value = !0, Y(a.value) >= u.value * 0.2 ? (yield b("refresh"), l.value = "loading", a.value = u.value * 0.3, S(e["onUpdate:modelValue"], !0), Ke(() => {
          S(e.onRefresh);
        }), z("remove")) : (l.value = "loosing", i.value = "arrow-down", a.value = n.value, setTimeout(() => {
          s.value = !1, z("remove");
        }, Y(e.animationDuration))), $ = null);
      });
    }
    function I() {
      w = e.target ? Km(e.target, "PullRefresh") : At(t.value);
    }
    function U() {
      setTimeout(() => {
        l.value = "default", i.value = "arrow-down", s.value = !1;
      }, Y(e.animationDuration));
    }
    return {
      ICON_TRANSITION: fp,
      refreshStatus: l,
      freshNode: t,
      controlNode: o,
      iconName: i,
      controlStyle: p,
      isSuccess: c,
      n: mp,
      classes: e2,
      handleTouchstart: D,
      handleTouchmove: P,
      handleTouchend: B
    };
  }
});
lh.render = n2;
var Ii = lh;
ae(Ii);
le(Ii, ih);
const AD = Ii;
var Cs = Ii;
const sh = {
  modelValue: {
    type: [String, Number, Boolean, Object, Array],
    default: !1
  },
  checkedValue: {
    type: [String, Number, Boolean, Object, Array],
    default: !0
  },
  uncheckedValue: {
    type: [String, Number, Boolean, Object, Array],
    default: !1
  },
  disabled: Boolean,
  readonly: Boolean,
  checkedColor: String,
  uncheckedColor: String,
  iconSize: [String, Number],
  ripple: {
    type: Boolean,
    default: !0
  },
  validateTrigger: {
    type: Array,
    default: () => ["onChange"]
  },
  rules: [Array, Function, Object],
  onClick: R(),
  onChange: R(),
  "onUpdate:modelValue": R()
}, uh = Symbol("RADIO_GROUP_BIND_RADIO_KEY");
function t2() {
  const { bindChildren: e, childProviders: n, length: t } = kn(
    uh
  );
  return {
    length: t,
    radios: n,
    bindRadios: e
  };
}
function o2() {
  const { bindParent: e, parentProvider: n, index: t } = wn(uh);
  return {
    index: t,
    radioGroup: n,
    bindRadioGroup: e
  };
}
const { name: r2, n: a2, classes: i2 } = _("radio"), l2 = ["aria-checked"], s2 = ["tabindex"];
function u2(e, n) {
  const t = oe("mp-icon"), o = oe("mp-hover-overlay"), r = oe("mp-form-details"), a = Je("ripple"), i = Je("hover");
  return g(), C(
    "div",
    {
      class: m(e.n("wrap"))
    },
    [
      V("div", Ye({
        role: "radio",
        "aria-checked": e.checked,
        class: e.n()
      }, e.$attrs, {
        onClick: n[3] || (n[3] = (...l) => e.handleClick && e.handleClick(...l))
      }), [
        Ue((g(), C("div", {
          ref: "action",
          class: m(
            e.classes(
              e.n("action"),
              [e.checked, e.n("--checked"), e.n("--unchecked")],
              [e.errorMessage || e.radioGroupErrorMessage, e.n("--error")],
              [e.formDisabled || e.disabled, e.n("--disabled")]
            )
          ),
          tabindex: e.tabIndex,
          style: G({ color: e.checked ? e.checkedColor : e.uncheckedColor }),
          onFocus: n[0] || (n[0] = (l) => e.isFocusing = !0),
          onBlur: n[1] || (n[1] = (l) => e.isFocusing = !1)
        }, [
          e.checked ? F(e.$slots, "checked-icon", { key: 0 }, () => [
            Z(t, {
              class: m(e.n("icon")),
              "mp-radio-cover": "",
              name: "radio-marked",
              size: e.iconSize
            }, null, 8, ["class", "size"])
          ]) : F(e.$slots, "unchecked-icon", { key: 1 }, () => [
            Z(t, {
              class: m(e.n("icon")),
              "mp-radio-cover": "",
              name: "radio-blank",
              size: e.iconSize
            }, null, 8, ["class", "size"])
          ]),
          Z(o, {
            hovering: !e.disabled && !e.formDisabled && e.hovering,
            focusing: !e.disabled && !e.formDisabled && e.isFocusing
          }, null, 8, ["hovering", "focusing"])
        ], 46, s2)), [
          [a, { disabled: e.formReadonly || e.readonly || e.formDisabled || e.disabled || !e.ripple }],
          [i, e.handleHovering, "desktop"]
        ]),
        e.$slots.default ? (g(), C(
          "div",
          {
            key: 0,
            class: m(
              e.classes(
                e.n("text"),
                [e.errorMessage || e.radioGroupErrorMessage, e.n("--error")],
                [e.formDisabled || e.disabled, e.n("--disabled")]
              )
            ),
            onClick: n[2] || (n[2] = (...l) => e.handleTextClick && e.handleTextClick(...l))
          },
          [
            F(e.$slots, "default", { checked: e.checked })
          ],
          2
          /* CLASS */
        )) : q("v-if", !0)
      ], 16, l2),
      Z(r, { "error-message": e.errorMessage }, null, 8, ["error-message"])
    ],
    2
    /* CLASS */
  );
}
const ch = ne({
  name: r2,
  directives: { Ripple: an, Hover: In },
  components: {
    MpIcon: Qe,
    MpFormDetails: Bn,
    MpHoverOverlay: Vn
  },
  inheritAttrs: !1,
  props: sh,
  setup(e) {
    const n = k(), t = k(!1), o = Gn(e, "modelValue"), r = O(() => o.value === e.checkedValue), { radioGroup: a, bindRadioGroup: i } = o2(), { hovering: l, handleHovering: s } = _n(), { form: u, bindForm: c } = jn(), d = O(() => {
      const W = (u == null ? void 0 : u.disabled.value) || e.disabled, N = r.value, T = a == null ? void 0 : a.hasChecked.value;
      if (!W)
        return a && T && !N ? "-1" : "0";
    }), {
      errorMessage: p,
      validateWithTrigger: f,
      validate: h,
      // expose
      resetValidation: v
    } = Un(), y = {
      sync: B,
      validate: U,
      resetValidation: v,
      reset: I,
      isFocusing: O(() => t.value),
      // keyboard arrow move
      move() {
        n.value.focus(), n.value.click();
      },
      moveable() {
        return !(u != null && u.disabled.value) && !e.disabled && !(u != null && u.readonly.value) && !e.readonly;
      }
    };
    S(i, y), S(c, y), He(() => window, "keydown", w), He(() => window, "keyup", $);
    function w(W) {
      if (!t.value)
        return;
      const { key: N } = W;
      (N === "Enter" || N === " ") && Re(W), N === "Enter" && n.value.click();
    }
    function $(W) {
      t.value && W.key === " " && (Re(W), n.value.click());
    }
    function b(W) {
      Ke(() => {
        const { validateTrigger: N, rules: T, modelValue: M } = e;
        f(N, W, T, M);
      });
    }
    function z(W) {
      const { checkedValue: N, onChange: T } = e;
      a && o.value === N || (o.value = W, S(T, o.value), a == null || a.onToggle(N), b("onChange"));
    }
    function D(W) {
      const { disabled: N, readonly: T, uncheckedValue: M, checkedValue: j, onClick: E } = e;
      u != null && u.disabled.value || N || (S(E, W), !(u != null && u.readonly.value || T) && z(r.value ? M : j));
    }
    function P() {
      n.value.focus();
    }
    function B(W) {
      const { checkedValue: N, uncheckedValue: T } = e, M = W === N;
      return o.value = M ? N : T, M;
    }
    function I() {
      o.value = e.uncheckedValue, v();
    }
    function U() {
      return h(e.rules, e.modelValue);
    }
    function L(W) {
      const { uncheckedValue: N, checkedValue: T } = e;
      ![N, T].includes(W) && (W = r.value ? N : T), z(W);
    }
    return {
      action: n,
      isFocusing: t,
      checked: r,
      errorMessage: p,
      radioGroupErrorMessage: a == null ? void 0 : a.errorMessage,
      formDisabled: u == null ? void 0 : u.disabled,
      formReadonly: u == null ? void 0 : u.readonly,
      hovering: l,
      tabIndex: d,
      handleHovering: s,
      n: a2,
      classes: i2,
      handleClick: D,
      handleTextClick: P,
      toggle: L,
      reset: I,
      validate: U,
      resetValidation: v
    };
  }
});
ch.render = u2;
var Ai = ch;
ae(Ai);
le(Ai, sh);
const ND = Ai;
var ca = Ai;
const dh = {
  modelValue: {
    type: [String, Number, Boolean, Object, Array],
    default: void 0
  },
  direction: {
    type: String,
    default: "horizontal"
  },
  options: {
    type: Array,
    default: () => []
  },
  ariaLabel: {
    type: String,
    default: ""
  },
  labelKey: {
    type: String,
    default: "label"
  },
  valueKey: {
    type: String,
    default: "value"
  },
  validateTrigger: {
    type: Array,
    default: () => ["onChange"]
  },
  rules: [Array, Function, Object],
  onChange: R(),
  "onUpdate:modelValue": R()
}, { name: c2, n: d2, classes: p2 } = _("radio-group"), m2 = ["aria-label"];
function f2(e, n) {
  const t = oe("maybe-v-node"), o = oe("mp-radio"), r = oe("mp-form-details");
  return g(), C(
    "div",
    {
      class: m(e.n("wrap"))
    },
    [
      V("div", {
        "aria-label": e.ariaLabel,
        role: "radiogroup",
        class: m(e.classes(e.n(), e.n(`--${e.direction}`)))
      }, [
        e.options.length ? (g(!0), C(
          Ae,
          { key: 0 },
          Xe(e.options, (a) => (g(), ke(o, {
            key: a[e.valueKey],
            "checked-value": a[e.valueKey],
            disabled: a.disabled
          }, {
            default: ue(({ checked: i }) => [
              Z(t, {
                is: e.isFunction(a[e.labelKey]) ? a[e.labelKey](a, i) : a[e.labelKey]
              }, null, 8, ["is"])
            ]),
            _: 2
            /* DYNAMIC */
          }, 1032, ["checked-value", "disabled"]))),
          128
          /* KEYED_FRAGMENT */
        )) : q("v-if", !0),
        F(e.$slots, "default")
      ], 10, m2),
      Z(r, { "error-message": e.errorMessage }, null, 8, ["error-message"])
    ],
    2
    /* CLASS */
  );
}
const ph = ne({
  name: c2,
  components: { MpFormDetails: Bn, MpRadio: ca, MaybeVNode: lr },
  props: dh,
  setup(e) {
    const { length: n, radios: t, bindRadios: o } = t2(), { bindForm: r } = jn(), {
      errorMessage: a,
      validateWithTrigger: i,
      validate: l,
      // expose
      resetValidation: s
    } = Un(), u = O(() => a.value), c = k(!1), d = {
      onToggle: y,
      validate: w,
      reset: $,
      resetValidation: s,
      hasChecked: O(() => c.value),
      errorMessage: u
    };
    pe(() => e.modelValue, v), pe(() => n.value, v), S(r, d), o(d), He(() => window, "keydown", p);
    function p(b) {
      const z = t.findIndex(({ isFocusing: P }) => P.value);
      if (!(z === -1 || !t.some(({ moveable: P }, B) => B === z ? !1 : P()))) {
        if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(b.key) && Re(b), b.key === "ArrowUp" || b.key === "ArrowLeft") {
          f(z, "prev");
          return;
        }
        (b.key === "ArrowDown" || b.key === "ArrowRight") && f(z, "next");
      }
    }
    function f(b, z) {
      for (; ; ) {
        z === "prev" ? b-- : b++, b < 0 && (b = t.length - 1), b > t.length - 1 && (b = 0);
        const P = t[b];
        if (P.moveable()) {
          P.move();
          break;
        }
      }
    }
    function h(b) {
      Ke(() => {
        const { validateTrigger: z, rules: D, modelValue: P } = e;
        i(z, b, D, P);
      });
    }
    function v() {
      t.forEach(({ sync: b }) => {
        b(e.modelValue) && (c.value = !0);
      });
    }
    function y(b) {
      S(e["onUpdate:modelValue"], b), S(e.onChange, b), h("onChange");
    }
    function w() {
      return l(e.rules, e.modelValue);
    }
    function $() {
      S(e["onUpdate:modelValue"], void 0), s();
    }
    return {
      errorMessage: a,
      n: d2,
      classes: p2,
      reset: $,
      validate: w,
      resetValidation: s,
      isFunction: vn
    };
  }
});
ph.render = f2;
var Ni = ph;
ae(Ni);
le(Ni, dh);
const RD = Ni;
var Ss = Ni;
const mh = {
  modelValue: {
    type: Number,
    default: 0
  },
  count: {
    type: [String, Number],
    default: 5
  },
  color: String,
  icon: {
    type: String,
    default: "star"
  },
  emptyIcon: {
    type: String,
    default: "star-outline"
  },
  halfIcon: {
    type: String,
    default: "star-half-full"
  },
  namespace: Le(dn, "namespace"),
  emptyIconNamespace: Le(dn, "namespace"),
  halfIconNamespace: Le(dn, "namespace"),
  emptyColor: String,
  size: [String, Number],
  gap: [String, Number],
  half: Boolean,
  disabled: Boolean,
  disabledColor: String,
  readonly: Boolean,
  ripple: {
    type: Boolean,
    default: !0
  },
  clearable: Boolean,
  rules: Array,
  onChange: R(),
  "onUpdate:modelValue": R()
}, { name: v2, n: Bo } = _("rate"), g2 = ["onClick"];
function h2(e, n) {
  const t = oe("mp-icon"), o = oe("mp-hover-overlay"), r = oe("mp-form-details"), a = Je("ripple"), i = Je("hover");
  return g(), C(
    "div",
    {
      class: m(e.n("wrap"))
    },
    [
      V(
        "div",
        {
          class: m(e.n())
        },
        [
          (g(!0), C(
            Ae,
            null,
            Xe(e.toNumber(e.count), (l) => Ue((g(), C("div", {
              key: l,
              style: G(e.getStyle(l)),
              class: m(e.getClass(l)),
              onClick: (s) => e.handleClick(l, s)
            }, [
              Z(t, {
                class: m(e.n("content-icon")),
                "mp-rate-cover": "",
                transition: 0,
                namespace: e.getCurrentState(l).namespace,
                name: e.getCurrentState(l).name,
                style: G({ fontSize: e.toSizeUnit(e.size) })
              }, null, 8, ["class", "namespace", "name", "style"]),
              Z(o, {
                hovering: e.hovering && l === e.currentHoveringValue && !e.disabled && !e.formDisabled
              }, null, 8, ["hovering"])
            ], 14, g2)), [
              [a, { disabled: e.formReadonly || e.readonly || e.formDisabled || e.disabled || !e.ripple }],
              [i, e.createHoverHandler(l), "desktop"]
            ])),
            128
            /* KEYED_FRAGMENT */
          ))
        ],
        2
        /* CLASS */
      ),
      Z(r, { "error-message": e.errorMessage }, null, 8, ["error-message"])
    ],
    2
    /* CLASS */
  );
}
const fh = ne({
  name: v2,
  components: {
    MpIcon: Qe,
    MpFormDetails: Bn,
    MpHoverOverlay: Vn
  },
  directives: { Ripple: an, Hover: In },
  props: mh,
  setup(e) {
    const n = k(-1), { form: t, bindForm: o } = jn(), { errorMessage: r, validateWithTrigger: a, validate: i, resetValidation: l } = Un(), { hovering: s } = _n();
    let u = Y(e.modelValue);
    S(o, {
      reset: b,
      validate: v,
      resetValidation: l
    });
    function d(z) {
      const { count: D, gap: P } = e;
      return {
        color: f(z).color,
        marginRight: z !== Y(D) ? Te(P) : 0
      };
    }
    function p(z) {
      const { name: D, color: P } = f(z);
      return {
        [Bo("content")]: !0,
        [Bo("--disabled")]: (t == null ? void 0 : t.disabled.value) || e.disabled,
        [Bo("--error")]: r.value,
        [Bo("--primary")]: D !== e.emptyIcon && !P
      };
    }
    function f(z) {
      const {
        modelValue: D,
        disabled: P,
        disabledColor: B,
        color: I,
        half: U,
        emptyColor: L,
        icon: W,
        halfIcon: N,
        emptyIcon: T,
        namespace: M,
        halfIconNamespace: j,
        emptyIconNamespace: E
      } = e;
      let J = I;
      return (P || t != null && t.disabled.value) && (J = B), z <= D ? { color: J, name: W, namespace: M } : U && z <= D + 0.5 ? { color: J, name: N, namespace: j } : {
        color: P || t != null && t.disabled.value ? B : L,
        name: T,
        namespace: E
      };
    }
    function h(z, D) {
      const { half: P, clearable: B } = e, { offsetWidth: I } = D.target;
      P && D.offsetX <= Math.floor(I / 2) && (z -= 0.5), u === z && B && (z = 0), u !== z && (S(e["onUpdate:modelValue"], z), S(e.onChange, z)), u = z;
    }
    function v() {
      return i(e.rules, e.modelValue);
    }
    function y() {
      Ke(() => a(["onChange"], "onChange", e.rules, e.modelValue));
    }
    function w(z, D) {
      const { readonly: P, disabled: B } = e;
      P || B || t != null && t.disabled.value || t != null && t.readonly.value || (h(z, D), y());
    }
    function $(z) {
      return (D) => {
        n.value = z, s.value = D;
      };
    }
    function b() {
      S(e["onUpdate:modelValue"], 0), l();
    }
    return {
      errorMessage: r,
      formDisabled: t == null ? void 0 : t.disabled,
      formReadonly: t == null ? void 0 : t.readonly,
      hovering: s,
      currentHoveringValue: n,
      getStyle: d,
      getClass: p,
      getCurrentState: f,
      handleClick: w,
      createHoverHandler: $,
      reset: b,
      validate: v,
      resetValidation: l,
      toSizeUnit: Te,
      toNumber: Y,
      n: Bo
    };
  }
});
fh.render = h2;
var Ri = fh;
ae(Ri);
le(Ri, mh);
const LD = Ri;
var zs = Ri;
const vh = {
  imageSize: [String, Number],
  type: {
    type: String,
    default: "success"
  },
  title: String,
  description: String,
  animation: {
    type: Boolean,
    default: !0
  }
}, b2 = { viewBox: "-4 -4 32 32" };
function y2(e, n) {
  return g(), C("svg", b2, n[0] || (n[0] = [
    V(
      "path",
      {
        fill: "currentColor",
        d: "M2,10.96C1.5,10.68 1.35,10.07 1.63,9.59L3.13,7C3.24,6.8 3.41,6.66 3.6,6.58L11.43,2.18C11.59,2.06 11.79,2 12,2C12.21,2 12.41,2.06 12.57,2.18L20.47,6.62C20.66,6.72 20.82,6.88 20.91,7.08L22.36,9.6C22.64,10.08 22.47,10.69 22,10.96L21,11.54V16.5C21,16.88 20.79,17.21 20.47,17.38L12.57,21.82C12.41,21.94 12.21,22 12,22C11.79,22 11.59,21.94 11.43,21.82L3.53,17.38C3.21,17.21 3,16.88 3,16.5V10.96C2.7,11.13 2.32,11.14 2,10.96M12,4.15V4.15L12,10.85V10.85L17.96,7.5L12,4.15M5,15.91L11,19.29V12.58L5,9.21V15.91M19,15.91V12.69L14,15.59C13.67,15.77 13.3,15.76 13,15.6V19.29L19,15.91M13.85,13.36L20.13,9.73L19.55,8.72L13.27,12.35L13.85,13.36Z"
      },
      null,
      -1
      /* HOISTED */
    )
  ]));
}
const gh = ne({});
gh.render = y2;
var w2 = gh;
const k2 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "2 2 20 20"
};
function $2(e, n) {
  return g(), C("svg", k2, n[0] || (n[0] = [
    V(
      "path",
      { d: "M19,3V5H19V19M17,8.4L13.4,12L17,15.6L15.6,17L12,13.4L8.4,17L7,15.6L10.6,12L7,8.4L8.4,7L12,10.6L15.6,7L17,8.4Z" },
      null,
      -1
      /* HOISTED */
    )
  ]));
}
const hh = ne({});
hh.render = $2;
var C2 = hh;
const S2 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "2 3.6 20 20"
};
function z2(e, n) {
  return g(), C("svg", S2, n[0] || (n[0] = [
    V(
      "path",
      { d: "M11,9H13V7H11M11,20H13V11H11V20Z" },
      null,
      -1
      /* HOISTED */
    )
  ]));
}
const bh = ne({});
bh.render = z2;
var P2 = bh;
const O2 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "-3 -3 30 30"
};
function E2(e, n) {
  return g(), C("svg", O2, n[0] || (n[0] = [
    V(
      "path",
      { d: "M10,19H13V22H10V19M12,2C17.35,2.22 19.68,7.62 16.5,11.67C15.67,12.67 14.33,13.33 13.67,14.17C13,15 13,16 13,17H10C10,15.33 10,13.92 10.67,12.92C11.33,11.92 12.67,11.33 13.5,10.67C15.92,8.43 15.32,5.26 12,5A3,3 0 0,0 9,8H6A6,6 0 0,1 12,2Z" },
      null,
      -1
      /* HOISTED */
    )
  ]));
}
const yh = ne({});
yh.render = E2;
var T2 = yh;
const { n: B2, classes: M2 } = _("result");
function D2(e, n) {
  return g(), C(
    Ae,
    null,
    [
      V(
        "span",
        {
          class: m(e.n("success-cover-left"))
        },
        null,
        2
        /* CLASS */
      ),
      V(
        "span",
        {
          class: m(e.classes(e.n("success-line"), e.n("success-line-tip"))),
          style: G({
            animationDuration: e.animation ? "760ms" : "0ms",
            borderRadius: `calc(${e.borderSize} * 0.625)`
          })
        },
        null,
        6
        /* CLASS, STYLE */
      ),
      V(
        "span",
        {
          class: m(e.classes(e.n("success-line"), e.n("success-line-long"))),
          style: G({
            animationDuration: e.animation ? "770ms" : "0ms",
            borderRadius: `calc(${e.borderSize} * 0.625)`
          })
        },
        null,
        6
        /* CLASS, STYLE */
      ),
      V(
        "span",
        {
          ref: "circle",
          class: m(e.n("success-circle")),
          style: G({ left: `-${e.borderSize}`, top: `-${e.borderSize}`, borderWidth: e.borderSize })
        },
        null,
        6
        /* CLASS, STYLE */
      ),
      V(
        "span",
        {
          class: m(e.n("success-line-fix"))
        },
        null,
        2
        /* CLASS */
      ),
      V(
        "span",
        {
          class: m(e.n("success-cover-right")),
          style: G({
            animationDuration: e.animation ? "4250ms" : "0ms"
          })
        },
        null,
        6
        /* CLASS, STYLE */
      )
    ],
    64
    /* STABLE_FRAGMENT */
  );
}
const wh = ne({
  props: {
    animation: {
      type: Boolean
    },
    borderSize: {
      type: String
    }
  },
  setup() {
    return {
      n: B2,
      classes: M2
    };
  }
});
wh.render = D2;
var I2 = wh;
const A2 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "-6 -4 35 35"
};
function N2(e, n) {
  return g(), C("svg", A2, n[0] || (n[0] = [
    V(
      "path",
      { d: "M10,21H14A2,2 0 0,1 12,23A2,2 0 0,1 10,21M21,19V20H3V19L5,17V11C5,7.9 7.03,5.17 10,4.29C10,4.19 10,4.1 10,4A2,2 0 0,1 12,2A2,2 0 0,1 14,4C14,4.1 14,4.19 14,4.29C16.97,5.17 19,7.9 19,11V17L21,19M17,11A5,5 0 0,0 12,6A5,5 0 0,0 7,11V18H17V11M19.75,3.19L18.33,4.61M1,11" },
      null,
      -1
      /* HOISTED */
    )
  ]));
}
const kh = ne({});
kh.render = N2;
var R2 = kh;
const { name: L2, n: V2, classes: F2 } = _("result");
function U2(e, n) {
  return g(), C(
    "div",
    {
      class: m(e.classes(e.n(), e.n("$--box")))
    },
    [
      F(e.$slots, "image", {}, () => [
        e.type ? (g(), C(
          "div",
          {
            key: 0,
            class: m(e.n("image-container"))
          },
          [
            V(
              "div",
              {
                class: m(e.classes(e.n("image"), e.n(e.type))),
                style: G({
                  width: e.circleSize,
                  height: e.circleSize,
                  borderWidth: e.borderSize
                })
              },
              [
                (g(), ke(xt(e.type), {
                  "border-size": e.borderSize,
                  animation: e.animation
                }, null, 8, ["border-size", "animation"]))
              ],
              6
              /* CLASS, STYLE */
            )
          ],
          2
          /* CLASS */
        )) : q("v-if", !0)
      ]),
      F(e.$slots, "title", {}, () => [
        e.title ? (g(), C(
          "div",
          {
            key: 0,
            class: m(e.n("title"))
          },
          se(e.title),
          3
          /* TEXT, CLASS */
        )) : q("v-if", !0)
      ]),
      F(e.$slots, "description", {}, () => [
        e.description ? (g(), C(
          "div",
          {
            key: 0,
            class: m(e.n("description"))
          },
          se(e.description),
          3
          /* TEXT, CLASS */
        )) : q("v-if", !0)
      ]),
      e.$slots.footer ? (g(), C(
        "div",
        {
          key: 0,
          class: m(e.n("footer"))
        },
        [
          F(e.$slots, "footer")
        ],
        2
        /* CLASS */
      )) : q("v-if", !0)
    ],
    2
    /* CLASS */
  );
}
const $h = ne({
  name: L2,
  components: {
    Info: P2,
    Success: I2,
    Warning: R2,
    Error: C2,
    Question: T2,
    Empty: w2
  },
  props: vh,
  setup(e) {
    const n = O(
      () => `calc(${e.imageSize ? Te(e.imageSize) : "var(--mp-result-image-size)"} * 0.9)`
    ), t = O(
      () => `calc(${e.imageSize ? Te(e.imageSize) : "var(--mp-result-image-size)"} * 0.05)`
    );
    return {
      circleSize: n,
      borderSize: t,
      n: V2,
      classes: F2
    };
  }
});
$h.render = U2;
var Li = $h;
ae(Li);
le(Li, vh);
const VD = Li;
var Ps = Li;
const Ch = {
  gutter: {
    type: [String, Number, Array],
    default: 0
  },
  justify: {
    type: String,
    default: "flex-start"
  },
  align: {
    type: String,
    default: "flex-start"
  },
  onClick: R()
}, { name: j2, n: H2, classes: Y2 } = _("row");
function W2(e, n) {
  return g(), C(
    "div",
    {
      class: m(e.classes(e.n(), e.n("$--box"))),
      style: G({
        justifyContent: e.padStartFlex(e.justify),
        alignItems: e.padStartFlex(e.align),
        margin: `${-e.average[0]}px ${-e.average[1]}px`
      }),
      onClick: n[0] || (n[0] = (...t) => e.handleClick && e.handleClick(...t))
    },
    [
      F(e.$slots, "default")
    ],
    6
    /* CLASS, STYLE */
  );
}
const Sh = ne({
  name: j2,
  props: Ch,
  setup(e) {
    const n = O(
      () => je(e.gutter) ? e.gutter.map((r) => tn(r) / 2) : [0, tn(e.gutter) / 2]
    ), { bindCols: t } = MS();
    t({ average: n });
    function o(r) {
      S(e.onClick, r);
    }
    return {
      average: n,
      n: H2,
      classes: Y2,
      handleClick: o,
      padStartFlex: Qr
    };
  }
});
Sh.render = W2;
var Vi = Sh;
ae(Vi);
le(Vi, Ch);
const FD = Vi;
var Os = Vi, K2 = Object.defineProperty, vp = Object.getOwnPropertySymbols, q2 = Object.prototype.hasOwnProperty, X2 = Object.prototype.propertyIsEnumerable, gp = (e, n, t) => n in e ? K2(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t, G2 = (e, n) => {
  for (var t in n || (n = {}))
    q2.call(n, t) && gp(e, t, n[t]);
  if (vp)
    for (var t of vp(n))
      X2.call(n, t) && gp(e, t, n[t]);
  return e;
};
const zh = G2({
  modelValue: {
    type: [String, Number, Boolean, Array],
    default: void 0
  },
  options: {
    type: Array,
    default: () => []
  },
  labelKey: {
    type: String,
    default: "label"
  },
  valueKey: {
    type: String,
    default: "value"
  },
  multiple: Boolean,
  offsetY: {
    type: [String, Number],
    default: 0
  },
  chip: Boolean,
  readonly: Boolean,
  separator: {
    type: String,
    default: ","
  },
  textAlign: {
    type: String,
    default: "left"
  },
  validateTrigger: {
    type: Array,
    default: () => ["onChange", "onClear", "onClose"]
  },
  rules: [Array, Function, Object],
  onFocus: R(),
  onBlur: R(),
  onClose: R(),
  onChange: R(),
  onClear: R(),
  "onUpdate:modelValue": R()
}, Le(za, [
  "size",
  "variant",
  "placeholder",
  "line",
  "hint",
  "textColor",
  "focusColor",
  "blurColor",
  "disabled",
  "clearable",
  "onClick"
])), { name: Z2, n: J2, classes: Q2 } = _("select"), x2 = ["tabindex"];
function _2(e, n) {
  const t = oe("maybe-v-node"), o = oe("mp-chip"), r = oe("mp-icon"), a = oe("mp-field-decorator"), i = oe("mp-option"), l = oe("mp-menu"), s = oe("mp-form-details");
  return g(), C("div", {
    ref: "root",
    class: m(e.n()),
    tabindex: e.disabled || e.formDisabled ? void 0 : "0",
    onFocus: n[3] || (n[3] = (...u) => e.handleFocus && e.handleFocus(...u)),
    onBlur: n[4] || (n[4] = (...u) => e.handleRootBlur && e.handleRootBlur(...u))
  }, [
    Z(l, {
      show: e.showMenu,
      "onUpdate:show": n[1] || (n[1] = (u) => e.showMenu = u),
      "mp-select-cover": "",
      "same-width": "",
      "close-on-click-reference": "",
      "close-on-key-escape": !1,
      class: m(e.n("menu")),
      "popover-class": e.variant === "standard" && e.hint ? e.n("--standard-menu-margin") : void 0,
      "offset-y": e.offsetY,
      disabled: e.formReadonly || e.readonly || e.formDisabled || e.disabled,
      placement: e.placement,
      "default-style": !1,
      onClickOutside: e.handleClickOutside
    }, {
      menu: ue(() => [
        V(
          "div",
          {
            ref: "menuEl",
            class: m(e.classes(e.n("scroller"), e.n("$-elevation--3")))
          },
          [
            e.options.length ? (g(!0), C(
              Ae,
              { key: 0 },
              Xe(e.options, (u) => (g(), ke(i, {
                key: u[e.valueKey],
                label: u[e.labelKey],
                value: u[e.valueKey],
                option: u,
                disabled: u.disabled,
                ripple: u.ripple
              }, null, 8, ["label", "value", "option", "disabled", "ripple"]))),
              128
              /* KEYED_FRAGMENT */
            )) : q("v-if", !0),
            F(e.$slots, "default")
          ],
          2
          /* CLASS */
        )
      ]),
      default: ue(() => [
        Z(
          a,
          Wt(pa({
            value: e.modelValue,
            size: e.size,
            variant: e.variant,
            placeholder: e.placeholder,
            line: e.line,
            hint: e.hint,
            textColor: e.textColor,
            focusColor: e.focusColor,
            blurColor: e.blurColor,
            isFocusing: e.isFocusing,
            isError: !!e.errorMessage,
            formDisabled: e.formDisabled,
            disabled: e.disabled,
            clearable: e.clearable,
            cursor: e.cursor,
            onClick: e.handleClick,
            onClear: e.handleClear
          })),
          qt({
            "clear-icon": ue(({ clear: u }) => [
              F(e.$slots, "clear-icon", { clear: u })
            ]),
            "append-icon": ue(() => [
              F(e.$slots, "append-icon")
            ]),
            default: ue(() => [
              V(
                "div",
                {
                  class: m(e.classes(e.n("select"), [e.errorMessage, e.n("--error")], [e.formDisabled || e.disabled, e.n("--disabled")])),
                  style: G({
                    textAlign: e.textAlign,
                    color: e.textColor
                  })
                },
                [
                  V(
                    "div",
                    {
                      class: m(e.n("label"))
                    },
                    [
                      e.isEmptyModelValue ? q("v-if", !0) : F(e.$slots, "selected", { key: 0 }, () => [
                        e.multiple ? (g(), C(
                          Ae,
                          { key: 0 },
                          [
                            e.chip ? (g(), C(
                              "div",
                              {
                                key: 0,
                                class: m(e.n("chips"))
                              },
                              [
                                (g(!0), C(
                                  Ae,
                                  null,
                                  Xe(e.labels, (u) => (g(), ke(o, {
                                    key: u,
                                    class: m(e.n("chip")),
                                    "mp-select-cover": "",
                                    closeable: "",
                                    size: "small",
                                    type: e.errorMessage ? "danger" : void 0,
                                    onClick: n[0] || (n[0] = Tn(() => {
                                    }, ["stop"])),
                                    onClose: () => e.handleClose(u)
                                  }, {
                                    default: ue(() => [
                                      Z(t, { is: u }, null, 8, ["is"])
                                    ]),
                                    _: 2
                                    /* DYNAMIC */
                                  }, 1032, ["class", "type", "onClose"]))),
                                  128
                                  /* KEYED_FRAGMENT */
                                ))
                              ],
                              2
                              /* CLASS */
                            )) : (g(), C(
                              "div",
                              {
                                key: 1,
                                class: m(e.n("values"))
                              },
                              [
                                (g(!0), C(
                                  Ae,
                                  null,
                                  Xe(e.labels, (u, c) => (g(), C(
                                    Ae,
                                    { key: u },
                                    [
                                      Z(t, { is: u }, null, 8, ["is"]),
                                      De(
                                        se(c !== e.labels.length - 1 ? e.separator : ""),
                                        1
                                        /* TEXT */
                                      )
                                    ],
                                    64
                                    /* STABLE_FRAGMENT */
                                  ))),
                                  128
                                  /* KEYED_FRAGMENT */
                                ))
                              ],
                              2
                              /* CLASS */
                            ))
                          ],
                          64
                          /* STABLE_FRAGMENT */
                        )) : (g(), ke(t, {
                          key: 1,
                          is: e.label
                        }, null, 8, ["is"]))
                      ])
                    ],
                    2
                    /* CLASS */
                  ),
                  e.enableCustomPlaceholder ? (g(), C(
                    "span",
                    {
                      key: 0,
                      class: m(e.classes(e.n("placeholder"), e.n("$--ellipsis"))),
                      style: G({
                        color: e.placeholderColor
                      })
                    },
                    se(e.placeholder),
                    7
                    /* TEXT, CLASS, STYLE */
                  )) : q("v-if", !0),
                  F(e.$slots, "arrow-icon", {
                    focus: e.isFocusing,
                    menuOpen: e.showMenu
                  }, () => [
                    Z(r, {
                      class: m(e.classes(e.n("arrow"), [e.showMenu, e.n("--arrow-rotate")])),
                      "mp-select-cover": "",
                      name: "menu-down",
                      transition: 300
                    }, null, 8, ["class"])
                  ])
                ],
                6
                /* CLASS, STYLE */
              )
            ]),
            _: 2
            /* DYNAMIC */
          }, [
            e.$slots["prepend-icon"] ? {
              name: "prepend-icon",
              fn: ue(() => [
                F(e.$slots, "prepend-icon")
              ]),
              key: "0"
            } : void 0
          ]),
          1040
          /* FULL_PROPS, DYNAMIC_SLOTS */
        )
      ]),
      _: 3
      /* FORWARDED */
    }, 8, ["show", "class", "popover-class", "offset-y", "disabled", "placement", "onClickOutside"]),
    Z(s, {
      "error-message": e.errorMessage,
      onClick: n[2] || (n[2] = Tn(() => {
      }, ["stop"]))
    }, null, 8, ["error-message"])
  ], 42, x2);
}
const Ph = ne({
  name: Z2,
  components: {
    MpIcon: Qe,
    MpMenu: Wo,
    MpChip: na,
    MpOption: ua,
    MpFieldDecorator: Uo,
    MpFormDetails: Bn,
    MaybeVNode: lr
  },
  props: zh,
  setup(e) {
    const n = k(!1), t = k(!1), o = k(null), r = O(() => e.multiple), a = O(() => e.focusColor), i = O(() => Wn(e.modelValue)), l = O(() => e.disabled || e.readonly ? "" : "pointer"), s = k(0), { bindForm: u, form: c } = jn(), { length: d, options: p, bindOptions: f } = dO(), { label: h, labels: v, computeLabel: y, getSelectedValue: w } = Sf({
      modelValue: () => e.modelValue,
      multiple: () => e.multiple,
      optionProviders: () => p,
      optionProvidersLength: () => d.value
    }), {
      errorMessage: $,
      validateWithTrigger: b,
      validate: z,
      // expose
      resetValidation: D
    } = Un(), P = k(null), B = O(() => e.variant === "outlined" ? "bottom" : "cover-top"), I = O(() => {
      const { hint: A, blurColor: K, focusColor: me } = e;
      if (!A)
        return $.value ? "var(--mp-field-decorator-error-color)" : n.value ? me || "var(--mp-field-decorator-focus-color)" : K || "var(--mp-field-decorator-placeholder-color, var(--mp-field-decorator-blur-color))";
    }), U = O(() => !e.hint && Wn(e.modelValue)), L = {
      multiple: r,
      focusColor: a,
      computeLabel: y,
      onSelect: X,
      reset: ve,
      validate: re,
      resetValidation: D
    };
    pe(
      () => e.multiple,
      () => {
        Xn(
          e.multiple && je(e.modelValue),
          "Select",
          "The modelValue must be an array when multiple is true"
        );
      }
    ), f(L), He(() => window, "keydown", W), He(() => window, "keyup", N), S(u, L);
    function W(A) {
      const { disabled: K, readonly: me } = e;
      if (c != null && c.disabled.value || c != null && c.readonly.value || K || me || !n.value)
        return;
      const { key: Se } = A;
      if (Se === " " && !t.value) {
        Re(A);
        return;
      }
      if (Se === "Escape" && t.value) {
        o.value.focus(), Re(A), t.value = !1;
        return;
      }
      if (Se === "Tab" && t.value) {
        o.value.focus(), Re(A), j();
        return;
      }
      if (Se === "Enter" && !t.value) {
        Re(A), t.value = !0;
        return;
      }
      (Se === "ArrowDown" || Se === "ArrowUp") && t.value && (Re(A), gu(o.value, P.value, Se));
    }
    function N(A) {
      const { disabled: K, readonly: me } = e;
      if (c != null && c.disabled.value || c != null && c.readonly.value || K || me || t.value || !n.value)
        return;
      const { key: Se } = A;
      Se === " " && !t.value && (Re(A), t.value = !0);
    }
    function T(A) {
      Ke(() => {
        const { validateTrigger: K, rules: me, modelValue: Se } = e;
        b(K, A, me, Se);
      });
    }
    function M() {
      const { disabled: A, readonly: K, onFocus: me } = e;
      c != null && c.disabled.value || c != null && c.readonly.value || A || K || (s.value = tn(e.offsetY), H(), S(me), T("onFocus"));
    }
    function j() {
      const { disabled: A, readonly: K, onBlur: me } = e;
      c != null && c.disabled.value || c != null && c.readonly.value || A || K || (x(), S(me), T("onBlur"));
    }
    function E() {
      t.value || j();
    }
    function J() {
      n.value && j();
    }
    function X(A) {
      const { disabled: K, readonly: me, multiple: Se, onChange: Ve } = e;
      if (c != null && c.disabled.value || c != null && c.readonly.value || K || me)
        return;
      const We = w(A);
      S(e["onUpdate:modelValue"], We), S(Ve, We), T("onChange"), Se || (o.value.focus(), bn().then(() => {
        t.value = !1;
      }));
    }
    function te() {
      const { disabled: A, readonly: K, multiple: me, clearable: Se, onClear: Ve, onChange: We } = e;
      if (c != null && c.disabled.value || c != null && c.readonly.value || A || K || !Se)
        return;
      const on = me ? [] : void 0;
      S(e["onUpdate:modelValue"], on), S(Ve, on), T("onClear"), S(We, on), T("onChange");
    }
    function he(A) {
      const { disabled: K, onClick: me } = e;
      c != null && c.disabled.value || K || (S(me, A), T("onClick"));
    }
    function Ie(A) {
      const { disabled: K, readonly: me, modelValue: Se, onClose: Ve, onChange: We } = e;
      if (c != null && c.disabled.value || c != null && c.readonly.value || K || me)
        return;
      const on = p.find(({ label: Sn }) => Sn.value === A), gn = Se.filter(
        (Sn) => {
          var hn;
          return Sn !== ((hn = on.value.value) != null ? hn : on.label.value);
        }
      );
      S(e["onUpdate:modelValue"], gn), S(Ve, gn), T("onClose"), S(We, gn), T("onChange");
    }
    function H() {
      s.value = tn(e.offsetY), n.value = !0;
    }
    function x() {
      n.value = !1, t.value = !1;
    }
    function re() {
      return z(e.rules, e.modelValue);
    }
    function ve() {
      S(e["onUpdate:modelValue"], e.multiple ? [] : void 0), D();
    }
    return {
      root: o,
      offsetY: s,
      isFocusing: n,
      showMenu: t,
      errorMessage: $,
      formDisabled: c == null ? void 0 : c.disabled,
      formReadonly: c == null ? void 0 : c.readonly,
      label: h,
      labels: v,
      isEmptyModelValue: i,
      menuEl: P,
      placement: B,
      cursor: l,
      placeholderColor: I,
      enableCustomPlaceholder: U,
      isFunction: vn,
      n: J2,
      classes: Q2,
      handleFocus: M,
      handleBlur: j,
      handleClickOutside: J,
      handleClear: te,
      handleClick: he,
      handleClose: Ie,
      handleRootBlur: E,
      reset: ve,
      validate: re,
      resetValidation: D,
      focus: H,
      blur: x
    };
  }
});
Ph.render = _2;
var Fi = Ph;
ae(Fi);
le(Fi, zh);
const UD = Fi;
var Es = Fi;
const Oh = {
  lineWidth: {
    type: [Number, String],
    default: 2
  },
  strokeStyle: {
    type: String,
    default: "currentColor"
  },
  dataUrlType: {
    type: String,
    default: "png"
  },
  onStart: R(),
  onEnd: R(),
  onSigning: R()
}, { name: e8, n: n8 } = _("signature"), t8 = ["height", "width"];
function o8(e, n) {
  return g(), C(
    "div",
    {
      ref: "root",
      class: m(e.n())
    },
    [
      V("canvas", {
        ref: "canvas",
        height: e.canvasHeight,
        width: e.canvasWidth
      }, null, 8, t8)
    ],
    2
    /* CLASS */
  );
}
const Eh = ne({
  name: e8,
  props: Oh,
  setup(e) {
    const n = k(), t = k(), o = k(0), r = k(0);
    let a = !1, i = null;
    He(t, "touchstart", s), He(t, "touchmove", u), He(t, "touchend", c), nt(l), ht(l);
    function l() {
      !t.value || !n.value || (i = t.value.getContext("2d"), o.value = n.value.offsetWidth, r.value = n.value.offsetHeight);
    }
    function s(v) {
      !i || !n.value || (v.preventDefault(), a = !0, i.beginPath(), i.lineWidth = Y(e.lineWidth), i.strokeStyle = e.strokeStyle === "currentColor" ? Zn(n.value).color : e.strokeStyle, S(e.onStart));
    }
    function u(v) {
      if (v.preventDefault(), !t.value || !i || !a)
        return;
      const y = v.touches[0].clientX, w = v.touches[0].clientY, $ = nn(t.value), b = y - $.left, z = w - $.top;
      i.lineTo(b, z), i.stroke(), S(e.onSigning);
    }
    function c(v) {
      a && (v.preventDefault(), a = !1, S(e.onEnd));
    }
    function d(v) {
      switch (e.dataUrlType) {
        case "jpg":
          return v.toDataURL("image/jpeg");
        default:
          return v.toDataURL("image/png");
      }
    }
    function p(v) {
      if (!v)
        return !0;
      const y = document.createElement("canvas");
      return y.width = v.width, y.height = v.height, d(v) === d(y);
    }
    function f() {
      i && (a = !1, i.clearRect(0, 0, o.value, r.value), i.closePath());
    }
    function h() {
      if (t.value)
        return p(t.value) ? "" : d(t.value);
    }
    return {
      root: n,
      canvas: t,
      canvasWidth: o,
      canvasHeight: r,
      n: n8,
      confirm: h,
      reset: f
    };
  }
});
Eh.render = o8;
var Ui = Eh;
ae(Ui);
le(Ui, Oh);
const jD = Ui;
var Ts = Ui;
const Th = {
  loading: {
    type: Boolean,
    default: !0
  },
  title: Boolean,
  card: Boolean,
  avatar: Boolean,
  fullscreen: Boolean,
  fullscreenZIndex: {
    type: [Number, String],
    default: 100
  },
  titleWidth: [Number, String],
  cardHeight: [Number, String],
  avatarSize: [Number, String],
  rows: {
    type: [Number, String],
    default: 3
  },
  rowsWidth: {
    type: Array,
    default: () => []
  }
}, { name: r8, n: a8, classes: i8 } = _("skeleton");
function l8(e, n) {
  return g(), C(
    "div",
    {
      class: m(e.classes(e.n("$--box"), e.n()))
    },
    [
      e.loading ? q("v-if", !0) : (g(), C(
        "div",
        {
          key: 0,
          class: m(e.n("data"))
        },
        [
          F(e.$slots, "default")
        ],
        2
        /* CLASS */
      )),
      e.loading && !e.fullscreen ? (g(), C(
        "div",
        {
          key: 1,
          class: m(e.n("content"))
        },
        [
          e.card ? (g(), C(
            "div",
            {
              key: 0,
              class: m(e.n("card")),
              style: G({ height: e.toSizeUnit(e.cardHeight) })
            },
            [
              V(
                "div",
                {
                  class: m(e.n("--animation"))
                },
                null,
                2
                /* CLASS */
              )
            ],
            6
            /* CLASS, STYLE */
          )) : q("v-if", !0),
          e.avatar || e.title || e.toNumber(e.rows) > 0 ? (g(), C(
            "div",
            {
              key: 1,
              class: m(e.n("article"))
            },
            [
              e.avatar ? (g(), C(
                "div",
                {
                  key: 0,
                  class: m(e.n("avatar")),
                  style: G({
                    width: e.toSizeUnit(e.avatarSize),
                    height: e.toSizeUnit(e.avatarSize)
                  })
                },
                [
                  V(
                    "div",
                    {
                      class: m(e.n("--animation"))
                    },
                    null,
                    2
                    /* CLASS */
                  )
                ],
                6
                /* CLASS, STYLE */
              )) : q("v-if", !0),
              e.title || e.toNumber(e.rows) > 0 ? (g(), C(
                "div",
                {
                  key: 1,
                  class: m(e.n("section"))
                },
                [
                  e.title ? (g(), C(
                    "div",
                    {
                      key: 0,
                      class: m(e.n("title")),
                      style: G({ width: e.toSizeUnit(e.titleWidth) })
                    },
                    [
                      V(
                        "div",
                        {
                          class: m(e.n("--animation"))
                        },
                        null,
                        2
                        /* CLASS */
                      )
                    ],
                    6
                    /* CLASS, STYLE */
                  )) : q("v-if", !0),
                  (g(!0), C(
                    Ae,
                    null,
                    Xe(e.toNumber(e.rows), (t, o) => (g(), C(
                      "div",
                      {
                        key: t,
                        class: m(e.n("row")),
                        style: G({ width: e.toSizeUnit(e.rowsWidth[o]) })
                      },
                      [
                        V(
                          "div",
                          {
                            class: m(e.n("--animation"))
                          },
                          null,
                          2
                          /* CLASS */
                        )
                      ],
                      6
                      /* CLASS, STYLE */
                    ))),
                    128
                    /* KEYED_FRAGMENT */
                  ))
                ],
                2
                /* CLASS */
              )) : q("v-if", !0)
            ],
            2
            /* CLASS */
          )) : q("v-if", !0)
        ],
        2
        /* CLASS */
      )) : q("v-if", !0),
      e.loading && e.fullscreen ? (g(), C(
        "div",
        {
          key: 2,
          class: m(e.n("fullscreen")),
          style: G({ zIndex: e.toNumber(e.fullscreenZIndex) })
        },
        [
          V(
            "div",
            {
              class: m(e.n("--animation"))
            },
            null,
            2
            /* CLASS */
          )
        ],
        6
        /* CLASS, STYLE */
      )) : q("v-if", !0)
    ],
    2
    /* CLASS */
  );
}
const Bh = ne({
  name: r8,
  props: Th,
  setup: () => ({
    n: a8,
    classes: i8,
    toSizeUnit: Te,
    toNumber: Y
  })
});
Bh.render = l8;
var ji = Bh;
ae(ji);
le(ji, Th);
const HD = ji;
var Bs = ji, cn = /* @__PURE__ */ ((e) => (e.First = "1", e.Second = "2", e))(cn || {});
const Mh = {
  modelValue: {
    type: [Number, Array],
    default: 0
  },
  step: {
    type: [Number, String],
    default: 1
  },
  range: Boolean,
  labelVisible: {
    type: String,
    default: "normal"
  },
  activeColor: String,
  trackColor: String,
  thumbColor: String,
  labelColor: String,
  labelTextColor: String,
  trackHeight: [String, Number],
  max: {
    type: [String, Number],
    default: 100
  },
  min: {
    type: [String, Number],
    default: 0
  },
  thumbSize: [String, Number],
  disabled: Boolean,
  readonly: Boolean,
  direction: {
    type: String,
    default: "horizontal"
  },
  rules: [Array, Function, Object],
  onChange: R(),
  onStart: R(),
  onEnd: R(),
  "onUpdate:modelValue": R()
}, { name: s8, n: hp, classes: u8 } = _("slider"), c8 = ["tabindex", "aria-valuemin", "aria-valuemax", "aria-valuenow", "aria-disabled", "aria-valuetext", "onTouchstart", "onFocusin", "onFocusout"];
function d8(e, n) {
  const t = oe("mp-hover-overlay"), o = oe("mp-form-details"), r = Je("hover");
  return g(), C(
    "div",
    {
      class: m(e.classes(e.n(e.direction), e.n("$--box")))
    },
    [
      V(
        "div",
        {
          ref: "sliderEl",
          class: m(e.classes(e.n(`${e.direction}-block`), [e.isDisabled, e.n("--disabled")], [e.errorMessage, e.n(`${e.direction}--error`)])),
          onClick: n[1] || (n[1] = (...a) => e.handleClick && e.handleClick(...a))
        },
        [
          V(
            "div",
            {
              class: m(e.n(`${e.direction}-track`))
            },
            [
              V(
                "div",
                {
                  class: m(e.n(`${e.direction}-track-background`)),
                  style: G({
                    background: e.trackColor,
                    height: e.isVertical ? "100%" : e.toSizeUnit(e.trackHeight),
                    width: e.isVertical ? e.toSizeUnit(e.trackHeight) : "100%"
                  })
                },
                null,
                6
                /* CLASS, STYLE */
              ),
              V(
                "div",
                {
                  class: m(e.n(`${e.direction}-track-fill`)),
                  style: G(e.getFillStyle)
                },
                null,
                6
                /* CLASS, STYLE */
              )
            ],
            2
            /* CLASS */
          ),
          (g(!0), C(
            Ae,
            null,
            Xe(e.thumbList, (a) => (g(), C("div", {
              key: a.enumValue,
              class: m(e.n(`${e.direction}-thumb`)),
              style: G(e.thumbStyle(a)),
              tabindex: e.isDisabled ? void 0 : "0",
              role: "slider",
              "aria-valuemin": e.min,
              "aria-valuemax": e.max,
              "aria-valuenow": a.value,
              "aria-disabled": e.isDisabled,
              "aria-valuetext": `${a.text}`,
              onTouchstart: Tn((i) => e.start(i, a.enumValue), ["stop"]),
              onTouchmove: n[0] || (n[0] = Tn((...i) => e.move && e.move(...i), ["stop"])),
              onFocusin: (i) => e.handleFocus(a),
              onFocusout: (i) => e.handleBlur(a)
            }, [
              F(e.$slots, "button", {
                currentValue: a.text
              }, () => [
                Ue(V(
                  "div",
                  {
                    class: m(e.n(`${e.direction}-thumb-block`)),
                    style: G({
                      background: e.thumbColor
                    })
                  },
                  null,
                  6
                  /* CLASS, STYLE */
                ), [
                  [r, (i) => e.hover(i, a), "desktop"]
                ]),
                V(
                  "div",
                  {
                    class: m(
                      e.classes(e.n(`${e.direction}-thumb-ripple`), [
                        e.thumbsProps[a.enumValue].active,
                        e.n(`${e.direction}-thumb-ripple--active`)
                      ])
                    ),
                    style: G({
                      background: e.thumbsProps[a.enumValue].active ? e.thumbColor : void 0
                    })
                  },
                  [
                    Z(t, {
                      hovering: !e.isDisabled && a.hovering,
                      focusing: !e.isDisabled && a.focusing
                    }, null, 8, ["hovering", "focusing"])
                  ],
                  6
                  /* CLASS, STYLE */
                ),
                V(
                  "div",
                  {
                    class: m(
                      e.classes(e.n(`${e.direction}-thumb-label`), [e.showLabel(a.enumValue), e.n(`${e.direction}-thumb-label--active`)])
                    ),
                    style: G({
                      background: e.labelColor,
                      color: e.labelTextColor,
                      height: e.toSizeUnit(e.thumbSize),
                      width: e.toSizeUnit(e.thumbSize)
                    })
                  },
                  [
                    V(
                      "span",
                      null,
                      se(a.text),
                      1
                      /* TEXT */
                    )
                  ],
                  6
                  /* CLASS, STYLE */
                )
              ])
            ], 46, c8))),
            128
            /* KEYED_FRAGMENT */
          ))
        ],
        2
        /* CLASS */
      ),
      Z(o, {
        "error-message": e.errorMessage,
        class: m(e.n("form")),
        "mp-slider-cover": ""
      }, null, 8, ["error-message", "class"])
    ],
    2
    /* CLASS */
  );
}
const Dh = ne({
  name: s8,
  components: {
    MpFormDetails: Bn,
    MpHoverOverlay: Vn
  },
  directives: { Hover: In },
  props: Mh,
  setup(e) {
    const n = k(0), t = k(null), o = k(!1), r = O(() => Y(e.max) - Y(e.min)), a = O(() => n.value / r.value * Y(e.step)), i = O(() => e.disabled || (p == null ? void 0 : p.disabled.value)), l = O(() => e.readonly || (p == null ? void 0 : p.readonly.value)), s = O(() => e.direction === "vertical"), u = k(!1), c = k(!1), { bindForm: d, form: p } = jn(), { errorMessage: f, validateWithTrigger: h, validate: v, resetValidation: y } = Un(), { hovering: w, handleHovering: $ } = _n(), { hovering: b, handleHovering: z } = _n(), D = O(() => {
      const { modelValue: de, range: we } = e;
      let Ce = [];
      return we && je(de) ? Ce = [
        {
          value: J(de[0]),
          enumValue: cn.First,
          text: X(de[0]),
          hovering: w.value,
          focusing: u.value,
          handleHovering: $,
          handleFocusing(Fe) {
            u.value = Fe;
          }
        },
        {
          value: J(de[1]),
          enumValue: cn.Second,
          text: X(de[1]),
          hovering: b.value,
          focusing: c.value,
          handleHovering: z,
          handleFocusing(Fe) {
            c.value = Fe;
          }
        }
      ] : zn(de) && (Ce = [
        {
          value: J(de),
          enumValue: cn.First,
          text: X(de),
          hovering: w.value,
          focusing: u.value,
          handleHovering: $,
          handleFocusing(Fe) {
            u.value = Fe;
          }
        }
      ]), Ce;
    }), P = O(() => {
      const { activeColor: de, range: we, modelValue: Ce } = e, Fe = we && je(Ce) ? J(Math.min(Ce[0], Ce[1])) : 0, qe = we && je(Ce) ? J(Math.max(Ce[0], Ce[1])) - Fe : J(Ce);
      return s.value ? {
        left: "0px",
        height: `${qe}%`,
        bottom: `${Fe}%`,
        background: de
      } : {
        top: "0px",
        width: `${qe}%`,
        left: `${Fe}%`,
        background: de
      };
    }), B = en({
      [cn.First]: N(),
      [cn.Second]: N()
    });
    let I;
    S(d, {
      reset: on,
      validate: W,
      resetValidation: y
    }), pe([() => e.modelValue, () => e.step], ([de, we]) => {
      !Se() || !Ve() || o.value || We(de, Y(we));
    }), pe(n, () => We()), yn(() => {
      !Se() || !Ve() || L();
    }), da(re), He(() => window, "keydown", Sn), nt(L);
    function L() {
      n.value = t.value[s.value ? "offsetHeight" : "offsetWidth"];
    }
    function W() {
      return v(e.rules, e.modelValue);
    }
    function N() {
      return {
        startPosition: 0,
        currentOffset: 0,
        active: !1,
        percentValue: 0
      };
    }
    function T() {
      Ke(() => h(["onChange"], "onChange", e.rules, e.modelValue));
    }
    function M(de) {
      const we = de.currentTarget;
      return we ? s.value ? n.value - (de.clientY - nn(we).top) : de.clientX - Ty(we) : 0;
    }
    function j(de) {
      return {
        [s.value ? "bottom" : "left"]: `${de.value}%`,
        zIndex: B[de.enumValue].active ? 1 : void 0
      };
    }
    function E(de) {
      return e.labelVisible === "always" ? !0 : e.labelVisible === "never" ? !1 : B[de].active;
    }
    function J(de) {
      const { min: we, max: Ce } = e;
      return de < Y(we) ? 0 : de > Y(Ce) ? 100 : (de - Y(we)) / r.value * 100;
    }
    function X(de) {
      if (!zn(de))
        return 0;
      const we = $n(de, Y(e.min), Y(e.max));
      return parseInt(`${we}`, 10) === we ? we : Y(we.toPrecision(5));
    }
    function te(de, we) {
      i.value || we.handleHovering(de);
    }
    function he(de) {
      S(e.onChange, de), S(e["onUpdate:modelValue"], de), T();
    }
    function Ie(de, we) {
      let Ce = [];
      const { step: Fe, range: qe, modelValue: ie, min: $e } = e, Oe = Y(Fe), Q = Math.round(de / a.value), fe = Q * Oe + Y($e), Ee = B[we].percentValue * Oe + Y($e);
      if (B[we].percentValue = Q, qe && je(ie) && (Ce = we === cn.First ? [fe, ie[1]] : [ie[0], fe]), Ee !== fe) {
        const Me = qe ? Ce.map((Ne) => X(Ne)) : X(fe);
        he(Me);
      }
    }
    function H(de) {
      if (!e.range)
        return cn.First;
      const we = B[cn.First].percentValue * a.value, Ce = B[cn.Second].percentValue * a.value, Fe = Math.abs(de - we), qe = Math.abs(de - Ce);
      return Fe <= qe ? cn.First : cn.Second;
    }
    function x() {
      document.addEventListener("touchmove", A, { passive: !1 }), document.addEventListener("touchend", K), document.addEventListener("touchcancel", K);
    }
    function re() {
      document.removeEventListener("touchmove", A), document.removeEventListener("touchend", K), document.removeEventListener("touchcancel", K);
    }
    function ve(de, we) {
      if (L(), i.value || (B[we].active = !0), I = we, x(), i.value || l.value)
        return;
      S(e.onStart), o.value = !0;
      const { clientX: Ce, clientY: Fe } = de.touches[0];
      B[we].startPosition = s.value ? Fe : Ce;
    }
    function A(de) {
      if (Re(de), i.value || l.value || !o.value)
        return;
      const { startPosition: we, currentOffset: Ce } = B[I], { clientX: Fe, clientY: qe } = de.touches[0];
      let ie = (s.value ? we - qe : Fe - we) + Ce;
      ie <= 0 ? ie = 0 : ie >= n.value && (ie = n.value), Ie(ie, I);
    }
    function K() {
      re();
      const { range: de, modelValue: we, onEnd: Ce, step: Fe, min: qe } = e;
      if (i.value || (B[I].active = !1), i.value || l.value)
        return;
      let ie = [];
      B[I].currentOffset = B[I].percentValue * a.value;
      const $e = B[I].percentValue * Y(Fe) + Y(qe);
      de && je(we) && (ie = I === cn.First ? [$e, we[1]] : [we[0], $e]), S(Ce, de ? ie : $e), o.value = !1;
    }
    function me(de) {
      if (i.value || l.value || de.target.closest(`.${hp("thumb")}`))
        return;
      const we = M(de), Ce = H(we);
      I = Ce, Ie(we, Ce), K();
    }
    function Se() {
      return Y(e.step) <= 0 ? (D0("Slider", '"step" should be > 0'), !1) : !0;
    }
    function Ve() {
      const { range: de, modelValue: we } = e;
      return de && !je(we) ? (uo("Slider", '"modelValue" should be an Array'), !1) : !de && je(we) ? (uo("Slider", '"modelValue" should be a Number'), !1) : de && je(we) && we.length < 2 ? (uo("Slider", '"modelValue" should have two value'), !1) : !0;
    }
    function We(de = e.modelValue, we = Y(e.step)) {
      const Ce = (Fe) => {
        const { min: qe, max: ie } = e;
        return Fe < Y(qe) ? 0 : Fe > Y(ie) ? r.value / we : (Fe - Y(qe)) / we;
      };
      e.range && je(de) ? (B[cn.First].percentValue = Ce(de[0]), B[cn.First].currentOffset = B[cn.First].percentValue * a.value, B[cn.Second].percentValue = Ce(de[1]), B[cn.Second].currentOffset = B[cn.Second].percentValue * a.value) : zn(de) && (B[cn.First].currentOffset = Ce(de) * a.value);
    }
    function on() {
      const de = e.range ? [0, 0] : 0;
      S(e["onUpdate:modelValue"], de), y();
    }
    function gn(de, we) {
      const Ce = Y(e.step);
      if (je(we)) {
        const Fe = we[0] + (u.value ? de * Ce : 0), qe = we[1] + (c.value ? de * Ce : 0);
        return [Fe, qe].map(X);
      }
      return X(we + de * Ce);
    }
    function Sn(de) {
      const we = {
        ArrowRight: 1,
        ArrowUp: 1,
        ArrowLeft: -1,
        ArrowDown: -1
      }, { key: Ce } = de;
      if (!Xt(we, Ce) || l.value || i.value || e.range && !u.value && !c.value || !e.range && !u.value)
        return;
      Re(de);
      const Fe = we[Ce], qe = gn(Fe, e.modelValue);
      he(qe);
    }
    function hn(de) {
      i.value || de.handleFocusing(!0);
    }
    function Yt(de) {
      de.handleFocusing(!1);
    }
    return {
      sliderEl: t,
      getFillStyle: P,
      isDisabled: i,
      isVertical: s,
      errorMessage: f,
      thumbsProps: B,
      thumbList: D,
      handleFocus: hn,
      handleBlur: Yt,
      n: hp,
      classes: u8,
      thumbStyle: j,
      hover: te,
      toSizeUnit: Te,
      toNumber: Y,
      showLabel: E,
      start: ve,
      move: A,
      end: K,
      handleClick: me
    };
  }
});
Dh.render = d8;
var Hi = Dh;
ae(Hi);
le(Hi, Mh);
const YD = Hi;
var Ms = Hi, p8 = Object.defineProperty, m8 = Object.defineProperties, f8 = Object.getOwnPropertyDescriptors, bp = Object.getOwnPropertySymbols, v8 = Object.prototype.hasOwnProperty, g8 = Object.prototype.propertyIsEnumerable, yp = (e, n, t) => n in e ? p8(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t, h8 = (e, n) => {
  for (var t in n || (n = {}))
    v8.call(n, t) && yp(e, t, n[t]);
  if (bp)
    for (var t of bp(n))
      g8.call(n, t) && yp(e, t, n[t]);
  return e;
}, b8 = (e, n) => m8(e, f8(n));
const Vu = {
  type: String,
  position: {
    type: String,
    default: "top"
  },
  content: [String, Function, Object],
  contentClass: String,
  duration: {
    type: Number,
    default: 3e3
  },
  elevation: {
    type: [Boolean, String, Number],
    default: !0
  },
  vertical: Boolean,
  loadingType: Le(ut, "type"),
  loadingSize: Le(ut, "size"),
  loadingRadius: Le(ut, "radius"),
  loadingColor: b8(h8({}, Le(ut, "color")), {
    default: "currentColor"
  }),
  lockScroll: Boolean,
  show: Boolean,
  teleport: {
    type: [String, Object, Boolean],
    default: "body"
  },
  forbidClick: Boolean,
  onOpen: R(),
  onOpened: R(),
  onClose: R(),
  onClosed: R(),
  "onUpdate:show": R(),
  _update: String
}, { n: y8, classes: w8 } = _("snackbar"), k8 = {
  success: "checkbox-marked-circle",
  warning: "warning",
  info: "information",
  error: "error",
  loading: ""
};
function $8(e, n) {
  const t = oe("mp-icon"), o = oe("mp-loading");
  return Ue((g(), C(
    "div",
    {
      class: m(e.n()),
      style: G({ pointerEvents: e.isForbidClick ? "auto" : "none", zIndex: e.zIndex })
    },
    [
      V(
        "div",
        {
          class: m(
            e.classes(
              e.n("wrapper"),
              e.n(`wrapper-${e.position}`),
              e.formatElevation(e.elevation, 4),
              [e.vertical, e.n("vertical")],
              [e.type && e.SNACKBAR_TYPE.includes(e.type), e.n(`wrapper-${e.type}`)]
            )
          ),
          style: G({ zIndex: e.zIndex })
        },
        [
          V(
            "div",
            {
              class: m([e.n("content"), e.contentClass])
            },
            [
              F(e.$slots, "default", {}, () => [
                De(
                  se(e.content),
                  1
                  /* TEXT */
                )
              ])
            ],
            2
            /* CLASS */
          ),
          e.iconName || e.type === "loading" || e.$slots.icon ? (g(), C(
            "div",
            {
              key: 0,
              class: m(e.n("icon"))
            },
            [
              e.iconName ? (g(), ke(t, {
                key: 0,
                name: e.iconName
              }, null, 8, ["name"])) : q("v-if", !0),
              e.type === "loading" ? (g(), ke(o, {
                key: 1,
                type: e.loadingType,
                size: e.loadingSize,
                color: e.loadingColor,
                radius: e.loadingRadius
              }, null, 8, ["type", "size", "color", "radius"])) : q("v-if", !0),
              F(e.$slots, "icon")
            ],
            2
            /* CLASS */
          )) : q("v-if", !0),
          e.$slots.action ? (g(), C(
            "div",
            {
              key: 1,
              class: m(e.n("action"))
            },
            [
              F(e.$slots, "action")
            ],
            2
            /* CLASS */
          )) : q("v-if", !0)
        ],
        6
        /* CLASS, STYLE */
      )
    ],
    6
    /* CLASS, STYLE */
  )), [
    [xn, e.show]
  ]);
}
const Ih = ne({
  name: "MpSnackbarCore",
  components: {
    MpLoading: bo,
    MpIcon: Qe
  },
  props: Vu,
  setup(e) {
    const n = k(null), { zIndex: t } = ur(() => e.show, 1);
    sr(
      () => e.show,
      () => e.lockScroll
    );
    const o = O(() => {
      const { type: i, forbidClick: l } = e;
      return i === "loading" || l;
    }), r = O(() => e.type ? k8[e.type] : "");
    function a() {
      n.value = setTimeout(() => {
        e.type !== "loading" && S(e["onUpdate:show"], !1);
      }, e.duration);
    }
    return pe(
      () => e.show,
      (i) => {
        i ? (S(e.onOpen), a()) : (clearTimeout(n.value), S(e.onClose));
      }
    ), pe(
      () => e._update,
      () => {
        clearTimeout(n.value), a();
      }
    ), yn(() => {
      e.show && (S(e.onOpen), a());
    }), {
      SNACKBAR_TYPE: Rh,
      zIndex: t,
      iconName: r,
      isForbidClick: o,
      n: y8,
      classes: w8,
      formatElevation: pn
    };
  }
});
Ih.render = $8;
var Ah = Ih;
const { name: C8, n: S8 } = _("snackbar");
function z8(e, n) {
  const t = oe("mp-snackbar-core");
  return g(), ke(it, {
    to: e.teleport === !1 ? void 0 : e.teleport,
    disabled: e.disabled || e.teleport === !1
  }, [
    Z(_e, {
      name: `${e.n()}-fade`,
      onAfterEnter: e.onOpened,
      onAfterLeave: e.onClosed
    }, {
      default: ue(() => [
        Z(t, Ye(e.$props, {
          class: e.n("transition")
        }), qt({
          default: ue(() => [
            F(e.$slots, "default")
          ]),
          _: 2
          /* DYNAMIC */
        }, [
          e.$slots.icon ? {
            name: "icon",
            fn: ue(() => [
              F(e.$slots, "icon")
            ]),
            key: "0"
          } : void 0,
          e.$slots.action ? {
            name: "action",
            fn: ue(() => [
              F(e.$slots, "action")
            ]),
            key: "1"
          } : void 0
        ]), 1040, ["class"])
      ]),
      _: 3
      /* FORWARDED */
    }, 8, ["name", "onAfterEnter", "onAfterLeave"])
  ], 8, ["to", "disabled"]);
}
const Nh = ne({
  name: C8,
  components: { MpSnackbarCore: Ah },
  props: Vu,
  setup() {
    const { disabled: e } = _t();
    return {
      disabled: e,
      n: S8
    };
  }
});
Nh.render = z8;
var Yi = Nh, P8 = Object.defineProperty, wp = Object.getOwnPropertySymbols, O8 = Object.prototype.hasOwnProperty, E8 = Object.prototype.propertyIsEnumerable, kp = (e, n, t) => n in e ? P8(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t, Qo = (e, n) => {
  for (var t in n || (n = {}))
    O8.call(n, t) && kp(e, t, n[t]);
  if (wp)
    for (var t of wp(n))
      E8.call(n, t) && kp(e, t, n[t]);
  return e;
};
const Rh = ["loading", "success", "warning", "info", "error"];
let $p = 0, Ds = !1, Lh, xo = !1;
const Vh = {
  type: void 0,
  content: "",
  icon: "",
  action: "",
  position: "top",
  duration: 3e3,
  elevation: !0,
  vertical: !1,
  contentClass: void 0,
  loadingType: "circle",
  loadingSize: "normal",
  lockScroll: !1,
  teleport: "body",
  forbidClick: !1,
  onOpen: () => {
  },
  onOpened: () => {
  },
  onClose: () => {
  },
  onClosed: () => {
  }
};
let qn = en([]), Fu = Vh;
const T8 = {
  name: "mp-snackbar-fade",
  tag: "div",
  class: "mp-transition-group"
}, fl = (e) => () => vn(e) ? e() : e, B8 = {
  setup() {
    return () => {
      const e = qn.map(({
        id: n,
        reactiveSnackOptions: t,
        _update: o
      }) => {
        const r = document.querySelector(".mp-transition-group");
        t.forbidClick || t.type === "loading" ? r.classList.add("mp-pointer-auto") : r.classList.remove("mp-pointer-auto");
        const a = Qo({
          position: xo ? "relative" : "absolute"
        }, R8(t.position)), {
          content: i,
          icon: l,
          action: s
        } = t, u = {
          default: fl(i),
          icon: fl(l),
          action: fl(s)
        };
        return Z(Ah, Ye(t, {
          key: n,
          style: a,
          "data-id": n,
          _update: o,
          show: t.show,
          "onUpdate:show": (c) => t.show = c
        }), u);
      });
      return Z(Sb, Ye(T8, {
        style: {
          zIndex: Rn.zIndex
        },
        onAfterEnter: M8,
        onAfterLeave: D8
      }), {
        default: () => [e]
      });
    };
  }
}, at = function(e) {
  const n = A8(e), t = en(Qo(Qo({}, Fu), n));
  t.show = !0, Ds || (Ds = !0, Lh = So(B8).unmountInstance);
  const {
    length: o
  } = qn, r = {
    id: $p++,
    reactiveSnackOptions: t
  };
  if (o === 0 || xo)
    I8(r);
  else {
    const a = `update-${$p}`;
    N8(t, a);
  }
  return {
    clear() {
      !xo && qn.length ? qn[0].reactiveSnackOptions.show = !1 : t.show = !1;
    }
  };
};
Rh.forEach((e) => {
  at[e] = (n) => (Ln(n) ? n.type = e : n = {
    content: n,
    type: e
  }, at(n));
});
at.allowMultiple = function(e = !1) {
  e !== xo && (qn.forEach((n) => {
    n.reactiveSnackOptions.show = !1;
  }), xo = e);
};
at.clear = function() {
  qn.forEach((e) => {
    e.reactiveSnackOptions.show = !1;
  });
};
at.setDefaultOptions = function(e) {
  Fu = e;
};
at.resetDefaultOptions = function() {
  Fu = Vh;
};
function M8(e) {
  const n = e.getAttribute("data-id"), t = qn.find((o) => o.id === Y(n));
  t && S(t.reactiveSnackOptions.onOpened);
}
function D8(e) {
  e.parentElement && e.parentElement.classList.remove("mp-pointer-auto");
  const n = e.getAttribute("data-id"), t = qn.find((r) => r.id === Y(n));
  t && (t.animationEnd = !0, S(t.reactiveSnackOptions.onClosed)), qn.every((r) => r.animationEnd) && (S(Lh), qn = en([]), Ds = !1);
}
function I8(e) {
  qn.push(e);
}
function A8(e = {}) {
  return un(e) ? {
    content: e
  } : e;
}
function N8(e, n) {
  const [t] = qn;
  t.reactiveSnackOptions = Qo(Qo({}, t.reactiveSnackOptions), e), t._update = n;
}
function R8(e = "top") {
  return e === "bottom" ? {
    top: "85%"
  } : {
    top: e === "top" ? "5%" : "45%"
  };
}
at.Component = Yi;
ae(Yi);
ae(Yi, at);
le(at, Vu);
const WD = Yi;
var Is = at;
const Fh = {
  /**
   * 间距大小，可选值为 `xs` `sm` `md` `lg` `xl`，也可以传入数字 / 长度单位 / `[rowGap, columnGap]`
   */
  size: {
    type: [String, Number, Array],
    default: "md"
  },
  /**
   * 是否超出换行
   */
  wrap: {
    type: Boolean,
    default: !0
  },
  /**
   * 布局方向，可选值为 `row` `column`
   */
  direction: {
    type: String,
    default: "row"
  },
  /**
   * 主轴排列方式
   */
  justify: {
    type: String,
    default: "flex-start"
  },
  /**
   * 交叉轴排列方式，未传入时根据 `direction` 推断（`row` → `center`，`column` → `flex-start`）
   */
  align: {
    type: String
  },
  /**
   * 是否撑满父容器宽度（true 使用 `display: flex`，false 使用 `display: inline-flex`）
   */
  block: {
    type: Boolean,
    default: !0
  }
}, L8 = (e) => ["xs", "sm", "md", "lg", "xl"].includes(e), {
  name: V8,
  n: Mo,
  classes: F8
} = _("space");
function U8(e, n) {
  return n ? [`var(--mp-space-size-${e}-row-gap)`, `var(--mp-space-size-${e}-column-gap)`] : je(e) ? e.map(Te) : ma(e) ? [Te(e), Te(e)] : [`var(--mp-space-size-${e}-row-gap)`, `var(--mp-space-size-${e}-column-gap)`];
}
var Wi = ne({
  name: V8,
  props: Fh,
  setup(e, {
    slots: n
  }) {
    const {
      block: t,
      justify: o,
      align: r,
      wrap: a,
      direction: i,
      size: l
    } = zb(e), s = O(() => {
      const [u, c] = U8(l.value, L8(l.value));
      return `${u} ${c}`;
    });
    return () => {
      var u, c;
      const d = (c = (u = n.default) == null ? void 0 : u.call(n)) != null ? c : [], p = wm(d).filter((h) => !(h && typeof h == "object" && h.type === Lp)), f = !!n.split;
      return Z("div", {
        class: F8(Mo(), Mo("$--box"), [t.value, Mo("--block")]),
        style: {
          gap: s.value,
          flexDirection: i.value,
          justifyContent: Qr(o.value),
          alignItems: Qr(i.value === "row" ? r.value ? r.value : "center" : r.value ? r.value : "flex-start"),
          flexWrap: a.value ? "wrap" : "nowrap"
        }
      }, [p.map((h, v) => {
        var y, w;
        const $ = (y = h == null ? void 0 : h.key) != null ? y : `mp-space-item-${v}`;
        return Z(Ae, {
          key: $
        }, [f && v > 0 && Z("div", {
          class: Mo("item-split")
        }, [(w = n.split) == null ? void 0 : w.call(n)]), Z("div", {
          class: Mo("item")
        }, [h])]);
      })]);
    };
  }
});
ae(Wi);
le(Wi, Fh);
const KD = Wi;
var As = Wi;
const Uh = {
  activeIcon: {
    type: String,
    default: "check"
  },
  currentIcon: Le(dn, "name"),
  inactiveIcon: Le(dn, "name"),
  activeIconNamespace: Le(dn, "namespace"),
  currentIconNamespace: Le(dn, "namespace"),
  inactiveIconNamespace: Le(dn, "namespace")
}, jh = Symbol("STEPS_BIND_STEP_KEY");
function j8() {
  const { bindChildren: e, childProviders: n } = kn(jh);
  return {
    step: n,
    bindStep: e
  };
}
function H8() {
  const { parentProvider: e, index: n, bindParent: t } = wn(jh);
  return Xn(!!t, "Steps", "<step/> must in <steps>"), {
    index: n,
    steps: e,
    bindSteps: t
  };
}
const { name: Y8, n: W8, classes: K8 } = _("step"), q8 = { key: 3 };
function X8(e, n) {
  const t = oe("mp-icon");
  return g(), C(
    "div",
    {
      class: m(e.n())
    },
    [
      V(
        "div",
        {
          class: m(e.n(e.direction))
        },
        [
          V(
            "div",
            {
              class: m(e.classes(e.n(`${e.direction}-tag`), [e.isActive || e.isCurrent, e.n(`${e.direction}-tag--active`)])),
              style: G({ backgroundColor: e.isActive || e.isCurrent ? e.activeColor : e.inactiveColor }),
              onClick: n[0] || (n[0] = (...o) => e.click && e.click(...o))
            },
            [
              e.isActive ? (g(), ke(t, {
                key: 0,
                class: m(e.n("icon")),
                "mp-step-cover": "",
                name: e.activeIcon,
                namespace: e.activeIconNamespace
              }, null, 8, ["class", "name", "namespace"])) : e.isCurrent && e.currentIcon ? (g(), ke(t, {
                key: 1,
                class: m(e.n("icon")),
                "mp-step-cover": "",
                name: e.currentIcon,
                namespace: e.currentIconNamespace
              }, null, 8, ["class", "name", "namespace"])) : e.inactiveIcon ? (g(), ke(t, {
                key: 2,
                class: m(e.n("icon")),
                "mp-step-cover": "",
                name: e.inactiveIcon,
                namespace: e.inactiveIconNamespace
              }, null, 8, ["class", "name", "namespace"])) : (g(), C(
                "span",
                q8,
                se(e.index + 1),
                1
                /* TEXT */
              ))
            ],
            6
            /* CLASS, STYLE */
          ),
          e.$slots.default ? (g(), C(
            "div",
            {
              key: 0,
              class: m(e.classes(e.n(`${e.direction}-content`), [e.isActive || e.isCurrent, e.n(`${e.direction}-content--active`)])),
              onClick: n[1] || (n[1] = (...o) => e.click && e.click(...o))
            },
            [
              F(e.$slots, "default")
            ],
            2
            /* CLASS */
          )) : q("v-if", !0),
          V(
            "div",
            {
              class: m(e.n(`${e.direction}-line`))
            },
            null,
            2
            /* CLASS */
          )
        ],
        2
        /* CLASS */
      )
    ],
    2
    /* CLASS */
  );
}
const Hh = ne({
  name: Y8,
  components: { MpIcon: Qe },
  props: Uh,
  setup() {
    const { index: e, steps: n, bindSteps: t } = H8(), { active: o, activeColor: r, inactiveColor: a, direction: i, clickStep: l } = n, s = O(() => o.value === e.value), u = O(() => e.value !== -1 && Y(o.value) > e.value);
    t({ index: e });
    function d() {
      return l(e.value);
    }
    return {
      index: e,
      isActive: u,
      isCurrent: s,
      direction: i,
      activeColor: r,
      inactiveColor: a,
      n: W8,
      classes: K8,
      click: d
    };
  }
});
Hh.render = X8;
var Ki = Hh;
ae(Ki);
le(Ki, Uh);
const qD = Ki;
var Ns = Ki;
const Yh = {
  active: {
    type: [String, Number],
    default: 0
  },
  direction: {
    type: String,
    default: "horizontal"
  },
  activeColor: String,
  inactiveColor: String,
  onClickStep: R()
}, { name: G8, n: Z8 } = _("steps");
function J8(e, n) {
  return g(), C(
    "div",
    {
      class: m(e.n()),
      style: G({ flexDirection: e.direction === "horizontal" ? "row" : "column" })
    },
    [
      F(e.$slots, "default")
    ],
    6
    /* CLASS, STYLE */
  );
}
const Wh = ne({
  name: G8,
  props: Yh,
  setup(e) {
    const n = O(() => e.active), t = O(() => e.activeColor), o = O(() => e.inactiveColor), r = O(() => e.direction), { bindStep: a } = j8();
    a({
      active: n,
      direction: r,
      activeColor: t,
      inactiveColor: o,
      clickStep: l
    });
    function l(s) {
      S(e.onClickStep, s);
    }
    return { n: Z8 };
  }
});
Wh.render = J8;
var qi = Wh;
ae(qi);
le(qi, Yh);
const XD = qi;
var Rs = qi;
const Kh = {
  styleVars: {
    type: Object,
    default: () => ({})
  },
  tag: {
    type: String,
    default: "div"
  }
}, { name: Q8, n: x8 } = _("style-provider"), _8 = ne({
  name: Q8,
  props: Kh,
  setup(e, { slots: n }) {
    return () => er(
      e.tag,
      {
        class: x8(),
        style: qm(e.styleVars)
      },
      S(n.default)
    );
  }
});
var Xi = _8;
const qh = "maple-style-vars";
function Cp() {
  const e = document.head.querySelector(`#${qh}`);
  e && document.head.removeChild(e);
}
function e3(e) {
  const n = document.createElement("style");
  n.id = qh, n.innerHTML = e, document.head.appendChild(n);
}
function Gi(e) {
  if (e == null) {
    Cp();
    return;
  }
  const n = qm(e ?? {}), t = Object.entries(n).reduce((o, [r, a]) => (o += `${r}:${a};`, o), `:root:root {
`);
  Cp(), e3(`${t}
}`);
}
Gi.Component = Xi;
ae(Xi);
ae(Xi, Gi);
le(Gi, Kh);
const GD = Xi;
var Ls = Gi;
const Xh = {
  modelValue: {
    default: !1
  },
  activeValue: {
    default: !0
  },
  inactiveValue: {
    default: !1
  },
  lazyChange: Boolean,
  disabled: Boolean,
  readonly: Boolean,
  loading: Boolean,
  color: String,
  loadingColor: String,
  closeColor: String,
  size: [String, Number],
  variant: Boolean,
  rules: [Array, Function, Object],
  ripple: {
    type: Boolean,
    default: !0
  },
  buttonElevation: {
    type: [Boolean, String, Number],
    default: !0
  },
  validateTrigger: {
    type: Array,
    default: () => ["onChange", "onLazyChange"]
  },
  onClick: R(),
  onBeforeChange: R(),
  onChange: R(),
  "onUpdate:modelValue": R()
}, { name: n3, n: t3, classes: o3 } = _("switch"), r3 = ["aria-checked"], a3 = ["tabindex"];
function i3(e, n) {
  const t = oe("mp-hover-overlay"), o = oe("mp-form-details"), r = Je("ripple"), a = Je("hover");
  return Ue((g(), C("div", {
    class: m(e.classes(e.n(), [e.variant, e.n("--variant")])),
    role: "switch",
    "aria-checked": e.modelValue
  }, [
    V(
      "div",
      {
        ref: "switchRef",
        class: m(e.classes(e.n("block"), [e.disabled || e.formDisabled, e.n("--disabled")], [e.isActive, e.n("block--active")])),
        style: G(e.styleComputed.switch),
        onClick: n[2] || (n[2] = (...i) => e.switchActive && e.switchActive(...i))
      },
      [
        V(
          "div",
          {
            style: G(e.styleComputed.track),
            class: m(e.classes(e.n("track"), [e.isActive, e.n("track--active")], [e.errorMessage && !e.variant, e.n("track--error")]))
          },
          null,
          6
          /* CLASS, STYLE */
        ),
        Ue((g(), C("div", {
          class: m(e.classes(e.n("ripple"), [e.isActive, e.n("ripple--active")])),
          style: G(e.styleComputed.ripple),
          tabindex: e.disabled || e.formDisabled ? void 0 : "0",
          onFocus: n[0] || (n[0] = (i) => e.isFocusing = !0),
          onBlur: n[1] || (n[1] = (i) => e.isFocusing = !1)
        }, [
          V(
            "div",
            {
              style: G(e.styleComputed.handle),
              class: m(
                e.classes(
                  e.n("handle"),
                  e.formatElevation(e.buttonElevation, 2),
                  [e.isActive, e.n("handle--active")],
                  [e.errorMessage && !e.variant, e.n("handle--error")],
                  [e.hovering, e.n("handle--hover")]
                )
              )
            },
            [
              e.loading ? (g(), C(
                "span",
                {
                  key: 0,
                  class: m(e.n("loading")),
                  style: G({
                    width: e.radius,
                    height: e.radius
                  })
                },
                n[3] || (n[3] = [
                  V(
                    "svg",
                    { viewBox: "25 25 50 50" },
                    [
                      V("circle", {
                        cx: "50",
                        cy: "50",
                        r: "20",
                        fill: "none"
                      })
                    ],
                    -1
                    /* HOISTED */
                  )
                ]),
                6
                /* CLASS, STYLE */
              )) : q("v-if", !0)
            ],
            6
            /* CLASS, STYLE */
          ),
          Z(t, {
            hovering: e.hovering && !e.disabled && !e.formDisabled,
            focusing: e.isFocusing && !e.disabled && !e.formDisabled
          }, null, 8, ["hovering", "focusing"])
        ], 46, a3)), [
          [r, {
            disabled: !e.ripple || e.disabled || e.loading || e.formDisabled || e.readonly || e.formReadonly
          }]
        ])
      ],
      6
      /* CLASS, STYLE */
    ),
    Z(o, { "error-message": e.errorMessage }, null, 8, ["error-message"])
  ], 10, r3)), [
    [a, e.hover, "desktop"]
  ]);
}
const Gh = ne({
  name: n3,
  components: {
    MpFormDetails: Bn,
    MpHoverOverlay: Vn
  },
  directives: { Ripple: an, Hover: In },
  props: Xh,
  setup(e) {
    const n = k(null), t = k(!1), { bindForm: o, form: r } = jn(), { errorMessage: a, validateWithTrigger: i, validate: l, resetValidation: s } = Un(), { hovering: u, handleHovering: c } = _n(), d = O(() => e.modelValue === e.activeValue), p = O(() => {
      const { size: P, color: B, closeColor: I, loadingColor: U, variant: L } = e;
      return {
        handle: {
          width: On(P),
          height: On(P),
          backgroundColor: d.value ? B : I,
          color: U
        },
        ripple: {
          left: d.value ? On(P, 0.5) : `-${On(P, L ? 1 / 3 : 0.5)}`,
          color: d.value ? B : I || "currentColor",
          width: On(P, 2),
          height: On(P, 2)
        },
        track: {
          width: On(P, L ? 13 / 6 : 1.9),
          height: On(P, L ? 4 / 3 : 0.72),
          borderRadius: On(P, 2 / 3),
          filter: d.value || a != null && a.value ? void 0 : `brightness(${L ? 1 : 0.6})`,
          backgroundColor: d.value ? B : I,
          borderWidth: L && !d.value ? On(P, 1 / 12) : void 0
        },
        switch: {
          width: On(P, L ? 13 / 6 : 2),
          height: On(P, L ? 4 / 3 : 1.2)
        }
      };
    }), f = O(() => On(e.size, 0.8));
    S(o, {
      reset: D,
      validate: w,
      resetValidation: s
    }), He(() => window, "keydown", v), He(() => window, "keyup", y);
    function v(P) {
      t.value && ((P.key === " " || P.key === "Enter") && Re(P), P.key === "Enter" && n.value.click());
    }
    function y(P) {
      !t.value || P.key !== " " || (Re(P), n.value.click());
    }
    function w() {
      return l(e.rules, e.modelValue);
    }
    function $(P) {
      Ke(() => {
        const { validateTrigger: B, rules: I, modelValue: U } = e;
        i(B, P, I, U);
      });
    }
    function b(P) {
      const {
        onClick: B,
        onChange: I,
        disabled: U,
        loading: L,
        readonly: W,
        activeValue: N,
        inactiveValue: T,
        lazyChange: M,
        "onUpdate:modelValue": j,
        onBeforeChange: E
      } = e;
      if (U || r != null && r.disabled.value || (S(B, P), L || W || r != null && r.readonly.value))
        return;
      const J = d.value ? T : N;
      M ? S(E, J, (X) => {
        S(j, X), $("onLazyChange");
      }) : (S(I, J), S(j, J), $("onChange"));
    }
    function z(P) {
      e.disabled || r != null && r.disabled.value || c(P);
    }
    function D() {
      S(e["onUpdate:modelValue"], e.inactiveValue), s();
    }
    return {
      isActive: d,
      switchRef: n,
      hovering: u,
      isFocusing: t,
      radius: f,
      styleComputed: p,
      errorMessage: a,
      formDisabled: r == null ? void 0 : r.disabled,
      formReadonly: r == null ? void 0 : r.readonly,
      n: t3,
      classes: o3,
      formatElevation: pn,
      multiplySizeUnit: On,
      switchActive: b,
      hover: z
    };
  }
});
Gh.render = i3;
var Zi = Gh;
ae(Zi);
le(Zi, Xh);
const ZD = Zi;
var Vs = Zi;
const Zh = {
  name: [String, Number],
  title: String,
  disabled: Boolean,
  ripple: {
    type: Boolean,
    default: !0
  },
  onClick: R()
}, Jh = Symbol("TABS_BIND_TAB_KEY");
function l3() {
  const { childProviders: e, bindChildren: n, length: t } = kn(Jh);
  return {
    length: t,
    tabList: e,
    bindTabList: n
  };
}
function s3() {
  const { parentProvider: e, bindParent: n, index: t } = wn(Jh);
  return Xn(!!n, "Tab", "<mp-tab/> must in <mp-tabs/>"), {
    index: t,
    tabs: e,
    bindTabs: n
  };
}
const { name: u3, n: Br, classes: c3 } = _("tab");
function d3(e, n) {
  const t = Je("ripple");
  return Ue((g(), C(
    "div",
    {
      ref: "tabEl",
      class: m(e.classes(e.n(), e.n("$--box"), e.computeColorClass(), e.n(`--${e.itemDirection}`))),
      style: G({
        color: e.computeColorStyle()
      }),
      onClick: n[0] || (n[0] = (...o) => e.handleClick && e.handleClick(...o))
    },
    [
      F(e.$slots, "default", {}, () => [
        De(
          se(e.title),
          1
          /* TEXT */
        )
      ])
    ],
    6
    /* CLASS, STYLE */
  )), [
    [t, { disabled: e.disabled || !e.ripple }]
  ]);
}
const Qh = ne({
  name: u3,
  directives: { Ripple: an },
  props: Zh,
  setup(e) {
    const n = k(null), t = O(() => n.value), o = O(() => e.name), r = O(() => e.disabled), { index: a, tabs: i, bindTabs: l } = s3(), { onTabClick: s, active: u, activeColor: c, inactiveColor: d, disabledColor: p, itemVertical: f, resize: h } = i, v = O(() => f.value ? "vertical" : "horizontal"), y = {
      name: o,
      index: a,
      disabled: r,
      element: t
    };
    l(y), pe(() => [e.name, e.disabled], h);
    function w() {
      return e.name != null ? u.value === e.name : u.value === (a == null ? void 0 : a.value);
    }
    function $() {
      return e.disabled ? p.value : w() ? c.value : d.value;
    }
    function b() {
      return e.disabled ? Br("$-tab--disabled") : w() ? Br("$-tab--active") : Br("$-tab--inactive");
    }
    function z(D) {
      const { disabled: P, name: B, onClick: I } = e;
      P || (S(I, B ?? a.value, D), s(y));
    }
    return {
      tabEl: n,
      active: u,
      activeColor: c,
      inactiveColor: d,
      itemDirection: v,
      n: Br,
      classes: c3,
      computeColorStyle: $,
      computeColorClass: b,
      handleClick: z
    };
  }
});
Qh.render = d3;
var Ji = Qh;
ae(Ji);
le(Ji, Zh);
const JD = Ji;
var Fs = Ji;
const xh = {
  name: [String, Number]
}, { name: p3, n: m3, classes: f3 } = _("tab-item");
function v3(e, n) {
  const t = oe("mp-carousel-item");
  return g(), ke(t, {
    class: m(e.classes(e.n(), [!e.current, e.n("--inactive")])),
    "mp-tab-item-cover": ""
  }, {
    default: ue(() => [
      F(e.$slots, "default")
    ]),
    _: 3
    /* FORWARDED */
  }, 8, ["class"]);
}
const _h = ne({
  name: p3,
  components: { MpCarouselItem: Go },
  props: xh,
  setup(e) {
    const n = k(!1), t = O(() => e.name), { index: o, bindTabsItems: r } = L4(), { bindLists: a } = V4(), i = {
      index: o,
      name: t,
      current: O(() => n.value),
      setCurrent: l
    };
    r(i), a(i);
    function l(s) {
      n.value = s;
    }
    return {
      current: n,
      n: m3,
      classes: f3
    };
  }
});
_h.render = v3;
var Qi = _h;
ae(Qi);
le(Qi, xh);
const QD = Qi;
var Us = Qi;
const eb = {
  fullWidth: {
    type: [Number, String],
    default: "100%"
  },
  scrollerHeight: {
    type: [Number, String]
  },
  elevation: {
    type: [Boolean, Number, String],
    default: !0
  }
}, { name: g3, n: h3, classes: b3 } = _("table");
function y3(e, n) {
  return g(), C(
    "div",
    {
      class: m(e.classes(e.n(), e.formatElevation(e.elevation, 1), e.n("$--box")))
    },
    [
      V(
        "div",
        {
          class: m(e.n("main")),
          style: G({ "max-height": e.toSizeUnit(e.scrollerHeight) })
        },
        [
          V(
            "table",
            {
              class: m(e.n("table")),
              style: G({ width: e.toSizeUnit(e.fullWidth) })
            },
            [
              F(e.$slots, "default")
            ],
            6
            /* CLASS, STYLE */
          )
        ],
        6
        /* CLASS, STYLE */
      ),
      e.$slots.footer ? (g(), C(
        "div",
        {
          key: 0,
          class: m(e.n("footer"))
        },
        [
          F(e.$slots, "footer")
        ],
        2
        /* CLASS */
      )) : q("v-if", !0)
    ],
    2
    /* CLASS */
  );
}
const nb = ne({
  name: g3,
  props: eb,
  setup: () => ({
    toSizeUnit: Te,
    n: h3,
    classes: b3,
    formatElevation: pn
  })
});
nb.render = y3;
var xi = nb;
ae(xi);
le(xi, eb);
const xD = xi;
var js = xi;
const tb = {
  active: {
    type: [String, Number],
    default: 0
  },
  /** @zh 整体朝向是否垂直 */
  vertical: Boolean,
  /** @zh 内部选项的 flex 方向是否垂直 */
  itemVertical: Boolean,
  variant: {
    type: String,
    default: "line"
  },
  size: {
    type: String,
    default: "md"
  },
  fixedBottom: Boolean,
  activeColor: String,
  inactiveColor: String,
  disabledColor: String,
  color: String,
  indicatorColor: String,
  indicatorSize: [String, Number],
  elevation: {
    type: [Boolean, String, Number],
    default: !1
  },
  scrollable: {
    type: String,
    default: "auto"
  },
  indicatorPosition: {
    type: String,
    default: "normal"
  },
  lazyLoad: Boolean,
  destroyOnHide: Boolean,
  trigger: {
    type: String,
    default: "click"
  },
  safeArea: Boolean,
  sticky: Boolean,
  stickyCssMode: Le(Ro, "cssMode"),
  stickyZIndex: Le(Ro, "zIndex"),
  offsetTop: Le(Ro, "offsetTop"),
  onClick: R(),
  onChange: R(),
  "onUpdate:active": R()
};
var Sp = (e, n, t) => new Promise((o, r) => {
  var a = (s) => {
    try {
      l(t.next(s));
    } catch (u) {
      r(u);
    }
  }, i = (s) => {
    try {
      l(t.throw(s));
    } catch (u) {
      r(u);
    }
  }, l = (s) => s.done ? o(s.value) : Promise.resolve(s.value).then(a, i);
  l((t = t.apply(e, n)).next());
});
const { name: w3, n: k3, classes: $3 } = _("tabs");
function C3(e, n) {
  return g(), ke(xt(e.sticky ? e.n("$-sticky") : e.Transition), {
    ref: e.sticky ? "stickyComponent" : void 0,
    "css-mode": e.sticky ? e.stickyCssMode : void 0,
    "offset-top": e.sticky ? e.offsetTop : void 0,
    "z-index": e.sticky ? e.stickyZIndex : void 0
  }, {
    default: ue(() => [
      V(
        "div",
        Ye({
          class: e.classes(
            e.n(),
            e.n("$--box"),
            e.n(`--item-${e.itemDirection}`),
            e.n(`--layout-${e.layoutDirection}-padding`),
            e.formatElevation(e.elevation, 4),
            e.n(`--${e.variant}`),
            [e.fixedBottom, e.n("--fixed-bottom")],
            [e.safeArea, e.n("--safe-area")]
          ),
          style: { background: e.color }
        }, e.$attrs),
        [
          V(
            "div",
            {
              ref: "scrollerEl",
              class: m(
                e.classes(
                  e.n("tab-wrap"),
                  [e.localScrollable, e.n(`--layout-${e.layoutDirection}-scrollable`)],
                  e.n(`--layout-${e.layoutDirection}`)
                )
              )
            },
            [
              F(e.$slots, "default"),
              F(e.$slots, "extra"),
              e.variant === "line" ? (g(), C(
                "div",
                {
                  key: 0,
                  class: m(e.classes(e.n("indicator"), e.n(`--layout-${e.layoutDirection}${e.indicatorPosition}-indicator`))),
                  style: G({
                    width: e.vertical ? e.toSizeUnit(e.indicatorSize) : e.indicatorWidth,
                    height: e.vertical ? e.indicatorHeight : e.toSizeUnit(e.indicatorSize),
                    transform: e.vertical ? `translateY(${e.indicatorY})` : `translateX(${e.indicatorX})`
                  })
                },
                [
                  V(
                    "div",
                    {
                      class: m(e.classes(e.n("indicator-inner"), e.n(`--layout-${e.layoutDirection}-indicator-inner`))),
                      style: G({ background: e.indicatorColor || e.activeColor })
                    },
                    null,
                    6
                    /* CLASS, STYLE */
                  )
                ],
                6
                /* CLASS, STYLE */
              )) : q("v-if", !0)
            ],
            2
            /* CLASS */
          )
        ],
        16
        /* FULL_PROPS */
      )
    ]),
    _: 3
    /* FORWARDED */
  }, 8, ["css-mode", "offset-top", "z-index"]);
}
const ob = ne({
  name: w3,
  components: { MpSticky: ko },
  inheritAttrs: !1,
  props: tb,
  setup(e) {
    const n = k("0px"), t = k("0px"), o = k("0px"), r = k("0px"), a = k(!1), i = k(null), l = O(() => e.active), s = O(() => e.activeColor), u = O(() => e.inactiveColor), c = O(() => e.disabledColor), d = O(() => e.vertical ? "vertical" : "horizontal"), p = O(() => e.itemVertical ? "vertical" : "horizontal"), f = O(() => e.itemVertical), h = k(null), v = O(() => e.indicatorPosition === "reverse" ? "-reverse" : ""), { tabList: y, bindTabList: w, length: $ } = l3();
    w({
      active: l,
      activeColor: s,
      inactiveColor: u,
      disabledColor: c,
      itemVertical: f,
      resize: W,
      onTabClick: z
    }), pe(
      () => $.value,
      () => Sp(this, null, function* () {
        yield bn(), W();
      })
    ), pe(() => [e.active, e.scrollable], W), Lt(W), nt(W);
    function z(T) {
      var M;
      const j = (M = T.name.value) != null ? M : T.index.value, { active: E, onChange: J, onClick: X } = e;
      S(e["onUpdate:active"], j), S(X, j), j !== E && S(J, j);
    }
    function D() {
      return y.find(({ name: T }) => e.active === T.value);
    }
    function P(T) {
      return y.find(({ index: M }) => (T ?? e.active) === M.value);
    }
    function B() {
      if ($.value === 0)
        return;
      const { active: T } = e;
      if (zn(T)) {
        const M = $n(T, 0, $.value - 1);
        return S(e["onUpdate:active"], M), P(M);
      }
    }
    function I() {
      a.value = e.scrollable === "always" || y.length >= 5;
    }
    function U({ element: T }) {
      const M = T.value;
      M && (e.vertical ? (t.value = `${M.offsetHeight}px`, r.value = `${M.offsetTop}px`) : (n.value = `${M.offsetWidth}px`, o.value = `${M.offsetLeft}px`));
    }
    function L({ element: T }) {
      if (!a.value)
        return;
      const M = i.value, j = T.value;
      if (e.vertical) {
        const E = j.offsetTop + j.offsetHeight / 2 - M.offsetHeight / 2;
        Fo(M, {
          top: E,
          animation: Pl
        });
      } else {
        const E = j.offsetLeft + j.offsetWidth / 2 - M.offsetWidth / 2;
        Fo(M, {
          left: E,
          animation: Pl
        });
      }
    }
    function W() {
      const T = D() || P() || B();
      !T || T.disabled.value || (I(), U(T), L(T));
    }
    function N() {
      return Sp(this, null, function* () {
        e.sticky && h.value && (yield h.value.resize());
      });
    }
    return {
      stickyComponent: h,
      indicatorWidth: n,
      indicatorHeight: t,
      indicatorX: o,
      indicatorY: r,
      indicatorPosition: v,
      localScrollable: a,
      scrollerEl: i,
      Transition: _e,
      toSizeUnit: Te,
      n: k3,
      classes: $3,
      resize: W,
      variant: O(() => e.variant),
      vertical: O(() => e.vertical),
      layoutDirection: d,
      itemDirection: p,
      resizeSticky: N,
      formatElevation: pn
    };
  }
});
ob.render = C3;
var _i = ob;
ae(_i);
le(_i, tb);
const _D = _i;
var Hs = _i;
const rb = {
  active: {
    type: [String, Number],
    default: 0
  },
  canSwipe: {
    type: Boolean,
    default: !0
  },
  animated: {
    type: Boolean,
    default: !0
  },
  loop: Boolean,
  "onUpdate:active": R()
};
var S3 = (e, n, t) => new Promise((o, r) => {
  var a = (s) => {
    try {
      l(t.next(s));
    } catch (u) {
      r(u);
    }
  }, i = (s) => {
    try {
      l(t.throw(s));
    } catch (u) {
      r(u);
    }
  }, l = (s) => s.done ? o(s.value) : Promise.resolve(s.value).then(a, i);
  l((t = t.apply(e, n)).next());
});
const { name: z3, n: P3 } = _("tabs-items");
function O3(e, n) {
  const t = oe("mp-carousel");
  return g(), ke(t, {
    ref: "carouselRef",
    class: m(e.n()),
    loop: e.loop,
    duration: e.animated ? void 0 : 0,
    touchable: e.canSwipe,
    indicator: !1,
    onChange: e.handleCarouselChange
  }, {
    default: ue(() => [
      F(e.$slots, "default")
    ]),
    _: 3
    /* FORWARDED */
  }, 8, ["class", "loop", "duration", "touchable", "onChange"]);
}
const ab = ne({
  name: z3,
  components: { MpCarousel: Xo },
  props: rb,
  setup(e) {
    const n = k(null), { tabItemList: t, bindTabItem: o, length: r } = R4();
    o({}), pe(() => e.active, s), pe(
      () => r.value,
      () => S3(this, null, function* () {
        yield bn(), s(e.active);
      })
    );
    function a(d) {
      return t.find(({ name: p }) => d === p.value);
    }
    function i(d) {
      return t.find(({ index: p }) => d === p.value);
    }
    function l(d) {
      return a(d) || i(d);
    }
    function s(d) {
      var p;
      const f = l(d);
      f && (t.forEach(({ setCurrent: h }) => h(!1)), f.setCurrent(!0), (p = n.value) == null || p.to(f.index.value));
    }
    function u(d) {
      var p;
      const f = t.find(({ index: v }) => v.value === d), h = (p = f.name.value) != null ? p : f.index.value;
      S(e["onUpdate:active"], h);
    }
    function c() {
      return n.value;
    }
    return {
      carouselRef: n,
      n: P3,
      handleCarouselChange: u,
      getCarousel: c
    };
  }
});
ab.render = O3;
var el = ab;
ae(el);
le(el, rb);
const eI = el;
var Ys = el;
const ib = {
  /**
   * 标签主题色
   */
  status: {
    type: String,
    default: "default"
  },
  /**
   * 标签尺寸
   */
  size: {
    type: String,
    default: "md"
  },
  /**
   * 标签变体：`default`（实心填充）/ `outline`（描边）
   */
  variant: {
    type: String,
    default: "default"
  },
  /**
   * @deprecated 请使用 `variant="outline"`
   */
  bordered: Boolean,
  /**
   * 标签是否可见（v-model）
   */
  visible: {
    type: Boolean,
    default: void 0
  },
  /**
   * 标签默认是否可见
   */
  defaultVisible: {
    type: Boolean,
    default: !0
  },
  /**
   * 是否为加载中状态
   */
  loading: Boolean,
  /**
   * 是否可关闭
   */
  closable: Boolean,
  /**
   * 是否可点击选中
   */
  checkable: Boolean,
  /**
   * 标签选中状态（checkable 时有效，v-model）
   */
  checked: {
    type: Boolean,
    default: void 0
  },
  /**
   * 标签默认选中状态（checkable 时有效）
   */
  defaultChecked: {
    type: Boolean,
    default: !0
  },
  /**
   * 内容是否不换行（超出省略）
   */
  nowrap: Boolean,
  /**
   * 自定义背景色
   */
  color: String,
  /**
   * 自定义文字色
   */
  textColor: String,
  onClose: R(),
  onCheck: R(),
  "onUpdate:visible": R(),
  "onUpdate:checked": R()
};
var E3 = Object.defineProperty, T3 = Object.defineProperties, B3 = Object.getOwnPropertyDescriptors, zp = Object.getOwnPropertySymbols, M3 = Object.prototype.hasOwnProperty, D3 = Object.prototype.propertyIsEnumerable, Pp = (e, n, t) => n in e ? E3(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t, I3 = (e, n) => {
  for (var t in n || (n = {}))
    M3.call(n, t) && Pp(e, t, n[t]);
  if (zp)
    for (var t of zp(n))
      D3.call(n, t) && Pp(e, t, n[t]);
  return e;
}, A3 = (e, n) => T3(e, B3(n));
function N3(e, n, t, o, r, a) {
  return g(), ke(_e, {
    name: o.n("$-fade"),
    persisted: ""
  }, {
    default: ue(() => [
      Ue(V(
        "span",
        {
          class: m(o.rootClass),
          style: G(o.rootStyle),
          onClick: o.handleClick
        },
        [
          e.$slots.icon ? (g(), C(
            "span",
            {
              key: 0,
              class: m(o.n("icon"))
            },
            [
              F(e.$slots, "icon")
            ],
            2
            /* CLASS */
          )) : q("v-if", !0),
          e.nowrap ? (g(), C(
            "span",
            {
              key: 1,
              class: m(o.n("text"))
            },
            [
              F(e.$slots, "default")
            ],
            2
            /* CLASS */
          )) : F(e.$slots, "default", { key: 2 }),
          e.loading ? (g(), C(
            "span",
            {
              key: 3,
              class: m(o.n("loading-icon")),
              "aria-hidden": "true"
            },
            null,
            2
            /* CLASS */
          )) : e.closable ? (g(), C(
            "span",
            {
              key: 4,
              role: "button",
              "aria-label": "Close",
              class: m(o.n("close-btn")),
              onClick: Tn(o.handleClose, ["stop"])
            },
            [
              F(e.$slots, "close-icon", {}, () => [
                Z(o.MpIcon, { name: "close-circle" })
              ])
            ],
            2
            /* CLASS */
          )) : q("v-if", !0)
        ],
        6
        /* CLASS, STYLE */
      ), [
        [xn, o.computedVisible]
      ])
    ]),
    _: 3
    /* FORWARDED */
  }, 8, ["name"]);
}
const lb = /* @__PURE__ */ ne(A3(I3({}, {
  name: _("tag").name
}), {
  __name: "Tag",
  props: ib,
  emits: ["update:visible", "update:checked", "close", "check"],
  setup(e, { expose: n, emit: t }) {
    n();
    const { n: o, classes: r } = _("tag"), a = e, i = t, l = k(a.defaultVisible), s = k(a.defaultChecked), u = O(() => {
      var w;
      return (w = a.visible) != null ? w : l.value;
    }), c = O(
      () => {
        var w;
        return a.checkable ? (w = a.checked) != null ? w : s.value : !0;
      }
    ), d = O(() => a.bordered ? "outline" : a.variant), p = O(
      () => r(
        o(),
        o(`--size-${a.size}`),
        o(`--status-${a.status}`),
        o(`--variant-${d.value}`),
        [a.loading, o("--loading")],
        [a.closable, o("--closable")],
        [a.checkable, o("--checkable")],
        [c.value, o("--checked")],
        [a.nowrap, o("--nowrap")]
      )
    ), f = O(() => {
      if (!(!a.color && !a.textColor))
        return {
          backgroundColor: a.color,
          color: a.textColor,
          borderColor: a.color
        };
    });
    function h(w) {
      a.loading || (l.value = !1, i("update:visible", !1), i("close", w));
    }
    function v(w) {
      if (!a.checkable || a.loading)
        return;
      const $ = !c.value;
      s.value = $, i("update:checked", $), i("check", $, w);
    }
    const y = { n: o, classes: r, props: a, emit: i, innerVisible: l, innerChecked: s, computedVisible: u, computedChecked: c, computedVariant: d, rootClass: p, rootStyle: f, handleClose: h, handleClick: v, get MpIcon() {
      return Qe;
    } };
    return Object.defineProperty(y, "__isScriptSetup", { enumerable: !1, value: !0 }), y;
  }
}));
lb.render = N3;
var nl = lb;
ae(nl);
le(nl, ib);
const nI = nl;
var Ws = nl;
function Uu(e, n) {
  return Object.entries(e).reduce((t, [o, r]) => (t[o] = r.includes("px") ? r.replace(/(\d+(\.\d+)?)px/g, (a, i) => n(i)) : r, t), {});
}
var R3 = {
  "--mp-action-sheet-background": "var(--mp-color-surface-container-low)",
  "--mp-action-sheet-title-color": "#aaa",
  "--mp-action-sheet-action-item-color": "#fff",
  "--mp-action-sheet-border-radius": "2px",
  "--mp-action-sheet-border-top": "none",
  "--mp-action-sheet-title-padding": "10px 16px",
  "--mp-action-sheet-title-font-size": "14px",
  "--mp-action-sheet-action-item-height": "48px",
  "--mp-action-sheet-action-item-padding": "0 18px",
  "--mp-action-sheet-action-item-disabled-color": "var(--mp-color-text-disabled)",
  "--mp-action-sheet-icon-margin": "0 20px 0 0",
  "--mp-action-sheet-icon-size": "24px"
}, L3 = {
  "--mp-alert-padding": "16px",
  "--mp-alert-border-radius": "4px",
  "--mp-alert-icon-size": "22px",
  "--mp-alert-icon-margin": "0 12px 0 0",
  "--mp-alert-close-icon-size": "22px",
  "--mp-alert-close-icon-margin": "2px 0 0 12px",
  "--mp-alert-action-margin": "0 0 0 12px",
  "--mp-alert-standard-info-bg": "hsla(var(--mp-hsl-info), 0.12)",
  "--mp-alert-standard-info-border": "hsla(var(--mp-hsl-info), 0.5)",
  "--mp-alert-standard-info-text-color": "var(--mp-color-info)",
  "--mp-alert-standard-success-bg": "hsla(var(--mp-hsl-success), 0.12)",
  "--mp-alert-standard-success-border": "hsla(var(--mp-hsl-success), 0.5)",
  "--mp-alert-standard-success-text-color": "var(--mp-color-success)",
  "--mp-alert-standard-warning-bg": "hsla(var(--mp-hsl-warning), 0.12)",
  "--mp-alert-standard-warning-border": "hsla(var(--mp-hsl-warning), 0.5)",
  "--mp-alert-standard-warning-text-color": "var(--mp-color-warning)",
  "--mp-alert-standard-danger-bg": "hsla(var(--mp-hsl-danger), 0.12)",
  "--mp-alert-standard-danger-border": "hsla(var(--mp-hsl-danger), 0.5)",
  "--mp-alert-standard-danger-text-color": "var(--mp-color-danger)",
  "--mp-alert-danger-background": "var(--mp-color-danger)",
  "--mp-alert-success-background": "var(--mp-color-success)",
  "--mp-alert-warning-background": "var(--mp-color-warning)",
  "--mp-alert-info-background": "var(--mp-color-info)",
  "--mp-alert-tonal-danger-background": "hsla(var(--mp-hsl-danger), 0.12)",
  "--mp-alert-tonal-success-background": "hsla(var(--mp-hsl-success), 0.12)",
  "--mp-alert-tonal-warning-background": "hsla(var(--mp-hsl-warning), 0.12)",
  "--mp-alert-tonal-info-background": "hsla(var(--mp-hsl-info), 0.12)",
  "--mp-alert-tonal-danger-text-color": "var(--mp-color-danger)",
  "--mp-alert-tonal-success-text-color": "var(--mp-color-success)",
  "--mp-alert-tonal-warning-text-color": "var(--mp-color-warning)",
  "--mp-alert-tonal-info-text-color": "var(--mp-color-info)",
  "--mp-alert-default-background": "var(--mp-color-fill-2)",
  "--mp-alert-default-text-color": "var(--mp-color-text-1)",
  "--mp-alert-default-border-color": "var(--mp-color-border-2)",
  "--mp-alert-message-font-size": "14px",
  "--mp-alert-title-font-size": "16px",
  "--mp-alert-title-font-weight": "500",
  "--mp-alert-message-margin-top": "4px",
  "--mp-alert-message-line-height": "1.5",
  "--mp-alert-title-line-height": "1.5"
}, V3 = {
  "--mp-app-bar-color": "#272727",
  "--mp-app-bar-title-padding": "0 12px",
  "--mp-app-bar-title-font-size": "var(--mp-font-size-lg)",
  "--mp-app-bar-text-color": "#fff",
  "--mp-app-bar-height": "54px",
  "--mp-app-bar-left-gap": "6px",
  "--mp-app-bar-right-gap": "6px",
  "--mp-app-bar-border-radius": "4px",
  "--mp-app-bar-font-size": "var(--mp-font-size-lg)",
  "--mp-app-bar-border-bottom": "thin solid var(--mp-color-outline)"
}, F3 = {
  "--mp-avatar-background-color": "#303030",
  "--mp-avatar-border": "2px solid #1e1e1e",
  "--mp-avatar-text-color": "#f5f5f5",
  "--mp-avatar-border-radius": "4px",
  "--mp-avatar-mini-size": "28px",
  "--mp-avatar-small-size": "36px",
  "--mp-avatar-normal-size": "48px",
  "--mp-avatar-large-size": "64px",
  "--mp-avatar-hover-transform": "scale(1.1)"
}, U3 = {
  "--mp-avatar-group-offset": "-10px"
}, j3 = {
  "--mp-back-top-right": "40px",
  "--mp-back-top-bottom": "40px",
  "--mp-back-top-button-size": "40px",
  "--mp-back-top-button-border-radius": "50%"
}, H3 = {
  "--mp-badge-font-weight": "500",
  "--mp-badge-description-size-xs-font-size": "12px",
  "--mp-badge-description-size-sm-font-size": "12px",
  "--mp-badge-description-size-md-font-size": "14px",
  "--mp-badge-description-size-lg-font-size": "16px",
  "--mp-badge-description-size-xl-font-size": "18px",
  "--mp-badge-description-text-color": "var(--mp-color-on-surface, #1d1b20)",
  "--mp-badge-size-xs-font-size": "12px",
  "--mp-badge-size-sm-font-size": "12px",
  "--mp-badge-size-md-font-size": "12px",
  "--mp-badge-size-lg-font-size": "14px",
  "--mp-badge-size-xl-font-size": "16px",
  "--mp-badge-size-xs-scale": "0.6667",
  "--mp-badge-size-sm-scale": "0.8333",
  "--mp-badge-size-md-scale": "1",
  "--mp-badge-size-lg-scale": "1",
  "--mp-badge-size-xl-scale": "1",
  "--mp-badge-size-xs-dot-width": "4px",
  "--mp-badge-size-sm-dot-width": "5px",
  "--mp-badge-size-md-dot-width": "6px",
  "--mp-badge-size-lg-dot-width": "7px",
  "--mp-badge-size-xl-dot-width": "8px",
  "--mp-badge-size-xs-dot-height": "4px",
  "--mp-badge-size-sm-dot-height": "5px",
  "--mp-badge-size-md-dot-height": "6px",
  "--mp-badge-size-lg-dot-height": "7px",
  "--mp-badge-size-xl-dot-height": "8px",
  "--mp-badge-size-xs-space": "0px",
  "--mp-badge-size-sm-space": "2px",
  "--mp-badge-size-md-space": "6px",
  "--mp-badge-size-lg-space": "6px",
  "--mp-badge-size-xl-space": "8px",
  "--mp-badge-size-xs-padding": "0 6px",
  "--mp-badge-size-sm-padding": "0 6px",
  "--mp-badge-size-md-padding": "0 8px",
  "--mp-badge-size-lg-padding": "0 8px",
  "--mp-badge-size-xl-padding": "0 10px",
  "--mp-badge-size-xs-height": "20px",
  "--mp-badge-size-sm-height": "20px",
  "--mp-badge-size-md-height": "24px",
  "--mp-badge-size-lg-height": "28px",
  "--mp-badge-size-xl-height": "32px",
  "--mp-badge-size-xs-border-radius": "20px",
  "--mp-badge-size-sm-border-radius": "20px",
  "--mp-badge-size-md-border-radius": "24px",
  "--mp-badge-size-lg-border-radius": "28px",
  "--mp-badge-size-xl-border-radius": "32px",
  "--mp-badge-bg-color": "#ef4444",
  "--mp-badge-text-color": "#ffffff",
  "--mp-badge-status-default-bg-color": "#e0e0e0",
  "--mp-badge-status-default-text-color": "#1d1b20",
  "--mp-badge-status-info-bg-color": "var(--mp-color-info)",
  "--mp-badge-status-info-text-color": "var(--mp-color-on-info)",
  "--mp-badge-status-success-bg-color": "var(--mp-color-success)",
  "--mp-badge-status-success-text-color": "var(--mp-color-on-success)",
  "--mp-badge-status-warning-bg-color": "var(--mp-color-warning)",
  "--mp-badge-status-warning-text-color": "var(--mp-color-on-warning)",
  "--mp-badge-status-danger-bg-color": "var(--mp-color-danger)",
  "--mp-badge-status-danger-text-color": "var(--mp-color-on-danger)",
  "--mp-badge-status-primary-bg-color": "var(--mp-color-primary)",
  "--mp-badge-status-primary-text-color": "var(--mp-color-on-primary)",
  "--mp-badge-variant-outline-bg-color": "transparent",
  "--mp-badge-variant-outline-text-color": "#ef4444",
  "--mp-badge-variant-outline-status-info-text-color": "var(--mp-color-info)",
  "--mp-badge-variant-outline-status-success-text-color": "var(--mp-color-success)",
  "--mp-badge-variant-outline-status-warning-text-color": "var(--mp-color-warning)",
  "--mp-badge-variant-outline-status-danger-text-color": "var(--mp-color-danger)",
  "--mp-badge-variant-outline-status-primary-text-color": "var(--mp-color-primary)",
  "--mp-badge-variant-outline-status-default-text-color": "#1d1b20"
}, Y3 = {
  "--mp-bottom-navigation-height": "50px",
  "--mp-bottom-navigation-variant-height": "66px",
  "--mp-bottom-navigation-z-index": "1",
  "--mp-bottom-navigation-background-color": "var(--mp-color-surface-container-high)",
  "--mp-bottom-navigation-border-color": "var(--mp-color-outline)",
  "--mp-bottom-navigation-fab-offset": "4px",
  "--mp-bottom-navigation-fab-border-radius": "50%"
}, W3 = {
  "--mp-bottom-navigation-item-inactive-color": "#BFBFBF",
  "--mp-bottom-navigation-item-font-size": "var(--mp-font-size-sm)",
  "--mp-bottom-navigation-item-active-color": "var(--mp-color-primary)",
  "--mp-bottom-navigation-item-active-background-color": "var(--mp-color-surface-container-high)",
  "--mp-bottom-navigation-item-variant-active-background-color": "var(--mp-color-primary-container)",
  "--mp-bottom-navigation-item-variant-active-color": "var(--mp-color-on-primary-container)",
  "--mp-bottom-navigation-fab-border-radius": "50%",
  "--mp-bottom-navigation-item-line-height": "1",
  "--mp-bottom-navigation-item-icon-size": "22px",
  "--mp-bottom-navigation-item-icon-margin-bottom": "5px",
  "--mp-bottom-navigation-item-variant-icon-container-height": "30px",
  "--mp-bottom-navigation-item-variant-icon-container-border-radius": "100px",
  "--mp-bottom-navigation-item-variant-icon-container-max-width": "58px"
}, K3 = {
  "--mp-breadcrumb-item-inactive-color": "#aaa",
  "--mp-breadcrumb-item-active-color": "var(--mp-color-primary)",
  "--mp-breadcrumb-item-separator-margin": "0 10px",
  "--mp-breadcrumb-item-separator-font-size": "14px"
}, q3 = {
  "--mp-button-default-color": "#303030",
  "--mp-button-default-text-color": "#fff",
  "--mp-button-default-icon-container-color": "#303030",
  "--mp-button-default-icon-color": "#fff",
  "--mp-button-primary-text-color": "var(--mp-color-on-primary)",
  "--mp-button-danger-text-color": "var(--mp-color-on-danger)",
  "--mp-button-success-text-color": "var(--mp-color-on-success)",
  "--mp-button-warning-text-color": "var(--mp-color-on-warning)",
  "--mp-button-info-text-color": "var(--mp-color-on-info)",
  "--mp-button-primary-color": "var(--mp-color-primary)",
  "--mp-button-danger-color": "var(--mp-color-danger)",
  "--mp-button-success-color": "var(--mp-color-success)",
  "--mp-button-warning-color": "var(--mp-color-warning)",
  "--mp-button-info-color": "var(--mp-color-info)",
  "--mp-button-primary-icon-color": "var(--mp-color-on-primary-container)",
  "--mp-button-danger-icon-color": "var(--mp-color-on-danger-container)",
  "--mp-button-success-icon-color": "var(--mp-color-on-success-container)",
  "--mp-button-warning-icon-color": "var(--mp-color-on-warning-container)",
  "--mp-button-info-icon-color": "var(--mp-color-on-info-container)",
  "--mp-button-primary-icon-container-color": "var(--mp-color-primary-container)",
  "--mp-button-danger-icon-container-color": "var(--mp-color-danger-container)",
  "--mp-button-success-icon-container-color": "var(--mp-color-success-container)",
  "--mp-button-warning-icon-container-color": "var(--mp-color-warning-container)",
  "--mp-button-info-icon-container-color": "var(--mp-color-info-container)",
  "--mp-button-disabled-color": "var(--mp-color-disabled)",
  "--mp-button-disabled-text-color": "var(--mp-color-text-disabled)",
  "--mp-button-border-radius": "4px",
  "--mp-button-mini-padding": "0 8px",
  "--mp-button-small-padding": "0 12px",
  "--mp-button-normal-padding": "0 16px",
  "--mp-button-large-padding": "0 22px",
  "--mp-button-round-padding": "6px",
  "--mp-button-mini-height": "20px",
  "--mp-button-small-height": "28px",
  "--mp-button-normal-height": "36px",
  "--mp-button-large-height": "44px",
  "--mp-button-mini-font-size": "var(--mp-font-size-xs)",
  "--mp-button-small-font-size": "var(--mp-font-size-sm)",
  "--mp-button-normal-font-size": "var(--mp-font-size-md)",
  "--mp-button-large-font-size": "var(--mp-font-size-lg)"
}, X3 = {
  "--mp-card-title-color": "#ffffff",
  "--mp-card-subtitle-color": "#aaaaaa",
  "--mp-card-description-color": "#aaaaaa",
  "--mp-card-padding": "0 0 15px 0",
  "--mp-card-background": "var(--mp-color-surface-container-highest)",
  "--mp-card-filled-background": "var(--mp-color-surface-container-highest)",
  "--mp-card-outline-color": "var(--mp-color-outline)",
  "--mp-card-border-radius": "4px",
  "--mp-card-image-width": "100%",
  "--mp-card-row-image-width": "140px",
  "--mp-card-image-height": "200px",
  "--mp-card-row-height": "140px",
  "--mp-card-title-font-size": "20px",
  "--mp-card-title-padding": "0 12px",
  "--mp-card-title-margin": "15px 0 0 0",
  "--mp-card-title-row-margin": "12px 0",
  "--mp-card-content-padding": "0 16px",
  "--mp-card-content-margin": "16px 0 0 0",
  "--mp-card-content-color": "var(--mp-color-on-surface-variant)",
  "--mp-card-content-font-size": "14px",
  "--mp-card-content-row-margin": "16px 0 0 0",
  "--mp-card-subtitle-font-size": "14px",
  "--mp-card-subtitle-padding": "0 12px",
  "--mp-card-subtitle-margin": "10px 0 0 0",
  "--mp-card-subtitle-row-margin": "-8px 0 0 0",
  "--mp-card-description-font-size": "14px",
  "--mp-card-description-margin": "20px 0 0 0",
  "--mp-card-description-padding": "0 13px",
  "--mp-card-footer-padding": "0 12px",
  "--mp-card-footer-right": "13px",
  "--mp-card-footer-bottom": "9px",
  "--mp-card-footer-margin": "30px 0 0 0",
  "--mp-card-line-height": "22px",
  "--mp-card-row-line-height": "1.5",
  "--mp-card-floating-buttons-bottom": "16px",
  "--mp-card-floating-buttons-right": "16px",
  "--mp-card-floating-buttons-color": "#fff",
  "--mp-card-close-button-icon-size": "24px",
  "--mp-card-close-button-size": "56px",
  "--mp-card-close-button-primary-color": "#212121",
  "--mp-card-close-button-text-color": "#fff",
  "--mp-card-close-button-border-radius": "50%"
}, G3 = {
  "--mp-cell-description-color": "#aaa",
  "--mp-cell-color": "var(--mp-color-text)",
  "--mp-cell-font-size": "var(--mp-font-size-md)",
  "--mp-cell-description-font-size": "var(--mp-font-size-sm)",
  "--mp-cell-description-margin-top": "4px",
  "--mp-cell-padding": "10px 12px",
  "--mp-cell-min-height": "40px",
  "--mp-cell-border-color": "var(--mp-color-outline)",
  "--mp-cell-border-left": "12px",
  "--mp-cell-border-right": "12px",
  "--mp-cell-icon-right": "8px",
  "--mp-cell-extra-left": "8px"
}, Z3 = {
  "--mp-checkbox-unchecked-color": "#fff",
  "--mp-checkbox-text-color": "#fff",
  "--mp-checkbox-checked-color": "var(--mp-color-primary)",
  "--mp-checkbox-disabled-color": "var(--mp-color-text-disabled)",
  "--mp-checkbox-error-color": "var(--mp-color-danger)",
  "--mp-checkbox-action-padding": "6px",
  "--mp-checkbox-icon-size": "24px"
}, J3 = {
  "--mp-chip-default-color": "#555",
  "--mp-chip-default-text-color": "#fff",
  "--mp-chip-primary-text-color": "var(--mp-color-on-primary-container)",
  "--mp-chip-danger-text-color": "var(--mp-color-on-danger-container)",
  "--mp-chip-success-text-color": "var(--mp-color-on-success-container)",
  "--mp-chip-warning-text-color": "var(--mp-color-on-warning-container)",
  "--mp-chip-info-text-color": "var(--mp-color-on-info-container)",
  "--mp-chip-primary-color": "var(--mp-color-primary-container)",
  "--mp-chip-danger-color": "var(--mp-color-danger-container)",
  "--mp-chip-success-color": "var(--mp-color-success-container)",
  "--mp-chip-warning-color": "var(--mp-color-warning-container)",
  "--mp-chip-info-color": "var(--mp-color-info-container)",
  "--mp-chip-primary-plain-color": "var(--mp-color-primary)",
  "--mp-chip-danger-plain-color": "var(--mp-color-danger)",
  "--mp-chip-success-plain-color": "var(--mp-color-success)",
  "--mp-chip-warning-plain-color": "var(--mp-color-warning)",
  "--mp-chip-info-plain-color": "var(--mp-color-info)",
  "--mp-chip-border-radius": "2px",
  "--mp-chip-normal-height": "32px",
  "--mp-chip-large-height": "40px",
  "--mp-chip-small-height": "24px",
  "--mp-chip-mini-height": "16px",
  "--mp-chip-round-radius": "100px",
  "--mp-chip-normal-padding": "0 10px",
  "--mp-chip-large-padding": "0 17px",
  "--mp-chip-small-padding": "0 6px",
  "--mp-chip-mini-padding": "0 4px",
  "--mp-chip-text-normal-margin": "0 5px",
  "--mp-chip-text-large-margin": "0 5px",
  "--mp-chip-text-small-margin": "0 3px",
  "--mp-chip-text-mini-margin": "0 2px",
  "--mp-chip-mini-font-size": "var(--mp-font-size-xs)",
  "--mp-chip-small-font-size": "var(--mp-font-size-sm)",
  "--mp-chip-normal-font-size": "var(--mp-font-size-md)",
  "--mp-chip-large-font-size": "var(--mp-font-size-lg)"
}, Q3 = {
  "--mp-code-font-size": "14px",
  "--mp-code-line-height": "1.7"
}, x3 = {
  "--mp-collapse-text-color": "#fff",
  "--mp-collapse-background": "var(--mp-color-surface-container-highest)",
  "--mp-collapse-header-font-size": "var(--mp-font-size-lg)",
  "--mp-collapse-header-padding": "10px 12px",
  "--mp-collapse-content-font-size": "var(--mp-font-size-md)",
  "--mp-collapse-content-padding": "0 12px 10px",
  "--mp-collapse-item-margin-top": "16px",
  "--mp-collapse-disable-color": "#bdbdbd",
  "--mp-collapse-border-top": "thin solid var(--mp-color-outline)"
}, _3 = {
  "--mp-countdown-text-color": "var(--mp-color-text)",
  "--mp-countdown-text-font-size": "var(--mp-font-size-lg)"
}, eE = {
  "--mp-counter-padding": "0 4px",
  "--mp-counter-font-color": "#fff",
  "--mp-counter-background": "var(--mp-color-primary)",
  "--mp-counter-input-width": "28px",
  "--mp-counter-input-margin": "0 4px",
  "--mp-counter-input-font-size": "14px",
  "--mp-counter-button-size": "28px",
  "--mp-counter-button-text-color": "#fff",
  "--mp-counter-button-icon-size": "100%",
  "--mp-counter-disabled-color": "var(--mp-color-disabled)",
  "--mp-counter-disabled-opacity": "var(--mp-opacity-disabled)",
  "--mp-counter-error-color": "var(--mp-color-danger)"
}, nE = {
  "--mp-date-picker-main-color": "#fff",
  "--mp-date-picker-body-background-color": "#303030",
  "--mp-day-picker-head-item-color": "#aaaaaa",
  "--mp-year-picker-item-color": "#fff",
  "--mp-date-picker-header-color": "#fff",
  "--mp-date-picker-border-radius": "4px",
  "--mp-date-picker-font-size": "var(--mp-font-size-md)",
  "--mp-date-picker-min-width": "290px",
  "--mp-date-picker-title-hint-color": "#fff",
  "--mp-date-picker-title-hint-font-size": "var(--mp-font-size-md)",
  "--mp-date-picker-title-height": "105px",
  "--mp-date-picker-title-padding": "16px",
  "--mp-date-picker-title-background": "var(--mp-color-primary)",
  "--mp-date-picker-title-color": "#fff",
  "--mp-date-picker-title-year-font-size": "var(--mp-font-size-md)",
  "--mp-date-picker-title-year-font-weight": "500",
  "--mp-date-picker-title-year-margin-bottom": "8px",
  "--mp-date-picker-title-date-height": "48px",
  "--mp-date-picker-title-date-font-size": "34px",
  "--mp-date-picker-title-date-font-weight": "500",
  "--mp-date-picker-title-date-range-font-size": "20px",
  "--mp-date-picker-title-date-justify-content": "normal",
  "--mp-date-picker-body-height": "280px",
  "--mp-date-picker-body-padding": "0",
  "--mp-date-picker-header-padding": "4px 16px",
  "--mp-date-picker-actions-padding": "0 8px 12px 8px",
  "--mp-date-picker-header-arrow-filter": "opacity(0.54)",
  "--mp-month-picker-padding": "0 12px",
  "--mp-month-picker-item-width": "33%",
  "--mp-month-picker-item-height": "56px",
  "--mp-month-picker-item-button-max-width": "140px",
  "--mp-year-picker-padding": "0 12px",
  "--mp-year-picker-item-width": "33%",
  "--mp-year-picker-item-height": "56px",
  "--mp-year-picker-item-button-max-width": "140px",
  "--mp-day-picker-content-item-width": "14.28%",
  "--mp-day-picker-content-item-font-size": "var(--mp-font-size-sm)",
  "--mp-day-picker-content-item-padding": "2px 0",
  "--mp-day-picker-content-item-button-width": "32px",
  "--mp-day-picker-content-item-button-height": "32px",
  "--mp-day-picker-content-item-button-font-size": "var(--mp-font-size-sm)",
  "--mp-day-picker-head-item-padding": "8px 0",
  "--mp-day-picker-head-item-font-weight": "600"
}, tE = {
  "--mp-dialog-title-color": "#fff",
  "--mp-dialog-message-color": "#bbb",
  "--mp-dialog-width": "280px",
  "--mp-dialog-border-radius": "3px",
  "--mp-dialog-title-padding": "20px 20px 0",
  "--mp-dialog-message-padding": "12px 20px",
  "--mp-dialog-message-line-height": "24px",
  "--mp-dialog-message-font-size": "var(--mp-font-size-md)",
  "--mp-dialog-title-font-size": "var(--mp-font-size-lg)",
  "--mp-dialog-actions-padding": "0 12px 12px",
  "--mp-dialog-button-margin-left": "6px",
  "--mp-dialog-confirm-button-color": "var(--mp-color-primary)",
  "--mp-dialog-cancel-button-color": "var(--mp-color-primary)",
  "--mp-dialog-background": "var(--mp-color-surface-container-low)"
}, oE = {
  "--mp-divider-text-color": "#aaa",
  "--mp-divider-color": "var(--mp-color-outline)",
  "--mp-divider-text-margin": "8px 0",
  "--mp-divider-text-padding": "0 8px",
  "--mp-divider-inset": "72px"
}, rE = {
  "--mp-fab-top": "70px",
  "--mp-fab-bottom": "16px",
  "--mp-fab-left": "16px",
  "--mp-fab-right": "16px",
  "--mp-fab-trigger-size": "56px",
  "--mp-fab-trigger-border-radius": "50%",
  "--mp-fab-trigger-inactive-icon-size": "26px",
  "--mp-fab-trigger-active-icon-size": "22px",
  "--mp-fab-actions-padding": "10px 0",
  "--mp-fab-action-margin": "6px",
  "--mp-fab-action-size": "40px",
  "--mp-fab-action-border-radius": "50%",
  "--mp-fab-transition-standard-easing": "cubic-bezier(0.4, 0, 0.2, 1)"
}, aE = {
  "--mp-field-decorator-text-color": "#fff",
  "--mp-field-decorator-blur-color": "rgb(255, 255, 255, .7)",
  "--mp-field-decorator-error-color": "var(--mp-color-danger)",
  "--mp-field-decorator-focus-color": "var(--mp-color-primary)",
  "--mp-field-decorator-placeholder-size": "16px",
  "--mp-field-decorator-icon-size": "20px",
  "--mp-field-decorator-line-size": "1px",
  "--mp-field-decorator-line-focus-size": "2px",
  "--mp-field-decorator-line-border-radius": "4px",
  "--mp-field-decorator-disabled-color": "var(--mp-color-text-disabled)",
  "--mp-field-decorator-standard-normal-margin-top": "22px",
  "--mp-field-decorator-standard-normal-margin-bottom": "4px",
  "--mp-field-decorator-standard-normal-icon-margin-top": "22px",
  "--mp-field-decorator-standard-normal-icon-margin-bottom": "4px",
  "--mp-field-decorator-standard-normal-non-hint-margin-top": "4px",
  "--mp-field-decorator-standard-small-margin-top": "18px",
  "--mp-field-decorator-standard-small-margin-bottom": "4px",
  "--mp-field-decorator-standard-small-icon-margin-top": "18px",
  "--mp-field-decorator-standard-small-icon-margin-bottom": "4px",
  "--mp-field-decorator-standard-small-non-hint-margin-top": "2px",
  "--mp-field-decorator-outlined-normal-margin-top": "16px",
  "--mp-field-decorator-outlined-normal-margin-bottom": "16px",
  "--mp-field-decorator-outlined-normal-padding-left": "16px",
  "--mp-field-decorator-outlined-normal-padding-right": "16px",
  "--mp-field-decorator-outlined-normal-placeholder-space": "4px",
  "--mp-field-decorator-outlined-normal-icon-margin-top": "16px",
  "--mp-field-decorator-outlined-normal-icon-margin-bottom": "16px",
  "--mp-field-decorator-outlined-small-margin-top": "8px",
  "--mp-field-decorator-outlined-small-margin-bottom": "8px",
  "--mp-field-decorator-outlined-small-padding-left": "12px",
  "--mp-field-decorator-outlined-small-padding-right": "12px",
  "--mp-field-decorator-outlined-small-placeholder-space": "2px",
  "--mp-field-decorator-outlined-small-icon-margin-top": "8px",
  "--mp-field-decorator-outlined-small-icon-margin-bottom": "8px"
}, iE = {
  "--mp-floating-panel-z-index": "999",
  "--mp-floating-panel-border-top": "none",
  "--mp-floating-panel-border-radius": "0",
  "--mp-floating-panel-background": "var(--mp-color-surface-container-high)",
  "--mp-floating-panel-header-height": "30px",
  "--mp-floating-panel-toolbar-width": "20px",
  "--mp-floating-panel-toolbar-height": "3px",
  "--mp-floating-panel-toolbar-border-radius": "10px",
  "--mp-floating-panel-toolbar-background": "#ddd",
  "--mp-floating-panel-transition-timing-function": "cubic-bezier(0.18, 0.89, 0.32, 1.28)"
}, lE = {
  "--mp-form-details-error-message-color": "var(--mp-color-danger)",
  "--mp-form-details-extra-message-color": "#888",
  "--mp-form-details-margin-top": "6px",
  "--mp-form-details-font-size": "12px",
  "--mp-form-details-message-margin-right": "4px"
}, sE = {
  "--mp-hover-overlay-opacity": "var(--mp-opacity-hover)",
  "--mp-hover-overlay-focusing-opacity": "var(--mp-opacity-focus)"
}, uE = {
  "--mp-icon-size": "20px"
}, cE = {
  "--mp-image-preview-swipe-indicators-text-color": "#ddd",
  "--mp-image-preview-swipe-indicators-padding": "16px 0",
  "--mp-image-preview-zoom-container-background": "#000",
  "--mp-image-preview-close-icon-top": "14px",
  "--mp-image-preview-close-icon-right": "14px",
  "--mp-image-preview-extra-top": "14px",
  "--mp-image-preview-extra-left": "14px",
  "--mp-image-preview-close-icon-size": "22px",
  "--mp-image-preview-close-icon-color": "#fff"
}, dE = {
  "--mp-index-bar-list-right": "0",
  "--mp-index-bar-list-top": "50%",
  "--mp-index-bar-list-left": "auto",
  "--mp-index-bar-list-bottom": "auto",
  "--mp-index-bar-list-transform": "translate(0, -50%)",
  "--mp-index-bar-list-item-font-size": "var(--mp-font-size-xs)",
  "--mp-index-bar-list-item-color": "var(--mp-color-primary)",
  "--mp-index-bar-list-item-active-color": "var(--mp-color-danger)",
  "--mp-index-bar-list-item-height": "14px",
  "--mp-index-bar-list-item-padding": "0 10px"
}, pE = {
  "--mp-input-input-height": "24px",
  "--mp-input-input-font-size": "16px",
  "--mp-input-textarea-height": "auto"
}, mE = {
  "--mp-link-default-color": "#fff",
  "--mp-link-primary-color": "var(--mp-color-primary)",
  "--mp-link-danger-color": "var(--mp-color-danger)",
  "--mp-link-success-color": "var(--mp-color-success)",
  "--mp-link-warning-color": "var(--mp-color-warning)",
  "--mp-link-info-color": "var(--mp-color-info)",
  "--mp-link-disabled-color": "var(--mp-color-text-disabled)",
  "--mp-link-font-size": "var(--mp-font-size-md)",
  "--mp-link-focus-opacity": "0.8"
}, fE = {
  "--mp-list-loading-height": "50px",
  "--mp-list-finished-height": "50px",
  "--mp-list-error-height": "50px",
  "--mp-list-loading-color": "#888",
  "--mp-list-finished-color": "#888",
  "--mp-list-error-color": "#888",
  "--mp-list-loading-font-size": "var(--mp-font-size-md)",
  "--mp-list-finished-font-size": "var(--mp-font-size-md)",
  "--mp-list-error-font-size": "var(--mp-font-size-md)"
}, vE = {
  "--mp-loading-color": "var(--mp-color-primary)",
  "--mp-loading-opacity": "0.38",
  "--mp-loading-desc-margin": "8px 0 0",
  "--mp-loading-desc-color": "var(--mp-color-primary)"
}, gE = {
  "--mp-loading-bar-color": "var(--mp-color-primary)",
  "--mp-loading-bar-error-color": "var(--mp-color-danger)",
  "--mp-loading-bar-height": "3px"
}, hE = {
  "--mp-menu-background-color": "#272727",
  "--mp-menu-border-radius": "2px"
}, bE = {
  "--mp-menu-option-text-color": "#fff",
  "--mp-menu-option-normal-height": "38px",
  "--mp-menu-option-small-height": "30px",
  "--mp-menu-option-mini-height": "24px",
  "--mp-menu-option-large-height": "46px",
  "--mp-menu-option-padding": "0 12px",
  "--mp-menu-option-normal-font-size": "var(--mp-font-size-md)",
  "--mp-menu-option-small-font-size": "var(--mp-font-size-sm)",
  "--mp-menu-option-mini-font-size": "var(--mp-font-size-xs)",
  "--mp-menu-option-large-font-size": "var(--mp-font-size-lg)",
  "--mp-menu-option-selected-background": "var(--mp-color-primary)",
  "--mp-menu-option-disabled-color": "var(--mp-color-text-disabled)"
}, yE = {
  "--mp-menu-select-menu-background-color": "#272727",
  "--mp-menu-select-menu-max-height": "278px",
  "--mp-menu-select-menu-padding": "0",
  "--mp-menu-select-menu-border-radius": "2px"
}, wE = {
  "--mp-option-text-color": "#fff",
  "--mp-option-height": "38px",
  "--mp-option-padding": "0 12px",
  "--mp-option-font-size": "16px",
  "--mp-option-selected-background": "var(--mp-field-decorator-focus-color)",
  "--mp-option-disabled-color": "var(--mp-color-text-disabled)"
}, kE = {
  "--mp-overlay-background-color": "rgba(0, 0, 0, 0.6)"
}, $E = {
  "--mp-pagination-text-color": "#fff",
  "--mp-pagination-hover-bg-color": "rgba(255, 255, 255, .15)",
  "--mp-pagination-item-background": "#303030",
  "--mp-pagination-font-size": "var(--mp-font-size-md)",
  "--mp-pagination-active-color": "var(--mp-color-on-primary)",
  "--mp-pagination-active-bg-color": "var(--mp-color-primary)",
  "--mp-pagination-total-margin": "0 10px",
  "--mp-pagination-total-line-height": "24px",
  "--mp-pagination-item-width": "32px",
  "--mp-pagination-item-height": "32px",
  "--mp-pagination-item-margin": "0 6px",
  "--mp-pagination-item-border-radius": "4px",
  "--mp-pagination-item-simple-border-radius": "50%",
  "--mp-pagination-input-width": "32px",
  "--mp-pagination-disabled-color": "var(--mp-color-text-disabled)",
  "--mp-pagination-bg-disabled-color": "var(--mp-color-disabled)",
  "--mp-pagination-size-line-height": "24px",
  "--mp-pagination-size-padding": "0 4px",
  "--mp-pagination-quick-jumper-margin": "0 10px"
}, CE = {
  "--mp-paper-background": "var(--mp-color-surface-container-highest)",
  "--mp-paper-border-radius": "4px"
}, SE = {
  "--mp-picker-background": "#1e1e1e",
  "--mp-picker-cancel-button-text-color": "#aaa",
  "--mp-picker-title-text-color": "#fff",
  "--mp-picker-option-text-color": "#fff",
  "--mp-picker-mask-background-image": "linear-gradient(180deg, hsla(0, 0%, 12%, 0.9), hsla(0, 0%, 12%, 0.4)), linear-gradient(0deg, hsla(0, 0%, 12%, 0.9), hsla(0, 0%, 12%, 0.4))",
  "--mp-picker-toolbar-height": "44px",
  "--mp-picker-confirm-button-text-color": "var(--mp-color-primary)",
  "--mp-picker-picked-border": "1px solid var(--mp-color-outline)",
  "--mp-picker-title-font-size": "var(--mp-font-size-lg)",
  "--mp-picker-option-font-size": "var(--mp-font-size-lg)",
  "--mp-picker-toolbar-padding": "0 4px"
}, zE = {
  "--mp-popup-content-background-color": "var(--mp-color-surface-container-low)",
  "--mp-popup-overlay-background-color": "rgba(0, 0, 0, 0.6)"
}, PE = {
  "--mp-progress-label-color": "#fff",
  "--mp-progress-font-size": "var(--mp-font-size-sm)",
  "--mp-progress-track-color": "#d8d8d8",
  "--mp-progress-background": "var(--mp-color-primary)",
  "--mp-progress-default-color": "#f5f5f5",
  "--mp-progress-primary-color": "var(--mp-color-primary)",
  "--mp-progress-danger-color": "var(--mp-color-danger)",
  "--mp-progress-success-color": "var(--mp-color-success)",
  "--mp-progress-warning-color": "var(--mp-color-warning)",
  "--mp-progress-info-color": "var(--mp-color-info)",
  "--mp-progress-linear-border-radius": "0px"
}, OE = {
  "--mp-pull-refresh-background": "#303030",
  "--mp-pull-refresh-size": "40px",
  "--mp-pull-refresh-color": "var(--mp-color-primary)",
  "--mp-pull-refresh-success-color": "var(--mp-color-success)",
  "--mp-pull-refresh-icon-size": "25px"
}, EE = {
  "--mp-radio-unchecked-color": "#fff",
  "--mp-radio-text-color": "#fff",
  "--mp-radio-checked-color": "var(--mp-color-primary)",
  "--mp-radio-disabled-color": "var(--mp-color-text-disabled)",
  "--mp-radio-error-color": "var(--mp-color-danger)",
  "--mp-radio-icon-size": "24px",
  "--mp-radio-action-padding": "6px"
}, TE = {
  "--mp-rate-color": "var(--mp-color-text)",
  "--mp-rate-size": "24px",
  "--mp-rate-disabled-color": "var(--mp-color-text-disabled)",
  "--mp-rate-error-color": "var(--mp-color-danger)",
  "--mp-rate-action-padding": "4px",
  "--mp-rate-primary-color": "var(--mp-color-primary)"
}, BE = {
  "--mp-result-background": "#303030",
  "--mp-result-title-color": "#ffffff",
  "--mp-result-description-color": "#aaaaaa",
  "--mp-result-question-color": "#7f8e96",
  "--mp-result-question-border-color": "rgba(151,194,216,0.3)",
  "--mp-result-empty-color": "#adadad",
  "--mp-result-empty-border-color": "rgba(232,229,229,0.3)",
  "--mp-result-padding": "24px",
  "--mp-result-border-radius": "3px",
  "--mp-result-title-font-size": "32px",
  "--mp-result-title-margin": "15px 0 0 0",
  "--mp-result-image-size": "80px",
  "--mp-result-title-font-weight": "500",
  "--mp-result-description-margin": "10px 0 0 0",
  "--mp-result-description-font-size": "14px",
  "--mp-result-description-line-height": "1.6",
  "--mp-result-info-color": "var(--mp-color-info)",
  "--mp-result-info-border-color": "rgba(0, 175, 239, 0.3)",
  "--mp-result-success-color": "var(--mp-color-success)",
  "--mp-result-success-border-color": "rgba(0, 196, 143, 0.3)",
  "--mp-result-error-color": "var(--mp-color-danger)",
  "--mp-result-error-border-color": "rgba(244, 67, 54, 0.3)",
  "--mp-result-warning-color": "var(--mp-color-warning)",
  "--mp-result-warning-border-color": "rgba(255, 159, 0, 0.3)"
}, ME = {
  "--mp-ripple-cubic-bezier": "cubic-bezier(0.68, 0.01, 0.62, 0.6)",
  "--mp-ripple-color": "currentColor"
}, DE = {
  "--mp-select-scroller-background": "#272727",
  "--mp-select-scroller-padding": "6px 0",
  "--mp-select-scroller-max-height": "278px",
  "--mp-select-scroller-border-radius": "2px",
  "--mp-select-chips-margin": "-5px 0 0 0",
  "--mp-select-chips-padding": "2px 0",
  "--mp-select-chip-margin": "5px 5px 0 0",
  "--mp-select-arrow-size": "20px",
  "--mp-select-standard-menu-margin": "calc(var(--mp-field-decorator-placeholder-size) * 0.75 + 12px) 0 0 0",
  "--mp-select-label-font-size": "16px"
}, IE = {
  "--mp-signature-background-color": "var(--mp-color-surface-container-highest)",
  "--mp-signature-stroke-color": "#fff",
  "--mp-signature-height": "200px",
  "--mp-signature-border-radius": "4px"
}, AE = {
  "--mp-skeleton-card-background-color": "hsla(0,0%,100%,.12)",
  "--mp-skeleton-animation-background": `linear-gradient(
        90deg,hsla(0,0%,100%,0),hsla(0,0%,100%,.05),hsla(0,0%,100%,0))
      `,
  "--mp-skeleton-avatar-background-color": "hsla(0,0%,100%,.12)",
  "--mp-skeleton-title-background-color": "hsla(0,0%,100%,.12)",
  "--mp-skeleton-content-padding": "16px",
  "--mp-skeleton-card-height": "160px",
  "--mp-skeleton-card-border-radius": "4px",
  "--mp-skeleton-card-margin-bottom": "16px",
  "--mp-skeleton-avatar-size": "34px",
  "--mp-skeleton-avatar-border-radius": "50%",
  "--mp-skeleton-avatar-margin-right": "16px",
  "--mp-skeleton-title-width": "50%",
  "--mp-skeleton-title-border-radius": "10px",
  "--mp-skeleton-row-height": "12px",
  "--mp-skeleton-row-border-radius": "10px",
  "--mp-skeleton-row-margin-top": "10px"
}, NE = {
  "--mp-slider-error-color": "var(--mp-color-danger)",
  "--mp-slider-track-background": "#bdbdbd",
  "--mp-slider-track-height": "2px",
  "--mp-slider-track-border-radius": "0",
  "--mp-slider-track-fill-border-radius": "0",
  "--mp-slider-track-fill-background": "var(--mp-color-primary)",
  "--mp-slider-thumb-block-background": "var(--mp-color-primary)",
  "--mp-slider-thumb-ripple-background": "var(--mp-color-primary)",
  "--mp-slider-thumb-label-background": "var(--mp-color-primary)",
  "--mp-slider-thumb-label-font-size": "var(--mp-font-size-sm)",
  "--mp-slider-thumb-label-text-color": "var(--mp-color-on-primary)",
  "--mp-slider-thumb-size": "12px",
  "--mp-slider-disabled-opacity": "var(--mp-opacity-disabled)"
}, RE = {
  "--mp-snackbar-width": "256px",
  "--mp-snackbar-color": "rgba(255, 255, 255, 0.87)",
  "--mp-snackbar-border-radius": "4px",
  "--mp-snackbar-background": "#333",
  "--mp-snackbar-font-size": "var(--mp-font-size-md)",
  "--mp-snackbar-margin": "6px 24px",
  "--mp-snackbar-border-color": "currentColor",
  "--mp-snackbar-success-background": "var(--mp-color-success)",
  "--mp-snackbar-info-background": "var(--mp-color-info)",
  "--mp-snackbar-error-background": "var(--mp-color-danger)",
  "--mp-snackbar-warning-background": "var(--mp-color-warning)",
  "--mp-snackbar-content-padding": "14px 16px",
  "--mp-snackbar-action-margin": "0 8px",
  "--mp-snackbar-vertical-action-margin": "0 8px 8px 0",
  "--mp-snackbar-icon-margin": "0 8px"
}, LE = {
  "--mp-space-size-xs-row-gap": "4px",
  "--mp-space-size-xs-column-gap": "4px",
  "--mp-space-size-sm-row-gap": "6px",
  "--mp-space-size-sm-column-gap": "6px",
  "--mp-space-size-md-row-gap": "8px",
  "--mp-space-size-md-column-gap": "12px",
  "--mp-space-size-lg-row-gap": "12px",
  "--mp-space-size-lg-column-gap": "20px",
  "--mp-space-size-xl-row-gap": "16px",
  "--mp-space-size-xl-column-gap": "24px"
}, VE = {
  "--mp-step-content-color": "rgba(255, 255, 255, .38)",
  "--mp-step-content-active-color": "#fff",
  "--mp-step-line-background": "#fff",
  "--mp-step-tag-size": "20px",
  "--mp-step-tag-background": "#9e9e9e",
  "--mp-step-tag-font-size": "var(--mp-font-size-md)",
  "--mp-step-tag-color": "var(--mp-color-on-primary)",
  "--mp-step-tag-active-color": "var(--mp-color-primary)",
  "--mp-step-tag-margin": "4px 0",
  "--mp-step-tag-icon-size": "var(--mp-font-size-lg)",
  "--mp-step-content-font-size": "var(--mp-font-size-md)",
  "--mp-step-line-gap": "8px",
  "--mp-step-vertical-tag-margin": "0 4px",
  "--mp-step-vertical-min-height": "50px"
}, FE = {
  "--mp-carousel-indicator-color": "#fff",
  "--mp-carousel-indicators-offset": "10px",
  "--mp-carousel-indicator-offset": "4px",
  "--mp-carousel-navigation-z-index": "9",
  "--mp-carousel-navigation-button-width": "36px",
  "--mp-carousel-navigation-button-height": "36px",
  "--mp-carousel-navigation-button-border-radius": "50%",
  "--mp-carousel-navigation-icon-size": "20px",
  "--mp-carousel-navigation-prev-left": "8px",
  "--mp-carousel-navigation-next-right": "8px",
  "--mp-carousel-navigation-prev-top": "8px",
  "--mp-carousel-navigation-next-bottom": "8px"
}, UE = {
  "--mp-switch-track-background": "#727272",
  "--mp-switch-handle-background": "#727272",
  "--mp-switch-track-active-background": "var(--mp-color-primary)",
  "--mp-switch-track-error-background": "var(--mp-color-danger)",
  "--mp-switch-ripple-color": "var(--mp-color-primary)",
  "--mp-switch-handle-color": "var(--mp-color-on-primary)",
  "--mp-switch-handle-active-color": "var(--mp-color-on-primary)",
  "--mp-switch-handle-active-background": "var(--mp-color-primary)",
  "--mp-switch-handle-error-background": "var(--mp-color-danger)",
  "--mp-switch-disabled-opacity": "var(--mp-opacity-disabled)",
  "--mp-switch-variant-width": "52px",
  "--mp-switch-variant-height": "32px",
  "--mp-switch-variant-track-background": "var(--mp-color-surface-container-highest)",
  "--mp-switch-variant-handle-width": "24px",
  "--mp-switch-variant-handle-height": "24px",
  "--mp-switch-variant-track-border-color": "rgb(255, 255, 255, .7)",
  "--mp-switch-variant-handle-background": "rgb(255, 255, 255, .7)",
  "--mp-switch-variant-handle-color": "var(--mp-color-primary)",
  "--mp-switch-variant-handle-active-color": "var(--mp-color-primary)",
  "--mp-switch-variant-handle-active-background": "var(--mp-color-on-primary)",
  "--mp-switch-width": "40px",
  "--mp-switch-height": "24px",
  "--mp-switch-track-width": "38px",
  "--mp-switch-track-height": "14.4px",
  "--mp-switch-track-border-radius": "calc(20px * 2 / 3)",
  "--mp-switch-handle-width": "20px",
  "--mp-switch-handle-height": "20px",
  "--mp-switch-ripple-size": "40px",
  "--mp-switch-ripple-left": "-10px",
  "--mp-switch-ripple-active-left": "10px",
  "--mp-switch-loading-size": "16px",
  "--mp-switch-variant-ripple-left": "-4px",
  "--mp-switch-variant-ripple-active-left": "16px"
}, jE = {
  "--mp-tab-inactive-color": "rgba(255, 255, 255, .65)",
  "--mp-tab-padding": "12px",
  "--mp-tab-active-color": "var(--mp-color-primary)",
  "--mp-tab-disabled-color": "var(--mp-color-text-disabled)",
  "--mp-tab-font-size": "var(--mp-font-size-md)",
  "--mp-tab-font-weight": "400",
  "--mp-tab-active-font-size": "var(--mp-font-size-md)",
  "--mp-tab-active-font-weight": "400"
}, HE = {
  "--mp-table-background": "#303030",
  "--mp-table-thead-th-text-color": "rgba(255, 255, 255, 0.6)",
  "--mp-table-thead-th-text-align": "left",
  "--mp-table-tbody-td-text-color": "#fff",
  "--mp-table-tbody-tr-hover-background": "#4c4b4b",
  "--mp-table-border-radius": "2px",
  "--mp-table-thead-border-bottom": "thin solid var(--mp-color-outline)",
  "--mp-table-thead-th-font-size": "14px",
  "--mp-table-thead-tr-border-bottom": "thin solid var(--mp-color-outline)",
  "--mp-table-tbody-tr-border-bottom": "thin solid var(--mp-color-outline)",
  "--mp-table-tbody-td-font-size": "16px",
  "--mp-table-tbody-td-text-align": "left",
  "--mp-table-row-height": "46px",
  "--mp-table-row-padding": "0 16px",
  "--mp-table-footer-border-top": "thin solid var(--mp-color-outline)"
}, YE = {
  "--mp-tabs-background": "#1e1e1e",
  "--mp-tabs-item-horizontal-height": "44px",
  "--mp-tabs-item-vertical-height": "66px",
  "--mp-tabs-radius": "2px",
  "--mp-tabs-padding": "12px",
  "--mp-tabs-indicator-size": "2px",
  "--mp-tabs-indicator-border-radius": "0",
  "--mp-tabs-indicator-background": "var(--mp-color-primary)",
  "--mp-tabs-indicator-inner-size": "100%"
}, WE = {
  "--mp-time-picker-clock-container-background": "#545454",
  "--mp-time-picker-body-background": "#303030",
  "--mp-time-picker-clock-item-disable-color": "#fff",
  "--mp-time-picker-clock-item-disable-background": "#aaaaaa",
  "--mp-time-picker-clock-item-text-color": "#fff",
  "--mp-time-picker-border-radius": "4px",
  "--mp-time-picker-font-size": "var(--mp-font-size-md)",
  "--mp-time-picker-min-width": "290px",
  "--mp-time-picker-title-height": "105px",
  "--mp-time-picker-title-padding": "16px",
  "--mp-time-picker-title-margin-bottom": "8px",
  "--mp-time-picker-title-color": "#fff",
  "--mp-time-picker-title-background": "var(--mp-color-primary)",
  "--mp-time-picker-title-hint-color": "#fff",
  "--mp-time-picker-title-hint-font-size": "14px",
  "--mp-time-picker-title-inactive-opacity": "0.6",
  "--mp-time-picker-title-time-font-size": "50px",
  "--mp-time-picker-title-time-margin": "0 5px",
  "--mp-time-picker-title-time-border-radius": "0",
  "--mp-time-picker-title-time-padding": "0",
  "--mp-time-picker-title-time-background": "transparent",
  "--mp-time-picker-title-time-active-background": "transparent",
  "--mp-time-picker-title-ampm-button-active-background": "transparent",
  "--mp-time-picker-title-ampm-margin-left": "10px",
  "--mp-time-picker-title-ampm-border-radius": "0",
  "--mp-time-picker-title-ampm-border": "none",
  "--mp-time-picker-title-ampm-button-padding": "2px",
  "--mp-time-picker-clock-left": "27px",
  "--mp-time-picker-clock-right": "27px",
  "--mp-time-picker-clock-top": "27px",
  "--mp-time-picker-clock-bottom": "27px",
  "--mp-time-picker-clock-container-width": "256px",
  "--mp-time-picker-clock-container-height": "256px",
  "--mp-time-picker-clock-hand-height": "calc(50% - 4px)",
  "--mp-time-picker-clock-hand-width": "2px",
  "--mp-time-picker-clock-hand-bottom": "50%",
  "--mp-time-picker-clock-hand-left": "calc(50% - 1px)",
  "--mp-time-picker-clock-hand-background": "var(--mp-color-primary)",
  "--mp-time-picker-clock-hand-border-color": "var(--mp-color-primary)",
  "--mp-time-picker-clock-hand-before-width": "10px",
  "--mp-time-picker-clock-hand-before-height": "10px",
  "--mp-time-picker-clock-hand-before-border-width": "2px",
  "--mp-time-picker-clock-hand-after-width": "4px",
  "--mp-time-picker-clock-hand-after-height": "4px",
  "--mp-time-picker-clock-item-height": "32px",
  "--mp-time-picker-clock-item-width": "32px",
  "--mp-time-picker-clock-item-active-background": "var(--mp-color-primary)",
  "--mp-time-picker-clock-item-active-color": "var(--mp-color-on-primary)",
  "--mp-time-picker-inner-left": "36px",
  "--mp-time-picker-inner-right": "36px",
  "--mp-time-picker-inner-top": "36px",
  "--mp-time-picker-inner-bottom": "36px",
  "--mp-time-picker-body-height": "288px",
  "--mp-time-picker-actions-padding": "0 8px 12px 8px",
  "--mp-time-picker-title-time-container-justify-content": "flex-end"
}, KE = {
  "--mp-tooltip-opacity": "0.9",
  "--mp-tooltip-border-radius": "4px",
  "--mp-tooltip-font-size": "14px",
  "--mp-tooltip-padding": "8px 16px",
  "--mp-tooltip-offset": "10px",
  "--mp-tooltip-default-color": "#616161",
  "--mp-tooltip-primary-color": "var(--mp-color-primary)",
  "--mp-tooltip-info-color": "var(--mp-color-info)",
  "--mp-tooltip-success-color": "var(--mp-color-success)",
  "--mp-tooltip-warning-color": "var(--mp-color-warning)",
  "--mp-tooltip-danger-color": "var(--mp-color-danger)",
  "--mp-tooltip-default-text-color": "#fff",
  "--mp-tooltip-primary-text-color": "var(--mp-color-on-primary)",
  "--mp-tooltip-info-text-color": "var(--mp-color-on-info)",
  "--mp-tooltip-success-text-color": "var(--mp-color-on-success)",
  "--mp-tooltip-warning-text-color": "var(--mp-color-on-warning)",
  "--mp-tooltip-danger-text-color": "var(--mp-color-on-danger)"
}, qE = {
  "--mp-uploader-action-background": "#303030",
  "--mp-uploader-action-icon-color": "#fff",
  "--mp-uploader-file-name-background": "#303030",
  "--mp-uploader-file-name-color": "#aaa",
  "--mp-uploader-file-cover-background": "#303030",
  "--mp-uploader-action-icon-size": "24px",
  "--mp-uploader-action-margin": "0 10px 10px 0",
  "--mp-uploader-file-size": "80px",
  "--mp-uploader-file-margin": "0 10px 10px 0",
  "--mp-uploader-file-name-font-size": "12px",
  "--mp-uploader-file-name-padding": "10px",
  "--mp-uploader-file-text-align": "center",
  "--mp-uploader-file-border-radius": "0",
  "--mp-uploader-file-close-background": "rgba(0, 0, 0, 0.3)",
  "--mp-uploader-file-close-size": "24px",
  "--mp-uploader-file-close-icon-font-size": "14px",
  "--mp-uploader-file-close-icon-color": "#fff",
  "--mp-uploader-file-cover-fit": "cover",
  "--mp-uploader-preview-video-width": "100vw",
  "--mp-uploader-preview-video-height": "100vw",
  "--mp-uploader-file-indicator-height": "4px",
  "--mp-uploader-file-indicator-normal-color": "var(--mp-color-disabled)",
  "--mp-uploader-file-indicator-success-color": "var(--mp-color-success)",
  "--mp-uploader-file-indicator-error-color": "var(--mp-color-danger)",
  "--mp-uploader-file-progress-color": "var(--mp-color-primary)",
  "--mp-uploader-disabled-color": "var(--mp-color-disabled)",
  "--mp-uploader-disabled-text-color": "var(--mp-color-text-disabled)",
  "--mp-uploader-loading-background": "linear-gradient(90deg, hsla(0, 0%, 100%, 0), hsla(0, 0%, 100%, 0.3), hsla(0, 0%, 100%, 0))"
}, XE = {
  "--mp-watermark-content-color": "#ffffff"
}, GE = Object.defineProperty, Op = Object.getOwnPropertySymbols, ZE = Object.prototype.hasOwnProperty, JE = Object.prototype.propertyIsEnumerable, Ep = (e, n, t) => n in e ? GE(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t, be = (e, n) => {
  for (var t in n || (n = {}))
    ZE.call(n, t) && Ep(e, t, n[t]);
  if (Op)
    for (var t of Op(n))
      JE.call(n, t) && Ep(e, t, n[t]);
  return e;
}, QE = be(be(be(be(be(be(be(be(be(be(be(be(be(be(be(be(be(be(be(be(be(be(be(be(be(be(be(be(be(be(be(be(be(be(be(be(be(be(be(be(be(be(be(be(be(be(be(be(be(be(be(be(be(be(be(be(be(be(be(be(be(be(be(be(be(be({
  "--mp-color-scheme": "dark",
  "--mp-font-size-xs": "10px",
  "--mp-font-size-sm": "12px",
  "--mp-font-size-md": "14px",
  "--mp-font-size-lg": "16px",
  "--mp-icon-size-xs": "16px",
  "--mp-icon-size-sm": "18px",
  "--mp-icon-size-md": "20px",
  "--mp-icon-size-lg": "22px",
  "--mp-hsl-body": "0, 0%, 12%",
  "--mp-color-body": "hsla(var(--mp-hsl-body), 1)",
  "--mp-hsl-text": "0, 0%, 100%",
  "--mp-color-text": "hsla(var(--mp-hsl-text), 1)",
  "--mp-hsl-primary": "224, 99%, 64%",
  "--mp-color-primary": "hsla(var(--mp-hsl-primary), 1)",
  "--mp-hsl-info": "197, 87%, 50%",
  "--mp-color-info": "hsla(var(--mp-hsl-info), 1)",
  "--mp-hsl-success": "162, 85%, 42%",
  "--mp-color-success": "hsla(var(--mp-hsl-success), 1)",
  "--mp-hsl-warning": "32, 100%, 50%",
  "--mp-color-warning": "hsla(var(--mp-hsl-warning), 1)",
  "--mp-hsl-danger": "1, 83%, 63%",
  "--mp-color-danger": "hsla(var(--mp-hsl-danger), 1)",
  "--mp-hsl-on-primary": "0, 0%, 100%",
  "--mp-color-on-primary": "hsla(var(--mp-hsl-on-primary), 1)",
  "--mp-hsl-on-info": "0, 0%, 100%",
  "--mp-color-on-info": "hsla(var(--mp-hsl-on-info), 1)",
  "--mp-hsl-on-success": "0, 0%, 100%",
  "--mp-color-on-success": "hsla(var(--mp-hsl-on-success), 1)",
  "--mp-hsl-on-warning": "0, 0%, 100%",
  "--mp-color-on-warning": "hsla(var(--mp-hsl-on-warning), 1)",
  "--mp-hsl-on-danger": "0, 0%, 100%",
  "--mp-color-on-danger": "hsla(var(--mp-hsl-on-danger), 1)",
  "--mp-hsl-primary-container": "224, 99%, 64%",
  "--mp-color-primary-container": "hsla(var(--mp-hsl-primary-container), 1)",
  "--mp-hsl-info-container": "197, 87%, 50%",
  "--mp-color-info-container": "hsla(var(--mp-hsl-info-container), 1)",
  "--mp-hsl-success-container": "162, 85%, 42%",
  "--mp-color-success-container": "hsla(var(--mp-hsl-success-container), 1)",
  "--mp-hsl-warning-container": "32, 100%, 50%",
  "--mp-color-warning-container": "hsla(var(--mp-hsl-warning-container), 1)",
  "--mp-hsl-danger-container": "1, 83%, 63%",
  "--mp-color-danger-container": "hsla(var(--mp-hsl-danger-container), 1)",
  "--mp-hsl-on-primary-container": "0, 0%, 100%",
  "--mp-color-on-primary-container": "hsla(var(--mp-hsl-on-primary-container), 1)",
  "--mp-hsl-on-info-container": "0, 0%, 100%",
  "--mp-color-on-info-container": "hsla(var(--mp-hsl-on-info-container), 1)",
  "--mp-hsl-on-success-container": "0, 0%, 100%",
  "--mp-color-on-success-container": "hsla(var(--mp-hsl-on-success-container), 1)",
  "--mp-hsl-on-warning-container": "0, 0%, 100%",
  "--mp-color-on-warning-container": "hsla(var(--mp-hsl-on-warning-container), 1)",
  "--mp-hsl-on-danger-container": "0, 0%, 100%",
  "--mp-color-on-danger-container": "hsla(var(--mp-hsl-on-danger-container), 1)",
  "--mp-hsl-disabled": "0, 0%, 25%",
  "--mp-color-disabled": "hsla(var(--mp-hsl-disabled), 1)",
  "--mp-hsl-text-disabled": "0, 0%, 46%",
  "--mp-color-text-disabled": "hsla(var(--mp-hsl-text-disabled), 1)",
  "--mp-hsl-surface-container": "0, 0%, 12%",
  "--mp-color-surface-container": "hsla(var(--mp-hsl-surface-container), 1)",
  "--mp-hsl-surface-container-low": "0, 0%, 12%",
  "--mp-color-surface-container-low": "hsla(var(--mp-hsl-surface-container-low), 1)",
  "--mp-hsl-surface-container-high": "0, 0%, 15%",
  "--mp-color-surface-container-high": "hsla(var(--mp-hsl-surface-container-high), 1)",
  "--mp-hsl-surface-container-highest": "0, 0%, 19%",
  "--mp-color-surface-container-highest": "hsla(var(--mp-hsl-surface-container-highest), 1)",
  "--mp-hsl-inverse-surface": "0, 0%, 100%",
  "--mp-color-inverse-surface": "hsla(var(--mp-hsl-inverse-surface), 1)",
  "--mp-hsl-outline": "0, 0%, 100%",
  "--mp-color-outline": "hsla(var(--mp-hsl-outline), 0.2)",
  "--mp-hsl-on-surface-variant": "0, 0%, 100%",
  "--mp-color-on-surface-variant": "hsla(var(--mp-hsl-on-surface-variant), 1)",
  "--mp-opacity-disabled": "0.6",
  "--mp-opacity-hover": "0.15",
  "--mp-opacity-focus": "0.2",
  "--mp-cubic-bezier": "cubic-bezier(0.25, 0.8, 0.5, 1)",
  "--mp-shadow-key-umbra-opacity": "rgba(0, 0, 0, 0.2)",
  "--mp-shadow-key-penumbra-opacity": "rgba(0, 0, 0, 0.14)",
  "--mp-shadow-key-ambient-opacity": "rgba(0, 0, 0, 0.12)"
}, q3), L3), G3), X3), WE), nE), AE), YE), jE), zE), tE), R3), J3), H3), qE), x3), OE), UE), VE), $E), HE), aE), EE), Z3), oE), SE), V3), W3), hE), BE), K3), F3), mE), PE), wE), XE), yE), bE), U3), j3), Y3), _3), eE), rE), iE), lE), sE), uE), cE), dE), pE), fE), vE), gE), kE), CE), TE), ME), NE), RE), LE), FE), KE), DE), Q3), IE), xE = {
  "--mp-action-sheet-background": "var(--mp-color-surface-container-high)",
  "--mp-action-sheet-title-color": "var(--mp-color-on-surface-variant)",
  "--mp-action-sheet-action-item-color": "var(--mp-color-inverse-surface)",
  "--mp-action-sheet-border-radius": "0px",
  "--mp-action-sheet-border-top": "none",
  "--mp-action-sheet-title-padding": "10px 16px",
  "--mp-action-sheet-title-font-size": "14px",
  "--mp-action-sheet-action-item-height": "48px",
  "--mp-action-sheet-action-item-padding": "0 18px",
  "--mp-action-sheet-action-item-disabled-color": "var(--mp-color-text-disabled)",
  "--mp-action-sheet-icon-margin": "0 20px 0 0",
  "--mp-action-sheet-icon-size": "24px"
}, _E = {
  "--mp-alert-padding": "16px",
  "--mp-alert-border-radius": "4px",
  "--mp-alert-icon-size": "22px",
  "--mp-alert-icon-margin": "0 12px 0 0",
  "--mp-alert-close-icon-size": "22px",
  "--mp-alert-close-icon-margin": "2px 0 0 12px",
  "--mp-alert-action-margin": "0 0 0 12px",
  "--mp-alert-standard-info-bg": "hsla(var(--mp-hsl-info), 0.12)",
  "--mp-alert-standard-info-border": "hsla(var(--mp-hsl-info), 0.5)",
  "--mp-alert-standard-info-text-color": "var(--mp-color-info)",
  "--mp-alert-standard-success-bg": "hsla(var(--mp-hsl-success), 0.12)",
  "--mp-alert-standard-success-border": "hsla(var(--mp-hsl-success), 0.5)",
  "--mp-alert-standard-success-text-color": "var(--mp-color-success)",
  "--mp-alert-standard-warning-bg": "hsla(var(--mp-hsl-warning), 0.12)",
  "--mp-alert-standard-warning-border": "hsla(var(--mp-hsl-warning), 0.5)",
  "--mp-alert-standard-warning-text-color": "var(--mp-color-warning)",
  "--mp-alert-standard-danger-bg": "hsla(var(--mp-hsl-danger), 0.12)",
  "--mp-alert-standard-danger-border": "hsla(var(--mp-hsl-danger), 0.5)",
  "--mp-alert-standard-danger-text-color": "var(--mp-color-danger)",
  "--mp-alert-danger-background": "var(--mp-color-danger)",
  "--mp-alert-success-background": "var(--mp-color-success)",
  "--mp-alert-warning-background": "var(--mp-color-warning)",
  "--mp-alert-info-background": "var(--mp-color-info)",
  "--mp-alert-tonal-danger-background": "hsla(var(--mp-hsl-danger), 0.12)",
  "--mp-alert-tonal-success-background": "hsla(var(--mp-hsl-success), 0.12)",
  "--mp-alert-tonal-warning-background": "hsla(var(--mp-hsl-warning), 0.12)",
  "--mp-alert-tonal-info-background": "hsla(var(--mp-hsl-info), 0.12)",
  "--mp-alert-tonal-danger-text-color": "var(--mp-color-danger)",
  "--mp-alert-tonal-success-text-color": "var(--mp-color-success)",
  "--mp-alert-tonal-warning-text-color": "var(--mp-color-warning)",
  "--mp-alert-tonal-info-text-color": "var(--mp-color-info)",
  "--mp-alert-default-background": "var(--mp-color-fill-2)",
  "--mp-alert-default-text-color": "var(--mp-color-text-1)",
  "--mp-alert-default-border-color": "var(--mp-color-border-2)",
  "--mp-alert-message-font-size": "14px",
  "--mp-alert-title-font-size": "16px",
  "--mp-alert-title-font-weight": "500",
  "--mp-alert-message-margin-top": "4px",
  "--mp-alert-message-line-height": "1.5",
  "--mp-alert-title-line-height": "1.5"
}, eT = {
  "--mp-app-bar-color": "#211F26",
  "--mp-app-bar-text-color": "var(--mp-color-inverse-surface)",
  "--mp-app-bar-title-padding": "0 12px",
  "--mp-app-bar-title-font-size": "var(--mp-font-size-lg)",
  "--mp-app-bar-height": "54px",
  "--mp-app-bar-left-gap": "6px",
  "--mp-app-bar-right-gap": "6px",
  "--mp-app-bar-border-radius": "4px",
  "--mp-app-bar-font-size": "var(--mp-font-size-lg)",
  "--mp-app-bar-border-bottom": "thin solid var(--mp-color-outline)"
}, nT = {
  "--mp-avatar-text-color": "#000",
  "--mp-avatar-background-color": "var(--mp-color-primary)",
  "--mp-avatar-border-radius": "4px",
  "--mp-avatar-mini-size": "28px",
  "--mp-avatar-small-size": "36px",
  "--mp-avatar-normal-size": "48px",
  "--mp-avatar-large-size": "64px",
  "--mp-avatar-border": "2px solid #fff",
  "--mp-avatar-hover-transform": "scale(1.1)"
}, tT = {
  "--mp-avatar-group-offset": "-10px"
}, oT = {
  "--mp-back-top-button-border-radius": "12px",
  "--mp-back-top-right": "40px",
  "--mp-back-top-bottom": "40px",
  "--mp-back-top-button-size": "40px"
}, rT = {
  "--mp-badge-font-weight": "500",
  "--mp-badge-description-size-xs-font-size": "12px",
  "--mp-badge-description-size-sm-font-size": "12px",
  "--mp-badge-description-size-md-font-size": "14px",
  "--mp-badge-description-size-lg-font-size": "16px",
  "--mp-badge-description-size-xl-font-size": "18px",
  "--mp-badge-description-text-color": "var(--mp-color-on-surface, #1d1b20)",
  "--mp-badge-size-xs-font-size": "12px",
  "--mp-badge-size-sm-font-size": "12px",
  "--mp-badge-size-md-font-size": "12px",
  "--mp-badge-size-lg-font-size": "14px",
  "--mp-badge-size-xl-font-size": "16px",
  "--mp-badge-size-xs-scale": "0.6667",
  "--mp-badge-size-sm-scale": "0.8333",
  "--mp-badge-size-md-scale": "1",
  "--mp-badge-size-lg-scale": "1",
  "--mp-badge-size-xl-scale": "1",
  "--mp-badge-size-xs-dot-width": "4px",
  "--mp-badge-size-sm-dot-width": "5px",
  "--mp-badge-size-md-dot-width": "6px",
  "--mp-badge-size-lg-dot-width": "7px",
  "--mp-badge-size-xl-dot-width": "8px",
  "--mp-badge-size-xs-dot-height": "4px",
  "--mp-badge-size-sm-dot-height": "5px",
  "--mp-badge-size-md-dot-height": "6px",
  "--mp-badge-size-lg-dot-height": "7px",
  "--mp-badge-size-xl-dot-height": "8px",
  "--mp-badge-size-xs-space": "0px",
  "--mp-badge-size-sm-space": "2px",
  "--mp-badge-size-md-space": "6px",
  "--mp-badge-size-lg-space": "6px",
  "--mp-badge-size-xl-space": "8px",
  "--mp-badge-size-xs-padding": "0 6px",
  "--mp-badge-size-sm-padding": "0 6px",
  "--mp-badge-size-md-padding": "0 8px",
  "--mp-badge-size-lg-padding": "0 8px",
  "--mp-badge-size-xl-padding": "0 10px",
  "--mp-badge-size-xs-height": "20px",
  "--mp-badge-size-sm-height": "20px",
  "--mp-badge-size-md-height": "24px",
  "--mp-badge-size-lg-height": "28px",
  "--mp-badge-size-xl-height": "32px",
  "--mp-badge-size-xs-border-radius": "20px",
  "--mp-badge-size-sm-border-radius": "20px",
  "--mp-badge-size-md-border-radius": "24px",
  "--mp-badge-size-lg-border-radius": "28px",
  "--mp-badge-size-xl-border-radius": "32px",
  "--mp-badge-bg-color": "#ef4444",
  "--mp-badge-text-color": "#ffffff",
  "--mp-badge-status-default-bg-color": "#e0e0e0",
  "--mp-badge-status-default-text-color": "#1d1b20",
  "--mp-badge-status-info-bg-color": "var(--mp-color-info)",
  "--mp-badge-status-info-text-color": "var(--mp-color-on-info)",
  "--mp-badge-status-success-bg-color": "var(--mp-color-success)",
  "--mp-badge-status-success-text-color": "var(--mp-color-on-success)",
  "--mp-badge-status-warning-bg-color": "var(--mp-color-warning)",
  "--mp-badge-status-warning-text-color": "var(--mp-color-on-warning)",
  "--mp-badge-status-danger-bg-color": "var(--mp-color-danger)",
  "--mp-badge-status-danger-text-color": "var(--mp-color-on-danger)",
  "--mp-badge-status-primary-bg-color": "var(--mp-color-primary)",
  "--mp-badge-status-primary-text-color": "var(--mp-color-on-primary)",
  "--mp-badge-variant-outline-bg-color": "transparent",
  "--mp-badge-variant-outline-text-color": "#ef4444",
  "--mp-badge-variant-outline-status-info-text-color": "var(--mp-color-info)",
  "--mp-badge-variant-outline-status-success-text-color": "var(--mp-color-success)",
  "--mp-badge-variant-outline-status-warning-text-color": "var(--mp-color-warning)",
  "--mp-badge-variant-outline-status-danger-text-color": "var(--mp-color-danger)",
  "--mp-badge-variant-outline-status-primary-text-color": "var(--mp-color-primary)",
  "--mp-badge-variant-outline-status-default-text-color": "#1d1b20"
}, aT = {
  "--mp-bottom-navigation-background-color": "var(--mp-color-surface-container)",
  "--mp-bottom-navigation-height": "50px",
  "--mp-bottom-navigation-variant-height": "66px",
  "--mp-bottom-navigation-z-index": "1",
  "--mp-bottom-navigation-border-color": "var(--mp-color-outline)",
  "--mp-bottom-navigation-fab-offset": "4px",
  "--mp-bottom-navigation-fab-border-radius": "50%"
}, iT = {
  "--mp-bottom-navigation-item-active-background-color": "#4A4458",
  "--mp-bottom-navigation-item-inactive-color": "var(--mp-color-on-surface-variant)",
  "--mp-bottom-navigation-item-variant-active-background-color": "var(--mp-color-info-container)",
  "--mp-bottom-navigation-item-variant-active-color": "var(--mp-color-on-info-container)",
  "--mp-bottom-navigation-fab-border-radius": "12px",
  "--mp-bottom-navigation-item-font-size": "var(--mp-font-size-sm)",
  "--mp-bottom-navigation-item-active-color": "var(--mp-color-primary)",
  "--mp-bottom-navigation-item-line-height": "1",
  "--mp-bottom-navigation-item-icon-size": "22px",
  "--mp-bottom-navigation-item-icon-margin-bottom": "5px",
  "--mp-bottom-navigation-item-variant-icon-container-height": "30px",
  "--mp-bottom-navigation-item-variant-icon-container-border-radius": "100px",
  "--mp-bottom-navigation-item-variant-icon-container-max-width": "58px"
}, lT = {
  "--mp-breadcrumb-item-inactive-color": "var(--mp-color-on-surface-variant)",
  "--mp-breadcrumb-item-active-color": "var(--mp-color-primary)",
  "--mp-breadcrumb-item-separator-margin": "0 10px",
  "--mp-breadcrumb-item-separator-font-size": "14px"
}, sT = {
  "--mp-button-default-color": "#3B383E",
  "--mp-button-default-text-color": "var(--mp-color-primary)",
  "--mp-button-default-icon-color": "var(--mp-color-on-surface-variant)",
  "--mp-button-default-icon-container-color": "var(--mp-color-surface-container-highest)",
  "--mp-button-border-radius": "100px",
  "--mp-button-primary-text-color": "var(--mp-color-on-primary)",
  "--mp-button-danger-text-color": "var(--mp-color-on-danger)",
  "--mp-button-success-text-color": "var(--mp-color-on-success)",
  "--mp-button-warning-text-color": "var(--mp-color-on-warning)",
  "--mp-button-info-text-color": "var(--mp-color-on-info)",
  "--mp-button-primary-color": "var(--mp-color-primary)",
  "--mp-button-danger-color": "var(--mp-color-danger)",
  "--mp-button-success-color": "var(--mp-color-success)",
  "--mp-button-warning-color": "var(--mp-color-warning)",
  "--mp-button-info-color": "var(--mp-color-info)",
  "--mp-button-primary-icon-color": "var(--mp-color-on-primary-container)",
  "--mp-button-danger-icon-color": "var(--mp-color-on-danger-container)",
  "--mp-button-success-icon-color": "var(--mp-color-on-success-container)",
  "--mp-button-warning-icon-color": "var(--mp-color-on-warning-container)",
  "--mp-button-info-icon-color": "var(--mp-color-on-info-container)",
  "--mp-button-primary-icon-container-color": "var(--mp-color-primary-container)",
  "--mp-button-danger-icon-container-color": "var(--mp-color-danger-container)",
  "--mp-button-success-icon-container-color": "var(--mp-color-success-container)",
  "--mp-button-warning-icon-container-color": "var(--mp-color-warning-container)",
  "--mp-button-info-icon-container-color": "var(--mp-color-info-container)",
  "--mp-button-disabled-color": "var(--mp-color-disabled)",
  "--mp-button-disabled-text-color": "var(--mp-color-text-disabled)",
  "--mp-button-mini-padding": "0 8px",
  "--mp-button-small-padding": "0 12px",
  "--mp-button-normal-padding": "0 16px",
  "--mp-button-large-padding": "0 22px",
  "--mp-button-round-padding": "6px",
  "--mp-button-mini-height": "20px",
  "--mp-button-small-height": "28px",
  "--mp-button-normal-height": "36px",
  "--mp-button-large-height": "44px",
  "--mp-button-mini-font-size": "var(--mp-font-size-xs)",
  "--mp-button-small-font-size": "var(--mp-font-size-sm)",
  "--mp-button-normal-font-size": "var(--mp-font-size-md)",
  "--mp-button-large-font-size": "var(--mp-font-size-lg)"
}, uT = {
  "--mp-card-border-radius": "12px",
  "--mp-card-background": "var(--mp-color-surface-container-highest)",
  "--mp-card-filled-background": "var(--mp-color-surface-container-highest)",
  "--mp-card-image-height": "188px",
  "--mp-card-title-color": "var(--mp-color-inverse-surface)",
  "--mp-card-title-font-size": "16px",
  "--mp-card-title-padding": "0 16px",
  "--mp-card-title-margin": "16px 0 0 0",
  "--mp-card-content-padding": "0 16px",
  "--mp-card-content-margin": "16px 0 0 0",
  "--mp-card-content-color": "var(--mp-color-on-surface-variant)",
  "--mp-card-content-font-size": "14px",
  "--mp-card-content-row-margin": "16px 0 0 0",
  "--mp-card-subtitle-color": "var(--mp-color-on-surface-variant)",
  "--mp-card-subtitle-padding": "0 16px",
  "--mp-card-subtitle-margin": "4px 0 0 0",
  "--mp-card-description-margin": "32px 0 0 0",
  "--mp-card-description-padding": "0 16px",
  "--mp-card-description-color": "var(--mp-color-on-surface-variant)",
  "--mp-card-padding": "0 0 16px 0",
  "--mp-card-footer-margin": "32px 0 0 0",
  "--mp-card-title-row-margin": "16px 0 0 0",
  "--mp-card-subtitle-row-margin": "4px 0 0 0",
  "--mp-card-footer-padding": "0 16px",
  "--mp-card-close-button-size": "56px",
  "--mp-card-close-button-primary-color": "var(--mp-color-primary-container)",
  "--mp-card-close-button-text-color": "var(--mp-color-on-primary-container)",
  "--mp-card-close-button-border-radius": "12px",
  "--mp-card-outline-color": "var(--mp-color-outline)",
  "--mp-card-image-width": "100%",
  "--mp-card-row-image-width": "140px",
  "--mp-card-row-height": "140px",
  "--mp-card-subtitle-font-size": "14px",
  "--mp-card-description-font-size": "14px",
  "--mp-card-footer-right": "13px",
  "--mp-card-footer-bottom": "9px",
  "--mp-card-line-height": "22px",
  "--mp-card-row-line-height": "1.5",
  "--mp-card-floating-buttons-bottom": "16px",
  "--mp-card-floating-buttons-right": "16px",
  "--mp-card-floating-buttons-color": "#fff",
  "--mp-card-close-button-icon-size": "24px"
}, cT = {
  "--mp-cell-description-color": "var(--mp-color-on-surface-variant)",
  "--mp-cell-color": "var(--mp-color-text)",
  "--mp-cell-font-size": "var(--mp-font-size-md)",
  "--mp-cell-description-font-size": "var(--mp-font-size-sm)",
  "--mp-cell-description-margin-top": "4px",
  "--mp-cell-padding": "10px 12px",
  "--mp-cell-min-height": "40px",
  "--mp-cell-border-color": "var(--mp-color-outline)",
  "--mp-cell-border-left": "12px",
  "--mp-cell-border-right": "12px",
  "--mp-cell-icon-right": "8px",
  "--mp-cell-extra-left": "8px"
}, dT = {
  "--mp-checkbox-unchecked-color": "var(--mp-color-on-surface-variant)",
  "--mp-checkbox-text-color": "var(--mp-color-on-surface-variant)",
  "--mp-checkbox-checked-color": "var(--mp-color-primary)",
  "--mp-checkbox-disabled-color": "var(--mp-color-text-disabled)",
  "--mp-checkbox-error-color": "var(--mp-color-danger)",
  "--mp-checkbox-action-padding": "6px",
  "--mp-checkbox-icon-size": "24px"
}, pT = {
  "--mp-chip-round-radius": "8px",
  "--mp-chip-default-color": "var(--mp-color-surface-container-highest)",
  "--mp-chip-default-text-color": "var(--mp-color-on-surface-variant)",
  "--mp-chip-primary-text-color": "var(--mp-color-on-primary-container)",
  "--mp-chip-danger-text-color": "var(--mp-color-on-danger-container)",
  "--mp-chip-success-text-color": "var(--mp-color-on-success-container)",
  "--mp-chip-warning-text-color": "var(--mp-color-on-warning-container)",
  "--mp-chip-info-text-color": "var(--mp-color-on-info-container)",
  "--mp-chip-primary-color": "var(--mp-color-primary-container)",
  "--mp-chip-danger-color": "var(--mp-color-danger-container)",
  "--mp-chip-success-color": "var(--mp-color-success-container)",
  "--mp-chip-warning-color": "var(--mp-color-warning-container)",
  "--mp-chip-info-color": "var(--mp-color-info-container)",
  "--mp-chip-primary-plain-color": "var(--mp-color-primary)",
  "--mp-chip-danger-plain-color": "var(--mp-color-danger)",
  "--mp-chip-success-plain-color": "var(--mp-color-success)",
  "--mp-chip-warning-plain-color": "var(--mp-color-warning)",
  "--mp-chip-info-plain-color": "var(--mp-color-info)",
  "--mp-chip-border-radius": "2px",
  "--mp-chip-normal-height": "32px",
  "--mp-chip-large-height": "40px",
  "--mp-chip-small-height": "24px",
  "--mp-chip-mini-height": "16px",
  "--mp-chip-normal-padding": "0 10px",
  "--mp-chip-large-padding": "0 17px",
  "--mp-chip-small-padding": "0 6px",
  "--mp-chip-mini-padding": "0 4px",
  "--mp-chip-text-normal-margin": "0 5px",
  "--mp-chip-text-large-margin": "0 5px",
  "--mp-chip-text-small-margin": "0 3px",
  "--mp-chip-text-mini-margin": "0 2px",
  "--mp-chip-mini-font-size": "var(--mp-font-size-xs)",
  "--mp-chip-small-font-size": "var(--mp-font-size-sm)",
  "--mp-chip-normal-font-size": "var(--mp-font-size-md)",
  "--mp-chip-large-font-size": "var(--mp-font-size-lg)"
}, mT = {
  "--mp-code-font-size": "14px",
  "--mp-code-line-height": "1.7"
}, fT = {
  "--mp-collapse-background": "var(--mp-color-surface-container-highest)",
  "--mp-collapse-text-color": "var(--mp-color-inverse-surface)",
  "--mp-collapse-header-font-size": "var(--mp-font-size-lg)",
  "--mp-collapse-header-padding": "10px 12px",
  "--mp-collapse-content-font-size": "var(--mp-font-size-md)",
  "--mp-collapse-content-padding": "0 12px 10px",
  "--mp-collapse-item-margin-top": "16px",
  "--mp-collapse-disable-color": "#bdbdbd",
  "--mp-collapse-border-top": "thin solid var(--mp-color-outline)"
}, vT = {
  "--mp-countdown-text-color": "var(--mp-color-text)",
  "--mp-countdown-text-font-size": "var(--mp-font-size-lg)"
}, gT = {
  "--mp-counter-font-color": "#3B383E",
  "--mp-counter-button-text-color": "#3B383E",
  "--mp-counter-padding": "0 4px",
  "--mp-counter-background": "var(--mp-color-primary)",
  "--mp-counter-input-width": "28px",
  "--mp-counter-input-margin": "0 4px",
  "--mp-counter-input-font-size": "14px",
  "--mp-counter-button-size": "28px",
  "--mp-counter-button-icon-size": "100%",
  "--mp-counter-disabled-color": "var(--mp-color-disabled)",
  "--mp-counter-disabled-opacity": "var(--mp-opacity-disabled)",
  "--mp-counter-error-color": "var(--mp-color-danger)"
}, hT = {
  "--mp-date-picker-title-background": "var(--mp-color-surface-container-high)",
  "--mp-date-picker-title-color": "var(--mp-color-inverse-surface)",
  "--mp-date-picker-title-hint-color": "var(--mp-color-on-surface-variant)",
  "--mp-date-picker-body-background-color": "var(--mp-color-surface-container-high)",
  "--mp-date-picker-main-color": "var(--mp-color-inverse-surface)",
  "--mp-date-picker-border-radius": "20px",
  "--mp-date-picker-title-padding": "20px 20px 16px",
  "--mp-date-picker-actions-padding": "20px",
  "--mp-day-picker-head-item-color": "var(--mp-color-inverse-surface)",
  "--mp-date-picker-header-arrow-filter": "opacity(1)",
  "--mp-date-picker-header-padding": "0 0 16px",
  "--mp-date-picker-body-height": "300px",
  "--mp-date-picker-body-padding": "0 14px 16px",
  "--mp-date-picker-header-color": "var(--mp-color-on-surface-variant)",
  "--mp-date-picker-font-size": "var(--mp-font-size-md)",
  "--mp-date-picker-min-width": "290px",
  "--mp-date-picker-title-hint-font-size": "var(--mp-font-size-md)",
  "--mp-date-picker-title-height": "105px",
  "--mp-date-picker-title-year-font-size": "var(--mp-font-size-md)",
  "--mp-date-picker-title-year-font-weight": "500",
  "--mp-date-picker-title-year-margin-bottom": "8px",
  "--mp-date-picker-title-date-height": "48px",
  "--mp-date-picker-title-date-font-size": "34px",
  "--mp-date-picker-title-date-font-weight": "500",
  "--mp-date-picker-title-date-range-font-size": "20px",
  "--mp-date-picker-title-date-justify-content": "normal",
  "--mp-month-picker-padding": "0 12px",
  "--mp-month-picker-item-width": "33%",
  "--mp-month-picker-item-height": "56px",
  "--mp-month-picker-item-button-max-width": "140px",
  "--mp-year-picker-padding": "0 12px",
  "--mp-year-picker-item-width": "33%",
  "--mp-year-picker-item-height": "56px",
  "--mp-year-picker-item-button-max-width": "140px",
  "--mp-day-picker-content-item-width": "14.28%",
  "--mp-day-picker-content-item-font-size": "var(--mp-font-size-sm)",
  "--mp-day-picker-content-item-padding": "2px 0",
  "--mp-day-picker-content-item-button-width": "32px",
  "--mp-day-picker-content-item-button-height": "32px",
  "--mp-day-picker-content-item-button-font-size": "var(--mp-font-size-sm)",
  "--mp-day-picker-head-item-padding": "8px 0",
  "--mp-day-picker-head-item-font-weight": "600"
}, bT = {
  "--mp-dialog-width": "312px",
  "--mp-dialog-background": "var(--mp-color-surface-container-high)",
  "--mp-dialog-title-color": "var(--mp-color-inverse-surface)",
  "--mp-dialog-message-color": "var(--mp-color-on-surface-variant)",
  "--mp-dialog-border-radius": "28px",
  "--mp-dialog-title-padding": "24px 24px 0",
  "--mp-dialog-message-padding": "16px 24px 24px",
  "--mp-dialog-actions-padding": "0 24px 24px",
  "--mp-dialog-title-font-size": "20px",
  "--mp-dialog-button-margin-left": "8px",
  "--mp-dialog-message-line-height": "24px",
  "--mp-dialog-message-font-size": "var(--mp-font-size-md)",
  "--mp-dialog-confirm-button-color": "var(--mp-color-primary)",
  "--mp-dialog-cancel-button-color": "var(--mp-color-primary)"
}, yT = {
  "--mp-divider-text-color": "#aaa",
  "--mp-divider-color": "var(--mp-color-outline)",
  "--mp-divider-text-margin": "8px 0",
  "--mp-divider-text-padding": "0 8px",
  "--mp-divider-inset": "72px"
}, wT = {
  "--mp-fab-trigger-border-radius": "16px",
  "--mp-fab-action-size": "40px",
  "--mp-fab-action-border-radius": "12px",
  "--mp-fab-top": "70px",
  "--mp-fab-bottom": "16px",
  "--mp-fab-left": "16px",
  "--mp-fab-right": "16px",
  "--mp-fab-trigger-size": "56px",
  "--mp-fab-trigger-inactive-icon-size": "26px",
  "--mp-fab-trigger-active-icon-size": "22px",
  "--mp-fab-actions-padding": "10px 0",
  "--mp-fab-action-margin": "6px",
  "--mp-fab-transition-standard-easing": "cubic-bezier(0.4, 0, 0.2, 1)"
}, kT = {
  "--mp-field-decorator-text-color": "var(--mp-color-inverse-surface)",
  "--mp-field-decorator-blur-color": "var(--mp-color-on-surface-variant)",
  "--mp-field-decorator-error-color": "var(--mp-color-danger)",
  "--mp-field-decorator-focus-color": "var(--mp-color-primary)",
  "--mp-field-decorator-placeholder-size": "16px",
  "--mp-field-decorator-icon-size": "20px",
  "--mp-field-decorator-line-size": "1px",
  "--mp-field-decorator-line-focus-size": "2px",
  "--mp-field-decorator-line-border-radius": "4px",
  "--mp-field-decorator-disabled-color": "var(--mp-color-text-disabled)",
  "--mp-field-decorator-standard-normal-margin-top": "22px",
  "--mp-field-decorator-standard-normal-margin-bottom": "4px",
  "--mp-field-decorator-standard-normal-icon-margin-top": "22px",
  "--mp-field-decorator-standard-normal-icon-margin-bottom": "4px",
  "--mp-field-decorator-standard-normal-non-hint-margin-top": "4px",
  "--mp-field-decorator-standard-small-margin-top": "18px",
  "--mp-field-decorator-standard-small-margin-bottom": "4px",
  "--mp-field-decorator-standard-small-icon-margin-top": "18px",
  "--mp-field-decorator-standard-small-icon-margin-bottom": "4px",
  "--mp-field-decorator-standard-small-non-hint-margin-top": "2px",
  "--mp-field-decorator-outlined-normal-margin-top": "16px",
  "--mp-field-decorator-outlined-normal-margin-bottom": "16px",
  "--mp-field-decorator-outlined-normal-padding-left": "16px",
  "--mp-field-decorator-outlined-normal-padding-right": "16px",
  "--mp-field-decorator-outlined-normal-placeholder-space": "4px",
  "--mp-field-decorator-outlined-normal-icon-margin-top": "16px",
  "--mp-field-decorator-outlined-normal-icon-margin-bottom": "16px",
  "--mp-field-decorator-outlined-small-margin-top": "8px",
  "--mp-field-decorator-outlined-small-margin-bottom": "8px",
  "--mp-field-decorator-outlined-small-padding-left": "12px",
  "--mp-field-decorator-outlined-small-padding-right": "12px",
  "--mp-field-decorator-outlined-small-placeholder-space": "2px",
  "--mp-field-decorator-outlined-small-icon-margin-top": "8px",
  "--mp-field-decorator-outlined-small-icon-margin-bottom": "8px"
}, $T = {
  "--mp-floating-panel-background": "var(--mp-color-surface-container-low)",
  "--mp-floating-panel-toolbar-background": "#938F99",
  "--mp-floating-panel-toolbar-width": "32px",
  "--mp-floating-panel-toolbar-height": "4px",
  "--mp-floating-panel-header-height": "36px",
  "--mp-floating-panel-z-index": "999",
  "--mp-floating-panel-border-top": "none",
  "--mp-floating-panel-border-radius": "0",
  "--mp-floating-panel-toolbar-border-radius": "10px",
  "--mp-floating-panel-transition-timing-function": "cubic-bezier(0.18, 0.89, 0.32, 1.28)"
}, CT = {
  "--mp-form-details-error-message-color": "var(--mp-color-danger)",
  "--mp-form-details-extra-message-color": "#888",
  "--mp-form-details-margin-top": "6px",
  "--mp-form-details-font-size": "12px",
  "--mp-form-details-message-margin-right": "4px"
}, ST = {
  "--mp-hover-overlay-opacity": "var(--mp-opacity-hover)",
  "--mp-hover-overlay-focusing-opacity": "var(--mp-opacity-focus)"
}, zT = {
  "--mp-icon-size": "20px"
}, PT = {
  "--mp-image-preview-swipe-indicators-text-color": "#ddd",
  "--mp-image-preview-swipe-indicators-padding": "16px 0",
  "--mp-image-preview-zoom-container-background": "#000",
  "--mp-image-preview-close-icon-top": "14px",
  "--mp-image-preview-close-icon-right": "14px",
  "--mp-image-preview-extra-top": "14px",
  "--mp-image-preview-extra-left": "14px",
  "--mp-image-preview-close-icon-size": "22px",
  "--mp-image-preview-close-icon-color": "#fff"
}, OT = {
  "--mp-index-bar-list-right": "0",
  "--mp-index-bar-list-top": "50%",
  "--mp-index-bar-list-left": "auto",
  "--mp-index-bar-list-bottom": "auto",
  "--mp-index-bar-list-transform": "translate(0, -50%)",
  "--mp-index-bar-list-item-font-size": "var(--mp-font-size-xs)",
  "--mp-index-bar-list-item-color": "var(--mp-color-primary)",
  "--mp-index-bar-list-item-active-color": "var(--mp-color-danger)",
  "--mp-index-bar-list-item-height": "14px",
  "--mp-index-bar-list-item-padding": "0 10px"
}, ET = {
  "--mp-input-input-height": "24px",
  "--mp-input-input-font-size": "16px",
  "--mp-input-textarea-height": "auto"
}, TT = {
  "--mp-link-default-color": "#fff",
  "--mp-link-primary-color": "var(--mp-color-primary)",
  "--mp-link-danger-color": "var(--mp-color-danger)",
  "--mp-link-success-color": "var(--mp-color-success)",
  "--mp-link-warning-color": "var(--mp-color-warning)",
  "--mp-link-info-color": "var(--mp-color-info)",
  "--mp-link-disabled-color": "var(--mp-color-text-disabled)",
  "--mp-link-font-size": "var(--mp-font-size-md)",
  "--mp-link-focus-opacity": "0.8"
}, BT = {
  "--mp-list-loading-height": "50px",
  "--mp-list-finished-height": "50px",
  "--mp-list-error-height": "50px",
  "--mp-list-loading-color": "#888",
  "--mp-list-finished-color": "#888",
  "--mp-list-error-color": "#888",
  "--mp-list-loading-font-size": "var(--mp-font-size-md)",
  "--mp-list-finished-font-size": "var(--mp-font-size-md)",
  "--mp-list-error-font-size": "var(--mp-font-size-md)"
}, MT = {
  "--mp-loading-color": "var(--mp-color-primary)",
  "--mp-loading-opacity": "0.38",
  "--mp-loading-desc-margin": "8px 0 0",
  "--mp-loading-desc-color": "var(--mp-color-primary)"
}, DT = {
  "--mp-loading-bar-color": "var(--mp-color-primary)",
  "--mp-loading-bar-error-color": "var(--mp-color-danger)",
  "--mp-loading-bar-height": "3px"
}, IT = {
  "--mp-menu-background-color": "var(--mp-color-surface-container)",
  "--mp-menu-border-radius": "4px"
}, AT = {
  "--mp-menu-option-text-color": "var(--mp-color-inverse-surface)",
  "--mp-menu-option-normal-height": "38px",
  "--mp-menu-option-small-height": "30px",
  "--mp-menu-option-mini-height": "24px",
  "--mp-menu-option-large-height": "46px",
  "--mp-menu-option-padding": "0 12px",
  "--mp-menu-option-normal-font-size": "var(--mp-font-size-md)",
  "--mp-menu-option-small-font-size": "var(--mp-font-size-sm)",
  "--mp-menu-option-mini-font-size": "var(--mp-font-size-xs)",
  "--mp-menu-option-large-font-size": "var(--mp-font-size-lg)",
  "--mp-menu-option-selected-background": "var(--mp-color-primary)",
  "--mp-menu-option-disabled-color": "var(--mp-color-text-disabled)"
}, NT = {
  "--mp-menu-select-menu-background-color": "var(--mp-color-surface-container)",
  "--mp-menu-select-menu-border-radius": "4px",
  "--mp-menu-select-menu-max-height": "278px",
  "--mp-menu-select-menu-padding": "0"
}, RT = {
  "--mp-option-text-color": "var(--mp-color-inverse-surface)",
  "--mp-option-height": "38px",
  "--mp-option-padding": "0 12px",
  "--mp-option-font-size": "16px",
  "--mp-option-selected-background": "var(--mp-field-decorator-focus-color)",
  "--mp-option-disabled-color": "var(--mp-color-text-disabled)"
}, LT = {
  "--mp-overlay-background-color": "rgba(0, 0, 0, 0.6)"
}, VT = {
  "--mp-pagination-text-color": "#fff",
  "--mp-pagination-item-background": "var(--mp-color-surface-container)",
  "--mp-pagination-font-size": "var(--mp-font-size-md)",
  "--mp-pagination-active-color": "var(--mp-color-on-primary)",
  "--mp-pagination-active-bg-color": "var(--mp-color-primary)",
  "--mp-pagination-hover-bg-color": "rgba(85, 85, 85, 0.15)",
  "--mp-pagination-total-margin": "0 10px",
  "--mp-pagination-total-line-height": "24px",
  "--mp-pagination-item-width": "32px",
  "--mp-pagination-item-height": "32px",
  "--mp-pagination-item-margin": "0 6px",
  "--mp-pagination-item-border-radius": "4px",
  "--mp-pagination-item-simple-border-radius": "50%",
  "--mp-pagination-input-width": "32px",
  "--mp-pagination-disabled-color": "var(--mp-color-text-disabled)",
  "--mp-pagination-bg-disabled-color": "var(--mp-color-disabled)",
  "--mp-pagination-size-line-height": "24px",
  "--mp-pagination-size-padding": "0 4px",
  "--mp-pagination-quick-jumper-margin": "0 10px"
}, FT = {
  "--mp-paper-background": "var(--mp-color-surface-container-highest)",
  "--mp-paper-border-radius": "12px"
}, UT = {
  "--mp-picker-background": "var(--mp-color-body)",
  "--mp-picker-cancel-button-text-color": "var(--mp-color-primary)",
  "--mp-picker-title-text-color": "#fff",
  "--mp-picker-option-text-color": "#fff",
  "--mp-picker-mask-background-image": "linear-gradient(180deg, rgba(20, 18, 24, 0.9), rgba(20, 18, 24, 0.4)), linear-gradient(0deg, rgba(20, 18, 24, 0.9), rgba(20, 18, 24, 0.4))",
  "--mp-picker-toolbar-height": "44px",
  "--mp-picker-confirm-button-text-color": "var(--mp-color-primary)",
  "--mp-picker-picked-border": "1px solid var(--mp-color-outline)",
  "--mp-picker-title-font-size": "var(--mp-font-size-lg)",
  "--mp-picker-option-font-size": "var(--mp-font-size-lg)",
  "--mp-picker-toolbar-padding": "0 4px"
}, jT = {
  "--mp-popup-content-background-color": "var(--mp-color-surface-container-high)",
  "--mp-popup-overlay-background-color": "rgba(0, 0, 0, 0.6)"
}, HT = {
  "--mp-progress-label-color": "#fff",
  "--mp-progress-font-size": "var(--mp-font-size-sm)",
  "--mp-progress-track-color": "#d8d8d8",
  "--mp-progress-background": "var(--mp-color-primary)",
  "--mp-progress-default-color": "#f5f5f5",
  "--mp-progress-primary-color": "var(--mp-color-primary)",
  "--mp-progress-danger-color": "var(--mp-color-danger)",
  "--mp-progress-success-color": "var(--mp-color-success)",
  "--mp-progress-warning-color": "var(--mp-color-warning)",
  "--mp-progress-info-color": "var(--mp-color-info)",
  "--mp-progress-linear-border-radius": "0px"
}, YT = {
  "--mp-pull-refresh-background": "var(--mp-color-surface-container-highest)",
  "--mp-pull-refresh-size": "40px",
  "--mp-pull-refresh-color": "var(--mp-color-primary)",
  "--mp-pull-refresh-success-color": "var(--mp-color-success)",
  "--mp-pull-refresh-icon-size": "25px"
}, WT = {
  "--mp-radio-unchecked-color": "var(--mp-color-on-surface-variant)",
  "--mp-radio-text-color": "var(--mp-color-on-surface-variant)",
  "--mp-radio-checked-color": "var(--mp-color-primary)",
  "--mp-radio-disabled-color": "var(--mp-color-text-disabled)",
  "--mp-radio-error-color": "var(--mp-color-danger)",
  "--mp-radio-icon-size": "24px",
  "--mp-radio-action-padding": "6px"
}, KT = {
  "--mp-rate-color": "var(--mp-color-on-surface-variant)",
  "--mp-rate-size": "24px",
  "--mp-rate-disabled-color": "var(--mp-color-text-disabled)",
  "--mp-rate-error-color": "var(--mp-color-danger)",
  "--mp-rate-action-padding": "4px",
  "--mp-rate-primary-color": "var(--mp-color-primary)"
}, qT = {
  "--mp-result-background": "var(--mp-color-surface-container-highest)",
  "--mp-result-border-radius": "12px",
  "--mp-result-title-color": "var(--mp-color-inverse-surface)",
  "--mp-result-description-color": "var(--mp-color-on-surface-variant)",
  "--mp-result-question-color": "#7f8e96",
  "--mp-result-question-border-color": "rgba(151,194,216,0.3)",
  "--mp-result-empty-color": "#adadad",
  "--mp-result-empty-border-color": "rgba(232,229,229,0.3)",
  "--mp-result-info-border-color": "rgba(204, 194, 220, 0.3)",
  "--mp-result-success-border-color": "rgba(186, 207, 131, 0.3)",
  "--mp-result-error-border-color": "rgba(242, 184, 181, 0.3)",
  "--mp-result-warning-border-color": "rgba(239, 184, 200, 0.3)",
  "--mp-result-padding": "24px",
  "--mp-result-title-font-size": "32px",
  "--mp-result-title-margin": "15px 0 0 0",
  "--mp-result-image-size": "80px",
  "--mp-result-title-font-weight": "500",
  "--mp-result-description-margin": "10px 0 0 0",
  "--mp-result-description-font-size": "14px",
  "--mp-result-description-line-height": "1.6",
  "--mp-result-info-color": "var(--mp-color-info)",
  "--mp-result-success-color": "var(--mp-color-success)",
  "--mp-result-error-color": "var(--mp-color-danger)",
  "--mp-result-warning-color": "var(--mp-color-warning)"
}, XT = {
  "--mp-ripple-cubic-bezier": "cubic-bezier(0.68, 0.01, 0.62, 0.6)",
  "--mp-ripple-color": "currentColor"
}, GT = {
  "--mp-select-scroller-background": "var(--mp-color-surface-container)",
  "--mp-select-scroller-border-radius": "4px",
  "--mp-select-scroller-padding": "6px 0",
  "--mp-select-scroller-max-height": "278px",
  "--mp-select-chips-margin": "-5px 0 0 0",
  "--mp-select-chips-padding": "2px 0",
  "--mp-select-chip-margin": "5px 5px 0 0",
  "--mp-select-arrow-size": "20px",
  "--mp-select-standard-menu-margin": "calc(var(--mp-field-decorator-placeholder-size) * 0.75 + 12px) 0 0 0",
  "--mp-select-label-font-size": "16px"
}, ZT = {
  "--mp-signature-background-color": "var(--mp-color-surface-container-highest)",
  "--mp-signature-stroke-color": "var(--mp-color-inverse-surface)",
  "--mp-signature-height": "200px",
  "--mp-signature-border-radius": "12px"
}, JT = {
  "--mp-skeleton-card-background-color": "hsla(0,0%,100%,.12)",
  "--mp-skeleton-animation-background": `linear-gradient(
        90deg,hsla(0,0%,100%,0),hsla(0,0%,100%,.05),hsla(0,0%,100%,0))
      `,
  "--mp-skeleton-avatar-background-color": "hsla(0,0%,100%,.12)",
  "--mp-skeleton-title-background-color": "hsla(0,0%,100%,.12)",
  "--mp-skeleton-content-padding": "16px",
  "--mp-skeleton-card-height": "160px",
  "--mp-skeleton-card-border-radius": "4px",
  "--mp-skeleton-card-margin-bottom": "16px",
  "--mp-skeleton-avatar-size": "34px",
  "--mp-skeleton-avatar-border-radius": "50%",
  "--mp-skeleton-avatar-margin-right": "16px",
  "--mp-skeleton-title-width": "50%",
  "--mp-skeleton-title-border-radius": "10px",
  "--mp-skeleton-row-height": "12px",
  "--mp-skeleton-row-border-radius": "10px",
  "--mp-skeleton-row-margin-top": "10px"
}, QT = {
  "--mp-slider-thumb-size": "16px",
  "--mp-slider-track-height": "4px",
  "--mp-slider-track-background": "var(--mp-color-surface-container-highest)",
  "--mp-slider-track-fill-border-radius": "4px",
  "--mp-slider-track-border-radius": "4px",
  "--mp-slider-error-color": "var(--mp-color-danger)",
  "--mp-slider-track-fill-background": "var(--mp-color-primary)",
  "--mp-slider-thumb-block-background": "var(--mp-color-primary)",
  "--mp-slider-thumb-ripple-background": "var(--mp-color-primary)",
  "--mp-slider-thumb-label-background": "var(--mp-color-primary)",
  "--mp-slider-thumb-label-font-size": "var(--mp-font-size-sm)",
  "--mp-slider-thumb-label-text-color": "var(--mp-color-on-primary)",
  "--mp-slider-disabled-opacity": "var(--mp-opacity-disabled)"
}, xT = {
  "--mp-snackbar-color": "#322F35",
  "--mp-snackbar-background": "var(--mp-color-inverse-surface)",
  "--mp-snackbar-width": "256px",
  "--mp-snackbar-border-radius": "4px",
  "--mp-snackbar-font-size": "var(--mp-font-size-md)",
  "--mp-snackbar-margin": "6px 24px",
  "--mp-snackbar-border-color": "currentColor",
  "--mp-snackbar-success-background": "var(--mp-color-success)",
  "--mp-snackbar-info-background": "var(--mp-color-info)",
  "--mp-snackbar-error-background": "var(--mp-color-danger)",
  "--mp-snackbar-warning-background": "var(--mp-color-warning)",
  "--mp-snackbar-content-padding": "14px 16px",
  "--mp-snackbar-action-margin": "0 8px",
  "--mp-snackbar-vertical-action-margin": "0 8px 8px 0",
  "--mp-snackbar-icon-margin": "0 8px"
}, _T = {
  "--mp-space-size-xs-row-gap": "4px",
  "--mp-space-size-xs-column-gap": "4px",
  "--mp-space-size-sm-row-gap": "6px",
  "--mp-space-size-sm-column-gap": "6px",
  "--mp-space-size-md-row-gap": "8px",
  "--mp-space-size-md-column-gap": "12px",
  "--mp-space-size-lg-row-gap": "12px",
  "--mp-space-size-lg-column-gap": "20px",
  "--mp-space-size-xl-row-gap": "16px",
  "--mp-space-size-xl-column-gap": "24px"
}, e5 = {
  "--mp-step-content-color": "rgba(255, 255, 255, .38)",
  "--mp-step-content-active-color": "#fff",
  "--mp-step-line-background": "#fff",
  "--mp-step-tag-size": "20px",
  "--mp-step-tag-background": "#9e9e9e",
  "--mp-step-tag-font-size": "var(--mp-font-size-md)",
  "--mp-step-tag-color": "var(--mp-color-on-primary)",
  "--mp-step-tag-active-color": "var(--mp-color-primary)",
  "--mp-step-tag-margin": "4px 0",
  "--mp-step-tag-icon-size": "var(--mp-font-size-lg)",
  "--mp-step-content-font-size": "var(--mp-font-size-md)",
  "--mp-step-line-gap": "8px",
  "--mp-step-vertical-tag-margin": "0 4px",
  "--mp-step-vertical-min-height": "50px"
}, n5 = {
  "--mp-carousel-indicator-color": "#fff",
  "--mp-carousel-indicators-offset": "10px",
  "--mp-carousel-indicator-offset": "4px",
  "--mp-carousel-navigation-z-index": "9",
  "--mp-carousel-navigation-button-width": "36px",
  "--mp-carousel-navigation-button-height": "36px",
  "--mp-carousel-navigation-button-border-radius": "50%",
  "--mp-carousel-navigation-icon-size": "20px",
  "--mp-carousel-navigation-prev-left": "8px",
  "--mp-carousel-navigation-next-right": "8px",
  "--mp-carousel-navigation-prev-top": "8px",
  "--mp-carousel-navigation-next-bottom": "8px"
}, t5 = {
  "--mp-switch-track-background": "#727272",
  "--mp-switch-handle-background": "#727272",
  "--mp-switch-track-active-background": "var(--mp-color-primary)",
  "--mp-switch-track-error-background": "var(--mp-color-danger)",
  "--mp-switch-ripple-color": "var(--mp-color-primary)",
  "--mp-switch-handle-color": "var(--mp-color-primary)",
  "--mp-switch-handle-active-color": "var(--mp-color-on-primary)",
  "--mp-switch-handle-active-background": "var(--mp-color-primary)",
  "--mp-switch-handle-error-background": "var(--mp-color-danger)",
  "--mp-switch-disabled-opacity": "var(--mp-opacity-disabled)",
  "--mp-switch-variant-width": "52px",
  "--mp-switch-variant-height": "32px",
  "--mp-switch-variant-track-background": "var(--mp-color-surface-container-highest)",
  "--mp-switch-variant-handle-width": "24px",
  "--mp-switch-variant-handle-height": "24px",
  "--mp-switch-variant-track-border-color": "#938F99",
  "--mp-switch-variant-handle-color": "var(--mp-color-on-primary)",
  "--mp-switch-variant-handle-active-color": "var(--mp-color-primary)",
  "--mp-switch-variant-handle-background": "#938F99",
  "--mp-switch-variant-handle-active-background": "var(--mp-color-on-primary)",
  "--mp-switch-width": "40px",
  "--mp-switch-height": "24px",
  "--mp-switch-track-width": "38px",
  "--mp-switch-track-height": "14.4px",
  "--mp-switch-track-border-radius": "calc(20px * 2 / 3)",
  "--mp-switch-handle-width": "20px",
  "--mp-switch-handle-height": "20px",
  "--mp-switch-ripple-size": "40px",
  "--mp-switch-ripple-left": "-10px",
  "--mp-switch-ripple-active-left": "10px",
  "--mp-switch-loading-size": "16px",
  "--mp-switch-variant-ripple-left": "-4px",
  "--mp-switch-variant-ripple-active-left": "16px"
}, o5 = {
  "--mp-tab-inactive-color": "var(--mp-color-on-surface-variant)",
  "--mp-tab-padding": "12px",
  "--mp-tab-active-color": "var(--mp-color-primary)",
  "--mp-tab-disabled-color": "var(--mp-color-text-disabled)",
  "--mp-tab-font-size": "var(--mp-font-size-md)",
  "--mp-tab-font-weight": "400",
  "--mp-tab-active-font-size": "var(--mp-font-size-md)",
  "--mp-tab-active-font-weight": "400"
}, r5 = {
  "--mp-table-background": "var(--mp-color-surface-container-highest)",
  "--mp-table-thead-th-text-color": "rgba(255, 255, 255, 0.6)",
  "--mp-table-thead-th-text-align": "left",
  "--mp-table-tbody-td-text-color": "#fff",
  "--mp-table-tbody-tr-hover-background": "var(--mp-color-surface-container-highest)",
  "--mp-table-border-radius": "2px",
  "--mp-table-thead-border-bottom": "thin solid var(--mp-color-outline)",
  "--mp-table-thead-th-font-size": "14px",
  "--mp-table-thead-tr-border-bottom": "thin solid var(--mp-color-outline)",
  "--mp-table-tbody-tr-border-bottom": "thin solid var(--mp-color-outline)",
  "--mp-table-tbody-td-font-size": "16px",
  "--mp-table-tbody-td-text-align": "left",
  "--mp-table-row-height": "46px",
  "--mp-table-row-padding": "0 16px",
  "--mp-table-footer-border-top": "thin solid var(--mp-color-outline)"
}, a5 = {
  "--mp-tabs-background": "var(--mp-color-body)",
  "--mp-tabs-item-horizontal-height": "44px",
  "--mp-tabs-item-vertical-height": "66px",
  "--mp-tabs-radius": "2px",
  "--mp-tabs-padding": "12px",
  "--mp-tabs-indicator-size": "2px",
  "--mp-tabs-indicator-border-radius": "0",
  "--mp-tabs-indicator-background": "var(--mp-color-primary)",
  "--mp-tabs-indicator-inner-size": "100%"
}, i5 = {
  "--mp-time-picker-title-color": "var(--mp-color-inverse-surface)",
  "--mp-time-picker-clock-container-background": "var(--mp-color-surface-container-highest)",
  "--mp-time-picker-title-hint-color": "var(--mp-color-on-surface-variant)",
  "--mp-time-picker-title-background": "var(--mp-color-surface-container-high)",
  "--mp-time-picker-body-background": "var(--mp-color-surface-container-high)",
  "--mp-time-picker-clock-item-disable-color": "#888",
  "--mp-time-picker-clock-item-disable-background": "#ccc",
  "--mp-time-picker-clock-item-text-color": "var(--mp-color-inverse-surface)",
  "--mp-time-picker-border-radius": "20px",
  "--mp-time-picker-title-padding": "20px 20px 16px",
  "--mp-time-picker-actions-padding": "20px",
  "--mp-time-picker-title-margin-bottom": "20px",
  "--mp-time-picker-title-time-font-size": "40px",
  "--mp-time-picker-title-ampm-border-radius": "8px",
  "--mp-time-picker-title-time-padding": "8px 12px",
  "--mp-time-picker-title-time-border-radius": "8px",
  "--mp-time-picker-title-ampm-border": "thin solid #938F99",
  "--mp-time-picker-title-ampm-button-padding": "8px",
  "--mp-time-picker-title-time-background": "var(--mp-color-surface-container-highest)",
  "--mp-time-picker-title-inactive-opacity": "1",
  "--mp-time-picker-title-time-active-background": "var(--mp-color-primary-container)",
  "--mp-time-picker-title-ampm-button-active-background": "var(--mp-color-warning-container)",
  "--mp-time-picker-font-size": "var(--mp-font-size-md)",
  "--mp-time-picker-min-width": "290px",
  "--mp-time-picker-title-height": "105px",
  "--mp-time-picker-title-hint-font-size": "14px",
  "--mp-time-picker-title-time-margin": "0 5px",
  "--mp-time-picker-title-ampm-margin-left": "10px",
  "--mp-time-picker-clock-left": "27px",
  "--mp-time-picker-clock-right": "27px",
  "--mp-time-picker-clock-top": "27px",
  "--mp-time-picker-clock-bottom": "27px",
  "--mp-time-picker-clock-container-width": "256px",
  "--mp-time-picker-clock-container-height": "256px",
  "--mp-time-picker-clock-hand-height": "calc(50% - 4px)",
  "--mp-time-picker-clock-hand-width": "2px",
  "--mp-time-picker-clock-hand-bottom": "50%",
  "--mp-time-picker-clock-hand-left": "calc(50% - 1px)",
  "--mp-time-picker-clock-hand-background": "var(--mp-color-primary)",
  "--mp-time-picker-clock-hand-border-color": "var(--mp-color-primary)",
  "--mp-time-picker-clock-hand-before-width": "10px",
  "--mp-time-picker-clock-hand-before-height": "10px",
  "--mp-time-picker-clock-hand-before-border-width": "2px",
  "--mp-time-picker-clock-hand-after-width": "4px",
  "--mp-time-picker-clock-hand-after-height": "4px",
  "--mp-time-picker-clock-item-height": "32px",
  "--mp-time-picker-clock-item-width": "32px",
  "--mp-time-picker-clock-item-active-background": "var(--mp-color-primary)",
  "--mp-time-picker-clock-item-active-color": "var(--mp-color-on-primary)",
  "--mp-time-picker-inner-left": "36px",
  "--mp-time-picker-inner-right": "36px",
  "--mp-time-picker-inner-top": "36px",
  "--mp-time-picker-inner-bottom": "36px",
  "--mp-time-picker-body-height": "288px",
  "--mp-time-picker-title-time-container-justify-content": "flex-end"
}, l5 = {
  "--mp-tooltip-default-color": "var(--mp-color-inverse-surface)",
  "--mp-tooltip-opacity": "1",
  "--mp-tooltip-default-text-color": "#322F35",
  "--mp-tooltip-border-radius": "4px",
  "--mp-tooltip-font-size": "14px",
  "--mp-tooltip-padding": "8px 16px",
  "--mp-tooltip-offset": "10px",
  "--mp-tooltip-primary-color": "var(--mp-color-primary)",
  "--mp-tooltip-info-color": "var(--mp-color-info)",
  "--mp-tooltip-success-color": "var(--mp-color-success)",
  "--mp-tooltip-warning-color": "var(--mp-color-warning)",
  "--mp-tooltip-danger-color": "var(--mp-color-danger)",
  "--mp-tooltip-primary-text-color": "var(--mp-color-on-primary)",
  "--mp-tooltip-info-text-color": "var(--mp-color-on-info)",
  "--mp-tooltip-success-text-color": "var(--mp-color-on-success)",
  "--mp-tooltip-warning-text-color": "var(--mp-color-on-warning)",
  "--mp-tooltip-danger-text-color": "var(--mp-color-on-danger)"
}, s5 = {
  "--mp-uploader-file-border-radius": "8px",
  "--mp-uploader-action-background": "var(--mp-color-surface-container-highest)",
  "--mp-uploader-file-name-background": "var(--mp-color-surface-container-highest)",
  "--mp-uploader-file-cover-background": "var(--mp-color-surface-container-highest)",
  "--mp-uploader-action-icon-color": "var(--mp-color-on-surface-variant)",
  "--mp-uploader-file-name-color": "var(--mp-color-on-surface-variant)",
  "--mp-uploader-action-icon-size": "24px",
  "--mp-uploader-action-margin": "0 10px 10px 0",
  "--mp-uploader-file-size": "80px",
  "--mp-uploader-file-margin": "0 10px 10px 0",
  "--mp-uploader-file-name-font-size": "12px",
  "--mp-uploader-file-name-padding": "10px",
  "--mp-uploader-file-text-align": "center",
  "--mp-uploader-file-close-background": "rgba(0, 0, 0, 0.3)",
  "--mp-uploader-file-close-size": "24px",
  "--mp-uploader-file-close-icon-font-size": "14px",
  "--mp-uploader-file-close-icon-color": "#fff",
  "--mp-uploader-file-cover-fit": "cover",
  "--mp-uploader-preview-video-width": "100vw",
  "--mp-uploader-preview-video-height": "100vw",
  "--mp-uploader-file-indicator-height": "4px",
  "--mp-uploader-file-indicator-normal-color": "var(--mp-color-disabled)",
  "--mp-uploader-file-indicator-success-color": "var(--mp-color-success)",
  "--mp-uploader-file-indicator-error-color": "var(--mp-color-danger)",
  "--mp-uploader-file-progress-color": "var(--mp-color-primary)",
  "--mp-uploader-disabled-color": "var(--mp-color-disabled)",
  "--mp-uploader-disabled-text-color": "var(--mp-color-text-disabled)",
  "--mp-uploader-loading-background": "linear-gradient(90deg, hsla(0, 0%, 100%, 0), hsla(0, 0%, 100%, 0.3), hsla(0, 0%, 100%, 0))"
}, u5 = {
  "--mp-watermark-content-color": "#ffffff"
}, c5 = Object.defineProperty, Tp = Object.getOwnPropertySymbols, d5 = Object.prototype.hasOwnProperty, p5 = Object.prototype.propertyIsEnumerable, Bp = (e, n, t) => n in e ? c5(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t, ye = (e, n) => {
  for (var t in n || (n = {}))
    d5.call(n, t) && Bp(e, t, n[t]);
  if (Tp)
    for (var t of Tp(n))
      p5.call(n, t) && Bp(e, t, n[t]);
  return e;
}, m5 = ye(ye(ye(ye(ye(ye(ye(ye(ye(ye(ye(ye(ye(ye(ye(ye(ye(ye(ye(ye(ye(ye(ye(ye(ye(ye(ye(ye(ye(ye(ye(ye(ye(ye(ye(ye(ye(ye(ye(ye(ye(ye(ye(ye(ye(ye(ye(ye(ye(ye(ye(ye(ye(ye(ye(ye(ye(ye(ye(ye(ye(ye(ye(ye(ye(ye({
  "--mp-color-scheme": "dark",
  "--mp-font-size-xs": "10px",
  "--mp-font-size-sm": "12px",
  "--mp-font-size-md": "14px",
  "--mp-font-size-lg": "16px",
  "--mp-icon-size-xs": "16px",
  "--mp-icon-size-sm": "18px",
  "--mp-icon-size-md": "20px",
  "--mp-icon-size-lg": "22px",
  "--mp-hsl-body": "260, 14%, 8%",
  "--mp-color-body": "hsla(var(--mp-hsl-body), 1)",
  "--mp-hsl-text": "0, 0%, 100%",
  "--mp-color-text": "hsla(var(--mp-hsl-text), 1)",
  "--mp-hsl-primary": "258, 100%, 87%",
  "--mp-color-primary": "hsla(var(--mp-hsl-primary), 1)",
  "--mp-hsl-info": "263, 27%, 81%",
  "--mp-color-info": "hsla(var(--mp-hsl-info), 1)",
  "--mp-hsl-success": "77, 44%, 66%",
  "--mp-color-success": "hsla(var(--mp-hsl-success), 1)",
  "--mp-hsl-warning": "343, 63%, 83%",
  "--mp-color-warning": "hsla(var(--mp-hsl-warning), 1)",
  "--mp-hsl-danger": "3, 70%, 83%",
  "--mp-color-danger": "hsla(var(--mp-hsl-danger), 1)",
  "--mp-hsl-on-primary": "259, 58%, 28%",
  "--mp-color-on-primary": "hsla(var(--mp-hsl-on-primary), 1)",
  "--mp-hsl-on-info": "258, 18%, 22%",
  "--mp-color-on-info": "hsla(var(--mp-hsl-on-info), 1)",
  "--mp-hsl-on-success": "76, 100%, 10%",
  "--mp-color-on-success": "hsla(var(--mp-hsl-on-success), 1)",
  "--mp-hsl-on-warning": "338, 33%, 22%",
  "--mp-color-on-warning": "hsla(var(--mp-hsl-on-warning), 1)",
  "--mp-hsl-on-danger": "3, 71%, 22%",
  "--mp-color-on-danger": "hsla(var(--mp-hsl-on-danger), 1)",
  "--mp-hsl-primary-container": "257, 37%, 42%",
  "--mp-color-primary-container": "hsla(var(--mp-hsl-primary-container), 1)",
  "--mp-hsl-info-container": "260, 12%, 35%",
  "--mp-color-info-container": "hsla(var(--mp-hsl-info-container), 1)",
  "--mp-hsl-success-container": "77, 57%, 23%",
  "--mp-color-success-container": "hsla(var(--mp-hsl-success-container), 1)",
  "--mp-hsl-warning-container": "342, 21%, 36%",
  "--mp-color-warning-container": "hsla(var(--mp-hsl-warning-container), 1)",
  "--mp-hsl-danger-container": "2, 48%, 42%",
  "--mp-color-danger-container": "hsla(var(--mp-hsl-danger-container), 1)",
  "--mp-hsl-on-primary-container": "263, 100%, 93%",
  "--mp-color-on-primary-container": "hsla(var(--mp-hsl-on-primary-container), 1)",
  "--mp-hsl-on-info-container": "263, 65%, 92%",
  "--mp-color-on-info-container": "hsla(var(--mp-hsl-on-info-container), 1)",
  "--mp-hsl-on-success-container": "77, 68%, 77%",
  "--mp-color-on-success-container": "hsla(var(--mp-hsl-on-success-container), 1)",
  "--mp-hsl-on-warning-container": "342, 100%, 92%",
  "--mp-color-on-warning-container": "hsla(var(--mp-hsl-on-warning-container), 1)",
  "--mp-hsl-on-danger-container": "4, 71%, 92%",
  "--mp-color-on-danger-container": "hsla(var(--mp-hsl-on-danger-container), 1)",
  "--mp-hsl-disabled": "0, 0%, 25%",
  "--mp-color-disabled": "hsla(var(--mp-hsl-disabled), 1)",
  "--mp-hsl-text-disabled": "0, 0%, 46%",
  "--mp-color-text-disabled": "hsla(var(--mp-hsl-text-disabled), 1)",
  "--mp-hsl-surface-container": "257, 10%, 14%",
  "--mp-color-surface-container": "hsla(var(--mp-hsl-surface-container), 1)",
  "--mp-hsl-surface-container-low": "264, 8%, 12%",
  "--mp-color-surface-container-low": "hsla(var(--mp-hsl-surface-container-low), 1)",
  "--mp-hsl-surface-container-high": "257, 8%, 17%",
  "--mp-color-surface-container-high": "hsla(var(--mp-hsl-surface-container-high), 1)",
  "--mp-hsl-surface-container-highest": "257, 6%, 22%",
  "--mp-color-surface-container-highest": "hsla(var(--mp-hsl-surface-container-highest), 1)",
  "--mp-hsl-inverse-surface": "280, 17%, 90%",
  "--mp-color-inverse-surface": "hsla(var(--mp-hsl-inverse-surface), 1)",
  "--mp-hsl-outline": "264, 7%, 29%",
  "--mp-color-outline": "hsla(var(--mp-hsl-outline), 1)",
  "--mp-hsl-on-surface-variant": "270, 11%, 79%",
  "--mp-color-on-surface-variant": "hsla(var(--mp-hsl-on-surface-variant), 1)",
  "--mp-opacity-disabled": "0.6",
  "--mp-opacity-hover": "0.12",
  "--mp-opacity-focus": "0.2",
  "--mp-cubic-bezier": "cubic-bezier(0.25, 0.8, 0.5, 1)",
  "--mp-shadow-key-umbra-opacity": "rgba(0, 0, 0, 0.2)",
  "--mp-shadow-key-penumbra-opacity": "rgba(0, 0, 0, 0.14)",
  "--mp-shadow-key-ambient-opacity": "rgba(0, 0, 0, 0.12)"
}, sT), _E), ST), IT), NT), AT), wT), lT), TT), cT), FT), nT), kT), dT), WT), uT), pT), rT), l5), HT), a5), o5), e5), yT), r5), VT), u5), fT), qT), eT), aT), iT), xT), xE), bT), YT), jT), UT), $T), oT), GT), RT), gT), t5), QT), s5), i5), hT), KT), JT), tT), vT), CT), zT), PT), OT), ET), BT), MT), DT), LT), XT), _T), n5), mT), ZT), f5 = {
  "--mp-action-sheet-background": "var(--mp-color-surface-container-high)",
  "--mp-action-sheet-title-color": "var(--mp-color-on-surface-variant)",
  "--mp-action-sheet-action-item-color": "#1D1B20",
  "--mp-action-sheet-border-radius": "0px"
}, v5 = {
  "--mp-alert-padding": "16px",
  "--mp-alert-border-radius": "4px",
  "--mp-alert-icon-size": "22px",
  "--mp-alert-icon-margin": "0 12px 0 0",
  "--mp-alert-close-icon-size": "22px",
  "--mp-alert-close-icon-margin": "2px 0 0 12px",
  "--mp-alert-action-margin": "0 0 0 12px",
  "--mp-alert-standard-info-bg": "hsla(var(--mp-hsl-info), 0.12)",
  "--mp-alert-standard-info-border": "hsla(var(--mp-hsl-info), 0.5)",
  "--mp-alert-standard-info-text-color": "var(--mp-color-info)",
  "--mp-alert-standard-success-bg": "hsla(var(--mp-hsl-success), 0.12)",
  "--mp-alert-standard-success-border": "hsla(var(--mp-hsl-success), 0.5)",
  "--mp-alert-standard-success-text-color": "var(--mp-color-success)",
  "--mp-alert-standard-warning-bg": "hsla(var(--mp-hsl-warning), 0.12)",
  "--mp-alert-standard-warning-border": "hsla(var(--mp-hsl-warning), 0.5)",
  "--mp-alert-standard-warning-text-color": "var(--mp-color-warning)",
  "--mp-alert-standard-danger-bg": "hsla(var(--mp-hsl-danger), 0.12)",
  "--mp-alert-standard-danger-border": "hsla(var(--mp-hsl-danger), 0.5)",
  "--mp-alert-standard-danger-text-color": "var(--mp-color-danger)",
  "--mp-alert-danger-background": "var(--mp-color-danger)",
  "--mp-alert-success-background": "var(--mp-color-success)",
  "--mp-alert-warning-background": "var(--mp-color-warning)",
  "--mp-alert-info-background": "var(--mp-color-info)",
  "--mp-alert-tonal-danger-background": "hsla(var(--mp-hsl-danger), 0.12)",
  "--mp-alert-tonal-success-background": "hsla(var(--mp-hsl-success), 0.12)",
  "--mp-alert-tonal-warning-background": "hsla(var(--mp-hsl-warning), 0.12)",
  "--mp-alert-tonal-info-background": "hsla(var(--mp-hsl-info), 0.12)",
  "--mp-alert-tonal-danger-text-color": "var(--mp-color-danger)",
  "--mp-alert-tonal-success-text-color": "var(--mp-color-success)",
  "--mp-alert-tonal-warning-text-color": "var(--mp-color-warning)",
  "--mp-alert-tonal-info-text-color": "var(--mp-color-info)",
  "--mp-alert-default-background": "var(--mp-color-fill-2)",
  "--mp-alert-default-text-color": "var(--mp-color-text-1)",
  "--mp-alert-default-border-color": "var(--mp-color-border-2)",
  "--mp-alert-message-font-size": "14px",
  "--mp-alert-title-font-size": "16px",
  "--mp-alert-title-font-weight": "500",
  "--mp-alert-message-margin-top": "4px",
  "--mp-alert-message-line-height": "1.5",
  "--mp-alert-title-line-height": "1.5"
}, g5 = {
  "--mp-app-bar-color": "var(--mp-color-primary)",
  "--mp-app-bar-title-padding": "0 12px",
  "--mp-app-bar-title-font-size": "var(--mp-font-size-lg)",
  "--mp-app-bar-text-color": "#fff",
  "--mp-app-bar-height": "54px",
  "--mp-app-bar-left-gap": "6px",
  "--mp-app-bar-right-gap": "6px",
  "--mp-app-bar-border-radius": "4px",
  "--mp-app-bar-font-size": "var(--mp-font-size-lg)",
  "--mp-app-bar-border-bottom": "thin solid var(--mp-color-outline)"
}, h5 = {
  "--mp-avatar-text-color": "#fff",
  "--mp-avatar-background-color": "var(--mp-color-primary)"
}, b5 = {
  "--mp-avatar-group-offset": "-10px"
}, y5 = {
  "--mp-back-top-button-border-radius": "12px",
  "--mp-back-top-right": "40px",
  "--mp-back-top-bottom": "40px",
  "--mp-back-top-button-size": "40px"
}, w5 = {
  "--mp-badge-font-weight": "500",
  "--mp-badge-description-size-xs-font-size": "12px",
  "--mp-badge-description-size-sm-font-size": "12px",
  "--mp-badge-description-size-md-font-size": "14px",
  "--mp-badge-description-size-lg-font-size": "16px",
  "--mp-badge-description-size-xl-font-size": "18px",
  "--mp-badge-description-text-color": "var(--mp-color-on-surface, #1d1b20)",
  "--mp-badge-size-xs-font-size": "12px",
  "--mp-badge-size-sm-font-size": "12px",
  "--mp-badge-size-md-font-size": "12px",
  "--mp-badge-size-lg-font-size": "14px",
  "--mp-badge-size-xl-font-size": "16px",
  "--mp-badge-size-xs-scale": "0.6667",
  "--mp-badge-size-sm-scale": "0.8333",
  "--mp-badge-size-md-scale": "1",
  "--mp-badge-size-lg-scale": "1",
  "--mp-badge-size-xl-scale": "1",
  "--mp-badge-size-xs-dot-width": "4px",
  "--mp-badge-size-sm-dot-width": "5px",
  "--mp-badge-size-md-dot-width": "6px",
  "--mp-badge-size-lg-dot-width": "7px",
  "--mp-badge-size-xl-dot-width": "8px",
  "--mp-badge-size-xs-dot-height": "4px",
  "--mp-badge-size-sm-dot-height": "5px",
  "--mp-badge-size-md-dot-height": "6px",
  "--mp-badge-size-lg-dot-height": "7px",
  "--mp-badge-size-xl-dot-height": "8px",
  "--mp-badge-size-xs-space": "0px",
  "--mp-badge-size-sm-space": "2px",
  "--mp-badge-size-md-space": "6px",
  "--mp-badge-size-lg-space": "6px",
  "--mp-badge-size-xl-space": "8px",
  "--mp-badge-size-xs-padding": "0 6px",
  "--mp-badge-size-sm-padding": "0 6px",
  "--mp-badge-size-md-padding": "0 8px",
  "--mp-badge-size-lg-padding": "0 8px",
  "--mp-badge-size-xl-padding": "0 10px",
  "--mp-badge-size-xs-height": "20px",
  "--mp-badge-size-sm-height": "20px",
  "--mp-badge-size-md-height": "24px",
  "--mp-badge-size-lg-height": "28px",
  "--mp-badge-size-xl-height": "32px",
  "--mp-badge-size-xs-border-radius": "20px",
  "--mp-badge-size-sm-border-radius": "20px",
  "--mp-badge-size-md-border-radius": "24px",
  "--mp-badge-size-lg-border-radius": "28px",
  "--mp-badge-size-xl-border-radius": "32px",
  "--mp-badge-bg-color": "#ef4444",
  "--mp-badge-text-color": "#ffffff",
  "--mp-badge-status-default-bg-color": "#e0e0e0",
  "--mp-badge-status-default-text-color": "#1d1b20",
  "--mp-badge-status-info-bg-color": "var(--mp-color-info)",
  "--mp-badge-status-info-text-color": "var(--mp-color-on-info)",
  "--mp-badge-status-success-bg-color": "var(--mp-color-success)",
  "--mp-badge-status-success-text-color": "var(--mp-color-on-success)",
  "--mp-badge-status-warning-bg-color": "var(--mp-color-warning)",
  "--mp-badge-status-warning-text-color": "var(--mp-color-on-warning)",
  "--mp-badge-status-danger-bg-color": "var(--mp-color-danger)",
  "--mp-badge-status-danger-text-color": "var(--mp-color-on-danger)",
  "--mp-badge-status-primary-bg-color": "var(--mp-color-primary)",
  "--mp-badge-status-primary-text-color": "var(--mp-color-on-primary)",
  "--mp-badge-variant-outline-bg-color": "transparent",
  "--mp-badge-variant-outline-text-color": "#ef4444",
  "--mp-badge-variant-outline-status-info-text-color": "var(--mp-color-info)",
  "--mp-badge-variant-outline-status-success-text-color": "var(--mp-color-success)",
  "--mp-badge-variant-outline-status-warning-text-color": "var(--mp-color-warning)",
  "--mp-badge-variant-outline-status-danger-text-color": "var(--mp-color-danger)",
  "--mp-badge-variant-outline-status-primary-text-color": "var(--mp-color-primary)",
  "--mp-badge-variant-outline-status-default-text-color": "#1d1b20"
}, k5 = {
  "--mp-bottom-navigation-background-color": "var(--mp-color-surface-container)",
  "--mp-bottom-navigation-fab-border-radius": "12px",
  "--mp-bottom-navigation-height": "50px",
  "--mp-bottom-navigation-variant-height": "66px",
  "--mp-bottom-navigation-z-index": "1",
  "--mp-bottom-navigation-border-color": "var(--mp-color-outline)",
  "--mp-bottom-navigation-fab-offset": "4px"
}, $5 = {
  "--mp-bottom-navigation-item-active-background-color": "var(--mp-color-info-container)",
  "--mp-bottom-navigation-item-inactive-color": "var(--mp-color-on-surface-variant)",
  "--mp-bottom-navigation-item-variant-active-background-color": "var(--mp-color-info-container)",
  "--mp-bottom-navigation-item-variant-active-color": "var(--mp-color-on-info-container)",
  "--mp-bottom-navigation-fab-border-radius": "12px",
  "--mp-bottom-navigation-item-font-size": "var(--mp-font-size-sm)",
  "--mp-bottom-navigation-item-active-color": "var(--mp-color-primary)",
  "--mp-bottom-navigation-item-line-height": "1",
  "--mp-bottom-navigation-item-icon-size": "22px",
  "--mp-bottom-navigation-item-icon-margin-bottom": "5px",
  "--mp-bottom-navigation-item-variant-icon-container-height": "30px",
  "--mp-bottom-navigation-item-variant-icon-container-border-radius": "100px",
  "--mp-bottom-navigation-item-variant-icon-container-max-width": "58px"
}, C5 = {
  "--mp-breadcrumb-item-inactive-color": "var(--mp-color-on-surface-variant)",
  "--mp-breadcrumb-item-active-color": "var(--mp-color-primary)",
  "--mp-breadcrumb-item-separator-margin": "0 10px",
  "--mp-breadcrumb-item-separator-font-size": "14px"
}, S5 = {
  "--mp-button-default-color": "var(--mp-color-surface-container-low)",
  "--mp-button-default-text-color": "var(--mp-color-primary)",
  "--mp-button-default-icon-color": "var(--mp-color-on-info-container)",
  "--mp-button-default-icon-container-color": "var(--mp-color-surface-container-high)",
  "--mp-button-border-radius": "100px",
  "--mp-button-primary-text-color": "var(--mp-color-on-primary)",
  "--mp-button-danger-text-color": "var(--mp-color-on-danger)",
  "--mp-button-success-text-color": "var(--mp-color-on-success)",
  "--mp-button-warning-text-color": "var(--mp-color-on-warning)",
  "--mp-button-info-text-color": "var(--mp-color-on-info)",
  "--mp-button-primary-color": "var(--mp-color-primary)",
  "--mp-button-danger-color": "var(--mp-color-danger)",
  "--mp-button-success-color": "var(--mp-color-success)",
  "--mp-button-warning-color": "var(--mp-color-warning)",
  "--mp-button-info-color": "var(--mp-color-info)",
  "--mp-button-primary-icon-color": "var(--mp-color-on-primary-container)",
  "--mp-button-danger-icon-color": "var(--mp-color-on-danger-container)",
  "--mp-button-success-icon-color": "var(--mp-color-on-success-container)",
  "--mp-button-warning-icon-color": "var(--mp-color-on-warning-container)",
  "--mp-button-info-icon-color": "var(--mp-color-on-info-container)",
  "--mp-button-primary-icon-container-color": "var(--mp-color-primary-container)",
  "--mp-button-danger-icon-container-color": "var(--mp-color-danger-container)",
  "--mp-button-success-icon-container-color": "var(--mp-color-success-container)",
  "--mp-button-warning-icon-container-color": "var(--mp-color-warning-container)",
  "--mp-button-info-icon-container-color": "var(--mp-color-info-container)",
  "--mp-button-disabled-color": "var(--mp-color-disabled)",
  "--mp-button-disabled-text-color": "var(--mp-color-text-disabled)",
  "--mp-button-mini-padding": "0 8px",
  "--mp-button-small-padding": "0 12px",
  "--mp-button-normal-padding": "0 16px",
  "--mp-button-large-padding": "0 22px",
  "--mp-button-round-padding": "6px",
  "--mp-button-mini-height": "20px",
  "--mp-button-small-height": "28px",
  "--mp-button-normal-height": "36px",
  "--mp-button-large-height": "44px",
  "--mp-button-mini-font-size": "var(--mp-font-size-xs)",
  "--mp-button-small-font-size": "var(--mp-font-size-sm)",
  "--mp-button-normal-font-size": "var(--mp-font-size-md)",
  "--mp-button-large-font-size": "var(--mp-font-size-lg)"
}, z5 = {
  "--mp-card-border-radius": "12px",
  "--mp-card-background": "var(--mp-color-surface-container-low)",
  "--mp-card-filled-background": "var(--mp-color-surface-container-highest)",
  "--mp-card-image-height": "188px",
  "--mp-card-title-color": "#1D1B20",
  "--mp-card-title-font-size": "16px",
  "--mp-card-title-padding": "0 16px",
  "--mp-card-title-margin": "16px 0 0 0",
  "--mp-card-content-padding": "0 16px",
  "--mp-card-content-margin": "16px 0 0 0",
  "--mp-card-content-color": "var(--mp-color-on-surface-variant)",
  "--mp-card-content-font-size": "14px",
  "--mp-card-content-row-margin": "16px 0 0 0",
  "--mp-card-subtitle-color": "var(--mp-color-on-surface-variant)",
  "--mp-card-subtitle-padding": "0 16px",
  "--mp-card-subtitle-margin": "4px 0 0 0",
  "--mp-card-description-margin": "32px 0 0 0",
  "--mp-card-description-padding": "0 16px",
  "--mp-card-description-color": "var(--mp-color-on-surface-variant)",
  "--mp-card-padding": "0 0 16px 0",
  "--mp-card-footer-margin": "32px 0 0 0",
  "--mp-card-title-row-margin": "16px 0 0 0",
  "--mp-card-subtitle-row-margin": "4px 0 0 0",
  "--mp-card-footer-padding": "0 16px",
  "--mp-card-close-button-size": "56px",
  "--mp-card-close-button-primary-color": "var(--mp-color-primary-container)",
  "--mp-card-close-button-text-color": "var(--mp-color-on-primary-container)",
  "--mp-card-close-button-border-radius": "12px",
  "--mp-card-outline-color": "var(--mp-color-outline)",
  "--mp-card-image-width": "100%",
  "--mp-card-row-image-width": "140px",
  "--mp-card-row-height": "140px",
  "--mp-card-subtitle-font-size": "14px",
  "--mp-card-description-font-size": "14px",
  "--mp-card-footer-right": "13px",
  "--mp-card-footer-bottom": "9px",
  "--mp-card-line-height": "22px",
  "--mp-card-row-line-height": "1.5",
  "--mp-card-floating-buttons-bottom": "16px",
  "--mp-card-floating-buttons-right": "16px",
  "--mp-card-floating-buttons-color": "#fff",
  "--mp-card-close-button-icon-size": "24px"
}, P5 = {
  "--mp-cell-description-color": "var(--mp-color-on-surface-variant)",
  "--mp-cell-color": "var(--mp-color-text)",
  "--mp-cell-font-size": "var(--mp-font-size-md)",
  "--mp-cell-description-font-size": "var(--mp-font-size-sm)",
  "--mp-cell-description-margin-top": "4px",
  "--mp-cell-padding": "10px 12px",
  "--mp-cell-min-height": "40px",
  "--mp-cell-border-color": "var(--mp-color-outline)",
  "--mp-cell-border-left": "12px",
  "--mp-cell-border-right": "12px",
  "--mp-cell-icon-right": "8px",
  "--mp-cell-extra-left": "8px"
}, O5 = {
  "--mp-checkbox-unchecked-color": "var(--mp-color-on-surface-variant)",
  "--mp-checkbox-text-color": "var(--mp-color-on-surface-variant)",
  "--mp-checkbox-checked-color": "var(--mp-color-primary)",
  "--mp-checkbox-disabled-color": "var(--mp-color-text-disabled)",
  "--mp-checkbox-error-color": "var(--mp-color-danger)",
  "--mp-checkbox-action-padding": "6px",
  "--mp-checkbox-icon-size": "24px"
}, E5 = {
  "--mp-chip-round-radius": "8px",
  "--mp-chip-default-color": "var(--mp-color-surface-container-high)",
  "--mp-chip-default-text-color": "#1D192B",
  "--mp-chip-primary-text-color": "var(--mp-color-on-primary-container)",
  "--mp-chip-danger-text-color": "var(--mp-color-on-danger-container)",
  "--mp-chip-success-text-color": "var(--mp-color-on-success-container)",
  "--mp-chip-warning-text-color": "var(--mp-color-on-warning-container)",
  "--mp-chip-info-text-color": "var(--mp-color-on-info-container)",
  "--mp-chip-primary-color": "var(--mp-color-primary-container)",
  "--mp-chip-danger-color": "var(--mp-color-danger-container)",
  "--mp-chip-success-color": "var(--mp-color-success-container)",
  "--mp-chip-warning-color": "var(--mp-color-warning-container)",
  "--mp-chip-info-color": "var(--mp-color-info-container)",
  "--mp-chip-primary-plain-color": "var(--mp-color-primary)",
  "--mp-chip-danger-plain-color": "var(--mp-color-danger)",
  "--mp-chip-success-plain-color": "var(--mp-color-success)",
  "--mp-chip-warning-plain-color": "var(--mp-color-warning)",
  "--mp-chip-info-plain-color": "var(--mp-color-info)",
  "--mp-chip-border-radius": "2px",
  "--mp-chip-normal-height": "32px",
  "--mp-chip-large-height": "40px",
  "--mp-chip-small-height": "24px",
  "--mp-chip-mini-height": "16px",
  "--mp-chip-normal-padding": "0 10px",
  "--mp-chip-large-padding": "0 17px",
  "--mp-chip-small-padding": "0 6px",
  "--mp-chip-mini-padding": "0 4px",
  "--mp-chip-text-normal-margin": "0 5px",
  "--mp-chip-text-large-margin": "0 5px",
  "--mp-chip-text-small-margin": "0 3px",
  "--mp-chip-text-mini-margin": "0 2px",
  "--mp-chip-mini-font-size": "var(--mp-font-size-xs)",
  "--mp-chip-small-font-size": "var(--mp-font-size-sm)",
  "--mp-chip-normal-font-size": "var(--mp-font-size-md)",
  "--mp-chip-large-font-size": "var(--mp-font-size-lg)"
}, T5 = {
  "--mp-code-font-size": "14px",
  "--mp-code-line-height": "1.7"
}, B5 = {
  "--mp-collapse-background": "var(--mp-color-surface-container-low)",
  "--mp-collapse-text-color": "#1D1B20",
  "--mp-collapse-header-font-size": "var(--mp-font-size-lg)",
  "--mp-collapse-header-padding": "10px 12px",
  "--mp-collapse-content-font-size": "var(--mp-font-size-md)",
  "--mp-collapse-content-padding": "0 12px 10px",
  "--mp-collapse-item-margin-top": "16px",
  "--mp-collapse-disable-color": "#bdbdbd",
  "--mp-collapse-border-top": "thin solid var(--mp-color-outline)"
}, M5 = {
  "--mp-countdown-text-color": "var(--mp-color-text)",
  "--mp-countdown-text-font-size": "var(--mp-font-size-lg)"
}, D5 = {
  "--mp-counter-padding": "0 4px",
  "--mp-counter-font-color": "#fff",
  "--mp-counter-background": "var(--mp-color-primary)",
  "--mp-counter-input-width": "28px",
  "--mp-counter-input-margin": "0 4px",
  "--mp-counter-input-font-size": "14px",
  "--mp-counter-button-size": "28px",
  "--mp-counter-button-text-color": "#fff",
  "--mp-counter-button-icon-size": "100%",
  "--mp-counter-disabled-color": "var(--mp-color-disabled)",
  "--mp-counter-disabled-opacity": "var(--mp-opacity-disabled)",
  "--mp-counter-error-color": "var(--mp-color-danger)"
}, I5 = {
  "--mp-date-picker-title-background": "var(--mp-color-surface-container-high)",
  "--mp-date-picker-title-color": "#1D1B20",
  "--mp-date-picker-title-hint-color": "var(--mp-color-on-surface-variant)",
  "--mp-date-picker-body-background-color": "var(--mp-color-surface-container-high)",
  "--mp-date-picker-main-color": "#1D1B20",
  "--mp-date-picker-border-radius": "20px",
  "--mp-date-picker-title-padding": "20px 20px 16px",
  "--mp-date-picker-actions-padding": "20px",
  "--mp-day-picker-head-item-color": "#1D1B20",
  "--mp-date-picker-header-arrow-filter": "opacity(1)",
  "--mp-date-picker-header-padding": "0 0 16px",
  "--mp-date-picker-body-height": "300px",
  "--mp-date-picker-body-padding": "0 14px 16px",
  "--mp-date-picker-header-color": "var(--mp-color-on-surface-variant)",
  "--mp-date-picker-font-size": "var(--mp-font-size-md)",
  "--mp-date-picker-min-width": "290px",
  "--mp-date-picker-title-hint-font-size": "var(--mp-font-size-md)",
  "--mp-date-picker-title-height": "105px",
  "--mp-date-picker-title-year-font-size": "var(--mp-font-size-md)",
  "--mp-date-picker-title-year-font-weight": "500",
  "--mp-date-picker-title-year-margin-bottom": "8px",
  "--mp-date-picker-title-date-height": "48px",
  "--mp-date-picker-title-date-font-size": "34px",
  "--mp-date-picker-title-date-font-weight": "500",
  "--mp-date-picker-title-date-range-font-size": "20px",
  "--mp-date-picker-title-date-justify-content": "normal",
  "--mp-month-picker-padding": "0 12px",
  "--mp-month-picker-item-width": "33%",
  "--mp-month-picker-item-height": "56px",
  "--mp-month-picker-item-button-max-width": "140px",
  "--mp-year-picker-padding": "0 12px",
  "--mp-year-picker-item-width": "33%",
  "--mp-year-picker-item-height": "56px",
  "--mp-year-picker-item-button-max-width": "140px",
  "--mp-day-picker-content-item-width": "14.28%",
  "--mp-day-picker-content-item-font-size": "var(--mp-font-size-sm)",
  "--mp-day-picker-content-item-padding": "2px 0",
  "--mp-day-picker-content-item-button-width": "32px",
  "--mp-day-picker-content-item-button-height": "32px",
  "--mp-day-picker-content-item-button-font-size": "var(--mp-font-size-sm)",
  "--mp-day-picker-head-item-padding": "8px 0",
  "--mp-day-picker-head-item-font-weight": "600"
}, A5 = {
  "--mp-dialog-width": "312px",
  "--mp-dialog-background": "var(--mp-color-surface-container-high)",
  "--mp-dialog-title-color": "#1D1B20",
  "--mp-dialog-message-color": "var(--mp-color-on-surface-variant)",
  "--mp-dialog-border-radius": "28px",
  "--mp-dialog-title-padding": "24px 24px 0",
  "--mp-dialog-message-padding": "16px 24px 24px",
  "--mp-dialog-actions-padding": "0 24px 24px",
  "--mp-dialog-title-font-size": "20px",
  "--mp-dialog-button-margin-left": "8px",
  "--mp-dialog-message-line-height": "24px",
  "--mp-dialog-message-font-size": "var(--mp-font-size-md)",
  "--mp-dialog-confirm-button-color": "var(--mp-color-primary)",
  "--mp-dialog-cancel-button-color": "var(--mp-color-primary)"
}, N5 = {
  "--mp-divider-color": "var(--mp-color-outline)",
  "--mp-divider-text-color": "#888",
  "--mp-divider-text-margin": "8px 0",
  "--mp-divider-text-padding": "0 8px",
  "--mp-divider-inset": "72px"
}, R5 = {
  "--mp-fab-trigger-border-radius": "16px",
  "--mp-fab-action-size": "40px",
  "--mp-fab-action-border-radius": "12px",
  "--mp-fab-top": "70px",
  "--mp-fab-bottom": "16px",
  "--mp-fab-left": "16px",
  "--mp-fab-right": "16px",
  "--mp-fab-trigger-size": "56px",
  "--mp-fab-trigger-inactive-icon-size": "26px",
  "--mp-fab-trigger-active-icon-size": "22px",
  "--mp-fab-actions-padding": "10px 0",
  "--mp-fab-action-margin": "6px",
  "--mp-fab-transition-standard-easing": "cubic-bezier(0.4, 0, 0.2, 1)"
}, L5 = {
  "--mp-field-decorator-text-color": "#1D1B20",
  "--mp-field-decorator-blur-color": "#79747E",
  "--mp-field-decorator-error-color": "var(--mp-color-danger)",
  "--mp-field-decorator-focus-color": "var(--mp-color-primary)",
  "--mp-field-decorator-placeholder-size": "16px",
  "--mp-field-decorator-icon-size": "20px",
  "--mp-field-decorator-line-size": "1px",
  "--mp-field-decorator-line-focus-size": "2px",
  "--mp-field-decorator-line-border-radius": "4px",
  "--mp-field-decorator-disabled-color": "var(--mp-color-text-disabled)",
  "--mp-field-decorator-standard-normal-margin-top": "22px",
  "--mp-field-decorator-standard-normal-margin-bottom": "4px",
  "--mp-field-decorator-standard-normal-icon-margin-top": "22px",
  "--mp-field-decorator-standard-normal-icon-margin-bottom": "4px",
  "--mp-field-decorator-standard-normal-non-hint-margin-top": "4px",
  "--mp-field-decorator-standard-small-margin-top": "18px",
  "--mp-field-decorator-standard-small-margin-bottom": "4px",
  "--mp-field-decorator-standard-small-icon-margin-top": "18px",
  "--mp-field-decorator-standard-small-icon-margin-bottom": "4px",
  "--mp-field-decorator-standard-small-non-hint-margin-top": "2px",
  "--mp-field-decorator-outlined-normal-margin-top": "16px",
  "--mp-field-decorator-outlined-normal-margin-bottom": "16px",
  "--mp-field-decorator-outlined-normal-padding-left": "16px",
  "--mp-field-decorator-outlined-normal-padding-right": "16px",
  "--mp-field-decorator-outlined-normal-placeholder-space": "4px",
  "--mp-field-decorator-outlined-normal-icon-margin-top": "16px",
  "--mp-field-decorator-outlined-normal-icon-margin-bottom": "16px",
  "--mp-field-decorator-outlined-small-margin-top": "8px",
  "--mp-field-decorator-outlined-small-margin-bottom": "8px",
  "--mp-field-decorator-outlined-small-padding-left": "12px",
  "--mp-field-decorator-outlined-small-padding-right": "12px",
  "--mp-field-decorator-outlined-small-placeholder-space": "2px",
  "--mp-field-decorator-outlined-small-icon-margin-top": "8px",
  "--mp-field-decorator-outlined-small-icon-margin-bottom": "8px"
}, V5 = {
  "--mp-floating-panel-background": "var(--mp-color-surface-container-low)",
  "--mp-floating-panel-toolbar-background": "#79747E",
  "--mp-floating-panel-toolbar-width": "32px",
  "--mp-floating-panel-toolbar-height": "4px",
  "--mp-floating-panel-header-height": "36px",
  "--mp-floating-panel-z-index": "999",
  "--mp-floating-panel-border-top": "none",
  "--mp-floating-panel-border-radius": "0",
  "--mp-floating-panel-toolbar-border-radius": "10px",
  "--mp-floating-panel-transition-timing-function": "cubic-bezier(0.18, 0.89, 0.32, 1.28)"
}, F5 = {
  "--mp-form-details-error-message-color": "var(--mp-color-danger)",
  "--mp-form-details-extra-message-color": "#888",
  "--mp-form-details-margin-top": "6px",
  "--mp-form-details-font-size": "12px",
  "--mp-form-details-message-margin-right": "4px"
}, U5 = {
  "--mp-hover-overlay-opacity": "var(--mp-opacity-hover)",
  "--mp-hover-overlay-focusing-opacity": "var(--mp-opacity-focus)"
}, j5 = {
  "--mp-icon-size": "20px"
}, H5 = {
  "--mp-image-preview-swipe-indicators-text-color": "#ddd",
  "--mp-image-preview-swipe-indicators-padding": "16px 0",
  "--mp-image-preview-zoom-container-background": "#000",
  "--mp-image-preview-close-icon-top": "14px",
  "--mp-image-preview-close-icon-right": "14px",
  "--mp-image-preview-extra-top": "14px",
  "--mp-image-preview-extra-left": "14px",
  "--mp-image-preview-close-icon-size": "22px",
  "--mp-image-preview-close-icon-color": "#fff"
}, Y5 = {
  "--mp-index-bar-list-right": "0",
  "--mp-index-bar-list-top": "50%",
  "--mp-index-bar-list-left": "auto",
  "--mp-index-bar-list-bottom": "auto",
  "--mp-index-bar-list-transform": "translate(0, -50%)",
  "--mp-index-bar-list-item-font-size": "var(--mp-font-size-xs)",
  "--mp-index-bar-list-item-color": "var(--mp-color-primary)",
  "--mp-index-bar-list-item-active-color": "var(--mp-color-danger)",
  "--mp-index-bar-list-item-height": "14px",
  "--mp-index-bar-list-item-padding": "0 10px"
}, W5 = {
  "--mp-input-input-height": "24px",
  "--mp-input-input-font-size": "16px",
  "--mp-input-textarea-height": "auto"
}, K5 = {
  "--mp-link-default-color": "#000",
  "--mp-link-primary-color": "var(--mp-color-primary)",
  "--mp-link-danger-color": "var(--mp-color-danger)",
  "--mp-link-success-color": "var(--mp-color-success)",
  "--mp-link-warning-color": "var(--mp-color-warning)",
  "--mp-link-info-color": "var(--mp-color-info)",
  "--mp-link-disabled-color": "var(--mp-color-text-disabled)",
  "--mp-link-font-size": "var(--mp-font-size-md)",
  "--mp-link-focus-opacity": "0.8"
}, q5 = {
  "--mp-list-loading-height": "50px",
  "--mp-list-finished-height": "50px",
  "--mp-list-error-height": "50px",
  "--mp-list-loading-color": "#888",
  "--mp-list-finished-color": "#888",
  "--mp-list-error-color": "#888",
  "--mp-list-loading-font-size": "var(--mp-font-size-md)",
  "--mp-list-finished-font-size": "var(--mp-font-size-md)",
  "--mp-list-error-font-size": "var(--mp-font-size-md)"
}, X5 = {
  "--mp-loading-color": "var(--mp-color-primary)",
  "--mp-loading-opacity": "0.38",
  "--mp-loading-desc-margin": "8px 0 0",
  "--mp-loading-desc-color": "var(--mp-color-primary)"
}, G5 = {
  "--mp-loading-bar-color": "var(--mp-color-primary)",
  "--mp-loading-bar-error-color": "var(--mp-color-danger)",
  "--mp-loading-bar-height": "3px"
}, Z5 = {
  "--mp-menu-background-color": "var(--mp-color-surface-container)",
  "--mp-menu-border-radius": "4px"
}, J5 = {
  "--mp-menu-option-text-color": "#1D1B20",
  "--mp-menu-option-normal-height": "38px",
  "--mp-menu-option-small-height": "30px",
  "--mp-menu-option-mini-height": "24px",
  "--mp-menu-option-large-height": "46px",
  "--mp-menu-option-padding": "0 12px",
  "--mp-menu-option-normal-font-size": "var(--mp-font-size-md)",
  "--mp-menu-option-small-font-size": "var(--mp-font-size-sm)",
  "--mp-menu-option-mini-font-size": "var(--mp-font-size-xs)",
  "--mp-menu-option-large-font-size": "var(--mp-font-size-lg)",
  "--mp-menu-option-selected-background": "var(--mp-color-primary)",
  "--mp-menu-option-disabled-color": "var(--mp-color-text-disabled)"
}, Q5 = {
  "--mp-menu-select-menu-background-color": "var(--mp-color-surface-container)",
  "--mp-menu-select-menu-border-radius": "4px",
  "--mp-menu-select-menu-max-height": "278px",
  "--mp-menu-select-menu-padding": "0"
}, x5 = {
  "--mp-option-text-color": "#1D1B20",
  "--mp-option-height": "38px",
  "--mp-option-padding": "0 12px",
  "--mp-option-font-size": "16px",
  "--mp-option-selected-background": "var(--mp-field-decorator-focus-color)",
  "--mp-option-disabled-color": "var(--mp-color-text-disabled)"
}, _5 = {
  "--mp-overlay-background-color": "rgba(0, 0, 0, 0.6)"
}, eB = {
  "--mp-pagination-text-color": "#555",
  "--mp-pagination-font-size": "var(--mp-font-size-md)",
  "--mp-pagination-active-color": "var(--mp-color-on-primary)",
  "--mp-pagination-active-bg-color": "var(--mp-color-primary)",
  "--mp-pagination-hover-bg-color": "rgba(85, 85, 85, 0.15)",
  "--mp-pagination-total-margin": "0 10px",
  "--mp-pagination-total-line-height": "24px",
  "--mp-pagination-item-width": "32px",
  "--mp-pagination-item-height": "32px",
  "--mp-pagination-item-margin": "0 6px",
  "--mp-pagination-item-background": "#fff",
  "--mp-pagination-item-border-radius": "4px",
  "--mp-pagination-item-simple-border-radius": "50%",
  "--mp-pagination-input-width": "32px",
  "--mp-pagination-disabled-color": "var(--mp-color-text-disabled)",
  "--mp-pagination-bg-disabled-color": "var(--mp-color-disabled)",
  "--mp-pagination-size-line-height": "24px",
  "--mp-pagination-size-padding": "0 4px",
  "--mp-pagination-quick-jumper-margin": "0 10px"
}, nB = {
  "--mp-paper-background": "var(--mp-color-surface-container-low)",
  "--mp-paper-border-radius": "12px"
}, tB = {
  "--mp-picker-background": "var(--mp-color-body)",
  "--mp-picker-cancel-button-text-color": "var(--mp-color-primary)",
  "--mp-picker-mask-background-image": "linear-gradient(180deg, rgba(254, 247, 255, 0.9), rgba(254, 247, 255, 0.4)), linear-gradient(0deg, rgba(254, 247, 255, 0.9), rgba(254, 247, 255, 0.4))",
  "--mp-picker-toolbar-height": "44px",
  "--mp-picker-confirm-button-text-color": "var(--mp-color-primary)",
  "--mp-picker-picked-border": "1px solid var(--mp-color-outline)",
  "--mp-picker-title-font-size": "var(--mp-font-size-lg)",
  "--mp-picker-title-text-color": "#555",
  "--mp-picker-option-font-size": "var(--mp-font-size-lg)",
  "--mp-picker-option-text-color": "#555",
  "--mp-picker-toolbar-padding": "0 4px"
}, oB = {
  "--mp-popup-content-background-color": "var(--mp-color-surface-container-high)",
  "--mp-popup-overlay-background-color": "rgba(0, 0, 0, 0.6)"
}, rB = {
  "--mp-progress-font-size": "var(--mp-font-size-sm)",
  "--mp-progress-track-color": "#d8d8d8",
  "--mp-progress-label-color": "#555",
  "--mp-progress-background": "var(--mp-color-primary)",
  "--mp-progress-default-color": "#f5f5f5",
  "--mp-progress-primary-color": "var(--mp-color-primary)",
  "--mp-progress-danger-color": "var(--mp-color-danger)",
  "--mp-progress-success-color": "var(--mp-color-success)",
  "--mp-progress-warning-color": "var(--mp-color-warning)",
  "--mp-progress-info-color": "var(--mp-color-info)",
  "--mp-progress-linear-border-radius": "0px"
}, aB = {
  "--mp-pull-refresh-background": "var(--mp-color-body)",
  "--mp-pull-refresh-size": "40px",
  "--mp-pull-refresh-color": "var(--mp-color-primary)",
  "--mp-pull-refresh-success-color": "var(--mp-color-success)",
  "--mp-pull-refresh-icon-size": "25px"
}, iB = {
  "--mp-radio-unchecked-color": "var(--mp-color-on-surface-variant)",
  "--mp-radio-text-color": "var(--mp-color-on-surface-variant)",
  "--mp-radio-checked-color": "var(--mp-color-primary)",
  "--mp-radio-disabled-color": "var(--mp-color-text-disabled)",
  "--mp-radio-error-color": "var(--mp-color-danger)",
  "--mp-radio-icon-size": "24px",
  "--mp-radio-action-padding": "6px"
}, lB = {
  "--mp-rate-color": "var(--mp-color-on-surface-variant)",
  "--mp-rate-size": "24px",
  "--mp-rate-disabled-color": "var(--mp-color-text-disabled)",
  "--mp-rate-error-color": "var(--mp-color-danger)",
  "--mp-rate-action-padding": "4px",
  "--mp-rate-primary-color": "var(--mp-color-primary)"
}, sB = {
  "--mp-result-background": "var(--mp-color-body)",
  "--mp-result-border-radius": "12px",
  "--mp-result-title-color": "#1D1B20",
  "--mp-result-description-color": "var(--mp-color-on-surface-variant)",
  "--mp-result-info-border-color": "rgba(98, 91, 113, 0.3)",
  "--mp-result-success-border-color": "rgba(83, 101, 37, 0.3)",
  "--mp-result-error-border-color": "rgba(179, 38, 30, 0.3)",
  "--mp-result-warning-border-color": "rgba(125, 82, 96, 0.3)",
  "--mp-result-padding": "24px",
  "--mp-result-title-font-size": "32px",
  "--mp-result-title-margin": "15px 0 0 0",
  "--mp-result-image-size": "80px",
  "--mp-result-title-font-weight": "500",
  "--mp-result-description-margin": "10px 0 0 0",
  "--mp-result-description-font-size": "14px",
  "--mp-result-description-line-height": "1.6",
  "--mp-result-info-color": "var(--mp-color-info)",
  "--mp-result-success-color": "var(--mp-color-success)",
  "--mp-result-error-color": "var(--mp-color-danger)",
  "--mp-result-warning-color": "var(--mp-color-warning)",
  "--mp-result-question-color": "#607d8b",
  "--mp-result-question-border-color": "rgba(96, 125, 139, 0.3)",
  "--mp-result-empty-color": "#9e9e9e",
  "--mp-result-empty-border-color": "rgba(158, 158, 158, 0.3)"
}, uB = {
  "--mp-ripple-cubic-bezier": "cubic-bezier(0.68, 0.01, 0.62, 0.6)",
  "--mp-ripple-color": "currentColor"
}, cB = {
  "--mp-select-scroller-background": "var(--mp-color-surface-container)",
  "--mp-select-scroller-border-radius": "4px",
  "--mp-select-scroller-padding": "6px 0",
  "--mp-select-scroller-max-height": "278px",
  "--mp-select-chips-margin": "-5px 0 0 0",
  "--mp-select-chips-padding": "2px 0",
  "--mp-select-chip-margin": "5px 5px 0 0",
  "--mp-select-arrow-size": "20px",
  "--mp-select-standard-menu-margin": "calc(var(--mp-field-decorator-placeholder-size) * 0.75 + 12px) 0 0 0",
  "--mp-select-label-font-size": "16px"
}, dB = {
  "--mp-signature-background-color": "var(--mp-color-surface-container-low)",
  "--mp-signature-stroke-color": "#1D1B20",
  "--mp-signature-height": "200px",
  "--mp-signature-border-radius": "12px"
}, pB = {
  "--mp-skeleton-content-padding": "16px",
  "--mp-skeleton-card-height": "160px",
  "--mp-skeleton-card-border-radius": "4px",
  "--mp-skeleton-card-margin-bottom": "16px",
  "--mp-skeleton-card-background-color": "rgba(0, 0, 0, 0.12)",
  "--mp-skeleton-animation-background": "linear-gradient(90deg, hsla(0, 0%, 100%, 0), hsla(0, 0%, 100%, 0.3), hsla(0, 0%, 100%, 0))",
  "--mp-skeleton-avatar-size": "34px",
  "--mp-skeleton-avatar-border-radius": "50%",
  "--mp-skeleton-avatar-margin-right": "16px",
  "--mp-skeleton-avatar-background-color": "rgba(0, 0, 0, 0.12)",
  "--mp-skeleton-title-width": "50%",
  "--mp-skeleton-title-border-radius": "10px",
  "--mp-skeleton-title-background-color": "rgba(0, 0, 0, 0.12)",
  "--mp-skeleton-row-height": "12px",
  "--mp-skeleton-row-border-radius": "10px",
  "--mp-skeleton-row-margin-top": "10px"
}, mB = {
  "--mp-slider-thumb-size": "16px",
  "--mp-slider-track-height": "4px",
  "--mp-slider-track-background": "var(--mp-color-surface-container-highest)",
  "--mp-slider-track-fill-border-radius": "4px",
  "--mp-slider-track-border-radius": "4px",
  "--mp-slider-error-color": "var(--mp-color-danger)",
  "--mp-slider-track-fill-background": "var(--mp-color-primary)",
  "--mp-slider-thumb-block-background": "var(--mp-color-primary)",
  "--mp-slider-thumb-ripple-background": "var(--mp-color-primary)",
  "--mp-slider-thumb-label-background": "var(--mp-color-primary)",
  "--mp-slider-thumb-label-font-size": "var(--mp-font-size-sm)",
  "--mp-slider-thumb-label-text-color": "var(--mp-color-on-primary)",
  "--mp-slider-disabled-opacity": "var(--mp-opacity-disabled)"
}, fB = {
  "--mp-snackbar-color": "#F5EFF7",
  "--mp-snackbar-background": "var(--mp-color-inverse-surface)",
  "--mp-snackbar-width": "256px",
  "--mp-snackbar-border-radius": "4px",
  "--mp-snackbar-font-size": "var(--mp-font-size-md)",
  "--mp-snackbar-margin": "6px 24px",
  "--mp-snackbar-border-color": "currentColor",
  "--mp-snackbar-success-background": "var(--mp-color-success)",
  "--mp-snackbar-info-background": "var(--mp-color-info)",
  "--mp-snackbar-error-background": "var(--mp-color-danger)",
  "--mp-snackbar-warning-background": "var(--mp-color-warning)",
  "--mp-snackbar-content-padding": "14px 16px",
  "--mp-snackbar-action-margin": "0 8px",
  "--mp-snackbar-vertical-action-margin": "0 8px 8px 0",
  "--mp-snackbar-icon-margin": "0 8px"
}, vB = {
  "--mp-space-size-xs-row-gap": "4px",
  "--mp-space-size-xs-column-gap": "4px",
  "--mp-space-size-sm-row-gap": "6px",
  "--mp-space-size-sm-column-gap": "6px",
  "--mp-space-size-md-row-gap": "8px",
  "--mp-space-size-md-column-gap": "12px",
  "--mp-space-size-lg-row-gap": "12px",
  "--mp-space-size-lg-column-gap": "20px",
  "--mp-space-size-xl-row-gap": "16px",
  "--mp-space-size-xl-column-gap": "24px"
}, gB = {
  "--mp-step-tag-size": "20px",
  "--mp-step-tag-background": "#9e9e9e",
  "--mp-step-tag-font-size": "var(--mp-font-size-md)",
  "--mp-step-tag-color": "var(--mp-color-on-primary)",
  "--mp-step-tag-active-color": "var(--mp-color-primary)",
  "--mp-step-tag-margin": "4px 0",
  "--mp-step-tag-icon-size": "var(--mp-font-size-lg)",
  "--mp-step-content-font-size": "var(--mp-font-size-md)",
  "--mp-step-content-color": "rgba(0, 0, 0, 0.38)",
  "--mp-step-content-active-color": "#000",
  "--mp-step-line-background": "#000",
  "--mp-step-line-gap": "8px",
  "--mp-step-vertical-tag-margin": "0 4px",
  "--mp-step-vertical-min-height": "50px"
}, hB = {
  "--mp-carousel-indicator-color": "#fff",
  "--mp-carousel-indicators-offset": "10px",
  "--mp-carousel-indicator-offset": "4px",
  "--mp-carousel-navigation-z-index": "9",
  "--mp-carousel-navigation-button-width": "36px",
  "--mp-carousel-navigation-button-height": "36px",
  "--mp-carousel-navigation-button-border-radius": "50%",
  "--mp-carousel-navigation-icon-size": "20px",
  "--mp-carousel-navigation-prev-left": "8px",
  "--mp-carousel-navigation-next-right": "8px",
  "--mp-carousel-navigation-prev-top": "8px",
  "--mp-carousel-navigation-next-bottom": "8px"
}, bB = {
  "--mp-switch-track-background": "var(--mp-color-surface-container-low)",
  "--mp-switch-handle-background": "var(--mp-color-surface-container-low)",
  "--mp-switch-track-active-background": "var(--mp-color-primary)",
  "--mp-switch-track-error-background": "var(--mp-color-danger)",
  "--mp-switch-ripple-color": "var(--mp-color-primary)",
  "--mp-switch-handle-color": "var(--mp-color-primary)",
  "--mp-switch-handle-active-color": "var(--mp-color-on-primary)",
  "--mp-switch-handle-active-background": "var(--mp-color-primary)",
  "--mp-switch-handle-error-background": "var(--mp-color-danger)",
  "--mp-switch-disabled-opacity": "var(--mp-opacity-disabled)",
  "--mp-switch-variant-width": "52px",
  "--mp-switch-variant-height": "32px",
  "--mp-switch-variant-track-background": "var(--mp-color-surface-container-highest)",
  "--mp-switch-variant-handle-width": "24px",
  "--mp-switch-variant-handle-height": "24px",
  "--mp-switch-variant-track-border-color": "#79747E",
  "--mp-switch-variant-handle-color": "var(--mp-color-on-primary)",
  "--mp-switch-variant-handle-active-color": "var(--mp-color-primary)",
  "--mp-switch-variant-handle-background": "#79747E",
  "--mp-switch-variant-handle-active-background": "var(--mp-color-on-primary)",
  "--mp-switch-width": "40px",
  "--mp-switch-height": "24px",
  "--mp-switch-track-width": "38px",
  "--mp-switch-track-height": "14.4px",
  "--mp-switch-track-border-radius": "calc(20px * 2 / 3)",
  "--mp-switch-handle-width": "20px",
  "--mp-switch-handle-height": "20px",
  "--mp-switch-ripple-size": "40px",
  "--mp-switch-ripple-left": "-10px",
  "--mp-switch-ripple-active-left": "10px",
  "--mp-switch-loading-size": "16px",
  "--mp-switch-variant-ripple-left": "-4px",
  "--mp-switch-variant-ripple-active-left": "16px"
}, yB = {
  "--mp-tab-inactive-color": "var(--mp-color-on-surface-variant)",
  "--mp-tab-padding": "12px",
  "--mp-tab-active-color": "var(--mp-color-primary)",
  "--mp-tab-disabled-color": "var(--mp-color-text-disabled)",
  "--mp-tab-font-size": "var(--mp-font-size-md)",
  "--mp-tab-font-weight": "400",
  "--mp-tab-active-font-size": "var(--mp-font-size-md)",
  "--mp-tab-active-font-weight": "400"
}, wB = {
  "--mp-table-background": "var(--mp-color-surface-container-low)",
  "--mp-table-tbody-tr-hover-background": "var(--mp-color-surface-container-low)",
  "--mp-table-border-radius": "2px",
  "--mp-table-thead-border-bottom": "thin solid var(--mp-color-outline)",
  "--mp-table-thead-th-text-color": "rgba(0, 0, 0, 0.6)",
  "--mp-table-thead-th-text-align": "left",
  "--mp-table-thead-th-font-size": "14px",
  "--mp-table-thead-tr-border-bottom": "thin solid var(--mp-color-outline)",
  "--mp-table-tbody-tr-border-bottom": "thin solid var(--mp-color-outline)",
  "--mp-table-tbody-td-text-color": "#555",
  "--mp-table-tbody-td-font-size": "16px",
  "--mp-table-tbody-td-text-align": "left",
  "--mp-table-row-height": "46px",
  "--mp-table-row-padding": "0 16px",
  "--mp-table-footer-border-top": "thin solid var(--mp-color-outline)"
}, kB = {
  "--mp-tabs-background": "var(--mp-color-body)",
  "--mp-tabs-item-horizontal-height": "44px",
  "--mp-tabs-item-vertical-height": "66px",
  "--mp-tabs-radius": "2px",
  "--mp-tabs-padding": "12px",
  "--mp-tabs-indicator-size": "2px",
  "--mp-tabs-indicator-border-radius": "0",
  "--mp-tabs-indicator-background": "var(--mp-color-primary)",
  "--mp-tabs-indicator-inner-size": "100%"
}, $B = {
  "--mp-tag-border-width": "1px",
  "--mp-tag-border-radius": "4px",
  "--mp-tag-padding": "0 10px",
  "--mp-tag-icon-margin": "6px",
  "--mp-tag-font-weight": "500",
  "--mp-tag-size-xs-height": "24px",
  "--mp-tag-size-sm-height": "28px",
  "--mp-tag-size-md-height": "32px",
  "--mp-tag-size-lg-height": "36px",
  "--mp-tag-size-xl-height": "40px",
  "--mp-tag-size-xs-padding": "0 6px",
  "--mp-tag-size-sm-padding": "0 8px",
  "--mp-tag-size-md-padding": "0 10px",
  "--mp-tag-size-lg-padding": "0 12px",
  "--mp-tag-size-xl-padding": "0 14px",
  "--mp-tag-size-xs-icon-margin": "4px",
  "--mp-tag-size-sm-icon-margin": "5px",
  "--mp-tag-size-md-icon-margin": "6px",
  "--mp-tag-size-lg-icon-margin": "6px",
  "--mp-tag-size-xl-icon-margin": "8px",
  "--mp-tag-size-xs-font-size": "12px",
  "--mp-tag-size-sm-font-size": "12px",
  "--mp-tag-size-md-font-size": "14px",
  "--mp-tag-size-lg-font-size": "14px",
  "--mp-tag-size-xl-font-size": "16px",
  "--mp-tag-status-default-color": "var(--mp-color-surface-container-high)",
  "--mp-tag-status-default-text-color": "#1D192B",
  "--mp-tag-status-default-border-color": "#d9d9d9",
  "--mp-tag-status-primary-color": "var(--mp-color-primary)",
  "--mp-tag-status-primary-text-color": "var(--mp-color-on-primary)",
  "--mp-tag-status-primary-border-color": "var(--mp-color-primary)",
  "--mp-tag-status-info-color": "var(--mp-color-info)",
  "--mp-tag-status-info-text-color": "var(--mp-color-on-info)",
  "--mp-tag-status-info-border-color": "var(--mp-color-info)",
  "--mp-tag-status-success-color": "var(--mp-color-success)",
  "--mp-tag-status-success-text-color": "var(--mp-color-on-success)",
  "--mp-tag-status-success-border-color": "var(--mp-color-success)",
  "--mp-tag-status-warning-color": "var(--mp-color-warning)",
  "--mp-tag-status-warning-text-color": "var(--mp-color-on-warning)",
  "--mp-tag-status-warning-border-color": "var(--mp-color-warning)",
  "--mp-tag-status-danger-color": "var(--mp-color-danger)",
  "--mp-tag-status-danger-text-color": "var(--mp-color-on-danger)",
  "--mp-tag-status-danger-border-color": "var(--mp-color-danger)",
  "--mp-tag-status-secondary-color": "var(--mp-color-secondary, #757575)",
  "--mp-tag-status-secondary-text-color": "var(--mp-color-on-secondary, #fff)",
  "--mp-tag-status-secondary-border-color": "var(--mp-color-secondary, #757575)",
  "--mp-tag-status-contrast-color": "#1d1b20",
  "--mp-tag-status-contrast-text-color": "#ffffff",
  "--mp-tag-status-contrast-border-color": "#1d1b20"
}, CB = {
  "--mp-time-picker-title-color": "#1D1B20",
  "--mp-time-picker-title-hint-color": "var(--mp-color-on-surface-variant)",
  "--mp-time-picker-clock-container-background": "var(--mp-color-surface-container-highest)",
  "--mp-time-picker-title-background": "var(--mp-color-surface-container-high)",
  "--mp-time-picker-body-background": "var(--mp-color-surface-container-high)",
  "--mp-time-picker-clock-item-text-color": "#1D1B20",
  "--mp-time-picker-border-radius": "20px",
  "--mp-time-picker-title-padding": "20px 20px 16px",
  "--mp-time-picker-actions-padding": "20px",
  "--mp-time-picker-title-margin-bottom": "20px",
  "--mp-time-picker-title-time-font-size": "40px",
  "--mp-time-picker-title-ampm-border-radius": "8px",
  "--mp-time-picker-title-time-padding": "8px 12px",
  "--mp-time-picker-title-time-border-radius": "8px",
  "--mp-time-picker-title-ampm-border": "thin solid #79747e",
  "--mp-time-picker-title-ampm-button-padding": "8px",
  "--mp-time-picker-title-time-background": "var(--mp-color-surface-container-highest)",
  "--mp-time-picker-title-inactive-opacity": "1",
  "--mp-time-picker-title-time-active-background": "var(--mp-color-primary-container)",
  "--mp-time-picker-title-ampm-button-active-background": "var(--mp-color-warning-container)",
  "--mp-time-picker-font-size": "var(--mp-font-size-md)",
  "--mp-time-picker-min-width": "290px",
  "--mp-time-picker-title-height": "105px",
  "--mp-time-picker-title-hint-font-size": "14px",
  "--mp-time-picker-title-time-margin": "0 5px",
  "--mp-time-picker-title-ampm-margin-left": "10px",
  "--mp-time-picker-clock-left": "27px",
  "--mp-time-picker-clock-right": "27px",
  "--mp-time-picker-clock-top": "27px",
  "--mp-time-picker-clock-bottom": "27px",
  "--mp-time-picker-clock-container-width": "256px",
  "--mp-time-picker-clock-container-height": "256px",
  "--mp-time-picker-clock-hand-height": "calc(50% - 4px)",
  "--mp-time-picker-clock-hand-width": "2px",
  "--mp-time-picker-clock-hand-bottom": "50%",
  "--mp-time-picker-clock-hand-left": "calc(50% - 1px)",
  "--mp-time-picker-clock-hand-background": "var(--mp-color-primary)",
  "--mp-time-picker-clock-hand-border-color": "var(--mp-color-primary)",
  "--mp-time-picker-clock-hand-before-width": "10px",
  "--mp-time-picker-clock-hand-before-height": "10px",
  "--mp-time-picker-clock-hand-before-border-width": "2px",
  "--mp-time-picker-clock-hand-after-width": "4px",
  "--mp-time-picker-clock-hand-after-height": "4px",
  "--mp-time-picker-clock-item-height": "32px",
  "--mp-time-picker-clock-item-width": "32px",
  "--mp-time-picker-clock-item-active-background": "var(--mp-color-primary)",
  "--mp-time-picker-clock-item-active-color": "var(--mp-color-on-primary)",
  "--mp-time-picker-clock-item-disable-color": "rgba(0, 0, 0, 0.26)",
  "--mp-time-picker-clock-item-disable-background": "#bdbdbd",
  "--mp-time-picker-inner-left": "36px",
  "--mp-time-picker-inner-right": "36px",
  "--mp-time-picker-inner-top": "36px",
  "--mp-time-picker-inner-bottom": "36px",
  "--mp-time-picker-body-height": "288px",
  "--mp-time-picker-title-time-container-justify-content": "flex-end"
}, SB = {
  "--mp-tooltip-default-color": "var(--mp-color-inverse-surface)",
  "--mp-tooltip-opacity": "1",
  "--mp-tooltip-border-radius": "4px",
  "--mp-tooltip-font-size": "14px",
  "--mp-tooltip-padding": "8px 16px",
  "--mp-tooltip-offset": "10px",
  "--mp-tooltip-primary-color": "var(--mp-color-primary)",
  "--mp-tooltip-info-color": "var(--mp-color-info)",
  "--mp-tooltip-success-color": "var(--mp-color-success)",
  "--mp-tooltip-warning-color": "var(--mp-color-warning)",
  "--mp-tooltip-danger-color": "var(--mp-color-danger)",
  "--mp-tooltip-default-text-color": "#fff",
  "--mp-tooltip-primary-text-color": "var(--mp-color-on-primary)",
  "--mp-tooltip-info-text-color": "var(--mp-color-on-info)",
  "--mp-tooltip-success-text-color": "var(--mp-color-on-success)",
  "--mp-tooltip-warning-text-color": "var(--mp-color-on-warning)",
  "--mp-tooltip-danger-text-color": "var(--mp-color-on-danger)"
}, zB = {
  "--mp-uploader-file-border-radius": "8px",
  "--mp-uploader-action-background": "var(--mp-color-surface-container-low)",
  "--mp-uploader-file-name-background": "var(--mp-color-surface-container-low)",
  "--mp-uploader-file-cover-background": "var(--mp-color-surface-container-low)",
  "--mp-uploader-action-icon-color": "var(--mp-color-on-surface-variant)",
  "--mp-uploader-file-name-color": "var(--mp-color-on-surface-variant)",
  "--mp-uploader-action-icon-size": "24px",
  "--mp-uploader-action-margin": "0 10px 10px 0",
  "--mp-uploader-file-size": "80px",
  "--mp-uploader-file-margin": "0 10px 10px 0",
  "--mp-uploader-file-name-font-size": "12px",
  "--mp-uploader-file-name-padding": "10px",
  "--mp-uploader-file-text-align": "center",
  "--mp-uploader-file-close-background": "rgba(0, 0, 0, 0.3)",
  "--mp-uploader-file-close-size": "24px",
  "--mp-uploader-file-close-icon-font-size": "14px",
  "--mp-uploader-file-close-icon-color": "#fff",
  "--mp-uploader-file-cover-fit": "cover",
  "--mp-uploader-preview-video-width": "100vw",
  "--mp-uploader-preview-video-height": "100vw",
  "--mp-uploader-file-indicator-height": "4px",
  "--mp-uploader-file-indicator-normal-color": "var(--mp-color-disabled)",
  "--mp-uploader-file-indicator-success-color": "var(--mp-color-success)",
  "--mp-uploader-file-indicator-error-color": "var(--mp-color-danger)",
  "--mp-uploader-file-progress-color": "var(--mp-color-primary)",
  "--mp-uploader-disabled-color": "var(--mp-color-disabled)",
  "--mp-uploader-disabled-text-color": "var(--mp-color-text-disabled)",
  "--mp-uploader-loading-background": "linear-gradient(90deg, hsla(0, 0%, 100%, 0), hsla(0, 0%, 100%, 0.3), hsla(0, 0%, 100%, 0))"
}, PB = {
  "--mp-watermark-content-color": "#808080"
}, OB = Object.defineProperty, Mp = Object.getOwnPropertySymbols, EB = Object.prototype.hasOwnProperty, TB = Object.prototype.propertyIsEnumerable, Dp = (e, n, t) => n in e ? OB(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t, ge = (e, n) => {
  for (var t in n || (n = {}))
    EB.call(n, t) && Dp(e, t, n[t]);
  if (Mp)
    for (var t of Mp(n))
      TB.call(n, t) && Dp(e, t, n[t]);
  return e;
}, BB = ge(ge(ge(ge(ge(ge(ge(ge(ge(ge(ge(ge(ge(ge(ge(ge(ge(ge(ge(ge(ge(ge(ge(ge(ge(ge(ge(ge(ge(ge(ge(ge(ge(ge(ge(ge(ge(ge(ge(ge(ge(ge(ge(ge(ge(ge(ge(ge(ge(ge(ge(ge(ge(ge(ge(ge(ge(ge(ge(ge(ge(ge(ge(ge(ge(ge(ge({
  "--mp-color-scheme": "light",
  "--mp-font-size-xs": "10px",
  "--mp-font-size-sm": "12px",
  "--mp-font-size-md": "14px",
  "--mp-font-size-lg": "16px",
  "--mp-icon-size-xs": "16px",
  "--mp-icon-size-sm": "18px",
  "--mp-icon-size-md": "20px",
  "--mp-icon-size-lg": "22px",
  "--mp-hsl-body": "293, 100%, 98%",
  "--mp-color-body": "hsla(var(--mp-hsl-body), 1)",
  "--mp-hsl-text": "0, 0%, 0%",
  "--mp-color-text": "hsla(var(--mp-hsl-text), 1)",
  "--mp-hsl-primary": "256, 34%, 48%",
  "--mp-color-primary": "hsla(var(--mp-hsl-primary), 1)",
  "--mp-hsl-info": "259, 11%, 40%",
  "--mp-color-info": "hsla(var(--mp-hsl-info), 1)",
  "--mp-hsl-success": "77, 46%, 27%",
  "--mp-color-success": "hsla(var(--mp-hsl-success), 1)",
  "--mp-hsl-warning": "340, 21%, 41%",
  "--mp-color-warning": "hsla(var(--mp-hsl-warning), 1)",
  "--mp-hsl-danger": "3, 71%, 41%",
  "--mp-color-danger": "hsla(var(--mp-hsl-danger), 1)",
  "--mp-hsl-on-primary": "0, 0%, 100%",
  "--mp-color-on-primary": "hsla(var(--mp-hsl-on-primary), 1)",
  "--mp-hsl-on-info": "0, 0%, 100%",
  "--mp-color-on-info": "hsla(var(--mp-hsl-on-info), 1)",
  "--mp-hsl-on-success": "0, 0%, 100%",
  "--mp-color-on-success": "hsla(var(--mp-hsl-on-success), 1)",
  "--mp-hsl-on-warning": "0, 0%, 100%",
  "--mp-color-on-warning": "hsla(var(--mp-hsl-on-warning), 1)",
  "--mp-hsl-on-danger": "0, 0%, 100%",
  "--mp-color-on-danger": "hsla(var(--mp-hsl-on-danger), 1)",
  "--mp-hsl-primary-container": "263, 100%, 93%",
  "--mp-color-primary-container": "hsla(var(--mp-hsl-primary-container), 1)",
  "--mp-hsl-info-container": "263, 65%, 92%",
  "--mp-color-info-container": "hsla(var(--mp-hsl-info-container), 1)",
  "--mp-hsl-success-container": "77, 68%, 77%",
  "--mp-color-success-container": "hsla(var(--mp-hsl-success-container), 1)",
  "--mp-hsl-warning-container": "342, 100%, 92%",
  "--mp-color-warning-container": "hsla(var(--mp-hsl-warning-container), 1)",
  "--mp-hsl-danger-container": "4, 71%, 92%",
  "--mp-color-danger-container": "hsla(var(--mp-hsl-danger-container), 1)",
  "--mp-hsl-on-primary-container": "261, 100%, 18%",
  "--mp-color-on-primary-container": "hsla(var(--mp-hsl-on-primary-container), 1)",
  "--mp-hsl-on-info-container": "253, 26%, 13%",
  "--mp-color-on-info-container": "hsla(var(--mp-hsl-on-info-container), 1)",
  "--mp-hsl-on-success-container": "79, 100%, 6%",
  "--mp-color-on-success-container": "hsla(var(--mp-hsl-on-success-container), 1)",
  "--mp-hsl-on-warning-container": "338, 48%, 13%",
  "--mp-color-on-warning-container": "hsla(var(--mp-hsl-on-warning-container), 1)",
  "--mp-hsl-on-danger-container": "3, 71%, 15%",
  "--mp-color-on-danger-container": "hsla(var(--mp-hsl-on-danger-container), 1)",
  "--mp-hsl-disabled": "0, 0%, 88%",
  "--mp-color-disabled": "hsla(var(--mp-hsl-disabled), 1)",
  "--mp-hsl-text-disabled": "0, 0%, 67%",
  "--mp-color-text-disabled": "hsla(var(--mp-hsl-text-disabled), 1)",
  "--mp-hsl-surface-container": "276, 38%, 95%",
  "--mp-color-surface-container": "hsla(var(--mp-hsl-surface-container), 1)",
  "--mp-hsl-surface-container-low": "278, 44%, 96%",
  "--mp-color-surface-container-low": "hsla(var(--mp-hsl-surface-container-low), 1)",
  "--mp-hsl-surface-container-high": "276, 25%, 92%",
  "--mp-color-surface-container-high": "hsla(var(--mp-hsl-surface-container-high), 1)",
  "--mp-hsl-surface-container-highest": "280, 17%, 90%",
  "--mp-color-surface-container-highest": "hsla(var(--mp-hsl-surface-container-highest), 1)",
  "--mp-hsl-inverse-surface": "270, 6%, 20%",
  "--mp-color-inverse-surface": "hsla(var(--mp-hsl-inverse-surface), 1)",
  "--mp-hsl-outline": "270, 11%, 79%",
  "--mp-color-outline": "hsla(var(--mp-hsl-outline), 1)",
  "--mp-hsl-on-surface-variant": "264, 7%, 29%",
  "--mp-color-on-surface-variant": "hsla(var(--mp-hsl-on-surface-variant), 1)",
  "--mp-opacity-disabled": "0.6",
  "--mp-opacity-hover": "0.12",
  "--mp-opacity-focus": "0.2",
  "--mp-cubic-bezier": "cubic-bezier(0.25, 0.8, 0.5, 1)",
  "--mp-shadow-key-umbra-opacity": "rgba(0, 0, 0, 0.2)",
  "--mp-shadow-key-penumbra-opacity": "rgba(0, 0, 0, 0.14)",
  "--mp-shadow-key-ambient-opacity": "rgba(0, 0, 0, 0.12)"
}, S5), v5), U5), Z5), Q5), J5), R5), C5), K5), P5), nB), h5), L5), O5), iB), z5), E5), SB), kB), yB), wB), $B), B5), sB), k5), $5), fB), f5), A5), aB), oB), tB), V5), y5), cB), x5), mB), zB), CB), I5), bB), lB), b5), w5), M5), D5), N5), F5), j5), H5), Y5), W5), q5), X5), G5), _5), eB), rB), uB), pB), vB), gB), hB), PB), g5), T5), dB);
function MB(e, n = {}) {
  const { rootFontSize: t = 16, unitPrecision: o = 6 } = n;
  return Uu(e, (r) => `${Number((r / t).toFixed(o))}rem`);
}
function DB(e, n = {}) {
  const { viewportWidth: t = 375, viewportUnit: o = "vmin", unitPrecision: r = 6 } = n;
  return Uu(e, (a) => `${Number((a / t * 100).toFixed(r))}${o}`);
}
const IB = { dark: QE, md3Light: BB, md3Dark: m5, toViewport: DB, toRem: MB, convert: Uu }, tI = null;
var Ks = IB;
const Yn = ["12", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"], En = ["00", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"], Ip = ["00", "05", "10", "15", "20", "25", "30", "35", "40", "45", "50", "55"], sb = {
  modelValue: String,
  elevation: {
    type: [Boolean, Number, String],
    default: !1
  },
  hint: String,
  color: String,
  titleColor: String,
  format: {
    type: String,
    default: "ampm"
  },
  allowedTime: Object,
  min: String,
  max: String,
  useSeconds: Boolean,
  readonly: Boolean,
  "onUpdate:modelValue": R(),
  onChange: R()
}, ub = (e, n) => e === "24hr" || n === "am", ju = (e, n, t) => {
  const o = Yn.findIndex((a) => Y(a) === Y(t)), r = ub(e, n) ? t : En[o];
  return {
    hourStr: r,
    hourNum: Y(r)
  };
}, Dn = (e) => {
  const [n, t, o] = e.split(":");
  return {
    hour: Y(n),
    minute: Y(t),
    second: Y(o)
  };
}, cb = (e) => {
  var n, t;
  const { time: o, format: r, ampm: a, hour: i, max: l, min: s, disableHour: u } = e, { hourStr: c, hourNum: d } = ju(r, a, i);
  let p = !1, f = !1;
  if (u.includes(c))
    return !0;
  if (l && !s) {
    const { hour: h, minute: v } = Dn(l);
    p = h === d && o > v;
  }
  if (!l && s) {
    const { hour: h, minute: v } = Dn(s);
    p = h === d && o < v;
  }
  if (l && s) {
    const { hour: h, minute: v } = Dn(l), { hour: y, minute: w } = Dn(s);
    p = y === d && o < w || h === d && o > v;
  }
  return (n = e.allowedTime) != null && n.minutes && (f = (t = e.allowedTime) == null ? void 0 : t.minutes(o)), p || f;
}, db = (e) => {
  var n, t;
  const { time: o, format: r, ampm: a, hour: i, minute: l, max: s, min: u, disableHour: c } = e, { hourStr: d, hourNum: p } = ju(r, a, i);
  let f = !1, h = !1;
  if (c.includes(d))
    return !0;
  if (s && !u) {
    const { hour: v, minute: y, second: w } = Dn(s);
    f = v === p && y < l || y === l && o > w;
  }
  if (!s && u) {
    const { hour: v, minute: y, second: w } = Dn(u);
    f = v === p && y > l || y === l && o > w;
  }
  if (s && u) {
    const { hour: v, minute: y, second: w } = Dn(s), { hour: $, minute: b, second: z } = Dn(u);
    f = v === p && y < l || $ === p && b > l || v === p && y === l && o > w || $ === p && b === l && o < z;
  }
  return (n = e.allowedTime) != null && n.seconds && (h = (t = e.allowedTime) == null ? void 0 : t.seconds(o)), f || h;
}, { n: AB, classes: NB } = _("time-picker");
function RB(e, n) {
  return g(), C(
    "div",
    {
      class: m(e.n("clock"))
    },
    [
      V(
        "div",
        {
          class: m(e.n("clock-hand")),
          style: G(e.handStyle)
        },
        null,
        6
        /* CLASS, STYLE */
      ),
      (g(!0), C(
        Ae,
        null,
        Xe(e.timeScales, (t, o) => (g(), C(
          "div",
          {
            key: t,
            class: m(
              e.classes(
                e.n("clock-item"),
                [e.isActive(o, !1), e.n("clock-item--active")],
                [e.isDisable(t), e.n("clock-item--disable")]
              )
            ),
            style: G(e.getStyle(o, t, !1))
          },
          se(t),
          7
          /* TEXT, CLASS, STYLE */
        ))),
        128
        /* KEYED_FRAGMENT */
      )),
      e.format === "24hr" && e.type === "hour" ? (g(), C(
        "div",
        {
          key: 0,
          ref: "inner",
          class: m(e.n("clock-inner"))
        },
        [
          (g(!0), C(
            Ae,
            null,
            Xe(e.hours24, (t, o) => (g(), C(
              "div",
              {
                key: t,
                class: m(
                  e.classes(
                    e.n("clock-item"),
                    [e.isActive(o, !0), e.n("clock-item--active")],
                    [e.isDisable(t), e.n("clock-item--disable")]
                  )
                ),
                style: G(e.getStyle(o, t, !0))
              },
              se(t),
              7
              /* TEXT, CLASS, STYLE */
            ))),
            128
            /* KEYED_FRAGMENT */
          ))
        ],
        2
        /* CLASS */
      )) : q("v-if", !0)
    ],
    2
    /* CLASS */
  );
}
const pb = ne({
  name: "Clock",
  props: {
    isInner: {
      type: Boolean,
      required: !0
    },
    rad: {
      type: Number
    },
    format: {
      type: String,
      default: "ampm"
    },
    allowedTime: {
      type: Object
    },
    time: {
      type: Object,
      required: !0
    },
    useSeconds: {
      type: Boolean
    },
    preventNextUpdate: {
      type: Boolean
    },
    type: {
      type: String,
      default: "hour"
    },
    ampm: {
      type: String,
      default: "am"
    },
    color: {
      type: String
    },
    min: {
      type: String
    },
    max: {
      type: String
    }
  },
  emits: ["update", "change-prevent-update"],
  setup(e, { emit: n }) {
    const t = k(null), o = k([]), r = k([]), a = O(() => ({
      transform: `rotate(${Y(e.rad)}deg)`,
      height: e.isInner && e.type === "hour" ? "calc(50% - 40px)" : "calc(50% - 4px)",
      backgroundColor: u(),
      borderColor: u()
    })), i = O(() => {
      if (e.rad === void 0)
        return;
      const v = e.rad / 30;
      return v >= 0 ? v : v + 12;
    }), l = O(() => e.type === "hour" ? Yn : Ip), s = (v, y) => {
      v = v ?? (e.type === "minute" ? e.time.minute : e.time.second);
      const w = e.type === "minute" ? cb : db, $ = {
        time: Y(v),
        format: e.format,
        ampm: e.ampm,
        hour: e.time.hour,
        minute: Y(e.time.minute),
        max: e.max,
        min: e.min,
        allowedTime: e.allowedTime,
        disableHour: o.value
      };
      return y && e.type === "minute" && Reflect.deleteProperty($, "minute"), w($);
    }, u = () => {
      if (i.value === void 0)
        return e.color;
      const v = e.isInner ? En[i.value] : l.value[i.value];
      return l.value === Ip ? s() ? "var(--mp-time-picker-clock-item-disable-background)" : e.color : d(v) ? "var(--mp-time-picker-clock-item-disable-background)" : e.color;
    }, c = (v, y) => y ? i.value === v && e.isInner : i.value === v && (!e.isInner || e.type !== "hour"), d = (v) => {
      if (e.type === "hour") {
        if (ub(e.format, e.ampm))
          return o.value.includes(v);
        const y = Yn.findIndex((w) => w === v);
        return r.value.includes(y);
      }
      return s(v, !0);
    }, p = (v, y, w) => {
      const $ = 2 * Math.PI / 12 * v - Math.PI / 2, b = 50 * (1 + Math.cos($)), z = 50 * (1 + Math.sin($)), D = () => c(v, w) ? d(y) ? {
        backgroundColor: "var(--mp-time-picker-clock-item-disable-background)",
        color: "var(--mp-time-picker-clock-item-disable-color)"
      } : {
        backgroundColor: e.color,
        color: void 0
      } : {
        backgroundColor: void 0,
        color: void 0
      }, { backgroundColor: P, color: B } = D();
      return {
        left: `${b}%`,
        top: `${z}%`,
        backgroundColor: P,
        color: B
      };
    }, f = () => {
      const { width: v, height: y } = nn(t.value);
      return {
        width: v,
        height: y
      };
    }, h = () => {
      if (i.value === void 0)
        return;
      const v = e.ampm === "am" ? Yn : En;
      return Jt(v[i.value], 2, "0");
    };
    return pe([i, () => e.isInner], ([v, y], [w, $]) => {
      if (v === w && y === $ || e.type !== "hour" || i.value === void 0)
        return;
      const z = y ? En[i.value] : h(), D = e.useSeconds ? `:${e.time.second}` : "", P = `${z}:${e.time.minute}${D}`;
      e.preventNextUpdate || n("update", P), n("change-prevent-update");
    }), pe(
      () => e.rad,
      (v, y) => {
        if (e.type === "hour" || v === void 0 || y === void 0)
          return;
        const w = v / 6 >= 0 ? v / 6 : v / 6 + 60, $ = y / 6 >= 0 ? y / 6 : y / 6 + 60;
        if (w === $)
          return;
        let b;
        const { hourStr: z } = ju(e.format, e.ampm, e.time.hour);
        if (e.type === "minute") {
          const D = ce().minute(w).format("mm"), P = e.useSeconds ? `:${e.time.second}` : "";
          b = `${z}:${D}${P}`;
        }
        if (e.type === "second") {
          const D = ce().second(w).format("ss"), P = e.useSeconds ? `:${D}` : "";
          b = `${z}:${e.time.minute}${P}`;
        }
        n("update", b);
      }
    ), pe(
      [() => e.max, () => e.min, () => e.allowedTime],
      ([v, y, w]) => {
        if (o.value = [], v && !y) {
          const { hour: $ } = Dn(v), b = Yn.filter((D) => Y(D) > $), z = En.filter((D) => Y(D) > $);
          o.value = [...b, ...z];
        }
        if (!v && y) {
          const { hour: $ } = Dn(y), b = Yn.filter((D) => Y(D) < $), z = En.filter((D) => Y(D) < $);
          o.value = [...b, ...z];
        }
        if (v && y) {
          const { hour: $ } = Dn(v), { hour: b } = Dn(y), z = Yn.filter((P) => Y(P) < b || Y(P) > $), D = En.filter((P) => Y(P) < b || Y(P) > $);
          o.value = [...z, ...D];
        }
        if (w != null && w.hours) {
          const { hours: $ } = w, b = Yn.filter((D) => !$(Y(D))), z = En.filter((D) => !$(Y(D)));
          o.value = [.../* @__PURE__ */ new Set([...o.value, ...b, ...z])];
        }
        r.value = o.value.map(($) => En.findIndex((b) => $ === b)).filter(($) => $ >= 0);
      },
      { immediate: !0, deep: !0 }
    ), {
      n: AB,
      classes: NB,
      hours24: En,
      timeScales: l,
      inner: t,
      handStyle: a,
      disableHour: o,
      isActive: c,
      isDisable: d,
      getSize: f,
      getStyle: p,
      activeItemIndex: i
    };
  }
});
pb.render = RB;
var LB = pb;
const { name: VB, n: FB, classes: UB } = _("time-picker");
function jB(e, n) {
  var t;
  const o = oe("clock");
  return g(), C(
    "div",
    {
      ref: "picker",
      class: m(e.classes(e.n(), e.formatElevation(e.elevation, 2)))
    },
    [
      V(
        "div",
        {
          class: m(e.n("title")),
          style: G({ background: e.titleColor || e.color })
        },
        [
          V(
            "div",
            {
              class: m(e.n("title-hint"))
            },
            se((t = e.hint) != null ? t : (e.pt ? e.pt : e.t)("timePickerHint")),
            3
            /* TEXT, CLASS */
          ),
          V(
            "div",
            {
              class: m(e.n("title-time-container"))
            },
            [
              V(
                "div",
                {
                  class: m(e.n("title-time"))
                },
                [
                  V(
                    "div",
                    {
                      class: m(e.classes(e.n("title-btn"), [e.type === "hour", e.n("title-btn--active")])),
                      onClick: n[0] || (n[0] = (r) => e.checkPanel("hour"))
                    },
                    se(e.time.hour),
                    3
                    /* TEXT, CLASS */
                  ),
                  V(
                    "span",
                    {
                      class: m(e.n("title-splitter"))
                    },
                    ":",
                    2
                    /* CLASS */
                  ),
                  V(
                    "div",
                    {
                      class: m(e.classes(e.n("title-btn"), [e.type === "minute", e.n("title-btn--active")])),
                      onClick: n[1] || (n[1] = (r) => e.checkPanel("minute"))
                    },
                    se(e.time.minute),
                    3
                    /* TEXT, CLASS */
                  ),
                  e.useSeconds ? (g(), C(
                    "span",
                    {
                      key: 0,
                      class: m(e.n("title-splitter"))
                    },
                    ":",
                    2
                    /* CLASS */
                  )) : q("v-if", !0),
                  e.useSeconds ? (g(), C(
                    "div",
                    {
                      key: 1,
                      class: m(e.classes(e.n("title-btn"), [e.type === "second", e.n("title-btn--active")])),
                      onClick: n[2] || (n[2] = (r) => e.checkPanel("second"))
                    },
                    se(e.time.second),
                    3
                    /* TEXT, CLASS */
                  )) : q("v-if", !0)
                ],
                2
                /* CLASS */
              ),
              e.format === "ampm" ? (g(), C(
                "div",
                {
                  key: 0,
                  class: m(e.n("title-ampm"))
                },
                [
                  V(
                    "div",
                    {
                      class: m(e.classes(e.n("title-btn"), [e.ampm === "am", e.n("title-btn--active")])),
                      onClick: n[3] || (n[3] = (r) => e.checkAmpm("am"))
                    },
                    " AM ",
                    2
                    /* CLASS */
                  ),
                  V(
                    "div",
                    {
                      class: m(e.classes(e.n("title-btn"), [e.ampm === "pm", e.n("title-btn--active")])),
                      onClick: n[4] || (n[4] = (r) => e.checkAmpm("pm"))
                    },
                    " PM ",
                    2
                    /* CLASS */
                  )
                ],
                2
                /* CLASS */
              )) : q("v-if", !0)
            ],
            2
            /* CLASS */
          )
        ],
        6
        /* CLASS, STYLE */
      ),
      V(
        "div",
        {
          class: m(e.n("body"))
        },
        [
          V(
            "div",
            {
              ref: "container",
              class: m(e.n("clock-container")),
              onTouchstart: n[5] || (n[5] = (...r) => e.moveHand && e.moveHand(...r)),
              onTouchmove: n[6] || (n[6] = (...r) => e.moveHand && e.moveHand(...r)),
              onTouchend: n[7] || (n[7] = (...r) => e.end && e.end(...r))
            },
            [
              Z(_e, {
                name: `${e.n()}-panel-fade`
              }, {
                default: ue(() => [
                  (g(), ke(o, {
                    key: e.type,
                    ref: "inner",
                    type: e.type,
                    ampm: e.ampm,
                    color: e.color,
                    "is-inner": e.isInner,
                    format: e.format,
                    "allowed-time": e.allowedTime,
                    rad: e.getRad,
                    time: e.time,
                    "prevent-next-update": e.isPreventNextUpdate,
                    "use-seconds": e.useSeconds,
                    max: e.max,
                    min: e.min,
                    onUpdate: e.update,
                    onChangePreventUpdate: e.changePreventUpdate
                  }, null, 8, ["type", "ampm", "color", "is-inner", "format", "allowed-time", "rad", "time", "prevent-next-update", "use-seconds", "max", "min", "onUpdate", "onChangePreventUpdate"]))
                ]),
                _: 1
                /* STABLE */
              }, 8, ["name"])
            ],
            34
            /* CLASS, NEED_HYDRATION */
          )
        ],
        2
        /* CLASS */
      ),
      e.$slots.actions ? (g(), C(
        "div",
        {
          key: 0,
          class: m(e.n("actions"))
        },
        [
          F(e.$slots, "actions")
        ],
        2
        /* CLASS */
      )) : q("v-if", !0)
    ],
    2
    /* CLASS */
  );
}
const mb = ne({
  name: VB,
  components: { Clock: LB },
  props: sb,
  setup(e) {
    const n = k(null), t = k(null), o = k(null), r = k(!1), a = k(!1), i = k(!1), l = k(!1), s = k(!1), u = k(!1), c = k(!1), d = k(0), p = k(0), f = k(), h = k("hour"), v = k("am"), y = k({
      hour: "00",
      minute: "00",
      second: "00"
    }), w = en({
      x: 0,
      y: 0
    }), $ = en({
      x: [],
      y: []
    }), b = O(() => h.value === "hour" ? f.value : h.value === "minute" ? d.value : p.value), { t: z } = lt();
    pe(
      () => e.modelValue,
      (H) => {
        if (H === void 0 || H === "") {
          D();
          return;
        }
        const { hour: x, minute: re, second: ve } = Dn(H), A = ce().hour(x).format("hh"), K = ce().hour(x).format("HH"), me = ce().minute(re).format("mm"), Se = ce().second(ve).format("ss");
        f.value = (A === "12" ? 0 : Y(A)) * 30, d.value = Y(me) * 6, p.value = Y(Se) * 6, y.value = N(H), e.format !== "24hr" && (v.value = Jt(`${x}`, 2, "0") === K && En.includes(K) ? "pm" : "am"), r.value = e.format === "24hr" && En.includes(K);
      },
      { immediate: !0 }
    );
    function D() {
      f.value = void 0, d.value = 0, p.value = 0, y.value = {
        hour: "00",
        minute: "00",
        second: "00"
      }, v.value = "am";
    }
    function P(H) {
      S(e["onUpdate:modelValue"], H), S(e.onChange, H);
    }
    function B(H) {
      return H * 57.29577951308232;
    }
    function I(H) {
      l.value = !1, c.value = !1, h.value = H;
    }
    function U(H) {
      const { disableHour: x } = o.value, re = Yn.findIndex((K) => Y(K) === Y(y.value.hour)), ve = H === "am" ? Yn : En;
      return [...ve.slice(re), ...ve.slice(0, re)].find((K, me) => (a.value = me !== 0, !x.includes(K)));
    }
    function L(H) {
      if (e.readonly)
        return;
      v.value = H;
      const x = U(H);
      if (!x)
        return;
      const re = e.useSeconds ? `:${y.value.second}` : "", ve = `${Jt(x, 2, "0")}:${y.value.minute}${re}`;
      P(ve);
    }
    function W(H, x) {
      const re = H >= $.x[0] && H <= $.x[1], ve = x >= $.y[0] && x <= $.y[1];
      return re && ve;
    }
    function N(H) {
      const x = e.format === "24hr" ? "HH" : "hh", { hour: re, minute: ve, second: A } = Dn(H);
      return {
        hour: ce().hour(re).format(x),
        minute: ce().minute(ve).format("mm"),
        second: ce().second(A).format("ss")
      };
    }
    function T(H) {
      const x = H / 30;
      return x >= 0 ? x : x + 12;
    }
    function M() {
      const { width: H, height: x } = o.value.getSize(), re = w.x - H / 2 - 8, ve = w.x + H / 2 + 8, A = w.y - x / 2 - 8, K = w.y + x / 2 + 8;
      return {
        rangeXMin: re,
        rangeXMax: ve,
        rangeYMin: A,
        rangeYMax: K
      };
    }
    function j(H, x, re) {
      const { disableHour: ve } = o.value;
      i.value = W(H, x);
      const A = Math.round(re / 30) * 30 + 90, K = T(A), me = r.value ? Yn[K] : En[K];
      if (ve.includes(me) || (r.value = e.format === "24hr" ? W(H, x) : !1), r.value !== i.value)
        return;
      const Se = r.value || v.value === "pm" ? En[K] : Yn[K];
      u.value = ve.includes(Se), !u.value && (f.value = A, l.value = !0);
    }
    function E(H) {
      const { disableHour: x } = o.value, re = Math.round(H / 6) * 6 + 90, A = {
        time: re / 6 >= 0 ? re / 6 : re / 6 + 60,
        format: e.format,
        ampm: v.value,
        hour: y.value.hour,
        max: e.max,
        min: e.min,
        disableHour: x,
        allowedTime: e.allowedTime
      };
      c.value = cb(A), !c.value && (d.value = re, s.value = !0);
    }
    function J(H) {
      const { disableHour: x } = o.value, re = Math.round(H / 6) * 6 + 90, A = {
        time: re / 6 >= 0 ? re / 6 : re / 6 + 60,
        format: e.format,
        ampm: v.value,
        hour: y.value.hour,
        minute: Y(y.value.minute),
        max: e.max,
        min: e.min,
        disableHour: x,
        allowedTime: e.allowedTime
      };
      db(A) || (p.value = re);
    }
    function X() {
      const { left: H, top: x, width: re, height: ve } = nn(n.value);
      if (w.x = H + re / 2, w.y = x + ve / 2, h.value === "hour" && e.format === "24hr") {
        const { rangeXMin: A, rangeXMax: K, rangeYMin: me, rangeYMax: Se } = M();
        $.x = [A, K], $.y = [me, Se];
      }
    }
    function te(H) {
      if (Re(H), e.readonly)
        return;
      X();
      const { clientX: x, clientY: re } = H.touches[0], ve = x - w.x, A = re - w.y, K = Math.round(B(Math.atan2(A, ve)));
      h.value === "hour" ? j(x, re, K) : h.value === "minute" ? E(K) : J(K);
    }
    function he() {
      if (!e.readonly) {
        if (h.value === "hour" && l.value) {
          h.value = "minute";
          return;
        }
        h.value === "minute" && e.useSeconds && s.value && (h.value = "second");
      }
    }
    function Ie() {
      a.value = !1;
    }
    return {
      getRad: b,
      time: y,
      container: n,
      inner: o,
      picker: t,
      isInner: r,
      type: h,
      ampm: v,
      isPreventNextUpdate: a,
      n: FB,
      classes: UB,
      t: ln,
      pt: z,
      moveHand: te,
      checkPanel: I,
      checkAmpm: L,
      end: he,
      update: P,
      changePreventUpdate: Ie,
      formatElevation: pn
    };
  }
});
mb.render = jB;
var tl = mb;
ae(tl);
le(tl, sb);
const oI = tl;
var qs = tl;
const fb = {
  modelValue: {
    type: Array,
    default: () => []
  },
  accept: {
    type: String,
    default: "image/*"
  },
  capture: {
    type: [String, Boolean],
    default: void 0
  },
  multiple: Boolean,
  readonly: Boolean,
  disabled: Boolean,
  elevation: {
    type: [Boolean, Number, String],
    default: !0
  },
  resolveType: {
    type: String,
    default: "default"
  },
  removable: {
    type: Boolean,
    default: !0
  },
  maxlength: [Number, String],
  maxsize: [Number, String],
  previewed: {
    type: Boolean,
    default: !0
  },
  ripple: {
    type: Boolean,
    default: !0
  },
  validateTrigger: {
    type: Array,
    default: () => ["onChange", "onRemove"]
  },
  rules: [Array, Function, Object],
  hideList: Boolean,
  preventDefaultPreview: Boolean,
  onClickAction: R(),
  onBeforeFilter: R(),
  onBeforeRead: R(),
  onAfterRead: R(),
  onBeforeRemove: R(),
  onRemove: R(),
  onOversize: R(),
  onPreview: R(),
  "onUpdate:modelValue": R()
};
var Mr = (e, n, t) => new Promise((o, r) => {
  var a = (s) => {
    try {
      l(t.next(s));
    } catch (u) {
      r(u);
    }
  }, i = (s) => {
    try {
      l(t.throw(s));
    } catch (u) {
      r(u);
    }
  }, l = (s) => s.done ? o(s.value) : Promise.resolve(s.value).then(a, i);
  l((t = t.apply(e, n)).next());
});
const { name: HB, n: YB, classes: WB } = _("uploader");
let KB = 0;
const qB = ["onClick"], XB = ["onClick"], GB = ["src", "alt"], ZB = ["tabindex"], JB = ["multiple", "accept", "capture", "disabled"], QB = ["src"];
function xB(e, n) {
  const t = oe("mp-icon"), o = oe("mp-hover-overlay"), r = oe("mp-form-details"), a = oe("mp-popup"), i = Je("ripple"), l = Je("hover");
  return g(), C(
    "div",
    {
      class: m(e.classes(e.n(), e.n("$--box")))
    },
    [
      V(
        "div",
        {
          class: m(e.n("file-list"))
        },
        [
          (g(!0), C(
            Ae,
            null,
            Xe(e.files, (s) => Ue((g(), C("div", {
              key: s.id,
              class: m(e.classes(e.n("file"), e.formatElevation(e.elevation, 2), [s.state === "loading", e.n("--loading")])),
              onClick: (u) => e.preview(s)
            }, [
              V(
                "div",
                {
                  class: m(e.n("file-name"))
                },
                se(s.name || s.url),
                3
                /* TEXT, CLASS */
              ),
              e.removable ? F(e.$slots, "remove-button", {
                key: 0,
                remove: () => {
                  e.handleRemove(s);
                }
              }, () => [
                V("div", {
                  class: m(e.n("file-close")),
                  onClick: Tn((u) => e.handleRemove(s), ["stop"])
                }, [
                  Z(t, {
                    class: m(e.n("file-close-icon")),
                    "mp-uploader-cover": "",
                    name: "delete"
                  }, null, 8, ["class"])
                ], 10, XB)
              ]) : q("v-if", !0),
              s.cover ? (g(), C("img", {
                key: 1,
                role: "img",
                class: m(e.n("file-cover")),
                style: G({ objectFit: s.fit }),
                src: s.cover,
                alt: s.name
              }, null, 14, GB)) : q("v-if", !0),
              V(
                "div",
                {
                  class: m(e.n("file-indicator"))
                },
                [
                  V(
                    "div",
                    {
                      class: m(
                        e.classes(e.n("progress"), [s.state === "success", e.n("--success")], [s.state === "error", e.n("--error")])
                      ),
                      style: G({ width: s.state === "success" || s.state === "error" ? "100%" : `${s.progress}%` })
                    },
                    null,
                    6
                    /* CLASS, STYLE */
                  )
                ],
                2
                /* CLASS */
              )
            ], 10, qB)), [
              [i, { disabled: e.disabled || e.formDisabled || e.readonly || e.formReadonly || !e.ripple }]
            ])),
            128
            /* KEYED_FRAGMENT */
          )),
          !e.maxlength || e.modelValue.length < e.toNumber(e.maxlength) ? Ue((g(), C("div", {
            key: 0,
            ref: "actionRef",
            class: m(
              e.classes(
                e.n("--outline-none"),
                [!e.$slots.default, `${e.n("action")} ${e.formatElevation(e.elevation, 2)}`],
                [e.disabled || e.formDisabled, e.n("--disabled")]
              )
            ),
            tabindex: e.disabled || e.formDisabled ? void 0 : "0",
            onClick: n[2] || (n[2] = (...s) => e.handleActionClick && e.handleActionClick(...s)),
            onFocus: n[3] || (n[3] = (s) => e.isFocusing = !0),
            onBlur: n[4] || (n[4] = (s) => e.isFocusing = !1)
          }, [
            V("input", {
              ref: "input",
              type: "file",
              class: m(e.n("action-input")),
              multiple: e.multiple,
              accept: e.accept,
              capture: e.capture,
              disabled: e.disabled || e.formDisabled || e.readonly || e.formReadonly,
              onChange: n[0] || (n[0] = (...s) => e.handleChange && e.handleChange(...s)),
              onClick: n[1] || (n[1] = Tn(() => {
              }, ["stop"]))
            }, null, 42, JB),
            F(e.$slots, "default", {}, () => [
              Z(t, {
                class: m(e.n("action-icon")),
                "mp-uploader-cover": "",
                name: "plus"
              }, null, 8, ["class"]),
              Z(o, {
                hovering: e.hovering && !e.disabled && !e.formDisabled && !e.readonly && !e.formReadonly,
                focusing: e.isFocusing && !e.disabled && !e.formDisabled && !e.readonly && !e.formReadonly
              }, null, 8, ["hovering", "focusing"])
            ])
          ], 42, ZB)), [
            [i, {
              disabled: e.disabled || e.formDisabled || e.readonly || e.formReadonly || !e.ripple || !!e.$slots.default
            }],
            [l, e.handleHovering, "desktop"]
          ]) : q("v-if", !0)
        ],
        2
        /* CLASS */
      ),
      Z(r, {
        "error-message": e.errorMessage,
        "extra-message": e.maxlengthText
      }, qt({
        _: 2
        /* DYNAMIC */
      }, [
        e.$slots["extra-message"] ? {
          name: "extra-message",
          fn: ue(() => [
            F(e.$slots, "extra-message")
          ]),
          key: "0"
        } : void 0
      ]), 1032, ["error-message", "extra-message"]),
      Z(a, {
        show: e.showPreview,
        "onUpdate:show": n[5] || (n[5] = (s) => e.showPreview = s),
        class: m(e.n("preview")),
        "mp-uploader-cover": "",
        position: "center",
        onClosed: n[6] || (n[6] = (s) => e.currentPreview = null)
      }, {
        default: ue(() => {
          var s, u;
          return [
            e.currentPreview && e.isHTMLSupportVideo((s = e.currentPreview) == null ? void 0 : s.url) ? (g(), C("video", {
              key: 0,
              class: m(e.n("preview-video")),
              playsinline: "true",
              "webkit-playsinline": "true",
              "x5-playsinline": "true",
              "x5-video-player-type": "h5",
              "x5-video-player-fullscreen": "false",
              controls: "",
              src: (u = e.currentPreview) == null ? void 0 : u.url
            }, null, 10, QB)) : q("v-if", !0)
          ];
        }),
        _: 1
        /* STABLE */
      }, 8, ["show", "class"])
    ],
    2
    /* CLASS */
  );
}
const vb = ne({
  name: HB,
  directives: { Ripple: an, Hover: In },
  components: {
    MpIcon: Qe,
    MpPopup: It,
    MpFormDetails: Bn,
    MpHoverOverlay: Vn
  },
  props: fb,
  setup(e) {
    const n = k(!1), t = k(null), o = k(null), r = k(!1), a = k(null), i = O(() => {
      const {
        maxlength: H,
        modelValue: { length: x }
      } = e;
      return zn(H) ? `${x} / ${H}` : "";
    }), { form: l, bindForm: s } = jn(), {
      errorMessage: u,
      validateWithTrigger: c,
      validate: d,
      // expose
      resetValidation: p
    } = Un(), { hovering: f, handleHovering: h } = _n(), v = O(() => {
      const { modelValue: H, hideList: x } = e;
      return x ? [] : H;
    });
    let y = !1;
    const w = {
      getSuccess: M,
      getError: j,
      getLoading: E
    };
    S(s, {
      validate: he,
      resetValidation: p,
      reset: Ie
    }), He(() => window, "keydown", b), He(() => window, "keyup", z), pe(
      () => e.modelValue,
      () => {
        !y && te("onChange"), y = !1;
      },
      { deep: !0 }
    );
    function b(H) {
      n.value && ((H.key === " " || H.key === "Enter") && H.preventDefault(), H.key === "Enter" && t.value.click());
    }
    function z(H) {
      !n.value || H.key !== " " || (H.preventDefault(), t.value.click());
    }
    function D(H) {
      const { disabled: x, previewed: re, preventDefaultPreview: ve, onPreview: A } = e;
      if (l != null && l.disabled.value || x || !re || (S(A, en(H)), ve))
        return;
      const { url: K } = H;
      if (Hc(K)) {
        Jo(K);
        return;
      }
      Yc(K) && (a.value = H, r.value = !0);
    }
    function P(H) {
      return {
        id: KB++,
        url: "",
        cover: "",
        name: H.name,
        file: H,
        progress: 0
      };
    }
    function B(H) {
      const x = H.target, { files: re } = x;
      return Array.from(re);
    }
    function I(H) {
      return Mr(this, null, function* () {
        const x = H.file;
        if (e.resolveType === "default" && x.type.startsWith("image") || e.resolveType === "data-url") {
          const ve = yield mm(x);
          H.cover = ve, H.url = ve;
        }
        return H;
      });
    }
    function U(H) {
      return H.map(I);
    }
    function L(H) {
      const { onBeforeRead: x } = e;
      return H.map(
        (re) => new Promise((ve) => {
          x || ve({
            valid: !0,
            varFile: re
          });
          const A = dt(S(x, en(re)));
          Promise.all(A).then((K) => {
            ve({
              valid: K.every(Boolean),
              varFile: re
            });
          });
        })
      );
    }
    function W(H) {
      return Mr(this, null, function* () {
        const { maxsize: x, maxlength: re, modelValue: ve, onOversize: A, onAfterRead: K, onBeforeFilter: me, readonly: Se, disabled: Ve } = e;
        if (l != null && l.disabled.value || l != null && l.readonly.value || Ve || Se)
          return;
        const We = (Ce) => Ce.filter((Fe) => Fe.file.size > Y(x) ? (S(A, en(Fe)), !1) : !0), on = (Ce) => {
          const Fe = Math.min(Ce.length, Y(re) - ve.length);
          return Ce.slice(0, Fe);
        }, gn = (Ce) => Mr(this, null, function* () {
          if (!me)
            return Ce;
          const Fe = dt(me);
          for (const qe of Fe)
            Ce = yield qe(Ce);
          return Ce;
        });
        let hn = B(H).map(P);
        hn = yield gn(hn), hn = x != null ? We(hn) : hn, hn = re != null ? on(hn) : hn;
        const Yt = yield Promise.all(U(hn)), we = (yield Promise.all(L(Yt))).filter(({ valid: Ce }) => Ce).map(({ varFile: Ce }) => Ce);
        S(e["onUpdate:modelValue"], [...ve, ...we]), H.target.value = "", we.forEach((Ce) => S(K, en(Ce)));
      });
    }
    function N(H) {
      return Mr(this, null, function* () {
        const { disabled: x, readonly: re, modelValue: ve, onBeforeRemove: A, onRemove: K } = e;
        if (l != null && l.disabled.value || l != null && l.readonly.value || x || re)
          return;
        if (A) {
          const Se = dt(S(A, en(H)));
          if ((yield Promise.all(Se)).some((Ve) => !Ve))
            return;
        }
        const me = ve.filter((Se) => Se !== H);
        S(K, en(H)), te("onRemove"), S(e["onUpdate:modelValue"], me);
      });
    }
    function T(H) {
      if (!(l != null && l.disabled.value || e.disabled)) {
        if (e.onClickAction) {
          S(e.onClickAction, J, H);
          return;
        }
        J();
      }
    }
    function M() {
      return e.modelValue.filter((H) => H.state === "success");
    }
    function j() {
      return e.modelValue.filter((H) => H.state === "error");
    }
    function E() {
      return e.modelValue.filter((H) => H.state === "loading");
    }
    function J() {
      o.value.click();
    }
    function X() {
      a.value = null, r.value = !1, Jo.close();
    }
    function te(H) {
      Ke(() => {
        const { validateTrigger: x, rules: re, modelValue: ve } = e;
        c(x, H, re, ve, w);
      });
    }
    function he() {
      return d(e.rules, e.modelValue, w);
    }
    function Ie() {
      y = !0, S(e["onUpdate:modelValue"], []), p();
    }
    return {
      input: o,
      actionRef: t,
      files: v,
      showPreview: r,
      currentPreview: a,
      errorMessage: u,
      maxlengthText: i,
      hovering: f,
      isFocusing: n,
      formDisabled: l == null ? void 0 : l.disabled,
      formReadonly: l == null ? void 0 : l.readonly,
      n: YB,
      classes: WB,
      formatElevation: pn,
      toNumber: Y,
      handleHovering: h,
      isHTMLSupportVideo: Yc,
      isHTMLSupportImage: Hc,
      preview: D,
      handleChange: W,
      handleRemove: N,
      getSuccess: M,
      getError: j,
      getLoading: E,
      validate: he,
      resetValidation: p,
      reset: Ie,
      chooseFile: J,
      closePreview: X,
      handleActionClick: T,
      toSizeUnit: Te
    };
  }
});
vb.render = xB;
var ol = vb;
ae(ol);
le(ol, fb);
const rI = ol;
var Xs = ol;
const gb = {
  width: {
    type: Number,
    default: 100
  },
  height: {
    type: Number,
    default: 100
  },
  content: String,
  image: String,
  rotate: {
    type: Number,
    default: -22
  },
  offsetX: {
    type: Number,
    default: 0
  },
  offsetY: {
    type: Number,
    default: 0
  },
  gapX: {
    type: Number,
    default: 0
  },
  gapY: {
    type: Number,
    default: 0
  },
  zIndex: {
    type: [Number, String],
    default: 10
  },
  opacity: {
    type: [Number, String],
    default: 0.5
  },
  fullscreen: Boolean,
  font: {
    type: Object,
    default: () => ({
      fontStyle: "normal",
      fontVariant: "normal",
      fontWeight: "normal",
      fontSize: 14
    })
  }
};
var _B = Object.defineProperty, eM = Object.defineProperties, nM = Object.getOwnPropertyDescriptors, Ap = Object.getOwnPropertySymbols, tM = Object.prototype.hasOwnProperty, oM = Object.prototype.propertyIsEnumerable, Np = (e, n, t) => n in e ? _B(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t, rM = (e, n) => {
  for (var t in n || (n = {}))
    tM.call(n, t) && Np(e, t, n[t]);
  if (Ap)
    for (var t of Ap(n))
      oM.call(n, t) && Np(e, t, n[t]);
  return e;
}, aM = (e, n) => eM(e, nM(n)), iM = (e, n, t) => new Promise((o, r) => {
  var a = (s) => {
    try {
      l(t.next(s));
    } catch (u) {
      r(u);
    }
  }, i = (s) => {
    try {
      l(t.throw(s));
    } catch (u) {
      r(u);
    }
  }, l = (s) => s.done ? o(s.value) : Promise.resolve(s.value).then(a, i);
  l((t = t.apply(e, n)).next());
});
const { name: lM, n: sM, classes: uM } = _("watermark"), cM = { ref: "svgRef" }, dM = ["viewBox", "width", "height"], pM = ["width", "height"], mM = ["href", "xlink:href", "x", "y", "width", "height"];
function fM(e, n) {
  return g(), C(
    "div",
    {
      class: m(e.n())
    },
    [
      F(e.$slots, "default"),
      (g(), ke(it, {
        to: "body",
        disabled: !e.fullscreen
      }, [
        V(
          "div",
          {
            ref: "containerRef",
            class: m(e.classes(e.n("container"), [e.fullscreen, e.n("--fullscreen")])),
            style: G({
              backgroundImage: `url(${e.watermarkUrl})`,
              zIndex: e.zIndex
            })
          },
          [
            Ue(V(
              "div",
              cM,
              [
                (g(), C("svg", {
                  xmlns: "http://www.w3.org/2000/svg",
                  "xmlns:xlink": "http://www.w3.org/1999/xlink",
                  viewBox: `0 0 ${e.width + e.gapX} ${e.height + e.gapY}`,
                  width: `${e.width + e.gapX}`,
                  height: `${e.height + e.gapY}`,
                  style: G({
                    padding: `0 ${e.gapX}px ${e.gapY}px 0`,
                    opacity: e.opacity
                  })
                }, [
                  e.showContent() ? (g(), C("foreignObject", {
                    key: 0,
                    x: "0",
                    y: "0",
                    width: e.width,
                    height: e.height
                  }, [
                    V(
                      "div",
                      {
                        xmlns: "http://www.w3.org/1999/xhtml",
                        style: G({
                          transform: `translate(${e.offsetX}px, ${e.offsetY}px) rotate(${e.rotate}deg)`,
                          transformOrigin: "center"
                        })
                      },
                      [
                        F(e.$slots, "content", {}, () => [
                          V(
                            "span",
                            {
                              style: G(aM(rM({}, e.font), { fontSize: `${e.font.fontSize}px`, color: e.textColor }))
                            },
                            se(e.content),
                            5
                            /* TEXT, STYLE */
                          )
                        ])
                      ],
                      4
                      /* STYLE */
                    )
                  ], 8, pM)) : q("v-if", !0),
                  !e.$slots.content && e.image ? (g(), C("image", {
                    key: 1,
                    href: e.imageUrl,
                    "xlink:href": e.imageUrl,
                    x: e.offsetX,
                    y: e.offsetY,
                    width: e.width,
                    height: e.height,
                    style: G({
                      transform: `rotate(${e.rotate}deg)`,
                      transformOrigin: "center"
                    })
                  }, null, 12, mM)) : q("v-if", !0)
                ], 12, dM))
              ],
              512
              /* NEED_PATCH */
            ), [
              [xn, !1]
            ])
          ],
          6
          /* CLASS, STYLE */
        )
      ], 8, ["disabled"]))
    ],
    2
    /* CLASS */
  );
}
const hb = ne({
  name: lM,
  props: gb,
  setup(e, { slots: n }) {
    const t = k(""), o = k(""), r = k(""), a = k(null), i = k(null);
    pe(
      () => [
        e.image,
        e.font,
        e.content,
        e.height,
        e.width,
        e.rotate,
        e.gapX,
        e.gapY,
        e.offsetX,
        e.offsetY,
        e.opacity
      ],
      d,
      {
        deep: !0
      }
    ), ht(d), _o(c);
    function l() {
      return !!(n.content || e.content && !e.image);
    }
    function s() {
      return new Promise((p) => {
        const f = document.createElement("canvas"), h = f.getContext("2d"), v = new Image();
        v.crossOrigin = "anonymous", v.referrerPolicy = "no-referrer", v.src = e.image, v.onload = () => {
          f.width = v.width, f.height = v.height, h.drawImage(v, 0, 0), p(f.toDataURL());
        };
      });
    }
    function u(p) {
      const f = new Blob([p], {
        type: "image/svg+xml"
      });
      return URL.createObjectURL(f);
    }
    function c() {
      t.value && URL.revokeObjectURL(t.value);
    }
    function d() {
      return iM(this, null, function* () {
        r.value = Zn(i.value).color, e.image && (o.value = yield s()), yield Ke(), c(), t.value = u(a.value.innerHTML);
      });
    }
    return {
      svgRef: a,
      containerRef: i,
      watermarkUrl: t,
      imageUrl: o,
      textColor: r,
      n: sM,
      classes: uM,
      showContent: l,
      resize: d
    };
  }
});
hb.render = fM;
var rl = hb;
ae(rl);
le(rl, gb);
const aI = rl;
var Gs = rl;
const vM = "1.0.3";
function gM(e) {
  wl.install && e.use(wl), kl.install && e.use(kl), $l.install && e.use($l), zl.install && e.use(zl), El.install && e.use(El), Tl.install && e.use(Tl), Bl.install && e.use(Bl), ea.install && e.use(ea), Ml.install && e.use(Ml), Dl.install && e.use(Dl), Il.install && e.use(Il), Al.install && e.use(Al), Mn.install && e.use(Mn), Nl.install && e.use(Nl), Rl.install && e.use(Rl), Xo.install && e.use(Xo), Go.install && e.use(Go), Ll.install && e.use(Ll), mo.install && e.use(mo), Vl.install && e.use(Vl), na.install && e.use(na), Ul.install && e.use(Ul), jl.install && e.use(jl), Hl.install && e.use(Hl), Yl.install && e.use(Yl), Wl.install && e.use(Wl), Rn.install && e.use(Rn), Kl.install && e.use(Kl), Zl.install && e.use(Zl), es.install && e.use(es), ts.install && e.use(ts), os.install && e.use(os), rs.install && e.use(rs), la.install && e.use(la), as.install && e.use(as), is.install && e.use(is), ls.install && e.use(ls), Uo.install && e.use(Uo), ss.install && e.use(ss), us.install && e.use(us), Bn.install && e.use(Bn), cs.install && e.use(cs), In.install && e.use(In), Vn.install && e.use(Vn), Qe.install && e.use(Qe), ds.install && e.use(ds), Jo.install && e.use(Jo), ps.install && e.use(ps), ms.install && e.use(ms), jo.install && e.use(jo), qo.install && e.use(qo), fs.install && e.use(fs), vs.install && e.use(vs), bo.install && e.use(bo), gs.install && e.use(gs), bl.install && e.use(bl), hs.install && e.use(hs), Wo.install && e.use(Wo), fo.install && e.use(fo), Ko.install && e.use(Ko), ua.install && e.use(ua), bs.install && e.use(bs), ys.install && e.use(ys), ws.install && e.use(ws), ks.install && e.use(ks), It.install && e.use(It), $s.install && e.use($s), Cs.install && e.use(Cs), ca.install && e.use(ca), Ss.install && e.use(Ss), zs.install && e.use(zs), Ps.install && e.use(Ps), an.install && e.use(an), Os.install && e.use(Os), Es.install && e.use(Es), Ts.install && e.use(Ts), Bs.install && e.use(Bs), Ms.install && e.use(Ms), Is.install && e.use(Is), As.install && e.use(As), Ns.install && e.use(Ns), Rs.install && e.use(Rs), ko.install && e.use(ko), Ls.install && e.use(Ls), Vs.install && e.use(Vs), Fs.install && e.use(Fs), Us.install && e.use(Us), js.install && e.use(js), Hs.install && e.use(Hs), Ys.install && e.use(Ys), Ws.install && e.use(Ws), Ks.install && e.use(Ks), qs.install && e.use(qs), sa.install && e.use(sa), Xs.install && e.use(Xs), Gs.install && e.use(Gs);
}
const iI = {
  version: vM,
  install: gM,
  ActionSheet: wl,
  Alert: kl,
  AppBar: $l,
  AutoComplete: zl,
  Avatar: El,
  AvatarGroup: Tl,
  BackTop: Bl,
  Badge: ea,
  BottomNavigation: Ml,
  BottomNavigationItem: Dl,
  Breadcrumb: Il,
  BreadcrumbItem: Al,
  Button: Mn,
  ButtonGroup: Nl,
  Card: Rl,
  Carousel: Xo,
  CarouselItem: Go,
  Cell: Ll,
  Checkbox: mo,
  CheckboxGroup: Vl,
  Chip: na,
  Code: Ul,
  Col: jl,
  Collapse: Hl,
  CollapseItem: Yl,
  CollapseTransition: Wl,
  Context: Rn,
  CountTo: Kl,
  Countdown: Zl,
  Counter: es,
  DatePicker: ts,
  Dialog: os,
  Divider: rs,
  Drag: la,
  Ellipsis: as,
  Empty: is,
  Fab: ls,
  FieldDecorator: Uo,
  FloatingPanel: ss,
  Form: us,
  FormDetails: Bn,
  HighlighterProvider: cs,
  Hover: In,
  HoverOverlay: Vn,
  Icon: Qe,
  Image: ds,
  ImagePreview: Jo,
  IndexAnchor: ps,
  IndexBar: ms,
  Input: jo,
  Lazy: qo,
  Link: fs,
  List: vs,
  Loading: bo,
  LoadingBar: gs,
  Locale: bl,
  LocaleProvider: hs,
  Menu: Wo,
  MenuOption: fo,
  MenuSelect: Ko,
  Option: ua,
  Overlay: bs,
  Pagination: ys,
  Paper: ws,
  Picker: ks,
  Popup: It,
  Progress: $s,
  PullRefresh: Cs,
  Radio: ca,
  RadioGroup: Ss,
  Rate: zs,
  Result: Ps,
  Ripple: an,
  Row: Os,
  Select: Es,
  Signature: Ts,
  Skeleton: Bs,
  Slider: Ms,
  Snackbar: Is,
  Space: As,
  Step: Ns,
  Steps: Rs,
  Sticky: ko,
  StyleProvider: Ls,
  Switch: Vs,
  Tab: Fs,
  TabItem: Us,
  Table: js,
  Tabs: Hs,
  TabsItems: Ys,
  Tag: Ws,
  Themes: Ks,
  TimePicker: qs,
  Tooltip: sa,
  Uploader: Xs,
  Watermark: Gs
};
export {
  wl as ActionSheet,
  kl as Alert,
  $l as AppBar,
  zl as AutoComplete,
  El as Avatar,
  Tl as AvatarGroup,
  Bl as BackTop,
  ea as Badge,
  Ml as BottomNavigation,
  Dl as BottomNavigationItem,
  Il as Breadcrumb,
  Al as BreadcrumbItem,
  Mn as Button,
  Nl as ButtonGroup,
  Rl as Card,
  Xo as Carousel,
  Go as CarouselItem,
  Ll as Cell,
  mo as Checkbox,
  Vl as CheckboxGroup,
  na as Chip,
  Ul as Code,
  jl as Col,
  Hl as Collapse,
  Yl as CollapseItem,
  Wl as CollapseTransition,
  Rn as Context,
  Kl as CountTo,
  Zl as Countdown,
  es as Counter,
  ts as DatePicker,
  os as Dialog,
  rs as Divider,
  la as Drag,
  as as Ellipsis,
  is as Empty,
  ls as Fab,
  Uo as FieldDecorator,
  ss as FloatingPanel,
  us as Form,
  Bn as FormDetails,
  cs as HighlighterProvider,
  In as Hover,
  Vn as HoverOverlay,
  Qe as Icon,
  ds as Image,
  Jo as ImagePreview,
  ps as IndexAnchor,
  ms as IndexBar,
  jo as Input,
  qo as Lazy,
  fs as Link,
  vs as List,
  bo as Loading,
  gs as LoadingBar,
  bl as Locale,
  hs as LocaleProvider,
  Wo as Menu,
  fo as MenuOption,
  Ko as MenuSelect,
  ua as Option,
  bs as Overlay,
  Ol as PIXEL,
  ys as Pagination,
  ws as Paper,
  ks as Picker,
  It as Popup,
  $s as Progress,
  Cs as PullRefresh,
  ca as Radio,
  Ss as RadioGroup,
  zs as Rate,
  Ps as Result,
  an as Ripple,
  Os as Row,
  Rh as SNACKBAR_TYPE,
  Es as Select,
  Ts as Signature,
  Bs as Skeleton,
  Ms as Slider,
  Is as Snackbar,
  As as Space,
  Ns as Step,
  Rs as Steps,
  ko as Sticky,
  Ls as StyleProvider,
  Vs as Switch,
  Fs as Tab,
  Us as TabItem,
  js as Table,
  Hs as Tabs,
  Ys as TabsItems,
  Ws as Tag,
  Ks as Themes,
  qs as TimePicker,
  sa as Tooltip,
  Xs as Uploader,
  Gs as Watermark,
  zM as _ActionSheetComponent,
  PM as _AlertComponent,
  OM as _AppBarComponent,
  NM as _AutoCompleteComponent,
  LM as _AvatarComponent,
  VM as _AvatarGroupComponent,
  jM as _BackTopComponent,
  HM as _BadgeComponent,
  YM as _BottomNavigationComponent,
  WM as _BottomNavigationItemComponent,
  KM as _BreadcrumbComponent,
  qM as _BreadcrumbItemComponent,
  UM as _ButtonComponent,
  XM as _ButtonGroupComponent,
  GM as _CardComponent,
  ZM as _CarouselComponent,
  JM as _CarouselItemComponent,
  QM as _CellComponent,
  MM as _CheckboxComponent,
  xM as _CheckboxGroupComponent,
  _M as _ChipComponent,
  eD as _CodeComponent,
  nD as _ColComponent,
  tD as _CollapseComponent,
  oD as _CollapseItemComponent,
  rD as _CollapseTransitionComponent,
  yM as _ContextComponent,
  aD as _CountToComponent,
  iD as _CountdownComponent,
  lD as _CounterComponent,
  uD as _DatePickerComponent,
  cD as _DialogComponent,
  dD as _DividerComponent,
  pD as _DragComponent,
  fD as _EllipsisComponent,
  vD as _EmptyComponent,
  gD as _FabComponent,
  TM as _FieldDecoratorComponent,
  hD as _FloatingPanelComponent,
  bD as _FormComponent,
  EM as _FormDetailsComponent,
  yD as _HighlighterProviderComponent,
  $M as _HoverComponent,
  CM as _HoverOverlayComponent,
  SM as _IconComponent,
  wD as _ImageComponent,
  kD as _ImagePreviewComponent,
  $D as _IndexAnchorComponent,
  CD as _IndexBarComponent,
  BM as _InputComponent,
  RM as _LazyComponent,
  SD as _LinkComponent,
  zD as _ListComponent,
  PD as _LoadingBarComponent,
  FM as _LoadingComponent,
  bM as _LocaleComponent,
  OD as _LocaleProviderComponent,
  IM as _MenuComponent,
  DM as _MenuOptionComponent,
  AM as _MenuSelectComponent,
  ED as _OptionComponent,
  TD as _OverlayComponent,
  BD as _PaginationComponent,
  MD as _PaperComponent,
  DD as _PickerComponent,
  wM as _PopupComponent,
  ID as _ProgressComponent,
  AD as _PullRefreshComponent,
  ND as _RadioComponent,
  RD as _RadioGroupComponent,
  LD as _RateComponent,
  VD as _ResultComponent,
  kM as _RippleComponent,
  FD as _RowComponent,
  UD as _SelectComponent,
  jD as _SignatureComponent,
  HD as _SkeletonComponent,
  YD as _SliderComponent,
  WD as _SnackbarComponent,
  KD as _SpaceComponent,
  qD as _StepComponent,
  XD as _StepsComponent,
  sD as _StickyComponent,
  GD as _StyleProviderComponent,
  ZD as _SwitchComponent,
  JD as _TabComponent,
  QD as _TabItemComponent,
  xD as _TableComponent,
  _D as _TabsComponent,
  eI as _TabsItemsComponent,
  nI as _TagComponent,
  tI as _ThemesComponent,
  oI as _TimePickerComponent,
  mD as _TooltipComponent,
  rI as _UploaderComponent,
  aI as _WatermarkComponent,
  Zm as actionSheetProps,
  du as add,
  Qm as alertProps,
  _m as appBarProps,
  Lf as avatarGroupProps,
  Nf as avatarProps,
  Yf as backTopProps,
  Kf as badgeProps,
  Jf as bottomNavigationItemProps,
  Xf as bottomNavigationProps,
  nv as breadcrumbItemProps,
  xf as breadcrumbProps,
  ov as buttonGroupProps,
  Uf as buttonProps,
  av as cardProps,
  Tu as carouselProps,
  uv as cellProps,
  dv as checkboxGroupProps,
  uf as checkboxProps,
  mv as chipProps,
  vv as codeProps,
  hv as colProps,
  Sv as collapseItemProps,
  wv as collapseProps,
  Pv as collapseTransitionProps,
  Ev as countToProps,
  Bv as countdownProps,
  Yv as counterProps,
  Pm as currentMessage,
  Qv as datePickerProps,
  iI as default,
  mn as defaultLazyOptions,
  ig as dialogProps,
  sg as dividerProps,
  cg as dragProps,
  fg as ellipsisProps,
  gg as emptyProps,
  km as enUS,
  $m as faIR,
  bg as fabProps,
  za as fieldDecoratorProps,
  nf as formDetailsProps,
  kg as formProps,
  Ym as hoverOverlayProps,
  dn as iconProps,
  Bf as imageCache,
  Pg as imagePreviewProps,
  Sg as imageProps,
  Eg as indexAnchorProps,
  Mg as indexBarProps,
  bu as inputProps,
  gM as install,
  Ig as linkProps,
  Ng as listProps,
  K4 as loadingBarProps,
  ut as loadingProps,
  pf as menuOptionProps,
  yu as menuProps,
  xr as menuSelectProps,
  Om as merge,
  zm as messages,
  Gg as optionProps,
  Qg as overlayProps,
  xg as paginationProps,
  eh as paperProps,
  th as pickerProps,
  zo as popupProps,
  rh as progressProps,
  ih as pullRefreshProps,
  dh as radioGroupProps,
  sh as radioProps,
  mh as rateProps,
  vh as resultProps,
  Ch as rowProps,
  zh as selectProps,
  Oh as signatureProps,
  Th as skeletonProps,
  Mh as sliderProps,
  Vu as snackbarProps,
  Fh as spaceProps,
  Uh as stepProps,
  Yh as stepsProps,
  Ro as stickyProps,
  Kh as styleProviderProps,
  Xh as switchProps,
  ln as t,
  xh as tabItemProps,
  Zh as tabProps,
  eb as tableProps,
  rb as tabsItemsProps,
  tb as tabsProps,
  ib as tagProps,
  sb as timePickerProps,
  pg as tooltipProps,
  fb as uploaderProps,
  pu as use,
  _n as useHoverOverlay,
  cu as useLocale,
  vM as version,
  gb as watermarkProps,
  su as zhCN,
  Sm as zhHK,
  uu as zhTW
};
