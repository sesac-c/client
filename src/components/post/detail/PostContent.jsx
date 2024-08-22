import { formatDateToKorean } from '../../../utils/formatter';

export const PostImage = ({ image, isPage }) => {
  return (
    <div className={`postdatil__image-container ${isPage && 'page'}`}>
      <img className='w-auto' src={image} alt='첨부 이미지' />
    </div>
  );
};

export const PostContent = ({ post, hasImage, isPage }) => {
  const formattedDate = formatDateToKorean(post.createdAt);
  const content = (
    <>
      <p className={`mb-2 font-bold text-gray-dark ${isPage && 'w-full text-left'}`}>{formattedDate} 포스팅</p>
      <p className='w-full text-gray-dark'>{post.content}</p>
    </>
  );

  return (
    <div className={`postdatil__content-container ${hasImage ? '' : 'not_image m-auto'} ${isPage ? 'page' : ''}`}>
      <div className='postdatil__content__chat-container'>
        {!hasImage && <div className='postdatil__content__bubble'>{content}</div>}
        {hasImage && content}
      </div>
    </div>
  );
};
