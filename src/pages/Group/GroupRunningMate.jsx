import { useCallback, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import axios from 'axios';

import ActivityReports from '@/components/group/ActivityReports';
import PageLoadingSpinner from '@/components/common/UI/PageLoadingSpinner';
import { GroupCotentLayout } from '@/layouts/Group';
import { MEMBER_LIST_API_URL, RUNNINGMATE_DETAIL_API_URL } from '@/constants';
import ErrorPage from '@/pages/Error/Error';

const GroupRunningMatePage = ({ path }) => {
  const [runningMate, setRunningMate] = useState(null);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState({
    isError: false,
    message: '러닝메이트 페이지 로드 중 오류가 발생했습니다.'
  });

  const loadUsers = useCallback(async runningMateId => {
    if (!runningMateId) return;
    try {
      const { data } = await axios.get(`${MEMBER_LIST_API_URL('runningmate', runningMateId)}`);
      setUsers(data);
    } catch (error) {
      console.error('Failed to load users:', error);
    }
  }, []);

  const loadRunningMate = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(RUNNINGMATE_DETAIL_API_URL);
      const { name, id } = data;
      setRunningMate({ name, id });
      console.log(data);

      await loadUsers(id);
    } catch (error) {
      const { response } = error;
      const status = response?.data?.status;
      if (status && status === 404) {
        setErrors({ isError: true, message: '아직 가입된 러닝메이트가 없습니다.' });
      } else {
        setErrors({ ...errors, isError: true });
      }
    } finally {
      setIsLoading(false);
    }
  }, [loadUsers]);

  useEffect(() => {
    loadRunningMate();
  }, [loadRunningMate]);

  if (isLoading) {
    return <PageLoadingSpinner />;
  } else if (errors.isError) {
    return <ErrorPage data={{ message: errors.message }} />;
  } else {
    return (
      <GroupCotentLayout groupType='runningmate' path={path} title={runningMate.name} users={users}>
        {path === 'reports' ? <ActivityReports feedType={'group'} /> : <Outlet />}
      </GroupCotentLayout>
    );
  }
};
export default GroupRunningMatePage;
