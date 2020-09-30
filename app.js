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
  inquirer.prompt([
    {
      type: "list",
      message: "Would you like to add another employee?",
      name: "addEmployee",
      choices: ["Yes", "No"],
    }
  ]).then(function (answers) {
    if (answers.addEmployee === "Yes") {
        console.log(answers.addEmployee)
      employeeType()
        .then(function (answers) {
          console.log(answers.employeeType);
          if(answers.employeeType === "Intern"){
              internData().then(function (answers) {
                console.log(answers.school);
                promptUser()
            })
            .catch(function (err) {
                console.log(err);
              });
          }
          else if(answers.employeeType === "Engineer"){
              engineerData().then(function (answers) {
                console.log(answers.github);
                promptUser()
            })
            .catch(function (err) {
                console.log(err);
              });
          }else if(answers.employeeType === "Manager"){
              managerData().then(function (answers) {
                console.log(answers.office);
                promptUser()
            })
            .catch(function (err) {
                console.log(err);
              });
        }
          
        })
        .catch(function (err) {
          console.log(err);
        });
    } else{
        buildHTML();
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

function internData(){
    return inquirer.prompt([
        {
            name: "name",
            message: "Enter your name:",
            type: "input"
        },
        {
            name: "id",
            message: "Enter your ID:",
            type: "input"
        },
        {
            name: "email",
            message: "Enter your email:",
            type: "input"
        },
        {
            name: "school",
            message: "Which school did/does the intern attend?",
            type: "input"
        }
    ])
}
function engineerData(){
    return inquirer.prompt([
        {
            name: "name",
            message: "Enter your name:",
            type: "input"
        },
        {
            name: "id",
            message: "Enter your ID:",
            type: "input"
        },
        {
            name: "email",
            message: "Enter your email:",
            type: "input"
        },
        {
            name: "github",
            message: "Please enter the engineer's github username:",
            type: "input"
        }
    ])
}
function managerData(){
    return inquirer.prompt([
        {
            name: "name",
            message: "Enter your name:",
            type: "input"
        },
        {
            name: "id",
            message: "Enter your ID:",
            type: "input"
        },
        {
            name: "email",
            message: "Enter your email:",
            type: "input"
        },
        {
            name: "office",
            message: "What is the manager's office number?",
            type: "input"
        }
    ])
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
