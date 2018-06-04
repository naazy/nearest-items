const {matchSearchTerm, nearestItems, fullSearch} = require('../queries/item-search');

const db = require('../db');

module.exports = (request, h) => {
  const searchTerm = request.query.searchTerm;
  const searchLat = request.query.lat;
  const searchLng = request.query.lng;

  if(!searchTerm && (!searchLat || !searchLng)){
    return h.response('Your search query is invalid. Please check and try again').code(400);

  } else if(searchTerm && !searchLat || !searchLng){
    return h.response(matchSearchTerm(`%${searchTerm}%`));

  } else if (!searchTerm && searchLat && searchLng){
    return h.response(nearestItems(searchLat, searchLng));

  } else if (searchTerm && searchLat && searchLng){
    return h.response(fullSearch(searchLat, searchLng, `%${searchTerm}%`));
  }
};
