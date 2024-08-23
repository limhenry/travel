<template>
  <div>
    <Header />
    <div v-if="country" class="grid gap-4 max-w-screen-xl mx-auto w-full p-4">
      <div class="grid grid-flow-col justify-start gap-2 font-semibold">
        <NuxtLink to="/" class="hover:underline">
          All Countries
        </NuxtLink>
        <span>></span>
        <span>{{ country.name }} ({{ visitedLength }} / {{ country.max }})</span>
      </div>
      <div class="lists grid gap-6">
        <StateCard
          v-for="(stateId, key) in visited"
          :key="`visited-${key}`"
          :country-id="countryId"
          :state-id="stateId"
          :use-country-flag="country.useCountryFlag"
        />
        <StateCard
          v-for="(stateId, key) in country.unvisited"
          :key="`unvisited-${key}`"
          :country-id="countryId"
          :state-id="stateId"
          :use-country-flag="country.useCountryFlag"
          unvisited
        />
      </div>
    </div>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import data from '~/data/data.json'

const route = useRoute()

const countryId = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id
const visitedLength = computed(() => country.value?.visited.length || 0)
const country = computed(() => data.find(e => e.id === countryId))
const visited = computed(() => {
  if (!country.value) return [];
  if (country.value?.unvisited) { return country.value.visited }
  return [...country.value?.visited, ...new Array(country.value?.max - visitedLength.value).fill('')]
})
</script>

<style scoped>
  .lists {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  }

  .lists > div {
    min-height: 140px;
  }
</style>
