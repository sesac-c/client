import ProfileImage from '@/common/components/common/layout/ProfileImage';

import { formatDateToKorean } from '@/common/utils/formatter.js';
import authStore from '@/common/stores/authStore';
import { useState } from 'react';
import { deleteReply } from '@/user/services/api/posts';

const ReplyItem = ({ postId, reply, apiUrl }) => {
  const formattedDate = formatDateToKorean(reply.createdAt);
  const user = authStore().user;
  const [editable, setEditable] = useState(false);

  const deleteHandler = async replyId => {
    if (confirm('댓글을 삭제하시겠습니까?')) {
      await deleteReply(postId, apiUrl, replyId);
    }
  };

  return (
    <div className='postdetail__reply-item'>
      <div className='postdetail__reply-author'>
        <div className='postdetail__reply-author-inner'>
          <div className='postdetail__reply-profile-image'>
            {/* onClick={프로필 페이지 이동}*/}
            <ProfileImage image={reply.ProfileImage} hasShadow={false} />
          </div>
          <div className='postdetail__reply-author-info'>
            <div className='postdetail__reply-author-info-header'>
              <div className='postdetail__reply-user'>
                <span className='postdetail__reply-author-nickname'>{reply.writer}</span>
                {/*<span className='postdetail__reply-author-campusName'>{reply.campusName}</span>*/}
              </div>
              {reply.writer === user.nickname ? (
                <div className='postdetail__reply-options'>
                  <button className='postdetail__reply-option-button' onClick={() => setEditable(!editable)}>
                    수정하기
                  </button>
                  <button className='postdetail__reply-option-button' onClick={() => deleteHandler(reply.id)}>
                    삭제하기
                  </button>
                </div>
              ) : null}
            </div>
            <p className='postdetail__reply-content'>
              {reply.content}
              <span className='postdetail__reply-date ml-3'>{formattedDate}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReplyItem;
