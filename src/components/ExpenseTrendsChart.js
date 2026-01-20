import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const ExpenseTrendsChart = ({ expenses }) => {
  const data = Object.values(
    expenses.reduce((acc, exp) => {
      acc[exp.category] = acc[exp.category] || { category: exp.category, total: 0 };
      acc[exp.category].total += exp.price;
      return acc;
    }, {})
  );

  if (data.length === 0) return <div style={{textAlign:'center', color:'#8395a7'}}>No expense trends to show.</div>;

  return (
    <div style={{ width: '100%', height: 300 }}>
      <h2>Expense Trends</h2>
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="total" fill="#54a0ff" name="Total Spent" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpenseTrendsChart;
