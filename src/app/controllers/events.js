const { date, formatPrice } = require('../../lib/utils')
const Events = require('../models/Events')
const Events_Employees_Equipments = require('../models/Events_Employees_Equipments')

module.exports ={
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
            callback (events) {
                const pagination = {
                    total: events[0] ? Math.ceil(events[0].total / limit) : 0 ,

                    page
                }

                for (let i = 0; i < events.length; i++) {
                    events[i].date_event = date(events[i].date_event).format
                }

                return res.render("events/index", {events, pagination, filter})
            }
        }

        Events.paginate(params)
    },

    create(req, res){
        Events.employeesSelectOptions(function(employeeOptions) {
            Events.equipmentsSelectOptions(function(equipmentOptions){
                return res.render("events/create", {employeeOptions, equipmentOptions})

            })
        })
    },

    show(req, res){
        Events.find(req.params.id, function(event){
            if(!event) return res.send("Evento não foi encontrado")
            
            event.date_event = date(event.date_event).format
            event.cost = formatPrice(event.cost)

            return res.render("events/show", {event})
        })
    },

    async post(req, res) {

        const keys = Object.keys(req.body)

        for (key of keys){
            if(req.body[key] == ""){
                return res.send('Por Favor, preencha todos os campos!')
            }
        }

        let results = await Events.create(req.body)
        const EventId = results.rows[0].id

        const event = {
            ...req.body,
            events_id: EventId
        }

        Events_Employees_Equipments.create(event)

        
        return res.redirect(`events/${EventId}`)
    },

    edit(req, res) {
        Events.find(req.params.id, function(event) {
            if(!event) return res.send("Evento não foi encontrado")
            
            event.date_event = date(event.date_event).iso

            return res.render("events/edit", {event})
        })
    },

    put(req, res){
        const keys = Object.keys(req.body)

        for(key of keys) {
            if (req.body[key] == ""){
                return res.send("Por Favor, Preencha todos os dados")
            }
        }

        Events.update(req.body, function(){
            return res.redirect(`events/${req.body.id}`)
        })
    },

    delete(req, res) {
        Events.delete(req.body.id, function(){
            return res.redirect("events")
        })
    }
}