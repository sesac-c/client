import { HeartIcon } from '@heroicons/react/20/solid';
import { ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/outline';

import { useNavigateHandler } from '@/common/hooks';
import { formatDateToKorean } from '@/common/utils/formatter';
import { IMAGE_UPLOAD_API_URL } from '@/common/constants';
import { fetchNotices } from '@/user/services/api/notices';

import React, { useCallback, useEffect, useState, useRef } from 'react';

const Notice = ({ notice }) => {
  const formattedDate = formatDateToKorean(notice.createdAt);

  return (
    <div className='post'>
      <div className='post-container'>
        {notice.thumbnail && (
          <div className='post-image'>
            <img src={thumbnailUrl(notice.thumbnail)} alt='post url' />
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

const Notices = ({ feedType }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [notices, setNotices] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const loader = useRef(null);

  const loadNotices = useCallback(async () => {
    if (isLoading || !hasMore) {
      return;
    }

    setIsLoading(true);
    try {
      const { newNotices, last } = await fetchNotices({ page, size: 3 }, feedType);
      setNotices(notices.concat(newNotices));
      setPage(prevPage => prevPage + 1);
      setHasMore(!last);
    } catch (error) {
      console.error('Failed to fetch notices:', error);
      setHasMore(false);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, hasMore, page]);

  const handleObserver = useCallback(
    entries => {
      const target = entries[0];
      if (target.isIntersecting && hasMore) {
        loadNotices();
      }
    },
    [loadNotices, hasMore]
  );

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: '20px',
      threshold: 0
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) {
      observer.observe(loader.current);
    }
    return () => {
      if (loader.current) {
        observer.unobserve(loader.current);
      }
    };
  }, [handleObserver]);

  useEffect(() => {
    loadNotices();
  }, []);

  if (!notices || notices.length === 0) {
    return <p className='text-center'>등록된 게시글이 없습니다.</p>;
  }

  return (
    <div className='notices-container'>
      {notices.map(notice => (
        <Notice key={`${notice.id}-${notice.createdAt}`} notice={notice} />
      ))}
      {isLoading && <p className='text-center'>Loading...</p>}
      {hasMore && <div ref={loader} style={{ height: '20px' }} />}
      {!hasMore && <p className='text-center'>모든 게시글을 불러왔습니다.</p>}
    </div>
  );
};

export default Notices;
