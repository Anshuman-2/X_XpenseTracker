import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import './ExpenseList.css';

const ExpenseList = ({ expenses, onEdit, onDelete }) => {
  if (expenses.length === 0) {
    return <div className="expense-list-empty">No expenses yet.</div>;
  }
  return (
    <div className="expense-list-container">
      <h2>Expense History</h2>
      <table className="expense-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((exp, idx) => (
            <tr key={idx}>
              <td>{exp.title}</td>
              <td>${exp.price.toFixed(2)}</td>
              <td>{exp.category}</td>
              <td>{exp.date}</td>
              <td>
                <button className="edit-btn" onClick={() => onEdit(idx)}><FaEdit /></button>
                <button className="delete-btn" onClick={() => onDelete(idx)}><FaTrash /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseList;
