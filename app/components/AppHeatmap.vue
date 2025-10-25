<script setup lang="ts">
import { Map } from 'maplibre-gl'
import { HeatmapLayer } from '@deck.gl/aggregation-layers'
import { MapboxOverlay } from '@deck.gl/mapbox'

import heatmapData from '~/assets/data/heatmap.json'

const heatmapLayer = new HeatmapLayer({
  id: 'HeatmapLayer',
  data: heatmapData,
  aggregation: 'SUM',
  getPosition: d => [d.lon, d.lat],
  getWeight: d => d.count,
  radiusPixels: 25,
  opacity: 0.7
})

const onMapLoad = (map: Map) => {
  const deck = new MapboxOverlay({
    layers: [heatmapLayer]
  })

  map.addControl(deck)
}
</script>

<template>
  <AppMap
    class="w-full h-screen"
    :center="[20, 25]"
    :zoom="2"
    :min-zoom="2"
    :max-zoom="8.5"
    @load="onMapLoad"
  />
</template>
