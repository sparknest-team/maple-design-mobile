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
