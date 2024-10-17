import { useParams } from 'react-router-dom';
import DetailInner from '@/user/components/feed/detail/DetailInner';
import { FEED_TYPE, POST_TYPE } from '@/common/constants';

const CampusPostDetailPage = () => {
  const params = useParams();
  const postId = +params.postId;
  return (
    <div className='main-container'>
      <DetailInner feedId={postId} category={POST_TYPE.CAMPUS} feedType={FEED_TYPE.POST} />
    </div>
  );
};

export default CampusPostDetailPage;
