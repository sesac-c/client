import { useLocation, useParams } from 'react-router-dom';
import DetailInner from '@/user/components/feed/detail/DetailInner';
import { FEED_TYPE, POST_TYPE } from '@/common/constants';

const AllPostDetailPage = () => {
  const params = useParams();
  const postId = +params.postId;
  const location = useLocation();

  return (
    <div className='main-container'>
      <DetailInner feedId={postId} category={POST_TYPE.ALL} feedType={FEED_TYPE.POST} />
    </div>
  );
};

export default AllPostDetailPage;
