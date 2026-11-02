---
'@maple-design/cli': patch
---

Recover lazy document navigation after a preview rebuild replaces hashed assets. Reload the requested route once for chunk loading failures instead of silently leaving the previous page open.
