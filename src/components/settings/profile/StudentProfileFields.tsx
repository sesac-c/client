import { HandleUpdateProfileFieldChange, UpdateProfileErrors } from '@/types';
import { NICKNAME_FIELD_SETTING } from '@/utils/form';
import { Box, Button, TextField } from '@mui/material';
import React, { ChangeEvent } from 'react';
import ConfirmModal from '@/components/common/feedback/ConfirmModal';
import { COURSE_CHANGE_REQUEST_CONFIRM_MESSAGES } from '@/constants';
import { useModal } from '@/hooks';
import { USER_SETTING_CHILDREN_PATH, USER_SETTING_PATH } from '@/routes/paths';

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
  const { openModal, closeModal } = useModal(() => (
    <ConfirmModal
      title='캠퍼스 변경 신청'
      confirmButtonText='신청'
      onClose={closeModal}
      onClick={() => {
        closeModal();
        window.location.href = `${USER_SETTING_PATH}/${USER_SETTING_CHILDREN_PATH.courseChangeRequest}`;
      }}
    >
      {COURSE_CHANGE_REQUEST_CONFIRM_MESSAGES.map((message, index) => (
        <p key={index}>{message}</p>
      ))}
    </ConfirmModal>
  ));

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      {/* 라벨과 버튼 컨테이너 */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', width: '100%' }}>
        {/* 사진 삭제 버튼 */}
        <Button
          variant='text'
          disabled={isCourseChanging}
          onClick={openModal}
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
