const express = require('express')
const routes = express.Router()

const home = require('./app/controllers/home')
const events = require('./app/controllers/events')


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

module.exports = routes