const Employees = require("../models/Employees")
const { date } = require('../../lib/utils')


module.exports = {
    index(req, res){
        
            let {filter, page, limit} = req.query

            page = page || 1
            limit = limit || 2
            let offset = limit * (page - 1)

            const params = {
                filter,
                page,
                limit,
                offset,
                callback (employees) {
                    const pagination = {
                        total: Math.ceil(employees[0].total/limit),
                        page
                    }

                    for (let i = 0; i < employees.length; i++) {
                        employees[i].birth = date(employees[i].birth).format
                    }

                    return res.render("employees/index", {employees, pagination, filter})
                }
            }
           
            Employees.paginate(params)
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

        
    },
    show(req, res) {
        Employees.find(req.params.id, function(employee){
            if(!employee) res.send("Evento não foi encontrado")

            employee.birth = date(employee.birth).format

            return res.render("employees/show", {employee})
        })
    },
    edit(req, res){
        Employees.find(req.params.id, function(employee){
            if(!employee) res.send("Evento não foi encontrado")

            employee.birth = date(employee.birth).iso

            return res.render("employees/edit", {employee})
        })
        
    },
    put(req, res){
        const keys = Object.keys(req.body)

        for(key of keys){
            if(req.body[key] == ""){
                return res.send('Por Favor, preencha todos os campos!')
            }
        }

        Employees.update(req.body, function(){
        
            return res.redirect("/employees")
        })

    },
    delete(req, res) {
        Employees.delete(req.body.id, function(){
            return res.redirect("Employees")
        })
    }
}