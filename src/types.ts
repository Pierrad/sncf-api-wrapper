
export type Places = {
  id: string
  name: string
  quality: number
  stop_area?: Stop
  administrative_region: AdministrativeRegion
  embedded_type: 'stop_area' | 'administrative_region'
}

export type Journey = {
  duration:            number;
  nb_transfers:        number;
  departure_date_time: string;
  arrival_date_time:   string;
  requested_date_time: string;
  type:                string;
  status:              string;
  tags:                string[];
  co2_emission:        Co2Emission;
  air_pollutants:      AirPollutants;
  durations:           Distances;
  distances:           Distances;
  fare:                Fare;
  calendars:           Calendar[];
  sections:            Section[];
  links:               JourneyLink[];
}

export type AirPollutants = {
  unit:   string;
  values: Values;
}

export type Values = {
  nox: number;
  pm:  number;
}

export type Calendar = {
  week_pattern:   WeekPattern;
  active_periods: ActivePeriod[];
}

export type ActivePeriod = {
  begin: string;
  end:   string;
}

export type WeekPattern = {
  monday:    boolean;
  tuesday:   boolean;
  wednesday: boolean;
  thursday:  boolean;
  friday:    boolean;
  saturday:  boolean;
  sunday:    boolean;
}

export type Co2Emission = {
  value: number;
  unit:  string;
}

export type Distances = {
  walking:     number;
  bike:        number;
  car:         number;
  ridesharing: number;
  taxi:        number;
  total?:      number;
}

export type Fare = {
  found: boolean;
  total: Total;
  links: any[];
}

export type Total = {
  value: string;
}

export type JourneyLink = {
  href:      string;
  templated: boolean;
  rel:       string;
  type:      string;
}

export type Section = {
  id:                        string;
  duration:                  number;
  co2_emission:              Co2Emission;
  departure_date_time:       string;
  arrival_date_time:         string;
  to:                        From;
  from:                      From;
  geojson:                   Geojson;
  mode?:                     string;
  type:                      string;
  links:                     SectionLink[];
  base_departure_date_time?: string;
  base_arrival_date_time?:   string;
  data_freshness?:           string;
  additional_informations?:  string[];
  display_informations?:     DisplayInformations;
  stop_date_times?:          StopDateTime[];
}

export type DisplayInformations = {
  commercial_mode: string;
  network:         string;
  direction:       string;
  label:           string;
  color:           string;
  code:            string;
  name:            string;
  links:           DisplayInformationsLink[];
  text_color:      string;
  description:     string;
  physical_mode:   string;
  equipments:      any[];
  headsign:        string;
  trip_short_name: string;
}

export type DisplayInformationsLink = {
  templated: boolean;
  rel:       string;
  internal:  boolean;
  type:      string;
  id:        string;
}

export type From = {
  id:            string;
  name:          string;
  quality:       number;
  stop_area?:    Stop;
  embedded_type: string;
  stop_point?:   Stop;
}

export type Stop = {
  id:                      string;
  name:                    string;
  codes?:                  Code[];
  timezone?:               string;
  label:                   string;
  coord:                   Coord;
  links:                   any[];
  administrative_regions?: AdministrativeRegion[];
  stop_area?:              Stop;
  equipments?:             any[];
}

export type AdministrativeRegion = {
  id:       string;
  name:     string;
  level:    number;
  zip_code: string;
  label:    string;
  insee:    string;
  coord:    Coord;
}

export type Coord = {
  lon: string;
  lat: string;
}

export type Code = {
  type:  Type;
  value: string;
}

export enum Type {
  Source = "source",
  Uic = "uic",
}

export type Geojson = {
  type:        string;
  coordinates: Array<number[]>;
  properties:  Property[];
}

export type Property = {
  length: number;
}

export type SectionLink = {
  type: string;
  id:   string;
}

export type StopDateTime = {
  departure_date_time:      string;
  base_departure_date_time: string;
  arrival_date_time:        string;
  base_arrival_date_time:   string;
  stop_point:               Stop;
  additional_informations:  any[];
  links:                    any[];
}
