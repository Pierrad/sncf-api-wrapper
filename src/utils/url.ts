import { JourneysParams } from "src/journeys"
import { PlacesParams } from "src/places"

export function formatParams(params: PlacesParams | JourneysParams): string {
  const stringifiedParams = Object.entries(params).map(([key, value]) => `${key}=${value}`)
  return stringifiedParams.join('&')
}