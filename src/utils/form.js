import { checkEmailExists } from "@/services/api";
import {
    NAME_REGEX, EMAIL_REGEX, PASSWORD_REGEX, NUMBER_REGEX, BIRTHDATE_REGEX,
    ERROR_NAME_REQUIRED, ERROR_NAME_INVALID, ERROR_NAME_LENGTH, ERROR_BIRTHDATE_REQUIRED,
    ERROR_GENDER_REQUIRED, ERROR_NUMBER_ONLY, ERROR_BIRTHDATE_FORMAT, ERROR_BIRTHDATE_MONTH,
    ERROR_BIRTHDATE_DAY, ERROR_EMAIL_REQUIRED, ERROR_EMAIL_INVALID, ERROR_EMAIL_EXISTS,
    ERROR_PASSWORD_REQUIRED, ERROR_PASSWORD_LENGTH, ERROR_PASSWORD_INVALID,
    ERROR_CONFIRM_PASSWORD_REQUIRED, ERROR_PASSWORD_MISMATCH, ERROR_CAMPUS_REQUIRED,
    ERROR_COURSE_REQUIRED, ERROR_VERIFICATION_CODE_REQUIRED,
    NAME_NAME,
    BIRTHDATE_NAME,
    GENDER_NAME,
    EMAIL_NAME,
    PASSWORD_NAME,
    CONFIRMPASSWORD_NAME,
    CAMPUS_NAME,
    COURSE_NAME,
    CODE_NAME,
    USERNAME_NAME,
    REPLY_NAME,
    TITLE_NAME,
    CONTENT_NAME,
    NICKNAME_NAME,
    NicknameError,
    NICKNAME_VALID_PATTERN_REGEX
} from '@/constants';

// Form Validations

const validateStringField = (value, minLength, maxLength) => {
    return value.trim().length >= minLength && value.trim().length <= maxLength;
};

const isEmptyField = (value) => {
    return value.trim().length === 0;
};

export const isNumber = (number) => {
    const parsedNumber = Number(number);

    if (isNaN(parsedNumber) || parsedNumber <= 0) {
        throw false;
    }

    return true;
};

export const validateName = (name) => {
    if (isEmptyField(name)) return ERROR_NAME_REQUIRED;
    if (!NAME_REGEX.test(name)) return ERROR_NAME_INVALID;
    if (!validateStringField(name, 2, 5)) return ERROR_NAME_LENGTH;
    return '';
};

function isLeapYear(year) {
    year += 1900;
    if (year % 4 === 0) {
        if (year % 100 === 0) {
            if (year % 400 === 0) {
                return true;
            } else {
                return false;
            }
        } else {
            return true;
        }
    } else {
        return false;
    }
}

