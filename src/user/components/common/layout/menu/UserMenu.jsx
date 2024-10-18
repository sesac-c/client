import { Link, useNavigate } from 'react-router-dom';

import { BellIcon, EnvelopeIcon } from '@heroicons/react/20/solid';

import ProfileImage from '@/common/components/common/layout/ProfileImage';
import { PROFILE_PATH } from '@/common/constants';
import useAuthStore from '@/common/stores/authStore';
import { useModal } from '@/common/hooks';
import MessageModal from '@/user/components/message/MessageModal';
import NotificationModal from '@/user/components/notification/NotificationModal';

const UserMenu = () => {
  const iconClasses = 'user-menu-icon w-6 h-6 text-white';
  const navigate = useNavigate();

  const { user } = useAuthStore();
  const profileImage = `${process.env.REACT_APP_API_BASE_URL}view/${user?.profileImage}`;

  const { openModal: openMessage, closeModal: closeMessage } = useModal(() => <MessageModal onClose={closeMessage} />);
  const { openModal: openNotification, closeModal: closeNotification } = useModal(() => (
    <NotificationModal onClose={closeNotification} />
  ));

  return (
    <div className='user-menu'>
      <nav>
        <ul className='user-menu-list'>
          <li className='user-menu-item'>
            <button className='user-menu-link'>
              <BellIcon onClick={openNotification} className={`${iconClasses} bell-icon`} />
            </button>
          </li>
          <li className='user-menu-item'>
            <button className='user-menu-link'>
              <EnvelopeIcon onClick={openMessage} className={`${iconClasses} envelope-icon`} />
            </button>
          </li>
          <li className='user-menu-item profile'>
            <button className='user-menu-link' onClick={() => navigate(PROFILE_PATH)}>
              <ProfileImage className='profile-image' image={profileImage} />
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default UserMenu;
