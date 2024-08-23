<template>
  <div>
    <Header />
    <div class="grid gap-4 max-w-screen-xl mx-auto w-full p-4">
      <div class="grid grid-cols-[auto,1fr]">
        <div class="grid grid-flow-col justify-start gap-2 font-semibold">
          <div>
            <span>All Countries </span>
            <span>({{ countries.length - 1 }})</span>
          </div>
        </div>
        <div class="grid gap-2 grid-flow-col justify-end items-center">
          <input id="transit" v-model="transit" class="cursor-pointer" type="checkbox">
          <label class="cursor-pointer" for="transit">Show transit/layover countries</label>
        </div>
      </div>
      <div class="lists grid gap-6">
        <CountryCard
          v-for="(country, key) in countries"
          :id="country.id"
          :key="key"
          :name="country.name"
          :value="country.visited ? country.visited.length : -1"
          :max="country.max"
          :transit="country.transit"
        />
      </div>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import data from '~/data/data.json'

const transit = ref(true)
const countries = computed(() => [...data.filter(e => e.transit !== !transit.value).filter(e => e.visited && e.visited.length > 0), {}])
</script>

<style scoped>
  .lists {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  }

  .lists > div {
    min-height: 160px;
  }
</style>
