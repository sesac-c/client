import React from 'react';
import { Page, StatusCode } from '../types';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import AutorenewRoundedIcon from '@mui/icons-material/AutorenewRounded';
import BlockIcon from '@mui/icons-material/Block';

// ====================================================== pagintaions
export const handleJump = (currentPage: number, direction: 'prev' | 'next', totalPages: number): number => {
  const jump = direction === 'prev' ? -10 : 10;
  return Math.max(1, Math.min(currentPage + jump, totalPages));
};

export const getPageNumbers = (pageNumber: number, totalPages: number): (number | string)[] => {
  const pageNumbers: (number | string)[] = [];
  const showPages = 5; // 현재 페이지 주변에 표시할 페이지 수
  let start = Math.max(1, pageNumber - Math.floor(showPages / 2));
  let end = Math.min(totalPages, start + showPages - 1);

  if (end - start + 1 < showPages) {
    start = Math.max(1, end - showPages + 1);
  }

  if (start > 1) {
    pageNumbers.push(1);
    if (start > 2) pageNumbers.push('...');
  }

  for (let i = start; i <= end; i++) {
    pageNumbers.push(i);
  }

  if (end < totalPages) {
    if (end < totalPages - 1) pageNumbers.push('...');
    pageNumbers.push(totalPages);
  }

  return pageNumbers;
};

export const createNewPage = (currentPage: Page, newPageNumber: number): Page => {
  return {
    ...currentPage,
    pageNumber: Math.max(0, Math.min(newPageNumber, currentPage.totalPages - 1)),
    last: newPageNumber >= currentPage.totalPages - 1
  };
};

// ======================================================status
export type StatusText = 'new' | 'approved' | 'pending' | 'rejected';
export type StatusTextKorean = '신규' | '승인' | '보류' | '거절';

export const statusMapping: Record<StatusCode, StatusText> = {
  0: 'new',
  10: 'approved',
  20: 'pending',
  30: 'rejected'
};

export const statusTextKorean: Record<StatusText, StatusTextKorean> = {
  new: '신규',
  approved: '승인',
  pending: '보류',
  rejected: '거절'
};

export const statusColors: Record<StatusText, 'success' | 'warning' | 'danger' | 'neutral'> = {
  new: 'neutral',
  approved: 'success',
  pending: 'warning',
  rejected: 'danger'
};

export const statusIcons: Record<StatusText, React.ReactElement> = {
  new: React.createElement(CheckRoundedIcon),
  approved: React.createElement(CheckRoundedIcon),
  pending: React.createElement(AutorenewRoundedIcon),
  rejected: React.createElement(BlockIcon)
};

// 변환 함수
export function getStatusTextKorean(statusCode: StatusCode): StatusTextKorean {
  const statusText = statusMapping[statusCode];
  return statusTextKorean[statusText];
}

export function getStatusColor(statusCode: StatusCode): 'success' | 'warning' | 'danger' | 'neutral' {
  const statusText = statusMapping[statusCode];
  return statusColors[statusText];
}

export function getStatusIcon(statusCode: StatusCode): React.ReactElement {
  const statusText = statusMapping[statusCode];
  return statusIcons[statusText];
}
