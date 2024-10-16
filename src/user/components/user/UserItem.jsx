import PropTypes from 'prop-types';

import ProfileImage from '../../../common/components/common/layout/ProfileImage';
import { IMAGE_UPLOAD_API_URL, PROFILE_PATH } from '@/common/constants';
import { useNavigate } from 'react-router-dom';

const UserItem = ({ user, className }) => {
  const naviate = useNavigate();
  const { id, profileImage, nickname, description, buttonText, onClick } = user;

  return (
    <li className={`user-list__user-item ${className}`}>
      <div className='user-list__profile-image' onClick={() => naviate(`${PROFILE_PATH}/${id}`)}>
        <ProfileImage hasShadow={false} image={`${IMAGE_UPLOAD_API_URL}/${profileImage}`} />
      </div>
      <div className='user-list__user-info'>
        <span className='user-list__nickname'>{nickname}</span>
        <span className='user-list__separator' />
        <p className='user-list__course'>{description}</p>
      </div>
      <button className='user-list__button' onClick={onClick}>
        {buttonText}
      </button>
    </li>
  );
};

UserItem.propTypes = {
  user: PropTypes.shape({
    profileImageUrl: PropTypes.string,
    nickname: PropTypes.string.isRequired,
    description: PropTypes.string,
    buttonText: PropTypes.string.isRequired,
    onClick: PropTypes.func
  }).isRequired
};

export default UserItem;
