<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import catalog from './component-catalog.json'

const mobileURL =
  typeof window !== 'undefined' && /^(localhost|127\.0\.0\.1)$/.test(window.location.hostname)
    ? 'http://localhost:8080/#/zh-CN/showcase'
    : 'https://maple.show/#/zh-CN/showcase'
const route = useRoute()
const mobile = true
const english = computed(() => route.path.startsWith('/en/') || route.path.startsWith('/en-US/'))
const language = computed(() => (english.value ? 'en-US' : 'zh-CN'))
const link = (id) =>
  mobile ? `/${language.value}/${id}` : `${english.value ? '/en' : ''}/showcase/${id === 'overview' ? '' : id + '/'}`
const topics = [
  {
    id: 'loading',
    doc: 'showcaseLoading',
    title: '加载与等待',
    summary: '报名场景中逐个比较字段、操作与内容区域的等待反馈。',
    tags: 'Loading · Input · Select · beforeClose',
    minutes: 3,
    steps: ['逐项触发 2 秒等待，或保持全部组件加载。', '切换底线与禁用，打开报名确认观察关闭等待。'],
    result: '对照加载位置与布局，等待结束后保留输入；关闭拒绝可重试。',
  },
  {
    id: 'cross-platform',
    doc: 'showcaseCrossPlatform',
    title: '桌面与移动',
    summary: '同一业务模型，按端选择编辑形态。',
    tags: 'Form · Select · Date · Time',
    minutes: 1,
    steps: ['打开部门、日期、时间字段；移动端进入 Popup。', '选择后关闭取消，再重新选择并确认。'],
    result: 'Cedar 直接更新；Maple 确认前不覆盖提交值。',
  },
  {
    id: 'forms',
    doc: 'showcaseForms',
    title: '完整业务表单',
    summary: '从填写校验到确认、失败恢复和提交记录。',
    tags: 'Form · Input · Select · Checkbox',
    minutes: 2,
    steps: ['先提交空任务，观察字段校验。', '填入演示数据，预览后勾选模拟失败并提交。'],
    result: '失败保留草稿；重试成功后才产生提交记录。',
  },
  {
    id: 'themes',
    doc: 'showcaseThemes',
    title: '主题与品牌',
    summary: '品牌、亮暗与局部主题覆盖。',
    tags: 'Token · StyleProvider · Popup',
    minutes: 1,
    steps: ['切换亮暗和品牌，观察文字、边框与背景。', '打开选择弹层，再查看局部主题覆盖。'],
    result: '品牌变化覆盖字段和浮层；局部覆盖不污染相邻区域。',
  },
  {
    id: 'async-selection',
    doc: 'showcaseAsync',
    title: '业务数据选择',
    summary: '业务 ID 回显、候选搜索与数据服务复用。',
    tags: 'PeopleSelect · Select · useAsyncData',
    minutes: 2,
    steps: ['观察只有 ID 的初始值如何展示人员名称。', '搜索候选，切换人员，再查看阅读态操作。'],
    result: '候选数据和已选值解析分离，业务服务可注入。',
  },
  {
    id: 'data-workbench',
    doc: 'showcaseData',
    title: '任务数据工作台',
    summary: '筛选、状态操作和统计使用同一份数据。',
    tags: 'Table · Form · Select · Upload',
    minutes: 2,
    steps: ['查询“运营部”，核对只剩两条任务。', '完成一条任务，再筛选“待处理”。'],
    result: '列表与统计同步；空结果可恢复，支持一键重置。',
  },
  {
    id: 'scheduling',
    doc: 'showcaseTouch',
    title: '移动触控体验',
    summary: '下拉刷新、滑动与可见操作入口。',
    tags: 'PullRefresh · SwipeCell',
    minutes: 3,
    steps: ['下拉刷新，再展开滑动操作。', '体验可见按钮与手势的两种入口。'],
    result: '手势操作有明确反馈，按钮操作同样可达。',
  },
]
const plan = ref('standard')
const query = ref('')
const completed = ref([])
const ready = ref(false)
const storageKey = mobile ? 'maple-showcase-session-v2' : 'cedar-showcase-session-v2'
const plans = [
  { id: 'quick', label: '5 分钟 · 核心亮点', count: 3 },
  { id: 'standard', label: '10 分钟 · 业务闭环', count: 5 },
  { id: 'deep', label: '15 分钟 · 全面体验', count: 7 },
]
const selected = computed(() => topics.slice(0, plans.find((item) => item.id === plan.value)?.count ?? 5))
const filtered = computed(() =>
  selected.value.filter((item) =>
    `${item.title} ${item.summary} ${item.tags} ${item.result}`
      .toLowerCase()
      .includes(query.value.trim().toLowerCase()),
  ),
)
const done = computed(() => selected.value.filter((item) => completed.value.includes(item.id)).length)
const next = computed(() => selected.value.find((item) => !completed.value.includes(item.id)))
const target = (item) => link(mobile ? item.doc : item.id)
onMounted(() => {
  try {
    const saved = JSON.parse(sessionStorage.getItem(storageKey) || 'null')
    if (saved && plans.some((item) => item.id === saved.plan)) {
      plan.value = saved.plan
    }
    if (Array.isArray(saved?.completed)) {
      completed.value = saved.completed.filter((id) => topics.some((item) => item.id === id))
    }
  } catch {
    /* Storage is optional for the presentation. */
  }
  ready.value = true
})
watch(
  [plan, completed],
  () => {
    if (ready.value) {
      try {
        sessionStorage.setItem(storageKey, JSON.stringify({ plan: plan.value, completed: completed.value }))
      } catch {
        /* Continue without persistence. */
      }
    }
  },
  { deep: true },
)
function restart() {
  completed.value = []
  query.value = ''
}
</script>
<template>
  <div class="showcase-hub">
    <section class="showcase-hub__hero">
      <p class="showcase-hub__eyebrow">CEDAR × MAPLE / LIVE SHOWCASE</p>
      <h1>{{ english ? 'Features and scenarios' : '特色与场景' }}</h1>
      <p class="showcase-hub__lead">同一套设计语言，从一个字段到完整业务流程。</p>
      <p>从跨端交互、业务表单、主题和数据联动，看到组件怎样解决真实问题。每个专题都有操作步骤、结果与源码。</p>
      <div class="showcase-hub__actions">
        <RouterLink :to="link(mobile ? 'showcaseStrengths' : 'strengths')">核心特点 →</RouterLink
        ><RouterLink :to="`/${language}/showcasePractices`">最佳实践 →</RouterLink
        ><RouterLink :to="link(mobile ? 'showcaseComponents' : 'components')">对照 10 个组件库 ↗</RouterLink
        ><a v-if="!mobile" :href="mobileURL" target="_blank" rel="noopener noreferrer">移动端专栏 ↗</a>
      </div>
      <dl class="showcase-hub__metrics">
        <div>
          <dt>组件入口</dt>
          <dd>{{ catalog.components.length }}</dd>
        </div>
        <div>
          <dt>能力分类</dt>
          <dd>{{ catalog.groups.length }}</dd>
        </div>
        <div>
          <dt>参考组件库</dt>
          <dd>{{ catalog.libraries.length }}</dd>
        </div>
        <div>
          <dt>场景专题</dt>
          <dd>{{ topics.length }}</dd>
        </div>
      </dl>
    </section>
    <section class="showcase-hub__plan" aria-labelledby="presentation-plan">
      <p class="showcase-hub__eyebrow">PRESENTATION ROUTE</p>
      <h2 id="presentation-plan">今天怎么演示</h2>
      <p>选一条路线，按卡片操作。体验完勾选完成，切回总览后继续下一站。进度只保存在本次浏览器会话。</p>
      <div class="showcase-hub__plans" role="group" aria-label="演示时长">
        <button
          v-for="item in plans"
          :key="item.id"
          type="button"
          :aria-pressed="plan === item.id"
          @click="plan = item.id"
        >
          {{ item.label }}
        </button>
      </div>
      <div class="showcase-hub__progress">
        <progress :value="done" :max="selected.length" aria-label="演示进度" /><span role="status"
          >已体验 {{ done }} / {{ selected.length }} 个专题</span
        ><button type="button" @click="restart">重新开始</button>
      </div>
      <RouterLink v-if="next" :to="target(next)" class="showcase-hub__next"
        >{{ done ? '继续下一站' : '开始演示' }}：{{ next.title }} →</RouterLink
      >
      <p v-else role="status">本路线已完成。可以切换更完整的路线，或进入逐组件对照继续探索。</p>
    </section>
    <section aria-labelledby="scenario-library">
      <div class="showcase-hub__section-title">
        <h2 id="scenario-library">场景与验证</h2>
        <label>查找场景<input v-model="query" type="search" placeholder="例如：Popup、失败、主题、Table" /></label>
      </div>
      <div class="showcase-hub__grid">
        <article v-for="item in filtered" :key="item.id" class="showcase-hub__card">
          <div class="showcase-hub__card-top">
            <span>0{{ topics.indexOf(item) + 1 }} / {{ item.minutes }} 分钟</span
            ><label
              ><input v-model="completed" type="checkbox" :value="item.id" :aria-label="`已体验${item.title}`" />
              已体验</label
            >
          </div>
          <h3>
            <RouterLink :to="target(item)">{{ item.title }} ↗</RouterLink>
          </h3>
          <p>{{ item.summary }}</p>
          <span class="showcase-hub__tags">{{ item.tags }}</span>
          <ol>
            <li v-for="step in item.steps" :key="step">{{ step }}</li>
          </ol>
          <div class="showcase-hub__result">
            <strong>看得见的结果</strong>
            <p>{{ item.result }}</p>
          </div>
          <RouterLink :to="target(item)">打开场景与源码 →</RouterLink>
        </article>
      </div>
      <p v-if="!filtered.length" role="status">没有匹配场景。清空搜索，或选择“全面体验”查看全部专题。</p>
    </section>
    <section class="showcase-hub__closing">
      <h2>把特点讲清楚</h2>
      <p>
        先说明业务问题，再完成一次操作，观察模型或结果，最后展开源码。与其他组件库使用相同任务对照，区分已验证能力和待补充能力。
      </p>
      <RouterLink :to="link(mobile ? 'showcaseComponents' : 'components')"
        >查看逐组件功能、参考 demo 与增量清单 →</RouterLink
      >
    </section>
  </div>
