<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import catalog from './component-catalog.json'

const route = useRoute()
const query = ref('')
const group = ref('all')
const library = ref('all')
const limit = ref(12)
const view = ref('all')
const rowsFor = (component: (typeof catalog.components)[number]) =>
  component.featurePoints.filter(
    (point) =>
      (view.value !== 'supplement' || point.status !== 'demo') &&
      (library.value === 'all' || point.evidence.some((source) => source.library === library.value)),
  )
const increments = computed(() =>
  catalog.improvements.filter(
    (item) =>
      (group.value === 'all' || item.group === group.value) &&
      (library.value === 'all' || item.evidence.some((source) => source.library === library.value)),
  ),
)
const localeLink = (url: string) => {
  const component = url.replace(/^\/components\//, '').replace(/\/$/, '')
  const phone = typeof window !== 'undefined' && window.location.pathname.endsWith('mobile.html')
  return phone ? `/${component}` : `/${route.path.startsWith('/en-US/') ? 'en-US' : 'zh-CN'}/${component}`
}
const filtered = computed(() => {
  const term = query.value.trim().toLocaleLowerCase()
  return catalog.components.filter(
    (component) =>
      (group.value === 'all' || component.group === group.value) &&
      (view.value !== 'supplement' || rowsFor(component).length > 0) &&
      (library.value === 'all' || component.references.some((reference) => reference.library === library.value)) &&
      (!term ||
        [
          component.id,
          component.name,
          component.feature,
          ...component.members,
          ...component.featurePoints.map((point) => point.label),
          ...component.demos.map((demo) => demo.title),
        ]
          .join(' ')
          .toLocaleLowerCase()
          .includes(term)),
  )
})
const visible = computed(() => filtered.value.slice(0, limit.value))
watch([query, group, library, view], () => {
  limit.value = 12
})
function reset() {
  query.value = ''
  group.value = 'all'
  library.value = 'all'
  view.value = 'all'
}
</script>

<template>
  <div class="component-comparison">
    <div class="comparison-summary">
      <span
        ><strong>{{ catalog.components.length }}</strong> 个组件入口</span
      >
      <span
        ><strong>{{ catalog.groups.length }}</strong> 个分类</span
      >
      <span
        ><strong>{{ catalog.libraries.length }}</strong> 套参考库</span
      >
    </div>
    <div class="comparison-filters" role="search" aria-label="查找组件对照">
      <label class="comparison-search"
        >搜索组件或场景
        <input v-model="query" type="search" placeholder="例如 Select、阅读态、列管理" />
      </label>
      <label
        >组件分类
        <select v-model="group">
          <option value="all">全部分类</option>
          <option v-for="item in catalog.groups" :key="item.id" :value="item.id">{{ item.label }}</option>
        </select>
      </label>
      <label
        >参考组件库
        <select v-model="library">
          <option value="all">全部参考库</option>
          <option v-for="item in catalog.libraries" :key="item.id" :value="item.id">{{ item.name }}</option>
        </select>
      </label>
      <label
        >查看内容<select v-model="view">
          <option value="all">全部功能点</option>
          <option value="supplement">只看需补示例或核验的功能</option>
        </select></label
      >
    </div>
    <details v-if="increments.length" class="comparison-priorities">
      <summary>值得补充的重要内容（{{ increments.length }} 项）</summary>
      <article v-for="item in increments" :key="item.id" class="comparison-increment">
        <strong>{{ item.priority }} · {{ item.title }}</strong
        ><span class="comparison-group"> {{ item.kind }}</span>
        <p>{{ item.reason }}</p>
        <p>验收重点：{{ item.acceptance }}</p>
        <a
          v-for="source in item.evidence"
          :key="source.url"
          :href="source.url"
          target="_blank"
          rel="noopener noreferrer"
          >{{ source.name }} 参考案例 ↗</a
        >
      </article>
    </details>
    <p class="comparison-count" role="status">
      找到 {{ filtered.length }} 个组件，当前展示 {{ visible.length }} 个。参考案例来自工作区源码，链接固定到对应提交。
    </p>
    <div v-if="!filtered.length" class="comparison-empty">
      <p>没有匹配的组件，请更换关键词或筛选条件。</p>
      <button type="button" @click="reset">重置筛选</button>
    </div>
    <article v-for="component in visible" :id="`compare-${component.id}`" :key="component.id" class="comparison-card">
      <header>
        <div>
          <span class="comparison-group">{{ catalog.groups.find((item) => item.id === component.group)?.label }}</span>
          <h2>
            <RouterLink :to="localeLink(component.route)"
              >{{ component.name }} <span aria-hidden="true">↗</span></RouterLink
            >
          </h2>
        </div>
        <span class="comparison-demo-count">{{ component.demos.length }} 个现有示例</span>
      </header>
      <p v-if="component.members.length" class="comparison-note">
        同组子组件 / 接口：{{ component.members.join('、') }}
      </p>
      <div v-if="component.coreStrengths?.length" class="comparison-demo-links" aria-label="本库设计特点">
        <RouterLink
          v-for="strength in component.coreStrengths"
          :key="strength.id"
          :to="`/${route.path.startsWith('/en-US/') ? 'en-US' : 'zh-CN'}/showcaseStrengths`"
          >{{ strength.title }}</RouterLink
        >
      </div>
      <p class="comparison-feature">{{ component.feature }}</p>
      <p v-if="component.topics.length" class="comparison-note">本库示例主题：{{ component.topics.join('、') }}</p>
      <div class="comparison-demo-links" aria-label="Cedar 示例">
        <RouterLink
          v-for="(demo, index) in component.demos.slice(0, 5)"
          :key="`${demo.source}-${index}`"
          :to="localeLink(component.route) + '#' + demo.anchor"
          >{{ demo.title }}</RouterLink
        >
        <RouterLink v-if="component.demos.length > 5" :to="localeLink(component.route)"
          >查看全部 {{ component.demos.length }} 个示例 →</RouterLink
        >
      </div>
      <details v-if="rowsFor(component).length" class="comparison-feature-points">
        <summary>相似功能点逐项对照（{{ rowsFor(component).length }} 项）</summary>
        <div v-for="point in rowsFor(component)" :key="point.id" class="comparison-point">
          <div>
            <strong>{{ point.label }}</strong>
            <span class="comparison-point-status" :data-status="point.status">{{
              point.status === 'demo'
                ? '已有示例'
                : point.status === 'documented'
                  ? '文档已说明，待补专题示例'
                  : '待核验增量'
            }}</span>
          </div>
          <div class="comparison-demo-links">
            <RouterLink
              v-for="demo in point.demos"
              :key="demo.source"
              :to="localeLink(component.route) + (demo.anchor ? '#' + demo.anchor : '')"
              >{{ demo.title }}</RouterLink
            >
          </div>
          <p v-if="point.documentation" class="comparison-note">文档依据：{{ point.documentation }}</p>
          <div class="comparison-demo-links">
            <a
              v-for="source in point.evidence.filter((source) => library === 'all' || source.library === library)"
              :key="source.library"
              :href="source.url"
              target="_blank"
              rel="noopener noreferrer"
              >{{ source.name }}：{{ source.title }} ↗</a
            >
          </div>
        </div>
      </details>
      <details v-if="component.references.length" class="comparison-references">
        <summary>
          对照其他组件库的示例 <span>{{ component.references.length }} 套参考</span>
        </summary>
        <div
          v-for="reference in component.references.filter((item) => library === 'all' || item.library === library)"
          :key="reference.library"
          class="comparison-reference"
        >
          <div class="comparison-reference-heading">
            <a :href="reference.url" target="_blank" rel="noopener noreferrer">{{ reference.name }} ↗</a
            ><span>{{ reference.type }} · {{ reference.relation }} · {{ reference.exampleCount }} 份示例源码</span>
          </div>
          <p v-if="reference.topics.length" class="comparison-note">参考示例主题：{{ reference.topics.join('、') }}</p>
          <ul>
            <li v-for="sample in reference.samples" :key="sample.file">
              <a :href="sample.url" target="_blank" rel="noopener noreferrer">{{ sample.title }}</a>
            </li>
          </ul>
        </div>
      </details>
      <p v-else class="comparison-note">该业务集成没有收录直接对应的参考示例；请结合其业务服务接入方式单独评估。</p>
    </article>
    <button v-if="visible.length < filtered.length" class="comparison-more" type="button" @click="limit += 12">
      继续展示（剩余 {{ filtered.length - visible.length }} 个）
    </button>
  </div>
</template>

<style scoped>
.component-comparison {
  min-width: 0;
}
.comparison-feature-points summary,
.comparison-priorities summary,
.comparison-references summary {
  min-height: 44px;
  padding-top: 8px;
  padding-bottom: 8px;
}
.comparison-summary {
  display: flex;
  flex-wrap: wrap;
  gap: 12px 28px;
  margin: 24px 0;
  padding: 20px;
  background: var(--mp-color-fill-1);
  border-radius: 10px;
  color: var(--mp-color-text-2);
}
.comparison-summary strong {
  font-size: 24px;
  color: var(--mp-sys-color-content-primary);
  margin-right: 6px;
}
.comparison-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
}
.comparison-filters label {
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1 1 160px;
  color: var(--mp-color-text-2);
  font-size: 13px;
  min-width: 0;
}
.comparison-filters .comparison-search {
  flex: 2 1 240px;
}
.comparison-filters input,
.comparison-filters select {
  box-sizing: border-box;
  width: 100%;
  min-height: 44px;
  padding: 8px 10px;
  border: 1px solid var(--mp-color-border-2);
  border-radius: 6px;
  color: var(--mp-color-text-1);
  background: var(--mp-color-bg-1);
  font: inherit;
}
.comparison-priorities {
  margin-top: 20px;
  padding: 16px;
  background: var(--mp-color-fill-1);
  border-radius: 8px;
}
.comparison-priorities summary,
.comparison-feature-points summary {
  cursor: pointer;
  line-height: 1.8;
}
.comparison-increment {
  margin-top: 18px;
  border-top: 1px solid var(--mp-color-border-2);
  padding-top: 14px;
}
.comparison-increment p {
  font-size: 13px;
  line-height: 1.8;
}
.comparison-feature-points {
  margin-top: 18px;
  border-top: 1px solid var(--mp-color-border-2);
  padding-top: 14px;
}
.comparison-point {
  padding: 14px 0;
  border-bottom: 1px solid var(--mp-color-border-2);
}
.comparison-point > div {
  margin: 8px 0;
}
.comparison-point-status {
  display: inline-block;
  font-size: 12px;
  color: var(--mp-color-text-2);
  margin-left: 8px;
}
.comparison-point-status[data-status='candidate'] {
  color: var(--mp-color-warning);
}
.comparison-count,
.comparison-note {
  color: var(--mp-color-text-3);
  font-size: 13px;
  line-height: 1.8;
}
.comparison-card {
  border: 1px solid var(--mp-color-border-2);
  border-radius: 12px;
  padding: 22px;
  margin: 16px 0;
  overflow-wrap: anywhere;
}
.comparison-card header {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 12px;
  align-items: center;
}
.comparison-group {
  color: var(--mp-color-text-3);
  font-size: 12px;
}
.comparison-card h2 {
  margin: 8px 0 0;
  padding: 0;
  font-size: 20px;
}
.comparison-card h2 a {
  color: var(--mp-color-text-1);
}
.comparison-card h2 a:hover {
  color: var(--mp-sys-color-content-primary);
}
.comparison-demo-count {
  color: var(--mp-color-text-3);
  font-size: 12px;
}
.comparison-feature {
  line-height: 1.9;
  color: var(--mp-color-text-2);
}
.comparison-demo-links {
  display: flex;
  gap: 8px 16px;
  flex-wrap: wrap;
  font-size: 13px;
}
.comparison-references {
  margin-top: 20px;
  border-top: 1px solid var(--mp-color-border-2);
  padding-top: 14px;
}
.comparison-references summary {
  cursor: pointer;
  color: var(--mp-color-text-2);
  line-height: 1.8;
}
.comparison-references summary span {
  font-size: 12px;
  margin-left: 10px;
  color: var(--mp-color-text-3);
}
.comparison-reference {
  padding: 14px 0;
  border-bottom: 1px solid var(--mp-color-border-2);
}
.comparison-reference:last-child {
  border-bottom: 0;
  padding-bottom: 0;
}
.comparison-reference-heading {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 16px;
  align-items: baseline;
}
.comparison-reference-heading span {
  color: var(--mp-color-text-3);
  font-size: 12px;
}
.comparison-reference ul {
  display: flex;
  flex-wrap: wrap;
  gap: 6px 24px;
  padding-left: 18px;
  font-size: 13px;
  margin-bottom: 0;
}
.comparison-more,
.comparison-empty button {
  cursor: pointer;
  padding: 10px 20px;
  border: 1px solid var(--mp-color-border-2);
  border-radius: 6px;
  color: var(--mp-sys-color-content-primary);
  background: var(--mp-color-bg-1);
  font: inherit;
}
.comparison-more {
  display: block;
  margin: 24px auto;
}
.component-comparison :is(input, select, button, summary, a):focus-visible {
  outline: 2px solid var(--mp-color-primary);
  outline-offset: 3px;
}
@media (max-width: 600px) {
  .comparison-card {
    padding: 16px;
  }
  .comparison-filters label {
    flex-basis: 100%;
  }
}
</style>
