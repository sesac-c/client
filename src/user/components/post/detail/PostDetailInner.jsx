import { useEffect, useState } from 'react';

import Division from '../../../../common/components/common/UI/Division.jsx';
import ReplyInput from './ReplyInput.jsx';
import ReplyList from './ReplyList.jsx';
import PostLikeButton from './PostLikeButton.jsx';
import PostAuthor from './PostAuthor.jsx';
import { PostContent, PostImage } from './PostContent.jsx';

import { dummyPostData } from '../../../services/mockData/post';

const PostDetailInner = ({ postId }) => {
  const [post, setPost] = useState(null);

  useEffect(() => {
    // dummy data
    const selectedPost = dummyPostData.find(post => post.id === postId);
    setPost(selectedPost);
  }, [postId]);

  return (
    <div className='postdetail-container'>
      {post && (
        <>
          <div className='postdetail__side-container page'>
            {/* 좌 */}
            <div className='postdetail__left-side page'>
              {post.image !== null && (
                <>
                  <PostImage image={post.image} isPage />
                  <Division type='horizontal_custom' variant='custom' className='postdetail__left-side__division' />
                </>
              )}
              <PostContent post={post} hasImage={post.image !== null} isPage />
            </div>

            {/* 우 */}
            <div className='postdetail__right-side page'>
              <PostAuthor user={post.user} isPage />
              <div className='postdetail__reply-container page'>
                <ReplyList postId={postId} />
              </div>
              <div className='postdetail__reply-input-container page'>
                <PostLikeButton like={post.like} />
                <ReplyInput />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PostDetailInner;
