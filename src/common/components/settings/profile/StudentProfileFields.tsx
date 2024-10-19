import { HandleUpdateProfileFieldChange, UpdateProfileErrors } from '@/common/types';
import { NICKNAME_FIELD_SETTING } from '@/common/utils';
import { Box, Button, Stack, TextField } from '@mui/material';
import React, { ChangeEvent } from 'react';

const DEFAULT_TEXTFIELD_SETTING = {
  color: 'success' as const,
  margin: 'dense' as const,
  fullWidth: true as const
};

export const NicknameField: React.FC<{
  nickname: string;
  onChange: HandleUpdateProfileFieldChange;
  errors: UpdateProfileErrors;
}> = ({ nickname, onChange, errors }) => {
  return (
    <TextField
      value={nickname}
      onChange={(e: ChangeEvent<HTMLInputElement>) => onChange('nickname', e.target.value)}
      error={!!errors.nickname}
      helperText={errors.nickname}
      {...DEFAULT_TEXTFIELD_SETTING}
      {...NICKNAME_FIELD_SETTING}
    />
  );
};

const CampusField: React.FC<{ campusName: string }> = ({ campusName }) => {
  return (
    <TextField
      {...DEFAULT_TEXTFIELD_SETTING}
      value={campusName}
      name='campusName'
      label='캠퍼스명'
      disabled
      variant='filled'
    />
  );
};

const CourseField: React.FC<{ courseName: string }> = ({ courseName }) => {
  return (
    <TextField
      {...DEFAULT_TEXTFIELD_SETTING}
      value={courseName}
      name='courseName'
      label='강의명'
      disabled
      variant='filled'
    />
  );
};

export const CampusAndCourseFields: React.FC<{ campusName: string; courseName: string; isCourseChanging: boolean }> = ({
  campusName,
  courseName,
  isCourseChanging
}) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      {/* 라벨과 버튼 컨테이너 */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', width: '100%' }}>
        {/* 사진 삭제 버튼 */}
        <Button
          variant='text'
          disabled={isCourseChanging}
          sx={{ color: 'green', textDecoration: 'underline', fontWeight: 550 }}
        >
          {isCourseChanging ? '강의 변경 신청 중' : '강의 변경 신청'}
        </Button>
      </Box>
      <CampusField campusName={campusName} />
      <CourseField courseName={courseName} />
    </Box>
  );
};
