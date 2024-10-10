export enum RestaurantError {
  ERROR_NAME_REQUIRED = '음식점명을 입력해주세요',
  ERROR_NAME_INVALID = '음식점명은 1자 이상 20자 이하로 입력 가능합니다.',
  ERROR_CATEGORY_REQUIRED = '카테고리를 입력해주세요.',
  ERROR_CATEGORY_INVALID = '카테고리는 1자 이상 20자 이하로 입력 가능합니다.',
  ERROR_ADDRESS_REQUIRED = '주소를 입력해주세요.',
  ERROR_ADDRESS_INVALID = '주소는 1자 이상 150자 이하로 입력 가능합니다.',
  ERROR_TYPE_REQUIRED = '유형을 선택해주세요.'
}
export enum CampusError {
  ERROR_NAME_REQUIRED = '캠퍼스명을 입력해주세요',
  ERROR_NAME_INVALID = '음식점명은 1자 이상 20자 이하로 입력 가능합니다.',
  ERROR_ADDRESS_REQUIRED = '주소를 입력해주세요.',
  ERROR_ADDRESS_INVALID = '주소는 1자 이상 150자 이하로 입력 가능합니다.'
}

export enum CourseError {
  ERROR_NAME_REQUIRED = '과정명을 입력해주세요',
  ERROR_NAME_INVALID = '과정명은 1자 이상 50자 이하로 입력 가능합니다',

  ERROR_CLASS_NUMBER_REQUIRED = '클래스 번호를 입력해주세요',
  ERROR_CLASS_NUMBER_INVALID = '클래스 번호는 1 이상의 정수여야 합니다',

  ERROR_INSTRUCTOR_NAME_REQUIRED = '강사명을 입력해주세요',
  ERROR_INSTRUCTOR_NAME_PATTERN = '강사명은 한글만 입력 가능합니다',
  ERROR_INSTRUCTOR_NAME_INVALID = '강사명은 1자 이상 5자 이하로 입력 가능합니다',

  ERROR_START_DATE_REQUIRED = '개강 날짜를 입력해주세요',
  ERROR_START_DATE_INVALID = '올바른 개강 날짜 형식이 아닙니다',

  ERROR_END_DATE_REQUIRED = '종강 날짜를 입력해주세요',
  ERROR_END_DATE_INVALID = '올바른 종강 날짜 형식이 아닙니다'
}

export enum NoticeError {
  ERROR_TITLE_REQUIRED = 'REQUIRED_TITLE',
  ERROR_TITLE_INVALID = 'INVALID_TITLE_SIZE',
  ERROR_CONTENT_REQUIRED = 'REQUIRED_CONTENT',
  ERROR_CONTENT_INVALID = 'INVALID_CONTENT_SIZE'
}
