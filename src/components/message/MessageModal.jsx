import { useCallback } from 'react';
import { useModal } from '@/hooks';

import { Tab, Tabs } from '@mui/material';

import MessageList from './MessageList';
import MessageDetail from './MessageDetail';
import MessageWrite from './MessageWrite';

import Modal from '@/components/common/UI/Modal';
import ProcessErrorModal from '@/components/common/feedback/ProcessErrorModal';

import { PAGE_MODAL } from '@/constants';
import useMessageStore from '@/stores/messageStore';

const TITLE = '쪽지';

const MessageModal = React.memo(({ onClose }) => {
  const { messageType, pageType, setMessageType, resetStore } = useMessageStore();

  const { openModal: openErrorModal, closeModal } = useModal(() => (
    <ProcessErrorModal title={`${TITLE} 실패`} onClose={closeModal} />
  ));

  const handleClose = useCallback(() => {
    resetStore();
    onClose();
  }, [resetStore, onClose]);

  const tabChange = (e, value) => {
    resetStore();
    setMessageType(value);
  };

  return (
    <Modal open={true} onClose={handleClose} hasCloseButton={true} modalType={PAGE_MODAL}>
      {pageType === 'list' && (
        <div className='mb-3'>
          <Tabs value={messageType} onChange={tabChange}>
            <Tab label='받은쪽지' value='received' />
            <Tab label='보낸쪽지' value='sent' />
          </Tabs>
        </div>
      )}
      <div className='message-modal'>
        {pageType === 'list' && <MessageList messageType={messageType} />}
        {pageType === 'detail' && <MessageDetail messageType={messageType} />}
        {pageType === 'write' && <MessageWrite />}
      </div>
    </Modal>
  );
});

export default MessageModal;
