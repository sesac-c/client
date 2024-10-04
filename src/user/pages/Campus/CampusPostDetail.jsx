import { useParams } from 'react-router-dom';

import PostDetailInner from '@/user/components/post/detail/PostDetailInner.jsx';
import { POSTS_CAMPUS_API_URL } from '@/common/constants';

const CampusPostDetailPage = () => {
  const params = useParams();
  const postId = +params.postId;
  return (
    <div className='main-container'>
      <PostDetailInner postId={postId} apiUrl={POSTS_CAMPUS_API_URL} />
    </div>
  );
};

export default CampusPostDetailPage;
