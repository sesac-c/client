import { useCallback, useEffect } from 'react';

import useModifyPostStore from '../../../store/modifyPostStore';
import { useConfirmClose, useModal } from '../../../../common/hooks';

import Modal from '../../../../common/components/common/UI/Modal';
import Button from '../../../../common/components/common/UI/Button';
import ProcessErrorModal from '../../../../common/components/common/feedback/ProcessErrorModal';
import ModifyPostContent from './ModifyPostContent.jsx';

import { WRITE_POST_CONFIRM_MESSAGE, WRITE_MODAL } from '../../../../common/constants';
import { postsCampusUpdate } from '../../../services/api/posts';

const TITLE = '게시글 수정';
const BUTTON_SIZE = 'large';

const ModifyPostModal = React.memo(({ onClose, post }) => {
  const { title, content, resetStore, isCompleteButtonEnabled, setIsPostUpdate, setTitle, setContent } =
    useModifyPostStore();

  const { openModal: openErrorModal, closeModal } = useModal(() => (
    <ProcessErrorModal title={`${TITLE} 실패`} onClose={closeModal} />
  ));

  const handleComplete = useCallback(async () => {
    try {
      await postsCampusUpdate({ data: { title, content }, postId: post.id });
      setIsPostUpdate(true);
      onClose();
    } catch (error) {
      // 에러 핸들링
      openErrorModal();
    }
  }, [title, content, resetStore, onClose, setIsPostUpdate, openErrorModal]);

  const handleClose = useCallback(() => {
    resetStore();
    onClose();
  }, [resetStore, onClose]);

  useEffect(() => {
    setTitle(post.title);
    setContent(post.content);
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
      <ModifyPostContent />
    </Modal>
  );
});

export default ModifyPostModal;
