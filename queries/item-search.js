const db = require('../db');

module.exports = (() => {

  const matchSearchTerm = (queryParam) => {
    const query =
      `SELECT item_name, item_url, img_urls
      FROM items
      WHERE item_name LIKE ?
      ORDER BY item_name
      LIMIT 20;`;

    return db.prepare(query).all(queryParam);
  }

  const nearestItems = (lat, lng) => {
    const query = `
          ${haversineFormulaQuery}
           ORDER BY distance
           LIMIT 20;`;
    return db.prepare(query).all(lat, lng);
  }

  const fullSearch = (lat, lng, searchTerm) => {
    const query = `
          ${haversineFormulaQuery}
           AND item_name LIKE ?
           ORDER BY distance
           LIMIT 20;`;

    return db.prepare(query).all(lat, lng, searchTerm);
  }

  return {matchSearchTerm, nearestItems, fullSearch};
})();

//thanks for the Haversine formula query inspiration here
//https://www.plumislandmedia.net/mysql/haversine-mysql-nearest-loc/
//calculates the distance between points taking into account the curvature of the earth.
//111.045 chosen for results in km  (use 69 for miles)
const haversineFormulaQuery =
  `SELECT item_name, item_url, img_urls, distance
    FROM (
      SELECT items.*, point.radius,
        point.distance_unit
          * DEGREES(ACOS(COS(RADIANS(point.lat))
          * COS(RADIANS(items.lat))
          * COS(RADIANS(point.lon - items.lng))
          + SIN(RADIANS(point.lat))
          * SIN(RADIANS(items.lat)))) AS distance
       FROM items
        JOIN (
         SELECT ? AS lat, ? AS lon,
                 50.0  AS radius,  111.045 AS distance_unit
             ) AS point
       WHERE items.lat
         BETWEEN point.lat  - (point.radius / point.distance_unit)
             AND point.lat  + (point.radius / point.distance_unit)
        AND items.lng
         BETWEEN point.lon - (point.radius / (point.distance_unit * COS(RADIANS(point.lat))))
             AND point.lon + (point.radius / (point.distance_unit * COS(RADIANS(point.lat))))
     )
     WHERE distance <= radius`;
