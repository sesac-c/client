import { HeartIcon } from '@heroicons/react/20/solid';
import { ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/outline';

import { useNavigateHandler } from '@/common/hooks';
import { formatDateToKorean } from '@/common/utils/formatter';
import { IMAGE_UPLOAD_API_URL } from '@/common/constants';

import React, { useCallback, useEffect, useState, useRef } from 'react';
import axios from 'axios';

const thumbnailUrl = thumbnail => {
  // return `${IMAGE_UPLOAD_API_URL}/s_${thumbnail}`;
  return `${IMAGE_UPLOAD_API_URL}/s_f07171be-acac-47b7-875b-5ab636161ed7_python.jpg`;
};

const ActivityReport = ({ report }) => {
  return (
    <>
      <div className='image-container'>
        <img src={thumbnailUrl(report.photo)} alt={report.title} />
        <div className='title-overlay'>{report.title}</div>
      </div>
    </>
  );
};

const ActivityReports = ({}) => {
  const [reports, setReports] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const loader = useRef(null);

  const loadReports = async () => {
    const { data } = await axios.get('runningmates/activities');
    // setReports(data);
    setReports([...data, ...data]);
  };

  useEffect(() => {
    loadReports();
  }, []);

  if (!reports || reports.length === 0) {
    return <p className='text-center'>등록된 활동이 없습니다.</p>;
  }

  return (
    <div className='report-container'>
      <div className='gallery'>
        {reports.map(report => (
          <ActivityReport key={report.id} report={report} />
        ))}
      </div>
      {isLoading && <p className='text-center'>Loading...</p>}
      {hasMore && <div ref={loader} style={{ height: '20px' }} />}
      {!hasMore && <p className='text-center'>모든 게시글을 불러왔습니다.</p>}
    </div>
  );
};

export default ActivityReports;
