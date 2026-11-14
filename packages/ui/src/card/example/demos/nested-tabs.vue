<script setup lang="ts">
const rows = [
  ['2025 Q4', '26.25', '+64.2%', '26.5%', '-0.03'],
  ['2026 Q1', '18.12', '-31.0%', '24.6%', '0.82'],
  ['2026 Q2', '16.77', '-7.4%', '25.1%', '-0.12'],
]
</script>

<template>
  <mp-card title="三季报前瞻" class="nested-card-demo" :elevation="false">
    <template #title-action><span class="report-date">2026-08</span></template>
    <mp-tabs swipeable default-value="performance" :item-style="{ padding: '16px 0 0' }" tab-list-aria-label="分析维度">
      <mp-tab-pane name="industry" title="产业链">
        <mp-card title="产业链观察" size="sm" variant="outline" :elevation="false">
          <mp-space direction="column" size="lg">
            <section>
              <h3>上游 · 原材料</h3>
              <p>关注铜、钢材与塑料采购成本变化。</p>
            </section>
            <section>
              <h3>下游 · 终端渠道</h3>
              <p>关注渠道库存、促销节奏与新品销售表现。</p>
            </section>
          </mp-space>
        </mp-card>
      </mp-tab-pane>
      <mp-tab-pane name="performance" title="业绩">
        <mp-space direction="column" size="lg">
          <mp-card title="单季还原（累计相减）" size="sm" variant="outline" :elevation="false">
            <div data-tabs-no-swipe style="touch-action: pan-x pan-y">
              <mp-table :full-width="520" :elevation="false">
                <thead>
                  <tr>
                    <th
                      v-for="heading in ['单季', '营收(亿)', '环比', '毛利率', '净利(亿)']"
                      :key="heading"
                      scope="col"
                    >
                      {{ heading }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="row in rows" :key="row[0]">
                    <td v-for="(cell, index) in row" :key="index">{{ cell }}</td>
                  </tr>
                </tbody>
              </mp-table>
            </div>
            <p class="report-note">示例数据 · 单位：亿元</p>
          </mp-card>
          <mp-card title="经营摘要" size="sm" variant="outline" :elevation="false">
            <p>本季营收 16.77 亿元，毛利率 25.1%。</p>
          </mp-card>
        </mp-space>
      </mp-tab-pane>
      <mp-tab-pane name="capital" title="筹码·资金">
        <mp-card title="资金观察" size="sm" variant="outline" :elevation="false">本期机构持仓数据尚未披露。</mp-card>
      </mp-tab-pane>
      <mp-tab-pane name="technical" title="技术">
        <mp-card title="技术观察" size="sm" variant="outline" :elevation="false">暂无技术分析数据。</mp-card>
      </mp-tab-pane>
    </mp-tabs>
  </mp-card>
</template>

<style scoped>
.nested-card-demo {
  inline-size: 100%;
  min-inline-size: 0;
}
.report-date {
  white-space: nowrap;
  font-size: 12px;
}
.report-note {
  margin-block-start: 8px;
}
h3 {
  margin: 0 0 8px;
  font-size: 14px;
  font-weight: 500;
}
p {
  margin: 0;
}
</style>
