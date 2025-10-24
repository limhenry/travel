<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

import { Map } from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import { ArcLayer, ScatterplotLayer } from '@deck.gl/layers'
import { MapboxOverlay } from '@deck.gl/mapbox'

const props = defineProps<{
  flights: any[]
  airports: any[]
}>()

const map = ref(null)
let mapInstance: Map | null = null

onMounted(() => {
  if (!map.value) return

  mapInstance = new Map({
    container: map.value,
    style: 'https://tiles.openfreemap.org/styles/fiord',
    center: [70, 40],
    zoom: 2,
    minZoom: 0,
    maxZoom: 10,
    canvasContextAttributes: { antialias: true }
  })

  mapInstance.on('style.load', () => {
    mapInstance?.setProjection({
      type: 'globe'
    })
  })

  const arcLayer = new ArcLayer({
    id: 'ArcLayer',
    data: props.flights,
    getSourcePosition: d => [d.origin.lon, d.origin.lat],
    getTargetPosition: d => [d.destination.lon, d.destination.lat],
    getSourceColor: _ => [113, 208, 215, 200],
    getTargetColor: _ => [113, 180, 150, 200],
    getHeight: 0.3,
    getWidth: 2,
    parameters: { cullMode: 'none', depthTest: false },
    greatCircle: true,
    pickable: true
  })

  const scatterplotLayer = new ScatterplotLayer({
    id: 'ScatterplotLayer',
    data: props.airports,
    getPosition: d => [d.lon, d.lat],
    getFillColor: [191, 239, 243, 180],
    getRadius: 100,
    radiusMinPixels: 5,
    radiusMaxPixels: 20,
    pickable: true,
    parameters: { depthTest: false }
  })

  mapInstance.on('load', () => {
    const deckOverlay = new MapboxOverlay({
      layers: [arcLayer, scatterplotLayer],
      interleaved: true
    })

    mapInstance?.addControl(deckOverlay)
  })
})

onBeforeUnmount(() => {
  if (mapInstance) mapInstance.remove()
})
</script>

<template>
  <div
    ref="map"
    style="width: 100%; height: 100%"
  />
</template>
