import React from 'react';
import './WalletBalance.css';

const WalletBalance = ({ balance, onAddIncome }) => {
  return (
    <div className="wallet-balance-container">
      <h2>Wallet Balance: ${balance.toFixed(2)}</h2>
      <button type="button" onClick={onAddIncome} className="add-income-btn">
        + Add Income
      </button>
    </div>
  );
};

export default WalletBalance;
