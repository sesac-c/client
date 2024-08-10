import FeedWrapper from '../../components/Feed/FeedWrapper.jsx';
import ColumnLayoutWrapper from '../../components/common/layout/ColumnLayoutWrapper.jsx';
import Posts from '../../components/Feed/Posts.jsx';
import { dummyNoticeData } from '../../assets/mockData/notice.js';
import PostSearchBar from '../../components/Feed/PostSearchBar.jsx';
import SearchLoadingIndicator from '../../components/Feed/SearchLoadingIndicator.jsx';
import { useState } from 'react';

const SearchCampusPostPage = () => {
  const [hasInput, setHasInput] = useState(false);

  // 입력 값 변화 핸들러
  const handleInputChange = value => {
    setHasInput(value.length > 0);
  };

  return (
    <FeedWrapper boardContent={<PostSearchBar onInputChange={handleInputChange} />}>
      <ColumnLayoutWrapper mainArea={hasInput ? <Posts posts={dummyNoticeData} /> : <SearchLoadingIndicator />} />
    </FeedWrapper>
  );
};

export default SearchCampusPostPage;
