import { Link as RootLink, type FieldLoadingProps, type LinkProps as RootProps } from '../src'
import type { FieldLoadingProps as SubpathFieldProps } from '../src/field-decorator'
import { Link, type LinkInstance, type LinkProps, type LinkSize } from '../src/link'

const props: LinkProps = { href: '/report', size: 'md', onClick: (event: MouseEvent) => event.preventDefault() }
const root: RootProps = props
const field: FieldLoadingProps = { loading: true, loadingMode: 'line' }
const subpathField: SubpathFieldProps = field
const size: LinkSize = 'xl'
const instance: LinkInstance | undefined = undefined
// @ts-expect-error click receives MouseEvent
const bad: LinkProps = { onClick: (event: string) => event }
// @ts-expect-error loading modes remain a closed value set
const badField: FieldLoadingProps = { loadingMode: 'custom' }
void [Link, RootLink, root, subpathField, size, instance, bad, badField]
