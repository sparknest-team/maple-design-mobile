<template>
  <mp-space wrap
    ><mp-switch checked-text="ON" unchecked-text="OFF" aria-label="Text props" /><mp-switch
      variant="round"
      aria-label="Text slots"
      ><template #checked>ON</template><template #unchecked>OFF</template></mp-switch
    ></mp-space
  >
</template>
