import { useState } from 'react';

import {
  TextField,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  IconButton,
  FormControl,
  FormHelperText
} from '@mui/material';

import { EyeSlashIcon, EyeIcon } from '@heroicons/react/20/solid';

// Constants
const DEFAULT_TEXTFIELD_SETTING = {
  color: 'success',
  margin: 'dense',
  fullWidth: true
};
const BirthdateInput = ({ birthdate, gender, onChange, errors }) => {
  return (
    <div className='w-full'>
      <div className='flex items-center'>
        <TextField
          label='주민번호 7자리'
          placeholder='yymmdd'
          name='birthdate'
          value={birthdate}
          onChange={e => onChange('birthdate', e.target.value)}
          className='flex-grow'
          error={!!errors.birthdate}
          helperText={errors.birthdate}
          {...DEFAULT_TEXTFIELD_SETTING}
        />
        <span className='mx-2 text-3xl'>-</span>
        <TextField
          label=''
          name='gender'
          value={gender}
          onChange={e => onChange('gender', e.target.value)}
          className='w-12'
          error={!!errors.gender}
          helperText={errors.gender}
          {...DEFAULT_TEXTFIELD_SETTING}
        />
        <div className='ml-2 flex'>
          {[...Array(6)].map((_, index) => (
            <span key={index} className='mx-0.5 h-2.5 w-2.5 rounded-full bg-gray-400'></span>
          ))}
        </div>
      </div>
    </div>
  );
};

const SignupFirstStepField = ({ formData, onChange, errors }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(show => !show);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword(show => !show);

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };
  return (
    <>
      <div className='flex flex-col gap-1'>
        <TextField
          label='이름'
          placeholder='5자 이내 입력'
          name='name'
          value={formData.name}
          onChange={e => onChange('name', e.target.value)}
          error={!!errors.name}
          helperText={errors.name}
          {...DEFAULT_TEXTFIELD_SETTING}
        />
        <BirthdateInput birthdate={formData.birthdate} gender={formData.gender} onChange={onChange} errors={errors} />
      </div>
      <div className='flex flex-col gap-1'>
        <TextField
          type='email'
          label='이메일'
          placeholder='example@example.com'
          name='email'
          value={formData.email}
          onChange={e => onChange('email', e.target.value)}
          error={!!errors.email}
          helperText={errors.email}
          {...DEFAULT_TEXTFIELD_SETTING}
        />
        <FormControl
          variant='outlined'
          margin={DEFAULT_TEXTFIELD_SETTING.margin}
          color={DEFAULT_TEXTFIELD_SETTING.color}
          fullWidth
        >
          <InputLabel htmlFor='password'>비밀번호</InputLabel>
          <OutlinedInput
            id='password'
            type={showPassword ? 'text' : 'password'}
            placeholder='영어, 숫자, 특수문자의 조합으로 8~20자 이내 입력'
            name='password'
            value={formData.password}
            onChange={e => onChange('password', e.target.value)}
            helpertext={errors.password}
            {...DEFAULT_TEXTFIELD_SETTING}
            endAdornment={
              <InputAdornment position='end'>
                <IconButton
                  aria-label='toggle password visibility'
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge='end'
                >
                  {showPassword ? (
                    <EyeSlashIcon className='mr-2 w-5 text-gray-400' />
                  ) : (
                    <EyeIcon className='mr-2 w-5 text-gray-400' />
                  )}
                </IconButton>
              </InputAdornment>
            }
            label='Password'
          />
          <FormHelperText id='password' error={!!errors.password}>
            {errors.password}
          </FormHelperText>
        </FormControl>

        <FormControl
          variant='outlined'
          margin={DEFAULT_TEXTFIELD_SETTING.margin}
          color={DEFAULT_TEXTFIELD_SETTING.color}
          fullWidth
        >
          <InputLabel htmlFor='confirmPassword'>비밀번호 확인</InputLabel>
          <OutlinedInput
            id='confirmPassword'
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder='영어, 숫자, 특수문자의 조합으로 8~20자 이내 입력'
            name='confirmPassword'
            value={formData.confirmPassword}
            onChange={e => onChange('confirmPassword', e.target.value)}
            {...DEFAULT_TEXTFIELD_SETTING}
            endAdornment={
              <InputAdornment position='end'>
                <IconButton
                  aria-label='toggle password visibility'
                  onClick={handleClickShowConfirmPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge='end'
                >
                  {showConfirmPassword ? (
                    <EyeSlashIcon className='mr-2 w-5 text-gray-400' />
                  ) : (
                    <EyeIcon className='mr-2 w-5 text-gray-400' />
                  )}
                </IconButton>
              </InputAdornment>
            }
            label='Password'
          />
          <FormHelperText id='confirmPassword' error={!!errors.confirmPassword}>
            {errors.confirmPassword}
          </FormHelperText>
        </FormControl>
      </div>
    </>
  );
};

export default SignupFirstStepField;
