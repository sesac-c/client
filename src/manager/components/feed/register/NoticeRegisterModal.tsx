import React, { useCallback, useEffect } from 'react';

import useNoticeStore from '../../../store/writeNoticeStore';
import { useConfirmClose, useModal } from '../../../../common/hooks';

import Modal from '../../../../common/components/common/UI/Modal';
import Button from '../../../../common/components/common/UI/Button';
import ProcessErrorModal from '../../../../common/components/common/feedback/ProcessErrorModal';
import WriteNoticeContent from './WriteNoticeContent';

import { WRITE_NOTICE_CONFIRM_MESSAGE, WRITE_MODAL } from '../../../../common/constants';
import { writeNotice } from '../../../services/api';

const WriteNoticeModal: React.FC<{
  onClose: () => void;
  type: 'all' | 'group';
}> = React.memo(({ onClose, type }) => {
  const { state, setState, isCompleteButtonEnabled, resetForm, setIsNoticeUpdate } = useNoticeStore();

  const { title, content, image, hashtags, importance, courseId } = state;
  const TITLE = `${type === 'all' ? '전체' : '그룹'} 공지사항`;

  const { openModal: openErrorModal, closeModal } = useModal(() => (
    <ProcessErrorModal title={`${TITLE} 실패`} onClose={closeModal} />
  ));

  const handleComplete = useCallback(async () => {
    try {
      await writeNotice({ title, content, hashtags, image, type, importance, courseId });
      setIsNoticeUpdate(true);
      resetForm();
      onClose();
    } catch (error) {
      // 에러 핸들링
      openErrorModal();
    }
  }, [title, content, hashtags, image, resetForm, importance, onClose, setIsNoticeUpdate, openErrorModal]);

  const handleClose = useCallback(() => {
    resetForm();
    onClose();
  }, [resetForm, onClose]);

  useEffect(() => {
    return () => resetForm();
  }, [resetForm]);

  useEffect(() => {
    setState('type', type);
  }, []);

  return (
    <Modal
      open={true}
      onBeforeClose={useConfirmClose(WRITE_NOTICE_CONFIRM_MESSAGE)}
      onClose={handleClose}
      hasCloseButton={true}
      title={TITLE}
      modalType={WRITE_MODAL}
      footer={
        <Button size='large' onClick={handleComplete} disabled={!isCompleteButtonEnabled()}>
          완료
        </Button>
      }
    >
      <WriteNoticeContent />
    </Modal>
  );
});

export default WriteNoticeModal;
