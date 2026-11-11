import { StatusBarAlignment, window, workspace } from 'vscode'

function getIsInWorkspace(path: string) {
  try {
    require.resolve('@maple-design/ui-vue/package.json', {
      paths: [path],
    })
    return true
  } catch {
    return false
  }
}

export function registerStatusBarItems() {
  const isInWorkspace = workspace.workspaceFolders?.some((workspaceFolder) =>
    getIsInWorkspace(workspaceFolder.uri.fsPath),
  )

  if (isInWorkspace) {
    ;[
      {
        name: 'Maple Documentation',
        priority: 0,
        command: 'maple.open-documentation',
        tooltip: 'Open Maple Documentation',
      },
      {
        name: 'Maple Playground',
        priority: 0,
        command: 'maple.open-playground',
        tooltip: 'Open Maple Playground',
      },
    ].forEach((item) => {
      const statusBarItem = window.createStatusBarItem(StatusBarAlignment.Right, item.priority)
      statusBarItem.command = item.command
      statusBarItem.text = item.name
      statusBarItem.tooltip = item.tooltip
      statusBarItem.show()
    })
  }
}
