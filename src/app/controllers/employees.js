const Employees = require("../models/Employees")

module.exports = {
    index(req, res){
        return res.render("employees/index")
    },
    create(req, res){
        return res.render("employees/create")
    },
    post(req, res) {

        const keys = Object.keys(req.body)

        for( key of keys){
            if(req.body[key] == ""){
                return res.send('Por Favor, preencha todos os campos!')
            }
            
            Employees.create(req.body, function(employees){
                return res.redirect("/employees")

            })
        }

        
    }
}