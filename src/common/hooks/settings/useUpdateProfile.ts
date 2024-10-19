import { useNavigate } from 'react-router-dom';
import { NicknameError, USER_SETTING_CHILDREN_PATH, USER_SETTING_PATH, USER_TYPE } from '@/common/constants';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  UpdateProfileForm,
  UpdateProfileRequest,
  UpdateProfileState,
  UseUpdateProfileStateReturn
} from '@/common/types';
import { validateNickname } from '@/common/utils';
import { checkNickname, updateProfile, uploadImage, removeImage } from '@/common/services/api';

type InitialValue = {
  nickname: string;
  profileImage: string;
};

export const useUpdateProfile = (initialValue: InitialValue): UseUpdateProfileStateReturn => {
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

  const handleSubmit = useCallback(async () => {
    let profileImage = state.profileImage;
    try {
      let isNickNameExist;
      if (state.nickname && initialValue.nickname !== state.nickname) {
        isNickNameExist = await checkNickname(state.nickname);
      }
      console.log('isNickNameExist1: ', isNickNameExist);
      if (isNickNameExist) {
        setState(prevState => ({ ...prevState, errors: { ...state.errors, nickname: NicknameError.DUPLICATE } }));
        return;
      }
      const nicknameError = validateNickname(state.nickname);
      if (nicknameError) {
        setState(prevState => ({ ...prevState, errors: { ...state.errors, nickname: nicknameError } }));
        return;
      }
      setState(prevState => ({ ...prevState, isLoading: true }));

      if (fileState) {
        profileImage = (await handleImageUpload(fileState)) || '';
      }

      const updateProfileData: UpdateProfileRequest = {
        nickname: state.nickname,
        profileImage,
        removed: state.removed && !fileState
      };

      await updateProfile(USER_TYPE.STUDENT, updateProfileData);

      setState(prevState => ({
        ...prevState,
        isLoading: true
      }));

      timerRef.current = setTimeout(() => {
        setState(prevState => ({
          ...prevState,
          isLoading: false
        }));
      }, 1000);
    } catch (error: any) {
      if (fileState) {
        await removeImage(profileImage);
      }
      const message = error?.data?.message || '오류가 발생했습니다. 잠시 뒤 시도해주세요.';
      setState(prevState => ({
        ...prevState,
        ...initialValue,
        updateError: true,
        updateErrorMessage: message
      }));
    }
  }, [state.nickname, fileState, state.removed, state.profileImage, navigate]);

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
