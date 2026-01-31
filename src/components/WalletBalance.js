import React from 'react';
import './WalletBalance.css';

const WalletBalance = ({ balance, onAddIncome }) => {
  return (
    <div className="wallet-balance-container">
      <div className="wallet-label">Wallet Balance: ${balance.toFixed(2)}</div>
      <button type="button" onClick={onAddIncome} className="add-income-btn">
        + Add Income
      </button>
    </div>
  );
};

export default WalletBalance;
