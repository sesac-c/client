import PropTypes from 'prop-types';

import { HeartIcon } from '@heroicons/react/20/solid';
import { ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/outline';

import { useNavigateHandler } from '../../hooks/common/useNavigateHandler';

import { dummyPostData } from '../../services/mockData/post';
import { formatDateToKorean } from '../../utils/formatter';

const Post = ({ post, user }) => {
  const formattedDate = formatDateToKorean(post.createdAt);

  return (
    <div className='post'>
      <div className='post-container'>
        {post.image && (
          <div className='post-image'>
            <img src={post.image} alt='post url' />
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
                    <span className='action-count'>{post.likeCount}</span>
                  </div>
                </div>
                <div className='meta-info'>
                  <div className='meta-item'>
                    <span className='meta-text nickname'>{user.nickname}</span>
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

const Posts = ({ posts = dummyPostData }) => {
  // TODO: dummyPostData 삭제
  if (posts === undefined || posts.length < 0) {
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
        image: PropTypes.string
      }).isRequired,
      user: PropTypes.shape({
        nickname: PropTypes.string.isRequired
      }).isRequired
    })
  )
};

export default Posts;
