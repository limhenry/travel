<script lang="ts" setup>
import { getAirport, getFlights } from '~/services/flightService'

definePageMeta({
  layout: 'flights'
})

const flights = getFlights()
const airports = getAirport()

const selectedRoute = ref<string[] | undefined>()
</script>

<template>
  <div class="grid grid-cols-2 gap-4 h-screen pt-24 p-4"> 
    <AppFlightTable
      :flights="flights"
      :airports="airports"
      :selected-route="selectedRoute"
      class="overflow-y-auto border border-default rounded-lg"
    />
    <AppFlightMap
      :flights="flights"
      :airports="airports"
      v-model="selectedRoute"
    />
  </div>
</template>
