import React from 'react';
import ArchiveContentLayout from '@/components/settings/layout/ArchiveContent';
import PostGridContainer from '@/components/profile/PostGridContainer';
import { ARCHIVE_TYPE } from '@/constants';

const RepliesPage = () => {
  return (
    <ArchiveContentLayout title='내가 쓴 댓글'>
      <PostGridContainer archiveType={ARCHIVE_TYPE.REPLY} />
    </ArchiveContentLayout>
  );
};

export default RepliesPage;
