import { useEffect, useState, useRef } from 'react';
import ReplyItem from './ReplyItem.jsx';
import { fetchReplies } from '@/services/api';

const ReplyList = ({ feedId, apiUrl, isUpdate, onUpdate, isModal = false, onModalClose }) => {
  const [replies, setReplies] = useState([]);
  const lastReplyRef = useRef(null);

  const loadReplies = async () => {
    const response = await fetchReplies(feedId, apiUrl);
    const { data } = response;
    setReplies(data);
  };

  useEffect(() => {
    loadReplies();
  }, [feedId]);

  useEffect(() => {
    if (isUpdate) {
      loadReplies();
      onUpdate(false);
    }
  }, [isUpdate]);

  useEffect(() => {
    if (lastReplyRef.current) {
      lastReplyRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [replies]);

  return (
    <div className='postdetail__reply-list'>
      {replies.map((reply, index) => (
        <ReplyItem
          key={reply.id}
          feedId={feedId}
          reply={reply}
          apiUrl={apiUrl}
          onUpdate={onUpdate}
          ref={index === replies.length - 1 ? lastReplyRef : null}
          isModal={isModal}
          onModalClose={onModalClose}
        />
      ))}
    </div>
  );
};

export default ReplyList;
