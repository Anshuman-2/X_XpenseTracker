import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#10ac84', '#ee5253', '#feca57', '#54a0ff', '#5f27cd', '#222f3e'];

const ExpenseSummaryChart = ({ expenses }) => {
  const data = Object.values(
    expenses.reduce((acc, exp) => {
      acc[exp.category] = acc[exp.category] || { name: exp.category, value: 0 };
      acc[exp.category].value += exp.price;
      return acc;
    }, {})
  );

  if (data.length === 0) return <div style={{textAlign:'center', color:'#8395a7'}}>No expenses to summarize.</div>;

  return (
    <div style={{ width: '100%', height: 300 }}>
      <h3>Expense Summary</h3>
      <ResponsiveContainer>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label>
            {data.map((entry, idx) => (
              <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpenseSummaryChart;
