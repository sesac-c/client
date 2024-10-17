import React from 'react';
import { Modal, Box, Button, Stack, Typography, Divider, Skeleton } from '@mui/material';
import {
  FollowListButtonProps,
  FollowListModalProps,
  FollowUserListProps,
  RelationListButtonProps,
  FollowingListButtonProps
} from '@/common/types';
import Logo from '../common/layout/Logo';
import MascotImage from '../common/layout/MascotImage';
import UserItem from '@/user/components/user/UserItem';
import { useFollowList } from '@/common/hooks/profile/useFollowList';
import { getButtonText, getButtonColor, getOnClickHandler } from '@/common/utils';

const UserListSkeleton: React.FC = () => (
  <Stack spacing={2}>
    {[...Array(5)].map((_, index) => (
      <Box key={index} display='flex' alignItems='center' p={2}>
        <Skeleton variant='circular' width={40} height={40} />
        <Box ml={2} flex={1}>
          <Skeleton variant='text' width='60%' />
          <Skeleton variant='text' width='40%' />
        </Box>
        <Skeleton variant='rectangular' width={80} height={36} />
      </Box>
    ))}
  </Stack>
);

const UserList: React.FC<FollowUserListProps> = ({
  users,
  onFollowToggle,
  onDelete,
  onClose,
  isProfileMine,
  isFollowing,
  isLoading
}) => {
  if (isLoading) {
    return <UserListSkeleton />;
  }

  const renderCondition = users && users.length > 0;
  return (
    <div className={`user-search h-full`}>
      <ul className='user-search__user-list'>
        {renderCondition ? (
          <Stack divider={<Divider flexItem />}>
            {users.map((user, index) => (
              <UserItem
                key={index}
                user={{
                  ...user,
                  buttonText: getButtonText(user, isProfileMine, isFollowing),
                  buttonColor: getButtonColor(user, isProfileMine, isFollowing),
                  onClick: getOnClickHandler(user, isProfileMine, isFollowing, onFollowToggle, onDelete)
                }}
                isModal={true}
                onClose={onClose}
                className='p-3'
              />
            ))}
            <p className='mt-5 flex w-full items-center justify-center'>
              <Logo size='small' />
            </p>
          </Stack>
        ) : (
          <div className='pt-16 opacity-80'>
            <div className='h-20'>
              <MascotImage type='searchLoading' />
            </div>
            <p className='mt-5 text-center text-description'>아직 연결된 새싹이가 없어요..</p>
          </div>
        )}
      </ul>
    </div>
  );
};

const FollowListModal: React.FC<FollowListModalProps> = ({
  open,
  handleClose,
  userId,
  isFollower,
  title,
  isProfileMine,
  onCountUpdate
}) => {
  const { users, isLoading, handleFollowToggle, handleDelete } = useFollowList(userId, isFollower, onCountUpdate);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='user-list-modal'
      aria-describedby='modal-containing-user-list'
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90%',
          height: '65vh',
          maxWidth: 400,
          maxHeight: '65vh',
          bgcolor: 'background.paper',
          boxShadow: 24,
          borderRadius: 2,
          overflow: 'auto'
        }}
      >
        <Typography className='w-full py-3 text-center' variant='h6' fontWeight={550}>
          {title}
        </Typography>

        <UserList
          users={users}
          onFollowToggle={handleFollowToggle}
          onDelete={!isFollower && isProfileMine ? handleDelete : undefined}
          onClose={handleClose}
          isProfileMine={isProfileMine}
          isFollowing={!isFollower}
          isLoading={isLoading}
        />
      </Box>
    </Modal>
  );
};

const RelationListButton: React.FC<RelationListButtonProps> = ({ title, num, onOpen }) => {
  const typographyProps = {
    variant: 'body2' as const,
    color: 'grey.700',
    fontWeight: 550
  };
  return (
    <Button variant='text' color='success' onClick={onOpen}>
      <Stack spacing={2} direction='row'>
        <Typography {...typographyProps}>{title}</Typography>
        <Typography {...typographyProps}>{num}</Typography>
      </Stack>
    </Button>
  );
};

export const FollowListButton: React.FC<FollowListButtonProps> = ({ userId, num, onCountUpdate }) => {
  const [open, setOpen] = React.useState(false);
  const title = '팔로우 목록';

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <React.Fragment>
      <RelationListButton title='팔로우' num={num} onOpen={handleOpen} />
      <FollowListModal
        open={open}
        handleClose={handleClose}
        userId={userId}
        isFollower={true}
        title={title}
        isProfileMine={false}
        onCountUpdate={onCountUpdate}
      />
    </React.Fragment>
  );
};

export const FollowingListButton: React.FC<FollowingListButtonProps> = ({
  userId,
  num,
  isProfileMine,
  onCountUpdate
}) => {
  const [open, setOpen] = React.useState(false);
  const title = '팔로워 목록';

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <React.Fragment>
      <RelationListButton title='팔로워' num={num} onOpen={handleOpen} />
      <FollowListModal
        open={open}
        handleClose={handleClose}
        userId={userId}
        isFollower={false}
        title={title}
        isProfileMine={isProfileMine}
        onCountUpdate={onCountUpdate}
      />
    </React.Fragment>
  );
};
