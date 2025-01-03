import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { Typography } from '@mui/material';

import { useCourseChangeRequest } from '@/hooks/settings/useCourseChangeRequest';

import SettingsContentLayout from '@/components/settings/layout/SettingsContent';
import ProcessErrorModal from '@/components/common/feedback/ProcessErrorModal';
import ProcessSuccessModal from '@/components/common/feedback/ProcessSuccessModal';
import ChangeCourseForm from '@/components/settings/profile/ChangeCourseForm';
import LoadingStatus from '@/components/settings/LoadingStatus';

import { CONFIRM_COURSE_CHANGE, CONFIRM_COURSE_SUCCESS_MESSAGES } from '@/constants';
import { confirmAction } from '@/utils/confirmation';
import { getCampusesForLoader } from '@/services/api';
import { CampusResponse } from '@/types';

const ChangeCoursePage: React.FC = () => {
  const data = useLoaderData() as CampusResponse[];
  const { state, handleChange, handleSubmit, isButtonDisabled, handleCloseErrorModal, handleCloseSuccessModal } =
    useCourseChangeRequest();

  if (state.error.isError) {
    return (
      <ProcessErrorModal title='강의 변경 신청 실패' content={state.error.message} onClose={handleCloseErrorModal} />
    );
  }

  if (state.success) {
    return (
      <ProcessSuccessModal title='강의 변경 신청 완료' onClose={handleCloseSuccessModal}>
        <Typography className='overflow-hidden text-ellipsis whitespace-nowrap'>
          <Typography component='span'>{state.campusName}캠퍼스&nbsp;</Typography>
          <Typography component='span' fontStyle='oblique' fontWeight={700} color='success'>
            {state.courseName}
          </Typography>
        </Typography>

        {CONFIRM_COURSE_SUCCESS_MESSAGES.map((message, index) => (
          <p key={index}>{message}</p>
        ))}
      </ProcessSuccessModal>
    );
  }

  return (
    <SettingsContentLayout
      title='강의 변경 신청'
      form={
        state.isLoading ? <LoadingStatus /> : <ChangeCourseForm state={state} onChange={handleChange} campuses={data} />
      }
      isButtonDisabled={isButtonDisabled()}
      onSubmit={async () => {
        const confirm = await confirmAction(CONFIRM_COURSE_CHANGE);
        if (confirm) {
          handleSubmit();
        }
      }}
      buttonText='신청'
    />
  );
};

export const loader = async () => {
  try {
    return await getCampusesForLoader();
  } catch (error) {
    throw error;
  }
};
export default ChangeCoursePage;
