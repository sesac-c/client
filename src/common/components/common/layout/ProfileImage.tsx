import React from 'react';
import { ProfileImageProps } from '../../../types';

const ProfileImage: React.FC<ProfileImageProps> = ({ image, hasShadow = true }) => {
  return (
    <div
      className={`relative aspect-square h-full overflow-hidden rounded-full bg-secondary shadow-md ${
        hasShadow ? 'shadow-primary-950' : ''
      }`}
    >
      <div className='absolute inset-[2px] overflow-hidden rounded-full'>
        <img src={image} alt='profile image' className='h-full w-full object-cover' />
      </div>
    </div>
  );
};

export default ProfileImage;
