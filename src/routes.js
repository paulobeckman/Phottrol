const express = require('express')
const routes = express.Router()

const home = require('./app/controllers/home')
const events = require('./app/controllers/events')
const employees = require('./app/controllers/employees')
const equipments = require('./app/controllers/equipments')


routes.get("/", function(req, res){
    return res.redirect("/home")
})

routes.get("/home", home.index)

//events
routes.get("/events", events.index)
routes.get("/events/create", events.create)
routes.get("/events/:id", events.show)
routes.get("/events/:id/edit", events.edit)

routes.post("/events", events.post)
routes.put("/events", events.put)
routes.delete("/events", events.delete)


//employees
routes.get("/employees", employees.index)
routes.get("/employees/create", employees.create)
routes.get("/employees/:id", employees.show)
routes.get("/employees/:id/edit", employees.edit)

routes.post("/employees", employees.post)
routes.put("/employees", employees.put)
routes.delete("/employees", employees.delete)


//equipment
routes.get("/equipments", equipments.index)
routes.get("/equipments/create", equipments.create)
routes.get("/equipments/:id", equipments.show)
routes.get("/equipments/:id/edit", equipments.edit)

routes.post("/equipments", equipments.post)
routes.put("/equipments", equipments.put)
routes.delete("/equipments", equipments.delete)



module.exports = routes