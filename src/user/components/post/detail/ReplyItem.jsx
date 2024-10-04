import ProfileImage from '@/common/components/common/layout/ProfileImage';

import { formatDateToKorean } from '@/common/utils/formatter.js';
import authStore from '@/common/stores/authStore';

const ReplyItem = ({ reply }) => {
  const formattedDate = formatDateToKorean(reply.createdAt);
  const user = authStore().user;

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
                  <button className='postdetail__reply-option-button'>수정하기</button>
                  <button className='postdetail__reply-option-button'>삭제하기</button>
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
