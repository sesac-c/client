import { memo } from 'react';

import { CameraIcon } from '@heroicons/react/20/solid';
import { PhotoIcon } from '@heroicons/react/24/outline';

import useWritePostStore from '../../../store/writePostStore';
import { useModal } from '../../../../common/hooks';

import Modal from '../../../../common/components/common/UI/Modal';
import Button from '../../../../common/components/common/UI/Button';

import { IMAGE_TITLE } from '../../../../common/constants';

const BUTTON_SIZE = 'medium';

export const ImageUploaderOpenButton = () => {
  const { image } = useWritePostStore();

  const { openModal, closeModal } = useModal(() => <ImageUploaderModal onClose={closeModal} />);

  return (
    <span className='opt-open-btn'>
      <PhotoIcon />
      <p onClick={openModal}>
        {IMAGE_TITLE} {image ? '확인' : '추가'}
      </p>
    </span>
  );
};

const ImagePreview = memo(({ image, onRemove }) => (
  <div className='preview-container'>
    <div className='preview-image-wrapper'>
      <img src={image} alt='Preview' className='preview-image' />
    </div>
    <div className='remove-overlay' onClick={onRemove}>
      <span>첨부 취소</span>
    </div>
  </div>
));

const UploadPrompt = memo(() => (
  <>
    <div className='camera-icon'>
      <CameraIcon />
    </div>
    <div className='upload-text'>클릭하여 {IMAGE_TITLE}를 첨부합니다.</div>
  </>
));

const ImageUploader = memo(() => {
  const { thumbnail, handleImageUpload, handleImageRemove, image, getThumbnail } = useWritePostStore();

  const handleFileChange = async event => {
    const file = event.target.files[0];
    if (file) {
      await handleImageUpload(file);
    }
  };

  const onRemove = event => {
    event.preventDefault();
    event.stopPropagation();
    handleImageRemove(image);
  };

  return (
    <div className='upload-container'>
      <input type='file' id='fileInput' accept='image/*' onChange={handleFileChange} style={{ display: 'none' }} />
      <label htmlFor='fileInput' className='upload-area'>
        {thumbnail ? <ImagePreview image={getThumbnail()} onRemove={onRemove} /> : <UploadPrompt />}
      </label>
    </div>
  );
});

const ImageUploaderModal = ({ onClose }) => {
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
