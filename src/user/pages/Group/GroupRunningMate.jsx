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
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { writeReport } from '@/common/constants';
import SideMenu from '@/common/components/common/layout/SideMenu';

const TABS = [
  {
    label: '활동내역',
    value: 'reports'
  },
  {
    label: '음식점',
    value: 'restaurant'
  }
];

const GroupRunningMate = ({ path }) => {
  const [runningMate, setRunningMate] = useState(null);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const loadUsers = useCallback(async runningMateId => {
    if (!runningMateId) return;
    try {
      const { data } = await axios.get(`/members/runningmate/${runningMateId}`);
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
    <>
      <div className='board-container pr-16'>
        <GroupName name={runningMate && `${runningMate.name}`} />
        <GroupTabs tabs={TABS} path={path} />
      </div>

      <div className='group-container'>
        <ColumnLayoutWrapper
          leftSide={<SideMenu page='group' menu={[{ title: '보고서', items: writeReport }]} />}
          mainArea={
            <div className='pr-16'>
              {path === 'reports' ? <ActivityReports feedType={'group'} /> : <Restaurant fetchNotices={fetchNotices} />}
            </div>
          }
          rightSide={<UserList users={users} buttonText={'쪽지하기'} className='mr-5' />}
        ></ColumnLayoutWrapper>
      </div>
    </>
  );
};
export default GroupRunningMate;
