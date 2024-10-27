import React from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';

import SettingsContentLayout from '@/components/settings/layout/SettingsContent';
import AccountInfoForm from '@/components/settings/accountInfo/AccountInfoForm';
import { getAccountInfo } from '@/services/api';
import { AccountInfoResponse } from '@/types';
import useAuthStore from '@/stores/authStore';
import { CONFIRM_LOGOUT } from '@/constants';
import { LOGIN_PATH } from '@/routes/paths';
import { confirmAction } from '@/utils/confirmation';

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
