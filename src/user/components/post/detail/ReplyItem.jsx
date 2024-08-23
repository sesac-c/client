import ProfileImage from '../../../../common/components/common/layout/ProfileImage.jsx';

import { formatDateToKorean } from '../../../../common/utils/formatter.js';

const ReplyItem = ({ reply }) => {
  const formattedDate = formatDateToKorean(reply.createdAt);

  return (
    <div className='postdetail__reply-item'>
      <div className='postdetail__reply-author'>
        <div className='postdetail__reply-author-inner'>
          <div className='postdetail__reply-profile-image'>
            {/* onClick={프로필 페이지 이동}*/}
            <ProfileImage image={reply.user.ProfileImage} hasShadow={false} />
          </div>
          <div className='postdetail__reply-author-info'>
            <div className='postdetail__reply-author-info-header'>
              <div className='postdetail__reply-user'>
                <span className='postdetail__reply-author-nickname'>{reply.user.nickname}</span>
                <span className='postdetail__reply-author-campusName'>{reply.user.campusName}</span>
              </div>
              {reply.isReplyMine ? (
                <div className='postdetail__reply-options'>
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
