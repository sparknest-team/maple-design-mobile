<!-- Source: src/carousel/docs/en-US.md; locale: en-US; page: /en-US/carousel -->

# Carousel

Autoplay interval is business playback cadence (business-clock), not CSS duration. Autoplay remains off by default; true uses3000ms, with existing numeric/config intervals and hover/focus/hidden pause rules. Cancellation/replacement invalidates old playback work; delivery consumes once before navigation. Retained inactive/disposed next/prev/to, keyboard and wheel cannot navigate or intercept input. Activation creates fresh observer/event bindings; detached deliveries cannot use a newer active state to reschedule.

## Basic examples

### Basic Usage

Example source: src/carousel/example/demos/basic-usage.vue

```vue
<script setup></script>

<template>
  <mp-carousel class="carousel">
    <mp-carousel-item>
      <img class="carousel-item" :src="'cat.jpg'" alt="" />
    </mp-carousel-item>
    <mp-carousel-item>
      <img class="carousel-item" :src="'cat2.jpg'" alt="" />
    </mp-carousel-item>
    <mp-carousel-item>
      <img class="carousel-item" :src="'cat3.jpg'" alt="" />
    </mp-carousel-item>
  </mp-carousel>
</template>

<style lang="less" scoped>
.carousel {
  height: 160px;
}

.carousel-example {
  height: 160px;
}

.carousel-item {
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
}

.carousel-custom-slide {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #4a90d9;
  color: #fff;
  font-size: 24px;
  font-weight: bold;
}

.carousel-custom-indicators {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 4px;
}

.carousel-custom-indicator {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.3);
  color: #fff;
  font-size: 12px;
  border-radius: 50%;
}

.carousel-custom--active {
  background: #4a90d9;
}

.space {
  height: 20px;
}
</style>
```

## Direction and layout

### Vertical Carousel

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `slides-per-view` | Visible count; auto uses item size | Multiple Slides Per View, Centered Slides, auto-sized |
| `space-between` | Item gap; numbers/numeric strings are px | Multiple Slides Per View, Centered Slides, auto-sized |
| `draggable` | Mouse dragging, independent of touch | Multiple Slides Per View, auto-sized |
| `centered-slides` | Center active slide | Centered Slides, auto-sized |
| `orientation` | Horizontal/vertical axis of carousel sliding, default horizontal; does not determine indicator position | Vertical Carousel |
| `model-value` | Controlled one-based slide number | Multiple Slides Per View |
<!-- demo-config-notes:end -->


Example source: src/carousel/example/demos/vertical.vue

```vue
<script setup></script>

<template>
  <mp-carousel class="carousel" orientation="vertical">
    <mp-carousel-item>
      <img class="carousel-item" :src="'cat.jpg'" alt="" />
    </mp-carousel-item>
    <mp-carousel-item>
      <img class="carousel-item" :src="'cat2.jpg'" alt="" />
    </mp-carousel-item>
    <mp-carousel-item>
      <img class="carousel-item" :src="'cat3.jpg'" alt="" />
    </mp-carousel-item>
  </mp-carousel>
</template>

<style lang="less" scoped>
.carousel {
  height: 160px;
}

.carousel-example {
  height: 160px;
}

.carousel-item {
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
}

.carousel-custom-slide {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #4a90d9;
  color: #fff;
  font-size: 24px;
  font-weight: bold;
}

.carousel-custom-indicators {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 4px;
}

.carousel-custom-indicator {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.3);
  color: #fff;
  font-size: 12px;
  border-radius: 50%;
}

.carousel-custom--active {
  background: #4a90d9;
}

.space {
  height: 20px;
}
</style>
```

### Multiple Slides Per View

The demo shows 2.5 items and lets you drag or toggle acceptance and looping. Current is the parent-accepted page index starting at 1, Proposal records requests, and Changes counts change notifications. When updates are rejected, a request or change does not mean the model changed. Accepted updates allow dragging in either direction; disabling looping prevents crossing the ends.

Example source: src/carousel/example/demos/multi-slides.vue

```vue
<script setup>
import { ref } from 'vue'

const current = ref(1)
const proposal = ref(1)
const changes = ref(0)
const accept = ref(true)
const loop = ref(true)
function update(value) {
  proposal.value = value
  if (accept.value) {
    current.value = value
  }
}
</script>

<template>
  <section class="multi-slides-demo">
    <mp-checkbox v-model="accept" edit-mode="direct">Accept changes / 接受切换</mp-checkbox>
    <mp-checkbox v-model="loop" edit-mode="direct">Loop / 循环</mp-checkbox>
    <p role="status">Current: {{ current }} · Proposal: {{ proposal }} · Changes: {{ changes }}</p>
    <mp-carousel
      class="carousel"
      :slides-per-view="2.5"
      :space-between="10"
      :model-value="current"
      :loop="loop"
      draggable
      keyboard
      @update:modelValue="update"
      @change="changes++"
    >
      <mp-carousel-item v-for="i in 6" :key="i">
        <div class="carousel-custom-slide">{{ i }}</div>
      </mp-carousel-item>
    </mp-carousel>
  </section>
</template>

<style lang="less" scoped>
.carousel {
  height: 160px;
}

.carousel-example {
  height: 160px;
}

.carousel-item {
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
}

.carousel-custom-slide {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #4a90d9;
  color: #fff;
  font-size: 24px;
  font-weight: bold;
}

.carousel-custom-indicators {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 4px;
}

.carousel-custom-indicator {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.3);
  color: #fff;
  font-size: 12px;
  border-radius: 50%;
}

.carousel-custom--active {
  background: #4a90d9;
}

.space {
  height: 20px;
}
</style>
```

### Centered Slides

Example source: src/carousel/example/demos/centered-slides.vue

