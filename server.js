// Initializes the npm packages used
let mysql2 = require("mysql");
let inquirer = require("inquirer");
require("console.table");

// Initializes the connection letiable to sync with a MySQL database
let connection = mysql2.createConnection({
  host: "localhost",
  port: 3000,
  user: "root",
  password: "cAA185241",
  database: "employee_trackerDB"
});

// Creates the connection with the server and loads the product data upon a successful connection
connection.connect(function(err) {
  // if (err) throw err;
  runSearch();
});

function runSearch() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "Add department",
        "Add role",
        "Add employee",
        "View department",
        "View role",
        "View employee",
        "Update employee role",
        "Exit"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
        case "Add department":
          addDepartment();
          break;
        case "Add role":
          addRole();
          break;
        case "Add employee":
          addEmployee();
          break;
        case "view department":
          viewDepartment();
          break;
        case "View role":
          viewRole();
          break;
        case "View employee":
          viewEmployee();
          break;
        case "Exit":
          connection.end();
          break;
      }
    });
}

function addDepartment() {
  // Asking the user about the department they would like to add
  inquirer
    .prompt({
        type: "input",
        name: "departementName",
        message: "What is the name of the department",
    })
    .then(function(answer) {
      // Using the information the user provided to create a new department
      connection.query("INSERT INTO department SET ?",
      {name: answer.addDepartment},
      function(err) {
        // if (err) throw err;
        console.log("ADDED DEPARTMENT!");
      });
			connection.query("SELECT * FROM department", function(err, result) {
				// if (err) throw err;
				console.table(result);
				runSearch();
			});
		});
}

function addRole() {
	inquirer
		.prompt({
			type: "input",
			name: "roleId",
			message: "What is the new role ID?"
    })
    .then(function(answer) {
			let newRoleTitle = answer.roleId;
      
      inquirer
				.prompt({
					type: "input",
					name: "roleTitle",
					message: "What is the new role title?"
        })
        .then(function(answer) {
          let newSalary = answer.roleTitle;
          
          inquirer
          .prompt({
            type: "input",
            name: "roleSalary",
            message: "What is the new role salary?"
          })
          .then(function(answer) {
            let newSalary = answer.roleSalary;

            inquirer
            .prompt({
              type: "input",
              name: "departmentId",
              message: "What is the new department ID?"
            })
            .then(function(answer) {
              let newSalary = answer.departmentId;
              let query = "INSERT INTO roles (title, salary, department_id) VALUES ?";
            connection.query(
              query,[roleTitle, newSalary, newDepartmentID],
              function(err, res) {
                if (err) {
                  console.log(err);
                }
                runSearch();
              }
							);
						});
				});
		});
  })
}