import { useEffect, useState } from 'react';
import ReplyItem from './ReplyItem.jsx';
import { dummyReplydata } from '../../../../assets/mockData/post.js';

const ReplyList = ({ postId }) => {
  const [replies, setReplies] = useState(null);

  useEffect(() => {
    // dummy data
    const selectedPost = dummyReplydata.filter(reply => reply.postId === postId);
    setReplies(selectedPost);
  }, [postId]);
  return (
    <div className='postdetail__reply-list'>
      {replies !== null && replies.map(reply => <ReplyItem key={reply.id} reply={reply} />)}
    </div>
  );
};

export default ReplyList;
