import { useState } from 'react';

import Posts from '@/components/feed/Posts.jsx';
import FeedWrapper from '@/components/user/layout/FeedWrapper';
import ColumnLayoutWrapper from '@/components/user/layout/ColumnLayoutWrapper';
import PostSearchBar, { SearchLoadingIndicator } from '@/components/feed/PostSearchBar';

import { FEED_ROOT_API_URL, FEED_TYPE, POST_TYPE } from '@/constants';

const SearchAllPostPage = () => {
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

export default SearchAllPostPage;
