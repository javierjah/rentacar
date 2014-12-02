var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'k',
  database : 'rentacar'
});

module.exports = connection;