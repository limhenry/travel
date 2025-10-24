import path from 'path'
import dotenv from 'dotenv'
import fetch from 'node-fetch'
import fs from 'fs'

dotenv.config({ path: path.resolve(process.cwd(), '.env') })

const getMarkers = async () => {
  const BASE_URL = process.env.IMMICH_BASE_URL
  const API_KEY = process.env.IMMICH_API_KEY

  const req = await fetch(`${BASE_URL}/api/map/markers?apiKey=${API_KEY}`)

  return await req.json()
}

const binMarkers = (data) => {
  return data.map(item => ({
    lat: Math.floor(item.lat * 100) / 100,
    lon: Math.floor(item.lon * 100) / 100
  }))
}

/**
 * This function is generated using Google Gemini
 *
 * Merges duplicate coordinates, counts them, and then scales the count (ratio)
 * to a new range of 30 to 100.
 *
 * @param {Array<Object>} coordinates - The array of coordinate objects.
 * @returns {Array<Object>} An array of unique coordinate objects with the scaled 'count' property.
 */
const mergeCoordinatesAndScaleRatio = (coordinates) => {
  // 1. Count the occurrences of each unique coordinate
  const countsMap = new Map()

  for (const coord of coordinates) {
    // Create a unique key string
    const key = `${coord.lat},${coord.lon}`

    if (countsMap.has(key)) {
      countsMap.get(key).originalCount++
    } else {
      countsMap.set(key, {
        lat: coord.lat,
        lon: coord.lon,
        originalCount: 1 // Temporarily store the original count
      })
    }
  }

  // Convert the Map values to an array for easy processing
  const uniqueCoordinates = Array.from(countsMap.values())

  // 2. Find the min and max of the original counts
  if (uniqueCoordinates.length === 0) {
    return [] // Handle empty array
  }

  const originalCounts = uniqueCoordinates.map(item => item.originalCount)
  const minCount = Math.min(...originalCounts)
  const maxCount = Math.max(...originalCounts)

  // Define the new target range
  const newMin = 30
  const newMax = 100
  const originalRange = maxCount - minCount
  const newRange = newMax - newMin

  // 3. Scale the original count to the new 30-100 range
  const scaledCoordinates = uniqueCoordinates.map((item) => {
    const originalValue = item.originalCount

    // Check for the edge case where all counts are the same (range is 0)
    if (originalRange === 0) {
      // If all counts are the same, they should all map to the max value (100)
      // or the minimum if we want to represent "one level of data".
      // Since 100 often represents max intensity, we'll use 100.
      item.count = newMax
    } else {
      // Linear scaling formula:
      // new_value = ((old_value - old_min) / (old_max - old_min)) * (new_max - new_min) + new_min
      const scaledValue = ((originalValue - minCount) / originalRange) * newRange + newMin

      // Round the result and ensure it is an integer
      item.count = Math.round(scaledValue)
    }

    // Clean up the temporary originalCount property
    delete item.originalCount

    return item
  })

  return scaledCoordinates
}

const markers = await getMarkers()
const binnedMarkers = binMarkers(markers)
const output = mergeCoordinatesAndScaleRatio(binnedMarkers)

fs.writeFileSync('./app/assets/data/heatmap.json', JSON.stringify(output), 'utf8')
