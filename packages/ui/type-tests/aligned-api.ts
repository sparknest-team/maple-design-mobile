import type {
  AffixProps,
  BadgeProps,
  CardProps,
  MenuProps,
  MenuStrategy,
  MenuSubmenuTrigger,
  MessageProps,
  PaginationProps,
  PopupContainer,
  ProgressProps,
  RateProps,
  SwitchProps,
  TriggerProps,
} from '@maple-design/ui-vue'

const card: CardProps = { variant: 'outline', size: 'sm', direction: 'row' }
const progress: ProgressProps[] = [{}, { size: 24 }, { size: '2rem' }, { size: 'xl' }]
const switches: SwitchProps[] = [{}, { size: 'lg' }]
const rate: RateProps = { size: '1.5rem' }
const affix: AffixProps = { offsetBottom: 0, cssMode: true }
const badge: BadgeProps = { status: 'danger' }
const target: PopupContainer = false
const message: MessageProps = { status: 'danger', popupContainer: target }
const pagination: PaginationProps = { total: 10 }
const trigger: TriggerProps = { popupContainer: false, placement: 'bottom-end', cover: true }
// @ts-expect-error Runtime required properties remain required in published types.
const missingTotal: PaginationProps = {}
// @ts-expect-error Switch only implements sm/md/lg presets.
const badSwitch: SwitchProps = { size: 24 }
// @ts-expect-error Card does not implement lg.
const badCard: CardProps = { size: 'lg' }
// @ts-expect-error Internal refresh tokens must not be publicly exposed.
const internalMessage: MessageProps = { _update: 'private' }
void [
  card,
  progress,
  switches,
  rate,
  affix,
  badge,
  message,
  badSwitch,
  badCard,
  internalMessage,
  pagination,
  trigger,
  missingTotal,
]

// Switch and Progress use the same public types on both platforms.
const fractionalProgress: ProgressProps = { percent: '12.5' }
const tonalSwitch: SwitchProps = {
  variant: 'tonal',
  readonly: true,
  beforeChange: async ({ value }) => value !== 'blocked',
}
// @ts-expect-error Removed Maple alias; use line.
const oldVariant: SwitchProps = { variant: 'standard' }
// @ts-expect-error The callback completes with a boolean, not a payload object.
const oldInterceptor: SwitchProps = { beforeChange: (value, done) => done(value) }
// @ts-expect-error Shadow levels are numbers, not numeric strings.
const oldElevation: SwitchProps = { handleElevation: '4' }
void [fractionalProgress, tonalSwitch, oldVariant, oldInterceptor, oldElevation]

const menuStrategy: MenuStrategy = 'fixed'
const submenuTrigger: MenuSubmenuTrigger = 'click'
const positionedMenu: MenuProps = { strategy: menuStrategy, submenuTrigger }
const defaultMenu: MenuProps = {}
// @ts-expect-error strategy is not a CSS position free-form string
const invalidMenuStrategy: MenuStrategy = 'sticky'
void [positionedMenu, defaultMenu, invalidMenuStrategy]
