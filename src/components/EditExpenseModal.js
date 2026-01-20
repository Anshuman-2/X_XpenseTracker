import React, { useState, useEffect } from 'react';
import './AddExpenseModal.css';

const categories = [
  'Food',
  'Transport',
  'Shopping',
  'Bills',
  'Entertainment',
  'Other'
];

const EditExpenseModal = ({ isOpen, onClose, onEdit, expense, maxAmount }) => {
  const [form, setForm] = useState({ title: '', price: '', category: '', date: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    if (expense) setForm(expense);
  }, [expense]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.price || !form.category || !form.date) {
      setError('All fields are required');
      return;
    }
    if (isNaN(form.price) || Number(form.price) <= 0) {
      setError('Enter a valid amount');
      return;
    }
    if (Number(form.price) > maxAmount) {
      setError('Cannot spend more than wallet balance');
      return;
    }
    onEdit({ ...form, price: Number(form.price) });
    setError('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Edit Expense</h3>
        <form onSubmit={handleSubmit}>
          <input
            name="title"
            placeholder="Expense Title"
            value={form.title}
            onChange={handleChange}
            required
          />
          <input
            name="price"
            type="number"
            placeholder="Expense Amount"
            value={form.price}
            onChange={handleChange}
            min="1"
            step="0.01"
            required
          />
          <select name="category" value={form.category} onChange={handleChange} required>
            <option value="">Select Category</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <input
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
            required
          />
          {error && <div className="error">{error}</div>}
          <button type="submit">Save Changes</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default EditExpenseModal;
