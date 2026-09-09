---
'@maplejs/maple-ui': major
---

Align the first component-contract batch with Cedar:

- Badge defaults to danger (red background, white text), supports left/right midpoint positions, and uses independently copied source and styles.
- AutoComplete renames getShow to shouldOpen and adds filterOption (default true) and strict (default false). Opening permission and option filtering are separate. Set filterOption=false to retain the previous no-local-filtering behavior or use server-filtered results.
