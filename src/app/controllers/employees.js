module.exports = {
    index(req, res){
        return res.render("employees/index")
    },
    create(req, res){
        return res.render("employees/create")
    }
}