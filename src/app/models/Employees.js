const db = require("../../config/db");

module.exports = {
    all(callback){
        db.query(` 
            SELECT * 
            FROM employees`, function(err, results){
                if(err) throw `Database Error! ${err}`

                callback(results.rows)
            })
    },
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

        data.salary = data.salary.replace(/\D/g, "")

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