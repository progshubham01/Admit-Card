var mysql = require('mysql');
const util = require("util");

var pool = mysql.createPool({multipleStatements: true,
  connectionLimit : 100,
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'test_new',
  charset: 'UTF8MB4_GENERAL_CI'
});

pool.query = util.promisify(pool.query);

module.exports = pool;
