import { useCallback } from 'react';
import { useModal } from '@/common/hooks';

import Modal from '@/common/components/common/UI/Modal';
import ProcessErrorModal from '@/common/components/common/feedback/ProcessErrorModal';

import { PAGE_MODAL } from '@/common/constants';
import useNotificationStore from '@/user/store/notificationStore';
import NotificationList from '@/user/components/notification/NotificationList';
import NotificationDetail from '@/user/components/notification/NotificationDetail';

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
