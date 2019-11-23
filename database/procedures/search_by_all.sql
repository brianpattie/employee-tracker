DELIMITER //
CREATE PROCEDURE Employee_info.search_by_all (
	IN name VARCHAR(45),
    IN position VARCHAR(45),
    IN salary_min INT,
    IN salary_max INT,
    IN date_hired_min DATE,
    IN date_hired_max DATE,
    IN email_address VARCHAR(45),
    IN phone_number VARCHAR(30)
)
BEGIN
	SELECT Employee.id_employee, Employee.name, Employee.position, Employee.salary, Employee.date_hired, Email.email_address, Phone.phone_number
    FROM Employee
    INNER JOIN Email ON Employee.id_employee = Email.id_employee
    INNER JOIN Phone ON Employee.id_employee = Phone.id_employee
    WHERE Employee.name like CONCAT("%", IFNULL(name, ""), "%")
    AND Employee.position like CONCAT("%", IFNULL(position, ""), "%")
    AND Employee.salary <= IFNULL(salary_max, 100000000000)
    AND Employee.salary >= IFNULL(salary_min, 0)
    AND Employee.date_hired <= IFNULL(date_hired_max, "9999-12-31")
    AND Employee.date_hired >= IFNULL(date_hired_min, "1970-01-01")
    AND Email.email_address like CONCAT("%", IFNULL(email_address, ""), "%")
    AND Phone.phone_number like CONCAT("%", IFNULL(phone_number, ""), "%");
END //
DELIMITER ;