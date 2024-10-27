import React from 'react';
import { ProfileLayoutProps } from '../types';
import Header from '@/components/profile/Header';

export const ProfileLayout: React.FC<ProfileLayoutProps> = ({ header, children }) => {
  return (
    <div id='wrap'>
      <Header {...header} />
      <main id='main' className='h-fit'>
        {children}
      </main>
    </div>
  );
};
