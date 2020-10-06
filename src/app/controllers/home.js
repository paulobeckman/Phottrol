const Events = require('../models/Events')

module.exports ={
    async index(req, res){
        let results = await Events.nextEvent()
        const event = results.rows[0]
        
        return res.render("home", {event})
    }
}