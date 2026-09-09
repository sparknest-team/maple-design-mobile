<template>
  <mp-space direction="column" style="width: 100%">
    <mp-card title="Project overview" description="Keep the team informed." />
    <mp-card
      title="Project overview"
      subtitle="Updated today"
      description="Keep the team informed."
      top-divider
      bottom-divider
    >
      Release checklist and project updates.
      <template #title-action><mp-button size="sm">More</mp-button></template>
      <template #footer><mp-button status="primary">View details</mp-button></template>
    </mp-card>
  </mp-space>
</template>
