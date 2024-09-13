import { courses } from '../../common/_mock';

export const userFilter = [
  {
    name: 'status',
    label: '상태',
    options: [
      { value: 0, label: '신규' },
      { value: 10, label: '승인' },
      { value: 20, label: '보류' },
      { value: 30, label: '거절' }
    ]
  },
  {
    name: 'courseId',
    label: '과정',
    options: null //   비동기 로드
  }
];
export const campusFilter = [
  {
    name: '',
    label: '',
    options: [{ value: 0, label: '' }]
  }
  // ,...etc: TODO: 구현
];
export const courseFilter = [
  {
    name: '',
    label: '',
    options: [{ value: 0, label: '' }]
  }
  // ,...etc: TODO: 구현
];
export const postFilter = [
  {
    name: '',
    label: '',
    options: [{ value: 0, label: '' }]
  }
  // ,...etc: TODO: 구현
];
export const noticeFilter = [
  {
    name: '',
    label: '',
    options: [{ value: 0, label: '' }]
  }
  // ,...etc: TODO: 구현
];
export const runningmateFilter = [
  {
    name: '',
    label: '',
    options: [{ value: 0, label: '' }]
  }
  // ,...etc: TODO: 구현
];
export const activityReportFilter = [
  {
    name: '',
    label: '',
    options: [{ value: 0, label: '' }]
  }
  // ,...etc: TODO: 구현
];
