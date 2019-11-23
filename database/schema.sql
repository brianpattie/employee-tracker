CREATE DATABASE IF NOT EXISTS Employee_info;

USE Employee_info;

CREATE TABLE IF NOT EXISTS Employee(
    id_employee INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(45) NOT NULL,
    position VARCHAR(45) NOT NULL,
    salary INT NOT NULL,
    date_hired DATE NOT NULL,
    PRIMARY KEY (id_employee)
);

CREATE TABLE IF NOT EXISTS Phone(
    id_phone INT NOT NULL AUTO_INCREMENT,
    phone_number VARCHAR(30) NOT NULL,
    id_employee INT NOT NULL,
    PRIMARY KEY (id_phone),
    FOREIGN KEY (id_employee) REFERENCES Employee(id_employee)
    ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Email(
    id_email INT NOT NULL AUTO_INCREMENT,
    email_address VARCHAR(45) NOT NULL,
    id_employee INT NOT NULL,
    PRIMARY KEY (id_email),
    FOREIGN KEY (id_employee) REFERENCES Employee(id_employee)
    ON DELETE CASCADE
);