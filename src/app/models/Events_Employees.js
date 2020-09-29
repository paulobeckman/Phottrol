const db = require("../../config/db")

module.exports = {
    create(data){
        const query = `
            INSERT INTO events_employees (
                event_id,
                employee_id
            ) VALUES ($1, $2)
        `

        const values = [
            data.event_id,
            data.employee_id
        ]

        db.query(query, values)
    },
    find(id) {
        return db.query(`
            SELECT events_employees.*, employees.name AS employee_name
                FROM events_employees 
                LEFT JOIN employees ON (employees.id = events_employees.employee_id)
                WHERE event_id = $1`, [id])
    }
}