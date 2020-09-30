const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const employeeArray = [];
// the following function will have all other functions inside and will do everything
function promptUser() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "Would you like to add an employee to your team?",
        name: "addEmployee",
        choices: ["Yes", "No"],
      },
    ])
    .then(function (answers) {
        //the following conditional will run the corresponding function to generate a new object from the associated class
      if (answers.addEmployee === "Yes") {
        employeeType()
          .then(function (answers) {
            if (answers.employeeType === "Intern") {
              internData()
                .then(function (answers) {
                  promptUser();
                })
                .catch(function (err) {
                  console.log(err);
                });
            } else if (answers.employeeType === "Engineer") {
              engineerData()
                .then(function (answers) {
                  promptUser();
                })
                .catch(function (err) {
                  console.log(err);
                });
            } else if (answers.employeeType === "Manager") {
              managerData()
                .then(function (answers) {
                  promptUser();
                })
                .catch(function (err) {
                  console.log(err);
                });
            }
          })
          .catch(function (err) {
            console.log(err);
          });
      } else {
          //if the user declines to add another team member the html will be generated
        const employeeHTML = render(employeeArray);
        fs.writeFile(outputPath, employeeHTML, function(err) {

            if (err) {
              return console.log(err);
            }
          
            console.log("Successfully wrote new HTML file.");
          
          });
      }
    })
    .catch(function (err) {
      console.log(err);
    });
}
// this function will check to see which type of employee the user wants to add
function employeeType() {
  return inquirer.prompt([
    {
      type: "list",
      message: "Which type of employee would you like to add?",
      name: "employeeType",
      choices: ["Intern", "Engineer", "Manager"],
    },
  ]);
}
//this function will create an object from the Intern class and push it into the employee array
function internData() {
  return inquirer
    .prompt([
      {
        name: "name",
        message: "Enter your name:",
        type: "input",
      },
      {
        name: "id",
        message: "Enter your ID:",
        type: "input",
      },
      {
        name: "email",
        message: "Enter your email:",
        type: "input",
      },
      {
        name: "school",
        message: "Which school did/does the intern attend?",
        type: "input",
      },
    ])
    .then(function (answers) {
      const internObj = new Intern(
        answers.name,
        answers.id,
        answers.email,
        answers.school
      );
      employeeArray.push(internObj);
    })
    .catch(function (err) {
      console.log(err);
    });
}
//this function will create an object from the Engineer class and push it into the employee array
function engineerData() {
  return inquirer
    .prompt([
      {
        name: "name",
        message: "Enter your name:",
        type: "input",
      },
      {
        name: "id",
        message: "Enter your ID:",
        type: "input",
      },
      {
        name: "email",
        message: "Enter your email:",
        type: "input",
      },
      {
        name: "github",
        message: "Please enter the engineer's github username:",
        type: "input",
      },
    ])
    .then(function (answers) {
      const engineerObj = new Engineer(
        answers.name,
        answers.id,
        answers.email,
        answers.github
      );
      employeeArray.push(engineerObj);
    })
    .catch(function (err) {
      console.log(err);
    });
}
//this function will create an object from the Manager class and push it into the employee array
function managerData() {
  return inquirer
    .prompt([
      {
        name: "name",
        message: "Enter your name:",
        type: "input",
      },
      {
        name: "id",
        message: "Enter your ID:",
        type: "input",
      },
      {
        name: "email",
        message: "Enter your email:",
        type: "input",
      },
      {
        name: "office",
        message: "What is the manager's office number?",
        type: "input",
      },
    ])
    .then(function (answers) {
      const managerObj = new Manager(
        answers.name,
        answers.id,
        answers.email,
        answers.office
      );
      employeeArray.push(managerObj);
    })
    .catch(function (err) {
      console.log(err);
    });
}
promptUser();


