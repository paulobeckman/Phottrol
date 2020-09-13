const db = require("../../config/db");

module.exports = {
    create(data, callback){
        const query = `
            INSERT INTO employees (
                name, 
                birth,
                office,
                salary
            ) VALUES ($1, $2, $3, $4)
            RETURNING id 
        `

        const values = [
            data.name,
            data.birth,
            data.office,
            data.salary
        ]

        db.query(query, values, function(err, results){
            if(err) throw `Database Error! ${err}`

            callback(results.rows[0])
        })
    },
}