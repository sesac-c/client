import useMessageStore from '@/user/store/messageStore';
import { Button } from '@mui/material';
import { ChevronLeftIcon } from '@heroicons/react/16/solid';

const MessageDetail = ({ messageType }) => {
  const { message, toList, removeMessage, writeForm } = useMessageStore();

  return (
    <>
      <div className='text-xs'>
        <div className='flex'>
          <div>
            <button className='carousel__nav-btn' onClick={toList}>
              <ChevronLeftIcon />
            </button>
          </div>

          {messageType === 'received' ? (
            <div className='mt-2 w-full text-right'>
              <div>
                <span className='text-emerald-500'>보낸 사람</span> | {message.sender}
              </div>
              <div>
                <span className='text-emerald-500'>받은 시간</span> | {message.createdAt}
              </div>
            </div>
          ) : (
            <div className='mt-2 w-full text-right'>
              <div>
                <span className='text-emerald-500'>받는 사람</span> | {message.receiver}
              </div>
              <div>
                <span className='text-emerald-500'>보낸 시간</span> | {message.createdAt}
              </div>
            </div>
          )}
        </div>
      </div>
      <hr className='my-5' />
      <div className='p-4'>{message.content}</div>

      <hr className='my-5' />
      {messageType === 'received' ? (
        <div className='flex gap-2'>
          <Button fullWidth={true} variant='outlined' color='error' onClick={removeMessage}>
            삭제
          </Button>
          <Button
            fullWidth={true}
            variant='outlined'
            color='success'
            onClick={() => writeForm({ nickname: message.sender, id: message.senderId })}
          >
            답장
          </Button>
        </div>
      ) : (
        <div className='flex gap-2'>
          <Button fullWidth={true} disabled={true} />

          <Button fullWidth={true} variant='outlined' color='error' onClick={removeMessage}>
            삭제
          </Button>
        </div>
      )}
    </>
  );
};

export default MessageDetail;