export const validateBirthdate = (birthdate, gender) => {
    if (isEmptyField(birthdate)) return ERROR_BIRTHDATE_REQUIRED;
    if (isEmptyField(gender)) return ERROR_GENDER_REQUIRED;
    if (!NUMBER_REGEX.test(birthdate) || !NUMBER_REGEX.test(gender)) return ERROR_NUMBER_ONLY;
    if (!BIRTHDATE_REGEX.test(birthdate)) return ERROR_BIRTHDATE_FORMAT;

    const year = parseInt(birthdate.substring(0, 2), 10);
    const month = parseInt(birthdate.substring(2, 4), 10);
    const day = parseInt(birthdate.substring(4, 6), 10);

    if (month < 1 || month > 12) return ERROR_BIRTHDATE_MONTH;

    const daysInMonth = [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (day < 1 || day > daysInMonth[month - 1]) return ERROR_BIRTHDATE_DAY(daysInMonth[month - 1]);

    return '';
};

export const validateEmail = async (email) => {
    if (isEmptyField(email)) return ERROR_EMAIL_REQUIRED;
    if (!EMAIL_REGEX.test(email)) return ERROR_EMAIL_INVALID;

    const emailExists = await checkEmailExists(email);
    if (emailExists) return ERROR_EMAIL_EXISTS;

    return '';
};

export const validatePassword = (password) => {
    if (isEmptyField(password)) return ERROR_PASSWORD_REQUIRED;
    if (!validateStringField(password, 8, 20)) return ERROR_PASSWORD_LENGTH;
    if (!PASSWORD_REGEX.test(password)) return ERROR_PASSWORD_INVALID;
    return '';
};

export const validateConfirmPassword = (password, confirmPassword) => {
    if (isEmptyField(confirmPassword)) return ERROR_CONFIRM_PASSWORD_REQUIRED;
    if (password !== confirmPassword) return ERROR_PASSWORD_MISMATCH;
    return '';
};

export const validateCampus = (campus) => {
    return !isEmptyField(campus) ? '' : ERROR_CAMPUS_REQUIRED;
};

export const validateCourse = (course) => {
    return !isEmptyField(course) ? '' : ERROR_COURSE_REQUIRED;
};

export const validateFindPasswordForm = (formData, step) => {
    const errors = {};

    if (step === 'EMAIL') {
        if (isEmptyField(formData.email)) {
            errors.email = ERROR_EMAIL_REQUIRED;
        }
    } else if (step === 'CODE') {
        if (isEmptyField(formData.verificationCode)) {
            errors.verificationCode = ERROR_VERIFICATION_CODE_REQUIRED;
        }
    }

    return errors;
};

export const validateSignupForm = async (formData, currentStep) => {
    let errors = {};

    if (currentStep === 'FIRST') {
        const nameError = validateName(formData.name);
        if (nameError) errors.name = nameError;

        const birthdateError = validateBirthdate(formData.birthdate, formData.gender);
        if (birthdateError) {
            errors.birthdate = birthdateError;
            errors.gender = '　';
        }

        const emailError = await validateEmail(formData.email);
        if (emailError) errors.email = emailError;

        const passwordError = validatePassword(formData.password);
        if (passwordError) errors.password = passwordError;

        const confirmPasswordError = validateConfirmPassword(formData.password, formData.confirmPassword);
        if (confirmPasswordError) errors.confirmPassword = confirmPasswordError;
    }

    if (currentStep === 'SECOND') {
        const campusError = validateCampus(formData.campus);
        if (campusError) errors.campus = campusError;

        const courseError = validateCourse(formData.course);
        if (courseError) errors.course = courseError;
    }

    return errors;
};


export const validateNickname = (nickname) => {
    if (isEmptyField(nickname)) return NicknameError.REQUIRED;
    if (!validateStringField(nickname, 2, 10)) return NicknameError.INVALID_LENGTH;
    if (!NICKNAME_VALID_PATTERN_REGEX.test(nickname)) return NicknameError.INVALID_PATTERN
    try {
        isNumber(nickname)
        return NicknameError.INVALID_COMBINATION;
    } catch {
    }

    return '';
};

export const DEFAULT_TEXTFIELD_SETTING = {
    color: 'success',
    margin: 'dense',
    fullWidth: true
};

const filedSet = (name, label, placeholder, required) => {
    return {
        ...(name && { name }),
        ...(label && { label }),
        ...(placeholder && { placeholder }),
        ...(required !== undefined && { required })
    };
}


// Form FieldSettings
/**
 * 회원가입 필드
 *      1. 이름
 *      2. 생년월일
 *      3. 성별
 *      4. 이메일
 *      5. 비밀번호
 *      6. 비밀번호 확인
 *      7. 캠퍼스
 *      8. 강의
 */

export const NAME_FIELD_SETTING = filedSet(NAME_NAME, '이름', '한글로 구성된 1~5자 이름 입력', true);
export const NICKNAME_FIELD_SETTING = filedSet(NICKNAME_NAME, '닉네임', '한글, 또는 한글과 숫자로 구성된 1~10자 입력', true);
export const BIRTHDATE_FIELD_SETTING = { ...filedSet(BIRTHDATE_NAME, '주민번호 7자리', 'yyyymmdd', true), fullWidth: false };
export const GENDER_FIELD_SETTING = { ...filedSet(GENDER_NAME, '', '', true), fullWidth: false };
export const EMAIL_FIELD_SETTING = { ...filedSet(EMAIL_NAME, '이메일', 'example@example.com', true), type: 'email' };
export const PASSWORD_FIELD_SETTING = filedSet(PASSWORD_NAME, '비밀번호 *', '영어, 숫자, 특수문자를 포함, 8자~20자 입력', true);
export const CONFIRMPASSWORD_FIELD_SETTING = filedSet(CONFIRMPASSWORD_NAME, '비밀번호 확인 *', '비밀번호 재입력', true);
export const CAMPUS_FIELD_SETTING = { ...filedSet(CAMPUS_NAME, '캠퍼스 선택', null, true), select: true, defaultValue: '' };
export const COURSE_FIELD_SETTING = { ...filedSet(COURSE_NAME, '강의 선택', null, true), select: true, defaultValue: '' };


/**
 * 비밀번호 찾기 필드
 *      1. 이메일
 *      2. 인증번호
 */
export const CODE_FIELD_SETTING = filedSet(CODE_NAME, null, null, true);

/**
 * 로그인 필드
 *      1. 아이디(이메일)
 *      2. 비밀번호
 */
export const USERNAME_FIELD_SETTING = filedSet(USERNAME_NAME, '아이디', null, undefined);
export const PASSWORD_LOGIN_FIELD_SETTING = { ...filedSet(PASSWORD_NAME, '비밀번호', null, undefined), type: 'password' };


// 댓글 입력 필드
export const REPLY_FIELD_SETTING = {
    ...filedSet(REPLY_NAME, null, '댓글...', undefined), autoComplete: 'off', size: 'small', fullWidth: true, sx: {
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                border: 'none'
            }
        }
    }
};

// 글쓰기 입력 필드
const writePostDefaultSetting = {
    type: 'text',
    color: 'success',
    required: true,
    size: 'small'
}
export const TITLE_FIELD_SETTING = {
    ...writePostDefaultSetting,
    id: TITLE_NAME,
    name: TITLE_NAME
}
export const CONTENT_FIELD_SETTING = {
    ...writePostDefaultSetting,
    id: CONTENT_NAME,
    name: CONTENT_NAME,
    multiline: true,
    sx: {
        '& .MuiOutlinedInput-root': {
            height: '210px',
            '& textarea': {
                resize: 'none',
                lineHeight: '1.5',
                fontSize: '0.875rem'
            }
        },
        '& .MuiOutlinedInput-notchedOutline': {
            borderRadius: '0.375rem'
        }
    }
}