```vue
<script setup></script>

<template>
  <mp-carousel class="carousel" :slides-per-view="1.5" :space-between="10" centered-slides>
    <mp-carousel-item v-for="i in 5" :key="i">
      <div class="carousel-custom-slide">{{ i }}</div>
    </mp-carousel-item>
  </mp-carousel>
</template>

<style lang="less" scoped>
.carousel {
  height: 160px;
}

.carousel-example {
  height: 160px;
}

.carousel-item {
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
}

.carousel-custom-slide {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #4a90d9;
  color: #fff;
  font-size: 24px;
  font-weight: bold;
}

.carousel-custom-indicators {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 4px;
}

.carousel-custom-indicator {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.3);
  color: #fff;
  font-size: 12px;
  border-radius: 50%;
}

.carousel-custom--active {
  background: #4a90d9;
}

.space {
  height: 20px;
}
</style>
```

### auto-sized

Reverse cards reorders the same uniquely keyed cards (their distinct widths are the Demo keys). Current is positional, not a business-card identity: slide number 2 changes from 220px to 180px without changing the index or event count. Drag left to slide number 3, restore order to show 180px there, then drag right to slide number 2. Reordering alone emits no change. Arbitrary insertion/sorting, identity-following selection, reordering during a held gesture and physical touch remain unverified.

When the active fifth card is removed, parent Current stays 5 without another change; the view clamps it to the remaining fourth card and centers that card. A subsequent left drag wraps to 1 and updates the model once. Applications that need immediate parent-index correction must update current themselves. Arbitrary reordering and deletion during a held gesture remain unverified.

Empty temporarily removes every card: navigation is disabled and dragging emits no change. Turning it off restores the configured cards without switching. Clearing and restoring from slide number 1 allows a subsequent right drag to wrap to the last item. This does not cover nonzero out-of-range controlled indices or clearing during a held gesture.

Clearing from slide number 4 retains the parent Current and change count. Restoring centers the last card; the next left drag wraps to 1 and emits once. Empty content does not force the controlled parent value to 0. Active-card deletion, arbitrary invalid indices and clearing during a held gesture remain unverified.

Extra card appends a 200px fifth item without changing a valid current index or incrementing Changes. Drag right from the first item to reach it, then right again to the original last item before removing the extra card. The index and count stay unchanged; dragging left then wraps across the restored four-item boundary. This covers removing an inactive final item, not deleting the active item, arbitrary reordering, or changes during a held gesture.

Drag to the last item, then enable Wider cards (80px added per item) and the 300px viewport. Resizing does not change the model or increment Changes: the current 340px card recenters, and a left drag can wrap to the first item. Restoring both switches recenters again. This paragraph describes ResizeObserver updates after a completed gesture, not resizing while holding a drag.

Items have different widths. Dragging keeps the current item centered and can loop across either end. Current shows the accepted page index starting at 1; Changes counts change notifications.

Example source: src/carousel/example/demos/auto-sized.vue

```vue
<script setup>
import { computed, ref } from 'vue'

const current = ref(1)
const changes = ref(0)
const wider = ref(false)
const compact = ref(false)
const extra = ref(false)
const empty = ref(false)
const reversed = ref(false)
const widths = computed(() => {
  const items = empty.value ? [] : [140, 220, 180, 260, ...(extra.value ? [200] : [])]
  return (reversed.value ? items.reverse() : items).map((width) => width + (wider.value ? 80 : 0))
})
</script>

<template>
  <section class="auto-sized-demo">
    <mp-checkbox v-model="wider" edit-mode="direct">Wider cards / 加宽卡片</mp-checkbox>
    <mp-checkbox v-model="compact" edit-mode="direct">300px viewport / 窄容器</mp-checkbox>
    <mp-checkbox v-model="extra" edit-mode="direct">Extra card / 增加末项</mp-checkbox>
    <mp-checkbox v-model="empty" edit-mode="direct">Empty / 清空项目</mp-checkbox>
    <mp-checkbox v-model="reversed" edit-mode="direct">Reverse cards / 反转顺序</mp-checkbox>
    <p role="status">Current: {{ current }} · Changes: {{ changes }}</p>
    <mp-carousel
      v-model="current"
      slides-per-view="auto"
      :space-between="12"
      height="180px"
      :style="{ width: compact ? '300px' : '100%' }"
      centered-slides
      draggable
      @change="changes++"
    >
      <mp-carousel-item v-for="width in widths" :key="width" :style="{ width: width + 'px' }">
        <div class="carousel-demo-panel">{{ width }}px</div>
      </mp-carousel-item>
    </mp-carousel>
  </section>
</template>
<style scoped>
.carousel-demo-panel {
  display: grid;
  place-items: center;
  height: 100%;
  background: #e0e7ff;
  color: #312e81;
}
</style>
```

## Navigation and effects

### Navigation Arrows

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `show-arrow` | Arrow visibility | Navigation Arrows |
| `indicator-type` | Indicator appearance | Indicator style and position |
| `indicator-position` | Indicator edge or outer region of the carousel container, default bottom. Not a trigger-relative popup placement | Indicator style and position |
| `effect` | Effect; all supported by both libraries | Transition effects |
<!-- demo-config-notes:end -->


Use `show-arrow` to control when arrows appear: `always`, `hover`, or `never`. Both libraries default to `always`.

Example source: src/carousel/example/demos/navigation.vue

