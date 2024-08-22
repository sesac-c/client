import { useState } from 'react';

import { TextField } from '@mui/material';
import { REPLY_FIELD_SETTING } from '../../../utils/form';

const ReplyInput = () => {
  const [reply, setReply] = useState('');
  const handleReplySubmit = e => {
    e.preventDefault();
    console.log(reply.trim());
    // 댓글 작성 로직
  };
  function handleChange(value) {
    setReply(value);
  }
  return (
    <TextField
      value={reply}
      onChange={e => handleChange(e.target.value)}
      onKeyDown={e => {
        if (e.key === 'Enter') {
          handleReplySubmit(e);
        }
      }}
      {...REPLY_FIELD_SETTING}
    />
  );
};

export default ReplyInput;
