<template>
  <mp-tabs default-value="home">
    <mp-tabs-navs aria-label="带图标的导航">
      <template #prefix><m-icon-star-fill /></template>
      <mp-tab-nav name="home" title="首页">
        <template #icon><m-icon-home-fill /></template>
      </mp-tab-nav>
      <mp-tab-nav name="profile" title="我的" item-vertical>
        <template #icon><m-icon-user-circle-fill /></template>
      </mp-tab-nav>
      <template #suffix><mp-button size="xs">管理</mp-button></template>
    </mp-tabs-navs>
    <mp-tabs-items>
      <mp-tab-item name="home">首页内容</mp-tab-item>
      <mp-tab-item name="profile">个人中心内容</mp-tab-item>
    </mp-tabs-items>
  </mp-tabs>
</template>
