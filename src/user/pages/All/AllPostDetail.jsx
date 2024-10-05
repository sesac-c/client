import { useParams } from 'react-router-dom';

import PostDetailInner from '../../components/post/detail/PostDetailInner.jsx';

const AllPostDetailPage = () => {
  const params = useParams();
  const postId = +params.postId;
  return (
    <div className='main-container'>
      <PostDetailInner postId={postId} />
    </div>
  );
};

export default AllPostDetailPage;
