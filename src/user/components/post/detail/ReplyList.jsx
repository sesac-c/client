import { useEffect, useState } from 'react';

import ReplyItem from './ReplyItem.jsx';

import { dummyReplydata } from '../../../_mock';
import { replyList } from '../../../services/api/posts.js';

const ReplyList = ({ postId }) => {
  const loadReplies = async postId => {
    const response = await replyList(postId);
    const { data } = response;
    // console.log('reply response: ', response);
    // console.log('reply data: ', data);
  };

  const [replies, setReplies] = useState(null);
  useEffect(() => {
    loadReplies(postId);
  }, [postId]);
  return (
    <div className='postdetail__reply-list'>
      {replies !== null && replies.map(reply => <ReplyItem key={reply.id} reply={reply} />)}
    </div>
  );
};

export default ReplyList;
