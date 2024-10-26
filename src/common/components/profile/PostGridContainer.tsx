import React, { useEffect, useState, lazy, Suspense } from 'react';
import { Typography, Container, Paper, Skeleton, Stack } from '@mui/material';
import Grid2 from '@mui/material/Grid2';
import { ArchiveType, PostGridProps, UserPostResponse } from '@/common/types';
import { FEED_TYPE, POST_TYPE, ARCHIVE_TYPE, scrollStyle, THUMBNAIL_API_URL } from '@/common/constants';
import { getUserPosts, getUserLikePosts, getUserReplyPosts } from '@/common/services/api';

const DetailModal = lazy(() => import('@/user/components/feed/detail/DetailModal'));

const PostWrapper: React.FC<{
  children: React.ReactNode;
  category: typeof POST_TYPE;
  feedId: number;
  archiveType: ArchiveType;
  profileId?: number;
  onIsModalClose: (isModalClose: boolean) => void;
}> = ({ children, category, feedId, archiveType, profileId, onIsModalClose }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = (event: React.MouseEvent) => {
    event.stopPropagation();
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    onIsModalClose(true);
  };

  return (
    <Paper
      component='div'
      onClick={handleOpenModal}
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
      {isModalOpen && (
        <Suspense fallback={<div>Loading...</div>}>
          <DetailModal
            open={isModalOpen}
            onClose={handleCloseModal}
            feedId={feedId}
            feedType={FEED_TYPE.POST}
            category={category}
            archiveType={archiveType}
            profileId={profileId}
            onIsModalClose={onIsModalClose}
          />
        </Suspense>
      )}
    </Paper>
  );
};

export const PostGridSkeleton: React.FC<{ archiveType: ArchiveType; itemCount?: number }> = ({
  archiveType,
  itemCount = 12
}) => (
  <Container
    disableGutters
    sx={{
      margin: archiveType === ARCHIVE_TYPE.POST ? undefined : 0,
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

const PostGrid: React.FC<PostGridProps> = ({ posts, archiveType, profileId, onIsModalClose }) => {
  const isPostArchive = archiveType === ARCHIVE_TYPE.POST;
  const containerStyle = {
    ...scrollStyle,
    margin: isPostArchive ? 'auto' : 0,
    maxHeight: `calc(100vh - ${isPostArchive ? '380' : '200'}px)`,
    overflowY: 'auto',
    padding: 1
  };
  return (
    <Container disableGutters sx={{ ...containerStyle }} maxWidth='md'>
      {posts && posts.length > 0 ? (
        <Grid2 container spacing={1} columns={6}>
          {posts.map(post => (
            <Grid2 key={post.id} size={2}>
              <PostWrapper
                category={post.postType}
                feedId={post.id}
                archiveType={archiveType}
                profileId={profileId}
                onIsModalClose={onIsModalClose}
              >
                {post.image ? (
                  <img
                    src={THUMBNAIL_API_URL(post.image)}
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

const getFetchFunction = (archiveType: ArchiveType, profileId?: number) => {
  switch (archiveType) {
    case ARCHIVE_TYPE.POST:
      if (profileId) {
        return () => getUserPosts(profileId);
      } else {
        return undefined;
      }
    case ARCHIVE_TYPE.LIKES:
      return getUserLikePosts;
    case ARCHIVE_TYPE.REPLY:
      return getUserReplyPosts;
  }
};

const PostGridContainer: React.FC<{ archiveType?: ArchiveType; profileId?: number }> = ({
  archiveType = ARCHIVE_TYPE.POST,
  profileId
}) => {
  const [isPostLoading, setIsPostLoading] = useState(true);
  const [posts, setPosts] = useState<UserPostResponse[]>([]);
  const fetchFunction = getFetchFunction(archiveType, profileId);

  const fetchPosts = async () => {
    let timer: NodeJS.Timeout;
    try {
      setIsPostLoading(true);
      const fetchedPosts = fetchFunction && (await fetchFunction());
      setPosts(fetchedPosts || []);
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

  const handleModalClose = (isModalClose: boolean) => {
    if (isModalClose) {
      fetchPosts();
    }
  };

  return isPostLoading ? (
    <PostGridSkeleton archiveType={archiveType} itemCount={3} />
  ) : (
    <PostGrid posts={posts} archiveType={archiveType} profileId={profileId} onIsModalClose={handleModalClose} />
  );
};

export default PostGridContainer;
