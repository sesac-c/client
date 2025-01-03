import React from 'react';
import { Stack } from '@mui/material';
import {
  HandleUpdateProfileFieldChange,
  ManagerProfileFormResponse,
  StudentProfileFormResponse,
  UpdateProfileErrors
} from '@/types';
import ProfileField from './ProfileField';
import { CampusAndCourseFields, NicknameField } from './StudentProfileFields';

export const ManagerUpdateProfileForm: React.FC<
  ManagerProfileFormResponse & {
    onRemovedButtonClick: () => void;
    onFileChange: (file: File | null) => void;
    fileState: File | null;
  }
> = ({ profileImage, onRemovedButtonClick, onFileChange, fileState }) => {
  return (
    <ProfileField
      profileImage={profileImage}
      onRemovedButtonClick={onRemovedButtonClick}
      onFileChange={onFileChange}
      fileState={fileState}
    />
  );
};

export const StudentUpdateProfileForm: React.FC<
  StudentProfileFormResponse & {
    onChange: HandleUpdateProfileFieldChange;
    onRemovedButtonClick: () => void;
    onFileChange: (file: File | null) => void;
    fileState: File | null;
    errors: UpdateProfileErrors;
  }
> = ({ onChange, onRemovedButtonClick, onFileChange, fileState, errors, ...props }) => {
  return (
    <Stack spacing={3}>
      <ProfileField
        profileImage={props.profileImage}
        onRemovedButtonClick={onRemovedButtonClick}
        onFileChange={onFileChange}
        fileState={fileState}
      />
      <NicknameField nickname={props.nickname} onChange={onChange} errors={errors} />
      <CampusAndCourseFields
        isCourseChanging={props.isCourseChanging}
        campusName={props.campusName}
        courseName={props.courseName}
      />
    </Stack>
  );
};
