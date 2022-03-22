
var mysql = require("mysql2");

const connection = mysql.createConnection(
    {
      host: "localhost",
      // MySQL username,
      user: "root",
      // MySQL password
      password: "Lucaeverettdae11!",
      database: "tracker_db",
    },
    console.log(`Connected to the tracker_db database.`)
  );

module.exports = connection;