import { useCallback, useEffect } from 'react';

import { useConfirmClose, useModal } from '@/hooks';

import Modal from '@/components/common/UI/Modal';
import Button from '@/components/common/UI/Button';
import ProcessErrorModal from '@/components/common/feedback/ProcessErrorModal';
import ModifyContent from './ModifyContent';

import { WRITE_POST_CONFIRM_MESSAGE, WRITE_MODAL } from '@/constants';
import { feedUpdate } from '@/services/api';
import useModifyFeedStore from '@/stores/modifyFeedStroe';

const TITLE = '수정';
const BUTTON_SIZE = 'large';

const ModifyModal = React.memo(({ onClose, feed, onChange, apiUrl }) => {
  const { title, content, resetStore, isCompleteButtonEnabled, setIsFeedUpdate, setTitle, setContent } =
    useModifyFeedStore();

  const { openModal: openErrorModal, closeModal } = useModal(() => (
    <ProcessErrorModal title={`${TITLE} 실패`} onClose={closeModal} />
  ));

  const handleComplete = useCallback(async () => {
    try {
      await feedUpdate({ apiUrl, data: { title, content }, feedId: feed.id });
      setIsFeedUpdate(true);
      onChange({ title, content });
      onClose();
    } catch (error) {
      // 에러 핸들링
      openErrorModal();
    }
  }, [title, content, resetStore, onClose, setIsFeedUpdate, openErrorModal]);

  const handleClose = useCallback(() => {
    resetStore();
    onClose();
  }, [resetStore, onClose]);

  useEffect(() => {
    setTitle(feed.title);
    setContent(feed.content);
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
      <ModifyContent />
    </Modal>
  );
});

export default ModifyModal;
