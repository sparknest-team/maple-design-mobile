import { computed, effectScope, ref, watch } from 'vue'

const day = (offset) => {
  const date = new Date()
  date.setDate(date.getDate() + offset)
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}
const clone = (value) => JSON.parse(JSON.stringify(value))
export function initialProjects() {
  return [
    ['服务门户升级', '产品团队', '研发', 48000, 3, 5, '高'],
    ['品牌视觉更新', '设计团队', '设计', 26000, 0, 12, '普通'],
    ['设备巡检计划', '运营团队', '运营', 18000, 2, -1, '高'],
    ['移动端体验走查', '研发团队', '研发', 12000, 4, -2, '普通'],
    ['设计资产整理', '设计团队', '设计', 8000, 3, 8, '普通'],
    ['季度服务回访', '运营团队', '运营', 6000, 0, 15, '普通'],
  ].map(([name, owner, category, budget, completed, due, priority], index) => ({
    key: `P-${1001 + index}`,
    name,
    owner,
    category,
    budget,
    priority,
    description: `${name}覆盖需求确认、执行交付和验收。请按任务清单推进，并在操作记录中补充进展。`,
    startDate: day(-8),
    dueDate: day(due),
    archived: false,
    tasks: ['需求确认', '方案准备', '执行交付', '验收归档'].map((title, i) => ({
      key: `task-${i}`,
      title,
      done: i < completed,
    })),
    progress: completed * 25,
    status: completed === 4 ? '已完成' : completed ? '进行中' : '待启动',
  }))
}
export function projectError(project) {
  if (!project.name?.trim() || !project.owner?.trim()) {
    return '项目名称和负责人不能为空。'
  }
  if (!Number.isFinite(Number(project.budget)) || Number(project.budget) < 0) {
    return '预算必须为非负金额。'
  }
  if (project.startDate && project.dueDate && project.startDate > project.dueDate) {
    return '截止日期不能早于开始日期。'
  }
  return ''
}
export function createPracticeWorkspace(storage = null, storageKey = 'practice-workspace-v3') {
  const rows = ref(initialProjects())
  const favorites = ref([])
  const activity = ref([{ key: 'initial', project: 'P-1001', text: '示例工作区已就绪', at: new Date().toISOString() }])
  const savedDraft = ref(null)
  const latest = ref(null)
  let sequence = 1006
  let applyingSnapshot = false
  function applySnapshot(saved) {
    if (
      saved?.version !== 3 ||
      !Array.isArray(saved.rows) ||
      !saved.rows.length ||
      !saved.rows.every((row) => typeof row.key === 'string' && !projectError(row) && Array.isArray(row.tasks))
    ) {
      return false
    }
    rows.value = saved.rows
    favorites.value = Array.isArray(saved.favorites)
      ? saved.favorites.filter((id) => rows.value.some((row) => row.key === id))
      : []
    activity.value = Array.isArray(saved.activity) ? saved.activity.slice(0, 100) : []
    savedDraft.value = saved.savedDraft && typeof saved.savedDraft === 'object' ? saved.savedDraft : null
    latest.value = typeof saved.latest === 'string' ? saved.latest : null
    sequence = Math.max(1006, ...rows.value.map((row) => Number(row.key.replace('P-', '')) || 0))
    return true
  }
  if (storage) {
    try {
      applySnapshot(JSON.parse(storage.getItem(storageKey) || 'null'))
    } catch {
      /* Invalid data is ignored. */
    }
  }
  const syncStorage = (event) => {
    if (event.key !== storageKey || !event.newValue || event.storageArea !== storage) {
      return
    }
    try {
      applyingSnapshot = true
      applySnapshot(JSON.parse(event.newValue))
    } catch {
      /* Keep the current workspace. */
    } finally {
      applyingSnapshot = false
    }
  }
  let observingStorage = false
  if (storage && typeof window !== 'undefined') {
    try {
      if (storage === window.sessionStorage) {
        window.addEventListener('storage', syncStorage)
        observingStorage = true
      }
    } catch {
      /* Storage can be restricted. */
    }
  }
  const scope = effectScope(true)
  if (storage) {
    scope.run(() =>
      watch(
        [rows, favorites, activity, savedDraft, latest],
        () => {
          if (applyingSnapshot) {
            return
          }
          try {
            storage.setItem(
              storageKey,
              JSON.stringify({
                version: 3,
                rows: rows.value,
                favorites: favorites.value,
                activity: activity.value,
                savedDraft: savedDraft.value,
                latest: latest.value,
              }),
            )
          } catch {
            /* Keep the in-memory workspace usable. */
          }
        },
        { deep: true, flush: 'sync' },
      ),
    )
  }
  function record(project, text) {
    activity.value.unshift({
      key: `event-${Date.now()}-${activity.value.length}`,
      project,
      text,
      at: new Date().toISOString(),
    })
    activity.value = activity.value.slice(0, 100)
  }
  function save(payload, id) {
    if (projectError(payload)) {
      return null
    }
    const fields = {
      name: payload.name.trim(),
      owner: payload.owner.trim(),
      category: payload.category,
      budget: Number(payload.budget),
      description: payload.description || '',
      priority: payload.priority || '普通',
      startDate: payload.startDate || '',
      dueDate: payload.dueDate || '',
    }
    let row = rows.value.find((item) => item.key === id)
    if (id && !row) {
      return null
    }
    if (row) {
      Object.assign(row, fields)
      record(row.key, `更新项目资料：${row.name}`)
    } else {
      row = {
        ...fields,
        key: `P-${++sequence}`,
        status: '待启动',
        progress: 0,
        archived: false,
        tasks: ['需求确认', '方案准备', '执行交付', '验收归档'].map((title, i) => ({
          key: `task-${i}`,
          title,
          done: false,
        })),
      }
      rows.value.unshift(row)
      latest.value = row.key
      record(row.key, `创建项目：${row.name}`)
    }
    return row
  }
  function finish(row) {
    row.tasks.forEach((task) => {
      task.done = true
    })
    row.status = '已完成'
    row.progress = 100
    record(row.key, `项目交付完成：${row.name}`)
  }
  function archive(ids, archived = true) {
    rows.value
      .filter((row) => ids.includes(row.key))
      .forEach((row) => {
        row.archived = archived
        record(row.key, `${archived ? '归档' : '恢复'}项目：${row.name}`)
      })
  }
  function toggleTask(row, key, done) {
    const task = row.tasks.find((item) => item.key === key)
    if (!task) {
      return
    }
    task.done = done
    row.progress = Math.round((row.tasks.filter((item) => item.done).length / row.tasks.length) * 100)
    row.status = row.progress === 100 ? '已完成' : row.progress ? '进行中' : '待启动'
    record(row.key, `${done ? '完成' : '重新打开'}任务：${task.title}`)
  }
  function note(row, text) {
    const value = text.trim()
    if (!value) {
      return false
    }
    record(row.key, `跟进：${value}`)
    return true
  }
  function favorite(row) {
    favorites.value = favorites.value.includes(row.key)
      ? favorites.value.filter((id) => id !== row.key)
      : [...favorites.value, row.key]
  }
  function reset() {
    rows.value = initialProjects()
    favorites.value = []
    savedDraft.value = null
    latest.value = null
    activity.value = []
    sequence = 1006
    record('', '工作区已恢复初始数据')
  }
  return {
    rows,
    favorites,
    activity,
    savedDraft,
    latest,
    save,
    finish,
    archive,
    toggleTask,
    note,
    favorite,
    reset,
    dispose: () => {
      scope.stop()
      if (observingStorage) {
        window.removeEventListener('storage', syncStorage)
      }
    },
  }
}
let browserWorkspace
export function usePracticeData(workspace) {
  if (!workspace) {
    if (typeof window === 'undefined') {
      workspace = createPracticeWorkspace()
    } else {
      let storage = null
      try {
        storage = window.sessionStorage
      } catch {
        /* No storage access. */
      }
      workspace = browserWorkspace ??= createPracticeWorkspace(storage, 'maple-practice-workspace-v3')
    }
  }
  const { rows, favorites, activity, savedDraft, latest } = workspace
  const query = ref({ keyword: '', status: '全部', category: '全部', archived: false, favorites: false })
  const applied = ref({ ...query.value })
  const current = ref(1),
    selected = ref([]),
    notice = ref('项目在各页面间共享；刷新保留本次浏览器会话的数据。')
  const statusOptions = ['全部', '待启动', '进行中', '已完成'].map((value) => ({ value, label: value }))
  const categories = ['研发', '设计', '运营'].map((value) => ({ value, label: value }))
  const categoryOptions = [{ value: '全部', label: '全部类型' }, ...categories]
  const priorities = ['普通', '高', '紧急'].map((value) => ({ value, label: value }))
  const projects = computed(() => rows.value.filter((row) => !row.archived))
  const filtered = computed(() =>
    rows.value.filter(
      (row) =>
        Boolean(row.archived) === applied.value.archived &&
        (!applied.value.keyword ||
          `${row.key} ${row.name} ${row.owner} ${row.category}`
            .toLowerCase()
            .includes(applied.value.keyword.toLowerCase())) &&
        (applied.value.status === '全部' || row.status === applied.value.status) &&
        (applied.value.category === '全部' || row.category === applied.value.category) &&
        (!applied.value.favorites || favorites.value.includes(row.key)),
    ),
  )
  const pageRows = computed(() => filtered.value.slice((current.value - 1) * 4, current.value * 4))
  watch(
    () => filtered.value.length,
    (length) => {
      current.value = Math.min(current.value, Math.max(1, Math.ceil(length / 4)))
    },
    { flush: 'sync' },
  )
  const done = computed(() => projects.value.filter((row) => row.status === '已完成').length)
  const budget = computed(() => projects.value.reduce((sum, row) => sum + row.budget, 0))
  const overdue = computed(
    () => projects.value.filter((row) => row.status !== '已完成' && row.dueDate && row.dueDate < day(0)).length,
  )
  const activeKey = ref(null),
    active = computed(() => rows.value.find((row) => row.key === activeKey.value) ?? null)
  const detailOpen = ref(false),
    createOpen = ref(false),
    archiveOpen = ref(false),
    editingKey = ref(null),
    pendingArchive = ref([])
  const fresh = () => ({
    name: '',
    owner: '',
    category: '研发',
    priority: '普通',
    budget: 0,
    startDate: day(0),
    dueDate: day(7),
    description: '',
  })
  const draft = ref(fresh())
  function search() {
    applied.value = { ...query.value, keyword: query.value.keyword.trim() }
    current.value = 1
    selected.value = []
    notice.value = `查询到 ${filtered.value.length} 个项目。`
  }
  function clear() {
    query.value = { keyword: '', status: '全部', category: '全部', archived: false, favorites: false }
    search()
  }
  function show(row) {
    activeKey.value = row.key
    detailOpen.value = true
  }
  function finish(row) {
    workspace.finish(row)
    notice.value = `“${row.name}”已完成，统计与详情已同步。`
  }
  function finishSelected() {
    const batch = filtered.value.filter((row) => selected.value.includes(row.key))
    batch.forEach(workspace.finish)
    notice.value = `已完成 ${batch.length} 个选中项目。`
    selected.value = []
  }
  function startCreate() {
    editingKey.value = null
    draft.value = fresh()
    createOpen.value = true
  }
  function startEdit(row) {
    editingKey.value = row.key
    draft.value = clone(row)
    createOpen.value = true
  }
  function create({ errors } = {}) {
    if (errors || projectError(draft.value)) {
      notice.value = errors ? '请修正表单中的必填项。' : projectError(draft.value)
      return null
    }
    const row = workspace.save(draft.value, editingKey.value)
    if (!row) {
      return null
    }
    const editing = Boolean(editingKey.value)
    createOpen.value = false
    clear()
    notice.value = `已${editing ? '保存' : '创建'}“${row.name}”。`
    return row
  }
  function requestArchive(ids) {
    pendingArchive.value = ids
    archiveOpen.value = true
  }
  function confirmArchive() {
    workspace.archive(pendingArchive.value)
    selected.value = []
    archiveOpen.value = false
    notice.value = '项目已归档，可在归档筛选中恢复。'
  }
  function restore(row) {
    workspace.archive([row.key], false)
    notice.value = `已恢复“${row.name}”。`
  }
  function favorite(row) {
    workspace.favorite(row)
    notice.value = `已收藏 ${favorites.value.length} 个项目。`
  }
  function reset() {
    workspace.reset()
    clear()
    activeKey.value = null
    detailOpen.value = false
    createOpen.value = false
    selected.value = []
    notice.value = '已重置整个演示工作区。'
  }
  function csv() {
    const escape = (value) =>
      `"${String(typeof value === 'string' && /^[=+@-]/.test(value) ? `'${value}` : value).replace(/"/g, '""')}"`
    return (
      '\ufeff' +
      [
        ['项目编号', '项目名称', '负责人', '类型', '状态', '预算', '截止日期'],
        ...filtered.value.map((row) => [
          row.key,
          row.name,
          row.owner,
          row.category,
          row.status,
          row.budget,
          row.dueDate,
        ]),
      ]
        .map((line) => line.map(escape).join(','))
        .join('\r\n')
    )
  }
  function exportCsv() {
    const url = URL.createObjectURL(new Blob([csv()], { type: 'text/csv;charset=utf-8' }))
    const link = document.createElement('a')
    link.href = url
    link.download = '项目查询结果.csv'
    link.click()
    setTimeout(() => URL.revokeObjectURL(url), 1000)
    notice.value = `已导出 ${filtered.value.length} 条查询结果。`
  }
  return {
    workspace,
    rows,
    projects,
    favorites,
    activity,
    savedDraft,
    latest,
    query,
    applied,
    current,
    selected,
    notice,
    statusOptions,
    categories,
    categoryOptions,
    priorities,
    filtered,
    pageRows,
    done,
    budget,
    overdue,
    activeKey,
    active,
    detailOpen,
    createOpen,
    archiveOpen,
    editingKey,
    draft,
    fresh,
    search,
    clear,
    show,
    finish,
    finishSelected,
    startCreate,
    startEdit,
    create,
    requestArchive,
    confirmArchive,
    restore,
    favorite,
    reset,
    exportCsv,
    csv,
  }
}
if (import.meta.hot) {
  import.meta.hot.dispose(() => {
    browserWorkspace?.dispose()
    browserWorkspace = undefined
  })
}
