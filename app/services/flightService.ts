import airports from "~/assets/data/airports.json";
import flights from "~/assets/data/flights.json";
import type { Airport, Flight } from "~/types";

export const getFlights = (): Flight[] =>
  flights.map((item) => {
    const origin = airports.find((airport) => airport.iata === item.origin);
    const destination = airports.find(
      (airport) => airport.iata === item.destination
    );

    return {
      ...item,
      origin,
      destination,
    };
  }).reverse();

export const getAirport = (): Airport[] => {
  const codes = flights.reduce((acc: Set<string>, flight) => {
    acc.add(flight.origin);
    acc.add(flight.destination);
    return acc;
  }, new Set<string>());

  return [...codes]
    .map((code) => airports.find((airport) => airport.iata === code))
    .filter((item) => item !== undefined);
};

export const removeReciprocalDuplicates = (routeArray: Flight[]): Flight[] => {
  // Use reduce to iterate and build a temporary Map of unique routes
  const uniqueRoutesMap = routeArray.reduce((acc, route) => {
    const { origin, destination } = route;

    // 1. Normalize the route key by sorting the codes alphabetically.
    // This key is used *only* for checking uniqueness.
    const sortedCodes = [origin?.iata, destination?.iata].sort();
    const normalizedKey = sortedCodes.join("-"); // e.g., "KUL-SIN" or "BER-PEN"

    // 2. If the normalized key isn't already in the Map, store the ENTIRE current object.
    // This ensures that the data from the first encountered version (e.g., KUL-SIN) is kept.
    if (!acc.has(normalizedKey)) {
      acc.set(normalizedKey, route);
    }

    // 3. Return the accumulator (the Map).
    return acc;
  }, new Map()); // Start with an empty Map

  // Convert the values (the original full objects) of the final Map back into an array.
  return Array.from(uniqueRoutesMap.values());
};
