import * as React from 'react';
import { Modal, Box, CircularProgress } from '@mui/material';
import ReplyInput from '../reply/ReplyInput';
import ReplyList from '../reply/ReplyList';
import { Content, Image } from './Content';
import LikeButton from './LikeButton';
import Author from './Author';
import { PROFILE_PATH } from '@/common/constants';
import { useFeedDetail } from '@/user/hooks/useFeedDetail';
import { DialogsProvider } from '@toolpad/core';
import { IconButton, Tooltip, List, ListItem, ListItemButton, ListItemText, Dialog } from '@mui/material';
import { MoreVert as MoreVertIcon } from '@mui/icons-material';

const AddTooltip = ({ detailPath }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = () => {
    handleClose();
    window.location.href = detailPath;
  };

  return (
    <DialogsProvider>
      <Tooltip title='더보기 메뉴'>
        <IconButton onClick={handleClickOpen}>
          <MoreVertIcon sx={{ color: 'white' }} />
        </IconButton>
      </Tooltip>

      <Dialog fullWidth maxWidth='xs' onClose={handleClose} open={open}>
        <List sx={{ pt: 0 }}>
          <ListItem key={'게시물 상세'}>
            <ListItemButton onClick={handleClick}>
              <ListItemText primary={'게시물 상세 페이지로 이동'} />
            </ListItemButton>
          </ListItem>
        </List>
      </Dialog>
    </DialogsProvider>
  );
};

const DetailModal = ({ onClose, open = true, ...props }) => {
  const { onIsModalClose, feedId, feedType, category, profileId } = props;
  const backPagePath = `${PROFILE_PATH}/${profileId}`;

  const { feed, isReplyUpdate, isLoading, isUpdating, apiUrl, imageUrl, handleReplyUpdate } = useFeedDetail(
    feedId,
    feedType,
    category,
    backPagePath
  );

  const detailPath = `/feed/${category.toLowerCase()}/${feedType}s/${feedId}`;

  const handleOverlayClick = e => {
    if (e.target === e.currentTarget) {
      onIsModalClose(true);
      onClose();
    }
  };

  if (isLoading || isUpdating) {
    return (
      <div
        className='loading-container'
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}
      >
        <CircularProgress color='success' />
      </div>
    );
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby='modal-title'
      aria-describedby='modal-description'
      closeAfterTransition
    >
      <Box
        onClick={handleOverlayClick} // 백드롭 클릭 시 모달이 닫히도록 처리
        className='modal-overlay'
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh'
        }}
      >
        <div className='postdetailmodal' onClick={e => e.stopPropagation()}>
          {/* 내부 클릭 시 모달 닫힘 방지 */}
          {feed && (
            <>
              <Author addToolTip={feed.isMine && <AddTooltip detailPath={detailPath} />} user={feed.user} />
              <div className='postdetail__side-container'>
                {feed.image !== null && (
                  <div className='postdetail__left-side'>
                    <Image image={imageUrl(feed.image)} />
                  </div>
                )}
                <div className='postdetail__right-side'>
                  <Content feed={feed} hasImage={feed.image !== null} />
                </div>
              </div>
              <div className='postdetail__reply-container'>
                <ReplyList
                  feedId={feed.id}
                  apiUrl={apiUrl}
                  isUpdate={isReplyUpdate}
                  onUpdate={handleReplyUpdate}
                  isModal
                  onModalClose={onClose}
                />
              </div>
              <div className='postdetail__reply-input-container'>
                <LikeButton like={feed.like} {...{ feedId: feed.id, apiUrl }} />
                <ReplyInput feedId={feed.id} apiUrl={apiUrl} onUpdate={handleReplyUpdate} />
              </div>
            </>
          )}
        </div>
      </Box>
    </Modal>
  );
};

export default DetailModal;
