const mysql = require("mysql2");
const inquirer = require("inquirer");
const express = require("express");
const cTable = require("console.table");

const PORT = process.env.PORT || 3003;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
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
        "Quit",
      ],
    })
    .then(function (result) {
      console.log("Options for: " + result.option);

      switch (result.option) {
        case "View All Departments":
          viewDepartments();
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
};

function viewDepartments() {
  // select *from table tracker_db
  let query = "SELECT name FROM department";
  connection.query(query, [answer.name], function(err, res) {
    if (err) throw err;
    console.table(res);
    promptIntake();
  });
};

function viewRoles() {
    // select from table in racker_db
  let query = "SELECT title FROM role";
  connection.query(query, [answer.title], function(err, res) {
    if (err) throw err;
    console.table(res);
    promptIntake();
  });
};

function viewEmployees() {
      // select from table in racker_db
  let query = "SELECT id, CONCAT(first_name, '' '', last_name) FROM employee";
  connection.query(query,[answer.id], function(err, res) {
    if (err) throw err;
    console.table(res);
    promptIntake();
  });
};

function addDepartment() {
  inquirer.prompt({
    type: "input",
    message: "Please enter the name of the department.",
    name: "depName"

}).then(function(answer){
    connection.query("INSERT INTO department (name) VALUES (?)", [answer.depName] , function(err, res) {
        if (err) throw err;
        console.table(res)
        promptIntake()
})
})
};



function  addRole() {
  inquirer
  .prompt([
    {
      type: "input",
      message: "What is the name of the role?",
      name: "roleName"
    },
    {
      type: "input",
      message: "What is the salary for this role?",
      name: "roleSalary"
    },
    {
      type: "input",
      message: "What is the department ID number?",
      name: "depID"
    }
  ])
  .then(function(answer) {
    connection.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [answer.roleName, answer.roleSalary, answer.depID], function(err, res) {
      if (err) throw err;
      console.table(res);
      promptIntake();
    });
  });
  
};

function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the employee's first name?",
        name: "fName"
      },
      {
        type: "input",
        message: "What is the employee's last name?",
        name: "lName"
      },
      {
        type: "input",
        message: "What is the employee's role ID number?",
        name: "roleID"
      },
      {
        type: "input",
        message: "What is the employee's manager ID number?",
        name: "managerID"
      }
    ])
    .then(function(answer) {
      connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [answer.fName, answer.lName, answer.roleID, answer.managerID], function(err, res) {
        if (err) throw err;
        console.table(res);
        promptIntake();
      });
    });
  
};

function updateEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the ID of the employee you would like to update?",
        name: "employeeUpdate"
      },

      {
        type: "input",
        message: "Which new role would you like to assign?",
        name: "updateRole"
      }
    ])
    .then(function(answer) {
      connection.query('UPDATE employee SET role_id=? WHERE employee_id= ?',[answer.updateRole, answer.employeeUpdate],function(err, res) {
        if (err) throw err;
        console.table(res);
        promptIntake();
      });
    });
};

function quit() {
  connection.end();
  process.exit();
};