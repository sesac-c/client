import { Outlet } from 'react-router-dom';

import Header from '@/components/user/layout/Header';
import ColumnLayoutWrapper from '@/components/user/layout/ColumnLayoutWrapper';

import { chatting, COURSES_CHILDREN_PATH, GROUP, RUNNINGMATE_CHILDREN_PATH, writeReport } from '@/routes/paths';

import GroupName from '@/components/group/GroupName.jsx';
import GroupTabs from '@/components/group/GroupTabs.jsx';
import SideMenu from '@/components/common/layout/SideMenu';
import UserList from '@/components/common/userList/UserList';

const TABS = {
  course: [
    {
      label: '공지',
      value: COURSES_CHILDREN_PATH.notices
    },
    {
      label: '음식점',
      value: COURSES_CHILDREN_PATH.restaurants
    }
  ],
  runningmate: [
    {
      label: '활동내역',
      value: RUNNINGMATE_CHILDREN_PATH.reports
    },
    {
      label: '음식점',
      value: RUNNINGMATE_CHILDREN_PATH.restaurants
    }
  ]
};
const GROUP_MENU = {
  course: [{ title: '채팅', items: chatting }],
  runningmate: [{ title: '보고서', items: writeReport }]
};

const GroupRootLayout = () => {
  return (
    <div id='wrap'>
      <Header currentLocation={GROUP} />
      <main id='main'>
          <Outlet />
      </main>
    </div>
  );
};

export const GroupCotentLayout = ({ groupType, path, title, children, users }) => {
  return (
    <>
      <div className='board-container pr-16'>
        <GroupName name={title} />
        <GroupTabs tabs={TABS[groupType]} path={path} />
      </div>

      <div className='main-container'>
        <ColumnLayoutWrapper
          leftSide={<SideMenu page='group' menu={GROUP_MENU[groupType]} />}
          mainArea={<div className='pr-16'>{children}</div>}
          rightSide={<UserList users={users} buttonText='쪽지하기' className='mr-5' />}
        ></ColumnLayoutWrapper>
      </div>
    </>
  );
};

export default GroupRootLayout;
