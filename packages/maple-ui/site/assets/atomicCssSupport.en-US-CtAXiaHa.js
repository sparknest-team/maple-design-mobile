import{b as r,l as i,m as s,p as a,w as e,Q as n,e as o,f as d}from"./index-CLBN0B2q.js";const m={components:{}},j={class:"maple-site-doc"},c={class:"card"},g={id:"Intro"},h={class:"card"},u={id:"UnoCSS"},f={class:"card"},w={id:"Tailwindcss"},y={class:"card"},x={id:"MoreOptions"},k={class:"card"},v={id:"Usage"};function b(C,l,S,M,U,D){const p=o("router-link"),t=o("mp-site-code-example");return d(),i("div",j,[l[28]||(l[28]=s("h1",null,"Atomic CSS support",-1)),s("div",c,[s("h3",g,[a(p,{to:"#Intro"},{default:e(()=>l[0]||(l[0]=[n("#")])),_:1}),l[1]||(l[1]=n("Intro"))]),l[2]||(l[2]=s("p",null,"We've provided common CSS atomization framework presets, made it easier to access the component library's underlying style variables, and standardized page responsiveness breakpoints.",-1))]),s("div",h,[s("h3",u,[a(p,{to:"#UnoCSS"},{default:e(()=>l[3]||(l[3]=[n("#")])),_:1}),l[4]||(l[4]=n("UnoCSS"))]),l[7]||(l[7]=s("h4",null,"Install",-1)),a(t,{"playground-ignore":""},{default:e(()=>l[5]||(l[5]=[s("pre",{class:"hljs"},[s("code",null,[s("span",{class:"hljs-meta"},"#"),s("span",{class:"bash"}," npm"),n(`
npm i @nio-pow/maple-preset-unocss -D
`),s("span",{class:"hljs-meta"},"#"),s("span",{class:"bash"}," yarn"),n(`
yarn add @nio-pow/maple-preset-unocss -D
`),s("span",{class:"hljs-meta"},"#"),s("span",{class:"bash"}," pnpm"),n(`
pnpm add @nio-pow/maple-preset-unocss -D
`)])],-1)])),_:1}),l[8]||(l[8]=s("h4",null,"Configuration",-1)),a(t,{"playground-ignore":""},{default:e(()=>l[6]||(l[6]=[s("pre",{class:"hljs"},[s("code",null,[s("span",{class:"hljs-comment"},"// uno.config.ts"),n(`
`),s("span",{class:"hljs-keyword"},"import"),n(" { defineConfig, presetUno } "),s("span",{class:"hljs-keyword"},"from"),n(),s("span",{class:"hljs-string"},"'unocss'"),n(`
`),s("span",{class:"hljs-keyword"},"import"),n(" { presetMaple } "),s("span",{class:"hljs-keyword"},"from"),n(),s("span",{class:"hljs-string"},"'@nio-pow/maple-preset-unocss'"),n(`

`),s("span",{class:"hljs-keyword"},"export"),n(),s("span",{class:"hljs-keyword"},"default"),n(` defineConfig({
  `),s("span",{class:"hljs-attr"},"presets"),n(`: [presetUno(), presetMaple()]
})
`)])],-1)])),_:1}),l[9]||(l[9]=s("h4",null,"More Options",-1)),l[10]||(l[10]=s("p",null,[n("Presets detailed definition "),s("a",{href:"https://xxx/pe.frontend/materials/maplejs/maple-design-mobile/-/tree/master/packages/maple-preset-unocss/src/index.ts"},"please watch here"),n(".")],-1))]),s("div",f,[s("h3",w,[a(p,{to:"#Tailwindcss"},{default:e(()=>l[11]||(l[11]=[n("#")])),_:1}),l[12]||(l[12]=n("Tailwindcss"))]),l[17]||(l[17]=s("h4",null,"Install",-1)),a(t,{"playground-ignore":""},{default:e(()=>l[13]||(l[13]=[s("pre",{class:"hljs"},[s("code",null,[s("span",{class:"hljs-meta"},"#"),s("span",{class:"bash"}," npm"),n(`
npm i @nio-pow/maple-preset-tailwindcss -D
`),s("span",{class:"hljs-meta"},"#"),s("span",{class:"bash"}," yarn"),n(`
yarn add @nio-pow/maple-preset-tailwindcss -D
`),s("span",{class:"hljs-meta"},"#"),s("span",{class:"bash"}," pnpm"),n(`
pnpm add @nio-pow/maple-preset-tailwindcss -D
`)])],-1)])),_:1}),l[18]||(l[18]=s("h4",null,"Tailwindcss V3 Configuration",-1)),a(t,{"playground-ignore":""},{default:e(()=>l[14]||(l[14]=[s("pre",{class:"hljs"},[s("code",null,[s("span",{class:"hljs-comment"},"// tailwind.config.js"),n(`
`),s("span",{class:"hljs-keyword"},"import"),n(" { presetMaple } "),s("span",{class:"hljs-keyword"},"from"),n(),s("span",{class:"hljs-string"},"'@nio-pow/maple-preset-tailwindcss'"),n(`

`),s("span",{class:"hljs-keyword"},"export"),n(),s("span",{class:"hljs-keyword"},"default"),n(` {
  `),s("span",{class:"hljs-attr"},"content"),n(`: [
    `),s("span",{class:"hljs-string"},"'./index.html'"),n(`,
    `),s("span",{class:"hljs-string"},"'./src/**/*.{vue,js,ts,jsx,tsx}'"),n(`,
  ],
  `),s("span",{class:"hljs-attr"},"presets"),n(`: [presetMaple()]
}
`)])],-1)])),_:1}),l[19]||(l[19]=s("h4",null,"Tailwindcss V4 Configuration",-1)),a(t,{"playground-ignore":""},{default:e(()=>l[15]||(l[15]=[s("pre",{class:"hljs"},[s("code",null,[s("span",{class:"hljs-comment"},"// tailwind.config.js"),n(`
`),s("span",{class:"hljs-keyword"},"import"),n(" { presetMaple } "),s("span",{class:"hljs-keyword"},"from"),n(),s("span",{class:"hljs-string"},"'@nio-pow/maple-preset-tailwindcss'"),n(`

`),s("span",{class:"hljs-keyword"},"export"),n(),s("span",{class:"hljs-keyword"},"default"),n(` {
  `),s("span",{class:"hljs-attr"},"presets"),n(`: [presetMaple()]
}
`)])],-1)])),_:1}),a(t,null,{default:e(()=>l[16]||(l[16]=[s("pre",{class:"hljs"},[s("code",null,[s("span",{class:"hljs-comment"},"/** src/style.css */"),n(`
`),s("span",{class:"hljs-keyword"},"@import"),n(),s("span",{class:"hljs-string"},'"tailwindcss"'),n(`;
`),s("span",{class:"hljs-keyword"},"@config"),n(),s("span",{class:"hljs-string"},'"../tailwind.config.js"'),n(`;
`)])],-1)])),_:1})]),s("div",y,[s("h3",x,[a(p,{to:"#MoreOptions"},{default:e(()=>l[20]||(l[20]=[n("#")])),_:1}),l[21]||(l[21]=n("More Options"))]),l[22]||(l[22]=s("p",null,[n("Presets detailed definition "),s("a",{href:"https://xxx/pe.frontend/materials/maplejs/maple-design-mobile/-/tree/master/packages/maple-preset-tailwindcss/src/index.ts"},"please watch here"),n(".")],-1))]),s("div",k,[s("h3",v,[a(p,{to:"#Usage"},{default:e(()=>l[23]||(l[23]=[n("#")])),_:1}),l[24]||(l[24]=n("Usage"))]),a(t,{"playground-ignore":""},{default:e(()=>l[25]||(l[25]=[s("pre",{class:"hljs"},[s("code",null,[s("span",{class:"hljs-tag"},[n("<"),s("span",{class:"hljs-name"},"template"),n(">")]),n(`
  `),s("span",{class:"hljs-tag"},[n("<"),s("span",{class:"hljs-name"},"div"),n(),s("span",{class:"hljs-attr"},"class"),n("="),s("span",{class:"hljs-string"},'"text-on-primary bg-primary text-md"'),n(">")]),n("hello"),s("span",{class:"hljs-tag"},[n("</"),s("span",{class:"hljs-name"},"div"),n(">")]),n(`
  `),s("span",{class:"hljs-tag"},[n("<"),s("span",{class:"hljs-name"},"div"),n(),s("span",{class:"hljs-attr"},"class"),n("="),s("span",{class:"hljs-string"},'"text-on-primary-container bg-primary-container text-lg"'),n(">")]),n("world"),s("span",{class:"hljs-tag"},[n("</"),s("span",{class:"hljs-name"},"div"),n(">")]),n(`
  `),s("span",{class:"hljs-tag"},[n("<"),s("span",{class:"hljs-name"},"div"),n(),s("span",{class:"hljs-attr"},"class"),n("="),s("span",{class:"hljs-string"},'"bg-primary sm:bg-info md:bg-warning lg:bg-danger xl:bg-success"'),n(">")]),n("varlet"),s("span",{class:"hljs-tag"},[n("</"),s("span",{class:"hljs-name"},"div"),n(">")]),n(`
`),s("span",{class:"hljs-tag"},[n("</"),s("span",{class:"hljs-name"},"template"),n(">")]),n(`
`)])],-1)])),_:1}),l[27]||(l[27]=s("p",null,"We also support the HSL variables, which makes the transparency of adjusting the color easier.",-1)),a(t,{"playground-ignore":""},{default:e(()=>l[26]||(l[26]=[s("pre",{class:"hljs"},[s("code",null,[s("span",{class:"hljs-tag"},[n("<"),s("span",{class:"hljs-name"},"template"),n(">")]),n(`
  `),s("span",{class:"hljs-tag"},[n("<"),s("span",{class:"hljs-name"},"div"),n(),s("span",{class:"hljs-attr"},"class"),n("="),s("span",{class:"hljs-string"},'"bg-hsl-primary/50 text-hsl-text/70"'),n(">")]),n("hello"),s("span",{class:"hljs-tag"},[n("</"),s("span",{class:"hljs-name"},"div"),n(">")]),n(`
`),s("span",{class:"hljs-tag"},[n("</"),s("span",{class:"hljs-name"},"template"),n(">")]),n(`
`)])],-1)])),_:1})])])}const I=r(m,[["render",b]]);export{I as default};
