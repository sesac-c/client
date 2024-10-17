import ColumnLayoutWrapper from '@/user/components/common/layout/ColumnLayoutWrapper.jsx';

import GroupName from '@/user/components/group/GroupName';

import { useCallback, useEffect, useState } from 'react';

import Notices from '@/user/components/feed/Notices';
import { fetchNotices } from '@/user/services/api/notices';
import Restaurant from '@/user/components/group/Restaurant';
import GroupTabs from '@/user/components/group/GroupTabs';
import axios from 'axios';
import UserList from '@/user/components/common/UI/UserList';

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

const GroupCourse = ({ path }) => {
  const [course, setCourse] = useState(null);
  const [users, setUsers] = useState([]);

  const loadUsers = useCallback(async courseId => {
    if (!courseId) return;
    try {
      const { data } = await axios.get(`/members/course/${courseId}`);
      setUsers(data);
      console.log(users);
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
    <>
      <div className='board-container'>
        <GroupName name={course && `${course.campusName} ${course.courseName}`} />
        <GroupTabs tabs={TABS} path={path} />
      </div>

      <div className='main-container'>
        <ColumnLayoutWrapper
          mainArea={path === 'notices' ? <Notices feedType={'group'} /> : <Restaurant fetchNotices={fetchNotices} />}
          rightSide={<UserList users={users} buttonText={'쪽지하기'} />}
        ></ColumnLayoutWrapper>
      </div>
    </>
  );
};
export default GroupCourse;
