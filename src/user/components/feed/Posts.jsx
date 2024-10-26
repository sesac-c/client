import PropTypes from 'prop-types';

import { HeartIcon } from '@heroicons/react/20/solid';
import { ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/outline';

import { useNavigateHandler } from '@/common/hooks';

import { formatDateToKorean } from '@/common/utils/formatter';
import useWritePostStore from '@/user/store/writePostStore';

import React, { useCallback, useEffect, useState, useRef } from 'react';
import { IMAGE_API_URL } from '@/common/constants';
import useSearchPostStore from '@/user/store/searchPostStore';
import { LinearProgress } from '@mui/material';
import Logo from '@/common/components/common/layout/Logo';

const Post = ({ post, feedType }) => {
  const formattedDate = formatDateToKorean(post.createdAt);

  return (
    <div className='post'>
      <div className='post-container'>
        {post.thumbnail && (
          <div className='post-image'>
            <img src={IMAGE_API_URL(post.thumbnail)} alt='post url' />
          </div>
        )}
        <div className='post-content' onClick={useNavigateHandler(`/feed/${feedType}/posts/${post.id}`)}>
          <div className='post-main'>
            <div className='post-header'>
              <div className='post-title'>
                <p className='title-text'>{post.title}</p>
              </div>
              <div className='post-meta'>
                <div className='post-actions'>
                  <div className='action-item'>
                    <ChatBubbleBottomCenterTextIcon className='comment-icon' />
                    <span className='action-count'>{post.replyCount}</span>
                  </div>
                  <div className='action-item'>
                    <HeartIcon className='favorite-icon' />
                    <span className='action-count'>{post.likesCount}</span>
                  </div>
                </div>
                <div className='meta-info'>
                  <div className='meta-item'>
                    <span className='meta-text nickname'>{post.nickname}</span>
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
                <p className='description-text'>{post.content}</p>
              </div>
            </div>
          </div>
          {post.hashtags && post.hashtags.length > 0 && (
            <div className='post-hashtags'>
              {post.hashtags.map((hashtag, index) => (
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

const Posts = ({ apiUrl, feedType }) => {
  const [isPostLoading, setIsPostLoading] = useState(true);
  const loader = useRef(null);
  const { isPostUpdate, setIsPostUpdate } = useWritePostStore();
  const { isLoading, posts, page, hasMore, keyword, setApiUrl, loadPosts, resetStore } = useSearchPostStore();

  useEffect(() => {
    setApiUrl(apiUrl);
  }, [apiUrl, setApiUrl]);

  const getInitailPost = async () => {
    try {
      setIsPostLoading(true);
      await loadPosts();
    } catch (error) {
      console.error(error);
    } finally {
      setIsPostLoading(false);
    }
  };

  useEffect(() => {
    getInitailPost();
  }, [apiUrl, keyword]); // 초기 로딩

  const handleObserver = entries => {
    const target = entries[0];
    if (target.isIntersecting && hasMore && !isLoading) {
      loadPosts();
    }
  };

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

  useEffect(() => {
    if (isPostUpdate) {
      resetStore();
      loadPosts();
      setIsPostUpdate(false);
    }
  }, [isPostUpdate, resetStore, loadPosts, setIsPostUpdate]);

  if (!isPostLoading) {
    if (!posts || posts.length === 0) {
      return <p className='text-center'>등록된 게시글이 없습니다.</p>;
    } else {
      return (
        <div className='posts-container'>
          {posts.map(post => (
            <Post key={`${post.id}-${post.createdAt}`} post={post} feedType={feedType} />
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
};

Posts.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      post: PropTypes.shape({
        title: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        commentsCount: PropTypes.number.isRequired,
        likesCount: PropTypes.number.isRequired,
        description: PropTypes.string.isRequired,
        hashtags: PropTypes.arrayOf(PropTypes.string),
        thumbnail: PropTypes.string
      }).isRequired,
      user: PropTypes.shape({
        nickname: PropTypes.string.isRequired
      }).isRequired
    })
  )
};

export default Posts;
