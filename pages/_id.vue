<template>
  <div>
    <Header />
    <div class="grid gap-4 max-w-screen-xl mx-auto w-full p-4">
      <div class="grid grid-flow-col justify-start gap-2 font-semibold">
        <NuxtLink to="/" class="hover:underline">
          All Countries
        </NuxtLink>
        <span>></span>
        <span>{{ country.name }} ({{ value }} / {{ country.max }})</span>
      </div>
      <div class="lists grid gap-6">
        <StateCard
          v-for="(stateId, key) in visited"
          :key="key"
          :country-id="countryId"
          :state-id="stateId"
          :use-country-flag="country.useCountryFlag"
        />
        <StateCard
          v-for="(stateId, key) in country.unvisited"
          :key="key"
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

<script>
import data from '~/data/data.json'

export default {
  name: 'CountryPage',
  computed: {
    value() {
      return this.country.visited.length
    },
    countryId () {
      return this.$route.params.id
    },
    country () {
      return data.find(e => e.id === this.countryId)
    },
    visited() {
      if (this.country.unvisited) return this.country.visited
      return [...this.country.visited, ...new Array(this.country.max - this.value).fill('')]
    }
  }
}
</script>

<style scoped>
  .lists {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }

  .lists > div {
    min-height: 140px;
  }
</style>
