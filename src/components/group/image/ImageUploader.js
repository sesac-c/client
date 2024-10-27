import { memo } from 'react';
import { CameraIcon } from '@heroicons/react/20/solid';
import { IMAGE_TITLE } from '@/constants';
import useWriteReportStore from '@/stores/writeReportStore';

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
  const { photo, handlePhotoUpload, handlePhotoRemove, getPhoto } = useWriteReportStore();

  const handleFileChange = async event => {
    const file = event.target.files[0];
    if (file) {
      await handlePhotoUpload(file);
    }
  };

  const onRemove = event => {
    event.preventDefault();
    event.stopPropagation();
    handlePhotoRemove(photo);
  };

  return (
    <div className='upload-container'>
      <input type='file' id='fileInput' accept='image/*' onChange={handleFileChange} style={{ display: 'none' }} />
      <label htmlFor='fileInput' className='upload-area'>
        {photo ? <ImagePreview image={getPhoto()} onRemove={onRemove} /> : <UploadPrompt />}
      </label>
    </div>
  );
});

export default ImageUploader;
