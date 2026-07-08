// src/index.ts
import { assert as _assert } from "rattail";
export * from "rattail";
function assert(condition, source, message) {
  return _assert(condition, `Maple [${source}]: ${message}`);
}
function warn(source, message) {
  console.warn(`Maple [${source}]: ${message}`);
}
function error(source, message) {
  console.error(`Maple [${source}]: ${message}`);
}
var isURL = (val) => {
  if (!val) {
    return false;
  }
  return /^(http)|(\.*\/)/.test(val);
};
export {
  assert,
  error,
  isURL,
  warn
};
