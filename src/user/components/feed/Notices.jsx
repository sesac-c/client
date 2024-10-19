import { HeartIcon } from '@heroicons/react/20/solid';
import { ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/outline';

import { useNavigateHandler } from '@/common/hooks';
import { formatDateToKorean } from '@/common/utils/formatter';
import { FEED_ROOT_API_URL, FEED_TYPE, IMAGE_UPLOAD_API_URL, NOTICE_TYPE } from '@/common/constants';
import useSearchNoticeStore from '@/user/store/useSearchNoticeStore';

import React, { useCallback, useEffect, useState, useRef } from 'react';
import { LinearProgress } from '@mui/material';
import Logo from '@/common/components/common/layout/Logo';

const Notice = ({ notice, feedType }) => {
  const formattedDate = formatDateToKorean(notice.createdAt);

  return (
    <div className='post'>
      <div className='post-container'>
        {notice.thumbnail && (
          <div className='post-image'>
            <img src={thumbnailUrl(notice.thumbnail)} alt='notice thumbnail' />
          </div>
        )}
        <div className='post-content' onClick={useNavigateHandler(`./${notice.id}`)}>
          <div className='post-main'>
            <div className='post-header'>
              <div className='post-title'>
                <p className='title-text'>{notice.title}</p>
              </div>
              <div className='post-meta'>
                <div className='post-actions'>
                  <div className='action-item'>
                    <ChatBubbleBottomCenterTextIcon className='comment-icon' />
                    <span className='action-count'>{notice.replyCount}</span>
                  </div>
                  <div className='action-item'>
                    <HeartIcon className='favorite-icon' />
                    <span className='action-count'>{notice.likesCount}</span>
                  </div>
                </div>
                <div className='meta-info'>
                  <div className='meta-item'>
                    <span className='meta-text nickname'>{notice.nickname}</span>
                  </div>
                  <div className='meta-separator' />
                  <div className='meta-item'>
                    <span className='meta-text'>{formattedDate}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className='post-body'>
              <div className='post-description'>
                <p className='description-text'>{notice.content}</p>
              </div>
            </div>
          </div>
          {notice.hashtags && notice.hashtags.length > 0 && (
            <div className='post-hashtags'>
              {notice.hashtags.map((hashtag, index) => (
                <div key={index} className='hashtag-item'>
                  <span className='hashtag-text'>#{hashtag}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const thumbnailUrl = thumbnail => {
  return `${IMAGE_UPLOAD_API_URL}/${thumbnail}`;
};

const Notices = ({ apiUrl, feedType }) => {
  const [isNoticeLoading, setIsNoticeLoading] = useState(true);
  const loader = useRef(null);
  const { isLoading, notices, page, hasMore, keyword, setApiUrl, loadNotices, resetStore } = useSearchNoticeStore();

  useEffect(() => {
    setApiUrl(FEED_ROOT_API_URL(FEED_TYPE.NOTICE, feedType));
  }, [apiUrl, setApiUrl]);

  const getInitialNotices = async () => {
    try {
      setIsNoticeLoading(true);
      await loadNotices();
    } catch (error) {
      console.error(error);
    } finally {
      setIsNoticeLoading(false);
    }
  };

  useEffect(() => {
    getInitialNotices();
  }, [apiUrl, keyword]); // 초기 로딩

  const handleObserver = useCallback(
    entries => {
      const target = entries[0];
      if (target.isIntersecting && hasMore && !isLoading) {
        loadNotices();
      }
    },
    [hasMore, isLoading, loadNotices]
  );

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: '20px',
      threshold: 0
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);
    return () => {
      if (loader.current) observer.unobserve(loader.current);
    };
  }, [handleObserver]);

  if (!isNoticeLoading) {
    if (!notices || notices.length === 0) {
      return <p className='text-center'>등록된 공지사항이 없습니다.</p>;
    } else {
      return (
        <div className='notices-container'>
          {notices.map(notice => (
            <Notice key={`${notice.id}-${notice.createdAt}`} notice={notice} feedType={feedType} />
          ))}
          {isLoading && <LinearProgress color='success' />}
          {hasMore && <div ref={loader} style={{ height: '20px' }} />}
          {!hasMore && (
            <p className='mt-5 flex w-full items-center justify-center'>
              <Logo size='small' />
            </p>
          )}
        </div>
      );
    }
  }

  return <LinearProgress color='success' />;
};

export default Notices;
