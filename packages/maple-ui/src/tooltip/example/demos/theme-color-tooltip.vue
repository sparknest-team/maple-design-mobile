<script setup></script>

<template>
  <mp-space :size="['14vmin', '2.666vmin']">
    <mp-tooltip content="Tooltip">
      <mp-button>默认</mp-button>
    </mp-tooltip>
    <mp-tooltip status="primary" content="Tooltip">
      <mp-button status="primary">主要</mp-button>
    </mp-tooltip>
    <mp-tooltip status="info" content="Tooltip">
      <mp-button status="info">信息</mp-button>
    </mp-tooltip>
    <mp-tooltip status="success" content="Tooltip">
      <mp-button status="success">成功</mp-button>
    </mp-tooltip>
    <mp-tooltip status="warning" content="Tooltip">
      <mp-button status="warning">警告</mp-button>
    </mp-tooltip>
    <mp-tooltip status="danger" content="Tooltip">
      <mp-button status="danger">危险</mp-button>
    </mp-tooltip>
  </mp-space>
</template>

<style lang="less" scoped>
.placement-container {
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
