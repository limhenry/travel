<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import { getPaginationRowModel } from '@tanstack/vue-table'

defineProps<{
  flights: any[]
}>()

const table = useTemplateRef('table')

const pagination = ref({
  pageIndex: 0,
  pageSize: 10
})

const columns: TableColumn<any>[] = [{
  accessorKey: 'id',
  header: '#',
  cell: ({ row }: { row: any }) => row.index + 1
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
</script>

<template>
  <div>
    <UTable
      ref="table"
      v-model:pagination="pagination"
      :data="flights"
      :columns="columns"
      class="flex-1 border border-default rounded-lg"
      :pagination-options="{
        getPaginationRowModel: getPaginationRowModel()
      }"
    >
      <template #flight-cell="{ row }">
        <div class="flex items-center gap-3">
          <UAvatar
            :src="`https://images.kiwi.com/airlines/64/${row.original.airline_code}.png`"
            size="sm"
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
        <div class="flex items-center gap-3">
          <UIcon
            :name="`flag:${row.original.origin.country.toLowerCase()}-4x3`"
            class="size-5"
          />
          <div>
            <p class="font-medium text-highlighted">
              {{ row.original.origin.name }}
            </p>
            <p class="text-muted">
              {{ row.original.origin.iata }} &middot; {{ row.original.origin.municipality }}
            </p>
          </div>
        </div>
      </template>

      <template #destination-cell="{ row }">
        <div class="flex items-center gap-3">
          <UIcon
            :name="`flag:${row.original.destination.country.toLowerCase()}-4x3`"
            class="size-5"
          />
          <div>
            <p class="font-medium text-highlighted">
              {{ row.original.destination.name }}
            </p>
            <p class="text-muted">
              {{ row.original.destination.iata }} &middot; {{ row.original.destination.municipality }}
            </p>
          </div>
        </div>
      </template>
    </UTable>

    <div class="flex justify-center mt-4">
      <UPagination
        :default-page="(table?.tableApi?.getState().pagination.pageIndex || 0) + 1"
        :items-per-page="table?.tableApi?.getState().pagination.pageSize"
        :total="table?.tableApi?.getFilteredRowModel().rows.length"
        @update:page="(p) => table?.tableApi?.setPageIndex(p - 1)"
      />
    </div>
  </div>
</template>
