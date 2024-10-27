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
export const NICKNAME_VALID_PATTERN_REGEX = /^[가-힣0-9\s]+$/; // 한글, 숫자, 띄어쓰기 허용


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
export const ERROR_EMAIL_INVALID = '이메일 형식으로 입력해 주세요';
export const ERROR_EMAIL_EXISTS = '이미 존재하는 이메일입니다';

export const ERROR_PASSWORD_REQUIRED = '비밀번호를 입력해 주세요';
export const ERROR_PASSWORD_LENGTH = '비밀번호는 8자 이상 20자 이하여야 합니다';
export const ERROR_PASSWORD_INVALID = '비밀번호는 영어, 숫자, 특수문자의 조합이어야 합니다';
export const ERROR_CONFIRM_PASSWORD_REQUIRED = '비밀번호 확인을 입력해 주세요';
export const ERROR_PASSWORD_MISMATCH = '비밀번호가 일치하지 않습니다';

export const ERROR_CAMPUS_REQUIRED = '캠퍼스를 선택해 주세요';
export const ERROR_COURSE_REQUIRED = '강의를 선택해 주세요';

export const ERROR_VERIFICATION_CODE_REQUIRED = '인증 코드를 입력해주세요.';

export const NicknameError = {
    REQUIRED: '닉네임을 입력해주세요.',
    INVALID_LENGTH: '닉네임은 1 ~ 10자로 입력해주세요',
    INVALID_PATTERN: '한글, 숫자, 띄어쓰기만 사용 가능합니다.',
    INVALID_COMBINATION: '닉네임을 숫자만으로 구성할 수 없습니다.',
    DUPLICATE: '이미 닉네임이 존재합니다.'
}

/** Field Names
 * 회원가입 필드
 *      1. 이름
 *      2. 생년월일
 *      3. 성별
 *      4. 이메일
 *      5. 비밀번호
 *      6. 비밀번호 확인
 *      7. 캠퍼스
 *      8. 강의
 * 
 * 
 * 비밀번호 찾기 필드
 *      1. 이메일
 *      2. 인증번호
 * 
 * 로그인 필드
 *      1. 아이디
 *      2. 비밀번호
 * 
 * 댓글 필드
 * 해시태그 필드
 * 
 * 글쓰기 필드
 *      1. 제목
 *      2. 내용
 */
export const NAME_NAME = 'name'
export const NICKNAME_NAME = 'nickname'
export const BIRTHDATE_NAME = 'birthdate'
export const GENDER_NAME = 'gender'
export const EMAIL_NAME = 'email'
export const PASSWORD_NAME = 'password'
export const CONFIRMPASSWORD_NAME = 'confirmPassword'
export const CAMPUS_NAME = 'campus'
export const COURSE_NAME = 'course'
export const CODE_NAME = 'userVerifyNum';
export const USERNAME_NAME = 'email';
export const REPLY_NAME = 'reply';
export const HASHTAG_NAME = 'hashtag';
export const HASHTAGS_NAME = 'hashtags';
export const TITLE_NAME = 'title';
export const CONTENT_NAME = 'cotent';