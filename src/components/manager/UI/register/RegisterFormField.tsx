import { FormControl, FormHelperText, Typography } from '@mui/joy';
import { RegisterFormFieldProps } from '@/types';
import RegisterInput from './RegisterInput';

const RegisterFormField = <T extends string>({
  name,
  label,
  value,
  onChange,
  error
}: RegisterFormFieldProps<T>): React.ReactElement => (
  <FormControl>
    <RegisterInput
      required
      name={name}
      placeholder={label}
      size='md'
      fullWidth
      variant='plain'
      value={value}
      onChange={e => onChange(name, e.target.value)}
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
