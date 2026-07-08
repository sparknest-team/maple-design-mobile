// src/markdown.ts
import { kebabCase } from "@nio-pow/maple-shared";
import hljs from "highlight.js";
import markdownIt from "markdown-it";
import { pinyin } from "pinyin-pro";
var includeChinese = (value) => /[\u4e00-\u9fa5]/.test(value);
function transformHash(hash) {
  return (includeChinese(hash) ? pinyin(hash, { toneType: "num" }) : hash).replaceAll(" ", "");
}
function htmlWrapper(html2) {
  const matches = html2.matchAll(/<h3>(.*?)<\/h3>/g);
  const hGroup = html2.replace(/<h3>/g, () => {
    const hash = transformHash(matches.next().value[1]);
    return `:::<h3 id="${hash}"><router-link to="#${hash}">#</router-link>`;
  }).replace(/<h2/g, ":::<h2").split(":::");
  const cardGroup = hGroup.map((fragment) => fragment.includes("<h3") ? `<div class="card">${fragment}</div>` : fragment).join("");
  return cardGroup.replace(/<code>/g, "<code v-pre>");
}
function extractComponents(source) {
  const componentRE = /import (.+) from ['"].+['"]/;
  const importRE = /import .+ from ['"].+['"]/g;
  const vueRE = /```vue((.|\r|\n)*?)```/g;
  const imports = [];
  const components = [];
  source = source.replace(vueRE, (_, p1) => {
    const partImports = p1.match(importRE);
    const partComponents = partImports?.map((importer) => {
      importer = importer.replace(/(\n|\r)/g, "");
      const component = importer.replace(componentRE, "$1");
      !imports.includes(importer) && imports.push(importer);
      !components.includes(component) && components.push(component);
      return `<${kebabCase(component)} />`;
    });
    return partComponents ? `<div class="maple-component-preview">${partComponents.join("\n")}</div>` : "";
  });
  return {
    imports,
    components,
    source
  };
}
function injectCodeExample(source) {
  const codeRE = /(<pre class="hljs">(.|\r|\n)*?<\/pre>)/g;
  return source.replace(codeRE, (str) => {
    const flags = [
      "// playground-ignore\n",
      '<span class="hljs-meta">#</span><span class="bash"> playground-ignore</span>\n',
      '<span class="hljs-comment">// playground-ignore</span>\n',
      '<span class="hljs-comment">/* playground-ignore */</span>\n',
      '<span class="hljs-comment">&lt;!-- playground-ignore --&gt;</span>\n'
    ];
    const attr = flags.some((flag) => str.includes(flag)) ? "playground-ignore" : "";
    str = flags.reduce((str2, flag) => str2.replace(flag, ""), str);
    return `<mp-site-code-example ${attr}>${str}</mp-site-code-example>`;
  });
}
function highlight(str, lang, style) {
  let link = "";
  if (style) {
    link = '<link class="hljs-style" rel="stylesheet" href="' + style + '"/>';
  }
  if (lang && hljs.getLanguage(lang)) {
    return '<pre class="hljs"><code>' + link + hljs.highlight(str, { language: lang, ignoreIllegals: true }).value + "</code></pre>";
  }
  return "";
}
function markdownToVue(source, options) {
  const { source: vueSource, imports, components } = extractComponents(source);
  const md = markdownIt({
    html: true,
    highlight: (str, lang) => highlight(str, lang, options.style)
  });
  let templateString = htmlWrapper(md.render(vueSource));
  templateString = templateString.replace(/process.env/g, "<span>process.env</span>");
  templateString = injectCodeExample(templateString);
  return `
<template><div class="maple-site-doc">${templateString}</div></template>

<script>
${imports.join("\n")}

export default {
  components: {
    ${components.join(",")}
  }
}
</script>
  `;
}
function markdown(options) {
  return {
    name: "vite-plugin-maple-markdown",
    enforce: "pre",
    transform(source, id) {
      if (!/\.md$/.test(id)) {
        return;
      }
      try {
        return markdownToVue(source, options);
      } catch (e) {
        this.error(e);
      }
    },
    handleHotUpdate(ctx) {
      if (!/\.md$/.test(ctx.file)) {
        return;
      }
      const { read } = ctx;
      ctx.read = async () => markdownToVue(await read(), options);
    }
  };
}

// src/html.ts
import ejs from "ejs";
function html(options) {
  return {
    name: "vite-plugin-maple-html",
    transformIndexHtml: {
      order: "pre",
      handler(html2) {
        return ejs.render(html2, options.data);
      }
    }
  };
}

// src/inlineCss.ts
import fse from "fs-extra";
var { pathExistsSync, writeFileSync, readFileSync, removeSync } = fse;
function inlineCss(options) {
  return {
    name: "vite-plugin-maple-inline-css",
    apply: "build",
    closeBundle() {
      const { cssFile, jsFile, onEnd } = options;
      if (!pathExistsSync(cssFile)) {
        this.warn("css file cannot found");
        return;
      }
      if (!pathExistsSync(jsFile)) {
        this.warn("js file cannot found");
        return;
      }
      const cssCode = readFileSync(cssFile, "utf-8");
      const jsCode = readFileSync(jsFile, "utf-8");
      const injectCode = `;(function(){var style=document.createElement('style');style.type='text/css';style.rel='stylesheet';style.appendChild(document.createTextNode(\`${cssCode.replace(/\\/g, "\\\\")}\`));var head=document.querySelector('head');head.appendChild(style)})();`;
      writeFileSync(jsFile, `${injectCode}${jsCode}`);
      removeSync(cssFile);
      onEnd?.();
    }
  };
}

// src/copy.ts
import fse2 from "fs-extra";
var { copySync, copyFileSync } = fse2;
function copy(options) {
  return {
    name: "vite-plugin-maple-copy",
    buildStart() {
      options.paths.forEach((copyPath) => {
        try {
          ;
          (copyPath.type === "folder" ? copySync : copyFileSync)(copyPath.from, copyPath.to);
        } catch (e) {
          this.warn(e);
        }
      });
    }
  };
}
export {
  copy,
  html,
  inlineCss,
  markdown
};
