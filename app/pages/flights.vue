<script lang="ts" setup>
import { getAirport, getFlights } from '~/services/flightService'

definePageMeta({
  layout: 'flights'
})

const flights = getFlights()
const airports = getAirport()
</script>

<template>
  <div class="grid grid-cols-2 gap-8 h-screen pt-24 p-4">
    <AppFlightTable
      :flights="flights"
      :airports="airports"
    />
    <AppFlightMap
      :flights="flights"
      :airports="airports"
    />
  </div>
</template>
