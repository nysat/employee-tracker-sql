const inquirer = require ("inquirer");
const mysql = require("mysql2");
const cTable = require('console.table');

const connection = mysql.createPool({
    host: '127.0.0.1',
    port: 3306, 
    user: 'root',
    password: 'milothecat',
    database: 'empltrackerDB',
});
start();

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
            "Delete an employee",
            "Delete Role",
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
            case "Delete an employee":
                 deleteEmployee();
                 break;   
            case "Delete Role":
                 deleteRole();
                break; 
        }
    });
};

//VIEW ALL EMPLOYEES OPTIION
function viewAllEmployees() {
    const query = `
    SELECT e.id, e.first_name, e.last_name, r.title, department_id, CONCAT(m.first_name, ' ', m.last_name) AS manager_name
    FROM employee e
    LEFT JOIN role r ON e.role_id = r.id
    LEFT JOIN department d ON r.department_id = d.id
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
    connection.query("SELECT * FROM role", function(err, res) {
        if (err) throw err;

        const roles = res.map((role) => role.title);

        inquirer.prompt([
            {
                name: "firstname",
                type: "input",
                message: "Enter their first name"
            },
            {
                name: "lastname",
                type: "input",
                message: "Enter their last name"
            },
            {
                name: "role",
                type: "list",
                message: "What is their role?",
                choices: roles
            },
        ]).then(function (val) {
            const roleId = res.find((role) => role.title === val.role).id;

            connection.query("INSERT INTO employee SET ?",
                {
                    first_name: val.firstname,
                    last_name: val.lastname,
                    role_id: roleId
                }, function (err) {
                    if (err) throw err;
                    console.log(`Added ${val.firstname} ${val.lastname} to the database.`);
                    start(); // Restart the application
                }
            );
        });
    });
}


//UPDATE EMPLOYEE ROLE
function updateEmployeeRole() {
    const queryEmployees =
        "SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee LEFT JOIN role ON employee.role_id = role.id";
    const queryRoles = "SELECT * FROM role";
    connection.query(queryEmployees, (err, resEmployees) => {
        if (err) throw err;
        connection.query(queryRoles, (err, resRoles) => {
            if (err) throw err;
            inquirer
                .prompt([
                    {
                        type: "list",
                        name: "employee",
                        message: "Select the employee to update:",
                        choices: resEmployees.map(
                            (employee) =>
                                `${employee.first_name} ${employee.last_name}`
                        ),
                    },
                    {
                        type: "list",
                        name: "role",
                        message: "Select the new role:",
                        choices: resRoles.map((role) => role.title),
                    },
                ])
                .then((answers) => {
                    const employee = resEmployees.find(
                        (employee) =>
                            `${employee.first_name} ${employee.last_name}` ===
                            answers.employee
                    );
                    const role = resRoles.find(
                        (role) => role.title === answers.role
                    );
                    const query =
                        "UPDATE employee SET role_id = ? WHERE id = ?";
                    connection.query(
                        query,
                        [role.id, employee.id],
                        (err, res) => {
                            if (err) throw err;
                            console.log(
                                `Updated ${employee.first_name} ${employee.last_name}'s role to ${role.title} in the database!`
                            );
                            start();
                        }
                    );
                });
        });
    });
}

//VIEW ALL ROLES
function viewRoles() {
    const query = "SELECT * FROM role"; // Update table name if necessary
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        start(); // Restart the application
    });
}
//ADD ROLE
function addRole() {
    connection.query("SELECT role.title AS Title, role.salary AS Salary FROM role",   function(err, res) {
      inquirer.prompt([
          {
            name: "Title",
            type: "input",
            message: "What is the roles Title?"
          },
          {
            name: "Salary",
            type: "input",
            message: "What is the Salary?"
 
          }
      ]).then(function(res) {
          connection.query(
              "INSERT INTO role SET ?",
              {
                title: res.Title,
                salary: res.Salary,
              },
              function(err) {
                  if (err) throw err
                  console.table(res);
                  start();
              }
          )
 
      });
    });
    }

//VIEW ALL DEPARTMENTS
function viewAllDepartments() {
    const query = "SELECT * FROM department";
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        // restart the application
        start();
    });
};
//ADD A DEPARTMENT
function addDepartment() {
    inquirer.prompt([
        {
          name: "name",
          type: "input",
          message: "What Department would you like to add?"
        }
    ]).then(function(res) {
        var query = connection.query(
            "INSERT INTO department SET ? ",
            {
              name: res.name
           
            },
            function(err) {
                if (err) throw err
                console.table(res);
                start();
            }
        )
    })
  };

//DELETES A ROLE
function deleteRole() {
    connection.query("SELECT * FROM role", function (err, res) {
      if (err) throw err;
  
      const roleChoices = res.map((role) => role.title);
  
      inquirer
        .prompt([
          {
            name: "role",
            type: "list",
            message: "Select the role to delete:",
            choices: roleChoices,
          },
        ])
        .then(function (val) {
          const roleId = res.find((role) => role.title === val.role).id;
  
          connection.query(
            "DELETE FROM role WHERE id = ?",
            [roleId],
            function (err) {
              if (err) throw err;
              console.log(`Deleted role: ${val.role}`);
              start(); 
            }
          );
        });
    });
  }
//DELETE AN EMPLOYEE 
function deleteEmployee() {
    connection.query("SELECT * FROM employee", function (err, res) {
      if (err) throw err;
  
      const employeeChoices = res.map(
        (employee) => `${employee.first_name} ${employee.last_name}`
      );
  
      inquirer
        .prompt([
          {
            name: "employee",
            type: "list",
            message: "Select the employee to delete:",
            choices: employeeChoices,
          },
        ])
        .then(function (val) {
          const employeeId = res.find(
            (employee) =>
              `${employee.first_name} ${employee.last_name}` === val.employee
          ).id;
  
          connection.query(
            "DELETE FROM employee WHERE id = ?",
            [employeeId],
            function (err) {
              if (err) throw err;
              console.log(`Deleted employee: ${val.employee}`);
              start(); 
            }
          );
        });
    });
  }