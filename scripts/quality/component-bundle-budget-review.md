# Maple on-demand component bundle budget review

Reviewed against the existing baseline and the historical source at `23ece75f` (2026-11-14). The current measurements use Vue/compiler 3.5.45, esbuild 0.23.1, Node 20.19.0 and zlib 1.3.0.1. Vue is external and CSS is excluded. The 20.9 column remeasures the same current code with Node 20.9.0 / zlib 1.2.13.1 to make compression drift visible.

All 97 entries were compared. 79 exceed at least one old limit; 19 of those have no raw-byte increase. The accepted limits are the larger of the old limit and the measured value for each metric; no extra headroom is added. Entries within the old limits keep both limits.

The retained-input deltas below describe contributions to minified output, not independent gzip contributions; sums can differ from total changes because tree-shaking and compilation change other modules. Every material source increase over 50 bytes was checked against the source diff and behavior tests:

- **direction**: shared direction resolution and observer lifecycle across moved, nested, detached and closed Shadow DOM roots (`packages/use/src/useDirection.ts`).
- **popup ownership**: closed-root outside-click ownership and keyboard switching between menu branches (`trigger/interaction.ts`).
- **Vue 3.2 IDs**: app-scoped fallback IDs and separate Cedar/Maple namespaces (`utils/vue-compat.ts`); Vue 3.5 uses its native API.
- **form sections**: the added FormSection component, props and accessible labels; it shares the existing form context.
- **cascader accessibility**: search and hierarchical selection semantics, popup/root ownership and detached-root tracking.
- **field draft/input behavior**: null-prototype drafts and InputTag input/loading behavior.
- **range renderer**: provider-based range rendering; the bundle gate verifies that ordinary Date does not retain the dedicated DateRange renderer.
- **SFC/codegen or small source changes**: compiler output differences and small explicit source changes, such as Card image prop names and defaults. `gzip` indicates gzip excess at unchanged or reduced raw size; it may reflect compression-version or content-compressibility changes, and is not evidence of additional raw JavaScript.

The behavior checks for these categories include the Vue 3.2.47–3.5.45 packed-consumer matrix, menu peer/keyboard tests, closed-root popup tests, direction source-mapped tests, FormSection, Cascader root lifecycle, null-prototype drafts, InputTag and DateRange SSR. Full `quality` is still the release gate.

