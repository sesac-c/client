export const CAMPUS = 'campus';
export const ALL = 'all';
export const GROUP = 'group';

export const FEED_ARR = [CAMPUS, ALL, GROUP];

const KO_CAMPUS = '캠퍼스';
const KO_ALL = '전체';
const KO_GROUP = '그룹';

export const FEED_SUFFIX = '피드';

export const FEED_SELECT_ITEMS = [
  {
    label: `${KO_CAMPUS} ${FEED_SUFFIX}`,
    value: `/feed/${CAMPUS}/posts`
  },
  {
    label: `${KO_ALL} ${FEED_SUFFIX}`,
    value: `/feed/${ALL}/posts`
  },
  {
    label: `${KO_GROUP} ${FEED_SUFFIX}`,
    value: `/feed/${GROUP}/courses/notices`
  }
];

export const ACCOUNTS_PATH = '/accounts';
export const ACCOUNT_CHILDREN_PATH = {
  login: 'login',
  signup: 'signup',
  findPassword: 'find/password',
  resetPassword: 'reset/password'
};
export const PROFILE_PATH = '/profile';
export const PROFILE_CHILDREN_PATH = {

};

export const USER_SETTING_AND_ARCHIVE_PATH = '/user';
export const USER_SETTING_AND_ARCHIVE_CHILDREN_PATH = {
  settings: 'settings',
  archive: 'archive'
};

export const USER_SETTING_PATH = `/user/${USER_SETTING_AND_ARCHIVE_CHILDREN_PATH.settings}`;
export const USER_SETTING_CHILDREN_PATH = {
  profile: 'profile',
  updatePassword: 'update-password',
  accountInfo: 'account-info',
  accountDeletion: 'account-deletion',
  courseChangeRequest: 'change-course',
};
export const USER_ARCHIVE_PATH = `/user/${USER_SETTING_AND_ARCHIVE_CHILDREN_PATH.archive}`;
export const USER_ARCHIVE_CHILDREN_PATH = {
  likes: 'likes',
  replies: 'replies',
};

export const settings = [
  { name: '프로필 수정', to: `${USER_SETTING_PATH}/${USER_SETTING_CHILDREN_PATH.profile}` },
  { name: '비밀번호 변경', to: `${USER_SETTING_PATH}/${USER_SETTING_CHILDREN_PATH.updatePassword}` },
  { name: '계정 정보', to: `${USER_SETTING_PATH}/${USER_SETTING_CHILDREN_PATH.accountInfo}` }
];

export const archives = [
  { name: '좋아요', to: `${USER_ARCHIVE_PATH}/${USER_ARCHIVE_CHILDREN_PATH.likes}` },
  { name: '내가 쓴 댓글', to: `${USER_ARCHIVE_PATH}/${USER_ARCHIVE_CHILDREN_PATH.replies}` }
];

export const LOGIN_PATH = `${ACCOUNTS_PATH}/${ACCOUNT_CHILDREN_PATH.login}`;
export const SIGNUP_PATH = `${ACCOUNTS_PATH}/${ACCOUNT_CHILDREN_PATH.signup}`;
export const FIND_PASSWORD_PATH = `${ACCOUNTS_PATH}/${ACCOUNT_CHILDREN_PATH.findPassword}`;
export const RESET_PASSWORD_PATH = uuid => `${ACCOUNTS_PATH}/${ACCOUNT_CHILDREN_PATH.resetPassword}/${uuid}`;

export const USER_PATH = '/';
export const MANAGER_PATH = '/manager';

export const CAMPUS_PATH = 'feed/campus';
export const CAMPUS_CHILDREN_PATH = {
  postList: 'posts',
  noticeList: 'notices',
  search: 'search-post'
};

export const CAMPUS_POST_LIST_PATH = `/${CAMPUS_PATH}/${CAMPUS_CHILDREN_PATH.postList}`;
export const CAMPUS_NOTICE_LIST_PATH = `/${CAMPUS_PATH}/${CAMPUS_CHILDREN_PATH.noticeList}`;
export const CAMPUS_SEARCH_PATH = `/${CAMPUS_PATH}/${CAMPUS_CHILDREN_PATH.search}`;

