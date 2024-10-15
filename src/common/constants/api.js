export const MANAGER_USER_LIST_API_URL = '/user/students';
export const MANAGER_CAMPUS_LIST_API_URL = '/campuses';
export const MANAGER_COURSE_LIST_API_URL = '/campuses/courses-extended';
export const MANAGER_CAMPUS_POST_LIST_API_URL = '/posts/campus/manager';
export const MANAGER_ALL_POST_LIST_API_URL = '/posts/all/manager';
export const MANAGER_ALL_NOTICE_LIST_API_URL = '/notices/all/manager';
export const MANAGER_GROUP_NOTICE_LIST_API_URL = '/notices/group/manager';
export const MANAGER_RUNNINGMATE_LIST_API_URL = '/runningmates';
export const MANAGER_RESTAURANT_LIST_API_URL = '/restaurants';
export const MANAGER_RESTAURANT_REGISTER_API_URL = (type) => `/restaurants/${type}`;
export const MANAGER_CAMPUS_REGISTER_API_URL = '/campuses';
export const MANAGER_COURSE_REGISTER_API_URL = '/campuses/courses';
export const MANAGER_NOTICE_REGISTER_API_URL = (type) => `/notices/${type}`;
export const MANAGER_RUNNINGMATE_REGISTER_API_URL = '/runningmates';

export const POSTS_CAMPUS_API_URL = '/posts/campus';
export const POSTS_ALL_API_URL = '/posts/all';
export const NOTICES_ALL_API_URL = '/notices/all';
export const IMAGE_UPLOAD_API_URL = `${process.env.REACT_APP_API_BASE_URL}view`;
export const ACCOUNTS_EMAIL_CHECK_API_URL = '/accounts/signup/check-email'
export const CAMPUS_LIST_API_URL = MANAGER_CAMPUS_LIST_API_URL;
export const COURSE_LIST_API_URL = (campusId) => `/campuses/${campusId}/courses`;
export const SIGNUP_API_URL = '/accounts';
export const CHECK_EMAIL_AND_SEND_CODE_API_URL = '/accounts/find-password';
export const VERIFY_CODE_API_URL = '/accounts/find-password/verify-code';
export const VERIFY_PASSWORD_RESET_PAGE_UUID_API_URL = 'accounts/reset-password/verify-uuid';
export const RESET_PASSWORD_API_URL = 'accounts/reset-password';

export const USER_PROFILE_API_URL = (useId) => `user/${useId}/profiles`;
export const USER_POSTS_API_URL = (useId) => `user/${useId}/posts`;

