import { createPortal } from 'react-dom';

import ReplyInput from './ReplyInput.jsx';
import ReplyList from './ReplyList.jsx';
import { Content, Image } from './Content.jsx';
import LikeButton from './LikeButton.jsx';
import Author from './Author.jsx';

const DetailModal = ({ feed, onClose, open = true }) => {
  const handleOverlayClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!open) {
    return null;
  }

  return createPortal(
    <div className='modal-overlay' onClick={handleOverlayClick}>
      <div className='postdetailmodal'>
        {feed && (
          <>
            <Author user={feed.user} onClose={onClose} />

            {/* 좌, 우 */}
            <div className='postdetail__side-container'>
              {feed.image !== null && (
                <div className='postdetail__left-side'>
                  <Image image={feed.image} />
                </div>
              )}
              <div className='postdetail__right-side'>
                <Content feed={feed} hasImage={feed.image !== null} />
              </div>
            </div>
            <div className='postdetail__reply-container'>
              <ReplyList feedId={feedId} />
            </div>
            <div className='postdetail__reply-input-container'>
              <LikeButton like={feed.like} />
              <ReplyInput />
            </div>
          </>
        )}
      </div>
    </div>,
    document.getElementById('modal')
  );
};

export default DetailModal;
