import 'vue'

declare module 'vue' {
  interface AriaAttributes {
    'aria-description'?: string
  }

  interface InputHTMLAttributes {
    webkitdirectory?: boolean
  }
}
