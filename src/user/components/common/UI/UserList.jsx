import UserItem from '@/user/components/user/UserItem';
import MascotImage from '@/common/components/common/layout/MascotImage';
import { useModal } from '@/common/hooks';
import MessageModal from '@/user/components/message/MessageModal';
import useMessageStore from '@/user/store/messageStore';

const UserList = ({ users, buttonText }) => {
  const { openModal, closeModal } = useModal(() => <MessageModal onClose={closeModal} />);
  const { writeForm } = useMessageStore();

  const openMessage = user => {
    openModal();
    writeForm(user);
  };

  return (
    <>
      <ul className='user-search__user-list'>
        {users && users.length > 0 ? (
          users.map((user, index) => (
            <UserItem
              key={index}
              user={{
                nickname: user.nickname,
                description: user.courseName || user.address || undefined,
                profileImageUrl: user.profileImageUrl,
                buttonText,
                onClick: () => openMessage(user)
              }}
            />
          ))
        ) : (
          <div className='pt-3 opacity-80'>
            <div className='h-20'>
              <MascotImage type='searchLoading' />
            </div>
            <p className='mt-5 text-center text-description'>찾고 싶은 새싹이를 검색해보세요!</p>
          </div>
        )}
      </ul>
    </>
  );
};

export default UserList;
