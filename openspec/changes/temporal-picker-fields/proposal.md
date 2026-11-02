# Separate date and time wheel fields

Replace the mixed picker field array with `date-fields` and `time-fields`. Remove the public seconds boolean without compatibility aliases. Date/DateRange fields and standalone Pickers accept both lists; Time/TimeRange accept time fields. Keep component names and calendar/picker modes.
