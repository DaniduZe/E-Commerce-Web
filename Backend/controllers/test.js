import pool from '../middlewares/db.js';

// INSERT query
async function createUser(name, email) {
  const query = 'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *';
  const values = [name, email];
  const result = await pool.query(query, values);
  console.log('User Created:', result.rows[0]);
}

// SELECT query
async function getUsers() {
  const result = await pool.query('SELECT * FROM users');
  console.log('All Users:', result.rows);
}

// Example usage
createUser('Danidu', 'danidu@example.com');
getUsers();
