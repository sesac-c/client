import React from 'react';
import { MASCOT_IMAGES, MascotImageProps } from '../../../types';
const MascotImage: React.FC<MascotImageProps> = ({ type }) => {
  return (
    <div className='relative h-full w-full'>
      <img
        src={`/assets/images/${MASCOT_IMAGES[type]}`}
        alt='mascot image'
        className='absolute inset-0 h-full w-full object-contain'
      />
    </div>
  );
};

export default MascotImage;
