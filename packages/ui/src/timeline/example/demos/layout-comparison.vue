<script setup>
import { proxyRefs as demoProxyRefs, ref } from 'vue'

const scene1 = demoProxyRefs(
  (() => {
    const mode = ref('left')

    const onChange = (_mode) => {
      mode.value = _mode
    }
    return { mode, onChange }
  })(),
)

const scene2 = demoProxyRefs(
  (() => {
    const mode = ref('top')

    const onChange = (_mode) => {
      mode.value = _mode
    }
    return { mode, onChange }
  })(),
)

const scene3 = demoProxyRefs(
  (() => {
    const mode = ref('left')

    const pos = ref('same')

    const onLabelPositionChange = (_pos) => {
      pos.value = _pos
    }

    const onModeChange = (_mode) => {
      mode.value = _mode
    }
    return { mode, pos, onLabelPositionChange, onModeChange }
  })(),
)
</script>

<template>
  <div class="demo-comparison">
    <section class="demo-comparison-case demo-comparison-case--1" data-comparison-scene="vertical">
      <h4><span lang="zh-CN">纵向时间轴</span><span lang="en-US">vertical</span></h4>
      <div>
        <mp-row
          align="center"
          :style="{
            marginBottom: '24px',
          }"
        >
          <span>mode: &nbsp; &nbsp;</span>
          <mp-radio-group :modelValue="scene1.mode" @change="scene1.onChange">
            <mp-radio value="left">left</mp-radio>
            <mp-radio value="right">right</mp-radio>
            <mp-radio value="alternate">alternate</mp-radio>
          </mp-radio-group>
        </mp-row>
        <mp-timeline :mode="scene1.mode" labelPosition="relative">
          <mp-timeline-item label="2012-08">
            <mp-row
              :style="{
                display: 'inline-flex',
                alignItems: 'center',
              }"
            >
              <img
                width="40"
                :style="{
                  marginRight: '16px',
                  marginBottom: '12px',
                }"
                src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/b5d834b83708a269b4562924436eac48.png~tplv-uwbnlip3yd-png.png"
              />
              <div
                :style="{
                  marginBottom: '12px',
                }"
              >
                Toutiao
                <div
                  :style="{
                    fontSize: '12px',
                    color: '#4E5969',
                  }"
                >
                  Founded in 2012
                </div>
              </div>
            </mp-row>
          </mp-timeline-item>
          <mp-timeline-item label="2017-05">
            <mp-row
              :style="{
                display: 'inline-flex',
                alignItems: 'center',
              }"
            >
              <img
                width="40"
                :style="{
                  marginRight: '16px',
                  marginBottom: '12px',
                }"
                src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/385ed540c359ec8a9b9ce2b5fe89b098.png~tplv-uwbnlip3yd-png.png"
              />
              <div
                :style="{
                  marginBottom: '12px',
                }"
              >
                Xigua Video
                <div
                  :style="{
                    fontSize: '12px',
                    color: '#4E5969',
                  }"
                >
                  Founded in 2017
                </div>
              </div>
            </mp-row>
          </mp-timeline-item>
          <mp-timeline-item label="2018-07">
            <mp-row
              :style="{
                display: 'inline-flex',
                alignItems: 'center',
              }"
            >
              <img
                width="40"
                :style="{
                  marginRight: '16px',
                  marginBottom: '12px',
                }"
                src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/385ed540c359ec8a9b9ce2b5fe89b098.png~tplv-uwbnlip3yd-png.png"
              />
              <div
                :style="{
                  marginBottom: '12px',
                }"
              >
                Pipidance
                <div
                  :style="{
                    fontSize: '12px',
                    color: '#4E5969',
                  }"
                >
                  Founded in 2018
                </div>
              </div>
            </mp-row>
          </mp-timeline-item>
        </mp-timeline>
      </div>
    </section>

    <section class="demo-comparison-case demo-comparison-case--2" data-comparison-scene="direction">
      <h4><span lang="zh-CN">横向时间轴</span><span lang="en-US">direction</span></h4>
      <div>
        <mp-row
          align="center"
          :style="{
            marginBottom: '24px',
          }"
        >
          <span>mode: &nbsp; &nbsp;</span>
          <mp-radio-group :modelValue="scene2.mode" @change="scene2.onChange">
            <mp-radio value="top">top</mp-radio>
            <mp-radio value="bottom">bottom</mp-radio>
            <mp-radio value="alternate">alternate</mp-radio>
          </mp-radio-group>
        </mp-row>
        <mp-timeline orientation="horizontal" pending :mode="scene2.mode">
          <mp-timeline-item label="2012-08">
            <mp-row
              :style="{
                display: 'inline-flex',
                alignItems: 'center',
              }"
            >
              <img
                width="40"
                :style="{
                  marginRight: '16px',
                  marginBottom: '12px',
                }"
                src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/b5d834b83708a269b4562924436eac48.png~tplv-uwbnlip3yd-png.png"
              />
              <div
                :style="{
                  marginBottom: '12px',
                }"
              >
                Toutiao
                <div
                  :style="{
                    fontSize: '12px',
                    color: '#4E5969',
                  }"
                >
                  Founded in 2012
                </div>
              </div>
            </mp-row>
          </mp-timeline-item>
          <mp-timeline-item label="2017-05">
            <mp-row
              :style="{
                display: 'inline-flex',
                alignItems: 'center',
              }"
            >
              <img
                width="40"
                :style="{
                  marginRight: '16px',
                  marginBottom: '12px',
                }"
                src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/385ed540c359ec8a9b9ce2b5fe89b098.png~tplv-uwbnlip3yd-png.png"
              />
              <div
                :style="{
                  marginBottom: '12px',
                }"
              >
                Xigua Video
                <div
                  :style="{
                    fontSize: '12px',
                    color: '#4E5969',
                  }"
                >
                  Founded in 2017
                </div>
              </div>
            </mp-row>
          </mp-timeline-item>
          <mp-timeline-item label="2018-07">
            <mp-row
              :style="{
                display: 'inline-flex',
                alignItems: 'center',
              }"
            >
              <img
                width="40"
                :style="{
                  marginRight: '16px',
                  marginBottom: '12px',
                }"
                src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/385ed540c359ec8a9b9ce2b5fe89b098.png~tplv-uwbnlip3yd-png.png"
              />
              <div
                :style="{
                  marginBottom: '12px',
                }"
              >
                Pipidance
                <div
                  :style="{
                    fontSize: '12px',
                    color: '#4E5969',
                  }"
                >
                  Founded in 2018
                </div>
              </div>
            </mp-row>
          </mp-timeline-item>
        </mp-timeline>
      </div>
    </section>

    <section class="demo-comparison-case demo-comparison-case--3" data-comparison-scene="label">
      <h4><span lang="zh-CN">标签文本位置</span><span lang="en-US">label</span></h4>
      <div>
        <mp-row align="center">
          <span>labelPosition: &nbsp; &nbsp;</span>
          <mp-radio-group :modelValue="scene3.pos" @change="scene3.onLabelPositionChange">
            <mp-radio value="same">same</mp-radio>
            <mp-radio value="relative">relative</mp-radio>
          </mp-radio-group>
        </mp-row>
        <mp-row
          align="center"
          :style="{
            margin: '20px 0px 24px',
          }"
        >
          <span>mode: &nbsp; &nbsp;</span>
          <mp-radio-group :modelValue="scene3.mode" @change="scene3.onModeChange">
            <mp-radio value="left">left</mp-radio>
            <mp-radio value="right">right</mp-radio>
            <mp-radio value="alternate">alternate</mp-radio>
          </mp-radio-group>
        </mp-row>
        <mp-timeline :mode="scene3.mode" :labelPosition="scene3.pos">
          <mp-timeline-item label="2017-03-10" dotColor="#52C419"> The first milestone </mp-timeline-item>
          <mp-timeline-item label="2018-05-12" dotColor="#F5222D" labelPosition="same">
            The second milestone
          </mp-timeline-item>
          <mp-timeline-item label="2020-09-30" content-placement="left"> The third milestone </mp-timeline-item>
        </mp-timeline>
      </div>
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
</style>
