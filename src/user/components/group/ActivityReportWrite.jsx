import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import React, { useCallback, useEffect, useState } from 'react';
import GroupName from '@/user/components/group/GroupName';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, TextField } from '@mui/material';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import useWriteReportStore from '@/user/store/writeReportStore';
import ImageUploader from '@/user/components/group/image/ImageUploader';
import useAuthStore from '@/common/stores/authStore';

const TABS = [
  {
    label: '활동내역',
    value: 'reports'
  },
  {
    label: '음식점',
    value: 'restaurant'
  }
];

const ActivityReportWrite = () => {
  const [runningMate, setRunningMate] = useState(null);
  const [members, setMembers] = useState([]);
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const {
    participants,
    achievementSummary,
    mainContent,
    duration,
    photo,
    setParticipants,
    setAchievementSummary,
    setMainContent,
    setDuration,
    resetStore
  } = useWriteReportStore();

  const handleCheckBox = e => {
    const { checked, value } = e.target;

    if (checked) {
      setParticipants([...participants, value]);
    } else {
      setParticipants(participants.filter(id => id !== value));
    }
  };

  const loadMembers = useCallback(async runningMateId => {
    if (!runningMateId) return;
    try {
      const { data } = await axios.get(`/runningmates/${runningMateId}/members`);
      console.log(data);
      setMembers(data);
    } catch (error) {
      console.error('Failed to load members:', error);
    }
  }, []);

  const loadRunningMate = useCallback(async () => {
    try {
      const { data } = await axios.get('/runningmates/detail');
      console.log(data);
      setRunningMate(data);

      await loadMembers(data.id);
    } catch (error) {
      console.error('Failed to load runningMate:', error);
    }
  }, [loadMembers]);

  useEffect(() => {
    loadRunningMate();
  }, [loadRunningMate]);

  const cancel = () => {
    if (confirm('페이지를 벗어나시겠습니까?')) {
      resetStore();
      navigate(-1);
    }
  };

  const submit = async () => {
    try {
      await axios.post(`runningmates/activities`, {
        duration,
        mainContent,
        achievementSummary,
        photo,
        memberIds: participants
      });
      resetStore();
      navigate('/feed/group/runningmate/reports');
    } catch (error) {
      console.error(error.response);
    }
  };

  const removeMember = async member => {
    console.log(member);
    if (
      confirm(
        `정말 ${member.userN서ame}님을 러닝메이트 멤버에서 삭제하시겠습니까? \n해당 멤버는 영구적으로 삭제되 복구되지 않습니다.`
      )
    ) {
      try {
        await axios.delete(`/runningmates/members/${member.userId}`);

        setMembers([...members.filter(m => m.userId !== member.userId)]);
      } catch (e) {
        console.error(e);
      }
    }
  };

  useEffect(() => {
    loadRunningMate();
  }, []);

  return (
    <>
      <div className='board-container'>
        <GroupName name={'러닝메이트 활동 결과 보고서 작성'} />
      </div>

      <div className='group-container'>
        <div>
          {runningMate && members.length && (
            <div className='mb-5'>
              <TableContainer component={Paper}>
                <Table size='small'>
                  <TableHead>
                    <TableRow>
                      <TableCell>그룹명</TableCell>
                      <TableCell colSpan={4}>{runningMate.name}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>주제</TableCell>
                      <TableCell colSpan={4}>{runningMate.subject}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>최종 목표</TableCell>
                      <TableCell colSpan={4}>{runningMate.goal}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>교육과정명</TableCell>
                      <TableCell colSpan={4}>{runningMate.course}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell rowSpan={members.length + 1}>팀현황</TableCell>
                      <TableCell>성명</TableCell>
                      <TableCell>연락처</TableCell>
                      <TableCell>기타(역할)</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                    {members.map((member, idx) => (
                      <TableRow key={idx}>
                        <TableCell>{member.userName}</TableCell>
                        <TableCell>{member.phoneNumber}</TableCell>
                        <TableCell>{member.role}</TableCell>
                        <TableCell>
                          <Button
                            disabled={(user && user.role === 'STUDENT') || member.role === 'LEADER'}
                            color='error'
                            variant='outlined'
                            onClick={() => removeMember(member)}
                          >
                            삭제
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell>활동시간</TableCell>
                      <TableCell colSpan={4}>
                        <TextField
                          size='small'
                          type='number'
                          fullWidth={true}
                          onChange={e => setDuration(e.target.value)}
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>주요 추진 내용</TableCell>
                      <TableCell colSpan={4}>
                        <TextField size='small' fullWidth={true} onChange={e => setMainContent(e.target.value)} />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>성과 요약</TableCell>
                      <TableCell colSpan={4}>
                        <TextField
                          size='small'
                          fullWidth={true}
                          onChange={e => setAchievementSummary(e.target.value)}
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>활동 사진</TableCell>
                      <TableCell colSpan={4}>
                        <ImageUploader />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>참가 구성원</TableCell>
                      <TableCell colSpan={4}>
                        <FormGroup>
                          {members.map(member => (
                            <FormControlLabel
                              key={`check-${member.userId}`}
                              control={<Checkbox value={member.userId} onChange={handleCheckBox} />}
                              label={member.userName}
                            />
                          ))}
                        </FormGroup>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                </Table>
              </TableContainer>
            </div>
          )}
        </div>
      </div>
      <div className='mb-4 flex justify-center'>
        <div className='mr-2'>
          <Button variant='outlined' color='error' onClick={cancel}>
            취소
          </Button>
        </div>
        <div>
          <Button variant='outlined' onClick={submit}>
            제출하기
          </Button>
        </div>
      </div>
    </>
  );
};

export default ActivityReportWrite;
