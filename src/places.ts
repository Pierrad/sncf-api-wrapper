import fetch from "node-fetch"
import { Places } from "./types"

export type PlacesParams = {
  query: string
}

export async function places(api_key: string, params: PlacesParams): Promise<Places[]> {
  if (!api_key) {
    throw new Error("Missing required parameter 'api_key'")
  }
  
  if (!params || !params.query) {
    throw new Error("Missing required parameter 'query'")
  }

  const url = `https://api.sncf.com/v1/coverage/sncf/places?q=${params.query}`
  try {
    const res = await fetch(url, {
      headers: {
        Authorization: api_key
      }
    })
    const json = await res.json()
    return json.places
  } catch (err) {
    console.error(err)
    throw new Error("Error while fetching places")
  }
}

