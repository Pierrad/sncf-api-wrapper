import fetch from "node-fetch";
import { Journey } from "./types";

type JourneysParams = {
  from: string
  to: string
  data_freshness?: 'base_schedule' | 'realtime'
  count?: number
}

export async function journeys(api_key: string, params: JourneysParams): Promise<Journey[]> {
  if (!api_key) {
    throw new Error("Missing required parameter 'api_key'")
  }
  
  if (!params || !params.from) {
    throw new Error("Missing required parameter 'from'")
  }

  if (!params || !params.to) {
    throw new Error("Missing required parameter 'to'")
  }

  const url = `https://api.sncf.com/v1/coverage/sncf/journeys?from=${params.from}&to=${params.to}&data_freshness=${params.data_freshness || 'base_schedule'}&count=${params.count || 1}`
  try {
    const res = await fetch(url, {
      headers: {
        Authorization: api_key
      }
    })
    const json = await res.json()
    return json.journeys
  }
  catch (err) {
    console.error(err)
    throw new Error("Error while fetching journeys")
  }
}