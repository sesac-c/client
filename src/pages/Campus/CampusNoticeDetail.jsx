import { useParams } from 'react-router-dom';
import DetailInner from '@/components/feed/detail/DetailInner';
import { FEED_TYPE, NOTICE_TYPE } from '@/constants';

const CampusNoticeDetailPage = () => {
  const params = useParams();
  const noticeId = +params.noticeId;
  return (
    <div className='main-container'>
      <DetailInner feedId={noticeId} category={NOTICE_TYPE.CAMPUS} feedType={FEED_TYPE.NOTICE} />
    </div>
  );
};

export default CampusNoticeDetailPage;
