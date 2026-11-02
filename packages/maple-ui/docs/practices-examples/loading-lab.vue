<script setup lang="ts">
import { computed, markRaw, onBeforeUnmount, reactive, ref } from 'vue'
import MpButton from '../../src/button'
import '../../src/button/style'
import MpSplitButton from '../../src/split-button'
import '../../src/split-button/style'
import MpLink from '../../src/link'
import '../../src/link/style'
import MpSwitch from '../../src/switch'
import '../../src/switch/style'
import MpTag from '../../src/tag'
import '../../src/tag/style'
import MpInput from '../../src/input'
import '../../src/input/style'
import MpTextarea from '../../src/textarea'
import '../../src/textarea/style'
import MpInputNumber from '../../src/input-number'
import '../../src/input-number/style'
import MpSelect from '../../src/select'
import '../../src/select/style'
import MpCascader from '../../src/cascader'
import '../../src/cascader/style'
import MpAutoComplete from '../../src/auto-complete'
import '../../src/auto-complete/style'
import MpDate from '../../src/date'
import '../../src/date/style'
import MpDateRange from '../../src/date-range'
import '../../src/date-range/style'
import MpTime from '../../src/time'
import '../../src/time/style'
import MpTimeRange from '../../src/time-range'
import '../../src/time-range/style'
import MpPeopleSelect from '../../src/people-select'
import '../../src/people-select/style'
import MpSearch from '../../src/search'
import '../../src/search/style'
import MpFieldDecorator from '../../src/field-decorator'
import '../../src/field-decorator/style'
import MpTable from '../../src/table'
import '../../src/table/style'
import MpList from '../../src/list'
import '../../src/list/style'
import MpSkeleton from '../../src/skeleton'
import '../../src/skeleton/style'
import MpLoading from '../../src/loading'
import '../../src/loading/style'
import MpPopup from '../../src/popup'
import '../../src/popup/style'
import MpSwipeCell from '../../src/swipe-cell'
import '../../src/swipe-cell/style'
import MpTabBar, { TabBarItem as MpTabBarItem } from '../../src/tab-bar'
import '../../src/tab-bar/style'
import MpForm, { FormItem as MpFormItem } from '../../src/form'
import '../../src/form/style'
import MpDialog from '../../src/dialog'
import '../../src/dialog/style'

const cities = [
  { label: '上海', value: 'shanghai' },
  { label: '杭州', value: 'hangzhou' },
]
const venues = [{ label: '上海', value: 'shanghai', children: [{ label: '设计中心', value: 'studio' }] }]
const fieldCards = [
  {
    id: 'input',
    component: markRaw(MpInput),
    title: '姓名',
    description: '查询报名信息',
    props: { defaultValue: '林小满', placeholder: '姓名' },
    text: '',
    lockable: true,
  },
  {
    id: 'textarea',
    component: markRaw(MpTextarea),
    title: '备注',
    description: '保存报名备注',
    props: { defaultValue: '希望参加设计工作坊', placeholder: '备注' },
    text: '',
    lockable: true,
  },
  {
    id: 'input-number',
    component: markRaw(MpInputNumber),
    title: '同行人数',
    description: '更新人数',
    props: { defaultValue: 2, min: 1 },
    text: '',
    lockable: true,
  },
  {
    id: 'select',
    component: markRaw(MpSelect),
    title: '活动城市',
    description: '读取候选城市',
    props: { defaultValue: 'shanghai', options: cities, editMode: 'direct' },
    text: '',
    lockable: true,
  },
  {
    id: 'cascader',
    component: markRaw(MpCascader),
    title: '活动场地',
    description: '读取级联场地',
    props: { options: venues, editMode: 'direct' },
    text: '',
    lockable: true,
  },
  {
    id: 'auto-complete',
    component: markRaw(MpAutoComplete),
    title: '活动搜索',
    description: '查询匹配活动',
    props: { options: ['设计工作坊', '开发者交流'], placeholder: '搜索活动' },
    text: '',
    lockable: true,
  },
  {
    id: 'date',
    component: markRaw(MpDate),
    title: '报名日期',
    description: '读取可选日期',
    props: { editMode: 'direct' },
    text: '',
    lockable: true,
  },
  {
    id: 'date-range',
    component: markRaw(MpDateRange),
    title: '活动日期范围',
    description: '查询可用档期',
    props: { editMode: 'direct' },
    text: '',
    lockable: true,
  },
  {
    id: 'time',
    component: markRaw(MpTime),
    title: '到场时间',
    description: '读取可用时间',
    props: { editMode: 'direct' },
    text: '',
    lockable: true,
  },
  {
    id: 'time-range',
    component: markRaw(MpTimeRange),
    title: '参与时段',
    description: '查询可用时段',
    props: { editMode: 'direct' },
    text: '',
    lockable: true,
  },
  {
    id: 'people-select',
    component: markRaw(MpPeopleSelect),
    title: '同行伙伴',
    description: '读取人员信息',
    props: { options: [{ label: '林小满', value: 'lin' }], editMode: 'direct' },
    text: '',
    lockable: true,
  },
  {
    id: 'search',
    component: markRaw(MpSearch),
    title: '搜索报名',
    description: '查询报名记录',
    props: { placeholder: '输入姓名' },
    text: '',
    lockable: true,
  },
  {
    id: 'field-decorator',
    component: markRaw(MpFieldDecorator),
    title: '通用字段容器',
    description: '观察容器的默认与底线反馈',
    props: {},
    text: '容器内容',
    lockable: true,
  },
]
const actionCards = [
  {
    id: 'button',
    component: markRaw(MpButton),
    title: '提交报名',
    description: '业务控制按钮等待',
    props: {},
    text: '提交报名',
    lockable: true,
  },
  {
    id: 'split-button',
    component: markRaw(MpSplitButton),
    title: '报名操作',
    description: '主按钮等待',
    props: {},
    text: '保存报名',
    lockable: true,
  },
  {
    id: 'link',
    component: markRaw(MpLink),
    title: '查看报名详情',
    description: '链接等待',
    props: {},
    text: '查看详情',
    lockable: true,
  },
  {
    id: 'switch',
    component: markRaw(MpSwitch),
    title: '接收短信',
    description: '开关保存',
    props: { defaultValue: true },
    text: '',
    lockable: true,
  },
  {
    id: 'tag',
    component: markRaw(MpTag),
    title: '参与者身份',
    description: '标签状态更新',
    props: {},
    text: '体验官',
    lockable: true,
  },
]
const groups = [
  { title: '01 · 填写与数据选择', cards: fieldCards },
  { title: '02 · 提交与状态操作', cards: actionCards },
]
const held = ref(false)
const lock = ref(false)
const line = ref(false)
const pending = reactive<Record<string, boolean>>({})
const completed = reactive<Record<string, boolean>>({})
const timers = new Map<string, ReturnType<typeof setTimeout>>()
const ids = [...fieldCards, ...actionCards]
  .map((card) => card.id)
  .concat(['table', 'list', 'skeleton', 'loading', 'popup', 'swipe-cell', 'tab-bar'])

