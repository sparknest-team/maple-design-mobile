import { onMounted as ht, nextTick as Ye, onActivated as Rt, computed as O, ref as $, watch as pe, isRef as fb, onBeforeUnmount as ua, onDeactivated as wo, onUnmounted as Qo, getCurrentInstance as Jt, inject as Xs, reactive as en, unref as Tp, provide as Gs, isVNode as vb, defineComponent as ee, h as xo, Comment as Bp, Fragment as Me, createApp as gb, onBeforeMount as hb, createVNode as Z, Teleport as it, Transition as Qe, withDirectives as Ne, vShow as xn, mergeProps as He, openBlock as g, createElementBlock as C, normalizeClass as m, createBlock as we, resolveDynamicComponent as Qt, normalizeStyle as G, resolveComponent as te, resolveDirective as Ge, createCommentVNode as X, createElementVNode as L, toDisplayString as se, withCtx as ue, renderSlot as F, renderList as Ke, useSlots as Mp, createTextVNode as Be, onUpdated as _o, normalizeProps as Yt, guardReactiveProps as ca, createSlots as Kt, withModifiers as Tn, vModelText as bb, withKeys as Uu, TransitionGroup as yb, toRefs as wb } from "vue";
function Zs(e) {
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
const kb = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Zs
}, Symbol.toStringTag, { value: "Module" }));
var Js = Object.defineProperty, $b = Object.defineProperties, Cb = Object.getOwnPropertyDescriptor, Sb = Object.getOwnPropertyDescriptors, zb = Object.getOwnPropertyNames, ju = Object.getOwnPropertySymbols, Ip = Object.prototype.hasOwnProperty, Pb = Object.prototype.propertyIsEnumerable, Hu = (e, n, t) => n in e ? Js(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t, Dp = (e, n) => {
  for (var t in n || (n = {}))
    Ip.call(n, t) && Hu(e, t, n[t]);
  if (ju)
    for (var t of ju(n))
      Pb.call(n, t) && Hu(e, t, n[t]);
  return e;
}, Ap = (e, n) => $b(e, Sb(n)), Np = (e, n) => {
  for (var t in n)
    Js(e, t, { get: n[t], enumerable: !0 });
}, Ob = (e, n, t, o) => {
  if (n && typeof n == "object" || typeof n == "function")
    for (let r of zb(n))
      !Ip.call(e, r) && r !== t && Js(e, r, { get: () => n[r], enumerable: !(o = Cb(n, r)) || o.enumerable });
  return e;
}, Rp = (e, n, t) => (Ob(e, n, "default"), t), Lp = {};
Np(Lp, {
  NOOP: () => f0,
  assert: () => Kp,
  at: () => er,
  baseRound: () => ga,
  call: () => S,
  camelize: () => ma,
  cancelAnimationFrame: () => uo,
  ceil: () => P0,
  chunk: () => Yb,
  clamp: () => $n,
  clampArrayRange: () => Vp,
  classes: () => _s,
  cloneDeep: () => v0,
  cloneDeepWith: () => rm,
  copyText: () => Jp,
  createNamespaceFn: () => nu,
  createStorage: () => fa,
  debounce: () => m0,
  delay: () => Eb,
  difference: () => Xb,
  differenceWith: () => Kr,
  doubleRaf: () => bn,
  download: () => om,
  ensurePrefix: () => o0,
  ensureSuffix: () => r0,
  find: () => qp,
  floor: () => fl,
  genNumberKey: () => Hb,
  genStringKey: () => i0,
  getAllParentScroller: () => xp,
  getGlobalThis: () => nr,
  getParentScroller: () => tu,
  getRect: () => nn,
  getScrollLeft: () => or,
  getScrollTop: () => vt,
  getStyle: () => Zn,
  groupBy: () => Zb,
  hasOwn: () => qt,
  inBrowser: () => et,
  inMobile: () => Ro,
  inViewport: () => ou,
  intersection: () => Gb,
  intersectionWith: () => Gp,
  isArray: () => Fe,
  isArrayBuffer: () => Nr,
  isBlob: () => Vb,
  isBoolean: () => tr,
  isDOMException: () => Vr,
  isDataView: () => Rr,
  isDate: () => Lr,
  isEmpty: () => Wn,
  isEmptyPlainObject: () => Ub,
  isEqual: () => Mb,
  isEqualWith: () => jp,
  isError: () => Hr,
  isFile: () => Lb,
  isFunction: () => vn,
  isMap: () => Fr,
  isNonEmptyArray: () => Ib,
  isNullish: () => Db,
  isNumber: () => zn,
  isNumeric: () => da,
  isObject: () => ft,
  isPlainObject: () => Ln,
  isPrimitive: () => Fb,
  isPromise: () => Ab,
  isRegExp: () => jr,
  isSet: () => Ur,
  isString: () => ln,
  isSymbol: () => Nb,
  isTruthy: () => Rb,
  isTypedArray: () => Yr,
  isWeakMap: () => Hp,
  isWeakSet: () => Yp,
  isWindow: () => pa,
  kebabCase: () => eu,
  localStorage: () => nm,
  lowerFirst: () => l0,
  mapObject: () => n0,
  maxBy: () => y0,
  mean: () => $0,
  meanBy: () => C0,
  merge: () => g0,
  mergeWith: () => am,
  minBy: () => w0,
  mitt: () => Zs,
  motion: () => ru,
  normalizeToArray: () => dt,
  objectToString: () => Up,
  omit: () => _b,
  omitBy: () => e0,
  once: () => p0,
  pascalCase: () => Qp,
  pick: () => Qb,
  pickBy: () => xb,
  prettyJSONObject: () => _p,
  preventDefault: () => Ae,
  promiseWithResolvers: () => t0,
  raf: () => pt,
  randomColor: () => u0,
  randomNumber: () => Fp,
  randomString: () => c0,
  removeArrayBlank: () => Xp,
  removeArrayEmpty: () => qb,
  removeItem: () => Bt,
  requestAnimationFrame: () => Mt,
  round: () => z0,
  sample: () => S0,
  sessionStorage: () => em,
  shuffle: () => Kb,
  slash: () => d0,
  sum: () => lm,
  sumBy: () => sm,
  sumHash: () => k0,
  supportTouch: () => Wp,
  throttle: () => va,
  times: () => Tb,
  toArrayBuffer: () => h0,
  toDataURL: () => im,
  toNumber: () => Y,
  toRawType: () => Xe,
  toText: () => b0,
  toTypeString: () => Qs,
  toggleItem: () => Wb,
  tryParseJSON: () => tm,
  uniq: () => ml,
  uniqBy: () => Wr,
  upperFirst: () => s0,
  xor: () => Jb,
  xorWith: () => Zp
});
function er(e, n) {
  if (e.length)
    return n < 0 && (n += e.length), e[n];
}
function $n(e, n, t) {
  return Math.min(t, Math.max(n, e));
}
function Vp(e, n) {
  return $n(e, 0, n.length - 1);
}
function Eb(e) {
  return new Promise((n) => {
    setTimeout(n, e);
  });
}
function Fp(e = 0, n = 100) {
  return Math.floor(Math.random() * (n - e + 1)) + e;
}
function Tb(e, n) {
  return Array.from({ length: e }, (t, o) => n(o));
}
function et() {
  return typeof window < "u";
}
function nr() {
  return typeof globalThis < "u" ? globalThis : et() ? window : typeof global < "u" ? global : self;
}
var { hasOwnProperty: Bb } = Object.prototype;
function qt(e, n) {
  return Bb.call(e, n);
}
function Ro() {
  return et() && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}
function Fe(e) {
  return Array.isArray(e);
}
var Up = Object.prototype.toString;
function Qs(e) {
  return Up.call(e);
}
function Xe(e) {
  return Qs(e).slice(8, -1);
}
function Nr(e) {
  return Xe(e) === "ArrayBuffer";
}
function tr(e) {
  return typeof e == "boolean";
}
function Rr(e) {
  return Xe(e) === "DataView";
}
function Lr(e) {
  return Xe(e) === "Date";
}
function Vr(e) {
  return Xe(e) === "DOMException";
}
function Wn(e) {
  return e == null || e === "" || Fe(e) && !e.length;
}
function Fr(e) {
  return Xe(e) === "Map";
}
function Ln(e) {
  return Xe(e) === "Object";
}
function Ur(e) {
  return Xe(e) === "Set";
}
function ft(e) {
  return typeof e == "object" && e !== null;
}
function jr(e) {
  return Xe(e) === "RegExp";
}
function Hr(e) {
  return Xe(e) === "Error";
}
function Yr(e) {
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
  ].includes(Xe(e));
}
function jp(e, n, t) {
  const o = /* @__PURE__ */ new WeakMap(), r = /* @__PURE__ */ new WeakMap();
  function a(i, l, s, u) {
    if (t(i, l) === !0 || i === l || i !== i && l !== l)
      return !0;
    if (!ft(i) || !ft(l))
      return i === l;
    if (i.constructor !== l.constructor)
      return !1;
    if (Xe(i) === "String" && Xe(l) === "String" || Xe(i) === "Number" && Xe(l) === "Number" || Xe(i) === "Boolean" && Xe(l) === "Boolean" || Xe(i) === "BigInt" && Xe(l) === "BigInt" || Xe(i) === "Symbol" && Xe(l) === "Symbol")
      return i.valueOf() === l.valueOf();
    if (Lr(i) && Lr(l))
      return i.getTime() === l.getTime();
    if (jr(i) && jr(l))
      return i.source === l.source && i.flags === l.flags;
    if (Hr(i) && Hr(l))
      return i.name === l.name && i.message === l.message && i.cause === l.cause;
    if (Vr(i) && Vr(l))
      return i.name === l.name && i.message === l.message;
    if (Yr(i) && Yr(l) || Rr(i) && Rr(l)) {
      if (i.byteLength !== l.byteLength)
        return !1;
      const d = new Uint8Array(i.buffer), p = new Uint8Array(l.buffer);
      return d.every((f, h) => f === p[h]);
    }
    if (Nr(i) && Nr(l)) {
      if (i.byteLength !== l.byteLength)
        return !1;
      const d = new Uint8Array(i), p = new Uint8Array(l);
      return d.every((f, h) => f === p[h]);
    }
    if (s.get(i) === l && u.get(l) === i)
      return !0;
    if (s.set(i, l), u.set(l, i), Fr(i) && Fr(l) || Ur(i) && Ur(l)) {
      if (i.size !== l.size)
        return !1;
      const d = [...i], p = [...l], f = d.every((h, v) => a(h, p[v], s, u));
      return s.delete(i), u.delete(l), f;
    }
    if (Fe(i) && Fe(l)) {
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
function Mb(e, n) {
  return jp(e, n, () => {
  });
}
function vn(e) {
  return typeof e == "function";
}
function Ib(e) {
  return Fe(e) && !!e.length;
}
function Db(e) {
  return e == null;
}
function zn(e) {
  return typeof e == "number";
}
function ln(e) {
  return typeof e == "string";
}
function da(e) {
  return zn(e) || ln(e) && /^[-+]?\d+$/.test(e);
}
function Ab(e) {
  return ft(e) && vn(e.then) && vn(e.catch);
}
function Nb(e) {
  return typeof e == "symbol";
}
function Rb(e) {
  return !!e;
}
function Hp(e) {
  return Xe(e) === "WeakMap";
}
function Yp(e) {
  return Xe(e) === "WeakSet";
}
function pa(e) {
  return e === window;
}
function Wp() {
  return et() && "ontouchstart" in window;
}
function Lb(e) {
  return Xe(e) === "File";
}
function Vb(e) {
  return Xe(e) === "Blob";
}
function Fb(e) {
  return e == null || typeof e != "object" && typeof e != "function";
}
function Ub(e) {
  return Ln(e) && Object.keys(e).length === 0 && Object.getOwnPropertySymbols(e).length === 0;
}
function Kp(e, n) {
  if (!e)
    throw new Error(n);
}
function Y(e) {
  return e == null ? 0 : ln(e) ? (e = parseFloat(e), e = Number.isNaN(e) ? 0 : e, e) : tr(e) ? Number(e) : e;
}
var jb = 0;
function Hb() {
  return jb++;
}
function Yb(e, n = 1) {
  n = $n(n, 1, e.length);
  const t = [];
  let o = 0;
  for (; o < e.length; )
    t.push(e.slice(o, o + n)), o += n;
  return t;
}
function Bt(e, n) {
  if (e.length) {
    const t = e.indexOf(n);
    if (t > -1)
      return e.splice(t, 1);
  }
}
function Wb(e, n) {
  return e.includes(n) ? Bt(e, n) : e.push(n), e;
}
function ml(e) {
  return [...new Set(e)];
}
function Wr(e, n) {
  return e.reduce((t, o) => (t.findIndex((a) => n(o, a)) === -1 && t.push(o), t), []);
}
function qp(e, n, t = "start") {
  let o = t === "start" ? 0 : e.length - 1;
  for (; e.length > 0 && o >= 0 && o <= e.length - 1; ) {
    if (n(e[o], o, e))
      return [e[o], o];
    t === "start" ? o++ : o--;
  }
  return [null, -1];
}
function Kb(e) {
  for (let n = e.length - 1; n > 0; n--) {
    const t = Math.floor(Math.random() * (n + 1));
    [e[n], e[t]] = [e[t], e[n]];
  }
  return e;
}
function Xp(e) {
  return e.filter((n) => n != null);
}
function qb(e) {
  return e.filter((n) => n != null && n !== "");
}
function dt(e) {
  return Fe(e) ? e : [e];
}
function Kr(e, ...n) {
  const t = er(n, -1), o = n.slice(0, -1).reduce((r, a) => [...r, ...a], []);
  return e.filter((r) => !o.some((a) => t(r, a)));
}
function Xb(e, ...n) {
  return Kr(e, ...n, (t, o) => t === o);
}
function Gp(...e) {
  const n = er(e, -1), t = e.slice(0, -1);
  if (t.length === 0)
    return [];
  if (t.length === 1)
    return Wr(t[0], n);
  function o(r, a) {
    return r.filter((i) => a.some((l) => n(i, l)));
  }
  return Wr(
    t.reduce((r, a) => o(r, a)),
    n
  );
}
function Gb(...e) {
  return Gp(...e, (n, t) => n === t);
}
function Zb(e, n) {
  return e.reduce(
    (t, o) => {
      var r;
      const a = n(o);
      return ((r = t[a]) != null ? r : t[a] = []).push(o), t;
    },
    {}
  );
}
function Zp(...e) {
  const n = er(e, -1), t = e.slice(0, -1);
  return Wr(
    t.reduce((o, r) => [...Kr(o, r, n), ...Kr(r, o, n)]),
    n
  );
}
function Jb(...e) {
  return Zp(...e, (n, t) => n === t);
}
function Qb(e, n) {
  return n.reduce(
    (t, o) => (t[o] = e[o], t),
    {}
  );
}
function xb(e, n) {
  return [...Object.keys(e), ...Object.getOwnPropertySymbols(e)].reduce((o, r) => {
    const a = e[r];
    return n(a, r) && (o[r] = a), o;
  }, {});
}
function _b(e, n) {
  return [...Object.keys(e), ...Object.getOwnPropertySymbols(e)].reduce(
    (o, r) => (n.includes(r) || (o[r] = e[r]), o),
    {}
  );
}
function e0(e, n) {
  return [...Object.keys(e), ...Object.getOwnPropertySymbols(e)].reduce((o, r) => {
    const a = e[r];
    return n(a, r) || (o[r] = a), o;
  }, {});
}
function n0(e, n) {
  return Object.entries(e).reduce(
    (t, [o, r]) => {
      const a = n(o, r);
      if (Fe(a)) {
        const [i, l] = a;
        t[i] = l;
      }
      return t;
    },
    {}
  );
}
function t0() {
  let e, n;
  return { promise: new Promise((o, r) => {
    e = o, n = r;
  }), resolve: e, reject: n };
}
var xs = {};
Np(xs, {
  cancelAnimationFrame: () => uo,
  classes: () => _s,
  copyText: () => Jp,
  createNamespaceFn: () => nu,
  createStorage: () => fa,
  doubleRaf: () => bn,
  download: () => om,
  getAllParentScroller: () => xp,
  getParentScroller: () => tu,
  getRect: () => nn,
  getScrollLeft: () => or,
  getScrollTop: () => vt,
  getStyle: () => Zn,
  inViewport: () => ou,
  localStorage: () => nm,
  mitt: () => Zs,
  motion: () => ru,
  prettyJSONObject: () => _p,
  preventDefault: () => Ae,
  raf: () => pt,
  requestAnimationFrame: () => Mt,
  sessionStorage: () => em,
  tryParseJSON: () => tm
});
function uo(e) {
  const n = nr();
  n.cancelAnimationFrame ? n.cancelAnimationFrame(e) : n.clearTimeout(e);
}
function _s(...e) {
  return e.map((n) => {
    if (Fe(n)) {
      const [t, o, r = null] = n;
      return t ? o : r;
    }
    return n;
  });
}
function Jp(e) {
  if (!e)
    return;
  const n = document.createElement("textarea");
  n.value = e, n.style.position = "fixed", n.style.opacity = "0", document.body.appendChild(n), n.select(), document.execCommand("copy"), document.body.removeChild(n);
}
function ma(e) {
  return e = e.replace(/-(\w)/g, (n, t) => t.toUpperCase()), e.replace(e.charAt(0), e.charAt(0).toLowerCase());
}
function o0(e, n) {
  return e.startsWith(n) ? e : n + e;
}
function r0(e, n) {
  return e.endsWith(n) ? e : e + n;
}
var a0 = 0;
function i0() {
  return `generated-key-${a0++}`;
}
function eu(e) {
  return e.replace(/([A-Z])/g, " $1").trim().split(" ").join("-").toLowerCase();
}
function Qp(e) {
  return ma(e).replace(e.charAt(0), e.charAt(0).toUpperCase());
}
function l0(e) {
  return e.charAt(0).toLowerCase() + e.slice(1);
}
function s0(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function u0() {
  const e = "0123456789abcdef";
  let n = "#";
  for (let t = 0; t < 6; t++)
    n += e[Math.floor(Math.random() * 16)];
  return n;
}
function c0(e = 10) {
  let n = t();
  for (; n.length < e; )
    n += t();
  function t() {
    return Math.random().toString(36).slice(2);
  }
  return n.slice(0, e);
}
function d0(e) {
  return e.startsWith("\\\\?\\") ? e : e.replace(/\\/g, "/");
}
function nu(e) {
  return (n) => {
    const t = `${e}-${n}`, o = (r) => r ? r[0] === "$" ? r.replace("$", e) : r.startsWith("--") ? `${t}${r}` : `${t}__${r}` : t;
    return {
      name: Qp(t),
      n: o,
      classes: _s
    };
  };
}
function Mt(e) {
  const n = nr();
  return n.requestAnimationFrame ? n.requestAnimationFrame(e) : n.setTimeout(e);
}
function bn() {
  return new Promise((e) => {
    Mt(() => {
      Mt(e);
    });
  });
}
function Zn(e) {
  return window.getComputedStyle(e);
}
function tu(e) {
  let n = e;
  for (; n && !(!n.parentNode || (n = n.parentNode, n === document.body || n === document.documentElement)); ) {
    const t = /(scroll|auto)/, { overflowY: o, overflow: r } = Zn(n);
    if (t.test(o) || t.test(r))
      return n;
  }
  return window;
}
function xp(e) {
  const n = [];
  let t = e;
  for (; !pa(t); )
    t = tu(t), n.push(t);
  return n;
}
function nn(e) {
  if (pa(e)) {
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
    return Ap(Dp({}, o), {
      toJSON: () => o
    });
  }
  return e.getBoundingClientRect();
}
function or(e) {
  const n = "scrollLeft" in e ? e.scrollLeft : e.scrollX;
  return Math.max(n, 0);
}
function vt(e) {
  const n = "scrollTop" in e ? e.scrollTop : e.scrollY;
  return Math.max(n, 0);
}
function ou(e) {
  const { top: n, bottom: t, left: o, right: r } = nn(e), { width: a, height: i } = nn(window), l = o <= a && r >= 0, s = n <= i && t >= 0;
  return l && s;
}
function _p(e) {
  return JSON.stringify(e, null, 2);
}
function Ae(e) {
  e.cancelable !== !1 && e.preventDefault();
}
function pt() {
  return new Promise((e) => {
    Mt(e);
  });
}
function fa(e) {
  return Ap(Dp({}, e), {
    set(n, t) {
      t != null && (ln(t) || (t = JSON.stringify(t)), e.setItem(n, t));
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
var em = fa(nr().sessionStorage), nm = fa(nr().localStorage);
function tm(e) {
  try {
    return JSON.parse(e);
  } catch {
    return;
  }
}
function om(e, n = "file") {
  const t = document.createElement("a");
  t.style.display = "none", t.href = ln(e) ? e : URL.createObjectURL(e), t.download = n, document.body.appendChild(t), t.click(), URL.revokeObjectURL(t.href), document.body.removeChild(t);
}
function ru(e) {
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
    k("running");
    const b = performance.now();
    d = d ?? b, f += p != null ? b - p : 0, p = void 0, z();
    function z() {
      c = Mt(() => {
        const P = performance.now() - d - f, M = $n(P / o, 0, 1);
        if (s = u * a(M) + n, M >= 1) {
          k("finished"), r({ value: t, done: !0 });
          return;
        }
        r({ value: s, done: !1 }), z();
      });
    }
  }
  function v() {
    l === "running" && (uo(c), k("paused"), p = performance.now());
  }
  function y() {
    uo(c), k("pending"), s = n, c = void 0, d = void 0, p = void 0, f = 0;
  }
  function w() {
    return l;
  }
  function k(b) {
    l = b, i(b);
  }
  return {
    start: h,
    pause: v,
    reset: y,
    getState: w
  };
}
Rp(xs, kb);
Rp(Lp, xs);
function S(e, ...n) {
  if (Fe(e))
    return e.map((t) => t(...n));
  if (e)
    return e(...n);
}
function p0(e) {
  let n = !1, t;
  return function(...o) {
    return n || (n = !0, t = e.apply(this, o)), t;
  };
}
function m0(e, n = 0) {
  let t;
  return function(...o) {
    t && clearTimeout(t), t = setTimeout(() => {
      e.apply(this, o);
    }, n);
  };
}
function va(e, n = 200) {
  let t, o = 0;
  return function r(...a) {
    const i = performance.now(), l = i - o;
    o || (o = i), t && clearTimeout(t), l >= n ? (e.apply(this, a), o = i) : t = setTimeout(() => {
      r.apply(this, a);
    }, n - l);
  };
}
function f0() {
}
function rm(e, n) {
  const t = /* @__PURE__ */ new WeakMap();
  function o(i, l) {
    const s = n(i);
    if (s !== void 0)
      return s;
    if (!ft(i))
      return i;
    if (l.has(i))
      return l.get(i);
    if (Lr(i))
      return new Date(i);
    if (jr(i))
      return new RegExp(i);
    if (Fr(i)) {
      const u = /* @__PURE__ */ new Map();
      return l.set(i, u), i.forEach((c, d) => {
        u.set(o(d, l), o(c, l));
      }), u;
    }
    if (Ur(i)) {
      const u = /* @__PURE__ */ new Set();
      return l.set(i, u), i.forEach((c) => {
        u.add(o(c, l));
      }), u;
    }
    if (Xe(i) === "String" || Xe(i) === "Number" || Xe(i) === "Boolean")
      return a(i, i.valueOf());
    if (Hp(i) || Yp(i) || Hr(i) || Vr(i))
      return {};
    if (Yr(i))
      return a(i, r(i.buffer), i.byteOffset, i.length);
    if (Rr(i))
      return a(i, r(i.buffer), i.byteOffset, i.byteLength);
    if (Nr(i))
      return r(i);
    if (Fe(i)) {
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
function v0(e) {
  return rm(e, () => {
  });
}
function am(e, ...n) {
  const t = er(n, -1), o = [e, ...n.slice(0, -1)];
  let r = o.length - 1, a = o[r];
  for (; r; )
    a = i(o[r - 1], a, t), r--;
  function i(l, s, u) {
    function c(d, p) {
      for (const f in p)
        if (qt(p, f)) {
          const h = p[f], v = d[f], y = u(v, h, f, l, s);
          y !== void 0 ? d[f] = y : ft(h) ? ft(v) ? d[f] = c(v, h) : d[f] = c(Fe(h) ? [] : {}, h) : d[f] = h;
        }
      return d;
    }
    return c(l, s);
  }
  return a;
}
function g0(e, ...n) {
  return am(e, ...n, () => {
  });
}
function h0(e) {
  return new Promise((n) => {
    const t = new FileReader();
    t.onload = () => {
      n(t.result);
    }, t.readAsArrayBuffer(e);
  });
}
function im(e) {
  return new Promise((n) => {
    const t = new FileReader();
    t.onload = () => {
      n(t.result);
    }, t.readAsDataURL(e);
  });
}
function b0(e) {
  return new Promise((n) => {
    const t = new FileReader();
    t.onload = () => {
      n(t.result);
    }, t.readAsText(e);
  });
}
function y0(e, n) {
  if (e.length)
    return e.reduce((t, o) => n(t) > n(o) ? t : o, e[0]);
}
function w0(e, n) {
  if (e.length)
    return e.reduce((t, o) => n(t) < n(o) ? t : o, e[0]);
}
function lm(e) {
  return e.reduce((n, t) => n + t, 0);
}
function sm(e, n) {
  return e.reduce((t, o) => t + n(o), 0);
}
function k0(e) {
  function n(o, r) {
    for (let a = 0; a < r.length; a++) {
      const i = r.charCodeAt(a);
      o = (o << 5) - o + i, o |= 0;
    }
    return o < 0 ? o * -2 : o;
  }
  function t(o, r, a, i) {
    return o = n(o, a), o = n(o, Qs(r)), o = n(o, typeof r), r === null ? n(o, "null") : r === void 0 ? n(o, "undefined") : ft(r) || vn(r) ? i.includes(r) ? n(o, `[Circular]${a}`) : (i.push(r), o = Object.keys(r).sort().reduce((l, s) => t(l, r[s], s, i), o), vn(r.valueOf) ? n(o, String(r.valueOf())) : o) : n(o, r.toString());
  }
  return t(0, e, "", []).toString(16).padStart(8, "0");
}
function $0(e) {
  return lm(e) / e.length;
}
function C0(e, n) {
  return sm(e, n) / e.length;
}
function S0(e) {
  if (e.length)
    return e[Fp(0, e.length - 1)];
}
function z0(e, n = 0) {
  return ga(e, n, Math.round);
}
function ga(e, n = 0, t) {
  return n = $n(n, -292, 292), n ? +`${t(`${e}e${n}`)}e${-n}` : t(e);
}
function fl(e, n = 0) {
  return ga(e, n, Math.floor);
}
function P0(e, n = 0) {
  return ga(e, n, Math.ceil);
}
function Xn(e, n, t) {
  return Kp(e, `Maple [${n}]: ${t}`);
}
function O0(e, n) {
  console.warn(`Maple [${e}]: ${n}`);
}
function lo(e, n) {
  console.error(`Maple [${e}]: ${n}`);
}
var E0 = (e) => e ? /^(http)|(\.*\/)/.test(e) : !1, T0 = Object.defineProperty, qr = Object.getOwnPropertySymbols, um = Object.prototype.hasOwnProperty, cm = Object.prototype.propertyIsEnumerable, Yu = (e, n, t) => n in e ? T0(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t, B0 = (e, n) => {
  for (var t in n || (n = {}))
    um.call(n, t) && Yu(e, t, n[t]);
  if (qr)
    for (var t of qr(n))
      cm.call(n, t) && Yu(e, t, n[t]);
  return e;
}, M0 = (e, n) => {
  var t = {};
  for (var o in e)
    um.call(e, o) && n.indexOf(o) < 0 && (t[o] = e[o]);
  if (e != null && qr)
    for (var o of qr(e))
      n.indexOf(o) < 0 && cm.call(e, o) && (t[o] = e[o]);
  return t;
};
function yn(e) {
  let n = !1;
  ht(() => {
    e(), Ye(() => {
      n = !0;
    });
  }), Rt(() => {
    n && e();
  });
}
function je(e, n, t, o = {}) {
  if (!et())
    return;
  const { passive: r = !1, capture: a = !1 } = o;
  let i = !1, l = !1;
  const s = (f) => vn(f) ? f() : Tp(f), u = (f) => {
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
  fb(e) && (d = pe(
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
  }), ua(() => {
    c(e);
  }), wo(() => {
    c(e);
  }), p;
}
function dm(e, n, t) {
  if (!et())
    return;
  je(document, n, (r) => {
    const a = vn(e) ? e() : Tp(e);
    a && !a.contains(r.target) && t(r);
  });
}
function rr(e) {
  let n = !1;
  wo(() => {
    n = !0, e();
  }), Qo(() => {
    n || e();
  });
}
function au(e) {
  const n = Jt();
  return e in n.provides;
}
function wn(e) {
  if (!au(e))
    return {
      index: null,
      parentProvider: null,
      bindParent: null
    };
  const t = Xs(e), { childInstances: o, collect: r, clear: a } = t, i = M0(t, ["childInstances", "collect", "clear"]), l = Jt();
  return {
    index: O(() => o.indexOf(l)),
    parentProvider: i,
    bindParent: (c) => {
      ht(() => {
        Ye().then(() => {
          r(l, c);
        });
      }), ua(() => {
        Ye().then(() => {
          a(l, c);
        });
      });
    }
  };
}
function I0(e) {
  const n = [], t = (o) => {
    if (o != null && o.component) {
      t(o == null ? void 0 : o.component.subTree);
      return;
    }
    Fe(o == null ? void 0 : o.children) && o.children.forEach((r) => {
      vb(r) && (n.push(r), t(r));
    });
  };
  return t(e), n;
}
function kn(e) {
  const n = Jt(), t = en([]), o = [], r = O(() => t.length), a = () => {
    const u = I0(n.subTree);
    t.sort((c, d) => u.indexOf(c.vnode) - u.indexOf(d.vnode));
  }, i = (u, c) => {
    t.push(u), o.push(c), a();
  }, l = (u, c) => {
    Bt(t, u), Bt(o, c);
  };
  return {
    length: r,
    childProviders: o,
    bindChildren: (u) => {
      Gs(e, B0({
        childInstances: t,
        collect: i,
        clear: l
      }, u));
    }
  };
}
function nt(e) {
  je(() => window, "resize", e, { passive: !0 }), je(() => window, "orientationchange", e, { passive: !0 });
}
function D0(e, n) {
  const t = $(!1);
  return pe(
    e,
    (o) => {
      n === o && (t.value = !0);
    },
    { immediate: !0 }
  ), t;
}
function A0(e, n) {
  if (e > n)
    return "horizontal";
  if (n > e)
    return "vertical";
}
function ko() {
  const e = $(0), n = $(0), t = $(0), o = $(0), r = $(0), a = $(0), i = $(0), l = $(0), s = $(0), u = $(0), c = $(), d = $(!1), p = $(!1), f = $(0), h = $(0);
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
      const { clientX: M, clientY: D } = P.touches[0];
      e.value = M, n.value = D, i.value = M, l.value = D, d.value = !0, f.value = performance.now(), p.value = !1, v && window.cancelAnimationFrame(v);
    },
    moveTouch: (P) => {
      const { clientX: M, clientY: D } = P.touches[0];
      p.value = !0, t.value = M - e.value, o.value = D - n.value, r.value = Math.abs(t.value), a.value = Math.abs(o.value), h.value = Math.sqrt(r.value ** 2 + a.value ** 2), s.value = M - i.value, u.value = D - l.value, c.value || (c.value = A0(r.value, a.value)), i.value = M, l.value = D;
    },
    endTouch: () => {
      d.value = !1, v = window.requestAnimationFrame(() => {
        p.value = !1;
      });
    },
    isReachTop: (P) => vt(P) === 0 && o.value > 0,
    isReachBottom: (P, M = 1) => {
      const { scrollHeight: D, clientHeight: U, scrollTop: V } = P, W = Math.abs(D - V - U);
      return o.value < 0 && W <= M;
    }
  };
}
function pm() {
  const e = Jt(), n = eu(e.type.name), t = $(void 0);
  return ht(() => {
    t.value = `${n}-${e.uid}`;
  }), t;
}
function N0(e = {}) {
  const { initialWidth: n = 0, initialHeight: t = 0 } = e, o = $(n), r = $(t), a = () => {
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
  const u = $(s());
  let c = !0;
  return pe(
    () => e[n],
    () => {
      c = !1, u.value = s(), Ye(() => {
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
function R0(e) {
  const n = $(r(e.from)), t = $("pending");
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
    return ru({
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
var L0 = Object.defineProperty, V0 = Object.defineProperties, F0 = Object.getOwnPropertyDescriptors, Wu = Object.getOwnPropertySymbols, U0 = Object.prototype.hasOwnProperty, j0 = Object.prototype.propertyIsEnumerable, Ku = (e, n, t) => n in e ? L0(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t, vl = (e, n) => {
  for (var t in n || (n = {}))
    U0.call(n, t) && Ku(e, t, n[t]);
  if (Wu)
    for (var t of Wu(n))
      j0.call(n, t) && Ku(e, t, n[t]);
  return e;
}, H0 = (e, n) => V0(e, F0(n)), qu = (e, n, t) => new Promise((o, r) => {
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
function De(e, n) {
  return Fe(n) ? n.reduce((t, o) => (t[o] = e[o], t), {}) : e[n];
}
function re(e, n) {
  const t = n ?? e;
  return t.install = function(o) {
    const { name: r } = e;
    r && o.component(r, e);
  }, t;
}
function ie(e, n) {
  e.setPropsDefaults = function(t) {
    Object.entries(t).forEach(([o, r]) => {
      const a = n[o];
      if (a != null) {
        if (Ln(a)) {
          n[o] = H0(vl({}, a), {
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
function Y0(e) {
  const n = gb(e), t = document.createElement("div");
  return document.body.appendChild(t), {
    instance: n.mount(t),
    unmount() {
      n.unmount(), t.parentNode && document.body.removeChild(t);
    }
  };
}
function $o(e, n = {}, t = {}) {
  const o = {
    setup() {
      return () => xo(e, vl(vl({}, n), t));
    }
  }, { unmount: r } = Y0(o);
  return { unmountInstance: r };
}
function mm(e) {
  const n = [];
  return e.forEach((t) => {
    if (t.type !== Bp) {
      if (t.type === Me && Fe(t.children)) {
        t.children.forEach((o) => {
          n.push(o);
        });
        return;
      }
      n.push(t);
    }
  }), n;
}
function Xu(e) {
  return Ln(e) && vn(e.safeParseAsync);
}
function W0(e) {
  return Ln(e) && qt(e, "success");
}
function Un() {
  const e = $(""), n = (r, a, i) => qu(this, null, function* () {
    const l = dt(r).filter((u) => Xu(u) || vn(u)), s = yield Promise.all(
      l.map((u) => Xu(u) ? u.safeParseAsync(a) : u(a, i))
    );
    return t(), !s.some((u) => {
      if (W0(u)) {
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
    validateWithTrigger: (r, a, i, l, s) => qu(this, null, function* () {
      r.includes(a) && (yield n(i, l, s)) && (e.value = "");
    })
  };
}
function K0(e) {
  je(() => window, "hashchange", e), je(() => window, "popstate", e);
}
function xt() {
  const e = $(!1);
  return Rt(() => {
    e.value = !1;
  }), wo(() => {
    e.value = !0;
  }), {
    disabled: e
  };
}
const x = nu("mp");
function R(e) {
  return {
    type: [Function, Array],
    default: e
  };
}
function dn(e, n) {
  return e === !1 ? null : (e === !0 && n && (e = n), `mp-elevation--${e}`);
}
const ar = ee({
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
    return () => ln(e.is) ? xo(e.tag, e.is) : e.is;
  }
});
var fm = {
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
}, vm = {
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
}, gm = {
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
}, iu = {
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
}, lu = {
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
}, hm = lu, q0 = Object.defineProperty, Gu = Object.getOwnPropertySymbols, X0 = Object.prototype.hasOwnProperty, G0 = Object.prototype.propertyIsEnumerable, Zu = (e, n, t) => n in e ? q0(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t, Ju = (e, n) => {
  for (var t in n || (n = {}))
    X0.call(n, t) && Zu(e, t, n[t]);
  if (Gu)
    for (var t of Gu(n))
      G0.call(n, t) && Zu(e, t, n[t]);
  return e;
};
function su() {
  const e = $({}), n = $({}), t = (i, l) => {
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
      e.value[i] = Ju(Ju({}, e.value[i]), l), o(i);
    },
    t: (i) => {
      if (qt(n.value, i))
        return n.value[i];
    }
  };
}
const { messages: bm, currentMessage: ym, add: uu, use: cu, merge: wm, t: rn } = su();
uu("zh-CN", iu);
cu("zh-CN");
const dM = {
  zhCN: iu,
  enUS: fm,
  zhTW: lu,
  zhHK: hm,
  faIR: vm,
  jaJP: gm,
  messages: bm,
  currentMessage: ym,
  add: uu,
  use: cu,
  merge: wm,
  t: rn,
  useLocale: su
};
var gl = {
  zhCN: iu,
  enUS: fm,
  zhTW: lu,
  zhHK: hm,
  faIR: vm,
  jaJP: gm,
  messages: bm,
  currentMessage: ym,
  add: uu,
  use: cu,
  merge: wm,
  t: rn,
  useLocale: su
};
const hl = Symbol("LOCALE_PROVIDER_KEY");
function Z0(e) {
  Gs(hl, e);
}
function lt() {
  return au(hl) ? Xs(hl) : { t: null };
}
const km = {
  locks: {},
  zIndex: 2e3,
  enableRipple: !0
}, pM = en(km);
var Rn = en(km);
const { n: Qu } = x("");
function $m() {
  Object.keys(Rn.locks).length <= 0 ? document.body.classList.remove(Qu("$--lock")) : document.body.classList.add(Qu("$--lock"));
}
function vr(e) {
  Rn.locks[e] = 1, $m();
}
function gr(e) {
  delete Rn.locks[e], $m();
}
function ir(e, n) {
  const { uid: t } = Jt();
  n && pe(n, (o) => {
    o === !1 ? gr(t) : o === !0 && e() === !0 && vr(t);
  }), pe(e, (o) => {
    n && n() === !1 || (o === !0 ? vr(t) : gr(t));
  }), hb(() => {
    n && n() === !1 || e() === !0 && vr(t);
  }), Qo(() => {
    n && n() === !1 || e() === !0 && gr(t);
  }), Rt(() => {
    n && n() === !1 || e() === !0 && vr(t);
  }), wo(() => {
    n && n() === !1 || e() === !0 && gr(t);
  });
}
const bt = [];
function du(e, n) {
  const { uid: t } = Jt();
  pe(e, (i) => {
    i && !a(t) ? r() : setTimeout(() => {
      Bt(bt, a(t));
    });
  }), yn(() => {
    e() && r();
  }), rr(() => {
    Bt(bt, a(t));
  });
  function o() {
    return bt.length === 0 ? !0 : (bt.sort((i, l) => i.zIndex.value - l.zIndex.value), bt[bt.length - 1].uid === t);
  }
  function r() {
    a(t) || bt.push({ uid: t, zIndex: n });
  }
  function a(i) {
    return bt.find((l) => l.uid === i);
  }
  return {
    onStackTop: o
  };
}
function lr(e, n) {
  const t = $(Rn.zIndex);
  return pe(
    e,
    (o) => {
      o && (Rn.zIndex += n, t.value = Rn.zIndex);
    },
    { immediate: !0 }
  ), { zIndex: t };
}
const Co = {
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
}, Cm = Symbol("POPUP_BIND_POPUP_ITEM_KEY");
function Sm() {
  const { bindParent: e, parentProvider: n, index: t } = wn(Cm);
  return {
    index: t,
    popup: n,
    bindPopup: e
  };
}
function J0() {
  const { bindChildren: e, childProviders: n, length: t } = kn(Cm);
  return {
    length: t,
    popupItems: n,
    bindPopupItems: e
  };
}
var Q0 = Object.defineProperty, xu = Object.getOwnPropertySymbols, x0 = Object.prototype.hasOwnProperty, _0 = Object.prototype.propertyIsEnumerable, _u = (e, n, t) => n in e ? Q0(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t, ey = (e, n) => {
  for (var t in n || (n = {}))
    x0.call(n, t) && _u(e, t, n[t]);
  if (xu)
    for (var t of xu(n))
      _0.call(n, t) && _u(e, t, n[t]);
  return e;
};
const {
  name: ny,
  n: Hn,
  classes: ol
} = x("popup");
var ha = ee({
  name: ny,
  inheritAttrs: !1,
  props: Co,
  setup(e, {
    slots: n,
    attrs: t
  }) {
    const o = D0(() => e.show, !0), {
      zIndex: r
    } = lr(() => e.show, 3), a = O(() => {
      var h;
      return (h = e.zIndex) != null ? h : r.value;
    }), {
      onStackTop: i
    } = du(() => e.show, a), {
      disabled: l
    } = xt(), {
      bindPopupItems: s
    } = J0();
    ir(() => e.show, () => e.lockScroll), pe(() => e.show, (h) => {
      S(h ? e.onOpen : e.onClose);
    }), s({
      show: O(() => e.show)
    }), je(() => window, "keydown", f), K0(() => S(e.onRouteChange));
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
        class: ol(Hn("overlay"), h),
        style: ey({
          zIndex: a.value - 1
        }, v),
        onClick: u
      }, null);
    }
    function d() {
      return Ne(Z("div", He({
        class: ol(Hn("content"), Hn(`--${e.position}`), [e.defaultStyle, Hn("--content-background-color")], [e.defaultStyle, Hn("$-elevation--3")], [e.safeArea, Hn("--safe-area")], [e.safeAreaTop, Hn("--safe-area-top")]),
        style: {
          zIndex: a.value
        },
        role: "dialog",
        "aria-modal": "true"
      }, t), [o.value && S(n.default)]), [[xn, e.show]]);
    }
    function p() {
      return Z(Qe, {
        name: Hn("$-fade"),
        onAfterEnter: e.onOpened,
        onAfterLeave: e.onClosed
      }, {
        default: () => [Ne(Z("div", {
          class: ol(Hn("$--box"), Hn(), [!e.overlay, Hn("--pointer-events-none")]),
          style: {
            zIndex: a.value - 2
          }
        }, [e.overlay && c(), Z(Qe, {
          name: e.transition || Hn(`$-pop-${e.position}`)
        }, {
          default: () => [d()]
        })]), [[xn, e.show]])]
      });
    }
    function f(h) {
      !i() || h.key !== "Escape" || !e.show || (S(e.onKeyEscape), e.closeOnKeyEscape && (Ae(h), S(e["onUpdate:show"], !1)));
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
re(ha);
ie(ha, Co);
const mM = ha;
var It = ha, ty = Object.defineProperty, oy = Object.defineProperties, ry = Object.getOwnPropertyDescriptors, ec = Object.getOwnPropertySymbols, ay = Object.prototype.hasOwnProperty, iy = Object.prototype.propertyIsEnumerable, nc = (e, n, t) => n in e ? ty(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t, zm = (e, n) => {
  for (var t in n || (n = {}))
    ay.call(n, t) && nc(e, t, n[t]);
  if (ec)
    for (var t of ec(n))
      iy.call(n, t) && nc(e, t, n[t]);
  return e;
}, ly = (e, n) => oy(e, ry(n));
const { n: Pm } = x("ripple"), tc = 250;
function sy(e) {
  const { zIndex: n, position: t } = Zn(e);
  e.style.overflow = "hidden", e.style.overflowX = "hidden", e.style.overflowY = "hidden", t === "static" && (e.style.position = "relative"), n === "auto" && (e.style.zIndex = "1");
}
function oc(e) {
  return "touches" in e;
}
function uy(e, n) {
  const { top: t, left: o } = nn(e), { clientWidth: r, clientHeight: a } = e, i = Math.sqrt(r ** 2 + a ** 2) / 2, l = i * 2, s = oc(n) ? n.touches[0].clientX - o : r / 2, u = oc(n) ? n.touches[0].clientY - t : a / 2, c = (r - i * 2) / 2, d = (a - i * 2) / 2, p = s - i, f = u - i;
  return { x: p, y: f, centerX: c, centerY: d, size: l };
}
function pu(e) {
  const n = this._ripple;
  if (n.removeRipple(), n.disabled || n.tasker || !Rn.enableRipple)
    return;
  const t = () => {
    n.tasker = null;
    const { x: o, y: r, centerX: a, centerY: i, size: l } = uy(this, e), s = document.createElement("div");
    s.classList.add(Pm()), s.style.opacity = "0", s.style.transform = `translate(${o}px, ${r}px) scale3d(.3, .3, .3)`, s.style.width = `${l}px`, s.style.height = `${l}px`, n.color && (s.style.backgroundColor = n.color), s.dataset.createdAt = String(performance.now()), sy(this), this.appendChild(s), window.setTimeout(() => {
      s.style.transform = `translate(${a}px, ${i}px) scale3d(1, 1, 1)`, s.style.opacity = ".25";
    }, 20);
  };
  n.tasker = window.setTimeout(t, 30);
}
function Xr() {
  const e = this._ripple, n = () => {
    const t = this.querySelectorAll(`.${Pm()}`);
    if (!t.length)
      return;
    const o = t[t.length - 1], r = tc - performance.now() + Number(o.dataset.createdAt);
    window.setTimeout(() => {
      o.style.opacity = "0", window.setTimeout(() => {
        var a;
        return (a = o.parentNode) == null ? void 0 : a.removeChild(o);
      }, tc);
    }, r);
  };
  e.tasker ? window.setTimeout(n, 30) : n();
}
function Om() {
  if (!Wp() || !Rn.enableRipple)
    return;
  const e = this._ripple;
  e.tasker && window.clearTimeout(e.tasker), e.tasker = null;
}
let Gr = !1;
function cy(e) {
  Gr || !(e.key === " " || e.key === "Enter") || (pu.call(this, e), Gr = !0);
}
function rc() {
  Gr && (Xr.call(this), Gr = !1);
}
function dy(e, n) {
  var t;
  e._ripple = ly(zm({
    tasker: null
  }, (t = n.value) != null ? t : {}), {
    removeRipple: Xr.bind(e)
  }), e.addEventListener("touchstart", pu, { passive: !0 }), e.addEventListener("touchmove", Om, { passive: !0 }), e.addEventListener("dragstart", Xr, { passive: !0 }), e.addEventListener("keydown", cy), e.addEventListener("keyup", rc), e.addEventListener("blur", rc), document.addEventListener("touchend", e._ripple.removeRipple, { passive: !0 }), document.addEventListener("touchcancel", e._ripple.removeRipple, { passive: !0 }), document.addEventListener("dragend", e._ripple.removeRipple, { passive: !0 });
}
function py(e) {
  e.removeEventListener("touchstart", pu), e.removeEventListener("touchmove", Om), e.removeEventListener("dragstart", Xr), !(!e._ripple || !e._ripple.removeRipple) && (document.removeEventListener("touchend", e._ripple.removeRipple), document.removeEventListener("touchcancel", e._ripple.removeRipple), document.removeEventListener("dragend", e._ripple.removeRipple));
}
function my(e, n) {
  var t, o, r, a, i, l;
  const s = {
    color: (t = n.value) == null ? void 0 : t.color,
    disabled: (o = n.value) == null ? void 0 : o.disabled
  };
  (s.color !== ((r = e._ripple) == null ? void 0 : r.color) || s.disabled !== ((a = e._ripple) == null ? void 0 : a.disabled)) && (e._ripple = zm({
    tasker: s.disabled ? null : (i = e._ripple) == null ? void 0 : i.tasker,
    removeRipple: (l = e._ripple) == null ? void 0 : l.removeRipple
  }, s));
}
const Em = {
  mounted: dy,
  unmounted: py,
  updated: my,
  install(e) {
    e.directive("ripple", this);
  }
}, fM = Em;
var on = Em;
function Tm(e) {
  return e ? !!(e === "desktop" && Ro() || e === "mobile" && !Ro()) : !1;
}
function fy(e) {
  const n = e.getAttribute("style");
  return n ? n.split(";").filter(Boolean).reduce(
    (t, o) => {
      const [r, a] = o.split(":").map((i) => i.trim());
      return t[ma(r)] = a, t;
    },
    {}
  ) : {};
}
function vy(e) {
  const { value: n } = e._hover, t = fy(e);
  Object.keys(n).forEach((o) => {
    const r = ma(o);
    n[r] != null && t[r] && (e._hover.rawStyle[r] = t[r]);
  });
}
function mu(e, n) {
  Object.keys(n).forEach((t) => {
    const o = n[t];
    o != null && (e.style[t] = o);
  });
}
function gy(e) {
  Object.keys(e._hover.value).forEach((n) => {
    e._hover.value[n] != null && (e.style[n] = "");
  });
}
function Bm(e) {
  (e == null ? void 0 : e._hover) != null && (gy(e), mu(e, e._hover.rawStyle));
}
function Mm() {
  const { value: e } = this._hover;
  if (this._hover.hovering = !0, vn(e)) {
    e(this._hover.hovering);
    return;
  }
  mu(this, e);
}
function Im() {
  if (this._hover.hovering = !1, vn(this._hover.value)) {
    this._hover.value(this._hover.hovering);
    return;
  }
  Bm(this);
}
function Dm(e, n) {
  var t, o;
  const { arg: r, value: a } = n;
  Tm(r) || (e._hover = {
    value: a,
    hovering: (o = (t = e._hover) == null ? void 0 : t.hovering) != null ? o : !1,
    rawStyle: {}
  }, vy(e), e.addEventListener("mouseenter", Mm), e.addEventListener("mouseleave", Im));
}
function Am(e, n) {
  Tm(n.arg) || (Bm(e), e.removeEventListener("mouseenter", Mm), e.removeEventListener("mouseleave", Im));
}
function hy(e, n) {
  e._hover && Am(e, n);
}
function by(e, n) {
  return !vn(n.value) && e._hover.hovering;
}
function yy(e, n) {
  Dm(e, n), by(e, n) && mu(e, n.value);
}
const Nm = {
  mounted: Dm,
  unmounted: Am,
  beforeUpdate: hy,
  updated: yy,
  install(e) {
    e.directive("hover", this);
  }
}, vM = Nm;
var Dn = Nm;
const Rm = {
  hovering: Boolean,
  focusing: Boolean
}, { name: wy, n: ky, classes: $y } = x("hover-overlay");
function Cy(e, n) {
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
const Lm = ee({
  name: wy,
  props: Rm,
  setup: () => ({
    n: ky,
    classes: $y,
    inMobile: Ro
  })
});
Lm.render = Cy;
var ba = Lm;
re(ba);
ie(ba, Rm);
function _n() {
  const e = $(!1);
  return {
    hovering: e,
    handleHovering: (t) => {
      e.value = t;
    }
  };
}
const gM = ba;
var Vn = ba;
function Sy(e) {
  const { left: n } = nn(e);
  return n + (document.body.scrollLeft || document.documentElement.scrollLeft);
}
function ac(e) {
  const { top: n } = nn(e);
  return n + (document.body.scrollTop || document.documentElement.scrollTop);
}
function rl(e) {
  const { transform: n } = Zn(e);
  return +n.slice(n.lastIndexOf(",") + 2, n.length - 1);
}
function Dt(e) {
  let n = e;
  for (; n && !(!n.parentNode || (n = n.parentNode, n === document.body || n === document.documentElement)); ) {
    const t = /(scroll|auto)/, { overflowY: o, overflow: r } = Zn(n);
    if (t.test(o) || t.test(r))
      return n;
  }
  return window;
}
function zy(e) {
  const n = [];
  let t = e;
  for (; !pa(t); )
    t = Dt(t), n.push(t);
  return n;
}
function Vm(e, n) {
  if (ln(e)) {
    const t = document.querySelector(e);
    return Xn(!!t, n, "target element cannot found"), t;
  }
  return Xn(ft(e), n, 'type of prop "target" should be an element object'), e;
}
function Py() {
  const { width: e, height: n } = nn(window);
  return {
    vw: e,
    vh: n,
    vMin: Math.min(e, n),
    vMax: Math.max(e, n)
  };
}
const Oy = (e) => ln(e) && e.endsWith("rem"), Ey = (e) => ln(e) && e.endsWith("px") || zn(e), Ty = (e) => ln(e) && e.endsWith("vw"), By = (e) => ln(e) && e.endsWith("vh"), My = (e) => ln(e) && e.endsWith("vmin"), Iy = (e) => ln(e) && e.endsWith("vmax"), tn = (e) => {
  if (da(e))
    return Number(e);
  if (Ey(e))
    return +e.replace("px", "");
  if (!et())
    return 0;
  const { vw: n, vh: t, vMin: o, vMax: r } = Py();
  if (Ty(e))
    return +e.replace("vw", "") * n / 100;
  if (By(e))
    return +e.replace("vh", "") * t / 100;
  if (My(e))
    return +e.replace("vmin", "") * o / 100;
  if (Iy(e))
    return +e.replace("vmax", "") * r / 100;
  if (Oy(e)) {
    const a = +e.replace("rem", ""), i = Zn(document.documentElement).fontSize;
    return a * parseFloat(i);
  }
  return ln(e) ? Y(e) : 0;
}, Oe = (e) => {
  if (e != null)
    return da(e) ? `${e}px` : String(e);
}, On = (e, n = 1) => {
  if (e == null)
    return;
  const t = Oe(e), o = t.match(/(vh|%|r?em|px|vw|vmin|vmax)$/)[0];
  return `${parseFloat(t) * n}${o}`;
};
function Lo(e, { top: n = 0, left: t = 0, duration: o = 300, animation: r }) {
  const a = Date.now(), i = vt(e), l = or(e);
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
function Fm(e) {
  return Object.entries(e ?? {}).reduce((n, [t, o]) => {
    const r = t.startsWith("--") ? t : `--${eu(t)}`;
    return n[r] = o, n;
  }, {});
}
function Zr(e) {
  return e === "start" || e === "end" ? `flex-${e}` : e;
}
function Dy(e) {
  let n = e;
  for (; n && n !== document.documentElement; ) {
    if (Zn(n).display === "none")
      return !0;
    n = n.parentNode;
  }
  return !1;
}
const ic = ["button", "input", "select", "textarea", "[tabindex]", "[href]"].map((e) => `${e}:not([disabled])`).join(", ");
function fu(e, n, t, o) {
  const r = Array.from(n.querySelectorAll(ic)).filter(
    (s) => !Dy(s)
  );
  if (!r.length)
    return;
  const a = [e, ...Array.from(e.querySelectorAll(ic))].findIndex(
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
const cn = {
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
var Ay = (e, n, t) => new Promise((o, r) => {
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
const { name: Ny, n: Ry, classes: Ly } = x("icon");
function Vy(e, n) {
  return g(), we(Qt(e.isURL(e.name) ? "img" : "i"), {
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
const Um = ee({
  name: Ny,
  props: cn,
  setup(e) {
    const n = $(""), t = $(!1);
    pe(() => e.name, o, { immediate: !0 });
    function o(r, a) {
      return Ay(this, null, function* () {
        const { transition: i } = e;
        if (a == null || Y(i) === 0) {
          n.value = r;
          return;
        }
        t.value = !0, yield Ye(), setTimeout(() => {
          a != null && (n.value = r), t.value = !1;
        }, Y(i));
      });
    }
    return {
      nextName: n,
      animateInProgress: t,
      n: Ry,
      classes: Ly,
      isURL: E0,
      toNumber: Y,
      toSizeUnit: Oe
    };
  }
});
Um.render = Vy;
var ya = Um;
re(ya);
ie(ya, cn);
const hM = ya;
var Ze = ya;
const { name: Fy, n: Uy, classes: jy } = x("action-sheet");
function Hy(e, n) {
  const t = te("mp-icon"), o = te("mp-hover-overlay"), r = Ge("ripple"), a = Ge("hover");
  return Ne((g(), C(
    "div",
    {
      class: m(e.classes(e.n("action-item"), e.className, [e.disabled, e.n("--disabled")])),
      style: G({ color: e.color })
    },
    [
      e.icon ? (g(), we(t, {
        key: 0,
        "mp-action-sheet-cover": "",
        class: m(e.n("action-icon")),
        namespace: e.namespace,
        name: e.icon,
        size: e.iconSize
      }, null, 8, ["class", "namespace", "name", "size"])) : X("v-if", !0),
      L(
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
const jm = ee({
  name: Fy,
  components: {
    MpHoverOverlay: Vn,
    MpIcon: Ze
  },
  directives: { Ripple: on, Hover: Dn },
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
      n: Uy,
      classes: jy,
      handleHovering: n
    };
  }
});
jm.render = Hy;
var Yy = jm, Wy = Object.defineProperty, lc = Object.getOwnPropertySymbols, Ky = Object.prototype.hasOwnProperty, qy = Object.prototype.propertyIsEnumerable, sc = (e, n, t) => n in e ? Wy(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t, Xy = (e, n) => {
  for (var t in n || (n = {}))
    Ky.call(n, t) && sc(e, t, n[t]);
  if (lc)
    for (var t of lc(n))
      qy.call(n, t) && sc(e, t, n[t]);
  return e;
};
const Hm = Xy({
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
}, De(Co, [
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
])), { name: Gy, n: Zy, classes: Jy } = x("action-sheet");
function Qy(e, n) {
  const t = te("mp-action-item"), o = te("mp-popup");
  return g(), we(o, {
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
      L(
        "div",
        He({
          class: e.classes(e.n(), e.n("$--box"))
        }, e.$attrs),
        [
          F(e.$slots, "title", {}, () => {
            var r;
            return [
              L(
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
              Me,
              null,
              Ke(e.actions, (r) => (g(), we(t, {
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
const Ym = ee({
  name: Gy,
  directives: { Ripple: on },
  components: {
    MpPopup: It,
    MpActionItem: Yy
  },
  inheritAttrs: !1,
  props: Hm,
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
      t: rn,
      n: Zy,
      classes: Jy,
      handleSelect: o
    };
  }
});
Ym.render = Qy;
var sr = Ym, xy = Object.defineProperty, uc = Object.getOwnPropertySymbols, _y = Object.prototype.hasOwnProperty, e1 = Object.prototype.propertyIsEnumerable, cc = (e, n, t) => n in e ? xy(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t, dc = (e, n) => {
  for (var t in n || (n = {}))
    _y.call(n, t) && cc(e, t, n[t]);
  if (uc)
    for (var t of uc(n))
      e1.call(n, t) && cc(e, t, n[t]);
  return e;
};
let Ct, vu = {};
function n1(e = {}) {
  return dc(dc({}, vu), e);
}
function Lt(e) {
  return et() ? new Promise((n) => {
    Lt.close();
    const t = en(n1(e));
    t.teleport = "body", Ct = t;
    const { unmountInstance: o } = $o(sr, t, {
      onSelect: (r) => {
        S(t.onSelect, r), n(r);
      },
      onClose: () => {
        S(t.onClose), n("close");
      },
      onClosed: () => {
        S(t.onClosed), o(), Ct === t && (Ct = null);
      },
      onRouteChange: () => {
        o(), Ct === t && (Ct = null);
      },
      "onUpdate:show": (r) => {
        t.show = r;
      }
    });
    t.show = !0;
  }) : Promise.resolve();
}
Lt.setDefaultOptions = function(e) {
  vu = e;
};
Lt.resetDefaultOptions = function() {
  vu = {};
};
Lt.close = function() {
  if (Ct != null) {
    const e = Ct;
    Ct = null, Ye().then(() => {
      e.show = !1;
    });
  }
};
Lt.Component = sr;
re(sr);
re(sr, Lt);
ie(Lt, Hm);
const bM = sr;
var bl = Lt;
const Wm = {
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
var t1 = Object.defineProperty, o1 = Object.defineProperties, r1 = Object.getOwnPropertyDescriptors, pc = Object.getOwnPropertySymbols, a1 = Object.prototype.hasOwnProperty, i1 = Object.prototype.propertyIsEnumerable, mc = (e, n, t) => n in e ? t1(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t, l1 = (e, n) => {
  for (var t in n || (n = {}))
    a1.call(n, t) && mc(e, t, n[t]);
  if (pc)
    for (var t of pc(n))
      i1.call(n, t) && mc(e, t, n[t]);
  return e;
}, s1 = (e, n) => o1(e, r1(n));
function u1(e, n, t, o, r, a) {
  return g(), we(Qe, {
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
          )) : X("v-if", !0),
          L(
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
                    Be(
                      se(e.title),
                      1
                      /* TEXT */
                    )
                  ])
                ],
                2
                /* CLASS */
              )) : X("v-if", !0),
              L(
                "div",
                {
                  class: m(o.n("content"))
                },
                [
                  F(e.$slots, "default", {}, () => [
                    Be(
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
          )) : X("v-if", !0),
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
          )) : X("v-if", !0)
        ],
        6
        /* CLASS, STYLE */
      )) : X("v-if", !0)
    ]),
    _: 3
    /* FORWARDED */
  });
}
const Km = /* @__PURE__ */ ee(s1(l1({}, {
  name: x("alert").name
}), {
  __name: "Alert",
  props: Wm,
  setup(e, { expose: n }) {
    n();
    const { n: t, classes: o } = x("alert"), r = e, a = Mp(), i = {
      info: "information",
      success: "checkbox-marked-circle",
      warning: "warning",
      danger: "error"
    }, l = $(!0), s = O(() => !!(r.title || a.title)), u = O(() => !!r.showIcon), c = O(() => r.color ? { backgroundColor: r.color } : {});
    function d(h) {
      l.value = !1, S(r.onClose, h);
    }
    function p() {
      S(r.onAfterClose);
    }
    const f = { n: t, classes: o, props: r, slots: a, iconTypeMap: i, visible: l, hasTitle: s, showIconNode: u, rootStyle: c, handleClose: d, handleAfterLeave: p, get MpIcon() {
      return Ze;
    }, get formatElevation() {
      return dn;
    } };
    return Object.defineProperty(f, "__isScriptSetup", { enumerable: !1, value: !0 }), f;
  }
}));
Km.render = u1;
var wa = Km;
re(wa);
ie(wa, Wm);
const yM = wa;
var yl = wa;
const qm = {
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
}, { name: c1, n: d1, classes: p1 } = x("app-bar");
function m1(e, n) {
  return g(), C(
    Me,
    null,
    [
      L(
        "div",
        He({
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
          L(
            "div",
            {
              class: m(e.n("toolbar"))
            },
            [
              L(
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
                        Be(
                          se(e.title),
                          1
                          /* TEXT */
                        )
                      ])
                    ],
                    6
                    /* CLASS, STYLE */
                  )) : X("v-if", !0)
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
                    Be(
                      se(e.title),
                      1
                      /* TEXT */
                    )
                  ])
                ],
                2
                /* CLASS */
              )) : X("v-if", !0),
              L(
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
                        Be(
                          se(e.title),
                          1
                          /* TEXT */
                        )
                      ])
                    ],
                    6
                    /* CLASS, STYLE */
                  )) : X("v-if", !0),
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
      )) : X("v-if", !0)
    ],
    64
    /* STABLE_FRAGMENT */
  );
}
const Xm = ee({
  name: c1,
  props: qm,
  setup(e, { slots: n }) {
    const t = $(null), o = $(), r = $(), a = $(), i = O(() => {
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
    }), _o(l);
    function l() {
      o.value = n.left ? 0 : void 0, r.value = n.right ? 0 : void 0;
    }
    function s() {
      if (!e.fixed || !e.placeholder)
        return;
      const { height: u } = nn(t.value);
      a.value = Oe(u);
    }
    return {
      rootStyles: i,
      paddingLeft: o,
      paddingRight: r,
      n: d1,
      classes: p1,
      formatElevation: dn,
      appBar: t,
      placeholderHeight: a
    };
  }
});
Xm.render = m1;
var ka = Xm;
re(ka);
ie(ka, qm);
const wM = ka;
var wl = ka;
const Gm = {
  errorMessage: {
    type: String,
    default: ""
  },
  extraMessage: {
    type: String,
    default: ""
  }
}, { name: f1, n: v1 } = x("form-details"), g1 = { key: 0 }, h1 = { key: 0 };
function b1(e, n) {
  return g(), we(Qe, {
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
          L(
            "div",
            {
              class: m(e.n("error-message"))
            },
            [
              Z(Qe, {
                name: e.n("message")
              }, {
                default: ue(() => [
                  e.errorMessage ? (g(), C(
                    "div",
                    g1,
                    se(e.errorMessage),
                    1
                    /* TEXT */
                  )) : X("v-if", !0)
                ]),
                _: 1
                /* STABLE */
              }, 8, ["name"])
            ],
            2
            /* CLASS */
          ),
          L(
            "div",
            {
              class: m(e.n("extra-message"))
            },
            [
              Z(Qe, {
                name: e.n("message")
              }, {
                default: ue(() => [
                  F(e.$slots, "extra-message", {}, () => [
                    e.extraMessage ? (g(), C(
                      "div",
                      h1,
                      se(e.extraMessage),
                      1
                      /* TEXT */
                    )) : X("v-if", !0)
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
      )) : X("v-if", !0)
    ]),
    _: 3
    /* FORWARDED */
  }, 8, ["name"]);
}
const Zm = ee({
  name: f1,
  props: Gm,
  setup: () => ({ n: v1 })
});
Zm.render = b1;
var $a = Zm;
re($a);
ie($a, Gm);
const kM = $a;
var Bn = $a, y1 = Object.defineProperty, w1 = Object.defineProperties, k1 = Object.getOwnPropertyDescriptors, fc = Object.getOwnPropertySymbols, $1 = Object.prototype.hasOwnProperty, C1 = Object.prototype.propertyIsEnumerable, vc = (e, n, t) => n in e ? y1(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t, S1 = (e, n) => {
  for (var t in n || (n = {}))
    $1.call(n, t) && vc(e, t, n[t]);
  if (fc)
    for (var t of fc(n))
      C1.call(n, t) && vc(e, t, n[t]);
  return e;
}, z1 = (e, n) => w1(e, k1(n));
const Jm = Symbol("FORM_BIND_FORM_ITEM_KEY");
function jn() {
  const { parentProvider: e, index: n, bindParent: t } = wn(Jm), o = Jt();
  return {
    index: n,
    form: e,
    bindForm: t ? (a) => {
      t(z1(S1({}, a), { instance: o }));
    } : null
  };
}
function P1() {
  const { childProviders: e, length: n, bindChildren: t } = kn(Jm);
  return {
    length: n,
    formItems: e,
    bindFormItems: t
  };
}
const Qm = Symbol("SWIPE_BIND_SWIPE_ITEM_KEY"), xm = Symbol(
  "SWIPE_RESIZE_DISPATCHER_BIND_SWIPE_RESIZE_LISTENER_KEY"
);
function O1() {
  const { childProviders: e, length: n, bindChildren: t } = kn(
    Qm
  );
  return {
    length: n,
    swipeItems: e,
    bindSwipeItems: t
  };
}
function E1() {
  const { childProviders: e, bindChildren: n } = kn(
    xm
  );
  return {
    swipeResizeListeners: e,
    bindSwipeResizeListeners: n
  };
}
function T1() {
  const { parentProvider: e, bindParent: n } = wn(
    xm
  );
  return {
    swipeResizeDispatcher: e,
    bindSwipeResizeDispatcher: n
  };
}
const Ca = {
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
var B1 = (e, n, t) => new Promise((o, r) => {
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
const { name: M1, n: al, classes: I1 } = x("field-decorator"), D1 = ["for"];
function A1(e, n) {
  const t = te("mp-icon");
  return g(), C(
    "div",
    {
      class: m(e.classes(e.n(), e.n("$--box"), e.n(`--${e.variant}`), [e.size === "small", e.n("--small")], [e.disabled, e.n("--disabled")])),
      onClick: n[0] || (n[0] = (...o) => e.handleClick && e.handleClick(...o))
    },
    [
      L(
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
          L(
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
          L(
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
            L(
              "span",
              null,
              se(e.placeholder),
              1
              /* TEXT */
            )
          ], 14, D1)) : X("v-if", !0),
          L(
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
              ]) : X("v-if", !0),
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
        Me,
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
              L(
                "legend",
                {
                  class: m(e.classes(e.n("line-legend"), [e.isFloating, e.n("line-legend--hint")])),
                  style: G({ width: e.legendWidth })
                },
                [
                  e.placeholder && e.hint ? (g(), we(it, {
                    key: 0,
                    to: "body"
                  }, [
                    L(
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
                  ])) : X("v-if", !0)
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
              L(
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
      )) : X("v-if", !0)
    ],
    2
    /* CLASS */
  );
}
const _m = ee({
  name: M1,
  components: { MpIcon: Ze },
  props: Ca,
  setup(e) {
    const n = $(null), t = $(null), o = $(""), r = $("0px"), a = $("0px"), i = $("0px"), l = $(!0), s = O(() => e.hint && (!Wn(e.value) || e.isFocusing)), { popup: u, bindPopup: c } = Sm(), { bindSwipeResizeDispatcher: d } = T1(), p = O(
      () => e.isError ? void 0 : e.isFocusing ? e.focusColor : e.blurColor
    );
    nt(y), yn(() => {
      y(), Ye().then(() => {
        l.value = !1;
      });
    }), _o(y), S(c, null), S(d, {
      onResize() {
        Ye().then(y);
      }
    }), u && pe(
      () => u.show.value,
      (w) => B1(this, null, function* () {
        w && (yield bn(), y());
      })
    );
    function f() {
      const { hint: w, value: k, composing: b } = e;
      if (!w && (!Wn(k) || b))
        return al("--placeholder-hidden");
      if (s.value)
        return al("--placeholder-hint");
    }
    function h(w) {
      S(e.onClear, w);
    }
    function v(w) {
      S(e.onClick, w);
    }
    function y() {
      if (r.value = `${t.value.offsetLeft}px`, a.value = `${t.value.offsetWidth}px`, i.value = `${t.value.offsetHeight}px`, e.variant === "outlined" && n.value) {
        const w = Zn(n.value), k = `var(--mp-field-decorator-outlined-${e.size}-placeholder-space)`;
        o.value = `calc(${w.width} * 0.75 + ${k} * 2)`;
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
      n: al,
      classes: I1,
      isEmpty: Wn,
      handleClear: h,
      handleClick: v
    };
  }
});
_m.render = A1;
var Sa = _m;
re(Sa);
ie(Sa, Ca);
const $M = Sa;
var Vo = Sa, N1 = Object.defineProperty, R1 = Object.defineProperties, L1 = Object.getOwnPropertyDescriptors, gc = Object.getOwnPropertySymbols, V1 = Object.prototype.hasOwnProperty, F1 = Object.prototype.propertyIsEnumerable, hc = (e, n, t) => n in e ? N1(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t, U1 = (e, n) => {
  for (var t in n || (n = {}))
    V1.call(n, t) && hc(e, t, n[t]);
  if (gc)
    for (var t of gc(n))
      F1.call(n, t) && hc(e, t, n[t]);
  return e;
}, j1 = (e, n) => R1(e, L1(n));
const gu = j1(U1({
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
}, De(Ca, [
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
}), { name: H1, n: Y1, classes: W1 } = x("input"), K1 = ["aria-label", "placeholder", "enterkeyhint"], q1 = ["id", "aria-label", "autocomplete", "disabled", "readonly", "type", "value", "placeholder", "maxlength", "rows", "enterkeyhint", "inputmode"], X1 = ["id", "aria-label", "autocomplete", "disabled", "readonly", "type", "value", "placeholder", "maxlength", "enterkeyhint", "inputmode"];
function G1(e, n) {
  const t = te("mp-field-decorator"), o = te("mp-form-details");
  return g(), C(
    "div",
    {
      class: m(e.classes(e.n(), e.n("$--box"))),
      onMousedown: n[12] || (n[12] = (...r) => e.handleMousedown && e.handleMousedown(...r))
    },
    [
      Z(
        t,
        Yt(ca({
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
        Kt({
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
            }, null, 14, K1)) : X("v-if", !0),
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
            }, null, 46, q1)) : (g(), C("input", {
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
            }, null, 46, X1))
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
      e.isShowFormDetails ? (g(), we(o, {
        key: 0,
        "error-message": e.errorMessage,
        "extra-message": e.maxlengthText
      }, Kt({
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
      ]), 1032, ["error-message", "extra-message"])) : X("v-if", !0)
    ],
    34
    /* CLASS, NEED_HYDRATION */
  );
}
const ef = ee({
  name: H1,
  components: {
    MpFormDetails: Bn,
    MpFieldDecorator: Vo
  },
  props: gu,
  setup(e) {
    const n = pm(), t = $(null), o = $(!1), r = $(!1), { bindForm: a, form: i } = jn(), {
      errorMessage: l,
      validateWithTrigger: s,
      validate: u,
      // expose
      resetValidation: c
    } = Un(), d = O(() => e.disabled || e.readonly ? "" : "text"), p = O(() => e.type === "number" ? "text" : e.type), f = O(() => {
      const { maxlength: q, modelValue: ne } = e;
      return q ? Wn(ne) ? `0 / ${q}` : `${String(ne).length}/${q}` : "";
    }), h = O(() => {
      const { hint: q, blurColor: ne, focusColor: ye } = e;
      if (!q)
        return l.value ? "var(--mp-field-decorator-error-color)" : o.value ? ye || "var(--mp-field-decorator-focus-color)" : ne || "var(--mp-field-decorator-placeholder-color, var(--mp-field-decorator-blur-color))";
    });
    S(a, {
      reset: B,
      validate: j,
      resetValidation: c
    }), yn(() => {
      e.autofocus && E();
    });
    function y(q) {
      Ye(() => {
        const { validateTrigger: ne, rules: ye, modelValue: Te } = e;
        s(ne, q, ye, Te);
      });
    }
    function w(q) {
      o.value = !0, S(e.onFocus, q), y("onFocus");
    }
    function k(q) {
      o.value = !1, S(e.onBlur, q), y("onBlur");
    }
    function b(q) {
      const ne = q.target;
      let { value: ye } = ne;
      e.type === "number" && (ye = V(ye));
      const Te = A(ye);
      return Te === e.modelValue && (ne.value = Te), Te;
    }
    function z() {
      r.value = !0;
    }
    function I(q) {
      r.value && (r.value = !1, q.target.dispatchEvent(new Event("input")));
    }
    function P(q) {
      if (r.value)
        return;
      const ne = b(q);
      S(e["onUpdate:modelValue"], ne), S(e.onInput, ne, q), y("onInput");
    }
    function M(q) {
      const ne = W(b(q));
      e.modelModifiers.trim && S(e["onUpdate:modelValue"], ne), S(e.onChange, ne, q), y("onChange");
    }
    function D() {
      const { disabled: q, readonly: ne, clearable: ye, onClear: Te } = e;
      i != null && i.disabled.value || i != null && i.readonly.value || q || ne || !ye || (S(e["onUpdate:modelValue"], ""), S(Te, ""), y("onClear"));
    }
    function U(q) {
      const { disabled: ne, onClick: ye } = e;
      i != null && i.disabled.value || ne || (S(ye, q), y("onClick"));
    }
    function V(q) {
      const ne = q.indexOf("-"), ye = q.indexOf(".");
      return ne > -1 && (q = ne === 0 ? "-" + q.replace(/-/g, "") : q.replace(/-/g, "")), ye > -1 && (q = q.slice(0, ye + 1) + q.slice(ye).replace(/\./g, "")), q.replace(/[^-0-9.]/g, "");
    }
    function W(q) {
      return e.modelModifiers.trim ? q.trim() : q;
    }
    function A(q) {
      return e.maxlength ? q.slice(0, Y(e.maxlength)) : q;
    }
    function T(q) {
      const { disabled: ne } = e;
      i != null && i.disabled.value || ne || q.target === t.value || (E(), Ae(q));
    }
    function B() {
      S(e["onUpdate:modelValue"], ""), c();
    }
    function j() {
      return u(e.rules, e.modelValue);
    }
    function E() {
      var q;
      (q = t.value) == null || q.focus();
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
      n: Y1,
      classes: W1,
      isEmpty: Wn,
      handleFocus: w,
      handleBlur: k,
      handleInput: P,
      handleChange: M,
      handleClear: D,
      handleClick: U,
      handleCompositionStart: z,
      handleCompositionEnd: I,
      handleMousedown: T,
      validate: j,
      resetValidation: c,
      reset: B,
      focus: E,
      blur: J
    };
  }
});
ef.render = G1;
var za = ef;
re(za);
ie(za, gu);
const CM = za;
var Fo = za;
const nf = {
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
}, tf = Symbol("CHECKBOX_GROUP_BIND_CHECKBOX_KEY");
function Z1() {
  const { bindChildren: e, childProviders: n, length: t } = kn(
    tf
  );
  return {
    length: t,
    checkboxes: n,
    bindCheckboxes: e
  };
}
function J1() {
  const { bindParent: e, parentProvider: n, index: t } = wn(
    tf
  );
  return {
    index: t,
    checkboxGroup: n,
    bindCheckboxGroup: e
  };
}
const { name: Q1, n: x1, classes: _1 } = x("checkbox"), ew = ["tabindex"];
function nw(e, n) {
  const t = te("mp-icon"), o = te("mp-hover-overlay"), r = te("mp-form-details"), a = Ge("hover"), i = Ge("ripple");
  return g(), C(
    "div",
    {
      class: m(e.n("wrap"))
    },
    [
      L(
        "div",
        {
          class: m(e.n()),
          onClick: n[3] || (n[3] = (...l) => e.handleClick && e.handleClick(...l))
        },
        [
          Ne((g(), C("div", {
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
            ]) : X("v-if", !0),
            e.checked && !e.isIndeterminate ? F(e.$slots, "checked-icon", { key: 1 }, () => [
              Z(t, {
                class: m(e.n("icon")),
                name: "checkbox-marked",
                size: e.iconSize,
                "mp-checkbox-cover": ""
              }, null, 8, ["class", "size"])
            ]) : X("v-if", !0),
            !e.checked && !e.isIndeterminate ? F(e.$slots, "unchecked-icon", { key: 2 }, () => [
              Z(t, {
                class: m(e.n("icon")),
                name: "checkbox-blank-outline",
                size: e.iconSize,
                "mp-checkbox-cover": ""
              }, null, 8, ["class", "size"])
            ]) : X("v-if", !0),
            Z(o, {
              hovering: !e.disabled && !e.formDisabled && e.hovering,
              focusing: !e.disabled && !e.formDisabled && e.isFocusing
            }, null, 8, ["hovering", "focusing"])
          ], 46, ew)), [
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
          )) : X("v-if", !0)
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
const of = ee({
  name: Q1,
  directives: { Ripple: on, Hover: Dn },
  components: {
    MpIcon: Ze,
    MpFormDetails: Bn,
    MpHoverOverlay: Vn
  },
  props: nf,
  setup(e) {
    const n = $(null), t = $(!1), o = Gn(e, "modelValue"), r = Gn(e, "indeterminate"), a = O(() => o.value === e.checkedValue), i = O(() => e.checkedValue), { checkboxGroup: l, bindCheckboxGroup: s } = J1(), { hovering: u, handleHovering: c } = _n(), { form: d, bindForm: p } = jn(), {
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
      reset: M
    };
    S(s, w), S(p, w), je(() => window, "keydown", U), je(() => window, "keyup", V);
    function k(A) {
      Ye(() => {
        const { validateTrigger: T, rules: B, modelValue: j } = e;
        h(T, A, B, j);
      });
    }
    function b(A) {
      const { checkedValue: T, onChange: B } = e;
      o.value = A, S(B, o.value, r.value), k("onChange"), A === T ? l == null || l.onChecked(T) : l == null || l.onUnchecked(T);
    }
    function z(A) {
      const { disabled: T, readonly: B, checkedValue: j, uncheckedValue: E, onClick: J } = e;
      if (d != null && d.disabled.value || T || (S(J, A), d != null && d.readonly.value || B))
        return;
      if (r.value === !0) {
        r.value = !1, S(e.onChange, o.value, r.value), k("onChange");
        return;
      }
      const q = l ? l.checkedCount.value >= Number(l.max.value) : !1;
      !a.value && q || b(a.value ? E : j);
    }
    function I() {
      n.value.focus();
    }
    function P(A) {
      const { checkedValue: T, uncheckedValue: B } = e;
      o.value = A.includes(T) ? T : B;
    }
    function M() {
      o.value = e.uncheckedValue, y();
    }
    function D(A) {
      const { checkedValue: T, uncheckedValue: B } = e;
      ![T, B].includes(A) && (A = a.value ? B : T), b(A);
    }
    function U(A) {
      if (!t.value)
        return;
      const { key: T } = A;
      (T === "Enter" || T === " ") && Ae(A), T === "Enter" && n.value.click();
    }
    function V(A) {
      t.value && A.key === " " && (Ae(A), n.value.click());
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
      n: x1,
      classes: _1,
      handleHovering: c,
      handleClick: z,
      handleTextClick: I,
      toggle: D,
      reset: M,
      validate: W,
      resetValidation: y
    };
  }
});
of.render = nw;
var Pa = of;
re(Pa);
ie(Pa, nf);
const SM = Pa;
var co = Pa;
const rf = {
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
}, af = Symbol("MENU_SELECT_BIND_MENU_OPTION_KEY");
function tw() {
  const { length: e, childProviders: n, bindChildren: t } = kn(
    af
  );
  return {
    length: e,
    menuOptions: n,
    bindMenuOptions: t
  };
}
function ow() {
  const { index: e, parentProvider: n, bindParent: t } = wn(
    af
  );
  return Xn(!!t, "MenuOption", "<mp-menu-option/> must in <mp-menu-select/>"), {
    index: e,
    menuSelect: n,
    bindMenuSelect: t
  };
}
var rw = (e, n, t) => new Promise((o, r) => {
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
const { name: aw, n: iw, classes: lw } = x("menu-option"), sw = ["tabindex"];
function uw(e, n) {
  const t = te("mp-checkbox"), o = te("maybe-v-node"), r = te("mp-icon"), a = te("mp-hover-overlay"), i = Ge("ripple"), l = Ge("hover");
  return Ne((g(), C("div", {
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
    L(
      "div",
      {
        class: m(e.classes(e.n("cover"), [e.optionSelected, e.n("--selected-background")]))
      },
      null,
      2
      /* CLASS */
    ),
    e.multiple ? (g(), we(t, {
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
    }, null, 8, ["modelValue", "indeterminate", "disabled", "onChange"])) : X("v-if", !0),
    F(e.$slots, "default", {}, () => [
      L(
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
    )) : X("v-if", !0),
    Z(a, {
      hovering: (e.hovering || e.highlight) && !e.disabled,
      focusing: e.isFocusing && !e.disabled
    }, null, 8, ["hovering", "focusing"])
  ], 42, sw)), [
    [i, { disabled: e.disabled || !e.ripple }],
    [l, e.handleHovering, "desktop"]
  ]);
}
const lf = ee({
  name: aw,
  directives: { Ripple: on, Hover: Dn },
  components: {
    MpCheckbox: co,
    MpHoverOverlay: Vn,
    MpIcon: Ze,
    MaybeVNode: ar
  },
  props: rf,
  setup(e) {
    const n = $(), t = $(), o = $(!1), r = $(!1), a = $(!1), i = O(() => r.value), l = O(() => a.value), s = O(() => e.value), u = O(() => e.disabled), c = O(() => e.ripple), { menuSelect: d, bindMenuSelect: p } = ow(), { size: f, multiple: h, onSelect: v, computeLabel: y } = d, { hovering: w, handleHovering: k } = _n(), b = O(
      () => {
        var V;
        return vn(e.label) ? e.label(
          (V = e.option) != null ? V : {
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
    pe([() => e.label, () => e.value], y), p(z), je(() => window, "keydown", P), je(() => window, "keyup", M);
    function I() {
      if (!e.disabled && !(!h.value && e.childrenTrigger)) {
        if (h.value && a.value) {
          a.value = !1, r.value = !1, v(z);
          return;
        }
        h.value && !a.value && (r.value = !r.value), v(z);
      }
    }
    function P(V) {
      var W;
      !o.value && !((W = t.value) != null && W.isFocusing) || ((V.key === "ArrowRight" || V.key === "ArrowLeft") && (Ae(V), S(e.onKeyArrowX, V.key)), o.value && ((V.key === " " || V.key === "Enter") && Ae(V), V.key === "Enter" && n.value.click()));
    }
    function M(V) {
      o.value && V.key === " " && (Ae(V), n.value.click());
    }
    function D() {
      return rw(this, null, function* () {
        yield Ye(), v(z);
      });
    }
    function U(V, W) {
      r.value = V, tr(W) && (a.value = W);
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
      n: iw,
      classes: lw,
      handleHovering: k,
      handleClick: I,
      handleSelect: D
    };
  }
});
lf.render = uw;
var ur = lf;
re(ur);
ie(ur, rf);
const zM = ur;
var po = ur;
const hu = {
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
var mt = "top", At = "bottom", Xt = "right", Et = "left", bu = "auto", Oa = [mt, At, Xt, Et], Ea = "start", Uo = "end", cw = "clippingParents", sf = "viewport", Oo = "popper", dw = "reference", bc = /* @__PURE__ */ Oa.reduce(function(e, n) {
  return e.concat([n + "-" + Ea, n + "-" + Uo]);
}, []), uf = /* @__PURE__ */ [].concat(Oa, [bu]).reduce(function(e, n) {
  return e.concat([n, n + "-" + Ea, n + "-" + Uo]);
}, []), pw = "beforeRead", mw = "read", fw = "afterRead", vw = "beforeMain", gw = "main", hw = "afterMain", bw = "beforeWrite", yw = "write", ww = "afterWrite", kw = [pw, mw, fw, vw, gw, hw, bw, yw, ww];
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
function Gt(e) {
  var n = Fn(e).Element;
  return e instanceof n || e instanceof Element;
}
function Kn(e) {
  var n = Fn(e).HTMLElement;
  return e instanceof n || e instanceof HTMLElement;
}
function yu(e) {
  if (typeof ShadowRoot > "u")
    return !1;
  var n = Fn(e).ShadowRoot;
  return e instanceof n || e instanceof ShadowRoot;
}
function $w(e) {
  return ["table", "td", "th"].indexOf(ot(e)) >= 0;
}
function Vt(e) {
  return ((Gt(e) ? e.ownerDocument : (
    // $FlowFixMe[prop-missing]
    e.document
  )) || window.document).documentElement;
}
function Ta(e) {
  return ot(e) === "html" ? e : (
    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    e.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    e.parentNode || // DOM Element detected
    (yu(e) ? e.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    Vt(e)
  );
}
function kl() {
  var e = navigator.userAgentData;
  return e != null && e.brands && Array.isArray(e.brands) ? e.brands.map(function(n) {
    return n.brand + "/" + n.version;
  }).join(" ") : navigator.userAgent;
}
function yc(e) {
  return !Kn(e) || // https://github.com/popperjs/popper-core/issues/837
  gt(e).position === "fixed" ? null : e.offsetParent;
}
function Cw(e) {
  var n = /firefox/i.test(kl()), t = /Trident/i.test(kl());
  if (t && Kn(e)) {
    var o = gt(e);
    if (o.position === "fixed")
      return null;
  }
  var r = Ta(e);
  for (yu(r) && (r = r.host); Kn(r) && ["html", "body"].indexOf(ot(r)) < 0; ) {
    var a = gt(r);
    if (a.transform !== "none" || a.perspective !== "none" || a.contain === "paint" || ["transform", "perspective"].indexOf(a.willChange) !== -1 || n && a.willChange === "filter" || n && a.filter && a.filter !== "none")
      return r;
    r = r.parentNode;
  }
  return null;
}
function wu(e) {
  for (var n = Fn(e), t = yc(e); t && $w(t) && gt(t).position === "static"; )
    t = yc(t);
  return t && (ot(t) === "html" || ot(t) === "body" && gt(t).position === "static") ? n : t || Cw(e) || n;
}
function Tt(e) {
  return e.split("-")[0];
}
function jo(e) {
  return e.split("-")[1];
}
var Mo = Math.max, wc = Math.min, mo = Math.round, Sw = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function zw(e, n) {
  var t = e.x, o = e.y, r = n.devicePixelRatio || 1;
  return {
    x: mo(t * r) / r || 0,
    y: mo(o * r) / r || 0
  };
}
function kc(e) {
  var n, t = e.popper, o = e.popperRect, r = e.placement, a = e.variation, i = e.offsets, l = e.position, s = e.gpuAcceleration, u = e.adaptive, c = e.roundOffsets, d = e.isFixed, p = i.x, f = p === void 0 ? 0 : p, h = i.y, v = h === void 0 ? 0 : h, y = typeof c == "function" ? c({
    x: f,
    y: v
  }) : {
    x: f,
    y: v
  };
  f = y.x, v = y.y;
  var w = i.hasOwnProperty("x"), k = i.hasOwnProperty("y"), b = Et, z = mt, I = window;
  if (u) {
    var P = wu(t), M = "clientHeight", D = "clientWidth";
    if (P === Fn(t) && (P = Vt(t), gt(P).position !== "static" && l === "absolute" && (M = "scrollHeight", D = "scrollWidth")), P = P, r === mt || (r === Et || r === Xt) && a === Uo) {
      z = At;
      var U = d && P === I && I.visualViewport ? I.visualViewport.height : (
        // $FlowFixMe[prop-missing]
        P[M]
      );
      v -= U - o.height, v *= s ? 1 : -1;
    }
    if (r === Et || (r === mt || r === At) && a === Uo) {
      b = Xt;
      var V = d && P === I && I.visualViewport ? I.visualViewport.width : (
        // $FlowFixMe[prop-missing]
        P[D]
      );
      f -= V - o.width, f *= s ? 1 : -1;
    }
  }
  var W = Object.assign({
    position: l
  }, u && Sw), A = c === !0 ? zw({
    x: f,
    y: v
  }, Fn(t)) : {
    x: f,
    y: v
  };
  if (f = A.x, v = A.y, s) {
    var T;
    return Object.assign({}, W, (T = {}, T[z] = k ? "0" : "", T[b] = w ? "0" : "", T.transform = (I.devicePixelRatio || 1) <= 1 ? "translate(" + f + "px, " + v + "px)" : "translate3d(" + f + "px, " + v + "px, 0)", T));
  }
  return Object.assign({}, W, (n = {}, n[z] = k ? v + "px" : "", n[b] = w ? f + "px" : "", n.transform = "", n));
}
function Pw(e) {
  var n = e.state, t = e.options, o = t.gpuAcceleration, r = o === void 0 ? !0 : o, a = t.adaptive, i = a === void 0 ? !0 : a, l = t.roundOffsets, s = l === void 0 ? !0 : l, u = {
    placement: Tt(n.placement),
    variation: jo(n.placement),
    popper: n.elements.popper,
    popperRect: n.rects.popper,
    gpuAcceleration: r,
    isFixed: n.options.strategy === "fixed"
  };
  n.modifiersData.popperOffsets != null && (n.styles.popper = Object.assign({}, n.styles.popper, kc(Object.assign({}, u, {
    offsets: n.modifiersData.popperOffsets,
    position: n.options.strategy,
    adaptive: i,
    roundOffsets: s
  })))), n.modifiersData.arrow != null && (n.styles.arrow = Object.assign({}, n.styles.arrow, kc(Object.assign({}, u, {
    offsets: n.modifiersData.arrow,
    position: "absolute",
    adaptive: !1,
    roundOffsets: s
  })))), n.attributes.popper = Object.assign({}, n.attributes.popper, {
    "data-popper-placement": n.placement
  });
}
const cf = {
  name: "computeStyles",
  enabled: !0,
  phase: "beforeWrite",
  fn: Pw,
  data: {}
};
var Ow = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function Br(e) {
  return e.replace(/left|right|bottom|top/g, function(n) {
    return Ow[n];
  });
}
var Ew = {
  start: "end",
  end: "start"
};
function $c(e) {
  return e.replace(/start|end/g, function(n) {
    return Ew[n];
  });
}
function df() {
  return !/^((?!chrome|android).)*safari/i.test(kl());
}
function fo(e, n, t) {
  n === void 0 && (n = !1), t === void 0 && (t = !1);
  var o = e.getBoundingClientRect(), r = 1, a = 1;
  n && Kn(e) && (r = e.offsetWidth > 0 && mo(o.width) / e.offsetWidth || 1, a = e.offsetHeight > 0 && mo(o.height) / e.offsetHeight || 1);
  var i = Gt(e) ? Fn(e) : window, l = i.visualViewport, s = !df() && t, u = (o.left + (s && l ? l.offsetLeft : 0)) / r, c = (o.top + (s && l ? l.offsetTop : 0)) / a, d = o.width / r, p = o.height / a;
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
function ku(e) {
  var n = Fn(e), t = n.pageXOffset, o = n.pageYOffset;
  return {
    scrollLeft: t,
    scrollTop: o
  };
}
function $u(e) {
  return fo(Vt(e)).left + ku(e).scrollLeft;
}
function Tw(e, n) {
  var t = Fn(e), o = Vt(e), r = t.visualViewport, a = o.clientWidth, i = o.clientHeight, l = 0, s = 0;
  if (r) {
    a = r.width, i = r.height;
    var u = df();
    (u || !u && n === "fixed") && (l = r.offsetLeft, s = r.offsetTop);
  }
  return {
    width: a,
    height: i,
    x: l + $u(e),
    y: s
  };
}
function Bw(e) {
  var n, t = Vt(e), o = ku(e), r = (n = e.ownerDocument) == null ? void 0 : n.body, a = Mo(t.scrollWidth, t.clientWidth, r ? r.scrollWidth : 0, r ? r.clientWidth : 0), i = Mo(t.scrollHeight, t.clientHeight, r ? r.scrollHeight : 0, r ? r.clientHeight : 0), l = -o.scrollLeft + $u(e), s = -o.scrollTop;
  return gt(r || t).direction === "rtl" && (l += Mo(t.clientWidth, r ? r.clientWidth : 0) - a), {
    width: a,
    height: i,
    x: l,
    y: s
  };
}
function Cu(e) {
  var n = gt(e), t = n.overflow, o = n.overflowX, r = n.overflowY;
  return /auto|scroll|overlay|hidden/.test(t + r + o);
}
function pf(e) {
  return ["html", "body", "#document"].indexOf(ot(e)) >= 0 ? e.ownerDocument.body : Kn(e) && Cu(e) ? e : pf(Ta(e));
}
function Io(e, n) {
  var t;
  n === void 0 && (n = []);
  var o = pf(e), r = o === ((t = e.ownerDocument) == null ? void 0 : t.body), a = Fn(o), i = r ? [a].concat(a.visualViewport || [], Cu(o) ? o : []) : o, l = n.concat(i);
  return r ? l : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    l.concat(Io(Ta(i)))
  );
}
function Mw(e, n) {
  var t = n.getRootNode && n.getRootNode();
  if (e.contains(n))
    return !0;
  if (t && yu(t)) {
    var o = n;
    do {
      if (o && e.isSameNode(o))
        return !0;
      o = o.parentNode || o.host;
    } while (o);
  }
  return !1;
}
function $l(e) {
  return Object.assign({}, e, {
    left: e.x,
    top: e.y,
    right: e.x + e.width,
    bottom: e.y + e.height
  });
}
function Iw(e, n) {
  var t = fo(e, !1, n === "fixed");
  return t.top = t.top + e.clientTop, t.left = t.left + e.clientLeft, t.bottom = t.top + e.clientHeight, t.right = t.left + e.clientWidth, t.width = e.clientWidth, t.height = e.clientHeight, t.x = t.left, t.y = t.top, t;
}
function Cc(e, n, t) {
  return n === sf ? $l(Tw(e, t)) : Gt(n) ? Iw(n, t) : $l(Bw(Vt(e)));
}
function Dw(e) {
  var n = Io(Ta(e)), t = ["absolute", "fixed"].indexOf(gt(e).position) >= 0, o = t && Kn(e) ? wu(e) : e;
  return Gt(o) ? n.filter(function(r) {
    return Gt(r) && Mw(r, o) && ot(r) !== "body";
  }) : [];
}
function Aw(e, n, t, o) {
  var r = n === "clippingParents" ? Dw(e) : [].concat(n), a = [].concat(r, [t]), i = a[0], l = a.reduce(function(s, u) {
    var c = Cc(e, u, o);
    return s.top = Mo(c.top, s.top), s.right = wc(c.right, s.right), s.bottom = wc(c.bottom, s.bottom), s.left = Mo(c.left, s.left), s;
  }, Cc(e, i, o));
  return l.width = l.right - l.left, l.height = l.bottom - l.top, l.x = l.left, l.y = l.top, l;
}
function Nw(e) {
  return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y";
}
function mf(e) {
  var n = e.reference, t = e.element, o = e.placement, r = o ? Tt(o) : null, a = o ? jo(o) : null, i = n.x + n.width / 2 - t.width / 2, l = n.y + n.height / 2 - t.height / 2, s;
  switch (r) {
    case mt:
      s = {
        x: i,
        y: n.y - t.height
      };
      break;
    case At:
      s = {
        x: i,
        y: n.y + n.height
      };
      break;
    case Xt:
      s = {
        x: n.x + n.width,
        y: l
      };
      break;
    case Et:
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
  var u = r ? Nw(r) : null;
  if (u != null) {
    var c = u === "y" ? "height" : "width";
    switch (a) {
      case Ea:
        s[u] = s[u] - (n[c] / 2 - t[c] / 2);
        break;
      case Uo:
        s[u] = s[u] + (n[c] / 2 - t[c] / 2);
        break;
    }
  }
  return s;
}
function Rw() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
function Lw(e) {
  return Object.assign({}, Rw(), e);
}
function Vw(e, n) {
  return n.reduce(function(t, o) {
    return t[o] = e, t;
  }, {});
}
function ff(e, n) {
  n === void 0 && (n = {});
  var t = n, o = t.placement, r = o === void 0 ? e.placement : o, a = t.strategy, i = a === void 0 ? e.strategy : a, l = t.boundary, s = l === void 0 ? cw : l, u = t.rootBoundary, c = u === void 0 ? sf : u, d = t.elementContext, p = d === void 0 ? Oo : d, f = t.altBoundary, h = f === void 0 ? !1 : f, v = t.padding, y = v === void 0 ? 0 : v, w = Lw(typeof y != "number" ? y : Vw(y, Oa)), k = p === Oo ? dw : Oo, b = e.rects.popper, z = e.elements[h ? k : p], I = Aw(Gt(z) ? z : z.contextElement || Vt(e.elements.popper), s, c, i), P = fo(e.elements.reference), M = mf({
    reference: P,
    element: b,
    placement: r
  }), D = $l(Object.assign({}, b, M)), U = p === Oo ? D : P, V = {
    top: I.top - U.top + w.top,
    bottom: U.bottom - I.bottom + w.bottom,
    left: I.left - U.left + w.left,
    right: U.right - I.right + w.right
  }, W = e.modifiersData.offset;
  if (p === Oo && W) {
    var A = W[r];
    Object.keys(V).forEach(function(T) {
      var B = [Xt, At].indexOf(T) >= 0 ? 1 : -1, j = [mt, At].indexOf(T) >= 0 ? "y" : "x";
      V[T] += A[j] * B;
    });
  }
  return V;
}
function Fw(e, n) {
  n === void 0 && (n = {});
  var t = n, o = t.placement, r = t.boundary, a = t.rootBoundary, i = t.padding, l = t.flipVariations, s = t.allowedAutoPlacements, u = s === void 0 ? uf : s, c = jo(o), d = c ? l ? bc : bc.filter(function(h) {
    return jo(h) === c;
  }) : Oa, p = d.filter(function(h) {
    return u.indexOf(h) >= 0;
  });
  p.length === 0 && (p = d);
  var f = p.reduce(function(h, v) {
    return h[v] = ff(e, {
      placement: v,
      boundary: r,
      rootBoundary: a,
      padding: i
    })[Tt(v)], h;
  }, {});
  return Object.keys(f).sort(function(h, v) {
    return f[h] - f[v];
  });
}
function Uw(e) {
  if (Tt(e) === bu)
    return [];
  var n = Br(e);
  return [$c(e), n, $c(n)];
}
function jw(e) {
  var n = e.state, t = e.options, o = e.name;
  if (!n.modifiersData[o]._skip) {
    for (var r = t.mainAxis, a = r === void 0 ? !0 : r, i = t.altAxis, l = i === void 0 ? !0 : i, s = t.fallbackPlacements, u = t.padding, c = t.boundary, d = t.rootBoundary, p = t.altBoundary, f = t.flipVariations, h = f === void 0 ? !0 : f, v = t.allowedAutoPlacements, y = n.options.placement, w = Tt(y), k = w === y, b = s || (k || !h ? [Br(y)] : Uw(y)), z = [y].concat(b).reduce(function(ae, ve) {
      return ae.concat(Tt(ve) === bu ? Fw(n, {
        placement: ve,
        boundary: c,
        rootBoundary: d,
        padding: u,
        flipVariations: h,
        allowedAutoPlacements: v
      }) : ve);
    }, []), I = n.rects.reference, P = n.rects.popper, M = /* @__PURE__ */ new Map(), D = !0, U = z[0], V = 0; V < z.length; V++) {
      var W = z[V], A = Tt(W), T = jo(W) === Ea, B = [mt, At].indexOf(A) >= 0, j = B ? "width" : "height", E = ff(n, {
        placement: W,
        boundary: c,
        rootBoundary: d,
        altBoundary: p,
        padding: u
      }), J = B ? T ? Xt : Et : T ? At : mt;
      I[j] > P[j] && (J = Br(J));
      var q = Br(J), ne = [];
      if (a && ne.push(E[A] <= 0), l && ne.push(E[J] <= 0, E[q] <= 0), ne.every(function(ae) {
        return ae;
      })) {
        U = W, D = !1;
        break;
      }
      M.set(W, ne);
    }
    if (D)
      for (var ye = h ? 3 : 1, Te = function(ve) {
        var N = z.find(function(K) {
          var me = M.get(K);
          if (me)
            return me.slice(0, ve).every(function(Se) {
              return Se;
            });
        });
        if (N)
          return U = N, "break";
      }, H = ye; H > 0; H--) {
        var Q = Te(H);
        if (Q === "break") break;
      }
    n.placement !== U && (n.modifiersData[o]._skip = !0, n.placement = U, n.reset = !0);
  }
}
const Hw = {
  name: "flip",
  enabled: !0,
  phase: "main",
  fn: jw,
  requiresIfExists: ["offset"],
  data: {
    _skip: !1
  }
};
function Yw(e, n, t) {
  var o = Tt(e), r = [Et, mt].indexOf(o) >= 0 ? -1 : 1, a = typeof t == "function" ? t(Object.assign({}, n, {
    placement: e
  })) : t, i = a[0], l = a[1];
  return i = i || 0, l = (l || 0) * r, [Et, Xt].indexOf(o) >= 0 ? {
    x: l,
    y: i
  } : {
    x: i,
    y: l
  };
}
function Ww(e) {
  var n = e.state, t = e.options, o = e.name, r = t.offset, a = r === void 0 ? [0, 0] : r, i = uf.reduce(function(c, d) {
    return c[d] = Yw(d, n.rects, a), c;
  }, {}), l = i[n.placement], s = l.x, u = l.y;
  n.modifiersData.popperOffsets != null && (n.modifiersData.popperOffsets.x += s, n.modifiersData.popperOffsets.y += u), n.modifiersData[o] = i;
}
const Kw = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: Ww
};
function qw(e) {
  return {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  };
}
function Xw(e) {
  return e === Fn(e) || !Kn(e) ? ku(e) : qw(e);
}
function Gw(e) {
  var n = e.getBoundingClientRect(), t = mo(n.width) / e.offsetWidth || 1, o = mo(n.height) / e.offsetHeight || 1;
  return t !== 1 || o !== 1;
}
function Zw(e, n, t) {
  t === void 0 && (t = !1);
  var o = Kn(n), r = Kn(n) && Gw(n), a = Vt(n), i = fo(e, r, t), l = {
    scrollLeft: 0,
    scrollTop: 0
  }, s = {
    x: 0,
    y: 0
  };
  return (o || !o && !t) && ((ot(n) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
  Cu(a)) && (l = Xw(n)), Kn(n) ? (s = fo(n, !0), s.x += n.clientLeft, s.y += n.clientTop) : a && (s.x = $u(a))), {
    x: i.left + l.scrollLeft - s.x,
    y: i.top + l.scrollTop - s.y,
    width: i.width,
    height: i.height
  };
}
function Jw(e) {
  var n = fo(e), t = e.offsetWidth, o = e.offsetHeight;
  return Math.abs(n.width - t) <= 1 && (t = n.width), Math.abs(n.height - o) <= 1 && (o = n.height), {
    x: e.offsetLeft,
    y: e.offsetTop,
    width: t,
    height: o
  };
}
function Qw(e) {
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
function xw(e) {
  var n = Qw(e);
  return kw.reduce(function(t, o) {
    return t.concat(n.filter(function(r) {
      return r.phase === o;
    }));
  }, []);
}
function _w(e) {
  var n;
  return function() {
    return n || (n = new Promise(function(t) {
      Promise.resolve().then(function() {
        n = void 0, t(e());
      });
    })), n;
  };
}
function ek(e) {
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
var Sc = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function zc() {
  for (var e = arguments.length, n = new Array(e), t = 0; t < e; t++)
    n[t] = arguments[t];
  return !n.some(function(o) {
    return !(o && typeof o.getBoundingClientRect == "function");
  });
}
function nk(e) {
  e === void 0 && (e = {});
  var n = e, t = n.defaultModifiers, o = t === void 0 ? [] : t, r = n.defaultOptions, a = r === void 0 ? Sc : r;
  return function(l, s, u) {
    u === void 0 && (u = a);
    var c = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, Sc, a),
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
        var k = typeof w == "function" ? w(c.options) : w;
        v(), c.options = Object.assign({}, a, c.options, k), c.scrollParents = {
          reference: Gt(l) ? Io(l) : l.contextElement ? Io(l.contextElement) : [],
          popper: Io(s)
        };
        var b = xw(ek([].concat(o, c.options.modifiers)));
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
          var w = c.elements, k = w.reference, b = w.popper;
          if (zc(k, b)) {
            c.rects = {
              reference: Zw(k, wu(b), c.options.strategy === "fixed"),
              popper: Jw(b)
            }, c.reset = !1, c.placement = c.options.placement, c.orderedModifiers.forEach(function(V) {
              return c.modifiersData[V.name] = Object.assign({}, V.data);
            });
            for (var z = 0; z < c.orderedModifiers.length; z++) {
              if (c.reset === !0) {
                c.reset = !1, z = -1;
                continue;
              }
              var I = c.orderedModifiers[z], P = I.fn, M = I.options, D = M === void 0 ? {} : M, U = I.name;
              typeof P == "function" && (c = P({
                state: c,
                options: D,
                name: U,
                instance: f
              }) || c);
            }
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: _w(function() {
        return new Promise(function(y) {
          f.forceUpdate(), y(c);
        });
      }),
      destroy: function() {
        v(), p = !0;
      }
    };
    if (!zc(l, s))
      return f;
    f.setOptions(u).then(function(y) {
      !p && u.onFirstUpdate && u.onFirstUpdate(y);
    });
    function h() {
      c.orderedModifiers.forEach(function(y) {
        var w = y.name, k = y.options, b = k === void 0 ? {} : k, z = y.effect;
        if (typeof z == "function") {
          var I = z({
            state: c,
            name: w,
            instance: f,
            options: b
          }), P = function() {
          };
          d.push(I || P);
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
var hr = {
  passive: !0
};
function tk(e) {
  var n = e.state, t = e.instance, o = e.options, r = o.scroll, a = r === void 0 ? !0 : r, i = o.resize, l = i === void 0 ? !0 : i, s = Fn(n.elements.popper), u = [].concat(n.scrollParents.reference, n.scrollParents.popper);
  return a && u.forEach(function(c) {
    c.addEventListener("scroll", t.update, hr);
  }), l && s.addEventListener("resize", t.update, hr), function() {
    a && u.forEach(function(c) {
      c.removeEventListener("scroll", t.update, hr);
    }), l && s.removeEventListener("resize", t.update, hr);
  };
}
const ok = {
  name: "eventListeners",
  enabled: !0,
  phase: "write",
  fn: function() {
  },
  effect: tk,
  data: {}
};
function rk(e) {
  var n = e.state, t = e.name;
  n.modifiersData[t] = mf({
    reference: n.rects.reference,
    element: n.rects.popper,
    placement: n.placement
  });
}
const ak = {
  name: "popperOffsets",
  enabled: !0,
  phase: "read",
  fn: rk,
  data: {}
};
function ik(e) {
  var n = e.state;
  Object.keys(n.elements).forEach(function(t) {
    var o = n.styles[t] || {}, r = n.attributes[t] || {}, a = n.elements[t];
    !Kn(a) || !ot(a) || (Object.assign(a.style, o), Object.keys(r).forEach(function(i) {
      var l = r[i];
      l === !1 ? a.removeAttribute(i) : a.setAttribute(i, l === !0 ? "" : l);
    }));
  });
}
function lk(e) {
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
const sk = {
  name: "applyStyles",
  enabled: !0,
  phase: "write",
  fn: ik,
  effect: lk,
  requires: ["computeStyles"]
};
var uk = [ok, ak, cf, sk], ck = /* @__PURE__ */ nk({
  defaultModifiers: uk
}), dk = Object.defineProperty, pk = Object.defineProperties, mk = Object.getOwnPropertyDescriptors, Pc = Object.getOwnPropertySymbols, fk = Object.prototype.hasOwnProperty, vk = Object.prototype.propertyIsEnumerable, Oc = (e, n, t) => n in e ? dk(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t, il = (e, n) => {
  for (var t in n || (n = {}))
    fk.call(n, t) && Oc(e, t, n[t]);
  if (Pc)
    for (var t of Pc(n))
      vk.call(n, t) && Oc(e, t, n[t]);
  return e;
}, ll = (e, n) => pk(e, mk(n)), Ec = (e, n, t) => new Promise((o, r) => {
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
function vf(e) {
  const n = $(null), t = $(null), o = $({ width: 0, height: 0 }), r = Gn(e, "show", {
    passive: !0,
    defaultValue: !1,
    emit(E, J) {
      S(J ? e.onOpen : e.onClose);
    }
  }), { zIndex: a } = lr(() => r.value, 1);
  du(() => r.value, a);
  let i = null, l, s = !1, u = !1, c = !0;
  je(() => window, "keydown", A), pe(() => [e.offsetX, e.offsetY, e.placement, e.strategy], T), pe(() => e.disabled, j), pe(
    () => r.value,
    (E) => {
      E && T();
    }
  ), nt(T), ht(d), Qo(p);
  function d() {
    const E = U();
    i = ck(E, t.value, D()), E.addEventListener("mouseenter", v), E.addEventListener("mouseleave", y), E.addEventListener("click", b), document.addEventListener("click", z);
  }
  function p() {
    const E = U();
    E && (E.removeEventListener("mouseenter", v), E.removeEventListener("mouseleave", y), E.removeEventListener("click", b)), i.destroy(), document.removeEventListener("click", z);
  }
  function f() {
    const E = U();
    if (!E)
      return;
    const { width: J, height: q } = Zn(E);
    o.value = {
      width: tn(J),
      height: tn(q)
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
    e.trigger === "hover" && (u = !0, B());
  }
  function y() {
    return Ec(this, null, function* () {
      e.trigger === "hover" && (u = !1, yield bn(), !s && j());
    });
  }
  function w() {
    e.trigger === "hover" && (s = !0, e.cascadeOptimization && (c = !1));
  }
  function k() {
    return Ec(this, null, function* () {
      e.trigger === "hover" && (s = !1, yield bn(), !u && j());
    });
  }
  function b() {
    if (e.trigger === "click") {
      if (e.closeOnClickReference && r.value) {
        j();
        return;
      }
      B();
    }
  }
  function z(E) {
    const J = U();
    if (J && !J.contains(E.target)) {
      if (e.trigger !== "click")
        return;
      I(), S(e.onClickOutside, E);
    }
  }
  function I() {
    j();
  }
  function P() {
    T(), S(e.onClosed);
  }
  function M() {
    const { offsetX: E, offsetY: J, placement: q } = e;
    f();
    const ne = {
      x: tn(E),
      y: tn(J)
    };
    switch (q) {
      case "cover-top":
        return {
          placement: "bottom",
          skidding: ne.x,
          distance: ne.y - o.value.height
        };
      case "cover-top-start":
        return {
          placement: "bottom-start",
          skidding: ne.x,
          distance: ne.y - o.value.height
        };
      case "cover-top-end":
        return {
          placement: "bottom-end",
          skidding: ne.x,
          distance: ne.y - o.value.height
        };
      case "cover-bottom":
        return {
          placement: "top",
          skidding: ne.x,
          distance: -ne.y - o.value.height
        };
      case "cover-bottom-start":
        return {
          placement: "top-start",
          skidding: ne.x,
          distance: -ne.y - o.value.height
        };
      case "cover-bottom-end":
        return {
          placement: "top-end",
          skidding: ne.x,
          distance: -ne.y - o.value.height
        };
      case "cover-left":
        return {
          placement: "right",
          skidding: ne.y,
          distance: ne.x - o.value.width
        };
      case "cover-right":
        return {
          placement: "left",
          skidding: ne.y,
          distance: -ne.x - o.value.width
        };
      case "left":
      case "left-start":
      case "left-end":
        return {
          placement: q,
          skidding: ne.y,
          distance: -ne.x
        };
      case "top":
      case "top-start":
      case "top-end":
        return {
          placement: q,
          skidding: ne.x,
          distance: -ne.y
        };
      case "bottom":
      case "bottom-start":
      case "bottom-end":
        return {
          placement: q,
          skidding: ne.x,
          distance: ne.y
        };
      case "right":
      case "right-start":
      case "right-end":
        return {
          placement: q,
          skidding: ne.y,
          distance: ne.x
        };
    }
  }
  function D() {
    const { placement: E, skidding: J, distance: q } = M(), ne = [
      ll(il({}, Hw), {
        enabled: r.value
      }),
      ll(il({}, Kw), {
        options: {
          offset: [J, q]
        }
      }),
      ll(il({}, cf), {
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
        fn({ state: ye }) {
          ye.styles.popper.transformOrigin = h();
        }
      }
    ];
    return {
      placement: E,
      modifiers: ne,
      strategy: e.strategy
    };
  }
  function U() {
    var E, J;
    const q = (E = l ?? e.reference) != null ? E : n.value;
    return ln(q) ? (J = n.value) == null ? void 0 : J.querySelector(q) : q;
  }
  function V(E) {
    c = E;
  }
  function W(E) {
    p(), l = E, d();
  }
  function A(E) {
    const { closeOnKeyEscape: J = !1 } = e;
    E.key === "Escape" && J && r.value && (Ae(E), j());
  }
  function T() {
    i.setOptions(D());
  }
  function B() {
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
    handlePopoverClose: I,
    handlePopoverMouseenter: w,
    handlePopoverMouseleave: k,
    handleClosed: P,
    setReference: W,
    setAllowClose: V,
    resize: T,
    open: B,
    close: j
  };
}
const { name: gk, n: hk, classes: bk } = x("menu");
function yk(e, n) {
  return g(), C(
    "div",
    {
      ref: "host",
      class: m(e.classes(e.n(), e.n("$--box")))
    },
    [
      F(e.$slots, "default"),
      (g(), we(it, {
        to: e.teleport === !1 ? void 0 : e.teleport,
        disabled: e.teleportDisabled || e.teleport === !1
      }, [
        Z(Qe, {
          name: e.n(),
          onAfterEnter: e.onOpened,
          onAfterLeave: e.handleClosed,
          persisted: ""
        }, {
          default: ue(() => [
            Ne(L(
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
const gf = ee({
  name: gk,
  props: hu,
  setup(e) {
    const { disabled: n } = xt(), {
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
    } = vf(e);
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
      formatElevation: dn,
      toSizeUnit: Oe,
      n: hk,
      classes: bk,
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
gf.render = yk;
var cr = gf;
re(cr);
ie(cr, hu);
const PM = cr;
var Ho = cr;
function hf(e) {
  const {
    multiple: n,
    modelValue: t,
    optionProviders: o,
    optionProvidersLength: r,
    optionIsIndeterminate: a
  } = e, i = $(""), l = $([]);
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
var wk = Object.defineProperty, kk = Object.defineProperties, $k = Object.getOwnPropertyDescriptors, Tc = Object.getOwnPropertySymbols, Ck = Object.prototype.hasOwnProperty, Sk = Object.prototype.propertyIsEnumerable, Bc = (e, n, t) => n in e ? wk(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t, zk = (e, n) => {
  for (var t in n || (n = {}))
    Ck.call(n, t) && Bc(e, t, n[t]);
  if (Tc)
    for (var t of Tc(n))
      Sk.call(n, t) && Bc(e, t, n[t]);
  return e;
}, Pk = (e, n) => kk(e, $k(n));
const Jr = Pk(zk({
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
}, De(hu, [
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
var Ok = Object.defineProperty, Mc = Object.getOwnPropertySymbols, Ek = Object.prototype.hasOwnProperty, Tk = Object.prototype.propertyIsEnumerable, Ic = (e, n, t) => n in e ? Ok(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t, Bk = (e, n) => {
  for (var t in n || (n = {}))
    Ek.call(n, t) && Ic(e, t, n[t]);
  if (Mc)
    for (var t of Mc(n))
      Tk.call(n, t) && Ic(e, t, n[t]);
  return e;
}, Mk = (e, n, t) => new Promise((o, r) => {
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
const { name: Ik, n: Dk } = x("menu-children"), Ak = { ref: "menuOptions" };
function Nk(e, n) {
  const t = te("mp-menu-option"), o = te("mp-menu-children"), r = te("mp-menu");
  return g(), we(r, {
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
  }, Kt({
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
        L(
          "div",
          Ak,
          [
            (g(!0), C(
              Me,
              null,
              Ke(e.options, (a) => (g(), C(
                Me,
                {
                  key: a[e.valueKey]
                },
                [
                  a[e.childrenKey] ? (g(), we(o, {
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
                  }, null, 8, ["parent-show", "option", "options", "highlight-options", "disabled", "onKeyArrowX", "onKeyArrowRightOpen", "onMouseenter"])) : (g(), we(t, {
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
const bf = ee({
  name: Ik,
  components: {
    MpMenu: cr,
    MpMenuOption: ur
  },
  props: Bk({
    parentShow: Boolean,
    disabled: Boolean,
    option: {
      type: Object,
      required: !0
    },
    highlightOptions: De(Jr, "options"),
    onKeyArrowX: R(),
    onKeyArrowRightOpen: R(),
    onMouseenter: R()
  }, De(Jr, ["options", "valueKey", "labelKey", "childrenKey"])),
  setup(e) {
    const n = $(!1), t = $(), o = $(), r = $(), a = $();
    pe(
      () => e.parentShow,
      (p) => {
        p || (n.value = !1);
      },
      { immediate: !0 }
    );
    function i(p) {
      return Mk(this, null, function* () {
        var f;
        S(e.onKeyArrowX, p), p === "ArrowRight" && (S(e.onKeyArrowRightOpen), (f = t.value) == null || f.open(), yield pt(), fu(t.value.$el, r.value, "ArrowDown"));
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
      n: Dk,
      close: s,
      handleArrowLeft: l,
      handleArrowRight: i,
      handleMouseenter: d,
      allowClose: u,
      allowChildrenClose: c
    };
  }
});
bf.render = Nk;
var Rk = bf, Lk = Object.defineProperty, Vk = Object.defineProperties, Fk = Object.getOwnPropertyDescriptors, Dc = Object.getOwnPropertySymbols, Uk = Object.prototype.hasOwnProperty, jk = Object.prototype.propertyIsEnumerable, Ac = (e, n, t) => n in e ? Lk(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t, Hk = (e, n) => {
  for (var t in n || (n = {}))
    Uk.call(n, t) && Ac(e, t, n[t]);
  if (Dc)
    for (var t of Dc(n))
      jk.call(n, t) && Ac(e, t, n[t]);
  return e;
}, Yk = (e, n) => Vk(e, Fk(n));
const { name: Wk, n: Kk, classes: qk } = x("menu-select");
function Xk(e, n) {
  const t = te("mp-menu-children"), o = te("mp-menu-option"), r = te("mp-menu");
  return g(), we(r, {
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
      L(
        "div",
        {
          ref: "menuOptionsRef",
          class: m(e.classes(e.n("menu"), e.formatElevation(e.elevation, 3), [e.scrollable, e.n("--scrollable")]))
        },
        [
          (g(!0), C(
            Me,
            null,
            Ke(e.options, (a) => (g(), C(
              Me,
              {
                key: a[e.valueKey]
              },
              [
                a[e.childrenKey] ? (g(), we(t, {
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
                }, null, 8, ["parent-show", "option", "options", "highlight-options", "disabled", "onKeyArrowRightOpen", "onMouseenter"])) : (g(), we(o, {
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
const yf = ee({
  name: Wk,
  components: { MpMenu: Ho, MpMenuOption: po, MpMenuChildren: Rk },
  props: Jr,
  setup(e) {
    const n = Gn(e, "show"), t = $(), o = $(), r = $(), a = O(() => k(e.options)), { menuOptions: i, length: l, bindMenuOptions: s } = tw(), { computeLabel: u, getSelectedValue: c, getOptionProviderKey: d } = hf({
      modelValue: () => e.modelValue,
      multiple: () => e.multiple,
      optionProviders: () => i,
      optionProvidersLength: () => l.value,
      optionIsIndeterminate(A) {
        var T;
        const B = h(A.value.value);
        if (!B)
          return !1;
        const j = ((T = B._children) != null ? T : []).filter((J) => !J.disabled), E = j.filter((J) => e.modelValue.includes(J.value));
        return E.length > 0 && E.length < j.length;
      }
    }), p = O(() => {
      const { multiple: A, modelValue: T } = e;
      if (A)
        return [];
      const B = a.value.find((J) => J.value === T), j = [];
      let E = B == null ? void 0 : B._parent;
      for (; E; )
        j.push(E), E = E._parent;
      return j;
    }), f = {
      size: O(() => e.size),
      multiple: O(() => e.multiple),
      computeLabel: u,
      onSelect: b
    };
    s(f), je(() => window, "keydown", I);
    function h(A) {
      return a.value.find((T) => T.value === A);
    }
    function v(A) {
      return i.find((T) => T.value.value === A);
    }
    function y(A) {
      return A[e.childrenKey];
    }
    function w(A) {
      const T = [];
      B(A);
      function B(j) {
        j.forEach((E) => {
          T.push(E);
          const J = y(E);
          J && B(J);
        });
      }
      return T;
    }
    function k(A) {
      function T(B, j) {
        return B.map((E) => {
          E = Yk(Hk({}, E), { _rawOption: E }), j && (E._parent = j);
          const J = y(E);
          if (J) {
            const q = T(J, E);
            E[e.childrenKey] = q, E._children = w(q);
          }
          return E;
        });
      }
      return w(T(A));
    }
    function b(A) {
      var T, B;
      const { multiple: j, closeOnSelect: E } = e, { value: J, label: q, selected: ne, disabled: ye, ripple: Te } = A, H = h(J.value);
      if (H) {
        const ve = ((T = H._children) != null ? T : []).filter((N) => !N.disabled).map((N) => N.value);
        j && ne.value && (i.forEach((N) => {
          ve.includes(N.value.value) && N.sync(!0, !1);
        }), z(H)), j && !ne.value && (i.forEach((N) => {
          ve.includes(N.value.value) && N.sync(!1, !1);
        }), z(H));
      }
      const Q = c(A), ae = (B = H == null ? void 0 : H._rawOption) != null ? B : {
        value: J.value,
        label: q.value,
        disabled: ye.value,
        ripple: Te.value
      };
      S(e.onSelect, d(A), ae), S(e["onUpdate:modelValue"], Q), !j && E && (t.value.$el.focus(), U());
    }
    function z(A) {
      let T = A._parent;
      for (; T; ) {
        const B = v(T.value), j = y(T).filter((q) => !q.disabled), E = j.every((q) => !v(q.value).selected.value), J = j.every((q) => v(q.value).selected.value);
        E ? B.sync(!1, !1) : J ? B.sync(!0, !1) : B.sync(!1, !0), T = T._parent;
      }
    }
    function I(A) {
      if (e.disabled || !n.value)
        return;
      const { key: T } = A;
      if (["Escape", "ArrowDown", "ArrowUp"].includes(T) && Ae(A), T === "Escape") {
        t.value.$el.focus(), U(), S(e.onKeyEscape);
        return;
      }
      (T === "ArrowDown" || T === "ArrowUp") && fu(
        t.value.$el,
        o.value,
        T,
        (B, j, E) => E ? !0 : P(B) === P(j)
      );
    }
    function P(A) {
      var T, B, j;
      if (A.classList.contains("mp-menu-option--children-trigger"))
        return (T = A.parentNode) == null ? void 0 : T.parentNode;
      if (A.classList.contains("mp-checkbox__action")) {
        const E = (j = (B = A.parentNode) == null ? void 0 : B.parentNode) == null ? void 0 : j.parentNode;
        if (E)
          return P(E);
      }
      return A.parentNode;
    }
    function M(A) {
      var T;
      (T = r.value) == null || T.forEach((B) => {
        if (B.allowClose(), A == null) {
          B.close();
          return;
        }
        B.option.value !== A.value && B.close();
      });
    }
    function D() {
      var A;
      (A = t.value) == null || A.open();
    }
    function U() {
      var A;
      (A = t.value) == null || A.close();
    }
    function V() {
      var A;
      (A = t.value) == null || A.resize();
    }
    function W(A) {
      var T;
      (T = t.value) == null || T.setReference(A);
    }
    return {
      show: n,
      menu: t,
      menuOptionsRef: o,
      menuChildren: r,
      highlightOptions: p,
      n: Kk,
      classes: qk,
      allowChildrenClose: M,
      formatElevation: dn,
      open: D,
      close: U,
      resize: V,
      setReference: W
    };
  }
});
yf.render = Xk;
var Ba = yf;
re(Ba);
ie(Ba, Jr);
const OM = Ba;
var Yo = Ba, Gk = Object.defineProperty, Nc = Object.getOwnPropertySymbols, Zk = Object.prototype.hasOwnProperty, Jk = Object.prototype.propertyIsEnumerable, Rc = (e, n, t) => n in e ? Gk(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t, Qk = (e, n) => {
  for (var t in n || (n = {}))
    Zk.call(n, t) && Rc(e, t, n[t]);
  if (Nc)
    for (var t of Nc(n))
      Jk.call(n, t) && Rc(e, t, n[t]);
  return e;
};
const wf = Qk({
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
}, De(gu, [
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
var Lc = (e, n, t) => new Promise((o, r) => {
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
const { name: xk, n: _k } = x("auto-complete"), e$ = ["tabindex"];
function n$(e, n) {
  const t = te("mp-input"), o = te("mp-menu-option"), r = te("mp-menu-select"), a = te("mp-form-details");
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
        L(
          "div",
          {
            class: m(e.n("options"))
          },
          [
            (g(!0), C(
              Me,
              null,
              Ke(e.viewOptions, (i) => (g(), we(o, {
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
        Z(t, He({ ref: "input" }, {
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
        }), Kt({
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
  ], 42, e$);
}
const kf = ee({
  name: xk,
  components: {
    MpInput: Fo,
    MpMenuSelect: Yo,
    MpMenuOption: po,
    MpFormDetails: Bn
  },
  props: wf,
  setup(e) {
    const n = $(), t = $(), o = $(!1), r = Gn(e, "modelValue"), a = $([]), i = $(!1), l = O(() => {
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
    dm(
      () => n.value,
      "click",
      () => {
        if (h) {
          h = !1;
          return;
        }
        b();
      }
    ), pe(() => [e.options, o.value], M), S(p, v), je(() => window, "keydown", P);
    function y() {
      S(e["onUpdate:modelValue"], ""), d();
    }
    function w() {
      return c(e.rules, e.modelValue);
    }
    function k() {
      o.value || e.disabled || f != null && f.disabled.value || (o.value = !0, t.value.focus(), S(e.onFocus), I("onFocus"));
    }
    function b() {
      o.value && (o.value = !1, i.value = !1, t.value.blur(), S(e.onBlur), I("onBlur"));
    }
    function z() {
      i.value || b();
    }
    function I(j) {
      Ye(() => {
        const { validateTrigger: E, rules: J, modelValue: q } = e;
        u(E, j, J, q);
      });
    }
    function P(j) {
      return Lc(this, null, function* () {
        var E;
        if (f != null && f.disabled.value || f != null && f.readonly.value || e.disabled || e.readonly || !o.value || !i.value)
          return;
        const { key: J } = j;
        if (J === "Tab") {
          Ae(j), n.value.focus(), i.value = !1;
          return;
        }
        if (!["ArrowUp", "ArrowDown", "Enter"].includes(J)) {
          t.value.focus();
          return;
        }
        J === "Enter" && (yield pt(), (E = t.value) == null || E.focus());
      });
    }
    function M() {
      o.value && (i.value = B(r.value)), i.value && (a.value = e.options);
    }
    function D(j, E) {
      M(), S(e.onInput, j, E), I("onInput");
    }
    function U() {
      h = !0, M(), S(e.onClear, r.value), I("onClear");
    }
    function V(j) {
      e.disabled || f != null && f.disabled.value || (S(e.onClick, j), I("onClick"));
    }
    function W(j) {
      S(e.onChange, j), I("onChange");
    }
    function A(j) {
      return Lc(this, null, function* () {
        var E;
        e.maxlength != null && (j = j.slice(0, Y(e.maxlength))), j !== r.value && (r.value = j, S(e.onChange, j), I("onChange")), yield pt(), (E = t.value) == null || E.focus();
      });
    }
    function T() {
      t.value.focus();
    }
    function B(j) {
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
      n: _k,
      handleInput: D,
      handleClear: U,
      handleClick: V,
      handleChange: W,
      handleBlur: z,
      handleKeyEscape: T,
      handleAutoComplete: A,
      reset: y,
      validate: w,
      resetValidation: d,
      blur: b,
      focus: k
    };
  }
});
kf.render = n$;
var Ma = kf;
re(Ma);
ie(Ma, wf);
const EM = Ma;
var Cl = Ma;
const Vc = (e) => ln(e) ? e.startsWith("data:image") || /\.(png|jpg|gif|jpeg|svg|webp|ico)$/i.test(e) : !1, Fc = (e) => ln(e) ? e.startsWith("data:video") || /\.(mp4|webm|ogg)$/.test(e) : !1, t$ = (e) => {
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
      this.has(t) && Bt(this.cache, t);
    },
    clear() {
      this.cache.length = 0;
    }
  };
}, Sl = (e) => e, Uc = (e) => e ** 3, $f = (e) => e < 0.5 ? Uc(e * 2) / 2 : 1 - Uc((1 - e) * 2) / 2, Zt = (e, n, t = "") => {
  if (e === void 0 && (e = ""), e.length >= n)
    return e;
  const o = n - e.length, r = Math.floor(o / t.length);
  return t.repeat(r) + t.slice(0, o % t.length) + e;
};
var o$ = Object.defineProperty, jc = Object.getOwnPropertySymbols, r$ = Object.prototype.hasOwnProperty, a$ = Object.prototype.propertyIsEnumerable, Hc = (e, n, t) => n in e ? o$(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t, i$ = (e, n) => {
  for (var t in n || (n = {}))
    r$.call(n, t) && Hc(e, t, n[t]);
  if (jc)
    for (var t of jc(n))
      a$.call(n, t) && Hc(e, t, n[t]);
  return e;
}, Ia = (e, n, t) => new Promise((o, r) => {
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
const l$ = "background-image", s$ = "lazy-loading", u$ = "lazy-error", Yc = "lazy-attempt", c$ = ["scroll", "wheel", "mousewheel", "resize", "animationend", "transitionend", "touchmove"], zl = "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==", vo = [], Qr = [], Cf = t$(100), mn = {
  loading: zl,
  error: zl,
  attempt: 3,
  throttleWait: 300,
  events: c$
};
let Su = va(dr, mn.throttleWait);
function Da(e, n) {
  e._lazy.arg === l$ ? e.style.backgroundImage = `url(${n})` : e.setAttribute("src", n);
}
function d$(e) {
  e._lazy.loading && Da(e, e._lazy.loading), dr();
}
function p$(e) {
  e._lazy.error && Da(e, e._lazy.error), e._lazy.state = "error", Pu(e), dr();
}
function Sf(e, n) {
  Da(e, n), e._lazy.state = "success", Pu(e), dr();
}
function m$(e) {
  var n;
  Qr.includes(e) || (Qr.push(e), (n = mn.events) == null || n.forEach((t) => {
    e.addEventListener(t, Su, { passive: !0 });
  }));
}
function f$() {
  Qr.forEach((e) => {
    var n;
    (n = mn.events) == null || n.forEach((t) => {
      e.removeEventListener(t, Su);
    });
  }), Qr.length = 0;
}
function v$(e, n) {
  var t, o;
  const r = {
    loading: (t = e.getAttribute(s$)) != null ? t : mn.loading,
    error: (o = e.getAttribute(u$)) != null ? o : mn.error,
    attempt: e.getAttribute(Yc) ? Number(e.getAttribute(Yc)) : mn.attempt
  };
  e._lazy = i$({
    src: n.value,
    arg: n.arg,
    currentAttempt: 0,
    state: "pending",
    attemptLock: !1
  }, r), Da(e, zl), S(mn.filter, e._lazy);
}
function g$(e, n) {
  const t = new Image();
  t.src = n, e._lazy.preloadImage = t, t.addEventListener("load", () => {
    e._lazy.attemptLock = !1, Cf.add(n), Sf(e, n);
  }), t.addEventListener("error", () => {
    e._lazy.attemptLock = !1, e._lazy.currentAttempt >= e._lazy.attempt ? p$(e) : zf(e);
  });
}
function zf(e) {
  if (e._lazy.attemptLock)
    return;
  e._lazy.attemptLock = !0, e._lazy.currentAttempt++;
  const { src: n } = e._lazy;
  if (Cf.has(n)) {
    Sf(e, n), e._lazy.attemptLock = !1;
    return;
  }
  d$(e), g$(e, n);
}
function zu(e) {
  return Ia(this, null, function* () {
    yield bn(), ou(e) && zf(e);
  });
}
function dr() {
  vo.forEach((e) => zu(e));
}
function h$(e) {
  return Ia(this, null, function* () {
    !vo.includes(e) && vo.push(e), zy(e).forEach(m$), yield zu(e);
  });
}
function Pu(e) {
  Bt(vo, e), vo.length === 0 && f$();
}
function b$(e, n) {
  const { src: t, arg: o } = e._lazy;
  return t !== n.value || o !== n.arg;
}
function Pf(e, n) {
  return Ia(this, null, function* () {
    v$(e, n), yield h$(e);
  });
}
function y$(e, n) {
  return Ia(this, null, function* () {
    if (!b$(e, n)) {
      vo.includes(e) && (yield zu(e));
      return;
    }
    yield Pf(e, n);
  });
}
function w$(e = {}) {
  const { events: n, loading: t, error: o, attempt: r, throttleWait: a, filter: i } = e;
  mn.events = n ?? mn.events, mn.loading = t ?? mn.loading, mn.error = o ?? mn.error, mn.attempt = r ?? mn.attempt, mn.throttleWait = a ?? mn.throttleWait, mn.filter = i;
}
const Of = {
  mounted: Pf,
  unmounted: Pu,
  updated: y$,
  install(e, n) {
    w$(n), Su = va(dr, mn.throttleWait), e.directive("lazy", this);
  }
}, TM = Of;
var Wo = Of;
const Ef = {
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
}, k$ = (e) => ["mini", "small", "normal", "large"].includes(e), { name: $$, n: C$, classes: S$ } = x("avatar"), z$ = ["src", "alt", "lazy-loading", "lazy-error"], P$ = ["src", "alt"];
function O$(e, n) {
  const t = Ge("lazy");
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
        Me,
        { key: 0 },
        [
          e.lazy ? Ne((g(), C("img", {
            key: 0,
            role: "img",
            class: m(e.n("image")),
            src: e.src,
            alt: e.alt,
            style: G({ objectFit: e.fit }),
            "lazy-loading": e.loading,
            "lazy-error": e.error,
            onLoad: n[0] || (n[0] = (...o) => e.handleLoad && e.handleLoad(...o))
          }, null, 46, z$)), [
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
          }, null, 46, P$))
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
const Tf = ee({
  name: $$,
  directives: { Lazy: Wo },
  props: Ef,
  setup(e) {
    const n = $(null), t = $(null), o = $(1);
    yn(r), _o(r);
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
      n: C$,
      classes: S$,
      isInternalSize: k$,
      toSizeUnit: Oe,
      handleLoad: a,
      handleError: i,
      handleClick: l
    };
  }
});
Tf.render = O$;
var Aa = Tf;
re(Aa);
ie(Aa, Ef);
const BM = Aa;
var Pl = Aa;
const Bf = {
  offset: [Number, String],
  vertical: Boolean
}, { name: E$, n: T$, classes: B$ } = x("avatar-group");
function M$(e, n) {
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
const Mf = ee({
  name: E$,
  props: Bf,
  setup(e) {
    return {
      rootStyles: O(() => e.offset == null ? {} : {
        "--mp-avatar-group-offset": Oe(e.offset)
      }),
      n: T$,
      classes: B$
    };
  }
});
Mf.render = M$;
var Na = Mf;
re(Na);
ie(Na, Bf);
const MM = Na;
var Ol = Na;
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
}, { name: I$, n: D$, classes: A$ } = x("loading");
function N$(e, n) {
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
          )) : X("v-if", !0)
        ],
        2
        /* CLASS */
      )) : X("v-if", !0),
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
              L(
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
                  L(
                    "svg",
                    { viewBox: "25 25 50 50" },
                    [
                      L("circle", {
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
          )) : X("v-if", !0),
          (g(!0), C(
            Me,
            null,
            Ke(e.loadingTypeDict, (t, o) => (g(), C(
              Me,
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
                      Me,
                      null,
                      Ke(t, (r) => (g(), C(
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
                )) : X("v-if", !0)
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
                Be(
                  se(e.description),
                  1
                  /* TEXT */
                )
              ])
            ],
            6
            /* CLASS, STYLE */
          )) : X("v-if", !0)
        ],
        2
        /* CLASS */
      )) : X("v-if", !0)
    ],
    2
    /* CLASS */
  );
}
const If = ee({
  name: I$,
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
      n: D$,
      classes: A$,
      multiplySizeUnit: On
    };
  }
});
If.render = N$;
var Ra = If;
re(Ra);
ie(Ra, ut);
const IM = Ra;
var go = Ra, R$ = Object.defineProperty, L$ = Object.defineProperties, V$ = Object.getOwnPropertyDescriptors, Wc = Object.getOwnPropertySymbols, F$ = Object.prototype.hasOwnProperty, U$ = Object.prototype.propertyIsEnumerable, Kc = (e, n, t) => n in e ? R$(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t, qc = (e, n) => {
  for (var t in n || (n = {}))
    F$.call(n, t) && Kc(e, t, n[t]);
  if (Wc)
    for (var t of Wc(n))
      U$.call(n, t) && Kc(e, t, n[t]);
  return e;
}, Xc = (e, n) => L$(e, V$(n));
const Df = {
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
  loadingType: De(ut, "type"),
  /**
   * loading 指示器尺寸
   */
  loadingSize: Xc(qc({}, De(ut, "size")), {
    default: void 0
  }),
  /**
   * loading 指示器颜色
   */
  loadingColor: Xc(qc({}, De(ut, "color")), {
    default: "currentColor"
  }),
  onClick: R(),
  onTouchstart: R()
}, Af = Symbol("BUTTON_GROUP_BIND_BUTTON_KEY");
function j$() {
  const { bindChildren: e, childProviders: n, length: t } = kn(Af);
  return {
    length: t,
    buttons: n,
    bindButtons: e
  };
}
function H$() {
  const { bindParent: e, parentProvider: n, index: t } = wn(Af);
  return {
    index: t,
    buttonGroup: n,
    bindButtonGroup: e
  };
}
var Y$ = Object.defineProperty, W$ = Object.defineProperties, K$ = Object.getOwnPropertyDescriptors, Gc = Object.getOwnPropertySymbols, q$ = Object.prototype.hasOwnProperty, X$ = Object.prototype.propertyIsEnumerable, Zc = (e, n, t) => n in e ? Y$(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t, G$ = (e, n) => {
  for (var t in n || (n = {}))
    q$.call(n, t) && Zc(e, t, n[t]);
  if (Gc)
    for (var t of Gc(n))
      X$.call(n, t) && Zc(e, t, n[t]);
  return e;
}, Z$ = (e, n) => W$(e, K$(n));
function J$(e, n, t, o, r, a) {
  return Ne((g(), we(Qt(e.component), {
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
      e.loading || o.pending ? (g(), we(o.MpLoading, {
        key: 0,
        class: m(o.n("loading")),
        "mp-button-cover": "",
        color: e.loadingColor,
        type: e.loadingType,
        size: e.loadingSize || o.loadingSizeMap[o.states.size],
        radius: e.loadingRadius
      }, null, 8, ["class", "color", "type", "size", "radius"])) : X("v-if", !0),
      L(
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
const Nf = /* @__PURE__ */ ee(Z$(G$({}, {
  name: x("button").name
}), {
  __name: "Button",
  props: Df,
  setup(e, { expose: n }) {
    n();
    const { n: t, classes: o } = x("button"), r = {
      xs: "mini",
      sm: "small",
      md: "normal",
      lg: "large"
    }, a = e, i = $(!1), l = $(!1), { buttonGroup: s } = H$(), { hovering: u, handleHovering: c } = _n(), d = O(() => {
      var w, k, b, z, I, P, M, D, U, V, W, A;
      if (!s)
        return {
          elevation: dn(a.elevation, 2),
          status: (w = a.status) != null ? w : "default",
          variant: (k = a.variant) != null ? k : "default",
          size: (b = a.size) != null ? b : "md",
          color: a.color,
          textColor: a.textColor,
          iconContainer: a.iconContainer,
          stacked: (z = a.stacked) != null ? z : !1,
          disabled: (I = a.disabled) != null ? I : !1
        };
      const { status: T, size: B, variant: j, color: E, textColor: J, disabled: q, stacked: ne } = s;
      return {
        elevation: "",
        status: (P = a.status) != null ? P : T.value,
        size: (M = a.size) != null ? M : B.value,
        variant: (D = a.variant) != null ? D : j.value,
        color: (U = a.color) != null ? U : E.value,
        textColor: (V = a.textColor) != null ? V : J.value,
        iconContainer: a.iconContainer,
        stacked: (W = a.stacked) != null ? W : ne.value,
        disabled: (A = a.disabled) != null ? A : q.value
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
      const { loading: k, onClick: b } = a;
      !b || k || d.value.disabled || l.value || p(S(b, w));
    }
    function h(w) {
      const { loading: k, onTouchstart: b } = a;
      !b || k || d.value.disabled || l.value || p(S(b, w));
    }
    function v() {
      a.focusable && (i.value = !0);
    }
    const y = { n: t, classes: o, loadingSizeMap: r, props: a, isFocusing: i, pending: l, buttonGroup: s, hovering: u, handleHovering: c, states: d, attemptAutoLoading: p, handleClick: f, handleTouchstart: h, handleFocus: v, get vHover() {
      return Dn;
    }, get MpHoverOverlay() {
      return Vn;
    }, get MpLoading() {
      return go;
    }, get vRipple() {
      return on;
    } };
    return Object.defineProperty(y, "__isScriptSetup", { enumerable: !1, value: !0 }), y;
  }
}));
Nf.render = J$;
var La = Nf;
re(La);
ie(La, Df);
const DM = La;
var Mn = La;
const Rf = {
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
}, { name: Q$, n: x$, classes: _$ } = x("back-top");
function eC(e, n) {
  const t = te("mp-icon"), o = te("mp-button");
  return g(), we(it, {
    to: "body",
    disabled: e.disabled
  }, [
    L(
      "div",
      He({
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
const Lf = ee({
  name: Q$,
  components: {
    MpButton: Mn,
    MpIcon: Ze
  },
  inheritAttrs: !1,
  props: Rf,
  setup(e) {
    const n = $(!1), t = $(null), o = $(!0);
    let r;
    const a = va(() => {
      i();
    }, 200);
    ht(() => {
      s(), u(), i(), o.value = !1;
    }), Rt(u), rr(c);
    function i() {
      n.value = vt(r) >= tn(e.visibilityHeight);
    }
    function l(d) {
      S(e.onClick, d);
      const p = or(r);
      Lo(r, {
        left: p,
        duration: e.duration,
        animation: $f
      });
    }
    function s() {
      r = e.target ? Vm(e.target, "BackTop") : Dt(t.value);
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
      toSizeUnit: Oe,
      n: x$,
      classes: _$,
      handleClick: l
    };
  }
});
Lf.render = eC;
var Va = Lf;
re(Va);
ie(Va, Rf);
const AM = Va;
var El = Va;
const Vf = {
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
var nC = Object.defineProperty, tC = Object.defineProperties, oC = Object.getOwnPropertyDescriptors, Jc = Object.getOwnPropertySymbols, rC = Object.prototype.hasOwnProperty, aC = Object.prototype.propertyIsEnumerable, Qc = (e, n, t) => n in e ? nC(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t, iC = (e, n) => {
  for (var t in n || (n = {}))
    rC.call(n, t) && Qc(e, t, n[t]);
  if (Jc)
    for (var t of Jc(n))
      aC.call(n, t) && Qc(e, t, n[t]);
  return e;
}, lC = (e, n) => tC(e, oC(n));
function sC(e, n, t, o, r, a) {
  return g(), C(
    "span",
    {
      class: m(o.wrapperClass)
    },
    [
      L(
        "div",
        {
          class: m(o.n("wrapper"))
        },
        [
          o.showValue ? (g(), C(
            Me,
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
                  L(
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
                  L(
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
              )) : X("v-if", !0)
            ],
            64
            /* STABLE_FRAGMENT */
          )) : X("v-if", !0),
          o.slots.default || e.description ? (g(), C(
            "span",
            {
              key: 1,
              class: m(o.n("description-wrapper"))
            },
            [
              F(e.$slots, "default", {}, () => [
                Be(
                  se(e.description),
                  1
                  /* TEXT */
                )
              ])
            ],
            2
            /* CLASS */
          )) : X("v-if", !0)
        ],
        2
        /* CLASS */
      )
    ],
    2
    /* CLASS */
  );
}
const Ff = /* @__PURE__ */ ee(lC(iC({}, {
  name: x("badge").name
}), {
  __name: "Badge",
  props: Vf,
  setup(e, { expose: n }) {
    n();
    const { n: t, classes: o } = x("badge"), r = e, a = Mp(), i = O(() => !a.default && !r.description ? "inline" : r.type), l = O(() => (typeof r.content > "u", r.dot)), s = O(() => typeof r.content == "number" ? r.content : null), u = O(() => s.value !== null), c = O(() => r.show ? u.value ? r.showZero ? !0 : !!(s.value && s.value > 0) : !0 : !1), d = O(
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
Ff.render = sC;
var Fa = Ff;
re(Fa);
ie(Fa, Vf);
const NM = Fa;
var xr = Fa;
const Uf = {
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
}, jf = Symbol(
  "BOTTOM_NAVIGATION_BIND_BOTTOM_NAVIGATION_ITEM_KEY"
);
function uC() {
  const { childProviders: e, length: n, bindChildren: t } = kn(
    jf
  );
  return {
    length: n,
    bottomNavigationItems: e,
    bindBottomNavigationItem: t
  };
}
var cC = Object.defineProperty, xc = Object.getOwnPropertySymbols, dC = Object.prototype.hasOwnProperty, pC = Object.prototype.propertyIsEnumerable, _c = (e, n, t) => n in e ? cC(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t, ed = (e, n) => {
  for (var t in n || (n = {}))
    dC.call(n, t) && _c(e, t, n[t]);
  if (xc)
    for (var t of xc(n))
      pC.call(n, t) && _c(e, t, n[t]);
  return e;
};
const { name: mC, n: fC, classes: vC } = x("bottom-navigation"), { n: Ua } = x("bottom-navigation-item"), nd = Ua("--mp-right-half-space"), td = Ua("--mp-left-half-space"), od = Ua("--mp-right-space"), gC = {
  status: "primary"
};
function hC(e, n) {
  const t = te("mp-button");
  return g(), C(
    Me,
    null,
    [
      L(
        "div",
        He({
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
          e.$slots.fab ? (g(), we(t, He({
            key: 0,
            class: e.classes(e.n("fab"), [e.length % 2, e.n("--fab-right"), e.n("--fab-center")]),
            "mp-bottom-navigation__fab": ""
          }, e.fabProps, { onClick: e.handleFabClick }), {
            default: ue(() => [
              F(e.$slots, "fab")
            ]),
            _: 3
            /* FORWARDED */
          }, 16, ["class", "onClick"])) : X("v-if", !0)
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
      )) : X("v-if", !0)
    ],
    64
    /* STABLE_FRAGMENT */
  );
}
const Hf = ee({
  name: mC,
  components: { MpButton: Mn },
  props: Uf,
  setup(e, { slots: n }) {
    const t = $(null), o = O(() => e.active), r = O(() => e.activeColor), a = O(() => e.inactiveColor), i = O(() => e.variant), l = $(), s = $({}), { length: u, bottomNavigationItems: c, bindBottomNavigationItem: d } = uC();
    d({
      active: o,
      activeColor: r,
      inactiveColor: a,
      variant: i,
      onToggle: w
    }), pe(() => u.value, f), pe(
      () => e.fabProps,
      (V) => {
        s.value = ed(ed({}, gC), V);
      },
      { immediate: !0, deep: !0 }
    ), nt(U), yn(() => {
      U(), n.fab && I(u.value);
    }), _o(() => {
      z(), n.fab && I(u.value);
    });
    function f() {
      u.value === 0 || h() || v() || y();
    }
    function h() {
      return c.find(({ name: V }) => o.value === V.value);
    }
    function v() {
      return c.find(({ index: V }) => o.value === V.value);
    }
    function y() {
      zn(o.value) && (o.value < 0 ? S(e["onUpdate:active"], 0) : o.value > u.value - 1 && S(e["onUpdate:active"], u.value - 1));
    }
    function w(V) {
      o.value !== V && (e.onBeforeChange ? k(V) : b(V));
    }
    function k(V) {
      const W = dt(S(e.onBeforeChange, V));
      Promise.all(W).then((A) => {
        A.every(Boolean) && b(V);
      });
    }
    function b(V) {
      S(e["onUpdate:active"], V), S(e.onChange, V);
    }
    function z() {
      M().forEach((W) => {
        W.classList.remove(nd, td, od);
      });
    }
    function I(V) {
      const W = M(), A = W.length, T = V % 2 === 0;
      W.forEach((B, j) => {
        P(T, B, j, A);
      });
    }
    function P(V, W, A, T) {
      const B = A === T - 1;
      if (!V && B) {
        W.classList.add(od);
        return;
      }
      const j = A === T / 2 - 1, E = A === T / 2;
      j ? W.classList.add(nd) : E && W.classList.add(td);
    }
    function M() {
      return Array.from(t.value.querySelectorAll(`.${Ua()}`));
    }
    function D() {
      S(e.onFabClick);
    }
    function U() {
      if (!e.fixed || !e.placeholder)
        return;
      const { height: V } = nn(t.value);
      l.value = Oe(V);
    }
    return {
      length: u,
      bottomNavigationDom: t,
      fabProps: s,
      placeholderHeight: l,
      n: fC,
      classes: vC,
      handleFabClick: D
    };
  }
});
Hf.render = hC;
var ja = Hf;
re(ja);
ie(ja, Uf);
const RM = ja;
var Tl = ja;
const Yf = {
  name: String,
  label: String,
  icon: De(cn, "name"),
  namespace: De(cn, "namespace"),
  badge: {
    type: [Boolean, Object],
    default: !1
  },
  onClick: R()
};
function bC() {
  const { parentProvider: e, index: n, bindParent: t } = wn(
    jf
  );
  return Xn(!!t, "BottomNavigationItem", "<mp-bottom-navigation-item/> must in <mp-bottom-navigation/>"), {
    index: n,
    bottomNavigation: e,
    bindBottomNavigation: t
  };
}
const { name: yC, n: wC, classes: kC } = x("bottom-navigation-item"), $C = {
  status: "danger",
  dot: !0
};
function CC(e, n) {
  const t = te("mp-icon"), o = te("mp-badge"), r = Ge("ripple");
  return Ne((g(), C(
    "button",
    {
      class: m(e.classes(e.n(), e.n("$--box"), [e.variant, e.n("--variant-padding")], [e.isActive && !e.variant, e.n("--active")])),
      style: G({
        color: e.isActive ? e.activeColor : e.inactiveColor
      }),
      onClick: n[0] || (n[0] = (...a) => e.handleClick && e.handleClick(...a))
    },
    [
      L(
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
          e.badge ? (g(), we(o, He({ key: 0 }, e.badgeProps, {
            class: e.n("badge"),
            "mp-bottom-navigation-item-cover": ""
          }), {
            default: ue(() => [
              F(e.$slots, "icon", { active: e.isActive }, () => [
                e.icon ? (g(), we(t, {
                  key: 0,
                  name: e.icon,
                  namespace: e.namespace,
                  class: m(e.n("icon")),
                  "mp-bottom-navigation-item-cover": ""
                }, null, 8, ["name", "namespace", "class"])) : X("v-if", !0)
              ])
            ]),
            _: 3
            /* FORWARDED */
          }, 16, ["class"])) : F(e.$slots, "icon", {
            key: 1,
            active: e.isActive
          }, () => [
            e.icon ? (g(), we(t, {
              key: 0,
              name: e.icon,
              namespace: e.namespace,
              class: m(e.n("icon")),
              "mp-bottom-navigation-item-cover": ""
            }, null, 8, ["name", "namespace", "class"])) : X("v-if", !0)
          ])
        ],
        2
        /* CLASS */
      ),
      L(
        "span",
        {
          class: m(e.n("label"))
        },
        [
          F(e.$slots, "default", {}, () => [
            Be(
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
const Wf = ee({
  name: yC,
  components: {
    MpBadge: xr,
    MpIcon: Ze
  },
  directives: { Ripple: on },
  props: Yf,
  setup(e) {
    const n = O(() => e.name), t = O(() => [n.value, r.value].includes(l.value)), o = O(() => e.badge === !0 ? $C : e.badge), { index: r, bottomNavigation: a, bindBottomNavigation: i } = bC(), { active: l, activeColor: s, inactiveColor: u, variant: c } = a;
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
      n: wC,
      classes: kC,
      handleClick: p
    };
  }
});
Wf.render = CC;
var Ha = Wf;
re(Ha);
ie(Ha, Yf);
const LM = Ha;
var Bl = Ha;
const Kf = {
  separator: {
    type: String,
    default: "/"
  }
}, qf = Symbol("BREADCRUMB_BIND_BREADCRUMB_ITEM_KEY");
function SC() {
  const { childProviders: e, bindChildren: n, length: t } = kn(
    qf
  );
  return {
    length: t,
    breadcrumbItems: e,
    bindBreadcrumbItems: n
  };
}
const { name: zC, n: PC } = x("breadcrumb");
function OC(e, n) {
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
const Xf = ee({
  name: zC,
  props: Kf,
  setup(e) {
    const n = O(() => e.separator), { bindBreadcrumbItems: t, length: o } = SC();
    return t({
      length: o,
      separator: n
    }), { n: PC };
  }
});
Xf.render = OC;
var Ya = Xf;
re(Ya);
ie(Ya, Kf);
const VM = Ya;
var Ml = Ya;
const Gf = {
  separator: String,
  onClick: R()
};
function EC() {
  const { parentProvider: e, bindParent: n, index: t } = wn(
    qf
  );
  return {
    index: t,
    breadcrumb: e,
    bindBreadcrumb: n
  };
}
const { name: TC, n: BC, classes: MC } = x("breadcrumb-item");
function IC(e, n) {
  return g(), C(
    "div",
    {
      class: m(e.n())
    },
    [
      L(
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
      e.isLast ? X("v-if", !0) : F(e.$slots, "separator", { key: 0 }, () => {
        var t;
        return [
          L(
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
const Zf = ee({
  name: TC,
  props: Gf,
  setup(e) {
    const { index: n, breadcrumb: t, bindBreadcrumb: o } = EC(), r = O(() => !t || !n ? !1 : n.value === t.length.value - 1), a = O(() => t == null ? void 0 : t.separator.value);
    o == null || o(null);
    function i(l) {
      r.value || S(e.onClick, l);
    }
    return {
      n: BC,
      classes: MC,
      isLast: r,
      parentSeparator: a,
      handleClick: i
    };
  }
});
Zf.render = IC;
var Wa = Zf;
re(Wa);
ie(Wa, Gf);
const FM = Wa;
var Il = Wa;
const Jf = {
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
var DC = Object.defineProperty, AC = Object.defineProperties, NC = Object.getOwnPropertyDescriptors, rd = Object.getOwnPropertySymbols, RC = Object.prototype.hasOwnProperty, LC = Object.prototype.propertyIsEnumerable, ad = (e, n, t) => n in e ? DC(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t, VC = (e, n) => {
  for (var t in n || (n = {}))
    RC.call(n, t) && ad(e, t, n[t]);
  if (rd)
    for (var t of rd(n))
      LC.call(n, t) && ad(e, t, n[t]);
  return e;
}, FC = (e, n) => AC(e, NC(n));
function UC(e, n, t, o, r, a) {
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
const Qf = /* @__PURE__ */ ee(FC(VC({}, {
  name: x("button-group").name
}), {
  __name: "ButtonGroup",
  props: Jf,
  setup(e, { expose: n }) {
    const { n: t, classes: o } = x("button-group"), r = e, { bindButtons: a } = j$(), i = {
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
      return dn;
    } };
    return Object.defineProperty(l, "__isScriptSetup", { enumerable: !1, value: !0 }), l;
  }
}));
Qf.render = UC;
var Ka = Qf;
re(Ka);
ie(Ka, Jf);
const UM = Ka;
var Dl = Ka;
const xf = {
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
var jC = (e, n, t) => new Promise((o, r) => {
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
const { name: HC, n: YC, classes: WC } = x("card"), KC = 500, qC = ["src", "alt"];
function XC(e, n) {
  const t = te("mp-icon"), o = te("mp-button"), r = Ge("ripple");
  return Ne((g(), C(
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
      L(
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
            }, null, 14, qC)) : X("v-if", !0)
          ]),
          L(
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
                )) : X("v-if", !0)
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
                )) : X("v-if", !0)
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
              )) : X("v-if", !0),
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
                )) : X("v-if", !0)
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
              )) : X("v-if", !0),
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
              )) : X("v-if", !0)
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
          )) : X("v-if", !0)
        ],
        6
        /* CLASS, STYLE */
      ),
      L(
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
const _f = ee({
  name: HC,
  directives: { Ripple: on },
  components: {
    MpIcon: Ze,
    MpButton: Mn
  },
  props: xf,
  setup(e) {
    const n = $(null), t = $(null), o = $("auto"), r = $("auto"), a = $("100%"), i = $("100%"), l = $("auto"), s = $("auto"), u = $(void 0), c = $("hidden"), d = $("0px"), p = $("0"), f = O(() => e.layout === "row"), h = $(!1), v = $(!1), { zIndex: y } = lr(() => e.floating, 1);
    let w = "auto", k = "auto", b = null;
    const z = $(null);
    ir(
      () => e.floating,
      () => !f.value
    ), pe(
      () => e.floating,
      (U) => {
        f.value || Ye(() => {
          U ? I() : P();
        });
      },
      { immediate: !0 }
    );
    function I() {
      clearTimeout(z.value), clearTimeout(b), z.value = null, z.value = setTimeout(
        () => jC(this, null, function* () {
          const { width: U, height: V, left: W, top: A } = nn(n.value);
          o.value = Oe(U), r.value = Oe(V), a.value = o.value, i.value = r.value, l.value = Oe(A), s.value = Oe(W), u.value = "fixed", w = l.value, k = s.value, h.value = !0, yield bn(), l.value = "0", s.value = "0", a.value = "100vw", i.value = "100vh", d.value = "auto", p.value = "1", c.value = "auto", v.value = !0;
        }),
        e.ripple ? KC : 0
      );
    }
    function P() {
      clearTimeout(b), clearTimeout(z.value), z.value = null, a.value = o.value, i.value = r.value, l.value = w, s.value = k, d.value = "0px", p.value = "0", h.value = !1, b = setTimeout(() => {
        o.value = "auto", r.value = "auto", a.value = "100%", i.value = "100%", l.value = "auto", s.value = "auto", w = "auto", k = "auto", c.value = "hidden", u.value = void 0, v.value = !1;
      }, e.floatingDuration);
    }
    function M() {
      S(e["onUpdate:floating"], !1);
    }
    function D(U) {
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
      n: YC,
      classes: WC,
      toSizeUnit: Oe,
      close: M,
      formatElevation: dn,
      handleClick: D
    };
  }
});
_f.render = XC;
var qa = _f;
re(qa);
ie(qa, xf);
const jM = qa;
var Al = qa;
const ev = {
  title: String,
  icon: De(cn, "name"),
  namespace: De(cn, "namespace"),
  description: String,
  border: Boolean,
  borderOffset: [Number, String],
  iconClass: String,
  titleClass: String,
  descriptionClass: String,
  extraClass: String,
  ripple: Boolean,
  onClick: R()
}, { name: GC, n: ZC, classes: JC } = x("cell");
function QC(e, n) {
  const t = te("mp-icon"), o = Ge("ripple");
  return Ne((g(), C(
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
        )) : X("v-if", !0)
      ]),
      L(
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
            )) : X("v-if", !0)
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
            )) : X("v-if", !0)
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
      )) : X("v-if", !0)
    ],
    6
    /* CLASS, STYLE */
  )), [
    [o, { disabled: !e.ripple }]
  ]);
}
const nv = ee({
  name: GC,
  components: { MpIcon: Ze },
  directives: { Ripple: on },
  props: ev,
  setup(e) {
    const n = O(() => e.borderOffset == null ? {} : {
      "--mp-cell-border-left": Oe(e.borderOffset),
      "--mp-cell-border-right": Oe(e.borderOffset)
    });
    function t(o) {
      S(e.onClick, o);
    }
    return {
      borderOffsetStyles: n,
      n: ZC,
      classes: JC,
      toSizeUnit: Oe,
      handleClick: t
    };
  }
});
nv.render = QC;
var Xa = nv;
re(Xa);
ie(Xa, ev);
const HM = Xa;
var Nl = Xa;
const tv = {
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
}, { name: xC, n: _C, classes: eS } = x("checkbox-group");
function nS(e, n) {
  const t = te("maybe-v-node"), o = te("mp-checkbox"), r = te("mp-form-details");
  return g(), C(
    "div",
    {
      class: m(e.n("wrap"))
    },
    [
      L(
        "div",
        {
          class: m(e.classes(e.n(), e.n(`--${e.direction}`)))
        },
        [
          e.options.length ? (g(!0), C(
            Me,
            { key: 0 },
            Ke(e.options, (a) => (g(), we(o, {
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
          )) : X("v-if", !0),
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
const ov = ee({
  name: xC,
  components: { MpFormDetails: Bn, MpCheckbox: co, MaybeVNode: ar },
  props: tv,
  setup(e) {
    const n = O(() => e.max), t = O(() => e.modelValue.length), { length: o, checkboxes: r, bindCheckboxes: a } = Z1(), { bindForm: i } = jn(), {
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
      validate: I,
      resetValidation: c,
      reset: z,
      errorMessage: d
    };
    pe(() => e.modelValue, w, { deep: !0 }), pe(() => o.value, w), a(p), S(i, p);
    function f(P) {
      Ye(() => {
        const { validateTrigger: M, rules: D, modelValue: U } = e;
        s(M, P, D, U);
      });
    }
    function h(P) {
      S(e["onUpdate:modelValue"], P), S(e.onChange, P), f("onChange");
    }
    function v(P) {
      const { modelValue: M } = e;
      M.includes(P) || h([...M, P]);
    }
    function y(P) {
      const { modelValue: M } = e;
      M.includes(P) && h(M.filter((D) => D !== P));
    }
    function w() {
      r.forEach(({ sync: P }) => P(e.modelValue));
    }
    function k() {
      const P = r.map(({ checkedValue: D }) => D.value), M = ml(P);
      return S(e["onUpdate:modelValue"], M), M;
    }
    function b() {
      const P = r.filter(({ checked: D }) => !D.value).map(({ checkedValue: D }) => D.value), M = ml(P);
      return S(e["onUpdate:modelValue"], M), M;
    }
    function z() {
      S(e["onUpdate:modelValue"], []), c();
    }
    function I() {
      return u(e.rules, e.modelValue);
    }
    return {
      errorMessage: l,
      n: _C,
      classes: eS,
      checkAll: k,
      inverseAll: b,
      reset: z,
      validate: I,
      resetValidation: c,
      isFunction: vn
    };
  }
});
ov.render = nS;
var Ga = ov;
re(Ga);
ie(Ga, tv);
const YM = Ga;
var Rl = Ga;
const rv = {
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
  iconName: De(cn, "name"),
  namespace: De(cn, "namespace"),
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
}, { name: tS, n: yt, classes: oS } = x("chip");
function rS(e, n) {
  const t = te("mp-icon");
  return g(), we(Qe, {
    name: e.n("$-fade")
  }, {
    default: ue(() => [
      L(
        "span",
        He({
          class: e.classes(e.n(), e.n("$--box"), e.formatElevation(e.elevation, 1), ...e.contentClass),
          style: e.chipStyle
        }, e.$attrs),
        [
          F(e.$slots, "left"),
          L(
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
          )) : X("v-if", !0)
        ],
        16
        /* FULL_PROPS */
      )
    ]),
    _: 3
    /* FORWARDED */
  }, 8, ["name"]);
}
const av = ee({
  name: tS,
  components: {
    MpIcon: Ze
  },
  inheritAttrs: !1,
  props: rv,
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
      const { size: r, block: a, type: i, plain: l, round: s } = e, u = yt(a ? "$--flex" : "$--inline-flex"), c = l ? `${yt("plain")} ${yt(`plain-${i}`)}` : yt(`--${i}`), d = s ? yt("--round") : null;
      return [yt(`--${r}`), u, c, d];
    });
    function o(r) {
      S(e.onClose, r);
    }
    return {
      chipStyle: n,
      contentClass: t,
      n: yt,
      classes: oS,
      formatElevation: dn,
      handleClose: o
    };
  }
});
av.render = rS;
var Za = av;
re(Za);
ie(Za, rv);
const WM = Za;
var _r = Za;
const Ll = Symbol("HIGHLIGHTER_PROVIDER_KEY");
function aS(e) {
  Gs(Ll, e);
}
function iS() {
  return au(Ll) ? Xs(Ll) : { highlighter: null, theme: null };
}
const iv = {
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
var lS = (e, n, t) => new Promise((o, r) => {
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
const { name: sS, n: uS, classes: cS } = x("code"), dS = ["innerHTML"];
function pS(e, n) {
  return g(), C("div", {
    class: m(e.classes(e.n(), [e.wordWrap, e.n("--word-wrap")])),
    innerHTML: e.highlightedCode
  }, null, 10, dS);
}
const lv = ee({
  name: sS,
  props: iv,
  setup(e) {
    const { highlighter: n, theme: t } = iS(), o = $(""), r = O(() => {
      var a;
      return (a = e.theme) != null ? a : t == null ? void 0 : t.value;
    });
    return n && pe(
      () => [n.value, e.code, e.language, r.value, e.trim],
      (a) => lS(this, [a], function* ([i, l, s = "", u = "", c]) {
        i && (o.value = yield i.codeToHtml(c ? l.trim() : l, { lang: s, theme: u }));
      }),
      { immediate: !0 }
    ), {
      n: uS,
      classes: cS,
      highlightedCode: o
    };
  }
});
lv.render = pS;
var Ja = lv;
re(Ja);
ie(Ja, iv);
const KM = Ja;
var Vl = Ja;
const sv = {
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
}, uv = Symbol("ROW_BIND_COL_KEY");
function mS() {
  const { length: e, childProviders: n, bindChildren: t } = kn(uv);
  return {
    length: e,
    cols: n,
    bindCols: t
  };
}
function fS() {
  const { index: e, bindParent: n, parentProvider: t } = wn(uv);
  return {
    index: e,
    row: t,
    bindRow: n
  };
}
const { name: vS, n: br, classes: gS } = x("col");
function hS(e, n) {
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
const cv = ee({
  name: vS,
  props: sv,
  setup(e) {
    const n = O(() => Y(e.span)), t = O(() => Y(e.offset)), o = O(() => {
      var s;
      const [u = 0, c = 0] = (s = r == null ? void 0 : r.average.value) != null ? s : [];
      return { left: c, right: c, top: u, bottom: u };
    }), { row: r, bindRow: a } = fS();
    S(a, null);
    function i(s, u) {
      const c = [];
      if (u == null)
        return c;
      if (Ln(u)) {
        const { offset: d, span: p } = u;
        return Number(p) >= 0 && c.push(br(`--span-${s}-${p}`)), d && c.push(br(`--offset-${s}-${d}`)), c;
      }
      return Number(u) >= 0 && c.push(br(`--span-${s}-${u}`)), c;
    }
    function l(s) {
      S(e.onClick, s);
    }
    return {
      span: n,
      offset: t,
      padding: o,
      n: br,
      classes: gS,
      toNumber: Y,
      toSizeUnit: Oe,
      getSize: i,
      handleClick: l,
      padStartFlex: Zr
    };
  }
});
cv.render = hS;
var Qa = cv;
re(Qa);
ie(Qa, sv);
const qM = Qa;
var Fl = Qa;
const dv = {
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
}, pv = Symbol("COLLAPSE_BIND_COLLAPSE_ITEM_KEY");
function bS() {
  const { childProviders: e, length: n, bindChildren: t } = kn(
    pv
  );
  return {
    length: n,
    collapseItems: e,
    bindCollapseItems: t
  };
}
const { name: yS, n: wS } = x("collapse");
function kS(e, n) {
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
const mv = ee({
  name: yS,
  props: dv,
  setup(e) {
    const n = O(() => e.offset), t = O(() => e.divider), o = O(() => e.elevation), r = O(() => e.accordion), a = O(() => dt(e.modelValue)), { length: i, collapseItems: l, bindCollapseItems: s } = bS(), u = {
      offset: n,
      divider: t,
      elevation: o,
      accordion: r,
      updateItem: c
    };
    pe(
      () => i.value,
      () => Ye().then(f)
    ), pe(
      () => e.modelValue,
      () => Ye().then(f)
    ), s(u);
    function c(v, y) {
      if (e.accordion) {
        d(y ? v : void 0);
        return;
      }
      const w = y ? [...a.value, v] : a.value.filter((k) => k !== v);
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
        const k = l.find(({ name: b }) => w === b.value);
        return k ?? l.find(({ index: b, name: z }) => z.value == null && w === b.value);
      }
      const v = l.filter(
        ({ name: w }) => w.value != null && a.value.includes(w.value)
      ), y = l.filter(
        ({ index: w, name: k }) => k.value == null && a.value.includes(w.value)
      );
      return [...v, ...y];
    }
    function f() {
      const v = Xp(dt(p()));
      l.forEach((y) => {
        y.init(v.includes(y));
      });
    }
    return {
      divider: t,
      n: wS,
      toggleAll: (v) => {
        if (e.accordion)
          return;
        const w = l.filter((k) => {
          var b;
          const z = (b = k.name.value) != null ? b : k.index.value, I = a.value.includes(z);
          return v.skipDisabled && k.disabled.value ? I : v.expand === "inverse" ? !I : v.expand;
        }).map((k) => {
          var b;
          return (b = k.name.value) != null ? b : k.index.value;
        });
        d(w);
      }
    };
  }
});
mv.render = kS;
var xa = mv;
re(xa);
ie(xa, dv);
const XM = xa;
var Ul = xa, id = (e, n, t) => new Promise((o, r) => {
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
function fv(e) {
  const { contentEl: n, showContent: t, expand: o } = e;
  let r = !0;
  pe(
    o,
    (u) => {
      Ye(() => {
        u ? a() : i();
      });
    },
    { immediate: !0 }
  );
  function a() {
    return id(this, null, function* () {
      if (!n.value || (n.value.style.height = "", t.value = !0, yield pt(), !n.value))
        return;
      const { offsetHeight: u } = n.value;
      n.value.style.height = "0px", yield pt(), n.value && (n.value.style.height = u + "px", r && (yield bn(), r && l()));
    });
  }
  const i = () => id(this, null, function* () {
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
const vv = {
  name: [String, Number],
  title: String,
  icon: {
    type: String,
    default: "chevron-down"
  },
  disabled: Boolean
};
function $S() {
  const { parentProvider: e, index: n, bindParent: t } = wn(
    pv
  );
  return Xn(!!t, "Collapse", "<mp-collapse-item/> must in <mp-collapse>"), {
    index: n,
    collapse: e,
    bindCollapse: t
  };
}
const { name: CS, n: SS, classes: zS } = x("collapse-item"), PS = ["aria-expanded", "aria-disabled", "role"];
function OS(e, n) {
  const t = te("mp-icon");
  return g(), C(
    "div",
    {
      class: m(e.classes(e.n(), [e.offset && e.isShow, e.n("--active")], [e.disabled, e.n("--disable")])),
      style: G(`--mp-collapse-divider-top: ${e.divider ? "var(--mp-collapse-border-top)" : "none"}`)
    },
    [
      L(
        "div",
        {
          class: m(e.classes(e.n("shadow"), e.formatElevation(e.elevation, 2)))
        },
        null,
        2
        /* CLASS */
      ),
      L("div", {
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
              Be(
                se(e.title),
                1
                /* TEXT */
              )
            ])
          ],
          2
          /* CLASS */
        )) : X("v-if", !0),
        L(
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
      ], 10, PS),
      Ne(L(
        "div",
        {
          ref: "contentEl",
          class: m(e.n("content")),
          onTransitionend: n[1] || (n[1] = (...o) => e.handleTransitionEnd && e.handleTransitionEnd(...o)),
          onTransitionstart: n[2] || (n[2] = (...o) => e.handleTransitionStart && e.handleTransitionStart(...o))
        },
        [
          L(
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
const gv = ee({
  name: CS,
  components: {
    MpIcon: Ze
  },
  props: vv,
  setup(e) {
    const n = $(!1), t = $(!1), o = $(null), r = O(() => e.name), a = O(() => e.disabled), { index: i, collapse: l, bindCollapse: s } = $S(), { offset: u, divider: c, elevation: d, accordion: p, updateItem: f } = l;
    s({
      index: i,
      name: r,
      disabled: a,
      init: w
    });
    const { handleTransitionEnd: v, handleTransitionStart: y } = fv({
      contentEl: o,
      showContent: t,
      expand: n
    });
    function w(b) {
      n.value = b;
    }
    function k() {
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
      n: SS,
      classes: zS,
      toggle: k,
      formatElevation: dn,
      handleTransitionEnd: v,
      handleTransitionStart: y
    };
  }
});
gv.render = OS;
var _a = gv;
re(_a);
ie(_a, vv);
const GM = _a;
var jl = _a;
const hv = {
  expand: Boolean
}, { name: ES, n: TS } = x("collapse-transition");
function BS(e, n) {
  return Ne((g(), C(
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
const bv = ee({
  name: ES,
  props: hv,
  setup(e) {
    const n = $(!1), t = $(null), o = O(() => e.expand), { handleTransitionEnd: r, handleTransitionStart: a } = fv({
      contentEl: t,
      showContent: n,
      expand: o
    });
    return {
      showContent: n,
      contentEl: t,
      n: TS,
      handleTransitionEnd: r,
      handleTransitionStart: a
    };
  }
});
bv.render = BS;
var ei = bv;
re(ei);
ie(ei, hv);
const ZM = ei;
var Hl = ei;
const yv = {
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
}, { name: MS, n: IS } = x("count-to");
function DS(e, n) {
  return g(), C(
    "div",
    {
      class: m(e.n())
    },
    [
      F(e.$slots, "default", { value: e.value }, () => [
        Be(
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
const wv = ee({
  name: MS,
  props: yv,
  setup(e) {
    const {
      value: n,
      reset: t,
      // expose
      start: o,
      // expose
      pause: r
    } = R0({
      from: () => Y(e.from),
      to: () => Y(e.to),
      duration: () => Y(e.duration),
      timingFunction: e.timingFunction,
      onFinished() {
        S(e.onEnd);
      }
    }), a = O(() => fl(n.value, Y(e.precision)));
    pe(() => [e.from, e.to, e.duration], i), ht(i);
    function i() {
      t(), e.autoStart && o();
    }
    return {
      value: a,
      n: IS,
      start: o,
      pause: r,
      reset: i,
      toNumber: Y,
      floor: fl
    };
  }
});
wv.render = DS;
var ni = wv;
re(ni);
ie(ni, yv);
const JM = ni;
var Yl = ni;
const kv = {
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
}, { name: AS, n: NS } = x("countdown"), Wl = 1e3, Kl = 60 * Wl, ql = 60 * Kl, ld = 24 * ql;
function RS(e, n) {
  return g(), C(
    "div",
    {
      class: m(e.n())
    },
    [
      F(e.$slots, "default", Yt(ca(e.timeData)), () => [
        Be(
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
const $v = ee({
  name: AS,
  props: kv,
  setup(e) {
    const n = $(""), t = $({
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
    }), Rt(() => {
      l != null && (r = l, r === !0 && d(!0));
    }), wo(() => {
      l = r, p();
    }), Qo(p);
    function s(h, v) {
      const y = Object.values(v), w = ["DD", "HH", "mm", "ss"], k = [24, 60, 60, 1e3];
      if (w.forEach((b, z) => {
        h.includes(b) ? h = h.replace(b, Zt(`${y[z]}`, 2, "0")) : y[z + 1] += y[z] * k[z];
      }), h.includes("S")) {
        const b = Zt(`${y[y.length - 1]}`, 3, "0");
        h.includes("SSS") ? h = h.replace("SSS", b) : h.includes("SS") ? h = h.replace("SS", b.slice(0, 2)) : h = h.replace("S", b.slice(0, 1));
      }
      return h;
    }
    function u(h) {
      const v = Math.floor(h / ld), y = Math.floor(h % ld / ql), w = Math.floor(h % ql / Kl), k = Math.floor(h % Kl / Wl), b = Math.floor(h % Wl), z = {
        days: v,
        hours: y,
        minutes: w,
        seconds: k,
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
      r && (a = Mt(c));
    }
    function d(h = !1) {
      r && !h || (r = !0, o = performance.now() + (i || Y(e.time)), c());
    }
    function p() {
      r = !1, uo(a);
    }
    function f() {
      o = 0, r = !1, uo(a), c();
    }
    return {
      showTime: n,
      timeData: t,
      n: NS,
      start: d,
      pause: p,
      reset: f
    };
  }
});
$v.render = RS;
var ti = $v;
re(ti);
ie(ti, kv);
const QM = ti;
var Xl = ti;
/*!
 *  decimal.js v10.6.0
 *  An arbitrary-precision Decimal type for JavaScript.
 *  https://github.com/MikeMcl/decimal.js
 *  Copyright (c) 2025 Michael Mclaughlin <M8ch88l@gmail.com>
 *  MIT Licence
 */
var to = 9e15, Ft = 1e9, Gl = "0123456789abcdef", ea = "2.3025850929940456840179914546843642076011014886287729760333279009675726096773524802359972050895982983419677840422862486334095254650828067566662873690987816894829072083255546808437998948262331985283935053089653777326288461633662222876982198867465436674744042432743651550489343149393914796194044002221051017141748003688084012647080685567743216228355220114804663715659121373450747856947683463616792101806445070648000277502684916746550586856935673420670581136429224554405758925724208241314695689016758940256776311356919292033376587141660230105703089634572075440370847469940168269282808481184289314848524948644871927809676271275775397027668605952496716674183485704422507197965004714951050492214776567636938662976979522110718264549734772662425709429322582798502585509785265383207606726317164309505995087807523710333101197857547331541421808427543863591778117054309827482385045648019095610299291824318237525357709750539565187697510374970888692180205189339507238539205144634197265287286965110862571492198849978748873771345686209167058", na = "3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602491412737245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094330572703657595919530921861173819326117931051185480744623799627495673518857527248912279381830119491298336733624406566430860213949463952247371907021798609437027705392171762931767523846748184676694051320005681271452635608277857713427577896091736371787214684409012249534301465495853710507922796892589235420199561121290219608640344181598136297747713099605187072113499999983729780499510597317328160963185950244594553469083026425223082533446850352619311881710100031378387528865875332083814206171776691473035982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989380952572010654858632789", Zl = {
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
  minE: -to,
  // -1 to -EXP_LIMIT
  // The maximum exponent value, above which overflow to Infinity occurs.
  // JavaScript numbers: 308  (1.7976931348623157e+308)
  maxE: to,
  // 1 to EXP_LIMIT
  // Whether to use cryptographically-secure random number generation, if available.
  crypto: !1
  // true/false
}, Cv, ct, Ee = !0, oi = "[DecimalError] ", Nt = oi + "Invalid argument: ", Sv = oi + "Precision limit exceeded", zv = oi + "crypto unavailable", Pv = "[object Decimal]", Pn = Math.floor, fn = Math.pow, LS = /^0b([01]+(\.[01]*)?|\.[01]+)(p[+-]?\d+)?$/i, VS = /^0x([0-9a-f]+(\.[0-9a-f]*)?|\.[0-9a-f]+)(p[+-]?\d+)?$/i, FS = /^0o([0-7]+(\.[0-7]*)?|\.[0-7]+)(p[+-]?\d+)?$/i, Ov = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i, Qn = 1e7, ze = 7, US = 9007199254740991, jS = ea.length - 1, Jl = na.length - 1, _ = { toStringTag: Pv };
_.absoluteValue = _.abs = function() {
  var e = new this.constructor(this);
  return e.s < 0 && (e.s = 1), Ce(e);
};
_.ceil = function() {
  return Ce(new this.constructor(this), this.e + 1, 2);
};
_.clampedTo = _.clamp = function(e, n) {
  var t, o = this, r = o.constructor;
  if (e = new r(e), n = new r(n), !e.s || !n.s) return new r(NaN);
  if (e.gt(n)) throw Error(Nt + n);
  return t = o.cmp(e), t < 0 ? e : o.cmp(n) > 0 ? n : new r(o);
};
_.comparedTo = _.cmp = function(e) {
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
_.cosine = _.cos = function() {
  var e, n, t = this, o = t.constructor;
  return t.d ? t.d[0] ? (e = o.precision, n = o.rounding, o.precision = e + Math.max(t.e, t.sd()) + ze, o.rounding = 1, t = HS(o, Iv(o, t)), o.precision = e, o.rounding = n, Ce(ct == 2 || ct == 3 ? t.neg() : t, e, n, !0)) : new o(1) : new o(NaN);
};
_.cubeRoot = _.cbrt = function() {
  var e, n, t, o, r, a, i, l, s, u, c = this, d = c.constructor;
  if (!c.isFinite() || c.isZero()) return new d(c);
  for (Ee = !1, a = c.s * fn(c.s * c, 1 / 3), !a || Math.abs(a) == 1 / 0 ? (t = Cn(c.d), e = c.e, (a = (e - t.length + 1) % 3) && (t += a == 1 || a == -2 ? "0" : "00"), a = fn(t, 1 / 3), e = Pn((e + 1) / 3) - (e % 3 == (e < 0 ? -1 : 2)), a == 1 / 0 ? t = "5e" + e : (t = a.toExponential(), t = t.slice(0, t.indexOf("e") + 1) + e), o = new d(t), o.s = c.s) : o = new d(a.toString()), i = (e = d.precision) + 3; ; )
    if (l = o, s = l.times(l).times(l), u = s.plus(c), o = Je(u.plus(c).times(l), u.plus(s), i + 2, 1), Cn(l.d).slice(0, i) === (t = Cn(o.d)).slice(0, i))
      if (t = t.slice(i - 3, i + 1), t == "9999" || !r && t == "4999") {
        if (!r && (Ce(l, e + 1, 0), l.times(l).times(l).eq(c))) {
          o = l;
          break;
        }
        i += 4, r = 1;
      } else {
        (!+t || !+t.slice(1) && t.charAt(0) == "5") && (Ce(o, e + 1, 1), n = !o.times(o).times(o).eq(c));
        break;
      }
  return Ee = !0, Ce(o, e, d.rounding, n);
};
_.decimalPlaces = _.dp = function() {
  var e, n = this.d, t = NaN;
  if (n) {
    if (e = n.length - 1, t = (e - Pn(this.e / ze)) * ze, e = n[e], e) for (; e % 10 == 0; e /= 10) t--;
    t < 0 && (t = 0);
  }
  return t;
};
_.dividedBy = _.div = function(e) {
  return Je(this, new this.constructor(e));
};
_.dividedToIntegerBy = _.divToInt = function(e) {
  var n = this, t = n.constructor;
  return Ce(Je(n, new t(e), 0, 1, 1), t.precision, t.rounding);
};
_.equals = _.eq = function(e) {
  return this.cmp(e) === 0;
};
_.floor = function() {
  return Ce(new this.constructor(this), this.e + 1, 3);
};
_.greaterThan = _.gt = function(e) {
  return this.cmp(e) > 0;
};
_.greaterThanOrEqualTo = _.gte = function(e) {
  var n = this.cmp(e);
  return n == 1 || n === 0;
};
_.hyperbolicCosine = _.cosh = function() {
  var e, n, t, o, r, a = this, i = a.constructor, l = new i(1);
  if (!a.isFinite()) return new i(a.s ? 1 / 0 : NaN);
  if (a.isZero()) return l;
  t = i.precision, o = i.rounding, i.precision = t + Math.max(a.e, a.sd()) + 4, i.rounding = 1, r = a.d.length, r < 32 ? (e = Math.ceil(r / 3), n = (1 / ai(4, e)).toString()) : (e = 16, n = "2.3283064365386962890625e-10"), a = ho(i, 1, a.times(n), new i(1), !0);
  for (var s, u = e, c = new i(8); u--; )
    s = a.times(a), a = l.minus(s.times(c.minus(s.times(c))));
  return Ce(a, i.precision = t, i.rounding = o, !0);
};
_.hyperbolicSine = _.sinh = function() {
  var e, n, t, o, r = this, a = r.constructor;
  if (!r.isFinite() || r.isZero()) return new a(r);
  if (n = a.precision, t = a.rounding, a.precision = n + Math.max(r.e, r.sd()) + 4, a.rounding = 1, o = r.d.length, o < 3)
    r = ho(a, 2, r, r, !0);
  else {
    e = 1.4 * Math.sqrt(o), e = e > 16 ? 16 : e | 0, r = r.times(1 / ai(5, e)), r = ho(a, 2, r, r, !0);
    for (var i, l = new a(5), s = new a(16), u = new a(20); e--; )
      i = r.times(r), r = r.times(l.plus(i.times(s.times(i).plus(u))));
  }
  return a.precision = n, a.rounding = t, Ce(r, n, t, !0);
};
_.hyperbolicTangent = _.tanh = function() {
  var e, n, t = this, o = t.constructor;
  return t.isFinite() ? t.isZero() ? new o(t) : (e = o.precision, n = o.rounding, o.precision = e + 7, o.rounding = 1, Je(t.sinh(), t.cosh(), o.precision = e, o.rounding = n)) : new o(t.s);
};
_.inverseCosine = _.acos = function() {
  var e = this, n = e.constructor, t = e.abs().cmp(1), o = n.precision, r = n.rounding;
  return t !== -1 ? t === 0 ? e.isNeg() ? tt(n, o, r) : new n(0) : new n(NaN) : e.isZero() ? tt(n, o + 4, r).times(0.5) : (n.precision = o + 6, n.rounding = 1, e = new n(1).minus(e).div(e.plus(1)).sqrt().atan(), n.precision = o, n.rounding = r, e.times(2));
};
_.inverseHyperbolicCosine = _.acosh = function() {
  var e, n, t = this, o = t.constructor;
  return t.lte(1) ? new o(t.eq(1) ? 0 : NaN) : t.isFinite() ? (e = o.precision, n = o.rounding, o.precision = e + Math.max(Math.abs(t.e), t.sd()) + 4, o.rounding = 1, Ee = !1, t = t.times(t).minus(1).sqrt().plus(t), Ee = !0, o.precision = e, o.rounding = n, t.ln()) : new o(t);
};
_.inverseHyperbolicSine = _.asinh = function() {
  var e, n, t = this, o = t.constructor;
  return !t.isFinite() || t.isZero() ? new o(t) : (e = o.precision, n = o.rounding, o.precision = e + 2 * Math.max(Math.abs(t.e), t.sd()) + 6, o.rounding = 1, Ee = !1, t = t.times(t).plus(1).sqrt().plus(t), Ee = !0, o.precision = e, o.rounding = n, t.ln());
};
_.inverseHyperbolicTangent = _.atanh = function() {
  var e, n, t, o, r = this, a = r.constructor;
  return r.isFinite() ? r.e >= 0 ? new a(r.abs().eq(1) ? r.s / 0 : r.isZero() ? r : NaN) : (e = a.precision, n = a.rounding, o = r.sd(), Math.max(o, e) < 2 * -r.e - 1 ? Ce(new a(r), e, n, !0) : (a.precision = t = o - r.e, r = Je(r.plus(1), new a(1).minus(r), t + e, 1), a.precision = e + 4, a.rounding = 1, r = r.ln(), a.precision = e, a.rounding = n, r.times(0.5))) : new a(NaN);
};
_.inverseSine = _.asin = function() {
  var e, n, t, o, r = this, a = r.constructor;
  return r.isZero() ? new a(r) : (n = r.abs().cmp(1), t = a.precision, o = a.rounding, n !== -1 ? n === 0 ? (e = tt(a, t + 4, o).times(0.5), e.s = r.s, e) : new a(NaN) : (a.precision = t + 6, a.rounding = 1, r = r.div(new a(1).minus(r.times(r)).sqrt().plus(1)).atan(), a.precision = t, a.rounding = o, r.times(2)));
};
_.inverseTangent = _.atan = function() {
  var e, n, t, o, r, a, i, l, s, u = this, c = u.constructor, d = c.precision, p = c.rounding;
  if (u.isFinite()) {
    if (u.isZero())
      return new c(u);
    if (u.abs().eq(1) && d + 4 <= Jl)
      return i = tt(c, d + 4, p).times(0.25), i.s = u.s, i;
  } else {
    if (!u.s) return new c(NaN);
    if (d + 4 <= Jl)
      return i = tt(c, d + 4, p).times(0.5), i.s = u.s, i;
  }
  for (c.precision = l = d + 10, c.rounding = 1, t = Math.min(28, l / ze + 2 | 0), e = t; e; --e) u = u.div(u.times(u).plus(1).sqrt().plus(1));
  for (Ee = !1, n = Math.ceil(l / ze), o = 1, s = u.times(u), i = new c(u), r = u; e !== -1; )
    if (r = r.times(s), a = i.minus(r.div(o += 2)), r = r.times(s), i = a.plus(r.div(o += 2)), i.d[n] !== void 0) for (e = n; i.d[e] === a.d[e] && e--; ) ;
  return t && (i = i.times(2 << t - 1)), Ee = !0, Ce(i, c.precision = d, c.rounding = p, !0);
};
_.isFinite = function() {
  return !!this.d;
};
_.isInteger = _.isInt = function() {
  return !!this.d && Pn(this.e / ze) > this.d.length - 2;
};
_.isNaN = function() {
  return !this.s;
};
_.isNegative = _.isNeg = function() {
  return this.s < 0;
};
_.isPositive = _.isPos = function() {
  return this.s > 0;
};
_.isZero = function() {
  return !!this.d && this.d[0] === 0;
};
_.lessThan = _.lt = function(e) {
  return this.cmp(e) < 0;
};
_.lessThanOrEqualTo = _.lte = function(e) {
  return this.cmp(e) < 1;
};
_.logarithm = _.log = function(e) {
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
  if (Ee = !1, l = d + f, i = Pt(u, l), o = n ? ta(c, l + 10) : Pt(e, l), s = Je(i, o, l, 1), Ko(s.d, r = d, p))
    do
      if (l += 10, i = Pt(u, l), o = n ? ta(c, l + 10) : Pt(e, l), s = Je(i, o, l, 1), !a) {
        +Cn(s.d).slice(r + 1, r + 15) + 1 == 1e14 && (s = Ce(s, d + 1, 0));
        break;
      }
    while (Ko(s.d, r += 10, p));
  return Ee = !0, Ce(s, d, p);
};
_.minus = _.sub = function(e) {
  var n, t, o, r, a, i, l, s, u, c, d, p, f = this, h = f.constructor;
  if (e = new h(e), !f.d || !e.d)
    return !f.s || !e.s ? e = new h(NaN) : f.d ? e.s = -e.s : e = new h(e.d || f.s !== e.s ? f : NaN), e;
  if (f.s != e.s)
    return e.s = -e.s, f.plus(e);
  if (u = f.d, p = e.d, l = h.precision, s = h.rounding, !u[0] || !p[0]) {
    if (p[0]) e.s = -e.s;
    else if (u[0]) e = new h(f);
    else return new h(s === 3 ? -0 : 0);
    return Ee ? Ce(e, l, s) : e;
  }
  if (t = Pn(e.e / ze), c = Pn(f.e / ze), u = u.slice(), a = c - t, a) {
    for (d = a < 0, d ? (n = u, a = -a, i = p.length) : (n = p, t = c, i = u.length), o = Math.max(Math.ceil(l / ze), i) + 2, a > o && (a = o, n.length = 1), n.reverse(), o = a; o--; ) n.push(0);
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
  return u[0] ? (e.d = u, e.e = ri(u, t), Ee ? Ce(e, l, s) : e) : new h(s === 3 ? -0 : 0);
};
_.modulo = _.mod = function(e) {
  var n, t = this, o = t.constructor;
  return e = new o(e), !t.d || !e.s || e.d && !e.d[0] ? new o(NaN) : !e.d || t.d && !t.d[0] ? Ce(new o(t), o.precision, o.rounding) : (Ee = !1, o.modulo == 9 ? (n = Je(t, e.abs(), 0, 3, 1), n.s *= e.s) : n = Je(t, e, 0, o.modulo, 1), n = n.times(e), Ee = !0, t.minus(n));
};
_.naturalExponential = _.exp = function() {
  return Ql(this);
};
_.naturalLogarithm = _.ln = function() {
  return Pt(this);
};
_.negated = _.neg = function() {
  var e = new this.constructor(this);
  return e.s = -e.s, Ce(e);
};
_.plus = _.add = function(e) {
  var n, t, o, r, a, i, l, s, u, c, d = this, p = d.constructor;
  if (e = new p(e), !d.d || !e.d)
    return !d.s || !e.s ? e = new p(NaN) : d.d || (e = new p(e.d || d.s === e.s ? d : NaN)), e;
  if (d.s != e.s)
    return e.s = -e.s, d.minus(e);
  if (u = d.d, c = e.d, l = p.precision, s = p.rounding, !u[0] || !c[0])
    return c[0] || (e = new p(d)), Ee ? Ce(e, l, s) : e;
  if (a = Pn(d.e / ze), o = Pn(e.e / ze), u = u.slice(), r = a - o, r) {
    for (r < 0 ? (t = u, r = -r, i = c.length) : (t = c, o = a, i = u.length), a = Math.ceil(l / ze), i = a > i ? a + 1 : i + 1, r > i && (r = i, t.length = 1), t.reverse(); r--; ) t.push(0);
    t.reverse();
  }
  for (i = u.length, r = c.length, i - r < 0 && (r = i, t = c, c = u, u = t), n = 0; r; )
    n = (u[--r] = u[r] + c[r] + n) / Qn | 0, u[r] %= Qn;
  for (n && (u.unshift(n), ++o), i = u.length; u[--i] == 0; ) u.pop();
  return e.d = u, e.e = ri(u, o), Ee ? Ce(e, l, s) : e;
};
_.precision = _.sd = function(e) {
  var n, t = this;
  if (e !== void 0 && e !== !!e && e !== 1 && e !== 0) throw Error(Nt + e);
  return t.d ? (n = Ev(t.d), e && t.e + 1 > n && (n = t.e + 1)) : n = NaN, n;
};
_.round = function() {
  var e = this, n = e.constructor;
  return Ce(new n(e), e.e + 1, n.rounding);
};
_.sine = _.sin = function() {
  var e, n, t = this, o = t.constructor;
  return t.isFinite() ? t.isZero() ? new o(t) : (e = o.precision, n = o.rounding, o.precision = e + Math.max(t.e, t.sd()) + ze, o.rounding = 1, t = WS(o, Iv(o, t)), o.precision = e, o.rounding = n, Ce(ct > 2 ? t.neg() : t, e, n, !0)) : new o(NaN);
};
_.squareRoot = _.sqrt = function() {
  var e, n, t, o, r, a, i = this, l = i.d, s = i.e, u = i.s, c = i.constructor;
  if (u !== 1 || !l || !l[0])
    return new c(!u || u < 0 && (!l || l[0]) ? NaN : l ? i : 1 / 0);
  for (Ee = !1, u = Math.sqrt(+i), u == 0 || u == 1 / 0 ? (n = Cn(l), (n.length + s) % 2 == 0 && (n += "0"), u = Math.sqrt(n), s = Pn((s + 1) / 2) - (s < 0 || s % 2), u == 1 / 0 ? n = "5e" + s : (n = u.toExponential(), n = n.slice(0, n.indexOf("e") + 1) + s), o = new c(n)) : o = new c(u.toString()), t = (s = c.precision) + 3; ; )
    if (a = o, o = a.plus(Je(i, a, t + 2, 1)).times(0.5), Cn(a.d).slice(0, t) === (n = Cn(o.d)).slice(0, t))
      if (n = n.slice(t - 3, t + 1), n == "9999" || !r && n == "4999") {
        if (!r && (Ce(a, s + 1, 0), a.times(a).eq(i))) {
          o = a;
          break;
        }
        t += 4, r = 1;
      } else {
        (!+n || !+n.slice(1) && n.charAt(0) == "5") && (Ce(o, s + 1, 1), e = !o.times(o).eq(i));
        break;
      }
  return Ee = !0, Ce(o, s, c.rounding, e);
};
_.tangent = _.tan = function() {
  var e, n, t = this, o = t.constructor;
  return t.isFinite() ? t.isZero() ? new o(t) : (e = o.precision, n = o.rounding, o.precision = e + 10, o.rounding = 1, t = t.sin(), t.s = 1, t = Je(t, new o(1).minus(t.times(t)).sqrt(), e + 10, 0), o.precision = e, o.rounding = n, Ce(ct == 2 || ct == 4 ? t.neg() : t, e, n, !0)) : new o(NaN);
};
_.times = _.mul = function(e) {
  var n, t, o, r, a, i, l, s, u, c = this, d = c.constructor, p = c.d, f = (e = new d(e)).d;
  if (e.s *= c.s, !p || !p[0] || !f || !f[0])
    return new d(!e.s || p && !p[0] && !f || f && !f[0] && !p ? NaN : !p || !f ? e.s / 0 : e.s * 0);
  for (t = Pn(c.e / ze) + Pn(e.e / ze), s = p.length, u = f.length, s < u && (a = p, p = f, f = a, i = s, s = u, u = i), a = [], i = s + u, o = i; o--; ) a.push(0);
  for (o = u; --o >= 0; ) {
    for (n = 0, r = s + o; r > o; )
      l = a[r] + f[o] * p[r - o - 1] + n, a[r--] = l % Qn | 0, n = l / Qn | 0;
    a[r] = (a[r] + n) % Qn | 0;
  }
  for (; !a[--i]; ) a.pop();
  return n ? ++t : a.shift(), e.d = a, e.e = ri(a, t), Ee ? Ce(e, d.precision, d.rounding) : e;
};
_.toBinary = function(e, n) {
  return Ou(this, 2, e, n);
};
_.toDecimalPlaces = _.toDP = function(e, n) {
  var t = this, o = t.constructor;
  return t = new o(t), e === void 0 ? t : (An(e, 0, Ft), n === void 0 ? n = o.rounding : An(n, 0, 8), Ce(t, e + t.e + 1, n));
};
_.toExponential = function(e, n) {
  var t, o = this, r = o.constructor;
  return e === void 0 ? t = rt(o, !0) : (An(e, 0, Ft), n === void 0 ? n = r.rounding : An(n, 0, 8), o = Ce(new r(o), e + 1, n), t = rt(o, !0, e + 1)), o.isNeg() && !o.isZero() ? "-" + t : t;
};
_.toFixed = function(e, n) {
  var t, o, r = this, a = r.constructor;
  return e === void 0 ? t = rt(r) : (An(e, 0, Ft), n === void 0 ? n = a.rounding : An(n, 0, 8), o = Ce(new a(r), e + r.e + 1, n), t = rt(o, !1, e + o.e + 1)), r.isNeg() && !r.isZero() ? "-" + t : t;
};
_.toFraction = function(e) {
  var n, t, o, r, a, i, l, s, u, c, d, p, f = this, h = f.d, v = f.constructor;
  if (!h) return new v(f);
  if (u = t = new v(1), o = s = new v(0), n = new v(o), a = n.e = Ev(h) - f.e - 1, i = a % ze, n.d[0] = fn(10, i < 0 ? ze + i : i), e == null)
    e = a > 0 ? n : u;
  else {
    if (l = new v(e), !l.isInt() || l.lt(u)) throw Error(Nt + l);
    e = l.gt(n) ? a > 0 ? n : u : l;
  }
  for (Ee = !1, l = new v(Cn(h)), c = v.precision, v.precision = a = h.length * ze * 2; d = Je(l, n, 0, 1, 1), r = t.plus(d.times(o)), r.cmp(e) != 1; )
    t = o, o = r, r = u, u = s.plus(d.times(r)), s = r, r = n, n = l.minus(d.times(r)), l = r;
  return r = Je(e.minus(t), o, 0, 1, 1), s = s.plus(r.times(u)), t = t.plus(r.times(o)), s.s = u.s = f.s, p = Je(u, o, a, 1).minus(f).abs().cmp(Je(s, t, a, 1).minus(f).abs()) < 1 ? [u, o] : [s, t], v.precision = c, Ee = !0, p;
};
_.toHexadecimal = _.toHex = function(e, n) {
  return Ou(this, 16, e, n);
};
_.toNearest = function(e, n) {
  var t = this, o = t.constructor;
  if (t = new o(t), e == null) {
    if (!t.d) return t;
    e = new o(1), n = o.rounding;
  } else {
    if (e = new o(e), n === void 0 ? n = o.rounding : An(n, 0, 8), !t.d) return e.s ? t : e;
    if (!e.d)
      return e.s && (e.s = t.s), e;
  }
  return e.d[0] ? (Ee = !1, t = Je(t, e, 0, n, 1).times(e), Ee = !0, Ce(t)) : (e.s = t.s, t = e), t;
};
_.toNumber = function() {
  return +this;
};
_.toOctal = function(e, n) {
  return Ou(this, 8, e, n);
};
_.toPower = _.pow = function(e) {
  var n, t, o, r, a, i, l = this, s = l.constructor, u = +(e = new s(e));
  if (!l.d || !e.d || !l.d[0] || !e.d[0]) return new s(fn(+l, u));
  if (l = new s(l), l.eq(1)) return l;
  if (o = s.precision, a = s.rounding, e.eq(1)) return Ce(l, o, a);
  if (n = Pn(e.e / ze), n >= e.d.length - 1 && (t = u < 0 ? -u : u) <= US)
    return r = Tv(s, l, t, o), e.s < 0 ? new s(1).div(r) : Ce(r, o, a);
  if (i = l.s, i < 0) {
    if (n < e.d.length - 1) return new s(NaN);
    if (e.d[n] & 1 || (i = 1), l.e == 0 && l.d[0] == 1 && l.d.length == 1)
      return l.s = i, l;
  }
  return t = fn(+l, u), n = t == 0 || !isFinite(t) ? Pn(u * (Math.log("0." + Cn(l.d)) / Math.LN10 + l.e + 1)) : new s(t + "").e, n > s.maxE + 1 || n < s.minE - 1 ? new s(n > 0 ? i / 0 : 0) : (Ee = !1, s.rounding = l.s = 1, t = Math.min(12, (n + "").length), r = Ql(e.times(Pt(l, o + t)), o), r.d && (r = Ce(r, o + 5, 1), Ko(r.d, o, a) && (n = o + 10, r = Ce(Ql(e.times(Pt(l, n + t)), n), n + 5, 1), +Cn(r.d).slice(o + 1, o + 15) + 1 == 1e14 && (r = Ce(r, o + 1, 0)))), r.s = i, Ee = !0, s.rounding = a, Ce(r, o, a));
};
_.toPrecision = function(e, n) {
  var t, o = this, r = o.constructor;
  return e === void 0 ? t = rt(o, o.e <= r.toExpNeg || o.e >= r.toExpPos) : (An(e, 1, Ft), n === void 0 ? n = r.rounding : An(n, 0, 8), o = Ce(new r(o), e, n), t = rt(o, e <= o.e || o.e <= r.toExpNeg, e)), o.isNeg() && !o.isZero() ? "-" + t : t;
};
_.toSignificantDigits = _.toSD = function(e, n) {
  var t = this, o = t.constructor;
  return e === void 0 ? (e = o.precision, n = o.rounding) : (An(e, 1, Ft), n === void 0 ? n = o.rounding : An(n, 0, 8)), Ce(new o(t), e, n);
};
_.toString = function() {
  var e = this, n = e.constructor, t = rt(e, e.e <= n.toExpNeg || e.e >= n.toExpPos);
  return e.isNeg() && !e.isZero() ? "-" + t : t;
};
_.truncated = _.trunc = function() {
  return Ce(new this.constructor(this), this.e + 1, 1);
};
_.valueOf = _.toJSON = function() {
  var e = this, n = e.constructor, t = rt(e, e.e <= n.toExpNeg || e.e >= n.toExpPos);
  return e.isNeg() ? "-" + t : t;
};
function Cn(e) {
  var n, t, o, r = e.length - 1, a = "", i = e[0];
  if (r > 0) {
    for (a += i, n = 1; n < r; n++)
      o = e[n] + "", t = ze - o.length, t && (a += wt(t)), a += o;
    i = e[n], o = i + "", t = ze - o.length, t && (a += wt(t));
  } else if (i === 0)
    return "0";
  for (; i % 10 === 0; ) i /= 10;
  return a + i;
}
function An(e, n, t) {
  if (e !== ~~e || e < n || e > t)
    throw Error(Nt + e);
}
function Ko(e, n, t, o) {
  var r, a, i, l;
  for (a = e[0]; a >= 10; a /= 10) --n;
  return --n < 0 ? (n += ze, r = 0) : (r = Math.ceil((n + 1) / ze), n %= ze), a = fn(10, ze - n), l = e[r] % a | 0, o == null ? n < 3 ? (n == 0 ? l = l / 100 | 0 : n == 1 && (l = l / 10 | 0), i = t < 4 && l == 99999 || t > 3 && l == 49999 || l == 5e4 || l == 0) : i = (t < 4 && l + 1 == a || t > 3 && l + 1 == a / 2) && (e[r + 1] / a / 100 | 0) == fn(10, n - 2) - 1 || (l == a / 2 || l == 0) && (e[r + 1] / a / 100 | 0) == 0 : n < 4 ? (n == 0 ? l = l / 1e3 | 0 : n == 1 ? l = l / 100 | 0 : n == 2 && (l = l / 10 | 0), i = (o || t < 4) && l == 9999 || !o && t > 3 && l == 4999) : i = ((o || t < 4) && l + 1 == a || !o && t > 3 && l + 1 == a / 2) && (e[r + 1] / a / 1e3 | 0) == fn(10, n - 3) - 1, i;
}
function Mr(e, n, t) {
  for (var o, r = [0], a, i = 0, l = e.length; i < l; ) {
    for (a = r.length; a--; ) r[a] *= n;
    for (r[0] += Gl.indexOf(e.charAt(i++)), o = 0; o < r.length; o++)
      r[o] > t - 1 && (r[o + 1] === void 0 && (r[o + 1] = 0), r[o + 1] += r[o] / t | 0, r[o] %= t);
  }
  return r.reverse();
}
function HS(e, n) {
  var t, o, r;
  if (n.isZero()) return n;
  o = n.d.length, o < 32 ? (t = Math.ceil(o / 3), r = (1 / ai(4, t)).toString()) : (t = 16, r = "2.3283064365386962890625e-10"), e.precision += t, n = ho(e, 1, n.times(r), new e(1));
  for (var a = t; a--; ) {
    var i = n.times(n);
    n = i.times(i).minus(i).times(8).plus(1);
  }
  return e.precision -= t, n;
}
var Je = /* @__PURE__ */ function() {
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
    var u, c, d, p, f, h, v, y, w, k, b, z, I, P, M, D, U, V, W, A, T = o.constructor, B = o.s == r.s ? 1 : -1, j = o.d, E = r.d;
    if (!j || !j[0] || !E || !E[0])
      return new T(
        // Return NaN if either NaN, or both Infinity or 0.
        !o.s || !r.s || (j ? E && j[0] == E[0] : !E) ? NaN : (
          // Return ±0 if x is 0 or y is ±Infinity, or return ±Infinity as y is 0.
          j && j[0] == 0 || !E ? B * 0 : B / 0
        )
      );
    for (s ? (f = 1, c = o.e - r.e) : (s = Qn, f = ze, c = Pn(o.e / f) - Pn(r.e / f)), W = E.length, U = j.length, w = new T(B), k = w.d = [], d = 0; E[d] == (j[d] || 0); d++) ;
    if (E[d] > (j[d] || 0) && c--, a == null ? (P = a = T.precision, i = T.rounding) : l ? P = a + (o.e - r.e) + 1 : P = a, P < 0)
      k.push(1), h = !0;
    else {
      if (P = P / f + 2 | 0, d = 0, W == 1) {
        for (p = 0, E = E[0], P++; (d < U || p) && P--; d++)
          M = p * s + (j[d] || 0), k[d] = M / E | 0, p = M % E | 0;
        h = p || d < U;
      } else {
        for (p = s / (E[0] + 1) | 0, p > 1 && (E = e(E, p, s), j = e(j, p, s), W = E.length, U = j.length), D = W, b = j.slice(0, W), z = b.length; z < W; ) b[z++] = 0;
        A = E.slice(), A.unshift(0), V = E[0], E[1] >= s / 2 && ++V;
        do
          p = 0, u = n(E, b, W, z), u < 0 ? (I = b[0], W != z && (I = I * s + (b[1] || 0)), p = I / V | 0, p > 1 ? (p >= s && (p = s - 1), v = e(E, p, s), y = v.length, z = b.length, u = n(v, b, y, z), u == 1 && (p--, t(v, W < y ? A : E, y, s))) : (p == 0 && (u = p = 1), v = E.slice()), y = v.length, y < z && v.unshift(0), t(b, v, z, s), u == -1 && (z = b.length, u = n(E, b, W, z), u < 1 && (p++, t(b, W < z ? A : E, z, s))), z = b.length) : u === 0 && (p++, b = [0]), k[d++] = p, u && b[0] ? b[z++] = j[D] || 0 : (b = [j[D]], z = 1);
        while ((D++ < U || b[0] !== void 0) && P--);
        h = b[0] !== void 0;
      }
      k[0] || k.shift();
    }
    if (f == 1)
      w.e = c, Cv = h;
    else {
      for (d = 1, p = k[0]; p >= 10; p /= 10) d++;
      w.e = d + c * f - 1, Ce(w, l ? a + w.e + 1 : a, i, h);
    }
    return w;
  };
}();
function Ce(e, n, t, o) {
  var r, a, i, l, s, u, c, d, p, f = e.constructor;
  e: if (n != null) {
    if (d = e.d, !d) return e;
    for (r = 1, l = d[0]; l >= 10; l /= 10) r++;
    if (a = n - r, a < 0)
      a += ze, i = n, c = d[p = 0], s = c / fn(10, r - i - 1) % 10 | 0;
    else if (p = Math.ceil((a + 1) / ze), l = d.length, p >= l)
      if (o) {
        for (; l++ <= p; ) d.push(0);
        c = s = 0, r = 1, a %= ze, i = a - ze + 1;
      } else
        break e;
    else {
      for (c = l = d[p], r = 1; l >= 10; l /= 10) r++;
      a %= ze, i = a - ze + r, s = i < 0 ? 0 : c / fn(10, r - i - 1) % 10 | 0;
    }
    if (o = o || n < 0 || d[p + 1] !== void 0 || (i < 0 ? c : c % fn(10, r - i - 1)), u = t < 4 ? (s || o) && (t == 0 || t == (e.s < 0 ? 3 : 2)) : s > 5 || s == 5 && (t == 4 || o || t == 6 && // Check whether the digit to the left of the rounding digit is odd.
    (a > 0 ? i > 0 ? c / fn(10, r - i) : 0 : d[p - 1]) % 10 & 1 || t == (e.s < 0 ? 8 : 7)), n < 1 || !d[0])
      return d.length = 0, u ? (n -= e.e + 1, d[0] = fn(10, (ze - n % ze) % ze), e.e = -n || 0) : d[0] = e.e = 0, e;
    if (a == 0 ? (d.length = p, l = 1, p--) : (d.length = p + 1, l = fn(10, ze - a), d[p] = i > 0 ? (c / fn(10, r - i) % fn(10, i) | 0) * l : 0), u)
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
  return Ee && (e.e > f.maxE ? (e.d = null, e.e = NaN) : e.e < f.minE && (e.e = 0, e.d = [0])), e;
}
function rt(e, n, t) {
  if (!e.isFinite()) return Mv(e);
  var o, r = e.e, a = Cn(e.d), i = a.length;
  return n ? (t && (o = t - i) > 0 ? a = a.charAt(0) + "." + a.slice(1) + wt(o) : i > 1 && (a = a.charAt(0) + "." + a.slice(1)), a = a + (e.e < 0 ? "e" : "e+") + e.e) : r < 0 ? (a = "0." + wt(-r - 1) + a, t && (o = t - i) > 0 && (a += wt(o))) : r >= i ? (a += wt(r + 1 - i), t && (o = t - r - 1) > 0 && (a = a + "." + wt(o))) : ((o = r + 1) < i && (a = a.slice(0, o) + "." + a.slice(o)), t && (o = t - i) > 0 && (r + 1 === i && (a += "."), a += wt(o))), a;
}
function ri(e, n) {
  var t = e[0];
  for (n *= ze; t >= 10; t /= 10) n++;
  return n;
}
function ta(e, n, t) {
  if (n > jS)
    throw Ee = !0, t && (e.precision = t), Error(Sv);
  return Ce(new e(ea), n, 1, !0);
}
function tt(e, n, t) {
  if (n > Jl) throw Error(Sv);
  return Ce(new e(na), n, t, !0);
}
function Ev(e) {
  var n = e.length - 1, t = n * ze + 1;
  if (n = e[n], n) {
    for (; n % 10 == 0; n /= 10) t--;
    for (n = e[0]; n >= 10; n /= 10) t++;
  }
  return t;
}
function wt(e) {
  for (var n = ""; e--; ) n += "0";
  return n;
}
function Tv(e, n, t, o) {
  var r, a = new e(1), i = Math.ceil(o / ze + 4);
  for (Ee = !1; ; ) {
    if (t % 2 && (a = a.times(n), ud(a.d, i) && (r = !0)), t = Pn(t / 2), t === 0) {
      t = a.d.length - 1, r && a.d[t] === 0 && ++a.d[t];
      break;
    }
    n = n.times(n), ud(n.d, i);
  }
  return Ee = !0, a;
}
function sd(e) {
  return e.d[e.d.length - 1] & 1;
}
function Bv(e, n, t) {
  for (var o, r, a = new e(n[0]), i = 0; ++i < n.length; ) {
    if (r = new e(n[i]), !r.s) {
      a = r;
      break;
    }
    o = a.cmp(r), (o === t || o === 0 && a.s === t) && (a = r);
  }
  return a;
}
function Ql(e, n) {
  var t, o, r, a, i, l, s, u = 0, c = 0, d = 0, p = e.constructor, f = p.rounding, h = p.precision;
  if (!e.d || !e.d[0] || e.e > 17)
    return new p(e.d ? e.d[0] ? e.s < 0 ? 0 : 1 / 0 : 1 : e.s ? e.s < 0 ? 0 : e : NaN);
  for (n == null ? (Ee = !1, s = h) : s = n, l = new p(0.03125); e.e > -2; )
    e = e.times(l), d += 5;
  for (o = Math.log(fn(2, d)) / Math.LN10 * 2 + 5 | 0, s += o, t = a = i = new p(1), p.precision = s; ; ) {
    if (a = Ce(a.times(e), s, 1), t = t.times(++c), l = i.plus(Je(a, t, s, 1)), Cn(l.d).slice(0, s) === Cn(i.d).slice(0, s)) {
      for (r = d; r--; ) i = Ce(i.times(i), s, 1);
      if (n == null)
        if (u < 3 && Ko(i.d, s - o, f, u))
          p.precision = s += 10, t = a = l = new p(1), c = 0, u++;
        else
          return Ce(i, p.precision = h, f, Ee = !0);
      else
        return p.precision = h, i;
    }
    i = l;
  }
}
function Pt(e, n) {
  var t, o, r, a, i, l, s, u, c, d, p, f = 1, h = 10, v = e, y = v.d, w = v.constructor, k = w.rounding, b = w.precision;
  if (v.s < 0 || !y || !y[0] || !v.e && y[0] == 1 && y.length == 1)
    return new w(y && !y[0] ? -1 / 0 : v.s != 1 ? NaN : y ? 0 : v);
  if (n == null ? (Ee = !1, c = b) : c = n, w.precision = c += h, t = Cn(y), o = t.charAt(0), Math.abs(a = v.e) < 15e14) {
    for (; o < 7 && o != 1 || o == 1 && t.charAt(1) > 3; )
      v = v.times(e), t = Cn(v.d), o = t.charAt(0), f++;
    a = v.e, o > 1 ? (v = new w("0." + t), a++) : v = new w(o + "." + t.slice(1));
  } else
    return u = ta(w, c + 2, b).times(a + ""), v = Pt(new w(o + "." + t.slice(1)), c - h).plus(u), w.precision = b, n == null ? Ce(v, b, k, Ee = !0) : v;
  for (d = v, s = i = v = Je(v.minus(1), v.plus(1), c, 1), p = Ce(v.times(v), c, 1), r = 3; ; ) {
    if (i = Ce(i.times(p), c, 1), u = s.plus(Je(i, new w(r), c, 1)), Cn(u.d).slice(0, c) === Cn(s.d).slice(0, c))
      if (s = s.times(2), a !== 0 && (s = s.plus(ta(w, c + 2, b).times(a + ""))), s = Je(s, new w(f), c, 1), n == null)
        if (Ko(s.d, c - h, k, l))
          w.precision = c += h, u = i = v = Je(d.minus(1), d.plus(1), c, 1), p = Ce(v.times(v), c, 1), r = l = 1;
        else
          return Ce(s, w.precision = b, k, Ee = !0);
      else
        return w.precision = b, s;
    s = u, r += 2;
  }
}
function Mv(e) {
  return String(e.s * e.s / 0);
}
function Ir(e, n) {
  var t, o, r;
  for ((t = n.indexOf(".")) > -1 && (n = n.replace(".", "")), (o = n.search(/e/i)) > 0 ? (t < 0 && (t = o), t += +n.slice(o + 1), n = n.substring(0, o)) : t < 0 && (t = n.length), o = 0; n.charCodeAt(o) === 48; o++) ;
  for (r = n.length; n.charCodeAt(r - 1) === 48; --r) ;
  if (n = n.slice(o, r), n) {
    if (r -= o, e.e = t = t - o - 1, e.d = [], o = (t + 1) % ze, t < 0 && (o += ze), o < r) {
      for (o && e.d.push(+n.slice(0, o)), r -= ze; o < r; ) e.d.push(+n.slice(o, o += ze));
      n = n.slice(o), o = ze - n.length;
    } else
      o -= r;
    for (; o--; ) n += "0";
    e.d.push(+n), Ee && (e.e > e.constructor.maxE ? (e.d = null, e.e = NaN) : e.e < e.constructor.minE && (e.e = 0, e.d = [0]));
  } else
    e.e = 0, e.d = [0];
  return e;
}
function YS(e, n) {
  var t, o, r, a, i, l, s, u, c;
  if (n.indexOf("_") > -1) {
    if (n = n.replace(/(\d)_(?=\d)/g, "$1"), Ov.test(n)) return Ir(e, n);
  } else if (n === "Infinity" || n === "NaN")
    return +n || (e.s = NaN), e.e = NaN, e.d = null, e;
  if (VS.test(n))
    t = 16, n = n.toLowerCase();
  else if (LS.test(n))
    t = 2;
  else if (FS.test(n))
    t = 8;
  else
    throw Error(Nt + n);
  for (a = n.search(/p/i), a > 0 ? (s = +n.slice(a + 1), n = n.substring(2, a)) : n = n.slice(2), a = n.indexOf("."), i = a >= 0, o = e.constructor, i && (n = n.replace(".", ""), l = n.length, a = l - a, r = Tv(o, new o(t), a, a * 2)), u = Mr(n, t, Qn), c = u.length - 1, a = c; u[a] === 0; --a) u.pop();
  return a < 0 ? new o(e.s * 0) : (e.e = ri(u, c), e.d = u, Ee = !1, i && (e = Je(e, r, l * 4)), s && (e = e.times(Math.abs(s) < 54 ? fn(2, s) : Ot.pow(2, s))), Ee = !0, e);
}
function WS(e, n) {
  var t, o = n.d.length;
  if (o < 3)
    return n.isZero() ? n : ho(e, 2, n, n);
  t = 1.4 * Math.sqrt(o), t = t > 16 ? 16 : t | 0, n = n.times(1 / ai(5, t)), n = ho(e, 2, n, n);
  for (var r, a = new e(5), i = new e(16), l = new e(20); t--; )
    r = n.times(n), n = n.times(a.plus(r.times(i.times(r).minus(l))));
  return n;
}
function ho(e, n, t, o, r) {
  var a, i, l, s, u = e.precision, c = Math.ceil(u / ze);
  for (Ee = !1, s = t.times(t), l = new e(o); ; ) {
    if (i = Je(l.times(s), new e(n++ * n++), u, 1), l = r ? o.plus(i) : o.minus(i), o = Je(i.times(s), new e(n++ * n++), u, 1), i = l.plus(o), i.d[c] !== void 0) {
      for (a = c; i.d[a] === l.d[a] && a--; ) ;
      if (a == -1) break;
    }
    a = l, l = o, o = i, i = a;
  }
  return Ee = !0, i.d.length = c + 1, i;
}
function ai(e, n) {
  for (var t = e; --n; ) t *= e;
  return t;
}
function Iv(e, n) {
  var t, o = n.s < 0, r = tt(e, e.precision, 1), a = r.times(0.5);
  if (n = n.abs(), n.lte(a))
    return ct = o ? 4 : 1, n;
  if (t = n.divToInt(r), t.isZero())
    ct = o ? 3 : 2;
  else {
    if (n = n.minus(t.times(r)), n.lte(a))
      return ct = sd(t) ? o ? 2 : 3 : o ? 4 : 1, n;
    ct = sd(t) ? o ? 1 : 4 : o ? 3 : 2;
  }
  return n.minus(r).abs();
}
function Ou(e, n, t, o) {
  var r, a, i, l, s, u, c, d, p, f = e.constructor, h = t !== void 0;
  if (h ? (An(t, 1, Ft), o === void 0 ? o = f.rounding : An(o, 0, 8)) : (t = f.precision, o = f.rounding), !e.isFinite())
    c = Mv(e);
  else {
    for (c = rt(e), i = c.indexOf("."), h ? (r = 2, n == 16 ? t = t * 4 - 3 : n == 8 && (t = t * 3 - 2)) : r = n, i >= 0 && (c = c.replace(".", ""), p = new f(1), p.e = c.length - i, p.d = Mr(rt(p), 10, r), p.e = p.d.length), d = Mr(c, 10, r), a = s = d.length; d[--s] == 0; ) d.pop();
    if (!d[0])
      c = h ? "0p+0" : "0";
    else {
      if (i < 0 ? a-- : (e = new f(e), e.d = d, e.e = a, e = Je(e, p, t, o, 0, r), d = e.d, a = e.e, u = Cv), i = d[t], l = r / 2, u = u || d[t + 1] !== void 0, u = o < 4 ? (i !== void 0 || u) && (o === 0 || o === (e.s < 0 ? 3 : 2)) : i > l || i === l && (o === 4 || u || o === 6 && d[t - 1] & 1 || o === (e.s < 0 ? 8 : 7)), d.length = t, u)
        for (; ++d[--t] > r - 1; )
          d[t] = 0, t || (++a, d.unshift(1));
      for (s = d.length; !d[s - 1]; --s) ;
      for (i = 0, c = ""; i < s; i++) c += Gl.charAt(d[i]);
      if (h) {
        if (s > 1)
          if (n == 16 || n == 8) {
            for (i = n == 16 ? 4 : 3, --s; s % i; s++) c += "0";
            for (d = Mr(c, r, n), s = d.length; !d[s - 1]; --s) ;
            for (i = 1, c = "1."; i < s; i++) c += Gl.charAt(d[i]);
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
function ud(e, n) {
  if (e.length > n)
    return e.length = n, !0;
}
function KS(e) {
  return new this(e).abs();
}
function qS(e) {
  return new this(e).acos();
}
function XS(e) {
  return new this(e).acosh();
}
function GS(e, n) {
  return new this(e).plus(n);
}
function ZS(e) {
  return new this(e).asin();
}
function JS(e) {
  return new this(e).asinh();
}
function QS(e) {
  return new this(e).atan();
}
function xS(e) {
  return new this(e).atanh();
}
function _S(e, n) {
  e = new this(e), n = new this(n);
  var t, o = this.precision, r = this.rounding, a = o + 4;
  return !e.s || !n.s ? t = new this(NaN) : !e.d && !n.d ? (t = tt(this, a, 1).times(n.s > 0 ? 0.25 : 0.75), t.s = e.s) : !n.d || e.isZero() ? (t = n.s < 0 ? tt(this, o, r) : new this(0), t.s = e.s) : !e.d || n.isZero() ? (t = tt(this, a, 1).times(0.5), t.s = e.s) : n.s < 0 ? (this.precision = a, this.rounding = 1, t = this.atan(Je(e, n, a, 1)), n = tt(this, a, 1), this.precision = o, this.rounding = r, t = e.s < 0 ? t.minus(n) : t.plus(n)) : t = this.atan(Je(e, n, a, 1)), t;
}
function e6(e) {
  return new this(e).cbrt();
}
function n6(e) {
  return Ce(e = new this(e), e.e + 1, 2);
}
function t6(e, n, t) {
  return new this(e).clamp(n, t);
}
function o6(e) {
  if (!e || typeof e != "object") throw Error(oi + "Object expected");
  var n, t, o, r = e.defaults === !0, a = [
    "precision",
    1,
    Ft,
    "rounding",
    0,
    8,
    "toExpNeg",
    -to,
    0,
    "toExpPos",
    0,
    to,
    "maxE",
    0,
    to,
    "minE",
    -to,
    0,
    "modulo",
    0,
    9
  ];
  for (n = 0; n < a.length; n += 3)
    if (t = a[n], r && (this[t] = Zl[t]), (o = e[t]) !== void 0)
      if (Pn(o) === o && o >= a[n + 1] && o <= a[n + 2]) this[t] = o;
      else throw Error(Nt + t + ": " + o);
  if (t = "crypto", r && (this[t] = Zl[t]), (o = e[t]) !== void 0)
    if (o === !0 || o === !1 || o === 0 || o === 1)
      if (o)
        if (typeof crypto < "u" && crypto && (crypto.getRandomValues || crypto.randomBytes))
          this[t] = !0;
        else
          throw Error(zv);
      else
        this[t] = !1;
    else
      throw Error(Nt + t + ": " + o);
  return this;
}
function r6(e) {
  return new this(e).cos();
}
function a6(e) {
  return new this(e).cosh();
}
function Dv(e) {
  var n, t, o;
  function r(a) {
    var i, l, s, u = this;
    if (!(u instanceof r)) return new r(a);
    if (u.constructor = r, cd(a)) {
      u.s = a.s, Ee ? !a.d || a.e > r.maxE ? (u.e = NaN, u.d = null) : a.e < r.minE ? (u.e = 0, u.d = [0]) : (u.e = a.e, u.d = a.d.slice()) : (u.e = a.e, u.d = a.d ? a.d.slice() : a.d);
      return;
    }
    if (s = typeof a, s === "number") {
      if (a === 0) {
        u.s = 1 / a < 0 ? -1 : 1, u.e = 0, u.d = [0];
        return;
      }
      if (a < 0 ? (a = -a, u.s = -1) : u.s = 1, a === ~~a && a < 1e7) {
        for (i = 0, l = a; l >= 10; l /= 10) i++;
        Ee ? i > r.maxE ? (u.e = NaN, u.d = null) : i < r.minE ? (u.e = 0, u.d = [0]) : (u.e = i, u.d = [a]) : (u.e = i, u.d = [a]);
        return;
      }
      if (a * 0 !== 0) {
        a || (u.s = NaN), u.e = NaN, u.d = null;
        return;
      }
      return Ir(u, a.toString());
    }
    if (s === "string")
      return (l = a.charCodeAt(0)) === 45 ? (a = a.slice(1), u.s = -1) : (l === 43 && (a = a.slice(1)), u.s = 1), Ov.test(a) ? Ir(u, a) : YS(u, a);
    if (s === "bigint")
      return a < 0 ? (a = -a, u.s = -1) : u.s = 1, Ir(u, a.toString());
    throw Error(Nt + a);
  }
  if (r.prototype = _, r.ROUND_UP = 0, r.ROUND_DOWN = 1, r.ROUND_CEIL = 2, r.ROUND_FLOOR = 3, r.ROUND_HALF_UP = 4, r.ROUND_HALF_DOWN = 5, r.ROUND_HALF_EVEN = 6, r.ROUND_HALF_CEIL = 7, r.ROUND_HALF_FLOOR = 8, r.EUCLID = 9, r.config = r.set = o6, r.clone = Dv, r.isDecimal = cd, r.abs = KS, r.acos = qS, r.acosh = XS, r.add = GS, r.asin = ZS, r.asinh = JS, r.atan = QS, r.atanh = xS, r.atan2 = _S, r.cbrt = e6, r.ceil = n6, r.clamp = t6, r.cos = r6, r.cosh = a6, r.div = i6, r.exp = l6, r.floor = s6, r.hypot = u6, r.ln = c6, r.log = d6, r.log10 = m6, r.log2 = p6, r.max = f6, r.min = v6, r.mod = g6, r.mul = h6, r.pow = b6, r.random = y6, r.round = w6, r.sign = k6, r.sin = $6, r.sinh = C6, r.sqrt = S6, r.sub = z6, r.sum = P6, r.tan = O6, r.tanh = E6, r.trunc = T6, e === void 0 && (e = {}), e && e.defaults !== !0)
    for (o = ["precision", "rounding", "toExpNeg", "toExpPos", "maxE", "minE", "modulo", "crypto"], n = 0; n < o.length; ) e.hasOwnProperty(t = o[n++]) || (e[t] = this[t]);
  return r.config(e), r;
}
function i6(e, n) {
  return new this(e).div(n);
}
function l6(e) {
  return new this(e).exp();
}
function s6(e) {
  return Ce(e = new this(e), e.e + 1, 3);
}
function u6() {
  var e, n, t = new this(0);
  for (Ee = !1, e = 0; e < arguments.length; )
    if (n = new this(arguments[e++]), n.d)
      t.d && (t = t.plus(n.times(n)));
    else {
      if (n.s)
        return Ee = !0, new this(1 / 0);
      t = n;
    }
  return Ee = !0, t.sqrt();
}
function cd(e) {
  return e instanceof Ot || e && e.toStringTag === Pv || !1;
}
function c6(e) {
  return new this(e).ln();
}
function d6(e, n) {
  return new this(e).log(n);
}
function p6(e) {
  return new this(e).log(2);
}
function m6(e) {
  return new this(e).log(10);
}
function f6() {
  return Bv(this, arguments, -1);
}
function v6() {
  return Bv(this, arguments, 1);
}
function g6(e, n) {
  return new this(e).mod(n);
}
function h6(e, n) {
  return new this(e).mul(n);
}
function b6(e, n) {
  return new this(e).pow(n);
}
function y6(e) {
  var n, t, o, r, a = 0, i = new this(1), l = [];
  if (e === void 0 ? e = this.precision : An(e, 1, Ft), o = Math.ceil(e / ze), this.crypto)
    if (crypto.getRandomValues)
      for (n = crypto.getRandomValues(new Uint32Array(o)); a < o; )
        r = n[a], r >= 429e7 ? n[a] = crypto.getRandomValues(new Uint32Array(1))[0] : l[a++] = r % 1e7;
    else if (crypto.randomBytes) {
      for (n = crypto.randomBytes(o *= 4); a < o; )
        r = n[a] + (n[a + 1] << 8) + (n[a + 2] << 16) + ((n[a + 3] & 127) << 24), r >= 214e7 ? crypto.randomBytes(4).copy(n, a) : (l.push(r % 1e7), a += 4);
      a = o / 4;
    } else
      throw Error(zv);
  else for (; a < o; ) l[a++] = Math.random() * 1e7 | 0;
  for (o = l[--a], e %= ze, o && e && (r = fn(10, ze - e), l[a] = (o / r | 0) * r); l[a] === 0; a--) l.pop();
  if (a < 0)
    t = 0, l = [0];
  else {
    for (t = -1; l[0] === 0; t -= ze) l.shift();
    for (o = 1, r = l[0]; r >= 10; r /= 10) o++;
    o < ze && (t -= ze - o);
  }
  return i.e = t, i.d = l, i;
}
function w6(e) {
  return Ce(e = new this(e), e.e + 1, this.rounding);
}
function k6(e) {
  return e = new this(e), e.d ? e.d[0] ? e.s : 0 * e.s : e.s || NaN;
}
function $6(e) {
  return new this(e).sin();
}
function C6(e) {
  return new this(e).sinh();
}
function S6(e) {
  return new this(e).sqrt();
}
function z6(e, n) {
  return new this(e).sub(n);
}
function P6() {
  var e = 0, n = arguments, t = new this(n[e]);
  for (Ee = !1; t.s && ++e < n.length; ) t = t.plus(n[e]);
  return Ee = !0, Ce(t, this.precision, this.rounding);
}
function O6(e) {
  return new this(e).tan();
}
function E6(e) {
  return new this(e).tanh();
}
function T6(e) {
  return Ce(e = new this(e), e.e + 1, 1);
}
_[Symbol.for("nodejs.util.inspect.custom")] = _.toString;
_[Symbol.toStringTag] = "Decimal";
var Ot = _.constructor = Dv(Zl);
ea = new Ot(ea);
na = new Ot(na);
const Av = {
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
}, dd = 100, pd = 600, { name: B6, n: M6, classes: I6 } = x("counter"), D6 = ["inputmode", "readonly", "disabled"];
function A6(e, n) {
  const t = te("mp-icon"), o = te("mp-button"), r = te("mp-form-details");
  return g(), C(
    "div",
    {
      class: m(e.classes(e.n(), e.n("$--box")))
    },
    [
      L(
        "div",
        He({
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
          Ne(L("input", {
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
          }, null, 46, D6), [
            [bb, e.inputValue]
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
const Nv = ee({
  name: B6,
  components: {
    MpButton: Mn,
    MpIcon: Ze,
    MpFormDetails: Bn
  },
  directives: { Ripple: on },
  inheritAttrs: !1,
  props: Av,
  setup(e) {
    const n = $(""), { bindForm: t, form: o } = jn(), {
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
        B(z(String(E))), S(e.onChange, Y(E));
      }
    ), B(z(String(e.modelValue)));
    function w() {
      return i(e.rules, e.modelValue);
    }
    function k(E) {
      Ye(() => {
        const { validateTrigger: J, rules: q, modelValue: ne } = e;
        a(J, E, q, ne);
      });
    }
    function b() {
      const { min: E } = e;
      S(e["onUpdate:modelValue"], E != null ? Y(E) : 0), l();
    }
    function z(E) {
      const { decimalLength: J, max: q, min: ne } = e;
      let ye = Y(E);
      return q != null && ye > Y(q) && (ye = Y(q)), ne != null && ye < Y(ne) && (ye = Y(ne)), E = String(ye), J != null && (E = ye.toFixed(Y(J))), E;
    }
    function I(E) {
      const { lazyChange: J, onBeforeChange: q } = e, { value: ne } = E.target, ye = z(ne);
      J ? S(q, Y(ye), j) : B(ye), k("onInputChange");
    }
    function P() {
      const {
        disabled: E,
        readonly: J,
        disableDecrement: q,
        decrementButton: ne,
        lazyChange: ye,
        step: Te,
        modelValue: H,
        onDecrement: Q,
        onBeforeChange: ae
      } = e;
      if (u != null && u.value || s != null && s.value || E || J || q || !ne || d.value)
        return;
      const ve = new Ot(Y(H)).minus(new Ot(Y(Te))).toString(), N = z(ve), K = Y(N);
      S(Q, K), ye ? S(ae, K, j) : (B(N), k("onDecrement"));
    }
    function M() {
      const {
        disabled: E,
        readonly: J,
        disableIncrement: q,
        incrementButton: ne,
        lazyChange: ye,
        step: Te,
        modelValue: H,
        onIncrement: Q,
        onBeforeChange: ae
      } = e;
      if (u != null && u.value || s != null && s.value || E || J || q || !ne || c.value)
        return;
      const ve = new Ot(Y(H)).plus(new Ot(Y(Te))).toString(), N = z(ve), K = Y(N);
      S(Q, K), ye ? S(ae, K, j) : (B(N), k("onIncrement"));
    }
    function D() {
      const { press: E, lazyChange: J } = e;
      !E || J || (v = window.setTimeout(() => {
        T();
      }, pd));
    }
    function U() {
      const { press: E, lazyChange: J } = e;
      !E || J || (h = window.setTimeout(() => {
        A();
      }, pd));
    }
    function V() {
      f && clearTimeout(f), v && clearTimeout(v);
    }
    function W() {
      p && clearTimeout(p), h && clearTimeout(h);
    }
    function A() {
      p = window.setTimeout(() => {
        M(), A();
      }, dd);
    }
    function T() {
      f = window.setTimeout(() => {
        P(), T();
      }, dd);
    }
    function B(E) {
      n.value = E;
      const J = Y(E);
      S(e["onUpdate:modelValue"], J);
    }
    function j(E) {
      B(z(String(E))), k("onLazyChange");
    }
    return {
      inputValue: n,
      errorMessage: r,
      formDisabled: u,
      formReadonly: s,
      isMax: c,
      isMin: d,
      n: M6,
      classes: I6,
      formatElevation: dn,
      validate: w,
      reset: b,
      resetValidation: l,
      handleChange: I,
      decrement: P,
      increment: M,
      pressDecrement: D,
      pressIncrement: U,
      releaseDecrement: V,
      releaseIncrement: W,
      toSizeUnit: Oe,
      toNumber: Y
    };
  }
});
Nv.render = A6;
var ii = Nv;
re(ii);
ie(ii, Av);
const xM = ii;
var xl = ii, Rv = 60, Lv = Rv * 60, Vv = Lv * 24, N6 = Vv * 7, bo = 1e3, sl = Rv * bo, md = Lv * bo, R6 = Vv * bo, L6 = N6 * bo, Eu = "millisecond", oo = "second", ro = "minute", ao = "hour", kt = "day", Dr = "week", Jn = "month", Fv = "quarter", $t = "year", io = "date", V6 = "YYYY-MM-DDTHH:mm:ssZ", fd = "Invalid Date", F6 = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, U6 = /\[([^\]]+)]|YYYY|YY|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g;
const j6 = {
  name: "en",
  weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
  months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
  ordinal: function(n) {
    var t = ["th", "st", "nd", "rd"], o = n % 100;
    return "[" + n + (t[(o - 20) % 10] || t[o] || t[0]) + "]";
  }
};
var _l = function(n, t, o) {
  var r = String(n);
  return !r || r.length >= t ? n : "" + Array(t + 1 - r.length).join(o) + n;
}, H6 = function(n) {
  var t = -n.utcOffset(), o = Math.abs(t), r = Math.floor(o / 60), a = o % 60;
  return (t <= 0 ? "+" : "-") + _l(r, 2, "0") + ":" + _l(a, 2, "0");
}, Y6 = function e(n, t) {
  if (n.date() < t.date()) return -e(t, n);
  var o = (t.year() - n.year()) * 12 + (t.month() - n.month()), r = n.clone().add(o, Jn), a = t - r < 0, i = n.clone().add(o + (a ? -1 : 1), Jn);
  return +(-(o + (t - r) / (a ? r - i : i - r)) || 0);
}, W6 = function(n) {
  return n < 0 ? Math.ceil(n) || 0 : Math.floor(n);
}, K6 = function(n) {
  var t = {
    M: Jn,
    y: $t,
    w: Dr,
    d: kt,
    D: io,
    h: ao,
    m: ro,
    s: oo,
    ms: Eu,
    Q: Fv
  };
  return t[n] || String(n || "").toLowerCase().replace(/s$/, "");
}, q6 = function(n) {
  return n === void 0;
};
const X6 = {
  s: _l,
  z: H6,
  m: Y6,
  a: W6,
  p: K6,
  u: q6
};
var Do = "en", Wt = {};
Wt[Do] = j6;
var Uv = "$isDayjsObject", Tu = function(n) {
  return n instanceof li || !!(n && n[Uv]);
}, oa = function e(n, t, o) {
  var r;
  if (!n) return Do;
  if (typeof n == "string") {
    var a = n.toLowerCase();
    Wt[a] && (r = a), t && (Wt[a] = t, r = a);
    var i = n.split("-");
    if (!r && i.length > 1)
      return e(i[0]);
  } else {
    var l = n.name;
    Wt[l] = n, r = l;
  }
  return !o && r && (Do = r), r || !o && Do;
}, ce = function(n, t) {
  if (Tu(n))
    return n.clone();
  var o = typeof t == "object" ? t : {};
  return o.date = n, o.args = arguments, new li(o);
}, G6 = function(n, t) {
  return ce(n, {
    locale: t.$L,
    utc: t.$u,
    x: t.$x,
    $offset: t.$offset
    // todo: refactor; do not use this.$offset in you code
  });
}, qe = X6;
qe.l = oa;
qe.i = Tu;
qe.w = G6;
var Z6 = function(n) {
  var t = n.date, o = n.utc;
  if (t === null) return /* @__PURE__ */ new Date(NaN);
  if (qe.u(t)) return /* @__PURE__ */ new Date();
  if (t instanceof Date) return new Date(t);
  if (typeof t == "string" && !/Z$/i.test(t)) {
    var r = t.match(F6);
    if (r) {
      var a = r[2] - 1 || 0, i = (r[7] || "0").substring(0, 3);
      return o ? new Date(Date.UTC(r[1], a, r[3] || 1, r[4] || 0, r[5] || 0, r[6] || 0, i)) : new Date(r[1], a, r[3] || 1, r[4] || 0, r[5] || 0, r[6] || 0, i);
    }
  }
  return new Date(t);
}, li = /* @__PURE__ */ function() {
  function e(t) {
    this.$L = oa(t.locale, null, !0), this.parse(t), this.$x = this.$x || t.x || {}, this[Uv] = !0;
  }
  var n = e.prototype;
  return n.parse = function(o) {
    this.$d = Z6(o), this.init();
  }, n.init = function() {
    var o = this.$d;
    this.$y = o.getFullYear(), this.$M = o.getMonth(), this.$D = o.getDate(), this.$W = o.getDay(), this.$H = o.getHours(), this.$m = o.getMinutes(), this.$s = o.getSeconds(), this.$ms = o.getMilliseconds();
  }, n.$utils = function() {
    return qe;
  }, n.isValid = function() {
    return this.$d.toString() !== fd;
  }, n.isSame = function(o, r) {
    var a = ce(o);
    return this.startOf(r) <= a && a <= this.endOf(r);
  }, n.isAfter = function(o, r) {
    return ce(o) < this.startOf(r);
  }, n.isBefore = function(o, r) {
    return this.endOf(r) < ce(o);
  }, n.$g = function(o, r, a) {
    return qe.u(o) ? this[r] : this.set(a, o);
  }, n.unix = function() {
    return Math.floor(this.valueOf() / 1e3);
  }, n.valueOf = function() {
    return this.$d.getTime();
  }, n.startOf = function(o, r) {
    var a = this, i = qe.u(r) ? !0 : r, l = qe.p(o), s = function(w, k) {
      var b = qe.w(a.$u ? Date.UTC(a.$y, k, w) : new Date(a.$y, k, w), a);
      return i ? b : b.endOf(kt);
    }, u = function(w, k) {
      var b = [0, 0, 0, 0], z = [23, 59, 59, 999];
      return qe.w(a.toDate()[w].apply(
        // eslint-disable-line prefer-spread
        a.toDate("s"),
        (i ? b : z).slice(k)
      ), a);
    }, c = this.$W, d = this.$M, p = this.$D, f = "set" + (this.$u ? "UTC" : "");
    switch (l) {
      case $t:
        return i ? s(1, 0) : s(31, 11);
      case Jn:
        return i ? s(1, d) : s(0, d + 1);
      case Dr: {
        var h = this.$locale().weekStart || 0, v = (c < h ? c + 7 : c) - h;
        return s(i ? p - v : p + (6 - v), d);
      }
      case kt:
      case io:
        return u(f + "Hours", 0);
      case ao:
        return u(f + "Minutes", 1);
      case ro:
        return u(f + "Seconds", 2);
      case oo:
        return u(f + "Milliseconds", 3);
      default:
        return this.clone();
    }
  }, n.endOf = function(o) {
    return this.startOf(o, !1);
  }, n.$set = function(o, r) {
    var a, i = qe.p(o), l = "set" + (this.$u ? "UTC" : ""), s = (a = {}, a[kt] = l + "Date", a[io] = l + "Date", a[Jn] = l + "Month", a[$t] = l + "FullYear", a[ao] = l + "Hours", a[ro] = l + "Minutes", a[oo] = l + "Seconds", a[Eu] = l + "Milliseconds", a)[i], u = i === kt ? this.$D + (r - this.$W) : r;
    if (i === Jn || i === $t) {
      var c = this.clone().set(io, 1);
      c.$d[s](u), c.init(), this.$d = c.set(io, Math.min(this.$D, c.daysInMonth())).$d;
    } else s && this.$d[s](u);
    return this.init(), this;
  }, n.set = function(o, r) {
    return this.clone().$set(o, r);
  }, n.get = function(o) {
    return this[qe.p(o)]();
  }, n.add = function(o, r) {
    var a = this, i;
    o = Number(o);
    var l = qe.p(r), s = function(p) {
      var f = ce(a);
      return qe.w(f.date(f.date() + Math.round(p * o)), a);
    };
    if (l === Jn)
      return this.set(Jn, this.$M + o);
    if (l === $t)
      return this.set($t, this.$y + o);
    if (l === kt)
      return s(1);
    if (l === Dr)
      return s(7);
    var u = (i = {}, i[ro] = sl, i[ao] = md, i[oo] = bo, i)[l] || 1, c = this.$d.getTime() + o * u;
    return qe.w(c, this);
  }, n.subtract = function(o, r) {
    return this.add(o * -1, r);
  }, n.format = function(o) {
    var r = this, a = this.$locale();
    if (!this.isValid()) return a.invalidDate || fd;
    var i = o || V6, l = qe.z(this), s = this.$H, u = this.$m, c = this.$M, d = a.weekdays, p = a.months, f = a.meridiem, h = function(b, z, I, P) {
      return b && (b[z] || b(r, i)) || I[z].slice(0, P);
    }, v = function(b) {
      return qe.s(s % 12 || 12, b, "0");
    }, y = f || function(k, b, z) {
      var I = k < 12 ? "AM" : "PM";
      return z ? I.toLowerCase() : I;
    }, w = function(b) {
      switch (b) {
        case "YY":
          return String(r.$y).slice(-2);
        case "YYYY":
          return qe.s(r.$y, 4, "0");
        case "M":
          return c + 1;
        case "MM":
          return qe.s(c + 1, 2, "0");
        case "MMM":
          return h(a.monthsShort, c, p, 3);
        case "MMMM":
          return h(p, c);
        case "D":
          return r.$D;
        case "DD":
          return qe.s(r.$D, 2, "0");
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
          return qe.s(s, 2, "0");
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
          return qe.s(u, 2, "0");
        case "s":
          return String(r.$s);
        case "ss":
          return qe.s(r.$s, 2, "0");
        case "SSS":
          return qe.s(r.$ms, 3, "0");
        case "Z":
          return l;
      }
      return null;
    };
    return i.replace(U6, function(k, b) {
      return b || w(k) || l.replace(":", "");
    });
  }, n.utcOffset = function() {
    return -Math.round(this.$d.getTimezoneOffset() / 15) * 15;
  }, n.diff = function(o, r, a) {
    var i = this, l = qe.p(r), s = ce(o), u = (s.utcOffset() - this.utcOffset()) * sl, c = this - s, d = function() {
      return qe.m(i, s);
    }, p;
    switch (l) {
      case $t:
        p = d() / 12;
        break;
      case Jn:
        p = d();
        break;
      case Fv:
        p = d() / 3;
        break;
      case Dr:
        p = (c - u) / L6;
        break;
      case kt:
        p = (c - u) / R6;
        break;
      case ao:
        p = c / md;
        break;
      case ro:
        p = c / sl;
        break;
      case oo:
        p = c / bo;
        break;
      default:
        p = c;
        break;
    }
    return a ? p : qe.a(p);
  }, n.daysInMonth = function() {
    return this.endOf(Jn).$D;
  }, n.$locale = function() {
    return Wt[this.$L];
  }, n.locale = function(o, r) {
    if (!o) return this.$L;
    var a = this.clone(), i = oa(o, r, !0);
    return i && (a.$L = i), a;
  }, n.clone = function() {
    return qe.w(this.$d, this);
  }, n.toDate = function() {
    return new Date(this.valueOf());
  }, n.toJSON = function() {
    return this.isValid() ? this.toISOString() : null;
  }, n.toISOString = function() {
    return this.$d.toISOString();
  }, n.toString = function() {
    return this.$d.toUTCString();
  }, e;
}(), jv = li.prototype;
ce.prototype = jv;
[["$ms", Eu], ["$s", oo], ["$m", ro], ["$H", ao], ["$W", kt], ["$M", Jn], ["$y", $t], ["$D", io]].forEach(function(e) {
  jv[e[1]] = function(n) {
    return this.$g(n, e[0], e[1]);
  };
});
ce.extend = function(e, n) {
  return e.$i || (e(n, li, ce), e.$i = !0), ce;
};
ce.locale = oa;
ce.isDayjs = Tu;
ce.unix = function(e) {
  return ce(e * 1e3);
};
ce.en = Wt[Do];
ce.Ls = Wt;
ce.p = {};
const Ar = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"], Bo = ["0", "1", "2", "3", "4", "5", "6"], Hv = {
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
}, Yv = function(e, n) {
  n.prototype.isSameOrAfter = function(t, o) {
    return this.isSame(t, o) || this.isAfter(t, o);
  };
}, Wv = function(e, n) {
  n.prototype.isSameOrBefore = function(t, o) {
    return this.isSame(t, o) || this.isBefore(t, o);
  };
}, { n: J6 } = x("date-picker-header");
function Q6(e, n) {
  const t = te("mp-icon"), o = te("mp-button");
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
      L(
        "div",
        {
          class: m(e.n("value")),
          onClick: n[1] || (n[1] = (r) => e.$emit("check-panel"))
        },
        [
          Z(Qe, {
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
const Kv = ee({
  name: "PanelHeader",
  components: {
    MpButton: Mn,
    MpIcon: Ze
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
    const t = $(!1), o = $(0), { t: r } = lt(), a = O(() => {
      var l;
      const { date: s, type: u } = e, { previewMonth: c, previewYear: d } = s;
      if (u === "year")
        return d;
      if (u === "month")
        return Y(d) + o.value;
      const p = (l = (r || rn)("datePickerMonthDict")) == null ? void 0 : l[c].name;
      return (r || rn)("lang") === "zh-CN" ? `${d} ${p}` : `${p} ${d}`;
    }), i = (l) => {
      l === "prev" && e.disabled.left || l === "next" && e.disabled.right || (n("check-date", l), t.value = l === "prev", o.value += l === "prev" ? -1 : 1);
    };
    return pe(
      () => e.date,
      () => {
        o.value = 0;
      }
    ), {
      n: J6,
      reverse: t,
      showDate: a,
      checkDate: i
    };
  }
});
Kv.render = Q6;
var Bu = Kv, x6 = Object.defineProperty, vd = Object.getOwnPropertySymbols, _6 = Object.prototype.hasOwnProperty, ez = Object.prototype.propertyIsEnumerable, gd = (e, n, t) => n in e ? x6(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t, nz = (e, n) => {
  for (var t in n || (n = {}))
    _6.call(n, t) && gd(e, t, n[t]);
  if (vd)
    for (var t of vd(n))
      ez.call(n, t) && gd(e, t, n[t]);
  return e;
};
ce.extend(Wv);
ce.extend(Yv);
const { n: _t, classes: tz } = x("day-picker"), { n: yr } = x("date-picker");
function oz(e, n) {
  const t = te("panel-header"), o = te("mp-button");
  return g(), C(
    "div",
    {
      class: m(e.n())
    },
    [
      L(
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
          Z(Qe, {
            name: `${e.nDate()}${e.reverse ? "-reverse" : ""}-translatex`
          }, {
            default: ue(() => [
              (g(), C("div", { key: e.panelKey }, [
                L(
                  "ul",
                  {
                    class: m(e.n("head"))
                  },
                  [
                    (g(!0), C(
                      Me,
                      null,
                      Ke(e.sortWeekList, (r) => (g(), C(
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
                L(
                  "ul",
                  {
                    class: m(e.n("body"))
                  },
                  [
                    (g(!0), C(
                      Me,
                      null,
                      Ke(e.days, (r, a) => (g(), C("li", { key: a }, [
                        Z(o, He({
                          type: "primary",
                          "mp-day-picker-cover": "",
                          round: "",
                          ripple: !1,
                          elevation: e.componentProps.buttonElevation,
                          ref_for: !0
                        }, nz({}, e.buttonProps(r)), {
                          onClick: (i) => e.chooseDay(r, i)
                        }), {
                          default: ue(() => [
                            Be(
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
const qv = ee({
  name: "DayPickerPanel",
  components: {
    MpButton: Mn,
    PanelHeader: Bu
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
    const [t, o, r] = e.current.split("-"), a = $([]), i = $(!1), l = $(0), s = $(null), u = en({
      left: !1,
      right: !1
    }), { t: c } = lt(), d = O(
      () => e.preview.previewYear === t && e.preview.previewMonth === o
    ), p = O(
      () => e.choose.chooseYear === e.preview.previewYear && e.choose.chooseMonth === e.preview.previewMonth
    ), f = O(() => {
      const D = Bo.findIndex((U) => U === e.componentProps.firstDayOfWeek);
      return D === -1 || D === 0 ? Bo : [...Bo.slice(D), ...Bo.slice(0, D)];
    }), h = (D) => {
      var U, V;
      return (V = (U = (c || rn)("datePickerWeekDict")) == null ? void 0 : U[D].abbr) != null ? V : "";
    }, v = (D) => D > 0 ? D : "", y = () => {
      const {
        preview: { previewMonth: D, previewYear: U }
      } = e, V = ce(`${U}-${D}`).daysInMonth(), W = ce(`${U}-${D}-01`).day(), A = f.value.findIndex((T) => T === `${W}`);
      a.value = [...Array(A).fill(-1), ...Array.from(Array(V + 1).keys())].filter((T) => T);
    }, w = () => {
      const {
        preview: { previewYear: D, previewMonth: U },
        componentProps: { max: V, min: W }
      } = e;
      if (V) {
        const A = `${D}-${Y(U) + 1}`;
        u.right = !ce(A).isSameOrBefore(ce(V), "month");
      }
      if (W) {
        const A = `${D}-${Y(U) - 1}`;
        u.left = !ce(A).isSameOrAfter(ce(W), "month");
      }
    }, k = (D) => {
      const {
        preview: { previewYear: U, previewMonth: V },
        componentProps: { min: W, max: A }
      } = e;
      let T = !0, B = !0;
      const j = `${U}-${V}-${D}`;
      return A && (T = ce(j).isSameOrBefore(ce(A), "day")), W && (B = ce(j).isSameOrAfter(ce(W), "day")), T && B;
    }, b = (D) => {
      const {
        choose: { chooseDays: U, chooseRangeDay: V },
        componentProps: { range: W }
      } = e;
      if (W) {
        if (!V.length)
          return !1;
        const A = ce(D).isSameOrBefore(ce(V[1]), "day"), T = ce(D).isSameOrAfter(ce(V[0]), "day");
        return A && T;
      }
      return U.includes(D);
    }, z = (D) => {
      if (D < 0)
        return {
          variant: "text",
          status: "default",
          textColor: "",
          class: _t("button"),
          disabled: !0
        };
      const {
        choose: { chooseDay: U },
        preview: { previewYear: V, previewMonth: W },
        componentProps: { allowedDates: A, color: T, multiple: B, range: j }
      } = e, E = `${V}-${W}-${D}`, J = () => j || B ? b(E) : Y(U) === D && p.value, ne = k(D) ? A ? !A(E) : !1 : !0, ye = () => ne ? !0 : j || B ? !b(E) : !p.value || Y(U) !== D, Te = () => d.value && Y(r) === D && e.componentProps.showCurrent ? (j || B || p.value) && ne ? !0 : j || B ? !b(E) : p.value ? U !== r : !0 : !1, H = () => ne ? "" : Te() ? T ?? "" : J() ? "" : `${yr()}-color-cover`, Q = H().startsWith(yr());
      return {
        variant: Te() ? "outline" : ye() ? "text" : "default",
        status: ye() ? "default" : "primary",
        textColor: Q ? "" : H(),
        [`${yr()}-color-cover`]: Q,
        class: tz(_t("button"), _t("button--usable"), [ne, _t("button--disabled")]),
        disabled: ne
      };
    }, I = (D) => {
      i.value = D === "prev", l.value += D === "prev" ? -1 : 1, n("check-preview", "month", D);
    }, P = (D, U) => {
      U.currentTarget.classList.contains(_t("button--disabled")) || n("choose-day", D);
    }, M = (D) => {
      s.value.checkDate(D);
    };
    return yn(() => {
      y(), w();
    }), pe(
      () => e.preview,
      () => {
        y(), w();
      }
    ), pe(() => [e.componentProps.max, e.componentProps.min], w), {
      n: _t,
      nDate: yr,
      days: a,
      reverse: i,
      headerEl: s,
      panelKey: l,
      sortWeekList: f,
      panelBtnDisabled: u,
      forwardRef: M,
      filterDay: v,
      getDayAbbr: h,
      checkDate: I,
      chooseDay: P,
      buttonProps: z
    };
  }
});
qv.render = oz;
var rz = qv, az = Object.defineProperty, hd = Object.getOwnPropertySymbols, iz = Object.prototype.hasOwnProperty, lz = Object.prototype.propertyIsEnumerable, bd = (e, n, t) => n in e ? az(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t, sz = (e, n) => {
  for (var t in n || (n = {}))
    iz.call(n, t) && bd(e, t, n[t]);
  if (hd)
    for (var t of hd(n))
      lz.call(n, t) && bd(e, t, n[t]);
  return e;
};
ce.extend(Wv);
ce.extend(Yv);
const { n: wr, classes: uz } = x("month-picker"), { n: kr } = x("date-picker");
function cz(e, n) {
  const t = te("panel-header"), o = te("mp-button");
  return g(), C(
    "div",
    {
      class: m(e.n())
    },
    [
      L(
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
          Z(Qe, {
            name: `${e.nDate()}${e.reverse ? "-reverse" : ""}-translatex`
          }, {
            default: ue(() => [
              (g(), C("ul", { key: e.panelKey }, [
                (g(!0), C(
                  Me,
                  null,
                  Ke(e.MONTH_LIST, (r) => (g(), C("li", { key: r }, [
                    Z(o, He({
                      type: "primary",
                      "mp-month-picker-cover": "",
                      ripple: !1,
                      elevation: e.componentProps.buttonElevation,
                      ref_for: !0
                    }, sz({}, e.buttonProps(r)), {
                      onClick: (a) => e.chooseMonth(r, a)
                    }), {
                      default: ue(() => [
                        Be(
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
const Xv = ee({
  name: "MonthPickerPanel",
  components: {
    MpButton: Mn,
    PanelHeader: Bu
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
    const [t, o] = e.current.split("-"), r = $(!1), a = $(0), i = $(null), l = en({
      left: !1,
      right: !1
    }), { t: s } = lt(), u = O(() => e.choose.chooseYear === e.preview.previewYear), c = O(() => e.preview.previewYear === t), d = (k) => {
      var b, z;
      return (z = (b = (s || rn)("datePickerMonthDict")) == null ? void 0 : b[k].abbr) != null ? z : "";
    }, p = (k) => {
      const {
        preview: { previewYear: b },
        componentProps: { min: z, max: I }
      } = e;
      let P = !0, M = !0;
      const D = `${b}-${k}`;
      return I && (P = ce(D).isSameOrBefore(ce(I), "month")), z && (M = ce(D).isSameOrAfter(ce(z), "month")), P && M;
    }, f = (k) => {
      const {
        choose: { chooseMonths: b, chooseDays: z, chooseRangeMonth: I },
        componentProps: { type: P, range: M }
      } = e;
      if (M) {
        if (!I.length)
          return !1;
        const D = ce(k).isSameOrBefore(ce(I[1]), "month"), U = ce(k).isSameOrAfter(ce(I[0]), "month");
        return D && U;
      }
      return P === "month" ? b.includes(k) : z.some((D) => D.includes(k));
    }, h = (k) => {
      const {
        choose: { chooseMonth: b },
        preview: { previewYear: z },
        componentProps: { allowedDates: I, color: P, multiple: M, range: D }
      } = e, U = `${z}-${k}`, V = () => D || M ? f(U) : b === k && u.value, A = p(k) ? I ? !I(U) : !1 : !0, T = () => A ? !0 : D || M ? !f(U) : !u.value || b !== k, B = () => c.value && o === k && e.componentProps.showCurrent ? (D || M || u.value) && A ? !0 : D || M ? !f(U) : u.value ? b !== o : !0 : !1, j = () => A ? "" : B() ? P ?? "" : V() ? "" : `${kr()}-color-cover`, E = j().startsWith(kr());
      return {
        variant: B() ? "outline" : T() ? "text" : "default",
        status: T() ? "default" : "primary",
        color: T() ? "" : P,
        textColor: E ? "" : j(),
        [`${kr()}-color-cover`]: E,
        class: uz(wr("button"), [A, wr("button--disabled")]),
        disabled: A
      };
    }, v = (k, b) => {
      b.currentTarget.classList.contains(wr("button--disabled")) || n("choose-month", k);
    }, y = (k) => {
      r.value = k === "prev", a.value += k === "prev" ? -1 : 1, n("check-preview", "year", k);
    }, w = (k) => {
      i.value.checkDate(k);
    };
    return pe(
      () => [e.preview.previewYear, e.componentProps.max, e.componentProps.min],
      ([k, b, z]) => {
        b && (l.right = !ce(`${Y(k) + 1}`).isSameOrBefore(ce(b), "year")), z && (l.left = !ce(`${Y(k) - 1}`).isSameOrAfter(ce(z), "year"));
      },
      { immediate: !0 }
    ), {
      n: wr,
      nDate: kr,
      t: rn,
      MONTH_LIST: Ar,
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
Xv.render = cz;
var dz = Xv;
const Ao = {
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
var yd = (e, n, t) => new Promise((o, r) => {
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
const { name: pz, n: mz, classes: fz } = x("sticky");
function vz(e, n) {
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
      L(
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
const Gv = ee({
  name: pz,
  props: Ao,
  setup(e) {
    const n = $(null), t = $(null), o = $(!1), r = $("0px"), a = $("0px"), i = $("auto"), l = $("auto"), s = $("auto"), u = $("auto"), c = O(() => !e.disabled && e.cssMode), d = O(() => !e.disabled && !e.cssMode && o.value), p = O(() => tn(e.offsetTop));
    let f;
    pe(() => e.disabled, k), yn(() => yd(this, null, function* () {
      yield bn(), v(), y();
    })), rr(w), nt(k), je(() => window, "scroll", y);
    function h() {
      const { cssMode: b, disabled: z } = e;
      if (z)
        return;
      let I = 0;
      if (f && f !== window) {
        const { top: W } = nn(f);
        I = W;
      }
      const P = t.value, M = n.value, { top: D, left: U } = nn(M), V = D - I;
      return V <= p.value ? (b || (i.value = `${M.offsetWidth}px`, l.value = `${M.offsetHeight}px`, r.value = `${I + p.value}px`, a.value = `${U}px`, s.value = `${P.offsetWidth}px`, u.value = `${P.offsetHeight}px`, o.value = !0), {
        offsetTop: p.value,
        isFixed: !0
      }) : (o.value = !1, {
        offsetTop: V,
        isFixed: !1
      });
    }
    function v() {
      f = Dt(n.value), f !== window && f.addEventListener("scroll", y);
    }
    function y() {
      const b = h();
      b && S(e.onScroll, b.offsetTop, b.isFixed);
    }
    function w() {
      !f || f === window || f.removeEventListener("scroll", y);
    }
    function k() {
      return yd(this, null, function* () {
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
      n: mz,
      classes: fz,
      resize: k,
      toNumber: Y
    };
  }
});
Gv.render = vz;
var si = Gv;
re(si);
ie(si, Ao);
const _M = si;
var yo = si, gz = Object.defineProperty, wd = Object.getOwnPropertySymbols, hz = Object.prototype.hasOwnProperty, bz = Object.prototype.propertyIsEnumerable, kd = (e, n, t) => n in e ? gz(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t, yz = (e, n) => {
  for (var t in n || (n = {}))
    hz.call(n, t) && kd(e, t, n[t]);
  if (wd)
    for (var t of wd(n))
      bz.call(n, t) && kd(e, t, n[t]);
  return e;
};
const { n: $r, classes: $d } = x("year-picker"), { n: Cr } = x("date-picker");
function wz(e, n) {
  const t = te("panel-header"), o = te("mp-sticky"), r = te("mp-button");
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
    Z(Qe, {
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
              Me,
              null,
              Ke(e.yearList, (a) => (g(), C("li", { key: a }, [
                Z(r, He({
                  type: "primary",
                  "mp-year-picker-cover": "",
                  ripple: !1,
                  elevation: e.componentProps.buttonElevation,
                  ref_for: !0
                }, yz({}, e.buttonProps(`${a}`)), {
                  onClick: (i) => e.chooseYear(a, i)
                }), {
                  default: ue(() => [
                    Be(
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
const Zv = ee({
  name: "YearPickerPanel",
  components: {
    MpButton: Mn,
    MpSticky: yo,
    PanelHeader: Bu
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
    const [t] = e.current.split("-"), o = $(), r = $(null), a = $(!1), i = $(0), l = $(0), s = en({
      left: !1,
      right: !1
    }), u = O(() => {
      if (!e.preview)
        return [];
      const w = Math.floor(Y(e.preview) / 100 + l.value) * 100;
      return Array.from(Array(100), (k, b) => Math.max(0, w) + b);
    }), c = (w) => {
      const {
        choose: { chooseMonths: k, chooseDays: b, chooseYears: z, chooseRangeYear: I },
        componentProps: { type: P, range: M }
      } = e;
      if (M) {
        if (!I.length)
          return !1;
        const D = ce(w).isSameOrBefore(ce(I[1]), "year"), U = ce(w).isSameOrAfter(ce(I[0]), "year");
        return D && U;
      }
      return P === "year" ? z.includes(w) : P === "month" ? k.some((D) => D.includes(w)) : b.some((D) => D.includes(w));
    }, d = (w) => {
      const {
        componentProps: { min: k, max: b }
      } = e, z = b ? ce(w).isSameOrBefore(ce(b), "year") : !0, I = k ? ce(w).isSameOrAfter(ce(k), "year") : !0;
      return z && I;
    }, p = (w) => {
      const {
        choose: { chooseYear: k },
        componentProps: { allowedDates: b, color: z, multiple: I, range: P }
      } = e, M = () => P || I ? c(w) : k === w, U = d(w) ? b ? !b(w) : !1 : !0, V = () => U ? !0 : P || I ? !c(w) : k !== w, W = () => t === w && e.componentProps.showCurrent ? (P || I) && U ? !0 : P || I ? !c(w) : k !== t : !1, A = () => U ? "" : W() ? z ?? "" : M() ? "" : `${Cr()}-color-cover`, T = A().startsWith(Cr());
      return {
        variant: W() ? "outline" : V() ? "text" : "default",
        status: V() ? "default" : "primary",
        color: V() ? "" : z,
        textColor: T ? "" : A(),
        [`${Cr()}-color-cover`]: T,
        class: $d($r("button"), [U, $r("button--disabled")]),
        disabled: U
      };
    }, f = (w, k) => {
      k.currentTarget.classList.contains($r("button--disabled")) || n("choose-year", w);
    }, h = () => {
      var w;
      const k = (w = o.value.querySelector(".mp-button--status-primary")) != null ? w : o.value.querySelector(".mp-button--variant-outline");
      k == null || k.scrollIntoView({
        block: "center"
      });
    }, v = (w) => {
      const k = w === "prev";
      a.value = k, i.value += k ? -1 : 1, l.value += k ? -1 : 1;
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
        const [k, b, z] = w;
        b && (s.right = !ce(`${Y(k[k.length - 1])}`).isSameOrBefore(ce(b), "year")), z && (s.left = !ce(`${Y(k[0])}`).isSameOrAfter(ce(z), "year")), Y(k[0] <= 0) && (s.left = !1);
      },
      {
        immediate: !0
      }
    ), {
      n: $r,
      classes: $d,
      buttonProps: p,
      panel: o,
      headerEl: r,
      yearList: u,
      reverse: a,
      panelKey: i,
      panelBtnDisabled: s,
      nDate: Cr,
      checkDate: v,
      chooseYear: f,
      forwardRef: y,
      toNumber: Y
    };
  }
});
Zv.render = wz;
var kz = Zv, $z = (e, n, t) => new Promise((o, r) => {
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
const { name: Cz, n: Sz, classes: zz } = x("date-picker");
function Pz(e, n) {
  var t;
  const o = te("year-picker-panel"), r = te("month-picker-panel"), a = te("day-picker-panel");
  return g(), C(
    "div",
    {
      class: m(e.classes(e.n(), e.formatElevation(e.elevation, 2)))
    },
    [
      L(
        "div",
        {
          class: m(e.n("title")),
          style: G({ background: e.titleColor || e.color })
        },
        [
          L(
            "div",
            {
              class: m(e.n("title-select"))
            },
            [
              L(
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
                    Be(
                      se(e.chooseYear),
                      1
                      /* TEXT */
                    )
                  ])
                ],
                2
                /* CLASS */
              )) : X("v-if", !0)
            ],
            2
            /* CLASS */
          ),
          L(
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
              Z(Qe, {
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
                      Be(
                        se(e.getYearTitle),
                        1
                        /* TEXT */
                      )
                    ]) : e.multiple ? F(e.$slots, "multiple", {
                      key: 1,
                      choose: e.getChoose.chooseYears
                    }, () => [
                      Be(
                        se(e.getYearTitle),
                        1
                        /* TEXT */
                      )
                    ]) : F(e.$slots, "year", {
                      key: 2,
                      year: e.chooseYear
                    }, () => [
                      Be(
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
                      Be(
                        se(e.getMonthTitle),
                        1
                        /* TEXT */
                      )
                    ]) : e.multiple ? F(e.$slots, "multiple", {
                      key: 1,
                      choose: e.getChoose.chooseMonths
                    }, () => [
                      Be(
                        se(e.getMonthTitle),
                        1
                        /* TEXT */
                      )
                    ]) : F(e.$slots, "month", {
                      key: 2,
                      month: e.chooseMonth,
                      year: e.chooseYear
                    }, () => [
                      Be(
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
                      Be(
                        se(e.getDateTitle),
                        1
                        /* TEXT */
                      )
                    ]) : e.multiple ? F(e.$slots, "multiple", {
                      key: 1,
                      choose: e.getChoose.chooseDays
                    }, () => [
                      Be(
                        se(e.getDateTitle),
                        1
                        /* TEXT */
                      )
                    ]) : F(e.$slots, "date", Yt(He({ key: 2 }, e.slotProps)), () => [
                      Be(
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
      L(
        "div",
        {
          class: m(e.n("body")),
          onTouchstart: n[2] || (n[2] = (...i) => e.handleTouchstart && e.handleTouchstart(...i)),
          onTouchmove: n[3] || (n[3] = (...i) => e.handleTouchmove && e.handleTouchmove(...i)),
          onTouchend: n[4] || (n[4] = (...i) => e.handleTouchend && e.handleTouchend(...i))
        },
        [
          Z(Qe, {
            name: `${e.n()}-panel-fade`
          }, {
            default: ue(() => [
              e.getPanelType === "year" ? (g(), we(o, {
                key: 0,
                ref: "yearPanelEl",
                choose: e.getChoose,
                current: e.currentDate,
                "component-props": e.componentProps,
                preview: e.previewYear,
                onChooseYear: e.getChooseYear
              }, null, 8, ["choose", "current", "component-props", "preview", "onChooseYear"])) : e.getPanelType === "month" ? (g(), we(r, {
                key: 1,
                ref: "monthPanelEl",
                current: e.currentDate,
                choose: e.getChoose,
                preview: e.getPreview,
                "click-year": () => e.clickEl("year"),
                "component-props": e.componentProps,
                onChooseMonth: e.getChooseMonth,
                onCheckPreview: e.checkPreview
              }, null, 8, ["current", "choose", "preview", "click-year", "component-props", "onChooseMonth", "onCheckPreview"])) : e.getPanelType === "date" ? (g(), we(a, {
                key: 2,
                ref: "dayPanelEl",
                current: e.currentDate,
                choose: e.getChoose,
                preview: e.getPreview,
                "component-props": e.componentProps,
                "click-month": () => e.clickEl("month"),
                onChooseDay: e.getChooseDay,
                onCheckPreview: e.checkPreview
              }, null, 8, ["current", "choose", "preview", "component-props", "click-month", "onChooseDay", "onCheckPreview"])) : X("v-if", !0)
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
      )) : X("v-if", !0)
    ],
    2
    /* CLASS */
  );
}
const Jv = ee({
  name: Cz,
  components: {
    MonthPickerPanel: dz,
    YearPickerPanel: kz,
    DayPickerPanel: rz
  },
  props: Hv,
  setup(e) {
    const { t: n } = lt(), t = ce().format("YYYY-MM-D"), [o, r] = t.split("-"), a = Ar.find((le) => le === r), i = $(!1), l = $(!1), s = $(!0), u = $(), c = $(), d = $(), p = $(a), f = $(o), h = $(!1), v = $([]), y = $([]), w = $([]), k = $([]), b = $([]), z = $([]), I = $(null), P = $(null), M = $(null), D = O(() => ({
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
      chooseRangeYear: k.value,
      chooseRangeMonth: b.value,
      chooseRangeDay: z.value
    })), V = O(() => ({
      previewMonth: p.value,
      previewYear: f.value
    })), W = O(() => {
      var le;
      const { multiple: $e, range: Pe } = e;
      return Pe ? k.value.length ? `${k.value[0]} ~ ${k.value[1]}` : "" : $e ? `${v.value.length}${(n || rn)("datePickerSelected")}` : (le = c.value) != null ? le : "";
    }), A = O(() => {
      var le, $e;
      const { multiple: Pe, range: Le } = e;
      if (Le)
        return b.value.length ? `${b.value[0]} ~ ${b.value[1]}` : "";
      let Ve = "";
      return u.value && (Ve = ($e = (le = (n || rn)("datePickerMonthDict")) == null ? void 0 : le[u.value].name) != null ? $e : ""), Pe ? `${y.value.length}${(n || rn)("datePickerSelected")}` : Ve;
    }), T = O(() => {
      var le, $e, Pe, Le;
      const { multiple: Ve, range: pn } = e;
      if (pn) {
        const Po = z.value.map((mb) => ce(mb).format("YYYY-MM-DD"));
        return Po.length ? `${Po[0]} ~ ${Po[1]}` : "";
      }
      if (Ve)
        return `${w.value.length}${(n || rn)("datePickerSelected")}`;
      if (!c.value || !u.value || !d.value)
        return "";
      const gn = ce(`${c.value}-${u.value}-${d.value}`).day(), hn = Bo.find((Po) => Po === `${gn}`), Ht = ($e = (le = (n || rn)("datePickerWeekDict")) == null ? void 0 : le[hn].name) != null ? $e : "", db = (Le = (Pe = (n || rn)("datePickerMonthDict")) == null ? void 0 : Pe[u.value].name) != null ? Le : "", pb = Zt(d.value, 2, "0");
      return (n || rn)("lang") === "zh-CN" ? `${u.value}-${pb} ${Ht.slice(0, 3)}` : `${Ht.slice(0, 3)}, ${db.slice(0, 3)} ${d.value}`;
    }), B = O(() => e.type === "year" || i.value ? "year" : e.type === "month" || l.value ? "month" : e.type === "date" ? "date" : ""), j = O(() => !e.touchable || !B.value), E = O(() => {
      var le, $e;
      const Pe = ce(`${c.value}-${u.value}-${d.value}`).day(), Le = d.value ? Zt(d.value, 2, "0") : "";
      return {
        week: `${Pe}`,
        year: (le = c.value) != null ? le : "",
        month: ($e = u.value) != null ? $e : "",
        date: Le
      };
    }), J = O(
      () => U.value.chooseRangeDay.map((le) => ce(le).format("YYYY-MM-DD"))
    ), q = O(() => c.value === f.value), ne = O(() => u.value === p.value);
    let ye = 0, Te = 0, H = "", Q;
    pe(
      () => e.modelValue,
      (le) => {
        if (!(!We() || oe(le)))
          if (e.range) {
            if (!Fe(le))
              return;
            s.value = le.length !== 1, de(le, e.type);
          } else if (e.multiple) {
            if (!Fe(le))
              return;
            ke(le, e.type);
          } else
            Ie(le);
      },
      { immediate: !0 }
    ), pe(B, _e);
    function ae(le) {
      le === "year" ? i.value = !0 : le === "month" ? l.value = !0 : (i.value = !1, l.value = !1);
    }
    function ve(le) {
      if (j.value)
        return;
      const { clientX: $e, clientY: Pe } = le.touches[0];
      ye = $e, Te = Pe;
    }
    function N(le, $e) {
      return le >= $e && le > 20 ? "x" : "y";
    }
    function K(le) {
      if (j.value)
        return;
      const { clientX: $e, clientY: Pe } = le.touches[0], Le = $e - ye, Ve = Pe - Te;
      Q = N(Math.abs(Le), Math.abs(Ve)), H = Le > 0 ? "prev" : "next";
    }
    function me() {
      return $z(this, null, function* () {
        if (j.value || Q !== "x")
          return;
        const le = B.value === "year" ? I : B.value === "month" ? P : M;
        yield bn(), le.value.forwardRef(H), _e();
      });
    }
    function Se(le, $e) {
      const Pe = $e === "year" ? k : $e === "month" ? b : z;
      if (Pe.value = s.value ? [le, le] : [Pe.value[0], le], s.value = !s.value, s.value) {
        const Ve = ce(Pe.value[0]).isAfter(Pe.value[1]) ? [Pe.value[1], Pe.value[0]] : [...Pe.value];
        S(e["onUpdate:modelValue"], Ve), S(e.onChange, Ve);
      }
    }
    function Ue(le, $e) {
      const Pe = $e === "year" ? v : $e === "month" ? y : w, Le = $e === "year" ? "YYYY" : $e === "month" ? "YYYY-MM" : "YYYY-MM-DD", Ve = Pe.value.map((gn) => ce(gn).format(Le)), pn = Ve.findIndex((gn) => gn === le);
      pn === -1 ? Ve.push(le) : Ve.splice(pn, 1), S(e["onUpdate:modelValue"], Ve), S(e.onChange, Ve);
    }
    function Re(le, $e) {
      return !c.value || !u.value ? !1 : q.value ? le === "year" ? $e < Y(c.value) : le === "month" ? $e < u.value : ne.value ? $e < Y(d.value) : u.value > p.value : c.value > f.value;
    }
    function xe(le) {
      const { readonly: $e, range: Pe, multiple: Le, onChange: Ve, "onUpdate:modelValue": pn } = e;
      if (le < 0 || $e)
        return;
      h.value = Re("day", le);
      const gn = `${f.value}-${p.value}-${le}`, hn = ce(gn).format("YYYY-MM-DD");
      Pe ? Se(hn, "day") : Le ? Ue(hn, "day") : (S(pn, hn), S(Ve, hn));
    }
    function sn(le) {
      const { type: $e, readonly: Pe, range: Le, multiple: Ve, onChange: pn, onPreview: gn, "onUpdate:modelValue": hn } = e;
      if (h.value = Re("month", le), $e === "month" && !Pe) {
        const Ht = `${f.value}-${le}`;
        Le ? Se(Ht, "month") : Ve ? Ue(Ht, "month") : (S(hn, Ht), S(pn, Ht));
      } else
        p.value = le, S(
          gn,
          Y(f.value),
          Y(p.value),
          $e === "date" ? Y(d.value) : void 0
        );
      l.value = !1;
    }
    function Sn(le) {
      const { type: $e, readonly: Pe, range: Le, multiple: Ve, onChange: pn, onPreview: gn, "onUpdate:modelValue": hn } = e;
      h.value = Re("year", le), $e === "year" && !Pe ? Le ? Se(`${le}`, "year") : Ve ? Ue(`${le}`, "year") : (S(hn, `${le}`), S(pn, `${le}`)) : (f.value = `${le}`, S(
        gn,
        Y(f.value),
        Y(p.value),
        $e === "date" ? Y(d.value) : void 0
      )), i.value = !1;
    }
    function fe(le, $e) {
      const Pe = $e === "prev" ? -1 : 1;
      if (le === "year")
        f.value = `${Y(f.value) + Pe}`;
      else {
        let Le = Y(p.value) + Pe;
        Le < 1 && (f.value = `${Y(f.value) - 1}`, Le = 12), Le > 12 && (f.value = `${Y(f.value) + 1}`, Le = 1), p.value = Ar.find((Ve) => Y(Ve) === Le);
      }
      S(
        e.onPreview,
        Y(f.value),
        Y(p.value),
        e.type === "date" ? Y(d.value) : void 0
      );
    }
    function We() {
      return (e.multiple || e.range) && !Fe(e.modelValue) ? (lo("DatePicker", 'type of prop "modelValue" should be an Array'), !1) : !e.multiple && !e.range && Fe(e.modelValue) ? (lo("DatePicker", 'type of prop "modelValue" should be a String'), !1) : !0;
    }
    function oe(le) {
      return Fe(le) ? !1 : le === "Invalid Date" ? (lo("DatePicker", '"modelValue" is an Invalid Date'), !0) : !1;
    }
    function de(le, $e) {
      const Pe = $e === "year" ? k : $e === "month" ? b : z, Le = $e === "year" ? "YYYY" : $e === "month" ? "YYYY-MM" : "YYYY-MM-D", Ve = le.map((hn) => ce(hn).format(Le)).slice(0, 2);
      if (Pe.value.some((hn) => oe(hn)))
        return;
      Pe.value = Ve;
      const gn = ce(Pe.value[0]).isAfter(Pe.value[1]);
      Pe.value.length === 2 && gn && (Pe.value = [Pe.value[1], Pe.value[0]]);
    }
    function ke(le, $e) {
      const Pe = $e === "year" ? v : $e === "month" ? y : w, Le = $e === "year" ? "YYYY" : $e === "month" ? "YYYY-MM" : "YYYY-MM-D", Ve = Array.from(new Set(le.map((pn) => ce(pn).format(Le))));
      Pe.value = Ve.filter((pn) => pn !== "Invalid Date");
    }
    function Ie(le) {
      const Pe = (le ? ce(le) : ce()).format("YYYY-MM-D");
      if (oe(Pe))
        return;
      const [Le, Ve, pn] = Pe.split("-"), gn = Ar.find((hn) => hn === Ve);
      u.value = gn, c.value = Le, d.value = pn, p.value = gn, f.value = Le;
    }
    function _e() {
      Te = 0, ye = 0, H = "", Q = void 0;
    }
    return {
      yearPanelEl: I,
      monthPanelEl: P,
      dayPanelEl: M,
      reverse: h,
      currentDate: t,
      chooseMonth: u,
      chooseYear: c,
      chooseDay: d,
      previewYear: f,
      isYearPanel: i,
      isMonthPanel: l,
      getMonthTitle: A,
      getDateTitle: T,
      getYearTitle: W,
      getPanelType: B,
      getChoose: U,
      getPreview: V,
      componentProps: D,
      slotProps: E,
      formatRange: J,
      pt: n,
      t: rn,
      n: Sz,
      classes: zz,
      clickEl: ae,
      handleTouchstart: ve,
      handleTouchmove: K,
      handleTouchend: me,
      getChooseDay: xe,
      getChooseMonth: sn,
      getChooseYear: Sn,
      checkPreview: fe,
      formatElevation: dn
    };
  }
});
Jv.render = Pz;
var ui = Jv;
re(ui);
ie(ui, Hv);
const eI = ui;
var es = ui, Oz = Object.defineProperty, Cd = Object.getOwnPropertySymbols, Ez = Object.prototype.hasOwnProperty, Tz = Object.prototype.propertyIsEnumerable, Sd = (e, n, t) => n in e ? Oz(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t, Bz = (e, n) => {
  for (var t in n || (n = {}))
    Ez.call(n, t) && Sd(e, t, n[t]);
  if (Cd)
    for (var t of Cd(n))
      Tz.call(n, t) && Sd(e, t, n[t]);
  return e;
};
const Qv = Bz({
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
}, De(Co, [
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
var Mz = Object.defineProperty, zd = Object.getOwnPropertySymbols, Iz = Object.prototype.hasOwnProperty, Dz = Object.prototype.propertyIsEnumerable, Pd = (e, n, t) => n in e ? Mz(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t, Az = (e, n) => {
  for (var t in n || (n = {}))
    Iz.call(n, t) && Pd(e, t, n[t]);
  if (zd)
    for (var t of zd(n))
      Dz.call(n, t) && Pd(e, t, n[t]);
  return e;
};
const { name: Nz, n: Rz, classes: Lz } = x("dialog");
function Vz(e, n) {
  const t = te("mp-button"), o = te("mp-popup");
  return g(), we(o, {
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
      L(
        "div",
        He({
          class: e.classes(e.n("$--box"), e.n(), e.dialogClass),
          style: Az({ width: e.toSizeUnit(e.width) }, e.dialogStyle)
        }, e.$attrs),
        [
          L(
            "div",
            {
              class: m(e.n("title"))
            },
            [
              F(e.$slots, "title", {}, () => {
                var r;
                return [
                  Be(
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
          L(
            "div",
            {
              class: m(e.n("message")),
              style: G({ textAlign: e.messageAlign })
            },
            [
              F(e.$slots, "default", {}, () => [
                Be(
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
            L(
              "div",
              {
                class: m(e.n("actions"))
              },
              [
                e.cancelButton ? (g(), we(t, {
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
                      Be(
                        se((r = e.cancelButtonText) != null ? r : (e.pt ? e.pt : e.t)("dialogCancelButtonText")),
                        1
                        /* TEXT */
                      )
                    ];
                  }),
                  _: 1
                  /* STABLE */
                }, 8, ["class", "text-color", "color", "onClick"])) : X("v-if", !0),
                e.confirmButton ? (g(), we(t, {
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
                      Be(
                        se((r = e.confirmButtonText) != null ? r : (e.pt ? e.pt : e.t)("dialogConfirmButtonText")),
                        1
                        /* TEXT */
                      )
                    ];
                  }),
                  _: 1
                  /* STABLE */
                }, 8, ["class", "text-color", "color", "onClick"])) : X("v-if", !0)
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
const xv = ee({
  name: Nz,
  components: {
    MpPopup: It,
    MpButton: Mn
  },
  inheritAttrs: !1,
  props: Qv,
  setup(e) {
    const n = $(!1), t = $(!1), { t: o } = lt();
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
      t: rn,
      n: Rz,
      classes: Lz,
      handleClickOverlay: a,
      confirm: i,
      cancel: l,
      toSizeUnit: Oe,
      handleKeyEscape: s
    };
  }
});
xv.render = Vz;
var pr = xv, Fz = Object.defineProperty, Uz = Object.defineProperties, jz = Object.getOwnPropertyDescriptors, Od = Object.getOwnPropertySymbols, Hz = Object.prototype.hasOwnProperty, Yz = Object.prototype.propertyIsEnumerable, Ed = (e, n, t) => n in e ? Fz(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t, ul = (e, n) => {
  for (var t in n || (n = {}))
    Hz.call(n, t) && Ed(e, t, n[t]);
  if (Od)
    for (var t of Od(n))
      Yz.call(n, t) && Ed(e, t, n[t]);
  return e;
}, Wz = (e, n) => Uz(e, jz(n));
let St, ra = {};
function Kz(e = {}) {
  return ln(e) ? Wz(ul({}, ra), { message: e }) : ul(ul({}, ra), e);
}
function Ut(e) {
  return et() ? new Promise((n) => {
    Ut.close();
    const t = Kz(e), o = en(t);
    o.teleport = "body", St = o;
    const { unmountInstance: r } = $o(pr, o, {
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
        S(o.onClosed), r(), St === o && (St = null);
      },
      onRouteChange: () => {
        r(), St === o && (St = null);
      },
      "onUpdate:show": (a) => {
        o.show = a;
      }
    });
    o.show = !0;
  }) : Promise.resolve();
}
Ut.setDefaultOptions = function(e) {
  ra = e;
};
Ut.resetDefaultOptions = function() {
  ra = {};
};
Ut.close = function() {
  if (St != null) {
    const e = St;
    St = null, Ye().then(() => {
      e.show = !1;
    });
  }
};
Ut.Component = pr;
re(pr);
re(pr, Ut);
ie(Ut, Qv);
const nI = pr;
var ns = Ut;
const _v = {
  inset: {
    type: [Boolean, Number, String],
    default: !1
  },
  vertical: Boolean,
  description: String,
  margin: String,
  dashed: Boolean,
  hairline: Boolean
}, { name: qz, n: Xz, classes: Gz } = x("divider");
function Zz(e, n) {
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
      e.vertical ? X("v-if", !0) : F(e.$slots, "default", { key: 0 }, () => [
        e.description ? (g(), C(
          "span",
          {
            key: 0,
            class: m(e.n("text"))
          },
          se(e.description),
          3
          /* TEXT, CLASS */
        )) : X("v-if", !0)
      ])
    ],
    6
    /* CLASS, STYLE */
  );
}
const eg = ee({
  name: qz,
  props: _v,
  setup(e, { slots: n }) {
    const t = $(!1), o = O(() => {
      const { vertical: i, inset: l } = e;
      return !i && l === !0;
    }), r = O(() => {
      const { inset: i, vertical: l, margin: s } = e;
      if (tr(i) || l)
        return { margin: s };
      const u = Y(i), c = Math.abs(u) + (i + "").replace(u + "", "");
      return {
        margin: s,
        width: `calc(100% - ${Oe(c)})`,
        left: u > 0 ? Oe(c) : Oe(0)
      };
    });
    yn(a), _o(a);
    function a() {
      const { description: i, vertical: l } = e;
      t.value = (n.default || i != null) && !l;
    }
    return {
      n: Xz,
      classes: Gz,
      withText: t,
      style: r,
      withPresetInset: o
    };
  }
});
eg.render = Zz;
var ci = eg;
re(ci);
ie(ci, _v);
const tI = ci;
var ts = ci;
const ng = {
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
var Jz = Object.defineProperty, Qz = Object.defineProperties, xz = Object.getOwnPropertyDescriptors, Td = Object.getOwnPropertySymbols, _z = Object.prototype.hasOwnProperty, eP = Object.prototype.propertyIsEnumerable, Bd = (e, n, t) => n in e ? Jz(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t, Md = (e, n) => {
  for (var t in n || (n = {}))
    _z.call(n, t) && Bd(e, t, n[t]);
  if (Td)
    for (var t of Td(n))
      eP.call(n, t) && Bd(e, t, n[t]);
  return e;
}, Id = (e, n) => Qz(e, xz(n));
const { name: nP, n: tP, classes: oP } = x("drag");
function rP(e, n) {
  return g(), we(it, {
    to: e.teleport === !1 ? void 0 : e.teleport,
    disabled: e.teleportDisabled || e.teleport === !1
  }, [
    L(
      "div",
      He({
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
const tg = ee({
  name: nP,
  inheritAttrs: !1,
  props: ng,
  setup(e, { attrs: n }) {
    const t = $(null), o = $(0), r = $(0), a = $(!1), i = $(!1), { touching: l, dragging: s, moveX: u, moveY: c, startTouch: d, moveTouch: p, endTouch: f, resetTouch: h } = ko(), { disabled: v } = xt(), y = en({
      top: 0,
      bottom: 0,
      left: 0,
      right: 0
    });
    pe(() => e.boundary, V), nt(A), yn(() => {
      V(), A();
    });
    function w(B) {
      e.disabled || (d(B), I());
    }
    function k(B) {
      !l.value || e.disabled || (p(B), Ae(B), i.value = !1, a.value = !0, e.direction.includes("x") && (o.value += u.value), e.direction.includes("y") && (r.value += c.value), U());
    }
    function b() {
      e.disabled || (f(), i.value = !0, D());
    }
    function z(B) {
      s.value || S(e.onClick, B);
    }
    function I() {
      const { left: B, top: j } = P();
      o.value = B, r.value = j;
    }
    function P() {
      const B = nn(t.value), j = nn(window), E = B.top - j.top, J = j.bottom - B.bottom, q = B.left - j.left, ne = j.right - B.right, { width: ye, height: Te } = B, { width: H, height: Q } = j;
      return {
        top: E,
        bottom: J,
        left: q,
        right: ne,
        width: ye,
        height: Te,
        halfWidth: ye / 2,
        halfHeight: Te / 2,
        windowWidth: H,
        windowHeight: Q
      };
    }
    function M() {
      const B = P(), j = y.left, E = B.windowWidth - y.right - B.width, J = y.top, q = B.windowHeight - y.bottom - B.height;
      return {
        minX: j,
        minY: J,
        // fallback the drag element overflows boundary
        maxX: j < E ? E : j,
        maxY: J < q ? q : J
      };
    }
    function D() {
      if (e.attraction == null)
        return;
      const { halfWidth: B, halfHeight: j, top: E, bottom: J, left: q, right: ne } = P(), { minX: ye, minY: Te, maxX: H, maxY: Q } = M(), ae = q + B - y.left, ve = ne + B - y.right, N = E + j - y.top, K = J + j - y.bottom, me = ae <= ve, Se = N <= K;
      e.attraction.includes("x") && (o.value = me ? ye : H), e.attraction.includes("y") && (r.value = Se ? Te : Q);
    }
    function U() {
      const { minX: B, minY: j, maxX: E, maxY: J } = M();
      o.value = $n(o.value, B, E), r.value = $n(r.value, j, J);
    }
    function V() {
      const { top: B = 0, bottom: j = 0, left: E = 0, right: J = 0 } = e.boundary;
      y.top = tn(B), y.bottom = tn(j), y.left = tn(E), y.right = tn(J);
    }
    function W() {
      var B;
      const j = (B = n.style) != null ? B : {};
      return Id(Md({}, n), {
        style: Id(Md({}, j), {
          // when the drag element is dragged for the first time, the inset should be cleared to avoid affecting translateX and translateY.
          top: a.value ? 0 : j.top,
          left: a.value ? 0 : j.left,
          right: a.value ? "auto" : j.right,
          bottom: a.value ? "auto" : j.bottom,
          transform: a.value ? `translate(${o.value}px, ${r.value}px)` : j.transform
        })
      });
    }
    function A() {
      a.value && (I(), U());
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
      n: tP,
      classes: oP,
      getAttrs: W,
      handleTouchstart: w,
      handleTouchmove: k,
      handleTouchend: b,
      handleClick: z,
      resize: A,
      reset: T
    };
  }
});
tg.render = rP;
var di = tg;
re(di);
ie(di, ng);
const oI = di;
var aa = di;
const og = {
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
}, { name: aP, n: iP, classes: lP } = x("tooltip");
function sP(e, n) {
  return g(), C(
    "div",
    {
      ref: "host",
      class: m(e.classes(e.n(), e.n("$--box")))
    },
    [
      F(e.$slots, "default"),
      (g(), we(it, {
        to: e.teleport === !1 ? void 0 : e.teleport,
        disabled: e.teleportDisabled || e.teleport === !1
      }, [
        Z(Qe, {
          name: e.n(),
          onAfterEnter: e.onOpened,
          onAfterLeave: e.handleClosed,
          persisted: ""
        }, {
          default: ue(() => [
            Ne(L(
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
                L(
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
                      Be(
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
const rg = ee({
  name: aP,
  props: og,
  setup(e) {
    const { disabled: n } = xt(), {
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
    } = vf(e);
    return {
      popover: t,
      host: o,
      referenceSize: r,
      show: a,
      zIndex: i,
      teleportDisabled: n,
      toSizeUnit: Oe,
      n: iP,
      classes: lP,
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
rg.render = sP;
var pi = rg;
re(pi);
ie(pi, og);
const rI = pi;
var ia = pi;
const ag = {
  expand: Boolean,
  expandTrigger: String,
  lineClamp: [Number, String],
  tooltip: {
    type: [Object, Boolean],
    default: !0
  },
  "onUpdate:expand": R()
};
var uP = Object.defineProperty, Dd = Object.getOwnPropertySymbols, cP = Object.prototype.hasOwnProperty, dP = Object.prototype.propertyIsEnumerable, Ad = (e, n, t) => n in e ? uP(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t, pP = (e, n) => {
  for (var t in n || (n = {}))
    cP.call(n, t) && Ad(e, t, n[t]);
  if (Dd)
    for (var t of Dd(n))
      dP.call(n, t) && Ad(e, t, n[t]);
  return e;
};
const { name: mP, n: fP, classes: vP } = x("ellipsis"), gP = { key: 0 };
function hP(e, n) {
  const t = te("mp-tooltip");
  return g(), we(t, He({
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
            gP,
            se(e.tooltipProps.content),
            1
            /* TEXT */
          )) : F(e.$slots, "default", { key: 1 })
        ];
      })
    ]),
    default: ue(() => [
      L("span", null, [
        F(e.$slots, "default")
      ])
    ]),
    _: 3
    /* FORWARDED */
  }, 16, ["class", "style", "onClick"]);
}
const ig = ee({
  name: mP,
  components: { MpTooltip: ia },
  props: ag,
  setup(e) {
    const n = Gn(e, "expand"), t = O(() => e.lineClamp ? { "-webkit-line-clamp": e.lineClamp } : {}), o = O(() => e.tooltip === !1 ? {
      disabled: !0
    } : e.tooltip === !0 ? {
      sameWidth: !0
    } : pP({ sameWidth: !0 }, e.tooltip));
    function r() {
      e.expandTrigger && (n.value = !n.value);
    }
    return {
      tooltipProps: o,
      expanding: n,
      rootStyles: t,
      n: fP,
      classes: vP,
      handleClick: r
    };
  }
});
ig.render = hP;
var mi = ig;
re(mi);
ie(mi, ag);
const aI = mi;
var os = mi;
const lg = {
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
}, { name: bP, n: yP, classes: wP } = x("empty"), Nd = {
  xs: "80px",
  sm: "100px",
  md: "120px",
  lg: "140px",
  xl: "160px"
}, kP = ["src", "alt"], $P = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 48 48",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
};
function CP(e, n) {
  return g(), C(
    "div",
    He({
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
            }, null, 8, kP)) : (g(), C("svg", $P, n[1] || (n[1] = [
              L(
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
      )) : X("v-if", !0),
      e.showDescription && (e.description || e.$slots.default) ? (g(), C(
        "div",
        {
          key: 1,
          class: m(e.n("description"))
        },
        [
          F(e.$slots, "default", {}, () => [
            Be(
              se(e.description),
              1
              /* TEXT */
            )
          ])
        ],
        2
        /* CLASS */
      )) : X("v-if", !0),
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
      )) : X("v-if", !0)
    ],
    16
    /* FULL_PROPS */
  );
}
const sg = ee({
  name: bP,
  props: lg,
  setup(e) {
    return {
      imageStyle: O(() => {
        const { imageSize: o } = e;
        if (o in Nd) {
          const a = Nd[o];
          return { width: a, height: a };
        }
        const r = zn(o) ? `${o}px` : o;
        return { width: r, height: r };
      }),
      handleClick: (o) => {
        var r;
        (r = e.onClick) == null || r.call(e, o);
      },
      n: yP,
      classes: wP
    };
  }
});
sg.render = CP;
var fi = sg;
re(fi);
ie(fi, lg);
const iI = fi;
var rs = fi;
const ug = {
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
  inactiveIconSize: De(cn, "size"),
  activeIconSize: De(cn, "size"),
  inactiveIconNamespace: De(cn, "namespace"),
  activeIconNamespace: De(cn, "namespace"),
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
  name: SP,
  classes: cl,
  n: Nn
} = x("fab");
var vi = ee({
  name: SP,
  inheritAttrs: !1,
  props: ug,
  setup(e, {
    slots: n,
    attrs: t
  }) {
    const o = Gn(e, "active"), r = $(null), a = $(null);
    pe(() => e.trigger, () => {
      o.value = !1;
    }), pe(() => e.disabled, () => {
      o.value = !1;
    }), pe(() => [e.position, e.fixed, e.top, e.bottom, e.left, e.right], () => {
      var c;
      (c = a.value) == null || c.reset();
    }), dm(r, "click", s);
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
      }) : null : Ne(Z(Mn, {
        "mp-fab-cover": !0,
        class: Nn("trigger"),
        type: e.type,
        color: e.color,
        disabled: e.disabled,
        elevation: e.elevation,
        iconContainer: !0
      }, {
        default: () => [Z(Ze, {
          "mp-fab-cover": !0,
          class: cl([o.value, Nn("trigger-active-icon"), Nn("trigger-inactive-icon")]),
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
      const d = mm((c = S(n.default)) != null ? c : []), p = tr(e.drag) ? {} : e.drag;
      return Z(aa, He({
        ref: a,
        class: cl(Nn(`--position-${e.position}`), [!e.fixed, Nn("--absolute")]),
        style: {
          top: Oe(e.top),
          bottom: Oe(e.bottom),
          left: Oe(e.left),
          right: Oe(e.right)
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
          class: cl(Nn(), Nn(`--direction-${e.direction}`), [e.safeArea, Nn("--safe-area")]),
          ref: r,
          onMouseleave: () => l(!1, d.length),
          onMouseenter: () => l(!0, d.length)
        }, [Z(Qe, {
          name: Nn("--active-transition")
        }, {
          default: () => [u()]
        }), Z(Qe, {
          name: Nn(`--actions-transition-${e.direction}`),
          onAfterEnter: e.onOpened,
          onAfterLeave: e.onClosed
        }, {
          default: () => [Ne(Z("div", {
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
re(vi);
ie(vi, ug);
const lI = vi;
var as = vi;
const cg = {
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
}, { name: zP, n: PP, classes: OP } = x("floating-panel"), Rd = 100, Ld = 0.2;
function EP(e, n) {
  return g(), we(it, {
    to: e.teleport === !1 ? void 0 : e.teleport,
    disabled: e.teleportDisabled || e.teleport === !1
  }, [
    L(
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
          L(
            "div",
            {
              class: m(e.n("header"))
            },
            [
              L(
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
        L(
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
const dg = ee({
  name: zP,
  props: cg,
  setup(e) {
    const n = $(0), t = $(null), { height: o } = N0(), r = O(() => o.value * 0.6), a = Gn(e, "anchor", { defaultValue: Rd }), i = O(() => {
      const U = [Rd, r.value], { anchors: V } = e;
      return Wn(V) ? U : V;
    }), l = O(() => Math.min(...i.value)), s = O(() => Math.max(...i.value)), { disabled: u } = xt(), { deltaY: c, touching: d, startTouch: p, moveTouch: f, endTouch: h, isReachTop: v, isReachBottom: y } = ko();
    let w;
    ir(() => d.value), pe(() => a.value, k, { immediate: !0 }), pe(
      () => i.value,
      () => {
        k(a.value);
      },
      { immediate: !0 }
    );
    function k(U) {
      P(U ?? l.value);
    }
    function b(U) {
      p(U), w = n.value;
    }
    function z(U) {
      var V;
      f(U);
      const W = U.target, A = t.value === W || ((V = t.value) == null ? void 0 : V.contains(W));
      if (A && !e.contentDraggable)
        return;
      if (A && e.contentDraggable && n.value >= s.value && !v(t.value)) {
        y(t.value) && Ae(U);
        return;
      }
      const T = w - c.value;
      P(M(T)), Ae(U);
    }
    function I() {
      h();
      const U = a.value;
      P(n.value), a.value = n.value, a.value !== U && S(e.onAnchorChange, n.value);
    }
    function P(U) {
      n.value = d.value ? U : D(U);
    }
    function M(U) {
      if (U > s.value) {
        const V = U - s.value;
        return s.value + V * Ld;
      }
      if (U < l.value) {
        const V = l.value - U;
        return l.value - V * Ld;
      }
      return U;
    }
    function D(U) {
      if (i.value.includes(U))
        return U;
      let V = 1 / 0, W = 0;
      return i.value.forEach((A) => {
        const T = Math.abs(A - U);
        T < V && (V = T, W = A);
      }), W;
    }
    return {
      contentRef: t,
      teleportDisabled: u,
      touching: d,
      minAnchor: l,
      maxAnchor: s,
      visibleHeight: n,
      n: PP,
      classes: OP,
      toSizeUnit: Oe,
      toNumber: Y,
      formatElevation: dn,
      handleTouchstart: b,
      handleTouchmove: z,
      handleTouchend: I
    };
  }
});
dg.render = EP;
var gi = dg;
re(gi);
ie(gi, cg);
const sI = gi;
var is = gi;
const pg = {
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
var Vd = (e, n, t) => new Promise((o, r) => {
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
const { name: TP, n: BP } = x("form");
function MP(e, n) {
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
const mg = ee({
  name: TP,
  props: pg,
  setup(e) {
    const n = O(() => e.disabled), t = O(() => e.readonly), { formItems: o, bindFormItems: r } = P1();
    r({
      disabled: n,
      readonly: t
    });
    function i(p) {
      setTimeout(() => {
        const f = Dt(p), h = f === window ? 0 : ac(f), v = ac(p) - h - tn(e.scrollToErrorOffsetY);
        Lo(f, {
          top: v,
          animation: Sl
        });
      }, 300);
    }
    function l(p) {
      return Vd(this, null, function* () {
        Ae(p);
        const f = yield u();
        S(e.onSubmit, f);
      });
    }
    function s(p) {
      Ae(p), c(), S(e.onReset);
    }
    function u() {
      return Vd(this, null, function* () {
        var p;
        const f = yield Promise.all(o.map(({ validate: h }) => h()));
        if (e.scrollToError) {
          const [, h] = qp(f, (y) => y === !1, e.scrollToError), v = h > -1;
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
      n: BP,
      handleSubmit: l,
      handleReset: s,
      validate: u,
      reset: c,
      resetValidation: d
    };
  }
});
mg.render = MP;
var So = mg;
So.useValidation = Un;
So.useForm = jn;
re(So);
ie(So, pg);
const uI = So;
var ls = So;
const fg = {
  highlighter: Object,
  theme: String,
  tag: {
    type: String,
    default: "div"
  }
}, { name: IP, n: DP } = x("highlighter-provider"), AP = ee({
  name: IP,
  props: fg,
  setup(e, { slots: n }) {
    const t = O(() => e.highlighter), o = O(() => e.theme);
    return aS({ highlighter: t, theme: o }), () => xo(
      e.tag,
      {
        class: DP()
      },
      S(n.default)
    );
  }
});
var hi = AP;
re(hi);
ie(hi, fg);
const cI = hi;
var ss = hi;
const vg = {
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
}, { name: NP, n: RP, classes: LP } = x("image"), VP = ["alt", "title", "referrerpolicy", "lazy-loading", "lazy-error"], FP = ["alt", "title", "referrerpolicy", "src"];
function UP(e, n) {
  var t;
  const o = Ge("lazy"), r = Ge("ripple");
  return Ne((g(), C(
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
      e.lazy && !e.showErrorSlot ? Ne((g(), C("img", {
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
      }, null, 46, VP)), [
        [o, (t = e.src) != null ? t : ""]
      ]) : X("v-if", !0),
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
      }, null, 46, FP)) : X("v-if", !0),
      e.showErrorSlot ? F(e.$slots, "error", { key: 2 }) : X("v-if", !0)
    ],
    6
    /* CLASS, STYLE */
  )), [
    [r, { disabled: !e.ripple }]
  ]);
}
const gg = ee({
  name: NP,
  directives: {
    Lazy: Wo,
    Ripple: on
  },
  props: vg,
  setup(e, { slots: n }) {
    const t = $(!1);
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
      n: RP,
      classes: LP,
      toSizeUnit: Oe,
      handleLoad: r,
      handleError: o,
      handleClick: a
    };
  }
});
gg.render = UP;
var bi = gg;
re(bi);
ie(bi, vg);
const dI = bi;
var us = bi;
const Mu = {
  loop: {
    type: Boolean,
    default: !0
  },
  autoplay: [String, Number],
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
  vertical: Boolean,
  touchable: {
    type: Boolean,
    default: !0
  },
  onChange: R()
};
var eo = (e, n, t) => new Promise((o, r) => {
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
const jP = 250, HP = 20, { name: YP, n: Fd, classes: WP } = x("swipe"), KP = ["onClick"];
function qP(e, n) {
  const t = te("mp-icon"), o = te("mp-button"), r = Ge("hover");
  return Ne((g(), C(
    "div",
    {
      ref: "swipeEl",
      class: m(e.n())
    },
    [
      L(
        "div",
        {
          class: m(e.classes(e.n("track"), [e.vertical, e.n("--vertical")])),
          style: G({
            width: e.vertical ? void 0 : e.toSizeUnit(e.trackSize),
            height: e.vertical ? e.toSizeUnit(e.trackSize) : void 0,
            transform: `translate${e.vertical ? "Y" : "X"}(${e.toSizeUnit(e.trackTranslate)})`,
            transitionDuration: e.lockDuration ? "0ms" : `${e.toNumber(e.duration)}ms`
          }),
          onTouchstart: n[0] || (n[0] = (...a) => e.handleTouchstart && e.handleTouchstart(...a)),
          onTouchmove: n[1] || (n[1] = (...a) => e.handleTouchmove && e.handleTouchmove(...a)),
          onTouchend: n[2] || (n[2] = (...a) => e.handleTouchend && e.handleTouchend(...a))
        },
        [
          F(e.$slots, "default")
        ],
        38
        /* CLASS, STYLE, NEED_HYDRATION */
      ),
      e.navigation ? F(e.$slots, "prev", Yt(He({ key: 0 }, {
        index: e.index,
        length: e.length,
        prev: e.prev,
        next: e.next,
        to: e.to,
        hovering: e.hovering
      })), () => [
        Z(Qe, {
          name: e.getNavigationAnimation("prev")
        }, {
          default: ue(() => [
            e.navigation === !0 || e.hovering ? (g(), C(
              "div",
              {
                key: 0,
                class: m(e.classes(e.n("navigation"), e.n("navigation-prev"), [e.vertical, e.n("--navigation-vertical-prev")]))
              },
              [
                Z(o, {
                  "mp-swipe-cover": "",
                  disabled: !e.loop && e.index === 0,
                  class: m(e.n("navigation-prev-button")),
                  onClick: n[3] || (n[3] = (a) => e.prev())
                }, {
                  default: ue(() => [
                    Z(t, {
                      "mp-swipe-cover": "",
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
            )) : X("v-if", !0)
          ]),
          _: 1
          /* STABLE */
        }, 8, ["name"])
      ]) : X("v-if", !0),
      e.navigation ? F(e.$slots, "next", Yt(He({ key: 1 }, {
        index: e.index,
        length: e.length,
        hovering: e.hovering,
        prev: e.prev,
        next: e.next,
        to: e.to
      })), () => [
        Z(Qe, {
          name: e.getNavigationAnimation("next")
        }, {
          default: ue(() => [
            e.navigation === !0 || e.hovering ? (g(), C(
              "div",
              {
                key: 0,
                class: m(e.classes(e.n("navigation"), e.n("navigation-next"), [e.vertical, e.n("--navigation-vertical-next")]))
              },
              [
                Z(o, {
                  "mp-swipe-cover": "",
                  class: m(e.n("navigation-next-button")),
                  disabled: !e.loop && e.index === e.length - 1,
                  onClick: n[4] || (n[4] = (a) => e.next())
                }, {
                  default: ue(() => [
                    Z(t, {
                      "mp-swipe-cover": "",
                      class: m(e.n("navigation-next-button-icon")),
                      name: e.vertical ? "chevron-down" : "chevron-right"
                    }, null, 8, ["class", "name"])
                  ]),
                  _: 1
                  /* STABLE */
                }, 8, ["class", "disabled"])
              ],
              2
              /* CLASS */
            )) : X("v-if", !0)
          ]),
          _: 1
          /* STABLE */
        }, 8, ["name"])
      ]) : X("v-if", !0),
      F(e.$slots, "indicator", Yt(ca({
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
            class: m(e.classes(e.n("indicators"), [e.vertical, e.n("--indicators-vertical")]))
          },
          [
            (g(!0), C(
              Me,
              null,
              Ke(e.length, (a, i) => (g(), C("div", {
                key: a,
                class: m(
                  e.classes(e.n("indicator"), [e.index === i, e.n("--indicator-active")], [e.vertical, e.n("--indicator-vertical")])
                ),
                style: G({ background: e.indicatorColor }),
                onClick: (l) => e.to(i)
              }, null, 14, KP))),
              128
              /* KEYED_FRAGMENT */
            ))
          ],
          2
          /* CLASS */
        )) : X("v-if", !0)
      ])
    ],
    2
    /* CLASS */
  )), [
    [r, e.handleHovering]
  ]);
}
const hg = ee({
  name: YP,
  directives: { Hover: Dn },
  components: { MpButton: Mn, MpIcon: Ze },
  props: Mu,
  setup(e) {
    const n = $(null), t = $(0), o = O(() => e.vertical), r = $(0), a = $(0), i = $(!1), l = $(0), s = $(!1), { swipeItems: u, bindSwipeItems: c, length: d } = O1(), { swipeResizeListeners: p, bindSwipeResizeListeners: f } = E1(), { popup: h, bindPopup: v } = Sm(), {
      deltaX: y,
      deltaY: w,
      moveX: k,
      moveY: b,
      offsetX: z,
      offsetY: I,
      touching: P,
      direction: M,
      startTime: D,
      startTouch: U,
      moveTouch: V,
      endTouch: W
    } = ko(), A = O(() => M.value === (e.vertical ? "vertical" : "horizontal"));
    let T = !1, B = -1;
    c({
      size: t,
      currentIndex: l,
      vertical: o
    }), je(() => window, "keydown", Ue), S(v, null), S(f, null), pe(
      () => d.value,
      () => eo(this, null, function* () {
        yield bn(), H(), Re();
      })
    ), h && pe(
      () => h.show.value,
      (fe) => eo(this, null, function* () {
        fe ? (yield bn(), Re()) : ae();
      })
    ), Rt(Re), rr(ae), nt(Re);
    function E(fe) {
      return u.find(({ index: We }) => We.value === fe);
    }
    function J() {
      e.loop && (a.value >= 0 && E(d.value - 1).setTranslate(-r.value), a.value <= -(r.value - t.value) && E(0).setTranslate(r.value), a.value > -(r.value - t.value) && a.value < 0 && (E(d.value - 1).setTranslate(0), E(0).setTranslate(0)));
    }
    function q(fe) {
      const We = zn(fe) ? fe : Math.floor((a.value - t.value / 2) / -t.value), { loop: oe } = e;
      return We <= -1 ? oe ? -1 : 0 : We >= d.value ? oe ? d.value : d.value - 1 : We;
    }
    function ne(fe) {
      const { loop: We } = e;
      return fe === -1 ? We ? d.value - 1 : 0 : fe === d.value ? We ? 0 : d.value - 1 : fe;
    }
    function ye(fe) {
      return e.loop ? fe < 0 ? d.value + fe : fe >= d.value ? fe - d.value : fe : $n(fe, 0, d.value - 1);
    }
    function Te() {
      return eo(this, null, function* () {
        const fe = a.value >= t.value, We = a.value <= -r.value, oe = 0, de = -(r.value - t.value);
        i.value = !0, (fe || We) && (i.value = !0, a.value = We ? oe : de, E(0).setTranslate(0), E(d.value - 1).setTranslate(0)), yield bn(), i.value = !1;
      });
    }
    function H() {
      T || (l.value = ye(Y(e.initialIndex)), T = !0);
    }
    function Q() {
      const { autoplay: fe } = e;
      !fe || d.value <= 1 || (ae(), B = window.setTimeout(() => {
        xe(), Q();
      }, Y(fe)));
    }
    function ae() {
      B && clearTimeout(B);
    }
    function ve(fe) {
      return eo(this, null, function* () {
        d.value <= 1 || !e.touchable || (U(fe), ae(), yield Te(), i.value = !0);
      });
    }
    function N(fe) {
      const { touchable: We, vertical: oe } = e;
      !P.value || !We || (V(fe), A.value && (Ae(fe), a.value += oe ? b.value : k.value, J()));
    }
    function K() {
      if (!P.value || (W(), !A.value))
        return;
      const { vertical: fe, onChange: We } = e, oe = fe ? w.value < 0 : y.value < 0, de = fe ? I.value : z.value, Ie = performance.now() - D.value <= jP && de >= HP ? q(oe ? l.value + 1 : l.value - 1) : q();
      i.value = !1, a.value = Ie * -t.value;
      const _e = l.value;
      l.value = ne(Ie), Q(), _e !== l.value && S(We, l.value);
    }
    function me(fe) {
      e.navigation === "hover" && (s.value = fe);
    }
    function Se(fe) {
      return e.navigation !== "hover" ? "" : Fd(`--navigation${e.vertical ? "-vertical" : ""}-${fe}-animation`);
    }
    function Ue(fe) {
      if (!u.length || u.findIndex(({ isFocusing: de }) => de.value) === -1)
        return;
      const { key: oe } = fe;
      Ae(fe), oe === "ArrowLeft" && sn(), oe === "ArrowRight" && xe();
    }
    function Re() {
      n.value && (i.value = !0, t.value = e.vertical ? n.value.offsetHeight : n.value.offsetWidth, r.value = t.value * d.value, a.value = l.value * -t.value, u.forEach((fe) => {
        fe.setTranslate(0);
      }), Q(), setTimeout(() => {
        i.value = !1;
      }), p.forEach(({ onResize: fe }) => {
        fe();
      }));
    }
    function xe(fe) {
      return eo(this, null, function* () {
        if (d.value <= 1)
          return;
        H();
        const { loop: We, onChange: oe } = e, de = l.value;
        if (l.value = ye(de + 1), (fe == null ? void 0 : fe.event) !== !1 && S(oe, l.value), yield Te(), de === d.value - 1 && We) {
          E(0).setTranslate(r.value), a.value = d.value * -t.value;
          return;
        }
        de !== d.value - 1 && (a.value = l.value * -t.value);
      });
    }
    function sn(fe) {
      return eo(this, null, function* () {
        if (d.value <= 1)
          return;
        H();
        const { loop: We, onChange: oe } = e, de = l.value;
        if (l.value = ye(de - 1), (fe == null ? void 0 : fe.event) !== !1 && S(oe, l.value), yield Te(), de === 0 && We) {
          E(d.value - 1).setTranslate(-r.value), a.value = t.value;
          return;
        }
        de !== 0 && (a.value = l.value * -t.value);
      });
    }
    function Sn(fe, We) {
      if (d.value <= 1 || fe === l.value)
        return;
      fe = fe < 0 ? 0 : fe, fe = fe >= d.value ? d.value : fe;
      const oe = fe > l.value ? xe : sn, de = Math.abs(fe - l.value);
      Array.from({ length: de }).forEach((ke, Ie) => {
        oe({ event: Ie === de - 1 ? We == null ? void 0 : We.event : !1 });
      });
    }
    return {
      length: d,
      index: l,
      swipeEl: n,
      trackSize: r,
      trackTranslate: a,
      lockDuration: i,
      hovering: s,
      n: Fd,
      toSizeUnit: Oe,
      classes: WP,
      handleTouchstart: ve,
      handleTouchmove: N,
      handleTouchend: K,
      next: xe,
      prev: sn,
      to: Sn,
      resize: Re,
      toNumber: Y,
      handleHovering: me,
      getNavigationAnimation: Se
    };
  }
});
hg.render = qP;
var yi = hg;
re(yi);
ie(yi, Mu);
const pI = yi;
var qo = yi;
function XP() {
  const { bindParent: e, index: n, parentProvider: t } = wn(Qm);
  return Xn(!!e, "SwipeItem", "<mp-swipe-item/> must in <mp-swipe/>"), {
    index: n,
    swipe: t,
    bindSwipe: e
  };
}
const { name: GP, n: ZP } = x("swipe-item"), JP = ["aria-hidden"];
function QP(e, n) {
  return g(), C("div", {
    class: m(e.n()),
    style: G({
      width: e.vertical ? void 0 : e.toSizeUnit(e.size),
      height: e.vertical ? e.toSizeUnit(e.size) : void 0,
      transform: `translate${e.vertical ? "Y" : "X"}(${e.toSizeUnit(e.translate)})`
    }),
    tabindex: "-1",
    "aria-hidden": e.currentIndex !== e.index,
    onFocus: n[0] || (n[0] = (t) => e.isFocusing = !0),
    onBlur: n[1] || (n[1] = (t) => e.isFocusing = !1)
  }, [
    F(e.$slots, "default")
  ], 46, JP);
}
const bg = ee({
  name: GP,
  setup() {
    const e = $(0), n = $(!1), { swipe: t, bindSwipe: o, index: r } = XP(), { size: a, currentIndex: i, vertical: l } = t, s = {
      index: r,
      isFocusing: O(() => n.value),
      setTranslate: u
    };
    o(s);
    function u(c) {
      e.value = c;
    }
    return {
      isFocusing: n,
      size: a,
      index: r,
      currentIndex: i,
      vertical: l,
      translate: e,
      n: ZP,
      toSizeUnit: Oe
    };
  }
});
bg.render = QP;
var Iu = bg;
re(Iu);
const mI = Iu;
var Xo = Iu, xP = Object.defineProperty, Ud = Object.getOwnPropertySymbols, _P = Object.prototype.hasOwnProperty, e4 = Object.prototype.propertyIsEnumerable, jd = (e, n, t) => n in e ? xP(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t, Hd = (e, n) => {
  for (var t in n || (n = {}))
    _P.call(n, t) && jd(e, t, n[t]);
  if (Ud)
    for (var t of Ud(n))
      e4.call(n, t) && jd(e, t, n[t]);
  return e;
};
const yg = Hd(Hd({
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
}, De(Mu, ["loop", "indicator", "onChange"])), De(Co, [
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
])), { name: n4, n: Yd, classes: t4 } = x("image-preview"), dl = 12, Wd = 200, o4 = 350, Kd = 200, r4 = 500, Sr = 1, a4 = ["onTouchstart"], i4 = ["src", "alt"];
function l4(e, n) {
  const t = te("mp-swipe-item"), o = te("mp-swipe"), r = te("mp-icon"), a = te("mp-popup");
  return g(), we(a, {
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
      Z(o, He({
        ref: "swipeRef",
        class: e.n("swipe"),
        "mp-image-preview-cover": "",
        touchable: e.canSwipe,
        indicator: e.indicator && e.images.length > 1,
        "initial-index": e.toNumber(e.initialIndex),
        loop: e.loop
      }, e.$attrs, { onChange: e.onChange }), {
        default: ue(() => [
          (g(!0), C(
            Me,
            null,
            Ke(e.images, (i, l) => (g(), we(t, {
              key: i,
              class: m(e.n("swipe-item")),
              "mp-image-preview-cover": ""
            }, {
              default: ue(() => [
                L("div", {
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
                  L("img", {
                    role: "img",
                    class: m(e.classes(e.n("image"), [e.isPreventDefault, e.n("--prevent")])),
                    src: i,
                    alt: i
                  }, null, 10, i4)
                ], 46, a4)
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
            )) : X("v-if", !0)
          ])
        ]),
        _: 3
        /* FORWARDED */
      }, 16, ["class", "touchable", "indicator", "initial-index", "loop", "onChange"]),
      F(e.$slots, "close-icon", {}, () => [
        e.closeable ? (g(), we(r, {
          key: 0,
          class: m(e.n("close-icon")),
          name: "close-circle",
          "mp-image-preview-cover": "",
          onClick: e.close
        }, null, 8, ["class", "onClick"])) : X("v-if", !0)
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
      )) : X("v-if", !0)
    ]),
    _: 3
    /* FORWARDED */
  }, 8, ["show", "class", "transition", "close-on-key-escape", "lock-scroll", "teleport", "onOpen", "onClose", "onClosed", "onOpened", "onKeyEscape", "onRouteChange"]);
}
const wg = ee({
  name: n4,
  components: {
    MpSwipe: qo,
    MpSwipeItem: Xo,
    MpPopup: It,
    MpIcon: Ze
  },
  inheritAttrs: !1,
  props: yg,
  setup(e) {
    const n = Gn(e, "show"), t = $(1), o = $(0), r = $(0), a = $(), i = $(), l = $(!0), s = $(null), { moveX: u, moveY: c, distance: d, startTime: p, startTouch: f, moveTouch: h, endTouch: v } = ko(), y = O(() => {
      const { imagePreventDefault: H, show: Q } = e;
      return Q && H;
    });
    let w = null, k = null, b = !1;
    const z = {
      start: null,
      prev: null
    };
    je(() => document, "contextmenu", J);
    function I(H) {
      t.value = Y(H), l.value = !1, z.prev = null, window.setTimeout(() => {
        a.value = "linear", i.value = "0s";
      }, Kd);
    }
    function P() {
      t.value = 1, o.value = 0, r.value = 0, l.value = !0, z.prev = null, a.value = void 0, i.value = void 0;
    }
    function M(H) {
      return z.prev ? d.value <= dl && performance.now() - p.value <= Wd && z.prev === H : !1;
    }
    function D(H) {
      return !H || !z.start || !z.prev ? !1 : d.value <= dl && performance.now() - p.value < o4 && (H === z.start || H.parentNode === z.start);
    }
    function U() {
      v(), window.clearTimeout(k), b = !1, z.start = null;
    }
    function V(H) {
      if (v(), window.clearTimeout(k), b) {
        b = !1;
        return;
      }
      const Q = D(H.target);
      w = window.setTimeout(() => {
        Q && E(), z.start = null;
      }, Wd);
    }
    function W(H, Q) {
      window.clearTimeout(w), window.clearTimeout(k);
      const ae = H.currentTarget;
      if (z.start = ae, k = window.setTimeout(() => {
        b = !0, S(e.onLongPress, Q);
      }, r4), M(ae)) {
        t.value > Sr ? P() : I(e.zoom);
        return;
      }
      f(H), z.prev = ae;
    }
    function A(H) {
      const { offsetWidth: Q, offsetHeight: ae } = H, { naturalWidth: ve, naturalHeight: N } = H.querySelector(`.${Yd("image")}`);
      return {
        width: Q,
        height: ae,
        imageRadio: N / ve,
        rootRadio: ae / Q,
        zoom: Y(e.zoom)
      };
    }
    function T(H) {
      const { zoom: Q, imageRadio: ae, rootRadio: ve, width: N, height: K } = A(H);
      if (!ae)
        return 0;
      const me = ae > ve ? K / ae : N;
      return Math.max(0, (Q * me - N) / 2) / Q;
    }
    function B(H) {
      const { zoom: Q, imageRadio: ae, rootRadio: ve, width: N, height: K } = A(H);
      if (!ae)
        return 0;
      const me = ae > ve ? K : N * ae;
      return Math.max(0, (Q * me - K) / 2) / Q;
    }
    function j(H) {
      if (!z.prev)
        return;
      h(H);
      const Q = H.currentTarget;
      if (d.value > dl && window.clearTimeout(k), t.value > Sr) {
        const ae = T(Q), ve = B(Q);
        o.value = $n(o.value + u.value, -ae, ae), r.value = $n(r.value + c.value, -ve, ve);
      }
      z.prev = Q;
    }
    function E() {
      if (t.value > Sr) {
        P(), setTimeout(() => S(e["onUpdate:show"], !1), Kd);
        return;
      }
      S(e["onUpdate:show"], !1);
    }
    function J(H) {
      y.value && Ae(H);
    }
    function q(H) {
      var Q;
      (Q = s.value) == null || Q.prev(H);
    }
    function ne(H) {
      var Q;
      (Q = s.value) == null || Q.next(H);
    }
    function ye(H, Q) {
      var ae;
      (ae = s.value) == null || ae.to(H, Q);
    }
    function Te(H) {
      H <= Sr ? P() : I(H);
    }
    return {
      swipeRef: s,
      isPreventDefault: y,
      show: n,
      scale: t,
      translateX: o,
      translateY: r,
      canSwipe: l,
      transitionTimingFunction: a,
      transitionDuration: i,
      n: Yd,
      classes: t4,
      toNumber: Y,
      handleTouchstart: W,
      handleTouchmove: j,
      handleTouchend: V,
      handleTouchcancel: U,
      close: E,
      prev: q,
      next: ne,
      to: ye,
      zoom: Te
    };
  }
});
wg.render = l4;
var mr = wg, s4 = Object.defineProperty, u4 = Object.defineProperties, c4 = Object.getOwnPropertyDescriptors, qd = Object.getOwnPropertySymbols, d4 = Object.prototype.hasOwnProperty, p4 = Object.prototype.propertyIsEnumerable, Xd = (e, n, t) => n in e ? s4(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t, zr = (e, n) => {
  for (var t in n || (n = {}))
    d4.call(n, t) && Xd(e, t, n[t]);
  if (qd)
    for (var t of qd(n))
      p4.call(n, t) && Xd(e, t, n[t]);
  return e;
}, Gd = (e, n) => u4(e, c4(n));
let zt, No = {};
function m4(e = {}) {
  return ln(e) ? Gd(zr({}, No), { images: [e] }) : Fe(e) ? Gd(zr({}, No), { images: e }) : zr(zr({}, No), e);
}
function jt(e) {
  if (!et())
    return;
  jt.close();
  const n = m4(e), t = en(n);
  t.teleport = "body", zt = t;
  const { unmountInstance: o } = $o(mr, t, {
    onClose: () => S(t.onClose),
    onClosed: () => {
      S(t.onClosed), o(), zt === t && (zt = null);
    },
    onRouteChange: () => {
      o(), zt === t && (zt = null);
    },
    "onUpdate:show": (r) => {
      t.show = r;
    }
  });
  t.show = !0;
}
jt.close = () => {
  if (zt != null) {
    const e = zt;
    zt = null, Ye().then(() => {
      e.show = !1;
    });
  }
};
jt.setDefaultOptions = (e) => {
  No = e;
};
jt.resetDefaultOptions = () => {
  No = {};
};
jt.Component = mr;
re(mr);
re(mr, jt);
ie(jt, yg);
const fI = mr;
var Go = jt;
const kg = {
  index: [Number, String]
}, $g = Symbol("INDEX_BAR_BIND_INDEX_ANCHOR_KEY");
function f4() {
  const { bindChildren: e, length: n, childProviders: t } = kn(
    $g
  );
  return {
    length: n,
    indexAnchors: t,
    bindIndexAnchors: e
  };
}
function v4() {
  const { parentProvider: e, index: n, bindParent: t } = wn(
    $g
  );
  return Xn(!!t, "IndexAnchor", 'You should use this component in "IndexBar"'), {
    index: n,
    indexBar: e,
    bindIndexBar: t
  };
}
const { name: g4, n: h4, classes: b4 } = x("index-anchor");
function y4(e, n) {
  return g(), we(Qt(e.sticky ? e.n("$-sticky") : e.Transition), {
    ref: "anchorEl",
    "offset-top": e.sticky ? e.stickyOffsetTop : null,
    "z-index": e.sticky ? e.zIndex : null,
    disabled: e.disabled && !e.cssMode,
    "css-mode": e.cssMode
  }, {
    default: ue(() => [
      L(
        "div",
        He({
          class: e.n()
        }, e.$attrs),
        [
          F(e.$slots, "default", {}, () => [
            Be(
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
const Cg = ee({
  name: g4,
  components: { MpSticky: yo },
  inheritAttrs: !1,
  props: kg,
  setup(e) {
    const n = $(!1), t = O(() => e.index), o = $(null), { index: r, indexBar: a, bindIndexBar: i } = v4(), { active: l, sticky: s, cssMode: u, stickyOffsetTop: c, zIndex: d } = a;
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
      n: h4,
      classes: b4,
      name: t,
      anchorEl: o,
      active: l,
      sticky: s,
      zIndex: d,
      disabled: n,
      cssMode: u,
      stickyOffsetTop: c,
      Transition: Qe
    };
  }
});
Cg.render = y4;
var wi = Cg;
re(wi);
ie(wi, kg);
const vI = wi;
var cs = wi;
const Sg = {
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
var Zd = (e, n, t) => new Promise((o, r) => {
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
const { name: w4, n: k4, classes: $4 } = x("index-bar"), C4 = ["onClick"];
function S4(e, n) {
  return g(), C(
    "div",
    {
      ref: "barEl",
      class: m(e.n())
    },
    [
      F(e.$slots, "default"),
      L(
        "ul",
        {
          class: m(e.n("anchor-list")),
          style: G({ zIndex: e.toNumber(e.zIndex) + 2, display: e.hideList ? "none" : "block" })
        },
        [
          (g(!0), C(
            Me,
            null,
            Ke(e.anchorNameList, (t) => (g(), C("li", {
              key: t,
              class: m(e.classes(e.n("anchor-item"), [e.active === t, e.n("anchor-item--active")])),
              style: G({ color: e.active === t && e.highlightColor ? e.highlightColor : void 0 }),
              onClick: (o) => e.anchorClick({ anchorName: t, manualCall: !0 })
            }, [
              F(e.$slots, "anchor-name", { anchorName: t }, () => [
                Be(
                  se(t),
                  1
                  /* TEXT */
                )
              ])
            ], 14, C4))),
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
const zg = ee({
  name: w4,
  props: Sg,
  setup(e) {
    const n = $(""), t = $(null), o = $([]), r = $(), a = O(() => e.sticky), i = O(() => e.stickyCssMode), l = O(() => tn(e.stickyOffsetTop)), s = O(() => e.zIndex), { length: u, indexAnchors: c, bindIndexAnchors: d } = f4();
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
      () => Zd(this, null, function* () {
        yield bn(), o.value = c.filter(({ name: P }) => P.value != null).map(({ name: P }) => P.value);
      })
    ), yn(b), ua(z), wo(() => {
      f = !0, z();
    }), Rt(() => {
      !f || r.value === void 0 || (k({
        anchorName: r.value,
        options: { event: !1 }
      }), f = !1);
    }), d(h);
    function v(P, M) {
      const D = Ln(P) ? P.name.value : P;
      D === r.value || D === void 0 || (r.value = D, (M == null ? void 0 : M.event) !== !1 && S(e.onChange, D));
    }
    function y() {
      const { top: P } = nn(p), { top: M } = nn(t.value);
      return vt(p) - P + M;
    }
    function w() {
      const P = vt(p), M = p === window ? document.body.scrollHeight : p.scrollHeight, D = y();
      c.forEach((U, V) => {
        const W = U.getOffsetTop(), A = P - W + l.value - D, T = V === c.length - 1 ? M : c[V + 1].getOffsetTop() - U.getOffsetTop();
        U.setDisabled(!0), A >= 0 && A < T && n.value === "" && (U.setDisabled(!1), v(U));
      });
    }
    function k(P) {
      return Zd(this, arguments, function* ({ anchorName: M, manualCall: D = !1, options: U }) {
        if (D && S(e.onClick, M), M === r.value && !f)
          return;
        const V = c.find(({ name: j }) => M === j.value);
        if (!V)
          return;
        const W = y(), T = V.getOffsetTop() - l.value + W, B = or(p);
        n.value = M, v(M, U), yield Lo(p, {
          left: B,
          top: T,
          animation: $f,
          duration: Y(e.duration)
        }), yield bn(), n.value = "";
      });
    }
    function b() {
      p = Dt(t.value), p.addEventListener("scroll", w);
    }
    function z() {
      p && p.removeEventListener("scroll", w);
    }
    function I(P, M) {
      Mt(() => k({ anchorName: P, options: M }));
    }
    return {
      barEl: t,
      active: r,
      zIndex: s,
      anchorNameList: o,
      n: k4,
      classes: $4,
      toNumber: Y,
      scrollTo: I,
      anchorClick: k
    };
  }
});
zg.render = S4;
var ki = zg;
re(ki);
ie(ki, Sg);
const gI = ki;
var ds = ki;
const Pg = {
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
}, { name: z4, n: P4, classes: O4 } = x("link");
function E4(e, n) {
  return g(), we(Qt(e.tag), He(e.linkProps, {
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
const Og = ee({
  name: z4,
  props: Pg,
  setup(e) {
    const n = $(!1), t = O(() => {
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
      inMobile: Ro,
      n: P4,
      classes: O4,
      handleClick: r,
      toSizeUnit: Oe
    };
  }
});
Og.render = E4;
var $i = Og;
re($i);
ie($i, Pg);
const hI = $i;
var ps = $i;
const Eg = {
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
}, Tg = Symbol("TABS_ITEMS_BIND_TAB_ITEM_KEY");
function T4() {
  const { bindChildren: e, childProviders: n, length: t } = kn(
    Tg
  );
  return {
    length: t,
    tabItemList: n,
    bindTabItem: e
  };
}
const Bg = Symbol("TAB_ITEM_BIND_LIST_KEY");
function B4() {
  const { parentProvider: e, bindParent: n, index: t } = wn(
    Tg
  );
  return Xn(!!n, "TabItem", "<mp-tab-item/> must in <mp-tabs-items/>"), {
    index: t,
    tabsItems: e,
    bindTabsItems: n
  };
}
function M4() {
  const { childProviders: e, bindChildren: n, length: t } = kn(Bg);
  return {
    length: t,
    lists: e,
    bindLists: n
  };
}
function I4() {
  const { parentProvider: e, bindParent: n, index: t } = wn(Bg);
  return {
    index: t,
    tabItem: e,
    bindTabItem: n
  };
}
var D4 = (e, n, t) => new Promise((o, r) => {
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
const { name: A4, n: N4, classes: R4 } = x("list");
function L4(e, n) {
  const t = te("mp-loading"), o = Ge("ripple");
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
          L(
            "div",
            {
              class: m(e.n("loading"))
            },
            [
              L(
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
      }) : X("v-if", !0),
      e.finished ? F(e.$slots, "finished", { key: 1 }, () => {
        var r;
        return [
          L(
            "div",
            {
              class: m(e.n("finished"))
            },
            se((r = e.finishedText) != null ? r : (e.pt ? e.pt : e.t)("listFinishedText")),
            3
            /* TEXT, CLASS */
          )
        ];
      }) : X("v-if", !0),
      e.error ? F(e.$slots, "error", { key: 2 }, () => {
        var r;
        return [
          Ne((g(), C(
            "div",
            {
              class: m(e.n("error")),
              onClick: n[0] || (n[0] = (...a) => e.load && e.load(...a))
            },
            [
              Be(
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
      }) : X("v-if", !0),
      L(
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
const Mg = ee({
  name: A4,
  directives: { Ripple: on },
  components: { MpLoading: go },
  props: Eg,
  setup(e) {
    const n = $(null), t = $(null), { tabItem: o, bindTabItem: r } = I4(), { t: a } = lt();
    let i;
    S(r, {}), o && pe(() => o.current.value, c), pe(() => [e.loading, e.error, e.finished], c), yn(() => {
      i = Dt(n.value), i.addEventListener("scroll", c), e.immediateCheck && c();
    }), rr(u);
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
      return D4(this, null, function* () {
        yield Ye(), !(e.loading || e.finished || e.error || (o == null ? void 0 : o.current.value) === !1 || !s()) && l();
      });
    }
    return {
      listEl: n,
      detectorEl: t,
      pt: a,
      t: rn,
      isNumber: zn,
      load: l,
      check: c,
      n: N4,
      classes: R4
    };
  }
});
Mg.render = L4;
var Ci = Mg;
re(Ci);
ie(Ci, Eg);
const bI = Ci;
var ms = Ci;
const V4 = {
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
  name: F4,
  classes: U4,
  n: Jd
} = x("loading-bar");
var j4 = ee({
  name: F4,
  props: V4,
  setup(e) {
    return () => Z("div", {
      class: U4(Jd(), [e.error, Jd("--error")]),
      style: {
        zIndex: Rn.zIndex + 10,
        width: `${e.value}%`,
        opacity: e.opacity,
        height: Oe(e.height),
        backgroundColor: e.error ? e.errorColor : e.color,
        top: Oe(e.top),
        transitionDuration: e.transitionDuration == null ? void 0 : `${e.transitionDuration}ms`
      }
    }, null);
  }
});
const Du = 200;
let Ig, Dg, Ag, Ng, Si, Qd, Rg = {};
const H4 = {
  value: 0,
  opacity: 0,
  error: !1
}, an = en(H4);
function Y4(e) {
  Object.assign(an, e), Rg = e;
}
const W4 = () => {
  Object.keys(Rg).forEach((e) => {
    an[e] !== void 0 && (an[e] = void 0);
  });
}, Lg = () => {
  Qd || (Qd = !0, $o(j4, an));
}, Au = () => {
  Ig = window.setTimeout(() => {
    an.transitionDuration = void 0, !(an.value >= 95) && (an.value += an.value < 70 ? Math.round(5 * Math.random()) : Math.random(), Au());
  }, 200);
}, Nu = () => {
  window.clearTimeout(Ig), window.clearTimeout(Si), window.clearTimeout(Ag), window.clearTimeout(Dg), window.clearTimeout(Ng);
}, Vg = () => {
  Nu(), an.value = 100, Si = window.setTimeout(() => {
    an.opacity = 0, Ng = window.setTimeout(() => {
      an.error = !1;
    }, 250);
  }, Du + 100);
}, K4 = () => {
  Nu(), an.error = !1, an.value = 0, an.transitionDuration = 0, Lg(), Si = window.setTimeout(() => {
    an.opacity = 1;
  }, Du), Au();
}, q4 = () => {
  var e;
  Ag = window.setTimeout(Vg, (e = an.finishDelay) != null ? e : 0);
}, X4 = () => {
  Nu(), an.error = !0, an.value === 100 && (an.value = 0, an.transitionDuration = 0), Lg(), Si = window.setTimeout(() => {
    an.opacity = 1;
  }, Du), Au(), Dg = window.setTimeout(Vg, 300);
}, Fg = {
  start: K4,
  finish: q4,
  error: X4,
  setDefaultOptions: Y4,
  resetDefaultOptions: W4
}, yI = Fg;
var fs = Fg;
const Ug = {
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
var G4 = Object.defineProperty, Z4 = Object.defineProperties, J4 = Object.getOwnPropertyDescriptors, xd = Object.getOwnPropertySymbols, Q4 = Object.prototype.hasOwnProperty, x4 = Object.prototype.propertyIsEnumerable, _d = (e, n, t) => n in e ? G4(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t, _4 = (e, n) => {
  for (var t in n || (n = {}))
    Q4.call(n, t) && _d(e, t, n[t]);
  if (xd)
    for (var t of xd(n))
      x4.call(n, t) && _d(e, t, n[t]);
  return e;
}, eO = (e, n) => Z4(e, J4(n));
const { name: nO, n: tO } = x("locale-provider"), oO = ee({
  name: nO,
  props: Ug,
  setup(e, { slots: n }) {
    const t = O(
      () => {
        var r;
        return Object.entries((r = e.messages) != null ? r : {}).reduce(
          (a, [i, l]) => (a[i] = eO(_4({}, l), {
            lang: i
          }), a),
          {}
        );
      }
    );
    Z0({
      t: o
    });
    function o(r) {
      if (qt(t.value, e.locale) && qt(t.value[e.locale], r))
        return t.value[e.locale][r];
    }
    return () => xo(
      e.tag,
      {
        class: tO()
      },
      S(n.default)
    );
  }
});
var zi = oO;
re(zi);
ie(zi, Ug);
const wI = zi;
var vs = zi;
const jg = {
  label: {},
  value: {},
  disabled: Boolean,
  ripple: {
    type: Boolean,
    default: !0
  },
  // internal
  option: Object
}, Hg = Symbol("SELECT_BIND_OPTION_KEY");
function rO() {
  const { length: e, childProviders: n, bindChildren: t } = kn(Hg);
  return {
    length: e,
    options: n,
    bindOptions: t
  };
}
function aO() {
  const { index: e, parentProvider: n, bindParent: t } = wn(Hg);
  return Xn(!!t, "Option", "<mp-option/> must in <mp-select/>"), {
    index: e,
    select: n,
    bindSelect: t
  };
}
const { name: iO, n: lO, classes: sO } = x("option"), uO = ["tabindex"];
function cO(e, n) {
  const t = te("mp-checkbox"), o = te("maybe-v-node"), r = te("mp-hover-overlay"), a = Ge("ripple"), i = Ge("hover");
  return Ne((g(), C("div", {
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
    L(
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
    e.multiple ? (g(), we(t, {
      key: 0,
      ref: "checkbox",
      modelValue: e.optionSelected,
      "onUpdate:modelValue": n[0] || (n[0] = (l) => e.optionSelected = l),
      "checked-color": e.focusColor,
      disabled: e.disabled,
      onClick: n[1] || (n[1] = Tn(() => {
      }, ["stop"])),
      onChange: e.handleSelect
    }, null, 8, ["modelValue", "checked-color", "disabled", "onChange"])) : X("v-if", !0),
    F(e.$slots, "default", { selected: e.optionSelected }, () => [
      L(
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
  ], 46, uO)), [
    [a, { disabled: e.disabled || !e.ripple }],
    [i, e.handleHovering, "desktop"]
  ]);
}
const Yg = ee({
  name: iO,
  directives: { Ripple: on, Hover: Dn },
  components: {
    MpCheckbox: co,
    MpHoverOverlay: Vn,
    MaybeVNode: ar
  },
  props: jg,
  setup(e) {
    const n = $(), t = $(!1), o = $(!1), r = O(() => o.value), a = O(() => e.value), i = O(() => e.disabled), l = O(() => e.ripple), { select: s, bindSelect: u } = aO(), { multiple: c, focusColor: d, onSelect: p, computeLabel: f } = s, { hovering: h, handleHovering: v } = _n(), y = O(
      () => {
        var M;
        return vn(e.label) ? e.label(
          (M = e.option) != null ? M : {
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
    pe([() => e.label, () => e.value], f), u(w), je(() => window, "keydown", b), je(() => window, "keyup", z);
    function k() {
      e.disabled || I();
    }
    function b(M) {
      t.value && ((M.key === " " || M.key === "Enter") && Ae(M), M.key === "Enter" && n.value.click());
    }
    function z(M) {
      t.value && M.key === " " && (Ae(M), n.value.click());
    }
    function I() {
      c.value && (o.value = !o.value), p(w);
    }
    function P(M) {
      o.value = M;
    }
    return {
      root: n,
      optionSelected: o,
      multiple: c,
      focusColor: d,
      hovering: h,
      isFocusing: t,
      labelVNode: y,
      n: lO,
      classes: sO,
      handleHovering: v,
      handleClick: k,
      handleSelect: I
    };
  }
});
Yg.render = cO;
var Pi = Yg;
re(Pi);
ie(Pi, jg);
const kI = Pi;
var la = Pi;
const Wg = {
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
  name: dO,
  n: Pr
} = x("overlay");
var Oi = ee({
  name: dO,
  inheritAttrs: !1,
  props: Wg,
  setup(e, {
    slots: n,
    attrs: t
  }) {
    const {
      zIndex: o
    } = lr(() => e.show, 3), {
      onStackTop: r
    } = du(() => e.show, o), {
      disabled: a
    } = xt();
    ir(() => e.show, () => e.lockScroll), je(() => window, "keydown", i);
    function i(c) {
      !r() || c.key !== "Escape" || !e.show || (S(e.onKeyEscape), e.closeOnKeyEscape && (Ae(c), S(e["onUpdate:show"], !1)));
    }
    function l() {
      S(e.onClick), S(e["onUpdate:show"], !1);
    }
    function s() {
      return Z("div", He({
        class: Pr(),
        style: {
          zIndex: o.value - 2
        }
      }, t), [Z("div", {
        class: Pr("overlay"),
        style: {
          zIndex: o.value - 1
        },
        onClick: l
      }, null), Z("div", {
        class: Pr("content"),
        style: {
          zIndex: o.value
        }
      }, [S(n.default)])]);
    }
    function u() {
      return Z(Qe, {
        name: Pr("--fade")
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
re(Oi);
ie(Oi, Wg);
const $I = Oi;
var gs = Oi;
const Kg = {
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
}, { name: pO, n: mO, classes: fO } = x("pagination"), vO = ["item-mode", "onClick"];
function gO(e, n) {
  const t = te("mp-icon"), o = te("mp-input"), r = te("mp-menu-option"), a = te("mp-menu-select"), i = Ge("ripple");
  return g(), C(
    "ul",
    {
      class: m(e.n())
    },
    [
      Ne((g(), C(
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
            onKeydown: n[3] || (n[3] = Uu((l) => e.setPage("simple", e.simpleCurrentValue, l), ["enter"]))
          }, null, 8, ["modelValue", "disabled"]),
          L("span", null, [
            Be(
              " / " + se(e.pageCount) + " ",
              1
              /* TEXT */
            ),
            L(
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
        Me,
        { key: 1 },
        Ke(e.pageList, (l, s) => Ne((g(), C("li", {
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
          Be(
            se(l),
            1
            /* TEXT */
          )
        ], 10, vO)), [
          [i, { disabled: e.disabled }]
        ])),
        128
        /* KEYED_FRAGMENT */
      )),
      Ne((g(), C(
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
      e.showSizeChanger ? (g(), we(a, {
        key: 2,
        modelValue: e.size,
        "onUpdate:modelValue": n[5] || (n[5] = (l) => e.size = l),
        placement: "cover-top",
        disabled: e.disabled
      }, {
        options: ue(() => [
          (g(!0), C(
            Me,
            null,
            Ke(e.sizeOption, (l, s) => (g(), we(r, {
              key: s,
              value: l,
              onClick: e.clickSize
            }, {
              default: ue(() => [
                Be(
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
          L(
            "li",
            {
              class: m(e.classes(e.n("size"), [e.disabled, e.n("item--disabled")]))
            },
            [
              L(
                "div",
                {
                  class: m(e.classes(e.n("size--open"), [e.current <= 1 || e.disabled, e.n("size--open--disabled")]))
                },
                [
                  L(
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
      }, 8, ["modelValue", "disabled"])) : X("v-if", !0),
      e.showQuickJumper && !e.simple ? (g(), C(
        "li",
        {
          key: 3,
          class: m(e.classes(e.n("quickly"), [e.disabled, e.n("item--disabled")]))
        },
        [
          Be(
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
            onKeydown: n[8] || (n[8] = Uu((l) => e.setPage("quick", e.quickJumperValue, l), ["enter"]))
          }, null, 8, ["modelValue", "disabled"])
        ],
        2
        /* CLASS */
      )) : X("v-if", !0),
      e.totalText ? (g(), C(
        "li",
        {
          key: 4,
          class: m(e.classes(e.n("total"), [e.disabled, e.n("item--disabled")]))
        },
        se(e.totalText),
        3
        /* TEXT, CLASS */
      )) : X("v-if", !0)
    ],
    2
    /* CLASS */
  );
}
const qg = ee({
  name: pO,
  components: {
    MpMenuSelect: Yo,
    MpMenuOption: po,
    MpIcon: Ze,
    MpInput: Fo
  },
  directives: { Ripple: on },
  props: Kg,
  setup(e) {
    const n = $(""), t = $("1"), o = $(!1), r = $(!1), a = $(Y(e.current) || 1), i = $(Y(e.size) || 10), l = $([]), s = O(() => Math.ceil(e.maxPagerCount / 2)), u = O(() => Math.ceil(Y(e.total) / Y(i.value))), c = O(() => {
      const b = i.value * (a.value - 1) + 1, z = Math.min(i.value * a.value, Y(e.total));
      return [b, z];
    }), d = O(() => e.showTotal ? e.showTotal(Y(e.total), c.value) : ""), { t: p } = lt();
    pe([() => e.current, () => e.size], ([b, z]) => {
      a.value = Y(b) || 1, i.value = Y(z || 10);
    }), pe(
      [a, i, u],
      ([b, z, I], [P, M]) => {
        let D = [];
        const { maxPagerCount: U, total: V, onChange: W } = e, A = Math.ceil(Y(V) / Y(M)), T = I - (U - s.value) - 1;
        if (t.value = `${b}`, I - 2 > U) {
          if (P === void 0 || I !== A)
            for (let B = 2; B < U + 2; B++)
              D.push(B);
          if (b <= U && b < T) {
            D = [];
            for (let B = 1; B < U + 1; B++)
              D.push(B + 1);
            o.value = !0, r.value = !1;
          }
          if (b > U && b < T) {
            D = [];
            for (let B = 1; B < U + 1; B++)
              D.push(b + B - s.value);
            o.value = b === 2 && U === 1, r.value = !1;
          }
          if (b >= T) {
            D = [];
            for (let B = 1; B < U + 1; B++)
              D.push(I - (U - B) - 1);
            o.value = !1, r.value = !0;
          }
          D = [1, "...", ...D, "...", I];
        } else
          for (let B = 1; B <= I; B++)
            D.push(B);
        l.value = D, P != null && I > 0 && S(W, b, z), S(e["onUpdate:current"], b), S(e["onUpdate:size"], z);
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
    function k(b, z, I) {
      I.target.blur();
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
      t: rn,
      n: mO,
      classes: fO,
      getMode: h,
      isHideEllipsis: f,
      clickItem: v,
      clickSize: y,
      setPage: k,
      toNumber: Y,
      formatElevation: dn
    };
  }
});
qg.render = gO;
var Ei = qg;
re(Ei);
ie(Ei, Kg);
const CI = Ei;
var hs = Ei;
const Xg = {
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
}, { name: hO, n: bO, classes: yO } = x("paper");
function wO(e, n) {
  const t = Ge("ripple");
  return Ne((g(), C(
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
const Gg = ee({
  name: hO,
  directives: { Ripple: on },
  props: Xg,
  setup(e) {
    function n(t) {
      S(e.onClick, t);
    }
    return {
      n: bO,
      classes: yO,
      formatElevation: dn,
      toSizeUnit: Oe,
      handleClick: n
    };
  }
});
Gg.render = wO;
var Ti = Gg;
re(Ti);
ie(Ti, Xg);
const SI = Ti;
var bs = Ti, kO = Object.defineProperty, ep = Object.getOwnPropertySymbols, $O = Object.prototype.hasOwnProperty, CO = Object.prototype.propertyIsEnumerable, np = (e, n, t) => n in e ? kO(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t, SO = (e, n) => {
  for (var t in n || (n = {}))
    $O.call(n, t) && np(e, t, n[t]);
  if (ep)
    for (var t of ep(n))
      CO.call(n, t) && np(e, t, n[t]);
  return e;
};
const Zg = SO({
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
}, De(Co, [
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
])), { name: zO, n: PO, classes: OO } = x("picker"), tp = 300, EO = 15, op = 200, TO = 1e3;
let rp = 0;
const BO = ["onTouchstartPassive", "onTouchmove", "onTouchend"], MO = ["onTransitionend"], IO = ["onClick"];
function DO(e, n) {
  const t = te("mp-button");
  return g(), we(
    Qt(e.dynamic ? e.n("$-popup") : e.Transition),
    He(
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
        L(
          "div",
          He({
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
                        Be(
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
                    L(
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
                        Be(
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
            )) : X("v-if", !0),
            L(
              "div",
              {
                class: m(e.n("columns")),
                style: G({ height: `${e.columnHeight}px` })
              },
              [
                (g(!0), C(
                  Me,
                  null,
                  Ke(e.scrollColumns, (o) => (g(), C("div", {
                    key: o.id,
                    class: m(e.n("column")),
                    onTouchstartPassive: (r) => e.handleTouchstart(r, o),
                    onTouchmove: Tn((r) => e.handleTouchmove(r, o), ["prevent"]),
                    onTouchend: (r) => e.handleTouchend(o)
                  }, [
                    L("div", {
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
                        Me,
                        null,
                        Ke(o.column, (r, a) => (g(), C("div", {
                          key: e.getValue(r),
                          class: m(e.classes(e.n("option"), r.className)),
                          style: G({ height: `${e.optionHeight}px` }),
                          onClick: (i) => e.handleClick(o, a)
                        }, [
                          L(
                            "div",
                            {
                              class: m(e.classes(e.n("text"), r.textClassName))
                            },
                            se(r[e.getOptionKey("text")]),
                            3
                            /* TEXT, CLASS */
                          )
                        ], 14, IO))),
                        128
                        /* KEYED_FRAGMENT */
                      ))
                    ], 46, MO)
                  ], 42, BO))),
                  128
                  /* KEYED_FRAGMENT */
                )),
                L(
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
                L(
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
const Jg = ee({
  name: zO,
  components: {
    MpButton: Mn,
    MpPopup: It
  },
  inheritAttrs: !1,
  props: Zg,
  setup(e) {
    const n = Gn(e, "modelValue"), t = $([]), o = O(() => Y(e.columnsCount)), r = O(() => tn(e.optionHeight)), a = O(() => tn(e.optionCount)), i = O(() => a.value * r.value / 2 - r.value / 2), l = O(() => a.value * r.value), { prevY: s, moveY: u, dragging: c, startTouch: d, moveTouch: p, endTouch: f } = ko(), { t: h } = lt();
    let v = [];
    M(), pe(() => e.columns, M, { deep: !0 }), pe(() => n.value, M);
    function y(N) {
      return {
        text: e.textKey,
        value: e.valueKey,
        children: e.childrenKey
      }[N];
    }
    function w(N) {
      var K;
      return (K = N[y("value")]) != null ? K : N[y("text")];
    }
    function k(N) {
      v = [...N];
    }
    function b(N) {
      return (e.columnsCount != null ? N.slice(0, o.value) : N).map((me, Se) => {
        const Ue = {
          id: rp++,
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
        }, Re = n.value[Se], xe = Ue.column.findIndex((sn) => Re === w(sn));
        return Ue.index = xe === -1 ? 0 : xe, B(Ue), Ue;
      });
    }
    function z(N) {
      const K = [];
      return I(K, N), K;
    }
    function I(N, K, me = !0, Se = 1) {
      var Ue;
      if (K.length && (e.columnsCount == null || Se <= o.value)) {
        const Re = {
          id: rp++,
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
        if (N.push(Re), me) {
          const xe = n.value[N.length - 1], sn = K.findIndex((Sn) => xe === w(Sn));
          Re.index = sn === -1 ? 0 : sn;
        }
        B(Re), I(
          N,
          (Ue = Re.column[Re.index][y("children")]) != null ? Ue : [],
          me,
          Se + 1
        );
      }
    }
    function P(N) {
      var K;
      t.value.splice(t.value.indexOf(N) + 1), I(
        t.value,
        (K = N.column[N.index][y("children")]) != null ? K : [],
        !1,
        t.value.length + 1
      );
    }
    function M() {
      t.value = e.cascade ? z(e.columns) : b(e.columns);
      const { indexes: N } = T();
      k(N);
    }
    function D(N, K) {
      K.scrollEl = N;
    }
    function U(N) {
      S(e["onUpdate:show"], N);
    }
    function V(N) {
      const K = i.value - N.column.length * r.value, me = r.value + i.value;
      N.translate = $n(N.translate, K, me);
    }
    function W(N, K) {
      const me = Math.round((i.value - K) / r.value);
      return Vp(me, N.column);
    }
    function A(N) {
      return N.translate = i.value - N.index * r.value, N.translate;
    }
    function T() {
      const N = [], K = [], me = [];
      return t.value.forEach(({ column: Se, index: Ue }) => {
        const Re = Se[Ue];
        N.push(w(Re)), K.push(Ue), me.push(Re);
      }), {
        values: N,
        indexes: K,
        options: me
      };
    }
    function B(N, K = 0) {
      A(N), N.duration = K;
    }
    function j(N, K, me) {
      N.translate += Math.abs(K / me) / 3e-3 * (K < 0 ? -1 : 1);
    }
    function E(N, K) {
      c.value || (N.index = K, B(N, op));
    }
    function J(N, K) {
      K.touching = !0, K.translate = rl(K.scrollEl), d(N);
    }
    function q(N, K) {
      if (!K.touching)
        return;
      p(N), K.scrolling = !1, K.duration = 0, K.prevY = s.value, K.translate += u.value, V(K);
      const me = performance.now();
      me - K.momentumTime > tp && (K.momentumTime = me, K.momentumPrevY = K.translate);
    }
    function ne(N) {
      f(), N.touching = !1, N.prevY = 0;
      const K = N.translate - N.momentumPrevY, me = performance.now() - N.momentumTime, Se = Math.abs(K) >= EO && me <= tp, Ue = N.translate;
      Se && j(N, K, me), N.index = W(N, N.translate), B(N, Se ? TO : op), N.scrolling = N.translate !== Ue, N.scrolling || H(N);
    }
    function ye(N) {
      N.scrolling = !1, H(N);
    }
    function Te() {
      const { indexes: N } = T();
      return N.every((K, me) => K === v[me]);
    }
    function H(N) {
      const { onChange: K, cascade: me } = e;
      if (Te())
        return;
      me && P(N);
      const Se = t.value.some((Sn) => Sn.scrolling), Ue = t.value.some((Sn) => Sn.touching);
      if (Se || Ue)
        return;
      const { values: Re, indexes: xe, options: sn } = T();
      k(xe), S(K, Re, xe, sn), n.value = Re;
    }
    function Q() {
      if (e.cascade) {
        const N = t.value.find((K) => K.scrolling);
        N && (N.index = W(N, rl(N.scrollEl)), N.scrolling = !1, B(N), P(N));
      } else
        t.value.forEach((N) => {
          N.index = W(N, rl(N.scrollEl)), B(N);
        });
    }
    function ae() {
      Q();
      const { values: N, indexes: K, options: me } = T();
      k(K), S(e.onConfirm, N, K, me);
    }
    function ve() {
      Q();
      const { values: N, indexes: K, options: me } = T();
      k(K), S(e.onCancel, N, K, me);
    }
    return {
      optionHeight: r,
      optionCount: a,
      scrollColumns: t,
      columnHeight: l,
      center: i,
      Transition: Qe,
      pt: h,
      t: rn,
      n: PO,
      classes: OO,
      setScrollEl: D,
      getOptionKey: y,
      getValue: w,
      handlePopupUpdateShow: U,
      handleTouchstart: J,
      handleTouchmove: q,
      handleTouchend: ne,
      handleTransitionend: ye,
      confirm: ae,
      cancel: ve,
      handleClick: E
    };
  }
});
Jg.render = DO;
var fr = Jg;
let so;
function zo(e) {
  return new Promise((n) => {
    zo.close();
    const t = Fe(e) ? { columns: e } : e, o = en(t);
    o.dynamic = !0, o.teleport = "body", so = o;
    function r() {
      so === o && (so = null);
    }
    const { unmountInstance: a } = $o(fr, o, {
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
zo.close = function() {
  if (so == null)
    return;
  const e = so;
  so = null, Ye().then(() => {
    e.show = !1;
  });
};
zo.Component = fr;
re(fr);
re(fr, zo);
ie(zo, Zg);
const zI = fr;
var ys = zo;
const Qg = {
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
}, no = 100, Or = 0, st = 20, ap = 2 * Math.PI * st, { name: AO, n: NO, classes: RO } = x("progress"), LO = ["aria-valuenow"], VO = ["viewBox"], FO = { key: 0 }, UO = ["id"], jO = ["offset", "stop-color"], HO = ["d", "stroke-width", "stroke-dasharray"], YO = ["d", "stroke-width", "stroke-dasharray", "stroke-dashoffset"];
function WO(e, n) {
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
        L(
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
                L(
                  "div",
                  {
                    class: m(e.classes(e.n(`linear--${e.type}`))),
                    style: G({ background: e.progressColor })
                  },
                  null,
                  6
                  /* CLASS, STYLE */
                ),
                L(
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
              Be(
                se(e.linearProps.roundValue),
                1
                /* TEXT */
              )
            ])
          ],
          2
          /* CLASS */
        )) : X("v-if", !0)
      ],
      2
      /* CLASS */
    )) : X("v-if", !0),
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
          e.isPlainObject(e.color) ? (g(), C("defs", FO, [
            L("linearGradient", {
              id: e.id,
              x1: "100%",
              y1: "0%",
              x2: "0%",
              y2: "0%"
            }, [
              (g(!0), C(
                Me,
                null,
                Ke(e.linearGradientProgress, (t, o) => (g(), C("stop", {
                  key: o,
                  offset: t,
                  "stop-color": e.color[t]
                }, null, 8, jO))),
                128
                /* KEYED_FRAGMENT */
              ))
            ], 8, UO)
          ])) : X("v-if", !0),
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
          }, null, 14, HO)) : X("v-if", !0),
          L("path", {
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
          }, null, 14, YO)
        ], 10, VO)),
        e.label ? (g(), C(
          "div",
          {
            key: 0,
            class: m(e.classes(e.n("circle-label"), e.labelClass))
          },
          [
            F(e.$slots, "default", {}, () => [
              Be(
                se(e.circleProps.roundValue),
                1
                /* TEXT */
              )
            ])
          ],
          2
          /* CLASS */
        )) : X("v-if", !0)
      ],
      6
      /* CLASS, STYLE */
    )) : X("v-if", !0)
  ], 10, LO);
}
const xg = ee({
  name: AO,
  props: Qg,
  setup(e) {
    const n = pm(), t = O(() => {
      const i = Y(e.value), l = $n(i, Or, no), s = $n(Math.round(i), Or, no);
      return {
        width: `${l}%`,
        roundValue: `${s}%`,
        value: l
      };
    }), o = O(() => {
      const { size: i, lineWidth: l, value: s } = e, u = st / (1 - tn(l) / tn(i)) * 2, c = `0 0 ${u} ${u}`, d = $n(Math.round(Y(s)), Or, no), p = `${(no - d) / no * ap}`, f = tn(l) / tn(i) * u, h = 0, v = -st, y = 0, w = -2 * st, k = `M ${u / 2} ${u / 2} m ${h} ${v} a ${st} ${st} 
        0 1 1 ${y} ${-w} a ${st} ${st} 0 1 1 ${-y} ${w}`;
      return {
        strokeWidth: f,
        viewBox: c,
        strokeOffset: p,
        roundValue: `${d}%`,
        path: k,
        value: $n(Y(s), Or, no)
      };
    }), r = O(() => Ln(e.color) ? `url(#${n.value})` : e.color), a = O(
      () => Object.keys(e.color).sort((i, l) => parseFloat(i) - parseFloat(l))
    );
    return {
      id: n,
      linearProps: t,
      CIRCUMFERENCE: ap,
      RADIUS: st,
      circleProps: o,
      progressColor: r,
      linearGradientProgress: a,
      n: NO,
      classes: RO,
      toSizeUnit: Oe,
      isPlainObject: Ln
    };
  }
});
xg.render = WO;
var Bi = xg;
re(Bi);
ie(Bi, Qg);
const PI = Bi;
var ws = Bi;
const _g = {
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
var KO = (e, n, t) => new Promise((o, r) => {
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
const { name: qO, n: ip, classes: XO } = x("pull-refresh"), lp = 150;
function GO(e, n) {
  const t = te("mp-icon");
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
      L(
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
const eh = ee({
  name: qO,
  components: { MpIcon: Ze },
  props: _g,
  setup(e) {
    const n = $(0), t = $(null), o = $(null), r = $(0), a = $("-125%"), i = $("arrow-down"), l = $("default"), s = $(!1), u = O(() => Math.abs(2 * n.value)), c = O(() => l.value === "success"), d = O(
      () => l.value !== "loading" && l.value !== "success" && !e.disabled
    ), p = O(() => ({
      transform: `translate3d(0px, ${ln(a.value) ? a.value : `${a.value}px`}, 0px) translate(-50%, 0)`,
      transition: s.value ? `transform ${e.animationDuration}ms` : void 0,
      background: c.value ? e.successBgColor : e.bgColor,
      color: c.value ? e.successColor : e.color
    })), { startTouch: f, moveTouch: h, endTouch: v, isReachTop: y } = ko();
    let w, k;
    pe(
      () => e.modelValue,
      (V) => {
        V === !1 && (s.value = !0, l.value = "success", i.value = "checkbox-marked-circle", setTimeout(() => {
          a.value = n.value, U();
        }, Y(e.successDuration)));
      }
    ), yn(D), je(t, "touchmove", P);
    function b(V) {
      if (i.value !== V)
        return i.value = V, new Promise((W) => {
          window.setTimeout(W, lp);
        });
    }
    function z(V) {
      ("classList" in w ? w : document.body).classList[V](`${ip()}--lock`);
    }
    function I(V) {
      if (f(V), n.value === 0) {
        const { width: W } = nn(o.value);
        n.value = -(W + W * 0.25);
      }
      k = Dt(V.target);
    }
    function P(V) {
      if (h(V), !d.value || !k || k !== w && vt(k) > 0 || vt(w) > 0)
        return;
      y(w) && Ae(V), l.value !== "pulling" && (l.value = "pulling", r.value = V.touches[0].clientY), y(w) && zn(a.value) && a.value > n.value && z("add");
      const A = (V.touches[0].clientY - r.value) / 2 + n.value;
      a.value = A >= u.value ? u.value : A, b(a.value >= u.value * 0.2 ? "refresh" : "arrow-down");
    }
    function M() {
      return KO(this, null, function* () {
        v(), d.value && (s.value = !0, Y(a.value) >= u.value * 0.2 ? (yield b("refresh"), l.value = "loading", a.value = u.value * 0.3, S(e["onUpdate:modelValue"], !0), Ye(() => {
          S(e.onRefresh);
        }), z("remove")) : (l.value = "loosing", i.value = "arrow-down", a.value = n.value, setTimeout(() => {
          s.value = !1, z("remove");
        }, Y(e.animationDuration))), k = null);
      });
    }
    function D() {
      w = e.target ? Vm(e.target, "PullRefresh") : Dt(t.value);
    }
    function U() {
      setTimeout(() => {
        l.value = "default", i.value = "arrow-down", s.value = !1;
      }, Y(e.animationDuration));
    }
    return {
      ICON_TRANSITION: lp,
      refreshStatus: l,
      freshNode: t,
      controlNode: o,
      iconName: i,
      controlStyle: p,
      isSuccess: c,
      n: ip,
      classes: XO,
      handleTouchstart: I,
      handleTouchmove: P,
      handleTouchend: M
    };
  }
});
eh.render = GO;
var Mi = eh;
re(Mi);
ie(Mi, _g);
const OI = Mi;
var ks = Mi;
const nh = {
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
}, th = Symbol("RADIO_GROUP_BIND_RADIO_KEY");
function ZO() {
  const { bindChildren: e, childProviders: n, length: t } = kn(
    th
  );
  return {
    length: t,
    radios: n,
    bindRadios: e
  };
}
function JO() {
  const { bindParent: e, parentProvider: n, index: t } = wn(th);
  return {
    index: t,
    radioGroup: n,
    bindRadioGroup: e
  };
}
const { name: QO, n: xO, classes: _O } = x("radio"), e2 = ["aria-checked"], n2 = ["tabindex"];
function t2(e, n) {
  const t = te("mp-icon"), o = te("mp-hover-overlay"), r = te("mp-form-details"), a = Ge("ripple"), i = Ge("hover");
  return g(), C(
    "div",
    {
      class: m(e.n("wrap"))
    },
    [
      L("div", He({
        role: "radio",
        "aria-checked": e.checked,
        class: e.n()
      }, e.$attrs, {
        onClick: n[3] || (n[3] = (...l) => e.handleClick && e.handleClick(...l))
      }), [
        Ne((g(), C("div", {
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
        ], 46, n2)), [
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
        )) : X("v-if", !0)
      ], 16, e2),
      Z(r, { "error-message": e.errorMessage }, null, 8, ["error-message"])
    ],
    2
    /* CLASS */
  );
}
const oh = ee({
  name: QO,
  directives: { Ripple: on, Hover: Dn },
  components: {
    MpIcon: Ze,
    MpFormDetails: Bn,
    MpHoverOverlay: Vn
  },
  inheritAttrs: !1,
  props: nh,
  setup(e) {
    const n = $(), t = $(!1), o = Gn(e, "modelValue"), r = O(() => o.value === e.checkedValue), { radioGroup: a, bindRadioGroup: i } = JO(), { hovering: l, handleHovering: s } = _n(), { form: u, bindForm: c } = jn(), d = O(() => {
      const W = (u == null ? void 0 : u.disabled.value) || e.disabled, A = r.value, T = a == null ? void 0 : a.hasChecked.value;
      if (!W)
        return a && T && !A ? "-1" : "0";
    }), {
      errorMessage: p,
      validateWithTrigger: f,
      validate: h,
      // expose
      resetValidation: v
    } = Un(), y = {
      sync: M,
      validate: U,
      resetValidation: v,
      reset: D,
      isFocusing: O(() => t.value),
      // keyboard arrow move
      move() {
        n.value.focus(), n.value.click();
      },
      moveable() {
        return !(u != null && u.disabled.value) && !e.disabled && !(u != null && u.readonly.value) && !e.readonly;
      }
    };
    S(i, y), S(c, y), je(() => window, "keydown", w), je(() => window, "keyup", k);
    function w(W) {
      if (!t.value)
        return;
      const { key: A } = W;
      (A === "Enter" || A === " ") && Ae(W), A === "Enter" && n.value.click();
    }
    function k(W) {
      t.value && W.key === " " && (Ae(W), n.value.click());
    }
    function b(W) {
      Ye(() => {
        const { validateTrigger: A, rules: T, modelValue: B } = e;
        f(A, W, T, B);
      });
    }
    function z(W) {
      const { checkedValue: A, onChange: T } = e;
      a && o.value === A || (o.value = W, S(T, o.value), a == null || a.onToggle(A), b("onChange"));
    }
    function I(W) {
      const { disabled: A, readonly: T, uncheckedValue: B, checkedValue: j, onClick: E } = e;
      u != null && u.disabled.value || A || (S(E, W), !(u != null && u.readonly.value || T) && z(r.value ? B : j));
    }
    function P() {
      n.value.focus();
    }
    function M(W) {
      const { checkedValue: A, uncheckedValue: T } = e, B = W === A;
      return o.value = B ? A : T, B;
    }
    function D() {
      o.value = e.uncheckedValue, v();
    }
    function U() {
      return h(e.rules, e.modelValue);
    }
    function V(W) {
      const { uncheckedValue: A, checkedValue: T } = e;
      ![A, T].includes(W) && (W = r.value ? A : T), z(W);
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
      n: xO,
      classes: _O,
      handleClick: I,
      handleTextClick: P,
      toggle: V,
      reset: D,
      validate: U,
      resetValidation: v
    };
  }
});
oh.render = t2;
var Ii = oh;
re(Ii);
ie(Ii, nh);
const EI = Ii;
var sa = Ii;
const rh = {
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
}, { name: o2, n: r2, classes: a2 } = x("radio-group"), i2 = ["aria-label"];
function l2(e, n) {
  const t = te("maybe-v-node"), o = te("mp-radio"), r = te("mp-form-details");
  return g(), C(
    "div",
    {
      class: m(e.n("wrap"))
    },
    [
      L("div", {
        "aria-label": e.ariaLabel,
        role: "radiogroup",
        class: m(e.classes(e.n(), e.n(`--${e.direction}`)))
      }, [
        e.options.length ? (g(!0), C(
          Me,
          { key: 0 },
          Ke(e.options, (a) => (g(), we(o, {
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
        )) : X("v-if", !0),
        F(e.$slots, "default")
      ], 10, i2),
      Z(r, { "error-message": e.errorMessage }, null, 8, ["error-message"])
    ],
    2
    /* CLASS */
  );
}
const ah = ee({
  name: o2,
  components: { MpFormDetails: Bn, MpRadio: sa, MaybeVNode: ar },
  props: rh,
  setup(e) {
    const { length: n, radios: t, bindRadios: o } = ZO(), { bindForm: r } = jn(), {
      errorMessage: a,
      validateWithTrigger: i,
      validate: l,
      // expose
      resetValidation: s
    } = Un(), u = O(() => a.value), c = $(!1), d = {
      onToggle: y,
      validate: w,
      reset: k,
      resetValidation: s,
      hasChecked: O(() => c.value),
      errorMessage: u
    };
    pe(() => e.modelValue, v), pe(() => n.value, v), S(r, d), o(d), je(() => window, "keydown", p);
    function p(b) {
      const z = t.findIndex(({ isFocusing: P }) => P.value);
      if (!(z === -1 || !t.some(({ moveable: P }, M) => M === z ? !1 : P()))) {
        if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(b.key) && Ae(b), b.key === "ArrowUp" || b.key === "ArrowLeft") {
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
      Ye(() => {
        const { validateTrigger: z, rules: I, modelValue: P } = e;
        i(z, b, I, P);
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
    function k() {
      S(e["onUpdate:modelValue"], void 0), s();
    }
    return {
      errorMessage: a,
      n: r2,
      classes: a2,
      reset: k,
      validate: w,
      resetValidation: s,
      isFunction: vn
    };
  }
});
ah.render = l2;
var Di = ah;
re(Di);
ie(Di, rh);
const TI = Di;
var $s = Di;
const ih = {
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
  namespace: De(cn, "namespace"),
  emptyIconNamespace: De(cn, "namespace"),
  halfIconNamespace: De(cn, "namespace"),
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
}, { name: s2, n: Eo } = x("rate"), u2 = ["onClick"];
function c2(e, n) {
  const t = te("mp-icon"), o = te("mp-hover-overlay"), r = te("mp-form-details"), a = Ge("ripple"), i = Ge("hover");
  return g(), C(
    "div",
    {
      class: m(e.n("wrap"))
    },
    [
      L(
        "div",
        {
          class: m(e.n())
        },
        [
          (g(!0), C(
            Me,
            null,
            Ke(e.toNumber(e.count), (l) => Ne((g(), C("div", {
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
            ], 14, u2)), [
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
const lh = ee({
  name: s2,
  components: {
    MpIcon: Ze,
    MpFormDetails: Bn,
    MpHoverOverlay: Vn
  },
  directives: { Ripple: on, Hover: Dn },
  props: ih,
  setup(e) {
    const n = $(-1), { form: t, bindForm: o } = jn(), { errorMessage: r, validateWithTrigger: a, validate: i, resetValidation: l } = Un(), { hovering: s } = _n();
    let u = Y(e.modelValue);
    S(o, {
      reset: b,
      validate: v,
      resetValidation: l
    });
    function d(z) {
      const { count: I, gap: P } = e;
      return {
        color: f(z).color,
        marginRight: z !== Y(I) ? Oe(P) : 0
      };
    }
    function p(z) {
      const { name: I, color: P } = f(z);
      return {
        [Eo("content")]: !0,
        [Eo("--disabled")]: (t == null ? void 0 : t.disabled.value) || e.disabled,
        [Eo("--error")]: r.value,
        [Eo("--primary")]: I !== e.emptyIcon && !P
      };
    }
    function f(z) {
      const {
        modelValue: I,
        disabled: P,
        disabledColor: M,
        color: D,
        half: U,
        emptyColor: V,
        icon: W,
        halfIcon: A,
        emptyIcon: T,
        namespace: B,
        halfIconNamespace: j,
        emptyIconNamespace: E
      } = e;
      let J = D;
      return (P || t != null && t.disabled.value) && (J = M), z <= I ? { color: J, name: W, namespace: B } : U && z <= I + 0.5 ? { color: J, name: A, namespace: j } : {
        color: P || t != null && t.disabled.value ? M : V,
        name: T,
        namespace: E
      };
    }
    function h(z, I) {
      const { half: P, clearable: M } = e, { offsetWidth: D } = I.target;
      P && I.offsetX <= Math.floor(D / 2) && (z -= 0.5), u === z && M && (z = 0), u !== z && (S(e["onUpdate:modelValue"], z), S(e.onChange, z)), u = z;
    }
    function v() {
      return i(e.rules, e.modelValue);
    }
    function y() {
      Ye(() => a(["onChange"], "onChange", e.rules, e.modelValue));
    }
    function w(z, I) {
      const { readonly: P, disabled: M } = e;
      P || M || t != null && t.disabled.value || t != null && t.readonly.value || (h(z, I), y());
    }
    function k(z) {
      return (I) => {
        n.value = z, s.value = I;
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
      createHoverHandler: k,
      reset: b,
      validate: v,
      resetValidation: l,
      toSizeUnit: Oe,
      toNumber: Y,
      n: Eo
    };
  }
});
lh.render = c2;
var Ai = lh;
re(Ai);
ie(Ai, ih);
const BI = Ai;
var Cs = Ai;
const sh = {
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
}, d2 = { viewBox: "-4 -4 32 32" };
function p2(e, n) {
  return g(), C("svg", d2, n[0] || (n[0] = [
    L(
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
const uh = ee({});
uh.render = p2;
var m2 = uh;
const f2 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "2 2 20 20"
};
function v2(e, n) {
  return g(), C("svg", f2, n[0] || (n[0] = [
    L(
      "path",
      { d: "M19,3V5H19V19M17,8.4L13.4,12L17,15.6L15.6,17L12,13.4L8.4,17L7,15.6L10.6,12L7,8.4L8.4,7L12,10.6L15.6,7L17,8.4Z" },
      null,
      -1
      /* HOISTED */
    )
  ]));
}
const ch = ee({});
ch.render = v2;
var g2 = ch;
const h2 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "2 3.6 20 20"
};
function b2(e, n) {
  return g(), C("svg", h2, n[0] || (n[0] = [
    L(
      "path",
      { d: "M11,9H13V7H11M11,20H13V11H11V20Z" },
      null,
      -1
      /* HOISTED */
    )
  ]));
}
const dh = ee({});
dh.render = b2;
var y2 = dh;
const w2 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "-3 -3 30 30"
};
function k2(e, n) {
  return g(), C("svg", w2, n[0] || (n[0] = [
    L(
      "path",
      { d: "M10,19H13V22H10V19M12,2C17.35,2.22 19.68,7.62 16.5,11.67C15.67,12.67 14.33,13.33 13.67,14.17C13,15 13,16 13,17H10C10,15.33 10,13.92 10.67,12.92C11.33,11.92 12.67,11.33 13.5,10.67C15.92,8.43 15.32,5.26 12,5A3,3 0 0,0 9,8H6A6,6 0 0,1 12,2Z" },
      null,
      -1
      /* HOISTED */
    )
  ]));
}
const ph = ee({});
ph.render = k2;
var $2 = ph;
const { n: C2, classes: S2 } = x("result");
function z2(e, n) {
  return g(), C(
    Me,
    null,
    [
      L(
        "span",
        {
          class: m(e.n("success-cover-left"))
        },
        null,
        2
        /* CLASS */
      ),
      L(
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
      L(
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
      L(
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
      L(
        "span",
        {
          class: m(e.n("success-line-fix"))
        },
        null,
        2
        /* CLASS */
      ),
      L(
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
const mh = ee({
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
      n: C2,
      classes: S2
    };
  }
});
mh.render = z2;
var P2 = mh;
const O2 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "-6 -4 35 35"
};
function E2(e, n) {
  return g(), C("svg", O2, n[0] || (n[0] = [
    L(
      "path",
      { d: "M10,21H14A2,2 0 0,1 12,23A2,2 0 0,1 10,21M21,19V20H3V19L5,17V11C5,7.9 7.03,5.17 10,4.29C10,4.19 10,4.1 10,4A2,2 0 0,1 12,2A2,2 0 0,1 14,4C14,4.1 14,4.19 14,4.29C16.97,5.17 19,7.9 19,11V17L21,19M17,11A5,5 0 0,0 12,6A5,5 0 0,0 7,11V18H17V11M19.75,3.19L18.33,4.61M1,11" },
      null,
      -1
      /* HOISTED */
    )
  ]));
}
const fh = ee({});
fh.render = E2;
var T2 = fh;
const { name: B2, n: M2, classes: I2 } = x("result");
function D2(e, n) {
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
            L(
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
                (g(), we(Qt(e.type), {
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
        )) : X("v-if", !0)
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
        )) : X("v-if", !0)
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
        )) : X("v-if", !0)
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
      )) : X("v-if", !0)
    ],
    2
    /* CLASS */
  );
}
const vh = ee({
  name: B2,
  components: {
    Info: y2,
    Success: P2,
    Warning: T2,
    Error: g2,
    Question: $2,
    Empty: m2
  },
  props: sh,
  setup(e) {
    const n = O(
      () => `calc(${e.imageSize ? Oe(e.imageSize) : "var(--mp-result-image-size)"} * 0.9)`
    ), t = O(
      () => `calc(${e.imageSize ? Oe(e.imageSize) : "var(--mp-result-image-size)"} * 0.05)`
    );
    return {
      circleSize: n,
      borderSize: t,
      n: M2,
      classes: I2
    };
  }
});
vh.render = D2;
var Ni = vh;
re(Ni);
ie(Ni, sh);
const MI = Ni;
var Ss = Ni;
const gh = {
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
}, { name: A2, n: N2, classes: R2 } = x("row");
function L2(e, n) {
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
const hh = ee({
  name: A2,
  props: gh,
  setup(e) {
    const n = O(
      () => Fe(e.gutter) ? e.gutter.map((r) => tn(r) / 2) : [0, tn(e.gutter) / 2]
    ), { bindCols: t } = mS();
    t({ average: n });
    function o(r) {
      S(e.onClick, r);
    }
    return {
      average: n,
      n: N2,
      classes: R2,
      handleClick: o,
      padStartFlex: Zr
    };
  }
});
hh.render = L2;
var Ri = hh;
re(Ri);
ie(Ri, gh);
const II = Ri;
var zs = Ri, V2 = Object.defineProperty, sp = Object.getOwnPropertySymbols, F2 = Object.prototype.hasOwnProperty, U2 = Object.prototype.propertyIsEnumerable, up = (e, n, t) => n in e ? V2(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t, j2 = (e, n) => {
  for (var t in n || (n = {}))
    F2.call(n, t) && up(e, t, n[t]);
  if (sp)
    for (var t of sp(n))
      U2.call(n, t) && up(e, t, n[t]);
  return e;
};
const bh = j2({
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
}, De(Ca, [
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
])), { name: H2, n: Y2, classes: W2 } = x("select"), K2 = ["tabindex"];
function q2(e, n) {
  const t = te("maybe-v-node"), o = te("mp-chip"), r = te("mp-icon"), a = te("mp-field-decorator"), i = te("mp-option"), l = te("mp-menu"), s = te("mp-form-details");
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
        L(
          "div",
          {
            ref: "menuEl",
            class: m(e.classes(e.n("scroller"), e.n("$-elevation--3")))
          },
          [
            e.options.length ? (g(!0), C(
              Me,
              { key: 0 },
              Ke(e.options, (u) => (g(), we(i, {
                key: u[e.valueKey],
                label: u[e.labelKey],
                value: u[e.valueKey],
                option: u,
                disabled: u.disabled,
                ripple: u.ripple
              }, null, 8, ["label", "value", "option", "disabled", "ripple"]))),
              128
              /* KEYED_FRAGMENT */
            )) : X("v-if", !0),
            F(e.$slots, "default")
          ],
          2
          /* CLASS */
        )
      ]),
      default: ue(() => [
        Z(
          a,
          Yt(ca({
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
          Kt({
            "clear-icon": ue(({ clear: u }) => [
              F(e.$slots, "clear-icon", { clear: u })
            ]),
            "append-icon": ue(() => [
              F(e.$slots, "append-icon")
            ]),
            default: ue(() => [
              L(
                "div",
                {
                  class: m(e.classes(e.n("select"), [e.errorMessage, e.n("--error")], [e.formDisabled || e.disabled, e.n("--disabled")])),
                  style: G({
                    textAlign: e.textAlign,
                    color: e.textColor
                  })
                },
                [
                  L(
                    "div",
                    {
                      class: m(e.n("label"))
                    },
                    [
                      e.isEmptyModelValue ? X("v-if", !0) : F(e.$slots, "selected", { key: 0 }, () => [
                        e.multiple ? (g(), C(
                          Me,
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
                                  Me,
                                  null,
                                  Ke(e.labels, (u) => (g(), we(o, {
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
                                  Me,
                                  null,
                                  Ke(e.labels, (u, c) => (g(), C(
                                    Me,
                                    { key: u },
                                    [
                                      Z(t, { is: u }, null, 8, ["is"]),
                                      Be(
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
                        )) : (g(), we(t, {
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
                  )) : X("v-if", !0),
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
  ], 42, K2);
}
const yh = ee({
  name: H2,
  components: {
    MpIcon: Ze,
    MpMenu: Ho,
    MpChip: _r,
    MpOption: la,
    MpFieldDecorator: Vo,
    MpFormDetails: Bn,
    MaybeVNode: ar
  },
  props: bh,
  setup(e) {
    const n = $(!1), t = $(!1), o = $(null), r = O(() => e.multiple), a = O(() => e.focusColor), i = O(() => Wn(e.modelValue)), l = O(() => e.disabled || e.readonly ? "" : "pointer"), s = $(0), { bindForm: u, form: c } = jn(), { length: d, options: p, bindOptions: f } = rO(), { label: h, labels: v, computeLabel: y, getSelectedValue: w } = hf({
      modelValue: () => e.modelValue,
      multiple: () => e.multiple,
      optionProviders: () => p,
      optionProvidersLength: () => d.value
    }), {
      errorMessage: k,
      validateWithTrigger: b,
      validate: z,
      // expose
      resetValidation: I
    } = Un(), P = $(null), M = O(() => e.variant === "outlined" ? "bottom" : "cover-top"), D = O(() => {
      const { hint: N, blurColor: K, focusColor: me } = e;
      if (!N)
        return k.value ? "var(--mp-field-decorator-error-color)" : n.value ? me || "var(--mp-field-decorator-focus-color)" : K || "var(--mp-field-decorator-placeholder-color, var(--mp-field-decorator-blur-color))";
    }), U = O(() => !e.hint && Wn(e.modelValue)), V = {
      multiple: r,
      focusColor: a,
      computeLabel: y,
      onSelect: q,
      reset: ve,
      validate: ae,
      resetValidation: I
    };
    pe(
      () => e.multiple,
      () => {
        Xn(
          e.multiple && Fe(e.modelValue),
          "Select",
          "The modelValue must be an array when multiple is true"
        );
      }
    ), f(V), je(() => window, "keydown", W), je(() => window, "keyup", A), S(u, V);
    function W(N) {
      const { disabled: K, readonly: me } = e;
      if (c != null && c.disabled.value || c != null && c.readonly.value || K || me || !n.value)
        return;
      const { key: Se } = N;
      if (Se === " " && !t.value) {
        Ae(N);
        return;
      }
      if (Se === "Escape" && t.value) {
        o.value.focus(), Ae(N), t.value = !1;
        return;
      }
      if (Se === "Tab" && t.value) {
        o.value.focus(), Ae(N), j();
        return;
      }
      if (Se === "Enter" && !t.value) {
        Ae(N), t.value = !0;
        return;
      }
      (Se === "ArrowDown" || Se === "ArrowUp") && t.value && (Ae(N), fu(o.value, P.value, Se));
    }
    function A(N) {
      const { disabled: K, readonly: me } = e;
      if (c != null && c.disabled.value || c != null && c.readonly.value || K || me || t.value || !n.value)
        return;
      const { key: Se } = N;
      Se === " " && !t.value && (Ae(N), t.value = !0);
    }
    function T(N) {
      Ye(() => {
        const { validateTrigger: K, rules: me, modelValue: Se } = e;
        b(K, N, me, Se);
      });
    }
    function B() {
      const { disabled: N, readonly: K, onFocus: me } = e;
      c != null && c.disabled.value || c != null && c.readonly.value || N || K || (s.value = tn(e.offsetY), H(), S(me), T("onFocus"));
    }
    function j() {
      const { disabled: N, readonly: K, onBlur: me } = e;
      c != null && c.disabled.value || c != null && c.readonly.value || N || K || (Q(), S(me), T("onBlur"));
    }
    function E() {
      t.value || j();
    }
    function J() {
      n.value && j();
    }
    function q(N) {
      const { disabled: K, readonly: me, multiple: Se, onChange: Ue } = e;
      if (c != null && c.disabled.value || c != null && c.readonly.value || K || me)
        return;
      const Re = w(N);
      S(e["onUpdate:modelValue"], Re), S(Ue, Re), T("onChange"), Se || (o.value.focus(), bn().then(() => {
        t.value = !1;
      }));
    }
    function ne() {
      const { disabled: N, readonly: K, multiple: me, clearable: Se, onClear: Ue, onChange: Re } = e;
      if (c != null && c.disabled.value || c != null && c.readonly.value || N || K || !Se)
        return;
      const xe = me ? [] : void 0;
      S(e["onUpdate:modelValue"], xe), S(Ue, xe), T("onClear"), S(Re, xe), T("onChange");
    }
    function ye(N) {
      const { disabled: K, onClick: me } = e;
      c != null && c.disabled.value || K || (S(me, N), T("onClick"));
    }
    function Te(N) {
      const { disabled: K, readonly: me, modelValue: Se, onClose: Ue, onChange: Re } = e;
      if (c != null && c.disabled.value || c != null && c.readonly.value || K || me)
        return;
      const xe = p.find(({ label: Sn }) => Sn.value === N), sn = Se.filter(
        (Sn) => {
          var fe;
          return Sn !== ((fe = xe.value.value) != null ? fe : xe.label.value);
        }
      );
      S(e["onUpdate:modelValue"], sn), S(Ue, sn), T("onClose"), S(Re, sn), T("onChange");
    }
    function H() {
      s.value = tn(e.offsetY), n.value = !0;
    }
    function Q() {
      n.value = !1, t.value = !1;
    }
    function ae() {
      return z(e.rules, e.modelValue);
    }
    function ve() {
      S(e["onUpdate:modelValue"], e.multiple ? [] : void 0), I();
    }
    return {
      root: o,
      offsetY: s,
      isFocusing: n,
      showMenu: t,
      errorMessage: k,
      formDisabled: c == null ? void 0 : c.disabled,
      formReadonly: c == null ? void 0 : c.readonly,
      label: h,
      labels: v,
      isEmptyModelValue: i,
      menuEl: P,
      placement: M,
      cursor: l,
      placeholderColor: D,
      enableCustomPlaceholder: U,
      isFunction: vn,
      n: Y2,
      classes: W2,
      handleFocus: B,
      handleBlur: j,
      handleClickOutside: J,
      handleClear: ne,
      handleClick: ye,
      handleClose: Te,
      handleRootBlur: E,
      reset: ve,
      validate: ae,
      resetValidation: I,
      focus: H,
      blur: Q
    };
  }
});
yh.render = q2;
var Li = yh;
re(Li);
ie(Li, bh);
const DI = Li;
var Ps = Li;
const wh = {
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
}, { name: X2, n: G2 } = x("signature"), Z2 = ["height", "width"];
function J2(e, n) {
  return g(), C(
    "div",
    {
      ref: "root",
      class: m(e.n())
    },
    [
      L("canvas", {
        ref: "canvas",
        height: e.canvasHeight,
        width: e.canvasWidth
      }, null, 8, Z2)
    ],
    2
    /* CLASS */
  );
}
const kh = ee({
  name: X2,
  props: wh,
  setup(e) {
    const n = $(), t = $(), o = $(0), r = $(0);
    let a = !1, i = null;
    je(t, "touchstart", s), je(t, "touchmove", u), je(t, "touchend", c), nt(l), ht(l);
    function l() {
      !t.value || !n.value || (i = t.value.getContext("2d"), o.value = n.value.offsetWidth, r.value = n.value.offsetHeight);
    }
    function s(v) {
      !i || !n.value || (v.preventDefault(), a = !0, i.beginPath(), i.lineWidth = Y(e.lineWidth), i.strokeStyle = e.strokeStyle === "currentColor" ? Zn(n.value).color : e.strokeStyle, S(e.onStart));
    }
    function u(v) {
      if (v.preventDefault(), !t.value || !i || !a)
        return;
      const y = v.touches[0].clientX, w = v.touches[0].clientY, k = nn(t.value), b = y - k.left, z = w - k.top;
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
      n: G2,
      confirm: h,
      reset: f
    };
  }
});
kh.render = J2;
var Vi = kh;
re(Vi);
ie(Vi, wh);
const AI = Vi;
var Os = Vi;
const $h = {
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
}, { name: Q2, n: x2, classes: _2 } = x("skeleton");
function e8(e, n) {
  return g(), C(
    "div",
    {
      class: m(e.classes(e.n("$--box"), e.n()))
    },
    [
      e.loading ? X("v-if", !0) : (g(), C(
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
              L(
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
          )) : X("v-if", !0),
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
                  L(
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
              )) : X("v-if", !0),
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
                      L(
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
                  )) : X("v-if", !0),
                  (g(!0), C(
                    Me,
                    null,
                    Ke(e.toNumber(e.rows), (t, o) => (g(), C(
                      "div",
                      {
                        key: t,
                        class: m(e.n("row")),
                        style: G({ width: e.toSizeUnit(e.rowsWidth[o]) })
                      },
                      [
                        L(
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
              )) : X("v-if", !0)
            ],
            2
            /* CLASS */
          )) : X("v-if", !0)
        ],
        2
        /* CLASS */
      )) : X("v-if", !0),
      e.loading && e.fullscreen ? (g(), C(
        "div",
        {
          key: 2,
          class: m(e.n("fullscreen")),
          style: G({ zIndex: e.toNumber(e.fullscreenZIndex) })
        },
        [
          L(
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
      )) : X("v-if", !0)
    ],
    2
    /* CLASS */
  );
}
const Ch = ee({
  name: Q2,
  props: $h,
  setup: () => ({
    n: x2,
    classes: _2,
    toSizeUnit: Oe,
    toNumber: Y
  })
});
Ch.render = e8;
var Fi = Ch;
re(Fi);
ie(Fi, $h);
const NI = Fi;
var Es = Fi, un = /* @__PURE__ */ ((e) => (e.First = "1", e.Second = "2", e))(un || {});
const Sh = {
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
}, { name: n8, n: cp, classes: t8 } = x("slider"), o8 = ["tabindex", "aria-valuemin", "aria-valuemax", "aria-valuenow", "aria-disabled", "aria-valuetext", "onTouchstart", "onFocusin", "onFocusout"];
function r8(e, n) {
  const t = te("mp-hover-overlay"), o = te("mp-form-details"), r = Ge("hover");
  return g(), C(
    "div",
    {
      class: m(e.classes(e.n(e.direction), e.n("$--box")))
    },
    [
      L(
        "div",
        {
          ref: "sliderEl",
          class: m(e.classes(e.n(`${e.direction}-block`), [e.isDisabled, e.n("--disabled")], [e.errorMessage, e.n(`${e.direction}--error`)])),
          onClick: n[1] || (n[1] = (...a) => e.handleClick && e.handleClick(...a))
        },
        [
          L(
            "div",
            {
              class: m(e.n(`${e.direction}-track`))
            },
            [
              L(
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
              L(
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
            Me,
            null,
            Ke(e.thumbList, (a) => (g(), C("div", {
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
                Ne(L(
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
                L(
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
                L(
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
                    L(
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
            ], 46, o8))),
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
const zh = ee({
  name: n8,
  components: {
    MpFormDetails: Bn,
    MpHoverOverlay: Vn
  },
  directives: { Hover: Dn },
  props: Sh,
  setup(e) {
    const n = $(0), t = $(null), o = $(!1), r = O(() => Y(e.max) - Y(e.min)), a = O(() => n.value / r.value * Y(e.step)), i = O(() => e.disabled || (p == null ? void 0 : p.disabled.value)), l = O(() => e.readonly || (p == null ? void 0 : p.readonly.value)), s = O(() => e.direction === "vertical"), u = $(!1), c = $(!1), { bindForm: d, form: p } = jn(), { errorMessage: f, validateWithTrigger: h, validate: v, resetValidation: y } = Un(), { hovering: w, handleHovering: k } = _n(), { hovering: b, handleHovering: z } = _n(), I = O(() => {
      const { modelValue: oe, range: de } = e;
      let ke = [];
      return de && Fe(oe) ? ke = [
        {
          value: J(oe[0]),
          enumValue: un.First,
          text: q(oe[0]),
          hovering: w.value,
          focusing: u.value,
          handleHovering: k,
          handleFocusing(Ie) {
            u.value = Ie;
          }
        },
        {
          value: J(oe[1]),
          enumValue: un.Second,
          text: q(oe[1]),
          hovering: b.value,
          focusing: c.value,
          handleHovering: z,
          handleFocusing(Ie) {
            c.value = Ie;
          }
        }
      ] : zn(oe) && (ke = [
        {
          value: J(oe),
          enumValue: un.First,
          text: q(oe),
          hovering: w.value,
          focusing: u.value,
          handleHovering: k,
          handleFocusing(Ie) {
            u.value = Ie;
          }
        }
      ]), ke;
    }), P = O(() => {
      const { activeColor: oe, range: de, modelValue: ke } = e, Ie = de && Fe(ke) ? J(Math.min(ke[0], ke[1])) : 0, _e = de && Fe(ke) ? J(Math.max(ke[0], ke[1])) - Ie : J(ke);
      return s.value ? {
        left: "0px",
        height: `${_e}%`,
        bottom: `${Ie}%`,
        background: oe
      } : {
        top: "0px",
        width: `${_e}%`,
        left: `${Ie}%`,
        background: oe
      };
    }), M = en({
      [un.First]: A(),
      [un.Second]: A()
    });
    let D;
    S(d, {
      reset: xe,
      validate: W,
      resetValidation: y
    }), pe([() => e.modelValue, () => e.step], ([oe, de]) => {
      !Se() || !Ue() || o.value || Re(oe, Y(de));
    }), pe(n, () => Re()), yn(() => {
      !Se() || !Ue() || V();
    }), ua(ae), je(() => window, "keydown", Sn), nt(V);
    function V() {
      n.value = t.value[s.value ? "offsetHeight" : "offsetWidth"];
    }
    function W() {
      return v(e.rules, e.modelValue);
    }
    function A() {
      return {
        startPosition: 0,
        currentOffset: 0,
        active: !1,
        percentValue: 0
      };
    }
    function T() {
      Ye(() => h(["onChange"], "onChange", e.rules, e.modelValue));
    }
    function B(oe) {
      const de = oe.currentTarget;
      return de ? s.value ? n.value - (oe.clientY - nn(de).top) : oe.clientX - Sy(de) : 0;
    }
    function j(oe) {
      return {
        [s.value ? "bottom" : "left"]: `${oe.value}%`,
        zIndex: M[oe.enumValue].active ? 1 : void 0
      };
    }
    function E(oe) {
      return e.labelVisible === "always" ? !0 : e.labelVisible === "never" ? !1 : M[oe].active;
    }
    function J(oe) {
      const { min: de, max: ke } = e;
      return oe < Y(de) ? 0 : oe > Y(ke) ? 100 : (oe - Y(de)) / r.value * 100;
    }
    function q(oe) {
      if (!zn(oe))
        return 0;
      const de = $n(oe, Y(e.min), Y(e.max));
      return parseInt(`${de}`, 10) === de ? de : Y(de.toPrecision(5));
    }
    function ne(oe, de) {
      i.value || de.handleHovering(oe);
    }
    function ye(oe) {
      S(e.onChange, oe), S(e["onUpdate:modelValue"], oe), T();
    }
    function Te(oe, de) {
      let ke = [];
      const { step: Ie, range: _e, modelValue: le, min: $e } = e, Pe = Y(Ie), Le = Math.round(oe / a.value), Ve = Le * Pe + Y($e), pn = M[de].percentValue * Pe + Y($e);
      if (M[de].percentValue = Le, _e && Fe(le) && (ke = de === un.First ? [Ve, le[1]] : [le[0], Ve]), pn !== Ve) {
        const gn = _e ? ke.map((hn) => q(hn)) : q(Ve);
        ye(gn);
      }
    }
    function H(oe) {
      if (!e.range)
        return un.First;
      const de = M[un.First].percentValue * a.value, ke = M[un.Second].percentValue * a.value, Ie = Math.abs(oe - de), _e = Math.abs(oe - ke);
      return Ie <= _e ? un.First : un.Second;
    }
    function Q() {
      document.addEventListener("touchmove", N, { passive: !1 }), document.addEventListener("touchend", K), document.addEventListener("touchcancel", K);
    }
    function ae() {
      document.removeEventListener("touchmove", N), document.removeEventListener("touchend", K), document.removeEventListener("touchcancel", K);
    }
    function ve(oe, de) {
      if (V(), i.value || (M[de].active = !0), D = de, Q(), i.value || l.value)
        return;
      S(e.onStart), o.value = !0;
      const { clientX: ke, clientY: Ie } = oe.touches[0];
      M[de].startPosition = s.value ? Ie : ke;
    }
    function N(oe) {
      if (Ae(oe), i.value || l.value || !o.value)
        return;
      const { startPosition: de, currentOffset: ke } = M[D], { clientX: Ie, clientY: _e } = oe.touches[0];
      let le = (s.value ? de - _e : Ie - de) + ke;
      le <= 0 ? le = 0 : le >= n.value && (le = n.value), Te(le, D);
    }
    function K() {
      ae();
      const { range: oe, modelValue: de, onEnd: ke, step: Ie, min: _e } = e;
      if (i.value || (M[D].active = !1), i.value || l.value)
        return;
      let le = [];
      M[D].currentOffset = M[D].percentValue * a.value;
      const $e = M[D].percentValue * Y(Ie) + Y(_e);
      oe && Fe(de) && (le = D === un.First ? [$e, de[1]] : [de[0], $e]), S(ke, oe ? le : $e), o.value = !1;
    }
    function me(oe) {
      if (i.value || l.value || oe.target.closest(`.${cp("thumb")}`))
        return;
      const de = B(oe), ke = H(de);
      D = ke, Te(de, ke), K();
    }
    function Se() {
      return Y(e.step) <= 0 ? (O0("Slider", '"step" should be > 0'), !1) : !0;
    }
    function Ue() {
      const { range: oe, modelValue: de } = e;
      return oe && !Fe(de) ? (lo("Slider", '"modelValue" should be an Array'), !1) : !oe && Fe(de) ? (lo("Slider", '"modelValue" should be a Number'), !1) : oe && Fe(de) && de.length < 2 ? (lo("Slider", '"modelValue" should have two value'), !1) : !0;
    }
    function Re(oe = e.modelValue, de = Y(e.step)) {
      const ke = (Ie) => {
        const { min: _e, max: le } = e;
        return Ie < Y(_e) ? 0 : Ie > Y(le) ? r.value / de : (Ie - Y(_e)) / de;
      };
      e.range && Fe(oe) ? (M[un.First].percentValue = ke(oe[0]), M[un.First].currentOffset = M[un.First].percentValue * a.value, M[un.Second].percentValue = ke(oe[1]), M[un.Second].currentOffset = M[un.Second].percentValue * a.value) : zn(oe) && (M[un.First].currentOffset = ke(oe) * a.value);
    }
    function xe() {
      const oe = e.range ? [0, 0] : 0;
      S(e["onUpdate:modelValue"], oe), y();
    }
    function sn(oe, de) {
      const ke = Y(e.step);
      if (Fe(de)) {
        const Ie = de[0] + (u.value ? oe * ke : 0), _e = de[1] + (c.value ? oe * ke : 0);
        return [Ie, _e].map(q);
      }
      return q(de + oe * ke);
    }
    function Sn(oe) {
      const de = {
        ArrowRight: 1,
        ArrowUp: 1,
        ArrowLeft: -1,
        ArrowDown: -1
      }, { key: ke } = oe;
      if (!qt(de, ke) || l.value || i.value || e.range && !u.value && !c.value || !e.range && !u.value)
        return;
      Ae(oe);
      const Ie = de[ke], _e = sn(Ie, e.modelValue);
      ye(_e);
    }
    function fe(oe) {
      i.value || oe.handleFocusing(!0);
    }
    function We(oe) {
      oe.handleFocusing(!1);
    }
    return {
      sliderEl: t,
      getFillStyle: P,
      isDisabled: i,
      isVertical: s,
      errorMessage: f,
      thumbsProps: M,
      thumbList: I,
      handleFocus: fe,
      handleBlur: We,
      n: cp,
      classes: t8,
      thumbStyle: j,
      hover: ne,
      toSizeUnit: Oe,
      toNumber: Y,
      showLabel: E,
      start: ve,
      move: N,
      end: K,
      handleClick: me
    };
  }
});
zh.render = r8;
var Ui = zh;
re(Ui);
ie(Ui, Sh);
const RI = Ui;
var Ts = Ui, a8 = Object.defineProperty, i8 = Object.defineProperties, l8 = Object.getOwnPropertyDescriptors, dp = Object.getOwnPropertySymbols, s8 = Object.prototype.hasOwnProperty, u8 = Object.prototype.propertyIsEnumerable, pp = (e, n, t) => n in e ? a8(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t, c8 = (e, n) => {
  for (var t in n || (n = {}))
    s8.call(n, t) && pp(e, t, n[t]);
  if (dp)
    for (var t of dp(n))
      u8.call(n, t) && pp(e, t, n[t]);
  return e;
}, d8 = (e, n) => i8(e, l8(n));
const Ru = {
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
  loadingType: De(ut, "type"),
  loadingSize: De(ut, "size"),
  loadingRadius: De(ut, "radius"),
  loadingColor: d8(c8({}, De(ut, "color")), {
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
}, { n: p8, classes: m8 } = x("snackbar"), f8 = {
  success: "checkbox-marked-circle",
  warning: "warning",
  info: "information",
  error: "error",
  loading: ""
};
function v8(e, n) {
  const t = te("mp-icon"), o = te("mp-loading");
  return Ne((g(), C(
    "div",
    {
      class: m(e.n()),
      style: G({ pointerEvents: e.isForbidClick ? "auto" : "none", zIndex: e.zIndex })
    },
    [
      L(
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
          L(
            "div",
            {
              class: m([e.n("content"), e.contentClass])
            },
            [
              F(e.$slots, "default", {}, () => [
                Be(
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
              e.iconName ? (g(), we(t, {
                key: 0,
                name: e.iconName
              }, null, 8, ["name"])) : X("v-if", !0),
              e.type === "loading" ? (g(), we(o, {
                key: 1,
                type: e.loadingType,
                size: e.loadingSize,
                color: e.loadingColor,
                radius: e.loadingRadius
              }, null, 8, ["type", "size", "color", "radius"])) : X("v-if", !0),
              F(e.$slots, "icon")
            ],
            2
            /* CLASS */
          )) : X("v-if", !0),
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
          )) : X("v-if", !0)
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
const Ph = ee({
  name: "MpSnackbarCore",
  components: {
    MpLoading: go,
    MpIcon: Ze
  },
  props: Ru,
  setup(e) {
    const n = $(null), { zIndex: t } = lr(() => e.show, 1);
    ir(
      () => e.show,
      () => e.lockScroll
    );
    const o = O(() => {
      const { type: i, forbidClick: l } = e;
      return i === "loading" || l;
    }), r = O(() => e.type ? f8[e.type] : "");
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
      SNACKBAR_TYPE: Th,
      zIndex: t,
      iconName: r,
      isForbidClick: o,
      n: p8,
      classes: m8,
      formatElevation: dn
    };
  }
});
Ph.render = v8;
var Oh = Ph;
const { name: g8, n: h8 } = x("snackbar");
function b8(e, n) {
  const t = te("mp-snackbar-core");
  return g(), we(it, {
    to: e.teleport === !1 ? void 0 : e.teleport,
    disabled: e.disabled || e.teleport === !1
  }, [
    Z(Qe, {
      name: `${e.n()}-fade`,
      onAfterEnter: e.onOpened,
      onAfterLeave: e.onClosed
    }, {
      default: ue(() => [
        Z(t, He(e.$props, {
          class: e.n("transition")
        }), Kt({
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
const Eh = ee({
  name: g8,
  components: { MpSnackbarCore: Oh },
  props: Ru,
  setup() {
    const { disabled: e } = xt();
    return {
      disabled: e,
      n: h8
    };
  }
});
Eh.render = b8;
var ji = Eh, y8 = Object.defineProperty, mp = Object.getOwnPropertySymbols, w8 = Object.prototype.hasOwnProperty, k8 = Object.prototype.propertyIsEnumerable, fp = (e, n, t) => n in e ? y8(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t, Zo = (e, n) => {
  for (var t in n || (n = {}))
    w8.call(n, t) && fp(e, t, n[t]);
  if (mp)
    for (var t of mp(n))
      k8.call(n, t) && fp(e, t, n[t]);
  return e;
};
const Th = ["loading", "success", "warning", "info", "error"];
let vp = 0, Bs = !1, Bh, Jo = !1;
const Mh = {
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
let qn = en([]), Lu = Mh;
const $8 = {
  name: "mp-snackbar-fade",
  tag: "div",
  class: "mp-transition-group"
}, pl = (e) => () => vn(e) ? e() : e, C8 = {
  setup() {
    return () => {
      const e = qn.map(({
        id: n,
        reactiveSnackOptions: t,
        _update: o
      }) => {
        const r = document.querySelector(".mp-transition-group");
        t.forbidClick || t.type === "loading" ? r.classList.add("mp-pointer-auto") : r.classList.remove("mp-pointer-auto");
        const a = Zo({
          position: Jo ? "relative" : "absolute"
        }, T8(t.position)), {
          content: i,
          icon: l,
          action: s
        } = t, u = {
          default: pl(i),
          icon: pl(l),
          action: pl(s)
        };
        return Z(Oh, He(t, {
          key: n,
          style: a,
          "data-id": n,
          _update: o,
          show: t.show,
          "onUpdate:show": (c) => t.show = c
        }), u);
      });
      return Z(yb, He($8, {
        style: {
          zIndex: Rn.zIndex
        },
        onAfterEnter: S8,
        onAfterLeave: z8
      }), {
        default: () => [e]
      });
    };
  }
}, at = function(e) {
  const n = O8(e), t = en(Zo(Zo({}, Lu), n));
  t.show = !0, Bs || (Bs = !0, Bh = $o(C8).unmountInstance);
  const {
    length: o
  } = qn, r = {
    id: vp++,
    reactiveSnackOptions: t
  };
  if (o === 0 || Jo)
    P8(r);
  else {
    const a = `update-${vp}`;
    E8(t, a);
  }
  return {
    clear() {
      !Jo && qn.length ? qn[0].reactiveSnackOptions.show = !1 : t.show = !1;
    }
  };
};
Th.forEach((e) => {
  at[e] = (n) => (Ln(n) ? n.type = e : n = {
    content: n,
    type: e
  }, at(n));
});
at.allowMultiple = function(e = !1) {
  e !== Jo && (qn.forEach((n) => {
    n.reactiveSnackOptions.show = !1;
  }), Jo = e);
};
at.clear = function() {
  qn.forEach((e) => {
    e.reactiveSnackOptions.show = !1;
  });
};
at.setDefaultOptions = function(e) {
  Lu = e;
};
at.resetDefaultOptions = function() {
  Lu = Mh;
};
function S8(e) {
  const n = e.getAttribute("data-id"), t = qn.find((o) => o.id === Y(n));
  t && S(t.reactiveSnackOptions.onOpened);
}
function z8(e) {
  e.parentElement && e.parentElement.classList.remove("mp-pointer-auto");
  const n = e.getAttribute("data-id"), t = qn.find((r) => r.id === Y(n));
  t && (t.animationEnd = !0, S(t.reactiveSnackOptions.onClosed)), qn.every((r) => r.animationEnd) && (S(Bh), qn = en([]), Bs = !1);
}
function P8(e) {
  qn.push(e);
}
function O8(e = {}) {
  return ln(e) ? {
    content: e
  } : e;
}
function E8(e, n) {
  const [t] = qn;
  t.reactiveSnackOptions = Zo(Zo({}, t.reactiveSnackOptions), e), t._update = n;
}
function T8(e = "top") {
  return e === "bottom" ? {
    top: "85%"
  } : {
    top: e === "top" ? "5%" : "45%"
  };
}
at.Component = ji;
re(ji);
re(ji, at);
ie(at, Ru);
const LI = ji;
var Ms = at;
const Ih = {
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
}, B8 = (e) => ["xs", "sm", "md", "lg", "xl"].includes(e), {
  name: M8,
  n: To,
  classes: I8
} = x("space");
function D8(e, n) {
  return n ? [`var(--mp-space-size-${e}-row-gap)`, `var(--mp-space-size-${e}-column-gap)`] : Fe(e) ? e.map(Oe) : da(e) ? [Oe(e), Oe(e)] : [`var(--mp-space-size-${e}-row-gap)`, `var(--mp-space-size-${e}-column-gap)`];
}
var Hi = ee({
  name: M8,
  props: Ih,
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
    } = wb(e), s = O(() => {
      const [u, c] = D8(l.value, B8(l.value));
      return `${u} ${c}`;
    });
    return () => {
      var u, c;
      const d = (c = (u = n.default) == null ? void 0 : u.call(n)) != null ? c : [], p = mm(d).filter((h) => !(h && typeof h == "object" && h.type === Bp)), f = !!n.split;
      return Z("div", {
        class: I8(To(), To("$--box"), [t.value, To("--block")]),
        style: {
          gap: s.value,
          flexDirection: i.value,
          justifyContent: Zr(o.value),
          alignItems: Zr(i.value === "row" ? r.value ? r.value : "center" : r.value ? r.value : "flex-start"),
          flexWrap: a.value ? "wrap" : "nowrap"
        }
      }, [p.map((h, v) => {
        var y, w;
        const k = (y = h == null ? void 0 : h.key) != null ? y : `mp-space-item-${v}`;
        return Z(Me, {
          key: k
        }, [f && v > 0 && Z("div", {
          class: To("item-split")
        }, [(w = n.split) == null ? void 0 : w.call(n)]), Z("div", {
          class: To("item")
        }, [h])]);
      })]);
    };
  }
});
re(Hi);
ie(Hi, Ih);
const VI = Hi;
var Is = Hi;
const Dh = {
  activeIcon: {
    type: String,
    default: "check"
  },
  currentIcon: De(cn, "name"),
  inactiveIcon: De(cn, "name"),
  activeIconNamespace: De(cn, "namespace"),
  currentIconNamespace: De(cn, "namespace"),
  inactiveIconNamespace: De(cn, "namespace")
}, Ah = Symbol("STEPS_BIND_STEP_KEY");
function A8() {
  const { bindChildren: e, childProviders: n } = kn(Ah);
  return {
    step: n,
    bindStep: e
  };
}
function N8() {
  const { parentProvider: e, index: n, bindParent: t } = wn(Ah);
  return Xn(!!t, "Steps", "<step/> must in <steps>"), {
    index: n,
    steps: e,
    bindSteps: t
  };
}
const { name: R8, n: L8, classes: V8 } = x("step"), F8 = { key: 3 };
function U8(e, n) {
  const t = te("mp-icon");
  return g(), C(
    "div",
    {
      class: m(e.n())
    },
    [
      L(
        "div",
        {
          class: m(e.n(e.direction))
        },
        [
          L(
            "div",
            {
              class: m(e.classes(e.n(`${e.direction}-tag`), [e.isActive || e.isCurrent, e.n(`${e.direction}-tag--active`)])),
              style: G({ backgroundColor: e.isActive || e.isCurrent ? e.activeColor : e.inactiveColor }),
              onClick: n[0] || (n[0] = (...o) => e.click && e.click(...o))
            },
            [
              e.isActive ? (g(), we(t, {
                key: 0,
                class: m(e.n("icon")),
                "mp-step-cover": "",
                name: e.activeIcon,
                namespace: e.activeIconNamespace
              }, null, 8, ["class", "name", "namespace"])) : e.isCurrent && e.currentIcon ? (g(), we(t, {
                key: 1,
                class: m(e.n("icon")),
                "mp-step-cover": "",
                name: e.currentIcon,
                namespace: e.currentIconNamespace
              }, null, 8, ["class", "name", "namespace"])) : e.inactiveIcon ? (g(), we(t, {
                key: 2,
                class: m(e.n("icon")),
                "mp-step-cover": "",
                name: e.inactiveIcon,
                namespace: e.inactiveIconNamespace
              }, null, 8, ["class", "name", "namespace"])) : (g(), C(
                "span",
                F8,
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
          )) : X("v-if", !0),
          L(
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
const Nh = ee({
  name: R8,
  components: { MpIcon: Ze },
  props: Dh,
  setup() {
    const { index: e, steps: n, bindSteps: t } = N8(), { active: o, activeColor: r, inactiveColor: a, direction: i, clickStep: l } = n, s = O(() => o.value === e.value), u = O(() => e.value !== -1 && Y(o.value) > e.value);
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
      n: L8,
      classes: V8,
      click: d
    };
  }
});
Nh.render = U8;
var Yi = Nh;
re(Yi);
ie(Yi, Dh);
const FI = Yi;
var Ds = Yi;
const Rh = {
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
}, { name: j8, n: H8 } = x("steps");
function Y8(e, n) {
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
const Lh = ee({
  name: j8,
  props: Rh,
  setup(e) {
    const n = O(() => e.active), t = O(() => e.activeColor), o = O(() => e.inactiveColor), r = O(() => e.direction), { bindStep: a } = A8();
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
    return { n: H8 };
  }
});
Lh.render = Y8;
var Wi = Lh;
re(Wi);
ie(Wi, Rh);
const UI = Wi;
var As = Wi;
const Vh = {
  styleVars: {
    type: Object,
    default: () => ({})
  },
  tag: {
    type: String,
    default: "div"
  }
}, { name: W8, n: K8 } = x("style-provider"), q8 = ee({
  name: W8,
  props: Vh,
  setup(e, { slots: n }) {
    return () => xo(
      e.tag,
      {
        class: K8(),
        style: Fm(e.styleVars)
      },
      S(n.default)
    );
  }
});
var Ki = q8;
const Fh = "maple-style-vars";
function gp() {
  const e = document.head.querySelector(`#${Fh}`);
  e && document.head.removeChild(e);
}
function X8(e) {
  const n = document.createElement("style");
  n.id = Fh, n.innerHTML = e, document.head.appendChild(n);
}
function qi(e) {
  if (e == null) {
    gp();
    return;
  }
  const n = Fm(e ?? {}), t = Object.entries(n).reduce((o, [r, a]) => (o += `${r}:${a};`, o), `:root:root {
`);
  gp(), X8(`${t}
}`);
}
qi.Component = Ki;
re(Ki);
re(Ki, qi);
ie(qi, Vh);
const jI = Ki;
var Ns = qi;
const Uh = {
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
}, { name: G8, n: Z8, classes: J8 } = x("switch"), Q8 = ["aria-checked"], x8 = ["tabindex"];
function _8(e, n) {
  const t = te("mp-hover-overlay"), o = te("mp-form-details"), r = Ge("ripple"), a = Ge("hover");
  return Ne((g(), C("div", {
    class: m(e.classes(e.n(), [e.variant, e.n("--variant")])),
    role: "switch",
    "aria-checked": e.modelValue
  }, [
    L(
      "div",
      {
        ref: "switchRef",
        class: m(e.classes(e.n("block"), [e.disabled || e.formDisabled, e.n("--disabled")], [e.isActive, e.n("block--active")])),
        style: G(e.styleComputed.switch),
        onClick: n[2] || (n[2] = (...i) => e.switchActive && e.switchActive(...i))
      },
      [
        L(
          "div",
          {
            style: G(e.styleComputed.track),
            class: m(e.classes(e.n("track"), [e.isActive, e.n("track--active")], [e.errorMessage && !e.variant, e.n("track--error")]))
          },
          null,
          6
          /* CLASS, STYLE */
        ),
        Ne((g(), C("div", {
          class: m(e.classes(e.n("ripple"), [e.isActive, e.n("ripple--active")])),
          style: G(e.styleComputed.ripple),
          tabindex: e.disabled || e.formDisabled ? void 0 : "0",
          onFocus: n[0] || (n[0] = (i) => e.isFocusing = !0),
          onBlur: n[1] || (n[1] = (i) => e.isFocusing = !1)
        }, [
          L(
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
                  L(
                    "svg",
                    { viewBox: "25 25 50 50" },
                    [
                      L("circle", {
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
              )) : X("v-if", !0)
            ],
            6
            /* CLASS, STYLE */
          ),
          Z(t, {
            hovering: e.hovering && !e.disabled && !e.formDisabled,
            focusing: e.isFocusing && !e.disabled && !e.formDisabled
          }, null, 8, ["hovering", "focusing"])
        ], 46, x8)), [
          [r, {
            disabled: !e.ripple || e.disabled || e.loading || e.formDisabled || e.readonly || e.formReadonly
          }]
        ])
      ],
      6
      /* CLASS, STYLE */
    ),
    Z(o, { "error-message": e.errorMessage }, null, 8, ["error-message"])
  ], 10, Q8)), [
    [a, e.hover, "desktop"]
  ]);
}
const jh = ee({
  name: G8,
  components: {
    MpFormDetails: Bn,
    MpHoverOverlay: Vn
  },
  directives: { Ripple: on, Hover: Dn },
  props: Uh,
  setup(e) {
    const n = $(null), t = $(!1), { bindForm: o, form: r } = jn(), { errorMessage: a, validateWithTrigger: i, validate: l, resetValidation: s } = Un(), { hovering: u, handleHovering: c } = _n(), d = O(() => e.modelValue === e.activeValue), p = O(() => {
      const { size: P, color: M, closeColor: D, loadingColor: U, variant: V } = e;
      return {
        handle: {
          width: On(P),
          height: On(P),
          backgroundColor: d.value ? M : D,
          color: U
        },
        ripple: {
          left: d.value ? On(P, 0.5) : `-${On(P, V ? 1 / 3 : 0.5)}`,
          color: d.value ? M : D || "currentColor",
          width: On(P, 2),
          height: On(P, 2)
        },
        track: {
          width: On(P, V ? 13 / 6 : 1.9),
          height: On(P, V ? 4 / 3 : 0.72),
          borderRadius: On(P, 2 / 3),
          filter: d.value || a != null && a.value ? void 0 : `brightness(${V ? 1 : 0.6})`,
          backgroundColor: d.value ? M : D,
          borderWidth: V && !d.value ? On(P, 1 / 12) : void 0
        },
        switch: {
          width: On(P, V ? 13 / 6 : 2),
          height: On(P, V ? 4 / 3 : 1.2)
        }
      };
    }), f = O(() => On(e.size, 0.8));
    S(o, {
      reset: I,
      validate: w,
      resetValidation: s
    }), je(() => window, "keydown", v), je(() => window, "keyup", y);
    function v(P) {
      t.value && ((P.key === " " || P.key === "Enter") && Ae(P), P.key === "Enter" && n.value.click());
    }
    function y(P) {
      !t.value || P.key !== " " || (Ae(P), n.value.click());
    }
    function w() {
      return l(e.rules, e.modelValue);
    }
    function k(P) {
      Ye(() => {
        const { validateTrigger: M, rules: D, modelValue: U } = e;
        i(M, P, D, U);
      });
    }
    function b(P) {
      const {
        onClick: M,
        onChange: D,
        disabled: U,
        loading: V,
        readonly: W,
        activeValue: A,
        inactiveValue: T,
        lazyChange: B,
        "onUpdate:modelValue": j,
        onBeforeChange: E
      } = e;
      if (U || r != null && r.disabled.value || (S(M, P), V || W || r != null && r.readonly.value))
        return;
      const J = d.value ? T : A;
      B ? S(E, J, (q) => {
        S(j, q), k("onLazyChange");
      }) : (S(D, J), S(j, J), k("onChange"));
    }
    function z(P) {
      e.disabled || r != null && r.disabled.value || c(P);
    }
    function I() {
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
      n: Z8,
      classes: J8,
      formatElevation: dn,
      multiplySizeUnit: On,
      switchActive: b,
      hover: z
    };
  }
});
jh.render = _8;
var Xi = jh;
re(Xi);
ie(Xi, Uh);
const HI = Xi;
var Rs = Xi;
const Hh = {
  name: [String, Number],
  title: String,
  disabled: Boolean,
  ripple: {
    type: Boolean,
    default: !0
  },
  onClick: R()
}, Yh = Symbol("TABS_BIND_TAB_KEY");
function e3() {
  const { childProviders: e, bindChildren: n, length: t } = kn(Yh);
  return {
    length: t,
    tabList: e,
    bindTabList: n
  };
}
function n3() {
  const { parentProvider: e, bindParent: n, index: t } = wn(Yh);
  return Xn(!!n, "Tab", "<mp-tab/> must in <mp-tabs/>"), {
    index: t,
    tabs: e,
    bindTabs: n
  };
}
const { name: t3, n: Er, classes: o3 } = x("tab");
function r3(e, n) {
  const t = Ge("ripple");
  return Ne((g(), C(
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
        Be(
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
const Wh = ee({
  name: t3,
  directives: { Ripple: on },
  props: Hh,
  setup(e) {
    const n = $(null), t = O(() => n.value), o = O(() => e.name), r = O(() => e.disabled), { index: a, tabs: i, bindTabs: l } = n3(), { onTabClick: s, active: u, activeColor: c, inactiveColor: d, disabledColor: p, itemVertical: f, resize: h } = i, v = O(() => f.value ? "vertical" : "horizontal"), y = {
      name: o,
      index: a,
      disabled: r,
      element: t
    };
    l(y), pe(() => [e.name, e.disabled], h);
    function w() {
      return e.name != null ? u.value === e.name : u.value === (a == null ? void 0 : a.value);
    }
    function k() {
      return e.disabled ? p.value : w() ? c.value : d.value;
    }
    function b() {
      return e.disabled ? Er("$-tab--disabled") : w() ? Er("$-tab--active") : Er("$-tab--inactive");
    }
    function z(I) {
      const { disabled: P, name: M, onClick: D } = e;
      P || (S(D, M ?? a.value, I), s(y));
    }
    return {
      tabEl: n,
      active: u,
      activeColor: c,
      inactiveColor: d,
      itemDirection: v,
      n: Er,
      classes: o3,
      computeColorStyle: k,
      computeColorClass: b,
      handleClick: z
    };
  }
});
Wh.render = r3;
var Gi = Wh;
re(Gi);
ie(Gi, Hh);
const YI = Gi;
var Ls = Gi;
const Kh = {
  name: [String, Number]
}, { name: a3, n: i3, classes: l3 } = x("tab-item");
function s3(e, n) {
  const t = te("mp-swipe-item");
  return g(), we(t, {
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
const qh = ee({
  name: a3,
  components: { MpSwipeItem: Xo },
  props: Kh,
  setup(e) {
    const n = $(!1), t = O(() => e.name), { index: o, bindTabsItems: r } = B4(), { bindLists: a } = M4(), i = {
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
      n: i3,
      classes: l3
    };
  }
});
qh.render = s3;
var Zi = qh;
re(Zi);
ie(Zi, Kh);
const WI = Zi;
var Vs = Zi;
const Xh = {
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
}, { name: u3, n: c3, classes: d3 } = x("table");
function p3(e, n) {
  return g(), C(
    "div",
    {
      class: m(e.classes(e.n(), e.formatElevation(e.elevation, 1), e.n("$--box")))
    },
    [
      L(
        "div",
        {
          class: m(e.n("main")),
          style: G({ "max-height": e.toSizeUnit(e.scrollerHeight) })
        },
        [
          L(
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
      )) : X("v-if", !0)
    ],
    2
    /* CLASS */
  );
}
const Gh = ee({
  name: u3,
  props: Xh,
  setup: () => ({
    toSizeUnit: Oe,
    n: c3,
    classes: d3,
    formatElevation: dn
  })
});
Gh.render = p3;
var Ji = Gh;
re(Ji);
ie(Ji, Xh);
const KI = Ji;
var Fs = Ji;
const Zh = {
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
  stickyCssMode: De(Ao, "cssMode"),
  stickyZIndex: De(Ao, "zIndex"),
  offsetTop: De(Ao, "offsetTop"),
  onClick: R(),
  onChange: R(),
  "onUpdate:active": R()
};
var hp = (e, n, t) => new Promise((o, r) => {
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
const { name: m3, n: f3, classes: v3 } = x("tabs");
function g3(e, n) {
  return g(), we(Qt(e.sticky ? e.n("$-sticky") : e.Transition), {
    ref: e.sticky ? "stickyComponent" : void 0,
    "css-mode": e.sticky ? e.stickyCssMode : void 0,
    "offset-top": e.sticky ? e.offsetTop : void 0,
    "z-index": e.sticky ? e.stickyZIndex : void 0
  }, {
    default: ue(() => [
      L(
        "div",
        He({
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
          L(
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
                  L(
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
              )) : X("v-if", !0)
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
const Jh = ee({
  name: m3,
  components: { MpSticky: yo },
  inheritAttrs: !1,
  props: Zh,
  setup(e) {
    const n = $("0px"), t = $("0px"), o = $("0px"), r = $("0px"), a = $(!1), i = $(null), l = O(() => e.active), s = O(() => e.activeColor), u = O(() => e.inactiveColor), c = O(() => e.disabledColor), d = O(() => e.vertical ? "vertical" : "horizontal"), p = O(() => e.itemVertical ? "vertical" : "horizontal"), f = O(() => e.itemVertical), h = $(null), v = O(() => e.indicatorPosition === "reverse" ? "-reverse" : ""), { tabList: y, bindTabList: w, length: k } = e3();
    w({
      active: l,
      activeColor: s,
      inactiveColor: u,
      disabledColor: c,
      itemVertical: f,
      resize: W,
      onTabClick: z
    }), pe(
      () => k.value,
      () => hp(this, null, function* () {
        yield bn(), W();
      })
    ), pe(() => [e.active, e.scrollable], W), Rt(W), nt(W);
    function z(T) {
      var B;
      const j = (B = T.name.value) != null ? B : T.index.value, { active: E, onChange: J, onClick: q } = e;
      S(e["onUpdate:active"], j), S(q, j), j !== E && S(J, j);
    }
    function I() {
      return y.find(({ name: T }) => e.active === T.value);
    }
    function P(T) {
      return y.find(({ index: B }) => (T ?? e.active) === B.value);
    }
    function M() {
      if (k.value === 0)
        return;
      const { active: T } = e;
      if (zn(T)) {
        const B = $n(T, 0, k.value - 1);
        return S(e["onUpdate:active"], B), P(B);
      }
    }
    function D() {
      a.value = e.scrollable === "always" || y.length >= 5;
    }
    function U({ element: T }) {
      const B = T.value;
      B && (e.vertical ? (t.value = `${B.offsetHeight}px`, r.value = `${B.offsetTop}px`) : (n.value = `${B.offsetWidth}px`, o.value = `${B.offsetLeft}px`));
    }
    function V({ element: T }) {
      if (!a.value)
        return;
      const B = i.value, j = T.value;
      if (e.vertical) {
        const E = j.offsetTop + j.offsetHeight / 2 - B.offsetHeight / 2;
        Lo(B, {
          top: E,
          animation: Sl
        });
      } else {
        const E = j.offsetLeft + j.offsetWidth / 2 - B.offsetWidth / 2;
        Lo(B, {
          left: E,
          animation: Sl
        });
      }
    }
    function W() {
      const T = I() || P() || M();
      !T || T.disabled.value || (D(), U(T), V(T));
    }
    function A() {
      return hp(this, null, function* () {
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
      Transition: Qe,
      toSizeUnit: Oe,
      n: f3,
      classes: v3,
      resize: W,
      variant: O(() => e.variant),
      vertical: O(() => e.vertical),
      layoutDirection: d,
      itemDirection: p,
      resizeSticky: A,
      formatElevation: dn
    };
  }
});
Jh.render = g3;
var Qi = Jh;
re(Qi);
ie(Qi, Zh);
const qI = Qi;
var Us = Qi;
const Qh = {
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
var h3 = (e, n, t) => new Promise((o, r) => {
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
const { name: b3, n: y3 } = x("tabs-items");
function w3(e, n) {
  const t = te("mp-swipe");
  return g(), we(t, {
    ref: "swipe",
    class: m(e.n()),
    loop: e.loop,
    duration: e.animated ? void 0 : 0,
    touchable: e.canSwipe,
    indicator: !1,
    onChange: e.handleSwipeChange
  }, {
    default: ue(() => [
      F(e.$slots, "default")
    ]),
    _: 3
    /* FORWARDED */
  }, 8, ["class", "loop", "duration", "touchable", "onChange"]);
}
const xh = ee({
  name: b3,
  components: { MpSwipe: qo },
  props: Qh,
  setup(e) {
    const n = $(null), { tabItemList: t, bindTabItem: o, length: r } = T4();
    o({}), pe(() => e.active, s), pe(
      () => r.value,
      () => h3(this, null, function* () {
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
      swipe: n,
      n: y3,
      handleSwipeChange: u,
      getSwipe: c
    };
  }
});
xh.render = w3;
var xi = xh;
re(xi);
ie(xi, Qh);
const XI = xi;
var js = xi;
const _h = {
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
var k3 = Object.defineProperty, $3 = Object.defineProperties, C3 = Object.getOwnPropertyDescriptors, bp = Object.getOwnPropertySymbols, S3 = Object.prototype.hasOwnProperty, z3 = Object.prototype.propertyIsEnumerable, yp = (e, n, t) => n in e ? k3(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t, P3 = (e, n) => {
  for (var t in n || (n = {}))
    S3.call(n, t) && yp(e, t, n[t]);
  if (bp)
    for (var t of bp(n))
      z3.call(n, t) && yp(e, t, n[t]);
  return e;
}, O3 = (e, n) => $3(e, C3(n));
function E3(e, n, t, o, r, a) {
  return g(), we(Qe, {
    name: o.n("$-fade"),
    persisted: ""
  }, {
    default: ue(() => [
      Ne(L(
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
          )) : X("v-if", !0),
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
          )) : X("v-if", !0)
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
const eb = /* @__PURE__ */ ee(O3(P3({}, {
  name: x("tag").name
}), {
  __name: "Tag",
  props: _h,
  emits: ["update:visible", "update:checked", "close", "check"],
  setup(e, { expose: n, emit: t }) {
    n();
    const { n: o, classes: r } = x("tag"), a = e, i = t, l = $(a.defaultVisible), s = $(a.defaultChecked), u = O(() => {
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
      const k = !c.value;
      s.value = k, i("update:checked", k), i("check", k, w);
    }
    const y = { n: o, classes: r, props: a, emit: i, innerVisible: l, innerChecked: s, computedVisible: u, computedChecked: c, computedVariant: d, rootClass: p, rootStyle: f, handleClose: h, handleClick: v, get MpIcon() {
      return Ze;
    } };
    return Object.defineProperty(y, "__isScriptSetup", { enumerable: !1, value: !0 }), y;
  }
}));
eb.render = E3;
var _i = eb;
re(_i);
ie(_i, _h);
const GI = _i;
var Hs = _i;
function Vu(e, n) {
  return Object.entries(e).reduce((t, [o, r]) => (t[o] = r.includes("px") ? r.replace(/(\d+(\.\d+)?)px/g, (a, i) => n(i)) : r, t), {});
}
var T3 = {
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
}, B3 = {
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
}, M3 = {
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
}, I3 = {
  "--mp-avatar-background-color": "#303030",
  "--mp-avatar-border": "2px solid #1e1e1e",
  "--mp-avatar-text-color": "#f5f5f5",
  "--mp-avatar-border-radius": "4px",
  "--mp-avatar-mini-size": "28px",
  "--mp-avatar-small-size": "36px",
  "--mp-avatar-normal-size": "48px",
  "--mp-avatar-large-size": "64px",
  "--mp-avatar-hover-transform": "scale(1.1)"
}, D3 = {
  "--mp-avatar-group-offset": "-10px"
}, A3 = {
  "--mp-back-top-right": "40px",
  "--mp-back-top-bottom": "40px",
  "--mp-back-top-button-size": "40px",
  "--mp-back-top-button-border-radius": "50%"
}, N3 = {
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
}, R3 = {
  "--mp-bottom-navigation-height": "50px",
  "--mp-bottom-navigation-variant-height": "66px",
  "--mp-bottom-navigation-z-index": "1",
  "--mp-bottom-navigation-background-color": "var(--mp-color-surface-container-high)",
  "--mp-bottom-navigation-border-color": "var(--mp-color-outline)",
  "--mp-bottom-navigation-fab-offset": "4px",
  "--mp-bottom-navigation-fab-border-radius": "50%"
}, L3 = {
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
}, V3 = {
  "--mp-breadcrumb-item-inactive-color": "#aaa",
  "--mp-breadcrumb-item-active-color": "var(--mp-color-primary)",
  "--mp-breadcrumb-item-separator-margin": "0 10px",
  "--mp-breadcrumb-item-separator-font-size": "14px"
}, F3 = {
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
}, U3 = {
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
}, j3 = {
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
}, H3 = {
  "--mp-checkbox-unchecked-color": "#fff",
  "--mp-checkbox-text-color": "#fff",
  "--mp-checkbox-checked-color": "var(--mp-color-primary)",
  "--mp-checkbox-disabled-color": "var(--mp-color-text-disabled)",
  "--mp-checkbox-error-color": "var(--mp-color-danger)",
  "--mp-checkbox-action-padding": "6px",
  "--mp-checkbox-icon-size": "24px"
}, Y3 = {
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
}, W3 = {
  "--mp-code-font-size": "14px",
  "--mp-code-line-height": "1.7"
}, K3 = {
  "--mp-collapse-text-color": "#fff",
  "--mp-collapse-background": "var(--mp-color-surface-container-highest)",
  "--mp-collapse-header-font-size": "var(--mp-font-size-lg)",
  "--mp-collapse-header-padding": "10px 12px",
  "--mp-collapse-content-font-size": "var(--mp-font-size-md)",
  "--mp-collapse-content-padding": "0 12px 10px",
  "--mp-collapse-item-margin-top": "16px",
  "--mp-collapse-disable-color": "#bdbdbd",
  "--mp-collapse-border-top": "thin solid var(--mp-color-outline)"
}, q3 = {
  "--mp-countdown-text-color": "var(--mp-color-text)",
  "--mp-countdown-text-font-size": "var(--mp-font-size-lg)"
}, X3 = {
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
}, G3 = {
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
}, Z3 = {
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
}, J3 = {
  "--mp-divider-text-color": "#aaa",
  "--mp-divider-color": "var(--mp-color-outline)",
  "--mp-divider-text-margin": "8px 0",
  "--mp-divider-text-padding": "0 8px",
  "--mp-divider-inset": "72px"
}, Q3 = {
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
}, x3 = {
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
}, _3 = {
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
}, eE = {
  "--mp-form-details-error-message-color": "var(--mp-color-danger)",
  "--mp-form-details-extra-message-color": "#888",
  "--mp-form-details-margin-top": "6px",
  "--mp-form-details-font-size": "12px",
  "--mp-form-details-message-margin-right": "4px"
}, nE = {
  "--mp-hover-overlay-opacity": "var(--mp-opacity-hover)",
  "--mp-hover-overlay-focusing-opacity": "var(--mp-opacity-focus)"
}, tE = {
  "--mp-icon-size": "20px"
}, oE = {
  "--mp-image-preview-swipe-indicators-text-color": "#ddd",
  "--mp-image-preview-swipe-indicators-padding": "16px 0",
  "--mp-image-preview-zoom-container-background": "#000",
  "--mp-image-preview-close-icon-top": "14px",
  "--mp-image-preview-close-icon-right": "14px",
  "--mp-image-preview-extra-top": "14px",
  "--mp-image-preview-extra-left": "14px",
  "--mp-image-preview-close-icon-size": "22px",
  "--mp-image-preview-close-icon-color": "#fff"
}, rE = {
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
}, aE = {
  "--mp-input-input-height": "24px",
  "--mp-input-input-font-size": "16px",
  "--mp-input-textarea-height": "auto"
}, iE = {
  "--mp-link-default-color": "#fff",
  "--mp-link-primary-color": "var(--mp-color-primary)",
  "--mp-link-danger-color": "var(--mp-color-danger)",
  "--mp-link-success-color": "var(--mp-color-success)",
  "--mp-link-warning-color": "var(--mp-color-warning)",
  "--mp-link-info-color": "var(--mp-color-info)",
  "--mp-link-disabled-color": "var(--mp-color-text-disabled)",
  "--mp-link-font-size": "var(--mp-font-size-md)",
  "--mp-link-focus-opacity": "0.8"
}, lE = {
  "--mp-list-loading-height": "50px",
  "--mp-list-finished-height": "50px",
  "--mp-list-error-height": "50px",
  "--mp-list-loading-color": "#888",
  "--mp-list-finished-color": "#888",
  "--mp-list-error-color": "#888",
  "--mp-list-loading-font-size": "var(--mp-font-size-md)",
  "--mp-list-finished-font-size": "var(--mp-font-size-md)",
  "--mp-list-error-font-size": "var(--mp-font-size-md)"
}, sE = {
  "--mp-loading-color": "var(--mp-color-primary)",
  "--mp-loading-opacity": "0.38",
  "--mp-loading-desc-margin": "8px 0 0",
  "--mp-loading-desc-color": "var(--mp-color-primary)"
}, uE = {
  "--mp-loading-bar-color": "var(--mp-color-primary)",
  "--mp-loading-bar-error-color": "var(--mp-color-danger)",
  "--mp-loading-bar-height": "3px"
}, cE = {
  "--mp-menu-background-color": "#272727",
  "--mp-menu-border-radius": "2px"
}, dE = {
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
}, pE = {
  "--mp-menu-select-menu-background-color": "#272727",
  "--mp-menu-select-menu-max-height": "278px",
  "--mp-menu-select-menu-padding": "0",
  "--mp-menu-select-menu-border-radius": "2px"
}, mE = {
  "--mp-option-text-color": "#fff",
  "--mp-option-height": "38px",
  "--mp-option-padding": "0 12px",
  "--mp-option-font-size": "16px",
  "--mp-option-selected-background": "var(--mp-field-decorator-focus-color)",
  "--mp-option-disabled-color": "var(--mp-color-text-disabled)"
}, fE = {
  "--mp-overlay-background-color": "rgba(0, 0, 0, 0.6)"
}, vE = {
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
}, gE = {
  "--mp-paper-background": "var(--mp-color-surface-container-highest)",
  "--mp-paper-border-radius": "4px"
}, hE = {
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
}, bE = {
  "--mp-popup-content-background-color": "var(--mp-color-surface-container-low)",
  "--mp-popup-overlay-background-color": "rgba(0, 0, 0, 0.6)"
}, yE = {
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
}, wE = {
  "--mp-pull-refresh-background": "#303030",
  "--mp-pull-refresh-size": "40px",
  "--mp-pull-refresh-color": "var(--mp-color-primary)",
  "--mp-pull-refresh-success-color": "var(--mp-color-success)",
  "--mp-pull-refresh-icon-size": "25px"
}, kE = {
  "--mp-radio-unchecked-color": "#fff",
  "--mp-radio-text-color": "#fff",
  "--mp-radio-checked-color": "var(--mp-color-primary)",
  "--mp-radio-disabled-color": "var(--mp-color-text-disabled)",
  "--mp-radio-error-color": "var(--mp-color-danger)",
  "--mp-radio-icon-size": "24px",
  "--mp-radio-action-padding": "6px"
}, $E = {
  "--mp-rate-color": "var(--mp-color-text)",
  "--mp-rate-size": "24px",
  "--mp-rate-disabled-color": "var(--mp-color-text-disabled)",
  "--mp-rate-error-color": "var(--mp-color-danger)",
  "--mp-rate-action-padding": "4px",
  "--mp-rate-primary-color": "var(--mp-color-primary)"
}, CE = {
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
}, SE = {
  "--mp-ripple-cubic-bezier": "cubic-bezier(0.68, 0.01, 0.62, 0.6)",
  "--mp-ripple-color": "currentColor"
}, zE = {
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
}, PE = {
  "--mp-signature-background-color": "var(--mp-color-surface-container-highest)",
  "--mp-signature-stroke-color": "#fff",
  "--mp-signature-height": "200px",
  "--mp-signature-border-radius": "4px"
}, OE = {
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
}, EE = {
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
}, TE = {
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
}, BE = {
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
}, ME = {
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
}, IE = {
  "--mp-swipe-indicator-color": "#fff",
  "--mp-swipe-indicators-offset": "10px",
  "--mp-swipe-indicator-offset": "4px",
  "--mp-swipe-navigation-z-index": "9",
  "--mp-swipe-navigation-button-width": "36px",
  "--mp-swipe-navigation-button-height": "36px",
  "--mp-swipe-navigation-button-border-radius": "50%",
  "--mp-swipe-navigation-icon-size": "20px",
  "--mp-swipe-navigation-prev-left": "8px",
  "--mp-swipe-navigation-next-right": "8px",
  "--mp-swipe-navigation-prev-top": "8px",
  "--mp-swipe-navigation-next-bottom": "8px"
}, DE = {
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
}, AE = {
  "--mp-tab-inactive-color": "rgba(255, 255, 255, .65)",
  "--mp-tab-padding": "12px",
  "--mp-tab-active-color": "var(--mp-color-primary)",
  "--mp-tab-disabled-color": "var(--mp-color-text-disabled)",
  "--mp-tab-font-size": "var(--mp-font-size-md)",
  "--mp-tab-font-weight": "400",
  "--mp-tab-active-font-size": "var(--mp-font-size-md)",
  "--mp-tab-active-font-weight": "400"
}, NE = {
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
}, RE = {
  "--mp-tabs-background": "#1e1e1e",
  "--mp-tabs-item-horizontal-height": "44px",
  "--mp-tabs-item-vertical-height": "66px",
  "--mp-tabs-radius": "2px",
  "--mp-tabs-padding": "12px",
  "--mp-tabs-indicator-size": "2px",
  "--mp-tabs-indicator-border-radius": "0",
  "--mp-tabs-indicator-background": "var(--mp-color-primary)",
  "--mp-tabs-indicator-inner-size": "100%"
}, LE = {
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
}, VE = {
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
}, FE = {
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
}, UE = {
  "--mp-watermark-content-color": "#ffffff"
}, jE = Object.defineProperty, wp = Object.getOwnPropertySymbols, HE = Object.prototype.hasOwnProperty, YE = Object.prototype.propertyIsEnumerable, kp = (e, n, t) => n in e ? jE(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t, he = (e, n) => {
  for (var t in n || (n = {}))
    HE.call(n, t) && kp(e, t, n[t]);
  if (wp)
    for (var t of wp(n))
      YE.call(n, t) && kp(e, t, n[t]);
  return e;
}, WE = he(he(he(he(he(he(he(he(he(he(he(he(he(he(he(he(he(he(he(he(he(he(he(he(he(he(he(he(he(he(he(he(he(he(he(he(he(he(he(he(he(he(he(he(he(he(he(he(he(he(he(he(he(he(he(he(he(he(he(he(he(he(he(he(he(he({
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
}, F3), B3), j3), U3), LE), G3), OE), RE), AE), bE), Z3), T3), Y3), N3), FE), K3), wE), DE), ME), vE), NE), x3), kE), H3), J3), hE), M3), L3), cE), CE), V3), I3), iE), yE), mE), UE), pE), dE), D3), A3), R3), q3), X3), Q3), _3), eE), nE), tE), oE), rE), aE), lE), sE), uE), fE), gE), $E), SE), EE), TE), BE), IE), VE), zE), W3), PE), KE = {
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
}, qE = {
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
}, XE = {
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
}, GE = {
  "--mp-avatar-text-color": "#000",
  "--mp-avatar-background-color": "var(--mp-color-primary)",
  "--mp-avatar-border-radius": "4px",
  "--mp-avatar-mini-size": "28px",
  "--mp-avatar-small-size": "36px",
  "--mp-avatar-normal-size": "48px",
  "--mp-avatar-large-size": "64px",
  "--mp-avatar-border": "2px solid #fff",
  "--mp-avatar-hover-transform": "scale(1.1)"
}, ZE = {
  "--mp-avatar-group-offset": "-10px"
}, JE = {
  "--mp-back-top-button-border-radius": "12px",
  "--mp-back-top-right": "40px",
  "--mp-back-top-bottom": "40px",
  "--mp-back-top-button-size": "40px"
}, QE = {
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
}, xE = {
  "--mp-bottom-navigation-background-color": "var(--mp-color-surface-container)",
  "--mp-bottom-navigation-height": "50px",
  "--mp-bottom-navigation-variant-height": "66px",
  "--mp-bottom-navigation-z-index": "1",
  "--mp-bottom-navigation-border-color": "var(--mp-color-outline)",
  "--mp-bottom-navigation-fab-offset": "4px",
  "--mp-bottom-navigation-fab-border-radius": "50%"
}, _E = {
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
}, e5 = {
  "--mp-breadcrumb-item-inactive-color": "var(--mp-color-on-surface-variant)",
  "--mp-breadcrumb-item-active-color": "var(--mp-color-primary)",
  "--mp-breadcrumb-item-separator-margin": "0 10px",
  "--mp-breadcrumb-item-separator-font-size": "14px"
}, n5 = {
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
}, t5 = {
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
}, o5 = {
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
}, r5 = {
  "--mp-checkbox-unchecked-color": "var(--mp-color-on-surface-variant)",
  "--mp-checkbox-text-color": "var(--mp-color-on-surface-variant)",
  "--mp-checkbox-checked-color": "var(--mp-color-primary)",
  "--mp-checkbox-disabled-color": "var(--mp-color-text-disabled)",
  "--mp-checkbox-error-color": "var(--mp-color-danger)",
  "--mp-checkbox-action-padding": "6px",
  "--mp-checkbox-icon-size": "24px"
}, a5 = {
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
}, i5 = {
  "--mp-code-font-size": "14px",
  "--mp-code-line-height": "1.7"
}, l5 = {
  "--mp-collapse-background": "var(--mp-color-surface-container-highest)",
  "--mp-collapse-text-color": "var(--mp-color-inverse-surface)",
  "--mp-collapse-header-font-size": "var(--mp-font-size-lg)",
  "--mp-collapse-header-padding": "10px 12px",
  "--mp-collapse-content-font-size": "var(--mp-font-size-md)",
  "--mp-collapse-content-padding": "0 12px 10px",
  "--mp-collapse-item-margin-top": "16px",
  "--mp-collapse-disable-color": "#bdbdbd",
  "--mp-collapse-border-top": "thin solid var(--mp-color-outline)"
}, s5 = {
  "--mp-countdown-text-color": "var(--mp-color-text)",
  "--mp-countdown-text-font-size": "var(--mp-font-size-lg)"
}, u5 = {
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
}, c5 = {
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
}, d5 = {
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
}, p5 = {
  "--mp-divider-text-color": "#aaa",
  "--mp-divider-color": "var(--mp-color-outline)",
  "--mp-divider-text-margin": "8px 0",
  "--mp-divider-text-padding": "0 8px",
  "--mp-divider-inset": "72px"
}, m5 = {
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
}, f5 = {
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
}, v5 = {
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
}, g5 = {
  "--mp-form-details-error-message-color": "var(--mp-color-danger)",
  "--mp-form-details-extra-message-color": "#888",
  "--mp-form-details-margin-top": "6px",
  "--mp-form-details-font-size": "12px",
  "--mp-form-details-message-margin-right": "4px"
}, h5 = {
  "--mp-hover-overlay-opacity": "var(--mp-opacity-hover)",
  "--mp-hover-overlay-focusing-opacity": "var(--mp-opacity-focus)"
}, b5 = {
  "--mp-icon-size": "20px"
}, y5 = {
  "--mp-image-preview-swipe-indicators-text-color": "#ddd",
  "--mp-image-preview-swipe-indicators-padding": "16px 0",
  "--mp-image-preview-zoom-container-background": "#000",
  "--mp-image-preview-close-icon-top": "14px",
  "--mp-image-preview-close-icon-right": "14px",
  "--mp-image-preview-extra-top": "14px",
  "--mp-image-preview-extra-left": "14px",
  "--mp-image-preview-close-icon-size": "22px",
  "--mp-image-preview-close-icon-color": "#fff"
}, w5 = {
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
}, k5 = {
  "--mp-input-input-height": "24px",
  "--mp-input-input-font-size": "16px",
  "--mp-input-textarea-height": "auto"
}, $5 = {
  "--mp-link-default-color": "#fff",
  "--mp-link-primary-color": "var(--mp-color-primary)",
  "--mp-link-danger-color": "var(--mp-color-danger)",
  "--mp-link-success-color": "var(--mp-color-success)",
  "--mp-link-warning-color": "var(--mp-color-warning)",
  "--mp-link-info-color": "var(--mp-color-info)",
  "--mp-link-disabled-color": "var(--mp-color-text-disabled)",
  "--mp-link-font-size": "var(--mp-font-size-md)",
  "--mp-link-focus-opacity": "0.8"
}, C5 = {
  "--mp-list-loading-height": "50px",
  "--mp-list-finished-height": "50px",
  "--mp-list-error-height": "50px",
  "--mp-list-loading-color": "#888",
  "--mp-list-finished-color": "#888",
  "--mp-list-error-color": "#888",
  "--mp-list-loading-font-size": "var(--mp-font-size-md)",
  "--mp-list-finished-font-size": "var(--mp-font-size-md)",
  "--mp-list-error-font-size": "var(--mp-font-size-md)"
}, S5 = {
  "--mp-loading-color": "var(--mp-color-primary)",
  "--mp-loading-opacity": "0.38",
  "--mp-loading-desc-margin": "8px 0 0",
  "--mp-loading-desc-color": "var(--mp-color-primary)"
}, z5 = {
  "--mp-loading-bar-color": "var(--mp-color-primary)",
  "--mp-loading-bar-error-color": "var(--mp-color-danger)",
  "--mp-loading-bar-height": "3px"
}, P5 = {
  "--mp-menu-background-color": "var(--mp-color-surface-container)",
  "--mp-menu-border-radius": "4px"
}, O5 = {
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
}, E5 = {
  "--mp-menu-select-menu-background-color": "var(--mp-color-surface-container)",
  "--mp-menu-select-menu-border-radius": "4px",
  "--mp-menu-select-menu-max-height": "278px",
  "--mp-menu-select-menu-padding": "0"
}, T5 = {
  "--mp-option-text-color": "var(--mp-color-inverse-surface)",
  "--mp-option-height": "38px",
  "--mp-option-padding": "0 12px",
  "--mp-option-font-size": "16px",
  "--mp-option-selected-background": "var(--mp-field-decorator-focus-color)",
  "--mp-option-disabled-color": "var(--mp-color-text-disabled)"
}, B5 = {
  "--mp-overlay-background-color": "rgba(0, 0, 0, 0.6)"
}, M5 = {
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
}, I5 = {
  "--mp-paper-background": "var(--mp-color-surface-container-highest)",
  "--mp-paper-border-radius": "12px"
}, D5 = {
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
}, A5 = {
  "--mp-popup-content-background-color": "var(--mp-color-surface-container-high)",
  "--mp-popup-overlay-background-color": "rgba(0, 0, 0, 0.6)"
}, N5 = {
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
}, R5 = {
  "--mp-pull-refresh-background": "var(--mp-color-surface-container-highest)",
  "--mp-pull-refresh-size": "40px",
  "--mp-pull-refresh-color": "var(--mp-color-primary)",
  "--mp-pull-refresh-success-color": "var(--mp-color-success)",
  "--mp-pull-refresh-icon-size": "25px"
}, L5 = {
  "--mp-radio-unchecked-color": "var(--mp-color-on-surface-variant)",
  "--mp-radio-text-color": "var(--mp-color-on-surface-variant)",
  "--mp-radio-checked-color": "var(--mp-color-primary)",
  "--mp-radio-disabled-color": "var(--mp-color-text-disabled)",
  "--mp-radio-error-color": "var(--mp-color-danger)",
  "--mp-radio-icon-size": "24px",
  "--mp-radio-action-padding": "6px"
}, V5 = {
  "--mp-rate-color": "var(--mp-color-on-surface-variant)",
  "--mp-rate-size": "24px",
  "--mp-rate-disabled-color": "var(--mp-color-text-disabled)",
  "--mp-rate-error-color": "var(--mp-color-danger)",
  "--mp-rate-action-padding": "4px",
  "--mp-rate-primary-color": "var(--mp-color-primary)"
}, F5 = {
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
}, U5 = {
  "--mp-ripple-cubic-bezier": "cubic-bezier(0.68, 0.01, 0.62, 0.6)",
  "--mp-ripple-color": "currentColor"
}, j5 = {
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
}, H5 = {
  "--mp-signature-background-color": "var(--mp-color-surface-container-highest)",
  "--mp-signature-stroke-color": "var(--mp-color-inverse-surface)",
  "--mp-signature-height": "200px",
  "--mp-signature-border-radius": "12px"
}, Y5 = {
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
}, W5 = {
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
}, K5 = {
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
}, q5 = {
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
}, X5 = {
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
}, G5 = {
  "--mp-swipe-indicator-color": "#fff",
  "--mp-swipe-indicators-offset": "10px",
  "--mp-swipe-indicator-offset": "4px",
  "--mp-swipe-navigation-z-index": "9",
  "--mp-swipe-navigation-button-width": "36px",
  "--mp-swipe-navigation-button-height": "36px",
  "--mp-swipe-navigation-button-border-radius": "50%",
  "--mp-swipe-navigation-icon-size": "20px",
  "--mp-swipe-navigation-prev-left": "8px",
  "--mp-swipe-navigation-next-right": "8px",
  "--mp-swipe-navigation-prev-top": "8px",
  "--mp-swipe-navigation-next-bottom": "8px"
}, Z5 = {
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
}, J5 = {
  "--mp-tab-inactive-color": "var(--mp-color-on-surface-variant)",
  "--mp-tab-padding": "12px",
  "--mp-tab-active-color": "var(--mp-color-primary)",
  "--mp-tab-disabled-color": "var(--mp-color-text-disabled)",
  "--mp-tab-font-size": "var(--mp-font-size-md)",
  "--mp-tab-font-weight": "400",
  "--mp-tab-active-font-size": "var(--mp-font-size-md)",
  "--mp-tab-active-font-weight": "400"
}, Q5 = {
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
}, x5 = {
  "--mp-tabs-background": "var(--mp-color-body)",
  "--mp-tabs-item-horizontal-height": "44px",
  "--mp-tabs-item-vertical-height": "66px",
  "--mp-tabs-radius": "2px",
  "--mp-tabs-padding": "12px",
  "--mp-tabs-indicator-size": "2px",
  "--mp-tabs-indicator-border-radius": "0",
  "--mp-tabs-indicator-background": "var(--mp-color-primary)",
  "--mp-tabs-indicator-inner-size": "100%"
}, _5 = {
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
}, eT = {
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
}, nT = {
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
}, tT = {
  "--mp-watermark-content-color": "#ffffff"
}, oT = Object.defineProperty, $p = Object.getOwnPropertySymbols, rT = Object.prototype.hasOwnProperty, aT = Object.prototype.propertyIsEnumerable, Cp = (e, n, t) => n in e ? oT(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t, be = (e, n) => {
  for (var t in n || (n = {}))
    rT.call(n, t) && Cp(e, t, n[t]);
  if ($p)
    for (var t of $p(n))
      aT.call(n, t) && Cp(e, t, n[t]);
  return e;
}, iT = be(be(be(be(be(be(be(be(be(be(be(be(be(be(be(be(be(be(be(be(be(be(be(be(be(be(be(be(be(be(be(be(be(be(be(be(be(be(be(be(be(be(be(be(be(be(be(be(be(be(be(be(be(be(be(be(be(be(be(be(be(be(be(be(be(be({
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
}, n5), qE), h5), P5), E5), O5), m5), e5), $5), o5), I5), GE), f5), r5), L5), t5), a5), QE), eT), N5), x5), J5), X5), p5), Q5), M5), tT), l5), F5), XE), xE), _E), K5), KE), d5), R5), A5), D5), v5), JE), j5), T5), u5), Z5), W5), nT), _5), c5), V5), Y5), ZE), s5), g5), b5), y5), w5), k5), C5), S5), z5), B5), U5), q5), G5), i5), H5), lT = {
  "--mp-action-sheet-background": "var(--mp-color-surface-container-high)",
  "--mp-action-sheet-title-color": "var(--mp-color-on-surface-variant)",
  "--mp-action-sheet-action-item-color": "#1D1B20",
  "--mp-action-sheet-border-radius": "0px"
}, sT = {
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
}, uT = {
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
}, cT = {
  "--mp-avatar-text-color": "#fff",
  "--mp-avatar-background-color": "var(--mp-color-primary)"
}, dT = {
  "--mp-avatar-group-offset": "-10px"
}, pT = {
  "--mp-back-top-button-border-radius": "12px",
  "--mp-back-top-right": "40px",
  "--mp-back-top-bottom": "40px",
  "--mp-back-top-button-size": "40px"
}, mT = {
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
}, fT = {
  "--mp-bottom-navigation-background-color": "var(--mp-color-surface-container)",
  "--mp-bottom-navigation-fab-border-radius": "12px",
  "--mp-bottom-navigation-height": "50px",
  "--mp-bottom-navigation-variant-height": "66px",
  "--mp-bottom-navigation-z-index": "1",
  "--mp-bottom-navigation-border-color": "var(--mp-color-outline)",
  "--mp-bottom-navigation-fab-offset": "4px"
}, vT = {
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
}, gT = {
  "--mp-breadcrumb-item-inactive-color": "var(--mp-color-on-surface-variant)",
  "--mp-breadcrumb-item-active-color": "var(--mp-color-primary)",
  "--mp-breadcrumb-item-separator-margin": "0 10px",
  "--mp-breadcrumb-item-separator-font-size": "14px"
}, hT = {
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
}, bT = {
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
}, yT = {
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
}, wT = {
  "--mp-checkbox-unchecked-color": "var(--mp-color-on-surface-variant)",
  "--mp-checkbox-text-color": "var(--mp-color-on-surface-variant)",
  "--mp-checkbox-checked-color": "var(--mp-color-primary)",
  "--mp-checkbox-disabled-color": "var(--mp-color-text-disabled)",
  "--mp-checkbox-error-color": "var(--mp-color-danger)",
  "--mp-checkbox-action-padding": "6px",
  "--mp-checkbox-icon-size": "24px"
}, kT = {
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
}, $T = {
  "--mp-code-font-size": "14px",
  "--mp-code-line-height": "1.7"
}, CT = {
  "--mp-collapse-background": "var(--mp-color-surface-container-low)",
  "--mp-collapse-text-color": "#1D1B20",
  "--mp-collapse-header-font-size": "var(--mp-font-size-lg)",
  "--mp-collapse-header-padding": "10px 12px",
  "--mp-collapse-content-font-size": "var(--mp-font-size-md)",
  "--mp-collapse-content-padding": "0 12px 10px",
  "--mp-collapse-item-margin-top": "16px",
  "--mp-collapse-disable-color": "#bdbdbd",
  "--mp-collapse-border-top": "thin solid var(--mp-color-outline)"
}, ST = {
  "--mp-countdown-text-color": "var(--mp-color-text)",
  "--mp-countdown-text-font-size": "var(--mp-font-size-lg)"
}, zT = {
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
}, PT = {
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
}, OT = {
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
}, ET = {
  "--mp-divider-color": "var(--mp-color-outline)",
  "--mp-divider-text-color": "#888",
  "--mp-divider-text-margin": "8px 0",
  "--mp-divider-text-padding": "0 8px",
  "--mp-divider-inset": "72px"
}, TT = {
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
}, BT = {
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
}, MT = {
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
}, IT = {
  "--mp-form-details-error-message-color": "var(--mp-color-danger)",
  "--mp-form-details-extra-message-color": "#888",
  "--mp-form-details-margin-top": "6px",
  "--mp-form-details-font-size": "12px",
  "--mp-form-details-message-margin-right": "4px"
}, DT = {
  "--mp-hover-overlay-opacity": "var(--mp-opacity-hover)",
  "--mp-hover-overlay-focusing-opacity": "var(--mp-opacity-focus)"
}, AT = {
  "--mp-icon-size": "20px"
}, NT = {
  "--mp-image-preview-swipe-indicators-text-color": "#ddd",
  "--mp-image-preview-swipe-indicators-padding": "16px 0",
  "--mp-image-preview-zoom-container-background": "#000",
  "--mp-image-preview-close-icon-top": "14px",
  "--mp-image-preview-close-icon-right": "14px",
  "--mp-image-preview-extra-top": "14px",
  "--mp-image-preview-extra-left": "14px",
  "--mp-image-preview-close-icon-size": "22px",
  "--mp-image-preview-close-icon-color": "#fff"
}, RT = {
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
}, LT = {
  "--mp-input-input-height": "24px",
  "--mp-input-input-font-size": "16px",
  "--mp-input-textarea-height": "auto"
}, VT = {
  "--mp-link-default-color": "#000",
  "--mp-link-primary-color": "var(--mp-color-primary)",
  "--mp-link-danger-color": "var(--mp-color-danger)",
  "--mp-link-success-color": "var(--mp-color-success)",
  "--mp-link-warning-color": "var(--mp-color-warning)",
  "--mp-link-info-color": "var(--mp-color-info)",
  "--mp-link-disabled-color": "var(--mp-color-text-disabled)",
  "--mp-link-font-size": "var(--mp-font-size-md)",
  "--mp-link-focus-opacity": "0.8"
}, FT = {
  "--mp-list-loading-height": "50px",
  "--mp-list-finished-height": "50px",
  "--mp-list-error-height": "50px",
  "--mp-list-loading-color": "#888",
  "--mp-list-finished-color": "#888",
  "--mp-list-error-color": "#888",
  "--mp-list-loading-font-size": "var(--mp-font-size-md)",
  "--mp-list-finished-font-size": "var(--mp-font-size-md)",
  "--mp-list-error-font-size": "var(--mp-font-size-md)"
}, UT = {
  "--mp-loading-color": "var(--mp-color-primary)",
  "--mp-loading-opacity": "0.38",
  "--mp-loading-desc-margin": "8px 0 0",
  "--mp-loading-desc-color": "var(--mp-color-primary)"
}, jT = {
  "--mp-loading-bar-color": "var(--mp-color-primary)",
  "--mp-loading-bar-error-color": "var(--mp-color-danger)",
  "--mp-loading-bar-height": "3px"
}, HT = {
  "--mp-menu-background-color": "var(--mp-color-surface-container)",
  "--mp-menu-border-radius": "4px"
}, YT = {
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
}, WT = {
  "--mp-menu-select-menu-background-color": "var(--mp-color-surface-container)",
  "--mp-menu-select-menu-border-radius": "4px",
  "--mp-menu-select-menu-max-height": "278px",
  "--mp-menu-select-menu-padding": "0"
}, KT = {
  "--mp-option-text-color": "#1D1B20",
  "--mp-option-height": "38px",
  "--mp-option-padding": "0 12px",
  "--mp-option-font-size": "16px",
  "--mp-option-selected-background": "var(--mp-field-decorator-focus-color)",
  "--mp-option-disabled-color": "var(--mp-color-text-disabled)"
}, qT = {
  "--mp-overlay-background-color": "rgba(0, 0, 0, 0.6)"
}, XT = {
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
}, GT = {
  "--mp-paper-background": "var(--mp-color-surface-container-low)",
  "--mp-paper-border-radius": "12px"
}, ZT = {
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
}, JT = {
  "--mp-popup-content-background-color": "var(--mp-color-surface-container-high)",
  "--mp-popup-overlay-background-color": "rgba(0, 0, 0, 0.6)"
}, QT = {
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
}, xT = {
  "--mp-pull-refresh-background": "var(--mp-color-body)",
  "--mp-pull-refresh-size": "40px",
  "--mp-pull-refresh-color": "var(--mp-color-primary)",
  "--mp-pull-refresh-success-color": "var(--mp-color-success)",
  "--mp-pull-refresh-icon-size": "25px"
}, _T = {
  "--mp-radio-unchecked-color": "var(--mp-color-on-surface-variant)",
  "--mp-radio-text-color": "var(--mp-color-on-surface-variant)",
  "--mp-radio-checked-color": "var(--mp-color-primary)",
  "--mp-radio-disabled-color": "var(--mp-color-text-disabled)",
  "--mp-radio-error-color": "var(--mp-color-danger)",
  "--mp-radio-icon-size": "24px",
  "--mp-radio-action-padding": "6px"
}, eB = {
  "--mp-rate-color": "var(--mp-color-on-surface-variant)",
  "--mp-rate-size": "24px",
  "--mp-rate-disabled-color": "var(--mp-color-text-disabled)",
  "--mp-rate-error-color": "var(--mp-color-danger)",
  "--mp-rate-action-padding": "4px",
  "--mp-rate-primary-color": "var(--mp-color-primary)"
}, nB = {
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
}, tB = {
  "--mp-ripple-cubic-bezier": "cubic-bezier(0.68, 0.01, 0.62, 0.6)",
  "--mp-ripple-color": "currentColor"
}, oB = {
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
}, rB = {
  "--mp-signature-background-color": "var(--mp-color-surface-container-low)",
  "--mp-signature-stroke-color": "#1D1B20",
  "--mp-signature-height": "200px",
  "--mp-signature-border-radius": "12px"
}, aB = {
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
}, iB = {
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
}, lB = {
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
}, sB = {
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
}, uB = {
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
}, cB = {
  "--mp-swipe-indicator-color": "#fff",
  "--mp-swipe-indicators-offset": "10px",
  "--mp-swipe-indicator-offset": "4px",
  "--mp-swipe-navigation-z-index": "9",
  "--mp-swipe-navigation-button-width": "36px",
  "--mp-swipe-navigation-button-height": "36px",
  "--mp-swipe-navigation-button-border-radius": "50%",
  "--mp-swipe-navigation-icon-size": "20px",
  "--mp-swipe-navigation-prev-left": "8px",
  "--mp-swipe-navigation-next-right": "8px",
  "--mp-swipe-navigation-prev-top": "8px",
  "--mp-swipe-navigation-next-bottom": "8px"
}, dB = {
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
}, pB = {
  "--mp-tab-inactive-color": "var(--mp-color-on-surface-variant)",
  "--mp-tab-padding": "12px",
  "--mp-tab-active-color": "var(--mp-color-primary)",
  "--mp-tab-disabled-color": "var(--mp-color-text-disabled)",
  "--mp-tab-font-size": "var(--mp-font-size-md)",
  "--mp-tab-font-weight": "400",
  "--mp-tab-active-font-size": "var(--mp-font-size-md)",
  "--mp-tab-active-font-weight": "400"
}, mB = {
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
}, fB = {
  "--mp-tabs-background": "var(--mp-color-body)",
  "--mp-tabs-item-horizontal-height": "44px",
  "--mp-tabs-item-vertical-height": "66px",
  "--mp-tabs-radius": "2px",
  "--mp-tabs-padding": "12px",
  "--mp-tabs-indicator-size": "2px",
  "--mp-tabs-indicator-border-radius": "0",
  "--mp-tabs-indicator-background": "var(--mp-color-primary)",
  "--mp-tabs-indicator-inner-size": "100%"
}, vB = {
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
}, gB = {
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
}, hB = {
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
}, bB = {
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
}, yB = {
  "--mp-watermark-content-color": "#808080"
}, wB = Object.defineProperty, Sp = Object.getOwnPropertySymbols, kB = Object.prototype.hasOwnProperty, $B = Object.prototype.propertyIsEnumerable, zp = (e, n, t) => n in e ? wB(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t, ge = (e, n) => {
  for (var t in n || (n = {}))
    kB.call(n, t) && zp(e, t, n[t]);
  if (Sp)
    for (var t of Sp(n))
      $B.call(n, t) && zp(e, t, n[t]);
  return e;
}, CB = ge(ge(ge(ge(ge(ge(ge(ge(ge(ge(ge(ge(ge(ge(ge(ge(ge(ge(ge(ge(ge(ge(ge(ge(ge(ge(ge(ge(ge(ge(ge(ge(ge(ge(ge(ge(ge(ge(ge(ge(ge(ge(ge(ge(ge(ge(ge(ge(ge(ge(ge(ge(ge(ge(ge(ge(ge(ge(ge(ge(ge(ge(ge(ge(ge(ge(ge({
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
}, hT), sT), DT), HT), WT), YT), TT), gT), VT), yT), GT), cT), BT), wT), _T), bT), kT), hB), fB), pB), mB), vB), CT), nB), fT), vT), lB), lT), OT), xT), JT), ZT), MT), pT), oB), KT), iB), bB), gB), PT), dB), eB), dT), mT), ST), zT), ET), IT), AT), NT), RT), LT), FT), UT), jT), qT), XT), QT), tB), aB), sB), uB), cB), yB), uT), $T), rB);
function SB(e, n = {}) {
  const { rootFontSize: t = 16, unitPrecision: o = 6 } = n;
  return Vu(e, (r) => `${Number((r / t).toFixed(o))}rem`);
}
function zB(e, n = {}) {
  const { viewportWidth: t = 375, viewportUnit: o = "vmin", unitPrecision: r = 6 } = n;
  return Vu(e, (a) => `${Number((a / t * 100).toFixed(r))}${o}`);
}
const PB = { dark: WE, md3Light: CB, md3Dark: iT, toViewport: zB, toRem: SB, convert: Vu }, ZI = null;
var Ys = PB;
const Yn = ["12", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"], En = ["00", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"], Pp = ["00", "05", "10", "15", "20", "25", "30", "35", "40", "45", "50", "55"], nb = {
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
}, tb = (e, n) => e === "24hr" || n === "am", Fu = (e, n, t) => {
  const o = Yn.findIndex((a) => Y(a) === Y(t)), r = tb(e, n) ? t : En[o];
  return {
    hourStr: r,
    hourNum: Y(r)
  };
}, In = (e) => {
  const [n, t, o] = e.split(":");
  return {
    hour: Y(n),
    minute: Y(t),
    second: Y(o)
  };
}, ob = (e) => {
  var n, t;
  const { time: o, format: r, ampm: a, hour: i, max: l, min: s, disableHour: u } = e, { hourStr: c, hourNum: d } = Fu(r, a, i);
  let p = !1, f = !1;
  if (u.includes(c))
    return !0;
  if (l && !s) {
    const { hour: h, minute: v } = In(l);
    p = h === d && o > v;
  }
  if (!l && s) {
    const { hour: h, minute: v } = In(s);
    p = h === d && o < v;
  }
  if (l && s) {
    const { hour: h, minute: v } = In(l), { hour: y, minute: w } = In(s);
    p = y === d && o < w || h === d && o > v;
  }
  return (n = e.allowedTime) != null && n.minutes && (f = (t = e.allowedTime) == null ? void 0 : t.minutes(o)), p || f;
}, rb = (e) => {
  var n, t;
  const { time: o, format: r, ampm: a, hour: i, minute: l, max: s, min: u, disableHour: c } = e, { hourStr: d, hourNum: p } = Fu(r, a, i);
  let f = !1, h = !1;
  if (c.includes(d))
    return !0;
  if (s && !u) {
    const { hour: v, minute: y, second: w } = In(s);
    f = v === p && y < l || y === l && o > w;
  }
  if (!s && u) {
    const { hour: v, minute: y, second: w } = In(u);
    f = v === p && y > l || y === l && o > w;
  }
  if (s && u) {
    const { hour: v, minute: y, second: w } = In(s), { hour: k, minute: b, second: z } = In(u);
    f = v === p && y < l || k === p && b > l || v === p && y === l && o > w || k === p && b === l && o < z;
  }
  return (n = e.allowedTime) != null && n.seconds && (h = (t = e.allowedTime) == null ? void 0 : t.seconds(o)), f || h;
}, { n: OB, classes: EB } = x("time-picker");
function TB(e, n) {
  return g(), C(
    "div",
    {
      class: m(e.n("clock"))
    },
    [
      L(
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
        Me,
        null,
        Ke(e.timeScales, (t, o) => (g(), C(
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
            Me,
            null,
            Ke(e.hours24, (t, o) => (g(), C(
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
      )) : X("v-if", !0)
    ],
    2
    /* CLASS */
  );
}
const ab = ee({
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
    const t = $(null), o = $([]), r = $([]), a = O(() => ({
      transform: `rotate(${Y(e.rad)}deg)`,
      height: e.isInner && e.type === "hour" ? "calc(50% - 40px)" : "calc(50% - 4px)",
      backgroundColor: u(),
      borderColor: u()
    })), i = O(() => {
      if (e.rad === void 0)
        return;
      const v = e.rad / 30;
      return v >= 0 ? v : v + 12;
    }), l = O(() => e.type === "hour" ? Yn : Pp), s = (v, y) => {
      v = v ?? (e.type === "minute" ? e.time.minute : e.time.second);
      const w = e.type === "minute" ? ob : rb, k = {
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
      return y && e.type === "minute" && Reflect.deleteProperty(k, "minute"), w(k);
    }, u = () => {
      if (i.value === void 0)
        return e.color;
      const v = e.isInner ? En[i.value] : l.value[i.value];
      return l.value === Pp ? s() ? "var(--mp-time-picker-clock-item-disable-background)" : e.color : d(v) ? "var(--mp-time-picker-clock-item-disable-background)" : e.color;
    }, c = (v, y) => y ? i.value === v && e.isInner : i.value === v && (!e.isInner || e.type !== "hour"), d = (v) => {
      if (e.type === "hour") {
        if (tb(e.format, e.ampm))
          return o.value.includes(v);
        const y = Yn.findIndex((w) => w === v);
        return r.value.includes(y);
      }
      return s(v, !0);
    }, p = (v, y, w) => {
      const k = 2 * Math.PI / 12 * v - Math.PI / 2, b = 50 * (1 + Math.cos(k)), z = 50 * (1 + Math.sin(k)), I = () => c(v, w) ? d(y) ? {
        backgroundColor: "var(--mp-time-picker-clock-item-disable-background)",
        color: "var(--mp-time-picker-clock-item-disable-color)"
      } : {
        backgroundColor: e.color,
        color: void 0
      } : {
        backgroundColor: void 0,
        color: void 0
      }, { backgroundColor: P, color: M } = I();
      return {
        left: `${b}%`,
        top: `${z}%`,
        backgroundColor: P,
        color: M
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
      return Zt(v[i.value], 2, "0");
    };
    return pe([i, () => e.isInner], ([v, y], [w, k]) => {
      if (v === w && y === k || e.type !== "hour" || i.value === void 0)
        return;
      const z = y ? En[i.value] : h(), I = e.useSeconds ? `:${e.time.second}` : "", P = `${z}:${e.time.minute}${I}`;
      e.preventNextUpdate || n("update", P), n("change-prevent-update");
    }), pe(
      () => e.rad,
      (v, y) => {
        if (e.type === "hour" || v === void 0 || y === void 0)
          return;
        const w = v / 6 >= 0 ? v / 6 : v / 6 + 60, k = y / 6 >= 0 ? y / 6 : y / 6 + 60;
        if (w === k)
          return;
        let b;
        const { hourStr: z } = Fu(e.format, e.ampm, e.time.hour);
        if (e.type === "minute") {
          const I = ce().minute(w).format("mm"), P = e.useSeconds ? `:${e.time.second}` : "";
          b = `${z}:${I}${P}`;
        }
        if (e.type === "second") {
          const I = ce().second(w).format("ss"), P = e.useSeconds ? `:${I}` : "";
          b = `${z}:${e.time.minute}${P}`;
        }
        n("update", b);
      }
    ), pe(
      [() => e.max, () => e.min, () => e.allowedTime],
      ([v, y, w]) => {
        if (o.value = [], v && !y) {
          const { hour: k } = In(v), b = Yn.filter((I) => Y(I) > k), z = En.filter((I) => Y(I) > k);
          o.value = [...b, ...z];
        }
        if (!v && y) {
          const { hour: k } = In(y), b = Yn.filter((I) => Y(I) < k), z = En.filter((I) => Y(I) < k);
          o.value = [...b, ...z];
        }
        if (v && y) {
          const { hour: k } = In(v), { hour: b } = In(y), z = Yn.filter((P) => Y(P) < b || Y(P) > k), I = En.filter((P) => Y(P) < b || Y(P) > k);
          o.value = [...z, ...I];
        }
        if (w != null && w.hours) {
          const { hours: k } = w, b = Yn.filter((I) => !k(Y(I))), z = En.filter((I) => !k(Y(I)));
          o.value = [.../* @__PURE__ */ new Set([...o.value, ...b, ...z])];
        }
        r.value = o.value.map((k) => En.findIndex((b) => k === b)).filter((k) => k >= 0);
      },
      { immediate: !0, deep: !0 }
    ), {
      n: OB,
      classes: EB,
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
ab.render = TB;
var BB = ab;
const { name: MB, n: IB, classes: DB } = x("time-picker");
function AB(e, n) {
  var t;
  const o = te("clock");
  return g(), C(
    "div",
    {
      ref: "picker",
      class: m(e.classes(e.n(), e.formatElevation(e.elevation, 2)))
    },
    [
      L(
        "div",
        {
          class: m(e.n("title")),
          style: G({ background: e.titleColor || e.color })
        },
        [
          L(
            "div",
            {
              class: m(e.n("title-hint"))
            },
            se((t = e.hint) != null ? t : (e.pt ? e.pt : e.t)("timePickerHint")),
            3
            /* TEXT, CLASS */
          ),
          L(
            "div",
            {
              class: m(e.n("title-time-container"))
            },
            [
              L(
                "div",
                {
                  class: m(e.n("title-time"))
                },
                [
                  L(
                    "div",
                    {
                      class: m(e.classes(e.n("title-btn"), [e.type === "hour", e.n("title-btn--active")])),
                      onClick: n[0] || (n[0] = (r) => e.checkPanel("hour"))
                    },
                    se(e.time.hour),
                    3
                    /* TEXT, CLASS */
                  ),
                  L(
                    "span",
                    {
                      class: m(e.n("title-splitter"))
                    },
                    ":",
                    2
                    /* CLASS */
                  ),
                  L(
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
                  )) : X("v-if", !0),
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
                  )) : X("v-if", !0)
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
                  L(
                    "div",
                    {
                      class: m(e.classes(e.n("title-btn"), [e.ampm === "am", e.n("title-btn--active")])),
                      onClick: n[3] || (n[3] = (r) => e.checkAmpm("am"))
                    },
                    " AM ",
                    2
                    /* CLASS */
                  ),
                  L(
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
              )) : X("v-if", !0)
            ],
            2
            /* CLASS */
          )
        ],
        6
        /* CLASS, STYLE */
      ),
      L(
        "div",
        {
          class: m(e.n("body"))
        },
        [
          L(
            "div",
            {
              ref: "container",
              class: m(e.n("clock-container")),
              onTouchstart: n[5] || (n[5] = (...r) => e.moveHand && e.moveHand(...r)),
              onTouchmove: n[6] || (n[6] = (...r) => e.moveHand && e.moveHand(...r)),
              onTouchend: n[7] || (n[7] = (...r) => e.end && e.end(...r))
            },
            [
              Z(Qe, {
                name: `${e.n()}-panel-fade`
              }, {
                default: ue(() => [
                  (g(), we(o, {
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
      )) : X("v-if", !0)
    ],
    2
    /* CLASS */
  );
}
const ib = ee({
  name: MB,
  components: { Clock: BB },
  props: nb,
  setup(e) {
    const n = $(null), t = $(null), o = $(null), r = $(!1), a = $(!1), i = $(!1), l = $(!1), s = $(!1), u = $(!1), c = $(!1), d = $(0), p = $(0), f = $(), h = $("hour"), v = $("am"), y = $({
      hour: "00",
      minute: "00",
      second: "00"
    }), w = en({
      x: 0,
      y: 0
    }), k = en({
      x: [],
      y: []
    }), b = O(() => h.value === "hour" ? f.value : h.value === "minute" ? d.value : p.value), { t: z } = lt();
    pe(
      () => e.modelValue,
      (H) => {
        if (H === void 0 || H === "") {
          I();
          return;
        }
        const { hour: Q, minute: ae, second: ve } = In(H), N = ce().hour(Q).format("hh"), K = ce().hour(Q).format("HH"), me = ce().minute(ae).format("mm"), Se = ce().second(ve).format("ss");
        f.value = (N === "12" ? 0 : Y(N)) * 30, d.value = Y(me) * 6, p.value = Y(Se) * 6, y.value = A(H), e.format !== "24hr" && (v.value = Zt(`${Q}`, 2, "0") === K && En.includes(K) ? "pm" : "am"), r.value = e.format === "24hr" && En.includes(K);
      },
      { immediate: !0 }
    );
    function I() {
      f.value = void 0, d.value = 0, p.value = 0, y.value = {
        hour: "00",
        minute: "00",
        second: "00"
      }, v.value = "am";
    }
    function P(H) {
      S(e["onUpdate:modelValue"], H), S(e.onChange, H);
    }
    function M(H) {
      return H * 57.29577951308232;
    }
    function D(H) {
      l.value = !1, c.value = !1, h.value = H;
    }
    function U(H) {
      const { disableHour: Q } = o.value, ae = Yn.findIndex((K) => Y(K) === Y(y.value.hour)), ve = H === "am" ? Yn : En;
      return [...ve.slice(ae), ...ve.slice(0, ae)].find((K, me) => (a.value = me !== 0, !Q.includes(K)));
    }
    function V(H) {
      if (e.readonly)
        return;
      v.value = H;
      const Q = U(H);
      if (!Q)
        return;
      const ae = e.useSeconds ? `:${y.value.second}` : "", ve = `${Zt(Q, 2, "0")}:${y.value.minute}${ae}`;
      P(ve);
    }
    function W(H, Q) {
      const ae = H >= k.x[0] && H <= k.x[1], ve = Q >= k.y[0] && Q <= k.y[1];
      return ae && ve;
    }
    function A(H) {
      const Q = e.format === "24hr" ? "HH" : "hh", { hour: ae, minute: ve, second: N } = In(H);
      return {
        hour: ce().hour(ae).format(Q),
        minute: ce().minute(ve).format("mm"),
        second: ce().second(N).format("ss")
      };
    }
    function T(H) {
      const Q = H / 30;
      return Q >= 0 ? Q : Q + 12;
    }
    function B() {
      const { width: H, height: Q } = o.value.getSize(), ae = w.x - H / 2 - 8, ve = w.x + H / 2 + 8, N = w.y - Q / 2 - 8, K = w.y + Q / 2 + 8;
      return {
        rangeXMin: ae,
        rangeXMax: ve,
        rangeYMin: N,
        rangeYMax: K
      };
    }
    function j(H, Q, ae) {
      const { disableHour: ve } = o.value;
      i.value = W(H, Q);
      const N = Math.round(ae / 30) * 30 + 90, K = T(N), me = r.value ? Yn[K] : En[K];
      if (ve.includes(me) || (r.value = e.format === "24hr" ? W(H, Q) : !1), r.value !== i.value)
        return;
      const Se = r.value || v.value === "pm" ? En[K] : Yn[K];
      u.value = ve.includes(Se), !u.value && (f.value = N, l.value = !0);
    }
    function E(H) {
      const { disableHour: Q } = o.value, ae = Math.round(H / 6) * 6 + 90, N = {
        time: ae / 6 >= 0 ? ae / 6 : ae / 6 + 60,
        format: e.format,
        ampm: v.value,
        hour: y.value.hour,
        max: e.max,
        min: e.min,
        disableHour: Q,
        allowedTime: e.allowedTime
      };
      c.value = ob(N), !c.value && (d.value = ae, s.value = !0);
    }
    function J(H) {
      const { disableHour: Q } = o.value, ae = Math.round(H / 6) * 6 + 90, N = {
        time: ae / 6 >= 0 ? ae / 6 : ae / 6 + 60,
        format: e.format,
        ampm: v.value,
        hour: y.value.hour,
        minute: Y(y.value.minute),
        max: e.max,
        min: e.min,
        disableHour: Q,
        allowedTime: e.allowedTime
      };
      rb(N) || (p.value = ae);
    }
    function q() {
      const { left: H, top: Q, width: ae, height: ve } = nn(n.value);
      if (w.x = H + ae / 2, w.y = Q + ve / 2, h.value === "hour" && e.format === "24hr") {
        const { rangeXMin: N, rangeXMax: K, rangeYMin: me, rangeYMax: Se } = B();
        k.x = [N, K], k.y = [me, Se];
      }
    }
    function ne(H) {
      if (Ae(H), e.readonly)
        return;
      q();
      const { clientX: Q, clientY: ae } = H.touches[0], ve = Q - w.x, N = ae - w.y, K = Math.round(M(Math.atan2(N, ve)));
      h.value === "hour" ? j(Q, ae, K) : h.value === "minute" ? E(K) : J(K);
    }
    function ye() {
      if (!e.readonly) {
        if (h.value === "hour" && l.value) {
          h.value = "minute";
          return;
        }
        h.value === "minute" && e.useSeconds && s.value && (h.value = "second");
      }
    }
    function Te() {
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
      n: IB,
      classes: DB,
      t: rn,
      pt: z,
      moveHand: ne,
      checkPanel: D,
      checkAmpm: V,
      end: ye,
      update: P,
      changePreventUpdate: Te,
      formatElevation: dn
    };
  }
});
ib.render = AB;
var el = ib;
re(el);
ie(el, nb);
const JI = el;
var Ws = el;
const lb = {
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
var Tr = (e, n, t) => new Promise((o, r) => {
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
const { name: NB, n: RB, classes: LB } = x("uploader");
let VB = 0;
const FB = ["onClick"], UB = ["onClick"], jB = ["src", "alt"], HB = ["tabindex"], YB = ["multiple", "accept", "capture", "disabled"], WB = ["src"];
function KB(e, n) {
  const t = te("mp-icon"), o = te("mp-hover-overlay"), r = te("mp-form-details"), a = te("mp-popup"), i = Ge("ripple"), l = Ge("hover");
  return g(), C(
    "div",
    {
      class: m(e.classes(e.n(), e.n("$--box")))
    },
    [
      L(
        "div",
        {
          class: m(e.n("file-list"))
        },
        [
          (g(!0), C(
            Me,
            null,
            Ke(e.files, (s) => Ne((g(), C("div", {
              key: s.id,
              class: m(e.classes(e.n("file"), e.formatElevation(e.elevation, 2), [s.state === "loading", e.n("--loading")])),
              onClick: (u) => e.preview(s)
            }, [
              L(
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
                L("div", {
                  class: m(e.n("file-close")),
                  onClick: Tn((u) => e.handleRemove(s), ["stop"])
                }, [
                  Z(t, {
                    class: m(e.n("file-close-icon")),
                    "mp-uploader-cover": "",
                    name: "delete"
                  }, null, 8, ["class"])
                ], 10, UB)
              ]) : X("v-if", !0),
              s.cover ? (g(), C("img", {
                key: 1,
                role: "img",
                class: m(e.n("file-cover")),
                style: G({ objectFit: s.fit }),
                src: s.cover,
                alt: s.name
              }, null, 14, jB)) : X("v-if", !0),
              L(
                "div",
                {
                  class: m(e.n("file-indicator"))
                },
                [
                  L(
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
            ], 10, FB)), [
              [i, { disabled: e.disabled || e.formDisabled || e.readonly || e.formReadonly || !e.ripple }]
            ])),
            128
            /* KEYED_FRAGMENT */
          )),
          !e.maxlength || e.modelValue.length < e.toNumber(e.maxlength) ? Ne((g(), C("div", {
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
            L("input", {
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
            }, null, 42, YB),
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
          ], 42, HB)), [
            [i, {
              disabled: e.disabled || e.formDisabled || e.readonly || e.formReadonly || !e.ripple || !!e.$slots.default
            }],
            [l, e.handleHovering, "desktop"]
          ]) : X("v-if", !0)
        ],
        2
        /* CLASS */
      ),
      Z(r, {
        "error-message": e.errorMessage,
        "extra-message": e.maxlengthText
      }, Kt({
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
            }, null, 10, WB)) : X("v-if", !0)
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
const sb = ee({
  name: NB,
  directives: { Ripple: on, Hover: Dn },
  components: {
    MpIcon: Ze,
    MpPopup: It,
    MpFormDetails: Bn,
    MpHoverOverlay: Vn
  },
  props: lb,
  setup(e) {
    const n = $(!1), t = $(null), o = $(null), r = $(!1), a = $(null), i = O(() => {
      const {
        maxlength: H,
        modelValue: { length: Q }
      } = e;
      return zn(H) ? `${Q} / ${H}` : "";
    }), { form: l, bindForm: s } = jn(), {
      errorMessage: u,
      validateWithTrigger: c,
      validate: d,
      // expose
      resetValidation: p
    } = Un(), { hovering: f, handleHovering: h } = _n(), v = O(() => {
      const { modelValue: H, hideList: Q } = e;
      return Q ? [] : H;
    });
    let y = !1;
    const w = {
      getSuccess: B,
      getError: j,
      getLoading: E
    };
    S(s, {
      validate: ye,
      resetValidation: p,
      reset: Te
    }), je(() => window, "keydown", b), je(() => window, "keyup", z), pe(
      () => e.modelValue,
      () => {
        !y && ne("onChange"), y = !1;
      },
      { deep: !0 }
    );
    function b(H) {
      n.value && ((H.key === " " || H.key === "Enter") && H.preventDefault(), H.key === "Enter" && t.value.click());
    }
    function z(H) {
      !n.value || H.key !== " " || (H.preventDefault(), t.value.click());
    }
    function I(H) {
      const { disabled: Q, previewed: ae, preventDefaultPreview: ve, onPreview: N } = e;
      if (l != null && l.disabled.value || Q || !ae || (S(N, en(H)), ve))
        return;
      const { url: K } = H;
      if (Vc(K)) {
        Go(K);
        return;
      }
      Fc(K) && (a.value = H, r.value = !0);
    }
    function P(H) {
      return {
        id: VB++,
        url: "",
        cover: "",
        name: H.name,
        file: H,
        progress: 0
      };
    }
    function M(H) {
      const Q = H.target, { files: ae } = Q;
      return Array.from(ae);
    }
    function D(H) {
      return Tr(this, null, function* () {
        const Q = H.file;
        if (e.resolveType === "default" && Q.type.startsWith("image") || e.resolveType === "data-url") {
          const ve = yield im(Q);
          H.cover = ve, H.url = ve;
        }
        return H;
      });
    }
    function U(H) {
      return H.map(D);
    }
    function V(H) {
      const { onBeforeRead: Q } = e;
      return H.map(
        (ae) => new Promise((ve) => {
          Q || ve({
            valid: !0,
            varFile: ae
          });
          const N = dt(S(Q, en(ae)));
          Promise.all(N).then((K) => {
            ve({
              valid: K.every(Boolean),
              varFile: ae
            });
          });
        })
      );
    }
    function W(H) {
      return Tr(this, null, function* () {
        const { maxsize: Q, maxlength: ae, modelValue: ve, onOversize: N, onAfterRead: K, onBeforeFilter: me, readonly: Se, disabled: Ue } = e;
        if (l != null && l.disabled.value || l != null && l.readonly.value || Ue || Se)
          return;
        const Re = (ke) => ke.filter((Ie) => Ie.file.size > Y(Q) ? (S(N, en(Ie)), !1) : !0), xe = (ke) => {
          const Ie = Math.min(ke.length, Y(ae) - ve.length);
          return ke.slice(0, Ie);
        }, sn = (ke) => Tr(this, null, function* () {
          if (!me)
            return ke;
          const Ie = dt(me);
          for (const _e of Ie)
            ke = yield _e(ke);
          return ke;
        });
        let fe = M(H).map(P);
        fe = yield sn(fe), fe = Q != null ? Re(fe) : fe, fe = ae != null ? xe(fe) : fe;
        const We = yield Promise.all(U(fe)), de = (yield Promise.all(V(We))).filter(({ valid: ke }) => ke).map(({ varFile: ke }) => ke);
        S(e["onUpdate:modelValue"], [...ve, ...de]), H.target.value = "", de.forEach((ke) => S(K, en(ke)));
      });
    }
    function A(H) {
      return Tr(this, null, function* () {
        const { disabled: Q, readonly: ae, modelValue: ve, onBeforeRemove: N, onRemove: K } = e;
        if (l != null && l.disabled.value || l != null && l.readonly.value || Q || ae)
          return;
        if (N) {
          const Se = dt(S(N, en(H)));
          if ((yield Promise.all(Se)).some((Ue) => !Ue))
            return;
        }
        const me = ve.filter((Se) => Se !== H);
        S(K, en(H)), ne("onRemove"), S(e["onUpdate:modelValue"], me);
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
    function B() {
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
    function q() {
      a.value = null, r.value = !1, Go.close();
    }
    function ne(H) {
      Ye(() => {
        const { validateTrigger: Q, rules: ae, modelValue: ve } = e;
        c(Q, H, ae, ve, w);
      });
    }
    function ye() {
      return d(e.rules, e.modelValue, w);
    }
    function Te() {
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
      n: RB,
      classes: LB,
      formatElevation: dn,
      toNumber: Y,
      handleHovering: h,
      isHTMLSupportVideo: Fc,
      isHTMLSupportImage: Vc,
      preview: I,
      handleChange: W,
      handleRemove: A,
      getSuccess: B,
      getError: j,
      getLoading: E,
      validate: ye,
      resetValidation: p,
      reset: Te,
      chooseFile: J,
      closePreview: q,
      handleActionClick: T,
      toSizeUnit: Oe
    };
  }
});
sb.render = KB;
var nl = sb;
re(nl);
ie(nl, lb);
const QI = nl;
var Ks = nl;
const ub = {
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
var qB = Object.defineProperty, XB = Object.defineProperties, GB = Object.getOwnPropertyDescriptors, Op = Object.getOwnPropertySymbols, ZB = Object.prototype.hasOwnProperty, JB = Object.prototype.propertyIsEnumerable, Ep = (e, n, t) => n in e ? qB(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t, QB = (e, n) => {
  for (var t in n || (n = {}))
    ZB.call(n, t) && Ep(e, t, n[t]);
  if (Op)
    for (var t of Op(n))
      JB.call(n, t) && Ep(e, t, n[t]);
  return e;
}, xB = (e, n) => XB(e, GB(n)), _B = (e, n, t) => new Promise((o, r) => {
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
const { name: eM, n: nM, classes: tM } = x("watermark"), oM = { ref: "svgRef" }, rM = ["viewBox", "width", "height"], aM = ["width", "height"], iM = ["href", "xlink:href", "x", "y", "width", "height"];
function lM(e, n) {
  return g(), C(
    "div",
    {
      class: m(e.n())
    },
    [
      F(e.$slots, "default"),
      (g(), we(it, {
        to: "body",
        disabled: !e.fullscreen
      }, [
        L(
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
            Ne(L(
              "div",
              oM,
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
                    L(
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
                          L(
                            "span",
                            {
                              style: G(xB(QB({}, e.font), { fontSize: `${e.font.fontSize}px`, color: e.textColor }))
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
                  ], 8, aM)) : X("v-if", !0),
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
                  }, null, 12, iM)) : X("v-if", !0)
                ], 12, rM))
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
const cb = ee({
  name: eM,
  props: ub,
  setup(e, { slots: n }) {
    const t = $(""), o = $(""), r = $(""), a = $(null), i = $(null);
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
    ), ht(d), Qo(c);
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
      return _B(this, null, function* () {
        r.value = Zn(i.value).color, e.image && (o.value = yield s()), yield Ye(), c(), t.value = u(a.value.innerHTML);
      });
    }
    return {
      svgRef: a,
      containerRef: i,
      watermarkUrl: t,
      imageUrl: o,
      textColor: r,
      n: nM,
      classes: tM,
      showContent: l,
      resize: d
    };
  }
});
cb.render = lM;
var tl = cb;
re(tl);
ie(tl, ub);
const xI = tl;
var qs = tl;
const sM = "1.0.3";
function uM(e) {
  bl.install && e.use(bl), yl.install && e.use(yl), wl.install && e.use(wl), Cl.install && e.use(Cl), Pl.install && e.use(Pl), Ol.install && e.use(Ol), El.install && e.use(El), xr.install && e.use(xr), Tl.install && e.use(Tl), Bl.install && e.use(Bl), Ml.install && e.use(Ml), Il.install && e.use(Il), Mn.install && e.use(Mn), Dl.install && e.use(Dl), Al.install && e.use(Al), Nl.install && e.use(Nl), co.install && e.use(co), Rl.install && e.use(Rl), _r.install && e.use(_r), Vl.install && e.use(Vl), Fl.install && e.use(Fl), Ul.install && e.use(Ul), jl.install && e.use(jl), Hl.install && e.use(Hl), Rn.install && e.use(Rn), Yl.install && e.use(Yl), Xl.install && e.use(Xl), xl.install && e.use(xl), es.install && e.use(es), ns.install && e.use(ns), ts.install && e.use(ts), aa.install && e.use(aa), os.install && e.use(os), rs.install && e.use(rs), as.install && e.use(as), Vo.install && e.use(Vo), is.install && e.use(is), ls.install && e.use(ls), Bn.install && e.use(Bn), ss.install && e.use(ss), Dn.install && e.use(Dn), Vn.install && e.use(Vn), Ze.install && e.use(Ze), us.install && e.use(us), Go.install && e.use(Go), cs.install && e.use(cs), ds.install && e.use(ds), Fo.install && e.use(Fo), Wo.install && e.use(Wo), ps.install && e.use(ps), ms.install && e.use(ms), go.install && e.use(go), fs.install && e.use(fs), gl.install && e.use(gl), vs.install && e.use(vs), Ho.install && e.use(Ho), po.install && e.use(po), Yo.install && e.use(Yo), la.install && e.use(la), gs.install && e.use(gs), hs.install && e.use(hs), bs.install && e.use(bs), ys.install && e.use(ys), It.install && e.use(It), ws.install && e.use(ws), ks.install && e.use(ks), sa.install && e.use(sa), $s.install && e.use($s), Cs.install && e.use(Cs), Ss.install && e.use(Ss), on.install && e.use(on), zs.install && e.use(zs), Ps.install && e.use(Ps), Os.install && e.use(Os), Es.install && e.use(Es), Ts.install && e.use(Ts), Ms.install && e.use(Ms), Is.install && e.use(Is), Ds.install && e.use(Ds), As.install && e.use(As), yo.install && e.use(yo), Ns.install && e.use(Ns), qo.install && e.use(qo), Xo.install && e.use(Xo), Rs.install && e.use(Rs), Ls.install && e.use(Ls), Vs.install && e.use(Vs), Fs.install && e.use(Fs), Us.install && e.use(Us), js.install && e.use(js), Hs.install && e.use(Hs), Ys.install && e.use(Ys), Ws.install && e.use(Ws), ia.install && e.use(ia), Ks.install && e.use(Ks), qs.install && e.use(qs);
}
const _I = {
  version: sM,
  install: uM,
  ActionSheet: bl,
  Alert: yl,
  AppBar: wl,
  AutoComplete: Cl,
  Avatar: Pl,
  AvatarGroup: Ol,
  BackTop: El,
  Badge: xr,
  BottomNavigation: Tl,
  BottomNavigationItem: Bl,
  Breadcrumb: Ml,
  BreadcrumbItem: Il,
  Button: Mn,
  ButtonGroup: Dl,
  Card: Al,
  Cell: Nl,
  Checkbox: co,
  CheckboxGroup: Rl,
  Chip: _r,
  Code: Vl,
  Col: Fl,
  Collapse: Ul,
  CollapseItem: jl,
  CollapseTransition: Hl,
  Context: Rn,
  CountTo: Yl,
  Countdown: Xl,
  Counter: xl,
  DatePicker: es,
  Dialog: ns,
  Divider: ts,
  Drag: aa,
  Ellipsis: os,
  Empty: rs,
  Fab: as,
  FieldDecorator: Vo,
  FloatingPanel: is,
  Form: ls,
  FormDetails: Bn,
  HighlighterProvider: ss,
  Hover: Dn,
  HoverOverlay: Vn,
  Icon: Ze,
  Image: us,
  ImagePreview: Go,
  IndexAnchor: cs,
  IndexBar: ds,
  Input: Fo,
  Lazy: Wo,
  Link: ps,
  List: ms,
  Loading: go,
  LoadingBar: fs,
  Locale: gl,
  LocaleProvider: vs,
  Menu: Ho,
  MenuOption: po,
  MenuSelect: Yo,
  Option: la,
  Overlay: gs,
  Pagination: hs,
  Paper: bs,
  Picker: ys,
  Popup: It,
  Progress: ws,
  PullRefresh: ks,
  Radio: sa,
  RadioGroup: $s,
  Rate: Cs,
  Result: Ss,
  Ripple: on,
  Row: zs,
  Select: Ps,
  Signature: Os,
  Skeleton: Es,
  Slider: Ts,
  Snackbar: Ms,
  Space: Is,
  Step: Ds,
  Steps: As,
  Sticky: yo,
  StyleProvider: Ns,
  Swipe: qo,
  SwipeItem: Xo,
  Switch: Rs,
  Tab: Ls,
  TabItem: Vs,
  Table: Fs,
  Tabs: Us,
  TabsItems: js,
  Tag: Hs,
  Themes: Ys,
  TimePicker: Ws,
  Tooltip: ia,
  Uploader: Ks,
  Watermark: qs
};
export {
  bl as ActionSheet,
  yl as Alert,
  wl as AppBar,
  Cl as AutoComplete,
  Pl as Avatar,
  Ol as AvatarGroup,
  El as BackTop,
  xr as Badge,
  Tl as BottomNavigation,
  Bl as BottomNavigationItem,
  Ml as Breadcrumb,
  Il as BreadcrumbItem,
  Mn as Button,
  Dl as ButtonGroup,
  Al as Card,
  Nl as Cell,
  co as Checkbox,
  Rl as CheckboxGroup,
  _r as Chip,
  Vl as Code,
  Fl as Col,
  Ul as Collapse,
  jl as CollapseItem,
  Hl as CollapseTransition,
  Rn as Context,
  Yl as CountTo,
  Xl as Countdown,
  xl as Counter,
  es as DatePicker,
  ns as Dialog,
  ts as Divider,
  aa as Drag,
  os as Ellipsis,
  rs as Empty,
  as as Fab,
  Vo as FieldDecorator,
  is as FloatingPanel,
  ls as Form,
  Bn as FormDetails,
  ss as HighlighterProvider,
  Dn as Hover,
  Vn as HoverOverlay,
  Ze as Icon,
  us as Image,
  Go as ImagePreview,
  cs as IndexAnchor,
  ds as IndexBar,
  Fo as Input,
  Wo as Lazy,
  ps as Link,
  ms as List,
  go as Loading,
  fs as LoadingBar,
  gl as Locale,
  vs as LocaleProvider,
  Ho as Menu,
  po as MenuOption,
  Yo as MenuSelect,
  la as Option,
  gs as Overlay,
  zl as PIXEL,
  hs as Pagination,
  bs as Paper,
  ys as Picker,
  It as Popup,
  ws as Progress,
  ks as PullRefresh,
  sa as Radio,
  $s as RadioGroup,
  Cs as Rate,
  Ss as Result,
  on as Ripple,
  zs as Row,
  Th as SNACKBAR_TYPE,
  Ps as Select,
  Os as Signature,
  Es as Skeleton,
  Ts as Slider,
  Ms as Snackbar,
  Is as Space,
  Ds as Step,
  As as Steps,
  yo as Sticky,
  Ns as StyleProvider,
  qo as Swipe,
  Xo as SwipeItem,
  Rs as Switch,
  Ls as Tab,
  Vs as TabItem,
  Fs as Table,
  Us as Tabs,
  js as TabsItems,
  Hs as Tag,
  Ys as Themes,
  Ws as TimePicker,
  ia as Tooltip,
  Ks as Uploader,
  qs as Watermark,
  bM as _ActionSheetComponent,
  yM as _AlertComponent,
  wM as _AppBarComponent,
  EM as _AutoCompleteComponent,
  BM as _AvatarComponent,
  MM as _AvatarGroupComponent,
  AM as _BackTopComponent,
  NM as _BadgeComponent,
  RM as _BottomNavigationComponent,
  LM as _BottomNavigationItemComponent,
  VM as _BreadcrumbComponent,
  FM as _BreadcrumbItemComponent,
  DM as _ButtonComponent,
  UM as _ButtonGroupComponent,
  jM as _CardComponent,
  HM as _CellComponent,
  SM as _CheckboxComponent,
  YM as _CheckboxGroupComponent,
  WM as _ChipComponent,
  KM as _CodeComponent,
  qM as _ColComponent,
  XM as _CollapseComponent,
  GM as _CollapseItemComponent,
  ZM as _CollapseTransitionComponent,
  pM as _ContextComponent,
  JM as _CountToComponent,
  QM as _CountdownComponent,
  xM as _CounterComponent,
  eI as _DatePickerComponent,
  nI as _DialogComponent,
  tI as _DividerComponent,
  oI as _DragComponent,
  aI as _EllipsisComponent,
  iI as _EmptyComponent,
  lI as _FabComponent,
  $M as _FieldDecoratorComponent,
  sI as _FloatingPanelComponent,
  uI as _FormComponent,
  kM as _FormDetailsComponent,
  cI as _HighlighterProviderComponent,
  vM as _HoverComponent,
  gM as _HoverOverlayComponent,
  hM as _IconComponent,
  dI as _ImageComponent,
  fI as _ImagePreviewComponent,
  vI as _IndexAnchorComponent,
  gI as _IndexBarComponent,
  CM as _InputComponent,
  TM as _LazyComponent,
  hI as _LinkComponent,
  bI as _ListComponent,
  yI as _LoadingBarComponent,
  IM as _LoadingComponent,
  dM as _LocaleComponent,
  wI as _LocaleProviderComponent,
  PM as _MenuComponent,
  zM as _MenuOptionComponent,
  OM as _MenuSelectComponent,
  kI as _OptionComponent,
  $I as _OverlayComponent,
  CI as _PaginationComponent,
  SI as _PaperComponent,
  zI as _PickerComponent,
  mM as _PopupComponent,
  PI as _ProgressComponent,
  OI as _PullRefreshComponent,
  EI as _RadioComponent,
  TI as _RadioGroupComponent,
  BI as _RateComponent,
  MI as _ResultComponent,
  fM as _RippleComponent,
  II as _RowComponent,
  DI as _SelectComponent,
  AI as _SignatureComponent,
  NI as _SkeletonComponent,
  RI as _SliderComponent,
  LI as _SnackbarComponent,
  VI as _SpaceComponent,
  FI as _StepComponent,
  UI as _StepsComponent,
  _M as _StickyComponent,
  jI as _StyleProviderComponent,
  pI as _SwipeComponent,
  mI as _SwipeItemComponent,
  HI as _SwitchComponent,
  YI as _TabComponent,
  WI as _TabItemComponent,
  KI as _TableComponent,
  qI as _TabsComponent,
  XI as _TabsItemsComponent,
  GI as _TagComponent,
  ZI as _ThemesComponent,
  JI as _TimePickerComponent,
  rI as _TooltipComponent,
  QI as _UploaderComponent,
  xI as _WatermarkComponent,
  Hm as actionSheetProps,
  uu as add,
  Wm as alertProps,
  qm as appBarProps,
  Bf as avatarGroupProps,
  Ef as avatarProps,
  Rf as backTopProps,
  Vf as badgeProps,
  Yf as bottomNavigationItemProps,
  Uf as bottomNavigationProps,
  Gf as breadcrumbItemProps,
  Kf as breadcrumbProps,
  Jf as buttonGroupProps,
  Df as buttonProps,
  xf as cardProps,
  ev as cellProps,
  tv as checkboxGroupProps,
  nf as checkboxProps,
  rv as chipProps,
  iv as codeProps,
  sv as colProps,
  vv as collapseItemProps,
  dv as collapseProps,
  hv as collapseTransitionProps,
  yv as countToProps,
  kv as countdownProps,
  Av as counterProps,
  ym as currentMessage,
  Hv as datePickerProps,
  _I as default,
  mn as defaultLazyOptions,
  Qv as dialogProps,
  _v as dividerProps,
  ng as dragProps,
  ag as ellipsisProps,
  lg as emptyProps,
  fm as enUS,
  vm as faIR,
  ug as fabProps,
  Ca as fieldDecoratorProps,
  Gm as formDetailsProps,
  pg as formProps,
  Rm as hoverOverlayProps,
  cn as iconProps,
  Cf as imageCache,
  yg as imagePreviewProps,
  vg as imageProps,
  kg as indexAnchorProps,
  Sg as indexBarProps,
  gu as inputProps,
  uM as install,
  Pg as linkProps,
  Eg as listProps,
  V4 as loadingBarProps,
  ut as loadingProps,
  rf as menuOptionProps,
  hu as menuProps,
  Jr as menuSelectProps,
  wm as merge,
  bm as messages,
  jg as optionProps,
  Wg as overlayProps,
  Kg as paginationProps,
  Xg as paperProps,
  Zg as pickerProps,
  Co as popupProps,
  Qg as progressProps,
  _g as pullRefreshProps,
  rh as radioGroupProps,
  nh as radioProps,
  ih as rateProps,
  sh as resultProps,
  gh as rowProps,
  bh as selectProps,
  wh as signatureProps,
  $h as skeletonProps,
  Sh as sliderProps,
  Ru as snackbarProps,
  Ih as spaceProps,
  Dh as stepProps,
  Rh as stepsProps,
  Ao as stickyProps,
  Vh as styleProviderProps,
  Mu as swipeProps,
  Uh as switchProps,
  rn as t,
  Kh as tabItemProps,
  Hh as tabProps,
  Xh as tableProps,
  Qh as tabsItemsProps,
  Zh as tabsProps,
  _h as tagProps,
  nb as timePickerProps,
  og as tooltipProps,
  lb as uploaderProps,
  cu as use,
  _n as useHoverOverlay,
  su as useLocale,
  sM as version,
  ub as watermarkProps,
  iu as zhCN,
  hm as zhHK,
  lu as zhTW
};
