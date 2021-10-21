INSERT INTO department
    (id, dep_name)
        VALUES 
            (1, "Sales"),
            (2, "Engineering"),
            (3, "Finance"),
            (4,"Legal");

INSERT INTO roles
    (id, title, salary, department_id)
        VALUES
            (1, "Sales Person", 80000, 1),
            (2, "Software Engineer", 120000, 2),
            (3, "Lead Engineer", 150000, 2),
            (4, "Account Manager", 160000, 3),
            (5, "Accountant", 125000, 3),
            (6, "Legal Team Lead", 250000, 4),
            (7, "Lawyer", 190000, 4);

INSERT INTO employee
    (id,first_name, last_name, role_id, manager_id)
        VALUES
            (1,"David", "Ortiz", 2, 2),
            (2,"April", "Bullard", 2, 1);