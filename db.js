const sqlite = require('better-sqlite3');
const db = new sqlite('./db.sqlite3');

module.exports = (() => {
  //returns acos in radians
  db.register({name: 'ACOS'}, n => Math.acos(n));
  db.register({name: 'COS'}, n => Math.cos(n));
  db.register({name: 'SIN'}, n => Math.sin(n));
  //http://cwestblog.com/2012/11/12/javascript-degree-and-radian-conversion/
  db.register({name: 'RADIANS'}, degrees => degrees * Math.PI / 180);
  db.register({name: 'DEGREES'}, radians => radians * 180 / Math.PI);

  return db
})();
