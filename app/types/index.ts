export type Airport = {
  id: number;
  name: string;
  lat: number;
  lon: number;
  country: string;
  municipality: string;
  icao: string;
  iata: string;
}

export type Country = {
  id: string;
  name: string;
  max: number;
  visited?: string[];
  unvisited?: string[];
  useCountryFlag?: boolean;
}

export type Flight = {
  date: string;
  tail: string;
  airline_code: string;
  flight_number: string | number;
  origin?: Airport;
  destination?: Airport;
  aircraft_type: string;
}

export type Heatmap = {
  lat: number;
  lon: number;
  count: number;
}

export type YearItem = {
  label: string;
  value: string;
  count: number;
}