const busyCount = computed(() => ids.filter((id) => isLoading(id)).length)
const status = ref('点击卡片上的「体验等待」，对照加载与恢复。')
function isLoading(id: string) {
  return held.value || Boolean(pending[id])
}
function run(id: string) {
  if (held.value || pending[id]) {
    return
  }
  pending[id] = true
  completed[id] = false
  status.value = `${id} 正在等待；2 秒后恢复。`
  timers.set(
    id,
    setTimeout(() => {
      pending[id] = false
      completed[id] = true
      timers.delete(id)
      status.value = `${id} 已完成，输入内容保留。`
    }, 2000),
  )
}
function runAll() {
  held.value = false
  ids.forEach(run)
}
function reset() {
  held.value = false
  timers.forEach((timer) => clearTimeout(timer))
  timers.clear()
  ids.forEach((id) => {
    pending[id] = false
    completed[id] = false
  })
  status.value = '已恢复全部加载状态，填写内容保留。'
}
const openPopup = ref(false)
const open = ref(false)
const allowClose = ref(true)
const guardStatus = ref('打开报名确认，关闭时等待 2 秒。')
const guardWaits = new Map<ReturnType<typeof setTimeout>, (allowed: boolean) => void>()
function beforeClose() {
  guardStatus.value = '正在检查报名状态…'
  return new Promise<boolean>((resolve) => {
    const timer = setTimeout(() => {
      guardWaits.delete(timer)
      guardStatus.value = allowClose.value ? '检查通过，允许关闭。' : '本次未通过，弹层保留，可再次尝试。'
      resolve(allowClose.value)
    }, 2000)
    guardWaits.set(timer, resolve)
  })
}
onBeforeUnmount(() => {
  reset()
  guardWaits.forEach((resolve, timer) => {
    clearTimeout(timer)
    resolve(false)
  })
  guardWaits.clear()
})
const rows = [
  { key: '1', name: '林小满', event: '设计工作坊' },
  { key: '2', name: '周青', event: '开发者交流' },
]
</script>
<template>
  <div class="loading-lab">
    <header class="loading-lab__hero">
      <p class="loading-lab__eyebrow">LOADING / 活动报名工作台</p>
      <h2>让每一次等待都看得见</h2>
      <p>逐项填写报名信息，观察各组件如何表达等待；也可以保持全部加载，比较位置、尺寸与布局。</p>
      <MpForm layout="vertical">
        <div class="loading-lab__controls">
          <MpFormItem label="全部保持加载"><MpSwitch v-model="held" aria-label="全部保持加载" /></MpFormItem>
          <MpFormItem label="等待时禁止编辑"><MpSwitch v-model="lock" aria-label="等待时禁止编辑" /></MpFormItem>
          <MpFormItem label="文本字段使用底线"><MpSwitch v-model="line" aria-label="文本字段使用底线" /></MpFormItem>
        </div>
      </MpForm>
      <div class="loading-lab__buttons">
        <MpButton @click="runAll">全部等待 2 秒</MpButton><MpButton variant="outline" @click="reset">重置加载</MpButton
        ><span>{{ busyCount }} / {{ ids.length }} 项正在等待</span>
      </div>
      <p role="status" aria-live="polite">{{ status }}</p>
      <small>所有等待均在本地模拟。loading 与 disabled 分别控制；切换底线只影响支持 loading-mode 的字段。</small>
    </header>
    <section v-for="group in groups" :key="group.title" class="loading-lab__section">
      <h3>{{ group.title }}</h3>
      <div class="loading-lab__grid">
        <article v-for="card in group.cards" :key="card.id" class="loading-lab__card" :data-loading-card="card.id">
          <div class="loading-lab__heading">
            <strong>{{ card.title }}</strong
            ><code>{{ card.id }}</code>
          </div>
          <p>{{ card.description }}</p>
          <div class="loading-lab__preview">
            <component
              :is="card.component"
              v-if="card.text"
              v-bind="
                card.id === 'split-button'
                  ? {
                      ...card.props,
                      buttonProps: { loading: isLoading(card.id), disabled: lock && isLoading(card.id) },
                    }
                  : card.props
              "
              :loading="isLoading(card.id)"
              :disabled="lock && isLoading(card.id)"
              @change="run(card.id)"
              >{{ card.text }}</component
            >
            <component
              :is="card.component"
              v-else
              v-bind="
                card.id === 'split-button'
                  ? {
                      ...card.props,
                      buttonProps: { loading: isLoading(card.id), disabled: lock && isLoading(card.id) },
                    }
                  : card.props
              "
              :loading="isLoading(card.id)"
              :loading-mode="line ? 'line' : 'default'"
              :disabled="lock && isLoading(card.id)"
              @change="run(card.id)"
            />
          </div>
          <div class="loading-lab__footer">
            <MpButton size="sm" variant="text" :disabled="isLoading(card.id)" @click="run(card.id)">体验等待</MpButton
            ><span>{{ isLoading(card.id) ? '等待中…' : completed[card.id] ? '已完成' : '就绪' }}</span>
          </div>
        </article>
      </div>
    </section>
    <section class="loading-lab__section">
      <h3>03 · 内容区域</h3>
      <div class="loading-lab__grid">
        <article
          v-for="kind in ['table', 'list', 'skeleton', 'loading']"
          :key="kind"
          class="loading-lab__card"
          :data-loading-card="kind"
        >
          <div class="loading-lab__heading">
            <strong>{{
              {
                table: '报名记录',
                list: '报名清单',
                skeleton: '初次读取占位',
                loading: '通用内容等待',
              }[kind]
            }}</strong
            ><code>{{ kind }}</code>
          </div>
          <div class="loading-lab__preview">
            <MpTable v-if="kind === 'table'" :loading="isLoading(kind)"
              ><thead>
                <tr>
                  <th>参与人</th>
                  <th>活动</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in rows" :key="row.key">
                  <td>{{ row.name }}</td>
                  <td>{{ row.event }}</td>
                </tr>
              </tbody></MpTable
            >
            <MpList v-if="kind === 'list'" :loading="isLoading(kind)"
              ><p>林小满 · 设计工作坊</p>
              <p>周青 · 开发者交流</p></MpList
            >
            <MpSkeleton v-if="kind === 'skeleton'" :loading="isLoading(kind)"
              ><p>报名信息已加载，可以继续填写。</p></MpSkeleton
            >
            <MpLoading v-if="kind === 'loading'" :loading="isLoading(kind)" tip="正在读取报名信息"
              ><p class="loading-lab__placeholder">活动报名内容</p></MpLoading
            >
          </div>
          <div class="loading-lab__footer">
            <MpButton size="sm" variant="text" :disabled="isLoading(kind)" @click="run(kind)">体验等待</MpButton
            ><span>{{ isLoading(kind) ? '等待中…' : '就绪' }}</span>
          </div>
        </article>
        <article class="loading-lab__card" data-loading-card="popup">
          <strong>Popup · 报名详情</strong><MpButton @click="openPopup = true">打开详情弹层</MpButton
          ><MpPopup v-model:open="openPopup" :loading="isLoading('popup')" :before-close="beforeClose"
            ><div class="loading-lab__popup">
              <h3>报名详情</h3>
              <p>等待状态会暂停关闭；关闭前会进行 2 秒检查。</p>
              <MpButton @click="reset">停止加载</MpButton><MpSwitch v-model="allowClose" aria-label="详情内允许关闭" />
              <MpButton @click="openPopup = false">关闭详情</MpButton>
            </div></MpPopup
          ><MpButton size="sm" variant="text" @click="run('popup')">体验等待</MpButton>
        </article>
        <article class="loading-lab__card" data-loading-card="swipe-cell">
          <strong>SwipeCell · 报名操作</strong
          ><MpSwipeCell :loading="isLoading('swipe-cell')" :before-close="beforeClose"
            ><div class="loading-lab__placeholder">向左滑动报名记录</div>
            <template #right><MpButton>取消报名</MpButton></template></MpSwipeCell
          ><MpButton size="sm" variant="text" @click="run('swipe-cell')">体验等待</MpButton>
        </article>
        <article class="loading-lab__card" data-loading-card="tab-bar">
          <strong>TabBar · 报名导航</strong
          ><MpTabBar :loading="isLoading('tab-bar')" :fixed="false" :before-change="beforeClose"
            ><MpTabBarItem name="events" label="活动" /><MpTabBarItem name="mine" label="我的报名" /></MpTabBar
          ><MpButton size="sm" variant="text" @click="run('tab-bar')">体验等待</MpButton>
        </article>
      </div>
    </section>
    <section class="loading-lab__section loading-lab__guard" data-loading-card="dialog">
      <h3>04 · 确认报名与关闭等待</h3>
      <p>关闭弹层时由 before-close 等待 2 秒。关闭检查不通过时保留弹层；可以切换后再次尝试。</p>
      <MpForm layout="vertical"
        ><MpFormItem label="允许关闭"><MpSwitch v-model="allowClose" aria-label="允许关闭" /></MpFormItem
      ></MpForm>
      <MpButton @click="open = true">打开报名确认</MpButton>
      <MpDialog v-model:open="open" title="确认报名" :before-close="beforeClose"
        ><p>请确认活动报名信息。点击确认、取消或关闭，观察等待反馈。</p>
        <MpForm layout="vertical"
          ><MpFormItem label="允许关闭"><MpSwitch v-model="allowClose" aria-label="弹层内允许关闭" /></MpFormItem
        ></MpForm>
        <p role="status">{{ guardStatus }}</p></MpDialog
      >
      <p aria-live="polite">{{ guardStatus }}</p>
    </section>
  </div>
