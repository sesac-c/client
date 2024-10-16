import { useEffect, useState, useCallback } from 'react';

import { useModal } from '@/common/hooks';
import { CircularProgress } from '@mui/material';

import AddTooltip from './AddMenu';
import ReplyInput from '../reply/ReplyInput';
import ReplyList from '../reply/ReplyList.jsx';
import LikeButton from './LikeButton';
import Author from './Author.jsx';
import ModifyModal from '../modify/ModifyModal';

import Division from '@/common/components/common/UI/Division';

import { IMAGE_UPLOAD_API_URL, FEED_ROOT_API_URL } from '@/common/constants';
import { fetchFeed } from '@/user/services/api/feeds';
import { Content, Image } from './Content';

const DetailInner = ({ feedId, feedType, category }) => {
  const [feed, setFeed] = useState(null);
  const [isReplyUpdate, setIsReplyUpdate] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const apiUrl = FEED_ROOT_API_URL(feedType, category);
  const listPagePath = `/feed/${category}/${feedType}s`;

  const { openModal, closeModal } = useModal(() => {
    const handleClose = useCallback(changes => {
      setIsUpdating(true);
      setTimeout(() => {
        setFeed(prevState => ({
          ...prevState,
          ...changes
        }));
        setIsUpdating(false);
      }, 700);
    }, []);
    return (
      <ModifyModal
        apiUrl={apiUrl}
        feed={feed}
        onChange={changes => {
          handleClose(changes);
        }}
        onClose={closeModal}
      />
    );
  });

  const imageUrl = image => {
    return `${IMAGE_UPLOAD_API_URL}/${image}`;
  };
  const loadFeed = async () => {
    setIsLoading(true);
    try {
      const response = await fetchFeed(feedId, apiUrl);
      const { data } = response;
      setFeed({
        ...data,
        isMine: data.isPostMine || data.isNoticeMine,
        image: data.imageUrl,
        user: {
          id: data.userId,
          profileImage: imageUrl(data.profileImage),
          campusName: data.campusName,
          nickname: data.nickname
        },
        like: {
          status: data.likesStatus,
          count: data.likesCount
        }
      });
    } catch (error) {
      console.error('Failed to fetch feed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadFeed();
  }, []);

  function handleReplyUpdate(condition) {
    setIsReplyUpdate(condition);
  }

  if (isLoading || isUpdating) {
    return (
      <div
        className='loading-container'
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}
      >
        <CircularProgress color='success' />
      </div>
    );
  }

  return (
    <div className='postdetail-container'>
      {feed && (
        <>
          <div className='postdetail__side-container page'>
            {/* 좌 */}
            <div className='postdetail__left-side page'>
              {feed.image !== null && (
                <>
                  <Image image={imageUrl(feed.image)} isPage />
                  <Division type='horizontal_custom' variant='custom' className='postdetail__left-side__division' />
                </>
              )}
              <Content feed={feed} hasImage={feed.image !== null} isPage />
            </div>
            {/* 우 */}
            <div className='postdetail__right-side page'>
              <Author
                addToolTip={
                  feed.isMine && (
                    <AddTooltip {...{ apiUrl, feedId, feedType, listPagePath }} openModifyModal={openModal} />
                  )
                }
                user={feed.user}
                isPage
              />
              <div className='postdetail__reply-container page'>
                <ReplyList feedId={feedId} apiUrl={apiUrl} isUpdate={isReplyUpdate} onUpdate={handleReplyUpdate} />
              </div>
              <div className='postdetail__reply-input-container page'>
                <LikeButton like={feed.like} {...{ feedId, apiUrl }} />
                <ReplyInput feedId={feedId} apiUrl={apiUrl} onUpdate={handleReplyUpdate} />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DetailInner;
