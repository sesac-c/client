import { XMarkIcon } from '@heroicons/react/24/outline';

import ProfileImage from '@/common/components/common/layout/ProfileImage';

const NoticeAuthor = ({ user, onClose, isPage }) => {
  return (
    <div className={`postdetail__author-container ${isPage && 'page'}`}>
      <div className='postdetail__author-inner'>
        <div className='postdetail__author-profile-image'>
          <ProfileImage image={user.ProfileImage} />
        </div>
        <div className={`postdetail__author-info ${isPage && 'page'}`}>
          <p className='postdetail__author-extra-info-wrap'>
            <span className={`postdetail__author-campus-name ${isPage && 'page'}`}>{user.campusName}</span>
            <span className={`postdetail__author-nickname ${isPage && 'page'}`}>{user.nickname}</span>
          </p>
        </div>
        {onClose !== undefined && (
          <button onClick={onClose}>
            <XMarkIcon className='h-8 w-8 text-white' />
          </button>
        )}
      </div>
    </div>
  );
};

export default NoticeAuthor;
