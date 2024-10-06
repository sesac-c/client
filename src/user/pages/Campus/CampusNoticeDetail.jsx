import { useParams } from 'react-router-dom';

import PostDetailInner from '@/user/components/post/detail/PostDetailInner.jsx';
import { NOTICES_ALL_API_URL } from '@/common/constants';

const CampusPostDetailPage = () => {
  const params = useParams();
  const noticeId = +params.noticeId;
  return (
    <div className='main-container'>
      <PostDetailInner postId={noticeId} apiUrl={NOTICES_ALL_API_URL} />
    </div>
  );
};

export default CampusPostDetailPage;
