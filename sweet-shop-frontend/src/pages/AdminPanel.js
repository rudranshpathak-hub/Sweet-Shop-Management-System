import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminPanel({ onLogout }) {
  const [sweets, setSweets] = useState([]);
  const [form, setForm] = useState({
    name: '',
    category: '',
    price: '',
    quantity: ''
  });

  useEffect(() => {
    fetchSweets();
  }, []);

  const fetchSweets = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/sweets');
      setSweets(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/sweets', {
        name: form.name,
        category: form.category,
        price: Number(form.price),
        quantity: Number(form.quantity)
      });
      setForm({ name: '', category: '', price: '', quantity: '' });
      fetchSweets();
    } catch (err) {
      alert('Failed to add sweet');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Admin Panel</h2>
      <button onClick={onLogout}>Logout</button>

      <h3>Add Sweet</h3>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          placeholder="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Quantity"
          value={form.quantity}
          onChange={(e) => setForm({ ...form, quantity: e.target.value })}
          required
        />
        <br /><br />
        <button type="submit">Add Sweet</button>
      </form>

      <h3>All Sweets</h3>
      <ul>
        {sweets.map(sweet => (
          <li key={sweet.id}>
            {sweet.name} | ₹{sweet.price} | Qty: {sweet.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminPanel;
