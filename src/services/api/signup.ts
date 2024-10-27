import axios, { AxiosError } from 'axios';
import { ACCOUNTS_EMAIL_CHECK_API_URL, CAMPUS_LIST_API_URL, COURSE_LIST_API_URL, SIGNUP_API_URL } from '@/constants';
import { EmailCheckRequest, CampusResponse, CourseResponse, SignupRequest, ApiError } from '@/types';

export async function checkEmailExists(email: string): Promise<boolean> {
  try {
    await axios.post<void>(ACCOUNTS_EMAIL_CHECK_API_URL, { email } as EmailCheckRequest);
    return false; // 이메일이 존재하지 않음
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 400) {
        return true; // 이메일이 이미 존재함
      }
    }
    console.error('이메일 검사 중 오류 발생:', error);
    throw error;
  }
}

export const getCampuses = async (): Promise<CampusResponse[]> => {
  try {
    const response = await axios.get<CampusResponse[]>(CAMPUS_LIST_API_URL);
    return response.data;
  } catch (error) {
    console.error('캠퍼스 로딩 중 오류 발생:', error);
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 404) {
        throw new Error('캠퍼스 정보를 찾을 수 없습니다.');
      }
    }
    throw new Error('캠퍼스 정보를 가져오는 데 실패했습니다.');
  }
};

export const getCourses = async (campusId: number): Promise<CourseResponse[]> => {
  try {
    const response = await axios.get<CourseResponse[]>(COURSE_LIST_API_URL(campusId));
    return response.data;
  } catch (error) {
    console.error('코스 로딩 중 오류 발생:', error);
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 404) {
        throw new Error('해당 캠퍼스의 코스 정보를 찾을 수 없습니다.');
      }
    }
    throw new Error('코스 정보를 가져오는 데 실패했습습니다.');
  }
};

export const signup = async (signupData: SignupRequest): Promise<void> => {
  try {
    const response = await axios.post<void>(SIGNUP_API_URL, signupData);

    if (response.status === 200) {
      console.log('회원가입 성공');
      return;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ApiError>;
      if (axiosError.response) {
        const { code, message } = axiosError.response.data;
        console.error(`회원가입 실패: ${code} - ${message}`);
        throw new Error(message);
      }
    }
    console.error('회원가입 중 오류 발생:', error);
    throw new Error('회원가입 처리 중 오류가 발생했습니다.');
  }
};
