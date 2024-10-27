import React, { useState } from 'react';

import { TextField } from '@mui/material';
import { HashtagIcon } from '@heroicons/react/24/outline';

import useWriteNoticeStore from '@/stores/writeNoticeStore';
import { useModal } from '@/hooks';


import { HASHTAGS_NAME, MAX_HASHTAGS, MAX_HASHTAG_LENGTH } from '@/constants';
import Modal from '@/components/common/UI/Modal';
import Button from '@/components/common/UI/Button';

const INPUT_SIZE = 'small';
const BUTTON_SIZE = 'medium';

export const HashTagUploaderOpenButton: React.FC = () => {
  const { state } = useWriteNoticeStore();
  const { openModal, closeModal } = useModal(() => <HashtagUploaderModal onClose={closeModal} />);

  return (
    <span className='opt-open-btn'>
      <HashtagIcon />
      <p onClick={openModal}>해시태그 {state.hashtags && state.hashtags.length > 0 ? '확인' : '추가'} </p>
    </span>
  );
};

interface HashtagProps {
  text: string;
  onRemove: () => void;
}

const Hashtag: React.FC<HashtagProps> = React.memo(({ text, onRemove }) => (
  <div className='write__hashtag-item'>
    <span className='write__hashtag-text'>#{text}</span>
    <div className='remove-overlay' onClick={onRemove}>
      삭제
    </div>
  </div>
));

const HashtagInputField: React.FC = React.memo(() => {
  const [inputValue, setInputValue] = useState('');
  const { addHashtag, getHashtagCount } = useWriteNoticeStore();

  const hashtagCount = getHashtagCount();
  const hashtagCountInfo = `(${hashtagCount} / ${MAX_HASHTAGS})　`;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
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
          margin='dense'
          fullWidth
        />
      )}
    </>
  );
});

interface HashtagUploaderModalProps {
  onClose: () => void;
}

const HashtagUploaderModal: React.FC<HashtagUploaderModalProps> = ({ onClose }) => {
  const { state, removeHashtag } = useWriteNoticeStore();

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
        {state.hashtags &&
          state.hashtags.map((tag, index) => <Hashtag key={index} text={tag} onRemove={() => removeHashtag(index)} />)}
      </div>
    </Modal>
  );
};

export default HashtagUploaderModal;
