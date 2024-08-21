import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@mui/material';

const VerificationCodeField = memo(({ verificationCode, remainingTime, onChange, helperText, isDisabled }) => {
  const formattedTime = `${Math.floor(remainingTime / 60)}:${(remainingTime % 60).toString().padStart(2, '0')}`;

  return (
    <div>
      <div className='flex flex-row items-center justify-end gap-3 font-semibold text-red-danger'>
        <span className='inline-block text-[0.8rem]'>입력까지 남은 시간</span>
        <span className='extra-info red'>{formattedTime}</span>
      </div>
      <TextField
        label={`${remainingTime === 0 ? '' : '인증코드'}`}
        placeholder={`${remainingTime === 0 ? '인증코드' : '이메일로 전송된 인증코드를 입력합니다'}`}
        name='verificationCode'
        type='text'
        value={verificationCode}
        onChange={e => onChange('verificationCode', e.target.value)}
        helperText={helperText}
        error={helperText !== ''}
        disabled={isDisabled}
        fullWidth
        margin='dense'
        color='success'
      />
    </div>
  );
});

VerificationCodeField.propTypes = {
  verificationCode: PropTypes.string.isRequired,
  remainingTime: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  helperText: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool.isRequired
};

export default VerificationCodeField;
