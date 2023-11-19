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

<script>
export default {
  name: 'CountryCard',
  props: {
    countryId: {
      type: String,
      default: ''
    },
    stateId: {
      type: String,
      default: ''
    },
    useCountryFlag: {
      type: Boolean,
      default: false
    },
    unvisited: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    isPng () {
      return this.stateId.includes('.png')
    },
    stateName () {
      if (this.isPng) { return this.stateId.replace('.png', '').replace(/_/g, ' ') }
      return this.stateId.replace(/_/g, ' ')
    },
    flagAlt () {
      return `Flag of ${this.stateName}`
    },
    flagUrl () {
      if (this.useCountryFlag) { return require(`~/assets/countries/${this.countryId}.svg`) }
      if (this.isPng) { return require(`~/assets/${this.countryId}/${this.stateId}`) }
      return require(`~/assets/${this.countryId}/${this.stateId}.svg`)
    }
  }
}
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
