import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

import { THUMBNAIL_API_URL } from '@/constants';
import { useNavigate } from 'react-router-dom';

const ActivityReport = ({ report }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className='image-container' onClick={() => navigate(`./${report.id}`)}>
        <img src={THUMBNAIL_API_URL(report.photo)} alt={report.title} />
        <div className='title-overlay'>{report.title}</div>
      </div>
    </>
  );
};

const ActivityReports = ({}) => {
  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const loader = useRef(null);

  const loadReports = async () => {
    if (!hasMore) return;

    try {
      const { data } = await axios.get('runningmates/activities', {
        params: {
          page,
          size: 12
        }
      });

      if (!data.length) setHasMore(false);
      setPage(page + 1);

      setReports([...reports, ...data]);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadReports();
  }, []);

  const handleObserver = entries => {
    const target = entries[0];
    if (target.isIntersecting && hasMore && !isLoading) {
      loadReports();
    }
  };

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: '20px',
      threshold: 0
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);
    return () => {
      if (loader.current) observer.unobserve(loader.current);
    };
  }, [handleObserver]);

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
