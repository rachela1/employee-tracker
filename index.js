const inquirer = require('inquirer');
const mysql = require('mysql2');
const consTab = require('console.table');

const prompt = inquirer.createPromptModule();
const db = mysql.createConnection({
    host: 'localHost',
    user: 'root',
    password: '',
    database: 'employee_db',
}, console.log('Connected'));

const init = () => {
    inquirer
        .prompt({
            type: 'list', 
            message: 'Select one from the following options:',
            name: 'initialize',
            choices: [
                'View departments',
                'View roles',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update employee role',
                'All done'
            ]
        })
}