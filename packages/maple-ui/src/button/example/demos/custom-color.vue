<template>
  <div style="display: flex; flex-wrap: wrap; gap: 12px">
    <mp-button color="#6750a4" text-color="white" :elevation="6">Custom filled</mp-button>
    <mp-button color="linear-gradient(to bottom right, #6750a4, #d0bcff)" text-color="white">Gradient</mp-button>
    <mp-button color="#6750a4" variant="text">Custom text</mp-button>
    <mp-button color="#6750a4" variant="outline">Custom outline</mp-button>
    <mp-button color="#6750a4" variant="tonal">Custom tonal</mp-button>
    <mp-button :ripple="false" :elevation="false">No ripple or shadow</mp-button>
  </div>
</template>
