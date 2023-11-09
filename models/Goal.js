const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME, 
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

class Goal {
  constructor(id, title, description) {
    this.id = id;
    this.title = title;
    this.description = description;
  }

  static fetchAll() {
    return pool.promise()
      .query('SELECT * FROM goal')
      .then(([rows]) => {
        return rows.map(row => new Goal(row.id, row.title, row.description));
      })
      .catch(err => {
        throw err;
      });
  }
}

module.exports = Goal;