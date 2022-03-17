INSERT INTO department (name)
VALUES ("Sales"), ("Engineering"), ("Finance"), ("Legal");

INSERT INTO role (title, salary, department_id)
VALUE ("Lead Engineer", 150000.00, 1), ("Salesperson", 80000.00, 2), ("Software Engineer", 600000.00, 3), ("Account Manager", 200000.00,4), ("CEO", 800000.00, 5), ("Lawyer", 450000, 6), ("Legal Team Lead", 380000, 7);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ("Happy", "Gilmore", 2, 3), ("Kris", "Kringle", 1, 1), ("Carmen", "SanDiego", 3, 2), ("Steph", "Curry", 5, 2), ("Nyjah", "Husten", 4, 4);
