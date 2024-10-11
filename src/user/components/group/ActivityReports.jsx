import { HeartIcon } from '@heroicons/react/20/solid';
import { ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/outline';

import { useNavigateHandler } from '@/common/hooks';
import { formatDateToKorean } from '@/common/utils/formatter';
import { IMAGE_UPLOAD_API_URL } from '@/common/constants';

import React, { useCallback, useEffect, useState, useRef } from 'react';
import axios from 'axios';

const ActivityReport = ({ report }) => {
  return (
    <>
      <div></div>
    </>
  );
};

const thumbnailUrl = thumbnail => {
  return `${IMAGE_UPLOAD_API_URL}/${thumbnail}`;
};

const ActivityReports = ({}) => {
  const [reports, setReports] = useState();

  const loadReports = async () => {
    const { data } = await axios.get('runningmates/activities');
    console.log(data);
  };

  useEffect(() => {
    loadReports();
  }, []);
};

export default ActivityReports;