| Entry | Old bytes | Current bytes | Old gzip | Current gzip | Current gzip (Node 20.9) | Review | Largest positive retained-input deltas (bytes) |
| --- | ---: | ---: | ---: | ---: | ---: | --- | --- |
| action-sheet | 47327 | 48825 | 17311 | 17995 | 17968 | direction, Vue 3.2 IDs | `packages/use/src/useDirection.ts` +1086; `utils/vue-compat.ts` +417; `loading/Loading.vue` +16 |
| affix | 8161 | 8161 | 3333 | 3342 | 3333 | gzip | — |
| alert | 13040 | 13040 | 3574 | 3570 | 3574 | within baseline | — |
| auto-complete | 180109 | 183320 | 59344 | 60682 | 60527 | direction, popup ownership, Vue 3.2 IDs, field draft/input behavior | `trigger/interaction.ts` +1540; `packages/use/src/useDirection.ts` +1086; `utils/vue-compat.ts` +417; `_components/field-presentation/with-field-presentation.ts` +170 |
| avatar | 46707 | 49784 | 16489 | 17737 | 17665 | direction, popup ownership, Vue 3.2 IDs | `trigger/interaction.ts` +1540; `packages/use/src/useDirection.ts` +1086; `utils/vue-compat.ts` +417; `avatar/Avatar.vue` +16 |
| back-top | 9340 | 10419 | 4214 | 4673 | 4673 | direction | `packages/use/src/useDirection.ts` +1077 |
| badge | 4874 | 4874 | 1956 | 1959 | 1956 | gzip | — |
| breadcrumb | 76023 | 79082 | 25710 | 26952 | 26869 | direction, popup ownership, Vue 3.2 IDs | `trigger/interaction.ts` +1543; `packages/use/src/useDirection.ts` +1086; `utils/vue-compat.ts` +417; `trigger/trigger.tsx` +14 |
| button | 23741 | 23757 | 8517 | 8535 | 8523 | SFC/codegen or small source changes | `loading/Loading.vue` +16 |
| card | 44177 | 44218 | 15409 | 15460 | 15424 | SFC/codegen or small source changes | `card/Card.vue` +20; `loading/Loading.vue` +16; `card/props.ts` +14 |
| carousel | 28642 | 26292 | 9594 | 9073 | 9060 | direction | `packages/use/src/useDirection.ts` +1092 |
| cascader | 241711 | 248906 | 77582 | 79997 | 79789 | direction, popup ownership, Vue 3.2 IDs, cascader accessibility, field draft/input behavior | `cascader/Cascader.vue` +1942; `trigger/interaction.ts` +1549; `packages/use/src/useDirection.ts` +1086; `cascader/CascaderEditor.vue` +699 |
| cell | 14845 | 14836 | 5662 | 5660 | 5666 | within baseline | — |
| checkbox | 88077 | 89775 | 30298 | 31033 | 30956 | direction, Vue 3.2 IDs, field draft/input behavior | `packages/use/src/useDirection.ts` +1086; `utils/vue-compat.ts` +417; `_components/field-presentation/with-field-presentation.ts` +164; `checkbox/Checkbox.vue` +17 |
| code | 2621 | 2621 | 1357 | 1359 | 1357 | gzip | — |
| col | 3736 | 3736 | 1710 | 1719 | 1710 | gzip | — |
| collapse | 11642 | 12038 | 4702 | 4921 | 4920 | Vue 3.2 IDs | `utils/vue-compat.ts` +417 |
| context | 125 | 125 | 132 | 132 | 132 | within baseline | — |
| count-to | 5146 | 5146 | 2295 | 2292 | 2295 | within baseline | — |
| countdown | 3623 | 3623 | 1795 | 1802 | 1795 | gzip | — |
| date | 296408 | 288744 | 92165 | 91272 | 90950 | direction, popup ownership, Vue 3.2 IDs, field draft/input behavior, range renderer | `trigger/interaction.ts` +1570; `packages/use/src/useDirection.ts` +1086; `utils/vue-compat.ts` +417; `_components/field-presentation/with-field-presentation.ts` +130 |
| date-range | 296799 | 300302 | 92312 | 94169 | 93832 | direction, popup ownership, Vue 3.2 IDs, field draft/input behavior, range renderer | `trigger/interaction.ts` +1566; `packages/use/src/useDirection.ts` +1086; `utils/vue-compat.ts` +417; `_components/field-presentation/with-field-presentation.ts` +165 |
| dialog | 61190 | 60140 | 19728 | 19650 | 19620 | direction | `packages/use/src/useDirection.ts` +1086; `loading/Loading.vue` +16 |
| divider | 4553 | 4553 | 1988 | 1988 | 1988 | within baseline | — |
| drag | 12094 | 13172 | 5069 | 5552 | 5550 | direction | `packages/use/src/useDirection.ts` +1074 |
| ellipsis | 38101 | 41171 | 13617 | 14787 | 14774 | direction, popup ownership, Vue 3.2 IDs | `trigger/interaction.ts` +1537; `packages/use/src/useDirection.ts` +1074; `utils/vue-compat.ts` +417; `trigger/positioner.ts` +24 |
| empty | 10576 | 6177 | 4067 | 2756 | 2752 | within baseline | — |
| fab | 42858 | 44365 | 15302 | 15995 | 15973 | direction, Vue 3.2 IDs | `packages/use/src/useDirection.ts` +1090; `utils/vue-compat.ts` +417; `loading/Loading.vue` +16 |
| field-decorator | 15893 | 17011 | 6197 | 6716 | 6686 | direction | `packages/use/src/useDirection.ts` +1085; `loading/Loading.vue` +18; `field-decorator/FieldDecorator.vue` +12 |
| floating-panel | 13313 | 14396 | 5487 | 5933 | 5957 | direction | `packages/use/src/useDirection.ts` +1070 |
| form | 79443 | 84906 | 28189 | 30117 | 30022 | direction, popup ownership, Vue 3.2 IDs, form sections | `form/FormSection.vue` +2097; `trigger/interaction.ts` +1526; `packages/use/src/useDirection.ts` +1086; `utils/vue-compat.ts` +417 |
| form-details | 3130 | 3118 | 1454 | 1448 | 1448 | within baseline | — |
| grid | 6252 | 6252 | 2777 | 2780 | 2777 | gzip | — |
| highlighter-provider | 1894 | 1893 | 980 | 988 | 980 | gzip | — |
| hover | 3426 | 3325 | 1532 | 1514 | 1514 | within baseline | — |
| icon | 3792 | 3783 | 1919 | 1910 | 1908 | within baseline | — |
| image | 60129 | 61234 | 20606 | 21102 | 21070 | direction | `packages/use/src/useDirection.ts` +1086; `image/Image.vue` +19 |
| index-bar | 17469 | 17469 | 6937 | 6954 | 6937 | gzip | — |
| infinite-scroll | 17769 | 12086 | 6402 | 4697 | 4692 | within baseline | `loading/Loading.vue` +16 |
| input | 93937 | 95453 | 30061 | 30739 | 30672 | direction, Vue 3.2 IDs | `packages/use/src/useDirection.ts` +1086; `utils/vue-compat.ts` +417; `loading/Loading.vue` +16; `_components/field-presentation/FieldPresentation.vue` +11 |
| input-number | 144095 | 145773 | 48559 | 49606 | 49253 | direction, Vue 3.2 IDs, field draft/input behavior | `packages/use/src/useDirection.ts` +1086; `utils/vue-compat.ts` +417; `_components/field-presentation/with-field-presentation.ts` +164; `loading/Loading.vue` +18 |
| input-tag | 169683 | 173138 | 55063 | 56415 | 56292 | direction, popup ownership, Vue 3.2 IDs, field draft/input behavior | `trigger/interaction.ts` +1558; `packages/use/src/useDirection.ts` +1086; `utils/vue-compat.ts` +417; `input-tag/input-tag.tsx` +200 |
| lazy | 4315 | 4315 | 1984 | 1985 | 1984 | gzip | — |
| link | 6110 | 6114 | 2264 | 2248 | 2248 | SFC/codegen or small source changes | — |
| list | 37720 | 36523 | 13391 | 13361 | 13319 | direction | `packages/use/src/useDirection.ts` +1086; `loading/Loading.vue` +16; `list/List.vue` +11 |
| loading | 8219 | 8235 | 3367 | 3371 | 3373 | SFC/codegen or small source changes | `loading/Loading.vue` +16 |
| loading-bar | 3522 | 3490 | 1718 | 1700 | 1699 | within baseline | — |
| locale | 34379 | 34379 | 7419 | 7452 | 7417 | gzip | — |
| locale-provider | 10004 | 10004 | 3887 | 3945 | 3886 | gzip | — |
| mention | 190583 | 193802 | 62379 | 63746 | 63562 | direction, popup ownership, Vue 3.2 IDs, field draft/input behavior | `trigger/interaction.ts` +1552; `packages/use/src/useDirection.ts` +1086; `utils/vue-compat.ts` +417; `_components/field-presentation/with-field-presentation.ts` +159 |
| menu | 65135 | 67792 | 22434 | 23459 | 23383 | direction, popup ownership | `trigger/interaction.ts` +1538; `packages/use/src/useDirection.ts` +1086; `trigger/trigger.tsx` +14 |
| message | 21698 | 22811 | 6473 | 6970 | 6965 | direction | `packages/use/src/useDirection.ts` +1091; `message/index.ts` +14; `message/Message.vue` +11 |
| nav-menu | 26519 | 27893 | 10112 | 10733 | 10732 | direction, Vue 3.2 IDs | `packages/use/src/useDirection.ts` +1083; `utils/vue-compat.ts` +417 |
| notice-bar | 11126 | 11117 | 4735 | 4758 | 4745 | gzip | — |
| number-keyboard | 47691 | 49177 | 17292 | 17995 | 17946 | direction, Vue 3.2 IDs | `packages/use/src/useDirection.ts` +1086; `utils/vue-compat.ts` +417; `loading/Loading.vue` +16 |
| overlay | 11768 | 12854 | 4981 | 5445 | 5450 | direction | `packages/use/src/useDirection.ts` +1081 |
| page-header | 5902 | 5902 | 2501 | 2502 | 2501 | gzip | — |
| pagination | 226069 | 229122 | 70621 | 71963 | 71733 | direction, popup ownership, Vue 3.2 IDs | `trigger/interaction.ts` +1540; `packages/use/src/useDirection.ts` +1086; `utils/vue-compat.ts` +417; `field-decorator/FieldDecorator.vue` +45 |
| paper | 10217 | 10217 | 3983 | 3980 | 3983 | within baseline | — |
| people-select | 224338 | 227541 | 71750 | 73131 | 72886 | direction, popup ownership, Vue 3.2 IDs, field draft/input behavior | `trigger/interaction.ts` +1540; `packages/use/src/useDirection.ts` +1086; `utils/vue-compat.ts` +417; `_components/field-presentation/with-field-presentation.ts` +159 |
| picker | 65381 | 66869 | 23208 | 23997 | 23881 | direction, Vue 3.2 IDs | `packages/use/src/useDirection.ts` +1086; `utils/vue-compat.ts` +417; `loading/Loading.vue` +16 |
| popover | 36138 | 39199 | 12930 | 14099 | 14080 | direction, popup ownership, Vue 3.2 IDs | `trigger/interaction.ts` +1537; `packages/use/src/useDirection.ts` +1074; `utils/vue-compat.ts` +417; `trigger/trigger.tsx` +20 |
| popup | 27729 | 28825 | 10629 | 11091 | 11084 | direction | `packages/use/src/useDirection.ts` +1069; `loading/Loading.vue` +14 |
| progress | 9550 | 9785 | 3775 | 4000 | 3994 | Vue 3.2 IDs | `utils/vue-compat.ts` +407 |
| progress-group | 9563 | 9970 | 3484 | 3726 | 3709 | Vue 3.2 IDs | `utils/vue-compat.ts` +414 |
| pull-refresh | 18381 | 18372 | 6587 | 6619 | 6595 | gzip | — |
| radio | 87709 | 89401 | 30235 | 30959 | 30892 | direction, Vue 3.2 IDs, field draft/input behavior | `packages/use/src/useDirection.ts` +1086; `utils/vue-compat.ts` +417; `_components/field-presentation/with-field-presentation.ts` +164; `loading/Loading.vue` +16 |
| rate | 92877 | 94133 | 30350 | 30940 | 30813 | direction, field draft/input behavior | `packages/use/src/useDirection.ts` +1086; `_components/field-presentation/with-field-presentation.ts` +164; `loading/Loading.vue` +16; `_components/field-presentation/FieldPresentation.vue` +11 |
| result | 78584 | 79003 | 30143 | 30093 | 30371 | Vue 3.2 IDs | `utils/vue-compat.ts` +407 |
| ripple | 7960 | 7960 | 3019 | 3018 | 3019 | within baseline | — |
| row | 3844 | 3844 | 1834 | 1840 | 1834 | gzip | — |
| safe-area | 2578 | 2576 | 1349 | 1350 | 1348 | gzip | — |
| search | 246913 | 249914 | 78077 | 79346 | 79178 | direction, popup ownership, Vue 3.2 IDs | `trigger/interaction.ts` +1536; `packages/use/src/useDirection.ts` +1086; `utils/vue-compat.ts` +417; `select/use-select-controller.ts` +21 |
| select | 203646 | 206678 | 65062 | 66335 | 66171 | direction, popup ownership, Vue 3.2 IDs | `trigger/interaction.ts` +1540; `packages/use/src/useDirection.ts` +1086; `utils/vue-compat.ts` +417; `loading/Loading.vue` +16 |
| signature | 6357 | 6357 | 2813 | 2817 | 2813 | gzip | — |
| skeleton | 5165 | 5180 | 1993 | 1966 | 1968 | SFC/codegen or small source changes | `skeleton/Skeleton.vue` +15 |
| slider | 158051 | 159719 | 52865 | 53885 | 53521 | direction, Vue 3.2 IDs, field draft/input behavior | `packages/use/src/useDirection.ts` +1086; `utils/vue-compat.ts` +417; `_components/field-presentation/with-field-presentation.ts` +164; `loading/Loading.vue` +16 |
| space | 4166 | 4166 | 1950 | 1951 | 1950 | gzip | — |
| split-button | 83937 | 86611 | 28194 | 29191 | 29145 | direction, popup ownership | `trigger/interaction.ts` +1551; `packages/use/src/useDirection.ts` +1090; `loading/Loading.vue` +16; `trigger/trigger.tsx` +14 |
| statistic | 14419 | 14430 | 5962 | 5994 | 5967 | SFC/codegen or small source changes | `statistic/Statistic.vue` +11 |
| steps | 12431 | 13524 | 4640 | 5122 | 5116 | direction | `packages/use/src/useDirection.ts` +1085 |
| swipe-cell | 15321 | 15337 | 5940 | 5949 | 5945 | SFC/codegen or small source changes | `loading/Loading.vue` +16 |
| switch | 79056 | 80356 | 26998 | 27530 | 27472 | direction, field draft/input behavior | `packages/use/src/useDirection.ts` +1086; `_components/field-presentation/with-field-presentation.ts` +164; `switch/Switch.vue` +35; `loading/Loading.vue` +16 |
| tab-bar | 38779 | 38789 | 13685 | 13702 | 13689 | SFC/codegen or small source changes | `loading/Loading.vue` +16 |
| table | 9744 | 10871 | 4064 | 4547 | 4556 | direction | `packages/use/src/useDirection.ts` +1097; `loading/Loading.vue` +20 |
| tabs | 20304 | 21787 | 7535 | 8224 | 8207 | direction, Vue 3.2 IDs | `packages/use/src/useDirection.ts` +1074; `utils/vue-compat.ts` +417 |
| tag | 9657 | 9668 | 3659 | 3676 | 3663 | SFC/codegen or small source changes | `tag/Tag.vue` +11 |
| textarea | 101506 | 103184 | 33593 | 34367 | 34270 | direction, Vue 3.2 IDs, field draft/input behavior | `packages/use/src/useDirection.ts` +1086; `utils/vue-compat.ts` +417; `_components/field-presentation/with-field-presentation.ts` +164; `loading/Loading.vue` +16 |
| theme-provider | 2940 | 2759 | 1467 | 1344 | 1350 | within baseline | — |
| time | 189094 | 192344 | 63541 | 64933 | 64711 | direction, popup ownership, Vue 3.2 IDs, field draft/input behavior | `trigger/interaction.ts` +1559; `packages/use/src/useDirection.ts` +1086; `utils/vue-compat.ts` +417; `_components/field-presentation/with-field-presentation.ts` +155 |
| time-range | 189260 | 192510 | 63598 | 64997 | 64769 | direction, popup ownership, Vue 3.2 IDs, field draft/input behavior | `trigger/interaction.ts` +1559; `packages/use/src/useDirection.ts` +1086; `utils/vue-compat.ts` +417; `_components/field-presentation/with-field-presentation.ts` +155 |
| timeline | 10615 | 10653 | 4080 | 4082 | 4085 | SFC/codegen or small source changes | `timeline/Item.vue` +22; `loading/Loading.vue` +16 |
| tooltip | 36117 | 39175 | 12929 | 14102 | 14085 | direction, popup ownership, Vue 3.2 IDs | `trigger/interaction.ts` +1537; `packages/use/src/useDirection.ts` +1074; `utils/vue-compat.ts` +417; `trigger/trigger.tsx` +20 |
| trigger | 32448 | 35099 | 11731 | 12706 | 12685 | direction, popup ownership | `trigger/interaction.ts` +1537; `packages/use/src/useDirection.ts` +1074; `trigger/trigger.tsx` +21 |
| upload | 146245 | 147514 | 48364 | 49022 | 48840 | direction, field draft/input behavior | `packages/use/src/useDirection.ts` +1086; `_components/field-presentation/with-field-presentation.ts` +164; `loading/Loading.vue` +16; `_components/field-presentation/FieldPresentation.vue` +11 |
| verification-code | 114201 | 115879 | 37041 | 37830 | 37708 | direction, Vue 3.2 IDs, field draft/input behavior | `packages/use/src/useDirection.ts` +1086; `utils/vue-compat.ts` +417; `_components/field-presentation/with-field-presentation.ts` +164; `loading/Loading.vue` +16 |
| watermark | 7459 | 7459 | 3343 | 3344 | 3343 | gzip | — |

