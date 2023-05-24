export type SimplifiedJourney = {
  departureTime: Date
  arrivalTime: Date
  duration: string
  nbTransfers: number
  status: string
  sections: {
    baseDepartureTime?: Date
    baseArrivalTime?: Date
    departureTime: Date
    arrivalTime: Date
    duration: string
    delay: string
    from: string
    to: string
    displayInformations: {
      network: string
      headsign: string
    }
    disruptions: SimplifiedDisruption[]
  }[]
}

export type SimplifiedDisruption = {
  id: string
  severity: Severity
  messages: string[]
}

//
// SNCF API types 
//

export type FullPlace = {
  feed_publishers: FeedPublisher[];
  disruptions:     any[];
  places:          Place[];
  context:         Context;
  links:           Link[];
}

export type Place = {
  id:                     string;
  name:                   string;
  quality:                number;
  administrative_region?: AdministrativeRegion;
  embedded_type:          'stop_area' | 'address' | 'administrative_region' | 'poi' | 'stop_point';
  stop_area?:             StopArea;
}

export type StopArea = {
  id:                     string;
  name:                   string;
  codes:                  Code[];
  timezone:               string;
  label:                  string;
  coord:                  Coord;
  links:                  any[];
  administrative_regions: AdministrativeRegion[];
}

export type FullJourney = {
  feed_publishers: FeedPublisher[];
  links:           Link[];
  journeys:        Journey[];
  tickets:         any[];
  disruptions:     Disruption[];
  terminus:        Terminus[];
  context:         Context;
  notes:           any[];
  exceptions:      any[];
}

export type Context = {
  car_direct_path:  CarDirectPath;
  current_datetime: string;
  timezone:         string;
}

export type CarDirectPath = {
  co2_emission:   Co2Emission;
  air_pollutants: AirPollutants;
}

export type AirPollutants = {
  unit:   string;
  values: Values;
}

export type Values = {
  nox: number;
  pm:  number;
}

export type Co2Emission = {
  value: number;
  unit:  string;
}

export type Disruption = {
  id:                  string;
  disruption_id:       string;
  impact_id:           string;
  application_periods: ApplicationPeriod[];
  status:              string;
  updated_at:          string;
  cause:               string;
  severity:            Severity;
  messages:            Message[];
  impacted_objects:    ImpactedObject[];
  uri:                 string;
  disruption_uri:      string;
  contributor:         string;
}

export type ApplicationPeriod = {
  begin: string;
  end:   string;
}

export type ImpactedObject = {
  pt_object:      PtObject;
  impacted_stops: ImpactedStop[];
}

export type ImpactedStop = {
  stop_point:             StopPoint;
  base_arrival_time:      string;
  base_departure_time:    string;
  amended_arrival_time:   string;
  amended_departure_time: string;
  cause:                  string;
  stop_time_effect:       string;
  departure_status:       string;
  arrival_status:         string;
  is_detour:              boolean;
}

export type StopPoint = {
  id:                      string;
  name:                    string;
  label:                   string;
  coord:                   Coord;
  links:                   any[];
  equipments:              any[];
  administrative_regions?: AdministrativeRegion[];
  stop_area?:              Terminus;
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

export type Terminus = {
  id:                      string;
  name:                    string;
  codes?:                  Code[];
  timezone?:               string;
  label:                   string;
  coord:                   Coord;
  links:                   any[];
  administrative_regions?: AdministrativeRegion[];
  stop_area?:              Terminus;
  equipments?:             any[];
}

export type Code = {
  type:  Type;
  value: string;
}

export enum Type {
  Source = "source",
  Uic = "uic",
}

export type PtObject = {
  id:            string;
  name:          string;
  quality:       number;
  trip:          Trip;
  embedded_type: string;
}

export type Trip = {
  id:   string;
  name: string;
}

export type Message = {
  text:    string;
  channel: Channel;
}

export type Channel = {
  content_type: string;
  id:           string;
  name:         string;
  types:        string[];
}

export type Severity = {
  name:     string;
  effect:   string;
  color:    string;
  priority: number;
}

export type FeedPublisher = {
  id:      string;
  name:    string;
  url:     string;
  license: string;
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
  sections:            Section[];
  links:               Link[];
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
  rel:       'disruptions' | 'terminus';
  internal:  boolean;
  type:      string;
  id:        string;
}

export type From = {
  id:            string;
  name:          string;
  quality:       number;
  stop_area?:    Terminus;
  embedded_type: string;
  stop_point?:   StopPoint;
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
  stop_point:               StopPoint;
  additional_informations:  any[];
  links:                    any[];
}

export type Link = {
  href:      string;
  templated: boolean;
  rel:       string;
  type:      string;
}
