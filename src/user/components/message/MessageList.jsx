import axios from 'axios';
import { useEffect, useState } from 'react';
import { formateDateTimeToKorean } from '@/common/utils';
import ProfileImage from '@/common/components/common/layout/ProfileImage';
import useMessageStore from '@/user/store/messageStore';

const ReceivedList = ({ messages, newCount }) => {
  const { readMessage } = useMessageStore();

  return (
    <>
      <div className='flex justify-end '>
        <div className='bg-emerald-300 px-1 text-sm text-emerald-700'>
          {newCount ? `${newCount}개의 신규 쪽지` : '모두 읽음'}
        </div>
      </div>
      {messages.map(message => (
        <div key={`message-${message.id}`} className={`my-1 flex px-1 py-3 ${message.isRead ? '' : 'bg-emerald-50'}`}>
          <div className='user-list__profile-image'>
            <ProfileImage hasShadow={false} />
          </div>
          <div onClick={() => readMessage(message)}>
            <div className='flex'>
              <div>{message.sender}</div>
              <div className='ml-1 content-end text-xs'>{formateDateTimeToKorean(message.createdAt)}</div>
            </div>
            <div className='text-xs'>{message.content}</div>
          </div>
        </div>
      ))}
    </>
  );
};

const SentList = ({ messages }) => {
  const { readMessage } = useMessageStore();

  return (
    <>
      {messages.map(message => (
        <div key={`message-${message.id}`} className={`my-1 flex px-1 py-3`}>
          <div className='user-list__profile-image'>
            <ProfileImage hasShadow={false} />
          </div>
          <div onClick={() => readMessage(message)}>
            <div className='flex'>
              <div>{message.receiver}</div>
              <div className='ml-1 content-end text-xs'>{formateDateTimeToKorean(message.createdAt)}</div>
            </div>
            <div className='text-xs'>{message.content}</div>
          </div>
        </div>
      ))}
    </>
  );
};

const MessageList = ({ messageType }) => {
  const [messages, setMessages] = useState([]);
  const [newCount, setNewCount] = useState(0);
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
      {messageType === 'received' ? (
        <ReceivedList messages={messages} newCount={newCount} />
      ) : (
        <SentList messages={messages} />
      )}
    </>
  );
};

export default MessageList;
