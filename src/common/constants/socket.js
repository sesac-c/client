// 구독 경로
const SUBSCRIBE_PREFIX = '/topic';

export const SUBSCRIBE_COURSE_CHAT = (courseId) => `${SUBSCRIBE_PREFIX}/chat.course.${courseId}`;


// 
const CHAT_DESTINATION_PRFIX = '/chat';
export const COURSE_CHAT_DESTINATION_PRFIX = `${CHAT_DESTINATION_PRFIX}/course.`;
