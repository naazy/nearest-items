const {matchSearchTerm, nearestItems, fullSearch}  = require('../../queries/item-search');
const test = require('../test-setup');

test(`item-search: matchSearchTerm returns relevant items matching the search term`, (t) => {
  const actualResult = matchSearchTerm('%lawnMower%');

  const expectedResult =  [ {
    item_name: 'Flymo Turbo Compact 350 Lawnmower',
    item_url: 'london/hire-flymo-turbo-compact-350-lawnmower-17382083',
    img_urls: '["flymo-turbo-compact-350-lawnmower-50903667.jpg","flymo-turbo-compact-350-lawnmower-35213374.jpg","flymo-turbo-compact-350-lawnmower-60003640.jpg","flymo-turbo-compact-350-lawnmower-22175365.jpg"]'
  }, {
    item_name: 'lawnmower ',
    item_url: 'london/hire-lawnmower--42232116',
    img_urls: '["lawnmower--80778710.jpg"]'
  } ];

    t.deepEquals(actualResult, expectedResult, 'all lawnmowers are returned');
    t.equals(actualResult.length, 2, '2 items are returned');
    t.end();
});

test(`item-search: matchSearchTerm returns relevant items matching the search term`, (t) => {
  const actualResult = nearestItems(51.441234, 0.112943);

  const expectedResult = {
      item_name: 'Condenser Microphone - Rode NTG-2 Dual Powered Shotgun ',
      item_url: 'london/hire-condenser-microphone--rode-ntg2-dual-powered-shotgun--27835429',
      img_urls: '["condenser-microphone--rode-ntg2-dual-powered-shotgun--27123140.jpg","condenser-microphone--rode-ntg2-dual-powered-shotgun--41317305.jpg"]',
      distance: 4.37568385083993
  }

    t.deepEquals(actualResult[0], expectedResult, 'all nearby items');
    t.equals(actualResult.length, 20, '20 nearest items are returned');
    t.end();
});


test(`item-search: matchSearchTerm returns relevant items matching the search term`, (t) => {
  const actualResult = fullSearch(51.948001, 0.172943, '%camera%');

  const expectedResult = {
    item_name: 'Canon 1DX Mark ii (mkii) Camera',
    item_url: 'london/hire-canon-1dx-mark-ii-mkii-03829018',
    img_urls: '["canon-1dx-mark-ii-mkii-67147444.jpg"]',
    distance: 34.8416262274966
  };

    t.deepEquals(actualResult[0], expectedResult, 'closest cameras are returned');
    t.equals(actualResult.length, 20, '20 items are returned');
    t.end();
});
