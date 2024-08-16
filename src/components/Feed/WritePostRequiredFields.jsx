import React from 'react';
import LabeledWrapper from '../common/UI/LabeledWrapper';
import Input from '../common/UI/Input.jsx';
import { MAX_TITLE_LENGTH, MAX_CONTENT_LENGTH } from '../../constants/validations';
import useWritePostStore from '../../stores/writePostStore.js';
import { ImageUploaderOpenButton } from './ImageUploaderModal.jsx';
import { HashTagUploaderOpenButton } from './HashtagUploaderModal.jsx';

const INPUT_SIZE = 'small';
const RemainTextCount = ({ current, max }) => (
  <p className='mt-1 w-full text-right text-caption text-gray-basic'>
    {current} / {max}
  </p>
);

export const TitleInputField = React.memo(() => {
  const { title, setTitle, getTitleLength } = useWritePostStore();

  const handleChange = e => {
    setTitle(e.target.value);
  };

  return (
    <LabeledWrapper title='제목' ExtraInfoElement={HashTagUploaderOpenButton}>
      <Input
        size={INPUT_SIZE}
        placeholder='제목을 입력하세요'
        name='title'
        type='text'
        variant='noneFocus'
        maxLength={MAX_TITLE_LENGTH}
        onChange={handleChange}
        value={title}
      />
      <RemainTextCount current={getTitleLength()} max={MAX_TITLE_LENGTH} />
    </LabeledWrapper>
  );
});

export const ContentInputField = React.memo(() => {
  const { content, setContent, getContentLength } = useWritePostStore();

  const handleChange = e => {
    setContent(e.target.value);
  };

  return (
    <LabeledWrapper title='내용' ExtraInfoElement={ImageUploaderOpenButton}>
      <Input
        size='custom'
        placeholder='내용을 입력하세요'
        name='content'
        type='textarea'
        variant='noneFocus'
        maxLength={MAX_CONTENT_LENGTH}
        isTextarea={true}
        onChange={handleChange}
        value={content}
        className='h-[210px] rounded-md px-3 py-2 text-sm'
      />
      <RemainTextCount current={getContentLength()} max={MAX_CONTENT_LENGTH} />
    </LabeledWrapper>
  );
});
