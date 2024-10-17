import { FollowResponse } from '@/common/types';

export const getButtonText = (user: FollowResponse, isProfileMine: boolean, isFollowing: boolean) => {
  if (user.isThisMe) return '';
  if (isProfileMine && isFollowing) return '삭제';
  return user.isFollowing ? '언팔로우' : '팔로우';
};

export const getButtonColor = (user: FollowResponse, isProfileMine: boolean, isFollowing: boolean) => {
  if (user.isThisMe) return undefined;
  if (isProfileMine && isFollowing) return 'red';
  return user.isFollowing ? 'gray' : undefined;
};

export const getOnClickHandler = (
  user: FollowResponse,
  isProfileMine: boolean,
  isFollowing: boolean,
  onFollowToggle: (id: number) => void,
  onDelete?: (id: number) => void
) => {
  if (user.isThisMe) return undefined;
  if (isProfileMine && isFollowing && onDelete) return () => onDelete(user.id);
  return () => onFollowToggle(user.id);
};
