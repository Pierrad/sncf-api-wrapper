import fetch from "node-fetch";
import { FullJourney, Journey, SimplifiedDisruption, SimplifiedJourney } from "./types";
import { differenceInSecs, isoDateTimeToDate, secondsToHMS } from "./utils/datetime";
import { formatParams } from "./utils/url";

export type JourneysParams = {
  from: string
  to: string
  datetime?: string
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

async function makeRequest(api_key: string, params: JourneysParams): Promise<FullJourney> {
  const url = `https://api.sncf.com/v1/coverage/sncf/journeys?${formatParams(params)}`
  try {
    const res = await fetch(url, {
      headers: {
        Authorization: api_key
      }
    })
    const json: FullJourney = await res.json()
    return json
  } catch (err) {
    throw new Error("Error while fetching journeys")
  }
}

export async function journeys(api_key: string, params: JourneysParams): Promise<Journey[]> {
  return (await makeRequest(api_key, params)).journeys
}

export async function simplifiedJourneys(api_key: string, params: JourneysParams): Promise<SimplifiedJourney[]> {
  return simplifyJourneys(await makeRequest(api_key, params))
}

function simplifyJourneys(fullJourney: FullJourney): SimplifiedJourney[] {
  return fullJourney.journeys.map((journey) => {
    const sections = journey.sections.map((section, index) => {
      if (index === 0) return null
      if (index === journey.sections.length - 1) return null
      if (section.type === 'waiting') return null

      const departureDate = isoDateTimeToDate(section.departure_date_time)
      const arrivalDate = isoDateTimeToDate(section.arrival_date_time)
      const baseDepartureDate = section.base_departure_date_time ? isoDateTimeToDate(section.base_departure_date_time) : null
      const baseArrivalDate = section.base_arrival_date_time ? isoDateTimeToDate(section.base_arrival_date_time) : null

      const delay = baseArrivalDate && baseDepartureDate ? differenceInSecs(arrivalDate, baseArrivalDate) : null

      return {
        ...(section.base_departure_date_time && { baseDepartureTime: baseDepartureDate }),
        ...(section.base_arrival_date_time && { baseArrivalTime: baseArrivalDate }),
        departureTime: departureDate,
        arrivalTime: arrivalDate,
        duration: secondsToHMS(section.duration),
        delay: delay ? secondsToHMS(delay) : null,
        from: section.from?.name,
        to: section.to?.name,
        displayInformations: {
          network: section?.display_informations?.network,
          headsign: section?.display_informations?.headsign,
        },
        disruptions: disruptions(formatDisruptions(section.display_informations), fullJourney.disruptions),
      }
    }).filter((section) => section !== null).map((section) => section as SimplifiedJourney['sections'][0])

    return {
      departureTime: isoDateTimeToDate(journey.departure_date_time),
      arrivalTime: isoDateTimeToDate(journey.arrival_date_time),
      duration: secondsToHMS(journey.duration),
      nbTransfers: journey.nb_transfers,
      status: journey.status,
      sections,
    }
  })
}

function disruptions(disruptionIds: string[] | null, disruptions: FullJourney['disruptions']): SimplifiedDisruption[] | null {
  if (!disruptionIds) return null
  const formatedDisruptions =  disruptionIds.map((disruptionId) => {
    const disruption = disruptions.find((disruption) => disruption.id === disruptionId)
    if (!disruption) return null
    return {
      id: disruption.id,
      severity: disruption.severity,
      messages: disruption?.messages?.map((message) => message.text),
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
