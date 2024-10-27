import { useEffect, useState } from 'react';

import useSearchPostStore from '@/stores/searchPostStore';

import Posts from '@/components/feed/Posts.jsx';
import FeedWrapper from '@/components/user/layout/FeedWrapper';
import ColumnLayoutWrapper from '@/components/user/layout/ColumnLayoutWrapper';
import UserSearch from '@/components/common/userList/UserSearch';
import Carousel from '@/components/user/UI/Carousel';

import { FEED_ROOT_API_URL, FEED_TYPE, POST_TYPE } from '@/constants';
import { fetchPopular } from '@/services/api';

const AllPostListPage = () => {
  const [popularPosts, setPopularPosts] = useState([]);
  const { resetStore } = useSearchPostStore();

  const load = async () => {
    const response = await fetchPopular();
    const { data } = response;

    const posts = data.map(post => {
      return {
        ...post,
        link: `/feed/${post.type.toLowerCase()}/posts/${post.id}`
      };
    });
    setPopularPosts(posts);
  };

  useEffect(() => {
    load();
    resetStore();
  }, []);

  return (
    <FeedWrapper boardContent={<Carousel items={popularPosts} title='인기글' />}>
      <ColumnLayoutWrapper
        mainArea={<Posts apiUrl={FEED_ROOT_API_URL(FEED_TYPE.POST, POST_TYPE.ALL)} feedType={'all'} />}
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
