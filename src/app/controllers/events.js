const { date } = require('../../lib/utils')
const Events = require('../models/Events')

module.exports ={
    index(req, res){
        Events.all(function(events){

            for (let i = 0; i < events.length; i++) {
                events[i].date_event = date(events[i].date_event).format
            }
            
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

    show(req, res){
        Events.find(req.params.id, function(event){
            if(!event) return res.send("Evento não foi encontrado")
            
            event.date_event = date(event.date_event).format

            return res.render("events/show", {event})
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