import { useEffect, useState } from 'react';

import Division from '@/common/components/common/UI/Division';
import ReplyInput from './ReplyInput.jsx';
import ReplyList from './ReplyList.jsx';
import NoticeLikeButton from './NoticeLikeButton.jsx';
import NoticeAuthor from './NoticeAuthor';
import { NoticeContent, NoticeImage } from './NoticeContent';

import { IMAGE_UPLOAD_API_URL } from '@/common/constants';
import { fetchNotice } from '@/user/services/api/notices';

const NoticeDetailInner = ({ noticeId, apiUrl }) => {
  const [notice, setNotice] = useState(null);

  const loadNotice = async () => {
    try {
      const response = await fetchNotice(noticeId, apiUrl);
      const { data } = response;
      console.log(data);
      setNotice({
        ...data,
        image: data.imageUrl,
        user: {
          profileImage: data.profileImage,
          campusName: data.campusName,
          nickname: data.nickname
        },
        like: {
          status: data.likesStatus,
          count: data.likesCount
        }
      });
    } catch (error) {
      console.error('Failed to fetch notice:', error);
    }
  };

  const imageUrl = image => {
    return `${IMAGE_UPLOAD_API_URL}/${image}`;
  };

  useEffect(() => {
    loadNotice();
  }, []);

  return (
    <div className='postdetail-container'>
      {notice && (
        <>
          <div className='postdetail__side-container page'>
            {/* 좌 */}
            <div className='postdetail__left-side page'>
              {notice.image !== null && (
                <>
                  <NoticeImage image={imageUrl(notice.image)} isPage />
                  <Division type='horizontal_custom' variant='custom' className='postdetail__left-side__division' />
                </>
              )}
              <NoticeContent notice={notice} hasImage={notice.image !== null} isPage />
            </div>
            {/* 우 */}
            <div className='postdetail__right-side page'>
              <NoticeAuthor user={notice.user} isPage />
              {
                <div className='postdetail__reply-container page'>
                  <ReplyList noticeId={noticeId} apiUrl={apiUrl} />
                </div>
              }
              <div className='postdetail__reply-input-container page'>
                <NoticeLikeButton like={notice.like} noticeId={noticeId} />
                <ReplyInput noticeId={noticeId} apiUrl={apiUrl} />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NoticeDetailInner;
