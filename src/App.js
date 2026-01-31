import React, { useState, useEffect } from 'react';
import AddIncomeModal from './components/AddIncomeModal';
import AddExpenseModal from './components/AddExpenseModal';
import EditExpenseModal from './components/EditExpenseModal';
import './components/WalletBalance.css';
import './components/AddIncomeModal.css';

import ExpenseList from './components/ExpenseList';


import ExpenseSummaryChart from './components/ExpenseSummaryChart';
import ExpenseTrendsChart from './components/ExpenseTrendsChart';



function App() {
  const [balance, setBalance] = useState(() => {
    const saved = localStorage.getItem('walletBalance');
    return saved ? Number(saved) : 5000;
  });
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem('expenses');
    return saved ? JSON.parse(saved) : [];
  });
  const [showIncomeModal, setShowIncomeModal] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [editIdx, setEditIdx] = useState(null);
  const [pendingIncome, setPendingIncome] = useState(null);

  useEffect(() => {
    if (pendingIncome !== null) {
      setBalance(prev => prev + pendingIncome);
      setShowIncomeModal(false);
      setPendingIncome(null);
    }
    localStorage.setItem('walletBalance', balance);
  }, [balance, pendingIncome]);
  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  const handleAddIncome = (amount) => {
    setPendingIncome(amount);
  };


  const handleAddExpense = (expense) => {
    setExpenses(prev => [...prev, expense]);
    setBalance(prev => prev - expense.price);
  };

  const handleDeleteExpense = (idx) => {
    setBalance(prev => prev + expenses[idx].price);
    setExpenses(prev => prev.filter((_, i) => i !== idx));
  };

  const handleEditExpense = (idx) => {
    setEditIdx(idx);
  };

  const handleSaveEditExpense = (updatedExpense) => {
    setExpenses(prev => prev.map((exp, i) =>
      i === editIdx ? updatedExpense : exp
    ));
    // Adjust wallet balance: refund old, subtract new
    setBalance(prev => prev + expenses[editIdx].price - updatedExpense.price);
    setEditIdx(null);
  };

  return (
    <div className="main-bg">
      <h1 className="main-title">Expense Tracker</h1>
      <div className="summary-section">
        <div className="wallet-box">
          <div className="wallet-label">Wallet Balance: <span className="wallet-amount">₹{balance.toLocaleString()}</span></div>
          <button type="button" className="add-income-ui-btn" onClick={() => setShowIncomeModal(true)}>
            + Add Income
          </button>
        </div>
        <div className="expense-box">
          <div className="expense-label">Expenses: <span className="expense-amount">₹{expenses.reduce((a, b) => a + b.price, 0).toLocaleString()}</span></div>
          <button type="button" className="add-expense-ui-btn" onClick={() => setShowExpenseModal(true)}>
            + Add Expense
          </button>
        </div>
      </div>
      <div className="chart-section">
        <ExpenseSummaryChart expenses={expenses} />
      </div>
      <div style={{display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between'}}>
        <div className="recent-section">
          <h2 className="recent-title">Recent Transactions</h2>
          <ExpenseList
            expenses={expenses}
            onEdit={handleEditExpense}
            onDelete={handleDeleteExpense}
          />
        </div>
        <div className="top-expenses-section">
          <h2 className="top-expenses-title">Top Expenses</h2>
          <ExpenseTrendsChart expenses={expenses} />
        </div>
      </div>
      <AddIncomeModal
        isOpen={showIncomeModal}
        onClose={() => setShowIncomeModal(false)}
        onAdd={handleAddIncome}
      />
      <AddExpenseModal
        isOpen={showExpenseModal}
        onClose={() => setShowExpenseModal(false)}
        onAdd={handleAddExpense}
        maxAmount={balance}
      />
      <EditExpenseModal
        isOpen={editIdx !== null}
        onClose={() => setEditIdx(null)}
        onEdit={handleSaveEditExpense}
        expense={editIdx !== null ? expenses[editIdx] : null}
        maxAmount={balance + (editIdx !== null ? expenses[editIdx].price : 0)}
      />
    </div>
  );
}

export default App;
