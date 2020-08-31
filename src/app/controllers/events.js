const { date } = require('../../lib/utils')
const Events = require('../models/Events')

module.exports ={
    index(req, res){
        Events.all(function(events){

            events.date_event = date(events.date_event).format

            return res.render("events/index", {events})
        })
    },

    create(req, res){
        Events.employeesSelectOptions(function(employeeOptions) {
            Events.equipmentSelectOptions(function(equipmentOptions){
                return res.render("events/create", {employeeOptions, equipmentOptions})

            })
        })
    },

    post(req, res) {

        const keys = Object.keys(req.body)

        for (key of keys){
            if(req.body[key] == ""){
                return res.send('Por Favor, preencha todos os campos!')
            }
        }
        Events.create(req.body, function(events){
            return res.redirect("/events")
        })
    }
}