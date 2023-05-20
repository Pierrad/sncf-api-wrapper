import fetch from "node-fetch"
import { FullPlace, Place } from "./types"

export type PlacesParams = {
  q: string
  'type[]'?: 'stop_area' | 'address' | 'administrative_region' | 'poi' | 'stop_point'
  disable_geojson?: boolean
  depth?: number
  from?: string
}

export async function places(api_key: string, params: PlacesParams): Promise<Place[]> {
  if (!api_key) {
    throw new Error("Missing required parameter 'api_key'")
  }
  
  if (!params || !params.q) {
    throw new Error("Missing required parameter 'query'")
  }

  const url = `https://api.sncf.com/v1/coverage/sncf/places?q=${params.q}`
  try {
    const res = await fetch(url, {
      headers: {
        Authorization: api_key
      }
    })
    const json: FullPlace = await res.json()
    return json.places
  } catch (err) {
    console.error(err)
    throw new Error("Error while fetching places")
  }
}

