import PropTypes from 'prop-types';

import ProfileImage from '../../../common/components/common/layout/ProfileImage';
import { IMAGE_UPLOAD_API_URL, PROFILE_PATH } from '@/common/constants';
import { useNavigate } from 'react-router-dom';

const UserItem = ({ user, isModal = false, onClose, className }) => {
  const naviate = useNavigate();
  const { id, profileImage, nickname, description, buttonText, buttonColor, onClick } = user;

  const handleClick = () => {
    const path = `${PROFILE_PATH}/${id}`;
    if (isModal) {
      onClose();
      window.location.href = path;
    } else {
      naviate(path);
    }
  };
  return (
    <li className={`user-list__user-item ${className}`}>
      <div className='user-list__profile-image' onClick={handleClick}>
        <ProfileImage hasShadow={false} image={`${IMAGE_UPLOAD_API_URL}/${profileImage}`} />
      </div>
      <div className='user-list__user-info'>
        <span className='user-list__nickname'>{nickname}</span>
        <span className='user-list__separator' />
        <p className='user-list__course'>{description}</p>
      </div>
      {buttonText && (
        <button className={`user-list__button ${buttonColor}`} onClick={onClick}>
          {buttonText}
        </button>
      )}
    </li>
  );
};

UserItem.propTypes = {
  user: PropTypes.shape({
    profileImageUrl: PropTypes.string,
    nickname: PropTypes.string.isRequired,
    description: PropTypes.string,
    buttonText: PropTypes.string.isRequired,
    buttonColor: PropTypes.string,
    onClick: PropTypes.func
  }).isRequired,
  isModal: PropTypes.bool,
  onClose: PropTypes.func,
  className: PropTypes.string
};

export default UserItem;
