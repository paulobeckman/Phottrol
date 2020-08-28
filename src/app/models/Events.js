const db = require('../../config/db')
const { query } = require('express')

module.exports = {
    create(data, callback){
        const query = `
            INSERT INTO events
                create_name,
                address,
                date_event,
                cost,
                category,
                shift,
                employees_id,
                equipment_id
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, )
            RETURNIG id 
        `

        const values = [
            data.create_name,
            data.address,
            data.date_event,
            data.cost,
            data.category,
            data.shift,
            data.employees_id,
            data.equipment_id
        ]

        db.query(query, values, function(err, results){
            if(err) throw `Database Error! ${err}`

            callback(results.rows[0])
        })
    },
    employeesSelectOptions(callback){
        db.query(`SELECT name, id FROM employees`, function(err, results) {
            if(err) throw `Database Error! ${err}`

            callback(results.rows)
        })
    },
    equipmentSelectOptions(callback){
        db.query('SELECT name, id FROM equipment', function(err, results) {
            if(err) throw `Database Error! ${err}`

            callback(results.rows)
        })
    }
}