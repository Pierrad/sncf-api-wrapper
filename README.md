# sncf-api-wrapper

Fully typed wrapper for the SNCF API.

## Description

- Places
- Journeys

This is a wrapper for the SNCF API. It is not an official wrapper.

### Journeys

The wrapper provides 2 ways to get journeys between two places :  
- Default version that returns the full object without any transformation.
- Simplified version that returns a simplified object containing only the information you might need (departure time, arrival time, duration, delays, train number...).


### TODO

- [ ] Add tests with mock data
- [ ] Add more documentation
- [ ] Better query parameters handling
- [ ] Better error handling