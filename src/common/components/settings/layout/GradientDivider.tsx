import React from 'react';
import { Divider, DividerProps } from '@mui/material';
import { styled } from '@mui/system';

interface GradientDividerProps extends DividerProps {
  leftColor?: string;
  rightColor?: string;
  splitPoint?: number;
}

const StyledDivider = styled(Divider, {
  shouldForwardProp: prop => prop !== 'leftColor' && prop !== 'rightColor' && prop !== 'splitPoint'
})<GradientDividerProps>(({ leftColor, rightColor, splitPoint }) => ({
  height: '1.5px',
  border: 'none',
  background: `linear-gradient(to right, 
               ${leftColor} 0%, 
               ${leftColor} ${splitPoint}%, 
               ${rightColor} ${splitPoint}%, 
               ${rightColor} 100%)`
}));

const GradientDivider: React.FC<GradientDividerProps> = ({
  leftColor = '#187B46',
  rightColor = '#E0E0E0',
  splitPoint = 30,
  ...props
}) => {
  return <StyledDivider leftColor={leftColor} rightColor={rightColor} splitPoint={splitPoint} {...props} />;
};

export default GradientDivider;
