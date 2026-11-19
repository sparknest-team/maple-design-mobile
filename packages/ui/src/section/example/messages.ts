import { computed } from 'vue'
import { demoEnglish } from '@maple-design/cli-vue/demo-language'

const enUS = {
  history: 'Release history',
  latestRelease: 'Changes in the latest release.',
  exportRelease: 'v1.2 · Added project export',
  variantLabel: 'Section style',
  withTitle: 'Show heading',
  withDescription: 'Show description',
  permissions: 'Member permissions',
  scope: 'Permission changes apply to all project members.',
  admin: 'Administrator',
  manage: 'Manage members and project settings',
  member: 'Member',
  update: 'View the project and update tasks',
  memberDetails: 'Member details',
  name: 'Name',
  department: 'Team',
  latest: 'Show latest',
  all: 'Show all',
  memberRelease: 'v1.1 · Added member management',
}

const zhCN = {
  history: '发布记录',
  latestRelease: '最近一次发布的更新内容。',
  exportRelease: 'v1.2 · 新增项目导出',
  variantLabel: '分组风格',
  withTitle: '显示标题',
  withDescription: '显示说明',
  permissions: '成员权限',
  scope: '权限变更将应用到所有项目成员。',
  admin: '管理员',
  manage: '管理成员、修改项目设置',
  member: '成员',
  update: '查看项目、更新任务',
  memberDetails: '成员信息',
  name: '姓名',
  department: '部门',
  latest: '只看最新',
  all: '查看全部',
  memberRelease: 'v1.1 · 新增成员管理',
} satisfies typeof enUS

export const copy = computed(() => (demoEnglish.value ? enUS : zhCN))
