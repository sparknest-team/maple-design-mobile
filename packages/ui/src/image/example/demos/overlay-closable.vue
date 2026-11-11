<template>
  <mp-space :size="16" wrap>
    <mp-image width="120" height="120" object-fit="cover" src="/cat.jpg" :preview-props="{ overlayClosable: true }" />
    <mp-image width="120" height="120" object-fit="cover" src="/cat2.jpg" :preview-props="{ overlayClosable: false }" />
  </mp-space>
</template>
