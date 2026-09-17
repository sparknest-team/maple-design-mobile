<template>
  <mp-tabs default-active="home">
    <mp-tabs-navs aria-label="带图标的导航">
      <template #prefix><m-icon-star-fill /></template>
      <mp-tab-nav key="home" title="首页">
        <template #icon><m-icon-home-fill /></template>
      </mp-tab-nav>
      <mp-tab-nav key="profile" title="我的" item-vertical>
        <template #icon><m-icon-user-circle-fill /></template>
      </mp-tab-nav>
      <template #suffix><mp-button size="xs">管理</mp-button></template>
    </mp-tabs-navs>
    <mp-tabs-items>
      <mp-tab-item key="home">首页内容</mp-tab-item>
      <mp-tab-item key="profile">个人中心内容</mp-tab-item>
    </mp-tabs-items>
  </mp-tabs>
</template>
