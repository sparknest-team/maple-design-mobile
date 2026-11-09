## MODIFIED Requirements
### Requirement: Model notifications retain explicit clear values
Time and TimeRange update/change event types SHALL include the nullable and timestamp/Date shapes accepted by their empty-value properties. Their auxiliary dates SHALL allow undefined for empty values. Normal select SHALL retain formatted strings, with partial range selection represented explicitly rather than a clear event.
#### Scenario: Null clear notification
- WHEN a valid clear action outputs null
- THEN a public root/subentry event consumer accepts null and undefined auxiliary dates, while select does not become a null-clear notification.
### Requirement: Typed field slot surfaces
The library SHALL export field Emits/Slots/ReadScope/Expose types and preserve actual platform slot boundaries. Desktop custom default triggers SHALL be distinguished from unsupported mobile default/loading-icon slots. Shared read, prefix, selected, suffix, suffix-icon and clear-icon SHALL describe their actual arguments.
#### Scenario: Custom suffix and read
- WHEN a consumer supplies those slots
- THEN it can type focus/popupOpen and retain nullable model reading without a fake task executor.
