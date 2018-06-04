const server = require('../../server');
const test = require('../test-setup');

test(`search-GET-tests.js: API returns relevant items closest to the provided latitude
   and longitude`, (t) => {

  const options = {
   method: 'GET',
   url: '/search?searchTerm=camera&lat=51.948001&lng=0.172943'
  };

  server.inject(options).then((response) => {

    const expectedResult = {
      item_name: 'Canon 1DX Mark ii (mkii) Camera',
      item_url: 'london/hire-canon-1dx-mark-ii-mkii-03829018',
      img_urls: '["canon-1dx-mark-ii-mkii-67147444.jpg"]',
      distance: 34.8416262274966
    };

    t.equals(response.statusCode, 200, 'status code returns 200')
    t.deepEquals(JSON.parse(response.payload)[0], expectedResult,
      'the closest camera appears');
    t.equals(JSON.parse(response.payload).length, 20, '20 items are returned');
    t.end();
  });
});

test(`search-GET-tests.js: API returns relevant items when no longitude or latitude provided`, (t) => {

  const options = {
   method: 'GET',
   url: '/search?searchTerm=camera'
  };

  server.inject(options).then((response) => {

    const expectedResult = {
      item_name: '2 Replacement Batteries LP-E6 for Canon Cameras with Dual Charger',
      item_url: 'london/hire-2-replacement-batteries-lpe6-for-canon--cameras-with-dual-charger-06975425',
      img_urls: '["2-replacement-batteries-lpe6-for-canon-cameras-with-dual-charger-93252315.jpg"]'
    }

    t.equals(response.statusCode, 200, 'status code returns 200')
    t.deepEquals(JSON.parse(response.payload)[0], expectedResult,
      'the first camera item appears (sorted alphabetically)');
    t.equals(JSON.parse(response.payload).length, 20, '20 items are returned');
    t.end();
  });
});

test(`search-GET-tests.js: API returns items closest to the provided latitude
   and longitude when no search term provided`, (t) => {

  const options = {
   method: 'GET',
   url: '/search?lat=51.448123&lng=0.112943'
  };

  server.inject(options).then((response) => {

    const expectedResult = {
      item_name: 'Condenser Microphone - Rode NTG-2 Dual Powered Shotgun ',
      item_url: 'london/hire-condenser-microphone--rode-ntg2-dual-powered-shotgun--27835429',
      img_urls: '["condenser-microphone--rode-ntg2-dual-powered-shotgun--27123140.jpg","condenser-microphone--rode-ntg2-dual-powered-shotgun--41317305.jpg"]',
      distance: 3.669889657773877 }

    t.equals(response.statusCode, 200, 'status code returns 200')
    t.deepEquals(JSON.parse(response.payload)[0], expectedResult, 'the closest items appear');
    t.equals(JSON.parse(response.payload).length, 20, '20 items are returned');
    t.end();
  });
});

test(`search-GET-tests.js: API returns 400 code when lat provided with no lng`, (t) => {

  const options = {
   method: 'GET',
   url: '/search?lng=0.172943'
  };

  server.inject(options).then((response) => {
    t.equals(response.statusCode, 400, 'status code returns 500')
    t.end();
  });
});
