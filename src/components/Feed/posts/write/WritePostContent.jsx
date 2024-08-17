import React from 'react';
import { TitleInputField, ContentInputField } from './WritePostRequiredFields.jsx';

const WritePostContent = React.memo(() => {
  return (
    <div className='write__modal-form'>
      <div className='req-field-container'>
        <div className='title'>
          <TitleInputField />
        </div>
        <div className='content'>
          <ContentInputField />
        </div>
      </div>
    </div>
  );
});

export default WritePostContent;
