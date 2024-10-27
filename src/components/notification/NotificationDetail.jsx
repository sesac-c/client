import useNotificationStore from '@/stores/notificationStore';
import { Button } from '@mui/material';
import { ChevronLeftIcon } from '@heroicons/react/16/solid';

const NotificationDetail = () => {
  const { notification, toList, content } = useNotificationStore();

  return (
    <>
      <div className='text-xs'>
        <div className='flex'>
          <div>
            <button className='carousel__nav-btn' onClick={toList}>
              <ChevronLeftIcon />
            </button>
          </div>

          <div className='mt-2 w-full text-right'>
            <div>
              <span className='text-emerald-500'>{notification.nickname}</span>
            </div>
          </div>
        </div>
      </div>
      <hr className='my-5' />
      <div className='p-4'>{content(notification.type)}</div>

      <hr className='my-5' />
      <div className='flex gap-2'>
        <Button fullWidth={true} disabled={true} />

        {/*<Button fullWidth={true} variant='outlined' color='error' onClick={removeNotification}>
          삭제
        </Button>*/}
      </div>
    </>
  );
};

export default NotificationDetail;