export const CAMPUS_MENU = [
  {
    title: '메인',
    path: CAMPUS_POST_LIST_PATH
  },
  {
    title: '글쓰기'
  },
  {
    title: '공지',
    path: CAMPUS_NOTICE_LIST_PATH
  },
  {
    title: '검색',
    path: CAMPUS_SEARCH_PATH
  }
];

export const ALL_PATH = 'feed/all';

export const ALL_POST_LIST_PATH = `/${ALL_PATH}/${CAMPUS_CHILDREN_PATH.postList}`;
export const ALL_SEARCH_PATH = `/${ALL_PATH}/${CAMPUS_CHILDREN_PATH.search}`;

export const ALL_MENU = [
  {
    title: '메인',
    path: ALL_POST_LIST_PATH
  },
  {
    title: '글쓰기'
  },
  {
    title: '검색',
    path: ALL_SEARCH_PATH
  }
];

export const GROUP_PATH = 'feed/group';
export const GROUP_CHILDREN_PATH = {
  // notices: 'notices',
  // restaurants: 'restaurants'
  courses: 'courses',
  runningmate: 'runningmate'
};
export const RESTAURANT_END_POINT = 'restaurants';
export const COURSES_CHILDREN_PATH = {
  restaurants: RESTAURANT_END_POINT,
  notices: 'notices'
}
export const RUNNINGMATE_CHILDREN_PATH = {
  restaurants: RESTAURANT_END_POINT,
  reports: 'reports'
}

export const GROUP_COURSES_PATH = `/${GROUP_PATH}/${GROUP_CHILDREN_PATH.courses}`;
export const GROUP_RUNNING_MATE_PATH = `/${GROUP_PATH}/${GROUP_CHILDREN_PATH.runningmate}`;

export const GROUP_MENU = [
  {
    title: '우리반',
    path: `${GROUP_COURSES_PATH}/notices`
  },
  {
    title: '러닝메이트',
    path: `${GROUP_RUNNING_MATE_PATH}/reports`
  }
];

export const FEED_INFO = {
  campus: {
    title: KO_CAMPUS,
    name: `${KO_CAMPUS} ${FEED_SUFFIX}`,
    path: CAMPUS_POST_LIST_PATH,
    menuList: CAMPUS_MENU
  },
  all: {
    title: KO_ALL,
    name: `${KO_ALL} ${FEED_SUFFIX}`,
    path: ALL_PATH,
    menuList: ALL_MENU
  },
  group: {
    title: KO_GROUP,
    name: `${KO_GROUP} ${FEED_SUFFIX}`,
    path: GROUP_PATH,
    menuList: GROUP_MENU
  }
};

// manager

export const MANAGER_PROFILE_PATH = 'profile';
export const MANAGER_MESSAGE_PATH = 'messages';
export const MANAGER_USER_PATH = 'users';
export const MANAGER_FEEDS_PATH = 'feeds';
export const MANAGER_CAMPUS_PATH = 'campuses';
export const MANAGER_COURSE_PATH = 'courses';
export const MANAGER_RESTAURANT_PATH = 'restaurants';
export const MANAGER_RUNNINGMATE_PATH = 'runningmates';

export const MANAGER_USER_CHILDREN_PATH = {
  campusChangeAccept: 'campus-change-accept'
};

export const MANAGER_FEEDS_CHILDREN_PATH = {
  campusPost: 'campus-posts',
  allPost: 'all-posts',
  allNotice: 'all-notices',
  groupNotice: 'group-notices'
};

export const MANAGER_RUNNINGMATE_CHILDREN_PATH = {
  report: 'activity-reports'
};

export const MANAGER_RESTAURANT_CHILDREN_PATH = {
  register: 'register'
};

export const COURSE_CHAT_PATH = 'chat/course';
export const COURSE_CHAT_CHILDREN_PATH = {
  redirect: 'redirect'
}

export const chatting = [
  { name: '채팅방 바로가기', to: `${process.env.REACT_APP_BASE_URL}${COURSE_CHAT_PATH}/${COURSE_CHAT_CHILDREN_PATH.redirect}` }
];
export const writeReport = [
  { name: '새 보고서 작성하기', to: `${GROUP_RUNNING_MATE_PATH}/reports/write` }
];