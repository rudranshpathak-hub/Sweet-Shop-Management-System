const pool = require('../models/db');

exports.getSweets = async (req, res) => {
  const result = await pool.query('SELECT * FROM sweets');
  res.json(result.rows);
};

exports.searchSweets = async (req, res) => {
  const { name, category, minPrice, maxPrice } = req.query;
  let query = 'SELECT * FROM sweets WHERE 1=1';
  const params = [];
  if (name) { query += ' AND name ILIKE $' + (params.length + 1); params.push(`%${name}%`); }
  if (category) { query += ' AND category = $' + (params.length + 1); params.push(category); }
  if (minPrice) { query += ' AND price >= $' + (params.length + 1); params.push(minPrice); }
  if (maxPrice) { query += ' AND price <= $' + (params.length + 1); params.push(maxPrice); }
  const result = await pool.query(query, params);
  res.json(result.rows);
};

exports.addSweet = async (req, res) => {
  const { name, category, price, quantity } = req.body;
  const result = await pool.query(
    'INSERT INTO sweets (name, category, price, quantity) VALUES ($1, $2, $3, $4) RETURNING *',
    [name, category, price, quantity]
  );
  res.status(201).json(result.rows[0]);
};

exports.updateSweet = async (req, res) => {
  const { id } = req.params;
  const { name, category, price, quantity } = req.body;
  const result = await pool.query(
    'UPDATE sweets SET name = $1, category = $2, price = $3, quantity = $4 WHERE id = $5 RETURNING *',
    [name, category, price, quantity, id]
  );
  res.json(result.rows[0]);
};

exports.deleteSweet = async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM sweets WHERE id = $1', [id]);
  res.json({ message: 'Sweet deleted' });
};

exports.purchaseSweet = async (req, res) => {
  const { id } = req.params;
  const result = await pool.query('SELECT * FROM sweets WHERE id = $1', [id]);
  if (result.rows[0].quantity <= 0) return res.status(400).json({ error: 'Out of stock' });
  await pool.query('UPDATE sweets SET quantity = quantity - 1 WHERE id = $1', [id]);
  res.json({ message: 'Purchased' });
};

exports.restockSweet = async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;
  await pool.query('UPDATE sweets SET quantity = quantity + $1 WHERE id = $2', [quantity, id]);
  res.json({ message: 'Restocked' });
};