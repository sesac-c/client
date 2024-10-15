import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import React, { useCallback, useEffect, useState } from 'react';
import GroupName from '@/user/components/group/GroupName';
import { IMAGE_UPLOAD_API_URL } from '@/common/constants';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, TextField } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

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

const thumbnailUrl = thumbnail => {
  // return `${IMAGE_UPLOAD_API_URL}/s_${thumbnail}`;
  return `${IMAGE_UPLOAD_API_URL}/s_f07171be-acac-47b7-875b-5ab636161ed7_python.jpg`;
};

const ActivityReportWrite = () => {
  const [runningMate, setRunningMate] = useState(null);
  const [members, setMembers] = useState([]);
  const navigate = useNavigate();
  const [participants, setParticipants] = useState([]);
  const [achievementSummary, setAchievement] = useState('');
  const [mainContent, setMainContent] = useState('');
  const [activityAt, setActivityAt] = useState(null);
  const [duration, setDuration] = useState(null);

  const handleCheckBox = e => {
    const { checked, value } = e.target;

    if (checked) {
      setParticipants([...participants, value]);
    } else {
      setParticipants(participants.filter(id => id !== value));
    }
  };

  const handleActifityAt = newDate => {
    setActivityAt(newDate);
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
    if (confirm('페이지를 벗어나시겠습니까?')) navigate(-1);
  };

  const submit = async () => {
    console.log('aaa');
    await axios.post(`runningmates/activities`, {
      duration,
      mainContent,
      achievementSummary,
      memberIds: participants,
      photo: 'dd'
    });
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
          <Button variant='outlined' onClick={cancel}>
            취소
          </Button>
          <Button variant='outlined' onClick={submit}>
            제출하기
          </Button>
        </div>
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
                      <TableCell>삭제</TableCell>
                    </TableRow>
                    {members.map((member, idx) => (
                      <TableRow key={idx}>
                        <TableCell>{member.userName}</TableCell>
                        <TableCell>{member.phoneNumber}</TableCell>
                        <TableCell>{member.role}</TableCell>
                        <TableCell>
                          <Button variant={'danger'}>삭제</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell>활동날짜</TableCell>
                      <TableCell colSpan={4}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DemoContainer components={['DatePicker']}>
                            <DatePicker size={'small'} value={activityAt} onChange={handleActifityAt} />
                          </DemoContainer>
                        </LocalizationProvider>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>활동시간</TableCell>
                      <TableCell colSpan={4}>
                        <TextField
                          size={'small'}
                          type={'number'}
                          fullWidth={true}
                          onChange={e => setDuration(e.target.value)}
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>주요 추진 내용</TableCell>
                      <TableCell colSpan={4}>
                        <TextField size={'small'} fullWidth={true} onChange={e => setMainContent(e.target.value)} />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>성과 요약</TableCell>
                      <TableCell colSpan={4}>
                        <TextField size={'small'} fullWidth={true} onChange={e => setAchievement(e.target.value)} />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>활동 사진</TableCell>
                      <TableCell colSpan={4}>
                        {/*<div className="upload-container">
                          <input type="file" id="fileInput" accept="image/*"
                                 onChange={handleFileChange}
                                 style={{ display: 'none' }} />
                          <label htmlFor="fileInput" className="upload-area">
                            {thumbnail ? <ImagePreview image={getThumbnail()}
                                                       onRemove={onRemove} /> :
                              <UploadPrompt />}
                          </label>
                        </div>*/}
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
              {participants}
              {achievementSummary}
              {duration}
              {activityAt?.format('YYYY-MM-DD')}
              {mainContent}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ActivityReportWrite;