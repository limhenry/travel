<template>
  <div class="grid gap-8">
    <UPageSection
      title="Visited Places"
      :ui="{
        root: 'overflow-x-hidden',
        container: '!px-0 !py-8 sm:gap-6 lg:gap-8',
        title: 'text-left text-xl sm:text-xl lg:text-2xl font-medium',
        description: 'text-left mt-2 text-sm sm:text-md lg:text-sm text-muted'
      }"
    >
      <AppHeatmap />
    </UPageSection>
  </div>
</template>
