import React from 'react';

export const SkeletonLoader = ({ lines = 3 }) => {
  return (
    <div style={{ display: 'grid', gap: '16px' }}>
      {Array.from({ length: lines }).map((_, index) => (
        <div key={index} style={{ height: 18, borderRadius: 12, background: 'rgba(15,110,86,0.08)', animation: 'pulse 1.6s ease-in-out infinite' }} />
      ))}
      <style>{`@keyframes pulse { 0% { opacity: 1 } 50% { opacity: 0.45 } 100% { opacity: 1 } }`}</style>
    </div>
  );
};
