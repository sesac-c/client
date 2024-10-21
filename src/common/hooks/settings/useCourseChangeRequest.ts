import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useRef, useState } from 'react';
import { CourseChangeRequestForm, CourseChangeRequestState, UseCourseChangeRequestReturn } from '@/common/types';
import { isNumber } from '@/common/utils';
import { courseChangeRequest } from '@/common/services/api';
import { USER_SETTING_CHILDREN_PATH, USER_SETTING_PATH } from '@/common/constants';

export const useCourseChangeRequest = (): UseCourseChangeRequestReturn => {
  const initialState = {
    campusId: undefined,
    courseId: undefined,
    campusName: '',
    courseName: '',
    success: false,
    error: {
      isError: false,
      message: ''
    },
    fieldErrors: {
      campus: { isError: false, message: '' },
      course: { isError: false, message: '' }
    },
    isLoading: false
  };
  const [state, setState] = useState<CourseChangeRequestState>(initialState);
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
    const { campusId, courseId } = state;
    return !(campusId && courseId);
  }, [state.campusId, state.courseId]);

  const handleChange = useCallback((field: keyof CourseChangeRequestForm, id: string, name: string) => {
    const label = field === 'campusId' ? 'campusName' : 'courseName';
    setState(prevState => ({
      ...prevState,
      [field]: id,
      [label]: name
    }));
  }, []);

  const handleError = (field: keyof CourseChangeRequestForm, message: string) => {
    const errorName = field === 'campusId' ? 'campus' : 'course';

    setState(prevState => ({
      ...prevState,
      fieldErrors: {
        ...state.fieldErrors,
        [errorName]: {
          isError: true,
          message
        }
      }
    }));
  };

  const handleCloseErrorModal = () => {
    setState(prevState => ({ ...prevState, error: { isError: false, message: '' } }));
  };
  const handleCloseSuccessModal = () => {
    setState({ ...initialState });
    navigate(`${USER_SETTING_PATH}/${USER_SETTING_CHILDREN_PATH.profile}`);
  };

  const validate = (field: keyof CourseChangeRequestForm) => {
    let isValidate = true;
    try {
      if (state[field] === undefined) {
        isValidate = false;
        handleError(field, '필수 선택입니다.');
      }
      isNumber(state[field]);
    } catch {
      isValidate = false;
      handleError(field, '잘못된 선택 값입니다.');
    }
    return isValidate;
  };

  const handleSubmit = useCallback(async () => {
    if (!validate('campusId') || !validate('courseId')) return;

    setState(prevState => ({ ...prevState, isLoading: true }));
    try {
      await courseChangeRequest(state.campusId || '', state.courseId || '');
      timerRef.current = setTimeout(() => {
        setState(prevState => ({ ...prevState, isLoading: false, success: true }));
      }, 1000);
    } catch (error: any) {
      const message = error?.data?.message || '오류가 발생했습니다. 잠시 뒤 시도해주세요.';
      setState({ ...initialState, error: { isError: true, message } });
    }
  }, [state.campusId, state.campusName, state.courseId, state.courseName, navigate]);

  return { state, handleChange, handleSubmit, isButtonDisabled, handleCloseErrorModal, handleCloseSuccessModal };
};
