import fs from 'fs'
import path from 'path'

import flights from '../app/assets/data/flights.json' with { type: "json" }

const BASE_LOGO_URL = 'https://images.kiwi.com/airlines/64x64/'
const ASSETS_PATH = path.join('./public/images/logo/')

const airlineCodes = flights.map((flight) => flight.airline_code)
const uniqueAirlineCodes = [...new Set(airlineCodes)]

for (const code of uniqueAirlineCodes) {
  const imageUrl = `${BASE_LOGO_URL}${code}.png`
  const imagePath = path.join(ASSETS_PATH, `${code}.png`)

  try {
    if (fs.existsSync(imagePath)) {
      console.log(`Skipping ${code}.png, file already exists.`)
      continue
    }

    const response = await fetch(imageUrl)
    if (!response.ok) {
      console.warn(`Failed to download ${imageUrl}: ${response.status} ${response.statusText}`)
      continue
    }

    const arrayBuffer = await response.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer) // Convert ArrayBuffer to Node.js Buffer

    fs.writeFileSync(imagePath, buffer)
    console.log(`Downloaded ${code}.png to ${imagePath}`)
  } catch (error) {
    console.error(`Error downloading or saving ${code}.png:`, error)
  }
}