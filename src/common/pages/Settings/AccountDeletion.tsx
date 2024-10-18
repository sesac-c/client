import React from 'react';
import ArchiveContentLayout from '@/common/components/settings/layout/ArchiveContent';
import AccountDeletionContent from '@/common/components/settings/accountInfo/AccountDeletionContent';

const AccountDeletionPage = () => {
  return (
    <ArchiveContentLayout title='회원 탈퇴'>
      <AccountDeletionContent />
    </ArchiveContentLayout>
  );
};
export default AccountDeletionPage;
