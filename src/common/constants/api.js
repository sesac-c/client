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