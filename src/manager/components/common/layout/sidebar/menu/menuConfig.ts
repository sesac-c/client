import React from 'react';
import FaceIcon from '@mui/icons-material/Face';
import ContentPasteTwoToneIcon from '@mui/icons-material/ContentPasteTwoTone';
import SchoolTwoToneIcon from '@mui/icons-material/SchoolTwoTone';
import RateReviewTwoToneIcon from '@mui/icons-material/RateReviewTwoTone';
import SportsKabaddiTwoToneIcon from '@mui/icons-material/SportsKabaddiTwoTone';
import AutoAwesomeTwoToneIcon from '@mui/icons-material/AutoAwesomeTwoTone';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import DraftsTwoToneIcon from '@mui/icons-material/DraftsTwoTone';

import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { MenuItem } from './MenuItems';
import {
  MANAGER_USER_PATH,
  MANAGER_CAMPUS_PATH,
  MANAGER_COURSE_PATH,
  MANAGER_USER_CHILDREN_PATH
} from '../../../../../../common/constants';

const PREFIX = '/manager/';
const USER_PREFIX = PREFIX + MANAGER_USER_PATH;
// const POST_PREFIX = PREFIX + MANAGER_POST_c;
const CAMPUS_PREFIX = PREFIX + MANAGER_CAMPUS_PATH;
const COURSE_PREFIX = PREFIX + MANAGER_COURSE_PATH;

export const menuItems: MenuItem[] = [
  {
    title: '사용자 관리',
    icon: React.createElement(FaceIcon),
    path: PREFIX + MANAGER_USER_PATH,
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
        path: '/user-management/campus-change'
      }
    ]
  },
  {
    title: '피드 관리',
    icon: React.createElement(ContentPasteTwoToneIcon),
    path: '/feed-management',
    children: [
      {
        title: '게시글 목록 / 관리',
        path: '/feed-management/posts'
      },
      {
        title: '공지 목록 / 관리',
        path: '/feed-management/notices'
      }
    ]
  },
  {
    title: '캠퍼스 관리',
    icon: React.createElement(SchoolTwoToneIcon),
    path: CAMPUS_PREFIX
  },
  {
    title: '강의 관리',
    icon: React.createElement(RateReviewTwoToneIcon),
    path: COURSE_PREFIX
  },
  {
    title: '러닝메이트 관리',
    icon: React.createElement(SportsKabaddiTwoToneIcon),
    path: '/learning-mate',
    children: [
      {
        title: '러닝메이트 목록 / 관리',
        path: '/learning-mate/list'
      },
      {
        title: '러닝메이트 활동 보고서 관리',
        path: '/learning-mate/reports'
      }
    ]
  }
];

export const bottomMenuItems: MenuItem[] = [
  {
    title: '설정',
    icon: React.createElement(SettingsRoundedIcon),
    path: '/settings'
  },
  {
    title: '쪽지함',
    icon: React.createElement(DraftsTwoToneIcon),
    path: '/messages'
  },
  {
    title: '로그아웃',
    icon: React.createElement(LogoutRoundedIcon),
    path: '/logout'
  }
];