</template>
<style scoped>
:global(.showcase-landing .vp-page-title) {
  display: none;
}
.showcase-hub {
  color: var(--mp-color-text-1);
  min-width: 0;
  padding-bottom: 24px;
}
.showcase-hub__hero {
  padding: 28px;
  border: 1px solid var(--mp-color-border-2);
  border-radius: 16px;
  background: linear-gradient(130deg, var(--mp-color-fill-1), var(--mp-color-bg-1));
}
.showcase-hub__hero h1 {
  font-size: clamp(28px, 4vw, 42px);
  line-height: 1.3;
  margin: 8px 0 12px;
}
.showcase-hub__eyebrow {
  color: var(--mp-sys-color-content-brand);
  font-size: 12px;
  letter-spacing: 0.1em;
  font-weight: 700;
}
.showcase-hub__lead {
  font-size: 20px;
  font-weight: 600;
}
.showcase-hub p,
.showcase-hub li {
  line-height: 1.8;
}
.showcase-hub__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px 24px;
  margin: 20px 0;
}
.showcase-hub a {
  color: var(--mp-sys-color-content-brand);
}
.showcase-hub__metrics {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
  margin: 24px 0 0;
}
.showcase-hub__metrics dt {
  color: var(--mp-color-text-2);
  font-size: 13px;
}
.showcase-hub__metrics dd {
  margin: 4px 0 0;
  font-size: 28px;
  font-weight: 700;
}
.showcase-hub__plan,
.showcase-hub__closing {
  margin: 24px 0;
  padding: 24px;
  border-radius: 12px;
  border: 1px solid var(--mp-color-border-2);
}
.showcase-hub h2 {
  margin: 0;
  font-size: 22px;
}
.showcase-hub__plans {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.showcase-hub button {
  min-height: 44px;
  padding: 8px 12px;
  cursor: pointer;
  color: inherit;
  border: 1px solid var(--mp-color-border-2);
  background: var(--mp-color-bg-1);
  border-radius: 8px;
  font: inherit;
}
.showcase-hub button[aria-pressed='true'] {
  color: var(--mp-sys-color-content-brand);
  border-color: var(--mp-sys-color-content-brand);
  background: var(--mp-color-fill-1);
}
.showcase-hub__progress {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
  margin: 16px 0;
}
.showcase-hub progress {
  accent-color: var(--mp-color-primary);
  max-width: 140px;
}
.showcase-hub__next {
  display: inline-block;
  font-weight: 700;
  padding: 8px 0;
}
.showcase-hub__section-title {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin: 28px 0 16px;
}
.showcase-hub__section-title label {
  display: grid;
  gap: 6px;
  font-size: 13px;
}
.showcase-hub input[type='search'] {
  width: min(100%, 300px);
  box-sizing: border-box;
  min-height: 44px;
  padding: 8px 12px;
  color: inherit;
  background: var(--mp-color-bg-1);
  border: 1px solid var(--mp-color-border-2);
  border-radius: 8px;
  font: inherit;
}
.showcase-hub__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}
.showcase-hub__card {
  padding: 22px;
  border: 1px solid var(--mp-color-border-2);
  border-radius: 12px;
  min-width: 0;
}
.showcase-hub__card-top {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 8px;
  font-size: 13px;
  color: var(--mp-color-text-2);
}
.showcase-hub__card-top label {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-height: 32px;
}
.showcase-hub input[type='checkbox'] {
  accent-color: var(--mp-color-primary);
  width: 18px;
  height: 18px;
}
.showcase-hub h3 {
  margin: 12px 0;
  font-size: 20px;
}
.showcase-hub__tags {
  font-size: 12px;
  color: var(--mp-color-text-2);
  overflow-wrap: anywhere;
}
.showcase-hub__card ol {
  padding-left: 20px;
  margin: 16px 0;
}
.showcase-hub__result {
  padding: 12px;
  background: var(--mp-color-fill-1);
  border-radius: 8px;
  margin: 16px 0;
}
.showcase-hub__result p {
  margin: 6px 0 0;
}
.showcase-hub :is(a, button, input):focus-visible {
  outline: 2px solid var(--mp-color-primary);
  outline-offset: 3px;
}
@media (max-width: 720px) {
  .showcase-hub__grid {
    grid-template-columns: minmax(0, 1fr);
  }
  .showcase-hub__hero,
  .showcase-hub__plan,
  .showcase-hub__closing {
    padding: 20px 16px;
  }
  .showcase-hub__metrics {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
