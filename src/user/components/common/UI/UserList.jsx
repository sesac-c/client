import UserItem from '@/user/components/user/UserItem';
import MascotImage from '@/common/components/common/layout/MascotImage';
import { Divider, Stack } from '@mui/material';
import Logo from '@/common/components/common/layout/Logo';
import { useModal } from '@/common/hooks';
import MessageModal from '@/user/components/message/MessageModal';
import useMessageStore from '@/user/store/messageStore';

const UserList = ({ users, buttonText, className = '' }) => {
  const handleButtonClick = onClickUrl => {};
  const renderConditon = users && users.length > 0;
  const { openModal, closeModal } = useModal(() => <MessageModal onClose={closeModal} />);
  const { writeForm } = useMessageStore();

  const openMessage = user => {
    openModal();
    writeForm(user);
  };

  return (
    <>
      <div className={`user-search ${className}`}>
        <ul className='user-search__user-list'>
          {renderConditon ? (
            <Stack divider={<Divider flexItem />}>
              {users.map((user, index) => (
                <UserItem
                  key={index}
                  user={{
                    id: user.id,
                    nickname: user.nickname,
                    description: user.courseName || user.address || user.description || undefined,
                    profileImage: user.profileImage,
                    buttonText,
                    onClick: () => openMessage(user)
                  }}
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
              <p className='mt-5 text-center text-description'>소속 새싹이가 없어요..</p>
            </div>
          )}
        </ul>
      </div>
    </>
  );
};

export default UserList;