```vue
<script setup></script>

<template>
  <mp-carousel class="carousel" show-arrow="always">
    <mp-carousel-item>
      <img class="carousel-item" :src="'cat.jpg'" alt="" />
    </mp-carousel-item>
    <mp-carousel-item>
      <img class="carousel-item" :src="'cat2.jpg'" alt="" />
    </mp-carousel-item>
    <mp-carousel-item>
      <img class="carousel-item" :src="'cat3.jpg'" alt="" />
    </mp-carousel-item>
  </mp-carousel>

  <mp-carousel class="carousel" style="margin-top: 12px" show-arrow="hover">
    <mp-carousel-item>
      <img class="carousel-item" :src="'cat.jpg'" alt="" />
    </mp-carousel-item>
    <mp-carousel-item>
      <img class="carousel-item" :src="'cat2.jpg'" alt="" />
    </mp-carousel-item>
    <mp-carousel-item>
      <img class="carousel-item" :src="'cat3.jpg'" alt="" />
    </mp-carousel-item>
  </mp-carousel>
</template>

<style lang="less" scoped>
.carousel {
  height: 160px;
}

.carousel-example {
  height: 160px;
}

.carousel-item {
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
}

.carousel-custom-slide {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #4a90d9;
  color: #fff;
  font-size: 24px;
  font-weight: bold;
}

.carousel-custom-indicators {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 4px;
}

.carousel-custom-indicator {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.3);
  color: #fff;
  font-size: 12px;
  border-radius: 50%;
}

.carousel-custom--active {
  background: #4a90d9;
}

.space {
  height: 20px;
}
</style>
```

### Indicator style and position

All indicator presets use the same three local slides and active-slide model. Click an indicator or a navigation arrow in any specimen: every specimen changes to the same slide. The first group compares dot, line and slider; the second compares top and outer positions. The grid stacks on narrow screens.

<details>
<summary>Configuration details and limits</summary>

#### Indicator Types

Use `indicator-type` for `dot`, `line`, or `slider`. Hide indicators with `indicator`.

</details>

Example source: src/carousel/example/demos/indicator-comparison.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const current = ref(1)
const groups = [
  {
    name: 'indicator-type',
    zh: '指示器样式',
    en: 'Indicator types',
    values: [
      { label: 'dot', type: 'dot', position: 'bottom' },
      { label: 'line', type: 'line', position: 'bottom' },
      { label: 'slider', type: 'slider', position: 'bottom' },
    ],
  },
  {
    name: 'indicator-position',
    zh: '指示器位置',
    en: 'Indicator positions',
    values: [
      { label: 'top', type: 'dot', position: 'top' },
      { label: 'outer', type: 'dot', position: 'outer' },
    ],
  },
] as const
const slides = [
  'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22640%22%20height%3D%22240%22%3E%3Crect%20width%3D%22640%22%20height%3D%22240%22%20fill%3D%22%23286b72%22%2F%3E%3Ctext%20x%3D%22320%22%20y%3D%22130%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%20font-size%3D%2236%22%3ESlide%201%3C%2Ftext%3E%3C%2Fsvg%3E',
  'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22640%22%20height%3D%22240%22%3E%3Crect%20width%3D%22640%22%20height%3D%22240%22%20fill%3D%22%234b5694%22%2F%3E%3Ctext%20x%3D%22320%22%20y%3D%22130%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%20font-size%3D%2236%22%3ESlide%202%3C%2Ftext%3E%3C%2Fsvg%3E',
  'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22640%22%20height%3D%22240%22%3E%3Crect%20width%3D%22640%22%20height%3D%22240%22%20fill%3D%22%23965734%22%2F%3E%3Ctext%20x%3D%22320%22%20y%3D%22130%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%20font-size%3D%2236%22%3ESlide%203%3C%2Ftext%3E%3C%2Fsvg%3E',
]
</script>
<template>
  <div class="indicator-comparison">
    <p role="status">Slide: {{ current }}</p>
    <section v-for="group in groups" :key="group.name" :data-comparison-scene="group.name">
      <h4>
        <span lang="zh-CN">{{ group.zh }}</span
        ><span lang="en-US">{{ group.en }}</span>
      </h4>
      <div class="indicator-comparison-grid">
        <div v-for="preset in group.values" :key="preset.label">
          <p>
            <code>{{ preset.label }}</code>
          </p>
          <mp-carousel
            v-model="current"
            :indicator-type="preset.type"
            :indicator-position="preset.position"
            style="height: 150px"
          >
            <mp-carousel-item v-for="(src, index) in slides" :key="src"
              ><img :src="src" :alt="'Slide ' + (index + 1)"
            /></mp-carousel-item>
          </mp-carousel>
        </div>
      </div>
    </section>
  </div>
</template>
<style scoped>
.indicator-comparison {
  display: grid;
  gap: 24px;
  min-width: 0;
  max-width: 100%;
}
.indicator-comparison-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 240px), 1fr));
  gap: 16px;
}
.indicator-comparison > section,
.indicator-comparison-grid,
.indicator-comparison-grid > div {
  min-width: 0;
  max-width: 100%;
}
p,
h4 {
  margin: 0 0 8px;
}
img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
}
html:not([lang='en-US']) h4 > [lang='en-US'],
html[lang='en-US'] h4 > [lang='zh-CN'] {
  display: none;
}
</style>
```

### Transition effects

Change adjacent slides to compare fade, card and slide effects independently of autoplay and input methods.

<details>
<summary>Configuration details and limits</summary>

#### Fade Effect

Use the indicator buttons to switch pages. Inactive slides become transparent and inert. All slides overlap in one grid cell, keeping the active slide at the viewport width rather than splitting the track into columns.

#### Card Effect

The active slide uses full scale and opacity; neighboring slides are scaled down and dimmed. Previous/next buttons retain native keyboard activation.

</details>

Example source: src/carousel/example/demos/effect-comparison.vue

```vue
<script setup lang="ts"></script>

