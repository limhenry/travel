<script lang="ts" setup>
import { getAirport, getFlights } from "~/services/flightService";
import type { Airport, Flight, YearItem } from "~/types";

definePageMeta({
  layout: "flights",
});

const flights: Flight[] = getFlights();
const airports: Airport[] = getAirport();

const selectedRoute = ref<string[] | undefined>();
const year = ref<string>("all");

const yearItems = computed<YearItem[]>(() => {
  const items = flights.reduce((acc, flight) => {
    const year = flight.date.split("/")[2];
    acc.set(year, (acc.get(year) || 0) + 1);
    return acc;
  }, new Map());

  return [
    { label: "All Flights", count: flights.length, value: "all" },
    ...[...items].map(([year, count]) => ({
      label: year,
      count: count,
      value: year,
    })),
  ];
});

const filteredFlights = computed<Flight[]>(() => {
  if (year.value === "all") {
    return flights;
  } else {
    return flights.filter((flight) => flight.date.slice(6) === year.value);
  }
});
</script>

<template>
  <div class="grid grid-cols-2 gap-4 h-screen pt-24 p-4">
    <div class="overflow-hidden flex flex-col gap-4">
      <div class="overflow-x-auto scrollbar-none">
        <URadioGroup
          v-model="year"
          :items="yearItems"
          orientation="horizontal"
          variant="card"
          size="sm"
          :ui="{
            item: 'cursor-pointer',
            label: 'whitespace-nowrap',
          }"
        >
          <template #label="{ item }">
            <span class="text-highlighted">{{ item.label }}</span>
            <span class="text-muted"> ({{ item.count }})</span>
          </template>
        </URadioGroup>
      </div>
      <AppFlightTable
        :flights="filteredFlights"
        :airports="airports"
        :selected-route="selectedRoute"
        class="overflow-y-auto border border-default rounded-lg flex-1"
      />
    </div>
    <AppFlightMap
      :flights="filteredFlights"
      :airports="airports"
      v-model="selectedRoute"
    />
  </div>
</template>
