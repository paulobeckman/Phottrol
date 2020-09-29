const db = require("../../config/db")

module.exports = {
    create(data){
        const query = `
            INSERT INTO events_equipments (
                event_id,
                equipment_id
            ) VALUES ($1, $2)
        `

        const values = [
            data.event_id,
            data.equipment_id
        ]

        db.query(query, values)
    },
    find(id) {
        return db.query(`
            SELECT events_equipments.*, equipments.name AS equipment_name
            FROM events_equipments 
            LEFT JOIN equipments ON (equipments.id = events_equipments.equipment_id)
            WHERE event_id = $1`, [id])
    }
}