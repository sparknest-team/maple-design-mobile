<template>
  <section class="divider-flow-demo">
    <h4>1px：最小显式线宽 / Minimum explicit width</h4>
    <div class="flow-sample">
      <mp-divider
        data-min-line
        :thickness="1"
        :spacing="0"
        description="内容仍正常占位 / Content stays in normal flow"
      />
      <p>后续正文 / Following content</p>
    </div>
    <h4>4px：多行文字 / Multiline content</h4>
    <div class="flow-sample">
      <mp-divider
        data-multiline
        :thickness="4"
        :spacing="0"
        description="分区标题支持换行，并为后续内容保留完整空间 / A wrapping section title reserves its full height"
      />
      <p>后续正文 / Following content</p>
    </div>
    <h4>默认插槽 / Custom content</h4>
    <div class="flow-sample">
      <mp-divider data-custom-content :spacing="0"
        ><span class="flow-content">第一行 / First line<br />第二行 / Second line</span></mp-divider
      >
      <p>后续正文 / Following content</p>
    </div>
    <p>thickness ≥ 1；hairline 优先，使用主题线宽的一半。hairline takes priority and halves the theme width.</p>
  </section>
</template>
<style scoped>
.flow-sample {
  max-width: 280px;
}
.flow-sample p {
  margin: 0;
}
.flow-content {
  padding: 12px 0;
}
</style>
