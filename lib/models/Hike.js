const pool = require('../utils/pool');

class Hike {
  id;
  name;
  address;
  length;
  elevation;
  note;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.address = row.address;
    this.length = row.length;
    this.elevation = row.elevation;
    this.note = row.note;
  }

  static async insert(hike) {
    const { rows } = await pool.query(
      'INSERT INTO hikes (name, address, length, elevation, note) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [hike.name, hike.address, hike.length, hike.elevation, hike.note]
    );

    return new Hike(rows[0]);
  }

  static async find() {
    const { rows } = await pool.query(
      'SELECT * FROM hikes'
    );
    const formattedRows = rows.map(row => new Hike(row));

    return formattedRows;
  }

  static async findById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM hikes WHERE id=$1',
      [id]
    );

    if(!rows[0]) return null;
    return new Hike(rows[0]);
  }

  static async deleteById(id) {
    const { rows } = await pool.query(
      'DELETE FROM hikes WHERE id = $1 RETURNING *',
      [id]
    );

    return new Hike(rows[0]);
  }

  static async updateById(id, hike) {
    const { rows } = await pool.query(
      `UPDATE hikes 
        SET name=$1, 
        address=$2, 
        length=$3, 
        elevation=$4, 
        note=$5 
        WHERE id=$6 
        RETURNING *`,
      [hike.name, hike.address, hike.length, hike.elevation, hike.note, id]
    );

    return new Hike(rows[0]);
  }
}

module.exports = Hike;
