export const CAMPUS = 'campus';
export const ALL = 'all';
export const GROUP = 'group';

export const FEED_ARR = [CAMPUS, ALL, GROUP];

const KO_CAMPUS = '캠퍼스';
const KO_ALL = '전체';
const KO_GROUP = '그룹';

export const FEED_SUFFIX = '피드';

export const FEED_SELECT_ITEMS = [
    `${KO_CAMPUS} ${FEED_SUFFIX}`, `${KO_ALL} ${FEED_SUFFIX}`, `${KO_GROUP} ${FEED_SUFFIX}`
];

export const ACCOUNTS_PATH = '/accounts';
export const ACCOUNT_CHILDREN_PATH = {
    login: 'login',
    signup: 'signup',
    findPassword: 'find/password',
    resetPassword: 'reset/password',
}

export const LOGIN_PATH = `${ACCOUNTS_PATH}/${ACCOUNT_CHILDREN_PATH.login}`;
export const SIGNUP_PATH = `${ACCOUNTS_PATH}/${ACCOUNT_CHILDREN_PATH.signup}`;
export const FIND_PASSWORD_PATH = `${ACCOUNTS_PATH}/${ACCOUNT_CHILDREN_PATH.findPassword}`;
export const RESET_PASSWORD_PATH = `${ACCOUNTS_PATH}/${ACCOUNT_CHILDREN_PATH.resetPassword}`;

export const USER_PATH = '/';
export const MANAGER_PATH = '/manager';

export const CAMPUS_PATH = 'feed/campus'
export const CAMPUS_CHILDREN_PATH = {
    postList: 'posts',
    noticeList: 'notices',
    search: 'search-post',
}

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
    },
]

export const ALL_PATH = '/feed/all'
export const GROUP_PATH = '/feed/group'


export const FEED_INFO = {
    campus: {
        title: KO_CAMPUS,
        name: `${KO_CAMPUS} ${FEED_SUFFIX}`,
        path: CAMPUS_POST_LIST_PATH,
        menuList: CAMPUS_MENU
    },
    total: {
        title: KO_ALL,
        name: `${KO_ALL} ${FEED_SUFFIX}`,
        path: ALL_PATH
    },
    group: {
        title: KO_GROUP,
        name: `${KO_GROUP} ${FEED_SUFFIX}`,
        path: GROUP_PATH
    },
}