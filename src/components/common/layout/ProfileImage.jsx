import defaultProfileImage from '../../../assets/images/default-profile.png';
import PropTypes from 'prop-types';

const ProfileImage = ({ image, hasShadow = true }) => {
  const profileImage = image || defaultProfileImage;
  return (
    <div
      className={`aspect-square h-full overflow-hidden rounded-full bg-secondary p-1 shadow-md ${hasShadow && 'shadow-primary-950'}`}
    >
      <img
        src={profileImage}
        alt='profile image'
        className='
                    mx-auto h-full w-full                    
                    object-cover 
                '
      />
    </div>
  );
};

ProfileImage.propTypes = {
  image: PropTypes.string,
  hasShadow: PropTypes.bool
};

export default ProfileImage;
