import React from 'react';
import { Send as SendIcon } from '@mui/icons-material';
import { Box, IconButton, TextField } from '@mui/material';
import { MessageInputProps } from '@/user/type';

const Input: React.FC<MessageInputProps> = ({ message, onSendMessage, setMessage }) => {
  return (
    <Box sx={{ px: 2, pt: 3, pb: 5, backgroundColor: 'white' }}>
      <TextField
        fullWidth
        variant='outlined'
        placeholder='메시지를 입력하세요'
        value={message}
        color='success'
        onChange={e => setMessage(e.target.value)}
        onKeyPress={e => e.key === 'Enter' && onSendMessage()}
        InputProps={{
          endAdornment: (
            <IconButton onClick={onSendMessage}>
              <SendIcon />
            </IconButton>
          )
        }}
      />
    </Box>
  );
};
export default Input;
