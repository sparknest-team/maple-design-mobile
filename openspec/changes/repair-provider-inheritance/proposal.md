# Reactive empty-slot consumption

Keep shared Select/Cascader private adapter shape reactive with Cedar while retaining Maple local-only empty configuration. Render empty fallback in render scope instead of caching its first VNode during setup. No Maple ConfigProvider or new public API is introduced.
