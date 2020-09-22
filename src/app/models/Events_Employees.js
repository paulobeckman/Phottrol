const db = require("../../config/db")

module.exports = {
    create(data){
        const query = `
            INSERT INTO events_employees (
                events_id,
                employees_id
            ) VALUES ($1, $2)
            RETURNING id
        `

        const values = [
            data.events_id,
            data.employees_id
        ]

        db.query(query, values)
    }
}