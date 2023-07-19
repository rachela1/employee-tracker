USE employee_db;

INSERT INTO department (name) 
    VALUES ('Plumbing'), ('Electrical');

INSERT INTO role (title, salary) 
    VALUES ('Manager', 50000), ('Supervisor', 30000, 'department_id');

 INSERT INTO employee ('first_name', 'last_name', 'role_id', 'manager_id') 
    VALUES ('Bob', 'Orange'), ('John', 'Apple'), ('Jerry', 'Red');