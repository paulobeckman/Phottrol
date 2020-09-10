const express = require('express')
const routes = express.Router()

const home = require('./app/controllers/home')
const events = require('./app/controllers/events')
const employees = require('./app/controllers/employees')


routes.get("/", function(req, res){
    return res.redirect("/home")
})

routes.get("/home", home.index)

routes.get("/events", events.index)
routes.get("/events/create", events.create)
routes.get("/events/:id", events.show)
routes.get("/events/:id/edit", events.edit)

routes.put("/events", events.put)
routes.post("/events", events.post)
routes.delete("/events", events.delete)


routes.get("/employees", employees.index)
routes.get("/employees/create", employees.create)

module.exports = routes