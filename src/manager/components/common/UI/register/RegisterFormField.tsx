import { FormControl, FormHelperText, Typography } from '@mui/joy';
import { RegisterFormFieldProps, RestaurantFormState } from '../../../../types';
import RegisterInput from './RegisterInput';

const RegisterFormField: React.FC<RegisterFormFieldProps> = ({ name, label, value, onChange, error }) => (
  <FormControl>
    <RegisterInput
      required
      name={name}
      placeholder={label}
      size='md'
      fullWidth
      variant='plain'
      value={value}
      onChange={e => onChange(name as keyof RestaurantFormState, e.target.value)}
      error={!!error}
    />
    {error && (
      <FormHelperText>
        <Typography color='danger' level='body-xs'>
          {error}
        </Typography>
      </FormHelperText>
    )}
  </FormControl>
);

export default RegisterFormField;
