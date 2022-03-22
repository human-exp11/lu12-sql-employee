const inquirer = require("inquirer");
const cTable = require("console.table");
const path = require("path");

const lib_dir = path.resolve(__dirname, "./lib");
const choose = require("./lib/choose");
const connection = require("./lib/mysql");

//initialize function
const init = async () => {
  try {
    //prompt user with required info from choose.js
    const data = await inquirer.prompt(choose()[0]);
      //switch case to determine user's next prompts
      switch (data.choose) {
        case "View All Departments":
          viewDepartments();
          break;
        case "View All Roles":
          viewRoles();
          break;
        case "View All Employees":
          viewEmployees();
          break;
        case "Add Department":
          addDepartment();
          break;
        case "Add Role":
          addRole();
          break;
        case "Add Employee":
          addEmployee();
          break;
        case "Update Employee Role":
          updateEmployee();
          break;
        default:
          break;
      }
    } catch(err) {
      console.log(err);
  };
};

function viewDepartments() {
  // select from table tracker_db
  let query = "SELECT name, id FROM department";
  connection.query(query, function(err, res) {
    if (err) throw err;
    console.table(res);
   init();
  });
};

const viewRoles = () => {
  connection.query('SELECT title, salary, name FROM role INNER JOIN department ON role.department_id = department.id ORDER BY title ASC;', (err, res) => {
      if (err) throw err;
      //Display data
      console.log('\n');
      console.table(['Role', 'Salary', 'Department'], res.map(role => [role.title, role.salary, role.name]));
      console.log('\n');
     init();
  });
}

function viewEmployees() {
      // select from table in racker_db
  let query = "SELECT employee.first_name, employee.last_name,  role.title, role.salary, department.name, CONCAT(manager.first_name, ' ', manager.last_name) AS manager  FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON employee.manager_id = manager.id";
  connection.query(query, function(err, res) {
    if (err) throw err;
    console.table(res);
    init();
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
        console.log("Added."),
        init()
})
})
};



async function  addRole() {
  const depts = await connection.promise().query("SELECT id AS value, name AS name FROM department")
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
      type: "list",
      message: "Choose Department",
      choices: depts[0],
      name: "depID"
    }
  ])
  .then(function(answer) {
    connection.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [answer.roleName, answer.roleSalary, answer.depID], function(err, res) {
      if (err) throw err;
      console.table(res);
      init();
    });
  });
  
};

async function addEmployee() {
  const role = await connection.promise().query("SELECT id AS value, title AS name FROM role")
  const man = await connection.promise().query("SELECT id AS value, CONCAT(first_name, ' ', last_name)  AS name FROM employee")
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
        type: "list",
        message: "Choose Role?",
        choices: role[0],
        name: "roleID"
      },
      {
        type: "list",
        message: "Who is the Manager?",
        choices: man[0],
        name: "managerID"
      }
    ])
    .then(function(answer) {
      connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [answer.fName, answer.lName, answer.roleID, answer.managerID], function(err, res) {
        if (err) throw err;
        console.table(res);
        init();
      });
    });
  
};

async function updateEmployee() {
  const role = await connection.promise().query("SELECT id AS value, title AS name FROM role")
  const man = await connection.promise().query("SELECT id AS value, CONCAT(first_name, '' '', last_name)  AS name FROM employee")
  inquirer
    .prompt([
      {
        type: "list",
        message: "Choose Employee?",
        choices: man[0],
        name: "employeeUpdate"
      },

      {
        type: "list",
        message: "Choose a Role?",
        choices: role[0],
        name: "updateRole"
      }
    ])
    .then(function(answer) {
      connection.query('UPDATE employee SET role_id=? WHERE id= ?',[answer.updateRole, answer.employeeUpdate],function(err, res) {
        if (err) throw err;
        console.table(res);
        init();
      });
    });
};

//initialization of app
init();
