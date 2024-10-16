import ProfileImage from '@/common/components/common/layout/ProfileImage';

import { formatDateToKorean } from '@/common/utils/formatter.js';
import { forwardRef, useState } from 'react';
import { deleteReply, updateReply } from '@/user/services/api';
import { REPLY_FIELD_SETTING } from '@/common/utils';
import { TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { PROFILE_PATH } from '@/common/constants';

const ReplyItem = forwardRef(({ feedId, reply, apiUrl, onUpdate }, ref) => {
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
              navigate(`${PROFILE_PATH}/${reply.writerId}`);
            }}
          >
            <ProfileImage image={`${process.env.REACT_APP_API_BASE_URL}view/${reply.profileImage}`} hasShadow={false} />
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
