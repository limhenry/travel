<template>
  <div
    ref="map"
    style="width: 100%; height: 800px"
  />
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

import { Map } from 'maplibre-gl'
import { HeatmapLayer } from '@deck.gl/aggregation-layers'
import { MapboxOverlay } from '@deck.gl/mapbox'
import 'maplibre-gl/dist/maplibre-gl.css'

import heatmapData from '~/assets/data/heatmap.json'

const map = ref(null)
let mapInstance: Map | null = null

onMounted(() => {
  if (!map.value) return

  mapInstance = new Map({
    container: map.value,
    style: 'https://tiles.openfreemap.org/styles/fiord',
    center: [0, 20],
    zoom: 1.5,
    minZoom: 1.5,
    maxZoom: 8.5,
    canvasContextAttributes: { antialias: true }
  })

  const heatmapLayer = new HeatmapLayer({
    id: 'HeatmapLayer',
    data: heatmapData,
    aggregation: 'SUM',
    getPosition: d => [d.lon, d.lat],
    getWeight: d => d.count,
    radiusPixels: 25,
    opacity: 0.7
  })

  mapInstance.on('load', () => {
    const deckOverlay = new MapboxOverlay({
      layers: [heatmapLayer]
    })

    mapInstance?.addControl(deckOverlay)
  })
})

onBeforeUnmount(() => {
  if (mapInstance) mapInstance.remove()
})
</script>
