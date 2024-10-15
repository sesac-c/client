import axios from "axios";
import { CHECK_EMAIL_AND_SEND_CODE_API_URL, VERIFY_CODE_API_URL, VERIFY_PASSWORD_RESET_PAGE_UUID_API_URL, RESET_PASSWORD_API_URL } from "@/common/constants";
import { RouteBaseError } from "@/common/types";
import { setUpAxios } from "../axios/setupAuth";

export const checkEmailAndSendCode = async (email) => {
    console.log(email)
    try {
        const response = await axios.post(CHECK_EMAIL_AND_SEND_CODE_API_URL, {
            email: email
        });

        const data = response.data;

        console.log(data)

        if (data.success) {
            // 이메일 확인 성공, 인증 코드 반환
            return {
                success: true,
                message: data.message
            };
        } else {
            // 이메일 확인 실패
            return {
                success: false,
                message: data.message
            };
        }
    } catch (error) {
        return {
            success: false,
            message: '서버 오류가 발생했습니다. 나중에 다시 시도해주세요.'
        };
    }
}

export const verifyCode = async (email, verificationCode) => {
    try {
        const response = await axios.post(VERIFY_CODE_API_URL, {
            email: email,
            code: verificationCode
        });

        const data = response.data;

        if (data.success) {
            // 인증 코드 확인 성공, UUID 반환
            return {
                success: true,
                message: data.message,
                uuid: data.data.uuid
            };
        } else {
            // 인증 코드 확인 실패
            return {
                success: false,
                message: data.message,
                uuid: null
            };
        }
    } catch (error) {
        return {
            success: false,
            message: '서버 오류가 발생했습니다. 나중에 다시 시도해주세요.',
            code: null
        };
    }
};

export const verifyPasswordResetUuid = async (uuid) => {
    setUpAxios();
    try {
        const response = await axios.post(VERIFY_PASSWORD_RESET_PAGE_UUID_API_URL,
            { uuid });

        const { message, success } = response.data;

        if (success) {
            return { uuid };
        } else {
            throw new RouteBaseError(404, '페이지가 존재하지 않습니다.');
        }
    } catch (error) {
        const status = error.errorState || error.response?.status || 500;
        const message = error.data.message || error.response?.data?.message || '비밀번호 재설정 링크 확인 중 오류가 발생했습니다. 다시 시도해 주세요.';
        throw new RouteBaseError(status, message);;
    }
};


export const resetPassword = async (data) => {
    try {
        const response = await axios.patch(RESET_PASSWORD_API_URL, data);

        if (response.status === 200) {
            return;
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                const { code, message } = error.response.data;
                throw new RouteBaseError(code, message);
            }
        }
        console.error('회원가입 중 오류 발생:', error);
        throw new RouteBaseError(500, '회원가입 처리 중 오류가 발생했습니다.');
    }
};
