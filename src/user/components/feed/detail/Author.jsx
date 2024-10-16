import { useNavigate } from 'react-router-dom';
import { XMarkIcon } from '@heroicons/react/24/outline';
import ProfileImage from '@/common/components/common/layout/ProfileImage';
import { PROFILE_PATH } from '@/common/constants';

const Author = ({ addToolTip, user, onClose, isPage }) => {
  const navigate = useNavigate();
  return (
    <div className={`postdetail__author-container ${isPage && 'page'}`}>
      <div className='postdetail__author-inner'>
        <div className='postdetail__author-profile-image' onClick={() => navigate(`${PROFILE_PATH}/${user.id}`)}>
          <ProfileImage image={user.profileImage} />
        </div>
        <div className={`postdetail__author-info ${isPage && 'page'}`}>
          <p className='postdetail__author-extra-info-wrap'>
            <span className={`postdetail__author-campus-name ${isPage && 'page'}`}>{user.campusName}</span>
            <span className={`postdetail__author-nickname ${isPage && 'page'}`}>{user.nickname}</span>
            {addToolTip}
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

export default Author;
