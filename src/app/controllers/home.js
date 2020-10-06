module.exports ={
    async index(req, res){
        let results = await Events.nextEvent()
        const event = results.rows[0]

        console.log(event)

        return res.render("home", {event})
    }
}