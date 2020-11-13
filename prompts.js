const cliPrompts = {
    main: [{
        type: 'list',
        name: 'option',
        message: 'EMS Application Navigation Options',
        choices: [
            { name: 'View All Current Employees', value: 0 },
            { name:  'Add New Employee', value: 1 },
            { name:  'View All Roles', value: 2 },
            { name:  'Add new Roles', value: 3 },
            { name:  'View All Departments', value: 4 },
            { name:  'Add A New Department', value: 5 },
            { name:   "Update an Employee's Role", value: 6 },
            { name: 'EXIT', value: 7 }
        ]
    }],
    newEmployee: [
        {
            type: 'input',
            name: 'fName',
            message: 'Enter employees first name'
        },
        {
            type: 'input',
            name: 'lName',
            message: 'Enter employees last name'
        },
        {
            type: 'list',
            name: 'roleID',
            message: 'Select employees role',
            choices: []
        },
        {
            type: 'list',
            name: 'managerID',
            message: 'Select a manager',
            choices: []
        },
        
    ],
    Roles: [
        {
            type: 'input',
            name: 'title',
            message: 'Add a new Role',
        },

        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary?'
        },
        {
            type: 'list',
            name: 'departmentID',
            message: 'Select a Department',
        },

    ],
    department: [
        {
            type: 'input',
            name: 'department',
            message: 'Enter new Department',
        }
    ],
    updateEmployeeRole: [
        {
            type: 'list',
            name: 'employeeID',
            message: 'Select An Employee',
            choices: []
        },
        {
            type: 'list',
            name: 'roleID',
            message: 'Choose Employee Role',
            choices: []
        }
    ]

};

module.exports = cliPrompts;