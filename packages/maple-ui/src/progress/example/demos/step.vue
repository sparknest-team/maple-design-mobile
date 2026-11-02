<template>
  <mp-space direction="column" size="16px">
    <mp-progress :steps="5" :percent="40" />
    <mp-progress :steps="10" :percent="75" status="warning" size="lg" />
    <mp-progress :steps="5" :percent="100" />
  </mp-space>
</template>