## Trigger pointer-dismissal follow-up

After the parallel Trigger change, the official Node 20.19.0 / esbuild 0.23.1 measurement exceeded the reviewed limits for 20 entries. The shared interaction implementation now coalesces a focus dismissal and its associated pointer click while preserving independent retries, label forwarding, pointer cancellation and lifecycle cleanup. Its retained contribution increased by approximately 2.16–2.22 KB per affected bundle; smaller changes reflect compilation and other retained inputs. The parallel task verified the new code with Vue 3.2.47, targeted interaction tests, consumer suites and local package browser checks. Each entry below is measured separately; compressed differences include changes in compressibility. Limits are raised only to the measured value, with no additional headroom.

| Entry | Previous bytes | Current bytes | Previous gzip | Current gzip |
| --- | ---: | ---: | ---: | ---: |
| auto-complete | 183320 | 185481 | 60682 | 61333 |
| avatar | 49784 | 51967 | 17737 | 18420 |
| breadcrumb | 79082 | 81269 | 26952 | 27654 |
| cascader | 248906 | 251090 | 79997 | 80654 |
| date-range | 300302 | 302482 | 94169 | 94812 |
| ellipsis | 41171 | 43355 | 14787 | 15464 |
| form | 84906 | 87092 | 30117 | 30788 |
| input-tag | 173138 | 175303 | 56415 | 57121 |
| mention | 193802 | 195980 | 63746 | 64444 |
| menu | 67792 | 69979 | 23459 | 24160 |
| pagination | 229122 | 231370 | 71963 | 72625 |
| people-select | 227541 | 229719 | 73131 | 73758 |
| popover | 39199 | 41381 | 14099 | 14790 |
| search | 249914 | 252166 | 79346 | 80035 |
| select | 206678 | 208923 | 66335 | 66999 |
| split-button | 86611 | 88803 | 29191 | 29896 |
| time | 192344 | 194506 | 64933 | 65673 |
| time-range | 192510 | 194672 | 64997 | 65673 |
| tooltip | 39175 | 41357 | 14102 | 14754 |
| trigger | 35099 | 37280 | 12706 | 13361 |
