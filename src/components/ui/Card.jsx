import React from 'react';

export const Card = ({ title, children, className = '' }) => {
  return (
    <article className={`card ${className}`.trim()}>
      <div className="card-inner">
        {title && <h2 className="card-title">{title}</h2>}
        {children}
      </div>
    </article>
  );
};
