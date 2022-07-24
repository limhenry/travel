<template>
  <NuxtLink
    :to="id"
    class="grid gap-3 items-start border-2 border-gray-600 dark:border-gray-500 px-4 py-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
  >
    <div class="grid items-center" style="aspect-ratio: 3/2">
      <img
        v-if="id"
        :src="require(`~/assets/countries/${id}.svg`)"
        class="w-full object-contain rounded border-2 border-black dark:saturate-[90%]"
        :alt="flagAlt"
        loading="lazy"
      >
      <div v-else class="w-full h-full bg-gray-300 dark:bg-gray-400 rounded" />
    </div>

    <div v-if="id" class="grid gap-2 leading-4 items-end" style="grid-template-columns: 1fr auto">
      <div class="flex-1 font-medium">
        {{ name }}
      </div>
      <div class="text-gray-700 dark:text-gray-400">
        {{ value }}/{{ max }}
      </div>
      <div class="relative col-span-full bg-gray-300 w-full h-[8px] rounded overflow-hidden">
        <div class="absolute left-0 bg-green-700 dark:bg-green-600 h-full" :style="`width: ${value / max * 100}%`" />
      </div>
    </div>
    <div v-else class="text-gray-700 dark:text-gray-400 text-center">
      ???
    </div>
  </NuxtLink>
</template>

<script>
export default {
  name: 'CountryCard',
  props: {
    id: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    value: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 0
    }
  },
  computed: {
    flagAlt () {
      return `Flag of ${this.name}`
    }
  }
}
</script>

<style scoped>
  /* progress::-webkit-progress-bar {
    background-color: red;
  } */
</style>
