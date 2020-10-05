const { date, formatPrice } = require('../../lib/utils')
const Events = require('../models/Events')
const Events_Employees = require('../models/Events_Employees')
const Events_Equipments = require('../models/Events_Equipments')

module.exports ={
    index(req, res){
        let {filter, page, limit} = req.query

        page = page || 1
        limit = limit || 5
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
    async create(req, res){
        results = await Events.employeesSelectOptions()
        const employees = results.rows

        results = await Events.equipmentsSelectOptions()
        const equipments = results.rows

        return res.render("events/create", {employees, equipments})
    },
    async show(req, res){

        let results = await Events.find(req.params.id)
        const event = results.rows[0]

        if(!event) return res.send("Evento não foi encontrado")
        
        event.date_event = date(event.date_event).format
        event.cost = formatPrice(event.cost)

        results = await Events_Employees.find(event.id)
        const employees = results.rows

        results = await Events_Equipments.find(event.id)
        const equipments = results.rows
        
        return res.render("events/show", {event, employees, equipments})
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
        
        if (typeof req.body.employee_id === 'object'){
            const fileEmployee = req.body.employee_id.map(employeeId => Events_Employees.create({employee_id: employeeId, event_id: EventId}))
            Promise.all(fileEmployee)

        } else if(typeof req.body.employee_id === 'string') {
            const employee_Id = req.body.employee_id
            Events_Employees.create({employee_id: employee_Id, event_id: EventId})

        }

        if (typeof req.body.equipment_id === 'object'){
            const fileEquipment = req.body.equipment_id.map(equipmentId => Events_Equipments.create({equipment_id: equipmentId, event_id: EventId}))
            Promise.all(fileEquipment)

        } else if(typeof req.body.equipment_id === 'string') {
            const equipment_Id = req.body.equipment_id
            Events_Equipments.create({equipment_id: equipment_Id, event_id: EventId})
        }
                
        return res.redirect(`events/${EventId}`)
    },
    async edit(req, res) {

        let =results = await Events.find(req.params.id)
        const event = results.rows[0]

        if(!event) return res.send("Evento não foi encontrado")
        
        event.date_event = date(event.date_event).iso

        results = await Events.employeesSelectOptions()
        const employees = results.rows

        results = await Events.equipmentsSelectOptions()
        const equipments = results.rows

        results = await Events_Employees.find(event.id)
        const Eventsemployees = results.rows

        results = await Events_Equipments.find(event.id)
        const Eventsequipments = results.rows

        return res.render("events/edit", {event, employees, equipments, Eventsemployees, Eventsequipments})
    },
    async put(req, res){
        const keys = Object.keys(req.body)

        for(key of keys) {
            if (req.body[key] == ""){
                return res.send("Por Favor, Preencha todos os dados")
            }
        }

        if (typeof req.body.employee_id === 'object'){
            Events_Employees.delete(req.body.id)

            const fileEmployee = req.body.employee_id.map(employeeId => Events_Employees.create({employee_id: employeeId, event_id: req.body.id}))
            Promise.all(fileEmployee)

        } else if(typeof req.body.employee_id === 'string') {
            Events_Employees.delete(req.body.id)

            const employee_Id = req.body.employee_id
            Events_Employees.create({employee_id: employee_Id, event_id: req.body.id})

        }

        if (typeof req.body.equipment_id === 'object'){
            Events_Equipments.delete(req.body.id)

            const fileEquipment = req.body.equipment_id.map(equipmentId => Events_Equipments.create({equipment_id: equipmentId, event_id: req.body.id}))
            Promise.all(fileEquipment)

        } else if(typeof req.body.equipment_id === 'string') {
            Events_Equipments.delete(req.body.id)

            const equipment_Id = req.body.equipment_id
            Events_Equipments.create({equipment_id: equipment_Id, event_id: req.body.id})
        }

        await Events.update(req.body)
        return res.redirect(`events/${req.body.id}`)
    
    },
    async delete(req, res) {

        Events_Employees.delete(req.body.id)
        Events_Equipments.delete(req.body.id)

        await Events.delete(req.body.id)

        return res.redirect("events")
    }

}