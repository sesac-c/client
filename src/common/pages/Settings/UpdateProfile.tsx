import React from 'react';
import SettingsContentLayout from '@/common/components/settings/layout/SettingsContent';
import {
  ManagerUpdateProfileForm,
  StudentUpdateProfileForm
} from '@/common/components/settings/profile/UpdateProfileForm';
import { getUpdateProfileForm } from '@/common/services/api';
import { LoaderFunctionArgs, Navigate, useLoaderData } from 'react-router-dom';
import { USER_SETTING_CHILDREN_PATH, USER_SETTING_PATH, USER_TYPE } from '@/common/constants';
import { UpdateProfileFormProps, ManagerProfileFormResponse, StudentProfileFormResponse } from '@/common/types';
import useAuthStore from '@/common/stores/authStore';
import { useStudentUpdateProfile } from '@/common/hooks/settings/useStudentUpdateProfile';
import LoadingStatus from '@/common/components/settings/LoadingStatus';
import ProcessErrorModal from '@/common/components/common/feedback/ProcessErrorModal';
import { useManagerUpdateProfile } from '@/common/hooks/settings/useManagerUpdateProfile';

export const RedirectUpdateProfilePage: React.FC = () => {
  const { role } = useAuthStore().user;
  return <Navigate to={`${USER_SETTING_PATH}/${USER_SETTING_CHILDREN_PATH.profile}/${role.toLowerCase()}`} replace />;
};

const ManagerUpdateProfilePage: React.FC<ManagerProfileFormResponse> = ({ profileImage: initialProfileImage }) => {
  const {
    profileImage,
    isChange,
    isLoading,
    error,
    fileState,
    handleRemovedButtonClick,
    onFileChange,
    handleSubmit,
    setError
  } = useManagerUpdateProfile(initialProfileImage);

  if (error.isError) {
    return (
      <ProcessErrorModal
        title='프로필 수정 실패'
        content={error.message}
        onClose={() => setError({ isError: false, message: '' })}
      />
    );
  }

  return (
    <SettingsContentLayout
      title='프로필 수정'
      form={
        isLoading ? (
          <LoadingStatus />
        ) : (
          <ManagerUpdateProfileForm
            profileImage={profileImage}
            onRemovedButtonClick={handleRemovedButtonClick}
            onFileChange={onFileChange}
            fileState={fileState}
          />
        )
      }
      isButtonDisabled={!isChange}
      onSubmit={handleSubmit}
      buttonText='수정'
    />
  );
};

const StudentUpdateProfilePage: React.FC<StudentProfileFormResponse> = ({
  nickname,
  profileImage,
  campusId,
  campusName,
  courseId,
  courseName,
  isCourseChanging
}) => {
  const {
    state,
    isButtonDisabled,
    handleChange,
    handleFileChange,
    handleRemovedButtonClick,
    handleSubmit,
    handleErrorModal,
    fileState
  } = useStudentUpdateProfile({
    nickname,
    profileImage
  });

  if (state.updateError) {
    return <ProcessErrorModal title='프로필 수정 실패' content={state.updateErrorMessage} onClose={handleErrorModal} />;
  }

  return (
    <SettingsContentLayout
      title='프로필 수정'
      form={
        state.isLoading ? (
          <LoadingStatus />
        ) : (
          <StudentUpdateProfileForm
            profileImage={state.profileImage}
            nickname={state.nickname}
            campusId={campusId}
            campusName={campusName}
            courseId={courseId}
            courseName={courseName}
            isCourseChanging={isCourseChanging}
            onChange={handleChange}
            onRemovedButtonClick={handleRemovedButtonClick}
            onFileChange={handleFileChange}
            fileState={fileState}
            errors={state.errors}
          />
        )
      }
      isButtonDisabled={isButtonDisabled()}
      onSubmit={handleSubmit}
      buttonText='수정'
    />
  );
};

const UpdateProfileFormPage: React.FC = () => {
  const emptyData = {
    nickname: '',
    campusId: 0,
    campusName: '',
    courseId: 0,
    courseName: '',
    isCourseChanging: false
  };
  const data = useLoaderData() as UpdateProfileFormProps;

  return data.userType === USER_TYPE.STUDENT ? (
    <StudentUpdateProfilePage {...{ ...emptyData, ...data }} />
  ) : (
    <ManagerUpdateProfilePage profileImage={data.profileImage} />
  );
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
  // todo: 접근 권한이 없는 역할이 접근했을 재 user/info로 setUser하기
  const { role } = params;
  const userType = role === USER_TYPE.STUDENT ? USER_TYPE.STUDENT : USER_TYPE.MANAGER;
  try {
    const data = await getUpdateProfileForm(userType);
    return { ...data, userType };
  } catch (error) {
    throw error;
  }
};

export default UpdateProfileFormPage;
