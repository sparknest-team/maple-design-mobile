import { fileURLToPath } from 'node:url'
import { createServer, jsx, vue } from '../../packages/maple-cli/test-utils/browser-vite.mjs'

const root = fileURLToPath(new URL('../../packages/maple-ui/', import.meta.url))
const html = `<!doctype html><html lang="zh-CN"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>日期时间字段浏览器验收</title><style>
body{margin:0;background:var(--mp-color-body);color:var(--mp-color-text);font:14px/1.5 sans-serif}main{max-width:780px;margin:auto;padding:20px}h1{font-size:20px}label{display:inline-flex;gap:8px;align-items:center;margin:6px 14px 6px 0}select,button{font:inherit;padding:6px}section{padding:16px 0;border-top:1px solid #ccc}output{display:block;overflow-wrap:anywhere;margin:8px 0}.controls{display:flex;flex-wrap:wrap}.controls button{margin:6px}code{font-size:12px}
</style></head><body><main id="app"></main><script type="module">
import {createApp,h,ref} from 'vue'
import Select from '/src/select/index.ts'
import Cascader from '/src/cascader/index.ts'
import '/src/select/style/index.ts'
import '/src/cascader/style/index.ts'
import DateField from '/src/date/index.ts'
import DateRange from '/src/date-range/index.ts'
import Time from '/src/time/index.ts'
import TimeRange from '/src/time-range/index.ts'
import DatePicker from '/src/date/DatePicker.vue'
import DateRangePicker from '/src/date-range/DateRangePicker.vue'
import TimePicker from '/src/time/TimePicker.vue'
import TimeRangePicker from '/src/time-range/TimeRangePicker.vue'
import '/src/date/style/index.ts'
import '/src/date-range/style/index.ts'
import '/src/time/style/index.ts'
import '/src/time-range/style/index.ts'
const triggerTarget=ref('icon'),editable=ref('true'),opened=ref(false);
const kind=ref('date'),host=ref('direct'),mode=ref('picker'),dateFields=ref('month,day'),timeFields=ref('hour,minute'),value=ref('2024-02-28'),selection=ref(null),commits=ref(0),cancels=ref(0),key=ref(0)
const isRange=()=>kind.value.includes('range'), isDate=()=>kind.value.startsWith('date'), showTime=()=>kind.value.startsWith('datetime')
function reset(empty=false){opened.value=false;const point=['select','cascader'].includes(kind.value)?'a':isDate()?(showTime()?'2024-02-28 09:30:17':'2024-02-28'):'09:30:17';const end=isDate()?(showTime()?'2024-03-02 18:00:23':'2024-03-02'):'18:00:23';value.value=empty?(isRange()?[]:undefined):(isRange()?[point,end]:point);selection.value=null;commits.value=0;cancels.value=0;key.value++}
function select(label,state,options,changed){return h('label',[label,h('select',{'aria-label':label,value:state.value,onChange:e=>{state.value=e.target.value;changed?.()}},options.map(([v,text])=>h('option',{value:v},text)))])}
createApp({render(){const date=isDate(),range=isRange(),independent=host.value==='standalone';const component=kind.value==='select'?Select:kind.value==='cascader'?Cascader:date?(range?(independent?DateRangePicker:DateRange):(independent?DatePicker:DateField)):(range?(independent?TimeRangePicker:TimeRange):(independent?TimePicker:Time));const props={style:{width:'320px',maxWidth:'100%'},openTriggerTarget:triggerTarget.value,onOpenChange:v=>opened.value=v,...(['select','cascader'].includes(kind.value)?{filterable:true,options:[{value:'a',label:'Alpha'},{value:'b',label:'Beta'}]}:{}),key:key.value,modelValue:value.value,disableConfirm:false,'onUpdate:modelValue':v=>{value.value=v;commits.value++},onSelect:v=>selection.value=v,onCancel:()=>cancels.value++,...(independent?{presentation:date?mode.value:undefined}:{editMode:host.value,inputEditable:editable.value==='true','aria-label':'验收字段',...(date?{panelType:mode.value}:{})}),...(date?{dateFields:dateFields.value.split(','),showTime:showTime(),format:showTime()?'YYYY-MM-DD HH:mm:ss':'YYYY-MM-DD',valueFormat:showTime()?'YYYY-MM-DD HH:mm:ss':'YYYY-MM-DD'}:{format:'HH:mm:ss'}),timeFields:timeFields.value.split(',')};return [h('h1','日期时间字段浏览器验收'),h('div',{class:'controls'},[select('组件',kind,[['date','日期'],['datetime','日期时间'],['date-range','日期范围'],['datetime-range','日期时间范围'],['time','时间'],['time-range','时间范围'],['select','Select'],['cascader','Cascader']],()=>reset()),select('打开区域',triggerTarget,[['field','整个字段'],['icon','仅右侧图标']]),select('允许编辑',editable,[['true','允许'],['false','只读文本可复制']]),select('容器',host,[['standalone','独立面板'],['direct','输入框浮层'],['popup','弹出面板']],()=>reset()),date?select('模式',mode,[['picker','Picker 滚轮'],['calendar','日历']]):null,date?select('日期列',dateFields,[['year,month,day','年 / 月 / 日'],['month,day','月 / 日'],['day,month','日 / 月'],['month','仅月']]):null,select('时间列',timeFields,[['hour,minute,second','时 / 分 / 秒'],['hour,minute','时 / 分'],['minute,hour','分 / 时'],['second','仅秒']]),h('button',{onClick:()=>reset()},'恢复示例值'),h('button',{onClick:()=>reset(true)},'清空模型')]),h('section',{'aria-label':'真实组件'},[h(component,props)]),h('section',{'aria-label':'事件与提交'},[h('output',{'aria-label':'面板状态'},'面板状态：'+opened.value),h('output',{'aria-label':'提交值'},'提交值：'+JSON.stringify(value.value??null)),h('output',{'aria-label':'草稿事件'},'草稿事件：'+JSON.stringify(selection.value)),h('output',{'aria-label':'提交次数'},'提交次数：'+commits.value),h('output',{'aria-label':'取消次数'},'取消次数：'+cancels.value),h('p','隐藏年份与秒保留在完整模型中；切换配置不应提交，关闭应丢弃草稿。')])]} }).mount('#app')
</script></body></html>`
const server = await createServer({
  root,
  configFile: false,
  optimizeDeps: { entries: [], include: ['vue'] },
  plugins: [
    vue(),
    jsx(),
    {
      name: 'temporal-browser-acceptance',
      configureServer(s) {
        s.middlewares.use('/__temporal-fields', async (_req, res) => {
          res.setHeader('Content-Type', 'text/html')
          res.end(await server.transformIndexHtml('/__temporal-fields.html', html))
        })
      },
    },
  ],
  server: { host: '127.0.0.1', port: 0 },
})
await server.listen()
console.log(`Browser acceptance: http://127.0.0.1:${server.httpServer.address().port}/__temporal-fields`)
