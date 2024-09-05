import { useState } from 'react';

import FeedWrapper from '../../components/common/layout/FeedWrapper.jsx';
import ColumnLayoutWrapper from '../../components/common/layout/ColumnLayoutWrapper.jsx';
import Posts from '../../components/post/Posts.jsx';
import PostSearchBar from '../../components/post/search/PostSearchBar.jsx';
import SearchLoadingIndicator from '../../components/post/search/SearchLoadingIndicator.jsx';

import { dummyNoticeData } from '../../_mock';

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
