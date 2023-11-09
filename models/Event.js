const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME, 
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

class Event {
  constructor(id, title, description) {
    this.id = id;
    this.title = title;
    this.description = description;
  }

  static async fetchAll() {
    try {
      const [rows] = await pool.query('SELECT * FROM event');
      return rows.map(row => new Event(row.id, row.title, row.description));
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Event;
