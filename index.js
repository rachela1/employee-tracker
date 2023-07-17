const inquirer = require('inquirer');
const mysql = require('mysql2');

const prompt = inquirer.createPromptModule();
const db = mysql.createConnection({
    host: 'localHost',
    user: 'root',
    password: '',
    database: 'employee_db',
}, console.log('Connected'));