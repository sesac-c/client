import FeedWrapper from '../../components/Feed/FeedWrapper.jsx';
import ColumnLayoutWrapper from '../../components/common/layout/ColumnLayoutWrapper.jsx';
import Posts from '../../components/Feed/posts/Posts.jsx';
import UserSearch from '../../components/Feed/UserSearch.jsx';
import Carousel from '../../components/Feed/Carousel.jsx';
import { dummyNoticesData } from '../../assets/mockData/notice.js';
import { dummyUserData } from '../../assets/mockData/search.js';
import PostDetailModal from '../../components/Feed/posts/detail/PostDetailModal.jsx';

const CampusPostListPage = () => {
  return (
    <FeedWrapper boardContent={<Carousel items={dummyNoticesData} title='주요 공지' />}>
      <ColumnLayoutWrapper
        mainArea={<Posts />}
        rightSide={
          <UserSearch
            users={dummyUserData}
            searchInputPlaceholder='캠퍼스 회원 검색'
            title='회원님을 위한 추천'
            noSearchContent='일치하는 회원이 없습니다.'
            buttonText='팔로우'
          />
        }
      />
      <PostDetailModal postId={1} />
    </FeedWrapper>
  );
};
export default CampusPostListPage;
