import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { BellIcon, EnvelopeIcon } from '@heroicons/react/20/solid';
import ProfileImage from '@/common/components/common/layout/ProfileImage';
import { PROFILE_PATH, THUMBNAIL_API_URL } from '@/common/constants';
import useAuthStore from '@/common/stores/authStore';
import { useModal } from '@/common/hooks';
import MessageModal from '@/user/components/message/MessageModal';
import NotificationModal from '@/user/components/notification/NotificationModal';

const UserMenu = () => {
  const iconClasses = 'user-menu-icon w-6 h-6 text-white';
  const navigate = useNavigate();
  const { profileImage, fetchUserInfo } = useAuthStore();
  const [profileImageLink, setProfileImageLink] = useState(null);

  useEffect(() => {
    const loadUserInfo = async () => {
      if (!profileImage) {
        console.log('프로필 이미지가 없음');
        await fetchUserInfo();
      }
    };

    loadUserInfo();
  }, [profileImage, fetchUserInfo]);

  useEffect(() => {
    if (profileImage) {
      setProfileImageLink(THUMBNAIL_API_URL(profileImage));
    }
  }, [profileImage]);

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
              <ProfileImage className='profile-image' image={profileImageLink} />
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default UserMenu;
