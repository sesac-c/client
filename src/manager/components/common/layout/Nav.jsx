import DashboardTwoToneIcon from '@mui/icons-material/DashboardTwoTone';
import SportsKabaddiTwoToneIcon from '@mui/icons-material/SportsKabaddiTwoTone';
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import FaceIcon from '@mui/icons-material/Face';
import ContentPasteTwoToneIcon from '@mui/icons-material/ContentPasteTwoTone';
import SchoolTwoToneIcon from '@mui/icons-material/SchoolTwoTone';
import RateReviewTwoToneIcon from '@mui/icons-material/RateReviewTwoTone';
import AutoAwesomeTwoToneIcon from '@mui/icons-material/AutoAwesomeTwoTone';
import {
  DASHBOARD_PATH,
  MANAGER_PROFILE_PATH,
  MANAGER_USER_PATH,
  MANAGER_FEEDS_PATH,
  MANAGER_CAMPUS_PATH,
  MANAGER_COURSE_PATH,
  MANAGER_RUNNINGMATE_PATH,
  MANAGER_USER_CHILDREN_PATH,
  MANAGER_FEEDS_CHILDREN_PATH,
  MANAGER_RUNNINGMATE_CHILDREN_PATH
} from '../../../../common/constants';

const PREFIX = 'manager/';
export const NAVIGATION = [
  {
    kind: 'header',
    title: 'Main'
  },
  {
    segment: PREFIX + DASHBOARD_PATH,
    title: '프로필',
    icon: <AccountCircleTwoToneIcon />
  },
  {
    segment: PREFIX + MANAGER_PROFILE_PATH,
    title: 'Dashboard',
    icon: <DashboardTwoToneIcon />
  },
  {
    kind: 'divider'
  },
  {
    kind: 'header',
    title: 'Management'
  },

  // 사용자
  {
    segment: PREFIX + MANAGER_USER_PATH,
    title: '사용자 관리',
    icon: <FaceIcon />,
    children: [
      {
        title: '사용자 목록 / 관리',
        icon: <AutoAwesomeTwoToneIcon fontSize='small' />
      },
      {
        segment: `/${MANAGER_USER_CHILDREN_PATH.accept}`,
        title: '사용자 승인',
        icon: <AutoAwesomeTwoToneIcon fontSize='small' />
      },
      {
        segment: `/${MANAGER_USER_CHILDREN_PATH.campusChangeAccept}`,
        title: '캠퍼스 변경 승인',
        icon: <AutoAwesomeTwoToneIcon fontSize='small' />
      }
    ]
  },

  // 피드
  {
    segment: PREFIX + MANAGER_FEEDS_PATH,
    title: '피드 관리',
    icon: <ContentPasteTwoToneIcon />,
    children: [
      {
        segment: `/${MANAGER_FEEDS_CHILDREN_PATH.post}`,
        title: '게시글 목록 / 관리',
        icon: <AutoAwesomeTwoToneIcon fontSize='small' />
      },
      {
        segment: `/${MANAGER_FEEDS_CHILDREN_PATH.notice}`,
        title: '공지 목록 / 관리',
        icon: <AutoAwesomeTwoToneIcon fontSize='small' />
      }
    ]
  },

  // 캠퍼스, 과정
  {
    segment: PREFIX + MANAGER_CAMPUS_PATH,
    title: '캠퍼스 관리',
    icon: <SchoolTwoToneIcon />
  },
  {
    segment: PREFIX + MANAGER_COURSE_PATH,
    title: '과정 관리',
    icon: <RateReviewTwoToneIcon />
  },
  {
    segment: PREFIX + MANAGER_RUNNINGMATE_PATH,
    title: '러닝메이트 관리',
    icon: <SportsKabaddiTwoToneIcon />,
    children: [
      {
        title: '러닝메이트 목록 / 관리',
        icon: <AutoAwesomeTwoToneIcon fontSize='small' />
      },
      {
        segment: `/${MANAGER_RUNNINGMATE_CHILDREN_PATH.report}`,
        title: '러닝메이트 활동 보고서 관리',
        icon: <AutoAwesomeTwoToneIcon fontSize='small' />
      }
    ]
  }
];
