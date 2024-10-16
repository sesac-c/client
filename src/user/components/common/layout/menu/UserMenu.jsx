import { Link, useNavigate } from 'react-router-dom';

import { BellIcon, EnvelopeIcon } from '@heroicons/react/20/solid';

import ProfileImage from '@/common/components/common/layout/ProfileImage';
import { PROFILE_PATH } from '@/common/constants';
import useAuthStore from '@/common/stores/authStore';

const UserMenu = () => {
  const iconClasses = 'user-menu-icon w-6 h-6 text-white';
  const navigate = useNavigate();

  const { user } = useAuthStore();
  const profileImage = `${process.env.REACT_APP_API_BASE_URL}view/${user.profileImage}`;

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
