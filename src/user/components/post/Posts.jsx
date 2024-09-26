import PropTypes from 'prop-types';

import { HeartIcon } from '@heroicons/react/20/solid';
import { ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/outline';

import { useNavigateHandler } from '../../../common/hooks';

import { formatDateToKorean } from '../../../common/utils/formatter';
import { postsCampusList } from '../../services/api/posts.js';
import useWritePostStore from '../../store/writePostStore';
import { useCallback, useEffect } from 'react';

const Post = ({ post }) => {
  const formattedDate = formatDateToKorean(post.createdAt);

  return (
    <div className='post'>
      <div className='post-container'>
        {post.thumbnail && (
          <div className='post-image'>
            <img src={thumbnailUrl(post.thumbnail)} alt='post url' />
          </div>
        )}
        <div className='post-content' onClick={useNavigateHandler(`./${post.id}`)}>
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

const thumbnailUrl = thumbnail => {
  return `${process.env.REACT_APP_API_BASE_URL}view/${thumbnail}`;
};

const Posts = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  // const [currentPage, setCurrentPage] = React.useState({
  //   pageNumber: 0,
  //   pageSize: 10,
  //   totalElements: 0,
  //   totalPages: 0,
  //   last: false
  // });

  const [posts, setPosts] = React.useState([]);

  const { isPostUpdate, setIsPostUpdate } = useWritePostStore();

  const loadPosts = useCallback(async params => {
    setIsLoading(true);
    try {
      const response = await postsCampusList(params);
      const { data } = response;

      setPosts(
        data.map(post => ({
          id: post.id,
          title: post.title,
          nickname: post.writer,
          content: post.content,
          likesCount: post.likesCount,
          replyCount: post.replyCount,
          hashtags: post.tags,
          createdAt: post.createdAt,
          thumbnail: post.thumbnail
        }))
      );
    } catch (error) {
      console.error('Failed to fetch posts:', error);
      // 에러 처리 로직 추가
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isPostUpdate) {
      loadPosts({
        page: 0,
        size: 10
      });
      setIsPostUpdate(false);
    }
  }, [isPostUpdate, loadPosts, setIsPostUpdate]);

  useEffect(() => {
    loadPosts({
      page: 0,
      size: 10
    });
  }, [loadPosts]);

  if (isLoading) {
    return <p className='text-center'>Loading...</p>;
  }

  if (!posts || posts.length === 0) {
    return <p className='text-center'>등록된 게시글이 없습니다.</p>;
  }
  return (
    <div className='posts-container'>
      {posts.map((post, index) => (
        <Post key={index} post={post} user={post.user} />
      ))}
    </div>
  );
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
