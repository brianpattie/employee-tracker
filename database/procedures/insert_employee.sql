DROP PROCEDURE IF EXISTS Employee_info.insert_employee;
DELIMITER //
CREATE PROCEDURE Employee_info.insert_employee (
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
		INSERT INTO Employee (name, position, salary, date_hired) VALUES (new_name, new_position, new_salary, new_date_hired);
		SELECT @id := LAST_INSERT_ID();
		INSERT INTO Phone (phone_number, id_employee) VALUES (new_phone_number, @id);
		INSERT INTO Email (email_address, id_employee) VALUES (new_email_address, @id);
	COMMIT;
END //
DELIMITER ;