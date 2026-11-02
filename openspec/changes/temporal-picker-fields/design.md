# Design

DatePickerField is year/month/day; TimePickerField is hour/minute/second. Each nonempty unique array independently controls visibility and order. Only omitted configuration uses defaults; explicit lists are not silently supplemented. The date grid is unchanged, while embedded time wheels honor time-fields. Range endpoints share the same lists. Root configuration cannot be overridden by nested presentation options.

Hidden model units survive edits and column changes do not commit. Date input format and value serialization remain independent of wheel columns. Date datetime serialization defaults to full seconds; minute string consumers must specify format and value-format. Time retains its existing string protocol and omitted columns follow that protocol. The removed public seconds option is also removed from paired Cedar date value rules and callers. Internal clock-constraint booleans are implementation details.

Mobile-specific wheel configuration remains registered as a platform capability. Shared source owners and value semantics remain independently copied and paired. Empty wheel drafts, calendar today markers, range validity, and confirm/cancel ownership are unchanged.