<template>
  <div class="demo-comparison">
    <section class="demo-comparison-case demo-comparison-case--1" data-comparison-scene="effect-fade">
      <h4><span lang="zh-CN">淡入淡出效果</span><span lang="en-US">Fade Effect</span></h4>
      <mp-carousel class="carousel" effect="fade">
        <mp-carousel-item>
          <img class="carousel-item" :src="'cat.jpg'" alt="" />
        </mp-carousel-item>
        <mp-carousel-item>
          <img class="carousel-item" :src="'cat2.jpg'" alt="" />
        </mp-carousel-item>
        <mp-carousel-item>
          <img class="carousel-item" :src="'cat3.jpg'" alt="" />
        </mp-carousel-item>
      </mp-carousel>
    </section>

    <section class="demo-comparison-case demo-comparison-case--2" data-comparison-scene="effect-card">
      <h4><span lang="zh-CN">卡片效果</span><span lang="en-US">Card Effect</span></h4>
      <mp-carousel class="carousel" effect="card">
        <mp-carousel-item>
          <img class="carousel-item" :src="'cat.jpg'" alt="" />
        </mp-carousel-item>
        <mp-carousel-item>
          <img class="carousel-item" :src="'cat2.jpg'" alt="" />
        </mp-carousel-item>
        <mp-carousel-item>
          <img class="carousel-item" :src="'cat3.jpg'" alt="" />
        </mp-carousel-item>
      </mp-carousel>
    </section>

    <section class="demo-comparison-case demo-comparison-case--3" data-comparison-scene="effect-slide">
      <h4><span lang="zh-CN">滑动效果（默认）</span><span lang="en-US">Slide Effect (Default)</span></h4>
      <mp-carousel class="carousel" effect="slide">
        <mp-carousel-item>
          <img class="carousel-item" :src="'cat.jpg'" alt="" />
        </mp-carousel-item>
        <mp-carousel-item>
          <img class="carousel-item" :src="'cat2.jpg'" alt="" />
        </mp-carousel-item>
        <mp-carousel-item>
          <img class="carousel-item" :src="'cat3.jpg'" alt="" />
        </mp-carousel-item>
      </mp-carousel>
    </section>
  </div>
</template>

<style scoped lang="less">
.demo-comparison {
  display: grid;
  gap: 24px;
  min-width: 0;
  max-width: 100%;
}
.demo-comparison-case {
  min-width: 0;
  max-width: 100%;
}
.demo-comparison-case > h4 {
  margin: 0 0 12px;
  font-size: 14px;
}
html:not([lang='en-US']) .demo-comparison-case > h4 > [lang='en-US'],
html[lang='en-US'] .demo-comparison-case > h4 > [lang='zh-CN'] {
  display: none;
}
.demo-comparison-case--1 {
  .carousel {
    height: 160px;
  }

  .carousel-example {
    height: 160px;
  }

  .carousel-item {
    width: 100%;
    height: 100%;
    object-fit: cover;
    pointer-events: none;
  }

  .carousel-custom-slide {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #4a90d9;
    color: #fff;
    font-size: 24px;
    font-weight: bold;
  }

  .carousel-custom-indicators {
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 4px;
  }

  .carousel-custom-indicator {
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.3);
    color: #fff;
    font-size: 12px;
    border-radius: 50%;
  }

  .carousel-custom--active {
    background: #4a90d9;
  }

  .space {
    height: 20px;
  }
}
.demo-comparison-case--2 {
  .carousel {
    height: 160px;
  }

  .carousel-example {
    height: 160px;
  }

  .carousel-item {
    width: 100%;
    height: 100%;
    object-fit: cover;
    pointer-events: none;
  }

  .carousel-custom-slide {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #4a90d9;
    color: #fff;
    font-size: 24px;
    font-weight: bold;
  }

  .carousel-custom-indicators {
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 4px;
  }

  .carousel-custom-indicator {
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.3);
    color: #fff;
    font-size: 12px;
    border-radius: 50%;
  }

  .carousel-custom--active {
    background: #4a90d9;
  }

  .space {
    height: 20px;
  }
}
.demo-comparison-case--3 {
  .carousel {
    height: 160px;
  }

  .carousel-example {
    height: 160px;
  }

  .carousel-item {
    width: 100%;
    height: 100%;
    object-fit: cover;
    pointer-events: none;
  }

  .carousel-custom-slide {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #4a90d9;
    color: #fff;
    font-size: 24px;
    font-weight: bold;
  }

  .carousel-custom-indicators {
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 4px;
  }

  .carousel-custom-indicator {
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.3);
    color: #fff;
    font-size: 12px;
    border-radius: 50%;
  }

  .carousel-custom--active {
    background: #4a90d9;
  }

  .space {
    height: 20px;
  }
}
</style>
```

### Custom Indicator

Example source: src/carousel/example/demos/custom-indicator.vue

```vue
<script setup></script>

<template>
  <mp-carousel class="carousel-example">
    <mp-carousel-item>
      <img class="carousel-item" :src="'cat.jpg'" />
    </mp-carousel-item>
    <mp-carousel-item>
      <img class="carousel-item" :src="'cat2.jpg'" />
    </mp-carousel-item>
    <mp-carousel-item>
      <img class="carousel-item" :src="'cat3.jpg'" />
    </mp-carousel-item>
    <template #indicator="{ slideNumber, length, to }">
      <div class="carousel-custom-indicators">
        <mp-button
          v-for="(l, idx) in length"
          :key="l"
          size="xs"
          round
          :variant="idx + 1 === slideNumber ? 'default' : 'tonal'"
          :status="idx + 1 === slideNumber ? 'primary' : 'default'"
          :aria-label="`跳转至第 ${idx + 1} 页`"
          @click="to(idx + 1)"
          >{{ idx + 1 }}</mp-button
        >
      </div>
    </template>
  </mp-carousel>
</template>

<style lang="less" scoped>
.carousel {
  height: 160px;
}

.carousel-example {
  height: 160px;
}

.carousel-item {
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
}

.carousel-custom-slide {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #4a90d9;
  color: #fff;
  font-size: 24px;
  font-weight: bold;
}

.carousel-custom-indicators {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 4px;
}

