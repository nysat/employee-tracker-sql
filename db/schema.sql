-- creating database
DROP DATABASE IF EXISTS empltrackerDB;
CREATE DATABASE empltrackerDB;
USE empltrackerDB;
 --department table--
CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    name VARCHAR(30)
);
--roles table--
CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES department(id)
);
--employee table-- 
CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    FOREIGN KEY (role _id) REFERENCES role(id),
    FOREIGN KEY (manager_id) REFERENCES employee(id)
);
