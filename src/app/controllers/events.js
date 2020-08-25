module.exports ={
    index(req, res){
        return res.render("events/index")
    },

    create(req, res){
        return res.render("events/create")
    }
}