.space {
  height: 20px;
}
</style>
```

## Playback and interaction

### Forbid Loop

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `height` | Container height; numbers are px | Autoplay, controlled, interactive-content |
| `keyboard` | Scoped arrow/Home/End navigation | Keyboard Control, controlled, interactive-content |
| `auto-play` | Autoplay configuration | Autoplay, Autoplay with Hover to Pause |
| `draggable` | Mouse dragging, independent of touch | controlled、interactive-content |
| `loop` | Loop without duplicating instances | Forbid Loop |
| `trigger` | Indicator trigger | Trigger with Hover |
<!-- demo-config-notes:end -->


Example source: src/carousel/example/demos/forbid-loop.vue

```vue
<script setup></script>

<template>
  <mp-carousel class="carousel" :loop="false">
    <mp-carousel-item>
      <img class="carousel-item" :src="'cat.jpg'" alt="" />
    </mp-carousel-item>
    <mp-carousel-item>
      <img class="carousel-item" :src="'cat2.jpg'" alt="" />
    </mp-carousel-item>
    <mp-carousel-item>
      <img class="carousel-item" :src="'cat3.jpg'" alt="" />
    </mp-carousel-item>
  </mp-carousel>
</template>

<style lang="less" scoped>
.carousel {
  height: 160px;
}

.carousel-example {
  height: 160px;
}

.carousel-item {
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
}

.carousel-custom-slide {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #4a90d9;
  color: #fff;
  font-size: 24px;
  font-weight: bold;
}

.carousel-custom-indicators {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 4px;
}

.carousel-custom-indicator {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.3);
  color: #fff;
  font-size: 12px;
  border-radius: 50%;
}

.carousel-custom--active {
  background: #4a90d9;
}

.space {
  height: 20px;
}
</style>
```

### Autoplay

The demo uses a 2000ms interval. Displayed slide numbers start at 1; API indices remain one-based. Toggle playback off/on to stop/resume. Focus inside the carousel also pauses playback.

Enable autoplay with `auto-play`. `true` uses a 3000ms interval; a number is the interval in milliseconds.

Example source: src/carousel/example/demos/autoplay.vue

```vue
<script setup>
import { ref } from 'vue'
import { demoEnglish as english } from '@maple-design/cli-vue/demo-language'

const current = ref(1)
const playing = ref(true)
const changes = ref(0)
const sources = ['cat.jpg', 'cat2.jpg', 'cat3.jpg']
</script>

<template>
  <section class="carousel-autoplay-demo">
    <mp-checkbox v-model="playing" edit-mode="direct">{{ english ? 'Autoplay' : '自动播放' }}</mp-checkbox>
    <p role="status">
      {{ english ? 'Current slide' : '当前页' }}：{{ current }}；{{ english ? 'Changes' : '切换次数' }}：{{ changes }}
    </p>
    <mp-carousel
      v-model="current"
      height="180px"
      :auto-play="playing ? 2000 : false"
      @focusin="playing = false"
      @change="changes += 1"
    >
      <mp-carousel-item v-for="(source, index) in sources" :key="source">
        <img
          class="carousel-autoplay-demo__image"
          :src="source"
          :alt="(english ? 'Demo image ' : '示例图片 ') + (index + 1)"
        />
      </mp-carousel-item>
    </mp-carousel>
  </section>
</template>

<style scoped>
.carousel-autoplay-demo__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
}
</style>
```

### Autoplay with Hover to Pause

Example source: src/carousel/example/demos/autoplay-hover-pause.vue

```vue
<script setup></script>

<template>
  <mp-carousel class="carousel" :auto-play="{ interval: 2000, hoverToPause: true }">
    <mp-carousel-item>
      <img class="carousel-item" :src="'cat.jpg'" alt="" />
    </mp-carousel-item>
    <mp-carousel-item>
      <img class="carousel-item" :src="'cat2.jpg'" alt="" />
    </mp-carousel-item>
    <mp-carousel-item>
      <img class="carousel-item" :src="'cat3.jpg'" alt="" />
    </mp-carousel-item>
  </mp-carousel>
</template>

<style lang="less" scoped>
.carousel {
  height: 160px;
}

.carousel-example {
  height: 160px;
}

.carousel-item {
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
}

.carousel-custom-slide {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #4a90d9;
  color: #fff;
  font-size: 24px;
  font-weight: bold;
}

.carousel-custom-indicators {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 4px;
}

.carousel-custom-indicator {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.3);
  color: #fff;
  font-size: 12px;
  border-radius: 50%;
}

.carousel-custom--active {
  background: #4a90d9;
}

.space {
  height: 20px;
}
</style>
```

### Trigger with Hover

Example source: src/carousel/example/demos/trigger-hover.vue

```vue
<script setup></script>

<template>
  <mp-carousel class="carousel" trigger="hover">
    <mp-carousel-item>
      <img class="carousel-item" :src="'cat.jpg'" alt="" />
    </mp-carousel-item>
    <mp-carousel-item>
      <img class="carousel-item" :src="'cat2.jpg'" alt="" />
    </mp-carousel-item>
    <mp-carousel-item>
      <img class="carousel-item" :src="'cat3.jpg'" alt="" />
    </mp-carousel-item>
  </mp-carousel>
</template>

<style lang="less" scoped>
.carousel {
  height: 160px;
}

.carousel-example {
  height: 160px;
}

.carousel-item {
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
}

.carousel-custom-slide {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #4a90d9;
  color: #fff;
  font-size: 24px;
  font-weight: bold;
}

.carousel-custom-indicators {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 4px;
}

.carousel-custom-indicator {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.3);
  color: #fff;
  font-size: 12px;
  border-radius: 50%;
}

.carousel-custom--active {
  background: #4a90d9;
}

.space {
  height: 20px;
}
</style>
```

### Mousewheel Control

Wheeling over the carousel changes slides without scrolling the outer page. With loop enabled, moving backward from the first slide selects the last. This is separate from touch dragging.

Example source: src/carousel/example/demos/mousewheel.vue

```vue
<script setup></script>

