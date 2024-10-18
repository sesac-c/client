import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, Paper, Checkbox, Button, FormControlLabel, CircularProgress } from '@mui/material';
import {
  DELETE_ACCOUNT_MESSAGES,
  DELETE_ACCOUNT_SUCCESS_MESSAGES,
  LOGIN_PATH,
  CONFIRM_DELETE_ACCOUNT
} from '@/common/constants';
import { deleteAccount } from '@/common/services/api';
import { useNavigate } from 'react-router-dom';
import ProcessErrorModal from '../../common/feedback/ProcessErrorModal';
import ProcessSuccessModal from '../../common/feedback/ProcessSuccessModal';
import useAuthStore from '@/common/stores/authStore';
import { confirmAction } from '@/common/utils';

const AccountDeletionContent: React.FC = () => {
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const { logout } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const handleDeleteAccount = async () => {
    const confirm = await confirmAction(CONFIRM_DELETE_ACCOUNT);
    if (confirm) {
      setLoading(true);
      try {
        await deleteAccount();
        timerRef.current = setTimeout(() => {
          setSuccess(true);
          setLoading(false);
        }, 1000);
      } catch (error: any) {
        const message = error?.data?.message || '오류가 발생했습니다. 잠시 뒤 시도해주세요.';
        setError(true);
        setErrorMessage(message);
        setLoading(false);
      }
    }
  };

  if (error) {
    return (
      <ProcessErrorModal
        title='회원 탈퇴 실패'
        content={errorMessage}
        onClose={() => {
          setError(false);
        }}
      />
    );
  }

  if (success) {
    return (
      <ProcessSuccessModal
        title='회원 탈퇴'
        onClose={async () => {
          logout();
          return navigate(LOGIN_PATH);
        }}
      >
        {DELETE_ACCOUNT_SUCCESS_MESSAGES.map((message, index) => (
          <p key={index}>{message}</p>
        ))}
      </ProcessSuccessModal>
    );
  }

  return (
    <Box
      sx={{
        margin: 'auto',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '70vh',
        position: 'relative'
      }}
    >
      {loading && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            zIndex: 1000
          }}
        >
          <CircularProgress />
        </Box>
      )}
      <Typography variant='body2' color='text.secondary' gutterBottom>
        {DELETE_ACCOUNT_MESSAGES[0]}
      </Typography>
      <Paper elevation={0} sx={{ bgcolor: '#f5f5f5', px: 10, py: 8, mt: 2 }}>
        <Typography variant='body2' paragraph>
          {DELETE_ACCOUNT_MESSAGES[1]}
        </Typography>
        <Typography variant='body2'>{DELETE_ACCOUNT_MESSAGES[2]}</Typography>
      </Paper>
      <Box
        sx={{
          mt: 'auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          width: '100%'
        }}
      >
        <FormControlLabel
          control={<Checkbox checked={checked} onChange={handleCheckboxChange} color='success' />}
          label={DELETE_ACCOUNT_MESSAGES[3]}
          sx={{ mt: 2 }}
        />
        <Button
          variant='contained'
          color='error'
          onClick={handleDeleteAccount}
          disabled={!checked || loading}
          sx={{ width: '30%', mt: 2 }}
        >
          회원 탈퇴
        </Button>
      </Box>
    </Box>
  );
};

export default AccountDeletionContent;
