const fs = require("fs");
const inquirer = require("inquirer");
const mysql = require("mysql2");
require("console.table");
require("dotenv").config();

const db = mysql.createConnection({
  host: "localhost",
  user: process.env.EMP_USER,
  password: process.env.MYSQL_PASS,
  database: process.env.EMP_DB,
});

const title = ` ______ __  __ _____  _      ______     ________ ______   __  __          _   _          _____ ______ _____  
            |  ____|  \/  |  __ \| |    / __ \ \   / /  ____|  ____| |  \/  |   /\   | \ | |   /\   / ____|  ____|  __ \ 
            | |__  | \  / | |__) | |   | |  | \ \_/ /| |__  | |__    | \  / |  /  \  |  \| |  /  \ | |  __| |__  | |__) |
            |  __| | |\/| |  ___/| |   | |  | |\   / |  __| |  __|   | |\/| | / /\ \ | . ' | / /\ \| | |_ |  __| |  _  / 
            | |____| |  | | |    | |___| |__| | | |  | |____| |____  | |  | |/ ____ \| |\  |/ ____ \ |__| | |____| | \ \ 
            |______|_|  |_|_|    |______\____/  |_|  |______|______| |_|  |_/_/    \_\_| \_/_/    \_\_____|______|_|  \_\
`;
console.table(title);

runEmployeeManager = () => {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do:",
        name: "parentMenuOption",
        choices: [
          "View All Employees",
          "Add an Employee",
          "Update Employee Role",
          "View All Roles",
          "Add Role",
          "View All Departments",
          "Add Department",
          "Quit",
        ],
      },
    ])
    .then((data) => {
      if (data.parentMenuOption === "View All Employees") {
        viewEmployees();
      } else if (data.parentMenuOption === "Add an Employee") {
        addEmployee(data);
      } else if (data.parentMenuOption === "Update Employee Role") {
        updateRole(data);
      } else if (data.parentMenuOption === "View All Roles") {
        viewRoles(data);
      } else if (data.parentMenuOption === "Add Role") {
        addRoles(data);
      } else if (data.parentMenuOption === "View All Departments") {
        viewDepartments(data);
      } else if (data.parentMenuOption === "Add Department") {
        addDepartment(data);
      }
    });
};

viewEmployees = () => {
  db.query("SELECT * FROM employee", function (err, results) {
    console.table(results);
  });
  runEmployeeManager();
};

// db.query(`DELETE FROM course_names WHERE id = ?`, 3, (err, result) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(result);
// });

addEmployee = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the new employee's first name?",
        name: "employeeFirstName",
      },

      {
        type: "input",
        message: "What is the new emlpoyee's last name?",
        name: "employeeLastName",
      },

      {
        type: "list",
        message: "What is the new employee's role?",
        choices: ["Engineer", "Salesperson", "Account Manager", "Lawyer"],
        name: "newEmployeeRole",
      },
      {
        type: "list",
        message: "Who is the employee's manager?",
        choices: ["Spencer", "David", "Jeremy", "Enzo"],
        name: "newEmployeeManager",
      },
    ])
    .then((data) => {
      let id = 5;
      let managerId = 1;
      let roleId = 1;
      let first = data.employeeFirstName;
      let last = data.employeeLastName;
      db.query(
        `INSERT INTO employee
        (id,first_name, last_name, role_id, manager_id)
            SET = ?`,
        id,
        first,
        last,
        roleId,
        managerId
      );
      console.log(
        `${data.employeeFirstName} ${data.employeeLastName} has been added to the database.`
      );
      runEmployeeManager();
    });
};

updateRole = () => {
  inquirer
    .prompt([
      {
        type: "list",
        message: "Which employee's role do you want to update?",
        choice: ["April", "David"],
        name: "updatedRole",
      },

      {
        type: "list",
        message: "Which role do you want to assign the selected employee?",
        choices: db.query("SOME STUFF HERE"),
        name: "assignNewRole",
      },
    ])
    .then((data) => db.query("SOMETHING"));
  console.log("Updated Employee's Role!");
  runEmployeeManager();
};

viewRoles = () => {
  db.query("SELECT * FROM roles", function (err, results) {
    if (err) {
      console.log(err);
    }
    console.table(results);
    runEmployeeManager();
  });
};

addRoles = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the name of the role you would like to add?",
        name: "newRole",
      },
      {
        type: "input",
        message: "What is the salary of the role you would like to add?",
        name: "salary",
      },

      {
        type: "list",
        message: "Which department does the role belong to?",
        name: "newRoleDepartment",
        choices: ["Engineering", "Finance", "Legal", "Sales", "Service"],
      },
    ])
    .then((data) => db.query(`${data.newRoleDepartment}`));
  console.log(`added ${data.newRole} to the database`);
  runEmployeeManager();
};

viewDepartments = () => {
  console.log("viewDepartments");
  db.query("SELECT * FROM department", function (err, results) {
    if (err) {
      console.log(err);
    }
    console.table(results);
    runEmployeeManager();
  });
};

addDepartment = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the name of the department you would like to add?",
        name: "newDepartment",
      },
    ])
    .then(
      (data) => db.query("DO STUFF HERE"),
      function (err, results) {
        console.log("A new department has been added to the databse!");
      }
    );
  runEmployeeManager();
};

runEmployeeManager();
