import React, { useEffect } from 'react';
import { ProfileLayout } from '@/common/layouts/Profile';
import ProfileContent from '@/common/components/profile/ProfileContent';
import { LoaderFunctionArgs, redirect, useLoaderData, useParams } from 'react-router-dom';
import { getProfile } from '@/common/services/api/profile';
import { ProfileResponse, RouteBaseError } from '@/common/types';
import { isNumber } from '@/common/utils';
import TokenUtil from '@/common/utils/auth';
import { LOGIN_PATH, LOGIN_REQUIRED } from '@/common/constants';

const ProfilePage: React.FC = () => {
  const { profile } = useLoaderData() as { profile: ProfileResponse };
  const params = useParams();
  return (
    <ProfileLayout
      header={{
        to: 'back',
        title: '뒤로 가기',
        isProfileMine: profile.isProfileMine
      }}
    >
      <ProfileContent profileId={Number(params.profileId)} profile={profile} />
    </ProfileLayout>
  );
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const profileId = params.profileId;
  if (profileId) {
    try {
      const fetchedProfile = await getProfile(profileId);
      return { profile: fetchedProfile };
    } catch (error) {
      console.error('프로필 로딩 중 오류 발생:', error);
      throw error;
    }
  }
};

export default ProfilePage;
