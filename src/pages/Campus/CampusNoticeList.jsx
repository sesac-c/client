import FeedWrapper from '../../components/Feed/FeedWrapper.jsx';
import ColumnLayoutWrapper from '../../components/common/layout/ColumnLayoutWrapper.jsx';
import Posts from '../../components/Feed/Posts.jsx';
import UserSearch from '../../components/Feed/UserSearch.jsx';
import Carousel from '../../components/Feed/Carousel.jsx';
import { dummyNoticeData, dummyNoticesData } from '../../assets/mockData/notice.js';
import { dummyManagerData } from '../../assets/mockData/search.js';

const CampusNoticeListPage = () => {
  return (
    <FeedWrapper boardContent={<Carousel items={dummyNoticesData.slice(0, 2)} title='주요 공지' />}>
      <ColumnLayoutWrapper
        mainArea={<Posts posts={dummyNoticeData} />}
        rightSide={
          <UserSearch
            users={dummyManagerData}
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
