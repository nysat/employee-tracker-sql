-- creating database--
DROP DATABASE IF EXISTS empltrackerDB;
CREATE DATABASE empltrackerDB;
USE empltrackerDB;
 -- department table--
CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    name VARCHAR(30)
);
-- roles table--
CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES department(id)
);
-- employee table-- 
CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    FOREIGN KEY (role_id) REFERENCES role(id),
    FOREIGN KEY (manager_id) REFERENCES employee(id)
);

-- DEPARTMENT-----
INSERT INTO department (name)
VALUE ("Marketing");
INSERT INTO department (name)
VALUE ("Customer service");
INSERT INTO department (name)
VALUE ("Finance");
INSERT INTO department (name)
VALUE ("Tech");

-- EMPLOYEE ROLE-------
INSERT INTO role (title, salary, department_id)
VALUE ("Marketing Lead", 120000, 1);
INSERT INTO role (title, salary, department_id)
VALUE ("Marketing", 100000, 1);
INSERT INTO role (title, salary, department_id)
VALUE ("Customer Service Rep", 10000, 2);
INSERT INTO role (title, salary, department_id)
VALUE ("Accountant", 120000, 3);
INSERT INTO role (title, salary, department_id)
VALUE ("Intern", 80000, 4);
INSERT INTO role (title, salary, department_id)
VALUE ("Software Engineer", 150000, 4);
INSERT INTO role (title, salary, department_id)
VALUE ("Lead Engineer", 190000, 4);

-- EMPLOYEE -------
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Brian", "Roberts", null, 1);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Emy", "Champagne", null, 2);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Mia","Rodriguez",null,3);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("William", "Gonzales", 1, 4);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Christopher", "Scott", 1, 5);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Ellie", "Baker", 1, 6);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Joel", "lewis", 1, 7);

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;