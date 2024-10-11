import React from 'react';

import { TitleInputField, ContentInputField } from './WriteNoticeRequiredFields';
import { ImportanceSelector, NoticeSelectors } from './WriteNoticeOptionalFields';
import useNoticeStore from '../../../store/writeNoticeStore';

const WriteNoticeContent: React.FC = React.memo(() => {
  const { state } = useNoticeStore();
  return (
    <div className='write__modal-form'>
      <div className='req-field-container'>
        {state.type === 'all' ? (
          <div className='importance'>
            <ImportanceSelector />
          </div>
        ) : (
          <div className='selectors'>
            <NoticeSelectors />
          </div>
        )}
        <div className='mb-4'></div>
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

export default WriteNoticeContent;
