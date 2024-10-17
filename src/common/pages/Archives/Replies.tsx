import React from 'react';
import ArchiveContentLayout from '@/common/components/settings/layout/ArchiveContent';
import PostGridContainer from '@/common/components/profile/PostGridContainer';
import { ARCHIVE_TYPE } from '@/common/constants';

const RepliesPage = () => {
  return (
    <ArchiveContentLayout title='내가 쓴 댓글'>
      <PostGridContainer archiveType={ARCHIVE_TYPE.REPLY} />
    </ArchiveContentLayout>
  );
};

export default RepliesPage;
