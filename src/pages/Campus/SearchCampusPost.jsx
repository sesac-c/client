import { useState } from 'react';

import Posts from '@/components/feed/Posts.jsx';
import PostSearchBar, { SearchLoadingIndicator } from '@/components/feed/PostSearchBar.jsx';
import { FEED_ROOT_API_URL, FEED_TYPE, POST_TYPE } from '@/constants';
import ColumnLayoutWrapper from '@/components/user/layout/ColumnLayoutWrapper';
import FeedWrapper from '@/components/user/layout/FeedWrapper';

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
          <div>
            <div className={hasInput ? 'visible' : 'hidden'}>
              <Posts apiUrl={FEED_ROOT_API_URL(FEED_TYPE.POST, POST_TYPE.CAMPUS)} feedType={'campus'} />
            </div>
            {!hasInput && <SearchLoadingIndicator />}
          </div>
        }
      />
    </FeedWrapper>
  );
};

export default SearchCampusPostPage;
