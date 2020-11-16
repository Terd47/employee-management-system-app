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

    async getAllEmployees(employee = '*') {

        let query = `SELECT ${employee} from employee`;
        let data = await this.runQuery(query);

        return data;
    }

    async getAllDepartments() {
        let query = `SELECT * from department`;
        let data = await this.runQuery(query);

        return data;
    }

    async getAllRoles() {
        let query = `SELECT * from role`;
        let data = await this.runQuery(query);

        return data;
    }

    async addEmployee(employee) {
        let query = `INSERT INTO employee_db.employee
        (first_name, last_name, role_id, manager_id)
        VALUES('${employee.fName}', '${employee.lName}', '${employee.roleID}', '${employee.managerID}');`;
        let data = await this.runQuery(query);

        return data;
    }

    async addDepartment(department) {
        let query = `INSERT INTO employee_db.department
        (name)
        VALUES('${department.department}');
        `;
        let data = await this.runQuery(query);

        return data;
    }

    
    async delDepartment(department) {
        let query = `DELETE FROM employee_db.department
        WHERE id=${department.departmentID};
        `;
        let data = await this.runQuery(query);

        return data;
    }

    addNewRole(role) {
        
        let { title, salary, departmentID } = role;
        let query = `INSERT INTO role (title, salary, department_id) VALUES('${title}', '${salary}', '${departmentID}')`;
        this.con.query(query, function(err, result){
            if(err) throw err;
            console.log("New Role Added");
        });
    }

    async updateRole(e) {
        let query = `UPDATE employee
        SET  role_id=${e.roleID} WHERE id=${e.employeeID};
        `;
        let data = this.runQuery(query);

        return data;
    }

    updateEmployee() {
        let query = `SELECT employee from employee`;
        let data = this.runQuery(query);

        return data;
    }

    updateDepartment(e) {
        let query = `UPDATE employee_db.employee
        SET  role_id=${e.roleID},
        WHERE id=${e.employeeID};
        `;
        let data = this.runQuery(query);

        return data;
    }

    runQuery(sql) {

    return new Promise((res, reject)=>{
        this.con.query(sql, function (err, result) {
            if (err) throw err;
            if(result){
                res(result)
            }
        });
        console.log(reject);
    });
    }

}

let db = new EMS("employee_db");
db.createConnection();

// db.getEmployeeData();


module.exports = EMS;
