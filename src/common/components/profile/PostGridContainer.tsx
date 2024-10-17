import React, { useEffect, useState } from 'react';
import { Typography, Container, Paper, Skeleton, Stack } from '@mui/material';
import Grid2 from '@mui/material/Grid2';
import { PostGridProps, UserPostResponse } from '@/common/types';
import { getUserPosts } from '@/common/services/api/profile';
import { FEED_TYPE, POST_TYPE } from '@/common/constants';
import DetailModal from '@/user/components/feed/detail/DetailModal';

const PostWrapper: React.FC<{
  children: React.ReactNode;
  category: typeof POST_TYPE;
  feedId: number;
  profileId: number;
  onIsModalClose: (isModalClose: boolean) => void;
}> = ({ children, category, feedId, profileId, onIsModalClose }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = (event: React.MouseEvent) => {
    event.stopPropagation(); // 이벤트 버블링 차단
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    console.log('handleCloseModal');
    setModalOpen(false);
  };

  return (
    <Paper
      component='div'
      onClick={handleOpenModal} // Paper 클릭 시 모달 열림
      elevation={3}
      sx={{
        aspectRatio: '1/1',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'grey.100',
        overflow: 'hidden',
        cursor: 'pointer',
        position: 'relative',
        transition: 'background-color 0.3s ease',

        '&:hover': {
          bgcolor: 'grey.200'
        },

        '&:hover img': {
          opacity: 0.85,
          transform: 'scale(1.05)',
          transition: 'all 0.3s ease'
        }
      }}
    >
      {children}
      <DetailModal
        open={isModalOpen}
        onClose={handleCloseModal}
        feedId={feedId}
        feedType={FEED_TYPE.POST}
        category={category}
        profileId={profileId}
        onIsModalClose={onIsModalClose}
      />
    </Paper>
  );
};

export const PostGridSkeleton: React.FC<{ itemCount?: number }> = ({ itemCount = 12 }) => (
  <Container
    disableGutters
    sx={{
      minHeight: 'calc(100vh - 380px)',
      padding: 1
    }}
    maxWidth='md'
  >
    <Grid2 container spacing={1} columns={6}>
      {[...Array(itemCount)].map((_, index) => (
        <Grid2 key={index} size={2}>
          <Skeleton
            variant='rectangular'
            sx={{
              aspectRatio: '1/1',
              height: '100%',
              borderRadius: 1
            }}
            animation='wave'
          />
        </Grid2>
      ))}
    </Grid2>
  </Container>
);

const PostGrid: React.FC<PostGridProps> = ({ posts, profileId, onIsModalClose }) => {
  return (
    <Container
      disableGutters
      sx={{
        maxHeight: 'calc(100vh - 380px)',
        overflowY: 'auto',
        '&::-webkit-scrollbar': {
          width: '8px'
        },
        '&::-webkit-scrollbar-track': {
          background: '#f1f1f1'
        },
        '&::-webkit-scrollbar-thumb': {
          background: '#888',
          borderRadius: '4px'
        },
        '&::-webkit-scrollbar-thumb:hover': {
          background: '#555'
        },
        scrollbarWidth: 'thin',
        scrollbarColor: '#888 #f1f1f1',
        padding: 1
      }}
      maxWidth='md'
    >
      {posts && posts.length > 0 ? (
        <Grid2 container spacing={1} columns={6}>
          {posts.map(post => (
            <Grid2 key={post.id} size={2}>
              <PostWrapper
                category={post.postType}
                feedId={post.id}
                profileId={profileId}
                onIsModalClose={onIsModalClose}
              >
                {post.image ? (
                  <img
                    src={`${process.env.REACT_APP_API_BASE_URL}view/${post.image}`}
                    loading='lazy'
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center',
                      transition: 'all 0.3s ease'
                    }}
                    alt='Container'
                  />
                ) : (
                  <Stack p={1}>
                    <Typography variant='subtitle1' color='gray.900' align='center' noWrap fontWeight={550}>
                      {post.title}
                    </Typography>
                    <Typography variant='caption' color='text.secondary' align='center' noWrap>
                      {post.content}
                    </Typography>
                  </Stack>
                )}
              </PostWrapper>
            </Grid2>
          ))}
        </Grid2>
      ) : (
        <p className='mt-2 w-full text-center text-gray-basic'>등록된 게시물이 없습니다.</p>
      )}
    </Container>
  );
};

const PostGridContainer: React.FC<{ profileId: number }> = ({ profileId }) => {
  const [isPostLoading, setIsPostLoading] = useState(true);
  const [posts, setPosts] = useState<UserPostResponse[]>([]);
  const [isModalClose, setIsModalClose] = useState(false);
  const fetchPosts = async () => {
    let timer: NodeJS.Timeout;
    try {
      setIsPostLoading(true);
      const fetchedPosts = await getUserPosts(profileId);
      setPosts(fetchedPosts);
      timer = setTimeout(() => setIsPostLoading(false), 800);
    } catch (error) {
      console.error('게시물 로딩 중 오류 발생:', error);
      setIsPostLoading(false);
    } finally {
      return () => clearTimeout(timer);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [profileId]);

  useEffect(() => {
    if (isModalClose) {
      fetchPosts();
      setIsModalClose(false);
    }
  }, [isModalClose]);

  return isPostLoading ? (
    <PostGridSkeleton itemCount={3} />
  ) : (
    <PostGrid posts={posts} profileId={profileId} onIsModalClose={setIsModalClose} />
  );
};

export default PostGridContainer;
