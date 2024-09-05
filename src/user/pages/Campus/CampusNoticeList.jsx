import FeedWrapper from '../../components/common/layout/FeedWrapper.jsx';
import ColumnLayoutWrapper from '../../components/common/layout/ColumnLayoutWrapper.jsx';
import Carousel from '../../components/common/UI/Carousel.jsx';
import Posts from '../../components/post/Posts.jsx';
import UserSearch from '../../components/user/UserSearch.jsx';

import { dummyNoticeData, dummyNoticesData, dummyManagerData } from '../../_mock';

const CampusNoticeListPage = () => {
  return (
    <FeedWrapper boardContent={<Carousel items={dummyNoticesData} title='주요 공지' />}>
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
