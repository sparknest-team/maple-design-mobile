import { reactive } from 'vue'

interface Context {
  zIndex: number
  enableRipple: boolean
}

const context: Context = {
  zIndex: 2000,
  enableRipple: true,
}

export const _ContextComponent = reactive<Context>(context)

export default reactive<Context>(context)
