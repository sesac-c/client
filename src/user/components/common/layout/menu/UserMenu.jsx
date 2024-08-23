import { Link } from 'react-router-dom';

import { BellIcon, EnvelopeIcon } from '@heroicons/react/20/solid';

import ProfileImage from '../../../../../common/components/common/layout/ProfileImage.jsx';

const UserMenu = () => {
  const iconClasses = 'user-menu-icon w-6 h-6 text-white';

  return (
    <div className='user-menu'>
      <nav>
        <ul className='user-menu-list'>
          <li className='user-menu-item'>
            <Link className='user-menu-link'>
              <BellIcon className={`${iconClasses} bell-icon`} />
            </Link>
          </li>
          <li className='user-menu-item'>
            <Link className='user-menu-link'>
              <EnvelopeIcon className={`${iconClasses} envelope-icon`} />
            </Link>
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
