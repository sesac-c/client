import FeedWrapper from '@/user/components/common/layout/FeedWrapper.jsx';
import ColumnLayoutWrapper from '@/user/components/common/layout/ColumnLayoutWrapper.jsx';

import GroupName from '@/user/components/group/GroupName';

import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';

import { fetchNotices } from '@/user/services/api/notices';
import Restaurant from '@/user/components/group/Restaurant';
import GroupTabs from '@/user/components/group/GroupTabs';
import axios from 'axios';
import UserList from '@/user/components/common/UI/UserList';
import ActivityReports from '@/user/components/group/ActivityReports';

const TABS = [
  {
    label: '활동내역',
    value: 'activity'
  },
  {
    label: '음식점',
    value: 'restaurant'
  }
];

const Main = () => {
  const [active, setActive] = useState('activity');
  const onChange = value => setActive(value);

  return (
    <>
      <GroupTabs tabs={TABS} onChange={onChange} />
      {active === 'activity' && <ActivityReports feedType={'group'} />}
      {active === 'restaurant' && <Restaurant fetchNotices={fetchNotices} />}
    </>
  );
};

const GroupRunningMate = () => {
  const [runningMate, setRunningMate] = useState(null);
  const [users, setUsers] = useState([]);

  const loadUsers = useCallback(async runningMateId => {
    if (!runningMateId) return;
    try {
      const { data } = await axios.get(`/members/runningmate/${runningMateId}`);
      console.log(data);
      setUsers(data);
    } catch (error) {
      console.error('Failed to load users:', error);
    }
  }, []);

  const loadRunningMate = useCallback(async () => {
    try {
      const { data } = await axios.get('/runningmates/detail');
      const { name, id } = data;
      setRunningMate({ name, id });

      await loadUsers(id);
    } catch (error) {
      console.error('Failed to load runningMate:', error);
    }
  }, [loadUsers]);

  useEffect(() => {
    loadRunningMate();
  }, [loadRunningMate]);

  return (
    <FeedWrapper boardContent={<GroupName name={runningMate && `${runningMate.name}`} />}>
      <ColumnLayoutWrapper mainArea={<Main />} rightSide={<UserList users={users} buttonText={'쪽지하기'} />} />
    </FeedWrapper>
  );
};
export default GroupRunningMate;
