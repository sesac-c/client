import React from 'react';

const AccountsLayout: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <>
      <main className='accounts-container'>
        <div className='h-3/5 w-full'>{children}</div>
      </main>
    </>
  );
};

export default AccountsLayout;
