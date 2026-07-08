import{b as p,l as m,m as t,p as l,w as o,Q as e,$ as i,e as r,f as a}from"./index-CLBN0B2q.js";const u={components:{}},g={class:"maple-site-doc"},c={class:"card"},f={id:"jie4shao4"},b={class:"card"},y={id:"te4xing4"},x={class:"card"},h={id:"kuai4su4kai1shi3"},j={class:"card"},v={id:"pei4zhi4wen2jian4"},k={class:"card"},C={id:"zi4ding4yi4ye4mian4"},M={class:"card"},T={id:"ming4ling4xiang1guan1"},w={class:"card"},z={id:"fa1bu4qian2zhu4yi4"},V={class:"card"},N={id:"wen4da2"};function R(S,d,P,E,L,D){const s=r("router-link"),n=r("mp-site-code-example");return a(),m("div",g,[d[65]||(d[65]=t("h1",null,"组件库快速成型工具",-1)),t("div",c,[t("h3",f,[l(s,{to:"#jie4shao4"},{default:o(()=>d[0]||(d[0]=[e("#")])),_:1}),d[1]||(d[1]=e("介绍"))]),d[2]||(d[2]=t("p",null,[e("开箱即用的 "),t("code",null,"Vue3组件库"),e(" 快速成型工具，提供了一系列命令和工具去解决组件库开发上的问题。")],-1))]),t("div",b,[t("h3",y,[l(s,{to:"#te4xing4"},{default:o(()=>d[3]||(d[3]=[e("#")])),_:1}),d[4]||(d[4]=e("特性"))]),d[5]||(d[5]=i("<ul><li>📦  开箱即用的组件库开发环境</li><li>📦  开箱即用的组件库编译工具，支持导出 <code>esm</code>, <code>cjs</code>, <code>umd</code> 三种模块代码</li><li>🛠️  基于配置文件的组件库文档站点，支持百度统计和主题定制</li><li>🛠️  支持 <code>sfc</code> 和 <code>tsx</code> 两种风格的组件库编写风格</li><li>📦  开箱即用的代码检查工具</li><li>📦  开箱即用的单元测试工具</li><li>📦  开箱即用的代码发布工具,同时发布到 <code>npm</code> 和 <code>github</code>, 并自动生成更新日志</li><li>💪  支持 <code>VSCode</code> 插件开发</li><li>💪  支持 <code>字体图标打包</code></li><li>💪  支持 <code>Typescript</code></li><li>💪  支持 <code>多种主题, 包含 Material Design 2、Material Design 3</code></li><li>🌍  支持 <code>国际化</code></li><li>🚀  基于 <code>pnpm</code></li></ul>",1))]),t("div",x,[t("h3",h,[l(s,{to:"#kuai4su4kai1shi3"},{default:o(()=>d[6]||(d[6]=[e("#")])),_:1}),d[7]||(d[7]=e("快速开始"))]),d[9]||(d[9]=t("p",null,[t("code",null,"@nio-pow/maple-cli"),e(" 内置了 "),t("code",null,"sfc"),e(" 和 "),t("code",null,"tsx"),e(" 两种风格的组件库项目模板，可以通过 "),t("code",null,"gen"),e(" 命令直接生成。 方便您直接进入组件库开发。")],-1)),l(n,{"playground-ignore":""},{default:o(()=>d[8]||(d[8]=[t("pre",{class:"hljs"},[t("code",null,`pnpm add @nio-pow/maple-cli -g
maple-cli gen
`)],-1)])),_:1})]),d[66]||(d[66]=t("h2",null,"高级定制",-1)),t("div",j,[t("h3",v,[l(s,{to:"#pei4zhi4wen2jian4"},{default:o(()=>d[10]||(d[10]=[e("#")])),_:1}),d[11]||(d[11]=e("配置文件"))]),d[12]||(d[12]=i('<p>项目根目录下的 <code>maple.config.mjs</code> 用来管理整个组件库项目的具体细节。 默认配置可查阅 <a href="https://xxx/pe.frontend/materials/maplejs/maple-design-mobile/-/blob/master/packages/maple-cli/src/node/config/maple.default.config.ts?ref_type=heads">maple.default.config.ts</a>。 也可以参考 <code>@nio-pow/maple-ui</code> 的 <a href="https://xxx/pe.frontend/materials/maplejs/maple-design-mobile/-/blob/master/packages/maple-ui/maple.config.mjs?ref_type=heads">maple.config.mjs</a>。</p><table><thead><tr><th>参数</th><th>说明</th><th>类型</th><th>默认值</th></tr></thead><tbody><tr><td><code>name</code></td><td>组件库全名，会作为包名</td><td><em>string</em></td><td><code>Varlet</code></td></tr><tr><td><code>namespace</code></td><td>组件库命名空间, 会作为组件前缀</td><td><em>string</em></td><td><code>var</code></td></tr><tr><td><code>host</code></td><td>开发服务器主机</td><td><em>number</em></td><td><code>localhost</code></td></tr><tr><td><code>port</code></td><td>开发服务器端口</td><td><em>number</em></td><td><code>8080</code></td></tr><tr><td><code>proxy</code></td><td>开发服务器代理</td><td><em>Record&lt;string, string | ProxyOptions&gt;</em></td><td><code>-</code></td></tr><tr><td><code>title</code></td><td>文档中组件库的标题</td><td><em>string</em></td><td><code>VARLET</code></td></tr><tr><td><code>logo</code></td><td>文档中组件库的 logo</td><td><em>string</em></td><td><code>-</code></td></tr><tr><td><code>alias</code></td><td>路径别名 (使用相对路径时，根路径为 src 文件夹)</td><td><em>Record&lt;string, string&gt;</em></td><td><code>-</code></td></tr><tr><td><code>defaultLanguage</code></td><td>文档默认语言</td><td><em>string</em></td><td><code>zh-CN</code></td></tr><tr><td><code>defaultLightTheme</code></td><td>默认的亮色主题</td><td><em>string</em></td><td><code>md3LightTheme</code></td></tr><tr><td><code>defaultDarkTheme</code></td><td>默认的暗色主题</td><td><em>string</em></td><td><code>md3DarkTheme</code></td></tr><tr><td><code>useMobile</code></td><td>是否显示右侧手机预览</td><td><em>boolean</em></td><td><code>false</code></td></tr><tr><td><code>themeKey</code></td><td>主题在本地存储中的 key</td><td><em>string</em></td><td><code>VARLET_THEME</code></td></tr><tr><td><code>lightTheme</code></td><td>md2 亮色模式文档主题</td><td><em>Record&lt;string, any&gt;</em></td><td><code>-</code></td></tr><tr><td><code>darkTheme</code></td><td>md2 暗黑模式文档主题</td><td><em>Record&lt;string, any&gt;</em></td><td><code>-</code></td></tr><tr><td><code>md3LightTheme</code></td><td>md3 亮色模式文档主题</td><td><em>Record&lt;string, any&gt;</em></td><td><code>-</code></td></tr><tr><td><code>md3DarkTheme</code></td><td>md3 暗黑模式文档主题</td><td><em>Record&lt;string, any&gt;</em></td><td><code>-</code></td></tr><tr><td><code>highlight</code></td><td>文档代码片段样式相关</td><td><em>{ style: string }</em></td><td><code>-</code></td></tr><tr><td><code>analysis</code></td><td>文档统计相关</td><td><em>{ baidu: string }</em></td><td><code>-</code></td></tr><tr><td><code>pc</code></td><td>pc 端文档结构配置</td><td><em><a href="https://xxx/pe.frontend/materials/maplejs/maple-design-mobile/-/blob/master/packages/maple-cli/src/node/config/maple.config.ts?ref_type=heads">MapleConfigPc</a></em></td><td><code>-</code></td></tr><tr><td><code>mobile</code></td><td>mobile 端文档结构配置</td><td><em><a href="https://xxx/pe.frontend/materials/maplejs/maple-design-mobile/-/blob/master/packages/maple-cli/src/node/config/maple.config.ts?ref_type=heads">MapleConfigMobile</a></em></td><td><code>-</code></td></tr><tr><td><code>bundle</code></td><td>组件库编译的捆绑产物配置</td><td><em>{ external: string[], globals: Record&lt;string, string&gt; }</em></td><td><code>-</code></td></tr><tr><td><code>vitePlugins</code></td><td>vite 插件</td><td><em><a href="https://vite.dev/guide/using-plugins.html">Plugin</a>[]</em> | <code>(plugins: Plugin[]) =&gt; Plugin[])</code></td><td><code>-</code></td></tr><tr><td><code>directives</code></td><td>组件库指令文件夹名称</td><td><em>string[]</em></td><td><code>[]</code></td></tr><tr><td><code>copy</code></td><td>复制文件配置</td><td><em><a href="https://github.com/varletjs/varlet/blob/dev/packages/maple-vite-plugins/src/copy.ts">CopyPath[]</a></em></td><td><code>-</code></td></tr><tr><td><code>icons</code></td><td>字体图标打包相关配置</td><td><em><a href="https://xxx/pe.frontend/materials/maplejs/maple-design-mobile/-/blob/master/packages/maple-cli/src/node/config/maple.config.ts?ref_type=heads">MapleConfigIcons</a></em></td><td><code>-</code></td></tr><tr><td><code>esbuild</code></td><td>esbuild 配置</td><td><em><a href="https://xxx/pe.frontend/materials/maplejs/maple-design-mobile/-/blob/master/packages/maple-cli/src/node/config/maple.config.ts?ref_type=heads">MapleConfigEsbuild</a></em></td><td><code>-</code></td></tr><tr><td><code>seo</code></td><td>seo 选项</td><td><em><a href="https://xxx/pe.frontend/materials/maplejs/maple-design-mobile/-/blob/master/packages/maple-cli/src/node/config/maple.config.ts?ref_type=heads">MapleConfigSeo</a></em></td><td><code> -</code></td></tr></tbody></table><h4>Menu</h4><table><thead><tr><th>参数</th><th>说明</th><th>类型</th><th>默认值</th></tr></thead><tbody><tr><td><code>doc</code></td><td>文档页面应匹配的文件名称, 必填</td><td><em>string</em></td><td><code>-</code></td></tr><tr><td><code>type</code></td><td>menu 类型, 当 type 为 <code>1</code> 时表示分类 menu, 类型为 <code>2</code> 时 doc 字段匹配 src 下的组件文件, 类型为<code>3</code>时 doc 字段匹配 docs 下的 md 文件</td><td><em>MenuTypes</em></td><td><code>-</code></td></tr><tr><td><code>text</code></td><td>menu 所展示的文字, 当设置国际化时可配置英文展示文字</td><td><em>Record&lt;string, string&gt;</em></td><td><code>-</code></td></tr><tr><td><code>useMobile</code></td><td>是否在当前文档页显示右侧手机预览, 如不填写, 默认取 config 中的 useMobile</td><td><em>boolean</em></td><td><code>-</code></td></tr></tbody></table>',4))]),t("div",k,[t("h3",C,[l(s,{to:"#zi4ding4yi4ye4mian4"},{default:o(()=>d[13]||(d[13]=[e("#")])),_:1}),d[14]||(d[14]=e("自定义页面"))]),d[17]||(d[17]=t("p",null,[e("如果想在组件库中插入其他页面，可以在项目根目录下的创建 "),t("code",null,"pages"),e(" 文件夹编写 vue 组件， 用来生成其他的页面。 目录结构如下：")],-1)),l(n,{"playground-ignore":""},{default:o(()=>d[15]||(d[15]=[t("pre",{class:"hljs"},[t("code",null,`|-- maple-ui
  |-- src
  |-- docs
  |-- pages
    |-- sponsor
      |-- index.vue
    |-- contributor
      |-- locale
        |-- en-US.ts
      |-- index.vue
    |-- changelog
      |-- locale
        |-- zh-CN.ts
        |-- en-US.ts
      |-- index.vue
`)],-1)])),_:1}),d[18]||(d[18]=t("p",null,"生成的路由如下：",-1)),l(n,{"playground-ignore":""},{default:o(()=>d[16]||(d[16]=[t("pre",{class:"hljs"},[t("code",null,`/zh-CN/sponsor
/en-US/contributor
/zh-CN/changelog
/en-US/changelog
`)],-1)])),_:1})]),t("div",M,[t("h3",T,[l(s,{to:"#ming4ling4xiang1guan1"},{default:o(()=>d[19]||(d[19]=[e("#")])),_:1}),d[20]||(d[20]=e("命令相关"))]),d[39]||(d[39]=t("h4",null,"启动开发服务器",-1)),l(n,{"playground-ignore":""},{default:o(()=>d[21]||(d[21]=[t("pre",{class:"hljs"},[t("code",null,[e(`maple-cli dev
`),t("span",{class:"hljs-meta"},"#"),t("span",{class:"bash"}," force mode"),e(`
maple-cli dev -f
`),t("span",{class:"hljs-meta"},"#"),t("span",{class:"bash"}," draft mode"),e(`
maple-cli dev -d
`)])],-1)])),_:1}),d[40]||(d[40]=t("h4",null,"构建文档站点",-1)),l(n,{"playground-ignore":""},{default:o(()=>d[22]||(d[22]=[t("pre",{class:"hljs"},[t("code",null,`maple-cli build
`)],-1)])),_:1}),d[41]||(d[41]=t("h4",null,"预览文档站点",-1)),l(n,{"playground-ignore":""},{default:o(()=>d[23]||(d[23]=[t("pre",{class:"hljs"},[t("code",null,`maple-cli preview
`)],-1)])),_:1}),d[42]||(d[42]=t("h4",null,"构建组件库",-1)),l(n,{"playground-ignore":""},{default:o(()=>d[24]||(d[24]=[t("pre",{class:"hljs"},[t("code",null,`maple-cli compile
`)],-1)])),_:1}),d[43]||(d[43]=t("h4",null,"构建样式变量类型声明文件",-1)),l(n,{"playground-ignore":""},{default:o(()=>d[25]||(d[25]=[t("pre",{class:"hljs"},[t("code",null,`maple-cli compile:style-vars
`)],-1)])),_:1}),d[44]||(d[44]=t("h4",null,"启动 VSCode 插件开发环境",-1)),l(n,{"playground-ignore":""},{default:o(()=>d[26]||(d[26]=[t("pre",{class:"hljs"},[t("code",null,`maple-cli dev:extension
`)],-1)])),_:1}),d[45]||(d[45]=t("h4",null,"构建 VSCode 插件",-1)),l(n,{"playground-ignore":""},{default:o(()=>d[27]||(d[27]=[t("pre",{class:"hljs"},[t("code",null,`maple-cli build:extension
`)],-1)])),_:1}),d[46]||(d[46]=t("h4",null,"打包字体图标",-1)),l(n,{"playground-ignore":""},{default:o(()=>d[28]||(d[28]=[t("pre",{class:"hljs"},[t("code",null,`maple-cli build:icons -w
maple-cli build:icons
`)],-1)])),_:1}),d[47]||(d[47]=t("h4",null,"执行所有的单元测试",-1)),l(n,{"playground-ignore":""},{default:o(()=>d[29]||(d[29]=[t("pre",{class:"hljs"},[t("code",null,`maple-cli test
`)],-1)])),_:1}),d[48]||(d[48]=t("h4",null,"执行单个组件的单元测试",-1)),l(n,{"playground-ignore":""},{default:o(()=>d[30]||(d[30]=[t("pre",{class:"hljs"},[t("code",null,`maple-cli test -c <componentName>
`)],-1)])),_:1}),d[49]||(d[49]=t("h4",null,"以 watch 模式执行单元测试",-1)),l(n,{"playground-ignore":""},{default:o(()=>d[31]||(d[31]=[t("pre",{class:"hljs"},[t("code",null,`maple-cli test -w
`)],-1)])),_:1}),d[50]||(d[50]=t("h4",null,"执行所有的单元测试并报告覆盖率",-1)),l(n,{"playground-ignore":""},{default:o(()=>d[32]||(d[32]=[t("pre",{class:"hljs"},[t("code",null,`maple-cli test -cov
`)],-1)])),_:1}),d[51]||(d[51]=t("h4",null,"校验提交信息",-1)),l(n,{"playground-ignore":""},{default:o(()=>d[33]||(d[33]=[t("pre",{class:"hljs"},[t("code",null,`maple-cli commit-lint
`)],-1)])),_:1}),d[52]||(d[52]=t("h4",null,"显示检查清单",-1)),l(n,{"playground-ignore":""},{default:o(()=>d[34]||(d[34]=[t("pre",{class:"hljs"},[t("code",null,`maple-cli checklist
`)],-1)])),_:1}),d[53]||(d[53]=t("h4",null,"生成更新日志",-1)),l(n,{"playground-ignore":""},{default:o(()=>d[35]||(d[35]=[t("pre",{class:"hljs"},[t("code",null,`maple-cli changelog
`)],-1)])),_:1}),d[54]||(d[54]=t("h4",null,"发布组件库",-1)),l(n,{"playground-ignore":""},{default:o(()=>d[36]||(d[36]=[t("pre",{class:"hljs"},[t("code",null,`maple-cli release
`)],-1)])),_:1}),d[55]||(d[55]=t("h4",null,"生成一个项目模板",-1)),l(n,{"playground-ignore":""},{default:o(()=>d[37]||(d[37]=[t("pre",{class:"hljs"},[t("code",null,[e(`maple-cli gen
`),t("span",{class:"hljs-meta"},`
#`),t("span",{class:"bash"}," Options"),e(`
-n
--name
  项目名
-s
--sfc
  生成 sfc 风格的项目模板
-t
--tsx
  生成 tsx 格式项目
-l
--locale
  需要支持国际化
`)])],-1)])),_:1}),d[56]||(d[56]=t("h4",null,"创建组件模板文件",-1)),l(n,{"playground-ignore":""},{default:o(()=>d[38]||(d[38]=[t("pre",{class:"hljs"},[t("code",null,[e(`maple-cli create
`),t("span",{class:"hljs-meta"},`
#`),t("span",{class:"bash"}," Options"),e(`
-n
--name
  组件名
-s
--sfc
  生成 sfc 风格的组件
-t
--tsx
  生成 tsx 风格的文件
-l
--locale
  需要支持国际化
`)])],-1)])),_:1})]),t("div",w,[t("h3",z,[l(s,{to:"#fa1bu4qian2zhu4yi4"},{default:o(()=>d[57]||(d[57]=[e("#")])),_:1}),d[58]||(d[58]=e("发布前注意"))]),d[59]||(d[59]=t("ol",null,[t("li",null,[t("code",null,"npm"),e(" 的仓库源必须指向 "),t("code",null,"npm"),e(" 官方镜像")]),t("li",null,[e("执行 "),t("code",null,"npm login"),e(" 进行登录")])],-1))]),t("div",V,[t("h3",N,[l(s,{to:"#wen4da2"},{default:o(()=>d[60]||(d[60]=[e("#")])),_:1}),d[61]||(d[61]=e("问答"))]),d[63]||(d[63]=t("h4",null,"如何解决安装 sharp 失败的问题 ?",-1)),d[64]||(d[64]=t("ul",null,[t("li",null,"您可以选择更改包含 sharp 和 libvips 二进制文件的镜像站点")],-1)),l(n,null,{default:o(()=>d[62]||(d[62]=[t("pre",{class:"hljs"},[t("code",null,`pnpm config set sharp_binary_host "https://npmmirror.com/mirrors/sharp"
pnpm config set sharp_libvips_binary_host "https://npmmirror.com/mirrors/sharp-libvips"
`)],-1)])),_:1})])])}const U=p(u,[["render",R]]);export{U as default};
