const express = require('express')
const routes = express.Router()

const home = require('./app/controllers/home')

routes.get("/", function(req, res){
    return res.redirect("/home")
})

routes.get("/home", home.index)

module.exports = routes