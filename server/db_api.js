const mysql     = require("mysql")
const config    = require("./config.js")

async function insertEmployee(queryParams) {

    const {name, position, salary, date_hired, email_address, phone_number} = queryParams;

    let promise = new Promise((resolve, reject) => {
        let dbCon   = mysql.createConnection(config.mysqlCon);

        let sql     = 'CALL Employee_info.insert_employee(?, ?, ?, ?, ?, ?)';
        let values  = [name, position, salary, date_hired, email_address, phone_number];

        dbCon.query(sql, values, (error, results) =>{
            if (error) reject(error);
            resolve(results);
        });

        dbCon.end();
    })

    return await promise;
}

async function updateEmployee(queryParams) {

    const {id_employee, name, position, salary, date_hired, email_address, phone_number} = queryParams;

    let promise = new Promise((resolve, reject) => {
        let dbCon   = mysql.createConnection(config.mysqlCon);

        let sql     = 'CALL Employee_info.update_employee(?, ?, ?, ?, ?, ?, ?)';
        let values  = [id_employee, name, position, salary, date_hired, email_address, phone_number];

        dbCon.query(sql, values, (error, results) =>{
            if (error) reject(error);
            resolve(results);
        });

        dbCon.end();
    })

    return await promise;
}

async function deleteEmployee(queryParams) {

    const {id_employee} = queryParams;

    let promise = new Promise((resolve, reject) => {
        let dbCon = mysql.createConnection(config.mysqlCon);

        dbCon.query('CALL Employee_info.delete_employee(?)', [id_employee], (error, results) =>{
            if (error) reject(error);
            resolve(results);
        });

        dbCon.end();
    })

    return await promise;
}

async function searchEmployees(queryParams) {

    // Initialize missing parameters to null
    queryParams = {
        name:           null, 
        position:       null,
        salary_min:     null,
        salary_max:     null,
        date_hired_min: null,
        date_hired_max: null, 
        email_address:  null, 
        phone_number:   null,
        ...queryParams
    }

    const {name, position, salary_min, salary_max, date_hired_min, date_hired_max, email_address, phone_number} = queryParams

    let promise = new Promise((resolve, reject) => {
        let dbCon   = mysql.createConnection(config.mysqlCon);

        let sql     = 'CALL Employee_info.search_by_all(?, ?, ?, ?, ?, ?, ?, ?)';
        let values  = [name, position, salary_min, salary_max, date_hired_min, date_hired_max, email_address, phone_number];

        dbCon.query(sql, values, (error, results) =>{
            if (error) reject(error);
            resolve(results);
        });

        dbCon.end();
    })

    return await promise;

}

// EXPORTS
module.exports = {
    insert: insertEmployee,
    update: updateEmployee,
    delete: deleteEmployee,
    search: searchEmployees
}