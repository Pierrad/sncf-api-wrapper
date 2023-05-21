jest.mock('node-fetch');

const fetch = require('node-fetch');
const { Response, Headers } = jest.requireActual('node-fetch');

import journeysMock  from '../../data/journey_with_disruption.json';
import { SimplifiedJourney } from 'src/types';
import { journeys, simplifiedJourneys } from '../../src/journeys'

const ResponseInit = {
  status: 200,
  statusText: 'OK',
  headers: new Headers({
    'Content-Type': 'application/json',
    Accept: '*/*',
  }),
};

describe('test journeys', () => {
  it('should return journeys', async () => {
    fetch.mockReturnValue(Promise.resolve(new Response(JSON.stringify(journeysMock), ResponseInit)));

    const res = await journeys('api_key', {
      from: 'stop_area:OCE:SA:87686006',
      to: 'stop_area:OCE:SA:87686006',
    })
  
    expect(res).toEqual(journeysMock.journeys)
  })

  it('should return simplified journeys', async () => {
    fetch.mockReturnValue(Promise.resolve(new Response(JSON.stringify(journeysMock), ResponseInit)));

    const res: SimplifiedJourney[] = await simplifiedJourneys('api_key', {
      from: 'stop_area:OCE:SA:87686006',
      to: 'stop_area:OCE:SA:87686006',
    })
  
    expect(res.length).toEqual(journeysMock.journeys.length)
    expect(res[0]?.sections.length).toEqual(journeysMock.journeys[0]!.sections.length - 2)
    expect(res[0]?.sections[0]?.disruptions?.length).toEqual(1)
  })
})
