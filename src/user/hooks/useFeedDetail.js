import { useEffect, useState, useCallback } from 'react';
import { useModal } from '@/common/hooks';
import { fetchFeed } from '@/user/services/api/feeds';
import { IMAGE_UPLOAD_API_URL, FEED_ROOT_API_URL } from '@/common/constants';
import ModifyModal from '@/user/components/feed/modify/ModifyModal';


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

    const handleReplyUpdate = (condition) => {
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
        imageUrl,
        handleReplyUpdate
    };
};