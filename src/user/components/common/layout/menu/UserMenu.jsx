import { Link } from 'react-router-dom';

import { BellIcon, EnvelopeIcon } from '@heroicons/react/20/solid';

import ProfileImage from '@/common/components/common/layout/ProfileImage';
import { useModal } from '@/common/hooks';
import MessageModal from '@/user/components/message/MessageModal';

const UserMenu = () => {
  const iconClasses = 'user-menu-icon w-6 h-6 text-white';

  const { openModal: openMessage, closeModal: closeMessage } = useModal(() => <MessageModal onClose={closeMessage} />);

  return (
    <div className='user-menu'>
      <nav>
        <ul className='user-menu-list'>
          <li className='user-menu-item'>
            <button className='user-menu-link'>
              <BellIcon className={`${iconClasses} bell-icon`} />
            </button>
          </li>
          <li className='user-menu-item'>
            <button className='user-menu-link'>
              <EnvelopeIcon onClick={openMessage} className={`${iconClasses} envelope-icon`} />
            </button>
          </li>
          <li className='user-menu-item profile'>
            <button className='user-menu-link'>
              <ProfileImage className='profile-image' />
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default UserMenu;
