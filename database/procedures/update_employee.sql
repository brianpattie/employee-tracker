DROP PROCEDURE IF EXISTS Employee_info.update_employee;
DELIMITER //
CREATE PROCEDURE Employee_info.update_employee (
	IN target_id_employee INT,
	IN new_name VARCHAR(45),
    IN new_position VARCHAR(45),
    IN new_salary INT,
    IN new_date_hired DATE,
    IN new_email_address VARCHAR(45),
    IN new_phone_number VARCHAR(30)
)
BEGIN
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
		BEGIN
			SIGNAL SQLSTATE '45000';
			ROLLBACK;
		END;
	START TRANSACTION;
		SELECT @old_name := Employee.name,
			@old_position := Employee.position,
            @old_salary := Employee.salary,
            @old_date_hired := Employee.date_hired,
            @old_email_address := Email.email_address,
            @old_phone_number := Phone.phone_number
        FROM Employee
        JOIN Phone ON Employee.id_employee = Phone.id_employee
        JOIN Email ON Employee.id_employee = Email.id_employee
        WHERE Employee.id_employee = target_id_employee;
                
        UPDATE Employee
		SET name = IFNULL(new_name, @old_name),
			position = IFNULL(new_position, @old_position),
            salary = IFNULL(new_salary, @old_salary),
            date_hired = IFNULL(new_date_hired, @old_date_hired)
		WHERE id_employee = target_id_employee;
        
        UPDATE Phone
        SET phone_number = IFNULL(new_phone_number, @old_phone_number)
        WHERE id_employee = target_id_employee;
        
        UPDATE Email
        SET email_address = IFNULL(new_email_address, @old_email_address)
        WHERE id_employee = target_id_employee;
	COMMIT;
END //
DELIMITER ;