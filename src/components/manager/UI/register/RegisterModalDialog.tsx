import { styled, ModalDialog } from '@mui/joy';

const RegisterModalDialog = styled(ModalDialog)(({ theme }) => ({
  width: '80%',
  maxWidth: '600px',
  bgcolor: 'background.paper',
  boxShadow: theme.shadow.md,
  p: 4,
  '& .MuiDialogTitle-root': {
    pb: 2
  },
  '& .MuiDialogContent-root': {
    pt: 0
  }
}));

export default RegisterModalDialog;
