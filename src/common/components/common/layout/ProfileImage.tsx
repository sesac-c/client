import React from 'react';
import { ProfileImageProps } from '../../../types';

const DEFAULT_PROFILE_IMAGE = '/assets/images/default-profile.png';

const ProfileImage: React.FC<ProfileImageProps> = ({ image, hasShadow = true }) => {
  const profileImage = image || DEFAULT_PROFILE_IMAGE;

  return (
    <div
      className={`aspect-square h-full overflow-hidden rounded-full bg-secondary p-1 shadow-md ${
        hasShadow ? 'shadow-primary-950' : ''
      }`}
    >
      <img src={profileImage} alt='profile image' className='mx-auto h-full w-full object-cover' />
    </div>
  );
};

export default ProfileImage;
