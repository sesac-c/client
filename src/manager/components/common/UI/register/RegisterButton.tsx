import { Button } from '@mui/joy';
import { RegisterButtonProps } from '../../../../types';

const RegisterButton: React.FC<RegisterButtonProps> = ({ isFormValid }) => {
  return (
    <Button fullWidth disabled={!isFormValid} type='submit' color='success' sx={{ marginTop: '30px' }}>
      등록
    </Button>
  );
};
export default RegisterButton;
