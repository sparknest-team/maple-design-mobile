# LoadingBar motion and lifecycle

Keep the Maple-only service and its default scheduling (200ms tick/show, 300ms completion hold, 250ms fade). Add transition-duration 250ms and transition-timing-function ease component tokens. JS completion/removal must consume resolved width/opacity transition timing, including delay, not truncate longer overrides. Deduplicate finish requests, cancel obsolete tasks, unmount the completed service, allow remount, and replace/reset all default options correctly. SSR service calls create no DOM/timers. Reduced motion disables visual transitions, not progress or cleanup.

Button foreground follows Cedar button-bright-foreground proposal. No Cedar LoadingBar equivalent is invented.
