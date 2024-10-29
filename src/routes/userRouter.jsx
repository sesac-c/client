import React from 'react';

import CampusLayout from '@/layouts/Campus';
import AllLayout from '@/layouts/All';
import GroupRootLayout from '@/layouts/Group';

import CampusPostDetailPage from '@/pages/Campus/CampusPostDetail';
import CampusPostListPage from '@/pages/Campus/CampusPostList';
import CampusNoticeListPage from '@/pages/Campus/CampusNoticeList';
import SearchCampusPostPage from '@/pages/Campus/SearchCampusPost';
import AllPostDetailPage from '@/pages/All/AllPostDetail';
import AllPostListPage from '@/pages/All/AllPostList';
import RestaurantGridContainer from '@/components/group/restaurant/RestaurantGridContainer';
import RestaurantDetailPage from '@/pages/Group/RestaurantDetail';
import ChatPage from '@/pages/Chat/Chat';
import ChatRedirectPage from '@/pages/Chat/ChatRedirect';
import CampusNoticeDetailPage from '@/pages/Campus/CampusNoticeDetail';
import SearchAllPostPage from '@/pages/All/SearchAllPost';
import GroupCoursePage from '@/pages/Group/GroupCourse';
import GroupRunningMatePage from '@/pages/Group/GroupRunningMate';
import ActivityReportWritePage from '@/components/group/ActivityReportWrite';
import ActivityReportDetailPage from '@/components/group/ActivityReportDetail';

import {
  ALL_PATH,
  CAMPUS_CHILDREN_PATH,
  CAMPUS_PATH,
  GROUP_CHILDREN_PATH,
  COURSES_CHILDREN_PATH,
  RUNNINGMATE_CHILDREN_PATH,
  GROUP_PATH,
  COURSE_CHAT_PATH,
  COURSE_CHAT_CHILDREN_PATH
} from '@/routes/paths';

const userRoutes = [
  {
    path: CAMPUS_PATH,
    element: <CampusLayout />,
    children: [
      {
        path: `${CAMPUS_CHILDREN_PATH.postList}/:postId`,
        element: <CampusPostDetailPage />
      },
      {
        path: CAMPUS_CHILDREN_PATH.postList,
        element: <CampusPostListPage />
      },
      {
        path: CAMPUS_CHILDREN_PATH.noticeList,
        element: <CampusNoticeListPage />
      },
      {
        path: `${CAMPUS_CHILDREN_PATH.noticeList}/:noticeId`,
        element: <CampusNoticeDetailPage />
      },
      {
        path: CAMPUS_CHILDREN_PATH.search,
        element: <SearchCampusPostPage />
      }
    ]
  },
  {
    path: ALL_PATH,
    element: <AllLayout />,
    children: [
      {
        path: `${CAMPUS_CHILDREN_PATH.postList}/:postId`,
        element: <AllPostDetailPage />
      },
      {
        path: CAMPUS_CHILDREN_PATH.postList,
        element: <AllPostListPage />
      },
      {
        path: CAMPUS_CHILDREN_PATH.search,
        element: <SearchAllPostPage />
      }
    ]
  },
  {
    path: GROUP_PATH,
    element: <GroupRootLayout />,
    children: [
      {
        path: `${GROUP_CHILDREN_PATH.courses}/${COURSES_CHILDREN_PATH.notices}`,
        element: <GroupCoursePage path={COURSES_CHILDREN_PATH.notices} />
      },
      {
        path: `${GROUP_CHILDREN_PATH.courses}/${COURSES_CHILDREN_PATH.notices}/:noticeId`,
        element: <CampusNoticeDetailPage />
      },
      {
        path: `${GROUP_CHILDREN_PATH.courses}/${COURSES_CHILDREN_PATH.restaurants}`,
        element: <GroupCoursePage path={COURSES_CHILDREN_PATH.restaurants} />,
        children: [
          {
            index: true,
            element: <RestaurantGridContainer restaurantType='campus' />
          },
          {
            path: ':restaurantId',
            element: <RestaurantDetailPage restaurantType='campus' />
          }
        ]
      },
      {
        path: `${GROUP_CHILDREN_PATH.runningmate}/${RUNNINGMATE_CHILDREN_PATH.reports}`,
        element: <GroupRunningMatePage path={RUNNINGMATE_CHILDREN_PATH.reports} />
      },
      {
        path: `${GROUP_CHILDREN_PATH.runningmate}/${RUNNINGMATE_CHILDREN_PATH.reports}/write`,
        element: <ActivityReportWritePage />
      },
      {
        path: `${GROUP_CHILDREN_PATH.runningmate}/${RUNNINGMATE_CHILDREN_PATH.reports}/:reportId`,
        element: <ActivityReportDetailPage />
      },
      {
        path: `${GROUP_CHILDREN_PATH.runningmate}/${RUNNINGMATE_CHILDREN_PATH.restaurants}`,
        element: <GroupRunningMatePage path={RUNNINGMATE_CHILDREN_PATH.restaurants} />,
        children: [
          {
            index: true,
            element: <RestaurantGridContainer restaurantType='runningmate' />
          },
          {
            path: ':restaurantId',
            element: <RestaurantDetailPage restaurantType='runningmate' />
          }
        ]
      }
    ]
  },
  {
    path: COURSE_CHAT_PATH,
    children: [
      {
        index: true,
        element: <ChatPage />
      },
      {
        path: COURSE_CHAT_CHILDREN_PATH.redirect,
        element: <ChatRedirectPage />
      }
    ]
  }
];

export default userRoutes;
