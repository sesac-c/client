import React from 'react';
import { ProfileLayout } from '@/common/layouts/Profile';
import ProfileContent from '@/common/components/profile/ProfileContent';
import { LoaderFunctionArgs, Navigate, Outlet, redirect, useLoaderData, useParams } from 'react-router-dom';
import { getProfile, getUserInfo } from '@/common/services/api/profile';
import { ProfileResponse } from '@/common/types';
import { PROFILE_PATH } from '@/common/constants';

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
export const MyProfilePage: React.FC = () => {
  const { user } = useLoaderData() as { user: { id: string } };
  return <Navigate to={PROFILE_PATH + '/' + user.id} replace />;
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
export const myProfileloader = async () => {
  try {
    const fetchedUserInfo = await getUserInfo();
    return { user: fetchedUserInfo };
  } catch (error) {
    console.error('프로필 로딩 중 오류 발생:', error);
    throw error;
  }
};

export default ProfilePage;
