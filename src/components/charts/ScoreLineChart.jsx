import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const ScoreLineChart = ({ data }) => {
  return (
    <div style={{ width: '100%', minHeight: 320 }}>
      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={data} margin={{ top: 20, right: 24, left: 0, bottom: 8 }}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
          <XAxis dataKey="date" tick={{ fontSize: 12, fill: '#5d5d58' }} />
          <YAxis tick={{ fontSize: 12, fill: '#5d5d58' }} domain={[0, 100]} />
          <Tooltip />
          <Line type="monotone" dataKey="score" stroke="#e85d24" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
