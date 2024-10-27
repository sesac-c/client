import { useNavigate } from 'react-router-dom';
import { DEFAULT_PROFILE_IMAGE, NicknameError, USER_TYPE } from '@/constants';
import { USER_SETTING_CHILDREN_PATH, USER_SETTING_PATH } from '@/routes/paths';
import { useCallback, useEffect, useRef, useState } from 'react';
import { UpdateProfileForm, UpdateProfileRequest, UpdateProfileState, UseUpdateProfileStateReturn } from '@/types';
import { validateNickname } from '@/utils/form';
import { checkNickname, updateProfile, uploadImage, removeImage } from '@/services/api';
import useAuthStore from '@/stores/authStore';

type InitialValue = {
  nickname: string;
  profileImage: string;
};

export const useStudentUpdateProfile = (initialValue: InitialValue): UseUpdateProfileStateReturn => {
  const { setProfileImage } = useAuthStore();
  const resetState = {
    profileImage: '',
    nickname: '',
    removed: false,
    errors: {
      profileImage: '',
      nickname: ''
    },
    isLoading: false,
    updateError: false,
    updateErrorMessage: ''
  };

  const [state, setState] = useState<UpdateProfileState>({ ...resetState, ...initialValue });
  const [isChange, setIsChange] = useState(false);
  const [initialState] = useState(initialValue);
  const [fileState, setFileState] = useState<File | null>(null);

  const updateProfilePath = `${USER_SETTING_PATH}/${USER_SETTING_CHILDREN_PATH.profile}`;
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const isButtonDisabled = useCallback(() => {
    if (!isChange) return true;

    const isNicknameChanged = state.nickname !== initialState.nickname;
    const isProfileImageChanged = fileState !== null || state.removed;

    return !(isNicknameChanged || isProfileImageChanged);
  }, [state.nickname, fileState, state.removed, initialState, isChange]);

  const handleErrorModal = () => {
    navigate(updateProfilePath);
    setState(resetState);
  };

  const handleChange = useCallback((field: keyof UpdateProfileForm, value: string) => {
    setState(prevState => ({
      ...prevState,
      [field]: value
    }));
    setIsChange(true);
  }, []);

  const handleFileChange = useCallback((file: File | null) => {
    setFileState(file);
    setIsChange(true);
  }, []);

  const handleRemovedButtonClick = () => {
    setState(prevState => ({
      ...prevState,
      profileImage: '',
      removed: true
    }));
    setFileState(null);
    setIsChange(true);
  };

  const handleImageUpload = async (file: File) => {
    try {
      const response = await uploadImage(file);
      const { data } = response;
      if (!data || !data.length) return;

      const [image] = data;
      return `${image.uuid}_${image.fileName}`;
    } catch (error) {
      console.error('Image upload failed:', error);
    }
  };

  const validateAndCheckNickname = async (nickname: string): Promise<string | null> => {
    if (nickname && initialValue.nickname !== nickname) {
      const isNickNameExist = await checkNickname(nickname);
      if (isNickNameExist) {
        return NicknameError.DUPLICATE;
      }
    }
    return validateNickname(nickname);
  };

  const updateProfileImage = async (): Promise<string> => {
    if (fileState) {
      return (await handleImageUpload(fileState)) || '';
    }
    return state.profileImage;
  };

  const handleProfileUpdate = async (updateProfileData: UpdateProfileRequest) => {
    await updateProfile(USER_TYPE.STUDENT, updateProfileData);
    setProfileImage(updateProfileData.profileImage);

    if (updateProfileData.removed && !fileState) {
      await removeImage(initialState.profileImage);
      setProfileImage(DEFAULT_PROFILE_IMAGE);
    }
  };

  const handleSubmit = useCallback(async () => {
    try {
      const nicknameError = await validateAndCheckNickname(state.nickname);
      if (nicknameError) {
        setState(prevState => ({ ...prevState, errors: { ...state.errors, nickname: nicknameError } }));
        return;
      }

      setState(prevState => ({ ...prevState, isLoading: true }));

      const profileImage = await updateProfileImage();

      const updateProfileData: UpdateProfileRequest = {
        nickname: state.nickname,
        profileImage,
        removed: state.removed && !fileState
      };

      await handleProfileUpdate(updateProfileData);

      setState(prevState => ({ ...prevState, isLoading: true }));

      timerRef.current = setTimeout(() => {
        setState(prevState => ({ ...prevState, isLoading: false }));
      }, 1000);
    } catch (error: any) {
      if (fileState) {
        await removeImage(state.profileImage);
      }
      const message = error?.data?.message || '오류가 발생했습니다. 잠시 뒤 시도해주세요.';
      setState(prevState => ({
        ...prevState,
        ...initialValue,
        updateError: true,
        updateErrorMessage: message
      }));
    }
  }, [state.nickname, fileState, state.removed, state.profileImage, initialValue]);

  return {
    state,
    handleChange,
    handleFileChange,
    handleRemovedButtonClick,
    handleSubmit,
    handleErrorModal,
    isButtonDisabled,
    fileState
  };
};
