import { isPlainObject } from '@maplejs/maple-shared'
import { commands, env, Range, Selection, Uri, ViewColumn, window, type ExtensionContext } from 'vscode'
import { envs } from './env'

interface OpenPlaygroundOptions {
  selectionWrapTemplate?: boolean
  selection?: boolean
}

function openPlayground(options: OpenPlaygroundOptions = {}) {
  const { selectionWrapTemplate = false, selection = false } = options
  const { activeTextEditor } = window

  if (!activeTextEditor || !selection) {
    env.openExternal(Uri.parse(envs().playground))
    return
  }

  const range = new Range(activeTextEditor.selection.start, activeTextEditor.selection.end)
  let text = activeTextEditor.document.getText(range)

  if (!text.trim()) {
    env.openExternal(Uri.parse(envs().playground))
    return
  }

  if (selectionWrapTemplate) {
    text = `<template>\n${text}\n</template>`
  }

  const file = { 'App.vue': text }
  const hash = btoa(unescape(encodeURIComponent(JSON.stringify(file))))
  env.openExternal(Uri.parse(`${envs().playground}#${hash}`))
}

function openDocumentation() {
  env.openExternal(Uri.parse(`${envs().t('documentation')}/home`))
}

function openWebview(url: string) {
  const panel = window.createWebviewPanel('maple-webview', 'Maple Webview', ViewColumn.One, {
    enableScripts: true,
  })

  panel.webview.html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Maple Webview</title>
    <style>
      body {
        margin: 0;
      }

      iframe {
        width: 100vw;
        height: 100vh;
        border: none;
      }
    </style>
  </head>
  <body>
    <iframe src="${url}"></iframe>
  </body>

  <script>
    const vscode = acquireVsCodeApi();
  
    window.addEventListener('message', ({ data }) => {
      vscode.postMessage(data)
    })
  </script>
</html>`

  panel.webview.onDidReceiveMessage((data) => {
    if (isPlainObject(data) && data.eventType === 'copy') {
      env.clipboard.writeText(data.text)
    }
  })
}

export function registerCommands(context: ExtensionContext) {
  context.subscriptions.push(
    commands.registerCommand('maple.move-cursor', (characterDelta: number) => {
      const active = window.activeTextEditor!.selection.active!
      const position = active.translate({ characterDelta })
      window.activeTextEditor!.selection = new Selection(position, position)
    }),

    commands.registerCommand('maple.open-documentation', () => {
      openDocumentation()
    }),

    commands.registerCommand('maple.open-playground', () => {
      openPlayground({ selection: false })
    }),

    commands.registerCommand('maple.open-playground-by-selection', () => {
      openPlayground({ selection: true })
    }),

    commands.registerCommand('maple.open-playground-by-selection-and-wrap-template-tag', () => {
      openPlayground({ selection: true, selectionWrapTemplate: true })
    }),

    commands.registerCommand('maple.open-webview', openWebview),
  )
}
