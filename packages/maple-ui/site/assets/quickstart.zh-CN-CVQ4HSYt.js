import{b as r,l as i,m as s,p as l,w as t,Q as n,e,f as d}from"./index-CLBN0B2q.js";const m={components:{}},u={class:"maple-site-doc"},j={class:"card"},h={id:"jie4shao4"},c={class:"card"},g={id:"an1zhuang1"},y={class:"card"},f={id:"zhi1chi2zhuo1mian4duan1"},b={class:"card"},v={id:"xuan3ze2she4ji4xi4tong3"},k={class:"card"},w={id:"zai4xian4ti3yan4zu3jian4"};function x(z,a,M,D,A,N){const p=e("router-link"),o=e("mp-site-code-example");return d(),i("div",u,[a[22]||(a[22]=s("h1",null,"快速开始",-1)),s("div",j,[s("h3",h,[l(p,{to:"#jie4shao4"},{default:t(()=>a[0]||(a[0]=[n("#")])),_:1}),a[1]||(a[1]=n("介绍"))]),a[2]||(a[2]=s("p",null,"这里为您介绍常见开发模式下接入组件库的最基本方式。",-1))]),s("div",c,[s("h3",g,[l(p,{to:"#an1zhuang1"},{default:t(()=>a[3]||(a[3]=[n("#")])),_:1}),a[4]||(a[4]=n("安装"))]),a[8]||(a[8]=s("h4",null,"CDN",-1)),a[9]||(a[9]=s("p",null,[s("code",null,"maple.js"),n(" 包含组件库的所有样式和逻辑, 引入即可。")],-1)),l(o,{"playground-ignore":""},{default:t(()=>a[5]||(a[5]=[s("pre",{class:"hljs"},[s("code",null,[s("span",{class:"hljs-tag"},[n("<"),s("span",{class:"hljs-name"},"div"),n(),s("span",{class:"hljs-attr"},"id"),n("="),s("span",{class:"hljs-string"},'"app"'),n(">")]),s("span",{class:"hljs-tag"},[n("</"),s("span",{class:"hljs-name"},"div"),n(">")]),n(`
`),s("span",{class:"hljs-tag"},[n("<"),s("span",{class:"hljs-name"},"script"),n(),s("span",{class:"hljs-attr"},"src"),n("="),s("span",{class:"hljs-string"},'"https://cdn.jsdelivr.net/npm/vue"'),n(">")]),s("span",{class:"hljs-tag"},[n("</"),s("span",{class:"hljs-name"},"script"),n(">")]),n(`
`),s("span",{class:"hljs-tag"},[n("<"),s("span",{class:"hljs-name"},"script"),n(),s("span",{class:"hljs-attr"},"src"),n("="),s("span",{class:"hljs-string"},'"https://cdn.jsdelivr.net/npm/@nio-pow/maple-ui/umd/maple.js"'),n(">")]),s("span",{class:"hljs-tag"},[n("</"),s("span",{class:"hljs-name"},"script"),n(">")]),n(`
`),s("span",{class:"hljs-tag"},[n("<"),s("span",{class:"hljs-name"},"script"),n(">")]),s("span",{class:"javascript"},[n(`
  `),s("span",{class:"hljs-keyword"},"const"),n(` app = Vue.createApp({
    `),s("span",{class:"hljs-attr"},"template"),n(": "),s("span",{class:"hljs-string"},"'<mp-button>按钮</mp-button>'"),n(`
  })
  app.use(Maple).mount(`),s("span",{class:"hljs-string"},"'#app'"),n(`)
`)]),s("span",{class:"hljs-tag"},[n("</"),s("span",{class:"hljs-name"},"script"),n(">")]),n(`
`)])],-1)])),_:1}),a[10]||(a[10]=s("h4",null,"Webpack/Vite",-1)),l(o,{"playground-ignore":""},{default:t(()=>a[6]||(a[6]=[s("pre",{class:"hljs"},[s("code",null,[s("span",{class:"hljs-meta"},"#"),s("span",{class:"bash"}," 通过 npm、yarn 或 pnpm 安装"),n(`
`),s("span",{class:"hljs-meta"},`
#`),s("span",{class:"bash"}," npm"),n(`
npm i @nio-pow/maple-ui -S
`),s("span",{class:"hljs-meta"},`
#`),s("span",{class:"bash"}," yarn"),n(`
yarn add @nio-pow/maple-ui
`),s("span",{class:"hljs-meta"},`
#`),s("span",{class:"bash"}," pnpm"),n(`
pnpm add @nio-pow/maple-ui
`)])],-1)])),_:1}),l(o,{"playground-ignore":""},{default:t(()=>a[7]||(a[7]=[s("pre",{class:"hljs"},[s("code",null,[s("span",{class:"hljs-keyword"},"import"),n(" App "),s("span",{class:"hljs-keyword"},"from"),n(),s("span",{class:"hljs-string"},"'./App.vue'"),n(`
`),s("span",{class:"hljs-keyword"},"import"),n(" Maple "),s("span",{class:"hljs-keyword"},"from"),n(),s("span",{class:"hljs-string"},"'@nio-pow/maple-ui'"),n(`
`),s("span",{class:"hljs-keyword"},"import"),n(" { createApp } "),s("span",{class:"hljs-keyword"},"from"),n(),s("span",{class:"hljs-string"},"'vue'"),n(`
`),s("span",{class:"hljs-keyword"},"import"),n(),s("span",{class:"hljs-string"},"'@nio-pow/maple-ui/es/style'"),n(`

createApp(App).use(Maple).mount(`),s("span",{class:"hljs-string"},"'#app'"),n(`)
`)])],-1)])),_:1})]),s("div",y,[s("h3",f,[l(p,{to:"#zhi1chi2zhuo1mian4duan1"},{default:t(()=>a[11]||(a[11]=[n("#")])),_:1}),a[12]||(a[12]=n("支持桌面端"))]),a[13]||(a[13]=s("p",null,[s("code",null,"Maple"),n(" 是一个移动端优先的组件库，支持桌面端需要安装一个适配器，详情见"),s("a",{href:"#/zh-CN/browserAdaptation"},"浏览器适配"),n("。")],-1))]),s("div",b,[s("h3",v,[l(p,{to:"#xuan3ze2she4ji4xi4tong3"},{default:t(()=>a[14]||(a[14]=[n("#")])),_:1}),a[15]||(a[15]=n("选择设计系统"))]),a[18]||(a[18]=s("p",null,"从 3.x 版本开始，Maple 同时支持了 Material Design 2 和 Material Design 3 两种设计系统。",-1)),l(o,{"playground-ignore":""},{default:t(()=>a[16]||(a[16]=[s("pre",{class:"hljs"},[s("code",null,[s("span",{class:"hljs-comment"},"// Maple 默认为 Material Design 2 亮色模式"),n(`
`),s("span",{class:"hljs-keyword"},"import"),n(" { Themes, StyleProvider } "),s("span",{class:"hljs-keyword"},"from"),n(),s("span",{class:"hljs-string"},"'@nio-pow/maple-ui'"),n(`

`),s("span",{class:"hljs-comment"},"// Material Design 2 暗色模式"),n(`
StyleProvider(Themes.dark)
`),s("span",{class:"hljs-comment"},"// Material Design 3 亮色模式"),n(`
StyleProvider(Themes.md3Light)
`),s("span",{class:"hljs-comment"},"// Material Design 3 暗色模式"),n(`
StyleProvider(Themes.md3Dark)
`)])],-1)])),_:1}),l(o,{"playground-ignore":""},{default:t(()=>a[17]||(a[17]=[s("pre",{class:"hljs"},[s("code",null,[s("span",{class:"hljs-selector-tag"},"body"),n(` {
  `),s("span",{class:"hljs-attribute"},"transition"),n(": background-color ."),s("span",{class:"hljs-number"},"25s"),n(", color ."),s("span",{class:"hljs-number"},"25s"),n(`;
  `),s("span",{class:"hljs-attribute"},"color"),n(": "),s("span",{class:"hljs-built_in"},"var"),n(`(--color-text);
  `),s("span",{class:"hljs-attribute"},"background-color"),n(": "),s("span",{class:"hljs-built_in"},"var"),n(`(--color-body);
  `),s("span",{class:"hljs-attribute"},"color"),n("-scheme: "),s("span",{class:"hljs-built_in"},"var"),n(`(--color-scheme);
}
`)])],-1)])),_:1})]),s("div",k,[s("h3",w,[l(p,{to:"#zai4xian4ti3yan4zu3jian4"},{default:t(()=>a[19]||(a[19]=[n("#")])),_:1}),a[20]||(a[20]=n("在线体验组件"))]),a[21]||(a[21]=s("p",null,[n("我们提供了网页版的组件编辑器，方便您对组件库的各个组件进行快速上手、在线编辑、分享给他人或是下载代码包本地运行。 您可以点击网页右上角的 "),s("code",null,"{...}"),n(" 图标或是 "),s("a",{href:"https://maplejs.org/playground"},"这里前往"),n("。")],-1))])])}const C=r(m,[["render",x]]);export{C as default};
