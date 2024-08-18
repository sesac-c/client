const ErrorLayout = ({ children }) => {
  return (
    <div className='error-container'>
      <main className='h-3/5 w-full'>{children}</main>
    </div>
  );
};
export default ErrorLayout;
