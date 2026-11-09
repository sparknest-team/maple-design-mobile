# Message per-call app context

Keep one target/position queue and chronological visual stack. Give each message its own Vue root with captured full AppContext,not just injected values. Same-id context changes remount only that rendering scope while retaining business-item handle ownership. Dispose roots and context metadata on completion.
