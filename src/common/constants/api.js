const RUNNINGMATE_ROOT_API_URL = 'runningmates';

export const MANAGER_USER_LIST_API_URL = 'user/students';
export const MANAGER_CAMPUS_LIST_API_URL = 'campuses';
export const MANAGER_COURSE_LIST_API_URL = 'campuses/courses-extended';
export const MANAGER_CAMPUS_POST_LIST_API_URL = 'posts/campus/manager';
export const MANAGER_ALL_POST_LIST_API_URL = 'posts/all/manager';
export const MANAGER_ALL_NOTICE_LIST_API_URL = 'notices/all/manager';
export const MANAGER_GROUP_NOTICE_LIST_API_URL = 'notices/group/manager';
export const MANAGER_RUNNINGMATE_LIST_API_URL = RUNNINGMATE_ROOT_API_URL;
export const MANAGER_RESTAURANT_LIST_API_URL = 'restaurants';
export const MANAGER_RESTAURANT_REGISTER_API_URL = (type) => `restaurants/${type}`;
export const MANAGER_CAMPUS_REGISTER_API_URL = 'campuses';
export const MANAGER_COURSE_REGISTER_API_URL = 'campuses/courses';
export const MANAGER_NOTICE_REGISTER_API_URL = (type) => `notices/${type}`;
export const MANAGER_RUNNINGMATE_REGISTER_API_URL = MANAGER_RUNNINGMATE_LIST_API_URL;


export const POST_TYPE = {
    CAMPUS: 'campus',
    ALL: 'all'
}
export const NOTICE_TYPE = {
    CAMPUS: 'campus',
    GROUP: 'group',
}
export const FEED_TYPE = {
    POST: 'post',
    NOTICE: 'notice'
}
export const ARCHIVE_TYPE = {
    POST: 'post',
    LIKES: 'likes',
    REPLY: 'reply',
}
export const USER_TYPE = {
    STUDENT: 'student',
    MANAGER: 'manager'
}

export const FEED_ROOT_API_URL = (feedType, category) => `${feedType}s/${(feedType === FEED_TYPE.NOTICE && category === NOTICE_TYPE.CAMPUS) ? 'all' : category}`;
export const IMAGE_UPLOAD_API_URL = `${process.env.REACT_APP_API_BASE_URL}view`;
export const ACCOUNTS_EMAIL_CHECK_API_URL = 'accounts/signup/check-email'
export const CAMPUS_LIST_API_URL = MANAGER_CAMPUS_LIST_API_URL;
export const COURSE_LIST_API_URL = (campusId) => `campuses/${campusId}/courses`;
export const SIGNUP_API_URL = 'accounts';
export const DELETE_ACCOUNT_API_URL = SIGNUP_API_URL;
export const CHECK_EMAIL_AND_SEND_CODE_API_URL = 'accounts/find-password';
export const VERIFY_CODE_API_URL = 'accounts/find-password/verify-code';
export const VERIFY_PASSWORD_RESET_PAGE_UUID_API_URL = 'accounts/reset-password/verify-uuid';
export const RESET_PASSWORD_API_URL = 'accounts/reset-password';

export const USER_PROFILE_API_URL = (useId) => `user/${useId}/profiles`;
export const USER_PROFILE_FORM_API_URL = (userType) => `user/${userType}/profiles`;
export const USER_ID_API_URL = 'user/id';
export const USER_INFO_API_URL = 'user/info';
export const USER_COURSEINFO_API_URL = 'user/course';
export const UPDATE_PASSWORD_API_URL = 'user/update-password';
export const ACCOUNT_INFO_API_URL = 'user/account-info';
export const COURSE_CHANGE_REQUEST_API_URL = (campusId, courseId) => `user/campus/${campusId}/course/${courseId}`;
export const USER_POSTS_API_URL = (useId) => `user/${useId}/posts`;
export const USER_LIKE_POSTS_API_URL = 'user/likes';
export const USER_REPLY_POSTS_API_URL = 'user/replies';

export const NICKNAME_CHECK_API_URL = 'user/check-nickname';

export const FOLLOW_ROOT_API_URL = (userId) => `user/${userId}/follow`;
export const FOLLOW_LIST_API_URL = (userId) => `user/${userId}/follows`;
export const FOLLOWING_LIST_API_URL = (userId) => `user/${userId}/followers`;

export const IMAGE_API_URL = profileImage => `${process.env.REACT_APP_API_BASE_URL}view/${profileImage}`;
export const DEFAULT_PROFILE_IMAGE = 'default-profile.png';

export const RESTAURANT_LIST_API_URL = (restaurantType) => `restaurants/${restaurantType}`;
export const RESTAURANT_DETAIL_API_URL = (restaurantType, id) => `${RESTAURANT_LIST_API_URL(restaurantType)}/${id}`;
export const MENU_LIST_API_URL = (restaurantType, id) => `${RESTAURANT_LIST_API_URL(restaurantType)}/${id}/menu`;

export const MEMBER_ROOT_API_URL = 'members';
export const MEMBER_LIST_API_URL = (groupType, groupId) => `${MEMBER_ROOT_API_URL}/${groupType}/${groupId}`

export const RUNNINGMATE_DETAIL_API_URL = `${RUNNINGMATE_ROOT_API_URL}/detail`

export const CHAT_ROOM_MESSAGES = (courseId) => `chat/course/${courseId}/messages`;