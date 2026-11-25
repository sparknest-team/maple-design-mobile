import { withInstall } from '../utils/components'
import CardSource from './Card.vue'
import { cardProps } from './props'

const Card = withInstall(CardSource)

export { cardProps }
export type {
  CardProps,
  CardVariant,
  CardSize,
  CardDirection,
  CardFit,
  CardFooterAlign,
  CardHeadingLevel,
} from './props'

export type CardInstance = InstanceType<typeof Card>
export const _CardComponent: typeof Card = Card

export default Card
