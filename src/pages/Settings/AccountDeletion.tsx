import React from 'react';
import ArchiveContentLayout from '@/components/settings/layout/ArchiveContent';
import AccountDeletionContent from '@/components/settings/accountInfo/AccountDeletionContent';

const AccountDeletionPage = () => {
  return (
    <ArchiveContentLayout title='회원 탈퇴'>
      <AccountDeletionContent />
    </ArchiveContentLayout>
  );
};
export default AccountDeletionPage;
