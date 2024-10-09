import FeedWrapper from '@/user/components/common/layout/FeedWrapper.jsx';
import ColumnLayoutWrapper from '@/user/components/common/layout/ColumnLayoutWrapper.jsx';
import Carousel from '@/user/components/common/UI/Carousel.jsx';
import Posts from '@/user/components/post/Posts.jsx';
import UserSearch from '@/user/components/user/UserSearch.jsx';

import { useEffect } from 'react';
import { POSTS_ALL_API_URL } from '@/common/constants';
import useSearchPostStore from '@/user/store/searchPostStore';

const AllPostListPage = () => {
  const { resetStore } = useSearchPostStore();

  useEffect(() => {
    resetStore();
  }, []);

  return (
    <FeedWrapper boardContent={<Carousel items={[]} title='주요 공지' />}>
      <ColumnLayoutWrapper
        mainArea={<Posts apiUrl={POSTS_ALL_API_URL} />}
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
export default AllPostListPage;
