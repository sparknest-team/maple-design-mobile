import { withInstall } from '../utils/components'
import { sectionProps } from './props'
import SectionSource from './Section.vue'

const Section = withInstall(SectionSource)

export { Section, sectionProps }
export type {
  SectionProps,
  SectionSlots,
  SectionSize,
  SectionMarkerPlacement,
  SectionStatus,
  SectionVariant,
} from './props'
export type SectionInstance = InstanceType<typeof Section>
export const _SectionComponent: typeof Section = Section
export default Section
