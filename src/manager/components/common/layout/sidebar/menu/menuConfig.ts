import { MenuItemWithChildren, BottomButtonGroupMenuItem } from '../../../../../types';
import {
  MANAGER_CAMPUS_PATH,
  MANAGER_USER_PATH,
  MANAGER_FEEDS_PATH,
  MANAGER_COURSE_PATH,
  MANAGER_RUNNINGMATE_PATH,
  MANAGER_RESTAURANT_PATH
} from '../../../../../../common/constants';

import {
  MANAGER_USER_CHILDREN_PATH,
  MANAGER_FEEDS_CHILDREN_PATH,
  MANAGER_RUNNINGMATE_CHILDREN_PATH
} from '../../../../../../common/constants';

import { navIcons } from '../../../../../assets/icon';

const PREFIX = '/manager/';

const USER_PREFIX = PREFIX + MANAGER_USER_PATH;
const FEED_PREFIX = PREFIX + MANAGER_FEEDS_PATH;
const CAMPUS_PREFIX = PREFIX + MANAGER_CAMPUS_PATH;
const COURSE_PREFIX = PREFIX + MANAGER_COURSE_PATH;
const RESTAURANT_PREFIX = PREFIX + MANAGER_RESTAURANT_PATH;
const RUNNINGMATE_PREFIX = PREFIX + MANAGER_RUNNINGMATE_PATH;

export const menuItems: MenuItemWithChildren[] = [
  {
    title: '사용자 관리',
    icon: navIcons.user,
    path: USER_PREFIX,
    children: [
      {
        title: '사용자 목록 / 관리',
        path: ''
      },
      {
        title: '캠퍼스 변경 승인',
        path: `${USER_PREFIX}/${MANAGER_USER_CHILDREN_PATH.campusChangeAccept}`
      }
    ]
  },
  {
    title: '피드 관리',
    icon: navIcons.feed,
    path: FEED_PREFIX,
    children: [
      {
        title: '캠퍼스 게시글 목록 / 관리',
        path: `${FEED_PREFIX}/${MANAGER_FEEDS_CHILDREN_PATH.campusPost}`
      },
      {
        title: '전체 게시글 목록 / 관리',
        path: `${FEED_PREFIX}/${MANAGER_FEEDS_CHILDREN_PATH.allPost}`
      },
      {
        title: '전체 공지 목록 / 관리',
        path: `${FEED_PREFIX}/${MANAGER_FEEDS_CHILDREN_PATH.allNotice}`
      },
      {
        title: '그룹 공지 목록 / 관리',
        path: `${FEED_PREFIX}/${MANAGER_FEEDS_CHILDREN_PATH.groupNotice}`
      }
    ]
  },
  {
    title: '그룹 관리',
    icon: navIcons.group,
    path: RUNNINGMATE_PREFIX,
    children: [
      {
        title: '식당 목록 / 관리',
        path: `${RESTAURANT_PREFIX}`
      },
      {
        title: '러닝메이트 목록 / 관리',
        path: `${RUNNINGMATE_PREFIX}`
      },
      {
        title: '러닝메이트 활동 보고서 관리',
        path: `${RUNNINGMATE_PREFIX}/${MANAGER_RUNNINGMATE_CHILDREN_PATH.report}`
      }
    ]
  },
  {
    title: '캠퍼스 관리',
    icon: navIcons.campus,
    path: CAMPUS_PREFIX
  },
  {
    title: '강의 관리',
    icon: navIcons.course,
    path: COURSE_PREFIX
  }
];

export const bottomMenuItems: BottomButtonGroupMenuItem[] = [
  { title: '설정', icon: 'setting', path: '/settings' },
  { title: '쪽지함', icon: 'message', path: '/messages' }
];
