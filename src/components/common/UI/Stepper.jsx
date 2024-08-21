import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Stepper as MuiStepper, Step as MuiStep, StepLabel as MuiStepLabel } from '@mui/material';

const Stepper = memo(({ steps, activeStep, activeColor = 'green', completedColor = 'green' }) => (
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
));

Stepper.propTypes = {
  steps: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeStep: PropTypes.number.isRequired,
  activeColor: PropTypes.string,
  completedColor: PropTypes.string
};

export default Stepper;
