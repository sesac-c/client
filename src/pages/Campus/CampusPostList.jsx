import { useEffect, useState } from 'react';

import useSearchPostStore from '@/stores/searchPostStore';

import Posts from '@/components/feed/Posts.jsx';
import FeedWrapper from '@/components/user/layout/FeedWrapper';
import ColumnLayoutWrapper from '@/components/user/layout/ColumnLayoutWrapper';
import UserSearch from '@/components/common/userList/UserSearch';
import Carousel from '@/components/user/UI/Carousel';

import { importantNotice } from '@/services/api';
import { FEED_ROOT_API_URL, FEED_TYPE, POST_TYPE } from '@/constants';

const CampusPostListPage = () => {
  const [importantNotices, setImportantNotices] = useState([]);
  const { resetStore } = useSearchPostStore();

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
    resetStore();
  }, []);

  return (
    <FeedWrapper boardContent={<Carousel items={importantNotices} title='주요 공지' />}>
      <ColumnLayoutWrapper
        mainArea={<Posts apiUrl={FEED_ROOT_API_URL(FEED_TYPE.POST, POST_TYPE.CAMPUS)} feedType={POST_TYPE.CAMPUS} />}
        rightSide={
          <UserSearch
            // users={dummyUserData}
            users={[]}
            searchInputPlaceholder='캠퍼스 회원 검색'
            // title='회원님을 위한 추천'
            noSearchContent='일치하는 회원이 없습니다.'
            buttonText='팔로우'
          />
        }
      />
    </FeedWrapper>
  );
};
export default CampusPostListPage;
