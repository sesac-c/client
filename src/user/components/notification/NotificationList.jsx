import axios from 'axios';
import { useEffect, useState } from 'react';
import ProfileImage from '@/common/components/common/layout/ProfileImage';
import useNotificationStore from '@/user/store/notificationStore';
import { IMAGE_API_URL } from '@/common/constants';
const NotificationList = () => {
  const [notifications, setNotifications] = useState([]);
  const [newCount, setNewCount] = useState(0);

  const { readNotification, content } = useNotificationStore();
  const profileImage = profile => {
    return IMAGE_API_URL(profile)
  };

  const load = async () => {
    try {
      const { data } = await axios.get(`user/notifications`);
      console.log(data);
      setNotifications(data);
      setNewCount(data.filter(notification => !notification.isRead).length);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <>
      <div className='flex justify-end '>
        <div className='bg-emerald-300 px-1 text-sm text-emerald-700'>
          {newCount ? `${newCount}개의 신규 쪽지` : '모두 읽음'}
        </div>
      </div>

      {notifications.map(notification => (
        <div
          key={`notification-${notification.notificationId}`}
          className={`my-1 flex px-1 py-3 ${!notification.isRead ? 'bg-emerald-50' : ''}`}
        >
          <div className='user-list__profile-image'>
            <ProfileImage image={profileImage(notification.profileImage)} hasShadow={false} />
          </div>
          <div onClick={() => readNotification(notification)}>
            <div className='flex'>
              <div>{notification.nickname}</div>
            </div>
            <div className='single-line-content text-xs'>{content(notification.type)}</div>
          </div>
        </div>
      ))}
    </>
  );
};

export default NotificationList;