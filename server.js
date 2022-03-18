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
    promptIntake();
});
  
function promptIntake() {
  inquirer
    .prompt({
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View All Departments",
        "View All Roles",
        "View All Employees",
        "Add Department",
        "Add Role",
        "Add Employee",
        "Update Employee Role",
        "Quit"
      ],
    })
    .then(function(result) {
      console.log("Options for: " + result.option);

      switch (result.option) {
        case "View All Departments":
          viewDepartment();
          break;
          case "View All Roles":
            viewRoles();
            break;
            case "View All Employees":
              viewEmployees();
              break;
        case "Add a Department":
          addDepartment();
          break;
        case "Add a Role":
          addRole();
          break;
        case "Add an Employee":
          addEmployee();
          break;
        case "Update an Employee Role":
          updateEmployee();
          break;
        default:
          quit();
      }
    });
}