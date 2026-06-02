import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const SymptomAreaChart = ({ data }) => {
  return (
    <div style={{ width: '100%', minHeight: 320 }}>
      <ResponsiveContainer width="100%" height={320}>
        <AreaChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 8 }}>
          <defs>
            <linearGradient id="symptomGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0f6e56" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#0f6e56" stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
          <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#5d5d58' }} />
          <YAxis tick={{ fontSize: 12, fill: '#5d5d58' }} />
          <Tooltip />
          <Area type="monotone" dataKey="count" stroke="#0f6e56" fill="url(#symptomGradient)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
