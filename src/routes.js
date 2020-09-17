const express = require('express')
const routes = express.Router()

const home = require('./app/controllers/home')
const events = require('./app/controllers/events')
const employees = require('./app/controllers/employees')


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



module.exports = routes