import fetch from "node-fetch";
import { FullJourney, Journey, SimplifiedDisruption, SimplifiedJourney } from "./types";
import { isoDateTimeToReadableDate, secondsToHMS } from "./datetime";

type JourneysParams = {
  from: string
  to: string
  datetime?: string // YYYYMMDDThhmmss
  datetime_represents?: 'departure' | 'arrival'
  traveler_type?: 'standard' | 'slow_walker' | 'fast_walker' | 'wheelchair' | 'luggage'
  data_freshness?: 'base_schedule' | 'realtime'
  'forbidden_uris[]'?: string[]
  'allowed_id[]'?: string[]
  'first_section_mode[]'?: string[]
  'last_section_mode[]'?: string[]
  depth?: number
  max_duration_to_pt?: number
  walking_speed?: number
  bike_speed?: number
  bss_speed?: number
  car_speed?: number
  min_nb_journeys?: number
  max_nb_journeys?: number
  count?: number
  max_nb_transfers?: number
  min_nb_transfers?: number
  max_duration?: number
  wheelchair?: boolean
  direct_path?: 'indifferent' | 'none' | 'only'
  'direct_path_mode[]'?: string[]
  'add_poi_infos[]'?: boolean[]
  debug?: boolean
  free_radius_from?: number
  free_radius_to?: number
  timeframe_duration?: number
}

export async function journeys(api_key: string, params: JourneysParams, simplified: boolean = false): Promise<Journey[] | SimplifiedJourney[]> {
  // TODO: Handle missing parameters
  const url = `https://api.sncf.com/v1/coverage/sncf/journeys?from=${params.from}&to=${params.to}&data_freshness=${params.data_freshness || 'base_schedule'}&count=${params.count || 1}`
  try {
    const res = await fetch(url, {
      headers: {
        Authorization: api_key
      }
    })
    const json: FullJourney = await res.json()
    if (simplified) return simplifyJourneys(json)
    return json.journeys
  }
  catch (err) {
    console.error(err)
    throw new Error("Error while fetching journeys")
  }
}

function simplifyJourneys(fullJourney: FullJourney): SimplifiedJourney[] {
  return fullJourney.journeys.map((journey) => {
    const sections = journey.sections.map((section, index) => {
      if (index === 0) return null
      if (index === journey.sections.length - 1) return null
      return {
        departureTime: isoDateTimeToReadableDate(section.departure_date_time),
        arrivalTime: isoDateTimeToReadableDate(section.arrival_date_time),
        duration: secondsToHMS(section.duration),
        from: section.from.name,
        to: section.to.name,
        displayInformations: {
          network: section?.display_informations?.network,
          headsign: section?.display_informations?.headsign,
        },
        disruptions: disruptions(formatDisruptions(section.display_informations), fullJourney.disruptions, section.from.id, section.to.id),
      }
    }).filter((section) => section !== null).map((section) => section as SimplifiedJourney['sections'][0])

    return {
      departureTime: isoDateTimeToReadableDate(journey.departure_date_time),
      arrivalTime: isoDateTimeToReadableDate(journey.arrival_date_time),
      duration: secondsToHMS(journey.duration),
      nbTransfers: journey.nb_transfers,
      status: journey.status,
      sections,
    }
  })
}

function disruptions(disruptionIds: string[] | null, disruptions: FullJourney['disruptions'], from: string, to: string): SimplifiedDisruption[] | null {
  if (!disruptionIds) return null
  const formatedDisruptions =  disruptionIds.map((disruptionId) => {
    const disruption = disruptions.find((disruption) => disruption.id === disruptionId)
    if (!disruption) return null
    return {
      id: disruption.id,
      severity: disruption.severity,
      messages: disruption.messages.map((message) => message.text),
      amendedDepartureTime: getAmendedDepartureTime(disruption, from),
      amendedArrivalTime: getAmendedArrivalTime(disruption, to),
    }
  }).filter((disruption) => disruption !== null).map((disruption) => disruption as SimplifiedDisruption)
  if (formatedDisruptions.length === 0) return null
  return formatedDisruptions
}

function formatDisruptions(display_informations: Journey['sections'][0]['display_informations']): string[] | null {
  if (!display_informations) return null
  if (!display_informations.links) return null
  return display_informations.links.filter((link) => link.rel === 'disruptions').map((link) => link.id)
}

function getAmendedDepartureTime(disruption: FullJourney['disruptions'][0], from: string): string | null {
  if (!disruption.impacted_objects) return null
  const impactedObject = disruption.impacted_objects.find((impactedObject) => impactedObject.impacted_stops.find((impactedStop) => impactedStop.stop_point.id === from))
  if (!impactedObject) return null
  const impactedStop = impactedObject.impacted_stops.find((impactedStop) => impactedStop.stop_point.id === from)
  if (!impactedStop) return null
  return impactedStop.amended_departure_time
} 

function getAmendedArrivalTime(disruption: FullJourney['disruptions'][0], to: string): string | null {
  if (!disruption.impacted_objects) return null
  const impactedObject = disruption.impacted_objects.find((impactedObject) => impactedObject.impacted_stops.find((impactedStop) => impactedStop.stop_point.id === to))
  if (!impactedObject) return null
  const impactedStop = impactedObject.impacted_stops.find((impactedStop) => impactedStop.stop_point.id === to)
  if (!impactedStop) return null
  return impactedStop.amended_arrival_time
}