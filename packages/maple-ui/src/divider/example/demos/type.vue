<template>
  <div>
    <p>实线 / solid</p>
    <mp-divider />
    <p>虚线 / dashed</p>
    <mp-divider type="dashed" />
    <p>点线 / dotted</p>
    <mp-divider type="dotted" />
    <p>双线 / double · 3px</p>
    <mp-divider type="double" :thickness="3" />
  </div>
</template>
