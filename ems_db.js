const mysql = require('mysql');

class EMS {

    constructor(dbName) {
        this.dbName = dbName;
        this.con = null;
    }

    createConnection() {
        this.con = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'School1',
            database: this.dbName
        });

        this.con.connect(function (err) {
            if (err) throw err;
            console.log("Connected!");
        });
    }

    endConnection() {
        this.con.end();
    }

    getEmployeeData(employee = '*') {

        let query = `SELECT ${employee} from employee`;
        let data = this.runQuery(query);

        return data;
    }

    getDepartmentData() {
        let query = `SELECT employee from employee`;
        let data = this.runQuery(query);

        return data;
    }

    getRoleData() {
        let query = `SELECT employee from employee`;
        let data = this.runQuery(query);

        return data;
    }

    addEmployee() {
        let query = `SELECT employee from employee`;
        let data = this.runQuery(query);

        return data;
    }

    addDepartment() {
        let query = `SELECT employee from employee`;
        let data = this.runQuery(query);

        return data;
    }

    addRole() {
        let query = `SELECT employee from employee`;
        let data = this.runQuery(query);

        return data;
    }

    updateRole() {
        let query = `SELECT employee from employee`;
        let data = this.runQuery(query);

        return data;
    }

    updateEmployee() {
        let query = `SELECT employee from employee`;
        let data = this.runQuery(query);

        return data;
    }

    updateDepartment() {
        let query = `SELECT employee from employee`;
        let data = this.runQuery(query);

        return data;
    }

    runQuery(sql) {

        let data;

        this.con.query(sql, function (err, result) {
            if (err) throw err;
            
            console.log(result);
            data = result;
        });

        return data;
    }

}

let database = new EMS("employee_db");
database.createConnection();

database.getEmployeeData();


module.exports = EMS;
