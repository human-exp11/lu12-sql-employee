module.exports =  () => [
    [    //Initial user prompt question
        {
             type: "list",
             name: "choose",
             name: "choose",
            message: "What would you like to do?",
            choices: [
                "View All Departments",
                "View All Roles",
                "View All Employees",
                "Add Department",
                "Add Role",
                "Add Employee",
                "Update Employee Role",
                "Quit",
             ],
         }
     ]
]