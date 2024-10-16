import UserItem from '@/user/components/user/UserItem';
import MascotImage from '@/common/components/common/layout/MascotImage';
import { Divider, Stack } from '@mui/material';
import Logo from '@/common/components/common/layout/Logo';

const UserList = ({ users, buttonText }) => {
  const handleButtonClick = onClickUrl => {};
  const renderConditon = users && users.length > 0;
  return (
    <>
      <div className='user-search'>
        <ul className='user-search__user-list'>
          {renderConditon ? (
            <Stack divider={<Divider flexItem />}>
              {users.map((user, index) => (
                <UserItem
                  key={index}
                  user={{
                    id: user.id,
                    nickname: user.nickname,
                    description: user.courseName || user.address || undefined,
                    profileImage: user.profileImage,
                    buttonText,
                    onClick: () => handleButtonClick(user.onClickUrl)
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
