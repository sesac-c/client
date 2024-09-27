import { useEffect, useState } from 'react';

import Division from '../../../../common/components/common/UI/Division';
import ReplyInput from './ReplyInput.jsx';
import ReplyList from './ReplyList.jsx';
import PostLikeButton from './PostLikeButton.jsx';
import PostAuthor from './PostAuthor.jsx';
import { PostContent, PostImage } from './PostContent.jsx';

import { postsCampusDetail } from '../../../services/api/posts';

const PostDetailInner = ({ postId }) => {
  const [post, setPost] = useState(null);
  console.log(postId);

  const loadPost = async postId => {
    try {
      const response = await postsCampusDetail(postId);
      const { data } = response;
      console.log(data);
      setPost({
        image: data.imageUrl,
        title: data.title,
        content: data.content,
        user: {
          profileImage: data.profileImage,
          campusName: data.wrtier,
          nickname: data.wrtier
        },
        like: {
          status: true,
          count: data.likesCount
        },
        replyCount: data.replyCount,
        createdAt: data.createdAt
      });
    } catch (error) {
      console.error('Failed to fetch post:', error);
    }
    console.log(post);
  };

  useEffect(() => {
    loadPost(postId);
  }, [postId]);

  return (
    <div className="postdetail-container">
      {post && (
        <>
          <div className="postdetail__side-container page">
            {/* 좌 */}
            <div className="postdetail__left-side page">
              {post.image !== null && (
                <>
                  <PostImage image={post.image} isPage />
                  <Division type="horizontal_custom" variant="custom"
                            className="postdetail__left-side__division" />
                </>
              )}
              <PostContent post={post} hasImage={post.image !== null} isPage />
            </div>

            {/* 우 */}
            <div className="postdetail__right-side page">
              <PostAuthor user={post.user} isPage />
              <div className="postdetail__reply-container page">
                <ReplyList postId={postId} />
              </div>
              <div className="postdetail__reply-input-container page">
                <PostLikeButton like={post.like} />
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
