<template>
  <mp-space direction="column" :size="16">
    <mp-date-picker
      default-value="2026-10-20 09:30:00"
      show-time
      :disable-confirm="false"
      presentation="calendarPicker"
    />
    <mp-date-picker
      default-value="2026-10-20 09:30:00"
      show-time
      :disable-confirm="false"
      presentation="calendarPicker"
    >
      <template #actions="{ selectNow, nowDisabled, confirm, disabled }">
        <mp-button variant="text" :disabled="nowDisabled" @click="selectNow">此刻</mp-button>
        <mp-button :disabled="disabled" @click="confirm">完成</mp-button>
      </template>
    </mp-date-picker>
  </mp-space>
</template>
