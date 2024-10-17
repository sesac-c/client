import useMessageStore from '@/user/store/messageStore';
import { Button, FormHelperText } from '@mui/material';
import { ChevronLeftIcon } from '@heroicons/react/16/solid';
import TextField from '@mui/material/TextField';
import { MAX_CONTENT_LENGTH } from '@/common/constants';
import { CONTENT_FIELD_SETTING } from '@/common/utils';
import { useState } from 'react';
import { RemainTextCount } from '@/user/components/post/write/WritePostRequiredFields';

const MessageWrite = () => {
  const { cancel, sendMessage, receiver } = useMessageStore();
  const [content, setContent] = useState('');

  return (
    <>
      <div className='text-xs'>
        <div className='flex'>
          <div>
            <button className='carousel__nav-btn' onClick={cancel}>
              <ChevronLeftIcon />
            </button>
          </div>

          <div>
            <span className='text-emerald-500'>받는 사람</span> | {receiver.nickname}
          </div>
        </div>
      </div>
      <hr className='my-5' />
      <div className='p-4'>
        <TextField
          value={content}
          onChange={e => setContent(e.target.value)}
          className='w-full'
          inputProps={{
            maxLength: MAX_CONTENT_LENGTH,
            style: {
              height: '180px',
              overflowY: 'auto'
            }
          }}
          {...CONTENT_FIELD_SETTING}
        />
        <FormHelperText id='content'>
          <RemainTextCount current={content.length} max={MAX_CONTENT_LENGTH} />
        </FormHelperText>
      </div>

      <hr className='my-5' />
      <div className='flex gap-2'>
        <Button fullWidth={true} variant='outlined' onClick={cancel}>
          취소
        </Button>
        <Button fullWidth={true} variant='outlined' color='success' onClick={() => sendMessage(content)}>
          보내기
        </Button>
      </div>
    </>
  );
};

export default MessageWrite;
