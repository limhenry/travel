<template>
  <div>
    <Header />
    <div class="grid gap-4 max-w-screen-xl mx-auto p-4">
      <div class="grid grid-flow-col justify-start gap-2 font-semibold">
        <NuxtLink to="/" class="hover:underline">
          All Countries
        </NuxtLink>
        <span>></span>
        <span>{{ country.name }} ({{ value }} / {{ country.max }})</span>
      </div>
      <div class="lists grid gap-6">
        <StateCard
          v-for="(stateId, key) in states"
          :key="key"
          :country-id="countryId"
          :state-id="stateId"
          :use-country-flag="country.useCountryFlag"
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
      return this.country.states.length
    },
    countryId () {
      return this.$route.params.id
    },
    country () {
      return data.find(e => e.id === this.countryId)
    },
    states () {
      return [...this.country.states, ...new Array(this.country.max - this.value).fill('')]
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
