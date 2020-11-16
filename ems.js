const inquirer = require("inquirer");
const logo = require('asciiart-logo');
const DB = require("./db/ems_db");
const { Console } = require("console");
const emsPrompts = require("./prompts/emsprompts");

class EmployeeMS {

    constructor(emsPrompts) {
        this.emsPrompts = emsPrompts;
        this.db = new DB("employee_db");
        // this.roles = [];
    }

    // start of the app
    startApp() {
        this.displayLogo();
        // connect to database
        this.db.createConnection();
        // ask inquirer prompts
        this.navMenu();
    }

    async navMenu() {
        const { option } = await inquirer.prompt(this.emsPrompts.main);
        console.log(option + 'this is working now');

        if(option === 0){
            this.showAllEmployees();
        }else if(option === 1) {
            this.addNewEmployee();
        }else if(option === 2) {
            this.showAllRoles();
        } else if(option === 3) {
            this.createNewRole();
        }else if(option === 4) {
            this.showAllDepartments();
        }else if(option === 5) {
            this.createNewDepartment();
        } else if(option === 6) {
            this.updateEmployeeRole();
        } else if(option === 7){
            this.delDepartment();
        }else{
            this.end();
        }
    }

    async showAllEmployees() {
        let listAllEmployees = await this.db.getAllEmployees();
        console.table(listAllEmployees);
        this.navMenu();
    }

    async delDepartment() {
        let newDept = await inquirer.prompt(this.emsPrompts.delDepartment);

        this.db.delDepartment(newDept);
        this.showAllDepartments();
        this.navMenu();
    }

    async showAllDepartments() {
        let listAllDepartments = await this.db.getAllDepartments();
        console.table(listAllDepartments);
        this.navMenu();
        console.log('checking all departments');
    }

    async showAllRoles() {
        let listAllRoles = await this.db.getAllRoles();
        console.table(listAllRoles);
        this.navMenu();
        console.log('checking all roles');
    }

    async createNewRole() {

        let listAllRoles = await this.db.getAllRoles();
        let allRoles = listAllRoles.map(role => role.title);
        const validate = (input) => {
            if (allRoles.indexOf(input) !== -1) {
                console.log("Sorry, This Role already Exists");
                return false
            } else {
                return true;
            }
        }
        // create list of all department
        let departments = await this.db.getAllDepartments();
        let departmentWithId = departments.map(d => {
            return { name: d.name, value: d.id }
        });

        // add validate function
        this.emsPrompts.Roles[0]['validate'] = validate;
        // add the list of department as choices
        this.emsPrompts.Roles[2]['choices'] = departmentWithId;

        let newRole = await inquirer.prompt(this.emsPrompts.Roles);
        this.db.addNewRole(newRole);
        this.showAllRoles();

    }

    async addNewEmployee() {
        // create list of all department
        let roles = await this.db.getAllRoles();
        let rolesWithId = roles.map(r => {
            return { name: r.title, value: r.id }
        });
        this.emsPrompts.newEmployee[2]['choices'] = rolesWithId;

        // create list of all department
        let employees = await this.db.getAllEmployees();
        let managers = [{ name: 'NONE', value: 0 }];
        for (let employee of employees) {
            if (employee.role_id === 11) {
                managers.push(
                    {
                        name: employee.first_name + " " + employee.last_name,
                        value: employee.id
                    })
            }
        }

        this.emsPrompts.newEmployee[3]['choices'] = managers;
        let employee = await inquirer.prompt(this.emsPrompts.newEmployee);

        this.db.addEmployee(employee);
        this.showAllEmployees();
    }

    async createNewDepartment() {

        let listAllDept = await this.db.getAllDepartments();
        let departments = listAllDept.map(dept => {
            return { name: dept.name, value: dept.id }
        });

        const validate = (input) => {
            if (departments.indexOf(input) !== -1) {
                console.log("Sorry, this department already exits");
                return false
            } else {
                return true;
            }
        }

        this.emsPrompts.department[0]['validate'] = validate;
        let newDept = await inquirer.prompt(this.emsPrompts.department);

        this.db.addDepartment(newDept);
        this.showAllDepartments();
    }

    async updateEmployeeRole() {
        let employees = await this.db.getAllEmployees();
        let employeesName = employees.map(e => {
           return { name: e.first_name + " " + e.last_name , value: e.id }
        });

        let roles = await this.db.getAllRoles();
        let rolesID = roles.map(r => {
            return { name: r.title, value: r.id };
        })

        this.emsPrompts.updateEmployeeRole[0]['choices'] = employeesName;
        this.emsPrompts.updateEmployeeRole[1]['choices'] = rolesID;

        let newRole = await inquirer.prompt(this.emsPrompts.updateEmployeeRole);
        console.log(newRole);
        this.db.updateRole(newRole);

        this.showAllEmployees();
    }

    // end the program
    quit() {
        this.db.endConnection();
        console.log("\nGoodbye See You NExt Time!");
        process.exit(0);
    }

    // display logo
    displayLogo() {
        console.log(
            logo({
                name: 'Employee Management System',
                font: 'Big Money-nw',
                linechars: 100,
                padding: 2,
                margin: 3,
                borderColor: 'bold-yellow',
                logoColor: 'bold-cyan',
                textColor: 'bold-green',
            })
                .emptyLine()
                .right('version: 1.0')
                .emptyLine()
                .center('Manage your team eazy')
                .render()
        );

    }

}

const ems = new EmployeeMS(emsPrompts);
ems.startApp();


// module.exports = EmployeeManagement;  