<template>
  <mp-carousel class="carousel" mousewheel>
    <mp-carousel-item>
      <img class="carousel-item" :src="'cat.jpg'" alt="" />
    </mp-carousel-item>
    <mp-carousel-item>
      <img class="carousel-item" :src="'cat2.jpg'" alt="" />
    </mp-carousel-item>
    <mp-carousel-item>
      <img class="carousel-item" :src="'cat3.jpg'" alt="" />
    </mp-carousel-item>
  </mp-carousel>
</template>

<style lang="less" scoped>
.carousel {
  height: 160px;
}

.carousel-example {
  height: 160px;
}

.carousel-item {
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
}

.carousel-custom-slide {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #4a90d9;
  color: #fff;
  font-size: 24px;
  font-weight: bold;
}

.carousel-custom-indicators {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 4px;
}

.carousel-custom-indicator {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.3);
  color: #fff;
  font-size: 12px;
  border-radius: 50%;
}

.carousel-custom--active {
  background: #4a90d9;
}

.space {
  height: 20px;
}
</style>
```

### Keyboard Control

Example source: src/carousel/example/demos/keyboard.vue

```vue
<script setup></script>

<template>
  <mp-carousel class="carousel" keyboard>
    <mp-carousel-item>
      <img class="carousel-item" :src="'cat.jpg'" alt="" />
    </mp-carousel-item>
    <mp-carousel-item>
      <img class="carousel-item" :src="'cat2.jpg'" alt="" />
    </mp-carousel-item>
    <mp-carousel-item>
      <img class="carousel-item" :src="'cat3.jpg'" alt="" />
    </mp-carousel-item>
  </mp-carousel>
</template>

<style lang="less" scoped>
.carousel {
  height: 160px;
}

.carousel-example {
  height: 160px;
}

.carousel-item {
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
}

.carousel-custom-slide {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #4a90d9;
  color: #fff;
  font-size: 24px;
  font-weight: bold;
}

.carousel-custom-indicators {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 4px;
}

.carousel-custom-indicator {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.3);
  color: #fff;
  font-size: 12px;
  border-radius: 50%;
}

.carousel-custom--active {
  background: #4a90d9;
}

.space {
  height: 20px;
}
</style>
```

### Handle Change

Example source: src/carousel/example/demos/handle-change.vue

```vue
<script setup>
import { Message } from '@maple-design/ui-vue'
</script>

<template>
  <mp-carousel class="carousel" @change="(slideNumber) => Message(String(slideNumber))">
    <mp-carousel-item>
      <img class="carousel-item" :src="'cat.jpg'" alt="" />
    </mp-carousel-item>
    <mp-carousel-item>
      <img class="carousel-item" :src="'cat2.jpg'" alt="" />
    </mp-carousel-item>
    <mp-carousel-item>
      <img class="carousel-item" :src="'cat3.jpg'" alt="" />
    </mp-carousel-item>
  </mp-carousel>

  <div class="space"></div>
</template>

<style lang="less" scoped>
.carousel {
  height: 160px;
}

.carousel-example {
  height: 160px;
}

.carousel-item {
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
}

.carousel-custom-slide {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #4a90d9;
  color: #fff;
  font-size: 24px;
  font-weight: bold;
}

.carousel-custom-indicators {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 4px;
}

.carousel-custom-indicator {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.3);
  color: #fff;
  font-size: 12px;
  border-radius: 50%;
}

.carousel-custom--active {
  background: #4a90d9;
}

.space {
  height: 20px;
}
</style>
```

### controlled

Example source: src/carousel/example/demos/controlled.vue

```vue
<script setup>
import { ref } from 'vue'

const current = ref(1)
const accept = ref(true)
const proposal = ref(1)
function update(value) {
  proposal.value = value
  if (accept.value) {
    current.value = value
  }
}
</script>
<template>
  <mp-checkbox v-model="accept">Accept changes / 接受切换</mp-checkbox>
  <p>Current: {{ current }} · Proposal: {{ proposal }}</p>
  <mp-carousel :model-value="current" height="180px" keyboard draggable @update:modelValue="update">
    <mp-carousel-item v-for="item in 4" :key="item"
      ><div class="carousel-demo-panel">Slide {{ item }}</div></mp-carousel-item
    >
  </mp-carousel>
</template>
<style scoped>
.carousel-demo-panel {
  display: grid;
  place-items: center;
  height: 100%;
  background: #dbeafe;
  color: #1e3a8a;
}
</style>
```

### interactive-content

The current index and change count expose the controlled model. Arrow/Home/End keys and mouse text selection inside inputs remain native editing actions, not slide navigation. Drag the background or focus the carousel container and press an arrow key to change slides; returning to a slide retains its input text. This example does not demonstrate saving text externally or physical touch selection.

Example source: src/carousel/example/demos/interactive-content.vue

```vue
<script setup>
import { ref } from 'vue'

const current = ref(1)
const changes = ref(0)
</script>

<template>
  <p>Drag the background; inputs retain normal editing. / 拖动背景切换，输入框保留原生编辑。</p>
  <p role="status">Current: {{ current }} · Changes: {{ changes }}</p>
  <mp-carousel
    v-model="current"
    class="carousel-interactive-demo"
    height="180px"
    draggable
    touchable
    keyboard
    @change="changes++"
  >
    <mp-carousel-item v-for="item in 3" :key="item">
      <div class="carousel-demo-panel">
        <label
          >Slide {{ item }} <mp-input edit-mode="direct" :aria-label="'Slide ' + item" placeholder="Type here"
        /></label>
      </div>
    </mp-carousel-item>
  </mp-carousel>
