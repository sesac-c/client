import { useCallback, useEffect } from 'react';

import useWritePostStore from '@/stores/writePostStore';
import { useConfirmClose, useModal } from '@/hooks';

import Modal from '@/components/common/UI/Modal';
import Button from '@/components/common/UI/Button';
import ProcessErrorModal from '@/components/common/feedback/ProcessErrorModal';
import WritePostContent from './WritePostContent.jsx';

import { WRITE_POST_CONFIRM_MESSAGE, WRITE_MODAL } from '@/constants';
import { postsCampusCreate } from '@/services/api/posts';

const TITLE = '글쓰기';
const BUTTON_SIZE = 'large';

const WritePostModal = React.memo(({ onClose, feedType }) => {
  const { title, content, image, thumbnail, hashtags, isCompleteButtonEnabled, resetStore, setIsPostUpdate } =
    useWritePostStore();

  const { openModal: openErrorModal, closeModal } = useModal(() => (
    <ProcessErrorModal title={`${TITLE} 실패`} onClose={closeModal} />
  ));

  const handleComplete = useCallback(async () => {
    try {
      await postsCampusCreate({ title, content, hashtag: hashtags, image, thumbnail }, feedType);
      setIsPostUpdate(true);
      resetStore();
      onClose();
    } catch (error) {
      // 에러 핸들링
      openErrorModal();
    }
  }, [title, content, hashtags, image, resetStore, onClose, setIsPostUpdate, openErrorModal]);

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
