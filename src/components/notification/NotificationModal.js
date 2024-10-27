import { useCallback } from 'react';
import { useModal } from '@/hooks';

import Modal from '@/components/common/UI/Modal';
import ProcessErrorModal from '@/components/common/feedback/ProcessErrorModal';

import { PAGE_MODAL } from '@/constants';
import useNotificationStore from '@/stores/notificationStore';
import NotificationList from './NotificationList';
import NotificationDetail from './NotificationDetail';

const TITLE = '알림';

const NotificationModal = React.memo(({ onClose }) => {
  const { pageType, resetStore } = useNotificationStore();

  const { openModal: openErrorModal, closeModal } = useModal(() => (
    <ProcessErrorModal title={`${TITLE} 실패`} onClose={closeModal} />
  ));

  const handleClose = useCallback(() => {
    resetStore();
    onClose();
  }, [resetStore, onClose]);

  return (
    <Modal open={true} onClose={handleClose} hasCloseButton={true} modalType={PAGE_MODAL} title={TITLE}>
      <div className='message-modal'>{pageType === 'list' ? <NotificationList /> : <NotificationDetail />}</div>
    </Modal>
  );
});

export default NotificationModal;
