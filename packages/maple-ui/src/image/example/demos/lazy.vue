<template>
  <mp-space :size="16" wrap>
    <mp-image width="160" height="120" object-fit="cover" lazy src="/cat.jpg" preview-disabled />
    <mp-image
      width="160"
      height="120"
      object-fit="cover"
      src="invalid-image.jpg"
      fallback-src="/cat2.jpg"
      preview-disabled
    />
  </mp-space>
</template>
