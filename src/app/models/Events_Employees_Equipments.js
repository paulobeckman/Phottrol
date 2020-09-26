const db = require("../../config/db")

module.exports = {
    create(data){
        const query = `
            INSERT INTO events_employees_equipments (
                event_id,
                employee_id,
                equipment_id
            ) VALUES ($1, $2, $3)
        `

        const values = [
            data.event_id,
            data.employee_id,
            data.equipment_id
        ]

        db.query(query, values)
    }
}