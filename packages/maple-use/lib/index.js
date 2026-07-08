// src/useEventListener.ts
// src/onSmartMounted.ts

// src/useClickOutside.ts

// src/onSmartUnmounted.ts

// src/useParent.ts

// src/useChildren.ts

// src/useInitialized.ts

// src/useTouch.ts

// src/useId.ts

// src/useClientId.ts

// src/useWindowSize.ts

// src/useVModel.ts

// src/useMotion.ts
import {
  computed,
  computed as computed2,
  computed as computed3,
  getCurrentInstance,
  getCurrentInstance as getCurrentInstance2,
  getCurrentInstance as getCurrentInstance3,
  getCurrentInstance as getCurrentInstance4,
  inject,
  isRef,
  isVNode,
  nextTick,
  nextTick as nextTick2,
  nextTick as nextTick3,
  onActivated,
  onBeforeUnmount,
  onBeforeUnmount as onBeforeUnmount2,
  onDeactivated,
  onDeactivated as onDeactivated2,
  onMounted,
  onMounted as onMounted2,
  onMounted as onMounted3,
  onUnmounted,
  provide,
  reactive,
  ref,
  ref as ref2,
  ref as ref3,
  ref as ref4,
  ref as ref5,
  ref as ref6,
  ref as ref7,
  unref,
  unref as unref2,
  watch,
  watch as watch2,
  watch as watch3,
} from 'vue'
import {
  call,
  getScrollTop,
  inBrowser,
  inBrowser as inBrowser2,
  inBrowser as inBrowser3,
  isArray,
  isFunction,
  isFunction as isFunction2,
  isFunction as isFunction3,
  kebabCase,
  kebabCase as kebabCase2,
  motion,
  removeItem,
} from '@maplejs/maple-shared'

var __defProp = Object.defineProperty
var __getOwnPropSymbols = Object.getOwnPropertySymbols
var __hasOwnProp = Object.prototype.hasOwnProperty
var __propIsEnum = Object.prototype.propertyIsEnumerable
var __defNormalProp = (obj, key, value) =>
  key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : (obj[key] = value)
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {})) if (__hasOwnProp.call(b, prop)) __defNormalProp(a, prop, b[prop])
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop)) __defNormalProp(a, prop, b[prop])
    }
  return a
}
var __objRest = (source, exclude) => {
  var target = {}
  for (var prop in source) if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0) target[prop] = source[prop]
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop)) target[prop] = source[prop]
    }
  return target
}

function onSmartMounted(hook) {
  let isMounted = false
  onMounted(() => {
    hook()
    nextTick(() => {
      isMounted = true
    })
  })
  onActivated(() => {
    if (!isMounted) {
      return
    }
    hook()
  })
}

// src/useEventListener.ts
function useEventListener(target, type, listener, options = {}) {
  if (!inBrowser()) {
    return
  }
  const { passive = false, capture = false } = options
  let listening = false
  let cleaned = false
  const getElement = (target2) => (isFunction(target2) ? target2() : unref(target2))
  const add = (target2) => {
    if (listening || cleaned) {
      return
    }
    const element = getElement(target2)
    if (element) {
      element.addEventListener(type, listener, {
        passive,
        capture,
      })
      listening = true
    }
  }
  const remove = (target2) => {
    if (!listening || cleaned) {
      return
    }
    const element = getElement(target2)
    if (element) {
      element.removeEventListener(type, listener, {
        capture,
      })
      listening = false
    }
  }
  let watchStopHandle
  if (isRef(target)) {
    watchStopHandle = watch(
      () => target.value,
      (newValue, oldValue) => {
        remove(oldValue)
        add(newValue)
      },
    )
  }
  const cleanup = () => {
    watchStopHandle == null ? void 0 : watchStopHandle()
    remove(target)
    cleaned = true
  }
  onSmartMounted(() => {
    add(target)
  })
  onBeforeUnmount(() => {
    remove(target)
  })
  onDeactivated(() => {
    remove(target)
  })
  return cleanup
}

function useClickOutside(target, type, listener) {
  if (!inBrowser2()) {
    return
  }
  const handler = (event) => {
    const element = isFunction2(target) ? target() : unref2(target)
    if (element && !element.contains(event.target)) {
      listener(event)
    }
  }
  useEventListener(document, type, handler)
}

function onSmartUnmounted(hook) {
  let keepalive = false
  onDeactivated2(() => {
    keepalive = true
    hook()
  })
  onUnmounted(() => {
    if (keepalive) {
      return
    }
    hook()
  })
}

