import PropTypes from 'prop-types';
import { HeartIcon, ChatBubbleBottomCenterTextIcon } from "@heroicons/react/20/solid";
import { formatDateToKorean } from "../../utils/formatter";

import { dummyPostData } from "../../assets/mockData/post";

const Post = ({
    postObj,
    userObj
}) => {
    const formattedDate = formatDateToKorean(postObj.date);
    return (
        <div className="post">
            <div className="post-container">
                {postObj.imageUrl && (
                    <div className="post-image">
                        <img src={postObj.imageUrl} alt='post url' />
                    </div>
                )}
                <div className="post-content">
                    <div className="post-main">
                        <div className="post-header">
                            <div className="post-title">
                                <p className="title-text">{postObj.title}</p>
                            </div>
                            <div className="post-meta">
                                <div className="post-actions">
                                    <div className="action-item">
                                        <ChatBubbleBottomCenterTextIcon className="comment-icon" />
                                        <span className="action-count">{postObj.commentsCount}</span>
                                    </div>
                                    <div className="action-item">
                                        <HeartIcon className="favorite-icon" />
                                        <span className="action-count">{postObj.likesCount}</span>
                                    </div>
                                </div>
                                <div className="meta-info">
                                    <div className="meta-item">
                                        <span className="meta-text nickname">{userObj.nickname}</span>
                                    </div>
                                    <div className="meta-separator" />
                                    <div className="meta-item">
                                        <span className="meta-text">{formattedDate}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="post-body">
                            <div className="post-description">
                                <p className="description-text">{postObj.description}</p>
                            </div>
                        </div>
                    </div>
                    {postObj.hashtags && postObj.hashtags.length > 0 && (
                        <div className="post-hashtags">
                            {postObj.hashtags.map((hashtag, index) => (
                                <div key={index} className="hashtag-item">
                                    <span className="hashtag-text">#{hashtag}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const Posts = ({ posts = dummyPostData }) => { // TODO: dummyPostData 삭제
    if (posts === undefined || posts.length < 0) {
        return <p className='text-center'>
            등록된 게시글이 없습니다.
        </p>
    }
    return (
        <div className="posts-container">
            {posts.map((post, index) => (
                <Post key={index} postObj={post.postObj} userObj={post.userObj} />
            ))}
        </div>
    );
};

Posts.propTypes = {
    posts: PropTypes.arrayOf(
        PropTypes.shape({
            postObj: PropTypes.shape({
                title: PropTypes.string.isRequired,
                date: PropTypes.string.isRequired,
                commentsCount: PropTypes.number.isRequired,
                likesCount: PropTypes.number.isRequired,
                description: PropTypes.string.isRequired,
                hashtags: PropTypes.arrayOf(PropTypes.string),
                imageUrl: PropTypes.string
            }).isRequired,
            userObj: PropTypes.shape({
                nickname: PropTypes.string.isRequired
            }).isRequired
        })
    )
};


export default Posts;