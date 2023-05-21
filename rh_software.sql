DROP DATABASE IF EXISTS rh_software;
CREATE DATABASE rh_software;
USE rh_software;

CREATE TABLE candidate (
    id INTEGER PRIMARY KEY,
    first_name VARCHAR(80) NOT NULL,
    last_name VARCHAR(80) NOT NULL,
    id_card VARCHAR(80) NOT NULL,
    email VARCHAR(120) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    cv VARCHAR(120) NOT NULL,
    certificates VARCHAR(120),
    job_offer_id INTEGER,
    FOREIGN KEY(job_offer_id) REFERENCES job_offer(id)
);

CREATE TABLE application (
    id INTEGER PRIMARY KEY,
    candidate_id INTEGER NOT NULL,
    application_date DATETIME NOT NULL,
    status VARCHAR(20) NOT NULL,
    FOREIGN KEY(candidate_id) REFERENCES candidate(id)
);

CREATE TABLE job_offer (
    id INTEGER PRIMARY KEY,
    title VARCHAR(80) NOT NULL,
    description VARCHAR(120) NOT NULL,
    requirements VARCHAR(120) NOT NULL,
    publication_date DATETIME NOT NULL,
    vacancies INTEGER NOT NULL,
    salary REAL NOT NULL
);

CREATE TABLE test (
    id INTEGER PRIMARY KEY,
    candidate_id INTEGER NOT NULL,
    test_type VARCHAR(80) NOT NULL,
    test_date DATETIME NOT NULL,
    result VARCHAR(80) NOT NULL,
    FOREIGN KEY(candidate_id) REFERENCES candidate(id)
);

CREATE TABLE contract (
    id INTEGER PRIMARY KEY,
    employee_id INTEGER NOT NULL,
    start_date DATETIME NOT NULL,
    end_date DATETIME,
    salary REAL NOT NULL,
    FOREIGN KEY(employee_id) REFERENCES employee(id)
);

CREATE TABLE affiliation (
    id INTEGER PRIMARY KEY,
    employee_id INTEGER NOT NULL,
    affiliation_type VARCHAR(80) NOT NULL,
    affiliation_date DATETIME NOT NULL,
    details VARCHAR(120) NOT NULL,
    FOREIGN KEY(employee_id) REFERENCES employee(id)
);

CREATE TABLE evaluator (
    id INTEGER PRIMARY KEY,
    employee_id INTEGER NOT NULL,
    first_name VARCHAR(80) NOT NULL,
    last_name VARCHAR(80) NOT NULL,
    email VARCHAR(120) NOT NULL,
    FOREIGN KEY(employee_id) REFERENCES employee(id)
);

CREATE TABLE employee (
    id INTEGER PRIMARY KEY,
    candidate_id INTEGER NOT NULL,
    hiring_date DATETIME NOT NULL,
    FOREIGN KEY(candidate_id) REFERENCES candidate(id)
);

CREATE TABLE settlement (
    id INTEGER PRIMARY KEY,
    employee_id INTEGER NOT NULL,
    settlement_date DATETIME NOT NULL,
    total_amount REAL NOT NULL,
    FOREIGN KEY(employee_id) REFERENCES employee(id)
);

CREATE TABLE training (
    id INTEGER PRIMARY KEY,
    employee_id INTEGER NOT NULL,
    training_date DATETIME NOT NULL,
    description VARCHAR(120) NOT NULL,
    FOREIGN KEY(employee_id) REFERENCES employee(id)
);

CREATE TABLE performance (
    id INTEGER PRIMARY KEY,
    employee_id INTEGER NOT NULL,
    evaluation_date DATETIME NOT NULL,
    rating REAL NOT NULL,
    FOREIGN KEY(employee_id) REFERENCES employee(id)
);
