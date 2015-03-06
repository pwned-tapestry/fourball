# 4-Ball

An excessively low barrier for a same day 4-ball

## Team

  - __Product Owner__: Wayne Müler [@wainage](https://github.com/wainage)
  - __Scrum Master__: Nick Sippl-Swezey [@nsipplswezey](https://github.com/nsipplswezey)
  - __Development Superhero__: Philip Rosen [@philipjrosen](https://github.com/philipjrosen)
  - __Development Superhero__: Daniel Tsui [@sdtsui](https://github.com/sdtsui)

## Table of Contents

1. [Roadmap](#roadmap)
1. [Requirements](#dev-requirements)
1. [Installing Dependencies](#installing-dependencies-and-getting-up-and-running)
1. [Team](#team)
1. [Contributing](#contributing)

### Roadmap

View the project roadmap [here](https://github.com/pwned-tapestry/fourball/issues).

## Dev Requirements

1. Ionic/Cordova. Make sure you can get the [demo ionic apps](http://ionicframework.com/getting-started/) up and running with

```sh
ionic serve
```

1. Google maps set up for ionic apps. See [this blog](https://blog.nraboy.com/2014/10/implement-google-maps-using-ionicframework/) for how to set it up.
1. Your own config.js file with your Twilio and Mongolabs API keys. See [server/SAMPLEconfig.js](https://github.com/nsipplswezey/fourball/blob/development/server/SAMPLEconfig.js)
1. MongoDB.

### Installing Dependencies and Getting Up and Running

From within the root directory:

```sh
cd server
npm install
node server.js

cd ./mobile
npm install
ionic serve
```

## The Stack

![stackImage](http://i.imgur.com/o1QVjhN.jpg?1)

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

See [STYLEGUIDE.md](STYLEGUIDE.md) for the project's style manual.
