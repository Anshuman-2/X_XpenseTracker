import React, { useState } from 'react';
import './AddIncomeModal.css';

const AddIncomeModal = ({ isOpen, onClose, onAdd }) => {
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      setError('Please enter a valid amount');
      return;
    }
    onAdd(Number(amount));
    setAmount('');
    setError('');
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add Balance</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            placeholder="Income Amount"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            min="1"
            step="0.01"
            required
          />
          {error && <div className="error">{error}</div>}
          <button type="submit">Add Balance</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default AddIncomeModal;
