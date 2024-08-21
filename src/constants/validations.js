// post write
export const MAX_TITLE_LENGTH = 20;
export const MAX_CONTENT_LENGTH = 500;
export const MAX_HASHTAGS = 4;
export const MAX_HASHTAG_LENGTH = 10;

// findpassword
export const COUNTDOWN_TIME = 180;

// Validation Regex Patterns
export const NAME_REGEX = /^[가-힣]+$/;
export const EMAIL_REGEX = /\S+@\S+\.\S+/;
export const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
export const NUMBER_REGEX = /^\d+$/;
export const BIRTHDATE_REGEX = /^\d{6}$/;

// Error Messages
export const ERROR_NAME_REQUIRED = '이름을 입력해 주세요';
export const ERROR_NAME_INVALID = '한글만 입력 가능합니다';
export const ERROR_NAME_LENGTH = '이름은 1자 이상 5자 이하여야 합니다';

export const ERROR_BIRTHDATE_REQUIRED = '생년월일을 입력해 주세요';
export const ERROR_GENDER_REQUIRED = '주민등록번호 앞 1자리를 입력해 주세요';
export const ERROR_NUMBER_ONLY = '숫자를 입력해주세요';
export const ERROR_BIRTHDATE_FORMAT = 'yymmdd형식으로 입력해 주세요';
export const ERROR_BIRTHDATE_MONTH = '유효한 월을 입력해주세요 (01 ~ 12)';
export const ERROR_BIRTHDATE_DAY = (maxDay) => `유효한 일을 입력해주세요 (01 ~ ${maxDay})`;

export const ERROR_EMAIL_REQUIRED = '이메일을 입력해 주세요';
export const ERROR_EMAIL_INVALID = '유효한 이메일을 입력해 주세요';
export const ERROR_EMAIL_EXISTS = '이미 존재하는 이메일입니다';

export const ERROR_PASSWORD_REQUIRED = '비밀번호를 입력해 주세요';
export const ERROR_PASSWORD_LENGTH = '비밀번호는 8자 이상 20자 이하여야 합니다';
export const ERROR_PASSWORD_INVALID = '비밀번호는 영어, 숫자, 특수문자의 조합이어야 합니다';
export const ERROR_CONFIRM_PASSWORD_REQUIRED = '비밀번호 확인을 입력해 주세요';
export const ERROR_PASSWORD_MISMATCH = '비밀번호가 일치하지 않습니다';

export const ERROR_CAMPUS_REQUIRED = '캠퍼스를 선택해 주세요';
export const ERROR_COURSE_REQUIRED = '강의를 선택해 주세요';

export const ERROR_VERIFICATION_CODE_REQUIRED = '인증 코드를 입력해주세요.';
