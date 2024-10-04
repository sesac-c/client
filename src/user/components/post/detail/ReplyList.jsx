import { useEffect, useState } from 'react';

import ReplyItem from './ReplyItem.jsx';

import { fetchReplies } from '@/user/services/api/posts.js';

const ReplyList = ({ postId, apiUrl }) => {
  const [replies, setReplies] = useState([]);

  const loadReplies = async () => {
    const response = await fetchReplies(postId, apiUrl);
    const { data } = response;
    console.log('reply data: ', data);

    setReplies(replies.concat(data));
  };

  useEffect(() => {
    loadReplies();
  }, []);
  return (
    <div className='postdetail__reply-list'>
      {replies !== null &&
        replies.map(reply => <ReplyItem key={reply.id} postId={postId} reply={reply} apiUrl={apiUrl} />)}
    </div>
  );
};

export default ReplyList;
