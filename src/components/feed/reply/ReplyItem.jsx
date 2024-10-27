import { forwardRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ProfileImage from '@/components/common/layout/ProfileImage';
import { formatDateToKorean } from '@/utils/formatter';
import { deleteReply, updateReply } from '@/services/api';
import { REPLY_FIELD_SETTING } from '@/utils/form';
import { TextField } from '@mui/material';
import { THUMBNAIL_API_URL } from '@/constants';
import { PROFILE_PATH } from '@/routes/paths';

const ReplyItem = forwardRef(({ feedId, reply, apiUrl, onUpdate, isModal, onModalClose }, ref) => {
  const formattedDate = formatDateToKorean(reply.createdAt);
  const [editable, setEditable] = useState(false);
  const [content, setContent] = useState(reply.content);
  const navigate = useNavigate();

  const deleteHandler = async replyId => {
    if (!confirm('댓글을 삭제하시겠습니까?')) {
      return;
    }

    try {
      await deleteReply(feedId, apiUrl, replyId);
      onUpdate(true);
    } catch (error) {
      console.error(error);
    }
  };

  const updateHandler = async replyId => {
    if (!confirm('댓글을 수정하시겠습니까?')) {
      return;
    }

    await updateReply(feedId, apiUrl, replyId, { content });
    reply.content = content;
    setEditable(!editable);
  };

  const cancelHandler = () => {
    setContent(reply.content);
    setEditable(!editable);
  };

  return (
    <div ref={ref} className='postdetail__reply-item'>
      <div className='postdetail__reply-author'>
        <div className='postdetail__reply-author-inner'>
          <div
            className='postdetail__reply-profile-image'
            onClick={() => {
              const path = `${PROFILE_PATH}/${reply.writerId}`;
              if (isModal) {
                onModalClose();
                window.location.href = path;
              } else {
                navigate(path);
              }
            }}
          >
            <ProfileImage image={THUMBNAIL_API_URL(reply.profileImage)} hasShadow={false} />
          </div>
          <div className='postdetail__reply-author-info'>
            <div className='postdetail__reply-author-info-header'>
              <div className='postdetail__reply-user'>
                <span className='postdetail__reply-author-nickname'>{reply.writer}</span>
                {/*<span className='postdetail__reply-author-campusName'>{reply.campusName}</span>*/}
              </div>
              {reply.isReplyMine ? (
                editable ? (
                  <div className='postdetail__reply-options'>
                    <button className='postdetail__reply-option-button' onClick={() => updateHandler(reply.id)}>
                      확인
                    </button>
                    <button className='postdetail__reply-option-button' onClick={cancelHandler}>
                      취소
                    </button>
                  </div>
                ) : (
                  <div className='postdetail__reply-options'>
                    <button className='postdetail__reply-option-button' onClick={() => setEditable(!editable)}>
                      수정
                    </button>
                    <button className='postdetail__reply-option-button' onClick={() => deleteHandler(reply.id)}>
                      삭제
                    </button>
                  </div>
                )
              ) : null}
            </div>
            {!editable ? (
              <p className='postdetail__reply-content'>
                {reply.content}
                <span className='postdetail__reply-date ml-3'>{formattedDate}</span>
              </p>
            ) : (
              <div>
                <TextField
                  value={content}
                  onChange={e => setContent(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      handleReplySubmit(e);
                    }
                  }}
                  {...REPLY_FIELD_SETTING}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});
export default ReplyItem;
