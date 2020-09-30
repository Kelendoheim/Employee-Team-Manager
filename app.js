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
      // console.log(answers.name, answers.id, answers.email, answers.school)
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
      // console.log(answers.name, answers.id, answers.email, answers.github)
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
      // console.log(answers.name, answers.id, answers.email, answers.office)
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

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
