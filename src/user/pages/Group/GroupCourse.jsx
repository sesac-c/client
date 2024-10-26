import { useCallback, useEffect, useState } from 'react';

import Notices from '@/user/components/feed/Notices';
import axios from 'axios';
import { USER_PROFILE_FORM_API_URL } from '@/common/constants';
import { GroupCotentLayout } from '@/user/layouts/Group';
import PageLoadingSpinner from '@/common/components/common/UI/PageLoadingSpinner';
import { Outlet } from 'react-router-dom';
import { getCourseMember } from '@/user/services/api';

const GroupCourse = ({ path }) => {
  const [course, setCourse] = useState(null);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadUsers = useCallback(async courseId => {
    if (!courseId) return;
    try {
      const data = await getCourseMember(courseId);
      setUsers(data);
    } catch (error) {
      console.error('Failed to load users:', error);
    }
  }, []);

  const loadCourse = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(USER_PROFILE_FORM_API_URL('student'));
      const { courseId, courseName, campusId, campusName } = data;
      setCourse({ courseId, courseName, campusId, campusName });

      await loadUsers(courseId);
    } catch (error) {
      console.error('Failed to load course:', error);
    } finally {
      setIsLoading(false);
    }
  }, [loadUsers]);

  useEffect(() => {
    loadCourse();
  }, [loadCourse]);

  if (isLoading) {
    return <PageLoadingSpinner />;
  } else {
    return (
      <GroupCotentLayout
        groupType='course'
        path={path}
        title={`${course.campusName} ${course.courseName}`}
        users={users}
      >
        {path === 'notices' ? <Notices feedType={'group'} /> : <Outlet />}
      </GroupCotentLayout>
    );
  }
};
export default GroupCourse;
