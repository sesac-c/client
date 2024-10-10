import { useParams } from 'react-router-dom';

import PostDetailInner from '../../components/post/detail/PostDetailInner.jsx';
import { POSTS_ALL_API_URL } from '@/common/constants';

const AllPostDetailPage = () => {
  const params = useParams();
  const postId = +params.postId;
  return (
    <div className='main-container'>
      <PostDetailInner postId={postId} apiUrl={POSTS_ALL_API_URL} />
    </div>
  );
};

export default AllPostDetailPage;
