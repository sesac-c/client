import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import ReplyInput from './ReplyInput.jsx';
import ReplyList from './ReplyList.jsx';
import PostLikeButton from './PostLikeButton.jsx';
import PostAuthor from './PostAuthor.jsx';
import { PostContent, PostImage } from './PostContent.jsx';

import { dummyPostData } from '../../../services/mockData/post';

const PostDetailModal = ({ postId, onClose, open = true }) => {
  const [post, setPost] = useState(null);
  useEffect(() => {
    // dummy data
    const selectedPost = dummyPostData.find(post => post.id === postId);
    setPost(selectedPost);
  }, [postId]);

  const handleOverlayClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!open) return null;

  return createPortal(
    <div className='modal-overlay' onClick={handleOverlayClick}>
      <div className='postdetailmodal'>
        {post && (
          <>
            <PostAuthor user={post.user} onClose={onClose} />

            {/* 좌, 우 */}
            <div className='postdetail__side-container'>
              {post.image !== null && (
                <div className='postdetail__left-side'>
                  <PostImage image={post.image} />
                </div>
              )}
              <div className='postdetail__right-side'>
                <PostContent post={post} hasImage={post.image !== null} />
              </div>
            </div>
            <div className='postdetail__reply-container'>
              <ReplyList postId={postId} />
            </div>
            <div className='postdetail__reply-input-container'>
              <PostLikeButton like={post.like} />
              <ReplyInput />
            </div>
          </>
        )}
      </div>
    </div>,
    document.getElementById('modal')
  );
};

export default PostDetailModal;
