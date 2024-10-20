import React, { useRef, useState } from 'react';
import SettingsContentLayout from '@/common/components/settings/layout/SettingsContent';
import { ManagerEditProfileForm, StudentEditProfileForm } from '@/common/components/settings/profile/EditProfileForm';
import { getUpdateProfileForm, updateProfile, uploadImage } from '@/common/services/api';
import { LoaderFunctionArgs, Navigate, useLoaderData } from 'react-router-dom';
import { USER_SETTING_CHILDREN_PATH, USER_SETTING_PATH, USER_TYPE } from '@/common/constants';
import { EditProfileFormProps, ManagerProfileFormResponse, StudentProfileFormResponse } from '@/common/types';
import useAuthStore from '@/common/stores/authStore';
import { useUpdateProfile } from '@/common/hooks/settings/useUpdateProfile';
import LoadingStatus from '@/common/components/settings/LoadingStatus';
import ProcessErrorModal from '@/common/components/common/feedback/ProcessErrorModal';

export const RedirectEditProfilePage: React.FC = () => {
  const { role } = useAuthStore().user;
  return <Navigate to={`${USER_SETTING_PATH}/${USER_SETTING_CHILDREN_PATH.profile}/${role.toLowerCase()}`} replace />;
};

const ManagerEditProfilePage: React.FC<ManagerProfileFormResponse> = ({ profileImage: initialProfileImage }) => {
  const [profileImage, setProfileImage] = useState(initialProfileImage);
  const [removed, setRemoved] = useState(false);
  const [isChange, setIsChange] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<{ isError: boolean; message: string }>({ isError: false, message: '' });
  const [fileState, setFileState] = useState<File | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleRemovedButtonClick = () => {
    setRemoved(true);
    setProfileImage('');
    setFileState(null);
    if (!isChange) {
      setIsChange(true);
    }
  };

  const handleChange = (field: string, value: string) => {
    setProfileImage(value);
    if (!isChange) {
      setIsChange(true);
    }
  };

  const onFileChange = (file: File | null) => {
    setFileState(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
    if (!isChange) {
      setIsChange(true);
    }
  };

  const handleImageUpload = async (file: File) => {
    try {
      const response = await uploadImage(file);
      const { data } = response;
      if (!data || !data.length) return;

      const [image] = data;
      setProfileImage(`${image.uuid}_${image.fileName}`);
    } catch (error) {
      console.error('Image upload failed:', error);
    }
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);

      let profileImageUrl = profileImage;

      if (fileState) {
        await handleImageUpload(fileState);
      }

      const updateProfileData = {
        profileImage: profileImageUrl,
        removed: removed
      };

      await updateProfile(USER_TYPE.MANAGER, updateProfileData);

      timerRef.current = setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    } catch (error: any) {
      const message = error?.data?.message || '오류가 발생했습니다. 잠시 뒤 시도해주세요.';
      setError({ isError: true, message });
    } finally {
      setIsLoading(false);
    }
  };

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
          <ManagerEditProfileForm
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

const StudentEditProfilePage: React.FC<StudentProfileFormResponse> = ({
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
  } = useUpdateProfile({
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
          <StudentEditProfileForm
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

const EditProfileFormPage: React.FC = () => {
  const emptyData = {
    nickname: '',
    campusId: 0,
    campusName: '',
    courseId: 0,
    courseName: '',
    isCourseChanging: false
  };
  const data = useLoaderData() as EditProfileFormProps;

  return data.userType === USER_TYPE.STUDENT ? (
    <StudentEditProfilePage {...{ ...emptyData, ...data }} />
  ) : (
    <ManagerEditProfilePage profileImage={data.profileImage} />
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

export default EditProfileFormPage;
