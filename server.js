const mysql = require('mysql2');
const inquirer = require('inquirer');
const express = require('express');
const cTable = require('console.table');


const PORT = process.env.PORT || 3003;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: 'Lucaeverettdae11!',
      database: 'tracker_db'
    },
    console.log(`Connected to the tracker_db database.`)
);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
  