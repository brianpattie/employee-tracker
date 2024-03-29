DROP PROCEDURE IF EXISTS Employee_info.delete_employee;
DELIMITER //
CREATE PROCEDURE Employee_info.delete_employee (
	IN target_id_employee INT
)
BEGIN
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
		BEGIN
			SIGNAL SQLSTATE '45000';
			ROLLBACK;
		END;
	START TRANSACTION;
        DELETE FROM Employee WHERE id_employee = target_id_employee;
        DELETE FROM Phone WHERE id_employee = target_id_employee;
        DELETE FROM Email WHERE id_employee = target_id_employee;
	COMMIT;
END //
DELIMITER ;