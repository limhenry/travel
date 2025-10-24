import airports from '~/assets/data/airports.json'
import flights from '~/assets/data/flights.json'

export const getFlights = () => (
  flights.map((item) => {
    const origin = airports.find(airport => airport.iata === item.origin)
    const destination = airports.find(airport => airport.iata === item.destination)

    return {
      ...item,
      origin,
      destination
    }
  })
)

export const getAirport = () => {
  const codes = flights.reduce((acc: Set<string>, flight) => {
    acc.add(flight.origin)
    acc.add(flight.destination)
    return acc
  }, new Set<string>())

  return [...codes].map(code => airports.find(airport => airport.iata === code))
}
