DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department (
    id INT,
    dep_name VARCHAR(30),
    PRIMARY KEY (id)
);

CREATE TABLE roles (
    id INT NOT NULL,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL,
    department_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY department_id REFERENCES department(id)
);

CREATE TABLE employee (
    id INTO NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT NOT NULL,
    FOREIGN KEY role_id
    REFERENCES roles(id),
    PRIMARY KEY (id),
    FOREIGN KEY manager_id
    REFERENCES manager(id)
);

CREATE TABLE manager (
    id INT NOT NULL,
    manager_name VARCHAR(35),
    PRIMARY KEY (id)
);