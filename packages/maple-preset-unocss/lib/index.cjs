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
function getBreakpoints(options = {}) {
  const { breakpoints = true } = options;
  if (!breakpoints) {
    return;
  }
  const defaultBreakpoints = {
    sm: "768px",
    md: "992px",
    lg: "1200px",
    xl: "1920px"
  };
  if (breakpoints === true) {
    return defaultBreakpoints;
  }
  return __spreadValues(__spreadValues({}, defaultBreakpoints), breakpoints);
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
    textDisabled: "var(--color-text-disabled)",
    onPrimary: "var(--color-on-primary)",
    onInfo: "var(--color-on-info)",
    onWarning: "var(--color-on-warning)",
    onDanger: "var(--color-on-danger)",
    onSuccess: "var(--color-on-success)",
    primaryContainer: "var(--color-primary-container)",
    infoContainer: "var(--color-info-container)",
    warningContainer: "var(--color-warning-container)",
    dangerContainer: "var(--color-danger-container)",
    successContainer: "var(--color-success-container)",
    onPrimaryContainer: "var(--color-on-primary-container)",
    onInfoContainer: "var(--color-on-info-container)",
    onWarningContainer: "var(--color-on-warning-container)",
    onDangerContainer: "var(--color-on-danger-container)",
    onSuccessContainer: "var(--color-on-success-container)",
    surfaceContainer: "var(--color-surface-container)",
    surfaceContainerLow: "var(--color-surface-container-low)",
    surfaceContainerHigh: "var(--color-surface-container-high)",
    surfaceContainerHighest: "var(--color-surface-container-highest)",
    inverseSurface: "var(--color-inverse-surface)",
    outline: "var(--color-outline)",
    onSurfaceVariant: "var(--color-on-surface-variant)",
    hslBody: "hsla(var(--hsl-body), <alpha-value>)",
    hslText: "hsla(var(--hsl-text), <alpha-value>)",
    hslPrimary: "hsla(var(--hsl-primary), <alpha-value>)",
    hslInfo: "hsla(var(--hsl-info), <alpha-value>)",
    hslWarning: "hsla(var(--hsl-warning), <alpha-value>)",
    hslDanger: "hsla(var(--hsl-danger), <alpha-value>)",
    hslSuccess: "hsla(var(--hsl-success), <alpha-value>)",
    hslDisabled: "hsla(var(--hsl-disabled), <alpha-value>)",
    hslTextDisabled: "hsla(var(--hsl-text-disabled), <alpha-value>)",
    hslOnPrimary: "hsla(var(--hsl-on-primary), <alpha-value>)",
    hslOnInfo: "hsla(var(--hsl-on-info), <alpha-value>)",
    hslOnWarning: "hsla(var(--hsl-on-warning), <alpha-value>)",
    hslOnDanger: "hsla(var(--hsl-on-danger), <alpha-value>)",
    hslOnSuccess: "hsla(var(--hsl-on-success), <alpha-value>)",
    hslPrimaryContainer: "hsla(var(--hsl-primary-container), <alpha-value>)",
    hslInfoContainer: "hsla(var(--hsl-info-container), <alpha-value>)",
    hslWarningContainer: "hsla(var(--hsl-warning-container), <alpha-value>)",
    hslDangerContainer: "hsla(var(--hsl-danger-container), <alpha-value>)",
    hslSuccessContainer: "hsla(var(--hsl-success-container), <alpha-value>)",
    hslOnPrimaryContainer: "hsla(var(--hsl-on-primary-container), <alpha-value>)",
    hslOnInfoContainer: "hsla(var(--hsl-on-info-container), <alpha-value>)",
    hslOnWarningContainer: "hsla(var(--hsl-on-warning-container), <alpha-value>)",
    hslOnDangerContainer: "hsla(var(--hsl-on-danger-container), <alpha-value>)",
    hslOnSuccessContainer: "hsla(var(--hsl-on-success-container), <alpha-value>)",
    hslSurfaceContainer: "hsla(var(--hsl-surface-container), <alpha-value>)",
    hslSurfaceContainerLow: "hsla(var(--hsl-surface-container-low), <alpha-value>)",
    hslSurfaceContainerHigh: "hsla(var(--hsl-surface-container-high), <alpha-value>)",
    hslSurfaceContainerHighest: "hsla(var(--hsl-surface-container-highest), <alpha-value>)",
    hslInverseSurface: "hsla(var(--hsl-inverse-surface), <alpha-value>)",
    hslOutline: "hsla(var(--hsl-outline), <alpha-value>)",
    hslOnSurfaceVariant: "hsla(var(--hsl-on-surface-variant), <alpha-value>)"
  };
  if (colors === true) {
    return defaultColors;
  }
  return __spreadValues(__spreadValues({}, defaultColors), colors);
}
function presetMaple(options = {}) {
  const { fontSize = true } = options;
  return {
    name: "@nio-pow/maple-preset-unocss",
    theme: {
      colors: getColors(options),
      breakpoints: getBreakpoints(options)
    },
    rules: [
      [
        /^text-(.*)$/,
        ([, s]) => {
          if (!fontSize || !["xs", "sm", "md", "lg"].includes(s)) {
            return;
          }
          return {
            "font-size": `var(--font-size-${s})`
          };
        }
      ]
    ]
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  presetMaple
});
