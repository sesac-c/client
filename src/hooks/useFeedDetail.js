import { useEffect, useState, useCallback } from 'react';
import { useModal } from '@/hooks';
import { fetchFeed } from '@/services/api/feeds';
import { FEED_ROOT_API_URL, IMAGE_API_URL } from '@/constants';
import ModifyModal from '@/components/feed/modify/ModifyModal';

export const useFeedDetail = (feedId, feedType, category, from = 'list') => {
  const [feed, setFeed] = useState(null);
  const [isReplyUpdate, setIsReplyUpdate] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const apiUrl = FEED_ROOT_API_URL(feedType, category);
  const backPagePath = from === 'list' ? `/feed/${category}/${feedType}s` : backPagePath;

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
          profileImage: IMAGE_API_URL(data.profileImage),
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

  const handleReplyUpdate = condition => {
    setIsReplyUpdate(condition);
  };

  return {
    feed,
    isReplyUpdate,
    isLoading,
    isUpdating,
    apiUrl,
    backPagePath,
    openModal,
    handleReplyUpdate
  };
};
