import FeedWrapper from '@/user/components/common/layout/FeedWrapper.jsx';
import ColumnLayoutWrapper from '@/user/components/common/layout/ColumnLayoutWrapper.jsx';
import Carousel from '@/user/components/common/UI/Carousel.jsx';
import UserSearch from '@/user/components/user/UserSearch.jsx';

import { fetchNotices, importantNotice } from '@/user/services/api/notices';
import Notices from '@/user/components/notice/Notices';
import { useEffect, useState } from 'react';

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
        mainArea={<Notices fetchNotices={fetchNotices} />}
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
