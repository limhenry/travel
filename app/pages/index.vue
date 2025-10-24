<template>
  <div class="grid gap-8">
    <UPageHeader
      title="Welcome to Henry's Travel Tracker."
      :ui="{
        root: 'border-none'
      }"
    >
      <template #description>
        He has visited <span class="text-highlighted font-semibold">32 countries</span> and flew over <span class="text-highlighted font-semibold">123,456 km</span>.
      </template>
    </UPageHeader>

    <AppSummary />

    <UPageSection
      title="Visited Countries"
      :ui="{
        root: 'overflow-x-hidden',
        container: '!px-0 !py-8 sm:gap-6 lg:gap-8',
        title: 'text-left text-xl sm:text-xl lg:text-2xl font-medium',
        description: 'text-left mt-2 text-sm sm:text-md lg:text-sm text-muted'
      }"
    >
      <AppCarousel />
    </UPageSection>
  </div>
</template>