</template>
<style scoped>
.loading-lab {
  color: var(--mp-sys-color-content-primary, inherit);
  min-width: 0;
}
.loading-lab__hero,
.loading-lab__guard {
  padding: 24px;
  border: 1px solid var(--mp-sys-color-outline-default, #dce4e7);
  border-radius: 18px;
  background: var(--mp-sys-color-surface-container, #f5f8f9);
}
.loading-lab__eyebrow {
  letter-spacing: 0.12em;
  font-size: 12px;
  opacity: 0.7;
}
.loading-lab__hero h2 {
  margin: 8px 0 12px;
  font-size: 28px;
}
.loading-lab__controls {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 12px;
}
.loading-lab__buttons,
.loading-lab__footer {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
}
.loading-lab__section {
  margin-block: 28px;
}
.loading-lab__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}
.loading-lab__card {
  min-width: 0;
  padding: 20px;
  border: 1px solid var(--mp-sys-color-outline-default, #dce4e7);
  border-radius: 14px;
}
.loading-lab__card--wide {
  grid-column: 1 / -1;
}
.loading-lab__heading {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}
.loading-lab__heading code {
  font-size: 12px;
  opacity: 0.65;
}
.loading-lab__card p {
  font-size: 13px;
  opacity: 0.8;
}
.loading-lab__preview {
  min-height: 72px;
  padding-block: 18px;
  min-width: 0;
  overflow-wrap: anywhere;
}
.loading-lab__footer {
  justify-content: space-between;
  font-size: 12px;
}
.loading-lab__placeholder,
.loading-lab__popup {
  padding: 24px;
}
.loading-lab__popup {
  min-width: 0;
  max-width: 90vw;
}
@media (max-width: 600px) {
  .loading-lab__grid {
    grid-template-columns: minmax(0, 1fr);
  }
  .loading-lab__hero,
  .loading-lab__card,
  .loading-lab__guard {
    padding: 16px;
  }
  .loading-lab__hero h2 {
    font-size: 24px;
  }
}
</style>
