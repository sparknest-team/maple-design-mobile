// src/index.ts
import { kebabCase } from "@nio-pow/maple-shared";
var varFunctions = [
  "ImagePreview",
  "Snackbar",
  "Picker",
  "ActionSheet",
  "Dialog",
  "Locale",
  "StyleProvider",
  "LoadingBar"
];
var varDirectives = ["Ripple", "Lazy", "Hover"];
function getResolved(name, options) {
  const { importStyle = true, autoImport = false } = options;
  const sideEffects = [];
  if (importStyle) {
    sideEffects.push(`@nio-pow/maple-ui/es/${kebabCase(name)}/style/index.mjs`);
  }
  return {
    from: "@nio-pow/maple-ui",
    name: autoImport ? name : `_${name}Component`,
    sideEffects
  };
}
function MapleImportResolver(options = {}) {
  return [
    {
      type: "component",
      resolve: (name) => {
        const { autoImport = false } = options;
        if (autoImport && varFunctions.includes(name)) {
          return getResolved(name, options);
        }
        if (name.startsWith("Mp")) {
          return getResolved(name.slice(2), options);
        }
      }
    },
    {
      type: "directive",
      resolve: (name) => {
        const { directives = true } = options;
        if (!directives) {
          return;
        }
        if (!varDirectives.includes(name)) {
          return;
        }
        return getResolved(name, options);
      }
    }
  ];
}
export {
  MapleImportResolver,
  getResolved
};
