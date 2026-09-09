import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import Card from './Card.vue'
import { cardProps } from './props'

withInstall(Card)
withPropsDefaultsSetter(Card, cardProps)

export { cardProps }
export type { CardProps, CardVariant, CardSize, CardDirection, CardFit } from './props'

export type CardInstance = InstanceType<typeof Card>
export const _CardComponent: typeof Card = Card

export default Card
