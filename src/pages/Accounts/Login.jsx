import MascotImage from "../../components/common/MascotImage.jsx";
import LoginForm from "../../components/login/LoginForm.jsx";

const LoginPage = () => {
    const loginMascotSize = 'w-3/12 h-[30rem]';
    const loginFormSize = 'w-2/5 h-[35rem]';
    return (
        <div className="container w-full h-full flex flex-row justify-center items-center">
            <div className={`${loginMascotSize} hidden xl:flex xl:justify-end`}>
                <MascotImage type='login' />
            </div>
            <div className={`${loginFormSize} flex justify-center items-center`}>
                <LoginForm />
            </div>
        </div>
    )
};

export default LoginPage;