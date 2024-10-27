import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import GroupName from '@/components/group/GroupName';
import GroupTabs from '@/components/group/GroupTabs';
import ColumnLayoutWrapper from '@/components/user/layout/ColumnLayoutWrapper';

import UserList from '@/components/common/userList/UserList';
import { THUMBNAIL_API_URL } from '@/constants';
import { Table, TableCell, TableContainer, TableHead, TableRow, Paper} from '@mui/material';

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

const Report = ({ report }) => {
  return (
    <>
      <div className='activity-head mb-5'>
        <div className='title-text'>{report.activityAt} </div>
        <div className='ml-2 mt-1 text-xs'>활동보고서</div>
      </div>
      <div className='mb-10'>
        <div className=''>활동사진</div>
        <hr className='mb-3' />
        <img src={THUMBNAIL_API_URL(report.photo)} />
      </div>

      <div className='mb-5'>
        <div className=''>활동내역</div>
        <hr className='mb-3' />
        <TableContainer component={Paper}>
          <Table size='small'>
            <TableHead>
              <TableRow>
                <TableCell>그룹명</TableCell>
                <TableCell colSpan={3}>{report.runningMateName}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>주제</TableCell>
                <TableCell colSpan={3}>{report.runningMateSubject}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>운영기간</TableCell>
                <TableCell colSpan={3}>
                  {report.startDate} ~ {report.endDate}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>최종 목표</TableCell>
                <TableCell colSpan={3}>{report.runningMateGoal}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>교육과정명</TableCell>
                <TableCell colSpan={3}>{report.courseName}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell rowSpan={report.members.length + 1}>팀현황</TableCell>
                <TableCell>성명</TableCell>
                <TableCell>연락처</TableCell>
                <TableCell>기타(역할)</TableCell>
              </TableRow>
              {report.members.map((member, idx) => (
                <TableRow key={idx}>
                  <TableCell>{member.name}</TableCell>
                  <TableCell>{member.phone}</TableCell>
                  <TableCell>{member.role}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell>활동날짜</TableCell>
                <TableCell colSpan={3}>{report.activityAt}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>활동시간</TableCell>
                <TableCell colSpan={3}>{report.activityDuration}시간</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>주요 추진 내용</TableCell>
                <TableCell colSpan={3}>{report.mainContent}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>성과 요약</TableCell>
                <TableCell colSpan={3}>{report.achievementSummary}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align={'right'}>참가 구성원</TableCell>
                <TableCell colSpan={3} align={'right'}>
                  {report.participants.map(participant => (
                    <div key={participant}>{participant}</div>
                  ))}
                </TableCell>
              </TableRow>
            </TableHead>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

const ActivityReportDetailPage = () => {
  const [runningMate, setRunningMate] = useState(null);
  const [report, setReport] = useState(null);
  const params = useParams();
  const reportId = +params.reportId;
  const [users, setUsers] = useState([]);

  const loadUsers = useCallback(async runningMateId => {
    if (!runningMateId) return;
    try {
      const { data } = await axios.get(`/members/runningmate/${runningMateId}`);
      setUsers(data);
    } catch (error) {
      console.error('Failed to load users:', error);
    }
  }, []);
  const loadRunningMate = useCallback(async () => {
    try {
      const { data } = await axios.get('/runningmates/detail');
      const { name, id } = data;
      setRunningMate({ name, id });

      await loadUsers(id);
    } catch (error) {
      console.error('Failed to load runningMate:', error);
    }
  }, [loadUsers]);

  const load = async () => {
    try {
      const { data } = await axios.get(`runningmates/activities/${reportId}`);
      console.log(data);
      setReport(data);
    } catch (error) {
      console.error('Failed to load report');
    }
  };

  useEffect(() => {
    loadRunningMate();
    load();
  }, []);

  return (
    <>
      <div className='board-container'>
        <GroupName name={runningMate && `${runningMate.name}`} />
        <GroupTabs tabs={TABS} path={'reports'} />
      </div>

      <div className='group-container'>
        <ColumnLayoutWrapper
          leftSide={<div></div>}
          mainArea={(report && <Report report={report} />) || <div />}
          rightSide={<UserList users={users} buttonText={'쪽지하기'} />}
        ></ColumnLayoutWrapper>
      </div>
    </>
  );
};

export default ActivityReportDetailPage;
