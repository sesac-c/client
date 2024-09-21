import { styled, Input } from '@mui/joy';

const RegisterInput = styled(Input)({
  '--Input-radius': '0px',
  borderBottom: '1px solid',
  borderColor: 'neutral.outlinedBorder',
  '&:hover': {
    borderColor: 'neutral.outlinedHoverBorder'
  },
  '&::before': {
    border: '1px solid var(--joy-palette-success-700, #0A470A)',
    transform: 'scaleX(0)',
    left: 0,
    right: 0,
    bottom: '-2px',
    top: 'unset',
    transition: 'transform .15s cubic-bezier(0.1,0.9,0.2,1)',
    borderRadius: 0
  },
  '&:focus-within::before': {
    transform: 'scaleX(1)'
  },
  '&::placeholder': {
    color: 'var(--joy-palette-neutral-500)',
    fontStyle: 'italic',
    fontSize: '0.875rem',
    opacity: 0.7
  }
});
export default RegisterInput;
