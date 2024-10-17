import React from 'react';
import Logo from '../common/layout/Logo';
import { IconButton, Stack, Tooltip, Typography } from '@mui/material';
import UndoIcon from '@mui/icons-material/Undo';
import { useNavigate } from 'react-router-dom';
import { ProfileLayoutHeaderProps } from '@/common/types';
import SendIcon from '@mui/icons-material/Send';

const UserMenu = () => {
  return (
    <div className='user-menu'>
      <nav>
        <ul className='user-menu-list'>
          <li className='user-menu-item'>
            <div className='user-menu-area' tabIndex={-1}>
              <Tooltip title='쪽지 보내기' className='user-menu-link'>
                <IconButton>
                  <SendIcon className='user-menu-icon mt-1 h-6 w-6 text-white' />
                </IconButton>
              </Tooltip>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export const Header: React.FC<ProfileLayoutHeaderProps> = ({ to, title, isProfileMine }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    to === 'back' ? navigate(-1) : navigate(to);
  };
  const headerTextColorSx = { sx: { color: 'white' } };
  return (
    <header className='header-container'>
      <div className='header-inner'>
        <div className='feed-menu-area'>
          <div className='logo'>
            <span>
              <Logo size='full' />
            </span>
          </div>
          <div className='move-btn'>
            <button onClick={handleClick}>
              <Stack direction='row' spacing={1} sx={{ marginLeft: 2 }}>
                <UndoIcon {...headerTextColorSx} />
                <Typography fontSize='1rem' fontWeight={550} letterSpacing={-1} {...headerTextColorSx}>
                  {title}
                </Typography>
              </Stack>
            </button>
          </div>
        </div>
        {!isProfileMine && (
          <div className='user-menu-area' tabIndex={-1}>
            <UserMenu />
          </div>
        )}
      </div>
    </header>
  );
};
export default Header;
