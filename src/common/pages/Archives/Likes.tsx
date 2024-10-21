import React from 'react';
import ArchiveContentLayout from '@/common/components/settings/layout/ArchiveContent';
import { Box } from '@mui/material';
import PostGridContainer from '@/common/components/profile/PostGridContainer';
import { ARCHIVE_TYPE } from '@/common/constants';

const LikesPage = () => {
  return (
    <ArchiveContentLayout title='좋아요'>
      <Box>
        <PostGridContainer archiveType={ARCHIVE_TYPE.LIKES} />
      </Box>
    </ArchiveContentLayout>
  );
};

export default LikesPage;