function keyInProvides(key) {
  const instance = getCurrentInstance()
  return key in instance.provides
}
function useParent(key) {
  if (!keyInProvides(key)) {
    return {
      index: null,
      parentProvider: null,
      bindParent: null,
    }
  }
  const provider = inject(key)
  const _a = provider,
    { childInstances, collect, clear } = _a,
    parentProvider = __objRest(_a, ['childInstances', 'collect', 'clear'])
  const childInstance = getCurrentInstance()
  const index = computed(() => childInstances.indexOf(childInstance))
  const bindParent = (childProvider) => {
    onMounted2(() => {
      nextTick2().then(() => {
        collect(childInstance, childProvider)
      })
    })
    onBeforeUnmount2(() => {
      nextTick2().then(() => {
        clear(childInstance, childProvider)
      })
    })
  }
  return {
    index,
    parentProvider,
    bindParent,
  }
}

function flatVNodes(subTree) {
  const vNodes = []
  const flat = (subTree2) => {
    if (subTree2 == null ? void 0 : subTree2.component) {
      flat(subTree2 == null ? void 0 : subTree2.component.subTree)
      return
    }
    if (isArray(subTree2 == null ? void 0 : subTree2.children)) {
      subTree2.children.forEach((child) => {
        if (isVNode(child)) {
          vNodes.push(child)
          flat(child)
        }
      })
    }
  }
  flat(subTree)
  return vNodes
}
function useChildren(key) {
  const parentInstance = getCurrentInstance2()
  const childInstances = reactive([])
  const childProviders = []
  const length = computed2(() => childInstances.length)
  const sortInstances = () => {
    const vNodes = flatVNodes(parentInstance.subTree)
    childInstances.sort((a, b) => vNodes.indexOf(a.vnode) - vNodes.indexOf(b.vnode))
  }
  const collect = (childInstance, childProvider) => {
    childInstances.push(childInstance)
    childProviders.push(childProvider)
    sortInstances()
  }
  const clear = (childInstance, childProvider) => {
    removeItem(childInstances, childInstance)
    removeItem(childProviders, childProvider)
  }
  const bindChildren = (parentProvider) => {
    provide(
      key,
      __spreadValues(
        {
          childInstances,
          collect,
          clear,
        },
        parentProvider,
      ),
    )
  }
  return {
    length,
    childProviders,
    bindChildren,
  }
}

// src/onWindowResize.ts
function onWindowResize(listener) {
  useEventListener(() => window, 'resize', listener, { passive: true })
  useEventListener(() => window, 'orientationchange', listener, { passive: true })
}

function useInitialized(source, value) {
  const initialized = ref(false)
  watch2(
    source,
    (newValue) => {
      if (value === newValue) {
        initialized.value = true
      }
    },
    { immediate: true },
  )
  return initialized
}

function getDirection(x, y) {
  if (x > y) {
    return 'horizontal'
  }
  if (y > x) {
    return 'vertical'
  }
}
function useTouch() {
  const startX = ref2(0)
  const startY = ref2(0)
  const deltaX = ref2(0)
  const deltaY = ref2(0)
  const offsetX = ref2(0)
  const offsetY = ref2(0)
  const prevX = ref2(0)
  const prevY = ref2(0)
  const moveX = ref2(0)
  const moveY = ref2(0)
  const direction = ref2()
  const touching = ref2(false)
  const dragging = ref2(false)
  const startTime = ref2(0)
  const distance = ref2(0)
  let draggingAnimationFrame = null
  const resetTouch = () => {
    startX.value = 0
    startY.value = 0
    deltaX.value = 0
    deltaY.value = 0
    offsetX.value = 0
    offsetY.value = 0
    prevX.value = 0
    prevY.value = 0
    moveX.value = 0
    moveY.value = 0
    direction.value = void 0
    touching.value = false
    dragging.value = false
    startTime.value = 0
    distance.value = 0
  }
  const startTouch = (event) => {
    resetTouch()
    const { clientX: x, clientY: y } = event.touches[0]
    startX.value = x
    startY.value = y
    prevX.value = x
    prevY.value = y
    touching.value = true
    startTime.value = performance.now()
    dragging.value = false
    if (draggingAnimationFrame) {
      window.cancelAnimationFrame(draggingAnimationFrame)
    }
  }
  const moveTouch = (event) => {
    const { clientX: x, clientY: y } = event.touches[0]
    dragging.value = true
    deltaX.value = x - startX.value
    deltaY.value = y - startY.value
    offsetX.value = Math.abs(deltaX.value)
    offsetY.value = Math.abs(deltaY.value)
    distance.value = Math.sqrt(offsetX.value ** 2 + offsetY.value ** 2)
    moveX.value = x - prevX.value
    moveY.value = y - prevY.value
    if (!direction.value) {
      direction.value = getDirection(offsetX.value, offsetY.value)
    }
    prevX.value = x
    prevY.value = y
  }
  const endTouch = () => {
    touching.value = false
    draggingAnimationFrame = window.requestAnimationFrame(() => {
      dragging.value = false
    })
  }
  const isReachTop = (element) => {
    const scrollTop = getScrollTop(element)
    return scrollTop === 0 && deltaY.value > 0
  }
  const isReachBottom = (element, offset = 1) => {
    const { scrollHeight, clientHeight, scrollTop } = element
    const offsetBottom = Math.abs(scrollHeight - scrollTop - clientHeight)
    return deltaY.value < 0 && offsetBottom <= offset
  }
  return {
    startX,
    startY,
    deltaX,
    deltaY,
    offsetX,
    offsetY,
    prevX,
    prevY,
    moveX,
    moveY,
    direction,
    touching,
    dragging,
    startTime,
    distance,
    resetTouch,
    startTouch,
    moveTouch,
    endTouch,
    isReachTop,
    isReachBottom,
  }
}

