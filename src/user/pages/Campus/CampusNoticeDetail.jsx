import { useParams } from 'react-router-dom';
import DetailInner from '@/user/components/feed/detail/DetailInner';
import { FEED_TYPE, NOTICE_TYPE } from '@/common/constants';

const CampusPostDetailPage = () => {
  const params = useParams();
  const noticeId = +params.noticeId;
  return (
    <div className='main-container'>
      <DetailInner feedId={noticeId} category={NOTICE_TYPE.CAMPUS} feedType={FEED_TYPE.NOTICE} />
    </div>
  );
};

export default CampusPostDetailPage;
