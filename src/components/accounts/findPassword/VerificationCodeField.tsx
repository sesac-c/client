import React, { memo } from 'react';
import { TextField } from '@mui/material';
import { CODE_FIELD_SETTING, DEFAULT_TEXTFIELD_SETTING } from '@/utils/form';
import { VerificationCodeFieldProps, FindPasswordField } from '@/types';

const VerificationCodeField: React.FC<VerificationCodeFieldProps> = memo(
  ({ verificationCode, remainingTime, onChange, helperText, isDisabled }) => {
    const formattedTime = `${Math.floor(remainingTime / 60)}:${(remainingTime % 60).toString().padStart(2, '0')}`;

    return (
      <div>
        <div className='find-password__remain-time-container'>
          <span className='find-password__remain-time__info-text'>입력까지 남은 시간</span>
          <span className='extra-info red'>{formattedTime}</span>
        </div>
        <TextField
          label={`${remainingTime === 0 ? '' : '인증코드'}`}
          placeholder={`${remainingTime === 0 ? '인증코드' : '이메일로 전송된 인증코드를 입력합니다'}`}
          value={verificationCode}
          onChange={e => onChange('verificationCode' as FindPasswordField, e.target.value)}
          helperText={helperText}
          error={helperText !== ''}
          disabled={isDisabled}
          {...DEFAULT_TEXTFIELD_SETTING}
          {...CODE_FIELD_SETTING}
        />
      </div>
    );
  }
);

export default VerificationCodeField;
