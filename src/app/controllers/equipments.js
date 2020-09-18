const { date } = require('../../lib/utils')
const Equipments = require('../models/Equipments')

module.exports ={
    index(req, res){
        let { filter, page, limit} = req.query

        page = page || 1
        limit = limit || 2
        let offset = limit * (page - 1)

        const params = {
            filter, 
            page, 
            limit,
            offset,
            callback (equipments) {
                const pagination = {
                    total: equipments[0] ? Math.ceil(equipments[0].total / limit) : 0 ,
                    page
                }

                for (let i = 0; i < equipments.length;  i++){
                    equipments[i].replacement_date = date(equipments[i].replacement_date).format
                }

                return res.render("equipments/index", {equipments})
            }
        }

        Equipments.paginate(params)
    },
    create(req, res){
        return res.render("equipments/create")
    },
    post(req, res){

        const keys = Object.keys(req.body)

        for(key of keys){
            if(req.body[key] == ""){
                return res.send('Por Favor, preencha todos os campos!')
            }
        }

        Equipments.create(req.body, function(equipment){
            return res.redirect("/equipments")

        })
    }
} 