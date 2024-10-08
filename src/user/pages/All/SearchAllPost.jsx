import { useState } from 'react';

import FeedWrapper from '@/user/components/common/layout/FeedWrapper.jsx';
import ColumnLayoutWrapper from '@/user/components/common/layout/ColumnLayoutWrapper.jsx';
import Posts from '@/user/components/post/Posts.jsx';
import PostSearchBar from '@/user/components/post/search/PostSearchBar.jsx';
import SearchLoadingIndicator from '@/user/components/post/search/SearchLoadingIndicator.jsx';

import { POSTS_ALL_API_URL } from '@/common/constants';

const SearchCampusPostPage = () => {
  const [hasInput, setHasInput] = useState(false);

  // 입력 값 변화 핸들러
  const handleInputChange = value => {
    setHasInput(value.length > 0);
  };

  return (
    <FeedWrapper boardContent={<PostSearchBar onInputChange={handleInputChange} />}>
      <ColumnLayoutWrapper
        mainArea={hasInput ? <Posts apiUrl={POSTS_ALL_API_URL} feedType={'all'} /> : <SearchLoadingIndicator />}
      />
    </FeedWrapper>
  );
};

export default SearchCampusPostPage;
