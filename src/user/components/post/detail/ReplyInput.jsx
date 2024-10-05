import { useState } from 'react';

import { TextField } from '@mui/material';

import { REPLY_FIELD_SETTING } from '@/common/utils/form';
import { createReply } from '@/user/services/api/posts';

const ReplyInput = ({ postId, apiUrl }) => {
  const [reply, setReply] = useState('');
  const handleReplySubmit = async e => {
    if (e.key !== 'Enter') {
      return;
    }

    e.preventDefault();
    await createReply(postId, apiUrl, { content: reply.trim() });
    setReply('');
  };

  const handleChange = value => {
    setReply(value);
  };

  return (
    <TextField
      value={reply}
      onChange={e => handleChange(e.target.value)}
      onKeyDown={handleReplySubmit}
      {...REPLY_FIELD_SETTING}
    />
  );
};

export default ReplyInput;
