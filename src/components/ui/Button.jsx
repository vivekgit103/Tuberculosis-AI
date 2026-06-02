import React from 'react';

export const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const classes = `btn btn-${variant} ${className}`.trim();
  return (
    <button type={props.type || 'button'} className={classes} {...props}>
      {children}
    </button>
  );
};
