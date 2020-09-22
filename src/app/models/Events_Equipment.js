const db = require("../../config/db")

module.exports = {
    create(data){
        const query = `
            INSERT INTO events_equipment (
                events_id,
                equipment_id
            ) VALUES ($1, $2)
            RETURNING id
        `

        const values = [
            data.events_id,
            data.equipment_id
        ]

        db.query(query, values)
    }
}