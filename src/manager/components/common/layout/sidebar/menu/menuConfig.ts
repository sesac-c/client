import { MenuItem } from './MenuItems';
import {
  MANAGER_CAMPUS_PATH,
  MANAGER_USER_PATH,
  MANAGER_FEEDS_PATH,
  MANAGER_COURSE_PATH,
  MANAGER_RUNNINGMATE_PATH
} from '../../../../../../common/constants';

import {
  MANAGER_USER_CHILDREN_PATH,
  MANAGER_FEEDS_CHILDREN_PATH,
  MANAGER_RUNNINGMATE_CHILDREN_PATH
} from '../../../../../../common/constants';

import { navIcon } from '../../../../../assets/icon';

const PREFIX = '/manager/';

const USER_PREFIX = PREFIX + MANAGER_USER_PATH;
const FEED_PREFIX = PREFIX + MANAGER_FEEDS_PATH;
const CAMPUS_PREFIX = PREFIX + MANAGER_CAMPUS_PATH;
const COURSE_PREFIX = PREFIX + MANAGER_COURSE_PATH;
const RUNNINGMATE_PREFIX = PREFIX + MANAGER_RUNNINGMATE_PATH;

export const menuItems: MenuItem[] = [
  {
    title: '사용자 관리',
    icon: navIcon.user,
    path: USER_PREFIX,
    children: [
      {
        title: '사용자 목록 / 관리',
        path: ''
      },
      {
        title: '사용자 승인',
        path: `${USER_PREFIX}/${MANAGER_USER_CHILDREN_PATH.accept}`
      },
      {
        title: '캠퍼스 변경 승인',
        path: `${USER_PREFIX}/${MANAGER_USER_CHILDREN_PATH.campusChangeAccept}`
      }
    ]
  },
  {
    title: '피드 관리',
    icon: navIcon.feed,
    path: FEED_PREFIX,
    children: [
      {
        title: '게시글 목록 / 관리',
        path: `${FEED_PREFIX}/${MANAGER_FEEDS_CHILDREN_PATH.post}`
      },
      {
        title: '공지 목록 / 관리',
        path: `${FEED_PREFIX}/${MANAGER_FEEDS_CHILDREN_PATH.notice}`
      }
    ]
  },
  {
    title: '캠퍼스 관리',
    icon: navIcon.campus,
    path: CAMPUS_PREFIX
  },
  {
    title: '강의 관리',
    icon: navIcon.course,
    path: COURSE_PREFIX
  },
  {
    title: '러닝메이트 관리',
    icon: navIcon.runningmate,
    path: RUNNINGMATE_PREFIX,
    children: [
      {
        title: '러닝메이트 목록 / 관리',
        path: `${RUNNINGMATE_PREFIX}`
      },
      {
        title: '러닝메이트 활동 보고서 관리',
        path: `${RUNNINGMATE_PREFIX}/${MANAGER_RUNNINGMATE_CHILDREN_PATH.report}`
      }
    ]
  }
];

export const bottomMenuItems: MenuItem[] = [
  {
    title: '설정',
    icon: navIcon.setting,
    path: '/settings'
  },
  {
    title: '쪽지함',
    icon: navIcon.message,
    path: '/messages'
  },
  {
    title: '로그아웃',
    icon: navIcon.logout,
    path: '/logout'
  }
];
