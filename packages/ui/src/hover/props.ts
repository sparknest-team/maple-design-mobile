export { props, props as hoverOverlayProps } from './overlay-props'
export type HoverOverlayProps = import('../_utils/public-props').CompatiblePublicProps<
  typeof import('./overlay-props').props
>
