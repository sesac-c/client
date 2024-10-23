import axios from 'axios';
import { useEffect, useState } from 'react';
import { formateDateTimeToKorean } from '@/common/utils';
import ProfileImage from '@/common/components/common/layout/ProfileImage';
import useMessageStore from '@/user/store/messageStore';
import { THUMBNAIL_API_URL } from '@/common/constants';

const MessageList = ({ messageType }) => {
  const [messages, setMessages] = useState([]);
  const [newCount, setNewCount] = useState(0);
  const { readMessage } = useMessageStore();
  const isReceived = () => messageType === 'received';

  const load = async () => {
    try {
      console.log(messageType);
      const { data } = await axios.get(`user/messages/${messageType}`);
      console.log(data);
      setMessages(data);
      setNewCount(data.filter(message => !message.isRead).length);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    load();
  }, [messageType]);

  return (
    <>
      {isReceived() && (
        <div className='flex justify-end '>
          <div className='bg-emerald-300 px-1 text-sm text-emerald-700'>
            {newCount ? `${newCount}개의 신규 쪽지` : '모두 읽음'}
          </div>
        </div>
      )}

      {messages.map(message => (
        <div
          key={`message-${message.id}`}
          className={`my-1 flex px-1 py-3 ${isReceived() && !message.isRead ? 'bg-emerald-50' : ''}`}
        >
          <div className='user-list__profile-image'>
            <ProfileImage
              image={
                isReceived() ? THUMBNAIL_API_URL(message.senderProfile) : THUMBNAIL_API_URL(message.receiverProfile)
              }
              hasShadow={false}
            />
          </div>
          <div onClick={() => readMessage(message)}>
            <div className='flex'>
              {isReceived() ? <div>{message.sender}</div> : <div>{message.receiver}</div>}

              <div className='ml-1 content-end text-xs'>{formateDateTimeToKorean(message.createdAt)}</div>
            </div>
            <div className='single-line-content text-xs'>{message.content}</div>
          </div>
        </div>
      ))}
    </>
  );
};

export default MessageList;
