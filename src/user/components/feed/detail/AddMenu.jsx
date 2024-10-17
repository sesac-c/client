import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { DialogsProvider, useDialogs } from '@toolpad/core';
import { IconButton, Tooltip, List, ListItem, ListItemButton, ListItemText, Dialog, Divider } from '@mui/material';
import { MoreVert as MoreVertIcon } from '@mui/icons-material';
import ProcessErrorModal from '@/common/components/common/feedback/ProcessErrorModal';
import { FEED_TYPE } from '@/common/constants';
import { feedDelete } from '@/user/services/api/feeds';

function AddDialog(props) {
  const navigate = useNavigate();
  const { feedId, feedType, apiUrl, backPagePath, openModifyModal, onClose, open } = props;
  const dialogs = useDialogs();
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [deleteError, setDeleteError] = React.useState(false);

  const koFeedType = feedType === FEED_TYPE.POST ? '게시글' : '공지';
  const objectMarker = feedType === FEED_TYPE.POST ? '을' : '를';

  const handleClose = () => {
    onClose();
  };

  const handleEdit = () => {
    handleClose();
    openModifyModal();
  };
  const handleDelete = async () => {
    const deleteConfirmed = await dialogs.confirm(`해당 ${koFeedType}${objectMarker} 삭제하시겠습니까?`, {
      title: `${koFeedType} 삭제`,
      okText: '삭제',
      cancelText: '취소'
    });
    if (deleteConfirmed) {
      try {
        setIsDeleting(true);
        await feedDelete(apiUrl, feedId);
        handleClose();
        navigate(backPagePath, { replace: true });
      } catch (error) {
        console.error(error);
        setDeleteError(true);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  if (deleteError) {
    return (
      <ProcessErrorModal
        title={`${koFeedType} 삭제 실패`}
        onClose={() => {
          setDeleteError(false);
          handleClose();
        }}
      />
    );
  } else {
    return (
      <Dialog fullWidth maxWidth='xs' onClose={handleClose} open={open}>
        <List sx={{ pt: 0 }}>
          <ListItem key={'수정'}>
            <ListItemButton onClick={handleEdit}>
              <ListItemText primary={'수정'} />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem key={'삭제'}>
            <ListItemButton onClick={handleDelete} disabled={isDeleting}>
              <ListItemText primary={isDeleting ? '삭제 중...' : '삭제'} />
            </ListItemButton>
          </ListItem>
        </List>
      </Dialog>
    );
  }
}

const AddTooltip = props => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <DialogsProvider>
      <Tooltip title='더보기 메뉴'>
        <IconButton onClick={handleClickOpen}>
          <MoreVertIcon sx={{ color: 'white' }} />
        </IconButton>
      </Tooltip>
      <AddDialog open={open} onClose={handleClose} {...props} />
    </DialogsProvider>
  );
};

export default AddTooltip;
