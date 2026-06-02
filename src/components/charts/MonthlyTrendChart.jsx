import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const MonthlyTrendChart = ({ data }) => {
  return (
    <div style={{ width: '100%', minHeight: 320 }}>
      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={data} margin={{ top: 20, right: 24, left: 0, bottom: 8 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.25} />
          <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#5d5d58' }} />
          <YAxis tick={{ fontSize: 12, fill: '#5d5d58' }} />
          <Tooltip />
          <Bar dataKey="assessments" fill="#0f6e56" radius={[12, 12, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
