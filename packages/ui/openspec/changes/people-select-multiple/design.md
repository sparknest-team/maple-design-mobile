# Design

PeopleSelectValue is string | string[] | null; multiple defaults to false. Multiple initial and clear values default to fresh arrays. Reuse Select for tags, removal, keyboard navigation and deferred draft confirmation. Cache only selected candidate records by identity; newer candidate records replace cached records and removed identities are pruned. Synchronous fallback resolution remains per identity. Existing single read scope is unchanged; multiple adds people and keeps person as its first member. No backend transport is introduced.

Select popup tokens own horizontal inset and option radius. Mobile Select/PeopleSelect editors keep touch target heights while replacing flat row separators with rounded rows. Cascader layout is unchanged.
