const db = require("../../config/db")

module.exports = {
    create(data, callback){
        const query = `
            INSERT INTO equipments (
                type,
                name,
                cost,
                depreciation,
                acquisition_date,
                replacement_date
            ) VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id
        `
        data.cost = data.cost.replace(/\D/g, "")
        data.depreciation = data.depreciation.replace(/\D/g, "")

        const values = [
            data.type,
            data.name,
            data.cost,
            data.depreciation,
            data.acquisition_date,
            data.replacement_date
        ]

        db.query(query, values, function(err, results){
            if(err) throw `Database Error! ${err}`

            callback(results.rows[0])
        })
    },
    find(id, callback){
        db.query(`
            SELECT *
            FROM equipments
            WHERE id = $1`, [id], function(err, results){
                if(err) throw `Database Error! ${err}`

                callback(results.rows[0])
            })
    },
    paginate(params){
        const { filter, limit, offset, callback } = params

        let query = "",
            filterQuery = "",
            totalQuery = `( 
                SELECT count(*) FROM equipments
            ) AS total`
        if (filter){
            filterQuery = `${query}
                WHERE equipments.type ILIKE '%${filter}%'
                OR equipments.name ILIKE '%${filter}%'
            `

            totalQuery = `(
                SELECT count(*) FROM equipments
                ${filterQuery}
            ) AS total`
        }

        query = `
            SELECT equipments.*, ${totalQuery}
            FROM equipments
            ${filterQuery}
            LIMIT $1 OFFSET $2
        `

        db.query(query, [limit, offset], function(err, results){
            if(err) throw `DATABASE ERROR ${err}`
            
            callback(results.rows)
        })
    },
    update(data, callback){
        const query = `
            UPDATE equipments SET
                type = ($1),
                name = ($2),
                cost = ($3),
                depreciation = ($4),
                acquisition_date = ($5),
                replacement_date = ($6)
            WHERE id = $7
        `

        data.cost = data.cost.replace(/\D/g, "")
        data.depreciation = data.depreciation.replace(/\D/g, "")

        const values = [
            data.type,
            data.name,
            data.cost,
            data.depreciation,
            data.acquisition_date,
            data.replacement_date,
            data.id
        ]

        db.query(query, values, function(err, results){
            if(err) throw `Database Error! ${err}`

            callback()
        })
    },
    delete(id, callback){
        db.query(`
            DELETE
            FROM equipments
            WHERE id = $1`, [id], function(err, results){
                if(err) throw `Database Error! ${err}`

                callback()
            })
    }
}
