const AccountsLayout = ({ children }) => {
  return (
    <>
      <main className='accounts-container'>
        <div className='h-3/5 w-full'>{children}</div>
      </main>
    </>
  );
};

export default AccountsLayout;
