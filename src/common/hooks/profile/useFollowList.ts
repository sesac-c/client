import { useState, useEffect, useCallback } from 'react';
import { FollowResponse } from '@/common/types';
import {
  getFollows,
  getFollowings,
  followUser,
  unfollowUser,
  deleteFollowingUser
} from '@/common/services/api/profile';

export const useFollowList = (userId: number, isFollower: boolean, onCountUpdate: (change: number) => void) => {
  const [users, setUsers] = useState<FollowResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const data = isFollower ? await getFollows(userId) : await getFollowings(userId);
        setUsers(data);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, [userId, isFollower]);

  const handleFollowToggle = useCallback(
    async (toggleUserId: number) => {
      try {
        const updatedUsers = users.map(user => {
          if (user.id === toggleUserId && !user.isThisMe) {
            if (user.isFollowing) {
              unfollowUser(toggleUserId);
              onCountUpdate(-1);
            } else {
              followUser(toggleUserId);
              onCountUpdate(1);
            }
            return { ...user, isFollowing: !user.isFollowing };
          }
          return user;
        });
        setUsers(updatedUsers);
      } catch (error) {
        console.error('Failed to toggle follow:', error);
      }
    },
    [users, onCountUpdate]
  );

  const handleDelete = useCallback(
    async (deleteUserId: number) => {
      try {
        await deleteFollowingUser(deleteUserId);
        setUsers(users.filter(user => user.id !== deleteUserId));
        onCountUpdate(-1);
      } catch (error) {
        console.error('팔로잉 유저를 삭제하는 데 실패: ', error);
      }
    },
    [users, onCountUpdate]
  );

  return { users, isLoading, handleFollowToggle, handleDelete };
};
