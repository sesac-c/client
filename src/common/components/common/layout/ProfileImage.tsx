import React from 'react';
import { ProfileImageProps } from '../../../types';
const ProfileImage: React.FC<ProfileImageProps> = ({ image, hasShadow = true }) => {
  return (
    <div
      className={`aspect-square h-full overflow-hidden rounded-full bg-secondary p-1 shadow-md ${
        hasShadow ? 'shadow-primary-950' : ''
      }`}
    >
      <img src={image} alt='profile image' className='mx-auto h-full w-full object-cover' />
    </div>
  );
};

export default ProfileImage;