</template>
<style scoped>
.carousel-demo-panel {
  display: grid;
  place-items: center;
  height: 100%;
  background: #dcfce7;
  color: #14532d;
}
input {
  max-width: 150px;
}
</style>
```

## Lifecycle

### Scheduler lifecycle

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `auto-play` | Autoplay configuration | Scheduler lifecycle |
| `move-speed` | Explicit duration in milliseconds | Scheduler lifecycle |
| `height` | Container height; numbers are px | Scheduler lifecycle |
| `keyboard` | Scoped arrow/Home/End navigation | Scheduler lifecycle |
| `mousewheel` | Wheel navigation | Scheduler lifecycle |
<!-- demo-config-notes:end -->


Changing content, restarting navigation or unmounting cancels pending slide movement. Autoplay timing is independent of CSS transitions.

Example source: src/carousel/example/demos/en-US/scheduler-lifecycle.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const active = ref(true)
const mounted = ref(true)
const current = ref(1)
const playing = ref(false)
const moves = ref(0)
</script>
<template>
  <div>
    <mp-button @click="playing = !playing">Autoplay / 自动播放</mp-button>
    <mp-button @click="active = !active">Activate / 停用与激活</mp-button>
    <mp-button @click="mounted = !mounted">Mount / 卸载与挂载</mp-button>
    <p>
      Current / 当前: {{ current }}; changes / 通知: {{ moves }}. Suspend during autoplay or loop settlement, then
      activate. Old work must not replay.
    </p>
    <KeepAlive v-if="mounted">
      <mp-carousel
        v-if="active"
        v-model="current"
        :auto-play="playing ? { interval: 1000 } : false"
        :move-speed="600"
        :height="180"
        keyboard
        mousewheel
        @change="moves++"
      >
        <mp-carousel-item v-for="item in 3" :key="item">Slide / 幻灯片 {{ item }}</mp-carousel-item>
      </mp-carousel>
    </KeepAlive>
  </div>
</template>
```

### Intro

Displays a collection of items that can be scrolled and swiped. Demos match Cedar Design Web; `effect` and `centered-slides` are shared.

## Usage notes

### Looping and autoplay

Each slide always has one component instance. Ordinary previous/next navigation recycles positions after the departing slide exits. Multi-slide or centered jumps that would require one slide in two positions settle immediately without animation, cloning interactive content or queuing unlimited transitions. Fewer items than visible slides are not cloned to fill space. Accessible names follow global Locale; explicit label props take precedence.

Native root listeners such as `keydown`, `mouseenter`, `mouseleave`, `focusin` and `focusout` run alongside internal navigation and autoplay pause handling. Native `.once` listeners fire once for the root element lifetime.

`space-between` also accepts valid CSS lengths such as percentages and `calc()`. Multi-slide layout uses unscaled CSS pixels, so ancestor scaling does not change the gap-to-slide proportion.

If a focused slide becomes inaccessible through navigation or removal, focus moves to the carousel container. Focus in a still-visible slide or outside the carousel is preserved. The container is programmatically focusable but is not in the Tab order unless `keyboard` is enabled; an explicit `tabindex` remains under caller control.

The autoplay example sets `auto-play=false` on focus entry and provides an external switch for an explicit restart. The component itself only pauses temporarily while focus is inside; playback resumes on blur. This differs from the WAI-ARIA APG recommendation to stop on focus until the user explicitly restarts, and is not a claim of full APG conformance; applications requiring that behavior should control playback state. Reduced motion disables transitions but does not by itself stop automatic navigation.

Slide numbers start at 1; finite fractions are truncated toward zero and then wrapped or clamped according to `loop`. Finite `move-speed` values use non-negative milliseconds; non-finite values use the CSS transition duration. The root is a named region and default indicator buttons have localized slide names and current state; their container has no separate group name. `line` and `slider` share the same default bar dimensions; `slider` can grow into available container space and is not draggable.

## API

### Value and default value

Use ordinary `v-model`. `modelValue` is the current slide number, starting at 1. `defaultValue` initializes uncontrolled state only on creation; later changes do not reset it. An explicit bound value takes precedence. Initialization does not emit `update:modelValue`.

### Carousel Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| `model-value` | Controlled one-based slide number | `number` | `undefined` |
| `default-value` | Uncontrolled initial index | `number` | `1` |
| `loop` | Loop without duplicating instances | `boolean` | `true` |
| `auto-play` | Autoplay configuration | `boolean \| number \| CarouselAutoPlayConfig` | `false` |
| `move-speed` | Explicit duration in milliseconds | `number` | `undefined (token)` |
| `trigger` | Indicator trigger | `click \| hover` | `click` |
| `orientation` | Horizontal/vertical axis of carousel sliding, default horizontal; does not determine indicator position | `horizontal \| vertical` | `horizontal` |
| `show-arrow` | Arrow visibility | `always \| hover \| never` | `always` |
| `arrow-class` | Additional arrow class | `string` | `undefined` |
| `indicator` | Show indicators | `boolean` | `true` |
| `indicator-type` | Indicator appearance | `dot \| line \| slider` | `dot` |
| `indicator-position` | Indicator edge or outer region of the carousel container, default bottom. Not a trigger-relative popup placement | `bottom \| top \| left \| right \| outer` | `bottom` |
| `indicator-class` | Additional indicator class | `string` | `undefined` |
| `indicator-color` | Custom indicator background | `string` | `undefined` |
| `height` | Container height; numbers are px | `number \| string` | `undefined` |
| `transition-timing-function` | Explicit timing function | `string` | `undefined (token)` |
| `touchable` | Touch dragging | `boolean` | `true` |
| `draggable` | Mouse dragging, independent of touch | `boolean` | `false` |
| `mousewheel` | Wheel navigation | `boolean` | `false` |
| `keyboard` | Scoped arrow/Home/End navigation | `boolean` | `false` |
| `slides-per-view` | Visible count; auto uses item size | `number \| auto` | `1` |
| `space-between` | Item gap; numbers/numeric strings are px | `number \| string` | `0` |
| `effect` | Effect; all supported by both libraries | `slide \| fade \| card` | `slide` |
| `centered-slides` | Center active slide | `boolean` | `false` |
| `aria-label` | Carousel accessible name | `string` | Locale |
| `previous-button-aria-label` | Previous button accessible name | `string` | Locale |
| `next-button-aria-label` | Next button accessible name | `string` | Locale |

