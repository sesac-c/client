import FeedWrapper from '../../components/common/layout/FeedWrapper.jsx';
import ColumnLayoutWrapper from '../../components/common/layout/ColumnLayoutWrapper.jsx';
import Carousel from '../../components/common/UI/Carousel.jsx';
import Posts from '../../components/post/Posts.jsx';
import UserSearch from '../../components/user/UserSearch.jsx';

import { fetchCampusPosts } from '@/user/services/api/posts';
import { importantNotice } from '@/user/services/api/notices';
import { useEffect, useState } from 'react';

const CampusPostListPage = () => {
  const [importantNotices, setImportantNotices] = useState([]);

  const load = async () => {
    const response = await importantNotice();
    const { data } = response;
    setImportantNotices(data);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <FeedWrapper boardContent={<Carousel items={importantNotices} title='주요 공지' />}>
      <ColumnLayoutWrapper
        mainArea={<Posts fetchPosts={fetchCampusPosts} />}
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
