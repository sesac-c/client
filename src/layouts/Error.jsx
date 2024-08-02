const ErrorLayout = ({ children }) => {
    return (
        <div className="error-container">
            <main className="w-full h-3/5">
                {children}
            </main>
        </div>
    )
}
export default ErrorLayout;