### Model and interaction
Public slide numbers start at 1. Controlled actions emit update:model-value, then change(slideNumber, previousSlideNumber, isManual), and do not move until the parent accepts current. External assignments do not emit change. Method option event:false suppresses only change, not the model proposal. isManual is true for user actions and false for autoplay.

loop moves existing children across boundaries without cloning component instances. Without looping or centering, the final viewport is clamped to avoid empty space; selection can move within the final visible group without moving the track. Partly visible slides remain accessible; fully offscreen slides are inert. fade displays one slide. auto uses explicit CarouselItem width horizontally or height vertically; vertical mode requires a container height. Only CarouselItem children, including those inside Vue Fragments, count as slides; comments and ordinary elements do not.

auto-play=true uses 3000ms and pauses on hover; a number sets milliseconds without hover pausing; an object configures interval/hoverToPause. Focus within, dragging, hidden documents/ancestors and KeepAlive deactivation always pause playback. Reduced-motion preferences are respected. Interactive children such as inputs/buttons keep native behavior; mark custom interactive areas with data-carousel-no-drag. show-arrow=hover also shows arrows on keyboard focus.

### Carousel Events
| Event | Arguments |
| --- | --- |
| update:model-value | slideNumber: number |
| change | slideNumber: number, previousSlideNumber: number, isManual: boolean |

### Carousel Slots
| Slot | Prop |
| --- | --- |
| default | CarouselItem |
| prev / next / indicator | { slideNumber, length, hovering, prev, next, to, resize } |

### Carousel Methods
| Method | Signature |
| --- | --- |
| prev / next | (options?: CarouselToOptions) => void |
| to | (slideNumber: number, options?: CarouselToOptions) => void |
| resize | () => void |

CarouselItem has no own props, events or methods. Its default slot supplies slide content.

## Types
CarouselProps, CarouselItemProps, CarouselInstance, CarouselItemInstance, CarouselEmits, CarouselSlots, CarouselItemSlots, CarouselExpose, CarouselSlotScope, CarouselToOptions, CarouselChangeData, CarouselOrientation, CarouselEffect, CarouselAutoPlayConfig, CarouselArrowType, CarouselIndicatorType, CarouselIndicatorPosition, CarouselTriggerEvent.

## CSS Variables

<!-- component-css-variables:start -->

Use these variables to customize the component. Defaults may vary by the selector condition shown. Each variable applies to the corresponding size, variant and interaction states.

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Default / condition | Affected styles |
| --- | --- | --- |
| `--mp-carousel-arrow-background` | `rgb(0 0 0 / 35%)` | `background` |
| `--mp-carousel-arrow-background-hover` | `rgb(0 0 0 / 55%)` | `background` |
| `--mp-carousel-arrow-color` | `var(--mp-sys-color-content-on-dark)` | `color` |
| `--mp-carousel-arrow-disabled-opacity` | `0.4` | `opacity` |
| `--mp-carousel-arrow-font-size` | `var(--mp-sys-font-size-xl)` | `font-size` |
| `--mp-carousel-arrow-margin` | `var(--mp-sys-space-4)` | `bottom`, `left`, `right`, `top` |
| `--mp-carousel-arrow-size` | `var(--mp-sys-control-height-md)` | `height`, `width` |
| `--mp-carousel-card-duration` | `var(--mp-sys-motion-duration-standard)` | `transition` |
| `--mp-carousel-card-opacity` | `0.6` | `opacity` |
| `--mp-carousel-card-scale` | `0.85` | `transform` |
| `--mp-carousel-fade-duration` | `var(--mp-sys-motion-duration-standard)` | `transition` |
| `--mp-carousel-focus-color` | `var(--mp-sys-color-action-primary)` | `outline` |
| `--mp-carousel-focus-offset` | `2px` | `outline-offset` |
| `--mp-carousel-focus-width` | `2px` | `outline` |
| `--mp-carousel-indicator-color-active` | `var(--mp-sys-color-content-on-dark)` | `background` |
| `--mp-carousel-indicator-color-default` | `rgb(255 255 255 / 35%)` | `background` |
| `--mp-carousel-indicator-dot-size` | `8px` | `height`, `width` |
| `--mp-carousel-indicator-gap` | `var(--mp-sys-space-3)` | `gap` |
| `--mp-carousel-indicator-line-border-radius` | `var(--mp-sys-radius-sm)` | `border-radius` |
| `--mp-carousel-indicator-line-height` | `3px` | `height` |
| `--mp-carousel-indicator-line-width` | `20px` | `width` |
| `--mp-carousel-indicator-outer-margin-bottom` | `var(--mp-sys-space-8)` | `padding-bottom` |
| `--mp-carousel-indicator-position` | `var(--mp-sys-space-4)` | `bottom`, `left`, `right`, `top` |
| `--mp-carousel-navigation-z-index` | `10` | `z-index` |
| `--mp-carousel-transition-duration` | `var(--mp-sys-motion-duration-standard)` | `transition` |
| `--mp-carousel-transition-timing-function` | `ease` | `transition` |

</div>

Apply overrides to the rendered component root or the actual popup ancestor. For example, add the following class to that element and replace the value as needed:

```css
.component-theme {
  --mp-carousel-arrow-background: rgb(0 0 0 / 35%);
}
```

Explicit inline styles and props that write the same CSS property take precedence over stylesheet defaults. After Teleport, ordinary CSS variables inherit from the actual mount location. When using ThemeProvider, follow its local-theme and popup configuration rules. Override the component variable directly for local styling; root-level aliases are not recalculated merely because a descendant system variable changes. Internal variables are not public APIs.

<!-- component-css-variables:end -->
