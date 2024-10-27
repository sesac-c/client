import { CircularProgress } from '@mui/material';
import AddTooltip from './AddMenu';
import ReplyInput from '../reply/ReplyInput';
import ReplyList from '../reply/ReplyList.jsx';
import LikeButton from './LikeButton';
import Author from './Author.jsx';
import Division from '@/components/common/UI/Division';
import { Content, Image } from './Content';
import { useFeedDetail } from '@/hooks';
import { IMAGE_API_URL } from '@/constants';

const DetailInner = ({ feedId, feedType, category }) => {
  const { feed, isReplyUpdate, isLoading, isUpdating, apiUrl, backPagePath, openModal, handleReplyUpdate } =
    useFeedDetail(feedId, feedType, category);

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
    <div className='postdetail-container'>
      {feed && (
        <>
          <div className='postdetail__side-container page'>
            {/* 좌 */}
            <div className='postdetail__left-side page'>
              {feed.image !== null && (
                <>
                  <Image image={IMAGE_API_URL(feed.image)} isPage />
                  <Division type='horizontal_custom' variant='custom' className='postdetail__left-side__division' />
                </>
              )}
              <Content feed={feed} hasImage={feed.image !== null} isPage />
            </div>
            {/* 우 */}
            <div className='postdetail__right-side page'>
              <Author
                addToolTip={
                  feed.isMine && (
                    <AddTooltip {...{ apiUrl, feedId, feedType, backPagePath }} openModifyModal={openModal} />
                  )
                }
                user={feed.user}
                isPage
              />
              <div className='postdetail__reply-container page'>
                <ReplyList feedId={feedId} apiUrl={apiUrl} isUpdate={isReplyUpdate} onUpdate={handleReplyUpdate} />
              </div>
              <div className='postdetail__reply-input-container page'>
                <LikeButton like={feed.like} {...{ feedId, apiUrl }} />
                <ReplyInput feedId={feedId} apiUrl={apiUrl} onUpdate={handleReplyUpdate} />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DetailInner;
