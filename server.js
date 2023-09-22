const inquirer = require ("inquirer");
const mysql = require("mysql2");


//creating a connection object '
const URI = `mysql2://root:milothecat@127.0.0.0:3306/employee-tracker`

connection.connect((err) => {
    if (err) throw err;
    console.log("Connected to the database!");
    // starts the application
    start();
});