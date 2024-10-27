import React, { memo } from 'react';
import { Stepper as MuiStepper, Step as MuiStep, StepLabel as MuiStepLabel } from '@mui/material';
import { StepperProps } from '@/types';

const Stepper: React.FC<StepperProps> = memo(
  ({ steps, activeStep, activeColor = 'green', completedColor = 'green' }) => (
    <MuiStepper
      activeStep={activeStep}
      alternativeLabel
      sx={{
        '& .MuiStepIcon-root': {
          '&.Mui-active': {
            color: activeColor
          },
          '&.Mui-completed': {
            color: completedColor
          }
        }
      }}
    >
      {steps.map(label => (
        <MuiStep key={label}>
          <MuiStepLabel>{label}</MuiStepLabel>
        </MuiStep>
      ))}
    </MuiStepper>
  )
);

export default Stepper;
