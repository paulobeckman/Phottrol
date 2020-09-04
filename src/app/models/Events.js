const db = require('../../config/db')

module.exports = {
    all(callback){
        db.query (`
            SELECT * FROM events
        `, function(err, results){
            if(err) throw `Database Error! ${err}`

            callback(results.rows)
        })
    },
    create(data, callback){
        const query = `
            INSERT INTO events (
                client_name,
                address,
                date_event,
                cost,
                category,
                shift
            ) VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id 
        `

        const values = [
            data.client_name,
            data.address,
            data.date_event,
            data.cost,
            data.category,
            data.shift
        ]

        db.query(query, values, function(err, results){
            if(err) throw `Database Error! ${err}`

            callback(results.rows[0])
        })
    },
    find(id, callback){
        db.query (`
            SELECT * 
            FROM events 
            WHERE events.id = $1`,[id], function(err, results){
                if(err) throw `Database Error! ${err}`
            
                callback(results.rows[0])
            })
    },
    update(data, callback){
        const query = `
            UPDATE events SET 
                client_name = ($1),
                address = ($2),
                date_event = ($3),
                cost = ($4),
                category = ($5),
                shift = ($6)
            WHERE id = $7   
        `

        const values = [
            data.client_name,
            data.address,
            data.date_event,
            data.cost,
            data.category,
            data.shift,
            data.id
        ]

        db.query(query, values, function(err, results){
            if(err) throw `Database Error! ${err}`

            callback()
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