import { memo } from 'react';

import TextField from '@mui/material/TextField';
import { FormControl, FormHelperText, OutlinedInput } from '@mui/material';

import useWritePostStore from '../../../store/writePostStore';

import LabeledWrapper from '../../../../common/components/common/UI/LabeledWrapper';

import { MAX_TITLE_LENGTH, MAX_CONTENT_LENGTH } from '../../../../common/constants';
import { CONTENT_FIELD_SETTING, DEFAULT_TEXTFIELD_SETTING, TITLE_FIELD_SETTING } from '../../../../common/utils/form';

const RemainTextCount = ({ current, max }) => (
  <p className='mt-1 w-full text-right text-caption text-gray-basic'>
    {current} / {max}
  </p>
);

export const TitleInputField = memo(() => {
  const { title, setTitle, getTitleLength } = useWritePostStore();

  const handleChange = e => {
    setTitle(e.target.value);
  };

  return (
    <LabeledWrapper title='제목'>
      <FormControl variant='outlined' {...DEFAULT_TEXTFIELD_SETTING}>
        <OutlinedInput
          value={title}
          onChange={handleChange}
          inputProps={{ maxLength: MAX_TITLE_LENGTH }}
          {...TITLE_FIELD_SETTING}
        />
        <FormHelperText id='title'>
          <RemainTextCount current={getTitleLength()} max={MAX_TITLE_LENGTH} />
        </FormHelperText>
      </FormControl>
    </LabeledWrapper>
  );
});

export const ContentInputField = memo(() => {
  const { content, setContent, getContentLength } = useWritePostStore();

  const handleChange = e => {
    setContent(e.target.value);
  };

  return (
    <LabeledWrapper title='내용'>
      <FormControl variant='outlined' {...DEFAULT_TEXTFIELD_SETTING} sx={{ maxWidth: '100%' }}>
        <TextField
          value={content}
          onChange={handleChange}
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
          <RemainTextCount current={getContentLength()} max={MAX_CONTENT_LENGTH} />
        </FormHelperText>
      </FormControl>
    </LabeledWrapper>
  );
});
