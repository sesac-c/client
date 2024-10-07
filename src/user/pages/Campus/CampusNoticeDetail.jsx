import { useParams } from 'react-router-dom';

import NoticeDetailInner from '@/user/components/notice/detail/NoticeDetailInner';
import { NOTICES_ALL_API_URL } from '@/common/constants';

const CampusPostDetailPage = () => {
  const params = useParams();
  const noticeId = +params.noticeId;
  return (
    <div className='main-container'>
      <NoticeDetailInner noticeId={noticeId} apiUrl={NOTICES_ALL_API_URL} />
    </div>
  );
};

export default CampusPostDetailPage;
