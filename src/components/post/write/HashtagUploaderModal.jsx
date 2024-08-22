import React, { useState } from 'react';

import { TextField } from '@mui/material';
import { HashtagIcon } from '@heroicons/react/24/outline';

import useWritePostStore from '../../../stores/writePostStore';
import { useModal } from '../../../hooks/common/useModal';

import Modal from '../../common/UI/Modal.jsx';
import Button from '../../common/UI/Button.jsx';

import { HASHTAGS_NAME, MAX_HASHTAGS, MAX_HASHTAG_LENGTH } from '../../../constants/index';
import { DEFAULT_TEXTFIELD_SETTING } from '../../../utils/form.js';

const INPUT_SIZE = 'small';
const BUTTON_SIZE = 'medium';

export const HashTagUploaderOpenButton = () => {
  const { hashtags } = useWritePostStore();
  const { openModal, closeModal } = useModal(() => <HashtagUploaderModal onClose={closeModal} />);

  return (
    <span className='opt-open-btn'>
      <HashtagIcon />
      <p onClick={openModal}>해시태그 {hashtags.length > 0 ? '확인' : '추가'} </p>
    </span>
  );
};

const Hashtag = React.memo(({ text, onRemove }) => (
  <div className='write__hashtag-item'>
    <span className='write__hashtag-text'>#{text}</span>
    <div className='remove-overlay' onClick={onRemove}>
      삭제
    </div>
  </div>
));

const HashtagInputField = React.memo(() => {
  const [inputValue, setInputValue] = useState('');
  const { addHashtag, getHashtagCount } = useWritePostStore();

  const hashtagCount = getHashtagCount();
  const hashtagCountInfo = `(${hashtagCount} / ${MAX_HASHTAGS})　`;

  const handleChange = e => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = e => {
    if (e.key === 'Enter' && inputValue.trim() !== '') {
      e.preventDefault();
      addHashtag(inputValue.trim());
      setInputValue('');
    }
  };

  return (
    <>
      {hashtagCount < MAX_HASHTAGS && (
        <TextField
          name={HASHTAGS_NAME}
          size={INPUT_SIZE}
          value={inputValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={
            hashtagCount <= 0
              ? `${hashtagCountInfo}입력 후 엔터 키를 누르면 해시태그가 추가됩니다.`
              : `${hashtagCountInfo}해시태그를 클릭하면 해당 해시태그가 삭제됩니다.`
          }
          inputProps={{ maxLength: MAX_HASHTAG_LENGTH }}
          {...DEFAULT_TEXTFIELD_SETTING}
        />
      )}
    </>
  );
});

const HashtagUploaderModal = ({ onClose }) => {
  const { hashtags, removeHashtag } = useWritePostStore();

  return (
    <Modal
      open={true}
      onClose={onClose}
      title='해시태그 추가'
      footer={
        <Button size={BUTTON_SIZE} onClick={onClose}>
          닫기
        </Button>
      }
    >
      <HashtagInputField />
      <div className='write__hashtag-container'>
        {hashtags.map((tag, index) => (
          <Hashtag key={index} text={tag} onRemove={() => removeHashtag(index)} />
        ))}
      </div>
    </Modal>
  );
};

export default HashtagUploaderModal;
