const inquirer = require ("inquirer");
const mysql = require("mysql2");
const cTable = require('console.table');
const env = require('dotenv').config()

//creating a connection object using dotenv
const URI = process.env.MYSQLURI

connection.connect((err) => {
    if (err) throw err;
    console.log(`Connected to the database on port ${PORT}`);
    // starts the application
    start();
});

function start() {
    inquirer
    .prompt ({
        type: "list",
        name: "action",
        message: "What would you like to do?",
        choices: [
            "View all employees",
            "Add an employee",
            "Update an employee role",
            "View All Roles",
            "Add Role",
            "View All Departments",
            "Add Department",
            "Exit",
        ],
    })
    .then((answer) => {
        switch (answer.action){
            case "View all employees":
                viewAllEmployees();
                break;
            case "Add an employee":
                addEmployee();
                break;
            case "Update an employee role":
                updateEmployeeRole();
                break;
            case "View All Roles":
                viewRoles();
                break;
            case "Add Role":
                addRole();
                break;
            case "View All Departments":
                viewAllDepartments();
                break;
            case "Add Department":
                addDepartment();
                break;
        }
    });
};

//VIEW ALL EMPLOYEES OPTIION
function viewAllEmployees() {
    const query = `
    SELECT e.id, e.first_name, e.last_name, r.title, d.department_name, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager_name
    FROM employee e
    LEFT JOIN roles r ON e.role_id = r.id
    LEFT JOIN departments d ON r.department_id = d.id
    LEFT JOIN employee m ON e.manager_id = m.id;
    `;
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        start(); //restarts application 
    });
}

//ADD EMPLOYEE 
function addEmployee() { 
    inquirer.prompt([
        {
          name: "firstname",
          type: "input",
          message: "Enter their first name "
        },
        {
          name: "lastname",
          type: "input",
          message: "Enter their last name "
        },
        {
          name: "role",
          type: "list",
          message: "What is their role? ",
          choices: selectRole()
        },
        {
            name: "choice",
            type: "rawlist",
            message: "Whats their managers name?",
            choices: selectManager()
        }
    ]).then(function (val) {
      var roleId = selectRole().indexOf(val.role) + 1
      var managerId = selectManager().indexOf(val.choice) + 1
      connection.query("INSERT INTO employee SET ?", 
      {
          first_name: val.firstName,
          last_name: val.lastName,
          manager_id: managerId,
          role_id: roleId
          
      }, function(err){
          if (err) throw err
          console.table(val)
          startPrompt()
      })

  })
}

//VIEW ALL ROLES
function viewRoles() {
    connection.query("SELECT employee.first_name, employee.last_name, role.title AS Title FROM employee JOIN role ON employee.role_id = role.id;", 
    function(err, res) {
    if (err) throw err
    console.table(res)
    startPrompt()
    })
  }

//VIEW ALL DEPARTMENTS
function viewAllDepartments() {
    const query = "SELECT * FROM departments";
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        // restart the application
        start();
    });
};