function useId() {
  const id = ref3()
  const instance = getCurrentInstance3()
  const name = kebabCase(instance.type.name)
  id.value = process.env.NODE_ENV === 'test' ? `${name}-mock-id` : `${name}-${instance.uid}`
  return id
}

function useClientId() {
  const instance = getCurrentInstance4()
  const name = kebabCase2(instance.type.name)
  const id = ref4(process.env.NODE_ENV === 'test' ? `${name}-mock-id` : void 0)
  onMounted3(() => {
    if (process.env.NODE_ENV !== 'test') {
      id.value = `${name}-${instance.uid}`
    }
  })
  return id
}

function useWindowSize(options = {}) {
  const { initialWidth = 0, initialHeight = 0 } = options
  const width = ref5(initialWidth)
  const height = ref5(initialHeight)
  const update = () => {
    if (!inBrowser3()) {
      return
    }
    width.value = window.innerWidth
    height.value = window.innerHeight
  }
  onSmartMounted(update)
  onWindowResize(update)
  return {
    width,
    height,
  }
}

function useVModel(props, key, options = {}) {
  const { passive = true, eventName, defaultValue, emit } = options
  const event = eventName != null ? eventName : `onUpdate:${key.toString()}`
  const getValue = () => {
    var _a
    return (_a = props[key]) != null ? _a : defaultValue
  }
  if (!passive) {
    return computed3({
      get() {
        return getValue()
      },
      set(value) {
        emit ? emit(event, value) : call(props[event], value)
      },
    })
  }
  const proxy = ref6(getValue())
  let shouldEmit = true
  watch3(
    () => props[key],
    () => {
      shouldEmit = false
      proxy.value = getValue()
      nextTick3(() => {
        shouldEmit = true
      })
    },
  )
  watch3(
    () => proxy.value,
    (newValue) => {
      if (!shouldEmit) {
        return
      }
      emit ? emit(event, newValue) : call(props[event], newValue)
    },
  )
  return proxy
}

function useMotion(options) {
  const value = ref7(getter(options.from))
  const state = ref7('pending')
  let ctx = createMotionContext()
  function getter(value2) {
    return isFunction3(value2) ? value2() : value2
  }
  function reset() {
    ctx.reset()
    value.value = getter(options.from)
    state.value = 'pending'
    ctx = createMotionContext()
  }
  function start() {
    ctx.start()
  }
  function pause() {
    ctx.pause()
  }
  function createMotionContext() {
    return motion({
      from: getter(options.from),
      to: getter(options.to),
      duration: options.duration ? getter(options.duration) : 300,
      timingFunction: options.timingFunction,
      onStateChange(newState) {
        state.value = newState
      },
      frame({ value: newValue, done }) {
        var _a
        value.value = newValue
        if (done) {
          ;(_a = options.onFinished) == null ? void 0 : _a.call(options, value.value)
        }
      },
    })
  }
  return {
    value,
    state,
    start,
    pause,
    reset,
  }
}
export {
  keyInProvides,
  onSmartMounted,
  onSmartUnmounted,
  onWindowResize,
  useChildren,
  useClickOutside,
  useClientId,
  useEventListener,
  useId,
  useInitialized,
  useMotion,
  useParent,
  useTouch,
  useVModel,
  useWindowSize,
}
