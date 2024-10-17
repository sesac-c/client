import React, { memo } from 'react';

import TextField from '@mui/material/TextField';
import { FormControl, FormHelperText, OutlinedInput } from '@mui/material';

import useWriteNoticeStore from '../../../store/writeNoticeStore';

import LabeledWrapper from '@/common/components/common/UI/LabeledWrapper';
import { ImageUploaderOpenButton } from './ImageUploader';
import { HashTagUploaderOpenButton } from './HashtagUploader';

import { MAX_TITLE_LENGTH, MAX_CONTENT_LENGTH } from '@/common/constants';

interface RemainTextCountProps {
  current: number;
  max: number;
}

const TITLE_NAME = 'title';
const CONTENT_NAME = 'content';
const writePostDefaultSetting = {
  type: 'text',
  color: 'success' as 'success',
  required: true,
  size: 'small' as 'small'
};
const TITLE_FIELD_SETTING = {
  ...writePostDefaultSetting,
  id: TITLE_NAME,
  name: TITLE_NAME
};

const CONTENT_FIELD_SETTING = {
  ...writePostDefaultSetting,
  id: CONTENT_NAME,
  name: CONTENT_NAME,
  multiline: true,
  sx: {
    '& .MuiOutlinedInput-root': {
      height: '100px',
      '& textarea': {
        resize: 'none',
        lineHeight: '1.5',
        fontSize: '0.875rem'
      }
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderRadius: '0.375rem'
    }
  }
};
const DEFAULT_TEXTFIELD_SETTING = {
  color: 'success' as 'success',
  margin: 'dense' as 'dense',
  fullWidth: true
};
const RemainTextCount: React.FC<RemainTextCountProps> = ({ current, max }) => (
  <p className='mt-1 w-full text-right text-caption text-gray-basic'>
    {current} / {max}
  </p>
);

export const TitleInputField: React.FC = memo(() => {
  const { state, setState, getTitleLength } = useWriteNoticeStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState('title', e.target.value);
  };

  return (
    <LabeledWrapper title='제목' ExtraInfoElement={HashTagUploaderOpenButton}>
      <FormControl variant='outlined' margin='dense' fullWidth>
        <OutlinedInput
          value={state.title}
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

export const ContentInputField: React.FC = memo(() => {
  const { state, setState, getContentLength } = useWriteNoticeStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState('content', e.target.value);
  };

  return (
    <LabeledWrapper title='내용' ExtraInfoElement={ImageUploaderOpenButton}>
      <FormControl variant='outlined' {...DEFAULT_TEXTFIELD_SETTING} sx={{ maxWidth: '100%' }}>
        <TextField value={state.content} onChange={handleChange} {...CONTENT_FIELD_SETTING} />
        <FormHelperText id='content'>
          <RemainTextCount current={getContentLength()} max={MAX_CONTENT_LENGTH} />
        </FormHelperText>
      </FormControl>
    </LabeledWrapper>
  );
});
