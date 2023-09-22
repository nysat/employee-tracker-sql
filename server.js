const inquirer = require ("inquirer");
const mysql = require("mysql2");


//creating a connection object '
const URI = `mysql2://root:milothecat@127.0.0.0:3306/employee-tracker`

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
