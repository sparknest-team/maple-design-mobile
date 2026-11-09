import type { AlertProps as RootProps } from '../src'
import type { AlertProps as EntryProps } from '../src/alert'

const minimal: RootProps = {}
const numeric: RootProps = { elevation: 4 }
const enabled: EntryProps = { elevation: true }
// @ts-expect-error Alert runtime accepts boolean or number, not numeric strings
const invalid: RootProps = { elevation: '4' }
// @ts-expect-error the subentry has the same elevation contract
const invalidEntry: EntryProps = { elevation: '4' }
void [minimal, numeric, enabled, invalid, invalidEntry]
