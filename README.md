# wormie

> Wormie is an iOS app for requesting video streams from around the world

## Team

  - __Product Owner__: Sunyoung Kim
  - __Scrum Master__: Nick Fujita
  - __DevOps__: Charlie Harrington

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Team](#team)
1. [Contributing](#contributing)

## Usage

> Users can request videos at specific locations. Users who are near a desired location can respond to an open request and capture a video of the content that the other user requested. Once a request is fulfilled, all users of the application can view and browse the videos. Requests can have deadlines associated with them.

Current usecases involve capturing a subject or moment of interest at a specific location (e.g. "Is there a line outside this brunch spot right now?"), or a video between 2 separate points of interest (e.g. "I'd like to see a video of walking across the Golden Gate Bridge.")

## Requirements

### Backend
- Python 2.7 or 3.4 (TBD) 
- Django or Flask (TBD)
- Postgres

### Frontend
- React Native
- React Native modules (TBD: GPS, TBD: Camera)
- Redux
- Auth0
- ES6
- Mapbox API
- Youtube API
- Facebook API

### Dev tools
- Gulp
- Webpack
- Babel 5

### Deployment
- AWS (server)
- Docker (server)
- iOS Store (frontend)

### Testing
- Circle CI
- TBD unit tests

## Development

### Installing Dependencies

From within the root directory:

TBD

EXAMPLE:
```sh
sudo npm install -g bower
npm install
bower install
```

### Roadmap

View the project roadmap [here](https://github.com/trusty-cd-rom/wormie/issues)


## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
