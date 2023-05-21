# sncf-api-wrapper

Fully typed wrapper for the SNCF API.

## Installation

```bash
npm install sncf-api-wrapper
```

## Description

This project propose a wrapper for the SNCF API. It is fully typed and provides a simplified version of the API for the journeys.

Currently, the wrapper only supports the ```journeys``` and ```places``` endpoints.

## Requirements

- API key from SNCF (https://www.digital.sncf.com/startup/api)

## Journeys

The wrapper provides 2 ways to get journeys between two places :  
- Default version that returns the full object without any transformation.
- Simplified version that returns a simplified object containing only the information you might need (departure time, arrival time, duration, delays, train number...).

You can find more details about the API here : https://doc.navitia.io/#journeys

### Default version

```typescript
import { journeys } from 'sncf-api-wrapper';

const res = await journeys('YOUR API KEY', {
  // any parameters from the API documentation (https://doc.navitia.io/#journeys)
})
```

### Simplified version

```typescript
import { simplifyJourneys } from 'sncf-api-wrapper';

const res = await simplifiedJourneys('YOUR API KEY', {
  // any parameters from the API documentation (https://doc.navitia.io/#journeys)
})
```

## Places

You can find more details about the API here : https://doc.navitia.io/#places

```typescript
import { places } from 'sncf-api-wrapper';

const res = await places('YOUR API KEY', {
  // any parameters from the API documentation (https://doc.navitia.io/#places)
})
```