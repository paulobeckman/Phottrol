const { date, formatPrice } = require('../../lib/utils')
const Equipments = require('../models/Equipments')

module.exports ={
    index(req, res){
        let { filter, page, limit} = req.query

        page = page || 1
        limit = limit || 3
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

                return res.render("equipments/index", {equipments, pagination, filter})
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
            return res.redirect(`equipments/${equipment.id}`)

        }) 
    }, 
    show(req, res){
        Equipments.find(req.params.id, function(equipment){
            if(!equipment) return res.send("Equipamento não foi encontrado")

            equipment.acquisition_date = date(equipment.acquisition_date).format
            equipment.replacement_date = date(equipment.replacement_date).format
            equipment.cost = formatPrice(equipment.cost)
            equipment.depreciation = formatPrice(equipment.depreciation)

            return res.render("equipments/show", {equipment})
        })
    },
    edit(req, res){
        Equipments.find(req.params.id, function(equipment){
            if(!equipment) return res.send("Equipamento não foi encontrado")
            
            equipment.acquisition_date = date(equipment.acquisition_date).iso
            equipment.replacement_date = date(equipment.replacement_date).iso

            return res.render("equipments/edit", {equipment})

        })
    },
    put(req, res){

        const keys = Object.keys(req.body)

        for(key of keys){
            if(req.body[key] == ""){
                return res.send('Por Favor, preencha todos os campos!')
            }
        }

        Equipments.update(req.body, function(equipment){
            return res.redirect(`equipments/${req.body.id}`)
        })
    },
    delete(req, res){
        Equipments.delete(req.body.id, function(){
            return res.redirect("/equipments")
        })
    }
} 