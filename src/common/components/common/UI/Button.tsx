import React from 'react';
import { ButtonProps } from '../../../types';
import { getButtonClasses } from '../../../utils';

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  className = '',
  children,
  ...props
}) => {
  const classes = `${getButtonClasses(variant, size)} ${className}`;

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

export default Button;
