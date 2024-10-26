import React, { useEffect, useState } from 'react';
import { COURSE_CHAT_PATH } from '@/common/constants';
import { getUserCourseInfo } from '@/user/services/api';
import { Navigate } from 'react-router-dom';
import { UserCourseInfoResponse } from '@/user/type';

const ChatRedirectPage: React.FC = () => {
  const [course, setCourse] = useState<UserCourseInfoResponse>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const fetchCourseInfo = async () => {
      try {
        const data = await getUserCourseInfo();
        setCourse(data);
      } catch (error) {
        throw error;
      } finally {
        setIsLoading(false);
      }
    };
    fetchCourseInfo();
  }, []);
  if (isLoading && !course) {
    return null;
  } else {
    return (
      <Navigate
        to={`/${COURSE_CHAT_PATH}`}
        state={{ courseId: course?.courseId, courseName: course?.courseName }}
        replace
      />
    );
  }
};

export default ChatRedirectPage;
