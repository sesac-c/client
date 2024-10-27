import { useState, useRef, useCallback, useEffect } from 'react';
import { uploadImage, updateProfile, removeImage } from '@/services/api';
import { USER_TYPE, DEFAULT_PROFILE_IMAGE } from '@/constants';
import useAuthStore from '@/stores/authStore';

export const useManagerUpdateProfile = (initialProfileImage: string) => {
  const { setProfileImage: setUseAuthProfileImage } = useAuthStore();
  const [profileImage, setProfileImage] = useState(initialProfileImage);
  const [removed, setRemoved] = useState(false);
  const [isChange, setIsChange] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<{ isError: boolean; message: string }>({ isError: false, message: '' });
  const [fileState, setFileState] = useState<File | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const handleRemovedButtonClick = useCallback(() => {
    setRemoved(true);
    setProfileImage('');
    setFileState(null);
    setIsChange(true);
  }, []);

  const handleChange = useCallback((field: string, value: string) => {
    setProfileImage(value);
    setIsChange(true);
  }, []);

  const onFileChange = useCallback((file: File | null) => {
    setFileState(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
    setIsChange(true);
  }, []);

  const handleImageUpload = async (file: File) => {
    try {
      const response = await uploadImage(file);
      const { data } = response;
      if (!data || !data.length) return;

      const [image] = data;
      return `${image.uuid}_${image.fileName}`;
    } catch (error) {
      console.error('Image upload failed:', error);
      throw error;
    }
  };

  const updateProfileImage = async (): Promise<string> => {
    if (fileState) {
      return (await handleImageUpload(fileState)) || '';
    }
    return profileImage;
  };

  const handleProfileUpdate = async (updateProfileData: { profileImage: string; removed: boolean }) => {
    await updateProfile(USER_TYPE.MANAGER, updateProfileData);
    setUseAuthProfileImage(updateProfileData.profileImage);

    if (updateProfileData.removed && !fileState) {
      await removeImage(initialProfileImage);
      setUseAuthProfileImage(DEFAULT_PROFILE_IMAGE);
    }
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);

      const updatedProfileImage = await updateProfileImage();

      const updateProfileData = {
        profileImage: updatedProfileImage,
        removed: removed && !fileState
      };

      await handleProfileUpdate(updateProfileData);

      timerRef.current = setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    } catch (error: any) {
      if (fileState) {
        await removeImage(profileImage);
      }
      const message = error?.data?.message || '오류가 발생했습니다. 잠시 뒤 시도해주세요.';
      setError({ isError: true, message });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    profileImage,
    removed,
    isChange,
    isLoading,
    error,
    fileState,
    handleRemovedButtonClick,
    handleChange,
    onFileChange,
    handleSubmit,
    setError
  };
};
