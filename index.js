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
                'View employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update employee role',
                'All done'
            ]
        }).then(ans => {
            switch (ans.initialize) {
                case 'View departments': viewDept();
                    break;
                case 'View roles': viewRole(); 
                    break;
                case 'View employees': viewEmp();
                    break;  
                case 'Add a department': addDept();
                    break;
                case 'Add a role': addRole();
                    break;
                case 'Add an employee': addEmp(); 
                    break;
                case 'Update employee role': upRole();
                    break;
                case 'All done': 
                    console.log('Goodbye');
                    process.exit();
            }
        }).catch(err => console.error(err));
}

init();

const viewDept = () => {
    db.query('SELECT * FROM department', (err, results)=> {
        err ? console.error(err): console.table(results);
        init();
    })
};

const viewRole = () => {
    db.query('SELECT * FROM role', (err, results)=> {
        err ? console.error(err): console.table(results);
        init();
    })
};

const viewEmp = () => {
    db.query('SELECT * FROM employee', (err, results)=> {
        err ? console.error(err): console.table(results);
        init();
    })
};

const addDept = () => {
    inquirer
        .prompt({
                type: 'input',
                message: 'Enter new department name.',
                name: 'addDept'
            }
        ).then(ans => {
            db.query(`INSERT INTO department(name)
                VALUES(?)`, ans.addDept, (err, results) => {
            if (err) {
                console.log(err)
            } else {
                db.query(`SELECT * FROM department`, (err, results) => {
                    err ? console.error(err): console.table(results);
                    init();
                })
            }       
          })
     })
};
  
const addRole = () => {
    const deptOpt = () => db.promise().query(`SELECT * FROM department`)
        .then((rows)=> {
            let arrNames = rows[0].map(obj.name);
            return arrNames
        })
    inquirer
        .prompt({
                type: 'input',
                message: 'Enter new role name.',
                name: 'roleTitle'
            },
            {
                type: 'input',
                message: 'Enter salary of new role.',
                name: 'roleSalary',
            },
            {
                type: 'list',
                message: 'Choose the department new role belongs to.',
                name: 'addDept',
                choices: deptOpt
            }
        ).then(ans => {
            db.promise().query(`SELECT id FROM department WHERE name = ?`, ans.addDept)
                .then(answer => {
                 let mappedId = answer[0].map(obj => obj.id);
                 return mappedId[0]
            })
        }).then((mappedId) => {
                db.promise().query(`INSERT INTO roles (title, salary, department_id)
            VALUES(?, ?, 1?)` [ans.roleTitle, ans.roleSalary, mappedId]);
                init()
        })  
};

const addEmp = () => {
    const roleOpt = () => db.promise().query(`SELECT * FROM role`)
    .then((rows) => {
        let arrNames = rows[0].map(obj => obj.name);
        return arrNames
    })
    inquirer
        .prompt({
                type: 'input',
                message: 'Enter the first name of the new employee.',
                name: 'firstName',
            },
            {
                type: 'input',
                message: 'Enter the last name of the new employee.',
                name: 'lastName'
            },
            {
                type: 'input',
                message: 'Enter the role of the new employee.',
                name: 'employeeRole',
                choices: 'roleOpt'
            }
        ).then(ans => {
            db.query(`INSERT INTO employee(first_name, last_name)
                VALUES(?, ?)` [ans.firstName, ans.lastName], (err, results) =>{
            if (err) {
                console.log(err)
            } else {
                db.query(`SELECT * FROM employee`, (err, results) => {
                    err ? console.error(err): console.table(results);
                    init();
                })
            }
        })
    })
}