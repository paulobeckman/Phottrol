const Events = require('../models/Events')

module.exports ={
    index(req, res){
        return res.render("events/index")
    },

    create(req, res){
        Events.employeesSelectOptions(function(employeeOptions) {
            Events.equipmentSelectOptions(function(equipmentOptions){
                return res.render("events/create", {employeeOptions, equipmentOptions})

            })
        })
    },

    post(req, res) {

        const keys = Object.keys(req.boby)

        for (key of keys){
            if(req.boby[key] == ""){
                return res.send('Por Favor, preencha todos os campos!')
            }
        }

        Events.create(req.boby, function(events){
            return res.redirect("events/index")
        })
    }
}