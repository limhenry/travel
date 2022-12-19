<template>
  <div>
    <Header />
    <div class="grid gap-4 max-w-screen-xl mx-auto p-4">
      <div class="grid gap-2 grid-flow-col justify-end items-center">
        <input id="transit" v-model="transit" class="cursor-pointer" type="checkbox">
        <label class="cursor-pointer" for="transit">Show transit/layover countries</label>
      </div>
      <div class="lists grid gap-6">
        <CountryCard
          v-for="(country, key) in countries"
          :id="country.id"
          :key="key"
          :name="country.name"
          :value="country.states ? country.states.length : -1"
          :max="country.max"
        />
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import data from '~/data/data.json'

export default {
  name: 'IndexPage',
  data: () => ({
    transit: false
  }),
  computed: {
    countries () {
      return [...data, {}].filter(e => e.transit !== !this.transit)
    }
  }
}
</script>

<style scoped>
  .lists {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  }

  .lists > div {
    min-height: 160px;
  }
</style>
