<script setup lang="ts">
import { Map, type ProjectionSpecification } from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'

const emit = defineEmits(['load'])
const props = defineProps<{
  projection?: ProjectionSpecification['type'],
  center?: [number, number],
  zoom?: number,
  minZoom?: number,
  maxZoom?: number,
}>()

const mapRef = useTemplateRef('map')
const colorMode = useColorMode()

let map: Map | null = null

onMounted(() => {
  if (!mapRef.value) return

  map = new Map({
    container: mapRef.value,
    style: mapStyleUrl.value,
    center: props.center,
    zoom: props.zoom,
    minZoom: props.minZoom,
    maxZoom: props.maxZoom,
    canvasContextAttributes: { antialias: true },
  })

  map.on('style.load', () => {
    props.projection && map?.setProjection({ type: props.projection })
  })

  map.on('load', () => {
    emit('load', map)
  })
})

onBeforeUnmount(() => {
  if (map) map.remove()
})

const mapStyleUrl = computed(() => {
  return colorMode.value === 'dark'
    ? 'https://tiles.openfreemap.org/styles/fiord'
    : 'https://tiles.openfreemap.org/styles/positron'
})

watch(colorMode, () => {
  map?.setStyle(mapStyleUrl.value)
})
</script>

<template>
  <div ref="map" />
</template>