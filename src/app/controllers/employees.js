const Employees = require("../models/Employees")
const { date } = require('../../lib/utils')


module.exports = {
    index(req, res){
        Employees.all(function(employees){

            for (let i = 0; i < employees.length; i++) {
                employees[i].birth = date(employees[i].birth).format
            }
            return res.render("employees/index", {employees})

        })
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
            
        }
        
        Employees.create(req.body, function(employees){
            return res.redirect("/employees")

        })

        
    }
}