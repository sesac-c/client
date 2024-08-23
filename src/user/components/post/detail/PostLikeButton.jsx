import { HeartIcon as NotFilledHeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as FilledHeartIcon } from '@heroicons/react/20/solid';

const PostLikeButton = ({ like }) => {
  return (
    <div className='postdetail__options'>
      <h3 className='visually-hidden'>좋아요, 댓글</h3>
      <ul className='postdetail__options-list'>
        <li className='postdetail__options-item'>
          <span className='visually-hidden'>좋아요</span>
          {like.status ? (
            <FilledHeartIcon className='postdetail__options-like-icon' />
          ) : (
            <NotFilledHeartIcon className='postdetail__options-like-icon' />
          )}

          <span className='postdetail__options-like-count'>{like.count}</span>
        </li>
      </ul>
    </div>
  );
};

export default PostLikeButton;
