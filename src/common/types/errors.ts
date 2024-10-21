import React from 'react';

export interface ApiError {
  code: string;
  message: string;
}

export type RouteError = {
  status?: number;
  data?: {
    message: string;
  };
};

export class RouteBaseError extends Error {
  errorState: number;
  data: {
    message: string;
  };

  constructor(errorState: number, message: string) {
    super(message);
    this.name = 'RouteError';
    this.errorState = errorState;
    this.data = {
      message: message
    };
  }
}

export interface ErrorPageProps {
  errorState?: number;
  data?: {
    title?: string;
    message: string;
  };
}

export type ErrorMessage = string | React.ReactElement;

export const ERROR_MESSAGES: Record<string, React.ReactNode> = {
  DEFAULT: React.createElement('p', null, '잠시 후에 다시 시도해주세요'),
  NOT_FOUND: React.createElement(
    React.Fragment,
    null,
    React.createElement(
      'div',
      null,
      React.createElement('p', null, '죄송합니다.'),
      React.createElement('p', null, '요청하신 페이지를 찾을 수 없습니다.'),
      React.createElement('p', null, '\u00A0'),
      React.createElement('p', null, '방문하시려는 페이지의 주소가 잘못 입력되었거나,'),
      React.createElement('p', null, '페이지의 주소가 변경 혹은 삭제되어 요청하신 페이지를 찾을 수 없습니다.'),
      React.createElement('p', null, '\u00A0')
    ),
    React.createElement('p', null, '입력하신 주소가 정확한지 다시 한번 확인해 주시기 바랍니다.')
  ),
  UNAUTHORIZED: React.createElement(
    React.Fragment,
    null,
    React.createElement(
      'div',
      { className: 'flex h-3/4 flex-col justify-center text-center' },
      React.createElement('p', null, '요청하신 페이지를 접근할 수 없습니다.'),
      React.createElement('p', null, '\u00A0'),
      React.createElement('p', null, '페이지의 접근 권한이 없거나, 접근할 수 없는 상태입니다.')
    )
  )
};

export interface ErrorDetails {
  title: string;
  message: React.ReactNode;
}
