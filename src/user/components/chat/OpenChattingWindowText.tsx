import { OpenChattingWindowTextProps } from '@/user/type';
import React, { useState } from 'react';

const OpenChattingWindowText: React.FC<OpenChattingWindowTextProps> = ({
  path,
  defaultStyle,
  children,
  newWindow,
  setNewWindow
}) => {
  // TODO: 열린 창 다시 재사용하기
  const [currentWindowPath, setCurrentWindowPath] = useState<string>('');

  const openNewWindow = () => {
    const windowName = 'chatWindow';

    if (newWindow && !newWindow.closed && currentWindowPath === path) {
      newWindow.focus();
      return;
    }

    const width = 700;
    const height = 850;
    const left = window.innerWidth / 2 - width / 2;
    const top = window.innerHeight / 2 - height / 2;

    const openedWindow = window.open(
      path,
      windowName,
      `width=${width},height=${height},top=${top},left=${left},noopener,noreferrer`
    );

    if (openedWindow) {
      setNewWindow(openedWindow);
      setCurrentWindowPath(path);
      openedWindow.opener = null;
    }
  };

  return (
    <span className='cursor-pointer' onClick={openNewWindow} {...defaultStyle}>
      {children}
    </span>
  );
};

export default OpenChattingWindowText;
