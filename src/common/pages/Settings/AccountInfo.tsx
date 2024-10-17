import React from 'react';
import SettingsContentLayout from '@/common/components/settings/layout/SettingsContent';
import AccountInfoForm from '@/common/components/settings/accountInfo/AccountInfoForm';

const AccountInfoPage: React.FC = () => (
  <SettingsContentLayout
    title='계정 정보'
    form={<AccountInfoForm />}
    isButtonDisabled={false}
    onSubmit={() => {}}
    buttonText='로그아웃'
  />
);

export default AccountInfoPage;
