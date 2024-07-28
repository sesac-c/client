const ErrorLayout = ({ children }) => {
    return (
        <div className="w-full h-screen text-gray-basic flex items-center justify-center">
            <main className="w-full h-3/5">
                {children}
            </main>
        </div>
    )
}
export default ErrorLayout;