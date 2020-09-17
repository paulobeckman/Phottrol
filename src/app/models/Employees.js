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
    find(id, callback){
        db.query(`
            SELECT *
            FROM employees
            WHERE employees.id = $1`, [id], function(err, results){
                if(err) throw `DATABASE ERROR ${err}`

                callback(results.rows[0])
            })
    },
    update(data, callback){
        const query = `
            UPDATE employees SET
                name = ($1),
                birth = ($2),
                office = ($3),
                salary = ($4)
            WHERE id = $5
        `
        data.salary = data.salary.replace(/\D/g, "")

        const values = [
            data.name,
            data.birth,
            data.office,
            data.salary,
            data.id
        ]

        db.query(query, values, function(err, results){
            if(err) throw `DATABASE ERROR ${err}`

            callback()
        })
    },
    delete(id, callback){
        db.query(`
            DELETE 
            FROM employees
            WHERE id = $1`, [id], function(err, results){
                if(err) throw `DATABASE ERROR ${err}`

                return callback()
            })
    },
    paginate(params) {

        const { filter, limit, offset, callback } = params
        
        let query = "",
            filterQuery = "",
            totalQuery = `(
                SELECT count(*) FROM employees
            ) AS total`
    
        if(filter){
            filterQuery = `${query}
                WHERE employees.name ILIKE '%${filter}%'
                OR employees.office ILIKE '%${filter}%'
            `

            totalQuery = `(
                SELECT count(*) FROM employees
                ${filterQuery}
            ) as total`
        }
        
        query = `
            SELECT employees.*, ${totalQuery}
            FROM employees
            ${filterQuery}
            LIMIT $1 OFFSET $2
        `

        db.query(query, [limit, offset], function(err, results){
            if(err) throw `DATABASE ERROR ${err}`

            callback(results.rows)
        })
    }
}