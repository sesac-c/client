import FeedWrapper from '@/user/components/common/layout/FeedWrapper.jsx';
import ColumnLayoutWrapper from '@/user/components/common/layout/ColumnLayoutWrapper.jsx';
import UserSearch from '@/user/components/user/UserSearch.jsx';

import GroupName from '@/user/components/group/GroupName';

import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';

import Notices from '@/user/components/notice/Notices';
import { fetchNotices } from '@/user/services/api/notices';
import Restaurant from '@/user/components/group/Restaurant';
import GroupTabs from '@/user/components/group/GroupTabs';
import axios from 'axios';

const TABS = [
  {
    label: '공지',
    value: 'notices'
  },
  {
    label: '음식점',
    value: 'restaurant'
  }
];

const Main = () => {
  const [active, setActive] = useState('notices');
  const onChange = value => setActive(value);

  return (
    <>
      <GroupTabs tabs={TABS} onChange={onChange} />
      {active === 'notices' && <Notices feedType={'group'} />}
      {active === 'restaurant' && <Restaurant fetchNotices={fetchNotices} />}
    </>
  );
};

const GroupCourse = () => {
  const [course, setCourse] = useState(null);
  const [users, setUsers] = useState([]);

  const loadUsers = useCallback(async courseId => {
    if (!courseId) return;
    try {
      const { data } = await axios.get(`/members/course/${courseId}`);
      setUsers(data);
    } catch (error) {
      console.error('Failed to load users:', error);
    }
  }, []);

  const loadCourse = useCallback(async () => {
    try {
      const { data } = await axios.get('/user/student/profiles');
      const { courseId, courseName, campusId, campusName } = data;
      setCourse({ courseId, courseName, campusId, campusName });

      await loadUsers(courseId);
    } catch (error) {
      console.error('Failed to load course:', error);
    }
  }, [loadUsers]);

  useEffect(() => {
    loadCourse();
  }, [loadCourse]);

  return (
    <FeedWrapper boardContent={<GroupName name={course && `${course.campusName} ${course.courseName}`} />}>
      <ColumnLayoutWrapper
        mainArea={<Main />}
        rightSide={
          <UserSearch
            users={users}
            searchInputPlaceholder='캠퍼스 매니저 검색'
            noSearchContent='일치하는 캠퍼스 매니저가 없습니다.'
            buttonText='쪽지하기'
          />
        }
      />
    </FeedWrapper>
  );
};
export default GroupCourse;
