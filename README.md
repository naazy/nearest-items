### Nearest items

Finding items that are nearest to a user. The main two factors in the search are:
- **Text match**: the user types a word or phrase that they want to find, and the search returns items that match this.
- **Location**: the user indicates their location (through geolocation or through typing in the location search box) and the search returns items near the user


### Getting started
- First clone the repo and then run `npm i`
- To start server: `npm start`
- To run tests: `npm t`

### Technology choices
#### Node
- Chosen because easy to integrate existing libraries e.g. better-sqlite3 and swagger.io and because the API returns a JSON (i.e. a native JS object)

#### Hapi
- Used because it's quick to get set up and comes with Shot for testing

####�Better sqlite3
- Chosen because it is fast and lightweight. As the database grows I am keen to keep the speed of the location queries down. Therefore performance was a priority when selecting an sqlite library

#### Tape
- Chosen because very little configuration is needed to get started

#### Enhancements
- Improved modular error handling
- Use swagger.io for documenting the API
