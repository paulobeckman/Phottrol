const db = require("../../config/db")

module.exports = {
    create(data, callback){
        const query = `
            INSERT INTO equipment (
                type,
                name,
                cost,
                depreciation,
                acquisition_date,
                replacement_date
            ) VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id
        `
        // data.cost = data.cost.replace(/\D/g, "")
        // data.depreciation = data.depreciation.replace(/\D/g, "")

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
    paginate(params){
        const { filter, limit, offset, callback } = params
        let query = "",
            filterQuery = "",
            totalQuery = `( 
                SELECT count(*) FROM equipment
            ) AS total`
        if (filter){
            filterQuery = `${query}
                WHERE equipment.type ILIKE '%${filter}%'
                OR equipment.name ILIKE '%${filter}%'
            `

            totalQuery = `(
                SELECT count(*) FROM equipment
                ${filterQuery}
            ) AS total`
        }

        query = `
            SELECT equipment.*, ${totalQuery}
            FROM equipment
            ${filterQuery}
            LIMIT $1 OFFSET $2
        `

        db.query(query, [limit, offset], function(err, results){
            if(err) throw `DATABASE ERROR ${err}`
            
            callback(results.rows)
        })
    }
}
