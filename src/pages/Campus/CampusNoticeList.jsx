import { useEffect, useState } from 'react';

import FeedWrapper from '@/components/user/layout/FeedWrapper';
import ColumnLayoutWrapper from '@/components/user/layout/ColumnLayoutWrapper';
import UserSearch from '@/components/common/userList/UserSearch';
import Carousel from '@/components/user/UI/Carousel';

import { importantNotice } from '@/services/api';
import Notices from '@/components/feed/Notices';

const CampusNoticeListPage = () => {
  const [importantNotices, setImportantNotices] = useState([]);

  const load = async () => {
    const response = await importantNotice();
    const { data } = response;

    const notices = data.map(notice => {
      return {
        ...notice,
        link: `/feed/campus/notices/${notice.id}`
      };
    });
    setImportantNotices(notices);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <FeedWrapper boardContent={<Carousel items={importantNotices} title='주요 공지' />}>
      <ColumnLayoutWrapper
        mainArea={<Notices feedType={'campus'} />}
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
export default CampusNoticeListPage;
