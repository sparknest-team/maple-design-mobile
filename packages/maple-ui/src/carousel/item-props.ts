import type { ExtractPropTypes } from 'vue'

/** Carousel items are configured by their parent carousel. */
export const carouselItemProps = {} as const

export type CarouselItemProps = import('vue').ExtractPublicPropTypes<typeof carouselItemProps>
