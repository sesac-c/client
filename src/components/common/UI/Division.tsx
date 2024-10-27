import React from 'react';
import { DivisionProps } from '@/types';
import { getDivisionClasses } from '@/utils/style';

const Division: React.FC<DivisionProps> = ({ variant = 'primary', type = 'vertical', className = '' }) => {
  const classes = getDivisionClasses(variant, type, className);
  return <div className={classes}></div>;
};

export default Division;
