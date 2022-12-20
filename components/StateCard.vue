<template>
  <div class="grid gap-2 items-start text-center border-2 border-gray-600 dark:border-gray-500 px-4 py-3 rounded-md">
    <div class="grid items-center" style="aspect-ratio: 3/2">
      <img
        v-if="stateId"
        :src="flagUrl"
        class="w-full object-contain rounded border-2 border-black dark:saturate-[90%]"
        :class="{ 'saturate-[.1] dark:saturate-0 opacity-30': unvisited }"
        :alt="flagAlt"
        loading="lazy"
      >
      <div v-else class="w-full h-full bg-gray-300 dark:bg-gray-400 rounded" />
    </div>
    <div v-if="stateId" class="capitalize leading-4" :class="{ 'opacity-30': unvisited }">
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
