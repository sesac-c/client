import { useCallback, useEffect } from 'react';
import { useModal } from '@/common/hooks';

import Modal from '@/common/components/common/UI/Modal';
import ProcessErrorModal from '@/common/components/common/feedback/ProcessErrorModal';

import { PAGE_MODAL } from '@/common/constants';
import useMessageStore from '@/user/store/messageStore';
import MessageList from '@/user/components/message/MessageList';
import MessageDetail from '@/user/components/message/MessageDetail';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

const TITLE = '쪽지';

const MessageModal = React.memo(({ onClose, feedType }) => {
  const { messageType, pageType, setMessageType, resetStore } = useMessageStore();

  const { openModal: openErrorModal, closeModal } = useModal(() => (
    <ProcessErrorModal title={`${TITLE} 실패`} onClose={closeModal} />
  ));

  const handleClose = useCallback(() => {
    resetStore();
    onClose();
  }, [resetStore, onClose]);

  useEffect(() => {
    return () => resetStore();
  }, [resetStore]);

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
        {pageType === 'list' ? <MessageList messageType={messageType} /> : <MessageDetail messageType={messageType} />}
      </div>
    </Modal>
  );
});

export default MessageModal;
