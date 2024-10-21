import React from 'react';
import SettingsContentLayout from '@/common/components/settings/layout/SettingsContent';
import AccountInfoForm from '@/common/components/settings/accountInfo/AccountInfoForm';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { getAccountInfo } from '@/common/services/api';
import { AccountInfoResponse } from '@/common/types';
import useAuthStore from '@/common/stores/authStore';
import { CONFIRM_LOGOUT, LOGIN_PATH } from '@/common/constants';
import { confirmAction } from '@/common/utils';

const AccountInfoPage: React.FC = () => {
  const navigate = useNavigate();
  const data = useLoaderData() as AccountInfoResponse;
  const { logout } = useAuthStore();
  return (
    <SettingsContentLayout
      title='계정 정보'
      form={<AccountInfoForm {...data} />}
      isButtonDisabled={false}
      onSubmit={async () => {
        const confirm = await confirmAction(CONFIRM_LOGOUT);
        if (confirm) {
          logout();
          return navigate(LOGIN_PATH);
        }
      }}
      buttonText='로그아웃'
    />
  );
};

export const loader = async () => {
  try {
    return await getAccountInfo();
  } catch (error) {
    throw error;
  }
};
export default AccountInfoPage;
