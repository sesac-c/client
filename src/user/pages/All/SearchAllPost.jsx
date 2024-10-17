import { useState } from 'react';

import FeedWrapper from '@/user/components/common/layout/FeedWrapper.jsx';
import ColumnLayoutWrapper from '@/user/components/common/layout/ColumnLayoutWrapper.jsx';
import Posts from '@/user/components/feed/Posts.jsx';
import PostSearchBar, { SearchLoadingIndicator } from '@/user/components/feed/PostSearchBar.jsx';

import { FEED_ROOT_API_URL, FEED_TYPE, POST_TYPE } from '@/common/constants';

const SearchCampusPostPage = () => {
  const [hasInput, setHasInput] = useState(false);

  // 입력 값 변화 핸들러
  const handleInputChange = value => {
    setHasInput(value.length > 0);
  };

  return (
    <FeedWrapper boardContent={<PostSearchBar onInputChange={handleInputChange} />}>
      <ColumnLayoutWrapper
        mainArea={
          hasInput ? (
            <Posts apiUrl={FEED_ROOT_API_URL(FEED_TYPE.POST, POST_TYPE.ALL)} feedType={'all'} />
          ) : (
            <SearchLoadingIndicator />
          )
        }
      />
    </FeedWrapper>
  );
};

export default SearchCampusPostPage;
