<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'

const props = defineProps<{
  flights: any[]
  selectedRoute: string[] | undefined
}>()

const pagination = ref({
  pageIndex: 0,
  pageSize: 10
})

const columns: TableColumn<any>[] = [{
  accessorKey: 'id',
  header: '#',
}, {
  accessorKey: 'date',
  header: 'Date'
}, {
  accessorKey: 'flight',
  header: 'Flight'
}, {
  accessorKey: 'origin',
  header: 'Origin'
}, {
  accessorKey: 'destination',
  header: 'Destination'
}]

const filteredFlights = computed(() => {
  if (props.selectedRoute) {
    return props.flights.filter((flight) => {
      if (flight.origin.iata === props.selectedRoute?.[0] && flight.destination.iata === props.selectedRoute?.[1]) return true;
      if (flight.origin.iata === props.selectedRoute?.[1] && flight.destination.iata === props.selectedRoute?.[0]) return true;
      return false;
    })
  } else {
    return props.flights
  }
})
</script>

<template>
  <UTable
    ref="table"
    v-model:pagination="pagination"
    :data="filteredFlights"
    :columns="columns"
    sticky
  >
    <template #flight-cell="{ row }">
      <div class="flex items-center gap-3">
        <UAvatar
          :src="`/images/logo/${row.original.airline_code}.png`"
          size="sm"
          loading="lazy"
        />
        <div>
          <p class="font-medium text-highlighted">
            {{ `${row.original.airline_code}${row.original.flight_number || '???'}` }}
          </p>
          <p class="text-muted">
            {{ row.original.tail }}
          </p>
        </div>
      </div>
    </template>

    <template #origin-cell="{ row }">
      <div class="flex items-center gap-3 max-w-[250px]">
        <UIcon
          :name="`flag:${row.original.origin.country.toLowerCase()}-4x3`"
          class="size-5"
        />
        <div class="overflow-x-hidden">
          <p class="font-medium text-highlighted truncate">
            {{ row.original.origin.name }}
          </p>
          <p class="text-muted">
            {{ row.original.origin.iata }} &middot; {{ row.original.origin.municipality }}
          </p>
        </div>
      </div>
    </template>

    <template #destination-cell="{ row }">
      <div class="flex items-center gap-3 max-w-[250px]">
        <UIcon
          :name="`flag:${row.original.destination.country.toLowerCase()}-4x3`"
          class="size-5"
        />
        <div class="overflow-x-hidden">
          <p class="font-medium text-highlighted truncate">
            {{ row.original.destination.name }}
          </p>
          <p class="text-muted">
            {{ row.original.destination.iata }} &middot; {{ row.original.destination.municipality }}
          </p>
        </div>
      </div>
    </template>
  </UTable>
</template>
