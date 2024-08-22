import { useState } from 'react';

import { TextField } from '@mui/material';

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
      type='text'
      placeholder='댓글...'
      name='reply'
      value={reply}
      onChange={e => handleChange(e.target.value)}
      onKeyDown={e => {
        if (e.key === 'Enter') {
          handleReplySubmit(e);
        }
      }}
      fullWidth
      autoComplete='off'
      size='small'
      sx={{
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            border: 'none'
          }
        }
      }}
    />
  );
};

export default ReplyInput;
