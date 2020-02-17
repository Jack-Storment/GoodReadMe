const prompt = require('inquirer').createPromptModule();
const fs = require('fs');
const path = require('path');
const generateMarkdown = require('./generateMarkdown.js');

const api = require('./api.js');



function writeToFile(fileName, data) {
return fs.writeFileSync(path.join(process.cwd(), fileName), data);
}
const questions = ["What is your GitHub username?", "What is your email?"
];
function init() {
    prompt([
    {
      type: "input",
      name: 'badge',
      message: "Please provide at least one badge:"
        },
    {
      type: "input",
      name: 'title',
      message: "What is the title of your project?"
      },
      {
       type: "input",
       name: 'description',
       message: "Please enter a project description:"
      }, 
      {
        type: "input",
        name: 'contents',
        message: "Please provide a table of contents:",
      },
      {
        type: "input",
        name: 'installation',
        message: "What command would you run to install this app?",
        default:'npm install'
      },
      {
        type: "input",
        name: 'usage',
        message: "How does the user use this app?"
      },
      {
        type: "list",
        name: 'license',
        message: "What does the user need to know about the license?",
        choices: ["MIT", "APACHE 2.0", "GPL 3.0", "BSD 3", "None"]
      },
      {
        type: "input",
        name: 'contributing',
        message: "What does the user need to know about contributions?"
      },
      {
        type: "input",
        name: 'test',
        message: "What command would you run to test this app?",
        default:'npm test'
      }
    ])
    .then(response =>{ console.log("searching...")

    api
    .getUser(response.user)
    .then(({ data }) => {


      writeToFile("README.md", generateMarkdown({ ...data, ...response }));
    })
     
    
  })


}

init();