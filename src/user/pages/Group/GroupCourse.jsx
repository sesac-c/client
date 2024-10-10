import FeedWrapper from '@/user/components/common/layout/FeedWrapper.jsx';
import ColumnLayoutWrapper from '@/user/components/common/layout/ColumnLayoutWrapper.jsx';
import UserSearch from '@/user/components/user/UserSearch.jsx';

import GroupName from '@/user/components/group/GroupName';

import * as React from 'react';
import { useState } from 'react';

import Notices from '@/user/components/notice/Notices';
import { fetchNotices } from '@/user/services/api/notices';
import Restaurant from '@/user/components/group/Restaurant';
import GroupTabs from '@/user/components/group/GroupTabs';

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
  return (
    <FeedWrapper boardContent={<GroupName name={'우'} />}>
      <ColumnLayoutWrapper
        mainArea={<Main />}
        rightSide={
          <UserSearch
            users={[]}
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
