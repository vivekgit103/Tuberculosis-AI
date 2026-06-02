import React from 'react';

export const Gauge = ({ score }) => {
  const angle = Math.min(180, Math.max(0, (score / 100) * 180));
  const fillColor = score > 70 ? '#d13f24' : score > 30 ? '#d18f33' : '#1f8f6c';

  return (
    <div style={{ textAlign: 'center', padding: '32px 0' }}>
      <svg viewBox="0 0 260 140" width="100%" height="220">
        <defs>
          <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1f8f6c" />
            <stop offset="50%" stopColor="#e85d24" />
            <stop offset="100%" stopColor="#d13f24" />
          </linearGradient>
        </defs>
        <path d="M30 120 A100 100 0 0 1 230 120" fill="none" stroke="#e5e5e5" strokeWidth="20" strokeLinecap="round" />
        <path
          d="M30 120 A100 100 0 0 1 230 120"
          fill="none"
          stroke="url(#gaugeGradient)"
          strokeWidth="20"
          strokeLinecap="round"
          strokeDasharray="314"
          strokeDashoffset={314 - (angle / 180) * 314}
        />
        <line
          x1="130"
          y1="120"
          x2="130"
          y2="40"
          stroke="#2c2c2a"
          strokeWidth="4"
          transform={`rotate(${angle - 90} 130 120)`}
        />
        <circle cx="130" cy="120" r="12" fill="#2c2c2a" />
        <text x="130" y="88" textAnchor="middle" fontSize="28" fontWeight="700" fill={fillColor}>
          {score}
        </text>
        <text x="130" y="112" textAnchor="middle" fontSize="14" fill="#5d5d58">Risk score</text>
      </svg>
    </div>
  );
};
