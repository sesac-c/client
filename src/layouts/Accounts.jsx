const AccountsLayout = ({ children }) => {
    return <>
        <main className="accounts-container">
            <div className="w-full h-3/5">
                {children}
            </div>
        </main>
    </>
  );
};

export default AccountsLayout;
