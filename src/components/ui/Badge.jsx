import React from 'react';

export const Badge = ({ label, variant = 'primary', className = '' }) => {
  return <span className={`badge badge-${variant} ${className}`.trim()}>{label}</span>;
};
