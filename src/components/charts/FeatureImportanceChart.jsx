import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LabelList } from 'recharts';

export const FeatureImportanceChart = ({ data }) => {
  return (
    <div style={{ width: '100%', minHeight: 320 }}>
      <ResponsiveContainer width="100%" height={320}>
        <BarChart layout="vertical" data={data} margin={{ top: 24, right: 16, left: 24, bottom: 24 }}>
          <XAxis type="number" hide />
          <YAxis dataKey="name" type="category" width={140} tick={{ fontSize: 14, fill: '#2c2c2a' }} />
          <Tooltip formatter={(value) => `${value}%`} cursor={{ fill: 'rgba(15,110,86,0.06)' }} />
          <Bar dataKey="contribution" radius={[12, 12, 12, 12]} fill="#0f6e56">
            <LabelList dataKey="contribution" position="right" formatter={(value) => `${value}%`} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
