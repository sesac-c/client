import React, { useCallback, useEffect } from 'react';
import Modal from '../common/UI/Modal';
import Button from '../common/UI/Button';
import useWritePostStore from '../../stores/writePostStore';
import { useModal } from '../../hooks/useModal';
import { useConfirmClose } from '../../hooks/useConfirmClose';
import { WRITE_POST_CONFIRM_MESSAGE } from '../../constants/confirmations';
import { WRITE_MODAL } from '../../constants/modal';
import WritePostContent from './WritePostContent';
import ProcessErrorModal from '../common/ProcessErrorModal';

const TITLE = '글쓰기';
const BUTTON_SIZE = 'large';

const WritePostModal = React.memo(({ onClose }) => {
  const { title, content, image, hashtags, isCompleteButtonEnabled, resetStore } = useWritePostStore();

  const { openModal: openErrorModal, closeModal } = useModal(() => (
    <ProcessErrorModal title={`${TITLE} 실패`} onClose={closeModal} />
  ));

  const handleComplete = useCallback(() => {
    // 여기에 글 작성 완료 로직 추가
    console.log({ title, content, hashtags, image });
    resetStore();
    onClose();
  }, [title, content, hashtags, image, resetStore, onClose]);

  const handleClose = useCallback(() => {
    resetStore();
    onClose();
  }, [resetStore, onClose]);

  useEffect(() => {
    return () => resetStore();
  }, [resetStore]);

  return (
    <Modal
      open={true}
      onBeforeClose={useConfirmClose(WRITE_POST_CONFIRM_MESSAGE)}
      onClose={handleClose}
      hasCloseButton={true}
      title={TITLE}
      modalType={WRITE_MODAL}
      footer={
        <Button size={BUTTON_SIZE} onClick={handleComplete} disabled={!isCompleteButtonEnabled()}>
          완료
        </Button>
      }
    >
      <WritePostContent />
    </Modal>
  );
});

export default WritePostModal;
