import React from 'react';
import { MASCOT_IMAGES, MascotImageProps } from '@/types';
// @ts-ignore
import LoginMascotImage from '@/assets/images/login-mascot.gif';
// @ts-ignore
import ErrorMascotImage from '@/assets/images/error-mascot.gif';
// @ts-ignore
import SearchLoadingMascotImage from '@/assets/images/search-loading-mascot.png';

const getMascotImage = (type: MASCOT_IMAGES) => {
  switch (type) {
    case 'login':
      return LoginMascotImage;
    case 'error':
      return ErrorMascotImage;
    case 'searchLoading':
      return SearchLoadingMascotImage;
  }
}

const MascotImage: React.FC<MascotImageProps> = ({ type }) => {
  return (
    <div className='relative h-full w-full'>
      <img
        src={getMascotImage(type)}
        alt='mascot image'
        className='absolute inset-0 h-full w-full object-contain'
      />
    </div>
  );
};

export default MascotImage;
