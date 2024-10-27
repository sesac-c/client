import { useState } from 'react';

import { TextField } from '@mui/material';

import { REPLY_FIELD_SETTING } from '@/utils/form';
import { createReply } from '@/services/api';

const ReplyInput = ({ feedId, apiUrl, onUpdate }) => {
  const [reply, setReply] = useState('');
  const handleReplySubmit = async e => {
    if (e.key !== 'Enter') {
      return;
    }

    e.preventDefault();
    try {
      await createReply(feedId, apiUrl, { content: reply.trim() });
      setReply('');
      onUpdate(true);
    } catch (error) {
      console.error(error);
    }
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
