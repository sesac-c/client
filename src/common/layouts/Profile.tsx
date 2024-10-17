import React, { Suspense } from 'react';
import PageLoadingSpinner from '../components/common/UI/PageLoadingSpinner';
import { ProfileLayoutProps } from '../types';
import Header from '../components/profile/Header';

export const ProfileLayout: React.FC<ProfileLayoutProps> = ({ header, children }) => {
  return (
    <div id='wrap'>
      <Header {...header} />
      <main id='main' className='h-fit'>
        <Suspense fallback={<PageLoadingSpinner />}>{children}</Suspense>
      </main>
    </div>
  );
};
