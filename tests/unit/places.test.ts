jest.mock('node-fetch');

const fetch = require('node-fetch');
const { Response, Headers } = jest.requireActual('node-fetch');

import placesMock  from '../../data/places.json';
import { Place } from 'src/types';
import { places } from '../../src/places'

const ResponseInit = {
  status: 200,
  statusText: 'OK',
  headers: new Headers({
    'Content-Type': 'application/json',
    Accept: '*/*',
  }),
};

describe('test places', () => {
  it('should return places', async () => {
    fetch.mockReturnValue(Promise.resolve(new Response(JSON.stringify(placesMock), ResponseInit)));

    const res: Place[] = await places('api_key', {
      q: 'lyon',
      disable_geojson: true,
      'type[]': 'stop_area'
    })
  
    expect(res).toEqual(placesMock.places)
  })
})
