import { HeartIcon as NotFilledHeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as FilledHeartIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';
import { postLikes, postLikesCancel } from '../../../../user/services/api/posts';

const PostLikeButton = ({ like, postId }) => {
  const [status, setStatus] = useState(like.status);
  const [count, setCount] = useState(like.count);
  const [flag, setFlag] = useState(status ? -1 : 1);

  const handleLike = async e => {
    e.preventDefault();
    e.stopPropagation();

    if (flag > 0) {
      await postLikes(postId);
    } else {
      await postLikesCancel(postId);
    }

    setStatus(!status);
    setCount(flag * 1 + count);
    setFlag(flag * -1);
  };

  return (
    <div className='postdetail__options'>
      <h3 className='visually-hidden'>좋아요, 댓글</h3>
      <ul className='postdetail__options-list'>
        <li className='postdetail__options-item' onClick={handleLike}>
          <span className='visually-hidden'>좋아요</span>
          {status ? (
            <FilledHeartIcon className='postdetail__options-like-icon' />
          ) : (
            <NotFilledHeartIcon className='postdetail__options-like-icon' />
          )}

          <span className='postdetail__options-like-count'>{count}</span>
        </li>
      </ul>
    </div>
  );
};

export default PostLikeButton;
