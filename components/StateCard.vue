<template>
  <div class="subgrid grid gap-3 border-2 border-gray-600 dark:border-gray-500 px-4 py-3 rounded-md text-center">
    <img
      v-if="stateId"
      :src="flagUrl"
      class="block w-full self-center rounded border-2 border-black dark:saturate-[90%]"
      :class="{ 'saturate-[.1] dark:saturate-0 opacity-30': unvisited, 'square-flag': countryId === 'ch' }"
      :alt="flagAlt"
      loading="lazy"
    >
    <div
      v-else
      class="skeleton-flag w-full h-full bg-gray-300 dark:bg-gray-400 rounded"
      :class="{ 'square-flag': countryId === 'ch' }"
    />
    <div v-if="stateId" class="self-center capitalize leading-4" :class="{ 'opacity-30': unvisited }">
      {{ stateName }}
    </div>
    <div v-else class="text-gray-700 dark:text-gray-400">
      ???
    </div>
  </div>
</template>

<script setup lang="ts">
type Props = {
  countryId?: string;
  stateId?: string;
  useCountryFlag?: boolean;
  unvisited?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  countryId: '',
  stateId: ''
})

const normalizeFlagUrl = (url: string) => url.replace(/ü/g, 'ue').replace(/æ/g, 'ae')

const isPng = computed(() => props.stateId.includes('.png'))
const stateName = computed(() => {
  if (isPng.value) { return props.stateId.replace('.png', '').replace(/_/g, ' ') }
  return props.stateId.replace(/_/g, ' ')
})
const flagAlt = computed(() => `Flag of ${stateName.value}`)
const flagUrl = computed(() => {
  if (props.useCountryFlag) { return `/images/countries/${props.countryId}.svg` }
  if (isPng.value) { return `/images/${props.countryId}/${normalizeFlagUrl(props.stateId)}` }
  return `/images/${props.countryId}/${normalizeFlagUrl(props.stateId)}.svg`
})
</script>

<style scoped>
.subgrid {
  grid-template-rows: subgrid;
  grid-template-columns: subgrid;
  grid-row: span 2;
}
.skeleton-flag {
  aspect-ratio: 3/2;
}
.square-flag {
  max-width: 70%;
  margin: auto;
  aspect-ratio: 1/1 !important;
}
</style>
