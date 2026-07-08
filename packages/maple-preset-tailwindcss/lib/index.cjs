"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  presetMaple: () => presetMaple
});
module.exports = __toCommonJS(src_exports);
function getScreens(options = {}) {
  const { screens = true } = options;
  if (!screens) {
    return;
  }
  const defaultScreens = {
    sm: "768px",
    md: "992px",
    lg: "1200px",
    xl: "1920px"
  };
  if (screens === true) {
    return defaultScreens;
  }
  return __spreadValues(__spreadValues({}, defaultScreens), screens);
}
function getFontSize(options = {}) {
  const { fontSize = true } = options;
  if (!fontSize) {
    return;
  }
  const defaultFontSize = {
    xs: "var(--font-size-xs)",
    sm: "var(--font-size-sm)",
    md: "var(--font-size-md)",
    lg: "var(--font-size-lg)"
  };
  if (fontSize === true) {
    return defaultFontSize;
  }
  return __spreadValues(__spreadValues({}, defaultFontSize), fontSize);
}
function getColors(options = {}) {
  const { colors = true } = options;
  if (!colors) {
    return;
  }
  const defaultColors = {
    body: "var(--color-body)",
    text: "var(--color-text)",
    primary: "var(--color-primary)",
    info: "var(--color-info)",
    warning: "var(--color-warning)",
    danger: "var(--color-danger)",
    success: "var(--color-success)",
    disabled: "var(--color-disabled)",
    "text-disabled": "var(--color-text-disabled)",
    "on-primary": "var(--color-on-primary)",
    "on-info": "var(--color-on-info)",
    "on-warning": "var(--color-on-warning)",
    "on-danger": "var(--color-on-danger)",
    "on-success": "var(--color-on-success)",
    "primary-container": "var(--color-primary-container)",
    "info-container": "var(--color-info-container)",
    "warning-container": "var(--color-warning-container)",
    "danger-container": "var(--color-danger-container)",
    "success-container": "var(--color-success-container)",
    "on-primary-container": "var(--color-on-primary-container)",
    "on-info-container": "var(--color-on-info-container)",
    "on-warning-container": "var(--color-on-warning-container)",
    "on-danger-container": "var(--color-on-danger-container)",
    "on-success-container": "var(--color-on-success-container)",
    "surface-container": "var(--color-surface-container)",
    "surface-container-low": "var(--color-surface-container-low)",
    "surface-container-high": "var(--color-surface-container-high)",
    "surface-container-highest": "var(--color-surface-container-highest)",
    "inverse-surface": "var(--color-inverse-surface)",
    outline: "var(--color-outline)",
    "on-surface-variant": "var(--color-on-surface-variant)",
    "hsl-body": "hsla(var(--hsl-body), <alpha-value>)",
    "hsl-text": "hsla(var(--hsl-text), <alpha-value>)",
    "hsl-primary": "hsla(var(--hsl-primary), <alpha-value>)",
    "hsl-info": "hsla(var(--hsl-info), <alpha-value>)",
    "hsl-warning": "hsla(var(--hsl-warning), <alpha-value>)",
    "hsl-danger": "hsla(var(--hsl-danger), <alpha-value>)",
    "hsl-success": "hsla(var(--hsl-success), <alpha-value>)",
    "hsl-disabled": "hsla(var(--hsl-disabled), <alpha-value>)",
    "hsl-text-disabled": "hsla(var(--hsl-text-disabled), <alpha-value>)",
    "hsl-on-primary": "hsla(var(--hsl-on-primary), <alpha-value>)",
    "hsl-on-info": "hsla(var(--hsl-on-info), <alpha-value>)",
    "hsl-on-warning": "hsla(var(--hsl-on-warning), <alpha-value>)",
    "hsl-on-danger": "hsla(var(--hsl-on-danger), <alpha-value>)",
    "hsl-on-success": "hsla(var(--hsl-on-success), <alpha-value>)",
    "hsl-primary-container": "hsla(var(--hsl-primary-container), <alpha-value>)",
    "hsl-info-container": "hsla(var(--hsl-info-container), <alpha-value>)",
    "hsl-warning-container": "hsla(var(--hsl-warning-container), <alpha-value>)",
    "hsl-danger-container": "hsla(var(--hsl-danger-container), <alpha-value>)",
    "hsl-success-container": "hsla(var(--hsl-success-container), <alpha-value>)",
    "hsl-on-primary-container": "hsla(var(--hsl-on-primary-container), <alpha-value>)",
    "hsl-on-info-container": "hsla(var(--hsl-on-info-container), <alpha-value>)",
    "hsl-on-warning-container": "hsla(var(--hsl-on-warning-container), <alpha-value>)",
    "hsl-on-danger-container": "hsla(var(--hsl-on-danger-container), <alpha-value>)",
    "hsl-on-success-container": "hsla(var(--hsl-on-success-container), <alpha-value>)",
    "hsl-surface-container": "hsla(var(--hsl-surface-container), <alpha-value>)",
    "hsl-surface-container-low": "hsla(var(--hsl-surface-container-low), <alpha-value>)",
    "hsl-surface-container-high": "hsla(var(--hsl-surface-container-high), <alpha-value>)",
    "hsl-surface-container-highest": "hsla(var(--hsl-surface-container-highest), <alpha-value>)",
    "hsl-inverse-surface": "hsla(var(--hsl-inverse-surface), <alpha-value>)",
    "hsl-outline": "hsla(var(--hsl-outline), <alpha-value>)",
    "hsl-on-surface-variant": "hsla(var(--hsl-on-surface-variant), <alpha-value>)"
  };
  if (colors === true) {
    return defaultColors;
  }
  return __spreadValues(__spreadValues({}, defaultColors), colors);
}
function presetMaple(options = {}) {
  return {
    theme: {
      extend: {
        colors: getColors(options),
        screens: getScreens(options),
        fontSize: getFontSize(options)
      }
    }
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  presetMaple
});
