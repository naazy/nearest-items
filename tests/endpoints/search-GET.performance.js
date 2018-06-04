const server = require('../../server');
const test = require('../test-setup');

test(`search-GET-tests.js: API returns relevant items closest to the provided latitude
   and longitude in less than 100ms`, {timeout: 1000}, (t) => {

  const options = {
   method: 'GET',
   url: '/search?searchTerm=camera&lat=51.948&lng=0.172943'
  };

  const startTime = getTime();

  server.inject(options).then((response) => {
    const timeElapsed = getTime() - startTime;
    t.ok(timeElapsed < 100, 'search takes less than 100ms');
    t.end();
  });
});

//https://blog.tompawlak.org/measure-execution-time-nodejs-javascript
//process.hrtime is more accurate for measuring performance than Date.now()
const getTime = () => {
  const [ seconds, nanoseconds ] = process.hrtime();
  const exactSeconds = seconds + (nanoseconds / 1000000000);

  return exactSeconds * 1000;
};
