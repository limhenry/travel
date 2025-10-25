<script setup lang="ts">
import { ArcLayer } from '@deck.gl/layers'
import { MapboxOverlay } from '@deck.gl/mapbox'
import type { Map } from 'maplibre-gl';

import { removeReciprocalDuplicates } from '~/services/flightService'

const props = defineProps<{
  flights: any[]
  airports: any[],
}>()

const selectedRoute = defineModel<string[]>()

const arcLayer = computed(() => (new ArcLayer({
  id: 'ArcLayer',
  data: removeReciprocalDuplicates(props.flights),
  getSourcePosition: d => [d.origin.lon, d.origin.lat],
  getTargetPosition: d => [d.destination.lon, d.destination.lat],
  getHeight: 0.2,
  getWidth: 2.5,
  parameters: { cullMode: 'none', depthTest: false },
  greatCircle: true,
  pickable: true,
  autoHighlight: true,
  getSourceColor: () => [113, 208, 215, 200],
  getTargetColor: () => [79, 62, 193, 200],
  highlightColor: [229, 192, 32, 255],
  onHover: (e) => {
    const val = [e.object?.origin.iata, e.object?.destination.iata];
    if (selectedRoute.value?.[0] === val[0] && selectedRoute.value?.[1] === val[1]) return;
    selectedRoute.value = e.object && val;
  }
})))

const onMapLoad = (map: Map) => {
  const deck = new MapboxOverlay({
    layers: [arcLayer.value],
    interleaved: true,
    pickingRadius: 4,
  })

  map.addControl(deck)
}
</script>

<template>
  <AppMap
    projection="globe"
    :center="[70, 40]"
    :zoom="2"
    :min-zoom="2"
    :max-zoom="10"
    @load="onMapLoad"
  />
</template>
