import { useEffect, useState } from 'react';

import Division from '@/common/components/common/UI/Division';
import ReplyInput from './ReplyInput.jsx';
import ReplyList from './ReplyList.jsx';
import PostLikeButton from './PostLikeButton.jsx';
import PostAuthor from './PostAuthor.jsx';
import { PostContent, PostImage } from './PostContent.jsx';

import { IMAGE_UPLOAD_API_URL } from '@/common/constants';
import PostDropdownMenu from './PostDropdownMenu';
import { fetchPost } from '@/user/services/api/posts';

const PostDetailInner = ({ postId, apiUrl }) => {
  const [post, setPost] = useState(null);

  const loadPost = async () => {
    try {
      const response = await fetchPost(postId, apiUrl);
      const { data } = response;
      console.log(data);
      setPost({
        ...data,
        image: data.imageUrl,
        user: {
          profileImage: data.profileImage,
          campusName: data.campusName,
          nickname: data.nickname
        },
        like: {
          status: data.likesStatus,
          count: data.likesCount
        }
      });
    } catch (error) {
      console.error('Failed to fetch post:', error);
    }
  };

  const imageUrl = image => {
    return `${IMAGE_UPLOAD_API_URL}/${image}`;
  };

  useEffect(() => {
    loadPost();
  }, []);

  return (
    <div className='postdetail-container'>
      {post && (
        <>
          <div className='postdetail__side-container page'>
            {/* 좌 */}
            <div className='postdetail__left-side page'>
              {post.image !== null && (
                <>
                  <PostImage image={imageUrl(post.image)} isPage />
                  <Division type='horizontal_custom' variant='custom' className='postdetail__left-side__division' />
                </>
              )}
              <PostContent post={post} hasImage={post.image !== null} isPage />
            </div>
            {/* 우 */}
            <div className='postdetail__right-side page'>
              <PostDropdownMenu post={post}></PostDropdownMenu>
              <PostAuthor user={post.user} isPage />
              <div className='postdetail__reply-container page'>
                <ReplyList postId={postId} />
              </div>
              <div className='postdetail__reply-input-container page'>
                <PostLikeButton like={post.like} postId={postId} />
                <ReplyInput />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PostDetailInner;
