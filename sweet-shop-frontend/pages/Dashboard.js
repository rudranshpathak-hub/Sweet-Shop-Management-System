import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Dashboard({ onLogout, isAdmin }) {
  const [sweets, setSweets] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredSweets, setFilteredSweets] = useState([]);

  useEffect(() => {
    fetchSweets();
  }, []);

  useEffect(() => {
    setFilteredSweets(
      sweets.filter(sweet =>
        sweet.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, sweets]);

  const fetchSweets = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/sweets');
      setSweets(response.data);
    } catch (err) {
      console.error(err);
      alert('Failed to load sweets');
    }
  };

  const handlePurchase = async (id) => {
    try {
      await axios.post(`http://localhost:5000/api/sweets/${id}/purchase`);
      fetchSweets();
    } catch (err) {
      alert('Out of stock');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Dashboard</h2>

      <button onClick={onLogout}>Logout</button>
      {isAdmin && (
        <>
          <br /><br />
          <Link to="/admin">Go to Admin Panel</Link>
        </>
      )}

      <br /><br />

      <input
        type="text"
        placeholder="Search sweets"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <ul>
        {filteredSweets.map(sweet => (
          <li key={sweet.id}>
            <strong>{sweet.name}</strong> | {sweet.category} | ₹{sweet.price} | Qty: {sweet.quantity}
            <br />
            <button
              onClick={() => handlePurchase(sweet.id)}
              disabled={sweet.quantity === 0}
            >
              Purchase
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
