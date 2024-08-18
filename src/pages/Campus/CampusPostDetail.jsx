import { useParams } from 'react-router-dom';
import PostDetailInner from '../../components/Feed/posts/detail/PostDetailInner.jsx';

const CampusPostDetailPage = () => {
  const params = useParams();
  const postId = +params.postId;
  return (
    <div className='main-container'>
      <PostDetailInner postId={postId} />
    </div>
  );
};

export default CampusPostDetailPage;
