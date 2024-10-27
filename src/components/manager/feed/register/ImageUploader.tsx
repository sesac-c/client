import React, { memo, useEffect } from 'react';

import { CameraIcon } from '@heroicons/react/20/solid';
import { PhotoIcon } from '@heroicons/react/24/outline';

import useWriteNoticeStore from '@/stores/writeNoticeStore';
import { useModal } from '@/hooks';

import Modal from '@/components/common/UI/Modal';
import Button from '@/components/common/UI/Button';

import { IMAGE_TITLE } from '@/constants';

const BUTTON_SIZE = 'medium';

export const ImageUploaderOpenButton: React.FC = () => {
  const { state } = useWriteNoticeStore();

  const { openModal, closeModal } = useModal(() => <ImageUploaderModal onClose={closeModal} />);

  return (
    <span className='opt-open-btn'>
      <PhotoIcon />
      <p onClick={openModal}>
        {IMAGE_TITLE} {state.image ? '확인' : '추가'}
      </p>
    </span>
  );
};

interface ImagePreviewProps {
  image: string;
  onRemove: (event: React.MouseEvent) => void;
}

const ImagePreview: React.FC<ImagePreviewProps> = memo(({ image, onRemove }) => (
  <div className='preview-container'>
    <div className='preview-image-wrapper'>
      <img src={image} alt='Preview' className='preview-image' />
    </div>
    <div className='remove-overlay' onClick={onRemove}>
      <span>첨부 취소</span>
    </div>
  </div>
));

const UploadPrompt: React.FC = memo(() => (
  <>
    <div className='camera-icon'>
      <CameraIcon />
    </div>
    <div className='upload-text'>클릭하여 {IMAGE_TITLE}를 첨부합니다.</div>
  </>
));

const ImageUploader: React.FC = memo(() => {
  const { state, thumbnail, getThumbnail, handleImageUpload, handleImageRemove } = useWriteNoticeStore();

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      await handleImageUpload(file);
    }
  };

  const handleRemoveImage = (event: React.MouseEvent) => {
    if (state.image) {
      event.preventDefault();
      event.stopPropagation();
      handleImageRemove(state.image);
    }
  };

  useEffect(() => {
    console.log(thumbnail);
  }, [thumbnail]);

  return (
    <div className='upload-container'>
      <input type='file' id='fileInput' accept='image/*' onChange={handleFileChange} style={{ display: 'none' }} />
      <label htmlFor='fileInput' className='upload-area'>
        {thumbnail ? <ImagePreview image={getThumbnail()} onRemove={handleRemoveImage} /> : <UploadPrompt />}
      </label>
    </div>
  );
});

interface ImageUploaderModalProps {
  onClose: () => void;
}

const ImageUploaderModal: React.FC<ImageUploaderModalProps> = ({ onClose }) => {
  return (
    <Modal
      open={true}
      onClose={onClose}
      title={IMAGE_TITLE}
      footer={
        <Button onClick={onClose} size={BUTTON_SIZE}>
          닫기
        </Button>
      }
    >
      <ImageUploader />
    </Modal>
  );
};

export default ImageUploaderModal;
