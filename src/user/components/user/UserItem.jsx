import PropTypes from 'prop-types';

import ProfileImage from '../../../common/components/common/layout/ProfileImage';

const UserItem = ({ user }) => {
  const { profileImageUrl, nickname, description, buttonText, onClick } = user;

  return (
    <li className='user-list__user-item'>
      <div className='user-list__profile-image'>
        <ProfileImage hasShadow={false} image={profileImageUrl || undefined} />
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
